"""System Design (24CSE0318) — End Term: lectures 28-30, caching."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Caching Fundamentals — Cache Memory, Hit Ratio, Where to Cache & Cache Replacement",
    "Lectures 28–30 · keep hot data close",
    r"""
<h3>1. What a cache is</h3>
<p>A cache is a small, fast storage layer holding a copy of frequently or recently used data so future requests are served faster than from the original source.
It works because of <strong>locality of reference</strong>: <strong>temporal</strong> (recently used data is likely used again) and <strong>spatial</strong> (nearby data is likely used soon).</p>

<h3>2. Cache memory in hardware</h3>
<table>
  <thead><tr><th>Level</th><th>Typical size</th><th>Access time</th></tr></thead>
  <tbody>
    <tr><td>CPU registers</td><td>bytes</td><td>&lt; 1 ns</td></tr>
    <tr><td>L1 cache</td><td>32–64 KB per core</td><td>~1 ns</td></tr>
    <tr><td>L2 cache</td><td>256 KB – 2 MB</td><td>~4 ns</td></tr>
    <tr><td>L3 cache</td><td>tens of MB, shared</td><td>~10–20 ns</td></tr>
    <tr><td>Main memory (RAM)</td><td>GBs</td><td>~100 ns</td></tr>
    <tr><td>SSD</td><td>hundreds of GB – TBs</td><td>~0.1 ms</td></tr>
  </tbody>
</table>
<p>Faster memory is smaller and costlier per byte — the <strong>memory hierarchy</strong>. CPU cache mapping techniques: <strong>direct-mapped</strong> (each block has one slot), <strong>fully associative</strong> (any slot), <strong>set-associative</strong> (a small set of slots).</p>

<h3>3. Hit ratio and average access time</h3>
<div class="formula">\[ Hit\ ratio = \frac{hits}{hits + misses} \qquad AMAT = t_{cache} + miss\ rate \times miss\ penalty \]</div>
<details class="solution"><summary>Worked example</summary>
<p>A Redis cache answers in 1 ms; a database miss adds 50 ms. With a 90% hit ratio: AMAT = 1 + 0.10 × 50 = <strong>6 ms</strong>.
At 99%: 1 + 0.01 × 50 = <strong>1.5 ms</strong> — the last few percent of hit ratio matter a lot.</p>
<p>Hardware version: cache 2 ns, RAM 100 ns, hit ratio 95% → simultaneous-access EAT = 0.95 × 2 + 0.05 × 100 = 6.9 ns (or 0.95 × 2 + 0.05 × 102 = 7 ns if the cache is checked first).</p>
</details>

<h3>4. Where caching happens in a system</h3>
<table>
  <thead><tr><th>Layer</th><th>Caches</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Client / browser</td><td>static files, API responses</td><td>HTTP Cache-Control, service workers</td></tr>
    <tr><td>DNS</td><td>name → IP lookups</td><td>resolver TTL cache</td></tr>
    <tr><td>CDN / edge</td><td>images, video, static pages</td><td>CloudFront, Cloudflare</td></tr>
    <tr><td>Reverse proxy / gateway</td><td>whole HTTP responses</td><td>NGINX, Varnish</td></tr>
    <tr><td>Application (in-process)</td><td>computed objects</td><td>Caffeine / Guava cache, HashMap with eviction</td></tr>
    <tr><td>Distributed cache</td><td>sessions, query results, objects shared by all app servers</td><td>Redis, Memcached</td></tr>
    <tr><td>Database</td><td>pages and query plans</td><td>buffer pool, materialised views</td></tr>
  </tbody>
</table>

<h3>5. What to cache — and what not to</h3>
<ul>
  <li>✔ read-heavy, expensive-to-compute, rarely changing data: product details, user profiles, feeds, configuration, rendered pages, session data.</li>
  <li>✘ rapidly changing data where staleness is unacceptable (account balances at transfer time), highly personalised or sensitive data in shared caches, data that is cheap to fetch anyway.</li>
</ul>

<h3>6. Cache replacement (eviction) — why it is needed</h3>
<p>Caches are bounded. When full, a <strong>replacement policy</strong> decides which entry to evict to make room — the same idea as page replacement in virtual memory.
Entries can also leave through <strong>expiry (TTL)</strong> or <strong>explicit invalidation</strong>. The next topic compares the policies.</p>

