/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scale,
  Search,
  ArrowUpDown,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  ShieldCheck,
  AlertTriangle,
  Flame,
  TrendingUp,
  HelpCircle,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { ALGORITHMS, AlgorithmId } from './AlgorithmLab';

interface AlgorithmComparisonTabProps {
  onSelectAlgorithmForSimulator: (algoId: AlgorithmId) => void;
  onOpenQuiz: () => void;
}

export const AlgorithmComparisonTab: React.FC<AlgorithmComparisonTabProps> = ({
  onSelectAlgorithmForSimulator,
  onOpenQuiz
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'head-to-head' | 'all-pros-cons' | 'matrix'>('head-to-head');
  const [selectedPair, setSelectedPair] = useState<'search' | 'sort'>('search');
  const [selectedCardAlgo, setSelectedCardAlgo] = useState<AlgorithmId>('linear-search');

  // Search pair
  const linear = ALGORITHMS['linear-search'];
  const binary = ALGORITHMS['binary-search'];

  // Sort pair
  const bubble = ALGORITHMS['bubble-sort'];
  const merge = ALGORITHMS['merge-sort'];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-[#060813] to-[#030408] p-4 md:p-8 text-slate-100">
      {/* ======================================================== */}
      {/* COMPARISON HERO BANNER */}
      {/* ======================================================== */}
      <div className="max-w-6xl w-full mx-auto mb-6">
        <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-violet-950/40 via-slate-900/90 to-cyan-950/40 border border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.15)] overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Scale className="w-3.5 h-3.5" />
                Algorithm Trade-off Matrix & Evaluation
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase font-mono">
                Pros & Cons + Head-to-Head Comparison
              </h2>
              <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
                No single algorithm is best in every scenario. Master the trade-offs: when does Linear beat Binary? Why does Merge Sort crush Bubble Sort on big data but require extra RAM?
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Take Trade-off Quiz (+25 CR)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUB-VIEW NAVIGATION TOGGLE */}
      {/* ======================================================== */}
      <div className="max-w-6xl w-full mx-auto mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('head-to-head')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSubTab === 'head-to-head'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Head-to-Head Matchups</span>
          </button>

          <button
            onClick={() => setActiveSubTab('all-pros-cons')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSubTab === 'all-pros-cons'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Detailed Pros & Cons</span>
          </button>

          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSubTab === 'matrix'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Summary Complexity Matrix</span>
          </button>
        </div>

        {activeSubTab === 'head-to-head' && (
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-2 font-bold">MATCHUP:</span>
            <button
              onClick={() => setSelectedPair('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedPair === 'search'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Linear vs Binary Search</span>
            </button>
            <button
              onClick={() => setSelectedPair('sort')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedPair === 'sort'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Bubble vs Merge Sort</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. HEAD TO HEAD MATCHUP VIEW */}
      {/* ======================================================== */}
      {activeSubTab === 'head-to-head' && (
        <div className="max-w-6xl w-full mx-auto space-y-8">
          {selectedPair === 'search' ? (
            /* LINEAR VS BINARY SEARCH MATCHUP */
            <div className="space-y-6">
              {/* Verdict Banner */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-mono font-bold text-cyan-300 uppercase">
                    The Golden Rule of Search:
                  </h4>
                  <p className="text-xs md:text-sm text-slate-200 mt-1 leading-relaxed">
                    <strong>Linear Search</strong> is optimal when data is <em>unsorted</em> or searched only once or twice (since sorting takes <code className="text-cyan-300">O(N log N)</code>, which would be slower than just scanning linearly).
                    <br />
                    <strong>Binary Search</strong> is the undisputed champion when data is <em>already sorted</em> or will be searched repeatedly (drops worst-case checks from 1,000,000 to just 20!).
                  </p>
                </div>
              </div>

              {/* Dual Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LINEAR SEARCH CARD */}
                <div className="p-6 rounded-3xl bg-[#090c1b] border border-cyan-500/30 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-mono text-white">Linear Search</h3>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Sequential Scan</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold">
                        Worst: O(N)
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {linear.description}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Major Strengths
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>No pre-sorting needed:</strong> Immediate execution on raw, random arrays.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Zero memory overhead:</strong> Operates in-place with O(1) space.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Streaming & Linked Lists:</strong> Works where jumping to random indices is impossible.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-pink-400 flex items-center gap-1.5 mb-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          Major Weaknesses
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Slow on large datasets:</strong> 10M records requires up to 10M iterations.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Wasteful repeated lookups:</strong> Rescans everything every time.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Space: O(1)</span>
                    <button
                      onClick={() => onSelectAlgorithmForSimulator('linear-search')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold cursor-pointer transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>View in Simulator</span>
                    </button>
                  </div>
                </div>

                {/* BINARY SEARCH CARD */}
                <div className="p-6 rounded-3xl bg-[#090c1b] border border-cyan-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500/20 to-transparent px-4 py-1 text-[9px] font-mono text-cyan-300 font-bold uppercase rounded-bl-xl border-b border-l border-cyan-500/30">
                    High Speed Champion
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-mono text-white">Binary Search</h3>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Divide & Conquer</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                        Worst: O(log N)
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {binary.description}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Major Strengths
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Astonishingly fast:</strong> 1,000,000 items takes at most ~20 comparisons!</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>1 Billion items:</strong> Found in under 30 steps (<code className="text-cyan-300">log₂(10⁹) ≈ 30</code>).</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Minimal RAM:</strong> Iterative implementation needs zero extra memory O(1).</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-pink-400 flex items-center gap-1.5 mb-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          Major Weaknesses
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Requires sorted data:</strong> Useless if the list is unsorted; pre-sorting takes O(N log N).</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Requires random access:</strong> Arrays work great; standard singly-linked lists fail.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Space: O(1)</span>
                    <button
                      onClick={() => onSelectAlgorithmForSimulator('binary-search')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold cursor-pointer transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>View in Simulator</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comparison Data Table */}
              <div className="bg-[#080a18] border border-slate-800 rounded-3xl p-5 overflow-x-auto">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Direct Feature Comparison
                </h4>
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">Metric / Feature</th>
                      <th className="py-2.5 px-3 text-cyan-300">Linear Search</th>
                      <th className="py-2.5 px-3 text-cyan-400 font-bold">Binary Search</th>
                      <th className="py-2.5 px-3 text-amber-400">Winner / Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Precondition</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">None (Unsorted OK)</td>
                      <td className="py-3 px-3 text-pink-400">Strictly Sorted Array</td>
                      <td className="py-3 px-3 text-cyan-300">Linear Search (easier setup)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Worst-case Comparisons (1M Items)</td>
                      <td className="py-3 px-3 text-red-400">1,000,000 checks</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">~20 checks</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Binary Search (50,000x faster!)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Time Complexity</td>
                      <td className="py-3 px-3 text-amber-400">O(N)</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">O(log N)</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Binary Search</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Auxiliary Memory</td>
                      <td className="py-3 px-3 text-emerald-400">O(1) in-place</td>
                      <td className="py-3 px-3 text-emerald-400">O(1) in-place</td>
                      <td className="py-3 px-3 text-slate-400">Tie (both minimal)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Works on Linked Lists?</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Yes (Sequential scan)</td>
                      <td className="py-3 px-3 text-pink-400">No (Requires O(1) random index)</td>
                      <td className="py-3 px-3 text-cyan-300">Linear Search</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Real-world Scenario</td>
                      <td className="py-3 px-3">Finding a receipt in a drawer</td>
                      <td className="py-3 px-3">Looking up a name in a dictionary</td>
                      <td className="py-3 px-3 text-slate-400">Context dependent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* BUBBLE SORT VS MERGE SORT MATCHUP */
            <div className="space-y-6">
              {/* Verdict Banner */}
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-mono font-bold text-amber-300 uppercase">
                    The Golden Rule of Sorting:
                  </h4>
                  <p className="text-xs md:text-sm text-slate-200 mt-1 leading-relaxed">
                    <strong>Bubble Sort</strong> is purely for <em>educational instruction</em> and tiny lists under ~15 items. Its <code className="text-pink-300">O(N²)</code> quadratic time makes it unusable in production software.
                    <br />
                    <strong>Merge Sort</strong> guarantees industrial-grade <code className="text-emerald-300">O(N log N)</code> speed and stability on any dataset size, but pays for this speed by requiring <code className="text-amber-300">O(N)</code> extra temporary RAM for its merge buffer.
                  </p>
                </div>
              </div>

              {/* Dual Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* BUBBLE SORT CARD */}
                <div className="p-6 rounded-3xl bg-[#090c1b] border border-amber-500/30 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                          <ArrowUpDown className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-mono text-white">Bubble Sort</h3>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Adjacent Swaps</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold">
                        Worst: O(N²)
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {bubble.description}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Major Strengths
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>O(1) Auxiliary Space:</strong> Operates strictly in-place; zero memory allocations.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Stable sorting:</strong> Preserves original relative order of duplicate elements.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Adaptive:</strong> Completes in O(N) if the list is already sorted with early exit flag.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-pink-400 flex items-center gap-1.5 mb-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          Major Weaknesses
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Terrible scalability O(N²):</strong> 10,000 items takes ~100,000,000 operations!</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Excessive memory writes:</strong> Incurs constant swapping overhead across memory bus.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Space: O(1)</span>
                    <button
                      onClick={() => onSelectAlgorithmForSimulator('bubble-sort')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold cursor-pointer transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>View in Simulator</span>
                    </button>
                  </div>
                </div>

                {/* MERGE SORT CARD */}
                <div className="p-6 rounded-3xl bg-[#090c1b] border border-amber-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500/20 to-transparent px-4 py-1 text-[9px] font-mono text-amber-300 font-bold uppercase rounded-bl-xl border-b border-l border-amber-500/30">
                    Production Grade
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                          <ArrowUpDown className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-mono text-white">Merge Sort</h3>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Divide, Conquer & Merge</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                        Guaranteed: O(N log N)
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {merge.description}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Major Strengths
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Rock-solid performance:</strong> Always O(N log N) in best, average, and worst case.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Immune to worst-case traps:</strong> Quick Sort can degrade to O(N²); Merge Sort never does.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>Stable & External:</strong> Ideal for sorting database queries and huge files on disk.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-pink-400 flex items-center gap-1.5 mb-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          Major Weaknesses
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Requires O(N) extra RAM:</strong> Creates temporary buffers during merge step.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-pink-400 font-bold">✗</span>
                            <span><strong>Recursion overhead:</strong> Slightly slower than quicksort in practice due to copying.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">Space: O(N) Buffer</span>
                    <button
                      onClick={() => onSelectAlgorithmForSimulator('merge-sort')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold cursor-pointer transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>View in Simulator</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comparison Data Table */}
              <div className="bg-[#080a18] border border-slate-800 rounded-3xl p-5 overflow-x-auto">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  Sorting Direct Matchup Matrix
                </h4>
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">Metric / Feature</th>
                      <th className="py-2.5 px-3 text-pink-400">Bubble Sort</th>
                      <th className="py-2.5 px-3 text-amber-400 font-bold">Merge Sort</th>
                      <th className="py-2.5 px-3 text-cyan-400">Analysis / Key Takeaway</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Worst-case Runtime</td>
                      <td className="py-3 px-3 text-red-400 font-bold">O(N²) Quadratic</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">O(N log N) Log-linear</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Merge Sort wins overwhelmingly</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">100,000 Items Runtime (approx)</td>
                      <td className="py-3 px-3 text-red-400">~10,000,000,000 operations (~10s)</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">~1,700,000 operations (&lt; 0.01s)</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Merge Sort is ~5,000x faster</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Auxiliary Memory</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">O(1) strictly in-place</td>
                      <td className="py-3 px-3 text-pink-400">O(N) temporary copy buffer</td>
                      <td className="py-3 px-3 text-amber-300">Bubble Sort uses zero extra RAM</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Stability (duplicate preservation)</td>
                      <td className="py-3 px-3 text-emerald-400">Stable (no jump swaps)</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Stable (preserves equal keys)</td>
                      <td className="py-3 px-3 text-slate-400">Tie (both are stable)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Adaptive (Already sorted input)</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">O(N) with early exit break</td>
                      <td className="py-3 px-3 text-slate-300">Still O(N log N) divides</td>
                      <td className="py-3 px-3 text-cyan-300">Bubble Sort detects sorted order</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-white">Production Recommendation</td>
                      <td className="py-3 px-3 text-red-400">Never in production</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Production standard for stable sorts</td>
                      <td className="py-3 px-3 text-emerald-400">Merge Sort is enterprise ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DETAILED PROS & CONS (TAB VIEW FOR ALL 4) */}
      {/* ======================================================== */}
      {activeSubTab === 'all-pros-cons' && (
        <div className="max-w-6xl w-full mx-auto space-y-6">
          {/* Algorithm Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['linear-search', 'binary-search', 'bubble-sort', 'merge-sort'] as AlgorithmId[]).map((algoKey) => {
              const def = ALGORITHMS[algoKey];
              const isSelected = selectedCardAlgo === algoKey;
              return (
                <button
                  key={algoKey}
                  onClick={() => setSelectedCardAlgo(algoKey)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
                  }`}
                >
                  {def.category === 'search' ? (
                    <Search className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  )}
                  <span>{def.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded uppercase ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {def.timeComplexity.worst}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Algorithm Comprehensive Deep-Dive Card */}
          {(() => {
            const def = ALGORITHMS[selectedCardAlgo];
            return (
              <div className="bg-[#080b1a] border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl md:text-2xl font-black font-mono text-white">
                        {def.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        {def.category === 'search' ? 'Search Algorithm' : 'Sorting Algorithm'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {def.subtitle} • {def.description}
                    </p>
                  </div>

                  {/* Complexities */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[90px]">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Time (Worst)</span>
                      <span className="text-sm font-mono font-black text-emerald-400">{def.timeComplexity.worst}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[90px]">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Space</span>
                      <span className="text-sm font-mono font-black text-amber-300">{def.spaceComplexity}</span>
                    </div>
                  </div>
                </div>

                {/* Pros and Cons Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  {/* PROS */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <h4 className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-2 mb-3">
                      <ThumbsUp className="w-4 h-4" />
                      Advantages & Pros
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {def.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CONS */}
                  <div className="p-5 rounded-2xl bg-pink-950/20 border border-pink-500/30">
                    <h4 className="text-xs font-mono font-bold uppercase text-pink-400 flex items-center gap-2 mb-3">
                      <ThumbsDown className="w-4 h-4" />
                      Disadvantages & Cons
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {def.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-pink-400 font-bold shrink-0">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical Advice Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      When to Use It
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {def.bestUsedFor}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-pink-400 font-bold uppercase block mb-1 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      When NOT to Use It
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {def.worstUsedFor}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Real-World Analogy
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {def.realWorldExample}
                    </p>
                  </div>
                </div>

                {/* Bottom Launch Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => onSelectAlgorithmForSimulator(def.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Open in Visualizer Canvas</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. SUMMARY COMPLEXITY MATRIX */}
      {/* ======================================================== */}
      {activeSubTab === 'matrix' && (
        <div className="max-w-6xl w-full mx-auto space-y-6">
          <div className="bg-[#080b1a] border border-slate-800 rounded-3xl p-6 md:p-8 overflow-x-auto shadow-2xl">
            <h3 className="text-base font-bold font-mono text-white uppercase mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              Complete Algorithm Complexity & Behavior Matrix
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Compare asymptotic time complexities (Big-O), space usage, and algorithmic properties at a glance.
            </p>

            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Algorithm</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-emerald-400">Best Time</th>
                  <th className="py-3 px-3 text-cyan-400">Average Time</th>
                  <th className="py-3 px-3 text-pink-400">Worst Time</th>
                  <th className="py-3 px-3 text-amber-300">Space</th>
                  <th className="py-3 px-3">Stable?</th>
                  <th className="py-3 px-3 text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {(['linear-search', 'binary-search', 'bubble-sort', 'merge-sort'] as AlgorithmId[]).map((algoKey) => {
                  const def = ALGORITHMS[algoKey];
                  return (
                    <tr key={algoKey} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white flex items-center gap-2">
                        {def.category === 'search' ? (
                          <Search className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{def.name}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 uppercase border border-slate-800">
                          {def.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-emerald-400 font-bold">{def.timeComplexity.best}</td>
                      <td className="py-3.5 px-3 text-cyan-300 font-semibold">{def.timeComplexity.average}</td>
                      <td className="py-3.5 px-3 text-pink-400 font-bold">{def.timeComplexity.worst}</td>
                      <td className="py-3.5 px-3 text-amber-300 font-bold">{def.spaceComplexity}</td>
                      <td className="py-3.5 px-3">
                        {def.isStable !== undefined ? (
                          def.isStable ? (
                            <span className="text-emerald-400 font-bold">Yes</span>
                          ) : (
                            <span className="text-pink-400">No</span>
                          )
                        ) : (
                          <span className="text-slate-500">N/A</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => onSelectAlgorithmForSimulator(algoKey)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-300 hover:text-white text-[11px] font-mono transition-all cursor-pointer"
                        >
                          Launch
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
