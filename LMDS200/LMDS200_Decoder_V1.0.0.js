function Decoder(bytes,port) {
  var bat;
  if(port == 2)
  {
    value = (bytes[0]<<8 | bytes[1]);
    bat = value/1000;
    value = (bytes[2]<<8 | bytes[3]);
    var dis1 = value;
    value = (bytes[4]<<8 | bytes[5]);
    var dis2 =value;
    var dalarm_count = (bytes[6]>>2)&0x3F;
    var distance_alarm = (bytes[6]>>1)&0x01;
    var inter_alarm = (bytes[6])&0x01;
    return {
	  Node_type:"LMDS200",
      Bat:bat,
      dis1:dis1,
      dis2:dis2,
      DALARM_count:dalarm_count,
      Distance_alarm:distance_alarm,
      Interrupt_alarm:inter_alarm
    };
  }
  else if(port == 5)
  {
    var model="";
    if(bytes[0]==0x0C)
      model="LMDS200";
    var version=(bytes[1]<<8 | bytes[2]).toString(16);
    version = parseInt(version,10);
    var fre_band="";
    switch(bytes[3])
    {
      case 0x01:fre_band="EU868";break;
      case 0x02:fre_band="US915";break;
      case 0x03:fre_band="IN865";break;
      case 0x04:fre_band="AU915";break;
      case 0x05:fre_band="KZ865";break;
      case 0x06:fre_band="RU864";break;
      case 0x07:fre_band="AS923";break;
      case 0x08:fre_band="AS923-1";break;
      case 0x09:fre_band="AS923-2";break;
      case 0x0a:fre_band="AS923-3";break;
      case 0x0b:fre_band="CN470";break;
      case 0x0c:fre_band="EU433";break;
      case 0x0d:fre_band="KR920";break;
      case 0x0e:fre_band="MA869";break;
    }
    var sub_band = bytes[4];
    bat = (bytes[5]<<8 | bytes[6])/1000;
    
    return {
      Sensor_model:model,
      Ver:version,
      Fre_band:fre_band,
      Sub_band:sub_band,
      Bat:bat
    };
  }
  else if(port == 4)
  {
    var tdc = (bytes[0]<<16 | bytes[1]<<8 | bytes[2]);
    var atdc = (bytes[3]);
    var alarm_min = (bytes[4]<<8 | bytes[5]);
    var alarm_max = (bytes[6]<<8 | bytes[7]);
    var input = (bytes[8]);
    return {
	  Node_type:"LMDS200",
      TDC:tdc,
      ATDC:atdc,
      Alarm_min:alarm_min,
      Alarm_max:alarm_max,
      Interrupt:input
    };
  }
}