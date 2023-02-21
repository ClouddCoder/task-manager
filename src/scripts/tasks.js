const form = document.getElementById("submit-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");

const user = JSON.parse(loggedJSON);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const init = {
    method: "POST",
    body: JSON.stringify({ title: taskTitle.value, description: taskDescription.value }),
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };

  fetch("/create-task", init)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
