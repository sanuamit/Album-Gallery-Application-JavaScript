const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", function() {
  window.history.back();
});

const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("albumId");

// photos.js
const container = document.getElementById("photos");
// const searchBar = document.getElementById("search-bar");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search photos...";
searchInput.addEventListener("input", searchPhotos);
document.body.insertBefore(searchInput, container);
fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then(response => response.json())
  .then(photos => {
    photos.forEach(photo => {
      const card = document.createElement("div");
      card.classList.add("photo-card");
      card.innerHTML = `
        <img src="${photo.thumbnailUrl}" alt="${photo.title}">
        <p>${photo.title}</p>
      `;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";
      card.appendChild(deleteBtn);

      container.appendChild(card);
    });
  })
  .catch(error => console.error(error));

function searchPhotos(event) {
  const searchTerm = event.target.value.toLowerCase();
  const photoCards = document.querySelectorAll(".photo-card");
  photoCards.forEach(card => {
    const title = card.querySelector("p").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
container.addEventListener("click", event => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
  }
});
