"""ST-2 notes (lectures 15-27): SQL, JDBC, DAO, CRUD."""

from java_pa_content_st1 import topic

ST2 = []

ST2.append(topic(
    "SQL Fundamentals — DDL, DML, DCL, TCL",
    "Lectures 15-16 · the four command families",
    r"""
<h3>1. The five sub-languages of SQL</h3>
<table>
  <thead><tr><th>Family</th><th>Full form</th><th>Commands</th><th>What it touches</th><th>Auto-commit?</th></tr></thead>
  <tbody>
    <tr><td><strong>DDL</strong></td><td>Data Definition</td><td><code>CREATE, ALTER, DROP, TRUNCATE, RENAME</code></td><td>the <em>structure</em> (tables, columns)</td><td>Yes — cannot be rolled back</td></tr>
    <tr><td><strong>DML</strong></td><td>Data Manipulation</td><td><code>INSERT, UPDATE, DELETE</code></td><td>the <em>rows</em></td><td>No — can be rolled back</td></tr>
    <tr><td><strong>DQL</strong></td><td>Data Query</td><td><code>SELECT</code></td><td>reading rows</td><td>—</td></tr>
    <tr><td><strong>DCL</strong></td><td>Data Control</td><td><code>GRANT, REVOKE</code></td><td>permissions</td><td>Yes</td></tr>
    <tr><td><strong>TCL</strong></td><td>Transaction Control</td><td><code>COMMIT, ROLLBACK, SAVEPOINT</code></td><td>groups of DML</td><td>—</td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>&#128273; DELETE vs TRUNCATE vs DROP — asked every single year:</strong>
  <ul>
    <li><code>DELETE FROM t WHERE ...</code> — DML, removes chosen rows, can be rolled back, fires triggers, slow for big tables.</li>
    <li><code>TRUNCATE TABLE t</code> — DDL, removes <em>all</em> rows instantly, resets AUTO_INCREMENT, cannot be rolled back.</li>
    <li><code>DROP TABLE t</code> — DDL, removes the rows <em>and the table itself</em>.</li>
  </ul>
</div>

<h3>2. DDL in practice</h3>
<pre><code class="language-sql">CREATE TABLE Students (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50) NOT NULL,
    email    VARCHAR(80) UNIQUE,
    dept     VARCHAR(30) DEFAULT 'CSE',
    gpa      DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 10),
    joined   DATE
);

ALTER TABLE Students ADD COLUMN phone VARCHAR(15);
ALTER TABLE Students MODIFY COLUMN name VARCHAR(80);
ALTER TABLE Students DROP COLUMN phone;
RENAME TABLE Students TO Student_Master;</code></pre>

<h3>3. Common MySQL data types</h3>
<table>
  <thead><tr><th>Type</th><th>Use for</th></tr></thead>
  <tbody>
    <tr><td><code>INT</code>, <code>BIGINT</code></td><td>whole numbers, ids</td></tr>
    <tr><td><code>DECIMAL(p,s)</code></td><td>money — exact, never use FLOAT for currency</td></tr>
    <tr><td><code>VARCHAR(n)</code> / <code>CHAR(n)</code></td><td>variable / fixed length text</td></tr>
    <tr><td><code>DATE</code>, <code>DATETIME</code>, <code>TIMESTAMP</code></td><td>dates and times</td></tr>
    <tr><td><code>BOOLEAN</code> (alias of TINYINT(1))</td><td>true / false</td></tr>
  </tbody>
</table>

<h3>4. DML and DQL</h3>
<pre><code class="language-sql">INSERT INTO Students (name, email, gpa) VALUES ('Aman', 'aman@ck.in', 8.4);
INSERT INTO Students (name, gpa) VALUES ('Riya', 9.1), ('Karan', 7.2);   -- multi-row

UPDATE Students SET gpa = 8.9 WHERE id = 1;
DELETE FROM Students WHERE gpa &lt; 4;

SELECT name, gpa FROM Students
WHERE dept = 'CSE' AND gpa &gt;= 8
ORDER BY gpa DESC
LIMIT 5;</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Forgetting WHERE in an UPDATE or DELETE changes every row in the table.</strong>
  Always run the same condition as a <code>SELECT</code> first.
</div>

<h3>5. Filtering vocabulary</h3>
<pre><code class="language-sql">WHERE gpa BETWEEN 7 AND 9
WHERE dept IN ('CSE', 'ECE')
WHERE name LIKE 'A%'        -- starts with A   (_ = exactly one character)
WHERE email IS NULL         -- never use = NULL, NULL is not equal to anything
SELECT DISTINCT dept FROM Students;</code></pre>

<h3>6. DCL and TCL</h3>
<pre><code class="language-sql">GRANT SELECT, INSERT ON school.Students TO 'app_user'@'localhost';
REVOKE INSERT ON school.Students FROM 'app_user'@'localhost';

START TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE id = 1;
SAVEPOINT after_debit;
UPDATE Accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;      -- or ROLLBACK TO after_debit;</code></pre>
"""
))

