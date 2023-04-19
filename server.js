// THIS IS THE LATEST VERSION OF ANIME WEB SCRAPPER API
// THIS IS BUILT ON https://github.com/kromate/Anime_web_scrapper_API by Kromate
// IT GETS DATA FROM THE GOGO ANIMES WEBSITE

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const RandomUserAgent = require("random-useragent");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
// puppeteer.use(StealthPlugin());
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
  response.set("Acess-Control-Allow-Origin", "*");
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
  response.set("Acess-Control-Allow-Origin", "*");

  response.send(animeList);
});

/**@example http://localhost:3000/kekkon-yubiwa-monogatari */
app.get("/:title", async (request, response) => {
  console.log(request.params.title);
  const { data } = await axios.get(
    `https://www3.gogoanimes.fi/category/${request.params.title}`
  );
  const $ = await cheerio.load(data);

  const name = $(".anime_info_body h1").text();
  const image = $(".anime_info_body img").attr("src");
  const type = $("p.type").eq(0).find("a").text();
  const summary = $("p.type").eq(1).text();

  const genres = [];
  $("p.type")
    .eq(2)
    .find("a")
    .each((_i, el) => {
      const genre = $(el).text();
      const link = $(el).attr("href");

      genres.push({ genre, link });
    });

  const release = $("p.type").eq(3).text();
  const status = $("p.type").eq(4).find("a").text();

  const availableEpisodes = [];
  $("ul#episode_page li").each((_i, el) => {
    const start_episode = $(el).find("a").attr("ep_start");
    const end_episode = $(el).find("a").attr("ep_end");

    availableEpisodes.push({ start_episode, end_episode });
  });

  const id = $("input#movie_id").attr("value");

  response.set("Access-Control-Allow-Origin", "*");
  response.send({
    id,
    name,
    image,
    type,
    summary,
    genres,
    release,
    status,
    availableEpisodes,
  });
});

/**@example https://localhost:3000/bleach/episode?number=17
 * Gets an episode of an anime
 */
app.get("/:anime/episode", async (request, response) => {
  console.log(
    `/${request.params.anime}/episode?number=${request.query.number}`
  );
  const { data } = await axios.get(
    `https://gogoanimes.fi/${request.params.anime}-episode-${request.query.number}`
  );
  const name = request.params.anime;
  const episode = request.query.number;

  const $ = await cheerio.load(data);

  const download_link = $("ul li.dowloads a").attr("href");

  response.set("Access-Control-ALlow-Origin", "*");
  response.send({
    name,
    episode,
    download_link,
  });
});

app;
// const USER_AGENT =
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36";

// function DownloadLink(link) {
//   return new Promise((resolve, reject) => {
//     (async () => {
//       const userAgent = RandomUserAgent.getRandom();

//       const UA = userAgent || USER_AGENT;
//       // Launch a headless browser instance
//       const browser = await puppeteer.launch({ headless: false });

//       const page = await browser.newPage();

//       await page.setUserAgent(UA);
//       await page.setJavaScriptEnabled(true);
//       await page.setDefaultNavigationTimeout(60000);
//       // Navigate to the website
//       await page.goto(link);

//       // Wait for the dynamic content to load
//       await page.waitForXPath('//*[@id="content-download"]/div[1]'); // Replace with the appropriate XPath of the dynamic content element

//       // Get the page content
//       const pageContent = await page.content();

//       // Extract the download links
//       const downloadLinks = [];
//       // Use DOM manipulation methods to extract the download links based on the HTML structure of the website
//       // Example:
//       const linkElements = await page.$$(".dowload > a"); // Replace with the appropriate selector for the download links
//       console.log(linkElements);
//       // for (const linkElement of linkElements) {
//       //    const link = await linkElement.getProperty('href');
//       //    downloadLinks.push(await link.jsonValue());
//       //  }

//       // Close the browser instance
//       await browser.close();

//       // Use the extracted download links as needed
//       console.log("download", downloadLinks); // Print or process the download links as needed
//     })();
//   });
// }
