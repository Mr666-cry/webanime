import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Play, Download, 
  Server, Maximize, Volume2
} from 'lucide-react';
import { animeApi } from '@/services/api';
import { DetailSkeleton } from '@/components/LoadingSkeleton';
import type { EpisodeDetail } from '@/types/anime';

export const Episode = () => {
  const { episodeId } = useParams<{ episodeId: string }>();
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>('');
  const [selectedServer, setSelectedServer] = useState<string>('');
  
  useEffect(() => {
    const fetchEpisode = async () => {
      if (!episodeId) return;
      
      try {
        setLoading(true);
        const data = await animeApi.getEpisode(episodeId);
        setEpisode(data);
        
        // Set default quality and server
        if (data.server?.qualities?.length > 0) {
          const defaultQuality = data.server.qualities[0];
          setSelectedQuality(defaultQuality.title);
          if (defaultQuality.serverList.length > 0) {
            setSelectedServer(defaultQuality.serverList[0].href);
          }
        }
      } catch (err) {
        setError('Failed to load episode');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEpisode();
  }, [episodeId]);
  
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  if (loading) {
    return <DetailSkeleton />;
  }
  
  if (error || !episode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <p className="text-muted-foreground text-center">{error || 'Episode not found'}</p>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Kembali ke Home
        </Link>
      </div>
    );
  }
  
  const currentQuality = episode.server?.qualities?.find(q => q.title === selectedQuality);
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Back Button */}
      <div className="px-4 py-3">
        <Link
          to={`/anime/${episode.animeId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali ke Anime
        </Link>
      </div>
      
      {/* Video Player */}
      <div id="video-container" className="relative bg-black">
        <div className="video-player relative">
          {selectedServer ? (
            <iframe
              src={selectedServer}
              className="w-full h-full absolute inset-0"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          ) : episode.defaultStreamingUrl ? (
            <iframe
              src={episode.defaultStreamingUrl}
              className="w-full h-full absolute inset-0"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Video tidak tersedia</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Play className="w-4 h-4 text-white" fill="white" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Volume2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Episode Info */}
      <div className="px-4 py-4">
        <h1 className="text-lg md:text-xl font-bold mb-2">{episode.title}</h1>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2 mb-4">
          {episode.hasPrevEpisode && (
            <Link
              to={`/episode/${episode.prevEpisode}`}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Link>
          )}
          {episode.hasNextEpisode && (
            <Link
              to={`/episode/${episode.nextEpisode}`}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors ml-auto"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        {/* Server Selection */}
        {episode.server?.qualities && episode.server.qualities.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Server className="w-4 h-4" />
              Pilih Server
            </h3>
            
            {/* Quality Tabs */}
            <div className="flex gap-2 mb-2">
              {episode.server.qualities.map((quality) => (
                <button
                  key={quality.title}
                  onClick={() => {
                    setSelectedQuality(quality.title);
                    if (quality.serverList.length > 0) {
                      setSelectedServer(quality.serverList[0].href);
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedQuality === quality.title
                      ? 'bg-blue-500 text-white'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {quality.title}
                </button>
              ))}
            </div>
            
            {/* Server List */}
            {currentQuality && (
              <div className="flex flex-wrap gap-2">
                {currentQuality.serverList.map((server, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedServer(server.href)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      selectedServer === server.href
                        ? 'bg-green-500/20 text-green-500 border border-green-500'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {server.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Download Links */}
        {episode.downloadUrl && episode.downloadUrl.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </h3>
            <div className="flex flex-wrap gap-2">
              {episode.downloadUrl.map((download, index) => (
                <a
                  key={index}
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg text-sm bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                >
                  {download.title}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Synopsis */}
        {episode.synopsis && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Sinopsis</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {episode.synopsis}
            </p>
          </div>
        )}
        
        {/* Recommended Episodes */}
        {episode.recommendedEpisodeList && episode.recommendedEpisodeList.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Rekomendasi</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {episode.recommendedEpisodeList.map((rec, index) => (
                <Link
                  key={`${rec.animeId}-${index}`}
                  to={`/anime/${rec.animeId}`}
                  className="flex-shrink-0 w-32"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-1">
                    <img
                      src={rec.poster}
                      alt={rec.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs line-clamp-2">{rec.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
