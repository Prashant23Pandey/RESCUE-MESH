// frontend/src/screens/TriageScreen.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import encodeLoRa from '../services/loRaEncoder';
import espBridge from '../services/esp32Bridge';

export default function TriageScreen({ navigation }) {
  const [status, setStatus] = useState(null);
  const submitSOS = async (priority, needs) => {
    const payload = {
      msgId: `${Date.now()}`,
      text: `Priority ${priority}`,
      lat: 0, // replace with GPS
      lon: 0,
    };
    try {
      const resp = await api.post('/sos/triage', payload);
      // Encode for LoRa & send to ESP32
      const loRaPkt = encodeLoRa({
        id: resp.data.msgId,
        lat: resp.data.lat,
        lon: resp.data.lon,
        prio: resp.data.priority.slice(-1), // "P1" -> "1"
        needs: resp.data.needs,
        ts: resp.data.timestamp,
      });
      await espBridge.send(loRaPkt);
      setStatus('Sent');
    } catch (e) {
      setStatus('Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victim SOS Triage</Text>
      <TouchableOpacity style={styles.btnP1} onPress={() => submitSOS('P1', ['water'])}>
        <Text style={styles.btnText}>P1 – Critical</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnP2} onPress={() => submitSOS('P2', ['food'])}>
        <Text style={styles.btnText}>P2 – High</Text>
      </TouchableOpacity>
      {status && <Text>{status}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  btnP1: { backgroundColor: '#ff3b30', padding: 20, borderRadius: 10, marginVertical: 10, width: '80%' },
  btnP2: { backgroundColor: '#ff9500', padding: 20, borderRadius: 10, marginVertical: 10, width: '80%' },
  btnText: { color: '#fff', textAlign: 'center', fontSize: 18 },
});
