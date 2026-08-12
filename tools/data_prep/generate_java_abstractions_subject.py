#!/usr/bin/env python3
"""
Generates the Programming Abstractions using Java (24CSE0314) subject files and registers it in prep hub.
Derived directly from the official Chitkara University Course Handout (CHO).
"""

import sys
import json
from pathlib import Path

# Add data_prep directory to python path
CURRENT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(CURRENT_DIR))

# Create destination directory for intake
INTAKE_DIR = Path(__file__).resolve().parent.parent.parent / "resources" / "course_intake" / "java_abstractions"
INTAKE_DIR.mkdir(parents=True, exist_ok=True)

# Copy the PDF into the intake folder for organized storage
PDF_SOURCE = Path(__file__).resolve().parent.parent.parent / "resources" / "course_intake" / "CHO of Programming Abstractions using Java(24CSE0314).pdf"
PDF_DEST = INTAKE_DIR / "CHO_Programming_Abstractions_Java.pdf"
if PDF_SOURCE.exists() and not PDF_DEST.exists():
    PDF_DEST.write_bytes(PDF_SOURCE.read_bytes())

STUDY_DATA = {
    "st1": {
        "unitName": "ST-1 — Java Syntax, Collections, Streams & JVM",
        "topics": [
            {
                "title": "Java Syntax, Types & Modular Arithmetic",
                "content": """
<h3>1. Primitive vs Reference Types</h3>
<p>Java distinguishes between primitive types (stored on the stack with direct value memory) and reference types (stored on the heap, referencing objects).</p>

<table>
  <thead>
    <tr><th>Type</th><th>Size (bits)</th><th>Default Value</th><th>Memory Location</th></tr>
  </thead>
  <tbody>
    <tr><td><code>byte</code></td><td>8</td><td>0</td><td>Stack</td></tr>
    <tr><td><code>int</code></td><td>32</td><td>0</td><td>Stack</td></tr>
    <tr><td><code>double</code></td><td>64</td><td>0.0</td><td>Stack</td></tr>
    <tr><td><code>Reference (Object)</code></td><td>32/64</td><td>null</td><td>Heap (reference on Stack)</td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>🔑 Integer Overflow Safeguards:</strong> In competitive/high-performance Java, adding two large numbers can silently overflow. Use <code>Math.addExact(a, b)</code> to throw an <code>ArithmeticException</code> on overflow instead of returning wrapped negative numbers.
</div>

<h3>2. Bit Manipulation Tricks</h3>
<pre><code class="language-java">// Count set bits (Brian Kernighan's Algorithm)
public static int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}

// Check if n is a power of 2
public static boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}</code></pre>
"""
            },
            {
                "title": "Java Collections Framework (STL)",
                "content": """
<h3>Collection Interfaces & Concrete Implementations</h3>
<p>The Java Collections Framework provides standardized data structures for handling groups of objects efficiently.</p>

<table>
  <thead>
    <tr><th>Interface</th><th>Class</th><th>Underlying Data Structure</th><th>Time Complexity (Search / Insert)</th></tr>
  </thead>
  <tbody>
    <tr><td>List</td><td><code>ArrayList</code></td><td>Dynamic Array</td><td>O(1) access / O(N) insertion</td></tr>
    <tr><td>List</td><td><code>LinkedList</code></td><td>Doubly Linked List</td><td>O(N) access / O(1) insertion at ends</td></tr>
    <tr><td>Set</td><td><code>HashSet</code></td><td>Hash Table</td><td>O(1) search / O(1) insert</td></tr>
    <tr><td>Set</td><td><code>TreeSet</code></td><td>Red-Black Tree</td><td>O(log N) search / O(log N) insert</td></tr>
    <tr><td>Map</td><td><code>HashMap</code></td><td>Hash Table + Node Buckets</td><td>O(1) avg lookup</td></tr>
    <tr><td>Queue</td><td><code>PriorityQueue</code></td><td>Binary Min-Heap</td><td>O(1) peek / O(log N) insert & poll</td></tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <strong>💡 Custom Priority Queue Example (Ride-Sharing Matcher):</strong>
  <pre><code class="language-java">PriorityQueue&lt;Driver&gt; pq = new PriorityQueue<>(
    (d1, d2) -> Double.compare(d1.distance, d2.distance)
);</code></pre>
</div>
"""
            },
            {
                "title": "Generics, Exception Handling & File Serialization",
                "content": """
<h3>1. Exception Hierarchy</h3>
<p>All exceptions derive from <code>java.lang.Throwable</code>.</p>

<div class="callout callout-info">
  <strong>Checked vs Unchecked:</strong>
  <ul>
    <li><strong>Checked Exceptions</strong> (e.g., <code>IOException</code>, <code>SQLException</code>): Must be declared in method signature (<code>throws</code>) or caught.</li>
    <li><strong>Unchecked Exceptions</strong> (e.g., <code>NullPointerException</code>, <code>ArithmeticException</code>): Derive from <code>RuntimeException</code> and do not mandate explicit handling.</li>
  </ul>
</div>

<h3>2. Try-With-Resources & File I/O</h3>
<pre><code class="language-java">try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
     BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line.toUpperCase());
        writer.newLine();
    }
} catch (IOException e) {
    System.err.println("File processing error: " + e.getMessage());
}</code></pre>
"""
            },
            {
                "title": "Streams API, Lambda Expressions & Functional Interfaces",
                "content": """
<h3>1. Functional Programming Core Concepts</h3>
<p>Introduced in Java 8, functional interfaces contain exactly one abstract method (annotated with <code>@FunctionalInterface</code>).</p>

<table>
  <thead>
    <tr><th>Functional Interface</th><th>Descriptor Method</th><th>Input -> Output</th></tr>
  </thead>
  <tbody>
    <tr><td><code>Predicate&lt;T&gt;</code></td><td><code>boolean test(T t)</code></td><td>T -> boolean</td></tr>
    <tr><td><code>Function&lt;T, R&gt;</code></td><td><code>R apply(T t)</code></td><td>T -> R</td></tr>
    <tr><td><code>Consumer&lt;T&gt;</code></td><td><code>void accept(T t)</code></td><td>T -> void</td></tr>
    <tr><td><code>Supplier&lt;T&gt;</code></td><td><code>T get()</code></td><td>void -> T</td></tr>
  </tbody>
</table>

<h3>2. Stream Pipelines</h3>
<pre><code class="language-java">List&lt;String&gt; filteredNames = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());</code></pre>
"""
            },
            {
                "title": "JVM Architecture, Memory Model & Fast I/O",
                "content": """
<h3>JVM Runtime Data Areas</h3>
<ul>
  <li><strong>Heap:</strong> Stores all object instances and arrays. Shared across threads. Managed by Garbage Collector.</li>
  <li><strong>Stack:</strong> Stores frame data, local variables, and method calls for each thread.</li>
  <li><strong>Metaspace:</strong> Holds class metadata and method bytecodes (replaces PermGen since Java 8).</li>
</ul>

<div class="callout callout-warning">
  <strong>⚠️ Fast I/O in Competitive Execution:</strong> Standard <code>Scanner</code> is slow due to heavy regex parsing. Use <code>BufferedReader</code> and <code>StringTokenizer</code> for processing fast input pipelines.
</div>
"""
            }
        ]
    },
    "st2": {
        "unitName": "ST-2 — SQL Fundamentals, JDBC & DAO Architecture",
        "topics": [
            {
                "title": "SQL Fundamentals & Data Manipulation",
                "content": """
<h3>SQL Command Categories</h3>
<ul>
  <li><strong>DDL (Data Definition Language):</strong> <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code></li>
  <li><strong>DML (Data Manipulation Language):</strong> <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></li>
  <li><strong>TCL (Transaction Control Language):</strong> <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></li>
</ul>

<pre><code class="language-sql">-- Creating Students table with constraints
CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0)
);</code></pre>
"""
            },
            {
                "title": "Advanced SQL Joins, Subqueries & Aggregations",
                "content": """
<h3>SQL Join Types</h3>
<table>
  <thead>
    <tr><th>Join Type</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>INNER JOIN</code></td><td>Returns rows with matching keys in both tables</td></tr>
    <tr><td><code>LEFT JOIN</code></td><td>Returns all rows from left table + matched right rows</td></tr>
    <tr><td><code>RIGHT JOIN</code></td><td>Returns all rows from right table + matched left rows</td></tr>
    <tr><td><code>FULL OUTER JOIN</code></td><td>Returns rows when there is a match in either table</td></tr>
  </tbody>
</table>

<pre><code class="language-sql">-- Aggregation with HAVING clause
SELECT department, COUNT(*) AS student_count, AVG(gpa) AS avg_gpa
FROM Students
GROUP BY department
HAVING AVG(gpa) > 3.5;</code></pre>
"""
            },
            {
                "title": "JDBC Architecture & Prepared Statements",
                "content": """
<h3>JDBC Connection Pipeline</h3>
<ol>
  <li>Load Database Driver (e.g., <code>com.mysql.cj.jdbc.Driver</code>).</li>
  <li>Establish Connection via <code>DriverManager.getConnection(url, user, pass)</code>.</li>
  <li>Create <code>PreparedStatement</code> for parameter injection.</li>
  <li>Execute Query and process <code>ResultSet</code>.</li>
  <li>Close Connection and Statements in <code>try-with-resources</code> block.</li>
</ol>

<div class="callout callout-key">
  <strong>🔑 Preventing SQL Injection:</strong> Never concatenate user input directly into SQL strings. Always use <code>PreparedStatement</code> with parameter placeholders (<code>?</code>).
</div>

<pre><code class="language-java">String sql = "SELECT * FROM Users WHERE email = ? AND status = ?";
try (PreparedStatement stmt = conn.prepareStatement(sql)) {
    stmt.setString(1, userEmail);
    stmt.setString(2, "ACTIVE");
    ResultSet rs = stmt.executeQuery();
    while (rs.next()) {
        System.out.println("User ID: " + rs.getInt("id"));
    }
}</code></pre>
"""
            },
            {
                "title": "Data Access Object (DAO) Design Pattern",
                "content": """
<h3>Layered Architecture & Separation of Concerns</h3>
<p>The DAO design pattern decouples low-level data persistence operations from high-level business domain logic.</p>

<pre><code class="language-java">public interface StudentDAO {
    void insertStudent(Student s);
    Student getStudentById(int id);
    List&lt;Student&gt; getAllStudents();
    void updateStudent(Student s);
    void deleteStudent(int id);
}</code></pre>
"""
            }
        ]
    },
    "endTerm": {
        "unitName": "End Term — Multithreading, Concurrency & Synchronization",
        "topics": [
            {
                "title": "Multithreading & Thread Lifecycle",
                "content": """
<h3>Thread Lifecycle States</h3>
<p>A Java thread moves through 6 lifecycle states: <code>NEW</code>, <code>RUNNABLE</code>, <code>BLOCKED</code>, <code>WAITING</code>, <code>TIMED_WAITING</code>, and <code>TERMINATED</code>.</p>

<pre><code class="language-java">// Creating threads via Runnable interface
Runnable task = () -> {
    System.out.println("Executing task in thread: " + Thread.currentThread().getName());
};
Thread thread = new Thread(task);
thread.start();</code></pre>
"""
            },
            {
                "title": "Synchronization & Concurrency Hazards",
                "content": """
<h3>Race Conditions & Synchronization Blocks</h3>
<p>When multiple threads access shared mutable state without synchronization, race conditions occur.</p>

<pre><code class="language-java">public class BankAccount {
    private int balance = 1000;

    public synchronized void withdraw(int amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }
}</code></pre>

<div class="callout callout-warning">
  <strong>⚠️ Deadlock Prevention:</strong> Deadlock occurs when two or more threads are blocked forever, waiting for each other to release locks. Always acquire locks in a global deterministic order.
</div>
"""
            }
        ]
    }
}

