// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}

function calculateReading(integer, decimal) {
    if (decimal < 100000) {
        return integer + (decimal / 100000);
    } else if (decimal < 1000000) {
        return integer + (decimal / 1000000);
    } else {
        return integer + (decimal / 10000000);
    }
}

function getFrequencyBand(bandCode) {
    switch(bandCode) {
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
        case 0x0B: return "CN470";
        case 0x0C: return "EU433";
        case 0x0D: return "KR920";
        case 0x0E: return "MA869";
        default: return "UNKNOWN";
    }
}

function getMyDate(str) {
    var timestamp = parseInt(str);
    var date = new Date(timestamp > 9999999999 ? timestamp : timestamp * 1000);
    
    return [
        date.getFullYear(),
        getzf(date.getMonth()+1),
        getzf(date.getDate()),
        getzf(date.getHours()),
        getzf(date.getMinutes()),
        getzf(date.getSeconds())
    ].join('').replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
}









function Decode(fPort, bytes, variables) {
    var result = {};
    var batV;
    var Data_time;
    var sensor_mode;
    var firm_ver;
    var freq_band;
    var sub_band;
    var total_packages;
    var subcontracting_count;
    var dataTimes = [];
    var integers = [];
    var decimals = [];
    var readings = [];
    var Node_type;
	
    switch(fPort) {
        case 0x02:
            batV = (bytes[0] << 8 | bytes[1]) / 1000;
            Data_time = getMyDate((bytes[2] << 24 | bytes[3] << 16 | bytes[4] << 8 | bytes[5]).toString());
            var integer = bytes[6] << 24 | bytes[7] << 16 | bytes[8] << 8 | bytes[9];
            var decimal = bytes[10] << 24 | bytes[11] << 16 | bytes[12] << 8 | bytes[13];
            var reading = calculateReading(integer, decimal);
            
            result = {
                BatV: batV,
                Data_Time: Data_time,
                Reading: reading,
                "Node_type":"AIS01-LB"
            };
            break;

        case 0x03:
            batV = (bytes[4] << 8 | bytes[5]) / 1000;
            Data_time = getMyDate((bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3]).toString());
            total_packages = bytes[6];
            subcontracting_count = bytes[7];
            
            result = {
                BatV: batV,
                Data_Time: Data_time,
                total_packages: total_packages,
                subcontracting_count: subcontracting_count,
				"Node_type":"AIS01-LB"
            };
            break;

        case 0x04:
            batV = (bytes[0] << 8 | bytes[1]) / 1000;

            for (var i = 0; i < 32; i++) {
                var startIndex = 2 + i * 12;
                dataTimes.push(getMyDate(
                    (bytes[startIndex] << 24 | 
                    bytes[startIndex+1] << 16 | 
                    bytes[startIndex+2] << 8 | 
                    bytes[startIndex+3]).toString()
                ));
                
                integers.push(bytes[startIndex+7] << 24 | 
                            bytes[startIndex+6] << 16 | 
                            bytes[startIndex+5] << 8 | 
                            bytes[startIndex+4]);
                
                decimals.push(bytes[startIndex+11] << 24 | 
                            bytes[startIndex+10] << 16 | 
                            bytes[startIndex+9] << 8 | 
                            bytes[startIndex+8]);
            }

            for (var i = 0; i < 32; i++) {
                readings.push(calculateReading(integers[i], decimals[i]));
            }

            result.Data_Times = dataTimes.filter(function(time) { return time !== "1970-01-01 00:00:00"; });
            result.Readings = readings.filter(function(reading) { return reading !== 0; });
			result.Node_type="AIS01-LB";
            break;

        case 0x05:
            sensor_mode = (bytes[0] == 0x38) ? "AI01_LB" : "NULL";
            sub_band = (bytes[4] == 0xff) ? "NULL" : bytes[4];
            
            freq_band = getFrequencyBand(bytes[3]);
            
            firm_ver = ((bytes[1] & 0x0f) + '.' + 
                       ((bytes[2] >> 4) & 0x0f) + '.' + 
                       (bytes[2] & 0x0f));
            
            batV = (bytes[5] << 8 | bytes[6]) / 1000;
            
            result = {
                BatV: batV,
                SENSOR_MODEL: sensor_mode,
                FIRMWARE_VERSION: firm_ver,
                FREQUENCY_BAND: freq_band,
                SUB_BAND: sub_band
            };
            break;

        case 0x06:
            for (var i = 0; i < 3324; i++) {
                var startIndex = i * 12;
                
                dataTimes.push(getMyDate(
                    (bytes[startIndex] << 24 | 
                    bytes[startIndex+1] << 16 | 
                    bytes[startIndex+2] << 8 | 
                    bytes[startIndex+3]).toString()
                ));
                
                integers.push(bytes[startIndex+7] << 24 | 
                            bytes[startIndex+6] << 16 | 
                            bytes[startIndex+5] << 8 | 
                            bytes[startIndex+4]);
                
                decimals.push(bytes[startIndex+11] << 24 | 
                            bytes[startIndex+10] << 16 | 
                            bytes[startIndex+9] << 8 | 
                            bytes[startIndex+8]);
            }

            for (var i = 0; i < 3324; i++) {
                readings.push(calculateReading(integers[i], decimals[i]));
            }

            result.Data_Times = dataTimes.filter(function(time) { return time !== "1970-01-01 00:00:00"; });
            result.Readings = readings.filter(function(reading) { return reading !== 0; });
			result.Node_type="AIS01-LB";
            break;
    }

    return result;
}


function getzf(num) {
    return (num < 10 ? '0' : '') + num;
}