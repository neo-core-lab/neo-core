// ======================================================================
// NEO UMBRELLA LICENSE — ADAPTER / EXTENSION IMPLEMENTATION
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// Adapter Shape Test (Canonical):
// Ensures every NEO Adapter implements the required Adapter API surface:
//
//   - init(): Promise<void>
//   - watch(callback: (AdapterPacket) => void): void
//   - stop(): void
//   - restoreOriginal(id: string): void
//   - getInfo(): AdapterInfo
//
// And validates that getInfo() returns:
//
//   - name: string
//   - version: string
//   - adapterHash: string (non-empty)
//
// Any missing field MUST fail CI.
// This test is a foundational integrity guarantee.
// ======================================================================

import * as IGAdapter from '../adapters/ig.adapter.js';
import * as XAdapter from '../adapters/x.adapter.js';
import * as YTAdapter from '../adapters/youtube.adapter.js';

describe('NEO Adapter Shape (Canonical)', () => {
    const adapters = [
        { name: 'IGAdapter', mod: IGAdapter },
        { name: 'XAdapter', mod: XAdapter },
        { name: 'YouTubeAdapter', mod: YTAdapter },
    ];

    adapters.forEach(({ name, mod }) => {
        describe(`${name}`, () => {

            // ------------------------------------------------------------
            // Required functions must exist
            // ------------------------------------------------------------
            test('exports required API methods', () => {
                expect(typeof mod.init).toBe('function');
                expect(typeof mod.watch).toBe('function');
                expect(typeof mod.stop).toBe('function');
                expect(typeof mod.restoreOriginal).toBe('function');
                expect(typeof mod.getInfo).toBe('function');
            });

            // ------------------------------------------------------------
            // getInfo() must return minimal AdapterInfo structure
            // ------------------------------------------------------------
            test('getInfo() returns correct AdapterInfo shape', () => {
                const info = mod.getInfo();

                expect(info).toBeDefined();
                expect(typeof info.name).toBe('string');
                expect(typeof info.version).toBe('string');
                expect(typeof info.adapterHash).toBe('string');
                expect(info.adapterHash.length).toBeGreaterThan(0);
            });
        });
    });
});
