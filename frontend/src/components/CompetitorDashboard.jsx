import React from 'react';
import { 
  TrendingUp, 
  Globe, 
  AlertTriangle, 
  TrendingDown, 
  ArrowUpRight, 
  Activity,
  Layers,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import { MOCK_NEWS } from '../mockData';

export default function CompetitorDashboard({ competitors, onNavigate }) {
  const competitorCount = competitors.length;
  
  // Calculate averages
  const avgSeo = Math.round(competitors.reduce((acc, curr) => acc + curr.metrics.seo, 0) / (competitorCount || 1));
  const avgSpeed = Math.round(competitors.reduce((acc, curr) => acc + curr.metrics.speed, 0) / (competitorCount || 1));
  
  // High-risk event calculation (e.g., negative reviews/threats count)
  const highRiskEventsCount = MOCK_NEWS.filter(item => item.type === 'pricing' || item.type === 'license').length;

  return (
    <div className="dashboard-view animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Overview Cards */}
      <div className="dashboard-grid">
        <div className="glass-card stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Tracked Competitors</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Layers size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{competitorCount}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <TrendingUp size={12} /> Active monitoring online
          </span>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Avg SEO Ranking</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--accent-light)', color: 'var(--accent)' }}>
              <Globe size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{avgSeo}%</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <TrendingUp size={12} /> +1.2% this week
          </span>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Avg Load Performance</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <Activity size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{avgSpeed}ms</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <TrendingUp size={12} /> Steady server latency
          </span>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>High-Risk Events</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--danger-light)', color: 'var(--danger)' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{highRiskEventsCount}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <AlertTriangle size={12} /> Action recommended
          </span>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem' }}>
        
        {/* Competitor Summary Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Active Profiles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {competitors.map((comp) => (
              <div key={comp.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{comp.name}</h4>
                    <span className="badge badge-primary">{comp.industry}</span>
                  </div>
                  <a href={`https://${comp.domain}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '0.75rem' }}>
                    {comp.domain} <ArrowUpRight size={12} />
                  </a>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {comp.description}
                  </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Positioning</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{comp.positioning.x}x / {comp.positioning.y}y</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sent. Positive</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--success)' }}>{comp.sentiment.positive}%</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('strategy')}
                    className="btn btn-secondary" 
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderRadius: '6px' }}
                  >
                    View Strategy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Intel News Feed */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} className="animate-pulse" style={{ color: 'var(--primary)' }} /> 
            Live Competitor Intel
          </h3>
          <div style={{ display: 'flex', flexDrawing: 'column', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '340px', paddingRight: '0.25rem' }}>
            {MOCK_NEWS.map((news) => (
              <div key={news.id} style={{ padding: '0.75rem', borderRadius: '8px', borderLeft: `3px solid ${news.type === 'pricing' || news.type === 'license' ? 'var(--danger)' : 'var(--primary)'}`, background: 'rgba(99, 102, 241, 0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{news.competitor}</span>
                  <span>{news.time}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: 0 }}>{news.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Call to Action Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, var(--primary-light) 0%, rgba(217, 70, 239, 0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Missing competitor details?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', maxWidth: '400px', marginBottom: '1.5rem' }}>
              Add a new business or web URL to automatically analyze positioning, stack, and SWOT analysis profiles instantly.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate('database')}>
              Add Competitor Profile
            </button>
          </div>
          <Compass size={80} style={{ opacity: 0.1, color: 'var(--primary)' }} />
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ready for strategy export?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', maxWidth: '400px', marginBottom: '1.5rem' }}>
              Sync verified strategies directly to Notion boards or Google Sheets pipelines to inform product and sales teams.
            </p>
            <button className="btn btn-secondary" onClick={() => onNavigate('integrations')}>
              Configure Notion & Sheets
            </button>
          </div>
          <FileSpreadsheet size={80} style={{ opacity: 0.1, color: 'var(--accent)' }} />
        </div>
      </div>
      
    </div>
  );
}
