// ======================================================================
// NEO UMBRELLA LICENSE — ADAPTER / EXTENSION IMPLEMENTATION
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// This file is part of the NEO Perception Layer MVP (Phase 1).
//
// Zero-Log Architecture:
// - This file may NOT read, store, or transmit user-identifying data.
// - DOM interaction MUST remain confined to this adapter.
// - NEO Core may NEVER touch raw HTML.
//
// Stability Doctrine:
// - If Instagram changes its DOM structure, this adapter MUST throw
//   AdapterStabilityError to prevent silent corruption.
// - Any attempt to bypass stability checks terminates this license.
//
// ======================================================================

import type { AdapterPacket, AdapterInfo, FunctionalAdapter } from './base';
import { adapterStabilityGuard } from './adapterStabilityError.js';

export const ADAPTER_INFO: AdapterInfo = {
    name: 'IGAdapter',
    version: '1.0.0',
    adapterHash: 'TBD', // updated in CI
};

export const IGAdapter: FunctionalAdapter = {
    async init(): Promise<void> {
        //
        // DOM Drift Guard: DO NOT REMOVE
        //
        // Replace this placeholder selector with the real IG root selector
        const root = document.querySelector('[data-neo-ig-root]');

        if (!root) {
            throw adapterStabilityGuard({
                platform: 'ig',
                reason: 'Root comment container not found',
                selectors: ['[data-neo-ig-root]'],
                adapterName: `${ADAPTER_INFO.name}-v${ADAPTER_INFO.version}`,
            });
        }

        // TODO: continue with real adapter setup
    },

    watch(callback: (pkt: AdapterPacket) => void): void {
        // TODO: stream AdapterPacket objects to callback
    },

    stop(): void {
        // TODO: disconnect MutationObservers / listeners
    },

    restoreOriginal(id: string): void {
        // TODO: find comment by id and restore original text
    },

    getInfo(): AdapterInfo {
        return ADAPTER_INFO;
    },
};

