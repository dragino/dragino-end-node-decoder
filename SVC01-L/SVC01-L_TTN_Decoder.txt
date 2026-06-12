function Decoder(bytes, port) {
	var data = {};
	var decode = {}; 
   if(port==0x02)
   {
	decode.BatV=((bytes[0]<<8 | bytes[1]) & 0x3FFF)/1000;//Battery,units:V
	decode.RelayPB15=(bytes[2]>>3)&0x01;
	decode.RelayPB10=(bytes[2]>>2)&0x01;
	decode.RelayPA9=(bytes[2]>>1)&0x01;	
	decode.RelayPB7=(bytes[2])&0x01;
	
	decode.Motor_out1=(bytes[2]>>4)&0x01;
	decode.Motor_out2=(bytes[2]>>5)&0x01;
	
	decode.Time=bytes[3]+'/'+bytes[4]+'/'+bytes[5]+','+bytes[6]+':'+bytes[7]+':'+bytes[8];
	
	 return decode;
   }

else if(port==0x05)
  {
    var sub_band;
    var freq_band;
    var sensor;
    
    if(bytes[0]==0x4A)
       sensor= "SVC01-L";
      
    if(bytes[4]==0xff)
      sub_band="NULL";
    else
      sub_band=bytes[4];
    
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
      
    var firm_ver= (bytes[1]&0x0f)+'.'+(bytes[2]>>4&0x0f)+'.'+(bytes[2]&0x0f);
     bat= (bytes[5]<<8 | bytes[6])/1000;
    return {
    SENSOR_MODEL:sensor,
    FIRMWARE_VERSION:firm_ver,
    FREQUENCY_BAND:freq_band,
    SUB_BAND:sub_band,
    BAT:bat,
    };
  }
}