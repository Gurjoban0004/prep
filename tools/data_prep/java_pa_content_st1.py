"""ST-1 notes (lectures 1-14) for Programming Abstractions using JAVA (24CSE0314)."""


def topic(title, subtitle, html):
    return {"title": title, "subtitle": subtitle, "html": html.strip()}


ST1 = []

ST1.append(topic(
    "How Java Actually Runs — JDK, JRE, JVM & Bytecode",
    "Lecture 1 · compile once, run anywhere",
    r"""
<p>Before any syntax, get this picture clear — a good chunk of ST-1 theory marks come from it.</p>

<h3>1. The journey of a Java program</h3>
<p>You write <code>Hello.java</code> &rarr; the compiler (<code>javac</code>) turns it into <code>Hello.class</code>, which holds
<strong>bytecode</strong> (not machine code) &rarr; the <strong>JVM</strong> reads that bytecode and runs it on your actual machine.</p>

<pre><code class="language-java">// Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}</code></pre>

<pre><code class="language-bash">javac Hello.java   # source  -> bytecode (Hello.class)
java Hello         # JVM loads and runs the bytecode</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Why "Write Once, Run Anywhere" works:</strong> the <em>bytecode</em> is identical everywhere.
  Only the JVM changes from Windows to Linux to Mac. Your <code>.class</code> file does not.
</div>

<h3>2. JDK vs JRE vs JVM — the classic one-mark question</h3>
<table>
  <thead><tr><th>Name</th><th>Full form</th><th>What is inside</th><th>Who needs it</th></tr></thead>
  <tbody>
    <tr><td><code>JVM</code></td><td>Java Virtual Machine</td><td>The engine that executes bytecode</td><td>Anyone running Java</td></tr>
    <tr><td><code>JRE</code></td><td>Java Runtime Environment</td><td>JVM + standard library (<code>java.lang</code>, <code>java.util</code>...)</td><td>Users who only run apps</td></tr>
    <tr><td><code>JDK</code></td><td>Java Development Kit</td><td>JRE + <code>javac</code>, <code>javadoc</code>, <code>jdb</code>, <code>jar</code></td><td>Developers (you)</td></tr>
  </tbody>
</table>
<p>Remember the nesting: <strong>JDK contains JRE contains JVM</strong>.</p>

<h3>3. Anatomy of the main method</h3>
<pre><code class="language-java">public static void main(String[] args)</code></pre>
<ul>
  <li><code>public</code> — the JVM must be able to call it from outside your class.</li>
  <li><code>static</code> — the JVM calls it <em>without creating an object</em> first.</li>
  <li><code>void</code> — it returns nothing to the JVM.</li>
  <li><code>String[] args</code> — command-line arguments, e.g. <code>java Hello 5 10</code>.</li>
</ul>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Exam trap:</strong> remove <code>static</code> and the code still <em>compiles</em>.
  It fails at <em>runtime</em> with <code>NoSuchMethodError: main</code>. Compile-time vs runtime failure is a favourite MCQ.
</div>

<h3>4. Source file rules</h3>
<ul>
  <li>A file may contain many classes but only <strong>one public class</strong>, and the file name must match it exactly (case sensitive).</li>
  <li>Every top-level class in the file produces its own <code>.class</code> file.</li>
  <li>Java is fully case sensitive: <code>String</code> is not <code>string</code>.</li>
</ul>
"""
))

ST1.append(topic(
    "Variables, Literals, Identifiers & Data Types",
    "Lectures 1-4 · primitives vs references",
    r"""
<h3>1. Identifiers — the names you invent</h3>
<p>Rules: start with a letter, <code>_</code> or <code>$</code>; then letters or digits; no keywords; no spaces.
Conventions (marks are given for following them):</p>
<table>
  <thead><tr><th>Thing</th><th>Style</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Class</td><td>PascalCase</td><td><code>StudentRecord</code></td></tr>
    <tr><td>Method / variable</td><td>camelCase</td><td><code>totalMarks</code></td></tr>
    <tr><td>Constant</td><td>UPPER_SNAKE</td><td><code>static final int MAX_SIZE</code></td></tr>
    <tr><td>Package</td><td>all lowercase</td><td><code>com.chitkara.dao</code></td></tr>
  </tbody>
</table>

<h3>2. The 8 primitive types — learn this table</h3>
<table>
  <thead><tr><th>Type</th><th>Size</th><th>Range</th><th>Default</th><th>Literal</th></tr></thead>
  <tbody>
    <tr><td><code>byte</code></td><td>8 bit</td><td>-128 to 127</td><td>0</td><td><code>byte b = 100;</code></td></tr>
    <tr><td><code>short</code></td><td>16 bit</td><td>-32,768 to 32,767</td><td>0</td><td><code>short s = 5000;</code></td></tr>
    <tr><td><code>int</code></td><td>32 bit</td><td>-2,147,483,648 to 2,147,483,647</td><td>0</td><td><code>int i = 42;</code></td></tr>
    <tr><td><code>long</code></td><td>64 bit</td><td>about +/- 9.2 x 10^18</td><td>0L</td><td><code>long l = 42L;</code></td></tr>
    <tr><td><code>float</code></td><td>32 bit</td><td>~7 decimal digits</td><td>0.0f</td><td><code>float f = 3.14f;</code></td></tr>
    <tr><td><code>double</code></td><td>64 bit</td><td>~15 decimal digits</td><td>0.0d</td><td><code>double d = 3.14;</code></td></tr>
    <tr><td><code>char</code></td><td>16 bit</td><td>0 to 65,535 (Unicode)</td><td>space</td><td><code>char c = 'A';</code></td></tr>
    <tr><td><code>boolean</code></td><td>JVM dependent</td><td><code>true</code> / <code>false</code></td><td>false</td><td><code>boolean ok = true;</code></td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>&#128273; Two things examiners love:</strong>
  <ul>
    <li>A decimal literal is <code>double</code> by default, so <code>float f = 3.14;</code> <em>does not compile</em>. Write <code>3.14f</code>.</li>
    <li>A whole-number literal is <code>int</code> by default, so <code>long big = 3000000000;</code> fails. Write <code>3000000000L</code>.</li>
  </ul>
</div>

<h3>3. Primitive vs non-primitive (reference) types</h3>
<table>
  <thead><tr><th></th><th>Primitive</th><th>Reference (non-primitive)</th></tr></thead>
  <tbody>
    <tr><td>Holds</td><td>the value itself</td><td>the <em>address</em> of an object</td></tr>
    <tr><td>Lives in</td><td>stack (as a local variable)</td><td>object on the <strong>heap</strong>, address on the stack</td></tr>
    <tr><td>Default</td><td>0 / false / space</td><td><code>null</code></td></tr>
    <tr><td>Examples</td><td><code>int, double, char</code></td><td><code>String</code>, arrays, <code>ArrayList</code>, your own classes</td></tr>
  </tbody>
</table>

<pre><code class="language-java">int a = 10;
int b = a;      // b gets a COPY of the value
b = 20;         // a is still 10

int[] x = {1, 2, 3};
int[] y = x;    // y gets a copy of the ADDRESS - same array!
y[0] = 99;      // x[0] is now 99 too</code></pre>

<h3>4. Literal shorthand</h3>
<pre><code class="language-java">int dec = 100;
int bin = 0b1100100;   // binary
int oct = 0144;        // octal (leading zero)
int hex = 0x64;        // hexadecimal
int big = 1_000_000;   // underscores for readability (Java 7+)
char ch = 65;          // prints A - char is a number underneath</code></pre>

<h3>5. Wrapper classes and autoboxing</h3>
<p>Every primitive has an object twin: <code>int/Integer</code>, <code>double/Double</code>, <code>char/Character</code>.
Collections can only store objects, so Java converts automatically.</p>
<pre><code class="language-java">List&lt;Integer&gt; list = new ArrayList&lt;&gt;();
list.add(5);             // autoboxing: int -> Integer
int first = list.get(0); // unboxing:   Integer -> int</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; The <code>==</code> trap with wrappers:</strong> Java caches <code>Integer</code> objects from -128 to 127.
  So <code>Integer a = 100, b = 100; a == b</code> is <strong>true</strong>, but with <code>1000</code> it is <strong>false</strong>.
  Compare objects with <code>.equals()</code>, always.
</div>
"""
))

