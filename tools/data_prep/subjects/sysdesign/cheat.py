"""System Design — revision sheets."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Numbers & Formulas Sheet — Availability, Estimation, Latency, OS Scheduling & Paging",
    "The quantitative side of the paper",
    r"""
<h3>Availability</h3>
<table>
  <tbody>
    <tr><td>Availability</td><td>MTBF / (MTBF + MTTR)</td></tr>
    <tr><td>Series (all needed)</td><td>A₁ × A₂ × …</td></tr>
    <tr><td>Parallel (any one enough)</td><td>1 − (1 − A₁)(1 − A₂)…</td></tr>
    <tr><td>99.9% · 99.99% · 99.999%</td><td>8.76 h · 52.6 min · 5.26 min downtime per year</td></tr>
  </tbody>
</table>

<h3>Estimation</h3>
<table>
  <tbody>
    <tr><td>Seconds per day</td><td>86,400 (≈ 10⁵)</td></tr>
    <tr><td>Requests per day → per second</td><td>divide by ~10⁵ (1M/day ≈ 12/s)</td></tr>
    <tr><td>Peak traffic</td><td>2–10× average</td></tr>
    <tr><td>Storage</td><td>items/day × size × retention days (× replication factor)</td></tr>
    <tr><td>Cache sizing (80/20)</td><td>~20% of daily read volume × object size</td></tr>
    <tr><td>Servers needed</td><td>peak QPS ÷ QPS per server (+ headroom)</td></tr>
  </tbody>
</table>

<h3>Latency ladder</h3>
<table>
  <tbody>
    <tr><td>L1 cache reference</td><td>~1 ns</td></tr>
    <tr><td>Mutex lock/unlock</td><td>~25 ns</td></tr>
    <tr><td>Main memory reference</td><td>~100 ns</td></tr>
    <tr><td>Compress 1 KB (fast codec)</td><td>~2–3 µs</td></tr>
    <tr><td>SSD random read</td><td>~100 µs</td></tr>
    <tr><td>Round trip within a data centre</td><td>~500 µs</td></tr>
    <tr><td>Read 1 MB sequentially from SSD</td><td>~1 ms</td></tr>
    <tr><td>HDD seek</td><td>~10 ms</td></tr>
    <tr><td>Packet India → US → India</td><td>~150–250 ms</td></tr>
  </tbody>
</table>
<p>Rules: memory is fast, disk is slow, cross-continent network is slowest; avoid synchronous cross-region calls in a request path.</p>

<h3>Caching</h3>
<table>
  <tbody>
    <tr><td>Hit ratio</td><td>hits / (hits + misses)</td></tr>
    <tr><td>Average access time</td><td>t_cache + miss rate × miss penalty</td></tr>
    <tr><td>Paging with TLB</td><td>EAT = h(t + m) + (1 − h)(t + 2m)</td></tr>
  </tbody>
</table>

<h3>Quorum</h3>
<p>R + W &gt; N → strong consistency; W &gt; N/2 prevents conflicting concurrent writes.</p>

<h3>CPU scheduling</h3>
<table>
  <tbody>
    <tr><td>Turnaround time</td><td>completion − arrival</td></tr>
    <tr><td>Waiting time</td><td>turnaround − burst</td></tr>
    <tr><td>Response time</td><td>first CPU time − arrival</td></tr>
    <tr><td>Minimum average waiting (non-pre-emptive)</td><td>SJF</td></tr>
    <tr><td>Minimum average waiting (pre-emptive)</td><td>SRTF</td></tr>
  </tbody>
</table>

<h3>Paging</h3>
<table>
  <tbody>
    <tr><td>Page number</td><td>⌊logical address ÷ page size⌋</td></tr>
    <tr><td>Offset</td><td>logical address mod page size</td></tr>
    <tr><td>Physical address</td><td>frame × page size + offset</td></tr>
    <tr><td>Offset bits</td><td>log₂(page size) — 4 KB → 12 bits</td></tr>
    <tr><td>Number of pages</td><td>2^(address bits − offset bits)</td></tr>
    <tr><td>Page table size</td><td>number of pages × entry size</td></tr>
  </tbody>
</table>
"""
))

TOPICS.append(topic(
    "Comparison Sheet — Every \"X vs Y\" in the Syllabus",
    "One table per classic comparison question",
    r"""
