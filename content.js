// Universal API wrapper for cross-browser compatibility
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

// Listen for the trigger message from the background script
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "triggerTranslation") {
    processTranslation(request.text);
  }
});

async function processTranslation(word) {
  removeExistingPopup();

  const cleanWord = word.trim();
  if (!cleanWord) return;

  const hostname = window.location.hostname;
  const tld = hostname.split('.').pop();
  
  const languagePairs = [
    { from: 'es', to: 'en', label: '🇪🇸 Spanish' },
    { from: 'fr', to: 'en', label: '🇫🇷 French' },
    { from: 'de', to: 'en', label: '🇩🇪 German' },
    { from: 'it', to: 'en', label: '🇮🇹 Italian' },
    { from: 'pt', to: 'en', label: '🇵🇹 Portuguese' }
  ];

  const tldMap = { 'fr': 'fr', 'de': 'de', 'es': 'es', 'it': 'it', 'br': 'pt', 'pt': 'pt' };
  if (tldMap[tld]) {
    const priorityIndex = languagePairs.findIndex(p => p.from === tldMap[tld]);
    if (priorityIndex > -1) {
      const [priorityLang] = languagePairs.splice(priorityIndex, 1);
      languagePairs.unshift(priorityLang);
    }
  }

  showLoadingPopup();

  const translationPromises = languagePairs.map(async (pair) => {
    try {
      const response = await fetch(`https://translated.net{encodeURIComponent(cleanWord)}&langpair=${pair.from}|${pair.to}`);
      const data = await response.json();
      const translation = data.responseData.translatedText;
      
      if (translation && translation.toLowerCase() !== cleanWord.toLowerCase()) {
        return { label: pair.label, translation: translation };
      }
      return null;
    } catch (error) {
      return null;
    }
  });

  const results = (await Promise.all(translationPromises)).filter(r => r !== null);
  renderResultsPopup(cleanWord, results);
}

function showLoadingPopup() {
  const popup = document.createElement('div');
  popup.id = 'polyglot-translator-popup';
  popup.innerHTML = `<div class="polyglot-loading">Searching multi-language contexts...</div>`;
  document.body.appendChild(popup);
  positionPopup(popup);
}

function renderResultsPopup(word, results) {
  const popup = document.getElementById('polyglot-translator-popup');
  if (!popup) return;

  if (results.length === 0) {
    popup.innerHTML = `
      <div class="polyglot-header"><strong>"${word}"</strong></div>
      <div class="polyglot-no-results">No distinct translations found for candidate languages.</div>
      <div class="polyglot-footer">Click outside to close</div>
    `;
    return;
  }

  let htmlContent = `<div class="polyglot-header">Polyglot Contexts for: <strong>"${word}"</strong></div>`;
  htmlContent += `<div class="polyglot-results-list">`;
  
  results.forEach(res => {
    htmlContent += `
      <div class="polyglot-result-item">
        <span class="polyglot-lang-badge">${res.label}</span>
        <span class="polyglot-translation-text">${res.translation}</span>
      </div>
    `;
  });
  
  htmlContent += `</div><div class="polyglot-footer">Click anywhere to close</div>`;
  popup.innerHTML = htmlContent;
}

function positionPopup(popup) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
  }
}

function removeExistingPopup() {
  const existing = document.getElementById('polyglot-translator-popup');
  if (existing) existing.remove();
}

document.addEventListener('mousedown', (e) => {
  const popup = document.getElementById('polyglot-translator-popup');
  if (popup && !popup.contains(e.target)) {
    removeExistingPopup();
  }
});