ST1.append(topic(
    "Type Conversion, Operators & Expressions",
    "Lectures 1-4 · widening, narrowing, precedence",
    r"""
<h3>1. Widening (automatic) vs narrowing (manual)</h3>
<p>A small box fits inside a big box, so Java does that silently. Big into small can lose data, so you must force it with a cast.</p>
<pre><code class="language-bash">byte -> short -> int -> long -> float -> double     (widening, automatic)
double -> float -> long -> int -> short -> byte     (narrowing, needs a cast)</code></pre>

<pre><code class="language-java">int i = 100;
double d = i;               // widening - automatic, d = 100.0

double price = 99.99;
int rupees = (int) price;   // narrowing - explicit cast, rupees = 99 (fraction CUT, not rounded)</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Casting truncates, it does not round.</strong> <code>(int) -9.9</code> is <code>-9</code>, not <code>-10</code>.
  Use <code>Math.round()</code> when you want real rounding.
</div>

<h3>2. Integer division bites everyone</h3>
<pre><code class="language-java">int a = 7, b = 2;
System.out.println(a / b);           // 3   <- int / int stays int
System.out.println(a / (double) b);  // 3.5 <- cast one side first
System.out.println(a % b);           // 1   <- remainder</code></pre>

<h3>3. Operator families</h3>
<table>
  <thead><tr><th>Family</th><th>Operators</th><th>Note</th></tr></thead>
  <tbody>
    <tr><td>Arithmetic</td><td><code>+ - * / %</code></td><td><code>+</code> also joins Strings</td></tr>
    <tr><td>Unary</td><td><code>++ -- + - !</code></td><td>pre vs post matters</td></tr>
    <tr><td>Relational</td><td><code>== != &gt; &lt; &gt;= &lt;=</code></td><td>result is <code>boolean</code></td></tr>
    <tr><td>Logical</td><td><code>&amp;&amp; || !</code></td><td>short-circuit</td></tr>
    <tr><td>Bitwise</td><td><code>&amp; | ^ ~ &lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></td><td>work bit by bit</td></tr>
    <tr><td>Assignment</td><td><code>= += -= *= /= %=</code></td><td><code>+=</code> hides a cast</td></tr>
    <tr><td>Ternary</td><td><code>cond ? a : b</code></td><td>the only 3-operand operator</td></tr>
  </tbody>
</table>

<h3>4. Pre vs post increment</h3>
<pre><code class="language-java">int x = 5;
System.out.println(x++);  // prints 5, THEN x becomes 6  (use, then increase)
System.out.println(++x);  // x becomes 7 first, prints 7 (increase, then use)</code></pre>

<h3>5. Short-circuit evaluation is a safety tool</h3>
<pre><code class="language-java">// If s is null, s.length() would crash. && stops as soon as the left side is false.
if (s != null &amp;&amp; s.length() &gt; 0) { }   // SAFE
if (s.length() &gt; 0 &amp;&amp; s != null) { }   // NullPointerException</code></pre>

<div class="callout callout-tip">
  <strong>&#128161; <code>&amp;</code> vs <code>&amp;&amp;</code>:</strong> <code>&amp;&amp;</code> skips the right side once it knows the answer.
  <code>&amp;</code> always evaluates both. Same story for <code>|</code> vs <code>||</code>.
</div>

<h3>6. The hidden cast in compound assignment</h3>
<pre><code class="language-java">byte b = 10;
b = b + 5;    // COMPILE ERROR: int cannot be converted to byte
b += 5;       // works - += secretly does b = (byte)(b + 5)</code></pre>

<h3>7. String comparison — the number one beginner bug</h3>
<pre><code class="language-java">String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");

s1 == s2         // true  - both point to the same String-pool object
s1 == s3         // false - s3 is a brand new object on the heap
s1.equals(s3)    // true  - compares the CONTENT. Always use this.</code></pre>
"""
))

ST1.append(topic(
    "Control Statements — Decisions & Loops",
    "Lectures 1-4 · if, switch, loops, break/continue",
    r"""
<h3>1. Decision making</h3>
<pre><code class="language-java">if (marks &gt;= 90)      grade = 'A';
else if (marks &gt;= 75) grade = 'B';
else                  grade = 'C';

// Ternary - the same idea in one line
char g = (marks &gt;= 90) ? 'A' : 'B';</code></pre>

<h3>2. switch — and the fall-through trap</h3>
<pre><code class="language-java">switch (day) {
    case 1:
    case 7:
        System.out.println("Weekend");
        break;                 // without break, execution FALLS THROUGH into the next case
    case 2: case 3: case 4: case 5: case 6:
        System.out.println("Weekday");
        break;
    default:
        System.out.println("Invalid");
}</code></pre>

<p>Java 14+ adds the arrow form, which never falls through and can return a value:</p>
<pre><code class="language-java">String type = switch (day) {
    case 1, 7 -&gt; "Weekend";
    default   -&gt; "Weekday";
};</code></pre>

<div class="callout callout-key">
  <strong>&#128273; What can a switch switch on?</strong> <code>byte, short, char, int</code>, their wrappers,
  <code>String</code> (Java 7+) and <code>enum</code>. <strong>Not</strong> <code>long</code>, <code>float</code>,
  <code>double</code> or <code>boolean</code>.
</div>

<h3>3. The four loops</h3>
<pre><code class="language-java">// 1. for - when you know the count
for (int i = 0; i &lt; 5; i++) { }

// 2. while - checks first, may run zero times
while (!queue.isEmpty()) { }

// 3. do-while - runs AT LEAST ONCE
do { input = sc.nextLine(); } while (input.isEmpty());

// 4. enhanced for (for-each) - read-only walk over an array or collection
for (String name : names) { System.out.println(name); }</code></pre>

<h3>4. break, continue and labels</h3>
<pre><code class="language-java">outer:
for (int i = 0; i &lt; n; i++) {
    for (int j = 0; j &lt; m; j++) {
        if (grid[i][j] == target) break outer;  // jumps out of BOTH loops
        if (grid[i][j] == 0) continue;          // skips just this iteration
    }
}</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Removing while looping:</strong> deleting from a list inside a for-each throws
  <code>ConcurrentModificationException</code>. Use an <code>Iterator</code> or, more simply:
  <pre><code class="language-java">list.removeIf(x -&gt; x &lt; 0);</code></pre>
</div>
"""
))

ST1.append(topic(
    "Overflow, Modular Arithmetic & Bit Manipulation",
    "Lectures 1-4 · the number-safety block",
    r"""
<h3>1. What overflow actually is</h3>
<p><code>int</code> stops at 2,147,483,647. Add one more and it silently <em>wraps around</em> to the most negative value.
Java gives no warning — this is the most dangerous silent bug in the syllabus.</p>

<pre><code class="language-java">int max = Integer.MAX_VALUE;       // 2147483647
System.out.println(max + 1);       // -2147483648  (wrapped!)</code></pre>

<h3>2. Three ways to stay safe</h3>
<pre><code class="language-java">// (a) Ask Java to throw instead of wrapping
try {
    int safe = Math.addExact(a, b);
} catch (ArithmeticException e) {
    System.out.println("Overflow detected before it could corrupt the result");
}

// (b) Do the arithmetic in a wider type
long sum = (long) a + (long) b;
boolean overflows = sum &gt; Integer.MAX_VALUE || sum &lt; Integer.MIN_VALUE;

// (c) Sign logic (the classic written-exam answer)
// same signs going in, different sign coming out => overflow
int result = a + b;
boolean overflowed = ((a ^ result) &amp; (b ^ result)) &lt; 0;</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Labs 9-15 ask exactly this:</strong> "accept two integers and determine whether their sum will
  overflow <em>before</em> performing the addition." Answer with <code>Math.addExact</code> in a try-catch, or the
  <code>long</code> widening check.
</div>

<h3>3. Modular arithmetic — keeping numbers small</h3>
<p>Contest problems ask for the answer "modulo 1e9+7" so results always fit in an <code>int</code>.</p>
<pre><code class="language-java">final long MOD = 1_000_000_007L;

long add(long a, long b) { return (a + b) % MOD; }
long mul(long a, long b) { return (a % MOD) * (b % MOD) % MOD; }

// Java's % can return a NEGATIVE value:
System.out.println(-7 % 3);               // -1
System.out.println(Math.floorMod(-7, 3)); //  2  <- use this for a true "mod"</code></pre>

<h3>4. Bit manipulation cheat sheet</h3>
<table>
  <thead><tr><th>Goal</th><th>Trick</th></tr></thead>
  <tbody>
    <tr><td>Is n even?</td><td><code>(n &amp; 1) == 0</code></td></tr>
    <tr><td>Multiply by 2^k</td><td><code>n &lt;&lt; k</code></td></tr>
    <tr><td>Divide by 2^k</td><td><code>n &gt;&gt; k</code></td></tr>
    <tr><td>Check i-th bit</td><td><code>(n &gt;&gt; i &amp; 1) == 1</code></td></tr>
    <tr><td>Set i-th bit</td><td><code>n | (1 &lt;&lt; i)</code></td></tr>
    <tr><td>Clear i-th bit</td><td><code>n &amp; ~(1 &lt;&lt; i)</code></td></tr>
    <tr><td>Toggle i-th bit</td><td><code>n ^ (1 &lt;&lt; i)</code></td></tr>
    <tr><td>Drop lowest set bit</td><td><code>n &amp; (n - 1)</code></td></tr>
    <tr><td>Is power of two?</td><td><code>n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0</code></td></tr>
  </tbody>
</table>

<pre><code class="language-java">// Count set bits - Brian Kernighan: loops once per SET bit, not per bit
public static int countSetBits(int n) {
    int count = 0;
    while (n != 0) { n &amp;= (n - 1); count++; }
    return count;
}
Integer.bitCount(n);                       // built-in shortcut

int nextPow2 = Integer.highestOneBit(n - 1) &lt;&lt; 1;   // nearest power of two above n

// Swap two numbers without a temp variable (Lab 8)
a = a ^ b;  b = a ^ b;  a = a ^ b;</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; <code>&gt;&gt;</code> vs <code>&gt;&gt;&gt;</code>:</strong> <code>&gt;&gt;</code> keeps the sign bit (arithmetic shift),
  <code>&gt;&gt;&gt;</code> pushes in zeros (logical shift). For negative numbers they differ.
</div>
"""
))

