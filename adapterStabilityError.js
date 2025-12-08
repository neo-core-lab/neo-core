// ======================================================================
// NEO UMBRELLA LICENSE — ADAPTER STABILITY UTILITY
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// This file defines AdapterStabilityError, used exclusively when a
// platform DOM change breaks an adapter's assumptions.
//
// ZERO-LOG REQUIREMENT:
// - This error MUST NEVER contain user content, raw HTML, or PII.
// - It may only contain structural metadata (platform, selectors,
//   high-level reason) suitable for CI logs and developer debugging.
//
// Any attempt to include raw text, HTML, or user-identifying data in
// this error violates the NEO Umbrella License and is grounds to void
// all granted rights for the offending implementation.
// ======================================================================

export class AdapterStabilityError extends Error {
  /**
   * @param {Object} params
   * @param {'ig'|'x'|'yt'} params.platform    - Platform identifier
   * @param {string} params.reason             - High-level failure reason (no user content)
   * @param {string[]} [params.selectors]      - Selectors that failed (no raw HTML)
   * @param {string} [params.adapterName]      - e.g. "IGAdapter-v1.0.0"
   */
  constructor({ platform, reason, selectors = [], adapterName = 'unknown' }) {
    const safeReason = `[${platform}] Adapter stability failure: ${reason}`;
    super(safeReason);

    this.name = 'AdapterStabilityError';
    this.platform = platform;
    this.reason = reason;
    this.selectors = selectors;
    this.adapterName = adapterName;
    this.timestamp = Date.now();

    // Ensure no accidental HTML dump sneaks in:
    Object.freeze(this);
  }
}

/**
 * Guard helper — use inside adapters when DOM assumptions fail.
 * Example:
 *   throw adapterStabilityGuard({
 *     platform: 'ig',
 *     reason: 'Root comment container not found',
 *     selectors: ['[role="article"] [aria-label="Comments"]'],
 *     adapterName: 'IGAdapter-v1.0.0'
 *   });
 */
export function adapterStabilityGuard(params) {
  return new AdapterStabilityError(params);
}
