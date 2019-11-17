const fetch = require(`node-fetch`);

const { OPEN_LIBRARY_LIST_ID } = process.env;

// See: https://openlibrary.org/developers/api
async function fetchBookDataFromOpenLibraryIDs(bookIDs) {
  let bookData = [];

  async function fetchBookDataByOLID(id) {
    try {
      const results = await fetch(
        `https://openlibrary.org/api/books?bibkeys=OLID:${id}&format=json&jscmd=data`
      );

      const data = await results.json();
      const book = data[`OLID:${id}`];

      const title = book.title;
      const publishDate = new Date(book.publish_date).getFullYear();
      const link = book.url;
      const coverUrl =
        book.cover.large || book.cover.medium || book.cover.small;

      if (!title || !id || !publishDate || !coverUrl || !link) {
        return null;
      }

      return { title, id, publishDate, link, coverUrl };
    } catch (error) {
      console.log(`fetchBookDataFromOpenLibraryIDs > error`, error);
      return null;
    }
  }

  for (let id of bookIDs) {
    const book = await fetchBookDataByOLID(id);
    if (book) bookData.push(book);
  }

  return Promise.all(bookData);
}

async function fetchBookIDsFromOpenLibraryList() {
  try {
    const results = await fetch(
      `http://openlibrary.org/people/ooloth/lists/${OPEN_LIBRARY_LIST_ID}/seeds.json`
    );

    const data = await results.json();
    let bookURLs = [];

    for (let book of data.entries) {
      bookURLs.push(book.url.replace("/books/", ""));
    }

    return bookURLs;
  } catch (error) {
    console.log("fetchbookIDsFromOpenLibraryList > error", error);
  }
}

exports.fetchBookData = async () => {
  const bookIDs = await fetchBookIDsFromOpenLibraryList();
  const bookData = await fetchBookDataFromOpenLibraryIDs(bookIDs);

  return Promise.all(bookData);
};
