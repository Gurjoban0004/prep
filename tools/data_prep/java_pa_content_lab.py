"""Lab notes (experiments 1-60) from the CHO lab plan."""

from java_pa_content_st1 import topic

LAB = []

LAB.append(topic(
    "Labs 1-3 — Binary, Octal, Decimal & Hexadecimal Conversion",
    "Number systems",
    r"""
<h3>Problem</h3>
<p>Implement conversion between binary, octal, decimal and hexadecimal.</p>

<h3>Idea</h3>
<p>Everything routes through decimal: <em>source base &rarr; decimal &rarr; target base</em>.
To go to base b, repeatedly divide by b and read the remainders bottom-up.
To come from base b, multiply-accumulate each digit: <code>value = value * b + digit</code>.</p>

<pre><code class="language-java">public class BaseConverter {

    // decimal -> any base (2..16), done by hand
    static String toBase(int n, int base) {
        if (n == 0) return "0";
        String digits = "0123456789ABCDEF";
        StringBuilder sb = new StringBuilder();
        while (n &gt; 0) {
            sb.append(digits.charAt(n % base));
            n /= base;
        }
        return sb.reverse().toString();
    }

    // any base -> decimal
    static int toDecimal(String s, int base) {
        int value = 0;
        for (char c : s.toUpperCase().toCharArray()) {
            int digit = Character.digit(c, base);
            if (digit &lt; 0) throw new NumberFormatException("Bad digit " + c + " for base " + base);
            value = value * base + digit;
        }
        return value;
    }

    public static void main(String[] args) {
        System.out.println(toBase(255, 2));           // 11111111
        System.out.println(toBase(255, 8));           // 377
        System.out.println(toBase(255, 16));          // FF
        System.out.println(toDecimal("FF", 16));      // 255

        // Built-in shortcuts - mention these for bonus marks
        System.out.println(Integer.toBinaryString(255));
        System.out.println(Integer.toOctalString(255));
        System.out.println(Integer.toHexString(255));
        System.out.println(Integer.parseInt("FF", 16));
    }
}</code></pre>

<div class="callout callout-tip">
  <strong>&#128161; Viva question:</strong> why is hexadecimal used for memory addresses? Because one hex digit is
  exactly four bits, so a 32-bit address is exactly eight compact digits.
</div>
"""
))

LAB.append(topic(
    "Labs 4-7 — Scientific Calculator & Precision Loss",
    "Floating point",
    r"""
<h3>Problem</h3>
<p>Implement a scientific calculator that demonstrates precision loss.</p>

<h3>Why precision is lost</h3>
<p><code>float</code> and <code>double</code> follow IEEE 754: numbers are stored in <em>binary</em>.
Values like 0.1 have no exact binary form, exactly as 1/3 has no exact decimal form. Small errors accumulate.</p>

<pre><code class="language-java">System.out.println(0.1 + 0.2);            // 0.30000000000000004
System.out.println(0.1 + 0.2 == 0.3);     // false!
System.out.println(1.0 / 0);              // Infinity  (no exception for doubles)
System.out.println(0.0 / 0);              // NaN
System.out.println(1 / 0);                // ArithmeticException (integers DO throw)</code></pre>

<pre><code class="language-java">import java.math.BigDecimal;
import java.math.RoundingMode;

public class Calculator {

    static double divide(double a, double b) {
        if (b == 0) throw new ArithmeticException("Division by zero");
        return a / b;
    }

    // Never compare doubles with ==
    static boolean equals(double a, double b) {
        return Math.abs(a - b) &lt; 1e-9;
    }

    public static void main(String[] args) {
        System.out.println(Math.sqrt(16));            // 4.0
        System.out.println(Math.pow(2, 10));          // 1024.0
        System.out.println(Math.log(Math.E));         // 1.0
        System.out.println(Math.sin(Math.toRadians(30)));   // 0.5 (approximately)

        // Exact arithmetic for money - use BigDecimal, and the STRING constructor
        BigDecimal x = new BigDecimal("0.1");
        BigDecimal y = new BigDecimal("0.2");
        System.out.println(x.add(y));                            // 0.3 exactly
        System.out.println(x.divide(new BigDecimal("3"), 4, RoundingMode.HALF_UP));
    }
}</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Two rules:</strong> compare doubles with a small epsilon, never <code>==</code>;
  and use <code>BigDecimal</code> for money — <code>new BigDecimal(0.1)</code> (double argument) reintroduces the
  error, so always pass a String.
</div>
"""
))

