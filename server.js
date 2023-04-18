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

/**@example http://localhost:3000/gl?link=/genre/ecchi
 * ANIME LIST BY GENRE
 */
app.get("/gl", async (request, response) => {
  console.log(request.query.link);
  const { data } = await axios.get(
    `https://www3.gogoanimes.fi${request.query.link}`
  );
  const $ = await cheerio.load(data);
  const animeList = [];

  $(".main_body .last_episodes ul.items li").each((i, el) => {
    const title = $(el).find("p.name a").text();
    const image = $(el).find(".img a img").attr("src");
    const link = $(el).find("p.name a").attr("href");
    const released = $(el).find("p.released").text().trim();

    animeList.push({ title, image, link, released });
  });

  response.send(animeList);
});
