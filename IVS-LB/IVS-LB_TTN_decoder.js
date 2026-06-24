function decodeUplink(input) {
  var result = Decoder(input.bytes, input.fPort);

  if (result && result.errors !== undefined) {
    return result;
  }

  return {
    data: result
  };
}

function Decoder(bytes, port) {
  if (port === 5) {
    return decodeDeviceInfo(bytes);
  }

  if (port === 2 || port === 10) {
    return decodeUplinkPayload(bytes, port === 10);
  }

  return {
    errors: ["Unsupported fPort: " + port]
  };
}

function decodeDeviceInfo(bytes) {
  var freq_band;
  var sub_band;
  var sensor = "IVS-LB";

  if (!bytes || bytes.length < 7) {
    return {
      errors: ["Device info payload must contain at least 7 bytes"]
    };
  }

  var firm_ver = (bytes[1] & 0x0f) + "." + ((bytes[2] >> 4) & 0x0f) + "." + (bytes[2] & 0x0f);

  if (bytes[3] === 0x01) {
    freq_band = "EU868";
  } else if (bytes[3] === 0x02) {
    freq_band = "US915";
  } else if (bytes[3] === 0x03) {
    freq_band = "IN865";
  } else if (bytes[3] === 0x04) {
    freq_band = "AU915";
  } else if (bytes[3] === 0x05) {
    freq_band = "KZ865";
  } else if (bytes[3] === 0x06) {
    freq_band = "RU864";
  } else if (bytes[3] === 0x07) {
    freq_band = "AS923";
  } else if (bytes[3] === 0x08) {
    freq_band = "AS923_1";
  } else if (bytes[3] === 0x09) {
    freq_band = "AS923_2";
  } else if (bytes[3] === 0x0a) {
    freq_band = "AS923_3";
  } else if (bytes[3] === 0x0f) {
    freq_band = "AS923_4";
  } else if (bytes[3] === 0x0b) {
    freq_band = "CN470";
  } else if (bytes[3] === 0x0c) {
    freq_band = "EU433";
  } else if (bytes[3] === 0x0d) {
    freq_band = "KR920";
  } else if (bytes[3] === 0x0e) {
    freq_band = "MA869";
  } else {
    freq_band = "Unknown";
  }

  if (bytes[4] === 0xff) {
    sub_band = "NULL";
  } else {
    sub_band = bytes[4];
  }

  return {
    SENSOR_MODEL: sensor,
    FIRMWARE_VERSION: firm_ver,
    FREQUENCY_BAND: freq_band,
    SUB_BAND: sub_band,
    BAT: (bytes[5] << 8 | bytes[6]) / 1000
  };
}

