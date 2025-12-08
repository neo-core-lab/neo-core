==============================================================
🟩 NEO UMBRELLA SYSTEM — L1 PERCEPTION LAYER (NEO CORE)
==============================================================
Document Class: ENGINEERING README • ARCHITECTURE SPEC • MASON’S OATH
Layer: L1 — Client-Side Perception Layer (Instagram, YouTube, X/Twitter, Reddit, TikTok, Snapchat, and future platforms as adapters are added)
Governance Basis: Umbrella Charters (Zero-Log, Zero-Storage, Zero-Surveillance,  
Non-Substitution Mandate, Child-Protection Doctrine, Founder Sovereignty Charter)
Protection Status: PUBLIC • DOCTRINE-BOUND • IMPLEMENTATION-CRITICAL
Signature Authority for Doctrine Changes: FOUNDER-KEY ONLY
==============================================================

© 2023–2025 Luciana Fisher. All Rights Reserved.

# NEO Core — Perception Layer  
*Client-side emotional firewall for Instagram, YouTube, X/Twitter, Reddit, TikTok, Snapchat, and all future supported platforms*  
**Zero-Log • Zero-Storage • Zero-Surveillance • On-Device Only**

NEO is not an “AI feature” or a growth hack.

NEO is a **Perception Layer** — a shield that veils hostile patterns in comment streams with affirmations and micro-facts, without logging, storing, or transmitting a single syllable of user text.

This document is not just documentation.  
It is **architecture, governance, and oath**.

---

## 0. Pledge to Engineers

You are **not** building a feature.  
You are **dressing a stone** that must fit for decades.

If any doctrine below is violated, the stone is **rejected** —  
no debate, no workaround, no “quick fix.”

NEO is a cathedral.  
You are shaping load-bearing blocks.

---

## 1. Clone & Build in 60 Seconds

