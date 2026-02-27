export interface Anime {
  title: string;
  poster: string;
  episodes?: string;
  releasedOn?: string;
  animeId: string;
  href: string;
  samehadakuUrl?: string;
  type?: string;
  score?: string;
  status?: string;
  genreList?: Genre[];
  estimation?: string;
  genres?: string;
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl?: string;
}

export interface AnimeDetail {
  title: string;
  poster: string;
  score: string;
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: string;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  trailer: string;
  synopsis: string;
  genreList: Genre[];
  batchList: Batch[];
  episodeList: Episode[];
}

export interface Batch {
  title: string;
  batchId: string;
  href: string;
  samehadakuUrl: string;
}

export interface Episode {
  title: string;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
  releasedOn?: string;
}

export interface EpisodeDetail {
  title: string;
  animeId: string;
  poster: string;
  releasedOn: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: string;
  hasNextEpisode: boolean;
  nextEpisode: string;
  synopsis: string;
  genreList: Genre[];
  server: Server;
  downloadUrl: DownloadUrl[];
  recommendedEpisodeList: Anime[];
  movie: any;
}

export interface Server {
  qualities: Quality[];
}

export interface Quality {
  title: string;
  serverList: ServerList[];
}

export interface ServerList {
  title: string;
  href: string;
}

export interface DownloadUrl {
  title: string;
  url: string;
}

export interface ScheduleDay {
  day: string;
  animeList: Anime[];
}

export interface HomeData {
  recent: {
    href: string;
    samehadakuUrl: string;
    animeList: Anime[];
  };
  batch: {
    href: string;
    samehadakuUrl: string;
    animeList: Anime[];
  };
  movie: {
    href: string;
    samehadakuUrl: string;
    animeList: Anime[];
  };
  top10: {
    href: string;
    samehadakuUrl: string;
    animeList: Anime[];
  };
}

export interface Bookmark {
  animeId: string;
  title: string;
  poster: string;
  status: string;
  type: string;
  score: string;
  addedAt: number;
}
