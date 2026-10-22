"""Algorithm Design & Implementation (24CSE0317) — ST-1: Units 1-5 (60% of the syllabus)."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Time & Space Complexity — Counting Work in Iterative Code",
    "Unit 1 · Big-O, Θ, Ω and how to read a loop",
    r"""
<p>Complexity answers one question: <strong>how does the work grow when the input grows?</strong>
We ignore constants and machine speed and look only at the growth rate. This is 7% of the syllabus by weight
but it appears inside almost every other question ("what is the complexity of your solution?").</p>

<h3>1. The three notations</h3>
<table>
  <thead><tr><th>Notation</th><th>Meaning</th><th>Read it as</th></tr></thead>
  <tbody>
    <tr><td><strong>O(g(n))</strong></td><td>f(n) ≤ c·g(n) for large n</td><td>upper bound — "at most this fast-growing"</td></tr>
    <tr><td><strong>Ω(g(n))</strong></td><td>f(n) ≥ c·g(n) for large n</td><td>lower bound — "at least"</td></tr>
    <tr><td><strong>Θ(g(n))</strong></td><td>both O and Ω</td><td>tight bound — "exactly this growth"</td></tr>
  </tbody>
</table>
<p>Best, average and worst case are a <em>different</em> axis: linear search is Ω(1) in its best case
(key at index 0) and O(n) in its worst case. In exams, "complexity" without qualification means worst case.</p>

<h3>2. The growth ladder — memorise the order</h3>
<p><strong>1 &lt; log n &lt; √n &lt; n &lt; n log n &lt; n² &lt; n³ &lt; 2ⁿ &lt; n!</strong></p>
<table>
  <thead><tr><th>n</th><th>log₂ n</th><th>n log n</th><th>n²</th><th>2ⁿ</th></tr></thead>
  <tbody>
    <tr><td>10</td><td>3.3</td><td>33</td><td>100</td><td>1,024</td></tr>
    <tr><td>1,000</td><td>10</td><td>10,000</td><td>10⁶</td><td>astronomical</td></tr>
    <tr><td>10⁶</td><td>20</td><td>2×10⁷</td><td>10¹²</td><td>—</td></tr>
  </tbody>
</table>
<div class="callout callout-key">
  <strong>Judge rule of thumb:</strong> an online judge (Test Pad, LeetCode) runs about <strong>10⁸ simple operations per second</strong>.
  n = 10⁵ → you need O(n log n) or better; n ≤ 5000 → O(n²) is fine; n ≤ 20 → even O(2ⁿ) passes.
</div>

<h3>3. Rules for reading iterative code</h3>
<ul>
  <li><strong>Sequential blocks add</strong>, and the biggest term wins: O(n) + O(n²) = O(n²).</li>
  <li><strong>Nested loops multiply</strong> when the inner bound does not depend on the outer variable.</li>
  <li><strong>A loop that multiplies or divides</strong> its counter by a constant runs O(log n) times.</li>
  <li>Drop constants and lower-order terms: 3n² + 5n + 7 → O(n²).</li>
</ul>

<pre><code class="language-java">// (a) O(n)
for (int i = 0; i < n; i++) sum += a[i];

// (b) O(n²) — inner loop runs n, n-1, ..., 1 times → n(n+1)/2
for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++) count++;

// (c) O(log n) — i doubles: 1, 2, 4, ... until i >= n
for (int i = 1; i < n; i *= 2) steps++;

// (d) O(n log n) — outer n times, inner log n times
for (int i = 0; i < n; i++)
    for (int j = 1; j < n; j *= 2) work++;

// (e) O(√n) — stops when i*i exceeds n
for (int i = 1; i * i <= n; i++) if (n % i == 0) divisors++;</code></pre>

<h3>4. The trap: loops whose inner bound shrinks</h3>
<pre><code class="language-java">for (int i = n; i > 0; i /= 2)      // runs log n times
    for (int j = 0; j < i; j++)     // runs i times
        ops++;</code></pre>
<p>Total = n + n/2 + n/4 + … + 1 ≤ <strong>2n</strong>, so this is <strong>O(n)</strong>, not O(n log n). A geometric series
is dominated by its largest term.</p>

<h3>5. Space complexity</h3>
<p>Count the <em>extra</em> memory your algorithm allocates (auxiliary space), not the input itself.</p>
<table>
  <thead><tr><th>Code does</th><th>Auxiliary space</th></tr></thead>
  <tbody>
    <tr><td>a few int variables</td><td>O(1)</td></tr>
    <tr><td>a new array of size n, a HashMap of n entries</td><td>O(n)</td></tr>
    <tr><td>an n × m DP table</td><td>O(n·m)</td></tr>
    <tr><td>recursion that goes d levels deep</td><td>O(d) for the call stack</td></tr>
  </tbody>
</table>
"""
    + check("What is the time complexity of: <code>for (int i = 1; i < n; i = i * 3)</code>?",
            ["O(n)", "O(n/3)", "O(log n)", "O(√n)"], "c",
            "The counter is multiplied by 3 each step, so it reaches n after log₃ n steps, which is O(log n).")
    + check("Two separate (not nested) loops each run n times, followed by a loop that runs n² times. Overall?",
            ["O(n³)", "O(n²)", "O(2n + n²) and it cannot be simplified", "O(n)"], "b",
            "Sequential parts add: 2n + n². Keep the dominant term: O(n²).")
))

TOPICS.append(topic(
    "Recursive Complexity — Recurrences, Recursion Trees & the Master Theorem",
    "Unit 1 · analysing code that calls itself",
    r"""
<p>For recursive code you write a <strong>recurrence</strong>: the cost for input n in terms of the cost for smaller inputs.
Then solve it with a recursion tree, substitution, or the Master theorem.</p>

<h3>1. Writing the recurrence</h3>
<pre><code class="language-java">int binarySearch(int[] a, int lo, int hi, int key) {
    if (lo > hi) return -1;                      // O(1)
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == key) return mid;
    if (a[mid] < key) return binarySearch(a, mid + 1, hi, key);  // one call on n/2
    return binarySearch(a, lo, mid - 1, key);
}</code></pre>
<p>T(n) = T(n/2) + O(1) → <strong>O(log n)</strong> time, and O(log n) stack space (an iterative version uses O(1)).</p>

<table>
  <thead><tr><th>Algorithm</th><th>Recurrence</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td>Binary search</td><td>T(n) = T(n/2) + 1</td><td>O(log n)</td></tr>
    <tr><td>Merge sort</td><td>T(n) = 2T(n/2) + n</td><td>O(n log n)</td></tr>
    <tr><td>Factorial, linear recursion</td><td>T(n) = T(n−1) + 1</td><td>O(n)</td></tr>
    <tr><td>Naive Fibonacci</td><td>T(n) = T(n−1) + T(n−2) + 1</td><td>O(2ⁿ) (tighter: O(1.618ⁿ))</td></tr>
    <tr><td>Selection-sort style recursion</td><td>T(n) = T(n−1) + n</td><td>O(n²)</td></tr>
    <tr><td>Tower of Hanoi</td><td>T(n) = 2T(n−1) + 1</td><td>O(2ⁿ) — exactly 2ⁿ − 1 moves</td></tr>
  </tbody>
</table>

<h3>2. Recursion tree method (merge sort)</h3>
<p>Draw the calls level by level and add up the work at each level.</p>
<ul>
  <li>Level 0: one problem of size n → work n</li>
  <li>Level 1: two problems of size n/2 → work 2 · n/2 = n</li>
  <li>Level k: 2ᵏ problems of size n/2ᵏ → work n</li>
  <li>There are log₂ n levels, each costing n → <strong>n log n</strong></li>
</ul>

<h3>3. Master theorem — for T(n) = a·T(n/b) + f(n)</h3>
<p>Compare f(n) with <strong>n^(log_b a)</strong> (the work done by the leaves):</p>
<table>
  <thead><tr><th>Case</th><th>Condition</th><th>T(n)</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>1 — leaves dominate</td><td>f(n) grows slower than n^(log_b a)</td><td>Θ(n^(log_b a))</td><td>T = 8T(n/2) + n² → Θ(n³)</td></tr>
    <tr><td>2 — balanced</td><td>f(n) = Θ(n^(log_b a))</td><td>Θ(n^(log_b a) · log n)</td><td>T = 2T(n/2) + n → Θ(n log n)</td></tr>
    <tr><td>3 — root dominates</td><td>f(n) grows faster (and is regular)</td><td>Θ(f(n))</td><td>T = 2T(n/2) + n² → Θ(n²)</td></tr>
  </tbody>
