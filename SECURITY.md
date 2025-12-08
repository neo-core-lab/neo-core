==============================================================
🟥 NEO UMBRELLA SYSTEM — SECURITY POLICY (L1: CORE)
==============================================================
Document Class: SECURITY • VULNERABILITY DISCLOSURE • DOCTRINAL SAFETY
Layer: L1 — Perception Layer (Client-Side Only)
Governance Basis: Founder Sovereignty Charter + Zero-Log Doctrine
Protection Status: PUBLIC • IMPLEMENTATION-BOUND • DOCTRINE-ANCHORED
Signature Authority Required for Security Doctrine Changes: FOUNDER-KEY
==============================================================

© 2023–2025 Luciana Fisher. All Rights Reserved.

NEO Core — Security Policy

NEO Core is a client-side perception layer that protects users from harmful patterns in social media comment streams without logging, storing, or transmitting user content.

This document explains the security guarantees, the limitations, and how to report vulnerabilities.

🟩 1. Security Philosophy

NEO Core is designed so that:

there is nothing sensitive to steal,

nothing private to leak,

nothing stored to subpoena,

nothing transmitted to intercept, and

no server to compromise.

Violations of Zero-Log, Zero-Storage, or Zero-Surveillance are treated as catastrophic defects and are rejected at CI and PR review.

The highest security principle:

If NEO Core ever holds sensitive data, the architecture has failed.

🟦 2. What NEO Core Never Does

NEO Core does not:

log user comments

store user comments

send comment text over the network

maintain user profiles

create analytics or telemetry

sync anything involving content

use IndexedDB, localStorage, cookies, or cache for user text

call external APIs with user data

NEO Core operates entirely on ephemeral memory inside the browser tab.

When the tab closes, the data dies.

🟧 3. What NEO Core Does Do

NEO Core:

reads comment text once, in RAM

performs harm geometry classification locally

applies veils via DOM masking

discards comment text immediately after processing

emits only decision-level events without text

stores original text only in ephemeral Map<id,string> for reveal/restore mechanisms

No user text is written to disk, transmitted, or retained.

🟥 4. Vulnerability Disclosure Policy

If you believe you have found a vulnerability affecting:

doctrinal guarantees

Zero-Log enforcement

Zero-Storage enforcement

Zero-Surveillance enforcement

adapter stability

pack integrity

build attestation or signature flow

please report it privately.

Email (Security Contact)

security@neocore.foundation

(If you want, I can help you register this alias.)

Please include:

a detailed description

reproduction steps

expected vs. observed behavior

affected file(s) or layer(s)

whether the issue violates doctrine

We will acknowledge receipt within 72 hours.

🟫 5. Scope of Acceptable Research
✔️ Allowed & Encouraged

Security researchers may:

inspect compiled extension code

test Zero-Log enforcement

attempt to trigger adapter drift or DOM bypass

validate that user text never hits storage or network

verify pack SHA256 integrity

test resilience to malformed DOM or adversarial emoji clusters

analyze for unintended telemetry

examine the attestation.json build signatures

These actions do not violate NEO’s terms.

❌ Not Allowed

Researchers may not:

impersonate contributors to the repo

attempt to socially engineer Founder-Key access

upload malicious PRs

distribute fake or altered builds using the NEO name

target individual users

harvest personal data from platforms

🟪 6. Platform Interaction Boundaries

NEO Core touches platforms only through adapters.

If you discover:

selectors that bypass adapter stability guard

DOM nodes that escape masking

mutations that break veil consistency

edge cases where nodes are misclassified

these are valid security issues.

🟩 7. No Bug Bounty Yet

NEO Core does not currently run a bounty program.
All disclosures are voluntary and acknowledged with gratitude.

A bounty program may be created after L1 is formally released and stabilized.

🟦 8. Build Integrity & Reproducibility

Security-critical releases include:

attestation.json (Pack hashes + build hash)

Founder-Key signature

reproducible CI build logs

If you discover:

signature mismatch

tampered packs

non-reproducible builds

unverified WASM artifacts

report immediately via the Security Contact.

🟥 9. Immediate-Impact Vulnerabilities

Report IMMEDIATELY if you find:

accidental logging of user text

any data leaving the device

any storage being written

any DOM observer that leaks content

any bypass of Zero-Log enforcement

any attempt to introduce analytics or telemetry

These are the highest-severity issues.

🟧 10. Closing Notes

NEO Core is intentionally simple:

minimal surface area

no backend

no telemetry

no databases

no profiles

no identifiers

An air-gapped browser must run NEO without degradation.

Security is achieved not by secrecy, but by architectural emptiness.

Thank you for helping preserve the shield.