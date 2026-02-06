// Temperature unit Settings: 0 is Celsius and 1 is Fahrenheit
var TEMP_UNIT = 0;
// var TEMP_UNIT = 1;

function decodeUplink(input) {
    return { 
        data: Decode(input.fPort, input.bytes, input.variables)
    };
}

function datalog_mode2(i, bytes) {
    var value = (bytes[i] << 24 >> 16) | bytes[i + 1];
    var aa;
    
    if (TEMP_UNIT === 0) {
        aa = parseFloat(value / 100).toFixed(2);
    } else if (TEMP_UNIT === 1) {
        aa = parseFloat((value / 100) * 1.8 + 32).toFixed(3);
    }
    
    return aa;
}

function datalog_mode3(i, bytes) {
    var value1 = (bytes[i] << 24 >> 16) | bytes[i + 1];
    var value2 = (bytes[i + 2] << 24 >> 16) | bytes[i + 3];
    var aa, bb;
    
    if (TEMP_UNIT === 0) {
        aa = parseFloat(value1 / 100).toFixed(2);
        bb = parseFloat(value2 / 100).toFixed(2);
    } else if (TEMP_UNIT === 1) {
        aa = parseFloat((value1 / 100) * 1.8 + 32).toFixed(3);
        bb = parseFloat((value2 / 100) * 1.8 + 32).toFixed(3);
    }
    
    return '[' + aa + ', ' + bb + ']';
}

