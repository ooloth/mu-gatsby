const fetch = require(`node-fetch`);

const { albums } = require("../data/likes/albums");
const { podcasts } = require("../data/likes/podcasts");
const { books } = require("../data/likes/books");

async function searchiTunesAPI(items) {
  const stringOfItemIDs = items.map(item => item.id).join(",");

  // See: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#lookup
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${stringOfItemIDs}&country=CA`
  ).catch(error => console.log("searchiTunesAPI error", error));

  const data = await response.json();

  const formattedResults = data.results.map((result, i) => {
    if (!result) {
      console.log("No iTunes search result for:", result.name);
      return null;
    }

    const artist = result.artistName || items[i].artist || null;
    const name = items[i].name;
    const id = items[i].id;
    const releaseDate = items[i].date;
    const link = result.collectionViewUrl || result.trackViewUrl || null;
    // See image srcset URLs used on books.apple.com:
    const coverUrl = result.artworkUrl100.replace("100x100bb", "400x0w");

    if (!name || !id || !releaseDate || !link || !coverUrl) {
      console.log(`Removed iTunes result:`, result);
      return null;
    }

    return { artist, name, id, releaseDate, link, coverUrl };
  });

  return formattedResults;
}

exports.fetchiTunesData = async () => {
  const albumData = await searchiTunesAPI(albums);
  const podcastData = await searchiTunesAPI(podcasts);
  const bookData = await searchiTunesAPI(books);

  return Promise.all([albumData, podcastData, bookData]);
};