LAB.append(topic(
    "Lab 8 & Labs 9-15 — Swap, Bit Tricks & Overflow Detection",
    "Bit manipulation",
    r"""
<h3>Lab 8 — Swap two numbers without a temporary variable</h3>
<pre><code class="language-java">// Arithmetic version (can overflow for huge values)
a = a + b;  b = a - b;  a = a - b;

// XOR version - preferred
a = a ^ b;  b = a ^ b;  a = a ^ b;

// One-liner
a = a + b - (b = a);</code></pre>
<div class="callout callout-warning">
  <strong>&#9888;&#65039;</strong> Both tricks break if you swap a variable with <em>itself</em> (same memory):
  XOR leaves it as 0. Guard with <code>if (i != j)</code>.
</div>

<h3>Labs 9-15 (1) — Count set bits</h3>
<pre><code class="language-java">static int countSetBits(int n) {          // Brian Kernighan - O(number of set bits)
    int count = 0;
    while (n != 0) { n &amp;= (n - 1); count++; }
    return count;
}
// Built-in: Integer.bitCount(n)</code></pre>

<h3>Labs 9-15 (2) — Nearest power of two</h3>
<pre><code class="language-java">static boolean isPowerOfTwo(int n) {
    return n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0;
}

static int nextPowerOfTwo(int n) {
    if (n &lt;= 1) return 1;
    return Integer.highestOneBit(n - 1) &lt;&lt; 1;
}

static int nearestPowerOfTwo(int n) {     // closest one, above or below
    int lower = Integer.highestOneBit(n);
    int upper = lower &lt;&lt; 1;
    return (n - lower) &lt;= (upper - n) ? lower : upper;
}</code></pre>

<h3>Labs 9-15 (3) — Will this addition overflow?</h3>
<pre><code class="language-java">public class OverflowCheck {

    static boolean willOverflow(int a, int b) {
        long sum = (long) a + (long) b;                     // do it in 64 bits
        return sum &gt; Integer.MAX_VALUE || sum &lt; Integer.MIN_VALUE;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();

        if (willOverflow(a, b)) {
            System.out.println("Overflow would occur - addition not performed");
        } else {
            System.out.println("Sum = " + (a + b));
        }

        // Equivalent using the standard library
        try {
            System.out.println("Math.addExact = " + Math.addExact(a, b));
        } catch (ArithmeticException e) {
            System.out.println("Math.addExact reports overflow");
        }
    }
}</code></pre>
"""
))

LAB.append(topic(
    "Labs 16-20 — Anagrams & First Unique Character",
    "Strings, HashMap, sorting",
    r"""
<h3>1. Are two strings anagrams?</h3>
<pre><code class="language-java">// Approach A: sort both - O(n log n)
static boolean isAnagramSort(String a, String b) {
    if (a.length() != b.length()) return false;
    char[] x = a.toCharArray(), y = b.toCharArray();
    Arrays.sort(x); Arrays.sort(y);
    return Arrays.equals(x, y);
}

// Approach B: frequency count - O(n), the answer they want
static boolean isAnagram(String a, String b) {
    if (a.length() != b.length()) return false;
    int[] freq = new int[26];
    for (int i = 0; i &lt; a.length(); i++) {
        freq[a.charAt(i) - 'a']++;
        freq[b.charAt(i) - 'a']--;
    }
    for (int f : freq) if (f != 0) return false;
    return true;
}</code></pre>

<h3>2. Group words that are anagrams</h3>
<p>Key insight: all anagrams share the same <em>sorted</em> form, so use that as a HashMap key.</p>
<pre><code class="language-java">static Collection&lt;List&lt;String&gt;&gt; groupAnagrams(String[] words) {
    Map&lt;String, List&lt;String&gt;&gt; groups = new HashMap&lt;&gt;();
    for (String w : words) {
        char[] c = w.toCharArray();
        Arrays.sort(c);
        groups.computeIfAbsent(new String(c), k -&gt; new ArrayList&lt;&gt;()).add(w);
    }
    return groups.values();
}
// ["eat","tea","tan","ate","nat","bat"] -> [[eat, tea, ate], [tan, nat], [bat]]</code></pre>

<h3>3. First unique (non-repeating) character</h3>
<pre><code class="language-java">static char firstUnique(String s) {
    Map&lt;Character, Integer&gt; count = new LinkedHashMap&lt;&gt;();   // keeps insertion order
    for (char c : s.toCharArray()) count.merge(c, 1, Integer::sum);
    for (Map.Entry&lt;Character, Integer&gt; e : count.entrySet())
        if (e.getValue() == 1) return e.getKey();
    return '_';   // none found
}
// "swiss" -> 'w'</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Why LinkedHashMap:</strong> a plain <code>HashMap</code> has no order, so the "first" unique
  character would be random. This is exactly the kind of detail a viva targets.
</div>
"""
))

