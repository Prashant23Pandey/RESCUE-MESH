import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { AddressInfo } from "node:net";
import { app } from "../src/app";
import { resetStore } from "../src/store";

afterEach(() => {
  resetStore();
});

test("POST /send_sos stores a request and calculates priority", async () => {
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/send_sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reporterName: "Asha",
        contactNumber: "9999999999",
        location: { area: "Sector 7" },
        message: "Two children trapped in a collapsed building and one person bleeding",
        peopleCount: 3,
        neededResources: ["ambulance"]
      })
    });

    assert.equal(response.status, 201);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.data.status, "pending");
    assert.equal(body.data.severityLabel, "critical");
    assert.ok(body.data.priorityScore >= 85);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("GET /get_requests returns requests ordered by priority", async () => {
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;

  try {
    await sendSos(port, {
      message: "Victim with severe bleeding after road accident",
      peopleCount: 1,
      neededResources: ["ambulance"]
    });

    const response = await fetch(`http://127.0.0.1:${port}/assign_resource`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: created.data.id })
    });

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.request.status, "assigned");
    assert.equal(body.data.resource.type, "ambulance");
    assert.equal(body.data.resource.available, false);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("POST /send_sos rejects invalid payloads", async () => {
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/send_sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: { area: "" },
        message: "bad"
      })
    });

    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.success, false);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

async function sendSos(port: number, payload: unknown): Promise<any> {
  const response = await fetch(`http://127.0.0.1:${port}/send_sos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  assert.equal(response.status, 201);
  return response.json();
}
