function decodeUplink(input) {
        return { 
            data: Decode(input.fPort, input.bytes, input.variables)
        };   
}

function datalog(i,bytes){
  var aa= parseFloat((bytes[i]<<24>>16 | bytes[i+1])/1000).toFixed(3); 
  var bb= parseFloat((bytes[i+2]<<24>>16 | bytes[i+3])/1000).toFixed(3); 
  var cc= parseFloat((bytes[i+4]<<24>>16 | bytes[i+5])/1000).toFixed(3); 
  var string='[('+ aa +'),'+'('+ bb +'),' +'('+ cc +')]'+',';  
  return string;
}

function Decode(fPort, bytes, variables) {

  var decode = {};
  if(fPort==0x02)
  {
    decode.BatV=(bytes[0]<<8 | bytes[1])/1000;
    var mod=(bytes[2]>>2)&0x07;
	decode.Node_type="LHT65N-VIB";
    if(mod==1)
    {
      decode.vib_count=(bytes[3]<<8 | bytes[4]<<8 | bytes[5]<<8 | bytes[6])>>>0;
      decode.work_min=(bytes[7]<<8 | bytes[8]<<8 | bytes[9]<<8 | bytes[10])>>>0;
    }
    else if(mod==2)
    {
      decode.vib_count=(bytes[3]<<8 | bytes[4]<<8 | bytes[5]<<8 | bytes[6])>>>0;    
      decode.TempC_SHT=parseFloat(((bytes[7]<<24>>16 | bytes[8])/100).toFixed(2));
      decode.Hum_SHT=parseFloat((((bytes[9]<<8 | bytes[10])&0xFFF)/10).toFixed(1));
    }
    else if(mod==3)
    {
      decode.TempC_SHT=parseFloat(((bytes[3]<<24>>16 | bytes[4])/100).toFixed(2));
      decode.Hum_SHT=parseFloat((((bytes[5]<<8 | bytes[6])&0xFFF)/10).toFixed(1));
      decode.work_min=(bytes[7]<<8 | bytes[8]<<8 | bytes[9]<<8 | bytes[10])>>>0;
    }

    decode.Alarm= (bytes[2] & 0x01)? "TRUE":"FALSE";
    decode.TDC  = (bytes[2] & 0x02)? "YES":"NO";
    
    if(bytes.length==11)
      return decode;
  }
  else if(fPort==7)
  {
    var Bat= (bytes[0]<<8 | bytes[1])/1000;
    for(var k=2;k<bytes.length;k=k+6)
    {
      data= datalog(k,bytes);
      if(k=='2')
        data_sum=data;
      else
        data_sum+=data;
    }
    return{
	Node_type:"LHT65N-VIB",
    Bat_V:Bat,
    DATALOG:data_sum
    };    
  }  
  else if(fPort==9)
  {
    decode.BatV=(bytes[0]<<8 | bytes[1])/1000;
    
    decode.Node_type="LHT65N-VIB";
    decode.max_acc_x_g=parseFloat((bytes[2]<<24>>16 | bytes[3])/1000).toFixed(3);
    decode.max_acc_y_g=parseFloat((bytes[4]<<24>>16 | bytes[5])/1000).toFixed(3);
    decode.max_acc_z_g=parseFloat((bytes[6]<<24>>16 | bytes[7])/1000).toFixed(3);

    if(bytes.length==8)
    return decode;
  }
  else if(fPort==5)
  {
  	var freq_band;
  	var sub_band;
    var sensor;
    
    if(bytes[0]==0x3F)
      sensor= "LHT65N-VIB";
      
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
}