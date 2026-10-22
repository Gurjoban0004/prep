"""Algorithm Design & Implementation (24CSE0317) — ST-2: Units 6-9 (40% of the syllabus)."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Recursion Basics — Base Case, Recursion Tree, Tower of Hanoi & Binary Strings",
    "Unit 6 · trust the smaller call",
    r"""
<h3>1. Anatomy of a recursive function</h3>
<ol>
  <li><strong>Base case</strong> — the smallest input answered directly. Missing it → infinite recursion → <code>StackOverflowError</code>.</li>
  <li><strong>Recursive case</strong> — reduce the problem and call yourself.</li>
  <li><strong>Leap of faith</strong> — assume the smaller call is correct; only check that you combine it correctly.</li>
</ol>
<pre><code class="language-java">static int sumDigits(int n) {
    if (n < 10) return n;                 // base case
    return n % 10 + sumDigits(n / 10);    // last digit + sum of the rest
}

static boolean isPalindrome(String s, int i, int j) {
    if (i >= j) return true;
    return s.charAt(i) == s.charAt(j) && isPalindrome(s, i + 1, j - 1);
}

static double power(double x, int n) {    // fast exponentiation, O(log n)
    if (n == 0) return 1;
    double half = power(x, n / 2);
    return n % 2 == 0 ? half * half : half * half * x;
}</code></pre>

<h3>2. Head vs tail recursion</h3>
<pre><code class="language-java">static void printDown(int n) { if (n == 0) return; System.out.print(n + " "); printDown(n - 1); } // 3 2 1
static void printUp(int n)   { if (n == 0) return; printUp(n - 1); System.out.print(n + " "); }   // 1 2 3</code></pre>
<p>Work done <em>before</em> the call happens on the way down; work <em>after</em> happens on the way back up (stack unwinding).</p>

<h3>3. Recursion tree</h3>
<p>Draw each call as a node with its children as the calls it makes. The tree tells you:</p>
<ul>
  <li><strong>number of nodes</strong> → time complexity</li>
  <li><strong>height</strong> → stack space</li>
  <li><strong>repeated nodes</strong> → a hint that memoization will help</li>
</ul>
<p>Depth-first search is exactly this: a recursive walk that fully explores one branch before backtracking to the next.</p>

<h3>4. Tower of Hanoi</h3>
<p>Move n discs from A to C using B, never placing a larger disc on a smaller one.</p>
<pre><code class="language-java">static int moves = 0;
static void hanoi(int n, char from, char via, char to) {
    if (n == 0) return;
    hanoi(n - 1, from, to, via);                               // park n-1 discs on the helper
    System.out.println("Move disc " + n + " " + from + " -> " + to);
    moves++;
    hanoi(n - 1, via, from, to);                               // bring them onto disc n
}
// hanoi(3, 'A', 'B', 'C') prints 7 moves</code></pre>
<div class="formula">T(n) = 2T(n − 1) + 1 &nbsp;⇒&nbsp; moves = 2ⁿ − 1 &nbsp;&nbsp; (n = 3 → 7, n = 10 → 1023)</div>

<h3>5. Print all binary strings of n bits</h3>
<pre><code class="language-java">static void binaryStrings(int n, StringBuilder cur) {
    if (cur.length() == n) { System.out.println(cur); return; }
    for (char bit : new char[]{'0', '1'}) {
        cur.append(bit);                 // choose
        binaryStrings(n, cur);           // explore
        cur.deleteCharAt(cur.length() - 1);  // un-choose
    }
}
// n = 3 -> 000 001 010 011 100 101 110 111  (2^n strings, O(n·2^n) to print)

// Variant: no two consecutive 1s
static void noConsecutiveOnes(int n, String cur, char last) {
    if (cur.length() == n) { System.out.println(cur); return; }
    noConsecutiveOnes(n, cur + "0", '0');
    if (last != '1') noConsecutiveOnes(n, cur + "1", '1');
}</code></pre>
<p>The count of n-bit strings without consecutive 1s is the Fibonacci number F(n+2): n = 3 → 5.</p>
"""
    + check("How many moves does Tower of Hanoi need for 5 discs?",
            ["25", "31", "32", "63"], "b",
            "2ⁿ − 1 = 2⁵ − 1 = 31.")
))

TOPICS.append(topic(
    "Backtracking Patterns — Subsets, Permutations & Combinations",
    "Unit 6 · choose, explore, un-choose",
    r"""
<p>Backtracking explores a tree of partial solutions. At each node: <strong>choose</strong> an option, <strong>explore</strong> recursively,
then <strong>un-choose</strong> to restore state before trying the next option. <strong>Pruning</strong> cuts branches that cannot lead to a valid answer.</p>

<pre><code class="language-java">void backtrack(State s) {
    if (isComplete(s)) { record(s); return; }
    for (Choice c : choices(s)) {
        if (!isValid(s, c)) continue;     // prune
        apply(s, c);
        backtrack(s);
        undo(s, c);
    }
}</code></pre>

<h3>1. Subsets (power set) — 2ⁿ results</h3>
<pre><code class="language-java">static void subsets(int[] a, int i, List<Integer> cur, List<List<Integer>> out) {
    if (i == a.length) { out.add(new ArrayList<>(cur)); return; }   // copy! cur keeps changing
    subsets(a, i + 1, cur, out);            // exclude a[i]
    cur.add(a[i]);
    subsets(a, i + 1, cur, out);            // include a[i]
    cur.remove(cur.size() - 1);
}</code></pre>
<p>Bitmask alternative: for mask in 0..2ⁿ−1, bit j set → include a[j]. With duplicates in input: sort, and skip
<code>a[i] == a[i-1]</code> when a[i−1] was not taken at this level.</p>

<h3>2. Permutations of a string — n! results</h3>
<pre><code class="language-java">static void permute(char[] s, int k, List<String> out) {
    if (k == s.length) { out.add(new String(s)); return; }
    Set<Character> usedHere = new HashSet<>();      // skip duplicate letters at this position
    for (int i = k; i < s.length; i++) {
        if (!usedHere.add(s[i])) continue;
        swap(s, k, i);                  // choose s[i] for position k
        permute(s, k + 1, out);
        swap(s, k, i);                  // un-choose
    }
}
// "abc" -> abc acb bac bca cba cab ;  "aab" -> 3 distinct permutations</code></pre>

