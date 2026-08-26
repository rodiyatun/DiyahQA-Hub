// src/lib/inject-value-request-handler.js
function injectValueRequestHandler(browserInterface, tabId, requestValue) {
  return browserInterface.executeScript(tabId, "inject-value.js").then(() => browserInterface.sendMessage(tabId, requestValue));
}

// src/lib/get-request-value.js
var type_flag = "_type";
var generators = {
  literal: function(request) {
    return request.value;
  },
  size: function(request) {
    const size = parseInt(request.size, 10);
    let value = request.template;
    while (value.length < size) {
      value += request.template;
    }
    return value.substring(0, request.size);
  }
};
function getRequestValue(request) {
  if (!request) {
    return false;
  }
  const generator = generators[request[type_flag]];
  if (!generator) {
    return false;
  }
  return generator(request);
}

// src/lib/copy-request-handler.js
function copyRequestHandler(browserInterface, tabId, request) {
  browserInterface.copyToClipboard(getRequestValue(request));
}

// src/lib/paste-request-handler.js
function pasteRequestHandler(browserInterface, tabId, request) {
  copyRequestHandler(browserInterface, tabId, request);
  return browserInterface.executeScript(tabId, "paste.js");
}

// src/lib/context-menu.js
function ContextMenu(standardConfig, browserInterface, menuBuilder, processMenuObject2, pasteSupported) {
  let handlerType = "injectValue";
  const instance = this, handlerMenus = {}, handlers = {
    injectValue: injectValueRequestHandler,
    paste: pasteRequestHandler,
    copy: copyRequestHandler
  }, onClick = function(tabId, itemMenuValue) {
    const falsyButNotEmpty = function(v) {
      return !v && typeof v !== "string";
    }, toValue = function(value) {
      if (typeof value === "string") {
        return { "_type": "literal", "value": value };
      }
      return value;
    }, requestValue = toValue(itemMenuValue);
    if (falsyButNotEmpty(requestValue)) {
      return;
    }
    ;
    return handlers[handlerType](browserInterface, tabId, requestValue);
  }, turnOnPasting = function() {
    return browserInterface.requestPermissions(["clipboardRead", "clipboardWrite"]).then(() => handlerType = "paste").catch(() => {
      browserInterface.showMessage("Could not access clipboard");
      menuBuilder.selectChoice(handlerMenus.injectValue);
    });
  }, turnOffPasting = function() {
    handlerType = "injectValue";
    return browserInterface.removePermissions(["clipboardRead", "clipboardWrite"]);
  }, turnOnCopy = function() {
    handlerType = "copy";
  }, loadAdditionalMenus = function(additionalMenus, rootMenu) {
    if (additionalMenus && Array.isArray(additionalMenus) && additionalMenus.length) {
      additionalMenus.forEach((configItem) => {
        const object = {};
        object[configItem.name] = configItem.config;
        processMenuObject2(object, menuBuilder, rootMenu, onClick);
      });
    }
  }, addGenericMenus = function(rootMenu) {
    menuBuilder.separator(rootMenu);
    if (pasteSupported) {
      const modeMenu = menuBuilder.subMenu("Operational mode", rootMenu);
      handlerMenus.injectValue = menuBuilder.choice("Inject value", modeMenu, turnOffPasting, true);
      handlerMenus.paste = menuBuilder.choice("Simulate pasting", modeMenu, turnOnPasting);
      handlerMenus.copy = menuBuilder.choice("Copy to clipboard", modeMenu, turnOnCopy);
    }
    menuBuilder.menuItem("Customise menus", rootMenu, browserInterface.openSettings);
    menuBuilder.menuItem("Help/Support", rootMenu, () => browserInterface.openUrl("https://bugmagnet.org/contributing.html"));
  }, rebuildMenu = function(options) {
    const rootMenu = menuBuilder.rootMenu("Bug Magnet"), additionalMenus = options && options.additionalMenus, skipStandard = options && options.skipStandard;
    if (!skipStandard) {
      processMenuObject2(standardConfig, menuBuilder, rootMenu, onClick);
    }
    if (additionalMenus) {
      loadAdditionalMenus(additionalMenus, rootMenu);
    }
    addGenericMenus(rootMenu);
  }, wireStorageListener = function() {
    browserInterface.addStorageListener(() => {
      return menuBuilder.removeAll().then(browserInterface.getOptionsAsync).then(rebuildMenu);
    });
  };
  instance.init = function() {
    return browserInterface.getOptionsAsync().then(rebuildMenu).then(wireStorageListener);
  };
}