</table>
<div class="callout callout-warning">
  <strong>The Master theorem does not apply</strong> to "subtract" recurrences like T(n) = T(n−1) + n. Unroll those instead:
  n + (n−1) + … + 1 = n(n+1)/2 = O(n²).
</div>

<h3>4. Why naive Fibonacci explodes, and the fix</h3>
<pre><code class="language-java">// O(2^n): fib(5) recomputes fib(3) twice, fib(2) three times...
static long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// O(n) with memoization: each value is computed once
static long[] memo = new long[91];
static long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// O(n) time, O(1) space, iterative
static long fibIter(int n) {
    long a = 0, b = 1;
    for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; }
    return a;
}</code></pre>

<h3>5. Recursion space = maximum depth</h3>
<p>Every active call holds a stack frame. Linear recursion on n uses O(n) stack even if it allocates nothing,
and deep recursion (n ≈ 10⁵ in Java) throws <code>StackOverflowError</code>. Divide-and-conquer that halves the input
only goes log n deep.</p>
"""
    + check("Solve T(n) = 4T(n/2) + n using the Master theorem.",
            ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(n² log n)"], "c",
            "a = 4, b = 2, so n^(log₂4) = n². f(n) = n grows slower, so case 1 applies: Θ(n²).")
    + check("T(n) = T(n−1) + 1 with T(0) = 1 describes which complexity?",
            ["O(1)", "O(log n)", "O(n)", "O(n²)"], "c",
            "Each call does constant work and reduces n by one, so there are n calls: O(n).")
))

TOPICS.append(topic(
    "Practice Problems — Prime Factorization, GCD & Distributing in a Circle",
    "Unit 1 · the three warm-up problems from the CHO",
    r"""
<h3>1. Prime factorization in O(√n)</h3>
<p>If n has a factor larger than √n it must pair with one smaller than √n. So divide out every factor up to √n;
whatever is left above 1 is itself prime.</p>
<pre><code class="language-java">static List<Integer> primeFactors(int n) {
    List<Integer> factors = new ArrayList<>();
    for (int d = 2; (long) d * d <= n; d++) {
        while (n % d == 0) {          // divide out d completely
            factors.add(d);
            n /= d;
        }
    }
    if (n > 1) factors.add(n);        // leftover is a prime > sqrt(original n)
    return factors;
}
// primeFactors(360) -> [2, 2, 2, 3, 3, 5]</code></pre>
<p>Why only primes get added: by the time d reaches a composite like 6, its factors 2 and 3 were already divided out.</p>

<h4>Many queries? Use a sieve</h4>
<pre><code class="language-java">// Sieve of Eratosthenes: all primes up to N in O(N log log N)
boolean[] composite = new boolean[N + 1];
for (int i = 2; (long) i * i <= N; i++)
    if (!composite[i])
        for (int j = i * i; j <= N; j += i) composite[j] = true;</code></pre>
<p>Start crossing out at i² because smaller multiples of i were already crossed out by smaller primes.</p>

<h3>2. GCD with Euclid's algorithm</h3>
<p>Key identity: <strong>gcd(a, b) = gcd(b, a mod b)</strong>, and gcd(a, 0) = a.</p>
<pre><code class="language-java">static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
static long lcm(long a, long b) {
    return a / gcd((int) a, (int) b) * b;   // divide first to avoid overflow
}</code></pre>
<table>
  <thead><tr><th>Step</th><th>a</th><th>b</th><th>a mod b</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>252</td><td>105</td><td>42</td></tr>
    <tr><td>2</td><td>105</td><td>42</td><td>21</td></tr>
    <tr><td>3</td><td>42</td><td>21</td><td>0</td></tr>
    <tr><td>4</td><td>21</td><td>0</td><td>→ gcd = 21</td></tr>
  </tbody>
