"""System Design (24CSE0318) — ST-1: lectures 1-17."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Fundamentals — Availability, Reliability, Scalability, Maintainability, Consistency, Fault Tolerance",
    "Lectures 1–4 · the qualities every design is judged on",
    r"""
<p><strong>System design</strong> is the process of defining the architecture, components, data and interfaces of a system to meet its requirements —
and, crucially, making the <em>trade-offs</em> between qualities that pull against each other.</p>

<h3>1. Availability</h3>
<p>The fraction of time a system is up and serving requests.</p>
<div class="formula">\[ Availability = \frac{Uptime}{Uptime + Downtime} = \frac{MTBF}{MTBF + MTTR} \]</div>
<table>
  <thead><tr><th>Availability</th><th>"Nines"</th><th>Downtime per year</th><th>Downtime per day</th></tr></thead>
  <tbody>
    <tr><td>99%</td><td>two nines</td><td>3.65 days</td><td>14.4 min</td></tr>
    <tr><td>99.9%</td><td>three nines</td><td>8.76 hours</td><td>1.44 min</td></tr>
    <tr><td>99.99%</td><td>four nines</td><td>52.6 minutes</td><td>8.6 s</td></tr>
    <tr><td>99.999%</td><td>five nines</td><td>5.26 minutes</td><td>0.86 s</td></tr>
  </tbody>
</table>
<p><strong>Components in series</strong> (all must work): A = A₁ × A₂. Two 99.9% services in series → 99.8%.<br>
<strong>Components in parallel</strong> (any one is enough): A = 1 − (1 − A₁)(1 − A₂). Two 99.9% replicas in parallel → 99.9999%.</p>

<h3>2. Reliability</h3>
<p>The probability a system performs correctly (right results, no data loss) over a period. <strong>Available ≠ reliable:</strong> a server that responds 24×7 with wrong balances is available but not reliable.
Measured with <strong>MTBF</strong> (mean time between failures) and <strong>MTTR</strong> (mean time to repair).</p>

<h3>3. Scalability — vertical vs horizontal</h3>
<table>
  <thead><tr><th></th><th>Vertical scaling (scale up)</th><th>Horizontal scaling (scale out)</th></tr></thead>
  <tbody>
    <tr><td>How</td><td>bigger machine: more CPU, RAM, disk</td><td>more machines behind a load balancer</td></tr>
    <tr><td>Limit</td><td>hardware ceiling; cost grows steeply</td><td>practically unlimited</td></tr>
    <tr><td>Failure</td><td>single point of failure</td><td>redundancy built in</td></tr>
    <tr><td>Complexity</td><td>simple, no code changes</td><td>needs stateless services, load balancing, data partitioning</td></tr>
    <tr><td>Downtime to scale</td><td>often requires a restart</td><td>add nodes live</td></tr>
    <tr><td>Example</td><td>upgrading a DB server from 16 GB to 128 GB RAM</td><td>adding web servers during a sale; database sharding</td></tr>
  </tbody>
</table>

<h3>4. Maintainability</h3>
<p>How easily engineers can understand, fix and change the system. Three aspects (Kleppmann): <strong>operability</strong> (easy to run), <strong>simplicity</strong> (easy to understand), <strong>evolvability</strong> (easy to change).
Achieved through modular design, clean code, tests, documentation and CI/CD (next topic).</p>

<h3>5. Consistency</h3>
<p>Every read sees the latest write (or an error). In distributed systems, replicas can briefly disagree — the CAP topic covers the consistency models.</p>

<h3>6. Fault tolerance</h3>
<p>Continuing to operate, perhaps degraded, when components fail. Techniques:</p>
<ul>
  <li><strong>Redundancy &amp; replication</strong> — no single point of failure (SPOF)</li>
  <li><strong>Failover</strong> — active-passive or active-active</li>
  <li><strong>Health checks</strong> and automatic restarts</li>
  <li><strong>Retries with exponential backoff</strong>, timeouts, <strong>circuit breakers</strong></li>
  <li><strong>Graceful degradation</strong> — show cached recommendations if the recommender is down</li>
</ul>

<h3>7. Latency and throughput</h3>
<table>
  <thead><tr><th>Latency</th><th>Throughput</th></tr></thead>
  <tbody>
    <tr><td>time to serve <strong>one</strong> request (ms)</td><td>number of requests served <strong>per unit time</strong> (req/s, QPS)</td></tr>
    <tr><td>report percentiles: p50, p95, <strong>p99</strong> (tail latency)</td><td>limited by the slowest stage (bottleneck)</td></tr>
    <tr><td>analogy: how long one car takes on the highway</td><td>how many cars pass per hour</td></tr>
  </tbody>
</table>
"""
    + check("A web tier (99.9% available) and a database (99.9%) are both required to serve a request. Overall availability is about:",
            ["99.9%", "99.8%", "99.99%", "99.0%"], "b",
            "Series components multiply: 0.999 × 0.999 ≈ 0.998.")
    + check("Adding more servers behind a load balancer is:",
            ["vertical scaling", "horizontal scaling", "sharding a cache", "denormalisation"], "b",
            "Scaling out adds machines instead of making one machine bigger.")
))

TOPICS.append(topic(
    "Trade-offs — Performance vs Scalability, Latency vs Throughput, Availability vs Consistency; Modular Design, Clean Code & CI/CD",
    "Lectures 1–4 · no design wins on every axis",
    r"""
<h3>1. Performance vs scalability</h3>
<ul>
  <li>A <strong>performance</strong> problem: the system is slow for a <em>single</em> user.</li>
  <li>A <strong>scalability</strong> problem: the system is fast for one user but slow <em>under heavy load</em>.</li>
  <li>A service is scalable if adding resources increases performance proportionally. Optimising one request (caching, better queries) does not by itself make a system scale.</li>
</ul>

<h3>2. Latency vs throughput</h3>
<p>Aim for <strong>maximal throughput with acceptable latency</strong>. Batching raises throughput but adds waiting time for each item; processing items one by one lowers latency but reduces throughput.
Example: a database that flushes writes every 100 ms handles more writes per second, but each write waits up to 100 ms.</p>

<h3>3. Availability vs consistency</h3>
<p>During a network partition a distributed system must either reject some requests to stay consistent or keep answering with possibly stale data to stay available — this is the <strong>CAP theorem</strong> (next topic).
Banking ledgers choose consistency; social media feeds and shopping carts choose availability.</p>

<h3>4. Maintainability — modular design</h3>
<ul>
  <li><strong>High cohesion</strong> — each module does one well-defined job.</li>
  <li><strong>Low coupling</strong> — modules depend on each other through small, stable interfaces.</li>
  <li><strong>Separation of concerns</strong> — presentation, business logic and data access in different layers.</li>
  <li><strong>Information hiding</strong> — expose what, hide how.</li>
</ul>

<h3>5. Clean code principles</h3>
<table>
  <thead><tr><th>Principle</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>Meaningful names</td><td><code>calculateMonthlyEmi()</code>, not <code>calc2()</code></td></tr>
    <tr><td>Small functions</td><td>do one thing, one level of abstraction</td></tr>
    <tr><td><strong>DRY</strong></td><td>Don't Repeat Yourself — one source of truth for each piece of logic</td></tr>
    <tr><td><strong>KISS</strong></td><td>Keep It Simple — avoid needless cleverness</td></tr>
    <tr><td><strong>YAGNI</strong></td><td>You Aren't Gonna Need It — don't build speculative features</td></tr>
    <tr><td><strong>SOLID</strong></td><td>Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion</td></tr>
    <tr><td>Tests</td><td>unit tests document behaviour and make refactoring safe</td></tr>
  </tbody>
</table>

<h3>6. CI/CD pipelines</h3>
<table>
  <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><strong>Continuous Integration</strong></td><td>developers merge to the main branch often; every push automatically builds and runs tests</td></tr>
    <tr><td><strong>Continuous Delivery</strong></td><td>every passing build is deployable; release to production is one manual click</td></tr>
    <tr><td><strong>Continuous Deployment</strong></td><td>every passing build goes to production automatically</td></tr>
  </tbody>
