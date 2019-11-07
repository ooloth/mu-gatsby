const fetch = require(`node-fetch`);
const Bottleneck = require(`bottleneck`);
const { movies: movieTitles } = require(`../data/likes/movies`);

// See: https://developers.themoviedb.org/3/getting-started/request-rate-limiting
// See: https://github.com/SGrondin/bottleneck#reservoir-intervals
const limiter = new Bottleneck({
  reservoir: 40, // max requests
  reservoirRefreshAmount: 40,
  reservoirRefreshInterval: 10 * 1000, // time span (must be divisible by 250)
  maxConcurrent: 1,
  minTime: 10000 / 40 // avg MS per request
});

async function getMovieDataFromTitles(movieTitles) {
  const movieData = movieTitles.map(async title => {
    try {
      const response = await limiter.schedule(() =>
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURI(title)}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
            }
          }
        )
      );

      const data = await response.json();

      if (!data.results[0]) {
        console.log(`broken title:`, title);
      }

      if (!data.results[0].poster_path) {
        console.log(`broken poster:`, title);
      }

      return {
        title: data.results[0].title,
        id: data.results[0].id,
        releaseDate: data.results[0].release_date,
        posterUrl: `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`
      };
    } catch (error) {
      console.log("getMovieDataFromTitles error", error);
    }
  });

  return Promise.all(movieData);
}

async function getLinks(movieData) {
  const moviesWithLinks = movieData.map(async movie => {
    try {
      const response = await limiter.schedule(() =>
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
          }
        })
      );

      const data = await response.json();

      if (!data.imdb_id) {
        console.log(`broken IMDB id:`, movie.title);
      }

      return {
        ...movie,
        link: `https://www.imdb.com/title/${data.imdb_id}/`
      };
    } catch (error) {
      console.log("getLinks error", error);
    }
  });

  return Promise.all(moviesWithLinks);
}

exports.fetchMovieData = async () => {
  const movieData = await getMovieDataFromTitles(movieTitles);
  const moviesWithLinks = await getLinks(movieData);

  return Promise.all(moviesWithLinks);
};