ST2.append(topic(
    "Joins — Inner, Left, Right, Full, Self & Cross",
    "Lecture 17 · combining tables",
    r"""
<h3>1. Why joins exist</h3>
<p>Normalization splits data across tables so nothing is duplicated. A <strong>join</strong> stitches those tables
back together on a shared column — normally a foreign key.</p>

<pre><code class="language-sql">-- Sample tables
Students(id, name, dept_id)
Departments(dept_id, dept_name)</code></pre>

<h3>2. The join family</h3>
<table>
  <thead><tr><th>Join</th><th>Returns</th></tr></thead>
  <tbody>
    <tr><td><code>INNER JOIN</code></td><td>only rows matching in <strong>both</strong> tables</td></tr>
    <tr><td><code>LEFT JOIN</code></td><td>all left rows + matches; unmatched right columns become <code>NULL</code></td></tr>
    <tr><td><code>RIGHT JOIN</code></td><td>all right rows + matches</td></tr>
    <tr><td><code>FULL OUTER JOIN</code></td><td>everything from both sides (MySQL: emulate with <code>UNION</code>)</td></tr>
    <tr><td><code>CROSS JOIN</code></td><td>every combination — Cartesian product (m x n rows)</td></tr>
    <tr><td><code>SELF JOIN</code></td><td>a table joined to itself using two aliases</td></tr>
  </tbody>
</table>

<pre><code class="language-sql">-- INNER: students who have a department
SELECT s.name, d.dept_name
FROM Students s
INNER JOIN Departments d ON s.dept_id = d.dept_id;

-- LEFT: every student, even those with no department
SELECT s.name, d.dept_name
FROM Students s
LEFT JOIN Departments d ON s.dept_id = d.dept_id;

-- Departments with NO students (the "anti-join" pattern)
SELECT d.dept_name
FROM Departments d
LEFT JOIN Students s ON d.dept_id = s.dept_id
WHERE s.id IS NULL;

-- FULL OUTER in MySQL
SELECT ... FROM a LEFT JOIN b ON ...
UNION
SELECT ... FROM a RIGHT JOIN b ON ...;</code></pre>

<h3>3. Self join — same table, two roles</h3>
<pre><code class="language-sql">-- Every employee next to their manager, from one Employees table
SELECT e.name AS employee, m.name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.id;</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Condition placement changes the answer for OUTER joins:</strong> a filter in <code>ON</code> is applied
  <em>while</em> joining (unmatched left rows survive as NULL), while the same filter in <code>WHERE</code> runs
  <em>after</em> the join and throws those NULL rows away — quietly turning your LEFT JOIN into an INNER JOIN.
</div>

<h3>4. Nested queries (subqueries)</h3>
<pre><code class="language-sql">-- Scalar subquery: students above the overall average
SELECT name FROM Students
WHERE gpa &gt; (SELECT AVG(gpa) FROM Students);

-- IN subquery
SELECT name FROM Students
WHERE dept_id IN (SELECT dept_id FROM Departments WHERE dept_name LIKE 'Comp%');

-- Correlated subquery: runs once per outer row - topper of each department
SELECT s.name, s.dept_id FROM Students s
WHERE s.gpa = (SELECT MAX(s2.gpa) FROM Students s2 WHERE s2.dept_id = s.dept_id);

-- EXISTS: usually faster than IN for large sets
SELECT d.dept_name FROM Departments d
WHERE EXISTS (SELECT 1 FROM Students s WHERE s.dept_id = d.dept_id);

-- Derived table (subquery in FROM) - must be given an alias
SELECT dept_id, avg_gpa FROM
    (SELECT dept_id, AVG(gpa) AS avg_gpa FROM Students GROUP BY dept_id) t
WHERE avg_gpa &gt; 8;</code></pre>
"""
))

