import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log("main.tsx: Starting execution");
try {
  sessionStorage.removeItem('boot_retries');
  sessionStorage.removeItem('last_retry_time');
} catch (e) {}

// GLOBAL ERROR CATCHER for non-React errors
window.onerror = function(message, source, lineno, colno, error) {
  const msg = `CRITICAL JS ERROR: ${message} at ${source}:${lineno}:${colno}`;
  console.error(msg, error);
  const debug = document.createElement('div');
  debug.id = 'debug-overlay';
  debug.style.position = 'fixed';
  debug.style.top = '0';
  debug.style.left = '0';
  debug.style.width = '100%';
  debug.style.height = '100%';
  debug.style.background = '#220000';
  debug.style.color = '#ff5555';
  debug.style.zIndex = '999999';
  debug.style.padding = '40px';
  debug.style.fontFamily = 'monospace';
  debug.style.overflow = 'auto';
  debug.innerHTML = `
    <h1 style="border-bottom: 2px solid #ff5555; padding-bottom: 10px;">FATAL SYSTEM EXCEPTION</h1>
    <p style="font-size: 18px; font-weight: bold;">${msg}</p>
    <div style="background: #000; padding: 20px; border-radius: 8px; border: 1px solid #ff5555; margin-top: 20px;">
      <pre style="white-space: pre-wrap; font-size: 12px;">${error?.stack || 'No stack trace available'}</pre>
    </div>
    <div style="margin-top: 30px; display: flex; gap: 20px;">
      <button onclick="try { localStorage.clear(); sessionStorage.clear(); } catch(e){} window.location.reload();" style="background: #ff5555; color: white; border: none; padding: 12px 24px; cursor: pointer; font-weight: bold; font-family: monospace;">PURGE CACHE & RELOAD</button>
      <button onclick="document.getElementById('debug-overlay').remove()" style="background: #444; color: white; border: none; padding: 12px 24px; cursor: pointer; font-weight: bold; font-family: monospace;">DISMISS</button>
    </div>
  `;
  document.body.appendChild(debug);
  return false;
};

// GLOBAL UNHANDLED REJECTION CATCHER
window.addEventListener('unhandledrejection', function(event) {
  const reason = event.reason;
  const msg = reason instanceof Error ? reason.message : String(reason);
  console.warn("GLOBAL UNHANDLED REJECTION INTERCEPTED:", msg, reason);
  event.preventDefault(); // Prevents the error from crashing the boot detector
});

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("CRITICAL UI ERROR:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05060a] text-[#06b6d4] flex flex-col items-center justify-center p-8 font-mono border-4 border-red-900/20">
          <div className="max-w-2xl w-full space-y-6">
            <h1 className="text-4xl font-black tracking-tighter text-red-500 animate-pulse">SYSTEM_HALT: RUNTIME_ERROR</h1>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-xs overflow-auto max-h-[400px]">
              <p className="font-bold mb-2">ERROR_TRACE {new Date().toISOString()}</p>
              <pre className="text-red-400 break-words whitespace-pre-wrap">{this.state.error?.stack || this.state.error?.message}</pre>
            </div>
            <p className="text-sm text-slate-400">CATACLYSMIC LOGIC FAILURE DETECTED. NEURAL LINK DISCONNECTED.</p>
            <button 
              onClick={() => { try { localStorage.clear(); } catch(e){} window.location.href = window.location.pathname + '?reset=true'; }}
              className="px-6 py-3 bg-red-500 text-black font-bold rounded-lg hover:bg-red-400 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              PURGE CACHE & FORCE RECONNECT
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("main.tsx: Imports complete, initializing React root...");

const container = document.getElementById('root');
if (!container) {
  console.error("FATAL: Root container not found with ID 'root'");
  const errorMsg = document.createElement('div');
  errorMsg.style.color = 'red';
  errorMsg.style.padding = '20px';
  errorMsg.innerHTML = '<h1>FATAL: CANNOT FIND DOM_ROOT</h1>';
  document.body.appendChild(errorMsg);
} else {
  try {
    const root = createRoot(container);
    root.render(
      <ErrorBoundary>
        <StrictMode>
          <App />
        </StrictMode>
      </ErrorBoundary>
    );
    console.log("main.tsx: React render invoked");
  } catch (err) {
    console.error("FATAL: Synchronous render crash:", err);
    container.innerHTML = `<h1 style="color:red">INITIAL_RENDER_CRASH: ${err instanceof Error ? err.message : String(err)}</h1>`;
  }
}
