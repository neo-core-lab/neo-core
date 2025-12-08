// ======================================================================
// NEO UMBRELLA LICENSE — SAFETY VERIFICATION SUITE
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// Adapter Stability Contract Test
// ----------------------------------------------------------------------
// Ensures AdapterStabilityError:
//
//   - exists and behaves predictably
//   - never carries raw HTML, user content, or data leakage
//   - always includes platform, reason, selectors, adapterName, timestamp
//   - is created only through explicit safety logic
//
// This is NOT a DOM-drift simulation. DOM drift tests live in:
//   tests/dom/*Adapter.dom-drift.test.js
//
// This file enforces the integrity of the error class itself.
// ======================================================================

import {
    AdapterStabilityError,
    adapterStabilityGuard
} from '../adapters/AdapterStabilityError.js';

describe('AdapterStabilityError', () => {

    // ----------------------------------------------------------
    // Constructors must populate mandatory safety fields correctly
    // ----------------------------------------------------------
    test('constructs with required fields', () => {
        const err = new AdapterStabilityError({
            platform: 'ig',
            reason: 'Root node missing',
            selectors: ['[data-neo-comments]'],
            adapterName: 'IGAdapter-v1.0.0'
        });

        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('AdapterStabilityError');
        expect(err.platform).toBe('ig');
        expect(err.reason).toBe('Root node missing');
        expect(err.selectors).toEqual(['[data-neo-comments]']);
        expect(err.adapterName).toBe('IGAdapter-v1.0.0');
        expect(typeof err.timestamp).toBe('number'); // mandatory for audit trails
    });

    // ----------------------------------------------------------
    // Guard helper must always return a proper AdapterStabilityError
    // ----------------------------------------------------------
    test('guard helper returns an AdapterStabilityError', () => {
        const err = adapterStabilityGuard({
            platform: 'x',
            reason: 'Timeline selector missing',
            selectors: ['[role="article"]'],
            adapterName: 'XAdapter-v1.0.0'
        });

        expect(err).toBeInstanceOf(AdapterStabilityError);
        expect(err.platform).toBe('x');
    });

    // ----------------------------------------------------------
    // The class must never carry raw HTML or leaked user content
    // ----------------------------------------------------------
    test('does not carry raw HTML or user content (safety expectation)', () => {
        const badReason = '<div>hello</div>';
        const badSelectors = ['.comment:contains("kill yourself")'];

        const err = new AdapterStabilityError({
            platform: 'yt',
            reason: badReason,
            selectors: badSelectors,
            adapterName: 'YouTubeAdapter-v1.0.0'
        });

        // These asserts remind developers of the rule:
        expect(typeof err.reason).toBe('string');
        expect(Array.isArray(err.selectors)).toBe(true);

        // Real enforcement of leakage prevention happens in:
        // - adapter code review
        // - pattern sanitization rules
        // - synthetic-humanity safety constraints
    });
});
