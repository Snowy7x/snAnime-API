import express from "express";
import { getAnimeById, getLatest, getTopAiring } from "./controller";

let router = express.Router();

router.get("/latest", async (req, res) => {
  const { offset, limit } = req.query;
  const latest = await getLatest(
    offset ? parseInt(offset.toString()) : undefined,
    limit ? parseInt(limit.toString()) : undefined
  );

  if (latest == null) res.sendStatus(422);
  return res.send(latest);
});

router.get("/anime", async (req, res) => {
  const { id } = req.query;
  if (id === undefined)
    return res.status(422).send("Missing one/all argument/s {id}");
  console.log("Getting anime by id: ", id);
  const anime = await getAnimeById(parseInt(id.toString()));
  console.log("Got the anime");
  if (anime == null) res.sendStatus(422);
  res.send(anime);
});

router.get("/top", async (req, res) => {
  const { offset, limit } = req.query;
  const animes = await getTopAiring(
    offset ? parseInt(offset.toString()) : undefined,
    limit ? parseInt(limit.toString()) : undefined
  );

  if (animes == null) res.sendStatus(422);
  return res.send(animes);
});

export { router };
