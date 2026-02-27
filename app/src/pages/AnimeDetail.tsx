import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, Calendar, Film, Clock, Building, 
  Heart, Play, ChevronLeft, Check
} from 'lucide-react';
import { animeApi } from '@/services/api';
import { useBookmarks } from '@/hooks/useBookmarks';
import { DetailSkeleton } from '@/components/LoadingSkeleton';
import type { AnimeDetail as AnimeDetailType } from '@/types/anime';

export const AnimeDetail = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const [anime, setAnime] = useState<AnimeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  useEffect(() => {
    const fetchDetail = async () => {
      if (!animeId) return;
      
      try {
        setLoading(true);
        const data = await animeApi.getDetail(animeId);
        setAnime(data);
      } catch (err) {
        setError('Failed to load anime details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetail();
  }, [animeId]);
  
  const handleBookmark = () => {
    if (anime && animeId) {
      toggleBookmark({
        animeId,
        title: anime.title,
        poster: anime.poster,
        status: anime.status,
        type: anime.type,
        score: anime.score,
      });
    }
  };
  
  if (loading) {
    return <DetailSkeleton />;
  }
  
  if (error || !anime) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <p className="text-muted-foreground text-center">{error || 'Anime not found'}</p>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Kembali ke Home
        </Link>
      </div>
    );
  }
  
  const bookmarked = animeId ? isBookmarked(animeId) : false;
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Back Button */}
      <div className="px-4 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-64 md:h-80">
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative px-4 pt-32 md:pt-48">
          <div className="flex gap-4 md:gap-6">
            {/* Poster */}
            <div className="flex-shrink-0 w-32 md:w-48">
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2 line-clamp-2">
                {anime.title}
              </h1>
              
              {/* Japanese Title */}
              {anime.japanese && (
                <p className="text-sm text-muted-foreground mb-3">{anime.japanese}</p>
              )}
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {anime.score && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                    <Star className="w-3 h-3" fill="currentColor" />
                    {anime.score}
                  </span>
                )}
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  anime.status === 'Ongoing' 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {anime.status}
                </span>
                {anime.type && (
                  <span className="bg-secondary text-foreground text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                    <Film className="w-3 h-3" />
                    {anime.type}
                  </span>
                )}
              </div>
              
              {/* Meta Info */}
              <div className="space-y-1 text-sm text-muted-foreground">
                {anime.episodes && (
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {anime.episodes} Episode
                  </p>
                )}
                {anime.studios && (
                  <p className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {anime.studios}
                  </p>
                )}
                {anime.aired && (
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {anime.aired}
                  </p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                {anime.episodeList.length > 0 && (
                  <Link
                    to={`/episode/${anime.episodeList[anime.episodeList.length - 1].episodeId}`}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" fill="white" />
                    Tonton
                  </Link>
                )}
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors ${
                    bookmarked
                      ? 'bg-pink-500/20 text-pink-500'
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  {bookmarked ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Tersimpan</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      <span className="hidden sm:inline">Simpan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details */}
      <div className="px-4 py-6">
        {/* Synopsis */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Sinopsis</h2>
          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
            {anime.synopsis || 'Tidak ada sinopsis tersedia.'}
          </p>
        </section>
        
        {/* Genres */}
        {anime.genreList.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Genre</h2>
            <div className="flex flex-wrap gap-2">
              {anime.genreList.map((genre) => (
                <Link
                  key={genre.genreId}
                  to={`/genre/${genre.genreId}`}
                  className="bg-secondary hover:bg-secondary/80 text-foreground text-sm px-3 py-1 rounded-full transition-colors"
                >
                  {genre.title}
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Info Grid */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Informasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {anime.source && (
              <div>
                <p className="text-muted-foreground">Sumber</p>
                <p className="font-medium">{anime.source}</p>
              </div>
            )}
            {anime.duration && (
              <div>
                <p className="text-muted-foreground">Durasi</p>
                <p className="font-medium">{anime.duration}</p>
              </div>
            )}
            {anime.season && (
              <div>
                <p className="text-muted-foreground">Musim</p>
                <p className="font-medium">{anime.season}</p>
              </div>
            )}
            {anime.producers && (
              <div>
                <p className="text-muted-foreground">Produser</p>
                <p className="font-medium">{anime.producers}</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Episodes */}
        {anime.episodeList.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3">Daftar Episode</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[...anime.episodeList].reverse().map((episode, index) => (
                <Link
                  key={episode.episodeId}
                  to={`/episode/${episode.episodeId}`}
                  className="episode-item flex items-center justify-between p-3 rounded-lg bg-card hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm font-medium">
                      {anime.episodeList.length - index}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{episode.title}</p>
                      {episode.releasedOn && (
                        <p className="text-xs text-muted-foreground">{episode.releasedOn}</p>
                      )}
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Batch List */}
        {anime.batchList.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-bold mb-3">Batch</h2>
            <div className="space-y-2">
              {anime.batchList.map((batch) => (
                <div
                  key={batch.batchId}
                  className="p-3 rounded-lg bg-card"
                >
                  <p className="font-medium text-sm">{batch.title}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