<table>
  <thead><tr><th>Comparison</th><th>First</th><th>Second</th></tr></thead>
  <tbody>
    <tr><td>Vertical vs horizontal scaling</td><td>bigger machine; simple; hardware ceiling; SPOF</td><td>more machines; complex; near-unlimited; redundant</td></tr>
    <tr><td>Latency vs throughput</td><td>time per request</td><td>requests per unit time</td></tr>
    <tr><td>Performance vs scalability</td><td>slow for one user</td><td>slow under load</td></tr>
    <tr><td>CP vs AP</td><td>consistent, may reject requests in a partition (HBase, ZooKeeper)</td><td>always answers, may be stale (Cassandra, DynamoDB)</td></tr>
    <tr><td>Strong vs eventual consistency</td><td>reads see latest write; synchronous replication</td><td>replicas converge later; asynchronous</td></tr>
    <tr><td>Functional vs non-functional</td><td>what the system does</td><td>how well it does it</td></tr>
    <tr><td>HLD vs LLD</td><td>architecture, components, tech stack</td><td>classes, methods, schemas, algorithms</td></tr>
    <tr><td>Monolith vs microservices</td><td>one deployable, shared DB, simple</td><td>independent services and DBs, complex, scalable</td></tr>
    <tr><td>Microservices vs serverless</td><td>long-running services you operate</td><td>functions per event, provider-managed, cold starts</td></tr>
    <tr><td>SQL vs NoSQL</td><td>fixed schema, joins, ACID, vertical-first</td><td>flexible schema, horizontal, often BASE</td></tr>
    <tr><td>ACID vs BASE</td><td>atomic, consistent, isolated, durable</td><td>basically available, soft state, eventual consistency</td></tr>
    <tr><td>Replication vs sharding</td><td>copies of all data; scales reads, availability</td><td>splits data; scales writes and storage</td></tr>
    <tr><td>Clustered vs non-clustered index</td><td>rows stored in key order; one per table</td><td>separate structure with pointers; many</td></tr>
    <tr><td>Incremental vs differential backup</td><td>since last backup of any type; restore needs all</td><td>since last full; restore needs full + latest</td></tr>
    <tr><td>TCP vs UDP</td><td>reliable, ordered, connection</td><td>fast, connectionless, best effort</td></tr>
    <tr><td>HTTP/2 vs HTTP/3</td><td>multiplexed over TCP; TCP HOL blocking</td><td>QUIC over UDP; independent streams; faster setup</td></tr>
    <tr><td>WebSocket vs SSE</td><td>bi-directional</td><td>server → client only, plain HTTP</td></tr>
    <tr><td>REST vs GraphQL</td><td>many endpoints, fixed responses, HTTP caching</td><td>one endpoint, client picks fields, no over-fetching</td></tr>
    <tr><td>REST vs gRPC</td><td>JSON, human readable, browsers</td><td>Protobuf over HTTP/2, fast, internal services</td></tr>
    <tr><td>Webhook vs polling</td><td>provider pushes on event</td><td>client asks repeatedly</td></tr>
    <tr><td>Token bucket vs leaky bucket</td><td>allows bursts</td><td>smooth constant output</td></tr>
    <tr><td>L4 vs L7 load balancer</td><td>IP/port, fast</td><td>HTTP-aware routing, TLS termination</td></tr>
    <tr><td>Push vs pull CDN</td><td>you upload content in advance</td><td>CDN fetches on first request</td></tr>
    <tr><td>Authentication vs authorisation</td><td>who you are (401)</td><td>what you may do (403)</td></tr>
    <tr><td>OAuth 2.0 vs OpenID Connect</td><td>delegated authorisation (access token)</td><td>authentication layer on OAuth (ID token)</td></tr>
    <tr><td>JWT vs session</td><td>stateless, scalable, hard to revoke</td><td>server-stored, easy to revoke</td></tr>
    <tr><td>SAML vs OIDC</td><td>XML, enterprise SSO</td><td>JSON/JWT, modern web and mobile</td></tr>
    <tr><td>Continuous delivery vs deployment</td><td>release is one manual approval</td><td>every green build ships automatically</td></tr>
    <tr><td>Prometheus vs Grafana</td><td>collects and stores metrics (pull, PromQL)</td><td>visualises dashboards from data sources</td></tr>
    <tr><td>Process vs thread</td><td>own address space, heavier</td><td>shares process memory, lighter</td></tr>
    <tr><td>Pre-emptive vs non-pre-emptive</td><td>CPU can be taken away</td><td>runs until done or blocked</td></tr>
    <tr><td>Paging vs segmentation</td><td>fixed size, internal fragmentation, invisible</td><td>variable size, external fragmentation, logical</td></tr>
    <tr><td>Internal vs external fragmentation</td><td>waste inside allocated blocks</td><td>free space split into small holes</td></tr>
    <tr><td>LRU vs LFU</td><td>evict least recently used</td><td>evict least frequently used</td></tr>
    <tr><td>Cache-aside vs write-through</td><td>app loads on miss, deletes on write</td><td>every write goes through cache to DB synchronously</td></tr>
    <tr><td>Write-through vs write-behind</td><td>synchronous DB write, consistent</td><td>asynchronous batched DB write, risk of loss</td></tr>
    <tr><td>Redis vs Memcached</td><td>data structures, persistence, replication</td><td>simple strings, multi-threaded, no persistence</td></tr>
  </tbody>
</table>
"""
))