ST1.append(topic(
    "OOP Part 1 — Classes, Objects, Encapsulation",
    "Lectures 1-4 · the four pillars, first half",
    r"""
<h3>1. Class vs object</h3>
<p>A <strong>class</strong> is the blueprint. An <strong>object</strong> is one house built from it.
The blueprint costs nothing; each house takes real memory on the heap.</p>

<pre><code class="language-java">public class Student {
    private String name;      // instance variable (state)
    private int marks;

    public Student(String name, int marks) {   // constructor
        this.name = name;                       // "this" = the object being built
        this.marks = marks;
    }

    public String getName()  { return name; }   // getter
    public void setMarks(int m) {               // setter with validation
        if (m &gt;= 0 &amp;&amp; m &lt;= 100) this.marks = m;
    }
}

Student s = new Student("Aman", 88);   // object created on the heap</code></pre>

<h3>2. Encapsulation — pillar 1</h3>
<p>Make fields <code>private</code>, expose <code>public</code> getters/setters. The benefit is not secrecy, it is
<strong>control</strong>: nobody can set marks to 500 because the setter validates.</p>

<table>
  <thead><tr><th>Modifier</th><th>Same class</th><th>Same package</th><th>Subclass</th><th>Everywhere</th></tr></thead>
  <tbody>
    <tr><td><code>private</code></td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
    <tr><td>(default)</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td></tr>
    <tr><td><code>protected</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td></tr>
    <tr><td><code>public</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  </tbody>
</table>

<h3>3. Constructors</h3>
<ul>
  <li>Same name as the class, <strong>no return type</strong>.</li>
  <li>If you write none, Java gives you a no-arg default. Write any constructor and that free one disappears.</li>
  <li>Overload them; chain with <code>this(...)</code>; call the parent with <code>super(...)</code> (must be the first line).</li>
</ul>

<pre><code class="language-java">public Student() { this("Unknown", 0); }   // constructor chaining</code></pre>

<h3>4. static vs instance</h3>
<table>
  <thead><tr><th></th><th><code>static</code> member</th><th>Instance member</th></tr></thead>
  <tbody>
    <tr><td>Belongs to</td><td>the class</td><td>each object</td></tr>
    <tr><td>Copies in memory</td><td>exactly one</td><td>one per object</td></tr>
    <tr><td>Called as</td><td><code>Student.count</code></td><td><code>s.getName()</code></td></tr>
    <tr><td>Can use <code>this</code>?</td><td>No</td><td>Yes</td></tr>
  </tbody>
</table>

<pre><code class="language-java">public class Student {
    private static int count = 0;    // shared by every Student
    public Student() { count++; }
    public static int getCount() { return count; }
}</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Common error:</strong> "non-static variable cannot be referenced from a static context" —
  you touched an instance field from <code>main</code>. Fix it by creating an object first, or by making the field static.
</div>

<h3>5. Object methods you should override</h3>
<pre><code class="language-java">@Override public String toString() { return name + " (" + marks + ")"; }
@Override public boolean equals(Object o) { ... }   // content equality
@Override public int hashCode() { return Objects.hash(name, marks); }</code></pre>

<div class="callout callout-key">
  <strong>&#128273; The equals/hashCode contract:</strong> if two objects are <code>equals</code>, they <em>must</em> return the same
  <code>hashCode</code>. Break this and your objects get lost inside a <code>HashMap</code> or <code>HashSet</code> —
  a very common ST-1 question.
</div>
"""
))

ST1.append(topic(
    "OOP Part 2 — Inheritance, Polymorphism, Abstraction",
    "Lectures 1-4 · the four pillars, second half",
    r"""
<h3>1. Inheritance — pillar 2</h3>
<p><code>extends</code> means "is a kind of". The child gets the parent's members and can add or change behaviour.
Java supports single inheritance of classes only (a class has one parent) to avoid the diamond problem;
you get multiple inheritance of <em>type</em> through interfaces.</p>

<pre><code class="language-java">class Vehicle {
    protected String brand;
    public void start() { System.out.println("Starting..."); }
}

class Car extends Vehicle {
    private int doors;
    @Override public void start() { System.out.println(brand + " car ignition on"); }
}</code></pre>

<h3>2. Polymorphism — pillar 3</h3>
<p>"One name, many forms." Two flavours, and telling them apart is a guaranteed exam question:</p>

<table>
  <thead><tr><th></th><th>Overloading (compile time)</th><th>Overriding (runtime)</th></tr></thead>
  <tbody>
    <tr><td>Where</td><td>same class</td><td>parent and child class</td></tr>
    <tr><td>Signature</td><td>parameters must differ</td><td>parameters must be identical</td></tr>
    <tr><td>Return type</td><td>can differ</td><td>same or a subtype (covariant)</td></tr>
    <tr><td>Decided</td><td>by the compiler (static binding)</td><td>by the JVM (dynamic binding)</td></tr>
  </tbody>
</table>

<pre><code class="language-java">// Overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Overriding + dynamic dispatch
Vehicle v = new Car();   // reference type Vehicle, object type Car
v.start();               // runs Car's start() - decided at RUNTIME</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Upcasting rule:</strong> a parent reference can hold a child object and only sees the
  <em>parent's</em> methods, but the <em>child's</em> overridden version actually runs. This is the heart of polymorphism.
</div>

<h3>3. Abstraction — pillar 4: abstract class vs interface</h3>
<table>
  <thead><tr><th></th><th><code>abstract class</code></th><th><code>interface</code></th></tr></thead>
  <tbody>
    <tr><td>Keyword to use it</td><td><code>extends</code> (only one)</td><td><code>implements</code> (many)</td></tr>
    <tr><td>Fields</td><td>any kind</td><td><code>public static final</code> only</td></tr>
    <tr><td>Methods</td><td>abstract + concrete</td><td>abstract, plus <code>default</code>/<code>static</code>/<code>private</code> (Java 8+)</td></tr>
    <tr><td>Constructor</td><td>Yes</td><td>No</td></tr>
    <tr><td>Use it when</td><td>classes share code and state</td><td>unrelated classes share a capability</td></tr>
  </tbody>
</table>

<pre><code class="language-java">abstract class Shape {
    abstract double area();                       // no body - children must supply one
    void describe() { System.out.println("Area = " + area()); }  // shared code
}

interface Drawable {
    void draw();
    default void printLabel() { System.out.println("Drawable"); }  // Java 8 default method
}

class Circle extends Shape implements Drawable {
    private double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
    @Override public void draw() { System.out.println("Drawing a circle"); }
}</code></pre>

<h3>4. final, super and the object family</h3>
<ul>
  <li><code>final</code> variable = constant, <code>final</code> method = cannot be overridden, <code>final</code> class = cannot be extended (e.g. <code>String</code>).</li>
  <li><code>super.method()</code> calls the parent version; <code>super(...)</code> calls the parent constructor.</li>
  <li>Every class silently extends <code>Object</code>, which is where <code>toString</code>, <code>equals</code>, <code>hashCode</code> come from.</li>
</ul>

<div class="callout callout-tip">
  <strong>&#128161; Composition over inheritance:</strong> if the relationship is "has a" rather than "is a"
  (a <code>Car</code> <em>has an</em> <code>Engine</code>), hold a field instead of extending. Effective Java's advice, and it
  keeps designs flexible.
</div>
"""
))

