// Programming Abstractions using JAVA (24CSE0314)
// Generated from the official CHO by tools/data_prep/generate_java_abstractions_subject.py
// Edit the java_pa_content_*.py files and re-run the generator, not this file.

const JAVA_ABSTRACTIONS_STUDY_DATA = {
  "st1": [
    {
      "title": "How Java Actually Runs — JDK, JRE, JVM & Bytecode",
      "subtitle": "Lecture 1 · compile once, run anywhere",
      "html": "<p>Before any syntax, get this picture clear — a good chunk of ST-1 theory marks come from it.</p>\n\n<h3>1. The journey of a Java program</h3>\n<p>You write <code>Hello.java</code> &rarr; the compiler (<code>javac</code>) turns it into <code>Hello.class</code>, which holds\n<strong>bytecode</strong> (not machine code) &rarr; the <strong>JVM</strong> reads that bytecode and runs it on your actual machine.</p>\n\n<pre><code class=\"language-java\">// Hello.java\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}</code></pre>\n\n<pre><code class=\"language-bash\">javac Hello.java   # source  -> bytecode (Hello.class)\njava Hello         # JVM loads and runs the bytecode</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Why \"Write Once, Run Anywhere\" works:</strong> the <em>bytecode</em> is identical everywhere.\n  Only the JVM changes from Windows to Linux to Mac. Your <code>.class</code> file does not.\n</div>\n\n<h3>2. JDK vs JRE vs JVM — the classic one-mark question</h3>\n<table>\n  <thead><tr><th>Name</th><th>Full form</th><th>What is inside</th><th>Who needs it</th></tr></thead>\n  <tbody>\n    <tr><td><code>JVM</code></td><td>Java Virtual Machine</td><td>The engine that executes bytecode</td><td>Anyone running Java</td></tr>\n    <tr><td><code>JRE</code></td><td>Java Runtime Environment</td><td>JVM + standard library (<code>java.lang</code>, <code>java.util</code>...)</td><td>Users who only run apps</td></tr>\n    <tr><td><code>JDK</code></td><td>Java Development Kit</td><td>JRE + <code>javac</code>, <code>javadoc</code>, <code>jdb</code>, <code>jar</code></td><td>Developers (you)</td></tr>\n  </tbody>\n</table>\n<p>Remember the nesting: <strong>JDK contains JRE contains JVM</strong>.</p>\n\n<h3>3. Anatomy of the main method</h3>\n<pre><code class=\"language-java\">public static void main(String[] args)</code></pre>\n<ul>\n  <li><code>public</code> — the JVM must be able to call it from outside your class.</li>\n  <li><code>static</code> — the JVM calls it <em>without creating an object</em> first.</li>\n  <li><code>void</code> — it returns nothing to the JVM.</li>\n  <li><code>String[] args</code> — command-line arguments, e.g. <code>java Hello 5 10</code>.</li>\n</ul>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Exam trap:</strong> remove <code>static</code> and the code still <em>compiles</em>.\n  It fails at <em>runtime</em> with <code>NoSuchMethodError: main</code>. Compile-time vs runtime failure is a favourite MCQ.\n</div>\n\n<h3>4. Source file rules</h3>\n<ul>\n  <li>A file may contain many classes but only <strong>one public class</strong>, and the file name must match it exactly (case sensitive).</li>\n  <li>Every top-level class in the file produces its own <code>.class</code> file.</li>\n  <li>Java is fully case sensitive: <code>String</code> is not <code>string</code>.</li>\n</ul>"
    },
    {
      "title": "Variables, Literals, Identifiers & Data Types",
      "subtitle": "Lectures 1-4 · primitives vs references",
      "html": "<h3>1. Identifiers — the names you invent</h3>\n<p>Rules: start with a letter, <code>_</code> or <code>$</code>; then letters or digits; no keywords; no spaces.\nConventions (marks are given for following them):</p>\n<table>\n  <thead><tr><th>Thing</th><th>Style</th><th>Example</th></tr></thead>\n  <tbody>\n    <tr><td>Class</td><td>PascalCase</td><td><code>StudentRecord</code></td></tr>\n    <tr><td>Method / variable</td><td>camelCase</td><td><code>totalMarks</code></td></tr>\n    <tr><td>Constant</td><td>UPPER_SNAKE</td><td><code>static final int MAX_SIZE</code></td></tr>\n    <tr><td>Package</td><td>all lowercase</td><td><code>com.chitkara.dao</code></td></tr>\n  </tbody>\n</table>\n\n<h3>2. The 8 primitive types — learn this table</h3>\n<table>\n  <thead><tr><th>Type</th><th>Size</th><th>Range</th><th>Default</th><th>Literal</th></tr></thead>\n  <tbody>\n    <tr><td><code>byte</code></td><td>8 bit</td><td>-128 to 127</td><td>0</td><td><code>byte b = 100;</code></td></tr>\n    <tr><td><code>short</code></td><td>16 bit</td><td>-32,768 to 32,767</td><td>0</td><td><code>short s = 5000;</code></td></tr>\n    <tr><td><code>int</code></td><td>32 bit</td><td>-2,147,483,648 to 2,147,483,647</td><td>0</td><td><code>int i = 42;</code></td></tr>\n    <tr><td><code>long</code></td><td>64 bit</td><td>about +/- 9.2 x 10^18</td><td>0L</td><td><code>long l = 42L;</code></td></tr>\n    <tr><td><code>float</code></td><td>32 bit</td><td>~7 decimal digits</td><td>0.0f</td><td><code>float f = 3.14f;</code></td></tr>\n    <tr><td><code>double</code></td><td>64 bit</td><td>~15 decimal digits</td><td>0.0d</td><td><code>double d = 3.14;</code></td></tr>\n    <tr><td><code>char</code></td><td>16 bit</td><td>0 to 65,535 (Unicode)</td><td>space</td><td><code>char c = 'A';</code></td></tr>\n    <tr><td><code>boolean</code></td><td>JVM dependent</td><td><code>true</code> / <code>false</code></td><td>false</td><td><code>boolean ok = true;</code></td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Two things examiners love:</strong>\n  <ul>\n    <li>A decimal literal is <code>double</code> by default, so <code>float f = 3.14;</code> <em>does not compile</em>. Write <code>3.14f</code>.</li>\n    <li>A whole-number literal is <code>int</code> by default, so <code>long big = 3000000000;</code> fails. Write <code>3000000000L</code>.</li>\n  </ul>\n</div>\n\n<h3>3. Primitive vs non-primitive (reference) types</h3>\n<table>\n  <thead><tr><th></th><th>Primitive</th><th>Reference (non-primitive)</th></tr></thead>\n  <tbody>\n    <tr><td>Holds</td><td>the value itself</td><td>the <em>address</em> of an object</td></tr>\n    <tr><td>Lives in</td><td>stack (as a local variable)</td><td>object on the <strong>heap</strong>, address on the stack</td></tr>\n    <tr><td>Default</td><td>0 / false / space</td><td><code>null</code></td></tr>\n    <tr><td>Examples</td><td><code>int, double, char</code></td><td><code>String</code>, arrays, <code>ArrayList</code>, your own classes</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">int a = 10;\nint b = a;      // b gets a COPY of the value\nb = 20;         // a is still 10\n\nint[] x = {1, 2, 3};\nint[] y = x;    // y gets a copy of the ADDRESS - same array!\ny[0] = 99;      // x[0] is now 99 too</code></pre>\n\n<h3>4. Literal shorthand</h3>\n<pre><code class=\"language-java\">int dec = 100;\nint bin = 0b1100100;   // binary\nint oct = 0144;        // octal (leading zero)\nint hex = 0x64;        // hexadecimal\nint big = 1_000_000;   // underscores for readability (Java 7+)\nchar ch = 65;          // prints A - char is a number underneath</code></pre>\n\n<h3>5. Wrapper classes and autoboxing</h3>\n<p>Every primitive has an object twin: <code>int/Integer</code>, <code>double/Double</code>, <code>char/Character</code>.\nCollections can only store objects, so Java converts automatically.</p>\n<pre><code class=\"language-java\">List&lt;Integer&gt; list = new ArrayList&lt;&gt;();\nlist.add(5);             // autoboxing: int -> Integer\nint first = list.get(0); // unboxing:   Integer -> int</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; The <code>==</code> trap with wrappers:</strong> Java caches <code>Integer</code> objects from -128 to 127.\n  So <code>Integer a = 100, b = 100; a == b</code> is <strong>true</strong>, but with <code>1000</code> it is <strong>false</strong>.\n  Compare objects with <code>.equals()</code>, always.\n</div>"
    },
    {
      "title": "Type Conversion, Operators & Expressions",
      "subtitle": "Lectures 1-4 · widening, narrowing, precedence",
      "html": "<h3>1. Widening (automatic) vs narrowing (manual)</h3>\n<p>A small box fits inside a big box, so Java does that silently. Big into small can lose data, so you must force it with a cast.</p>\n<pre><code class=\"language-bash\">byte -> short -> int -> long -> float -> double     (widening, automatic)\ndouble -> float -> long -> int -> short -> byte     (narrowing, needs a cast)</code></pre>\n\n<pre><code class=\"language-java\">int i = 100;\ndouble d = i;               // widening - automatic, d = 100.0\n\ndouble price = 99.99;\nint rupees = (int) price;   // narrowing - explicit cast, rupees = 99 (fraction CUT, not rounded)</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Casting truncates, it does not round.</strong> <code>(int) -9.9</code> is <code>-9</code>, not <code>-10</code>.\n  Use <code>Math.round()</code> when you want real rounding.\n</div>\n\n<h3>2. Integer division bites everyone</h3>\n<pre><code class=\"language-java\">int a = 7, b = 2;\nSystem.out.println(a / b);           // 3   <- int / int stays int\nSystem.out.println(a / (double) b);  // 3.5 <- cast one side first\nSystem.out.println(a % b);           // 1   <- remainder</code></pre>\n\n<h3>3. Operator families</h3>\n<table>\n  <thead><tr><th>Family</th><th>Operators</th><th>Note</th></tr></thead>\n  <tbody>\n    <tr><td>Arithmetic</td><td><code>+ - * / %</code></td><td><code>+</code> also joins Strings</td></tr>\n    <tr><td>Unary</td><td><code>++ -- + - !</code></td><td>pre vs post matters</td></tr>\n    <tr><td>Relational</td><td><code>== != &gt; &lt; &gt;= &lt;=</code></td><td>result is <code>boolean</code></td></tr>\n    <tr><td>Logical</td><td><code>&amp;&amp; || !</code></td><td>short-circuit</td></tr>\n    <tr><td>Bitwise</td><td><code>&amp; | ^ ~ &lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></td><td>work bit by bit</td></tr>\n    <tr><td>Assignment</td><td><code>= += -= *= /= %=</code></td><td><code>+=</code> hides a cast</td></tr>\n    <tr><td>Ternary</td><td><code>cond ? a : b</code></td><td>the only 3-operand operator</td></tr>\n  </tbody>\n</table>\n\n<h3>4. Pre vs post increment</h3>\n<pre><code class=\"language-java\">int x = 5;\nSystem.out.println(x++);  // prints 5, THEN x becomes 6  (use, then increase)\nSystem.out.println(++x);  // x becomes 7 first, prints 7 (increase, then use)</code></pre>\n\n<h3>5. Short-circuit evaluation is a safety tool</h3>\n<pre><code class=\"language-java\">// If s is null, s.length() would crash. && stops as soon as the left side is false.\nif (s != null &amp;&amp; s.length() &gt; 0) { }   // SAFE\nif (s.length() &gt; 0 &amp;&amp; s != null) { }   // NullPointerException</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; <code>&amp;</code> vs <code>&amp;&amp;</code>:</strong> <code>&amp;&amp;</code> skips the right side once it knows the answer.\n  <code>&amp;</code> always evaluates both. Same story for <code>|</code> vs <code>||</code>.\n</div>\n\n<h3>6. The hidden cast in compound assignment</h3>\n<pre><code class=\"language-java\">byte b = 10;\nb = b + 5;    // COMPILE ERROR: int cannot be converted to byte\nb += 5;       // works - += secretly does b = (byte)(b + 5)</code></pre>\n\n<h3>7. String comparison — the number one beginner bug</h3>\n<pre><code class=\"language-java\">String s1 = \"hello\";\nString s2 = \"hello\";\nString s3 = new String(\"hello\");\n\ns1 == s2         // true  - both point to the same String-pool object\ns1 == s3         // false - s3 is a brand new object on the heap\ns1.equals(s3)    // true  - compares the CONTENT. Always use this.</code></pre>"
    },
    {
      "title": "Control Statements — Decisions & Loops",
      "subtitle": "Lectures 1-4 · if, switch, loops, break/continue",
      "html": "<h3>1. Decision making</h3>\n<pre><code class=\"language-java\">if (marks &gt;= 90)      grade = 'A';\nelse if (marks &gt;= 75) grade = 'B';\nelse                  grade = 'C';\n\n// Ternary - the same idea in one line\nchar g = (marks &gt;= 90) ? 'A' : 'B';</code></pre>\n\n<h3>2. switch — and the fall-through trap</h3>\n<pre><code class=\"language-java\">switch (day) {\n    case 1:\n    case 7:\n        System.out.println(\"Weekend\");\n        break;                 // without break, execution FALLS THROUGH into the next case\n    case 2: case 3: case 4: case 5: case 6:\n        System.out.println(\"Weekday\");\n        break;\n    default:\n        System.out.println(\"Invalid\");\n}</code></pre>\n\n<p>Java 14+ adds the arrow form, which never falls through and can return a value:</p>\n<pre><code class=\"language-java\">String type = switch (day) {\n    case 1, 7 -&gt; \"Weekend\";\n    default   -&gt; \"Weekday\";\n};</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; What can a switch switch on?</strong> <code>byte, short, char, int</code>, their wrappers,\n  <code>String</code> (Java 7+) and <code>enum</code>. <strong>Not</strong> <code>long</code>, <code>float</code>,\n  <code>double</code> or <code>boolean</code>.\n</div>\n\n<h3>3. The four loops</h3>\n<pre><code class=\"language-java\">// 1. for - when you know the count\nfor (int i = 0; i &lt; 5; i++) { }\n\n// 2. while - checks first, may run zero times\nwhile (!queue.isEmpty()) { }\n\n// 3. do-while - runs AT LEAST ONCE\ndo { input = sc.nextLine(); } while (input.isEmpty());\n\n// 4. enhanced for (for-each) - read-only walk over an array or collection\nfor (String name : names) { System.out.println(name); }</code></pre>\n\n<h3>4. break, continue and labels</h3>\n<pre><code class=\"language-java\">outer:\nfor (int i = 0; i &lt; n; i++) {\n    for (int j = 0; j &lt; m; j++) {\n        if (grid[i][j] == target) break outer;  // jumps out of BOTH loops\n        if (grid[i][j] == 0) continue;          // skips just this iteration\n    }\n}</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Removing while looping:</strong> deleting from a list inside a for-each throws\n  <code>ConcurrentModificationException</code>. Use an <code>Iterator</code> or, more simply:\n  <pre><code class=\"language-java\">list.removeIf(x -&gt; x &lt; 0);</code></pre>\n</div>"
    },
    {
      "title": "Overflow, Modular Arithmetic & Bit Manipulation",
      "subtitle": "Lectures 1-4 · the number-safety block",
      "html": "<h3>1. What overflow actually is</h3>\n<p><code>int</code> stops at 2,147,483,647. Add one more and it silently <em>wraps around</em> to the most negative value.\nJava gives no warning — this is the most dangerous silent bug in the syllabus.</p>\n\n<pre><code class=\"language-java\">int max = Integer.MAX_VALUE;       // 2147483647\nSystem.out.println(max + 1);       // -2147483648  (wrapped!)</code></pre>\n\n<h3>2. Three ways to stay safe</h3>\n<pre><code class=\"language-java\">// (a) Ask Java to throw instead of wrapping\ntry {\n    int safe = Math.addExact(a, b);\n} catch (ArithmeticException e) {\n    System.out.println(\"Overflow detected before it could corrupt the result\");\n}\n\n// (b) Do the arithmetic in a wider type\nlong sum = (long) a + (long) b;\nboolean overflows = sum &gt; Integer.MAX_VALUE || sum &lt; Integer.MIN_VALUE;\n\n// (c) Sign logic (the classic written-exam answer)\n// same signs going in, different sign coming out => overflow\nint result = a + b;\nboolean overflowed = ((a ^ result) &amp; (b ^ result)) &lt; 0;</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Labs 9-15 ask exactly this:</strong> \"accept two integers and determine whether their sum will\n  overflow <em>before</em> performing the addition.\" Answer with <code>Math.addExact</code> in a try-catch, or the\n  <code>long</code> widening check.\n</div>\n\n<h3>3. Modular arithmetic — keeping numbers small</h3>\n<p>Contest problems ask for the answer \"modulo 1e9+7\" so results always fit in an <code>int</code>.</p>\n<pre><code class=\"language-java\">final long MOD = 1_000_000_007L;\n\nlong add(long a, long b) { return (a + b) % MOD; }\nlong mul(long a, long b) { return (a % MOD) * (b % MOD) % MOD; }\n\n// Java's % can return a NEGATIVE value:\nSystem.out.println(-7 % 3);               // -1\nSystem.out.println(Math.floorMod(-7, 3)); //  2  <- use this for a true \"mod\"</code></pre>\n\n<h3>4. Bit manipulation cheat sheet</h3>\n<table>\n  <thead><tr><th>Goal</th><th>Trick</th></tr></thead>\n  <tbody>\n    <tr><td>Is n even?</td><td><code>(n &amp; 1) == 0</code></td></tr>\n    <tr><td>Multiply by 2^k</td><td><code>n &lt;&lt; k</code></td></tr>\n    <tr><td>Divide by 2^k</td><td><code>n &gt;&gt; k</code></td></tr>\n    <tr><td>Check i-th bit</td><td><code>(n &gt;&gt; i &amp; 1) == 1</code></td></tr>\n    <tr><td>Set i-th bit</td><td><code>n | (1 &lt;&lt; i)</code></td></tr>\n    <tr><td>Clear i-th bit</td><td><code>n &amp; ~(1 &lt;&lt; i)</code></td></tr>\n    <tr><td>Toggle i-th bit</td><td><code>n ^ (1 &lt;&lt; i)</code></td></tr>\n    <tr><td>Drop lowest set bit</td><td><code>n &amp; (n - 1)</code></td></tr>\n    <tr><td>Is power of two?</td><td><code>n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0</code></td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">// Count set bits - Brian Kernighan: loops once per SET bit, not per bit\npublic static int countSetBits(int n) {\n    int count = 0;\n    while (n != 0) { n &amp;= (n - 1); count++; }\n    return count;\n}\nInteger.bitCount(n);                       // built-in shortcut\n\nint nextPow2 = Integer.highestOneBit(n - 1) &lt;&lt; 1;   // nearest power of two above n\n\n// Swap two numbers without a temp variable (Lab 8)\na = a ^ b;  b = a ^ b;  a = a ^ b;</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; <code>&gt;&gt;</code> vs <code>&gt;&gt;&gt;</code>:</strong> <code>&gt;&gt;</code> keeps the sign bit (arithmetic shift),\n  <code>&gt;&gt;&gt;</code> pushes in zeros (logical shift). For negative numbers they differ.\n</div>"
    },
    {
      "title": "OOP Part 1 — Classes, Objects, Encapsulation",
      "subtitle": "Lectures 1-4 · the four pillars, first half",
      "html": "<h3>1. Class vs object</h3>\n<p>A <strong>class</strong> is the blueprint. An <strong>object</strong> is one house built from it.\nThe blueprint costs nothing; each house takes real memory on the heap.</p>\n\n<pre><code class=\"language-java\">public class Student {\n    private String name;      // instance variable (state)\n    private int marks;\n\n    public Student(String name, int marks) {   // constructor\n        this.name = name;                       // \"this\" = the object being built\n        this.marks = marks;\n    }\n\n    public String getName()  { return name; }   // getter\n    public void setMarks(int m) {               // setter with validation\n        if (m &gt;= 0 &amp;&amp; m &lt;= 100) this.marks = m;\n    }\n}\n\nStudent s = new Student(\"Aman\", 88);   // object created on the heap</code></pre>\n\n<h3>2. Encapsulation — pillar 1</h3>\n<p>Make fields <code>private</code>, expose <code>public</code> getters/setters. The benefit is not secrecy, it is\n<strong>control</strong>: nobody can set marks to 500 because the setter validates.</p>\n\n<table>\n  <thead><tr><th>Modifier</th><th>Same class</th><th>Same package</th><th>Subclass</th><th>Everywhere</th></tr></thead>\n  <tbody>\n    <tr><td><code>private</code></td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>\n    <tr><td>(default)</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td></tr>\n    <tr><td><code>protected</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td></tr>\n    <tr><td><code>public</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>\n  </tbody>\n</table>\n\n<h3>3. Constructors</h3>\n<ul>\n  <li>Same name as the class, <strong>no return type</strong>.</li>\n  <li>If you write none, Java gives you a no-arg default. Write any constructor and that free one disappears.</li>\n  <li>Overload them; chain with <code>this(...)</code>; call the parent with <code>super(...)</code> (must be the first line).</li>\n</ul>\n\n<pre><code class=\"language-java\">public Student() { this(\"Unknown\", 0); }   // constructor chaining</code></pre>\n\n<h3>4. static vs instance</h3>\n<table>\n  <thead><tr><th></th><th><code>static</code> member</th><th>Instance member</th></tr></thead>\n  <tbody>\n    <tr><td>Belongs to</td><td>the class</td><td>each object</td></tr>\n    <tr><td>Copies in memory</td><td>exactly one</td><td>one per object</td></tr>\n    <tr><td>Called as</td><td><code>Student.count</code></td><td><code>s.getName()</code></td></tr>\n    <tr><td>Can use <code>this</code>?</td><td>No</td><td>Yes</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">public class Student {\n    private static int count = 0;    // shared by every Student\n    public Student() { count++; }\n    public static int getCount() { return count; }\n}</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Common error:</strong> \"non-static variable cannot be referenced from a static context\" —\n  you touched an instance field from <code>main</code>. Fix it by creating an object first, or by making the field static.\n</div>\n\n<h3>5. Object methods you should override</h3>\n<pre><code class=\"language-java\">@Override public String toString() { return name + \" (\" + marks + \")\"; }\n@Override public boolean equals(Object o) { ... }   // content equality\n@Override public int hashCode() { return Objects.hash(name, marks); }</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; The equals/hashCode contract:</strong> if two objects are <code>equals</code>, they <em>must</em> return the same\n  <code>hashCode</code>. Break this and your objects get lost inside a <code>HashMap</code> or <code>HashSet</code> —\n  a very common ST-1 question.\n</div>"
    },
    {
      "title": "OOP Part 2 — Inheritance, Polymorphism, Abstraction",
      "subtitle": "Lectures 1-4 · the four pillars, second half",
      "html": "<h3>1. Inheritance — pillar 2</h3>\n<p><code>extends</code> means \"is a kind of\". The child gets the parent's members and can add or change behaviour.\nJava supports single inheritance of classes only (a class has one parent) to avoid the diamond problem;\nyou get multiple inheritance of <em>type</em> through interfaces.</p>\n\n<pre><code class=\"language-java\">class Vehicle {\n    protected String brand;\n    public void start() { System.out.println(\"Starting...\"); }\n}\n\nclass Car extends Vehicle {\n    private int doors;\n    @Override public void start() { System.out.println(brand + \" car ignition on\"); }\n}</code></pre>\n\n<h3>2. Polymorphism — pillar 3</h3>\n<p>\"One name, many forms.\" Two flavours, and telling them apart is a guaranteed exam question:</p>\n\n<table>\n  <thead><tr><th></th><th>Overloading (compile time)</th><th>Overriding (runtime)</th></tr></thead>\n  <tbody>\n    <tr><td>Where</td><td>same class</td><td>parent and child class</td></tr>\n    <tr><td>Signature</td><td>parameters must differ</td><td>parameters must be identical</td></tr>\n    <tr><td>Return type</td><td>can differ</td><td>same or a subtype (covariant)</td></tr>\n    <tr><td>Decided</td><td>by the compiler (static binding)</td><td>by the JVM (dynamic binding)</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">// Overloading\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\n\n// Overriding + dynamic dispatch\nVehicle v = new Car();   // reference type Vehicle, object type Car\nv.start();               // runs Car's start() - decided at RUNTIME</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Upcasting rule:</strong> a parent reference can hold a child object and only sees the\n  <em>parent's</em> methods, but the <em>child's</em> overridden version actually runs. This is the heart of polymorphism.\n</div>\n\n<h3>3. Abstraction — pillar 4: abstract class vs interface</h3>\n<table>\n  <thead><tr><th></th><th><code>abstract class</code></th><th><code>interface</code></th></tr></thead>\n  <tbody>\n    <tr><td>Keyword to use it</td><td><code>extends</code> (only one)</td><td><code>implements</code> (many)</td></tr>\n    <tr><td>Fields</td><td>any kind</td><td><code>public static final</code> only</td></tr>\n    <tr><td>Methods</td><td>abstract + concrete</td><td>abstract, plus <code>default</code>/<code>static</code>/<code>private</code> (Java 8+)</td></tr>\n    <tr><td>Constructor</td><td>Yes</td><td>No</td></tr>\n    <tr><td>Use it when</td><td>classes share code and state</td><td>unrelated classes share a capability</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">abstract class Shape {\n    abstract double area();                       // no body - children must supply one\n    void describe() { System.out.println(\"Area = \" + area()); }  // shared code\n}\n\ninterface Drawable {\n    void draw();\n    default void printLabel() { System.out.println(\"Drawable\"); }  // Java 8 default method\n}\n\nclass Circle extends Shape implements Drawable {\n    private double r;\n    Circle(double r) { this.r = r; }\n    @Override double area() { return Math.PI * r * r; }\n    @Override public void draw() { System.out.println(\"Drawing a circle\"); }\n}</code></pre>\n\n<h3>4. final, super and the object family</h3>\n<ul>\n  <li><code>final</code> variable = constant, <code>final</code> method = cannot be overridden, <code>final</code> class = cannot be extended (e.g. <code>String</code>).</li>\n  <li><code>super.method()</code> calls the parent version; <code>super(...)</code> calls the parent constructor.</li>\n  <li>Every class silently extends <code>Object</code>, which is where <code>toString</code>, <code>equals</code>, <code>hashCode</code> come from.</li>\n</ul>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; Composition over inheritance:</strong> if the relationship is \"has a\" rather than \"is a\"\n  (a <code>Car</code> <em>has an</em> <code>Engine</code>), hold a field instead of extending. Effective Java's advice, and it\n  keeps designs flexible.\n</div>"
    },
    {
      "title": "Arrays, Strings, Methods & Packages",
      "subtitle": "Lectures 1-4 · the everyday toolbox",
      "html": "<h3>1. Arrays</h3>\n<pre><code class=\"language-java\">int[] a = new int[5];            // all zeros\nint[] b = {10, 20, 30};          // literal\nint[][] grid = new int[3][4];    // 2-D\n\nSystem.out.println(b.length);    // 3  - length is a FIELD for arrays\nArrays.sort(b);\nint pos = Arrays.binarySearch(b, 20);      // array must be sorted first\nint[] copy = Arrays.copyOf(b, 5);\nSystem.out.println(Arrays.toString(b));    // [10, 20, 30]</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Three easy marks lost here:</strong> arrays use <code>.length</code>,\n  <code>String</code> uses <code>.length()</code>, collections use <code>.size()</code>.\n  Also, an array's size is fixed forever once created.\n</div>\n\n<h3>2. Strings are immutable</h3>\n<p>Every \"change\" to a <code>String</code> makes a new object. In a loop this is a performance disaster,\nwhich is why <code>StringBuilder</code> exists.</p>\n\n<table>\n  <thead><tr><th>Class</th><th>Mutable?</th><th>Thread safe?</th><th>Use when</th></tr></thead>\n  <tbody>\n    <tr><td><code>String</code></td><td>No</td><td>Yes (immutable)</td><td>fixed text</td></tr>\n    <tr><td><code>StringBuilder</code></td><td>Yes</td><td>No</td><td>building text in a loop (fastest)</td></tr>\n    <tr><td><code>StringBuffer</code></td><td>Yes</td><td>Yes (synchronized)</td><td>multiple threads share it</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">StringBuilder sb = new StringBuilder();\nfor (int i = 0; i &lt; 1000; i++) sb.append(i).append(',');\nString result = sb.toString();\n\n// Handy String methods\n\"Hello\".charAt(1);            // e\n\"Hello\".substring(1, 3);      // el   (start inclusive, end exclusive)\n\"a,b,c\".split(\",\");           // [a, b, c]\n\"  hi  \".trim();              // hi\n\"Hi\".equalsIgnoreCase(\"hi\");  // true\nString.join(\"-\", \"a\", \"b\");   // a-b\n\"abc\".toCharArray();          // ['a','b','c']</code></pre>\n\n<h3>3. Methods</h3>\n<pre><code class=\"language-java\">public static int max(int a, int b) { return a &gt; b ? a : b; }\n\n// Varargs - any number of arguments\npublic static int sum(int... nums) {\n    int t = 0;\n    for (int n : nums) t += n;\n    return t;\n}\nsum(1, 2, 3, 4);</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Java is always pass-by-value.</strong> For objects, the <em>value copied is the reference</em>,\n  so the method can change the object's contents but cannot make your variable point somewhere else.\n  Say it exactly this way in a written exam.\n</div>\n\n<h3>4. Packages and imports</h3>\n<pre><code class=\"language-java\">package com.chitkara.model;      // must be the first line of the file\n\nimport java.util.ArrayList;      // one class\nimport java.util.*;              // whole package\nimport static java.lang.Math.PI; // static import: use PI directly</code></pre>\n<p>Packages prevent name clashes, group related classes, and give the default access level a meaning.\n<code>java.lang</code> is imported automatically.</p>"
    },
    {
      "title": "Collections Framework 1 — List, ArrayList, LinkedList, Vector",
      "subtitle": "Lectures 5-7 · the STL review",
      "html": "<h3>1. The map of the framework</h3>\n<pre><code class=\"language-bash\">              Iterable\n                 |\n             Collection                       Map (separate branch!)\n       /         |        \\                    |\n     List       Set       Queue          HashMap, TreeMap, LinkedHashMap\n      |          |          |\nArrayList    HashSet    PriorityQueue\nLinkedList   TreeSet    ArrayDeque\nVector       LinkedHashSet</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Remember:</strong> <code>Map</code> does <em>not</em> extend <code>Collection</code>. It stores pairs, not single elements.\n  That is a favourite MCQ.\n</div>\n\n<h3>2. List — ordered, allows duplicates, index access</h3>\n<table>\n  <thead><tr><th>Class</th><th>Backed by</th><th>get(i)</th><th>add/remove in middle</th><th>Thread safe</th></tr></thead>\n  <tbody>\n    <tr><td><code>ArrayList</code></td><td>dynamic array</td><td>O(1)</td><td>O(n) (shifting)</td><td>No</td></tr>\n    <tr><td><code>LinkedList</code></td><td>doubly linked list</td><td>O(n)</td><td>O(1) once you are there</td><td>No</td></tr>\n    <tr><td><code>Vector</code></td><td>dynamic array</td><td>O(1)</td><td>O(n)</td><td>Yes (synchronized, legacy)</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">List&lt;String&gt; names = new ArrayList&lt;&gt;();\nnames.add(\"Aman\");\nnames.add(0, \"Riya\");        // insert at index\nnames.get(1);\nnames.set(1, \"Karan\");\nnames.remove(\"Karan\");        // by object\nnames.remove(0);              // by index\nnames.contains(\"Riya\");       // O(n)\nnames.size();\nCollections.sort(names);\nCollections.reverse(names);</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; <code>remove()</code> overload trap:</strong> on a <code>List&lt;Integer&gt;</code>,\n  <code>list.remove(2)</code> removes <em>index</em> 2, while <code>list.remove(Integer.valueOf(2))</code>\n  removes the <em>value</em> 2.\n</div>\n\n<h3>3. How ArrayList grows</h3>\n<p>Default capacity 10. When full, it makes a new array of about 1.5x the size and copies everything over\n(<code>O(n)</code> once in a while, so <code>add</code> is <em>amortised</em> O(1)).\nIf you know the size in advance, <code>new ArrayList&lt;&gt;(10000)</code> avoids all those copies.</p>\n\n<h3>4. Choosing between them</h3>\n<ul>\n  <li>Mostly reading by index, or looping? <strong>ArrayList</strong> — almost always the right default.</li>\n  <li>Constant insert/delete at the head or as a queue/deque? <strong>LinkedList</strong> or <code>ArrayDeque</code>.</li>\n  <li>Need synchronisation? Don't use <code>Vector</code>; use <code>Collections.synchronizedList(...)</code> or <code>CopyOnWriteArrayList</code>.</li>\n</ul>\n\n<h3>5. Iterating safely</h3>\n<pre><code class=\"language-java\">Iterator&lt;String&gt; it = names.iterator();\nwhile (it.hasNext()) {\n    String n = it.next();\n    if (n.startsWith(\"A\")) it.remove();   // the ONLY safe removal while iterating\n}</code></pre>"
    },
    {
      "title": "Collections Framework 2 — Set, Map & Priority Queue",
      "subtitle": "Lectures 5-7 · hashing, ordering, heaps",
      "html": "<h3>1. Set — no duplicates</h3>\n<table>\n  <thead><tr><th>Class</th><th>Order</th><th>Backed by</th><th>add/contains</th><th>null allowed</th></tr></thead>\n  <tbody>\n    <tr><td><code>HashSet</code></td><td>none</td><td>hash table</td><td>O(1) average</td><td>one null</td></tr>\n    <tr><td><code>LinkedHashSet</code></td><td>insertion order</td><td>hash table + linked list</td><td>O(1) average</td><td>one null</td></tr>\n    <tr><td><code>TreeSet</code></td><td>sorted</td><td>Red-Black tree</td><td>O(log n)</td><td>no null</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">Set&lt;Integer&gt; s = new HashSet&lt;&gt;(List.of(5, 1, 5, 3));  // {1, 3, 5} - duplicate 5 dropped\nTreeSet&lt;Integer&gt; t = new TreeSet&lt;&gt;(s);\nt.first(); t.last();\nt.floor(4);    // greatest element &lt;= 4  -> 3\nt.ceiling(4);  // smallest element &gt;= 4  -> 5\nt.headSet(5); t.tailSet(3);</code></pre>\n\n<h3>2. Map — key to value pairs</h3>\n<table>\n  <thead><tr><th>Class</th><th>Order</th><th>get/put</th><th>null key</th></tr></thead>\n  <tbody>\n    <tr><td><code>HashMap</code></td><td>none</td><td>O(1) average</td><td>one allowed</td></tr>\n    <tr><td><code>LinkedHashMap</code></td><td>insertion (or access) order</td><td>O(1) average</td><td>one allowed</td></tr>\n    <tr><td><code>TreeMap</code></td><td>sorted by key</td><td>O(log n)</td><td>not allowed</td></tr>\n    <tr><td><code>Hashtable</code></td><td>none</td><td>O(1), synchronized</td><td>none (legacy)</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">Map&lt;String, Integer&gt; count = new HashMap&lt;&gt;();\ncount.put(\"apple\", 1);\ncount.get(\"apple\");                       // 1\ncount.getOrDefault(\"mango\", 0);           // 0 instead of null\ncount.putIfAbsent(\"apple\", 99);           // ignored, key exists\ncount.merge(\"apple\", 1, Integer::sum);    // apple -> 2\ncount.containsKey(\"apple\");\n\nfor (Map.Entry&lt;String, Integer&gt; e : count.entrySet()) {\n    System.out.println(e.getKey() + \" = \" + e.getValue());\n}\n\n// Word frequency in one line - the classic lab answer\nwords.forEach(w -&gt; count.merge(w, 1, Integer::sum));</code></pre>\n\n<h3>3. How HashMap works inside (asked almost every year)</h3>\n<ol>\n  <li>Compute <code>hashCode()</code> of the key, spread the bits, then index = <code>hash &amp; (n - 1)</code>.</li>\n  <li>That bucket holds a linked list of entries. Collisions append to that list.</li>\n  <li>If a bucket grows past <strong>8</strong> entries (and the table is at least 64 long), the list becomes a\n      <strong>balanced tree</strong>, so worst case improves from O(n) to O(log n).</li>\n  <li>When size exceeds <em>capacity x load factor (0.75)</em>, the table doubles and everything rehashes.</li>\n</ol>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; A key must be immutable.</strong> If you mutate an object after using it as a key, its\n  <code>hashCode</code> changes, it lands in the wrong bucket, and the value is lost forever.\n  This is why <code>String</code> is the ideal key.\n</div>\n\n<h3>4. PriorityQueue — a binary heap</h3>\n<p>A queue that always hands you the \"smallest\" element first (min-heap by default). Nothing else about the\norder is defined — printing the whole queue does <em>not</em> print it sorted.</p>\n\n<pre><code class=\"language-java\">PriorityQueue&lt;Integer&gt; minHeap = new PriorityQueue&lt;&gt;();\nPriorityQueue&lt;Integer&gt; maxHeap = new PriorityQueue&lt;&gt;(Collections.reverseOrder());\n\nminHeap.offer(5); minHeap.offer(1);\nminHeap.peek();   // 1  - O(1), just looks\nminHeap.poll();   // 1  - O(log n), removes</code></pre>\n\n<p>With your own comparator, this becomes the ride-sharing matcher from labs 25-30:</p>\n<pre><code class=\"language-java\">PriorityQueue&lt;Driver&gt; nearest = new PriorityQueue&lt;&gt;(\n    (d1, d2) -&gt; Double.compare(d1.distance, d2.distance)\n);\nnearest.addAll(availableDrivers);\nDriver matched = nearest.poll();   // closest driver to the passenger</code></pre>\n\n<h3>5. Which collection should I pick?</h3>\n<table>\n  <thead><tr><th>You need</th><th>Use</th></tr></thead>\n  <tbody>\n    <tr><td>Indexed list, lots of reading</td><td><code>ArrayList</code></td></tr>\n    <tr><td>Unique items, fastest lookup</td><td><code>HashSet</code></td></tr>\n    <tr><td>Unique items, sorted</td><td><code>TreeSet</code></td></tr>\n    <tr><td>Key-value lookup</td><td><code>HashMap</code></td></tr>\n    <tr><td>Key-value in sorted key order</td><td><code>TreeMap</code></td></tr>\n    <tr><td>Always pull the min/max next</td><td><code>PriorityQueue</code></td></tr>\n    <tr><td>FIFO queue / LIFO stack</td><td><code>ArrayDeque</code></td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; Comparable vs Comparator:</strong> <code>Comparable</code> lives <em>inside</em> the class\n  (<code>compareTo</code>, one natural order). <code>Comparator</code> lives <em>outside</em>\n  (<code>compare</code>, as many orders as you like). <code>TreeSet</code>/<code>TreeMap</code>/<code>PriorityQueue</code>\n  need one of the two.\n</div>"
    },
    {
      "title": "Generics — Type Safety Without Copy-Paste",
      "subtitle": "Lectures 8-9 · write once, work for every type",
      "html": "<h3>1. The problem generics solve</h3>\n<pre><code class=\"language-java\">List list = new ArrayList();     // raw type - holds anything\nlist.add(\"hello\");\nint n = (int) list.get(0);        // compiles fine, CRASHES at runtime\n\nList&lt;String&gt; safe = new ArrayList&lt;&gt;();\nsafe.add(42);                     // compiler stops you right here</code></pre>\n<p>Generics move errors from runtime to <strong>compile time</strong>, and remove ugly casts.</p>\n\n<h3>2. Generic class and method</h3>\n<pre><code class=\"language-java\">// A Pair class - labs 31-40 ask for exactly this\npublic class Pair&lt;K, V&gt; {\n    private final K key;\n    private final V value;\n    public Pair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey()   { return key; }\n    public V getValue() { return value; }\n    @Override public String toString() { return \"(\" + key + \", \" + value + \")\"; }\n}\n\nPair&lt;String, Integer&gt; p = new Pair&lt;&gt;(\"marks\", 95);\n\n// A generic METHOD - the &lt;T&gt; goes before the return type\npublic static &lt;T&gt; void printAll(T[] items) {\n    for (T item : items) System.out.println(item);\n}</code></pre>\n\n<h3>3. Bounded type parameters</h3>\n<pre><code class=\"language-java\">// T must be a Number (or subclass), so we can safely call doubleValue()\npublic static &lt;T extends Number&gt; double sum(List&lt;T&gt; list) {\n    double total = 0;\n    for (T n : list) total += n.doubleValue();\n    return total;\n}\n\n// T must be comparable with itself\npublic static &lt;T extends Comparable&lt;T&gt;&gt; T max(List&lt;T&gt; list) {\n    T best = list.get(0);\n    for (T x : list) if (x.compareTo(best) &gt; 0) best = x;\n    return best;\n}</code></pre>\n\n<h3>4. Wildcards — PECS</h3>\n<table>\n  <thead><tr><th>Form</th><th>Meaning</th><th>Use for</th></tr></thead>\n  <tbody>\n    <tr><td><code>&lt;?&gt;</code></td><td>unknown type</td><td>read as <code>Object</code> only</td></tr>\n    <tr><td><code>&lt;? extends T&gt;</code></td><td>T or any subclass</td><td><strong>Producer</strong> — you read from it</td></tr>\n    <tr><td><code>&lt;? super T&gt;</code></td><td>T or any superclass</td><td><strong>Consumer</strong> — you write into it</td></tr>\n  </tbody>\n</table>\n<p><strong>PECS: Producer Extends, Consumer Super.</strong></p>\n\n<pre><code class=\"language-java\">double total(List&lt;? extends Number&gt; nums) { }   // reads numbers out\nvoid fill(List&lt;? super Integer&gt; sink)     { sink.add(1); }   // writes ints in</code></pre>\n\n<h3>5. Type erasure — why some things are illegal</h3>\n<p>Generics exist only for the compiler. At runtime, <code>List&lt;String&gt;</code> and <code>List&lt;Integer&gt;</code> are both\nplain <code>List</code>. Consequences you can be asked about:</p>\n<ul>\n  <li>You cannot write <code>new T()</code> or <code>new T[10]</code>.</li>\n  <li>You cannot overload on <code>List&lt;String&gt;</code> vs <code>List&lt;Integer&gt;</code> — same erased signature.</li>\n  <li><code>list instanceof List&lt;String&gt;</code> is not allowed.</li>\n  <li>Primitives are not allowed as type arguments; use wrappers (<code>List&lt;int&gt;</code> is illegal).</li>\n</ul>"
    },
    {
      "title": "Exception Handling — try, catch, finally, throw, throws",
      "subtitle": "Lectures 8-9 · failing safely",
      "html": "<h3>1. The hierarchy (draw this in the exam)</h3>\n<pre><code class=\"language-bash\">                Throwable\n              /           \\\n          Error          Exception\n      (OutOfMemory,      /        \\\n       StackOverflow)  IOException  RuntimeException\n       DO NOT CATCH    SQLException  (NullPointer, ArithmeticException,\n                       (CHECKED)      ArrayIndexOutOfBounds, NumberFormat)\n                                      (UNCHECKED)</code></pre>\n\n<table>\n  <thead><tr><th></th><th>Checked</th><th>Unchecked</th></tr></thead>\n  <tbody>\n    <tr><td>Parent</td><td><code>Exception</code> (not Runtime)</td><td><code>RuntimeException</code></td></tr>\n    <tr><td>Compiler forces handling?</td><td>Yes — catch it or declare <code>throws</code></td><td>No</td></tr>\n    <tr><td>Caused by</td><td>the outside world (files, network, DB)</td><td>bugs in your code</td></tr>\n    <tr><td>Examples</td><td><code>IOException</code>, <code>SQLException</code>, <code>ClassNotFoundException</code></td><td><code>NullPointerException</code>, <code>ArithmeticException</code></td></tr>\n  </tbody>\n</table>\n\n<h3>2. try-catch-finally</h3>\n<pre><code class=\"language-java\">try {\n    int result = 10 / divisor;\n} catch (ArithmeticException e) {          // most specific FIRST\n    System.out.println(\"Cannot divide by zero: \" + e.getMessage());\n} catch (Exception e) {                     // most general LAST\n    e.printStackTrace();\n} finally {\n    System.out.println(\"Always runs - cleanup goes here\");\n}</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Order matters:</strong> catching <code>Exception</code> before\n  <code>ArithmeticException</code> is a <em>compile error</em> (\"exception has already been caught\").\n</div>\n\n<h3>3. finally facts examiners test</h3>\n<ul>\n  <li><code>finally</code> runs even when <code>try</code> or <code>catch</code> has a <code>return</code>.</li>\n  <li>A <code>return</code> inside <code>finally</code> <em>overrides</em> the earlier return — never do it.</li>\n  <li>The only escape is <code>System.exit(0)</code> or the JVM dying.</li>\n</ul>\n\n<h3>4. throw vs throws</h3>\n<pre><code class=\"language-java\">// throw = actually raise one, right now (a statement)\nif (age &lt; 0) throw new IllegalArgumentException(\"Age cannot be negative\");\n\n// throws = a warning in the signature: \"callers, deal with this\"\npublic void readFile(String path) throws IOException { }</code></pre>\n\n<h3>5. Custom exceptions</h3>\n<pre><code class=\"language-java\">public class InsufficientBalanceException extends Exception {   // checked\n    private final double shortfall;\n    public InsufficientBalanceException(double shortfall) {\n        super(\"Short by Rs \" + shortfall);\n        this.shortfall = shortfall;\n    }\n    public double getShortfall() { return shortfall; }\n}\n\n// Usage\nif (balance &lt; amount) throw new InsufficientBalanceException(amount - balance);</code></pre>\n<p>Extend <code>Exception</code> for a problem the caller can recover from; extend <code>RuntimeException</code>\nfor a programming mistake.</p>\n\n<h3>6. try-with-resources (the modern way)</h3>\n<pre><code class=\"language-java\">try (BufferedReader br = new BufferedReader(new FileReader(\"in.txt\"))) {\n    System.out.println(br.readLine());\n} catch (IOException e) {\n    System.err.println(e.getMessage());\n}\n// br.close() happens automatically, even if an exception is thrown</code></pre>\n<p>Any class implementing <code>AutoCloseable</code> works here — readers, writers, JDBC\n<code>Connection</code>, <code>Statement</code> and <code>ResultSet</code>.</p>\n\n<h3>7. Multi-catch</h3>\n<pre><code class=\"language-java\">catch (IOException | SQLException e) { log(e); }   // one block, two types</code></pre>"
    },
    {
      "title": "File Handling & Serialization",
      "subtitle": "Lectures 8-9 · getting data on and off the disk",
      "html": "<h3>1. The File class — metadata, not content</h3>\n<pre><code class=\"language-java\">File f = new File(\"data/students.txt\");\nf.exists(); f.getName(); f.getAbsolutePath(); f.length(); f.canRead();\nf.mkdirs();          // create missing parent folders\nf.createNewFile();\nf.delete();</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; File paths:</strong> an <em>absolute</em> path starts from the root (<code>C:\\\\</code> or <code>/</code>);\n  a <em>relative</em> path starts from the folder the program runs in. Use <code>File.separator</code> or\n  <code>Paths.get(\"data\", \"students.txt\")</code> so the code works on Windows and Linux alike.\n</div>\n\n<h3>2. Streams: bytes vs characters</h3>\n<table>\n  <thead><tr><th></th><th>Byte streams</th><th>Character streams</th></tr></thead>\n  <tbody>\n    <tr><td>Base classes</td><td><code>InputStream</code> / <code>OutputStream</code></td><td><code>Reader</code> / <code>Writer</code></td></tr>\n    <tr><td>Good for</td><td>images, PDFs, any binary</td><td>text</td></tr>\n    <tr><td>Buffered version</td><td><code>BufferedInputStream</code></td><td><code>BufferedReader</code></td></tr>\n  </tbody>\n</table>\n\n<h3>3. Reading and writing text</h3>\n<pre><code class=\"language-java\">// Read line by line, uppercase it, write it out\ntry (BufferedReader reader = new BufferedReader(new FileReader(\"input.txt\"));\n     BufferedWriter writer = new BufferedWriter(new FileWriter(\"output.txt\"))) {\n    String line;\n    while ((line = reader.readLine()) != null) {\n        writer.write(line.toUpperCase());\n        writer.newLine();\n    }\n} catch (IOException e) {\n    System.err.println(\"File processing error: \" + e.getMessage());\n}\n\n// Append instead of overwrite\nnew FileWriter(\"log.txt\", true);\n\n// NIO shortcuts (Java 7+) - fine for small files\nList&lt;String&gt; lines = Files.readAllLines(Paths.get(\"input.txt\"));\nFiles.write(Paths.get(\"out.txt\"), lines);\ntry (Stream&lt;String&gt; s = Files.lines(Paths.get(\"big.txt\"))) {\n    long blanks = s.filter(String::isBlank).count();   // streams a huge file lazily\n}</code></pre>\n\n<h3>4. Serialization — objects to bytes and back</h3>\n<p><strong>Serialization</strong> flattens an object into bytes so it can be saved or sent.\n<strong>Deserialization</strong> rebuilds it. The class must implement the marker interface\n<code>Serializable</code> (it has no methods; it is just a flag).</p>\n\n<pre><code class=\"language-java\">public class Student implements Serializable {\n    private static final long serialVersionUID = 1L;  // version stamp - always add it\n    private String name;\n    private transient String password;   // transient = DO NOT save this field\n}\n\n// Write\ntry (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(\"s.ser\"))) {\n    out.writeObject(student);\n}\n\n// Read\ntry (ObjectInputStream in = new ObjectInputStream(new FileInputStream(\"s.ser\"))) {\n    Student s = (Student) in.readObject();   // throws ClassNotFoundException\n}</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Three facts they ask:</strong>\n  <ul>\n    <li><code>transient</code> fields come back as <code>null</code> / 0 — used for passwords and caches.</li>\n    <li><code>static</code> fields are never serialized (they belong to the class, not the object).</li>\n    <li>If <code>serialVersionUID</code> does not match, you get <code>InvalidClassException</code>.</li>\n  </ul>\n</div>"
    },
    {
      "title": "Streams API — filter, map, reduce, collect",
      "subtitle": "Lecture 10 · describing WHAT, not HOW",
      "html": "<h3>1. What a stream is (and is not)</h3>\n<p>A stream is a <em>pipeline</em> that carries elements from a source through operations. It does not store data,\nit does not change the source, and it can be used <strong>only once</strong>.</p>\n\n<pre><code class=\"language-java\">// Old way - HOW to do it\nList&lt;String&gt; result = new ArrayList&lt;&gt;();\nfor (String n : names) if (n.length() &gt; 4) result.add(n.toUpperCase());\n\n// Stream way - WHAT you want\nList&lt;String&gt; result = names.stream()\n        .filter(n -&gt; n.length() &gt; 4)\n        .map(String::toUpperCase)\n        .collect(Collectors.toList());</code></pre>\n\n<h3>2. Intermediate vs terminal operations</h3>\n<table>\n  <thead><tr><th>Type</th><th>Returns</th><th>Runs when?</th><th>Examples</th></tr></thead>\n  <tbody>\n    <tr><td>Intermediate</td><td>another Stream</td><td>lazily — nothing happens yet</td><td><code>filter, map, sorted, distinct, limit, skip, peek, flatMap</code></td></tr>\n    <tr><td>Terminal</td><td>a value or a collection</td><td>triggers the whole pipeline</td><td><code>collect, forEach, count, reduce, anyMatch, findFirst, min, max</code></td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Laziness:</strong> a pipeline with no terminal operation does nothing at all — a classic MCQ.\n  Also, reusing a consumed stream throws <code>IllegalStateException</code>.\n</div>\n\n<h3>3. The operations you will actually be asked about</h3>\n<pre><code class=\"language-java\">List&lt;Integer&gt; nums = List.of(5, 3, 8, 3, 1);\n\nnums.stream().filter(n -&gt; n % 2 == 1).count();          // 3\nnums.stream().map(n -&gt; n * n).toList();                 // [25, 9, 64, 9, 1]\nnums.stream().distinct().sorted().toList();             // [1, 3, 5, 8]\nnums.stream().limit(2).toList();                        // [5, 3]\nnums.stream().skip(3).toList();                         // [3, 1]\nnums.stream().anyMatch(n -&gt; n &gt; 7);                     // true\nnums.stream().allMatch(n -&gt; n &gt; 0);                     // true\nnums.stream().max(Integer::compare).get();              // 8\n\n// reduce - fold everything into one value\nint sum = nums.stream().reduce(0, Integer::sum);        // 20\nint product = nums.stream().reduce(1, (a, b) -&gt; a * b);\n\n// flatMap - flatten nested structures\nList&lt;List&lt;String&gt;&gt; nested = ...;\nList&lt;String&gt; flat = nested.stream().flatMap(List::stream).toList();</code></pre>\n\n<h3>4. Collectors — turning a stream back into data</h3>\n<pre><code class=\"language-java\">.collect(Collectors.toList())\n.collect(Collectors.toSet())\n.collect(Collectors.joining(\", \", \"[\", \"]\"))\n.collect(Collectors.counting())\n.collect(Collectors.averagingInt(Student::getMarks))\n.collect(Collectors.summingInt(Student::getMarks))\n.collect(Collectors.toMap(Student::getId, Student::getName))\n\n// Group students by department\nMap&lt;String, List&lt;Student&gt;&gt; byDept =\n    students.stream().collect(Collectors.groupingBy(Student::getDept));\n\n// Count per department\nMap&lt;String, Long&gt; countByDept =\n    students.stream().collect(Collectors.groupingBy(Student::getDept, Collectors.counting()));\n\n// Split into pass / fail\nMap&lt;Boolean, List&lt;Student&gt;&gt; passFail =\n    students.stream().collect(Collectors.partitioningBy(s -&gt; s.getMarks() &gt;= 40));</code></pre>\n\n<h3>5. The two lab programs from this unit</h3>\n<pre><code class=\"language-java\">// Lab 46-50 (a): remove duplicates using stream operations\nList&lt;String&gt; unique = names.stream().distinct().toList();\n\n// Lab 46-50 (b): generate official email IDs using map()\nList&lt;String&gt; emails = names.stream()\n        .map(n -&gt; n.toLowerCase().replace(\" \", \".\") + \"@chitkara.edu.in\")\n        .toList();</code></pre>\n\n<h3>6. Primitive streams and parallel streams</h3>\n<pre><code class=\"language-java\">IntStream.rangeClosed(1, 5).sum();                 // 15 - no boxing overhead\nIntStream.of(3, 1, 2).average().getAsDouble();\n\nlist.parallelStream().filter(...).count();         // splits work across cores</code></pre>\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Parallel is not free.</strong> It helps only for large data and independent, stateless\n  operations. On small lists it is usually slower, and any shared mutable state makes results wrong.\n</div>"
    },
    {
      "title": "Lambdas, Functional Interfaces, Optional & Date-Time API",
      "subtitle": "Lecture 11 · Java 8 in one page",
      "html": "<h3>1. Lambda expressions</h3>\n<p>A lambda is a function written inline — an anonymous implementation of an interface that has exactly one\nabstract method.</p>\n\n<pre><code class=\"language-java\">// Before Java 8\nRunnable r = new Runnable() {\n    @Override public void run() { System.out.println(\"Hi\"); }\n};\n\n// With a lambda\nRunnable r = () -&gt; System.out.println(\"Hi\");\n\n// Syntax forms\n() -&gt; 42                              // no parameters\nx  -&gt; x * 2                           // one parameter, no brackets needed\n(a, b) -&gt; a + b                       // several parameters\n(a, b) -&gt; { int s = a + b; return s; } // block body needs an explicit return</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Effectively final:</strong> a lambda can read a local variable only if that variable is never\n  reassigned. Instance fields have no such restriction.\n</div>\n\n<h3>2. Built-in functional interfaces (<code>java.util.function</code>)</h3>\n<table>\n  <thead><tr><th>Interface</th><th>Method</th><th>Takes / returns</th><th>Typical use</th></tr></thead>\n  <tbody>\n    <tr><td><code>Predicate&lt;T&gt;</code></td><td><code>test</code></td><td>T to boolean</td><td><code>filter</code></td></tr>\n    <tr><td><code>Function&lt;T,R&gt;</code></td><td><code>apply</code></td><td>T to R</td><td><code>map</code></td></tr>\n    <tr><td><code>Consumer&lt;T&gt;</code></td><td><code>accept</code></td><td>T to nothing</td><td><code>forEach</code></td></tr>\n    <tr><td><code>Supplier&lt;T&gt;</code></td><td><code>get</code></td><td>nothing to T</td><td>lazy creation</td></tr>\n    <tr><td><code>BiFunction&lt;T,U,R&gt;</code></td><td><code>apply</code></td><td>(T,U) to R</td><td><code>merge</code></td></tr>\n    <tr><td><code>UnaryOperator&lt;T&gt;</code></td><td><code>apply</code></td><td>T to T</td><td><code>replaceAll</code></td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">@FunctionalInterface            // optional, but the compiler then enforces \"exactly one abstract method\"\ninterface Calculator { int operate(int a, int b); }\n\nCalculator add = (a, b) -&gt; a + b;\nSystem.out.println(add.operate(3, 4));   // 7\n\n// Lab 41-45: palindrome test as a lambda\nPredicate&lt;String&gt; isPalindrome =\n    s -&gt; s.equals(new StringBuilder(s).reverse().toString());\nSystem.out.println(isPalindrome.test(\"madam\"));   // true</code></pre>\n\n<h3>3. Optional — a box that may be empty</h3>\n<p>Invented to kill <code>NullPointerException</code>. It forces the caller to think about the \"nothing found\" case.</p>\n\n<pre><code class=\"language-java\">Optional&lt;Student&gt; found = repo.findById(5);\n\nfound.isPresent();\nfound.orElse(new Student(\"Guest\", 0));        // fallback value\nfound.orElseGet(() -&gt; loadDefault());         // fallback computed only if needed\nfound.orElseThrow(() -&gt; new NotFoundException(\"No student 5\"));\nfound.ifPresent(s -&gt; System.out.println(s.getName()));\nfound.map(Student::getName).orElse(\"Unknown\");</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039;</strong> <code>Optional.get()</code> on an empty Optional throws\n  <code>NoSuchElementException</code> — that defeats the whole purpose. Use <code>orElse</code> family instead.\n  Also never use <code>Optional</code> as a field or a method parameter; it is a <em>return</em> type.\n</div>\n\n<h3>4. Date-Time API (java.time, Java 8+)</h3>\n<p>The old <code>java.util.Date</code> and <code>Calendar</code> were mutable and not thread safe. The new classes\nare <strong>immutable</strong> — every \"change\" returns a new object.</p>\n\n<pre><code class=\"language-java\">LocalDate today = LocalDate.now();\nLocalDate dob   = LocalDate.of(2004, 8, 15);\nLocalTime time  = LocalTime.of(9, 30);\nLocalDateTime dt = LocalDateTime.now();\n\nLocalDate nextWeek = today.plusDays(7);       // returns a NEW date\nboolean before = dob.isBefore(today);\n\nlong age = ChronoUnit.YEARS.between(dob, today);\nPeriod p = Period.between(dob, today);        // years, months, days\nDuration d = Duration.ofHours(3);             // time-based amount\n\nString text = today.format(DateTimeFormatter.ofPattern(\"dd-MM-yyyy\"));\nLocalDate parsed = LocalDate.parse(\"15-08-2004\", DateTimeFormatter.ofPattern(\"dd-MM-yyyy\"));</code></pre>"
    },
    {
      "title": "Higher-Order Functions & Method References",
      "subtitle": "Lecture 14 · functions passed like data",
      "html": "<h3>1. What makes a function \"higher order\"</h3>\n<p>A higher-order function either <strong>takes a function as a parameter</strong> or <strong>returns a function</strong>.\nJava has no standalone functions, so we pass functional interfaces — which in practice means lambdas.</p>\n\n<pre><code class=\"language-java\">// Takes a function\npublic static List&lt;Integer&gt; transform(List&lt;Integer&gt; list, Function&lt;Integer, Integer&gt; op) {\n    List&lt;Integer&gt; out = new ArrayList&lt;&gt;();\n    for (int n : list) out.add(op.apply(n));\n    return out;\n}\ntransform(nums, n -&gt; n * n);\n\n// Returns a function\npublic static Function&lt;Integer, Integer&gt; multiplier(int factor) {\n    return n -&gt; n * factor;\n}\nFunction&lt;Integer, Integer&gt; triple = multiplier(3);\ntriple.apply(5);   // 15</code></pre>\n\n<p><code>filter</code>, <code>map</code>, <code>forEach</code>, <code>sort(comparator)</code> and\n<code>removeIf</code> are all higher-order functions you already use.</p>\n\n<h3>2. Method references — the shortest form of a lambda</h3>\n<table>\n  <thead><tr><th>Kind</th><th>Syntax</th><th>Equivalent lambda</th></tr></thead>\n  <tbody>\n    <tr><td>Static method</td><td><code>Integer::parseInt</code></td><td><code>s -&gt; Integer.parseInt(s)</code></td></tr>\n    <tr><td>Instance method of a specific object</td><td><code>System.out::println</code></td><td><code>x -&gt; System.out.println(x)</code></td></tr>\n    <tr><td>Instance method of an arbitrary object</td><td><code>String::toUpperCase</code></td><td><code>s -&gt; s.toUpperCase()</code></td></tr>\n    <tr><td>Constructor</td><td><code>ArrayList::new</code></td><td><code>() -&gt; new ArrayList&lt;&gt;()</code></td></tr>\n  </tbody>\n</table>\n\n<h3>3. Composing functions</h3>\n<pre><code class=\"language-java\">Function&lt;Integer, Integer&gt; twice = n -&gt; n * 2;\nFunction&lt;Integer, Integer&gt; plusTen = n -&gt; n + 10;\n\ntwice.andThen(plusTen).apply(5);   // (5*2)+10 = 20   left to right\ntwice.compose(plusTen).apply(5);   // (5+10)*2 = 30   right to left\n\nPredicate&lt;String&gt; notEmpty = s -&gt; !s.isEmpty();\nPredicate&lt;String&gt; shortStr = s -&gt; s.length() &lt; 10;\nPredicate&lt;String&gt; valid = notEmpty.and(shortStr);   // also .or() and .negate()\n\n// Comparator chaining - very common in practice\nstudents.sort(Comparator.comparing(Student::getDept)\n                        .thenComparing(Student::getMarks, Comparator.reverseOrder()));</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; Rule of thumb:</strong> if the lambda body is just one existing method call with the same\n  arguments, replace it with a method reference. It reads better and examiners like it.\n</div>"
    },
    {
      "title": "JVM Basics — Memory Model, Stack vs Heap, Garbage Collection",
      "subtitle": "Lectures 12-13 · what happens under the hood",
      "html": "<h3>1. JVM memory areas</h3>\n<table>\n  <thead><tr><th>Area</th><th>Holds</th><th>Shared between threads?</th></tr></thead>\n  <tbody>\n    <tr><td><strong>Heap</strong></td><td>every object and array, plus the String pool</td><td>Yes — one heap for the whole JVM</td></tr>\n    <tr><td><strong>Stack</strong></td><td>one frame per method call: locals, parameters, return address</td><td>No — one stack per thread</td></tr>\n    <tr><td><strong>Metaspace</strong></td><td>class metadata, static fields (native memory since Java 8)</td><td>Yes</td></tr>\n    <tr><td>PC register</td><td>address of the current instruction</td><td>No — one per thread</td></tr>\n    <tr><td>Native method stack</td><td>frames for native (C/C++) calls</td><td>No</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">void demo() {\n    int x = 5;                     // x lives on the STACK\n    Student s = new Student();     // object on the HEAP, the reference s on the STACK\n}   // frame popped: x and s vanish, the object waits for the garbage collector</code></pre>\n\n<h3>2. The two \"out of memory\" errors</h3>\n<ul>\n  <li><code>StackOverflowError</code> — too many nested calls, usually runaway recursion. Fix the base case.</li>\n  <li><code>OutOfMemoryError: Java heap space</code> — too many live objects. A real leak, or a heap that is too small.</li>\n</ul>\n\n<h3>3. Garbage collection</h3>\n<p>Java frees memory for you. An object becomes eligible for collection the moment <strong>no live reference points to it</strong>.\nYou cannot force collection; <code>System.gc()</code> is only a suggestion.</p>\n\n<pre><code class=\"language-java\">Student s = new Student();\ns = null;              // the old object is now unreachable -> eligible for GC</code></pre>\n\n<p><strong>Generational heap</strong> — the idea is that most objects die young:</p>\n<pre><code class=\"language-bash\">Young Generation                     Old Generation (Tenured)\n[ Eden | Survivor0 | Survivor1 ]  -> [ long lived objects ]\n   minor GC (fast, frequent)            major/full GC (slow, rare)</code></pre>\n\n<h3>4. Finding memory leaks (Lab 51-56)</h3>\n<p>In Java a \"leak\" means objects you no longer need but are still referenced, so GC cannot free them. Usual suspects:</p>\n<ul>\n  <li>A <code>static</code> collection that only ever grows.</li>\n  <li>Listeners or callbacks that are registered and never removed.</li>\n  <li>Unclosed streams, connections and readers — use try-with-resources.</li>\n  <li>Mutable objects used as <code>HashMap</code> keys.</li>\n</ul>\n<pre><code class=\"language-java\">Runtime rt = Runtime.getRuntime();\nlong used = rt.totalMemory() - rt.freeMemory();   // rough leak check inside a loop</code></pre>\n\n<h3>5. Bytecode and JIT</h3>\n<p><code>javac</code> produces platform-independent bytecode. At runtime the JVM interprets it, and the\n<strong>JIT compiler</strong> converts frequently used (\"hot\") methods into native machine code — which is why a\nJava loop often gets faster the longer it runs. Inspect bytecode with:</p>\n<pre><code class=\"language-bash\">javap -c Hello.class</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; One-line answers:</strong> Stack = per thread, automatic, holds primitives and references, LIFO.\n  Heap = shared, holds objects, cleaned by GC. Class metadata lives in Metaspace.\n</div>"
    },
    {
      "title": "Fast I/O, Buffering, Debugging & Edge-Case Testing",
      "subtitle": "Lectures 12-13 · surviving contests and vivas",
      "html": "<h3>1. Why Scanner is slow</h3>\n<p><code>Scanner</code> parses with regular expressions and reads in small chunks. For 10^5 or more inputs it becomes\nthe bottleneck. <code>BufferedReader</code> reads a big block into memory at once, which is dramatically faster.</p>\n\n<pre><code class=\"language-java\">// Slow but convenient\nScanner sc = new Scanner(System.in);\nint n = sc.nextInt();\n\n// Fast input\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nint n = Integer.parseInt(br.readLine().trim());\nStringTokenizer st = new StringTokenizer(br.readLine());\nint a = Integer.parseInt(st.nextToken());\nint b = Integer.parseInt(st.nextToken());\n\n// Fast output - never call println in a big loop\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i &lt; n; i++) sb.append(answer[i]).append('\\n');\nSystem.out.print(sb);</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Buffering in one line:</strong> it trades a little memory for far fewer system calls.\n  One read of 8 KB beats 8,000 reads of one byte.\n</div>\n\n<h3>2. Debugging approach</h3>\n<ol>\n  <li><strong>Read the exception</strong> — the type, the message, and the <em>first</em> line of the stack trace that\n      mentions <em>your</em> class.</li>\n  <li><strong>Reproduce with the smallest input</strong> that still fails.</li>\n  <li><strong>Bisect</strong>: print or breakpoint halfway, decide which half is wrong, repeat.</li>\n  <li>Use the IDE debugger: breakpoint, step over/into, watch a variable, conditional breakpoint\n      (<code>i == 999</code>) for loops.</li>\n</ol>\n\n<table>\n  <thead><tr><th>Symptom</th><th>Usual cause</th></tr></thead>\n  <tbody>\n    <tr><td><code>NullPointerException</code></td><td>object never initialised, or a map lookup returned null</td></tr>\n    <tr><td><code>ArrayIndexOutOfBoundsException</code></td><td>loop uses <code>&lt;=</code> instead of <code>&lt;</code></td></tr>\n    <tr><td>Program never finishes (Lab 51)</td><td>loop variable never updated, or a wrong <code>while</code> condition</td></tr>\n    <tr><td><code>ConcurrentModificationException</code></td><td>modifying a collection while for-eaching it</td></tr>\n    <tr><td>Wrong average / division result</td><td>integer division where you wanted <code>double</code></td></tr>\n  </tbody>\n</table>\n\n<h3>3. Edge cases to test every single time</h3>\n<ul>\n  <li>Empty input, and input of size 1.</li>\n  <li>All elements equal; already sorted; reverse sorted.</li>\n  <li>Negative numbers and zero.</li>\n  <li><code>Integer.MAX_VALUE</code> / <code>MIN_VALUE</code> (overflow).</li>\n  <li><code>null</code> and empty <code>String</code>; strings with spaces or mixed case.</li>\n  <li>Duplicates where you assumed uniqueness.</li>\n</ul>\n\n<pre><code class=\"language-java\">// Cheap self-testing without a framework\nassert average(new int[]{}) == 0 : \"empty array must not crash\";\n\n// Handling empty input properly (Lab 51-56)\nString line = br.readLine();\nif (line == null || line.isBlank()) {\n    System.out.println(\"No input provided\");\n    return;\n}</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161;</strong> Java assertions are disabled by default. Run with <code>java -ea Main</code> to switch them on.\n</div>"
    }
  ],
  "st2": [
    {
      "title": "SQL Fundamentals — DDL, DML, DCL, TCL",
      "subtitle": "Lectures 15-16 · the four command families",
      "html": "<h3>1. The five sub-languages of SQL</h3>\n<table>\n  <thead><tr><th>Family</th><th>Full form</th><th>Commands</th><th>What it touches</th><th>Auto-commit?</th></tr></thead>\n  <tbody>\n    <tr><td><strong>DDL</strong></td><td>Data Definition</td><td><code>CREATE, ALTER, DROP, TRUNCATE, RENAME</code></td><td>the <em>structure</em> (tables, columns)</td><td>Yes — cannot be rolled back</td></tr>\n    <tr><td><strong>DML</strong></td><td>Data Manipulation</td><td><code>INSERT, UPDATE, DELETE</code></td><td>the <em>rows</em></td><td>No — can be rolled back</td></tr>\n    <tr><td><strong>DQL</strong></td><td>Data Query</td><td><code>SELECT</code></td><td>reading rows</td><td>—</td></tr>\n    <tr><td><strong>DCL</strong></td><td>Data Control</td><td><code>GRANT, REVOKE</code></td><td>permissions</td><td>Yes</td></tr>\n    <tr><td><strong>TCL</strong></td><td>Transaction Control</td><td><code>COMMIT, ROLLBACK, SAVEPOINT</code></td><td>groups of DML</td><td>—</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; DELETE vs TRUNCATE vs DROP — asked every single year:</strong>\n  <ul>\n    <li><code>DELETE FROM t WHERE ...</code> — DML, removes chosen rows, can be rolled back, fires triggers, slow for big tables.</li>\n    <li><code>TRUNCATE TABLE t</code> — DDL, removes <em>all</em> rows instantly, resets AUTO_INCREMENT, cannot be rolled back.</li>\n    <li><code>DROP TABLE t</code> — DDL, removes the rows <em>and the table itself</em>.</li>\n  </ul>\n</div>\n\n<h3>2. DDL in practice</h3>\n<pre><code class=\"language-sql\">CREATE TABLE Students (\n    id       INT AUTO_INCREMENT PRIMARY KEY,\n    name     VARCHAR(50) NOT NULL,\n    email    VARCHAR(80) UNIQUE,\n    dept     VARCHAR(30) DEFAULT 'CSE',\n    gpa      DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 10),\n    joined   DATE\n);\n\nALTER TABLE Students ADD COLUMN phone VARCHAR(15);\nALTER TABLE Students MODIFY COLUMN name VARCHAR(80);\nALTER TABLE Students DROP COLUMN phone;\nRENAME TABLE Students TO Student_Master;</code></pre>\n\n<h3>3. Common MySQL data types</h3>\n<table>\n  <thead><tr><th>Type</th><th>Use for</th></tr></thead>\n  <tbody>\n    <tr><td><code>INT</code>, <code>BIGINT</code></td><td>whole numbers, ids</td></tr>\n    <tr><td><code>DECIMAL(p,s)</code></td><td>money — exact, never use FLOAT for currency</td></tr>\n    <tr><td><code>VARCHAR(n)</code> / <code>CHAR(n)</code></td><td>variable / fixed length text</td></tr>\n    <tr><td><code>DATE</code>, <code>DATETIME</code>, <code>TIMESTAMP</code></td><td>dates and times</td></tr>\n    <tr><td><code>BOOLEAN</code> (alias of TINYINT(1))</td><td>true / false</td></tr>\n  </tbody>\n</table>\n\n<h3>4. DML and DQL</h3>\n<pre><code class=\"language-sql\">INSERT INTO Students (name, email, gpa) VALUES ('Aman', 'aman@ck.in', 8.4);\nINSERT INTO Students (name, gpa) VALUES ('Riya', 9.1), ('Karan', 7.2);   -- multi-row\n\nUPDATE Students SET gpa = 8.9 WHERE id = 1;\nDELETE FROM Students WHERE gpa &lt; 4;\n\nSELECT name, gpa FROM Students\nWHERE dept = 'CSE' AND gpa &gt;= 8\nORDER BY gpa DESC\nLIMIT 5;</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Forgetting WHERE in an UPDATE or DELETE changes every row in the table.</strong>\n  Always run the same condition as a <code>SELECT</code> first.\n</div>\n\n<h3>5. Filtering vocabulary</h3>\n<pre><code class=\"language-sql\">WHERE gpa BETWEEN 7 AND 9\nWHERE dept IN ('CSE', 'ECE')\nWHERE name LIKE 'A%'        -- starts with A   (_ = exactly one character)\nWHERE email IS NULL         -- never use = NULL, NULL is not equal to anything\nSELECT DISTINCT dept FROM Students;</code></pre>\n\n<h3>6. DCL and TCL</h3>\n<pre><code class=\"language-sql\">GRANT SELECT, INSERT ON school.Students TO 'app_user'@'localhost';\nREVOKE INSERT ON school.Students FROM 'app_user'@'localhost';\n\nSTART TRANSACTION;\nUPDATE Accounts SET balance = balance - 500 WHERE id = 1;\nSAVEPOINT after_debit;\nUPDATE Accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;      -- or ROLLBACK TO after_debit;</code></pre>"
    },
    {
      "title": "Joins — Inner, Left, Right, Full, Self & Cross",
      "subtitle": "Lecture 17 · combining tables",
      "html": "<h3>1. Why joins exist</h3>\n<p>Normalization splits data across tables so nothing is duplicated. A <strong>join</strong> stitches those tables\nback together on a shared column — normally a foreign key.</p>\n\n<pre><code class=\"language-sql\">-- Sample tables\nStudents(id, name, dept_id)\nDepartments(dept_id, dept_name)</code></pre>\n\n<h3>2. The join family</h3>\n<table>\n  <thead><tr><th>Join</th><th>Returns</th></tr></thead>\n  <tbody>\n    <tr><td><code>INNER JOIN</code></td><td>only rows matching in <strong>both</strong> tables</td></tr>\n    <tr><td><code>LEFT JOIN</code></td><td>all left rows + matches; unmatched right columns become <code>NULL</code></td></tr>\n    <tr><td><code>RIGHT JOIN</code></td><td>all right rows + matches</td></tr>\n    <tr><td><code>FULL OUTER JOIN</code></td><td>everything from both sides (MySQL: emulate with <code>UNION</code>)</td></tr>\n    <tr><td><code>CROSS JOIN</code></td><td>every combination — Cartesian product (m x n rows)</td></tr>\n    <tr><td><code>SELF JOIN</code></td><td>a table joined to itself using two aliases</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-sql\">-- INNER: students who have a department\nSELECT s.name, d.dept_name\nFROM Students s\nINNER JOIN Departments d ON s.dept_id = d.dept_id;\n\n-- LEFT: every student, even those with no department\nSELECT s.name, d.dept_name\nFROM Students s\nLEFT JOIN Departments d ON s.dept_id = d.dept_id;\n\n-- Departments with NO students (the \"anti-join\" pattern)\nSELECT d.dept_name\nFROM Departments d\nLEFT JOIN Students s ON d.dept_id = s.dept_id\nWHERE s.id IS NULL;\n\n-- FULL OUTER in MySQL\nSELECT ... FROM a LEFT JOIN b ON ...\nUNION\nSELECT ... FROM a RIGHT JOIN b ON ...;</code></pre>\n\n<h3>3. Self join — same table, two roles</h3>\n<pre><code class=\"language-sql\">-- Every employee next to their manager, from one Employees table\nSELECT e.name AS employee, m.name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.id;</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Condition placement changes the answer for OUTER joins:</strong> a filter in <code>ON</code> is applied\n  <em>while</em> joining (unmatched left rows survive as NULL), while the same filter in <code>WHERE</code> runs\n  <em>after</em> the join and throws those NULL rows away — quietly turning your LEFT JOIN into an INNER JOIN.\n</div>\n\n<h3>4. Nested queries (subqueries)</h3>\n<pre><code class=\"language-sql\">-- Scalar subquery: students above the overall average\nSELECT name FROM Students\nWHERE gpa &gt; (SELECT AVG(gpa) FROM Students);\n\n-- IN subquery\nSELECT name FROM Students\nWHERE dept_id IN (SELECT dept_id FROM Departments WHERE dept_name LIKE 'Comp%');\n\n-- Correlated subquery: runs once per outer row - topper of each department\nSELECT s.name, s.dept_id FROM Students s\nWHERE s.gpa = (SELECT MAX(s2.gpa) FROM Students s2 WHERE s2.dept_id = s.dept_id);\n\n-- EXISTS: usually faster than IN for large sets\nSELECT d.dept_name FROM Departments d\nWHERE EXISTS (SELECT 1 FROM Students s WHERE s.dept_id = d.dept_id);\n\n-- Derived table (subquery in FROM) - must be given an alias\nSELECT dept_id, avg_gpa FROM\n    (SELECT dept_id, AVG(gpa) AS avg_gpa FROM Students GROUP BY dept_id) t\nWHERE avg_gpa &gt; 8;</code></pre>"
    },
    {
      "title": "GROUP BY, Aggregates & HAVING",
      "subtitle": "Lecture 17 · summarising data",
      "html": "<h3>1. Aggregate functions</h3>\n<table>\n  <thead><tr><th>Function</th><th>Does</th><th>Ignores NULL?</th></tr></thead>\n  <tbody>\n    <tr><td><code>COUNT(*)</code></td><td>counts rows</td><td>No — counts every row</td></tr>\n    <tr><td><code>COUNT(col)</code></td><td>counts non-null values in that column</td><td>Yes</td></tr>\n    <tr><td><code>SUM(col)</code></td><td>total</td><td>Yes</td></tr>\n    <tr><td><code>AVG(col)</code></td><td>mean</td><td>Yes — NULLs are not counted in the divisor</td></tr>\n    <tr><td><code>MIN</code> / <code>MAX</code></td><td>smallest / largest</td><td>Yes</td></tr>\n  </tbody>\n</table>\n\n<h3>2. GROUP BY + HAVING</h3>\n<pre><code class=\"language-sql\">SELECT dept, COUNT(*) AS student_count, ROUND(AVG(gpa), 2) AS avg_gpa\nFROM Students\nWHERE gpa IS NOT NULL          -- 1. filter ROWS before grouping\nGROUP BY dept                  -- 2. make one row per dept\nHAVING AVG(gpa) &gt; 8.0          -- 3. filter GROUPS after aggregating\nORDER BY avg_gpa DESC          -- 4. sort the result\nLIMIT 3;</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; WHERE vs HAVING — the single most asked SQL question:</strong>\n  <code>WHERE</code> filters individual rows <em>before</em> grouping and cannot contain an aggregate.\n  <code>HAVING</code> filters groups <em>after</em> aggregation and normally does contain one.\n</div>\n\n<h3>3. Logical order of execution</h3>\n<p>SQL is <em>written</em> SELECT-first but <em>executed</em> in this order — memorise it, it explains most errors:</p>\n<pre><code class=\"language-bash\">FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT</code></pre>\n<p>Because <code>SELECT</code> runs after <code>WHERE</code>, you cannot use a column alias in <code>WHERE</code> —\nbut you <em>can</em> in <code>ORDER BY</code>.</p>\n\n<h3>4. Rules for what may appear in SELECT</h3>\n<pre><code class=\"language-sql\">-- WRONG: name is neither grouped nor aggregated\nSELECT dept, name, COUNT(*) FROM Students GROUP BY dept;\n\n-- RIGHT\nSELECT dept, COUNT(*) FROM Students GROUP BY dept;\nSELECT dept, MAX(name) FROM Students GROUP BY dept;</code></pre>\n\n<h3>5. Useful patterns</h3>\n<pre><code class=\"language-sql\">-- Find duplicate emails\nSELECT email, COUNT(*) FROM Students GROUP BY email HAVING COUNT(*) &gt; 1;\n\n-- Conditional counting\nSELECT dept,\n       SUM(CASE WHEN gpa &gt;= 8 THEN 1 ELSE 0 END) AS toppers,\n       COUNT(*) AS total\nFROM Students GROUP BY dept;\n\n-- Second highest GPA\nSELECT MAX(gpa) FROM Students WHERE gpa &lt; (SELECT MAX(gpa) FROM Students);</code></pre>"
    },
    {
      "title": "Constraints, MySQL Table Design & Indexing",
      "subtitle": "Lecture 18 · rules the database enforces for you",
      "html": "<h3>1. The six constraints</h3>\n<table>\n  <thead><tr><th>Constraint</th><th>Guarantees</th><th>NULL allowed?</th><th>How many per table</th></tr></thead>\n  <tbody>\n    <tr><td><code>PRIMARY KEY</code></td><td>unique + not null, identifies the row</td><td>No</td><td>exactly one (may span columns)</td></tr>\n    <tr><td><code>FOREIGN KEY</code></td><td>value must exist in the parent table</td><td>Yes</td><td>many</td></tr>\n    <tr><td><code>UNIQUE</code></td><td>no repeats</td><td>Yes (usually one NULL)</td><td>many</td></tr>\n    <tr><td><code>NOT NULL</code></td><td>value must be supplied</td><td>No</td><td>many</td></tr>\n    <tr><td><code>CHECK</code></td><td>custom condition</td><td>—</td><td>many</td></tr>\n    <tr><td><code>DEFAULT</code></td><td>value used when none is given</td><td>—</td><td>many</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-sql\">CREATE TABLE Enrollments (\n    id         INT AUTO_INCREMENT PRIMARY KEY,\n    student_id INT NOT NULL,\n    course_id  INT NOT NULL,\n    grade      CHAR(1) CHECK (grade IN ('A','B','C','D','F')),\n    enrolled   DATE DEFAULT (CURRENT_DATE),\n    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students(id)\n        ON DELETE CASCADE ON UPDATE CASCADE,\n    CONSTRAINT uq_pair UNIQUE (student_id, course_id)   -- no double enrolment\n);</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Referential actions:</strong> <code>ON DELETE CASCADE</code> deletes the children too,\n  <code>SET NULL</code> blanks the link, <code>RESTRICT</code>/<code>NO ACTION</code> (the default) blocks the parent delete.\n</div>\n\n<h3>2. Primary key vs unique key</h3>\n<ul>\n  <li>Primary key: one per table, never NULL, creates the <em>clustered</em> index in InnoDB (the physical row order).</li>\n  <li>Unique key: as many as you like, allows a NULL, creates a secondary index.</li>\n  <li><strong>Surrogate</strong> key (<code>AUTO_INCREMENT id</code>) vs <strong>natural</strong> key (email). Surrogate keys are\n      preferred because business values change.</li>\n</ul>\n\n<h3>3. Indexing — how the database finds rows fast</h3>\n<p>Without an index the engine does a <strong>full table scan</strong>: read every row. An index is a sorted\nB+ tree of one or more columns, so lookups become O(log n).</p>\n\n<pre><code class=\"language-sql\">CREATE INDEX idx_dept ON Students(dept);\nCREATE UNIQUE INDEX idx_email ON Students(email);\nCREATE INDEX idx_dept_gpa ON Students(dept, gpa);   -- composite\nDROP INDEX idx_dept ON Students;\nEXPLAIN SELECT * FROM Students WHERE dept = 'CSE';  -- shows if the index was used</code></pre>\n\n<table>\n  <thead><tr><th>Index helps</th><th>Index hurts</th></tr></thead>\n  <tbody>\n    <tr><td><code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>, <code>GROUP BY</code> columns</td><td>every <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code> must also update the index</td></tr>\n    <tr><td>high-selectivity columns (many distinct values)</td><td>low-selectivity columns like a gender flag</td></tr>\n    <tr><td>read-heavy tables</td><td>write-heavy tables; indexes also consume disk</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; An index is skipped if you wrap the column in a function</strong> —\n  <code>WHERE YEAR(joined) = 2024</code> ignores the index on <code>joined</code>.\n  Write <code>WHERE joined &gt;= '2024-01-01' AND joined &lt; '2025-01-01'</code> instead.\n  Composite indexes follow the <em>leftmost prefix</em> rule: <code>(dept, gpa)</code> helps a query on\n  <code>dept</code>, or on <code>dept</code>+<code>gpa</code>, but not on <code>gpa</code> alone.\n</div>"
    },
    {
      "title": "Normalization — 1NF to BCNF",
      "subtitle": "Lectures 19-21 · designing tables that never lie",
      "html": "<h3>1. Why normalize</h3>\n<p>Storing the same fact in many places causes three <strong>anomalies</strong>:</p>\n<ul>\n  <li><strong>Insert anomaly</strong> — you cannot add a new department until some student joins it.</li>\n  <li><strong>Update anomaly</strong> — renaming a department means editing hundreds of rows; miss one and the data contradicts itself.</li>\n  <li><strong>Delete anomaly</strong> — deleting the last student of a department erases the department itself.</li>\n</ul>\n<p>Normalization removes redundancy by splitting tables so that <em>every fact is stored exactly once</em>.</p>\n\n<h3>2. Functional dependency</h3>\n<p><code>A -&gt; B</code> (\"A determines B\") means: for a given A there is only one possible B.\n<code>student_id -&gt; name</code> holds; <code>name -&gt; student_id</code> does not, because names repeat.</p>\n\n<h3>3. The normal forms</h3>\n<table>\n  <thead><tr><th>Form</th><th>Rule</th><th>Removes</th></tr></thead>\n  <tbody>\n    <tr><td><strong>1NF</strong></td><td>every cell holds a single atomic value; no repeating groups</td><td>multi-valued cells</td></tr>\n    <tr><td><strong>2NF</strong></td><td>1NF + no <em>partial</em> dependency (non-key column depending on part of a composite key)</td><td>partial dependency</td></tr>\n    <tr><td><strong>3NF</strong></td><td>2NF + no <em>transitive</em> dependency (non-key depending on another non-key)</td><td>transitive dependency</td></tr>\n    <tr><td><strong>BCNF</strong></td><td>for every dependency <code>X -&gt; Y</code>, X must be a super key</td><td>the leftover anomalies of 3NF</td></tr>\n  </tbody>\n</table>\n\n<h3>4. Worked example</h3>\n<pre><code class=\"language-bash\">UNNORMALISED\n(student_id, name, phones,          course_id, course_name, dept, dept_head)\n 1           Aman  \"999,888\"         C1        DBMS         CSE   Dr. Rao</code></pre>\n\n<p><strong>Step 1 - 1NF:</strong> \"999,888\" is not atomic. One row per phone, or a separate <code>Phones</code> table.</p>\n\n<p><strong>Step 2 - 2NF:</strong> the key is (student_id, course_id). But <code>name</code> depends only on\n<code>student_id</code> and <code>course_name</code> only on <code>course_id</code> — partial dependencies. Split:</p>\n<pre><code class=\"language-bash\">Students(student_id, name, dept, dept_head)\nCourses(course_id, course_name)\nEnrollments(student_id, course_id)</code></pre>\n\n<p><strong>Step 3 - 3NF:</strong> in <code>Students</code>, <code>student_id -&gt; dept -&gt; dept_head</code>.\n<code>dept_head</code> depends on a non-key column — transitive. Split again:</p>\n<pre><code class=\"language-bash\">Students(student_id, name, dept_id)\nDepartments(dept_id, dept_name, dept_head)\nCourses(course_id, course_name)\nEnrollments(student_id, course_id)</code></pre>\n<p>Now every fact lives in exactly one place. This is the design you should produce in the exam.</p>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; One-line memory hook:</strong> 1NF — atomic values. 2NF — the <em>whole</em> key.\n  3NF — <em>nothing but</em> the key. BCNF — and the determinant must be a key.\n</div>\n\n<h3>5. When to stop (denormalization)</h3>\n<p>More tables means more joins, and joins cost time. Reporting and analytics systems deliberately\n<strong>denormalize</strong> (keep some duplication) to make reads fast. Normalize for correctness first,\ndenormalize later only when measurements demand it.</p>"
    },
    {
      "title": "Transactions & ACID",
      "subtitle": "Lectures 19-21 · all or nothing",
      "html": "<h3>1. What a transaction is</h3>\n<p>A group of statements that must succeed together or fail together. The textbook example is a bank transfer:\ndebiting one account and crediting another must never happen half-way.</p>\n\n<pre><code class=\"language-sql\">START TRANSACTION;\nUPDATE Accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE Accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;        -- both changes become permanent\n-- ROLLBACK;   -- or neither of them happens</code></pre>\n\n<h3>2. ACID</h3>\n<table>\n  <thead><tr><th>Property</th><th>Promise</th></tr></thead>\n  <tbody>\n    <tr><td><strong>A</strong>tomicity</td><td>all statements happen, or none do</td></tr>\n    <tr><td><strong>C</strong>onsistency</td><td>the database moves from one valid state to another; constraints stay satisfied</td></tr>\n    <tr><td><strong>I</strong>solation</td><td>concurrent transactions do not see each other's half-finished work</td></tr>\n    <tr><td><strong>D</strong>urability</td><td>once committed, it survives a crash (write-ahead log)</td></tr>\n  </tbody>\n</table>\n\n<h3>3. Concurrency problems and isolation levels</h3>\n<table>\n  <thead><tr><th>Problem</th><th>What happens</th></tr></thead>\n  <tbody>\n    <tr><td>Dirty read</td><td>you read data another transaction has not committed yet</td></tr>\n    <tr><td>Non-repeatable read</td><td>you read the same row twice and get different values</td></tr>\n    <tr><td>Phantom read</td><td>you run the same query twice and new rows have appeared</td></tr>\n  </tbody>\n</table>\n\n<table>\n  <thead><tr><th>Isolation level</th><th>Dirty</th><th>Non-repeatable</th><th>Phantom</th></tr></thead>\n  <tbody>\n    <tr><td>READ UNCOMMITTED</td><td>possible</td><td>possible</td><td>possible</td></tr>\n    <tr><td>READ COMMITTED</td><td>prevented</td><td>possible</td><td>possible</td></tr>\n    <tr><td>REPEATABLE READ <em>(MySQL default)</em></td><td>prevented</td><td>prevented</td><td>possible*</td></tr>\n    <tr><td>SERIALIZABLE</td><td>prevented</td><td>prevented</td><td>prevented</td></tr>\n  </tbody>\n</table>\n<p>* InnoDB's gap locking prevents most phantoms even at REPEATABLE READ. Higher isolation means more locking\nand less concurrency — it is a trade-off, not a free upgrade.</p>\n\n<h3>4. Savepoints</h3>\n<pre><code class=\"language-sql\">START TRANSACTION;\nINSERT INTO Orders VALUES (...);\nSAVEPOINT order_added;\nINSERT INTO OrderItems VALUES (...);\nROLLBACK TO order_added;   -- undo only the items, keep the order\nCOMMIT;</code></pre>\n\n<h3>5. Transactions from Java (JDBC)</h3>\n<pre><code class=\"language-java\">Connection conn = DriverManager.getConnection(URL, USER, PASS);\ntry {\n    conn.setAutoCommit(false);              // JDBC commits every statement by default - turn that off\n\n    debitStmt.executeUpdate();\n    creditStmt.executeUpdate();\n\n    conn.commit();\n} catch (SQLException e) {\n    conn.rollback();                        // undo everything on any failure\n    throw e;\n} finally {\n    conn.setAutoCommit(true);\n    conn.close();\n}</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Remember:</strong> a JDBC connection starts in <em>auto-commit</em> mode. Multi-statement\n  transactions only work after <code>setAutoCommit(false)</code>. That line is worth a mark on its own.\n</div>"
    },
    {
      "title": "JDBC — Architecture, Drivers & Connection Setup",
      "subtitle": "Lecture 22 · Java talking to MySQL",
      "html": "<h3>1. What JDBC is</h3>\n<p>JDBC (Java Database Connectivity) is a set of <em>interfaces</em> in <code>java.sql</code>. Each database vendor\nships a <strong>driver</strong> that implements them. Your code talks to the interface, so switching from MySQL to\nPostgreSQL means changing a URL and a jar, not your program.</p>\n\n<pre><code class=\"language-bash\">Java app -> JDBC API -> DriverManager -> Vendor driver -> Database</code></pre>\n\n<h3>2. The four driver types</h3>\n<table>\n  <thead><tr><th>Type</th><th>Name</th><th>Note</th></tr></thead>\n  <tbody>\n    <tr><td>1</td><td>JDBC-ODBC bridge</td><td>obsolete, removed in Java 8</td></tr>\n    <tr><td>2</td><td>Native API (partly Java)</td><td>needs native client libraries</td></tr>\n    <tr><td>3</td><td>Network protocol (middleware)</td><td>goes through a middle-tier server</td></tr>\n    <tr><td>4</td><td><strong>Thin driver, pure Java</strong></td><td>what everyone uses today (<code>mysql-connector-j</code>)</td></tr>\n  </tbody>\n</table>\n\n<h3>3. The five steps — write these in order in the exam</h3>\n<pre><code class=\"language-java\">// 1. Load the driver (optional since JDBC 4.0 auto-discovery, still asked)\nClass.forName(\"com.mysql.cj.jdbc.Driver\");\n\n// 2. Open a connection\nString url  = \"jdbc:mysql://localhost:3306/school?useSSL=false&amp;serverTimezone=UTC\";\nConnection conn = DriverManager.getConnection(url, \"root\", \"password\");\n\n// 3. Create a statement\nPreparedStatement ps = conn.prepareStatement(\"SELECT id, name FROM Students WHERE dept = ?\");\nps.setString(1, \"CSE\");\n\n// 4. Execute and process the result\nResultSet rs = ps.executeQuery();\nwhile (rs.next()) {\n    System.out.println(rs.getInt(\"id\") + \" - \" + rs.getString(\"name\"));\n}\n\n// 5. Close everything (or use try-with-resources and forget about it)\nrs.close(); ps.close(); conn.close();</code></pre>\n\n<h3>4. Reading the connection URL</h3>\n<pre><code class=\"language-bash\">jdbc:mysql://localhost:3306/school\n |     |        |         |      |\n |     |        |         |      +-- database name\n |     |        |         +--------- port (MySQL default 3306)\n |     |        +------------------- host\n |     +---------------------------- sub-protocol (vendor)\n +---------------------------------- protocol</code></pre>\n\n<h3>5. The core interfaces</h3>\n<table>\n  <thead><tr><th>Interface</th><th>Role</th></tr></thead>\n  <tbody>\n    <tr><td><code>DriverManager</code></td><td>class that hands out connections</td></tr>\n    <tr><td><code>Connection</code></td><td>one session with the database</td></tr>\n    <tr><td><code>Statement</code></td><td>plain SQL, recompiled every time</td></tr>\n    <tr><td><code>PreparedStatement</code></td><td>precompiled SQL with <code>?</code> placeholders</td></tr>\n    <tr><td><code>CallableStatement</code></td><td>calls a stored procedure</td></tr>\n    <tr><td><code>ResultSet</code></td><td>cursor over the returned rows</td></tr>\n  </tbody>\n</table>\n\n<h3>6. execute methods — which one when</h3>\n<table>\n  <thead><tr><th>Method</th><th>Use for</th><th>Returns</th></tr></thead>\n  <tbody>\n    <tr><td><code>executeQuery()</code></td><td>SELECT</td><td><code>ResultSet</code></td></tr>\n    <tr><td><code>executeUpdate()</code></td><td>INSERT / UPDATE / DELETE / DDL</td><td><code>int</code> rows affected</td></tr>\n    <tr><td><code>execute()</code></td><td>when you do not know the type</td><td><code>boolean</code> (true if a ResultSet)</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; ResultSet starts <em>before</em> the first row.</strong> You must call <code>rs.next()</code> once\n  before reading anything — forgetting it is the classic runtime error. Column indexes are\n  <strong>1-based</strong>, not 0-based.\n</div>\n\n<h3>7. Connection manager (Lab 57-60)</h3>\n<pre><code class=\"language-java\">public final class DBConnection {\n    private static final String URL  = \"jdbc:mysql://localhost:3306/school\";\n    private static final String USER = \"root\";\n    private static final String PASS = System.getenv(\"DB_PASSWORD\");   // never hardcode secrets\n\n    private DBConnection() { }\n\n    public static Connection get() throws SQLException {\n        return DriverManager.getConnection(URL, USER, PASS);\n    }\n}</code></pre>\n<p>Opening a connection is expensive (TCP handshake + authentication). Real applications use a\n<strong>connection pool</strong> such as HikariCP that keeps a few connections open and lends them out.</p>"
    },
    {
      "title": "PreparedStatement & Preventing SQL Injection",
      "subtitle": "Lectures 23-24 · dynamic queries done safely",
      "html": "<h3>1. The attack</h3>\n<pre><code class=\"language-java\">// NEVER do this\nString sql = \"SELECT * FROM Users WHERE email = '\" + input + \"'\";\nStatement st = conn.createStatement();\nResultSet rs = st.executeQuery(sql);</code></pre>\n\n<p>If the user types <code>' OR '1'='1</code>, the query the database actually receives is:</p>\n<pre><code class=\"language-sql\">SELECT * FROM Users WHERE email = '' OR '1'='1'   -- always true: every user returned</code></pre>\n<p>Type <code>'; DROP TABLE Users; --</code> and it gets worse. The root cause: user <em>data</em> was pasted into the\nquery and became <em>code</em>.</p>\n\n<h3>2. The fix — parameter placeholders</h3>\n<pre><code class=\"language-java\">String sql = \"SELECT * FROM Users WHERE email = ? AND status = ?\";\ntry (PreparedStatement ps = conn.prepareStatement(sql)) {\n    ps.setString(1, userEmail);      // index starts at 1\n    ps.setString(2, \"ACTIVE\");\n    try (ResultSet rs = ps.executeQuery()) {\n        while (rs.next()) System.out.println(rs.getInt(\"id\"));\n    }\n}</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Why it is safe:</strong> the SQL is compiled <em>first</em>, with the <code>?</code> holes already in place.\n  Values are sent separately and can never change the query's structure — whatever the user types stays plain data.\n</div>\n\n<h3>3. Statement vs PreparedStatement</h3>\n<table>\n  <thead><tr><th></th><th><code>Statement</code></th><th><code>PreparedStatement</code></th></tr></thead>\n  <tbody>\n    <tr><td>SQL injection</td><td>vulnerable</td><td>safe</td></tr>\n    <tr><td>Compilation</td><td>every execution</td><td>once, then reused</td></tr>\n    <tr><td>Repeated execution</td><td>slow</td><td>fast</td></tr>\n    <tr><td>Binary data / dates</td><td>awkward string building</td><td><code>setDate</code>, <code>setBlob</code>, etc.</td></tr>\n    <tr><td>Readability</td><td>quote-heavy concatenation</td><td>clean</td></tr>\n  </tbody>\n</table>\n\n<h3>4. Setters and getting generated keys</h3>\n<pre><code class=\"language-java\">ps.setInt(1, 42);\nps.setString(2, \"Aman\");\nps.setDouble(3, 8.5);\nps.setDate(4, java.sql.Date.valueOf(LocalDate.now()));\nps.setNull(5, Types.VARCHAR);\n\n// Get the AUTO_INCREMENT id back after an insert\nPreparedStatement ins = conn.prepareStatement(\n        \"INSERT INTO Students(name) VALUES (?)\", Statement.RETURN_GENERATED_KEYS);\nins.setString(1, \"Riya\");\nins.executeUpdate();\ntry (ResultSet keys = ins.getGeneratedKeys()) {\n    if (keys.next()) System.out.println(\"New id = \" + keys.getInt(1));\n}</code></pre>\n\n<h3>5. Batch updates — many rows, one round trip</h3>\n<pre><code class=\"language-java\">conn.setAutoCommit(false);\nfor (Student s : students) {\n    ps.setString(1, s.getName());\n    ps.addBatch();\n}\nint[] counts = ps.executeBatch();\nconn.commit();</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Placeholders only work for <em>values</em>.</strong> You cannot write\n  <code>ORDER BY ?</code> or <code>FROM ?</code>. If a table or column name really must be dynamic, validate it\n  against a fixed whitelist in Java.\n</div>\n\n<h3>6. Defence in depth</h3>\n<ul>\n  <li>Always use <code>PreparedStatement</code> (or an ORM that does).</li>\n  <li>Validate input (length, format, allowed characters) as well.</li>\n  <li>Give the application database user the least privilege it needs — no DROP rights.</li>\n  <li>Never show raw SQL errors to the user; they leak your schema.</li>\n</ul>"
    },
    {
      "title": "DAO Pattern & Layered Architecture",
      "subtitle": "Lectures 25-26 · keeping SQL out of your business logic",
      "html": "<h3>1. The problem</h3>\n<p>When JDBC code sits inside your business classes, one schema change forces edits all over the project, and\nnothing can be unit tested without a live database.</p>\n\n<h3>2. The layers</h3>\n<pre><code class=\"language-bash\">Presentation layer   (console / servlet / UI)\n        |\nService layer        (business rules: fees, eligibility, validation)\n        |\nDAO layer            (ALL SQL lives here)\n        |\nDatabase</code></pre>\n<p>Each layer only talks to the one directly below it. <strong>Separation of concerns</strong> is the phrase to use.</p>\n\n<h3>3. The pieces of the pattern</h3>\n<table>\n  <thead><tr><th>Piece</th><th>Job</th></tr></thead>\n  <tbody>\n    <tr><td><strong>Model / POJO</strong></td><td>plain data holder (<code>Student</code>) with fields, getters, setters</td></tr>\n    <tr><td><strong>DAO interface</strong></td><td>the contract: what operations exist</td></tr>\n    <tr><td><strong>DAO implementation</strong></td><td>the JDBC code that fulfils the contract</td></tr>\n    <tr><td><strong>Service</strong></td><td>business rules, calls one or more DAOs, owns the transaction</td></tr>\n  </tbody>\n</table>\n\n<h3>4. Code</h3>\n<pre><code class=\"language-java\">// ---- Model ----\npublic class Student {\n    private int id; private String name; private double gpa;\n    // constructors, getters, setters, toString\n}\n\n// ---- DAO interface ----\npublic interface StudentDAO {\n    void insert(Student s);\n    Optional&lt;Student&gt; findById(int id);\n    List&lt;Student&gt; findAll();\n    void update(Student s);\n    void delete(int id);\n}\n\n// ---- JDBC implementation ----\npublic class StudentDAOImpl implements StudentDAO {\n\n    @Override\n    public void insert(Student s) {\n        String sql = \"INSERT INTO Students(name, gpa) VALUES (?, ?)\";\n        try (Connection c = DBConnection.get();\n             PreparedStatement ps = c.prepareStatement(sql)) {\n            ps.setString(1, s.getName());\n            ps.setDouble(2, s.getGpa());\n            ps.executeUpdate();\n        } catch (SQLException e) {\n            throw new DataAccessException(\"Insert failed\", e);   // wrap, do not leak SQLException upward\n        }\n    }\n\n    @Override\n    public Optional&lt;Student&gt; findById(int id) {\n        String sql = \"SELECT id, name, gpa FROM Students WHERE id = ?\";\n        try (Connection c = DBConnection.get();\n             PreparedStatement ps = c.prepareStatement(sql)) {\n            ps.setInt(1, id);\n            try (ResultSet rs = ps.executeQuery()) {\n                return rs.next() ? Optional.of(map(rs)) : Optional.empty();\n            }\n        } catch (SQLException e) {\n            throw new DataAccessException(\"Lookup failed\", e);\n        }\n    }\n\n    private Student map(ResultSet rs) throws SQLException {   // one place that knows the columns\n        return new Student(rs.getInt(\"id\"), rs.getString(\"name\"), rs.getDouble(\"gpa\"));\n    }\n}\n\n// ---- Service: business rules only, zero SQL ----\npublic class StudentService {\n    private final StudentDAO dao;\n    public StudentService(StudentDAO dao) { this.dao = dao; }   // injected -> testable with a fake DAO\n\n    public void admit(Student s) {\n        if (s.getGpa() &lt; 5) throw new IllegalArgumentException(\"GPA too low for admission\");\n        dao.insert(s);\n    }\n}</code></pre>\n\n<h3>5. Why examiners like this pattern</h3>\n<ul>\n  <li><strong>Separation of concerns</strong> — SQL in one layer, rules in another.</li>\n  <li><strong>Maintainability</strong> — a column rename touches only the DAO.</li>\n  <li><strong>Testability</strong> — swap in an in-memory DAO and test the service with no database.</li>\n  <li><strong>Swappable storage</strong> — MySQL today, MongoDB tomorrow, same interface.</li>\n  <li><strong>Reusability</strong> — every screen reuses the same data operations.</li>\n</ul>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; DAO vs Repository:</strong> a DAO mirrors one table and its CRUD; a repository is a slightly\n  higher-level, domain-shaped collection of objects. In this course they are treated as the same idea.\n</div>"
    },
    {
      "title": "CRUD Application Walkthrough",
      "subtitle": "Lecture 27 · everything in ST-2 assembled",
      "html": "<h3>1. The four operations</h3>\n<table>\n  <thead><tr><th>CRUD</th><th>SQL</th><th>JDBC call</th></tr></thead>\n  <tbody>\n    <tr><td>Create</td><td><code>INSERT</code></td><td><code>executeUpdate()</code></td></tr>\n    <tr><td>Read</td><td><code>SELECT</code></td><td><code>executeQuery()</code></td></tr>\n    <tr><td>Update</td><td><code>UPDATE</code></td><td><code>executeUpdate()</code></td></tr>\n    <tr><td>Delete</td><td><code>DELETE</code></td><td><code>executeUpdate()</code></td></tr>\n  </tbody>\n</table>\n\n<h3>2. The schema</h3>\n<pre><code class=\"language-sql\">CREATE DATABASE IF NOT EXISTS school;\nUSE school;\nCREATE TABLE Students (\n    id   INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(50) NOT NULL,\n    gpa  DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 10)\n);</code></pre>\n\n<h3>3. The remaining DAO methods</h3>\n<pre><code class=\"language-java\">@Override\npublic List&lt;Student&gt; findAll() {\n    String sql = \"SELECT id, name, gpa FROM Students ORDER BY id\";\n    List&lt;Student&gt; out = new ArrayList&lt;&gt;();\n    try (Connection c = DBConnection.get();\n         PreparedStatement ps = c.prepareStatement(sql);\n         ResultSet rs = ps.executeQuery()) {\n        while (rs.next()) out.add(map(rs));\n    } catch (SQLException e) {\n        throw new DataAccessException(\"findAll failed\", e);\n    }\n    return out;\n}\n\n@Override\npublic void update(Student s) {\n    String sql = \"UPDATE Students SET name = ?, gpa = ? WHERE id = ?\";\n    try (Connection c = DBConnection.get();\n         PreparedStatement ps = c.prepareStatement(sql)) {\n        ps.setString(1, s.getName());\n        ps.setDouble(2, s.getGpa());\n        ps.setInt(3, s.getId());\n        if (ps.executeUpdate() == 0)                       // rows affected == 0 means no such id\n            throw new DataAccessException(\"No student with id \" + s.getId());\n    } catch (SQLException e) {\n        throw new DataAccessException(\"Update failed\", e);\n    }\n}\n\n@Override\npublic void delete(int id) {\n    try (Connection c = DBConnection.get();\n         PreparedStatement ps = c.prepareStatement(\"DELETE FROM Students WHERE id = ?\")) {\n        ps.setInt(1, id);\n        ps.executeUpdate();\n    } catch (SQLException e) {\n        throw new DataAccessException(\"Delete failed\", e);\n    }\n}</code></pre>\n\n<h3>4. A menu-driven main</h3>\n<pre><code class=\"language-java\">public class App {\n    public static void main(String[] args) {\n        StudentService service = new StudentService(new StudentDAOImpl());\n        Scanner sc = new Scanner(System.in);\n\n        while (true) {\n            System.out.println(\"1 Add  2 List  3 Update  4 Delete  5 Exit\");\n            switch (sc.nextInt()) {\n                case 1 -&gt; { sc.nextLine();\n                            System.out.print(\"Name: \");  String n = sc.nextLine();\n                            System.out.print(\"GPA: \");   double g = sc.nextDouble();\n                            service.admit(new Student(0, n, g)); }\n                case 2 -&gt; service.list().forEach(System.out::println);\n                case 3 -&gt; { /* read id + new values, call service.update */ }\n                case 4 -&gt; { System.out.print(\"id: \"); service.remove(sc.nextInt()); }\n                case 5 -&gt; { return; }\n                default -&gt; System.out.println(\"Invalid choice\");\n            }\n        }\n    }\n}</code></pre>\n\n<h3>5. Checklist the examiner marks against</h3>\n<ul>\n  <li><code>PreparedStatement</code> everywhere — no string concatenation.</li>\n  <li>try-with-resources, so connections always close.</li>\n  <li>Validation in the service layer, not in the DAO.</li>\n  <li><code>setAutoCommit(false)</code> + commit/rollback where two tables change together.</li>\n  <li><code>executeUpdate()</code>'s return value checked before reporting success.</li>\n  <li>Credentials read from configuration or environment, never hardcoded.</li>\n</ul>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Run it:</strong> put <code>mysql-connector-j-x.x.x.jar</code> on the classpath —\n  <code>javac -cp .:mysql-connector-j.jar App.java</code> then\n  <code>java -cp .:mysql-connector-j.jar App</code> (use <code>;</code> instead of <code>:</code> on Windows).\n</div>"
    }
  ],
  "endTerm": [
    {
      "title": "Threads & the Thread Lifecycle",
      "subtitle": "Lectures 28-29 · doing several things at once",
      "html": "<h3>1. Process vs thread</h3>\n<table>\n  <thead><tr><th></th><th>Process</th><th>Thread</th></tr></thead>\n  <tbody>\n    <tr><td>Memory</td><td>its own address space</td><td>shares the heap with sibling threads</td></tr>\n    <tr><td>Owns</td><td>everything</td><td>its own stack, program counter and local variables</td></tr>\n    <tr><td>Creation cost</td><td>heavy</td><td>light</td></tr>\n    <tr><td>Communication</td><td>IPC (pipes, sockets)</td><td>shared objects — fast, but needs synchronization</td></tr>\n  </tbody>\n</table>\n<p>Threads share the heap, which is exactly why they are fast <em>and</em> exactly why race conditions exist.</p>\n\n<h3>2. Why bother</h3>\n<ul>\n  <li>Keep a UI responsive while work happens in the background.</li>\n  <li>Use all CPU cores instead of one.</li>\n  <li>Overlap waiting: while one thread waits for the database, another can compute.</li>\n</ul>\n\n<h3>3. The six lifecycle states — draw this diagram</h3>\n<pre><code class=\"language-bash\">   new Thread()          start()             scheduler picks it\nNEW ------------&gt; RUNNABLE ------------&gt; (running) ------------&gt; TERMINATED\n                     ^  |                                   run() returns\n                     |  | wait() / join() / sleep(ms) / lock is busy\n                     |  v\n            BLOCKED  |  WAITING  |  TIMED_WAITING\n                     (notify(), lock released, or timeout brings it back)</code></pre>\n\n<table>\n  <thead><tr><th>State</th><th>Meaning</th></tr></thead>\n  <tbody>\n    <tr><td><code>NEW</code></td><td>object created, <code>start()</code> not called yet</td></tr>\n    <tr><td><code>RUNNABLE</code></td><td>ready to run or running — the JVM does not separate the two</td></tr>\n    <tr><td><code>BLOCKED</code></td><td>waiting to enter a <code>synchronized</code> block whose lock is held</td></tr>\n    <tr><td><code>WAITING</code></td><td><code>wait()</code>, <code>join()</code> with no timeout — waits indefinitely</td></tr>\n    <tr><td><code>TIMED_WAITING</code></td><td><code>sleep(ms)</code>, <code>wait(ms)</code>, <code>join(ms)</code></td></tr>\n    <tr><td><code>TERMINATED</code></td><td><code>run()</code> finished or threw</td></tr>\n  </tbody>\n</table>\n\n<h3>4. Useful Thread methods</h3>\n<pre><code class=\"language-java\">t.start();                    // creates a new call stack and calls run() on it\nt.join();                     // the CALLING thread waits until t finishes\nThread.sleep(1000);           // pause this thread ~1s, keeps any locks it holds\nt.setDaemon(true);            // background thread - JVM exits without waiting for it\nt.setName(\"worker-1\");\nt.setPriority(Thread.MAX_PRIORITY);   // only a hint to the scheduler\nThread.currentThread().getName();\nt.interrupt();                // polite request to stop; the thread must check for it</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; <code>start()</code> vs <code>run()</code> — the most repeated exam question.</strong>\n  <code>start()</code> asks the JVM for a new thread and then calls <code>run()</code> on it.\n  Calling <code>run()</code> yourself just runs an ordinary method on the current thread — no concurrency at all.\n  Calling <code>start()</code> twice throws <code>IllegalThreadStateException</code>.\n</div>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; sleep vs wait:</strong> <code>sleep()</code> is a <code>Thread</code> static method and\n  <strong>keeps</strong> the lock. <code>wait()</code> is an <code>Object</code> method, must be inside\n  <code>synchronized</code>, and <strong>releases</strong> the lock until <code>notify()</code>.\n</div>"
    },
    {
      "title": "Creating Threads — Thread vs Runnable",
      "subtitle": "Lectures 28-29 · three ways, one preferred",
      "html": "<h3>1. Extending Thread</h3>\n<pre><code class=\"language-java\">class Downloader extends Thread {\n    @Override public void run() {\n        System.out.println(\"Downloading in \" + Thread.currentThread().getName());\n    }\n}\nnew Downloader().start();</code></pre>\n\n<h3>2. Implementing Runnable — the recommended way</h3>\n<pre><code class=\"language-java\">class Task implements Runnable {\n    @Override public void run() { System.out.println(\"Working...\"); }\n}\nThread t = new Thread(new Task(), \"worker-1\");\nt.start();\n\n// With a lambda, since Runnable is a functional interface\nnew Thread(() -&gt; System.out.println(\"Quick task\")).start();</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Why Runnable is preferred:</strong>\n  <ul>\n    <li>Java allows only one parent class — extending <code>Thread</code> burns it.</li>\n    <li>It separates the <em>task</em> from the <em>worker</em>, so the same Runnable can go to a thread pool.</li>\n    <li>Better for object-oriented design: you inherit <code>Thread</code> only if you truly specialise a thread.</li>\n  </ul>\n</div>\n\n<h3>3. Callable and Future — when you need a result</h3>\n<p><code>Runnable.run()</code> returns nothing and cannot throw checked exceptions.\n<code>Callable&lt;V&gt;.call()</code> can do both.</p>\n\n<pre><code class=\"language-java\">ExecutorService pool = Executors.newFixedThreadPool(4);\n\nFuture&lt;Integer&gt; future = pool.submit(() -&gt; {\n    Thread.sleep(500);\n    return 6 * 7;\n});\n\nSystem.out.println(future.get());   // blocks until the answer is ready -> 42\npool.shutdown();                    // ALWAYS shut a pool down, else the JVM never exits</code></pre>\n\n<h3>4. ExecutorService — do not create threads by hand</h3>\n<table>\n  <thead><tr><th>Factory</th><th>Gives you</th></tr></thead>\n  <tbody>\n    <tr><td><code>newFixedThreadPool(n)</code></td><td>exactly n reusable threads — the usual choice</td></tr>\n    <tr><td><code>newCachedThreadPool()</code></td><td>grows and shrinks on demand; for many short tasks</td></tr>\n    <tr><td><code>newSingleThreadExecutor()</code></td><td>one thread, tasks run in order</td></tr>\n    <tr><td><code>newScheduledThreadPool(n)</code></td><td>delayed and repeating tasks</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">ExecutorService pool = Executors.newFixedThreadPool(3);\nfor (int i = 1; i &lt;= 10; i++) {\n    int id = i;                                  // must be effectively final\n    pool.execute(() -&gt; System.out.println(\"Job \" + id + \" on \" + Thread.currentThread().getName()));\n}\npool.shutdown();                                 // no new tasks; running ones finish\npool.awaitTermination(1, TimeUnit.MINUTES);</code></pre>\n<p>Creating a thread costs memory and time. A pool reuses a handful of threads for thousands of tasks —\nthis is how every real server works.</p>\n\n<h3>5. join() in practice</h3>\n<pre><code class=\"language-java\">Thread t1 = new Thread(() -&gt; sum(0, 500));\nThread t2 = new Thread(() -&gt; sum(500, 1000));\nt1.start(); t2.start();\nt1.join(); t2.join();          // wait for BOTH before combining results\nSystem.out.println(\"Both halves done\");</code></pre>"
    },
    {
      "title": "Race Conditions & Synchronization",
      "subtitle": "Lectures 28-29 · the core of the End Term paper",
      "html": "<h3>1. What a race condition is</h3>\n<p>Two threads read-modify-write the same variable and the result depends on who wins the race.\n<code>count++</code> looks atomic but is really three steps: <em>read, add 1, write back</em>.\nInterleave those and updates get lost.</p>\n\n<pre><code class=\"language-java\">class Counter {\n    private int count = 0;\n    public void increment() { count++; }      // NOT atomic\n    public int get() { return count; }\n}\n// 2 threads x 10,000 increments each usually prints something less than 20,000</code></pre>\n\n<h3>2. Fix 1 — synchronized method</h3>\n<pre><code class=\"language-java\">public synchronized void increment() { count++; }</code></pre>\n<p>The thread must own the object's <strong>intrinsic lock (monitor)</strong> to enter. Everyone else waits\n(state <code>BLOCKED</code>). For a <code>static synchronized</code> method the lock is the <code>Class</code> object instead.</p>\n\n<h3>3. Fix 2 — synchronized block (finer grained)</h3>\n<pre><code class=\"language-java\">private final Object lock = new Object();\n\npublic void increment() {\n    doExpensiveUnsharedWork();      // outside the lock - stays parallel\n    synchronized (lock) {\n        count++;                    // only the shared part is serialised\n    }\n}</code></pre>\n<p>Locking less code means more parallelism. Lock the smallest region that still protects the shared state.</p>\n\n<h3>4. Fix 3 — atomic classes (no locking at all)</h3>\n<pre><code class=\"language-java\">private final AtomicInteger count = new AtomicInteger();\ncount.incrementAndGet();     // one indivisible CPU instruction (compare-and-swap)</code></pre>\n\n<h3>5. volatile — visibility, not atomicity</h3>\n<pre><code class=\"language-java\">private volatile boolean running = true;   // every read goes to main memory\n\npublic void stop() { running = false; }    // other threads see it immediately\npublic void run() { while (running) { } }  // without volatile this can loop forever</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; volatile vs synchronized:</strong> <code>volatile</code> guarantees <em>visibility</em>\n  (no stale cached copy) but not <em>atomicity</em> — <code>volatile int c; c++;</code> is still a race.\n  <code>synchronized</code> gives both, at the cost of blocking.\n</div>\n\n<h3>6. The bank account example</h3>\n<pre><code class=\"language-java\">public class BankAccount {\n    private int balance = 1000;\n\n    public synchronized void withdraw(int amount) {\n        if (balance &gt;= amount) {      // check\n            balance -= amount;        // and act - must be ONE atomic step\n        }\n    }\n\n    public synchronized int getBalance() { return balance; }\n}</code></pre>\n<p>Without <code>synchronized</code>, two threads can both pass the <code>if</code> before either subtracts —\nthe classic \"check-then-act\" bug that lets an account go negative.</p>\n\n<h3>7. wait / notify — threads cooperating</h3>\n<pre><code class=\"language-java\">// Producer-Consumer with a bounded buffer\nsynchronized (buffer) {\n    while (buffer.isEmpty()) buffer.wait();    // ALWAYS wait inside a while, never an if\n    Item item = buffer.remove();\n    buffer.notifyAll();                        // wake up producers\n}</code></pre>\n<ul>\n  <li><code>wait()</code>, <code>notify()</code>, <code>notifyAll()</code> belong to <code>Object</code> and must be\n      called while holding that object's monitor.</li>\n  <li>Use <code>while</code>, not <code>if</code> — a thread can wake up spuriously or lose the race to another consumer.</li>\n  <li>Prefer <code>notifyAll()</code>; <code>notify()</code> can wake the wrong waiter and stall the system.</li>\n</ul>"
    },
    {
      "title": "Deadlock, Livelock, Starvation & Thread Safety",
      "subtitle": "Lecture 30 · concurrency hazards",
      "html": "<h3>1. Deadlock</h3>\n<p>Two threads each hold a lock the other needs, so both wait forever.</p>\n\n<pre><code class=\"language-java\">// Thread 1\nsynchronized (lockA) { synchronized (lockB) { } }\n// Thread 2\nsynchronized (lockB) { synchronized (lockA) { } }   // opposite order -> deadlock</code></pre>\n\n<p><strong>Coffman's four conditions</strong> — all must hold for deadlock, so breaking any one prevents it:</p>\n<ol>\n  <li><strong>Mutual exclusion</strong> — a resource can be held by only one thread.</li>\n  <li><strong>Hold and wait</strong> — a thread holds one resource while requesting another.</li>\n  <li><strong>No pre-emption</strong> — a lock cannot be forcibly taken away.</li>\n  <li><strong>Circular wait</strong> — a cycle of threads each waiting on the next.</li>\n</ol>\n\n<h3>2. Preventing deadlock</h3>\n<ul>\n  <li><strong>Global lock ordering</strong> — every thread takes locks in the same fixed order (kills circular wait). This is the standard answer.</li>\n  <li>Use timeouts: <code>lock.tryLock(1, TimeUnit.SECONDS)</code> and back off if it fails.</li>\n  <li>Hold fewer locks; hold them for less time.</li>\n  <li>Prefer immutable objects and <code>java.util.concurrent</code> utilities over hand-rolled locking.</li>\n</ul>\n\n<pre><code class=\"language-java\">// Ordered locking - both threads take the lower id first, so no cycle can form\nObject first  = a.id &lt; b.id ? a.lock : b.lock;\nObject second = a.id &lt; b.id ? b.lock : a.lock;\nsynchronized (first) { synchronized (second) { transfer(a, b, amount); } }</code></pre>\n\n<h3>3. Livelock and starvation</h3>\n<table>\n  <thead><tr><th>Problem</th><th>What it looks like</th><th>Typical fix</th></tr></thead>\n  <tbody>\n    <tr><td><strong>Deadlock</strong></td><td>threads blocked forever, CPU idle</td><td>lock ordering, timeouts</td></tr>\n    <tr><td><strong>Livelock</strong></td><td>threads keep reacting to each other and make no progress; CPU busy</td><td>randomised back-off</td></tr>\n    <tr><td><strong>Starvation</strong></td><td>one thread never gets the lock because greedy threads keep taking it</td><td>fair locks (<code>new ReentrantLock(true)</code>)</td></tr>\n  </tbody>\n</table>\n<p>Livelock is the two-people-in-a-corridor problem: both keep stepping aside politely and neither gets through.</p>\n\n<h3>4. Thread safety toolkit</h3>\n<table>\n  <thead><tr><th>Approach</th><th>Example</th></tr></thead>\n  <tbody>\n    <tr><td>Immutability (best)</td><td><code>final</code> fields, <code>String</code>, <code>LocalDate</code>, records</td></tr>\n    <tr><td>Confinement</td><td>keep data inside one thread; local variables are always safe</td></tr>\n    <tr><td>Synchronization</td><td><code>synchronized</code>, <code>ReentrantLock</code></td></tr>\n    <tr><td>Atomics</td><td><code>AtomicInteger</code>, <code>AtomicReference</code></td></tr>\n    <tr><td>Concurrent collections</td><td><code>ConcurrentHashMap</code>, <code>BlockingQueue</code></td></tr>\n  </tbody>\n</table>\n\n<h3>5. ReentrantLock — synchronized with extra features</h3>\n<pre><code class=\"language-java\">private final ReentrantLock lock = new ReentrantLock();\n\nlock.lock();\ntry {\n    // critical section\n} finally {\n    lock.unlock();       // MUST be in finally, or a thrown exception leaks the lock\n}\n\nif (lock.tryLock(1, TimeUnit.SECONDS)) { }   // give up instead of blocking forever</code></pre>\n<p>Extras over <code>synchronized</code>: try-with-timeout, interruptible waiting, fairness, and multiple\n<code>Condition</code> objects. The cost is that you must unlock manually.</p>\n\n<h3>6. Concurrent collections</h3>\n<table>\n  <thead><tr><th>Instead of</th><th>Use</th><th>Why</th></tr></thead>\n  <tbody>\n    <tr><td><code>HashMap</code></td><td><code>ConcurrentHashMap</code></td><td>locks only one bucket, not the whole map</td></tr>\n    <tr><td><code>ArrayList</code> (mostly reads)</td><td><code>CopyOnWriteArrayList</code></td><td>writes copy the array; reads never lock</td></tr>\n    <tr><td>manual wait/notify queue</td><td><code>ArrayBlockingQueue</code> / <code>LinkedBlockingQueue</code></td><td>ready-made producer-consumer</td></tr>\n    <tr><td><code>Collections.synchronizedMap</code></td><td><code>ConcurrentHashMap</code></td><td>far better throughput</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-java\">BlockingQueue&lt;Order&gt; queue = new ArrayBlockingQueue&lt;&gt;(100);\nqueue.put(order);        // blocks if the queue is full\nOrder o = queue.take();  // blocks if the queue is empty - no wait/notify needed\n\nCountDownLatch latch = new CountDownLatch(3);\nlatch.countDown();       // each worker signals\nlatch.await();           // main thread waits for all three</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; <code>Collections.synchronizedMap</code> is not enough for compound actions.</strong>\n  <code>if (!map.containsKey(k)) map.put(k, v);</code> is still a race — each call is synchronized, the pair is not.\n  Use <code>ConcurrentHashMap.putIfAbsent</code> or <code>computeIfAbsent</code>.\n</div>"
    },
    {
      "title": "Concurrency Rapid Revision",
      "subtitle": "Lecture 30 · last-hour sheet",
      "html": "<h3>1. One-line answers</h3>\n<table>\n  <thead><tr><th>Question</th><th>Answer</th></tr></thead>\n  <tbody>\n    <tr><td><code>start()</code> vs <code>run()</code></td><td><code>start()</code> makes a new thread; <code>run()</code> is just a method call</td></tr>\n    <tr><td><code>sleep()</code> vs <code>wait()</code></td><td>sleep keeps the lock (Thread, static); wait releases it (Object, needs synchronized)</td></tr>\n    <tr><td><code>notify()</code> vs <code>notifyAll()</code></td><td>one arbitrary waiter vs all waiters; prefer notifyAll</td></tr>\n    <tr><td><code>volatile</code> vs <code>synchronized</code></td><td>visibility only vs visibility + mutual exclusion</td></tr>\n    <tr><td>Runnable vs Callable</td><td><code>run()</code> returns void; <code>call()</code> returns a value and may throw</td></tr>\n    <tr><td>Runnable vs Thread</td><td>implement Runnable — keeps your one inheritance slot free and fits thread pools</td></tr>\n    <tr><td>Deadlock vs livelock</td><td>both stuck; deadlock is blocked and idle, livelock is active and looping</td></tr>\n    <tr><td>User vs daemon thread</td><td>the JVM waits for user threads, abandons daemon threads at exit</td></tr>\n    <tr><td>Thread-safe Map</td><td><code>ConcurrentHashMap</code></td></tr>\n    <tr><td>Why a thread pool</td><td>thread creation is expensive; reuse a fixed set of workers</td></tr>\n  </tbody>\n</table>\n\n<h3>2. Complete worked example — safe counter, three ways</h3>\n<pre><code class=\"language-java\">public class CounterDemo {\n    static int plain = 0;\n    static final AtomicInteger atomic = new AtomicInteger();\n    static int guarded = 0;\n    static final Object lock = new Object();\n\n    public static void main(String[] args) throws InterruptedException {\n        Runnable job = () -&gt; {\n            for (int i = 0; i &lt; 100_000; i++) {\n                plain++;                                  // RACE - loses updates\n                atomic.incrementAndGet();                 // safe, lock free\n                synchronized (lock) { guarded++; }        // safe, locking\n            }\n        };\n\n        Thread t1 = new Thread(job), t2 = new Thread(job);\n        t1.start(); t2.start();\n        t1.join();  t2.join();\n\n        System.out.println(\"plain   = \" + plain);         // usually < 200000\n        System.out.println(\"atomic  = \" + atomic.get());  // exactly 200000\n        System.out.println(\"guarded = \" + guarded);       // exactly 200000\n    }\n}</code></pre>\n\n<h3>3. Mistakes that cost marks</h3>\n<ul>\n  <li>Calling <code>run()</code> instead of <code>start()</code>.</li>\n  <li>Calling <code>wait()</code> outside <code>synchronized</code> — <code>IllegalMonitorStateException</code>.</li>\n  <li>Using <code>if</code> instead of <code>while</code> around <code>wait()</code>.</li>\n  <li>Forgetting <code>pool.shutdown()</code>, so the program never ends.</li>\n  <li>Forgetting <code>unlock()</code> in a <code>finally</code> block.</li>\n  <li>Claiming <code>volatile</code> makes <code>count++</code> safe. It does not.</li>\n  <li>Synchronizing on a mutable field or a boxed <code>Integer</code> — the lock object changes underneath you.</li>\n</ul>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; The golden rule:</strong> shared + mutable = danger. Remove either one — make it unshared\n  (thread confinement) or immutable — and you need no locks at all.\n</div>"
    }
  ],
  "lab": [
    {
      "title": "Labs 1-3 — Binary, Octal, Decimal & Hexadecimal Conversion",
      "subtitle": "Number systems",
      "html": "<h3>Problem</h3>\n<p>Implement conversion between binary, octal, decimal and hexadecimal.</p>\n\n<h3>Idea</h3>\n<p>Everything routes through decimal: <em>source base &rarr; decimal &rarr; target base</em>.\nTo go to base b, repeatedly divide by b and read the remainders bottom-up.\nTo come from base b, multiply-accumulate each digit: <code>value = value * b + digit</code>.</p>\n\n<pre><code class=\"language-java\">public class BaseConverter {\n\n    // decimal -> any base (2..16), done by hand\n    static String toBase(int n, int base) {\n        if (n == 0) return \"0\";\n        String digits = \"0123456789ABCDEF\";\n        StringBuilder sb = new StringBuilder();\n        while (n &gt; 0) {\n            sb.append(digits.charAt(n % base));\n            n /= base;\n        }\n        return sb.reverse().toString();\n    }\n\n    // any base -> decimal\n    static int toDecimal(String s, int base) {\n        int value = 0;\n        for (char c : s.toUpperCase().toCharArray()) {\n            int digit = Character.digit(c, base);\n            if (digit &lt; 0) throw new NumberFormatException(\"Bad digit \" + c + \" for base \" + base);\n            value = value * base + digit;\n        }\n        return value;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(toBase(255, 2));           // 11111111\n        System.out.println(toBase(255, 8));           // 377\n        System.out.println(toBase(255, 16));          // FF\n        System.out.println(toDecimal(\"FF\", 16));      // 255\n\n        // Built-in shortcuts - mention these for bonus marks\n        System.out.println(Integer.toBinaryString(255));\n        System.out.println(Integer.toOctalString(255));\n        System.out.println(Integer.toHexString(255));\n        System.out.println(Integer.parseInt(\"FF\", 16));\n    }\n}</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161; Viva question:</strong> why is hexadecimal used for memory addresses? Because one hex digit is\n  exactly four bits, so a 32-bit address is exactly eight compact digits.\n</div>"
    },
    {
      "title": "Labs 4-7 — Scientific Calculator & Precision Loss",
      "subtitle": "Floating point",
      "html": "<h3>Problem</h3>\n<p>Implement a scientific calculator that demonstrates precision loss.</p>\n\n<h3>Why precision is lost</h3>\n<p><code>float</code> and <code>double</code> follow IEEE 754: numbers are stored in <em>binary</em>.\nValues like 0.1 have no exact binary form, exactly as 1/3 has no exact decimal form. Small errors accumulate.</p>\n\n<pre><code class=\"language-java\">System.out.println(0.1 + 0.2);            // 0.30000000000000004\nSystem.out.println(0.1 + 0.2 == 0.3);     // false!\nSystem.out.println(1.0 / 0);              // Infinity  (no exception for doubles)\nSystem.out.println(0.0 / 0);              // NaN\nSystem.out.println(1 / 0);                // ArithmeticException (integers DO throw)</code></pre>\n\n<pre><code class=\"language-java\">import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\npublic class Calculator {\n\n    static double divide(double a, double b) {\n        if (b == 0) throw new ArithmeticException(\"Division by zero\");\n        return a / b;\n    }\n\n    // Never compare doubles with ==\n    static boolean equals(double a, double b) {\n        return Math.abs(a - b) &lt; 1e-9;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(Math.sqrt(16));            // 4.0\n        System.out.println(Math.pow(2, 10));          // 1024.0\n        System.out.println(Math.log(Math.E));         // 1.0\n        System.out.println(Math.sin(Math.toRadians(30)));   // 0.5 (approximately)\n\n        // Exact arithmetic for money - use BigDecimal, and the STRING constructor\n        BigDecimal x = new BigDecimal(\"0.1\");\n        BigDecimal y = new BigDecimal(\"0.2\");\n        System.out.println(x.add(y));                            // 0.3 exactly\n        System.out.println(x.divide(new BigDecimal(\"3\"), 4, RoundingMode.HALF_UP));\n    }\n}</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; Two rules:</strong> compare doubles with a small epsilon, never <code>==</code>;\n  and use <code>BigDecimal</code> for money — <code>new BigDecimal(0.1)</code> (double argument) reintroduces the\n  error, so always pass a String.\n</div>"
    },
    {
      "title": "Lab 8 & Labs 9-15 — Swap, Bit Tricks & Overflow Detection",
      "subtitle": "Bit manipulation",
      "html": "<h3>Lab 8 — Swap two numbers without a temporary variable</h3>\n<pre><code class=\"language-java\">// Arithmetic version (can overflow for huge values)\na = a + b;  b = a - b;  a = a - b;\n\n// XOR version - preferred\na = a ^ b;  b = a ^ b;  a = a ^ b;\n\n// One-liner\na = a + b - (b = a);</code></pre>\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039;</strong> Both tricks break if you swap a variable with <em>itself</em> (same memory):\n  XOR leaves it as 0. Guard with <code>if (i != j)</code>.\n</div>\n\n<h3>Labs 9-15 (1) — Count set bits</h3>\n<pre><code class=\"language-java\">static int countSetBits(int n) {          // Brian Kernighan - O(number of set bits)\n    int count = 0;\n    while (n != 0) { n &amp;= (n - 1); count++; }\n    return count;\n}\n// Built-in: Integer.bitCount(n)</code></pre>\n\n<h3>Labs 9-15 (2) — Nearest power of two</h3>\n<pre><code class=\"language-java\">static boolean isPowerOfTwo(int n) {\n    return n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0;\n}\n\nstatic int nextPowerOfTwo(int n) {\n    if (n &lt;= 1) return 1;\n    return Integer.highestOneBit(n - 1) &lt;&lt; 1;\n}\n\nstatic int nearestPowerOfTwo(int n) {     // closest one, above or below\n    int lower = Integer.highestOneBit(n);\n    int upper = lower &lt;&lt; 1;\n    return (n - lower) &lt;= (upper - n) ? lower : upper;\n}</code></pre>\n\n<h3>Labs 9-15 (3) — Will this addition overflow?</h3>\n<pre><code class=\"language-java\">public class OverflowCheck {\n\n    static boolean willOverflow(int a, int b) {\n        long sum = (long) a + (long) b;                     // do it in 64 bits\n        return sum &gt; Integer.MAX_VALUE || sum &lt; Integer.MIN_VALUE;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt(), b = sc.nextInt();\n\n        if (willOverflow(a, b)) {\n            System.out.println(\"Overflow would occur - addition not performed\");\n        } else {\n            System.out.println(\"Sum = \" + (a + b));\n        }\n\n        // Equivalent using the standard library\n        try {\n            System.out.println(\"Math.addExact = \" + Math.addExact(a, b));\n        } catch (ArithmeticException e) {\n            System.out.println(\"Math.addExact reports overflow\");\n        }\n    }\n}</code></pre>"
    },
    {
      "title": "Labs 16-20 — Anagrams & First Unique Character",
      "subtitle": "Strings, HashMap, sorting",
      "html": "<h3>1. Are two strings anagrams?</h3>\n<pre><code class=\"language-java\">// Approach A: sort both - O(n log n)\nstatic boolean isAnagramSort(String a, String b) {\n    if (a.length() != b.length()) return false;\n    char[] x = a.toCharArray(), y = b.toCharArray();\n    Arrays.sort(x); Arrays.sort(y);\n    return Arrays.equals(x, y);\n}\n\n// Approach B: frequency count - O(n), the answer they want\nstatic boolean isAnagram(String a, String b) {\n    if (a.length() != b.length()) return false;\n    int[] freq = new int[26];\n    for (int i = 0; i &lt; a.length(); i++) {\n        freq[a.charAt(i) - 'a']++;\n        freq[b.charAt(i) - 'a']--;\n    }\n    for (int f : freq) if (f != 0) return false;\n    return true;\n}</code></pre>\n\n<h3>2. Group words that are anagrams</h3>\n<p>Key insight: all anagrams share the same <em>sorted</em> form, so use that as a HashMap key.</p>\n<pre><code class=\"language-java\">static Collection&lt;List&lt;String&gt;&gt; groupAnagrams(String[] words) {\n    Map&lt;String, List&lt;String&gt;&gt; groups = new HashMap&lt;&gt;();\n    for (String w : words) {\n        char[] c = w.toCharArray();\n        Arrays.sort(c);\n        groups.computeIfAbsent(new String(c), k -&gt; new ArrayList&lt;&gt;()).add(w);\n    }\n    return groups.values();\n}\n// [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"] -> [[eat, tea, ate], [tan, nat], [bat]]</code></pre>\n\n<h3>3. First unique (non-repeating) character</h3>\n<pre><code class=\"language-java\">static char firstUnique(String s) {\n    Map&lt;Character, Integer&gt; count = new LinkedHashMap&lt;&gt;();   // keeps insertion order\n    for (char c : s.toCharArray()) count.merge(c, 1, Integer::sum);\n    for (Map.Entry&lt;Character, Integer&gt; e : count.entrySet())\n        if (e.getValue() == 1) return e.getKey();\n    return '_';   // none found\n}\n// \"swiss\" -> 'w'</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Why LinkedHashMap:</strong> a plain <code>HashMap</code> has no order, so the \"first\" unique\n  character would be random. This is exactly the kind of detail a viva targets.\n</div>"
    },
    {
      "title": "Labs 21-24 — Rotate a LinkedList by K & Mini Search Engine",
      "subtitle": "LinkedList, Map of Maps",
      "html": "<h3>1. Rotate a linked list by K positions</h3>\n<pre><code class=\"language-java\">// Using java.util.LinkedList - O(k)\nstatic &lt;T&gt; void rotateLeft(LinkedList&lt;T&gt; list, int k) {\n    if (list.isEmpty()) return;\n    k = k % list.size();                 // k may be larger than the list\n    for (int i = 0; i &lt; k; i++) list.addLast(list.removeFirst());\n}\n\n// Or in one call\nCollections.rotate(list, -k);            // negative = left, positive = right</code></pre>\n\n<p>The hand-written singly-linked version, which is what the viva asks for:</p>\n<pre><code class=\"language-java\">static Node rotateRight(Node head, int k) {\n    if (head == null || head.next == null) return head;\n\n    int len = 1;\n    Node tail = head;\n    while (tail.next != null) { tail = tail.next; len++; }\n\n    k = k % len;\n    if (k == 0) return head;\n\n    tail.next = head;                    // close the ring\n    Node newTail = head;\n    for (int i = 1; i &lt; len - k; i++) newTail = newTail.next;\n\n    Node newHead = newTail.next;\n    newTail.next = null;                 // open it again at the new point\n    return newHead;\n}</code></pre>\n\n<h3>2. Mini search engine — keyword counts across documents</h3>\n<p>Build an <strong>inverted index</strong>: word &rarr; (document &rarr; count). That is a\n<code>Map&lt;String, Map&lt;String, Integer&gt;&gt;</code>.</p>\n\n<pre><code class=\"language-java\">public class MiniSearchEngine {\n    private final Map&lt;String, Map&lt;String, Integer&gt;&gt; index = new HashMap&lt;&gt;();\n\n    public void addDocument(String docName, String text) {\n        for (String word : text.toLowerCase().split(\"\\\\W+\")) {\n            if (word.isEmpty()) continue;\n            index.computeIfAbsent(word, k -&gt; new HashMap&lt;&gt;())\n                 .merge(docName, 1, Integer::sum);\n        }\n    }\n\n    // Documents containing the keyword, most relevant first\n    public List&lt;String&gt; search(String keyword) {\n        return index.getOrDefault(keyword.toLowerCase(), Map.of())\n                    .entrySet().stream()\n                    .sorted(Map.Entry.&lt;String, Integer&gt;comparingByValue().reversed())\n                    .map(e -&gt; e.getKey() + \" (\" + e.getValue() + \" hits)\")\n                    .toList();\n    }\n\n    public static void main(String[] args) throws IOException {\n        MiniSearchEngine se = new MiniSearchEngine();\n        se.addDocument(\"doc1.txt\", Files.readString(Path.of(\"doc1.txt\")));\n        se.addDocument(\"doc2.txt\", Files.readString(Path.of(\"doc2.txt\")));\n        System.out.println(se.search(\"java\"));\n    }\n}</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161;</strong> <code>split(\"\\\\W+\")</code> splits on any run of non-word characters, so punctuation is\n  handled for free. Searching the index is O(1) instead of rescanning every file.\n</div>"
    },
    {
      "title": "Labs 25-30 — Ride-Sharing Matching System (PriorityQueue)",
      "subtitle": "Heaps and comparators",
      "html": "<h3>Problem</h3>\n<p>Match drivers to passengers using a <code>PriorityQueue</code>, always picking the nearest available driver.</p>\n\n<h3>Design</h3>\n<ul>\n  <li><code>Driver</code> and <code>Passenger</code> hold an id and an (x, y) position.</li>\n  <li>For each ride request, order available drivers by distance in a min-heap and <code>poll()</code> the closest.</li>\n  <li>Building a heap is O(n); each match is O(log n) — far better than sorting the whole list every time.</li>\n</ul>\n\n<pre><code class=\"language-java\">import java.util.*;\n\nclass Driver {\n    final String id; final double x, y; boolean available = true;\n    Driver(String id, double x, double y) { this.id = id; this.x = x; this.y = y; }\n    double distanceTo(Passenger p) { return Math.hypot(x - p.x, y - p.y); }\n    @Override public String toString() { return id; }\n}\n\nclass Passenger {\n    final String id; final double x, y;\n    Passenger(String id, double x, double y) { this.id = id; this.x = x; this.y = y; }\n}\n\npublic class RideMatcher {\n    private final List&lt;Driver&gt; drivers = new ArrayList&lt;&gt;();\n\n    void register(Driver d) { drivers.add(d); }\n\n    Optional&lt;Driver&gt; match(Passenger p) {\n        PriorityQueue&lt;Driver&gt; nearest = new PriorityQueue&lt;&gt;(\n                Comparator.comparingDouble(d -&gt; d.distanceTo(p)));   // min-heap by distance\n\n        for (Driver d : drivers) if (d.available) nearest.offer(d);\n\n        Driver chosen = nearest.poll();\n        if (chosen == null) return Optional.empty();     // no driver free right now\n        chosen.available = false;                        // mark as busy\n        return Optional.of(chosen);\n    }\n\n    public static void main(String[] args) {\n        RideMatcher app = new RideMatcher();\n        app.register(new Driver(\"D1\", 0, 0));\n        app.register(new Driver(\"D2\", 3, 4));     // 5 units away from (0,0)\n        app.register(new Driver(\"D3\", 1, 1));     // 1.41 units away\n\n        Passenger p = new Passenger(\"P1\", 0, 0);\n        app.match(p).ifPresentOrElse(\n            d -&gt; System.out.println(\"Matched with \" + d),\n            () -&gt; System.out.println(\"No drivers available\"));\n        // Matched with D3\n    }\n}</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Talking points for the viva:</strong>\n  <ul>\n    <li><code>Comparator.comparingDouble</code> gives a min-heap; wrap with <code>.reversed()</code> for a max-heap.</li>\n    <li><code>Math.hypot(dx, dy)</code> is a safer <code>sqrt(dx*dx + dy*dy)</code> (no overflow).</li>\n    <li>Edge cases: no drivers available, several drivers equidistant (any is fine), driver goes offline mid-match.</li>\n    <li>Extension: give the comparator a rating tie-breaker with <code>.thenComparing(...)</code>.</li>\n  </ul>\n</div>"
    },
    {
      "title": "Labs 31-40 — Generic Utilities, Pair, Stack, Queue, Matrix & Sorting Framework",
      "subtitle": "Generics in practice",
      "html": "<h3>1. Generic array utility</h3>\n<pre><code class=\"language-java\">public final class ArrayUtils {\n    private ArrayUtils() { }\n\n    public static &lt;T&gt; void print(T[] a) { System.out.println(Arrays.toString(a)); }\n\n    public static &lt;T&gt; void reverse(T[] a) {\n        for (int i = 0, j = a.length - 1; i &lt; j; i++, j--) {\n            T tmp = a[i]; a[i] = a[j]; a[j] = tmp;\n        }\n    }\n\n    public static &lt;T extends Comparable&lt;T&gt;&gt; T max(T[] a) {\n        T best = a[0];\n        for (T x : a) if (x.compareTo(best) &gt; 0) best = x;\n        return best;\n    }\n}</code></pre>\n\n<h3>2. Pair class</h3>\n<pre><code class=\"language-java\">public class Pair&lt;K, V&gt; {\n    private final K key; private final V value;\n    public Pair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey()   { return key; }\n    public V getValue() { return value; }\n    public &lt;R&gt; Pair&lt;K, R&gt; withValue(R v) { return new Pair&lt;&gt;(key, v); }\n    @Override public String toString() { return \"(\" + key + \", \" + value + \")\"; }\n    @Override public boolean equals(Object o) {\n        if (!(o instanceof Pair&lt;?, ?&gt; p)) return false;\n        return Objects.equals(key, p.key) &amp;&amp; Objects.equals(value, p.value);\n    }\n    @Override public int hashCode() { return Objects.hash(key, value); }\n}</code></pre>\n\n<h3>3. Generic stack and queue</h3>\n<pre><code class=\"language-java\">public class GenericStack&lt;T&gt; {\n    private final List&lt;T&gt; items = new ArrayList&lt;&gt;();\n\n    public void push(T item) { items.add(item); }\n\n    public T pop() {\n        if (isEmpty()) throw new NoSuchElementException(\"Stack is empty\");\n        return items.remove(items.size() - 1);      // last in, first out\n    }\n\n    public T peek() {\n        if (isEmpty()) throw new NoSuchElementException(\"Stack is empty\");\n        return items.get(items.size() - 1);\n    }\n\n    public boolean isEmpty() { return items.isEmpty(); }\n    public int size() { return items.size(); }\n}\n\npublic class GenericQueue&lt;T&gt; {\n    private final Deque&lt;T&gt; items = new ArrayDeque&lt;&gt;();\n    public void enqueue(T item) { items.addLast(item); }\n    public T dequeue() {\n        if (items.isEmpty()) throw new NoSuchElementException(\"Queue is empty\");\n        return items.removeFirst();                 // first in, first out\n    }\n}</code></pre>\n\n<h3>4. Matrix operations</h3>\n<pre><code class=\"language-java\">static int[][] multiply(int[][] a, int[][] b) {\n    int n = a.length, m = b[0].length, k = b.length;\n    if (a[0].length != k) throw new IllegalArgumentException(\"Dimension mismatch\");\n    int[][] c = new int[n][m];\n    for (int i = 0; i &lt; n; i++)\n        for (int j = 0; j &lt; m; j++)\n            for (int x = 0; x &lt; k; x++)\n                c[i][j] += a[i][x] * b[x][j];\n    return c;                                        // O(n*m*k)\n}\n\nstatic int[][] transpose(int[][] a) {\n    int[][] t = new int[a[0].length][a.length];\n    for (int i = 0; i &lt; a.length; i++)\n        for (int j = 0; j &lt; a[0].length; j++)\n            t[j][i] = a[i][j];\n    return t;\n}</code></pre>\n\n<h3>5. Generic repository</h3>\n<pre><code class=\"language-java\">public class Repository&lt;T, ID&gt; {\n    private final Map&lt;ID, T&gt; store = new HashMap&lt;&gt;();\n    private final Function&lt;T, ID&gt; idExtractor;\n\n    public Repository(Function&lt;T, ID&gt; idExtractor) { this.idExtractor = idExtractor; }\n\n    public void save(T item)          { store.put(idExtractor.apply(item), item); }\n    public Optional&lt;T&gt; findById(ID id){ return Optional.ofNullable(store.get(id)); }\n    public List&lt;T&gt; findAll()          { return new ArrayList&lt;&gt;(store.values()); }\n    public void delete(ID id)         { store.remove(id); }\n}\n\nRepository&lt;Student, Integer&gt; repo = new Repository&lt;&gt;(Student::getId);</code></pre>\n\n<h3>6. Sorting framework</h3>\n<pre><code class=\"language-java\">public interface Sorter {\n    &lt;T extends Comparable&lt;T&gt;&gt; void sort(T[] array);\n}\n\npublic class BubbleSort implements Sorter {\n    @Override public &lt;T extends Comparable&lt;T&gt;&gt; void sort(T[] a) {\n        for (int i = 0; i &lt; a.length - 1; i++) {\n            boolean swapped = false;\n            for (int j = 0; j &lt; a.length - 1 - i; j++) {\n                if (a[j].compareTo(a[j + 1]) &gt; 0) {\n                    T t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n                    swapped = true;\n                }\n            }\n            if (!swapped) break;                     // already sorted - O(n) best case\n        }\n    }\n}\n// Swap the implementation without touching the caller: new BubbleSort() -> new MergeSort()</code></pre>\n\n<div class=\"callout callout-tip\">\n  <strong>&#128161;</strong> This is the <em>strategy pattern</em>: one interface, several interchangeable algorithms.\n  Say that name in the viva.\n</div>"
    },
    {
      "title": "Labs 41-50 — Lambda Palindrome & Stream Programs",
      "subtitle": "Functional style",
      "html": "<h3>Labs 41-45 — Palindrome test with a lambda</h3>\n<pre><code class=\"language-java\">import java.util.function.Predicate;\n\npublic class PalindromeLambda {\n    public static void main(String[] args) {\n\n        Predicate&lt;String&gt; isPalindrome =\n            s -&gt; s.equals(new StringBuilder(s).reverse().toString());\n\n        // Ignore case, spaces and punctuation\n        Predicate&lt;String&gt; isCleanPalindrome = s -&gt; {\n            String clean = s.toLowerCase().replaceAll(\"[^a-z0-9]\", \"\");\n            return clean.equals(new StringBuilder(clean).reverse().toString());\n        };\n\n        System.out.println(isPalindrome.test(\"madam\"));                  // true\n        System.out.println(isCleanPalindrome.test(\"A man, a plan, a canal: Panama\"));  // true\n\n        // Combine predicates\n        Predicate&lt;String&gt; notEmpty = s -&gt; s != null &amp;&amp; !s.isBlank();\n        System.out.println(notEmpty.and(isCleanPalindrome).test(\"racecar\"));\n\n        // Filter a whole list\n        List&lt;String&gt; words = List.of(\"level\", \"java\", \"radar\", \"code\");\n        System.out.println(words.stream().filter(isPalindrome).toList());  // [level, radar]\n    }\n}</code></pre>\n\n<h3>Labs 46-50 (1) — Remove duplicates using stream operations</h3>\n<pre><code class=\"language-java\">List&lt;String&gt; names = List.of(\"Aman\", \"Riya\", \"Aman\", \"Karan\", \"Riya\");\n\nList&lt;String&gt; unique = names.stream().distinct().toList();          // [Aman, Riya, Karan]\n\n// Case-insensitive duplicates\nList&lt;String&gt; uniqueIgnoreCase = names.stream()\n        .collect(Collectors.toMap(String::toLowerCase, s -&gt; s, (a, b) -&gt; a))\n        .values().stream().toList();\n\n// Duplicates only\nSet&lt;String&gt; seen = new HashSet&lt;&gt;();\nList&lt;String&gt; dupes = names.stream().filter(n -&gt; !seen.add(n)).distinct().toList();</code></pre>\n<p><code>distinct()</code> uses <code>equals()</code>/<code>hashCode()</code>, so your own classes must override both.</p>\n\n<h3>Labs 46-50 (2) — Generate official email IDs using map()</h3>\n<pre><code class=\"language-java\">List&lt;String&gt; names = List.of(\"Aman Sharma\", \"Riya Gupta\", \"Karan Mehta\");\n\nList&lt;String&gt; emails = names.stream()\n        .map(String::trim)\n        .map(String::toLowerCase)\n        .map(n -&gt; n.replaceAll(\"\\\\s+\", \".\"))\n        .map(n -&gt; n + \"@chitkara.edu.in\")\n        .toList();\n// [aman.sharma@chitkara.edu.in, riya.gupta@chitkara.edu.in, karan.mehta@chitkara.edu.in]\n\n// Name -> email map\nMap&lt;String, String&gt; directory = names.stream()\n        .collect(Collectors.toMap(n -&gt; n,\n                 n -&gt; n.toLowerCase().replace(\" \", \".\") + \"@chitkara.edu.in\"));</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>&#9888;&#65039; <code>Collectors.toMap</code> throws <code>IllegalStateException</code> on a duplicate key.</strong>\n  Pass a third merge argument — <code>(a, b) -&gt; a</code> — to say which one wins.\n</div>"
    },
    {
      "title": "Labs 51-56 — Debugging: Infinite Loops, Empty Input, Memory Leaks & Edge Cases",
      "subtitle": "Defensive programming",
      "html": "<h3>1. Debug a program stuck in endless execution</h3>\n<pre><code class=\"language-java\">// BUG: i is never incremented\nint i = 0;\nwhile (i &lt; 10) { System.out.println(i); }\n\n// BUG: floating point never lands exactly on 1.0\nfor (double d = 0; d != 1.0; d += 0.1) { }\n// FIX: for (int k = 0; k &lt; 10; k++) { double d = k / 10.0; }\n\n// BUG: the loop variable is modified inside the body\nfor (int k = 0; k &lt; n; k++) { if (bad) k--; }</code></pre>\n<p><strong>How to find it:</strong> print the loop variable each iteration, or attach the debugger and pause —\nthe stack shows exactly which loop is spinning. A safety counter helps too:</p>\n<pre><code class=\"language-java\">int guard = 0;\nwhile (condition) {\n    if (++guard &gt; 1_000_000) throw new IllegalStateException(\"Loop did not terminate\");\n}</code></pre>\n\n<h3>2. Handle empty input properly</h3>\n<pre><code class=\"language-java\">BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nString line = br.readLine();\n\nif (line == null || line.isBlank()) {          // null = end of stream, blank = only whitespace\n    System.out.println(\"No input provided\");\n    return;\n}\n\nint[] nums = Arrays.stream(line.trim().split(\"\\\\s+\"))\n                   .mapToInt(Integer::parseInt).toArray();\n\nif (nums.length == 0) {\n    System.out.println(\"Average = 0 (no numbers)\");   // never divide by zero\n} else {\n    System.out.println(\"Average = \" + Arrays.stream(nums).average().getAsDouble());\n}</code></pre>\n\n<h3>3. Identify and report memory leaks</h3>\n<pre><code class=\"language-java\">public class LeakDemo {\n    // The leak: a static list that only ever grows\n    private static final List&lt;byte[]&gt; CACHE = new ArrayList&lt;&gt;();\n\n    public static void main(String[] args) {\n        Runtime rt = Runtime.getRuntime();\n        for (int i = 0; i &lt; 100; i++) {\n            CACHE.add(new byte[1024 * 1024]);              // 1 MB each, never released\n            long usedMB = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);\n            System.out.println(\"Iteration \" + i + \" - used \" + usedMB + \" MB\");\n        }\n    }\n}</code></pre>\n<p>Report: memory keeps climbing and never falls after GC. Fixes: bound the cache\n(<code>LinkedHashMap</code> with <code>removeEldestEntry</code>), use <code>WeakHashMap</code>, deregister listeners,\nand close resources with try-with-resources. Tools: <code>jvisualvm</code>, <code>jmap -histo &lt;pid&gt;</code>,\n<code>java -XX:+HeapDumpOnOutOfMemoryError</code>.</p>\n\n<h3>4. Process collection edge cases</h3>\n<pre><code class=\"language-java\">// Empty collection\nlist.stream().mapToInt(Integer::intValue).average().orElse(0);   // not .getAsDouble()\n\n// Nulls inside the collection\nlist.stream().filter(Objects::nonNull).toList();\n\n// Immutable list - List.of(...) throws on modification\nList&lt;String&gt; safe = new ArrayList&lt;&gt;(List.of(\"a\", \"b\"));\n\n// Modifying while iterating\nlist.removeIf(s -&gt; s.isEmpty());          // instead of removing inside a for-each\n\n// Map lookup that may miss\nint c = map.getOrDefault(key, 0);         // instead of map.get(key) which can be null</code></pre>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; The habit that prevents all four labs:</strong> before writing the happy path, ask\n  \"what if it is empty, null, huge, or already used?\" Write those checks first.\n</div>"
    },
    {
      "title": "Labs 57-60 — Connect Java to MySQL & a Connection Manager",
      "subtitle": "JDBC in the lab",
      "html": "<h3>Setup</h3>\n<ol>\n  <li>Download <code>mysql-connector-j-x.x.x.jar</code>.</li>\n  <li>Compile and run with it on the classpath:\n      <code>javac -cp .:mysql-connector-j.jar App.java</code> then\n      <code>java -cp .:mysql-connector-j.jar App</code> (Windows uses <code>;</code> instead of <code>:</code>).</li>\n  <li>Create the schema first in MySQL Workbench or the CLI.</li>\n</ol>\n\n<pre><code class=\"language-sql\">CREATE DATABASE school;\nUSE school;\nCREATE TABLE Students (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(50) NOT NULL,\n    gpa DECIMAL(3,2)\n);\nINSERT INTO Students(name, gpa) VALUES ('Aman', 8.4), ('Riya', 9.1);</code></pre>\n\n<h3>Lab 57-60 (1) — Connect and display all records</h3>\n<pre><code class=\"language-java\">import java.sql.*;\n\npublic class ShowStudents {\n    public static void main(String[] args) {\n        String url  = \"jdbc:mysql://localhost:3306/school?useSSL=false&amp;serverTimezone=UTC\";\n        String user = \"root\";\n        String pass = System.getenv(\"DB_PASSWORD\");\n\n        String sql = \"SELECT id, name, gpa FROM Students ORDER BY id\";\n\n        try (Connection conn = DriverManager.getConnection(url, user, pass);\n             PreparedStatement ps = conn.prepareStatement(sql);\n             ResultSet rs = ps.executeQuery()) {\n\n            System.out.printf(\"%-5s %-20s %s%n\", \"ID\", \"NAME\", \"GPA\");\n            while (rs.next()) {\n                System.out.printf(\"%-5d %-20s %.2f%n\",\n                        rs.getInt(\"id\"), rs.getString(\"name\"), rs.getDouble(\"gpa\"));\n            }\n        } catch (SQLException e) {\n            System.err.println(\"Database error: \" + e.getMessage());\n        }\n    }\n}</code></pre>\n\n<h3>Lab 57-60 (2) — A simple connection manager for several databases</h3>\n<pre><code class=\"language-java\">import java.sql.*;\nimport java.util.*;\n\npublic class ConnectionManager {\n\n    private record Config(String url, String user, String pass) { }\n\n    private static final Map&lt;String, Config&gt; CONFIGS = new HashMap&lt;&gt;();\n    static {\n        CONFIGS.put(\"school\",  new Config(\"jdbc:mysql://localhost:3306/school\",  \"root\", env(\"DB_PASSWORD\")));\n        CONFIGS.put(\"library\", new Config(\"jdbc:mysql://localhost:3306/library\", \"root\", env(\"DB_PASSWORD\")));\n    }\n\n    private static String env(String k) { return System.getenv().getOrDefault(k, \"\"); }\n\n    public static Connection get(String name) throws SQLException {\n        Config c = CONFIGS.get(name);\n        if (c == null) throw new IllegalArgumentException(\"Unknown database: \" + name);\n        return DriverManager.getConnection(c.url(), c.user(), c.pass());\n    }\n\n    public static void main(String[] args) throws SQLException {\n        try (Connection school = get(\"school\");\n             Connection library = get(\"library\")) {\n            System.out.println(\"school  -> \" + school.getMetaData().getDatabaseProductVersion());\n            System.out.println(\"library -> \" + library.getCatalog());\n        }\n    }\n}</code></pre>\n\n<h3>Errors you will hit, and what they mean</h3>\n<table>\n  <thead><tr><th>Message</th><th>Cause</th></tr></thead>\n  <tbody>\n    <tr><td><code>No suitable driver found</code></td><td>the connector jar is not on the classpath</td></tr>\n    <tr><td><code>Access denied for user</code></td><td>wrong username or password</td></tr>\n    <tr><td><code>Unknown database 'school'</code></td><td>the schema was never created</td></tr>\n    <tr><td><code>Communications link failure</code></td><td>MySQL is not running, or the port is wrong</td></tr>\n    <tr><td><code>The server time zone value is unrecognized</code></td><td>add <code>serverTimezone=UTC</code> to the URL</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-key\">\n  <strong>&#128273; Marks are given for:</strong> try-with-resources, <code>PreparedStatement</code>,\n  credentials read from the environment rather than hardcoded, and a real <code>catch (SQLException)</code>\n  that prints something useful.\n</div>"
    }
  ]
};

const JAVA_ABSTRACTIONS_MCQ_BANK = [
  {
    "unitName": "ST-1 Quiz 1 — Java Core, Types & Operators",
    "examGroup": "st1",
    "questions": [
      {
        "id": 8001,
        "topic": "JVM",
        "question": "Which component actually executes Java bytecode?",
        "options": {
          "a": "javac",
          "b": "JVM",
          "c": "JRE",
          "d": "JDK"
        },
        "correct": "b",
        "explanation": "javac compiles source to bytecode; the JVM executes it. JRE and JDK are bundles that contain the JVM."
      },
      {
        "id": 8002,
        "topic": "main method",
        "question": "Removing 'static' from main causes:",
        "options": {
          "a": "A compile-time error",
          "b": "A runtime NoSuchMethodError",
          "c": "No effect at all",
          "d": "A warning only"
        },
        "correct": "b",
        "explanation": "The code compiles fine, but the JVM cannot invoke main without an object, so it fails at runtime."
      },
      {
        "id": 8003,
        "topic": "Data types",
        "question": "What is the default value of an uninitialised instance field of type double?",
        "options": {
          "a": "null",
          "b": "0",
          "c": "0.0",
          "d": "undefined"
        },
        "correct": "c",
        "explanation": "Numeric fields default to zero; for double that is 0.0. Local variables have no default at all."
      },
      {
        "id": 8004,
        "topic": "Literals",
        "question": "Which statement compiles without error?",
        "options": {
          "a": "float f = 3.14;",
          "b": "long l = 3000000000;",
          "c": "float f = 3.14f;",
          "d": "int i = 3.14;"
        },
        "correct": "c",
        "explanation": "Decimal literals are double by default, so a float needs the f suffix."
      },
      {
        "id": 8005,
        "topic": "Type conversion",
        "question": "What does (int) -9.9 evaluate to?",
        "options": {
          "a": "-10",
          "b": "-9",
          "c": "9",
          "d": "10"
        },
        "correct": "b",
        "explanation": "Casting a floating point value to int truncates towards zero; it does not round."
      },
      {
        "id": 8006,
        "topic": "Operators",
        "question": "byte b = 10; b = b + 5; produces:",
        "options": {
          "a": "b = 15",
          "b": "A compile error",
          "c": "b = 10",
          "d": "A runtime exception"
        },
        "correct": "b",
        "explanation": "b + 5 is promoted to int, and int cannot be assigned to byte without a cast. b += 5 works because += has an implicit cast."
      },
      {
        "id": 8007,
        "topic": "Strings",
        "question": "Which comparison reliably tests that two Strings have the same characters?",
        "options": {
          "a": "s1 == s2",
          "b": "s1.equals(s2)",
          "c": "s1.compare(s2)",
          "d": "s1 = s2"
        },
        "correct": "b",
        "explanation": "== compares references. equals() compares contents."
      },
      {
        "id": 8008,
        "topic": "Overflow",
        "question": "Which method throws an exception instead of silently wrapping around?",
        "options": {
          "a": "Math.abs()",
          "b": "Math.addExact()",
          "c": "Math.max()",
          "d": "Math.floor()"
        },
        "correct": "b",
        "explanation": "Math.addExact throws ArithmeticException when the result does not fit in an int."
      },
      {
        "id": 8009,
        "topic": "Bit manipulation",
        "question": "Which expression tests whether n is a power of two?",
        "options": {
          "a": "n % 2 == 0",
          "b": "n > 0 && (n & (n - 1)) == 0",
          "c": "(n | 1) == n",
          "d": "n >> 1 == 0"
        },
        "correct": "b",
        "explanation": "A power of two has exactly one set bit, so n & (n-1) clears it and leaves zero."
      },
      {
        "id": 8010,
        "topic": "Modular arithmetic",
        "question": "In Java, what is the value of -7 % 3?",
        "options": {
          "a": "2",
          "b": "-1",
          "c": "1",
          "d": "-2"
        },
        "correct": "b",
        "explanation": "Java's % keeps the sign of the dividend. Use Math.floorMod(-7, 3) to get 2."
      },
      {
        "id": 8011,
        "topic": "switch",
        "question": "Which type cannot be used in a switch statement?",
        "options": {
          "a": "String",
          "b": "char",
          "c": "double",
          "d": "enum"
        },
        "correct": "c",
        "explanation": "switch supports byte, short, char, int, their wrappers, String and enum. Not double, float, long or boolean."
      },
      {
        "id": 8012,
        "topic": "Loops",
        "question": "Which loop is guaranteed to execute at least once?",
        "options": {
          "a": "for",
          "b": "while",
          "c": "do-while",
          "d": "enhanced for"
        },
        "correct": "c",
        "explanation": "do-while checks its condition after the body runs."
      },
      {
        "id": 8013,
        "topic": "Wrappers",
        "question": "Integer a = 1000, b = 1000; what does a == b print?",
        "options": {
          "a": "true",
          "b": "false",
          "c": "Compile error",
          "d": "Depends on the JVM version"
        },
        "correct": "b",
        "explanation": "The Integer cache only covers -128..127, so 1000 produces two distinct objects."
      },
      {
        "id": 8014,
        "topic": "Pass by value",
        "question": "Java passes arguments:",
        "options": {
          "a": "By reference for objects",
          "b": "Always by value",
          "c": "By reference for arrays only",
          "d": "By pointer"
        },
        "correct": "b",
        "explanation": "Java is always pass-by-value. For objects the value copied is the reference itself."
      },
      {
        "id": 8015,
        "topic": "Arrays",
        "question": "Which of these is correct for finding the number of elements?",
        "options": {
          "a": "array.size()",
          "b": "array.length()",
          "c": "array.length",
          "d": "array.count"
        },
        "correct": "c",
        "explanation": "Arrays expose length as a field, String uses length(), and collections use size()."
      }
    ]
  },
  {
    "unitName": "ST-1 Quiz 2 — OOP, Collections & Generics",
    "examGroup": "st1",
    "questions": [
      {
        "id": 8031,
        "topic": "OOP",
        "question": "Which pillar is achieved by making fields private and exposing getters/setters?",
        "options": {
          "a": "Inheritance",
          "b": "Encapsulation",
          "c": "Polymorphism",
          "d": "Abstraction"
        },
        "correct": "b",
        "explanation": "Encapsulation bundles data with the methods that control access to it."
      },
      {
        "id": 8032,
        "topic": "Polymorphism",
        "question": "Method overloading is resolved:",
        "options": {
          "a": "At runtime by the JVM",
          "b": "At compile time by the compiler",
          "c": "By the class loader",
          "d": "By the garbage collector"
        },
        "correct": "b",
        "explanation": "Overloading uses static binding decided from the declared parameter types; overriding is dynamic."
      },
      {
        "id": 8033,
        "topic": "Overriding",
        "question": "Vehicle v = new Car(); v.start(); Which start() runs, assuming Car overrides it?",
        "options": {
          "a": "Vehicle's",
          "b": "Car's",
          "c": "Neither, it is a compile error",
          "d": "Both, in order"
        },
        "correct": "b",
        "explanation": "Dynamic dispatch selects the implementation based on the actual object type at runtime."
      },
      {
        "id": 8034,
        "topic": "Interfaces",
        "question": "Since Java 8, an interface may contain:",
        "options": {
          "a": "Only abstract methods",
          "b": "default and static methods too",
          "c": "Constructors",
          "d": "Instance fields"
        },
        "correct": "b",
        "explanation": "Java 8 added default and static methods; Java 9 added private methods. Fields stay public static final."
      },
      {
        "id": 8035,
        "topic": "Collections",
        "question": "Which interface does Map extend?",
        "options": {
          "a": "Collection",
          "b": "Iterable",
          "c": "List",
          "d": "None of these"
        },
        "correct": "d",
        "explanation": "Map is a separate branch of the framework because it stores key-value pairs, not single elements."
      },
      {
        "id": 8036,
        "topic": "ArrayList",
        "question": "Average time complexity of get(index) on an ArrayList:",
        "options": {
          "a": "O(1)",
          "b": "O(log n)",
          "c": "O(n)",
          "d": "O(n log n)"
        },
        "correct": "a",
        "explanation": "It is backed by an array, so index access is direct."
      },
      {
        "id": 8037,
        "topic": "LinkedList",
        "question": "Compared with ArrayList, LinkedList is better at:",
        "options": {
          "a": "Random access by index",
          "b": "Insertion and deletion at the ends",
          "c": "Memory efficiency",
          "d": "Binary search"
        },
        "correct": "b",
        "explanation": "A doubly linked list adds and removes at either end in O(1), but needs O(n) to reach an index."
      },
      {
        "id": 8038,
        "topic": "HashMap",
        "question": "What happens when a HashMap bucket exceeds the treeify threshold (8 entries)?",
        "options": {
          "a": "The map throws an exception",
          "b": "The linked list becomes a balanced tree",
          "c": "The map doubles instantly",
          "d": "Older entries are dropped"
        },
        "correct": "b",
        "explanation": "Since Java 8 long collision chains convert to a tree, improving worst case from O(n) to O(log n)."
      },
      {
        "id": 8039,
        "topic": "HashMap",
        "question": "Default load factor of HashMap:",
        "options": {
          "a": "0.5",
          "b": "0.75",
          "c": "1.0",
          "d": "0.9"
        },
        "correct": "b",
        "explanation": "When size exceeds capacity x 0.75, the table doubles and entries are rehashed."
      },
      {
        "id": 8040,
        "topic": "TreeSet",
        "question": "Which collection keeps its elements sorted and rejects duplicates?",
        "options": {
          "a": "HashSet",
          "b": "LinkedHashSet",
          "c": "TreeSet",
          "d": "ArrayList"
        },
        "correct": "c",
        "explanation": "TreeSet is backed by a Red-Black tree, giving O(log n) operations in sorted order."
      },
      {
        "id": 8041,
        "topic": "PriorityQueue",
        "question": "By default, PriorityQueue.poll() returns:",
        "options": {
          "a": "The most recently added element",
          "b": "The smallest element",
          "c": "The largest element",
          "d": "A random element"
        },
        "correct": "b",
        "explanation": "It is a min-heap unless you supply a reversing comparator."
      },
      {
        "id": 8042,
        "topic": "equals/hashCode",
        "question": "If two objects are equal according to equals(), their hashCodes:",
        "options": {
          "a": "Must be different",
          "b": "Must be the same",
          "c": "May be anything",
          "d": "Must be zero"
        },
        "correct": "b",
        "explanation": "Breaking this contract makes objects unfindable inside HashMap and HashSet."
      },
      {
        "id": 8043,
        "topic": "Generics",
        "question": "Generics primarily move errors from:",
        "options": {
          "a": "Runtime to compile time",
          "b": "Compile time to runtime",
          "c": "The JVM to the OS",
          "d": "Heap to stack"
        },
        "correct": "a",
        "explanation": "The compiler rejects wrong types, so no ClassCastException occurs at runtime."
      },
      {
        "id": 8044,
        "topic": "Wildcards",
        "question": "In PECS, '? extends T' is used when the collection is a:",
        "options": {
          "a": "Consumer you write into",
          "b": "Producer you read from",
          "c": "Mutable buffer",
          "d": "Thread-safe list"
        },
        "correct": "b",
        "explanation": "Producer Extends, Consumer Super."
      },
      {
        "id": 8045,
        "topic": "Type erasure",
        "question": "Which is illegal because of type erasure?",
        "options": {
          "a": "List<String> list = new ArrayList<>();",
          "b": "new T[10] inside a generic class",
          "c": "class Box<T> { }",
          "d": "<T extends Number> void f(T t)"
        },
        "correct": "b",
        "explanation": "Type parameters do not exist at runtime, so generic arrays and new T() cannot be created."
      }
    ]
  },
  {
    "unitName": "ST-1 Quiz 3 — Exceptions, Files, Streams & JVM",
    "examGroup": "st1",
    "questions": [
      {
        "id": 8061,
        "topic": "Exceptions",
        "question": "Which of these is a checked exception?",
        "options": {
          "a": "NullPointerException",
          "b": "IOException",
          "c": "ArithmeticException",
          "d": "ArrayIndexOutOfBoundsException"
        },
        "correct": "b",
        "explanation": "IOException extends Exception but not RuntimeException, so the compiler forces you to handle it."
      },
      {
        "id": 8062,
        "topic": "Exceptions",
        "question": "The finally block runs:",
        "options": {
          "a": "Only when no exception occurs",
          "b": "Only when an exception occurs",
          "c": "Almost always, even after a return",
          "d": "Never after a return"
        },
        "correct": "c",
        "explanation": "Only System.exit() or JVM death skips finally."
      },
      {
        "id": 8063,
        "topic": "Exceptions",
        "question": "Catching Exception before ArithmeticException causes:",
        "options": {
          "a": "A runtime error",
          "b": "A compile error",
          "c": "Silent failure",
          "d": "Nothing unusual"
        },
        "correct": "b",
        "explanation": "The more specific catch becomes unreachable, which the compiler rejects."
      },
      {
        "id": 8064,
        "topic": "Exceptions",
        "question": "throw vs throws:",
        "options": {
          "a": "Both raise an exception",
          "b": "throw raises one; throws declares one",
          "c": "throws raises one; throw declares one",
          "d": "They are synonyms"
        },
        "correct": "b",
        "explanation": "throw is a statement inside a method; throws is part of the method signature."
      },
      {
        "id": 8065,
        "topic": "try-with-resources",
        "question": "A resource used in try-with-resources must implement:",
        "options": {
          "a": "Serializable",
          "b": "AutoCloseable",
          "c": "Runnable",
          "d": "Cloneable"
        },
        "correct": "b",
        "explanation": "close() is called automatically for anything implementing AutoCloseable."
      },
      {
        "id": 8066,
        "topic": "Serialization",
        "question": "A field marked transient is:",
        "options": {
          "a": "Saved as null",
          "b": "Skipped during serialization",
          "c": "Encrypted",
          "d": "Made static"
        },
        "correct": "b",
        "explanation": "It is excluded from the byte stream and comes back as null or zero."
      },
      {
        "id": 8067,
        "topic": "Serialization",
        "question": "Which interface must a class implement to be serialized?",
        "options": {
          "a": "Externalizable only",
          "b": "Serializable",
          "c": "Comparable",
          "d": "Cloneable"
        },
        "correct": "b",
        "explanation": "Serializable is a marker interface with no methods."
      },
      {
        "id": 8068,
        "topic": "Streams",
        "question": "A stream pipeline with no terminal operation:",
        "options": {
          "a": "Throws an exception",
          "b": "Executes immediately",
          "c": "Does nothing at all",
          "d": "Runs in parallel"
        },
        "correct": "c",
        "explanation": "Intermediate operations are lazy; only a terminal operation triggers execution."
      },
      {
        "id": 8069,
        "topic": "Streams",
        "question": "Which operation is terminal?",
        "options": {
          "a": "filter",
          "b": "map",
          "c": "sorted",
          "d": "collect"
        },
        "correct": "d",
        "explanation": "collect, forEach, count, reduce and findFirst are terminal; the others return a Stream."
      },
      {
        "id": 8070,
        "topic": "Streams",
        "question": "Which collector groups elements into a Map by a classifier function?",
        "options": {
          "a": "Collectors.toList",
          "b": "Collectors.groupingBy",
          "c": "Collectors.joining",
          "d": "Collectors.counting"
        },
        "correct": "b",
        "explanation": "groupingBy produces Map<K, List<T>>; add a downstream collector to summarise each group."
      },
      {
        "id": 8071,
        "topic": "Lambdas",
        "question": "A functional interface must have:",
        "options": {
          "a": "Exactly one abstract method",
          "b": "At least two abstract methods",
          "c": "No methods",
          "d": "Only static methods"
        },
        "correct": "a",
        "explanation": "The single abstract method is what the lambda implements. @FunctionalInterface makes the compiler enforce it."
      },
      {
        "id": 8072,
        "topic": "Functional interfaces",
        "question": "Which interface takes a value and returns a boolean?",
        "options": {
          "a": "Function",
          "b": "Supplier",
          "c": "Predicate",
          "d": "Consumer"
        },
        "correct": "c",
        "explanation": "Predicate<T>.test(T) returns boolean and drives filter()."
      },
      {
        "id": 8073,
        "topic": "Optional",
        "question": "The safest way to read an Optional that may be empty:",
        "options": {
          "a": "get()",
          "b": "orElse(default)",
          "c": "toString()",
          "d": "hashCode()"
        },
        "correct": "b",
        "explanation": "get() on an empty Optional throws NoSuchElementException."
      },
      {
        "id": 8074,
        "topic": "JVM memory",
        "question": "Objects created with new are stored in the:",
        "options": {
          "a": "Stack",
          "b": "Heap",
          "c": "PC register",
          "d": "Metaspace"
        },
        "correct": "b",
        "explanation": "The heap holds all objects and is shared by every thread; the stack holds frames and references."
      },
      {
        "id": 8075,
        "topic": "Garbage collection",
        "question": "An object becomes eligible for garbage collection when:",
        "options": {
          "a": "System.gc() is called",
          "b": "No live reference points to it",
          "c": "It goes out of scope syntactically",
          "d": "Its finalize method runs"
        },
        "correct": "b",
        "explanation": "Reachability decides. System.gc() is only a suggestion to the JVM."
      },
      {
        "id": 8076,
        "topic": "Fast I/O",
        "question": "Why is BufferedReader faster than Scanner for large input?",
        "options": {
          "a": "It uses multiple threads",
          "b": "It reads large blocks and does no regex parsing",
          "c": "It compresses input",
          "d": "It skips validation"
        },
        "correct": "b",
        "explanation": "Scanner parses with regular expressions and reads small chunks, which dominates the runtime for big inputs."
      }
    ]
  },
  {
    "unitName": "ST-2 Quiz 1 — SQL, Joins & Normalization",
    "examGroup": "st2",
    "questions": [
      {
        "id": 8101,
        "topic": "SQL commands",
        "question": "TRUNCATE belongs to which category?",
        "options": {
          "a": "DML",
          "b": "DDL",
          "c": "DCL",
          "d": "TCL"
        },
        "correct": "b",
        "explanation": "TRUNCATE changes structure-level storage, auto-commits and cannot be rolled back."
      },
      {
        "id": 8102,
        "topic": "SQL commands",
        "question": "Which command can be rolled back?",
        "options": {
          "a": "DROP",
          "b": "TRUNCATE",
          "c": "DELETE",
          "d": "CREATE"
        },
        "correct": "c",
        "explanation": "DELETE is DML and participates in the transaction; DDL statements auto-commit."
      },
      {
        "id": 8103,
        "topic": "Joins",
        "question": "Which join returns all rows from the left table even without a match?",
        "options": {
          "a": "INNER JOIN",
          "b": "LEFT JOIN",
          "c": "CROSS JOIN",
          "d": "SELF JOIN"
        },
        "correct": "b",
        "explanation": "Unmatched columns from the right table come back as NULL."
      },
      {
        "id": 8104,
        "topic": "Joins",
        "question": "A CROSS JOIN of a 4-row and a 5-row table returns:",
        "options": {
          "a": "9 rows",
          "b": "20 rows",
          "c": "5 rows",
          "d": "0 rows"
        },
        "correct": "b",
        "explanation": "A Cartesian product produces m x n rows."
      },
      {
        "id": 8105,
        "topic": "WHERE vs HAVING",
        "question": "Which clause filters groups after aggregation?",
        "options": {
          "a": "WHERE",
          "b": "HAVING",
          "c": "ORDER BY",
          "d": "GROUP BY"
        },
        "correct": "b",
        "explanation": "WHERE filters rows before grouping and cannot contain an aggregate function."
      },
      {
        "id": 8106,
        "topic": "Aggregates",
        "question": "Which aggregate counts rows including those with NULL column values?",
        "options": {
          "a": "COUNT(column)",
          "b": "COUNT(*)",
          "c": "SUM(column)",
          "d": "AVG(column)"
        },
        "correct": "b",
        "explanation": "COUNT(*) counts rows; COUNT(column) skips NULLs."
      },
      {
        "id": 8107,
        "topic": "NULL",
        "question": "Which condition correctly finds rows with no email?",
        "options": {
          "a": "WHERE email = NULL",
          "b": "WHERE email IS NULL",
          "c": "WHERE email == NULL",
          "d": "WHERE email = ''"
        },
        "correct": "b",
        "explanation": "NULL is not equal to anything, including itself, so IS NULL is required."
      },
      {
        "id": 8108,
        "topic": "Execution order",
        "question": "Which clause is evaluated first?",
        "options": {
          "a": "SELECT",
          "b": "FROM",
          "c": "ORDER BY",
          "d": "HAVING"
        },
        "correct": "b",
        "explanation": "The logical order is FROM, JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT."
      },
      {
        "id": 8109,
        "topic": "Constraints",
        "question": "How many PRIMARY KEY constraints may a table have?",
        "options": {
          "a": "Exactly one",
          "b": "One per column",
          "c": "Unlimited",
          "d": "At most two"
        },
        "correct": "a",
        "explanation": "One primary key per table, though it may span several columns."
      },
      {
        "id": 8110,
        "topic": "Constraints",
        "question": "Which constraint allows NULL values?",
        "options": {
          "a": "PRIMARY KEY",
          "b": "NOT NULL",
          "c": "UNIQUE",
          "d": "None of these"
        },
        "correct": "c",
        "explanation": "UNIQUE permits a NULL (typically one) because NULLs are not considered equal."
      },
      {
        "id": 8111,
        "topic": "Indexing",
        "question": "The main disadvantage of adding indexes is:",
        "options": {
          "a": "Slower SELECT queries",
          "b": "Slower INSERT/UPDATE/DELETE and extra storage",
          "c": "Loss of constraints",
          "d": "Data corruption"
        },
        "correct": "b",
        "explanation": "Every write must maintain the index as well as the table."
      },
      {
        "id": 8112,
        "topic": "Indexing",
        "question": "Why does WHERE YEAR(joined) = 2024 ignore an index on joined?",
        "options": {
          "a": "YEAR is not supported",
          "b": "The column is wrapped in a function",
          "c": "Dates cannot be indexed",
          "d": "It needs a composite index"
        },
        "correct": "b",
        "explanation": "Applying a function to the column prevents the engine from using the sorted index values."
      },
      {
        "id": 8113,
        "topic": "Normalization",
        "question": "Removing partial dependency on a composite key achieves:",
        "options": {
          "a": "1NF",
          "b": "2NF",
          "c": "3NF",
          "d": "BCNF"
        },
        "correct": "b",
        "explanation": "2NF requires every non-key attribute to depend on the whole key."
      },
      {
        "id": 8114,
        "topic": "Normalization",
        "question": "A non-key column depending on another non-key column violates:",
        "options": {
          "a": "1NF",
          "b": "2NF",
          "c": "3NF",
          "d": "BCNF"
        },
        "correct": "c",
        "explanation": "That is a transitive dependency, which 3NF eliminates."
      },
      {
        "id": 8115,
        "topic": "Normalization",
        "question": "Which anomaly means deleting the last student erases the department?",
        "options": {
          "a": "Insert anomaly",
          "b": "Update anomaly",
          "c": "Delete anomaly",
          "d": "Join anomaly"
        },
        "correct": "c",
        "explanation": "The department fact only existed inside student rows, so it disappears with them."
      }
    ]
  },
  {
    "unitName": "ST-2 Quiz 2 — Transactions, JDBC & DAO",
    "examGroup": "st2",
    "questions": [
      {
        "id": 8131,
        "topic": "ACID",
        "question": "Which ACID property guarantees all-or-nothing execution?",
        "options": {
          "a": "Atomicity",
          "b": "Consistency",
          "c": "Isolation",
          "d": "Durability"
        },
        "correct": "a",
        "explanation": "Either every statement in the transaction takes effect, or none does."
      },
      {
        "id": 8132,
        "topic": "ACID",
        "question": "Reading data another transaction has not committed is called a:",
        "options": {
          "a": "Phantom read",
          "b": "Dirty read",
          "c": "Non-repeatable read",
          "d": "Lost update"
        },
        "correct": "b",
        "explanation": "Only READ UNCOMMITTED allows dirty reads."
      },
      {
        "id": 8133,
        "topic": "Isolation",
        "question": "MySQL InnoDB's default isolation level is:",
        "options": {
          "a": "READ UNCOMMITTED",
          "b": "READ COMMITTED",
          "c": "REPEATABLE READ",
          "d": "SERIALIZABLE"
        },
        "correct": "c",
        "explanation": "REPEATABLE READ prevents dirty and non-repeatable reads, and gap locking blocks most phantoms."
      },
      {
        "id": 8134,
        "topic": "JDBC",
        "question": "Which JDBC driver type is pure Java and used today?",
        "options": {
          "a": "Type 1",
          "b": "Type 2",
          "c": "Type 3",
          "d": "Type 4"
        },
        "correct": "d",
        "explanation": "The Type 4 thin driver talks the database protocol directly with no native code."
      },
      {
        "id": 8135,
        "topic": "JDBC",
        "question": "Which method is used for a SELECT statement?",
        "options": {
          "a": "executeUpdate()",
          "b": "executeQuery()",
          "c": "execute()",
          "d": "run()"
        },
        "correct": "b",
        "explanation": "executeQuery returns a ResultSet; executeUpdate returns the affected row count."
      },
      {
        "id": 8136,
        "topic": "JDBC",
        "question": "A freshly returned ResultSet cursor is positioned:",
        "options": {
          "a": "On the first row",
          "b": "Before the first row",
          "c": "On the last row",
          "d": "After the last row"
        },
        "correct": "b",
        "explanation": "You must call next() once before reading any column."
      },
      {
        "id": 8137,
        "topic": "JDBC",
        "question": "ResultSet column indexes start at:",
        "options": {
          "a": "0",
          "b": "1",
          "c": "-1",
          "d": "The column count"
        },
        "correct": "b",
        "explanation": "Unlike Java arrays, JDBC indexes are 1-based."
      },
      {
        "id": 8138,
        "topic": "PreparedStatement",
        "question": "PreparedStatement prevents SQL injection because:",
        "options": {
          "a": "It escapes quotes in the string",
          "b": "The SQL is compiled before values are supplied",
          "c": "It encrypts input",
          "d": "It rejects long input"
        },
        "correct": "b",
        "explanation": "Parameters are sent separately from the statement, so they can never alter its structure."
      },
      {
        "id": 8139,
        "topic": "PreparedStatement",
        "question": "Which cannot be replaced by a ? placeholder?",
        "options": {
          "a": "A WHERE value",
          "b": "An INSERT value",
          "c": "A table name",
          "d": "A date value"
        },
        "correct": "c",
        "explanation": "Placeholders stand for values only. Dynamic identifiers must be whitelisted in Java."
      },
      {
        "id": 8140,
        "topic": "Transactions in JDBC",
        "question": "To run several statements as one transaction you must first call:",
        "options": {
          "a": "conn.commit()",
          "b": "conn.setAutoCommit(false)",
          "c": "conn.rollback()",
          "d": "conn.close()"
        },
        "correct": "b",
        "explanation": "A JDBC connection commits every statement automatically until you turn that off."
      },
      {
        "id": 8141,
        "topic": "DAO",
        "question": "The main purpose of the DAO pattern is to:",
        "options": {
          "a": "Render user interfaces",
          "b": "Separate data access from business logic",
          "c": "Manage garbage collection",
          "d": "Encrypt passwords"
        },
        "correct": "b",
        "explanation": "It isolates persistence details so business code and storage can change independently."
      },
      {
        "id": 8142,
        "topic": "DAO",
        "question": "In a layered architecture, business rules belong in the:",
        "options": {
          "a": "DAO layer",
          "b": "Service layer",
          "c": "Presentation layer",
          "d": "Database"
        },
        "correct": "b",
        "explanation": "The DAO holds only SQL; the service holds validation and workflow."
      },
      {
        "id": 8143,
        "topic": "DAO",
        "question": "Which benefit does programming to a DAO interface give?",
        "options": {
          "a": "Faster SQL",
          "b": "Testability with a fake implementation",
          "c": "Automatic indexing",
          "d": "Smaller database"
        },
        "correct": "b",
        "explanation": "You can inject an in-memory DAO and test the service without a database."
      },
      {
        "id": 8144,
        "topic": "CRUD",
        "question": "Which SQL statement corresponds to the U in CRUD?",
        "options": {
          "a": "INSERT",
          "b": "SELECT",
          "c": "UPDATE",
          "d": "DELETE"
        },
        "correct": "c",
        "explanation": "Create/Read/Update/Delete map to INSERT/SELECT/UPDATE/DELETE."
      },
      {
        "id": 8145,
        "topic": "JDBC errors",
        "question": "'No suitable driver found' usually means:",
        "options": {
          "a": "The SQL is invalid",
          "b": "The connector jar is missing from the classpath",
          "c": "The table does not exist",
          "d": "The password is wrong"
        },
        "correct": "b",
        "explanation": "DriverManager could not find any driver able to handle the given URL."
      }
    ]
  },
  {
    "unitName": "End Term Quiz — Multithreading & Concurrency",
    "examGroup": "endTerm",
    "questions": [
      {
        "id": 8201,
        "topic": "Threads",
        "question": "What is the difference between start() and run()?",
        "options": {
          "a": "They are identical",
          "b": "start() creates a new thread; run() executes on the current thread",
          "c": "run() creates a new thread",
          "d": "start() is deprecated"
        },
        "correct": "b",
        "explanation": "Calling run() directly is just an ordinary method call, with no concurrency."
      },
      {
        "id": 8202,
        "topic": "Threads",
        "question": "Calling start() twice on the same Thread object:",
        "options": {
          "a": "Runs it twice",
          "b": "Throws IllegalThreadStateException",
          "c": "Is ignored",
          "d": "Creates two threads"
        },
        "correct": "b",
        "explanation": "A thread cannot be restarted once it has begun."
      },
      {
        "id": 8203,
        "topic": "Thread lifecycle",
        "question": "A thread waiting to enter a synchronized block is in state:",
        "options": {
          "a": "WAITING",
          "b": "BLOCKED",
          "c": "TIMED_WAITING",
          "d": "NEW"
        },
        "correct": "b",
        "explanation": "BLOCKED specifically means waiting for a monitor lock."
      },
      {
        "id": 8204,
        "topic": "sleep vs wait",
        "question": "Which one releases the lock it holds?",
        "options": {
          "a": "Thread.sleep()",
          "b": "Object.wait()",
          "c": "Both",
          "d": "Neither"
        },
        "correct": "b",
        "explanation": "sleep keeps the lock; wait releases it until notify or a timeout."
      },
      {
        "id": 8205,
        "topic": "wait/notify",
        "question": "wait() must be called:",
        "options": {
          "a": "From a static method",
          "b": "Inside a synchronized block",
          "c": "Only on a Thread object",
          "d": "After start()"
        },
        "correct": "b",
        "explanation": "Otherwise the JVM throws IllegalMonitorStateException."
      },
      {
        "id": 8206,
        "topic": "Synchronization",
        "question": "Which keyword ensures only one thread executes a block at a time?",
        "options": {
          "a": "volatile",
          "b": "synchronized",
          "c": "transient",
          "d": "abstract"
        },
        "correct": "b",
        "explanation": "synchronized acquires the object's intrinsic monitor lock."
      },
      {
        "id": 8207,
        "topic": "volatile",
        "question": "volatile guarantees:",
        "options": {
          "a": "Atomicity",
          "b": "Visibility",
          "c": "Both",
          "d": "Neither"
        },
        "correct": "b",
        "explanation": "Reads and writes go to main memory, but count++ is still three separate operations."
      },
      {
        "id": 8208,
        "topic": "Race condition",
        "question": "count++ is unsafe across threads because it is:",
        "options": {
          "a": "A single CPU instruction",
          "b": "Three operations: read, modify, write",
          "c": "Synchronized by default",
          "d": "Compiled away"
        },
        "correct": "b",
        "explanation": "Two threads can interleave those steps and lose an update."
      },
      {
        "id": 8209,
        "topic": "Atomics",
        "question": "Which class provides lock-free thread-safe increment?",
        "options": {
          "a": "Integer",
          "b": "AtomicInteger",
          "c": "BigInteger",
          "d": "Number"
        },
        "correct": "b",
        "explanation": "AtomicInteger uses a compare-and-swap CPU instruction."
      },
      {
        "id": 8210,
        "topic": "Runnable",
        "question": "Why is implementing Runnable preferred over extending Thread?",
        "options": {
          "a": "It is faster",
          "b": "It keeps the single inheritance slot free and fits thread pools",
          "c": "Thread is deprecated",
          "d": "Runnable returns a value"
        },
        "correct": "b",
        "explanation": "Separating the task from the worker is better design and works with ExecutorService."
      },
      {
        "id": 8211,
        "topic": "Callable",
        "question": "Unlike Runnable, Callable can:",
        "options": {
          "a": "Be started with start()",
          "b": "Return a value and throw checked exceptions",
          "c": "Run without a thread",
          "d": "Be synchronized"
        },
        "correct": "b",
        "explanation": "call() returns V and may throw; submit() gives you a Future for the result."
      },
      {
        "id": 8212,
        "topic": "Deadlock",
        "question": "Which condition, if broken, prevents deadlock?",
        "options": {
          "a": "Mutual exclusion",
          "b": "Circular wait",
          "c": "Hold and wait",
          "d": "Any one of the four Coffman conditions"
        },
        "correct": "d",
        "explanation": "All four must hold at once, so breaking any of them is enough. Global lock ordering breaks circular wait."
      },
      {
        "id": 8213,
        "topic": "Livelock",
        "question": "In a livelock, threads are:",
        "options": {
          "a": "Blocked and idle",
          "b": "Active but making no progress",
          "c": "Terminated",
          "d": "Waiting on I/O"
        },
        "correct": "b",
        "explanation": "They keep responding to each other, so the CPU is busy but nothing completes."
      },
      {
        "id": 8214,
        "topic": "Starvation",
        "question": "A thread that never obtains a lock because others keep taking it suffers:",
        "options": {
          "a": "Deadlock",
          "b": "Livelock",
          "c": "Starvation",
          "d": "A race condition"
        },
        "correct": "c",
        "explanation": "A fair lock, new ReentrantLock(true), grants access in arrival order."
      },
      {
        "id": 8215,
        "topic": "Concurrent collections",
        "question": "Which map should replace HashMap in multithreaded code?",
        "options": {
          "a": "Hashtable",
          "b": "ConcurrentHashMap",
          "c": "TreeMap",
          "d": "LinkedHashMap"
        },
        "correct": "b",
        "explanation": "It locks only the affected bucket instead of the whole map, giving far better throughput."
      },
      {
        "id": 8216,
        "topic": "ExecutorService",
        "question": "Forgetting to call shutdown() on a thread pool causes:",
        "options": {
          "a": "A memory leak only",
          "b": "The JVM to keep running",
          "c": "An exception",
          "d": "Tasks to be skipped"
        },
        "correct": "b",
        "explanation": "Non-daemon pool threads stay alive, so the program never exits."
      },
      {
        "id": 8217,
        "topic": "ReentrantLock",
        "question": "unlock() should always be placed in:",
        "options": {
          "a": "The try block",
          "b": "A finally block",
          "c": "A catch block",
          "d": "A static initialiser"
        },
        "correct": "b",
        "explanation": "Otherwise an exception inside the critical section leaks the lock forever."
      },
      {
        "id": 8218,
        "topic": "Daemon threads",
        "question": "The JVM exits when:",
        "options": {
          "a": "All threads finish",
          "b": "All non-daemon (user) threads finish",
          "c": "The main method returns",
          "d": "The first thread finishes"
        },
        "correct": "b",
        "explanation": "Daemon threads are abandoned when only they remain."
      }
    ]
  }
];