LAB.append(topic(
    "Labs 21-24 — Rotate a LinkedList by K & Mini Search Engine",
    "LinkedList, Map of Maps",
    r"""
<h3>1. Rotate a linked list by K positions</h3>
<pre><code class="language-java">// Using java.util.LinkedList - O(k)
static &lt;T&gt; void rotateLeft(LinkedList&lt;T&gt; list, int k) {
    if (list.isEmpty()) return;
    k = k % list.size();                 // k may be larger than the list
    for (int i = 0; i &lt; k; i++) list.addLast(list.removeFirst());
}

// Or in one call
Collections.rotate(list, -k);            // negative = left, positive = right</code></pre>

<p>The hand-written singly-linked version, which is what the viva asks for:</p>
<pre><code class="language-java">static Node rotateRight(Node head, int k) {
    if (head == null || head.next == null) return head;

    int len = 1;
    Node tail = head;
    while (tail.next != null) { tail = tail.next; len++; }

    k = k % len;
    if (k == 0) return head;

    tail.next = head;                    // close the ring
    Node newTail = head;
    for (int i = 1; i &lt; len - k; i++) newTail = newTail.next;

    Node newHead = newTail.next;
    newTail.next = null;                 // open it again at the new point
    return newHead;
}</code></pre>

<h3>2. Mini search engine — keyword counts across documents</h3>
<p>Build an <strong>inverted index</strong>: word &rarr; (document &rarr; count). That is a
<code>Map&lt;String, Map&lt;String, Integer&gt;&gt;</code>.</p>

<pre><code class="language-java">public class MiniSearchEngine {
    private final Map&lt;String, Map&lt;String, Integer&gt;&gt; index = new HashMap&lt;&gt;();

    public void addDocument(String docName, String text) {
        for (String word : text.toLowerCase().split("\\W+")) {
            if (word.isEmpty()) continue;
            index.computeIfAbsent(word, k -&gt; new HashMap&lt;&gt;())
                 .merge(docName, 1, Integer::sum);
        }
    }

    // Documents containing the keyword, most relevant first
    public List&lt;String&gt; search(String keyword) {
        return index.getOrDefault(keyword.toLowerCase(), Map.of())
                    .entrySet().stream()
                    .sorted(Map.Entry.&lt;String, Integer&gt;comparingByValue().reversed())
                    .map(e -&gt; e.getKey() + " (" + e.getValue() + " hits)")
                    .toList();
    }

    public static void main(String[] args) throws IOException {
        MiniSearchEngine se = new MiniSearchEngine();
        se.addDocument("doc1.txt", Files.readString(Path.of("doc1.txt")));
        se.addDocument("doc2.txt", Files.readString(Path.of("doc2.txt")));
        System.out.println(se.search("java"));
    }
}</code></pre>

<div class="callout callout-tip">
  <strong>&#128161;</strong> <code>split("\\W+")</code> splits on any run of non-word characters, so punctuation is
  handled for free. Searching the index is O(1) instead of rescanning every file.
</div>
"""
))