</table>
<div class="callout callout-key">
  <strong>Complexity: O(log min(a, b)).</strong> After every two steps the larger number at least halves.
  The worst case is two consecutive Fibonacci numbers (Lamé's theorem).
</div>

<h3>3. Distribute M items in a circle of N people, starting at position K</h3>
<p>Hand out items one per person, clockwise, starting with person K. Who receives the last item?</p>
<p>After the first item goes to K, the remaining M − 1 items move M − 1 steps further. Working 0-indexed and converting back:</p>
<div class="formula"><strong>last = ((K − 1) + (M − 1)) mod N + 1</strong></div>
<pre><code class="language-java">static int lastPosition(int n, int m, int k) {
    // Use long if m can be huge; the modulo keeps the answer in range 1..n
    return (int) (((long) k - 1 + m - 1) % n) + 1;
}
// n = 5, m = 2, k = 1  -> 2
// n = 5, m = 8, k = 2  -> ((1 + 7) % 5) + 1 = 4</code></pre>

<h3>4. Its famous cousin: the Josephus problem</h3>
<p>N people in a circle; every k-th person is eliminated. Who survives? With 0-indexed positions:</p>
<div class="formula">J(1) = 0 &nbsp;&nbsp;&nbsp; J(n) = (J(n − 1) + k) mod n</div>
<pre><code class="language-java">static int josephus(int n, int k) {
    int survivor = 0;                 // answer for a circle of 1
    for (int size = 2; size <= n; size++)
        survivor = (survivor + k) % size;
    return survivor + 1;              // back to 1-indexed
}
// josephus(7, 3) -> 4</code></pre>
<p>O(n) time, O(1) space, versus O(n·k) for simulating with a list.</p>
"""
    + check("How many iterations does the trial-division loop run in the worst case for n = 10⁹?",
            ["About 10⁹", "About 31,623", "About 30", "About 5×10⁸"], "b",
            "The loop runs while d² ≤ n, so up to √(10⁹) ≈ 31,623 times. That is why √n factorization is fast.")
    + check("gcd(48, 18) using Euclid's algorithm is:",
            ["3", "6", "9", "18"], "b",
            "gcd(48,18) → gcd(18,12) → gcd(12,6) → gcd(6,0) = 6.")
))

TOPICS.append(topic(
    "Prefix Sums, Suffix Arrays & the Difference Array",
    "Unit 2 · answer range questions in O(1)",
    r"""
<h3>1. Prefix sums</h3>
<p><code>prefix[i]</code> stores the sum of the first i elements. Any range sum is then a subtraction.</p>
<pre><code class="language-java">int n = a.length;
long[] prefix = new long[n + 1];              // prefix[0] = 0 simplifies edges
for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + a[i];

// sum of a[l..r] inclusive, 0-indexed
long rangeSum(int l, int r) { return prefix[r + 1] - prefix[l]; }</code></pre>
<table>
  <thead><tr><th>i</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead>
  <tbody>
    <tr><td>a</td><td>3</td><td>1</td><td>4</td><td>1</td><td>5</td><td>—</td></tr>
    <tr><td>prefix</td><td>0</td><td>3</td><td>4</td><td>8</td><td>9</td><td>14</td></tr>
  </tbody>
</table>
<p>sum(a[1..3]) = prefix[4] − prefix[1] = 9 − 3 = <strong>6</strong> (1 + 4 + 1). Build O(n), each query O(1).</p>

<h3>2. Suffix arrays (suffix max / suffix product)</h3>
<p>The same idea from the right. Classic use: <strong>product of array except self</strong> without division.</p>
<pre><code class="language-java">int[] productExceptSelf(int[] a) {
    int n = a.length;
    int[] res = new int[n];
    res[0] = 1;
    for (int i = 1; i < n; i++) res[i] = res[i - 1] * a[i - 1];   // prefix products
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {                            // multiply in suffix products
        res[i] *= suffix;
        suffix *= a[i];
    }
    return res;
}</code></pre>
<p>Another: <strong>trapping rain water</strong> — water above bar i = min(prefixMax[i], suffixMax[i]) − height[i].</p>

<h3>3. 2-D prefix sums</h3>
<div class="formula">P[i][j] = a[i−1][j−1] + P[i−1][j] + P[i][j−1] − P[i−1][j−1]<br>
sum(r1..r2, c1..c2) = P[r2+1][c2+1] − P[r1][c2+1] − P[r2+1][c1] + P[r1][c1]</div>
<p>Inclusion–exclusion: the top-left block is subtracted twice, so add it back once.</p>

<h3>4. Difference array — many range updates, one final read</h3>
<p>To add v to every element in [l, r]: <code>diff[l] += v; diff[r + 1] -= v;</code>. After all updates,
a prefix sum over <code>diff</code> rebuilds the array.</p>
<pre><code class="language-java">int[] applyUpdates(int n, int[][] updates) {       // each update = {l, r, v}
    int[] diff = new int[n + 1];
    for (int[] u : updates) {
        diff[u[0]] += u[2];
        diff[u[1] + 1] -= u[2];
    }
    int[] result = new int[n];
    int running = 0;
    for (int i = 0; i < n; i++) {
        running += diff[i];
        result[i] = running;
    }
    return result;
}
// n = 5, updates {0,2,+3}, {1,4,+2} -> [3, 5, 5, 2, 2]</code></pre>
<div class="callout callout-key">
  <strong>Pick the right tool:</strong> many <em>queries</em> on a fixed array → prefix sum.
  Many <em>updates</em> then one read → difference array. Both at once, interleaved → segment tree / Fenwick tree (beyond syllabus).
</div>
"""
    + check("prefix = [0, 2, 7, 9, 15]. What is the sum of a[1..3]?",
            ["13", "9", "15", "7"], "a",
            "sum(a[1..3]) = prefix[4] − prefix[1] = 15 − 2 = 13.")
))

TOPICS.append(topic(
    "Two Pointers & Sliding Window",
    "Unit 2 · turn O(n²) pair scans into O(n)",
    r"""
<h3>1. Two pointers on a sorted array — pair with sum K</h3>
<p>Start one pointer at each end. If the sum is too small, the only way to grow it is to move the left pointer right;
too big, move the right pointer left. Each step discards one element forever, so the loop is O(n).</p>
<pre><code class="language-java">static int[] pairWithSum(int[] a, int k) {     // a is sorted
    int l = 0, r = a.length - 1;
    while (l < r) {
        int sum = a[l] + a[r];
        if (sum == k) return new int[]{l, r};
        if (sum < k) l++;
        else r--;
    }
    return new int[]{-1, -1};
}</code></pre>
<p>Unsorted input? Either sort first (O(n log n)) or use a HashSet in one pass (O(n) time, O(n) space — see Hashing).</p>

<h3>2. Other two-pointer shapes</h3>
<table>
  <thead><tr><th>Shape</th><th>Pointers</th><th>Problems</th></tr></thead>
  <tbody>
    <tr><td>Opposite ends</td><td>l = 0, r = n−1, move inward</td><td>pair sum, reverse, palindrome, container with most water, 3-sum (fix one + two pointers)</td></tr>
    <tr><td>Same direction (slow/fast)</td><td>write index + read index</td><td>remove duplicates in place, move zeroes, partition</td></tr>
    <tr><td>Two arrays</td><td>i in A, j in B</td><td>merge two sorted arrays, intersection</td></tr>
  </tbody>
</table>
<pre><code class="language-java">// Remove duplicates from a sorted array in place; returns the new length
static int dedupe(int[] a) {
    if (a.length == 0) return 0;
    int write = 1;
    for (int read = 1; read < a.length; read++)
        if (a[read] != a[read - 1]) a[write++] = a[read];
    return write;
}</code></pre>

<h3>3. Fixed-size sliding window — max sum of k consecutive elements</h3>
<p>Instead of re-summing every window (O(n·k)), add the element entering and subtract the one leaving.</p>
<pre><code class="language-java">static long maxSumWindow(int[] a, int k) {
    long window = 0;
    for (int i = 0; i < k; i++) window += a[i];
    long best = window;
    for (int i = k; i < a.length; i++) {
        window += a[i] - a[i - k];     // slide by one
        best = Math.max(best, window);
    }
    return best;
}
// a = [2, 1, 5, 1, 3, 2], k = 3 -> windows 8, 7, 9, 6 -> 9</code></pre>

<h3>4. Variable-size window — expand right, shrink left</h3>
<p>Template: grow <code>right</code> every step; while the window breaks the rule, shrink from <code>left</code>; record the answer.</p>
<pre><code class="language-java">// Longest substring without repeating characters
static int longestUnique(String s) {
    int[] last = new int[128];          // last index + 1 where each char was seen
    int best = 0;
    for (int left = 0, right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        left = Math.max(left, last[c]); // jump past the previous copy
        last[c] = right + 1;
        best = Math.max(best, right - left + 1);
    }
    return best;
}
// "abcabcbb" -> 3 ("abc")

// Smallest subarray with sum >= target (all positives)
static int minLenSubarray(int[] a, int target) {
    int best = Integer.MAX_VALUE, left = 0;
    long sum = 0;
    for (int right = 0; right < a.length; right++) {
        sum += a[right];
        while (sum >= target) {
            best = Math.min(best, right - left + 1);
            sum -= a[left++];
        }
    }
    return best == Integer.MAX_VALUE ? 0 : best;
}</code></pre>
<div class="callout callout-warning">
  <strong>When the window trick breaks:</strong> shrinking on "sum ≥ target" only works when all numbers are
  non-negative (adding always grows the sum). With negatives, use prefix sums + a HashMap instead.
</div>
"""
    + check("Why is the two-pointer pair-sum scan O(n) and not O(n²)?",
            ["It uses binary search inside", "Every iteration moves one pointer, and pointers never move back",
             "It only checks half the array", "Java optimises the loop"], "b",
            "l only increases and r only decreases, so there are at most n − 1 iterations in total.")
))

TOPICS.append(topic(
    "Binary Search, Array Rotation, In-place Reversal & Partitioning",
    "Unit 2 · halving the search space and rearranging without extra memory",
    r"""
<h3>1. Binary search — the template that never goes wrong</h3>
<pre><code class="language-java">static int binarySearch(int[] a, int key) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;     // not (lo + hi) / 2: that can overflow
        if (a[mid] == key) return mid;
        if (a[mid] < key) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;                             // lo is now the insertion point
}</code></pre>

<h3>2. Lower bound / upper bound (first and last occurrence)</h3>
<pre><code class="language-java">// first index with a[i] >= key (a.length if none)
static int lowerBound(int[] a, int key) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (a[mid] < key) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
// count of key = lowerBound(a, key + 1) - lowerBound(a, key)</code></pre>

<h3>3. Binary search on the answer</h3>
<p>If a yes/no condition is monotonic ("can we do it with capacity x?" is false…false, true…true),
binary search the smallest x that works.</p>
<pre><code class="language-java">// Minimum ship capacity to ship all packages within D days
static int shipWithinDays(int[] w, int days) {
    int lo = 0, hi = 0;
    for (int x : w) { lo = Math.max(lo, x); hi += x; }
    while (lo < hi) {
        int cap = (lo + hi) >>> 1;
        int need = 1, load = 0;
        for (int x : w) {
            if (load + x > cap) { need++; load = 0; }
            load += x;
        }
        if (need <= days) hi = cap; else lo = cap + 1;
    }
    return lo;
}</code></pre>
<p>Same pattern: integer square root, Koko eating bananas, allocate minimum pages, aggressive cows.</p>

<h3>4. Search in a rotated sorted array</h3>
<p>One half of any window is always sorted. Check whether the key lies inside that sorted half.</p>
<pre><code class="language-java">static int searchRotated(int[] a, int key) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = (lo + hi) >>> 1;
        if (a[mid] == key) return mid;
        if (a[lo] <= a[mid]) {                                // left half sorted
            if (a[lo] <= key && key < a[mid]) hi = mid - 1; else lo = mid + 1;
        } else {                                              // right half sorted
            if (a[mid] < key && key <= a[hi]) lo = mid + 1; else hi = mid - 1;
        }
    }
    return -1;
}</code></pre>

<h3>5. Rotate an array by k using the reversal algorithm</h3>
<p>To rotate <strong>right</strong> by k: reverse all, reverse the first k, reverse the rest. O(n) time, O(1) space.</p>
<pre><code class="language-java">static void reverse(int[] a, int i, int j) {
    while (i < j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; }
}
static void rotateRight(int[] a, int k) {
    int n = a.length;
    k %= n;                     // k can exceed n
    reverse(a, 0, n - 1);
    reverse(a, 0, k - 1);
    reverse(a, k, n - 1);
}
// [1,2,3,4,5,6,7], k=3 -> reverse all [7,6,5,4,3,2,1]
//                      -> first 3   [5,6,7,4,3,2,1]
//                      -> rest      [5,6,7,1,2,3,4]</code></pre>
<p>Rotate <strong>left</strong> by k: reverse first k, reverse the rest, then reverse all.</p>

