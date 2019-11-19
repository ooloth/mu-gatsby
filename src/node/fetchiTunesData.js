const fetch = require(`node-fetch`);
const Bottleneck = require(`bottleneck`);

const { albums } = require("../data/likes/albums");
const { podcasts } = require("../data/likes/podcasts");
const { books } = require("../data/likes/books");

// See: https://stackoverflow.com/a/41377650/8802485
// See: https://github.com/SGrondin/bottleneck#reservoir-intervals
const limiter = new Bottleneck({
  reservoir: 19, // max requests
  reservoirRefreshAmount: 19,
  reservoirRefreshInterval: 60 * 1000, // time span (must be divisible by 250)
  maxConcurrent: 1,
  minTime: 60000 / 19 // avg MS per request
});

// function getName(work) {
//   return work.collectionName
//     ? work.collectionName
//         .replace(" (Expanded Edition)", "")
//         .replace(" (Canadian Version)", "")
//     : work.trackName
//     ? work.trackName
//     : null;
// }

function getLink(work) {
  return work.collectionViewUrl
    ? work.collectionViewUrl
    : work.trackViewUrl
    ? work.trackViewUrl
    : null;
}

async function searchiTunesAPI(items) {
  const itemsWithiTunesData = items.map(async item => {
    async function fetchItemDetails() {
      // See: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
      return await fetch(
        `https://itunes.apple.com/lookup?id=${item.id}&country=CA`
      );
    }

    try {
      const response = await limiter.schedule(() => fetchItemDetails());
      const data = await response.json();

      if (!data.results || !data.results[0]) {
        console.log("No iTunes search results for:", item.name);
        return null;
      }

      if (data.results.length > 1) {
        console.log("More than one iTunes search result for:", item.name);
        console.log("Results:", data.results);
      }

      const work = data.results[0];

      const artist = work.artistName || item.artist || null; // podcasts don't need
      const name = item.name;
      const id = item.id;
      const releaseDate = item.date;
      const link = getLink(work);
      const coverUrl = work.artworkUrl100.replace("100x100bb", "400x0w");

      if (!name || !id || !releaseDate || !link || !coverUrl) {
        console.log(`Removed iTunes item:`, item);
        return null;
      }

      return { artist, name, id, releaseDate, link, coverUrl };
    } catch (error) {
      console.log("searchiTunesAPI error", error);
    }
  });

  return Promise.all(itemsWithiTunesData);
}

exports.fetchiTunesData = async () => {
  const albumData = await searchiTunesAPI(albums);
  const podcastData = await searchiTunesAPI(podcasts);
  const bookData = await searchiTunesAPI(books);

  return Promise.all([albumData, podcastData, bookData]);
};