<h3>7. Cache problems to name in answers</h3>
<table>
  <thead><tr><th>Problem</th><th>What happens</th><th>Mitigation</th></tr></thead>
  <tbody>
    <tr><td><strong>Stale data</strong></td><td>cache holds an old value after the DB changes</td><td>TTLs, invalidate on write, write-through</td></tr>
    <tr><td><strong>Cache stampede / thundering herd</strong></td><td>a hot key expires and thousands of requests hit the DB at once</td><td>locking / single-flight recompute, early refresh, jittered TTLs</td></tr>
    <tr><td><strong>Cache penetration</strong></td><td>requests for keys that don't exist always miss and hit the DB</td><td>cache "not found" results briefly, Bloom filter</td></tr>
    <tr><td><strong>Cache avalanche</strong></td><td>many keys expire simultaneously, or the cache cluster fails</td><td>randomised TTLs, replicas, circuit breakers</td></tr>
    <tr><td><strong>Hot key</strong></td><td>one key receives huge traffic (celebrity post)</td><td>local in-process copies, key replication</td></tr>
  </tbody>
</table>
"""
    + check("Cache lookup costs 2 ms, a miss adds 40 ms from the database, and the hit ratio is 80%. Average access time is:",
            ["10 ms", "8 ms", "34 ms", "42 ms"], "a",
            "AMAT = 2 + 0.2 × 40 = 10 ms.")
))

TOPICS.append(topic(
    "Cache Eviction Policies — LRU, LFU, FIFO, TTL (with Java implementations)",
    "Lectures 28–30 · deciding what to throw away",
    r"""
<h3>1. Policies compared</h3>
<table>
  <thead><tr><th>Policy</th><th>Evicts</th><th>Good for</th><th>Weakness</th></tr></thead>
  <tbody>
    <tr><td><strong>LRU</strong> (Least Recently Used)</td><td>the entry unused for the longest time</td><td>general purpose, recency-driven workloads (sessions, feeds)</td><td>a one-off scan can evict genuinely popular items</td></tr>
    <tr><td><strong>LFU</strong> (Least Frequently Used)</td><td>the entry with the lowest access count</td><td>stable popularity (top products, static assets)</td><td>old items that were popular once stay forever unless counts decay; more bookkeeping</td></tr>
    <tr><td>FIFO</td><td>the oldest inserted entry</td><td>very simple</td><td>ignores usage completely</td></tr>
    <tr><td>TTL / time-based</td><td>entries past their expiry time</td><td>bounding staleness</td><td>not a capacity policy on its own</td></tr>
    <tr><td>Random</td><td>a random entry</td><td>cheap, surprisingly decent</td><td>unpredictable</td></tr>
  </tbody>
</table>
<p>Redis supports <code>maxmemory-policy</code> values such as <code>allkeys-lru</code>, <code>allkeys-lfu</code>, <code>volatile-lru</code> (only keys with a TTL), <code>volatile-ttl</code> and <code>noeviction</code>. Its LRU and LFU are approximated by sampling.</p>

<details class="solution"><summary>Worked example — capacity 3, requests A B C A D B E A</summary>
<p><strong>LRU</strong>: A, B, C fill the cache. A hit (order B, C, A). D → evict B (least recent) → C, A, D. B → miss, evict C → A, D, B. E → evict A → D, B, E. A → miss, evict D → B, E, A.
Misses: A, B, C, D, B, E, A = <strong>7 misses, 1 hit</strong>.</p>
<p><strong>LFU</strong> (ties broken by least recent): A, B, C inserted (count 1 each). A hit → A = 2. D → evict among count-1 {B, C} the least recent, B → cache A2, C1, D1.
B → evict C (count 1, older) → A2, D1, B1. E → evict D → A2, B1, E1. A → <strong>hit</strong> (A = 3).
<strong>6 misses, 2 hits</strong> — LFU kept the popular A.</p>
</details>

<h3>2. LRU cache in O(1) — HashMap + doubly linked list</h3>
<p>The map finds a node in O(1); the list keeps recency order so moving a node to the front and removing the tail are O(1).</p>
<pre><code class="language-java">import java.util.*;

public class LRUCache<K, V> {
    private class Node {
        K key; V value; Node prev, next;
        Node(K k, V v) { key = k; value = v; }
    }

