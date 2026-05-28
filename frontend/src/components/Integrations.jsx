import React, { useState } from 'react';
import { Database, FileSpreadsheet, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Integrations() {
  // Connection states
  const [sheetsConnected, setSheetsConnected] = useState(false);
  const [sheetsSyncing, setSheetsSyncing] = useState(false);
  const [sheetsLogs, setSheetsLogs] = useState([]);
  
  const [notionConnected, setNotionConnected] = useState(false);
  const [notionSyncing, setNotionSyncing] = useState(false);
  const [notionLogs, setNotionLogs] = useState([]);

  const [chatGptKey, setChatGptKey] = useState('');
  const [chatGptModel, setChatGptModel] = useState('gpt-4o');

  // Sheets Sync simulation
  const runSheetsSync = () => {
    setSheetsSyncing(true);
    setSheetsLogs(["[System] Connecting to Google Drive OAuth service..."]);
    
    setTimeout(() => {
      setSheetsLogs(prev => [...prev, "[System] Checking spreadsheet columns..."]);
    }, 600);

    setTimeout(() => {
      setSheetsLogs(prev => [...prev, "[Data] Merging competitor metrics rows..."]);
    }, 1200);

    setTimeout(() => {
      setSheetsLogs(prev => [...prev, "[Success] Google Sheet Sync Complete: 3 active rows updated."]);
      setSheetsSyncing(false);
      setSheetsConnected(true);
    }, 2000);
  };

  // Notion Sync simulation
  const runNotionSync = () => {
    setNotionSyncing(true);
    setNotionLogs(["[Notion] Authenticating via Integration Token..."]);
    
    setTimeout(() => {
      setNotionLogs(prev => [...prev, "[Notion] Loading Database ID: /d591c9..."]);
    }, 600);

    setTimeout(() => {
      setNotionLogs(prev => [...prev, "[Notion] Inserting/updating block elements for competitor cards..."]);
    }, 1300);

    setTimeout(() => {
      setNotionLogs(prev => [...prev, "[Success] Notion Workspace Sync Complete: Database page updated."]);
      setNotionSyncing(false);
      setNotionConnected(true);
    }, 2200);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
      
      {/* Google Sheets Workspace Integration */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSpreadsheet size={20} style={{ color: 'var(--success)' }} />
            Google Sheets Workspace
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Export performance metrics and feature comparisons to a shared company spreadsheet pipeline.
          </p>

          <div className="form-group">
            <label htmlFor="sheet-id">Spreadsheet Reference ID</label>
            <input 
              id="sheet-id"
              type="text" 
              className="form-input" 
              placeholder="e.g. 1tY7gN9h91Bq..." 
              defaultValue="1competitor-analysis-sheet-2026"
            />
          </div>

          {/* Sync logs display */}
          {sheetsLogs.length > 0 && (
            <div style={{
              background: 'var(--bg-base)',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              marginBottom: '1rem',
              maxHeight: '120px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {sheetsLogs.map((log, index) => (
                <div key={index} style={{ color: log.startsWith('[Success]') ? 'var(--success)' : 'var(--text-main)' }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {sheetsConnected ? (
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} /> Synchronized
              </span>
            ) : (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Connection configured</span>
            )}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={runSheetsSync} 
            disabled={sheetsSyncing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '130px' }}
          >
            {sheetsSyncing ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Syncing...
              </>
            ) : (
              <>
                <RefreshCw size={14} /> Sync Sheets
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notion Workspace Integration */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={20} style={{ color: 'var(--primary)' }} />
            Notion Wiki Database
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Keep sales cards and SWOT reviews updated inside your corporate Notion database.
          </p>

          <div className="form-group">
            <label htmlFor="notion-db">Notion Database Link</label>
            <input 
              id="notion-db"
              type="text" 
              className="form-input" 
              placeholder="e.g. https://notion.so/..."
              defaultValue="https://notion.so/workspace/Competitor-Analysis-b59a"
            />
          </div>

          {/* Sync logs display */}
          {notionLogs.length > 0 && (
            <div style={{
              background: 'var(--bg-base)',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontFamily: 'var(--mono)',
              fontSize: '0.7rem',
              marginBottom: '1rem',
              maxHeight: '120px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {notionLogs.map((log, index) => (
                <div key={index} style={{ color: log.startsWith('[Success]') ? 'var(--success)' : 'var(--text-main)' }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {notionConnected ? (
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} /> Synchronized
              </span>
            ) : (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Connection configured</span>
            )}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={runNotionSync} 
            disabled={notionSyncing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '130px' }}
          >
            {notionSyncing ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Syncing...
              </>
            ) : (
              <>
                <RefreshCw size={14} /> Sync Notion
              </>
            )}
          </button>
        </div>
      </div>

      {/* ChatGPT AI Assistant Configuration */}
      <div className="glass-card" style={{ gridColumn: 'span 2' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={18} style={{ color: 'var(--accent)' }} />
          AI Engine Integration (ChatGPT)
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Optionally input your OpenAI API credentials to unlock custom live scrapes and detailed prompt inquiries.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label htmlFor="chatgpt-key">OpenAI API Key</label>
            <input 
              id="chatgpt-key"
              type="password" 
              className="form-input" 
              placeholder="sk-proj-........................" 
              value={chatGptKey}
              onChange={(e) => setChatGptKey(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="chatgpt-model">LLM Model Target</label>
            <select 
              id="chatgpt-model"
              className="form-select"
              value={chatGptModel}
              onChange={(e) => setChatGptModel(e.target.value)}
            >
              <option value="gpt-4o">GPT-4o (Default)</option>
              <option value="gpt-4">GPT-4 Turbo</option>
              <option value="o1-mini">o1 Mini Reasoning</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem', background: 'var(--bg-base)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Status: {chatGptKey ? <strong>Live OpenAI API Active</strong> : <strong>Simulated Offline Mode Active</strong>}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            No credentials are saved on any external servers.
          </span>
        </div>
      </div>

    </div>
  );
}