</table>
<div class="formula">commit → build → unit tests → static analysis / security scan → package (Docker image) → deploy to staging → integration tests → deploy to production → monitor</div>
<p>Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI; Docker and Kubernetes for packaging and running. Safe release strategies: <strong>blue–green</strong> (switch traffic between two identical environments), <strong>canary</strong> (release to a small % first), <strong>rolling</strong> updates, feature flags.</p>
"""
    + check("A page loads in 80 ms for one user but takes 6 seconds when 10,000 users are online. This is primarily a:",
            ["performance problem", "scalability problem", "consistency problem", "maintainability problem"], "b",
            "It is fast for a single user and degrades under load.")
))

TOPICS.append(topic(
    "CAP Theorem & Consistency Patterns — Weak, Eventual, Strong",
    "Lectures 5–8 · what a distributed system gives up during a partition",
    r"""
<h3>1. CAP theorem (Brewer, 2000)</h3>
<p>A distributed data store can guarantee at most <strong>two of three</strong> properties at the same time:</p>
<ul>
  <li><strong>C — Consistency:</strong> every read receives the most recent write or an error.</li>
  <li><strong>A — Availability:</strong> every request receives a non-error response (without guarantee it is the latest data).</li>
  <li><strong>P — Partition tolerance:</strong> the system keeps working despite messages being lost between nodes.</li>
</ul>
<div class="callout callout-key"><strong>The practical reading:</strong> networks <em>will</em> partition, so P is not optional. The real choice is what to do <em>during</em> a partition:
<strong>CP</strong> — refuse or delay some requests to stay consistent; <strong>AP</strong> — answer everything, accepting stale reads, and reconcile later.</div>
<table>
  <thead><tr><th>Choice</th><th>Behaviour in a partition</th><th>Examples</th><th>Good for</th></tr></thead>
  <tbody>
    <tr><td><strong>CP</strong></td><td>some nodes return errors / time out</td><td>HBase, MongoDB (default majority writes), ZooKeeper, etcd, traditional RDBMS clusters</td><td>payments, inventory counts, bookings</td></tr>
    <tr><td><strong>AP</strong></td><td>all nodes answer; data may diverge temporarily</td><td>Cassandra, DynamoDB, CouchDB, DNS</td><td>social feeds, likes, shopping carts, product catalogue</td></tr>
    <tr><td>CA</td><td>only possible without partitions — a single-node system</td><td>single-server PostgreSQL / MySQL</td><td>—</td></tr>
  </tbody>
</table>
<p><strong>PACELC</strong> extends CAP: if <strong>P</strong>artitioned choose <strong>A</strong> or <strong>C</strong>; <strong>E</strong>lse (normal operation) choose <strong>L</strong>atency or <strong>C</strong>onsistency.</p>

<h3>2. Consistency patterns</h3>
<table>
  <thead><tr><th>Pattern</th><th>After a write, readers…</th><th>How</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td><strong>Weak</strong></td><td>may or may not ever see it; best effort</td><td>no replication guarantee</td><td>VoIP / video calls, live game state, memcached</td></tr>
    <tr><td><strong>Eventual</strong></td><td>will see it after some delay (typically ms)</td><td>asynchronous replication</td><td>DNS, email, social media likes, DynamoDB default reads</td></tr>
    <tr><td><strong>Strong</strong></td><td>see it immediately</td><td>synchronous replication, consensus (Raft, Paxos), quorum reads/writes</td><td>bank transfers, RDBMS transactions, file systems</td></tr>
  </tbody>
</table>

<h3>3. Quorums</h3>
<p>With N replicas, write to W and read from R. If <strong>R + W &gt; N</strong>, every read overlaps at least one replica with the latest write → strong consistency.
Example N = 3, W = 2, R = 2. Smaller W and R give lower latency and higher availability but only eventual consistency.</p>

<h3>4. Related guarantees you may see in MCQs</h3>
<ul>
  <li><strong>Read-your-writes</strong> — a user always sees their own updates (e.g. route their reads to the leader for a few seconds).</li>
  <li><strong>Monotonic reads</strong> — a user never sees data go "back in time".</li>
  <li><strong>ACID vs BASE</strong> — relational transactions vs <em>Basically Available, Soft state, Eventually consistent</em> NoSQL systems.</li>
</ul>
"""
    + check("During a network partition, a system keeps accepting writes on both sides and merges conflicts later. It favours:",
            ["CP", "AP", "CA", "ACID"], "b",
            "It keeps availability at the cost of temporary inconsistency.")
    + check("N = 5 replicas. Which (W, R) guarantees that reads see the latest write?",
            ["W = 2, R = 2", "W = 3, R = 3", "W = 1, R = 3", "W = 2, R = 3"], "b",
            "R + W must exceed N: 3 + 3 = 6 > 5. The others sum to 5 or less.")
))

TOPICS.append(topic(
    "Requirements, High-Level Design vs Low-Level Design & Back-of-the-Envelope Estimation",
    "Lectures 5–8 · starting a design the right way",
    r"""
<h3>1. Functional vs non-functional requirements</h3>
<table>
  <thead><tr><th></th><th>Functional</th><th>Non-functional</th></tr></thead>
  <tbody>
    <tr><td>Describes</td><td><strong>what</strong> the system does</td><td><strong>how well</strong> it does it (quality attributes)</td></tr>
    <tr><td>Examples (food delivery app)</td><td>search restaurants, place order, pay, track rider, rate order</td><td>p99 search &lt; 300 ms, 99.99% availability, handles 50k orders/min at peak, PCI-DSS compliant, GDPR/DPDP</td></tr>
    <tr><td>Verified by</td><td>functional / acceptance tests</td><td>load, performance, security and chaos tests</td></tr>
  </tbody>
</table>
<p>Common NFRs: scalability, availability, reliability, latency, throughput, consistency, durability, security, maintainability, observability, cost.</p>

<h3>2. A repeatable design interview / case study flow</h3>
<ol>
  <li><strong>Clarify requirements</strong> — functional scope, users, scale, NFRs. Write them down.</li>
  <li><strong>Estimate</strong> — traffic, storage, bandwidth.</li>
  <li><strong>Define the API</strong> — main endpoints and payloads.</li>
  <li><strong>Data model</strong> — entities, relationships, SQL vs NoSQL.</li>
  <li><strong>High-level design</strong> — boxes and arrows: clients, load balancer, services, databases, caches, queues, CDN.</li>
  <li><strong>Deep dive</strong> — the hardest components, bottlenecks, scaling, failure handling.</li>
  <li><strong>Trade-offs and wrap-up</strong>.</li>
</ol>

<h3>3. Back-of-the-envelope estimation</h3>
<details class="solution"><summary>Worked example — a URL shortener</summary>
<p>Assume 100 million new URLs per month and a 100 : 1 read-to-write ratio.</p>
<ul>
  <li>Writes: 100M / (30 × 24 × 3600 ≈ 2.6M s) ≈ <strong>40 writes/s</strong> (peak maybe 2–3× → ~100/s).</li>
  <li>Reads: 40 × 100 = <strong>4,000 reads/s</strong>.</li>
  <li>Storage: 100M × 12 months × 5 years = 6 billion records. At ~500 bytes each ≈ <strong>3 TB</strong>.</li>
  <li>Cache the hottest 20% of daily reads: 4,000 × 86,400 ≈ 350M reads/day → 20% × 350M × 500 B ≈ <strong>35 GB</strong> of memory.</li>
</ul>
</details>
<table>
  <thead><tr><th>Handy number</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Seconds in a day</td><td>86,400 ≈ 10⁵</td></tr>
    <tr><td>1 million requests/day</td><td>≈ 12 requests/second</td></tr>
    <tr><td>1 KB / 1 MB / 1 GB / 1 TB</td><td>10³ / 10⁶ / 10⁹ / 10¹² bytes (approx.)</td></tr>
    <tr><td>Main memory reference</td><td>~100 ns</td></tr>
    <tr><td>SSD random read</td><td>~0.1 ms</td></tr>
    <tr><td>Round trip within a data centre</td><td>~0.5 ms</td></tr>
    <tr><td>Disk seek (HDD)</td><td>~10 ms</td></tr>
    <tr><td>Round trip India ↔ US</td><td>~150–250 ms</td></tr>
  </tbody>
</table>

