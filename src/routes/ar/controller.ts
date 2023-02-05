import { getPictures } from "mal-scraper";
import { getAnimeByName } from "../../sources/anilist";
import {
  getAnime,
  getAnimeList, getEpisodesList,
  getWatchLinks,
} from "../../sources/animeslayer";
import getVideos from "../../sources/helpers/malVideos";
import {
  AnimeDetails,
  EpisodeDetails,
  LatestEpisode,
  Relation,
  SearchResult,
  StreamingLink,
  TopAnime,
} from "../interfaces";

export async function getTopAiring(
  offset: number = 0,
  limit: number = 18
): Promise<TopAnime[] | null> {
  let data = await getAnimeList("top_currently_airing", limit, offset);
  if (data.status !== 200)
    data = await getAnimeList("top_currently_airing", limit, offset);
  if (data.status !== 200) return null;

  let animes: TopAnime[] = [];
  let number = 1;
  for (let an of data.data) {
    animes.push(
      new TopAnime(
        an.anime_id,
        number,
        an.anime_name,
        an.anime_type,
        an.anime_status,
        an.anime_release_year,
        an.anime_genres,
        an.anime_rating,
        an.anime_cover_image_url
      )
    );

    number++;
  }

  return animes;
}

export async function getLatest(
  offset: number = 0,
  limit: number = 18
): Promise<LatestEpisode[] | null> {
  let data = await getAnimeList("latest_episodes", limit, offset);
  if (data.status !== 200) data = await getAnimeList("latest_episodes", 18, 0);
  if (data.status !== 200) return null;

  let animes: LatestEpisode[] = [];

  for (let an of data.data) {
    animes.push(
      new LatestEpisode(
        an.anime_id,
        an.anime_name,
        an.anime_type,
        an.anime_rating,
        an.anime_cover_image_url,
        an.latest_episode_id,
        an.latest_episode_name.replace("الحلقة : ", "")
      )
    );
  }

  return animes;
}

export async function getAnimeById(
  id: number | string
): Promise<AnimeDetails | null> {
  let data = await getAnime(id);
  if (!data || !data.hasOwnProperty("anime_name"))
    data = await getAnimeById(id);
  if (!data || !data.hasOwnProperty("anime_name")) return null;
  let data2: any = null; //await getVideos(data.anime_name);
  let data3: any = null; /*await getPictures({
        name: data.anime_name,
        id: data2.id,
    });*/

  let anime: AnimeDetails = new AnimeDetails(
    id,
    data.anime_name,
    data.anime_type,
    data.anime_cover_image_full_url ?? data.anime_cover_image_url,
    data.anime_description,
    data.anime_genres,
    data.anime_release_year,
    data.anime_rating,
      data?.more_info_result?.source ?? "Unknown",
      data?.more_info_result?.scored_by ?? data.anime_rating_user_count,
      data?.more_info_result?.trailer_url ?? data.anime_trailer_url,
      data.episodes.count,
      data?.more_info_result?.duration ?? "00:00"
  );
  anime.bannerUrl =
    data3 && data3.length > 0
      ? data3[data3.length - 1]?.imageLink
      : data.anime_banner_image_url ??
        data.anime_cover_image_full_url ??
        data.anime_cover_image_url;

  anime.relations = [];

  if (data.related_animes && isIterable(data.related_animes.data))
    for (let an of data.related_animes.data) {
      anime.relations.push(
        new Relation(
          an.related_anime_id,
          an.anime_name,
          an.anime_rating,
          an.anime_cover_image_url
        )
      );
    }

  return anime;
}

interface SearchParams {
  anime_name?: string;
  anime_type?: string;
  anime_release_years?: string;
  anime_season?: string;
  anime_genre_ids?: string;
}

export async function search(
  offset: number = 0,
  limit: number = 18,
  searchParams: SearchParams | object
) {
  let data = await getAnimeList("filter", limit, offset, searchParams);
  if (data.status !== 200)
    data = await getAnimeList("filter", limit, offset, searchParams);
  if (data.status !== 200) return null;

  let animes: SearchResult[] = [];
  if (data && isIterable(data.data))
    for (let an of data.data) {
      animes.push(
        new SearchResult(
          an.anime_id,
          an.anime_name,
          an.anime_type,
          an.anime_status,
          an.anime_release_year,
          an.anime_genres,
          an.anime_rating ?? 0.0,
          an.anime_cover_image_url
        )
      );
    }

  return animes;
}

export async function getStreamingLinks(
  animeId,
  episodeId
): Promise<StreamingLink[]> {
  return await getWatchLinks(animeId, episodeId);
}

export async function getEpisodes(id: number, animeName: string) : Promise<any> {
  let episodes = await getEpisodesList(id);
  let videos = await getVideos(animeName)

  let eps = [];

  if (episodes && isIterable(episodes.data))
    for (let ep of episodes.data) {
      let isFiller = ep.episode_name.includes("فلر");
      let number = ep.episode_name
          .replaceAll("الحلقة : ", "")
          .replace(" - فلر", "");
      let ep_ = videos?.episodes?.find((ep: any) => ep.episodeNumber === number);
      if (ep_) {
        eps.push(
            new EpisodeDetails(
                ep.episode_id,
                ["", ""],
                ep_.thumbnail,
                number,
                isFiller
            )
        );
      } else {
        eps.push(
            new EpisodeDetails(
                ep.episode_id,
                ["", ""],
                null,
                number,
                isFiller
            )
        );
      }
    }

  return eps
}

function isIterable(obj: any): boolean {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}