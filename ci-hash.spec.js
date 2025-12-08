// ======================================================================
// NEO UMBRELLA LICENSE — CORE HASH INTEGRITY TEST
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// Purpose:
// Ensures core inference binary cannot be modified without updating
// sdk-hash.txt and triggering a founder-key approval event.
//
// Governance:
// - Any mismatch = build FAILS
// - Any attempt to disable this test = license violation
// ======================================================================

const crypto = require('crypto');
const fs = require('fs');

// Do not run locally — CI only
if (!process.env.CI) {
  test.skip('Hash test runs only in CI', () => {});
} else {
  test('Core inference hash MUST match recorded hash', () => {
    const wasm = fs.readFileSync('core/inference.wasm');
    const hash = crypto.createHash('sha256').update(wasm).digest('hex');

    const saved = fs.readFileSync('core/sdk-hash.txt', 'utf8').trim();

    expect(hash).toBe(saved);
  });
}
