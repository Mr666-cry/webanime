import { useState, useEffect } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { AnimeCard } from '@/components/AnimeCard';
import { animeApi } from '@/services/api';
import type { Anime } from '@/types/anime';

export const Recent = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        const data = await animeApi.getRecent(page);
        
        if (page === 1) {
          setAnimeList(data.animeList);
        } else {
          setAnimeList(prev => [...prev, ...data.animeList]);
        }
        
        setHasMore(data.animeList.length >= 12);
      } catch (err) {
        console.error('Failed to fetch recent:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecent();
  }, [page]);
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          Episode Terbaru
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update episode anime terbaru
        </p>
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
                  showEpisode={true}
                  showRating={false}
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
              Tidak ada episode terbaru
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
