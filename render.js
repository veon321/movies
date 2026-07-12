export function renderMovies(movies, container, favorites) {
  container.innerHTML = "";

  if (!movies) {
    return;
  }

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
        <button type="button" class="add-button">Add</button>
      </div>
    `;

    const button = card.querySelector(".add-button");

    if (favorites) {
      const isAlreadyFavorite = favorites.some(
        (favorite) => favorite.title === movie.Title,
      );

      if (isAlreadyFavorite) {
        button.textContent = "Favorite";
      }
    }

    container.appendChild(card);
  });
}