    private final int capacity;
    private final Map<K, Node> map = new HashMap<>();
    private final Node head = new Node(null, null);   // most recent after head
    private final Node tail = new Node(null, null);   // least recent before tail

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        Node n = map.get(key);
        if (n == null) return null;
        unlink(n);
        addFront(n);                      // mark as most recently used
        return n.value;
    }

    public void put(K key, V value) {
        Node n = map.get(key);
        if (n != null) {
            n.value = value;
            unlink(n);
            addFront(n);
            return;
        }
        if (map.size() == capacity) {
            Node lru = tail.prev;         // evict least recently used
            unlink(lru);
            map.remove(lru.key);
        }
        n = new Node(key, value);
        map.put(key, n);
        addFront(n);
    }

    private void unlink(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    private void addFront(Node n) { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; }

    public static void main(String[] args) {
        LRUCache<String, Integer> cache = new LRUCache<>(2);
        cache.put("a", 1);
        cache.put("b", 2);
        cache.get("a");                   // a is now most recent
        cache.put("c", 3);                // evicts b
        System.out.println(cache.get("b"));   // null
        System.out.println(cache.get("a"));   // 1
        System.out.println(cache.get("c"));   // 3
    }
}</code></pre>
<p>The Java shortcut: <code>new LinkedHashMap&lt;&gt;(16, 0.75f, true)</code> (access order) with <code>removeEldestEntry</code> overridden to return <code>size() &gt; capacity</code>.</p>

<h3>3. LFU cache in O(1) — counts bucketed by frequency</h3>
<pre><code class="language-java">import java.util.*;

public class LFUCache {
    private final int capacity;
    private final Map<Integer, Integer> values = new HashMap<>();
    private final Map<Integer, Integer> counts = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Integer>> buckets = new HashMap<>();  // freq -> keys, oldest first
    private int minFreq = 0;

    public LFUCache(int capacity) { this.capacity = capacity; }

    public int get(int key) {
        if (!values.containsKey(key)) return -1;
        touch(key);
        return values.get(key);
    }

    public void put(int key, int value) {
        if (capacity == 0) return;
        if (values.containsKey(key)) { values.put(key, value); touch(key); return; }
        if (values.size() == capacity) {
            int evict = buckets.get(minFreq).iterator().next();   // least frequent, then least recent
            buckets.get(minFreq).remove(evict);
            values.remove(evict);
            counts.remove(evict);
        }
        values.put(key, value);
        counts.put(key, 1);
        buckets.computeIfAbsent(1, f -> new LinkedHashSet<>()).add(key);
        minFreq = 1;
    }

    private void touch(int key) {
        int f = counts.get(key);
        counts.put(key, f + 1);
        buckets.get(f).remove(key);
        if (f == minFreq && buckets.get(f).isEmpty()) minFreq++;
        buckets.computeIfAbsent(f + 1, x -> new LinkedHashSet<>()).add(key);
    }

    public static void main(String[] args) {
        LFUCache c = new LFUCache(2);
        c.put(1, 10); c.put(2, 20);
        c.get(1);                              // freq(1) = 2
        c.put(3, 30);                          // evicts key 2 (freq 1)
        System.out.println(c.get(2));          // -1
        System.out.println(c.get(3));          // 30
        c.put(4, 40);                          // keys 1 and 3 both have freq 2; 1 was touched earlier -> evicts 1
        System.out.println(c.get(1) + " " + c.get(3) + " " + c.get(4));   // -1 30 40
    }
}</code></pre>
"""
    + check("An LRU cache of capacity 2 receives: put(1), put(2), get(1), put(3). Which key is evicted?",
            ["1", "2", "3", "none"], "b",
            "After get(1), key 2 is the least recently used, so it is evicted when 3 arrives.")
))

TOPICS.append(topic(
    "Caching Patterns — Cache-Aside, Read-Through, Write-Through, Write-Behind & Refresh-Ahead; Invalidation",
    "Lectures 28–30 · how the cache and database stay in step",
    r"""
<h3>1. Cache-aside (lazy loading)</h3>
<p>The <strong>application</strong> manages the cache.</p>
<ol>
  <li>Read: check the cache. Hit → return.</li>
  <li>Miss → read from the database → store in the cache with a TTL → return.</li>
  <li>Write: update the database, then <strong>delete (invalidate)</strong> the cache key.</li>
</ol>
<pre><code class="language-java">public Product getProduct(String id) {
    String key = "product:" + id;
    String cached = redis.get(key);
    if (cached != null) return fromJson(cached);          // cache hit

    Product p = productRepository.findById(id);            // cache miss -> database
    if (p != null) redis.setex(key, 600, toJson(p));       // store with 10-minute TTL
    return p;
}

public void updateProduct(Product p) {
    productRepository.save(p);                             // 1. write the source of truth
    redis.del("product:" + p.getId());                     // 2. invalidate; next read reloads
}</code></pre>
<ul>
  <li>✔ Only requested data is cached; cache failure doesn't break reads (falls back to DB); simple; most common pattern.</li>
  <li>✘ First request for each key is slow (miss); data can be stale until TTL/invalidation; three round trips on a miss.</li>