ST1.append(topic(
    "Arrays, Strings, Methods & Packages",
    "Lectures 1-4 · the everyday toolbox",
    r"""
<h3>1. Arrays</h3>
<pre><code class="language-java">int[] a = new int[5];            // all zeros
int[] b = {10, 20, 30};          // literal
int[][] grid = new int[3][4];    // 2-D

System.out.println(b.length);    // 3  - length is a FIELD for arrays
Arrays.sort(b);
int pos = Arrays.binarySearch(b, 20);      // array must be sorted first
int[] copy = Arrays.copyOf(b, 5);
System.out.println(Arrays.toString(b));    // [10, 20, 30]</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Three easy marks lost here:</strong> arrays use <code>.length</code>,
  <code>String</code> uses <code>.length()</code>, collections use <code>.size()</code>.
  Also, an array's size is fixed forever once created.
</div>

<h3>2. Strings are immutable</h3>
<p>Every "change" to a <code>String</code> makes a new object. In a loop this is a performance disaster,
which is why <code>StringBuilder</code> exists.</p>

<table>
  <thead><tr><th>Class</th><th>Mutable?</th><th>Thread safe?</th><th>Use when</th></tr></thead>
  <tbody>
    <tr><td><code>String</code></td><td>No</td><td>Yes (immutable)</td><td>fixed text</td></tr>
    <tr><td><code>StringBuilder</code></td><td>Yes</td><td>No</td><td>building text in a loop (fastest)</td></tr>
    <tr><td><code>StringBuffer</code></td><td>Yes</td><td>Yes (synchronized)</td><td>multiple threads share it</td></tr>
  </tbody>
</table>

<pre><code class="language-java">StringBuilder sb = new StringBuilder();
for (int i = 0; i &lt; 1000; i++) sb.append(i).append(',');
String result = sb.toString();

// Handy String methods
"Hello".charAt(1);            // e
"Hello".substring(1, 3);      // el   (start inclusive, end exclusive)
"a,b,c".split(",");           // [a, b, c]
"  hi  ".trim();              // hi
"Hi".equalsIgnoreCase("hi");  // true
String.join("-", "a", "b");   // a-b
"abc".toCharArray();          // ['a','b','c']</code></pre>

<h3>3. Methods</h3>
<pre><code class="language-java">public static int max(int a, int b) { return a &gt; b ? a : b; }

// Varargs - any number of arguments
public static int sum(int... nums) {
    int t = 0;
    for (int n : nums) t += n;
    return t;
}
sum(1, 2, 3, 4);</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Java is always pass-by-value.</strong> For objects, the <em>value copied is the reference</em>,
  so the method can change the object's contents but cannot make your variable point somewhere else.
  Say it exactly this way in a written exam.
</div>

<h3>4. Packages and imports</h3>
<pre><code class="language-java">package com.chitkara.model;      // must be the first line of the file

import java.util.ArrayList;      // one class
import java.util.*;              // whole package
import static java.lang.Math.PI; // static import: use PI directly</code></pre>
<p>Packages prevent name clashes, group related classes, and give the default access level a meaning.
<code>java.lang</code> is imported automatically.</p>
"""
))

ST1.append(topic(
    "Collections Framework 1 — List, ArrayList, LinkedList, Vector",
    "Lectures 5-7 · the STL review",
    r"""
<h3>1. The map of the framework</h3>
<pre><code class="language-bash">              Iterable
                 |
             Collection                       Map (separate branch!)
       /         |        \                    |
     List       Set       Queue          HashMap, TreeMap, LinkedHashMap
      |          |          |
ArrayList    HashSet    PriorityQueue
LinkedList   TreeSet    ArrayDeque
Vector       LinkedHashSet</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Remember:</strong> <code>Map</code> does <em>not</em> extend <code>Collection</code>. It stores pairs, not single elements.
  That is a favourite MCQ.
</div>

<h3>2. List — ordered, allows duplicates, index access</h3>
<table>
  <thead><tr><th>Class</th><th>Backed by</th><th>get(i)</th><th>add/remove in middle</th><th>Thread safe</th></tr></thead>
  <tbody>
    <tr><td><code>ArrayList</code></td><td>dynamic array</td><td>O(1)</td><td>O(n) (shifting)</td><td>No</td></tr>
    <tr><td><code>LinkedList</code></td><td>doubly linked list</td><td>O(n)</td><td>O(1) once you are there</td><td>No</td></tr>
    <tr><td><code>Vector</code></td><td>dynamic array</td><td>O(1)</td><td>O(n)</td><td>Yes (synchronized, legacy)</td></tr>
  </tbody>
</table>

<pre><code class="language-java">List&lt;String&gt; names = new ArrayList&lt;&gt;();
names.add("Aman");
names.add(0, "Riya");        // insert at index
names.get(1);
names.set(1, "Karan");
names.remove("Karan");        // by object
names.remove(0);              // by index
names.contains("Riya");       // O(n)
names.size();
Collections.sort(names);
Collections.reverse(names);</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; <code>remove()</code> overload trap:</strong> on a <code>List&lt;Integer&gt;</code>,
  <code>list.remove(2)</code> removes <em>index</em> 2, while <code>list.remove(Integer.valueOf(2))</code>
  removes the <em>value</em> 2.
</div>

<h3>3. How ArrayList grows</h3>
<p>Default capacity 10. When full, it makes a new array of about 1.5x the size and copies everything over
(<code>O(n)</code> once in a while, so <code>add</code> is <em>amortised</em> O(1)).
If you know the size in advance, <code>new ArrayList&lt;&gt;(10000)</code> avoids all those copies.</p>

<h3>4. Choosing between them</h3>
<ul>
  <li>Mostly reading by index, or looping? <strong>ArrayList</strong> — almost always the right default.</li>
  <li>Constant insert/delete at the head or as a queue/deque? <strong>LinkedList</strong> or <code>ArrayDeque</code>.</li>
  <li>Need synchronisation? Don't use <code>Vector</code>; use <code>Collections.synchronizedList(...)</code> or <code>CopyOnWriteArrayList</code>.</li>
</ul>

<h3>5. Iterating safely</h3>
<pre><code class="language-java">Iterator&lt;String&gt; it = names.iterator();
while (it.hasNext()) {
    String n = it.next();
    if (n.startsWith("A")) it.remove();   // the ONLY safe removal while iterating
}</code></pre>
"""
))

