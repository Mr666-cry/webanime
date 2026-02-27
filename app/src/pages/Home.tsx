import { useState, useEffect } from 'react';
import { Banner } from '@/components/Banner';
import { AnimeSection } from '@/components/AnimeSection';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { animeApi } from '@/services/api';
import type { HomeData } from '@/types/anime';

export const Home = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const data = await animeApi.getHome();
        setHomeData(data);
      } catch (err) {
        setError('Failed to load home data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  if (loading) {
    return <LoadingSkeleton />;
  }
  
  if (error || !homeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <p className="text-muted-foreground text-center">{error || 'No data available'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Banner Slider */}
      <div className="px-4 pt-4">
        <Banner animeList={homeData.recent.animeList.slice(0, 5)} />
      </div>
      
      {/* Latest Episodes */}
      <AnimeSection
        title="Episode Terbaru"
        animeList={homeData.recent.animeList}
        viewMoreLink="/recent"
        showEpisode={true}
        showRating={false}
      />
      
      {/* Popular Anime */}
      <AnimeSection
        title="Anime Populer"
        animeList={homeData.top10.animeList}
        viewMoreLink="/popular"
        showEpisode={false}
        showRating={true}
      />
      
      {/* Movies */}
      <AnimeSection
        title="Anime Movie"
        animeList={homeData.movie.animeList}
        viewMoreLink="/movies"
        showEpisode={false}
        showRating={true}
      />
      
      {/* Batch */}
      <AnimeSection
        title="Batch Anime"
        animeList={homeData.batch.animeList}
        viewMoreLink="/batch"
        showEpisode={false}
        showRating={true}
      />
    </div>
  );
};