<h3>4. High-Level Design (HLD) vs Low-Level Design (LLD)</h3>
<table>
  <thead><tr><th></th><th>HLD</th><th>LLD</th></tr></thead>
  <tbody>
    <tr><td>Also called</td><td>macro / architecture design</td><td>micro / detailed design</td></tr>
    <tr><td>Focus</td><td>overall architecture, components, data flow, technologies</td><td>classes, methods, interfaces, algorithms, DB schema details</td></tr>
    <tr><td>Audience</td><td>architects, stakeholders, whole team</td><td>developers implementing a module</td></tr>
    <tr><td>Artifacts</td><td>architecture diagram, context diagram, deployment diagram, tech stack</td><td>class diagrams, sequence diagrams, ER/table definitions, pseudocode, API contracts</td></tr>
    <tr><td>Example question</td><td>"Where does the cache sit? Which DB?"</td><td>"What does the <code>ParkingLot</code> class look like?"</td></tr>
    <tr><td>Order</td><td>first</td><td>after HLD</td></tr>
  </tbody>
</table>
"""
    + check("\"The checkout API must respond within 200 ms at the 99th percentile\" is a:",
            ["functional requirement", "non-functional requirement", "low-level design", "use case"], "b",
            "It constrains how well the system performs, not what it does.")
    + check("About how many requests per second is 86.4 million requests per day?",
            ["100", "1,000", "10,000", "86"], "b",
            "86,400,000 / 86,400 seconds = 1,000 requests per second.")
))

TOPICS.append(topic(
    "Architectural Patterns — Monolith, Microservices, Event-Driven, Serverless, Service Mesh, BFF & API Composition",
    "Lectures 5–8 · how to structure the system",
    r"""
<h3>1. Monolithic architecture</h3>
<p>One codebase, deployed as one unit, usually with one database. UI, business logic and data access live together.</p>
<ul>
  <li>✔ Simple to develop, test, debug and deploy early on; fast in-process calls; easy transactions.</li>
  <li>✘ The whole app must be redeployed for any change; one bug can take everything down; scales only as a whole; codebase becomes tangled; one technology stack.</li>
</ul>

<h3>2. Microservices</h3>
<p>The application is split into small, independently deployable services, each owning a business capability and <strong>its own database</strong>, communicating over the network (REST, gRPC, messaging).</p>
<ul>
  <li>✔ Independent deployment and scaling; fault isolation; small teams own services; different tech per service.</li>
  <li>✘ Distributed-system complexity: network latency and failures, distributed transactions (Saga pattern), data consistency, observability, many moving parts, DevOps maturity required.</li>
</ul>

<h3>3. Event-driven architecture (EDA)</h3>
<p>Components communicate by producing and consuming <strong>events</strong> ("OrderPlaced") through a broker such as <strong>Kafka</strong>, RabbitMQ or AWS SNS/SQS. Producers don't know who consumes.</p>
<ul>
  <li>✔ Loose coupling, asynchronous processing, easy to add new consumers, absorbs traffic spikes, near real-time.</li>
  <li>✘ Eventual consistency, harder debugging and tracing, duplicate / out-of-order events (consumers must be idempotent), broker is critical infrastructure.</li>
  <li>Patterns: pub/sub, event sourcing (store events as the source of truth), CQRS (separate read and write models).</li>
</ul>

<h3>4. Serverless</h3>
<p>Run functions (AWS Lambda, Azure Functions, Google Cloud Functions) or managed services without managing servers; billed per execution; scales to zero.</p>
<ul>
  <li>✔ No server ops, automatic scaling, pay only for use, fast to build event handlers.</li>
  <li>✘ <strong>Cold starts</strong>, execution time limits, vendor lock-in, harder local testing, can get expensive at constant high load.</li>
</ul>

<h3>5. Monolith vs microservices vs serverless</h3>
<table>
  <thead><tr><th></th><th>Monolith</th><th>Microservices</th><th>Serverless</th></tr></thead>
  <tbody>
    <tr><td>Deployment unit</td><td>whole app</td><td>each service</td><td>each function</td></tr>
    <tr><td>Scaling</td><td>entire app</td><td>per service</td><td>automatic per function</td></tr>
    <tr><td>Operational overhead</td><td>low</td><td>high</td><td>lowest (provider manages)</td></tr>
    <tr><td>Cost model</td><td>always-on servers</td><td>always-on per service</td><td>pay per invocation</td></tr>
    <tr><td>Best for</td><td>startups, small teams, MVPs</td><td>large products, many teams</td><td>event-driven, spiky or low traffic workloads</td></tr>
  </tbody>
</table>

<h3>6. Supporting patterns</h3>
<table>
  <thead><tr><th>Pattern</th><th>Problem solved</th><th>How</th></tr></thead>
  <tbody>
    <tr><td><strong>API Gateway</strong></td><td>clients shouldn't call dozens of services directly</td><td>single entry point: routing, auth, rate limiting, TLS termination</td></tr>
    <tr><td><strong>Service mesh</strong></td><td>service-to-service networking concerns repeated in every service</td><td>a <em>sidecar proxy</em> (Envoy) next to each service handles mTLS, retries, timeouts, traffic splitting, metrics; control plane: Istio, Linkerd</td></tr>
    <tr><td><strong>BFF (Backend for Frontend)</strong></td><td>mobile, web and TV clients need different data shapes</td><td>a dedicated backend per client type that tailors and aggregates responses</td></tr>
    <tr><td><strong>API composition</strong></td><td>a query needs data owned by several services</td><td>a composer calls each service and joins the results in memory (e.g. order details = order + customer + payment + shipment)</td></tr>
  </tbody>
</table>
<div class="callout callout-tip"><strong>Case study hint (YouTube upload):</strong> upload service stores the raw file in object storage, publishes a "VideoUploaded" event; transcoding workers consume it and produce multiple resolutions; a metadata service updates the DB; the CDN serves the final segments.</div>
"""
    + check("Each service owning its own database and being deployed independently is a defining trait of:",
            ["monolithic architecture", "microservices", "a service mesh", "vertical scaling"], "b",
            "Independent deployment and data ownership per service define microservices.")
    + check("A separate backend tailored for the mobile app and another for the web app is the:",
            ["Saga pattern", "Backend for Frontend (BFF) pattern", "Circuit breaker pattern", "Sidecar pattern"], "b",
            "BFF gives each client type an API shaped for its needs.")
))

TOPICS.append(topic(
    "Database Design — What It Is, Steps & the Design Lifecycle",
    "Lectures 9–12 · requirement analysis → logical → physical",
    r"""
<h3>1. What is database design?</h3>
<p>Organising data into tables (or collections), relationships and constraints so that it is <strong>accurate, non-redundant, secure and efficient</strong> to query and change.
Bad design causes duplicate data, update anomalies, slow queries and painful migrations.</p>

<h3>2. Steps to a good design</h3>
<ol>
  <li><strong>Determine the purpose</strong> and the questions the data must answer.</li>
  <li><strong>Find and organise information</strong> — list every data item needed.</li>
  <li><strong>Divide into entities / tables</strong> — Student, Course, Enrolment.</li>
  <li><strong>Turn items into columns</strong> with proper data types; store atomic values.</li>
  <li><strong>Choose primary keys</strong> — unique, non-null, stable (surrogate IDs are common).</li>
  <li><strong>Set up relationships</strong> with foreign keys (1:1, 1:N, M:N via a junction table).</li>
  <li><strong>Refine</strong> — apply normalisation rules; add constraints (NOT NULL, UNIQUE, CHECK).</li>
  <li><strong>Plan indexes</strong> for frequent queries; review with sample data and queries.</li>
</ol>

<h3>3. Keys</h3>
<table>
  <thead><tr><th>Key</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>Super key</td><td>any set of attributes that uniquely identifies a row</td></tr>
    <tr><td>Candidate key</td><td>a minimal super key (no attribute can be removed)</td></tr>
    <tr><td>Primary key</td><td>the candidate key chosen as the main identifier</td></tr>
    <tr><td>Alternate key</td><td>candidate keys not chosen as primary</td></tr>
    <tr><td>Foreign key</td><td>attribute referencing a primary key in another table (referential integrity)</td></tr>
    <tr><td>Composite key</td><td>a key made of two or more attributes</td></tr>
  </tbody>
</table>

