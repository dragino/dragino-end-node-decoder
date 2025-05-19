function Datalog(bytes,num)
{
    var datalog_timestamp = "";
    var datalog_event = "";
    var datalog_relaystatus = "";
    var datalog_reply = "";
    
    datalog_timestamp |= bytes[num] << 24;
    datalog_timestamp |= bytes[1 + num] << 16;
    datalog_timestamp |= bytes[2 + num] << 8;
    datalog_timestamp |= bytes[3 + num] << 0;  

    var eventType = bytes[4 + num];
    switch (eventType) {
      case 0x03:
        datalog_event = "HEARTBEAT_EVNET";
        break;
      case 0x04:
        datalog_event = "RELAY_ACK_EVENT";
        break;
      default:
        datalog_event = "ERROR";
    }    

  
    datalog_relaystatus = bytes[5 +num] === 0x01 ? "OPEN": bytes[5 + num] === 0x00 ? "CLOSE" : "ERROR"; 
    
    if(bytes[6 +num] & 0x80)
    {
      datalog_reply = "NO_ACK_REPLY";
    }
    else if(bytes[6 +num] & 0x40)
    {
      datalog_reply = "POLL_REPLY";
    }

    return {
      Event:datalog_event,
      RelayStatus:datalog_relaystatus,
      Timestamp:datalog_timestamp,
      Datalog_Reply:datalog_reply,
    }; 
}

function Decoder(bytes,port) {

  
  if(port === 2)
  {
    var timestamp;
    var relaystatus;
    var loranode;
    var event;
    var eventType = bytes[4];
    
    switch (eventType) {
      case 0x03:
        event = "HEARTBEAT_EVNET";
        break;
      case 0x04:
        event = "RELAY_ACK_EVENT";
        break;
      default:
        event = "ERROR";
    }
  
  
    relaystatus = bytes[5] === 0x01 ? "OPEN": bytes[5] === 0x00 ? "CLOSE" : "ERROR";
  
  
    timestamp |= bytes[0] << 24;
    timestamp |= bytes[1] << 16;
    timestamp |= bytes[2] << 8;
    timestamp |= bytes[3] << 0;  

    loranode = "LC01";

    return {
      Event:event,
      RelayStatus:relaystatus,
      Timestamp:timestamp,
      LoraNode:loranode,
    };    
  }
  else if(port === 3)
  {
    var decode = {};
    var data = [];
    for(var i = 0;i < bytes.length;i = i+7)
    {
      data = data.concat(Datalog(bytes,i));
      
    }
    decode.DataLog = data;
    decode.LoraNode = "LC01";
    return decode;
  }
  else if(port === 5)
  {
      var freq_band;
    	var sub_band;
      var sensor;
      
      if(bytes[0]==0x47)
        sensor= "LC01";
        
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

