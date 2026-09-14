/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Editor, { loader } from '@monaco-editor/react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Box, 
  ChevronRight, 
  Play, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle,
  Menu,
  X,
  Zap,
  Lock,
  Unlock,
  Radio,
  Code2,
  ShoppingBag,
  Palette,
  Image as ImageIcon,
  Columns,
  Maximize2,
  Minimize2,
  RefreshCcw,
  ChevronsUpDown,
  AlertCircle,
  Volume2,
  VolumeX,
  Cloud,
  CloudOff,
  Database,
  LogOut,
  User,
  Mail,
  Key,
  Coins,
  Activity,
  Award,
  Atom,
  Orbit,
  Gamepad2,
  Music,
  Trophy,
  Flame,
  ShieldAlert,
  Sparkles,
  Wrench,
  ShieldCheck,
  Sword,
  Bot
} from 'lucide-react';
import heroImage from './assets/images/python.png';
import { LESSONS } from './content';
import { REWARDS, RewardItem } from './rewards';
import { soundService } from './services/soundService';
import { Lesson, Level } from './types';
import { checkCodeWithAI, rethemeLessons, validateCodeLocally } from './services/geminiService';
import HackArena from './components/HackArena';
import CreativeChallenges from './components/CreativeChallenges';
import FlowchartLab from './components/FlowchartLab';

// Firebase Sync System Imports
import { 
  isFirebaseEnabled, 
  db, 
  auth, 
  googleProvider, 
  OperationType, 
  handleFirestoreError 
} from './services/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  signInAnonymously,
  User as FirebaseUser 
} from 'firebase/auth';

// Catch any Monaco loader CDN failures gracefully to prevent unhandled promise rejections
if (typeof window !== 'undefined') {
  loader.init().then(() => {
    console.log("Monaco Editor CDN initialized successfully.");
  }).catch(err => {
    console.warn("Monaco Editor CDN load caught gracefully (app continues in safe fallback):", err);
  });
}

console.log("App.tsx: LESSONS imported successfully, count:", LESSONS?.length);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleHardReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-500 p-8 font-mono border-4 border-red-500/20 m-4 rounded-3xl">
          <AlertCircle className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-black mb-2 uppercase tracking-tighter shadow-[0_0_20px_rgba(239,68,68,0.4)]">SYSTEM CRITICAL ERROR</h1>
          <p className="text-xs opacity-70 mb-6 max-w-md text-center">A critical fault occurred in the neural grid. Synchronized state may be corrupted.</p>
          <div className="bg-red-500/10 p-4 rounded border border-red-500/30 text-left w-full max-w-2xl overflow-auto max-h-[300px] mb-8">
            <code className="text-[11px] break-all text-red-400">{this.state.error?.toString()}</code>
            <pre className="text-[9px] mt-4 opacity-40 text-red-300">{this.state.error?.stack}</pre>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 border border-red-500 text-red-500 font-black uppercase tracking-widest hover:bg-red-500/10 transition-all active:scale-95"
            >
              Re-Index Current View
            </button>
            <button 
              onClick={this.handleHardReset}
              className="px-8 py-3 bg-red-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            >
              Purge State & Reboot
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==================== BADGES & ACHIEVEMENTS DEFINITIONS ====================

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  hint: string;
  bonus: number;
}

export const BADGES_LIST: Badge[] = [
  {
    id: 'null-pointer',
    name: '"Null Pointer" Keyring',
    description: 'Broke the mainframe! Unlocked by running code and getting errors/failures 5 times on a single task.',
    emoji: '🔑',
    hint: 'Attempt and fail/get errors in a single task 5 times.',
    bonus: 250
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Turbo charged solutions! Unlocked by completing a task successfully in under 60 seconds of loading it.',
    emoji: '⚡',
    hint: 'Pass any task within 1 minute of starting.',
    bonus: 250
  },
  {
    id: 'coffee-overload',
    name: 'Coffee Overload',
    description: 'Insomniac developer! Unlocked by editing, study, or running code past 9:00 PM (21:00) local time.',
    emoji: '☕',
    hint: 'Decompile mainframes past 21:00 (9:00 PM) local time.',
    bonus: 250
  },
  {
    id: 'perfect-combo',
    name: 'Perfect Combo',
    description: 'Supreme intuition! Unlocked by completing an entire level without using a single hint.',
    emoji: '🏆',
    hint: 'Complete every task in a Level with 0 hints utilized.',
    bonus: 500
  }
];

// ==================== THEME CONFIGURATION FOR LANDING ====================

const THEME_OPTIONS = [
  {
    id: 'theme-pokemon',
    name: 'Pokémon',
    symbol: '⚡',
    badge: 'OS',
    tagline: 'Pokédex & Gym Battles',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    bgBase: 'bg-[#14101e]/85 hover:bg-[#1c162b]',
    bgActive: 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.3)]',
    iconBg: 'bg-amber-400/15 border-amber-400/30 text-amber-300',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    titleColor: 'text-amber-300',
    glowColor: 'group-hover:text-amber-400',
  },
  {
    id: 'theme-minecraft',
    name: 'Minecraft',
    symbol: '⛏️',
    badge: 'GRID',
    tagline: 'Voxel Mining & Crafting',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400',
    bgBase: 'bg-[#0f1712]/85 hover:bg-[#142219]',
    bgActive: 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]',
    iconBg: 'bg-emerald-400/15 border-emerald-400/30 text-emerald-300',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    titleColor: 'text-emerald-300',
    glowColor: 'group-hover:text-emerald-400',
  },
  {
    id: 'theme-mario',
    name: 'Super Mario',
    symbol: '🍄',
    badge: 'STAR',
    tagline: 'Warp Pipes & Castles',
    borderColor: 'border-rose-500/30 hover:border-rose-400',
    bgBase: 'bg-[#180e0e]/85 hover:bg-[#241313]',
    bgActive: 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
    iconBg: 'bg-rose-400/15 border-rose-400/30 text-rose-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    titleColor: 'text-rose-300',
    glowColor: 'group-hover:text-rose-400',
  },
  {
    id: 'theme-anime',
    name: 'Anime Heroes',
    symbol: '⚔️',
    badge: 'SHONEN',
    tagline: 'Breathing Forms & Pirate Crews',
    borderColor: 'border-orange-500/30 hover:border-orange-400',
    bgBase: 'bg-[#1a0f0b]/85 hover:bg-[#28150f]',
    bgActive: 'bg-orange-500/20 border-orange-400 ring-2 ring-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.35)]',
    iconBg: 'bg-orange-400/15 border-orange-400/30 text-orange-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    titleColor: 'text-orange-300',
    glowColor: 'group-hover:text-orange-400',
  },
  {
    id: 'theme-mecha',
    name: 'Mecha & Kaiju',
    symbol: '🤖',
    badge: 'DEFENSE',
    tagline: 'Gundam Telemetry & Radar Scans',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    bgBase: 'bg-[#0a121e]/85 hover:bg-[#101c2e]',
    bgActive: 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    iconBg: 'bg-cyan-400/15 border-cyan-400/30 text-cyan-300',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    titleColor: 'text-cyan-300',
    glowColor: 'group-hover:text-cyan-400',
  },
  {
    id: 'theme-cyberpunk',
    name: 'Cyberpunk',
    symbol: '💾',
    badge: 'NET',
    tagline: 'Night City ICE Breakers',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    bgBase: 'bg-[#0b1418]/85 hover:bg-[#101f25]',
    bgActive: 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    iconBg: 'bg-cyan-400/15 border-cyan-400/30 text-cyan-300',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    titleColor: 'text-cyan-300',
    glowColor: 'group-hover:text-cyan-400',
  },
  {
    id: 'theme-marvel',
    name: 'Marvel',
    symbol: '🦸',
    badge: 'STARK',
    tagline: 'Avengers Tech & Arc Reactors',
    borderColor: 'border-red-500/30 hover:border-red-400',
    bgBase: 'bg-[#180e0e]/85 hover:bg-[#241313]',
    bgActive: 'bg-red-500/20 border-red-400 ring-2 ring-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    iconBg: 'bg-red-400/15 border-red-400/30 text-red-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    titleColor: 'text-red-300',
    glowColor: 'group-hover:text-red-400',
  },
  {
    id: 'theme-star-wars',
    name: 'Star Wars',
    symbol: '🌌',
    badge: 'JEDI',
    tagline: 'The Force & Galactic Holocron',
    borderColor: 'border-blue-500/30 hover:border-blue-400',
    bgBase: 'bg-[#0d131f]/85 hover:bg-[#131c2d]',
    bgActive: 'bg-blue-500/20 border-blue-400 ring-2 ring-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    iconBg: 'bg-blue-400/15 border-blue-400/30 text-blue-300',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    titleColor: 'text-blue-300',
    glowColor: 'group-hover:text-blue-400',
  },
  {
    id: 'theme-dc',
    name: 'DC Universe',
    symbol: '🦇',
    badge: 'WAYNE',
    tagline: 'Gotham Batcomputer & Justice',
    borderColor: 'border-purple-500/30 hover:border-purple-400',
    bgBase: 'bg-[#140e1b]/85 hover:bg-[#1e1428]',
    bgActive: 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    iconBg: 'bg-purple-400/15 border-purple-400/30 text-purple-300',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    titleColor: 'text-purple-300',
    glowColor: 'group-hover:text-purple-400',
  },
  {
    id: 'theme-space',
    name: 'Space',
    symbol: '🚀',
    badge: 'COSMOS',
    tagline: 'NASA Orbital Flight Telemetry',
    borderColor: 'border-indigo-500/30 hover:border-indigo-400',
    bgBase: 'bg-[#0f111f]/85 hover:bg-[#16182c]',
    bgActive: 'bg-indigo-500/20 border-indigo-400 ring-2 ring-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    iconBg: 'bg-indigo-400/15 border-indigo-400/30 text-indigo-300',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    titleColor: 'text-indigo-300',
    glowColor: 'group-hover:text-indigo-400',
  },
  {
    id: 'theme-football',
    name: 'Football',
    symbol: '⚽',
    badge: 'TACTICS',
    tagline: 'Premier League & Matchday Radar',
    borderColor: 'border-teal-500/30 hover:border-teal-400',
    bgBase: 'bg-[#0c1715]/85 hover:bg-[#122320]',
    bgActive: 'bg-teal-500/20 border-teal-400 ring-2 ring-teal-400/50 shadow-[0_0_20px_rgba(20,184,166,0.3)]',
    iconBg: 'bg-teal-400/15 border-teal-400/30 text-teal-300',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    titleColor: 'text-teal-300',
    glowColor: 'group-hover:text-teal-400',
  },
  {
    id: 'theme-simpsons',
    name: 'Simpsons',
    symbol: '🍩',
    badge: 'HOMER',
    tagline: 'Nuclear Power & Donuts',
    borderColor: 'border-yellow-500/30 hover:border-yellow-400',
    bgBase: 'bg-[#18160b]/85 hover:bg-[#242111]',
    bgActive: 'bg-yellow-500/20 border-yellow-400 ring-2 ring-yellow-400/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]',
    iconBg: 'bg-yellow-400/15 border-yellow-400/30 text-yellow-300',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    titleColor: 'text-yellow-300',
    glowColor: 'group-hover:text-yellow-400',
  },
  {
    id: 'theme-music',
    name: 'Music',
    symbol: '🎵',
    badge: 'SYNTH',
    tagline: 'Audio DAW & Beat Synthesizer',
    borderColor: 'border-pink-500/30 hover:border-pink-400',
    bgBase: 'bg-[#190d16]/85 hover:bg-[#251421]',
    bgActive: 'bg-pink-500/20 border-pink-400 ring-2 ring-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]',
    iconBg: 'bg-pink-400/15 border-pink-400/30 text-pink-300',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    titleColor: 'text-pink-300',
    glowColor: 'group-hover:text-pink-400',
  },
  {
    id: 'theme-gaming',
    name: 'Gaming',
    symbol: '🎮',
    badge: 'RPG',
    tagline: 'Retro Arcade & Boss Battles',
    borderColor: 'border-violet-500/30 hover:border-violet-400',
    bgBase: 'bg-[#130d1d]/85 hover:bg-[#1c132a]',
    bgActive: 'bg-violet-500/20 border-violet-400 ring-2 ring-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]',
    iconBg: 'bg-violet-400/15 border-violet-400/30 text-violet-300',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    titleColor: 'text-violet-300',
    glowColor: 'group-hover:text-violet-400',
  },
  {
    id: 'theme-fantasy',
    name: 'Fantasy',
    symbol: '🔮',
    badge: 'MAGE',
    tagline: 'Arcane Grimoires & Dragons',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    bgBase: 'bg-[#17130b]/85 hover:bg-[#231d10]',
    bgActive: 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    iconBg: 'bg-amber-400/15 border-amber-400/30 text-amber-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    titleColor: 'text-amber-300',
    glowColor: 'group-hover:text-amber-400',
  },
  {
    id: 'theme-roblox',
    name: 'Roblox',
    symbol: '🧱',
    badge: 'BLOX',
    tagline: 'Obby Obstacles & Lua Code',
    borderColor: 'border-orange-500/30 hover:border-orange-400',
    bgBase: 'bg-[#18100c]/85 hover:bg-[#231711]',
    bgActive: 'bg-orange-500/20 border-orange-400 ring-2 ring-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    iconBg: 'bg-orange-400/15 border-orange-400/30 text-orange-300',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    titleColor: 'text-orange-300',
    glowColor: 'group-hover:text-orange-400',
  }
];

// ==================== EASTER EGG COMPONENTS ====================

function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    
    // Set size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");
    
    const fontSize = 12;
    const columns = Math.ceil(canvas.width / fontSize);
    
    const rainDrops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100)); // staggered start
    
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 6, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#10b981'; // emerald green
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-50 bg-black/95 rounded-xl overflow-hidden flex flex-col">
      <div className="absolute top-3 right-3 z-[60] flex items-center gap-2">
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-black animate-pulse">MATRIX LINK STABILIZED</span>
        <button 
          onClick={onClose}
          className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-black rounded text-[9px] uppercase font-black tracking-widest cursor-pointer active:scale-95 transition-all outline-none"
        >
          DISMISS [X]
        </button>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

