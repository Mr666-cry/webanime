import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Grid3X3, ChevronDown } from 'lucide-react';
import { AnimeCard } from '@/components/AnimeCard';
import { animeApi } from '@/services/api';
import type { Anime } from '@/types/anime';

const CATEGORIES = [
  { id: 'ongoing', label: 'Sedang Tayang' },
  { id: 'completed', label: 'Tamat' },
  { id: 'popular', label: 'Populer' },
  { id: 'movies', label: 'Movie' },
];

export const AnimeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'ongoing';
  
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        let data;
        
        switch (category) {
          case 'ongoing':
            data = await animeApi.getOngoing(page);
            break;
          case 'completed':
            data = await animeApi.getCompleted(page);
            break;
          case 'popular':
            data = await animeApi.getPopular(page);
            break;
          case 'movies':
            data = await animeApi.getMovies(page);
            break;
          default:
            data = await animeApi.getOngoing(page);
        }
        
        if (page === 1) {
          setAnimeList(data.animeList);
        } else {
          setAnimeList(prev => [...prev, ...data.animeList]);
        }
        
        setHasMore(data.animeList.length >= 12);
      } catch (err) {
        console.error('Failed to fetch anime:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnime();
  }, [category, page]);
  
  const handleCategoryChange = (newCategory: string) => {
    setSearchParams({ category: newCategory });
    setPage(1);
  };
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Grid3X3 className="w-6 h-6 text-blue-500" />
          Daftar Anime
        </h1>
      </div>
      
      {/* Category Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Genre Quick Links */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Genre:</span>
          {['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance'].map((genre) => (
            <Link
              key={genre}
              to={`/genre/${genre.toLowerCase()}`}
              className="px-3 py-1 rounded-full text-xs bg-secondary text-foreground hover:bg-secondary/80 transition-colors whitespace-nowrap"
            >
              {genre}
            </Link>
          ))}
          <Link
            to="/genre/action"
            className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors whitespace-nowrap"
          >
            Lainnya
          </Link>
        </div>
      </div>
      
      {/* Anime Grid */}
      <div className="px-4">
        {loading && page === 1 ? (
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
                  showEpisode={category === 'ongoing'}
                  showRating={true}
                />
              ))}
            </div>
            
            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-colors"
                >
                  {loading ? (
                    'Loading...'
                  ) : (
                    <>
                      Muat Lebih Banyak
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              Tidak ada anime dalam kategori ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
