import { createSpan } from "./utils.js";

const signUpForm = document.querySelector(".sign-up-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const inputs = document.querySelectorAll("input");

const logged = window.localStorage.getItem("logged");

if (logged) window.localStorage.removeItem("logged");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const init = {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("/sign-up", init)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      window.localStorage.setItem("logged", JSON.stringify(data));
      window.location.href = `/tasks/${data.userId}`;
    })
    .catch((err) => {
      // Creates a span element for each input and adds the error message to it.
      inputs.forEach((input) => {
        createSpan(input, err);
      });
    });
});
