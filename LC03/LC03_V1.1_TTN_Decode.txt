function Datalog(bytes,num)
{
    var datalog_timestamp = "";
    var datalog_event = "";
    var datalog_plugstatus = "";
    var datalog_relaystatus = "";
    var datalog_reply = "";
    
    datalog_timestamp |= bytes[num] << 24;
    datalog_timestamp |= bytes[1 + num] << 16;
    datalog_timestamp |= bytes[2 + num] << 8;
    datalog_timestamp |= bytes[3 + num] << 0;  

    var eventType = bytes[4 + num];
    switch (eventType) {
      case 0x01:
        datalog_event = "PLUG_INSERT_EVENT";
        break;
      case 0x02:
        datalog_event = "PLUG_PULL_EVNET";
        break;      
      case 0x03:
        datalog_event = "HEARTBEAT_EVNET";
        break;
      case 0x04:
        datalog_event = "RELAY_ACK_EVENT";
        break;
      default:
        datalog_event = "ERROR";
    }    
     // 解析插头状态
    datalog_plugstatus = bytes[5 + num] === 0x01 ? "INSERT" : bytes[5 + num] === 0x00 ? "PULL_OUT" : "ERROR";
  
    // 解析继电器状态（假设 0x00=关闭，0x01=开启）
    datalog_relaystatus = bytes[6 +num] === 0x01 ? "OPEN": bytes[6 + num] === 0x00 ? "CLOSE" : "ERROR"; 
    
    if(bytes[7 +num] & 0x80)
    {
      datalog_reply = "NO_ACK_REPLY";
    }
    else if(bytes[7 +num] & 0x40)
    {
      datalog_reply = "POLL_REPLY";
    }

    // 返回结构化结果
    return {
	  Node_type:"LC03",
      Event:datalog_event,
      PlugStatus:datalog_plugstatus,
      RelayStatus:datalog_relaystatus,
      Timestamp:datalog_timestamp,
      DatalogReply:datalog_reply,
    }; 
}

function Decoder(bytes,port) {

  
  if(port === 2)
  {
    // 解析事件类型
    var timestamp;
    var relaystatus;
    var plugstatus;
    var loranode;
    var event;
    var eventType = bytes[4];
    
    switch (eventType) {
      case 0x01:
        event = "PLUG_INSERT_EVENT";
        break;
      case 0x02:
        event = "PLUG_PULL_EVNET";
        break;      
      case 0x03:
        event = "HEARTBEAT_EVNET";
        break;
      case 0x04:
        event = "RELAY_ACK_EVENT";
        break;
      default:
        event = "ERROR";
    }
  
    // 解析插头状态
    plugstatus = bytes[5] === 0x01 ? "INSERT" : bytes[5] === 0x00 ? "PULL_OUT" : "ERROR";
  
    // 解析继电器状态（假设 0x00=关闭，0x01=开启）
    relaystatus = bytes[6] === 0x01 ? "OPEN": bytes[6] === 0x00 ? "CLOSE" : "ERROR";
  
  
    timestamp |= bytes[0] << 24;
    timestamp |= bytes[1] << 16;
    timestamp |= bytes[2] << 8;
    timestamp |= bytes[3] << 0;  

    loranode = "LC03";
    // 返回结构化结果
    return {
	  Node_type:"LC03",
      Event:event,
      PlugStatus:plugstatus,
      RelayStatus:relaystatus,
      Timestamp:timestamp,
    };    
  }
  else if(port === 3)
  {
    var decode = {};
    var data = [];
    for(var i = 0;i < bytes.length;i = i+8)
    {
      data = data.concat(Datalog(bytes,0));
      
    }
	decode.Node_type="LC03";
    decode.DataLog = data;
    decode.LoraNode = "LC03";
    return decode;
  }
  else if(port === 5)
  {
        var freq_band;
    	var sub_band;
      var sensor;
      
      if(bytes[0]==0x46)
        sensor= "LC03";
        
  	  var firm_ver= (bytes[1]&0x0f)+'.'+(bytes[2]>>4&0x0f)+'.'+(bytes[2]&0x0f);
  	  
      if(bytes[3]==0x01)
          freq_band="EU868";
    	else if(bytes[3]==0x02)
          freq_band="US915";
    	else if(bytes[3]==0x03)
          freq_band="IN865";
    	else if(bytes[3]==0x04)
          freq_band="AU915";
    	else if(bytes[3]==0x05)
          freq_band="KZ865";
    	else if(bytes[3]==0x06)
          freq_band="RU864";
    	else if(bytes[3]==0x07)
          freq_band="AS923";
    	else if(bytes[3]==0x08)
          freq_band="AS923_1";
    	else if(bytes[3]==0x09)
          freq_band="AS923_2";
    	else if(bytes[3]==0x0A)
          freq_band="AS923_3";
    	else if(bytes[3]==0x0F)
          freq_band="AS923_4";
    	else if(bytes[3]==0x0B)
          freq_band="CN470";
    	else if(bytes[3]==0x0C)
          freq_band="EU433";
    	else if(bytes[3]==0x0D)
          freq_band="KR920";
    	else if(bytes[3]==0x0E)
          freq_band="MA869";
    	
      if(bytes[4]==0xff)
        sub_band="NULL";
  	  else
        sub_band=bytes[4];
      
    	return {
    	  SENSOR_MODEL:sensor,
        FIRMWARE_VERSION:firm_ver,
        FREQUENCY_BAND:freq_band,
        SUB_BAND:sub_band,
    	};  
  }
  
}

