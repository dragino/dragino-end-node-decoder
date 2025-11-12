function decodeUplink(input) {
    const bytes = input.bytes;
    const port = input.fPort;
    let result;

    switch (port) {
        case 2: {
            const rawTimestamp = decodeTimestamp(bytes);
            result = {
                Timestamp: getMyDate(rawTimestamp.toString()),
                DevMode: decodeDeviceMode(bytes[4]),
                MACaddr: decodeMACAddress(bytes, 5),
                ProbeBat: decodeBatteryLevel(bytes[11]),
                BoxBat: decodeBatteryLevel(bytes[12]),
                Temp: []
            };
            for (let i = 13; i < bytes.length; i += 4) {
                result.Temp.push([
                    decodeTemperature(bytes, i),
                    decodeTemperature(bytes, i + 2)
                ]);
            }
            break;
        }

        case 3: {
            const dataLog = [];
            let offset = 0;
            while (offset + 14 <= bytes.length) {
                const tempDataLength = bytes[offset + 14];
                const entryLength = 15 + tempDataLength;
                if (offset + entryLength > bytes.length) break;
                const entry = decodeDatalogEntry(bytes, offset);
                dataLog.push(entry);
                offset += entryLength;
            }
            result = { DataLog: dataLog };
            break;
        }

        case 5:
            result = decodeDeviceInfo(bytes);
            break;

        case 6:
            result = decodeEvent(bytes);
            break;

        default:
            result = { error: "Unsupported port number" };
    }

   
    return { data: result };
}


function getzf(num) {
    return num < 10 ? '0' + num : num;
}

function getMyDate(str) {
    var c_Date;
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
    var c_Time = c_Year + '-' + getzf(c_Month) + '-' + getzf(c_Day) + ' ' + getzf(c_Hour) + ':' + getzf(c_Min) + ':' + getzf(c_Sen);
    return c_Time;
}

function decodeTemperature(bytes, offset) {
    const rawValue = (bytes[offset + 1] << 8) | bytes[offset];
    const isNegative = (rawValue & 0x8000) !== 0;
    const absoluteValue = rawValue & 0x7FFF;
    const temperature = isNegative ? -absoluteValue : absoluteValue;
    return (temperature / 10).toFixed(1);
}

function decodeTimestamp(bytes, offset = 0) {
    return (bytes[offset] << 24) |
        (bytes[offset + 1] << 16) |
        (bytes[offset + 2] << 8) |
        (bytes[offset + 3]);
}

function decodeDeviceMode(modeByte) {
    const modes = {
        0x01: "BLE_LoRa",
        0x02: "LoRa",
        0x03: "BLE"
    };
    return modes[modeByte] || "NULL";
}

function decodeMACAddress(bytes, offset = 0) {
    return Array.from(bytes.slice(offset, offset + 6))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function decodeBatteryLevel(batteryByte) {
    return batteryByte + '%';
}

function decodeDatalogEntry(bytes, offset) {
    const rawTimestamp = decodeTimestamp(bytes, offset);
    const entry = {
        Timestamp: getMyDate(rawTimestamp.toString()),
        DevMode: decodeDeviceMode(bytes[offset + 4]),
        MACaddr: decodeMACAddress(bytes, offset + 5),
        ProbeBat: decodeBatteryLevel(bytes[offset + 11]),
        BoxBat: decodeBatteryLevel(bytes[offset + 12])
    };
    const statusByte = bytes[offset + 13];
    if (statusByte & 0x80) {
        entry.Datalog_Reply = "NO_ACK_REPLY";
    } else if (statusByte & 0x40) {
        entry.Datalog_Reply = "POLL_REPLY";
    }
    const tempDataLength = bytes[offset + 14];
    entry.Temp = [];
    const tempPairCount = tempDataLength / 4;
    for (let i = 0; i < tempPairCount; i++) {
        const tempOffset = offset + 15 + (i * 4);
        const pair = [
            decodeTemperature(bytes, tempOffset),
            decodeTemperature(bytes, tempOffset + 2)
        ];
        entry.Temp.push(pair);
    }
    return entry;
}

function decodeEvent(bytes) {
    const events = {
        0x01: "PROBE_IN",
        0x02: "PROBE_OUT",
        0x03: "PROBE_FULL",
        0x04: "KEEP_ALIVCE",
    };
    return {
        ProbeEvent: events[bytes[4]] || "UNKNOWN_EVENT",
        BoxBat: decodeBatteryLevel(bytes[5]),
        Timestamp: getMyDate(decodeTimestamp(bytes).toString())
    };
}

function decodeDeviceInfo(bytes) {
    const frequencyBands = {
        0x01: "EU868", 0x02: "US915", 0x03: "IN865", 0x04: "AU915",
        0x05: "KZ865", 0x06: "RU864", 0x07: "AS923", 0x08: "AS923_1",
        0x09: "AS923_2", 0x0A: "AS923_3", 0x0F: "AS923_4", 0x0B: "CN470",
        0x0C: "EU433", 0x0D: "KR920", 0x0E: "MA869"
    };
    return {
        SENSOR_MODEL: bytes[0] === 0x4B ? "DMT01" : "UNKNOWN",
        FIRMWARE_VERSION: `${bytes[1] & 0x0f}.${(bytes[2] >> 4) & 0x0f}.${bytes[2] & 0x0f}`,
        FREQUENCY_BAND: frequencyBands[bytes[3]] || "UNKNOWN",
        SUB_BAND: bytes[4] === 0xFF ? "NULL" : bytes[4].toString()
    };
}