ST2.append(topic(
    "GROUP BY, Aggregates & HAVING",
    "Lecture 17 · summarising data",
    r"""
<h3>1. Aggregate functions</h3>
<table>
  <thead><tr><th>Function</th><th>Does</th><th>Ignores NULL?</th></tr></thead>
  <tbody>
    <tr><td><code>COUNT(*)</code></td><td>counts rows</td><td>No — counts every row</td></tr>
    <tr><td><code>COUNT(col)</code></td><td>counts non-null values in that column</td><td>Yes</td></tr>
    <tr><td><code>SUM(col)</code></td><td>total</td><td>Yes</td></tr>
    <tr><td><code>AVG(col)</code></td><td>mean</td><td>Yes — NULLs are not counted in the divisor</td></tr>
    <tr><td><code>MIN</code> / <code>MAX</code></td><td>smallest / largest</td><td>Yes</td></tr>
  </tbody>
</table>

<h3>2. GROUP BY + HAVING</h3>
<pre><code class="language-sql">SELECT dept, COUNT(*) AS student_count, ROUND(AVG(gpa), 2) AS avg_gpa
FROM Students
WHERE gpa IS NOT NULL          -- 1. filter ROWS before grouping
GROUP BY dept                  -- 2. make one row per dept
HAVING AVG(gpa) &gt; 8.0          -- 3. filter GROUPS after aggregating
ORDER BY avg_gpa DESC          -- 4. sort the result
LIMIT 3;</code></pre>

<div class="callout callout-key">
  <strong>&#128273; WHERE vs HAVING — the single most asked SQL question:</strong>
  <code>WHERE</code> filters individual rows <em>before</em> grouping and cannot contain an aggregate.
  <code>HAVING</code> filters groups <em>after</em> aggregation and normally does contain one.
</div>

<h3>3. Logical order of execution</h3>
<p>SQL is <em>written</em> SELECT-first but <em>executed</em> in this order — memorise it, it explains most errors:</p>
<pre><code class="language-bash">FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT</code></pre>
<p>Because <code>SELECT</code> runs after <code>WHERE</code>, you cannot use a column alias in <code>WHERE</code> —
but you <em>can</em> in <code>ORDER BY</code>.</p>

<h3>4. Rules for what may appear in SELECT</h3>
<pre><code class="language-sql">-- WRONG: name is neither grouped nor aggregated
SELECT dept, name, COUNT(*) FROM Students GROUP BY dept;

-- RIGHT
SELECT dept, COUNT(*) FROM Students GROUP BY dept;
SELECT dept, MAX(name) FROM Students GROUP BY dept;</code></pre>

<h3>5. Useful patterns</h3>
<pre><code class="language-sql">-- Find duplicate emails
SELECT email, COUNT(*) FROM Students GROUP BY email HAVING COUNT(*) &gt; 1;

-- Conditional counting
SELECT dept,
       SUM(CASE WHEN gpa &gt;= 8 THEN 1 ELSE 0 END) AS toppers,
       COUNT(*) AS total
FROM Students GROUP BY dept;

-- Second highest GPA
SELECT MAX(gpa) FROM Students WHERE gpa &lt; (SELECT MAX(gpa) FROM Students);</code></pre>
"""
))

ST2.append(topic(
    "Constraints, MySQL Table Design & Indexing",
    "Lecture 18 · rules the database enforces for you",
    r"""
<h3>1. The six constraints</h3>
<table>
  <thead><tr><th>Constraint</th><th>Guarantees</th><th>NULL allowed?</th><th>How many per table</th></tr></thead>
  <tbody>
    <tr><td><code>PRIMARY KEY</code></td><td>unique + not null, identifies the row</td><td>No</td><td>exactly one (may span columns)</td></tr>
    <tr><td><code>FOREIGN KEY</code></td><td>value must exist in the parent table</td><td>Yes</td><td>many</td></tr>
    <tr><td><code>UNIQUE</code></td><td>no repeats</td><td>Yes (usually one NULL)</td><td>many</td></tr>
    <tr><td><code>NOT NULL</code></td><td>value must be supplied</td><td>No</td><td>many</td></tr>
    <tr><td><code>CHECK</code></td><td>custom condition</td><td>—</td><td>many</td></tr>
    <tr><td><code>DEFAULT</code></td><td>value used when none is given</td><td>—</td><td>many</td></tr>
  </tbody>
</table>

<pre><code class="language-sql">CREATE TABLE Enrollments (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id  INT NOT NULL,
    grade      CHAR(1) CHECK (grade IN ('A','B','C','D','F')),
    enrolled   DATE DEFAULT (CURRENT_DATE),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_pair UNIQUE (student_id, course_id)   -- no double enrolment
);</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Referential actions:</strong> <code>ON DELETE CASCADE</code> deletes the children too,
  <code>SET NULL</code> blanks the link, <code>RESTRICT</code>/<code>NO ACTION</code> (the default) blocks the parent delete.
</div>

<h3>2. Primary key vs unique key</h3>
<ul>
  <li>Primary key: one per table, never NULL, creates the <em>clustered</em> index in InnoDB (the physical row order).</li>
  <li>Unique key: as many as you like, allows a NULL, creates a secondary index.</li>
  <li><strong>Surrogate</strong> key (<code>AUTO_INCREMENT id</code>) vs <strong>natural</strong> key (email). Surrogate keys are
      preferred because business values change.</li>
</ul>

<h3>3. Indexing — how the database finds rows fast</h3>
<p>Without an index the engine does a <strong>full table scan</strong>: read every row. An index is a sorted
B+ tree of one or more columns, so lookups become O(log n).</p>

<pre><code class="language-sql">CREATE INDEX idx_dept ON Students(dept);
CREATE UNIQUE INDEX idx_email ON Students(email);
CREATE INDEX idx_dept_gpa ON Students(dept, gpa);   -- composite
DROP INDEX idx_dept ON Students;
EXPLAIN SELECT * FROM Students WHERE dept = 'CSE';  -- shows if the index was used</code></pre>

<table>
  <thead><tr><th>Index helps</th><th>Index hurts</th></tr></thead>
  <tbody>
    <tr><td><code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>, <code>GROUP BY</code> columns</td><td>every <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code> must also update the index</td></tr>
    <tr><td>high-selectivity columns (many distinct values)</td><td>low-selectivity columns like a gender flag</td></tr>
    <tr><td>read-heavy tables</td><td>write-heavy tables; indexes also consume disk</td></tr>
  </tbody>
</table>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; An index is skipped if you wrap the column in a function</strong> —
  <code>WHERE YEAR(joined) = 2024</code> ignores the index on <code>joined</code>.
  Write <code>WHERE joined &gt;= '2024-01-01' AND joined &lt; '2025-01-01'</code> instead.
  Composite indexes follow the <em>leftmost prefix</em> rule: <code>(dept, gpa)</code> helps a query on
  <code>dept</code>, or on <code>dept</code>+<code>gpa</code>, but not on <code>gpa</code> alone.
</div>
"""
))

