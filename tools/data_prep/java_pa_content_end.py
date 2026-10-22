"""End Term notes (lectures 28-30): multithreading and concurrency."""

from java_pa_content_st1 import topic

END_TERM = []

END_TERM.append(topic(
    "Threads & the Thread Lifecycle",
    "Lectures 28-29 · doing several things at once",
    r"""
<h3>1. Process vs thread</h3>
<table>
  <thead><tr><th></th><th>Process</th><th>Thread</th></tr></thead>
  <tbody>
    <tr><td>Memory</td><td>its own address space</td><td>shares the heap with sibling threads</td></tr>
    <tr><td>Owns</td><td>everything</td><td>its own stack, program counter and local variables</td></tr>
    <tr><td>Creation cost</td><td>heavy</td><td>light</td></tr>
    <tr><td>Communication</td><td>IPC (pipes, sockets)</td><td>shared objects — fast, but needs synchronization</td></tr>
  </tbody>
</table>
<p>Threads share the heap, which is exactly why they are fast <em>and</em> exactly why race conditions exist.</p>

<h3>2. Why bother</h3>
<ul>
  <li>Keep a UI responsive while work happens in the background.</li>
  <li>Use all CPU cores instead of one.</li>
  <li>Overlap waiting: while one thread waits for the database, another can compute.</li>
</ul>

<h3>3. The six lifecycle states — draw this diagram</h3>
<pre><code class="language-bash">   new Thread()          start()             scheduler picks it
NEW ------------&gt; RUNNABLE ------------&gt; (running) ------------&gt; TERMINATED
                     ^  |                                   run() returns
                     |  | wait() / join() / sleep(ms) / lock is busy
                     |  v
            BLOCKED  |  WAITING  |  TIMED_WAITING
                     (notify(), lock released, or timeout brings it back)</code></pre>

<table>
  <thead><tr><th>State</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>NEW</code></td><td>object created, <code>start()</code> not called yet</td></tr>
    <tr><td><code>RUNNABLE</code></td><td>ready to run or running — the JVM does not separate the two</td></tr>
    <tr><td><code>BLOCKED</code></td><td>waiting to enter a <code>synchronized</code> block whose lock is held</td></tr>
    <tr><td><code>WAITING</code></td><td><code>wait()</code>, <code>join()</code> with no timeout — waits indefinitely</td></tr>
    <tr><td><code>TIMED_WAITING</code></td><td><code>sleep(ms)</code>, <code>wait(ms)</code>, <code>join(ms)</code></td></tr>
    <tr><td><code>TERMINATED</code></td><td><code>run()</code> finished or threw</td></tr>
  </tbody>
</table>

<h3>4. Useful Thread methods</h3>
<pre><code class="language-java">t.start();                    // creates a new call stack and calls run() on it
t.join();                     // the CALLING thread waits until t finishes
Thread.sleep(1000);           // pause this thread ~1s, keeps any locks it holds
t.setDaemon(true);            // background thread - JVM exits without waiting for it
t.setName("worker-1");
t.setPriority(Thread.MAX_PRIORITY);   // only a hint to the scheduler
Thread.currentThread().getName();
t.interrupt();                // polite request to stop; the thread must check for it</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; <code>start()</code> vs <code>run()</code> — the most repeated exam question.</strong>
  <code>start()</code> asks the JVM for a new thread and then calls <code>run()</code> on it.
  Calling <code>run()</code> yourself just runs an ordinary method on the current thread — no concurrency at all.
  Calling <code>start()</code> twice throws <code>IllegalThreadStateException</code>.
</div>

<div class="callout callout-tip">
  <strong>&#128161; sleep vs wait:</strong> <code>sleep()</code> is a <code>Thread</code> static method and
  <strong>keeps</strong> the lock. <code>wait()</code> is an <code>Object</code> method, must be inside
  <code>synchronized</code>, and <strong>releases</strong> the lock until <code>notify()</code>.
</div>
"""
))

