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
 * @returns {Promise}
 */
function getAnimeList(list_type, limit = 10, offset = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, axios_1.default)({
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
