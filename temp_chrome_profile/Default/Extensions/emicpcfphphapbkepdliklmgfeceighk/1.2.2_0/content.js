(() => {
  if (window.__focusInspectorActive) return;
  window.__focusInspectorActive = true;

  const popup = document.createElement("div");
  popup.id = "html-inspector-popup";
  popup.style.position = "fixed";
  popup.style.zIndex = 999999;

  document.body.appendChild(popup);

  let currentElement = null;
  let isEditing = false;
  let originalStyles = {};

  const handlers = {};

  // --- DRAG STATE ---
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  const targetArray = ["INPUT", "SELECT", "BUTTON", "TEXTAREA"];

  popup.addEventListener("mousedown", (e) => {
    if (targetArray.includes(e.target.tagName)) {
      return;
    }

    isDragging = true;
    dragOffsetX = e.clientX - popup.offsetLeft;
    dragOffsetY = e.clientY - popup.offsetTop;
    popup.style.cursor = "move";
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    popup.style.left = e.clientX - dragOffsetX + "px";
    popup.style.top = e.clientY - dragOffsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    popup.style.cursor = "default";
  });
  // --- END DRAG STATE ---

  function rgbToHex(rgb) {
    if (!rgb) return "#000000";
    const res = rgb.match(/\d+/g);
    if (!res) return "#000000";
    return (
      "#" +
      res
        .slice(0, 3)
        .map((x) => {
          const h = parseInt(x).toString(16);
          return h.length === 1 ? "0" + h : h;
        })
        .join("")
    );
  }

  function placePopup(x, y) {
    requestAnimationFrame(() => {
      const pad = 8;
      const w = popup.offsetWidth || 220;
      const h = popup.offsetHeight || 140;
      let left = x + 15;
      let top = y + 15;

      if (left + w + pad > window.innerWidth) left = Math.max(pad, x - w - 15);
      if (top + h + pad > window.innerHeight) top = Math.max(pad, y - h - 15);

      popup.style.left = Math.round(left) + "px";
      popup.style.top = Math.round(top) + "px";
    });
  }

  function showReadOnly(el, clientX, clientY) {
    if (!el) return;
    const styles = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const id = el.id ? `#${el.id}` : "";
    const classes = el.classList.length ? "." + [...el.classList].join(".") : "";

    popup.innerHTML = `
      <h4 style="margin:0 0 4px;font-size:14px;color:#00bfff">${el.tagName.toLowerCase()}</h4>
      ${id || classes ? `<div class="prop"><span class="prop-key">ID/Classes:</span> ${id}${classes}</div>` : ""}
      <div class="prop"><span class="prop-key">Width:</span> ${rect.width ? rect.width.toFixed(0) + "px" : "-"}</div>
      <div class="prop"><span class="prop-key">Height:</span> ${rect.height ? rect.height.toFixed(0) + "px" : "-"}</div>
      <div class="prop"><span class="prop-key">Font Size:</span> ${styles.fontSize || "-"}</div>
      <div class="prop"><span class="prop-key">Font Family:</span> ${styles.fontFamily || "-"}</div>
      <div class="prop"><span class="prop-key">Font Weight:</span> ${styles.fontWeight || "-"}</div>
      <div class="prop"><span class="prop-key">Color:</span> ${styles.color || "-"}</div>
      <div class="prop"><span class="prop-key">Margin:</span> ${styles.margin || "-"}</div>
      <div class="prop"><span class="prop-key">Padding:</span> ${styles.padding || "-"}</div>
      <small style="opacity:0.6;display:block;margin-top:6px">Double-click an element or this box to edit</small>
    `;
    popup.classList.add("visible");
    placePopup(clientX, clientY);
  }

  function openEditorFor(el) {
    if (!el) return;
    currentElement = el;
    isEditing = true;

    const styles = window.getComputedStyle(el);

    originalStyles = {
      width: el.style.width,
      height: el.style.height,
      fontSize: el.style.fontSize,
      fontFamily: el.style.fontFamily,
      fontWeight: el.style.fontWeight,
      color: el.style.color,
      margin: el.style.margin,
      padding: el.style.padding,
    };

    popup.innerHTML = `
      <div class="edit-box">
        <h4 class="edit-box-hdg">Edit ${el.tagName.toLowerCase()}</h4>
        <button id="copyStyle" class="copy-style">Copy</button>
      </div>

      <div class="two-col">
        <label class="two-col-box">Width <input id="w" type="text" value="${el.style.width || styles.width}"></label>
        <label class="two-col-box">Height <input id="h" type="text" value="${el.style.height || styles.height}"></label>
      </div>

      <div class="two-col">
        <label class="two-col-box">Font size <input id="fs" type="text" value="${el.style.fontSize || styles.fontSize}"></label>
        <label class="two-col-box">Font weight 
          <select id="fw">
            ${["normal", "bold", "lighter", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        .map(v => `<option value="${v}" ${(el.style.fontWeight || styles.fontWeight) == v ? "selected" : ""}>${v}</option>`).join("")}
          </select>
        </label>
      </div>

      <label>Font family <input id="ff" type="text" value="${el.style.fontFamily || styles.fontFamily}"></label>
      <label>Color <input id="c" type="color" value="${rgbToHex(el.style.color || styles.color)}"></label>
      <label>Margin <input id="m" type="text" value="${el.style.margin || styles.margin}"></label>
      <label>Padding <input id="p" type="text" value="${el.style.padding || styles.padding}"></label>

      <div style="display:flex;gap:8px;margin-top:8px">
        <button id="reset" style="flex:1;padding:6px;background:#00bfff;color:#fff;border:none;border-radius:6px;cursor:pointer">Reset</button>
        <button id="close" style="flex:1;padding:6px;background:#444;color:#fff;border:none;border-radius:6px;cursor:pointer">Close</button>
      </div>
    `;

    positionNearElement(el);

    const copyBtn = popup.querySelector("#copyStyle");
    const inputs = popup.querySelectorAll("input, select");

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        applyLiveChanges();
      });
    });

    popup.querySelector("#reset").onclick = () => {
      Object.assign(el.style, originalStyles);
      popup.classList.remove("visible");
      isEditing = false;
    };

    popup.querySelector("#close").onclick = () => {
      popup.classList.remove("visible");
      isEditing = false;
    };

    copyBtn.onclick = () => {
      const selector = el.id
        ? `#${el.id}`
        : (el.classList.length ? `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}` : el.tagName.toLowerCase());

      const css = `${selector} {\n` +
        `  width: ${el.style.width || styles.width};\n` +
        `  height: ${el.style.height || styles.height};\n` +
        `  font-size: ${el.style.fontSize || styles.fontSize};\n` +
        `  font-family: ${el.style.fontFamily || styles.fontFamily};\n` +
        `  font-weight: ${el.style.fontWeight || styles.fontWeight};\n` +
        `  color: ${el.style.color || styles.color};\n` +
        `  margin: ${el.style.margin || styles.margin};\n` +
        `  padding: ${el.style.padding || styles.padding};\n` +
        `}`;
      navigator.clipboard.writeText(css);

      const prevText = copyBtn.innerText;
      copyBtn.innerText = "Copied!";
      copyBtn.style.background = "#28a745";
      copyBtn.style.color = "#fff";

      setTimeout(() => {
        copyBtn.innerText = prevText;
        copyBtn.style.background = "#222";
        copyBtn.style.color = "#fff";
      }, 1500);
    };
  }

  function applyLiveChanges() {
    if (!currentElement) return;
    currentElement.style.width = popup.querySelector("#w").value;
    currentElement.style.height = popup.querySelector("#h").value;
    currentElement.style.fontSize = popup.querySelector("#fs").value;
    currentElement.style.fontFamily = popup.querySelector("#ff").value;
    currentElement.style.fontWeight = popup.querySelector("#fw").value;
    currentElement.style.color = popup.querySelector("#c").value;
    currentElement.style.margin = popup.querySelector("#m").value;
    currentElement.style.padding = popup.querySelector("#p").value;
  }

  function positionNearElement(el) {
    const rect = el.getBoundingClientRect();
    const popupW = popup.offsetWidth || 260;
    const popupH = popup.offsetHeight || 260;
    let px = rect.right + 8;
    let py = rect.top;

    if (rect.top > popupH + 10) {
      py = rect.top - popupH - 8;
      px = rect.left;
    } else {
      py = rect.bottom + 8;
      px = rect.left;
    }

    px = Math.min(Math.max(8, px), window.innerWidth - popupW - 8);
    py = Math.min(Math.max(8, py), window.innerHeight - popupH - 8);
    popup.style.left = Math.round(px) + "px";
    popup.style.top = Math.round(py) + "px";
  }

  handlers._mousemove = (e) => {
    if (isEditing) return;
    const el = e.target;
    if (!el || el === popup || popup.contains(el)) return;
    currentElement = el;
    showReadOnly(el, e.clientX, e.clientY);
  };

  handlers._dblclick = (e) => {
    if (e.target.closest && e.target.closest("#html-inspector-popup")) {
      openEditorFor(currentElement);
      e.preventDefault();
      return;
    }
    currentElement = e.target;
    openEditorFor(currentElement);
    e.preventDefault();
  };

  document.addEventListener("mousemove", handlers._mousemove, { passive: true });
  document.addEventListener("dblclick", handlers._dblclick, true);

  window.__focusInspectorCleanup = () => {
    document.removeEventListener("mousemove", handlers._mousemove, { passive: true });
    document.removeEventListener("dblclick", handlers._dblclick, true);
    if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    window.__focusInspectorActive = false;
  };
})();
