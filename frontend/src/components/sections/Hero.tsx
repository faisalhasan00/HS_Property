import React, { useState, useEffect } from 'react';
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { Star, ShieldCheck, TrendingUp, Play } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../../lib/utils';

export function Hero() {
  const [dbSettings, setDbSettings] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setDbSettings(data))
      .catch(console.error);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateXTransform = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateYTransform = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12 lg:pt-32">

      {/* Background layer: Subtle gold grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #C9A84C 1px, transparent 1px), linear-gradient(to bottom, #C9A84C 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Background layer: Soft gold radial glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" as const }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.08), transparent 70%)'
        }}
      />

      {/* Content container */}
      <div className="container relative z-10 px-6 md:px-12 lg:px-24">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center"
        >

          {/* Left Column: Copy & Trust Elements */}
          <div className="flex flex-col items-start text-left">

            {/* Top Trust Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-none border border-accent/40 bg-surface/50 backdrop-blur-sm px-4 py-2 mb-8 shadow-lg"
            >
              <span className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-textPrimary font-semibold">
                Hyderabad's #1 Most Trusted Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="flex flex-col gap-2 mb-8">
              <span className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-textPrimary leading-[1.1]">
                Sell Your Property
              </span>
              <span className="font-heading italic text-5xl md:text-6xl lg:text-7xl tracking-tight text-accent leading-[1.1]">
                Faster & Directly.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="max-w-[500px] text-base md:text-lg text-textMuted leading-relaxed font-body font-light mb-10">
              Skip the middlemen. We shoot premium cinematic property tours and present them directly to our <strong className="font-semibold text-textPrimary">20,000+ active NRI and local buyers</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-start mb-14">
              <Button
                variant="solid"
                size="lg"
                className="w-full sm:w-auto rounded-none bg-accent text-[#080808] font-bold tracking-widest uppercase text-xs sm:text-sm px-8 py-5 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Packages
              </Button>

              <a
                href="https://www.youtube.com/@hsproperties-hyd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-none border border-accent/60 text-textPrimary bg-transparent font-medium tracking-wide px-8 py-5 transition-all hover:border-accent hover:text-accent hover:bg-accent/5 flex items-center gap-2 group justify-center no-underline"
              >
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                See Our Results
              </a>
            </motion.div>

            {/* Bottom Trust Metrics Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 md:gap-8 w-full border-t border-accent/20 pt-8">
              <div className="flex flex-col items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span className="text-xl font-heading font-bold text-textPrimary leading-none">20+ Yrs</span>
                <span className="text-[10px] text-textMuted uppercase tracking-wider font-semibold">Experience</span>
              </div>
              <div className="flex flex-col items-start gap-2 border-l border-accent/20 pl-4 md:pl-8">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-xl font-heading font-bold text-textPrimary leading-none">Millions</span>
                <span className="text-[10px] text-textMuted uppercase tracking-wider font-semibold">Of Views</span>
              </div>
              <div className="flex flex-col items-start gap-2 border-l border-accent/20 pl-4 md:pl-8">
                <Star className="w-5 h-5 text-accent" />
                <span className="text-xl font-heading font-bold text-textPrimary leading-none">0%</span>
                <span className="text-[10px] text-textMuted uppercase tracking-wider font-semibold">Brokerage</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Trust Anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" as const }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: rotateXTransform,
              rotateY: rotateYTransform,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full aspect-video z-20"
          >

            {/* Outline Box for depth */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 border border-accent/40 z-0" />

            {/* Main Visual Container */}
            <div className="absolute inset-0 z-10 bg-black border border-accent overflow-hidden group">

              {/* Autoplaying Cinematic YouTube Background */}
              <iframe
                src={getYouTubeEmbedUrl(dbSettings?.hero_video_url) || "https://www.youtube.com/embed/UtlM8MzNhAA?autoplay=1&mute=1&loop=1&playlist=UtlM8MzNhAA&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080"}
                title="Premium Hyderabad Property"
                className="w-full h-full scale-[1.05] opacity-100 pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ border: 'none' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent pointer-events-none" />

              {/* Floating Social Proof Tag inside the video frame */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md border border-accent/40 px-4 py-2 flex items-center gap-3 shadow-2xl pointer-events-none">
                <Play className="w-3 h-3 fill-accent text-accent" />
                <span className="text-xs font-body uppercase tracking-wider text-textPrimary font-bold">
                  {dbSettings?.hero_view_count || "40.2K+ Views"}
                </span>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-4 left-4 right-4 p-5 bg-background/85 backdrop-blur-md border border-accent/30 flex items-center justify-between pointer-events-none"
              >
                <div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-textPrimary mb-1">Cinematic Quality</h3>
                  <p className="font-body text-[10px] sm:text-xs text-textMuted uppercase tracking-widest font-semibold">
                    Shot & Edited by HS Properties
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@hsproperties-hyd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:text-accent-hover transition-colors pointer-events-auto"
                >
                  See Results
                </a>
              </motion.div>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
