// Programming Abstractions using Java (24CSE0314)
// Official Course Content generated from CHO Document

const JAVA_ABSTRACTIONS_STUDY_DATA = {
  "st1": {
    "unitName": "ST-1 \u2014 Java Syntax, Collections, Streams & JVM",
    "topics": [
      {
        "title": "Java Syntax, Types & Modular Arithmetic",
        "content": "\n<h3>1. Primitive vs Reference Types</h3>\n<p>Java distinguishes between primitive types (stored on the stack with direct value memory) and reference types (stored on the heap, referencing objects).</p>\n\n<table>\n  <thead>\n    <tr><th>Type</th><th>Size (bits)</th><th>Default Value</th><th>Memory Location</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>byte</code></td><td>8</td><td>0</td><td>Stack</td></tr>\n    <tr><td><code>int</code></td><td>32</td><td>0</td><td>Stack</td></tr>\n    <tr><td><code>double</code></td><td>64</td><td>0.0</td><td>Stack</td></tr>\n    <tr><td><code>Reference (Object)</code></td><td>32/64</td><td>null</td><td>Heap (reference on Stack)</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-key\">\n  <strong>\ud83d\udd11 Integer Overflow Safeguards:</strong> In competitive/high-performance Java, adding two large numbers can silently overflow. Use <code>Math.addExact(a, b)</code> to throw an <code>ArithmeticException</code> on overflow instead of returning wrapped negative numbers.\n</div>\n\n<h3>2. Bit Manipulation Tricks</h3>\n<pre><code class=\"language-java\">// Count set bits (Brian Kernighan's Algorithm)\npublic static int countSetBits(int n) {\n    int count = 0;\n    while (n > 0) {\n        n &= (n - 1);\n        count++;\n    }\n    return count;\n}\n\n// Check if n is a power of 2\npublic static boolean isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}</code></pre>\n"
      },
      {
        "title": "Java Collections Framework (STL)",
        "content": "\n<h3>Collection Interfaces & Concrete Implementations</h3>\n<p>The Java Collections Framework provides standardized data structures for handling groups of objects efficiently.</p>\n\n<table>\n  <thead>\n    <tr><th>Interface</th><th>Class</th><th>Underlying Data Structure</th><th>Time Complexity (Search / Insert)</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>List</td><td><code>ArrayList</code></td><td>Dynamic Array</td><td>O(1) access / O(N) insertion</td></tr>\n    <tr><td>List</td><td><code>LinkedList</code></td><td>Doubly Linked List</td><td>O(N) access / O(1) insertion at ends</td></tr>\n    <tr><td>Set</td><td><code>HashSet</code></td><td>Hash Table</td><td>O(1) search / O(1) insert</td></tr>\n    <tr><td>Set</td><td><code>TreeSet</code></td><td>Red-Black Tree</td><td>O(log N) search / O(log N) insert</td></tr>\n    <tr><td>Map</td><td><code>HashMap</code></td><td>Hash Table + Node Buckets</td><td>O(1) avg lookup</td></tr>\n    <tr><td>Queue</td><td><code>PriorityQueue</code></td><td>Binary Min-Heap</td><td>O(1) peek / O(log N) insert & poll</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout-tip\">\n  <strong>\ud83d\udca1 Custom Priority Queue Example (Ride-Sharing Matcher):</strong>\n  <pre><code class=\"language-java\">PriorityQueue&lt;Driver&gt; pq = new PriorityQueue<>(\n    (d1, d2) -> Double.compare(d1.distance, d2.distance)\n);</code></pre>\n</div>\n"
      },
      {
        "title": "Generics, Exception Handling & File Serialization",
        "content": "\n<h3>1. Exception Hierarchy</h3>\n<p>All exceptions derive from <code>java.lang.Throwable</code>.</p>\n\n<div class=\"callout callout-info\">\n  <strong>Checked vs Unchecked:</strong>\n  <ul>\n    <li><strong>Checked Exceptions</strong> (e.g., <code>IOException</code>, <code>SQLException</code>): Must be declared in method signature (<code>throws</code>) or caught.</li>\n    <li><strong>Unchecked Exceptions</strong> (e.g., <code>NullPointerException</code>, <code>ArithmeticException</code>): Derive from <code>RuntimeException</code> and do not mandate explicit handling.</li>\n  </ul>\n</div>\n\n<h3>2. Try-With-Resources & File I/O</h3>\n<pre><code class=\"language-java\">try (BufferedReader reader = new BufferedReader(new FileReader(\"input.txt\"));\n     BufferedWriter writer = new BufferedWriter(new FileWriter(\"output.txt\"))) {\n    String line;\n    while ((line = reader.readLine()) != null) {\n        writer.write(line.toUpperCase());\n        writer.newLine();\n    }\n} catch (IOException e) {\n    System.err.println(\"File processing error: \" + e.getMessage());\n}</code></pre>\n"
      },
      {
        "title": "Streams API, Lambda Expressions & Functional Interfaces",
        "content": "\n<h3>1. Functional Programming Core Concepts</h3>\n<p>Introduced in Java 8, functional interfaces contain exactly one abstract method (annotated with <code>@FunctionalInterface</code>).</p>\n\n<table>\n  <thead>\n    <tr><th>Functional Interface</th><th>Descriptor Method</th><th>Input -> Output</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>Predicate&lt;T&gt;</code></td><td><code>boolean test(T t)</code></td><td>T -> boolean</td></tr>\n    <tr><td><code>Function&lt;T, R&gt;</code></td><td><code>R apply(T t)</code></td><td>T -> R</td></tr>\n    <tr><td><code>Consumer&lt;T&gt;</code></td><td><code>void accept(T t)</code></td><td>T -> void</td></tr>\n    <tr><td><code>Supplier&lt;T&gt;</code></td><td><code>T get()</code></td><td>void -> T</td></tr>\n  </tbody>\n</table>\n\n<h3>2. Stream Pipelines</h3>\n<pre><code class=\"language-java\">List&lt;String&gt; filteredNames = names.stream()\n    .filter(name -> name.startsWith(\"A\"))\n    .map(String::toUpperCase)\n    .sorted()\n    .collect(Collectors.toList());</code></pre>\n"
      },
      {
        "title": "JVM Architecture, Memory Model & Fast I/O",
        "content": "\n<h3>JVM Runtime Data Areas</h3>\n<ul>\n  <li><strong>Heap:</strong> Stores all object instances and arrays. Shared across threads. Managed by Garbage Collector.</li>\n  <li><strong>Stack:</strong> Stores frame data, local variables, and method calls for each thread.</li>\n  <li><strong>Metaspace:</strong> Holds class metadata and method bytecodes (replaces PermGen since Java 8).</li>\n</ul>\n\n<div class=\"callout callout-warning\">\n  <strong>\u26a0\ufe0f Fast I/O in Competitive Execution:</strong> Standard <code>Scanner</code> is slow due to heavy regex parsing. Use <code>BufferedReader</code> and <code>StringTokenizer</code> for processing fast input pipelines.\n</div>\n"
      }
    ]
  },
  "st2": {
    "unitName": "ST-2 \u2014 SQL Fundamentals, JDBC & DAO Architecture",
    "topics": [
      {
        "title": "SQL Fundamentals & Data Manipulation",
        "content": "\n<h3>SQL Command Categories</h3>\n<ul>\n  <li><strong>DDL (Data Definition Language):</strong> <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code></li>\n  <li><strong>DML (Data Manipulation Language):</strong> <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></li>\n  <li><strong>TCL (Transaction Control Language):</strong> <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></li>\n</ul>\n\n<pre><code class=\"language-sql\">-- Creating Students table with constraints\nCREATE TABLE Students (\n    student_id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0)\n);</code></pre>\n"
      },
      {
        "title": "Advanced SQL Joins, Subqueries & Aggregations",
        "content": "\n<h3>SQL Join Types</h3>\n<table>\n  <thead>\n    <tr><th>Join Type</th><th>Description</th></tr>\n  </thead>\n  <tbody>\n    <tr><td><code>INNER JOIN</code></td><td>Returns rows with matching keys in both tables</td></tr>\n    <tr><td><code>LEFT JOIN</code></td><td>Returns all rows from left table + matched right rows</td></tr>\n    <tr><td><code>RIGHT JOIN</code></td><td>Returns all rows from right table + matched left rows</td></tr>\n    <tr><td><code>FULL OUTER JOIN</code></td><td>Returns rows when there is a match in either table</td></tr>\n  </tbody>\n</table>\n\n<pre><code class=\"language-sql\">-- Aggregation with HAVING clause\nSELECT department, COUNT(*) AS student_count, AVG(gpa) AS avg_gpa\nFROM Students\nGROUP BY department\nHAVING AVG(gpa) > 3.5;</code></pre>\n"
      },
      {
        "title": "JDBC Architecture & Prepared Statements",
        "content": "\n<h3>JDBC Connection Pipeline</h3>\n<ol>\n  <li>Load Database Driver (e.g., <code>com.mysql.cj.jdbc.Driver</code>).</li>\n  <li>Establish Connection via <code>DriverManager.getConnection(url, user, pass)</code>.</li>\n  <li>Create <code>PreparedStatement</code> for parameter injection.</li>\n  <li>Execute Query and process <code>ResultSet</code>.</li>\n  <li>Close Connection and Statements in <code>try-with-resources</code> block.</li>\n</ol>\n\n<div class=\"callout callout-key\">\n  <strong>\ud83d\udd11 Preventing SQL Injection:</strong> Never concatenate user input directly into SQL strings. Always use <code>PreparedStatement</code> with parameter placeholders (<code>?</code>).\n</div>\n\n<pre><code class=\"language-java\">String sql = \"SELECT * FROM Users WHERE email = ? AND status = ?\";\ntry (PreparedStatement stmt = conn.prepareStatement(sql)) {\n    stmt.setString(1, userEmail);\n    stmt.setString(2, \"ACTIVE\");\n    ResultSet rs = stmt.executeQuery();\n    while (rs.next()) {\n        System.out.println(\"User ID: \" + rs.getInt(\"id\"));\n    }\n}</code></pre>\n"
      },
      {
        "title": "Data Access Object (DAO) Design Pattern",
        "content": "\n<h3>Layered Architecture & Separation of Concerns</h3>\n<p>The DAO design pattern decouples low-level data persistence operations from high-level business domain logic.</p>\n\n<pre><code class=\"language-java\">public interface StudentDAO {\n    void insertStudent(Student s);\n    Student getStudentById(int id);\n    List&lt;Student&gt; getAllStudents();\n    void updateStudent(Student s);\n    void deleteStudent(int id);\n}</code></pre>\n"
      }
    ]
  },
  "endTerm": {
    "unitName": "End Term \u2014 Multithreading, Concurrency & Synchronization",
    "topics": [
      {
        "title": "Multithreading & Thread Lifecycle",
        "content": "\n<h3>Thread Lifecycle States</h3>\n<p>A Java thread moves through 6 lifecycle states: <code>NEW</code>, <code>RUNNABLE</code>, <code>BLOCKED</code>, <code>WAITING</code>, <code>TIMED_WAITING</code>, and <code>TERMINATED</code>.</p>\n\n<pre><code class=\"language-java\">// Creating threads via Runnable interface\nRunnable task = () -> {\n    System.out.println(\"Executing task in thread: \" + Thread.currentThread().getName());\n};\nThread thread = new Thread(task);\nthread.start();</code></pre>\n"
      },
      {
        "title": "Synchronization & Concurrency Hazards",
        "content": "\n<h3>Race Conditions & Synchronization Blocks</h3>\n<p>When multiple threads access shared mutable state without synchronization, race conditions occur.</p>\n\n<pre><code class=\"language-java\">public class BankAccount {\n    private int balance = 1000;\n\n    public synchronized void withdraw(int amount) {\n        if (balance >= amount) {\n            balance -= amount;\n        }\n    }\n}</code></pre>\n\n<div class=\"callout callout-warning\">\n  <strong>\u26a0\ufe0f Deadlock Prevention:</strong> Deadlock occurs when two or more threads are blocked forever, waiting for each other to release locks. Always acquire locks in a global deterministic order.\n</div>\n"
      }
    ]
  }
};