// src/lib/chrome-menu-builder.js
function ChromeMenuBuilder(chrome2) {
  let itemValues = {}, itemHandlers = {}, menuIdCounter = 0;
  const instance = this, contexts = ["editable"], getNextId = () => `menu-${menuIdCounter++}`;
  instance.rootMenu = function(title) {
    const id = getNextId();
    return chrome2.contextMenus.create({ id, "title": title, "contexts": contexts });
  };
  instance.subMenu = function(title, parentMenu) {
    const id = getNextId();
    return chrome2.contextMenus.create({ id, "title": title, "parentId": parentMenu, "contexts": contexts });
  };
  instance.separator = function(parentMenu) {
    const id = getNextId();
    return chrome2.contextMenus.create({ id, "type": "separator", "parentId": parentMenu, "contexts": contexts });
  };
  instance.menuItem = function(title, parentMenu, clickHandler, value) {
    const id = getNextId();
    chrome2.contextMenus.create({ id, "title": title, "parentId": parentMenu, "contexts": contexts });
    itemValues[id] = value;
    itemHandlers[id] = clickHandler;
    return id;
  };
  instance.choice = function(title, parentMenu, clickHandler, value) {
    const id = getNextId();
    chrome2.contextMenus.create({ id, type: "radio", checked: value, title, parentId: parentMenu, "contexts": contexts });
    itemHandlers[id] = clickHandler;
    return id;
  };
  instance.removeAll = function() {
    itemValues = {};
    itemHandlers = {};
    menuIdCounter = 0;
    return new Promise((resolve) => chrome2.contextMenus.removeAll(resolve));
  };
  chrome2.contextMenus.onClicked.addListener((info, tab) => {
    const itemId = info && info.menuItemId;
    if (itemHandlers[itemId]) {
      itemHandlers[itemId](tab.id, itemValues[itemId]);
    }
  });
  instance.selectChoice = function(menuId) {
    return chrome2.contextMenus.update(menuId, { checked: true });
  };
}

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

// src/lib/process-menu-object.js
function processMenuObject(configObject, menuBuilder, parentMenu, onClick) {
  const getTitle = function(key) {
    if (configObject instanceof Array) {
      return configObject[key];
    }
    return key;
  };
  if (!configObject) {
    return;
  }
  Object.keys(configObject).forEach((key) => {
    const value = configObject[key], title = getTitle(key);
    let result;
    if (typeof value === "string" || typeof value === "object" && Object.prototype.hasOwnProperty.call(value, "_type")) {
      menuBuilder.menuItem(title, parentMenu, onClick, value);
    } else if (typeof value === "object") {
      result = menuBuilder.subMenu(title, parentMenu);
      processMenuObject(value, menuBuilder, result, onClick);
    }
  });
}

