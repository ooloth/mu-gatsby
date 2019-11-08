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

async function fetchTMDBListData(listId) {
  let items = [];
  let page = 1;
  let totalPages;

  async function fetch20Items() {
    // See: https://developers.themoviedb.org/4/list/get-list
    return await fetch(
      `https://api.themoviedb.org/4/list/${listId}?sort_by=release_date.desc&page=${page}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
      }
    );
  }

  // See: https://www.themoviedb.org/talk/55aa2a76c3a3682d63002fb1?language=en
  do {
    try {
      const response = await limiter.schedule(() => fetch20Items());
      const data = await response.json();
      totalPages = data.total_pages;
      items.push(...data.results);
    } catch (error) {
      console.log("fetchTMDBListData error", error);
    }

    page++;
  } while (page <= totalPages);

  return Promise.all(items);
}

async function fetchIMDBLinks(items) {
  const itemsWithLinks = items.map(async item => {
    async function fetchItemDetails() {
      // See: https://developers.themoviedb.org/3/movies/get-movie-details
      return await fetch(`https://api.themoviedb.org/3/movie/${item.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
      });
    }

    try {
      const response = await limiter.schedule(() => fetchItemDetails());
      const data = await response.json();

      if (!data.imdb_id) {
        console.log(`broken IMDB id:`, item.title);
      }

      return {
        title: item.title,
        id: item.id,
        releaseDate: item.release_date,
        posterUrl: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        link: `https://www.imdb.com/title/${data.imdb_id}/`
      };
    } catch (error) {
      console.log("fetchIMDBLinks error", error);
    }
  });

  return Promise.all(itemsWithLinks);
}

exports.fetchTMDBData = async () => {
  const tvShows = await fetchTMDBListData(process.env.TMDB_TV_LIST_ID);
  const tvShowsWithLinks = await fetchIMDBLinks(tvShows);

  const movies = await fetchTMDBListData(process.env.TMDB_MOVIE_LIST_ID);
  const moviesWithLinks = await fetchIMDBLinks(movies);

  return Promise.all([tvShowsWithLinks, moviesWithLinks]);
};
