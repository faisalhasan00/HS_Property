import { motion, type Variants } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We meet to understand your property\'s unique selling points, legal standing, and your target price.'
  },
  {
    number: '02',
    title: 'Cinematic Shoot',
    description: 'Our professional crew shoots a high-end cinematic tour, capturing your property in the best light.'
  },
  {
    number: '03',
    title: 'Targeted Launch',
    description: 'We present your property directly to our network of 20,000+ active NRI and local buyers.'
  },
  {
    number: '04',
    title: 'Direct Closing',
    description: 'Serious buyers contact you directly. No middlemen, no brokerage, just a clean professional sale.'
  }
];

export function Process() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section id="process" className="bg-background py-20 md:py-32 border-b border-accent/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-16 md:mb-24"
        >
          <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-6">
            How It Works
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2]">
            <span className="block text-textPrimary mb-2">A Seamless Path</span>
            <span className="block text-accent italic">To Your Sale</span>
          </h2>
        </motion.div>

        {/* Process Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={stepVariants}
              className="relative group p-8 bg-surface/20 border border-accent/10 hover:border-accent/40 transition-colors duration-500 rounded-none"
            >
              {/* Step Number Background */}
              <div className="font-heading text-7xl md:text-8xl font-bold text-accent/[0.03] absolute top-4 right-4 pointer-events-none group-hover:text-accent/[0.08] transition-colors duration-700">
                {step.number}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-accent font-heading text-lg font-bold mb-4 tracking-widest border-b border-accent/20 pb-2 inline-block">
                  STEP {step.number}
                </div>
                <h3 className="font-heading text-2xl font-bold text-textPrimary mb-4 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-body font-light text-textMuted text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