<h3>4. Database design lifecycle</h3>
<table>
  <thead><tr><th>Phase</th><th>Activities</th><th>Output</th></tr></thead>
  <tbody>
    <tr><td><strong>1. Requirement analysis</strong></td><td>interview stakeholders, study documents and existing systems, define data needs, transactions, volumes, security rules</td><td>requirements specification</td></tr>
    <tr><td><strong>2. Conceptual design</strong></td><td>identify entities, attributes, relationships and cardinality — technology independent</td><td><strong>ER diagram</strong></td></tr>
    <tr><td><strong>3. Logical design</strong></td><td>map ER to the relational model: tables, primary/foreign keys; <strong>normalise</strong></td><td>relational schema</td></tr>
    <tr><td><strong>4. Physical design</strong></td><td>choose DBMS, data types, <strong>indexes</strong>, partitioning, storage, access paths, security</td><td>DDL scripts, index plan</td></tr>
    <tr><td>5. Implementation</td><td>create objects, load data</td><td>running database</td></tr>
    <tr><td>6. Testing, operation &amp; maintenance</td><td>tune, back up, evolve schema</td><td>—</td></tr>
  </tbody>
</table>

<h3>5. ER to tables — mapping rules</h3>
<ul>
  <li>Strong entity → table with its attributes; key → primary key.</li>
  <li>1:N relationship → foreign key on the "many" side (Order has customer_id).</li>
  <li>M:N relationship → a junction table with both foreign keys as a composite primary key (Enrolment(student_id, course_id)).</li>
  <li>Multivalued attribute (phone numbers) → a separate table.</li>
  <li>Weak entity → table whose primary key includes the owner's key.</li>
</ul>
<pre><code class="language-sql">CREATE TABLE student (
    student_id  INT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(120) UNIQUE
);
CREATE TABLE course (
    course_code VARCHAR(12) PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    credits     INT CHECK (credits BETWEEN 1 AND 6)
);
CREATE TABLE enrolment (                          -- resolves the M:N relationship
    student_id  INT REFERENCES student(student_id),
    course_code VARCHAR(12) REFERENCES course(course_code),
    grade       CHAR(2),
    PRIMARY KEY (student_id, course_code)
);</code></pre>
"""
    + check("Choosing indexes and storage structures belongs to which phase of database design?",
            ["Requirement analysis", "Conceptual design", "Logical design", "Physical design"], "d",
            "Physical design decides how the logical schema is stored and accessed in a specific DBMS.")
))

TOPICS.append(topic(
    "Normalization — Anomalies, Functional Dependencies, 1NF, 2NF, 3NF & BCNF",
    "Lectures 9–12 · removing redundancy step by step",
    r"""
<h3>1. Why normalise? Anomalies</h3>
<p>Consider one wide table: <code>StudentCourse(roll, name, dept, hod, course, instructor)</code>.</p>
<ul>
  <li><strong>Insertion anomaly</strong> — cannot record a new department's HOD until some student enrols.</li>
  <li><strong>Update anomaly</strong> — the HOD's name repeats on every row; changing it in one row but not others makes the data inconsistent.</li>
  <li><strong>Deletion anomaly</strong> — deleting the last student of a course also deletes who teaches that course.</li>
</ul>

<h3>2. Functional dependency (FD)</h3>
<p>X → Y means the value of X determines the value of Y. roll → name; course → instructor.</p>
<ul>
  <li><strong>Partial dependency</strong> — a non-key attribute depends on <em>part</em> of a composite key.</li>
  <li><strong>Transitive dependency</strong> — non-key → non-key (roll → dept → hod).</li>
  <li><strong>Prime attribute</strong> — part of some candidate key.</li>
</ul>

<h3>3. The normal forms</h3>
<table>
  <thead><tr><th>Form</th><th>Rule</th><th>Removes</th></tr></thead>
  <tbody>
    <tr><td><strong>1NF</strong></td><td>every column holds atomic (single) values; no repeating groups; rows unique</td><td>multi-valued cells like "Maths, Physics"</td></tr>
    <tr><td><strong>2NF</strong></td><td>1NF + no <strong>partial</strong> dependency of a non-prime attribute on a candidate key</td><td>attributes depending on half of a composite key</td></tr>
    <tr><td><strong>3NF</strong></td><td>2NF + no <strong>transitive</strong> dependency: for every X → A, X is a super key or A is prime</td><td>non-key → non-key chains</td></tr>
    <tr><td><strong>BCNF</strong></td><td>for every non-trivial X → Y, X is a <strong>super key</strong></td><td>remaining anomalies where a non-key determines part of a key</td></tr>
  </tbody>
</table>
<div class="callout callout-key"><strong>Memory line:</strong> the key (1NF), the whole key (2NF), and nothing but the key (3NF) — so help me Codd. BCNF is a stricter 3NF.</div>

<h3>4. Worked example</h3>
<p><strong>Unnormalised:</strong></p>
<table>
  <thead><tr><th>roll</th><th>name</th><th>dept</th><th>hod</th><th>courses (code: instructor)</th></tr></thead>
  <tbody>
    <tr><td>101</td><td>Aman</td><td>CSE</td><td>Dr. Rao</td><td>CS301: Mehta, CS302: Gill</td></tr>
    <tr><td>102</td><td>Diya</td><td>ECE</td><td>Dr. Sen</td><td>CS301: Mehta</td></tr>
  </tbody>
</table>
<p><strong>1NF</strong> — one course per row, key (roll, course):<br>
<code>R(roll, course, name, dept, hod, instructor)</code></p>
<p>FDs: roll → name, dept; dept → hod; course → instructor.</p>
<p><strong>2NF</strong> — remove partial dependencies on (roll, course):<br>
<code>Student(roll, name, dept, hod)</code> · <code>Course(course, instructor)</code> · <code>Enrolment(roll, course)</code></p>
<p><strong>3NF</strong> — remove the transitive roll → dept → hod:<br>
<code>Student(roll, name, dept)</code> · <code>Department(dept, hod)</code> · <code>Course(course, instructor)</code> · <code>Enrolment(roll, course)</code></p>

<h3>5. 3NF but not BCNF</h3>
<p><code>Teaches(student, subject, teacher)</code> with rules: each teacher teaches one subject (teacher → subject), and for each subject a student has one teacher ((student, subject) → teacher).</p>
<ul>
  <li>Candidate keys: (student, subject) and (student, teacher). All attributes are prime → the table is in <strong>3NF</strong>.</li>
  <li>teacher → subject, but teacher is <strong>not a super key</strong> → violates <strong>BCNF</strong>.</li>
  <li>Decompose: <code>TeacherSubject(teacher, subject)</code> and <code>StudentTeacher(student, teacher)</code>. (BCNF decomposition is lossless but may not preserve every dependency.)</li>
</ul>

<h3>6. Denormalisation</h3>
<p>Deliberately adding redundancy (pre-joined tables, cached counts) to speed up read-heavy workloads — common in analytics and NoSQL. It trades write complexity and consistency risk for faster reads.</p>
"""
    + check("A table has composite key (order_id, product_id) and the column product_name depends only on product_id. The table violates:",
            ["1NF", "2NF", "3NF only", "BCNF only"], "b",
            "product_name depends on part of the composite key — a partial dependency.")
    + check("emp_id → dept_id and dept_id → dept_location in Employee(emp_id, dept_id, dept_location). The table violates:",
            ["1NF", "2NF", "3NF", "No normal form"], "c",
            "dept_location depends on emp_id only transitively through dept_id.")
))

TOPICS.append(topic(
    "Transactions & ACID, Isolation Levels, Indexing, Recovery & Backup",
    "Lectures 9–12 · keeping data correct and fast",
    r"""
<h3>1. Transactions and ACID</h3>
<p>A <strong>transaction</strong> is a logical unit of work — e.g. transfer ₹500: debit A, credit B — that must happen completely or not at all.</p>
<table>
  <thead><tr><th>Property</th><th>Guarantee</th><th>Mechanism</th></tr></thead>
  <tbody>
    <tr><td><strong>Atomicity</strong></td><td>all operations commit, or none do</td><td>undo logs, rollback</td></tr>
    <tr><td><strong>Consistency</strong></td><td>moves the DB from one valid state to another (constraints hold)</td><td>constraints, triggers, application logic</td></tr>
    <tr><td><strong>Isolation</strong></td><td>concurrent transactions don't interfere as if run one after another</td><td>locking, MVCC</td></tr>
    <tr><td><strong>Durability</strong></td><td>once committed, survives crashes</td><td>write-ahead log (WAL), replication</td></tr>
  </tbody>
