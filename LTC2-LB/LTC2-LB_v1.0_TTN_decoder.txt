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

function Decoder(bytes, port) {
  //LTC2-LB Decode   
  if(port==0x02)
  {
    var decode = {};
    if(bytes.length !== 11)
      return { errors: ["FPort 2 requires 11 bytes"] };
    decode.BatV=(bytes[0]<<8 | bytes[1])/1000;
    decode.Interrupt_flag=(bytes[2] & 0x01)? "TRUE":"FALSE";
    decode.Interrupt_level=(bytes[2] & 0x02)? "HIGH":"LOW";      
    decode.TEMP1H_flag= (bytes[2] &0x10)? "True":"False";
    decode.TEMP1L_flag= (bytes[2] &0x20)? "True":"False";
    decode.TEMP2H_flag= (bytes[2] &0x04)? "True":"False";
    decode.TEMP2L_flag= (bytes[2] &0x08)? "True":"False";       
    var Temp_Channel1=parseFloat(((bytes[3]<<24>>16 | bytes[4])/10).toFixed(1)); 
    if (Temp_Channel1>2000 | Temp_Channel1<-2000)
    {
    decode.Temp_Channel1 = 0;
    }
   else
    {
    decode.Temp_Channel1 = Temp_Channel1;
    }
    var Temp_Channel2=parseFloat(((bytes[5]<<24>>16 | bytes[6])/10).toFixed(1)); 
    if (Temp_Channel2>2000 | Temp_Channel2<-2000)
    {
    decode.Temp_Channel2 = 0;
    }
   else
    {
    decode.Temp_Channel2 = Temp_Channel2;
    }
    decode.Data_time= getMyDate(ReadTimestamp(bytes, 7));         
    decode.Node_type="LTC2-LB";

    /* Temperature → Resistance: Add two new fields. */
    decode.Resistance_Channel1= Pt100ToResistance(decode.Temp_Channel1);
    decode.Resistance_Channel2= Pt100ToResistance(decode.Temp_Channel2);

    if(bytes.length==11)
      return decode;
  }
  else if(port==3)  
  {
    if(bytes.length === 0 || bytes.length % 11 !== 0)
      return { errors: ["FPort 3 requires complete 11-byte records"] };
    var pnack= ((bytes[6]>>7)&0x01) ? "True":"False";
    var res_list= [];//Resistance recording array
    for(var i=0;i<bytes.length;i=i+11)
    {
      var data= datalog(i,bytes);
      if(i=='0')
        data_sum=data;
      else
        data_sum+=data;
      /*Add one resistance data entry for each group.*/
      res_list.push({
        Resistance_Channel1: Pt100ToResistance((bytes[4+i]<<24>>16 | bytes[5+i])/10),
        Resistance_Channel2: Pt100ToResistance((bytes[2+i]<<24>>16 | bytes[3+i])/10)
      });
    }
    return{
	Node_type:"LTC2-LB",
    DATALOG:data_sum,
    Resistance_DATALOG:res_list,//Add resistance field
    PNACKMD:pnack,
    };    
  }
  else if(port==5)
  {
    if(bytes.length < 7)
      return { errors: ["FPort 5 requires at least 7 bytes"] };
  	var freq_band;
  	var sub_band;
    var sensor;
    
    if(bytes[0]==0x3D)
      sensor= "LTC2-LB";
      
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

    var bat= (bytes[5]<<8 | bytes[6])/1000;
    
  	return {
  	  SENSOR_MODEL:sensor,
      FIRMWARE_VERSION:firm_ver,
      FREQUENCY_BAND:freq_band,
      SUB_BAND:sub_band,
      BAT:bat,
  	}
  }
  else
  {
    return { errors: ["unknown FPort"] };
  }
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

function decodeUplink(input) {
  var r = Decoder(input.bytes, input.fPort);
  if (r && r.errors) return { errors: r.errors };
  return { data: r };
}
