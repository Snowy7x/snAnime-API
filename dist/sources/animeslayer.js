"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnime = exports.getAnimeList = void 0;
const axios_1 = __importDefault(require("axios"));
const anDecoder_1 = require("./helpers/anDecoder");
const published_url = "https://anslayer.com/anime/public/animes/get-published-animes";
const details_url = "https://anslayer.com/anime/public/anime/get-anime-details";
const headers = {
    "Client-Id": "android-app2",
    "Client-Secret": "7befba6263cc14c90d2f1d6da2c5cf9b251bfbbd",
};
/**
 * @param {"latest_episodes" | "custom_list" | "anime_list" | "currently_airing" | "latest_updated_episode" | "latest_updated_episode_new" | "top_anime" | "top_currently_airing" | "top_tv" | "top_movie" | "featured" | "filter" | "favorites" | "watching" | "plan_to_watch" | "watched" | "dropped" | "on_hold" | "watched_history" | "schedule" | "last_added_tv" | "last_added_movie" | "top_anime_mal" | "top_currently_airing_mal" | "top_tv_mal" | "top_movie_mal" | "anime_characters" | "top_upcoming" | "top_upcoming_catalog"} list_type
 * @param {number} limit
 * @param {number} offset
 * @param searchParams
 * @returns {Promise}
 */
function getAnimeList(list_type, limit = 10, offset = 0, searchParams = null) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "GET",
            url: published_url,
            headers: headers,
            params: {
                json: JSON.stringify(Object.assign({ list_type: list_type, _limit: limit, _offset: offset }, searchParams)),
            },
        })
            .then((res) => {
            res.data = res.data.response.data;
            return res;
        })
            .catch((err) => err);
    });
}
exports.getAnimeList = getAnimeList;
/**
 *
 * @param {number} animeId
 * @returns {Promise}
 */
function getAnime(animeId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
            method: "GET",
            url: details_url,
            headers: headers,
            params: {
                anime_id: animeId,
                fetch_episodes: "Yes",
                more_info: "Yes",
            },
        })
            .then((res) => {
            res.data = res.data.response;
            return res.data;
        })
            .catch((err) => {
            console.log(err.message);
            return null;
        });
    });
}
exports.getAnime = getAnime;
function getEpisode(animeId, episodeId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default
            .post("https://anslayer.com/anime/public/episodes/get-episodes-new", new URLSearchParams({
            inf: '{"a": "mrg+e9GTkHaj8WXD7Cz3+Wbc1E4xYrvHLqW1vRF8xSo2B4K7Y5B7wcjHaoL1haW8Ynp3gYuGBRWFY/XaoEzVRcM/g8pJtaAT3FgwZh+KajpmkenxL0V/ghBXTwctGtEQFUO/UAJVGx2QClCE6gKSTQ==", "b": "102.185.179.127"}',
            json: `{"anime_id":${animeId},"episode_id":"${episodeId}"}`,
        }), {
            headers: {
                "Client-Id": "android-app2",
                "Client-Secret": "7befba6263cc14c90d2f1d6da2c5cf9b251bfbbd",
                Accept: "application/json, application/*+json",
                Host: "anslayer.com",
                "User-Agent": "okhttp/3.12.12",
            },
        })
            .then(function (response) {
            return {
                code: 200,
                data: response.data.response.data[0],
            };
        })
            .catch(function (error) {
            console.log("ar/v2/episode [41] Error:", error.message);
            return {
                code: 400,
                data: error.message,
            };
        });
    });
}
function getWatchLinks(animeId, episodeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let episode = yield getEpisode(animeId, episodeId);
        if (episode.code !== 200) {
            return [];
        }
        let servers = [];
        const urls = episode.data.episode_urls;
        const normal_servers = yield axios_1.default
            .post("https://anslayer.com/la/public/api/fw", new URLSearchParams({
            n: urls[1].episode_url.replace("https://anslayer.com/la/public/api/f2?n=", ""),
            inf: '{"a": "mrg+e9GTkHaj8WXD7Cz3+Wbc1E4xYrvHLqW1vRF8xSo2B4K7Y5B7wcjHaoL1haW8Ynp3gYuGBRWFY/XaoEzVRcM/g8pJtaAT3FgwZh+KajpmkenxL0V/ghBXTwctGtEQFUO/UAJVGx2QClCE6gKSTQ==", "b": "102.185.179.127"}',
        }), {
            headers: {
                "User-Agent": "okhttp/3.12.12",
                Host: "anslayer.com",
            },
        })
            .then((re) => re.data);
        for (let s of normal_servers) {
            let c = yield axios_1.default.post(s).catch((err) => {
                return null;
            });
            if (c === null)
                continue;
            let i = anDecoder_1.Decoder.decode(s, c.data);
            if (i) {
                let json = JSON.parse(i);
                if (json.urls.length >= 1) {
                    servers.push(json);
                }
            }
        }
        return servers;
    });
}
