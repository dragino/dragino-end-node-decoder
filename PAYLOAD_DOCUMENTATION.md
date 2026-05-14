# Dragino LoRaWAN 终端设备 Payload 结构说明

> 本文档描述了 Dragino 各 LoRaWAN 终端设备的上行 Payload 数据结构。
> 共 132 个产品

## 目录

### LHT (温湿度传感器)
- [LHT52](#lht52)
- [LHT65N](#lht65n)
- [LHT91](#lht91)

### LDS (距离传感器)
- [LDS12-LB](#lds12-lb)
- [LDS12-LoRa](#lds12-lora)
- [LDS3-LB](#lds3-lb)
- [LDS3-LoRa](#lds3-lora)

### LQ (水表)
- [LQ400](#lq400)
- [LQ600](#lq600)
- [LQ500](#lq500)

### LBT (BLE追踪器)
- [LBT65N](#lbt65n)

### LSN (传感器节点)
- [LSN50v2](#lsn50v2)

### LWC (环境传感器)
- [LWC01](#lwc01)
- [LWCN01](#lwcn01)

### LWP (环境传感器)
- [LWP1](#lwp1)

### LW (环境传感器)
- [LW001](#lw001)
- [LW002](#lw002)
- [LW002Z](#lw002z)

### DS (距离传感器)
- [DS20L](#ds20l)

### LGP (网关)
- [LGP-SE](#lgp-se)

---

## LHT52

**产品系列**: LHT (温湿度传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LHT52 实时数据 |
| 3 | 数据日志 | LHT52 数据日志 |
| 4 | 传感器ID | LHT52 传感器ID |
| 5 | 设备信息 | LHT52 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC_DS18B20` | float | DS18B20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `TempC_SHT` | float | SHT20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Hum_SHT` | float | SHT20湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Ext` | string | 外部传感器类型 | `bytes[i++] == 0 ? 'DS18B20' : 'SHT20'` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |
| `ID` | hex | 传感器ID | `str_pad(bytes[i].toString(16), 2, '0')` |

---

## LHT65N

**产品系列**: LHT (温湿度传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LHT65N 实时数据 |
| 3 | 数据日志 | LHT65N 数据日志 |
| 5 | 设备信息 | LHT65N 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC_SHT` | float | SHT20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Hum_SHT` | float | SHT20湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LHT91

**产品系列**: LHT (温湿度传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LHT91 实时数据 |
| 3 | 数据日志 | LHT91 数据日志 |
| 5 | 设备信息 | LHT91 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC_SHT` | float | SHT20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Hum_SHT` | float | SHT20湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LDS12-LB

**产品系列**: LDS (距离传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LDS12-LB 实时数据 |
| 3 | 数据日志 | LDS12-LB 数据日志 |
| 5 | 设备信息 | LDS12-LB 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `Distance_mm` | integer | 距离 (mm) | `bytes[i++]<<8 | bytes[i++]` |
| `Interrupt_count` | integer | 中断计数 | `bytes[i++]<<8 | bytes[i++]` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LQ400

**产品系列**: LQ (水表)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LQ400 实时数据 |
| 3 | 数据日志 | LQ400 数据日志 |
| 5 | 设备信息 | LQ400 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `Interrupt_count` | integer | 中断计数 | `bytes[i++]<<8 | bytes[i++]` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LBT65N

**产品系列**: LBT (BLE追踪器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LBT65N 实时数据 |
| 3 | 数据日志 | LBT65N 数据日志 |
| 4 | 传感器ID | LBT65N 传感器ID |
| 5 | 设备信息 | LBT65N 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC` | float | 温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Humidity` | float | 湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |
| `ID` | hex | 传感器ID | `str_pad(bytes[i].toString(16), 2, '0')` |

---

## LSN50v2

**产品系列**: LSN (传感器节点)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LSN50v2 实时数据 |
| 3 | 数据日志 | LSN50v2 数据日志 |
| 5 | 设备信息 | LSN50v2 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC_SHT` | float | SHT20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Hum_SHT` | float | SHT20湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LWC01

**产品系列**: LWC (环境传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LWC01 实时数据 |
| 3 | 数据日志 | LWC01 数据日志 |
| 5 | 设备信息 | LWC01 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC_SHT` | float | SHT20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Hum_SHT` | float | SHT20湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `ILL_lx` | integer | 光照强度 (lx) | `bytes[i++]<<8 | bytes[i++]` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LWP1

**产品系列**: LWP (环境传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LWP1 实时数据 |
| 3 | 数据日志 | LWP1 数据日志 |
| 5 | 设备信息 | LWP1 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC_SHT` | float | SHT20温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Hum_SHT` | float | SHT20湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `ILL_lx` | integer | 光照强度 (lx) | `bytes[i++]<<8 | bytes[i++]` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LW001

**产品系列**: LW (环境传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LW001 实时数据 |
| 3 | 数据日志 | LW001 数据日志 |
| 5 | 设备信息 | LW001 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `Interrupt_count` | integer | 中断计数 | `bytes[i++]<<8 | bytes[i++]` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## DS20L

**产品系列**: DS (距离传感器)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | DS20L 实时数据 |
| 3 | 数据日志 | DS20L 数据日志 |
| 5 | 设备信息 | DS20L 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `Distance_cm` | integer | 距离 (cm) | `bytes[i++]<<8 | bytes[i++]` |
| `Interrupt_count` | integer | 中断计数 | `bytes[i++]<<8 | bytes[i++]` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

## LGP-SE

**产品系列**: LGP (网关)

### 消息类型
| fPort | 消息类型 | 说明 |
|-------|---------|------|
| 2 | 实时数据 | LGP-SE 实时数据 |
| 3 | 数据日志 | LGP-SE 数据日志 |
| 5 | 设备信息 | LGP-SE 设备信息 |

### 数据字段
| 字段 | 类型 | 说明 | 原始表达式 |
|------|------|------|-----------|
| `Bat` | float | 电池电压 (V) | `bytes[i++]<<8 | bytes[i++]` |
| `TempC` | float | 温度 (℃) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Humidity` | float | 湿度 (%) | `(bytes[i++]<<8 | bytes[i++]) / 10` |
| `Systimestamp` | timestamp | 系统时间戳 | `getMyDate(bytes[i], bytes[i+1], bytes[i+2], bytes[i+3])` |

---

> 文档生成时间: 2026-05-14
> 源仓库: https://github.com/dragino/dragino-end-node-decoder
