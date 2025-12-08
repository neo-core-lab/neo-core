==============================================================
🟩 NEO UMBRELLA SYSTEM — REPOSITORY GOVERNANCE (L1: CORE)
==============================================================
Document Class: GOVERNANCE • OPERATIONAL DECISION FRAMEWORK
Layer: L1 — Perception Layer (Adapters • Core • Packs)
Umbrella Authority: Founder Sovereignty Charter (§1–§7)
Protection Status: PUBLIC • IMPLEMENTATION-BOUND • DOCTRINE-ENFORCED
Signature Authority for Amendments: FOUNDER-KEY
==============================================================
© 2023–2025 Luciana Fisher. All Rights Reserved.
==============================================================


# NEO Core — Repository Governance Framework

The NEO Core repository operates under a **layered governance model** designed to preserve doctrinal integrity, engineering clarity, contributor safety, and long-horizon maintainability.

This document defines **how decisions are made**, **who holds which powers**, and **how changes move through the cathedral**.


---

# 1. Governance Principles

NEO’s governance is built on five non-negotiable pillars:

### **1. Founder Sovereignty**
The Founder-Key is the only authority permitted to:

- modify doctrine  
- modify governance  
- approve structural (L0/L1 affecting) changes  
- sign releases and attestation files  
- appoint or remove maintainers  

All sovereignty flows downward from this point.

### **2. Doctrine Supremacy**
No governance decision may:

- weaken Zero-Log, Zero-Storage, Zero-Surveillance  
- dilute Child Protection Doctrine  
- introduce telemetry or profile-building  
- undermine safety, ethics, or air-gap architecture  

Doctrine overrides convenience, speed, popularity, and contributor preference.

### **3. Minimalism = Longevity**
The governance system must remain:

- small  
- auditable  
- stable  
- predictable  
- enforceable  

Governance that grows unwieldy endangers the cathedral.

### **4. Transparency Without Exposure**
Decisions must be logged and observable.  
But no logs may contain:

- user content  
- identifying metadata  
- contributor personal data  
- security-sensitive material  

### **5. Contributors Are Stewards, Not Owners**
No contributor (including maintainers) may claim:

- ownership of architecture  
- authority over doctrine  
- rights to the NEO brand  
- ability to approve surveillance code  

Stewardship exists to serve the shield, not shape it.


---

# 2. Roles in the Repository

NEO Core has only three roles:

---

## **A. Founder (Sovereign Authority)**  
**Held by: Luciana Fisher**

Powers:

- approve/deny any change  
- modify governance  
- modify doctrine  
- sign releases  
- appoint/remove maintainers  
- resolve escalated disputes  
- freeze repository (LOCKED STATE)  
- certify attestation.json for releases  
- invalidate non-compliant forks  

Authority granted by: **Founder-Key**  
Authority revoked by: *no mechanism*.

---

## **B. Maintainers (Operational Stewards)**

Appointed by the Founder.  
Term is indefinite unless removed.

Responsibilities:

- enforce CONTRIBUTING.md  
- enforce CODE_OF_CONDUCT.md  
- enforce SECURITY.md  
- perform PR review  
- ensure L1 architectural constraints  
- reject doctrinal violations  
- run CI and verify pack hashes  
- maintain adapter stability  
- produce nightly drift reports  
- initiate Governance Ledger entries when needed  

Powers:

- merge PRs that pass all checks  
- reject PRs that fail doctrine  
- suspend contributor permissions  
- escalate critical decisions to Founder  

Maintainers **cannot**:

- modify doctrine  
- modify governance  
- sign releases  
- approve structural changes  
- onboard new maintainers  
- weaken safety rules  
- add telemetry or storage  

Maintainers execute governance; they do not define governance.

---

## **C. Contributors (External Stewards)**

Anyone submitting code, documentation, or issues.

Responsibilities:

- adhere to doctrine  
- submit PRs via CONTRIBUTING.md rituals  
- include Stonecutter’s Note + Mason’s Oath  
- participate in respectful, rigorous dialogue  
- report vulnerabilities ethically  