ST1.append(topic(
    "Collections Framework 2 — Set, Map & Priority Queue",
    "Lectures 5-7 · hashing, ordering, heaps",
    r"""
<h3>1. Set — no duplicates</h3>
<table>
  <thead><tr><th>Class</th><th>Order</th><th>Backed by</th><th>add/contains</th><th>null allowed</th></tr></thead>
  <tbody>
    <tr><td><code>HashSet</code></td><td>none</td><td>hash table</td><td>O(1) average</td><td>one null</td></tr>
    <tr><td><code>LinkedHashSet</code></td><td>insertion order</td><td>hash table + linked list</td><td>O(1) average</td><td>one null</td></tr>
    <tr><td><code>TreeSet</code></td><td>sorted</td><td>Red-Black tree</td><td>O(log n)</td><td>no null</td></tr>
  </tbody>
</table>

<pre><code class="language-java">Set&lt;Integer&gt; s = new HashSet&lt;&gt;(List.of(5, 1, 5, 3));  // {1, 3, 5} - duplicate 5 dropped
TreeSet&lt;Integer&gt; t = new TreeSet&lt;&gt;(s);
t.first(); t.last();
t.floor(4);    // greatest element &lt;= 4  -> 3
t.ceiling(4);  // smallest element &gt;= 4  -> 5
t.headSet(5); t.tailSet(3);</code></pre>

<h3>2. Map — key to value pairs</h3>
<table>
  <thead><tr><th>Class</th><th>Order</th><th>get/put</th><th>null key</th></tr></thead>
  <tbody>
    <tr><td><code>HashMap</code></td><td>none</td><td>O(1) average</td><td>one allowed</td></tr>
    <tr><td><code>LinkedHashMap</code></td><td>insertion (or access) order</td><td>O(1) average</td><td>one allowed</td></tr>
    <tr><td><code>TreeMap</code></td><td>sorted by key</td><td>O(log n)</td><td>not allowed</td></tr>
    <tr><td><code>Hashtable</code></td><td>none</td><td>O(1), synchronized</td><td>none (legacy)</td></tr>
  </tbody>
</table>

<pre><code class="language-java">Map&lt;String, Integer&gt; count = new HashMap&lt;&gt;();
count.put("apple", 1);
count.get("apple");                       // 1
count.getOrDefault("mango", 0);           // 0 instead of null
count.putIfAbsent("apple", 99);           // ignored, key exists
count.merge("apple", 1, Integer::sum);    // apple -> 2
count.containsKey("apple");

for (Map.Entry&lt;String, Integer&gt; e : count.entrySet()) {
    System.out.println(e.getKey() + " = " + e.getValue());
}

// Word frequency in one line - the classic lab answer
words.forEach(w -&gt; count.merge(w, 1, Integer::sum));</code></pre>

<h3>3. How HashMap works inside (asked almost every year)</h3>
<ol>
  <li>Compute <code>hashCode()</code> of the key, spread the bits, then index = <code>hash &amp; (n - 1)</code>.</li>
  <li>That bucket holds a linked list of entries. Collisions append to that list.</li>
  <li>If a bucket grows past <strong>8</strong> entries (and the table is at least 64 long), the list becomes a
      <strong>balanced tree</strong>, so worst case improves from O(n) to O(log n).</li>
  <li>When size exceeds <em>capacity x load factor (0.75)</em>, the table doubles and everything rehashes.</li>
</ol>

<div class="callout callout-key">
  <strong>&#128273; A key must be immutable.</strong> If you mutate an object after using it as a key, its
  <code>hashCode</code> changes, it lands in the wrong bucket, and the value is lost forever.
  This is why <code>String</code> is the ideal key.
</div>

<h3>4. PriorityQueue — a binary heap</h3>
<p>A queue that always hands you the "smallest" element first (min-heap by default). Nothing else about the
order is defined — printing the whole queue does <em>not</em> print it sorted.</p>

<pre><code class="language-java">PriorityQueue&lt;Integer&gt; minHeap = new PriorityQueue&lt;&gt;();
PriorityQueue&lt;Integer&gt; maxHeap = new PriorityQueue&lt;&gt;(Collections.reverseOrder());

minHeap.offer(5); minHeap.offer(1);
minHeap.peek();   // 1  - O(1), just looks
minHeap.poll();   // 1  - O(log n), removes</code></pre>

<p>With your own comparator, this becomes the ride-sharing matcher from labs 25-30:</p>
<pre><code class="language-java">PriorityQueue&lt;Driver&gt; nearest = new PriorityQueue&lt;&gt;(
    (d1, d2) -&gt; Double.compare(d1.distance, d2.distance)
);
nearest.addAll(availableDrivers);
Driver matched = nearest.poll();   // closest driver to the passenger</code></pre>

<h3>5. Which collection should I pick?</h3>
<table>
  <thead><tr><th>You need</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>Indexed list, lots of reading</td><td><code>ArrayList</code></td></tr>
    <tr><td>Unique items, fastest lookup</td><td><code>HashSet</code></td></tr>
    <tr><td>Unique items, sorted</td><td><code>TreeSet</code></td></tr>
    <tr><td>Key-value lookup</td><td><code>HashMap</code></td></tr>
    <tr><td>Key-value in sorted key order</td><td><code>TreeMap</code></td></tr>
    <tr><td>Always pull the min/max next</td><td><code>PriorityQueue</code></td></tr>
    <tr><td>FIFO queue / LIFO stack</td><td><code>ArrayDeque</code></td></tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <strong>&#128161; Comparable vs Comparator:</strong> <code>Comparable</code> lives <em>inside</em> the class
  (<code>compareTo</code>, one natural order). <code>Comparator</code> lives <em>outside</em>
  (<code>compare</code>, as many orders as you like). <code>TreeSet</code>/<code>TreeMap</code>/<code>PriorityQueue</code>
  need one of the two.
</div>
"""
))

ST1.append(topic(
    "Generics — Type Safety Without Copy-Paste",
    "Lectures 8-9 · write once, work for every type",
    r"""
<h3>1. The problem generics solve</h3>
<pre><code class="language-java">List list = new ArrayList();     // raw type - holds anything
list.add("hello");
int n = (int) list.get(0);        // compiles fine, CRASHES at runtime

List&lt;String&gt; safe = new ArrayList&lt;&gt;();
safe.add(42);                     // compiler stops you right here</code></pre>
<p>Generics move errors from runtime to <strong>compile time</strong>, and remove ugly casts.</p>

<h3>2. Generic class and method</h3>
<pre><code class="language-java">// A Pair class - labs 31-40 ask for exactly this
public class Pair&lt;K, V&gt; {
    private final K key;
    private final V value;
    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }
    @Override public String toString() { return "(" + key + ", " + value + ")"; }
}

Pair&lt;String, Integer&gt; p = new Pair&lt;&gt;("marks", 95);

// A generic METHOD - the &lt;T&gt; goes before the return type
public static &lt;T&gt; void printAll(T[] items) {
    for (T item : items) System.out.println(item);
}</code></pre>

<h3>3. Bounded type parameters</h3>
<pre><code class="language-java">// T must be a Number (or subclass), so we can safely call doubleValue()
public static &lt;T extends Number&gt; double sum(List&lt;T&gt; list) {
    double total = 0;
    for (T n : list) total += n.doubleValue();
    return total;
}

// T must be comparable with itself
public static &lt;T extends Comparable&lt;T&gt;&gt; T max(List&lt;T&gt; list) {
    T best = list.get(0);
    for (T x : list) if (x.compareTo(best) &gt; 0) best = x;
    return best;
}</code></pre>

<h3>4. Wildcards — PECS</h3>
<table>
  <thead><tr><th>Form</th><th>Meaning</th><th>Use for</th></tr></thead>
  <tbody>
    <tr><td><code>&lt;?&gt;</code></td><td>unknown type</td><td>read as <code>Object</code> only</td></tr>
    <tr><td><code>&lt;? extends T&gt;</code></td><td>T or any subclass</td><td><strong>Producer</strong> — you read from it</td></tr>
    <tr><td><code>&lt;? super T&gt;</code></td><td>T or any superclass</td><td><strong>Consumer</strong> — you write into it</td></tr>
  </tbody>
</table>
<p><strong>PECS: Producer Extends, Consumer Super.</strong></p>

<pre><code class="language-java">double total(List&lt;? extends Number&gt; nums) { }   // reads numbers out
void fill(List&lt;? super Integer&gt; sink)     { sink.add(1); }   // writes ints in</code></pre>

<h3>5. Type erasure — why some things are illegal</h3>
<p>Generics exist only for the compiler. At runtime, <code>List&lt;String&gt;</code> and <code>List&lt;Integer&gt;</code> are both
plain <code>List</code>. Consequences you can be asked about:</p>
<ul>
  <li>You cannot write <code>new T()</code> or <code>new T[10]</code>.</li>
  <li>You cannot overload on <code>List&lt;String&gt;</code> vs <code>List&lt;Integer&gt;</code> — same erased signature.</li>
  <li><code>list instanceof List&lt;String&gt;</code> is not allowed.</li>
  <li>Primitives are not allowed as type arguments; use wrappers (<code>List&lt;int&gt;</code> is illegal).</li>
</ul>
"""
))

