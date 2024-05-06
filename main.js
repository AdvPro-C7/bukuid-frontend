import { auth } from "./auth-page.js";
import { initialize } from "./auth-utils.js";

const routes = {
  "/auth": auth,
};

const rootDiv = document.getElementById("app");
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  if (routes[pathname]) {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    rootDiv.innerHTML = routes[pathname];
  } else {
    // redirect to 404 page if route not found
  }
};

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname];
};

initialize();
