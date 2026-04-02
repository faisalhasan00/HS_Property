import { motion, type Variants } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Within 10 days of Sunil posting our video, we received 4 genuine enquiries. We are very happy. Highly recommended!",
      initials: "RK",
      name: "Ravi Kumar",
      role: "Plot Seller, Hyderabad"
    },
    {
      quote: "We listed our villa and got a serious buyer within 3 weeks. The video quality was excellent and the detailed explanation made buyers trust us immediately.",
      initials: "SP",
      name: "Sudha Prasad",
      role: "Villa Owner, Jubilee Hills"
    },
    {
      quote: "As a builder I promoted my entire layout through HS Properties. The enquiries from NRIs were unexpected but very welcome. Great ROI on the package!",
      initials: "VR",
      name: "Venkat Reddy",
      role: "Builder, Shamshabad"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section id="testimonials" className="bg-surface py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-left"
        >
          <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-6 block">
            Client Feedback
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2]">
            <span className="block text-textPrimary mb-2">See What</span>
            <span className="block text-accent italic">They Are Saying</span>
          </h2>
        </motion.div>

        {/* 3 Testimonial Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "var(--color-accent)" }}
              className="flex flex-col bg-background border border-accent/20 hover:border-accent transition-all duration-500 p-8 md:p-10 rounded-none h-full"
            >
              {/* Big Faint Quote Mark */}
              <div className="font-heading text-6xl md:text-7xl text-accent/20 leading-[0.5] mb-6 pt-2 select-none pointer-events-none">
                "
              </div>
              
              {/* Review Text */}
              <p className="font-body font-light italic text-textPrimary/80 text-sm md:text-base leading-relaxed flex-grow">
                {item.quote}
              </p>
              
              {/* Divider Line */}
              <div className="w-full h-[1px] bg-accent/10 my-6" />
              
              {/* Author Row */}
              <div className="flex items-center">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-none bg-surface border border-accent/40 flex items-center justify-center text-accent font-body font-bold text-sm shrink-0 mr-4 group-hover:border-accent transition-colors">
                  {item.initials}
                </div>
                
                {/* Name & Role */}
                <div className="flex flex-col">
                  <span className="text-textPrimary font-body font-medium text-sm md:text-base">
                    {item.name}
                  </span>
                  <span className="text-textMuted font-body text-[10px] uppercase tracking-wider font-bold mt-1">
                    {item.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
