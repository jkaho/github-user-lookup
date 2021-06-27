// console.log('testing');

const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");
const resultP = document.getElementById("result");

function handleUsernameFormSubmit(e) {
  e.preventDefault();
  const checkedBoxValue = document.querySelectorAll('input[name="data-type"]:checked')[0].value;
  let userCounts;
  const usernameList = usernameInput.value.split(","); // username1,username2, username3, etc.
  if (checkedBoxValue === "public-repos") {
    userCounts = getCounts(usernameList);
  } else if (checkedBoxValue === "original-works") {
    userCounts = getOriginals(usernameList);
  } else {
    userCounts = getOriginalStars(usernameList);
  }
  userCounts.then(res => {
    resultP.innerHTML = "";
    res.sort((a, b) => b.count - a.count);
    for (let i = 0; i < res.length; i++) {
      let str = `<div class="${i === 0 ? "winner" : ""}"><span class="bold-text">${res[i].username}</span> - <span class="bold-text">${res[i].count}</span></div>`
      resultP.innerHTML += str;
    }
  })
}

function getCounts(usernames) {
  let repoCounts = [];
  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i].trim();
    repoCounts.push(
      fetch(`https://api.github.com/users/${username}`, {
        method: "GET",
        headers: {
          accept: "application/vnd.github.v3+json"
        }
      }).then(res => res.json())
        .then(data => {
          return { username: username, count: data.public_repos };
        })
        .catch(err => console.log(err))
    )
  }
  return Promise.all(repoCounts);
}

function getOriginals(usernames) {
  let originalRepos = [];
  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i].trim();
    let repoCount = 0;
    originalRepos.push(
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        method: "GET",
        headers: {
          accept: "application/vnd.github.v3+json"
        }
      }).then(res => res.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].fork) {
              repoCount++;
            }
          }
          return { username: username, count: repoCount };
        })
        .catch(err => console.log(err))
    )
  }
  return Promise.all(originalRepos);
}

function getOriginalStars(usernames) {
  let originalRepos = [];
  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i].trim();
    let starCount = 0;
    originalRepos.push(
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        method: "GET",
        headers: {
          accept: "application/vnd.github.v3+json"
        }
      }).then(res => res.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].fork) {
              starCount += data[i].stargazers_count;
            }
          }
          return { username: username, count: starCount };
        })
        .catch(err => console.log(err))
    )
  }
  return Promise.all(originalRepos);
}

usernameForm.addEventListener("submit", handleUsernameFormSubmit);