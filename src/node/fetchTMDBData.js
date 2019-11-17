const fetch = require(`node-fetch`);
const Bottleneck = require(`bottleneck`);

const {
  TMDB_READ_ACCESS_TOKEN,
  TMDB_TV_LIST_ID,
  TMDB_MOVIE_LIST_ID
} = process.env;

// See: https://developers.themoviedb.org/3/getting-started/request-rate-limiting
// See: https://github.com/SGrondin/bottleneck#reservoir-intervals
const limiter = new Bottleneck({
  reservoir: 40, // max requests
  reservoirRefreshAmount: 40,
  reservoirRefreshInterval: 10 * 1000, // time span (must be divisible by 250)
  maxConcurrent: 1,
  minTime: 10000 / 40 // avg MS per request
});

async function fetchTMDBListData(listId, api) {
  let items = [];
  let page = 1;
  let totalPages;
  const sort = api === "tv" ? "primary_release_date.desc" : "release_date.desc";

  async function fetch20Items() {
    // See: https://developers.themoviedb.org/4/list/get-list
    return await fetch(
      `https://api.themoviedb.org/4/list/${listId}?sort_by=${sort}.desc&page=${page}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`
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

      if (data.results && data.results.length > 0) {
        items.push(...data.results);
      }
    } catch (error) {
      console.log("fetchTMDBListData error", error);
    }

    page++;
  } while (page <= totalPages);

  return Promise.all(items);
}

async function fetchIMDBLinks(items, api) {
  const itemsWithLinks = items.map(async item => {
    async function fetchItemDetails() {
      // See: https://developers.themoviedb.org/3/movies/get-movie-details
      return await fetch(
        `https://api.themoviedb.org/3/${api}/${item.id}/external_ids`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`
          }
        }
      );
    }

    try {
      const response = await limiter.schedule(() => fetchItemDetails());
      const data = await response.json();

      if (!data.imdb_id) {
        console.log(`fetchIMDBLinks > broken IMDB id:`);
        console.log("data", data);
        console.log("item", item);
      }

      const title = api === "tv" ? item.original_name : item.title;
      const id = item.id;
      const releaseDate =
        api === "tv" ? item.first_air_date : item.release_date;
      const posterUrl = `https://image.tmdb.org/t/p/original${item.poster_path}`;
      const link = `https://www.imdb.com/title/${data.imdb_id}/`;

      if (!title || !id || !releaseDate || !item.poster_path || !data.imdb_id) {
        return null;
      }

      return { title, id, releaseDate, posterUrl, link };
    } catch (error) {
      console.log("fetchIMDBLinks error", error);
    }
  });

  return Promise.all(itemsWithLinks);
}

exports.fetchTMDBData = async () => {
  const tvShows = await fetchTMDBListData(TMDB_TV_LIST_ID, "tv");
  const tvShowsWithLinks = await fetchIMDBLinks(tvShows, "tv");

  const movies = await fetchTMDBListData(TMDB_MOVIE_LIST_ID, "movie");
  const moviesWithLinks = await fetchIMDBLinks(movies, "movie");

  return Promise.all([tvShowsWithLinks, moviesWithLinks]);
};
