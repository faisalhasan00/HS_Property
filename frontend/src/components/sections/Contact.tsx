import { motion, type Variants } from 'framer-motion';

export function Contact() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="bg-background py-20 md:py-32 relative overflow-hidden">
      {/* Subtle gold radial glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(201,168,76,0.05)_0%,_rgba(8,8,8,0)_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-6">
            Book Your Shoot
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-6">
            <span className="block text-textPrimary mb-2">Get Your Property</span>
            <span className="block text-accent italic">Promoted Today</span>
          </h2>
          <p className="font-body font-light text-textMuted text-sm md:text-base leading-relaxed max-w-[480px] mx-auto">
            Fill in your details below and Sunil will personally contact you on WhatsApp within 24 hours.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[520px] mx-auto"
        >
          <form className="flex flex-col gap-4">
            
            {/* Row 1 - Two fields */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="bg-surface border border-accent/40 outline-none text-[#F5F0E8] placeholder:text-textMuted/60 px-4 py-3 font-body text-sm rounded-none focus:border-accent transition-all hover:border-accent/60"
                required
              />
              <input 
                type="tel" 
                placeholder="WhatsApp Number" 
                className="bg-surface border border-accent/40 outline-none text-[#F5F0E8] placeholder:text-textMuted/60 px-4 py-3 font-body text-sm rounded-none focus:border-accent transition-all hover:border-accent/60"
                required
              />
            </motion.div>

            {/* Row 2 - Location */}
            <motion.input 
              variants={itemVariants}
              type="text" 
              placeholder="Property Location — Area / City" 
              className="bg-surface border border-accent/40 outline-none text-[#F5F0E8] placeholder:text-textMuted/60 px-4 py-3 font-body text-sm rounded-none focus:border-accent transition-all hover:border-accent/60"
              required
            />

            {/* Row 3 - Property Type */}
            <motion.div variants={itemVariants} className="relative">
              <select 
                className="w-full bg-surface border border-accent/40 outline-none text-[#F5F0E8] px-4 py-3 font-body text-sm rounded-none focus:border-accent transition-all hover:border-accent/60 appearance-none cursor-pointer invalid:text-textMuted/60"
                required
                defaultValue=""
              >
                <option value="" disabled className="text-textMuted/60">Select Property Type</option>
                <option value="farm" className="text-textPrimary">Farm House / Farm Land</option>
                <option value="residential" className="text-textPrimary">Residential Flat / Apartment</option>
                <option value="villa" className="text-textPrimary">Independent House / Villa</option>
                <option value="plot" className="text-textPrimary">Open Plot / Layout</option>
                <option value="commercial" className="text-textPrimary">Commercial Space / Office</option>
                <option value="other" className="text-textPrimary">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-xs">▼</div>
            </motion.div>

            {/* Row 4 - Package Select */}
            <motion.div variants={itemVariants} className="relative">
              <select 
                className="w-full bg-surface border border-accent/40 outline-none text-[#F5F0E8] px-4 py-3 font-body text-sm rounded-none focus:border-accent transition-all hover:border-accent/60 appearance-none cursor-pointer invalid:text-textMuted/60"
                required
                defaultValue=""
              >
                <option value="" disabled className="text-textMuted/60">Select a Package</option>
                <option value="silver" className="text-textPrimary">Silver Package (Starter)</option>
                <option value="gold" className="text-textPrimary">Gold Package (Most Popular)</option>
                <option value="diamond" className="text-textPrimary">Diamond Package (Premium)</option>
                <option value="discuss" className="text-textPrimary">Not Sure — Let's Discuss</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-xs">▼</div>
            </motion.div>

            {/* Row 5 - Textarea */}
            <motion.textarea 
              variants={itemVariants}
              placeholder="Tell us a bit about your property — size, price, any special features..." 
              rows={3}
              className="bg-surface border border-accent/40 outline-none text-[#F5F0E8] placeholder:text-textMuted/60 px-4 py-3 font-body text-sm rounded-none focus:border-accent transition-all hover:border-accent/60 resize-none"
              required
            ></motion.textarea>

            {/* Submit Button */}
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              className="w-full bg-accent text-background font-bold uppercase tracking-widest text-[10px] sm:text-xs py-4 mt-2 hover:bg-[#e0bf64] transition-all duration-300 rounded-none shadow-[0_0_15px_rgba(201,168,76,0.15)]"
            >
              Book via WhatsApp &rarr;
            </motion.button>
            
          </form>
        </motion.div>

      </div>
    </section>
  );
}
