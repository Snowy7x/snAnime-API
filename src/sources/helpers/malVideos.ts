import axios from "axios";
import cheerio, { CheerioAPI } from "cheerio";
import { getResultsFromSearch } from "mal-scraper";
import { matchSorter } from "match-sorter";

const BASE_URI = "https://myanimelist.net/anime/";

interface VideoInt { thumbnail: string, episodeNumber: string }

const parsePage = ($: CheerioAPI, id: any = null) => {
  const items = $("#content .video-block .video-list-outer");
  const result = {
    id,
    episodes: <VideoInt[]>[],
  };

  items.each(function () {
    result.episodes.push({
      thumbnail: $(this).find("img").attr("data-src"),
      episodeNumber: $(this)
        .find(".info-container")
        .text()
        .replace($(this).find(".episode-title").text(), "")
        .replace("Episode ", ""),
    });
  });

  return result;
};

const searchPage = (url: string, id: any = null) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const res = parsePage($, id);
        resolve(res);
      })
      .catch(/* istanbul ignore next */ (err) => reject(err));
  });
};

const getVideosFromName = (name: string) => {
  return new Promise((resolve, reject) => {
    getResultsFromSearch(name)
      .then((items) => {
        const bestMatch = matchSorter(items, name, { keys: ["name"] });
        const itemMatch =
          bestMatch && bestMatch.length ? bestMatch[0] : items[0];
        const { url } = itemMatch;

        searchPage(`${encodeURI(url)}/video`, itemMatch.id)
          .then((data) => resolve(data))
          .catch(/* istanbul ignore next */ (err) => reject(err));
      })
      .catch(/* istanbul ignore next */ (err) => reject(err));
  });
};

const getVideosFromNameAndId = (id: any, name: string) => {
  return new Promise((resolve, reject) => {
    searchPage(`${BASE_URI}${id}/${encodeURI(name)}/video`)
      .then((data) => resolve(data))
      .catch(/* istanbul ignore next */ (err) => reject(err));
  });
};

const getVideos = (obj: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!obj) {
      reject(new Error("[Mal-Scraper]: No id nor name received."));
      return;
    }

    if (typeof obj === "object" && !obj[0]) {
      const { id, name } = obj;

      if (!id || !name || isNaN(+id) || typeof name !== "string") {
        reject(
          new Error(
            "[Mal-Scraper]: Malformed input. ID or name is malformed or missing."
          )
        );
        return;
      }

      getVideosFromNameAndId(id, name)
        .then((data) => resolve(data))
        .catch(/* istanbul ignore next */ (err) => reject(err));
    } else {
      getVideosFromName(obj)
        .then((data) => resolve(data))
        .catch(/* istanbul ignore next */ (err) => reject(err));
    }
  });
};

export default getVideos;
