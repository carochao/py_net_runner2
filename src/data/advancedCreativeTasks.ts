import { CreativeTask } from '../components/CreativeChallenges';

export const ADVANCED_CREATIVE_TASKS: CreativeTask[] = [
  {
    id: 'adv-caesar-cipher',
    title: 'Caesar Cipher Cryptographic Engine',
    subtitle: 'Encode and decode secret transmissions using modular shifts',
    difficulty: 'Hard',
    creditsReward: 450,
    description: `### Objective: Build a Classical Cryptographic Transcoder
The Caesar Cipher is one of the oldest encryption algorithms in history. Each letter in the plaintext is shifted a fixed number of positions down the alphabet.

**Challenge Requirements:**
1. Define a function \`encrypt_caesar(text, shift)\` that shifts each letter in \`text\` by \`shift\` positions.
2. Support both uppercase and lowercase letters (e.g. with shift 3, 'A' becomes 'D', 'z' becomes 'c').
3. Non-alphabet characters (spaces, underscores, digits, punctuation) should remain unchanged.
4. Demonstrate your function by encrypting the message \`"CYBER_PROTOCOL_DELTA_9"\` with a shift of 4, then printing both the original and encrypted strings.

**Tip:** You can use \`alphabet = "abcdefghijklmnopqrstuvwxyz"\` with indexing and modulo \`% 26\`, or Python's \`ord()\` and \`chr()\` built-ins.`,
    initialCode: `# ADVANCED LAB 01: Caesar Cipher Engine
# Build a function that shifts letters along the alphabet:

def encrypt_caesar(text, shift):
    result = ""
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    for char in text:
        is_upper = char.isupper()
        lower_char = char.lower()
        if lower_char in alphabet:
            idx = alphabet.index(lower_char)
            new_idx = (idx + shift) % 26
            new_char = alphabet[new_idx]
            result += new_char.upper() if is_upper else new_char
        else:
            result += char
            
    return result

# Test run:
secret = "CYBER_PROTOCOL_DELTA_9"
cipher = encrypt_caesar(secret, 4)
print("Original:", secret)
print("Encrypted:", cipher)
`,
    solutionRegex: [
      `def\\s+encrypt_caesar|def\\s+\\w+caesar`,
      `print\\s*\\(`
    ],
    solutionHint: `Define a function taking text and shift amount. Loop through each character, find its position in the alphabet, add shift % 26, preserve casing, and print the output.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-binary-search',
    title: 'Binary Search Core Algorithm',
    subtitle: 'Locate targets in O(log n) time complexity with pointer telemetry',
    difficulty: 'Hard',
    creditsReward: 500,
    description: `### Objective: Implement Divide-and-Conquer Binary Search
Linear search checks elements one-by-one (O(n)), but Binary Search on a sorted array cuts the search range in half on every comparison (O(log n)).

**Challenge Requirements:**
1. Given a sorted list of numbers, write a function \`binary_search(arr, target)\`.
2. Maintain two pointers: \`low = 0\` and \`high = len(arr) - 1\`.
3. In a \`while low <= high:\` loop, calculate \`mid = (low + high) // 2\`.
4. Output telemetry logs for each step showing \`low\`, \`mid\`, and \`high\`.
5. Return the index of \`target\` if found, or \`-1\` if not present.
6. Test your function with target \`67\` and target \`40\` on the provided list.`,
    initialCode: `# ADVANCED LAB 02: Binary Search Algorithm
# Implement divide-and-conquer search on a sorted collection:

def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    step = 1
    
    while low <= high:
        mid = (low + high) // 2
        print(f"Step {step}: low={low}, mid={mid}, high={high}, val={arr[mid]}")
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
        step += 1
        
    return -1

numbers = [3, 8, 15, 24, 39, 52, 67, 81, 95, 110]
print("Sorted Array:", numbers)

target = 67
index = binary_search(numbers, target)
print(f"Target {target} found at index: {index}")
`,
    solutionRegex: [
      `def\\s+binary_search|while\\s+low\\s*<=|while\\s+.*<.*high`,
      `print\\s*\\(`
    ],
    solutionHint: `Keep low and high pointers. While low <= high, compute mid = (low + high) // 2. If arr[mid] == target return mid; else adjust low = mid + 1 or high = mid - 1.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-prime-sieve',
    title: 'Prime Factorization Matrix',
    subtitle: 'Deconstruct complex integers into foundational prime building blocks',
    difficulty: 'Hard',
    creditsReward: 480,
    description: `### Objective: Compute Prime Factors of Integers
Every composite number can be uniquely factored into a product of primes (The Fundamental Theorem of Arithmetic).

**Challenge Requirements:**
1. Write a function \`prime_factors(n)\` that returns a list of all prime factors of \`n\` in ascending order.
2. For example, \`prime_factors(84)\` should return \`[2, 2, 3, 7]\` because \`2 * 2 * 3 * 7 = 84\`.
3. Check factor 2 first, then test odd numbers \`3, 5, 7, ...\` up to \`int(n ** 0.5) + 1\`.
4. Run tests for \`84\`, \`180\`, and \`360\`, printing their prime representations.`,
    initialCode: `# ADVANCED LAB 03: Prime Factorization
# Write a function that decomposes an integer into prime factors:

def prime_factors(n):
    factors = []
    # Extract factor 2
    while n % 2 == 0:
        factors.append(2)
        n = n // 2
        
    # Extract odd factors
    d = 3
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n = n // d
        d += 2
        
    if n > 1:
        factors.append(n)
        
    return factors

test_numbers = [84, 180, 360]
for num in test_numbers:
    decomp = prime_factors(num)
    equation = " * ".join(str(f) for f in decomp)
    print(f"{num} = {equation}")
`,
    solutionRegex: [
      `def\\s+prime_factors|while\\s+.*%`,
      `print\\s*\\(`
    ],
    solutionHint: `While n is divisible by a factor d, append d to factors and divide n by d. Start with d=2, then test odd numbers. If n > 1 at the end, append n.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-bracket-validator',
    title: 'Syntax Token & Bracket Validator',
    subtitle: 'Build a compiler stack parser to verify balanced enclosures',
    difficulty: 'Expert',
    creditsReward: 600,
    description: `### Objective: Stack-Based Syntax Parsing
Code compilers and interpreters must verify that parentheses \`()\`, brackets \`[]\`, and braces \`{}\` are properly matched and closed in the correct nesting order.

**Challenge Requirements:**
1. Write a function \`is_balanced(expression)\` that returns \`True\` if all brackets in the string are properly balanced, and \`False\` otherwise.
2. Use a Python list as a **LIFO Stack** (Last-In, First-Out).
3. When you encounter an opening bracket (\`(\`, \`[\`, \`{\`), push it onto the stack.
4. When you encounter a closing bracket (\`)\`, \`]\`, \`}\`), check if the stack is non-empty and if the top of the stack matches the expected opener. If not, return \`False\`.
5. At the end of the string, the stack must be empty for the expression to be balanced.
6. Test your validator on both valid strings (e.g. \`"{[()()]}"\`) and invalid strings (e.g. \`"{[(])}"\`).`,
    initialCode: `# ADVANCED LAB 04: Bracket Balance Parser
# Use a Stack data structure to validate paired syntax tokens:

def is_balanced(expr):
    stack = []
    matching = {')': '(', ']': '[', '}': '{'}
    
    for char in expr:
        if char in "([{":
            stack.append(char)
        elif char in ")]}":
            if not stack:
                return False
            top = stack.pop()
            if top != matching[char]:
                return False
                
    return len(stack) == 0

test_cases = [
    "{ [ ( ) ( ) ] }",
    "def calculate(x, y): return [x + y, {x: y}]",
    "{ [ ( ] ) }",
    "((())",
    "([]{})"
]

for test in test_cases:
    valid = is_balanced(test)
    status = "BALANCED" if valid else "UNBALANCED"
    print(f"[{status}] -> {test}")
`,
    solutionRegex: [
      `def\\s+is_balanced|stack\\s*=\\s*\\[\\]`,
      `print\\s*\\(`
    ],
    solutionHint: `Maintain a stack list. For every char in expr: if char is an opener, push to stack. If char is a closer: pop from stack and check if matching. At the end, return len(stack) == 0.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-frequency-analyzer',
    title: 'Text Telemetry & Frequency Histogram',
    subtitle: 'Parse raw text streams and generate ranked frequency analytics',
    difficulty: 'Hard',
    creditsReward: 520,
    description: `### Objective: Natural Language Word Frequency Engine
In data science and natural language processing (NLP), analyzing word distributions reveals key topics, author style, and sentiment.

**Challenge Requirements:**
1. Take a sample paragraph of text.
2. Clean the text: convert to lowercase and remove punctuation marks (such as \`.\`, \`,\`, \`!\`, \`?\`).
3. Split the text into individual words.
4. Count the occurrences of each word using a dictionary.
5. Identify the top 3 most frequent words.
6. Print a formatted ASCII bar chart (e.g. \`word: ████ (count)\`) showing the word frequencies.`,
    initialCode: `# ADVANCED LAB 05: Frequency Histogram Engine
# Clean raw text, tabulate word counts, and render ASCII histogram bars:

text = """Python is a high-level general-purpose programming language. 
Python emphasizes code readability with use of significant indentation. 
Python is dynamically typed and garbage-collected."""

# 1. Clean and tokenize
clean_text = ""
for char in text.lower():
    if char.isalnum() or char.isspace():
        clean_text += char
    else:
        clean_text += " "

words = clean_text.split()

# 2. Count word frequencies
freq = {}
for w in words:
    freq[w] = freq.get(w, 0) + 1

# 3. Sort by count in descending order
sorted_words = sorted(freq.items(), key=lambda item: item[1], reverse=True)

print("--- WORD FREQUENCY TELEMETRY ---")
for word, count in sorted_words[:6]:
    bar = "█" * count
    print(f"{word.ljust(15)}: {bar} ({count})")
`,
    solutionRegex: [
      `freq\\s*=\\s*\\{}|freq\\[w\\]|split\\s*\\(`,
      `print\\s*\\(`
    ],
    solutionHint: `Clean punctuation using isalnum(), split into words, tally counts in a dictionary with freq[w] = freq.get(w, 0) + 1, then sort items and print histogram bars.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-inventory-ledger',
    title: 'OOP Inventory & Transaction Ledger',
    subtitle: 'Construct modular classes with state encapsulation and audit logs',
    difficulty: 'Expert',
    creditsReward: 650,
    description: `### Objective: Real-World OOP & State Protection 📦
In real-world software—like Amazon, Shopify, or an RPG game store—items aren't just loose numbers floating around. Each item is an **Object** bundled with its own name, price, stock, and rules!

**Why use OOP here? (The Power of Encapsulation)**
If you just used loose variables, any line of code could accidentally set \`stock = -5\` or sell an item that doesn't exist. By packaging an item inside a **\`Product\` class**, the object guards its own data:
- Only the \`purchase()\` method can reduce stock—and it checks first if enough items exist!
- Only the \`restock()\` method can increase stock.

**Step-by-Step Requirements:**
1. **Define the \`Product\` blueprint**:
   - In \`__init__(self, name, price, stock)\`, store all three values in \`self.name\`, \`self.price\`, and \`self.stock\`.
2. **Add behavior methods**:
   - \`purchase(self, qty)\`: If \`qty <= self.stock\`, deduct \`qty\` from \`self.stock\`, calculate \`total = qty * self.price\`, print a receipt, and return \`total\`. If stock is too low, print an alert and return \`None\`.
   - \`restock(self, qty)\`: Increase \`self.stock\` by \`qty\` and print an update.
   - \`get_summary(self)\`: Return a clean, formatted string showing the name, price, and current stock.
3. **Run your shop simulation**:
   - Create 3 product instances in an inventory list.
   - Print the initial shop catalogue using \`get_summary()\`.
   - Test a successful purchase, an invalid purchase (ordering too many), a restock, and re-purchasing!`,
    initialCode: `# ADVANCED LAB 06: OOP Inventory Ledger
# Create a class to encapsulate product records, stock, and transactions:

class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def purchase(self, qty):
        if qty <= self.stock:
            self.stock -= qty
            total = qty * self.price
            print(f"Purchased {qty}x {self.name} for USD {total:.2f}. Remaining: {self.stock}")
            return total
        else:
            print(f"FAILED: Insufficient stock for {self.name}! Requested {qty}, available: {self.stock}")
            return None

    def restock(self, qty):
        self.stock += qty
        print(f"Restocked +{qty} units of {self.name}. Current stock: {self.stock}")

    def get_summary(self):
        return f"{self.name.ljust(18)} | Price: USD {self.price:>6.2f} | Stock: {self.stock}"

# Initialize inventory
inventory = [
    Product("Cyber Deck", 499.99, 5),
    Product("Neural Jack", 89.50, 12),
    Product("Quantum Core", 1250.00, 2)
]

print("--- INITIAL INVENTORY ---")
for p in inventory:
    print(p.get_summary())

print("\n--- TRANSACTIONS ---")
inventory[0].purchase(2)
inventory[2].purchase(3)  # Should fail
inventory[2].restock(5)
inventory[2].purchase(3)  # Should succeed now
`,
    solutionRegex: [
      `class\\s+Product|def\\s+__init__`,
      `print\\s*\\(`
    ],
    solutionHint: `Define class Product with __init__(self, name, price, stock). Add methods purchase(self, qty) and restock(self, qty) with stock boundary checks.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-palindrome-anagram',
    title: 'Palindrome & Anagram Decoupler',
    subtitle: 'Verify phrase symmetry and character permutations with normalization',
    difficulty: 'Hard',
    creditsReward: 460,
    description: `### Objective: Advanced String Normalization & Permutation Checks
A **palindrome** is identical forwards and backwards (e.g. "A man, a plan, a canal: Panama!"). An **anagram** contains the exact same characters in a different order (e.g. "listen" and "silent").

**Challenge Requirements:**
1. Write \`is_palindrome(s)\`: Normalize \`s\` by lowercasing and keeping only alphanumeric characters. Check if \`normalized == normalized[::-1]\`.
2. Write \`are_anagrams(s1, s2)\`: Clean both strings and check if their sorted characters are identical (\`sorted(clean1) == sorted(clean2)\`).
3. Test \`is_palindrome\` on phrases with spaces and punctuation.
4. Test \`are_anagrams\` on paired test words.
5. Print clear, formatted diagnostic verdicts.`,
    initialCode: `# ADVANCED LAB 07: Palindromes and Anagrams
# Write string analysis functions with normalization:

def is_palindrome(text):
    # Keep only letters and digits, lowercase
    clean = "".join(ch.lower() for ch in text if ch.isalnum())
    return clean == clean[::-1]

def are_anagrams(s1, s2):
    c1 = "".join(sorted(ch.lower() for ch in s1 if ch.isalnum()))
    c2 = "".join(sorted(ch.lower() for ch in s2 if ch.isalnum()))
    return c1 == c2

# Test Palindromes
phrases = [
    "A man, a plan, a canal: Panama!",
    "No lemon, no melon",
    "Python Programming"
]

print("--- PALINDROME ANALYSIS ---")
for p in phrases:
    print(f"'{p}' -> {is_palindrome(p)}")

# Test Anagrams
pairs = [
    ("listen", "silent"),
    ("Astronomer", "Moon starer"),
    ("cyber", "robot")
]

print("\n--- ANAGRAM ANALYSIS ---")
for w1, w2 in pairs:
    print(f"'{w1}' & '{w2}' -> {are_anagrams(w1, w2)}")
`,
    solutionRegex: [
      `def\\s+is_palindrome|def\\s+are_anagrams`,
      `print\\s*\\(`
    ],
    solutionHint: `Normalize strings by stripping punctuation and lowercasing. Check palindrome with clean == clean[::-1]. Check anagram with sorted(clean1) == sorted(clean2).`,
    expectedInputCount: 0
  },
  {
    id: 'adv-bubble-sort-visualizer',
    title: 'Bubble Sort with Telemetry & Pass Metrics',
    subtitle: 'Implement an in-place sorting pass from scratch with swap counters',
    difficulty: 'Hard',
    creditsReward: 500,
    description: `### Objective: In-Place Comparison Sorting
Understanding how basic sorting algorithms work under the hood is fundamental to algorithmic thinking.

**Challenge Requirements:**
1. Write a function \`bubble_sort(arr)\` that sorts an array in-place without using Python's \`.sort()\` or \`sorted()\`.
2. Use nested loops: the outer loop runs \`len(arr)\` times, the inner loop compares adjacent elements \`arr[j]\` and \`arr[j+1]\`.
3. If \`arr[j] > arr[j+1]\`, swap them: \`arr[j], arr[j+1] = arr[j+1], arr[j]\`.
4. Include an early-exit optimization: if no swaps occur during a pass, the array is already sorted!
5. Count and print total comparisons and swaps, as well as the list state after each pass.`,
    initialCode: `# ADVANCED LAB 08: Bubble Sort Telemetry
# Implement sorting without built-in functions, measuring comparisons:

def bubble_sort(arr):
    data = list(arr)  # Copy array
    n = len(data)
    total_swaps = 0
    total_comparisons = 0
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            total_comparisons += 1
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]
                total_swaps += 1
                swapped = True
                
        print(f"Pass {i + 1}: {data}")
        if not swapped:
            print("Array fully sorted early!")
            break
            
    print(f"Metrics: {total_comparisons} comparisons, {total_swaps} swaps.")
    return data

unsorted_data = [64, 34, 25, 12, 22, 11, 90]
print("Original:", unsorted_data)
sorted_result = bubble_sort(unsorted_data)
print("Sorted Result:", sorted_result)
`,
    solutionRegex: [
      `def\\s+bubble_sort|for\\s+.*in\\s+range.*:`,
      `print\\s*\\(`
    ],
    solutionHint: `Loop i from 0 to n, and j from 0 to n - i - 1. If data[j] > data[j+1], swap them with data[j], data[j+1] = data[j+1], data[j]. Track swaps to break early when finished.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-fibonacci-matrix',
    title: 'Fibonacci Sequence & Golden Ratio Convergence',
    subtitle: 'Compute dynamic growth sequences and calculate mathematical constants',
    difficulty: 'Hard',
    creditsReward: 540,
    description: `### Objective: Recurrence Relations & Convergence
The Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, 21...) appears everywhere in nature, computer science, and geometry. The ratio between consecutive Fibonacci numbers converges to the Golden Ratio (phi ≈ 1.6180339887).

**Challenge Requirements:**
1. Write a function \`generate_fibonacci(n)\` that generates the first \`n\` Fibonacci numbers in a list.
2. For each term starting from index 2, calculate the ratio: \`F(i) / F(i-1)\`.
3. Print each term alongside its consecutive ratio formatted to 6 decimal places.
4. Calculate the absolute error between the final ratio and the true Golden Ratio \`1.6180339887\`.`,
    initialCode: `# ADVANCED LAB 09: Fibonacci & The Golden Ratio
# Generate terms and track convergence towards phi (1.6180339):

def generate_fibonacci(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
        
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib

PHI = 1.6180339887
n_terms = 15
terms = generate_fibonacci(n_terms)

print(f"Generated {n_terms} Fibonacci Terms:")
print(terms)

print("\n--- RATIO CONVERGENCE (F_n / F_{n-1}) ---")
for i in range(2, len(terms)):
    ratio = terms[i] / terms[i - 1]
    diff = abs(ratio - PHI)
    print(f"F({i:2d})={terms[i]:<4d} / F({i-1:2d})={terms[i-1]:<4d} = {ratio:.6f}  (diff: {diff:.6f})")
`,
    solutionRegex: [
      `def\\s+generate_fibonacci|fib\\.append|while\\s+len\\(fib\\)`,
      `print\\s*\\(`
    ],
    solutionHint: `Start with fib = [0, 1]. In a loop while len(fib) < n, append fib[-1] + fib[-2]. Then loop from index 2 upwards to calculate terms[i] / terms[i-1].`,
    expectedInputCount: 0
  },
  {
    id: 'adv-roman-converter',
    title: 'Roman Numeral Encoder & Decoder',
    subtitle: 'Translate standard integers to classical Latin numeral systems',
    difficulty: 'Expert',
    creditsReward: 620,
    description: `### Objective: Greedy Value Mapping
Roman numerals use letters to represent fixed values (M=1000, D=500, C=100, L=50, X=10, V=5, I=1) with subtractive notation (CM=900, CD=400, XC=90, XL=40, IX=9, IV=4).

**Challenge Requirements:**
1. Write a function \`to_roman(num)\` that converts any integer from 1 to 3999 into its Roman Numeral string.
2. Use an ordered list of tuples mapping integer thresholds to their corresponding Roman string symbols.
3. Subtract greedily from \`num\` while \`num >= value\`, appending the symbol to the result.
4. Convert and test numbers like \`1994\` ("MCMXCIV"), \`2024\` ("MMXXIV"), \`44\` ("XLIV"), and \`3999\` ("MMMCMXCIX").`,
    initialCode: `# ADVANCED LAB 10: Roman Numeral Encoder
# Use ordered greedy threshold subtraction to generate Roman Numerals:

def to_roman(num):
    # Ordered mapping from largest to smallest
    val_map = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"),
        (1, "I")
    ]
    
    roman = ""
    for val, symbol in val_map:
        while num >= val:
            roman += symbol
            num -= val
            
    return roman

test_values = [4, 44, 99, 400, 1994, 2024, 3999]
for val in test_values:
    res = to_roman(val)
    print(f"{val:>4} -> {res}")
`,
    solutionRegex: [
      `def\\s+to_roman|for\\s+val,\\s*symbol|while\\s+num\\s*>=`,
      `print\\s*\\(`
    ],
    solutionHint: `Define a list of (value, symbol) tuples descending from 1000 to 1 including subtractive forms like 900 ("CM"). While num >= val, append symbol and subtract val.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-rle-compression',
    title: 'Run-Length Encoding (RLE) Data Compressor',
    subtitle: 'Implement lossless stream compression and decompression pipelines',
    difficulty: 'Hard',
    creditsReward: 520,
    description: `### Objective: Lossless Data Compression
Run-Length Encoding (RLE) is an intuitive data compression technique where runs of repeating consecutive data elements are stored as a single data value and count.

**Challenge Requirements:**
1. Write \`compress_rle(data)\`: Converts \`"AAAAABBBCCDAA"\` into \`"5A3B2C1D2A"\`.
2. Write \`decompress_rle(compressed)\`: Reconstitutes \`"5A3B2C1D2A"\` back to \`"AAAAABBBCCDAA"\`.
3. Calculate the compression ratio: \`(len(compressed) / len(original)) * 100%\`.
4. Validate that \`decompress_rle(compress_rle(data)) == data\` (lossless roundtrip guarantee).`,
    initialCode: `# ADVANCED LAB 11: Run-Length Compression Engine
# Build encoder and decoder for repeating data streams:

def compress_rle(text):
    if not text:
        return ""
    encoded = ""
    count = 1
    
    for i in range(1, len(text)):
        if text[i] == text[i - 1]:
            count += 1
        else:
            encoded += f"{count}{text[i - 1]}"
            count = 1
    encoded += f"{count}{text[-1]}"
    return encoded

def decompress_rle(encoded):
    decoded = ""
    count_str = ""
    for char in encoded:
        if char.isdigit():
            count_str += char
        else:
            count = int(count_str) if count_str else 1
            decoded += char * count
            count_str = ""
    return decoded

# Test pipeline
raw_data = "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB"
compressed = compress_rle(raw_data)
restored = decompress_rle(compressed)

print("Original length  :", len(raw_data))
print("Compressed length:", len(compressed))
print("Compressed text  :", compressed)
print("Restored matches :", restored == raw_data)
ratio = (len(compressed) / len(raw_data)) * 100
print(f"Compressed size is {ratio:.1f}% of original size")
`,
    solutionRegex: [
      `def\\s+compress_rle|def\\s+decompress_rle`,
      `print\\s*\\(`
    ],
    solutionHint: `Iterate through characters tracking count of repeats. When char changes, append str(count) + previous_char and reset count. For decoding, parse digits as multiplier.`,
    expectedInputCount: 0
  },
  {
    id: 'adv-matrix-rotation',
    title: '2D Matrix Transposition & Grid Rotation',
    subtitle: 'Manipulate coordinate geometry and perform 90-degree matrix rotations',
    difficulty: 'Expert',
    creditsReward: 650,
    description: `### Objective: 2D Array Transformations & Graphics Math
In graphics programming, image processing, and game engines, 2D grids must frequently be transposed and rotated in memory.

**Challenge Requirements:**
1. Given an N x N matrix (2D list):
   \`\`\`python
   matrix = [
       [1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]
   ]
   \`\`\`
2. Write a function \`rotate_90_clockwise(matrix)\` that rotates the grid 90 degrees clockwise.
3. (Math insight: Rotating 90° clockwise is equivalent to transposing the matrix (\`swap row and column: [r][c] -> [c][r]\`), then reversing each row!).
4. Write a helper \`print_matrix(mat, title)\` that renders the grid cleanly in row/column format.
5. Demonstrate rotating the matrix 90°, 180°, and 270°.`,
    initialCode: `# ADVANCED LAB 12: 2D Matrix Rotation Engine
# Rotate a square grid 90 degrees clockwise:

def rotate_90_clockwise(mat):
    n = len(mat)
    # Step 1: Transpose matrix (swap rows and columns)
    transposed = [[mat[c][r] for c in range(n)] for r in range(n)]
    
    # Step 2: Reverse each row
    rotated = [row[::-1] for row in transposed]
    return rotated

def print_matrix(mat, title):
    print(f"--- {title} ---")
    for row in mat:
        print("  " + "  ".join(f"{val:>2}" for val in row))

# Initial 3x3 Grid
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print_matrix(grid, "ORIGINAL 3x3")
rot1 = rotate_90_clockwise(grid)
print_matrix(rot1, "ROTATED 90° CLOCKWISE")
rot2 = rotate_90_clockwise(rot1)
print_matrix(rot2, "ROTATED 180° CLOCKWISE")
`,
    solutionRegex: [
      `def\\s+rotate_90_clockwise|def\\s+print_matrix`,
      `print\\s*\\(`
    ],
    solutionHint: `To rotate 90 degrees clockwise: transpose the matrix (swap mat[r][c] with mat[c][r]), then reverse each individual row (row[::-1]).`,
    expectedInputCount: 0
  }
];
