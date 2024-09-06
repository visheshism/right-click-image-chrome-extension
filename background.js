// Create context menus:
chrome.runtime.onInstalled.addListener(() => {
  // Parent
  chrome.contextMenus.create({
    id: "getImgsfromElement",
    title: "Get Images from Element",
    contexts: ["all"],
  });

  // Children
  chrome.contextMenus.create({
    id: "logImgs",
    title: "Log the images",
    contexts: ["all"],
    parentId: "getImgsfromElement",
  });

  chrome.contextMenus.create({
    id: "openImgsTab",
    title: "Open images in new tab",
    contexts: ["all"],
    parentId: "getImgsfromElement",
  });

});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.parentMenuItemId === "getImgsfromElement") {
    chrome.tabs.sendMessage(
      tab.id,
      { message: "parseImagesfromClickedEl", type: info.menuItemId },
      (Res = []) => {
        // passed default value as [], because it will be undefined for non http/https urls

        if (info.menuItemId === "logImgs") {
          console.log("Images from the element: ", Res);
          return;
        } else if (info.menuItemId === "openImgsTab") {
          if (Res.length === 0) {
            chrome.tabs.sendMessage(tab.id, {
              message: "showAlert",
              data: { body: "No images found. Please try again!" },
            });

            return;
          }

          chrome.tabs.create(
            {
              url: "static/index.html?data=" + Res.map(img => encodeURIComponent(img)).join(","),
            });
        }
      }
    );
  }
});
