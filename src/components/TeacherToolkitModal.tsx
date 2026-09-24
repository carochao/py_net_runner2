import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Key, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  X, 
  Sparkles, 
  AlertCircle, 
  Terminal, 
  Eye, 
  EyeOff, 
  Code2 
} from 'lucide-react';
import { CreativeTask } from './CreativeChallenges';
import { CREATIVE_TASK_SOLUTIONS, TaskSolution } from '../data/creativeSolutions';

interface TeacherToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: CreativeTask;
  onLoadSolutionIntoEditor: (code: string) => void;
  currentUserEmail?: string;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
}

export function TeacherToolkitModal({
  isOpen,
  onClose,
  selectedTask,
  onLoadSolutionIntoEditor,
  currentUserEmail,
  isUnlocked,
  onUnlock,
  onLock
}: TeacherToolkitModalProps) {
  const [storedPin, setStoredPin] = useState<string>(() => {
    try {
      return localStorage.getItem('py_teacher_pin') || '1234';
    } catch {
      return '1234';
    }
  });

  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirmLoad, setShowConfirmLoad] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  // Re-sync stored PIN and reset transient form states whenever modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('py_teacher_pin');
        if (saved && saved.trim()) {
          setStoredPin(saved.trim());
        } else {
          setStoredPin('1234');
        }
      } catch {}
      setInputPin('');
      setPinError('');
      setShowConfirmLoad(false);
      setIsChangingPin(false);
      setPinChangeMsg('');
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSolution: TaskSolution | undefined = CREATIVE_TASK_SOLUTIONS[selectedTask.id];

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = inputPin.trim();
    const target = storedPin.trim();

    // STRICT CHECK: only accept the active custom PIN.
    if (entered === target) {
      onUnlock();
      setPinError('');
      setInputPin('');
    } else {
      setPinError('Access Denied: Incorrect Instructor PIN.');
    }
  };

  const handleCopyCode = () => {
    if (!currentSolution) return;
    navigator.clipboard.writeText(currentSolution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyToEditor = () => {
    if (!currentSolution) return;
    onLoadSolutionIntoEditor(currentSolution.code);
    setShowConfirmLoad(false);
    onClose();
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newPin.trim();
    if (clean.length < 4) {
      setPinChangeMsg('PIN must be at least 4 characters long.');
      return;
    }
    try {
      localStorage.setItem('py_teacher_pin', clean);
      setStoredPin(clean);
      setPinChangeMsg('PIN updated and secured! Old PINs are invalidated.');
      setTimeout(() => {
        setIsChangingPin(false);
        setPinChangeMsg('');
        setNewPin('');
      }, 1500);
    } catch {
      setPinChangeMsg('Could not save PIN in browser storage.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0d1021] border-2 border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col max-h-[90vh] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:px-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-300 font-mono tracking-wider uppercase">
                  TEACHER TOOLKIT & MODEL ANSWERS
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ALT+SHIFT+T
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                {isUnlocked ? 'Instructor Mode Active • Reference Solutions' : 'Instructor Authorization Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                type="button"
                onClick={() => {
                  onLock();
                  onClose();
                }}
                className="px-2.5 py-1 text-[10px] font-mono bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title="Lock Teacher Mode immediately and hide"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>LOCK</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-black/40 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Toolkit (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {!isUnlocked ? (
            /* PIN GATE FORM */
            <div className="py-6 flex flex-col items-center text-center max-w-sm mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <Key className="w-7 h-7 animate-pulse" />
              </div>

              <div>
                <h3 className="text-base font-black text-white font-mono uppercase tracking-wide">
                  Instructor Authorization
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Enter your instructor PIN to access model answers and pedagogical notes.
                </p>
              </div>

              <form onSubmit={handleUnlockSubmit} className="w-full space-y-3">
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={inputPin}
                    onChange={(e) => setInputPin(e.target.value)}
                    placeholder="Enter Security PIN"
                    autoFocus
                    className="w-full bg-black/60 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-center text-sm font-mono tracking-widest text-amber-300 placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    title={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {pinError && (
                  <p className="text-xs font-mono text-rose-400 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-black text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>AUTHENTICATE & UNLOCK</span>
                </button>
              </form>

              <div className="pt-2 text-[10.5px] font-mono text-slate-500">
                <span>Emergency Toggle: </span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                  Alt + Shift + T
                </kbd>
                <span className="mx-1.5 text-slate-600">or</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                  F2
                </kbd>
              </div>
            </div>
          ) : (
            /* UNLOCKED SOLUTION VIEW */
            <div className="space-y-5">
              {/* Task Header info */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 font-bold uppercase">
                      {selectedTask.section === 'advanced' ? 'ADVANCED LAB' : 'CORE CHALLENGE'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Difficulty: {selectedTask.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white font-mono uppercase tracking-tight mt-1">
                    {selectedTask.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedTask.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy model code to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowConfirmLoad(true)}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black text-xs font-mono font-black rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] cursor-pointer"
                    title="Transfer solution into student's code editor"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>LOAD INTO EDITOR</span>
                  </button>
                </div>
              </div>

              {/* Confirmation bar for Load into Editor */}
              {showConfirmLoad && (
                <div className="p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="text-xs font-mono text-amber-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Replace the current code in the editor with this verified model solution?</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowConfirmLoad(false)}
                      className="px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleApplyToEditor}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs rounded-lg"
                    >
                      Confirm & Load
                    </button>
                  </div>
                </div>
              )}

              {/* Model Code Block */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    Verified Python Model Solution
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-400">
                    ✓ 100% Passes All Challenge Criteria
                  </span>
                </div>

                <div className="relative rounded-xl border border-slate-800 bg-[#060810] p-4 font-mono text-xs text-amber-100 overflow-x-auto leading-relaxed shadow-inner selection:bg-amber-500/30">
                  <pre className="whitespace-pre">
                    {currentSolution?.code || selectedTask.initialCode}
                  </pre>
                </div>
              </div>

              {/* Pedagogical Explanation & Notes */}
              {currentSolution && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1.5">
                    <h4 className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key Concept & Explanation
                    </h4>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {currentSolution.explanation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-1.5">
                    <h4 className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Common Student Pitfalls
                    </h4>
                    <ul className="text-xs text-slate-300 font-mono leading-relaxed list-disc list-inside space-y-1">
                      {currentSolution.commonMistakes.map((mistake, i) => (
                        <li key={i} className="text-slate-300">
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Bottom Settings: Change PIN */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <div>
                  {!isChangingPin ? (
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(true)}
                      className="text-[10px] text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Key className="w-3 h-3" />
                      <span>Change Instructor PIN</span>
                    </button>
                  ) : (
                    <form onSubmit={handleSaveNewPin} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="New 4+ char PIN"
                        className="bg-black/60 border border-slate-700 rounded px-2 py-0.5 text-xs font-mono text-white w-32 focus:outline-none focus:border-amber-400"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-2 py-0.5 bg-amber-500 text-black font-bold rounded text-[10px] cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsChangingPin(false)}
                        className="text-slate-500 hover:text-slate-300 text-[10px] cursor-pointer"
                      >
                        Cancel
                      </button>
                      {pinChangeMsg && (
                        <span className="text-[10px] text-amber-300">{pinChangeMsg}</span>
                      )}
                    </form>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <button
                    type="button"
                    onClick={() => {
                      onLock();
                      onClose();
                    }}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Lock Toolkit</span>
                  </button>
                  <span>Hotkey: <span className="text-amber-400 font-bold">Alt+Shift+T</span> or <span className="text-amber-400 font-bold">F2</span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
