"""System Design (24CSE0318) — Lab plan (labs 1-30): tools, case studies, schema design, SQL, APIs, scalability and security."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Labs 1–2 — System Design Tools & Diagram Types",
    "Draw.io, Canva, Lucidchart, Figma — and which diagram answers which question",
    r"""
<h3>1. Tools</h3>
<table>
  <thead><tr><th>Tool</th><th>Best for</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td><strong>Draw.io (diagrams.net)</strong></td><td>architecture, UML, ER, flowcharts</td><td>free, works offline, saves to Drive/GitHub; AWS/GCP/Azure icon sets</td></tr>
    <tr><td><strong>Lucidchart</strong></td><td>collaborative UML and architecture</td><td>real-time collaboration, templates, data-linked diagrams</td></tr>
    <tr><td><strong>Canva</strong></td><td>presentation slides, posters, simple visuals</td><td>great for the final case-study presentation</td></tr>
    <tr><td><strong>Figma</strong></td><td>UI mock-ups, wireframes, user flows</td><td>design the screens your use cases describe</td></tr>
    <tr><td>MySQL Workbench / dbdiagram.io</td><td>ER diagrams that generate SQL</td><td>forward-engineer tables</td></tr>
    <tr><td>Mermaid / PlantUML</td><td>diagrams as code</td><td>version-controlled diagrams in Markdown</td></tr>
  </tbody>
</table>

<h3>2. Which diagram when</h3>
<table>
  <thead><tr><th>Diagram</th><th>Answers</th><th>Level</th></tr></thead>
  <tbody>
    <tr><td><strong>Context diagram</strong></td><td>What is inside the system boundary and which external actors/systems talk to it?</td><td>HLD</td></tr>
    <tr><td><strong>Architecture / component diagram</strong></td><td>Which services, databases, caches, queues exist and how do they connect?</td><td>HLD</td></tr>
    <tr><td><strong>Deployment diagram</strong></td><td>Where does each component run (regions, servers, containers)?</td><td>HLD</td></tr>
    <tr><td><strong>Use case diagram</strong></td><td>Who uses the system for what?</td><td>requirements</td></tr>
    <tr><td><strong>Data flow diagram (DFD)</strong></td><td>How does data move and transform between processes and stores?</td><td>analysis</td></tr>
    <tr><td><strong>Class diagram</strong></td><td>What classes, attributes, methods and relationships exist?</td><td>LLD</td></tr>
    <tr><td><strong>Sequence diagram</strong></td><td>In what order do objects/services exchange messages for one scenario?</td><td>LLD</td></tr>
    <tr><td><strong>Activity / state diagram</strong></td><td>What are the steps of a workflow / the states of an object (order: placed → paid → shipped)?</td><td>LLD</td></tr>
    <tr><td><strong>ER diagram</strong></td><td>What entities and relationships does the database hold?</td><td>data design</td></tr>
  </tbody>
</table>

<h3>3. UML relationships you must draw correctly</h3>
<table>
  <thead><tr><th>Relationship</th><th>Notation</th><th>Meaning</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Association</td><td>solid line</td><td>uses / knows about</td><td>Customer — Order</td></tr>
    <tr><td>Aggregation</td><td>hollow diamond</td><td>has-a, parts can exist independently</td><td>Team ◇— Player</td></tr>
    <tr><td>Composition</td><td>filled diamond</td><td>owns, parts die with the whole</td><td>Order ◆— OrderItem</td></tr>
    <tr><td>Inheritance (generalisation)</td><td>hollow triangle arrow</td><td>is-a</td><td>Car ▷ Vehicle</td></tr>
    <tr><td>Realisation</td><td>dashed line, hollow triangle</td><td>implements an interface</td><td>UpiPayment ⇢ PaymentMethod</td></tr>
    <tr><td>Dependency</td><td>dashed arrow</td><td>temporarily uses</td><td>ReportService ⇢ PdfWriter</td></tr>
  </tbody>
</table>
<p>Multiplicity: <code>1</code>, <code>0..1</code>, <code>*</code> or <code>0..*</code>, <code>1..*</code>. Visibility: <code>+</code> public, <code>-</code> private, <code>#</code> protected.</p>
"""
))

TOPICS.append(topic(
    "Lab 3 — Case Study: Basic Architecture & Video Upload on YouTube",
    "Requirements, estimates, HLD and the upload pipeline",
    r"""
<h3>1. Requirements</h3>
<p><strong>Functional:</strong> upload videos; process into multiple resolutions; stream/watch; search; view counts, likes and comments; channel subscriptions; recommendations.</p>
<p><strong>Non-functional:</strong> highly available (uploads and playback), low start-up latency for playback (&lt; 2 s), smooth adaptive streaming worldwide, durable storage (never lose an upload), eventual consistency acceptable for counts, cost-efficient storage and bandwidth.</p>

<h3>2. Rough estimates (state your assumptions)</h3>
<ul>
  <li>Assume 5 million uploads/day, average 300 MB raw → 1.5 PB raw per day; transcoded renditions add roughly 1–2× more.</li>
  <li>Read-heavy: views vastly outnumber uploads (hundreds to one) → the CDN and caching dominate the design.</li>
  <li>Upload traffic: 5M / 86,400 ≈ 58 uploads/s average, several times that at peak.</li>
</ul>

<h3>3. High-level architecture</h3>
<pre><code class="language-text">                 ┌────────────┐
  Creator ──────►│ API Gateway│──► Auth
     │           └─────┬──────┘
     │ presigned URL   │ metadata (title, tags)
     ▼                 ▼
