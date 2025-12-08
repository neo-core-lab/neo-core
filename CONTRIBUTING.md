==============================================================
🟩 NEO UMBRELLA SYSTEM — CONTRIBUTOR PROTOCOL (L1: CORE)
==============================================================
Document Class: ENGINEERING GOVERNANCE • CONTRIBUTOR RULES • OATH
Layer: L1 — Perception Layer (Adapters • Core • Packs)
Governance Basis: Founder Sovereignty Charter + L0 Doctrine
Protection Status: PUBLIC • IMPLEMENTATION-BOUND • DOCTRINE-ANCHORED
Signature Authority Required for Changes to Doctrine: FOUNDER-KEY
==============================================================

© 2023–2025 Luciana Fisher. All Rights Reserved.

NEO Core — L1 Perception Layer
Contributor Guidelines, Doctrinal Boundaries & Mason’s Oath
🟩 0. Introduction

Thank you for your interest in contributing to NEO Core (L1) — the client-side perception layer of the NEO Umbrella System.

This repository is not an experiment.
It is a doctrinally constrained safety engine whose integrity must hold for decades.

Every contributor is a mason.
Every change is a stone.
Stones that violate doctrine do not enter the cathedral.

🟦 1. Umbrella Doctrine (Immutable)

All contributions must comply with the NEO Umbrella doctrinal spine:

Zero-Log

No user text may be logged, printed, traced, or persisted.

Zero-Storage

No user text may be written to disk, IndexedDB, localStorage, caches, or memory-mapped files.

Zero-Surveillance

No user text, metadata, or identifiers may be transmitted, exported, or used for analytics.

On-Device Perception Only

All inference happens inside the content script.
NEO Core must remain fully functional offline or air-gapped.

Non-Substitution Mandate

NEO is not a parental control, therapist, judge, or supervisor.
It blocks harm, not humanity.

Child-Protection Doctrine

Exploitative patterns must be veiled.
Ordinary conflict must not be censored.

Founder Sovereignty Charter

Only Founder-Key authority may amend doctrines.

Violating any rule above rejects the contribution.

🟧 2. Repository Architecture (L0 → L1 → Adapters → Packs)
2.1 L0 Doctrine — Do Not Touch

src/L0/doctrine.js is immutable.
It exists to catch violations at runtime.
No contributor may alter doctrinal constants, traps, or guardrails.

2.2 L1 Core — Zero-DOM

src/core/content.js and siblings must:

never call querySelector, innerText, or any DOM method

perform perception only with text passed by adapters

store originals only in ephemeral Map<id,text> for restoration

2.3 Adapters — The Only DOM Boundary

Adapters live under src/adapters/ and must:

be the exclusive surface touching platform DOM

detect comment nodes deterministically

throw AdapterStabilityError when selectors drift

never silently degrade

never guess dynamic selectors

2.4 Packs — Frozen Relics

Located under packs/.

filenames must include content hashes

packManifest.json must map pack → file → SHA256

packs cannot be mutated at runtime

CI enforces integrity

🟪 3. Contribution Process
3.1 Fork → Branch → PR

Use descriptive branches:

feature/adapter-youtube-repair
fix/core-veil-timing
chore/ci-selector-drift

3.2 Before submitting a PR

Run:

npm run test:ci
npm run lint
npm run pack:verify
npm run adapters:stability


All must pass.

3.3 Commit Style

Minimal, descriptive, audit-friendly.

Examples:

fix(yt-adapter): recut root selector after DOM drift
feat(core): improve emoji geometry detection
chore(ci): update snapshot for IG drift 2025-12-04

🟥 4. Prohibited Changes (Hard Fail)

You may NOT submit a PR that:

logs user text (console.log(comment.text) → instant rejection)

transmits text or metadata (fetch, sendMessage, WebSocket, etc.)

introduces any persistent store of text

modifies doctrine.js

bypasses adapter boundaries

introduces telemetry, analytics, or tracking

weakens veil behavior

hides adapter failures

turns NEO into a moderation, parental control, or surveillance tool

reduces on-device operation or requires a server

Any such PR is automatically declined.

🟫 5. Required Tests & CI Gates

PRs must pass:

5.1 Doctrinal Lint

Checks for:

logging

storage

network leaks

surveillance patterns

5.2 Adapter Stability Tests

Playwright / Puppeteer compare DOM signatures to nightly baselines.

5.3 Pack Integrity

SHA mismatch → PR rejected.

5.4 Visual Regression Tests

SSIM must remain ≥ 0.999 against NEO Core 3.0 baseline.

5.5 Unit Tests

Zero failures tolerated.

🟩 6. PR Ritual — The Mason’s Oath

Every Pull Request must include this checklist:

### Mason’s Oath
- [ ] I have not logged, stored, or transmitted any user text.
- [ ] I have touched the DOM only through the assigned adapter.
- [ ] All doctrinal guardrails remain intact (Zero-Log, Zero-Storage, Zero-Surveillance).
- [ ] CI is green and all pack hashes match the manifest.
- [ ] I understand that violating doctrine disqualifies the contribution.


Missing or altered checkboxes reject the PR automatically.

This is the oath.

🟦 7. Style Guide (Brief)
JavaScript / TypeScript:

prefer const

pure functions when possible

no implicit mutations

minimum lines to express intent

comment decisions, not mechanics

Code Should:

read like architecture, not hacks

preserve clarity over cleverness

survive audits for decades

🟪 8. License

All contributions are governed by:

NEO Core — L1 License (Perception Layer License)
See: LICENSE.

By submitting a PR, you agree that:

your contribution must remain doctrinally compliant

your work will be bound by this license

you do not obtain rights to the NEO brand, name, or marks

🟧 9. Final Note

NEO Core exists to protect people without surveillance.
This repository is the crypt of the cathedral — the lowest, strongest stonework.
If your change weakens the stone, it does not enter the wall.

Build with intention.
Cut clean joints.
Leave no cracks for future generations to inherit.

Welcome, mason.