<h3>6. Partitioning — Dutch National Flag (sort 0s, 1s, 2s)</h3>
<pre><code class="language-java">static void sort012(int[] a) {
    int low = 0, mid = 0, high = a.length - 1;
    while (mid <= high) {
        if (a[mid] == 0) swap(a, low++, mid++);
        else if (a[mid] == 1) mid++;
        else swap(a, mid, high--);   // don't advance mid: the swapped-in value is unchecked
    }
}</code></pre>
<p>Invariant: [0, low) are 0s, [low, mid) are 1s, (high, n−1] are 2s. One pass, O(1) space.
The same idea (Lomuto/Hoare partition) is the heart of quicksort.</p>
"""
    + check("An array of 10⁶ sorted elements is binary searched. Roughly how many comparisons in the worst case?",
            ["1,000,000", "1,000", "20", "500,000"], "c",
            "log₂(10⁶) ≈ 20. Each comparison halves the remaining range.")
    + check("Rotating [1,2,3,4,5] right by k = 7 gives:",
            ["[4,5,1,2,3]", "[3,4,5,1,2]", "[1,2,3,4,5]", "[5,1,2,3,4]"], "a",
            "k mod n = 7 mod 5 = 2, so rotate right by 2: [4,5,1,2,3].")
))

TOPICS.append(topic(
    "String Basics — Reverse, Palindrome, Anagram, Substrings & Compression",
    "Unit 2 · the everyday string toolkit in Java",
    r"""
<h3>1. Java strings in one minute</h3>
<ul>
  <li><code>String</code> is <strong>immutable</strong>: <code>s + "x"</code> builds a new object. Concatenating in a loop is O(n²).</li>
  <li>Use <code>StringBuilder</code> for building strings: <code>append</code> is amortised O(1).</li>
  <li><code>s.toCharArray()</code> gives a mutable copy; <code>s.charAt(i) - 'a'</code> maps letters to 0–25.</li>
  <li>Compare contents with <code>equals</code>, never <code>==</code>.</li>
</ul>

<h3>2. Reverse and palindrome</h3>
<pre><code class="language-java">static String reverse(String s) {
    return new StringBuilder(s).reverse().toString();
}

// Palindrome ignoring case and non-alphanumerics: "A man, a plan, a canal: Panama"
static boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
        while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
        if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;
        i++; j--;
    }
    return true;
}</code></pre>

<h3>3. Anagram check — count, don't sort</h3>
<pre><code class="language-java">static boolean isAnagram(String a, String b) {
    if (a.length() != b.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < a.length(); i++) {
        count[a.charAt(i) - 'a']++;
        count[b.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}</code></pre>
<p>Counting is O(n); sorting both strings is O(n log n). For Unicode input use a <code>HashMap&lt;Character,Integer&gt;</code>.
Grouping anagrams: use the sorted string (or the count signature) as a HashMap key.</p>

<h3>4. Substrings vs subsequences</h3>
<table>
  <thead><tr><th></th><th>Substring</th><th>Subsequence</th></tr></thead>
  <tbody>
    <tr><td>Definition</td><td>contiguous block</td><td>any order-preserving selection</td></tr>
    <tr><td>Count for length n</td><td>n(n+1)/2</td><td>2ⁿ</td></tr>
    <tr><td>"abc" examples</td><td>a, ab, abc, b, bc, c</td><td>also "ac"</td></tr>
  </tbody>
</table>

<h4>Longest palindromic substring — expand around centre, O(n²)</h4>
<pre><code class="language-java">static String longestPalindrome(String s) {
    int start = 0, len = 0;
    for (int c = 0; c < s.length(); c++) {
        for (int[] seed : new int[][]{{c, c}, {c, c + 1}}) {   // odd and even centres
            int l = seed[0], r = seed[1];
            while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
            if (r - l - 1 > len) { len = r - l - 1; start = l + 1; }
        }
    }
    return s.substring(start, start + len);
}</code></pre>

<h3>5. Run-length compression</h3>
<pre><code class="language-java">// "aaabccdddd" -> "a3b1c2d4"
static String compress(String s) {
    StringBuilder out = new StringBuilder();
    for (int i = 0; i < s.length(); ) {
        int j = i;
        while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
        out.append(s.charAt(i)).append(j - i);
        i = j;
    }
    return out.length() < s.length() ? out.toString() : s;   // only if it actually shrinks
}</code></pre>
"""
    + check("Building a string of n characters with <code>result = result + c</code> inside a loop takes:",
            ["O(n)", "O(n log n)", "O(n²)", "O(1)"], "c",
            "Each concatenation copies the whole string so far: 1 + 2 + … + n = O(n²). StringBuilder makes it O(n).")
))

TOPICS.append(topic(
    "Pattern Matching — Naive, KMP, Z-Function & Rolling Hash",
    "Unit 2 · find a pattern of length m in a text of length n",
    r"""
<h3>1. Naive matching — O(n·m)</h3>
<pre><code class="language-java">static int naiveSearch(String text, String pat) {
    int n = text.length(), m = pat.length();
    for (int i = 0; i + m <= n; i++) {
        int j = 0;
        while (j < m && text.charAt(i + j) == pat.charAt(j)) j++;
        if (j == m) return i;
    }
    return -1;
}</code></pre>
<p>Worst case text = "aaaa…ab", pattern = "aaab": every alignment compares almost m characters.</p>

<h3>2. KMP — never re-read matched text</h3>
<p>KMP precomputes the <strong>LPS array</strong> (longest proper prefix that is also a suffix) for every prefix of the pattern.
On a mismatch after matching j characters, jump to <code>j = lps[j − 1]</code> instead of restarting.</p>
<table>
  <thead><tr><th>Pattern</th><th>A</th><th>B</th><th>A</th><th>B</th><th>C</th><th>A</th><th>B</th></tr></thead>
  <tbody><tr><td>lps</td><td>0</td><td>0</td><td>1</td><td>2</td><td>0</td><td>1</td><td>2</td></tr></tbody>
</table>
<pre><code class="language-java">static int[] buildLps(String p) {
    int[] lps = new int[p.length()];
    for (int i = 1, len = 0; i < p.length(); ) {
        if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];   // fall back, don't move i
        else lps[i++] = 0;
    }
    return lps;
}

static List<Integer> kmpSearch(String t, String p) {
    int[] lps = buildLps(p);
    List<Integer> hits = new ArrayList<>();
    for (int i = 0, j = 0; i < t.length(); ) {
        if (t.charAt(i) == p.charAt(j)) {
            i++; j++;
            if (j == p.length()) { hits.add(i - j); j = lps[j - 1]; }
        } else if (j > 0) j = lps[j - 1];
        else i++;
    }
    return hits;
}</code></pre>
<div class="callout callout-key"><strong>KMP is O(n + m)</strong> time and O(m) space. The text pointer i never moves backwards.</div>

<h3>3. Z-function</h3>
<p><code>z[i]</code> = length of the longest substring starting at i that matches a prefix of the string.
To search, build Z on <code>pattern + "$" + text</code>; every index with z[i] = m is a match.</p>
<pre><code class="language-java">static int[] zFunction(String s) {
    int n = s.length();
    int[] z = new int[n];
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = Math.min(r - i, z[i - l]);          // reuse the current Z-box
        while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}
// "aabxaab" -> [0, 1, 0, 0, 3, 1, 0]</code></pre>

<h3>4. String hashing & Rabin–Karp (rolling hash)</h3>
<p>Treat a string as a number in base B, modulo a large prime M:
hash(s) = s₀·B^(m−1) + s₁·B^(m−2) + … + s_(m−1) (mod M). Sliding the window by one character is O(1):</p>
<div class="formula">h_next = ((h − s[i]·B^(m−1)) · B + s[i+m]) mod M</div>
<pre><code class="language-java">static int rabinKarp(String t, String p) {
    final long B = 131, M = 1_000_000_007L;
    int n = t.length(), m = p.length();
    if (m > n) return -1;
    long hp = 0, ht = 0, pow = 1;
    for (int i = 0; i < m; i++) {
        hp = (hp * B + p.charAt(i)) % M;
        ht = (ht * B + t.charAt(i)) % M;
        if (i > 0) pow = pow * B % M;              // B^(m-1)
    }
    for (int i = 0; ; i++) {
        if (hp == ht && t.regionMatches(i, p, 0, m)) return i;   // verify: hashes can collide
        if (i + m == n) return -1;
        ht = (ht - t.charAt(i) * pow % M + M) % M;
        ht = (ht * B + t.charAt(i + m)) % M;
    }
}</code></pre>
<table>
  <thead><tr><th>Algorithm</th><th>Preprocess</th><th>Search</th><th>Best for</th></tr></thead>
  <tbody>
    <tr><td>Naive</td><td>—</td><td>O(n·m)</td><td>tiny inputs</td></tr>
    <tr><td>KMP</td><td>O(m)</td><td>O(n)</td><td>one pattern, guaranteed linear</td></tr>
    <tr><td>Z-function</td><td>O(n + m)</td><td>O(n + m)</td><td>prefix questions, simple code</td></tr>
    <tr><td>Rabin–Karp</td><td>O(m)</td><td>O(n) expected</td><td>many patterns of equal length, substring equality</td></tr>
  </tbody>
</table>
"""
    + check("What is the LPS array for the pattern \"AAAA\"?",
            ["[0, 1, 2, 3]", "[0, 0, 0, 0]", "[1, 2, 3, 4]", "[0, 1, 1, 1]"], "a",
            "Prefix \"AA\" has border \"A\" (1), \"AAA\" has \"AA\" (2), \"AAAA\" has \"AAA\" (3).")
))

TOPICS.append(topic(
    "DP on Arrays — 1-D Patterns, LIS & LCS",
    "Unit 2 · overlapping subproblems solved once",
    r"""
<h3>1. When is a problem DP?</h3>
<ul>
  <li><strong>Optimal substructure</strong> — the best answer is built from best answers to smaller problems.</li>
  <li><strong>Overlapping subproblems</strong> — the same smaller problem is needed many times.</li>
</ul>
<p>Recipe: <strong>define the state</strong> (what does dp[i] mean?) → <strong>transition</strong> → <strong>base case</strong> → <strong>order of filling</strong> → answer location.</p>

<h3>2. Three 1-D patterns to know cold</h3>
<pre><code class="language-java">// Climbing stairs: ways to reach step n taking 1 or 2 steps.  dp[i] = dp[i-1] + dp[i-2]
static long climb(int n) {
    long a = 1, b = 1;                       // dp[0], dp[1]
    for (int i = 2; i <= n; i++) { long c = a + b; a = b; b = c; }
    return b;
}

// House robber: no two adjacent. dp[i] = max(dp[i-1], dp[i-2] + a[i])
static int rob(int[] a) {
    int skip = 0, take = 0;
    for (int x : a) { int t = Math.max(take, skip + x); skip = take; take = t; }
    return take;
}

// Kadane: max subarray sum. best ending here = max(a[i], bestEndingPrev + a[i])
static int kadane(int[] a) {
    int cur = a[0], best = a[0];
    for (int i = 1; i < a.length; i++) {
        cur = Math.max(a[i], cur + a[i]);
        best = Math.max(best, cur);
    }
    return best;
}</code></pre>

<h3>3. Longest Increasing Subsequence (LIS)</h3>
<p><strong>O(n²) DP:</strong> dp[i] = length of the longest increasing subsequence <em>ending at</em> i.</p>
<pre><code class="language-java">static int lisQuadratic(int[] a) {
    int n = a.length, best = 0;
    int[] dp = new int[n];
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
        best = Math.max(best, dp[i]);
    }
    return best;
}</code></pre>
<p><strong>O(n log n) patience method:</strong> <code>tails[k]</code> = smallest possible tail of an increasing subsequence of length k+1.</p>
<pre><code class="language-java">static int lisFast(int[] a) {
    int[] tails = new int[a.length];
    int size = 0;
    for (int x : a) {
        int lo = 0, hi = size;
        while (lo < hi) { int mid = (lo + hi) >>> 1; if (tails[mid] < x) lo = mid + 1; else hi = mid; }
        tails[lo] = x;                 // replace or extend
        if (lo == size) size++;
    }
    return size;
}
// [10, 9, 2, 5, 3, 7, 101, 18] -> 4  (e.g. 2, 3, 7, 18)</code></pre>
<div class="callout callout-warning"><strong>tails is not the LIS itself</strong> — only its length is guaranteed. Reconstruct with parent pointers if you need the sequence.</div>

