import { searchMovies } from "./api.js";
import { renderMovies } from "./render.js";

const searchButton = document.getElementById("search-button");
const container = document.getElementById("cards-container");
const favorites = document.getElementById("favorites");

async function getData() {
  const searchInput = document.getElementById("search-text");
  const movieName = searchInput.value;

  const movies = await searchMovies(movieName);
  renderMovies(movies, container);
}

searchButton.addEventListener("click", getData);

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-button")) {
    addToFavorites(event.target);
  }
});

favorites.addEventListener("click", async (event) => {
  const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];
  const movies = await searchMovies(favoriteItems);
  renderMovies(movies, container, true);
  console.log(favoriteItems);
});

const addToFavorites = (button) => {
  const parent = button.parentElement.parentElement;
  const movieName = parent.querySelector(".movie-name").textContent;
  const date = parent.querySelector(".movie-date").textContent;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const alreadyExists = favorites.some((movie) => movie.title === movieName);

  if (!alreadyExists) {
    favorites.push({ title: movieName, date: date });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("Dodano do ulubionych:", movieName);
  } else {
    console.log("Ten film już jest w ulubionych");
  }
};
