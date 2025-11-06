// js/main.js

// WICHTIG: Den ErrorHandler als erstes Modul importieren und initialisieren!
import { init as initErrorHandler, log } from './ErrorHandler.js';
initErrorHandler();

// Placeholder-Imports für die Struktur
// Wir werden sie später befüllen.
// import { Simulation } from './Simulation.js';
// import { JobManager } from './JobManager.js';

console.log("main.js geladen.");

// Globale Variablen für p5.js
let sim;
let jobMgr;

// --- p5.js Lebenszyklus ---

function preload() {
    console.log("p5: preload start");
    try {
        // Hier laden wir später config.json und layout.png
    } catch (error) {
        log(error, "preload"); // Fehler an unser System übergeben
        throw error; // Und p5 trotzdem stoppen lassen
    }
    console.log("p5: preload ende");
}

function setup() {
    console.log("p5: setup start");
    const container = document.getElementById('canvas-container');
    const canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent(container);

    // Test des ErrorHandlers (kann auskommentiert werden)
    // throw new Error("Test-Fehler im Setup!"); 
    // testAsyncError();

    console.log("p5: setup ende");
}

function draw() {
    background(50, 50, 50); // Dunkelgrauer Hintergrund
    
    // Hier kommen sim.update() und sim.draw()
    
    // Test: Zeichne "Hallo" um zu sehen, dass es läuft
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Phase 1: ErrorHandler läuft. Canvas aktiv.", width / 2, height / 2);
}

// --- Globale p5-Instanz ---
// Wir binden die p5-Funktionen an das globale window-Objekt,
// damit p5.js sie im "global mode" finden kann.
window.preload = preload;
window.setup = setup;
window.draw = draw;

// --- Hilfsfunktion zum Testen des Async-Error-Handlers ---
async function testAsyncError() {
    await new Promise((_, reject) => 
        setTimeout(() => reject("Test: Asynchroner Fehler (Promise Rejection)"), 1000)
    );
}