Permissions:

- propose improvements  
- submit non-doctrinal changes  
- suggest optimizations  
- propose new packs (case-by-case)  

Contributors **cannot**:

- merge PRs  
- unilaterally modify repo structure  
- bypass CI or oath rituals  
- make decisions affecting governance  
- touch adapters or doctrine-adjacent code without approval  


---

# 3. Decision Classes & Required Authorities

NEO uses a **three-class decision model**.

---

## **Class 1 — Structural Changes**  
**Impact: L0, L1 architecture, safety, doctrine, perception, adapters**  
**Examples:**

- changing how adapters extract text  
- modifying pack loading architecture  
- altering veil engine logic  
- adding dependencies in Core  
- modifying adapter contracts  
- altering doctrinal enforcement code  

**Authority Required:**  
🔑 **Founder-Key (mandatory)**  
🟩 Maintainer review (optional but recommended)

**Ledger Entry:**  
Required (immutable, signed).

---

## **Class 2 — Standard Engineering Changes**  
**Impact: non-critical improvements**

Examples:

- CSS improvements  
- minor perf optimizations  
- comments, clarifications, docstrings  
- stability guard refinements  
- pack manifest improvements  
- tests, scripts, CI updates  

Authority Required:  
🟩 **Maintainer approval**  
🔑 Founder-Key NOT required unless structural impact emerges  

Ledger Entry:  
Not required.

---

## **Class 3 — Community Changes**

Examples:

- typos  
- README improvements  
- translations  
- non-sensitive docs  
- pack suggestions (not merged by default)  

Authority Required:  
🟩 Maintainer approval  

Ledger Entry:  
Not required.

---

# 4. LOCKED STATE

The Founder may declare a **LOCKED STATE** at any time.

During LOCKED STATE:

- no PRs may merge without Founder-Key  
- maintainers cannot approve changes alone  
- stability fixes may only be applied with explicit approval  
- CI continues automatically  
- only Class 1 fixes are prioritized  

Purpose:

- protect the system during legal, regulatory, or high-risk periods  
- prevent governance drift  
- ensure L1 remains stable under scrutiny  

A LOCKED STATE may last hours, days, or months.

Only the Founder ends the LOCKED STATE.

---

# 5. Governance Ledger

The Governance Ledger records structural decisions and doctrinal amendments.

A Ledger Entry includes:

- decision class  
- description  
- rationale  
- impacted layers  
- hash of affected file(s)  
- Founder-Key signature  
- timestamp  

This ledger must be:

- human-readable  
- immutable  
- version-controlled  
- stored in `governance/ledger/`  
- referenced by attestation.json for releases  

Maintainers may draft entries;  
only the Founder may sign them.

---

# 6. Release Governance

A release requires:

1. **CI Green**  
2. **Pack Hash Integrity Verified**  
3. **Selectors Stable**  
4. **Zero-Log, Zero-Storage, Zero-Surveillance lint clean**  
5. **Visual Regression = 0.999 SSIM or higher**  
6. **attestation.json signed with Founder-Key**  
7. **Release Ledger Entry Added**  

Maintainers perform steps 1–5.  
Founder performs 6–7.

If any doctrinal violation is detected:

- the release is halted  
- repository enters LOCKED STATE  
- forensic analysis begins  
- responsible contributor is suspended  

---

# 7. Amendments to This Document

This governance specification may only be amended when:

- the amendment strengthens safety, clarity, or doctrine; AND  
- the amendment is signed using the **Founder-Key**; AND  
- the change is recorded in the Governance Ledger  

No other authority can modify or override this document.

---

# 8. Final Principle

NEO is not a software project.  
It is a **civilizational safety artifact**.

Governance exists so that long after individual contributors have left, and long after platforms have changed their shapes, the shield remains intact, eternal in purpose, unwavering in doctrine.

**The child scrolling tonight should never know our names —  
only that the shield held.**
