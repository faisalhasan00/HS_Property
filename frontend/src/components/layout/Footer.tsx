import { Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-accent py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Three Columns */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          
          {/* Left - Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-sm bg-accent p-1.5 w-8 h-8 md:w-10 md:h-10">
              <Building2 className="h-4 w-4 md:h-5 md:w-5 text-background" />
            </div>
            <span className="font-heading text-lg md:text-xl font-bold tracking-wide text-textPrimary uppercase">
              HS Properties
            </span>
          </div>
          
          {/* Center - Copyright */}
          <div className="text-textMuted font-body font-light text-[10px] md:text-xs tracking-wide text-center">
            © 2025 HS Properties — Sunil Saxena. Hyderabad.
          </div>
          
          {/* Right - Social Links */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-body font-semibold uppercase tracking-wider text-textMuted">
            <a href="https://www.youtube.com/@hsproperties-hyd" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <span className="text-accent/40">—</span>
            <a href="https://www.instagram.com/hsproperties.hyderabad" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <span className="text-accent/40">—</span>
            <a href="#" className="hover:text-accent transition-colors">
              Facebook
            </a>
            <span className="text-accent/40">—</span>
            <a href="#" className="hover:text-accent transition-colors">
              WhatsApp
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
