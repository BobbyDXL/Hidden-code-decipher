const substitutionKey = {
    'a': '$', 'b': '#', 'c': '+', 'd': '=', 'e': '%', 'f': '^', 'g': '&',
    'h': '*', 'i': '<', 'j': '>', 'k': '{', 'l': '}', 'm': '[', 'n': ']',
    'o': '`', 'p': '~', 'q': '@', 'r': '/', 's': '|', 't': '\\', 'u': '-',
    'v': '_', 'w': ';', 'x': ':', 'y': '"', 'z': "'",
    'A': 'æ', 'B': 'þ', 'C': 'ð', 'D': 'đ', 'E': 'ə', 'F': 'ł', 'G': 'ŋ',
    'H': 'µ', 'I': 'ø', 'J': 'ß', 'K': 'ś', 'L': 'ł', 'M': 'ż', 'N': 'ź',
    'O': 'ń', 'P': 'ć', 'Q': 'č', 'R': 'ř', 'S': 'š', 'T': 'ť', 'U': 'ů',
    'V': 'ý', 'W': 'ž', 'X': 'ź', 'Y': 'ż', 'Z': 'þ',
    ' ': '_', '.': '°', ',': '¬', '!': '¡', '?': '¿',
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
};

const reverseKey = Object.fromEntries(
    Object.entries(substitutionKey).map(([k, v]) => [v, k])
);

let isPanelVisible = false;

window.onload = function() {
    displayKey();
    setupKeyboardShortcut();
};

function setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + Alt + K to toggle cipher key
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'k') {
            toggleCipherPanel();
        }
    });
}

function toggleCipherPanel() {
    const panel = document.getElementById('cipherPanel');
    isPanelVisible = !isPanelVisible;
    panel.style.transform = isPanelVisible ? 'translateX(0)' : 'translateX(100%)';
}

function displayKey() {
    const keyDiv = document.getElementById('cipherKey');
    keyDiv.innerHTML = '';
    
    Object.entries(substitutionKey).forEach(([original, encrypted]) => {
        const div = document.createElement('div');
        div.className = 'bg-gray-800/50 p-2 rounded-lg text-center text-gray-300 hover:bg-gray-700/50 transition-colors border border-gray-700/50';
        div.innerHTML = `${original} → ${encrypted}`;
        keyDiv.appendChild(div);
    });
}

function convert(direction) {
    const normalText = document.getElementById('normalText');
    const hiddenText = document.getElementById('hiddenText');
    
    if (direction === 'encrypt') {
        let encrypted = '';
        for (let char of normalText.value) {
            encrypted += substitutionKey[char] || char;
        }
        animateText(hiddenText, encrypted);
    } else {
        let decrypted = '';
        for (let char of hiddenText.value) {
            decrypted += reverseKey[char] || char;
        }
        animateText(normalText, decrypted);
    }
}

function animateText(element, finalText) {
    const duration = 500; // Animation duration in ms
    const steps = 10; // Number of animation steps
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep === steps) {
            element.value = finalText;
            clearInterval(interval);
            return;
        }

        let animatedText = '';
        for (let i = 0; i < finalText.length; i++) {
            if (i < (finalText.length * currentStep / steps)) {
                animatedText += finalText[i];
            } else {
                animatedText += '•';
            }
        }
        element.value = animatedText;
        currentStep++;
    }, stepDuration);
}
