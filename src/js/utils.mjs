// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function loadTemplate(path) {
  return async function () {
    const response = await fetch(path);
    if (response.ok) {
      const html = await response.text();
      return html;
    } else {
      //console.error(`Error loading template: ${path}`);
    }
  };
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// header and footer calls
export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");
  renderWithTemplate(headerTemplateFn, headerElement);
  renderWithTemplate(footerTemplateFn, footerElement);
}

// export async function loadFireFlies() {
//   const fireFlies = loadTemplate("/partials/fireflies.html");
//   const fireFliesElement = qs("#firefly");
//   renderWithTemplate(fireFlies, fireFliesElement);
// }

/* From group work 
https://github.com/YanezBeth/WDD330-Sleep-Outside/blob/main/src/js/auth.mjs */
// retrieve data from localstorage
export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  try {
    // console.log("item", item);
    return JSON.parse(item);
  } catch (error) {
    console.error(
      `Error parsing item with key ${key} from localStorage:`,
      error
    );
    return null; // or some other default value or action
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Fetch alerts for home page
export async function fetchAlerts() {
  try {
    const response = await fetch("/json/alerts.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    createAlerts(data);
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
  }
}

function createAlerts(alerts) {
  if (alerts && alerts.length > 0) {
    const alertList = document.createElement("section");
    alertList.className = "alert-list";

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      alertList.appendChild(p);
    });

    const mainElement = document.querySelector("main");
    mainElement.prepend(alertList);
  }
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
