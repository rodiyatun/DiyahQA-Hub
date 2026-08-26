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

// src/lib/trigger-events.js
function triggerEvents(element, eventArray) {
  eventArray.forEach((eventName) => {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent(eventName, true, false);
    element.dispatchEvent(evt);
  });
}

// src/lib/inject-value-to-active-element.js
function injectValueToActiveElement(request) {
  const actualValue = getRequestValue(request);
  let domElement = document.activeElement;
  if (!domElement || !actualValue) {
    return;
  }
  while (domElement.contentDocument) {
    domElement = domElement.contentDocument.activeElement;
  }
  if (domElement.tagName === "TEXTAREA" || domElement.tagName === "INPUT") {
    domElement.value = actualValue;
    triggerEvents(domElement, ["input", "change"]);
  } else if (domElement.hasAttribute("contenteditable")) {
    domElement.innerText = actualValue;
  }
}

// src/main/inject-value.js
var listener = function(request) {
  injectValueToActiveElement(request);
  chrome.runtime.onMessage.removeListener(listener);
};
chrome.runtime.onMessage.addListener(listener);
