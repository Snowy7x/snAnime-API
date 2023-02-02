interface ISearchResult {
  id: number;
  name: string;
  type: string;
  status: string;
  releaseYear: number;
  genres: string;
  coverUrl: string;
  rate: string;
}

interface ITopAnime extends ISearchResult {
  number: number;
}

export class TopAnime implements ITopAnime {
  constructor(
    public id: number,
    public number: number = 0,
    public name: string,
    public type: string,
    public status: string,
    public releaseYear: number,
    public genres: string,
    public rate: string,
    public coverUrl: string
  ) {}
}

export class SearchResult implements ISearchResult {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public status: string,
    public releaseYear: number,
    public genres: string,
    public rate: string,
    public coverUrl: string
  ) {}
}

interface ILatestEpisode {
  id: number;
  name: string;
  type: string;
  rate: string;
  coverUrl: string;
  episodeId: number;
  episodeNumber: number;
}

export class LatestEpisode implements ILatestEpisode {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public rate: string,
    public coverUrl: string,
    public episodeId: number,
    public episodeNumber: number
  ) {}
}

interface IAnimeDetails {
  id: number | string;
  name: string;
  coverUrl: string;
  bannerUrl: string;
  description: string;
  genres: string;
  releaseYear: string;
  rate: string;
  episodes: EpisodeDetails[];
  relations: Relation[];
}

export class AnimeDetails implements IAnimeDetails {
  public bannerUrl: string = "";
  public episodes: EpisodeDetails[] = [];
  public relations: Relation[] = [];

  constructor(
    public id: number | string,
    public name: string,
    public coverUrl: string,
    public description: string,
    public genres: string,
    public releaseYear: string,
    public rate: string
  ) {}
}

interface IRelation {
  id: number;
  name: string;
  rate: string;
  coverUrl: string;
}

export class Relation implements IRelation {
  constructor(
    public id: number,
    public name: string,
    public rate: string,
    public coverUrl: string
  ) {}
}

interface IEpisodeDetails {
  links: string[];
  thumbnailUrl: string;
  episodeNumber: number;
  isFiller: boolean;
}

export class EpisodeDetails implements IEpisodeDetails {
  constructor(
    public id: number,
    public links: string[],
    public thumbnailUrl: string,
    public episodeNumber: number,
    public isFiller: boolean
  ) {}
}

type Link = {
  file: string;
  label: string;
};

export class StreamingLink {
  constructor(
    public type,
    public url: string,
    public host: string,
    public urls: Link[]
  ) {}
}
