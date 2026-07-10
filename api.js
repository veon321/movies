const API_KEY = "9df541c9";

export async function searchMovies(movieName) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`,
  );
  const data = await response.json();
  return data.Search;
}
