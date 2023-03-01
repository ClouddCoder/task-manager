const form = document.getElementById("submit-form");
const taskTitle = document.getElementById("input-task-title");
const taskDescription = document.getElementById("task-description");
const submitButton = document.getElementById("submit-button");
const loader = document.querySelector(".submit-loader");
const counter = document.getElementById("counter");
const signOutButton = document.getElementById("sign-out-button");

const user = JSON.parse(loggedJSON);

/**
 * Creates a new task.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const init = {
    method: "POST",
    body: JSON.stringify({
      userId: user.userId,
      title: taskTitle.value,
      description: taskDescription.value,
      status: "pending",
    }),
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  submitButton.style.display = "none";
  loader.classList.add("show");

  fetch("/create-task", init)
    .then((res) => {
      if (res.ok) {
        window.location.href = `/tasks/${user.userId}`;

        loader.classList.remove("show");
        submitButton.style.display = "block";
      } else {
        return Promise.reject(res);
      }
    })
    .catch((err) => {
      loader.classList.remove("show");
      submitButton.style.display = "block";

      // eslint-disable-next-line no-alert
      err.json().then((data) => alert(data.message));
    });
});

/**
 * Deletes a task using event delegation.
 */
document.addEventListener("click", (e) => {
  if (e.target.matches(".delete-button")) {
    const init = {
      method: "DELETE",
      body: JSON.stringify({ taskId: e.target.id }),
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    fetch("/delete-task", init)
      .then((res) => {
        if (res.ok) {
          window.location.href = `/tasks/${user.userId}`;
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        err.json().then((data) => alert(data.message));
      });
  }
});

/**
 * Sets the task's status using event delegation.
 */
document.addEventListener("change", (e) => {
  if (e.target.matches(".checkbox-status")) {
    const taskTitleField = document.getElementById(e.target.id);

    if (e.target.checked) {
      taskTitleField.classList.add("completed");
    } else {
      taskTitleField.classList.remove("completed");
    }

    const init = {
      method: "PUT",
      body: JSON.stringify({
        taskId: e.target.id,
        status: e.target.checked ? "completed" : "pending",
      }),
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    fetch("/update-task-status", init)
      .then((res) => {
        if (res.ok) {
          window.location.href = `/tasks/${user.userId}`;
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        err.json().then((data) => alert(data.message));
      });
  }
});

/**
 * Updates the description length counter.
 */
taskDescription.addEventListener("input", (e) => {
  if (e.target.value.length > 30) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }

  counter.textContent = `${e.target.value.length}/30`;
});

/**
 * Signs out the user.
 */
signOutButton.addEventListener("click", () => {
  window.location.href = "/";

  window.localStorage.removeItem("logged");
});
