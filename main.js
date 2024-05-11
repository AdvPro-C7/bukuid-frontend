import { home } from "./pages/home-page.js";
import { auth } from "./pages/auth-page.js";
import { init as initHome } from "./utils/home-utils.js";
import { init as initAuth } from "./utils/auth-utils.js";

const routes = {
  "/": { content: home, init: initHome },
  "/home": { content: home, init: initHome },
  "/auth": { content: auth, init: initAuth },
};

const rootDiv = document.getElementById("app");

const onNavigate = (pathname) => {
  const route = routes[pathname];
  if (route) {
    window.history.pushState({}, pathname, window.location.origin + pathname);

    rootDiv.innerHTML = route.content;

    if (route.init) route.init();
  } else {
    // redirect to 404 page if route not found
  }
};

window.onpopstate = () => {
  const route = routes[window.location.pathname];

  rootDiv.innerHTML = route ? route.content : "";

  if (route && route.init) route.init();
};

onNavigate(window.location.pathname);