<h3>3. Combinations — choose k of n</h3>
<pre><code class="language-java">static void combine(int n, int k, int start, List<Integer> cur, List<List<Integer>> out) {
    if (cur.size() == k) { out.add(new ArrayList<>(cur)); return; }
    for (int i = start; i <= n - (k - cur.size()) + 1; i++) {   // prune: enough numbers must remain
        cur.add(i);
        combine(n, k, i + 1, cur, out);
        cur.remove(cur.size() - 1);
    }
}

// Combination sum: numbers may repeat, reach target
static void combinationSum(int[] c, int target, int start, List<Integer> cur, List<List<Integer>> out) {
    if (target == 0) { out.add(new ArrayList<>(cur)); return; }
    for (int i = start; i < c.length && c[i] <= target; i++) {   // c sorted -> prune early
        cur.add(c[i]);
        combinationSum(c, target - c[i], i, cur, out);          // i, not i+1: reuse allowed
        cur.remove(cur.size() - 1);
    }
}</code></pre>

<h3>4. Counting the search space</h3>
<table>
  <thead><tr><th>Problem</th><th>Answers</th><th>Time</th></tr></thead>
  <tbody>
    <tr><td>Subsets of n</td><td>2ⁿ</td><td>O(n · 2ⁿ)</td></tr>
    <tr><td>Permutations of n</td><td>n!</td><td>O(n · n!)</td></tr>
    <tr><td>Combinations C(n, k)</td><td>n! / (k!(n−k)!)</td><td>O(k · C(n, k))</td></tr>
  </tbody>
</table>
<div class="callout callout-warning"><strong>Most common bug:</strong> adding <code>cur</code> itself to the result list. Every entry then points at the same list, which ends empty. Always add a copy.</div>
"""
    + check("How many subsets does a set of 6 elements have (including the empty set)?",
            ["36", "64", "720", "63"], "b",
            "Each element is either in or out: 2⁶ = 64.")
    + check("How many distinct permutations does \"AABB\" have?",
            ["24", "12", "6", "4"], "c",
            "4! / (2! · 2!) = 24 / 4 = 6.")
))

TOPICS.append(topic(
    "Classic Backtracking — N-Queens, Sudoku, Rat in a Maze & Robot in a Grid",
    "Unit 6 · constraint satisfaction with pruning",
    r"""
<h3>1. N-Queens</h3>
<p>Place n queens so none attack each other. Go row by row; for each row try every column that is not attacked.
Track attacked columns and both diagonals in O(1) with boolean arrays:</p>
<ul>
  <li>column c</li>
  <li>main diagonal: <code>row − col</code> is constant → index <code>row − col + n − 1</code></li>
  <li>anti-diagonal: <code>row + col</code> is constant</li>
</ul>
<pre><code class="language-java">static int solveNQueens(int n) {
    return place(0, n, new boolean[n], new boolean[2 * n - 1], new boolean[2 * n - 1]);
}
static int place(int row, int n, boolean[] col, boolean[] diag, boolean[] anti) {
    if (row == n) return 1;                                   // all queens placed
    int ways = 0;
    for (int c = 0; c < n; c++) {
        int d = row - c + n - 1, a = row + c;
        if (col[c] || diag[d] || anti[a]) continue;           // prune attacked squares
        col[c] = diag[d] = anti[a] = true;
        ways += place(row + 1, n, col, diag, anti);
        col[c] = diag[d] = anti[a] = false;                   // backtrack
    }
    return ways;
}
// n = 4 -> 2 solutions, n = 8 -> 92 solutions</code></pre>

