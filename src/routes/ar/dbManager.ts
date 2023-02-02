import { Anime, AnimeSchema } from "../../db";
import { AnimeDetails } from "../interfaces";
import { getAnimeById } from "./controller";

export async function getAnime(id: number | string): Promise<any> {
  Anime.findOne({ id: id }, (err: any, docs: any) => {
    if (err) {
      console.error(err);
    } else {
      if (docs === null) {
        getAnimeById(id).then((anime: AnimeDetails | null) => {
          addAnime(anime);
        });
      } else {
        console.log("Anime: " + JSON.stringify(docs));
        return docs;
      }
    }
  });
}

function addAnime(anime: AnimeDetails | null) {
  if (anime === null) return;

  Anime.create({
    id: anime.id,
    name: anime.name,
    description: anime.description,
    episodes: anime.episodes.length,
    genre: anime.genres,
    episodesIds: anime.id,
  });
}
