// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}
function datalog(i,bytes){
  var aa=(bytes[0+i]&0x02)?"TRUE":"FALSE";
  var bb=(bytes[0+i]&0xFC)>>2;
  var cc= bytes[1+i];
  var dd=(bytes[3+i]<<24 | bytes[4+i]<<16 | bytes[5+i]<<8 |bytes[6+i])>>>0;
  var ee;
 
  if(bb==0x02)
     ee= (dd/64).toFixed(1);
  else if(bb==0x01)
    ee= (dd/390).toFixed(1);
  else
    ee= (dd/450).toFixed(1);
    
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
 
function Decode(fPort, bytes, variables) {
  if(fPort==0x02)
  {
    var flag=(bytes[0]&0xFC)>>2;
    var decode = {};
    
    decode.MOD=bytes[5];
    decode.Calculate_flag=flag;
    decode.Alarm=(bytes[0]&0x02)?"TRUE":"FALSE";
    
    if(flag==3)
      decode.Water_flow_value=parseFloat((((bytes[1]<<24 | bytes[2]<<16 | bytes[3]<<8 | bytes[4])>>>0)/12).toFixed(1));
    if(flag==2)
      decode.Water_flow_value=parseFloat((((bytes[1]<<24 | bytes[2]<<16 | bytes[3]<<8 | bytes[4])>>>0)/64).toFixed(1));
    else if(flag==1)
      decode.Water_flow_value=parseFloat((((bytes[1]<<24 | bytes[2]<<16 | bytes[3]<<8 | bytes[4])>>>0)/390).toFixed(1));
    else
      decode.Water_flow_value=parseFloat((((bytes[1]<<24 | bytes[2]<<16 | bytes[3]<<8 | bytes[4])>>>0)/450).toFixed(1));
      
    if(bytes[5]==0x01)
      decode.Last_pulse=((bytes[1]<<24 | bytes[2]<<16 | bytes[3]<<8 | bytes[4])>>>0);
    else
      decode.Total_pulse=((bytes[1]<<24 | bytes[2]<<16 | bytes[3]<<8 | bytes[4])>>>0);
      
    decode.Data_time= getMyDate((bytes[7]<<24 | bytes[8]<<16 | bytes[9]<<8 | bytes[10]).toString(10));
    decode.Node_type="SW3L";
    if(bytes.length==11)
    {
      return decode;
    }
  }
  else if(fPort==0x03)
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
	Node_type:"SW3L",
    DATALOG:data_sum
    };
  }
  else if(fPort==0x04)
  {
    var tdc= bytes[0]<<16 | bytes[1]<<8 | bytes[2];
    var stop_timer= bytes[4];
    var alarm_timer= bytes[5]<<8 | bytes[6];
    
    return {
    TDC:tdc,
    Stop_Timer:stop_timer,
    Alarm_Timer:alarm_timer,
    };
  }
  else if(fPort==0x05)
  {
    var sub_band;
    var freq_band;
    var sensor;
    
    if(bytes[0]==0x11)
       sensor= "SW3L";
      
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