const JAVA_ABSTRACTIONS_MCQ_BANK = [
  {
    "unitName": "ST-1 Java Abstractions Quiz",
    "examGroup": "st1",
    "questions": [
      {
        "id": 8001,
        "topic": "Integer Overflow",
        "question": "Which method in java.lang.Math throws an exception on integer overflow?",
        "options": {
          "a": "Math.abs()",
          "b": "Math.addExact()",
          "c": "Math.max()",
          "d": "Math.floor()"
        },
        "correct": "b",
        "explanation": "Math.addExact() throws an ArithmeticException if the mathematical result overflows an int or long."
      },
      {
        "id": 8002,
        "topic": "Collections",
        "question": "Which Collection class maintains insertion order and allows constant time positional access?",
        "options": {
          "a": "HashSet",
          "b": "TreeSet",
          "c": "ArrayList",
          "d": "PriorityQueue"
        },
        "correct": "c",
        "explanation": "ArrayList preserves insertion order and provides O(1) random access by index."
      },
      {
        "id": 8003,
        "topic": "Streams",
        "question": "What is the return type of Stream.collect(Collectors.toList())?",
        "options": {
          "a": "Stream<T>",
          "b": "List<T>",
          "c": "Optional<T>",
          "d": "Map<K,V>"
        },
        "correct": "b",
        "explanation": "collect(Collectors.toList()) accumulates the elements of the stream into a new List."
      }
    ]
  },
  {
    "unitName": "ST-2 Database & JDBC Quiz",
    "examGroup": "st2",
    "questions": [
      {
        "id": 8101,
        "topic": "JDBC Security",
        "question": "Why is PreparedStatement preferred over Statement in JDBC?",
        "options": {
          "a": "It compiles faster than standard SQL",
          "b": "It prevents SQL injection vulnerabilities using parameterized queries",
          "c": "It automatically commits transactions",
          "d": "It requires no database driver"
        },
        "correct": "b",
        "explanation": "PreparedStatement uses parameter placeholders (?) to sanitize input and prevent SQL Injection."
      },
      {
        "id": 8102,
        "topic": "DAO Pattern",
        "question": "What is the primary role of the Data Access Object (DAO) pattern?",
        "options": {
          "a": "To render HTML user interfaces",
          "b": "To abstract and encapsulate database access logic from business logic",
          "c": "To manage garbage collection",
          "d": "To encrypt passwords"
        },
        "correct": "b",
        "explanation": "DAO separates low-level data access operations from high-level business services."
      }
    ]
  },
  {
    "unitName": "End Term Multithreading Quiz",
    "examGroup": "endTerm",
    "questions": [
      {
        "id": 8201,
        "topic": "Synchronization",
        "question": "What keyword is used in Java to ensure only one thread executes a block of code at a time?",
        "options": {
          "a": "volatile",
          "b": "synchronized",
          "c": "transient",
          "d": "abstract"
        },
        "correct": "b",
        "explanation": "synchronized acquires an intrinsic lock on the monitor object to enforce mutual exclusion."
      }
    ]
  }
];