ST2.append(topic(
    "Normalization — 1NF to BCNF",
    "Lectures 19-21 · designing tables that never lie",
    r"""
<h3>1. Why normalize</h3>
<p>Storing the same fact in many places causes three <strong>anomalies</strong>:</p>
<ul>
  <li><strong>Insert anomaly</strong> — you cannot add a new department until some student joins it.</li>
  <li><strong>Update anomaly</strong> — renaming a department means editing hundreds of rows; miss one and the data contradicts itself.</li>
  <li><strong>Delete anomaly</strong> — deleting the last student of a department erases the department itself.</li>
</ul>
<p>Normalization removes redundancy by splitting tables so that <em>every fact is stored exactly once</em>.</p>

<h3>2. Functional dependency</h3>
<p><code>A -&gt; B</code> ("A determines B") means: for a given A there is only one possible B.
<code>student_id -&gt; name</code> holds; <code>name -&gt; student_id</code> does not, because names repeat.</p>

<h3>3. The normal forms</h3>
<table>
  <thead><tr><th>Form</th><th>Rule</th><th>Removes</th></tr></thead>
  <tbody>
    <tr><td><strong>1NF</strong></td><td>every cell holds a single atomic value; no repeating groups</td><td>multi-valued cells</td></tr>
    <tr><td><strong>2NF</strong></td><td>1NF + no <em>partial</em> dependency (non-key column depending on part of a composite key)</td><td>partial dependency</td></tr>
    <tr><td><strong>3NF</strong></td><td>2NF + no <em>transitive</em> dependency (non-key depending on another non-key)</td><td>transitive dependency</td></tr>
    <tr><td><strong>BCNF</strong></td><td>for every dependency <code>X -&gt; Y</code>, X must be a super key</td><td>the leftover anomalies of 3NF</td></tr>
  </tbody>
</table>

<h3>4. Worked example</h3>
<pre><code class="language-bash">UNNORMALISED
(student_id, name, phones,          course_id, course_name, dept, dept_head)
 1           Aman  "999,888"         C1        DBMS         CSE   Dr. Rao</code></pre>

<p><strong>Step 1 - 1NF:</strong> "999,888" is not atomic. One row per phone, or a separate <code>Phones</code> table.</p>

<p><strong>Step 2 - 2NF:</strong> the key is (student_id, course_id). But <code>name</code> depends only on
<code>student_id</code> and <code>course_name</code> only on <code>course_id</code> — partial dependencies. Split:</p>
<pre><code class="language-bash">Students(student_id, name, dept, dept_head)
Courses(course_id, course_name)
Enrollments(student_id, course_id)</code></pre>

<p><strong>Step 3 - 3NF:</strong> in <code>Students</code>, <code>student_id -&gt; dept -&gt; dept_head</code>.
<code>dept_head</code> depends on a non-key column — transitive. Split again:</p>
<pre><code class="language-bash">Students(student_id, name, dept_id)
Departments(dept_id, dept_name, dept_head)
Courses(course_id, course_name)
Enrollments(student_id, course_id)</code></pre>
<p>Now every fact lives in exactly one place. This is the design you should produce in the exam.</p>

<div class="callout callout-key">
  <strong>&#128273; One-line memory hook:</strong> 1NF — atomic values. 2NF — the <em>whole</em> key.
  3NF — <em>nothing but</em> the key. BCNF — and the determinant must be a key.
</div>

<h3>5. When to stop (denormalization)</h3>
<p>More tables means more joins, and joins cost time. Reporting and analytics systems deliberately
<strong>denormalize</strong> (keep some duplication) to make reads fast. Normalize for correctness first,
denormalize later only when measurements demand it.</p>
"""
))

