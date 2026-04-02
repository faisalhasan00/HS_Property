import { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';

export function SettingsView() {
  const [settings, setSettings] = useState({
    hero_video_url: '',
    silver_price: '',
    gold_price: '',
    diamond_price: '',
    hero_view_count: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(prev => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch settings", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: settings })
      });
      
      if (!res.ok) throw new Error('API Error');
      
      setMessage({ type: 'success', text: 'Live website updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update database parameters.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="font-heading font-bold text-3xl text-textPrimary mb-1">Live Site Configuration</h2>
        <p className="text-textMuted text-[10px] uppercase tracking-widest font-bold">Instantly alter the public facing website without code deployments.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Core Media */}
        <div className="bg-[#111111] border border-accent/20 p-8 shadow-xl">
          <h3 className="font-heading font-bold text-xl text-accent mb-6 flex items-center gap-2">
            Hero Section Media
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">YouTube Cinematic Embed URL</label>
              <input 
                type="text" 
                name="hero_video_url"
                value={settings.hero_video_url}
                onChange={handleChange}
                className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3 text-sm outline-none transition-colors rounded-none placeholder:text-textMuted/50 font-mono text-xs"
              />
              <p className="text-[9px] text-textMuted ml-1">Must be an `embed/` link format.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Live Trust Metric Text</label>
              <input 
                type="text" 
                name="hero_view_count"
                value={settings.hero_view_count}
                onChange={handleChange}
                className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3 text-sm outline-none transition-colors rounded-none placeholder:text-textMuted/50"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Pricing */}
        <div className="bg-[#111111] border border-accent/20 p-8 shadow-xl">
          <h3 className="font-heading font-bold text-xl text-accent mb-6 flex items-center gap-2">
            Pricing & Packages Constraints
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Silver Price (₹)</label>
              <input 
                type="text" 
                name="silver_price"
                value={settings.silver_price}
                onChange={handleChange}
                className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3 text-sm outline-none transition-colors rounded-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Gold Price (₹)</label>
              <input 
                type="text" 
                name="gold_price"
                value={settings.gold_price}
                onChange={handleChange}
                className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-accent font-bold px-4 py-3 text-sm outline-none transition-colors rounded-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-textMuted uppercase tracking-widest font-bold ml-1">Diamond Price (₹)</label>
              <input 
                type="text" 
                name="diamond_price"
                value={settings.diamond_price}
                onChange={handleChange}
                className="w-full bg-[#080808] border border-accent/20 focus:border-accent text-textPrimary px-4 py-3 text-sm outline-none transition-colors rounded-none"
              />
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex items-center gap-4 pt-4">
          <button 
            type="submit"
            disabled={saving}
            className="bg-accent text-[#080808] font-bold text-[10px] uppercase tracking-widest py-4 px-8 rounded-none flex items-center gap-2 hover:bg-accent/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Synchronizing...' : 'Save Live Configuration'}
          </button>

          {message && (
            <div className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              <AlertCircle className="w-4 h-4" /> {message.text}
            </div>
          )}
        </div>

      </form>
    </div>
  );
}
