import React, { useState } from 'react';
import { Plus, Trash2, Globe, FileText, RefreshCw } from 'lucide-react';
import { generateCompetitorData } from '../mockData';

const DEMO_PREFILLS = [
  { name: "Slack", domain: "slack.com", industry: "SaaS / Collaboration", desc: "Digital headquarters platform connecting teams with channels, search, and integrated productivity tools." },
  { name: "Zoom", domain: "zoom.us", industry: "SaaS / Video", desc: "Cloud-native video communication software offering high-definition video conferencing, webinars, and chat integrations." },
  { name: "Shopify", domain: "shopify.com", industry: "E-commerce", desc: "Complete commerce platform that lets anyone start, grow, manage, and scale a retail business online and offline." },
  { name: "OpenAI", domain: "openai.com", industry: "AI / Technology", desc: "AI research and deployment company developing friendly artificial general intelligence and API integrations like ChatGPT." }
];

export default function CompetitorInput({ competitors, onAddCompetitor, onDeleteCompetitor }) {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [industry, setIndustry] = useState('Fintech / Payments');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !domain) return;
    
    // Generate complete competitor profile with SWOT, metrics, positioning, and sentiment
    const newCompetitor = generateCompetitorData(name, domain, industry, description);
    onAddCompetitor(newCompetitor);
    
    // Reset form
    setName('');
    setDomain('');
    setDescription('');
  };

  const handlePrefill = (prefill) => {
    setName(prefill.name);
    setDomain(prefill.domain);
    setIndustry(prefill.industry);
    setDescription(prefill.desc);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem' }}>
      
      {/* Competitor Form */}
      <div className="glass-card" style={{ height: 'fit-content' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} style={{ color: 'var(--primary)' }} />
          Add Competitor
        </h3>
        
        {/* Quick Prefill Chips */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            QUICK DEMO PRE-FILLS
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {DEMO_PREFILLS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handlePrefill(item)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--primary)';
                  e.target.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'var(--primary-light)';
                  e.target.style.color = 'var(--primary)';
                }}
              >
                + {item.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comp-name">Business Name</label>
            <input 
              id="comp-name"
              type="text" 
              className="form-input" 
              placeholder="e.g. Shopify"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comp-domain">Domain URL</label>
            <input 
              id="comp-domain"
              type="text" 
              className="form-input" 
              placeholder="e.g. shopify.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comp-industry">Industry Sector</label>
            <select 
              id="comp-industry"
              className="form-select"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="Fintech / Payments">Fintech / Payments</option>
              <option value="SaaS / Collaboration">SaaS / Collaboration</option>
              <option value="SaaS / Video">SaaS / Video</option>
              <option value="E-commerce">E-commerce</option>
              <option value="AI / Technology">AI / Technology</option>
              <option value="Logistics / Supply Chain">Logistics / Supply Chain</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label htmlFor="comp-desc">Value Proposition / Description</label>
            <textarea 
              id="comp-desc"
              className="form-textarea" 
              rows="4" 
              placeholder="Brief description of product offerings, target audience, and market approach..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Add and Scrape Metrics
          </button>
        </form>
      </div>

      {/* Database View / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Monitored Competitors Database</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{competitors.length} active records</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '550px', paddingRight: '0.25rem' }}>
          {competitors.map((comp) => (
            <div key={comp.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{comp.name}</h4>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{comp.industry}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Globe size={12} /> {comp.domain}
                  </span>
                  <span>|</span>
                  <span>ID: {comp.id}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  {comp.description}
                </p>

                {/* Simulated Scraped Tech stats */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEO Health</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>{comp.metrics.seo}%</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Page Speed</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success)' }}>{comp.metrics.speed}ms</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Social Score</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)' }}>{comp.metrics.social}%</span>
                  </div>
                </div>
              </div>

              {/* Prevent default competitors from being deleted to keep baseline, or allow deletion with clean status */}
              <button 
                onClick={() => onDeleteCompetitor(comp.id)}
                className="btn btn-danger" 
                style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', alignSelf: 'center', marginLeft: '1rem' }}
                title="Remove Competitor"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
