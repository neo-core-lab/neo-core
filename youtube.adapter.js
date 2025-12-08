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

export const ADAPTER_INFO = {
  name: 'YouTubeAdapter',
  version: '1.0.0',
  adapterHash: 'TBD'
};

export async function init() {
  /* TODO */
}

export function watch(callback) {
  /* TODO */
}

export function stop() {
  /* TODO */
}

export function restoreOriginal(id) {
  /* TODO: find comment node by id and restore original textContent */
}

export function getInfo() {
  return ADAPTER_INFO;
}