MCQ_BANK = [
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
]

def main():
    iot_dir = Path(__file__).resolve().parent.parent.parent / "IOT"
    target_data_file = iot_dir / "java_abstractions-data.js"
    app_js_path = iot_dir / "app.js"

    # Write java_abstractions-data.js
    js_content = f"""// Programming Abstractions using Java (24CSE0314)
// Official Course Content generated from CHO Document

const JAVA_ABSTRACTIONS_STUDY_DATA = {json.dumps(STUDY_DATA, indent=2)};

const JAVA_ABSTRACTIONS_MCQ_BANK = {json.dumps(MCQ_BANK, indent=2)};
"""
    target_data_file.write_text(js_content, encoding="utf-8")
    print(f"✓ Built data file: {target_data_file}")

    # Register in app.js if not present
    app_js_text = app_js_path.read_text(encoding="utf-8")
    if "java_abstractions:" not in app_js_text:
        config_entry = """    java_abstractions: {
      label: "Programming Abstractions in Java",
      shortLabel: "Java PA",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      examTime: new Date("2026-12-10T09:30:00+05:30").getTime(),
      storageKey: "java_abstractions_mastered_topics",
      storageKeyPractice: "java_abstractions_mcq_answers",
      scripts: ["java_abstractions-data.js"],
      data: {},
      mcqs: null,
      themeColors: {
        st1: '#5F7AE0',
        st2: '#81B29A',
        endTerm: '#B58A3D',
        practice: '#8C4735'
      },
      sectionNames: {
        st1: 'ST-1 (Collections, Streams & JVM)',
        st2: 'ST-2 (SQL, JDBC & DAO)',
        endTerm: 'End Term (Multithreading & Concurrency)',
        practice: 'Topic-Wise MCQs'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'st2', label: 'ST-2' },
        { id: 'endTerm', label: 'End Term' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
"""
        insertion_target = "  subjects: {\n"
        if insertion_target in app_js_text:
            app_js_text = app_js_text.replace(insertion_target, insertion_target + config_entry)
            app_js_path.write_text(app_js_text, encoding="utf-8")
            print("✓ Successfully registered java_abstractions in app.js!")

if __name__ == "__main__":
    main()
