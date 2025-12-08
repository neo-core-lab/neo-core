// ======================================================================
// NEO UMBRELLA LICENSE — ADAPTER / EXTENSION IMPLEMENTATION
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// This file is part of the NEO Perception Layer MVP (Phase 1).
// Zero-Log Architecture: This file may NOT read, store, or transmit
// user-identifying data. DOM interaction MUST remain confined to this
// adapter. NEO Core may never touch raw HTML.
//
// Any attempt to introduce telemetry, logging, or off-device data flow
// voids all granted rights and terminates this license automatically.
// ======================================================================

// XAdapter — Phase 1 Stub (implements NEO Adapter API Spec v1.0)

export const ADAPTER_INFO = {
  name: 'XAdapter',
  version: '1.0.0',
  adapterHash: 'TBD' // CI will populate
};

export async function init() {
  // TODO: setup DOM observers specific to X (Twitter)
}

export function watch(callback) {
  // TODO: push AdapterPacket objects to callback()
}

export function stop() {
  // TODO: disconnect MutationObservers / event listeners
}

export function restoreOriginal(id) {
  // TODO: find the node by id and restore its original textContent
}

export function getInfo() {
  return ADAPTER_INFO;
}
