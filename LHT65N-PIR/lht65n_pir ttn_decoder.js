/**
 * Helper: Format byte to hex string with padding
 */
function str_pad(byte) {
    var hex = byte.toString(16);
    return (hex.length < 2 ? '0' : '') + hex + ' ';
}

/**
 * Helper: Convert timestamp to readable date
 */
function getzf(c_num) {
    return parseInt(c_num) < 10 ? '0' + c_num : c_num.toString();
}

function getMyDate(str) {
    var c_Date;
    // Handle seconds vs milliseconds
    if (str > 9999999999)
        c_Date = new Date(parseInt(str));
    else
        c_Date = new Date(parseInt(str) * 1000);

    var c_Year = c_Date.getFullYear(),
        c_Month = c_Date.getMonth() + 1,
        c_Day = c_Date.getDate(),
        c_Hour = c_Date.getHours(),
        c_Min = c_Date.getMinutes(),
        c_Sen = c_Date.getSeconds();

    return c_Year + '-' + getzf(c_Month) + '-' + getzf(c_Day) + ' ' +
        getzf(c_Hour) + ':' + getzf(c_Min) + ':' + getzf(c_Sen);
}

/**
 * Helper: Process data log entries (Fixed logic errors)
 */
function datalog(i, bytes) {
    // Ensure we don't go out of bounds
    if (i + 10 >= bytes.length) return "";

    var Ext = bytes[6 + i] & 0x0F;
    var bb;

    // FIX: Compare numbers, not strings
    if (Ext === 1 || Ext === 9) {
        // FIX: Correct bitwise operation. (byte0 << 8) | byte1 creates a 16-bit int
        var val = (bytes[0 + i] << 8) | bytes[1 + i];
        bb = parseFloat((val / 100).toFixed(2));
    } else if (Ext === 2) {
        var val = (bytes[0 + i] << 8) | bytes[1 + i];
        bb = parseFloat((val / 100).toFixed(2));
    } else if (Ext === 4) {
        var Exti_pin_level = bytes[0 + i] ? "High" : "Low";
        var Exti_status = bytes[1 + i] ? "True" : "False";
        bb = Exti_pin_level + Exti_status;
    } else if (Ext === 5) {
        bb = (bytes[0 + i] << 8) | bytes[1 + i];
    } else if (Ext === 6) {
        bb = ((bytes[0 + i] << 8) | bytes[1 + i]) / 1000;
    } else if (Ext === 7) {
        bb = (bytes[0 + i] << 8) | bytes[1 + i];
    } else if (Ext === 8 || Ext === 14) {
        bb = (bytes[0 + i] << 8) | bytes[1 + i];
    } else if (Ext === 11) {
        var val = (bytes[0 + i] << 8) | bytes[1 + i];
        bb = parseFloat((val / 100).toFixed(2));
    } else {
        bb = 0; // Default fallback
    }

    // Calculate CC and DD based on subsequent bytes
    // Note: Original code had potential out-of-bounds risk here if packet is short
    if (i + 3 >= bytes.length || i + 5 >= bytes.length) {
         return "[" + bb + ",0,0,0]"; 
    }

    var cc_val = (bytes[2 + i] << 8) | bytes[3 + i];
    var cc = parseFloat((cc_val / 100).toFixed(2));

    var dd_raw = (bytes[4 + i] << 8) | bytes[5 + i];
    var dd = parseFloat(((dd_raw & 0xFFF) / 10).toFixed(1));

    // Timestamp calculation
    if (i + 10 >= bytes.length) {
         return "[" + bb + "," + cc + "," + dd + ",0]";
    }
    var ts = (bytes[7 + i] << 24) | (bytes[8 + i] << 16) | (bytes[9 + i] << 8) | bytes[10 + i];
    var ee = getMyDate(ts.toString(10));

    return '[' + bb + ',' + cc + ',' + dd + ',' + ee + ']' + ',';
}

