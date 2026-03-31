/**
 * voice_teacher.js  — Smart Conversational AI Teacher
 * Rule-based, no external APIs, works with Web Speech API.
 */

const VoiceTeacher = (() => {

    // ── Memory ────────────────────────────────────────────────
    let lastSpoken      = '';       // last full sentence spoken
    let lastContext     = '';       // what we were doing: 'lesson'|'quiz'|'greeting'|'ask'
    let pendingCallback = null;     // callback after TTS ends
    let mic             = null;     // SpeechRecognition instance
    let isSpeaking      = false;

    // ── Encouragement pool ────────────────────────────────────
    const PRAISE = [
        'Well done!',
        'Great job!',
        'You are doing amazing!',
        'Fantastic!',
        'Keep it up!',
        'Excellent work!',
        'You are a star!',
    ];
    function praise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

    // ── Avatar / status helpers ───────────────────────────────
    function setAvatarState(state) {
        // Floating avatar
        const fc = document.getElementById('avatar-circle');
        if (fc) fc.className = 'avatar-circle ' + state;
        // Panel avatar
        const pa = document.getElementById('vt-avatar');
        if (pa) pa.className = 'vt-avatar ' + state;
    }

    function setStatusText(text) {
        const el = document.getElementById('vt-status');
        if (el) el.textContent = text;
        // Bubble on floating avatar
        const bubble = document.getElementById('avatar-bubble');
        if (bubble) {
            if (text) {
                bubble.textContent = text.length > 90 ? text.substring(0, 88) + '…' : text;
                bubble.classList.add('visible');
            } else {
                bubble.classList.remove('visible');
            }
        }
    }

    function hideBubble(delay = 3000) {
        setTimeout(() => {
            const bubble = document.getElementById('avatar-bubble');
            if (bubble) bubble.classList.remove('visible');
        }, delay);
    }

    // ── TTS — speak one sentence ──────────────────────────────
    function speak(text, onEnd) {
        if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
        window.speechSynthesis.cancel();
        isSpeaking = true;
        lastSpoken = text;

        // Never stop the always-on mic — it handles barge-in itself
        // Only stop one-shot mic instances
        if (mic && !mic._alwaysOn) { try { mic.stop(); } catch (e) {} mic = null; }

        const u    = new SpeechSynthesisUtterance(text);
        u.lang     = 'en-US';
        u.rate     = 0.80;
        u.pitch    = 1.1;

        setAvatarState('speaking');
        setStatusText(text);

        u.onend = () => {
            isSpeaking = false;
            // Restore listening state if always-on mic is running
            setAvatarState(mic && mic._alwaysOn ? 'listening' : 'idle');
            hideBubble(2500);
            if (onEnd) onEnd();
        };
        u.onerror = () => {
            isSpeaking = false;
            setAvatarState(mic && mic._alwaysOn ? 'listening' : 'idle');
            if (onEnd) onEnd();
        };
        window.speechSynthesis.speak(u);
    }

    // ── Speak multiple sentences with pauses ──────────────────
    function speakSteps(sentences, pauseMs, onEnd) {
        if (!sentences || sentences.length === 0) { if (onEnd) onEnd(); return; }
        const [first, ...rest] = sentences;
        speak(first, () => {
            if (rest.length === 0) { if (onEnd) onEnd(); return; }
            setTimeout(() => speakSteps(rest, pauseMs, onEnd), pauseMs);
        });
    }

    // ── Repeat last spoken content ────────────────────────────
    function repeatLast() {
        if (lastSpoken) {
            speak('Let me repeat that. ' + lastSpoken);
        } else {
            speak('There is nothing to repeat yet.');
        }
    }

    // ── Flexible command parser ───────────────────────────────
    function parseCommand(text) {
        const t = text.toLowerCase().trim();

        // YES / START
        if (/\b(yes|yeah|yep|yup|sure|okay|ok|alright|start|begin|go|let'?s?\s*(go|begin|start)|ready|continue|next|proceed)\b/.test(t))
            return 'yes';

        // NO / STOP
        if (/\b(no|nope|nah|stop|not now|later|wait|pause|exit|quit|bye|goodbye|leave)\b/.test(t))
            return 'no';

        // REPEAT / AGAIN
        if (/\b(repeat|again|say again|once more|one more time|replay|redo)\b/.test(t))
            return 'repeat';

        // DON'T UNDERSTAND
        if (/\b(don'?t understand|not understand|confused|what|huh|pardon|come again|unclear|explain|i don'?t get)\b/.test(t))
            return 'explain';

        // CLOSE / BACK
        if (/\b(close|go back|go home|dashboard|home|back)\b/.test(t))
            return 'close';

        // HELP
        if (/\b(help|options|what can|commands|menu)\b/.test(t))
            return 'help';

        // Navigation
        if (/open\s+chat|chatbot|assistant/.test(t))          return 'nav:chatbot';
        if (/open\s+quiz|start\s+quiz|take\s+quiz/.test(t))   return 'nav:quiz';
        if (/open\s+alphabet|learn\s+alphabet/.test(t))       return 'nav:alphabets';
        if (/open\s+number|learn\s+number/.test(t))           return 'nav:numbers';
        if (/start\s+lesson|next\s+lesson/.test(t))           return 'nav:lesson';
        if (/logout|log\s*out|sign\s*out/.test(t))            return 'nav:logout';

        return 'unknown';
    }

    // ── Continuous mic — always on ────────────────────────────
    function listen(onResult) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { setStatusText('Voice input not supported in this browser.'); return; }
        if (mic) { try { mic.stop(); } catch (e) {} mic = null; }

        mic = new SR();
        mic.lang             = 'en-US';
        mic.continuous       = true;
        mic.interimResults   = false;
        mic.maxAlternatives  = 4;

        mic.onstart = () => {
            setAvatarState('listening');
            setStatusText('Listening… speak now.');
        };

        mic.onresult = (e) => {
            // Barge-in: always process navigation even while speaking
            const transcript = e.results[e.results.length - 1][0].transcript.trim();
            const cmd        = parseCommand(transcript);
            setStatusText('You said: "' + transcript + '"');

            // Barge-in navigation — cancel TTS immediately
            if (['close', 'nav:chatbot', 'nav:quiz', 'nav:alphabets',
                 'nav:numbers', 'nav:lesson', 'nav:logout'].includes(cmd)) {
                window.speechSynthesis.cancel();
                isSpeaking = false;
            }

            if (onResult) onResult(cmd, transcript);
        };

        mic.onerror = (e) => {
            if (e.error === 'no-speech') return; // silence — keep listening
            setAvatarState('idle');
            mic = null;
        };

        mic.onend = () => {
            mic = null;
            // Auto-restart unless we are mid-speech
            if (!isSpeaking) setTimeout(() => listen(onResult), 400);
        };

        mic.start();
    }

    function stopListening() {
        if (mic) { try { mic.stop(); } catch (e) {} mic = null; }
        setAvatarState('idle');
    }

    // ── Always-on mic — never stops, even during TTS ──────────
    // Use this for dashboard so user can speak at any time.
    function listenAlwaysOn(onResult) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { setStatusText('Voice input not supported in this browser.'); return; }
        if (mic) { try { mic.stop(); } catch (e) {} mic = null; }

        let watchdog = null;

        function startInstance() {
            if (mic) return; // already running

            const m = new SR();
            m.lang            = 'en-US';
            m.continuous      = true;
            m.interimResults  = false;
            m.maxAlternatives = 4;
            m._alwaysOn       = true;
            m._startedAt      = Date.now();

            m.onstart = () => {
                mic = m;
                if (!isSpeaking) {
                    setAvatarState('listening');
                    setStatusText('Mic is on. Speak anytime.');
                }
                // Watchdog: Chrome sometimes silently kills continuous mic
                clearInterval(watchdog);
                watchdog = setInterval(() => {
                    if (!mic || mic !== m) { clearInterval(watchdog); return; }
                    // If mic has been running > 55s, restart it proactively
                    // (Chrome's continuous mode often dies around 60s)
                    if (Date.now() - m._startedAt > 55000) {
                        clearInterval(watchdog);
                        try { m.stop(); } catch(e) {}
                    }
                }, 5000);
            };

            m.onresult = (e) => {
                m._startedAt = Date.now(); // reset timer on activity
                const transcript = e.results[e.results.length - 1][0].transcript.trim();
                if (!transcript) return;
                const cmd = parseCommand(transcript);
                setStatusText('You said: "' + transcript + '"');

                // Barge-in: cancel TTS for navigation commands
                const bargeInCmds = ['close','nav:chatbot','nav:quiz',
                                     'nav:alphabets','nav:numbers','nav:lesson','nav:logout'];
                if (bargeInCmds.includes(cmd)) {
                    window.speechSynthesis.cancel();
                    isSpeaking = false;
                }

                if (onResult) onResult(cmd, transcript);
            };

            m.onerror = (e) => {
                clearInterval(watchdog);
                if (e.error === 'no-speech') {
                    // Chrome fires no-speech but mic is still alive — do nothing
                    return;
                }
                mic = null;
                setTimeout(startInstance, 800);
            };

            m.onend = () => {
                clearInterval(watchdog);
                mic = null;
                // Always restart — this is the "always-on" guarantee
                setTimeout(startInstance, 300);
            };

            try {
                m.start();
            } catch(e) {
                mic = null;
                setTimeout(startInstance, 1000);
            }
        }

        startInstance();
    }

    // ── Smart response builder ────────────────────────────────
    function buildExplanation(label, word, dotSpeech) {
        // Step-by-step lesson explanation
        return [
            'This is the letter ' + label + '.',
            label + ' ... for ... ' + word + '.',
            dotSpeech,
            'Let me say that one more time.',
            label + ' ... for ... ' + word + '.',
        ];
    }

    // ── Fallback response ─────────────────────────────────────
    function fallback(onEnd) {
        speak(
            'I did not understand that. You can say yes to continue, repeat to hear again, or help to hear all options.',
            onEnd
        );
    }

    function helpMessage(onEnd) {
        speakSteps([
            'Here are your options.',
            'Say yes or start to begin.',
            'Say repeat or again to hear the last thing again.',
            'Say no or stop to pause.',
            'Say go back to return to the dashboard.',
            'Say I do not understand if you need a simpler explanation.',
        ], 600, onEnd);
    }

    // ── Public API ────────────────────────────────────────────
    return {
        speak,
        speakSteps,
        repeatLast,
        listen,
        listenAlwaysOn,
        stopListening,
        parseCommand,
        praise,
        fallback,
        helpMessage,
        setAvatarState,
        setStatusText,
        buildExplanation,
        getLastSpoken: () => lastSpoken,
        setContext:    (ctx) => { lastContext = ctx; },
        getContext:    () => lastContext,
    };

})();
