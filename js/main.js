// js/main.js

import { init as initErrorHandler, log } from './ErrorHandler.js';
initErrorHandler();

// Importiere die "Welt"-Klasse
import { Simulation } from './Simulation.js';
// import { JobManager } from './JobManager.js'; // Noch nicht genutzt

console.log("main.js geladen.");

// Globale Variablen für p5.js
let sim;
let jobMgr;
let config;
let layoutImg;

// --- p5.js Lebenszyklus ---

function preload() {
    console.log("p5: preload start");
    try {
        // Lade die Konfiguration
        // p5.js stellt sicher, dass 'config' in setup() verfügbar ist
        config = loadJSON('config.json');
    } catch (error) {
        log(error, "preload");
        throw error;
    }
    console.log("p5: preload ende. Config-Pfad:", config.layoutImage);
}

function setup() {
    console.log("p5: setup start");
    
    // Lade das HINTERGRUNDBILD basierend auf der config.
    // Wir nutzen den Callback von loadImage, um die Simulation
    // erst zu starten, NACHDEM das Bild geladen ist.
    layoutImg = loadImage(config.layoutImage, (img) => {
        console.log("Bild geladen:", config.layoutImage, img.width, img.height);
        
        // Canvas an Bildgröße anpassen!
        const container = document.getElementById('canvas-container');
        const canvas = createCanvas(img.width, img.height);
        canvas.parent(container);

        // Initialisiere die Simulation
        try {
            sim = new Simulation(config, img);
            console.log("✅ Simulation initialisiert.");
        } catch (error) {
            log(error, "Simulation.constructor");
        }

    }, (event) => {
        // Fehler-Callback für loadImage
        log(new Error(`Bild konnte nicht geladen werden: ${config.layoutImage}`), "setup.loadImage");
    });

    // Wichtiger Hinweis: setup() endet hier. 
    // Der Code in draw() wird erst ausgeführt, aber 'sim' 
    // ist möglicherweise noch nicht definiert, bis das Bild geladen ist.
    console.log("p5: setup ende (warte auf Bild-Ladevorgang...)");
}

function draw() {
    // Zeichne nur, wenn die Simulation (und das Bild) bereit ist
    if (sim) {
        try {
            sim.update();
            sim.draw();
        } catch (error) {
            log(error, "Global Draw/Update Loop");
            noLoop(); // Stoppe die Simulation bei einem kritischen Draw-Fehler
        }
    } else {
        // Fallback, falls das Bild noch lädt
        background(50);
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Lade Simulation & Layout...", width / 2, height / 2);
    }
}

// --- Globale p5-Instanz ---
window.preload = preload;
window.setup = setup;
window.draw = draw;

// Optional: Canvas-Größe an Fenster anpassen (später)
// function windowResized() {
//     const container = document.getElementById('canvas-container');
//     resizeCanvas(container.clientWidth, container.clientHeight);
// }
// window.windowResized = windowResized;
