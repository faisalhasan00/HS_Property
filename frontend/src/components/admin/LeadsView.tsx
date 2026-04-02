import { useState, useEffect } from 'react';
import { Download, Search, MapPin, Phone, Home } from 'lucide-react';

export function LeadsView() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch leads", err);
        setLoading(false);
      });
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(search.toLowerCase()) || 
    lead.phone?.includes(search)
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-heading font-bold text-3xl text-textPrimary mb-1">Captured Leads</h2>
          <p className="text-textMuted text-[10px] uppercase tracking-widest font-bold">From the Razorpay Booking Modal</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[#111111] border border-accent/20 focus:border-accent text-textPrimary px-10 py-2.5 text-xs outline-none transition-colors rounded-none placeholder:text-textMuted w-full md:w-64"
            />
          </div>
          <button className="bg-accent/10 border border-accent/50 text-accent hover:bg-accent hover:text-[#080808] px-4 py-2.5 flex items-center gap-2 transition-all duration-300 rounded-none text-[10px] font-bold uppercase tracking-wider">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-[#111111] border border-accent/20 overflow-x-auto shadow-2xl">
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#181818] border-b border-accent/20 text-[10px] uppercase tracking-widest font-bold text-textMuted">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Property Info</th>
                <th className="px-6 py-4">Expected Price</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/10">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-textMuted text-xs font-body tracking-wider uppercase">
                    No leads discovered yet.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-accent/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-textPrimary text-sm">{lead.name}</div>
                      <div className="flex items-center gap-1.5 text-textMuted text-xs mt-1">
                        <Phone className="w-3 h-3 text-accent" /> {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent border border-accent/20 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                        {lead.package_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-textPrimary">
                        <MapPin className="w-3.5 h-3.5 text-accent" /> {lead.area}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-textMuted mt-1">
                        <Home className="w-3.5 h-3.5" /> <span className="capitalize">{lead.property_type || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-textPrimary">
                      {lead.expected_price || '—'}
                    </td>
                    <td className="px-6 py-4 text-xs text-textMuted uppercase tracking-wider font-bold">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
