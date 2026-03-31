/**
 * gesture_guide.js
 * Injects a floating gesture cheat-sheet overlay.
 * Call GestureGuide.init(rows) to mount it.
 * Call GestureGuide.highlight(key) when a gesture is detected.
 */

const GestureGuide = (() => {

    let collapsed = false;
    let hideTimer = null;

    // Default rows — override by passing rows to init()
    const DEFAULT_ROWS = [
        { key: '1_finger',    icon: '☝️', action: '1 Finger',    desc: 'Open Alphabets' },
        { key: '2_fingers',   icon: '✌️', action: '2 Fingers',   desc: 'Open Quiz'      },
        { key: '3_fingers',   icon: '🤟', action: '3 Fingers',   desc: 'Open Chatbot'   },
        { key: '4_fingers',   icon: '🖐',  action: '4 Fingers',   desc: 'Open Numbers'   },
        { key: 'thumbs_up',   icon: '👍', action: 'Thumbs Up',   desc: 'Next / Confirm' },
        { key: 'thumbs_down', icon: '👎', action: 'Thumbs Down', desc: 'Go Back Home'   },
        { key: 'fist',        icon: '✊', action: 'Fist',         desc: 'Go Back'        },
    ];

    function build(rows) {
        // Remove existing
        const old = document.getElementById('gesture-guide-float');
        if (old) old.remove();

        const wrap = document.createElement('div');
        wrap.className = 'gesture-guide-float';
        wrap.id = 'gesture-guide-float';

        // Collapsed icon (shown when minimised)
        const collapsedIcon = document.createElement('div');
        collapsedIcon.className = 'gg-collapsed-icon';
        collapsedIcon.textContent = '🤟';
        collapsedIcon.title = 'Show gesture guide';
        collapsedIcon.onclick = toggle;
        wrap.appendChild(collapsedIcon);

        // Header
        const header = document.createElement('div');
        header.className = 'gg-header';
        header.innerHTML =
            '<span class="gg-title">Gesture Guide</span>' +
            '<button class="gg-toggle" onclick="GestureGuide.toggle()" title="Minimise">—</button>';
        wrap.appendChild(header);

        // Rows
        rows.forEach(function(row, i) {
            if (i > 0 && i % 3 === 0) {
                const div = document.createElement('div');
                div.className = 'gg-divider';
                wrap.appendChild(div);
            }
            const r = document.createElement('div');
            r.className = 'gg-row';
            r.id = 'gg-row-' + row.key;
            r.innerHTML =
                '<span class="gg-icon">' + row.icon + '</span>' +
                '<div class="gg-info">' +
                    '<div class="gg-action">' + row.action + '</div>' +
                    '<div class="gg-desc">' + row.desc + '</div>' +
                '</div>';
            wrap.appendChild(r);
        });

        // Detected badge
        const badge = document.createElement('div');
        badge.className = 'gg-detected';
        badge.id = 'gg-detected';
        wrap.appendChild(badge);

        document.body.appendChild(wrap);
    }

    function init(rows) {
        // Inject CSS if not already present
        if (!document.getElementById('gesture-guide-css')) {
            const link = document.createElement('link');
            link.id   = 'gesture-guide-css';
            link.rel  = 'stylesheet';
            link.href = '/static/css/gesture_guide.css';
            document.head.appendChild(link);
        }
        build(rows || DEFAULT_ROWS);
    }

    function highlight(key) {
        // Remove all active states
        document.querySelectorAll('.gg-row').forEach(function(r) {
            r.classList.remove('active');
        });

        const row = document.getElementById('gg-row-' + key);
        if (row) row.classList.add('active');

        // Show detected badge
        const badge = document.getElementById('gg-detected');
        if (badge) {
            const rowData = document.getElementById('gg-row-' + key);
            const icon   = rowData ? rowData.querySelector('.gg-icon').textContent : '';
            const action = rowData ? rowData.querySelector('.gg-action').textContent : key;
            badge.textContent = icon + ' ' + action + ' detected!';
            badge.className = 'gg-detected show';
            clearTimeout(hideTimer);
            hideTimer = setTimeout(function() {
                badge.className = 'gg-detected';
                document.querySelectorAll('.gg-row').forEach(function(r) { r.classList.remove('active'); });
            }, 2000);
        }
    }

    function toggle() {
        collapsed = !collapsed;
        const wrap = document.getElementById('gesture-guide-float');
        if (!wrap) return;
        if (collapsed) {
            wrap.classList.add('collapsed');
        } else {
            wrap.classList.remove('collapsed');
        }
    }

    return { init, highlight, toggle };
})();
