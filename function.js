const userDataContainer = document.getElementById("user-data");
const searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("placeholder", "Search by username");
userDataContainer.before(searchBar);

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${user.username}</h2>
      <p>ID: ${user.id}</p>
      <p>Name: ${user.name}</p>
    `;
    

    const albumButton = document.createElement("button");
    albumButton.style.backgroundColor = "orange";
    albumButton.style.color = "black";
    albumButton.innerText = "Album";
    albumButton.addEventListener("click", () => {
      // Open the album for this particular user
      const userId = user.id;
      window.location.assign(`album.html?userId=${userId}`);
    });
    
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "black";
    deleteButton.addEventListener("click", () => {
      // Delete this particular user
      card.remove();
    });

    card.appendChild(albumButton);
    card.appendChild(deleteButton);
    userDataContainer.appendChild(card);
  });
};

fetchData();

searchBar.addEventListener("input", event => {
  const searchTerm = event.target.value.toLowerCase();

  Array.from(userDataContainer.children).forEach(card => {
    const username = card.querySelector("h2").innerText.toLowerCase();
    if (username.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});