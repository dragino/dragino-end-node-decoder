function decodeUplink(input) {
  var port = input.fPort;
  var bytes = input.bytes;
  var data = {};

  function getzf(c_num) {
    return parseInt(c_num) < 10 ? '0' + c_num : c_num.toString();
  }

  function getMyDate(str) {
    var c_Date = str > 9999999999 ? 
      new Date(parseInt(str)) : 
      new Date(parseInt(str) * 1000);
    
    return c_Date.getFullYear() + '-' +
      getzf(c_Date.getMonth() + 1) + '-' +
      getzf(c_Date.getDate()) + ' ' +
      getzf(c_Date.getHours()) + ':' +
      getzf(c_Date.getMinutes()) + ':' +
      getzf(c_Date.getSeconds());
  }

  function datalog(i, bytes) {
    var aa = ((bytes[i] << 24 >> 16 | bytes[i+1]) / 10).toFixed(1);
    var bb = ((bytes[i+2] << 24 >> 16 | bytes[i+3]) / 10).toFixed(1);
    var cc = ((bytes[i+4] << 24 >> 16 | bytes[i+5]) / 10).toFixed(1);
    var dd = (bytes[i+6] & 0x01) ? "True" : "False";
    var timestamp = bytes[i+7] << 24 | bytes[i+8] << 16 | bytes[i+9] << 8 | bytes[i+10];
    
    return `[${aa},${bb},${cc},${dd},${getMyDate(timestamp.toString())}],`;
  }

  switch (port) {
    case 2:
      // 修复语法错误：补全parseFloat的括号
      data.BatV = (bytes[0] << 8 | bytes[1]) / 1000;
      data.Sound_key = ((bytes[2] >> 1) & 0x01) ? "OPEN" : "CLOSE";
      data.Sound_ACK = (bytes[2] & 0x01) ? "OPEN" : "CLOSE";
      data.Alarm = (bytes[3] & 0x01) ? "TRUE" : "FALSE";
      data.TempC_SHT41 = parseFloat(((bytes[4] << 24 >> 16 | bytes[5]) / 10).toFixed(1));
      data.Hum_SHT41 = parseFloat(((bytes[6] << 8 | bytes[7]) / 10).toFixed(1));

      return bytes.length === 8 ? { data: data } : { errors: ["Invalid payload length"] };

    case 3:
      if (bytes.length % 11 !== 0) {
        return { errors: ["Invalid datalog format"] };
      }
      
      data.PNACKMD = ((bytes[6] >> 7) & 0x01) ? "True" : "False";
      data.DATALOG = [];
      data.Node_type="PB01-L";
      for (var i = 0; i < bytes.length; i += 11) {
        data.DATALOG.push([
          parseFloat(((bytes[i] << 24 >> 16 | bytes[i+1]) / 10).toFixed(1)),
          parseFloat(((bytes[i+2] << 24 >> 16 | bytes[i+3]) / 10).toFixed(1)),
          parseFloat(((bytes[i+4] << 24 >> 16 | bytes[i+5]) / 10).toFixed(1)),
          (bytes[i+6] & 0x01) ? "True" : "False",
          getMyDate((bytes[i+7] << 24 | bytes[i+8] << 16 | bytes[i+9] << 8 | bytes[i+10]).toString(10))
        ]);
      }
      return { data: data };

    case 5:
      const FREQ_BAND_MAP = {
        0x01: "EU868", 0x02: "US915", 0x03: "IN865",
        0x04: "AU915", 0x05: "KZ865", 0x06: "RU864",
        0x07: "AS923", 0x08: "AS923_1", 0x09: "AS923_2",
        0x0A: "AS923_3", 0x0F: "AS923_4", 0x0B: "CN470",
        0x0C: "EU433", 0x0D: "KR920", 0x0E: "MA869"
      };

      data.SENSOR_MODEL = bytes[0] === 0x35 ? "PB01-L" : "Unknown";
      data.FIRMWARE_VERSION = `${bytes[1] & 0x0F}.${(bytes[2] >> 4) & 0x0F}.${bytes[2] & 0x0F}`;
      data.FREQUENCY_BAND = FREQ_BAND_MAP[bytes[3]] || "Unknown";
      data.SUB_BAND = bytes[4] === 0xFF ? "NULL" : bytes[4];
      data.BAT = (bytes[5] << 8 | bytes[6]) / 1000;

      return { data: data };

    default:
      return { errors: ["unknown FPort"] };
  }
}