ST1.append(topic(
    "Exception Handling — try, catch, finally, throw, throws",
    "Lectures 8-9 · failing safely",
    r"""
<h3>1. The hierarchy (draw this in the exam)</h3>
<pre><code class="language-bash">                Throwable
              /           \
          Error          Exception
      (OutOfMemory,      /        \
       StackOverflow)  IOException  RuntimeException
       DO NOT CATCH    SQLException  (NullPointer, ArithmeticException,
                       (CHECKED)      ArrayIndexOutOfBounds, NumberFormat)
                                      (UNCHECKED)</code></pre>

<table>
  <thead><tr><th></th><th>Checked</th><th>Unchecked</th></tr></thead>
  <tbody>
    <tr><td>Parent</td><td><code>Exception</code> (not Runtime)</td><td><code>RuntimeException</code></td></tr>
    <tr><td>Compiler forces handling?</td><td>Yes — catch it or declare <code>throws</code></td><td>No</td></tr>
    <tr><td>Caused by</td><td>the outside world (files, network, DB)</td><td>bugs in your code</td></tr>
    <tr><td>Examples</td><td><code>IOException</code>, <code>SQLException</code>, <code>ClassNotFoundException</code></td><td><code>NullPointerException</code>, <code>ArithmeticException</code></td></tr>
  </tbody>
</table>

<h3>2. try-catch-finally</h3>
<pre><code class="language-java">try {
    int result = 10 / divisor;
} catch (ArithmeticException e) {          // most specific FIRST
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (Exception e) {                     // most general LAST
    e.printStackTrace();
} finally {
    System.out.println("Always runs - cleanup goes here");
}</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Order matters:</strong> catching <code>Exception</code> before
  <code>ArithmeticException</code> is a <em>compile error</em> ("exception has already been caught").
</div>

<h3>3. finally facts examiners test</h3>
<ul>
  <li><code>finally</code> runs even when <code>try</code> or <code>catch</code> has a <code>return</code>.</li>
  <li>A <code>return</code> inside <code>finally</code> <em>overrides</em> the earlier return — never do it.</li>
  <li>The only escape is <code>System.exit(0)</code> or the JVM dying.</li>
</ul>

<h3>4. throw vs throws</h3>
<pre><code class="language-java">// throw = actually raise one, right now (a statement)
if (age &lt; 0) throw new IllegalArgumentException("Age cannot be negative");

// throws = a warning in the signature: "callers, deal with this"
public void readFile(String path) throws IOException { }</code></pre>

<h3>5. Custom exceptions</h3>
<pre><code class="language-java">public class InsufficientBalanceException extends Exception {   // checked
    private final double shortfall;
    public InsufficientBalanceException(double shortfall) {
        super("Short by Rs " + shortfall);
        this.shortfall = shortfall;
    }
    public double getShortfall() { return shortfall; }
}

// Usage
if (balance &lt; amount) throw new InsufficientBalanceException(amount - balance);</code></pre>
<p>Extend <code>Exception</code> for a problem the caller can recover from; extend <code>RuntimeException</code>
for a programming mistake.</p>

<h3>6. try-with-resources (the modern way)</h3>
<pre><code class="language-java">try (BufferedReader br = new BufferedReader(new FileReader("in.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    System.err.println(e.getMessage());
}
// br.close() happens automatically, even if an exception is thrown</code></pre>
<p>Any class implementing <code>AutoCloseable</code> works here — readers, writers, JDBC
<code>Connection</code>, <code>Statement</code> and <code>ResultSet</code>.</p>

<h3>7. Multi-catch</h3>
<pre><code class="language-java">catch (IOException | SQLException e) { log(e); }   // one block, two types</code></pre>
"""
))

ST1.append(topic(
    "File Handling & Serialization",
    "Lectures 8-9 · getting data on and off the disk",
    r"""
<h3>1. The File class — metadata, not content</h3>
<pre><code class="language-java">File f = new File("data/students.txt");
f.exists(); f.getName(); f.getAbsolutePath(); f.length(); f.canRead();
f.mkdirs();          // create missing parent folders
f.createNewFile();
f.delete();</code></pre>

<div class="callout callout-tip">
  <strong>&#128161; File paths:</strong> an <em>absolute</em> path starts from the root (<code>C:\\</code> or <code>/</code>);
  a <em>relative</em> path starts from the folder the program runs in. Use <code>File.separator</code> or
  <code>Paths.get("data", "students.txt")</code> so the code works on Windows and Linux alike.
</div>

<h3>2. Streams: bytes vs characters</h3>
<table>
  <thead><tr><th></th><th>Byte streams</th><th>Character streams</th></tr></thead>
  <tbody>
    <tr><td>Base classes</td><td><code>InputStream</code> / <code>OutputStream</code></td><td><code>Reader</code> / <code>Writer</code></td></tr>
    <tr><td>Good for</td><td>images, PDFs, any binary</td><td>text</td></tr>
    <tr><td>Buffered version</td><td><code>BufferedInputStream</code></td><td><code>BufferedReader</code></td></tr>
  </tbody>
</table>

<h3>3. Reading and writing text</h3>
<pre><code class="language-java">// Read line by line, uppercase it, write it out
try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
     BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line.toUpperCase());
        writer.newLine();
    }
} catch (IOException e) {
    System.err.println("File processing error: " + e.getMessage());
}

// Append instead of overwrite
new FileWriter("log.txt", true);

// NIO shortcuts (Java 7+) - fine for small files
List&lt;String&gt; lines = Files.readAllLines(Paths.get("input.txt"));
Files.write(Paths.get("out.txt"), lines);
try (Stream&lt;String&gt; s = Files.lines(Paths.get("big.txt"))) {
    long blanks = s.filter(String::isBlank).count();   // streams a huge file lazily
}</code></pre>

<h3>4. Serialization — objects to bytes and back</h3>
<p><strong>Serialization</strong> flattens an object into bytes so it can be saved or sent.
<strong>Deserialization</strong> rebuilds it. The class must implement the marker interface
<code>Serializable</code> (it has no methods; it is just a flag).</p>

<pre><code class="language-java">public class Student implements Serializable {
    private static final long serialVersionUID = 1L;  // version stamp - always add it
    private String name;
    private transient String password;   // transient = DO NOT save this field
}

// Write
try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("s.ser"))) {
    out.writeObject(student);
}

// Read
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("s.ser"))) {
    Student s = (Student) in.readObject();   // throws ClassNotFoundException
}</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Three facts they ask:</strong>
  <ul>
    <li><code>transient</code> fields come back as <code>null</code> / 0 — used for passwords and caches.</li>
    <li><code>static</code> fields are never serialized (they belong to the class, not the object).</li>
    <li>If <code>serialVersionUID</code> does not match, you get <code>InvalidClassException</code>.</li>
  </ul>
</div>
"""
))

