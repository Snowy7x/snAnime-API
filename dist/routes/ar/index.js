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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
let router = express_1.default.Router();
exports.router = router;
router.get("/latest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit } = req.query;
    const latest = yield (0, controller_1.getLatest)(offset ? parseInt(offset.toString()) : undefined, limit ? parseInt(limit.toString()) : undefined);
    if (latest == null)
        return res.sendStatus(422);
    return res.send(latest);
}));
router.get("/anime", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (id === undefined)
        return res.status(422).send("Missing one/all argument/s {id}");
    const anime = yield (0, controller_1.getAnimeById)(parseInt(id.toString()));
    if (anime === null)
        return res.sendStatus(422);
    res.send(anime);
}));
router.get("/top", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit } = req.query;
    const animes = yield (0, controller_1.getTopAiring)(offset ? parseInt(offset.toString()) : undefined, limit ? parseInt(limit.toString()) : undefined);
    if (animes === null)
        return res.sendStatus(422);
    return res.send(animes);
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { offset, limit, animeName, season, type, genre, years } = req.query;
    console.log(offset, limit);
    const animes = yield (0, controller_1.search)(offset ? parseInt(offset.toString()) : undefined, limit ? parseInt(limit.toString()) : undefined, {
        anime_name: animeName,
        anime_season: season,
        anime_type: type,
        anime_genre_ids: genre,
        anime_release_years: years
    });
    if (animes === null)
        return res.sendStatus(422);
    return res.send(animes);
}));
