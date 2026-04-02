import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const statsData = [
  { value: '17.2K', label: 'YouTube Subscribers' },
  { value: '2,982', label: 'Instagram Followers' },
  { value: '500+', label: 'Properties Showcased' },
  { value: '10L+', label: 'Total Views' },
];

export function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section className="w-full bg-surface border-y border-accent overflow-hidden">
      <div className="container mx-auto px-0">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {statsData.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={cn(
                "py-10 md:py-16 flex flex-col items-center justify-center text-center px-4 transition-colors duration-500 hover:bg-white/[0.02]",
                // Manually handling the inner grid dividers for 2x2 on mobile vs 4x1 on desktop
                index === 0 && "border-r border-b md:border-b-0 border-accent/20",
                index === 1 && "border-b md:border-b-0 md:border-r border-accent/20",
                index === 2 && "border-r border-accent/20",
                index === 3 && ""
              )}
            >
              <h3 className="font-heading font-bold text-5xl md:text-6xl text-accent mb-3 tracking-tighter">
                {stat.value}
              </h3>
              <p className="font-body uppercase text-[0.65rem] md:text-[0.7rem] tracking-[0.25em] text-textMuted font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