END_TERM.append(topic(
    "Creating Threads — Thread vs Runnable",
    "Lectures 28-29 · three ways, one preferred",
    r"""
<h3>1. Extending Thread</h3>
<pre><code class="language-java">class Downloader extends Thread {
    @Override public void run() {
        System.out.println("Downloading in " + Thread.currentThread().getName());
    }
}
new Downloader().start();</code></pre>

<h3>2. Implementing Runnable — the recommended way</h3>
<pre><code class="language-java">class Task implements Runnable {
    @Override public void run() { System.out.println("Working..."); }
}
Thread t = new Thread(new Task(), "worker-1");
t.start();

// With a lambda, since Runnable is a functional interface
new Thread(() -&gt; System.out.println("Quick task")).start();</code></pre>

<div class="callout callout-key">
  <strong>&#128273; Why Runnable is preferred:</strong>
  <ul>
    <li>Java allows only one parent class — extending <code>Thread</code> burns it.</li>
    <li>It separates the <em>task</em> from the <em>worker</em>, so the same Runnable can go to a thread pool.</li>
    <li>Better for object-oriented design: you inherit <code>Thread</code> only if you truly specialise a thread.</li>
  </ul>
</div>

<h3>3. Callable and Future — when you need a result</h3>
<p><code>Runnable.run()</code> returns nothing and cannot throw checked exceptions.
<code>Callable&lt;V&gt;.call()</code> can do both.</p>

<pre><code class="language-java">ExecutorService pool = Executors.newFixedThreadPool(4);

Future&lt;Integer&gt; future = pool.submit(() -&gt; {
    Thread.sleep(500);
    return 6 * 7;
});

System.out.println(future.get());   // blocks until the answer is ready -> 42
pool.shutdown();                    // ALWAYS shut a pool down, else the JVM never exits</code></pre>

<h3>4. ExecutorService — do not create threads by hand</h3>
<table>
  <thead><tr><th>Factory</th><th>Gives you</th></tr></thead>
  <tbody>
    <tr><td><code>newFixedThreadPool(n)</code></td><td>exactly n reusable threads — the usual choice</td></tr>
    <tr><td><code>newCachedThreadPool()</code></td><td>grows and shrinks on demand; for many short tasks</td></tr>
    <tr><td><code>newSingleThreadExecutor()</code></td><td>one thread, tasks run in order</td></tr>
    <tr><td><code>newScheduledThreadPool(n)</code></td><td>delayed and repeating tasks</td></tr>
  </tbody>
</table>

<pre><code class="language-java">ExecutorService pool = Executors.newFixedThreadPool(3);
for (int i = 1; i &lt;= 10; i++) {
    int id = i;                                  // must be effectively final
    pool.execute(() -&gt; System.out.println("Job " + id + " on " + Thread.currentThread().getName()));
}
pool.shutdown();                                 // no new tasks; running ones finish
pool.awaitTermination(1, TimeUnit.MINUTES);</code></pre>
<p>Creating a thread costs memory and time. A pool reuses a handful of threads for thousands of tasks —
this is how every real server works.</p>

<h3>5. join() in practice</h3>
<pre><code class="language-java">Thread t1 = new Thread(() -&gt; sum(0, 500));
Thread t2 = new Thread(() -&gt; sum(500, 1000));
t1.start(); t2.start();
t1.join(); t2.join();          // wait for BOTH before combining results
System.out.println("Both halves done");</code></pre>
"""
))

