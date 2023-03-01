const updateTitleForm = document.getElementById("update-title-form");
const titleInput = document.getElementById("title");
const updateTitleButton = document.getElementById("update-title-button");
const updateTitleLoader = document.querySelector(".update-title-loader");

const updateDescriptionForm = document.getElementById("update-description-form");
const descriptionInput = document.getElementById("description");
const updateDescriptionButton = document.getElementById("update-description-button");
const updateDescriptionLoader = document.querySelector(".update-description-loader");

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

  updateTitleButton.style.display = "none";
  updateTitleLoader.classList.add("show");

  fetch("/update-task-title", initTitle)
    .then((res) => {
      if (res.ok) {
        window.location.href = `/tasks/${user.userId}`;

        updateTitleLoader.classList.remove("show");
        updateTitleButton.style.display = "block";
      } else {
        return Promise.reject(res);
      }
    })
    .catch((err) => {
      updateTitleLoader.classList.remove("show");
      updateTitleButton.style.display = "block";

      err.json().then((data) => alert(data.message));
    });
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

  updateDescriptionButton.style.display = "none";
  updateDescriptionLoader.classList.add("show");

  fetch("/update-task-description", initDescription)
    .then((res) => {
      if (res.ok) {
        window.location.href = `/tasks/${user.userId}`;

        updateDescriptionLoader.classList.remove("show");
        updateDescriptionButton.style.display = "block";
      } else {
        return Promise.reject(res);
      }
    })
    .catch((err) => {
      updateDescriptionLoader.classList.remove("show");
      updateDescriptionButton.style.display = "block";

      err.json().then((data) => alert(data.message));
    });
});
