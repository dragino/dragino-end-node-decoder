function datalog(i,bytes){
  var aa= parseFloat((bytes[1+i]<<8 | bytes[2+i])/100).toFixed(2);
  var bb= parseFloat((bytes[3+i]<<8 | bytes[4+i])/100).toFixed(2);
  var cc= parseFloat((bytes[5+i]<<8 | bytes[6+i])/100).toFixed(2);   
  var dd= (bytes[0+i]&0x02) ? "High":"Low";
  var ee= (bytes[0+i]&0x01) ? "True":"False";
  var ff= getMyDate((bytes[7+i]<<24 | bytes[8+i]<<16 | bytes[9+i]<<8 | bytes[10+i]).toString(10));
  var string='['+aa+','+bb+','+cc+','+dd+','+ee+','+ff+']'+',';  
  
  return string;
}

function datalog2(i,bytes){
  var aa= parseFloat((bytes[i]<<8 | bytes[i+1])/100).toFixed(2); 
  var string='['+ aa +']'+',';  
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
  //CS01-LB Decode 
  var fport=port&0x0F;
  if(fport==0x02)
  {
    var decode = {};
    var rang12=port>>6&0x03;
    var rang34=port>>4&0x03;
    var multiple12,multiple34;
    if(rang12===0)
     multiple12=1;
    else if(rang12===1)
     multiple12=3;
    else if(rang12===2)
     multiple12=6;
     
    if(rang34===0)
     multiple34=1;
    else if(rang34===1)
     multiple34=3;
    else if(rang34===2)
     multiple34=6;
     
    var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
    decode.BatV= value/1000;
    decode.EXTI_Trigger=(bytes[0] & 0x40)? "TRUE":"FALSE";
    decode.EXTI_Level=(bytes[0] & 0x80)? "HIGH":"LOW";
    decode.Node_type="CS01-LB";
    if((bytes.length==11)||(bytes.length==28))
    {
      decode.Current1_A=(bytes[2]<<8 | bytes[3])/100*multiple12;
      decode.Current2_A=(bytes[4]<<8 | bytes[5])/100*multiple12;
      decode.Current3_A=(bytes[6]<<8 | bytes[7])/100*multiple34;
      decode.Current4_A=(bytes[8]<<8 | bytes[9])/100*multiple34;
      decode.Cur1L_status= (bytes[10] &0x80)? "True":"False";
      decode.Cur1H_status= (bytes[10] &0x40)? "True":"False";
      decode.Cur2L_status= (bytes[10] &0x20)? "True":"False";
      decode.Cur2H_status= (bytes[10] &0x10)? "True":"False";   
      decode.Cur3L_status= (bytes[10] &0x08)? "True":"False";
      decode.Cur3H_status= (bytes[10] &0x04)? "True":"False";
      decode.Cur4L_status= (bytes[10] &0x02)? "True":"False";
      decode.Cur4H_status= (bytes[10] &0x01)? "True":"False"; 
  	  
  	  if(bytes.length==28)
  	  {
  	    decode.curtotal_mod=bytes[11];
  	    decode.curtotal1_mA_min=(bytes[12]<<24 | bytes[13]<<16 | bytes[14]<<8 | bytes[15])>>>0;
  	    decode.curtotal2_mA_min=(bytes[16]<<24 | bytes[17]<<16 | bytes[18]<<8 | bytes[19])>>>0;
  	    decode.curtotal3_mA_min=(bytes[20]<<24 | bytes[21]<<16 | bytes[22]<<8 | bytes[23])>>>0;
  	    decode.curtotal4_mA_min=(bytes[24]<<24 | bytes[25]<<16 | bytes[26]<<8 | bytes[27])>>>0;
  	  }
  	  return decode;
    }
    else if((bytes.length==15)||(bytes.length==32))
    {
      decode.Current1_A=(bytes[2]<<16 | bytes[3]<<8 | bytes[4])/1000*multiple12;
      decode.Current2_A=(bytes[5]<<16 | bytes[6]<<8 | bytes[7])/1000*multiple12;
      decode.Current3_A=(bytes[8]<<16 | bytes[9]<<8 | bytes[10])/1000*multiple34;
      decode.Current4_A=(bytes[11]<<16 | bytes[12]<<8 | bytes[13])/1000*multiple34;
      decode.Cur1L_status= (bytes[14] &0x80)? "True":"False";
      decode.Cur1H_status= (bytes[14] &0x40)? "True":"False";
      decode.Cur2L_status= (bytes[14] &0x20)? "True":"False";
      decode.Cur2H_status= (bytes[14] &0x10)? "True":"False";   
      decode.Cur3L_status= (bytes[14] &0x08)? "True":"False";
      decode.Cur3H_status= (bytes[14] &0x04)? "True":"False";
      decode.Cur4L_status= (bytes[14] &0x02)? "True":"False";
      decode.Cur4H_status= (bytes[14] &0x01)? "True":"False"; 
  	  
  	  if(bytes.length==32)
  	  {
  	    decode.curtotal_mod=bytes[15];
  	    decode.curtotal1_mA_min=(bytes[16]<<24 | bytes[17]<<16 | bytes[18]<<8 | bytes[19])>>>0;
  	    decode.curtotal2_mA_min=(bytes[20]<<24 | bytes[21]<<16 | bytes[22]<<8 | bytes[23])>>>0;
  	    decode.curtotal3_mA_min=(bytes[24]<<24 | bytes[25]<<16 | bytes[26]<<8 | bytes[27])>>>0;
  	    decode.curtotal4_mA_min=(bytes[28]<<24 | bytes[29]<<16 | bytes[30]<<8 | bytes[31])>>>0;
  	  }
  	  return decode;
    }  
  }
  else if(fport==7)
  {
    var Bat= (bytes[0]<<8 | bytes[1])/1000;
    for(var k=2;k<bytes.length;k=k+2)
    {
      data= datalog2(k,bytes);
      if(k=='2')
        data_sum=data;
      else
        data_sum+=data;
    }
    return{
	  Node_type:"CS01-LB",
    Bat_V:Bat,
    DATALOG:data_sum
    };    
  }  
  else if(fport==0x03)  
  {
    var pnack= ((bytes[0]>>7)&0x01) ? "True":"False";
    for(var i=0;i<bytes.length;i=i+11)
    {
      var data= datalog(i,bytes);
      if(i=='0')
        data_sum=data;
      else
        data_sum+=data;
    }
    return{
	Node_type:"CS01-LB",
    DATALOG:data_sum,
    PNACKMD:pnack,
    };    
  }  
  else if(fport==0x05)
  {
  	var freq_band;
  	var sub_band;
    var sensor;
    
    if(bytes[0]==0x33)
      sensor= "CS01-LB";
      
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