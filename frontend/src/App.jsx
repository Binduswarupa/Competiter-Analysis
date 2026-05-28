import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Target, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  Settings, 
  Sun, 
  Moon, 
  Activity,
  Bell
} from 'lucide-react';
import { INITIAL_COMPETITORS, INITIAL_ALERT_RULES, INITIAL_ALERT_LOGS } from './mockData';

// Component Imports
import CompetitorDashboard from './components/CompetitorDashboard';
import CompetitorInput from './components/CompetitorInput';
import StrategyAnalysis from './components/StrategyAnalysis';
import ComparisonMatrix from './components/ComparisonMatrix';
import TrendIdentification from './components/TrendIdentification';
import AIAssistant from './components/AIAssistant';
import Integrations from './components/Integrations';
import AlertMonitor from './components/AlertMonitor';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Competitors Database State
  const [competitors, setCompetitors] = useState(() => {
    const saved = localStorage.getItem('competitors');
    return saved ? JSON.parse(saved) : INITIAL_COMPETITORS;
  });

  // Alerts & Triggers States
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERT_LOGS;
  });

  const [alertRules, setAlertRules] = useState(() => {
    const saved = localStorage.getItem('alertRules');
    return saved ? JSON.parse(saved) : INITIAL_ALERT_RULES;
  });

  // Active Tab View State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Synchronize theme to document dataset
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Synchronize competitors list to local storage
  useEffect(() => {
    localStorage.setItem('competitors', JSON.stringify(competitors));
  }, [competitors]);

  // Synchronize alerts lists to local storage
  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Synchronize alert rules lists to local storage
  useEffect(() => {
    localStorage.setItem('alertRules', JSON.stringify(alertRules));
  }, [alertRules]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddCompetitor = (newComp) => {
    setCompetitors(prev => [...prev, newComp]);
    setActiveTab('dashboard'); // Redirect to dashboard to see new stats
  };

  const handleDeleteCompetitor = (id) => {
    if (competitors.length <= 1) {
      alert("At least one competitor must remain in the tracking database.");
      return;
    }
    if (window.confirm("Are you sure you want to remove this competitor record?")) {
      setCompetitors(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleUpdateCompetitorPosition = (id, newPosition) => {
    setCompetitors(prev => prev.map(c => 
      c.id === id ? { ...c, positioning: newPosition } : c
    ));
  };

  const handleAddAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  const handleToggleRule = (ruleId) => {
    setAlertRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, active: !r.active } : r
    ));
  };

  // Render sub-view
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CompetitorDashboard competitors={competitors} onNavigate={setActiveTab} />;
      case 'database':
        return (
          <CompetitorInput 
            competitors={competitors} 
            onAddCompetitor={handleAddCompetitor} 
            onDeleteCompetitor={handleDeleteCompetitor} 
          />
        );
      case 'strategy':
        return (
          <StrategyAnalysis 
            competitors={competitors} 
            onUpdatePosition={handleUpdateCompetitorPosition} 
          />
        );
      case 'comparison':
        return <ComparisonMatrix competitors={competitors} />;
      case 'trends':
        return <TrendIdentification competitors={competitors} />;
      case 'ai-assistant':
        return <AIAssistant competitors={competitors} />;
      case 'integrations':
        return <Integrations />;
      case 'alerts':
        return (
          <AlertMonitor 
            alerts={alerts}
            onAddAlert={handleAddAlert}
            onClearAlerts={handleClearAlerts}
            rules={alertRules}
            onToggleRule={handleToggleRule}
            competitors={competitors}
          />
        );
      default:
        return <CompetitorDashboard competitors={competitors} onNavigate={setActiveTab} />;
    }
  };

  // Get active tab title/subtitle
  const getViewHeaders = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: "Executive Dashboard", subtitle: "Real-time market tracking and competitor status logs." };
      case 'database':
        return { title: "Competitor Database", subtitle: "Manage active competitor URLs, domains, and scrapers." };
      case 'strategy':
        return { title: "Strategy Mapping", subtitle: "2D Innovation vs Market Presence quadrant maps. Nodes are draggable." };
      case 'comparison':
        return { title: "Side-by-Side Analysis", subtitle: "Inspect capabilities, features, and web vitals benchmark metrics." };
      case 'trends':
        return { title: "Trend Identification", subtitle: "Analyze review sentiments and emerging industry opportunity gaps." };
      case 'ai-assistant':
        return { title: "AI Strategic Advisor", subtitle: "Generate Swot Analysis charts and ask target strategic questions." };
      case 'integrations':
        return { title: "Integrations & Sync", subtitle: "Link Notion workspaces, Google sheets, and OpenAI API keys." };
      case 'alerts':
        return { title: "Threat Alert Monitor", subtitle: "Configure rules and trigger simulated incidents logs." };
      default:
        return { title: "Competitor Analysis Assistant", subtitle: "AI-Powered Market Intelligence & Strategy Insights" };
    }
  };

  const headers = getViewHeaders();

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <Activity size={22} />
          </div>
          <div className="logo-text">
            <h1>CompIntel</h1>
            <span>Market Intelligence v1.2</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            id="nav-btn-dashboard"
            onClick={() => setActiveTab('dashboard')} 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          
          <button 
            id="nav-btn-database"
            onClick={() => setActiveTab('database')} 
            className={`nav-item ${activeTab === 'database' ? 'active' : ''}`}
          >
            <Database size={18} />
            <span>Competitor DB</span>
          </button>

          <button 
            id="nav-btn-strategy"
            onClick={() => setActiveTab('strategy')} 
            className={`nav-item ${activeTab === 'strategy' ? 'active' : ''}`}
          >
            <Target size={18} />
            <span>Strategy Mapping</span>
          </button>

          <button 
            id="nav-btn-comparison"
            onClick={() => setActiveTab('comparison')} 
            className={`nav-item ${activeTab === 'comparison' ? 'active' : ''}`}
          >
            <Layers size={18} />
            <span>Comparison Grid</span>
          </button>

          <button 
            id="nav-btn-trends"
            onClick={() => setActiveTab('trends')} 
            className={`nav-item ${activeTab === 'trends' ? 'active' : ''}`}
          >
            <TrendingUp size={18} />
            <span>Market Trends</span>
          </button>

          <button 
            id="nav-btn-ai-assistant"
            onClick={() => setActiveTab('ai-assistant')} 
            className={`nav-item ${activeTab === 'ai-assistant' ? 'active' : ''}`}
          >
            <Sparkles size={18} />
            <span>AI SWOT & Chat</span>
          </button>

          <button 
            id="nav-btn-alerts"
            onClick={() => setActiveTab('alerts')} 
            className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            <span>Threat Monitor</span>
            {alerts.length > 0 && (
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--danger)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: '999px',
                lineHeight: 1
              }}>
                {alerts.length}
              </span>
            )}
          </button>

          <button 
            id="nav-btn-integrations"
            onClick={() => setActiveTab('integrations')} 
            className={`nav-item ${activeTab === 'integrations' ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>Integrations</span>
          </button>
        </nav>

        {/* Sidebar Footer details */}
        <div className="sidebar-footer">
          {/* Theme Switcher */}
          <button onClick={toggleTheme} className="theme-toggle-btn" id="theme-toggle">
            {theme === 'dark' ? (
              <>
                <Sun size={14} style={{ color: 'var(--warning)' }} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={14} style={{ color: 'var(--primary)' }} />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Panel Viewport */}
      <main className="main-content">
        <header className="page-header">
          <div className="page-title">
            <h2>{headers.title}</h2>
            <p>{headers.subtitle}</p>
          </div>
        </header>

        {/* Dynamic Inner Content */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {renderActiveView()}
        </div>
      </main>

    </div>
  );
}
