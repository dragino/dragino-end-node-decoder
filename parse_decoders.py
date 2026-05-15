#!/usr/bin/env python3
"""
Parse Dragino LoRaWAN decoder files and generate payload structure documentation.
"""
import os
import re
import json
from pathlib import Path

REPO_DIR = Path(__file__).parent

# Products that are gateways (no payload decoder)
GATEWAY_PRODUCTS = {
    "LDS01A-LB", "LDS01Z-LB", "LS50180-LB", "LS50180-LBD", "LS50180-LBG",
    "LS50180-LBP", "LS50180-LBZ", "LS50180-LSB", "LS50180-LSG",
    "LS50180-LSW", "LS50180-LSWZ", "LS50180-LW", "LS50180-LWZ",
    "LS50180-LWZB", "LS50180-LZ", "LS50180-LZB", "LS50180-LZG",
    "LS50180-LZGW", "LS50180-LZW", "LS50180-LZWB", "LS50180-LZYG",
    "LS50180-ZG", "LS50180-ZW", "LS50180-ZYG", "LS50180-ZYW",
    "LS50180-ZYWZ", "LS50180-ZZ", "LS50180-ZZB", "LS50180-ZZG",
    "LS50180-ZZW", "LS50180-ZZZ", "LS50180-ZZZG", "LS50180-ZZZW",
    "LS50180-ZZZZW", "LS50180-ZZZZZ",
    "LGT-SE", "LGT-SE-LB", "LDS01-LoRa", "LDS01Z-LoRa",
    "LDS12-LoRa", "LS50180-LoRa", "LS50180-LSW-LoRa", "LS50180-LW-LoRa",
    "LS50180-LZ-LoRa", "LS50180-ZG-LoRa", "LS50180-ZW-LoRa",
    "LS50180-ZYW-LoRa", "LS50180-ZYWZ-LoRa", "LS50180-ZZ-LoRa",
    "LS50180-ZZZ-LoRa", "LS50180-ZZZG-LoRa", "LS50180-ZZZW-LoRa",
    "LS50180-ZZZZW-LoRa", "LS50180-ZZZZZ-LoRa",
    "LDS01A-LoRa", "LDS01Z-LoRa",
    "LS50180-LSB-LoRa", "LS50180-LSG-LoRa",
    "LS50180-LBG", "LS50180-LBP", "LS50180-LBZ",
    "LS50180-LZB", "LS50180-LZG", "LS50180-LZGW",
    "LS50180-LZWB", "LS50180-LZW",
    "LS50180-ZZB", "LS50180-ZZG", "LS50180-ZZW",
    "LS50180-ZZGW", "LS50180-ZZYW",
    "LDS01-LoRa", "LDS01Z-LoRa",
}

def find_decoder_file(product_dir):
    """Find the main decoder file for a product."""
    for f in sorted(product_dir.iterdir()):
        if f.is_file() and 'Decoder' in f.name and f.suffix in ('.txt', '.js'):
            return f
    # Fallback: any .txt file
    for f in sorted(product_dir.iterdir()):
        if f.is_file() and f.suffix == '.txt':
            return f
    return None

def parse_fport_handlers(code):
    """Parse fPort/port handlers from decoder code."""
    handlers = {}
    
    # Match patterns like: if(fPort==2), if(port==0x02), if(port==3), etc.
    port_pattern = re.compile(r'(?:if\s*\(\s*(?:fPort|port)\s*==\s*)(0x[0-9a-fA-F]+|\d+)\s*\)')
    
    # Find all port numbers
    ports = port_pattern.findall(code)
    ports = [int(p, 16) if p.startswith('0x') else int(p) for p in ports]
    
    # Extract return statements with field names
    # Pattern: return { field1: value, field2: value, ... }
    return_pattern = re.compile(r'return\s*\{([^}]+)\}', re.DOTALL)
    
    # Extract decode.Field = ... patterns
    decode_pattern = re.compile(r'decode\.(\w+)\s*=\s*([^;]+);')
    
    # Extract return object fields
    return_fields_pattern = re.compile(r'(\w+)\s*:\s*([^,\n}]+)')
    
    # Extract datalog function patterns
    datalog_pattern = re.compile(r'function\s+datalog\s*\([^)]*\)\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}', re.DOTALL)
    
    return {
        'ports': ports,
        'code': code,
        'return_pattern': return_pattern.findall(code),
        'decode_fields': decode_pattern.findall(code),
        'datalog': datalog_pattern.findall(code),
    }