LAB.append(topic(
    "Labs 25-30 — Ride-Sharing Matching System (PriorityQueue)",
    "Heaps and comparators",
    r"""
<h3>Problem</h3>
<p>Match drivers to passengers using a <code>PriorityQueue</code>, always picking the nearest available driver.</p>

<h3>Design</h3>
<ul>
  <li><code>Driver</code> and <code>Passenger</code> hold an id and an (x, y) position.</li>
  <li>For each ride request, order available drivers by distance in a min-heap and <code>poll()</code> the closest.</li>
  <li>Building a heap is O(n); each match is O(log n) — far better than sorting the whole list every time.</li>
</ul>

<pre><code class="language-java">import java.util.*;

class Driver {
    final String id; final double x, y; boolean available = true;
    Driver(String id, double x, double y) { this.id = id; this.x = x; this.y = y; }
    double distanceTo(Passenger p) { return Math.hypot(x - p.x, y - p.y); }
    @Override public String toString() { return id; }
}

class Passenger {
    final String id; final double x, y;
    Passenger(String id, double x, double y) { this.id = id; this.x = x; this.y = y; }
}

public class RideMatcher {
    private final List&lt;Driver&gt; drivers = new ArrayList&lt;&gt;();

    void register(Driver d) { drivers.add(d); }

    Optional&lt;Driver&gt; match(Passenger p) {
        PriorityQueue&lt;Driver&gt; nearest = new PriorityQueue&lt;&gt;(
                Comparator.comparingDouble(d -&gt; d.distanceTo(p)));   // min-heap by distance

        for (Driver d : drivers) if (d.available) nearest.offer(d);

        Driver chosen = nearest.poll();
        if (chosen == null) return Optional.empty();     // no driver free right now
        chosen.available = false;                        // mark as busy
        return Optional.of(chosen);
    }

    public static void main(String[] args) {
        RideMatcher app = new RideMatcher();
        app.register(new Driver("D1", 0, 0));
        app.register(new Driver("D2", 3, 4));     // 5 units away from (0,0)
        app.register(new Driver("D3", 1, 1));     // 1.41 units away

        Passenger p = new Passenger("P1", 0, 0);
        app.match(p).ifPresentOrElse(
            d -&gt; System.out.println("Matched with " + d),
            () -&gt; System.out.println("No drivers available"));
        // Matched with D3
    }
}</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Talking points for the viva:</strong>
  <ul>
    <li><code>Comparator.comparingDouble</code> gives a min-heap; wrap with <code>.reversed()</code> for a max-heap.</li>
    <li><code>Math.hypot(dx, dy)</code> is a safer <code>sqrt(dx*dx + dy*dy)</code> (no overflow).</li>
    <li>Edge cases: no drivers available, several drivers equidistant (any is fine), driver goes offline mid-match.</li>
    <li>Extension: give the comparator a rating tie-breaker with <code>.thenComparing(...)</code>.</li>
  </ul>
</div>
"""
))

