#!/usr/bin/env python3
import os
import re
from pathlib import Path

REPO = Path('/root/.openclaw/workspace/dragino-decoders')

# Skip gateways
SKIP = {'dragino-decoders', '.git', '__pycache__'}

def find_decoder(d):
    for f in sorted(d.iterdir()):
        if f.is_file() and 'Decoder' in f.name and f.suffix == '.txt':
            return f
    return None

def parse_fields(code):
    """Extract decode.XXX = ... patterns"""
    fields = {}
    for m in re.finditer(r'decode\.(\w+)\s*=\s*([^;]+);', code):
        name, val = m.group(1), m.group(2).strip()
        # infer type
        if '/1000' in val or '/100' in val or '/10' in val or 'parseFloat' in val:
            t = 'float'
        elif 'getMyDate' in val:
            t = 'timestamp'
        elif '?' in val or 'True' in val or 'False' in val:
            t = 'string'
        else:
            t = 'integer'
        fields[name] = {'type': t, 'expr': val}
    return fields

def get_desc(name):
    descs = {
        'BatV': '电池电压 (V)',
        'Bat': '电池电压 (V)',
        'Bat_mV': '电池电压 (mV)',
        'Bat_status': '电池状态',
        'TempC_DS': 'DS18B20温度 (℃)',
        'TempC_DS18B20': 'DS18B20温度 (℃)',
        'TempC_SHT': 'SHT20温度 (℃)',
        'TempC_TMP117': 'TMP117温度 (℃)',
        'TempC': '温度 (℃)',
        'Hum_SHT': 'SHT20湿度 (%)',
        'Hum': '湿度 (%)',
        'Humidity': '湿度 (%)',
        'Distance_cm': '距离 (cm)',
        'Distance_mm': '距离 (mm)',
        'Lidar_distance': '激光雷达距离 (cm)',
        'Lidar_signal': '激光雷达信号强度',
        'Lidar_temp': '激光雷达温度 (℃)',
        'Interrupt_count': '中断计数',
        'ILL_lx': '光照强度 (lx)',
        'ADC_V': 'ADC电压 (V)',
        'Ext': '外部传感器类型',
        'Systimestamp': '系统时间戳',
        'ID': '传感器ID',
        'Sensor_Model': '传感器型号',
        'Firmware_Version': '固件版本',
        'Freq_Band': '频段',
        'Sub_Band': '子频段',
        'DS18B20_ID': 'DS18B20传感器ID',
        'Message_type': '消息类型',
        'DATALOG': '数据日志',
        'DATALOG_COUNT': '数据日志数量',
        'continuous_data': '连续温度数据',
        'Count': '温度数据数量',
        'Unit': '温度单位',
        'distance_state': '距离状态',
        'alarm': '报警状态',
        'MOD': '工作模式',
        'DO': '数字输出状态',
        'DO_Flag': 'DO标志',
        'Threshold_Flag_for_Alarm': '报警阈值标志',
        'Upper_limit': '上限阈值',
        'lower_limit': '下限阈值',
        'PNACKMD': 'PNACK模式',
        'Work_mode': '工作模式',
        'Exti_pin_level': '外部中断引脚电平',
        'Exti_status': '外部中断状态',
        'No_connect': '传感器连接状态',
        'sensor': '传感器类型',
        'bat': '电池电压',
        'Status': '状态',
        'SMODE': '传感器模式',
        'retransmission_Status': '重传状态',
    }
    return descs.get(name, name)

def get_ports(code):
    ports = set()
    for m in re.finditer(r'(?:fPort|port)\s*==\s*(0x[0-9a-fA-F]+|\d+)', code):
        p = m.group(1)
        ports.add(int(p, 16) if p.startswith('0x') else int(p))
    return sorted(ports)