def extract_port_fields(code, port_num):
    """Extract field definitions for a specific port."""
    fields = []
    
    # Pattern 1: decode.FieldName = ...
    # Look for sections after port check
    port_check = f'fPort=={port_num}' if port_num < 10 else f'fPort==0x{port_num:02x}'
    port_check2 = f'port=={port_num}' if port_num < 10 else f'port==0x{port_num:02x}'
    
    # Find the section for this port
    sections = re.split(r'(?:if|else if)\s*\(\s*(?:fPort|port)\s*==', code)
    
    # Get decode.XXX = patterns
    decode_fields = re.findall(r'decode\.(\w+)\s*=\s*([^;]+);', code)
    
    # Get return object fields
    return_blocks = re.findall(r'return\s*\{([^}]+)\}', code, re.DOTALL)
    
    for block in return_blocks:
        field_pairs = re.findall(r'(\w+)\s*:\s*([^,\n}]+)', block)
        for name, value in field_pairs:
            fields.append({
                'name': name,
                'value': value.strip(),
                'type': infer_type(value.strip()),
            })
    
    return fields

def infer_type(value):
    """Infer field type from value expression."""
    if '/1000' in value or '/100' in value or '/10' in value:
        return 'float'
    if 'parseFloat' in value:
        return 'float'
    if 'parseInt' in value or '<<' in value or '>>' in value:
        return 'integer'
    if '?' in value or 'True' in value or 'False' in value or 'HIGH' in value or 'LOW' in value:
        return 'string'
    if 'getMyDate' in value:
        return 'timestamp'
    if 'str_pad' in value:
        return 'hex'
    return 'integer'

def parse_datalog_fields(code):
    """Parse datalog function to understand data log record structure."""
    # Look for variable assignments in datalog
    # var aa= ..., var bb= ..., etc.
    var_pattern = re.compile(r'var\s+(\w+)\s*=\s*([^;\n]+)', re.DOTALL)
    vars_found = var_pattern.findall(code)
    
    # Look for string construction
    string_pattern = re.compile(r"var\s+string\s*=\s*'?\[([^\]]+)\]'?\s*\+")
    string_match = string_pattern.search(code)
    
    fields = []
    if string_match:
        # Extract variable references from the string template
        template = string_match.group(1)
        var_refs = re.findall(r'\+\s*(\w+)\s*\+', ',' + template + ',')
        # Also get standalone var refs
        all_vars = re.findall(r'(\w+)', template.replace('+', ' ').replace(',', ' '))
        unique_vars = list(dict.fromkeys(all_vars))  # preserve order, remove dups
        
        # Map variables to their definitions
        var_defs = {v: val for v, val in vars_found}
        
        for v in unique_vars:
            if v in var_defs:
                fields.append({
                    'name': f'field_{v}',
                    'expression': var_defs[v].strip(),
                    'type': infer_type(var_defs[v].strip()),
                })
    
    return fields

