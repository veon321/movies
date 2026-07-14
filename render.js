const FALLBACK_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='445'%3E%3Crect width='100%25' height='100%25' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' fill='%23555555' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";

export function renderMovies(movies, container, favorites) {
  container.innerHTML = "";

  if (!movies) {
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const posterUrl =
      movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

    card.innerHTML = `
      <div class="img-container">
        <img alt="${movie.Title}">
      </div>
      <p class="movie-name">${movie.Title}</p>
      <div class="date-rate-container">
        <p class="movie-date">${movie.Year}</p>
        <p class="movie-rate"></p>
        <button type="button" class="add-button">Add</button>
      </div>
    `;

    const img = card.querySelector("img");
    img.src = posterUrl;
    img.addEventListener("error", () => {
      img.src = FALLBACK_POSTER;
    });

    const button = card.querySelector(".add-button");

    if (favorites) {
      const isAlreadyFavorite = favorites.some(
        (favorite) => favorite.title === movie.Title,
      );

      if (isAlreadyFavorite) {
        button.textContent = "Favorite";
        button.classList.add("favorite");
      }
    }

    container.appendChild(card);
  });
}
