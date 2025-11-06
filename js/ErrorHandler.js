// js/ErrorHandler.js

// Private DOM-Elemente
let overlay;
let errorContent;
let errorMessageEl;
let closeButton;
let header;

// Private Funktion zum Anzeigen des Overlays
function displayError(message, source = 'Unbekannt', lineno = '?', colno = '?') {
    if (!overlay) {
        console.error("ErrorHandler nicht initialisiert, aber Fehler gefangen:", message);
        alert(`Kritischer Fehler (ErrorHandler nicht init):\n${message}`);
        return;
    }

    const formattedMessage = `Fehler: ${message}\nQuelle: ${source}\nZeile: ${lineno}, Spalte: ${colno}`;
    
    console.error(formattedMessage); // Immer in der Konsole loggen
    
    errorMessageEl.textContent = formattedMessage;
    overlay.classList.remove('hidden');
    
    // Beim ersten Fehler anzeigen, aber Inhalt verstecken
    if (!errorContent.style.display || errorContent.style.display === 'none') {
        errorContent.style.display = 'none';
    }
}

/**
 * Initialisiert den globalen ErrorHandler.
 * Muss in main.js aufgerufen werden.
 */
export function init() {
    overlay = document.getElementById('error-overlay');
    errorContent = document.querySelector('.error-content');
    errorMessageEl = document.getElementById('error-message');
    closeButton = document.getElementById('error-close');
    header = document.querySelector('.error-header');

    if (!overlay || !errorContent || !errorMessageEl || !closeButton || !header) {
        console.error("Fehler: ErrorHandler-DOM-Elemente nicht gefunden.");
        return;
    }

    // Event Listeners
    header.addEventListener('click', () => {
        const isHidden = errorContent.style.display === 'none';
        errorContent.style.display = isHidden ? 'block' : 'none';
    });

    closeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Verhindert, dass der Klick auch den Header triggert
        overlay.classList.add('hidden');
        errorContent.style.display = 'none'; // Zurücksetzen
    });

    // Globale Fehler-Handler setzen
    window.onerror = (message, source, lineno, colno, error) => {
        displayError(message, source, lineno, colno);
        return true; // Verhindert, dass der Fehler in der Browser-Konsole (manchmal) doppelt erscheint
    };

    window.addEventListener('unhandledrejection', (event) => {
        displayError(event.reason || 'Nicht-abgefangene Promise-Ablehnung', 'Promise');
    });

    console.log("✅ Globaler ErrorHandler initialisiert.");
}

/**
 * Loggt einen kontrollierten Fehler im Error-Overlay.
 * @param {Error} error - Das Error-Objekt.
 * @param {string} [context] - Optionaler Kontext (z.B. 'JobManager.assignJob')
 */
export function log(error, context = 'Unbekannter Kontext') {
    const message = `Kontrollierter Fehler [${context}]: ${error.message}`;
    displayError(message, error.stack || 'Kein Stacktrace verfügbar');
}
