function datalog(i,bytes){
  var aa=(bytes[0+i]<<8 | bytes[1+i]).toString(10)/10;
  var bb=((bytes[2+i]<<8 | bytes[3+i]).toString(10)/32768.0*180).toFixed(2);
  var cc=((bytes[4+i]<<8 | bytes[5+i]).toString(10)/32768.0*180).toFixed(2);
  var dd=(bytes[6+i]&0x01)?"OPEN":"CLOSE";   
  var ee=(bytes[6+i]&0x01)?"TRUE":"FLASE";   
  var ff= getMyDate((bytes[7+i]<<24 | bytes[8+i]<<16 | bytes[9+i]<<8 | bytes[10+i]).toString(10));
  var string='['+aa+','+bb+','+cc+','+dd+','+ee+','+ff+']'+',';  
  
  return string;
}

function getzf(c_num){ 
  if(parseInt(c_num) < 10)
    c_num = '0' + c_num; 

  return c_num; 
}

function getMyDate(str){ 
  var c_Date;
  if(str > 9999999999)
     c_Date = new Date(parseInt(str));
  else 
     c_Date = new Date(parseInt(str) * 1000);
  
  var c_Year = c_Date.getFullYear(), 
  c_Month = c_Date.getMonth()+1, 
  c_Day = c_Date.getDate(),
  c_Hour = c_Date.getHours(), 
  c_Min = c_Date.getMinutes(), 
  c_Sen = c_Date.getSeconds();
  var c_Time = c_Year +'-'+ getzf(c_Month) +'-'+ getzf(c_Day) +' '+ getzf(c_Hour) +':'+ getzf(c_Min) +':'+getzf(c_Sen); 
  
  return c_Time;
}

function Decoder(bytes,port) {
  if(port == 2)
  {
	var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
	var batV=value/1000;//Battery,units:V
  
	var i_flag =(bytes[2])&0x80;  
	var a_flag =(bytes[2])&0x01;
	
	value=bytes[3]<<8 | bytes[4];
	if(bytes[3] & 0x80)
	{value |= 0xFFFF0000;}
	var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature	
	
	value=bytes[5]<<8 | bytes[6];
	if(bytes[5] & 0x80)
	{value |= 0xFFFF0000;}	
    var Roll=(value/32768.0*180).toFixed(2);

	value=bytes[7]<<8 | bytes[8];
	if(bytes[7] & 0x80)
	{value |= 0xFFFF0000;}	
    var Pitch=(value/32768.0*180).toFixed(2);
	
	if(bytes[9]==0)
	{
     var in_flag = "Level"; 	
	}
	else
	{
         in_flag = "Vertical"; 			
	}
    return {
	   Node_type:"TS01-LB",
       Bat:batV ,
	   TempC_DS18B20:temp_DS18B20,
       Roll:Roll,
	   Pitch:Pitch,
	   Instal_flag:in_flag,
       Interrupt_flag:i_flag,
	   Alarm_flag:a_flag
    };
  }
  else if(port == 3)
  {
    for(var i=0;i<bytes.length;i=i+11)
    {
      var data= datalog(i,bytes);
      if(i=='0')
        data_sum=data;
      else
        data_sum+=data;
    }
    return{
	Node_type:"TS01-LB",
    DATALOG:data_sum,
    };
  }
  else if(port==0x05)
  {
    var sub_band;
    var freq_band;
    var sensor;
    
    if(bytes[0]==0x2F)
       sensor= "TS01-LB";
      
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
    else if(bytes[3]==0x0B)
      freq_band="CN470";
    else if(bytes[3]==0x0C)
      freq_band="EU433";
    else if(bytes[3]==0x0D)
      freq_band="KR920";
    else if(bytes[3]==0x0E)
      freq_band="MA869";
      
    var firm_ver= (bytes[1]&0x0f)+'.'+(bytes[2]>>4&0x0f)+'.'+(bytes[2]&0x0f);
    var bat= (bytes[5]<<8 | bytes[6])/1000;
    
    return {
    SENSOR_MODEL:sensor,
    FIRMWARE_VERSION:firm_ver,
    FREQUENCY_BAND:freq_band,
    SUB_BAND:sub_band,
    BAT:bat,
    };
  }
}