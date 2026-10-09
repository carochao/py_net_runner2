/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  ChevronRight,
  Code2,
  Cpu,
  Search,
  ArrowUpDown,
  Volume2,
  VolumeX,
  Shuffle,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  GripVertical,
  Layers,
  Zap,
  Clock,
  HardDrive,
  Copy,
  Check,
  Maximize2,
  Sliders,
  ChevronDown,
  Info,
  Scale,
  ThumbsUp,
  ThumbsDown,
  GitCompare,
  TrendingUp,
  ShieldCheck,
  Flame,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { AlgorithmComparisonTab } from './AlgorithmComparisonTab';

export type AlgorithmId = 'linear-search' | 'binary-search' | 'bubble-sort' | 'merge-sort';

export interface AlgorithmPointer {
  label: string;
  index: number;
  color: 'cyan' | 'amber' | 'emerald' | 'pink' | 'purple';
  position?: 'top' | 'bottom';
}

export interface AlgorithmStep {
  stepIndex: number;
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  eliminatedIndices: number[];
  foundIndex: number | null;
  pointers: AlgorithmPointer[];
  pseudocodeLine: number; // 1-based
  pythonLine: number; // 1-based
  variables: Record<string, string | number | boolean>;
  message: string;
  explanation: string;
  actionType: 'init' | 'compare' | 'swap' | 'advance' | 'found' | 'not-found' | 'eliminate' | 'split' | 'merge' | 'sorted' | 'done';
  auxiliaryArray?: (number | null)[];
  mergeStage?: {
    left: number;
    mid: number;
    right: number;
    depth?: number;
    leftSub?: number[];
    rightSub?: number[];
  };
}

export interface AlgorithmDefinition {
  id: AlgorithmId;
  name: string;
  category: 'search' | 'sort';
  subtitle: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  isStable?: boolean;
  pseudocode: {
    lines: string[];
  };
  python: {
    lines: string[];
  };
  defaultArray: number[];
  defaultTarget?: number;
  keyInsights: string[];
  pros: string[];
  cons: string[];
  bestUsedFor: string;
  worstUsedFor: string;
  realWorldExample: string;
}

export const ALGORITHMS: Record<AlgorithmId, AlgorithmDefinition> = {
  'linear-search': {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'search',
    subtitle: 'Sequential Element Scan',
    description: 'Iterates through the collection item by item from start to finish until the target key is matched or the list terminates.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(N)',
      worst: 'O(N)'
    },
    spaceComplexity: 'O(1)',
    pseudocode: {
      lines: [
        'FUNCTION linearSearch(arr, target):',
        '  FOR index FROM 0 TO length(arr) - 1:',
        '    IF arr[index] == target THEN',
        '      RETURN index  // Target found!',
        '    END IF',
        '  END FOR',
        '  RETURN -1  // Target not in collection',
        'END FUNCTION'
      ]
    },
    python: {
      lines: [
        'def linear_search(arr, target):',
        '    for index in range(len(arr)):',
        '        if arr[index] == target:',
        '            return index  # Target found at index!',
        '        # Element did not match; continue search',
        '    ',
        '    return -1  # Target is not present in arr'
      ]
    },
    defaultArray: [14, 28, 5, 42, 19, 88, 33, 7, 50, 12],
    defaultTarget: 42,
    keyInsights: [
      'Works on unsorted arrays without any preparation',
      'Examines up to N elements in the worst case',
      'Simple and optimal for small datasets or streaming data'
    ],
    pros: [
      'Works out of the box on completely unsorted data (zero preprocessing required)',
      'Extremely simple to write, understand, and debug (single loop, minimal memory)',
      'O(1) Auxiliary Space — requires zero extra RAM or memory allocation',
      'Works seamlessly on linked lists and unindexed data streams where random access is impossible',
      'Best-case runtime is O(1) if the desired item happens to be located at the very first index'
    ],
    cons: [
      'Slow and inefficient for large datasets — time scales linearly O(N)',
      'Worst-case must inspect every single element (e.g. 10,000,000 comparisons for 10M records)',
      'Wastes CPU repeating scans over the same dataset if searched multiple times',
      'Inefficient compared to binary search which eliminates half the data per step'
    ],
    bestUsedFor: 'Small or unsorted lists (under 50 items), linked lists, one-off searches, or streaming data arriving continuously in real time.',
    worstUsedFor: 'Frequent lookups across massive, static datasets (e.g., searching millions of user accounts or database primary keys).',
    realWorldExample: 'Checking a short grocery list or looking through an unsorted pile of receipts for a specific store name.'
  },

  'binary-search': {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'search',
    subtitle: 'Logarithmic Divide & Conquer',
    description: 'Repeatedly halves the search interval in a sorted array by comparing the target with the median element.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)'
    },
    spaceComplexity: 'O(1)',
    pseudocode: {
      lines: [
        'FUNCTION binarySearch(arr, target):',
        '  low = 0',
        '  high = length(arr) - 1',
        '  WHILE low <= high:',
        '    mid = floor((low + high) / 2)',
        '    IF arr[mid] == target THEN',
        '      RETURN mid  // Target found at mid!',
        '    ELSE IF arr[mid] < target THEN',
        '      low = mid + 1  // Search upper right half',
        '    ELSE:',
        '      high = mid - 1  // Search lower left half',
        '    END IF',
        '  END WHILE',
        '  RETURN -1  // Target not found',
        'END FUNCTION'
      ]
    },
    python: {
      lines: [
        'def binary_search(arr, target):',
        '    low = 0',
        '    high = len(arr) - 1',
        '    while low <= high:',
        '        mid = (low + high) // 2',
        '        if arr[mid] == target:',
        '            return mid  # Found at mid index!',
        '        elif arr[mid] < target:',
        '            low = mid + 1  # Discard left range',
        '        else:',
        '            high = mid - 1  # Discard right range',
        '    return -1  # Target not found'
      ]
    },
    defaultArray: [4, 9, 15, 23, 31, 42, 56, 68, 77, 89, 95, 110],
    defaultTarget: 68,
    keyInsights: [
      'Requires the input array to be strictly sorted',
      'Eliminates 50% of remaining candidates at every single step',
      'Can locate any element in an array of 1,000,000 items in ~20 comparisons'
    ],
    pros: [
      'Blazing fast logarithmic time O(log N) — handles millions of items in only ~20 checks',
      'Scales beautifully: 1 billion items takes at most 30 comparisons!',
      'O(1) Auxiliary Space for iterative version — memory footprint is virtually zero',
      'Predictable performance with minimal variation between average and worst case'
    ],
    cons: [
      'STRICT REQUIREMENT: The collection MUST be sorted first (sorting takes O(N log N) overhead)',
      'Requires contiguous, random-access data structures (like arrays); fails on standard singly-linked lists',
      'Modifications or frequent insertions require resorting or shifting array elements O(N)',
      'Slightly more complex edge cases (off-by-one errors, integer overflow in mid calculation)'
    ],
    bestUsedFor: 'Large, sorted datasets with frequent read queries and infrequent modifications (e.g., dictionary lookups, database indices).',
    worstUsedFor: 'Constantly mutating or unsorted streams where the overhead of maintaining sorted order outweighs the search speedup.',
    realWorldExample: 'Looking up a name in a physical printed phonebook or dictionary by opening right in the middle.'
  },

  'bubble-sort': {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sort',
    subtitle: 'Adjacent Element Swapping',
    description: 'Walks through the list, compares neighboring elements, and swaps them if they are in the wrong order. Larger values bubble up to the end.',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N²)',
      worst: 'O(N²)'
    },
    spaceComplexity: 'O(1)',
    isStable: true,
    pseudocode: {
      lines: [
        'PROCEDURE bubbleSort(arr):',
        '  n = length(arr)',
        '  FOR i FROM 0 TO n - 1:',
        '    swapped = FALSE',
        '    FOR j FROM 0 TO n - i - 2:',
        '      IF arr[j] > arr[j + 1] THEN',
        '        SWAP arr[j] WITH arr[j + 1]',
        '        swapped = TRUE',
        '      END IF',
        '    END FOR',
        '    IF NOT swapped THEN BREAK  // Early exit optimization',
        '  END FOR',
        '  RETURN arr',
        'END PROCEDURE'
      ]
    },
    python: {
      lines: [
        'def bubble_sort(arr):',
        '    n = len(arr)',
        '    for i in range(n):',
        '        swapped = False',
        '        for j in range(0, n - i - 1):',
        '            if arr[j] > arr[j + 1]:',
        '                arr[j], arr[j + 1] = arr[j + 1], arr[j]',
        '                swapped = True',
        '        if not swapped:',
        '            break  # Early exit if array is already sorted',
        '    return arr'
      ]
    },
    defaultArray: [48, 12, 85, 33, 67, 21, 9, 54],
    keyInsights: [
      'Guarantees the largest unsorted element settles into place at the end of each pass',
      'Stable sorting algorithm (equal keys maintain relative order)',
      'Early termination flag provides O(N) runtime on already-sorted arrays'
    ],
    pros: [
      'In-place algorithm requiring O(1) auxiliary space (no extra memory allocation)',
      'Stable sort: elements with identical values preserve their original relative positions',
      'Adaptive: with the swapped flag, finishes in O(N) linear time if the input is already sorted',
      'Easiest sorting algorithm to conceptualize, trace by hand, and teach to beginners'
    ],
    cons: [
      'Horrendous quadratic time O(N²) in average and worst cases — completely impractical for large data',
      'Excessive write operations: performs frequent physical memory swaps for almost every inversion',
      'Takes ~1,000,000 operations for just 1,000 items, and ~100,000,000 for 10,000 items',
      'Far outperformed by Merge Sort, Quick Sort, and TimSort on any modern computer system'
    ],
    bestUsedFor: 'Educational demonstrations, introductory programming courses, or very tiny arrays (fewer than 15 elements) that are nearly sorted.',
    worstUsedFor: 'Production software, large-scale systems, data pipelines, or performance-critical embedded environments.',
    realWorldExample: 'Sorting a handful of playing cards in your hand by repeatedly swapping neighboring cards.'
  },

  'merge-sort': {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sort',
    subtitle: 'Divide, Conquer & Merge',
    description: 'Recursively subdivides the array into two halves until single items remain, then merges sorted halves back together in ascending order.',
    timeComplexity: {
      best: 'O(N log N)',
      average: 'O(N log N)',
      worst: 'O(N log N)'
    },
    spaceComplexity: 'O(N)',
    isStable: true,
    pseudocode: {
      lines: [
        'FUNCTION mergeSort(arr, left, right):',
        '  IF left >= right THEN RETURN',
        '  mid = floor((left + right) / 2)',
        '  mergeSort(arr, left, mid)        // Conquer Left',
        '  mergeSort(arr, mid + 1, right)   // Conquer Right',
        '  MERGE(arr, left, mid, right)     // Combine Halves',
        'END FUNCTION',
        '',
        'PROCEDURE MERGE(arr, left, mid, right):',
        '  WHILE i <= mid AND j <= right:',
        '    IF leftPart[i] <= rightPart[j] THEN',
        '      merged.append(leftPart[i++])',
        '    ELSE: merged.append(rightPart[j++])',
        '  Copy merged back to arr[left..right]'
      ]
    },
    python: {
      lines: [
        'def merge_sort(arr, left, right):',
        '    if left >= right:',
        '        return',
        '    mid = (left + right) // 2',
        '    merge_sort(arr, left, mid)       # Sort left sublist',
        '    merge_sort(arr, mid + 1, right)  # Sort right sublist',
        '    merge(arr, left, mid, right)     # Merge sorted halves',
        '',
        'def merge(arr, left, mid, right):',
        '    # Compare elements from left and right halves in order',
        '    # Insert smaller element into auxiliary buffer',
        '    # Copy merged elements back into original array range'
      ]
    },
    defaultArray: [38, 27, 43, 3, 9, 82, 10, 65],
    keyInsights: [
      'Guaranteed O(N log N) performance regardless of initial array ordering',
      'Classic Divide & Conquer paradigm used in production runtimes',
      'Stable sorting algorithm requiring O(N) auxiliary memory for buffer'
    ],
    pros: [
      'Guaranteed O(N log N) performance in all cases (best, average, and worst-case are identical)',
      'Stable sort: preserves relative order of duplicate values (critical for multi-column sorting)',
      'Highly parallelizable and ideal for external sorting (data too large to fit in RAM, e.g. disk/tape)',
      'Predictable performance: immune to the quadratic O(N²) worst-case pitfall that affects Quick Sort'
    ],
    cons: [
      'Requires O(N) auxiliary memory — creates temporary copy buffers during the merge phase',
      'Not in-place for standard array implementations; higher memory overhead can strain limited RAM',
      'Incurs recursion and function call overhead for small arrays compared to insertion sort',
      'Extra data movement: elements must be copied back and forth between auxiliary and main arrays'
    ],
    bestUsedFor: 'Large datasets requiring stable, guaranteed O(N log N) performance, linked lists, and external sorting where data resides on disk.',
    worstUsedFor: 'Extremely memory-constrained embedded systems where allocating O(N) extra RAM is forbidden.',
    realWorldExample: 'Sorting hundreds of thousands of customer records by date and then by name without disturbing earlier order, or sorting files on disk.'
  }
};

