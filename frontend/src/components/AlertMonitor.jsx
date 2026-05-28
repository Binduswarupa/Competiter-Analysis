import React, { useState } from 'react';
import { Bell, Settings, AlertTriangle, AlertCircle, Info, Play, Trash2, Filter } from 'lucide-react';

export default function AlertMonitor({ alerts, onAddAlert, onClearAlerts, rules, onToggleRule, competitors }) {
  const [targetComp, setTargetComp] = useState(competitors[0]?.id || 'stripe');
  const [threatType, setThreatType] = useState('pricing');

  const handleSimulate = () => {
    const compObj = competitors.find(c => c.id === targetComp);
    const compName = compObj ? compObj.name : 'Competitor';
    
    let title = '';
    let text = '';
    let severity = 'INFO';

    if (threatType === 'pricing') {
      title = `${compName} Pricing Revision`;
      text = `${compName} updated their core Pro Tier transaction rates from ${compObj?.pricing?.pro || 'variable'} to a custom subscription model.`;
      severity = 'HIGH';
    } else if (threatType === 'downtime') {
      title = `${compName} Service Downtime`;
      text = `Scraper sensors detected a 404 response on ${compObj?.domain || 'competitor.com'} checkout API sub-routes. Latency spike: +1,200ms.`;
      severity = 'HIGH';
    } else if (threatType === 'seo') {
      title = `${compName} SEO Score Alert`;
      text = `Daily crawler detected a drop in organic keywords rank for ${compObj?.domain || 'competitor.com'}. SEO index now at ${Math.max(50, (compObj?.metrics?.seo || 80) - 8)}%.`;
      severity = 'WARNING';
    } else {
      title = `${compName} DNS Update`;
      text = `Competitor refreshed active SPF/DKIM authentication records for email marketing outreach domains.`;
      severity = 'INFO';
    }

    const newAlert = {
      id: 'log-' + Date.now(),
      severity,
      time: 'Just now',
      title,
      text
    };

    onAddAlert(newAlert);
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'HIGH': return 'badge-danger';
      case 'WARNING': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'HIGH': return <AlertCircle size={16} style={{ color: 'var(--danger)' }} />;
      case 'WARNING': return <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />;
      default: return <Info size={16} style={{ color: 'var(--primary)' }} />;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Alert Header Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--danger-light)', color: 'var(--danger)' }}>
            <Bell size={24} className={alerts.some(a => a.severity === 'HIGH') ? 'animate-pulse' : ''} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>Active Alert Incidents</span>
            <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{alerts.filter(a => a.severity === 'HIGH' || a.severity === 'WARNING').length}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Settings size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>Active Scraper Rules</span>
            <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{rules.filter(r => r.active).length} / {rules.length}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <button className="btn btn-danger" onClick={onClearAlerts} style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            <Trash2 size={14} /> Clear Log Feed
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem' }}>
        
        {/* Settings & Simulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Rules List */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={18} style={{ color: 'var(--primary)' }} />
              Scraper Rules Configuration
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Enable or disable autonomous background triggers for web metric alerts.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {rules.map(rule => (
                <label key={rule.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-main)', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', hover: 'background: var(--border-color)', transition: '0.2s' }}>
                  <input
                    type="checkbox"
                    checked={rule.active}
                    onChange={() => onToggleRule(rule.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: 'var(--primary)',
                      cursor: 'pointer'
                    }}
                  />
                  <span>{rule.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Simulator Console */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={18} style={{ color: 'var(--accent)' }} />
              Incident Trigger Simulator
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Force-simulate competitor actions to test threat notification pipelines.
            </p>

            <div className="form-group">
              <label>Target Competitor</label>
              <select 
                className="form-select" 
                value={targetComp} 
                onChange={(e) => setTargetComp(e.target.value)}
              >
                {competitors.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.domain})</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Threat Event Scenario</label>
              <select 
                className="form-select" 
                value={threatType} 
                onChange={(e) => setThreatType(e.target.value)}
              >
                <option value="pricing">Pricing Policy Shift (High Severity)</option>
                <option value="downtime">API Downtime Event (High Severity)</option>
                <option value="seo">SEO Meta tag Drop (Warning Severity)</option>
                <option value="dns">Domain DNS Record Refresh (Info Severity)</option>
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleSimulate} style={{ width: '100%' }}>
              Fire Simulated Threat Event
            </button>
          </div>

        </div>

        {/* Live Logs Console */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '450px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={18} style={{ color: 'var(--danger)' }} />
            Real-time Threat Intelligence Feed
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Historical record of triggered notifications and scraper incidents.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flexGrow: 1, maxHeight: '400px', paddingRight: '0.25rem' }}>
            {alerts.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'var(--text-muted)', gap: '0.5rem', height: '250px' }}>
                <Bell size={32} style={{ opacity: 0.3 }} />
                <span style={{ fontSize: '0.85rem' }}>No threat events triggered. Log feed is empty.</span>
              </div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  borderLeft: `5px solid ${alert.severity === 'HIGH' ? 'var(--danger)' : alert.severity === 'WARNING' ? 'var(--warning)' : 'var(--primary)'}`,
                  background: alert.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.02)' : alert.severity === 'WARNING' ? 'rgba(245, 158, 11, 0.02)' : 'rgba(99, 102, 241, 0.02)',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getSeverityIcon(alert.severity)}
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>{alert.title}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge ${getSeverityBadgeClass(alert.severity)}`} style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                        {alert.severity}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                    {alert.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