ST2.append(topic(
    "Transactions & ACID",
    "Lectures 19-21 · all or nothing",
    r"""
<h3>1. What a transaction is</h3>
<p>A group of statements that must succeed together or fail together. The textbook example is a bank transfer:
debiting one account and crediting another must never happen half-way.</p>

<pre><code class="language-sql">START TRANSACTION;
UPDATE Accounts SET balance = balance - 500 WHERE id = 1;
UPDATE Accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;        -- both changes become permanent
-- ROLLBACK;   -- or neither of them happens</code></pre>

<h3>2. ACID</h3>
<table>
  <thead><tr><th>Property</th><th>Promise</th></tr></thead>
  <tbody>
    <tr><td><strong>A</strong>tomicity</td><td>all statements happen, or none do</td></tr>
    <tr><td><strong>C</strong>onsistency</td><td>the database moves from one valid state to another; constraints stay satisfied</td></tr>
    <tr><td><strong>I</strong>solation</td><td>concurrent transactions do not see each other's half-finished work</td></tr>
    <tr><td><strong>D</strong>urability</td><td>once committed, it survives a crash (write-ahead log)</td></tr>
  </tbody>
</table>

<h3>3. Concurrency problems and isolation levels</h3>
<table>
  <thead><tr><th>Problem</th><th>What happens</th></tr></thead>
  <tbody>
    <tr><td>Dirty read</td><td>you read data another transaction has not committed yet</td></tr>
    <tr><td>Non-repeatable read</td><td>you read the same row twice and get different values</td></tr>
    <tr><td>Phantom read</td><td>you run the same query twice and new rows have appeared</td></tr>
  </tbody>
</table>

<table>
  <thead><tr><th>Isolation level</th><th>Dirty</th><th>Non-repeatable</th><th>Phantom</th></tr></thead>
  <tbody>
    <tr><td>READ UNCOMMITTED</td><td>possible</td><td>possible</td><td>possible</td></tr>
    <tr><td>READ COMMITTED</td><td>prevented</td><td>possible</td><td>possible</td></tr>
    <tr><td>REPEATABLE READ <em>(MySQL default)</em></td><td>prevented</td><td>prevented</td><td>possible*</td></tr>
    <tr><td>SERIALIZABLE</td><td>prevented</td><td>prevented</td><td>prevented</td></tr>
  </tbody>
</table>
<p>* InnoDB's gap locking prevents most phantoms even at REPEATABLE READ. Higher isolation means more locking
and less concurrency — it is a trade-off, not a free upgrade.</p>

<h3>4. Savepoints</h3>
<pre><code class="language-sql">START TRANSACTION;
INSERT INTO Orders VALUES (...);
SAVEPOINT order_added;
INSERT INTO OrderItems VALUES (...);
ROLLBACK TO order_added;   -- undo only the items, keep the order
COMMIT;</code></pre>

<h3>5. Transactions from Java (JDBC)</h3>
<pre><code class="language-java">Connection conn = DriverManager.getConnection(URL, USER, PASS);
try {
    conn.setAutoCommit(false);              // JDBC commits every statement by default - turn that off

    debitStmt.executeUpdate();
    creditStmt.executeUpdate();

    conn.commit();
} catch (SQLException e) {
    conn.rollback();                        // undo everything on any failure
    throw e;
} finally {
    conn.setAutoCommit(true);
    conn.close();
}</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Remember:</strong> a JDBC connection starts in <em>auto-commit</em> mode. Multi-statement
  transactions only work after <code>setAutoCommit(false)</code>. That line is worth a mark on its own.
</div>
"""
))

