import React, { useState, useEffect, useRef } from 'react';
import { Target, DollarSign, Award } from 'lucide-react';

export default function StrategyAnalysis({ competitors, onUpdatePosition }) {
  const [selectedCompId, setSelectedCompId] = useState(competitors[0]?.id || '');
  const selectedComp = competitors.find(c => c.id === selectedCompId) || competitors[0];

  const mapRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCompId, setDraggedCompId] = useState(null);

  useEffect(() => {
    if (!isDragging || !draggedCompId) return;

    const handlePointerMove = (e) => {
      if (!mapRef.current) return;
      const rect = mapRef.current.getBoundingClientRect();
      
      // Convert absolute coordinates into 0-100 percentage coordinates
      let x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      let y = Math.round((1 - (e.clientY - rect.top) / rect.height) * 100);
      
      // Clamp coordinates to visual boundaries (5% to 95% padding)
      x = Math.min(95, Math.max(5, x));
      y = Math.min(95, Math.max(5, y));

      if (onUpdatePosition) {
        onUpdatePosition(draggedCompId, { x, y });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setDraggedCompId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, draggedCompId, onUpdatePosition]);

  const startDrag = (e, id) => {
    e.preventDefault();
    setIsDragging(true);
    setDraggedCompId(id);
    setSelectedCompId(id);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Grid: Map + Side Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '2rem' }}>
        
        {/* Positioning Quadrant Map */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Market Positioning Map</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Interactive scatter quadrant mapping competitor scale against feature innovation. <strong>Drag any bubble</strong> to adjust their positioning.
          </p>

          {/* 2D Grid Plot */}
          <div 
            ref={mapRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              border: '2px solid var(--border-color)',
              borderRadius: '12px',
              background: 'var(--bg-base)',
              overflow: 'hidden',
              margin: '0.5rem 0',
              touchAction: 'none' // Prevent scrolling while dragging on mobile
            }}
          >
            {/* Axis Labels */}
            <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', pointerEvents: 'none' }}>
              Innovation Level &rarr;
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', pointerEvents: 'none' }}>
              Market Presence &rarr;
            </div>

            {/* Quadrant Lines */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: '1px dashed var(--border-color)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed var(--border-color)', pointerEvents: 'none' }}></div>

            {/* Quadrant Labels */}
            <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, background: 'rgba(99, 102, 241, 0.05)', padding: '2px 8px', borderRadius: '4px', pointerEvents: 'none' }}>
              MARKET LEADERS
            </div>
            <div style={{ position: 'absolute', top: '15px', left: '15px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, background: 'rgba(217, 70, 239, 0.05)', padding: '2px 8px', borderRadius: '4px', pointerEvents: 'none' }}>
              VISIONARIES
            </div>
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, background: 'rgba(16, 185, 129, 0.05)', padding: '2px 8px', borderRadius: '4px', pointerEvents: 'none' }}>
              NICHE/CHALLENGERS
            </div>
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, background: 'var(--border-color)', padding: '2px 8px', borderRadius: '4px', pointerEvents: 'none' }}>
              CONTENDERS
            </div>

            {/* Competitor Bubbles */}
            {competitors.map((comp) => {
              const isActive = comp.id === selectedCompId;
              const isCompDragging = comp.id === draggedCompId;
              return (
                <div
                  key={comp.id}
                  onPointerDown={(e) => startDrag(e, comp.id)}
                  style={{
                    position: 'absolute',
                    left: `calc(${comp.positioning.x}% - 18px)`,
                    bottom: `calc(${comp.positioning.y}% - 18px)`,
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: isActive ? '3px solid #fff' : '1px solid var(--border-color)',
                    background: isActive 
                      ? 'linear-gradient(135deg, var(--primary), var(--accent))' 
                      : 'rgba(99, 102, 241, 0.3)',
                    color: isActive ? '#fff' : 'var(--text-heading)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: isCompDragging ? 'grabbing' : 'grab',
                    boxShadow: isActive ? '0 0 15px var(--primary)' : 'var(--shadow-sm)',
                    transform: isCompDragging ? 'scale(1.2)' : 'scale(1)',
                    zIndex: isActive ? 10 : 2,
                    userSelect: 'none'
                  }}
                  title={`${comp.name} (${comp.positioning.x}x, ${comp.positioning.y}y)`}
                >
                  {comp.name.substring(0, 2).toUpperCase()}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {competitors.map(comp => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: comp.id === selectedCompId ? 'var(--primary)' : 'var(--bg-card)',
                  color: comp.id === selectedCompId ? '#fff' : 'var(--text-main)',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Competitor Overview */}
        {selectedComp && (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifycontent: 'space-between', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{selectedComp.name}</h3>
                <span className="badge badge-primary">{selectedComp.industry}</span>
              </div>

              <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                  Value Proposition
                </span>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', margin: 0 }}>
                  {selectedComp.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '6px', background: 'var(--primary-light)', color: 'var(--primary)', marginTop: '0.15rem' }}>
                    <Target size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Strategy Focus</h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', marginTop: '0.15rem' }}>
                      {selectedComp.strategy}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '6px', background: 'var(--accent-light)', color: 'var(--accent)', marginTop: '0.15rem' }}>
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Positioning Coordinates</h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', marginTop: '0.15rem' }}>
                      Market Presence: <strong>{selectedComp.positioning.x} / 100</strong> | Innovation Index: <strong>{selectedComp.positioning.y} / 100</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={16} style={{ color: 'var(--success)' }} />
                Pricing Model Structure
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-base)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Free / Entry</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{selectedComp.pricing.free}</span>
                </div>
                <div style={{ background: 'var(--bg-base)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--primary-light)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Professional</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>{selectedComp.pricing.pro}</span>
                </div>
                <div style={{ background: 'var(--bg-base)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Enterprise</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{selectedComp.pricing.enterprise}</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
