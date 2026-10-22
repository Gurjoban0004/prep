"""Algorithm Design & Implementation — one-page revision sheets."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Complexity Cheat Sheet — Data Structures, Sorting & Graph Algorithms",
    "Everything with a Big-O on one page",
    r"""
<h3>Input size → what will pass (≈10⁸ ops/sec)</h3>
<table>
  <thead><tr><th>n up to</th><th>Target complexity</th><th>Typical technique</th></tr></thead>
  <tbody>
    <tr><td>10–12</td><td>O(n!)</td><td>permutations</td></tr>
    <tr><td>20–25</td><td>O(2ⁿ)</td><td>subsets, bitmask DP</td></tr>
    <tr><td>500</td><td>O(n³)</td><td>interval DP, Floyd–Warshall</td></tr>
    <tr><td>5,000</td><td>O(n²)</td><td>2-D DP, all pairs</td></tr>
    <tr><td>10⁵ – 10⁶</td><td>O(n log n)</td><td>sorting, heaps, binary search</td></tr>
    <tr><td>10⁷ – 10⁸</td><td>O(n)</td><td>two pointers, prefix sums, hashing</td></tr>
    <tr><td>&gt; 10⁹</td><td>O(log n) or O(1)</td><td>math, binary search on answer</td></tr>
  </tbody>
</table>

<h3>Data structures</h3>
<table>
  <thead><tr><th>Structure</th><th>Access</th><th>Search</th><th>Insert</th><th>Delete</th><th>Java class</th></tr></thead>
  <tbody>
    <tr><td>Array</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>O(n)</td><td>int[]</td></tr>
    <tr><td>Dynamic array</td><td>O(1)</td><td>O(n)</td><td>O(1)* end</td><td>O(n)</td><td>ArrayList</td></tr>
    <tr><td>Linked list</td><td>O(n)</td><td>O(n)</td><td>O(1) at node</td><td>O(1) at node</td><td>LinkedList</td></tr>
    <tr><td>Stack / Queue / Deque</td><td>—</td><td>O(n)</td><td>O(1)</td><td>O(1)</td><td>ArrayDeque</td></tr>
    <tr><td>Hash table</td><td>—</td><td>O(1) avg</td><td>O(1) avg</td><td>O(1) avg</td><td>HashMap, HashSet</td></tr>
    <tr><td>Balanced BST</td><td>—</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>TreeMap, TreeSet</td></tr>
    <tr><td>Binary heap</td><td>top O(1)</td><td>O(n)</td><td>O(log n)</td><td>O(log n) top</td><td>PriorityQueue</td></tr>
    <tr><td>Trie</td><td>—</td><td>O(L)</td><td>O(L)</td><td>O(L)</td><td>custom</td></tr>
    <tr><td>Union-Find</td><td>—</td><td>≈O(1) find</td><td>≈O(1) union</td><td>—</td><td>custom</td></tr>
  </tbody>
</table>
<p>* amortised</p>

<h3>Sorting</h3>
<table>
  <thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr></thead>
  <tbody>
    <tr><td>Bubble</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr>
    <tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>No</td></tr>
    <tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr>
    <tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>Yes</td></tr>
    <tr><td>Quick</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>No</td></tr>
    <tr><td>Heap</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>No</td></tr>
    <tr><td>Counting</td><td>O(n + k)</td><td>O(n + k)</td><td>O(n + k)</td><td>O(k)</td><td>Yes</td></tr>
  </tbody>
</table>
<p><code>Arrays.sort(int[])</code> uses dual-pivot quicksort; <code>Arrays.sort(Object[])</code> and <code>Collections.sort</code> use TimSort (stable).</p>

<h3>Graph algorithms</h3>
<table>
  <thead><tr><th>Algorithm</th><th>Solves</th><th>Time</th><th>Remember</th></tr></thead>
  <tbody>
    <tr><td>BFS</td><td>unweighted shortest path, levels</td><td>O(V + E)</td><td>queue, mark on enqueue</td></tr>
    <tr><td>DFS</td><td>components, cycles, topo order</td><td>O(V + E)</td><td>recursion / stack</td></tr>
    <tr><td>Dijkstra</td><td>SSSP, weights ≥ 0</td><td>O((V+E) log V)</td><td>skip stale heap entries</td></tr>
    <tr><td>Bellman–Ford</td><td>SSSP with negatives</td><td>O(VE)</td><td>V−1 rounds; V-th round detects negative cycle</td></tr>
    <tr><td>Floyd–Warshall</td><td>all pairs</td><td>O(V³)</td><td>k outermost</td></tr>
    <tr><td>Kruskal</td><td>MST</td><td>O(E log E)</td><td>sort edges + DSU</td></tr>
    <tr><td>Prim</td><td>MST</td><td>O(E log V)</td><td>min-heap of crossing edges</td></tr>
    <tr><td>Kahn</td><td>topological sort</td><td>O(V + E)</td><td>in-degree 0 queue; leftovers → cycle</td></tr>
  </tbody>