<h3>2. Sudoku solver</h3>
<pre><code class="language-java">static boolean solveSudoku(char[][] b) {
    for (int r = 0; r < 9; r++)
        for (int c = 0; c < 9; c++)
            if (b[r][c] == '.') {
                for (char d = '1'; d <= '9'; d++) {
                    if (canPlace(b, r, c, d)) {
                        b[r][c] = d;
                        if (solveSudoku(b)) return true;
                        b[r][c] = '.';                         // undo
                    }
                }
                return false;                                  // no digit fits: backtrack
            }
    return true;                                               // no empty cell left
}
static boolean canPlace(char[][] b, int r, int c, char d) {
    for (int i = 0; i < 9; i++) {
        if (b[r][i] == d || b[i][c] == d) return false;
        if (b[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == d) return false;   // 3x3 box
    }
    return true;
}</code></pre>
<p>Speed-ups: keep row/column/box bitmasks instead of scanning, and fill the cell with the fewest candidates first.</p>

<h3>3. Rat in a Maze — all paths</h3>
<pre><code class="language-java">static void ratPaths(int[][] m, int r, int c, boolean[][] seen, StringBuilder path, List<String> out) {
    int n = m.length;
    if (r < 0 || c < 0 || r >= n || c >= n || m[r][c] == 0 || seen[r][c]) return;
    if (r == n - 1 && c == n - 1) { out.add(path.toString()); return; }
    seen[r][c] = true;
    int[][] dirs = {{1, 0}, {0, -1}, {0, 1}, {-1, 0}};   // D, L, R, U (lexicographic order)
    String names = "DLRU";
    for (int k = 0; k < 4; k++) {
        path.append(names.charAt(k));
        ratPaths(m, r + dirs[k][0], c + dirs[k][1], seen, path, out);
        path.deleteCharAt(path.length() - 1);
    }
    seen[r][c] = false;                                   // free the cell for other paths
}</code></pre>

<h3>4. Robot in a grid</h3>
<p>Robot at the top-left moves only right or down; some cells are blocked. <em>Find a path</em> with backtracking, or <em>count paths</em> with DP:</p>
<pre><code class="language-java">static long countPaths(int[][] grid) {          // 1 = blocked
    int R = grid.length, C = grid[0].length;
    long[][] dp = new long[R][C];
    for (int r = 0; r < R; r++)
        for (int c = 0; c < C; c++) {
            if (grid[r][c] == 1) continue;
            if (r == 0 && c == 0) { dp[r][c] = 1; continue; }
            dp[r][c] = (r > 0 ? dp[r - 1][c] : 0) + (c > 0 ? dp[r][c - 1] : 0);
        }
    return dp[R - 1][C - 1];
}</code></pre>
<p>Without obstacles the answer is C(R+C−2, R−1): a 3 × 3 grid has C(4, 2) = 6 paths.</p>

<h3>5. Pruning and the jump to DP</h3>
<ul>
  <li><strong>Pruning</strong> checks constraints as early as possible (sorted candidates + break, bounds on remaining sum).</li>
  <li>When the recursion tree has <strong>repeated states</strong>, cache them — backtracking becomes memoized DP. See the next topic.</li>
</ul>
"""
    + check("In N-Queens, which value is identical for all squares on the same anti-diagonal?",
            ["row − col", "row + col", "row × col", "|row − col|"], "b",
            "Moving along an anti-diagonal increases row by 1 and decreases col by 1, so row + col stays the same.")
))

TOPICS.append(topic(
    "From Backtracking to DP — 0/1 Knapsack, Counting Steps & Matrix Chain Multiplication",
    "Unit 6 · memoization and tabulation",
    r"""
<h3>1. Memoization (top-down) vs tabulation (bottom-up)</h3>
<table>
  <thead><tr><th></th><th>Memoization</th><th>Tabulation</th></tr></thead>
  <tbody>
    <tr><td>Shape</td><td>recursion + cache</td><td>loops filling a table</td></tr>
    <tr><td>Computes</td><td>only states actually reached</td><td>every state</td></tr>
    <tr><td>Risk</td><td>deep recursion (stack overflow)</td><td>must pick a valid fill order</td></tr>
    <tr><td>Space optimisation</td><td>hard</td><td>often keep only the last row</td></tr>
  </tbody>
</table>

<h3>2. Count ways to cover distance N with steps of 1, 2 or 3</h3>
<div class="formula">ways(n) = ways(n−1) + ways(n−2) + ways(n−3), &nbsp; ways(0) = 1, negatives = 0</div>
<pre><code class="language-java">static long countWays(int n) {
    long[] dp = new long[Math.max(n + 1, 3)];
    dp[0] = 1; dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    return dp[n];
}
// n = 3 -> 4  (1+1+1, 1+2, 2+1, 3);  n = 4 -> 7</code></pre>

<h3>3. 0/1 Knapsack</h3>
<p>dp[i][w] = best value using the first i items with capacity w.</p>
<div class="formula">dp[i][w] = max( dp[i−1][w], &nbsp; value[i] + dp[i−1][w − weight[i]] &nbsp;if weight[i] ≤ w )</div>
<pre><code class="language-java">static int knapsack(int[] wt, int[] val, int W) {
    int[] dp = new int[W + 1];                     // 1-D: dp[w] for items seen so far
    for (int i = 0; i < wt.length; i++)
        for (int w = W; w >= wt[i]; w--)           // go DOWN so each item is used at most once
            dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
    return dp[W];
}
// wt {1,3,4,5}, val {1,4,5,7}, W = 7 -> 9 (items of weight 3 and 4)</code></pre>
<div class="callout callout-key"><strong>Iterating w upward</strong> would let an item be reused — that is the <em>unbounded</em> knapsack. Direction encodes the rule. Time O(n·W), space O(W).</div>

<h3>4. Matrix Chain Multiplication (MCM)</h3>
<p>Matrices A₁…Aₙ where Aᵢ has dimensions p[i−1] × p[i]. Multiplying a×b by b×c costs a·b·c.
Find the parenthesisation with the fewest scalar multiplications.</p>
<div class="formula">m[i][j] = min over i ≤ k &lt; j of ( m[i][k] + m[k+1][j] + p[i−1]·p[k]·p[j] ), &nbsp; m[i][i] = 0</div>
<pre><code class="language-java">static int matrixChain(int[] p) {                  // n matrices -> p has n+1 entries
    int n = p.length - 1;
    int[][] m = new int[n + 1][n + 1];
    for (int len = 2; len <= n; len++)             // chain length: fill short chains first
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            m[i][j] = Integer.MAX_VALUE;
            for (int k = i; k < j; k++)
                m[i][j] = Math.min(m[i][j], m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]);
        }
    return m[1][n];
}
// p = {10, 30, 5, 60}: (A1 A2) A3 = 10·30·5 + 10·5·60 = 1500 + 3000 = 4500
//                      A1 (A2 A3) = 30·5·60 + 10·30·60 = 9000 + 18000 = 27000  -> answer 4500</code></pre>
<p>O(n³) time, O(n²) space. The "interval DP" shape (solve by increasing length) also fits burst balloons, palindrome partitioning and optimal BST.</p>
"""
    + check("Matrices of sizes 2×3, 3×4 and 4×5 (p = {2,3,4,5}). Minimum scalar multiplications?",
            ["64", "60", "90", "84"], "a",
            "(AB)C = 2·3·4 + 2·4·5 = 24 + 40 = 64. A(BC) = 3·4·5 + 2·3·5 = 60 + 30 = 90. Minimum is 64.")
))

TOPICS.append(topic(
    "Trees — Terminology, DFS Traversals (Pre, In, Post) & BFS",
    "Unit 7 · the shape behind hierarchies",
    r"""
<h3>1. Vocabulary</h3>
<table>
  <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>Root / leaf</td><td>node with no parent / node with no children</td></tr>
    <tr><td>Depth of a node</td><td>edges from the root to it (root depth 0)</td></tr>
    <tr><td>Height of a tree</td><td>edges on the longest root-to-leaf path (some books count nodes)</td></tr>
    <tr><td>Full binary tree</td><td>every node has 0 or 2 children</td></tr>
    <tr><td>Complete binary tree</td><td>all levels full except possibly the last, filled left to right (heaps)</td></tr>
    <tr><td>Perfect binary tree</td><td>all internal nodes have 2 children and all leaves share a level: 2^(h+1) − 1 nodes</td></tr>
    <tr><td>Balanced</td><td>height is O(log n)</td></tr>
  </tbody>
</table>

<pre><code class="language-java">class Node {
    int val;
    Node left, right;
    Node(int val) { this.val = val; }
}</code></pre>

<h3>2. Depth-first traversals</h3>
<pre><code class="language-java">static void preorder(Node n)  { if (n == null) return; visit(n); preorder(n.left); preorder(n.right); }  // Root L R
static void inorder(Node n)   { if (n == null) return; inorder(n.left); visit(n); inorder(n.right); }    // L Root R
static void postorder(Node n) { if (n == null) return; postorder(n.left); postorder(n.right); visit(n); } // L R Root</code></pre>
<p>For the tree with root 1, children 2 and 3, and 2's children 4 and 5:</p>
<table>
  <thead><tr><th>Traversal</th><th>Order</th><th>Used for</th></tr></thead>
  <tbody>
    <tr><td>Preorder</td><td>1 2 4 5 3</td><td>copying / serialising a tree</td></tr>
    <tr><td>Inorder</td><td>4 2 5 1 3</td><td>sorted order of a BST</td></tr>
    <tr><td>Postorder</td><td>4 5 2 3 1</td><td>deleting a tree, evaluating expression trees, heights</td></tr>
    <tr><td>Level order (BFS)</td><td>1 2 3 4 5</td><td>shortest levels, printing by level</td></tr>
  </tbody>