END_TERM.append(topic(
    "Race Conditions & Synchronization",
    "Lectures 28-29 · the core of the End Term paper",
    r"""
<h3>1. What a race condition is</h3>
<p>Two threads read-modify-write the same variable and the result depends on who wins the race.
<code>count++</code> looks atomic but is really three steps: <em>read, add 1, write back</em>.
Interleave those and updates get lost.</p>

<pre><code class="language-java">class Counter {
    private int count = 0;
    public void increment() { count++; }      // NOT atomic
    public int get() { return count; }
}
// 2 threads x 10,000 increments each usually prints something less than 20,000</code></pre>

<h3>2. Fix 1 — synchronized method</h3>
<pre><code class="language-java">public synchronized void increment() { count++; }</code></pre>
<p>The thread must own the object's <strong>intrinsic lock (monitor)</strong> to enter. Everyone else waits
(state <code>BLOCKED</code>). For a <code>static synchronized</code> method the lock is the <code>Class</code> object instead.</p>

<h3>3. Fix 2 — synchronized block (finer grained)</h3>
<pre><code class="language-java">private final Object lock = new Object();

public void increment() {
    doExpensiveUnsharedWork();      // outside the lock - stays parallel
    synchronized (lock) {
        count++;                    // only the shared part is serialised
    }
}</code></pre>
<p>Locking less code means more parallelism. Lock the smallest region that still protects the shared state.</p>

<h3>4. Fix 3 — atomic classes (no locking at all)</h3>
<pre><code class="language-java">private final AtomicInteger count = new AtomicInteger();
count.incrementAndGet();     // one indivisible CPU instruction (compare-and-swap)</code></pre>

<h3>5. volatile — visibility, not atomicity</h3>
<pre><code class="language-java">private volatile boolean running = true;   // every read goes to main memory

public void stop() { running = false; }    // other threads see it immediately
public void run() { while (running) { } }  // without volatile this can loop forever</code></pre>

<div class="callout callout-key">
  <strong>&#128273; volatile vs synchronized:</strong> <code>volatile</code> guarantees <em>visibility</em>
  (no stale cached copy) but not <em>atomicity</em> — <code>volatile int c; c++;</code> is still a race.
  <code>synchronized</code> gives both, at the cost of blocking.
</div>

<h3>6. The bank account example</h3>
<pre><code class="language-java">public class BankAccount {
    private int balance = 1000;

    public synchronized void withdraw(int amount) {
        if (balance &gt;= amount) {      // check
            balance -= amount;        // and act - must be ONE atomic step
        }
    }

    public synchronized int getBalance() { return balance; }
}</code></pre>
<p>Without <code>synchronized</code>, two threads can both pass the <code>if</code> before either subtracts —
the classic "check-then-act" bug that lets an account go negative.</p>

<h3>7. wait / notify — threads cooperating</h3>
<pre><code class="language-java">// Producer-Consumer with a bounded buffer
synchronized (buffer) {
    while (buffer.isEmpty()) buffer.wait();    // ALWAYS wait inside a while, never an if
    Item item = buffer.remove();
    buffer.notifyAll();                        // wake up producers
}</code></pre>
<ul>
  <li><code>wait()</code>, <code>notify()</code>, <code>notifyAll()</code> belong to <code>Object</code> and must be
      called while holding that object's monitor.</li>
  <li>Use <code>while</code>, not <code>if</code> — a thread can wake up spuriously or lose the race to another consumer.</li>
  <li>Prefer <code>notifyAll()</code>; <code>notify()</code> can wake the wrong waiter and stall the system.</li>
</ul>
"""
))

