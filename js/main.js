/**
 * main.js - Der Dirigent der Götterschlacht
 * Orchestriert die Spiel-Logik, Eingaben und Kollisionen.
 */

import { Zeus, Hera } from './modules/Gods.js';
import { Swan, Bull } from './modules/Avatars.js';
import Projectile from './modules/Projectile.js';
import { keys } from './input.js';

// --- Setup & Initialisierung ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Instanzen der Götter
const zeus = new Zeus();
const hera = new Hera();

// Spiel-Zustand
const avatars = [];
const projectiles = [];
const codes = ["OLYMP", "STIER", "GOLD", "REGEN", "ADLER", "BLITZ"];

let playerX = canvas.width / 2;
const playerSpeed = 5;
let score = 0;
let lives = 3;

// --- Funktionen ---

/**
 * Erzeugt einen neuen Avatar an Zeus' aktueller Position.
 * Didaktik: Zeigt Polymorphismus bei der Erstellung.
 */
function spawnAvatar() {
    const code = codes[Math.floor(Math.random() * codes.length)];
    // Langsame Fallgeschwindigkeit für bessere Spielbarkeit
    const speed = 0.8 + Math.random() * 1.2; 
    
    const newAvatar = Math.random() > 0.5 
        ? new Swan(zeus.x, speed, code) 
        : new Bull(zeus.x, speed, code);
    
    avatars.push(newAvatar);
}

/**
 * Event-Listener für das Abschießen (Leertaste).
 * Verhindert Standard-Scrolling und nutzt den aktuellen Code aus dem Input.
 */
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        const input = document.getElementById('codeInput');
        const typedCode = input.value.trim().toUpperCase();

        if (typedCode !== "") {
            e.preventDefault(); // Verhindert Leerzeichen im Input und Page-Scroll
            // Projektil startet an der Position des Spielers (Bogen)
            projectiles.push(new Projectile(playerX, canvas.height - 80, typedCode));
            input.value = ""; // Feld leeren für den nächsten Code
        }
    }
});

/**
 * Hauptschleife des Spiels
 */
function gameLoop() {
    // 1. Spielfeld leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Spieler-Bewegung & Zeichnen
    if (keys.left && playerX > 50) playerX -= playerSpeed;
    if (keys.right && playerX < canvas.width - 50) playerX += playerSpeed;

    ctx.font = "50px serif";
    ctx.textAlign = "center";
    ctx.fillText("🏹", playerX, canvas.height - 40);

    // 3. Götter-Logik (Zeus patrouilliert, Hera verfolgt ihn)
    zeus.update();
    zeus.draw(ctx);
    hera.update(zeus.x);
    hera.draw(ctx);

    // 4. Dynamisches Spawning (niedrige Wahrscheinlichkeit für entspanntes Spiel)
    if (Math.random() < 0.005) spawnAvatar();

    // 5. Avatare verarbeiten (Rückwärts-Schleife für sicheres Splicing)
    for (let i = avatars.length - 1; i >= 0; i--) {
        const a = avatars[i];
        const hitGround = a.update(canvas.height);
        a.draw(ctx);

        if (hitGround) {
            lives--;
            document.getElementById('lives').innerText = lives;
            document.getElementById('message').innerText = "Hera tobt! Ein Abbild erreichte die Erde.";
            avatars.splice(i, 1);

            if (lives <= 0) {
                alert("Game Over! Dionysos wurde gezeugt. Der Olymp bebt!");
                location.reload(); 
            }
        }
    }

    // 6. Projektile & Kollisionsprüfung (Zwei verschachtelte Rückwärts-Schleifen)
    for (let pi = projectiles.length - 1; pi >= 0; pi--) {
        const p = projectiles[pi];
        p.update();
        p.draw(ctx);

        // Projektil entfernen, wenn es das Spielfeld oben verlässt
        if (!p.active) {
            projectiles.splice(pi, 1);
            continue;
        }

        for (let ai = avatars.length - 1; ai >= 0; ai--) {
            const a = avatars[ai];

            // Distanz-Berechnung (Pythagoras)
            const dist = Math.hypot(p.x - a.x, p.y - a.y);
            // Präziser Code-Abgleich
            const codeMatch = p.code === a.code;

            if (dist < 50) { // Wenn in Reichweite
                if (codeMatch) {
                    // Treffer! Beide Objekte löschen
                    avatars.splice(ai, 1);
                    projectiles.splice(pi, 1);
                    score += 10;
                    document.getElementById('score').innerText = score;
                    document.getElementById('message').innerText = "Treffer! Zeus' List wurde gebannt.";
                    break; // Äußere Schleife für dieses Projektil beenden
                } else {
                    // Projektil fliegt bei falschem Code einfach durch (oder verpufft)
                    // Optional: p.active = false;
                }
            }
        }
    }

    requestAnimationFrame(gameLoop);
}

// Start des Spiels
gameLoop();