function Decoder(bytes, port) {
    if (!bytes || bytes.length === 0) return {};

    var Ext = bytes[6] & 0x0F;
    var poll_message_status = (bytes[6] >> 6) & 0x01;
    var Connect = (bytes[6] & 0x80) >> 7;
    var decode = {};

    // --- PORT 3: Sensor Configuration / Initial Data ---
    if (port === 3 && bytes.length >= 2) {
        var sensorType = bytes[2];
        var array1 = [];
        
        // FIX: Removed complex string conversion. Directly process bytes.
        // Assuming bytes[0], bytes[1] are battery info, and subsequent pairs are temp data?
        // Original logic tried to parse hex strings from bytes. 
        // Let's interpret the original intent: 
        // bytes[0]<<8 | bytes[1] -> Battery (masked)
        // Then loop through remaining bytes in pairs for temperature
        
        decode.bat = ((bytes[0] << 8) | bytes[1]) & 0x3FFF;
        decode.bat = decode.bat / 100; // Usually battery is in V or %, original code didn't divide bat but did for temp? 
        // Looking at original: decode.bat=parseInt(...)& 0x3FFF. It kept it as integer. 
        // But later temp division by 100 suggests these are scaled integers.
        // Let's stick to original logic structure but fix the parsing:
        
        // Original: decode.bat = parseInt("0x" + str2.substring(0,4)) & 0x3FFF
        // Equivalent to:
        decode.bat = ((bytes[0] << 8) | bytes[1]) & 0x3FFF;

        if (sensorType === 1) decode.sensor = "ds18b20";
        else if (sensorType === 2) decode.sensor = "tmp117";
        else if (sensorType === 3) decode.sensor = "gxht30";
        else if (sensorType === 4) decode.sensor = "sht31";

        decode.Node_type = "LHT65N-PIR";

        // Process remaining bytes as temperature readings (pairs)
        // Original code started parsing from index 6 (after header) roughly
        // The original regex logic split the hex string into chunks of 4 chars (2 bytes)
        // We will iterate from index 3 (assuming 0,1=bat, 2=type) or wherever data starts
        // Based on `str1.substring(6,)`, it skipped first 3 bytes (6 hex chars).
        
        var startIndex = 3; 
        for (var k = startIndex; k < bytes.length - 1; k += 2) {
            var rawTemp = (bytes[k] << 8) | bytes[k + 1];
            var temp = rawTemp / 100;
            array1.push(temp);
        }
        decode.Temp = array1;
        
        return decode;
    }

    // --- PORT 5: Device Info ---
    else if (port === 5) {
        var sub_band, freq_band, sensor;

        if (bytes[0] === 0x0B) sensor = "LHT65N";
        else if (bytes[0] === 0x1A) sensor = "LHT65N-PIR";

        sub_band = (bytes[4] === 0xff) ? "NULL" : bytes[4];

        switch (bytes[3]) {
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
            case 0x0B: freq_band = "CN470"; break;
            case 0x0C: freq_band = "EU433"; break;
            case 0x0D: freq_band = "KR920"; break;
            case 0x0E: freq_band = "MA869"; break;
            default: freq_band = "Unknown";
        }

        var firm_ver = (bytes[1] & 0x0f) + '.' + ((bytes[2] >> 4) & 0x0f) + '.' + (bytes[2] & 0x0f);
        var bat = ((bytes[5] << 8) | bytes[6]) / 1000;

        return {
            SENSOR_MODEL: sensor,
            FIRMWARE_VERSION: firm_ver,
            FREQUENCY_BAND: freq_band,
            SUB_BAND: sub_band,
            BAT: bat,
        };
    }

    // --- Standard Data Decoding (Port others or default) ---
    
    // Switch based on poll_message_status (Bit 6 of byte 6)
    switch (poll_message_status) {
        case 0: // Periodic Data
            if (Ext === 0x09) {
                // DS18B20 & Timestamp mode specific?
                // Original: ((bytes[0]<<24>>16 | bytes[1])/100)
                // Fix: (bytes[0] << 8 | bytes[1])
                decode.TempC_DS = parseFloat(((bytes[0] << 8 | bytes[1]) / 100).toFixed(2));
                decode.Bat_status = bytes[4] >> 6;
            } else {
                decode.BatV = (((bytes[0] << 8) | bytes[1]) & 0x3FFF) / 1000;
                decode.Bat_status = bytes[0] >> 6;
            }

            if (Ext !== 0x0F) {
                decode.TempC_SHT = parseFloat(((bytes[2] << 8 | bytes[3]) / 100).toFixed(2));
                decode.Hum_SHT = parseFloat((((bytes[4] << 8 | bytes[5]) & 0xFFF) / 10).toFixed(1));
            }

            if (Connect === 1) {
                decode.No_connect = "Sensor no connection";
            }

            // External Sensor Logic
            // FIX: Use number comparison
            if (Ext === 0) {
                decode.Ext_sensor = "No external sensor";
            } else if (Ext === 1) {
                decode.Ext_sensor = "Temperature Sensor";
                decode.TempC_DS = parseFloat(((bytes[7] << 8 | bytes[8]) / 100).toFixed(2));
            } else if (Ext === 2) {
                decode.Ext_sensor = "Temperature Sensor";
                decode.TempC_TMP117 = parseFloat(((bytes[7] << 8 | bytes[8]) / 100).toFixed(2));
            } else if (Ext === 4) {
                decode.Work_mode = "Interrupt Sensor send";
                decode.Exti_pin_level = bytes[7] ? "High" : "Low";
                decode.Exti_status = bytes[8] ? "True" : "False";
                if(bytes.length > 11) {
                    decode.Exit_count = (bytes[9] << 16) | (bytes[10] << 8) | bytes[11];
                    // Duration might need more bytes, original code used 12,13,14
                    if(bytes.length > 14) {
                         decode.Exit_duration = (bytes[12] << 16) | (bytes[13] << 8) | bytes[14];
                    }
                }
            } else if (Ext === 5) {
                decode.Work_mode = "Illumination Sensor";
                decode.ILL_lx = (bytes[7] << 8) | bytes[8];
            } else if (Ext === 6) {
                decode.Work_mode = "ADC Sensor";
                decode.ADC_V = ((bytes[7] << 8) | bytes[8]) / 1000;
            } else if (Ext === 7) {
                decode.Work_mode = "Interrupt Sensor count";
                decode.Exit_count = (bytes[7] << 8) | bytes[8];
            } else if (Ext === 8) {
                decode.Work_mode = "Interrupt Sensor count";
                if(bytes.length > 10) {
                    decode.Exit_count = (bytes[7] << 24) | (bytes[8] << 16) | (bytes[9] << 8) | bytes[10];
                }
            } else if (Ext === 9) {
                decode.Work_mode = "DS18B20 & timestamp";
                if(bytes.length > 10) {
                    decode.Systimestamp = (bytes[7] << 24) | (bytes[8] << 16) | (bytes[9] << 8) | bytes[10];
                }
            } else if (Ext === 11) {
                decode.Work_mode = "SHT31 Sensor";
                if(bytes.length > 10) {
                    decode.Ext_TempC_SHT = parseFloat(((bytes[7] << 8 | bytes[8]) / 100).toFixed(2));
                    decode.Ext_Hum_SHT = parseFloat((((bytes[9] << 8 | bytes[10]) & 0xFFF) / 10).toFixed(1));
                }
            } else if (Ext === 14) {
                decode.Work_mode = "PIR Sensor";
                if(bytes.length > 10) {
                    decode.Exti_pin_level = (bytes[7] & 0x01) ? "Activity" : "No activity";
                    decode.Move_count = (bytes[8] << 16) | (bytes[9] << 8) | bytes[10];
                }
            } else if (Ext === 15) {
                decode.Work_mode = "DS18B20ID";
                // Construct ID string safely
                var idBytes = [2,3,4,5,7,8,9,10];
                var idStr = "";
                for(var idx of idBytes) {
                    if(idx < bytes.length) idStr += str_pad(bytes[idx]);
                }
                decode.ID = idStr.trim();
            }

            decode.Node_type = "LHT65N-PIR";
            // Return if length matches expected patterns
            if (bytes.length === 11 || bytes.length === 15) {
                return decode;
            }
            // If length doesn't match exactly but we parsed what we could, still return
            return decode; 

        case 1: // Data Log
            var fullString = "";
            // Loop through bytes in chunks of 11 (based on original logic)
            // Note: Original datalog function accesses up to i+10, so chunk size 11 is correct
            for (var i = 0; i < bytes.length; i += 11) {
                // Check if we have enough bytes for a full record
                if (i + 10 < bytes.length) {
                    var da = datalog(i, bytes);
                    fullString += da;
                }
            }
            
            if (fullString.length > 0) {
                // Remove trailing comma if exists
                if (fullString.endsWith(',')) {
                    fullString = fullString.slice(0, -1);
                }
                decode.DATALOG = fullString;
            }
            
            decode.Node_type = "LHT65N-PIR";
            return decode;

        default:
            return {
                errors: ["unknown_poll_status"]
            };
    }
}