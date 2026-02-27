import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import type { Anime } from '@/types/anime';

interface AnimeSectionProps {
  title: string;
  animeList: Anime[];
  viewMoreLink?: string;
  showEpisode?: boolean;
  showRating?: boolean;
}

export const AnimeSection = ({ 
  title, 
  animeList, 
  viewMoreLink,
  showEpisode = true,
  showRating = true 
}: AnimeSectionProps) => {
  if (animeList.length === 0) return null;
  
  return (
    <section className="py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
        {viewMoreLink && (
          <Link
            to={viewMoreLink}
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 transition-colors"
          >
            Lainnya
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      
      {/* Anime Grid - Horizontal Scroll on Mobile */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
          {animeList.map((anime, index) => (
            <div key={`${anime.animeId}-${index}`} className="flex-shrink-0 w-32">
              <AnimeCard 
                anime={anime} 
                showEpisode={showEpisode}
                showRating={showRating}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Anime Grid - Desktop */}
      <div className="hidden md:block px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {animeList.map((anime, index) => (
            <AnimeCard 
              key={`${anime.animeId}-${index}`}
              anime={anime}
              showEpisode={showEpisode}
              showRating={showRating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
