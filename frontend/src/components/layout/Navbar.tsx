import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MobileMenu } from './MobileMenu';
import { Building2, Menu } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle smooth transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md py-3 border-accent/20' 
            : 'bg-background/40 backdrop-blur-sm py-6 border-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-center rounded-sm bg-accent p-1.5 w-8 h-8">
              <Building2 className="h-4 w-4 text-background" />
            </div>
            <span className="font-heading text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-accent">HS</span>{' '}
              <span className="text-textPrimary italic font-medium">Properties</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'About', href: '#about' },
              { label: 'Process', href: '#process' },
              { label: 'Packages', href: '#pricing' },
              { label: 'Our Reach', href: '#reach' }
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="font-body text-[0.75rem] md:text-[0.82rem] uppercase tracking-widest text-textMuted transition-all duration-300 hover:text-accent relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button 
                variant="solid" 
                className="rounded-none font-extrabold text-background bg-accent hover:bg-accent-hover tracking-[0.15em] uppercase py-2.5 px-8 text-[11px] shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_25px_rgba(201,168,76,0.25)] transition-all"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </Button>
            </div>
            
            {/* Mobile menu toggle */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-textPrimary hover:text-accent transition-colors p-2"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>

        </div>
      </motion.nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
