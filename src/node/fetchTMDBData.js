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

  async function fetch20Items() {
    // See: https://www.themoviedb.org/talk/55aa2a76c3a3682d63002fb1?language=en
    // See: https://developers.themoviedb.org/4/list/get-list
    return await fetch(
      `https://api.themoviedb.org/4/list/${listId}?sort_by=primary_release_date.desc&page=${page}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`
        }
      }
    );
  }

  do {
    try {
      const response = await fetch20Items();
      const data = await response.json();
      totalPages = data.total_pages;

      if (data.results && data.results.length > 0) {
        for (let result of data.results) {
          const title = result.title || result.name;
          const id = result.id;
          const releaseDate = result.release_date || result.first_air_date;
          const posterUrl = `https://image.tmdb.org/t/p/original${result.poster_path}`;
          const link = `https://www.themoviedb.org/${api}/${id}`;

          if (!title || !id || !releaseDate || !result.poster_path) {
            console.log(`Removed TMDB result:`, result);
            continue;
          }

          items.push({ title, id, releaseDate, posterUrl, link });
        }
      }
    } catch (error) {
      console.log("fetchTMDBListData error", error);
    }

    page++;
  } while (page <= totalPages);

  return Promise.all(items);
}

exports.fetchTMDBData = async () => {
  const tvData = await fetchTMDBListData(TMDB_TV_LIST_ID, "tv");
  const movieData = await fetchTMDBListData(TMDB_MOVIE_LIST_ID, "movie");

  return Promise.all([tvData, movieData]);
};