// ==========================================
// ALGORITHM STEP GENERATORS
// ==========================================

function generateLinearSearchSteps(arr: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  let stepCount = 0;

  // Step 0: Initial call
  steps.push({
    stepIndex: stepCount++,
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [],
    pseudocodeLine: 1,
    pythonLine: 1,
    variables: { target, array_len: arr.length },
    message: `Initialized Linear Search for target value ${target}.`,
    explanation: `We begin with an array of ${arr.length} elements. We will check each element one by one starting from index 0.`,
    actionType: 'init'
  });

  let found = false;

  for (let i = 0; i < arr.length; i++) {
    // Step: Loop start / pointer advance
    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [i],
      swappingIndices: [],
      sortedIndices: [],
      eliminatedIndices: Array.from({ length: i }, (_, k) => k),
      foundIndex: null,
      pointers: [{ label: `i = ${i}`, index: i, color: 'cyan', position: 'bottom' }],
      pseudocodeLine: 2,
      pythonLine: 2,
      variables: { target, index: i, 'arr[index]': arr[i] },
      message: `Loop iteration: Inspecting index ${i} with value ${arr[i]}.`,
      explanation: `Set pointer index = ${i}. Comparing current element arr[${i}] (${arr[i]}) with target (${target}).`,
      actionType: 'advance'
    });

    // Step: Comparison check
    if (arr[i] === target) {
      // Match found!
      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [i],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: Array.from({ length: i }, (_, k) => k),
        foundIndex: i,
        pointers: [{ label: `MATCH!`, index: i, color: 'emerald', position: 'bottom' }],
        pseudocodeLine: 3,
        pythonLine: 3,
        variables: { target, index: i, 'arr[index]': arr[i], match: true },
        message: `Match confirmed! arr[${i}] (${arr[i]}) == target (${target}).`,
        explanation: `Condition evaluated to TRUE! Returning matched index ${i}.`,
        actionType: 'compare'
      });

      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: Array.from({ length: i }, (_, k) => k),
        foundIndex: i,
        pointers: [{ label: `RETURN ${i}`, index: i, color: 'emerald', position: 'bottom' }],
        pseudocodeLine: 4,
        pythonLine: 4,
        variables: { target, result: i },
        message: `Successfully returned index ${i}! Search complete in ${i + 1} comparisons.`,
        explanation: `Linear search successfully located target ${target} at index ${i}.`,
        actionType: 'found'
      });

      found = true;
      break;
    } else {
      // Mismatch
      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [i],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        foundIndex: null,
        pointers: [{ label: `≠ ${target}`, index: i, color: 'pink', position: 'bottom' }],
        pseudocodeLine: 3,
        pythonLine: 3,
        variables: { target, index: i, 'arr[index]': arr[i], match: false },
        message: `Mismatch: arr[${i}] (${arr[i]}) ≠ ${target}.`,
        explanation: `${arr[i]} does not equal target ${target}. Eliminating index ${i} and advancing pointer.`,
        actionType: 'compare'
      });
    }
  }

  if (!found) {
    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      eliminatedIndices: Array.from({ length: arr.length }, (_, k) => k),
      foundIndex: null,
      pointers: [],
      pseudocodeLine: 7,
      pythonLine: 7,
      variables: { target, result: -1 },
      message: `Target ${target} was not found in the array. Returning -1.`,
      explanation: `All ${arr.length} elements have been inspected without finding ${target}. The search terminates unsuccessfully.`,
      actionType: 'not-found'
    });
  }

  return steps;
}