</table>
<pre><code class="language-sql">BEGIN;
UPDATE account SET balance = balance - 500 WHERE id = 'A';
UPDATE account SET balance = balance + 500 WHERE id = 'B';
COMMIT;        -- or ROLLBACK; on any error</code></pre>
<p>Transaction states: active → partially committed → committed; or active → failed → aborted.</p>

<h3>2. Concurrency anomalies and isolation levels</h3>
<table>
  <thead><tr><th>Level</th><th>Dirty read</th><th>Non-repeatable read</th><th>Phantom read</th></tr></thead>
  <tbody>
    <tr><td>Read Uncommitted</td><td>possible</td><td>possible</td><td>possible</td></tr>
    <tr><td>Read Committed (PostgreSQL default)</td><td>prevented</td><td>possible</td><td>possible</td></tr>
    <tr><td>Repeatable Read (MySQL InnoDB default)</td><td>prevented</td><td>prevented</td><td>possible*</td></tr>
    <tr><td>Serializable</td><td>prevented</td><td>prevented</td><td>prevented</td></tr>
  </tbody>
</table>
<p>* InnoDB's next-key locking also blocks most phantoms. <strong>Dirty read</strong> = reading uncommitted data; <strong>non-repeatable</strong> = same row, different value on re-read; <strong>phantom</strong> = re-running a range query returns new rows.</p>

<h3>3. Indexing</h3>
<p>An index is a separate data structure that lets the DBMS find rows without scanning the whole table — like a book's index.</p>
<ul>
  <li><strong>B+ tree</strong> (default) — balanced; O(log n) lookups; supports ranges and ORDER BY. Leaf nodes are linked for range scans.</li>
  <li><strong>Hash index</strong> — O(1) equality lookups only, no ranges.</li>
  <li><strong>Clustered index</strong> — table rows are physically ordered by the key (one per table; InnoDB primary key).</li>
  <li><strong>Non-clustered / secondary index</strong> — separate structure pointing to rows (many allowed).</li>
  <li><strong>Composite index</strong> (last_name, first_name) — follows the <strong>leftmost prefix rule</strong>: helps WHERE last_name = … but not WHERE first_name = … alone.</li>
  <li><strong>Covering index</strong> — contains every column a query needs, so the table itself is never read.</li>
</ul>
<pre><code class="language-sql">CREATE INDEX idx_orders_customer_date ON orders (customer_id, order_date);
EXPLAIN SELECT * FROM orders WHERE customer_id = 42 AND order_date >= '2026-01-01';</code></pre>
<div class="callout callout-warning"><strong>Index costs:</strong> extra storage and slower INSERT/UPDATE/DELETE, because every index must be updated. Index columns used in WHERE, JOIN and ORDER BY with high selectivity — not every column.</div>

<h3>4. Recovery</h3>
<ul>
  <li><strong>Write-Ahead Logging (WAL)</strong> — changes are written to a log on stable storage <em>before</em> the data pages.</li>
  <li>After a crash: <strong>redo</strong> committed transactions whose changes weren't on disk; <strong>undo</strong> uncommitted ones.</li>
  <li><strong>Checkpoints</strong> periodically flush data so recovery only replays the log since the last checkpoint.</li>
  <li><strong>Shadow paging</strong> — an alternative that writes changes to new pages and swaps a pointer on commit.</li>
</ul>

<h3>5. Backup strategies</h3>
<table>
  <thead><tr><th>Type</th><th>Copies</th><th>Backup speed / size</th><th>Restore needs</th></tr></thead>
  <tbody>
    <tr><td><strong>Full</strong></td><td>everything</td><td>slowest, largest</td><td>just the full backup</td></tr>
    <tr><td><strong>Incremental</strong></td><td>changes since the <em>last backup of any type</em></td><td>fastest, smallest</td><td>last full + <em>every</em> incremental since</td></tr>
    <tr><td><strong>Differential</strong></td><td>changes since the <em>last full backup</em></td><td>grows each day</td><td>last full + latest differential</td></tr>
  </tbody>
</table>
<p>Also: point-in-time recovery (base backup + WAL archive), hot (online) vs cold (offline) backups, the <strong>3-2-1 rule</strong> (3 copies, 2 media types, 1 off-site), and two targets —
<strong>RPO</strong> (how much data you can afford to lose) and <strong>RTO</strong> (how long recovery may take). Test restores regularly.</p>
"""
    + check("A transaction reads a row that another transaction has updated but not yet committed. This is a:",
            ["phantom read", "dirty read", "non-repeatable read", "lost update"], "b",
            "Reading uncommitted changes is a dirty read; it is prevented from Read Committed upward.")
    + check("Full backup on Sunday, differential backups daily. The database fails on Thursday. You restore:",
            ["Sunday full + Monday, Tuesday, Wednesday differentials", "Sunday full + Wednesday's differential",
             "only Wednesday's differential", "every backup ever taken"], "b",
            "A differential contains all changes since the last full backup, so only the latest one is needed.")
))

TOPICS.append(topic(
    "Scaling Databases — Indexing, Replication & Sharding",
    "Lectures 13–14 · when one database server is not enough",
    r"""
<h3>1. First steps before distributing</h3>
<ol>
  <li>Add the right <strong>indexes</strong> and fix slow queries (<code>EXPLAIN</code>, avoid SELECT *, N+1 queries).</li>
  <li>Add a <strong>cache</strong> in front of hot reads (End Term).</li>
  <li><strong>Vertical scaling</strong> — a bigger DB server.</li>
  <li>Then <strong>replication</strong> for reads and availability, and <strong>sharding</strong> for writes and data size.</li>
</ol>

<h3>2. Replication — copies of the same data</h3>
<table>
  <thead><tr><th>Topology</th><th>How</th><th>Pros</th><th>Cons</th></tr></thead>
  <tbody>
    <tr><td><strong>Leader–follower</strong> (master–slave / primary–replica)</td><td>all writes to the leader; followers replicate and serve reads</td><td>simple; scales reads; failover to a follower</td><td>writes don't scale; replication lag → stale reads</td></tr>
    <tr><td><strong>Multi-leader</strong></td><td>several nodes accept writes (often one per region)</td><td>write availability across regions</td><td>write conflicts need resolution (last-write-wins, merges)</td></tr>
    <tr><td><strong>Leaderless</strong></td><td>clients write/read to several replicas using quorums</td><td>highly available (Dynamo, Cassandra)</td><td>eventual consistency, read repair</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Synchronous replication</th><th>Asynchronous replication</th></tr></thead>
  <tbody>
    <tr><td>leader waits for replica acknowledgement</td><td>leader acknowledges immediately, replicates later</td></tr>
    <tr><td>no data loss on leader failure; slower writes</td><td>fast writes; recent writes can be lost on failover; replicas lag</td></tr>
  </tbody>
</table>

<h3>3. Sharding (horizontal partitioning) — splitting the data</h3>
<p>Each shard holds a subset of the rows on a different server. Chosen by a <strong>shard key</strong>.</p>
<table>
  <thead><tr><th>Strategy</th><th>How</th><th>Pros</th><th>Cons</th></tr></thead>
  <tbody>
    <tr><td><strong>Range-based</strong></td><td>user_id 1–1M → shard 1, 1M–2M → shard 2</td><td>efficient range queries</td><td>hotspots (new users all land on the last shard)</td></tr>
    <tr><td><strong>Hash-based</strong></td><td>shard = hash(user_id) mod N</td><td>even distribution</td><td>range queries hit all shards; changing N reshuffles most keys (use <strong>consistent hashing</strong>)</td></tr>
    <tr><td><strong>Directory / lookup</strong></td><td>a lookup service maps key → shard</td><td>flexible rebalancing</td><td>lookup service is a bottleneck / SPOF</td></tr>
    <tr><td><strong>Geo-based</strong></td><td>by region (India users → Mumbai shard)</td><td>low latency, data residency</td><td>uneven load</td></tr>
  </tbody>
</table>
<div class="callout callout-warning"><strong>Costs of sharding:</strong> cross-shard joins and transactions become hard, rebalancing/resharding is painful, and a bad shard key (e.g. country for a single-country app) creates hot shards.
<strong>Partitioning</strong> within one server (table partitions) is simpler; <strong>vertical partitioning</strong> splits columns or tables by feature.</div>

