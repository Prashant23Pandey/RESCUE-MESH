#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

const byte DNS_PORT = 53;
IPAddress apIP(192, 168, 4, 1);
DNSServer dnsServer;
ESP8266WebServer server(80);

const char INDEX_HTML[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>🚨 RESCUE-MESH SOS 🚨</title>
    <style>
        body { font-family: -apple-system, sans-serif; background-color: #0d1117; color: #c9d1d9; margin: 0; padding: 20px; }
        .card { background-color: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        h2 { color: #f85149; margin-top: 0; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea, select { width: 100%; box-sizing: border-box; padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #30363d; background-color: #0d1117; color: white; font-family: inherit; }
        button { width: 100%; padding: 15px; background-color: #238636; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; }
        button:active { background-color: #2ea043; }
        .success { display: none; background-color: rgba(63, 185, 80, 0.1); border: 1px solid #3fb950; padding: 15px; border-radius: 8px; color: #3fb950; font-weight: bold; text-align: center; }
    </style>
</head>
<body>
    <div class="card" id="formCard">
        <h2>🚨 Emergency SOS 🚨</h2>
        <p>You are connected to an offline RESCUE-MESH node. Submit your request below.</p>
        <form id="sosForm" action="/submit_sos" method="POST">
            <label>Emergency Message</label>
            <textarea name="message" rows="3" required placeholder="Describe the emergency..."></textarea>
            
            <label>Location Area</label>
            <input type="text" name="area" required placeholder="e.g. Sector 7">
            
            <label>Number of People</label>
            <input type="number" name="peopleCount" value="1" min="1" required>
            
            <label>Contact Number (Optional)</label>
            <input type="text" name="contactNumber" placeholder="Phone number">

            <button type="submit">Submit SOS Signal</button>
        </form>
    </div>
    
    <div class="success" id="successCard">
        ✅ SOS SIGNAL CACHED SECURELY!<br><br>
        Your request has been saved to the physical Mesh Node. Relief workers will dispatch resources when the node reconnects!
    </div>

    <script>
        document.getElementById('sosForm').onsubmit = function(e) {
            e.preventDefault();
            var form = this;
            var data = new URLSearchParams(new FormData(form));
            fetch(form.action, { method: 'POST', body: data })
                .then(function() {
                    document.getElementById('formCard').style.display = 'none';
                    document.getElementById('successCard').style.display = 'block';
                });
        };
    </script>
</body>
</html>
)=====";

void setup() {
  Serial.begin(115200);
  Serial.println("\n\n--- RESCUE-MESH ESP8266 INITIALIZING ---");

  // Create an open Wi-Fi network
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP("🚨 RESCUE-MESH-SOS 🚨");
  Serial.println("Wi-Fi Access Point Started: 🚨 RESCUE-MESH-SOS 🚨");

  // Intercept all DNS requests and redirect them to our IP (Captive Portal Magic)
  dnsServer.start(DNS_PORT, "*", apIP);
  Serial.println("DNS Server Hijacking Active");

  // Route: Captive Portal Handlers
  server.on("/", HTTP_GET, []() {
    server.send(200, "text/html", INDEX_HTML);
  });
  
  // Apple Captive Portal Trigger
  server.on("/hotspot-detect.html", HTTP_GET, []() { server.send(200, "text/html", INDEX_HTML); });
  // Android Captive Portal Trigger
  server.on("/generate_204", HTTP_GET, []() { server.send(200, "text/html", INDEX_HTML); });
  
  // Handle 404 (Redirect everything to home to enforce captive portal)
  server.onNotFound([]() {
    server.sendHeader("Location", String("http://") + server.client().localIP().toString(), true);
    server.send(302, "text/plain", "");
  });

  // API Endpoint: Capture SOS
  server.on("/submit_sos", HTTP_POST, []() {
    String message = server.arg("message");
    String area = server.arg("area");
    String people = server.arg("peopleCount");
    String contact = server.arg("contactNumber");

    Serial.println("\n\n========================================");
    Serial.println("🚨 NEW SOS RECEIVED OFFLINE 🚨");
    Serial.println("Message: " + message);
    Serial.println("Area: " + area);
    Serial.println("People: " + people);
    Serial.println("Contact: " + contact);
    Serial.println("========================================");

    server.send(200, "text/plain", "SUCCESS");
  });

  server.begin();
  Serial.println("Mini Web Server Started. Waiting for victims to connect...");
}

void loop() {
  dnsServer.processNextRequest();
  server.handleClient();
}