ST2.append(topic(
    "JDBC — Architecture, Drivers & Connection Setup",
    "Lecture 22 · Java talking to MySQL",
    r"""
<h3>1. What JDBC is</h3>
<p>JDBC (Java Database Connectivity) is a set of <em>interfaces</em> in <code>java.sql</code>. Each database vendor
ships a <strong>driver</strong> that implements them. Your code talks to the interface, so switching from MySQL to
PostgreSQL means changing a URL and a jar, not your program.</p>

<pre><code class="language-bash">Java app -> JDBC API -> DriverManager -> Vendor driver -> Database</code></pre>

<h3>2. The four driver types</h3>
<table>
  <thead><tr><th>Type</th><th>Name</th><th>Note</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>JDBC-ODBC bridge</td><td>obsolete, removed in Java 8</td></tr>
    <tr><td>2</td><td>Native API (partly Java)</td><td>needs native client libraries</td></tr>
    <tr><td>3</td><td>Network protocol (middleware)</td><td>goes through a middle-tier server</td></tr>
    <tr><td>4</td><td><strong>Thin driver, pure Java</strong></td><td>what everyone uses today (<code>mysql-connector-j</code>)</td></tr>
  </tbody>
</table>

<h3>3. The five steps — write these in order in the exam</h3>
<pre><code class="language-java">// 1. Load the driver (optional since JDBC 4.0 auto-discovery, still asked)
Class.forName("com.mysql.cj.jdbc.Driver");

// 2. Open a connection
String url  = "jdbc:mysql://localhost:3306/school?useSSL=false&amp;serverTimezone=UTC";
Connection conn = DriverManager.getConnection(url, "root", "password");

// 3. Create a statement
PreparedStatement ps = conn.prepareStatement("SELECT id, name FROM Students WHERE dept = ?");
ps.setString(1, "CSE");

// 4. Execute and process the result
ResultSet rs = ps.executeQuery();
while (rs.next()) {
    System.out.println(rs.getInt("id") + " - " + rs.getString("name"));
}

// 5. Close everything (or use try-with-resources and forget about it)
rs.close(); ps.close(); conn.close();</code></pre>

<h3>4. Reading the connection URL</h3>
<pre><code class="language-bash">jdbc:mysql://localhost:3306/school
 |     |        |         |      |
 |     |        |         |      +-- database name
 |     |        |         +--------- port (MySQL default 3306)
 |     |        +------------------- host
 |     +---------------------------- sub-protocol (vendor)
 +---------------------------------- protocol</code></pre>

<h3>5. The core interfaces</h3>
<table>
  <thead><tr><th>Interface</th><th>Role</th></tr></thead>
  <tbody>
    <tr><td><code>DriverManager</code></td><td>class that hands out connections</td></tr>
    <tr><td><code>Connection</code></td><td>one session with the database</td></tr>
    <tr><td><code>Statement</code></td><td>plain SQL, recompiled every time</td></tr>
    <tr><td><code>PreparedStatement</code></td><td>precompiled SQL with <code>?</code> placeholders</td></tr>
    <tr><td><code>CallableStatement</code></td><td>calls a stored procedure</td></tr>
    <tr><td><code>ResultSet</code></td><td>cursor over the returned rows</td></tr>
  </tbody>
</table>

<h3>6. execute methods — which one when</h3>
<table>
  <thead><tr><th>Method</th><th>Use for</th><th>Returns</th></tr></thead>
  <tbody>
    <tr><td><code>executeQuery()</code></td><td>SELECT</td><td><code>ResultSet</code></td></tr>
    <tr><td><code>executeUpdate()</code></td><td>INSERT / UPDATE / DELETE / DDL</td><td><code>int</code> rows affected</td></tr>
    <tr><td><code>execute()</code></td><td>when you do not know the type</td><td><code>boolean</code> (true if a ResultSet)</td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>&#128273; ResultSet starts <em>before</em> the first row.</strong> You must call <code>rs.next()</code> once
  before reading anything — forgetting it is the classic runtime error. Column indexes are
  <strong>1-based</strong>, not 0-based.
</div>

<h3>7. Connection manager (Lab 57-60)</h3>
<pre><code class="language-java">public final class DBConnection {
    private static final String URL  = "jdbc:mysql://localhost:3306/school";
    private static final String USER = "root";
    private static final String PASS = System.getenv("DB_PASSWORD");   // never hardcode secrets

    private DBConnection() { }

    public static Connection get() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }
}</code></pre>
<p>Opening a connection is expensive (TCP handshake + authentication). Real applications use a
<strong>connection pool</strong> such as HikariCP that keeps a few connections open and lends them out.</p>
"""
))

ST2.append(topic(
    "PreparedStatement & Preventing SQL Injection",
    "Lectures 23-24 · dynamic queries done safely",
    r"""
<h3>1. The attack</h3>
<pre><code class="language-java">// NEVER do this
String sql = "SELECT * FROM Users WHERE email = '" + input + "'";
Statement st = conn.createStatement();
ResultSet rs = st.executeQuery(sql);</code></pre>

<p>If the user types <code>' OR '1'='1</code>, the query the database actually receives is:</p>
<pre><code class="language-sql">SELECT * FROM Users WHERE email = '' OR '1'='1'   -- always true: every user returned</code></pre>
<p>Type <code>'; DROP TABLE Users; --</code> and it gets worse. The root cause: user <em>data</em> was pasted into the
query and became <em>code</em>.</p>

<h3>2. The fix — parameter placeholders</h3>
<pre><code class="language-java">String sql = "SELECT * FROM Users WHERE email = ? AND status = ?";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, userEmail);      // index starts at 1
    ps.setString(2, "ACTIVE");
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) System.out.println(rs.getInt("id"));
    }
}</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Why it is safe:</strong> the SQL is compiled <em>first</em>, with the <code>?</code> holes already in place.
  Values are sent separately and can never change the query's structure — whatever the user types stays plain data.
</div>

<h3>3. Statement vs PreparedStatement</h3>
<table>
  <thead><tr><th></th><th><code>Statement</code></th><th><code>PreparedStatement</code></th></tr></thead>
  <tbody>
    <tr><td>SQL injection</td><td>vulnerable</td><td>safe</td></tr>
    <tr><td>Compilation</td><td>every execution</td><td>once, then reused</td></tr>
    <tr><td>Repeated execution</td><td>slow</td><td>fast</td></tr>
    <tr><td>Binary data / dates</td><td>awkward string building</td><td><code>setDate</code>, <code>setBlob</code>, etc.</td></tr>
    <tr><td>Readability</td><td>quote-heavy concatenation</td><td>clean</td></tr>
  </tbody>
</table>

<h3>4. Setters and getting generated keys</h3>
<pre><code class="language-java">ps.setInt(1, 42);
ps.setString(2, "Aman");
ps.setDouble(3, 8.5);
ps.setDate(4, java.sql.Date.valueOf(LocalDate.now()));
ps.setNull(5, Types.VARCHAR);

// Get the AUTO_INCREMENT id back after an insert
PreparedStatement ins = conn.prepareStatement(
        "INSERT INTO Students(name) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
ins.setString(1, "Riya");
ins.executeUpdate();
try (ResultSet keys = ins.getGeneratedKeys()) {
    if (keys.next()) System.out.println("New id = " + keys.getInt(1));
}</code></pre>

<h3>5. Batch updates — many rows, one round trip</h3>
<pre><code class="language-java">conn.setAutoCommit(false);
for (Student s : students) {
    ps.setString(1, s.getName());
    ps.addBatch();
}
int[] counts = ps.executeBatch();
conn.commit();</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; Placeholders only work for <em>values</em>.</strong> You cannot write
  <code>ORDER BY ?</code> or <code>FROM ?</code>. If a table or column name really must be dynamic, validate it
  against a fixed whitelist in Java.
</div>

<h3>6. Defence in depth</h3>
<ul>
  <li>Always use <code>PreparedStatement</code> (or an ORM that does).</li>
  <li>Validate input (length, format, allowed characters) as well.</li>
  <li>Give the application database user the least privilege it needs — no DROP rights.</li>
  <li>Never show raw SQL errors to the user; they leak your schema.</li>
</ul>
"""
))

