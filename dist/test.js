"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { getAnimeByName } from "./sources/anilist";
//import { getAnimeList, getAnime } from "./sources/animeslayer";
const mal_scraper_1 = require("mal-scraper");
//getAnimeByName("Naruto").then((re: any) => console.log(re.coverImage.large));
//getAnimeList("latest_episodes", 18, 0).then((re) => console.log(re.data));
//getAnime(2024).then((re : any) => console.log(re));
//getAnimeByName("Naruto");
(0, mal_scraper_1.getPictures)({
    id: 49387,
    name: "Vinland Saga Season 2",
}).then((re) => console.log(re));
