import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: {
    name: string;
    price: string;
  } | null;
}

export function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    propertyType: '',
    expectedPrice: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate short network delay then redirect to Razorpay static link
    setTimeout(() => {
      // TODO: Replace with the actual Razorpay Payment Link / API endpoint
      window.location.href = "https://rzp.io/l/demo123";
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-[#111111] border border-accent/40 shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-textMuted hover:text-accent hover:bg-accent/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              <span className="text-accent text-[10px] uppercase tracking-widest font-semibold block mb-2">Secure Booking</span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-textPrimary mb-1">
                {selectedPackage?.name || "Book Package"}
              </h3>
              <p className="text-textMuted text-xs font-body uppercase tracking-wider mb-8">
                Amount Payable: <strong className="text-accent">{selectedPackage?.price || "₹0"}</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3.5 text-sm outline-none transition-colors rounded-none placeholder:text-textMuted/50"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3.5 text-sm outline-none transition-colors rounded-none placeholder:text-textMuted/50"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Property Type */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Property Type *</label>
                    <div className="relative">
                      <select 
                        name="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3.5 text-sm outline-none transition-colors rounded-none appearance-none"
                      >
                        <option value="" disabled className="text-textMuted">Select type...</option>
                        <option value="flat">Apartment / Flat</option>
                        <option value="house">Independent House</option>
                        <option value="plot">Open Plot / Land</option>
                        <option value="commercial">Commercial Space</option>
                      </select>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Location / Area *</label>
                    <input 
                      type="text" 
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3.5 text-sm outline-none transition-colors rounded-none placeholder:text-textMuted/50"
                      placeholder="e.g. Banjara Hills, Hyd"
                    />
                  </div>
                </div>

                {/* Expected Price */}
                <div className="space-y-1.5 pb-2">
                  <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Expected Selling Price</label>
                  <input 
                    type="text" 
                    name="expectedPrice"
                    value={formData.expectedPrice}
                    onChange={handleChange}
                    className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3.5 text-sm outline-none transition-colors rounded-none placeholder:text-textMuted/50"
                    placeholder="e.g. ₹1.5 Cr (Optional)"
                  />
                </div>

                {/* Submit / Razorpay Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-accent text-[#080808] font-bold text-xs uppercase tracking-widest py-4.5 px-6 rounded-none hover:bg-accent/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed group mt-4!"
                  style={{ marginTop: '2rem' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-[#080808]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting to Razorpay...
                    </span>
                  ) : (
                    <>
                      Proceed To Payment <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-textMuted mt-4 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                  <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Secured by Razorpay™
                </p>
              </form>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