ST2.append(topic(
    "DAO Pattern & Layered Architecture",
    "Lectures 25-26 · keeping SQL out of your business logic",
    r"""
<h3>1. The problem</h3>
<p>When JDBC code sits inside your business classes, one schema change forces edits all over the project, and
nothing can be unit tested without a live database.</p>

<h3>2. The layers</h3>
<pre><code class="language-bash">Presentation layer   (console / servlet / UI)
        |
Service layer        (business rules: fees, eligibility, validation)
        |
DAO layer            (ALL SQL lives here)
        |
Database</code></pre>
<p>Each layer only talks to the one directly below it. <strong>Separation of concerns</strong> is the phrase to use.</p>

<h3>3. The pieces of the pattern</h3>
<table>
  <thead><tr><th>Piece</th><th>Job</th></tr></thead>
  <tbody>
    <tr><td><strong>Model / POJO</strong></td><td>plain data holder (<code>Student</code>) with fields, getters, setters</td></tr>
    <tr><td><strong>DAO interface</strong></td><td>the contract: what operations exist</td></tr>
    <tr><td><strong>DAO implementation</strong></td><td>the JDBC code that fulfils the contract</td></tr>
    <tr><td><strong>Service</strong></td><td>business rules, calls one or more DAOs, owns the transaction</td></tr>
  </tbody>
</table>

<h3>4. Code</h3>
<pre><code class="language-java">// ---- Model ----
public class Student {
    private int id; private String name; private double gpa;
    // constructors, getters, setters, toString
}

// ---- DAO interface ----
public interface StudentDAO {
    void insert(Student s);
    Optional&lt;Student&gt; findById(int id);
    List&lt;Student&gt; findAll();
    void update(Student s);
    void delete(int id);
}

// ---- JDBC implementation ----
public class StudentDAOImpl implements StudentDAO {

    @Override
    public void insert(Student s) {
        String sql = "INSERT INTO Students(name, gpa) VALUES (?, ?)";
        try (Connection c = DBConnection.get();
             PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, s.getName());
            ps.setDouble(2, s.getGpa());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new DataAccessException("Insert failed", e);   // wrap, do not leak SQLException upward
        }
    }

    @Override
    public Optional&lt;Student&gt; findById(int id) {
        String sql = "SELECT id, name, gpa FROM Students WHERE id = ?";
        try (Connection c = DBConnection.get();
             PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? Optional.of(map(rs)) : Optional.empty();
            }
        } catch (SQLException e) {
            throw new DataAccessException("Lookup failed", e);
        }
    }

    private Student map(ResultSet rs) throws SQLException {   // one place that knows the columns
        return new Student(rs.getInt("id"), rs.getString("name"), rs.getDouble("gpa"));
    }
}

// ---- Service: business rules only, zero SQL ----
public class StudentService {
    private final StudentDAO dao;
    public StudentService(StudentDAO dao) { this.dao = dao; }   // injected -> testable with a fake DAO

    public void admit(Student s) {
        if (s.getGpa() &lt; 5) throw new IllegalArgumentException("GPA too low for admission");
        dao.insert(s);
    }
}</code></pre>

<h3>5. Why examiners like this pattern</h3>
<ul>
  <li><strong>Separation of concerns</strong> — SQL in one layer, rules in another.</li>
  <li><strong>Maintainability</strong> — a column rename touches only the DAO.</li>
  <li><strong>Testability</strong> — swap in an in-memory DAO and test the service with no database.</li>
  <li><strong>Swappable storage</strong> — MySQL today, MongoDB tomorrow, same interface.</li>
  <li><strong>Reusability</strong> — every screen reuses the same data operations.</li>
</ul>

<div class="callout callout-tip">
  <strong>&#128161; DAO vs Repository:</strong> a DAO mirrors one table and its CRUD; a repository is a slightly
  higher-level, domain-shaped collection of objects. In this course they are treated as the same idea.
</div>
"""
))