</table>

<h3>3. Iterative inorder with a stack</h3>
<pre><code class="language-java">static List<Integer> inorderIterative(Node root) {
    List<Integer> out = new ArrayList<>();
    Deque<Node> st = new ArrayDeque<>();
    Node cur = root;
    while (cur != null || !st.isEmpty()) {
        while (cur != null) { st.push(cur); cur = cur.left; }   // go as far left as possible
        cur = st.pop();
        out.add(cur.val);
        cur = cur.right;
    }
    return out;
}</code></pre>

<h3>4. Level order traversal (BFS)</h3>
<pre><code class="language-java">static List<List<Integer>> levelOrder(Node root) {
    List<List<Integer>> levels = new ArrayList<>();
    if (root == null) return levels;
    Queue<Node> q = new ArrayDeque<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();                  // nodes on this level
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            Node n = q.poll();
            level.add(n.val);
            if (n.left != null) q.offer(n.left);
            if (n.right != null) q.offer(n.right);
        }
        levels.add(level);
    }
    return levels;
}</code></pre>

<h3>5. Rebuilding a tree from traversals</h3>
<p>Preorder + inorder (or postorder + inorder) identify a unique binary tree: the first preorder value is the root;
its position in inorder splits the left and right subtrees. Preorder + postorder alone is <strong>not</strong> enough unless the tree is full.</p>
"""
    + check("Preorder = A B D E C F, inorder = D B E A F C. What is the postorder?",
            ["D E B F C A", "D B E F C A", "E D B F C A", "D E B C F A"], "a",
            "Root A; left subtree (D B E) has root B with children D and E; right subtree (F C) has root C with left child F. Postorder: D E B F C A.")
))

TOPICS.append(topic(
    "Recursive Tree Problems — Height, Diameter, LCA, Path Sum & Tree DP",
    "Unit 7 · solve for children, combine at the parent",
    r"""
<h3>1. Height</h3>
<pre><code class="language-java">static int height(Node n) {           // edges; return -1 for empty so a leaf has height 0
    if (n == null) return -1;
    return 1 + Math.max(height(n.left), height(n.right));
}</code></pre>

<h3>2. Diameter — longest path between any two nodes</h3>
<p>The longest path either passes through a node (left height + right height + 2 edges) or lies entirely inside one subtree.
Compute heights bottom-up and update a global best: O(n), versus O(n²) if you call height() from every node.</p>
<pre><code class="language-java">static int diameter;
static int depth(Node n) {            // returns height in nodes
    if (n == null) return 0;
    int l = depth(n.left), r = depth(n.right);
    diameter = Math.max(diameter, l + r);     // edges on the path through n
    return 1 + Math.max(l, r);
}</code></pre>

<h3>3. Lowest Common Ancestor</h3>
<h4>In a binary tree</h4>
<pre><code class="language-java">static Node lca(Node root, Node p, Node q) {
    if (root == null || root == p || root == q) return root;
    Node left = lca(root.left, p, q), right = lca(root.right, p, q);
    if (left != null && right != null) return root;    // p and q split here
    return left != null ? left : right;
}</code></pre>
<h4>In a BST — use the ordering, O(h)</h4>
<pre><code class="language-java">static Node lcaBst(Node root, int p, int q) {
    while (root != null) {
        if (p < root.val && q < root.val) root = root.left;
        else if (p > root.val && q > root.val) root = root.right;
        else return root;                                // split point (or equal to one of them)
    }
    return null;
}</code></pre>

<h3>4. Path sums</h3>
<pre><code class="language-java">// Root-to-leaf path with the given sum?
static boolean hasPathSum(Node n, int target) {
    if (n == null) return false;
    if (n.left == null && n.right == null) return target == n.val;
    return hasPathSum(n.left, target - n.val) || hasPathSum(n.right, target - n.val);
}

// Maximum path sum between ANY two nodes (values may be negative)
static int best = Integer.MIN_VALUE;
static int maxGain(Node n) {
    if (n == null) return 0;
    int l = Math.max(0, maxGain(n.left));    // drop a branch that only hurts
    int r = Math.max(0, maxGain(n.right));
    best = Math.max(best, n.val + l + r);    // path bending at n
    return n.val + Math.max(l, r);           // a parent may extend only one branch
}</code></pre>

<h3>5. Tree DP — maximum independent set (House Robber III)</h3>
<p>Choose nodes with maximum total value so that no two chosen nodes are parent and child. Return two numbers per node:
the best with the node <em>taken</em> and with it <em>skipped</em>.</p>
<pre><code class="language-java">static int[] rob(Node n) {                 // {take, skip}
    if (n == null) return new int[]{0, 0};
    int[] l = rob(n.left), r = rob(n.right);
    int take = n.val + l[1] + r[1];                          // children must be skipped
    int skip = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);  // children free to choose
    return new int[]{take, skip};
}
// answer = max(rob(root)[0], rob(root)[1])</code></pre>
<div class="callout callout-key"><strong>Pattern:</strong> post-order traversal that returns a small tuple describing the subtree. Diameter, max path sum,
balanced-tree check and tree DP all follow it.</div>
"""
    + check("A binary tree is a straight chain of 5 nodes (each has only a left child). Its diameter in edges is:",
            ["2", "4", "5", "3"], "b",
            "The longest path runs from the top node to the bottom leaf: 4 edges.")
))

TOPICS.append(topic(
    "Binary Search Trees — Search, Insert, Delete, Validate & Queries",
    "Unit 7 · left < root < right, everywhere",
    r"""
<h3>1. The property</h3>
<p>For every node, all keys in the left subtree are smaller and all keys in the right subtree are larger.
Consequence: <strong>inorder traversal of a BST is sorted</strong>. Search, insert and delete take O(h): O(log n) when balanced,
O(n) for a skewed tree (sorted insertions produce a linked list).</p>

<h3>2. Search and insert</h3>
<pre><code class="language-java">static Node search(Node root, int key) {
    while (root != null && root.val != key) root = key < root.val ? root.left : root.right;
    return root;
}

static Node insert(Node root, int key) {
    if (root == null) return new Node(key);
    if (key < root.val) root.left = insert(root.left, key);
    else if (key > root.val) root.right = insert(root.right, key);
    return root;                               // duplicates ignored
}</code></pre>

