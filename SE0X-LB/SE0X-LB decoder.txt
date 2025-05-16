function decodeUplink(input) {
    var port = input.fPort;
	var bytes = input.bytes;
	var data = {};
	var mode=(bytes[6] & 0x7C)>>2;
	var decode = {};
	var value;
	var mod=(bytes[16]>>7)&0x01;

	
  switch (input.fPort) {
  case 2:
    var channel	  =["temp_SOIL1","water_SOIL1","conduct_SOIL1",
	                "temp_SOIL2","water_SOIL2","conduct_SOIL2",
	                "temp_SOIL3","water_SOIL3","conduct_SOIL3",
					"temp_SOIL4","water_SOIL4","conduct_SOIL4"];
	var raw	      =["Soil_dielectric_constant1","Raw_water_SOIL1","Raw_conduct_SOIL1",
	                "Soil_dielectric_constant2","Raw_water_SOIL2","Raw_conduct_SOIL2",
	                "Soil_dielectric_constant3","Raw_water_SOIL3","Raw_conduct_SOIL3",
					"Soil_dielectric_constant4","Raw_water_SOIL4","Raw_conduct_SOIL4"];	
    data.Node_type="SE0X-LB";					
	data.BatV=((bytes[0]<<8 | bytes[1]) & 0x3FFF)/1000;//Battery,units:V
	var mod=(bytes[4]>>7)&0x01;
	data.i_flag = (bytes[4]>>6)&0x01;
	data.Mod = mod;
	type= (bytes[4])&0x0F;	
	data.s_flag='';
    for(i=0;i<4;i++)	
	{
	  if(type>>(3-i)&0x01==1)
	  {
		 data.s_flag=data.s_flag+'1';   
	  }
      else	
	  {
		 data.s_flag=data.s_flag+'0';		  
	  }		  	
	}
	var value=bytes[2]<<8 | bytes[3];
	if(bytes[2] & 0x80)
	{value |= 0xFFFF0000;}
    data.temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature
  
    if(mod===0)
    {
     for(i=0,j=0,k=0;i<4;i++,j=j+6,k=k+3)
	 {	
       if(type>>(3-i)&0x01==1) 
	   {
         value=bytes[7+j]<<8 | bytes[8+j];
	     if((value & 0x8000)>>15 === 0)
	       data[channel[k]]=(value/100).toFixed(2);//temp_SOIL,temperature
	     else if((value & 0x8000)>>15 === 1)
   	       data[channel[k]]=((value-0xFFFF)/100).toFixed(2);

  	    data[channel[k+1]]=((bytes[5+j]<<8 | bytes[6+j])/100).toFixed(2);//water_SOIL,Humidity,units:%
        data[channel[k+2]]=bytes[9+j]<<8 | bytes[10+j];
	   }
	 }
    }
	else
	{ 
     for(i=0,j=0,k=0;i<4;i++,j=j+6,k=k+3)
	 {	
       if(type>>(3-i)&0x01==1) 
	   {
   	    data[raw[k]]=((bytes[5+j]<<8 | bytes[6+j])/10).toFixed(1);
  	    data[raw[k+1]]=bytes[7+j]<<8 | bytes[8+j];
        data[raw[k+2]]=bytes[9+j]<<8 | bytes[10+j]; 
	   }
	 }	 
	}
    return {
        data: data,
      }
  	break;
 
  case 5:
    { 
      if(bytes[0]==0xF9)
        data.SENSOR_MODEL= "SE0X-LB";
        
      if(bytes[4]==0xff)
        data.SUB_BAND="NULL";
      else
        data.SUB_BAND=bytes[4];
      
      if(bytes[3]==0x01)
        data.FREQUENCY_BAND="EU868";
      else if(bytes[3]==0x02)
        data.FREQUENCY_BAND="US915";
      else if(bytes[3]==0x03)
        data.FREQUENCY_BAND="IN865";
      else if(bytes[3]==0x04)
        data.FREQUENCY_BAND="AU915";
      else if(bytes[3]==0x05)
        data.FREQUENCY_BAND="KZ865";
      else if(bytes[3]==0x06)
        data.FREQUENCY_BAND="RU864";
      else if(bytes[3]==0x07)
        data.FREQUENCY_BAND="AS923";
      else if(bytes[3]==0x08)
        data.FREQUENCY_BAND="AS923_1";
      else if(bytes[3]==0x09)
        data.FREQUENCY_BAND="AS923_2";
      else if(bytes[3]==0x0A)
        data.FREQUENCY_BAND="AS923_3";
      else if(bytes[3]==0x0B)
        data.FREQUENCY_BAND="CN470";
      else if(bytes[3]==0x0C)
        data.FREQUENCY_BAND="EU433";
      else if(bytes[3]==0x0D)
        data.FREQUENCY_BAND="KR920";
      else if(bytes[3]==0x0E)
        data.FREQUENCY_BAND="MA869";
        
      data.FIRMWARE_VERSION= (bytes[1]&0x0f)+'.'+(bytes[2]>>4&0x0f)+'.'+(bytes[2]&0x0f);
      data.BAT= (bytes[5]<<8 | bytes[6])/1000;
    }
    return {
        data: data,
      }
    break;
  default:
      return {
        errors: ["unknown"]
      }
  }
      
  }
  