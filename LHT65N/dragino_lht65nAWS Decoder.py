import base64
import time
import json
import string
def str_pad(decoded):
    zero = '0'
    test2=hex(decoded)
    test3=test2[2:]
    s=str(test3)
    if decoded <10:
        s=zero+s
    return s
    
def hexzf(n):
    if (n > 327.67):
        x=n-655.36
        x=round(x,2)
    else:
        x=n
    return x
    
def dict_from_payload(base64_input: str, fport: int = None):
    """ Decodes a base64-encoded binary payload into JSON.
            Parameters 
            ----------
            base64_input : str
                Base64-encoded binary payload
            fport: int
                FPort as provided in the metadata. Please note the fport is optional and can have value "None", if not provided by the LNS or invoking function. 
                If  fport is None and binary decoder can not proceed because of that, it should should raise an exception.
            Returns
            -------
            JSON object with key/value pairs of decoded attributes
        """

    decoded = base64.b64decode(base64_input)
    tst1 = len(decoded)
    if tst1==1:
          reset="reset state"
          result={
            "LHT65N":reset,
          }
    else:
      Ext = decoded[6] & 0x0F
      poll_message_status=((decoded[6]>>6) & 0x01)
      Connect=(decoded[6] & 0x80)>>7
      if poll_message_status == 0:
          if Ext == 9:
            TempC_DS=hexzf((decoded[0]<<24>>16 | decoded[1])/100)
            Bat_status=decoded[4]>>6
            Work_mode="DS18B20 & timestamp"
            Systimestamp=(decoded[7]<<24 | decoded[8]<<16 | decoded[9]<<8 | decoded[10] )
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"TempC_DS":TempC_DS,
      				"Bat_status":Bat_status,
      				"Work_mode":Work_mode,
      				"Systimestamp":Systimestamp,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
  		      }
  		      
          if (Connect == 1):
            No_connect="Sensor no connection"
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_DS=hexzf((decoded[0]<<24>>16 | decoded[1])/100)
            result = {
  				    "Sensor_State":No_connect,
  				    "BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_DS":TempC_DS,
  				  }
   
          if (Ext == 0):
            Ext_sensor ="No external sensor"
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            result = {
  				    "Ext_sensor":Ext_sensor,
  				    "BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
  				  }
  
  				  
          if (Ext == 1):
            Ext_sensor ="Temperature Sensor"
            TempC_DS=hexzf((decoded[7]<<24>>16 | decoded[8])/100)
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Ext_sensor":Ext_sensor,
      				"TempC_DS":TempC_DS,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
  
      			
          if (Ext == 2):
            Ext_sensor ="Temperature Sensor"
            TempC_TMP117=hexzf((decoded[7]<<24>>16 | decoded[8])/100)
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Ext_sensor":Ext_sensor,
      				"TempC_TMP117":TempC_TMP117,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
  
          if (Ext == 4):
            Work_mode="Interrupt Sensor send"
            Exti_pin_level=(decoded[7]==1) and "High" or "Low" 
            Exti_status=(decoded[8]==1) and "True" or "False"
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Work_mode":Work_mode,
      				"Exti_pin_level":Exti_pin_level,
      				"Exti_status":Exti_status,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
  
          if (Ext == 5):
            Work_mode="Illumination Sensor"
            ILL_lx=decoded[7]<<8 | decoded[8]
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Work_mode":Work_mode,
      				"ILL_lx":ILL_lx,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
  
          if (Ext == 6):
            Work_mode="ADC Sensor"
            ADC_V=(decoded[7]<<8 | decoded[8])/1000
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Work_mode":Work_mode,
      				"ADC_V":ADC_V,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
  
  				
          if (Ext == 7):
            Work_mode="Interrupt Sensor count"
            Exit_count=decoded[7]<<8 | decoded[8]
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Work_mode":Work_mode,
      				"Exit_count":Exit_count,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
  
  				
          if (Ext == 8):
            Work_mode="Interrupt Sensor count"
            Exit_count=decoded[7]<<24 | decoded[8]<<16 | decoded[9]<<8 | decoded[10]
            BatV= ((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000
            Bat_status=decoded[0]>>6
            TempC_SHT=hexzf((decoded[2]<<24>>16 | decoded[3])/100)
            Hum_SHT=((decoded[4]<<8 | decoded[5])&0xFFF)/10
            result = {
      				"Work_mode":Work_mode,
      				"Exit_count":Exit_count,
      				"BatV":BatV,
      				"Bat_status":Bat_status,
      				"TempC_SHT":TempC_SHT,
      				"Hum_SHT":Hum_SHT,
      			}
          elif (Ext == 15):
            Work_mode="DS18B20ID"
            ID=str_pad(decoded[2])+str_pad(decoded[3])+str_pad(decoded[4])+str_pad(decoded[5])+str_pad(decoded[7])+str_pad(decoded[8])+str_pad(decoded[9])+str_pad(decoded[10])
            result = {
      				"Work_mode":Work_mode,
      				"ID":ID,
      			}
      
      if poll_message_status == 1:
        i=0
        while i<tst1:
          Ext= decoded[6]&0x0F 
          if (Ext == 1) or (Ext == 9) or (Ext == 2):
        	  bb=hexzf(((decoded[0+i]<<24>>16 | decoded[1+i])/100))
          if (Ext == 4):
            Exti_pin_level=decoded[0+i] and "High" or "Low"  
            Exti_status=decoded[1+i] and "True" or "False"
            bb=Exti_pin_level+Exti_status
          if (Ext == 5) or (Ext == 7) or (Ext == 8):
            bb=decoded[0+i]<<8 | decoded[1+i]
          elif (Ext == 6):
            bb=(decoded[0+i]<<8 | decoded[1+i])/1000
          cc= hexzf(((decoded[2+i]<<24>>16 | decoded[3+i])/100))
          dd= (((decoded[4+i]<<8 | decoded[5+i])&0xFFF)/10)
          tim= (decoded[7+i]<<24 | decoded[8+i]<<16 | decoded[9+i]<<8 | decoded[10+i])
          if(tim > 9999999999):
            c_Date = int(tim)
          else :
            c_Date = (int(tim) * 1000)
          time_local = time.localtime(c_Date / 1000)
          ee = time.strftime("%Y-%m-%d %H:%M:%S",time_local) 
          string='['+str(bb)+ ',' +str(cc)+ ',' +str(dd)+ ',' +str(ee)+']'+','
  
          if(i==0):
            DATALOG=string
          else:
            DATALOG=DATALOG+string
          i=i+11
        result = {
          "DATALOG":DATALOG,
          }
      
    return result  
