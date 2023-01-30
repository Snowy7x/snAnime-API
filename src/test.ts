//import { getAnimeByName } from "./sources/anilist";
//import { getAnimeList, getAnime } from "./sources/animeslayer";
import { getPictures } from "mal-scraper";
import { getAnimeByName } from "./sources/mal";

//getAnimeByName("Naruto").then((re: any) => console.log(re.coverImage.large));
//getAnimeList("latest_episodes", 18, 0).then((re) => console.log(re.data));
//getAnime(2024).then((re : any) => console.log(re));
//getAnimeByName("Naruto");
getPictures({
  id: 49387,
  name: "Vinland Saga Season 2",
}).then((re: any) => console.log(re));