ST2.append(topic(
    "CRUD Application Walkthrough",
    "Lecture 27 · everything in ST-2 assembled",
    r"""
<h3>1. The four operations</h3>
<table>
  <thead><tr><th>CRUD</th><th>SQL</th><th>JDBC call</th></tr></thead>
  <tbody>
    <tr><td>Create</td><td><code>INSERT</code></td><td><code>executeUpdate()</code></td></tr>
    <tr><td>Read</td><td><code>SELECT</code></td><td><code>executeQuery()</code></td></tr>
    <tr><td>Update</td><td><code>UPDATE</code></td><td><code>executeUpdate()</code></td></tr>
    <tr><td>Delete</td><td><code>DELETE</code></td><td><code>executeUpdate()</code></td></tr>
  </tbody>
</table>

<h3>2. The schema</h3>
<pre><code class="language-sql">CREATE DATABASE IF NOT EXISTS school;
USE school;
CREATE TABLE Students (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    gpa  DECIMAL(3,2) CHECK (gpa BETWEEN 0 AND 10)
);</code></pre>

<h3>3. The remaining DAO methods</h3>
<pre><code class="language-java">@Override
public List&lt;Student&gt; findAll() {
    String sql = "SELECT id, name, gpa FROM Students ORDER BY id";
    List&lt;Student&gt; out = new ArrayList&lt;&gt;();
    try (Connection c = DBConnection.get();
         PreparedStatement ps = c.prepareStatement(sql);
         ResultSet rs = ps.executeQuery()) {
        while (rs.next()) out.add(map(rs));
    } catch (SQLException e) {
        throw new DataAccessException("findAll failed", e);
    }
    return out;
}

@Override
public void update(Student s) {
    String sql = "UPDATE Students SET name = ?, gpa = ? WHERE id = ?";
    try (Connection c = DBConnection.get();
         PreparedStatement ps = c.prepareStatement(sql)) {
        ps.setString(1, s.getName());
        ps.setDouble(2, s.getGpa());
        ps.setInt(3, s.getId());
        if (ps.executeUpdate() == 0)                       // rows affected == 0 means no such id
            throw new DataAccessException("No student with id " + s.getId());
    } catch (SQLException e) {
        throw new DataAccessException("Update failed", e);
    }
}

@Override
public void delete(int id) {
    try (Connection c = DBConnection.get();
         PreparedStatement ps = c.prepareStatement("DELETE FROM Students WHERE id = ?")) {
        ps.setInt(1, id);
        ps.executeUpdate();
    } catch (SQLException e) {
        throw new DataAccessException("Delete failed", e);
    }
}</code></pre>

<h3>4. A menu-driven main</h3>
<pre><code class="language-java">public class App {
    public static void main(String[] args) {
        StudentService service = new StudentService(new StudentDAOImpl());
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("1 Add  2 List  3 Update  4 Delete  5 Exit");
            switch (sc.nextInt()) {
                case 1 -&gt; { sc.nextLine();
                            System.out.print("Name: ");  String n = sc.nextLine();
                            System.out.print("GPA: ");   double g = sc.nextDouble();
                            service.admit(new Student(0, n, g)); }
                case 2 -&gt; service.list().forEach(System.out::println);
                case 3 -&gt; { /* read id + new values, call service.update */ }
                case 4 -&gt; { System.out.print("id: "); service.remove(sc.nextInt()); }
                case 5 -&gt; { return; }
                default -&gt; System.out.println("Invalid choice");
            }
        }
    }
}</code></pre>

<h3>5. Checklist the examiner marks against</h3>
<ul>
  <li><code>PreparedStatement</code> everywhere — no string concatenation.</li>
  <li>try-with-resources, so connections always close.</li>
  <li>Validation in the service layer, not in the DAO.</li>
  <li><code>setAutoCommit(false)</code> + commit/rollback where two tables change together.</li>
  <li><code>executeUpdate()</code>'s return value checked before reporting success.</li>
  <li>Credentials read from configuration or environment, never hardcoded.</li>
</ul>

<div class="callout callout-key">
  <strong>&#128273; Run it:</strong> put <code>mysql-connector-j-x.x.x.jar</code> on the classpath —
  <code>javac -cp .:mysql-connector-j.jar App.java</code> then
  <code>java -cp .:mysql-connector-j.jar App</code> (use <code>;</code> instead of <code>:</code> on Windows).
</div>
"""
))
