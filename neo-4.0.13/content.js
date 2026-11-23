/**
 * NEO — Nervous-system–first browsing
 * ----------------------------------
 * Creator & Architect: Luciana Fisher
 *
 * This file powers the core veiling and reveal logic for NEO.
 * It is intentionally designed to:
 *   • Protect the user’s nervous system
 *   • Run entirely on-device
 *   • Avoid data collection, logging, or tracking
 *   • Give control back to the user over when content is revealed
 *
 * IMPORTANT DESIGN NOTES:
 * -----------------------
 * • YouTube veiling logic is STABLE and MUST NOT be modified.
 * • Instagram veiling logic is carefully scoped to comment threads only.
 * • Core fallback text exists as a safety net when packs are unavailable.
 * • Language layers (e.g. PT-BR) are content-only and do not affect logic.
 *
 * This is not engagement software.
 * This is not behavior modification.
 * This is infrastructure for calm.
 *
 * © 2025 Luciana Fisher — NEO - All rights reserved.
 * Shared for demonstration and evaluation purposes.
 */

(() => {
    const DEFAULTS = {
        enableAutomationBadge: true,
        autoTag: "#auto",
        rescanMs: 900,
        activePack: "core"
    };

    let SETTINGS = { ...DEFAULTS };

    // Hover-capable desktop?
    const IS_HOVER_DEVICE =
        !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);

    const PACK_CACHE = Object.create(null);
    const normSpaces = (s) => (s || "").replace(/\s+/g, " ").trim();

    // ---------- Packs (case-tolerant filenames; ignores index) ----------
    async function fetchPackJson(packName) {
        const candidates = [
            `packs/${packName}.json`,
            `packs/${packName}.JSON`,
            `packs/${packName.toLowerCase()}.json`,
            `packs/${packName.toUpperCase()}.JSON`
        ];
        for (const rel of candidates) {
            try {
                const res = await fetch(chrome.runtime.getURL(rel));
                if (res.ok) return await res.json();
            } catch { }
        }
        return null;
    }

    async function loadPack(packName, depth = 0) {
        if (!packName) return [];
        if (depth > 4) return [];
        if (packName === "index") return [];
        if (PACK_CACHE[packName]) return PACK_CACHE[packName];

        const data = await fetchPackJson(packName);
        if (!data) {
            PACK_CACHE[packName] = [];
            return [];
        }

        // meta-pack
        if (data && Array.isArray(data.packs)) {
            let merged = [];
            for (const child of data.packs) {
                const childEntries = await loadPack(child, depth + 1);
                if (childEntries.length) merged = merged.concat(childEntries);
            }
            PACK_CACHE[packName] = merged;
            return merged;
        }

        const raw = Array.isArray(data) ? data : (Array.isArray(data.entries) ? data.entries : []);
        const entries = raw
            .map((e) => {
                if (typeof e === "string") return e.trim();
                if (e && typeof e.text === "string") return e.text.trim();
                return "";
            })
            .filter(Boolean);

        PACK_CACHE[packName] = entries;
        return entries;
    }

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    async function pickVeilLine() {
        const names = (SETTINGS.activePack || "core")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .filter((n) => n !== "index");

        let merged = [];
        for (const n of names) {
            const list = await loadPack(n, 0);
            if (list.length) merged = merged.concat(list);
        }

        if (!merged.length && !names.includes("core")) {
            const core = await loadPack("core", 0);
            if (core.length) merged = merged.concat(core);
        }

        return merged.length ? pickRandom(merged) : "";
    }

    // ---------- Event target helpers (TEXT nodes, etc) ----------
    function asElement(node) {
        if (!node) return null;
        if (node.nodeType === Node.ELEMENT_NODE) return node;
        if (node.nodeType === Node.TEXT_NODE) return node.parentElement || null;
        return node.parentElement || null;
    }

    function maskedClosest(t) {
        const el = asElement(t);
        return el && el.closest ? el.closest("[data-neo-masked='1']") : null;
    }

    // ---------- Reveal / Veil ----------
    function showOriginal(el) {
        el.textContent = el.dataset.neoOriginal || "";
    }
    function showVeil(el) {
        el.textContent = el.dataset.neoVeil || "";
    }

    function bindPerNodeHandlers(el) {
        if (!el || el.dataset.neoBound === "1") return;
        el.dataset.neoBound = "1";

        // Hover reveal (desktop)
        el.addEventListener("pointerenter", () => {
            if (el.dataset.neoMasked === "1" && el.dataset.neoLocked !== "1") showOriginal(el);
        });

        el.addEventListener("pointerleave", () => {
            if (el.dataset.neoMasked === "1" && el.dataset.neoLocked !== "1") showVeil(el);
        });

        // Click toggle fallback (desktop) / Tap toggle (touch)
        el.addEventListener(
            "click",
            (ev) => {
                if (el.dataset.neoMasked !== "1") return;
                ev.preventDefault();
                ev.stopPropagation();

                // Touch: toggle revealed
                if (!IS_HOVER_DEVICE) {
                    const revealed = el.dataset.neoRevealed === "1";
                    if (revealed) {
                        el.dataset.neoRevealed = "0";
                        showVeil(el);
                    } else {
                        el.dataset.neoRevealed = "1";
                        showOriginal(el);
                    }
                    return;
                }

                // Desktop fallback: lock/unlock original on click
                const locked = el.dataset.neoLocked === "1";
                if (locked) {
                    el.dataset.neoLocked = "0";
                    showVeil(el);
                } else {
                    el.dataset.neoLocked = "1";
                    showOriginal(el);
                }
            },
            true
        );
    }

    function isUiJunkText(t) {
        const lower = (t || "").toLowerCase();
        if (!lower) return true;
        if (lower === "reply") return true;
        if (lower.startsWith("view replies")) return true;
        if (lower.startsWith("view all")) return true;
        if (lower === "add a comment..." || lower === "add a comment…") return true;
        if (lower.startsWith("liked by ")) return true;
        if (lower === "more" || lower === "show more" || lower === "show less") return true;
        return false;
    }

    async function veilNode(el) {
        if (!el || el.dataset.neoSeen === "1") return;

        const original = el.textContent || "";
        const clean = normSpaces(original);

        if (!clean) {
            el.dataset.neoSeen = "1";
            return;
        }
        if (isUiJunkText(clean)) {
            el.dataset.neoSeen = "1";
            return;
        }

        const veilLine = await pickVeilLine();
        if (!veilLine) {
            el.dataset.neoSeen = "1";
            return;
        }

        let display = veilLine;
        if (
            SETTINGS.enableAutomationBadge &&
            original.toLowerCase().includes((SETTINGS.autoTag || "#auto").toLowerCase())
        ) {
            display += " ⚙︎";
        }

        el.dataset.neoSeen = "1";
        el.dataset.neoMasked = "1";
        el.dataset.neoOriginal = original;
        el.dataset.neoVeil = display;
        el.dataset.neoRevealed = "0";
        el.dataset.neoLocked = "0";
        el.style.cursor = "pointer";

        el.textContent = display;
        bindPerNodeHandlers(el);
    }

    // ---------- Platform detection ----------
    const onYouTube = () => location.hostname.includes("youtube.com");
    // ---------- YouTube: comment bodies across surfaces ----------
    function getYouTubeCommentBodies() {
        const nodes = document.querySelectorAll(
            "ytd-comment-renderer [id='content-text'], " +
            "ytd-comment-view-model [id='content-text'], " +
            "ytd-comment-thread-renderer [id='content-text']"
        );

        return Array.from(nodes).filter((n) => {
            if (!n || !(n instanceof Element)) return false;
            if (
                !n.closest("ytd-comment-renderer") &&
                !n.closest("ytd-comment-view-model") &&
                !n.closest("ytd-comment-thread-renderer")
            )
                return false;
            const t = normSpaces(n.textContent || "");
            return !!t && !isUiJunkText(t);
        });
    }

    // ========================= 
    // INSTAGRAM — COMMENT-THREAD ONLY (NO BLEED)
    // =========================

    function onInstagram() {
        return location.hostname.includes("instagram.com");
    }

    function getInstagramThreadRoot() {
        // Only when a post is open (modal) OR you're on a post/reel page.
        const dialog = document.querySelector("div[role='dialog']");
        if (dialog) return dialog;

        const p = location.pathname || "";
        const isPostRoute = /^\/(p|reel|tv)\//.test(p);
        if (!isPostRoute) return null;

        return document.querySelector("article");
    }

    function scoreUlAsCommentThread(ul) {
        // Comment threads usually have multiple li's and include time elements
        const lis = Array.from(ul.querySelectorAll("li"));
        if (lis.length < 2) return 0;

        let score = 0;

        for (const li of lis) {
            // comments frequently include time stamps and reply/like controls
            if (li.querySelector("time")) score += 3;
            if (li.querySelector("span[dir='auto'], span[role='text'], span[lang]")) score += 1;

            // avoid nav/menu uls
            if (li.querySelector("nav, header")) score -= 2;
        }

        return score;
    }

    function pickBestCommentsUl(root) {
        const uls = Array.from(root.querySelectorAll("ul"));
        let best = null;
        let bestScore = 0;

        for (const ul of uls) {
            const s = scoreUlAsCommentThread(ul);
            if (s > bestScore) {
                bestScore = s;
                best = ul;
            }
        }

        // Require a minimum score so we don't pick random ULs
        return bestScore >= 6 ? best : null;
    }

    function pickCommentBodySpan(li) {
        // Choose the “body” span: texty, not username links, not buttons
        const spans = Array.from(li.querySelectorAll("span[dir='auto'], span[role='text'], span[lang]"))
            .filter(s => {
                if (!s) return false;
                if (s.closest("a")) return false;       // usernames/links
                if (s.closest("button")) return false;  // UI controls
                if (s.closest("time")) return false;
                if (s.closest("header, nav")) return false;

                const t = (s.textContent || "").trim();
                if (!t) return false;
                if (typeof isUiJunkText === "function" && isUiJunkText(t)) return false;
                if (!/[a-z]/i.test(t)) return false; // avoids “2h”, counts, etc.
                return true;
            });

        if (!spans.length) return null;

        // Longest span is almost always the comment body
        spans.sort((a, b) => (b.textContent || "").length - (a.textContent || "").length);
        return spans[0];
    }

    function getInstagramCommentBodies() {
        const root = getInstagramThreadRoot();
        if (!root) return []; // prevents feed/profile bleed

        const ul = pickBestCommentsUl(root);
        if (!ul) return [];

        const lis = Array.from(ul.querySelectorAll("li"));
        if (lis.length < 2) return [];

        // Skip caption row (first LI) so we don’t veil caption text
        const out = [];
        for (const li of lis.slice(1)) {
            const body = pickCommentBodySpan(li);
            if (body) out.push(body);
        }

        return Array.from(new Set(out));
    }



    // =========================
    // INSTAGRAM — NEW COMMENT PANEL (2026 layout) — SEPARATE SECTION
    // Used only when the original Instagram logic above finds nothing.
    // Covers the pop-out "Comments" panel (reels/posts) and the phone
    // comments page. Captions are skipped: only items with "Reply" count.
    // =========================

    function getInstagramPanelRoots() {
        const hasInput = (r) => !!r.querySelector("textarea, input[placeholder*='omment'], [contenteditable='true']");
        const roots = Array.from(document.querySelectorAll("[role='dialog']")).filter(hasInput);
        if (roots.length) return roots;
        // Phone layout: /p/CODE/comments/ or /reel/CODE/comments/
        if (/^\/(p|reel|reels)\/[^/]+\/comments/.test(location.pathname || "")) {
            const main = document.querySelector("main") || document.body;
            return main ? [main] : [];
        }
        return [];
    }

    function hasReplyControl(unit) {
        return Array.from(unit.querySelectorAll("span, div[role='button'], button"))
            .some(e => normSpaces(e.textContent).toLowerCase() === "reply");
    }

    function getInstagramPanelBodies() {
        const out = [];
        for (const root of getInstagramPanelRoots()) {
            for (const tm of root.querySelectorAll("time")) {
                // Grow from the timestamp to the whole comment block (one timestamp only)
                let unit = tm.parentElement;
                while (unit && unit.parentElement && unit.parentElement !== root &&
                       unit.parentElement.querySelectorAll("time").length === 1) {
                    unit = unit.parentElement;
                }
                if (!unit || !hasReplyControl(unit)) continue; // caption or non-comment

                const spans = Array.from(unit.querySelectorAll("span[dir='auto']")).filter(sp => {
                    if (sp.closest("a, button, [role='button']")) return false; // names, Reply, likes
                    if (sp.querySelector("time") || sp.closest("time")) return false;
                    if (sp.parentElement && sp.parentElement.closest("span[dir='auto']")) return false;
                    const t = normSpaces(sp.textContent || "");
                    if (!t || !/\p{L}/u.test(t)) return false;
                    if (/^(edited|author|pinned|liked by author|see translation|translate)$/i.test(t)) return false;
                    if (/^[\d.,]+[km]?\s+likes?$/i.test(t)) return false;
                    if (isUiJunkText(t)) return false;
                    return true;
                });
                if (!spans.length) continue;
                spans.sort((a, b) => (b.textContent || "").length - (a.textContent || "").length);
                out.push(spans[0]);
            }
        }
        return Array.from(new Set(out));
    }

    // =========================
    // MOBILE YOUTUBE (m.youtube.com) — SEPARATE FROM DESKTOP
    // Desktop YouTube logic above is untouched.
    // =========================

    const onMobileYouTube = () => location.hostname === "m.youtube.com";

    function getMobileYouTubeCommentBodies() {
        const containers = document.querySelectorAll(
            "ytm-comment-renderer, ytm-comment-view-model, ytm-comment-thread-renderer"
        );
        const out = [];
        for (const c of containers) {
            const candidates = Array.from(
                c.querySelectorAll(".comment-text, [class*='comment-text'], .yt-core-attributed-string")
            ).filter((n) => {
                if (n.closest("a, button, header")) return false;
                const t = normSpaces(n.textContent || "");
                return !!t && !isUiJunkText(t) && /\p{L}/u.test(t);
            });
            if (!candidates.length) continue;
            // Comment body is the longest text block in the comment
            candidates.sort((a, b) => (b.textContent || "").length - (a.textContent || "").length);
            out.push(candidates[0]);
        }
        return Array.from(new Set(out));
    }

    // =========================
    // X / TWITTER — REPLIES ONLY ON A POST PAGE (NO FEED BLEED)
    // On /user/status/ID: the main post is the content and stays visible.
    // Every reply is veiled, including the author's own replies,
    // so the whole back-and-forth sits behind NEO.
    // Only post text is veiled; profile photos and handles stay visible.
    // =========================

    function onX() {
        const h = location.hostname;
        return h === "x.com" || h.endsWith(".x.com") || h === "twitter.com" || h.endsWith(".twitter.com");
    }

    // X's own ID for one post card: prefer the analytics link,
    // then the "reply to" link, then the first /status/ link.
    function getXPostId(card) {
        const hrefs = Array.from(card.querySelectorAll("a[href]"))
            .filter(a => a.closest("article") === card)
            .map(a => a.getAttribute("href") || "");
        for (const h of hrefs) {
            const m = h.match(/\/status\/(\d+)\/analytics/);
            if (m) return m[1];
        }
        for (const h of hrefs) {
            const m = h.match(/in_reply_to=(\d+)/);
            if (m) return m[1];
        }
        for (const h of hrefs) {
            const m = h.match(/\/status\/(\d+)/);
            if (m) return m[1];
        }
        return "";
    }

    // Very short replies ("Yes", "No", "Si") come without a language label,
    // in a plain span. Used only when no labelled text box is found.
    function xShortReplyBody(card) {
        return Array.from(card.querySelectorAll("span[class*='max-w-full']")).find(sp => {
            if (sp.closest("article") !== card) return false;
            if (sp.closest("a, button, [role='button'], time")) return false;
            if (!Array.from(sp.childNodes).some(n => n.nodeType === 3 && n.textContent.trim())) return false;
            const t = normSpaces(sp.textContent || "");
            return !!t && !isUiJunkText(t);
        }) || null;
    }

    function getXReplyBodies() {
        const m = (location.pathname || "").match(/\/status\/(\d+)/);
        if (!m) return []; // feed, profile, search: do nothing
        const mainId = m[1];

        const out = [];
        for (const card of document.querySelectorAll("article")) {
            // a quoted post inside a reply belongs to that reply
            if (card.parentElement && card.parentElement.closest("article")) continue;

            // Main post stays visible
            if (getXPostId(card) === mainId) continue;
            // older X layout: main post's timestamp links to the main ID
            if (card.querySelector(`a[href*='/status/${mainId}'] time`)) continue;

            // Post text: older layout used data-testid, the 2026 layout uses div[lang]
            const body =
                card.querySelector("[data-testid='tweetText']") ||
                Array.from(card.querySelectorAll("div[lang]")).find(d => d.closest("article") === card) ||
                xShortReplyBody(card);
            if (!body) continue;
            const t = normSpaces(body.textContent || "");
            if (!t || isUiJunkText(t)) continue;
            out.push(body);
        }
        return out;
    }

    // =========================
    // THREADS (threads.com / threads.net) — SEPARATE SECTION
    // Same rule as X: on a post page the main post stays visible,
    // every reply is veiled (including the author's own replies).
    // Only the post text is veiled; photos, names, buttons stay visible.
    // =========================

    function onThreads() {
        const h = location.hostname;
        return h === "threads.com" || h.endsWith(".threads.com") || h === "threads.net" || h.endsWith(".threads.net");
    }

    function pickThreadsBodySpan(card) {
        const spans = Array.from(card.querySelectorAll("span[dir='auto']")).filter(s => {
            if (s.closest("a")) return false;                      // names, links
            if (s.closest("button, [role='button']")) return false; // like/reply/repost counts
            if (s.querySelector("time") || s.closest("time")) return false;
            // skip text that belongs to a quoted post inside this card
            const owner = s.closest("[data-pressable-container='true']");
            if (owner !== card) return false;
            if (s.parentElement && s.parentElement.closest("span[dir='auto']")) return false;
            const t = normSpaces(s.textContent || "");
            if (!t || t === "Author" || t === "·" || t === "This content is unavailable") return false;
            if (isUiJunkText(t)) return false;
            if (!/\p{L}/u.test(t)) return false;                 // skip counts like "1.7K"
            return true;
        });
        if (!spans.length) return null;
        spans.sort((a, b) => (b.textContent || "").length - (a.textContent || "").length);
        return spans[0];
    }

    function getThreadsReplyBodies() {
        const m = (location.pathname || "").match(/\/post\/([A-Za-z0-9_-]+)/);
        if (!m) return []; // feed, profile, search: do nothing
        const mainCode = m[1];

        const out = [];
        for (const card of document.querySelectorAll("[data-pressable-container='true']")) {
            // only top-level cards (a quoted post inside a reply is part of that reply)
            if (card.parentElement && card.parentElement.closest("[data-pressable-container='true']")) continue;
            // Main post: its timestamp links to the post's own code
            const timeLink = card.querySelector("time") && card.querySelector("time").closest("a");
            const href = timeLink ? (timeLink.getAttribute("href") || "") : "";
            if (href.includes(`/post/${mainCode}`)) continue;

            const body = pickThreadsBodySpan(card);
            if (body) out.push(body);
        }
        return out;
    }

    // =========================
    // PICTURES IN REPLIES (X + THREADS) — SEPARATE SECTION
    // Same rule as the text: the main post stays fully visible;
    // every picture, GIF or video in a reply is veiled equally.
    // A quiet card with a NEO line covers the picture in place.
    // Tap/click the card to see the picture; tap "Veil" to cover it again.
    // Profile photos, names and buttons stay visible.
    // =========================

    function hasActionButtons(p) {
        if (p.querySelector("[role='group']")) return true;
        return Array.from(p.querySelectorAll("button, [role='button']")).some(b =>
            /repl|repost|like|bookmark|share/i.test(b.getAttribute("aria-label") || "") ||
            /repl|repost|like|share/i.test((b.querySelector("svg[aria-label]") || {getAttribute(){return "";}}).getAttribute("aria-label") || ""));
    }

    // Grow from one picture to the largest box that holds only pictures
    // (stops before the name, time, text or buttons).
    function growMediaBlock(media, card, body, isProfilePic) {
        let el = media;
        while (el.parentElement && el.parentElement !== card) {
            const p = el.parentElement;
            if (p.querySelector("time")) break;
            if (Array.from(p.querySelectorAll("img")).some(isProfilePic)) break;
            if (body && p.contains(body)) break;
            if (hasActionButtons(p)) break;
            el = p;
        }
        return el;
    }

    function collectMediaBlocks(card, body, mediaList, isProfilePic) {
        const blocks = [];
        for (const m of mediaList) {
            const b = growMediaBlock(m, card, body, isProfilePic);
            if (blocks.some(x => x === b || x.contains(b))) continue;
            for (let i = blocks.length - 1; i >= 0; i--) if (b.contains(blocks[i])) blocks.splice(i, 1);
            blocks.push(b);
        }
        return blocks;
    }

    function pageBackground() {
        for (const el of [document.body, document.documentElement]) {
            if (!el) continue;
            const c = getComputedStyle(el).backgroundColor;
            if (c && c !== "transparent" && !/rgba\(0, 0, 0, 0\)/.test(c)) return c;
        }
        return "#ffffff";
    }

    function pauseMedia(block) {
        block.querySelectorAll("video").forEach(v => { try { v.pause(); } catch (e) { } });
    }

    // Make the veil card sit exactly over the picture itself (not the wider row),
    // with the same rounded corners, so the site's own frame stays as the outline.
    function fitVeilToMedia(block, ov) {
        const br = block.getBoundingClientRect();
        let L = Infinity, T = Infinity, R = -Infinity, B = -Infinity, radiusEl = null;
        for (const m of block.querySelectorAll("img, video")) {
            if (ov.contains(m)) continue;
            const r = m.getBoundingClientRect();
            if (r.width < 40 || r.height < 40) continue;
            L = Math.min(L, r.left); T = Math.min(T, r.top); R = Math.max(R, r.right); B = Math.max(B, r.bottom);
            if (!radiusEl) {
                for (let el = m; el && el !== block.parentElement; el = el.parentElement) {
                    const rad = getComputedStyle(el).borderTopLeftRadius;
                    if (rad && rad !== "0px") { radiusEl = el; break; }
                }
            }
        }
        if (!isFinite(L)) { ov.style.inset = "0"; return; }
        // Clip to the block (a picture can be wider than its visible frame)
        L = Math.max(L, br.left); T = Math.max(T, br.top); R = Math.min(R, br.right); B = Math.min(B, br.bottom);
        ov.style.inset = "auto";
        ov.style.left = (L - br.left) + "px";
        ov.style.top = (T - br.top) + "px";
        ov.style.width = Math.max(0, R - L) + "px";
        ov.style.height = Math.max(0, B - T) + "px";
        if (radiusEl) {
            const fr = radiusEl.getBoundingClientRect();
            // use the frame's box if it is the visible picture area
            if (fr.width >= 40 && fr.height >= 40 && fr.width <= br.width + 1) {
                ov.style.left = Math.max(0, fr.left - br.left) + "px";
                ov.style.top = Math.max(0, fr.top - br.top) + "px";
                ov.style.width = Math.min(fr.width, br.width) + "px";
                ov.style.height = Math.min(fr.height, br.height) + "px";
            }
            ov.style.borderRadius = getComputedStyle(radiusEl).borderTopLeftRadius;
        }
    }

    function setMediaVeiled(block, veiled) {
        const ov = block._neoMediaVeil;
        if (!ov) return;
        block.dataset.neoMediaState = veiled ? "veiled" : "revealed";
        const line = ov.querySelector("[data-neo-line]");
        const pill = ov.querySelector("[data-neo-pill]");
        fitVeilToMedia(block, ov);
        if (veiled) {
            ov.style.background = pageBackground();
            ov.style.border = "1px solid rgba(128,128,128,0.35)";
            ov.style.pointerEvents = "auto";
            line.style.display = "block";
            pill.style.display = "none";
            pauseMedia(block);
        } else {
            ov.style.background = "transparent";
            ov.style.border = "none";
            ov.style.pointerEvents = "none";
            line.style.display = "none";
            pill.style.display = "inline-block";
        }
    }

    async function veilMediaBlock(block) {
        if (!block) return;
        // already done: keep it in place if the site re-drew things
        if (block.dataset.neoMediaState) {
            const ov = block._neoMediaVeil;
            if (ov && !block.contains(ov)) block.appendChild(ov);
            if (block.dataset.neoMediaState === "veiled") pauseMedia(block);
            if (ov) fitVeilToMedia(block, ov);
            return;
        }
        const r = block.getBoundingClientRect();
        if (r.width < 40 || r.height < 40) return; // not loaded yet, try next scan

        const veilLine = await pickVeilLine();
        if (!veilLine || block.dataset.neoMediaState) return;

        if (getComputedStyle(block).position === "static") block.style.position = "relative";

        const ov = document.createElement("div");
        ov.setAttribute("data-neo-media-veil", "1");
        ov.style.cssText =
            "position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;" +
            "align-items:center;justify-content:center;text-align:center;box-sizing:border-box;" +
            "padding:16px;cursor:pointer;font:inherit;color:inherit;";
        ov.style.borderRadius = getComputedStyle(block).borderRadius || "0px";

        const line = document.createElement("div");
        line.setAttribute("data-neo-line", "1");
        line.style.cssText = "max-width:90%;line-height:1.4;";
        line.textContent = veilLine;
        const hint = document.createElement("div");
        hint.style.cssText = "margin-top:8px;font-size:0.85em;opacity:0.6;";
        hint.textContent = IS_HOVER_DEVICE ? "Click to see the image" : "Tap to see the image";
        line.appendChild(hint);

        const pill = document.createElement("span");
        pill.setAttribute("data-neo-pill", "1");
        pill.textContent = "Veil";
        pill.style.cssText =
            "position:absolute;top:8px;left:8px;padding:2px 10px;border-radius:999px;" +
            "font-size:0.8em;cursor:pointer;pointer-events:auto;" +
            "background:rgba(0,0,0,0.6);color:#fff;";

        ov.appendChild(line);
        ov.appendChild(pill);

        const stop = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
        ov.addEventListener("click", (ev) => {
            stop(ev);
            setMediaVeiled(block, block.dataset.neoMediaState !== "veiled");
        }, true);
        pill.addEventListener("click", (ev) => { stop(ev); setMediaVeiled(block, true); }, true);
        // keep X/Threads from opening the post when the veil is tapped
        for (const t of ["pointerdown", "pointerup", "mousedown", "mouseup", "touchend"]) {
            ov.addEventListener(t, (ev) => { if (block.dataset.neoMediaState === "veiled" || ev.target === pill) ev.stopPropagation(); }, true);
        }

        block._neoMediaVeil = ov;
        block.appendChild(ov);
        setMediaVeiled(block, true);
    }

    // ---- X: reply cards (same main-post rule as getXReplyBodies) ----
    function getXReplyCards() {
        const m = (location.pathname || "").match(/\/status\/(\d+)/);
        if (!m) return [];
        const mainId = m[1];
        const out = [];
        for (const card of document.querySelectorAll("article")) {
            if (card.parentElement && card.parentElement.closest("article")) continue;
            if (getXPostId(card) === mainId) continue;
            if (card.querySelector(`a[href*='/status/${mainId}'] time`)) continue;
            out.push(card);
        }
        return out;
    }

    const xIsProfilePic = (img) => /profile_images|default_profile/.test(img.src || "");

    function getXReplyMediaBlocks() {
        const out = [];
        for (const card of getXReplyCards()) {
            const body =
                card.querySelector("[data-testid='tweetText']") ||
                Array.from(card.querySelectorAll("div[lang]")).find(d => d.closest("article") === card) ||
                xShortReplyBody(card);
            const media = Array.from(card.querySelectorAll("img, video")).filter(el =>
                el.tagName === "VIDEO" ||
                (/twimg\.com/.test(el.src || "") && !xIsProfilePic(el) && !/emoji/.test(el.src || "")));
            out.push(...collectMediaBlocks(card, body, media, xIsProfilePic));
        }
        return out;
    }

    // ---- Threads: reply cards (same main-post rule as getThreadsReplyBodies) ----
    const threadsIsProfilePic = (img) => /profile picture|foto do perfil|foto de perfil/i.test(img.getAttribute("alt") || "");

    function getThreadsReplyMediaBlocks() {
        const m = (location.pathname || "").match(/\/post\/([A-Za-z0-9_-]+)/);
        if (!m) return [];
        const mainCode = m[1];
        const out = [];
        for (const card of document.querySelectorAll("[data-pressable-container='true']")) {
            if (card.parentElement && card.parentElement.closest("[data-pressable-container='true']")) continue;
            const timeLink = card.querySelector("time") && card.querySelector("time").closest("a");
            const href = timeLink ? (timeLink.getAttribute("href") || "") : "";
            if (href.includes(`/post/${mainCode}`)) continue;
            const body = pickThreadsBodySpan(card);
            const media = Array.from(card.querySelectorAll("img, video")).filter(el => {
                if (el.tagName === "VIDEO") return true;
                if (threadsIsProfilePic(el)) return false;
                const r = el.getBoundingClientRect();
                return r.width >= 60 && r.height >= 60; // skip icons and badges
            });
            out.push(...collectMediaBlocks(card, body, media, threadsIsProfilePic));
        }
        return out;
    }

    // ---------- NEO MARK (◐ darkness and light) ----------
    // The ◐ mark lives in neo-mark.css (loaded by the manifest), so sites with
    // strict security rules such as Threads cannot block it.

    // TikTok: planned for a later version.

    // ---------- Scanning ----------
    let scheduled = false;

    async function scanOnce() {
        // Mobile YouTube first, so desktop YouTube logic stays unchanged
        if (onMobileYouTube()) {
            const nodes = getMobileYouTubeCommentBodies();
            for (const n of nodes) await veilNode(n);
            return;
        }

        if (onYouTube()) {
            const nodes = getYouTubeCommentBodies();
            for (const n of nodes) await veilNode(n);
            return;
        }

        if (onInstagram()) {
            let nodes = getInstagramCommentBodies();
            if (!nodes.length) nodes = getInstagramPanelBodies(); // new 2026 panel
            for (const n of nodes) await veilNode(n);
            return;
        }

        if (onX()) {
            const nodes = getXReplyBodies();
            for (const n of nodes) await veilNode(n);
            for (const b of getXReplyMediaBlocks()) await veilMediaBlock(b);
            return;
        }

        if (onThreads()) {
            const nodes = getThreadsReplyBodies();
            for (const n of nodes) await veilNode(n);
            for (const b of getThreadsReplyMediaBlocks()) await veilMediaBlock(b);
            return;
        }
    }

    function scheduleScan() {
        if (scheduled) return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            try {
                await scanOnce();
            } catch (e) {
                console.warn("NEO scan error:", e);
            }
        }, 120);
    }

    function startObserver() {
        const host = document.body || document.documentElement;
        if (!host || host.dataset.neoObs === "1") return;
        host.dataset.neoObs = "1";
        new MutationObserver(scheduleScan).observe(host, { childList: true, subtree: true });
    }

    function init() {
        chrome.storage.sync.get(DEFAULTS, (stored) => {
            SETTINGS = { ...DEFAULTS, ...(stored || {}) };

            startObserver();
            scanOnce();
            setInterval(() => scanOnce().catch(() => { }), SETTINGS.rescanMs || DEFAULTS.rescanMs);

            chrome.storage.onChanged.addListener((changes, area) => {
                if (area !== "sync") return;
                for (const k of Object.keys(changes)) SETTINGS[k] = changes[k].newValue;
                scheduleScan();
            });

            chrome.runtime.onMessage.addListener((msg) => {
                if (msg && msg.action === "shimmerScan") scheduleScan();
            });
        });

        console.log("NEO v3 running — hover/tap reveal should work. Hover device:", IS_HOVER_DEVICE);
    }

    init();
})();