<h3>3. Delete — three cases</h3>
<ol>
  <li><strong>Leaf</strong> — remove it.</li>
  <li><strong>One child</strong> — replace the node with its child.</li>
  <li><strong>Two children</strong> — copy the <em>inorder successor</em> (smallest key in the right subtree) into the node, then delete the successor.</li>
</ol>
<pre><code class="language-java">static Node delete(Node root, int key) {
    if (root == null) return null;
    if (key < root.val) root.left = delete(root.left, key);
    else if (key > root.val) root.right = delete(root.right, key);
    else {
        if (root.left == null) return root.right;         // cases 1 and 2
        if (root.right == null) return root.left;
        Node succ = root.right;
        while (succ.left != null) succ = succ.left;
        root.val = succ.val;                              // case 3
        root.right = delete(root.right, succ.val);
    }
    return root;
}</code></pre>

<h3>4. Validate a BST</h3>
<p>Checking only <code>left.val &lt; node.val &lt; right.val</code> is <strong>wrong</strong>: a deep grandchild can still break the rule.
Pass down the allowed range.</p>
<pre><code class="language-java">static boolean isValid(Node n, long lo, long hi) {
    if (n == null) return true;
    if (n.val <= lo || n.val >= hi) return false;
    return isValid(n.left, lo, n.val) && isValid(n.right, n.val, hi);
}
// isValid(root, Long.MIN_VALUE, Long.MAX_VALUE)</code></pre>

<h3>5. Queries</h3>
<pre><code class="language-java">// k-th smallest: inorder, stop at the k-th visit
static int count = 0, answer = -1;
static void kthSmallest(Node n, int k) {
    if (n == null || count >= k) return;
    kthSmallest(n.left, k);
    if (++count == k) { answer = n.val; return; }
    kthSmallest(n.right, k);
}

// Range sum of keys in [lo, hi] — skip whole subtrees that are out of range
static int rangeSum(Node n, int lo, int hi) {
    if (n == null) return 0;
    if (n.val < lo) return rangeSum(n.right, lo, hi);
    if (n.val > hi) return rangeSum(n.left, lo, hi);
    return n.val + rangeSum(n.left, lo, hi) + rangeSum(n.right, lo, hi);
}

// Floor: largest key <= x
static Integer floor(Node n, int x) {
    Integer best = null;
    while (n != null) {
        if (n.val == x) return x;
        if (n.val < x) { best = n.val; n = n.right; } else n = n.left;
    }
    return best;
}
// Ceil is symmetric: record n.val when n.val > x and go left.</code></pre>
<p>Java's <code>TreeMap</code>/<code>TreeSet</code> are balanced BSTs (red-black) with <code>floorKey</code>, <code>ceilingKey</code>, <code>headMap</code>, <code>tailMap</code> built in.</p>
"""
    + check("Insert 50, 30, 70, 20, 40, 60, 80 into an empty BST, then delete 50 using the inorder successor. What is the new root?",
            ["40", "60", "70", "30"], "b",
            "50 has two children; its inorder successor is the smallest key in the right subtree, 60, which replaces it.")
))

TOPICS.append(topic(
    "Tries — Insert, Search, Prefix Problems, Trie + DP & Trie + Greedy",
    "Unit 7 · a tree keyed by characters",
    r"""
<h3>1. Structure</h3>
<p>Each node has up to 26 children (for lowercase words) and a flag marking the end of a word.
A path from the root spells a prefix. Insert and search cost <strong>O(L)</strong> for a word of length L, independent of how many words are stored.</p>
<pre><code class="language-java">class Trie {
    private static class TrieNode {
        TrieNode[] next = new TrieNode[26];
        boolean end;
        int prefixCount;              // words passing through this node
    }
    private final TrieNode root = new TrieNode();

    void insert(String w) {
        TrieNode n = root;
        for (char c : w.toCharArray()) {
            if (n.next[c - 'a'] == null) n.next[c - 'a'] = new TrieNode();
            n = n.next[c - 'a'];
            n.prefixCount++;
        }
        n.end = true;
    }
    private TrieNode walk(String s) {
        TrieNode n = root;
        for (char c : s.toCharArray()) {
            n = n.next[c - 'a'];
            if (n == null) return null;
        }
        return n;
    }
    boolean search(String w)       { TrieNode n = walk(w); return n != null && n.end; }
    boolean startsWith(String p)   { return walk(p) != null; }
    int countWithPrefix(String p)  { TrieNode n = walk(p); return n == null ? 0 : n.prefixCount; }
}</code></pre>

<h3>2. Trie vs HashSet</h3>
<table>
  <thead><tr><th></th><th>Trie</th><th>HashSet&lt;String&gt;</th></tr></thead>
  <tbody>
    <tr><td>Exact lookup</td><td>O(L)</td><td>O(L) to hash</td></tr>
    <tr><td>Prefix queries / autocomplete</td><td>natural</td><td>scan everything</td></tr>
    <tr><td>Sorted iteration</td><td>DFS in child order</td><td>no</td></tr>
    <tr><td>Memory</td><td>heavy (26 pointers per node)</td><td>lighter</td></tr>
  </tbody>
</table>

<h3>3. Prefix problems</h3>
<ul>
  <li><strong>Autocomplete:</strong> walk to the prefix node, then DFS to collect words.</li>
  <li><strong>Longest common prefix</strong> of all words: walk down while the node has exactly one child and is not a word end.</li>
  <li><strong>Replace words with their shortest root</strong> ("cattle" → "cat"): stop at the first <code>end</code> node while walking.</li>
</ul>

<h3>4. Trie + DP — word break</h3>
<p>Can "applepenapple" be split into dictionary words? dp[i] = true if s[0..i) can be split.
From each reachable i, walk the trie along s[i..] and mark dp[j] for every word end hit.</p>
<pre><code class="language-java">static boolean wordBreak(String s, TrieNode root) {   // TrieNode as above, fields accessible
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 0; i < s.length(); i++) {
        if (!dp[i]) continue;
        TrieNode n = root;
        for (int j = i; j < s.length(); j++) {
            n = n.next[s.charAt(j) - 'a'];
            if (n == null) break;               // no dictionary word continues this way
            if (n.end) dp[j + 1] = true;
        }
    }
    return dp[s.length()];
}</code></pre>

