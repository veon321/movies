const API_KEY = "9df541c9";

export async function searchMovies(movieName) {
  if (Array.isArray(movieName)) {
    const results = await Promise.all(
      movieName.map(async (movie) => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie.title}&y=${movie.date}`,
        );
        const data = await response.json();
        return data.Search ? data.Search[0] : null;
      }),
    );
    return results;
  } else {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`,
    );
    const data = await response.json();
    return data.Search;
  }
}
