# -*- coding: utf-8 -*-
"""Foundations (Easy Reading / Gentle Start) notes for System Design ST-1 topics."""

ST1_FOUNDATIONS = {
0: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">System design is like planning a busy airport or city restaurant so it never crashes when 10 million people arrive.</p>
</div>

<h3>1. What is System Design?</h3>
<p>Writing code that runs on your personal laptop is easy. But what happens when <strong>10 million users</strong> click "Order Now" at the same instant on Diwali or Black Friday? The server runs out of RAM, connections freeze, and the company loses millions.</p>
<p><strong>System design</strong> is the architecture of organizing servers, databases, caches, and networks so that your application stays lightning-fast, never loses customer data, and keeps working even when parts catch fire.</p>

<h3>2. The Core Qualities Every System is Judged On</h3>
<table>
  <thead><tr><th>Quality</th><th>What It Really Means</th><th>Real-World Analogy</th></tr></thead>
  <tbody>
    <tr><td><strong>Availability</strong></td><td>Is the system up and responding right now?</td><td>A 24/7 hospital emergency room where the doors are never locked.</td></tr>
    <tr><td><strong>Reliability</strong></td><td>Does it do the <em>correct thing</em> without losing money or data?</td><td>An ATM can be open (available), but if it deducts ₹5,000 without dispensing cash, it is unreliable!</td></tr>
    <tr><td><strong>Scalability</strong></td><td>Can it handle 10x or 100x more traffic smoothly?</td><td>A restaurant kitchen that can feed 5,000 festival guests as easily as 50 dinner guests.</td></tr>
    <tr><td><strong>Fault Tolerance</strong></td><td>Does the system stay alive when a server crashes?</td><td>A passenger jet has two engines: if one engine fails mid-flight, the other keeps the plane flying safely.</td></tr>
    <tr><td><strong>Latency</strong></td><td>How long does one request take to return?</td><td>How fast your pizza arrives at your doorstep (e.g. 25 milliseconds).</td></tr>
    <tr><td><strong>Throughput</strong></td><td>How many total requests can the system handle per second?</td><td>How many pizzas the restaurant ovens can bake per hour.</td></tr>
  </tbody>
</table>

<h3>3. Scaling: Scale Up vs Scale Out</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 Buying a Monster Truck vs Hiring a Fleet of Vans</div>
  <ul>
    <li><strong>Vertical Scaling (Scale Up):</strong> You upgrade to one giant expensive super-computer with 128 cores and 1 Terabyte of RAM. Simple to do, but there is a physical hardware limit, it costs a fortune, and if that one machine dies, your whole business goes dark.</li>
    <li><strong>Horizontal Scaling (Scale Out):</strong> You buy 10 cheaper standard servers behind a traffic cop (Load Balancer). You can add 50 more servers whenever traffic surges, and if 2 servers crash, the other 48 keep working without disruption!</li>
  </ul>
</div>

<div class="callout callout-key">
  <strong>The 99.9% ("Three Nines") Rule:</strong> 99% availability sounds good, but means 3.65 days of downtime per year! 99.99% ("Four Nines") means under 53 minutes of downtime per year.
</div>
""",

1: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">The fundamental engineering trade-offs: Why you can never have everything at 100% perfection.</p>
</div>

<h3>1. System Design is the Art of Trade-offs</h3>
<p>In college exams, questions have one right answer. In real-world system design, <strong>there are no solutions, only trade-offs</strong>. Every choice has a price:</p>
<ul>
  <li><strong>Performance vs Scalability:</strong> Performance is how fast your system serves <em>one single user</em>. Scalability is how well it maintains that speed when <em>1,000,000 users</em> arrive at once.</li>
  <li><strong>Latency vs Throughput:</strong> You can maximize throughput by processing data in big batches, but individual users have to wait longer (higher latency).</li>
  <li><strong>Availability vs Consistency:</strong> When a network cable cuts between two data centers, do you want to keep serving slightly outdated data (High Availability), or return an error until everything is synchronized (Strong Consistency)?</li>
</ul>

<h3>2. Clean Code &amp; CI/CD Pipelines</h3>
<ul>
  <li><strong>Modular Design:</strong> Breaking a giant mess of code into independent, reusable lego bricks.</li>
  <li><strong>CI/CD (Continuous Integration &amp; Continuous Delivery):</strong> Automated robots that test your code every time you save, and safely deploy it to servers without taking down the website.</li>
</ul>
""",

2: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">The CAP Theorem explained in 60 seconds with an everyday bank ATM analogy.</p>
</div>

<h3>1. What is the CAP Theorem?</h3>
<p>In any distributed system across multiple computers, you have three desires:</p>
<ul>
  <li><strong>C (Consistency):</strong> Every user sees the exact same latest data at the exact same moment.</li>
  <li><strong>A (Availability):</strong> Every request receives a successful response (no errors or timeouts).</li>
  <li><strong>P (Partition Tolerance):</strong> The system continues working even if network cables between servers break.</li>
</ul>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Bank ATM Network Cut Analogy</div>
  <p>Imagine you have ₹10,000 in your account. You insert your card in an ATM in Delhi, while your sister uses an ATM in Mumbai. Suddenly, the underground fiber cable between Delhi and Mumbai snaps! This is a <strong>Network Partition (P)</strong>.</p>
  <p>Now, what should the bank do?</p>
  <ul>
    <li><strong>Choice 1 (Consistency over Availability — CP):</strong> The ATM says: <em>"Network issue, transaction canceled."</em> It refuses to dispense money because it cannot confirm if your sister withdrew it. Safe from fraud, but the ATM is unavailable!</li>
    <li><strong>Choice 2 (Availability over Consistency — AP):</strong> The ATM dispenses the cash immediately. It stays available, but runs the risk that both of you withdraw ₹10,000 at the same time!</li>
  </ul>
</div>

<div class="callout callout-key">
  <strong>The Rule:</strong> Because network cables in the real world will always occasionally fail (P is unavoidable), you MUST choose between <strong>Consistency (CP)</strong> and <strong>Availability (AP)</strong> during a network split!
</div>
""",

3: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Functional vs Non-functional requirements, and the difference between HLD and LLD.</p>
</div>

<h3>1. Functional vs Non-Functional Requirements</h3>
<ul>
  <li><strong>Functional Requirements (What it does):</strong> The business features users interact with. <em>"Users can upload photos, search for friends, and post comments."</em></li>
  <li><strong>Non-Functional Requirements (How well it does it):</strong> The system quality standards. <em>"Photos must load in under 200 ms, system must support 99.99% uptime, and passwords must be encrypted."</em></li>
</ul>

<h3>2. High-Level Design (HLD) vs Low-Level Design (LLD)</h3>
<table>
  <thead><tr><th>Aspect</th><th>High-Level Design (HLD)</th><th>Low-Level Design (LLD)</th></tr></thead>
  <tbody>
    <tr><td><strong>Analogy</strong></td><td>The architect\'s blueprint of a skyscraper.</td><td>The electrical wiring diagrams and pipe fittings.</td></tr>
    <tr><td><strong>Scope</strong></td><td>Big picture: Load Balancers, API Gateways, Caches, Database types, Microservices.</td><td>Code details: Class diagrams, Design Patterns (Singleton, Factory), method names, DB column types.</td></tr>
    <tr><td><strong>Audience</strong></td><td>System architects, CTOs, engineering managers.</td><td>Developers writing the actual code.</td></tr>
  </tbody>
</table>

<h3>3. Back-of-the-Envelope Calculations</h3>
<p>Quick mental math to estimate how much hardware your system needs:</p>
<p>If your app has <strong>100 Million daily active users</strong>, and each user makes 10 requests a day:</p>
<div class="formula">100M × 10 = 1 Billion requests / day ≈ 12,000 Queries Per Second (QPS)!</div>
""",

4: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Monoliths, Microservices, and Event-Driven Architecture compared with zero confusion.</p>
</div>

<h3>1. The Monolith vs Microservices</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 Swiss Army Knife vs Specialized Toolkit</div>
  <ul>
    <li><strong>Monolith:</strong> A giant all-in-one application. User auth, shopping cart, payments, and recommendations all live in one single codebase. Simple to build and deploy at first, but if the recommendation module has a memory leak, the whole store crashes!</li>
    <li><strong>Microservices:</strong> Breaking the app into small independent services (Auth Service, Payment Service, Cart Service) that talk via network APIs. If payments crash, users can still browse products! Teams can deploy updates independently without touching the rest of the company.</li>
  </ul>
</div>

<h3>2. Event-Driven Architecture: The Restaurant Buzzer</h3>
<p>In traditional synchronous calls, Service A calls Service B and freezes waiting for an answer. In <strong>Event-Driven Architecture</strong>, Service A simply emits an event to a message broker (like Apache Kafka): <em>"Order #401 placed!"</em></p>
<p>It\'s like ordering food at a food court: they hand you a vibrating buzzer and you sit down. When the food is ready, the buzzer buzzes. Neither party waits on the other!</p>
""",

5: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Database design lifecycle: How to build a clean database schema from scratch.</p>
</div>

<h3>1. The 3 Phases of Database Design</h3>
<ol>
  <li><strong>Requirements Analysis:</strong> What data does the business need to store? (e.g. student names, roll numbers, registered courses, exam marks).</li>
  <li><strong>Logical Design (ER Diagram):</strong> Drawing Entities (boxes), Attributes (ovals), and Relationships (diamonds). For example, <em>"One Student registers for Many Courses."</em></li>
  <li><strong>Physical Design:</strong> Creating actual SQL tables with primary keys, foreign keys, index strategies, and data types (<code>VARCHAR</code>, <code>INT</code>, <code>TIMESTAMP</code>).</li>
</ol>

<div class="callout callout-tip">
  <strong>Key Tip:</strong> Never jump straight into SQL code without sketching the ER diagram first. Fixing a bad table design after 1 million rows are stored is an engineering nightmare!
</div>
""",

6: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Normalization: Eliminating duplicate data so your database stays tidy and consistent.</p>
</div>

<h3>1. Why Do We Normalize?</h3>
<p>If you store a teacher\'s phone number in 500 student rows, what happens when the teacher changes their phone? You have to update 500 rows. If you miss one row, your database is corrupted (an <strong>Update Anomaly</strong>)!</p>

<h3>2. The Normal Forms Simplified</h3>
<ul>
  <li><strong>1NF (First Normal Form):</strong> <em>Atomic values</em>. No lists inside a cell! Instead of storing <code>"Java, Python, C++"</code> in one column, create separate rows or tables.</li>
  <li><strong>2NF (Second Normal Form):</strong> Must be in 1NF + <em>no partial dependencies</em>. Every non-key column must depend on the FULL composite primary key, not just part of it.</li>
  <li><strong>3NF (Third Normal Form):</strong> Must be in 2NF + <em>no transitive dependencies</em>. Column A cannot depend on Column B which depends on Primary Key. (e.g. Student ID → ZipCode → City; move City to a separate Zip table!).</li>
  <li><strong>BCNF (Boyce-Codd Normal Form):</strong> A stricter 3NF. For every functional dependency <code>X → Y</code>, <code>X</code> MUST be a candidate key (super key).</li>
</ul>

<div class="callout callout-key">
  <strong>The Famous Catchphrase:</strong> Every non-key attribute must depend on <em>"the key, the whole key, and nothing but the key, so help me Codd!"</em>
</div>
""",

7: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">ACID properties: The four unbreakable promises that protect your database during money transfers.</p>
</div>

<h3>1. What is an ACID Transaction?</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Bank Transfer Example</div>
  <p>You send ₹1,000 from your account to your friend. This requires two steps: 1) Deduct ₹1,000 from you. 2) Add ₹1,000 to friend. What happens if lightning strikes the server right between step 1 and step 2?</p>
</div>

<h3>2. The Four ACID Guarantees</h3>
<table>
  <thead><tr><th>Letter</th><th>Property</th><th>What It Guarantees</th></tr></thead>
  <tbody>
    <tr><td><strong>A</strong></td><td><strong>Atomicity</strong> (All or Nothing)</td><td>Either the entire transfer succeeds, or if anything fails, the whole transaction rolls back as if it never started. You never lose your money!</td></tr>
    <tr><td><strong>C</strong></td><td><strong>Consistency</strong> (Rules Enforced)</td><td>Account balances cannot drop below zero. Database constraints are never violated.</td></tr>
    <tr><td><strong>I</strong></td><td><strong>Isolation</strong> (No Sneaky Peeking)</td><td>If 100 people transfer money simultaneously, each transaction executes as if it were the only one running on the server.</td></tr>
    <tr><td><strong>D</strong></td><td><strong>Durability</strong> (Saved Forever)</td><td>Once the transaction confirms "Success", the record is written to disk. Even if the server loses power 1 millisecond later, the data is safe!</td></tr>
  </tbody>
</table>
""",

8: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Scaling databases: Indexes for fast reads, Replication for backup, and Sharding for infinite storage.</p>
</div>

<h3>1. Database Indexing: The Book Index</h3>
<p>If you want to find "Binary Search" in an 800-page book without an index, you must read all 800 pages (a <strong>Full Table Scan</strong>, very slow!). With an index at the back, you look up "Binary Search → page 214" in 1 second. Database indexes (like B+ Trees) do the exact same thing for SQL queries.</p>

<h3>2. Replication: Master and Followers</h3>
<ul>
  <li><strong>Primary (Leader) DB:</strong> Handles all writes (INSERT, UPDATE, DELETE).</li>
  <li><strong>Replica (Follower) DBs:</strong> Copies data from the primary and handles all read queries. 95% of web traffic is reads, so you can add 5 read replicas to handle massive surges!</li>
</ul>

<h3>3. Sharding: Splitting the Bookshelf</h3>
<p>When a database table becomes so huge it cannot fit on one computer\'s hard drive, you <strong>shard</strong> (split) it across multiple computers. For example, users with names starting A–M live on Server 1, and N–Z live on Server 2!</p>
""",

9: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">SQL vs NoSQL: How to choose between strict tables and flexible documents.</p>
</div>

<h3>1. The 4 Big Families of NoSQL</h3>
<table>
  <thead><tr><th>NoSQL Type</th><th>Popular Example</th><th>Best For</th></tr></thead>
  <tbody>
    <tr><td><strong>Document Store</strong></td><td>MongoDB</td><td>JSON-like dynamic data where schema changes often (e.g. user profiles, blog posts).</td></tr>
    <tr><td><strong>Key-Value Store</strong></td><td>Redis, DynamoDB</td><td>Superfast in-memory caching and session storage (sub-millisecond reads).</td></tr>
    <tr><td><strong>Wide-Column</strong></td><td>Apache Cassandra</td><td>Massive time-series write throughput (e.g. IoT sensor logs, WhatsApp chat histories).</td></tr>
    <tr><td><strong>Graph Database</strong></td><td>Neo4j</td><td>Complex relationships (e.g. social networks "friends of friends", fraud detection rings).</td></tr>
  </tbody>
</table>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Quick Rule of Thumb</div>
  <p>Need strict financial transactions and complex joins? Choose <strong>SQL (PostgreSQL / MySQL)</strong>. Need massive scale, flexible JSON fields, or sub-millisecond caching? Choose <strong>NoSQL</strong>.</p>
</div>
""",

10: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Networking essentials: TCP, UDP, HTTP versions, DNS, and Content Delivery Networks.</p>
</div>

<h3>1. TCP vs UDP in 10 Seconds</h3>
<ul>
  <li><strong>TCP (Reliable Phone Call):</strong> Checks that every packet arrived in order. If a packet gets lost, it resends it. Used for web pages, file downloads, and banking.</li>
  <li><strong>UDP (Live Radio Broadcast):</strong> Fires packets as fast as possible without waiting for confirmation. If a packet drops, who cares! Used for live video streaming, multiplayer games, and VoIP voice calls.</li>
</ul>

<h3>2. DNS: The Internet\'s Phonebook</h3>
<p>Computers speak in IP addresses like <code>142.250.190.46</code>. Humans remember names like <code>google.com</code>. The <strong>Domain Name System (DNS)</strong> translates human domain names into computer IP addresses.</p>

<h3>3. CDN (Content Delivery Network): Local Warehouses</h3>
<p>If your website images are hosted on a server in California, a student in New Delhi has to wait 250 milliseconds for the signal to cross the Pacific Ocean. A <strong>CDN</strong> keeps copies of your images in local servers in Mumbai, Delhi, and Bangalore so they load in under 15 milliseconds!</p>
""",

11: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">APIs, Gateways, and Rate Limiting: How services talk to each other without chaos.</p>
</div>

<h3>1. REST vs GraphQL vs gRPC</h3>
<table>
  <thead><tr><th>API Style</th><th>How It Works</th><th>Best Used For</th></tr></thead>
  <tbody>
    <tr><td><strong>REST</strong></td><td>Uses standard HTTP methods (<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>) with JSON payloads.</td><td>Standard web and mobile public APIs.</td></tr>
    <tr><td><strong>GraphQL</strong></td><td>Client requests <em>exactly</em> the fields it needs in one query (no over-fetching!).</td><td>Mobile apps with slow mobile data.</td></tr>
    <tr><td><strong>gRPC</strong></td><td>Uses HTTP/2 and binary Protocol Buffers. Blazing fast!</td><td>Internal microservices communicating inside a data center.</td></tr>
  </tbody>
</table>

<h3>2. API Gateway: The Office Receptionist</h3>
<p>Instead of exposing 20 different microservices directly to the open internet, users only connect to the <strong>API Gateway</strong>. The Gateway checks authentication, monitors traffic, blocks hackers, and routes requests to the right service.</p>

<h3>3. Rate Limiting: Preventing the Stampede</h3>
<p>Caps how many requests a user or bot can make (e.g. <em>"Max 100 requests per minute per IP"</em>). Protects your servers from crashing under DoS attacks or rogue scripts.</p>
""",

12: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Load balancing: Distributing incoming traffic so no single server gets overwhelmed.</p>
</div>

<h3>1. What is a Load Balancer?</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Supermarket Cashier Line</div>
  <p>Imagine a busy supermarket with 10 cashiers. If all 500 customers try to rush Cashier #1, Cashier #1 collapses while the other 9 cashiers sit idle! A <strong>Load Balancer</strong> acts like a smart floor manager directing the next customer in line to the cashier with the shortest queue.</p>
</div>

<h3>2. Load Balancing Algorithms</h3>
<ul>
  <li><strong>Round Robin:</strong> Sends request 1 to Server A, request 2 to Server B, request 3 to Server C, then repeats. Simple and fair.</li>
  <li><strong>Least Connections:</strong> Sends the request to whichever server currently has the fewest active users.</li>
  <li><strong>Consistent Hashing:</strong> Hashes user IDs onto a virtual ring. Ensures a specific user\'s requests always land on the same cache server, while gracefully handling servers joining or leaving the cluster!</li>
</ul>

<h3>3. L4 vs L7 Load Balancing</h3>
<ul>
  <li><strong>Layer 4 (Transport Layer):</strong> Fast and simple. Routes based purely on IP address and Port number without looking inside the message.</li>
  <li><strong>Layer 7 (Application Layer):</strong> Smart and content-aware. Looks at the HTTP URL or cookies (e.g. sends <code>/video/*</code> requests to Video Servers, and <code>/api/*</code> to App Servers).</li>
</ul>
"""
}