┌──────────────┐  ┌──────────────┐     VideoUploaded     ┌─────────────────┐
│ Object store │  │ Upload/Meta  │─────── event ────────►│ Message queue   │
│ (raw files)  │  │ service + DB │                       │ (Kafka / SQS)   │
└──────┬───────┘  └──────────────┘                       └───────┬─────────┘
       │                                                         ▼
       │                                         ┌────────────────────────────┐
       └────────────── read raw ────────────────►│ Transcoding workers (DAG):  │
                                                 │ validate → split → encode   │
                                                 │ 240p..4K (H.264/VP9/AV1)    │
                                                 │ → thumbnails → HLS/DASH     │
                                                 └──────────────┬─────────────┘
                                                                ▼
                                   ┌─────────────────┐   ┌──────────────┐
  Viewer ◄──── video segments ─────│  CDN edges      │◄──│ Object store │
     │                             └─────────────────┘   │ (encoded)    │
     └──── watch page, search ────► API → Cache (Redis) → Metadata DB / Search index</code></pre>

<h3>4. Upload flow step by step</h3>
<ol>
  <li>Client asks the upload service to start an upload; the service creates a video record (status <code>UPLOADING</code>) and returns a <strong>pre-signed URL</strong>.</li>
  <li>Client uploads <strong>directly to object storage</strong> (S3/GCS) using <strong>resumable, chunked multipart upload</strong> — app servers never carry the heavy bytes, and a dropped connection resumes from the last chunk.</li>
  <li>Storage triggers a <strong>VideoUploaded</strong> event onto a queue.</li>
  <li>Transcoding workers pull jobs, split the video into segments and encode them <strong>in parallel</strong> into several resolutions and bitrates; generate thumbnails; optionally run content moderation and copyright checks.</li>
  <li>Encoded segments and manifests (HLS <code>.m3u8</code> / DASH <code>.mpd</code>) are written to storage; metadata status becomes <code>READY</code>; subscribers are notified.</li>
  <li>Viewers fetch the manifest and segments from the <strong>CDN</strong>; the player uses <strong>adaptive bitrate streaming</strong> to switch quality as bandwidth changes.</li>
</ol>

<h3>5. Data choices</h3>
<table>
  <thead><tr><th>Data</th><th>Store</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Video files, thumbnails</td><td>object storage + CDN</td><td>cheap, durable, huge scale</td></tr>
    <tr><td>Video and channel metadata</td><td>relational DB (sharded by video/channel id) with read replicas</td><td>structured, transactional</td></tr>
    <tr><td>Hot metadata, view counts</td><td>Redis; counts batched to DB (write-behind)</td><td>fast, tolerant of slight delay</td></tr>
    <tr><td>Comments, activity feeds</td><td>wide-column store (Cassandra/Bigtable)</td><td>massive write volume</td></tr>
    <tr><td>Search</td><td>Elasticsearch index</td><td>full-text search on titles, tags</td></tr>
  </tbody>
</table>

<h3>6. Discussion points for the viva</h3>
<ul>
  <li>Why presigned direct uploads instead of streaming through app servers?</li>
  <li>How does the queue protect transcoding from upload spikes? (buffering, independent scaling of workers)</li>
  <li>What happens if a worker crashes mid-job? (message visibility timeout → retry; idempotent jobs)</li>
  <li>How do popular vs long-tail videos differ in CDN caching cost?</li>
</ul>
"""
))

TOPICS.append(topic(
    "Lab 4 — Comparing Monolithic, Microservices & Event-Driven Architectures",
    "The same food-delivery app designed three ways",
    r"""
<h3>1. Monolith</h3>
<pre><code class="language-text">Clients ──► Load balancer ──► [ FoodApp.war: Users | Restaurants | Orders | Payments | Delivery ] ──► one MySQL DB</code></pre>
<p>Place order = in-process method calls inside one database transaction. Simple, but a spike in restaurant browsing forces scaling the whole app; one payment bug redeploys everything.</p>

<h3>2. Microservices</h3>
<pre><code class="language-text">Clients ──► API Gateway ──► User svc ──► users DB
                        ├─► Restaurant svc ──► catalog DB (+ search)
                        ├─► Order svc ──► orders DB
                        ├─► Payment svc ──► payments DB ──► Razorpay
                        └─► Delivery svc ──► riders DB (+ geo index)</code></pre>
<p>Place order = Order service calls Payment then Delivery over REST/gRPC. Each service scales and deploys independently, but a failure mid-sequence needs a <strong>Saga</strong> (compensating actions such as refunding payment if no rider is found).</p>

<h3>3. Event-driven</h3>
<pre><code class="language-text">Order svc ── OrderPlaced ──► [ Kafka ] ──► Payment svc ── PaymentSucceeded ──► [ Kafka ] ──► Delivery svc
                                  └──────► Notification svc                         └──► Analytics svc</code></pre>
<p>Services react to events asynchronously. New features (loyalty points) subscribe without changing the Order service. The user sees "order confirmed" after the PaymentSucceeded event, so the UI must handle a short delay.</p>

<h3>4. Comparison table to include in your file</h3>
<table>
  <thead><tr><th>Criterion</th><th>Monolith</th><th>Microservices</th><th>Event-driven</th></tr></thead>
  <tbody>
    <tr><td>Development speed (early)</td><td>fastest</td><td>slower</td><td>slower</td></tr>
    <tr><td>Deployment</td><td>all at once</td><td>per service</td><td>per service / consumer</td></tr>
    <tr><td>Scalability</td><td>whole app</td><td>fine-grained</td><td>fine-grained, absorbs spikes via the broker</td></tr>
    <tr><td>Coupling</td><td>tight (in-process)</td><td>looser (API contracts)</td><td>loosest (event contracts)</td></tr>
    <tr><td>Consistency</td><td>ACID transactions</td><td>Saga, eventual</td><td>eventual</td></tr>
    <tr><td>Fault isolation</td><td>poor</td><td>good (with timeouts / circuit breakers)</td><td>good (queues buffer failures)</td></tr>
    <tr><td>Debugging</td><td>easiest</td><td>needs distributed tracing</td><td>hardest (asynchronous flows)</td></tr>
    <tr><td>Latency</td><td>lowest</td><td>network hops</td><td>asynchronous; end-to-end completion delayed</td></tr>
    <tr><td>Team fit</td><td>small team</td><td>many teams</td><td>many teams, integration-heavy domains</td></tr>
  </tbody>
