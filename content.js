  // Expanded candidate target pairs to support global languages including Russian, Japanese, and Chinese
  const languagePairs = [
    { from: 'es', to: 'en', label: '🇪🇸 Spanish' },
    { from: 'fr', to: 'en', label: '🇫🇷 French' },
    { from: 'de', to: 'en', label: '🇩🇪 German' },
    { from: 'it', to: 'en', label: '🇮🇹 Italian' },
    { from: 'pt', to: 'en', label: '🇵🇹 Portuguese' },
    { from: 'ru', to: 'en', label: '🇷🇺 Russian' },
    { from: 'ja', to: 'en', label: '🇯🇵 Japanese' },
    { from: 'zh', to: 'en', label: '🇨🇳 Chinese' }
  ];

  // Map TLD to prioritize specific languages at the top of the list
  const tldMap = { 
    'fr': 'fr', 'de': 'de', 'es': 'es', 'it': 'it', 
    'br': 'pt', 'pt': 'pt', 'ru': 'ru', 'jp': 'ja', 'cn': 'zh' 
  };
