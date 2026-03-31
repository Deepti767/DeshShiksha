/**
 * sign_practice.js
 * Sign Practice Mode — compare user hand gesture to expected sign.
 * Uses finger count + thumb position as simple matching rules.
 * No heavy ML — pure landmark geometry.
 */

// ── Sign rules ────────────────────────────────────────────────
// Each rule: { fingers: N, thumb: 'up'|'side'|'any'|'in', note }
// fingers = number of extended fingers (0-5)
// thumb   = extra thumb constraint
const SIGN_RULES = {
    'A': { fingers: 0, thumb: 'side',  hint: 'Closed fist, thumb on side' },
    'B': { fingers: 4, thumb: 'in',    hint: '4 fingers up, thumb folded in' },
    'C': { fingers: 3, thumb: 'any',   hint: 'Curved hand — C shape' },
    'D': { fingers: 1, thumb: 'any',   hint: 'Index finger up, others form circle' },
    'E': { fingers: 0, thumb: 'in',    hint: 'All fingers bent, thumb tucked' },
    'F': { fingers: 3, thumb: 'any',   hint: 'Index+thumb circle, 3 fingers up' },
    'G': { fingers: 1, thumb: 'side',  hint: 'Index + thumb pointing sideways' },
    'H': { fingers: 2, thumb: 'in',    hint: '2 fingers extended sideways' },
    'I': { fingers: 1, thumb: 'in',    hint: 'Pinky up only' },
    'J': { fingers: 1, thumb: 'in',    hint: 'Pinky up, trace J in air' },
    'K': { fingers: 2, thumb: 'side',  hint: 'V shape with thumb between' },
    'L': { fingers: 1, thumb: 'up',    hint: 'Index up + thumb out = L shape' },
    'M': { fingers: 0, thumb: 'in',    hint: '3 fingers over thumb' },
    'N': { fingers: 0, thumb: 'in',    hint: '2 fingers over thumb' },
    'O': { fingers: 0, thumb: 'any',   hint: 'All fingers curved into O' },
    'P': { fingers: 2, thumb: 'side',  hint: 'Like K pointing down' },
    'Q': { fingers: 1, thumb: 'side',  hint: 'Like G pointing down' },
    'R': { fingers: 2, thumb: 'in',    hint: 'Index + middle crossed' },
    'S': { fingers: 0, thumb: 'over',  hint: 'Fist with thumb over fingers' },
    'T': { fingers: 0, thumb: 'in',    hint: 'Thumb between index + middle' },
    'U': { fingers: 2, thumb: 'in',    hint: '2 fingers up together' },
    'V': { fingers: 2, thumb: 'in',    hint: 'V shape — peace sign' },
    'W': { fingers: 3, thumb: 'in',    hint: '3 fingers spread' },
    'X': { fingers: 1, thumb: 'in',    hint: 'Index finger bent/hooked' },
    'Y': { fingers: 2, thumb: 'up',    hint: 'Thumb + pinky extended' },
    'Z': { fingers: 1, thumb: 'in',    hint: 'Index traces Z in air' },
    // Numbers
    '1': { fingers: 1, thumb: 'in',    hint: 'Index finger up' },
    '2': { fingers: 2, thumb: 'in',    hint: 'Index + middle up' },
    '3': { fingers: 3, thumb: 'side',  hint: 'Thumb + index + middle' },
    '4': { fingers: 4, thumb: 'in',    hint: '4 fingers up, thumb in' },
    '5': { fingers: 5, thumb: 'any',   hint: 'All 5 fingers spread' },
    '6': { fingers: 2, thumb: 'up',    hint: 'Thumb + pinky touch' },
    '7': { fingers: 3, thumb: 'up',    hint: 'Thumb + ring touch' },
    '8': { fingers: 3, thumb: 'side',  hint: 'Thumb + middle touch' },
    '9': { fingers: 1, thumb: 'side',  hint: 'Index + thumb circle' },
    '10':{ fingers: 1, thumb: 'up',    hint: 'Fist with thumb up' },
};

// ── Landmark indices ──────────────────────────────────────────
const TIP = [4, 8, 12, 16, 20];
const PIP = [3, 6, 10, 14, 18];

// ── Analyse hand landmarks ────────────────────────────────────
function analyseHand(lm) {
    // Count extended fingers (excluding thumb)
    let extendedFingers = 0;
    for (let i = 1; i < 5; i++) {
        if (lm[TIP[i]].y < lm[PIP[i]].y) extendedFingers++;
    }

    // Thumb state
    const thumbTipX  = lm[4].x;
    const thumbPipX  = lm[3].x;
    const thumbTipY  = lm[4].y;
    const wristY     = lm[0].y;
    const thumbUp    = thumbTipY < wristY - 0.08;
    const thumbSide  = Math.abs(thumbTipX - thumbPipX) > 0.04;
    const thumbIn    = !thumbUp && !thumbSide;

    return { extendedFingers, thumbUp, thumbSide, thumbIn };
}

// ── Match user hand to expected sign ─────────────────────────
function matchSign(letter, lm) {
    const rule = SIGN_RULES[letter];
    if (!rule) return { match: false, confidence: 0 };

    const { extendedFingers, thumbUp, thumbSide, thumbIn } = analyseHand(lm);

    // Finger count match (allow ±1 tolerance)
    const fingerMatch = Math.abs(extendedFingers - rule.fingers) <= 1;

    // Thumb match
    let thumbMatch = true;
    if (rule.thumb === 'up')   thumbMatch = thumbUp;
    if (rule.thumb === 'side') thumbMatch = thumbSide || thumbUp;
    if (rule.thumb === 'in')   thumbMatch = thumbIn || !thumbUp;
    if (rule.thumb === 'over') thumbMatch = thumbIn;
    // 'any' always passes

    const match = fingerMatch && thumbMatch;

    // Confidence: exact finger match = higher
    const exactFinger = extendedFingers === rule.fingers;
    const confidence  = match ? (exactFinger ? 100 : 70) : 0;

    return { match, confidence, extendedFingers, thumbUp, thumbSide };
}

// ── Public ────────────────────────────────────────────────────
window.SignPractice = { matchSign, analyseHand, SIGN_RULES };
