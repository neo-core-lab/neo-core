//// ======================================================================
// NEO UMBRELLA LICENSE — DOM DRIFT TEST (IGAdapter)
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// Ensures that if Instagram changes its DOM structure and the adapter
// cannot locate required selectors, IGAdapter MUST throw an
// AdapterStabilityError.
//
// This prevents silent corruption of the NEO Perception Layer.
// ======================================================================

import * as IGAdapter from '../adapters/ig.adapter.js';
import { AdapterStabilityError } from '../adapters/adapterStabilityError.js';

// Fake DOM (no IG selectors present)
document.body.innerHTML = `<div>No comments here</div>`;

test('IGAdapter init() fails when root selector changes', async () => {
    await expect(IGAdapter.init()).rejects.toBeInstanceOf(AdapterStabilityError);
});
