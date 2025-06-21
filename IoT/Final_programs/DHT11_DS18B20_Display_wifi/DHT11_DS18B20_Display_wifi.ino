#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>
#include <SevSeg.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

// ================== CONFIGURACIÓN =====================
OneWire ourWire(32);
DallasTemperature sensors(&ourWire);

#define DHTPIN 33
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

SevSeg sevseg;

// ================== VARIABLES GLOBALES =================
volatile float temperatura = 0.0;
volatile float temperaturaDHT = 0.0;
volatile float humedadDHT = 0.0;
float temperatureDisplay = 0.0;

String ssid, password;
bool conectado = false;

const char* deviceId = "esp32c3_001";
const char* serverUrl = "http://192.168.1.86:3005/data"; // CAMBIA A TU URL REAL

WebServer server(80);

// ========== GUARDAR/LEER WIFI DESDE SPIFFS ==========
void cargarCredenciales() {
  if (!SPIFFS.begin(true)) return;
  File file = SPIFFS.open("/wifi.json");
  if (!file) return;

  DynamicJsonDocument doc(256);
  deserializeJson(doc, file);
  ssid = doc["ssid"].as<String>();
  password = doc["password"].as<String>();
  file.close();
}

void guardarCredenciales(const String &newSSID, const String &newPass) {
  DynamicJsonDocument doc(256);
  doc["ssid"] = newSSID;
  doc["password"] = newPass;

  File file = SPIFFS.open("/wifi.json", FILE_WRITE);
  if (file) {
    serializeJson(doc, file);
    file.close();
  }
}

// ========== PORTAL PARA CONFIGURAR WIFI ==========
void lanzarPortalCaptivo() {
  WiFi.softAP("TemperatureWet", "12345678");

  server.on("/", HTTP_GET, []() {
    server.send(200, "text/html", R"rawliteral(
      <form action="/save" method="post">
        SSID: <input name="ssid"><br>
        Password: <input name="pass" type="password"><br>
        <input type="submit" value="Guardar">
      </form>
    )rawliteral");
  });

  server.on("/save", HTTP_POST, []() {
    guardarCredenciales(server.arg("ssid"), server.arg("pass"));
    server.send(200, "text/html", "Guardado. Reinicia el ESP.");
    delay(2000);
    ESP.restart();
  });

  server.begin();
  while (true) {
    server.handleClient();
    delay(10);
  }
}

// ========== CONEXIÓN A WIFI ==========
void conectarWiFi() {
  cargarCredenciales();
  if (ssid == "") {
    lanzarPortalCaptivo();
    return;
  }

  WiFi.begin(ssid.c_str(), password.c_str());
  Serial.printf("Conectando a %s...\n", ssid.c_str());

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 5000) {
    delay(250);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("✅ Conectado a WiFi");
    conectado = true;
  } else {
    Serial.println("❌ No se pudo conectar. Iniciando AP...");
    lanzarPortalCaptivo();
  }
}

// ========== ENVÍO DE DATOS ==========
void enviarDatos() {
  if (!conectado) return;

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  DynamicJsonDocument doc(256);
  doc["deviceId"] = deviceId;
  doc["ds18b20"] = temperatura;
  doc["dht11_temp"] = temperaturaDHT;
  doc["dht11_hum"] = humedadDHT;

  String json;
  serializeJson(doc, json);
  int httpResponseCode = http.POST(json);
  Serial.print("POST status: ");
  Serial.println(httpResponseCode);
  http.end();
}

// ========== TAREA NÚCLEO 0 ==========
void tareaSensores(void *parameter) {
  while (true) {
    sensors.requestTemperatures();
    temperatura = sensors.getTempCByIndex(0);
    temperatureDisplay = temperatura * 10;

    temperaturaDHT = dht.readTemperature();
    humedadDHT = dht.readHumidity();

    Serial.printf("DS18B20: %.2f C | DHT11: %.2f C | %.2f %%\n", temperatura, temperaturaDHT, humedadDHT);

    enviarDatos();
    vTaskDelay(5000 / portTICK_PERIOD_MS);
  }
}

// ========== TAREA NÚCLEO 1 ==========
void tareaDisplay(void *parameter) {
  float ultimaTemp = -999;
  while (true) {
    if (temperatureDisplay != ultimaTemp) {
      ultimaTemp = temperatureDisplay;
      sevseg.setNumber(ultimaTemp, 1); // Solo cambia si la temperatura cambia
    }

    sevseg.refreshDisplay();
    vTaskDelay(1 / portTICK_PERIOD_MS);
  }
}

// ========== SETUP ==========
void setup() {
  Serial.begin(115200);
  dht.begin();
  sensors.begin();
  SPIFFS.begin(true);

  byte numDigits = 4;
  byte digitPins[] = {23, 22, 21, 19};
  byte segmentPins[] = {18, 5, 17, 16, 4, 2, 15, 13};
  sevseg.begin(COMMON_CATHODE, numDigits, digitPins, segmentPins, true);
  sevseg.setBrightness(90);

  conectarWiFi(); // Usa todos los recursos del ESP32

  // Crear tareas luego de conectar (o iniciar AP)
  xTaskCreatePinnedToCore(tareaSensores, "TareaSensores", 8192, NULL, 1, NULL, 0);
  xTaskCreatePinnedToCore(tareaDisplay, "TareaDisplay", 2048, NULL, 1, NULL, 1);
}

void loop() {
  // Vacío: usamos tareas
}