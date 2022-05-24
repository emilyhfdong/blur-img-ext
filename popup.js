window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("blur-slider")

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]

    chrome.runtime.sendMessage(
      {
        type: "tab_activated",
        data: { tabId: activeTab.id },
      },
      (response) => {
        if (response.value) {
          slider.value = response.value
        }
      }
    )
  })

  slider.addEventListener("change", (e) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]

      chrome.runtime.sendMessage({
        type: "blur_value_change",
        data: { value: e.target.value, tabId: activeTab.id },
      })
    })
  })
})
