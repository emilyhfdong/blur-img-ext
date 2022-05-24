const CLASSNAME_PREFIX = "blur-img-ext-blur"
const getClassName = (blurValue) => `${CLASSNAME_PREFIX}${blurValue}`

const styles = new Array(20).fill(0).reduce(
  (acc, _, idx) =>
    acc +
    `
      img.${getClassName(idx + 1)} {
        filter: blur(${idx + 1}px) !important;
        -webkit-filter: blur(${idx + 1}px) !important;
      }
    `,
  ""
)
const styleElement = document.createElement("style")
styleElement.textContent = styles
document.head.append(styleElement)

chrome.runtime.onMessage.addListener((message, sender, sendMessage) => {
  // console.log("hii message", message)

  switch (message.type) {
    case "blur_value_change":
      document.querySelectorAll("img").forEach((imgNode) => {
        imgNode.classList.forEach((className) => {
          if (className.includes(CLASSNAME_PREFIX)) {
            imgNode.classList.remove(className)
          }
        })
        imgNode.classList.add(getClassName(message.data.value))
      })
      break
  }
  sendMessage({ message: "ok" })
})
