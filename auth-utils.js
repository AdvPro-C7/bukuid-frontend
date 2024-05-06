const backendURL = "http://localhost:8080";

// // fetch CSRF token from the backend
// async function fetchToken() {
//   try {
//     const response = await fetch(backendURL + "/csrf-token");
//     if (response.ok) {
//       const { token } = await response.json();
//       localStorage.setItem("csrfToken", token);
//     } else {
//       console.error("Failed to fetch CSRF token");
//     }
//   } catch (error) {
//     console.error("Error fetching CSRF token:", error);
//   }
// }

// show or hide pop-up message
function togglePopUp(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.innerText = message;
  popup.style.display = message ? "block" : "none";
}

// encrypt password using SHA256
function encryptPassword(input) {
  return CryptoJS.SHA256(input.value).toString();
}

// // add CSRF token to the request headers
// function addCsrfToken(headers) {
//   const csrfToken = localStorage.getItem("csrfToken");
//   if (csrfToken) {
//     headers["X-CSRF-TOKEN"] = csrfToken;
//   }
//   return headers;
// }

// handle registration or login form submission
async function handleSubmit(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ...addCsrfToken({}),
      },
      body: JSON.stringify(data),
    });

    const message = await response.json().message;

    if (response.ok) {
      togglePopUp(message);
      if (url.includes("login")) {
        window.location.href = "/home";
      }
    } else {
      togglePopUp(message || "An error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);
    togglePopUp("An error occurred.");
  }
}

// initialize the page
async function initialize() {
  // await fetchToken();

  // Attach event listeners
  document
    .getElementById("reg-submit-btn")
    .addEventListener("click", async function () {
      const username = document.getElementById("reg-username").value;

      if (username.includes("#")) {
        togglePopUp("Username cannot contain hash.");
      } else {
        const encryptedPassword = encryptPassword(this.previousElementSibling);

        await handleSubmit(backendURL + "/register", {
          name: username,
          emailAddress: document.getElementById("reg-email-address").value,
          phoneNumber: document.getElementById("reg-phone-number").value,
          password: encryptedPassword,
        });
      }
    });

  document
    .getElementById("login-submit-btn")
    .addEventListener("click", async function () {
      const encryptedPassword = encryptPassword(this.previousElementSibling);

      await handleSubmit(backendURL + "/login", {
        id: document.getElementById("login-id").value,
        password: encryptedPassword,
      });
    });

  const accordions = document.querySelectorAll(".accordion-btn");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      const content = this.parentNode.nextElementSibling;
      content.style.maxHeight = content.style.maxHeight
        ? null
        : content.scrollHeight + "px";
      this.querySelector(".icon").classList.toggle("active-icon");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    let closeButton = document.querySelector(".close-btn");

    closeButton.addEventListener("click", function () {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    });
  });
}

export { initialize };
