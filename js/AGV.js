// js/AGV.js

export class AGV {
    /**
     * Erstellt ein neues FTS (AGV).
     * @param {string} id - Eindeutige ID (z.B. "FTS_01")
     * @param {p5.Vector} pos - Startposition (p5.Vector)
     * @param {number} angle - Startwinkel (in Radianten)
     * @param {Simulation} simulation - Referenz zur Hauptsimulation
     */
    constructor(id, pos, angle, simulation) {
        this.id = id;
        this.pos = pos; // p5.Vector
        this.angle = angle;
        this.simulation = simulation; // Referenz für Kollisionen etc.

        this.vel = createVector(0, 0); // Geschwindigkeit
        this.state = 'IDLE'; // Platzhalter
        
        console.log(`AGV ${this.id} erstellt bei`, pos.x, pos.y);
    }

    /**
     * Update-Logik (Physik, Status)
     */
    update() {
        // Wird in Phase 3 implementiert
        this.pos.add(this.vel); // Simple Platzhalter-Physik
    }

    /**
     * Zeichnet das FTS
     */
    draw() {
        // Speichere aktuellen Zeichenkontext
        push(); 
        
        // Verschiebe den Ursprung zur FTS-Position und rotiere
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);

        // Zeichne das FTS (z.B. als Dreieck)
        fill(0, 150, 255); // Blau
        stroke(255);
        strokeWeight(2);

        // Dreieck, das "vorwärts" (entlang der X-Achse im lokalen Raum) zeigt
        beginShape();
        vertex(15, 0);  // Nase
        vertex(-10, -10); // Hinten links
        vertex(-10, 10);  // Hinten rechts
        endShape(CLOSE);

        // Setze den Zeichenkontext zurück
        pop(); 
    }
}