function generateBinarySearchSteps(rawArr: number[], target: number): AlgorithmStep[] {
  // Ensure array is sorted for binary search
  const arr = [...rawArr].sort((a, b) => a - b);
  const steps: AlgorithmStep[] = [];
  let stepCount = 0;

  let low = 0;
  let high = arr.length - 1;

  steps.push({
    stepIndex: stepCount++,
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [
      { label: `L = ${low}`, index: low, color: 'cyan', position: 'top' },
      { label: `R = ${high}`, index: high, color: 'pink', position: 'top' }
    ],
    pseudocodeLine: 1,
    pythonLine: 1,
    variables: { target, low, high },
    message: `Initialized Binary Search for target ${target} on sorted array.`,
    explanation: `Array has ${arr.length} elements in sorted order. Initialized low = 0 and high = ${high}.`,
    actionType: 'init'
  });

  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Compute eliminated indices outside [low..high]
    const eliminated: number[] = [];
    for (let k = 0; k < arr.length; k++) {
      if (k < low || k > high) eliminated.push(k);
    }

    // Step: Calculate mid
    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [mid],
      swappingIndices: [],
      sortedIndices: [],
      eliminatedIndices: eliminated,
      foundIndex: null,
      pointers: [
        { label: `L`, index: low, color: 'cyan', position: 'top' },
        { label: `MID = ${mid}`, index: mid, color: 'purple', position: 'bottom' },
        { label: `R`, index: high, color: 'pink', position: 'top' }
      ],
      pseudocodeLine: 5,
      pythonLine: 5,
      variables: { target, low, high, mid, 'arr[mid]': arr[mid] },
      message: `Calculated mid index: floor((${low} + ${high}) / 2) = ${mid} (value ${arr[mid]}).`,
      explanation: `Current active search range is indices [${low} .. ${high}]. Midpoint is index ${mid}.`,
      actionType: 'advance'
    });

    // Step: Compare arr[mid] with target
    if (arr[mid] === target) {
      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [mid],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: eliminated,
        foundIndex: mid,
        pointers: [
          { label: `MATCH!`, index: mid, color: 'emerald', position: 'bottom' }
        ],
        pseudocodeLine: 6,
        pythonLine: 6,
        variables: { target, low, high, mid, 'arr[mid]': arr[mid], match: true },
        message: `Match found! arr[${mid}] (${arr[mid]}) == target (${target}).`,
        explanation: `Target ${target} matches the midpoint value! Binary search succeeded!`,
        actionType: 'compare'
      });

      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: eliminated,
        foundIndex: mid,
        pointers: [
          { label: `RETURN ${mid}`, index: mid, color: 'emerald', position: 'bottom' }
        ],
        pseudocodeLine: 7,
        pythonLine: 7,
        variables: { target, result: mid },
        message: `Returning index ${mid}. Binary search complete!`,
        explanation: `Located in logarithmic time. Total search range was halved repeatedly.`,
        actionType: 'found'
      });

      found = true;
      break;
    } else if (arr[mid] < target) {
      // Discard left half
      const nextLow = mid + 1;
      const newlyEliminated: number[] = [];
      for (let k = 0; k < arr.length; k++) {
        if (k < nextLow || k > high) newlyEliminated.push(k);
      }

      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [mid],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: eliminated,
        foundIndex: null,
        pointers: [
          { label: `${arr[mid]} < ${target}`, index: mid, color: 'amber', position: 'bottom' }
        ],
        pseudocodeLine: 8,
        pythonLine: 8,
        variables: { target, mid, 'arr[mid]': arr[mid], condition: `${arr[mid]} < ${target} (True)` },
        message: `Since arr[${mid}] (${arr[mid]}) < ${target}, target must be in right half.`,
        explanation: `Discarding left half (indices [${low}..${mid}]). Setting low = mid + 1 = ${nextLow}.`,
        actionType: 'eliminate'
      });

      low = nextLow;
    } else {
      // Discard right half
      const nextHigh = mid - 1;
      const newlyEliminated: number[] = [];
      for (let k = 0; k < arr.length; k++) {
        if (k < low || k > nextHigh) newlyEliminated.push(k);
      }

      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [mid],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: eliminated,
        foundIndex: null,
        pointers: [
          { label: `${arr[mid]} > ${target}`, index: mid, color: 'amber', position: 'bottom' }
        ],
        pseudocodeLine: 10,
        pythonLine: 10,
        variables: { target, mid, 'arr[mid]': arr[mid], condition: `${arr[mid]} > ${target} (True)` },
        message: `Since arr[${mid}] (${arr[mid]}) > ${target}, target must be in left half.`,
        explanation: `Discarding right half (indices [${mid}..${high}]). Setting high = mid - 1 = ${nextHigh}.`,
        actionType: 'eliminate'
      });

      high = nextHigh;
    }
  }

  if (!found) {
    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      eliminatedIndices: Array.from({ length: arr.length }, (_, k) => k),
      foundIndex: null,
      pointers: [],
      pseudocodeLine: 14,
      pythonLine: 13,
      variables: { target, low, high, result: -1 },
      message: `low (${low}) > high (${high}): Search interval is exhausted. Target ${target} not in array.`,
      explanation: `Returning -1 indicating the target was not present in the sorted collection.`,
      actionType: 'not-found'
    });
  }

  return steps;
}

function generateBubbleSortSteps(initialArr: number[]): AlgorithmStep[] {
  const arr = [...initialArr];
  const steps: AlgorithmStep[] = [];
  let stepCount = 0;
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({
    stepIndex: stepCount++,
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [],
    pseudocodeLine: 1,
    pythonLine: 1,
    variables: { n, comparisons: 0, swaps: 0 },
    message: `Initialized Bubble Sort for ${n} elements.`,
    explanation: `We will compare adjacent pairs (arr[j] and arr[j+1]) and swap them if out of order.`,
    actionType: 'init'
  });

  let totalComparisons = 0;
  let totalSwaps = 0;

  for (let i = 0; i < n; i++) {
    let swapped = false;

    // Outer loop start
    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sorted],
      eliminatedIndices: [],
      foundIndex: null,
      pointers: [{ label: `Pass ${i + 1}`, index: 0, color: 'cyan', position: 'top' }],
      pseudocodeLine: 3,
      pythonLine: 3,
      variables: { pass: i + 1, 'max_index': n - i - 1, totalComparisons, totalSwaps },
      message: `Starting Pass ${i + 1} of ${n - 1}.`,
      explanation: `During this pass, the largest unsorted element will bubble up to index ${n - i - 1}.`,
      actionType: 'advance'
    });

    for (let j = 0; j < n - i - 1; j++) {
      totalComparisons++;
      const valA = arr[j];
      const valB = arr[j + 1];

      // Comparison step
      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: [...sorted],
        eliminatedIndices: [],
        foundIndex: null,
        pointers: [
          { label: `j`, index: j, color: 'amber', position: 'bottom' },
          { label: `j+1`, index: j + 1, color: 'amber', position: 'bottom' }
        ],
        pseudocodeLine: 6,
        pythonLine: 6,
        variables: { j, 'arr[j]': valA, 'arr[j+1]': valB, 'needs_swap': valA > valB, totalComparisons, totalSwaps },
        message: `Comparing arr[${j}] (${valA}) and arr[${j + 1}] (${valB}).`,
        explanation: valA > valB
          ? `${valA} > ${valB}: Elements are out of order! Swapping them.`
          : `${valA} ≤ ${valB}: Elements are in correct relative order. No swap required.`,
        actionType: 'compare'
      });

      if (valA > valB) {
        // Swap elements
        totalSwaps++;
        swapped = true;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        steps.push({
          stepIndex: stepCount++,
          array: [...arr],
          comparingIndices: [j, j + 1],
          swappingIndices: [j, j + 1],
          sortedIndices: [...sorted],
          eliminatedIndices: [],
          foundIndex: null,
          pointers: [
            { label: `SWAP`, index: j, color: 'pink', position: 'bottom' },
            { label: `SWAP`, index: j + 1, color: 'pink', position: 'bottom' }
          ],
          pseudocodeLine: 7,
          pythonLine: 7,
          variables: { j, 'swapped_arr[j]': arr[j], 'swapped_arr[j+1]': arr[j + 1], totalComparisons, totalSwaps },
          message: `Swapped arr[${j}] and arr[${j + 1}]. Now arr[${j}]=${arr[j]}, arr[${j + 1}]=${arr[j + 1]}.`,
          explanation: `The larger element (${valA}) moves one step closer to the end of the array.`,
          actionType: 'swap'
        });
      }
    }

    // Element at n - i - 1 is now in its finalized sorted position
    sorted.unshift(n - i - 1);
    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sorted],
      eliminatedIndices: [],
      foundIndex: null,
      pointers: [{ label: `Sorted`, index: n - i - 1, color: 'emerald', position: 'top' }],
      pseudocodeLine: 10,
      pythonLine: 8,
      variables: { pass: i + 1, finalized_index: n - i - 1, totalComparisons, totalSwaps },
      message: `Pass ${i + 1} complete. Value ${arr[n - i - 1]} at index ${n - i - 1} is locked in place!`,
      explanation: `Each completed pass bubbles the next largest element to its permanent sorted slot.`,
      actionType: 'sorted'
    });

    if (!swapped) {
      // Early break!
      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        eliminatedIndices: [],
        foundIndex: null,
        pointers: [],
        pseudocodeLine: 11,
        pythonLine: 9,
        variables: { swapped: false, earlyExit: true, totalComparisons, totalSwaps },
        message: `No swaps occurred during Pass ${i + 1}! Array is fully sorted. Breaking early!`,
        explanation: `Early termination optimization saved additional unnecessary passes.`,
        actionType: 'done'
      });
      return steps;
    }
  }

  // Final step
  steps.push({
    stepIndex: stepCount++,
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [],
    pseudocodeLine: 13,
    pythonLine: 11,
    variables: { totalComparisons, totalSwaps, sorted: true },
    message: `Bubble Sort finished! Entire array is sorted in ${totalComparisons} comparisons and ${totalSwaps} swaps.`,
    explanation: `All elements are now in ascending order.`,
    actionType: 'done'
  });

  return steps;
}

