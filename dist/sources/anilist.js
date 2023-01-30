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
exports.getAnimeByName = void 0;
const anilist_node_1 = __importDefault(require("anilist-node"));
const Anilist = new anilist_node_1.default();
function getAnimeByName(animeName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Anilist.search("anime", animeName, 1, 1).then((re) => __awaiter(this, void 0, void 0, function* () {
                return yield Anilist.media.anime(re.media[0].id);
            }));
        }
        catch (err) {
            try {
                return yield Anilist.search("anime", animeName, 1, 1).then((re) => __awaiter(this, void 0, void 0, function* () {
                    return yield Anilist.media.anime(re.media[0].id);
                }));
            }
            catch (err) {
                return {};
            }
        }
    });
}
exports.getAnimeByName = getAnimeByName;
