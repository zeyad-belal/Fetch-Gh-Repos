let input = document.querySelector("input");
let getBtn = document.querySelector(".get-button");
let showData = document.querySelector(".show-data");

getBtn.onclick = function () {
  showData.innerHTML = `<span>No Data To Show</span>`;
  
  if (input.value == "") {
    // If Value Is Empty
    showData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    let theApi = `https://api.github.com/users/${input.value}/repos`;

    fetch(theApi)
      .then((response) => {
        let data = response.json();
        return data;
      })
      .then((repos) => {
        repos.forEach((repo) => {
          // repos names
          let repoName = repo.name;
          let repoBox = document.createElement("div");
          repoBox.classList.add("repo-box");
          repoBox.appendChild(document.createTextNode(repoName));
          showData.appendChild(repoBox);

          // visit button
          let visitBtn = document.createElement("a");

          visitBtn.textContent = "visit";
          visitBtn.href = `https://github.com/zeyad-belal/${repoName}`;
          visitBtn.setAttribute("target", "_blank");

          repoBox.appendChild(visitBtn);

          // repose stars
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          let starsSpan = document.createElement("span");

          starsSpan.appendChild(starsText);
          repoBox.appendChild(starsSpan);
        });
      });
    document.querySelector(".show-data span").textContent = "";
  }
};
