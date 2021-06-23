// console.log('testing');

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");

function handleUsernameFormSubmit(e) {
  e.preventDefault();
  const username = usernameInput.value;
}

usernameForm.addEventListener("submit", handleUsernameFormSubmit);