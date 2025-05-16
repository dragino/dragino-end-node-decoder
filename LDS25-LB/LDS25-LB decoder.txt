function decodeUplink(input) {
	var port = input.fPort;
	var bytes = input.bytes;
	var mode=(bytes[6] & 0x7C)>>2;
	var data = {};
function datalog(i,bytes){
  var aa= (bytes[2+i]<<8 | bytes[3+i])/10;
  var bb= bytes[4+i]<<8 | bytes[5+i];
  var cc= bytes[6+i]<<24>>24;    
  var dd= (bytes[0+i]&0x02) ? "High":"Low";
  var ee= (bytes[0+i]&0x01) ? "True":"False"; 
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
switch (input.fPort) {
case 2:
	data.batV= ((bytes[0]<<8 | bytes[1])&0x3FFF)/1000;
 
  
    data.temp_DS18B20=parseFloat(((bytes[2]<<24>>16| bytes[3])/10).toFixed(1));
    data.Distance_cm=(bytes[4]<<8 | bytes[5])/10;
    data.Distance_signal_strength=bytes[6]<<8 | bytes[7];
    data.Lidar_temp=bytes[9]<<24>>24;
    data.i_flag=(bytes[8] & 0x01)? "TRUE":"FALSE";
    data.i_level=(bytes[8] & 0x02)? "HIGH":"LOW";
    data.mes_type=bytes[10];
	data.Node_type="LDS25-LB";

	if(bytes.length==11)
return {
      data: data,
    }
	break;
case 3:
   var pnack= ((bytes[6]>>7)&0x01) ? "True":"False";
    for(var i=0;i<bytes.length;i=i+11)
    {
      var data1= datalog(i,bytes);
      if(i=='0')
        data_sum=data1;
      else
        data_sum+=data1;
    }
     
    data.DATALOG=data_sum;
    data.PNACKMD=pnack;
	data.Node_type="LDS25-LB";
    return {
      data: data,
    }
    
  break;
  
 case 6:
    data.Node_type="LDS25-LB";
    data.Wiper_workmode=bytes[0];
    data.Wiper_clean_times=bytes[1];
    data.Wiper_clean_interval=bytes[2]<<8 | bytes[3];
    data.Wiper_last_clean_time= getMyDate((bytes[4]<<24 | bytes[5]<<16 | bytes[6]<<8 | bytes[7]).toString(10)); 
    return {
      data: data,
    } 
 break;
 case 5:
 { 
    if(bytes[0]==0x3E)
      data.SENSOR_MODEL= "LDS25-LB";
      
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
      errors: ["unknown FPort"]
    }
}
}