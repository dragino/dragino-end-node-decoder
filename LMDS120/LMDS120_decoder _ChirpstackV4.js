function decodeUplink(input) {
        return { 
            data: Decode(input.fPort, input.bytes, input.variables)
        };   
}
function Decode(fPort, bytes, variables) {
  if(fPort == 2)
  {
	var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
	var batV=value/1000;//Battery,units:V
  
    var distance = 0;
	value=bytes[2]<<8 | bytes[3];
	if(value==0x3FFF)
		distance = "Invalid Reading";   
	else
		distance=(value);//distance,units:mm  
  
	var i_flag =(bytes[4])&0x01;  
	value=bytes[5]<<8 | bytes[6];
	if(bytes[5] & 0x80)
	{value |= 0xFFFF0000;}
	var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature
	var s_flag = (bytes[7])&0x01;
    return {
	   Node_type:"LMDS120",
       Bat:batV ,
	   TempC_DS18B20:temp_DS18B20,
       Distance:distance,
	   Sensor_flag:s_flag,
       Interrupt_flag:i_flag
    };
  }
  else if(fPort == 5)
  {
    var model="";
    if(bytes[5]==0x18)
      model="LMDS120";
    var version=(bytes[3]<<8 | bytes[4]).toString(16);
    version = parseInt(version,10);
    var fre_band="";
    switch(bytes[1])
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
      case 0x0b:fre_band="AS923-4";break;
    }
    var sub_band = bytes[2];
    
    return {
      Sensor_model:model,
      Ver:version,
      Fre_band:fre_band,
      Sub_band:sub_band,
    };
  }
}