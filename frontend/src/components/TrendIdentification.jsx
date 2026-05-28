import React, { useState } from 'react';
import { Sparkles, TrendingUp, MessageSquare, ArrowRight, Quote } from 'lucide-react';

const DETECTED_OPPORTUNITIES = [
  {
    title: "Alternative Payment Methods (APMs)",
    desc: "Competitors Adyen and Paddle are slow to update regional integrations (like Pix in Brazil and UPI in India). Developing native modules for these channels could attract localized start-up markets.",
    urgency: "HIGH",
    difficulty: "Medium"
  },
  {
    title: "Developer Documentation Tooling",
    desc: "While Stripe has exceptional docs, their direct integrations can be overwhelming for smaller developer teams who prefer zero-configuration SDKs. Developing no-code wrappers offers an immediate market entry.",
    urgency: "MEDIUM",
    difficulty: "Low"
  },
  {
    title: "Real-time Blockchain Settlements",
    desc: "Competitor analysis indicates Stripe is experimenting with USDC but does not support direct smart-contract settlement pools. Adding direct multichain support positions us as a Web3 native leader.",
    urgency: "HIGH",
    difficulty: "Hard"
  }
];

export default function TrendIdentification({ competitors }) {
  const [selectedCompId, setSelectedCompId] = useState(competitors[0]?.id || 'stripe');
  const activeComp = competitors.find(c => c.id === selectedCompId) || competitors[0];
  const [activeKeyword, setActiveKeyword] = useState(null);

  const handleCompChange = (e) => {
    setSelectedCompId(e.target.value);
    setActiveKeyword(null); // Reset active quote
  };

  const getKeywordColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'var(--success)';
      case 'negative': return 'var(--danger)';
      default: return 'var(--text-main)';
    }
  };

  const getKeywordBg = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'var(--success-light)';
      case 'negative': return 'var(--danger-light)';
      default: return 'var(--border-color)';
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Grid: Sentiment Chart + Market Trends */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr', gap: '2rem' }}>
        
        {/* Sentiment Analysis Bar Grid */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Customer Sentiment Breakdown</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Aggregated sentiment indicators based on forum mentions, G2 reviews, and community threads.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {competitors.map(comp => (
                <div key={comp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-heading)' }}>{comp.name}</span>
                    <span style={{ color: 'var(--success)' }}>{comp.sentiment.positive}% Positive</span>
                  </div>

                  {/* Segmented Progress Bar */}
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    height: '12px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: 'var(--bg-base)'
                  }}>
                    <div 
                      style={{ width: `${comp.sentiment.positive}%`, background: 'var(--success)', height: '100%', transition: 'all 0.5s' }}
                      title={`Positive: ${comp.sentiment.positive}%`}
                    ></div>
                    <div 
                      style={{ width: `${comp.sentiment.neutral}%`, background: '#94a3b8', height: '100%', transition: 'all 0.5s' }}
                      title={`Neutral: ${comp.sentiment.neutral}%`}
                    ></div>
                    <div 
                      style={{ width: `${comp.sentiment.negative}%`, background: 'var(--danger)', height: '100%', transition: 'all 0.5s' }}
                      title={`Negative: ${comp.sentiment.negative}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend Details */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></span> Positive
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></span> Neutral
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></span> Negative
            </span>
          </div>
        </div>

        {/* Industry Interest Trends */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Search Trend Indicators</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Simulated Google Search Volume and developer interest index over the past 30 days.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {competitors.map(comp => (
              <div key={comp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(99, 102, 241, 0.01)' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{comp.name} search queries</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Trending keyword index</span>
                </div>
                
                {/* SVG Sparkline */}
                <div style={{ width: '100px', height: '30px' }}>
                  <svg viewBox="0 0 100 30" style={{ width: '100%', height: '100%' }}>
                    <path
                      d={comp.id === 'stripe' 
                        ? "M 0 18 Q 20 8 40 22 T 80 5 T 100 12" 
                        : comp.id === 'adyen'
                        ? "M 0 25 Q 30 18 60 12 T 100 5"
                        : "M 0 12 Q 25 22 50 10 T 100 20"}
                      fill="none"
                      stroke={comp.id === 'stripe' ? 'var(--primary)' : comp.id === 'adyen' ? 'var(--success)' : 'var(--accent)'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: comp.id === 'stripe' || comp.id === 'adyen' ? 'var(--success)' : 'var(--warning)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <TrendingUp size={14} /> 
                  {comp.id === 'stripe' ? '+18%' : comp.id === 'adyen' ? '+8%' : '+3%'}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Keywords Cloud Section */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} style={{ color: 'var(--primary)' }} />
              Customer Reviews Word Cloud
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Most frequent review keywords. Click tags to read representative customer quotes.
            </p>
          </div>
          <div>
            <select 
              className="form-select" 
              value={selectedCompId} 
              onChange={handleCompChange}
              style={{ padding: '0.5rem 1.5rem 0.5rem 0.75rem', fontSize: '0.85rem' }}
            >
              {competitors.map(c => (
                <option key={c.id} value={c.id}>{c.name} Reviews</option>
              ))}
            </select>
          </div>
        </div>

        {/* Word Cloud Container */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.85rem',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--bg-base)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          minHeight: '120px'
        }}>
          {activeComp.reviewKeywords?.map((kw, idx) => {
            const isSelected = activeKeyword?.word === kw.word;
            // Scale font sizes dynamically from 0.8rem to 1.3rem depending on count
            const fontSize = `${0.8 + (kw.count / 80) * 0.5}rem`;
            return (
              <button
                key={idx}
                onClick={() => setActiveKeyword(kw)}
                style={{
                  fontSize,
                  background: isSelected ? getKeywordColor(kw.sentiment) : getKeywordBg(kw.sentiment),
                  color: isSelected ? 'white' : getKeywordColor(kw.sentiment),
                  border: isSelected ? '1px solid transparent' : `1px solid ${getKeywordColor(kw.sentiment)}`,
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 4px 10px rgba(99, 102, 241, 0.2)` : 'none',
                  transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                  userSelect: 'none'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {kw.word} ({kw.count})
              </button>
            );
          })}
        </div>

        {/* Quote Overlay Block */}
        {activeKeyword && (
          <div className="animate-fade-in" style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            borderLeft: `4px solid ${getKeywordColor(activeKeyword.sentiment)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Quote size={12} style={{ color: getKeywordColor(activeKeyword.sentiment) }} />
                Review focus: <strong>{activeKeyword.word}</strong>
              </span>
              <span>Scraped Frequency: <strong>{activeKeyword.count} mentions</strong></span>
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-heading)', margin: 0, lineHeight: 1.5 }}>
              "{activeKeyword.quote}"
            </p>
          </div>
        )}
      </div>

      {/* Emerging Opportunities List */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--accent)' }} />
          Emerging Market Opportunities
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {DETECTED_OPPORTUNITIES.map((opp, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: `4px solid ${opp.urgency === 'HIGH' ? 'var(--accent)' : 'var(--primary)'}` }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className={`badge ${opp.urgency === 'HIGH' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                    {opp.urgency} URGENCY
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Complexity: <strong>{opp.difficulty}</strong></span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{opp.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {opp.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                Create Strategy Card <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
