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
exports.getEpisodes = exports.getStreamingLinks = exports.search = exports.getAnimeById = exports.getLatest = exports.getTopAiring = void 0;
const animeslayer_1 = require("../../sources/animeslayer");
const malVideos_1 = __importDefault(require("../../sources/helpers/malVideos"));
const interfaces_1 = require("../interfaces");
function getTopAiring(offset = 0, limit = 18) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, animeslayer_1.getAnimeList)("top_currently_airing", limit, offset);
        if (data.status !== 200)
            data = yield (0, animeslayer_1.getAnimeList)("top_currently_airing", limit, offset);
        if (data.status !== 200)
            return null;
        let animes = [];
        let number = 1;
        for (let an of data.data) {
            animes.push(new interfaces_1.TopAnime(an.anime_id, number, an.anime_name, an.anime_type, an.anime_status, an.anime_release_year, an.anime_genres, an.anime_rating, an.anime_cover_image_url));
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
            animes.push(new interfaces_1.LatestEpisode(an.anime_id, an.anime_name, an.anime_type, an.anime_rating, an.anime_cover_image_url, an.latest_episode_id, an.latest_episode_name.replace("???????????? : ", "")));
        }
        return animes;
    });
}
exports.getLatest = getLatest;
function getAnimeById(id) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, animeslayer_1.getAnime)(id);
        if (!data || !data.hasOwnProperty("anime_name"))
            data = yield getAnimeById(id);
        if (!data || !data.hasOwnProperty("anime_name"))
            return null;
        let data2 = null; //await getVideos(data.anime_name);
        let data3 = null; /*await getPictures({
              name: data.anime_name,
              id: data2.id,
          });*/
        let anime = new interfaces_1.AnimeDetails(id, data.anime_name, data.anime_type, (_a = data.anime_cover_image_full_url) !== null && _a !== void 0 ? _a : data.anime_cover_image_url, data.anime_description, data.anime_genres, data.anime_release_year, data.anime_rating, (_c = (_b = data === null || data === void 0 ? void 0 : data.more_info_result) === null || _b === void 0 ? void 0 : _b.source) !== null && _c !== void 0 ? _c : "Unknown", (_e = (_d = data === null || data === void 0 ? void 0 : data.more_info_result) === null || _d === void 0 ? void 0 : _d.scored_by) !== null && _e !== void 0 ? _e : data.anime_rating_user_count, (_g = (_f = data === null || data === void 0 ? void 0 : data.more_info_result) === null || _f === void 0 ? void 0 : _f.trailer_url) !== null && _g !== void 0 ? _g : data.anime_trailer_url, data.episodes.count, (_j = (_h = data === null || data === void 0 ? void 0 : data.more_info_result) === null || _h === void 0 ? void 0 : _h.duration) !== null && _j !== void 0 ? _j : "00:00");
        anime.bannerUrl =
            data3 && data3.length > 0
                ? (_k = data3[data3.length - 1]) === null || _k === void 0 ? void 0 : _k.imageLink
                : (_m = (_l = data.anime_banner_image_url) !== null && _l !== void 0 ? _l : data.anime_cover_image_full_url) !== null && _m !== void 0 ? _m : data.anime_cover_image_url;
        anime.relations = [];
        if (data.related_animes && isIterable(data.related_animes.data))
            for (let an of data.related_animes.data) {
                anime.relations.push(new interfaces_1.Relation(an.related_anime_id, an.anime_name, an.anime_rating, an.anime_cover_image_url));
            }
        return anime;
    });
}
exports.getAnimeById = getAnimeById;
function search(offset = 0, limit = 18, searchParams) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, animeslayer_1.getAnimeList)("filter", limit, offset, searchParams);
        if (data.status !== 200)
            data = yield (0, animeslayer_1.getAnimeList)("filter", limit, offset, searchParams);
        if (data.status !== 200)
            return null;
        let animes = [];
        if (data && isIterable(data.data))
            for (let an of data.data) {
                animes.push(new interfaces_1.SearchResult(an.anime_id, an.anime_name, an.anime_type, an.anime_status, an.anime_release_year, an.anime_genres, (_a = an.anime_rating) !== null && _a !== void 0 ? _a : 0.0, an.anime_cover_image_url));
            }
        return animes;
    });
}
exports.search = search;
function getStreamingLinks(animeId, episodeId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, animeslayer_1.getWatchLinks)(animeId, episodeId);
    });
}
exports.getStreamingLinks = getStreamingLinks;
function getEpisodes(id, animeName) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let episodes = yield (0, animeslayer_1.getEpisodesList)(id);
        let videos = yield (0, malVideos_1.default)(animeName);
        let eps = [];
        if (episodes && isIterable(episodes.data))
            for (let ep of episodes.data) {
                let isFiller = ep.episode_name.includes("??????");
                let number = ep.episode_name
                    .replaceAll("???????????? : ", "")
                    .replace(" - ??????", "");
                let ep_ = (_a = videos === null || videos === void 0 ? void 0 : videos.episodes) === null || _a === void 0 ? void 0 : _a.find((ep) => ep.episodeNumber === number);
                if (ep_) {
                    eps.push(new interfaces_1.EpisodeDetails(ep.episode_id, ["", ""], ep_.thumbnail, number, isFiller));
                }
                else {
                    eps.push(new interfaces_1.EpisodeDetails(ep.episode_id, ["", ""], null, number, isFiller));
                }
            }
        return eps;
    });
}
exports.getEpisodes = getEpisodes;
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === "function";
}
