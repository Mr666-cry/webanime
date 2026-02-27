import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import type { Anime } from '@/types/anime';

interface AnimeCardProps {
  anime: Anime;
  showEpisode?: boolean;
  showRating?: boolean;
}

export const AnimeCard = ({ anime, showEpisode = true, showRating = true }: AnimeCardProps) => {
  const animeId = anime.animeId || anime.href?.split('/').pop() || '';
  
  return (
    <Link 
      to={`/anime/${animeId}`}
      className="anime-card group block relative rounded-lg overflow-hidden bg-card"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>
        
        {/* Episode badge */}
        {showEpisode && anime.episodes && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
            Ep {anime.episodes}
          </div>
        )}
        
        {/* Rating badge */}
        {showRating && anime.score && (
          <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3" fill="currentColor" />
            {anime.score}
          </div>
        )}
        
        {/* Type badge */}
        {anime.type && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
            {anime.type}
          </div>
        )}
      </div>
      
      {/* Title */}
      <div className="p-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-blue-400 transition-colors">
          {anime.title}
        </h3>
        {anime.releasedOn && (
          <p className="text-xs text-muted-foreground mt-1">{anime.releasedOn}</p>
        )}
      </div>
    </Link>
  );
};
