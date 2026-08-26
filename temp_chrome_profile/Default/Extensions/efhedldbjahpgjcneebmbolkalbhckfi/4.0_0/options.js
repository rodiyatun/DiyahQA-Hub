// src/lib/chrome-browser-interface.js
function ChromeBrowserInterface(chrome2) {
  const instance = this;
  instance.saveOptions = function(options) {
    chrome2.storage.sync.set(options);
  };
  instance.getOptionsAsync = function() {
    return new Promise((resolve) => {
      chrome2.storage.sync.get(null, resolve);
    });
  };
  instance.openSettings = function() {
    if (chrome2.runtime.openOptionsPage) {
      chrome2.runtime.openOptionsPage();
    } else {
      chrome2.tabs.create({ url: chrome2.runtime.getURL("options.html") });
    }
  };
  instance.openUrl = function(url) {
    chrome2.tabs.create({ url });
  };
  instance.addStorageListener = function(listener) {
    chrome2.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "sync") {
        listener(changes);
      }
      ;
    });
  };
  instance.getRemoteFile = function(url) {
    return fetch(url, { mode: "cors" }).then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Network error reading the remote URL");
    });
  };
  instance.closeWindow = function() {
    window.close();
  };
  instance.readFile = function(fileInfo) {
    return new Promise((resolve, reject) => {
      const oFReader = new FileReader();
      oFReader.onload = function(oFREvent) {
        try {
          resolve(oFREvent.target.result);
        } catch (e) {
          reject(e);
        }
      };
      oFReader.onerror = reject;
      oFReader.readAsText(fileInfo, "UTF-8");
    });
  };
  instance.executeScript = function(tabId, source) {
    return chrome2.scripting.executeScript({
      target: { tabId },
      files: [source]
    });
  };
  instance.sendMessage = function(tabId, message) {
    return chrome2.tabs.sendMessage(tabId, message);
  };
  instance.requestPermissions = function(permissionsArray) {
    return new Promise((resolve, reject) => {
      try {
        chrome2.permissions.request({ permissions: permissionsArray }, (granted) => {
          if (granted) {
            resolve();
          } else {
            reject();
          }
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  };
  instance.removePermissions = function(permissionsArray) {
    return new Promise((resolve) => chrome2.permissions.remove({ permissions: permissionsArray }, resolve));
  };
  instance.copyToClipboard = function(text) {
    chrome2.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome2.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (textToCopy) => {
            const handler = function(e) {
              e.clipboardData.setData("text/plain", textToCopy);
              e.preventDefault();
            };
            document.addEventListener("copy", handler);
            document.execCommand("copy");
            document.removeEventListener("copy", handler);
          },
          args: [text]
        });
      }
    });
  };
  instance.showMessage = function(text) {
    chrome2.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome2.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (message) => alert(message),
          args: [text]
        });
      }
    });
  };
}

