const fetch = require(`node-fetch`);

const { albums } = require("../data/likes/albums");
const { podcasts } = require("../data/likes/podcasts");
const { books } = require("../data/likes/books");

async function searchiTunesAPI(items, media, entity) {
  const stringOfItemIDs = items.map(item => item.id).join(",");

  // See: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#lookup
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${stringOfItemIDs}&country=CA&media=${media}&entity=${entity}&sort=recent`
  ).catch(error => console.log("searchiTunesAPI error", error));

  const data = await response.json();

  const formattedResults = data.results.map(result => {
    if (!result) {
      console.log("No iTunes search result for:", result.name);
      return null;
    }

    const resultID = result.collectionId || result.trackId;
    const matchingItem = items.find(item => item.id === resultID);

    if (!matchingItem) {
      console.log("No matching item...");
      console.log("matchingItem", matchingItem);
      console.log("result", result);
      console.log("resultID", resultID);
    }

    const artist = result.artistName || matchingItem.artist;
    const name = matchingItem.name;
    const id = resultID;
    const releaseDate = matchingItem.date;
    const link = result.collectionViewUrl || result.trackViewUrl;
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
  const albumData = await searchiTunesAPI(albums, "music", "album");
  const podcastData = await searchiTunesAPI(podcasts, "podcast", "podcast");
  const bookData = await searchiTunesAPI(books, "ebook", "ebook");

  return Promise.all([albumData, podcastData, bookData]);
};
