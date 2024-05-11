function init() {
  document.getElementById("logout-btn").addEventListener("click", function () {
    // clear all cookies
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    // Redirect to '/auth'
    window.location.href = "/auth";
  });
}

export { init };
