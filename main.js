import { searchMovies } from "./api.js";
import { renderMovies } from "./render.js";

const searchButton = document.getElementById("search-button");
const container = document.getElementById("cards-container");

async function getData() {
  const searchInput = document.getElementById("search-text");
  const movieName = searchInput.value;

  const movies = await searchMovies(movieName);
  renderMovies(movies, container);
}

searchButton.addEventListener("click", getData);
