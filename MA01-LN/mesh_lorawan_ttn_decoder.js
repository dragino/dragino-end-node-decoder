/*
 * TTN v3 decoder for MA01-LN mesh bridge LoRaWAN short stream and native payloads.
 *
 * FPort 2 single-node payload format:
 *   device_eui_fragment[4] | battery_mv[2] | rssi_i8[1] | repeated(tag[2] + fixed-value)
 *   A fragment beginning with 0x41 is decoded as the company DevEUI prefix A840.
 *
 * FPort 3 batch payload format:
 *   version[1]=1 | record_count[1] |
 *   repeated(record_len[1] + single-node payload)
 *
 * Multi-byte integers are big-endian. There is no item_count and no item
 * length in the LoRaWAN payload, so every tag must have a fixed length.
 */

function readU16(bytes, i) {
  return ((bytes[i] << 8) | bytes[i + 1]) >>> 0;
}

function readI16(bytes, i) {
  var value = readU16(bytes, i);
  return value & 0x8000 ? value - 0x10000 : value;
}

function readU32(bytes, i) {
  return (((bytes[i] << 24) >>> 0) |
          (bytes[i + 1] << 16) |
          (bytes[i + 2] << 8) |
          bytes[i + 3]) >>> 0;
}

function readI8(byte) {
  return byte & 0x80 ? byte - 0x100 : byte;
}

function round(value, digits) {
  var scale = Math.pow(10, digits);
  return Math.round(value * scale) / scale;
}

function hex8(value) {
  return ("00000000" + (value >>> 0).toString(16).toUpperCase()).slice(-8);
}

function decodeFixedTag(tag, bytes, offset) {
  switch (tag) {
    case "BL":
      return { key: "battery_level", value: readU16(bytes, offset), unit: "%" };
    case "VO":
      return { key: "voltage", value: round(readU16(bytes, offset) / 1000, 3), unit: "V" };
    case "TE":
      return { key: "temperature", value: round(readI16(bytes, offset) / 10, 1), unit: "C" };
    case "HU":
      return { key: "humidity", value: round(readU16(bytes, offset) / 10, 1), unit: "%" };
    case "BP":
      return { key: "barometric_pressure", value: round(readU16(bytes, offset) / 10, 1), unit: "hPa" };
    case "LX":
      return { key: "illuminance", value: round(readU16(bytes, offset) / 10, 1), unit: "lux" };
    case "CR":
      return { key: "current", value: round(readU16(bytes, offset) / 1000, 3), unit: "A" };
    case "A1":
      return { key: "adc1_voltage", value: round(readU16(bytes, offset) / 1000, 3), unit: "V" };
    case "A2":
      return { key: "adc2_voltage", value: round(readU16(bytes, offset) / 1000, 3), unit: "V" };
    case "A3":
      return { key: "adc3_voltage", value: round(readU16(bytes, offset) / 1000, 3), unit: "V" };
    case "C1":
      return { key: "ch1_current", value: round(readU16(bytes, offset) / 1000, 3), unit: "A" };
    case "C2":
      return { key: "ch2_current", value: round(readU16(bytes, offset) / 1000, 3), unit: "A" };
    case "C3":
      return { key: "ch3_current", value: round(readU16(bytes, offset) / 1000, 3), unit: "A" };

    /* Reserved/common Dragino-style extensions. Firmware may emit these from port 290 TLV. */
    case "DB":
      return { key: "noise", value: round(readU16(bytes, offset) / 10, 1), unit: "dB" };
    case "CO":
      return { key: "co2", value: readU16(bytes, offset), unit: "ppm" };
    case "PM":
      return { key: "pm2_5", value: readU16(bytes, offset), unit: "ug/m3" };
    case "P1":
      return { key: "pm10", value: readU16(bytes, offset), unit: "ug/m3" };
    case "DI":
      return { key: "digital_input", value: readU16(bytes, offset), unit: "" };
    case "DO":
      return { key: "digital_output", value: readU16(bytes, offset), unit: "" };
    case "CT":
      return { key: "count", value: readU32(bytes, offset), unit: "" };
    case "DS":
      return { key: "distance", value: round(readU16(bytes, offset) / 10, 1), unit: "cm" };
    case "WL":
      return { key: "water_level", value: round(readU16(bytes, offset) / 10, 1), unit: "cm" };
    case "PH":
      return { key: "ph", value: round(readU16(bytes, offset) / 100, 2), unit: "pH" };
    case "EC":
      return { key: "electrical_conductivity", value: readU16(bytes, offset), unit: "us/cm" };
    case "SM":
      return { key: "soil_moisture", value: round(readU16(bytes, offset) / 10, 1), unit: "%" };
    case "ST":
      return { key: "soil_temperature", value: round(readI16(bytes, offset) / 10, 1), unit: "C" };
    case "WS":
      return { key: "wind_speed", value: round(readU16(bytes, offset) / 10, 1), unit: "m/s" };
    case "WD":
      return { key: "wind_direction", value: readU16(bytes, offset), unit: "deg" };
    case "RN":
      return { key: "rain", value: round(readU16(bytes, offset) / 10, 1), unit: "mm" };
    default:
      return null;
  }
}

