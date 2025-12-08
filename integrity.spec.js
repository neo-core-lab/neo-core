// ======================================================================
// NEO UMBRELLA LICENSE — ADAPTER INTEGRITY TEST
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// Purpose:
// Verifies that every NEO Adapter exposes a valid AdapterInfo structure.
//
// AdapterInfo MUST contain:
//   - name: string
//   - version: string
//   - adapterHash: string (non-empty; future: strict SHA-256 validation)
//
// This test ensures metadata integrity before adapters are loaded by
// the NEO Perception Layer.
// ======================================================================

import * as IGAdapter from '../adapters/ig.adapter.js';
import * as XAdapter from '../adapters/x.adapter.js';
import * as YTAdapter from '../adapters/youtube.adapter.js';

describe('NEO Adapter Integrity', () => {
    const adapters = [
        { label: 'IGAdapter', mod: IGAdapter },
        { label: 'XAdapter', mod: XAdapter },
        { label: 'YouTubeAdapter', mod: YTAdapter },
    ];

    adapters.forEach(({ label, mod }) => {
        test(`${label} returns valid AdapterInfo`, () => {
            const info = mod.getInfo();

            expect(info).toBeDefined();
            expect(typeof info.name).toBe('string');
            expect(typeof info.version).toBe('string');
            expect(typeof info.adapterHash).toBe('string');
            expect(info.adapterHash.length).toBeGreaterThan(0);

            // Future CI-hardening:
            // expect(info.adapterHash).toMatch(/^[a-f0-9]{64}$/);
        });
    });
});
