import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { AnimeCard } from '@/components/AnimeCard';
import { animeApi } from '@/services/api';
import type { ScheduleDay } from '@/types/anime';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>('');
  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const data = await animeApi.getSchedule();
        setSchedule(data.days);
        
        // Set today as default
        const today = new Date().getDay();
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        setSelectedDay(dayNames[today]);
      } catch (err) {
        console.error('Failed to fetch schedule:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSchedule();
  }, []);
  
  const currentDaySchedule = schedule.find(s => s.day === selectedDay);
  
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          Jadwal Rilis
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Jadwal rilis anime terbaru setiap hari
        </p>
      </div>
      
      {/* Day Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-blue-500 text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      
      {/* Anime List */}
      <div className="px-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        ) : currentDaySchedule ? (
          currentDaySchedule.animeList.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">{selectedDay}</h2>
                <span className="text-sm text-muted-foreground">
                  {currentDaySchedule.animeList.length} anime
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {currentDaySchedule.animeList.map((anime, index) => (
                  <AnimeCard 
                    key={`${anime.animeId}-${index}`}
                    anime={anime}
                    showEpisode={false}
                    showRating={true}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Clock className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Tidak ada anime yang rilis hari {selectedDay}
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Jadwal tidak tersedia
            </p>
          </div>
        )}
      </div>
      
      {/* Full Schedule List */}
      {!loading && schedule.length > 0 && (
        <div className="px-4 py-6">
          <h2 className="text-lg font-bold mb-4">Jadwal Lengkap</h2>
          <div className="space-y-4">
            {schedule.map((daySchedule) => (
              <div key={daySchedule.day} className="bg-card rounded-lg p-4">
                <h3 className="font-medium mb-2 text-blue-400">{daySchedule.day}</h3>
                <div className="flex flex-wrap gap-2">
                  {daySchedule.animeList.slice(0, 5).map((anime, index) => (
                    <Link
                      key={`${anime.animeId}-${index}`}
                      to={`/anime/${anime.animeId}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {anime.title}
                      {anime.estimation && (
                        <span className="text-xs text-blue-500 ml-1">
                          ({anime.estimation})
                        </span>
                      )}
                    </Link>
                  ))}
                  {daySchedule.animeList.length > 5 && (
                    <span className="text-sm text-muted-foreground">
                      +{daySchedule.animeList.length - 5} lainnya
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
