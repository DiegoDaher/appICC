#include <OneWire.h>                
#include <DallasTemperature.h>
 
OneWire ourWire(2); //2 Arduino uno //ESP32 pin 32
 
DallasTemperature sensors(&ourWire); //Se declara una variable u objeto para nuestro sensor

void setup() {
delay(1000);
Serial.begin(9600); //9600    //115600
sensors.begin();   //Se inicia el sensor
}
 
void loop() {
sensors.requestTemperatures();   //Se envía el comando para leer la temperatura
float temp= sensors.getTempCByIndex(0); //Se obtiene la temperatura en ºC

Serial.print("Temperatura= ");
Serial.print(temp);
Serial.println(" C");
delay(100);                     
}