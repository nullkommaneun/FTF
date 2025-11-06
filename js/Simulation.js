// js/Simulation.js
import { AGV } from './AGV.js';

export class Simulation {
    /**
     * Erstellt die Simulationswelt.
     * @param {object} config - Das geladene config.json-Objekt
     * @param {p5.Image} layoutImg - Das geladene Hintergrundbild
     */
    constructor(config, layoutImg) {
        this.config = config;
        this.layoutImg = layoutImg;
        
        this.stations = config.stations;
        this.paths = config.paths; // Noch ungenutzt, Phase 4
        this.agvs = [];

        // Initialisiere die AGVs (FTS)
        this.initAGVs();
    }

    initAGVs() {
        for (const start of this.config.agvStarts) {
            const posVec = createVector(start.pos.x, start.pos.y);
            const newAgv = new AGV(start.id, posVec, start.angle, this);
            this.agvs.push(newAgv);
        }
    }

    /**
     * Globale Update-Funktion (aufgerufen in main.js draw())
     */
    update() {
        // Update alle AGVs
        for (const agv of this.agvs) {
            agv.update();
        }
        
        // Später: JobManager.update(), Kollisions-Check, etc.
    }

    /**
     * Globale Draw-Funktion (aufgerufen in main.js draw())
     */
    draw() {
        // 1. Zeichne den Hintergrund
        image(this.layoutImg, 0, 0);

        // 2. Zeichne Stationen
        this.drawStations();

        // 3. Zeichne Pfade (optional, zur Visualisierung)
        this.drawPaths();

        // 4. Zeichne alle AGVs
        for (const agv of this.agvs) {
            agv.draw();
        }
    }

    drawStations() {
        for (const station of this.stations) {
            push();
            stroke(0);
            strokeWeight(2);
            
            if (station.type === 'pickup') fill(0, 200, 0); // Grün
            else if (station.type === 'dropoff') fill(200, 0, 0); // Rot
            else if (station.type === 'charge') fill(255, 200, 0); // Gelb
            else fill(150); // Grau

            rectMode(CENTER);
            rect(station.pos.x, station.pos.y, 40, 40);

            // Text
            noStroke();
            fill(0);
            textAlign(CENTER, CENTER);
            text(station.id, station.pos.x, station.pos.y - 30);
            pop();
        }
    }

    drawPaths() {
        for (const path of this.paths) {
            push();
            stroke(255, 255, 255, 100); // Transparentes Weiß
            strokeWeight(3);
            noFill();
            
            beginShape();
            for (const wp of path.waypoints) {
                vertex(wp.x, wp.y);
            }
            endShape();
            
            // Wegpunkte als kleine Kreise
            for (const wp of path.waypoints) {
                fill(255, 100);
                noStroke();
                circle(wp.x, wp.y, 5);
            }
            pop();
        }
    }
}

