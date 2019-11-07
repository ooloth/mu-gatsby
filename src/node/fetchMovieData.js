const fetch = require(`node-fetch`);
const Bottleneck = require(`bottleneck`);
// const { movies: movieTitles } = require(`../data/likes/movies`);

async function getMovieDataFromTMDBList() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/4/list/125630?page=1`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
        }
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("getMovieDataFromFavouritesList error", error);
  }
}

// See: https://developers.themoviedb.org/3/getting-started/request-rate-limiting
// See: https://github.com/SGrondin/bottleneck#reservoir-intervals
const limiter = new Bottleneck({
  reservoir: 40, // max requests
  reservoirRefreshAmount: 40,
  reservoirRefreshInterval: 10 * 1000, // time span (must be divisible by 250)
  maxConcurrent: 1,
  minTime: 10000 / 40 // avg MS per request
});

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
        title: movie.title,
        id: movie.id,
        releaseDate: movie.release_date,
        posterUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        link: `https://www.imdb.com/title/${data.imdb_id}/`
      };
    } catch (error) {
      console.log("getLinks error", error);
    }
  });

  return Promise.all(moviesWithLinks);
}

exports.fetchMovieData = async () => {
  const movieData = await getMovieDataFromTMDBList();
  console.log("movieData", movieData);
  // const movieData = await getMovieDataFromTitles(movieTitles);
  const moviesWithLinks = await getLinks(movieData);
  console.log("moviesWithLinks", moviesWithLinks);

  return Promise.all(moviesWithLinks);
};
