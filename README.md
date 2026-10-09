# Polyglot Context Translator 🌍

A modern, universal browser extension designed to resolve multi-language ambiguity by fetching and displaying multiple translation possibilities simultaneously based on site context.

## ✨ Features

- **Multi-Language Detection:** Translates short, isolated, or ambiguous words into multiple candidate languages at once instead of forcing a single guess.
- **Cross-Browser Compatibility:** Engineered with an API wrapper to work natively across all major browser engines (Chromium and Gecko).
- **Smart Prioritization:** Automatically reads the website's TLD (e.g., `.fr`, `.de`, `.es`) to prioritize the most likely source language context at the top of the list.
- **Concurrent API Fetching:** Utilizes asynchronous JavaScript (`Promise.all`) to query the MyMemory Translation API in parallel for instant execution.
- **Seamless UI:** Injects a clean, non-intrusive floating popup near the user's text selection that dismisses seamlessly on an outside click.

## 📁 Repository Structure

- `manifest.json` - Cross-browser extension configuration and permissions (Manifest V3 compliant).
- `background.js` - Service worker handling the right-click context menu using a universal API wrapper.
- `content.js` - DOM manipulation script that handles page selection, parallel API requests, and floating popup rendering.
- `styles.css` - Scoped styles ensuring visual consistency across various host websites without breaking native page layouts.

## 🛠️ Installation & Local Testing

Since this extension is open-source and hosted as an unpacked developer project, you can load it manually on your preferred browser:

### For Chromium Browsers (Google Chrome, Microsoft Edge, Brave, Opera)
1. **Clone or Download** this repository to your local machine.
2. Open your browser and navigate to the extensions page (e.g., `edge://extensions/` or `chrome://extensions/`).
3. Enable **Developer mode** using the toggle switch (usually found in the top-right or bottom-left corner).
4. Click on the **Load unpacked** (or *Carregar descompactada*) button.
5. Select the root folder containing these project files.

### For Gecko Browsers (Mozilla Firefox)
1. **Clone or Download** this repository to your local machine.
2. Open Firefox and navigate to `about:debugging`.
3. Click on **This Firefox** in the left sidebar.
4. Click on **Load Temporary Add-on...**
5. Select the `manifest.json` file inside your project folder.

## 🚀 How to Use

1. Visit any website containing foreign or ambiguous text.
2. Highlight a short or ambiguous word (e.g., select the word *"pain"*, *"cine"*, or *"gato"*).
3. Right-click the selected text.
4. From the context menu, click **"Translate Polyglot Selection"**.

<img width="2533" height="416" alt="image" src="https://github.com/user-attachments/assets/564a6ea5-81e2-423e-a70e-eec0eb474830" />

5. View the interactive multi-language translation matrix directly on your screen.
