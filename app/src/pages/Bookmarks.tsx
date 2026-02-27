import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { AnimeCard } from '@/components/AnimeCard';

export const Bookmarks = () => {
  const { bookmarks, removeBookmark, isLoaded } = useBookmarks();
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            Anime Favorit
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {bookmarks.length} anime tersimpan
        </p>
      </div>
      
      {/* Bookmarks Grid */}
      <div className="px-4">
        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.animeId} className="relative group">
                <AnimeCard
                  anime={{
                    animeId: bookmark.animeId,
                    title: bookmark.title,
                    poster: bookmark.poster,
                    score: bookmark.score,
                    status: bookmark.status,
                    type: bookmark.type,
                    href: `/anime/${bookmark.animeId}`,
                  }}
                  showEpisode={false}
                  showRating={true}
                />
                {/* Remove Button */}
                <button
                  onClick={() => removeBookmark(bookmark.animeId)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-2">
              Belum ada anime favorit
            </p>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Simpan anime favoritmu untuk menonton nanti
            </p>
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Jelajahi Anime
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
