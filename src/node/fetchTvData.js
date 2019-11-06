const fetch = require("node-fetch");
const { tv: showTitles } = require(`../data/likes/tv`);

async function getJwtTokenForApiCalls() {
  try {
    const response = await fetch("https://api.thetvdb.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        apikey: process.env.THETVDB_API_KEY
      })
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.log("Login error", error);
  }
}

async function getShowDataFromTitles(showTitles, jwtToken) {
  return Promise.all(
    showTitles.map(async title => {
      function slugify(string) {
        const a =
          "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
        const b =
          "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
        const p = new RegExp(a.split("").join("|"), "g");

        if (string === `The Zen Diaries of Garry Shandling`) {
          return `345128`;
        }

        return string
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, "-and-") // Replace & with 'and'
          .replace(/[^\w-]+/g, "") // Remove all non-word characters
          .replace(/--+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, ""); // Trim - from end of text
      }

      try {
        const response = await fetch(
          `https://api.thetvdb.com/search/series?slug=${slugify(title)}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${jwtToken}`
            }
          }
        );

        const data = await response.json();
        if (typeof data.data === `undefined`) {
          console.log("title", title);
          console.log("slugify(title)", slugify(title));
        }
        return {
          // Remove trailing year in parentheses from titles
          // See: https://community.alteryx.com/t5/Alteryx-Designer-Discussions/Removing-text-within-parenthesis-and-the-parenthesis-from-cells/td-p/64611
          name: data.data[0].seriesName.replace(/ \(.*?\)/, ""),
          id: data.data[0].id,
          airDate: data.data[0].firstAired ? data.data[0].firstAired : null
        };
      } catch (error) {
        console.log("getShowDataFromTitles error", error);
      }
    })
  );
}

async function getAirDate(showData, jwtToken) {
  return Promise.all(
    showData.map(async show => {
      if (!show.airDate) {
        try {
          const response = await fetch(
            `https://api.thetvdb.com/series/${show.id}/episodes/query?airedSeason=1&airedEpisode=1`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${jwtToken}`
              }
            }
          );
          const data = await response.json();
          if (typeof data.data === `undefined`) {
            console.log("show.name", show.name);
            console.log("show.id", show.id);
          } else {
            // console.log("show.name", show.name);
            // console.log("show.firstAired", show.firstAired);
            // console.log("data.data[0].firstAired", data.data[0].firstAired);
          }
          return {
            ...show,
            airDate: data.data[0].firstAired
          };
        } catch (error) {
          console.log("getAirDate error", error);
        }
      } else {
        return show;
      }
    })
  );
}

async function getShowImages(showData, jwtToken) {
  return Promise.all(
    showData.map(async show => {
      try {
        const response = await fetch(
          `https://api.thetvdb.com/series/${show.id}/images/query?keyType=poster`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${jwtToken}`
            }
          }
        );
        const data = await response.json();
        if (typeof data.data === `undefined`) {
          console.log("show.name", show.name);
          console.log("show.id", show.id);
        }
        return {
          ...show,
          posterUrl: `https://www.thetvdb.com/banners/${data.data[0].fileName}`
        };
      } catch (error) {
        console.log("getShowImages error", error);
      }
    })
  );
}

exports.fetchTvData = async () => {
  const jwtToken = await getJwtTokenForApiCalls();
  const showData = await getShowDataFromTitles(showTitles, jwtToken);
  const showsWithDates = await getAirDate(showData, jwtToken);
  const showsWithImages = await getShowImages(showsWithDates, jwtToken);

  return showsWithImages;
};