<h3>4. Longest Common Subsequence (LCS)</h3>
<div class="formula">dp[i][j] = dp[i−1][j−1] + 1 &nbsp; if a[i−1] == b[j−1]<br>dp[i][j] = max(dp[i−1][j], dp[i][j−1]) &nbsp; otherwise</div>
<pre><code class="language-java">static int lcs(String a, String b) {
    int n = a.length(), m = b.length();
    int[][] dp = new int[n + 1][m + 1];            // row/col 0 = empty prefix
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
    return dp[n][m];
}
// lcs("ABCBDAB", "BDCABA") = 4 ("BCBA")</code></pre>
<table>
  <thead><tr><th></th><th>""</th><th>B</th><th>D</th><th>C</th><th>A</th></tr></thead>
  <tbody>
    <tr><td>""</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
    <tr><td>A</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
    <tr><td>B</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
    <tr><td>C</td><td>0</td><td>1</td><td>1</td><td>2</td><td>2</td></tr>
  </tbody>
</table>
<p>O(n·m) time and space. Only the previous row is needed, so space drops to O(m).
Related: edit distance, shortest common supersequence (n + m − LCS), longest palindromic subsequence (LCS of s and reverse(s)).</p>
"""
    + check("For a = [3, 1, 8, 2, 5], what is the length of the LIS?",
            ["2", "3", "4", "5"], "b",
            "1, 2, 5 is increasing and has length 3. No increasing subsequence of length 4 exists, so the LIS is 3.")
))

TOPICS.append(topic(
    "Greedy Thinking — Choice Property, Exchange Arguments & When Greedy Fails",
    "Unit 3 · make the locally best move and never look back",
    r"""
<p>A greedy algorithm builds the answer one irreversible choice at a time, always taking the option that looks best right now.
It is fast and simple, but only <strong>correct</strong> when the problem has two properties:</p>
<ol>
  <li><strong>Greedy choice property</strong> — some optimal solution starts with the greedy choice.</li>
  <li><strong>Optimal substructure</strong> — after making that choice, the rest is a smaller instance of the same problem.</li>
</ol>

<h3>1. Proof technique: the exchange argument</h3>
<p>Take any optimal solution O that differs from the greedy solution G. Show you can <em>swap</em> one element of O for G's choice
without making O worse. Repeat until O = G, so G is optimal too.</p>
<div class="callout callout-key">
  <strong>Activity selection example:</strong> greedy picks the activity that finishes earliest, f₁. Let O's first activity finish at f ≥ f₁.
  Replacing it with the greedy activity cannot overlap the rest of O (it finishes even earlier), so O keeps the same size. Exchange done.
</div>

<h3>2. Other proof styles you can quote</h3>
<ul>
  <li><strong>Greedy stays ahead</strong> — after every step, greedy's partial answer is at least as good as any other algorithm's.</li>
  <li><strong>Counterexample hunting</strong> — before trusting greedy, try small tricky inputs. One failure disproves it.</li>
</ul>

<h3>3. Coin change: where greedy works and where it breaks</h3>
<table>
  <thead><tr><th>Coins</th><th>Amount</th><th>Greedy (largest first)</th><th>Optimal</th></tr></thead>
  <tbody>
    <tr><td>1, 2, 5, 10 (Indian/US-style)</td><td>18</td><td>10 + 5 + 2 + 1 = 4 coins</td><td>4 coins ✔</td></tr>
    <tr><td>1, 3, 4</td><td>6</td><td>4 + 1 + 1 = 3 coins</td><td>3 + 3 = <strong>2 coins</strong> ✘</td></tr>
  </tbody>
</table>
<p>Canonical coin systems are safe for greedy; arbitrary ones need DP: <code>dp[x] = 1 + min(dp[x − c])</code>.</p>

<h3>4. Fractional vs 0/1 knapsack</h3>
<table>
  <thead><tr><th></th><th>Fractional knapsack</th><th>0/1 knapsack</th></tr></thead>
  <tbody>
    <tr><td>Can split items?</td><td>Yes</td><td>No</td></tr>
    <tr><td>Strategy</td><td>Greedy by value/weight ratio</td><td>DP over capacity</td></tr>
    <tr><td>Complexity</td><td>O(n log n)</td><td>O(n·W)</td></tr>
  </tbody>
</table>
<p>Greedy fails for 0/1: capacity 50, items (60, 10), (100, 20), (120, 30). Ratio order takes items 1 and 2 = 160,
but items 2 and 3 give 220.</p>

<h3>5. Recognising a greedy problem</h3>
<ul>
  <li>"maximum number of non-overlapping…", "minimum number of … to cover…"</li>
  <li>Sorting by one key (end time, deadline, ratio) makes the decision obvious.</li>
  <li>A priority queue repeatedly gives "the best available item now" (Huffman coding, merging ropes, task scheduling).</li>