<h3>5. Trie + greedy — maximum XOR of two numbers</h3>
<p>Insert every number as a 31-bit binary string (most significant bit first). For each number, walk the trie and at every bit
greedily go to the <em>opposite</em> bit if it exists — a 1 in a higher position beats anything below it.</p>
<pre><code class="language-java">static int maxXor(int[] nums) {
    int[][] child = new int[nums.length * 31 + 1][2];
    int nodes = 1, best = 0;
    for (int x : nums) {                                    // insert
        int cur = 0;
        for (int b = 30; b >= 0; b--) {
            int bit = (x >> b) & 1;
            if (child[cur][bit] == 0) child[cur][bit] = nodes++;
            cur = child[cur][bit];
        }
    }
    for (int x : nums) {                                    // query greedily
        int cur = 0, xor = 0;
        for (int b = 30; b >= 0; b--) {
            int want = 1 - ((x >> b) & 1);
            if (child[cur][want] != 0) { xor |= 1 << b; cur = child[cur][want]; }
            else cur = child[cur][1 - want];
        }
        best = Math.max(best, xor);
    }
    return best;
}
// [3, 10, 5, 25, 2, 8] -> 28 (5 ^ 25)</code></pre>
"""
    + check("A trie stores 10,000 English words. Checking whether \"prep\" is stored costs time proportional to:",
            ["10,000", "log 10,000", "4, the length of the word", "26"], "c",
            "Trie operations walk one node per character, so the cost depends on the word length, not the number of words.")
))

TOPICS.append(topic(
    "Heaps & Priority Queues — Operations, Heap Sort, Streams & Max-Heap Check",
    "Unit 8 · always know the smallest (or largest) in O(1)",
    r"""
<h3>1. Binary heap</h3>
<ul>
  <li>A <strong>complete binary tree</strong> stored in an array (no pointers needed).</li>
  <li><strong>Max-heap:</strong> every parent ≥ its children, so the maximum is at index 0. Min-heap is the reverse.</li>
  <li>For index i (0-based): parent <code>(i − 1) / 2</code>, left <code>2i + 1</code>, right <code>2i + 2</code>.</li>
</ul>

<h3>2. Operations</h3>
<table>
  <thead><tr><th>Operation</th><th>How</th><th>Time</th></tr></thead>
  <tbody>
    <tr><td>peek</td><td>read a[0]</td><td>O(1)</td></tr>
    <tr><td>insert</td><td>append at the end, <strong>sift up</strong> while larger than parent</td><td>O(log n)</td></tr>
    <tr><td>extract max</td><td>move last element to root, <strong>sift down</strong> swapping with the larger child</td><td>O(log n)</td></tr>
    <tr><td>build heap</td><td>sift down every non-leaf from the last one to the root</td><td><strong>O(n)</strong></td></tr>
  </tbody>
</table>
<pre><code class="language-java">class MaxHeap {
    private int[] a = new int[16];
    private int size = 0;

    void push(int x) {
        if (size == a.length) a = Arrays.copyOf(a, size * 2);
        a[size] = x;
        int i = size++;
        while (i > 0 && a[(i - 1) / 2] < a[i]) { swap(i, (i - 1) / 2); i = (i - 1) / 2; }
    }
    int pop() {
        int top = a[0];
        a[0] = a[--size];
        siftDown(0);
        return top;
    }
    private void siftDown(int i) {
        while (true) {
            int l = 2 * i + 1, r = l + 1, big = i;
            if (l < size && a[l] > a[big]) big = l;
            if (r < size && a[r] > a[big]) big = r;
            if (big == i) return;
            swap(i, big);
            i = big;
        }
    }
    private void swap(int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}</code></pre>
<div class="callout callout-key"><strong>Why build-heap is O(n):</strong> half the nodes are leaves (no work), a quarter sift down at most 1 level, an eighth at most 2…
The sum n/4·1 + n/8·2 + n/16·3 + … is bounded by n.</div>

<h3>3. Heap sort — O(n log n), in place, not stable</h3>
<pre><code class="language-java">static void heapSort(int[] a) {
    int n = a.length;
    for (int i = n / 2 - 1; i >= 0; i--) siftDown(a, n, i);      // build max-heap
    for (int end = n - 1; end > 0; end--) {
        int t = a[0]; a[0] = a[end]; a[end] = t;                   // move max to the end
        siftDown(a, end, 0);                                       // restore heap on the rest
    }
}
static void siftDown(int[] a, int n, int i) {
    while (true) {
        int l = 2 * i + 1, r = l + 1, big = i;
        if (l < n && a[l] > a[big]) big = l;
        if (r < n && a[r] > a[big]) big = r;
        if (big == i) return;
        int t = a[i]; a[i] = a[big]; a[big] = t;
        i = big;
    }
}</code></pre>

<h3>4. PriorityQueue in Java</h3>
<pre><code class="language-java">PriorityQueue<Integer> minHeap = new PriorityQueue<>();
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
PriorityQueue<int[]> byDistance = new PriorityQueue<>((x, y) -> Integer.compare(x[1], y[1]));
// offer / poll O(log n), peek O(1), remove(Object) O(n), iteration order is NOT sorted</code></pre>

<h3>5. Continuous stream of data</h3>
<pre><code class="language-java">// k-th largest so far: keep a MIN-heap of size k; its top is the answer
static int kthLargest(PriorityQueue<Integer> heap, int k, int x) {
    heap.offer(x);
    if (heap.size() > k) heap.poll();
    return heap.peek();
}

// Running median: max-heap for the lower half, min-heap for the upper half
class MedianFinder {
    PriorityQueue<Integer> low = new PriorityQueue<>(Comparator.reverseOrder());
    PriorityQueue<Integer> high = new PriorityQueue<>();
    void add(int x) {
        low.offer(x);
        high.offer(low.poll());                    // keep every low <= every high
        if (high.size() > low.size()) low.offer(high.poll());   // low may hold one extra
    }
    double median() {
        return low.size() > high.size() ? low.peek() : (low.peek() + high.peek()) / 2.0;
    }
}</code></pre>

<h3>6. Check whether a binary tree is a max-heap</h3>
<p>Two conditions: the tree is <strong>complete</strong>, and every node is ≥ its children.</p>
<pre><code class="language-java">static int count(Node n) { return n == null ? 0 : 1 + count(n.left) + count(n.right); }
static boolean isComplete(Node n, int index, int total) {        // array index must stay < total
    if (n == null) return true;
    if (index >= total) return false;
    return isComplete(n.left, 2 * index + 1, total) && isComplete(n.right, 2 * index + 2, total);
}
static boolean heapOrder(Node n) {
    if (n == null) return true;
    if (n.left != null && n.left.val > n.val) return false;
    if (n.right != null && n.right.val > n.val) return false;
    return heapOrder(n.left) && heapOrder(n.right);
}
static boolean isMaxHeap(Node root) {
    return isComplete(root, 0, count(root)) && heapOrder(root);
}
// For an array: a is a max-heap iff a[i] >= a[2i+1] and a[i] >= a[2i+2] for every i < n/2</code></pre>
"""
    + check("Is the array [90, 15, 10, 7, 12, 2] a valid max-heap?",
            ["Yes", "No — 12 is larger than its parent 15", "No — 12 is larger than its parent 10", "No — 7 is out of place"], "a",
            "Children of 90 (i=0) are 15 and 10; of 15 (i=1) are 7 and 12; of 10 (i=2) is 2. Every parent is ≥ its children, so it is a valid max-heap.")
    + check("Which data structure gives the k-th largest element of a stream in O(log k) per insertion?",
            ["Max-heap of all elements", "Min-heap of size k", "Sorted array", "Stack"], "b",
            "Keep only the k largest seen so far in a min-heap; the smallest of them (the top) is the k-th largest.")
))

TOPICS.append(topic(
    "Graph Basics — Representations, BFS, DFS, Components, Islands, Cycles & Bipartite",
    "Unit 9 · vertices, edges and how to walk them",
    r"""
<h3>1. Representations</h3>
<table>
  <thead><tr><th></th><th>Adjacency matrix</th><th>Adjacency list</th></tr></thead>
  <tbody>
    <tr><td>Space</td><td>O(V²)</td><td>O(V + E)</td></tr>
    <tr><td>Is (u, v) an edge?</td><td>O(1)</td><td>O(degree(u))</td></tr>
    <tr><td>Iterate neighbours</td><td>O(V)</td><td>O(degree(u))</td></tr>
    <tr><td>Best for</td><td>dense graphs, Floyd–Warshall</td><td>sparse graphs (most real ones)</td></tr>
  </tbody>
</table>
<pre><code class="language-java">List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
for (int[] e : edges) {
    adj.get(e[0]).add(e[1]);
    adj.get(e[1]).add(e[0]);        // omit for a directed graph
}</code></pre>

<h3>2. BFS and DFS — O(V + E)</h3>
<pre><code class="language-java">static int[] bfs(List<List<Integer>> adj, int src) {       // shortest edge counts from src
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Queue<Integer> q = new ArrayDeque<>();
    dist[src] = 0;
    q.offer(src);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u))
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.offer(v); }   // mark when ENQUEUED
    }
    return dist;
}

