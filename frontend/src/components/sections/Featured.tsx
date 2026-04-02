import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { motion, type Variants } from 'framer-motion';

const properties = [
  {
    title: 'The Platinum Residency',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹12.5 Cr',
    videoId: 'LXb3EKWsInQ',
  },
  {
    title: 'Aura Villas',
    location: 'Banjara Hills, Hyderabad',
    price: '₹15.2 Cr',
    videoId: 'wnhvanMdx4s',
  },
  {
    title: 'Skyview Penthouses',
    location: 'HITEC City, Hyderabad',
    price: '₹8.9 Cr',
    videoId: 'bh_bS-GZ7b0',
  }
];

export function Featured() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="featured" className="py-24 bg-surface border-b border-accent/20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
              Exclusive Listings
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-textPrimary tracking-tight mb-4">
              Featured <span className="italic text-accent">Masterworks</span>
            </h2>
            <p className="text-textMuted max-w-xl text-base md:text-lg font-light leading-relaxed">
              Curated masterworks of architecture. Watch the cinematic tours to experience every detail before stepping inside.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="shrink-0 rounded-none border-accent/40 text-textPrimary hover:bg-accent/5 tracking-widest uppercase text-[10px] font-bold py-4 px-8"
          >
            View All Properties
          </Button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {properties.map((property, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Card className="group cursor-pointer bg-background/50 border-accent/20 hover:border-accent transition-all duration-500 rounded-none">
                <CardHeader className="p-0 mb-6 relative overflow-hidden aspect-video border-b border-accent/20 bg-black">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-full transition-transform duration-700"
                  >
                    <iframe 
                      className="w-full h-full absolute top-0 left-0 border-0 pointer-events-none"
                      src={`https://www.youtube.com/embed/${property.videoId}?rel=0&modestbranding=1&controls=0`}
                      title={property.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </motion.div>
                  <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">
                    {property.location}
                  </span>
                  <CardTitle className="text-2xl font-bold mb-6 font-heading text-textPrimary group-hover:text-accent transition-colors">
                    {property.title}
                  </CardTitle>
                  <div className="flex items-center justify-between mt-8 border-t border-accent/10 pt-5">
                    <span className="text-xl font-heading font-bold text-textPrimary">{property.price}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                      Watch Tour <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
