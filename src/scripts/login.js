import { createSpan } from "./utils.js";

const loginForm = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const loader = document.querySelector(".login-loader");
const inputs = document.querySelectorAll("input");

const logged = window.localStorage.getItem("logged");

if (logged) window.localStorage.removeItem("logged");

loginButton.disabled = false;

/**
 * Handles the submit event of the login form.
 */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const init = {
    method: "POST",
    body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  loginButton.style.display = "none";
  loader.classList.add("show");

  fetch("/login", init)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      window.localStorage.setItem("logged", JSON.stringify(data));
      window.location.href = `/tasks/${data.userId}`;

      loader.classList.remove("show");
      loginButton.style.display = "block";

      // Disables the login button to prevent multiple requests.
      loginButton.disabled = true;
    })
    .catch((err) => {
      loader.classList.remove("show");
      loginButton.style.display = "block";

      // Creates a span element for each input and adds the error message to it.
      inputs.forEach((input) => {
        createSpan(input, err);
      });
    });
});