</ul>
<div class="callout callout-warning"><strong>Delete, don't set, on writes.</strong> Two concurrent writers setting the cache can leave the older value in it. Deleting forces the next read to fetch the current value.</div>

<h3>2. Read-through</h3>
<p>The application only talks to the cache; on a miss the <strong>cache itself</strong> (via a configured loader) fetches from the database. Same behaviour as cache-aside but the logic lives in the cache library/provider.</p>

<h3>3. Write-through</h3>
<p>The application writes to the cache; the cache <strong>synchronously</strong> writes to the database before acknowledging.</p>
<ul>
  <li>✔ Cache is always up to date with the DB; pairs well with read-through.</li>
  <li>✘ Higher write latency (two writes); data that is never read still gets cached.</li>
</ul>

<h3>4. Write-behind (write-back)</h3>
<p>The application writes to the cache, which acknowledges immediately and writes to the database <strong>asynchronously</strong> in batches.</p>
<ul>
  <li>✔ Very fast writes; batching reduces DB load (view counters, likes, analytics).</li>
  <li>✘ Risk of <strong>data loss</strong> if the cache crashes before flushing; eventual consistency.</li>
</ul>

<h3>5. Refresh-ahead</h3>
<p>The cache proactively reloads popular entries <em>before</em> they expire, so users rarely hit a miss. Needs good prediction of which keys will be requested.</p>

<h3>6. Comparison</h3>
<table>
  <thead><tr><th>Pattern</th><th>Who loads the cache</th><th>Write path</th><th>Consistency</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td>Cache-aside</td><td>application, on miss</td><td>DB then delete key</td><td>eventual (TTL)</td><td>general read-heavy apps</td></tr>
    <tr><td>Read-through</td><td>cache provider, on miss</td><td>—</td><td>eventual (TTL)</td><td>simplifying app code</td></tr>
    <tr><td>Write-through</td><td>on every write</td><td>cache → DB synchronously</td><td>strong between cache and DB</td><td>data read soon after writing</td></tr>
    <tr><td>Write-behind</td><td>on every write</td><td>cache → DB asynchronously</td><td>eventual, risk of loss</td><td>write-heavy counters, logs</td></tr>
    <tr><td>Refresh-ahead</td><td>cache, before expiry</td><td>—</td><td>fresher hot keys</td><td>predictable hot data</td></tr>
  </tbody>
</table>

<h3>7. Invalidation strategies</h3>
<ul>
  <li><strong>TTL expiry</strong> — simplest; bounds staleness. Add random jitter to avoid mass expiry.</li>
  <li><strong>Explicit delete on write</strong> (cache-aside).</li>
  <li><strong>Event-driven invalidation</strong> — publish "ProductUpdated"; all services/caches evict (Change Data Capture from the DB log, e.g. Debezium → Kafka).</li>
  <li><strong>Versioned keys</strong> — <code>product:42:v7</code>; bump the version on change.</li>
</ul>
<p>"There are only two hard things in computer science: cache invalidation and naming things." — Phil Karlton</p>
"""
    + check("A like counter is updated in Redis immediately and flushed to the database in batches every few seconds. This is:",
            ["cache-aside", "write-through", "write-behind", "read-through"], "c",
            "Asynchronous batched persistence behind the cache is the write-behind pattern.")
    + check("In cache-aside, what should the application do to the cache after updating a row in the database?",
            ["nothing", "delete (invalidate) the key", "increase the TTL", "flush the entire cache"], "b",
            "Deleting the key makes the next read load the fresh value and avoids race conditions between writers.")
))

TOPICS.append(topic(
    "Distributed Caching — Redis vs Memcached, CDN Cache & HTTP Cache Headers",
    "Lectures 28–30 · caches shared by many servers",
    r"""
<h3>1. Why a distributed cache?</h3>
<p>In-process caches live inside each app server: fast, but every server has its own copy (inconsistent), memory is limited to one machine, and a restart empties it.
A <strong>distributed cache</strong> is a separate cluster that all app servers share — consistent view, scalable memory, survives app restarts, and enables <strong>stateless</strong> app servers (sessions in Redis).</p>

