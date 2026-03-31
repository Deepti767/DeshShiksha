import re

# ── Alphabet & number knowledge base ─────────────────────────
ALPHABET_DATA = {
    'A': ('Apple',   '🍎'), 'B': ('Bee',      '🐝'), 'C': ('Cat',      '🐱'),
    'D': ('Dog',     '🐶'), 'E': ('Elephant', '🐘'), 'F': ('Frog',     '🐸'),
    'G': ('Grapes',  '🍇'), 'H': ('House',    '🏠'), 'I': ('Ice Cream','🍦'),
    'J': ('Jug',     '🎃'), 'K': ('Kite',     '🪁'), 'L': ('Lion',     '🦁'),
    'M': ('Moon',    '🌙'), 'N': ('Nut',      '🌰'), 'O': ('Orange',   '🍊'),
    'P': ('Penguin', '🐧'), 'Q': ('Queen',    '👸'), 'R': ('Rainbow',  '🌈'),
    'S': ('Star',    '⭐'), 'T': ('Tiger',    '🐯'), 'U': ('Umbrella', '☂️'),
    'V': ('Violin',  '🎻'), 'W': ('Whale',    '🐋'), 'X': ('Xylophone','🎸'),
    'Y': ('Yo-yo',   '🪀'), 'Z': ('Zebra',    '🦓'),
}

NUMBER_DATA = {
    '1': '☝️', '2': '✌️', '3': '🤟', '4': '🍀', '5': '🖐️',
    '6': '🎲', '7': '🌈', '8': '🎱', '9': '🐱', '10': '🙌',
}

HELP_TEXT = (
    "Here's what I can help with:\n"
    "• Ask about a letter — e.g. \"What is A?\"\n"
    "• Ask about a number — e.g. \"What is 5?\"\n"
    "• Type \"alphabets\" to see all letters\n"
    "• Type \"numbers\" to see all numbers\n"
    "• Type \"quiz help\" for quiz guidance\n"
    "• Type \"dashboard\" to go back"
)

QUIZ_HELP = (
    "📝 Quiz Guide:\n"
    "1. Go to your dashboard\n"
    "2. Click the Quiz card\n"
    "3. Read each question carefully\n"
    "4. Select the best answer\n"
    "5. Submit to earn 20 points!\n"
    "Good luck! 🌟"
)


def get_response(message: str) -> dict:
    """Return {'text': str, 'link': str|None}"""
    msg = message.strip().lower()

    # ── Greetings ─────────────────────────────────────────────
    if re.search(r'\b(hi|hello|hey|helo)\b', msg):
        return {'text': 'Hello! 👋 I am your learning assistant. Type "help" to see what I can do!', 'link': None}

    # ── Help ──────────────────────────────────────────────────
    if re.search(r'\bhelp\b', msg) and 'quiz' not in msg:
        return {'text': HELP_TEXT, 'link': None}

    # ── Quiz help ─────────────────────────────────────────────
    if 'quiz' in msg:
        return {'text': QUIZ_HELP, 'link': '/learning/blind/quiz/'}

    # ── Dashboard ─────────────────────────────────────────────
    if 'dashboard' in msg:
        return {'text': 'Taking you to your dashboard! 🏠', 'link': '/users/dashboard/'}

    # ── All alphabets ─────────────────────────────────────────
    if msg in ('alphabets', 'alphabet', 'letters', 'all letters', 'show alphabets'):
        lines = [f"{k} — {v[0]} {v[1]}" for k, v in ALPHABET_DATA.items()]
        return {'text': '🔤 Alphabets:\n' + '\n'.join(lines), 'link': None}

    # ── All numbers ───────────────────────────────────────────
    if msg in ('numbers', 'number', 'all numbers', 'show numbers'):
        lines = [f"{k} {v}" for k, v in NUMBER_DATA.items()]
        return {'text': '🔢 Numbers:\n' + '\n'.join(lines), 'link': None}

    # ── "What is X?" / "Tell me about X" / just "A" ──────────
    # Match single letter queries
    letter_match = re.search(r'\b([a-z])\b', msg)
    # Match "what is A" or "tell me A"
    explicit_match = re.search(r'(?:what is|tell me about|explain|show)\s+([a-z0-9]+)', msg)

    query = None
    if explicit_match:
        query = explicit_match.group(1).upper()
    elif letter_match and len(msg) <= 3:
        query = letter_match.group(1).upper()

    if query:
        if query in ALPHABET_DATA:
            word, emoji = ALPHABET_DATA[query]
            return {
                'text': f'{emoji} {query} is for {word}!\nSay it: "{query} for {word}"',
                'link': None
            }
        if query in NUMBER_DATA:
            emoji = NUMBER_DATA[query]
            return {
                'text': f'{emoji} The number {query}!\nCount: {" ".join(["•"] * int(query))}',
                'link': None
            }

    # ── Number queries like "what is 5" ───────────────────────
    num_match = re.search(r'\b(10|[1-9])\b', msg)
    if num_match:
        n = num_match.group(1)
        if n in NUMBER_DATA:
            emoji = NUMBER_DATA[n]
            return {
                'text': f'{emoji} The number {n}!\nCount: {" ".join(["•"] * int(n))}',
                'link': None
            }

    # ── Points / progress ─────────────────────────────────────
    if 'point' in msg or 'score' in msg or 'progress' in msg:
        return {'text': 'Check your points on your dashboard! Each lesson gives 10 pts, each quiz gives 20 pts. 🌟', 'link': '/users/dashboard/'}

    # ── Fallback ──────────────────────────────────────────────
    return {
        'text': "I'm not sure about that. Try asking:\n• \"What is A?\"\n• \"What is 5?\"\n• \"help\"",
        'link': None
    }
