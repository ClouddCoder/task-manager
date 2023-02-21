const loggedJSON = window.localStorage.getItem("logged");

if (!loggedJSON) {
  window.location.href = "/login-page";
}
