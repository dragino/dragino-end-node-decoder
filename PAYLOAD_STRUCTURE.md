# Dragino End Node Payload Structure Reference

This document summarizes the payload structure for each product directory and matches every decoder file in this repository to its detected fPort values and decoded output fields.

Notes:
- `fPort` values are extracted from decoder checks such as `port`, `fPort`, and `case` statements. If a decoder does not explicitly check fPort, it is marked as `not specified`; fallback branches are marked as `default / other ports`.
- Output fields are extracted from returned objects and assignments such as `decode.xxx`, `data.xxx`, `result.xxx`, and `entry.xxx`.
- Field descriptions are inferred from field names and decoder logic. The decoder source file remains the authoritative implementation.
- Datacake directories contain platform decoder files and are included in the list. `Node-RED` and `Gateway Management` are flow or management examples and are not counted as product decoder directories.

This reference covers `91` product/platform decoder directories and `331` decoder files.

## Product Index

- [AIS01](#ais01)
- [AQS01-L](#aqs01-l)
- [AQS02-L](#aqs02-l)
- [Airflow-LN](#airflow-ln)
- [BH01-LB](#bh01-lb)
- [CPL01](#cpl01)
- [CPL03-LB](#cpl03-lb)
- [CS01-LB](#cs01-lb)
- [D20-LB&D20S-LB&D22-LB&D23-LB](#d20-lbd20s-lbd22-lbd23-lb)
- [DDS04-LB](#dds04-lb)
- [DDS20-LB](#dds20-lb)
- [DDS45-LB](#dds45-lb)
- [DDS75-LB](#dds75-lb)
- [DMT01](#dmt01)
- [DS03A-LB](#ds03a-lb)
- [DS20L](#ds20l)
- [Datacake-Dragino_CB](#datacake-draginocb)
- [Datacake-Dragino_NB](#datacake-draginonb)
- [Datacake-Dragino_NB_New_Version](#datacake-draginonbnewversion)
- [DishSense](#dishsense)
- [GroPoint Air](#gropoint-air)
- [LA66 USB](#la66-usb)
- [LAQ4](#laq4)
- [LC01](#lc01)
- [LC03](#lc03)
- [LCC01-LB](#lcc01-lb)
- [LDDS04](#ldds04)
- [LDDS20](#ldds20)
- [LDDS45](#ldds45)
- [LDDS75](#ldds75)
- [LDS02](#lds02)
- [LDS03A](#lds03a)
- [LDS12-LB](#lds12-lb)
- [LDS25-LB](#lds25-lb)
- [LDS40-LB](#lds40-lb)
- [LHT52](#lht52)
- [LHT65N](#lht65n)
- [LHT65N-PIR](#lht65n-pir)
- [LHT65N-VIB](#lht65n-vib)
- [LLDS12](#llds12)
- [LLDS40](#llds40)
- [LLMS01](#llms01)
- [LMDS120](#lmds120)
- [LMDS200](#lmds200)
- [LMS01-LB](#lms01-lb)
- [LPT01](#lpt01)
- [LSE01](#lse01)
- [LSN50 & LSN50-v2](#lsn50--lsn50-v2)
- [LSN50v2-D20-D22-D23](#lsn50v2-d20-d22-d23)
- [LSN50v2-S31&S31B](#lsn50v2-s31s31b)
- [LSPH01](#lsph01)
- [LT22222-L](#lt22222-l)
- [LTC2](#ltc2)
- [LTC2-LB](#ltc2-lb)
- [LWL02](#lwl02)
- [LWL03A](#lwl03a)
- [LWL04-LB](#lwl04-lb)
- [MDS120-LB](#mds120-lb)
- [MDS200-LB](#mds200-lb)
- [MRxx_LB](#mrxxlb)
- [PB01](#pb01)
- [PB05](#pb05)
- [PF52](#pf52)
- [POM01-LB](#pom01-lb)
- [PS-LB](#ps-lb)
- [RS485-BL](#rs485-bl)
- [RS485-LB](#rs485-lb)
- [RS485-LB_A16-15](#rs485-lba16-15)
- [RS485-LN](#rs485-ln)
- [S31-LB&S31B-LB](#s31-lbs31b-lb)
- [SDI-12-LB](#sdi-12-lb)
- [SE01-LB](#se01-lb)
- [SE02-LB](#se02-lb)
- [SE0X-LB](#se0x-lb)
- [SN50_v3-LB](#sn50v3-lb)
- [SPH01-LB](#sph01-lb)
- [SVC01-L](#svc01-l)
- [SW3L](#sw3l)
- [SW3L-LB](#sw3l-lb)
- [T68DL](#t68dl)
- [TC01-LB](#tc01-lb)
- [TS01-LB](#ts01-lb)
- [Thermostat1](#thermostat1)
- [TrackerD](#trackerd)
- [UV254-LB](#uv254-lb)
- [WL03A-LB](#wl03a-lb)
- [WQS-LB](#wqs-lb)
- [WSC2-Compact-LS](#wsc2-compact-ls)
- [WSC2-LB](#wsc2-lb)
- [WSC3-LB](#wsc3-lb)
- [Weather Station](#weather-station)

## AIS01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `AIS01/AIS01-LB Pointer dial TTN V1.0.8.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | units, BatV, Data_Time, Reading, Node_type, total_packages, subcontracting_count, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, Data_Times, Readings |
| `AIS01/AIS01-LB_ChirpstackV3.txt` | 1 (0x01), 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E), default / other ports | Device information payload. Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | calibration, temperature, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0A, case 0x0B, case 0x0C, case 0x0D, case 0x0E, default, timestamp, BatV, Data_Time, Reading, Node_type, total_packages, subcontracting_count, AI01_LB, ... (+7) |
| `AIS01/AIS01-LB_Chirpstack_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | units, BatV, Data_Time, Reading, Node_type, total_packages, subcontracting_count, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, Data_Times, Readings |
| `AIS01/AIS01-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | units, BatV, Data_Time, Reading, Node_type, total_packages, subcontracting_count, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, Data_Times, Readings |
| `AIS01/AIS01_Thingseyes_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | units, BatV, Data_Time, Reading, total_packages, subcontracting_count, imgdata, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, Data_Times, Readings |

Field reference:
- `units`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Data_Time`: timestamp or decoded time.
- `Reading`: decoded output field.
- `Node_type`: device model or sensor type.
- `total_packages`: counter or total count.
- `subcontracting_count`: counter or total count.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `SMODE`: decoded output field.
- `Data_Times`: timestamp or decoded time.
- `Readings`: decoded output field.
- `calibration`: decoded output field.
- `temperature`: temperature.
- `case 0x01`: decoded output field.
- `case 0x02`: decoded output field.
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `case 0x05`: decoded output field.
- `case 0x06`: decoded output field.
- `case 0x07`: decoded output field.
- `case 0x08`: decoded output field.
- `case 0x09`: decoded output field.
- `case 0x0A`: decoded output field.
- `case 0x0B`: decoded output field.
- `case 0x0C`: decoded output field.
- `case 0x0D`: decoded output field.
- `case 0x0E`: decoded output field.
- `default`: decoded output field.
- `timestamp`: timestamp or decoded time.
- `AI01_LB`: decoded output field.
- `NULL`: decoded output field.
- `imgdata`: decoded output field.

## AQS01-L

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `AQS01-L/AQS01-L_V1.0_ChirpstackV4_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temperature, humidity, air_pressure, co2, TEMPL_flag, TEMPH_flag, CO2L_flag, CO2H_flag |
| `AQS01-L/AQS01-L_V1.3_ChirpstackV4_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temperature, humidity, air_pressure, co2, TEMPL_flag, TEMPH_flag, CO2L_flag, CO2H_flag |
| `AQS01-L/AQS01-L_v1.0_TTN_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temperature, humidity, air_pressure, co2, TEMPL_flag, TEMPH_flag, CO2L_flag, CO2H_flag |
| `AQS01-L/AQS01-L_v1.3_TTN_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temperature, humidity, air_pressure, co2, TEMPL_flag, TEMPH_flag, CO2L_flag, CO2H_flag |

Field reference:
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temperature`: temperature.
- `humidity`: humidity.
- `air_pressure`: pressure or barometric pressure.
- `co2`: CO2 concentration.
- `TEMPL_flag`: temperature; status, trigger, alarm, or flag.
- `TEMPH_flag`: temperature; status, trigger, alarm, or flag.
- `CO2L_flag`: CO2 concentration; status, trigger, alarm, or flag.
- `CO2H_flag`: CO2 concentration; status, trigger, alarm, or flag.

## AQS02-L

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `AQS02-L/AQS02-L.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temperature, humidity, air_pressure, co, TEMPL_flag, TEMPH_flag, COL_flag, COH_flag |

Field reference:
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temperature`: temperature.
- `humidity`: humidity.
- `air_pressure`: pressure or barometric pressure.
- `co`: decoded output field.
- `TEMPL_flag`: temperature; status, trigger, alarm, or flag.
- `TEMPH_flag`: temperature; status, trigger, alarm, or flag.
- `COL_flag`: status, trigger, alarm, or flag.
- `COH_flag`: status, trigger, alarm, or flag.

## Airflow-LN

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `Airflow-LN/Airflow_LN_TTN_Decoder.txt` | 5 (0x05), 3 (0x03), 7 (0x07) | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. Event, status, or special-function payload. | High, True, case 5, case 3, case 7, default, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT, Node_type, DATALOG2, PNACKMD, Bat_V, DATALOG, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, IDC_Roc_flagL, IDC_Roc_flagH, ... (+6) |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `case 5`: decoded output field.
- `case 3`: decoded output field.
- `case 7`: decoded output field.
- `default`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.
- `Node_type`: device model or sensor type.
- `DATALOG2`: decoded output field.
- `PNACKMD`: decoded output field.
- `Bat_V`: decoded output field.
- `DATALOG`: decoded output field.
- `Probe_mod`: decoded output field.
- `IDC_intput_mA`: decoded output field.
- `VDC_intput_V`: decoded output field.
- `IN1_pin_level`: water level or state value.
- `IN2_pin_level`: water level or state value.
- `Exti_pin_level`: water level or state value.
- `Exti_status`: status, trigger, alarm, or flag.
- `IDC_Roc_flagL`: status, trigger, alarm, or flag.
- `IDC_Roc_flagH`: status, trigger, alarm, or flag.
- `VDC_Roc_flagL`: status, trigger, alarm, or flag.
- `VDC_Roc_flagH`: status, trigger, alarm, or flag.
- `Water_deep_cm`: water level or state value.
- `Water_pressure_kPa`: pressure or barometric pressure; water level or state value.
- `Differential_pressure_Pa`: pressure or barometric pressure.
- `wind_speed`: wind speed or wind direction.

## BH01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `BH01-LB/BH01-LB_Decode_V1.0.0.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | MACaddr, Temp, Bat, Rssi, Humidity, Major, Minor, Txpower, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ES01, Beacon, EWTAH02, Lora_node, Timestamp, Node_type |
| `BH01-LB/BH01-LB_Decode_V1.0.1.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | MACaddr, Temp, Bat, Rssi, Humidity, Major, Minor, Txpower, FoodTemp, ENVTemp, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, EWTAH02, ES01, ibecaon, DMT01Probe, Lora_node, Timestamp |
| `BH01-LB/BH01_ChirpstackV4_Decode_V1.0.1.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | MACaddr, Temp, Bat, Rssi, Humidity, Major, Minor, Txpower, FoodTemp, ENVTemp, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, EWTAH02, ES01, ibecaon, DMT01Probe, Lora_node, Timestamp |
| `BH01-LB/BH01_Decode_V1.0.2.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | MACaddr, Temp, Bat, Rssi, Humidity, Major, Minor, Txpower, FoodTemp, ENVTemp, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, EWTAH02, ES01, ibecaon, DMT01Probe, Lora_node, Timestamp |

Field reference:
- `MACaddr`: MAC address.
- `Temp`: temperature.
- `Bat`: battery voltage or battery level.
- `Rssi`: decoded output field.
- `Humidity`: humidity.
- `Major`: decoded output field.
- `Minor`: decoded output field.
- `Txpower`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `ES01`: decoded output field.
- `Beacon`: decoded output field.
- `EWTAH02`: decoded output field.
- `Lora_node`: decoded output field.
- `Timestamp`: timestamp or decoded time.
- `Node_type`: device model or sensor type.
- `FoodTemp`: temperature.
- `ENVTemp`: temperature.
- `ibecaon`: decoded output field.
- `DMT01Probe`: decoded output field.

## CPL01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `CPL01/CPL01_ChirpstackV4_decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | ALARM, PIN_STATUS, CALCULATE_FLAG, TOTAL_PULSE, LAST_DISCONNECT_DURATION, TIME, Node_type, DATALOG, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TRIGGER_MODE, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `CPL01/Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | ALARM, PIN_STATUS, CALCULATE_FLAG, TOTAL_PULSE, LAST_DISCONNECT_DURATION, TIME, Node_type, DATALOG, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TRIGGER_MODE, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `CPL01/chirpstack_decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | ALARM, PIN_STATUS, CALCULATE_FLAG, TOTAL_PULSE, LAST_DISCONNECT_DURATION, TIME, Node_type, DATALOG, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TRIGGER_MODE, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `ALARM`: status, trigger, alarm, or flag.
- `PIN_STATUS`: status, trigger, alarm, or flag.
- `CALCULATE_FLAG`: status, trigger, alarm, or flag.
- `TOTAL_PULSE`: counter or total count.
- `LAST_DISCONNECT_DURATION`: decoded output field.
- `TIME`: timestamp or decoded time.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS`: status, trigger, alarm, or flag.
- `KEEP_TIME`: timestamp or decoded time.
- `TRIGGER_MODE`: status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## CPL03-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `CPL03-LB/CPL03-LB_ChirpstackV4_v1.0_decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TTRIG_MOD1, TTRIG_MOD2, TTRIG_MOD3, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, WORKMOD, CMOD, ALARM, PIN_STATUS, TTRIG_MOD, TOTAL_PULSE, LAST_DURATION, TIME, ... (+4) |
| `CPL03-LB/CPL03-LB_ChirpstackV4_v1.1.1_decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), 7 (0x07), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, DATALOG, PNACKMD, Node_type, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TTRIG_MOD1, TTRIG_MOD2, TTRIG_MOD3, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, CLOSE, WORKMOD, CMOD, ALARM, PIN_STATUS, TTRIG_MOD, TOTAL_PULSE, ... (+15) |
| `CPL03-LB/CPL03-LB_TTN_v1.0_decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TTRIG_MOD1, TTRIG_MOD2, TTRIG_MOD3, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, WORKMOD, CMOD, ALARM, PIN_STATUS, TTRIG_MOD, TOTAL_PULSE, LAST_DURATION, TIME, ... (+4) |
| `CPL03-LB/CPL03-LB_TTN_v1.1.1_decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), 7 (0x07), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, TTRIG_MOD1, TTRIG_MOD2, TTRIG_MOD3, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, CLOSE, WORKMOD, CMOD, ALARM, PIN_STATUS, TTRIG_MOD, TOTAL_PULSE, ... (+15) |

Field reference:
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS`: status, trigger, alarm, or flag.
- `KEEP_TIME`: timestamp or decoded time.
- `TTRIG_MOD1`: decoded output field.
- `TTRIG_MOD2`: decoded output field.
- `TTRIG_MOD3`: decoded output field.
- `ALARM_TDC`: status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `WORKMOD`: decoded output field.
- `CMOD`: decoded output field.
- `ALARM`: status, trigger, alarm, or flag.
- `PIN_STATUS`: status, trigger, alarm, or flag.
- `TTRIG_MOD`: decoded output field.
- `TOTAL_PULSE`: counter or total count.
- `LAST_DURATION`: decoded output field.
- `TIME`: timestamp or decoded time.
- `CALCULATE_FLAG`: status, trigger, alarm, or flag.
- `PA8_TOTAL_PULSE`: counter or total count.
- `PA4_TOTAL_PULSE`: counter or total count.
- `PB15_TOTAL_PULSE`: counter or total count.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `PA8_ROC`: decoded output field.
- `PA4_ROC`: decoded output field.
- `PB15_ROC`: decoded output field.
- `EXTI_PA8_Trigger`: status, trigger, alarm, or flag.
- `EXTI_PA8_Status`: status, trigger, alarm, or flag.
- `EXTI_PA4_Trigger`: status, trigger, alarm, or flag.
- `EXTI_PA4_Status`: status, trigger, alarm, or flag.
- `EXTI_PB15_Trigger`: status, trigger, alarm, or flag.
- `EXTI_PB15_Status`: status, trigger, alarm, or flag.

## CS01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `CS01-LB/CS01-LB_V1.0_ChirpstackV4_decoder.txt` | 2 (0x02), 7 (0x07), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, Bat_V, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, EXTI_Level, Current1_A, Current2_A, Current3_A, Current4_A, Cur1L_status, Cur1H_status, Cur2L_status, Cur2H_status, Cur3L_status, ... (+8) |
| `CS01-LB/CS01-LB_v1.0_TTN_Decoder.txt` | 2 (0x02), 7 (0x07), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, Bat_V, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, EXTI_Level, Current1_A, Current2_A, Current3_A, Current4_A, Cur1L_status, Cur1H_status, Cur2L_status, Cur2H_status, Cur3L_status, ... (+3) |
| `CS01-LB/CS01-LB_v1.3.1_TTN_Decoder.txt.txt` | 2 (0x02), 7 (0x07), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, Bat_V, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, EXTI_Level, Current1_A, Current2_A, Current3_A, Current4_A, Cur1L_status, Cur1H_status, Cur2L_status, Cur2H_status, Cur3L_status, ... (+8) |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat_V`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `EXTI_Level`: water level or state value.
- `Current1_A`: decoded output field.
- `Current2_A`: decoded output field.
- `Current3_A`: decoded output field.
- `Current4_A`: decoded output field.
- `Cur1L_status`: status, trigger, alarm, or flag.
- `Cur1H_status`: status, trigger, alarm, or flag.
- `Cur2L_status`: status, trigger, alarm, or flag.
- `Cur2H_status`: status, trigger, alarm, or flag.
- `Cur3L_status`: status, trigger, alarm, or flag.
- `Cur3H_status`: status, trigger, alarm, or flag.
- `Cur4L_status`: status, trigger, alarm, or flag.
- `Cur4H_status`: status, trigger, alarm, or flag.
- `curtotal_mod`: counter or total count.
- `curtotal1_mA_min`: counter or total count.
- `curtotal2_mA_min`: counter or total count.
- `curtotal3_mA_min`: counter or total count.
- `curtotal4_mA_min`: counter or total count.

## D20-LB&D20S-LB&D22-LB&D23-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `D20-LB&D20S-LB&D22-LB&D23-LB/D23-LB_v1.3_ChirpstackV4_decode.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, TRUE, CLOSE, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, Door_status, TempC1, TempC2, TempC3, TEMPC1_MIN, TEMPC1_MAX, TEMPC2_MIN, TEMPC2_MAX, TEMPC3_MIN, TEMPC3_MAX |
| `D20-LB&D20S-LB&D22-LB&D23-LB/D23-LB_v1.3_TTN_decode.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, TRUE, CLOSE, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, Door_status, TempC1, TempC2, TempC3, TEMPC1_MIN, TEMPC1_MAX, TEMPC2_MIN, TEMPC2_MAX, TEMPC3_MIN, TEMPC3_MAX |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Door_status`: status, trigger, alarm, or flag.
- `TempC1`: temperature.
- `TempC2`: temperature.
- `TempC3`: temperature.
- `TEMPC1_MIN`: temperature.
- `TEMPC1_MAX`: temperature.
- `TEMPC2_MIN`: temperature.
- `TEMPC2_MAX`: temperature.
- `TEMPC3_MIN`: temperature.
- `TEMPC3_MAX`: temperature.

## DDS04-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DDS04-LB/DDS04-LB TTN Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, EXTI_Level, distance1_cm, distance2_cm, distance3_cm, distance4_cm, mes_type |
| `DDS04-LB/DDS04-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, EXTI_Level, distance1_cm, distance2_cm, distance3_cm, distance4_cm, mes_type |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `EXTI_Level`: water level or state value.
- `distance1_cm`: distance measurement.
- `distance2_cm`: distance measurement.
- `distance3_cm`: distance measurement.
- `distance4_cm`: distance measurement.
- `mes_type`: decoded output field.

## DDS20-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DDS20-LB/DDS20-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `DDS20-LB/DDS20-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `Distance`: distance measurement.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## DDS45-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DDS45-LB/DDS45-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `DDS45-LB/DDS45-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `Distance`: distance measurement.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## DDS75-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DDS75-LB/DDS75-3-LS_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, distance1, distance2, distance3, s_flag, i_flag |
| `DDS75-LB/DDS75-3-LS_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, distance1, distance2, distance3, s_flag, i_flag |
| `DDS75-LB/DDS75-LB TTN Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 6 (0x06), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | YES, TRUE, units, PARSE LAST 4 BYTES AS REQUESTED, Bat, Additional_Distance_Data, Added new fields from last 4 bytes, Interrupt_flag, TempC_DS18B20, Sensor_flag, Node_type, Distance, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Detect_Mode_Data |
| `DDS75-LB/DDS75-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 6 (0x06), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, PARSE LAST 4 BYTES AS REQUESTED, Bat, Additional_Distance_Data, Added new fields from last 4 bytes, Interrupt_flag, TempC_DS18B20, Sensor_flag, Node_type, Distance, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Detect_Mode_Data |

Field reference:
- `units`: decoded output field.
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `distance1`: distance measurement.
- `distance2`: distance measurement.
- `distance3`: distance measurement.
- `s_flag`: status, trigger, alarm, or flag.
- `i_flag`: status, trigger, alarm, or flag.
- `YES`: decoded output field.
- `TRUE`: decoded output field.
- `PARSE LAST 4 BYTES AS REQUESTED`: decoded output field.
- `Bat`: battery voltage or battery level.
- `Additional_Distance_Data`: distance measurement.
- `Added new fields from last 4 bytes`: decoded output field.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `Distance`: distance measurement.
- `Detect_Mode_Data`: decoded output field.

## DMT01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DMT01/DMT01_V1.0.2_TTN.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | num, Timestamp, DevMode, MACaddr, ProbeBat, BoxBat, ProbeEvent, SENSOR_MODEL, DMT01, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, NULL, case 2, Temp, case 3, DataLog, case 5, case 6, default, error, Datalog_Reply |
| `DMT01/DMT01_V1.0.3_ChirpstackV4.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | case 2, Timestamp, DevMode, MACaddr, ProbeBat, BoxBat, Temp, case 3, DataLog, case 5, case 6, default, error, num, ProbeEvent, SENSOR_MODEL, DMT01, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, NULL, Datalog_Reply |
| `DMT01/DMT01_V1.0.3_TTN.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | num, Timestamp, DevMode, MACaddr, ProbeBat, BoxBat, ProbeEvent, SENSOR_MODEL, DMT01, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, NULL, case 2, Temp, case 3, DataLog, case 5, case 6, default, error, Datalog_Reply |

Field reference:
- `num`: decoded output field.
- `Timestamp`: timestamp or decoded time.
- `DevMode`: decoded output field.
- `MACaddr`: MAC address.
- `ProbeBat`: battery voltage or battery level.
- `BoxBat`: battery voltage or battery level.
- `ProbeEvent`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `DMT01`: decoded output field.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `NULL`: decoded output field.
- `case 2`: decoded output field.
- `Temp`: temperature.
- `case 3`: decoded output field.
- `DataLog`: decoded output field.
- `case 5`: decoded output field.
- `case 6`: decoded output field.
- `default`: decoded output field.
- `error`: decoded output field.
- `Datalog_Reply`: decoded output field.

## DS03A-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DS03A-LB/DS03A-LB_ChirpstackV4_v1.0_decode.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS1, KEEP_TIME1, KEEP_STATUS2, KEEP_TIME2, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, CMOD, ALARM, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, TIME, ALARM1, DOOR1_OPEN_STATUS, DOOR1_OPEN_TIMES, ... (+5) |
| `DS03A-LB/DS03A-LB_TTN_v1.0_decode.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS1, KEEP_TIME1, KEEP_STATUS2, KEEP_TIME2, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, CMOD, ALARM, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, TIME, ALARM1, DOOR1_OPEN_STATUS, DOOR1_OPEN_TIMES, ... (+5) |

Field reference:
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS1`: status, trigger, alarm, or flag.
- `KEEP_TIME1`: timestamp or decoded time.
- `KEEP_STATUS2`: status, trigger, alarm, or flag.
- `KEEP_TIME2`: timestamp or decoded time.
- `ALARM_TDC`: status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `CMOD`: decoded output field.
- `ALARM`: status, trigger, alarm, or flag.
- `DOOR_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR_OPEN_DURATION`: decoded output field.
- `TIME`: timestamp or decoded time.
- `ALARM1`: status, trigger, alarm, or flag.
- `DOOR1_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR1_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR1_OPEN_DURATION`: decoded output field.
- `ALARM2`: status, trigger, alarm, or flag.
- `DOOR2_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR2_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR2_OPEN_DURATION`: decoded output field.

## DS20L

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DS20L/DS20L v1.0_decoder_Chirpstack_V4.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, Node_type, BatV, Distance_mm, distance_state, Interrupt_count, Interrupt, alarm, MOD, Threshold_Flag_for_Alarm, Upper_limit, lower_limit, DO, DO_Flag, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE |
| `DS20L/DS20L v1.0_decoder_TTN.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | function is, units, Node_type, BatV, Distance_mm, distance_state, Interrupt_count, Interrupt, alarm, MOD, Threshold_Flag_for_Alarm, Upper_limit, lower_limit, DO, DO_Flag, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `BatV`: battery voltage or battery level.
- `Distance_mm`: distance measurement.
- `distance_state`: distance measurement.
- `Interrupt_count`: counter or total count.
- `Interrupt`: decoded output field.
- `alarm`: status, trigger, alarm, or flag.
- `MOD`: decoded output field.
- `Threshold_Flag_for_Alarm`: status, trigger, alarm, or flag.
- `Upper_limit`: decoded output field.
- `lower_limit`: decoded output field.
- `DO`: decoded output field.
- `DO_Flag`: status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `SMODE`: decoded output field.
- `function is`: decoded output field.

## Datacake-Dragino_CB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `Datacake-Dragino_CB/CPL03_CB_MOD1_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, PA8_status1, PA8_door_open_num1, PA8_last_open_time1, timestamp, deviceID, IMSI, version, battery, signal, PA8_status, PA8_door_open_num, PA8_last_open_time, Latitude, Longitude, gps_timestamp, dataset, field |
| `Datacake-Dragino_CB/CPL03_CB_MOD2_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, PA8_status1, count_time11, count_time22, count_time33, timestamp, deviceID, IMSI, version, battery, signal, PA8_status, count_time1, count_time2, count_time3, Latitude, Longitude, gps_timestamp, dataset, field |
| `Datacake-Dragino_CB/D2X_CB_Datackae.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, temp1, temp2, temp3, timestamp, deviceID, version, battery, signal, mod, PA4_level, Interrupt_level, interrupt, adc, temp11, temp22, temp33, flag1, Latitude, Longitude, gps_timestamp, dataSet, field |
| `Datacake-Dragino_CB/DDS75-CB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, distance1, Ds18b20_temp1, timestamp, deviceID, version, battery, signal, mod, Interrupt_level, interrupt, Ds18b20_temp, distance, Latitude, Longitude, gps_timestamp, dataSet, field |
| `Datacake-Dragino_CB/PS-CB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, IDC_input1, VDC_input1, timestamp, deviceID, version, battery, signal, IN1, IN2, GPIO_EXIT_Level, GPIO_EXIT_Flag, IDC_alarm, VDC_alarm, Probe_mod, IDC_input, VDC_input, Latitude, Longitude, gps_timestamp, dataSet, field |
| `Datacake-Dragino_CB/RS485_CB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, deviceID, version, battery, signal, GPIO_EXIT_Level, GPIO_EXIT_Flag, timestamp, Payload_version, sensorData, field |
| `Datacake-Dragino_CB/S31-CB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, shtTemp, shtHum, timestamp, deviceID, version, battery, signal, mod, Interrupt_level, interrupt, Ds18b20, adc, count, dataSet, field |
| `Datacake-Dragino_CB/SDI12-CB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | field, timestamp |

Field reference:
- `hexByte`: decoded output field.
- `Model`: device model or sensor type.
- `PA8_status1`: status, trigger, alarm, or flag.
- `PA8_door_open_num1`: decoded output field.
- `PA8_last_open_time1`: timestamp or decoded time.
- `timestamp`: timestamp or decoded time.
- `deviceID`: decoded output field.
- `IMSI`: decoded output field.
- `version`: decoded output field.
- `battery`: battery voltage or battery level.
- `signal`: decoded output field.
- `PA8_status`: status, trigger, alarm, or flag.
- `PA8_door_open_num`: decoded output field.
- `PA8_last_open_time`: timestamp or decoded time.
- `Latitude`: decoded output field.
- `Longitude`: decoded output field.
- `gps_timestamp`: timestamp or decoded time.
- `dataset`: decoded output field.
- `field`: decoded output field.
- `count_time11`: timestamp or decoded time; counter or total count.
- `count_time22`: timestamp or decoded time; counter or total count.
- `count_time33`: timestamp or decoded time; counter or total count.
- `count_time1`: timestamp or decoded time; counter or total count.
- `count_time2`: timestamp or decoded time; counter or total count.
- `count_time3`: timestamp or decoded time; counter or total count.
- `temp1`: temperature.
- `temp2`: temperature.
- `temp3`: temperature.
- `mod`: decoded output field.
- `PA4_level`: water level or state value.
- `Interrupt_level`: water level or state value.
- `interrupt`: decoded output field.
- `adc`: decoded output field.
- `temp11`: temperature.
- `temp22`: temperature.
- `temp33`: temperature.
- `flag1`: status, trigger, alarm, or flag.
- `dataSet`: decoded output field.
- `distance1`: distance measurement.
- `Ds18b20_temp1`: temperature.
- The remaining `19` fields are listed in the corresponding decoder return objects.

## Datacake-Dragino_NB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `Datacake-Dragino_NB/CPL03-NB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, PA8_status1, count_mode1, tdc_send_flag1, trigger_mode1, pa8_alarm_status1, pa8_level_status1, PA8_door_open_num1, PA8_last_open_time1, timestamp, deviceID, IMSI, version, battery, signal, TTRchannel, PA8_status, count_mode, tdc_send_flag, trigger_mode, pa8_alarm_status, pa8_level_status, PA8_door_open_num, PA8_last_open_time, dataset, ... (+9) |
| `Datacake-Dragino_NB/CPN01_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Contact_Status, Total_pulse, last_open_duration, timestamp, deviceID, version, battery, signal, Mod, Calculate_Flag, Alarm, dataset, field |
| `Datacake-Dragino_NB/D2X_NB_Decoder_Datackae.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, temp1, temp2, temp3, timestamp, deviceID, version, battery, signal, mod, interrupt, adc, dataSet, field |
| `Datacake-Dragino_NB/DDS04-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, Distance2, Distance3, Distance4, timestamp, deviceID, version, battery, signal, Mod, Interrupt, DS18B20, dataSet, field |
| `Datacake-Dragino_NB/DDS20-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, Distance, dataSet, field |
| `Datacake-Dragino_NB/DDS45-NB_decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, Distance, dataSet, field |
| `Datacake-Dragino_NB/DDS75-NB_decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, Distance, dataSet, field |
| `Datacake-Dragino_NB/DS03A-NB_Datacake_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Dorr_status, Door_open_num, Last_open_times, timestamp, deviceID, version, battery, signal, Mod, Alarm_status, dataSet, field |
| `Datacake-Dragino_NB/LDS12-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance, Distance_signal_strength, LiDAR_temp, timestamp, deviceID, version, battery, signal, Mod, Interrupt, DS18B20, dataSet, field |
| `Datacake-Dragino_NB/LDS40-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance, Distance_signal_strength, LiDAR_temp, timestamp, deviceID, version, battery, signal, Mod, Interrupt, DS18B20, dataSet, field |
| `Datacake-Dragino_NB/LMS01-NB_Datacake_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Leaf_moisture, Leaf_Temperature, timestamp, deviceID, version, battery, signal, mod, interrupt, dataSet, field |
| `Datacake-Dragino_NB/MDS120-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, Mod, Interrupt, Distance, dataSet, field |
| `Datacake-Dragino_NB/MDS200-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, Distance2, timestamp, deviceID, version, battery, signal, Mod, Exit_flag, dataSet, field |
| `Datacake-Dragino_NB/N95S31B_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, shtTemp, shtHum, timestamp, deviceID, version, battery, signal, mod, tempDS18B20, interrupt, adc, dataSet, field |
| `Datacake-Dragino_NB/NBSN95NB_Decoder_Datacke.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, deviceID, version, battery, signal, mod, tempDS18B20, interrupt, adc, shtTemp, shtHum, timestamp, Distance, ADC1, ADC3, ADC2, tempDS18B201, tempDS18B202, tempDS18B203, Weigt, pulse_count, Model, field |
| `Datacake-Dragino_NB/NDDS20_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, Distance, dataSet, field |
| `Datacake-Dragino_NB/NDDS75_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, Distance, dataSet, field |
| `Datacake-Dragino_NB/NDS03A_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Door_Status_pb14, door_open_num_pb14, last_open_time_pb14, timestamp, deviceID, version, battery, signal, mod, dataset, Door_Status_pb15, door_open_num_pb15, last_open_time_pb15, Model, field |
| `Datacake-Dragino_NB/NLMS01_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Leaf_moisture, Leaf_Temperature, timestamp, deviceID, version, battery, signal, mod, interrupt, dataSet, field |
| `Datacake-Dragino_NB/NMDS200_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, Distance2, timestamp, deviceID, version, battery, signal, Mod, Exit_flag, dataSet, field |
| `Datacake-Dragino_NB/NSE01_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Soil_Moisture1, Soil_Temperature1, Soil_EC1, Soil_dielectric_constant1, timestamp, deviceID, version, battery, signal, mod, interrupt, Soil_Moisture, Soil_Temperature, Soil_EC, Soil_dielectric_constant, dataSet, field |
| `Datacake-Dragino_NB/NSPH01_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Soil_PH, Soil_Temperature, timestamp, deviceID, version, battery, signal, mod, interrupt, dataSet, field |
| `Datacake-Dragino_NB/PS-NB decoder_Datacker.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, IDC_intput_mA, VDC_intput_V, timestamp, deviceID, version, battery, signal, Probe_Model, interrupt1, interrupt2, GPIO_EXTI_level, GPIO_EXTI_flag, dataSet, field |
| `Datacake-Dragino_NB/RS485-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, deviceID, version, battery, signal, GPIO_EXIT_Level, GPIO_EXIT_Flag, timestamp, Payload_version, field |
| `Datacake-Dragino_NB/S31-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, shtTemp, shtHum, timestamp, deviceID, version, battery, signal, mod, tempDS18B20, interrupt, adc, dataSet, field |
| `Datacake-Dragino_NB/SDI12-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, shtTemp, shtHum, timestamp, deviceID, version, battery, signal, gpio_level, gpio_flag, payload_version, sensor_data, field |
| `Datacake-Dragino_NB/SE01-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Soil_Moisture1, Soil_Temperature1, Soil_EC1, Soil_dielectric_constant1, timestamp, deviceID, version, battery, signal, mod, interrupt, Soil_Moisture, Soil_Temperature, Soil_EC, Soil_dielectric_constant, dataSet, field |
| `Datacake-Dragino_NB/SN50V3-NB decoder_DATACAKE.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, deviceID, version, battery, signal, mod, tempDS18B20, interrupt, adc, shtTemp, shtHum, timestamp, Distance, ADC1, ADC2, tempDS18B201, tempDS18B202, tempDS18B203, Weigt, pulse_count, Model, field |
| `Datacake-Dragino_NB/SPH01-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Soil_PH, Soil_Temperature, timestamp, deviceID, version, battery, signal, mod, interrupt, dataSet, field |
| `Datacake-Dragino_NB/SW3L-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Total_pulse, timestamp, deviceID, version, battery, signal, PA4, PB15, Alarm, Mod, Calculate_flag, dataSet, field |
| `Datacake-Dragino_NB/TS01-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, ds18b20, roll, pitch, timestamp, deviceID, version, battery, signal, direction, alarm, Level_PA4, interrupt, Interrupt_level, ds18b201, roll1, times1tamp, dataSet, field |
| `Datacake-Dragino_NB/WL03A-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Leak_times, Last_leak_duration, timestamp, deviceID, version, battery, signal, Mod, Tdc_flag, Alarm, dataSet, field |

Field reference:
- `hexByte`: decoded output field.
- `PA8_status1`: status, trigger, alarm, or flag.
- `count_mode1`: counter or total count.
- `tdc_send_flag1`: status, trigger, alarm, or flag.
- `trigger_mode1`: status, trigger, alarm, or flag.
- `pa8_alarm_status1`: status, trigger, alarm, or flag.
- `pa8_level_status1`: water level or state value; status, trigger, alarm, or flag.
- `PA8_door_open_num1`: decoded output field.
- `PA8_last_open_time1`: timestamp or decoded time.
- `timestamp`: timestamp or decoded time.
- `deviceID`: decoded output field.
- `IMSI`: decoded output field.
- `version`: decoded output field.
- `battery`: battery voltage or battery level.
- `signal`: decoded output field.
- `TTRchannel`: decoded output field.
- `PA8_status`: status, trigger, alarm, or flag.
- `count_mode`: counter or total count.
- `tdc_send_flag`: status, trigger, alarm, or flag.
- `trigger_mode`: status, trigger, alarm, or flag.
- `pa8_alarm_status`: status, trigger, alarm, or flag.
- `pa8_level_status`: water level or state value; status, trigger, alarm, or flag.
- `PA8_door_open_num`: decoded output field.
- `PA8_last_open_time`: timestamp or decoded time.
- `dataset`: decoded output field.
- `count_time11`: timestamp or decoded time; counter or total count.
- `count_time22`: timestamp or decoded time; counter or total count.
- `count_time33`: timestamp or decoded time; counter or total count.
- `mod`: decoded output field.
- `count_time1`: timestamp or decoded time; counter or total count.
- `count_time2`: timestamp or decoded time; counter or total count.
- `count_time3`: timestamp or decoded time; counter or total count.
- `Model`: device model or sensor type.
- `field`: decoded output field.
- `Contact_Status`: status, trigger, alarm, or flag.
- `Total_pulse`: counter or total count.
- `last_open_duration`: decoded output field.
- `Mod`: decoded output field.
- `Calculate_Flag`: status, trigger, alarm, or flag.
- `Alarm`: status, trigger, alarm, or flag.
- The remaining `78` fields are listed in the corresponding decoder return objects.

## Datacake-Dragino_NB_New_Version

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `Datacake-Dragino_NB_New_Version/CPL03-NB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, PA8_status1, count_mode1, tdc_send_flag1, trigger_mode1, pa8_alarm_status1, pa8_level_status1, PA8_door_open_num1, PA8_last_open_time1, timestamp, deviceID, IMSI, version, battery, signal, TTRchannel, PA8_status, count_mode, tdc_send_flag, trigger_mode, pa8_alarm_status, pa8_level_status, PA8_door_open_num, PA8_last_open_time, dataset, ... (+9) |
| `Datacake-Dragino_NB_New_Version/CS01-NB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Current_Chan1, Current_Chan2, Current_Chan3, Current_Chan4, timestamp, deviceID, IMSI, version, battery, signal, GPIO_EXIT_Level, GPIO_EXIT_Flag, Current_alarm, Current_chan1, Current_chan2, Current_chan3, Current_chan4, dataSet, field |
| `Datacake-Dragino_NB_New_Version/D2X_NB_Decoder_Datackae.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, temp1, temp2, temp3, timestamp, deviceID, version, battery, signal, mod, PA4_level, Interrupt_level, interrupt, adc, temp11, temp22, temp33, flag1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/DDS04-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, Distance2, Distance3, Distance4, timestamp, deviceID, version, battery, signal, Mod, Interrupt, Interrupt_level, DS18B20, Distance11, Distance22, Distance33, Distance44, dataSet, field |
| `Datacake-Dragino_NB_New_Version/DDS20-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance, timestamp, deviceID, version, battery, signal, mod, interrupt, interrupt_level, Distance1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/DDS45-NB_decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, interrupt_level, Distance, dataSet, field |
| `Datacake-Dragino_NB_New_Version/DDS75-NB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, timestamp, deviceID, version, battery, signal, mod, interrupt, interrupt_level, Distance, dataSet, field |
| `Datacake-Dragino_NB_New_Version/DS03A-NB_Datacake_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Dorr_status, Door_open_num, Last_open_times, timestamp, deviceID, version, battery, signal, Mod, Dorr_status1, Door_open_num1, Last_open_times1, Alarm_status, dataSet, field |
| `Datacake-Dragino_NB_New_Version/LDS12-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance, Distance_signal_strength, LiDAR_temp, timestamp, deviceID, version, battery, signal, Mod, Interrupt, Interrupt_Level, DS18B20, Distance1, Distance_signal_strength1, LiDAR_temp1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/LDS40-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance, Distance_signal_strength, LiDAR_temp, timestamp, deviceID, version, battery, signal, Mod, Interrupt, Interrupt_Level, DS18B20, Distance1, Distance_signal_strength1, LiDAR_temp1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/LMS01-NB_Datacake_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Leaf_moisture, Leaf_Temperature, timestamp, deviceID, version, battery, signal, mod, interrupt, Interrupt_level, Leaf_moisture1, Leaf_Temperature1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/MDS120-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance, timestamp, deviceID, version, battery, signal, Mod, Interrupt, Interrupt_Level, Distance1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/MDS200-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Distance1, Distance2, timestamp, deviceID, version, battery, signal, Mod, Interrupt, Interrupt_Level, Distance11, Distance22, dataSet, field |
| `Datacake-Dragino_NB_New_Version/PS-NB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, IDC_intput_mA, VDC_intput_V, timestamp, deviceID, IMSI, version, battery, signal, Probe_Model, IN1, IN2, IDC_alarm, VDC_alarm, GPIO_EXTI_level, GPIO_EXTI_flag, IDC_intput_mA1, VDC_intput_V1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/RS485-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, deviceID, version, battery, signal, GPIO_EXIT_Level, GPIO_EXIT_Flag, timestamp, Payload_version, field |
| `Datacake-Dragino_NB_New_Version/S31-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, shtTemp, shtHum, timestamp, deviceID, version, battery, signal, mod, tempDS18B20, interrupt, adc, shtTemp1, shtHum1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/SDI-12__Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, shtTemp, shtHum, timestamp, deviceID, version, battery, signal, gpio_level, gpio_flag, payload_version, sensor_data, field |
| `Datacake-Dragino_NB_New_Version/SE01-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Soil_Moisture, Soil_Temperature, Soil_EC, Soil_dielectric_constant, timestamp, deviceID, version, battery, signal, mod, interrupt, Soil_Moisture1, Soil_Temperature1, Soil_EC1, Soil_dielectric_constant1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/SN50V3-NB_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, deviceID, version, battery, signal, mod, tempDS18B20, PA4_LEVEL, interrupt, interrupt_level, adc, shtTemp, shtHum, timestamp, Distance, ADC1, ADC2, ADC3, tempDS18B202, tempDS18B203, Weigt, pulse_count, Model, field |
| `Datacake-Dragino_NB_New_Version/SPH01-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Soil_PH, Soil_Temperature, timestamp, deviceID, version, battery, signal, mod, interrupt, Interrupt_level, Soil_PH1, Soil_Temperature1, dataSet, field |
| `Datacake-Dragino_NB_New_Version/SW3L-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Total_pulse, water_sum, timestamp, deviceID, IMSI, version, battery, signal, PA4, PB15, Alarm, Mod, Calculate_flag, Water_sum, dataSet, field |
| `Datacake-Dragino_NB_New_Version/TS01-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, ds18b20, roll, pitch, timestamp, deviceID, version, battery, signal, direction, alarm, Level_PA4, interrupt, Interrupt_level, ds18b201, roll1, times1tamp, dataSet, field |
| `Datacake-Dragino_NB_New_Version/WL03A-NB_Decoder_Datacake.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | hexByte, Model, Leak_times, Last_leak_duration, timestamp, deviceID, version, battery, signal, Alarm, Mod, Tdc_flag, Leak_status, Leak_status1, Leak_times1, Last_leak_duration1, dataSet, field |

Field reference:
- `hexByte`: decoded output field.
- `PA8_status1`: status, trigger, alarm, or flag.
- `count_mode1`: counter or total count.
- `tdc_send_flag1`: status, trigger, alarm, or flag.
- `trigger_mode1`: status, trigger, alarm, or flag.
- `pa8_alarm_status1`: status, trigger, alarm, or flag.
- `pa8_level_status1`: water level or state value; status, trigger, alarm, or flag.
- `PA8_door_open_num1`: decoded output field.
- `PA8_last_open_time1`: timestamp or decoded time.
- `timestamp`: timestamp or decoded time.
- `deviceID`: decoded output field.
- `IMSI`: decoded output field.
- `version`: decoded output field.
- `battery`: battery voltage or battery level.
- `signal`: decoded output field.
- `TTRchannel`: decoded output field.
- `PA8_status`: status, trigger, alarm, or flag.
- `count_mode`: counter or total count.
- `tdc_send_flag`: status, trigger, alarm, or flag.
- `trigger_mode`: status, trigger, alarm, or flag.
- `pa8_alarm_status`: status, trigger, alarm, or flag.
- `pa8_level_status`: water level or state value; status, trigger, alarm, or flag.
- `PA8_door_open_num`: decoded output field.
- `PA8_last_open_time`: timestamp or decoded time.
- `dataset`: decoded output field.
- `count_time11`: timestamp or decoded time; counter or total count.
- `count_time22`: timestamp or decoded time; counter or total count.
- `count_time33`: timestamp or decoded time; counter or total count.
- `mod`: decoded output field.
- `count_time1`: timestamp or decoded time; counter or total count.
- `count_time2`: timestamp or decoded time; counter or total count.
- `count_time3`: timestamp or decoded time; counter or total count.
- `Model`: device model or sensor type.
- `field`: decoded output field.
- `Current_Chan1`: decoded output field.
- `Current_Chan2`: decoded output field.
- `Current_Chan3`: decoded output field.
- `Current_Chan4`: decoded output field.
- `GPIO_EXIT_Level`: water level or state value.
- `GPIO_EXIT_Flag`: status, trigger, alarm, or flag.
- The remaining `108` fields are listed in the corresponding decoder return objects.

## DishSense

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `DishSense/DishSense.txt` | 2 (0x02), 17 (0x11), 18 (0x12), 13 (0x0D), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 8 (0x08), 6 (0x06), 5 (0x05), 1 (0x01), 3 (0x03), 4 (0x04), 7 (0x07), 15 (0x0F), 14 (0x0E) | Regular sensor uplink payload. Device information payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. | Temperature unit Settings, timestamp, DishSense, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0A, case 0x0F, case 0x0B, case 0x0C, case 0x0D, case 0x0E, default, NULL, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ... (+21) |

Field reference:
- `Temperature unit Settings`: temperature.
- `timestamp`: timestamp or decoded time.
- `DishSense`: decoded output field.
- `case 0x01`: decoded output field.
- `case 0x02`: decoded output field.
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `case 0x05`: decoded output field.
- `case 0x06`: decoded output field.
- `case 0x07`: decoded output field.
- `case 0x08`: decoded output field.
- `case 0x09`: decoded output field.
- `case 0x0A`: decoded output field.
- `case 0x0F`: decoded output field.
- `case 0x0B`: decoded output field.
- `case 0x0C`: decoded output field.
- `case 0x0D`: decoded output field.
- `case 0x0E`: decoded output field.
- `default`: decoded output field.
- `NULL`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `Timestamp`: timestamp or decoded time.
- `Time`: timestamp or decoded time.
- `BatV`: battery voltage or battery level.
- `MaxTempPT100`: temperature.
- `HighTempThld`: temperature.
- `OvertempIntvlNum`: temperature.
- `SampleIntvlMs`: decoded output field.
- `OvertempDurationSec`: temperature.
- `NodeType`: decoded output field.
- `TempCal`: temperature.
- `PacketType`: decoded output field.
- `SampleCount`: counter or total count.
- `SampleIntvlSec`: decoded output field.
- `Datalog`: decoded output field.
- `MaxTempDs18b20`: temperature.
- The remaining `6` fields are listed in the corresponding decoder return objects.

## GroPoint Air

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `GroPoint Air/GroPoint_Air_chirpstackV4_decoder .txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units |
| `GroPoint Air/GroPoint_Air_chirpstack_decoder .txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units |
| `GroPoint Air/gropoint_Decoder_V1.0.0.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units |
| `GroPoint Air/gropoint_Decoder_decoder_v1.1.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units |

Field reference:
- `units`: decoded output field.

## LA66 USB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LA66 USB/ChirpStack_map.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | flag, Node_type, latitude, longitude, title |
| `LA66 USB/LA66-decode.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | latitude, longitude, timestamp, beijintime |
| `LA66 USB/TTN_map.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | doorflg, latitude, longitude, timestamp, beijintime, Node_type |

Field reference:
- `flag`: status, trigger, alarm, or flag.
- `Node_type`: device model or sensor type.
- `latitude`: decoded output field.
- `longitude`: decoded output field.
- `title`: decoded output field.
- `timestamp`: timestamp or decoded time.
- `beijintime`: timestamp or decoded time.
- `doorflg`: decoded output field.

## LAQ4

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LAQ4/LAQ4_Decoder_TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | TRUE, Bat_V, Node_type, Work_mode, Alarm_status, TVOC_ppb, CO2_ppm, TempC_SHT, Hum_SHT, SHTEMPMIN, SHTEMPMAX, SHTHUMMIN, SHTHUMMAX, CO2MIN, CO2MAX |
| `LAQ4/laq4_chirpstack.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | TRUE, Node_type, Bat_V, Work_mode, Alarm_status, TVOC_ppb, CO2_ppm, TempC_SHT, Hum_SHT, SHTEMPMIN, SHTEMPMAX, SHTHUMMIN, SHTHUMMAX, CO2MIN, CO2MAX |

Field reference:
- `TRUE`: decoded output field.
- `Bat_V`: decoded output field.
- `Node_type`: device model or sensor type.
- `Work_mode`: decoded output field.
- `Alarm_status`: status, trigger, alarm, or flag.
- `TVOC_ppb`: decoded output field.
- `CO2_ppm`: CO2 concentration.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `SHTEMPMIN`: temperature.
- `SHTEMPMAX`: temperature.
- `SHTHUMMIN`: humidity.
- `SHTHUMMAX`: humidity.
- `CO2MIN`: CO2 concentration.
- `CO2MAX`: CO2 concentration.

## LC01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LC01/LC01_ChirpstackV4_Decode.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 4 (0x04) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 0x03, case 0x04, default, OPEN, CLOSE, Event, RelayStatus, Timestamp, Datalog_Reply, LoraNode, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, DataLog |
| `LC01/LC01_V1.0.0_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 4 (0x04) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 0x03, case 0x04, default, OPEN, CLOSE, Event, RelayStatus, Timestamp, Datalog_Reply, LoraNode, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, DataLog |

Field reference:
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `default`: decoded output field.
- `OPEN`: decoded output field.
- `CLOSE`: decoded output field.
- `Event`: decoded output field.
- `RelayStatus`: status, trigger, alarm, or flag.
- `Timestamp`: timestamp or decoded time.
- `Datalog_Reply`: decoded output field.
- `LoraNode`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `DataLog`: decoded output field.

## LC03

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LC03/LC03_V1.1_TTN_Decode.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 1 (0x01), 4 (0x04) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. | case 0x01, case 0x02, case 0x03, case 0x04, default, INSERT, PULL_OUT, OPEN, CLOSE, Node_type, Event, PlugStatus, RelayStatus, Timestamp, DatalogReply, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, DataLog, LoraNode |

Field reference:
- `case 0x01`: decoded output field.
- `case 0x02`: decoded output field.
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `default`: decoded output field.
- `INSERT`: decoded output field.
- `PULL_OUT`: decoded output field.
- `OPEN`: decoded output field.
- `CLOSE`: decoded output field.
- `Node_type`: device model or sensor type.
- `Event`: decoded output field.
- `PlugStatus`: status, trigger, alarm, or flag.
- `RelayStatus`: status, trigger, alarm, or flag.
- `Timestamp`: timestamp or decoded time.
- `DatalogReply`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `DataLog`: decoded output field.
- `LoraNode`: decoded output field.

## LCC01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LCC01-LB/LCC01-LB_v1.0_Decoder_ChirpstackV4.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, BatV, Actual_Weight_g, Weight_Reading, Weight_state, Scale_Factor, MOD, Weight_flag, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE |
| `LCC01-LB/LCC01-LB_v1.0_Decoder_TTN.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | function is, units, Node_type, BatV, Actual_Weight_g, Weight_Reading, Weight_state, Scale_Factor, MOD, Weight_flag, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `BatV`: battery voltage or battery level.
- `Actual_Weight_g`: decoded output field.
- `Weight_Reading`: decoded output field.
- `Weight_state`: decoded output field.
- `Scale_Factor`: decoded output field.
- `MOD`: decoded output field.
- `Weight_flag`: status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `SMODE`: decoded output field.
- `function is`: decoded output field.

## LDDS04

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDDS04/ldds04 chirpstack  decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | TRUE, BatV, EXTI_Trigger, distance1_cm, distance2_cm, distance3_cm, distance4_cm, mes_type, Node_type |
| `LDDS04/ldds04 chirpstackV4  decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | TRUE, BatV, EXTI_Trigger, distance1_cm, distance2_cm, distance3_cm, distance4_cm, mes_type, Node_type |
| `LDDS04/ldds04 ttn decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | TRUE, BatV, EXTI_Trigger, distance1_cm, distance2_cm, distance3_cm, distance4_cm, mes_type, Node_type |

Field reference:
- `TRUE`: decoded output field.
- `BatV`: battery voltage or battery level.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `distance1_cm`: distance measurement.
- `distance2_cm`: distance measurement.
- `distance3_cm`: distance measurement.
- `distance4_cm`: distance measurement.
- `mes_type`: decoded output field.
- `Node_type`: device model or sensor type.

## LDDS20

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDDS20/LDDS20 chirpstack decoder_V1.1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS20/LDDS20 chirpstackV4 decoder_V1.1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS20/LDDS20_Decoder_V1.1.4.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS20/ldds20 decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_status |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `Distance`: distance measurement.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `Interrupt_status`: status, trigger, alarm, or flag.

## LDDS45

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDDS45/LDDS75 decoder--Chirpstack.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_status |
| `LDDS45/LDDS75 decoder--TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_status |
| `LDDS45/LDDS751.1.4_ChirpstackV4_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS45/LDDS75_Chirpstack_Decoder_V1.1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS45/LDDS75_Decoder_V1.1.4.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `Distance`: distance measurement.
- `Interrupt_status`: status, trigger, alarm, or flag.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.

## LDDS75

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDDS75/LDDS75 decoder--Chirpstack.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_status |
| `LDDS75/LDDS75 decoder--TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_status |
| `LDDS75/LDDS751.1.4_ChirpstackV4_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS75/LDDS75_Chirpstack_Decoder_V1.1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |
| `LDDS75/LDDS75_Decoder_V1.1.4.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `Distance`: distance measurement.
- `Interrupt_status`: status, trigger, alarm, or flag.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.

## LDS02

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDS02/LDS02_Decoder_1.8.2.txt` | 7 (0x07) | Event, status, or special-function payload. | case 7, default, Node_type, BatV, edc_mod, times, door_open_status, water_leak_status, alarm, mod, open_times, open_duration, leak_times, leak_duration |
| `LDS02/lds01_02_Decoder_Chirpstack_V4_v1.5.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LDS02/lds01_02_Decoder_chirpstack_20200628.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | MOD, BAT_V, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LDS02/lds01_02_Decoder_ttn_20200805.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LDS02/lds01_02_Decoder_ttn_v1.3.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LDS02/lds01_02_Decoder_ttn_v1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LDS02/lds01_02_Decoder_ttn_v1.5.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |

Field reference:
- `case 7`: decoded output field.
- `default`: decoded output field.
- `Node_type`: device model or sensor type.
- `BatV`: battery voltage or battery level.
- `edc_mod`: decoded output field.
- `times`: timestamp or decoded time.
- `door_open_status`: status, trigger, alarm, or flag.
- `water_leak_status`: water level or state value; status, trigger, alarm, or flag.
- `alarm`: status, trigger, alarm, or flag.
- `mod`: decoded output field.
- `open_times`: timestamp or decoded time.
- `open_duration`: decoded output field.
- `leak_times`: timestamp or decoded time.
- `leak_duration`: decoded output field.
- `units`: decoded output field.
- `BAT_V`: decoded output field.
- `MOD`: decoded output field.
- `DOOR_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR_OPEN_DURATION`: decoded output field.
- `ALARM`: status, trigger, alarm, or flag.
- `WATER_LEAK_STATUS`: water level or state value; status, trigger, alarm, or flag.
- `WATER_LEAK_TIMES`: timestamp or decoded time; water level or state value.
- `LAST_WATER_LEAK_DURATION`: water level or state value.

## LDS03A

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDS03A/LDS03A Decoder chirpstack.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | DATALOG, Node_type, TDC, DISALARM, KEEP_STATUS1, KEEP_TIME1, KEEP_STATUS2, KEEP_TIME2, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ALARM1, DOOR1_OPEN_STATUS, DOOR1_OPEN_TIMES, LAST_DOOR1_OPEN_DURATION, ALARM2, DOOR2_OPEN_STATUS, DOOR2_OPEN_TIMES, LAST_DOOR2_OPEN_DURATION, TIME |
| `LDS03A/LDS03A Decoder chirpstackV4.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | DATALOG, Node_type, TDC, DISALARM, KEEP_STATUS1, KEEP_TIME1, KEEP_STATUS2, KEEP_TIME2, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ALARM1, DOOR1_OPEN_STATUS, DOOR1_OPEN_TIMES, LAST_DOOR1_OPEN_DURATION, ALARM2, DOOR2_OPEN_STATUS, DOOR2_OPEN_TIMES, LAST_DOOR2_OPEN_DURATION, TIME |
| `LDS03A/LDS03A decoder V1.2.0.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | DATALOG, Node_type, TDC, DISALARM, KEEP_STATUS1, KEEP_TIME1, KEEP_STATUS2, KEEP_TIME2, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ALARM1, DOOR1_OPEN_STATUS, DOOR1_OPEN_TIMES, LAST_DOOR1_OPEN_DURATION, ALARM2, DOOR2_OPEN_STATUS, DOOR2_OPEN_TIMES, LAST_DOOR2_OPEN_DURATION, TIME |
| `LDS03A/LDS03A decoder V1.2.2.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | DATALOG, Node_type, TDC, DISALARM, KEEP_STATUS1, KEEP_TIME1, KEEP_STATUS2, KEEP_TIME2, ALARM_TDC, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ALARM, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, TIME, ALARM1, DOOR1_OPEN_STATUS, DOOR1_OPEN_TIMES, LAST_DOOR1_OPEN_DURATION, ALARM2, DOOR2_OPEN_STATUS, ... (+2) |
| `LDS03A/LDS03A_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | Node_type, ALARM, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, TIME, DATALOG, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `DATALOG`: decoded output field.
- `Node_type`: device model or sensor type.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS1`: status, trigger, alarm, or flag.
- `KEEP_TIME1`: timestamp or decoded time.
- `KEEP_STATUS2`: status, trigger, alarm, or flag.
- `KEEP_TIME2`: timestamp or decoded time.
- `ALARM_TDC`: status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `ALARM1`: status, trigger, alarm, or flag.
- `DOOR1_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR1_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR1_OPEN_DURATION`: decoded output field.
- `ALARM2`: status, trigger, alarm, or flag.
- `DOOR2_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR2_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR2_OPEN_DURATION`: decoded output field.
- `TIME`: timestamp or decoded time.
- `ALARM`: status, trigger, alarm, or flag.
- `DOOR_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR_OPEN_DURATION`: decoded output field.
- `KEEP_STATUS`: status, trigger, alarm, or flag.
- `KEEP_TIME`: timestamp or decoded time.

## LDS12-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDS12-LB/LDS12-LB_v1.0_Decoder_ChirpstackV4.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, units, TRUE, HIGH, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Interrupt_level, Message_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `LDS12-LB/LDS12-LB_v1.0_Decoder_TTN.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, units, TRUE, HIGH, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Interrupt_level, Message_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `units`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Lidar_distance`: distance measurement.
- `Lidar_signal`: decoded output field.
- `Lidar_temp`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Interrupt_level`: water level or state value.
- `Message_type`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## LDS25-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDS25-LB/LDS25-LB decoder.txt` | 2 (0x02), 3 (0x03), 6 (0x06), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, case 2, TRUE, HIGH, case 3, case 6, case 5, default, errors, batV, temp_DS18B20, Distance_cm, Distance_signal_strength, Lidar_temp, i_flag, i_level, mes_type, Node_type, DATALOG, PNACKMD, Wiper_workmode, Wiper_clean_times, Wiper_clean_interval, Wiper_last_clean_time, ... (+5) |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `case 2`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `case 3`: decoded output field.
- `case 6`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `batV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `Distance_cm`: distance measurement.
- `Distance_signal_strength`: distance measurement.
- `Lidar_temp`: temperature.
- `i_flag`: status, trigger, alarm, or flag.
- `i_level`: water level or state value.
- `mes_type`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `Wiper_workmode`: decoded output field.
- `Wiper_clean_times`: timestamp or decoded time.
- `Wiper_clean_interval`: decoded output field.
- `Wiper_last_clean_time`: timestamp or decoded time.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.

## LDS40-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LDS40-LB/LDS40-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, units, TRUE, HIGH, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Interrupt_level, Message_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `LDS40-LB/LDS40-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, units, TRUE, HIGH, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Interrupt_level, Message_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `units`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Lidar_distance`: distance measurement.
- `Lidar_signal`: decoded output field.
- `Lidar_temp`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Interrupt_level`: water level or state value.
- `Message_type`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## LHT52

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LHT52/LHT52 Decoder Chirpstack  .txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | TempC_SHT, Hum_SHT, TempC_DS, Ext, Systimestamp, Node_type, Status, DS18B20_ID, Sensor_Model, Firmware_Version, Freq_Band, Sub_Band, Bat_mV |
| `LHT52/LHT52 Decoder Chirpstack V4 .txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | Node_type, DATALOG, TempC_SHT, Hum_SHT, TempC_DS, Ext, Systimestamp, Status, DS18B20_ID, Sensor_Model, Firmware_Version, Freq_Band, Sub_Band, Bat_mV |
| `LHT52/LHT52 Decoder TTN.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | Node_type, DATALOG, TempC_SHT, Hum_SHT, TempC_DS, Ext, Systimestamp, Status, DS18B20_ID, Sensor_Model, Firmware_Version, Freq_Band, Sub_Band, Bat_mV |
| `LHT52/LHT52decoder AWS.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | def str_pad(byte), port), else, TempC_SHT, Hum_SHT, TempC_DS, Ext, Systimestamp, Status, DS18B20_ID, Sensor_Model, Firmware_Version, Freq_Band, Sub_Band, Bat_mV |

Field reference:
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `TempC_DS`: temperature.
- `Ext`: decoded output field.
- `Systimestamp`: timestamp or decoded time.
- `Node_type`: device model or sensor type.
- `Status`: status, trigger, alarm, or flag.
- `DS18B20_ID`: decoded output field.
- `Sensor_Model`: device model or sensor type.
- `Firmware_Version`: firmware version.
- `Freq_Band`: frequency band or sub-band.
- `Sub_Band`: frequency band or sub-band.
- `Bat_mV`: decoded output field.
- `DATALOG`: decoded output field.
- `def str_pad(byte)`: decoded output field.
- `port)`: decoded output field.
- `else`: decoded output field.

## LHT65N

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LHT65N/LHT65N Chirpstack  4.0 decoder.txt` | 3 (0x03), 5 (0x05), 0 (0x00), 1 (0x01), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, Activity, case 1, default, errors, Node_type, bat, sensor, Temp, TempC_DS, Bat_status, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, TempC_TMP117, Work_mode, ... (+13) |
| `LHT65N/LHT65N V1.5.0 Chirpstack  4.0 decoder.txt` | 3 (0x03), 5 (0x05), 0 (0x00), 1 (0x01), 2 (0x02), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Regular sensor uplink payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, Activity, case 1, case 2, retransmission_Status, default, errors, Node_type, bat, sensor, Temp, TempC_DS, Bat_status, TempC_TMP117, BatV, TempC_SHT, Hum_SHT, No_connect, ... (+13) |
| `LHT65N/LHT65N-ChiprstackV4-1.5.6_decoder.txt` | 3 (0x03), 5 (0x05), 1 (0x01), 2 (0x02), 4 (0x04), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E), 0 (0x00), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Regular sensor uplink payload. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | input.fPort, n, new Date(ts), High, True, Node_type, bat, Temp, NULL, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0A, case 0x0B, case 0x0C, case 0x0D, case 0x0E, default, SENSOR_MODEL, ... (+29) |
| `LHT65N/LHT65N-TTN-v1.4.1_decode.txt` | 3 (0x03), 5 (0x05), 0 (0x00), 1 (0x01), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, Activity, case 1, default, errors, bat, sensor, Temp, TempC_DS, Bat_status, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, TempC_TMP117, Work_mode, Exti_pin_level, ... (+11) |
| `LHT65N/LHT65N-TTN-v1.5.6_decoder.txt` | 3 (0x03), 5 (0x05), 0 (0x00), 1 (0x01), 2 (0x02), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Regular sensor uplink payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, case 1, case 2, retransmission_Status, default, errors, Node_type, bat, sensor, Temp, TempC_DS, Bat_status, TempC_TMP117, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, ... (+11) |
| `LHT65N/LHT65N-TTN-v1.5_decode.txt` | 3 (0x03), 5 (0x05), 0 (0x00), 1 (0x01), 2 (0x02), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Regular sensor uplink payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, Activity, case 1, case 2, retransmission_Status, default, errors, Node_type, bat, sensor, Temp, TempC_DS, Bat_status, TempC_TMP117, BatV, TempC_SHT, Hum_SHT, No_connect, ... (+13) |
| `LHT65N/LHT65N-TTN_decoder.txt` | 3 (0x03), 0 (0x00), 1 (0x01), default / other ports | Historical data, package data, or datalog payload. Payload structure is parsed by the matching fPort branch in the decoder. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, case 0, case 1, default, errors, bat, sensor, Temp, TempC_DS, Bat_status, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, TempC_TMP117, Work_mode, Exti_pin_level, Exti_status, ILL_lx, ADC_V, Exit_count, Systimestamp, ID, ... (+1) |
| `LHT65N/LHT65N-TTN_v1.3.3_decode.txt` | 3 (0x03), 0 (0x00), 1 (0x01), default / other ports | Historical data, package data, or datalog payload. Payload structure is parsed by the matching fPort branch in the decoder. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, case 0, case 1, default, errors, bat, sensor, Temp, TempC_DS, Bat_status, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, TempC_TMP117, Work_mode, Exti_pin_level, Exti_status, ILL_lx, ADC_V, Exit_count, Systimestamp, ID, ... (+1) |
| `LHT65N/LHT65N-chirpstack decoder.txt` | 5 (0x05), 0 (0x00), 1 (0x01), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, Activity, case 1, default, errors, TempC_DS, Bat_status, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, Work_mode, Exti_pin_level, Exti_status, ILL_lx, ADC_V, Exit_count, ... (+7) |
| `LHT65N/dragino_lht65nAWS Decoder.py` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | def str_pad(decoded), def hexzf(n), else, def dict_from_payload(base64_input, fport, None), base64_input, LHT65N, TempC_DS, Bat_status, Work_mode, Systimestamp, TempC_SHT, Hum_SHT, Sensor_State, BatV, Ext_sensor, TempC_TMP117, Exti_pin_level, Exti_status, ILL_lx, ADC_V, Exit_count, ID, DATALOG |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `case 0`: decoded output field.
- `Activity`: decoded output field.
- `case 1`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `Node_type`: device model or sensor type.
- `bat`: battery voltage or battery level.
- `sensor`: device model or sensor type.
- `Temp`: temperature.
- `TempC_DS`: temperature.
- `Bat_status`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `No_connect`: decoded output field.
- `Ext_sensor`: device model or sensor type.
- `TempC_TMP117`: temperature.
- `Work_mode`: decoded output field.
- `Exti_pin_level`: water level or state value.
- `Exti_status`: status, trigger, alarm, or flag.
- `Exit_count`: counter or total count.
- `Exit_duration`: decoded output field.
- `ILL_lx`: decoded output field.
- `ADC_V`: decoded output field.
- `Systimestamp`: timestamp or decoded time.
- `Ext_TempC_SHT`: temperature.
- `Ext_Hum_SHT`: humidity.
- `Move_count`: counter or total count.
- `ID`: decoded output field.
- `DATALOG`: decoded output field.
- `retransmission_message`: decoded output field.
- `case 2`: decoded output field.
- `retransmission_Status`: status, trigger, alarm, or flag.
- The remaining `27` fields are listed in the corresponding decoder return objects.

## LHT65N-PIR

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LHT65N-PIR/lht65n_pir chirpstackV4_decoder.js` | 3 (0x03), 5 (0x05), 0 (0x00), 1 (0x01), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, case 0, Activity, case 1, default, errors, bat, sensor, Node_type, Temp, TempC_DS, Bat_status, BatV, TempC_SHT, Hum_SHT, No_connect, Ext_sensor, TempC_TMP117, Work_mode, ... (+12) |
| `LHT65N-PIR/lht65n_pir ttn_decoder.js` | 3 (0x03), 5 (0x05), 1 (0x01), 2 (0x02), 4 (0x04), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E), 0 (0x00), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Regular sensor uplink payload. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | Helper, c_num, FIX, High, True, Note, PORT 3, interpret the original intent, Looking at original, stick to original logic structure but fix the parsing, Original, Equivalent to, PORT 5, NULL, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0A, case 0x0B, ... (+39) |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `case 0`: decoded output field.
- `Activity`: decoded output field.
- `case 1`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `bat`: battery voltage or battery level.
- `sensor`: device model or sensor type.
- `Node_type`: device model or sensor type.
- `Temp`: temperature.
- `TempC_DS`: temperature.
- `Bat_status`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `No_connect`: decoded output field.
- `Ext_sensor`: device model or sensor type.
- `TempC_TMP117`: temperature.
- `Work_mode`: decoded output field.
- `Exti_pin_level`: water level or state value.
- `Exti_status`: status, trigger, alarm, or flag.
- `Exit_count`: counter or total count.
- `Exit_duration`: decoded output field.
- `ILL_lx`: decoded output field.
- `ADC_V`: decoded output field.
- `Systimestamp`: timestamp or decoded time.
- `Ext_TempC_SHT`: temperature.
- `Ext_Hum_SHT`: humidity.
- `Move_count`: counter or total count.
- `ID`: decoded output field.
- `DATALOG`: decoded output field.
- `Helper`: decoded output field.
- `c_num`: decoded output field.
- `FIX`: decoded output field.
- The remaining `24` fields are listed in the corresponding decoder return objects.

## LHT65N-VIB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LHT65N-VIB/LHT65N-VIB_Chirpstack_Decoder.txt` | 2 (0x02), 7 (0x07), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, YES, Node_type, Bat_V, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, vib_count, work_min, TempC_SHT, Hum_SHT, Alarm, TDC |
| `LHT65N-VIB/LHT65N-VIB_Chirpstack_Decoder_V1.3.js` | 2 (0x02), 7 (0x07), 9 (0x09), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, YES, Node_type, Bat_V, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, vib_count, work_min, TempC_SHT, Hum_SHT, Alarm, TDC, max_acc_x_g, max_acc_y_g, max_acc_z_g |
| `LHT65N-VIB/LHT65N-VIB_TTN_Decoder.txt` | 2 (0x02), 7 (0x07), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, YES, Node_type, Bat_V, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, vib_count, work_min, TempC_SHT, Hum_SHT, Alarm, TDC |
| `LHT65N-VIB/LHT65N-VIB_TTN_Decoder_V1.3.js` | 2 (0x02), 7 (0x07), 9 (0x09), 5 (0x05) | Regular sensor uplink payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, YES, Node_type, Bat_V, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, vib_count, work_min, TempC_SHT, Hum_SHT, Alarm, TDC, max_acc_x_g, max_acc_y_g, max_acc_z_g |

Field reference:
- `TRUE`: decoded output field.
- `YES`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat_V`: decoded output field.
- `DATALOG`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `vib_count`: counter or total count.
- `work_min`: decoded output field.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `Alarm`: status, trigger, alarm, or flag.
- `TDC`: decoded output field.
- `max_acc_x_g`: decoded output field.
- `max_acc_y_g`: decoded output field.
- `max_acc_z_g`: decoded output field.

## LLDS12

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LLDS12/LLDS12_Decode_ChirpstackV4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Message_type |
| `LLDS12/LLDS12_Decode_TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Message_type |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Lidar_distance`: distance measurement.
- `Lidar_signal`: decoded output field.
- `Lidar_temp`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Message_type`: decoded output field.

## LLDS40

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LLDS40/LLDS40 ChirpstackV4 Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Message_type |
| `LLDS40/LLDS40 TTN Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Lidar_distance, Lidar_signal, Lidar_temp, Interrupt_flag, Message_type |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Lidar_distance`: distance measurement.
- `Lidar_signal`: decoded output field.
- `Lidar_temp`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Message_type`: decoded output field.

## LLMS01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LLMS01/LLMS01 Chirpstack Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Leaf_Moisture, Leaf_Temperature, Interrupt_flag, Message_type |
| `LLMS01/LLMS01 ChirpstackV4 Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Leaf_Moisture, Leaf_Temperature, Interrupt_flag, Message_type |
| `LLMS01/LLMS01_Datacake_Decode_V1.0.0.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, field |
| `LLMS01/LLMS01_TTN_Decoder_V1.0.0.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, Leaf_Moisture, Leaf_Temperature, Interrupt_flag, Message_type |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Leaf_Moisture`: decoded output field.
- `Leaf_Temperature`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Message_type`: decoded output field.
- `field`: decoded output field.

## LMDS120

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LMDS120/LMDS120_decoder _ChirpstackV4.js` | 2 (0x02), 5 (0x05), 1 (0x01), 3 (0x03), 4 (0x04), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Payload structure is parsed by the matching fPort branch in the decoder. Historical data, package data, or datalog payload. Event, status, or special-function payload. | units, Node_type, Bat, TempC_DS18B20, Distance, Sensor_flag, Interrupt_flag, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, Sensor_model, Ver, Fre_band, Sub_band |
| `LMDS120/LMDS120_decoder _TTN.js` | 2 (0x02), 5 (0x05), 1 (0x01), 3 (0x03), 4 (0x04), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Payload structure is parsed by the matching fPort branch in the decoder. Historical data, package data, or datalog payload. Event, status, or special-function payload. | units, Node_type, Bat, TempC_DS18B20, Distance, Sensor_flag, Interrupt_flag, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, Sensor_model, Ver, Fre_band, Sub_band |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Distance`: distance measurement.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `case 0x01`: decoded output field.
- `case 0x02`: decoded output field.
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `case 0x05`: decoded output field.
- `case 0x06`: decoded output field.
- `case 0x07`: decoded output field.
- `case 0x08`: decoded output field.
- `case 0x09`: decoded output field.
- `case 0x0a`: decoded output field.
- `case 0x0b`: decoded output field.
- `Sensor_model`: device model or sensor type.
- `Ver`: decoded output field.
- `Fre_band`: frequency band or sub-band.
- `Sub_band`: frequency band or sub-band.

## LMDS200

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LMDS200/LMDS200 Chirpstack  V3 decoder.txt` | 2 (0x02), 5 (0x05), 4 (0x04), 1 (0x01), 3 (0x03), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. Payload structure is parsed by the matching fPort branch in the decoder. Event, status, or special-function payload. | Node_type, Bat, dis1, dis2, DALARM_count, Distance_alarm, Interrupt_alarm, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, case 0x0c, case 0x0d, case 0x0e, Sensor_model, Ver, Fre_band, Sub_band, ... (+5) |
| `LMDS200/LMDS200 Chirpstack V4 Decoder.txt` | 2 (0x02), 5 (0x05), 4 (0x04), 1 (0x01), 3 (0x03), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. Payload structure is parsed by the matching fPort branch in the decoder. Event, status, or special-function payload. | Node_type, Bat, dis1, dis2, DALARM_count, Distance_alarm, Interrupt_alarm, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, case 0x0c, case 0x0d, case 0x0e, Sensor_model, Ver, Fre_band, Sub_band, ... (+5) |
| `LMDS200/LMDS200_Decoder_V1.0.0.js` | 2 (0x02), 5 (0x05), 4 (0x04), 1 (0x01), 3 (0x03), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. Payload structure is parsed by the matching fPort branch in the decoder. Event, status, or special-function payload. | Node_type, Bat, dis1, dis2, DALARM_count, Distance_alarm, Interrupt_alarm, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, case 0x0c, case 0x0d, case 0x0e, Sensor_model, Ver, Fre_band, Sub_band, ... (+5) |

Field reference:
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `dis1`: decoded output field.
- `dis2`: decoded output field.
- `DALARM_count`: status, trigger, alarm, or flag; counter or total count.
- `Distance_alarm`: distance measurement; status, trigger, alarm, or flag.
- `Interrupt_alarm`: status, trigger, alarm, or flag.
- `case 0x01`: decoded output field.
- `case 0x02`: decoded output field.
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `case 0x05`: decoded output field.
- `case 0x06`: decoded output field.
- `case 0x07`: decoded output field.
- `case 0x08`: decoded output field.
- `case 0x09`: decoded output field.
- `case 0x0a`: decoded output field.
- `case 0x0b`: decoded output field.
- `case 0x0c`: decoded output field.
- `case 0x0d`: decoded output field.
- `case 0x0e`: decoded output field.
- `Sensor_model`: device model or sensor type.
- `Ver`: decoded output field.
- `Fre_band`: frequency band or sub-band.
- `Sub_band`: frequency band or sub-band.
- `TDC`: decoded output field.
- `ATDC`: decoded output field.
- `Alarm_min`: status, trigger, alarm, or flag.
- `Alarm_max`: status, trigger, alarm, or flag.
- `Interrupt`: decoded output field.

## LMS01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LMS01-LB/LMS01-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, TempC_DS18B20, Leaf_Moisture, Leaf_Temperature, Interrupt_flag, Message_type, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `LMS01-LB/LMS01-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, TempC_DS18B20, Leaf_Moisture, Leaf_Temperature, Interrupt_flag, Message_type, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Leaf_Moisture`: decoded output field.
- `Leaf_Temperature`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Message_type`: decoded output field.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## LPT01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LPT01/LPT01_decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Time, Unit, Count, Temp, continuous_data |

Field reference:
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `Time`: timestamp or decoded time.
- `Unit`: decoded output field.
- `Count`: counter or total count.
- `Temp`: temperature.
- `continuous_data`: decoded output field.

## LSE01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LSE01/LSE01 Calibration Decoder_TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Bat, TempC_DS18B20, water_SOIL, temp_SOIL, conduct_SOIL, Moisture_After_Cal, EC_After_Cal, Sensor_flag, Interrupt_flag |
| `LSE01/LSE01_ChirpstackV4_Decoder V1.2.1.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, s_flag, i_flag, Mod, Node_type |
| `LSE01/LSE01_Chirpstack_Decoder V1.2.1.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, s_flag, i_flag, Mod, Node_type |
| `LSE01/LSE01_Chirpstack_Decoder_V1.1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, max, Bat, TempC_DS18B20, water_SOIL, temp_SOIL, conduct_SOIL, Sensor_flag, Interrupt_flag |
| `LSE01/LSE01_TTN Decoder V1.2.1.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, s_flag, i_flag, Mod, Node_type |
| `LSE01/LSE01_TTN Decoder_V1.1.4.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, max, Bat, TempC_DS18B20, water_SOIL, temp_SOIL, conduct_SOIL, Sensor_flag, Interrupt_flag |
| `LSE01/LSE01_TTN_DECODER.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Bat, TempC_DS18B20, water_SOIL, temp_SOIL, conduct_SOIL |

Field reference:
- `units`: decoded output field.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `water_SOIL`: water level or state value.
- `temp_SOIL`: temperature.
- `conduct_SOIL`: decoded output field.
- `Moisture_After_Cal`: decoded output field.
- `EC_After_Cal`: decoded output field.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `Soil_dielectric_constant`: decoded output field.
- `Raw_water_SOIL`: water level or state value.
- `Raw_conduct_SOIL`: decoded output field.
- `s_flag`: status, trigger, alarm, or flag.
- `i_flag`: status, trigger, alarm, or flag.
- `Mod`: decoded output field.
- `Node_type`: device model or sensor type.
- `max`: decoded output field.

## LSN50 & LSN50-v2

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LSN50 & LSN50-v2/LSN50V2_v1.5.1_Decoder_TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, H, TRUE, CLOSE, BatV, TempC, ADC_CH0V, ADC_CH1V, ADC_CH4V, Digital_IStatus, EXTI_Trigger, Door_status, MOD1, MOD2, MOD3, Ultrasonic, TempC_SHT, Hum_SHT |
| `LSN50 & LSN50-v2/LSN50V2_v1.6.3_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Work_mode, units, BatV, TempC1, ADC_CH0V, Digital_IStatus, H, EXTI_Trigger, TRUE, Door_status, CLOSE, TempC_SHT, Hum_SHT, Distance, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight |
| `LSN50 & LSN50-v2/LSN50V2_v1.6.5_Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Work_mode, units, BatV, TempC1, ADC_CH0V, Digital_IStatus, H, EXTI_Trigger, TRUE, Door_status, CLOSE, TempC_SHT, Hum_SHT, Distance, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count |
| `LSN50 & LSN50-v2/LSN50V2_v1.6.5_Decoder_chirpstack.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Work_mode, units, BatV, TempC1, ADC_CH0V, Digital_IStatus, H, EXTI_Trigger, TRUE, Door_status, CLOSE, TempC_SHT, Hum_SHT, Distance, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count |
| `LSN50 & LSN50-v2/LSN50V2_v1.7.0_Decoder_TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | H, TRUE, CLOSE, BatV, TempC1, ADC_CH0V, Digital_IStatus, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count |
| `LSN50 & LSN50-v2/LSN50V2_v1.8.0_Decoder_ChirpstackV4.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | H, TRUE, CLOSE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, Digital_IStatus, BatV, TempC1, ADC_CH0V, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count, ... (+9) |
| `LSN50 & LSN50-v2/LSN50V2_v1.8.0_Decoder_TTN.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | H, TRUE, CLOSE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, Digital_IStatus, BatV, TempC1, ADC_CH0V, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count, ... (+9) |

Field reference:
- `units`: decoded output field.
- `H`: decoded output field.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `BatV`: battery voltage or battery level.
- `TempC`: temperature.
- `ADC_CH0V`: decoded output field.
- `ADC_CH1V`: decoded output field.
- `ADC_CH4V`: decoded output field.
- `Digital_IStatus`: status, trigger, alarm, or flag.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Door_status`: status, trigger, alarm, or flag.
- `MOD1`: decoded output field.
- `MOD2`: decoded output field.
- `MOD3`: decoded output field.
- `Ultrasonic`: decoded output field.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `Work_mode`: decoded output field.
- `TempC1`: temperature.
- `Distance`: distance measurement.
- `TempC2`: temperature.
- `TempC3`: temperature.
- `Weight`: decoded output field.
- `Count`: counter or total count.
- `Illum`: decoded output field.
- `Distance_cm`: distance measurement.
- `Distance_signal_strength`: distance measurement.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `TDC_sec`: decoded output field.
- `EXTI1_Trigger`: status, trigger, alarm, or flag.
- `EXTI1_Status`: status, trigger, alarm, or flag.
- `EXTI2_Trigger`: status, trigger, alarm, or flag.
- `EXTI2_Status`: status, trigger, alarm, or flag.
- `EXTI3_Trigger`: status, trigger, alarm, or flag.
- `EXTI3_Status`: status, trigger, alarm, or flag.
- `Count1`: counter or total count.
- `Count2`: counter or total count.
- The remaining `1` fields are listed in the corresponding decoder return objects.

## LSN50v2-D20-D22-D23

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LSN50v2-D20-D22-D23/LSN50v2-D20-Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | H, TRUE, CLOSE, Node_type, BatV, TempC1, ADC_CH0V, Digital_IStatus, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count, TempC1MIN, TempC1MAX, SHTEMPMIN, ... (+3) |
| `LSN50v2-D20-D22-D23/LSN50v2-D20-chirpstack-Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | H, TRUE, CLOSE, BatV, TempC1, ADC_CH0V, Digital_IStatus, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count, TempC1MIN, TempC1MAX, SHTEMPMIN, SHTEMPMAX, ... (+3) |
| `LSN50v2-D20-D22-D23/LSN50v2-D20-chirpstackV4-Decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | H, TRUE, CLOSE, Node_type, BatV, TempC1, ADC_CH0V, Digital_IStatus, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count, TempC1MIN, TempC1MAX, SHTEMPMIN, ... (+3) |

Field reference:
- `H`: decoded output field.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `Node_type`: device model or sensor type.
- `BatV`: battery voltage or battery level.
- `TempC1`: temperature.
- `ADC_CH0V`: decoded output field.
- `Digital_IStatus`: status, trigger, alarm, or flag.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Door_status`: status, trigger, alarm, or flag.
- `Work_mode`: decoded output field.
- `Illum`: decoded output field.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `Distance_cm`: distance measurement.
- `Distance_signal_strength`: distance measurement.
- `ADC_CH1V`: decoded output field.
- `ADC_CH4V`: decoded output field.
- `TempC2`: temperature.
- `TempC3`: temperature.
- `Weight`: decoded output field.
- `Count`: counter or total count.
- `TempC1MIN`: temperature.
- `TempC1MAX`: temperature.
- `SHTEMPMIN`: temperature.
- `SHTEMPMAX`: temperature.
- `SHTHUMMIN`: humidity.
- `SHTHUMMAX`: humidity.

## LSN50v2-S31&S31B

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LSN50v2-S31&S31B/Decoder_TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | H, TRUE, CLOSE, Node_type, BatV, TempC1, ADC_CH0V, Digital_IStatus, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC_CH1V, ADC_CH4V, TempC2, TempC3, Weight, Count |
| `LSN50v2-S31&S31B/Decoder_chirpstack.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, CLOSE, Node_type, DATALOG, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX |
| `LSN50v2-S31&S31B/LSN50v2-S31-Chirpstack v4 decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, CLOSE, Node_type, DATALOG, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX |
| `LSN50v2-S31&S31B/LSN50v2-S31-V1.8.0-TTN Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | TRUE, CLOSE, Node_type, DATALOG, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time |

Field reference:
- `H`: decoded output field.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `Node_type`: device model or sensor type.
- `BatV`: battery voltage or battery level.
- `TempC1`: temperature.
- `ADC_CH0V`: decoded output field.
- `Digital_IStatus`: status, trigger, alarm, or flag.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Door_status`: status, trigger, alarm, or flag.
- `Work_mode`: decoded output field.
- `Illum`: decoded output field.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `Distance_cm`: distance measurement.
- `Distance_signal_strength`: distance measurement.
- `ADC_CH1V`: decoded output field.
- `ADC_CH4V`: decoded output field.
- `TempC2`: temperature.
- `TempC3`: temperature.
- `Weight`: decoded output field.
- `Count`: counter or total count.
- `DATALOG`: decoded output field.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `TDC_sec`: decoded output field.
- `TempC_SHT31`: temperature.
- `Hum_SHT31`: humidity.
- `Data_time`: timestamp or decoded time.
- `SHTEMP_MIN`: temperature.
- `SHTEMP_MAX`: temperature.
- `SHHUM_MIN`: humidity.
- `SHHUM_MAX`: humidity.

## LSPH01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LSPH01/LSPH01_ChirpstackV4_Decoder_V1.0.0.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, PH1_SOIL, TEMP_SOIL, Interrupt_flag, Message_type |
| `LSPH01/LSPH01_Chirpstack_Decoder_V1.0.0.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, PH1_SOIL, TEMP_SOIL, Interrupt_flag, Message_type |
| `LSPH01/LSPH01_Datacake_Decode_V1.0.0.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, field |
| `LSPH01/LSPH01_TTN_Decoder_V1.0.0.js` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, Bat, TempC_DS18B20, PH1_SOIL, TEMP_SOIL, Interrupt_flag, Message_type |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `PH1_SOIL`: decoded output field.
- `TEMP_SOIL`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Message_type`: decoded output field.
- `field`: decoded output field.

## LT22222-L

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LT22222-L/v1.3_chirpstack_decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, ACI1_mA, ACI2_mA, AVI1_V, AVI2_V, DO1_status, L, DO2_status, DO3_status, DI1_status, H, DI2_status, DI3_status, RO1_status, ON, RO2_status |
| `LT22222-L/v1.3_ttn_decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, L, H, ON, ACI1_mA, ACI2_mA, AVI1_V, AVI2_V, DO1_status, DO2_status, DO3_status, DI1_status, DI2_status, DI3_status, RO1_status, RO2_status |
| `LT22222-L/v1.4_chirpstack_decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Hardware_mode, Work_mode, units, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, Count1_times, Count2_times, Acount_times, First_status, Yes, DO1_status, L, DO2_status, DO3_status, DI1_status, H, DI2_status, DI3_status, RO1_status, ON, RO2_status |
| `LT22222-L/v1.4_ttn_decoder.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Hardware_mode, Work_mode, units, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, Count1_times, Count2_times, Acount_times, First_status, Yes, DO1_status, L, DO2_status, DO3_status, DI1_status, H, DI2_status, DI3_status, RO1_status, ON, RO2_status |
| `LT22222-L/v1.5_ttn_decoder_chirpstack.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | L, ON, Yes, H, True, Hardware_mode, DO3_status, DI3_status, DO1_status, DO2_status, RO1_status, RO2_status, Count1_times, First_status, Work_mode, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, DI1_status, DI2_status, Count2_times, Acount_times, Mode_status, AV1L_flag, ... (+17) |
| `LT22222-L/v1.5_ttn_decoder_ttn.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | L, ON, Yes, H, True, Hardware_mode, DO3_status, DI3_status, DO1_status, DO2_status, RO1_status, RO2_status, Count1_times, First_status, Work_mode, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, DI1_status, DI2_status, Count2_times, Acount_times, Mode_status, AV1L_flag, ... (+17) |
| `LT22222-L/v1.6 Chirpstack  V4 Decoder .txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | L, ON, Yes, H, True, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, Hardware_mode, DO3_status, DI3_status, DO1_status, DO2_status, RO1_status, RO2_status, Count1_times, First_status, Work_mode, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, DI1_status, DI2_status, ... (+21) |
| `LT22222-L/v1.6_chirpstack_decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | L, ON, Yes, H, True, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, Hardware_mode, DO3_status, DI3_status, DO1_status, DO2_status, RO1_status, RO2_status, Count1_times, First_status, Work_mode, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, DI1_status, DI2_status, ... (+22) |
| `LT22222-L/v1.6_decoder_ttn .txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | L, ON, Yes, H, True, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, Hardware_mode, DO3_status, DI3_status, DO1_status, DO2_status, RO1_status, RO2_status, Count1_times, First_status, Work_mode, AVI1_V, AVI2_V, ACI1_mA, ACI2_mA, DI1_status, DI2_status, ... (+22) |

Field reference:
- `units`: decoded output field.
- `ACI1_mA`: decoded output field.
- `ACI2_mA`: decoded output field.
- `AVI1_V`: decoded output field.
- `AVI2_V`: decoded output field.
- `DO1_status`: status, trigger, alarm, or flag.
- `L`: decoded output field.
- `DO2_status`: status, trigger, alarm, or flag.
- `DO3_status`: status, trigger, alarm, or flag.
- `DI1_status`: status, trigger, alarm, or flag.
- `H`: decoded output field.
- `DI2_status`: status, trigger, alarm, or flag.
- `DI3_status`: status, trigger, alarm, or flag.
- `RO1_status`: status, trigger, alarm, or flag.
- `ON`: decoded output field.
- `RO2_status`: status, trigger, alarm, or flag.
- `Hardware_mode`: decoded output field.
- `Work_mode`: decoded output field.
- `Count1_times`: timestamp or decoded time; counter or total count.
- `Count2_times`: timestamp or decoded time; counter or total count.
- `Acount_times`: timestamp or decoded time; counter or total count.
- `First_status`: status, trigger, alarm, or flag.
- `Yes`: decoded output field.
- `True`: decoded output field.
- `Mode_status`: status, trigger, alarm, or flag.
- `AV1L_flag`: status, trigger, alarm, or flag.
- `AV1H_flag`: status, trigger, alarm, or flag.
- `AV2L_flag`: status, trigger, alarm, or flag.
- `AV2H_flag`: status, trigger, alarm, or flag.
- `AC1L_flag`: status, trigger, alarm, or flag.
- `AC1H_flag`: status, trigger, alarm, or flag.
- `AC2L_flag`: status, trigger, alarm, or flag.
- `AC2H_flag`: status, trigger, alarm, or flag.
- `AV1L_status`: status, trigger, alarm, or flag.
- `AV1H_status`: status, trigger, alarm, or flag.
- `AV2L_status`: status, trigger, alarm, or flag.
- `AV2H_status`: status, trigger, alarm, or flag.
- `AC1L_status`: status, trigger, alarm, or flag.
- `AC1H_status`: status, trigger, alarm, or flag.
- `AC2L_status`: status, trigger, alarm, or flag.
- The remaining `8` fields are listed in the corresponding decoder return objects.

## LTC2

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LTC2/LTC2 v1.0 Decode -TTN.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Ext, BatV, Node_type, Temp_Channel1, Temp_Channel2, Res_Channel1, Res_Channel2, Systimestamp |
| `LTC2/LTC2 v1.0 Decode -chirpstack.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Ext, BatV, Node_type, Temp_Channel1, Temp_Channel2, Res_Channel1, Res_Channel2, Systimestamp |
| `LTC2/LTC2 v1.0 Decode -chirpstackV4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Ext, BatV, Node_type, Temp_Channel1, Temp_Channel2, Res_Channel1, Res_Channel2, Systimestamp |
| `LTC2/LTC2-HT Decoder TTN .txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | Ext, BatV, BatV_status, Node_type, Temp_Channel1, Temp_Channel2, Res_Channel1, Res_Channel2, Systimestamp |

Field reference:
- `Ext`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Node_type`: device model or sensor type.
- `Temp_Channel1`: temperature.
- `Temp_Channel2`: temperature.
- `Res_Channel1`: decoded output field.
- `Res_Channel2`: decoded output field.
- `Systimestamp`: timestamp or decoded time.
- `BatV_status`: battery voltage or battery level; status, trigger, alarm, or flag.

## LTC2-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LTC2-LB/LTC2-LB_v1.0_ChirpstackV4__decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, TRUE, HIGH, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Interrupt_flag, Interrupt_level, TEMP1H_flag, TEMP1L_flag, TEMP2H_flag, TEMP2L_flag, Temp_Channel1, Temp_Channel2, Data_time |
| `LTC2-LB/LTC2-LB_v1.0_TTN_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, TRUE, HIGH, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Interrupt_flag, Interrupt_level, TEMP1H_flag, TEMP1L_flag, TEMP2H_flag, TEMP2L_flag, Temp_Channel1, Temp_Channel2, Data_time |
| `LTC2-LB/LTC2-LB_v1.2_decoder.txt` | 2 (0x02), 5 (0x05), 3 (0x03), 7 (0x07), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | High, True, case 2, TRUE, HIGH, case 5, case 3, case 7, default, errors, BatV, Interrupt_flag, Interrupt_level, TEMP1H_flag, TEMP1L_flag, TEMP2H_flag, TEMP2L_flag, Temp_Channel1, Temp_Channel2, Data_time, Node_type, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, ... (+4) |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Interrupt_level`: water level or state value.
- `TEMP1H_flag`: temperature; status, trigger, alarm, or flag.
- `TEMP1L_flag`: temperature; status, trigger, alarm, or flag.
- `TEMP2H_flag`: temperature; status, trigger, alarm, or flag.
- `TEMP2L_flag`: temperature; status, trigger, alarm, or flag.
- `Temp_Channel1`: temperature.
- `Temp_Channel2`: temperature.
- `Data_time`: timestamp or decoded time.
- `case 2`: decoded output field.
- `case 5`: decoded output field.
- `case 3`: decoded output field.
- `case 7`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `Bat`: battery voltage or battery level.

## LWL02

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LWL02/lds01_02_payload_ChirpstackV4_v1.5.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LWL02/lds01_02_payload_chirpstack_20200628.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | MOD, BAT_V, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LWL02/lds01_02_payload_ttn_20200805.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LWL02/lds01_02_payload_ttn_v1.3.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LWL02/lds01_02_payload_ttn_v1.4.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |
| `LWL02/lds01_02_payload_ttn_v1.5.txt` | not specified | The decoder does not explicitly check fPort; payload parsing is defined by the decoder body. | units, Node_type, BAT_V, MOD, DOOR_OPEN_STATUS, DOOR_OPEN_TIMES, LAST_DOOR_OPEN_DURATION, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `BAT_V`: decoded output field.
- `MOD`: decoded output field.
- `DOOR_OPEN_STATUS`: status, trigger, alarm, or flag.
- `DOOR_OPEN_TIMES`: timestamp or decoded time.
- `LAST_DOOR_OPEN_DURATION`: decoded output field.
- `ALARM`: status, trigger, alarm, or flag.
- `WATER_LEAK_STATUS`: water level or state value; status, trigger, alarm, or flag.
- `WATER_LEAK_TIMES`: timestamp or decoded time; water level or state value.
- `LAST_WATER_LEAK_DURATION`: water level or state value.

## LWL03A

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LWL03A/LWL03A_v1.0ChirpstackV4.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | DATALOG, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, LEAK_ALARM_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION, TIME |
| `LWL03A/LWL03A_v1.0TTN.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | Node_type, DATALOG, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, LEAK_ALARM_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION, TIME |

Field reference:
- `DATALOG`: decoded output field.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS`: status, trigger, alarm, or flag.
- `KEEP_TIME`: timestamp or decoded time.
- `LEAK_ALARM_TIME`: timestamp or decoded time; status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `ALARM`: status, trigger, alarm, or flag.
- `WATER_LEAK_STATUS`: water level or state value; status, trigger, alarm, or flag.
- `WATER_LEAK_TIMES`: timestamp or decoded time; water level or state value.
- `LAST_WATER_LEAK_DURATION`: water level or state value.
- `TIME`: timestamp or decoded time.
- `Node_type`: device model or sensor type.

## LWL04-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `LWL04-LB/lwl04v1.0-ChirpstackV4.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, LEAK_ALARM_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, CMOD, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION, TIME |
| `LWL04-LB/lwl04v1.0-TTN.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, LEAK_ALARM_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, CMOD, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION, TIME |

Field reference:
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS`: status, trigger, alarm, or flag.
- `KEEP_TIME`: timestamp or decoded time.
- `LEAK_ALARM_TIME`: timestamp or decoded time; status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `CMOD`: decoded output field.
- `ALARM`: status, trigger, alarm, or flag.
- `WATER_LEAK_STATUS`: water level or state value; status, trigger, alarm, or flag.
- `WATER_LEAK_TIMES`: timestamp or decoded time; water level or state value.
- `LAST_WATER_LEAK_DURATION`: water level or state value.
- `TIME`: timestamp or decoded time.

## MDS120-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `MDS120-LB/MDS120-LB_ChirpstackV4_DECOEDR.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, TempC_DS18B20, Distance, Sensor_flag, Interrupt_flag, True, DATALOG, PNACKMD, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `MDS120-LB/MDS120-LB_TTN_DECOEDR.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, TempC_DS18B20, Distance, Sensor_flag, Interrupt_flag, True, DATALOG, PNACKMD, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Distance`: distance measurement.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `TDC`: decoded output field.
- `Stop_Timer`: timestamp or decoded time.
- `Alarm_Timer`: timestamp or decoded time; status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## MDS200-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `MDS200-LB/MDS200-LB ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 4 (0x04), 1 (0x01), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Payload structure is parsed by the matching fPort branch in the decoder. Event, status, or special-function payload. | Node_type, Bat, dis1, dis2, DALARM_count, Distance_alarm, Interrupt_alarm, True, DATALOG, PNACKMD, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, case 0x0c, case 0x0d, case 0x0e, Sensor_model, ... (+8) |
| `MDS200-LB/MDS200-LB TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 4 (0x04), 1 (0x01), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Payload structure is parsed by the matching fPort branch in the decoder. Event, status, or special-function payload. | Node_type, Bat, dis1, dis2, DALARM_count, Distance_alarm, Interrupt_alarm, True, DATALOG, PNACKMD, case 0x01, case 0x02, case 0x03, case 0x04, case 0x05, case 0x06, case 0x07, case 0x08, case 0x09, case 0x0a, case 0x0b, case 0x0c, case 0x0d, case 0x0e, Sensor_model, ... (+8) |

Field reference:
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `dis1`: decoded output field.
- `dis2`: decoded output field.
- `DALARM_count`: status, trigger, alarm, or flag; counter or total count.
- `Distance_alarm`: distance measurement; status, trigger, alarm, or flag.
- `Interrupt_alarm`: status, trigger, alarm, or flag.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `case 0x01`: decoded output field.
- `case 0x02`: decoded output field.
- `case 0x03`: decoded output field.
- `case 0x04`: decoded output field.
- `case 0x05`: decoded output field.
- `case 0x06`: decoded output field.
- `case 0x07`: decoded output field.
- `case 0x08`: decoded output field.
- `case 0x09`: decoded output field.
- `case 0x0a`: decoded output field.
- `case 0x0b`: decoded output field.
- `case 0x0c`: decoded output field.
- `case 0x0d`: decoded output field.
- `case 0x0e`: decoded output field.
- `Sensor_model`: device model or sensor type.
- `Ver`: decoded output field.
- `Fre_band`: frequency band or sub-band.
- `Sub_band`: frequency band or sub-band.
- `TDC`: decoded output field.
- `ATDC`: decoded output field.
- `Alarm_min`: status, trigger, alarm, or flag.
- `Alarm_max`: status, trigger, alarm, or flag.
- `Interrupt`: decoded output field.

## MRxx_LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `MRxx_LB/MRxx-LB TTN Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | YES, units, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `MRxx_LB/MRxx-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Bat, Distance, Interrupt_flag, TempC_DS18B20, Sensor_flag, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `YES`: decoded output field.
- `units`: decoded output field.
- `Bat`: battery voltage or battery level.
- `Distance`: distance measurement.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `TempC_DS18B20`: temperature.
- `Sensor_flag`: device model or sensor type; status, trigger, alarm, or flag.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## PB01

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `PB01/PB01_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | c_num, new Date(parseInt(str)), True, case 2, OPEN, TRUE, errors, case 3, case 5, PB01-L, NULL, default, BatV, Sound_key, Sound_ACK, Alarm, TempC_SHT41, Hum_SHT41, PNACKMD, DATALOG, Node_type, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, ... (+1) |

Field reference:
- `c_num`: decoded output field.
- `new Date(parseInt(str))`: decoded output field.
- `True`: decoded output field.
- `case 2`: decoded output field.
- `OPEN`: decoded output field.
- `TRUE`: decoded output field.
- `errors`: decoded output field.
- `case 3`: decoded output field.
- `case 5`: decoded output field.
- `PB01-L`: decoded output field.
- `NULL`: decoded output field.
- `default`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Sound_key`: decoded output field.
- `Sound_ACK`: decoded output field.
- `Alarm`: status, trigger, alarm, or flag.
- `TempC_SHT41`: temperature.
- `Hum_SHT41`: humidity.
- `PNACKMD`: decoded output field.
- `DATALOG`: decoded output field.
- `Node_type`: device model or sensor type.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## PB05

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `PB05/PB05-L_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | Yes, True, case 2, OPEN, TRUE, case 3, case 5, default, errors, BatV, Sound_key, Sound_ACK, Alarm, key5, key4, key3, key2, key1, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, ... (+1) |

Field reference:
- `Yes`: decoded output field.
- `True`: decoded output field.
- `case 2`: decoded output field.
- `OPEN`: decoded output field.
- `TRUE`: decoded output field.
- `case 3`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Sound_key`: decoded output field.
- `Sound_ACK`: decoded output field.
- `Alarm`: status, trigger, alarm, or flag.
- `key5`: decoded output field.
- `key4`: decoded output field.
- `key3`: decoded output field.
- `key2`: decoded output field.
- `key1`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.

## PF52

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `PF52/PF52_Chirpstack_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | units, BatV, Mod, Int, Out, Data_Time, total_packages, subcontracting_count, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, Data_Times, Readings |
| `PF52/PF52_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. | units, Node_type, BatV, Mod, Int, Out, Data_Time, total_packages, subcontracting_count, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, Data_Times, Readings |

Field reference:
- `units`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Mod`: decoded output field.
- `Int`: decoded output field.
- `Out`: decoded output field.
- `Data_Time`: timestamp or decoded time.
- `total_packages`: counter or total count.
- `subcontracting_count`: counter or total count.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `SMODE`: decoded output field.
- `Data_Times`: timestamp or decoded time.
- `Readings`: decoded output field.
- `Node_type`: device model or sensor type.

## POM01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `POM01-LB/POM01-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, power_outage, low_voltage |

Field reference:
- `units`: decoded output field.
- `True`: decoded output field.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `power_outage`: decoded output field.
- `low_voltage`: decoded output field.

## PS-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `PS-LB/PS LB Chirpstack V4 decoder.txt` | 5 (0x05), 7 (0x07), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Node_type, Bat_V, DATALOG, High, True, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, Water_deep_cm, Water_pressure_MPa, Water_pressure_kPa, Differential_pressure_Pa |
| `PS-LB/PS LB_TTN_V1.1_Decoder.txt` | 5 (0x05), 7 (0x07), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Node_type, Bat_V, DATALOG, High, True, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, Water_deep_cm, Water_pressure_MPa, Water_pressure_kPa, Differential_pressure_Pa |
| `PS-LB/PS-LB_v1.2_decoder.txt` | 5 (0x05), 3 (0x03), 7 (0x07) | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Historical data, package data, or datalog payload. Event, status, or special-function payload. | High, True, case 5, case 3, case 7, default, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT, Node_type, DATALOG2, PNACKMD, Bat_V, DATALOG, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, IDC_Roc_flagL, IDC_Roc_flagH, ... (+5) |

Field reference:
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `Node_type`: device model or sensor type.
- `Bat_V`: decoded output field.
- `DATALOG`: decoded output field.
- `High`: decoded output field.
- `True`: decoded output field.
- `Probe_mod`: decoded output field.
- `IDC_intput_mA`: decoded output field.
- `VDC_intput_V`: decoded output field.
- `IN1_pin_level`: water level or state value.
- `IN2_pin_level`: water level or state value.
- `Exti_pin_level`: water level or state value.
- `Exti_status`: status, trigger, alarm, or flag.
- `Water_deep_cm`: water level or state value.
- `Water_pressure_MPa`: pressure or barometric pressure; water level or state value.
- `Water_pressure_kPa`: pressure or barometric pressure; water level or state value.
- `Differential_pressure_Pa`: pressure or barometric pressure.
- `case 5`: decoded output field.
- `case 3`: decoded output field.
- `case 7`: decoded output field.
- `default`: decoded output field.
- `DATALOG2`: decoded output field.
- `PNACKMD`: decoded output field.
- `IDC_Roc_flagL`: status, trigger, alarm, or flag.
- `IDC_Roc_flagH`: status, trigger, alarm, or flag.
- `VDC_Roc_flagL`: status, trigger, alarm, or flag.
- `VDC_Roc_flagH`: status, trigger, alarm, or flag.

## RS485-BL

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `RS485-BL/RS485-BL decodes when setting AT+EXT=1,1,1..txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, EXTI_Trigger, BatV, Payver, Node_type, TempC_SHT, Hum_SHT, Count, TempC2 |
| `RS485-BL/RS485-BL_Chirpstack_Decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, EXTI_Trigger, BatV, Payver, Node_type |
| `RS485-BL/RS485-BL_TTN_Decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, EXTI_Trigger, BatV, Payver, Node_type |

Field reference:
- `TRUE`: decoded output field.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `TDC_sec`: decoded output field.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `Payver`: decoded output field.
- `Node_type`: device model or sensor type.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `Count`: counter or total count.
- `TempC2`: temperature.

## RS485-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `RS485-LB/RS485-LB_chirpstack_decoder.txt` | 5 (0x05), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, EXTI_Trigger, BatV, Payver, Node_type |
| `RS485-LB/RS485-LB_ttn_decoder.txt` | 5 (0x05), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, EXTI_Trigger, BatV, Payver, Node_type |

Field reference:
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `TRUE`: decoded output field.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `Payver`: decoded output field.
- `Node_type`: device model or sensor type.

## RS485-LB_A16-15

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `RS485-LB_A16-15/RS485-LB_A16-15_TTN Decoder.txt` | 5 (0x05), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, EXTI_Trigger, BatV, Payver, distance, Node_type |

Field reference:
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `TRUE`: decoded output field.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `Payver`: decoded output field.
- `distance`: distance measurement.
- `Node_type`: device model or sensor type.

## RS485-LN

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `RS485-LN/RS485-LN_Chirpstack_Decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, EXTI_Trigger, Payver, Node_type |
| `RS485-LN/RS485-LN_TTN_Decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, TDC_sec, EXTI_Trigger, Payver, Node_type |

Field reference:
- `TRUE`: decoded output field.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `TDC_sec`: decoded output field.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Payver`: decoded output field.
- `Node_type`: device model or sensor type.

## S31-LB&S31B-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `S31-LB&S31B-LB/S31-LB_V1.3 _Chirpstack_V4_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, CLOSE, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX |
| `S31-LB&S31B-LB/S31-LB_V1.3_Chirpstack_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, CLOSE, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX |
| `S31-LB&S31B-LB/S31-LB_v1.3_TTN_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, CLOSE, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX |
| `S31-LB&S31B-LB/S31B-LBdecoder AWS.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | bytes), def getzf(c_num), def getMyDate(str), else, port), DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, EXTI_Trigger, Door_status, TempC_SHT31, Hum_SHT31, Data_time, SHTEMP_MIN, SHTEMP_MAX, SHHUM_MIN, SHHUM_MAX |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Door_status`: status, trigger, alarm, or flag.
- `TempC_SHT31`: temperature.
- `Hum_SHT31`: humidity.
- `Data_time`: timestamp or decoded time.
- `SHTEMP_MIN`: temperature.
- `SHTEMP_MAX`: temperature.
- `SHHUM_MIN`: humidity.
- `SHHUM_MAX`: humidity.
- `bytes)`: decoded output field.
- `def getzf(c_num)`: decoded output field.
- `def getMyDate(str)`: decoded output field.
- `else`: decoded output field.
- `port)`: decoded output field.

## SDI-12-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SDI-12-LB/SDI12_ChirpstackV4_decode.txt` | 5 (0x05), 100 (0x64), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, EXTI_Trigger, BatV, Payver, data_sum, Node_type |
| `SDI-12-LB/SDI12_TTN_decode.txt` | 5 (0x05), 100 (0x64), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, TRUE, EXTI_Trigger, BatV, Payver, Node_type, data_sum |

Field reference:
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `TRUE`: decoded output field.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `Payver`: decoded output field.
- `data_sum`: decoded output field.
- `Node_type`: device model or sensor type.

## SE01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SE01-LB/se01-lb_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, s_flag, i_flag, Mod |
| `SE01-LB/se01-lb_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, s_flag, i_flag, Mod |

Field reference:
- `units`: decoded output field.
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `temp_SOIL`: temperature.
- `water_SOIL`: water level or state value.
- `conduct_SOIL`: decoded output field.
- `Soil_dielectric_constant`: decoded output field.
- `Raw_water_SOIL`: water level or state value.
- `Raw_conduct_SOIL`: decoded output field.
- `s_flag`: status, trigger, alarm, or flag.
- `i_flag`: status, trigger, alarm, or flag.
- `Mod`: decoded output field.

## SE02-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SE02-LB/SE02V1.0-Chirpstack.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, temp_SOIL2, water_SOIL2, conduct_SOIL2, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, Soil_dielectric_constant2, Raw_water_SOIL2, Raw_conduct_SOIL2, s_flag, ... (+2) |
| `SE02-LB/SE02V1.0-TTN.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, temp_SOIL, water_SOIL, conduct_SOIL, temp_SOIL2, water_SOIL2, conduct_SOIL2, Soil_dielectric_constant, Raw_water_SOIL, Raw_conduct_SOIL, Soil_dielectric_constant2, Raw_water_SOIL2, Raw_conduct_SOIL2, s_flag, ... (+2) |

Field reference:
- `units`: decoded output field.
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `temp_SOIL`: temperature.
- `water_SOIL`: water level or state value.
- `conduct_SOIL`: decoded output field.
- `temp_SOIL2`: temperature.
- `water_SOIL2`: water level or state value.
- `conduct_SOIL2`: decoded output field.
- `Soil_dielectric_constant`: decoded output field.
- `Raw_water_SOIL`: water level or state value.
- `Raw_conduct_SOIL`: decoded output field.
- `Soil_dielectric_constant2`: decoded output field.
- `Raw_water_SOIL2`: water level or state value.
- `Raw_conduct_SOIL2`: decoded output field.
- `s_flag`: status, trigger, alarm, or flag.
- `i_flag`: status, trigger, alarm, or flag.
- `Mod`: decoded output field.

## SE0X-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SE0X-LB/SE0X-LB decoder.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | case 2, units, case 5, default, errors, Node_type, BatV, i_flag, Mod, s_flag, temp_DS18B20, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT |

Field reference:
- `case 2`: decoded output field.
- `units`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `Node_type`: device model or sensor type.
- `BatV`: battery voltage or battery level.
- `i_flag`: status, trigger, alarm, or flag.
- `Mod`: decoded output field.
- `s_flag`: status, trigger, alarm, or flag.
- `temp_DS18B20`: temperature.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.

## SN50_v3-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SN50_v3-LB/SN50_v3-LB_ChirpstackV4_decode.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | H, TRUE, CLOSE, ms, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Digital_IStatus, BatV, TempC1, ADC1_V, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC2_V, ADC3_V, TempC2, TempC3, ... (+17) |
| `SN50_v3-LB/SN50_v3-LB_TTN_decode.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | H, TRUE, CLOSE, ms, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Digital_IStatus, BatV, TempC1, ADC1_V, EXTI_Trigger, Door_status, Work_mode, Illum, TempC_SHT, Hum_SHT, Distance_cm, Distance_signal_strength, ADC2_V, ADC3_V, TempC2, TempC3, ... (+17) |

Field reference:
- `H`: decoded output field.
- `TRUE`: decoded output field.
- `CLOSE`: decoded output field.
- `ms`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `Digital_IStatus`: status, trigger, alarm, or flag.
- `BatV`: battery voltage or battery level.
- `TempC1`: temperature.
- `ADC1_V`: decoded output field.
- `EXTI_Trigger`: status, trigger, alarm, or flag.
- `Door_status`: status, trigger, alarm, or flag.
- `Work_mode`: decoded output field.
- `Illum`: decoded output field.
- `TempC_SHT`: temperature.
- `Hum_SHT`: humidity.
- `Distance_cm`: distance measurement.
- `Distance_signal_strength`: distance measurement.
- `ADC2_V`: decoded output field.
- `ADC3_V`: decoded output field.
- `TempC2`: temperature.
- `TempC3`: temperature.
- `Weight`: decoded output field.
- `Count`: counter or total count.
- `EXTI1_Trigger`: status, trigger, alarm, or flag.
- `EXTI1_Status`: status, trigger, alarm, or flag.
- `EXTI2_Trigger`: status, trigger, alarm, or flag.
- `EXTI2_Status`: status, trigger, alarm, or flag.
- `EXTI3_Trigger`: status, trigger, alarm, or flag.
- `EXTI3_Status`: status, trigger, alarm, or flag.
- `ADC2`: decoded output field.
- `ADC3`: decoded output field.
- `Count1`: counter or total count.
- `Count2`: counter or total count.
- `pwm_mode`: decoded output field.
- `Frequency`: frequency band or sub-band.
- `Dutycycle`: decoded output field.
- The remaining `2` fields are listed in the corresponding decoder return objects.

## SPH01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SPH01-LB/SPH01-LB  ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, TempC_DS18B20, PH1_SOIL, TEMP_SOIL, Interrupt_flag, Message_type, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `SPH01-LB/SPH01-LB  TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Node_type, Bat, TempC_DS18B20, PH1_SOIL, TEMP_SOIL, Interrupt_flag, Message_type, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `PH1_SOIL`: decoded output field.
- `TEMP_SOIL`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Message_type`: decoded output field.
- `DATALOG`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## SVC01-L

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SVC01-L/SVC01-L_TTN_Decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, RelayPB15, RelayPB10, RelayPA9, RelayPB7, Motor_out1, Motor_out2, Time |

Field reference:
- `units`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `RelayPB15`: decoded output field.
- `RelayPB10`: decoded output field.
- `RelayPA9`: decoded output field.
- `RelayPB7`: decoded output field.
- `Motor_out1`: decoded output field.
- `Motor_out2`: decoded output field.
- `Time`: timestamp or decoded time.

## SW3L

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SW3L/SW3L Decoder TTN.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | calibration, temperature, Node_type, DATALOG, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, MOD, Calculate_flag, Alarm, Water_flow_value, Last_pulse, Total_pulse, Data_time |
| `SW3L/SW3L-chirpstackV4-Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | TRUE, case 2, case 3, case 4, case 5, default, errors, MOD, Calculate_flag, Alarm, Node_type, Water_flow_value, Last_pulse, Total_pulse, Data_time, DATALOG, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT |
| `SW3L/sw3l_decoder_chirpstack.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | calibration, temperature, Node_type, DATALOG, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, MOD, Calculate_flag, Alarm, Water_flow_value, Last_pulse, Total_pulse, Data_time |

Field reference:
- `calibration`: decoded output field.
- `temperature`: temperature.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `TDC`: decoded output field.
- `Stop_Timer`: timestamp or decoded time.
- `Alarm_Timer`: timestamp or decoded time; status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `MOD`: decoded output field.
- `Calculate_flag`: status, trigger, alarm, or flag.
- `Alarm`: status, trigger, alarm, or flag.
- `Water_flow_value`: water level or state value.
- `Last_pulse`: decoded output field.
- `Total_pulse`: counter or total count.
- `Data_time`: timestamp or decoded time.
- `TRUE`: decoded output field.
- `case 2`: decoded output field.
- `case 3`: decoded output field.
- `case 4`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.

## SW3L-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `SW3L-LB/SW3L-LB-020_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | Node_type, DATALOG, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, MOD, Calculate_flag, Alarm, Water_flow_value, Last_pulse, Total_pulse, Data_time |
| `SW3L-LB/SW3L-LB_-020_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | Node_type, DATALOG, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, MOD, Calculate_flag, Alarm, Water_flow_value, Last_pulse, Total_pulse, Data_time |
| `SW3L-LB/SW3L-LB_ChirpstackV4_decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05) | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 3, True, case 4, case 5, default, H, DATALOG, PNACKMD, tdc, stop_timer, alarm_timer, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT, Node_type, MOD, PA4_Level, PB15_Level, Calculate_flag, Alarm, tdc_interval, Water_flow_value, Last_pulse, ... (+2) |
| `SW3L-LB/SW3L-LB_TTN_decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, Stop_Timer, Alarm_Timer, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, H, MOD, PA4_Level, PB15_Level, Calculate_flag, Alarm, tdc_interval, Water_flow_value, Last_pulse, Total_pulse, Data_time |

Field reference:
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `TDC`: decoded output field.
- `Stop_Timer`: timestamp or decoded time.
- `Alarm_Timer`: timestamp or decoded time; status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `MOD`: decoded output field.
- `Calculate_flag`: status, trigger, alarm, or flag.
- `Alarm`: status, trigger, alarm, or flag.
- `Water_flow_value`: water level or state value.
- `Last_pulse`: decoded output field.
- `Total_pulse`: counter or total count.
- `Data_time`: timestamp or decoded time.
- `case 3`: decoded output field.
- `True`: decoded output field.
- `case 4`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `H`: decoded output field.
- `PNACKMD`: decoded output field.
- `tdc`: decoded output field.
- `stop_timer`: timestamp or decoded time.
- `alarm_timer`: timestamp or decoded time; status, trigger, alarm, or flag.
- `PA4_Level`: water level or state value.
- `PB15_Level`: water level or state value.
- `tdc_interval`: decoded output field.

## T68DL

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `T68DL/T68DL_v1.0_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 2, True, case 3, case 5, default, errors, BatV, TempC, TEMPH_flag, TEMPL_flag, Data_time, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT |

Field reference:
- `case 2`: decoded output field.
- `True`: decoded output field.
- `case 3`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `BatV`: battery voltage or battery level.
- `TempC`: temperature.
- `TEMPH_flag`: temperature; status, trigger, alarm, or flag.
- `TEMPL_flag`: temperature; status, trigger, alarm, or flag.
- `Data_time`: timestamp or decoded time.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.

## TC01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `TC01-LB/TC01-LB_V1.0_ChirpstackV4_decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Type, TempC, Interrupt_flag, Interrupt_level, TEMPH_flag, TEMPL_flag, Data_time |
| `TC01-LB/TC01-LB_v1.0_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | High, True, TRUE, HIGH, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Type, TempC, Interrupt_flag, Interrupt_level, TEMPH_flag, TEMPL_flag, Data_time |

Field reference:
- `High`: decoded output field.
- `True`: decoded output field.
- `TRUE`: decoded output field.
- `HIGH`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `Type`: decoded output field.
- `TempC`: temperature.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Interrupt_level`: water level or state value.
- `TEMPH_flag`: temperature; status, trigger, alarm, or flag.
- `TEMPL_flag`: temperature; status, trigger, alarm, or flag.
- `Data_time`: timestamp or decoded time.

## TS01-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `TS01-LB/TS01-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, Node_type, Bat, TempC_DS18B20, Roll, Pitch, Instal_flag, Interrupt_flag, Alarm_flag, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |
| `TS01-LB/TS01-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, Node_type, Bat, TempC_DS18B20, Roll, Pitch, Instal_flag, Interrupt_flag, Alarm_flag, DATALOG, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT |

Field reference:
- `units`: decoded output field.
- `Node_type`: device model or sensor type.
- `Bat`: battery voltage or battery level.
- `TempC_DS18B20`: temperature.
- `Roll`: decoded output field.
- `Pitch`: decoded output field.
- `Instal_flag`: status, trigger, alarm, or flag.
- `Interrupt_flag`: status, trigger, alarm, or flag.
- `Alarm_flag`: status, trigger, alarm, or flag.
- `DATALOG`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.

## Thermostat1

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `Thermostat1/Thermostat1_v1.0_decoder.txt` | 2 (0x02), 5 (0x05), 1 (0x01), 3 (0x03), 4 (0x04), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A), 11 (0x0B), 12 (0x0C), 13 (0x0D), 14 (0x0E), 15 (0x0F), 16 (0x10), 17 (0x11), 18 (0x12), 19 (0x13), 20 (0x14), 21 (0x15), 22 (0x16), 23 (0x17), 24 (0x18), 25 (0x19), 26 (0x1A), 27 (0x1B), 28 (0x1C), 29 (0x1D), 30 (0x1E), 31 (0x1F), 32 (0x20), 33 (0x21), 34 (0x22), 35 (0x23), 36 (0x24), 37 (0x25), 38 (0x26), 39 (0x27), 40 (0x28), 41 (0x29), 42 (0x2A), 43 (0x2B), 44 (0x2C), 45 (0x2D) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. | case 1, case 2, case 3, case 4, case 5, case 6, case 7, case 8, case 9, case 10, case 11, case 12, case 13, case 14, case 15, case 16, case 17, case 18, case 19, case 20, case 21, case 22, case 23, case 24, case 25, ... (+35) |

Field reference:
- `case 1`: decoded output field.
- `case 2`: decoded output field.
- `case 3`: decoded output field.
- `case 4`: decoded output field.
- `case 5`: decoded output field.
- `case 6`: decoded output field.
- `case 7`: decoded output field.
- `case 8`: decoded output field.
- `case 9`: decoded output field.
- `case 10`: decoded output field.
- `case 11`: decoded output field.
- `case 12`: decoded output field.
- `case 13`: decoded output field.
- `case 14`: decoded output field.
- `case 15`: decoded output field.
- `case 16`: decoded output field.
- `case 17`: decoded output field.
- `case 18`: decoded output field.
- `case 19`: decoded output field.
- `case 20`: decoded output field.
- `case 21`: decoded output field.
- `case 22`: decoded output field.
- `case 23`: decoded output field.
- `case 24`: decoded output field.
- `case 25`: decoded output field.
- `case 26`: decoded output field.
- `case 27`: decoded output field.
- `case 28`: decoded output field.
- `case 29`: decoded output field.
- `case 30`: decoded output field.
- `case 31`: decoded output field.
- `case 32`: decoded output field.
- `case 33`: decoded output field.
- `case 34`: decoded output field.
- `case 35`: decoded output field.
- `case 36`: decoded output field.
- `case 37`: decoded output field.
- `case 38`: decoded output field.
- `case 39`: decoded output field.
- `case 40`: decoded output field.
- The remaining `20` fields are listed in the corresponding decoder return objects.

## TrackerD

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `TrackerD/TrackerD  1.5.4_TrackerD-LS1.0.5 Decoder.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 5 (0x05), 6 (0x06), 7 (0x07), 8 (0x08), 9 (0x09), 10 (0x0A) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Device information payload. | case 2, case 3, true, ON, MOVE, case 4, case 5, TrackerD, null, case 6, case 7, case 8, case 9, major, minor, rssi, case 10, errors, mac, default, latitude, longitude, speed, course, battery, ... (+21) |
| `TrackerD/TrackerD  Chirpstack V4 Decoder 1.4.5 .txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 5 (0x05), 6 (0x06), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, field, Location, Latitude, Longitude, Hum, Tem, BatV, ALARM_status, MD, LON, Time, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, BLE_MD, PNACKMD, Intwk, UUID, MAJOR, MINOR, RSSI, ... (+1) |
| `TrackerD/TrackerD  Chirpstack V4 Decoder 1.4.9 .txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 9 (0x09), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, field, Location, Latitude, Longitud, location_tago, Hum, Tem, BatV, ALARM_status, MD, Bg, Date, Time, LON, Transport, WIFISSID, RSSI, lon, BLE, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, ... (+8) |
| `TrackerD/TrackerD  Chirpstack V4 Decoder 1.5.1 .txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06), 10 (0x0A) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. | units, field, Location, Latitude, Longitud, location_tago, Hum, Tem, BatV, ALARM_status, MD, Bg, Date, Time, LON, Transport, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, BLE_MD, ... (+13) |
| `TrackerD/TrackerD Chirpstack Decoder 1.4.3.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Latitude, Longitud, Roll, Pitch, BatV, ALARM_status, function is, field, Location, Hum, Tem, MD, LON, Transport, Date, Time, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, ... (+7) |
| `TrackerD/TrackerD TTN Decoder 1.3.0.txt` | 2 (0x02), 3 (0x03), 5 (0x05), 10 (0x0A), 4 (0x04), 6 (0x06), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, Latitude, Longitud, Roll, Pitch, BatV, ALARM_status, function is, field, Location, Hum, Tem, MD, LON, UUID, ADDR, MAJOR, MINOR, RSSI, POWER, Dvice_Information1, Dvice_Information2, Dvice_Information3, SENSOR_MODEL, FIRMWARE_VERSION, ... (+2) |
| `TrackerD/TrackerD TTN Decoder 1.4.0.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 5 (0x05), 6 (0x06), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, Latitude, Longitud, Roll, Pitch, BatV, ALARM_status, function is, field, Time, Location, Hum, Tem, MD, LON, Date, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, BLE_MD, PNACKMD, Intwk, ... (+5) |
| `TrackerD/TrackerD TTN Decoder 1.4.1.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06), default / other ports | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, Latitude, Longitud, Roll, Pitch, BatV, ALARM_status, function is, field, Time, Location, Hum, Tem, MD, LON, Date, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, BLE_MD, ... (+6) |
| `TrackerD/TrackerD TTN Decoder 1.4.3.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, Latitude, Longitud, Roll, Pitch, BatV, ALARM_status, function is, field, Location, Longitude, Hum, Tem, MD, LON, Transport, Date, Time, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, ... (+8) |
| `TrackerD/TrackerD TTN Decoder 1.4.5.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | function is, units, field, Location, Latitude, Longitud, location_tago, Hum, Tem, BatV, ALARM_status, MD, Bg, Date, Time, LON, Transport, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, ... (+7) |
| `TrackerD/TrackerD TTN Decoder 1.4.9.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06), 9 (0x09) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | function is, units, field, Location, Latitude, Longitud, location_tago, Hum, Tem, BatV, ALARM_status, MD, Bg, Date, Time, LON, Transport, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, ... (+9) |
| `TrackerD/TrackerD TTN Decoder 1.5.1.txt` | 2 (0x02), 3 (0x03), 4 (0x04), 7 (0x07), 8 (0x08), 5 (0x05), 6 (0x06), 10 (0x0A) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Event, status, or special-function payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Device information payload. | function is, units, field, Location, Latitude, Longitude, location_tago, Hum, Tem, BatV, ALARM_status, MD, Bg, Date, Time, LON, Transport, WIFISSID, RSSI, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, SMODE, GPS_M0D, ... (+14) |

Field reference:
- `case 2`: decoded output field.
- `case 3`: decoded output field.
- `true`: decoded output field.
- `ON`: decoded output field.
- `MOVE`: decoded output field.
- `case 4`: decoded output field.
- `case 5`: decoded output field.
- `TrackerD`: decoded output field.
- `null`: decoded output field.
- `case 6`: decoded output field.
- `case 7`: decoded output field.
- `case 8`: decoded output field.
- `case 9`: decoded output field.
- `major`: decoded output field.
- `minor`: decoded output field.
- `rssi`: decoded output field.
- `case 10`: decoded output field.
- `errors`: decoded output field.
- `mac`: MAC address.
- `default`: decoded output field.
- `latitude`: decoded output field.
- `longitude`: decoded output field.
- `speed`: decoded output field.
- `course`: decoded output field.
- `battery`: battery voltage or battery level.
- `alarm`: status, trigger, alarm, or flag.
- `mode`: decoded output field.
- `led`: decoded output field.
- `movement`: decoded output field.
- `Node_type`: device model or sensor type.
- `humidity`: humidity.
- `temperature`: temperature.
- `timestamp`: timestamp or decoded time.
- `model`: device model or sensor type.
- `firmware`: firmware version.
- `band`: frequency band or sub-band.
- `subBand`: frequency band or sub-band.
- `sensorMode`: device model or sensor type.
- `motion`: decoded output field.
- `uuid`: decoded output field.
- The remaining `56` fields are listed in the corresponding decoder return objects.

## UV254-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `UV254-LB/ChirpStack_decoder.js` | 5 (0x05), 7 (0x07), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | warnings, errors, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Node_type, Bat_V, DATALOG, High, True, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, Absorbance |
| `UV254-LB/TTN_decoder.txt` | 5 (0x05), 7 (0x07), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Node_type, Bat_V, DATALOG, High, True, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, Absorbance |
| `UV254-LB/UV254-LB ChirpstackV4_decoder.txt` | 5 (0x05), 7 (0x07), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Node_type, Bat_V, DATALOG, High, True, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, Absorbance |
| `UV254-LB/UV254-LB TTN_decoder.txt` | 5 (0x05), 7 (0x07), default / other ports | Device information payload, usually firmware version, frequency band, sub-band, and battery information. Event, status, or special-function payload. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, Bat_V, DATALOG, High, True, Probe_mod, IDC_intput_mA, VDC_intput_V, IN1_pin_level, IN2_pin_level, Exti_pin_level, Exti_status, Absorbance, Node_type |

Field reference:
- `warnings`: decoded output field.
- `errors`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `Node_type`: device model or sensor type.
- `Bat_V`: decoded output field.
- `DATALOG`: decoded output field.
- `High`: decoded output field.
- `True`: decoded output field.
- `Probe_mod`: decoded output field.
- `IDC_intput_mA`: decoded output field.
- `VDC_intput_V`: decoded output field.
- `IN1_pin_level`: water level or state value.
- `IN2_pin_level`: water level or state value.
- `Exti_pin_level`: water level or state value.
- `Exti_status`: status, trigger, alarm, or flag.
- `Absorbance`: decoded output field.

## WL03A-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `WL03A-LB/WL03A-LB_ChirpstackV4_Decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, LEAK_ALARM_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, CMOD, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION, TIME |
| `WL03A-LB/WL03A-LB_TTN_Decoder.txt` | 3 (0x03), 4 (0x04), 5 (0x05), default / other ports | Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | True, Node_type, DATALOG, PNACKMD, TDC, DISALARM, KEEP_STATUS, KEEP_TIME, LEAK_ALARM_TIME, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, CMOD, ALARM, WATER_LEAK_STATUS, WATER_LEAK_TIMES, LAST_WATER_LEAK_DURATION, TIME |

Field reference:
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `TDC`: decoded output field.
- `DISALARM`: status, trigger, alarm, or flag.
- `KEEP_STATUS`: status, trigger, alarm, or flag.
- `KEEP_TIME`: timestamp or decoded time.
- `LEAK_ALARM_TIME`: timestamp or decoded time; status, trigger, alarm, or flag.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `CMOD`: decoded output field.
- `ALARM`: status, trigger, alarm, or flag.
- `WATER_LEAK_STATUS`: water level or state value; status, trigger, alarm, or flag.
- `WATER_LEAK_TIMES`: timestamp or decoded time; water level or state value.
- `LAST_WATER_LEAK_DURATION`: water level or state value.
- `TIME`: timestamp or decoded time.

## WQS-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `WQS-LB/WQS-LB_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, i_flag, turbidity, dissolved_oxygen, ORP, EC_K10, EC_K1, PH |
| `WQS-LB/WQS-LB_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, Node_type, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, i_flag, turbidity, dissolved_oxygen, ORP, EC_K10, EC_K1, PH |
| `WQS-LB/WQS-LB_V1.2_ChirpstackV4_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, i_flag, turbidity, dissolved_oxygen, do_temp, ORP, EC_K10, EC10_Temp, EC_K1, EC1_Temp, PH, PH_Temp |
| `WQS-LB/WQS-LB_V1.2_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, i_flag, turbidity, dissolved_oxygen, do_temp, ORP, EC_K10, EC10_Temp, EC_K1, EC1_Temp, PH, PH_Temp |
| `WQS-LB/WQS-LB_V1.3.1_ChirpstackV4_Decoeder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, i_flag, turbidity, dissolved_oxygen, do_temp, ORP, EC_K10, EC10_Temp, EC_K1, EC1_Temp, PH, PH_Temp, RC_2A, RC_10A, turbidity_200, ... (+6) |
| `WQS-LB/WQS-LB_V1.3.1_TTN_Decoder.txt` | 2 (0x02), 3 (0x03), 5 (0x05) | Regular sensor uplink payload. Historical data, package data, or datalog payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, True, DATALOG, PNACKMD, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, temp_DS18B20, i_flag, turbidity, dissolved_oxygen, do_temp, ORP, EC_K10, EC10_Temp, EC_K1, EC1_Temp, PH, PH_Temp, RC_2A, RC_10A, turbidity_200, ... (+6) |

Field reference:
- `units`: decoded output field.
- `True`: decoded output field.
- `Node_type`: device model or sensor type.
- `DATALOG`: decoded output field.
- `PNACKMD`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `temp_DS18B20`: temperature.
- `i_flag`: status, trigger, alarm, or flag.
- `turbidity`: decoded output field.
- `dissolved_oxygen`: decoded output field.
- `ORP`: decoded output field.
- `EC_K10`: decoded output field.
- `EC_K1`: decoded output field.
- `PH`: decoded output field.
- `do_temp`: temperature.
- `EC10_Temp`: temperature.
- `EC1_Temp`: temperature.
- `PH_Temp`: temperature.
- `RC_2A`: decoded output field.
- `RC_10A`: decoded output field.
- `turbidity_200`: decoded output field.
- `turbidity_200_Temp`: temperature.
- `turbidity_4000`: decoded output field.
- `turbidity_4000_Temp`: temperature.
- `Four_EC`: decoded output field.
- `Salinity`: decoded output field.
- `Four_EC_Temp`: temperature.

## WSC2-Compact-LS

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `WSC2-Compact-LS/WSC2-Compact-LS-V1.0.6_TTN_decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Payload_Ver, rain, temp_DS18B20, Temperature, Humidity, Pressure, illumination, i_flag, temp_SOIL, water_SOIL, conduct_SOIL, temp_SOIL2, water_SOIL2, conduct_SOIL2, wind_speed_max, wind_speed_average, WIND_SPEED, WIND_LEVEL, ... (+4) |
| `WSC2-Compact-LS/WSC2-Compact-LS.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Payload_Ver, rain, temp_DS18B20, Temperature, Humidity, Pressure, illumination, i_flag, temp_SOIL, water_SOIL, conduct_SOIL, temp_SOIL2, water_SOIL2, conduct_SOIL2, wind_speed_max, wind_speed_average, WIND_SPEED, WIND_LEVEL, ... (+2) |
| `WSC2-Compact-LS/WSC2-Compact-LS_ChirpstackV4_Decoder.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Payload_Ver, rain, temp_DS18B20, Temperature, Humidity, Pressure, illumination, i_flag, temp_SOIL, water_SOIL, conduct_SOIL, temp_SOIL2, water_SOIL2, conduct_SOIL2, wind_speed_max, wind_speed_average, WIND_SPEED, WIND_LEVEL, ... (+2) |

Field reference:
- `units`: decoded output field.
- `SENSOR_MODEL`: device model or sensor type.
- `FIRMWARE_VERSION`: firmware version.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `SUB_BAND`: frequency band or sub-band.
- `BAT`: battery voltage or battery level.
- `BatV`: battery voltage or battery level.
- `Payload_Ver`: decoded output field.
- `rain`: rainfall or rain/snow status.
- `temp_DS18B20`: temperature.
- `Temperature`: temperature.
- `Humidity`: humidity.
- `Pressure`: pressure or barometric pressure.
- `illumination`: illumination or light level.
- `i_flag`: status, trigger, alarm, or flag.
- `temp_SOIL`: temperature.
- `water_SOIL`: water level or state value.
- `conduct_SOIL`: decoded output field.
- `temp_SOIL2`: temperature.
- `water_SOIL2`: water level or state value.
- `conduct_SOIL2`: decoded output field.
- `wind_speed_max`: wind speed or wind direction.
- `wind_speed_average`: wind speed or wind direction.
- `WIND_SPEED`: wind speed or wind direction.
- `WIND_LEVEL`: wind speed or wind direction; water level or state value.
- `WIND_ANGLE`: wind speed or wind direction.
- `WIND_DIRECTION`: wind speed or wind direction.
- `TSR`: decoded output field.
- `PAR`: decoded output field.

## WSC2-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `WSC2-LB/WSC2-L_1.0.3.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | case 2, units, case 5, default, errors, BatV, Payload_Ver, rain, temp_DS18B20, WIND_SPEED, WIND_LEVEL, WIND_DIRECTION, WIND_ANGLE, Humidity, Temperature, NOISE, CO2, Pm2_5, Pm10, Pressure, illumination, s_flag, i_flag, Mod, A1, ... (+9) |
| `WSC2-LB/WSC2-L_1.1.2_TTN.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Payload_Ver, rain, temp_DS18B20, WIND_SPEED, wind_speed_max, wind_speed_average, WIND_LEVEL, WIND_DIRECTION, WIND_ANGLE, Humidity, Temperature, NOISE, CO2, Pm2_5, Pm10, Pressure, illumination, wind_speed_level, ... (+4) |
| `WSC2-LB/WSC2-L_1.1.5.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Payload_Ver, rain, temp_DS18B20, WIND_SPEED, wind_speed_max, wind_speed_average, WIND_LEVEL, WIND_DIRECTION, WIND_ANGLE, Humidity, Temperature, NOISE, CO2, Pm2_5, Pm10, Pressure, illumination, wind_speed_level, ... (+3) |
| `WSC2-LB/WSC2-L_co2.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 2, units, case 5, default, errors, BatV, Payload_Ver, rain, temp_DS18B20, WIND_SPEED, WIND_LEVEL, WIND_DIRECTION, WIND_ANGLE, Humidity, Temperature, NOISE, CO2, Pressure, illumination, s_flag, i_flag, Mod, A1, A2, A3, ... (+6) |
| `WSC2-LB/WSC2-L_pm2.5.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 2, units, case 5, default, errors, BatV, Payload_Ver, rain, temp_DS18B20, WIND_SPEED, WIND_LEVEL, WIND_DIRECTION, WIND_ANGLE, Humidity, Temperature, NOISE, Pm2_5, Pm10, Pressure, illumination, s_flag, i_flag, Mod, A1, A2, ... (+7) |
| `WSC2-LB/WSC2_1.1.5_ChirpstackV4_Decoder.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | units, SENSOR_MODEL, FIRMWARE_VERSION, FREQUENCY_BAND, SUB_BAND, BAT, BatV, Payload_Ver, rain, temp_DS18B20, WIND_SPEED, wind_speed_max, wind_speed_average, WIND_LEVEL, WIND_DIRECTION, WIND_ANGLE, Humidity, Temperature, NOISE, CO2, Pm2_5, Pm10, Pressure, illumination, wind_speed_level, ... (+3) |

Field reference:
- `case 2`: decoded output field.
- `units`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Payload_Ver`: decoded output field.
- `rain`: rainfall or rain/snow status.
- `temp_DS18B20`: temperature.
- `WIND_SPEED`: wind speed or wind direction.
- `WIND_LEVEL`: wind speed or wind direction; water level or state value.
- `WIND_DIRECTION`: wind speed or wind direction.
- `WIND_ANGLE`: wind speed or wind direction.
- `Humidity`: humidity.
- `Temperature`: temperature.
- `NOISE`: decoded output field.
- `CO2`: CO2 concentration.
- `Pm2_5`: particulate matter value.
- `Pm10`: particulate matter value.
- `Pressure`: pressure or barometric pressure.
- `illumination`: illumination or light level.
- `s_flag`: status, trigger, alarm, or flag.
- `i_flag`: status, trigger, alarm, or flag.
- `Mod`: decoded output field.
- `A1`: decoded output field.
- `A2`: decoded output field.
- `A3`: decoded output field.
- `A4`: decoded output field.
- `Node_type`: device model or sensor type.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.
- `wind_speed_max`: wind speed or wind direction.
- `wind_speed_average`: wind speed or wind direction.
- `wind_speed_level`: wind speed or wind direction; water level or state value.
- `wind_direction`: wind speed or wind direction.

## WSC3-LB

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `WSC3-LB/WSC3-LB.txt` | 2 (0x02), 5 (0x05) | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. | case 2, units, case 5, default, errors, BatV, Payload_Ver, rain, temp_DS18B20, Temperature, Humidity, Pressure, illumination, i_flag, Node_type, SENSOR_MODEL, SUB_BAND, FREQUENCY_BAND, FIRMWARE_VERSION, BAT |

Field reference:
- `case 2`: decoded output field.
- `units`: decoded output field.
- `case 5`: decoded output field.
- `default`: decoded output field.
- `errors`: decoded output field.
- `BatV`: battery voltage or battery level.
- `Payload_Ver`: decoded output field.
- `rain`: rainfall or rain/snow status.
- `temp_DS18B20`: temperature.
- `Temperature`: temperature.
- `Humidity`: humidity.
- `Pressure`: pressure or barometric pressure.
- `illumination`: illumination or light level.
- `i_flag`: status, trigger, alarm, or flag.
- `Node_type`: device model or sensor type.
- `SENSOR_MODEL`: device model or sensor type.
- `SUB_BAND`: frequency band or sub-band.
- `FREQUENCY_BAND`: frequency band or sub-band.
- `FIRMWARE_VERSION`: firmware version.
- `BAT`: battery voltage or battery level.

## Weather Station

| Decoder | fPort | Payload Structure | Output Fields |
|---|---:|---|---|
| `Weather Station/WSC1-L Decoder.txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | No fixed output fields were detected in returned objects; refer to array or string return logic in the decoder source. |
| `Weather Station/WSC1-L chirpstack decoder .txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | No fixed output fields were detected in returned objects; refer to array or string return logic in the decoder source. |
| `Weather Station/WSC1-L chirpstackV4  decoder  - .txt` | 2 (0x02), 5 (0x05), default / other ports | Regular sensor uplink payload. Device information payload, usually firmware version, frequency band, sub-band, and battery information. Business uplink not explicitly matched by a fPort branch; parsed by the decoder default branch. | No fixed output fields were detected in returned objects; refer to array or string return logic in the decoder source. |
