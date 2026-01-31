# Hera’s Vigil: The Metamorphosis of Zeus ⚡🦢

An arcade-style defense game inspired by Greek mythology, built to demonstrate the core pillars of **Object-Oriented Programming (OOP)** in modern JavaScript.

---

## 🏛️ The Mythos
Zeus is attempting to descend to Earth in various mortal disguises (Swan, Bull, etc.) to hide his escapades from his wife, Hera. As a guardian of the mortal realm, you must use sacred codes to intercept these avatars. 

**The Stakes:**
* **Capture Zeus:** Successfully input and fire the code to banish the avatar.
* **Hera’s Wrath:** If an avatar reaches Earth, Hera’s patience thins (Lives: 3).
* **The Dionysos Condition:** If Hera loses her patience, the game ends, she loses her temper, and the god Dionysos is conceived amidst the divine chaos.

---

## 🎓 Didactic Architecture
This project serves as a practical implementation of software design principles. Each game mechanic is a lesson in clean code:

### 1. Abstraction & Encapsulation
The base `GameObject` class is **abstract**. It cannot be instantiated directly, serving only as a blueprint for all moving parts. 
* **Private Fields:** Using `#x` and `#y` (ES2022) ensures coordinates are protected from direct external manipulation. Access is provided via controlled Getters and Setters.

### 2. Inheritance & DRY (Don't Repeat Yourself)
By using a multi-level hierarchy, we avoid code duplication:
* `FallingEntity`: Handles the vertical movement logic for all avatars.
* `HorizontalEntity`: Handles the "patrol" logic for Zeus and Hera at the top of the screen.
* **Polymorphism:** The game loop calls `.update()` and `.draw()` on a collection of objects without needing to know their specific type (Swan, Bull, or Projectile).

### 3. Separation of Concerns
* **Input Management:** A dedicated state-based listener handles keyboard input for fluid, arcade-style movement.
* **Collision Engine:** Logic is decoupled from the entities themselves to ensure a modular and testable flow.

---

## 🛠️ Technical Stack
* **Language:** Vanilla JavaScript (ES6+)
* **Rendering:** HTML5 Canvas API
* **Hosting:** Optimized for [Netlify](https://www.netlify.com)
* **Architecture:** Modular Class-Based OOP

---

## 🚀 Getting Started

### Local Development
1. Clone the repository:
   ```bash
   git clone [https://github.com/jy4education-gif/Hera-s-Vigil-The-Metamorphosis-of-Zeus](https://github.com/jy4education-gif/Hera-s-Vigil-The-Metamorphosis-of-Zeus)

---

## Project Structure

```text
heras-vigil/
├── index.html              # Entry point and main layout
├── README.md               # Project documentation and OOP didactic guide
├── .gitignore              # Git exclusion file (e.g., node_modules, .DS_Store)
├── css/
│   └── style.css           # Game styling and UI transitions
└── js/
    ├── main.js             # Game loop and module orchestration
    ├── input.js            # Keyboard state management (Input Handler)
    └── modules/            # Core OOP Architecture
        ├── GameObject.js   # Abstract base class (Encapsulation)
        ├── Avatars.js      # Zeus' disguises (Inheritance/DRY)
        ├── Gods.js         # Zeus & Hera classes (Horizontal movement)
        └── Projectile.js   # Code-based projectile logic