END_TERM.append(topic(
    "Deadlock, Livelock, Starvation & Thread Safety",
    "Lecture 30 · concurrency hazards",
    r"""
<h3>1. Deadlock</h3>
<p>Two threads each hold a lock the other needs, so both wait forever.</p>

<pre><code class="language-java">// Thread 1
synchronized (lockA) { synchronized (lockB) { } }
// Thread 2
synchronized (lockB) { synchronized (lockA) { } }   // opposite order -> deadlock</code></pre>

<p><strong>Coffman's four conditions</strong> — all must hold for deadlock, so breaking any one prevents it:</p>
<ol>
  <li><strong>Mutual exclusion</strong> — a resource can be held by only one thread.</li>
  <li><strong>Hold and wait</strong> — a thread holds one resource while requesting another.</li>
  <li><strong>No pre-emption</strong> — a lock cannot be forcibly taken away.</li>
  <li><strong>Circular wait</strong> — a cycle of threads each waiting on the next.</li>
</ol>

<h3>2. Preventing deadlock</h3>
<ul>
  <li><strong>Global lock ordering</strong> — every thread takes locks in the same fixed order (kills circular wait). This is the standard answer.</li>
  <li>Use timeouts: <code>lock.tryLock(1, TimeUnit.SECONDS)</code> and back off if it fails.</li>
  <li>Hold fewer locks; hold them for less time.</li>
  <li>Prefer immutable objects and <code>java.util.concurrent</code> utilities over hand-rolled locking.</li>
</ul>

<pre><code class="language-java">// Ordered locking - both threads take the lower id first, so no cycle can form
Object first  = a.id &lt; b.id ? a.lock : b.lock;
Object second = a.id &lt; b.id ? b.lock : a.lock;
synchronized (first) { synchronized (second) { transfer(a, b, amount); } }</code></pre>

<h3>3. Livelock and starvation</h3>
<table>
  <thead><tr><th>Problem</th><th>What it looks like</th><th>Typical fix</th></tr></thead>
  <tbody>
    <tr><td><strong>Deadlock</strong></td><td>threads blocked forever, CPU idle</td><td>lock ordering, timeouts</td></tr>
    <tr><td><strong>Livelock</strong></td><td>threads keep reacting to each other and make no progress; CPU busy</td><td>randomised back-off</td></tr>
    <tr><td><strong>Starvation</strong></td><td>one thread never gets the lock because greedy threads keep taking it</td><td>fair locks (<code>new ReentrantLock(true)</code>)</td></tr>
  </tbody>
</table>
<p>Livelock is the two-people-in-a-corridor problem: both keep stepping aside politely and neither gets through.</p>

<h3>4. Thread safety toolkit</h3>
<table>
  <thead><tr><th>Approach</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Immutability (best)</td><td><code>final</code> fields, <code>String</code>, <code>LocalDate</code>, records</td></tr>
    <tr><td>Confinement</td><td>keep data inside one thread; local variables are always safe</td></tr>
    <tr><td>Synchronization</td><td><code>synchronized</code>, <code>ReentrantLock</code></td></tr>
    <tr><td>Atomics</td><td><code>AtomicInteger</code>, <code>AtomicReference</code></td></tr>
    <tr><td>Concurrent collections</td><td><code>ConcurrentHashMap</code>, <code>BlockingQueue</code></td></tr>
  </tbody>
</table>

<h3>5. ReentrantLock — synchronized with extra features</h3>
<pre><code class="language-java">private final ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    // critical section
} finally {
    lock.unlock();       // MUST be in finally, or a thrown exception leaks the lock
}

if (lock.tryLock(1, TimeUnit.SECONDS)) { }   // give up instead of blocking forever</code></pre>
<p>Extras over <code>synchronized</code>: try-with-timeout, interruptible waiting, fairness, and multiple
<code>Condition</code> objects. The cost is that you must unlock manually.</p>

<h3>6. Concurrent collections</h3>
<table>
  <thead><tr><th>Instead of</th><th>Use</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td><code>HashMap</code></td><td><code>ConcurrentHashMap</code></td><td>locks only one bucket, not the whole map</td></tr>
    <tr><td><code>ArrayList</code> (mostly reads)</td><td><code>CopyOnWriteArrayList</code></td><td>writes copy the array; reads never lock</td></tr>
    <tr><td>manual wait/notify queue</td><td><code>ArrayBlockingQueue</code> / <code>LinkedBlockingQueue</code></td><td>ready-made producer-consumer</td></tr>
    <tr><td><code>Collections.synchronizedMap</code></td><td><code>ConcurrentHashMap</code></td><td>far better throughput</td></tr>
  </tbody>
</table>

<pre><code class="language-java">BlockingQueue&lt;Order&gt; queue = new ArrayBlockingQueue&lt;&gt;(100);
queue.put(order);        // blocks if the queue is full
Order o = queue.take();  // blocks if the queue is empty - no wait/notify needed

CountDownLatch latch = new CountDownLatch(3);
latch.countDown();       // each worker signals
latch.await();           // main thread waits for all three</code></pre>

<div class="callout callout-warning">
  <strong>&#9888;&#65039; <code>Collections.synchronizedMap</code> is not enough for compound actions.</strong>
  <code>if (!map.containsKey(k)) map.put(k, v);</code> is still a race — each call is synchronized, the pair is not.
  Use <code>ConcurrentHashMap.putIfAbsent</code> or <code>computeIfAbsent</code>.
</div>
"""
))

