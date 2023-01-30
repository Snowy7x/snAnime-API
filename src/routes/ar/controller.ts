import {getPictures} from "mal-scraper";
import {getAnimeByName} from "../../sources/anilist";
import {getAnime, getAnimeList} from "../../sources/animeslayer";
import getVideos from "../../sources/helpers/malVideos";
import {
    AnimeDetails,
    EpisodeDetails,
    LatestEpisode,
    TopAnime,
} from "../interfaces";

export async function getTopAiring(
    offset: number = 0,
    limit: number = 18
): Promise<TopAnime[] | null> {
    let data = await getAnimeList("top_currently_airing_mal", limit, offset);
    if (data.status !== 200)
        data = await getAnimeList("top_currently_airing_mal", 18, 0);
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

export async function getAnimeById(id: number): Promise<AnimeDetails | null> {
    console.log("Fetching Anime Slayer...");
    let data = await getAnime(id);
    console.log("Done with anime slayer 1");
    if (!data.hasOwnProperty("anime_name")) data = await getAnimeById(id);
    if (!data.hasOwnProperty("anime_name")) return null;
    console.log(data)
    console.log("Fetching the mal videos...");
    let data2: any = null;//await getVideos(data.anime_name);
    console.log("Fetching the mal pictures...");
    let data3: any = null;/*await getPictures({
        name: data.anime_name,
        id: data2.id,
    });*/

    console.log("Preparing Data");

    let anime: AnimeDetails = new AnimeDetails(
        id,
        data.anime_name,
        data.anime_cover_image_full_url ?? data.anime_cover_image_url,
        data.anime_description,
        data.anime_genres,
        data.anime_release_year,
        data.anime_rating
    );
    anime.bannerUrl =
        data3 && data3.length > 0
            ? data3[data3.length - 1]?.imageLink
            : data.anime_banner_image_url ??
            data.anime_cover_image_full_url ??
            data.anime_cover_image_url;

    const episodes: EpisodeDetails[] = [];

    for (let ep of data.episodes.data) {
        let isFiller = ep.episode_name.includes("فلر");
        let number = ep.episode_name
            .replaceAll("الحلقة : ", "")
            .replace(" - فلر", "");
        let ep_ = data2?.episodes?.find((ep: any) => ep.episodeNumber === number);
        if (ep_) {
            episodes.push(new EpisodeDetails(["", ""], ep_.thumbnail, number));
        } else {
            episodes.push(new EpisodeDetails(["", ""], anime.bannerUrl, number));
        }
    }

    anime.episodes = episodes;
    return anime;
}
