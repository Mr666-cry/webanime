import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Film } from 'lucide-react';
import type { Anime } from '@/types/anime';

interface BannerProps {
  animeList: Anime[];
}

export const Banner = ({ animeList }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % animeList.length);
  }, [animeList.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
  }, [animeList.length]);
  
  // Auto slide
  useEffect(() => {
    if (animeList.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [animeList.length, nextSlide]);
  
  if (animeList.length === 0) return null;
  
  const currentAnime = animeList[currentIndex];
  const animeId = currentAnime.animeId || currentAnime.href?.split('/').pop() || '';
  
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl">
      {/* Background Image */}
      <img
        src={currentAnime.poster}
        alt={currentAnime.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 banner-gradient" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
        <div className="max-w-2xl">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3">
            {currentAnime.episodes && (
              <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                Ep {currentAnime.episodes}
              </span>
            )}
            {currentAnime.score && (
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" />
                {currentAnime.score}
              </span>
            )}
            {currentAnime.type && (
              <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                <Film className="w-3 h-3" />
                {currentAnime.type}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 line-clamp-2">
            {currentAnime.title}
          </h2>
          
          {/* Meta info */}
          <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
            {currentAnime.releasedOn && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentAnime.releasedOn}
              </span>
            )}
          </div>
          
          {/* Watch Button */}
          <Link
            to={`/anime/${animeId}`}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5" fill="white" />
            <span>Nonton Sekarang</span>
          </Link>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      {animeList.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {animeList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-6 bg-blue-500' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