// src/lib/init-config-widget.js
function initConfigWidget(domElement, browserInterface) {
  let template, list, skipStandard, additionalMenus = [];
  const showErrorMsg = function(text) {
    const statusElement = domElement.querySelector("[role=status]");
    statusElement.textContent = text;
    setTimeout(() => {
      statusElement.textContent = "";
    }, 1500);
  }, addLink = function(parentElement, url) {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.textContent = url.replace(/.*\//g, "");
    parentElement.appendChild(link);
  }, saveOptions = function() {
    browserInterface.saveOptions({
      additionalMenus,
      skipStandard
    });
  }, rebuildMenu = function() {
    list.innerHTML = "";
    if (additionalMenus && additionalMenus.length) {
      additionalMenus.forEach((configItem, index) => {
        const clone = template.cloneNode(true);
        list.appendChild(clone);
        clone.querySelector("[role=name]").textContent = configItem.name;
        if (configItem.remote) {
          addLink(clone.querySelector("[role=source]"), configItem.source);
        } else {
          clone.querySelector("[role=source]").textContent = configItem.source || "";
        }
        clone.querySelector("[role=remove]").addEventListener("click", () => {
          additionalMenus.splice(index, 1);
          rebuildMenu();
          saveOptions();
        });
      });
      domElement.querySelector("[role=no-custom]").style.display = "none";
      domElement.querySelector("[role=yes-custom]").style.display = "";
    } else {
      domElement.querySelector("[role=yes-custom]").style.display = "none";
      domElement.querySelector("[role=no-custom]").style.display = "";
    }
    domElement.querySelector("[role=option-skipStandard]").checked = !!skipStandard;
  }, showMainScreen = function() {
    domElement.querySelector("[role=main-screen]").style.display = "";
    domElement.querySelector("[role=file-loader]").style.display = "none";
  }, addSubMenu = function(textContent, props) {
    const parsed = JSON.parse(textContent);
    additionalMenus.push(Object.assign({}, props, { config: parsed }));
    showMainScreen();
    rebuildMenu();
    saveOptions();
  }, restoreOptions = function() {
    return browserInterface.getOptionsAsync().then((opts) => {
      if (opts && Array.isArray(opts.additionalMenus)) {
        additionalMenus = opts.additionalMenus;
      } else {
        additionalMenus = [];
      }
      skipStandard = opts && opts.skipStandard;
      rebuildMenu();
    });
  }, showFileSelector = function() {
    const submenuField = domElement.querySelector("[role=submenu-name]"), configTextArea = domElement.querySelector("[role=custom-config-text]");
    submenuField.value = "";
    configTextArea.value = "";
    domElement.querySelector("[role=main-screen]").style.display = "none";
    domElement.querySelector("[role=file-loader]").style.display = "";
  }, initScreen = function() {
    const submenuField = domElement.querySelector("[role=submenu-name]"), skipStandardCheckbox = domElement.querySelector("[role=option-skipStandard]");
    Array.from(domElement.querySelectorAll("form")).map((el) => el.addEventListener("submit", (e) => e.preventDefault()));
    domElement.querySelector("[role=close]").addEventListener("click", browserInterface.closeWindow);
    domElement.querySelector("[role=add]").addEventListener("click", showFileSelector);
    Array.from(domElement.querySelectorAll("[role=back]")).map((el) => el.addEventListener("click", showMainScreen));
    domElement.querySelector("[role=select-file-cover]").addEventListener("click", () => {
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });
      domElement.querySelector("[role=file-selector]").dispatchEvent(clickEvent);
    });
    skipStandardCheckbox.addEventListener("change", () => {
      skipStandard = !!skipStandardCheckbox.checked;
      saveOptions();
    });
    domElement.querySelector("[role=file-selector]").addEventListener("change", function() {
      const element = this, fileInfo = this.files[0], fileName = fileInfo.name, submenuName = submenuField.value && submenuField.value.trim();
      if (!submenuName) {
        showErrorMsg("Please provide submenu name!");
        submenuField.value = "";
      } else {
        browserInterface.readFile(fileInfo).then((result) => {
          addSubMenu(result, { name: submenuName, source: fileName });
        }).catch(showErrorMsg);
      }
      element.value = "";
    });
    domElement.querySelector("[role=add-custom-config]").addEventListener("click", () => {
      const submenuName = submenuField.value && submenuField.value.trim(), customConfigText = domElement.querySelector("[role=custom-config-text]").value;
      if (!submenuName) {
        submenuField.value = "";
        return showErrorMsg("Please provide submenu name!");
      }
      if (!customConfigText) {
        return showErrorMsg("Please provide the configuration");
      }
      try {
        addSubMenu(customConfigText, { name: submenuName });
      } catch (e) {
        showErrorMsg(e);
      }
    });
    domElement.querySelector("[role=add-remote-config]").addEventListener("click", () => {
      const submenuName = submenuField.value && submenuField.value.trim(), urlField = domElement.querySelector('[role="remote-config-url"]'), url = urlField.value;
      if (!submenuName) {
        showErrorMsg("Please provide submenu name!");
        submenuField.value = "";
      } else if (!url) {
        return showErrorMsg("Please provide the url");
      } else {
        browserInterface.getRemoteFile(url).then((result) => {
          showErrorMsg("got file", result);
          addSubMenu(result, { name: submenuName, source: url, remote: true });
          submenuField.value = "";
          urlField.value = "";
        }).catch(showErrorMsg);
      }
    });
    template = domElement.querySelector("[role=template]");
    list = template.parentElement;
    list.removeChild(template);
    showMainScreen();
    return restoreOptions();
  };
  return initScreen();
}

// src/main/options.js
document.addEventListener("DOMContentLoaded", () => {
  initConfigWidget(document.getElementById("main"), new ChromeBrowserInterface(chrome));
});
