
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckSquare, Target, Timer, BarChart3, Settings } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'tasks', label: 'المهام', icon: CheckSquare, path: '/tasks' },
    { id: 'habits', label: 'العادات', icon: Target, path: '/habits' },
    { id: 'focus', label: 'تركيز', icon: Timer, path: '/focus' },
    { id: 'stats', label: 'إحصائيات', icon: BarChart3, path: '/stats' },
    { id: 'settings', label: 'إعدادات', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/tasks');
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 min-w-[60px] transition-all duration-200 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                size={24} 
                className={`mb-1 ${isActive ? 'fill-primary/20' : ''}`} 
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
