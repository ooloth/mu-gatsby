const fetch = require(`node-fetch`);
const Bottleneck = require(`bottleneck`);

// See: https://developers.themoviedb.org/3/getting-started/request-rate-limiting
// See: https://github.com/SGrondin/bottleneck#reservoir-intervals
const limiter = new Bottleneck({
  reservoir: 40, // max requests
  reservoirRefreshAmount: 40,
  reservoirRefreshInterval: 10 * 1000, // time span (must be divisible by 250)
  maxConcurrent: 1,
  minTime: 10000 / 40 // avg MS per request
});

async function getMovieDataFromTMDBList() {
  let movies = [];
  let page = 1;
  let totalPages;

  async function fetchNext20Movies() {
    // See: https://developers.themoviedb.org/4/list/get-list
    return await fetch(
      `https://api.themoviedb.org/4/list/125630?sort_by=release_date.desc&page=${page}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
        }
      }
    );
  }

  do {
    try {
      const response = await limiter.schedule(() => fetchNext20Movies());
      const data = await response.json();
      totalPages = data.total_pages;
      movies.push(...data.results);
    } catch (error) {
      console.log("getMovieDataFromFavouritesList error", error);
    }

    page++;
  } while (page <= totalPages);

  return Promise.all(movies);
}

async function getLinks(movies) {
  const moviesWithLinks = movies.map(async movie => {
    async function fetchMovieDetails() {
      // See: https://developers.themoviedb.org/3/movies/get-movie-details
      return await fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.THEMOVIEDB_API_READ_ACCESS_TOKEN}`
        }
      });
    }

    try {
      const response = await limiter.schedule(() => fetchMovieDetails());
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
  const movies = await getMovieDataFromTMDBList();
  const moviesWithLinks = await getLinks(movies);

  return Promise.all(moviesWithLinks);
};
