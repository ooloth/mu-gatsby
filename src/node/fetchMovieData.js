const fetch = require(`node-fetch`);
const { movies: movieTitles } = require(`../data/likes/movies`);

async function getMovieDataFromTitles(movieTitles) {
  return Promise.all(
    movieTitles.map(async title => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURI(title)}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
            }
          }
        );

        const data = await response.json();

        return {
          title: data.results[0].title,
          id: data.results[0].id,
          releaseDate: data.results[0].release_date,
          posterUrl: `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`
        };
      } catch (error) {
        console.log("getMovieDataFromTitles error", error);
      }
    })
  );
}

async function getLinks(movieData) {
  return Promise.all(
    movieData.map(async movie => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
            }
          }
        );

        const data = await response.json();

        return {
          ...movie,
          link: `https://www.imdb.com/title/${data.imdb_id}/`
        };
      } catch (error) {
        console.log("getLinks error", error);
      }
    })
  );
}

exports.fetchMovieData = async () => {
  const movieData = await getMovieDataFromTitles(movieTitles);
  const moviesWithLinks = await getLinks(movieData);

  return moviesWithLinks;
};
