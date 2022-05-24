const blur = {}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  // console.log("hii message", message)
  const activeTabId = message.data.tabId
  switch (message.type) {
    case "tab_activated": {
      sendResponse({ value: blur[activeTabId] })
      return true
    }
    case "blur_value_change": {
      blur[activeTabId] = message.data.value
      chrome.tabs.sendMessage(activeTabId, message, {}, () => {
        sendResponse({ message: "ok" })
      })
      return true
    }
  }
})

chrome.tabs.onRemoved.addListener((tabId) => {
  if (blur[tabId]) {
    delete blur[tabId]
  }
})
