"""Algorithm Design & Implementation (24CSE0317) — Lab plan, experiments 1-60, as runnable Java programs."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Labs 1–6 — Complexity Warm-ups: Factors, GCD, Circle, Brute Force, Randomised & Merge Sort",
    "Unit 1 lab",
    r"""
<p>Each program reads nothing and prints its own sample so you can run it as-is and then adapt the input to Test Pad's format.</p>

<h3>1. Prime factors of a number — O(√n)</h3>
<pre><code class="language-java">import java.util.*;

public class PrimeFactors {
    public static void main(String[] args) {
        long n = 315;
        List<Long> f = new ArrayList<>();
        for (long d = 2; d * d <= n; d++)
            while (n % d == 0) { f.add(d); n /= d; }
        if (n > 1) f.add(n);
        System.out.println(f);          // [3, 3, 5, 7]
    }
}</code></pre>

<h3>2. GCD with the Euclidean algorithm — O(log min(a, b))</h3>
<pre><code class="language-java">public class Gcd {
    static long gcd(long a, long b) { return b == 0 ? a : gcd(b, a % b); }
    public static void main(String[] args) {
        long a = 1071, b = 462;
        System.out.println("gcd = " + gcd(a, b));            // 21
        System.out.println("lcm = " + a / gcd(a, b) * b);    // 23562
    }
}</code></pre>

<h3>3. Distribute N items in a circle — who gets the last one?</h3>
<pre><code class="language-java">public class CircleDistribution {
    // n people, m items, first item to person k (1-indexed)
    static long lastPerson(long n, long m, long k) { return (k - 1 + m - 1) % n + 1; }
    public static void main(String[] args) {
        System.out.println(lastPerson(5, 8, 2));   // 4
        System.out.println(lastPerson(3, 7, 3));   // 3
    }
}</code></pre>

<h3>4. A problem solved by brute force — maximum subarray, O(n²) vs Kadane O(n)</h3>
<pre><code class="language-java">public class BruteForceMaxSubarray {
    public static void main(String[] args) {
        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int best = Integer.MIN_VALUE;
        for (int i = 0; i < a.length; i++) {          // try every start
            int sum = 0;
            for (int j = i; j < a.length; j++) {      // extend to every end
                sum += a[j];
                best = Math.max(best, sum);
            }
        }
        System.out.println("brute force: " + best);   // 6  ([4, -1, 2, 1])

        int cur = a[0], kadane = a[0];
        for (int i = 1; i < a.length; i++) { cur = Math.max(a[i], cur + a[i]); kadane = Math.max(kadane, cur); }
        System.out.println("kadane:      " + kadane);  // 6
    }
}</code></pre>

<h3>5. A randomised algorithm — randomised quicksort</h3>
<p>Choosing the pivot at random makes the O(n²) worst case (already-sorted input with a fixed pivot) extremely unlikely:
expected time O(n log n) for <em>every</em> input. This is a <strong>Las Vegas</strong> algorithm (always correct, random running time);
a <strong>Monte Carlo</strong> algorithm (e.g. Miller–Rabin primality) has fixed time but may be wrong with small probability.</p>
<pre><code class="language-java">import java.util.*;

public class RandomizedQuickSort {
    static final Random RNG = new Random();

    static void sort(int[] a, int lo, int hi) {
        if (lo >= hi) return;
        int p = lo + RNG.nextInt(hi - lo + 1);       // random pivot
        swap(a, p, hi);
        int pivot = a[hi], i = lo;
        for (int j = lo; j < hi; j++) if (a[j] < pivot) swap(a, i++, j);
        swap(a, i, hi);
        sort(a, lo, i - 1);
        sort(a, i + 1, hi);
    }
    static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }

    public static void main(String[] args) {
        int[] a = {9, 4, 7, 1, 8, 2, 2, 6};
        sort(a, 0, a.length - 1);
        System.out.println(Arrays.toString(a));   // [1, 2, 2, 4, 6, 7, 8, 9]
    }
}</code></pre>

<h3>6. Divide and conquer — merge sort, O(n log n), stable</h3>
<pre><code class="language-java">import java.util.*;

