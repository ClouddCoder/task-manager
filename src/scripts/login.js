const loginForm = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const logged = window.localStorage.getItem("logged");

if (logged) window.localStorage.removeItem("logged");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const init = {
    method: "POST",
    body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }),
    headers: {
      "Content-Type": "application/json",
    },
  };

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
    })
    .catch((err) => {
      throw new Error(err);
    });
});
