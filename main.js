import { searchMovies } from "./api.js";
import { renderMovies } from "./render.js";

const searchButton = document.getElementById("search-button");
const container = document.getElementById("cards-container");
const favoritesButton = document.getElementById("favorites");
const allButton = document.getElementById("all-button");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getMovieInfoFromButton(button) {
  const parent = button.parentElement.parentElement;
  return {
    title: parent.querySelector(".movie-name").textContent,
    date: parent.querySelector(".movie-date").textContent,
    poster: parent.querySelector("img")?.src,
  };
}

async function handleSearch() {
  const searchInput = document.getElementById("search-text");
  const yearInput = document.getElementById("search-year");
  const movieName = searchInput.value.trim();
  const year = yearInput.value.trim();

  if (!movieName) {
    container.innerHTML = "";
    return;
  }

  const movies = await searchMovies(movieName, year);
  const favorites = getFavorites();

  renderMovies(movies, container, favorites);
}

searchButton.addEventListener("click", handleSearch);
allButton.addEventListener("click", handleSearch);

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-button")) {
    if (event.target.textContent === "Favorite") {
      removeFromFavorites(event.target);
      event.target.textContent = "Add";
    } else {
      addToFavorites(event.target);
      event.target.textContent = "Favorite";
    }
  }
});

favoritesButton.addEventListener("click", () => {
  const favorites = getFavorites();
  const mappedFavorites = favorites.map((movie) => ({
    Title: movie.title,
    Year: movie.date,
    Poster: movie.poster,
  }));
  renderMovies(mappedFavorites, container, favorites);
});

const addToFavorites = (button) => {
  const { title, date, poster } = getMovieInfoFromButton(button);

  const favorites = getFavorites();
  favorites.push({ title, date, poster });
  saveFavorites(favorites);
};

const removeFromFavorites = (button) => {
  const { title } = getMovieInfoFromButton(button);

  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((movie) => movie.title !== title);
  saveFavorites(updatedFavorites);
};
