// console.log('testing');

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");
const resultP = document.getElementById("result");

function handleUsernameFormSubmit(e) {
  e.preventDefault();
  const username = usernameInput.value;
  fetch(`https://api.github.com/users/${username}`, {
    method: "GET",
    headers: {
      accept: "application/vnd.github.v3+json"
    }
  }).then(res => res.json())
    .then(data => {
      console.log(data)
      let str;
      if (data.message) {
        str = `"${username}" is not a valid GitHub user.`
      } else {
        str = `${username} has <span class="bold-text">${data.public_repos}</span> repositories!`;
      }
      resultP.innerHTML = str;
    })
    .catch(err => console.log(err))
}

usernameForm.addEventListener("submit", handleUsernameFormSubmit);