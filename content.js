// Content script

let clickedEl = null;

document.addEventListener(
  "contextmenu",
  (event) => {
    clickedEl = event.target;
  },
  true
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "parseImagesfromClickedEl") {
    const getImageBg = (el = null, arr) => {
      if (el) {
        const bgImg = el.style?.backgroundImage;
        const tagName = el.tagName;

        // two ! (!!) to combine (bgImg && bgImg!=="") else ("" && "a") will return "" and not false
        if (
          !!bgImg && bgImg.length > 1
        ) {
          arr.push(bgImg.replace(/url\(['"]?(.*?)['"]?\)/, "$1"));
        }

        if (tagName === "IMG" && el.src?.length > 1) {
          arr.push(el.src);
        }

        if (el.childElementCount > 0) {
          for (const childNode of [...el.children]) {
            getImageBg(childNode, arr);
          }
        }
      } else {
        console.log("Invalid HTML element:", el);
      }
    };

    if (clickedEl) {
      let arr = [];

      getImageBg(clickedEl, arr);

      arr = [
        ...new Set(
          arr.filter((img) =>
            /^(https?:\/\/)?([a-z0-9-]+\.)*[a-z0-9-]+\.[a-z]{2,}(\/[^\s]*)?$/.test(
              img
            )
          )
        ),
      ];

      if (request.type === "logImgs") {
        console.log("Images from the element: ", arr);
      }
      sendResponse(arr);
    } else {
      console.log("No element found");
    }
  } else if (request.message === "showAlert") {
    const { body } = request.data;
    body && alert(body);
  }
});