</table>
<div class="callout callout-tip"><strong>Balanced conclusion:</strong> start as a well-structured <em>modular monolith</em>; extract services where scaling or team boundaries demand it; use events for workflows that don't need an immediate answer.</div>
"""
))

TOPICS.append(topic(
    "Labs 5–10 — Requirements, High-Level Design, Context & Use Case Diagrams (Group Case Study)",
    "Templates to fill for your allotted case study",
    r"""
<h3>1. Problem statement analysis template</h3>
<table>
  <tbody>
    <tr><td><strong>System</strong></td><td>e.g. College Event Ticketing Platform</td></tr>
    <tr><td><strong>Problem</strong></td><td>students queue physically; seats oversold; no digital entry pass</td></tr>
    <tr><td><strong>Users / actors</strong></td><td>Student, Organiser, Admin, Payment Gateway (external), Email/SMS service (external)</td></tr>
    <tr><td><strong>Goals</strong></td><td>book in under a minute, zero overselling, instant QR ticket</td></tr>
    <tr><td><strong>Scope — in</strong></td><td>events, seat booking, payments, QR entry scan, notifications</td></tr>
    <tr><td><strong>Scope — out</strong></td><td>food stalls, sponsor management</td></tr>
    <tr><td><strong>Assumptions</strong></td><td>20,000 students; 2,000 bookings within 5 minutes of a popular release</td></tr>
  </tbody>
</table>

<h3>2. Requirements</h3>
<table>
  <thead><tr><th>ID</th><th>Functional requirement</th><th>Priority</th></tr></thead>
  <tbody>
    <tr><td>FR1</td><td>Organisers create events with venues, seat maps and prices</td><td>Must</td></tr>
    <tr><td>FR2</td><td>Students browse and search events</td><td>Must</td></tr>
    <tr><td>FR3</td><td>Students hold a seat for 5 minutes during payment</td><td>Must</td></tr>
    <tr><td>FR4</td><td>Payment confirmation issues a QR ticket by email</td><td>Must</td></tr>
    <tr><td>FR5</td><td>Gate staff scan QR codes offline-capable</td><td>Should</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>ID</th><th>Non-functional requirement</th><th>Measure</th></tr></thead>
  <tbody>
    <tr><td>NFR1</td><td>Consistency of seat inventory</td><td>no seat sold twice (strong consistency on booking)</td></tr>
    <tr><td>NFR2</td><td>Performance</td><td>p95 page load &lt; 1.5 s at 2,000 concurrent users</td></tr>
    <tr><td>NFR3</td><td>Availability</td><td>99.9% during release windows</td></tr>
    <tr><td>NFR4</td><td>Security</td><td>college SSO login, PCI-compliant gateway, signed QR codes</td></tr>
    <tr><td>NFR5</td><td>Maintainability</td><td>CI pipeline with automated tests on every merge</td></tr>
  </tbody>
</table>

<h3>3. Context diagram (level 0)</h3>
<pre><code class="language-text">  Student ──── browse, book, pay ────►┌───────────────────────┐◄──── create events, reports ──── Organiser
          ◄─── tickets, confirmations ─│  Event Ticketing       │
  Gate staff ── scan QR ─────────────►│  System                │──── charge / refund ───► Payment Gateway
                                       └───────────────────────┘──── email / SMS ───────► Notification Provider
                                                   ▲
                                         College SSO (login)</code></pre>

<h3>4. Use case diagram (textual form you can redraw)</h3>
<table>
  <thead><tr><th>Actor</th><th>Use cases</th></tr></thead>
  <tbody>
    <tr><td>Student</td><td>Log in (includes SSO) · Browse events · Book ticket (includes Hold seat, includes Make payment) · Cancel booking · View ticket</td></tr>
    <tr><td>Organiser</td><td>Create event · Define seat map · View sales report</td></tr>
    <tr><td>Gate staff</td><td>Scan ticket (extends Mark attendance)</td></tr>
    <tr><td>Payment gateway</td><td>Process payment · Process refund</td></tr>
  </tbody>
</table>
<p><strong>«include»</strong> — always part of the base use case (Book ticket always includes Make payment). <strong>«extend»</strong> — optional or conditional behaviour (Apply discount code extends Make payment).</p>

<h4>Use case description — Book ticket</h4>
<ol>
  <li>Student selects an event and a seat.</li>
  <li>System places a 5-minute hold on the seat.</li>
  <li>Student pays through the gateway.</li>
  <li>System confirms the booking, releases the hold into a sale, generates a signed QR ticket and emails it.</li>
</ol>
<p><strong>Alternate flows:</strong> 2a seat already held → show next best seats; 3a payment fails or hold expires → release seat.</p>

<h3>5. High-level architecture</h3>
<pre><code class="language-text">Web / mobile ──► CDN (static) ──► API Gateway (SSO/JWT, rate limit)
                                     ├─► Event service ──► PostgreSQL (events, venues) + Redis cache
                                     ├─► Booking service ──► PostgreSQL (seats, bookings; row locks / unique constraint)
                                     │        └─► Redis (seat holds with 5-minute TTL)
                                     ├─► Payment service ──► Payment gateway (webhooks back)
                                     └─► Notification worker ◄── queue ◄── BookingConfirmed events</code></pre>
