const form = document.getElementById("submit-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");

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

  fetch("/create-task", init)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) window.location.href = `/?userId=${user.userId}`;
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Deletes a task using event delegation.
 */
document.addEventListener("click", (e) => {
  if (e.target.matches(".button-delete")) {
    const init = {
      method: "DELETE",
      body: JSON.stringify({ taskId: e.target.id }),
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    fetch("/delete-task", init)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) window.location.href = `/?userId=${user.userId}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
