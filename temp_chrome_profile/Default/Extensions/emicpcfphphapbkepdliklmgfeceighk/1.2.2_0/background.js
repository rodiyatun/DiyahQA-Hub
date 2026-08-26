let enabled = false;

chrome.action.onClicked.addListener(async (tab) => {
  enabled = !enabled;

  if (enabled) {
    // Enable inspector
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["style.css"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });

    // Set colored icon when enabled
    chrome.action.setIcon({
      path: {
        16: "icons/icon16.png",
        48: "icons/icon48.png",
        128: "icons/icon128.png",
      },
      tabId: tab.id,
    });
  } else {
    // Disable inspector
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        if (window.__focusInspectorCleanup) window.__focusInspectorCleanup();
      },
    });

    // Set grey icon when disabled
    chrome.action.setIcon({
      path: {
        16: "icons/icon16-grey.png",
        48: "icons/icon48-grey.png",
        128: "icons/icon128-grey.png",
      },
      tabId: tab.id,
    });
  }
});