def get_family(name):
    if name.startswith('LDS'): return 'LDS (距离传感器)'
    if name.startswith('LHT'): return 'LHT (温湿度)'
    if name.startswith('LQ'): return 'LQ (水表)'
    if name.startswith('LBT'): return 'LBT (BLE追踪器)'
    if name.startswith('LSN'): return 'LSN (传感器节点)'
    if name.startswith('LDSH'): return 'LDSH (传感器集线器)'
    if name.startswith('LWC'): return 'LWC (环境传感器)'
    if name.startswith('LWP'): return 'LWP (环境传感器)'
    if name.startswith('LW'): return 'LW (环境传感器)'
    if name.startswith('LG'): return 'LG (网关)'
    if name.startswith('LGP'): return 'LGP (网关)'
    if name.startswith('LLCC'): return 'LLCC (LoRa集中器)'
    if name.startswith('DRG'): return 'DRG (网关)'
    if name.startswith('R4F'): return 'R4F (路由器)'
    if name.startswith('DS'): return 'DS (距离传感器)'
    if name.startswith('LW0'): return 'LW0 (漏水检测)'
    if name.startswith('LRA'): return 'LRA (长距离Alice)'
    if name.startswith('LBT65N'): return 'LBT65N (BLE追踪器)'
    if name.startswith('LDS3'): return 'LDS3 (距离传感器)'
    if name.startswith('LHT91'): return 'LHT91 (温湿度)'
    if name.startswith('LWC01'): return 'LWC01 (环境传感器)'
    if name.startswith('LWP1'): return 'LWP1 (环境传感器)'
    if name.startswith('LSN50v2'): return 'LSN50v2 (传感器节点)'
    if name.startswith('LPT'): return 'LPT (温度)'
    return '其他'

def get_msg_type(port, name):
    types = {
        2: '实时数据',
        3: '数据日志',
        4: '传感器ID',
        5: '设备信息',
        6: 'GPS数据',
        10: '特殊数据',
    }
    return types.get(port, f'端口{port}数据')

# Build docs
docs = []
for d in sorted(REPO.iterdir()):
    if not d.is_dir() or d.name in SKIP:
        continue
    if d.name.startswith('.'):
        continue
    f = find_decoder(d)
    if not f:
        continue
    code = f.read_text(encoding='utf-8', errors='ignore')
    fields = parse_fields(code)
    ports = get_ports(code)
    docs.append({
        'name': d.name,
        'family': get_family(d.name),
        'ports': ports,
        'fields': fields,
        'file': f.name,
    })

# Generate markdown
md = []
md.append('# Dragino LoRaWAN 终端设备 Payload 结构说明\n')
md.append('> 本文档描述了 Dragino 各 LoRaWAN 终端设备的上行 Payload 数据结构。\n')
md.append(f'> 共 {len(docs)} 个产品\n')

# Group by family
families = {}
for doc in docs:
    fam = doc['family']
    if fam not in families:
        families[fam] = []
    families[fam].append(doc)

# TOC
md.append('## 目录\n')
for fam in sorted(families.keys()):
    md.append(f'### {fam}\n')
    for doc in sorted(families[fam], key=lambda x: x['name']):
        md.append(f'- [{doc["name"]}](#{doc["name"].lower()})')
    md.append('')

md.append('---\n')

# Product details
for doc in sorted(docs, key=lambda x: (x['family'], x['name'])):
    md.append(f'## {doc["name"]}\n')
    md.append(f'**产品系列**: {doc["family"]}\n')
    
    if doc['ports']:
        md.append('### 消息类型\n')
        md.append('| fPort | 消息类型 | 说明 |')
        md.append('|-------|---------|------|')
        for port in doc['ports']:
            msg_type = get_msg_type(port, doc['name'])
            md.append(f'| {port} | {msg_type} | {doc["name"]} {msg_type} |')
        md.append('')
    
    if doc['fields']:
        md.append('### 数据字段\n')
        md.append('| 字段 | 类型 | 说明 | 原始表达式 |')
        md.append('|------|------|------|-----------|')
        for name, info in doc['fields'].items():
            desc = get_desc(name)
            md.append(f'| `{name}` | {info["type"]} | {desc} | `{info["expr"]}` |')
        md.append('')
    
    md.append('---\n')

output = '\n'.join(md)
out_file = REPO / 'PAYLOAD_DOCUMENTATION.md'
out_file.write_text(output, encoding='utf-8')
print(f'Generated {out_file}')
print(f'Total products: {len(docs)}')