</ul>

<h3>6. Greedy + DP hybrids</h3>
<p>Some problems sort greedily and then run DP: <strong>weighted interval scheduling</strong> sorts by end time (greedy step),
then dp[i] = max(dp[i−1], value[i] + dp[last compatible]) because weights break the pure greedy choice.
<strong>Jump Game</strong> has both a DP solution and a greedy "farthest reach" solution.</p>
"""
    + check("Coins {1, 5, 6, 9}, amount 11. Greedy (largest first) uses how many coins, and what is optimal?",
            ["Greedy 3, optimal 2", "Greedy 2, optimal 2", "Greedy 3, optimal 3", "Greedy 4, optimal 2"], "a",
            "Greedy: 9 + 1 + 1 = 3 coins. Optimal: 5 + 6 = 2 coins. Greedy is not safe here.")
))

TOPICS.append(topic(
    "Greedy in Practice — Intervals, Meeting Rooms, Jobs, Knapsack & Strings",
    "Unit 3 · the standard problems with code",
    r"""
<h3>1. Activity selection / interval scheduling (max non-overlapping)</h3>
<pre><code class="language-java">static int maxActivities(int[][] acts) {          // acts[i] = {start, end}
    Arrays.sort(acts, (x, y) -> Integer.compare(x[1], y[1]));   // earliest finish first
    int count = 0, lastEnd = Integer.MIN_VALUE;
    for (int[] a : acts)
        if (a[0] >= lastEnd) { count++; lastEnd = a[1]; }
    return count;
}</code></pre>
<p>Sorting by <em>start</em> time or by <em>length</em> is wrong — try (1,10), (2,3), (4,5).
"Minimum removals to make intervals non-overlapping" = n − maxActivities.</p>

<h3>2. Meeting rooms — minimum rooms needed</h3>
<pre><code class="language-java">static int minRooms(int[][] meetings) {
    Arrays.sort(meetings, (x, y) -> Integer.compare(x[0], y[0]));
    PriorityQueue<Integer> ends = new PriorityQueue<>();        // end times of rooms in use
    for (int[] m : meetings) {
        if (!ends.isEmpty() && ends.peek() <= m[0]) ends.poll();  // reuse the room freeing first
        ends.offer(m[1]);
    }
    return ends.size();
}
// {0,30},{5,10},{15,20} -> 2</code></pre>
<p>Alternative: sort starts and ends separately and sweep with two pointers — rooms = max overlap.</p>

<h3>3. Merge overlapping intervals</h3>
<pre><code class="language-java">static List<int[]> merge(int[][] iv) {
    Arrays.sort(iv, (x, y) -> Integer.compare(x[0], y[0]));
    List<int[]> out = new ArrayList<>();
    for (int[] cur : iv) {
        if (out.isEmpty() || out.get(out.size() - 1)[1] < cur[0]) out.add(cur);
        else out.get(out.size() - 1)[1] = Math.max(out.get(out.size() - 1)[1], cur[1]);
    }
    return out;
}</code></pre>

<h3>4. Job sequencing with deadlines (maximise profit)</h3>
<p>Each job takes one unit of time and pays only if finished by its deadline. Sort by profit (high first) and put
each job in the <strong>latest free slot</strong> on or before its deadline.</p>
<pre><code class="language-java">static int jobSequencing(int[][] jobs) {        // jobs[i] = {deadline, profit}
    Arrays.sort(jobs, (x, y) -> y[1] - x[1]);
    int maxD = 0;
    for (int[] j : jobs) maxD = Math.max(maxD, j[0]);
    boolean[] used = new boolean[maxD + 1];
    int profit = 0;
    for (int[] j : jobs)
        for (int t = j[0]; t >= 1; t--)
            if (!used[t]) { used[t] = true; profit += j[1]; break; }
    return profit;
}
// {2,100},{1,19},{2,27},{1,25},{3,15} -> 100 + 27 + 15 = 142</code></pre>
<p>O(n · maxDeadline); a Disjoint Set Union for "latest free slot" makes it near O(n log n).</p>

<h3>5. Fractional knapsack</h3>
<pre><code class="language-java">static double fractionalKnapsack(int[] value, int[] weight, int capacity) {
    Integer[] idx = new Integer[value.length];
    for (int i = 0; i < idx.length; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Double.compare((double) value[b] / weight[b], (double) value[a] / weight[a]));
    double total = 0;
    for (int i : idx) {
        if (capacity == 0) break;
        int take = Math.min(weight[i], capacity);
        total += take * (double) value[i] / weight[i];
        capacity -= take;
    }
    return total;
}
// values {60,100,120}, weights {10,20,30}, W = 50 -> 60 + 100 + 80 = 240.0</code></pre>

<h3>6. Greedy with a priority queue — connect ropes at minimum cost</h3>
<pre><code class="language-java">static long connectRopes(int[] ropes) {
    PriorityQueue<Long> pq = new PriorityQueue<>();
    for (int r : ropes) pq.offer((long) r);
    long cost = 0;
    while (pq.size() > 1) {
        long joined = pq.poll() + pq.poll();   // always join the two shortest
        cost += joined;
        pq.offer(joined);
    }
    return cost;
}
// {4, 3, 2, 6} -> 29</code></pre>

<h3>7. Greedy on strings — lexicographically smallest</h3>
<p><strong>Remove k digits to make the smallest number:</strong> scan left to right; while the previous kept digit is larger than the
current one and removals remain, drop it (a monotonic stack).</p>
<pre><code class="language-java">static String removeKDigits(String num, int k) {
    StringBuilder st = new StringBuilder();
    for (char c : num.toCharArray()) {
        while (k > 0 && st.length() > 0 && st.charAt(st.length() - 1) > c) {
            st.deleteCharAt(st.length() - 1);
            k--;
        }
        st.append(c);
    }
    st.setLength(st.length() - k);                       // still owe removals: cut the tail
    int i = 0;
    while (i < st.length() - 1 && st.charAt(i) == '0') i++;   // strip leading zeros
    return st.length() == 0 ? "0" : st.substring(i);
}
// "1432219", k = 3 -> "1219"</code></pre>
<p>Reordering example: <strong>reorganise string</strong> so no two adjacent characters match — repeatedly place the most frequent
remaining character that differs from the last one (max-heap by count). Impossible if any count &gt; (n + 1) / 2.</p>
"""
    + check("Intervals (1,4), (3,5), (0,6), (5,7), (8,9), (5,9). Maximum non-overlapping activities (end ≤ next start allowed)?",
            ["2", "3", "4", "5"], "b",
            "Sort by end: (1,4), (3,5), (0,6), (5,7), (8,9), (5,9). Pick (1,4) → (5,7) → (8,9) = 3.")
))

TOPICS.append(topic(
    "Stacks — Array Implementation, Parentheses, Expression Evaluation & Monotonic Stacks",
    "Unit 4 · last in, first out",
    r"""
<h3>1. Stack using an array</h3>
<pre><code class="language-java">class ArrayStack {
    private final int[] data;
    private int top = -1;                       // index of the top element

    ArrayStack(int capacity) { data = new int[capacity]; }

    void push(int x) {
        if (top == data.length - 1) throw new RuntimeException("Stack overflow");
        data[++top] = x;
    }
    int pop() {
        if (isEmpty()) throw new RuntimeException("Stack underflow");
        return data[top--];
    }
    int peek() {
        if (isEmpty()) throw new RuntimeException("Stack is empty");
        return data[top];
    }
    boolean isEmpty() { return top == -1; }
    int size() { return top + 1; }
}</code></pre>
<p>All operations O(1). In real Java code prefer <code>ArrayDeque&lt;Integer&gt;</code> (<code>push/pop/peek</code>) over the legacy synchronised <code>Stack</code> class.</p>

<h3>2. Balanced parentheses</h3>
<pre><code class="language-java">static boolean isBalanced(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.isEmpty()) return false;
            char open = st.pop();
            if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) return false;
        }
    }
    return st.isEmpty();          // leftover openers mean unbalanced
}</code></pre>

<h3>3. Expressions: infix, prefix, postfix</h3>
<table>
  <thead><tr><th>Form</th><th>Example</th><th>Needs brackets?</th></tr></thead>
  <tbody>
    <tr><td>Infix</td><td>(A + B) * C</td><td>yes</td></tr>
    <tr><td>Prefix (Polish)</td><td>* + A B C</td><td>no</td></tr>
    <tr><td>Postfix (Reverse Polish)</td><td>A B + C *</td><td>no</td></tr>
  </tbody>
