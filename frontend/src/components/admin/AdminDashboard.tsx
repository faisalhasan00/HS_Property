import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Users, LogOut } from 'lucide-react';
import { LeadsView } from './LeadsView';
import { SettingsView } from './SettingsView';

export function AdminDashboard() {
  const location = useLocation();

  const menuItems = [
    { name: 'Leads CRM', path: '/admin', icon: Users },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-[#080808] text-textPrimary font-body overflow-hidden selection:bg-accent/30 selection:text-accent">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111111] border-r border-accent/20 flex flex-col shadow-2xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-accent/10">
          <h1 className="font-heading font-bold text-2xl tracking-wide uppercase">
            <span className="text-accent">HS</span> <span className="text-textMuted">Admin</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent/10 border-l-2 border-accent text-accent font-bold uppercase tracking-widest text-[10px]' 
                    : 'text-textMuted hover:bg-[#181818] hover:text-textPrimary font-bold uppercase tracking-widest text-[10px]'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-textMuted'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-accent/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-textMuted hover:text-red-400 transition-colors uppercase tracking-widest text-[10px] font-bold">
            <LogOut className="w-4 h-4" />
            Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Subtle background glow */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="p-8 md:p-12 relative z-10">
          <Routes>
            <Route path="/" element={<LeadsView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