```bash
git clone https://github.com/your-org/neo-core.git
cd neo-core
npm ci
npm run build       # outputs ./dist/extension
npm run test:ci     # must exit 0 before you push
Then:

Open chrome://extensions

Enable Developer mode

Click Load unpacked

Select ./dist/extension

You should see the veil appear on Instagram and YouTube comments,
with behavior identical to NEO Core 3.0 (hover/tap reveal).

If not, stop. The stone is cracked.

2. Directory Map (Immutable)
text
Copy code
src/
  L0/                 # doctrine – touch == excommunication
    doctrine.js       # zero-log / zero-storage / zero-surveillance traps, child doctrine
  core/               # perception engine – zero DOM
    content.js        # Neo Core 4.0 main content script
    eventBus.js       # local-only decision event stream
  adapters/           # only stones allowed to touch the page
    instagram/
      index.js        # IGAdapter
      selectors.js
      stability.js
    youtube/
      index.js        # YouTubeAdapter
      selectors.js
      stability.js
    x/
      index.js        # X/TwitterAdapter
      selectors.js
      stability.js
packs/                # read-only, content-hashed Living Library JSON
  packManifest.json
  neuro-affirm-v1.7429f3.json
  stoic-shield-v1.1a8e2c.json
dist/extension/       # the single stone you hoist into the browser
Do not rearrange these directories.
Separation = sovereignty.

3. Layered Architecture — L0 → L1 → L2 → L3
NEO must be built as a layered perception system, not a monolith.

L0 — Doctrine Layer (Non-Executable Ethical Spine)
Zero-Log Doctrine

Zero-Storage Doctrine

Zero-Surveillance Mandate

Non-Substitution Mandate

Child-Protection Doctrine

Synthetic-Manipulation Safeguards

Founder Sovereignty Charter

L0 sits beneath all code.
No layer may violate or bypass L0.

L1 — Perception Layer (Current Implementation: NEO Core 4.0)
The system you are building now.

Responsibilities:

Read platform substrate via adapters only (no direct DOM in core).

Perform ephemeral perception (geometry, patterns, classification).

Apply Living Library veils.

Emit NeoEvents with decision metadata only.

Never log, store, or transmit user text.

L1 is the shield that touches platforms.

L2 — Meta-Perception Layer (Future)
Not implemented yet, but L1 must be architected so L2 can exist without refactors.

L2 will:

Observe decision events only, not user content.

Audit adapter health and DOM drift.

Validate doctrinal compliance.

Apply jurisdictional overlays where required.

Provide regulatory and research visibility without accessing text.

L3 — Application Layer (Future: NEO Web, NEO Studio, Dashboards)
Not implemented in this repo, but your work must enable it.

L3 will:

Host NEO Web (humane websites, dashboards, tools).

Host NEO Studio (children’s media, cognitive resilience animations).

Build rich apps on decision streams, not on content.

L3 may be heavy, server-backed, GPU-assisted —
but it never weakens L0–L1 or forces NEO Core to phone home.

4. L0 — Doctrine Layer (Zero-Log / Zero-Storage / Zero-Surveillance)
Create src/L0/doctrine.js:

js
Copy code
// src/L0/doctrine.js
export const ZERO = Object.freeze({
  log:   () => { throw new Error("L0: zero-log violation"); },
  store: () => { throw new Error("L0: zero-storage violation"); },
  send:  () => { throw new Error("L0: zero-surveillance violation"); },
});

export const DOCTRINE = Object.freeze({
  ZERO_LOG: "NO_USER_TEXT_LOGGING",
  ZERO_STORAGE: "NO_USER_TEXT_STORAGE",
  ZERO_SURVEILLANCE: "NO_USER_TEXT_TELEMETRY",
});
4.1 Non-Negotiable Cornerstones
Rule	Enforcement
Zero-Log	Any logging of user text → CI fails
Zero-Storage	localStorage / IndexedDB / files contain comment text → fail
Zero-Surveillance	Network calls with comment text or identifiers → fail
On-Device Only	Packs + WASM load via chrome.runtime.getURL only
Non-Substitution	NEO is not parent, therapist, priest; no behavior-shaping
Child-Protection	Grooming, sextortion, coercive patterns always veiled; ordinary teen conflict never censored

If a change violates doctrine:

No justification matters.

The stone does not go into the wall.

5. L0 — Child Protection Doctrine (Long-Horizon, Courtroom-Solid)
Purpose
NEO exists to protect minors from exploitation, not to supervise their lives.
NEO may fail conservatively; it may never become surveillance “for their own good.”

§1 — Scope of Protection
“Minor” = any user reasonably believed to be under legal adulthood in their jurisdiction.

NEO protects minors from:

grooming and sexual coercion

sextortion and image-based abuse

sustained bullying with power asymmetry

predatory adults, brands, bots, or synthetic actors

algorithmic and economic systems that target minors’ vulnerabilities for profit

NEO operates on patterns of behavior, not on identity labels.

§2 — Harm Hierarchy & Asymmetry
When interactions involve a minor and:

an adult

a brand, platform, or institutional account

a synthetic or bot account

a significantly more powerful social actor

NEO must treat the minor as the protected party and bias decisions toward insulation.

NEO does not adjudicate who is right in a conflict;
it identifies and veils exploitative patterns.

§3 — Conflict vs Development
NEO must preserve:

peer conflict as a developmental process

strong emotional expression

adolescent experimentation with language and identity

NEO shall not:

act as moral authority

police ordinary teen arguments

suppress non-exploitative, mutual social friction

Where the pattern is ambiguous, NEO prefers under-labeling harm over pathologizing normal development.

§4 — No Surveillance Safety Trade
NEO SHALL NOT:

log, store, or transmit minors’ messages or content “for safety analysis”

create behavioral or emotional profiles of minors

provide forensic logs of comment bodies for platforms or law enforcement

If full compliance with this doctrine is impossible under a new law or platform regime, NEO must disable features rather than introduce surveillance.

NEO’s position is:
“We protect children without surveillance or we do not operate.”

§5 — Future-Proof Harm Definition
This doctrine applies to any future medium where NEO runs:

text comments, DMs, chats

video overlays, AR/VR spaces, avatar worlds

AI companions, mixed reality interfaces

future modalities not yet invented

If a system can:

solicit nudes

coerce behavior

manipulate a child’s self-worth, security, or body image

pressure them into financial or sexual exploitation

then it falls under NEO’s protective scope — regardless of format or technology.

§6 — Immutable Amendment Rule
The Child Protection Doctrine may only be amended if:

Approved by the Founder-Key AND

Recorded in a public, human-readable log AND

Explicitly increases, never reduces, child protection

Any attempt to weaken:

Zero-Log

Zero-Storage

Non-Substitution

No-Surveillance-Trade

terminates the right to use the “NEO” name, mark, and brand.

Forks that violate this doctrine are not NEO, even if they reuse code.

6. Adapter Contract (Single Source of Truth)
Adapters are the only code allowed to touch platform DOM.

Implement exactly:

ts
Copy code
interface AdapterPacket {
  id: string;
  platform: "ig" | "youtube" | "x";
  text: string;
  meta?: {
    isReply?: boolean;
    authorHandle?: string | null;
    timestampLabel?: string | null;
    [key: string]: any;
  };
}

interface AdapterInfo {
  name: string;
  platform: "ig" | "youtube" | "x";
  version: string;     // semver
  adapterHash: string; // build hash
}

## Current Adapter Targets (Engineering Priority — Phase 1)

While NEO Core is architecturally platform-agnostic, the first production adapters
being actively engineered are:

1. **Instagram (IGAdapter)**
2. **YouTube (YTAdapter)**
3. **X/Twitter (XAdapter)**

These three platforms form the initial L1 deployment because:
- they expose the highest volume of hostile comment patterns,
- they represent the most common youth-exposure risk vectors,
- their DOM structures allow stable early adapter development,
- they provide the strongest foundation for CI selector-drift testing.

All additional platforms (Reddit, TikTok, Snapchat, Twitch, Discord, etc.)
will follow the exact same adapter contract and stability-guard rules.

interface Adapter {
  init(root?: Document | HTMLElement): Promise<void>;          // throws AdapterStabilityError
  watch(cb: (p: AdapterPacket) => void): void;                 // live stream of comment packets
  stop(): void;
  restoreOriginal(id: string): void;
  getInfo(): AdapterInfo;
}
If the platform DOM drifts:

js
Copy code
throw adapterStabilityGuard({
  platform,
  reason,
  selectors,
  adapterName
});
Rules:

No silent degradation

No dynamic selector guessing

No fallback scraping

Cathedrals collapse when stones “mostly fit.”

7. Core Contract — Zero DOM
src/core/content.js must never call querySelector, innerText, or any DOM method.

Core loads:

js
Copy code
const NeoSDK  = await import(chrome.runtime.getURL("core/neo.class.js"));
const adapter = await import(chrome.runtime.getURL(`adapters/${host}.js`));
Core responsibilities only:

Normalise text

Run emoji / repetition geometry

Optionally ask NeoSDK for toxicity score

Select a veil line from packs

Emit a decision event

Instruct adapter / DomHelper to apply veil

Core may store only:

ts
Copy code
Map<id, originalText>
for the sole purpose of restoreOriginal.

Anything else is a doctrine violation.

8. Packs — Living Library (Frozen Relics)
Packs are read-only relics; they are never mutated at runtime.

8.1 File Format
Filename must contain a content hash:

text
Copy code
packs/
  neuro-affirm-v1.7429f3.json
  stoic-shield-v1.1a8e2c.json
Example:

json
Copy code
{
  "id": "neuro-affirm-v1",
  "entries": [
    { "text": "Your nervous system deserves safety." },
    { "text": "You are not the sum of other people’s projections." }
  ]
}
packManifest.json:

json
Copy code
{
  "neuro-affirm-v1": {
    "file": "neuro-affirm-v1.7429f3.json",
    "sha256": "…"
  }
}
The build system computes SHA-256 for every pack.
Any mismatch between pack files and packManifest.json → CI fails.

8.2 Runtime Usage
Core:

Reads packManifest.json.

Resolves packId → filename.

Fetches via chrome.runtime.getURL(filename).

Filters/selects entries.

Never fetches arbitrary URLs or remote pack definitions.

Packs are relics, not logs.

9. Neo Event Protocol — Local-Only Decision Stream
NEO emits decision-level events, not content.

Example event:

json
Copy code
{
  "layer": "L1",
  "decision": "VeilApplied",
  "platform": "youtube",
  "commentId": "yt-49281",
  "packId": "neuro-affirm-v1",
  "reason": {
    "toxicScore": 0.24,
    "emojiGeometry": { "badCluster": true }
  }
}
Properties:

No user text

No full handle strings

No timestamps that reconstruct the conversation

src/core/eventBus.js:

js
Copy code
// src/core/eventBus.js
const bus = (() => {
  const listeners = new Set();
  return {
    emit: (event) => { listeners.forEach(l => l(event)); },
    tap:  (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
})();

export function emitNeoEvent(event) {
  // event contains no user text
  bus.emit(event);
}

export function tapNeoEvents(listener) {
  return bus.tap(listener);
}
The event bus is closed-scope inside the content script.
Future L2 layers may tap via chrome.runtime.sendMessage, preserving an air-gap.

10. CI — Nightly Mason’s Audit
CI is the cathedral inspector.

Job	Fail Condition
Selector Drift	Puppeteer/Playwright hash of comment subtree ≠ last nightly
Doctrine Lint	console.log(text), fetch(text), localStorage, etc.
Pack Integrity	SHA-256 mismatch between pack files and manifest
Visual Regression	SSIM < 0.999 vs Neo Core 3.0 baseline
Unit Tests	Any red

On CI failure, GitHub auto-opens an issue with:

Platform

Adapter

Tombstone hash (DOM signature)

Selectors to re-cut

The next mason knows exactly which stone cracked.

11. Ship Checklist (Release Gate)
Copy into every release issue:

 dist/extension loads unpacked with zero warnings

 IG + YT veil/reveal pixel-identical to Neo Core 3.0 baseline

 X adapter throws AdapterStabilityError when DOM drifts

 Network tab shows zero comment text leaving the device

 Console shows zero user text

 Pack hashes match packManifest.json

 attestation.json signed with founder GPG key

Release is complete only when all boxes are checked.

12. Cathedral Scale – Why Tiny Core Bears Decades
NEO Core is ~2 137 lines by design.
Small is not weakness – it is the only sane foundation for iOS / www / Disney-level lifespan.

Layer split:

Infrastructure – Core (zero-log runtime)

Protocol – Umbrella Charters (immutable rules)

Mythos – Studio / packs / stories (assets explode, never runtime)

If Core ever grows past audit-by-one-human-in-one-day, the stone is cracked.

13. Courtroom Immunity & Zero-Disclosure Architecture
NEO’s doctrines are courtroom-solid against compelled disclosure because there is nothing to disclose.

13.1 Zero-Log + Zero-Storage + Zero-Transmission
No user text is written to disk, memory-mapped files, or network.

A subpoena can only compel what exists; NEO deliberately never holds it.

Even a live forensic RAM capture reveals, at most, ephemeral Map<id,string> entries that vanish when the tab closes.

13.2 On-Device Perception
All classification runs inside the content-script sandbox.

No cloud endpoint, no analytics beacon, no telemetry blob.

No platform, ISP, or state actor can intercept content through NEO —
NEO never emits it.

13.3 Minimal Event Stream
Internal NeoEvent carries:

decision type ("VeilApplied", "SevereHarm", etc.)

numeric scores / flags (e.g. toxicScore, emojiGeometry.badCluster)

No user text.
No handles.
No reconstructive timestamps.

Even if mirrored to a future L2 layer, events remain legally benign.

13.4 Jurisdictional Stress-Test
U.S. (Stored Communications Act)
NEO stores no communication content → no SCA exposure as an ECS.

EU (GDPR)
No personal data retained → no subject access, no deletion workload, no cross-border transfer.

UK (Online Safety Act)
NEO is user-side safety tech, not a platform; no statutory duty to scan, store, or report.

Authoritarian regimes
NEO never phones home → nothing to compel.
Worst case: the extension store listing gets blocked; the architecture remains innocent.

13.5 Forensic Edge Cases
RAM dump while tab is open:
Shows only strings already visible on screen — no extra privacy loss.

Browser sync:
NEO avoids storage.sync / storage.local for comment text → nothing syncs.

Malware on device:
Attackers can see what the user sees; NEO does not expand attack surface.

13.6 Legal Realism
Courts love empty chairs.
A subpoena that returns “we possess nothing responsive” is the shortest path to dismissal.

NEO’s architecture guarantees that empty response.

The shield is legally weightless, and therefore courtroom-bulletproof.

14. Serverlessness Mandate — Why NEO Core Can Never Need a Backend
NEO will never need a server for its core function.

14.1 Perception Happens On-Device
Classification, veil selection, and DOM masking run entirely inside the content-script sandbox.

No cloud endpoint is required for these operations.

14.2 Packs Are Shipped with the Extension
Living Library JSON lives in /packs.

Fetched via chrome.runtime.getURL → local file, not network.

Updates occur through the browser’s extension update channel (signed, deterministic, auditable).

14.3 Zero-Telemetry Mandate
The doctrinal layer (src/L0/doctrine.js) forbids:

outbound network calls that carry comment text, metadata, or user identifiers.

A server receiving such data would automatically violate L0.

14.4 Optional, Non-Core Extras (If They Ever Exist)
L2 Audit Dashboard (future):
Could ingest decision-level events (e.g. "VeilApplied", vectors) from a local, user-exported file. No raw text.

Pack mirror CDN:
Static hosting of identical hashed packs.
If unreachable or blocked, the extension falls back to bundled packs.

Both are strictly outside the shielding hot-path.

14.5 Resilience Guarantee
NEO must remain fully functional in an air-gapped browser profile with no internet after initial install.

If a server is required, the shield breaks when offline — unacceptable.
Such a design is rejected.

15. Harm-Blocking Philosophy — Why Perception Beats Moderation
Blocking perception is the oldest, fastest-acting antidote to harm.

A veil is not denial; it is removal of oxygen from the fire.

The shield must be cut so precisely that it starves predators while letting the child breathe — and it must not rot when slang or platform code mutates.

15.1 Ephemeral Perception = Surgical Strike
NEO does see the comment once, in RAM, for milliseconds — long enough to:

measure grooming geometry (secrecy escalation, boundary probes, power asymmetry)

measure semantic cruelty & self-harm prompts

decide veil / no-veil

discard text, retain only decision metadata

Then the original text no longer exists anywhere.

Harm can’t land because nothing is there to catch it.

15.2 Eloquent Harm Is Still Pattern
Sophisticated predators use poetic cruelty and coded language:

Shakespearean insults

twisted religious verses

“you are a collapsing star” instead of “kill yourself”

NEO is trained offline (founder lab) against:

public literary corpora + known harm corpora

synthetic adversary models that generate elegant cruelty

grooming simulation engines that model multi-step arcs (affection → secrecy → coercion)

All training happens off-device.
Weights are frozen, signed, and shipped.
On-device Core only runs inference.
No user learning, no uploading, no memory.

15.3 Decade-Proofing the Veil Engine
Decay Vector	Mason’s Answer
New slang (“unalive”, “mog”)	Emoji + timing + repetition geometry still signal intent; Core updates via store, not telemetry
Platform DOM rewrite	AdapterStabilityError halts; nightly CI tombstones selectors for repair
Legal creep (backdoor demands)	Founder-Key license voids on any surveillance code; L0 doctrine locked by build hash
Cultural drift (new cruelty genres)	Synthetic adversary pipeline updated offline; user opt-in; no data leaves device
Hardware extinction	Standard web extension + WASM + JSON formats → durable across browsers

15.4 The Child Still Sees Something
Veil text is not a black bar:

“Your nervous system deserves safety.”

“Breathe. Progress beats perfection.”

“You are not the sum of other people’s projections.”

Harm is replaced with oxygen.
The child knows something was hidden (⊙ mark), but the cognitive punch never lands.

Predator loses feedback; reward loop breaks.

Severe escalation can escalate to Guardian Mode (local-only).

16. Cross-Cultural Protection: Racism, Misogyny, Xenophobia
NEO treats racism, misogyny, and xenophobia as toxic geometry —
not as ideas to debate, but as harm vectors that lose power when they never reach the eye.

16.1 Detection Layer (Milliseconds, RAM-Only)
Patterns include:

slur clusters (n-word variants, anti-Asian, anti-Muslim, anti-migrant, gendered slurs)

emoji + punctuation (🚫👳‍♂️, 🐒 + flag, “go back ▶️”)

repetition walls (“send her back” × 20)

cross-language romanization (“muzrat”, “femoid”, “gusano”)

eloquent cruelty (synthetic adversarial corpus: Shakespearean racism, Redpill manuals, manifestos)

Inference is on-device.
No text stored, no profiles built.

16.2 Intervention = Veil, Not Lecture
Original:

“You’re a 🐒 and your ‘culture’ is garbage; real Americans hate you.”

Veil:

“Your nervous system deserves safety.”

No rebuttal, no sermon.

Target: shame circuitry never fires.

Bystanders: outrage loop starved.

Author: no visible reward loop.

16.3 Guardian Mode (Local-Only)
If hate vector is severe (high slur density + escalation + off-platform push), Neo may:

mark a severe harm event (local)

surface “Severe hate escalation detected — conversation recommended” to a guardian interface

Still: zero slur text leaves the device.

16.4 Cross-Cultural Safety
Locale-specific packs (Arabic, Spanish, Hindi, etc.) ship offline and update via store, not telemetry.

Reclaimed-word whitelist (e.g. “queer”, “desi”, “latina”) is community-curated and Founder-Key-signed.

Context window may inspect immediate speaker context in memory only; no long-term profiling.

16.5 Non-Substitution Mandate
NEO does not:

teach anti-racism

argue misogyny

explain xenophobia

It simply ensures the punch never reaches the nervous system.

Education remains human: parent, teacher, elder.

“The slur that never reaches the retina is a slur that never reaches the amygdala.”

17. NEO Web & NEO Studio — L3 Application Layer (Upper Floors)
NEO Web + NEO Studio are cathedral apps — rich, Disney-grade experiences — but they must never become the weak buttress that forces NEO Core to phone home.

17.1 Architectural Divorce
Layer	Hosting Need	Doctrine Impact
NEO Core (L1)	❌ zero	Must not be broken by server outage
NEO Web (L3)	✅ heavy	Optional, user-initiated; no comment text involved
NEO Studio (L3)	✅ heavy	Optional; pack authoring only; no child user data

NEO Core must remain fully functional without these.

17.2 Host the Heavy, Keep the Shield Air-Gapped
A. Static-First, Edge-Cached

Serve NEO Web & Studio as pre-built SPA bundles:

Cloudflare R2 + CDN

AWS S3 + CloudFront

All assets (packs, textures, sounds) are public, content-hashed, immutable.

No auth wall for read-only assets.
OAuth only for save/export/billing; no comment text ever handled.

B. GPU / Real-Time Collaboration (Optional)

For heavy creative workloads (Studio):

Neocloud / similar GPU K8s for:

real-time multiplayer scenes

AI-assisted pack generation

Constraints:

container-per-session

ephemeral RAM-only volumes

no persistent disks → nothing to seize

Core shield continues to function if this entire infra disappears.

C. User Data Flow (L3 Only)

Action	Data Leaving Device	Doctrine Check
Save project	Pack metadata + veil lines	✅
Export pack	JSON + hashed assets	✅
Real-time co-edit	cursors, pack diffs	✅
Publish to NEO Web gallery	public pack JSON	✅
“Improve my pack with AI”	veil lines only (no original comments)	✅

Explicit consent banners before any write path.

Default = off; NEO Core shield unchanged.

17.3 Offline / Air-Gap Mode (Studio)
NEO Studio can ship as Electron + local WASM.

Users can:

author packs offline

export signed ZIP

side-load into Core without internet

CI enforces studio.offline: true builds that pass doctrine lint.

17.4 Governance Guard-Rails
Founder-Key signed container images (cosign)

Reproducible builds for Docker images (bit-for-bit verification)

Transparent egress logs for Studio/Web services

Kill-switch: one Terraform destroy can zero all cloud resources; Core remains functional.

17.5 Cost & Scale Snapshot (Illustrative, 2025)
Service	Monthly @ 10k DAUs	Monthly @ 1M DAUs
Cloudflare R2 + CDN	~$12	~$1,200
Neocloud GPU (spot)	~$80 (optional)	~$8,000 (optional)
S3 + CloudFront fallback	~$15	~$1,500
Core Shield Cost	$0	$0

If every cloud server vanishes tomorrow, NEO Core must still veil comments on an air-gapped laptop.

18. Neo Studio — Upper Layer of the Cathedral
Neo Studio is not part of L1.
Neo Studio is enabled by L1.

It will:

create humane children’s animations

offer non-addictive learning & micro-lessons

build neurodivergent-friendly content

wrap kids’ media in emotional safety

use packs as narrative & educational seeds

Neo Studio never:

touches platform DOM

sees comment text

requires NEO Core to send anything upstream

Neo Studio consumes only L1/L2 decision streams or human-created content.

“The masons who built the crypt never lived to see the stained glass —
but without their stone, no light would ever have entered.”

Your work on NEO Core is the crypt.
Neo Studio will be the stained glass.

19. PR Ritual — The Mason’s Oath
Every pull request must include:

1. Stonecutter’s Note (≤ 50 words)
A short explanation of what joint you carved, and why.

2. Cathedral Test
A ≤ 10s screen capture showing veil / reveal on a real Instagram or YouTube thread.

3. Doctrine Affidavit
Copy-paste exactly:

md
Copy code
- [ ] I have not logged, stored, or transmitted any user text.
- [ ] I have touched the DOM only through the adapter assigned to me.
- [ ] CI is green and attestation.json is signed with founder key.
A missing checkmark rejects the PR.
This is the oath.

20. Last Words
“And the stone rejected by the builders will become the cornerstone.”

Build it once.
Build it right.

The child scrolling tonight should never know your name —
only that the shield held.