function tagLength(tag) {
  switch (tag) {
    case "CT":
      return 4;
    case "BL":
    case "VO":
    case "TE":
    case "HU":
    case "BP":
    case "LX":
    case "CR":
    case "A1":
    case "A2":
    case "A3":
    case "C1":
    case "C2":
    case "C3":
    case "DB":
    case "CO":
    case "PM":
    case "P1":
    case "DI":
    case "DO":
    case "DS":
    case "WL":
    case "PH":
    case "EC":
    case "SM":
    case "ST":
    case "WS":
    case "WD":
    case "RN":
      return 2;
    default:
      return 0;
  }
}

function decodeMeshBridgeRecord(bytes, start, length, payloadType) {
  var data = {};
  var warnings = [];
  var errors = [];
  var end = start + length;
  var offset = start + 7;

  if (length < 7 || end > bytes.length) {
    return { errors: ["payload too short: expected at least 7 bytes"] };
  }

  var nodeId = readU32(bytes, start);
  var batteryMv = readU16(bytes, start + 4);
  data.decoder = "MA01-LN_decode";
  data.payload_type = payloadType || "mesh_bridge";
  data.sensor_deveui = bytes[start] === 0x41 ? "A840" + hex8(nodeId) : hex8(nodeId);
  data.battery_mv = batteryMv;
  data.battery_v = round(batteryMv / 1000, 3);
  data.rssi = readI8(bytes[start + 6]);
  data.items = [];

  while (offset < end) {
    if (offset + 2 > end) {
      errors.push("truncated tag at byte " + offset);
      break;
    }

    var tag = String.fromCharCode(bytes[offset], bytes[offset + 1]);
    var len = tagLength(tag);
    offset += 2;

    if (len === 0) {
      errors.push("unknown tag '" + tag + "' at byte " + (offset - 2));
      break;
    }
    if (offset + len > end) {
      errors.push("truncated value for tag '" + tag + "' at byte " + offset);
      break;
    }

    var decoded = decodeFixedTag(tag, bytes, offset);
    if (decoded) {
      data[decoded.key] = decoded.value;
      data.items.push({
        tag: tag,
        key: decoded.key,
        value: decoded.value,
        unit: decoded.unit
      });
    } else {
      warnings.push("tag '" + tag + "' has length but no decoder");
    }
    offset += len;
  }

  data.item_count = data.items.length;
  var result = { data: data };
  if (warnings.length) result.warnings = warnings;
  if (errors.length) result.errors = errors;
  return result;
}

function decodeMeshBridge(bytes) {
  return decodeMeshBridgeRecord(bytes, 0, bytes.length, "mesh_bridge");
}

function decodeMeshBridgeBatch(bytes) {
  var data = {
    decoder: "MA01-LN_decode",
    payload_type: "mesh_bridge_batch",
    version: bytes[0],
    record_count: bytes[1],
    records: []
  };
  var warnings = [];
  var errors = [];
  var offset = 2;

  if (bytes.length < 2) {
    return { errors: ["batch payload too short"] };
  }
  if (bytes[0] !== 1) {
    return { errors: ["unsupported batch version " + bytes[0]] };
  }

  for (var i = 0; i < data.record_count; i++) {
    var recordLen;
    var decoded;

    if (offset >= bytes.length) {
      errors.push("missing record length for record " + i);
      break;
    }
    recordLen = bytes[offset++];
    if (recordLen < 7) {
      errors.push("invalid record length " + recordLen + " for record " + i);
      break;
    }
    if (offset + recordLen > bytes.length) {
      errors.push("truncated record " + i + " at byte " + offset);
      break;
    }

    decoded = decodeMeshBridgeRecord(bytes, offset, recordLen, "mesh_bridge");
    if (decoded.data) {
      data.records.push(decoded.data);
    }
    if (decoded.warnings) {
      warnings = warnings.concat(decoded.warnings);
    }
    if (decoded.errors) {
      errors = errors.concat(decoded.errors);
    }
    offset += recordLen;
  }

  data.decoded_record_count = data.records.length;
  if (offset < bytes.length) {
    warnings.push("trailing bytes after batch records: " + (bytes.length - offset));
  }

  var result = { data: data };
  if (warnings.length) result.warnings = warnings;
  if (errors.length) result.errors = errors;
  return result;
}

