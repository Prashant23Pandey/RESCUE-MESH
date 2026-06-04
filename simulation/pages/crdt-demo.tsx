// simulation/pages/crdt-demo.tsx
import React, { useEffect, useState } from 'react';
import * as Y from 'yjs';

/**
 * Simple CRDT demo with two virtual devices (A & B) running in the same browser.
 * Steps shown on the UI emulate:
 *   1️⃣ Disconnect both from the central server.
 *   2️⃣ Device A sets SOS ticket status to "In Progress".
 *   3️⃣ Device B sets the SAME ticket status to "Resolved".
 *   4️⃣ Re‑connect devices (local link) and let Yjs merge.
 * The final merged state is printed in the log area.
 */
export default function CRDTDemo() {
  const [log, setLog] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  // Two separate Y.Doc instances simulate two devices.
  const docA = React.useMemo(() => new Y.Doc(), []);
  const docB = React.useMemo(() => new Y.Doc(), []);

  // Central "server" doc – not used directly after disconnect, but kept for init.
  const serverDoc = React.useMemo(() => new Y.Doc(), []);

  // Helper to append a line to the log.
  const addLog = (msg: string) => setLog((prev) => [...prev, msg]);

  // Store the update listeners – they are (re)attached when we go online.
  const [listenersAttached, setListenersAttached] = useState(false);

  /** Attach sync listeners: each doc forwards its updates to the other. */
  const attachListeners = () => {
    if (listenersAttached) return;
    docA.on('update', (update) => {
      // console.log('A -> B update', update);
      docB.applyUpdate(update);
    });
    docB.on('update', (update) => {
      docA.applyUpdate(update);
    });
    setListenersAttached(true);
    addLog('🔗 Sync listeners attached (devices now connected).');
  };

  /** Detach sync listeners – simulating network partition. */
  const detachListeners = () => {
    if (!listenersAttached) return;
    docA.off('update');
    docB.off('update');
    setListenersAttached(false);
    addLog('🚫 Sync listeners detached (devices disconnected).');
  };

  /** Initialise the shared SOS map with a ticket. */
  const initSharedState = () => {
    const srvMap = serverDoc.getMap('sos');
    // Create a shared Y.Map for a single ticket.
    const ticket = new Y.Map();
    ticket.set('status', 'New');
    ticket.set('ts', 0);
    srvMap.set('ticket1', ticket);
    // Clone the server state into A and B (deep copy via update).
    const update = Y.encodeStateAsUpdate(serverDoc);
    docA.applyUpdate(update);
    docB.applyUpdate(update);
    addLog('📦 Initial ticket created with status "New" on both devices.');
  };

  /** Utility to update a ticket on a specific device. */
  const updateTicket = (
    doc: Y.Doc,
    deviceName: string,
    newStatus: string
  ) => {
    const sosMap = doc.getMap('sos');
    const ticket = sosMap.get('ticket1') as Y.Map<any>;
    const ts = Date.now(); // logical timestamp for demo purposes
    ticket.set('status', newStatus);
    ticket.set('ts', ts);
    addLog(
      `🛠️ ${deviceName} set status = "${newStatus}" (ts=${ts})`
    );
  };

  /** Read the merged ticket from either doc (they are identical after sync). */
  const readMergedTicket = () => {
    const sosMap = docA.getMap('sos');
    const ticket = sosMap.get('ticket1') as Y.Map<any>;
    const status = ticket.get('status');
    const ts = ticket.get('ts');
    addLog(`✅ Final merged ticket: status="${status}", ts=${ts}`);
  };

  // Execute steps when the user clicks "Next Step".
  const nextStep = () => {
    switch (step) {
      case 0:
        initSharedState();
        attachListeners(); // start in connected state
        break;
      case 1:
        detachListeners(); // simulate network partition
        break;
      case 2:
        // Device A updates while offline
        updateTicket(docA, 'Device A', 'In Progress');
        break;
      case 3:
        // Device B updates while offline (conflict)
        updateTicket(docB, 'Device B', 'Resolved');
        break;
      case 4:
        // Re‑connect devices – listeners re‑attached, pending updates flow.
        attachListeners();
        // Allow Yjs a micro‑tick to propagate updates synchronously.
        setTimeout(() => {
          readMergedTicket();
        }, 0);
        break;
      default:
        addLog('🔚 Demo finished.');
        break;
    }
    setStep((s) => s + 1);
  };

  // Render UI
  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>🧩 Offline CRDT Demo (Yjs)</h2>
      <button
        onClick={nextStep}
        style={{
          padding: '0.5rem 1rem',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Next Step ({step})
      </button>
      <pre
        style={{
          marginTop: '1rem',
          maxHeight: '400px',
          overflowY: 'auto',
          background: '#111',
          color: '#0f0',
          padding: '1rem',
        }}
      >
{log.join('\n')}
      </pre>
    </div>
  );
}