function formatTimestamp(timestamp, separator = ' ') {
    var ts = Number(timestamp);
    
    if (isNaN(ts)) {
        throw new Error('Invalid timestamp: Must be a number');
    }
    
    var date = ts.toString().length === 10 ? new Date(ts * 1000) : new Date(ts);
    
    if (isNaN(date.getTime())) {
        throw new Error('Invalid timestamp: Cannot be converted to a valid date');
    }
    
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}${separator}${hours}:${minutes}:${seconds}`;
}

function celsiusToFahrenheit(celsius) {
    var fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}

function Decode(fport, bytes, variables) {
    var decode = {};
    var k;
    var data_sum = "";
    var signedValue;
    
    if (fport === 2) {
        decode.Timestamp = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
        decode.Time = formatTimestamp(decode.Timestamp);
        decode.BatV = (bytes[4] * 20) / 1000;
        
        signedValue = bytes[5] << 24 >> 24;

        if (TEMP_UNIT === 0) {
            decode.MaxTempPT100 = parseFloat(signedValue.toFixed(1));
        } else if (TEMP_UNIT === 1) {
            decode.MaxTempPT100 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(1));
        }

        signedValue = bytes[6] << 24 >> 24;
        
        if (TEMP_UNIT === 0) {
            decode.HighTempThld = parseFloat(signedValue.toFixed(1));
        } else if (TEMP_UNIT === 1) {
            decode.HighTempThld = parseFloat(celsiusToFahrenheit(signedValue).toFixed(1));
        }
        
        decode.OvertempIntvlNum = (bytes[7] << 8) | bytes[8];
        decode.SampleIntvlMs = (bytes[9] << 8) | bytes[10];
        decode.OvertempDurationSec = decode.OvertempIntvlNum * (decode.SampleIntvlMs / 1000);
        
        decode.NodeType = "DishSense";
        
        if (bytes.length === 11) return decode;
    } 
    else if (fport === 17 || fport === 18) {
        decode.Timestamp = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
        decode.Time = formatTimestamp(decode.Timestamp);
        decode.BatV = (bytes[4] * 20) / 1000;
        
        signedValue = bytes[5] << 24 >> 24;

        if (TEMP_UNIT === 0) {
            decode.MaxTempPT100 = parseFloat(signedValue.toFixed(1));
        } else if (TEMP_UNIT === 1) {
            decode.MaxTempPT100 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(1));
        }
        
        decode.NodeType = "DishSense";
        
        if (fport === 17) {
            decode.TempCal = "OFF";
        } else if (fport === 18) {
            decode.TempCal = "ON";
        }
        return decode;
    } 
    else if (fport === 13) {
        decode.Timestamp = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
        decode.Time = formatTimestamp(decode.Timestamp);
        decode.BatV = bytes[4] << 8 | bytes[5];
        
        decode.NodeType = "DishSense";
        
        return decode;
    } 
    else if(fport === 9) {
        decode.PacketType = "Retrive";
    } 
    else if(fport === 10) {
        decode.PacketType = "NotRecvAck";
    } 
    else if (fport === 11) {
        decode.NodeType = "DishSense";
        decode.BatV = ((bytes[0] << 8) | bytes[1]) / 1000;
        decode.SampleCount = bytes[3];
        decode.SampleIntvlSec = ((bytes[4] << 8) | bytes[5]) / 1000;
        
        signedValue = (((bytes[6] << 8) | bytes[7]) << 16 >> 16) / 100;

        if (TEMP_UNIT === 0) {
            decode.MaxTempPT100 = parseFloat(signedValue.toFixed(3));
        } else if (TEMP_UNIT === 1) {
            decode.MaxTempPT100 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(3));
        }
        
        for (k = 8; k < bytes.length; k += 2) {
            data_sum += datalog_mode2(k, bytes);
            if(k < bytes.length - 2) {
                data_sum += ', ';
            }
        }
        
        decode.Datalog = data_sum;
        return decode;
    } 
    else if (fport === 12) {
        decode.NodeType = "DishSense";
        decode.BatV = ((bytes[0] << 8) | bytes[1]) / 1000;
        decode.SampleCount = bytes[3];
        decode.SampleIntvlSec = ((bytes[4] << 8) | bytes[5]) / 1000;
        
        signedValue = (((bytes[6] << 8) | bytes[7]) << 16 >> 16) / 100;
        
        if (TEMP_UNIT === 0) {
            decode.MaxTempPT100 = parseFloat(signedValue.toFixed(3));
        } else if (TEMP_UNIT === 1) {
            decode.MaxTempPT100 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(3));
            
        }
        
        signedValue = (((bytes[8] << 8) | bytes[9]) << 16 >> 16) / 100;

        if (TEMP_UNIT === 0) {
            decode.MaxTempDs18b20 = parseFloat(signedValue.toFixed(3));
        } else if (TEMP_UNIT === 1) {
            decode.MaxTempDs18b20 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(3));
        }
        
        for (k = 10; k < bytes.length; k += 4) {
            data_sum += datalog_mode3(k, bytes);
            if(k < bytes.length - 4) {
                data_sum += ', ';
            }
        }
        
        decode.Datalog = data_sum;
        return decode;
    } 
    else if (fport === 8) {
        decode.WorkMode = bytes[0];
        decode.SampleDelaySec = ((bytes[1] << 8) | bytes[2]) / 1000;
        decode.ArrowSwitchIntvlSec = ((bytes[3] << 8) | bytes[4]) / 1000;
        decode.SampleIntvlSec = ((bytes[5] << 8) | bytes[6]) / 1000;
        
        if (decode.WorkMode === 1) {
            decode.SampleCount = (bytes[7] << 8) | bytes[8];
            
            signedValue = (((bytes[9] << 8) | bytes[10]) << 16 >> 16) / 100;

            if (TEMP_UNIT === 0) {
                decode.HighTempThld = parseFloat(signedValue.toFixed(3));
            } else if (TEMP_UNIT === 1) {
                decode.HighTempThld = parseFloat(celsiusToFahrenheit(signedValue).toFixed(3));
            }
        } else if (decode.WorkMode === 2 || decode.WorkMode === 3) {
            decode.SampleCount = bytes[7];
            decode.BtnInactTimeoutSec = bytes[8] << 8 | bytes[9];
        }
        
        decode.NodeType = "DishSense";
        
        if ((decode.WorkMode === 1 && bytes.length === 11) || 
            ((decode.WorkMode === 2 || decode.WorkMode === 3) && bytes.length === 10)) {
            return decode;
        }
    } 
    else if (fport === 6) {
        decode.Timestamp = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
        decode.Time = formatTimestamp(decode.Timestamp);
        decode.BatV = ((bytes[4] << 8) | bytes[5]) / 1000;
        
        signedValue = (((bytes[6] << 8) | bytes[7]) << 16 >> 16) / 100;

        if (TEMP_UNIT === 0) {
            decode.TempPT100 = parseFloat(signedValue.toFixed(3));
        } else if (TEMP_UNIT === 1) {
            decode.TempPT100 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(3));
        }

        signedValue = (((bytes[8] << 8) | bytes[9]) << 16 >> 16) / 100;

        if (TEMP_UNIT === 0) {
            decode.TempDs18b20 = parseFloat(signedValue.toFixed(3));
        } else if (TEMP_UNIT === 1) {
            decode.TempDs18b20 = parseFloat(celsiusToFahrenheit(signedValue).toFixed(3));
        }
        
        decode.NodeType = "DishSense";
        
        if (bytes.length === 10) return decode;
    } 
    else if (fport === 5) {
        var freq_band;
        var sensor = (bytes[0] === 0x51) ? "DishSense" : "Unknown";
        var firm_ver = bytes[1] + '.' + bytes[2] + '.' + bytes[3];
        
        switch (bytes[4]) {
            case 0x01: freq_band = "EU868"; break;
            case 0x02: freq_band = "US915"; break;
            case 0x03: freq_band = "IN865"; break;
            case 0x04: freq_band = "AU915"; break;
            case 0x05: freq_band = "KZ865"; break;
            case 0x06: freq_band = "RU864"; break;
            case 0x07: freq_band = "AS923"; break;
            case 0x08: freq_band = "AS923_1"; break;
            case 0x09: freq_band = "AS923_2"; break;
            case 0x0A: freq_band = "AS923_3"; break;
            case 0x0F: freq_band = "AS923_4"; break;
            case 0x0B: freq_band = "CN470"; break;
            case 0x0C: freq_band = "EU433"; break;
            case 0x0D: freq_band = "KR920"; break;
            case 0x0E: freq_band = "MA869"; break;
            default: freq_band = "Unknown"; break;
        }
        
        var sub_band = (bytes[5] === 0xFF) ? "NULL" : bytes[5].toString();
        var bat = ((bytes[6] << 8) | bytes[7]) / 1000;
        
        return {
            SENSOR_MODEL: sensor,
            FIRMWARE_VERSION: firm_ver,
            FREQUENCY_BAND: freq_band,
            SUB_BAND: sub_band,
            BAT: bat
        };
    }
    
    return decode;
}