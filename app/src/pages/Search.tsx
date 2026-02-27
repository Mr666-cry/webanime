import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { AnimeCard } from '@/components/AnimeCard';
import { animeApi } from '@/services/api';
import type { Anime } from '@/types/anime';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Isekai', 'Magic', 'Romance', 'School', 
    'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
  ];
  
  const statuses = ['Ongoing', 'Completed'];
  const types = ['TV', 'Movie', 'OVA', 'Special'];
  const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];
  
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);
  
  const performSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      const data = await animeApi.search(searchTerm);
      setResults(data.animeList);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };
  
  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedYear('');
  };
  
  const filteredResults = results.filter(anime => {
    if (selectedGenre && !anime.genreList?.some(g => g.title === selectedGenre)) return false;
    if (selectedStatus && anime.status !== selectedStatus) return false;
    if (selectedType && anime.type !== selectedType) return false;
    return true;
  });
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Search Header */}
      <div className="sticky top-14 md:top-16 z-40 glass border-b border-border px-4 py-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              showFilters ? 'bg-blue-500 text-white' : 'bg-secondary text-foreground'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </form>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Filter</span>
              <button
                onClick={clearFilters}
                className="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Reset
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Genre Filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-secondary text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Genre</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-secondary text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Status</option>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-secondary text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Tipe</option>
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              
              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-secondary text-foreground text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Tahun</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      <div className="px-4 py-4">
        {query ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                Hasil Pencarian "{query}"
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredResults.length} hasil
              </span>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredResults.map((anime, index) => (
                  <AnimeCard 
                    key={`${anime.animeId}-${index}`}
                    anime={anime}
                    showEpisode={false}
                    showRating={true}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <SearchIcon className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Tidak ada hasil untuk "{query}"
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Coba kata kunci lain
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <SearchIcon className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Masukkan kata kunci untuk mencari anime
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
