import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { BookingModal } from '../ui/BookingModal';

export function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{name: string, price: string} | null>(null);
  const [dbSettings, setDbSettings] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setDbSettings(data))
      .catch(console.error);
  }, []);

  const handleOpenModal = (name: string, price: string) => {
    setSelectedPackage({ name, price });
    setIsModalOpen(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="pricing" className="bg-surface py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-left"
        >
          <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-6 block">
            Promotion Packages
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2]">
            <span className="block text-textPrimary mb-2">Packages Tailored</span>
            <span className="block text-accent italic">To Your Property</span>
          </h2>
        </motion.div>

        {/* 3 Package Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          
          {/* Card 1 - Silver Package */}
          <motion.div 
            variants={cardVariants}
            className="order-2 lg:order-1 flex flex-col bg-background border border-accent/20 p-8 md:p-10 hover:border-accent transition-all duration-500 rounded-none h-full"
          >
            <div className="mb-4">
              <span className="text-accent text-[10px] uppercase tracking-widest font-semibold block mb-2">Starter</span>
              <h3 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary mb-2">Silver Package</h3>
              <div className="text-accent text-3xl md:text-4xl font-heading font-bold mb-2">₹{dbSettings?.silver_price || '14999'}</div>
              <p className="text-textMuted text-[10px] font-bold uppercase tracking-widest leading-none">Best for individual sellers</p>
            </div>
            
            <div className="w-full h-[1px] bg-accent/10 my-6" />
            
            <ul className="flex-grow space-y-4 mb-8">
              {[
                "1 Full Property Video (10–15 mins)",
                "Published on YouTube",
                "1 Instagram Reel",
                "Basic editing & professional subtitles",
                "Video live for 1 month"
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-accent mr-3">—</span>
                  <span className="font-body font-light text-textMuted text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleOpenModal('Silver Package', '₹' + (dbSettings?.silver_price || '14999'))}
              className="w-full py-4 mt-auto bg-transparent border border-textPrimary text-textPrimary hover:border-accent hover:text-accent font-body text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-none"
            >
              Enquire Now
            </button>
          </motion.div>

          {/* Card 2 - Gold Package (Featured) */}
          <motion.div 
            variants={cardVariants}
            className="order-1 lg:order-2 flex flex-col bg-[#181818] border border-accent p-8 md:p-10 relative hover:-translate-y-2 transition-transform duration-500 rounded-none h-full shadow-2xl"
          >
            {/* Floating Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-background font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-none whitespace-nowrap shadow-lg z-10">
              Most Popular
            </div>

            <div className="mb-4 mt-2">
              <span className="text-accent text-[10px] uppercase tracking-widest font-semibold block mb-2">Standard</span>
              <h3 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary mb-2">Gold Package</h3>
              <div className="text-accent text-3xl md:text-4xl font-heading font-bold mb-2">₹{dbSettings?.gold_price || '24999'}</div>
              <p className="text-textMuted text-[10px] font-bold uppercase tracking-widest leading-none">Best for builders & dealers</p>
            </div>
            
            <div className="w-full h-[1px] bg-accent/20 my-6" />
            
            <ul className="flex-grow space-y-4 mb-8">
              {[
                "1 Full Property Video (20–25 mins)",
                "YouTube + Instagram + Facebook",
                "2 Instagram Reels + Stories",
                "Premium editing + drone shots",
                "Leads shared on WhatsApp",
                "Pinned post for 3 months"
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-accent mr-3">—</span>
                  <span className="font-body font-light text-textMuted text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleOpenModal('Gold Package', '₹' + (dbSettings?.gold_price || '24999'))}
              className="w-full py-4 mt-auto bg-accent text-background font-bold hover:bg-accent/90 focus:outline-none font-body text-[10px] tracking-widest uppercase transition-colors duration-300 rounded-none shadow-md"
            >
              Book This Package
            </button>
          </motion.div>

          {/* Card 3 - Diamond Package */}
          <motion.div 
            variants={cardVariants}
            className="order-3 lg:order-3 flex flex-col bg-background border border-accent/20 p-8 md:p-10 hover:border-accent transition-all duration-500 rounded-none h-full"
          >
            <div className="mb-4">
              <span className="text-accent text-[10px] uppercase tracking-widest font-semibold block mb-2">Premium</span>
              <h3 className="font-heading font-bold text-3xl md:text-4xl text-textPrimary mb-2">Diamond Package</h3>
              <div className="text-accent text-3xl md:text-4xl font-heading font-bold mb-2">₹{dbSettings?.diamond_price || '49999'}</div>
              <p className="text-textMuted text-[10px] font-bold uppercase tracking-widest leading-none">Best for big projects & layouts</p>
            </div>
            
            <div className="w-full h-[1px] bg-accent/10 my-6" />
            
            <ul className="flex-grow space-y-4 mb-8">
              {[
                "2 Full Property Videos",
                "All platforms — maximum reach",
                "4 Reels + Stories + Highlights",
                "Full drone videography",
                "Dedicated lead tracking via WhatsApp",
                "6 month content live guarantee",
                "Featured in community posts"
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-accent mr-3">—</span>
                  <span className="font-body font-light text-textMuted text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleOpenModal('Diamond Package', '₹' + (dbSettings?.diamond_price || '49999'))}
              className="w-full py-4 mt-auto bg-transparent border border-textPrimary text-textPrimary hover:border-accent hover:text-accent font-body text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-none"
            >
              Enquire Now
            </button>
          </motion.div>

        </motion.div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPackage={selectedPackage} 
      />
    </section>
  );
}
