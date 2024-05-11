const domain = "http://localhost:8080";

// // fetch CSRF token from the backend
// async function fetchToken() {
//   try {
//     const response = await fetch(domain + "/csrf-token");
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
  document.getElementById("popup-message").innerText = message;

  document.getElementById("popup").style.display = message ? "block" : "none";
}

// encrypt password using SHA256
const encryptPassword = (input) => CryptoJS.SHA256(input.value).toString();

// // add CSRF token to the request headers
// function addCsrfToken(headers) {
//   const csrfToken = localStorage.getItem("csrfToken");
//   if (csrfToken) {
//     headers["X-CSRF-TOKEN"] = csrfToken;
//   }
//   return headers;
// }

// handle registration or login form submission
async function handleSubmit(endpoint, data) {
  try {
    const response = await fetch(domain + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ...addCsrfToken({}),
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (response.ok) {
      togglePopUp(body.message);

      if (endpoint.includes("login")) {
        window.location.href = "/home";
      }
    } else {
      togglePopUp(body.message || "An error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);

    togglePopUp("An error occurred.");
  }
}

// initialize the accordions
function initAccordions() {
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
}

// initialize the page
async function init() {
  const response = await fetch(domain + "/authenticate", {
    method: "GET",
    credentials: "include",
  });

  const body = await response.json();

  if (response.ok) {
    window.location.href = "/home";
  } else {
    // await fetchToken();

    // add event listener for registration form submission
    document
      .getElementById("reg-submit-btn")
      .addEventListener("click", async function () {
        const username = document.getElementById("reg-username").value;

        if (username.includes("#")) {
          togglePopUp("Username cannot contain hash.");
        } else {
          const encryptedPassword = encryptPassword(
            this.previousElementSibling
          );

          await handleSubmit("/register", {
            name: username,
            emailAddress: document.getElementById("reg-email-address").value,
            phoneNumber: document.getElementById("reg-phone-number").value,
            password: encryptedPassword,
          });
        }

        // clear form fields
        document.getElementById("reg-username").value = "";
        document.getElementById("reg-email-address").value = "";
        document.getElementById("reg-phone-number").value = "";
        document.getElementById("reg-password").value = "";
      });

    // add event listener for login form submission
    document
      .getElementById("login-submit-btn")
      .addEventListener("click", async function () {
        const encryptedPassword = encryptPassword(this.previousElementSibling);

        await handleSubmit("/login", {
          id: document.getElementById("login-id").value,
          password: encryptedPassword,
        });
      });

    // initialize accordions
    initAccordions();

    // add event listener to close button for popup
    document.addEventListener("DOMContentLoaded", function () {
      let closeButton = document.querySelector(".close-btn");

      closeButton.addEventListener(
        "click",
        () => (document.getElementById("popup").style.display = "none")
      );
    });
  }
}

export { init };
