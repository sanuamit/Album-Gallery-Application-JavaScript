const albumContainer = document.querySelector(".album-container");
const albumData = document.querySelector(".album-data");
const backButton = document.querySelector(".back-button");


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  .then(response => response.json())
  .then(albums => {
    let albumList = "";
    albums.forEach(album => {
      albumList += `<div class="album"> 
        <h2>${album.title}</h2> 
        <p>ID: ${album.id}</p> 
        <button class="photos-button">Photos</button> 
        <button class="delete-button" data-album-id=${album.id}>Delete</button> 
      </div>`;
    });
    albumData.innerHTML = albumList;

    const photosButtons = document.querySelectorAll(".photos-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

    // photosButtons.forEach(button => {
    //   button.addEventListener("click", function() {
    //     albumId = button.parentElement.querySelector(".delete-button").getAttribute("data-album-id");
    //     fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
    //       .then(response => response.json())
    //       .then(photos => {
    //         // Your code to display photos
    //       });
    //   });
    // });
    photosButtons.forEach(button => {
      button.addEventListener("click", function() {
        const albumId = button.parentElement.querySelector(".delete-button").getAttribute("data-album-id");
        window.location.href = `photos.html?albumId=${albumId}`;
      });
    });
    
    deleteButtons.forEach(button => {
      button.addEventListener("click", function() {
        const albumId = button.getAttribute("data-album-id");
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
          method: "DELETE"
        })
          .then(response => {
            if (response.ok) {
              button.parentElement.remove();
            }
          });
      });
    });
  });
  const userBox = document.querySelector(".user-box");

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      userBox.innerHTML = `
        <img src="login.png" alt="Company Logo">
        <h2>${user.username}</h2>
        <p>ID: ${user.id}</p>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
      `;
    });
  