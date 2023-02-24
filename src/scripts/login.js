const form = document.querySelector(".login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const init = {
    method: "POST",
    body: JSON.stringify({ email: email.value, password: password.value }),
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
      window.location.href = `/?userId=${data.userId}`;
    })
    .catch((err) => {
      throw new Error(err);
    });
});
