// console.log('testing');

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");

function handleUsernameFormSubmit(e) {
  e.preventDefault();
}

usernameForm.addEventListener("submit", handleUsernameFormSubmit);