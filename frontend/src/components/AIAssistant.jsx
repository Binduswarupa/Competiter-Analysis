import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, ShieldCheck, ShieldAlert, Award, Compass } from 'lucide-react';
import { getBotResponse } from '../mockData';

const SUGGESTED_PROMPTS = [
  "How can we beat Stripe on pricing?",
  "What is Adyen's primary weakness?",
  "What are the future market opportunities?"
];

export default function AIAssistant({ competitors }) {
  const [selectedCompId, setSelectedCompId] = useState(competitors[0]?.id || '');
  const selectedComp = competitors.find(c => c.id === selectedCompId) || competitors[0];

  // Chat States
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am your AI Market Intelligence Assistant. Ask me anything about your competitors, market positioning, or strategic opportunities.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // User Message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Response Simulation with a realistic typing delay
    setTimeout(() => {
      const responseText = getBotResponse(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 850);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '2rem', height: 'calc(100vh - 12rem)' }}>
      
      {/* Interactive Chat Board */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          Strategic Advisor Chat
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Ask strategic questions regarding product positioning, weakness capitalization, or pricing.
        </p>

        {/* Chat History */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '1rem',
          background: 'var(--bg-base)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: isUser ? 'var(--primary)' : 'var(--bg-card)',
                  color: isUser ? '#fff' : 'var(--text-main)',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  borderTopRightRadius: isUser ? '2px' : '12px',
                  borderTopLeftRadius: isUser ? '12px' : '2px',
                  border: isUser ? 'none' : '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '0.85rem',
                  lineHeight: 1.4
                }}
              >
                {msg.text}
              </div>
            );
          })}
          {isTyping && (
            <div style={{
              alignSelf: 'flex-start',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              borderTopLeftRadius: '2px',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              fontStyle: 'italic'
            }}>
              AI is analyzing competitor data...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '15px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-base)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.color = 'var(--primary)';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.color = 'var(--text-main)';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat input form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          style={{ display: 'flex', gap: '0.5rem' }}
        >
          <input 
            type="text" 
            className="form-input" 
            placeholder="Ask about weakness, strengths, or market opportunities..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* SWOT Matrix Board */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Strategic SWOT Analysis</h3>
          
          <select 
            className="form-select" 
            value={selectedCompId}
            onChange={(e) => setSelectedCompId(e.target.value)}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', width: '160px' }}
          >
            {competitors.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.name}</option>
            ))}
          </select>
        </div>

        {selectedComp ? (
          <div style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            flexGrow: 1,
            overflowY: 'auto'
          }}>
            
            {/* Strengths */}
            <div style={{
              background: 'linear-gradient(135deg, var(--success-light) 0%, rgba(255,255,255,0) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem 1rem'
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                <ShieldCheck size={14} /> STRENGTHS
              </h4>
              <ul style={{ fontSize: '0.775rem', paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-main)' }}>
                {selectedComp.swot.strengths.map((str, i) => <li key={i}>{str}</li>)}
              </ul>
            </div>

            {/* Weaknesses */}
            <div style={{
              background: 'linear-gradient(135deg, var(--danger-light) 0%, rgba(255,255,255,0) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem 1rem'
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                <ShieldAlert size={14} /> WEAKNESSES
              </h4>
              <ul style={{ fontSize: '0.775rem', paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-main)' }}>
                {selectedComp.swot.weaknesses.map((weak, i) => <li key={i}>{weak}</li>)}
              </ul>
            </div>

            {/* Opportunities */}
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-light) 0%, rgba(255,255,255,0) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem 1rem'
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                <Compass size={14} /> OPPORTUNITIES
              </h4>
              <ul style={{ fontSize: '0.775rem', paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-main)' }}>
                {selectedComp.swot.opportunities.map((opp, i) => <li key={i}>{opp}</li>)}
              </ul>
            </div>

            {/* Threats */}
            <div style={{
              background: 'linear-gradient(135deg, var(--warning-light) 0%, rgba(255,255,255,0) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.75rem 1rem'
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                <AlertTriangle size={14} /> THREATS
              </h4>
              <ul style={{ fontSize: '0.775rem', paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-main)' }}>
                {selectedComp.swot.threats.map((thr, i) => <li key={i}>{thr}</li>)}
              </ul>
            </div>

          </div>
        ) : (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select a competitor from the database to load SWOT analysis.</p>
        )}
      </div>

    </div>
  );
}