<p>Key decision to justify: seat inventory lives in the relational DB with a unique constraint on (event_id, seat_id) for confirmed bookings, so overselling is impossible even if two requests race.</p>
"""
))

TOPICS.append(topic(
    "Labs 11–15 — Low-Level Design: Class, Sequence & Component Diagrams (Parking Lot)",
    "From requirements to classes, interactions and code",
    r"""
<h3>1. Requirements</h3>
<ul>
  <li>Multiple floors; spots of types SMALL (bike), MEDIUM (car), LARGE (bus/truck).</li>
  <li>Entry gate issues a ticket and assigns the nearest suitable free spot.</li>
  <li>Exit gate calculates the fee by duration and vehicle type; pay by cash, card or UPI.</li>
  <li>Display board shows free spots per type.</li>
</ul>

<h3>2. Class diagram (text form)</h3>
<pre><code class="language-text">ParkingLot (singleton)
  - floors: List<Floor>
  - activeTickets: Map<String, Ticket>
  + park(vehicle): Ticket
  + unpark(ticketId, PaymentMethod): Receipt

Floor
  - number: int
  - spots: List<ParkingSpot>
  + findFreeSpot(SpotType): Optional<ParkingSpot>

ParkingSpot
  - id: String
  - type: SpotType
  - vehicle: Vehicle          (0..1)
  + isFree(): boolean
  + assign(v) / release()

abstract Vehicle              Bike, Car, Truck  ──▷ Vehicle
  - plate: String
  + requiredSpot(): SpotType

Ticket                        Receipt
  - id, vehicle, spot, entryTime    - ticket, exitTime, amount

interface PricingStrategy ◁┈┈ HourlyPricing
interface PaymentMethod   ◁┈┈ CashPayment, CardPayment, UpiPayment

Relationships: ParkingLot ◆── Floor ◆── ParkingSpot ; Ticket ── Vehicle, ParkingSpot
               ParkingLot ──> PricingStrategy (strategy pattern)</code></pre>

<h3>3. Sequence diagram — vehicle entry</h3>
<pre><code class="language-text">Driver      EntryGate        ParkingLot         Floor          ParkingSpot
  │ arrive ─────►│                 │                │                 │
  │              │ park(car) ─────►│                │                 │
  │              │                 │ findFreeSpot(MEDIUM) ──►│         │
  │              │                 │                │ isFree()? ─────►│
  │              │                 │◄─── spot M-12 ─│                 │
  │              │                 │ assign(car) ─────────────────────►│
  │              │◄── Ticket T91 ──│                │                 │
  │◄─ print T91 ─│                 │                │                 │</code></pre>

<h3>4. Component diagram</h3>
<pre><code class="language-text">[Gate UI] ──uses──► [Parking API] ──► [Allocation component] ──► [Spot repository] ──► (DB)
                          │
                          ├──► [Billing component] ──► [PricingStrategy]
                          └──► [Payment adapter] ──► (UPI / card provider)
[Display board] ◄── events ── [Allocation component]</code></pre>

<h3>5. Code skeleton</h3>
<pre><code class="language-java">import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

enum SpotType { SMALL, MEDIUM, LARGE }

abstract class Vehicle {
    final String plate;
    Vehicle(String plate) { this.plate = plate; }
    abstract SpotType requiredSpot();
}
class Bike extends Vehicle { Bike(String p) { super(p); } SpotType requiredSpot() { return SpotType.SMALL; } }
class Car extends Vehicle { Car(String p) { super(p); } SpotType requiredSpot() { return SpotType.MEDIUM; } }

class ParkingSpot {
    final String id; final SpotType type; Vehicle vehicle;
    ParkingSpot(String id, SpotType type) { this.id = id; this.type = type; }
    boolean isFree() { return vehicle == null; }
}

record Ticket(String id, Vehicle vehicle, ParkingSpot spot, LocalDateTime entry) {}

interface PricingStrategy { long fee(Ticket t, LocalDateTime exit); }

class HourlyPricing implements PricingStrategy {
    private final Map<SpotType, Long> ratePerHour = Map.of(SpotType.SMALL, 20L, SpotType.MEDIUM, 50L, SpotType.LARGE, 100L);
    public long fee(Ticket t, LocalDateTime exit) {
        long hours = Math.max(1, (long) Math.ceil(Duration.between(t.entry(), exit).toMinutes() / 60.0));
        return hours * ratePerHour.get(t.spot().type);
    }
}

public class ParkingLot {
    private final List<ParkingSpot> spots = new ArrayList<>();
    private final Map<String, Ticket> active = new HashMap<>();
    private final PricingStrategy pricing;
    private int nextTicket = 1;

    ParkingLot(PricingStrategy pricing) { this.pricing = pricing; }
    void addSpot(ParkingSpot s) { spots.add(s); }

    synchronized Ticket park(Vehicle v, LocalDateTime now) {    // synchronized: two gates must not grab the same spot
        ParkingSpot spot = spots.stream()
            .filter(s -> s.isFree() && s.type == v.requiredSpot())
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("No free " + v.requiredSpot() + " spot"));
        spot.vehicle = v;
        Ticket t = new Ticket("T" + nextTicket++, v, spot, now);
        active.put(t.id(), t);
        return t;
    }

    synchronized long unpark(String ticketId, LocalDateTime now) {
        Ticket t = active.remove(ticketId);
        if (t == null) throw new IllegalArgumentException("Unknown ticket");
        t.spot().vehicle = null;
        return pricing.fee(t, now);
    }

    public static void main(String[] args) {
        ParkingLot lot = new ParkingLot(new HourlyPricing());
        lot.addSpot(new ParkingSpot("S-1", SpotType.SMALL));
        lot.addSpot(new ParkingSpot("M-1", SpotType.MEDIUM));
        LocalDateTime in = LocalDateTime.of(2026, 9, 15, 10, 0);
        Ticket t = lot.park(new Car("PB10AB1234"), in);
        System.out.println(t.id() + " at " + t.spot().id);                     // T1 at M-1
        System.out.println("Fee: " + lot.unpark(t.id(), in.plusMinutes(130)));   // 3 hours x 50 = 150
    }
}</code></pre>
<p>Design patterns used: <strong>Strategy</strong> (pricing, payment), <strong>Singleton</strong> (one lot instance in a real app), <strong>Factory</strong> (create vehicles from input). SOLID: open for new vehicle types without changing allocation logic.</p>
"""
))

TOPICS.append(topic(
    "Labs 16–18 — E-Commerce Database: ER Diagram, Normalisation to BCNF & Optimisation",
    "Entities, relationships, DDL and index review",
    r"""
