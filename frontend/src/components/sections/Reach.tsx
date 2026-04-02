import { motion, type Variants } from 'framer-motion';

export function Reach() {
  const platforms = [
    {
      name: "▶ YouTube",
      number: "17.2K",
      label: "Subscribers",
      desc: "Long-form property tours with high watch time. Buyers watch full videos — meaning they are genuinely interested in what you're selling."
    },
    {
      name: "◈ Instagram",
      number: "2,982",
      label: "Followers",
      desc: "Short property reels reaching beyond just followers through hashtags and explore. Urban Hyderabad buyers and NRIs actively browse here."
    },
    {
      name: "◉ Facebook",
      number: "Growing",
      label: "Community",
      desc: "Family buyers and NRI investors from US & Gulf follow property content on Facebook. Great for high value property enquiries."
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="reach" className="bg-background py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-16 md:mb-24"
        >
          <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-6">
            Our Platform Reach
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2]">
            <span className="block text-textPrimary mb-2">Your Property</span>
            <span className="block text-accent italic">Reaches Real People</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full border border-accent/30 flex flex-col lg:flex-row divide-y-[1px] lg:divide-y-0 lg:divide-x-[1px] divide-accent/30 rounded-none bg-surface/20"
        >
          {platforms.map((platform, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group flex-1 bg-transparent hover:bg-accent/[0.03] transition-colors duration-700 p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center"
            >
              {/* Subtle Gold Glow at Top Center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-accent opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(201,168,76,0.8)] transition-all duration-700 pointer-events-none rounded-b-full" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-32 bg-accent opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-700 pointer-events-none rounded-full" />

              {/* Platform Label */}
              <span className="uppercase tracking-widest text-[10px] md:text-xs font-body font-semibold text-textMuted mb-6 block relative z-10">
                {platform.name}
              </span>
              
              {/* Big Number */}
              <div className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-accent mb-2 relative z-10 transition-transform duration-700 group-hover:scale-110">
                {platform.number}
              </div>
              
              {/* Subscribers / Followers Label */}
              <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-body font-semibold text-textMuted mb-8 relative z-10">
                {platform.label}
              </span>
              
              {/* Description */}
              <p className="font-body font-light text-textMuted text-sm md:text-base leading-relaxed max-w-[320px] relative z-10">
                {platform.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