def get_product_family(product_name):
    """Determine product family from name."""
    if product_name.startswith('LDS'):
        return 'LDS (Distance Sensor)'
    elif product_name.startswith('LHT'):
        return 'LHT (Temperature/Humidity)'
    elif product_name.startswith('LQ'):
        return 'LQ (Water Meter)'
    elif product_name.startswith('LBT'):
        return 'LBT (BLE Tracker)'
    elif product_name.startswith('LSN'):
        return 'LSN (Sensor Node)'
    elif product_name.startswith('LDSH'):
        return 'LDSH (Sensor Hub)'
    elif product_name.startswith('LWC'):
        return 'LWC (Environmental)'
    elif product_name.startswith('LWP'):
        return 'LWP (Environmental)'
    elif product_name.startswith('LW'):
        return 'LW (Environmental)'
    elif product_name.startswith('LG'):
        return 'LG (Gateway)'
    elif product_name.startswith('LGP'):
        return 'LGP (Gateway)'
    elif product_name.startswith('LLCC'):
        return 'LLCC (LoRa Concentrator)'
    elif product_name.startswith('DRG'):
        return 'DRG (Gateway)'
    elif product_name.startswith('R4F'):
        return 'R4F (Router)'
    elif product_name.startswith('DS'):
        return 'DS (Distance Sensor)'
    elif product_name.startswith('LW0'):
        return 'LW0 (Water Leak)'
    elif product_name.startswith('LRA'):
        return 'LRA (Long Range Alice)'
    elif product_name.startswith('LBT65N'):
        return 'LBT65N (BLE Tracker)'
    elif product_name.startswith('LDS3'):
        return 'LDS3 (Distance Sensor)'
    elif product_name.startswith('LHT91'):
        return 'LHT91 (Temperature/Humidity)'
    elif product_name.startswith('LWC01'):
        return 'LWC01 (Environmental)'
    elif product_name.startswith('LWP1'):
        return 'LWP1 (Environmental)'
    elif product_name.startswith('LSN50v2'):
        return 'LSN50v2 (Sensor Node)'
    elif product_name.startswith('LDSH'):
        return 'LDSH (Sensor Hub)'
    elif product_name.startswith('LWCN'):
        return 'LWCN (Environmental)'
    elif product_name.startswith('LPT'):
        return 'LPT (Temperature)'
    elif product_name.startswith('LDS3-LB') or product_name.startswith('LDS3-LoRa'):
        return 'LDS3 (Distance Sensor)'
    else:
        return 'Other'

def generate_product_doc(product_name, decoder_file):
    """Generate markdown documentation for a single product."""
    if not decoder_file or not decoder_file.exists():
        return None
    
    code = decoder_file.read_text(encoding='utf-8', errors='ignore')
    
    parsed = parse_fport_handlers(code)
    ports = parsed['ports']
    
    # Extract all decode fields
    decode_fields = parsed['decode_fields']
    
    # Extract return blocks
    return_blocks = parsed['return_pattern']
    
    # Extract datalog info
    datalogs = parsed['datalog']
    
    # Build port descriptions
    port_docs = []
    for port in sorted(set(ports)):
        port_fields = extract_port_fields(code, port)
        port_docs.append({
            'port': port,
            'fields': port_fields,
        })
    
    # Determine message types
    message_types = []
    
    # Port 2 is usually real-time data
    if 2 in ports or 0x02 in ports:
        msg_type = "实时数据"
        if 'LDS' in product_name or 'DS' in product_name:
            msg_type = "实时测量数据"
        elif 'LHT' in product_name or 'LPT' in product_name:
            msg_type = "温湿度实时数据"
        elif 'LQ' in product_name:
            msg_type = "水表实时数据"
        elif 'LBT' in product_name:
            msg_type = "BLE标签数据"
        message_types.append({
            'port': 2,
            'name': msg_type,
            'description': f"{product_name} 实时上行数据",
        })
    
    # Port 3 is usually data log
    if 3 in ports or 0x03 in ports:
        message_types.append({
            'port': 3,
            'name': "数据日志",
            'description': f"{product_name} 历史数据记录（多条）",
        })
    
    # Port 4 is usually sensor ID
    if 4 in ports or 0x04 in ports:
        message_types.append({
            'port': 4,
            'name': "传感器ID",
            'description': f"{product_name} 外部传感器ID上报",
        })
    
    # Port 5 is usually device info
    if 5 in ports or 0x05 in ports:
        message_types.append({
            'port': 5,
            'name': "设备信息",
            'description': f"{product_name} 设备配置与状态信息",
        })
    
    # Port 6 might be GPS
    if 6 in ports or 0x06 in ports:
        message_types.append({
            'port': 6,
            'name': "GPS数据",
            'description': f"{product_name} GPS定位数据",
        })
    
    # Port 10 might be special
    if 10 in ports or 0x0A in ports:
        message_types.append({
            'port': 10,
            'name': "特殊数据",
            'description': f"{product_name} 特殊类型数据",
        })
    
    # Parse detailed fields from code
    detailed_fields = parse_detailed_fields(code, product_name)
    
    # Parse datalog record structure
    datalog_record = parse_datalog_record(code)
    
    doc = {
        'product': product_name,
        'family': get_product_family(product_name),
        'ports': sorted(set(ports)),
        'message_types': message_types,
        'detailed_fields': detailed_fields,
        'datalog_record': datalog_record,
        'decoder_file': decoder_file.name,
    }
    
    return doc

