# Lotto Number Generator

## Overview

This project is a web-based lottery number generator with a modern dark/light mode toggle, a partnership inquiry form, Disqus comments, and Google AdSense integration.

## Features

*   **Lottery Number Generation:** Generates a set of 6 unique random numbers between 1 and 45.
*   **Interactive UI:** A user-friendly interface with a button to trigger the number generation.
*   **Theme Toggle:** Supports both Dark Mode and Light Mode with persistence via `localStorage`.
*   **Partnership Inquiry Form:** A contact form that allows users to send messages directly via Formspree.
*   **Disqus Comments:** A real-time comment section for user interaction.
*   **Google AdSense:** Integrated for monetization with proper verification.
*   **Google Analytics:** Track user engagement and traffic with G-3M6MV860FN.
*   **Microsoft Clarity:** Heatmaps and session recordings for advanced user behavior analysis (ID: vysmevk8k7).
*   **Visual Display:** The generated numbers are displayed in a clear and aesthetically pleasing format using Web Components.
*   **Modern Design:** The UI is designed with modern CSS, including CSS variables, transitions, and responsive layout.

## Implementation Details

### Dark/Light Mode
*   **CSS Variables:** Used for background colors, text colors, and shadows.
*   **Theme Toggle Button:** A button in the top right allows users to switch between themes.
*   **Persistence:** The chosen theme is saved in `localStorage`.

### Partnership Inquiry Form
*   **Service:** Formspree (`https://formspree.io/f/mqeyjbyy`).
*   **Fields:** Email address and Message.

### Disqus Comments
*   **Service:** Disqus (`lotto23.disqus.com`).
*   **Location:** Integrated at the bottom of the page.

### Google AdSense
*   **Verification:** `ads.txt` added to the root.
*   **Tags:** AdSense meta tag and script added to the HTML head.

## Development History

1.  **Initial Version:** Basic structure with `index.html`, `style.css`, and `main.js`.
2.  **Theme Implementation:** Added Dark/Light mode toggle.
3.  **Form Implementation:** Added a Formspree-powered partnership inquiry form.
4.  **Comments Implementation:** Integrated Disqus comment thread.
5.  **AdSense Implementation:** Added Google AdSense script and verification.

## Future Plans

1.  **Continuous Deployment:** Keep the repository updated via `git push`.