<h3>2. Redis vs Memcached</h3>
<table>
  <thead><tr><th></th><th>Redis</th><th>Memcached</th></tr></thead>
  <tbody>
    <tr><td>Data types</td><td>strings, hashes, lists, sets, <strong>sorted sets</strong>, streams, bitmaps, HyperLogLog, geospatial</td><td>strings (opaque blobs) only</td></tr>
    <tr><td>Persistence</td><td>yes: RDB snapshots, AOF append-only log</td><td>no — pure in-memory</td></tr>
    <tr><td>Replication &amp; HA</td><td>built-in replication, Sentinel failover, Redis Cluster sharding (16,384 hash slots)</td><td>none built in; client-side sharding (consistent hashing)</td></tr>
    <tr><td>Threading</td><td>mainly single-threaded command execution (I/O threads optional)</td><td>multi-threaded</td></tr>
    <tr><td>Extras</td><td>pub/sub, Lua scripts, transactions, TTL per key, eviction policies</td><td>simple get/set/delete, LRU eviction</td></tr>
    <tr><td>Max value size</td><td>512 MB</td><td>1 MB default</td></tr>
    <tr><td>Choose when</td><td>you need rich structures, persistence, leaderboards, rate limiting, queues, sessions</td><td>you need a simple, very fast, horizontally scaled object cache</td></tr>
  </tbody>
</table>
<pre><code class="language-bash">SET session:9f2c "user_42" EX 1800        # key with 30-minute expiry
GET session:9f2c
INCR api:rate:user_42:202609151030        # per-minute request counter
EXPIRE api:rate:user_42:202609151030 60
ZADD leaderboard 980 "aman" 1200 "diya"   # sorted set
ZREVRANGE leaderboard 0 9 WITHSCORES      # top 10
HSET product:42 name "Keyboard" price 1499
HGETALL product:42</code></pre>

<h3>3. Scaling and availability of the cache tier</h3>
<ul>
  <li><strong>Sharding</strong> keys across nodes with <strong>consistent hashing</strong> (Memcached clients) or hash slots (Redis Cluster) so adding a node remaps few keys.</li>
  <li><strong>Replication</strong> — each primary has replicas; failover on primary loss.</li>
  <li>Plan for the cache being <strong>down or cold</strong>: the database must survive the load (warm-up scripts, rate limiting, circuit breakers).</li>
  <li>Managed options: Amazon ElastiCache / MemoryDB, Azure Cache for Redis, Google Memorystore.</li>
</ul>

<h3>4. CDN cache</h3>
<p>CDN edge servers cache HTTP responses according to headers from the origin. Key concepts: <strong>cache key</strong> (usually URL + selected headers/query params), <strong>TTL</strong>, <strong>purge/invalidation</strong> APIs, <strong>origin shield</strong>, and hit ratio monitoring.</p>

<h3>5. HTTP caching headers</h3>
<table>
  <thead><tr><th>Header</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>Cache-Control: max-age=31536000, immutable</code></td><td>browsers and CDNs may cache for one year — for fingerprinted static files</td></tr>
    <tr><td><code>Cache-Control: s-maxage=300</code></td><td>TTL for shared caches (CDN/proxy) only</td></tr>
    <tr><td><code>Cache-Control: no-cache</code></td><td>may store, but must revalidate with the origin before using</td></tr>
    <tr><td><code>Cache-Control: no-store</code></td><td>never store (sensitive data)</td></tr>
    <tr><td><code>Cache-Control: private</code></td><td>only the user's browser may cache, not a CDN</td></tr>
    <tr><td><code>ETag</code> / <code>If-None-Match</code></td><td>content fingerprint; unchanged → <strong>304 Not Modified</strong> with no body</td></tr>
    <tr><td><code>Last-Modified</code> / <code>If-Modified-Since</code></td><td>date-based revalidation</td></tr>
    <tr><td><code>Vary: Accept-Encoding</code></td><td>store separate copies per header value (gzip vs br)</td></tr>
    <tr><td><code>stale-while-revalidate=60</code></td><td>serve stale for 60 s while refreshing in the background</td></tr>
  </tbody>
</table>

<h3>6. Putting it together — a read request in a large system</h3>
<div class="formula">Browser cache → CDN edge → load balancer → API server in-process cache → Redis cluster → database (buffer pool) → disk</div>
<p>Each layer that can answer stops the request from travelling further, cutting latency and load on everything behind it.</p>
"""
    + check("Which store supports sorted sets for a real-time leaderboard and can persist data to disk?",
            ["Memcached", "Redis", "A pull CDN", "An L4 load balancer"], "b",
            "Redis provides sorted sets plus RDB/AOF persistence; Memcached stores only opaque values in memory.")
    + check("Response header Cache-Control: private, max-age=600 means:",
            ["CDNs may cache it for 10 minutes", "only the user's browser may cache it for 10 minutes", "nobody may cache it", "cache forever"], "b",
            "private forbids shared caches such as CDNs; max-age sets the browser's freshness lifetime.")
))