static void dfs(List<List<Integer>> adj, int u, boolean[] seen) {
    seen[u] = true;
    for (int v : adj.get(u)) if (!seen[v]) dfs(adj, v, seen);
}</code></pre>
<p>BFS explores in rings of distance, so in an <strong>unweighted</strong> graph it gives the minimum number of edges on a path —
the lab problem "minimum number of edges between two vertices".</p>

<h3>3. Connected components and number of islands</h3>
<pre><code class="language-java">static int numIslands(char[][] g) {
    int count = 0;
    for (int r = 0; r < g.length; r++)
        for (int c = 0; c < g[0].length; c++)
            if (g[r][c] == '1') { count++; sink(g, r, c); }   // each DFS start = new island
    return count;
}
static void sink(char[][] g, int r, int c) {
    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
    g[r][c] = '0';
    sink(g, r + 1, c); sink(g, r - 1, c); sink(g, r, c + 1); sink(g, r, c - 1);
}</code></pre>

<h3>4. Path in a directed graph</h3>
<p>Run DFS or BFS from the source and check whether the target was visited. To print the path, store <code>parent[v] = u</code> when v is discovered and walk back from the target.</p>

<h3>5. Cycle detection</h3>
<h4>Undirected — a visited neighbour that is not your parent</h4>
<pre><code class="language-java">static boolean hasCycleUndirected(List<List<Integer>> adj, int u, int parent, boolean[] seen) {
    seen[u] = true;
    for (int v : adj.get(u)) {
        if (!seen[v]) { if (hasCycleUndirected(adj, v, u, seen)) return true; }
        else if (v != parent) return true;
    }
    return false;
}</code></pre>
<h4>Directed — a back edge to a node still on the recursion stack</h4>
<pre><code class="language-java">static boolean hasCycleDirected(List<List<Integer>> adj, int u, int[] state) {  // 0 new, 1 on stack, 2 done
    state[u] = 1;
    for (int v : adj.get(u)) {
        if (state[v] == 1) return true;
        if (state[v] == 0 && hasCycleDirected(adj, v, state)) return true;
    }
    state[u] = 2;
    return false;
}</code></pre>
<p>Union-Find also detects undirected cycles: an edge whose endpoints already share a root closes a cycle.</p>

<h3>6. Bipartite check (2-colouring)</h3>
<pre><code class="language-java">static boolean isBipartite(List<List<Integer>> adj) {
    int[] color = new int[adj.size()];                 // 0 = uncoloured, 1 / -1 = sides
    for (int s = 0; s < adj.size(); s++) {
        if (color[s] != 0) continue;
        Queue<Integer> q = new ArrayDeque<>();
        q.offer(s); color[s] = 1;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj.get(u)) {
                if (color[v] == 0) { color[v] = -color[u]; q.offer(v); }
                else if (color[v] == color[u]) return false;   // same colour on both ends
            }
        }
    }
    return true;
}</code></pre>
<div class="callout callout-key">A graph is bipartite <strong>if and only if it has no odd-length cycle</strong>. Trees and even cycles are bipartite; a triangle is not.
General graph colouring with the minimum number of colours is NP-hard; greedy colouring uses at most (max degree + 1) colours.</div>
"""
    + check("Which traversal finds the minimum number of edges from a source in an unweighted graph?",
            ["DFS", "BFS", "Inorder", "Dijkstra is required"], "b",
            "BFS visits vertices in order of their edge distance from the source.")
))

TOPICS.append(topic(
    "Shortest Paths, MST, Union-Find & Topological Sort",
    "Unit 9 · Dijkstra, Bellman-Ford, Kruskal, Prim and DAGs",
    r"""