function generateMergeSortSteps(initialArr: number[]): AlgorithmStep[] {
  const arr = [...initialArr];
  const steps: AlgorithmStep[] = [];
  let stepCount = 0;
  const n = arr.length;

  steps.push({
    stepIndex: stepCount++,
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [],
    pseudocodeLine: 1,
    pythonLine: 1,
    variables: { n, stage: 'Initial Divide' },
    message: `Initialized Merge Sort for ${n} elements.`,
    explanation: `Merge Sort uses Divide and Conquer: recursively divide the array into halves, then merge sorted sub-lists back together.`,
    actionType: 'init'
  });

  // Helper recursive merge sort simulator that records steps
  function recursiveMergeSort(left: number, right: number, depth: number) {
    if (left >= right) {
      return;
    }

    const mid = Math.floor((left + right) / 2);

    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      eliminatedIndices: [],
      foundIndex: null,
      pointers: [
        { label: `L`, index: left, color: 'cyan', position: 'top' },
        { label: `Mid`, index: mid, color: 'purple', position: 'top' },
        { label: `R`, index: right, color: 'pink', position: 'top' }
      ],
      pseudocodeLine: 3,
      pythonLine: 4,
      variables: { left, mid, right, depth },
      message: `Dividing slice [${left}..${right}] at mid index ${mid}.`,
      explanation: `Splitting into left sublist [${left}..${mid}] and right sublist [${mid + 1}..${right}].`,
      actionType: 'split',
      mergeStage: { left, mid, right, depth }
    });

    recursiveMergeSort(left, mid, depth + 1);
    recursiveMergeSort(mid + 1, right, depth + 1);

    // Merge phase
    merge(left, mid, right, depth);
  }

  function merge(left: number, mid: number, right: number, depth: number) {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);
    const mergedBuffer: number[] = [];

    let i = 0;
    let j = 0;

    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [left, mid + 1],
      swappingIndices: [],
      sortedIndices: [],
      eliminatedIndices: [],
      foundIndex: null,
      pointers: [
        { label: `Merge L`, index: left, color: 'cyan', position: 'top' },
        { label: `Merge R`, index: right, color: 'pink', position: 'top' }
      ],
      pseudocodeLine: 6,
      pythonLine: 7,
      variables: {
        leftSlice: `[${leftPart.join(', ')}]`,
        rightSlice: `[${rightPart.join(', ')}]`
      },
      message: `Merging sorted sublists [${leftPart.join(', ')}] and [${rightPart.join(', ')}].`,
      explanation: `Comparing heads of both sublists and inserting smaller elements into auxiliary buffer.`,
      actionType: 'merge',
      mergeStage: { left, mid, right, depth, leftSub: leftPart, rightSub: rightPart }
    });

    while (i < leftPart.length && j < rightPart.length) {
      const idxA = left + i;
      const idxB = mid + 1 + j;

      steps.push({
        stepIndex: stepCount++,
        array: [...arr],
        comparingIndices: [idxA, idxB],
        swappingIndices: [],
        sortedIndices: [],
        eliminatedIndices: [],
        foundIndex: null,
        pointers: [
          { label: `i (${leftPart[i]})`, index: idxA, color: 'amber', position: 'bottom' },
          { label: `j (${rightPart[j]})`, index: idxB, color: 'purple', position: 'bottom' }
        ],
        pseudocodeLine: 11,
        pythonLine: 11,
        variables: {
          'leftPart[i]': leftPart[i],
          'rightPart[j]': rightPart[j],
          buffer: `[${mergedBuffer.join(', ')}]`
        },
        message: `Comparing left element ${leftPart[i]} with right element ${rightPart[j]}.`,
        explanation: leftPart[i] <= rightPart[j]
          ? `${leftPart[i]} ≤ ${rightPart[j]}: Taking ${leftPart[i]} from left sublist into merged buffer.`
          : `${rightPart[j]} < ${leftPart[i]}: Taking ${rightPart[j]} from right sublist into merged buffer.`,
        actionType: 'compare',
        auxiliaryArray: [...mergedBuffer]
      });

      if (leftPart[i] <= rightPart[j]) {
        mergedBuffer.push(leftPart[i]);
        i++;
      } else {
        mergedBuffer.push(rightPart[j]);
        j++;
      }
    }

    while (i < leftPart.length) {
      mergedBuffer.push(leftPart[i]);
      i++;
    }

    while (j < rightPart.length) {
      mergedBuffer.push(rightPart[j]);
      j++;
    }

    // Copy back into original array
    for (let k = 0; k < mergedBuffer.length; k++) {
      arr[left + k] = mergedBuffer[k];
    }

    steps.push({
      stepIndex: stepCount++,
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      eliminatedIndices: [],
      foundIndex: null,
      pointers: [
        { label: `Merged`, index: left, color: 'emerald', position: 'top' },
        { label: `Range`, index: right, color: 'emerald', position: 'top' }
      ],
      pseudocodeLine: 14,
      pythonLine: 14,
      variables: {
        mergedSlice: `[${mergedBuffer.join(', ')}]`,
        range: `[${left}..${right}]`
      },
      message: `Sublist range [${left}..${right}] successfully merged and sorted: [${mergedBuffer.join(', ')}].`,
      explanation: `Copied auxiliary buffer elements back to main array. This subsegment is now sorted.`,
      actionType: 'sorted',
      auxiliaryArray: [...mergedBuffer]
    });
  }

  recursiveMergeSort(0, n - 1, 0);

  steps.push({
    stepIndex: stepCount++,
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [],
    pseudocodeLine: 7,
    pythonLine: 7,
    variables: { completed: true, result: `[${arr.join(', ')}]` },
    message: `Merge Sort completed! Array is sorted in O(N log N) time complexity.`,
    explanation: `All recursive splits have been combined back into a single fully-sorted array.`,
    actionType: 'done'
  });

  return steps;
}

// ==========================================
// AUDIO SYNTHESIZER FOR ALGORITHM STEPS
// ==========================================

class AlgorithmAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getCtx(): AudioContext | null {
    if (!this.enabled) return null;
    if (this.ctx) return this.ctx;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        return this.ctx;
      }
    } catch {
      // Audio not supported
    }
    return null;
  }

  public playToneForValue(val: number, maxVal: number = 100) {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Map value (5..120) to frequency range (240Hz .. 960Hz)
    const norm = Math.max(0.05, Math.min(1, val / Math.max(1, maxVal)));
    const freq = 220 + norm * 700;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  public playSwapTone() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.08);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.11);
  }

  public playSuccessChime() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);

      gain.gain.setValueAtTime(0.001, t + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.12, t + idx * 0.07 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.32);
    });
  }
}

const algoAudio = new AlgorithmAudioEngine();

// ==========================================
// MAIN ALGORITHM LAB COMPONENT
// ==========================================

interface AlgorithmLabProps {
  onBackToMain: () => void;
  onRewardCredits: (credits: number) => void;
  currentCredits: number;
  userInterest?: string;
  activeTheme?: any;
}