ST1.append(topic(
    "Streams API — filter, map, reduce, collect",
    "Lecture 10 · describing WHAT, not HOW",
    r"""
<h3>1. What a stream is (and is not)</h3>
<p>A stream is a <em>pipeline</em> that carries elements from a source through operations. It does not store data,
it does not change the source, and it can be used <strong>only once</strong>.</p>

<pre><code class="language-java">// Old way - HOW to do it
List&lt;String&gt; result = new ArrayList&lt;&gt;();
for (String n : names) if (n.length() &gt; 4) result.add(n.toUpperCase());

// Stream way - WHAT you want
List&lt;String&gt; result = names.stream()
        .filter(n -&gt; n.length() &gt; 4)
        .map(String::toUpperCase)
        .collect(Collectors.toList());</code></pre>

<h3>2. Intermediate vs terminal operations</h3>
<table>
  <thead><tr><th>Type</th><th>Returns</th><th>Runs when?</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Intermediate</td><td>another Stream</td><td>lazily — nothing happens yet</td><td><code>filter, map, sorted, distinct, limit, skip, peek, flatMap</code></td></tr>
    <tr><td>Terminal</td><td>a value or a collection</td><td>triggers the whole pipeline</td><td><code>collect, forEach, count, reduce, anyMatch, findFirst, min, max</code></td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>&#128273; Laziness:</strong> a pipeline with no terminal operation does nothing at all — a classic MCQ.
  Also, reusing a consumed stream throws <code>IllegalStateException</code>.
</div>

<h3>3. The operations you will actually be asked about</h3>
<pre><code class="language-java">List&lt;Integer&gt; nums = List.of(5, 3, 8, 3, 1);

nums.stream().filter(n -&gt; n % 2 == 1).count();          // 3
nums.stream().map(n -&gt; n * n).toList();                 // [25, 9, 64, 9, 1]
nums.stream().distinct().sorted().toList();             // [1, 3, 5, 8]
nums.stream().limit(2).toList();                        // [5, 3]
nums.stream().skip(3).toList();                         // [3, 1]
nums.stream().anyMatch(n -&gt; n &gt; 7);                     // true
nums.stream().allMatch(n -&gt; n &gt; 0);                     // true
nums.stream().max(Integer::compare).get();              // 8

// reduce - fold everything into one value
int sum = nums.stream().reduce(0, Integer::sum);        // 20
int product = nums.stream().reduce(1, (a, b) -&gt; a * b);

// flatMap - flatten nested structures
List&lt;List&lt;String&gt;&gt; nested = ...;
List&lt;String&gt; flat = nested.stream().flatMap(List::stream).toList();</code></pre>

<h3>4. Collectors — turning a stream back into data</h3>
<pre><code class="language-java">.collect(Collectors.toList())
.collect(Collectors.toSet())
.collect(Collectors.joining(", ", "[", "]"))
.collect(Collectors.counting())
.collect(Collectors.averagingInt(Student::getMarks))
.collect(Collectors.summingInt(Student::getMarks))
.collect(Collectors.toMap(Student::getId, Student::getName))

// Group students by department
Map&lt;String, List&lt;Student&gt;&gt; byDept =
    students.stream().collect(Collectors.groupingBy(Student::getDept));

// Count per department
Map&lt;String, Long&gt; countByDept =
    students.stream().collect(Collectors.groupingBy(Student::getDept, Collectors.counting()));

// Split into pass / fail
Map&lt;Boolean, List&lt;Student&gt;&gt; passFail =
    students.stream().collect(Collectors.partitioningBy(s -&gt; s.getMarks() &gt;= 40));</code></pre>

<h3>5. The two lab programs from this unit</h3>
<pre><code class="language-java">// Lab 46-50 (a): remove duplicates using stream operations
List&lt;String&gt; unique = names.stream().distinct().toList();

// Lab 46-50 (b): generate official email IDs using map()
List&lt;String&gt; emails = names.stream()
        .map(n -&gt; n.toLowerCase().replace(" ", ".") + "@chitkara.edu.in")
        .toList();</code></pre>

<h3>6. Primitive streams and parallel streams</h3>
<pre><code class="language-java">IntStream.rangeClosed(1, 5).sum();                 // 15 - no boxing overhead
IntStream.of(3, 1, 2).average().getAsDouble();

list.parallelStream().filter(...).count();         // splits work across cores</code></pre>
<div class="callout callout-warning">
  <strong>&#9888;&#65039; Parallel is not free.</strong> It helps only for large data and independent, stateless
  operations. On small lists it is usually slower, and any shared mutable state makes results wrong.
</div>
"""
))

ST1.append(topic(
    "Lambdas, Functional Interfaces, Optional & Date-Time API",
    "Lecture 11 · Java 8 in one page",
    r"""
<h3>1. Lambda expressions</h3>
<p>A lambda is a function written inline — an anonymous implementation of an interface that has exactly one
abstract method.</p>

<pre><code class="language-java">// Before Java 8
Runnable r = new Runnable() {
    @Override public void run() { System.out.println("Hi"); }
};

// With a lambda
Runnable r = () -&gt; System.out.println("Hi");

// Syntax forms
() -&gt; 42                              // no parameters
x  -&gt; x * 2                           // one parameter, no brackets needed
(a, b) -&gt; a + b                       // several parameters
(a, b) -&gt; { int s = a + b; return s; } // block body needs an explicit return</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Effectively final:</strong> a lambda can read a local variable only if that variable is never
  reassigned. Instance fields have no such restriction.
</div>

<h3>2. Built-in functional interfaces (<code>java.util.function</code>)</h3>
<table>
  <thead><tr><th>Interface</th><th>Method</th><th>Takes / returns</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td><code>Predicate&lt;T&gt;</code></td><td><code>test</code></td><td>T to boolean</td><td><code>filter</code></td></tr>
    <tr><td><code>Function&lt;T,R&gt;</code></td><td><code>apply</code></td><td>T to R</td><td><code>map</code></td></tr>
    <tr><td><code>Consumer&lt;T&gt;</code></td><td><code>accept</code></td><td>T to nothing</td><td><code>forEach</code></td></tr>
    <tr><td><code>Supplier&lt;T&gt;</code></td><td><code>get</code></td><td>nothing to T</td><td>lazy creation</td></tr>
    <tr><td><code>BiFunction&lt;T,U,R&gt;</code></td><td><code>apply</code></td><td>(T,U) to R</td><td><code>merge</code></td></tr>
    <tr><td><code>UnaryOperator&lt;T&gt;</code></td><td><code>apply</code></td><td>T to T</td><td><code>replaceAll</code></td></tr>
  </tbody>
</table>

<pre><code class="language-java">@FunctionalInterface            // optional, but the compiler then enforces "exactly one abstract method"
interface Calculator { int operate(int a, int b); }

Calculator add = (a, b) -&gt; a + b;
System.out.println(add.operate(3, 4));   // 7

// Lab 41-45: palindrome test as a lambda
Predicate&lt;String&gt; isPalindrome =
    s -&gt; s.equals(new StringBuilder(s).reverse().toString());
System.out.println(isPalindrome.test("madam"));   // true</code></pre>

<h3>3. Optional — a box that may be empty</h3>
<p>Invented to kill <code>NullPointerException</code>. It forces the caller to think about the "nothing found" case.</p>

<pre><code class="language-java">Optional&lt;Student&gt; found = repo.findById(5);

found.isPresent();
found.orElse(new Student("Guest", 0));        // fallback value
found.orElseGet(() -&gt; loadDefault());         // fallback computed only if needed
found.orElseThrow(() -&gt; new NotFoundException("No student 5"));
found.ifPresent(s -&gt; System.out.println(s.getName()));
found.map(Student::getName).orElse("Unknown");</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039;</strong> <code>Optional.get()</code> on an empty Optional throws
  <code>NoSuchElementException</code> — that defeats the whole purpose. Use <code>orElse</code> family instead.
  Also never use <code>Optional</code> as a field or a method parameter; it is a <em>return</em> type.
</div>

<h3>4. Date-Time API (java.time, Java 8+)</h3>
<p>The old <code>java.util.Date</code> and <code>Calendar</code> were mutable and not thread safe. The new classes
are <strong>immutable</strong> — every "change" returns a new object.</p>

<pre><code class="language-java">LocalDate today = LocalDate.now();
LocalDate dob   = LocalDate.of(2004, 8, 15);
LocalTime time  = LocalTime.of(9, 30);
LocalDateTime dt = LocalDateTime.now();

LocalDate nextWeek = today.plusDays(7);       // returns a NEW date
boolean before = dob.isBefore(today);

long age = ChronoUnit.YEARS.between(dob, today);
Period p = Period.between(dob, today);        // years, months, days
Duration d = Duration.ofHours(3);             // time-based amount

String text = today.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
LocalDate parsed = LocalDate.parse("15-08-2004", DateTimeFormatter.ofPattern("dd-MM-yyyy"));</code></pre>
"""
))

ST1.append(topic(
    "Higher-Order Functions & Method References",
    "Lecture 14 · functions passed like data",
    r"""
<h3>1. What makes a function "higher order"</h3>
<p>A higher-order function either <strong>takes a function as a parameter</strong> or <strong>returns a function</strong>.
Java has no standalone functions, so we pass functional interfaces — which in practice means lambdas.</p>

<pre><code class="language-java">// Takes a function
public static List&lt;Integer&gt; transform(List&lt;Integer&gt; list, Function&lt;Integer, Integer&gt; op) {
    List&lt;Integer&gt; out = new ArrayList&lt;&gt;();
    for (int n : list) out.add(op.apply(n));
    return out;
}
transform(nums, n -&gt; n * n);

// Returns a function
public static Function&lt;Integer, Integer&gt; multiplier(int factor) {
    return n -&gt; n * factor;
}
Function&lt;Integer, Integer&gt; triple = multiplier(3);
triple.apply(5);   // 15</code></pre>

<p><code>filter</code>, <code>map</code>, <code>forEach</code>, <code>sort(comparator)</code> and
<code>removeIf</code> are all higher-order functions you already use.</p>

<h3>2. Method references — the shortest form of a lambda</h3>
<table>
  <thead><tr><th>Kind</th><th>Syntax</th><th>Equivalent lambda</th></tr></thead>
  <tbody>
    <tr><td>Static method</td><td><code>Integer::parseInt</code></td><td><code>s -&gt; Integer.parseInt(s)</code></td></tr>
    <tr><td>Instance method of a specific object</td><td><code>System.out::println</code></td><td><code>x -&gt; System.out.println(x)</code></td></tr>
    <tr><td>Instance method of an arbitrary object</td><td><code>String::toUpperCase</code></td><td><code>s -&gt; s.toUpperCase()</code></td></tr>
    <tr><td>Constructor</td><td><code>ArrayList::new</code></td><td><code>() -&gt; new ArrayList&lt;&gt;()</code></td></tr>
  </tbody>
</table>

<h3>3. Composing functions</h3>
<pre><code class="language-java">Function&lt;Integer, Integer&gt; twice = n -&gt; n * 2;
Function&lt;Integer, Integer&gt; plusTen = n -&gt; n + 10;

twice.andThen(plusTen).apply(5);   // (5*2)+10 = 20   left to right
twice.compose(plusTen).apply(5);   // (5+10)*2 = 30   right to left

Predicate&lt;String&gt; notEmpty = s -&gt; !s.isEmpty();
Predicate&lt;String&gt; shortStr = s -&gt; s.length() &lt; 10;
Predicate&lt;String&gt; valid = notEmpty.and(shortStr);   // also .or() and .negate()

// Comparator chaining - very common in practice
students.sort(Comparator.comparing(Student::getDept)
                        .thenComparing(Student::getMarks, Comparator.reverseOrder()));</code></pre>

<div class="callout callout-tip">
  <strong>&#128161; Rule of thumb:</strong> if the lambda body is just one existing method call with the same
  arguments, replace it with a method reference. It reads better and examiners like it.
</div>
"""
))