<h3>1. Choosing a shortest-path algorithm</h3>
<table>
  <thead><tr><th>Graph</th><th>Algorithm</th><th>Time</th></tr></thead>
  <tbody>
    <tr><td>Unweighted</td><td>BFS</td><td>O(V + E)</td></tr>
    <tr><td>Non-negative weights</td><td>Dijkstra (binary heap)</td><td>O((V + E) log V)</td></tr>
    <tr><td>Negative weights, detect negative cycles</td><td>Bellman–Ford</td><td>O(V · E)</td></tr>
    <tr><td>DAG (any weights)</td><td>topological order + relax</td><td>O(V + E)</td></tr>
    <tr><td>All pairs, small V</td><td>Floyd–Warshall</td><td>O(V³)</td></tr>
  </tbody>
</table>

<h3>2. Dijkstra</h3>
<pre><code class="language-java">static long[] dijkstra(List<List<int[]>> adj, int src) {      // adj.get(u) = {v, w}
    long[] dist = new long[adj.size()];
    Arrays.fill(dist, Long.MAX_VALUE);
    dist[src] = 0;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[1], b[1]));
    pq.offer(new long[]{src, 0});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[0];
        if (top[1] > dist[u]) continue;                       // stale entry, skip
        for (int[] e : adj.get(u)) {
            if (dist[u] + e[1] < dist[e[0]]) {                // relax
                dist[e[0]] = dist[u] + e[1];
                pq.offer(new long[]{e[0], dist[e[0]]});
            }
        }
    }
    return dist;
}</code></pre>
<div class="callout callout-warning"><strong>Dijkstra breaks with negative edges:</strong> it finalises a vertex when popped, assuming no later path can be cheaper. A negative edge discovered later violates that.</div>

<h3>3. Bellman–Ford</h3>
<p>Relax every edge V − 1 times (a shortest simple path has at most V − 1 edges). If a V-th pass still improves a distance, a negative cycle is reachable.</p>
<pre><code class="language-java">static long[] bellmanFord(int V, int[][] edges, int src) {       // edges[i] = {u, v, w}
    long INF = Long.MAX_VALUE / 4;
    long[] dist = new long[V];
    Arrays.fill(dist, INF);
    dist[src] = 0;
    for (int i = 0; i < V - 1; i++)
        for (int[] e : edges)
            if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];
    for (int[] e : edges)
        if (dist[e[0]] != INF && dist[e[0]] + e[2] < dist[e[1]])
            throw new IllegalStateException("Negative cycle reachable from source");
    return dist;
}</code></pre>

<h3>4. Minimum Spanning Tree</h3>
<p>A spanning tree connects all V vertices with exactly V − 1 edges; the MST has minimum total weight (undirected, connected graphs).</p>
<h4>Union-Find (Disjoint Set Union)</h4>
<pre><code class="language-java">class DSU {
    int[] parent, rank;
    DSU(int n) { parent = new int[n]; rank = new int[n]; for (int i = 0; i < n; i++) parent[i] = i; }
    int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }   // path compression
    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;                        // already connected -> edge would form a cycle
        if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;                                   // union by rank
        if (rank[ra] == rank[rb]) rank[ra]++;
        return true;
    }
}</code></pre>
<h4>Kruskal — sort edges, add if it joins two components</h4>
<pre><code class="language-java">static long kruskal(int V, int[][] edges) {
    Arrays.sort(edges, (a, b) -> Integer.compare(a[2], b[2]));
    DSU dsu = new DSU(V);
    long total = 0;
    int used = 0;
    for (int[] e : edges)
        if (dsu.union(e[0], e[1])) { total += e[2]; if (++used == V - 1) break; }
    return total;
}</code></pre>
<h4>Prim — grow one tree using a min-heap of crossing edges</h4>
<pre><code class="language-java">static long prim(List<List<int[]>> adj) {
    boolean[] inTree = new boolean[adj.size()];
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
    pq.offer(new int[]{0, 0});
    long total = 0;
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (inTree[top[0]]) continue;
        inTree[top[0]] = true;
        total += top[1];
        for (int[] e : adj.get(top[0])) if (!inTree[e[0]]) pq.offer(e);
    }
    return total;
}</code></pre>
<table>
  <thead><tr><th></th><th>Kruskal</th><th>Prim</th></tr></thead>
  <tbody>
    <tr><td>Grows</td><td>a forest that merges</td><td>a single tree</td></tr>
    <tr><td>Needs</td><td>sorted edges + DSU</td><td>priority queue + adjacency list</td></tr>
    <tr><td>Time</td><td>O(E log E)</td><td>O(E log V)</td></tr>
    <tr><td>Better for</td><td>sparse graphs, edge lists</td><td>dense graphs</td></tr>
  </tbody>
</table>

<h3>5. Topological sort (DAG only)</h3>
<p>A linear order where every edge u → v puts u before v (course prerequisites, build systems).</p>
<pre><code class="language-java">static List<Integer> kahn(List<List<Integer>> adj) {
    int V = adj.size();
    int[] indeg = new int[V];
    for (List<Integer> out : adj) for (int v : out) indeg[v]++;
    Queue<Integer> q = new ArrayDeque<>();
    for (int i = 0; i < V; i++) if (indeg[i] == 0) q.offer(i);
    List<Integer> order = new ArrayList<>();
    while (!q.isEmpty()) {
        int u = q.poll();
        order.add(u);
        for (int v : adj.get(u)) if (--indeg[v] == 0) q.offer(v);
    }
    return order.size() == V ? order : null;      // null -> the graph has a cycle
}</code></pre>
<p>DFS version: push a vertex onto a stack after all its descendants finish; pop the stack for the order.</p>

<h3>6. DP on a DAG</h3>
<p>Process vertices in topological order and relax outgoing edges — every predecessor is final before a vertex is used.</p>
<ul>
  <li><strong>Shortest / longest path from s:</strong> <code>dist[v] = min/max(dist[v], dist[u] + w)</code>. Longest path is easy on DAGs (hard in general graphs).</li>
  <li><strong>Count paths from s to t:</strong> <code>ways[v] += ways[u]</code> with <code>ways[s] = 1</code>.</li>
</ul>
"""
    + check("A graph has 6 vertices. How many edges does any spanning tree of it contain?",
            ["6", "5", "7", "It depends on the weights"], "b",
            "A spanning tree on V vertices always has V − 1 edges.")
    + check("Which algorithm should you use for single-source shortest paths when some edge weights are negative?",
            ["Dijkstra", "Prim", "Bellman–Ford", "Kruskal"], "c",
            "Bellman–Ford handles negative weights and also detects negative cycles.")
))
