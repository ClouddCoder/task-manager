const updateTitleForm = document.getElementById("update-title-form");
const titleInput = document.getElementById("title");

const updateDescriptionForm = document.getElementById("update-description-form");
const descriptionInput = document.getElementById("description");

const loggedJSON = window.localStorage.getItem("logged");
const user = JSON.parse(loggedJSON);

updateTitleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;

  const initTitle = {
    method: "PUT",
    body: JSON.stringify({ taskId, title }),
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  fetch("/update-task-title", initTitle)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) window.location.href = `/?userId=${user.userId}`;
    })
    .catch((err) => console.log(err));
});

updateDescriptionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = descriptionInput.value;

  const initDescription = {
    method: "PUT",
    body: JSON.stringify({ taskId, description }),
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  fetch("/update-task-description", initDescription)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) window.location.href = `/?userId=${user.userId}`;
    })
    .catch((err) => console.log(err));
});
