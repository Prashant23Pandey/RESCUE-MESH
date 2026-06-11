# ESP8266 NodeMCU Emergency Access Point (Captive Portal)

Since you actually have an ESP8266 NodeMCU device, you can use it to blow the judges' minds during the live demo! 

You can flash this simple code to your ESP8266 NodeMCU. It turns the ESP8266 NodeMCU into an **Emergency Wi-Fi Router**. When the judges connect their phones to it, it will automatically pop up a screen (a Captive Portal) asking them to submit an SOS, proving your concept works offline!

### Instructions:
1. Open the **Arduino IDE**.
2. Install the `ESPAsyncWebServer` and `DNSServer` libraries.
3. Paste this code and upload it to your ESP8266 NodeMCU.

```cpp
#include <WiFi.h>
#include <DNSServer.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "RESCUE-MESH EMERGENCY"; // The Wi-Fi network name

const byte DNS_PORT = 53;
IPAddress apIP(192, 168, 4, 1);
DNSServer dnsServer;
AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  // Set ESP8266 NodeMCU as a Wi-Fi Access Point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid);
  delay(500); // Wait for AP to stabilize
  
  // Modify TTL for captive portal compatibility
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));

  // Redirect ALL internet traffic (DNS) to the ESP8266 NodeMCU's IP address
  dnsServer.start(DNS_PORT, "*", apIP);

  // Serve a simple HTML page acting as the offline SOS Form
  server.onNotFound([](AsyncWebServerRequest *request){
    String html = "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    html += "<style>body{font-family:sans-serif; background:#0d1117; color:#c9d1d9; text-align:center; padding:20px;}</style></head>";
    html += "<body><h1 style='color:#f85149'>RESCUE-MESH</h1>";
    html += "<h2>Emergency Captive Portal</h2>";
    html += "<p>You are connected to an offline emergency mesh node.</p>";
    html += "<button style='padding:15px; background:#238636; color:white; border:none; border-radius:5px; font-size:18px;'>Submit Offline SOS</button>";
    html += "</body></html>";
    
    request->send(200, "text/html", html);
  });

  server.begin();
  Serial.println("Captive Portal Started!");
}

void loop() {
  dnsServer.processNextRequest();
}
```

### How to demo this to the judges:
1. Plug the ESP8266 NodeMCU into a battery pack and set it on the table.
2. Tell the judges: *"Imagine the cell towers are destroyed. This $5 ESP8266 NodeMCU chip acts as our emergency router."*
3. Ask a judge to open the Wi-Fi settings on their smartphone and connect to **"RESCUE-MESH EMERGENCY"**.
4. Their phone will **automatically** pop up the emergency SOS page (like when you connect to hotel Wi-Fi) without any internet connection!