</table>
"""
))

TOPICS.append(topic(
    "Pattern Recognition — Which Technique Does This Problem Want?",
    "Read the constraint, pick the tool",
    r"""
<table>
  <thead><tr><th>If the problem says…</th><th>Think</th></tr></thead>
  <tbody>
    <tr><td>sorted array, find pair / triplet</td><td>two pointers</td></tr>
    <tr><td>sorted array, find element / boundary</td><td>binary search (lower/upper bound)</td></tr>
    <tr><td>"minimum x such that it is possible"</td><td>binary search on the answer</td></tr>
    <tr><td>contiguous subarray / substring with a condition</td><td>sliding window (non-negatives) or prefix sum + HashMap</td></tr>
    <tr><td>many range-sum queries</td><td>prefix sums</td></tr>
    <tr><td>many range updates, one read</td><td>difference array</td></tr>
    <tr><td>"have we seen this before?", counts, pairs with sum</td><td>HashMap / HashSet</td></tr>
    <tr><td>next greater / smaller, spans, histogram</td><td>monotonic stack</td></tr>
    <tr><td>max/min of every window</td><td>monotonic deque</td></tr>
    <tr><td>matching brackets, undo, expression</td><td>stack</td></tr>
    <tr><td>top k, k-th largest, merge k sorted, running median</td><td>heap</td></tr>
    <tr><td>non-overlapping intervals, deadlines, ratios</td><td>greedy after sorting</td></tr>
    <tr><td>"all combinations / permutations / arrangements"</td><td>backtracking</td></tr>
    <tr><td>"number of ways", "min cost", "max value" with choices</td><td>dynamic programming</td></tr>
    <tr><td>prefix of words, autocomplete, max XOR</td><td>trie</td></tr>
    <tr><td>grid of cells, connected regions</td><td>DFS / BFS flood fill</td></tr>
    <tr><td>shortest steps, unweighted</td><td>BFS</td></tr>
    <tr><td>weighted shortest path</td><td>Dijkstra (or Bellman–Ford with negatives)</td></tr>
    <tr><td>dependencies / prerequisites order</td><td>topological sort</td></tr>
    <tr><td>group merging, "are these connected?" online</td><td>Union-Find</td></tr>
    <tr><td>connect everything at minimum cost</td><td>MST (Kruskal / Prim)</td></tr>
  </tbody>
</table>

<h3>DP recurrences to recall instantly</h3>
<table>
  <thead><tr><th>Problem</th><th>Recurrence</th></tr></thead>
  <tbody>
    <tr><td>Fibonacci / climbing stairs</td><td>dp[i] = dp[i−1] + dp[i−2]</td></tr>
    <tr><td>House robber</td><td>dp[i] = max(dp[i−1], dp[i−2] + a[i])</td></tr>
    <tr><td>Kadane</td><td>cur = max(a[i], cur + a[i])</td></tr>
    <tr><td>Coin change (min coins)</td><td>dp[x] = 1 + min(dp[x − c])</td></tr>
    <tr><td>0/1 knapsack</td><td>dp[w] = max(dp[w], v + dp[w − wt]) iterating w downward</td></tr>
    <tr><td>LIS</td><td>dp[i] = 1 + max(dp[j]) for j &lt; i, a[j] &lt; a[i]</td></tr>
    <tr><td>LCS</td><td>match: dp[i−1][j−1] + 1, else max(dp[i−1][j], dp[i][j−1])</td></tr>
    <tr><td>Edit distance</td><td>match: dp[i−1][j−1], else 1 + min(insert, delete, replace)</td></tr>
    <tr><td>Grid paths</td><td>dp[r][c] = dp[r−1][c] + dp[r][c−1]</td></tr>
    <tr><td>Matrix chain</td><td>m[i][j] = min over k of m[i][k] + m[k+1][j] + p[i−1]p[k]p[j]</td></tr>
  </tbody>
</table>

<h3>Java snippets you will type in every contest</h3>
<pre><code class="language-java">// Fast input
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
StringTokenizer st = new StringTokenizer(br.readLine());
int n = Integer.parseInt(st.nextToken());

// Sort 2-D array by second column, then first
Arrays.sort(arr, (x, y) -> x[1] != y[1] ? Integer.compare(x[1], y[1]) : Integer.compare(x[0], y[0]));

// Frequency map
Map<Integer, Integer> freq = new HashMap<>();
for (int x : a) freq.merge(x, 1, Integer::sum);

// Max-heap of pairs by value
PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> y[0] - x[0]);

// Avoid overflow
long product = (long) a * b;
int mid = lo + (hi - lo) / 2;
final int MOD = 1_000_000_007;</code></pre>

<div class="callout callout-warning">
  <strong>Classic slips:</strong> <code>==</code> on <code>Integer</code> objects above 127, forgetting <code>k %= n</code> in rotations,
  adding a list reference instead of a copy in backtracking, comparator subtraction overflow (<code>a - b</code> with large values — use <code>Integer.compare</code>),
  and marking BFS nodes when dequeued instead of when enqueued.
</div>
"""
))
