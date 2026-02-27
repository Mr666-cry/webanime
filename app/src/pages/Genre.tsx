import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { AnimeCard } from '@/components/AnimeCard';
import { animeApi } from '@/services/api';
import type { Anime, Genre as GenreType } from '@/types/anime';

export const Genre = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Fetch all genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await animeApi.getGenres();
        setGenres(data.genreList);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };
    
    fetchGenres();
  }, []);
  
  // Fetch anime by genre
  useEffect(() => {
    const fetchAnimeByGenre = async () => {
      if (!genreId) return;
      
      try {
        setLoading(true);
        const data = await animeApi.getAnimeByGenre(genreId, page);
        setAnimeList(data.animeList);
        setHasMore(data.animeList.length >= 12);
      } catch (err) {
        console.error('Failed to fetch anime by genre:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimeByGenre();
  }, [genreId, page]);
  
  const currentGenre = genres.find(g => g.genreId === genreId);
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <Link
          to="/anime"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg md:text-xl font-bold">
          {currentGenre ? currentGenre.title : 'Semua Genre'}
        </h1>
      </div>
      
      {/* Genre List */}
      <div className="px-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/anime"
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !genreId
                ? 'bg-blue-500 text-white'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Semua
          </Link>
          {genres.map((genre) => (
            <Link
              key={genre.genreId}
              to={`/genre/${genre.genreId}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                genreId === genre.genreId
                  ? 'bg-blue-500 text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {genre.title}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Anime Grid */}
      <div className="px-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        ) : animeList.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {animeList.map((anime, index) => (
                <AnimeCard 
                  key={`${anime.animeId}-${index}`}
                  anime={anime}
                  showEpisode={false}
                  showRating={true}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Muat Lebih Banyak
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              Tidak ada anime dalam genre ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