public class MergeSort {
    static void mergeSort(int[] a, int[] tmp, int lo, int hi) {
        if (lo >= hi) return;
        int mid = (lo + hi) >>> 1;
        mergeSort(a, tmp, lo, mid);                  // divide
        mergeSort(a, tmp, mid + 1, hi);
        int i = lo, j = mid + 1, k = lo;             // combine
        while (i <= mid && j <= hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];   // <= keeps it stable
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        System.arraycopy(tmp, lo, a, lo, hi - lo + 1);
    }
    public static void main(String[] args) {
        int[] a = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(a, new int[a.length], 0, a.length - 1);
        System.out.println(Arrays.toString(a));   // [3, 9, 10, 27, 38, 43, 82]
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 7–17 — Arrays & Strings: Two Pointers, Window, Rotation, Anagram, LCS, LIS",
    "Unit 2 lab",
    r"""
<h3>1. Pair with sum K using two pointers</h3>
<pre><code class="language-java">import java.util.*;

public class PairSum {
    public static void main(String[] args) {
        int[] a = {8, 1, 5, 11, 2, 7};
        int k = 13;
        Arrays.sort(a);                                   // [1, 2, 5, 7, 8, 11]
        int l = 0, r = a.length - 1;
        boolean found = false;
        while (l < r) {
            int s = a[l] + a[r];
            if (s == k) { System.out.println(a[l] + " + " + a[r]); found = true; l++; r--; }  // print all pairs
            else if (s < k) l++;
            else r--;
        }
        if (!found) System.out.println("No pair");       // prints 2 + 11 and 5 + 8
    }
}</code></pre>

<h3>2. Maximum sum subarray of size k (sliding window)</h3>
<pre><code class="language-java">public class MaxWindowSum {
    public static void main(String[] args) {
        int[] a = {1, 4, 2, 10, 23, 3, 1, 0, 20};
        int k = 4;
        long window = 0;
        for (int i = 0; i < k; i++) window += a[i];
        long best = window;
        int start = 0;
        for (int i = k; i < a.length; i++) {
            window += a[i] - a[i - k];
            if (window > best) { best = window; start = i - k + 1; }
        }
        System.out.println("max = " + best + " starting at index " + start);   // 39 at index 1
    }
}</code></pre>

<h3>3. Rotate an array with the reversal algorithm</h3>
<pre><code class="language-java">import java.util.*;

public class RotateArray {
    static void reverse(int[] a, int i, int j) { while (i < j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; } }
    static void rotateLeft(int[] a, int d) {
        int n = a.length;
        d %= n;
        reverse(a, 0, d - 1);
        reverse(a, d, n - 1);
        reverse(a, 0, n - 1);
    }
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5, 6, 7};
        rotateLeft(a, 2);
        System.out.println(Arrays.toString(a));   // [3, 4, 5, 6, 7, 1, 2]
    }
}</code></pre>

<h3>4. Check whether two strings are anagrams</h3>
<pre><code class="language-java">public class Anagram {
    static boolean isAnagram(String a, String b) {
        a = a.replaceAll("\\s", "").toLowerCase();
        b = b.replaceAll("\\s", "").toLowerCase();
        if (a.length() != b.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < a.length(); i++) { count[a.charAt(i) - 'a']++; count[b.charAt(i) - 'a']--; }
        for (int c : count) if (c != 0) return false;
        return true;
    }
    public static void main(String[] args) {
        System.out.println(isAnagram("Listen", "Silent"));        // true
        System.out.println(isAnagram("Dormitory", "Dirty room")); // true
        System.out.println(isAnagram("hello", "world"));          // false
    }
}</code></pre>

<h3>5. Longest Common Subsequence — length and the sequence</h3>
<pre><code class="language-java">public class LCS {
    public static void main(String[] args) {
        String a = "AGGTAB", b = "GXTXAYB";
        int n = a.length(), m = b.length();
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
                dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1) ? dp[i - 1][j - 1] + 1
                                                               : Math.max(dp[i - 1][j], dp[i][j - 1]);
        StringBuilder seq = new StringBuilder();                  // walk back from the corner
        for (int i = n, j = m; i > 0 && j > 0; ) {
            if (a.charAt(i - 1) == b.charAt(j - 1)) { seq.append(a.charAt(i - 1)); i--; j--; }
            else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
            else j--;
        }
        System.out.println(dp[n][m] + " " + seq.reverse());      // 4 GTAB
    }
}</code></pre>

<h3>6. Longest Increasing Subsequence with DP (and the sequence)</h3>
<pre><code class="language-java">import java.util.*;

public class LIS {
    public static void main(String[] args) {
        int[] a = {10, 22, 9, 33, 21, 50, 41, 60, 80};
        int n = a.length;
        int[] dp = new int[n], prev = new int[n];
        int bestEnd = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = 1; prev[i] = -1;
            for (int j = 0; j < i; j++)
                if (a[j] < a[i] && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; prev[i] = j; }
            if (dp[i] > dp[bestEnd]) bestEnd = i;
        }
        LinkedList<Integer> seq = new LinkedList<>();
        for (int i = bestEnd; i != -1; i = prev[i]) seq.addFirst(a[i]);
        System.out.println(dp[bestEnd] + " " + seq);    // 6 [10, 22, 33, 50, 60, 80]
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 18–25 — Greedy: Interval Scheduling, Fractional Knapsack, Job Deadlines, Activity Selection",
    "Unit 3 lab",
    r"""
<h3>1 & 4. Interval scheduling / activity selection</h3>
<p>Both experiments are the same algorithm: sort by finish time, take every activity that starts after the last one taken finishes.</p>
<pre><code class="language-java">import java.util.*;

public class ActivitySelection {
    public static void main(String[] args) {
        int[] start  = {1, 3, 0, 5, 8, 5};
        int[] finish = {2, 4, 6, 7, 9, 9};
        Integer[] idx = {0, 1, 2, 3, 4, 5};
        Arrays.sort(idx, Comparator.comparingInt(i -> finish[i]));
        List<Integer> chosen = new ArrayList<>();
        int lastFinish = -1;
        for (int i : idx)
            if (start[i] >= lastFinish) { chosen.add(i); lastFinish = finish[i]; }
        System.out.println("Selected activities (0-indexed): " + chosen);   // [0, 1, 3, 4]
    }
}</code></pre>

<h3>2. Fractional knapsack</h3>
<pre><code class="language-java">import java.util.*;

public class FractionalKnapsack {
    public static void main(String[] args) {
        int[] value = {60, 100, 120};
        int[] weight = {10, 20, 30};
        int capacity = 50;
        Integer[] idx = {0, 1, 2};
        Arrays.sort(idx, (a, b) -> Double.compare((double) value[b] / weight[b], (double) value[a] / weight[a]));
        double total = 0;
        for (int i : idx) {
            if (capacity >= weight[i]) { total += value[i]; capacity -= weight[i]; }
            else { total += value[i] * ((double) capacity / weight[i]); break; }   // take a fraction
        }
        System.out.printf("Maximum value = %.2f%n", total);   // 240.00
    }
}</code></pre>

<h3>3. Job sequencing with deadlines</h3>
<pre><code class="language-java">import java.util.*;

public class JobSequencing {
    record Job(String id, int deadline, int profit) {}

    public static void main(String[] args) {
        List<Job> jobs = new ArrayList<>(List.of(
            new Job("a", 4, 20), new Job("b", 1, 10), new Job("c", 1, 40), new Job("d", 1, 30)));
        jobs.sort((x, y) -> y.profit() - x.profit());              // most profitable first
        int maxD = jobs.stream().mapToInt(Job::deadline).max().orElse(0);
        String[] slot = new String[maxD + 1];
        int profit = 0;
        for (Job j : jobs)
            for (int t = j.deadline(); t >= 1; t--)                 // latest free slot
                if (slot[t] == null) { slot[t] = j.id(); profit += j.profit(); break; }
        System.out.println(Arrays.toString(slot) + " profit = " + profit);   // [null, c, null, null, a] profit = 60
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 26–32 — Stack & Queue: Array Stack, Balanced Parentheses, Circular Queue",
    "Unit 4 lab",
    r"""
<h3>1. Stack operations using an array (menu-driven)</h3>
<pre><code class="language-java">import java.util.*;

public class StackArray {
    private final int[] data;
    private int top = -1;
    StackArray(int cap) { data = new int[cap]; }

    void push(int x) {
        if (top == data.length - 1) { System.out.println("Overflow"); return; }
        data[++top] = x;
    }
    void pop() {
        if (top == -1) { System.out.println("Underflow"); return; }
        System.out.println("Popped " + data[top--]);
    }
    void peek() { System.out.println(top == -1 ? "Empty" : "Top " + data[top]); }
    void display() {
        StringBuilder sb = new StringBuilder("Stack (top first):");
        for (int i = top; i >= 0; i--) sb.append(' ').append(data[i]);
        System.out.println(sb);
    }

    public static void main(String[] args) {
        StackArray s = new StackArray(3);
        s.push(10); s.push(20); s.push(30); s.push(40);   // last push -> Overflow
        s.display();                                      // 30 20 10
        s.pop(); s.peek();                                // Popped 30, Top 20
        s.pop(); s.pop(); s.pop();                        // ..., Underflow
    }
}</code></pre>

<h3>2. Balanced parentheses</h3>
<pre><code class="language-java">import java.util.*;

public class BalancedBrackets {
    static boolean balanced(String s) {
        Deque<Character> st = new ArrayDeque<>();
        String open = "([{", close = ")]}";
        for (char c : s.toCharArray()) {
            if (open.indexOf(c) >= 0) st.push(c);
            else if (close.indexOf(c) >= 0) {
                if (st.isEmpty() || open.indexOf(st.pop()) != close.indexOf(c)) return false;
            }
        }
        return st.isEmpty();
    }
    public static void main(String[] args) {
        for (String s : new String[]{"{[()]}", "([)]", "((()", "a*(b+c)-{d/e}"})
            System.out.println(s + " -> " + (balanced(s) ? "Balanced" : "Not balanced"));
    }
}</code></pre>

<h3>3. Circular queue operations</h3>
<pre><code class="language-java">public class CircularQueueDemo {
    private final int[] q;
    private int front = -1, rear = -1;
    CircularQueueDemo(int n) { q = new int[n]; }

    boolean isFull()  { return (rear + 1) % q.length == front; }
    boolean isEmpty() { return front == -1; }

    void enqueue(int x) {
        if (isFull()) { System.out.println("Queue full"); return; }
        if (isEmpty()) front = 0;
        rear = (rear + 1) % q.length;
        q[rear] = x;
    }
    int dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue empty");
        int x = q[front];
        if (front == rear) front = rear = -1;          // removed the last element
        else front = (front + 1) % q.length;
        return x;
    }
    void display() {
        if (isEmpty()) { System.out.println("Empty"); return; }
        StringBuilder sb = new StringBuilder();
        for (int i = front; ; i = (i + 1) % q.length) { sb.append(q[i]).append(' '); if (i == rear) break; }
        System.out.println(sb.toString().trim());
    }

    public static void main(String[] args) {
        CircularQueueDemo cq = new CircularQueueDemo(4);
        cq.enqueue(1); cq.enqueue(2); cq.enqueue(3); cq.enqueue(4);
        cq.enqueue(5);                        // Queue full
        cq.dequeue(); cq.dequeue();
        cq.enqueue(5); cq.enqueue(6);         // wraps around to indices 0 and 1
        cq.display();                         // 3 4 5 6
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 33–38 — Hashing: Noise in the Library, Balancing a Scale, Voting Winner",
    "Unit 5 lab",
    r"""
<p>The CHO names these problems without fixing their exact input format, so each program below states the version it solves. The hashing idea transfers directly to whatever format your lab sheet uses.</p>

<h3>1. Noise in the library</h3>
<p><em>Version:</em> a log lists the roll number of each student caught making noise. Report every student caught at least k times, in the order they first offended.</p>
<pre><code class="language-java">import java.util.*;

public class NoiseInLibrary {
    public static void main(String[] args) {
        int[] log = {12, 7, 12, 3, 7, 12, 9, 3, 3};
        int k = 3;
        Map<Integer, Integer> count = new LinkedHashMap<>();       // keeps first-seen order
        for (int roll : log) count.merge(roll, 1, Integer::sum);
        List<Integer> warned = new ArrayList<>();
        count.forEach((roll, c) -> { if (c >= k) warned.add(roll); });
        System.out.println("Warn: " + warned);                     // [12, 3]
    }
}</code></pre>

<h3>2. Balance a scale with given weights</h3>
<p><em>Version:</em> the left pan holds L and the right pan holds R. Using at most two weights from the box (each used once, on either pan), can the scale balance?</p>
<pre><code class="language-java">import java.util.*;

public class BalanceScale {
    static String balance(int left, int right, int[] weights) {
        int diff = Math.abs(left - right);
        if (diff == 0) return "Already balanced";
        Map<Integer, Integer> seen = new HashMap<>();           // weight -> index
        for (int i = 0; i < weights.length; i++) {
            int w = weights[i];
            if (w == diff) return "Add " + w + " to the lighter pan";
            if (seen.containsKey(diff - w)) return "Add " + (diff - w) + " and " + w + " to the lighter pan";
            if (seen.containsKey(w - diff)) return "Add " + w + " to the lighter pan and " + (w - diff) + " to the heavier pan";
            if (seen.containsKey(w + diff)) return "Add " + (w + diff) + " to the lighter pan and " + w + " to the heavier pan";
            seen.put(w, i);
        }
        return "Not possible";
    }
    public static void main(String[] args) {
        System.out.println(balance(13, 4, new int[]{1, 2, 6, 7}));   // Add 2 and 7 to the lighter pan
        System.out.println(balance(5, 9, new int[]{1, 6}));          // Not possible
    }
}</code></pre>
<p>Each lookup is O(1), so the whole check is O(n) instead of trying every pair in O(n²).</p>

<h3>3. Winner of an election</h3>
<p><em>Version:</em> print the candidate with the most votes; break ties by the lexicographically smaller name.</p>
<pre><code class="language-java">import java.util.*;

public class ElectionWinner {
    public static void main(String[] args) {
        String[] votes = {"john", "johnny", "jackie", "johnny", "john", "jackie",
                          "jamie", "jamie", "john", "johnny", "jamie", "johnny", "john"};
        Map<String, Integer> tally = new HashMap<>();
        for (String v : votes) tally.merge(v, 1, Integer::sum);

        String winner = null;
        for (Map.Entry<String, Integer> e : tally.entrySet()) {
            if (winner == null
                || e.getValue() > tally.get(winner)
                || (e.getValue().equals(tally.get(winner)) && e.getKey().compareTo(winner) < 0))
                winner = e.getKey();
        }
        System.out.println(winner + " " + tally.get(winner));   // john 4
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 39–45 — Recursion, Backtracking & DP Programs",
    "Unit 6 lab · Hanoi, permutations, robot, Sudoku, rat in maze, binary strings, N-Queens, knapsack, steps, MCM",
    r"""
<h3>1. Tower of Hanoi</h3>
<pre><code class="language-java">public class Hanoi {
    static int moves = 0;
    static void solve(int n, char from, char to, char via) {
        if (n == 0) return;
        solve(n - 1, from, via, to);
        System.out.println("Disc " + n + ": " + from + " -> " + to);
        moves++;
        solve(n - 1, via, to, from);
    }
    public static void main(String[] args) {
        solve(3, 'A', 'C', 'B');
        System.out.println("Total moves: " + moves);   // 7
    }
}</code></pre>

<h3>2. Permutations of a string</h3>
<pre><code class="language-java">public class StringPermutations {
    static void permute(String prefix, String rest) {
        if (rest.isEmpty()) { System.out.println(prefix); return; }
        for (int i = 0; i < rest.length(); i++) {
            if (rest.indexOf(rest.charAt(i)) != i) continue;          // skip repeated letters
            permute(prefix + rest.charAt(i), rest.substring(0, i) + rest.substring(i + 1));
        }
    }
    public static void main(String[] args) { permute("", "ABC"); }    // ABC ACB BAC BCA CAB CBA
}</code></pre>

<h3>3. Move a robot through a grid (find one path, backtracking)</h3>
<pre><code class="language-java">import java.util.*;

public class RobotGrid {
    static boolean findPath(int[][] g, int r, int c, List<String> path) {
        if (r >= g.length || c >= g[0].length || g[r][c] == 1) return false;   // off grid or blocked
        path.add("(" + r + "," + c + ")");
        if (r == g.length - 1 && c == g[0].length - 1) return true;
        if (findPath(g, r, c + 1, path) || findPath(g, r + 1, c, path)) return true;
        path.remove(path.size() - 1);                                         // dead end: backtrack
        g[r][c] = 1;                                                          // remember the failure
        return false;
    }
    public static void main(String[] args) {
        int[][] grid = {{0, 0, 1}, {1, 0, 0}, {1, 1, 0}};
        List<String> path = new ArrayList<>();
        System.out.println(findPath(grid, 0, 0, path) ? path : "No path");   // [(0,0), (0,1), (1,1), (1,2), (2,2)]
    }
}</code></pre>

<h3>4. Sudoku solver</h3>
<pre><code class="language-java">public class Sudoku {
    static boolean solve(int[][] b) {
        for (int r = 0; r < 9; r++)
            for (int c = 0; c < 9; c++)
                if (b[r][c] == 0) {
                    for (int d = 1; d <= 9; d++)
                        if (ok(b, r, c, d)) { b[r][c] = d; if (solve(b)) return true; b[r][c] = 0; }
                    return false;
                }
        return true;
    }
    static boolean ok(int[][] b, int r, int c, int d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d || b[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == d) return false;
        return true;
    }
    public static void main(String[] args) {
        int[][] b = {
            {5,3,0,0,7,0,0,0,0},{6,0,0,1,9,5,0,0,0},{0,9,8,0,0,0,0,6,0},
            {8,0,0,0,6,0,0,0,3},{4,0,0,8,0,3,0,0,1},{7,0,0,0,2,0,0,0,6},
            {0,6,0,0,0,0,2,8,0},{0,0,0,4,1,9,0,0,5},{0,0,0,0,8,0,0,7,9}};
        if (solve(b)) for (int[] row : b) System.out.println(java.util.Arrays.toString(row));
    }
}</code></pre>

<h3>5. All paths for a rat in a maze</h3>
<pre><code class="language-java">import java.util.*;

public class RatInMaze {
    static final int[] DR = {1, 0, 0, -1};
    static final int[] DC = {0, -1, 1, 0};
    static final char[] NAME = {'D', 'L', 'R', 'U'};

    static void go(int[][] m, int r, int c, boolean[][] vis, StringBuilder p, List<String> out) {
        int n = m.length;
        if (r == n - 1 && c == n - 1) { out.add(p.toString()); return; }
        vis[r][c] = true;
        for (int k = 0; k < 4; k++) {
            int nr = r + DR[k], nc = c + DC[k];
            if (nr >= 0 && nc >= 0 && nr < n && nc < n && m[nr][nc] == 1 && !vis[nr][nc]) {
                p.append(NAME[k]);
                go(m, nr, nc, vis, p, out);
                p.deleteCharAt(p.length() - 1);
            }
        }
        vis[r][c] = false;
    }
    public static void main(String[] args) {
        int[][] m = {{1,0,0,0},{1,1,0,1},{1,1,0,0},{0,1,1,1}};
        List<String> out = new ArrayList<>();
        if (m[0][0] == 1) go(m, 0, 0, new boolean[4][4], new StringBuilder(), out);
        System.out.println(out);   // [DDRDRR, DRDDRR]
    }
}</code></pre>

<h3>6. All binary strings of n bits</h3>
<pre><code class="language-java">public class BinaryStrings {
    static void gen(char[] s, int i) {
        if (i == s.length) { System.out.println(new String(s)); return; }
        s[i] = '0'; gen(s, i + 1);
        s[i] = '1'; gen(s, i + 1);
    }
    public static void main(String[] args) { gen(new char[3], 0); }   // 000 ... 111
}</code></pre>

<h3>7. N-Queens (print boards)</h3>
<pre><code class="language-java">public class NQueens {
    static int n = 4, solutions = 0;
    static int[] queenCol = new int[n];

    static boolean safe(int row, int col) {
        for (int r = 0; r < row; r++)
            if (queenCol[r] == col || Math.abs(queenCol[r] - col) == row - r) return false;
        return true;
    }
    static void place(int row) {
        if (row == n) {
            solutions++;
            for (int r = 0; r < n; r++) {
                StringBuilder line = new StringBuilder();
                for (int c = 0; c < n; c++) line.append(queenCol[r] == c ? "Q " : ". ");
                System.out.println(line);
            }
            System.out.println();
            return;
        }
        for (int c = 0; c < n; c++)
            if (safe(row, c)) { queenCol[row] = c; place(row + 1); }
    }
    public static void main(String[] args) {
        place(0);
        System.out.println(solutions + " solutions");   // 2 solutions
    }
}</code></pre>

<h3>8. 0/1 Knapsack (2-D table, prints chosen items)</h3>
<pre><code class="language-java">public class Knapsack01 {
    public static void main(String[] args) {
        int[] wt = {1, 3, 4, 5}, val = {1, 4, 5, 7};
        int W = 7, n = wt.length;
        int[][] dp = new int[n + 1][W + 1];
        for (int i = 1; i <= n; i++)
            for (int w = 0; w <= W; w++) {
                dp[i][w] = dp[i - 1][w];
                if (wt[i - 1] <= w) dp[i][w] = Math.max(dp[i][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            }
        System.out.println("Max value: " + dp[n][W]);        // 9
        for (int i = n, w = W; i > 0; i--)
            if (dp[i][w] != dp[i - 1][w]) { System.out.println("take item " + i); w -= wt[i - 1]; }   // items 3 and 2
    }
}</code></pre>

<h3>9. Ways to cover distance N with 1, 2 or 3 steps</h3>
<pre><code class="language-java">public class CountSteps {
    public static void main(String[] args) {
        int n = 5;
        long[] dp = new long[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= n; i++)
            for (int step = 1; step <= 3; step++)
                if (i - step >= 0) dp[i] += dp[i - step];
        System.out.println(dp[n]);   // 13
    }
}</code></pre>

<h3>10. Matrix Chain Multiplication (with parenthesisation)</h3>
<pre><code class="language-java">public class MatrixChain {
    static int[][] split;
    static String paren(int i, int j) {
        if (i == j) return "A" + i;
        return "(" + paren(i, split[i][j]) + " x " + paren(split[i][j] + 1, j) + ")";
    }
    public static void main(String[] args) {
        int[] p = {40, 20, 30, 10, 30};
        int n = p.length - 1;
        long[][] m = new long[n + 1][n + 1];
        split = new int[n + 1][n + 1];
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                m[i][j] = Long.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    long cost = m[i][k] + m[k + 1][j] + (long) p[i - 1] * p[k] * p[j];
                    if (cost < m[i][j]) { m[i][j] = cost; split[i][j] = k; }
                }
            }
        System.out.println(m[1][n] + " " + paren(1, n));   // 26000 ((A1 x (A2 x A3)) x A4)
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 46–51 — Trees: Traversals, Height, LCA in a BST, k-th Smallest",
    "Unit 7 lab",
    r"""
<pre><code class="language-java">import java.util.*;

public class TreeLab {
    static class Node {
        int val; Node left, right;
        Node(int v) { val = v; }
    }

    static Node insert(Node root, int v) {
        if (root == null) return new Node(v);
        if (v < root.val) root.left = insert(root.left, v); else root.right = insert(root.right, v);
        return root;
    }

    // 1. Traversals
    static void pre(Node n, List<Integer> o)  { if (n == null) return; o.add(n.val); pre(n.left, o); pre(n.right, o); }
    static void in(Node n, List<Integer> o)   { if (n == null) return; in(n.left, o); o.add(n.val); in(n.right, o); }
    static void post(Node n, List<Integer> o) { if (n == null) return; post(n.left, o); post(n.right, o); o.add(n.val); }

    // 2. Height (number of nodes on the longest root-to-leaf path)
    static int height(Node n) { return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right)); }

    // 3. LCA in a BST
    static Node lca(Node root, int a, int b) {
        while (root != null) {
            if (a < root.val && b < root.val) root = root.left;
            else if (a > root.val && b > root.val) root = root.right;
            else return root;
        }
        return null;
    }

    // 4. k-th smallest (iterative inorder, stops early)
    static int kthSmallest(Node root, int k) {
        Deque<Node> st = new ArrayDeque<>();
        Node cur = root;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) { st.push(cur); cur = cur.left; }
            cur = st.pop();
            if (--k == 0) return cur.val;
            cur = cur.right;
        }
        throw new IllegalArgumentException("k is larger than the tree");
    }

    public static void main(String[] args) {
        Node root = null;
        for (int v : new int[]{20, 8, 22, 4, 12, 10, 14}) root = insert(root, v);

        List<Integer> a = new ArrayList<>(), b = new ArrayList<>(), c = new ArrayList<>();
        pre(root, a); in(root, b); post(root, c);
        System.out.println("Preorder:  " + a);     // [20, 8, 4, 12, 10, 14, 22]
        System.out.println("Inorder:   " + b);     // [4, 8, 10, 12, 14, 20, 22]
        System.out.println("Postorder: " + c);     // [4, 10, 14, 12, 8, 22, 20]
        System.out.println("Height:    " + height(root));          // 4
        System.out.println("LCA(10,14): " + lca(root, 10, 14).val); // 12
        System.out.println("LCA(14,8):  " + lca(root, 14, 8).val);  // 8
        System.out.println("3rd smallest: " + kthSmallest(root, 3)); // 10
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 52–56 — Heap: Stream Max/Min, Heap Sort, Is It a Max-Heap?",
    "Unit 8 lab",
    r"""
<h3>1. Maximum and minimum in a continuous stream</h3>
<pre><code class="language-java">import java.util.*;

public class StreamExtremes {
    public static void main(String[] args) {
        int[] stream = {5, 15, 1, 3, 20, 8};
        PriorityQueue<Integer> min = new PriorityQueue<>();
        PriorityQueue<Integer> max = new PriorityQueue<>(Comparator.reverseOrder());
        for (int x : stream) {
            min.offer(x);
            max.offer(x);
            System.out.println("after " + x + ": min = " + min.peek() + ", max = " + max.peek());
        }
        // If elements can also be removed, keep a count map and lazily discard stale tops.
    }
}</code></pre>

<h3>2. Heap sort</h3>
<pre><code class="language-java">import java.util.*;

public class HeapSort {
    static void heapify(int[] a, int n, int i) {
        int largest = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && a[l] > a[largest]) largest = l;
        if (r < n && a[r] > a[largest]) largest = r;
        if (largest != i) {
            int t = a[i]; a[i] = a[largest]; a[largest] = t;
            heapify(a, n, largest);
        }
    }
    public static void main(String[] args) {
        int[] a = {12, 11, 13, 5, 6, 7};
        int n = a.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);     // build max-heap, O(n)
        for (int i = n - 1; i > 0; i--) {                          // extract n-1 times, O(n log n)
            int t = a[0]; a[0] = a[i]; a[i] = t;
            heapify(a, i, 0);
        }
        System.out.println(Arrays.toString(a));   // [5, 6, 7, 11, 12, 13]
    }
}</code></pre>

<h3>3. Check whether a given tree is a max-heap</h3>
<pre><code class="language-java">public class IsMaxHeap {
    static class Node { int val; Node left, right; Node(int v) { val = v; } }

    static int count(Node n) { return n == null ? 0 : 1 + count(n.left) + count(n.right); }

    static boolean complete(Node n, int i, int total) {
        if (n == null) return true;
        if (i >= total) return false;
        return complete(n.left, 2 * i + 1, total) && complete(n.right, 2 * i + 2, total);
    }
    static boolean ordered(Node n) {
        if (n == null) return true;
        if (n.left != null && n.left.val > n.val) return false;
        if (n.right != null && n.right.val > n.val) return false;
        return ordered(n.left) && ordered(n.right);
    }

    public static void main(String[] args) {
        Node root = new Node(10);
        root.left = new Node(9); root.right = new Node(8);
        root.left.left = new Node(7); root.left.right = new Node(6);
        root.right.left = new Node(5); root.right.right = new Node(4);
        System.out.println(complete(root, 0, count(root)) && ordered(root));   // true

        root.left.left.left = null; root.right.right.left = new Node(3);      // hole on the left -> not complete
        System.out.println(complete(root, 0, count(root)) && ordered(root));   // false
    }
}</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 57–60 — Graphs: Cycle, Minimum Edges, Directed Path, Islands, Dijkstra, Bellman-Ford",
    "Unit 9 lab",
    r"""
<pre><code class="language-java">import java.util.*;

public class GraphLab {

    // 1. Cycle in an undirected graph (DFS with parent)
    static boolean cycle(List<List<Integer>> g, int u, int parent, boolean[] vis) {
        vis[u] = true;
        for (int v : g.get(u)) {
            if (!vis[v]) { if (cycle(g, v, u, vis)) return true; }
            else if (v != parent) return true;
        }
        return false;
    }

    // 2. Minimum number of edges between s and t (BFS)
    static int minEdges(List<List<Integer>> g, int s, int t) {
        int[] d = new int[g.size()];
        Arrays.fill(d, -1);
        Deque<Integer> q = new ArrayDeque<>(List.of(s));
        d[s] = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            if (u == t) return d[u];
            for (int v : g.get(u)) if (d[v] < 0) { d[v] = d[u] + 1; q.add(v); }
        }
        return -1;
    }

    // 3. Path in a directed graph (DFS with parent pointers)
    static List<Integer> path(List<List<Integer>> g, int s, int t) {
        int[] parent = new int[g.size()];
        Arrays.fill(parent, -2);
        Deque<Integer> st = new ArrayDeque<>(List.of(s));
        parent[s] = -1;
        while (!st.isEmpty()) {
            int u = st.pop();
            for (int v : g.get(u)) if (parent[v] == -2) { parent[v] = u; st.push(v); }
        }
        if (parent[t] == -2) return List.of();
        LinkedList<Integer> p = new LinkedList<>();
        for (int v = t; v != -1; v = parent[v]) p.addFirst(v);
        return p;
    }

    // 4. Number of islands (BFS on a grid)
    static int islands(int[][] grid) {
        int R = grid.length, C = grid[0].length, count = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++) {
                if (grid[r][c] != 1) continue;
                count++;
                Deque<int[]> q = new ArrayDeque<>();
                q.add(new int[]{r, c});
                grid[r][c] = 0;
                while (!q.isEmpty()) {
                    int[] cell = q.poll();
                    for (int[] d : dirs) {
                        int nr = cell[0] + d[0], nc = cell[1] + d[1];
                        if (nr >= 0 && nc >= 0 && nr < R && nc < C && grid[nr][nc] == 1) { grid[nr][nc] = 0; q.add(new int[]{nr, nc}); }
                    }
                }
            }
        return count;
    }

    // 5. Dijkstra (adjacency list of {to, weight})
    static int[] dijkstra(List<List<int[]>> g, int s) {
        int[] dist = new int[g.size()];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[s] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(x -> x[1]));
        pq.add(new int[]{s, 0});
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            if (cur[1] > dist[cur[0]]) continue;
            for (int[] e : g.get(cur[0]))
                if (cur[1] + e[1] < dist[e[0]]) { dist[e[0]] = cur[1] + e[1]; pq.add(new int[]{e[0], dist[e[0]]}); }
        }
        return dist;
    }