<h3>1. Entities and relationships</h3>
<table>
  <thead><tr><th>Entity</th><th>Key attributes</th></tr></thead>
  <tbody>
    <tr><td>Customer</td><td>customer_id, name, email (unique), phone</td></tr>
    <tr><td>Address</td><td>address_id, customer_id, line1, city, pincode</td></tr>
    <tr><td>Category</td><td>category_id, name, parent_id (self-reference for sub-categories)</td></tr>
    <tr><td>Product</td><td>product_id, category_id, name, price, stock</td></tr>
    <tr><td>Order</td><td>order_id, customer_id, address_id, status, created_at</td></tr>
    <tr><td>OrderItem</td><td>order_id, product_id, quantity, unit_price</td></tr>
    <tr><td>Payment</td><td>payment_id, order_id, method, amount, status</td></tr>
    <tr><td>Review</td><td>review_id, customer_id, product_id, rating, comment</td></tr>
  </tbody>
</table>
<pre><code class="language-text">Customer 1 ───< Address          Customer 1 ───< Order 1 ───< OrderItem >─── 1 Product >─── 1 Category
Order 1 ─── 0..1 Payment         Customer 1 ───< Review >─── 1 Product
(Order ⟷ Product is many-to-many, resolved by OrderItem)</code></pre>

<h3>2. Normalisation walk-through</h3>
<p>Starting flat sheet: <code>OrderSheet(order_id, date, customer_email, customer_name, city, product_name, category, price, qty)</code></p>
<ul>
  <li><strong>1NF:</strong> one product per row; key (order_id, product_name).</li>
  <li><strong>2NF:</strong> date and customer data depend only on order_id; price and category only on product → split into Order, Customer, Product, OrderItem.</li>
  <li><strong>3NF:</strong> customer_name depends on customer_email (non-key → non-key inside Order) → keep only customer_id in Order; city moves to Address.</li>
  <li><strong>BCNF:</strong> every determinant is a candidate key in each table — e.g. in Product, product_id → everything; email is unique in Customer (a candidate key), so email → name does not break BCNF.</li>
  <li>OrderItem keeps <code>unit_price</code> deliberately: it records the <em>price at purchase time</em>, not a redundant copy of the current price.</li>
</ul>

