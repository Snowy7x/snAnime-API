"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingLink = exports.EpisodeDetails = exports.Relation = exports.AnimeDetails = exports.LatestEpisode = exports.SearchResult = exports.TopAnime = void 0;
class TopAnime {
    constructor(id, number = 0, name, type, status, releaseYear, genres, rate, coverUrl) {
        this.id = id;
        this.number = number;
        this.name = name;
        this.type = type;
        this.status = status;
        this.releaseYear = releaseYear;
        this.genres = genres;
        this.rate = rate;
        this.coverUrl = coverUrl;
    }
}
exports.TopAnime = TopAnime;
class SearchResult {
    constructor(id, name, type, status, releaseYear, genres, rate, coverUrl) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.releaseYear = releaseYear;
        this.genres = genres;
        this.rate = rate;
        this.coverUrl = coverUrl;
    }
}
exports.SearchResult = SearchResult;
class LatestEpisode {
    constructor(id, name, type, rate, coverUrl, episodeId, episodeNumber) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.rate = rate;
        this.coverUrl = coverUrl;
        this.episodeId = episodeId;
        this.episodeNumber = episodeNumber;
    }
}
exports.LatestEpisode = LatestEpisode;
class AnimeDetails {
    constructor(id, name, type, coverUrl, description, genres, releaseYear, rate, source, ratedBy, trailerUrl, episodesCount, episodeDuration) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.coverUrl = coverUrl;
        this.description = description;
        this.genres = genres;
        this.releaseYear = releaseYear;
        this.rate = rate;
        this.source = source;
        this.ratedBy = ratedBy;
        this.trailerUrl = trailerUrl;
        this.episodesCount = episodesCount;
        this.episodeDuration = episodeDuration;
        this.bannerUrl = "";
        this.episodes = [];
        this.relations = [];
    }
}
exports.AnimeDetails = AnimeDetails;
class Relation {
    constructor(id, name, rate, coverUrl) {
        this.id = id;
        this.name = name;
        this.rate = rate;
        this.coverUrl = coverUrl;
    }
}
exports.Relation = Relation;
class EpisodeDetails {
    constructor(id, links, thumbnailUrl, episodeNumber, isFiller) {
        this.id = id;
        this.links = links;
        this.thumbnailUrl = thumbnailUrl;
        this.episodeNumber = episodeNumber;
        this.isFiller = isFiller;
    }
}
exports.EpisodeDetails = EpisodeDetails;
class StreamingLink {
    constructor(type, url, host, urls) {
        this.type = type;
        this.url = url;
        this.host = host;
        this.urls = urls;
    }
}
exports.StreamingLink = StreamingLink;