</table>

<h4>Evaluate postfix</h4>
<pre><code class="language-java">static int evalPostfix(String[] tokens) {
    Deque<Integer> st = new ArrayDeque<>();
    for (String t : tokens) {
        switch (t) {
            case "+": st.push(st.pop() + st.pop()); break;
            case "*": st.push(st.pop() * st.pop()); break;
            case "-": { int b = st.pop(), a = st.pop(); st.push(a - b); break; }   // order matters
            case "/": { int b = st.pop(), a = st.pop(); st.push(a / b); break; }
            default: st.push(Integer.parseInt(t));
        }
    }
    return st.pop();
}
// "2 3 1 * + 9 -" -> 2 + 3*1 - 9 = -4</code></pre>

<h4>Infix → postfix (shunting-yard)</h4>
<ol>
  <li>Operand → output.</li>
  <li><code>(</code> → push. <code>)</code> → pop to output until <code>(</code>.</li>
  <li>Operator → pop operators of <strong>higher or equal precedence</strong> (for left-associative ones) to output, then push.</li>
  <li>End → pop everything.</li>
</ol>
<p>A + B * C − D → <strong>A B C * + D −</strong>. &nbsp; (A + B) * (C − D) → <strong>A B + C D − *</strong>.
Exponent <code>^</code> is right-associative: pop only strictly higher precedence.</p>

<h3>4. Monotonic stack — next greater element in O(n)</h3>
<p>Keep a stack of indices whose next-greater is still unknown, with values decreasing from bottom to top.
When a bigger value arrives, it is the answer for everything smaller on the stack.</p>
<pre><code class="language-java">static int[] nextGreater(int[] a) {
    int[] res = new int[a.length];
    Arrays.fill(res, -1);
    Deque<Integer> st = new ArrayDeque<>();                // indices
    for (int i = 0; i < a.length; i++) {
        while (!st.isEmpty() && a[st.peek()] < a[i]) res[st.pop()] = a[i];
        st.push(i);
    }
    return res;
}
// [4, 5, 2, 25] -> [5, 25, 25, -1]</code></pre>
<p>Each index is pushed and popped once → O(n). Variants: previous smaller (stock span), daily temperatures,
circular next greater (loop 2n with i % n), <strong>largest rectangle in histogram</strong> (previous &amp; next smaller).</p>

<h3>5. Stack + DP: longest valid parentheses</h3>
<pre><code class="language-java">static int longestValid(String s) {
    Deque<Integer> st = new ArrayDeque<>();
    st.push(-1);                                   // base: index before the current valid run
    int best = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '(') st.push(i);
        else {
            st.pop();
            if (st.isEmpty()) st.push(i);          // unmatched ')' becomes the new base
            else best = Math.max(best, i - st.peek());
        }
    }
    return best;
}
// ")()())" -> 4</code></pre>
"""
    + check("Convert A * (B + C) / D to postfix.",
            ["A B C + * D /", "A B + C * D /", "* A + B C / D", "A B C * + D /"], "a",
            "Brackets first: B C +. Then A (B C +) * gives A B C + *. Then divide by D: A B C + * D /.")
    + check("Evaluate the postfix expression 5 1 2 + 4 * + 3 −.",
            ["14", "12", "16", "18"], "a",
            "1 2 + = 3; 3 4 * = 12; 5 12 + = 17; 17 3 − = 14.")
))

TOPICS.append(topic(
    "Queues — Circular Queue, Deque & Sliding Window Maximum",
    "Unit 4 · first in, first out",
    r"""
<h3>1. Why a plain array queue wastes space</h3>
<p>With front and rear only moving right, dequeued cells at the start are never reused — the queue reports "full"
while half the array is empty. The fix is to wrap around with modulo arithmetic.</p>

<h3>2. Circular queue</h3>
<pre><code class="language-java">class CircularQueue {
    private final int[] data;
    private int front = 0, size = 0;

    CircularQueue(int capacity) { data = new int[capacity]; }

    boolean enqueue(int x) {
        if (isFull()) return false;
        int rear = (front + size) % data.length;    // slot after the last element
        data[rear] = x;
        size++;
        return true;
    }
    int dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue underflow");
        int x = data[front];
        front = (front + 1) % data.length;
        size--;
        return x;
    }
    int peek() { if (isEmpty()) throw new RuntimeException("Empty"); return data[front]; }
    boolean isEmpty() { return size == 0; }
    boolean isFull() { return size == data.length; }
}</code></pre>
<div class="callout callout-key">
  <strong>Full vs empty ambiguity:</strong> with only front and rear pointers, front == rear means both "empty" and "full".
  Solve it with a <code>size</code> counter (above) or by keeping one slot always empty: full when <code>(rear + 1) % n == front</code>.
</div>

<h3>3. Queue in Java</h3>
<table>
  <thead><tr><th>Operation</th><th>Throws on failure</th><th>Returns special value</th></tr></thead>
  <tbody>
    <tr><td>Insert</td><td><code>add(e)</code></td><td><code>offer(e)</code> → false</td></tr>
    <tr><td>Remove</td><td><code>remove()</code></td><td><code>poll()</code> → null</td></tr>
    <tr><td>Examine</td><td><code>element()</code></td><td><code>peek()</code> → null</td></tr>
  </tbody>
</table>
<p><code>Queue&lt;Integer&gt; q = new ArrayDeque&lt;&gt;();</code> — fast, but rejects nulls. <code>LinkedList</code> also implements Queue.</p>

<h3>4. Deque — both ends</h3>
<p><code>addFirst / addLast / pollFirst / pollLast / peekFirst / peekLast</code>, all O(1) in <code>ArrayDeque</code>.
A deque can act as a stack and a queue at once, which is exactly what the next problem needs.</p>

<h3>5. Sliding window maximum in O(n)</h3>
<p>Keep indices in the deque with <strong>decreasing values</strong>. The front is the current window's maximum.</p>
<pre><code class="language-java">static int[] maxSlidingWindow(int[] a, int k) {
    int[] res = new int[a.length - k + 1];
    Deque<Integer> dq = new ArrayDeque<>();              // indices, values decreasing
    for (int i = 0; i < a.length; i++) {
        if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();   // fell out of window
        while (!dq.isEmpty() && a[dq.peekLast()] <= a[i]) dq.pollLast(); // can never be max again
        dq.addLast(i);
        if (i >= k - 1) res[i - k + 1] = a[dq.peekFirst()];
    }
    return res;
}
// [1,3,-1,-3,5,3,6,7], k=3 -> [3,3,5,5,6,7]</code></pre>
<p>Each index enters and leaves once. A max-heap would give O(n log n).</p>

<h3>6. Queue applications</h3>
<ul>
  <li>BFS on trees and graphs (Unit 7 and 9)</li>
  <li>First non-repeating character in a stream (queue + counts)</li>
  <li>CPU round-robin scheduling, printer spooling, buffering</li>
  <li>Implement a queue with two stacks: push to <em>in</em>; pop from <em>out</em>, refilling out from in only when empty (amortised O(1))</li>
</ul>
"""
    + check("In a circular queue of capacity 5, front = 3 and size = 4. At which index is the next element inserted?",
            ["0", "2", "4", "7"], "b",
            "rear = (front + size) % capacity = (3 + 4) % 5 = 2.")
))

TOPICS.append(topic(
    "Hashing — Hash Functions, Collisions, HashMap & HashSet",
    "Unit 5 · average O(1) lookup",
    r"""
<h3>1. The idea</h3>
<p>A <strong>hash function</strong> turns a key into an array index: <code>index = h(key) mod tableSize</code>.
Insert, search and delete are then <strong>O(1) on average</strong>. Two different keys landing on the same index is a
<strong>collision</strong> — unavoidable (pigeonhole principle), so we need a strategy.</p>

<h3>2. Good hash functions</h3>
<ul>
  <li><strong>Division method:</strong> h(k) = k mod m, with m a prime not close to a power of 2.</li>
  <li><strong>Multiplication method:</strong> h(k) = ⌊m · frac(k·A)⌋ with 0 &lt; A &lt; 1 (Knuth suggests A ≈ 0.618).</li>
  <li><strong>Strings:</strong> polynomial hash, e.g. Java's <code>s[0]·31^(n−1) + … + s[n−1]</code>.</li>
  <li>Deterministic, fast, spreads keys uniformly.</li>
</ul>

