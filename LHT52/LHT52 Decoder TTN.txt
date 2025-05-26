function decodeUplink(input) {
        return { 
            data: Decode(input.fPort, input.bytes, input.variables)
        };   
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
function datalog(i,bytes){
  var aa= parseFloat(((bytes[i]<<8 | bytes[1+i])/100).toFixed(2));
  var bb= parseFloat(((bytes[2+i]<<8 | bytes[3+i])/100).toFixed(2));
  var cc= parseFloat(((bytes[4+i]<<8 | bytes[5+i])/10).toFixed(1)); 
  var dd= bytes[6];
  var ee= getMyDate((bytes[7+i]<<24 | bytes[8+i]<<16 | bytes[9+i]<<8 | bytes[10+i]).toString(10));
  var string='['+aa+','+bb+','+cc+','+dd+','+ee+']'+',';  
  
  return string;
}
function Decode(fPort, bytes, variables) {

var decode = {};
if(fPort==2)
{
  if(bytes.length==11)
  {
    decode.TempC_SHT=parseFloat(((bytes[0]<<24>>16 | bytes[1])/100).toFixed(2));
    decode.Hum_SHT=parseFloat(((bytes[2]<<24>>16 | bytes[3])/10).toFixed(1));
    decode.TempC_DS=parseFloat(((bytes[4]<<24>>16 | bytes[5])/100).toFixed(2));

    decode.Ext=bytes[6];
    decode.Systimestamp=(bytes[7]<<24 | bytes[8]<<16 | bytes[9]<<8 | bytes[10] );
    decode.Node_type="LHT52";
    return decode;
  }
  else
  {
    decode.Status="RPL data or sensor reset";
    decode.Node_type="LHT52";
    return decode;
  }
}

if(fPort==3)
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
	  Node_type:"LHT52",
    DATALOG:data_sum,

    };    
  }  
if(fPort==4)
{
  decode.DS18B20_ID=str_pad(bytes[0])+str_pad(bytes[1])+str_pad(bytes[2])+str_pad(bytes[3])+str_pad(bytes[4])+str_pad(bytes[5])+str_pad(bytes[6])+str_pad(bytes[7]);
  decode.Node_type="LHT52";
  return decode;
}

if(fPort==5)
{
  decode.Sensor_Model=bytes[0];
  decode.Firmware_Version=str_pad((bytes[1]<<8)|bytes[2]);
  decode.Freq_Band=bytes[3];
  decode.Sub_Band=bytes[4];
  decode.Bat_mV=bytes[5]<<8|bytes[6];
  decode.Node_type="LHT52";
  return decode;
}
}