import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom Premium Social Icons to replace missing lucide-react exports
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Our Reach', href: '#reach' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-surface border-l border-accent z-[70] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-heading text-xl font-bold tracking-tight">
                <span className="text-accent">HS</span> <span className="text-textPrimary">Navigation</span>
              </span>
              <button 
                onClick={onClose}
                className="p-2 text-textMuted hover:text-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 mb-12">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={onClose}
                  className="font-body text-2xl font-light text-textPrimary hover:text-accent transition-colors flex items-center justify-between group"
                >
                  {item.label}
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <Button 
                variant="solid" 
                className="w-full mb-8 rounded-none py-4 text-sm tracking-widest uppercase font-bold"
                onClick={onClose}
              >
                Book Now
              </Button>

              <div className="flex items-center justify-center gap-6 text-textMuted">
                <a href="https://youtube.com" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Follow us on YouTube">
                  <YoutubeIcon className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://facebook.com" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
