/**
 * Creates a span element and appends it to the input element.
 * @param {*} input
 * @param {*} err
 */
const createSpan = (input, err) => {
  const span = document.createElement("span");

  span.textContent = err;
  span.classList.remove("none");
  span.classList.add("error");

  input.insertAdjacentElement("afterend", span);
};

/**
 * Hides the error message when the user starts typing.
 */
document.addEventListener("input", (e) => {
  if (
    e.target.matches("#email") ||
    e.target.matches("#password") ||
    e.target.matches("#username")
  ) {
    const spans = document.querySelectorAll(".error");

    if (!spans) return;

    spans.forEach((span) => {
      span.classList.remove("error");
      span.classList.add("none");
    });
  }
});

export { createSpan };
