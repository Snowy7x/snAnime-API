import axios from "axios";

const published_url =
  "https://anslayer.com/anime/public/animes/get-published-animes";

const details_url = "https://anslayer.com/anime/public/anime/get-anime-details";

const headers = {
  "Client-Id": "android-app2",
  "Client-Secret": "7befba6263cc14c90d2f1d6da2c5cf9b251bfbbd",
};

/**
 * @param {"latest_episodes" | "custom_list" | "anime_list" | "currently_airing" | "latest_updated_episode" | "latest_updated_episode_new" | "top_anime" | "top_currently_airing" | "top_tv" | "top_movie" | "featured" | "filter" | "favorites" | "watching" | "plan_to_watch" | "watched" | "dropped" | "on_hold" | "watched_history" | "schedule" | "last_added_tv" | "last_added_movie" | "top_anime_mal" | "top_currently_airing_mal" | "top_tv_mal" | "top_movie_mal" | "anime_characters" | "top_upcoming" | "top_upcoming_catalog"} list_type
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise}
 */

async function getAnimeList(list_type: string, limit = 10, offset = 0) {
  return await axios({
    method: "GET",
    url: published_url,
    headers: headers,
    params: {
      json: JSON.stringify({
        list_type: list_type,
        _limit: limit,
        _offset: offset,
      }),
    },
  })
    .then((res) => {
      res.data = res.data.response.data;
      return res;
    })
    .catch((err) => err);
}

/**
 *
 * @param {number} animeId
 * @returns {Promise}
 */
async function getAnime(animeId: number): Promise<any> {
  return await axios({
    method: "GET",
    url: details_url,
    headers: headers,
    params: {
      anime_id: animeId,
      fetch_episodes: "No",
      more_info: "No",
    },
  })
    .then((res: any) => {
      res.data = res.data.response;
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
}

export { getAnimeList, getAnime };
