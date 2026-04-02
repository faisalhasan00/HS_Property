import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HelpCircleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const faqs = [
  {
    question: "Do you charge any brokerage?",
    answer: "Absolutely not. We are a direct-to-buyer platform. We charge a one-time package fee for the cinematic production and marketing, but we never take a percentage of your property's sale price."
  },
  {
    question: "Who are your primary buyers?",
    answer: "Our network consists of over 20,000 active investors, including a large percentage of NRIs from the USA, Gulf, and Europe looking to invest specifically in Hyderabad real estate."
  },
  {
    question: "How long does the video shoot take?",
    answer: "A standard cinematic property tour takes about 3-5 hours on-site, depending on the property size. We then spend 2-3 days in post-production to ensure everything looks premium."
  },
  {
    question: "Is this service only for luxury properties?",
    answer: "While our cinematic style is perfect for luxury villas and high-end apartments, we work with all types of residential and commercial properties that want to stand out in a crowded market."
  },
  {
    question: "How do I get started?",
    answer: "Simply click 'Book Now', choose your package, and our team will contact you within 24 hours to schedule the shoot and discuss your property's unique selling points."
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
            <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-6 flex items-center gap-2">
              <HelpCircleIcon className="w-3 h-3" /> Still Have Questions?
            </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.2]">
            <span className="block text-textPrimary mb-2">Common</span>
            <span className="block text-accent italic">Enquiries</span>
          </h2>
        </div>

        {/* FAQ Grid/List */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-accent/20 bg-surface/30 backdrop-blur-sm overflow-hidden transition-colors hover:border-accent/40"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
              >
                <span className="font-body text-lg md:text-xl text-textPrimary font-medium group-hover:text-accent transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-accent"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                      <p className="font-body text-textMuted text-sm md:text-base leading-relaxed border-t border-accent/10 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