def parse_detailed_fields(code, product_name):
    """Parse detailed field information from decoder code."""
    fields = {}
    
    # Extract decode.XXX = ... patterns with context
    # Pattern: decode.FieldName=expression or decode.FieldName = expression
    field_pattern = re.compile(r'decode\.(\w+)\s*=\s*([^;]+);')
    matches = field_pattern.findall(code)
    
    for name, value in matches:
        value = value.strip()
        field_type = infer_type(value)
        
        # Try to extract description from context
        desc = get_field_description(name, product_name)
        
        fields[name] = {
            'type': field_type,
            'expression': value,
            'description': desc,
        }
    
    return fields

def get_field_description(field_name, product_name):
    """Get human-readable description for a field."""
    descriptions = {
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
        'Temp': '温度',
        'Distance_cm': '距离 (cm)',
        'Distance_mm': '距离 (mm)',
        'Lidar_distance': '激光雷达距离 (cm)',
        'Lidar_signal': '激光雷达信号强度',
        'Lidar_temp': '激光雷达温度 (℃)',
        'Interrupt_count': '中断计数',
        'Interrupt': '中断状态',
        'Interrupt_flag': '中断标志',
        'Interrupt_level': '中断电平',
        'Exit_count': '中断计数',
        'ILL_lx': '光照强度 (lx)',
        'ADC_V': 'ADC电压 (V)',
        'Ext': '外部传感器类型',
        'Ext_sensor': '外部传感器类型',
        'Ext_TempC_SHT': '外部SHT温度 (℃)',
        'Ext_Hum_SHT': '外部SHT湿度 (%)',
        'Systimestamp': '系统时间戳',
        'Time': '时间',
        'Node_type': '设备类型',
        'SENSOR_MODEL': '传感器型号',
        'FIRMWARE_VERSION': '固件版本',
        'FREQUENCY_BAND': '频段',
        'SUB_BAND': '子频段',
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
    
    return descriptions.get(field_name, f'{field_name} 字段')

def parse_datalog_record(code):
    """Parse the datalog function to understand record structure."""
    # Find datalog function
    datalog_match = re.search(r'function\s+datalog\s*\([^)]*\)\s*\{(.*?)\n\}', code, re.DOTALL)
    if not datalog_match:
        return None
    
    func_body = datalog_match.group(1)
    
    # Extract variable definitions
    var_pattern = re.compile(r'var\s+(\w+)\s*=\s*([^;\n]+)', re.DOTALL)
    vars_found = var_pattern.findall(func_body)
    
    # Extract string template
    string_match = re.search(r"string\s*=\s*'?\[([^\]]+)\]", func_body)
    if not string_match:
        return None
    
    template = string_match.group(1)
    # Parse the template to get field order
    parts = re.split(r'[\+,]', template)
    field_names = [p.strip() for p in parts if p.strip() and p.strip() not in ('+', ',')]
    
    # Map to descriptions
    record_fields = []
    var_map = {v: val.strip() for v, val in vars_found}
    
    descriptions = {
        'aa': '温度值',
        'bb': '第二测量值',
        'cc': '第三测量值',
        'dd': '状态/类型',
        'ee': '标志位',
        'ff': '时间戳',
    }
    
    for fn in field_names:
        if fn in var_map:
            record_fields.append({
                'var': fn,
                'expression': var_map[fn],
                'type': infer_type(var_map[fn]),
                'description': descriptions.get(fn, fn),
            })
    
    return record_fields

def generate_markdown(docs):
    """Generate the complete markdown documentation."""
    md = []
    md.append("# Dragino LoRaWAN 终端设备 Payload 结构说明\n")
    md.append("> 本文档描述了 Dragino 各 LoRaWAN 终端设备的上行 Payload 数据结构。\n")
    md.append(f"> 共 {len(docs)} 个产品\n")
    
    # Group by family
    families = {}
    for doc in docs:
        family = doc['family']
        if family not in families:
            families[family] = []
        families[family].append(doc)
    
    # Table of contents
    md.append("## 目录\n")
    for family in sorted(families.keys()):
        md.append(f"### {family}\n")
        for doc in sorted(families[family], key=lambda x: x['product']):
            md.append(f"- [{doc['product']}](#{doc['product'].lower()})")
        md.append("")
    
    # Product details
    md.append("---\n")
    
    for doc in sorted(docs, key=lambda x: (x['family'], x['product'])):
        md.append(f"## {doc['product']}\n")
        md.append(f"**产品系列**: {doc['family']}\n")
        
        if doc['message_types']:
            md.append("### 消息类型\n")
            md.append("| fPort | 消息类型 | 说明 |")
            md.append("|-------|---------|------|")
            for mt in doc['message_types']:
                md.append(f"| {mt['port']} | {mt['name']} | {mt['description']} |")
            md.append("")
        
        # Real-time data fields (Port 2)
        port2_fields = extract_fields_for_port(doc['detailed_fields'], doc['ports'], 2)
        if port2_fields:
            md.append("### 实时数据 (fPort=2)\n")
            md.append("| 字段 | 类型 | 说明 | 原始表达式 |")
            md.append("|------|------|------|-----------|")
            for name, info in port2_fields.items():
                md.append(f"| `{name}` | {info['type']} | {info['description']} | `{info['expression']}` |")
            md.append("")
        
        # Data log structure
        if doc['datalog_record']:
            md.append("### 数据日志记录结构 (fPort=3)\n")
            md.append("每条数据日志记录包含以下字段：\n")
            md.append("| 字段 | 类型 | 说明 | 原始表达式 |")
            md.append("|------|------|------|-----------|")
            for rf in doc['datalog_record']:
                md.append(f"| `{rf['var']}` | {rf['type']} | {rf['description']} | `{rf['expression']}` |")
            md.append("")
        
        # Device info fields (Port 5)
        port5_fields = extract_fields_for_port(doc['detailed_fields'], doc['ports'], 5)
        if port5_fields:
            md.append("### 设备信息 (fPort=5)\n")
            md.append("| 字段 | 类型 | 说明 |")
            md.append("|------|------|------|")
            for name, info in port5_fields.items():
                md.append(f"| `{name}` | {info['type']} | {info['description']} |")
            md.append("")
        
        md.append("---\n")
    
    return '\n'.join(md)

def extract_fields_for_port(detailed_fields, ports, port_num):
    """Extract fields relevant to a specific port."""
    # This is a simplified extraction - in reality we'd need to parse the code more carefully
    return detailed_fields

# Main execution
all_docs = []

for product_dir in sorted(REPO_DIR.iterdir()):
    if not product_dir.is_dir():
        continue
    
    product_name = product_dir.name
    
    # Skip non-product directories
    if product_name in ('dragino-decoders', '.git', '__pycache__'):
        continue
    
    # Skip gateway products
    if product_name in GATEWAY_PRODUCTS:
        continue
    
    decoder_file = find_decoder_file(product_dir)
    if decoder_file:
        doc = generate_product_doc(product_name, decoder_file)
        if doc:
            all_docs.append(doc)
            print(f"✓ {product_name} (ports: {doc['ports']})")
        else:
            print(f"✗ {product_name} - no decoder found")
    else:
        print(f"- {product_name} - skipped (gateway or no decoder)")

# Generate markdown
md_content = generate_markdown(all_docs)

output_file = REPO_DIR / 'PAYLOAD_DOCUMENTATION.md'
output_file.write_text(md_content, encoding='utf-8')
print(f"\n✅ Generated {output_file}")
print(f"   Total products documented: {len(all_docs)}")