ST1.append(topic(
    "JVM Basics — Memory Model, Stack vs Heap, Garbage Collection",
    "Lectures 12-13 · what happens under the hood",
    r"""
<h3>1. JVM memory areas</h3>
<table>
  <thead><tr><th>Area</th><th>Holds</th><th>Shared between threads?</th></tr></thead>
  <tbody>
    <tr><td><strong>Heap</strong></td><td>every object and array, plus the String pool</td><td>Yes — one heap for the whole JVM</td></tr>
    <tr><td><strong>Stack</strong></td><td>one frame per method call: locals, parameters, return address</td><td>No — one stack per thread</td></tr>
    <tr><td><strong>Metaspace</strong></td><td>class metadata, static fields (native memory since Java 8)</td><td>Yes</td></tr>
    <tr><td>PC register</td><td>address of the current instruction</td><td>No — one per thread</td></tr>
    <tr><td>Native method stack</td><td>frames for native (C/C++) calls</td><td>No</td></tr>
  </tbody>
</table>

<pre><code class="language-java">void demo() {
    int x = 5;                     // x lives on the STACK
    Student s = new Student();     // object on the HEAP, the reference s on the STACK
}   // frame popped: x and s vanish, the object waits for the garbage collector</code></pre>

<h3>2. The two "out of memory" errors</h3>
<ul>
  <li><code>StackOverflowError</code> — too many nested calls, usually runaway recursion. Fix the base case.</li>
  <li><code>OutOfMemoryError: Java heap space</code> — too many live objects. A real leak, or a heap that is too small.</li>
</ul>

<h3>3. Garbage collection</h3>
<p>Java frees memory for you. An object becomes eligible for collection the moment <strong>no live reference points to it</strong>.
You cannot force collection; <code>System.gc()</code> is only a suggestion.</p>

<pre><code class="language-java">Student s = new Student();
s = null;              // the old object is now unreachable -> eligible for GC</code></pre>

<p><strong>Generational heap</strong> — the idea is that most objects die young:</p>
<pre><code class="language-bash">Young Generation                     Old Generation (Tenured)
[ Eden | Survivor0 | Survivor1 ]  -> [ long lived objects ]
   minor GC (fast, frequent)            major/full GC (slow, rare)</code></pre>

<h3>4. Finding memory leaks (Lab 51-56)</h3>
<p>In Java a "leak" means objects you no longer need but are still referenced, so GC cannot free them. Usual suspects:</p>
<ul>
  <li>A <code>static</code> collection that only ever grows.</li>
  <li>Listeners or callbacks that are registered and never removed.</li>
  <li>Unclosed streams, connections and readers — use try-with-resources.</li>
  <li>Mutable objects used as <code>HashMap</code> keys.</li>
</ul>
<pre><code class="language-java">Runtime rt = Runtime.getRuntime();
long used = rt.totalMemory() - rt.freeMemory();   // rough leak check inside a loop</code></pre>

<h3>5. Bytecode and JIT</h3>
<p><code>javac</code> produces platform-independent bytecode. At runtime the JVM interprets it, and the
<strong>JIT compiler</strong> converts frequently used ("hot") methods into native machine code — which is why a
Java loop often gets faster the longer it runs. Inspect bytecode with:</p>
<pre><code class="language-bash">javap -c Hello.class</code></pre>

<div class="callout callout-key">
  <strong>&#128273; One-line answers:</strong> Stack = per thread, automatic, holds primitives and references, LIFO.
  Heap = shared, holds objects, cleaned by GC. Class metadata lives in Metaspace.
</div>
"""
))

ST1.append(topic(
    "Fast I/O, Buffering, Debugging & Edge-Case Testing",
    "Lectures 12-13 · surviving contests and vivas",
    r"""
<h3>1. Why Scanner is slow</h3>
<p><code>Scanner</code> parses with regular expressions and reads in small chunks. For 10^5 or more inputs it becomes
the bottleneck. <code>BufferedReader</code> reads a big block into memory at once, which is dramatically faster.</p>

<pre><code class="language-java">// Slow but convenient
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();

// Fast input
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
int n = Integer.parseInt(br.readLine().trim());
StringTokenizer st = new StringTokenizer(br.readLine());
int a = Integer.parseInt(st.nextToken());
int b = Integer.parseInt(st.nextToken());

// Fast output - never call println in a big loop
StringBuilder sb = new StringBuilder();
for (int i = 0; i &lt; n; i++) sb.append(answer[i]).append('\n');
System.out.print(sb);</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Buffering in one line:</strong> it trades a little memory for far fewer system calls.
  One read of 8 KB beats 8,000 reads of one byte.
</div>

<h3>2. Debugging approach</h3>
<ol>
  <li><strong>Read the exception</strong> — the type, the message, and the <em>first</em> line of the stack trace that
      mentions <em>your</em> class.</li>
  <li><strong>Reproduce with the smallest input</strong> that still fails.</li>
  <li><strong>Bisect</strong>: print or breakpoint halfway, decide which half is wrong, repeat.</li>
  <li>Use the IDE debugger: breakpoint, step over/into, watch a variable, conditional breakpoint
      (<code>i == 999</code>) for loops.</li>
</ol>

<table>
  <thead><tr><th>Symptom</th><th>Usual cause</th></tr></thead>
  <tbody>
    <tr><td><code>NullPointerException</code></td><td>object never initialised, or a map lookup returned null</td></tr>
    <tr><td><code>ArrayIndexOutOfBoundsException</code></td><td>loop uses <code>&lt;=</code> instead of <code>&lt;</code></td></tr>
    <tr><td>Program never finishes (Lab 51)</td><td>loop variable never updated, or a wrong <code>while</code> condition</td></tr>
    <tr><td><code>ConcurrentModificationException</code></td><td>modifying a collection while for-eaching it</td></tr>
    <tr><td>Wrong average / division result</td><td>integer division where you wanted <code>double</code></td></tr>
  </tbody>
</table>

<h3>3. Edge cases to test every single time</h3>
<ul>
  <li>Empty input, and input of size 1.</li>
  <li>All elements equal; already sorted; reverse sorted.</li>
  <li>Negative numbers and zero.</li>
  <li><code>Integer.MAX_VALUE</code> / <code>MIN_VALUE</code> (overflow).</li>
  <li><code>null</code> and empty <code>String</code>; strings with spaces or mixed case.</li>
  <li>Duplicates where you assumed uniqueness.</li>
</ul>

<pre><code class="language-java">// Cheap self-testing without a framework
assert average(new int[]{}) == 0 : "empty array must not crash";

// Handling empty input properly (Lab 51-56)
String line = br.readLine();
if (line == null || line.isBlank()) {
    System.out.println("No input provided");
    return;
}</code></pre>

<div class="callout callout-tip">
  <strong>&#128161;</strong> Java assertions are disabled by default. Run with <code>java -ea Main</code> to switch them on.
</div>
"""
))
