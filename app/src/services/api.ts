import axios from 'axios';
import type { Anime, AnimeDetail, EpisodeDetail, Genre, ScheduleDay, HomeData } from '@/types/anime';

// Use local API proxy in production, direct API in development
const BASE_URL = import.meta.env.PROD 
  ? '/api' 
  : 'https://www.sankavollerei.com/anime';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
  },
  timeout: 30000,
});

export const animeApi = {
  // Home
  getHome: async (): Promise<HomeData> => {
    const response = await api.get('/samehadaku/home');
    return response.data.data;
  },

  // Recent/Latest
  getRecent: async (page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/recent?page=${page}`);
    return response.data.data;
  },

  // Popular
  getPopular: async (page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/popular?page=${page}`);
    return response.data.data;
  },

  // Ongoing
  getOngoing: async (page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/ongoing?page=${page}`);
    return response.data.data;
  },

  // Completed
  getCompleted: async (page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/completed?page=${page}`);
    return response.data.data;
  },

  // Movies
  getMovies: async (page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/movies?page=${page}`);
    return response.data.data;
  },

  // Search
  search: async (query: string, page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/search?q=${encodeURIComponent(query)}&page=${page}`);
    return response.data.data;
  },

  // Detail
  getDetail: async (animeId: string): Promise<AnimeDetail> => {
    const response = await api.get(`/samehadaku/anime/${animeId}`);
    return response.data.data;
  },

  // Episode
  getEpisode: async (episodeId: string): Promise<EpisodeDetail> => {
    const response = await api.get(`/samehadaku/episode/${episodeId}`);
    return response.data.data;
  },

  // Genres
  getGenres: async (): Promise<{ genreList: Genre[] }> => {
    const response = await api.get('/samehadaku/genres');
    return response.data.data;
  },

  // Anime by Genre
  getAnimeByGenre: async (genreId: string, page: number = 1): Promise<{ animeList: Anime[] }> => {
    const response = await api.get(`/samehadaku/genres/${genreId}?page=${page}`);
    return response.data.data;
  },

  // Schedule
  getSchedule: async (): Promise<{ days: ScheduleDay[] }> => {
    const response = await api.get('/samehadaku/schedule');
    return response.data.data;
  },
};

export default api;
