import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Clock, Heart, User } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/anime', label: 'Anime', icon: Grid3X3 },
    { path: '/recent', label: 'Recent', icon: Clock },
    { path: '/bookmarks', label: 'Favorite', icon: Heart },
    { path: '/developer', label: 'SamuDev', icon: User },
  ];
  
  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                active ? 'active text-blue-500' : 'text-muted-foreground'
              }`}
            >
              <Icon 
                className="w-5 h-5" 
                fill={active ? 'currentColor' : 'none'}
                strokeWidth={active ? 0 : 2}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