    // 6. Bellman-Ford with negative edges
    static long[] bellmanFord(int V, int[][] edges, int s) {
        long[] dist = new long[V];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[s] = 0;
        for (int i = 1; i < V; i++)
            for (int[] e : edges)
                if (dist[e[0]] != Long.MAX_VALUE && dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];
        for (int[] e : edges)
            if (dist[e[0]] != Long.MAX_VALUE && dist[e[0]] + e[2] < dist[e[1]]) return null;   // negative cycle
        return dist;
    }

    static List<List<Integer>> undirected(int n, int[][] edges) {
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i < n; i++) g.add(new ArrayList<>());
        for (int[] e : edges) { g.get(e[0]).add(e[1]); g.get(e[1]).add(e[0]); }
        return g;
    }

    public static void main(String[] args) {
        List<List<Integer>> g = undirected(5, new int[][]{{0,1},{1,2},{2,3},{3,4}});
        System.out.println("cycle: " + cycle(g, 0, -1, new boolean[5]));          // false
        g.get(4).add(1); g.get(1).add(4);
        System.out.println("cycle: " + cycle(g, 0, -1, new boolean[5]));          // true
        System.out.println("min edges 0->4: " + minEdges(g, 0, 4));               // 2

        List<List<Integer>> dg = new ArrayList<>();
        for (int i = 0; i < 4; i++) dg.add(new ArrayList<>());
        dg.get(0).add(1); dg.get(1).add(2); dg.get(2).add(3);
        System.out.println("path 0->3: " + path(dg, 0, 3));                       // [0, 1, 2, 3]
        System.out.println("path 3->0: " + path(dg, 3, 0));                       // []

        int[][] grid = {{1,1,0,0,0},{1,1,0,0,1},{0,0,1,0,1},{0,0,0,1,1}};
        System.out.println("islands: " + islands(grid));                          // 3

        List<List<int[]>> wg = new ArrayList<>();
        for (int i = 0; i < 5; i++) wg.add(new ArrayList<>());
        int[][] wEdges = {{0,1,4},{0,2,1},{2,1,2},{1,3,1},{2,3,5},{3,4,3}};
        for (int[] e : wEdges) { wg.get(e[0]).add(new int[]{e[1], e[2]}); wg.get(e[1]).add(new int[]{e[0], e[2]}); }
        System.out.println("dijkstra: " + Arrays.toString(dijkstra(wg, 0)));      // [0, 3, 1, 4, 7]

        int[][] neg = {{0,1,4},{0,2,5},{1,2,-3},{2,3,4},{3,1,2}};
        System.out.println("bellman-ford: " + Arrays.toString(bellmanFord(4, neg, 0)));   // [0, 4, 1, 5]
    }
}</code></pre>
"""
))