LAB.append(topic(
    "Labs 31-40 — Generic Utilities, Pair, Stack, Queue, Matrix & Sorting Framework",
    "Generics in practice",
    r"""
<h3>1. Generic array utility</h3>
<pre><code class="language-java">public final class ArrayUtils {
    private ArrayUtils() { }

    public static &lt;T&gt; void print(T[] a) { System.out.println(Arrays.toString(a)); }

    public static &lt;T&gt; void reverse(T[] a) {
        for (int i = 0, j = a.length - 1; i &lt; j; i++, j--) {
            T tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
    }

    public static &lt;T extends Comparable&lt;T&gt;&gt; T max(T[] a) {
        T best = a[0];
        for (T x : a) if (x.compareTo(best) &gt; 0) best = x;
        return best;
    }
}</code></pre>

<h3>2. Pair class</h3>
<pre><code class="language-java">public class Pair&lt;K, V&gt; {
    private final K key; private final V value;
    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }
    public &lt;R&gt; Pair&lt;K, R&gt; withValue(R v) { return new Pair&lt;&gt;(key, v); }
    @Override public String toString() { return "(" + key + ", " + value + ")"; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Pair&lt;?, ?&gt; p)) return false;
        return Objects.equals(key, p.key) &amp;&amp; Objects.equals(value, p.value);
    }
    @Override public int hashCode() { return Objects.hash(key, value); }
}</code></pre>

<h3>3. Generic stack and queue</h3>
<pre><code class="language-java">public class GenericStack&lt;T&gt; {
    private final List&lt;T&gt; items = new ArrayList&lt;&gt;();

    public void push(T item) { items.add(item); }

    public T pop() {
        if (isEmpty()) throw new NoSuchElementException("Stack is empty");
        return items.remove(items.size() - 1);      // last in, first out
    }

    public T peek() {
        if (isEmpty()) throw new NoSuchElementException("Stack is empty");
        return items.get(items.size() - 1);
    }

    public boolean isEmpty() { return items.isEmpty(); }
    public int size() { return items.size(); }
}

public class GenericQueue&lt;T&gt; {
    private final Deque&lt;T&gt; items = new ArrayDeque&lt;&gt;();
    public void enqueue(T item) { items.addLast(item); }
    public T dequeue() {
        if (items.isEmpty()) throw new NoSuchElementException("Queue is empty");
        return items.removeFirst();                 // first in, first out
    }
}</code></pre>

<h3>4. Matrix operations</h3>
<pre><code class="language-java">static int[][] multiply(int[][] a, int[][] b) {
    int n = a.length, m = b[0].length, k = b.length;
    if (a[0].length != k) throw new IllegalArgumentException("Dimension mismatch");
    int[][] c = new int[n][m];
    for (int i = 0; i &lt; n; i++)
        for (int j = 0; j &lt; m; j++)
            for (int x = 0; x &lt; k; x++)
                c[i][j] += a[i][x] * b[x][j];
    return c;                                        // O(n*m*k)
}

static int[][] transpose(int[][] a) {
    int[][] t = new int[a[0].length][a.length];
    for (int i = 0; i &lt; a.length; i++)
        for (int j = 0; j &lt; a[0].length; j++)
            t[j][i] = a[i][j];
    return t;
}</code></pre>

<h3>5. Generic repository</h3>
<pre><code class="language-java">public class Repository&lt;T, ID&gt; {
    private final Map&lt;ID, T&gt; store = new HashMap&lt;&gt;();
    private final Function&lt;T, ID&gt; idExtractor;

    public Repository(Function&lt;T, ID&gt; idExtractor) { this.idExtractor = idExtractor; }

    public void save(T item)          { store.put(idExtractor.apply(item), item); }
    public Optional&lt;T&gt; findById(ID id){ return Optional.ofNullable(store.get(id)); }
    public List&lt;T&gt; findAll()          { return new ArrayList&lt;&gt;(store.values()); }
    public void delete(ID id)         { store.remove(id); }
}

Repository&lt;Student, Integer&gt; repo = new Repository&lt;&gt;(Student::getId);</code></pre>

<h3>6. Sorting framework</h3>
<pre><code class="language-java">public interface Sorter {
    &lt;T extends Comparable&lt;T&gt;&gt; void sort(T[] array);
}

public class BubbleSort implements Sorter {
    @Override public &lt;T extends Comparable&lt;T&gt;&gt; void sort(T[] a) {
        for (int i = 0; i &lt; a.length - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j &lt; a.length - 1 - i; j++) {
                if (a[j].compareTo(a[j + 1]) &gt; 0) {
                    T t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                    swapped = true;
                }
            }
            if (!swapped) break;                     // already sorted - O(n) best case
        }
    }
}
// Swap the implementation without touching the caller: new BubbleSort() -> new MergeSort()</code></pre>

<div class="callout callout-tip">
  <strong>&#128161;</strong> This is the <em>strategy pattern</em>: one interface, several interchangeable algorithms.
  Say that name in the viva.
</div>
"""
))

LAB.append(topic(
    "Labs 41-50 — Lambda Palindrome & Stream Programs",
    "Functional style",
    r"""
<h3>Labs 41-45 — Palindrome test with a lambda</h3>
<pre><code class="language-java">import java.util.function.Predicate;

public class PalindromeLambda {
    public static void main(String[] args) {

        Predicate&lt;String&gt; isPalindrome =
            s -&gt; s.equals(new StringBuilder(s).reverse().toString());

        // Ignore case, spaces and punctuation
        Predicate&lt;String&gt; isCleanPalindrome = s -&gt; {
            String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");
            return clean.equals(new StringBuilder(clean).reverse().toString());
        };

        System.out.println(isPalindrome.test("madam"));                  // true
        System.out.println(isCleanPalindrome.test("A man, a plan, a canal: Panama"));  // true

        // Combine predicates
        Predicate&lt;String&gt; notEmpty = s -&gt; s != null &amp;&amp; !s.isBlank();
        System.out.println(notEmpty.and(isCleanPalindrome).test("racecar"));

        // Filter a whole list
        List&lt;String&gt; words = List.of("level", "java", "radar", "code");
        System.out.println(words.stream().filter(isPalindrome).toList());  // [level, radar]
    }
}</code></pre>

<h3>Labs 46-50 (1) — Remove duplicates using stream operations</h3>
<pre><code class="language-java">List&lt;String&gt; names = List.of("Aman", "Riya", "Aman", "Karan", "Riya");

List&lt;String&gt; unique = names.stream().distinct().toList();          // [Aman, Riya, Karan]

// Case-insensitive duplicates
List&lt;String&gt; uniqueIgnoreCase = names.stream()
        .collect(Collectors.toMap(String::toLowerCase, s -&gt; s, (a, b) -&gt; a))
        .values().stream().toList();

// Duplicates only
Set&lt;String&gt; seen = new HashSet&lt;&gt;();
List&lt;String&gt; dupes = names.stream().filter(n -&gt; !seen.add(n)).distinct().toList();</code></pre>
<p><code>distinct()</code> uses <code>equals()</code>/<code>hashCode()</code>, so your own classes must override both.</p>

<h3>Labs 46-50 (2) — Generate official email IDs using map()</h3>
<pre><code class="language-java">List&lt;String&gt; names = List.of("Aman Sharma", "Riya Gupta", "Karan Mehta");

List&lt;String&gt; emails = names.stream()
        .map(String::trim)
        .map(String::toLowerCase)
        .map(n -&gt; n.replaceAll("\\s+", "."))
        .map(n -&gt; n + "@chitkara.edu.in")
        .toList();
// [aman.sharma@chitkara.edu.in, riya.gupta@chitkara.edu.in, karan.mehta@chitkara.edu.in]

// Name -> email map
Map&lt;String, String&gt; directory = names.stream()
        .collect(Collectors.toMap(n -&gt; n,
                 n -&gt; n.toLowerCase().replace(" ", ".") + "@chitkara.edu.in"));</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; <code>Collectors.toMap</code> throws <code>IllegalStateException</code> on a duplicate key.</strong>
  Pass a third merge argument — <code>(a, b) -&gt; a</code> — to say which one wins.
</div>
"""
))

