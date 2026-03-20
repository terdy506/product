# Lotto Number Generator

## Overview

This project is a web-based lottery number generator. It provides users with a simple and visually appealing interface to generate random lottery numbers with a modern dark/light mode toggle.

## Features

*   **Lottery Number Generation:** Generates a set of 6 unique random numbers between 1 and 45.
*   **Interactive UI:** A user-friendly interface with a button to trigger the number generation.
*   **Theme Toggle:** Supports both Dark Mode and Light Mode with persistence via `localStorage`.
*   **Visual Display:** The generated numbers are displayed in a clear and aesthetically pleasing format using Web Components.
*   **Modern Design:** The UI is designed with modern CSS, including CSS variables, transitions, and responsive layout.

## Implementation Details

### Dark/Light Mode
*   **CSS Variables:** Used for background colors, text colors, and shadows.
*   **Theme Toggle Button:** A button in the top right allows users to switch between themes.
*   **Persistence:** The chosen theme is saved in `localStorage` so it persists after page reloads.

### Web Components
*   **`lotto-ball`:** A custom element that represents a lottery ball with dynamic number and color based on its value.

## Development History

1.  **Initial Version:** Basic structure with `index.html`, `style.css`, and `main.js`.
2.  **Theme Implementation:** 
    *   Added CSS variables to `style.css`.
    *   Added Dark Mode styles using `.dark-theme` class.
    *   Added theme toggle button to `index.html`.
    *   Implemented toggle logic and storage in `main.js`.

## Future Plans

1.  **Deployment:** Deploy the application to a remote repository using `git push`.