END_TERM.append(topic(
    "Concurrency Rapid Revision",
    "Lecture 30 · last-hour sheet",
    r"""
<h3>1. One-line answers</h3>
<table>
  <thead><tr><th>Question</th><th>Answer</th></tr></thead>
  <tbody>
    <tr><td><code>start()</code> vs <code>run()</code></td><td><code>start()</code> makes a new thread; <code>run()</code> is just a method call</td></tr>
    <tr><td><code>sleep()</code> vs <code>wait()</code></td><td>sleep keeps the lock (Thread, static); wait releases it (Object, needs synchronized)</td></tr>
    <tr><td><code>notify()</code> vs <code>notifyAll()</code></td><td>one arbitrary waiter vs all waiters; prefer notifyAll</td></tr>
    <tr><td><code>volatile</code> vs <code>synchronized</code></td><td>visibility only vs visibility + mutual exclusion</td></tr>
    <tr><td>Runnable vs Callable</td><td><code>run()</code> returns void; <code>call()</code> returns a value and may throw</td></tr>
    <tr><td>Runnable vs Thread</td><td>implement Runnable — keeps your one inheritance slot free and fits thread pools</td></tr>
    <tr><td>Deadlock vs livelock</td><td>both stuck; deadlock is blocked and idle, livelock is active and looping</td></tr>
    <tr><td>User vs daemon thread</td><td>the JVM waits for user threads, abandons daemon threads at exit</td></tr>
    <tr><td>Thread-safe Map</td><td><code>ConcurrentHashMap</code></td></tr>
    <tr><td>Why a thread pool</td><td>thread creation is expensive; reuse a fixed set of workers</td></tr>
  </tbody>
</table>

<h3>2. Complete worked example — safe counter, three ways</h3>
<pre><code class="language-java">public class CounterDemo {
    static int plain = 0;
    static final AtomicInteger atomic = new AtomicInteger();
    static int guarded = 0;
    static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Runnable job = () -&gt; {
            for (int i = 0; i &lt; 100_000; i++) {
                plain++;                                  // RACE - loses updates
                atomic.incrementAndGet();                 // safe, lock free
                synchronized (lock) { guarded++; }        // safe, locking
            }
        };

        Thread t1 = new Thread(job), t2 = new Thread(job);
        t1.start(); t2.start();
        t1.join();  t2.join();

        System.out.println("plain   = " + plain);         // usually < 200000
        System.out.println("atomic  = " + atomic.get());  // exactly 200000
        System.out.println("guarded = " + guarded);       // exactly 200000
    }
}</code></pre>

<h3>3. Mistakes that cost marks</h3>
<ul>
  <li>Calling <code>run()</code> instead of <code>start()</code>.</li>
  <li>Calling <code>wait()</code> outside <code>synchronized</code> — <code>IllegalMonitorStateException</code>.</li>
  <li>Using <code>if</code> instead of <code>while</code> around <code>wait()</code>.</li>
  <li>Forgetting <code>pool.shutdown()</code>, so the program never ends.</li>
  <li>Forgetting <code>unlock()</code> in a <code>finally</code> block.</li>
  <li>Claiming <code>volatile</code> makes <code>count++</code> safe. It does not.</li>
  <li>Synchronizing on a mutable field or a boxed <code>Integer</code> — the lock object changes underneath you.</li>
</ul>

<div class="callout callout-key">
  <strong>&#128273; The golden rule:</strong> shared + mutable = danger. Remove either one — make it unshared
  (thread confinement) or immutable — and you need no locks at all.
</div>
"""
))
