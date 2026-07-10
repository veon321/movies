import { searchMovies } from "./api.js";
import { renderMovies } from "./render.js";

const searchButton = document.getElementById("search-button");

async function getData() {
  const searchInput = document.getElementById("search-text");
  const movieName = searchInput.value;

  const movies = await searchMovies(movieName);
  renderMovies(movies);
}

searchButton.addEventListener("click", getData);
