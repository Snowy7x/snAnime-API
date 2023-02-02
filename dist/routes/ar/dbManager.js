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
exports.getAnime = void 0;
const db_1 = require("../../db");
const controller_1 = require("./controller");
function getAnime(id) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.Anime.findOne({ id: id }, (err, docs) => {
            if (err) {
                console.error(err);
            }
            else {
                if (docs === null) {
                    (0, controller_1.getAnimeById)(id).then((anime) => {
                        addAnime(anime);
                    });
                }
                else {
                    console.log("Anime: " + JSON.stringify(docs));
                    return docs;
                }
            }
        });
    });
}
exports.getAnime = getAnime;
function addAnime(anime) {
    if (anime === null)
        return;
    db_1.Anime.create({
        id: anime.id,
        name: anime.name,
        description: anime.description,
        episodes: anime.episodes.length,
        genre: anime.genres,
        episodesIds: anime.id,
    });
}
