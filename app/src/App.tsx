import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Home } from '@/pages/Home';
import { Search } from '@/pages/Search';
import { AnimeDetail } from '@/pages/AnimeDetail';
import { Episode } from '@/pages/Episode';
import { Genre } from '@/pages/Genre';
import { Schedule } from '@/pages/Schedule';
import { Bookmarks } from '@/pages/Bookmarks';
import { AnimeList } from '@/pages/AnimeList';
import { Recent } from '@/pages/Recent';
import { Developer } from '@/pages/Developer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/anime/:animeId" element={<AnimeDetail />} />
            <Route path="/episode/:episodeId" element={<Episode />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/genre/:genreId" element={<Genre />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/anime" element={<AnimeList />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/popular" element={<AnimeList />} />
            <Route path="/movies" element={<AnimeList />} />
            <Route path="/batch" element={<AnimeList />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
