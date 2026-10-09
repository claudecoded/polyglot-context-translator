// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translatePolyglot",
    title: "Translate Polyglot Selection",
    contexts: ["selection"]
  });
});

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translatePolyglot" && info.selectionText) {
    // Send the selected text to the content script in the active tab
    chrome.tabs.sendMessage(tab.id, {
      action: "triggerTranslation",
      text: info.selectionText
    });
  }
});