function decodeUplinkPayload(bytes, alarm) {
  if (!bytes || bytes.length < 4) {
    return {
      errors: ["Uplink payload must contain at least 4 bytes"]
    };
  }

  var decode = {};
  var bat = readUInt16BE(bytes, 0);
  var sampleTimes = bytes[2];
  var flags = bytes[3];
  var offset = 4;

  decode.Node_type = "IVS-LB";
  decode.Alarm = alarm ? "TRUE" : "FALSE";
  decode.Bat_mV = bat;
  decode.BatV = parseFloat((bat / 1000).toFixed(3));
  decode.Sample_times = sampleTimes;
  decode.Param_flag = flags;
  decode.Param_flag_binary = byteToBinary(flags);
  decode.Param_items = paramItems(flags);
  decode.Samples = {};

  for (var sample = 1; sample <= sampleTimes; sample++) {
    var sampleKey = "Sample_" + sample;
    var sampleData = {};

    if (!hasBytes(bytes, offset, 2)) {
      decode.Incomplete_field = sampleKey + ".TempC";
      return decode;
    }
    sampleData.TempC = readInt16BE(bytes, offset) / 10;
    offset += 2;

    if ((flags & 0x01) !== 0) {
      if (!hasBytes(bytes, offset, 6)) {
        decode.Incomplete_field = sampleKey + ".Velocity";
        return decode;
      }
      sampleData.Velocity_X_mm_s = readInt16BE(bytes, offset) / 10;
      sampleData.Velocity_Y_mm_s = readInt16BE(bytes, offset + 2) / 10;
      sampleData.Velocity_Z_mm_s = readInt16BE(bytes, offset + 4) / 10;
      offset += 6;
    }

    if ((flags & 0x02) !== 0) {
      if (!hasBytes(bytes, offset, 6)) {
        decode.Incomplete_field = sampleKey + ".Displacement";
        return decode;
      }
      sampleData.Displacement_X_um = readInt16BE(bytes, offset) / 10;
      sampleData.Displacement_Y_um = readInt16BE(bytes, offset + 2) / 10;
      sampleData.Displacement_Z_um = readInt16BE(bytes, offset + 4) / 10;
      offset += 6;
    }

    if ((flags & 0x04) !== 0) {
      if (!hasBytes(bytes, offset, 6)) {
        decode.Incomplete_field = sampleKey + ".Acceleration";
        return decode;
      }
      sampleData.Acceleration_X_m_s2 = readInt16BE(bytes, offset) / 10;
      sampleData.Acceleration_Y_m_s2 = readInt16BE(bytes, offset + 2) / 10;
      sampleData.Acceleration_Z_m_s2 = readInt16BE(bytes, offset + 4) / 10;
      offset += 6;
    }

    if ((flags & 0x08) !== 0) {
      if (!hasBytes(bytes, offset, 12)) {
        decode.Incomplete_field = sampleKey + ".Frequency";
        return decode;
      }
      sampleData.Frequency_X_Hz = parseFloat(readFloatBE(bytes, offset).toFixed(5));
      sampleData.Frequency_Y_Hz = parseFloat(readFloatBE(bytes, offset + 4).toFixed(5));
      sampleData.Frequency_Z_Hz = parseFloat(readFloatBE(bytes, offset + 8).toFixed(5));
      offset += 12;
    }

    decode.Samples[sampleKey] = sampleData;
  }

  if (offset < bytes.length) {
    decode.Unparsed_bytes = bytesToHex(bytes.slice(offset));
  }

  return decode;
}

function paramItems(flags) {
  var items = [];

  if ((flags & 0x01) !== 0) {
    items.push("Velocity");
  }
  if ((flags & 0x02) !== 0) {
    items.push("Displacement");
  }
  if ((flags & 0x04) !== 0) {
    items.push("Acceleration");
  }
  if ((flags & 0x08) !== 0) {
    items.push("Frequency");
  }

  return items.join(", ");
}

function hasBytes(bytes, offset, length) {
  return offset + length <= bytes.length;
}

function readUInt16BE(bytes, index) {
  return (bytes[index] << 8) | bytes[index + 1];
}

function readInt16BE(bytes, index) {
  var value = readUInt16BE(bytes, index);
  return value > 0x7fff ? value - 0x10000 : value;
}

function readFloatBE(bytes, index) {
  var buffer = new ArrayBuffer(4);
  var view = new DataView(buffer);

  view.setUint8(0, bytes[index]);
  view.setUint8(1, bytes[index + 1]);
  view.setUint8(2, bytes[index + 2]);
  view.setUint8(3, bytes[index + 3]);

  return view.getFloat32(0, false);
}

function byteToBinary(value) {
  return ("00000000" + value.toString(2)).slice(-8);
}

function bytesToHex(bytes) {
  var hex = [];

  for (var i = 0; i < bytes.length; i++) {
    hex.push(("0" + (bytes[i] & 0xff).toString(16)).slice(-2));
  }

  return hex.join(" ");
}

if (typeof module !== "undefined") {
  module.exports = {
    decodeUplink: decodeUplink,
    Decoder: Decoder
  };
}
