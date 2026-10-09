// Universal API wrapper for cross-browser compatibility
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

// Create the context menu item when the extension is installed
browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.contextMenus.create({
    id: "translatePolyglot",
    title: "Translate Polyglot Selection",
    contexts: ["selection"]
  });
});

// Listen for clicks on the context menu item
browserAPI.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translatePolyglot" && info.selectionText) {
    // Send the selected text to the content script in the active tab safely across browsers
    browserAPI.tabs.sendMessage(tab.id, {
      action: "triggerTranslation",
      text: info.selectionText
    });
  }
});
