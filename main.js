import { searchMovies } from "./api.js";
import { renderMovies } from "./render.js";

const searchButton = document.getElementById("search-button");
const container = document.getElementById("cards-container");
const favoritesButton = document.getElementById("favorites");

function isFavorites(movieName) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((movie) => movie.title === movieName);
}

async function getData() {
  const searchInput = document.getElementById("search-text");
  const movieName = searchInput.value;

  const movies = await searchMovies(movieName);
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  renderMovies(movies, container, favorites);
}

searchButton.addEventListener("click", getData);

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-button")) {
    addToFavorites(event.target);
  }
});

favoritesButton.addEventListener("click", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const mappedFavorites = favorites.map((movie) => ({
    Title: movie.title,
    Year: movie.date,
    Poster: movie.poster,
  }));
  renderMovies(mappedFavorites, container, favorites);
});

const addToFavorites = (button) => {
  const parent = button.parentElement.parentElement;
  const movieName = parent.querySelector(".movie-name").textContent;
  const date = parent.querySelector(".movie-date").textContent;
  const poster = parent.querySelector("img").src;

  const alreadyFavorite = isFavorites(movieName);

  if (!alreadyFavorite) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push({ title: movieName, date: date, poster: poster });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Dodano do ulubionych:", movieName);
  } else {
    console.log("Ten film już jest w ulubionych");
  }
};
