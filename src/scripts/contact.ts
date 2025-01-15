import type { FormResponseType } from "../types";

const form = document.querySelector("form") as HTMLFormElement;
const responseMsg = document.querySelector(
  "#responseMsg"
) as HTMLParagraphElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  responseMsg.textContent = "";

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
    });

    const result: FormResponseType = await response.json();

    if (response.ok) {
      responseMsg.textContent = result.message;
      form.reset();
    } else {
      responseMsg.textContent = result.message + ": " + result.errors;
    }
  } catch (err) {
    console.error(err);
    responseMsg.textContent = "An error occurred during submission.";
  }
});