// template/config.json
var config_default = {
  Lorems: {
    Latin: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    Cyrillic: "\u0420\u0438\u043C\u0441\u043A\u0438\u0439 \u0438\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D I \u0412\u0435\u043B\u0438\u043A\u0438\u0439 \u043F\u043E \u0434\u043E\u0441\u0442\u043E\u0438\u043D\u0441\u0442\u0432\u0443 \u043E\u0446\u0435\u043D\u0438\u043B \u0432\u044B\u0433\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u043C\u043E\u0440\u0441\u043A\u043E\u0433\u043E \u0412\u0438\u0437\u0430\u043D\u0442\u0438\u044F, \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0433\u043E \u043D\u0430 \u0441\u0442\u044B\u043A\u0435 \u0415\u0432\u0440\u043E\u043F\u044B \u0438 \u0410\u0437\u0438\u0438. \u041A\u0440\u043E\u043C\u0435 \u0442\u043E\u0433\u043E, \u043D\u0430 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D\u0430 \u043F\u043E\u0432\u043B\u0438\u044F\u043B\u0430 \u043D\u0435\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F \u043E\u0431\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0432 \u0441\u0430\u043C\u043E\u043C \u0420\u0438\u043C\u0435: \u043D\u0435\u0434\u043E\u0432\u043E\u043B\u044C\u0441\u0442\u0432\u043E \u0437\u043D\u0430\u0442\u0438 \u0438 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435 \u0440\u0430\u0441\u043F\u0440\u0438 \u0432 \u0431\u043E\u0440\u044C\u0431\u0435 \u0437\u0430 \u0442\u0440\u043E\u043D. \u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0445\u043E\u0442\u0435\u043B \u0443\u0432\u0435\u043D\u0447\u0430\u0442\u044C \u0441\u0432\u043E\u044E \u0440\u0435\u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0440\u0441\u043A\u0443\u044E \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043C \u043D\u043E\u0432\u043E\u0433\u043E \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0446\u0435\u043D\u0442\u0440\u0430 \u043E\u0433\u0440\u043E\u043C\u043D\u043E\u0439 \u0434\u0435\u0440\u0436\u0430\u0432\u044B. \u0417\u0430\u043A\u043B\u0430\u0434\u043A\u0430 \u0433\u043E\u0440\u043E\u0434\u0430 \u0441\u043E\u0441\u0442\u043E\u044F\u043B\u0430\u0441\u044C \u043E\u0441\u0435\u043D\u044C\u044E 324 \u0433\u043E\u0434\u0430, \u0438 \u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D \u043B\u0438\u0447\u043D\u043E \u0440\u0435\u0448\u0438\u043B \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0435\u0433\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u044B.",
    "Arabic (RTL)": "\u0648\u0636\u0639 \u0627\u0628\u0646 \u0627\u0644\u0647\u064A\u062B\u0645 \u062A\u0635\u0648\u0631 \u0648\u0627\u0636\u062D \u0644\u0644\u0639\u0644\u0627\u0642\u0629 \u0628\u064A\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0631\u064A\u0627\u0636\u064A \u0627\u0644\u0645\u062B\u0627\u0644\u064A \u0648\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0638\u0648\u0627\u0647\u0631 \u0627\u0644\u0645\u0644\u062D\u0648\u0638\u0629.",
    Chinese: "\u5317\u4EAC\u4F4D\u65BC\u83EF\u5317\u5E73\u539F\u7684\u897F\u5317\u8FB9\u7F18\uFF0C\u80CC\u9760\u71D5\u5C71\uFF0C\u6709\u6C38\u5B9A\u6CB3\u6D41\u7ECF\u8001\u57CE\u897F\u5357\uFF0C\u6BD7\u90BB\u5929\u6D25\u5E02\u3001\u6CB3\u5317\u7701\uFF0C\u662F\u4E00\u5EA7\u6709\u4E09\u5343\u4F59\u5E74\u5EFA\u57CE\u5386\u53F2\u3001\u516B\u767E\u516D\u5341\u4F59\u5E74\u5EFA\u90FD\u53F2\u7684\u5386\u53F2\u6587\u5316\u540D\u57CE\uFF0C\u5386\u53F2\u4E0A\u6709\u91D1\u3001\u5143\u3001\u660E\u3001\u6E05\u3001\u4E2D\u534E\u6C11\u56FD\uFF08\u5317\u6D0B\u653F\u5E9C\u65F6\u671F\uFF09\u7B49\u4E94\u4E2A\u671D\u4EE3\u5728\u6B64\u5B9A\u90FD\uFF0C\u4EE5\u53CA\u6570\u4E2A\u653F\u6743\u5EFA\u653F\u4E8E\u6B64\uFF0C\u835F\u8403\u4E86\u81EA\u5143\u660E\u6E05\u4EE5\u6765\u7684\u4E2D\u534E\u6587\u5316\uFF0C\u62E5\u6709\u4F17\u591A\u5386\u53F2\u540D\u80DC\u53E4\u8FF9\u548C\u4EBA\u6587\u666F\u89C2\u3002\u300A\u4E0D\u5217\u98A0\u767E\u79D1\u5168\u4E66\u300B\u5C06\u5317\u4EAC\u5F62\u5BB9\u4E3A\u5168\u7403\u6700\u4F1F\u5927\u7684\u57CE\u5E02\u4E4B\u4E00\uFF0C\u800C\u4E14\u65AD\u8A00\uFF0C\u201C\u8FD9\u5EA7\u57CE\u5E02\u662F\u4E2D\u56FD\u5386\u53F2\u4E0A\u6700\u91CD\u8981\u7684\u7EC4\u6210\u90E8\u5206\u3002\u5728\u4E2D\u56FD\u8FC7\u53BB\u7684\u516B\u4E2A\u4E16\u7EAA\u91CC\uFF0C\u4E0D\u8BBA\u5386\u53F2\u662F\u5426\u60A0\u4E45\uFF0C\u51E0\u4E4E\u5317\u4EAC\u6240\u6709\u4E3B\u8981\u5EFA\u7B51\u90FD\u62E5\u6709\u7740\u4E0D\u53EF\u78E8\u706D\u7684\u6C11\u65CF\u548C\u5386\u53F2\u610F\u4E49\u201D\u3002\u5317\u4EAC\u53E4\u8FF9\u4F17\u591A\uFF0C\u8457\u540D\u7684\u6709\u6545\u5BAB\u3001\u5929\u575B\u3001\u9890\u548C\u56ED\u3001\u5706\u660E\u56ED\u3001\u5317\u6D77\u516C\u56ED\u7B49\u3002",
    "Mixed charsets": "Lorem ipsum dolor sit amet, \u0420\u0438\u043C\u0441\u043A\u0438\u0439 \u0438\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D I \u0412\u0435\u043B\u0438\u043A\u0438\u0439, \u5317\u4EAC\u4F4D\u65BC\u83EF\u5317\u5E73\u539F\u7684\u897F\u5317\u8FB9\u7F18",
    Czech: "P\u0159\xEDli\u0161 \u017Elu\u0165ou\u010Dk\xFD k\u016F\u0148 \xFAp\u011Bl \u010F\xE1belsk\xE9 \xF3dy",
    Thai: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E19\u0E30\u0E08\u0E4A\u0E30",
    Hindi: "\u090F\u0915 \u091C\u0932\u094D\u0926\u0940 \u092D\u0942\u0930\u0940 \u0932\u094B\u092E\u0921\u093C\u0940 \u0906\u0932\u0938\u0940 \u0915\u0941\u0924\u094D\u0924\u0947 \u092A\u0930 \u0915\u0942\u0926\u0924\u093E",
    "Unicode symbols (non letters)": "I\xF1t\xEBrn\xE2ti\xF4n\xE0liz\xE6ti\xF8n\u2603\u{1F4AA}"
  },
  Names: {
    "Latin charset": [
      "John O'Grady",
      "Peter de Montfort",
      "John James O'Grady",
      `John James "Jimmy" O'Grady`,
      "Jos\xE9 Casal-Gim\xE9nez",
      "Mar\xEDa-Jose Carre\xF1o Qui\xF1ones",
      "Milan Vojnovi\u010D",
      "Chlo\xEB R\xF8mer",
      "Bj\xF6rk Gu\xF0mundsd\xF3ttir",
      "Rosalind Arusha Arkadina Altalune Florence Thurman-Busson",
      "Leone Sextus Denys Oswolf Fraudatifilius Tollemache-Tollemache de Orellana Plantagenet Tollemache-Tollemache",
      "Alasdair M\xF3r \xD9isdean GillEasbaig 'ic Iain Mac a' Ghobhainn Fear an t-Sr\xF2naich",
      "Abu Karim Muhammad al-Jamil ibn Nidal ibn Abdulaziz al-Filistini",
      "Nguy\u1EC5n T\u1EA5n D\u0169ng"
    ],
    "Name length": [
      "Rhoshandiatellyneshiaunneveshenk",
      "StopFortnumAndMasonFoieGras",
      "Stephen O",
      "A Martinez",
      "They"
    ],
    "Unusual accents/chars": [
      "Keihanaikukauakahihulihe\u02BBekahaunaele",
      "GoVeg.com",
      "Number 16 Bus Shelter",
      "John Blake Cusack 2.0"
    ],
    "Other charsets": {
      Japanese: "\u7530\u4E2D\u592A\u90CE",
      "Japanese T\u014Dkairin": "\u6771\u6D77\u6797\u8CE2\u8535",
      "Ze Dong": "\u6CFD\u4E1C",
      "Russian male": "\u0411\u043E\u0440\u0438\u0441 \u041D\u0438\u043A\u043E\u043B\u0430\u0435\u0432\u0438\u0447 \u0415\u043B\u044C\u0446\u0438\u043D",
      "Russian female": "\u041D\u0430\u0438\u043D\u0430 \u0418\u043E\u0441\u0438\u0444\u043E\u0432\u043D\u0430 \u0415\u043B\u044C\u0446\u0438\u043D\u0430",
      "Ukrainian female": "\u041B\u0435\u0441\u044F \u0423\u043A\u0440\u0430\u0457\u043D\u043A\u0430",
      "Thai nickname": "\u0E41\u0E21",
      Arabic: "\u0627\u0628\u0646 \u062E\u0644\u062F\u0648\u0646"
    },
    "Commonly thought as invalid": [
      "Null",
      "nil",
      "false",
      "Tom Test",
      "Jeff Sample"
    ],
    "Unicode case folding": "\u1D2E\u1D35\u1D33\u1D2E\u1D35\u1D3F\u1D30",
    "James Bond (with middle names)": "James Dr No From Russia with Love Goldfinger Thunderball You Only Live Twice On Her Majesty\u2019s Secret Service Diamonds Are Forever Live and Let Die The Man with the Golden Gun The Spy Who Loved Me Moonraker For Your Eyes Only Octopussy A View to a Kill The Living Daylights Licence to Kill Golden Eye Tomorrow Never Dies The World Is Not Enough Die Another Day Casino Royale Bond"
  },
  "Post Codes": {
    "Alphanumeric (GB)": "EC11AA",
    "With spaces (GB)": "EC1 1AA",
    "4 digits (Aarau, CH)": "5004",
    "3 digits (Kvivik, FO)": "340",
    "10 digits (Tehran, IR)": "1193653471"
  },
  Cities: {
    "Scandinavian letters": "\xC6r\xF8sk\xF8bing",
    Welsh: "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch",
    "Single letter - Norwegian": "\xC5",
    "Single letter - France": "Y"
  },
  "E-mail addresses": {
    Valid: {
      Simple: "email@domain.com",
      "Dot in the address": "firstname.lastname@domain.com",
      Subdomain: "email@subdomain.domain.com",
      "Plus in address": "firstname+lastname@domain.com",
      "Numeric domain": "email@123.123.123.123",
      "Square bracket around IP address": "email@[123.123.123.123]",
      "Unnecessary quotes around address": '"email"@domain.com',
      "Necessary quotes around address": '"email..email"@domain.com',
      "Numeric address": "1234567890@domain.com",
      "Dash in domain": "email@domain-one.com",
      Underscore: "_______@domain.com",
      ">3 char TLD": "email@domain.name",
      "2 char TLD": "email@domain.co.jp",
      "Dash in address": "firstname-lastname@domain.com",
      Intranet: "name@localhost",
      "Non-ascii Email": "nathan@\u5B66\u751F\u4F18\u60E0.com"
    },
    Invalid: {
      "No @ or domain": "plainaddress",
      "Missing @": "email.domain.com",
      "Missing address": "@domain.com",
      Garbage: "#@%^%#$@#$@#.com",
      "Copy/paste from address book with name": "Joe Smith <email@domain.com>",
      "Superfluous text": "email@domain.com (Joe Smith)",
      "Two @": "email@domain@domain.com",
      "Leading dot in address": ".email@domain.com",
      "Trailing dot in address": "email.@domain.com",
      "Multiple dots": "email..email@domain.com",
      "Unicode chars in address": "\u3042\u3044\u3046\u3048\u304A@domain.com",
      "Leading dash in domain": "email@-domain.com",
      "Leading dot in domain": "email@.domain.com",
      "Invalid IP format": "email@111.222.333.44444",
      "Multiple dots in the domain": "email@domain..com"
    }
  },
  URLs: {
    Valid: [
      "www.mysite.com",
      "mysite.com",
      "http://www.mysite.com",
      "https://www.mysite.com",
      "http://www.mysite.com:80",
      "ftp://mysite.com",
      "https://www.xn--80ak6aa92e.com/"
    ],
    Invalid: [
      "http//www.mysite.com",
      "http:/www.mysite.com",
      "://www.mysite.com",
      "foo://www.mysite.com",
      "http://:",
      "mysite"
    ]
  },
  Numbers: [
    "0",
    "32767",
    "32768",
    "32769",
    "65535",
    "65536",
    "65537",
    "2147483647",
    "2147483648",
    "2147483649",
    "4294967295",
    "4294967296",
    "4294967297",
    "1E-16",
    "-1",
    "0.0001",
    "1,234,567",
    "1.234.567,89"
  ],
  Amounts: ["5000", "$5,000", "$5\xA0000", "$5,000.00"],
  Currencies: {
    "No decimals": "JPY",
    "3 Decimals": "KWD"
  },
  "Payment cards": {
    "Authorize.net": {
      "Credit Card": {
        "American Express": "370000000000002",
        Discover: "6011000000000012",
        JCB: "3088000000000017",
        "Diners Club/ Carte Blanch": "38000000000006",
        Visa: "4007000000027",
        MasterCard: "5424000000000015"
      },
      "Zip Code": {
        Declined: "46282",
        "AVS Invalid": "46203",
        "AVS Unavailable": "46207",
        "Non US Bank": "46204"
      },
      CVV: {
        Successful: "900",
        "Does Not Match": "901",
        "Not Processed": "46207"
      }
    },
    Braintree: {
      "Valid Credit Card": {
        "American Express": "378282246310005",
        Discover: "6011111111111117",
        MasterCard: "5555555555554444",
        Visa: "4111111111111111"
      },
      "Invalid Credit Card": {
        Visa: "4000111111111115",
        MasterCard: "5105105105105100",
        "American Express": "378734493671000",
        JCB: "3566002020360505"
      }
    },
    Cybersource: {
      "Credit Card": {
        Visa: "4111111111111111",
        MasterCard: "5555555555554444",
        "American Express": "378282246310005",
        Discover: "6011111111111117",
        JCB: "3566111111111113"
      }
    },
    "Payflow Pro": {
      "Credit Card": {
        "American Express": "378282246310005",
        "American Express Corporate": "378734493671000",
        "Diners Club": "30569309025904",
        Discover: "6011111111111117",
        JCB: "3530111333300000",
        MasterCard: "5555555555554444",
        Visa: "4111111111111111"
      }
    },
    Paypal: {
      "Dankort PBS": "5019717010103742",
      "American Express": "378282246310005",
      Visa: "4111111111111111",
      Discover: "6011000990139424",
      "Visa (short)": "4222222222222",
      "Switch/Solo (Paymentech)": "6331101999990016",
      "Australian BankCard": "5610591081018250",
      "Dankort PBS (short)": "76009244561",
      MasterCard: "5555555555554444",
      "American Express Corporate": "378734493671000",
      JCB: "3566002020360505"
    },
    Spreedly: {
      Valid: {
        Visa: "4111111111111111",
        MasterCard: "5555555555554444",
        "American Express": "378282246310005",
        Discover: "6011111111111117",
        "Diners Club": "30569309025904",
        JCB: "3530111333300000"
      },
      "Boundary Workflows": {
        "Successful charge, but...": {
          "funds added directly to available balance (bypassing pending)": "4000000000000077",
          "address_line1_check and address_zip_check fail": "4000000000000010",
          "address_line1_check fail": "4000000000000028",
          "address_zip_check fail": "4000000000000036",
          "address_zip_check and address_line1_check unavailable": "4000000000000044",
          "CVC check will fail (if CVC entered)": "4000000000000101"
        },
        "Charge declined ..": {
          Visa: "4012888888881881",
          Mastercard: "5105105105105100",
          "American Express": "371449635398431"
        }
      }
    },
    Stripe: {
      Valid: {
        Visa: "4242424242424242",
        "Visa (debit)": "4000056655665556",
        MasterCard: "5555555555554444",
        "MasterCard (debit)": "5200828282828210",
        "MasterCard (prepaid)": "5105105105105100",
        "American Express": "378282246310005",
        Discover: "6011111111111117",
        "Diners Club": "30569309025904",
        JCB: "3530111333300000"
      },
      "Boundary Workflows": {
        "Successful charge, but...": {
          "funds added directly to available balance (bypassing pending)": "4000000000000077",
          "address_line1_check and address_zip_check fail": "4000000000000010",
          "address_line1_check fail": "4000000000000028",
          "address_zip_check fail": "4000000000000036",
          "address_zip_check and address_line1_check unavailable": "4000000000000044",
          "CVC check will fail (if CVC entered)": "4000000000000101"
        },
        "Charge declined and..": {
          "Card still added to customer": "4000000000000341",
          "Card declined": "4000000000000002",
          Fraud: "4100000000000019",
          "Incorrect CVC": "4000000000000127",
          "Expired Card": "4000000000000069",
          "Processing Error": "4000000000000119"
        }
      }
    },
    Vantiv: {
      "Credit Card": {
        Visa: "4457010140000141",
        MasterCard: "5112000100000003",
        Discover: "6011010140000004",
        "American Express": "375001000000005"
      },
      CVV: {
        Fail: "352",
        "Fail Due to Security Mismatch": "358",
        "Do Not Honor": "349",
        "Generic Decline": "350"
      }
    }
  },
  "Text size": {
    "With spaces": {
      "128b": { _type: "size", size: "128", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "129b": { _type: "size", size: "129", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "256b": { _type: "size", size: "256", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "257b": { _type: "size", size: "257", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "32K - 1": { _type: "size", size: "32767", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "32K": { _type: "size", size: "32768", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "32K + 1": { _type: "size", size: "32769", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "64K - 1": { _type: "size", size: "65535", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "64K": { _type: "size", size: "65536", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      "64K + 1": { _type: "size", size: "65537", template: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    },
    "Without spaces": {
      "128b": { _type: "size", size: "128", template: "0123456789" },
      "129b": { _type: "size", size: "129", template: "0123456789" },
      "256b": { _type: "size", size: "256", template: "0123456789" },
      "257b": { _type: "size", size: "257", template: "0123456789" },
      "32K - 1": { _type: "size", size: "32767", template: "0123456789" },
      "32K": { _type: "size", size: "32768", template: "0123456789" },
      "32K + 1": { _type: "size", size: "32769", template: "0123456789" },
      "64K - 1": { _type: "size", size: "65535", template: "0123456789" },
      "64K": { _type: "size", size: "65536", template: "0123456789" },
      "64K + 1": { _type: "size", size: "65537", template: "0123456789" }
    }
  },
  Whitespace: {
    "Tabs and newlines": "Contains	Tabs\nAnd	Newlines",
    "Leading spaces": "  leading spaces",
    "Mixing tabs and spaces": "	 leading tabs and spaces",
    "spaces on both sides": " Space on both sides ",
    "Just whitespace": "	 	\n \n "
  },
  "Format exploits": {
    "SQL Injection": "Robert'); DROP TABLE Students;--",
    "JS Script Injection": "Nice site,  I think I'll take it. <script>alert('Executing JS')<\/script>",
    "JS String (XSS) Injection - single quote": "'-prompt()-'",
    "JS String (XSS) Injection - double quote": '"-prompt()-"',
    "HTML parsing": "<blink>Hello there</blink>",
    "Broken HTML": "<i><b>Bold</i></b>"
  },
  Unicode: {
    Direction: {
      "Right-to-left override": "1234\u202E1234",
      "Left-to-right override": "\u05D0\u05D1\u05D2\u05D3\u202D\u05D0\u05D1\u05D2\u05D3",
      "RTL without override": "\u05D0\u05D1\u05D2\u05D3",
      "curseword with direction switch for profanity filters": "\u202Ekcuf\u202D you"
    },
    "Looking like latin": {
      "fake apple.com": "https://\u0430\u0440\u0440\u04CF\u0435.com",
      "with cyrilic a": "https://\u0430pple.com",
      "single-charset": "https://\u0435\u0440\u0456\u0441.com/"
    },
    Confusable: {
      colon: "\uFF1A\u02D0\u02F8\u0589\u1361\u16EC\u205A\u2236\u2806\uFE13\uFE55",
      "semi-colon": "\uFF1B\u037E\uFE14\uFE54",
      equals: "\uFF1D\u2550\u268C\uFE66",
      "dollar sign": "\uFF04\uFE69",
      plus: "\uFF0B\u16ED\uFE62",
      comma: "\uFF0C\u02CF\u16E7\u201A",
      a: "\xAA\u1D43\u1D45\u2090\u24D0\uFF41"
    },
    "Case transforms": {
      "Small sharp S": "\xDF",
      "Turkish Is": "iI\u0130\u0131"
    },
    Length: {
      "Very long": "\uFDFD",
      "two rows": "N\u036BO\u036C",
      "Letter + Diacritic": "a\u0341",
      "Symbol + Symbol combiner": "\u2190\u20DD",
      "Cantillation marks": "\u059F\u05A8\u05AAA",
      Nonsense: {
        "Letter + Symbol combiner": "A\u20DD",
        "Symbol + Diacritic": "\u2190\u0341",
        "only diacritic": "\u0341",
        "only symbol combiner": "\u0341",
        "only cantillation mark": "\u059F"
      },
      "Text with invisible spaces": {
        "Mongolian Vowel Separator": "two\u180Ewords",
        "Zero-width joiner": "two\u200Dwords",
        "Zero-width non-joiner": "two\u200Cwords"
      }
    },
    Emoji: {
      plain: "\u{1F469}",
      "+variation selector": "\u{1F469}\u{1F3FF}",
      "+zws combo": "\u{1F469}\u200D\u{1F373}",
      "+zws combo + variation selector": "\u{1F469}\u{1F3FF}\u200D\u{1F373}"
    },
    Variations: {
      "regional indicators": {
        "US Flag": "\u{1F1FA}\u{1F1F8}",
        "Chinese Flag": "\u{1F1E8}\u{1F1F3}",
        "invalid combination": "\u{1F1FA}\u{1F1F3}"
      },
      "variation selectors": {
        "VS16 (emoji style)": "\u2764\uFE0F",
        "VS15 (text style)": "\u2764\uFE0E",
        nonsense: {
          "just the variation selector": "\uFE0F",
          "VS16 + invalid char": "A\uFE0F",
          "VS15 + smiley": "\u{1F601}\uFE0E"
        }
      }
    }
  }
};

// src/main/extension.js
var isFirefox = typeof browser !== "undefined";
new ContextMenu(
  config_default,
  new ChromeBrowserInterface(chrome),
  new ChromeMenuBuilder(chrome),
  processMenuObject,
  !isFirefox
).init();
