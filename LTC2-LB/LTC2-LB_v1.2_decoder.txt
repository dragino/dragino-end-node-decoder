function decodeUplink(input) {
  var bytes = input.bytes;
	var data = {};

	function datalog2(i,bytes){
  var aa= parseFloat((bytes[2+i]<<24>>16 | bytes[2+i+1])/10.0).toFixed(1); 
  var bb= parseFloat((bytes[2+i+2]<<24>>16 | bytes[2+i+3])/10.0).toFixed(1); 
  var string='['+ aa +','+ bb+']'+',';  
  return string;
}

function datalog(i,bytes){
  var aa= parseFloat(((bytes[4+i]<<24>>16 | bytes[5+i])/10).toFixed(1)); 
  var bb= parseFloat(((bytes[2+i]<<24>>16 | bytes[3+i])/10).toFixed(1));
  var cc= (bytes[6+i]&0x02) ? "High":"Low";
  var dd= (bytes[6+i]&0x01) ? "True":"False";
  var ee= getMyDate(ReadTimestamp(bytes, 7 + i));
  var string='['+aa+','+bb+','+cc+','+dd+','+ee+']'+',';  
  
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

function ReadTimestamp(bytes, offset) {
  return (bytes[offset] * 0x1000000) +
         (bytes[offset + 1] << 16 | bytes[offset + 2] << 8 | bytes[offset + 3]);
}

// Pt100: resistance at 0 degrees Celsius is 100 ohms.
function Pt100ToResistance(temp) {
  var LTC_R0 = 100;
  var LTC_A = 3.9083e-3;
  var LTC_B = -5.775e-7;
  var LTC_C = -4.183e-12;
  // Outside the Pt100 conversion range, do not report a resistance.
  if (typeof temp !== 'number' || !(temp >= -200 && temp <= 850))
    return null;

  var t2 = temp * temp;
  var ratio = 1 + LTC_A * temp + LTC_B * t2;
  if (temp < 0)
    ratio += LTC_C * (temp - 100) * t2 * temp;

  return parseFloat((LTC_R0 * ratio).toFixed(3));
}

switch (input.fPort) {
case 2:
    if(bytes.length !== 11)
        return { errors: ["FPort 2 requires 11 bytes"] };
    data.BatV=(bytes[0]<<8 | bytes[1])/1000;
    data.Interrupt_flag=(bytes[2] & 0x01)? "TRUE":"FALSE";
    data.Interrupt_level=(bytes[2] & 0x02)? "HIGH":"LOW";      
    data.TEMP1H_flag= (bytes[2] &0x10)? "True":"False";
    data.TEMP1L_flag= (bytes[2] &0x20)? "True":"False";
    data.TEMP2H_flag= (bytes[2] &0x04)? "True":"False";
    data.TEMP2L_flag= (bytes[2] &0x08)? "True":"False";       
    var Temp_Channel1=parseFloat(((bytes[3]<<24>>16 | bytes[4])/10).toFixed(1)); 
    if (Temp_Channel1>2000 | Temp_Channel1<-2000)
    {
    data.Temp_Channel1 = 0;
    }
   else
    {
    data.Temp_Channel1 = Temp_Channel1;
    }
    var Temp_Channel2=parseFloat(((bytes[5]<<24>>16 | bytes[6])/10).toFixed(1)); 
    if (Temp_Channel2>2000 | Temp_Channel2<-2000)
    {
    data.Temp_Channel2 = 0;
    }
   else
    {
    data.Temp_Channel2 = Temp_Channel2;
    }
    data.Data_time= getMyDate(ReadTimestamp(bytes, 7));
    data.Node_type="LTC2-LB";
    /* Temperature → Resistance: Add two new fields. */   
    data.Resistance_Channel1= Pt100ToResistance(data.Temp_Channel1);
    data.Resistance_Channel2= Pt100ToResistance(data.Temp_Channel2);
	
 if(bytes.length==11)
  return {
      data: data,
    }
 break;
case 5:
  {
    if(bytes.length < 7)
      return { errors: ["FPort 5 requires at least 7 bytes"] };

    if(bytes[0]==0x3D)
      data.SENSOR_MODEL= "LTC2-LB";
      
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
case 3:
    if(bytes.length === 0 || bytes.length % 11 !== 0)
      return { errors: ["FPort 3 requires complete 11-byte records"] };
   var pnack= ((bytes[6]>>7)&0x01) ? "True":"False";
    var res_list= [];//Resistance recording array
    for(var i=0;i<bytes.length;i=i+11)
    {
      var data1= datalog(i,bytes);
      if(i=='0')
        data_sum=data1;
      else
        data_sum+=data1;
      /*Add one resistance data entry for each group.*/
      res_list.push({
        Resistance_Channel1: Pt100ToResistance((bytes[4+i]<<24>>16 | bytes[5+i])/10),
        Resistance_Channel2: Pt100ToResistance((bytes[2+i]<<24>>16 | bytes[3+i])/10)
      });
    }
    data.Node_type="LTC2-LB";
    data.DATALOG=data_sum;
    data.Resistance_DATALOG=res_list;//Add resistance field
    data.PNACKMD=pnack;
    return {
      data: data,
    }
    
  break;
case 7:
  if(bytes.length < 6 || (bytes.length - 2) % 4 !== 0)
    return { errors: ["FPort 7 requires 2 battery bytes and complete 4-byte records"] };
  var Bat= (bytes[0]<<8 | bytes[1])/1000;
    res_list= [];//Resistance recording array
    for(var j=0;j<bytes.length-2;j=j+4)
    {
      data1= datalog2(j,bytes);
      if(j=='0')
        data_sum=data1;
      else
        data_sum+=data1;
      /*Add one resistance data entry for each group.*/
      res_list.push({
        Resistance_Channel1: Pt100ToResistance((bytes[2+j]<<24>>16 | bytes[3+j])/10),
        Resistance_Channel2: Pt100ToResistance((bytes[2+j+2]<<24>>16 | bytes[2+j+3])/10)
      });
    }
	data.Node_type="LTC2-LB";
    data.DATALOG=data_sum;
    data.Resistance_DATALOG=res_list;//Add resistance field
    data.Bat=Bat;
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