export const AlgorithmLab: React.FC<AlgorithmLabProps> = ({
  onBackToMain,
  onRewardCredits,
  currentCredits,
  userInterest = 'Cybersecurity',
  activeTheme = 'cyan'
}) => {
  // Top Level Navigation: Interactive Visual Simulator vs Pros, Cons & Comparison Lab
  const [topNavTab, setTopNavTab] = useState<'simulator' | 'comparison'>('simulator');
  const [comparisonPair, setComparisonPair] = useState<'search' | 'sort'>('search');

  // Algorithm selection
  const [selectedAlgoId, setSelectedAlgoId] = useState<AlgorithmId>('linear-search');
  const currentAlgo = ALGORITHMS[selectedAlgoId];

  // Array state
  const [currentArray, setCurrentArray] = useState<number[]>(() => [...ALGORITHMS['linear-search'].defaultArray]);
  const [searchTarget, setSearchTarget] = useState<number>(() => ALGORITHMS['linear-search'].defaultTarget || 42);
  const [customArrayInput, setCustomArrayInput] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 2x, 4x
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Code Panel Layout State
  const [codeViewTab, setCodeViewTab] = useState<'pseudocode' | 'python' | 'both'>('both');
  const [codeFontSize, setCodeFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [codePanelWidth, setCodePanelWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('algo_lab_code_width');
      return saved ? Math.min(680, Math.max(300, parseInt(saved, 10))) : 440;
    } catch {
      return 440;
    }
  });
  const [isResizingPanel, setIsResizingPanel] = useState<boolean>(false);
  const [copiedCodeType, setCopiedCodeType] = useState<string | null>(null);

  // Quiz / Challenge state for earning credits
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Auto-play timer ref
  const playTimerRef = useRef<any>(null);

  // Generate steps whenever algorithm, array, or target changes
  const steps = useMemo<AlgorithmStep[]>(() => {
    if (selectedAlgoId === 'linear-search') {
      return generateLinearSearchSteps(currentArray, searchTarget);
    } else if (selectedAlgoId === 'binary-search') {
      return generateBinarySearchSteps(currentArray, searchTarget);
    } else if (selectedAlgoId === 'bubble-sort') {
      return generateBubbleSortSteps(currentArray);
    } else if (selectedAlgoId === 'merge-sort') {
      return generateMergeSortSteps(currentArray);
    }
    return [];
  }, [selectedAlgoId, currentArray, searchTarget]);

  // Current active step
  const activeStep: AlgorithmStep = steps[currentStepIndex] || steps[0] || {
    stepIndex: 0,
    array: currentArray,
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    eliminatedIndices: [],
    foundIndex: null,
    pointers: [],
    pseudocodeLine: 1,
    pythonLine: 1,
    variables: {},
    message: 'Ready',
    explanation: 'Ready',
    actionType: 'init'
  };

  // Sound sync
  useEffect(() => {
    algoAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle switching algorithm
  const handleSelectAlgorithm = (algoId: AlgorithmId) => {
    setIsPlaying(false);
    setSelectedAlgoId(algoId);
    const def = ALGORITHMS[algoId];
    if (algoId === 'binary-search') {
      // Sort array for binary search
      setCurrentArray([...def.defaultArray].sort((a, b) => a - b));
    } else {
      setCurrentArray([...def.defaultArray]);
    }
    if (def.defaultTarget !== undefined) {
      setSearchTarget(def.defaultTarget);
    }
    setCurrentStepIndex(0);
    soundService.playMenuSelect();
  };

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(120, Math.floor(1000 / playbackSpeed));
      playTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            algoAudio.playSuccessChime();
            return prev;
          }
          const nextIndex = prev + 1;
          const nextStep = steps[nextIndex];
          if (nextStep) {
            if (nextStep.actionType === 'compare' && nextStep.comparingIndices.length > 0) {
              const val = nextStep.array[nextStep.comparingIndices[0]] || 40;
              algoAudio.playToneForValue(val);
            } else if (nextStep.actionType === 'swap') {
              algoAudio.playSwapTone();
            } else if (nextStep.actionType === 'found') {
              algoAudio.playSuccessChime();
            }
          }
          return nextIndex;
        });
      }, delay);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps]);

  // Resizer drag handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingPanel) return;
      const windowWidth = window.innerWidth;
      const newWidth = Math.min(740, Math.max(280, windowWidth - e.clientX));
      setCodePanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizingPanel) {
        setIsResizingPanel(false);
        try {
          localStorage.setItem('algo_lab_code_width', codePanelWidth.toString());
        } catch {}
      }
    };

    if (isResizingPanel) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingPanel, codePanelWidth]);

  // Stepping controls
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = steps[nextIndex];
      if (nextStep && nextStep.comparingIndices.length > 0) {
        const val = nextStep.array[nextStep.comparingIndices[0]] || 40;
        algoAudio.playToneForValue(val);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleJumpToEnd = () => {
    setIsPlaying(false);
    setCurrentStepIndex(steps.length - 1);
  };

  // Array generation actions
  const handleRandomizeArray = () => {
    setIsPlaying(false);
    const size = Math.floor(Math.random() * 4) + 8; // 8 to 11 items
    let newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    if (selectedAlgoId === 'binary-search') {
      newArr = Array.from(new Set(newArr)).sort((a, b) => a - b);
    }
    setCurrentArray(newArr);
    if (currentAlgo.category === 'search') {
      // Pick random target either in array or outside
      const inArray = Math.random() > 0.3;
      if (inArray && newArr.length > 0) {
        setSearchTarget(newArr[Math.floor(Math.random() * newArr.length)]);
      } else {
        setSearchTarget(Math.floor(Math.random() * 90) + 10);
      }
    }
    setCurrentStepIndex(0);
  };

  const handleSortArray = () => {
    setIsPlaying(false);
    const sorted = [...currentArray].sort((a, b) => a - b);
    setCurrentArray(sorted);
    setCurrentStepIndex(0);
  };

  const handleReverseArray = () => {
    setIsPlaying(false);
    const reversed = [...currentArray].sort((a, b) => b - a);
    setCurrentArray(reversed);
    setCurrentStepIndex(0);
  };

  const handleApplyCustomArray = () => {
    const parts = customArrayInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (parts.length >= 3 && parts.length <= 16) {
      let finalArr = parts;
      if (selectedAlgoId === 'binary-search') {
        finalArr = [...parts].sort((a, b) => a - b);
      }
      setCurrentArray(finalArr);
      setCurrentStepIndex(0);
      setShowCustomModal(false);
      soundService.playSuccess('cyberpunk-hud');
    }
  };

  const handleCopyCode = (text: string, type: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCodeType(type);
    setTimeout(() => setCopiedCodeType(null), 1800);
  };

  // Calculate maximum value in current array for proportional visual bar heights
  const maxArrayValue = useMemo(() => {
    return Math.max(...currentArray, 50);
  }, [currentArray]);

  // Quiz questions database
  const quizQuestions = useMemo(() => {
    return [
      {
        id: 'q1',
        algoId: 'linear-search',
        question: 'What is the worst-case number of comparisons for Linear Search on an array of length N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Linear search must examine every single element from 0 to N-1 if the target is at the very end or absent.'
      },
      {
        id: 'q2',
        algoId: 'binary-search',
        question: 'What mandatory prerequisite must an array satisfy before Binary Search can be executed?',
        options: ['Must contain only even numbers', 'Must be pre-sorted in ascending/descending order', 'Must have length that is a power of 2', 'Must contain no negative numbers'],
        correctIndex: 1,
        explanation: 'Binary search depends on knowing that elements to the left of midpoint are smaller and elements to the right are larger.'
      },
      {
        id: 'q3',
        algoId: 'binary-search',
        question: 'If low = 2 and high = 8, what will the next mid index calculated be?',
        options: ['mid = 4', 'mid = 5', 'mid = 6', 'mid = 3'],
        correctIndex: 1,
        explanation: 'mid = floor((low + high) / 2) = floor((2 + 8) / 2) = floor(10 / 2) = 5.'
      },
      {
        id: 'q4',
        algoId: 'bubble-sort',
        question: 'After the very first pass of Bubble Sort completes, which element is guaranteed to be in its correct place?',
        options: ['The smallest element at index 0', 'The largest element at index N-1', 'The median element at the middle', 'No element is guaranteed'],
        correctIndex: 1,
        explanation: 'During pass 1, adjacent swaps continually push the largest unsorted element all the way to the rightmost index (n-1).'
      },
      {
        id: 'q5',
        algoId: 'merge-sort',
        question: 'What is the time complexity of Merge Sort in the average and worst cases?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(log N)'],
        correctIndex: 1,
        explanation: 'Merge sort consistently divides in O(log N) levels and performs O(N) work to merge each level, yielding guaranteed O(N log N).'
      },
      {
        id: 'q6',
        algoId: 'linear-search',
        question: 'Why would an engineer ever choose Linear Search over Binary Search?',
        options: ['Linear Search uses less CPU instructions for 1 billion items', 'The collection is unsorted and sorting first would add unnecessary O(N log N) overhead', 'Linear Search is logarithmic while Binary is linear', 'Binary Search cannot find numbers greater than 100'],
        correctIndex: 1,
        explanation: 'If data is unsorted and you only need to search once or twice, linear search O(N) is much faster than sorting first O(N log N).'
      },
      {
        id: 'q7',
        algoId: 'merge-sort',
        question: 'What is the chief trade-off when using Merge Sort instead of Bubble Sort?',
        options: ['Merge Sort is slower on large arrays', 'Merge Sort requires O(N) auxiliary memory for buffer copies, while Bubble Sort is in-place O(1)', 'Merge Sort is unstable while Bubble Sort is stable', 'Merge Sort cannot sort negative integers'],
        correctIndex: 1,
        explanation: 'Merge sort is radically faster (O(N log N) vs O(N²)), but it requires extra memory buffers proportional to the array size O(N).'
      }
    ];
  }, []);

  const handleAnswerQuiz = (qId: string, selectedIdx: number, correctIdx: number, exp: string) => {
    if (answeredQuestionIds.includes(qId)) return;
    setAnsweredQuestionIds((prev) => [...prev, qId]);
    if (selectedIdx === correctIdx) {
      setQuizFeedback({ isCorrect: true, text: `Correct! ${exp}` });
      setQuizScore((prev) => prev + 1);
      soundService.playSuccess('cyberpunk-hud');
      onRewardCredits(25); // Award 25 credits to student!
    } else {
      setQuizFeedback({ isCorrect: false, text: `Not quite. ${exp}` });
    }
  };

  return (
    <div className="min-h-screen bg-[#05060e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* ======================================================== */}
      {/* TOP COMMAND HEADER */}
      {/* ======================================================== */}
      <header className="h-16 border-b border-slate-800/80 bg-[#070913]/90 backdrop-blur-md px-4 md:px-6 flex items-center justify-between z-30 shrink-0 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMain}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-mono transition-all group cursor-pointer shadow-sm"
            title="Return to Py-Quest Home"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
            <span className="hidden sm:inline font-semibold">Back to Home</span>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-base font-black tracking-tight text-white uppercase flex items-center gap-1.5 font-mono">
                  THE ALGORITHM LAB
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  INTERACTIVE ENGINE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Synchronized dual Pseudocode & Python 3 line-by-line algorithm visualizer
              </p>
            </div>
          </div>
        </div>

        {/* Center / Navigation Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setTopNavTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              topNavTab === 'simulator'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${topNavTab === 'simulator' ? 'text-black fill-current' : 'text-cyan-400'}`} />
            <span>Interactive Visualizer</span>
          </button>

          <button
            onClick={() => setTopNavTab('comparison')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              topNavTab === 'comparison'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Scale className={`w-3.5 h-3.5 ${topNavTab === 'comparison' ? 'text-white' : 'text-violet-400'}`} />
            <span>Pros, Cons & Comparison</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
              topNavTab === 'comparison' ? 'bg-black/30 text-white' : 'bg-violet-500/20 text-violet-300'
            }`}>
              Deep Dive
            </span>
          </button>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={soundEnabled ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Practice Quiz / Credits Button */}
          <button
            onClick={() => {
              setShowQuizModal(true);
              setQuizFeedback(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Skill Quiz</span>
            <span className="px-1.5 py-0.2 text-[9px] bg-amber-500/30 text-amber-200 rounded-md">
              +25 CR
            </span>
          </button>

          {/* Credits Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-amber-400 font-bold">⚡</span>
            <span>{currentCredits}</span>
            <span className="text-[9px] text-slate-500 uppercase">CR</span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* CONDITIONAL BODY: VISUAL SIMULATOR VS COMPARISON LAB */}
      {/* ======================================================== */}
      {topNavTab === 'comparison' ? (
        <AlgorithmComparisonTab
          onSelectAlgorithmForSimulator={(algoId) => {
            setSelectedAlgoId(algoId);
            setTopNavTab('simulator');
          }}
          onOpenQuiz={() => {
            setShowQuizModal(true);
            setQuizFeedback(null);
          }}
        />
      ) : (
        <>
          {/* ======================================================== */}
          {/* ALGORITHM SELECTOR TABS BAR */}
          {/* ======================================================== */}
          <div className="bg-[#090b17] border-b border-slate-800/80 px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
                ALGORITHM:
              </span>

              {(['linear-search', 'binary-search', 'bubble-sort', 'merge-sort'] as AlgorithmId[]).map((algoKey) => {
                const def = ALGORITHMS[algoKey];
                const isSelected = selectedAlgoId === algoKey;
                const isSearch = def.category === 'search';

                return (
                  <button
                    key={algoKey}
                    onClick={() => handleSelectAlgorithm(algoKey)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? isSearch
                          ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
                    }`}
                  >
                    {isSearch ? (
                      <Search className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-cyan-400'}`} />
                    ) : (
                      <ArrowUpDown className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                    )}
                    <span>{def.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded uppercase ${
                        isSelected
                          ? 'bg-black/20 text-black font-black'
                          : isSearch
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {def.timeComplexity.worst}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Complexity Badges on Right */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-slate-400">Time:</span>
                <span className="text-emerald-400 font-bold">{currentAlgo.timeComplexity.worst}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] text-slate-400">Space:</span>
                <span className="text-amber-300 font-bold">{currentAlgo.spaceComplexity}</span>
              </div>
            </div>
          </div>

      {/* ======================================================== */}
      {/* WORKSPACE ROW: VISUAL ANIMATION CANVAS (LEFT) + CODE (RIGHT) */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* ======================================================== */}
        {/* LEFT COLUMN: VISUAL SIMULATOR CANVAS */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col overflow-y-auto p-3 md:p-5 bg-gradient-to-b from-[#060812] to-[#04050a] min-w-0">
          {/* Active Action / Narrative Banner */}
          <div className="mb-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                  activeStep.actionType === 'found' || activeStep.actionType === 'sorted'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : activeStep.actionType === 'swap'
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
                    : activeStep.actionType === 'compare'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                }`}
              >
                {activeStep.actionType === 'found' || activeStep.actionType === 'sorted' ? (
                  <CheckCircle2 className="w-5 h-5 animate-bounce" />
                ) : activeStep.actionType === 'swap' ? (
                  <ArrowUpDown className="w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    STEP {currentStepIndex + 1} OF {steps.length}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.2 rounded-full ${
                      activeStep.actionType === 'found'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : activeStep.actionType === 'swap'
                        ? 'bg-pink-500/20 text-pink-300'
                        : activeStep.actionType === 'compare'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    {activeStep.actionType.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-white mt-0.5">
                  {activeStep.message}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeStep.explanation}
                </p>
              </div>
            </div>

            {/* Quick Target Indicator for Search Algorithms */}
            {currentAlgo.category === 'search' && (
              <div className="flex items-center gap-2 self-start md:self-center bg-[#070914] px-3 py-1.5 rounded-xl border border-cyan-500/30">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-mono text-slate-400">TARGET:</span>
                <span className="text-sm font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  {searchTarget}
                </span>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* ARRAY VISUALIZER DISPLAY BOARD */}
          {/* ======================================================== */}
          <div className="flex-1 bg-[#070914]/90 rounded-2xl border border-slate-800/90 p-4 md:p-6 flex flex-col justify-between items-center relative min-h-[340px] shadow-inner overflow-x-auto">
            {/* Background Grid Accent */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Top Pointers Layer (e.g. Low, High, Range) */}
            <div className="w-full flex justify-center items-end min-h-[36px] z-10 px-2">
              <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-4xl">
                {activeStep.array.map((_, idx) => {
                  const topPointers = activeStep.pointers.filter(
                    (p) => p.index === idx && p.position === 'top'
                  );
                  return (
                    <div key={`top-${idx}`} className="flex-1 flex flex-col items-center justify-end min-w-[36px] max-w-[68px]">
                      {topPointers.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className={`text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded-md mb-1 animate-pulse border ${
                            p.color === 'cyan'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                              : p.color === 'pink'
                              ? 'bg-pink-500/20 text-pink-300 border-pink-500/50'
                              : p.color === 'emerald'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                          }`}
                        >
                          {p.label}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bars & Numbers Visualization Row */}
            <div className="w-full flex justify-center items-end my-4 z-10 px-2 min-h-[180px]">
              <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-4xl h-[170px]">
                {activeStep.array.map((val, idx) => {
                  const isComparing = activeStep.comparingIndices.includes(idx);
                  const isSwapping = activeStep.swappingIndices.includes(idx);
                  const isSorted = activeStep.sortedIndices.includes(idx);
                  const isEliminated = activeStep.eliminatedIndices.includes(idx);
                  const isFound = activeStep.foundIndex === idx;

                  // Bar height proportional to value (from 35px to 140px)
                  const heightPercent = Math.max(22, Math.min(100, (val / maxArrayValue) * 100));
                  const barHeightPx = Math.floor(35 + (heightPercent / 100) * 105);

                  // Colors based on state
                  let cardBg = 'bg-slate-900/90 text-slate-100 border-slate-700/80';
                  let barBg = 'bg-slate-700/60';

                  if (isFound) {
                    cardBg = 'bg-emerald-500 text-black border-white shadow-[0_0_25px_rgba(16,185,129,0.8)] font-black scale-105';
                    barBg = 'bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]';
                  } else if (isSwapping) {
                    cardBg = 'bg-pink-500 text-white border-pink-300 shadow-[0_0_25px_rgba(236,72,153,0.8)] font-black scale-105 animate-pulse';
                    barBg = 'bg-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)]';
                  } else if (isComparing) {
                    cardBg = 'bg-amber-500 text-black border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.8)] font-black scale-105 animate-pulse';
                    barBg = 'bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]';
                  } else if (isSorted) {
                    cardBg = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
                    barBg = 'bg-emerald-600/70';
                  } else if (isEliminated) {
                    cardBg = 'bg-slate-950/40 text-slate-600 border-slate-800/40 opacity-40';
                    barBg = 'bg-slate-800/20';
                  }

                  return (
                    <motion.div
                      key={`element-${idx}`}
                      layout
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="flex-1 flex flex-col items-center justify-end min-w-[36px] max-w-[68px] h-full"
                    >
                      {/* Vertical Value Bar */}
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${barBg}`}
                        style={{ height: `${barHeightPx}px` }}
                      />

                      {/* Number Tile */}
                      <div
                        className={`w-full py-2 rounded-b-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-default select-none ${cardBg}`}
                      >
                        <span className="text-sm md:text-base font-mono font-bold">
                          {val}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Pointers & Indices Layer */}
            <div className="w-full flex flex-col justify-start items-center min-h-[50px] z-10 px-2">
              {/* Pointers row */}
              <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-4xl mb-1">
                {activeStep.array.map((_, idx) => {
                  const bottomPointers = activeStep.pointers.filter(
                    (p) => p.index === idx && p.position !== 'top'
                  );
                  return (
                    <div key={`bottom-${idx}`} className="flex-1 flex flex-col items-center justify-start min-w-[36px] max-w-[68px]">
                      {bottomPointers.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className={`text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded-md mb-1 animate-bounce border ${
                            p.color === 'emerald'
                              ? 'bg-emerald-500 text-black border-white'
                              : p.color === 'cyan'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                              : p.color === 'pink'
                              ? 'bg-pink-500/20 text-pink-300 border-pink-500/60'
                              : p.color === 'purple'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/60'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                          }`}
                        >
                          {p.label}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Index Labels row */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-4xl border-t border-slate-800/80 pt-1.5">
                {activeStep.array.map((_, idx) => (
                  <div
                    key={`idx-${idx}`}
                    className="flex-1 flex flex-col items-center justify-center min-w-[36px] max-w-[68px]"
                  >
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
                      [{idx}]
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Merge Sort Auxiliary Buffer Display */}
            {selectedAlgoId === 'merge-sort' && activeStep.auxiliaryArray && (
              <div className="w-full mt-3 p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col items-center z-10 animate-fade-in">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1.5">
                  AUXILIARY MERGE BUFFER (COLLECTING IN-ORDER)
                </span>
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {activeStep.auxiliaryArray.length === 0 ? (
                    <span className="text-xs text-slate-600 font-mono italic">Buffer empty; waiting for comparisons...</span>
                  ) : (
                    activeStep.auxiliaryArray.map((num, bIdx) => (
                      <div
                        key={bIdx}
                        className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs rounded-lg shadow-sm"
                      >
                        {num}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* PLAYBACK & STEP CONTROL DECK */}
          {/* ======================================================== */}
          <div className="mt-4 bg-[#090b17] border border-slate-800/90 rounded-2xl p-3 md:p-4 flex flex-col gap-3 shadow-lg">
            {/* Scrubber Progress Slider */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400 font-semibold w-14 shrink-0">
                STEP {currentStepIndex + 1}/{steps.length}
              </span>
              <input
                type="range"
                min={0}
                max={Math.max(0, steps.length - 1)}
                value={currentStepIndex}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentStepIndex(parseInt(e.target.value, 10));
                }}
                className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] font-mono text-cyan-400 font-bold w-12 text-right shrink-0">
                {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Stepping controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition-all cursor-pointer"
                  title="Reset to beginning"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleStepBackward}
                  disabled={currentStepIndex === 0}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    currentStepIndex === 0
                      ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 cursor-pointer'
                  }`}
                  title="Previous Step"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Main Play / Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-5 py-2 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer shadow-md ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-black" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-black" />
                      <span>{currentStepIndex >= steps.length - 1 ? 'REPLAY' : 'RUN LOGIC'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={currentStepIndex >= steps.length - 1}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    currentStepIndex >= steps.length - 1
                      ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 cursor-pointer'
                  }`}
                  title="Next Step"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                <span className="text-[9px] font-mono text-slate-500 px-1.5 uppercase">Speed:</span>
                {[0.5, 1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      playbackSpeed === spd
                        ? 'bg-cyan-500 text-black shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Array Generators */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={handleRandomizeArray}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono font-semibold transition-all cursor-pointer"
                  title="Generate new randomized dataset"
                >
                  <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Random</span>
                </button>

                <button
                  onClick={handleSortArray}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono font-semibold transition-all cursor-pointer"
                  title="Order array ascending"
                >
                  Sort
                </button>

                <button
                  onClick={handleReverseArray}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono font-semibold transition-all cursor-pointer"
                  title="Reverse array descending"
                >
                  Rev
                </button>

                <button
                  onClick={() => {
                    setCustomArrayInput(currentArray.join(', '));
                    setShowCustomModal(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                  title="Enter custom array numbers"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Custom</span>
                </button>
              </div>
            </div>

            {/* Target input row for Search algorithms */}
            {currentAlgo.category === 'search' && (
              <div className="border-t border-slate-800/80 pt-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Set Target Key:
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={searchTarget}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          setIsPlaying(false);
                          setSearchTarget(val);
                          setCurrentStepIndex(0);
                        }
                      }}
                      className="w-20 px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-500">Quick Pick:</span>
                  {currentArray.slice(0, 4).map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setIsPlaying(false);
                        setSearchTarget(val);
                        setCurrentStepIndex(0);
                      }}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-800 cursor-pointer"
                    >
                      {val}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setSearchTarget(999); // absent target
                      setCurrentStepIndex(0);
                    }}
                    className="px-2 py-0.5 rounded bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-[10px] font-mono border border-pink-500/30 cursor-pointer"
                    title="Test absent element case"
                  >
                    999 (Absent)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* DRAGGABLE RESIZE DIVIDER */}
        {/* ======================================================== */}
        <div
          onMouseDown={() => setIsResizingPanel(true)}
          className={`hidden lg:flex w-2.5 bg-[#090c18] hover:bg-cyan-500/30 border-x border-slate-800 items-center justify-center cursor-col-resize transition-colors select-none z-20 ${
            isResizingPanel ? 'bg-cyan-500/40 border-cyan-500' : ''
          }`}
          title="Drag left/right to adjust code panel width"
        >
          <GripVertical className="w-3.5 h-3.5 text-slate-600 hover:text-cyan-400" />
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: SYNCHRONIZED PSEUDOCODE & PYTHON VIEWS */}
        {/* ======================================================== */}
        <div
          style={{ width: `${codePanelWidth}px` }}
          className="w-full lg:w-auto shrink-0 flex flex-col border-t lg:border-t-0 border-slate-800 bg-[#070914] z-10"
        >
          {/* Code Panel Header & Tab Switcher */}
          <div className="p-3 border-b border-slate-800/80 bg-[#080b18] flex items-center justify-between gap-2 shrink-0">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setCodeViewTab('pseudocode')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  codeViewTab === 'pseudocode'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pseudocode
              </button>
              <button
                onClick={() => setCodeViewTab('python')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  codeViewTab === 'python'
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Python 3
              </button>
              <button
                onClick={() => setCodeViewTab('both')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  codeViewTab === 'both'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Split (Both)
              </button>
            </div>

            {/* Quick Presets & Font Controls */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5">
                <button
                  onClick={() => setCodeFontSize('small')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                    codeFontSize === 'small' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500'
                  }`}
                  title="Compact Font"
                >
                  A-
                </button>
                <button
                  onClick={() => setCodeFontSize('medium')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                    codeFontSize === 'medium' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500'
                  }`}
                  title="Default Font"
                >
                  A
                </button>
                <button
                  onClick={() => setCodeFontSize('large')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                    codeFontSize === 'large' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500'
                  }`}
                  title="Large Font"
                >
                  A+
                </button>
              </div>

              {/* Width Presets */}
              <div className="hidden sm:flex items-center gap-1">
                {[340, 440, 560].map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      setCodePanelWidth(w);
                      try {
                        localStorage.setItem('algo_lab_code_width', w.toString());
                      } catch {}
                    }}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono border cursor-pointer ${
                      codePanelWidth === w
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-950 text-slate-600 border-slate-800 hover:text-slate-400'
                    }`}
                  >
                    {w}px
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Panels Content Area */}
          <div className="flex-1 overflow-y-auto flex flex-col p-3 gap-3">
            {/* PSEUDOCODE CARD */}
            {(codeViewTab === 'pseudocode' || codeViewTab === 'both') && (
              <div className="flex-1 bg-[#05060d] border border-cyan-500/20 rounded-2xl overflow-hidden flex flex-col shadow-md min-h-[200px]">
                <div className="px-3.5 py-2 bg-cyan-950/20 border-b border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      Pseudocode Logic
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(currentAlgo.pseudocode.lines.join('\n'), 'pseudo')}
                    className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedCodeType === 'pseudo' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex-1 p-3 overflow-x-auto font-mono text-slate-300 select-text">
                  <pre
                    className={`leading-relaxed ${
                      codeFontSize === 'small'
                        ? 'text-[11px]'
                        : codeFontSize === 'large'
                        ? 'text-[13px]'
                        : 'text-xs'
                    }`}
                  >
                    {currentAlgo.pseudocode.lines.map((lineText, idx) => {
                      const lineNum = idx + 1;
                      const isActive = activeStep.pseudocodeLine === lineNum;

                      return (
                        <div
                          key={lineNum}
                          className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] font-bold'
                              : 'hover:bg-slate-900/60'
                          }`}
                        >
                          <span
                            className={`w-5 text-right text-[10px] select-none ${
                              isActive ? 'text-cyan-400 font-bold' : 'text-slate-600'
                            }`}
                          >
                            {lineNum}
                          </span>
                          <span className="flex-1">{lineText}</span>
                          {isActive && (
                            <span className="text-[9px] font-mono uppercase bg-cyan-500 text-black px-1.5 py-0.2 rounded font-black shrink-0">
                              EXEC
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            )}

            {/* PYTHON 3 CARD */}
            {(codeViewTab === 'python' || codeViewTab === 'both') && (
              <div className="flex-1 bg-[#05060d] border border-amber-500/20 rounded-2xl overflow-hidden flex flex-col shadow-md min-h-[200px]">
                <div className="px-3.5 py-2 bg-amber-950/20 border-b border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                      Python 3 Implementation
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(currentAlgo.python.lines.join('\n'), 'python')}
                    className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedCodeType === 'python' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex-1 p-3 overflow-x-auto font-mono text-slate-300 select-text">
                  <pre
                    className={`leading-relaxed ${
                      codeFontSize === 'small'
                        ? 'text-[11px]'
                        : codeFontSize === 'large'
                        ? 'text-[13px]'
                        : 'text-xs'
                    }`}
                  >
                    {currentAlgo.python.lines.map((lineText, idx) => {
                      const lineNum = idx + 1;
                      const isActive = activeStep.pythonLine === lineNum;

                      return (
                        <div
                          key={lineNum}
                          className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                            isActive
                              ? 'bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)] font-bold'
                              : 'hover:bg-slate-900/60'
                          }`}
                        >
                          <span
                            className={`w-5 text-right text-[10px] select-none ${
                              isActive ? 'text-amber-400 font-bold' : 'text-slate-600'
                            }`}
                          >
                            {lineNum}
                          </span>
                          <span className="flex-1">{lineText}</span>
                          {isActive && (
                            <span className="text-[9px] font-mono uppercase bg-amber-500 text-black px-1.5 py-0.2 rounded font-black shrink-0">
                              EXEC
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>
            )}

            {/* LIVE VARIABLE WATCH INSPECTOR */}
            <div className="bg-[#05060d] border border-slate-800 rounded-2xl p-3 shadow-md shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  Live Variables Inspector
                </span>
                <span className="text-[9px] font-mono text-slate-600">
                  Updated per step
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(activeStep.variables).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-2 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between"
                  >
                    <span className="text-slate-400 text-[11px] truncate">{key}:</span>
                    <span className="text-cyan-300 font-bold ml-1 truncate">
                      {typeof val === 'boolean' ? (val ? 'True' : 'False') : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* KEY ALGORITHM TAKEAWAYS */}
            <div className="bg-[#05060d] border border-slate-800 rounded-2xl p-3 shadow-md shrink-0">
              <div className="flex items-center gap-1.5 mb-2">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Key Insights
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {currentAlgo.keyInsights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-mono text-xs">▸</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )}

      {/* ======================================================== */}
      {/* CUSTOM ARRAY INPUT MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0d1d] border border-cyan-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <h3 className="text-base font-bold text-white uppercase font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Enter Custom Dataset
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter 3 to 16 comma-separated numbers (between 1 and 999).
              </p>

              <div className="mt-4">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Comma-Separated Numbers:
                </label>
                <input
                  type="text"
                  value={customArrayInput}
                  onChange={(e) => setCustomArrayInput(e.target.value)}
                  placeholder="e.g. 15, 42, 8, 99, 23, 70"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl font-mono text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {selectedAlgoId === 'binary-search' && (
                <div className="mt-2.5 p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[11px] font-mono text-cyan-300">
                  ℹ️ Binary Search requires sorted data. Your numbers will automatically be sorted in ascending order upon application.
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyCustomArray}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase cursor-pointer"
                >
                  Apply Dataset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* PRACTICE QUIZ / SKILL CHECK MODAL (+25 CREDITS) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showQuizModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#090c1a] border border-amber-500/40 rounded-3xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase font-mono">
                      Algorithm Knowledge Check
                    </h3>
                    <p className="text-xs text-slate-400">
                      Answer questions correctly to earn bonus credits for your CyberCoder terminal!
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                  Score: {quizScore} / {quizQuestions.length}
                </div>
              </div>

              {quizFeedback && (
                <div
                  className={`mt-4 p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                    quizFeedback.isCorrect
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-pink-500/15 border-pink-500/40 text-pink-300'
                  }`}
                >
                  {quizFeedback.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-pink-400" />
                  )}
                  <span>{quizFeedback.text}</span>
                </div>
              )}

              <div className="mt-5 space-y-6">
                {quizQuestions.map((q, idx) => {
                  const isAnswered = answeredQuestionIds.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                          Question {idx + 1} ({ALGORITHMS[q.algoId as AlgorithmId]?.name})
                        </span>
                        {isAnswered && (
                          <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-900 px-2 py-0.5 rounded-md">
                            Submitted
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-slate-200">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleAnswerQuiz(q.id, optIdx, q.correctIndex, q.explanation)}
                            className={`p-3 rounded-xl text-xs font-mono text-left transition-all border ${
                              isAnswered
                                ? optIdx === q.correctIndex
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-slate-950 text-slate-600 border-slate-900'
                                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 cursor-pointer hover:border-cyan-500/40'
                            }`}
                          >
                            <span className="text-slate-500 mr-2 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowQuizModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase cursor-pointer shadow-md"
                >
                  Return to Simulator
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlgorithmLab;
