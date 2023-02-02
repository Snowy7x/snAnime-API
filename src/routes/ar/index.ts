import express from "express";
import {
  getAnimeById,
  getLatest,
  getStreamingLinks,
  getTopAiring,
  search,
} from "./controller";
import fetch from "node-fetch";

let router = express.Router();

router.get("/latest", async (req, res) => {
  const { offset, limit } = req.query;
  const latest = await getLatest(
    offset ? parseInt(offset.toString()) : undefined,
    limit ? parseInt(limit.toString()) : undefined
  );

  if (latest == null) return res.sendStatus(422);
  return res.send(latest);
});

router.get("/anime", async (req, res) => {
  const { id } = req.query;
  if (id === undefined)
    return res.status(422).send("Missing one/all argument/s {id}");
  const anime = await getAnimeById(parseInt(id.toString()));

  if (anime === null) return res.sendStatus(422);
  res.send(anime);
});

router.get("/top", async (req, res) => {
  const { offset, limit } = req.query;
  const animes = await getTopAiring(
    offset ? parseInt(offset.toString()) : undefined,
    limit ? parseInt(limit.toString()) : undefined
  );

  if (animes === null) return res.sendStatus(422);
  return res.send(animes);
});

router.get("/search", async (req, res) => {
  const { offset, limit, animeName, season, type, genre, years } = req.query;
  console.log(offset, limit);
  const animes = await search(
    offset ? parseInt(offset.toString()) : undefined,
    limit ? parseInt(limit.toString()) : undefined,
    {
      anime_name: animeName,
      anime_season: season,
      anime_type: type,
      anime_genre_ids: genre,
      anime_release_years: years,
    }
  );

  if (animes === null) return res.sendStatus(422);
  return res.send(animes);
});

router.get("/watch", async (req, res) => {
  const { animeId, episodeId } = req.query;
  if (!animeId || !episodeId)
    return res
      .status(422)
      .send("Missing one/all argument/s {animeId, episodeId}");
  const anime = await getStreamingLinks(animeId, episodeId);

  if (anime === null) return res.sendStatus(422);
  res.send(anime);
});

router.get("/proxy", async (req, res) => {
  let { url } = req.query;
  if (!url) return res.status(404).json({ success: false });
  url = decodeURIComponent(url.toString());
  console.log(`Proxy URL: ${url}`);
  return await fetch(url, {
    headers: { range: req.headers.range },
  })
    .then(async (response) => {
      if (!response.ok)
        return res.status(404).json({ success: false, data: response });
      res.set(await getFetchHeader(response.headers));
      response.body.pipe(res.status(206));
      response.body.on("error", () => {});
    })
    .catch((err) => {
      console.log("Could not fetch, trying again", err.message);
      fetch(url.toString(), {
        headers: { range: req.headers.range },
      })
        .then(async (response) => {
          console.log("Fetching", response);
          if (!response.ok)
            return res.status(404).json({ success: false, data: response });
          res.set(await getFetchHeader(response.headers));
          response.body.pipe(res.status(206));
          response.body.on("error", () => {});
        })
        .catch((err) => {
          console.log("Could not fetch, sorry", err.message);
          res.status(404).json({ success: false, data: err.message });
        });
    });
});

const getFetchHeader = async (headers) => {
  const data = {};
  for (let [key, value] of headers) {
    data[key] = value;
  }
  return data;
};

export { router };