<h3>3. DDL</h3>
<pre><code class="language-sql">CREATE TABLE customer (
  customer_id  BIGINT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL UNIQUE,
  phone        VARCHAR(15)
);
CREATE TABLE address (
  address_id   BIGINT PRIMARY KEY,
  customer_id  BIGINT NOT NULL REFERENCES customer(customer_id),
  line1        VARCHAR(200) NOT NULL,
  city         VARCHAR(60)  NOT NULL,
  pincode      CHAR(6)      NOT NULL
);
CREATE TABLE category (
  category_id  INT PRIMARY KEY,
  name         VARCHAR(80) NOT NULL UNIQUE,
  parent_id    INT REFERENCES category(category_id)
);
CREATE TABLE product (
  product_id   BIGINT PRIMARY KEY,
  category_id  INT NOT NULL REFERENCES category(category_id),
  name         VARCHAR(150) NOT NULL,
  price        DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock        INT NOT NULL DEFAULT 0 CHECK (stock >= 0)
);
CREATE TABLE orders (
  order_id     BIGINT PRIMARY KEY,
  customer_id  BIGINT NOT NULL REFERENCES customer(customer_id),
  address_id   BIGINT NOT NULL REFERENCES address(address_id),
  status       VARCHAR(20) NOT NULL CHECK (status IN ('PLACED','PAID','SHIPPED','DELIVERED','CANCELLED')),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE order_item (
  order_id     BIGINT REFERENCES orders(order_id),
  product_id   BIGINT REFERENCES product(product_id),
  quantity     INT NOT NULL CHECK (quantity > 0),
  unit_price   DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE TABLE payment (
  payment_id   BIGINT PRIMARY KEY,
  order_id     BIGINT NOT NULL UNIQUE REFERENCES orders(order_id),
  method       VARCHAR(10) NOT NULL CHECK (method IN ('UPI','CARD','COD','WALLET')),
  amount       DECIMAL(10,2) NOT NULL,
  status       VARCHAR(10) NOT NULL
);
CREATE TABLE review (
  review_id    BIGINT PRIMARY KEY,
  customer_id  BIGINT NOT NULL REFERENCES customer(customer_id),
  product_id   BIGINT NOT NULL REFERENCES product(product_id),
  rating       SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  UNIQUE (customer_id, product_id)            -- one review per customer per product
);</code></pre>

<h3>4. Design review and optimisation</h3>
<table>
  <thead><tr><th>Query pattern</th><th>Index / change</th></tr></thead>
  <tbody>
    <tr><td>"My orders", newest first</td><td><code>CREATE INDEX idx_orders_customer_created ON orders(customer_id, created_at DESC);</code></td></tr>
    <tr><td>Products in a category sorted by price</td><td><code>CREATE INDEX idx_product_category_price ON product(category_id, price);</code></td></tr>
    <tr><td>Best-selling products this month</td><td>index <code>order_item(product_id)</code>; for dashboards, a nightly summary table (denormalised)</td></tr>
    <tr><td>Product search by name</td><td>full-text index or a search engine (Elasticsearch)</td></tr>
    <tr><td>Stock overselling under concurrency</td><td><code>UPDATE product SET stock = stock - :q WHERE product_id = :id AND stock &gt;= :q</code> and check rows affected, inside the order transaction</td></tr>
    <tr><td>Very large orders table</td><td>partition by <code>created_at</code> month; archive old partitions</td></tr>
  </tbody>
</table>
"""
))

TOPICS.append(topic(
    "Labs 19–22 — SQL Practice: Basic, Nested, Correlated, EXISTS/ANY/ALL & Joins",
    "Sample tables with the expected result of every query",
    r"""
<h3>Sample data</h3>
<pre><code class="language-sql">CREATE TABLE dept (dept_id INT PRIMARY KEY, dept_name VARCHAR(30));
INSERT INTO dept VALUES (10,'Engineering'), (20,'Sales'), (30,'HR'), (40,'Research');

CREATE TABLE emp (
  emp_id INT PRIMARY KEY, name VARCHAR(30), dept_id INT, salary INT, manager_id INT
);
INSERT INTO emp VALUES
 (1,'Asha',10,90000,NULL),
 (2,'Ravi',10,70000,1),
 (3,'Neha',20,50000,1),
 (4,'Karan',20,65000,3),
 (5,'Meera',30,45000,1),
 (6,'Vikram',10,70000,2),
 (7,'Sara',NULL,40000,3);

CREATE TABLE project (proj_id INT PRIMARY KEY, emp_id INT, title VARCHAR(40));
INSERT INTO project VALUES (100,2,'Search'), (101,6,'Search'), (102,4,'CRM'), (103,2,'Payments');</code></pre>

<h3>1. Basic queries</h3>
<pre><code class="language-sql">-- Employees earning at least 65,000, highest first
SELECT name, salary FROM emp WHERE salary >= 65000 ORDER BY salary DESC, name;
-- Result: Asha 90000, Ravi 70000, Vikram 70000, Karan 65000

-- Head count and average salary per department (employees with a department)
SELECT dept_id, COUNT(*) AS staff, AVG(salary) AS avg_salary
FROM emp WHERE dept_id IS NOT NULL
GROUP BY dept_id HAVING COUNT(*) >= 2
ORDER BY dept_id;
-- Result: 10 | 3 | 76666.67   and   20 | 2 | 57500</code></pre>

<h3>2. Nested (non-correlated) subqueries</h3>
<pre><code class="language-sql">-- Employees paid more than the company average (average = 61428.57)
SELECT name FROM emp WHERE salary > (SELECT AVG(salary) FROM emp) ORDER BY name;
-- Result: Asha, Karan, Ravi, Vikram

-- Second-highest distinct salary
SELECT MAX(salary) FROM emp WHERE salary < (SELECT MAX(salary) FROM emp);
-- Result: 70000

-- Employees working on the 'Search' project
SELECT name FROM emp WHERE emp_id IN (SELECT emp_id FROM project WHERE title = 'Search') ORDER BY name;
-- Result: Ravi, Vikram</code></pre>

<h3>3. Correlated subqueries</h3>
<pre><code class="language-sql">-- Earning above their own department's average (inner query re-runs per outer row)
SELECT e.name, e.dept_id, e.salary
FROM emp e
WHERE e.salary > (SELECT AVG(x.salary) FROM emp x WHERE x.dept_id = e.dept_id)
ORDER BY e.name;
-- Result: Asha 10 90000, Karan 20 65000

-- Highest paid in each department (ties included)
SELECT e.dept_id, e.name, e.salary FROM emp e
WHERE e.salary = (SELECT MAX(salary) FROM emp x WHERE x.dept_id = e.dept_id)
ORDER BY e.dept_id;
-- Result: 10 Asha 90000, 20 Karan 65000, 30 Meera 45000</code></pre>

<h3>4. EXISTS, NOT EXISTS, ANY, ALL</h3>
<pre><code class="language-sql">-- Departments that have at least one employee
SELECT d.dept_name FROM dept d
WHERE EXISTS (SELECT 1 FROM emp e WHERE e.dept_id = d.dept_id) ORDER BY d.dept_name;
-- Result: Engineering, HR, Sales

-- Employees with no project
SELECT e.name FROM emp e
WHERE NOT EXISTS (SELECT 1 FROM project p WHERE p.emp_id = e.emp_id) ORDER BY e.name;
-- Result: Asha, Meera, Neha, Sara

-- Earning more than ANY Sales employee (i.e. more than the lowest, 50000)
SELECT name FROM emp WHERE salary > ANY (SELECT salary FROM emp WHERE dept_id = 20) ORDER BY name;
-- Result: Asha, Karan, Ravi, Vikram

-- Earning more than ALL Sales employees (i.e. more than the highest, 65000)
SELECT name FROM emp WHERE salary > ALL (SELECT salary FROM emp WHERE dept_id = 20) ORDER BY name;
-- Result: Asha, Ravi, Vikram</code></pre>
<div class="callout callout-warning"><strong>NOT IN trap:</strong> <code>WHERE x NOT IN (subquery)</code> returns <em>no rows</em> if the subquery contains a NULL. Prefer <code>NOT EXISTS</code>. (SQLite does not support ANY/ALL; use MIN/MAX subqueries there.)</div>

<h3>5. Joins</h3>
<pre><code class="language-sql">-- INNER JOIN: only matching rows (Sara has no department -> excluded)
SELECT e.name, d.dept_name FROM emp e
INNER JOIN dept d ON e.dept_id = d.dept_id ORDER BY e.emp_id;
-- 6 rows: Asha Engineering, Ravi Engineering, Neha Sales, Karan Sales, Meera HR, Vikram Engineering

-- LEFT JOIN: every employee, department if any
SELECT e.name, d.dept_name FROM emp e
LEFT JOIN dept d ON e.dept_id = d.dept_id ORDER BY e.emp_id;
-- 7 rows; Sara | NULL

-- RIGHT JOIN: every department, employees if any
SELECT d.dept_name, e.name FROM emp e
RIGHT JOIN dept d ON e.dept_id = d.dept_id ORDER BY d.dept_id, e.name;
-- includes Research | NULL

-- FULL OUTER JOIN (PostgreSQL, SQL Server; emulate in MySQL with LEFT JOIN UNION RIGHT JOIN)
SELECT e.name, d.dept_name FROM emp e
FULL OUTER JOIN dept d ON e.dept_id = d.dept_id;
-- 8 rows: 6 matches + Sara | NULL + NULL | Research

-- SELF JOIN: employee with manager name
SELECT e.name AS employee, m.name AS manager FROM emp e
LEFT JOIN emp m ON e.manager_id = m.emp_id ORDER BY e.emp_id;
-- Asha NULL, Ravi Asha, Neha Asha, Karan Neha, Meera Asha, Vikram Ravi, Sara Neha

-- Departments with no employees (anti-join)
SELECT d.dept_name FROM dept d LEFT JOIN emp e ON e.dept_id = d.dept_id WHERE e.emp_id IS NULL;
-- Result: Research</code></pre>
<table>
  <thead><tr><th>Join</th><th>Returns</th></tr></thead>
  <tbody>
    <tr><td>INNER</td><td>rows with a match in both tables</td></tr>
    <tr><td>LEFT (OUTER)</td><td>all left rows + matches (NULLs where none)</td></tr>
    <tr><td>RIGHT (OUTER)</td><td>all right rows + matches</td></tr>
    <tr><td>FULL (OUTER)</td><td>all rows from both, matched where possible</td></tr>
    <tr><td>CROSS</td><td>every combination (Cartesian product)</td></tr>
    <tr><td>SELF</td><td>a table joined to itself (hierarchies)</td></tr>
  </tbody>
</table>
"""
))

TOPICS.append(topic(
    "Labs 23–27 — API Design (REST, JSON) & Scalability Design (Cache, Load Balancer, CDN, Replication)",
    "Designing endpoints and then making them survive traffic",
    r"""
<h3>1. REST API for the e-commerce case study</h3>
<table>
  <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th><th>Success</th></tr></thead>
  <tbody>
    <tr><td>POST</td><td><code>/v1/auth/login</code></td><td>obtain access + refresh tokens</td><td>200</td></tr>
    <tr><td>GET</td><td><code>/v1/products?category=12&amp;sort=price&amp;limit=20&amp;cursor=abc</code></td><td>list products with filtering and cursor pagination</td><td>200</td></tr>
    <tr><td>GET</td><td><code>/v1/products/{productId}</code></td><td>product details</td><td>200 / 404</td></tr>
    <tr><td>POST</td><td><code>/v1/cart/items</code></td><td>add item to cart</td><td>201</td></tr>
    <tr><td>PATCH</td><td><code>/v1/cart/items/{productId}</code></td><td>change quantity</td><td>200</td></tr>
    <tr><td>DELETE</td><td><code>/v1/cart/items/{productId}</code></td><td>remove item</td><td>204</td></tr>
    <tr><td>POST</td><td><code>/v1/orders</code> (header <code>Idempotency-Key</code>)</td><td>place order from cart</td><td>201</td></tr>
    <tr><td>GET</td><td><code>/v1/orders/{orderId}</code></td><td>order status</td><td>200 / 403 / 404</td></tr>
    <tr><td>POST</td><td><code>/v1/webhooks/payments</code></td><td>payment provider callback (signature verified)</td><td>200</td></tr>
  </tbody>
</table>

<h4>Request and response</h4>
<pre><code class="language-json">POST /v1/orders
Authorization: Bearer eyJhbGciOi...
Idempotency-Key: 5f0c2d9e-7b1a-4c33-9c1e-2a9d8e11c001
Content-Type: application/json

{
  "addressId": 7781,
  "paymentMethod": "UPI",
  "items": [ { "productId": 501, "quantity": 2 }, { "productId": 733, "quantity": 1 } ]
}

HTTP/1.1 201 Created
Location: /v1/orders/90412
{
  "orderId": 90412,
  "status": "PLACED",
  "total": { "amount": 3847.00, "currency": "INR" },
  "items": [
    { "productId": 501, "name": "Wireless Mouse", "quantity": 2, "unitPrice": 899.00 },
    { "productId": 733, "name": "USB-C Hub", "quantity": 1, "unitPrice": 2049.00 }
  ],
  "payment": { "method": "UPI", "status": "PENDING", "redirectUrl": "https://pay.example/intent/abc" },
  "createdAt": "2026-09-15T10:42:11Z"
}

HTTP/1.1 409 Conflict
{
  "error": { "code": "OUT_OF_STOCK", "message": "USB-C Hub has only 0 units left", "details": { "productId": 733 } }
}</code></pre>
<p>Conventions: nouns not verbs, plural resources, consistent camelCase JSON, ISO-8601 UTC timestamps, money as amount + currency, one error envelope, versioned path, documented with <strong>OpenAPI/Swagger</strong>.</p>

<h3>2. Scalability design</h3>
<pre><code class="language-text">Users ─► DNS (geo) ─► CDN (images, JS, CSS, product pages with short TTL)
                  └─► WAF ─► L7 Load balancer (health checks, TLS termination)
                               ├─► API servers (stateless, auto-scaling group)
                               │     ├─► Redis cluster: sessions, carts, hot product cache, rate limits
                               │     ├─► Primary PostgreSQL (writes)
                               │     │      └─► Read replicas ×3 (catalogue reads, reports)
                               │     └─► Kafka: OrderPlaced → payment, inventory, email, analytics consumers
                               └─► Search service ─► Elasticsearch cluster</code></pre>
<table>
  <thead><tr><th>Technique</th><th>Applied to</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>CDN</td><td>static assets, product images</td><td>cut latency and origin bandwidth</td></tr>
    <tr><td>Load balancer + stateless servers</td><td>API tier</td><td>horizontal scaling, rolling deploys, failover</td></tr>
    <tr><td>Cache-aside with TTL</td><td>product details, category pages</td><td>read-heavy, tolerate seconds of staleness</td></tr>
    <tr><td>Read replicas</td><td>catalogue browsing, order history</td><td>offload reads from the primary</td></tr>
    <tr><td>Queue</td><td>emails, invoices, analytics</td><td>smooth spikes, decouple slow work</td></tr>
    <tr><td>Sharding (future)</td><td>orders by customer_id</td><td>when writes outgrow one primary</td></tr>
    <tr><td>Rate limiting</td><td>login, checkout APIs</td><td>protect from abuse and bots during sales</td></tr>
  </tbody>
</table>
<p>Sale-day readiness checklist: load test at 3× expected peak, pre-warm caches, autoscaling limits raised, circuit breakers on payment calls, feature flags to switch off non-essential features (recommendations) under load.</p>
"""
))

TOPICS.append(topic(
    "Labs 28–30 — Security Design (Authentication, Authorisation, JWT, OAuth) & Final Presentation",
    "Threats, controls and how to present the case study",
    r"""
<h3>1. Security architecture for the case study</h3>
<ol>
  <li><strong>Login:</strong> "Sign in with Google" via OpenID Connect (authorisation code + PKCE) or email + password hashed with bcrypt; MFA for admins.</li>
  <li><strong>Tokens:</strong> short-lived access JWT (15 min, RS256) + refresh token (7 days, rotated on use, stored server-side so it can be revoked), delivered in HttpOnly Secure SameSite cookies.</li>
  <li><strong>Gateway:</strong> validates JWT signature, <code>exp</code>, <code>iss</code>, <code>aud</code>; rate limits by user and IP; rejects oversized payloads.</li>
  <li><strong>Authorisation:</strong> RBAC roles CUSTOMER, SELLER, ADMIN + ownership checks ("customer can only read their own orders" — never trust an ID from the URL alone).</li>
  <li><strong>Service-to-service:</strong> OAuth client credentials or mTLS inside a service mesh.</li>
  <li><strong>Data:</strong> TLS 1.3 everywhere; encryption at rest; card data never stored (tokenised by the payment provider); secrets in a vault; PII masked in logs.</li>
</ol>

<h3>2. Threat model (STRIDE)</h3>
<table>
  <thead><tr><th>Threat</th><th>Example</th><th>Control</th></tr></thead>
  <tbody>
    <tr><td><strong>S</strong>poofing</td><td>stolen password login</td><td>MFA, breached-password checks, rate limiting</td></tr>
    <tr><td><strong>T</strong>ampering</td><td>changing price in the cart request</td><td>server recalculates prices; signed tokens; integrity checks on webhooks</td></tr>
    <tr><td><strong>R</strong>epudiation</td><td>"I never placed that order"</td><td>audit logs with user, IP, timestamp</td></tr>
    <tr><td><strong>I</strong>nformation disclosure</td><td>IDOR: /orders/90413 of another user</td><td>ownership authorisation checks, least privilege</td></tr>
    <tr><td><strong>D</strong>enial of service</td><td>bot traffic during a sale</td><td>CDN/WAF, rate limiting, autoscaling, queues</td></tr>
    <tr><td><strong>E</strong>levation of privilege</td><td>customer calling admin APIs</td><td>RBAC at gateway and service, deny by default</td></tr>
  </tbody>
</table>

<h3>3. OWASP Top 10 quick check</h3>
<p>Broken access control · cryptographic failures · injection · insecure design · security misconfiguration · vulnerable components · authentication failures · software/data integrity failures · logging &amp; monitoring failures · server-side request forgery (SSRF).</p>

<h3>4. Final case study deliverables</h3>
<table>
  <thead><tr><th>Section</th><th>Include</th></tr></thead>
  <tbody>
    <tr><td>1. Problem &amp; requirements</td><td>FR/NFR tables, assumptions, estimates</td></tr>
    <tr><td>2. High-level design</td><td>context diagram, architecture diagram, technology choices with reasons</td></tr>
    <tr><td>3. Low-level design</td><td>class diagram, 2 sequence diagrams, component diagram</td></tr>
    <tr><td>4. Data design</td><td>ER diagram, normalised schema (BCNF), indexes</td></tr>
    <tr><td>5. API design</td><td>endpoint table, sample JSON, error format</td></tr>
    <tr><td>6. Scalability</td><td>caching, load balancing, CDN, replication, queues — with the bottleneck each solves</td></tr>
    <tr><td>7. Security</td><td>auth flow diagram, RBAC matrix, STRIDE table</td></tr>
    <tr><td>8. Trade-offs &amp; future work</td><td>CAP choice, what you would change at 10× scale</td></tr>
  </tbody>
</table>

<h3>5. Viva questions to prepare</h3>
<ul>
  <li>Why did you choose SQL (or NoSQL) for this data?</li>
  <li>What is your single point of failure and how would you remove it?</li>
  <li>How do you prevent two users booking the same seat / buying the last item?</li>
  <li>Where would you add a cache, and how is it invalidated?</li>
  <li>How does a JWT get validated, and how do you log a user out?</li>
  <li>What would break first at 10× traffic?</li>
</ul>
"""
))