<h3>3. Collision handling</h3>
<table>
  <thead><tr><th>Technique</th><th>How</th><th>Pros / cons</th></tr></thead>
  <tbody>
    <tr><td><strong>Separate chaining</strong></td><td>Each slot holds a linked list (or tree) of entries</td><td>simple, load factor can exceed 1; extra memory for nodes</td></tr>
    <tr><td><strong>Linear probing</strong></td><td>try h, h+1, h+2, …</td><td>cache friendly; <em>primary clustering</em></td></tr>
    <tr><td><strong>Quadratic probing</strong></td><td>try h + 1², h + 2², …</td><td>less clustering; <em>secondary clustering</em>, may miss free slots</td></tr>
    <tr><td><strong>Double hashing</strong></td><td>try h₁ + i·h₂(k)</td><td>best spread; h₂ must never be 0</td></tr>
  </tbody>
</table>

<h4>Worked example — linear probing, m = 7, keys 50, 700, 76, 85, 92, 73, 101</h4>
<table>
  <thead><tr><th>Key</th><th>k mod 7</th><th>Placed at</th></tr></thead>
  <tbody>
    <tr><td>50</td><td>1</td><td>1</td></tr>
    <tr><td>700</td><td>0</td><td>0</td></tr>
    <tr><td>76</td><td>6</td><td>6</td></tr>
    <tr><td>85</td><td>1 (taken)</td><td>2</td></tr>
    <tr><td>92</td><td>1 (taken, 2 taken)</td><td>3</td></tr>
    <tr><td>73</td><td>3 (taken)</td><td>4</td></tr>
    <tr><td>101</td><td>3 (taken, 4 taken)</td><td>5</td></tr>
  </tbody>
</table>
<div class="callout callout-warning"><strong>Deleting under open addressing:</strong> you cannot simply empty a slot — searches would stop early.
Mark it with a <em>tombstone</em> ("deleted") that search skips but insert may reuse.</div>

<h3>4. Load factor and rehashing</h3>
<p>Load factor α = n / m. Chaining: expected chain length α. Open addressing slows sharply as α → 1.
Java's <code>HashMap</code> doubles its table when α exceeds <strong>0.75</strong>, and since Java 8 turns a bucket with more than 8 entries into a red-black tree
(so worst case becomes O(log n) instead of O(n)).</p>

<h3>5. HashMap and HashSet in Java</h3>
<pre><code class="language-java">Map<String, Integer> freq = new HashMap<>();
for (String w : words) freq.merge(w, 1, Integer::sum);     // count
freq.getOrDefault("apple", 0);
freq.containsKey("apple");
for (Map.Entry<String, Integer> e : freq.entrySet()) System.out.println(e.getKey() + " " + e.getValue());

Set<Integer> seen = new HashSet<>();
if (!seen.add(x)) System.out.println("duplicate " + x);     // add returns false if present</code></pre>
<table>
  <thead><tr><th>Need</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>fast lookup, order irrelevant</td><td>HashMap / HashSet</td></tr>
    <tr><td>insertion order preserved</td><td>LinkedHashMap / LinkedHashSet</td></tr>
    <tr><td>sorted keys, floor/ceiling queries</td><td>TreeMap / TreeSet (O(log n))</td></tr>
  </tbody>
</table>
<p>Custom objects as keys must override <strong>both</strong> <code>equals()</code> and <code>hashCode()</code> consistently, and must not change while stored.</p>
"""
    + check("Using linear probing with table size 10 and h(k) = k mod 10, insert 12, 22, 32. Where does 32 go?",
            ["2", "3", "4", "5"], "c",
            "12 → 2, 22 collides → 3, 32 collides at 2 and 3 → 4.")
))

TOPICS.append(topic(
    "Hashing Patterns — Frequency, Two Sum, Subarray Sum = K, Coordinate Compression",
    "Unit 5 · the problems hashing turns from O(n²) into O(n)",
    r"""
<h3>1. Frequency counting</h3>
<pre><code class="language-java">// First non-repeating character
static int firstUnique(String s) {
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (int i = 0; i < s.length(); i++) if (count[s.charAt(i) - 'a'] == 1) return i;
    return -1;
}

// Majority vote winner (the lab "voting system" problem)
static String electionWinner(String[] votes) {
    Map<String, Integer> count = new HashMap<>();
    String winner = null;
    for (String v : votes) {
        int c = count.merge(v, 1, Integer::sum);
        if (winner == null || c > count.get(winner) || (c == count.get(winner) && v.compareTo(winner) < 0))
            winner = v;                                   // ties -> lexicographically smaller name
    }
    return winner;
}</code></pre>

<h3>2. Two Sum and its variants</h3>
<pre><code class="language-java">static int[] twoSum(int[] a, int target) {
    Map<Integer, Integer> indexOf = new HashMap<>();
    for (int i = 0; i < a.length; i++) {
        Integer j = indexOf.get(target - a[i]);           // have we seen the complement?
        if (j != null) return new int[]{j, i};
        indexOf.put(a[i], i);
    }
    return new int[0];
}</code></pre>
<table>
  <thead><tr><th>Variant</th><th>Approach</th></tr></thead>
  <tbody>
    <tr><td>Count pairs with sum K</td><td>add count of (K − x) seen so far, then record x</td></tr>
    <tr><td>Pairs with difference K</td><td>look up x − K and x + K</td></tr>
    <tr><td>3-Sum</td><td>sort + fix one + two pointers (hashing gets messy with duplicates)</td></tr>
    <tr><td>4-Sum count across 4 arrays</td><td>map all A+B sums, then look up −(C+D): O(n²)</td></tr>
  </tbody>
</table>

<h3>3. Subarray sum equals K (works with negatives)</h3>
<p>sum(i+1..j) = prefix[j] − prefix[i]. So a subarray ending at j sums to K exactly when some earlier prefix equals
<code>prefix[j] − K</code>. Count those prefixes with a map.</p>
<pre><code class="language-java">static int subarraySum(int[] a, int k) {
    Map<Long, Integer> seen = new HashMap<>();
    seen.put(0L, 1);                         // empty prefix: subarrays starting at index 0
    long prefix = 0;
    int count = 0;
    for (int x : a) {
        prefix += x;
        count += seen.getOrDefault(prefix - k, 0);
        seen.merge(prefix, 1, Integer::sum);
    }
    return count;
}
// [1, 2, 3], k = 3 -> 2   ([1,2] and [3])
// [1, -1, 0], k = 0 -> 3</code></pre>

<h3>4. Subarrays with constraints</h3>
<ul>
  <li><strong>Longest subarray with sum K:</strong> store the <em>first</em> index of each prefix; length = j − firstIndex[prefix − K].</li>
  <li><strong>Longest subarray with equal 0s and 1s:</strong> map 0 → −1 and look for sum 0.</li>
  <li><strong>Subarrays divisible by K:</strong> count equal values of <code>((prefix % k) + k) % k</code>.</li>
  <li><strong>At most K distinct:</strong> sliding window + HashMap of counts; exactly K = atMost(K) − atMost(K−1).</li>
</ul>

<h3>5. Coordinate compression</h3>
<p>Values up to 10⁹ but only n ≤ 10⁵ of them? Map each value to its rank so they fit array indices.</p>
<pre><code class="language-java">static int[] compress(int[] a) {
    int[] sorted = Arrays.stream(a).distinct().sorted().toArray();
    int[] rank = new int[a.length];
    for (int i = 0; i < a.length; i++) rank[i] = Arrays.binarySearch(sorted, a[i]);
    return rank;
}
// [100, 5, 2000, 5] -> [1, 0, 2, 0]</code></pre>

<h3>6. Map-based DP</h3>
<p>When DP states are sparse or huge, memoise in a HashMap instead of an array. Example — longest arithmetic subsequence
with difference d: <code>dp[x] = dp[x − d] + 1</code>, stored as <code>map.put(x, map.getOrDefault(x - d, 0) + 1)</code>.</p>

<h3>7. Lab problems from the CHO</h3>
<ul>
  <li><strong>Noise in the library:</strong> count how often each noise/student id appears and report ids above a threshold — a frequency map.</li>
  <li><strong>Balance a scale with given weights:</strong> for each weight w on one side, check whether the needed difference exists in a HashSet of the remaining weights (a two-sum style lookup).</li>
  <li><strong>Winner in a voting system:</strong> frequency map with a tie-break rule (above).</li>
</ul>
"""
    + check("For a = [3, 4, 7, 2, −3, 1, 4, 2] and k = 7, how many subarrays sum to 7?",
            ["2", "3", "4", "5"], "c",
            "[3,4], [7], [7,2,−3,1], [1,4,2] — prefix-sum hashing finds all 4 in one pass.")
))