<h3>4. SQL query practice (listed in lectures 13–14)</h3>
<pre><code class="language-sql">-- Top 3 customers by total spend in 2026
SELECT c.name, SUM(o.amount) AS total
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.order_date >= '2026-01-01'
GROUP BY c.id, c.name
ORDER BY total DESC
LIMIT 3;

-- Customers who have never ordered
SELECT c.name FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;

-- Second highest salary
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Employees earning more than their department's average (correlated subquery)
SELECT e.name, e.salary FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);</code></pre>
<p>More SQL practice with sample tables is in the Lab section.</p>
"""
    + check("Read replicas mainly help a system that is:",
            ["write-heavy", "read-heavy", "storage-constrained", "suffering from cross-shard joins"], "b",
            "Followers serve reads; all writes still go to the leader.")
    + check("Hash-based sharding with hash(key) mod N has which drawback when N changes?",
            ["hotspots on the newest shard", "most keys move to different shards", "range queries become faster", "no drawback"], "b",
            "Changing N changes almost every modulus result; consistent hashing limits the movement.")
))

TOPICS.append(topic(
    "NoSQL, NewSQL, Time-Series & Vector Databases — When and Why; SQL vs NoSQL",
    "Lectures 13–14 · choosing the right data store",
    r"""
<h3>1. NoSQL families</h3>
<table>
  <thead><tr><th>Type</th><th>Data model</th><th>Examples</th><th>Use when</th><th>Avoid when</th></tr></thead>
  <tbody>
    <tr><td><strong>Document</strong></td><td>JSON/BSON documents with flexible schema</td><td><strong>MongoDB</strong>, CouchDB, Firestore</td><td>product catalogues, CMS, user profiles — nested data read together</td><td>many cross-document joins / multi-entity transactions</td></tr>
    <tr><td><strong>Key–value</strong></td><td>key → opaque value</td><td><strong>Redis</strong>, <strong>DynamoDB</strong>, Memcached</td><td>caching, sessions, shopping carts, leaderboards (Redis sorted sets), rate limit counters</td><td>querying by value or complex filters</td></tr>
    <tr><td><strong>Wide-column</strong></td><td>rows with dynamic columns grouped in column families; partition + clustering keys</td><td><strong>Cassandra</strong>, HBase, ScyllaDB</td><td>massive write throughput: IoT, messaging, activity logs, time-ordered data across data centres</td><td>ad-hoc queries, joins, strong consistency needs</td></tr>
    <tr><td><strong>Graph</strong></td><td>nodes and edges with properties</td><td><strong>Neo4j</strong>, Amazon Neptune</td><td>social networks, recommendations, fraud rings, knowledge graphs — many-hop relationships</td><td>simple tabular data</td></tr>
  </tbody>
</table>

<h3>2. Newer categories</h3>
<ul>
  <li><strong>NewSQL</strong> — distributed databases that keep SQL and ACID while scaling horizontally: Google Spanner, CockroachDB, TiDB, YugabyteDB.</li>
  <li><strong>Time-series</strong> — optimised for timestamped metrics with high ingest, downsampling and retention policies: InfluxDB, TimescaleDB, Prometheus TSDB. Use for monitoring, IoT sensors, stock ticks.</li>
  <li><strong>Vector databases</strong> — store embeddings and answer <em>similarity search</em> (nearest neighbours by cosine/Euclidean distance) with ANN indexes such as HNSW: Pinecone, Milvus, Weaviate, pgvector. Use for semantic search, recommendations and RAG for LLM apps.</li>
</ul>

<h3>3. SQL vs NoSQL trade-off</h3>
<table>
  <thead><tr><th></th><th>SQL (relational)</th><th>NoSQL</th></tr></thead>
  <tbody>
    <tr><td>Schema</td><td>fixed, defined upfront</td><td>flexible / schema-on-read</td></tr>
    <tr><td>Data model</td><td>tables, rows, relations</td><td>documents, key–value, columns, graphs</td></tr>
    <tr><td>Query</td><td>powerful SQL, joins</td><td>API / query language per database; joins limited</td></tr>
    <tr><td>Transactions</td><td>ACID</td><td>often BASE; some support ACID (MongoDB multi-document)</td></tr>
    <tr><td>Scaling</td><td>traditionally vertical; read replicas; sharding is harder</td><td>designed for horizontal scaling</td></tr>
    <tr><td>Consistency</td><td>strong</td><td>tunable, often eventual</td></tr>
    <tr><td>Best for</td><td>structured data, complex queries, financial systems, reporting</td><td>large scale, high velocity, evolving or semi-structured data</td></tr>
  </tbody>
</table>
<div class="callout callout-tip"><strong>Polyglot persistence:</strong> real systems mix stores. An e-commerce site might use PostgreSQL for orders and payments, Elasticsearch for product search, Redis for carts and sessions,
Cassandra for clickstream events and a vector DB for "similar products".</div>

<h3>4. Quick decision guide</h3>
<ul>
  <li>Money, inventory, relationships with integrity constraints → <strong>relational</strong> (or NewSQL at global scale)</li>
  <li>Sub-millisecond lookups by key, caching → <strong>Redis</strong></li>
  <li>Flexible JSON objects read as a whole → <strong>MongoDB</strong></li>
  <li>Billions of writes, always on, multi-region → <strong>Cassandra / DynamoDB</strong></li>
  <li>"Friends of friends who bought…" → <strong>Neo4j</strong></li>
  <li>Metrics per second over time → <strong>time-series DB</strong></li>
  <li>"Find documents similar in meaning" → <strong>vector DB</strong></li>
</ul>
"""
    + check("Which database best fits finding \"people you may know\" through friends-of-friends relationships?",
            ["Redis", "Cassandra", "Neo4j", "InfluxDB"], "c",
            "Graph databases traverse multi-hop relationships efficiently.")
    + check("Semantic search over document embeddings for a chatbot (RAG) is best served by a:",
            ["time-series database", "vector database", "wide-column store", "hash index"], "b",
            "Vector databases index embeddings for fast nearest-neighbour similarity search.")
))

TOPICS.append(topic(
    "Networking Essentials — TCP/UDP, HTTP/1.1, HTTP/2, HTTP/3, WebSockets, DNS, CDN & TLS",
    "Lectures 15–17 · how bytes get from the client to your servers",
    r"""
<h3>1. TCP vs UDP</h3>
<table>
  <thead><tr><th></th><th>TCP</th><th>UDP</th></tr></thead>
  <tbody>
    <tr><td>Connection</td><td>connection-oriented (3-way handshake: SYN, SYN-ACK, ACK)</td><td>connectionless</td></tr>
    <tr><td>Reliability</td><td>guaranteed delivery, retransmission, ordering, flow and congestion control</td><td>best effort; packets may be lost, duplicated or reordered</td></tr>
    <tr><td>Header / overhead</td><td>20+ bytes, higher latency</td><td>8 bytes, low latency</td></tr>
    <tr><td>Use</td><td>web (HTTP/1.1, HTTP/2), email, file transfer, databases</td><td>video calls, live streaming, online games, DNS queries, QUIC (HTTP/3)</td></tr>
  </tbody>
</table>

<h3>2. HTTP versions</h3>
<table>
  <thead><tr><th>Version</th><th>Transport</th><th>Key features</th><th>Limitation</th></tr></thead>
  <tbody>
    <tr><td>HTTP/1.1</td><td>TCP</td><td>text protocol, persistent (keep-alive) connections</td><td>one request at a time per connection → <strong>head-of-line blocking</strong>; browsers open ~6 connections</td></tr>
    <tr><td>HTTP/2</td><td>TCP (TLS in practice)</td><td>binary framing, <strong>multiplexing</strong> many streams on one connection, header compression (HPACK), stream priorities</td><td>a lost TCP packet still stalls <em>all</em> streams (TCP-level HOL blocking)</td></tr>
    <tr><td>HTTP/3</td><td><strong>QUIC over UDP</strong></td><td>independent streams (no transport HOL blocking), built-in TLS 1.3, faster 0-/1-RTT connection setup, connection migration when switching Wi-Fi ↔ mobile</td><td>UDP sometimes blocked by firewalls; newer tooling</td></tr>
  </tbody>
