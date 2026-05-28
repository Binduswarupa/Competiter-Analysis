import React from 'react';
import { Check, X, ShieldAlert, Zap, Globe, Sparkles } from 'lucide-react';

export default function ComparisonMatrix({ competitors }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Feature Comparison Section */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Feature Capability Matrix</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Side-by-side audit of product feature availability and developer infrastructure offerings.
        </p>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Capability</th>
                {competitors.map(comp => (
                  <th key={comp.id} style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{comp.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400, textTransform: 'lowercase' }}>{comp.domain}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Industry Sector</strong></td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                    <span className="badge badge-primary">{comp.industry}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td><strong>Standard Pricing (Pro)</strong></td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                    {comp.pricing.pro}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Custom API Access</td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center' }}>
                    {comp.features.api ? (
                      <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success-light)' }}><Check size={14} /></span>
                    ) : (
                      <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--danger-light)' }}><X size={14} /></span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Single Sign-On (SSO)</td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center' }}>
                    {comp.features.sso ? (
                      <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success-light)' }}><Check size={14} /></span>
                    ) : (
                      <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--danger-light)' }}><X size={14} /></span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Advanced Analytics</td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center' }}>
                    {comp.features.analytics ? (
                      <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success-light)' }}><Check size={14} /></span>
                    ) : (
                      <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--danger-light)' }}><X size={14} /></span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Mobile App SDKs</td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center' }}>
                    {comp.features.mobile ? (
                      <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success-light)' }}><Check size={14} /></span>
                    ) : (
                      <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--danger-light)' }}><X size={14} /></span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td>24/7 Dedicated Support</td>
                {competitors.map(comp => (
                  <td key={comp.id} style={{ textAlign: 'center' }}>
                    {comp.features.support247 ? (
                      <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success-light)' }}><Check size={14} /></span>
                    ) : (
                      <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--danger-light)' }}><X size={14} /></span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Benchmarking Scorecard */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Digital Performance Scorecard</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Automated web scrape measurements indicating engineering, marketing, and SEO health.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {competitors.map(comp => (
            <div key={comp.id} style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-heading)' }}>{comp.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comp.domain}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                
                {/* Speed score */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Page Load Performance</span>
                    <span style={{ fontWeight: 600 }}>{comp.metrics.speed}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${comp.metrics.speed}%`, height: '100%', background: 'var(--success)', borderRadius: '4px', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>

                {/* SEO Score */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>SEO Ranking Strength</span>
                    <span style={{ fontWeight: 600 }}>{comp.metrics.seo}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${comp.metrics.seo}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>

                {/* Social Engagement */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Social Engagement Index</span>
                    <span style={{ fontWeight: 600 }}>{comp.metrics.social}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${comp.metrics.social}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
