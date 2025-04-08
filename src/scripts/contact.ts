import type { FormResponseType } from "../types";

const form = document.querySelector("form") as HTMLFormElement;
const responseMsg = document.querySelector(
  "#responseMsg"
) as HTMLParagraphElement;

const submitButton = document.querySelector(
  "button[type='submit']"
) as HTMLButtonElement;
const buttonText = submitButton.textContent || "Submit";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
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
    responseMsg.textContent = "An error occurred during submission.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = buttonText;
  }
});