</table>

<h3>3. WebSockets</h3>
<p>A persistent, <strong>full-duplex</strong> connection started by an HTTP <code>Upgrade</code> request. Both sides can push messages at any time with little overhead — ideal for chat, live scores, collaborative editing, trading dashboards and multiplayer games.</p>
<table>
  <thead><tr><th>Technique</th><th>Direction</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Short polling</td><td>client asks repeatedly</td><td>simple, wasteful</td></tr>
    <tr><td>Long polling</td><td>server holds the request until data arrives</td><td>works everywhere, heavier than sockets</td></tr>
    <tr><td>Server-Sent Events (SSE)</td><td>server → client only</td><td>over plain HTTP, auto-reconnect; news feeds, notifications</td></tr>
    <tr><td>WebSocket</td><td>both ways</td><td>stateful connections complicate load balancing (sticky sessions / pub-sub backplane)</td></tr>
  </tbody>
</table>

<h3>4. DNS resolution</h3>
<ol>
  <li>Browser / OS cache → configured <strong>recursive resolver</strong> (ISP, 8.8.8.8, 1.1.1.1).</li>
  <li>Resolver asks a <strong>root server</strong> → referral to the <strong>TLD server</strong> (.com, .in).</li>
  <li>TLD server → referral to the domain's <strong>authoritative name server</strong>.</li>
  <li>Authoritative server returns the record; resolver caches it for its <strong>TTL</strong> and answers the browser.</li>
</ol>
<table>
  <thead><tr><th>Record</th><th>Maps</th></tr></thead>
  <tbody>
    <tr><td>A / AAAA</td><td>name → IPv4 / IPv6 address</td></tr>
    <tr><td>CNAME</td><td>name → another name (alias)</td></tr>
    <tr><td>MX</td><td>domain → mail servers</td></tr>
    <tr><td>NS</td><td>domain → authoritative name servers</td></tr>
    <tr><td>TXT</td><td>arbitrary text (SPF, domain verification)</td></tr>
  </tbody>
</table>
<p>DNS itself enables simple load balancing and geo-routing (Route 53 latency-based routing), and uses UDP port 53 (TCP for large responses).</p>

<h3>5. CDN</h3>
<p>A <strong>Content Delivery Network</strong> is a global network of edge servers (points of presence) that cache content close to users — cutting latency, offloading origin servers and absorbing DDoS traffic. Push vs pull CDNs are covered in ST-2; CDN caching headers in End Term.</p>

<h3>6. TLS (HTTPS)</h3>
<p>TLS provides <strong>confidentiality</strong> (encryption), <strong>integrity</strong> (tamper detection) and <strong>authentication</strong> (certificates signed by a Certificate Authority).</p>
<ol>
  <li><strong>ClientHello</strong> — supported versions, cipher suites, a random value, key share (TLS 1.3).</li>
  <li><strong>ServerHello</strong> + certificate + its key share.</li>
  <li>Client verifies the certificate chain up to a trusted root CA.</li>
  <li>Both derive the same session keys (ECDHE key exchange) — asymmetric crypto sets up, <strong>symmetric</strong> encryption (AES-GCM, ChaCha20) protects the data.</li>
  <li>Finished messages confirm; encrypted application data flows.</li>
</ol>
<p>TLS 1.3 completes the handshake in <strong>1 round trip</strong> (0-RTT for resumption) versus 2 for TLS 1.2, and removes weak ciphers. Load balancers often perform <strong>TLS termination</strong> to offload this work from app servers.</p>
"""
    + check("Which protocol runs HTTP/3?",
            ["TCP", "QUIC over UDP", "SCTP", "WebSocket"], "b",
            "HTTP/3 uses QUIC, a transport built on UDP with integrated TLS 1.3.")
    + check("A live chat app needs the server to push messages instantly and the client to send messages at any time. Best fit:",
            ["short polling", "WebSockets", "DNS round robin", "a push CDN"], "b",
            "WebSockets provide a persistent full-duplex channel.")
))

TOPICS.append(topic(
    "APIs — REST, GraphQL, gRPC, Webhooks, API Gateway, Rate Limiting & Versioning",
    "Lectures 15–17 · how services talk to each other",
    r"""
<h3>1. REST</h3>
<p>Representational State Transfer: resources identified by URLs, manipulated with standard HTTP methods, <strong>stateless</strong> requests, usually JSON.</p>
<table>
  <thead><tr><th>Method</th><th>Action</th><th>Example</th><th>Idempotent?</th><th>Safe?</th></tr></thead>
  <tbody>
    <tr><td>GET</td><td>read</td><td><code>GET /orders/42</code></td><td>yes</td><td>yes</td></tr>
    <tr><td>POST</td><td>create / action</td><td><code>POST /orders</code></td><td>no</td><td>no</td></tr>
    <tr><td>PUT</td><td>replace whole resource</td><td><code>PUT /orders/42</code></td><td>yes</td><td>no</td></tr>
    <tr><td>PATCH</td><td>partial update</td><td><code>PATCH /orders/42</code></td><td>not guaranteed</td><td>no</td></tr>
    <tr><td>DELETE</td><td>remove</td><td><code>DELETE /orders/42</code></td><td>yes</td><td>no</td></tr>
  </tbody>
</table>
<p><strong>Idempotent</strong> = repeating the request has the same effect as doing it once (safe to retry). For POST, clients send an <strong>Idempotency-Key</strong> header so payment retries don't charge twice.</p>
<table>
  <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>200 OK / 201 Created / 204 No Content</td><td>success</td></tr>
    <tr><td>301 / 302 / 304 Not Modified</td><td>redirects, cache validation</td></tr>
    <tr><td>400 Bad Request / 401 Unauthorized / 403 Forbidden / 404 Not Found / 409 Conflict / 429 Too Many Requests</td><td>client errors</td></tr>
    <tr><td>500 Internal Server Error / 502 Bad Gateway / 503 Service Unavailable / 504 Gateway Timeout</td><td>server errors</td></tr>
  </tbody>
</table>
<p>Good REST design: plural nouns (<code>/users/7/orders</code>), no verbs in paths, filtering and pagination via query parameters (<code>?status=shipped&amp;page=2&amp;limit=20</code>, cursor pagination for large sets), consistent error bodies.</p>

<h3>2. GraphQL</h3>
<p>One endpoint; the client sends a query describing exactly the fields it needs. Solves <strong>over-fetching</strong> and <strong>under-fetching</strong> (multiple round trips).</p>
<pre><code class="language-graphql">query {
  user(id: "7") {
    name
    orders(last: 3) { id total status }
  }
}</code></pre>
<p>Trade-offs: HTTP caching is harder (usually POST to one URL), complex queries can overload the server (limit depth/cost), N+1 resolver problem (DataLoader batching).</p>

<h3>3. gRPC</h3>
<p>Google's RPC framework using <strong>Protocol Buffers</strong> (compact binary, strongly typed contracts in <code>.proto</code> files) over <strong>HTTP/2</strong>. Supports unary and bi-directional streaming.
Very fast and ideal for <strong>internal service-to-service</strong> communication; limited direct browser support (needs gRPC-Web).</p>

<h3>4. Webhooks</h3>
<p>"Don't call us, we'll call you": a provider sends an HTTP POST to <em>your</em> URL when an event occurs (Razorpay/Stripe payment succeeded, GitHub push).
Receivers must <strong>verify the signature</strong>, respond quickly (queue the work), and handle retries/duplicates idempotently.</p>
<table>
  <thead><tr><th></th><th>REST</th><th>GraphQL</th><th>gRPC</th><th>Webhook</th></tr></thead>
  <tbody>
    <tr><td>Style</td><td>resources + HTTP verbs</td><td>query language</td><td>remote procedure calls</td><td>event callback</td></tr>
    <tr><td>Format</td><td>JSON</td><td>JSON</td><td>Protobuf (binary)</td><td>JSON</td></tr>
    <tr><td>Best for</td><td>public APIs, CRUD</td><td>flexible client-driven UIs</td><td>low-latency internal microservices</td><td>event notifications between systems</td></tr>
  </tbody>
</table>

<h3>5. API Gateway</h3>
<p>Single entry point in front of services: request routing, authentication/authorisation (JWT validation), rate limiting, TLS termination, request/response transformation, caching, logging and metrics, canary routing.
Examples: Kong, AWS API Gateway, NGINX, Apigee. Must itself be highly available.</p>

