export function renderMovies(movies, container, favorites) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="img-container">
        <img src="${movie.Poster}" alt="${movie.Title}">
      </div>
      <p class="movie-name">${movie.Title}</p>
      <div class="date-rate-container">
        <p class="movie-date">${movie.Year}</p>
        <p class="movie-rate"></p>
        <button type="button" class="add-button" id="add-button">Dodaj</button>
      </div>
    `;

    if (favorites) {
      const button = card.querySelector(".add-button");
      button.style.display = "none";
    }

    container.appendChild(card);
  });
}