function RickRoll({ onClose }: { onClose: () => void }) {
  const lyrics = [
    "Never gonna crash your code,",
    "Never gonna freeze your thread,",
    "Never gonna run an infinite loop on you!",
    "Never gonna leak your memory,",
    "Never gonna drop your database,",
    "Never gonna lose a closing bracket and break the build!"
  ];
  const [lyricIdx, setLyricIdx] = useState(0);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sequenceTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLyricIdx(prev => (prev + 1) % lyrics.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bpm = 125;
      const beatDuration = 60 / bpm; // ~0.48s per beat
      let time = ctx.currentTime + 0.1;

      const freqs: Record<string, number> = {
        'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16,
        'C5': 523.25, 'D5': 587.33, 'F5': 698.46, 'G5': 783.99,
        'REST': 0
      };

      // Intro melody notes and beat durations
      const melody = [
        { note: 'Bb4', beats: 0.5 }, { note: 'C5', beats: 0.5 }, { note: 'D5', beats: 0.5 }, { note: 'D5', beats: 0.75 }, { note: 'F5', beats: 0.75 }, { note: 'D5', beats: 0.5 }, { note: 'C5', beats: 1.0 }, { note: 'REST', beats: 0.5 },
        { note: 'Bb4', beats: 0.5 }, { note: 'C5', beats: 0.5 }, { note: 'D5', beats: 0.5 }, { note: 'C5', beats: 0.75 }, { note: 'Bb4', beats: 0.75 }, { note: 'G4', beats: 0.5 }, { note: 'F4', beats: 1.0 }, { note: 'REST', beats: 0.5 },
        { note: 'Bb4', beats: 0.5 }, { note: 'C5', beats: 0.5 }, { note: 'D5', beats: 0.5 }, { note: 'D5', beats: 0.75 }, { note: 'F5', beats: 0.75 }, { note: 'D5', beats: 0.5 }, { note: 'C5', beats: 1.0 }, { note: 'REST', beats: 0.5 },
        { note: 'Bb4', beats: 0.5 }, { note: 'C5', beats: 0.5 }, { note: 'D5', beats: 0.5 }, { note: 'D5', beats: 0.75 }, { note: 'C5', beats: 0.75 }, { note: 'Bb4', beats: 1.5 }, { note: 'REST', beats: 1.0 }
      ];

      const totalMelodyDuration = melody.reduce((acc, item) => acc + item.beats * beatDuration, 0);

      const playSequence = (baseTime: number) => {
        let currentOffset = 0;
        melody.forEach((step) => {
          const duration = step.beats * beatDuration;
          if (step.note !== 'REST' && audioCtxRef.current) {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freqs[step.note], baseTime + currentOffset);
            
            // Subtle frequency modulator vibrato to emulate warm retro analogue sound
            const vibrato = ctx.createOscillator();
            const vibratoGain = ctx.createGain();
            vibrato.frequency.setValueAtTime(6.2, baseTime + currentOffset);
            vibratoGain.gain.setValueAtTime(4.0, baseTime + currentOffset);
            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(baseTime + currentOffset);
            vibrato.stop(baseTime + currentOffset + duration);

            // Custom synth-pop amp envelope
            gainNode.gain.setValueAtTime(0, baseTime + currentOffset);
            gainNode.gain.linearRampToValueAtTime(0.16, baseTime + currentOffset + 0.015);
            gainNode.gain.setValueAtTime(0.16, baseTime + currentOffset + duration - 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, baseTime + currentOffset + duration);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start(baseTime + currentOffset);
            osc.stop(baseTime + currentOffset + duration);
          }
          currentOffset += duration;
        });

        sequenceTimeoutRef.current = setTimeout(() => {
          if (audioCtxRef.current && isPlayingSynth) {
            playSequence(ctx.currentTime + 0.05);
          }
        }, totalMelodyDuration * 1000);
      };

      playSequence(time);
      setIsPlayingSynth(true);
    } catch (e) {
      console.error("Failed to start synth engine:", e);
    }
  };

  const stopSynth = () => {
    setIsPlayingSynth(false);
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const toggleSynth = () => {
    if (isPlayingSynth) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#0c0414] rounded-xl overflow-hidden flex flex-col justify-center items-center p-4 border-2 border-fuchsia-500/30">
      <div className="absolute top-3 left-3 z-[60] flex items-center gap-2">
        <span className="text-[9px] font-mono text-fuchsia-400 bg-fuchsia-500/15 px-2 py-0.5 rounded border border-fuchsia-500/30 font-black animate-pulse">NEURAL ROLL SYSTEM ACTIVE</span>
        <button 
          onClick={onClose}
          className="px-2 py-0.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded text-[9px] uppercase font-black tracking-widest cursor-pointer active:scale-95 transition-all outline-none"
        >
          DISMISS [X]
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-[60] flex items-center gap-3">
        <button
          onClick={toggleSynth}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-xs uppercase font-bold tracking-wider select-none active:scale-95 transition-all ${
            isPlayingSynth 
              ? 'bg-fuchsia-500 border-fuchsia-400 text-black shadow-lg shadow-fuchsia-500/20' 
              : 'bg-transparent border-fuchsia-500/50 text-fuchsia-400 hover:bg-fuchsia-500/10'
          }`}
        >
          {isPlayingSynth ? (
            <>
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>Synth: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Synth: OFF</span>
            </>
          )}
        </button>
        {isPlayingSynth && (
          <div className="flex gap-0.5 items-end h-4 pb-0.5">
            <span className="w-0.5 bg-fuchsia-500 animate-[pulse_0.4s_infinite_alternate]" style={{ height: '70%' }} />
            <span className="w-0.5 bg-fuchsia-500 animate-[pulse_0.3s_infinite_alternate-reverse]" style={{ height: '100%' }} />
            <span className="w-0.5 bg-fuchsia-500 animate-[pulse_0.5s_infinite_alternate]" style={{ height: '40%' }} />
            <span className="w-0.5 bg-fuchsia-500 animate-[pulse_0.45s_infinite_alternate-reverse]" style={{ height: '85%' }} />
          </div>
        )}
      </div>

      <div className="text-center space-y-4 max-w-sm">
        <pre className="text-[7px] md:text-[8px] leading-tight text-fuchsia-500 font-mono text-left inline-block bg-black/70 p-3 rounded-lg border border-fuchsia-500/20">
{`      _.-'''''''-._
    .'  _     _  '.
   /   (o)   (o)   \\
  |                 |
  |  \\     _     /  |
   \\  '._______.'  /
    '.           .'
      ''-.......-''
`}
        </pre>
        <div className="space-y-1">
          <p className="text-[8px] text-fuchsia-400 font-mono tracking-[0.2em] uppercase">♫ TRANSMITTING RIC_FREQUENCY ♫</p>
          <div className="text-sm font-black text-fuchsia-100 uppercase tracking-tighter shadow-sm h-[36px] flex items-center justify-center px-2 animate-pulse">
            "{lyrics[lyricIdx]}"
          </div>
        </div>
      </div>
    </div>
  );
}

function LarryCompanion({ onClose }: { onClose: () => void }) {
  const customQuotes = [
    "Woof! Tuples are like frozen vaults: you can't edit or append values after they are set!",
    "Bork! Remember, variable names can only start with a letter or an underscore!",
    "Arf! Missing a parenthesis is one of the most common syntax errors inside deep mainframes!",
    "Woof! Did you find the secret 'xyzzy' magic spell to claim 500 bonus credits in the decrypter?",
    "Bork arf! Try typing 'import party' to see the mainframe light up like a galaxy!",
    "Woof! The linter is active on your script, fixing warnings before they trigger compilation ICE!",
    "Arf! Good luck out there, cyber-coder!"
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);

  const rotateQuote = () => {
    setQuoteIdx(prev => (prev + 1) % customQuotes.length);
  };

  return (
    <div className="absolute bottom-3 right-3 z-[45] bg-slate-950/95 border-2 border-amber-500/40 p-2.5 rounded-lg shadow-lg max-w-[170px] flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-1">
        <span className="text-[8px] font-black text-amber-500 font-mono tracking-wider">LARRY CO-PILOT</span>
        <button onClick={onClose} className="text-[8px] text-slate-500 hover:text-white uppercase font-black tracking-tight cursor-pointer" title="Dismiss companion">Dismiss</button>
      </div>
      <div className="text-[9px] text-slate-300 leading-snug cursor-pointer hover:text-white transition-colors" onClick={rotateQuote}>
        "{customQuotes[quoteIdx]}"
        <div className="text-[7px] text-amber-500/50 font-bold mt-1 text-right">Click bubble for tip</div>
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <pre className="text-[6px] text-amber-500 leading-none font-mono">
{`   /^\\_/^\\
  ( o . o )
   / V V \\
  UU     UU
`}
        </pre>
        <div className="text-[7px] italic text-slate-500 font-sans">Larry the Py-Mastiff</div>
      </div>
    </div>
  );
}

// Helper to find a matching reward theme by user interest
function findThemeByInterest(interest: string): RewardItem | undefined {
  if (!interest) return undefined;
  const normalized = interest.toLowerCase().trim();
  const stripped = normalized.replace(/[^a-z0-9]/g, '');

  // 1. Direct value or ID match
  let match = REWARDS.find(r => 
    r.type === 'theme' && 
    (r.id.toLowerCase() === normalized || 
     r.value.toLowerCase() === normalized ||
     r.value.toLowerCase() === stripped)
  );
  if (match) return match;

  // 2. Built-in alias overrides
  if (stripped.includes('starwars') || stripped.includes('force') || stripped.includes('jedi') || stripped.includes('skywalker') || stripped.includes('starwar')) {
    return REWARDS.find(r => r.id === 'theme-star-wars');
  }
  if (stripped === 'dc' || stripped.includes('batman') || stripped.includes('gotham') || stripped.includes('waynetech') || stripped.includes('dcuniverse')) {
    return REWARDS.find(r => r.id === 'theme-dc');
  }
  if (stripped.includes('marvel') || stripped.includes('stark') || stripped.includes('ironman') || stripped.includes('avenger')) {
    return REWARDS.find(r => r.id === 'theme-marvel');
  }
  if (stripped.includes('simpson') || stripped.includes('homer') || stripped.includes('springfield')) {
    return REWARDS.find(r => r.id === 'theme-simpsons');
  }
  if (stripped.includes('pokemon') || stripped.includes('pokmon') || stripped.includes('pikachu') || stripped.includes('pokedex') || stripped.includes('pokeball')) {
    return REWARDS.find(r => r.id === 'theme-pokemon');
  }
  if (stripped.includes('minecraft') || stripped.includes('steve') || stripped.includes('craft') || stripped.includes('creeper') || stripped.includes('redstone')) {
    return REWARDS.find(r => r.id === 'theme-minecraft');
  }
  if (stripped.includes('mario') || stripped.includes('luigi') || stripped.includes('nintendo') || stripped.includes('bowser') || stripped.includes('mushroomkingdom')) {
    return REWARDS.find(r => r.id === 'theme-mario');
  }
  if (stripped.includes('anime') || stripped.includes('shonen') || stripped.includes('shounen') || stripped.includes('demonslayer') || stripped.includes('tanjiro') || stripped.includes('onepiece') || stripped.includes('luffy') || stripped.includes('myhero') || stripped.includes('mha') || stripped.includes('deku') || stripped.includes('manga') || stripped.includes('naruto')) {
    return REWARDS.find(r => r.id === 'theme-anime');
  }
  if (stripped.includes('mecha') || stripped.includes('kaiju') || stripped.includes('godzilla') || stripped.includes('gundam') || stripped.includes('robot') || stripped.includes('evangelion') || stripped.includes('eva') || stripped.includes('pacificrim') || stripped.includes('jaeger')) {
    return REWARDS.find(r => r.id === 'theme-mecha');
  }

  // 3. Substring matching in reward name or value
  match = REWARDS.find(r => 
    r.type === 'theme' && 
    (r.name.toLowerCase().includes(normalized) || 
     r.value.toLowerCase().includes(normalized) ||
     normalized.includes(r.value.toLowerCase()))
  );

  return match;
}

// ================================================================

interface ThemedSectionData {
  title: string;
  subtitle: string;
  badge: string;
  badgeClass: string;
  glowClass: string;
}

function getInitialSectionTheme(themeValue: string): ThemedSectionData {
  const normalized = (themeValue || 'cyan').toLowerCase();
  switch (normalized) {
    case 'pink':
      return {
        title: "NEURAL-MAGENTA",
        subtitle: "Direct neural cortex link active. High-intensity, cybernetic Python modules loaded.",
        badge: "VIVID_CORE",
        badgeClass: "text-cyber-pink bg-cyber-pink/10 border-cyber-pink/20 shadow-[0_0_12px_rgba(219,39,119,0.15)]",
        glowClass: "text-cyber-pink hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(219,39,119,0.4)]",
      };
    case 'green':
      return {
        title: "GHOST_SHELL",
        subtitle: "The definitive emerald matrix experience. Code purity and deep-shell decryption protocols active.",
        badge: "MATRIX_ONLINE",
        badgeClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_12px_rgba(52,211,153,0.15)]",
        glowClass: "text-emerald-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]",
      };
    case 'amber':
      return {
        title: "MAINBOARD_WARNING",
        subtitle: "Intense industrial amber environment. Brilliantly bright for high-integrity logic auditing.",
        badge: "LEVEL_5_CAUTION",
        badgeClass: "text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
        glowClass: "text-amber-500 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]",
      };
    case 'marvel':
      return {
        title: "STARK-NET",
        subtitle: "JARVIS-inspired tactical interface. Keep your thrusters calibrated and arc reactor stabilized.",
        badge: "STARK_INDUSTRIES",
        badgeClass: "text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]",
        glowClass: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]",
      };
    case 'cyberpunk':
      return {
        title: "NEON_CORE",
        subtitle: "Wake up, Netrunner. High tech, low life. Run your scripts and breach the city's megacorps.",
        badge: "NIGHT_CITY_LINK",
        badgeClass: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_12px_rgba(250,204,21,0.15)]",
        glowClass: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]",
      };
    case 'space':
      return {
        title: "GALACTIC-NAV",
        subtitle: "Starship orbital guidance system. Syncing telemetry, deep space beacons, and life support parameters.",
        badge: "VOID_SECURE",
        badgeClass: "text-blue-400 bg-blue-400/10 border-blue-400/20 shadow-[0_0_12px_rgba(96,165,250,0.15)]",
        glowClass: "text-blue-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]",
      };
    case 'football':
      return {
        title: "VAR-CENTRAL",
        subtitle: "Tactical pitch-side syntax analytics. Executing game-winning passes and scoreboard logical operations.",
        badge: "MATCH_DAY_ACTIVE",
        badgeClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
        glowClass: "text-emerald-500 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]",
      };
    case 'roblox':
      return {
        title: "BLOX-ENGINE",
        subtitle: "Blocky coordinates, obby logic circuits, and playful scripts fully stacked in three dimensions.",
        badge: "NOOB_DEV",
        badgeClass: "text-orange-500 bg-orange-500/10 border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.15)]",
        glowClass: "text-orange-500 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]",
      };
    case 'simpsons':
      return {
        title: "NUCLEAR_PLANT",
        subtitle: "Homer's control center is up! Avoid the core meltdown sequence and code for donuts.",
        badge: "DONUT_SYSTEM",
        badgeClass: "text-pink-400 bg-pink-400/10 border-pink-400/20 shadow-[0_0_12px_rgba(244,114,182,0.15)]",
        glowClass: "text-pink-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]",
      };
    case 'gaming':
      return {
        title: "GAME_START_1P",
        subtitle: "Level up your developer skill tree. Tackle procedural code dungeons and collect boss rewards.",
        badge: "LEVEL_UP",
        badgeClass: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20 shadow-[0_0_12px_rgba(129,140,248,0.15)]",
        glowClass: "text-indigo-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(129,140,248,0.4)]",
      };
    case 'music':
      return {
        title: "BEAT_STATION",
        subtitle: "Synthesizer logic and frequency wave modulation. Code the beat and sync the rhythm.",
        badge: "PRO_AUDIO",
        badgeClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20 shadow-[0_0_12px_rgba(34,211,238,0.15)]",
        glowClass: "text-cyan-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]",
      };
    case 'fantasy':
      return {
        title: "ELDER_TOME",
        subtitle: "Chanting Python incantations and compiler spells. Channel the ancient mana flows.",
        badge: "SPELL_CAST",
        badgeClass: "text-violet-400 bg-violet-400/10 border-violet-400/20 shadow-[0_0_12px_rgba(167,139,250,0.15)]",
        glowClass: "text-violet-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(167,139,250,0.4)]",
      };
    case 'starwars':
    case 'star-wars':
      return {
        title: "FORCE_ACADEMY",
        subtitle: "A long time ago, in a compiler far, far away... Attune your mind to code harmony and Jedi algorithms.",
        badge: "FORCE_ONLINE",
        badgeClass: "text-green-400 bg-green-400/10 border-green-400/20 shadow-[0_0_12px_rgba(34,197,94,0.15)]",
        glowClass: "text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-red-500 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]",
      };
    case 'dc':
      return {
        title: "BAT_COMPUTER",
        subtitle: "Secured Gotham database. The Caped Crusader's mainframe logic terminal is active.",
        badge: "DARK_KNIGHT",
        badgeClass: "text-slate-200 bg-slate-800/40 border-slate-700 shadow-[0_0_12px_rgba(255,255,255,0.05)]",
        glowClass: "text-slate-100 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]",
      };
    case 'pokemon':
      return {
        title: "POKÉDEX_LINK",
        subtitle: "Professor Oak's research terminal is active. Registering pocket monsters, battle stats, and elemental types.",
        badge: "POKÉMON_TRAINER",
        badgeClass: "text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,0.15)]",
        glowClass: "text-amber-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]",
      };
    case 'minecraft':
      return {
        title: "CRAFT_OS",
        subtitle: "Overworld voxel terminal online. Managing redstone circuits, furnace smelters, and inventory chests.",
        badge: "MASTER_MINER",
        badgeClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_12px_rgba(52,211,153,0.15)]",
        glowClass: "text-emerald-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]",
      };
    case 'mario':
      return {
        title: "MUSHROOM_KINGDOM",
        subtitle: "Jump into warp pipes, rescue Princess Peach, and clear Bowser's keeps across the 8 worlds.",
        badge: "SUPER_STAR",
        badgeClass: "text-rose-400 bg-rose-400/10 border-rose-400/20 shadow-[0_0_12px_rgba(251,113,133,0.15)]",
        glowClass: "text-rose-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(251,113,133,0.4)]",
      };
    case 'anime':
      return {
        title: "SHONEN_HERO",
        subtitle: "Unleash your quirk, master the breathing forms, and assemble the ultimate guild roster.",
        badge: "PLUS_ULTRA",
        badgeClass: "text-orange-400 bg-orange-400/10 border-orange-400/20 shadow-[0_0_12px_rgba(249,115,22,0.15)]",
        glowClass: "text-orange-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]",
      };
    case 'mecha':
      return {
        title: "MECHA_DEFENSE",
        subtitle: "Pilot your mobile suit, calibrate reactor telemetry, and scan sector radar for incoming Kaiju.",
        badge: "KAIJU_ALERT",
        badgeClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
        glowClass: "text-cyan-400 hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]",
      };
    default:
      return {
        title: "PY-QUEST",
        subtitle: "The definitive CyberCoder terminal interface. Sharp, balanced, and ready for code execution.",
        badge: "CYAN_PROTOCOL",
        badgeClass: "text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/20 glow-text-cyan shadow-[0_0_12px_rgba(6,182,212,0.15)]",
        glowClass: "text-cyber-cyan hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]",
      };
  }
}

interface LessonThemeHeaderData {
  badge: string;
  titleClass: string;
  cardClass: string;
  blinkerClass: string;
  icon: React.ReactNode;
  btnLabel: string;
  btnClass: string;
  onClickMsg: string;
  hudStat: string;
  renderAnimation?: () => React.ReactNode;
}

function getLessonThemeHeader(themeValue: string): LessonThemeHeaderData {
  const normalized = (themeValue || 'cyan').toLowerCase();
  switch (normalized) {
    case 'simpsons':
      return {
        badge: "REACTOR SEC_7G // SIMPSONS_OS",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 font-sans font-black uppercase drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]",
        cardClass: "border-yellow-400/30 bg-yellow-950/20 shadow-[0_0_20px_rgba(251,191,36,0.05)]",
        blinkerClass: "bg-yellow-400",
        icon: <Atom className="w-5 h-5 text-yellow-400 animate-[spin_4s_linear_infinite]" />,
        btnLabel: "TAP REACTOR CORE 🚨",
        btnClass: "bg-yellow-400/10 border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/20 active:scale-95",
        onClickMsg: "WARNING: Reactor cooling water diverted to Homer's donut fryer! Temp rising! 🍩🌡️ Check task parameters immediately.",
        hudStat: "CORE_TEMP: 382.4 °C",
        renderAnimation: () => (
          <div className="flex gap-1 items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
          </div>
        )
      };
    case 'space':
      return {
        badge: "DEEP ORBIT // NAV_DECK_UPLINK",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-sans font-extrabold tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)]",
        cardClass: "border-blue-500/20 bg-blue-950/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]",
        blinkerClass: "bg-blue-400",
        icon: <Orbit className="w-5 h-5 text-blue-400 animate-[pulse_2s_ease-in-out_infinite]" />,
        btnLabel: "SYNC WARP TELEMETRY 🚀",
        btnClass: "bg-blue-400/10 border-blue-400/30 text-blue-300 hover:bg-blue-400/20 active:scale-95",
        onClickMsg: "Calculating hyperspace coordinates... Hyperdrive synced at 104% capacity! 🌌 All navigation vectors aligned.",
        hudStat: "WARP_DRIVE: 104.2%",
        renderAnimation: () => (
          <div className="flex gap-0.5 items-end justify-center h-3">
            <span className="w-1 bg-blue-400 h-2 animate-[pulse_1s_ease_infinite]"></span>
            <span className="w-1 bg-cyan-400 h-3 animate-[pulse_1.5s_ease_infinite_300ms]"></span>
            <span className="w-1 bg-blue-300 h-1 animate-[pulse_0.8s_ease_infinite_100ms]"></span>
          </div>
        )
      };
    case 'marvel':
      return {
        badge: "STARK TECH // ARC_MAINBOARD_v85",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-600 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(239,68,68,0.3)]",
        cardClass: "border-red-500/30 bg-red-950/10 shadow-[0_0_20px_rgba(239,68,68,0.05)]",
        blinkerClass: "bg-red-500",
        icon: <Atom className="w-5 h-5 text-amber-400 animate-pulse" />,
        btnLabel: "STABILIZE ARC REACTOR ⎊",
        btnClass: "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 active:scale-95",
        onClickMsg: "Jarvis: Repulsors charged to 100%! Auxiliary thrusters stabilized. Clean energy flowing at peak performance, sir.",
        hudStat: "ARC_POWER: 100.0%",
        renderAnimation: () => (
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="absolute w-4 h-4 rounded-full border border-amber-400 animate-ping opacity-75"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          </div>
        )
      };
    case 'cyberpunk':
      return {
        badge: "NETRUNNER SUBNET // LOCAL_ICE_BYPASS",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 font-sans font-extrabold tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]",
        cardClass: "border-pink-500/30 bg-pink-950/20 shadow-[0_0_20px_rgba(244,63,94,0.05)]",
        blinkerClass: "bg-pink-500",
        icon: <Flame className="w-5 h-5 text-pink-500 animate-bounce" />,
        btnLabel: "OVERRIDE SUBNET ICE 💾",
        btnClass: "bg-pink-500/10 border-pink-500/30 text-pink-300 hover:bg-pink-500/20 active:scale-95",
        onClickMsg: "ICE breached! Local databases decrypted. Corporate credits transferred successfully. Netrunner local access node stable.",
        hudStat: "ICE_BREACH: ENCRYPTED_OK",
        renderAnimation: () => (
          <div className="text-[8px] font-mono text-pink-500 font-bold tracking-tighter animate-pulse">[OVERRIDE]</div>
        )
      };
    case 'football':
      return {
        badge: "VAR SYSTEM // STADIUM_ANALYTICS_v11",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 font-sans font-extrabold tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]",
        cardClass: "border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]",
        blinkerClass: "bg-emerald-400",
        icon: <Trophy className="w-5 h-5 text-emerald-400 animate-bounce" />,
        btnLabel: "RUN VAR REPLAY ⚽",
        btnClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 active:scale-95",
        onClickMsg: "VAR REPLAY COMPLETED: Python code validated! Clear goal, penalty denied, play on! ⚽🏃‍♂️ Scoreboard refreshed.",
        hudStat: "SCORE: CODER 1 - SYS 0",
        renderAnimation: () => (
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[bounce_1s_infinite_100ms]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[bounce_1s_infinite_200ms]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-[bounce_1s_infinite_300ms]"></span>
          </div>
        )
      };
    case 'roblox':
      return {
        badge: "BLOX_ENGINE // NOOB_CALIBRATION",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 font-sans font-black uppercase drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]",
        cardClass: "border-orange-500/30 bg-orange-950/20 shadow-[0_0_20px_rgba(249,115,22,0.05)]",
        blinkerClass: "bg-orange-500",
        icon: <Wrench className="w-5 h-5 text-orange-500 animate-pulse" />,
        btnLabel: "SPAWN SYSTEM NOOB 🧱",
        btnClass: "bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 active:scale-95",
        onClickMsg: "Oof! A blocky developer has been spawned in the current room workspace. Let's stack some logic blocks! 🧱",
        hudStat: "BLOX_LEVEL: 100",
        renderAnimation: () => (
          <span className="text-[10px] animate-[spin_5s_linear_infinite]">📦</span>
        )
      };
    case 'music':
      return {
        badge: "BEAT STATION // DECK_OS_v4",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-cyan-400 font-sans font-extrabold tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]",
        cardClass: "border-orange-500/20 bg-orange-950/20 shadow-[0_0_20px_rgba(249,115,22,0.05)]",
        blinkerClass: "bg-cyan-400",
        icon: <Music className="w-5 h-5 text-cyan-400 animate-pulse" />,
        btnLabel: "TRIGGER BASS RECON 🎧",
        btnClass: "bg-cyan-400/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 active:scale-95",
        onClickMsg: "Subwoofer logic frequency boosted by 12dB! Feel the syntax rhythm. Playing ambient compiler beat! 🎵🔥",
        hudStat: "BASS_FREQ: BOOSTED",
        renderAnimation: () => (
          <div className="flex gap-0.5 items-end justify-center h-4">
            <span className="w-1 bg-orange-500 h-3 animate-[pulse_0.6s_ease_infinite]"></span>
            <span className="w-1 bg-cyan-400 h-4 animate-[pulse_0.9s_ease_infinite_200ms]"></span>
            <span className="w-1 bg-yellow-400 h-2 animate-[pulse_0.5s_ease_infinite_100ms]"></span>
          </div>
        )
      };
    case 'fantasy':
      return {
        badge: "ELDER TOME // ACADEMY_SPELLS",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 font-serif font-bold tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]",
        cardClass: "border-violet-500/30 bg-violet-950/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]",
        blinkerClass: "bg-violet-400",
        icon: <Sparkles className="w-5 h-5 text-violet-400 animate-[spin_6s_linear_infinite]" />,
        btnLabel: "CAST SPELL INSPIRATION 🔮",
        btnClass: "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20 active:scale-95",
        onClickMsg: "Chanted ancient spell: Code mana fully restored! +50 spellcasting power locked in the compiler deck. ✨",
        hudStat: "MANA_RESERVE: 95/100",
        renderAnimation: () => (
          <span className="text-violet-400 text-xs animate-ping">✨</span>
        )
      };
    case 'starwars':
    case 'star-wars':
      return {
        badge: "FORCE ACADEMY // HOLOCRON_GRID",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-red-500 font-sans font-extrabold tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(34,197,94,0.3)]",
        cardClass: "border-green-500/20 bg-green-950/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]",
        blinkerClass: "bg-green-400",
        icon: <Orbit className="w-5 h-5 text-green-400 animate-pulse" />,
        btnLabel: "IGNITE LIGHTSABER ⚔️",
        btnClass: "bg-green-500/10 border-green-500/30 text-green-300 hover:bg-green-500/20 active:scale-95",
        onClickMsg: "May the Force be with your compiler! Kyber crystal humming at peak frequency. Code holocron successfully unlocked! 🌌✨",
        hudStat: "KYBER_CRYSTAL: hummmmm",
        renderAnimation: () => (
          <div className="flex gap-1 items-end justify-center h-4">
            <span className="w-1 bg-green-400 h-4 animate-[pulse_0.8s_ease_infinite]"></span>
            <span className="w-1 bg-blue-400 h-2 animate-[pulse_1.2s_ease_infinite_100ms]"></span>
            <span className="w-1 bg-red-400 h-3 animate-[pulse_1.0s_ease_infinite_200ms]"></span>
          </div>
        )
      };
    case 'dc':
      return {
        badge: "BAT_COMPUTER // MAIN_GOTHAM_GRID",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 font-sans font-semibold tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]",
        cardClass: "border-slate-700 bg-slate-900/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
        blinkerClass: "bg-slate-300",
        icon: <ShieldCheck className="w-5 h-5 text-slate-200 animate-pulse" />,
        btnLabel: "ACTIVATE BAT-RADAR 🦇",
        btnClass: "bg-slate-800/40 border-slate-700 text-slate-100 hover:bg-slate-800/60 active:scale-95",
        onClickMsg: "Surveillance drone deployed over Gotham City. Dark Knight code backup prepared. Mainframe connection secured. 🛡️",
        hudStat: "GRID: GOTHAM_SECURE",
        renderAnimation: () => (
          <div className="w-3.5 h-3.5 rounded-full border border-slate-400 animate-ping" />
        )
      };
    case 'pokemon':
      return {
        badge: "POKÉDEX // PALLET_TOWN_NET",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-red-500 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]",
        cardClass: "border-amber-500/30 bg-amber-950/20 shadow-[0_0_20px_rgba(251,191,36,0.05)]",
        blinkerClass: "bg-amber-400",
        icon: <Zap className="w-5 h-5 text-amber-400 animate-bounce" />,
        btnLabel: "THROW POKÉBALL ⚡",
        btnClass: "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 active:scale-95",
        onClickMsg: "Gotcha! Wild Python code was caught! Pokédex entry registered with 100% accuracy. Pika-pika! ⚡🔴",
        hudStat: "POKÉBALLS: 99x ULTRA",
        renderAnimation: () => (
          <div className="flex gap-1 items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[9px] font-mono text-amber-300 font-bold">⚡100k VOLT</span>
          </div>
        )
      };
    case 'minecraft':
      return {
        badge: "OVERWORLD // VOXEL_ENGINE_v1.20",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-cyan-400 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(52,211,153,0.3)]",
        cardClass: "border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_20px_rgba(52,211,153,0.05)]",
        blinkerClass: "bg-emerald-400",
        icon: <Box className="w-5 h-5 text-emerald-400 animate-pulse" />,
        btnLabel: "MINE DIAMONDS 💎",
        btnClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 active:scale-95",
        onClickMsg: "Clang! Netherite pickaxe struck deep diamond vein at Y=-58! Diamond Ore extracted. Sss... no creepers nearby! 💎⛏️",
        hudStat: "ORE_Y_LEVEL: -58 (DIAMONDS)",
        renderAnimation: () => (
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[10px] animate-spin">💎</span>
            <span className="text-[9px] font-mono text-emerald-300 font-bold">64x STACK</span>
          </div>
        )
      };
    case 'mario':
      return {
        badge: "WORLD 1-1 // MUSHROOM_KINGDOM",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-yellow-400 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(239,68,68,0.3)]",
        cardClass: "border-red-500/30 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]",
        blinkerClass: "bg-red-500",
        icon: <Flame className="w-5 h-5 text-yellow-400 animate-bounce" />,
        btnLabel: "GRAB SUPER STAR 🌟",
        btnClass: "bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20 active:scale-95",
        onClickMsg: "Yahoo! Super Star grabbed! Mario is invincible with rainbow sparkles! Running down Bowser's bridge! 🌟🍄",
        hudStat: "LIVES: 1-UP x99",
        renderAnimation: () => (
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[10px] animate-bounce">🍄</span>
            <span className="text-[9px] font-mono text-yellow-300 font-bold">COINS: 100</span>
          </div>
        )
      };
    case 'anime':
      return {
        badge: "SHONEN HERO // DEMON_CORPS_V9",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]",
        cardClass: "border-orange-500/30 bg-orange-950/20 shadow-[0_0_20px_rgba(249,115,22,0.08)]",
        blinkerClass: "bg-orange-400",
        icon: <Sword className="w-5 h-5 text-orange-400 animate-bounce" />,
        btnLabel: "BREATHE: FIRST FORM ⚔️",
        btnClass: "bg-orange-500/10 border-orange-500/30 text-orange-300 hover:bg-orange-500/20 active:scale-95",
        onClickMsg: "Total Concentration Breathing engaged! Stamina restored to 100%! Nichirin blade ignited with Sun Breathing! Plus Ultra! ⚔️🔥",
        hudStat: "BREATHING: SUN_STYLE 100%",
        renderAnimation: () => (
          <div className="flex gap-1 items-center justify-center">
            <span className="text-[10px] animate-bounce">⚔️</span>
            <span className="text-[9px] font-mono text-orange-300 font-bold">PLUS ULTRA</span>
          </div>
        )
      };
    case 'mecha':
      return {
        badge: "SECTOR 4 // MECHA_DEFENSE_SYS",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-red-400 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(6,182,212,0.35)]",
        cardClass: "border-cyan-500/30 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.08)]",
        blinkerClass: "bg-cyan-400",
        icon: <Bot className="w-5 h-5 text-cyan-400 animate-pulse" />,
        btnLabel: "FIRE BEAM CANNON 🤖",
        btnClass: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 active:scale-95",
        onClickMsg: "All 24 payload bays armed! Reactor output at 100%! Hyper Mega Particle Cannon fired! Kaiju radar lock engaged! 🚀🦖",
        hudStat: "REACTOR_CORE: 100.0%",
        renderAnimation: () => (
          <div className="flex gap-1 items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[9px] font-mono text-cyan-300 font-bold">KAIJU CAT-4</span>
          </div>
        )
      };
    case 'gaming':
      return {
        badge: "PERFORMANCE HUD // PLAYER_1_READY",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-sans font-extrabold uppercase drop-shadow-[0_2px_8px_rgba(99,102,241,0.3)]",
        cardClass: "border-indigo-500/30 bg-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]",
        blinkerClass: "bg-indigo-400",
        icon: <Gamepad2 className="w-5 h-5 text-indigo-400 animate-bounce" />,
        btnLabel: "LEVEL UP SKILL 🎮",
        btnClass: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 active:scale-95",
        onClickMsg: "DUNGEON UPDATE: Code level increased! EXP +150, rare item obtained: Code Crown! 👑 Clear the stage!",
        hudStat: "EXP: LEVEL 99 [MAX]",
        renderAnimation: () => (
          <span className="font-mono text-[9px] text-indigo-400 animate-pulse">P1READY</span>
        )
      };
    case 'pink':
      return {
        badge: "NEURAL-PINK // SYNAPTIC_LINK",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-fuchsia-400 font-sans font-extrabold tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(219,39,119,0.3)]",
        cardClass: "border-cyber-pink/30 bg-cyber-pink/5 shadow-[0_0_20px_rgba(219,39,119,0.05)]",
        blinkerClass: "bg-cyber-pink",
        icon: <Activity className="w-5 h-5 text-cyber-pink animate-pulse" />,
        btnLabel: "PULSE COGNITION 🧠",
        btnClass: "bg-cyber-pink/10 border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/20 active:scale-95",
        onClickMsg: "Neural cortex synchronized. Synaptic transfer rate maximized at 100% bandwidth. 🧠⚡ Core active.",
        hudStat: "NEURO_SYNC: 100.0%",
        renderAnimation: () => (
          <span className="w-2 h-2 rounded-full bg-cyber-pink animate-ping"></span>
        )
      };
    case 'green':
      return {
        badge: "DECRYPT SHIELD // CHRONO_DECAY",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 font-sans font-black tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]",
        cardClass: "border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]",
        blinkerClass: "bg-emerald-400",
        icon: <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />,
        btnLabel: "RELEASE MATRIX VIRUS 🦠",
        btnClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 active:scale-95",
        onClickMsg: "Cascading decrypt key deployed. All matrix relays online. Digital ghost trace eliminated. 🕶️",
        hudStat: "SHELL_DECRYPT: OK",
        renderAnimation: () => (
          <div className="flex gap-1 flex-col h-4">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce"></span>
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
        )
      };
    case 'amber':
      return {
        badge: "MAINBOARD CRITICAL // LEVEL_5_WARN",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 font-sans font-black tracking-tight uppercase drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]",
        cardClass: "border-amber-500/30 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]",
        blinkerClass: "bg-amber-500",
        icon: <ShieldAlert className="w-5 h-5 text-amber-500 animate-[bounce_1.5s_ease_infinite]" />,
        btnLabel: "CLEAR FAULT CODES ⚠️",
        btnClass: "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 active:scale-95",
        onClickMsg: "Calibrating diagnostics. Logic system checks passed successfully. Mainboard fault codes cleared. 🔧",
        hudStat: "WARN_LEVEL: SYSTEM_NORMAL",
        renderAnimation: () => (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
        )
      };
    default:
      return {
        badge: "OPERATOR PROTOCOL // CHIP_SYNC_ACTIVE",
        titleClass: "text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-400 font-sans font-extrabold tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]",
        cardClass: "border-cyber-cyan/30 bg-cyber-cyan/5 shadow-[0_0_20px_rgba(6,182,212,0.05)]",
        blinkerClass: "bg-cyber-cyan",
        icon: <Cpu className="w-5 h-5 text-cyber-cyan animate-[spin_8s_linear_infinite]" />,
        btnLabel: "CALIBRATE CYBER_CORE ⚡",
        btnClass: "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 active:scale-95",
        onClickMsg: "Bypass calibration complete. Signal frequency locked in phase. Standard operator cycle loaded. 🛰️",
        hudStat: "SYS_TEMP: 34.1 °C",
        renderAnimation: () => (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan"></span>
          </span>
        )
      };
  }
}

export default function App() {
  console.log("App.tsx: App component is rendering");
  
  useEffect(() => {
    console.log("App.tsx: App component mounted");
  }, []);

  // ---------------------------------------------------------------------------
  // FIREBASE CLASSROOM SYNC SYSTEM STATES & HOOKS
  // ---------------------------------------------------------------------------
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncLoaded, setIsSyncLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'local' | 'synced' | 'connecting' | 'error'>(() => 
    isFirebaseEnabled ? 'connecting' : 'local'
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'restore'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authDisplayName, setAuthDisplayName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showExtendedAuthOptions, setShowExtendedAuthOptions] = useState(false);
  const [showGuestHelpModal, setShowGuestHelpModal] = useState(false);
  const [activeRestoreCode, setActiveRestoreCode] = useState<string>('');
  const [restoreCodeInput, setRestoreCodeInput] = useState('');
  const [copiedRestoreCode, setCopiedRestoreCode] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dbCreatedAtRef = useRef<any>(null);

  const [view, setView] = useState<'landing' | 'app' | 'hack-arena' | 'creative-challenges' | 'flowchart-lab'>(() => {
    try {
      const saved = localStorage.getItem('py-runner-view');
      return (saved === 'landing' || saved === 'app' || saved === 'hack-arena' || saved === 'creative-challenges' || saved === 'flowchart-lab') ? saved : 'landing';
    } catch (e) { return 'landing'; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-view', view);
    } catch (e) {}
  }, [view]);

  const [userInterest, setUserInterest] = useState<string>(() => {
    try {
      return localStorage.getItem('py-runner-interest') || 'Cyberpunk';
    } catch (e) { return 'Cyberpunk'; }
  });
  
  const [activeTutorialStep, setActiveTutorialStep] = useState<number>(1);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState<boolean>(() => {
    try {
      return localStorage.getItem('py-runner-tutorial-completed') === 'true';
    } catch (e) {
      return false;
    }
  });
  
  const [showCustomThemeInput, setShowCustomThemeInput] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-interest', userInterest);
    } catch (e) {}
  }, [userInterest]);

  // Walkthrough Demo Animation for Step 2
  const [isDemoCompiling, setIsDemoCompiling] = useState(false);
  const [demoActiveTheme, setDemoActiveTheme] = useState<string | null>(null);

  useEffect(() => {
    if (activeTutorialStep === 2 && !hasCompletedTutorial) {
      let active = true;
      
      const runDemo = async () => {
        if (!active) return;
        setDemoActiveTheme(null);
        setIsDemoCompiling(false);
        
        // Select 'Pokémon' theme
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!active) return;
        setDemoActiveTheme('Pokémon');
        setUserInterest('Pokémon');
        if (soundService.playMenuSelect) soundService.playMenuSelect();

        // Select 'Minecraft' theme
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!active) return;
        setDemoActiveTheme('Minecraft');
        setUserInterest('Minecraft');
        if (soundService.playMenuSelect) soundService.playMenuSelect();

        // Select 'Super Mario' theme
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!active) return;
        setDemoActiveTheme('Super Mario');
        setUserInterest('Super Mario');
        if (soundService.playMenuSelect) soundService.playMenuSelect();

        // Start compiling
        await new Promise(resolve => setTimeout(resolve, 400));
        if (!active) return;
        setIsDemoCompiling(true);
        if (soundService.playSuccess) soundService.playSuccess(activeSoundpackId || 'retro');

        // Complete compile and go to Step 3
        await new Promise(resolve => setTimeout(resolve, 1400));
        if (!active) return;
        setIsDemoCompiling(false);
        setDemoActiveTheme(null);
        setActiveTutorialStep(3);
        if (soundService.playMenuSelect) soundService.playMenuSelect();
      };

      runDemo();

      return () => {
        active = false;
        setIsDemoCompiling(false);
        setDemoActiveTheme(null);
      };
    }
  }, [activeTutorialStep, hasCompletedTutorial]);

  const [isRetheming, setIsRetheming] = useState(false);
  const [directLaunchingTheme, setDirectLaunchingTheme] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>(() => [...LESSONS]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    try {
      const saved = localStorage.getItem('cyber-current-lesson');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) { return 0; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cyber-current-lesson', currentLessonIndex.toString());
    } catch (e) {}
  }, [currentLessonIndex]);

  // Error recovery for currentLessonIndex
  useEffect(() => {
    if (lessons && currentLessonIndex >= lessons.length && lessons.length > 0) {
      setCurrentLessonIndex(0);
    }
  }, [lessons, currentLessonIndex]);

  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string; output?: string } | null>(null);
  const [showHintSnippet, setShowHintSnippet] = useState(false);
  const [hudInteractiveMsg, setHudInteractiveMsg] = useState<string>('');
  const [hudPulseActive, setHudPulseActive] = useState<boolean>(false);

  useEffect(() => {
    setHudInteractiveMsg('');
    setHudPulseActive(false);
  }, [currentLessonIndex]);

  // Helper to ensure markdown strings with literal \n are rendered correctly
  const renderMarkdown = (content: string = '') => {
    if (!content) return null;
    // Replace literal escaped \n with actual newline characters
    const processed = content.replace(/\\n/g, '\n');
    return <ReactMarkdown>{processed}</ReactMarkdown>;
  };

  const getThemedLabel = (key: 'assistance_protocol' | 'terminal_output' | 'executing' | 'awaiting_input' | 'placeholder_input') => {
    const themeVal = activeTheme?.value || 'cyan';
    switch (themeVal) {
      case 'space':
        if (key === 'assistance_protocol') return "MISSION CONTROL UPLINK";
        if (key === 'terminal_output') return "FLIGHT TELEMETRY DECK";
        if (key === 'executing') return "Calculating Orbital Trajectory...";
        if (key === 'awaiting_input') return "AWAITING TELEMETRY DATA...";
        if (key === 'placeholder_input') return "Enter telemetry vector...";
        break;
      case 'cyberpunk':
        if (key === 'assistance_protocol') return "NETRUNNER SHADOW INTEL";
        if (key === 'terminal_output') return "CYBERCORE DATA_STREAM";
        if (key === 'executing') return "Breaching Cybernetic ICE...";
        if (key === 'awaiting_input') return "AWAITING DIGITAL BYPASS...";
        if (key === 'placeholder_input') return "Inject digital exploit...";
        break;
      case 'starwars':
        if (key === 'assistance_protocol') return "HOLOCRON ARCHIVE SOURCE";
        if (key === 'terminal_output') return "GALACTIC CODES MODULE";
        if (key === 'executing') return "Attuning to Cosmic Force...";
        if (key === 'awaiting_input') return "AWAITING PATROL CODES...";
        if (key === 'placeholder_input') return "Enter hyperspace coordinates...";
        break;
      case 'music':
        if (key === 'assistance_protocol') return "BEATMAKER SAMPLE GUIDE";
        if (key === 'terminal_output') return "SAMPLER SIGNAL STREAM";
        if (key === 'executing') return "Synthesizing Waveform...";
        if (key === 'awaiting_input') return "AWAITING AUDIO INPUT...";
        if (key === 'placeholder_input') return "Enter audio frequency...";
        break;
      case 'marvel':
        if (key === 'assistance_protocol') return "J.A.R.V.I.S. PROTOCOL ASSIST";
        if (key === 'terminal_output') return "STARK TECH DATA DECK";
        if (key === 'executing') return "Calibrating Repulsor Nodes...";
        if (key === 'awaiting_input') return "AWAITING INQUEST COMMAND...";
        if (key === 'placeholder_input') return "Transmit Jarvis command...";
        break;
      case 'dc':
        if (key === 'assistance_protocol') return "BATCOMPUTER CRIME_NET";
        if (key === 'terminal_output') return "TACTICAL SYSTEM CONSOLE";
        if (key === 'executing') return "Running WayneTech Scan...";
        if (key === 'awaiting_input') return "AWAITING SECURE DECRYPTION...";
        if (key === 'placeholder_input') return "Decrypt criminal coordinate...";
        break;
      case 'football':
        if (key === 'assistance_protocol') return "VAR REPLAY BOOTH HINTS";
        if (key === 'terminal_output') return "PITCH DATA INTEGRATION";
        if (key === 'executing') return "Analyzing Tactical Footage...";
        if (key === 'awaiting_input') return "AWAITING STRATEGY MATCH...";
        if (key === 'placeholder_input') return "Submit tactical formation...";
        break;
      case 'roblox':
        if (key === 'assistance_protocol') return "ROBLOX STUDIO HELPER";
        if (key === 'terminal_output') return "BLOX REPLICATOR DATA";
        if (key === 'executing') return "Compiling Obby Assembly...";
        if (key === 'awaiting_input') return "AWAITING SPAWN SIGNAL...";
        if (key === 'placeholder_input') return "Enter spawn block coordinates...";
        break;
      case 'simpsons':
        if (key === 'assistance_protocol') return "NUCLEAR PLANT ADVICE";
        if (key === 'terminal_output') return "REACTOR MONITOR CONSOLE";
        if (key === 'executing') return "Bypassing Core Meltdown...";
        if (key === 'awaiting_input') return "AWAITING SYSTEM EXCUSE...";
        if (key === 'placeholder_input') return "Enter donut supply count...";
        break;
      case 'fantasy':
        if (key === 'assistance_protocol') return "ARCANE ACADEMY SCROLL";
        if (key === 'terminal_output') return "SPELLBOOK INTUITION DECK";
        if (key === 'executing') return "Chanting Mystic Incantation...";
        if (key === 'awaiting_input') return "AWAITING RUNIC INSCRIPTION...";
        if (key === 'placeholder_input') return "Inscribe magic rune...";
        break;
      case 'gaming':
        if (key === 'assistance_protocol') return "STRATEGY WALKTHROUGH PRO";
        if (key === 'terminal_output') return "RGB PERFORMANCE HUD";
        if (key === 'executing') return "Rendering Frames at 360FPS...";
        if (key === 'awaiting_input') return "AWAITING GAME INPUT...";
        if (key === 'placeholder_input') return "Enter cheat input buffer...";
        break;
      case 'pokemon':
        if (key === 'assistance_protocol') return "POKÉDEX RESEARCH HINTS";
        if (key === 'terminal_output') return "POKÉMON BATTLE TERMINAL";
        if (key === 'executing') return "Executing Trainer Command...";
        if (key === 'awaiting_input') return "AWAITING TRAINER COMMAND...";
        if (key === 'placeholder_input') return "Choose your Pokémon move...";
        break;
      case 'minecraft':
        if (key === 'assistance_protocol') return "CRAFTING RECIPE GUIDE";
        if (key === 'terminal_output') return "REDSTONE CONDUIT CONSOLE";
        if (key === 'executing') return "Smelting & Crafting Blocks...";
        if (key === 'awaiting_input') return "AWAITING MINER INPUT...";
        if (key === 'placeholder_input') return "Enter block or coordinates...";
        break;
      case 'mario':
        if (key === 'assistance_protocol') return "TOAD'S HINT HOUSE";
        if (key === 'terminal_output') return "PIPE TELEMETRY CONSOLE";
        if (key === 'executing') return "Warping Through Pipe...";
        if (key === 'awaiting_input') return "AWAITING CONTROLLER INPUT...";
        if (key === 'placeholder_input') return "Enter jump or warp command...";
        break;
      default:
        break;
    }
    // Default cyber themed fallbacks for standard cyber colors (green, pink, amber, cyan)
    if (key === 'assistance_protocol') return "Assistance Protocol";
    if (key === 'terminal_output') return "Terminal_Output v2.1";
    if (key === 'executing') return "Executing Neural Loop...";
    if (key === 'awaiting_input') return "AWAITING OPERATOR INPUT...";
    if (key === 'placeholder_input') return "Enter signal payload...";
    return "";
  };

  const [showDeepHelp, setShowDeepHelp] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('py-runner-completed') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem('py-runner-completed', JSON.stringify(completedLessons));
    } catch (e) {}
  }, [completedLessons]);
  const [showResultOverlay, setShowResultOverlay] = useState(false);
  const [codeErrors, setCodeErrors] = useState<{ line: number; message: string; type: 'error' | 'warning' }[]>([]);
  const [autonomousCore, setAutonomousCore] = useState<boolean>(() => {
    try {
      return localStorage.getItem('py-runner-autonomous-core') === 'true';
    } catch { return false; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-autonomous-core', autonomousCore.toString());
    } catch (e) {}
  }, [autonomousCore]);

  // RESIZE STATES
  const [leftPanelWidth, setLeftPanelWidth] = useState(60); // percentage
  const [topPanelHeight, setTopPanelHeight] = useState(45); // percentage
  const [isResizingH, setIsResizingH] = useState(false);
  const [isResizingV, setIsResizingV] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // REWARDS STATE
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('py-runner-unlocked');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return ['theme-default', 'banner-default'];
    } catch (e) {
      console.warn("Failed to parse unlockedIds", e);
      return ['theme-default', 'banner-default'];
    }
  });

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState(() => {
    try {
      return localStorage.getItem('py-runner-active-theme') || 'theme-default';
    } catch (e) {
      return 'theme-default';
    }
  });
  const [activeBannerId, setActiveBannerId] = useState(() => {
    try {
      return localStorage.getItem('py-runner-active-banner') || 'banner-default';
    } catch (e) {
      return 'banner-default';
    }
  });
  const [activeWallpaperId, setActiveWallpaperId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('py-runner-active-wallpaper') || null;
    } catch (e) {
      return null;
    }
  });
  const [previewWallpaperId, setPreviewWallpaperId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-unlocked', JSON.stringify(unlockedIds));
    } catch (e) {
      console.error("Failed to save unlockedIds", e);
    }
  }, [unlockedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-active-theme', activeThemeId);
    } catch (e) {}
  }, [activeThemeId]);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-active-banner', activeBannerId);
    } catch (e) {}
  }, [activeBannerId]);

  useEffect(() => {
    try {
      if (activeWallpaperId) {
        localStorage.setItem('py-runner-active-wallpaper', activeWallpaperId);
      } else {
        localStorage.removeItem('py-runner-active-wallpaper');
      }
    } catch (e) {}
  }, [activeWallpaperId]);

  const activeTheme = REWARDS.find(r => r.id === activeThemeId) || REWARDS[0];
  const previewTheme = findThemeByInterest(userInterest) || activeTheme;
  const activeBanner = REWARDS.find(r => r.id === activeBannerId) || REWARDS.find(r => r.id === 'banner-default') || REWARDS[0];
  const activeWallpaper = REWARDS.find(r => r.id === activeWallpaperId || (r.id === 'wallpaper-mrs-birds' && activeWallpaperId === 'wallpaper-mr-singer-funko')) || null;

  const [currentLevel, setCurrentLevel] = useState<Level>(() => {
    try {
      return (localStorage.getItem('py-runner-level') as Level) || 'basics';
    } catch (e) { return 'basics'; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-level', currentLevel);
    } catch (e) {}
  }, [currentLevel]);

  // Sync content theme with active visual theme
  useEffect(() => {
    if (window.location.search.includes('reset=true')) {
      try {
        localStorage.clear();
      } catch (e) {}
      window.location.href = window.location.pathname;
      return;
    }

    let isMounted = true;
    const themeVal = activeTheme?.value;
    
    if (themeVal && !['cyan', 'pink', 'green', 'amber'].includes(themeVal)) {
      rethemeLessons(themeVal, LESSONS).then(themed => {
        if (isMounted) setLessons(themed);
      }).catch(err => {
        console.error("Retheme failed", err);
        if (isMounted) setLessons(LESSONS);
      });
    } else {
      setLessons(LESSONS);
    }
    
    return () => { isMounted = false; };
  }, [activeThemeId]); // Only depend on the ID to ensure stability

  // Sync HTML element data-theme attribute with live preview on landing page
  useEffect(() => {
    const themeVal = view === 'landing' ? (previewTheme?.value || 'cyan') : (activeTheme?.value || 'cyan');
    document.documentElement.setAttribute('data-theme', themeVal);
  }, [previewTheme?.value, activeTheme?.value, view]);

  // EASTER EGG STATES
  const [matrixActive, setMatrixActive] = useState(false);
  const [rickrollActive, setRickrollActive] = useState(false);
  const [partyActive, setPartyActive] = useState(false);
  const [larryActive, setLarryActive] = useState(false);
  
  const [bonusCredits, setBonusCredits] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('py-runner-bonus-credits');
      return saved ? Number(saved) : 0;
    } catch { return 0; }
  });

  const [cheatsUsed, setCheatsUsed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('py-runner-cheats-used');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch { return []; }
  });

  // BADGES & ACHIEVEMENTS STATES
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('py-runner-badges') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  // SOUND PACKS & BEATS STATES
  const [isSonicUnlocked, setIsSonicUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('py-runner-sonic-unlocked') === 'true';
    } catch { return false; }
  });
  const [creditsClickCount, setCreditsClickCount] = useState<number>(0);

  const handleCreditsClick = () => {
    if (isSonicUnlocked) return;
    setCreditsClickCount(prev => {
      const next = prev + 1;
      if (next >= 10) {
        setIsSonicUnlocked(true);
        try {
          localStorage.setItem('py-runner-sonic-unlocked', 'true');
        } catch (e) {
          console.warn(e);
        }
        
        // Show cool success notification
        setUnlockedNotification({
          id: 'secret-sonics',
          name: '🎧 INTERACTIVE SOUND DECK ONLINE',
          description: 'You found the secret frequency! Cyber Synth Beats and Custom Sound FX Packs are now available in the shop below.',
          emoji: '🎧',
          bonus: 100
        });
        setBonusCredits(b => b + 100);

        // Auto-dismiss notification after 7s
        setTimeout(() => {
          setUnlockedNotification(p => p?.id === 'secret-sonics' ? null : p);
        }, 7000);

        return 0;
      }
      return next;
    });
  };

  const [activeSoundpackId, setActiveSoundpackId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('py-runner-active-soundpack') || null;
    } catch { return null; }
  });

  const [isBeatsPlaying, setIsBeatsPlaying] = useState<boolean>(false);
  const [soundVolume, setSoundVolume] = useState<number>(() => {
    try {
      const vol = localStorage.getItem('py-runner-sound-volume');
      return vol !== null ? Number(vol) : 0.35;
    } catch { return 0.35; }
  });

  useEffect(() => {
    try {
      if (activeSoundpackId) {
        localStorage.setItem('py-runner-active-soundpack', activeSoundpackId);
      } else {
        localStorage.removeItem('py-runner-active-soundpack');
      }
    } catch (e) {
      console.warn("localStorage write error", e);
    }

    // Sync ambient tracking beats playing status
    if (isBeatsPlaying && activeSoundpackId) {
      soundService.startAmbientTracks(activeSoundpackId);
    } else {
      soundService.stopAmbientTracks();
    }
  }, [activeSoundpackId, isBeatsPlaying]);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-sound-volume', soundVolume.toString());
    } catch (e) {
      console.warn("localStorage write error", e);
    }
    soundService.setVolume(soundVolume);
  }, [soundVolume]);

  // Cleanup ambient soundtracks on unmount
  useEffect(() => {
    return () => {
      soundService.stopAmbientTracks();
    };
  }, []);

  const [lessonErrors, setLessonErrors] = useState<Record<string, number>>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('py-runner-lesson-errors') || '{}');
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
    } catch { return {}; }
  });

  const [hintsUsed, setHintsUsed] = useState<Record<string, boolean>>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('py-runner-hints-used') || '{}');
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
    } catch { return {}; }
  });

  const [lessonStartTime, setLessonStartTime] = useState<number>(Date.now());
  const [unlockedNotification, setUnlockedNotification] = useState<{ id: string; name: string; description: string; emoji: string; bonus: number } | null>(null);

  const unlockBadge = (badgeId: string) => {
    if (unlockedBadges.includes(badgeId)) return;
    
    const badge = BADGES_LIST.find(b => b.id === badgeId);
    if (!badge) return;

    setUnlockedBadges(prev => {
      const newBadges = [...prev, badgeId];
      localStorage.setItem('py-runner-badges', JSON.stringify(newBadges));
      return newBadges;
    });

    setBonusCredits(prev => prev + badge.bonus);

    // Trigger visual notification
    setUnlockedNotification({
      id: badgeId,
      name: badge.name,
      description: badge.description,
      emoji: badge.emoji,
      bonus: badge.bonus
    });

    // Auto-dismiss notification after 5.5s
    setTimeout(() => {
      setUnlockedNotification(prev => prev?.id === badgeId ? null : prev);
    }, 5500);
  };

  const checkLateNightStudy = () => {
    try {
      const hours = new Date().getHours();
      if (hours >= 21 || hours < 5) {
        unlockBadge('coffee-overload');
      }
    } catch (e) {
      console.error("Error checking date hour", e);
    }
  };

  useEffect(() => {
    // Check late night study on mount
    checkLateNightStudy();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-bonus-credits', bonusCredits.toString());
    } catch (e) {
      console.error(e);
    }
  }, [bonusCredits]);

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-cheats-used', JSON.stringify(cheatsUsed));
    } catch (e) {
      console.error(e);
    }
  }, [cheatsUsed]);

  // CREDIT CALCULATION
  const totalEarned = (completedLessons?.length || 0) * 200 + 2000 + bonusCredits;
  const totalSpent = REWARDS.filter(r => unlockedIds.includes(r.id)).reduce((acc, r) => acc + r.cost, 0);
  const currentCredits = totalEarned - totalSpent;

  useEffect(() => {
    try {
      localStorage.setItem('py-runner-credits', currentCredits.toString());
    } catch (e) {}
  }, [currentCredits]);

  // Cheat Codes State & Handler
  const [cheatInput, setCheatInput] = useState('');
  const [cheatFeedback, setCheatFeedback] = useState<string | null>(null);

  const handleCheatSubmit = (codeStr: string) => {
    const cleanStr = codeStr.toLowerCase().trim().replace(/['"()]/g, '');
    
    if (cleanStr === 'import matrix' || cleanStr === 'matrix' || cleanStr === 'cyber_coordinates' || cleanStr.includes('follow the white rabbit') || cleanStr.includes('white rabbit')) {
      setMatrixActive(true);
      setCheatFeedback("MATRIX_LINK_STABILIZED: Core overriding streams...");
      setTimeout(() => setCheatFeedback(null), 3000);
      setCheatInput('');
      return true;
    }
    
    if (cleanStr === 'import rick' || cleanStr === 'rickroll' || cleanStr === 'rick') {
      setRickrollActive(true);
      setCheatFeedback("NEURAL_STREAM: Rickroll override activated.");
      setTimeout(() => setCheatFeedback(null), 3000);
      setCheatInput('');
      return true;
    }
    
    if (cleanStr === 'import party' || cleanStr === 'party' || cleanStr === 'import_party') {
      setPartyActive(prev => !prev);
      setCheatFeedback("PARTY_PROTOCOL: Accent RGB loop toggled.");
      setTimeout(() => setCheatFeedback(null), 3000);
      setCheatInput('');
      return true;
    }
    
    if (cleanStr === 'import larry' || cleanStr === 'larry') {
      setLarryActive(prev => !prev);
      setCheatFeedback("COMPANION_SUMMON: Larry the Mastiff is online.");
      setTimeout(() => setCheatFeedback(null), 3000);
      setCheatInput('');
      return true;
    }
    
    if (cleanStr === 'xyzzy' || cleanStr === 'magic' || cleanStr === 'import magic') {
      if (cheatsUsed.includes('xyzzy')) {
        setCheatFeedback("ACCESS DENIED: KEY ALREADY CLAIMED");
        setTimeout(() => setCheatFeedback(null), 3000);
        return false;
      }
      setBonusCredits(prev => prev + 500);
      const newCheats = [...cheatsUsed, 'xyzzy'];
      setCheatsUsed(newCheats);
      localStorage.setItem('py-runner-cheats-used', JSON.stringify(newCheats));
      setCheatFeedback("SUCCESS: BYPASS COMPLETED. +500 CREDITS!");
      setTimeout(() => setCheatFeedback(null), 4000);
      setCheatInput('');
      return true;
    }
    
    setCheatFeedback("ACCESS DENIED: HASH NOT RECOGNIZED");
    setTimeout(() => setCheatFeedback(null), 3500);
    return false;
  };

  // Interactive Input States
  const [isAwaitingInput, setIsAwaitingInput] = useState(false);
  const [inputPrompts, setInputPrompts] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [terminalInputValue, setTerminalInputValue] = useState('');

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const currentLesson = lessons[currentLessonIndex] || LESSONS[0] || ({} as Lesson);
  const progressPercentage = lessons.length > 0 ? ((completedLessons.length) / lessons.length) * 100 : 0;

  // ---------------------------------------------------------------------------
  // FIREBASE CLASSROOM SYNC  // Classroom synchronization function
  const syncWithFirestore = async (user: FirebaseUser) => {
    if (!isFirebaseEnabled || !auth || !db) return;
    setIsSyncing(true);
    setSyncStatus('connecting');
    try {
      const uid = user.uid;
      const ref = doc(db, 'users', uid);
      const docSnap = await getDoc(ref).catch(err => handleFirestoreError(err, OperationType.GET, `users/${uid}`));
      
      let resolvedRestoreCode = '';
      if (docSnap.exists()) {
        const data = docSnap.data();
        dbCreatedAtRef.current = data.createdAt;
        resolvedRestoreCode = data.restoreCode || '';
        
        if (user.isAnonymous && !resolvedRestoreCode) {
          resolvedRestoreCode = generateRestoreCode();
        }
        setActiveRestoreCode(resolvedRestoreCode);
        
        const localCompleted = JSON.parse(localStorage.getItem('py-runner-completed') || '[]');
        const mergedCompleted = Array.from(new Set([...localCompleted, ...(data.completedLessons || [])]));
        
        const localUnlocked = JSON.parse(localStorage.getItem('py-runner-unlocked') || '["theme-default", "banner-default"]');
        const mergedUnlocked = Array.from(new Set([...localUnlocked, ...(data.unlockedIds || [])]));
        
        const localLevel = localStorage.getItem('py-runner-level') || 'basics';
        const mergedLevel = data.currentLevel || localLevel;
        
        const localLessonIndex = Number(localStorage.getItem('cyber-current-lesson') || '0');
        const mergedLessonIndex = data.currentLessonIndex !== undefined ? data.currentLessonIndex : localLessonIndex;
        
        const localInterest = localStorage.getItem('py-runner-interest') || 'Cyberpunk';
        const mergedInterest = data.userInterest || localInterest;
        
        const localBonus = Number(localStorage.getItem('py-runner-bonus-credits') || '0');
        const mergedBonus = Math.max(localBonus, data.bonusCredits || 0);
        
        const localCheats = JSON.parse(localStorage.getItem('py-runner-cheats-used') || '[]');
        const mergedCheats = Array.from(new Set([...localCheats, ...(data.cheatsUsed || [])]));
        
        const localBadges = JSON.parse(localStorage.getItem('py-runner-badges') || '[]');
        const mergedBadges = Array.from(new Set([...localBadges, ...(data.unlockedBadges || [])]));
        
        const localTheme = localStorage.getItem('py-runner-active-theme') || 'theme-default';
        const mergedTheme = (data.activeThemeId && data.activeThemeId !== 'theme-default') ? data.activeThemeId : localTheme;
        
        const localBanner = localStorage.getItem('py-runner-active-banner') || 'banner-default';
        const mergedBanner = (data.activeBannerId && data.activeBannerId !== 'banner-default') ? data.activeBannerId : localBanner;
        
        const localWallpaper = localStorage.getItem('py-runner-active-wallpaper') || null;
        const mergedWallpaper = data.activeWallpaperId || localWallpaper;
        
        const localSonic = localStorage.getItem('py-runner-sonic-unlocked') === 'true';
        const mergedSonic = data.isSonicUnlocked !== undefined ? (data.isSonicUnlocked || localSonic) : localSonic;
        
        const localSoundpack = localStorage.getItem('py-runner-active-soundpack') || null;
        const mergedSoundpack = data.activeSoundpackId || localSoundpack;
        
        const localVol = localStorage.getItem('py-runner-sound-volume') !== null ? Number(localStorage.getItem('py-runner-sound-volume')) : 0.35;
        const mergedVol = data.soundVolume !== undefined ? data.soundVolume : localVol;
        
        const localErrors = JSON.parse(localStorage.getItem('py-runner-lesson-errors') || '{}');
        const mergedErrors = { ...localErrors, ...(data.lessonErrors || {}) };
        
        const localHints = JSON.parse(localStorage.getItem('py-runner-hints-used') || '{}');
        const mergedHints = { ...localHints, ...(data.hintsUsed || {}) };
 
        setCompletedLessons(mergedCompleted);
        setUnlockedIds(mergedUnlocked);
        setCurrentLevel(mergedLevel as Level);
        setCurrentLessonIndex(mergedLessonIndex);
        setUserInterest(mergedInterest);
        setBonusCredits(mergedBonus);
        setCheatsUsed(mergedCheats);
        setUnlockedBadges(mergedBadges);
        setActiveThemeId(mergedTheme);
        setActiveBannerId(mergedBanner);
        setActiveWallpaperId(mergedWallpaper);
        setIsSonicUnlocked(mergedSonic);
        setActiveSoundpackId(mergedSoundpack);
        setSoundVolume(mergedVol);
        setLessonErrors(mergedErrors);
        setHintsUsed(mergedHints);
 
        const updatedPayload = {
          userId: uid,
          email: user.email || '',
          isAnonymous: user.isAnonymous || false,
          displayName: user.displayName || 'Learner',
          restoreCode: resolvedRestoreCode,
          createdAt: dbCreatedAtRef.current,
          updatedAt: serverTimestamp(),
          view,
          userInterest: mergedInterest,
          currentLevel: mergedLevel,
          currentLessonIndex: mergedLessonIndex,
          completedLessons: mergedCompleted,
          unlockedIds: mergedUnlocked,
          activeThemeId: mergedTheme,
          activeBannerId: mergedBanner,
          activeWallpaperId: mergedWallpaper,
          bonusCredits: mergedBonus,
          cheatsUsed: mergedCheats,
          unlockedBadges: mergedBadges,
          isSonicUnlocked: mergedSonic,
          activeSoundpackId: mergedSoundpack,
          soundVolume: mergedVol,
          lessonErrors: mergedErrors,
          hintsUsed: mergedHints
        };
        await setDoc(ref, updatedPayload).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${uid}`));
      } else {
        dbCreatedAtRef.current = serverTimestamp();
        
        let initRestoreCode = '';
        if (user.isAnonymous) {
          initRestoreCode = generateRestoreCode();
        }
        setActiveRestoreCode(initRestoreCode);
        
        const initialPayload = {
          userId: uid,
          email: user.email || '',
          isAnonymous: user.isAnonymous || false,
          displayName: user.displayName || 'Learner',
          restoreCode: initRestoreCode,
          createdAt: dbCreatedAtRef.current,
          updatedAt: serverTimestamp(),
          view,
          userInterest,
          currentLevel,
          currentLessonIndex,
          completedLessons,
          unlockedIds,
          activeThemeId,
          activeBannerId,
          activeWallpaperId,
          bonusCredits,
          cheatsUsed,
          unlockedBadges,
          isSonicUnlocked,
          activeSoundpackId,
          soundVolume,
          lessonErrors,
          hintsUsed
        };
        await setDoc(ref, initialPayload).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${uid}`));
        
        // Immediately fetch to retrieve the server-resolved createdAt timestamp
        const docSnap = await getDoc(ref).catch(err => handleFirestoreError(err, OperationType.GET, `users/${uid}`));
        if (docSnap.exists()) {
          dbCreatedAtRef.current = docSnap.data().createdAt;
        }
      }
      setIsSyncLoaded(true);
      setSyncStatus('synced');
    } catch (err) {
      console.error("Firestore synchronisation anomaly:", err);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  const saveProgressToFirestore = async (overrideState: Record<string, any> = {}) => {
    if (!isFirebaseEnabled || !auth || !auth.currentUser || !db) return;
    
    try {
      const uid = auth.currentUser.uid;
      const ref = doc(db, 'users', uid);
      
      if (!dbCreatedAtRef.current) {
        const snap = await getDoc(ref).catch(err => handleFirestoreError(err, OperationType.GET, `users/${uid}`));
        if (snap.exists()) {
          dbCreatedAtRef.current = snap.data().createdAt;
        }
      }
      
      const payload = {
        userId: uid,
        email: auth.currentUser.email || '',
        isAnonymous: auth.currentUser.isAnonymous || false,
        displayName: auth.currentUser.displayName || 'Learner',
        restoreCode: activeRestoreCode || '',
        createdAt: dbCreatedAtRef.current || serverTimestamp(),
        updatedAt: serverTimestamp(),
        view: overrideState.hasOwnProperty('view') ? overrideState.view : view,
        userInterest: overrideState.hasOwnProperty('userInterest') ? overrideState.userInterest : userInterest,
        currentLevel: overrideState.hasOwnProperty('currentLevel') ? overrideState.currentLevel : currentLevel,
        currentLessonIndex: overrideState.hasOwnProperty('currentLessonIndex') ? overrideState.currentLessonIndex : currentLessonIndex,
        completedLessons: overrideState.hasOwnProperty('completedLessons') ? overrideState.completedLessons : completedLessons,
        unlockedIds: overrideState.hasOwnProperty('unlockedIds') ? overrideState.unlockedIds : unlockedIds,
        activeThemeId: overrideState.hasOwnProperty('activeThemeId') ? overrideState.activeThemeId : activeThemeId,
        activeBannerId: overrideState.hasOwnProperty('activeBannerId') ? overrideState.activeBannerId : activeBannerId,
        activeWallpaperId: overrideState.hasOwnProperty('activeWallpaperId') ? overrideState.activeWallpaperId : activeWallpaperId,
        bonusCredits: overrideState.hasOwnProperty('bonusCredits') ? overrideState.bonusCredits : bonusCredits,
        cheatsUsed: overrideState.hasOwnProperty('cheatsUsed') ? overrideState.cheatsUsed : cheatsUsed,
        unlockedBadges: overrideState.hasOwnProperty('unlockedBadges') ? overrideState.unlockedBadges : unlockedBadges,
        isSonicUnlocked: overrideState.hasOwnProperty('isSonicUnlocked') ? overrideState.isSonicUnlocked : isSonicUnlocked,
        activeSoundpackId: overrideState.hasOwnProperty('activeSoundpackId') ? overrideState.activeSoundpackId : activeSoundpackId,
        soundVolume: overrideState.hasOwnProperty('soundVolume') ? overrideState.soundVolume : soundVolume,
        lessonErrors: overrideState.hasOwnProperty('lessonErrors') ? overrideState.lessonErrors : lessonErrors,
        hintsUsed: overrideState.hasOwnProperty('hintsUsed') ? overrideState.hintsUsed : hintsUsed
      };
      
      await setDoc(ref, payload).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${uid}`));
      setSyncStatus('synced');
    } catch (err) {
      console.error("Cloud push sync error:", err);
      setSyncStatus('error');
    }
  };

  const handleLogout = async () => {
    if (!isFirebaseEnabled || !auth) return;
    try {
      await signOut(auth);
      try {
        localStorage.clear();
      } catch (e) {}
      
      setCompletedLessons([]);
      setUnlockedIds(['theme-default', 'banner-default']);
      setActiveThemeId('theme-default');
      setActiveBannerId('banner-default');
      setActiveWallpaperId(null);
      setCurrentLevel('basics');
      setCurrentLessonIndex(0);
      setUserInterest('Cyberpunk');
      setBonusCredits(0);
      setCheatsUsed([]);
      setUnlockedBadges([]);
      setIsSonicUnlocked(false);
      setActiveSoundpackId(null);
      setSoundVolume(0.35);
      setLessonErrors({});
      setHintsUsed({});
      setView('landing');
      setActiveRestoreCode('');
      setIsSyncLoaded(false);
      setSyncStatus('local');
    } catch (err) {
      console.error("Log out transaction failed:", err);
    }
  };

  useEffect(() => {
    if (!isFirebaseEnabled || !auth) {
      setSyncStatus('local');
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);
        if (user) {
          await syncWithFirestore(user);
        } else {
          setSyncStatus('local');
          dbCreatedAtRef.current = null;
          setIsSyncLoaded(false);
        }
      } catch (err) {
        console.error("Error in onAuthStateChanged auth listener:", err);
      }
    });
    
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isSyncLoaded || !currentUser) return;
    
    const timeout = setTimeout(() => {
      saveProgressToFirestore().catch(e => {
        console.warn("Auto-sync save failed on background tick:", e);
      });
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [
    currentUser,
    isSyncLoaded,
    view,
    userInterest,
    currentLevel,
    currentLessonIndex,
    completedLessons,
    unlockedIds,
    activeThemeId,
    activeBannerId,
    activeWallpaperId,
    bonusCredits,
    cheatsUsed,
    unlockedBadges,
    isSonicUnlocked,
    activeSoundpackId,
    soundVolume,
    lessonErrors,
    hintsUsed
  ]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseEnabled || !auth) {
      setAuthError("CRITICAL: Firebase service is currently offline.");
      return;
    }
    
    setAuthError(null);
    setIsAuthLoading(true);
    
    try {
      if (authMode === 'signup') {
        if (!authEmail.trim() || !authPassword.trim() || !authDisplayName.trim()) {
          setAuthError("VALIDATION_ERROR: All credentials fields must be populated.");
          setIsAuthLoading(false);
          return;
        }
        if (authPassword.length < 6) {
          setAuthError("PASSWORD_MIN_LENGTH: Signal password must be at least 6 characters.");
          setIsAuthLoading(false);
          return;
        }
        
        const credential = await createUserWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        await updateProfile(credential.user, { displayName: authDisplayName.trim() });
        setCurrentUser(credential.user);
        await syncWithFirestore(credential.user);
        
      } else {
        if (!authEmail.trim() || !authPassword.trim()) {
          setAuthError("VALIDATION_ERROR: Target signature matches require password/email info.");
          setIsAuthLoading(false);
          return;
        }
        
        const credential = await signInWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        setCurrentUser(credential.user);
        await syncWithFirestore(credential.user);
      }
      
      setAuthEmail('');
      setAuthPassword('');
      setAuthDisplayName('');
      setAuthError(null);
      setShowAuthModal(false);
    } catch (err: any) {
      console.error("Auth transaction exception:", err);
      let errMsg = "AUTH_EXCEPTION: Transmission failed.";
      if (err.code === 'auth/email-already-in-use') {
        errMsg = "IDENTITY_CONFLICT: Email frequency is already register-locked.";
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        errMsg = "ACCESS_DENIED: Decoupled signature pairing matches no registered profile.";
      } else if (err.code === 'auth/invalid-email') {
        errMsg = "SYNTAX_ERROR: Invalid email sequence format.";
      } else if (err.message) {
        errMsg = `TRANSMISSION_ERROR: ${err.message}`;
      }
      setAuthError(errMsg);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSSO = async () => {
    if (!isFirebaseEnabled || !auth || !googleProvider) {
      setAuthError("CRITICAL: Authentication services are operating in local-only fallback.");
      return;
    }
    
    setAuthError(null);
    setIsAuthLoading(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
      await syncWithFirestore(result.user);
      
      setAuthEmail('');
      setAuthPassword('');
      setAuthDisplayName('');
      setAuthError(null);
      setShowAuthModal(false);
    } catch (err: any) {
      console.error("Google SSO connection crash:", err);
      let errMsg = "SSO_ABANDONED: Session link aborted.";
      if (err.message) {
        errMsg = `SSO_ERROR: ${err.message}`;
      }
      setAuthError(errMsg);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const generateRestoreCode = (): string => {
    // Exclude confusing characters: O, 0, I, 1
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i++) {
      suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `GUEST-${suffix}`;
  };

  const handleAnonymousLogin = async () => {
    if (!isFirebaseEnabled || !auth) {
      setAuthError("CRITICAL: Authentication services are operating in local-only fallback.");
      return;
    }
    
    setAuthError(null);
    setIsAuthLoading(true);
    
    try {
      const result = await signInAnonymously(auth);
      
      if (!result.user.displayName) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let suffix = '';
        for (let i = 0; i < 6; i++) {
          suffix += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const guestName = `guest_${suffix}`;
        await updateProfile(result.user, { displayName: guestName });
      }
      
      setCurrentUser(result.user);
      await syncWithFirestore(result.user);
      
      setAuthEmail('');
      setAuthPassword('');
      setAuthDisplayName('');
      setAuthError(null);
      setShowAuthModal(false);
    } catch (err: any) {
      console.error("Anonymous login error:", err);
      let errMsg = "ANONYMOUS_LOGIN_FAILED: Guest mode setup failed.";
      if (err.message) {
        errMsg = `GUEST_ERROR: ${err.message}`;
      }
      setAuthError(errMsg);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRestoreSession = async () => {
    if (!isFirebaseEnabled || !auth || !db) {
      setAuthError("CRITICAL: Cloud database services offline.");
      return;
    }
    
    if (!restoreCodeInput) {
      setAuthError("SYNTAX_ERROR: Enter a valid Restore Code sequence.");
      return;
    }
    
    setAuthError(null);
    setIsAuthLoading(true);
    
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('restoreCode', '==', restoreCodeInput));
      const querySnapshot = await getDocs(q).catch(err => handleFirestoreError(err, OperationType.LIST, 'users'));
      
      if (querySnapshot.empty) {
        setAuthError("RESOLVE_FAILED: Invalid or inactive Restore Code. Verify sequence.");
        setIsAuthLoading(false);
        return;
      }
      
      const srcDoc = querySnapshot.docs[0];
      const srcData = srcDoc.data();
      
      let targetUser = auth.currentUser;
      if (!targetUser) {
        const signinResult = await signInAnonymously(auth);
        targetUser = signinResult.user;
      }
      
      const targetUid = targetUser.uid;
      const targetRef = doc(db, 'users', targetUid);
      
      const updatedPayload = {
        ...srcData,
        userId: targetUid,
        email: '',
        isAnonymous: true,
        displayName: srcData.displayName || targetUser.displayName || 'Learner',
        restoreCode: srcData.restoreCode || restoreCodeInput,
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(targetRef, updatedPayload).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${targetUid}`));
      await updateProfile(targetUser, { displayName: updatedPayload.displayName });
      
      setCurrentUser(targetUser);
      setActiveRestoreCode(updatedPayload.restoreCode);
      await syncWithFirestore(targetUser);
      
      setRestoreCodeInput('');
      setAuthError(null);
      setShowAuthModal(false);
    } catch (err: any) {
      console.error("Session restore crash:", err);
      setAuthError(`RESTORE_CRASH: ${err.message || String(err)}`);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Reusable rendering function for Classroom Cloud Login & sign up modal
  const renderAuthModal = () => (
    <AnimatePresence>
      {showAuthModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!isAuthLoading) setShowAuthModal(false); }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-sm bg-slate-950 border-2 border-cyber-cyan/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col font-sans"
          >
            {/* Scanlines Overlay effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,24,38,0)_95%,rgba(6,182,212,0.06)_95%)] bg-[size:100%_24px] opacity-20" />
            
            <button
              onClick={() => setShowAuthModal(false)}
              disabled={isAuthLoading}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors disabled:opacity-30 cursor-pointer p-1 rounded-md border-none bg-transparent"
              aria-label="Close authentication panel"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-4">
              <div className="w-10 h-10 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl flex items-center justify-center mb-3 shadow-[0_0_15px_var(--primary-alpha)]">
                <Database className="w-4 h-4 text-cyber-cyan animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-black tracking-[0.25em] text-cyber-cyan uppercase block mb-1">PROGRES_SYNC_PROTOCOL</span>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Classroom Cloud Portal</h3>
              </div>
            </div>

            {authError && (
              <div className="p-3 mb-4 bg-rose-955/40 border border-rose-500/30 rounded-lg text-rose-400 font-mono text-[9px] leading-relaxed break-words flex gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">SYSTEM_LOG_ERROR:</span> {authError}
                </div>
              </div>
            )}

            {/* GDPR-COMPLIANT GUEST SANDBOX (OPTION 1 - RECOMMENDED) */}
            {authMode !== 'restore' && (
              <div className="mb-4 p-3 bg-slate-900 border border-emerald-500/25 rounded-xl flex flex-col gap-2.5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex gap-2 items-start">
                  <div className="px-1 py-0.5 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 font-mono text-[7px] font-bold rounded uppercase tracking-wider">
                    GDPR PREFERRED
                  </div>
                  <div className="font-sans text-[9px] text-slate-400 leading-tight">
                    <span className="font-semibold text-emerald-300">Option 1: Guest Session (Zero PII).</span> Save progress without personal account logs. Retrieve anytime using a clean <span className="text-white">Restore Code</span>.{' '}
                    <button
                      type="button"
                      onClick={() => setShowGuestHelpModal(true)}
                      className="text-emerald-400 hover:text-emerald-300 underline font-black bg-transparent border-none p-0 cursor-pointer inline-block ml-1 transition-all"
                    >
                      (How it works)
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleAnonymousLogin}
                    disabled={isAuthLoading}
                    className="py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-mono text-[8px] font-black uppercase tracking-wider rounded transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer border-none"
                  >
                    <Unlock className="w-2.5 h-2.5" />
                    <span>Launch Guest</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('restore'); setAuthError(null); }}
                    disabled={isAuthLoading}
                    className="py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-mono text-[8px] font-black uppercase tracking-wider rounded transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RefreshCcw className="w-2.5 h-2.5 text-cyan-400" />
                    <span>Restore guest</span>
                  </button>
                </div>
              </div>
            )}

            {authMode === 'restore' ? (
              <div className="space-y-4">
                <span className="text-[9px] font-black tracking-[0.25em] text-cyber-cyan uppercase block mb-1">RECOVERY_DECRYPTOR</span>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Enter your secure <span className="text-cyber-cyan font-semibold">Restore Code</span> (e.g. <code className="text-white bg-slate-900 px-1 py-0.5 rounded">GUEST-XXXXXX</code>) to retrieve your exact progress database.
                </p>
                
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">RESTORE_KEYCODE</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      spellCheck={false}
                      required
                      disabled={isAuthLoading}
                      value={restoreCodeInput}
                      onChange={(e) => setRestoreCodeInput(e.target.value.toUpperCase().trim())}
                      placeholder="GUEST-XXXXXX"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyber-cyan rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(null); }}
                    className="w-1/3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRestoreSession}
                    disabled={isAuthLoading || !restoreCodeInput}
                    className="w-2/3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-mono text-[9px] font-black uppercase tracking-wider rounded transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>DECRYPT & CLONE</span>
                  </button>
                </div>
              </div>
            ) : showExtendedAuthOptions ? (
              <>
                <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1 rounded border border-white/5 mb-4 select-none">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(null); }}
                    className={`py-1.5 text-[9px] font-mono font-black uppercase tracking-wider rounded transition-all cursor-pointer border-none ${
                      authMode === 'login'
                        ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan glow-text shadow-sm'
                        : 'text-slate-500 hover:text-slate-300 bg-transparent'
                    }`}
                  >
                    Student Login
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setAuthError(null); }}
                    className={`py-1.5 text-[9px] font-mono font-black uppercase tracking-wider rounded transition-all cursor-pointer border-none ${
                      authMode === 'signup'
                        ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan glow-text shadow-sm'
                        : 'text-slate-500 hover:text-slate-300 bg-transparent'
                    }`}
                  >
                    Create Profile
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">DISPLAY_NAME (LEARNER_ID)</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          spellCheck={false}
                          autoCapitalize="words"
                          required
                          disabled={isAuthLoading}
                          value={authDisplayName}
                          onChange={(e) => setAuthDisplayName(e.target.value)}
                          placeholder="e.g. Isaac Newton"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-cyber-cyan rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">STUDENT_EMAIL_FREQUENCY</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        disabled={isAuthLoading}
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="e.g. student@school.edu"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-cyber-cyan rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">SECRET_SIGNAL_PASSWORD</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="password"
                        required
                        disabled={isAuthLoading}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-cyber-cyan rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full py-2 bg-gradient-to-r from-cyber-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      {isAuthLoading ? (
                        <>
                          <RefreshCcw className="w-4 h-4 animate-spin" />
                          <span>PROCESSING...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{authMode === 'login' ? 'DECIPHER & CONNECT' : 'INITIALISE PROFILE LINK'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="flex items-center my-3">
                  <div className="flex-1 h-px bg-slate-800" />
                  <span className="px-3 font-mono text-[8px] text-slate-600 font-bold tracking-widest">OR</span>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSSO}
                  disabled={isAuthLoading}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 focus:border-cyber-cyan rounded-lg text-slate-300 font-sans text-xs font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.34 7.5l3.85 2.99C6.1 7.21 8.8 5.04 12 5.04z"/>
                    <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.2-2.3H12v4.4h6.43c-.28 1.44-1.1 2.66-2.33 3.48l3.6 2.79c2.1-1.94 3.75-4.8 3.75-8.37z"/>
                    <path fill="#FBBC05" d="M5.19 14.5c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.34 6.9C.48 8.63 0 10.56 0 12.5s.48 3.87 1.34 5.6l3.85-2.6z"/>
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.6-2.79c-1 .67-2.28 1.07-3.96 1.07-3.2 0-5.9-2.17-6.86-5.08l-3.85 2.99C3.37 20.35 7.35 23 12 23z"/>
                  </svg>
                  <span>Google Single Sign-On</span>
                </button>
              </>
            ) : null}

            <div className="text-center mt-5">
              <span className="text-[8px] font-mono text-slate-600 font-bold uppercase tracking-widest block leading-normal">
                Classroom Database System Secured
              </span>
              <span className="text-[7px] font-mono text-slate-700 block mt-0.5">
                Secure signatures enforced by Firestore core (No PII in Guest Mode)
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render function for Guest Mode Explanation Modal
  const renderGuestHelpModal = () => (
    <AnimatePresence>
      {showGuestHelpModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGuestHelpModal(false)}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-slate-950 border-2 border-emerald-500 rounded-2xl p-5 shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col font-sans"
          >
            {/* Ambient greenish glow accent */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            
            <button
              onClick={() => setShowGuestHelpModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer p-1 rounded-md border-none bg-transparent"
              aria-label="Close information"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-[8px] font-black tracking-[0.25em] text-emerald-400 uppercase block mb-1">DATA_PROTECTION_ACT</span>
                <h3 className="text-base font-bold text-white uppercase tracking-tight">How Guest Mode Works</h3>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left my-1.5">
              {/* Point 1: Zero-PII */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-200">Zero PII (GDPR Compliant)</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                    Start coding instantly without disclosing your email address, passwords, or other personal profile metrics.
                  </p>
                </div>
              </div>

              {/* Point 2: Active Sync */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-200">Active Database Persistence</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                    All your completed challenges, custom configurations, badges, and sandbox notebooks are securely synchronized to Cloud Firestore in real time.
                  </p>
                </div>
              </div>

              {/* Point 3: Binds to a Restore Code */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Key className="w-3 h-3 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-200">Binds to a Restore Code</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                    Instead of logins, we issue you a unique secure <span className="text-amber-400 font-bold">Restore Code</span>. You can copy it from your profile header at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Example code box */}
            <div className="mt-4 p-2.5 bg-slate-900 border border-white/5 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 select-none">
              <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-wider">Example Restore Key Sequence</span>
              <div className="font-mono text-xs font-black text-amber-500 bg-black/60 px-3 py-1 rounded-md border border-amber-500/20 shadow-inner flex items-center gap-2">
                <Key className="w-3 h-3 text-amber-500" />
                <span>GUEST-XXXXXX</span>
              </div>
              <span className="text-[8px] text-slate-500 leading-normal max-w-[240px]">
                Enter this code to restore your session or switch physical devices without losing key progress!
              </span>
            </div>

            <button
              onClick={() => setShowGuestHelpModal(false)}
              className="mt-5 w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer border-none shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:text-white"
            >
              Understand Secure Link
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [feedback, isChecking]);

  useEffect(() => {
    if (currentLesson) {
      setUserCode(currentLesson.baseCode);
      setFeedback(null);
      setShowHintSnippet(false);
      setShowDeepHelp(false);
      setShowResultOverlay(false);
      setCodeErrors([]);
      setLessonStartTime(Date.now()); // Start timer for Speed Runner badge
    }
    const saved = localStorage.getItem('cybercoder_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed);
        } else {
          setCompletedLessons([]);
        }
      } catch (e) {
        console.warn("Failed to parse progress", e);
        setCompletedLessons([]);
      }
    }
  }, [currentLessonIndex, currentLesson?.id, lessons]);

  useEffect(() => {
    const timer = setTimeout(() => {
      lintUserCode(userCode);
    }, 500);
    return () => clearTimeout(timer);
  }, [userCode]);

  const lintUserCode = (code: string) => {
    const result = validateCodeLocally(code, currentLesson.solutionRegex || []);
    setCodeErrors(result.errors);
  };

  const saveProgress = (lessonId: string) => {
    const newProgress = Array.from(new Set([...completedLessons, lessonId]));
    setCompletedLessons(newProgress);
    localStorage.setItem('cybercoder_progress', JSON.stringify(newProgress));
  };

  const handleEditorChange = (value: string | undefined) => {
    setUserCode(value || '');
  };

  const handleRunCode = async () => {
    // Reset states
    setIsAwaitingInput(false);
    setInputPrompts([]);
    setInputValues([]);
    setCurrentInputIndex(0);
    setTerminalInputValue('');
    setCodeErrors([]);
    setFeedback(null);
    setShowResultOverlay(false);

    // Intercept Python Easter Egg codes inside the code editor
    const normalizedCode = userCode.toLowerCase().replace(/\s+/g, ' ').trim().replace(/['"()]/g, '');
    
    if (normalizedCode.includes('import matrix') || normalizedCode.includes('cyber_coordinates') || normalizedCode.includes('follow the white rabbit')) {
      setIsChecking(true);
      await new Promise(r => setTimeout(r, 600));
      setIsChecking(false);
      setMatrixActive(true);
      setFeedback({
        success: true,
        message: "STABILIZED CORE LINK",
        output: ">>> Matrix override protocol injected successfully.\n>>> 'Follow the white rabbit' signal detected.\n>>> Launching digital waterfall module..."
      });
      setShowResultOverlay(true);
      setTimeout(() => setShowResultOverlay(false), 3000);
      return;
    }
    
    if (normalizedCode.includes('import rick') || normalizedCode.includes('rickroll')) {
      setIsChecking(true);
      await new Promise(r => setTimeout(r, 600));
      setIsChecking(false);
      setRickrollActive(true);
      setFeedback({
        success: true,
        message: "NEURAL RIC_ROLL ACTIVE",
        output: ">>> Never gonna give you up...\n>>> Injecting nostalgic frequency nodes..."
      });
      setShowResultOverlay(true);
      setTimeout(() => setShowResultOverlay(false), 3000);
      return;
    }
    
    if (normalizedCode.includes('import party') || normalizedCode.includes('party_mode')) {
      setIsChecking(true);
      await new Promise(r => setTimeout(r, 600));
      setIsChecking(false);
      setPartyActive(prev => !prev);
      setFeedback({
        success: true,
        message: "RGB SPECTRUM CYCLED",
        output: `>>> Rotating accent RGB spectrum oscillators: ${!partyActive ? 'OFF -> ON' : 'ON -> OFF'}`
      });
      setShowResultOverlay(true);
      setTimeout(() => setShowResultOverlay(false), 3000);
      return;
    }
    
    if (normalizedCode.includes('import larry') || normalizedCode.includes('summon larry')) {
      setIsChecking(true);
      await new Promise(r => setTimeout(r, 600));
      setIsChecking(false);
      setLarryActive(prev => !prev);
      setFeedback({
        success: true,
        message: "COMPANION INITIALIZED",
        output: ">>> Larry the Mastiff is now standing guard in your terminal deck."
      });
      setShowResultOverlay(true);
      setTimeout(() => setShowResultOverlay(false), 3000);
      return;
    }
    
    if (normalizedCode.includes('xyzzy') || normalizedCode.includes('magic_override') || normalizedCode.includes('import magic')) {
      setIsChecking(true);
      await new Promise(r => setTimeout(r, 600));
      setIsChecking(false);
      
      if (!cheatsUsed.includes('xyzzy')) {
        setBonusCredits(prev => prev + 500);
        const newCheats = [...cheatsUsed, 'xyzzy'];
        setCheatsUsed(newCheats);
        localStorage.setItem('py-runner-cheats-used', JSON.stringify(newCheats));
        setFeedback({
          success: true,
          message: "MAGIC BYPASS GRANTED",
          output: ">>> XYZZY magic spell bypass validated.\n>>> +500 Credits added to user matrix account!"
        });
      } else {
        setFeedback({
          success: false,
          message: "SPELL ACCESS REUSED",
          output: ">>> Magic spell bypass already claimed. Mainframe cannot duplicate credit assets."
        });
      }
      setShowResultOverlay(true);
      setTimeout(() => setShowResultOverlay(false), 3000);
      return;
    }

    // Dynamic execution: start without inputs and see if it requests them
    executeAnalysis([]);
  };

  const executeAnalysis = async (userInputs: string[]) => {
    setIsChecking(true);

    // Using the deterministic local validator
    const result: any = validateCodeLocally(userCode, currentLesson.solutionRegex || [], userInputs);
    
    // Artificial delay to simulate neural processing if core is active
    if (autonomousCore) {
      await new Promise(r => setTimeout(r, 600));
    }

    // Check if simulation is suspended awaiting user input
    if (result.awaitingInput) {
      setIsChecking(false);
      setInputPrompts([result.lastPrompt]);
      setCurrentInputIndex(0); // We handle one dynamic prompt at a time now
      setIsAwaitingInput(true);
      setFeedback({ 
        success: false, 
        message: result.feedback,
        output: result.output
      });
      setTimeout(() => terminalInputRef.current?.focus(), 100);
      return;
    }

    setIsChecking(false);
    const success = result.success;

    // Use the errors from the local diagnostic engine
    if (result.errors && result.errors.length > 0) {
      setCodeErrors(result.errors);
    }
    
    setFeedback({ 
      success, 
      message: result.feedback,
      output: result.output
    });
    
    // Check Coffee Overload on compile/run too!
    checkLateNightStudy();

    if (success) {
      if (activeSoundpackId) {
        soundService.playSuccess(activeSoundpackId);
      }
      saveProgress(currentLesson.id);

      // --- CHECK ACHIEVEMENTS FOR SUCCESS ---
      // 1. SPEED RUNNER (Task solved inside 60 seconds)
      const elapsedSeconds = (Date.now() - lessonStartTime) / 1000;
      if (elapsedSeconds < 60) {
        unlockBadge('speed-runner');
      }

      // 2. PERFECT COMBO
      const currentLevelId = currentLesson.level;
      const levelLessons = lessons.filter(l => l.level === currentLevelId);
      const isAllCompleted = levelLessons.every(l => 
        l.id === currentLesson.id || completedLessons.includes(l.id)
      );
      if (isAllCompleted) {
        const usedHintsInLevel = levelLessons.some(l => hintsUsed[l.id] === true);
        if (!usedHintsInLevel) {
          unlockBadge('perfect-combo');
        }
      }
    } else {
      if (activeSoundpackId) {
        soundService.playError(activeSoundpackId);
      }
      // --- CHECK ACHIEVEMENTS FOR ERRORS ---
      // 3. NULL POINTER KEYRING (5 failures / syntax errors on the same task)
      const currentLessonId = currentLesson.id;
      setLessonErrors(prev => {
        const newCount = (prev[currentLessonId] || 0) + 1;
        const nextErrors = { ...prev, [currentLessonId]: newCount };
        localStorage.setItem('py-runner-lesson-errors', JSON.stringify(nextErrors));
        if (newCount >= 5) {
          unlockBadge('null-pointer');
        }
        return nextErrors;
      });
    }
    
    setShowResultOverlay(true);
    setTimeout(() => setShowResultOverlay(false), 3000);
  };

  const handleTerminalInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAwaitingInput) return;

    const newValues = [...inputValues, terminalInputValue];
    setInputValues(newValues);
    setTerminalInputValue('');
    setIsAwaitingInput(false);

    // Resume execution with the new input set
    executeAnalysis(newValues);
  };

  const handleGetHint = () => {
    setShowHintSnippet(true);
    
    // Track that hint was requested for this lesson so they can't get "Perfect Combo"
    const currentLessonId = currentLesson.id;
    setHintsUsed(prev => {
      const newHints = { ...prev, [currentLessonId]: true };
      localStorage.setItem('py-runner-hints-used', JSON.stringify(newHints));
      return newHints;
    });

    // If Autonomous Core is active, we could generate more dynamic hints here in the future
    if (autonomousCore) {
      console.log("Autonomous Core: Enhancing hint logic...");
    }
  };

  const initializeNeuralLink = async () => {
    setIsRetheming(true);
    try {
      const matchingReward = findThemeByInterest(userInterest);

      if (matchingReward) {
        setActiveThemeId(matchingReward.id);
      }

      const themed = await rethemeLessons(userInterest, LESSONS);
      setLessons(themed);
      setView('app');
    } catch (e) {
      console.warn("Static retheme fallback", e);
      setView('app');
    } finally {
      setIsRetheming(false);
    }
  };

  const launchDirectTheme = async (interestName: string, themeId: string) => {
    setDirectLaunchingTheme(themeId);
    if (soundService.playMenuSelect) soundService.playMenuSelect();
    setUserInterest(interestName);
    setActiveThemeId(themeId);
    setHasCompletedTutorial(true);
    try {
      localStorage.setItem('py-runner-tutorial-completed', 'true');
      localStorage.setItem('py-runner-interest', interestName);
      localStorage.setItem('py-runner-active-theme', themeId);
    } catch (e) {}

    setIsRetheming(true);
    try {
      const themed = await rethemeLessons(interestName, LESSONS);
      setLessons(themed);
      setView('app');
    } catch (e) {
      console.warn("Direct theme launch fallback", e);
      setView('app');
    } finally {
      setIsRetheming(false);
      setDirectLaunchingTheme(null);
    }
  };

  // RESIZE HANDLERS
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingH && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        if (newWidth > 20 && newWidth < 80) {
          setLeftPanelWidth(newWidth);
        }
      }

      if (isResizingV && rightPanelRef.current) {
        const panelRect = rightPanelRef.current.getBoundingClientRect();
        const newHeight = ((e.clientY - panelRect.top) / panelRect.height) * 100;
        if (newHeight > 20 && newHeight < 80) {
          setTopPanelHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingH(false);
      setIsResizingV(false);
      document.body.style.cursor = 'default';
    };

    if (isResizingH || isResizingV) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizingH ? 'col-resize' : 'row-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingH, isResizingV]);

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-cyber-dark text-[var(--text-main)] font-sans selection:bg-cyber-cyan selection:text-black overflow-y-auto flex flex-col relative tracking-tight" data-theme={previewTheme?.value}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-cyber-cyan focus:text-black font-bold">
          Skip to main content
        </a>
        {/* User Provided Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent"></div>
        </div>

        {/* Landing Page Top Navigation Header */}
        <header className="w-full z-40 flex items-center justify-between px-6 py-4 bg-black/45 border-b border-white/5 backdrop-blur-md relative select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span className="font-mono text-[10px] font-black tracking-widest text-slate-400 uppercase">PY-NET_RUNNER</span>
          </div>

          {/* CLASSROOM DATABASE SYNC COMPONENT */}
          {isFirebaseEnabled && (
            <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2 animate-fadeIn">
                  <div 
                    title={
                      syncStatus === 'synced' 
                        ? 'All progress securely backed up to Classroom Cloud.' 
                        : syncStatus === 'connecting' 
                          ? 'Synchronising session arrays...' 
                          : 'Synchronisation interrupted.'
                    }
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/5 font-mono text-[9px]"
                  >
                    {syncStatus === 'synced' && (
                      <>
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold uppercase tracking-wider hidden md:inline">SYNCED</span>
                      </>
                    )}
                    {syncStatus === 'connecting' && (
                      <>
                        <RefreshCcw className="w-3 h-3 text-cyan-400 animate-spin" />
                        <span className="text-cyan-400 font-bold uppercase tracking-wider hidden md:inline">SYNCING</span>
                      </>
                    )}
                    {syncStatus === 'error' && (
                      <>
                        <CloudOff className="w-3 h-3 text-rose-500 animate-pulse" />
                        <span className="text-rose-500 font-bold uppercase tracking-wider hidden md:inline">ERR_LINK</span>
                      </>
                    )}
                  </div>

                  {currentUser.isAnonymous && activeRestoreCode && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeRestoreCode);
                        setCopiedRestoreCode(true);
                        setTimeout(() => setCopiedRestoreCode(false), 2000);
                      }}
                      title="Copy secure Guest Restore Code to easily restore your progress anytime!"
                      className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/35 hover:border-amber-500/75 px-2.5 py-1 rounded-full text-[9px] text-amber-500 font-mono transition-all cursor-pointer font-bold select-none hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    >
                      <Key className="w-2.5 h-2.5" />
                      <span>{copiedRestoreCode ? 'COPIED!' : activeRestoreCode}</span>
                    </button>
                  )}

                  <div 
                    className="flex items-center gap-2 bg-slate-900 border border-cyber-cyan/25 hover:border-cyber-cyan/45 px-2.5 py-1 rounded-full text-slate-300 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span className="text-[10px] font-bold font-sans hidden sm:inline max-w-[100px] truncate">
                      {currentUser.displayName || currentUser.email?.split('@')[0] || 'Learner'}
                    </span>
                    <button 
                      onClick={handleLogout}
                      title="Log Out (Purge Session Safety)"
                      className="text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded p-0.5 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthError(null); setAuthMode('login'); setShowAuthModal(true); }}
                  className="px-4 py-1.5 bg-gradient-to-r from-cyber-cyan to-blue-600 border border-cyber-cyan/40 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-[9px] font-black tracking-widest rounded-full uppercase cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
                >
                  <Cloud className="w-3 h-3 text-white" />
                  <span>CLASSROOM SYNC</span>
                </button>
              )}
            </div>
          )}
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto w-full">
          <div
            className="text-center space-y-6 w-full"
          >
            {(() => {
              const themeData = getInitialSectionTheme(previewTheme?.value || 'cyan');
              return (
                <div className="space-y-3 min-h-[160px] md:min-h-[130px] flex flex-col justify-center">
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter drop-shadow-md select-none transition-all duration-300 ${themeData.glowClass}`}>
                    {themeData.title}
                    <span className={`text-[10px] font-mono align-middle ml-2 px-2.5 py-0.5 rounded-full border transition-all duration-300 ${themeData.badgeClass} inline-block`}>
                      {themeData.badge}
                    </span>
                  </h1>
                  <p className="text-xs md:text-sm text-[var(--text-dim)] font-medium max-w-2xl mx-auto drop-shadow-md transition-all duration-300 leading-relaxed min-h-[32px] flex items-center justify-center">
                    {themeData.subtitle}
                  </p>
                </div>
              );
            })()}

            {/* Three-Column Row on Desktop: How it works, Customizer, and Telemetry Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch justify-center w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto">
              {/* Column 1: Interactive Stepper Card */}
              <div className="w-full flex animate-fade-in-up">
                <div className="p-6 bg-black/40 border border-slate-850 rounded-3xl backdrop-blur-sm shadow-2xl w-full flex flex-col justify-between relative overflow-hidden group">
                  {/* Subtle decorative background glows */}
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyber-pink/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                        </span>
                        <h3 className="font-mono text-[11px] font-black tracking-widest text-cyber-cyan uppercase">
                          HOW PY-QUEST WORKS
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-black">
                        STEP {activeTutorialStep} OF 3
                      </span>
                    </div>

                    {/* Timeline Headers: Interactive Node Dots */}
                    <div className="flex items-center justify-between px-4 mb-6 relative">
                      {/* Gray connecting line background */}
                      <div className="absolute left-8 right-8 top-[15px] h-[2px] bg-slate-800/80 pointer-events-none z-0" />
                      
                      {/* Active green/blue filled track */}
                      <div className="absolute left-8 right-8 top-[15px] h-[2px] pointer-events-none z-0">
                        <div 
                          className="h-full bg-cyber-cyan transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                          style={{ width: `${((activeTutorialStep - 1) / 2) * 100}%` }}
                        />
                      </div>

                      {[1, 2, 3].map((step) => {
                        const isCompleted = step < activeTutorialStep;
                        const isActive = step === activeTutorialStep;
                        return (
                          <button
                            key={step}
                            onClick={() => {
                              setActiveTutorialStep(step);
                              if (soundService.playMenuSelect) soundService.playMenuSelect();
                            }}
                            className="relative z-10 flex flex-col items-center group/node focus:outline-none cursor-pointer"
                          >
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all duration-300 border ${
                                isActive 
                                  ? 'bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-110' 
                                  : isCompleted
                                    ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/40 scale-100 hover:border-cyber-cyan hover:bg-cyber-cyan/25'
                                    : 'bg-slate-950 text-slate-500 border-slate-800 scale-95 hover:border-slate-700 hover:text-slate-300'
                              }`}
                            >
                              {isCompleted ? '✓' : step}
                            </div>
                            <span 
                              className={`text-[9.5px] font-mono font-black uppercase tracking-wider mt-2 transition-colors duration-200 ${
                                isActive 
                                  ? 'text-cyber-cyan glow-text-cyan' 
                                  : 'text-slate-500 group-hover/node:text-slate-400'
                              }`}
                            >
                              {step === 1 ? 'DOMAIN' : step === 2 ? 'SYNC' : 'LAUNCH'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Step Display Panel */}
                    <div className="h-[220px] sm:h-[160px] lg:h-[240px] xl:h-[195px] bg-[#070913]/70 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTutorialStep}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="space-y-2.5 text-left"
                        >
                          {activeTutorialStep === 1 && (
                            <>
                              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[9px] font-black tracking-widest uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 w-fit">
                                🚀 STEP 1 / CHOOSE YOUR THEME
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                                Pick a personalized universe (e.g., <span className="text-amber-400 font-mono font-black">Space</span>, <span className="text-cyan-400 font-mono font-black">Marvel</span>, or <span className="text-rose-400 font-mono font-black">Simpsons</span>) list on the right. This instantly adapts all lesson examples to your selected interests.
                              </p>
                            </>
                          )}
                          {activeTutorialStep === 2 && (
                            <>
                              <div className="flex items-center gap-1.5 text-cyber-cyan font-mono text-[9px] font-black tracking-widest uppercase bg-cyber-cyan/10 px-2.5 py-0.5 rounded border border-cyber-cyan/20 w-fit">
                                ⌬ SYNCHRONIZE MAINBOARD
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                                Press the <span className="text-cyber-cyan font-black uppercase">Initialize Connection</span> button. This triggers our compiler engine to update variables, narratives, and questions across the database.
                              </p>
                            </>
                          )}
                          {activeTutorialStep === 3 && (
                            <>
                              <div className="flex items-center gap-1.5 text-cyber-pink font-mono text-[9px] font-black tracking-widest uppercase bg-cyber-pink/10 px-2.5 py-0.5 rounded border border-cyber-pink/20 w-fit">
                                ⚔️ COGNITIVE CHALLENGES ACTIVE
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                                Choose from three distinct game modes: <span className="text-amber-450 font-black">Debug Arena</span> (spot syntax bugs), <span className="text-cyber-cyan font-black">Creative Lab</span> (continuous logic), or <span className="text-emerald-400 font-black">Flowchart Lab</span> (visual flowchart mapping).
                              </p>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Navigation controller buttons */}
                  <div className="flex items-center justify-between mt-5 border-t border-slate-800/40 pt-4 gap-2">
                    <button
                      disabled={activeTutorialStep === 1}
                      onClick={() => {
                        setActiveTutorialStep(prev => Math.max(1, prev - 1));
                        if (soundService.playMenuSelect) soundService.playMenuSelect();
                      }}
                      className="px-3.5 py-2 rounded-xl text-[10px] font-mono font-black text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700 bg-slate-900/40 disabled:opacity-35 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      ⟪ PREV
                    </button>

                    {!hasCompletedTutorial && (
                      <button
                        onClick={() => {
                          setHasCompletedTutorial(true);
                          try {
                            localStorage.setItem('py-runner-tutorial-completed', 'true');
                          } catch (e) {}
                          if (soundService.playMenuSelect) soundService.playMenuSelect();
                        }}
                        className="text-[9px] font-mono font-black text-slate-500 hover:text-cyber-cyan hover:underline transition-all uppercase cursor-pointer"
                        title="Skip the onboarding tour and unlock all features immediately"
                      >
                        [SKIP INTRO]
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        if (activeTutorialStep < 3) {
                          setActiveTutorialStep(prev => prev + 1);
                        } else {
                          if (!hasCompletedTutorial) {
                            setHasCompletedTutorial(true);
                            try {
                              localStorage.setItem('py-runner-tutorial-completed', 'true');
                            } catch (e) {}
                          } else {
                            setHasCompletedTutorial(false);
                            setActiveTutorialStep(1); // loop back
                            try {
                              localStorage.removeItem('py-runner-tutorial-completed');
                            } catch (e) {}
                          }
                        }
                        if (soundService.playMenuSelect) soundService.playMenuSelect();
                      }}
                      className={`px-3.5 py-2 rounded-xl text-[10px] font-mono font-black transition-all active:scale-95 flex items-center gap-1 ${
                        activeTutorialStep === 3 && !hasCompletedTutorial
                          ? 'bg-gradient-to-r from-cyber-pink to-purple-600 text-white border border-cyber-pink/40 hover:from-pink-500 hover:to-purple-500 shadow-[0_0_15px_rgba(255,0,127,0.4)] uppercase tracking-wider'
                          : 'text-[#00f2ff] border border-[#00f2ff]/20 hover:border-[#00f2ff]/60 hover:bg-[#00f2ff]/5 uppercase tracking-wider'
                      }`}
                    >
                      <span>
                        {activeTutorialStep === 3 
                          ? (hasCompletedTutorial ? 'RESTART TOUR ⟲' : 'INITIALIZE SYSTEM ⚡') 
                          : 'NEXT STEP ⟫'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 2: Learn Python & Theme Environment Selector Card */}
              <div className="w-full flex relative group/sync animate-fade-in-up">
                <div className="bg-black/50 p-4 sm:p-5 md:p-6 border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md w-full flex flex-col justify-between transition-all duration-700">
                  <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                    <Radio className="w-16 h-16 text-cyber-cyan" />
                  </div>

                  {/* Header */}
                  <div className="relative z-10 mb-3 pb-3 border-b border-white/5 flex items-start justify-between gap-2">
                    <div className="text-left space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">Learn Python</h2>
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-black uppercase tracking-wider bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                          THEMES
                        </span>
                      </div>
                      <p className="text-[10px] text-cyber-cyan/60 uppercase tracking-[0.2em] font-mono">
                        Customize your training environment
                      </p>
                    </div>

                    {directLaunchingTheme && (
                      <div className="flex items-center gap-1.5 text-[8.5px] font-mono font-bold text-cyber-cyan bg-cyber-cyan/10 px-2.5 py-1 rounded-full border border-cyber-cyan/30 animate-pulse shrink-0">
                        <span className="animate-spin text-xs">⌬</span>
                        <span className="hidden sm:inline">LAUNCHING...</span>
                      </div>
                    )}
                  </div>

                  {/* Theme Buttons List */}
                  <div className="relative z-10 space-y-2 max-h-[380px] overflow-y-auto pr-1.5 custom-scrollbar">
                    {THEME_OPTIONS.map((theme) => {
                      const isLaunching = directLaunchingTheme === theme.id;
                      const isSelected = (userInterest || '').toLowerCase() === theme.name.toLowerCase() || activeThemeId === theme.id;
                      const isDemoTarget = demoActiveTheme === theme.name;

                      return (
                        <button
                          key={theme.id}
                          id={`btn-theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`}
                          type="button"
                          onClick={() => launchDirectTheme(theme.name, theme.id)}
                          disabled={isRetheming || directLaunchingTheme !== null}
                          title={`${theme.name} — ${theme.tagline}`}
                          className={`w-full group relative p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-between active:scale-[0.98] ${
                            isLaunching || isSelected
                              ? theme.bgActive
                              : `${theme.bgBase} ${theme.borderColor} hover:scale-[1.01] hover:shadow-lg`
                          } ${isDemoTarget ? 'ring-2 ring-cyber-cyan scale-105 shadow-[0_0_20px_rgba(6,182,212,0.6)]' : ''}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform ${theme.iconBg}`}>
                              {theme.symbol}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                                <span className={`font-black text-xs sm:text-[13px] tracking-tight uppercase leading-snug break-words ${theme.titleColor}`}>
                                  {theme.name}
                                </span>
                                <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded font-black uppercase tracking-wider border shrink-0 ${theme.badgeColor}`}>
                                  {theme.badge}
                                </span>
                              </div>
                              <span className="text-[9.5px] text-slate-400 font-mono block truncate mt-0.5" title={theme.tagline}>
                                {theme.tagline}
                              </span>
                            </div>
                          </div>

                          <div className={`flex items-center gap-1 text-slate-400 transition-all shrink-0 pl-1.5 ${theme.glowColor} group-hover:translate-x-0.5`}>
                            {isLaunching ? (
                              <span className="animate-spin text-sm text-cyber-cyan">⌬</span>
                            ) : (
                              <>
                                <span className="font-mono text-[9px] font-black uppercase text-slate-400 group-hover:text-white hidden sm:inline whitespace-nowrap">
                                  {isSelected ? 'ACTIVE' : 'GO'}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {/* Custom Theme Option expandable toggle */}
                    <div className="pt-1.5">
                      {!showCustomThemeInput ? (
                        <button
                          type="button"
                          onClick={() => setShowCustomThemeInput(true)}
                          className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-800 hover:border-cyber-cyan/40 bg-black/30 hover:bg-cyber-cyan/5 text-slate-400 hover:text-cyber-cyan text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>✨ + Custom Theme Domain</span>
                        </button>
                      ) : (
                        <div className="p-2.5 rounded-xl border border-cyber-cyan/30 bg-black/60 space-y-2 animate-fade-in-up">
                          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                            <span>ENTER CUSTOM DOMAIN</span>
                            <button
                              type="button"
                              onClick={() => setShowCustomThemeInput(false)}
                              className="text-slate-500 hover:text-white cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={userInterest}
                              onChange={(e) => setUserInterest(e.target.value)}
                              placeholder="e.g. Formula 1, Medieval, Anime..."
                              className="flex-1 bg-black/70 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 font-mono outline-none focus:border-cyber-cyan"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && userInterest.trim()) {
                                  launchDirectTheme(userInterest.trim(), 'custom');
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => userInterest.trim() && launchDirectTheme(userInterest.trim(), 'custom')}
                              disabled={!userInterest.trim() || isRetheming}
                              className="px-3 py-1.5 rounded-lg bg-cyber-cyan text-black font-mono font-bold text-xs hover:brightness-110 disabled:opacity-50 cursor-pointer"
                            >
                              GO
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Operator Progress Dossier Card */}
              <div id="operator-progress-dossier" className="w-full flex relative group/dossier">
                <div className={`bg-black/40 p-5 border border-slate-800 rounded-3xl backdrop-blur-sm shadow-2xl w-full flex flex-col justify-between relative overflow-hidden group transition-all duration-700 ${!hasCompletedTutorial ? 'blur-[5px] opacity-30 pointer-events-none select-none' : ''}`}>
                  {/* Decors */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-pink/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-slate-800/60 pb-2.5 text-left">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
                        <h3 className="font-mono text-[10px] font-black tracking-widest text-white uppercase">
                          PROGRESS DOSSIER
                        </h3>
                      </div>
                      <span className="font-mono text-[8px] bg-cyber-cyan/15 text-cyber-cyan font-black px-1.5 py-0.5 rounded border border-cyber-cyan/30 uppercase tracking-tighter">
                        TELEMETRY
                      </span>
                    </div>

                    {/* Content Stats (Stacked Vertically) */}
                    <div className="space-y-2.5">
                      {/* Stat 1: Credits Balance */}
                      <div id="dossier-credits" className="bg-[#070913]/60 rounded-xl p-2.5 border border-slate-800/80 hover:border-amber-500/30 transition-colors flex items-center justify-between gap-2">
                        <div className="space-y-0.5 text-left min-w-0">
                          <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-wider block">CREDIT BALANCE</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black font-mono text-amber-400 tracking-tight drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                              {currentCredits.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-black font-mono text-amber-500/70">CC</span>
                          </div>
                          <span className="text-[8px] font-mono text-slate-500 block truncate">Total: {totalEarned.toLocaleString()} CC</span>
                        </div>
                        <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <Coins className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Stat 2: Completed Lessons */}
                      <div id="dossier-lessons" className="bg-[#070913]/60 rounded-xl p-2.5 border border-slate-800/80 hover:border-cyber-cyan/30 transition-colors flex flex-col justify-between gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-left min-w-0">
                            <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-wider block">TRAINING COMPLETION</span>
                            <div className="flex items-baseline gap-0.5 mt-0.5">
                              <span className="text-lg font-black font-mono text-white tracking-tight">
                                {completedLessons.length}
                              </span>
                              <span className="text-slate-500 text-[10px] font-bold font-mono">/</span>
                              <span className="text-slate-400 text-xs font-mono font-black">
                                {lessons.length}
                              </span>
                            </div>
                          </div>
                          <div className="p-1.5 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/20 text-cyber-cyan flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                            <div 
                              className="h-full bg-gradient-to-r from-cyber-cyan to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all duration-500"
                              style={{ width: `${lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[7.5px] font-mono font-bold text-slate-500">
                            <span>SECTOR</span>
                            <span className="text-cyber-cyan">
                              {Math.round(lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0)}% SECURED
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stat 3: Active Theme & Badges */}
                      <div id="dossier-badges" className="bg-[#070913]/60 rounded-xl p-2.5 border border-slate-800/80 hover:border-cyber-pink/30 transition-colors flex items-center justify-between gap-2">
                        <div className="space-y-0.5 text-left min-w-0 flex-1">
                          <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-wider block">THEME & DOSSIERS</span>
                          <div className="flex items-center gap-1 mt-0.5 overflow-hidden">
                            <span className="font-mono text-[8.5px] font-black bg-cyan-500/15 text-cyber-cyan px-1.5 py-0.5 rounded border border-cyan-500/30 truncate uppercase tracking-tight">
                              {userInterest || 'CYBERPUNK'}
                            </span>
                            <span className="font-mono text-[7.5px] bg-cyber-pink/15 text-cyber-pink font-black px-1 py-0.5 rounded border border-cyber-pink/30 uppercase tracking-tighter shrink-0 flex items-center gap-0.5">
                              <Award className="w-2 h-2" />
                              <span>{unlockedBadges.length} BADGES</span>
                            </span>
                          </div>
                        </div>
                        <div className="p-1.5 bg-cyber-pink/10 rounded-lg border border-cyber-pink/20 text-cyber-pink flex items-center justify-center shrink-0">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer status link */}
                  <div className="flex items-center justify-between border-t border-slate-800/40 pt-2.5 mt-2.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">SYSTEM LINK</span>
                    <span className="flex items-center gap-1 text-[8px] font-mono text-emerald-400 font-bold">
                      <span className="relative flex h-1 w-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-400"></span>
                      </span>
                      <span>ACTIVE</span>
                    </span>
                  </div>
                </div>

                {!hasCompletedTutorial && (
                  <div className="absolute inset-0 bg-black/10 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                    <div className="p-4 bg-slate-950/95 rounded-2xl border border-slate-800/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex flex-col items-center gap-1.5 max-w-[210px] animate-fade-in-up">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[9px] font-black tracking-widest text-slate-400 uppercase">DOSSIER LOCKED</span>
                      <p className="text-[9px] text-slate-500 leading-normal font-sans">Initialize system via onboarding step 3 to unlock student telemetry tracking.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>

        {/* CHALLENGE GATEWAYS */}
        <div className="mb-8 max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] w-full mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DEBUG ARENA CARD */}
          <div className="w-full flex relative group/arena">
            <div className={`bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md text-left flex flex-col justify-between gap-6 hover:border-amber-500/40 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] transition-all duration-700 w-full ${!hasCompletedTutorial ? 'blur-[5px] opacity-30 pointer-events-none select-none' : ''}`}>
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Terminal className="w-24 h-24 text-amber-500" />
               </div>
               
               <div className="space-y-2">
                 <h2 className="text-base md:text-lg font-black text-amber-400 uppercase tracking-tight leading-tight">
                   THE DEBUG ARENA
                   <span className="block text-[10px] text-slate-400 font-bold tracking-wider mt-1">(HACK THE CODE)</span>
                 </h2>
                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                   Standard introductory debugging puzzles. Want to test your debugging skills without affecting your main lesson progress? Enter the Debugging Arena! Spot python syntax bugs, fix loops, and earn credits under tactical budgets.
                 </p>
               </div>

               <button
                 onClick={() => setView('hack-arena')}
                 className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all border-2 border-white/20 cursor-pointer text-center"
               >
                 ENTER ARENA
               </button>
            </div>

            {!hasCompletedTutorial && (
              <div className="absolute inset-0 bg-black/10 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                <div className="p-4 bg-slate-950/95 rounded-2xl border border-slate-800/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex flex-col items-center gap-1.5 max-w-[210px] animate-fade-in-up">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-black tracking-widest text-slate-400 uppercase">ARENA LOCKED</span>
                  <p className="text-[9px] text-slate-500 leading-normal font-sans">Initialize system via onboarding step 3 to unlock the Debugging Arena.</p>
                </div>
              </div>
            )}
          </div>

          {/* CREATIVE CHALLENGES CARD */}
          <div className="w-full flex relative group/creative">
            <div className={`bg-cyan-500/5 border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md text-left flex flex-col justify-between gap-6 hover:border-cyan-500/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)] transition-all duration-700 w-full ${!hasCompletedTutorial ? 'blur-[5px] opacity-30 pointer-events-none select-none' : ''}`}>
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Code2 className="w-24 h-24 text-cyan-400" />
               </div>
               
               <div className="space-y-2">
                 <h2 className="text-base md:text-lg font-black text-cyan-400 uppercase tracking-tight leading-tight">
                   THE CREATIVE LAB
                   <span className="block text-[10px] text-slate-400 font-bold tracking-wider mt-1">(CONTINUOUS PLAYGROUND)</span>
                 </h2>
                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                   Custom Python logic and inputs. Build your own custom Python files from scratch! Program outputs, handle continuous strings, prompt console inputs, and engineer a full Go-Kart website registration system.
                 </p>
               </div>

               <button
                 onClick={() => setView('creative-challenges')}
                 className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all border-2 border-white/20 cursor-pointer text-center"
               >
                 LAUNCH CREATIVE LAB
               </button>
            </div>

            {!hasCompletedTutorial && (
              <div className="absolute inset-0 bg-black/10 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                <div className="p-4 bg-slate-950/95 rounded-2xl border border-slate-800/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex flex-col items-center gap-1.5 max-w-[210px] animate-fade-in-up">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-black tracking-widest text-slate-400 uppercase">LAB LOCKED</span>
                  <p className="text-[9px] text-slate-500 leading-normal font-sans">Initialize system via onboarding step 3 to unlock the Creative Lab.</p>
                </div>
              </div>
            )}
          </div>

          {/* FLOWCHART DRAG & DROP LAB CARD */}
          <div className="w-full flex relative group/flowchart">
            <div className={`bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md text-left flex flex-col justify-between gap-6 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.08)] transition-all duration-700 w-full ${!hasCompletedTutorial ? 'blur-[5px] opacity-30 pointer-events-none select-none' : ''}`}>
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Layers className="w-24 h-24 text-emerald-400" />
               </div>
               
               <div className="space-y-2">
                 <h2 className="text-base md:text-lg font-black text-emerald-400 uppercase tracking-tight leading-tight">
                   THE FLOWCHART LAB
                   <span className="block text-[10px] text-slate-400 font-bold tracking-wider mt-1">(VISUAL LOGIC)</span>
                 </h2>
                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                   Visual algorithm mapping. Solve algorithms visually! Drag-and-drop or select logical blocks to build working flowcharts. Evaluate subtraction margins, compile loop counts, and separate odd/even integers.
                 </p>
               </div>

               <button
                 onClick={() => setView('flowchart-lab')}
                 className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all border-2 border-white/20 cursor-pointer text-center"
               >
                 START FLOW LAB
               </button>
            </div>

            {!hasCompletedTutorial && (
              <div className="absolute inset-0 bg-black/10 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                <div className="p-4 bg-slate-950/95 rounded-2xl border border-slate-800/80 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex flex-col items-center gap-1.5 max-w-[210px] animate-fade-in-up">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] font-black tracking-widest text-slate-400 uppercase">FLOW LAB LOCKED</span>
                  <p className="text-[9px] text-slate-500 leading-normal font-sans">Initialize system via onboarding step 3 to unlock the Flowchart Lab.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="p-6 border-t border-slate-900 flex justify-between items-center relative z-10">
          <div className="flex gap-4 text-[9px] text-slate-700 font-mono uppercase tracking-[0.1em]">
            <span>Secure_Link:Active</span>
            <span>Latency:1.2ms</span>
          </div>
          <p className="text-[9px] text-slate-700 font-mono">ESTABLISHED. 2026. CODER_CORE</p>
        </footer>
        {renderAuthModal()}
        {renderGuestHelpModal()}
      </div>
    );
  }

  if (view === 'hack-arena') {
    return (
      <HackArena 
        onBackToMain={() => setView('landing')}
        onRewardCredits={(credits) => {
          setBonusCredits(prev => prev + credits);
        }}
        currentCredits={currentCredits}
        userInterest={userInterest}
        activeTheme={activeTheme}
      />
    );
  }

  if (view === 'creative-challenges') {
    return (
      <CreativeChallenges
        onBackToMain={() => setView('landing')}
        onRewardCredits={(credits) => {
          setBonusCredits(prev => prev + credits);
        }}
        currentCredits={currentCredits}
        userInterest={userInterest}
        activeTheme={activeTheme}
      />
    );
  }

  if (view === 'flowchart-lab') {
    return (
      <FlowchartLab
        onBackToMain={() => setView('landing')}
        onRewardCredits={(credits) => {
          setBonusCredits(prev => prev + credits);
        }}
        currentCredits={currentCredits}
        userInterest={userInterest}
        activeTheme={activeTheme}
      />
    );
  }

  const levels: { id: Level; icon: any; label: string }[] = [
    { id: 'basics', icon: Terminal, label: 'Basics' },
    { id: 'control_flow', icon: Cpu, label: 'Logic' },
    { id: 'functions', icon: Layers, label: 'Functions' },
    { id: 'oop', icon: Box, label: 'OOP' },
  ];

  return (
    <div 
      className="flex flex-col h-screen overflow-hidden bg-cyber-dark text-[var(--text-main)] relative selection:bg-cyber-cyan/30 selection:text-white font-sans transition-colors duration-1000" 
      data-theme={activeTheme?.value}
      style={{
        '--bg-color': activeBanner?.colors?.bg,
        '--panel-bg': activeBanner?.colors?.panel,
        '--surface-tint': activeBanner?.colors?.accent,
      } as React.CSSProperties}
    >
      {/* Party RGB Oscillator Style Injector */}
      {partyActive && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes rgbOscillate {
            0% { --primary: #ff007f; --accent: #ff007f; --primary-glow: rgba(255, 0, 127, 0.9); }
            33% { --primary: #00ff41; --accent: #00ff41; --primary-glow: rgba(0, 255, 65, 0.9); }
            66% { --primary: #00f2ff; --accent: #00f2ff; --primary-glow: rgba(0, 242, 255, 0.9); }
            100% { --primary: #ff007f; --accent: #ff007f; --primary-glow: rgba(255, 0, 127, 0.9); }
          }
          :root, [data-theme] {
            animation: rgbOscillate 4s linear infinite !important;
          }
        `}} />
      )}

      <a href="#editor-area" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-cyber-cyan focus:text-black font-bold">
        Skip to editor
      </a>
      {/* Ambient Atmosphere Layer (animations removed) */}
      <div className="absolute inset-0 pointer-events-none">
        {activeBanner?.value === 'circuit' && (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
        )}
        {activeBanner?.value === 'city' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-500/10"></div>
        )}
        {activeBanner?.value === 'glitch' && (
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px)] [background-size:100%_4px]"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>
      
      {/* Background Effects */}
      <div className="scanline"></div>
      <div className="bg-grid absolute inset-0 pointer-events-none transition-all duration-1000" style={{ opacity: 'var(--grid-opacity)' }}></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-dark via-transparent to-[var(--primary-alpha)] opacity-30 pointer-events-none transition-all duration-1000"></div>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">

      {/* Achievement Unlocked Notification Toast */}
      <AnimatePresence>
        {unlockedNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed top-6 right-6 z-[300] max-w-sm pointer-events-auto"
          >
            <div className="bg-black/95 border-2 border-amber-400 p-4 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.3)] backdrop-blur-md flex gap-4 pr-10 relative overflow-hidden">
              {/* Particle glow in background */}
              <div className="absolute -left-12 -top-12 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
              
              <div className="text-3xl bg-amber-500/10 border border-amber-500/30 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">
                {unlockedNotification.emoji}
              </div>

              <div className="space-y-1">
                <div className="text-[9px] font-mono font-black tracking-widest text-amber-400 uppercase flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 animate-ping shrink-0" />
                  <span>ACHIEVEMENT UNLOCKED!</span>
                </div>
                <h4 className="text-sm font-black text-white leading-tight uppercase tracking-tight">
                  {unlockedNotification.name}
                </h4>
                <p className="text-[10px] text-slate-300 leading-snug">
                  {unlockedNotification.description}
                </p>
                <div className="pt-1 flex items-center gap-1.5">
                  <span className="text-[8px] font-mono font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider">
                    +{unlockedNotification.bonus} CREDITS AWARDED ⚡
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setUnlockedNotification(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors p-1"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Visual Feedback Overlay */}
      <AnimatePresence>
        {showResultOverlay && feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              animate={feedback.success ? {} : { x: [-10, 10, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
              role="alert"
              aria-live="assertive"
              className={`px-12 py-8 border-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col items-center gap-4 bg-black/95 backdrop-blur-md rounded-xl
                ${feedback.success ? 'border-cyber-cyan text-cyber-cyan shadow-cyber-cyan/20' : 'border-cyber-pink text-cyber-pink shadow-cyber-pink/20'}`}
            >
              {feedback.success ? (
                <>
                  <CheckCircle2 className="w-16 h-16" />
                  <h2 className="text-5xl font-black italic tracking-tighter uppercase glow-text-cyan">CORRECT</h2>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-16 h-16 animate-pulse" />
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase glow-text-pink">INCORRECT</h2>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-black/40 border-b border-cyber-cyan/30 backdrop-blur-xl transition-all duration-500" style={{ boxShadow: 'var(--header-glow)' }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-[0_0_15px_var(--primary-glow)]">
              <Zap className="text-black w-5 h-5" />
            </div>
            <span className="text-sm font-black text-white italic tracking-tighter uppercase glow-text">
              Back to <span className="text-[var(--accent)] opacity-70">Landing page</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-6 h-6">
            <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/5">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-2">Grid Sizing</span>
              <div className="flex gap-1">
                <button 
                  onClick={() => setLeftPanelWidth(Math.max(20, leftPanelWidth - 5))}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-cyber-cyan" 
                  title="Narrow Lesson View"
                >
                  <Minimize2 className="w-3 h-3" />
                </button>
                <div className="flex items-center justify-center w-8 text-[9px] font-mono text-cyber-cyan">
                  {Math.round(leftPanelWidth)}%
                </div>
                <button 
                  onClick={() => setLeftPanelWidth(Math.min(80, leftPanelWidth + 5))}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-cyber-cyan" 
                  title="Widen Lesson View"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
              <div className="w-px h-3 bg-white/10 mx-1"></div>
              <div className="flex gap-1">
                <button 
                  onClick={() => setTopPanelHeight(Math.max(20, topPanelHeight - 5))}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-cyber-cyan" 
                  title="Shrink Editor Height"
                >
                  <ChevronsUpDown className="w-3 h-3 rotate-180" />
                </button>
                <div className="flex items-center justify-center w-8 text-[9px] font-mono text-cyber-cyan">
                  {Math.round(topPanelHeight)}%
                </div>
                <button 
                  onClick={() => setTopPanelHeight(Math.min(80, topPanelHeight + 5))}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-cyber-cyan" 
                  title="Grow Editor Height"
                >
                  <ChevronsUpDown className="w-3 h-3" />
                </button>
              </div>
              <button 
                onClick={() => { setLeftPanelWidth(60); setTopPanelHeight(45); }}
                className="p-1 ml-1 hover:bg-white/10 rounded transition-colors text-slate-500 hover:text-cyber-pink" 
                title="Reset Grid Layout"
              >
                <RefreshCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6" role="status" aria-label="Overall progress">
          {autonomousCore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden md:flex items-center gap-2 px-3 py-1 bg-cyber-cyan/5 border border-cyber-cyan/30 rounded-full"
            >
              <Cpu className="w-3 h-3 text-cyber-cyan animate-pulse" />
              <span className="text-[8px] font-black text-cyber-cyan tracking-[0.2em] uppercase">Autonomous Core Secure</span>
            </motion.div>
          )}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest opacity-60">Neural Progression</span>
            <div className="w-32 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden" aria-hidden="true">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-cyber-pink shadow-[0_0_8px_var(--secondary-glow)] rounded-full"
              />
            </div>
            <span className="sr-only">{Math.round(progressPercentage)}% completed</span>
          </div>
          {partyActive && (
            <button
              onClick={() => setPartyActive(false)}
              className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border border-pink-400 text-white font-mono text-[9px] font-black tracking-widest rounded-full uppercase cursor-pointer transition-all active:scale-95 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.55)] flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>STOP DISCO 🛑</span>
            </button>
          )}

          {/* PERSISTENT DEBUG ARENA SHORTCUT */}
          <button
            onClick={() => setView('hack-arena')}
            className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/20 text-amber-500 font-mono text-[10px] font-black tracking-widest rounded-full uppercase cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>DEBUG ARENA</span>
          </button>

          {/* PERSISTENT CREATIVE CHALLENGES SHORTCUT */}
          <button
            onClick={() => setView('creative-challenges')}
            className="px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-black tracking-widest rounded-full uppercase cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>CREATIVE LAB</span>
          </button>

          <div 
            onClick={handleCreditsClick}
            title={isSonicUnlocked ? "Sonic Systems Synchronized" : "Synchronize System Credits"}
            className={`px-3 py-1 rounded-full text-cyber-cyan font-mono text-[10px] font-black tracking-wider shadow-[0_0_15px_var(--primary-alpha)] select-none transition-all active:scale-95
              ${isSonicUnlocked 
                ? 'bg-amber-500/10 border border-amber-500/40 text-amber-400 cursor-default' 
                : 'bg-cyber-cyan/10 border border-cyber-cyan/40 hover:bg-cyber-cyan/20 cursor-pointer'}`}
          >
            CREDITS: {currentCredits}
          </div>

          {/* CLASSROOM DATABASE SYNC COMPONENT */}
          {isFirebaseEnabled && (
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div 
                    title={
                      syncStatus === 'synced' 
                        ? 'All progress securely backed up to Classroom Cloud.' 
                        : syncStatus === 'connecting' 
                          ? 'Synchronising session arrays...' 
                          : 'Synchronisation interrupted.'
                    }
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/5 font-mono text-[9px]"
                  >
                    {syncStatus === 'synced' && (
                      <>
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold uppercase tracking-wider hidden md:inline">SYNCED</span>
                      </>
                    )}
                    {syncStatus === 'connecting' && (
                      <>
                        <RefreshCcw className="w-3 h-3 text-cyan-400 animate-spin" />
                        <span className="text-cyan-400 font-bold uppercase tracking-wider hidden md:inline">SYNCING</span>
                      </>
                    )}
                    {syncStatus === 'error' && (
                      <>
                        <CloudOff className="w-3 h-3 text-rose-500 animate-pulse" />
                        <span className="text-rose-500 font-bold uppercase tracking-wider hidden md:inline">ERR_LINK</span>
                      </>
                    )}
                  </div>

                  {currentUser.isAnonymous && activeRestoreCode && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeRestoreCode);
                        setCopiedRestoreCode(true);
                        setTimeout(() => setCopiedRestoreCode(false), 2000);
                      }}
                      title="Copy secure Guest Restore Code to easily restore your progress anytime!"
                      className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/35 hover:border-amber-500/75 px-2.5 py-1 rounded-full text-[9px] text-amber-500 font-mono transition-all cursor-pointer font-bold select-none hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    >
                      <Key className="w-2.5 h-2.5" />
                      <span>{copiedRestoreCode ? 'COPIED!' : activeRestoreCode}</span>
                    </button>
                  )}

                  <div 
                    className="flex items-center gap-2 bg-slate-900 border border-cyber-cyan/25 hover:border-cyber-cyan/45 px-2.5 py-1 rounded-full text-slate-300 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span className="text-[10px] font-bold font-sans hidden sm:inline max-w-[100px] truncate">
                      {currentUser.displayName || currentUser.email?.split('@')[0] || 'Learner'}
                    </span>
                    <button 
                      onClick={handleLogout}
                      title="Log Out (Purge Session Safety)"
                      className="text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded p-0.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => { setAuthError(null); setAuthMode('login'); setShowAuthModal(true); }}
                  className="px-3.5 py-1 bg-gradient-to-r from-cyber-cyan to-blue-600 border border-cyber-cyan/40 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-[9px] font-black tracking-widest rounded-full uppercase cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_var(--primary-alpha)] flex items-center gap-1.5"
                >
                  <Cloud className="w-3 h-3 text-white" />
                  <span>CLASSROOM SYNC</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex relative z-10 overflow-hidden">
        {/* Sidebar Toggle */}
        <div className="absolute top-6 left-6 z-20">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
              aria-expanded="false"
              className="p-3 bg-slate-900/80 border border-cyber-cyan/40 text-cyber-cyan rounded hover:bg-cyber-cyan/10 transition-all focus:ring-2 focus:ring-cyber-cyan outline-none"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
          className="bg-black/20 border-r border-cyber-cyan/20 flex flex-col z-20 overflow-hidden backdrop-blur-2xl"
          aria-label="Course Sidebar"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            <nav className="space-y-6" aria-label="Curriculum">
              <div className="flex items-center justify-between mb-2">
                 <h2 className="text-xs font-black text-white italic tracking-tighter uppercase opacity-60">Directory</h2>
                 <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-slate-500 hover:text-white transition-colors p-1"
                  aria-label="Close sidebar"
                  aria-expanded="true"
                 >
                   <X className="w-4 h-4" aria-hidden="true" />
                 </button>
              </div>
              {levels.map((level) => (
                <div key={level.id}>
                  <h3 className="flex items-center gap-2 mb-3 text-[10px] font-black text-cyber-cyan uppercase tracking-widest opacity-80">
                    <level.icon className="w-3 h-3" aria-hidden="true" />
                    {level.label}
                  </h3>
                  <div className="space-y-1">
                    {lessons.filter(l => l.level === level.id).map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isCurrent = currentLesson.id === lesson.id;
                      const globalIdx = lessons.findIndex(l => l.id === lesson.id);
                      const displayNum = (globalIdx + 1).toString().padStart(2, '0');
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonIndex(globalIdx)}
                          aria-current={isCurrent ? 'step' : undefined}
                          className={`w-full text-left p-2.5 text-[10px] font-mono transition-all border-l-4 flex flex-col group focus:ring-1 focus:ring-[var(--primary)] outline-none rounded-r-md
                            ${isCurrent 
                              ? 'bg-[var(--primary-alpha)] border-[var(--primary)] text-white glow-text shadow-[0_0_15px_var(--primary-glow)]' 
                              : isCompleted 
                                ? 'border-transparent text-slate-400 hover:bg-slate-800/30'
                                : 'border-transparent text-slate-600 hover:text-slate-300 hover:bg-slate-800/30'}`}
                        >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className={`transition-all font-black mr-1.5 ${isCurrent ? 'text-[var(--primary)] scale-110 opacity-100 drop-shadow-[0_0_8px_var(--primary-glow)]' : 'text-slate-400 opacity-80 group-hover:text-white group-hover:opacity-100'}`}>
                              {displayNum}
                            </span>
                            <span className={`truncate max-w-[150px] uppercase font-bold tracking-tight transition-colors ${isCurrent ? 'text-white font-black' : 'text-slate-400 group-hover:text-slate-200'}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 min-w-4">
                            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] opacity-80 drop-shadow-[0_0_5px_var(--primary-glow)]" />}
                            {isCurrent && !isCompleted && <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_8px_var(--primary-glow)]"></div>}
                          </div>
                        </div>
                        
                        <div className={`flex gap-2 mt-1 items-center transition-opacity ${isCurrent ? 'opacity-90' : 'opacity-40 group-hover:opacity-80'}`}>
                          <span className={`text-[7px] font-bold uppercase tracking-tighter ${isCurrent ? 'text-[var(--primary)] font-black' : ''}`}>
                            {lesson.level}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

            {/* SIDEBAR DEBUG CHANNELS */}
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-4">
               <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col gap-2.5">
                 <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                   <span className="font-mono text-[9px] text-amber-500 font-bold uppercase tracking-widest">ISOLATED TRIAL</span>
                 </div>
                 
                 <div>
                   <h4 className="text-[10px] uppercase tracking-tight text-white font-black">HACK THE CODE ARENA</h4>
                   <p className="text-[9px] text-slate-500 leading-normal mt-1">Practice fixing Python bugs, syntax warnings, and indexing flaws in an isolated trial block.</p>
                 </div>

                 <button
                   onClick={() => setView('hack-arena')}
                   className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-mono text-[9.5px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10"
                 >
                   <span>LAUNCH TRIAL</span>
                 </button>
               </div>

               <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col gap-2.5">
                 <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                   <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest">CREATIVE LAB</span>
                 </div>
                 
                 <div>
                   <h4 className="text-[10px] uppercase tracking-tight text-white font-black">CREATIVE PROGRAMMING</h4>
                   <p className="text-[9px] text-slate-500 leading-normal mt-1">Build programs from scratch, custom-designed to output messages and scan inputs.</p>
                 </div>

                 <button
                   onClick={() => setView('creative-challenges')}
                   className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-[9.5px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10"
                 >
                   <span>LAUNCH CREATIVE LAB</span>
                 </button>
               </div>
            </div>

          <nav className="space-y-4 pt-6 mt-6 border-t border-slate-800" aria-label="Upgrades">
             <div className="flex items-center justify-between pr-2 mb-3">
               <div className="flex items-center gap-2 text-[10px] font-black text-[var(--accent)] uppercase tracking-widest opacity-80 glow-text">
                  <ShoppingBag className="w-3 h-3" />
                  Interface Modules
               </div>
               <button 
                 onClick={() => setAutonomousCore(!autonomousCore)}
                 className={`group flex items-center gap-2 px-2 py-0.5 rounded border transition-all text-[8px] font-bold uppercase tracking-widest
                   ${autonomousCore 
                     ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                     : 'bg-white/5 border-white/10 text-slate-500'}`}
               >
                 <Cpu className={`w-2.5 h-2.5 ${autonomousCore ? 'animate-pulse' : ''}`} />
                 {autonomousCore ? 'Core: Active' : 'Core: Standby'}
               </button>
             </div>
             
             <div className="space-y-4 pr-2">
                {REWARDS.filter(item => isSonicUnlocked || item.type !== 'soundpack').map(item => {
                  const isUnlocked = unlockedIds.includes(item.id) || (item.id === 'wallpaper-mrs-birds' && unlockedIds.includes('wallpaper-mr-singer-funko'));
                  const isActive = 
                    item.type === 'theme' ? activeThemeId === item.id : 
                    item.type === 'banner' ? activeBannerId === item.id : 
                    item.type === 'soundpack' ? activeSoundpackId === item.id : 
                    (activeWallpaperId === item.id || (item.id === 'wallpaper-mrs-birds' && activeWallpaperId === 'wallpaper-mr-singer-funko'));
                  const canAfford = currentCredits >= item.cost;
                  const itemColors = item.colors;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`p-2 border rounded-lg transition-all duration-500 overflow-hidden relative
                        ${isActive 
                          ? 'bg-[var(--primary-alpha)] border-[var(--primary)] shadow-[0_0_20px_var(--primary-glow)]' 
                          : 'bg-black/40 border-slate-800 hover:border-slate-600'}`}
                    >
                      {/* Color Preview for Ambiances */}
                      {item.type === 'banner' && itemColors && (
                        <div className="absolute top-0 right-0 h-1 w-12 flex opacity-60">
                           <div style={{ backgroundColor: itemColors.bg }} className="flex-1" />
                           <div style={{ backgroundColor: itemColors.accent }} className="flex-1" />
                        </div>
                      )}

                      {/* Wallpaper Thumbnail Preview */}
                      {item.type === 'wallpaper' && (
                        <div 
                          className="group/thumb relative h-16 w-full mb-2 rounded-md overflow-hidden cursor-zoom-in border border-slate-900/60 relative z-10"
                          onClick={() => setPreviewWallpaperId(item.id)}
                          title="Hologram Preview"
                        >
                          <img 
                            src={item.value} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 flex items-center justify-center transition-colors">
                            <Maximize2 className="w-3.5 h-3.5 text-white opacity-60 group-hover/thumb:opacity-100 transition-opacity animate-pulse" />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-1 relative z-10">
                        <span className="text-[10px] font-black text-white uppercase tracking-tight leading-tight">{item.name}</span>
                        {item.type === 'theme' ? (
                          <Palette className="w-3 h-3 text-[var(--accent)] glow-text" />
                        ) : item.type === 'banner' ? (
                          <Radio className="w-3 h-3 text-[var(--accent)] glow-text" />
                        ) : item.type === 'soundpack' ? (
                          <Volume2 className="w-3 h-3 text-[var(--accent)] glow-text" />
                        ) : (
                          <ImageIcon className="w-3 h-3 text-[var(--accent)] glow-text" />
                        )}
                      </div>
                      <p className="text-[9px] text-[var(--text-dim)] leading-tight mb-2 relative z-10">{item.description}</p>
                      
                      {/* Sound pack preview testing buttons */}
                      {isUnlocked && item.type === 'soundpack' && (
                        <div className="flex gap-1.5 mt-1 mb-2 relative z-10 w-full">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundService.playSuccess(item.id);
                            }}
                            className="flex-1 py-1 hover:bg-emerald-500/20 active:scale-95 border border-emerald-500/30 rounded text-[7.5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 cursor-pointer select-none outline-none transition-transform"
                            title="Test compilation success FX"
                          >
                            Success 🔊
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundService.playError(item.id);
                            }}
                            className="flex-1 py-1 hover:bg-rose-500/20 active:scale-95 border border-rose-500/30 rounded text-[7.5px] font-mono font-bold text-rose-400 bg-rose-500/10 cursor-pointer select-none outline-none transition-transform"
                            title="Test syntax error warnings FX"
                          >
                            Warning 🔊
                          </button>
                        </div>
                      )}

                      {isUnlocked ? (
                        <button 
                          onClick={() => {
                            if (item.type === 'theme') setActiveThemeId(item.id);
                            if (item.type === 'banner') setActiveBannerId(item.id);
                            if (item.type === 'soundpack') {
                              if (isActive) {
                                setActiveSoundpackId(null);
                              } else {
                                setActiveSoundpackId(item.id);
                              }
                            }
                            if (item.type === 'wallpaper') {
                              if (isActive) {
                                setActiveWallpaperId(null);
                              } else {
                                setActiveWallpaperId(item.id);
                              }
                            }
                          }}
                          className={`w-full py-1.5 rounded text-[8px] font-black uppercase tracking-widest transition-all relative z-10 cursor-pointer
                            ${isActive 
                              ? 'bg-[var(--accent)] text-black shadow-[0_0_15px_var(--primary-glow)]' 
                              : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          {isActive ? ((item.type === 'wallpaper' || item.type === 'soundpack') ? 'DEACTIVATE' : 'ACTIVE') : 'ACTIVATE'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            if (canAfford) setUnlockedIds(prev => [...prev, item.id]);
                          }}
                          disabled={!canAfford}
                          className={`w-full py-1.5 rounded text-[8px] font-black uppercase tracking-widest transition-all relative z-10
                            ${canAfford 
                              ? 'bg-[var(--accent)] text-black hover:brightness-125 shadow-[0_0_15px_var(--primary-glow)]' 
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
                        >
                          <Lock className="w-2.5 h-2.5 inline-block mr-1" />
                          {item.cost} CREDITS
                        </button>
                      )}
                    </div>
                  );
                })}
             </div>
          </nav>

          {/* SONIC SYNTHMASTER MIXER DECK */}
          {isSonicUnlocked && (
            <nav className="space-y-4 pt-6 mt-6 border-t border-[#1e293b] pr-2" aria-label="Sonic Synth Deck">
               <div className="flex items-center justify-between pr-2 mb-3">
                 <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest opacity-90 glow-text-pink">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>🔊 SONIC_DEC // SYNTH BEATS</span>
                 </div>
                 <span 
                   className={`text-[8px] font-mono font-black border px-1.5 py-0.5 rounded uppercase tracking-widest
                      ${activeSoundpackId 
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                        : 'border-slate-800 bg-slate-950/40 text-slate-500'}`}
                 >
                   {activeSoundpackId ? 'PRO AUDIO CONNECTED' : 'MUTE (NO PACK)'}
                 </span>
               </div>

               <div className="p-3 border border-slate-900 bg-black/40 rounded-xl relative overflow-hidden space-y-3">
                 {/* Background subtle retro oscilloscope bars */}
                 {isBeatsPlaying && activeSoundpackId && (
                   <div className="absolute right-3 top-3 flex gap-0.5 items-end h-6 pb-0.5 pointer-events-none opacity-80 animate-fade-in">
                     <div className="w-[1.5px] bg-rose-500 h-2 rounded animate-[pulse_0.2s_infinite_alternate]" />
                     <div className="w-[1.5px] bg-rose-500 h-5 rounded animate-[pulse_0.4s_infinite_alternate-reverse]" />
                     <div className="w-[1.5px] bg-rose-500 h-3 rounded animate-[pulse_0.3s_infinite_alternate]" />
                     <div className="w-[1.5px] bg-rose-500 h-4 rounded animate-[pulse_0.5s_infinite_alternate-reverse]" />
                     <div className="w-[1.5px] bg-rose-500 h-1 rounded animate-[pulse_0.15s_infinite_alternate]" />
                   </div>
                 )}

                 <div className="space-y-1">
                   <span className="text-[8px] font-mono font-extrabold text-slate-500 uppercase tracking-widest">
                     CHANNEL SELECT
                   </span>
                   <p className="text-[10px] text-white font-black uppercase truncate">
                     {activeSoundpackId 
                       ? REWARDS.find(r => r.id === activeSoundpackId)?.name 
                       : "STANDARD MUTE FEEDBACK"}
                   </p>
                   <p className="text-[8px] text-slate-400 leading-normal">
                     {activeSoundpackId 
                       ? "Custom interactive synthesized soundpacks triggering active events." 
                       : "Purchase and activate soundpacks above to hear interactive sound cues and backing beats."}
                   </p>
                 </div>

                 {activeSoundpackId && (
                   <div className="space-y-2 pt-1.5 border-t border-slate-950 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono font-semibold text-slate-500 uppercase">
                          AMBIENT CHILL LOOP
                        </span>
                        <span className={`text-[7px] font-mono font-black border px-1 rounded
                          ${isBeatsPlaying ? 'border-cyber-cyan/30 text-cyber-cyan bg-cyan-950/25 animate-pulse' : 'border-slate-800 text-slate-500'}`}
                        >
                          {isBeatsPlaying ? 'PLAYING // LOOPING' : 'PAUSED'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsBeatsPlaying(!isBeatsPlaying)}
                          className={`flex-1 py-1.5 px-3 rounded-lg border text-[9px] font-mono font-black uppercase tracking-wider transition-all select-none cursor-pointer outline-none active:scale-95
                            ${isBeatsPlaying 
                              ? 'bg-rose-650 border-rose-500 text-white shadow-[0_0_12px_rgba(220,38,38,0.25)]' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'}`}
                        >
                          {isBeatsPlaying ? '⏹ STOP SYNTH' : '▶ START BEATS'}
                        </button>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase">
                          <span>MASTER SOUND DECK VOL</span>
                          <span className="text-white font-bold">{Math.round(soundVolume * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <VolumeX className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={Math.round(soundVolume * 100)}
                            onChange={(e) => setSoundVolume(Number(e.target.value) / 100)}
                            className="w-full accent-rose-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer border border-slate-850 outline-none"
                          />
                          <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </div>
                      </div>
                   </div>
                 )}
               </div>
            </nav>
          )}

          {/* trophy case / achievements */}
          <nav className="space-y-4 pt-6 mt-6 border-t border-[#1e293b] pr-2" aria-label="Achievements Showcase">
             <div className="flex items-center justify-between pr-2 mb-3">
               <div className="flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-widest opacity-90 glow-text-amber">
                  <Zap className="w-3.5 h-3.5 animate-bounce" />
                  <span>🏆 ARCH_CASE // TROPHIES</span>
               </div>
               <span 
                 className="text-[8px] font-mono font-black border border-amber-500/30 bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded"
                 title="Total achievements unlocked / available"
               >
                 {unlockedBadges.length} / {BADGES_LIST.length} UNLOCKED
               </span>
             </div>

             <div className="space-y-3">
               {BADGES_LIST.map(badge => {
                 const isUnlocked = unlockedBadges.includes(badge.id);
                 
                 // Dynamic styling depending on badge id
                 let glowColor = 'hover:border-slate-700';
                 let textColor = 'text-slate-500';
                 let borderClass = 'border-slate-900 bg-black/35';
                 let badgeBgGlow = '';
                 
                 if (isUnlocked) {
                   textColor = 'text-white';
                   if (badge.id === 'null-pointer') {
                     glowColor = 'border-rose-500/40 hover:border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.15)]';
                     borderClass = 'border-rose-500/20 bg-rose-950/15';
                     badgeBgGlow = 'glow-text-pink';
                   } else if (badge.id === 'speed-runner') {
                     glowColor = 'border-amber-500/40 hover:border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.15)]';
                     borderClass = 'border-amber-500/20 bg-amber-950/15';
                     badgeBgGlow = 'glow-text-amber';
                   } else if (badge.id === 'coffee-overload') {
                     glowColor = 'border-violet-500/40 hover:border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.15)]';
                     borderClass = 'border-violet-500/20 bg-violet-950/15';
                   } else if (badge.id === 'perfect-combo') {
                     glowColor = 'border-cyber-cyan/45 hover:border-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.15)]';
                     borderClass = 'border-cyber-cyan/20 bg-cyan-950/15';
                     badgeBgGlow = 'glow-text-cyan';
                   }
                 }

                 return (
                   <div 
                     key={badge.id}
                     className={`p-2.5 border rounded-xl transition-all duration-300 relative select-none overflow-hidden group
                       ${isUnlocked ? borderClass + ' ' + glowColor : 'border-slate-900 bg-black/20 opacity-40 hover:opacity-60'}`}
                   >
                     {/* Decorative subtle ambient code grid in unlocked background */}
                     {isUnlocked && (
                       <div className="absolute top-0 right-0 p-1 text-[6px] font-mono text-slate-700/20 select-none uppercase tracking-widest leading-none pointer-events-none">
                         0X_{badge.id.substring(0, 4).toUpperCase()}
                       </div>
                     )}

                     <div className="flex gap-2.5 items-start">
                       <div className={`text-xl flex items-center justify-center p-1.5 rounded-lg bg-black/40 border border-slate-800 shrink-0
                         ${isUnlocked ? 'scale-105 shadow-[0_0_12px_rgba(255,255,255,0.05)] border-white/5' : 'grayscale text-slate-700'}`}
                       >
                         {badge.emoji}
                       </div>

                       <div className="min-w-0 flex-1 space-y-0.5">
                         <div className="flex items-center justify-between gap-1">
                           <span className={`text-[10px] font-black uppercase tracking-tight truncate ${isUnlocked ? textColor + ' ' + badgeBgGlow : 'text-slate-500'}`}>
                             {badge.name}
                           </span>

                           {isUnlocked ? (
                             <span className="text-[7px] font-mono font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded tracking-widest shrink-0 animate-pulse">
                               +{badge.bonus} CR
                             </span>
                           ) : (
                             <span className="text-[7.5px] font-mono font-bold text-slate-600 uppercase tracking-widest shrink-0">
                               LOCKED 🔒
                             </span>
                           )}
                         </div>

                         <p className="text-[8.5px] text-slate-400 leading-normal">
                           {isUnlocked ? badge.description : badge.hint}
                         </p>

                         {/* Track incremental failure progress for Null Pointer error metric */}
                         {!isUnlocked && badge.id === 'null-pointer' && (
                           <div className="mt-1.5 space-y-1">
                             <div className="flex justify-between text-[7px] font-mono font-bold text-slate-600 uppercase tracking-tight">
                               <span>Fails on Active File:</span>
                               <span>{lessonErrors[currentLesson.id] || 0} / 5</span>
                             </div>
                             <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                               <div 
                                 className="h-full bg-rose-500/50 transition-all duration-300"
                                 style={{ width: `${Math.min(((lessonErrors[currentLesson.id] || 0) / 5) * 100, 100)}%` }}
                               />
                             </div>
                           </div>
                         )}
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
          </nav>

          {/* SYSTEM DECRYPTOR WIDGET */}
          <nav className="space-y-4 pt-6 mt-6 border-t border-[#1e293b] pr-2" aria-label="System Decrypter">
            <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest opacity-90 glow-text-pink">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span>💻 CODE DECRYPTER</span>
            </div>
            
            <div className="bg-black/50 border border-slate-800 rounded-xl p-3 space-y-3 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-1 bg-rose-500/10 border-b border-l border-slate-800 text-[7px] text-rose-400 font-mono tracking-widest font-black uppercase">
                DECRYPT_HUD
              </div>
              
              <div className="space-y-1">
                <label htmlFor="cheat-code-input" className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Inject Bypass Hash</label>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCheatSubmit(cheatInput);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    id="cheat-code-input"
                    type="text"
                    value={cheatInput}
                    onChange={(e) => setCheatInput(e.target.value)}
                    placeholder="e.g. import matrix"
                    className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-rose-500/50 rounded px-2 py-1.5 text-xs text-rose-300 font-mono transition-none outline-none placeholder:text-slate-800 min-w-0"
                  />
                  <button 
                    type="submit"
                    className="px-3 bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 hover:text-white border border-rose-500/30 rounded text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer select-none active:scale-95 shrink-0"
                  >
                    Crack
                  </button>
                </form>
              </div>

              {cheatFeedback && (
                <div className="text-[9px] font-mono p-1 bg-slate-950 rounded border border-rose-500/20 text-rose-400 animate-pulse break-words">
                  {cheatFeedback}
                </div>
              )}

              {/* RETAIN HACK RIDDLES TO GUIDE STUDENTS */}
              <div className="space-y-2 border-t border-slate-900 pt-2">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest block mb-1">📟 Decryption Clues:</span>
                
                <div className="space-y-1 text-[9.5px] text-slate-400 leading-snug">
                  {/* Riddle 1 */}
                  <div className="p-1 px-1.5 rounded bg-slate-950/40 border border-slate-900 flex flex-col gap-0.5 select-none">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyber-cyan text-[8px] uppercase tracking-wider">Hash 0x01 (Matrix Overload)</span>
                      {matrixActive ? (
                        <span className="text-emerald-400 text-[8px] font-black">✓ ACTIVE</span>
                      ) : (
                        <span className="text-slate-600 text-[8px] font-black">UNSOLVED</span>
                      )}
                    </div>
                    <p className="text-slate-500 font-sans text-[8px] leading-tight">Find the coordinate tuple's exact uppercase parameter name in Task 28's Cyberpunk example, or run print("follow the white rabbit").</p>
                  </div>

                  {/* Riddle 2 */}
                  <div className="p-1 px-1.5 rounded bg-slate-950/40 border border-slate-900 flex flex-col gap-0.5 select-none">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 text-[8px] uppercase tracking-wider">Hash 0x02 (Magic Credit Spell)</span>
                      {cheatsUsed.includes('xyzzy') ? (
                        <span className="text-emerald-400 text-[8px] font-black">✓ CRACKED</span>
                      ) : (
                        <span className="text-slate-600 text-[8px] font-black">UNSOLVED</span>
                      )}
                    </div>
                    <p className="text-slate-500 font-sans text-[8px] leading-tight">Mage spell word to bypass mainframe locks and fetch +500 free credits. (Hint: Try "xyzzy" or "magic")</p>
                  </div>

                  {/* Riddle 3 */}
                  <div className="p-1 px-1.5 rounded bg-slate-950/40 border border-slate-900 flex flex-col gap-0.5 select-none">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-fuchsia-400 text-[8px] uppercase tracking-wider">Hash 0x03 (Ric_Roll Frequency)</span>
                      {rickrollActive ? (
                        <span className="text-emerald-400 text-[8px] font-black">✓ STREAMING</span>
                      ) : (
                        <span className="text-slate-600 text-[8px] font-black">UNSOLVED</span>
                      )}
                    </div>
                    <p className="text-slate-500 font-sans text-[8px] leading-tight">Programmer's loop that never stops. (Hint: Run "import rick" or "rickroll")</p>
                  </div>

                  {/* Riddle 4 */}
                  <div className="p-1 px-1.5 rounded bg-slate-950/40 border border-slate-900 flex flex-col gap-0.5 select-none">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-400 text-[8px] uppercase tracking-wider">Hash 0x04 (Mascot Companion)</span>
                      {larryActive ? (
                        <span className="text-emerald-400 text-[8px] font-black">✓ STANDING BY</span>
                      ) : (
                        <span className="text-slate-600 text-[8px] font-black">UNSOLVED</span>
                      )}
                    </div>
                    <p className="text-slate-500 font-sans text-[8px] leading-tight">Summon Larry the Py-Mastiff helper to give console tips. (Hint: Run "import larry" or "larry")</p>
                  </div>

                  {/* Riddle 5 */}
                  <div className="p-1 px-1.5 rounded bg-slate-950/40 border border-slate-900 flex flex-col gap-0.5 select-none animate-[pulse_3s_infinite_alternate]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-violet-400 text-[8px] uppercase tracking-wider">Hash 0x05 (RGB Disco oscillator)</span>
                      {partyActive ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setPartyActive(false); }}
                          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 text-[7px] font-black tracking-widest px-1.5 py-0.5 rounded cursor-pointer select-none active:scale-95 transition-all outline-none"
                          title="Stop disco party"
                        >
                          STOP 🛑
                        </button>
                      ) : (
                        <span className="text-slate-600 text-[8px] font-black">UNSOLVED</span>
                      )}
                    </div>
                    <p className="text-slate-500 font-sans text-[8px] leading-tight">Oscillate system colors inside dynamic loop cycles. (Hint: Run "import party" or "party")</p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

          {/* HINT BOX IN SIDEBAR */}
          <div className="p-4 border-t border-slate-900 bg-black/60">
             <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between min-h-[220px]">
              <div className="flex-1">
                <h3 className="text-[9px] font-black text-cyber-pink uppercase tracking-widest mb-3 flex items-center gap-1.5 opacity-80">
                  <Lightbulb className="w-3 h-3" />
                  {getThemedLabel('assistance_protocol')}
                </h3>

                {/* MANUAL HINTS (Static) */}
                <div className="mb-4 space-y-2">
                  {currentLesson.hints.map((hint, i) => (
                    <div key={i} className="flex gap-2 text-[10px] text-slate-400 leading-snug">
                      <span className="text-cyber-cyan opacity-40">•</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentLesson.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 pt-3 border-t border-slate-800/80"
                  >
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                      {showHintSnippet ? `"Code pattern detected. Review the snippet below."` : `"Tactical advice available. Initialize intel request?"`}
                    </p>

                    {showHintSnippet && !showDeepHelp && (
                      <button 
                        onClick={() => setShowDeepHelp(true)}
                        className="text-[9px] text-cyber-cyan hover:underline uppercase tracking-widest font-bold"
                      >
                        {">"} Initialize Deep Analysis? (Reveal Answer)
                      </button>
                    )}

                    <AnimatePresence>
                      {showHintSnippet && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-3"
                        >
                          {currentLesson.offlineSnippet && (
                            <div>
                              <span className="text-[9px] text-cyber-cyan font-bold block mb-1 uppercase tracking-widest">Logic Pattern:</span>
                              <div className="p-2 bg-black/80 rounded-lg font-mono text-[9px] text-cyber-cyan/70 border border-cyber-cyan/20">
                                {currentLesson.offlineSnippet}
                              </div>
                            </div>
                          )}
                          
                          {showDeepHelp && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="pt-3 border-t border-slate-800"
                            >
                              <span className="text-[9px] text-cyber-pink font-bold block mb-1 uppercase tracking-widest">Verified Solution:</span>
                              <div className="p-2 bg-cyber-pink/5 rounded-lg font-mono text-[9px] text-cyber-pink/80 border border-cyber-pink/20 whitespace-pre-wrap">
                                {currentLesson.solution}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>
              {!showHintSnippet && (
                <button 
                  onClick={handleGetHint}
                  className={`mt-4 w-full py-2 bg-cyber-pink ${
                    activeTheme?.value === 'football' 
                      ? 'text-emerald-950 hover:bg-white/90' 
                      : activeTheme?.value === 'space'
                        ? 'text-slate-950 hover:bg-white/95'
                        : 'text-white hover:bg-cyber-pink/80'
                  } text-[9px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-[0_0_15px_var(--secondary-alpha)]`}
                >
                  Request Intel
                </button>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-slate-900 mt-auto">
            <button 
              onClick={() => setShowResetConfirmation(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 transition-all active:scale-95 group text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700" />
              Hard Reset System
            </button>
          </div>
        </motion.aside>

        {/* Removed Floating Toggle Button - Integrated into Sidebar/Top Controls */}

        {/* Main Content Areas */}
        <main className="flex-1 flex flex-col min-w-0" id="main-app-content">
          <div ref={containerRef} className="flex-1 flex flex-col md:flex-row gap-0 p-4 h-full min-h-0 relative z-10 overflow-hidden">
            {/* Documentation / Lesson View */}
            <section 
              className="flex flex-col overflow-hidden" 
              style={{ width: `${leftPanelWidth}%` }}
              aria-labelledby="lesson-title"
            >
               <div className="flex-1 cyber-panel p-8 rounded-xl overflow-y-auto custom-scrollbar relative">
                <div id="lesson-title" className="sr-only">Lesson content: {currentLesson.title}</div>
                <div className="absolute top-4 right-6 text-[9px] text-[var(--accent)] font-mono tracking-widest uppercase glow-text" aria-hidden="true">
                  NODE_ID: {currentLesson.id}
                </div>
                <motion.div
                  key={currentLesson.id}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {currentLesson.intro ? (
                    <>
                      {(() => {
                        const introText = currentLesson.intro || '';
                        const lines = introText.split('\n');
                        const hasH1 = lines[0] && lines[0].startsWith('# ');
                        const displayTitle = hasH1 ? lines[0].replace(/^#\s+/, '') : currentLesson.title;
                        const remainingIntro = hasH1 ? lines.slice(1).join('\n').trim() : introText;
                        const themeHeader = getLessonThemeHeader(activeTheme?.value || 'cyan');

                        return (
                          <div className={`p-6 rounded-xl border ${themeHeader.cardClass} relative overflow-hidden transition-all duration-500 hover:scale-[1.005] group/hdr`}>
                            {/* Accent scanner line */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60 animate-pulse" />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5 relative z-10">
                              {/* Left Badge */}
                              <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${themeHeader.blinkerClass} opacity-75`}></span>
                                  <span className={`relative inline-flex rounded-full h-2 w-2 ${themeHeader.blinkerClass}`}></span>
                                </span>
                                <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--primary)] font-black uppercase">
                                  {currentLesson.headerPrefix || themeHeader.badge}
                                </span>
                              </div>

                              {/* Right Stats HUD */}
                              <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--text-dim)]">
                                <span className="bg-black/35 px-2 py-0.5 rounded border border-white/5">
                                  {themeHeader.hudStat}
                                </span>
                                {themeHeader.renderAnimation && themeHeader.renderAnimation()}
                              </div>
                            </div>

                            {/* Display Typography Title */}
                            <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight mb-3 transition-transform duration-300 ${themeHeader.titleClass}`}>
                              {displayTitle}
                            </h2>

                            {/* Area 1: Intro Text */}
                            <div className="markdown-body text-[var(--text-main)] text-sm leading-relaxed select-text">
                              {renderMarkdown(remainingIntro)}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Area 2: Technical/How it works */}
                      <div className="p-5 bg-black/30 border border-cyber-cyan/20 rounded-lg relative overflow-hidden pl-7 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyber-cyan" />
                        <div className="flex items-center gap-2.5 mb-3.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                          </span>
                          <div className="text-cyber-cyan text-sm font-black uppercase tracking-[0.2em] sm:text-base selection:bg-white selection:text-cyber-cyan">HOW IT WORKS</div>
                        </div>
                        <div className="markdown-body text-slate-300 text-sm leading-relaxed">
                          {renderMarkdown(currentLesson.technical)}
                        </div>
                      </div>

                      {/* Area 3: Code Example */}
                      <div className="bg-[#0b1311] border border-emerald-900/50 rounded-lg overflow-hidden shadow-2xl hover:border-emerald-500/30 transition-colors">
                        <div className="px-5 py-3 border-b border-emerald-950 bg-black/40 flex justify-between items-center relative overflow-hidden">
                          <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.15em] sm:text-sm">CODE EXAMPLE</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">.py</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto whitespace-pre bg-black/10 selection:bg-emerald-800 selection:text-white">
                          <code>{currentLesson.example}</code>
                        </pre>
                      </div>

                      {/* Area 4: Task */}
                      <div className="task-box p-6 sm:p-7 border-2 border-cyber-cyan/40 bg-cyber-cyan/5 rounded-xl shadow-[0_0_24px_rgba(6,182,212,0.18)] relative overflow-hidden pl-8 sm:pl-10">
                        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-cyber-cyan" />
                        <div className="flex items-center gap-3 mb-4">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-cyan"></span>
                          </span>
                          <div className="text-cyber-cyan text-base font-black uppercase tracking-[0.2em] sm:text-lg selection:bg-white selection:text-cyber-cyan glow-text">YOUR TASK</div>
                        </div>
                        <div className="markdown-body text-slate-100 leading-relaxed">
                          {renderMarkdown(currentLesson.task)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="markdown-body p-2">
                      <div className="text-[10px] text-cyber-cyan font-mono tracking-[0.4em] uppercase mb-4 flex items-center gap-2 glow-text">
                        <div className="w-4 h-px bg-cyber-cyan"></div>
                        {currentLesson.title.split(' ')[0]} PROTOCOL
                      </div>
                      {renderMarkdown(currentLesson.content || '')}
                    </div>
                  )}
                </motion.div>
              </div>
            </section>

            {/* Horizontal Resize Handle */}
            <div 
              className="hidden md:flex w-2 hover:bg-cyber-cyan/30 cursor-col-resize transition-colors items-center justify-center group z-30"
              onMouseDown={() => setIsResizingH(true)}
            >
              <div className="w-px h-12 bg-cyber-cyan/20 group-hover:bg-cyber-cyan/60 rounded-full"></div>
            </div>

            {/* Editor / Practice View */}
            <section 
              ref={rightPanelRef}
              className="flex-1 flex flex-col gap-4 overflow-hidden" 
              aria-labelledby="editor-title" 
              id="editor-area"
            >
              <h2 id="editor-title" className="sr-only">Code Editor and Terminal</h2>
              <div className={`flex-1 bg-[var(--panel-bg)] border rounded-xl flex flex-col overflow-hidden transition-all duration-300
                ${isChecking ? 'border-cyber-cyan shadow-[0_0_30px_var(--primary-glow)]' : 'border-slate-700/80 shadow-xl'}`}>
                {/* Editor Header */}
                <div className="bg-black/20 px-4 py-2 border-b border-slate-800/50 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/50"></div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-xs font-mono text-[var(--text-dim)] font-bold tracking-widest uppercase glow-text">Terminal</span>
                     <div className="h-4 w-px bg-slate-800"></div>
                     <span className="text-[10px] font-mono text-cyber-cyan font-black animate-pulse uppercase tracking-wider glow-text">Active_Core</span>
                  </div>
                </div>

                {/* Editor Content */}
                <div 
                  className="relative flex overflow-hidden bg-[var(--panel-bg)]"
                  style={{ height: `${topPanelHeight}%`, minHeight: '150px' }}
                >
                  <Editor
                    key={`editor-${activeTheme?.value || 'cyan'}`}
                    height="100%"
                    defaultLanguage="python"
                    value={userCode}
                    onChange={handleEditorChange}
                    theme={`cyber-theme-${activeTheme?.value || 'cyan'}`}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 16,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      padding: { top: 15 },
                      fontFamily: '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
                      renderWhitespace: 'none',
                      glyphMargin: false,
                      folding: false,
                      lineDecorationsWidth: 10,
                      lineNumbersMinChars: 3,
                      wordBasedSuggestions: 'currentDocument',
                    }}
                    onMount={(editor, monaco) => {
                      const themes = [
                        'cyan', 'pink', 'green', 'amber', 
                        'marvel', 'cyberpunk', 'space', 'football', 
                        'roblox', 'fantasy', 'gaming', 'simpsons', 
                        'star-wars', 'starwars', 'music', 'dc',
                        'pokemon', 'minecraft', 'mario'
                      ];
                      
                      const colors: Record<string, string> = {
                        cyan: '#06b6d4',
                        pink: '#ec4899',
                        green: '#00ff41',
                        amber: '#f59e0b',
                        marvel: '#ed1d24',
                        cyberpunk: '#fcee0a',
                        space: '#00d2ff',
                        football: '#22c55e',
                        roblox: '#ef4444',
                        fantasy: '#9333ea',
                        gaming: '#d946ef',
                        simpsons: '#ffd90f',
                        'star-wars': '#00ff00',
                        starwars: '#00ff00',
                        music: '#f97316',
                        dc: '#60a5fa',
                        pokemon: '#ffcb05',
                        minecraft: '#5b8c32',
                        mario: '#e52521'
                      };

                      const backgrounds: Record<string, string> = {
                        cyan: '#0d1117',
                        pink: '#1a000f',
                        green: '#001405',
                        amber: '#140a00',
                        marvel: '#0b0d17',
                        cyberpunk: '#050505',
                        space: '#00040a',
                        football: '#052e16',
                        roblox: '#111827',
                        fantasy: '#1e1b4b',
                        gaming: '#0c0a09',
                        simpsons: '#1e1b4b',
                        'star-wars': '#020617',
                        starwars: '#020617',
                        music: '#0c0a09',
                        dc: '#020617',
                        pokemon: '#0e0d14',
                        minecraft: '#0d140e',
                        mario: '#130909'
                      };

                      const syntaxColors: Record<string, any> = {
                        cyan: { keyword: 'ff79c6', string: 'f1fa8c', number: 'bd93f9', comment: '6272a4', function: '50fa7b', type: '8be9fd' },
                        pink: { keyword: 'c084fc', string: 'fda4af', number: 'f472b6', comment: '701a75' },
                        green: { keyword: 'd4ff00', string: 'ffffff', number: 'd4ff00', comment: '008f11', function: 'ffffff', type: 'ffffff' },
                        amber: { keyword: 'fbbf24', string: 'ffffff', number: 'f59e0b', comment: '78350f', function: 'ffffff', type: 'ffffff' },
                        marvel: { keyword: 'ffca00', string: 'ffffff', number: 'ed1d24', comment: '94a3b8' },
                        cyberpunk: { keyword: '00f2ff', string: 'fcee0a', number: 'ff00ff', comment: '505050' },
                        space: { keyword: 'ffffff', string: '7dd3fc', number: '00d2ff', comment: '475569' },
                        football: { keyword: 'ffffff', string: '4ade80', number: '22c55e', comment: '166534' },
                        roblox: { keyword: '3b82f6', string: 'f3f4f6', number: 'ef4444', comment: '6b7280' },
                        fantasy: { keyword: 'fbbf24', string: 'f3e8ff', number: '9333ea', comment: '6b21a8' },
                        gaming: { keyword: '22c55e', string: 'fafaf9', number: 'd946ef', comment: '44403c' },
                        simpsons: { keyword: '6ec4f8', string: 'ffffff', number: 'ffd90f', comment: '475569' },
                        'star-wars': { keyword: 'ff0000', string: 'f8fafc', number: '00ff00', comment: '64748b' },
                        starwars: { keyword: 'ff0000', string: 'f8fafc', number: '00ff00', comment: '64748b' },
                        music: { keyword: '0ea5e9', string: 'fff7ed', number: 'f97316', comment: '44403c' },
                        dc: { keyword: '38bdf8', string: 'e2e8f0', number: '7dd3fc', comment: '94a3b8', function: '60a5fa', type: 'f8fafc', identifier: 'e2e8f0', operator: '93c5fd', delimiter: 'f8fafc' },
                        pokemon: { keyword: 'ffcb05', string: 'ffffff', number: 'ee1515', comment: '85796a', function: 'ffcb05', type: 'ffd23f' },
                        minecraft: { keyword: '40c6db', string: 'f0fdf4', number: '5b8c32', comment: '5c7352', function: '40c6db', type: '86efac' },
                        mario: { keyword: 'fbd000', string: 'fff1f1', number: 'e52521', comment: '7d5656', function: 'fbd000', type: 'fca5a5' }
                      };

                      themes.forEach(t => {
                        monaco.editor.defineTheme(`cyber-theme-${t}`, {
                          base: 'vs-dark',
                          inherit: true,
                          rules: [
                            { token: 'comment', foreground: syntaxColors[t]?.comment || '6272a4', fontStyle: 'italic' },
                            { token: 'keyword', foreground: syntaxColors[t]?.keyword || 'ff79c6' },
                            { token: 'string', foreground: syntaxColors[t]?.string || 'f1fa8c' },
                            { token: 'number', foreground: syntaxColors[t]?.number || 'bd93f9' },
                            { token: 'function', foreground: syntaxColors[t]?.function || undefined },
                            { token: 'type', foreground: syntaxColors[t]?.type || undefined },
                            { token: 'identifier', foreground: syntaxColors[t]?.identifier || undefined },
                            { token: 'delimiter', foreground: syntaxColors[t]?.delimiter || syntaxColors[t]?.keyword || undefined },
                            { token: 'operator', foreground: syntaxColors[t]?.operator || syntaxColors[t]?.keyword || 'ff79c6' },
                          ],
                          colors: {
                            'editor.background': backgrounds[t] || '#0d1117',
                            'editor.foreground': colors[t] || '#06b6d4',
                            'editorLineNumber.foreground': '#4b5563',
                            'editorLineNumber.activeForeground': colors[t] || '#06b6d4',
                            'editor.lineHighlightBackground': `${colors[t] || '#06b6d4'}15`,
                            'editorCursor.foreground': colors[t] || '#06b6d4',
                          }
                        });
                      });

                      monaco.editor.setTheme(`cyber-theme-${activeTheme?.value || 'cyan'}`);
                      
                      // Add Python Keywords to Autocomplete
                      monaco.languages.registerCompletionItemProvider('python', {
                        provideCompletionItems: () => {
                          const suggestions = [
                            { label: 'print', kind: monaco.languages.CompletionItemKind.Function, insertText: 'print(${1:message})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Output data to terminal' },
                            { label: 'input', kind: monaco.languages.CompletionItemKind.Function, insertText: 'input(${1:prompt})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Get user input' },
                            { label: 'len', kind: monaco.languages.CompletionItemKind.Function, insertText: 'len(${1:object})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Get length of object' },
                            { label: 'type', kind: monaco.languages.CompletionItemKind.Function, insertText: 'type(${1:object})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Get type of object' },
                            { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if ${1:condition}:\n\t${0}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
                            { label: 'else', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'else:\n\t${0}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
                            { label: 'elif', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'elif ${1:condition}:\n\t${0}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
                            { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for ${1:item} in ${2:iterable}:\n\t${0}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
                            { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while ${1:condition}:\n\t${0}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
                            { label: 'def', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'def ${1:name}(${2:params}):\n\t${0}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet },
                            { label: 'True', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'True' },
                            { label: 'False', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'False' },
                            { label: 'None', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'None' },
                          ];
                          return { suggestions };
                        }
                      });
                    }}
                  />
                </div>

                {/* Vertical Resize Handle */}
                <div 
                  className="h-2 hover:bg-cyber-cyan/30 cursor-row-resize transition-colors flex items-center justify-center group z-30 border-y border-slate-900"
                  onMouseDown={() => setIsResizingV(true)}
                >
                  <div className="h-px w-12 bg-cyber-cyan/20 group-hover:bg-cyber-cyan/60 rounded-full"></div>
                </div>

                {/* Terminal Output */}
                <div 
                  ref={terminalRef}
                  role="log"
                  aria-live="polite"
                  className="flex-1 bg-[var(--panel-bg)] p-4 font-mono text-sm overflow-y-auto custom-scrollbar flex flex-col relative"
                >
                  {/* Holographic Wallpaper overlay within terminal background */}
                  {activeWallpaper && (
                    <div 
                      className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat transition-all duration-1000 z-0 bg-blend-normal" 
                      style={{ 
                        backgroundImage: `url(${activeWallpaper.value})`,
                        opacity: 0.45,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel-bg)] via-transparent to-[var(--panel-bg)]/40" />
                      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-transparent to-[var(--panel-bg)]/50" />
                    </div>
                  )}

                  {/* EASTER EGG OVERLAYS */}
                  {matrixActive && <MatrixRain onClose={() => setMatrixActive(false)} />}
                  {rickrollActive && <RickRoll onClose={() => setRickrollActive(false)} />}
                  {larryActive && <LarryCompanion onClose={() => setLarryActive(false)} />}

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-cyber-cyan tracking-[0.3em] uppercase text-[10px] font-black glow-text">{getThemedLabel('terminal_output')}</div>
                        <div className="h-3 w-px bg-slate-800"></div>
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-cyber-cyan glow-text" />
                          <span className="text-[9px] text-[var(--accent)] uppercase tracking-tighter glow-text">kernel_link</span>
                        </div>
                      </div>
                    </div>
                    
                    {isChecking && (
                      <div className="text-cyber-cyan flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                           <span className="animate-spin text-lg">⌬</span>
                           <span className="font-black italic uppercase tracking-widest">{getThemedLabel('executing')}</span>
                         </div>
                      </div>
                    )}

                    {!isChecking && !isAwaitingInput && feedback && (
                      <div className="space-y-6">
                        <div className={feedback.success ? "text-cyber-cyan" : "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]"}>
                          <div className="flex items-center gap-3 font-black text-base italic uppercase tracking-wider mb-2">
                            <span className="opacity-80">{feedback.success ? ">> [SECURE]" : ">> [ALERT]"}</span>
                            <span>{feedback.message}</span>
                          </div>
                        </div>

                        {codeErrors.length > 0 && (
                          <div className="space-y-3 border-2 border-rose-500/50 bg-slate-950/95 backdrop-blur-md p-4 rounded-xl shadow-[0_0_25px_rgba(244,63,94,0.3)] animate-pulse relative z-10">
                            <div className="text-[11px] text-rose-400 font-black uppercase tracking-widest flex items-center gap-2">
                               <AlertTriangle className="w-4 h-4 text-rose-400" />
                               Diagnostic Errors Detected
                            </div>
                            <div className="space-y-1.5 border-t border-slate-800/80 pt-2.5">
                              {codeErrors.map((err, i) => (
                                <div key={i} className="text-[11.5px] font-mono flex items-start gap-2.5 leading-relaxed">
                                  <span className="text-rose-400 font-bold bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 rounded text-[10px] shrink-0 font-sans tracking-tight">
                                    LINE {err.line > 0 ? err.line : '?'}
                                  </span>
                                  <span className={err.type === 'error' ? "text-rose-100 font-semibold" : "text-amber-200 font-semibold opacity-100"}>
                                    {err.message}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {inputValues.length > 0 && (
                          <div className="space-y-2 mb-4 border-l-2 border-slate-800 pl-4 py-1">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold opacity-50">Transmitted Signals (Inputs)</div>
                            {inputValues.map((val, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-cyber-cyan opacity-40">[{inputPrompts[i]}]</span>
                                <span className="text-cyber-cyan">{"> "} {val}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="border border-cyber-cyan/30 bg-[var(--panel-bg)] rounded-xl overflow-hidden shadow-2xl">
                          <div className="bg-black/20 px-4 py-3 text-xs text-[var(--accent)] font-black uppercase tracking-[0.3em] flex justify-between border-b border-cyber-cyan/20 glow-text">
                            <span>Output Stream</span>
                            <span className="text-cyber-cyan opacity-50">kernel_v0.1</span>
                          </div>
                          <div className="p-4 whitespace-pre-wrap text-[var(--text-main)] bg-[var(--panel-bg)] font-mono text-xs min-h-[60px] leading-relaxed">
                            {feedback.output || (feedback.success ? ">>> Protocol complete. No errors logged." : ">>> Fault detected. Re-index and try again.")}
                          </div>
                        </div>

                        {feedback.success && (
                          <div className="text-cyber-cyan font-bold text-xs flex items-center gap-3 animate-slide-up">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="uppercase tracking-widest">Module successfully uploaded to the central node.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {isAwaitingInput && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="text-cyber-cyan font-bold flex items-center gap-2 text-xs">
                          <Radio className="w-4 h-4 animate-pulse" />
                          {getThemedLabel('awaiting_input')}
                        </div>
                        
                        {inputValues.map((val, i) => (
                          <div key={i} className="flex flex-col gap-1 opacity-60">
                             <div className="text-[10px] text-slate-500 uppercase tracking-widest">{inputPrompts[i]}</div>
                             <div className="text-white pl-4 font-mono">{"> "} {val}</div>
                          </div>
                        ))}

                        <form onSubmit={handleTerminalInputSubmit} className="space-y-2 mt-4">
                          <label htmlFor="terminal-input" className="text-[10px] text-cyber-cyan uppercase tracking-widest font-bold block">
                            {inputPrompts[currentInputIndex]}
                          </label>
                          <div className="flex items-center gap-3 bg-slate-900/50 border border-cyber-cyan/30 rounded px-3 py-2 focus-within:ring-1 focus-within:ring-cyber-cyan transition-all">
                            <ChevronRight className="w-4 h-4 text-cyber-cyan" aria-hidden="true" />
                            <input 
                              id="terminal-input"
                              ref={terminalInputRef}
                              type="text"
                              value={terminalInputValue}
                              onChange={(e) => setTerminalInputValue(e.target.value)}
                              className="bg-transparent border-none outline-none text-cyber-cyan w-full font-mono text-sm"
                              placeholder={getThemedLabel('placeholder_input')}
                              autoFocus
                            />
                          </div>
                          <p className="text-[9px] text-slate-500 italic">Press [ENTER] to confirm transmission</p>
                        </form>
                      </div>
                    )}

                    {!isChecking && !isAwaitingInput && !feedback && (
                      <div className="space-y-2 opacity-80 backdrop-blur-[1px] bg-slate-950/20 p-2 rounded-lg">
                        <div className="text-slate-300 italic font-medium">{">"} Awaiting command execution...</div>
                        <div className="text-[9.5px] pl-4 text-slate-400 font-mono">Ready for input stream. Syntax check enabled.</div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1 mt-6">
                      <span className="text-cyber-cyan">$</span>
                      <span className="w-2 h-4 bg-cyber-cyan animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <footer className="flex flex-col gap-4 p-2 border-t border-slate-900 mt-auto">
                <div className="flex items-center gap-4 px-2 overflow-x-auto no-scrollbar scrollbar-hide py-1">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">Quick Themes:</span>
                  <div className="flex gap-2">
                    {[
                      { id: 'theme-default', name: 'Default', icon: 'zap' },
                      { id: 'theme-pokemon', name: 'Pokémon' },
                      { id: 'theme-minecraft', name: 'Minecraft' },
                      { id: 'theme-mario', name: 'Super Mario' },
                      { id: 'theme-anime', name: 'Anime Heroes' },
                      { id: 'theme-mecha', name: 'Mecha & Kaiju' },
                      { id: 'theme-star-wars', name: 'Star Wars' },
                      { id: 'theme-roblox', name: 'Roblox' },
                      { id: 'theme-space', name: 'Space' },
                      { id: 'theme-music', name: 'Music' },
                      { id: 'theme-football', name: 'Football' },
                      { id: 'theme-fantasy', name: 'Fantasy' },
                      { id: 'theme-simpsons', name: 'Simpsons' },
                      { id: 'theme-marvel', name: 'Marvel' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveThemeId(t.id)}
                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full border transition-all whitespace-nowrap
                          ${activeThemeId === t.id 
                            ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                            : 'bg-black/40 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600'}`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setUserCode(currentLesson.baseCode)}
                    className="cyber-button-outline"
                    aria-label="Reset code to initial state"
                  >
                    Reset Module
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleRunCode}
                      disabled={isChecking}
                      className="px-10 py-2.5 bg-cyber-cyan text-black text-xs font-black uppercase tracking-widest rounded shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 focus:ring-2 focus:ring-cyber-cyan outline-none"
                      aria-busy={isChecking}
                    >
                      {isChecking ? 'UPLOADING...' : (
                        <>
                          <Zap className="w-4 h-4" aria-hidden="true" />
                          Execute Code [ENTER]
                        </>
                      )}
                    </button>

                    {feedback?.success && currentLessonIndex < (lessons?.length || 0) - 1 && (
                      <button
                        onClick={() => setCurrentLessonIndex(idx => idx + 1)}
                        className={`px-6 py-2 bg-cyber-pink ${
                          activeTheme?.value === 'football' 
                            ? 'text-emerald-950 hover:bg-white/90' 
                            : activeTheme?.value === 'space'
                              ? 'text-slate-950 hover:bg-white/95'
                              : 'text-white'
                        } text-xs font-black uppercase tracking-widest rounded shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:brightness-110 hover:scale-105 transition-all flex items-center gap-2 active:scale-95 focus:ring-2 focus:ring-cyber-pink outline-none`}
                      >
                        Advance to Next Node
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </footer>
            </section>
          </div>
        </main>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(30,41,59,1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6,182,212,0.3);
        }
      `}</style>
      
      {/* Hard Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirmation && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirmation(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-950 border-2 border-red-500/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">System Purge Required?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Warning: You are about to initiate a terminal reset. This action will <span className="text-red-500 font-bold uppercase underline">wipe all progress</span>, saved themes, and mission data. This cannot be undone.
                </p>
                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={() => {
                      try {
                        localStorage.clear();
                      } catch (e) {}
                      window.location.reload();
                    }}
                    className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all active:scale-95"
                  >
                    Confirm Wipe Protocol
                  </button>
                  <button
                    onClick={() => setShowResetConfirmation(false)}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    Abort Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Holographic Wallpaper Preview Modal */}
      <AnimatePresence>
        {previewWallpaperId && (() => {
          const item = REWARDS.find(r => r.id === previewWallpaperId);
          if (!item) return null;
          return (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewWallpaperId(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-4xl bg-slate-950 border-2 border-cyber-cyan/50 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)] flex flex-col"
              >
                {/* Visual Header */}
                <div className="px-6 py-4 border-b border-slate-800 bg-black/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-cyber-cyan animate-pulse" />
                    <div>
                      <span className="text-[10px] font-black text-cyber-cyan uppercase tracking-widest block leading-none">HOLO PROJECTOR CHANNEL</span>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">{item.name}</h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPreviewWallpaperId(null)}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main image view */}
                <div className="p-4 bg-black/60 flex items-center justify-center overflow-hidden max-h-[70vh]">
                  <img 
                    src={item.value} 
                    alt={item.name} 
                    className="max-h-[60vh] w-full object-contain rounded-lg border border-slate-900 shadow-2xl transition-all" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Footer with actions */}
                <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between font-sans">
                  <div className="text-left">
                    <p className="text-[11px] text-slate-400 leading-snug">{item.description}</p>
                    <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest mt-1">Source: Neural Network Cyber System</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <a 
                      href={item.value} 
                      download={`${item.id}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full md:w-auto px-4 py-2 bg-cyber-pink hover:bg-cyber-pink/90 ${
                        activeTheme?.value === 'football' 
                          ? 'text-emerald-950 hover:bg-white/94' 
                          : activeTheme?.value === 'space'
                            ? 'text-slate-950 hover:bg-white/95'
                            : 'text-white'
                      } text-[10px] font-black uppercase tracking-widest rounded transition-all text-center flex items-center justify-center gap-1.5`}
                    >
                      <Maximize2 className="w-3 h-3" />
                      Open Full Size
                    </a>
                    <button 
                      onClick={() => setPreviewWallpaperId(null)}
                      className="w-full md:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded transition-all"
                    >
                      Close Projector
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* CLASSROOM CLOUD SYNC: LOGIN & SIGN-UP MODAL */}
      {renderAuthModal()}
      {renderGuestHelpModal()}
    </div>
    </div>
  );
}