<h3>6. Rate limiting</h3>
<table>
  <thead><tr><th>Algorithm</th><th>How it works</th><th>Character</th></tr></thead>
  <tbody>
    <tr><td><strong>Token bucket</strong></td><td>tokens refill at rate r up to capacity b; each request spends one</td><td>allows bursts up to b; very common (AWS, Stripe)</td></tr>
    <tr><td><strong>Leaky bucket</strong></td><td>requests enter a queue that drains at a constant rate</td><td>smooths output; bursts are queued or dropped</td></tr>
    <tr><td><strong>Fixed window counter</strong></td><td>count per clock window (e.g. per minute)</td><td>simple; burst of 2× at window edges</td></tr>
    <tr><td><strong>Sliding window log</strong></td><td>store timestamps, count those in the last window</td><td>accurate; memory heavy</td></tr>
    <tr><td><strong>Sliding window counter</strong></td><td>weighted blend of current and previous window counts</td><td>good accuracy, low memory</td></tr>
  </tbody>
</table>
<p>Distributed rate limiters keep counters in <strong>Redis</strong>; responses use <strong>429 Too Many Requests</strong> with a <code>Retry-After</code> header.</p>

<h3>7. API versioning</h3>
<ul>
  <li><strong>URI path</strong>: <code>/v1/orders</code> — most common, explicit, easy to route.</li>
  <li><strong>Query parameter</strong>: <code>/orders?version=2</code>.</li>
  <li><strong>Header</strong>: <code>Accept: application/vnd.shop.v2+json</code> or <code>API-Version: 2</code> — clean URLs.</li>
</ul>
<p>Prefer backward-compatible changes (add optional fields; never rename or remove) and publish deprecation timelines.</p>
"""
    + check("Retrying which request can safely be done without changing the result beyond the first call?",
            ["POST /payments", "PUT /users/7 with the full user body", "POST /orders", "PATCH that increments a counter"], "b",
            "PUT replaces the resource with the same representation every time, so it is idempotent.")
    + check("Which rate-limiting algorithm naturally allows short bursts while enforcing an average rate?",
            ["Fixed window counter", "Token bucket", "Leaky bucket", "Round robin"], "b",
            "Saved-up tokens (up to bucket capacity) let a burst through, while refill rate caps the average.")
))

TOPICS.append(topic(
    "Client–Server Architecture & Load Balancing — L4/L7, Algorithms, Consistent Hashing, Health Checks, Global LB",
    "Lectures 15–17 · distributing traffic across servers",
    r"""
<h3>1. Client–server architecture</h3>
<table>
  <thead><tr><th>Component</th><th>Role</th></tr></thead>
  <tbody>
    <tr><td><strong>Client</strong></td><td>requests services: browser, mobile app, IoT device</td></tr>
    <tr><td><strong>Server</strong></td><td>provides services and resources: web, application, database servers</td></tr>
    <tr><td><strong>Network &amp; protocols</strong></td><td>carry requests and responses: TCP/IP, HTTP, TLS, DNS</td></tr>
    <tr><td><strong>Middleware</strong></td><td>software between client and server or between services: API gateways, message queues, authentication, ORMs, application servers</td></tr>
  </tbody>
</table>
<h4>Tiers</h4>
<ul>
  <li><strong>2-tier:</strong> client talks directly to the database server (older desktop apps).</li>
  <li><strong>3-tier:</strong> <strong>presentation (UI)</strong> → <strong>application logic</strong> (business rules) → <strong>data</strong> tier. Each can be scaled and secured separately.</li>
  <li><strong>N-tier:</strong> adds caching, messaging, search and other layers.</li>
</ul>
<p>Thin client (logic on server, e.g. web apps) vs thick client (much logic on the client, e.g. desktop games). Contrast with <strong>peer-to-peer</strong>, where every node is both client and server (BitTorrent).</p>

<h3>2. Why load balancers?</h3>
<p>Distribute requests across servers for <strong>scalability</strong>, <strong>availability</strong> (route around failed servers), zero-downtime deploys, and a single stable endpoint. They can sit between clients and web servers, web and app servers, and app servers and databases.</p>

<h3>3. Layer 4 vs Layer 7</h3>
<table>
  <thead><tr><th></th><th>L4 (transport)</th><th>L7 (application)</th></tr></thead>
  <tbody>
    <tr><td>Decides using</td><td>IP addresses and TCP/UDP ports</td><td>HTTP content: URL path, host, headers, cookies</td></tr>
    <tr><td>Can do</td><td>fast packet forwarding / NAT</td><td>path routing (<code>/api</code> → API servers, <code>/images</code> → image servers), TLS termination, sticky sessions by cookie, header rewrites, WAF rules</td></tr>
    <tr><td>Speed</td><td>faster, less CPU</td><td>slower (must parse requests)</td></tr>
    <tr><td>Examples</td><td>AWS Network Load Balancer, HAProxy (TCP mode)</td><td>AWS Application Load Balancer, NGINX, Envoy, HAProxy (HTTP mode)</td></tr>
  </tbody>
</table>

<h3>4. Balancing algorithms</h3>
<table>
  <thead><tr><th>Algorithm</th><th>Picks</th><th>Good for</th></tr></thead>
  <tbody>
    <tr><td>Round robin</td><td>next server in turn</td><td>identical servers, similar requests</td></tr>
    <tr><td>Weighted round robin</td><td>in turn, proportionally to capacity</td><td>mixed server sizes</td></tr>
    <tr><td>Least connections</td><td>server with fewest active connections</td><td>long-lived or uneven requests (WebSockets)</td></tr>
    <tr><td>Least response time</td><td>fastest recent responses</td><td>latency-sensitive services</td></tr>
    <tr><td>IP hash</td><td>hash of the client IP</td><td>simple session affinity</td></tr>
    <tr><td>Random / power of two choices</td><td>best of two random servers</td><td>large fleets, avoids herding</td></tr>
  </tbody>
</table>

<h3>5. Consistent hashing</h3>
<p>With <code>server = hash(key) mod N</code>, adding or removing one server remaps almost every key — disastrous for caches and shards.
Consistent hashing places servers and keys on a <strong>hash ring</strong>; each key goes to the first server clockwise.</p>
<ul>
  <li>Adding or removing a server moves only about <strong>1/N</strong> of the keys (those in its arc).</li>
  <li><strong>Virtual nodes</strong> — each physical server appears at many ring positions, evening out the load and allowing weighting.</li>
  <li>Used in DynamoDB, Cassandra, Memcached client libraries, CDNs and load balancers with session affinity.</li>
</ul>

<h3>6. Health checks</h3>
<ul>
  <li><strong>Active</strong> — the LB probes each server (<code>GET /health</code> every 10 s); after N failures it is removed, after M successes restored.</li>
  <li><strong>Passive</strong> — the LB watches real traffic for errors/timeouts.</li>
  <li><strong>Liveness</strong> (process alive?) vs <strong>readiness</strong> (able to serve — DB connected, warmed up?).</li>
  <li>Connection draining lets in-flight requests finish before a server is removed.</li>
</ul>

<h3>7. Global server load balancing (GSLB)</h3>
<p>Distributes users across <strong>data centres / regions</strong>: DNS-based geo or latency routing (Route 53, Azure Traffic Manager), or <strong>anycast</strong> IPs where the same address is announced from many locations and BGP routes users to the nearest one (Cloudflare).
Gives lower latency, disaster recovery (regional failover) and data residency.</p>
<div class="callout callout-warning"><strong>Don't create a new SPOF:</strong> run load balancers in pairs (active–passive with a floating IP via keepalived/VRRP, or active–active) or use a managed cloud LB.</div>
"""
    + check("Routing /api/* requests to one server pool and /static/* to another requires a:",
            ["Layer 4 load balancer", "Layer 7 load balancer", "DNS A record", "TCP handshake"], "b",
            "Only an application-layer balancer can inspect the HTTP path.")
    + check("With consistent hashing across 10 cache servers, adding an 11th server remaps approximately:",
            ["all keys", "about half the keys", "about 1/11 of the keys", "no keys"], "c",
            "Only the keys in the new server's arc of the ring move.")
))
