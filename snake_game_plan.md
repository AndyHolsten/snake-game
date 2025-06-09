# Product Requirements Document: Browser Snake Game

## 1. Overview

This document outlines the requirements for a classic snake game that can be played in a web browser. The goal is to create a simple, fun, and shareable game using fundamental web technologies.

## 2. Core Technologies

*   **HTML:** For the basic structure of the game page.
*   **CSS:** For styling the game board, snake, food, and other UI elements.
*   **JavaScript (with HTML5 Canvas):** For all game logic, rendering, and user interaction.

## 3. Key Features

This section details the primary features of the game, broken down into tasks with checkboxes to track progress.

### Phase 1: Project Setup

- [x] Create `index.html` for the web page structure.
- [x] Create `style.css` for visual styling.
- [x] Create `script.js` for the game's logic.
- [x] Link the CSS and JavaScript files within `index.html`.

### Phase 2: Core Game Mechanics

- [ ] **Game Board:**
    - [ ] Set up an HTML5 `<canvas>` element to serve as the game area.
- [ ] **Snake:**
    - [ ] Create a data structure to represent the snake (e.g., an array of coordinates).
    - [ ] Implement logic for the snake to move continuously in one direction.
    - [ ] Implement logic for the snake to grow longer when it eats food.
- [ ] **Food:**
    - [ ] Create a data structure for the food.
    - [ ] Implement logic to place food at a random position on the board.
    - [ ] Ensure food does not spawn on top of the snake.
- [ ] **Player Controls:**
    - [ ] Capture user input from the keyboard (Arrow Keys) to change the snake's direction.
    - [ ] Prevent the snake from reversing its direction (e.g., moving left if it's currently moving right).
- [ ] **Game Loop:**
    - [ ] Create a main loop that updates the game state and re-draws the canvas at a consistent rate (e.g., 10 times per second).

### Phase 3: Visuals & User Interface (UI)

- [ ] **Rendering:**
    - [ ] Write a function to draw the game board on the canvas.
    - [ ] Write a function to draw the snake on the canvas.
    - [ ] **Customization:** Make the snake's color purple.
    - [ ] Write a function to draw the food on the canvas.
- [ ] **Scoreboard:**
    - [ ] Create an HTML element to display the score.
    - [ ] Use CSS to position the scoreboard in the **bottom-right** corner of the game area.
    - [ ] Update the score every time the snake eats food.

### Phase 4: Game Rules & State

- [ ] **Collision Detection:**
    - [ ] Detect when the snake's head collides with a piece of food.
    - [ ] Detect when the snake's head collides with the boundaries of the game board.
    - [ ] Detect when the snake's head collides with its own body.
- [ ] **Game Over:**
    - [ ] Stop the game loop upon a collision with the wall or itself.
    - [ ] Display a "Game Over" message to the player.
    - [ ] Add a mechanism to restart the game after it's over (e.g., by pressing a key).

## 4. Post-Launch (Optional Features)

- [ ] High score tracking (using browser's local storage).
- [ ] Multiple difficulty levels (e.g., easy, medium, hard) that change the snake's speed.
- [ ] Sound effects for eating food and game over.
- [ ] A start screen and pause functionality. 