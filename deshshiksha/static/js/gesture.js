/**
 * gesture.js — Hand gesture detection using MediaPipe Hands
 */

const GestureController = (() => {

    let hands       = null;
    let camera      = null;
    let lastGesture = '';
    let holdCount   = 0;
    const HOLD_FRAMES = 15;
    let onGestureCb = null;
    let running     = false;

    const TIP = [4, 8, 12, 16, 20];
    const PIP = [3, 6, 10, 14, 18];

    function countFingers(lm) {
        let n = 0;
        // Thumb: tip x < pip x (mirrored)
        if (lm[TIP[0]].x < lm[PIP[0]].x) n++;
        for (let i = 1; i < 5; i++) {
            if (lm[TIP[i]].y < lm[PIP[i]].y) n++;
        }
        return n;
    }

    function isThumbsUp(lm) {
        const thumbUp = lm[4].y < lm[0].y - 0.08;
        for (let i = 1; i < 5; i++) {
            if (lm[TIP[i]].y < lm[PIP[i]].y) return false;
        }
        return thumbUp;
    }

    function getGesture(lm) {
        if (isThumbsUp(lm)) return 'thumbs_up';
        const n = countFingers(lm);
        if (n === 0) return 'fist';
        if (n === 1) return '1_finger';
        if (n === 2) return '2_fingers';
        if (n === 3) return '3_fingers';
        if (n === 4) return '4_fingers';
        if (n === 5) return '5_fingers';
        return 'unknown';
    }

    const LABELS = {
        '1_finger':  { text: '☝️ 1 Finger → Lessons',   color: '#2563eb' },
        '2_fingers': { text: '✌️ 2 Fingers → Quiz',      color: '#7c3aed' },
        '3_fingers': { text: '🤟 3 Fingers → Chatbot',   color: '#059669' },
        '4_fingers': { text: '🖐 4 Fingers → Numbers',   color: '#d97706' },
        '5_fingers': { text: '🖐 5 Fingers → Alphabets', color: '#dc2626' },
        'thumbs_up': { text: '👍 Thumbs Up → Alphabets', color: '#16a34a' },
        'fist':      { text: '✊ Fist → Dashboard',       color: '#6b7280' },
    };

    function updateUI(gesture, held) {
        const box   = document.getElementById('gesture-box');
        const label = document.getElementById('gesture-label');
        const bar   = document.getElementById('gesture-hold-bar');
        if (!label) return;

        const info = LABELS[gesture];
        if (info) {
            label.textContent     = info.text;
            label.style.color     = info.color;
            if (box) { box.style.borderColor = info.color; box.style.background = info.color + '15'; }
        } else {
            label.textContent     = '🤚 Show a hand sign';
            label.style.color     = '#94a3b8';
            if (box) { box.style.borderColor = '#e2e8f0'; box.style.background = 'white'; }
        }
        if (bar) {
            bar.style.width      = Math.min(100, (held / HOLD_FRAMES) * 100) + '%';
            bar.style.background = info ? info.color : '#e2e8f0';
        }
    }

    function onResults(results) {
        if (!running) return;
        if (!results.multiHandLandmarks || !results.multiHandLandmarks.length) {
            lastGesture = ''; holdCount = 0; updateUI('', 0); return;
        }
        const gesture = getGesture(results.multiHandLandmarks[0]);
        if (gesture === lastGesture && gesture !== 'unknown') {
            holdCount++;
            updateUI(gesture, holdCount);
            if (holdCount >= HOLD_FRAMES) {
                holdCount = 0; lastGesture = '';
                if (onGestureCb) onGestureCb(gesture);
            }
        } else {
            lastGesture = gesture; holdCount = 1; updateUI(gesture, 1);
        }
    }

    // Returns a Promise that resolves when camera starts
    function start(videoEl, onGesture) {
        onGestureCb = onGesture;
        running     = true;

        return new Promise(function(resolve, reject) {
            try {
                hands = new Hands({
                    locateFile: function(f) {
                        return 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/' + f;
                    }
                });
                hands.setOptions({
                    maxNumHands: 1,
                    modelComplexity: 0,
                    minDetectionConfidence: 0.65,
                    minTrackingConfidence:  0.5,
                });
                hands.onResults(onResults);

                camera = new Camera(videoEl, {
                    onFrame: async function() {
                        if (hands) await hands.send({ image: videoEl });
                    },
                    width: 320, height: 240,
                });

                camera.start().then(function() {
                    resolve();
                }).catch(function(err) {
                    reject(err);
                });

            } catch(e) {
                reject(e);
            }
        });
    }

    function stop() {
        running = false;
        if (camera) { try { camera.stop(); } catch(e) {} camera = null; }
        if (hands)  { try { hands.close(); } catch(e) {} hands  = null; }
        updateUI('', 0);
    }

    return { start, stop };
})();
