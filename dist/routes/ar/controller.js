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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnimeById = exports.getLatest = exports.getTopAiring = void 0;
const animeslayer_1 = require("../../sources/animeslayer");
const interfaces_1 = require("../interfaces");
function getTopAiring(offset = 0, limit = 18) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, animeslayer_1.getAnimeList)("top_currently_airing_mal", limit, offset);
        if (data.status !== 200)
            data = yield (0, animeslayer_1.getAnimeList)("top_currently_airing_mal", 18, 0);
        if (data.status !== 200)
            return null;
        let animes = [];
        let number = 1;
        for (let an of data.data) {
            animes.push(new interfaces_1.TopAnime(an.anime_id, number, an.anime_name, an.anime_type, an.anime_status, an.anime_release_year, an.anime_genres, an.anime_cover_image_url));
            number++;
        }
        return animes;
    });
}
exports.getTopAiring = getTopAiring;
function getLatest(offset = 0, limit = 18) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, animeslayer_1.getAnimeList)("latest_episodes", limit, offset);
        if (data.status !== 200)
            data = yield (0, animeslayer_1.getAnimeList)("latest_episodes", 18, 0);
        if (data.status !== 200)
            return null;
        let animes = [];
        for (let an of data.data) {
            animes.push(new interfaces_1.LatestEpisode(an.anime_id, an.anime_name, an.anime_type, an.anime_rating, an.anime_cover_image_url, an.latest_episode_id, an.latest_episode_name.replace("الحلقة : ", "")));
        }
        return animes;
    });
}
exports.getLatest = getLatest;
function getAnimeById(id) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching Anime Slayer...");
        let data = yield (0, animeslayer_1.getAnime)(id);
        console.log("Done with anime slayer 1");
        if (!data.hasOwnProperty("anime_name"))
            data = yield getAnimeById(id);
        if (!data.hasOwnProperty("anime_name"))
            return null;
        console.log(data);
        console.log("Fetching the mal videos...");
        let data2 = null; //await getVideos(data.anime_name);
        console.log("Fetching the mal pictures...");
        let data3 = null; /*await getPictures({
            name: data.anime_name,
            id: data2.id,
        });*/
        console.log("Preparing Data");
        let anime = new interfaces_1.AnimeDetails(id, data.anime_name, (_a = data.anime_cover_image_full_url) !== null && _a !== void 0 ? _a : data.anime_cover_image_url, data.anime_description, data.anime_genres, data.anime_release_year, data.anime_rating);
        anime.bannerUrl =
            data3 && data3.length > 0
                ? (_b = data3[data3.length - 1]) === null || _b === void 0 ? void 0 : _b.imageLink
                : (_d = (_c = data.anime_banner_image_url) !== null && _c !== void 0 ? _c : data.anime_cover_image_full_url) !== null && _d !== void 0 ? _d : data.anime_cover_image_url;
        const episodes = [];
        for (let ep of data.episodes.data) {
            let isFiller = ep.episode_name.includes("فلر");
            let number = ep.episode_name
                .replaceAll("الحلقة : ", "")
                .replace(" - فلر", "");
            let ep_ = (_e = data2 === null || data2 === void 0 ? void 0 : data2.episodes) === null || _e === void 0 ? void 0 : _e.find((ep) => ep.episodeNumber === number);
            if (ep_) {
                episodes.push(new interfaces_1.EpisodeDetails(["", ""], ep_.thumbnail, number));
            }
            else {
                episodes.push(new interfaces_1.EpisodeDetails(["", ""], anime.bannerUrl, number));
            }
        }
        anime.episodes = episodes;
        return anime;
    });
}
exports.getAnimeById = getAnimeById;
