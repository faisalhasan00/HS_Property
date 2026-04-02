import { useEffect, useRef } from 'react';

export function About() {
  const photoRef = useRef<HTMLDivElement>(null);

  // Optional: Add a subtle 3D tilt effect to the image on mouse move
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    };
    const handleMouseLeave = () => {
      el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-[#111111] overflow-hidden border-b border-accent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Photo Side */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* The 3D tilting container */}
            <div 
              ref={photoRef} 
              className="relative w-full aspect-[3/4] transition-transform duration-200 ease-out z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main Photo Placeholder */}
              <div className="absolute inset-0 bg-[#181818] border border-accent flex items-center justify-center transform translate-z-10 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop')" }}>
                {/* Fallback text if image fails/loads */}
                <span className="text-textMuted/50 font-body mix-blend-difference z-0">Sunil Saxena Photo</span>
                
                {/* Dark overlay to match theme if using a real image */}
                <div className="absolute inset-0 bg-background/20" />
              </div>

              {/* Offset Gold Border Box (Layered Depth) */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-accent -z-10" />
              
              {/* Gold Badge Overlap */}
              <div className="absolute -bottom-4 -left-4 bg-accent text-[#080808] rounded-none px-6 py-4 flex flex-col items-center justify-center shadow-lg transform translate-z-20">
                <span className="font-heading font-bold text-5xl leading-none">5+</span>
                <span className="font-body text-[0.65rem] uppercase tracking-widest font-bold mt-1">Years in Real Estate</span>
              </div>
            </div>
          </div>

          {/* Right Column - Text Side */}
          <div className="flex flex-col items-start z-10">
            {/* Tag */}
            <span className="font-body text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-accent mb-6 font-semibold">
              About Sunil Saxena
            </span>

            {/* Headline */}
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-textPrimary leading-[1.1] mb-6">
              Hyderabad's Trusted <br />
              <span className="text-accent italic font-medium">Property Voice</span>
            </h2>

            {/* Sub-divider */}
            <div className="w-12 h-[1px] bg-accent mb-8" />

            {/* Paragraphs */}
            <div className="space-y-6 font-body font-light text-textPrimary/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              <p>
                నమస్కారం! I'm Sunil Saxena, founder of HS Properties and Hyderabad's most trusted real estate content creator. I have been helping thousands of Telugu-speaking families find their dream properties through honest, detailed video tours.
              </p>
              <p>
                మీరు Farm House అమ్మాలనుకున్నా, Flat అయినా, Plot అయినా, Villa అయినా — నా platform ద్వారా మీ property genuine buyers దగ్గరికి చేరుతుంది. No middlemen. Direct reach.
              </p>
              <p>
                My audience trusts me because I show real properties, real prices, and real locations — no filters, no fake promises.
              </p>
            </div>

            {/* Platform Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                "▶ YouTube", "◈ Instagram", "◉ Facebook", "🏡 Farm Houses", "🏠 Villas", "🏢 Commercial", "📐 Plots"
              ].map((tag, i) => (
                <div 
                  key={i} 
                  className="rounded-none border border-accent text-accent px-3 py-1.5 font-body text-xs hover:bg-accent hover:text-[#080808] transition-colors cursor-default"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