function freqBandName(value) {
  switch (value) {
    case 0x01: return "EU868";
    case 0x02: return "US915";
    case 0x03: return "IN865";
    case 0x04: return "AU915";
    case 0x05: return "KZ865";
    case 0x06: return "RU864";
    case 0x07: return "AS923";
    case 0x08: return "AS923_1";
    case 0x09: return "AS923_2";
    case 0x0A: return "AS923_3";
    case 0x0F: return "AS923_4";
    case 0x0B: return "CN470";
    case 0x0C: return "EU433";
    case 0x0D: return "KR920";
    case 0x0E: return "MA869";
    default: return "UNKNOWN";
  }
}

function gatewayModelName(value) {
  switch (value) {
    case 0x53: return "MA01-LN";
    default: return "UNKNOWN";
  }
}

function meshFrequencyProfile(value) {
  switch (value) {
    case 0x01: return { profile: "CN", frequency_mhz: 489.875, region: "China mainland" };
    case 0x02: return { profile: "EU", frequency_mhz: 869.525, region: "Europe" };
    case 0x03: return { profile: "RU", frequency_mhz: 868.825, region: "Russia" };
    case 0x04: return { profile: "BR", frequency_mhz: 904.875, region: "Brazil" };
    case 0x05: return { profile: "IN", frequency_mhz: 866.375, region: "India, Nepal, Kazakhstan" };
    case 0x06: return { profile: "US", frequency_mhz: 921.375, region: "United States, Australia/New Zealand, Korea, Taiwan, Malaysia" };
    case 0x07: return { profile: "JP", frequency_mhz: 921.875, region: "Japan" };
    case 0x08: return { profile: "TH", frequency_mhz: 922.375, region: "Thailand" };
    case 0x09: return { profile: "SG", frequency_mhz: 920.875, region: "Singapore" };
    case 0x0A: return { profile: "PH", frequency_mhz: 916.375, region: "Philippines" };
    default: return { profile: "UNKNOWN", frequency_mhz: null, region: "UNKNOWN" };
  }
}

function meshFirmwareVersion(majorMinor, patch) {
  if (majorMinor === 0xff || patch === 0xff) {
    return "UNKNOWN";
  }
  return ((majorMinor >> 4) & 0x0f) + "." + (majorMinor & 0x0f) + "." + patch;
}

function decodeMa01Ln(bytes, port) {
  if (port === 0x05) {
    var data;
    var meshFreq;

    if (bytes.length < 7) {
      return {
        data: {
          decoder: "MA01-LN_decode",
          payload_type: "ma01_ln_device_status"
        },
        errors: ["MA01-LN port 5 payload too short"]
      };
    }

    data = {
      GATEWAY_MODEL: gatewayModelName(bytes[0]),
      GATEWAY_MODEL_ID: "0x" + ("0" + bytes[0].toString(16).toUpperCase()).slice(-2),
      FIRMWARE_VERSION: (bytes[1] & 0x0f) + "." + ((bytes[2] >> 4) & 0x0f) + "." + (bytes[2] & 0x0f),
      LoRa_frequency_band: freqBandName(bytes[3]),
      LoRa_sub_band: bytes[4] === 0xff ? "NULL" : bytes[4],
      BAT: round(readU16(bytes, 5) / 1000, 3),
      BAT_mV: readU16(bytes, 5)
    };

    if (bytes.length >= 11) {
      meshFreq = meshFrequencyProfile(bytes[10]);
      data.MESH_MODULE_STATUS = (bytes[7] & 0x01) !== 0 ? "OK" : "CHECK";
      data.MESH_STATUS_BITS = "0x" + ("0" + bytes[7].toString(16).toUpperCase()).slice(-2);
      data.MESH_FIRMWARE_VERSION = meshFirmwareVersion(bytes[8], bytes[9]);
      data.MESH_FREQUENCY_PROFILE = meshFreq.profile;
      data.MESH_FREQUENCY_MHZ = meshFreq.frequency_mhz;
      data.MESH_REGION = meshFreq.region;
    }

    return {
      data: data
    };
  }

  return {
    warnings: ["unsupported fPort for MA01-LN decoder: " + port],
    data: {
      decoder: "MA01-LN_decode",
      payload_type: "unsupported"
    }
  };
}

function decodeUplink(input) {
  var bytes = input.bytes || [];
  var port = input.fPort !== undefined ? input.fPort : input.port;

  if (port === 2) {
    return decodeMeshBridge(bytes);
  }
  if (port === 3) {
    return decodeMeshBridgeBatch(bytes);
  }
  return decodeMa01Ln(bytes, port);
}

/* TTN v2 compatibility. */
function Decoder(bytes, port) {
  var result;

  if (port === 2) {
    result = decodeMeshBridge(bytes);
  } else if (port === 3) {
    result = decodeMeshBridgeBatch(bytes);
  } else {
    result = decodeMa01Ln(bytes, port);
  }
  return result.data || {};
}