LAB.append(topic(
    "Labs 51-56 — Debugging: Infinite Loops, Empty Input, Memory Leaks & Edge Cases",
    "Defensive programming",
    r"""
<h3>1. Debug a program stuck in endless execution</h3>
<pre><code class="language-java">// BUG: i is never incremented
int i = 0;
while (i &lt; 10) { System.out.println(i); }

// BUG: floating point never lands exactly on 1.0
for (double d = 0; d != 1.0; d += 0.1) { }
// FIX: for (int k = 0; k &lt; 10; k++) { double d = k / 10.0; }

// BUG: the loop variable is modified inside the body
for (int k = 0; k &lt; n; k++) { if (bad) k--; }</code></pre>
<p><strong>How to find it:</strong> print the loop variable each iteration, or attach the debugger and pause —
the stack shows exactly which loop is spinning. A safety counter helps too:</p>
<pre><code class="language-java">int guard = 0;
while (condition) {
    if (++guard &gt; 1_000_000) throw new IllegalStateException("Loop did not terminate");
}</code></pre>

<h3>2. Handle empty input properly</h3>
<pre><code class="language-java">BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String line = br.readLine();

if (line == null || line.isBlank()) {          // null = end of stream, blank = only whitespace
    System.out.println("No input provided");
    return;
}

int[] nums = Arrays.stream(line.trim().split("\\s+"))
                   .mapToInt(Integer::parseInt).toArray();

if (nums.length == 0) {
    System.out.println("Average = 0 (no numbers)");   // never divide by zero
} else {
    System.out.println("Average = " + Arrays.stream(nums).average().getAsDouble());
}</code></pre>

<h3>3. Identify and report memory leaks</h3>
<pre><code class="language-java">public class LeakDemo {
    // The leak: a static list that only ever grows
    private static final List&lt;byte[]&gt; CACHE = new ArrayList&lt;&gt;();

    public static void main(String[] args) {
        Runtime rt = Runtime.getRuntime();
        for (int i = 0; i &lt; 100; i++) {
            CACHE.add(new byte[1024 * 1024]);              // 1 MB each, never released
            long usedMB = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);
            System.out.println("Iteration " + i + " - used " + usedMB + " MB");
        }
    }
}</code></pre>
<p>Report: memory keeps climbing and never falls after GC. Fixes: bound the cache
(<code>LinkedHashMap</code> with <code>removeEldestEntry</code>), use <code>WeakHashMap</code>, deregister listeners,
and close resources with try-with-resources. Tools: <code>jvisualvm</code>, <code>jmap -histo &lt;pid&gt;</code>,
<code>java -XX:+HeapDumpOnOutOfMemoryError</code>.</p>

<h3>4. Process collection edge cases</h3>
<pre><code class="language-java">// Empty collection
list.stream().mapToInt(Integer::intValue).average().orElse(0);   // not .getAsDouble()

// Nulls inside the collection
list.stream().filter(Objects::nonNull).toList();

// Immutable list - List.of(...) throws on modification
List&lt;String&gt; safe = new ArrayList&lt;&gt;(List.of("a", "b"));

// Modifying while iterating
list.removeIf(s -&gt; s.isEmpty());          // instead of removing inside a for-each

// Map lookup that may miss
int c = map.getOrDefault(key, 0);         // instead of map.get(key) which can be null</code></pre>

<div class="callout callout-key">
  <strong>&#128273; The habit that prevents all four labs:</strong> before writing the happy path, ask
  "what if it is empty, null, huge, or already used?" Write those checks first.
</div>
"""
))

