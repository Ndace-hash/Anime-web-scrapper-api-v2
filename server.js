// THIS IS THE LATEST VERSION OF ANIME WEB SCRAPPER API
// THIS IS BUILT ON https://github.com/kromate/Anime_web_scrapper_API by Kromate
// IT GETS DATA FROM THE GOGO ANIMES WEBSITE

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

/**@example http://localhost:3000/genres
 * GENRE LIST FOR ANIMES
 */
app.get("/genres", async (request, response) => {
  console.log(request.url, request.method);

  const { data } = await axios.get("https://www3.gogoanimes.fi/");
  const $ = await cheerio.load(data);
  const genreList = [];

  $("nav.menu_top ul li.genre ul li a").each((i, el) => {
    const title = $(el).text();
    const link = $(el).attr("href");

    genreList.push({
      genre: title,
      link: link,
    });
  });

  response.send(genreList);
});
