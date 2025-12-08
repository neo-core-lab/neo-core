// // NEO Core 3.0 — IG + YouTube veil via packs.
// Client-side only. Your view, your shield.

(() => {
    // =========================
    // 0) SETTINGS & DEFAULTS
    // =========================
    const DEFAULTS = {
        enableAffirmations: true,
        enableMicrofacts: true,
        enableAutomationBadge: true,
        autoTag: "#auto",
        rescanMs: 1500,
        activePack: "core",        // comma-separated pack IDs
        harmFilterEnabled: true    // kept for future; NOT used to skip veiling
    };

    let CURRENT_SETTINGS = null;
    let HOVER_LOCK = false;

    // =========================
    // 1) UTILITIES
    // =========================
    function normalizeText(str) {
        if (!str) return "";
        return str
            .replace(/\s+/g, " ")
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .normalize("NFKC");
    }

    function normalizeForDisplay(str) {
        if (!str) return "";
        return str
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .normalize("NFKC");
    }

    function randChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // =========================
    // 2) EMOJI & HARM HEURISTICS
    // =========================
    function containsBadEmoji(text) {
        const BAD_EMOJI = [
            "🖕", // middle finger
            "💩", // poop
            "🤢", // nauseated face
            "🤮", // vomiting
            "😡", // pouting
            "😠", // angry
            "👎", // thumbs down
            "🗑️", // wastebasket
            "⚰️", // coffin
            "🔫", // gun
            "☠️"  // skull and crossbones
        ];
        return BAD_EMOJI.some(e => text.includes(e));
    }

    function containsBadEmojiPattern(text) {
        const SAFE_EMOJI_PATTERNS = [
            "🤣🤣",
            "🤣🤣🤣",
            "😹😹",
            "😹😹😹",
            "😭😭",
            "😭😭😭",
            "💀💀",
            "💀💀🤣",
            "🤡😂",
            "🤡🤡",
            "👻🎃",
            "👻🎃💀",
            "😈😉"
        ];

        const BAD_EMOJI_PATTERNS = [
            "🤡🖕", "🖕🤡",
            "💩👉", "👉💩",
            "🤮🤮", "🤢🤮",
            "🖕🖕🖕",
            "🤡🤡🤡",
            "😡👉", "👉😡",
            "🔥👉", "👉🔥",
            "🏳️‍🌈❌",
            "✡️❌"
        ];

        if (SAFE_EMOJI_PATTERNS.some(p => text.includes(p))) return false;
        return BAD_EMOJI_PATTERNS.some(p => text.includes(p));
    }

    function basicHarmScore(text) {
        const t = normalizeText(text).toLowerCase();
        if (!t) return 0;

        let score = 0;

        if (/(kill yourself|kys|you should die|no one (would|will) miss you)/.test(t)) score += 4;
        if (/(rapist|pedo|pedophile|groomer)/.test(t)) score += 3;
        if (/(whore|slut|bitch|cunt)/.test(t)) score += 3;
        if (/(nigger|kike|faggot|tranny)/.test(t)) score += 4;
        if (/(subhuman|vermin|infestation|exterminate)/.test(t)) score += 3;
        if (/(hang yourself|drink bleach|jump off a bridge)/.test(t)) score += 4;

        if (containsBadEmoji(text)) score += 2;
        if (containsBadEmojiPattern(text)) score += 2;

        if (/\b(kill|die|worthless|monster)\b/.test(t)) score += 1;

        return score;
    }

    function classifyHarm(text) {
        const score = basicHarmScore(text);
        if (score >= 6) return "high";
        if (score >= 4) return "elevated";
        if (score >= 2) return "medium";
        if (score >= 1) return "low";
        return "none";
    }

    // =========================
    // 3) INSTAGRAM COMMENT DETECTION
    // =========================
    function isLikelyCommentNode(span) {
        if (!span) return false;

        const li = span.closest("li");
        if (!li) return false;

        // Skip caption row: first <li> inside the comments <ul>
        const parent = li.parentElement;
        if (parent && parent.tagName === "UL" && parent.firstElementChild === li) {
            return false;
        }

        const raw = normalizeText(span.innerText || "");
        const txt = raw.trim();
        if (!txt) return false;
        if (txt.length > 600) return false;
        if (span.querySelector("input, textarea, button")) return false;

        const lower = txt.toLowerCase();

        if (lower === "reply" || lower.startsWith("view replies")) return false;
        if (lower.startsWith("view all")) return false;
        if (lower === "add a reply...") return false;

        if (/^liked by .* and \d+ others$/i.test(lower)) return false;

        return true;
    }

    function findInstagramCommentSpans() {
        const spans = document.querySelectorAll("span[dir='auto']");
        const out = [];
        spans.forEach(span => {
            if (!isLikelyCommentNode(span)) return;
            out.push(span);
        });
        return out;
    }

    // =========================
    // 4) PACKS & MASKING LOGIC
    // =========================
    const PACK_CACHE = {};

    async function loadPack(packName, depth = 0) {
        if (depth > 3) {
            console.warn("NEO meta-pack recursion limit reached for", packName);
            return [];
        }

        if (PACK_CACHE[packName]) {
            return PACK_CACHE[packName];
        }

        try {
            const url = chrome.runtime.getURL(`packs/${packName}.json`);
            const res = await fetch(url);
            const data = await res.json();

            let entries = [];

            // Meta-pack: { "packs": [ "kindness", ... ] }
            if (data && Array.isArray(data.packs)) {
                for (const childName of data.packs) {
                    try {
                        const childEntries = await loadPack(childName, depth + 1);
                        if (Array.isArray(childEntries) && childEntries.length) {
                            entries = entries.concat(childEntries);
                        }
                    } catch (e) {
                        console.warn("NEO meta-pack child failed:", childName, e);
                    }
                }
                PACK_CACHE[packName] = entries;
                console.log("[NEO] Loaded meta-pack:", packName, "→", entries.length, "entries");
                return entries;
            }

            // Normal pack: array or { entries: [...] }
            const rawEntries = Array.isArray(data) ? data : (data.entries || []);

            entries = rawEntries
                .map(e => {
                    if (typeof e === "string") return { text: e.trim() };
                    if (e && typeof e.text === "string") return { text: e.text.trim() };
                    return null;
                })
                .filter(Boolean);

            PACK_CACHE[packName] = entries;
            console.log("[NEO] Loaded pack:", packName, "→", entries.length, "entries");
            return entries;
        } catch (err) {
            console.warn("NEO loadPack error for", packName, err);
            return [];
        }
    }

    async function mask(el, originalRaw, settings) {
        if (el.dataset.neoMasked === "1") return;

        let veilLine = null;

        // Use packs from popup: comma-separated list in activePack
        try {
            const raw = settings.activePack || "core";

            const names = raw
                .split(",")
                .map(s => s.trim())
                .filter(Boolean);

            let merged = [];
            for (const name of names) {
                const entries = await loadPack(name);
                if (entries && entries.length) {
                    merged = merged.concat(entries);
                }
            }

            if (!merged.length) {
                const fallback = await loadPack("core");
                merged = merged.concat(fallback || []);
            }

            if (merged.length) {
                const entry = randChoice(merged);
                if (entry && entry.text) {
                    veilLine = entry.text.trim();
                }
            }
        } catch (e) {
            console.warn("NEO mask pack loading error:", e);
        }

        // Fallback veil text if packs fail
        if (!veilLine) veilLine = "Your nervous system deserves safety.";

        const cleanedOriginal = normalizeForDisplay(originalRaw);

        // Start from veil text
        let displayText = veilLine;

        const normalizedOriginal = normalizeText(originalRaw);
        const mentionMatch = normalizedOriginal.match(/^((?:@[^\s]+\s*)+)(.+)?$/);

        // preserve leading @handles, veil only the message body
        if (mentionMatch) {
            const mentionPart = mentionMatch[1].trim();
            const restPart = (mentionMatch[2] || "").trim();

            if (restPart) {
                displayText = `${mentionPart} ${veilLine}`;
            } else {
                // if it's only handles and no message, don't veil at all
                displayText = cleanedOriginal;
            }
        }

        // If we ended up with the original text, this is NOT a veil.
        if (!displayText || displayText === cleanedOriginal) {
            el.innerText = cleanedOriginal;
            delete el.dataset.neoMasked;
            delete el.dataset.neoOriginal;
            delete el.dataset.neoVeil;
            delete el.dataset.neoRevealed;
            return;
        }

        // At this point, it's truly veiled.
        el.dataset.neoMasked = "1";
        el.dataset.neoOriginal = cleanedOriginal;
        // Store full veil text (handles + veil) so re-veiling is consistent
        el.dataset.neoVeil = displayText;
        el.dataset.neoRevealed = "0";

        el.innerText = displayText;
    }

    function showOriginal(el) {
        const orig = el.dataset.neoOriginal || "";
        if (!orig.trim()) return;
        el.innerText = orig;
    }

    function showVeil(el) {
        const veil = el.dataset.neoVeil || "";
        if (!veil.trim()) return;
        el.innerText = veil;
    }

    // =========================
    // 5) YOUTUBE HELPERS
    // =========================
    function onYouTube() {
        return location.hostname.includes("youtube.com");
    }

    function findYouTubeCommentNodes() {
        // #content-text inside top-level comments and replies
        const nodes = document.querySelectorAll("#content-text");
        const result = [];

        nodes.forEach(node => {
            const container = node.closest(
                "ytd-comment-thread-renderer, ytd-comment-view-model"
            );
            if (!container) return;

            if (node.getAttribute("contenteditable") === "true") return;

            const txt = normalizeText(node.innerText || "").trim();
            if (!txt) return;

            result.push(node);
        });

        return result;
    }

    // =========================
    // 6) SCAN LOOP
    // =========================
    function scanOnce(settings) {
        if (HOVER_LOCK) return;

        const s = CURRENT_SETTINGS || settings || DEFAULTS;

        // ----- YOUTUBE MODE -----
        if (onYouTube()) {
            const nodes = findYouTubeCommentNodes();

            nodes.forEach(node => {
                if (node.dataset.neoSeen === "1") return;

                const originalRaw = node.innerText || "";
                const txt = normalizeText(originalRaw).trim();
                if (!txt) return;

                // We still *compute* harm level if the setting is on,
                // but we DO NOT use it to skip veiling anymore.
                const harmFilterOn = s.harmFilterEnabled !== false;
                if (harmFilterOn) {
                    const _harmLevel = classifyHarm(txt);
                    // kept for potential future UI or analytics (local only)
                }

                // ALWAYS veil YouTube comments using packs
                node.dataset.neoSeen = "1";

                if (s.enableAffirmations || s.enableMicrofacts) {
                    mask(node, originalRaw.trim(), s);
                }
            });

            // Don't run Instagram logic on YouTube
            return;
        }

        // ----- INSTAGRAM MODE -----
        const spans = findInstagramCommentSpans();

        spans.forEach(span => {
            const parent = span.closest("li");
            if (!parent) return;

            if (span.dataset.neoSeen === "1" || parent.dataset.neoSeen === "1") return;

            const originalRaw = span.innerText || "";
            const txt = normalizeText(originalRaw).trim();
            if (!txt) return;

            // ALWAYS veil Instagram comments using packs
            span.dataset.neoSeen = "1";
            parent.dataset.neoSeen = "1";

            if (s.enableAffirmations || s.enableMicrofacts) {
                mask(span, originalRaw, s);
            }
        });
    }

    // =========================
    // 7) HOVER / CLICK REVEAL
    // =========================
    ["mouseenter", "mouseleave"].forEach(evType => {
        document.addEventListener(evType, (ev) => {
            const el = ev.target && ev.target.closest
                ? ev.target.closest("[data-neo-masked='1']")
                : null;
            if (!el || el.dataset.neoMasked !== "1") return;

            if (evType === "mouseenter") {
                HOVER_LOCK = true;
                if (el.dataset.neoRevealed !== "1") {
                    showOriginal(el);
                }
            } else {
                if (el.dataset.neoRevealed !== "1") {
                    showVeil(el);
                }
                HOVER_LOCK = false;
            }
        }, true);
    });

    document.addEventListener("click", (ev) => {
        const el = ev.target && ev.target.closest
            ? ev.target.closest("[data-neo-masked='1']")
            : null;
        if (!el) return;

        const revealed = el.dataset.neoRevealed === "1";
        if (revealed) {
            el.dataset.neoRevealed = "0";
            showVeil(el);
        } else {
            el.dataset.neoRevealed = "1";
            showOriginal(el);
        }
    }, true);

    // =========================
    // 8) OPTIONS SYNC + LOOP
    // =========================
    function startLoop(settings) {
        CURRENT_SETTINGS = settings || DEFAULTS;
        scanOnce(CURRENT_SETTINGS);
        setInterval(
            () => scanOnce(CURRENT_SETTINGS),
            CURRENT_SETTINGS.rescanMs || DEFAULTS.rescanMs
        );
    }

    if (chrome && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(DEFAULTS, (stored) => {
            const merged = Object.assign({}, DEFAULTS, stored || {});
            startLoop(merged);
        });

        chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== "sync") return;

            const updated = Object.assign({}, DEFAULTS, CURRENT_SETTINGS || {});
            for (const key in changes) {
                updated[key] = changes[key].newValue;
            }
            CURRENT_SETTINGS = updated;
        });
    } else {
        startLoop(DEFAULTS);
    }

    if (!window.__neo_debug_toast) {
        window.__neo_debug_toast = true;
        console.log("🌐 Neo active — IG + YouTube veil via packs, ⊙ marker ready.");
    }
})();