LAB.append(topic(
    "Labs 57-60 — Connect Java to MySQL & a Connection Manager",
    "JDBC in the lab",
    r"""
<h3>Setup</h3>
<ol>
  <li>Download <code>mysql-connector-j-x.x.x.jar</code>.</li>
  <li>Compile and run with it on the classpath:
      <code>javac -cp .:mysql-connector-j.jar App.java</code> then
      <code>java -cp .:mysql-connector-j.jar App</code> (Windows uses <code>;</code> instead of <code>:</code>).</li>
  <li>Create the schema first in MySQL Workbench or the CLI.</li>
</ol>

<pre><code class="language-sql">CREATE DATABASE school;
USE school;
CREATE TABLE Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gpa DECIMAL(3,2)
);
INSERT INTO Students(name, gpa) VALUES ('Aman', 8.4), ('Riya', 9.1);</code></pre>

<h3>Lab 57-60 (1) — Connect and display all records</h3>
<pre><code class="language-java">import java.sql.*;

public class ShowStudents {
    public static void main(String[] args) {
        String url  = "jdbc:mysql://localhost:3306/school?useSSL=false&amp;serverTimezone=UTC";
        String user = "root";
        String pass = System.getenv("DB_PASSWORD");

        String sql = "SELECT id, name, gpa FROM Students ORDER BY id";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            System.out.printf("%-5s %-20s %s%n", "ID", "NAME", "GPA");
            while (rs.next()) {
                System.out.printf("%-5d %-20s %.2f%n",
                        rs.getInt("id"), rs.getString("name"), rs.getDouble("gpa"));
            }
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
    }
}</code></pre>

<h3>Lab 57-60 (2) — A simple connection manager for several databases</h3>
<pre><code class="language-java">import java.sql.*;
import java.util.*;

public class ConnectionManager {

    private record Config(String url, String user, String pass) { }

    private static final Map&lt;String, Config&gt; CONFIGS = new HashMap&lt;&gt;();
    static {
        CONFIGS.put("school",  new Config("jdbc:mysql://localhost:3306/school",  "root", env("DB_PASSWORD")));
        CONFIGS.put("library", new Config("jdbc:mysql://localhost:3306/library", "root", env("DB_PASSWORD")));
    }

    private static String env(String k) { return System.getenv().getOrDefault(k, ""); }

    public static Connection get(String name) throws SQLException {
        Config c = CONFIGS.get(name);
        if (c == null) throw new IllegalArgumentException("Unknown database: " + name);
        return DriverManager.getConnection(c.url(), c.user(), c.pass());
    }

    public static void main(String[] args) throws SQLException {
        try (Connection school = get("school");
             Connection library = get("library")) {
            System.out.println("school  -> " + school.getMetaData().getDatabaseProductVersion());
            System.out.println("library -> " + library.getCatalog());
        }
    }
}</code></pre>

<h3>Errors you will hit, and what they mean</h3>
<table>
  <thead><tr><th>Message</th><th>Cause</th></tr></thead>
  <tbody>
    <tr><td><code>No suitable driver found</code></td><td>the connector jar is not on the classpath</td></tr>
    <tr><td><code>Access denied for user</code></td><td>wrong username or password</td></tr>
    <tr><td><code>Unknown database 'school'</code></td><td>the schema was never created</td></tr>
    <tr><td><code>Communications link failure</code></td><td>MySQL is not running, or the port is wrong</td></tr>
    <tr><td><code>The server time zone value is unrecognized</code></td><td>add <code>serverTimezone=UTC</code> to the URL</td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>&#128273; Marks are given for:</strong> try-with-resources, <code>PreparedStatement</code>,
  credentials read from the environment rather than hardcoded, and a real <code>catch (SQLException)</code>
  that prints something useful.
</div>
"""
))
