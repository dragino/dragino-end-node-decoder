function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
	var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
	var batV=value/1000;//Battery,units:V

	value=bytes[2]<<8 | bytes[3];
	if(bytes[2] & 0x80)
	{value |= 0xFFFF0000;}
	var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature
   
	value=bytes[4]<<8 | bytes[5];
	var hum=(value/10).toFixed(2);	
   
	var temp=((bytes[6] << 24 >> 16 | bytes[7]) / 10).toFixed(2); //leaf temperature
   
	var i_flag = bytes[8];
    var mes_type = bytes[10];
    return [
        {
            field: "BAT",
            value: batV
        },
        {
            field: "LEAF_MOISTURE",
            value: hum
        },
        {
            field: "LEAF_TEMPERATURE",
            value: temp
        }
    ];
}