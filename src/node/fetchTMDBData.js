const fetch = require(`node-fetch`);

const {
  TMDB_READ_ACCESS_TOKEN,
  TMDB_TV_LIST_ID,
  TMDB_MOVIE_LIST_ID
} = process.env;

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
      const response = await fetch20Items();
      const data = await response.json();
      totalPages = data.total_pages;

      if (data.results && data.results.length > 0) {
        const item = data.results[0];

        const title = item.title || item.name;
        const id = item.id;
        const releaseDate = item.release_date || item.first_air_date;
        const posterUrl = `https://image.tmdb.org/t/p/original${item.poster_path}`;
        const link = `https://www.themoviedb.org/${api}/${id}`;

        if (!title || !id || !releaseDate || !item.poster_path) {
          console.log(`Removed TMDB item:`, item);
          continue;
        }

        items.push({ title, id, releaseDate, posterUrl, link });
      }
    } catch (error) {
      console.log("fetchTMDBListData error", error);
    }

    page++;
  } while (page <= totalPages);

  return Promise.all(items);
}

exports.fetchTMDBData = async () => {
  const tvShows = await fetchTMDBListData(TMDB_TV_LIST_ID, "tv");
  const movies = await fetchTMDBListData(TMDB_MOVIE_LIST_ID, "movie");

  return Promise.all([tvShows, movies]);
};
