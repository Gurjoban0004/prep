"""System Design (24CSE0318) — ST-2: lectures 18-27."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Frameworks & Tools for Client–Server Development — Server-side, Client-side, DNS, Firewalls & Load Balancers",
    "Lectures 18–22 · the building blocks you deploy",
    r"""
<h3>1. Server-side frameworks</h3>
<table>
  <thead><tr><th>Framework</th><th>Language</th><th>Known for</th></tr></thead>
  <tbody>
    <tr><td><strong>Spring Boot</strong></td><td>Java / Kotlin</td><td>enterprise microservices, dependency injection, huge ecosystem (Spring Security, Data JPA)</td></tr>
    <tr><td><strong>Express.js / NestJS</strong></td><td>JavaScript / TypeScript (Node.js)</td><td>lightweight, event-loop I/O, great for JSON APIs and real-time apps</td></tr>
    <tr><td><strong>Django / FastAPI / Flask</strong></td><td>Python</td><td>Django "batteries included" (ORM, admin); FastAPI async + automatic OpenAPI docs; Flask minimal</td></tr>
    <tr><td><strong>ASP.NET Core</strong></td><td>C#</td><td>high performance, Microsoft ecosystem</td></tr>
    <tr><td><strong>Ruby on Rails / Laravel</strong></td><td>Ruby / PHP</td><td>convention over configuration, rapid development</td></tr>
    <tr><td><strong>Gin / Echo</strong></td><td>Go</td><td>compiled, very fast, low memory services</td></tr>
  </tbody>
</table>
<p>Server frameworks provide routing, request parsing, middleware (auth, logging, CORS), ORM/database access, validation, dependency injection and testing support.</p>

<h3>2. Client-side frameworks</h3>
<table>
  <thead><tr><th>Framework</th><th>Style</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td><strong>React</strong></td><td>UI library, components, virtual DOM</td><td>largest ecosystem; Next.js adds server-side rendering</td></tr>
    <tr><td><strong>Angular</strong></td><td>full framework (TypeScript), two-way binding</td><td>opinionated, suits large enterprise apps</td></tr>
    <tr><td><strong>Vue</strong></td><td>progressive framework, reactive data</td><td>gentle learning curve; Nuxt for SSR</td></tr>
    <tr><td><strong>Svelte</strong></td><td>compiler, no virtual DOM</td><td>small bundles</td></tr>
    <tr><td>Mobile</td><td>React Native, Flutter, Swift/Kotlin</td><td>cross-platform vs native</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Rendering</th><th>How</th><th>Trade-off</th></tr></thead>
  <tbody>
    <tr><td>CSR (client-side)</td><td>browser downloads JS and builds the page</td><td>rich interactivity; slow first load, weaker SEO</td></tr>
    <tr><td>SSR (server-side)</td><td>server sends ready HTML per request</td><td>fast first paint, SEO; more server load</td></tr>
    <tr><td>SSG (static generation)</td><td>HTML built at deploy time, served from a CDN</td><td>fastest; content must not change per request</td></tr>
  </tbody>
</table>

<h3>3. DNS in production</h3>
<p>Beyond name resolution (ST-1), DNS is an operational tool: <strong>low TTLs</strong> before a migration, <strong>weighted records</strong> for gradual traffic shifting, <strong>failover records</strong> with health checks, <strong>geo/latency routing</strong>,
and <strong>DNSSEC</strong> to sign records against spoofing. Managed providers: Route 53, Cloudflare DNS, Google Cloud DNS.</p>

<h3>4. Firewalls</h3>
<table>
  <thead><tr><th>Type</th><th>Inspects</th><th>Example rule</th></tr></thead>
  <tbody>
    <tr><td>Packet-filtering (stateless)</td><td>each packet's IPs, ports, protocol</td><td>allow TCP 443 from anywhere</td></tr>
    <tr><td>Stateful</td><td>connection state; allows return traffic automatically</td><td>cloud security groups</td></tr>
    <tr><td>Application-level / proxy</td><td>application protocol content</td><td>block FTP commands, filter URLs</td></tr>
    <tr><td><strong>WAF</strong> (web application firewall)</td><td>HTTP requests for attack patterns</td><td>block SQL injection, XSS, bad bots (OWASP rules)</td></tr>
    <tr><td>Next-generation (NGFW)</td><td>deep packet inspection, IDS/IPS, app awareness</td><td>Palo Alto, Fortinet</td></tr>
  </tbody>
</table>
<p>Typical layout: internet → WAF / CDN → load balancer in a public subnet → app servers and databases in <strong>private subnets</strong> reachable only from the tiers above (defence in depth, <strong>DMZ</strong> for public-facing hosts).</p>

<h3>5. Load balancers: application vs network</h3>
<table>
  <thead><tr><th></th><th>Network load balancer (L4)</th><th>Application load balancer (L7)</th></tr></thead>
  <tbody>
    <tr><td>Routes by</td><td>IP, port</td><td>host, path, headers, cookies</td></tr>
    <tr><td>Performance</td><td>millions of req/s, ultra-low latency, static IP</td><td>more processing per request</td></tr>
    <tr><td>Features</td><td>TCP/UDP pass-through, preserves client IP</td><td>TLS termination, redirects, auth integration, WebSocket and gRPC routing</td></tr>
    <tr><td>Use for</td><td>gaming, IoT, non-HTTP protocols, extreme throughput</td><td>web apps and microservices</td></tr>
  </tbody>
</table>
<p>Hardware (F5) vs software (NGINX, HAProxy, Envoy) vs managed cloud (AWS ELB family, GCP Cloud Load Balancing).</p>
"""
    + check("Blocking SQL injection patterns inside HTTP request bodies needs a:",
            ["stateless packet filter", "web application firewall (WAF)", "network load balancer", "DNS resolver"], "b",
            "Only a WAF inspects HTTP payloads for application-layer attacks.")
))

TOPICS.append(topic(
    "Content Delivery Networks — Push CDNs vs Pull CDNs",
    "Lectures 18–22 · serving content from the edge",
    r"""
<h3>1. How a CDN works</h3>
<ol>
  <li>DNS for <code>cdn.example.com</code> resolves to the nearest <strong>edge server (PoP)</strong>.</li>
  <li>The edge checks its cache. <strong>Cache hit</strong> → serve immediately.</li>
  <li><strong>Cache miss</strong> → fetch from the <strong>origin</strong> (or a mid-tier "shield" cache), store it, then serve.</li>
</ol>
<p>Benefits: lower latency (shorter distance), reduced origin load and bandwidth cost, higher availability, DDoS absorption, TLS at the edge. Providers: Cloudflare, Akamai, AWS CloudFront, Fastly, Google Cloud CDN.</p>

<h3>2. Push vs pull</h3>
<table>
  <thead><tr><th></th><th>Push CDN</th><th>Pull CDN</th></tr></thead>
  <tbody>
    <tr><td>How content arrives</td><td>you <strong>upload</strong> content to the CDN ahead of time</td><td>the CDN <strong>fetches</strong> from your origin on the first request</td></tr>
    <tr><td>Who controls freshness</td><td>you — upload new versions, set expiry</td><td>TTL / cache headers; purge to refresh</td></tr>
    <tr><td>First request</td><td>fast (already there)</td><td>slower (miss goes to origin)</td></tr>
    <tr><td>Storage</td><td>everything stored, even unpopular files</td><td>only what users request</td></tr>
    <tr><td>Maintenance</td><td>more work: must push updates</td><td>minimal: just point the CDN at the origin</td></tr>
    <tr><td>Best for</td><td>small sites or large, rarely changing files (software releases, video libraries)</td><td>high-traffic sites with frequently changing or huge catalogues</td></tr>
  </tbody>
</table>

<h3>3. What to put on a CDN</h3>
<ul>
  <li><strong>Static assets</strong>: images, CSS, JS, fonts — with long cache lifetimes and <strong>fingerprinted filenames</strong> (<code>app.3f9a1c.js</code>) so a new deploy gets a new URL.</li>
  <li><strong>Video</strong>: segmented HLS/DASH chunks.</li>
  <li><strong>Dynamic acceleration</strong>: even uncached API calls benefit from optimised edge-to-origin routes and connection reuse.</li>
  <li><strong>Edge compute</strong>: Cloudflare Workers, Lambda@Edge run code close to users (A/B tests, auth checks).</li>
</ul>
<div class="callout callout-warning"><strong>Pitfalls:</strong> caching personalised pages (one user sees another's data — never cache responses with Set-Cookie or private data publicly), stale content after deploys, and cache-busting query strings that destroy hit ratio.</div>
"""
    + check("A CDN that fetches a file from the origin only when a user first requests it is a:",
            ["push CDN", "pull CDN", "reverse DNS", "origin shield only"], "b",
            "Pull CDNs populate their caches lazily on demand.")
))

TOPICS.append(topic(
    "Security — Access Control, Authentication vs Authorisation, Malware & Defence Mechanisms",
    "Lectures 18–22 · protecting systems and data",
    r"""
<h3>1. The CIA triad</h3>
<ul>
  <li><strong>Confidentiality</strong> — only authorised people can read data (encryption, access control).</li>
  <li><strong>Integrity</strong> — data is not altered improperly (hashes, signatures, audit logs).</li>
  <li><strong>Availability</strong> — systems are usable when needed (redundancy, DDoS protection).</li>
</ul>

<h3>2. Authentication vs authorisation</h3>
<table>
  <thead><tr><th></th><th>Authentication (AuthN)</th><th>Authorisation (AuthZ)</th></tr></thead>
  <tbody>
    <tr><td>Question</td><td><strong>Who are you?</strong></td><td><strong>What are you allowed to do?</strong></td></tr>
    <tr><td>Happens</td><td>first</td><td>after authentication</td></tr>
    <tr><td>Mechanisms</td><td>passwords (hashed with bcrypt/Argon2), OTP, <strong>MFA</strong>, biometrics, passkeys, certificates</td><td>roles, permissions, policies, scopes</td></tr>
    <tr><td>HTTP failure</td><td><strong>401 Unauthorized</strong></td><td><strong>403 Forbidden</strong></td></tr>
  </tbody>
</table>
<p>MFA combines factors from different categories: something you <em>know</em> (password), <em>have</em> (phone, security key), <em>are</em> (fingerprint).</p>

<h3>3. Access control models</h3>
<table>
  <thead><tr><th>Model</th><th>Access decided by</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><strong>DAC</strong> (Discretionary)</td><td>the resource owner grants permissions</td><td>sharing a Google Doc; Linux file permissions</td></tr>
    <tr><td><strong>MAC</strong> (Mandatory)</td><td>central policy with security labels / clearance levels</td><td>military: Top Secret, Secret; SELinux</td></tr>
    <tr><td><strong>RBAC</strong> (Role-based)</td><td>permissions attached to roles; users get roles</td><td>Admin, Instructor, Student in an LMS</td></tr>
    <tr><td><strong>ABAC</strong> (Attribute-based)</td><td>rules over user, resource and context attributes</td><td>"doctors may view records of patients in their ward during their shift"</td></tr>
  </tbody>
</table>
<p>Principles: <strong>least privilege</strong>, <strong>separation of duties</strong>, <strong>zero trust</strong> (never trust by network location; verify every request), and defence in depth.</p>

<h3>4. Malware</h3>
<table>
  <thead><tr><th>Type</th><th>Behaviour</th></tr></thead>
  <tbody>
    <tr><td>Virus</td><td>attaches to files; spreads when the host program runs</td></tr>
    <tr><td>Worm</td><td>self-replicates across networks without user action</td></tr>
    <tr><td>Trojan</td><td>disguised as legitimate software, opens a backdoor</td></tr>
    <tr><td>Ransomware</td><td>encrypts data and demands payment</td></tr>
    <tr><td>Spyware / keylogger</td><td>secretly collects information, keystrokes</td></tr>
    <tr><td>Adware</td><td>unwanted advertising, often bundled</td></tr>
    <tr><td>Rootkit</td><td>hides deep in the OS to keep privileged access</td></tr>
    <tr><td>Botnet</td><td>network of infected machines used for DDoS, spam</td></tr>
  </tbody>
</table>

<h3>5. Common web attacks and defences</h3>
<table>
  <thead><tr><th>Attack</th><th>Defence</th></tr></thead>
  <tbody>
    <tr><td>SQL injection</td><td>parameterised queries / prepared statements, ORM, least-privilege DB users</td></tr>
    <tr><td>Cross-site scripting (XSS)</td><td>output encoding, Content-Security-Policy, sanitise HTML</td></tr>
    <tr><td>Cross-site request forgery (CSRF)</td><td>CSRF tokens, SameSite cookies</td></tr>
    <tr><td>Brute force / credential stuffing</td><td>rate limiting, MFA, account lockout, breached-password checks</td></tr>
    <tr><td>Man-in-the-middle</td><td>TLS everywhere, HSTS, certificate validation</td></tr>
    <tr><td>DDoS</td><td>CDN / anycast absorption, rate limiting, autoscaling, WAF</td></tr>
    <tr><td>Phishing</td><td>user training, MFA / passkeys, email authentication (SPF, DKIM, DMARC)</td></tr>
  </tbody>
</table>

<h3>6. Defence mechanisms</h3>
<p>antivirus / EDR · firewalls and WAFs · IDS/IPS · patching and dependency scanning · encryption at rest (AES-256) and in transit (TLS) · secrets management (Vault, KMS — never commit keys) ·
network segmentation · backups (ransomware recovery) · logging, SIEM and alerting · security audits and penetration tests · incident response plans.</p>
"""
    + check("A logged-in student opens the admin dashboard URL and the server refuses. The correct status code and concept are:",
            ["401 — authentication", "403 — authorisation", "404 — authentication", "500 — authorisation"], "b",
            "The user is identified but lacks permission: 403 Forbidden, an authorisation failure.")
    + check("Granting permissions to roles such as Admin, Faculty and Student, then assigning users to roles, is:",
            ["DAC", "MAC", "RBAC", "ABAC"], "c",
            "Role-Based Access Control attaches permissions to roles.")
))

TOPICS.append(topic(
    "OAuth 2.0, JWT & Single Sign-On (SSO)",
    "Lectures 18–22 · delegated access and stateless tokens",
    r"""
<h3>1. OAuth 2.0 — delegated authorisation</h3>
<p>OAuth lets an application access a user's resources on another service <strong>without seeing the user's password</strong> — "Allow this app to read your Google Calendar".
It is an <strong>authorisation</strong> framework; <strong>OpenID Connect (OIDC)</strong> adds an <em>ID token</em> on top for authentication ("Sign in with Google").</p>
<table>
  <thead><tr><th>Role</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Resource owner</td><td>the user</td></tr>
    <tr><td>Client</td><td>the app requesting access (a calendar-sync app)</td></tr>
    <tr><td>Authorisation server</td><td>issues tokens after the user consents (Google accounts)</td></tr>
    <tr><td>Resource server</td><td>API holding the data (Google Calendar API)</td></tr>
  </tbody>
</table>

<h4>Authorisation Code flow with PKCE (the recommended flow)</h4>
<ol>
  <li>Client creates a random <code>code_verifier</code> and its hash <code>code_challenge</code>.</li>
  <li>User is redirected to the authorisation server with <code>client_id</code>, <code>redirect_uri</code>, <code>scope</code>, <code>state</code> (CSRF protection) and <code>code_challenge</code>.</li>
  <li>User logs in and consents to the requested <strong>scopes</strong>.</li>
  <li>Authorisation server redirects back with a short-lived <strong>authorisation code</strong>.</li>
  <li>Client exchanges the code (plus <code>code_verifier</code>) at the token endpoint for an <strong>access token</strong> (and optionally a <strong>refresh token</strong>).</li>
  <li>Client calls the resource server with <code>Authorization: Bearer &lt;access_token&gt;</code>.</li>
</ol>
<table>
  <thead><tr><th>Grant type</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>Authorisation code (+ PKCE)</td><td>web, mobile and single-page apps with a user</td></tr>
    <tr><td>Client credentials</td><td>machine-to-machine; no user (a backend service calling another API)</td></tr>
    <tr><td>Device code</td><td>smart TVs, CLIs without a browser</td></tr>
    <tr><td>Refresh token</td><td>get a new access token without asking the user again</td></tr>
    <tr><td><s>Implicit</s>, <s>password</s></td><td>deprecated — tokens exposed or passwords shared</td></tr>
  </tbody>
</table>

<h3>2. JWT — JSON Web Token</h3>
<p>A compact, URL-safe token: <strong>header.payload.signature</strong>, each part Base64URL-encoded.</p>
<pre><code class="language-json">// Header
{ "alg": "RS256", "typ": "JWT" }
// Payload (claims)
{ "sub": "user_42", "name": "Aman", "role": "student",
  "iss": "https://auth.prep.app", "aud": "prep-api",
  "iat": 1789500000, "exp": 1789500900 }
// Signature = sign(base64url(header) + "." + base64url(payload), key)</code></pre>
<ul>
  <li><strong>Signed, not encrypted</strong> — anyone can decode and read the payload. Never put secrets or passwords in it (use JWE if encryption is needed).</li>
  <li><strong>HS256</strong> uses one shared secret; <strong>RS256/ES256</strong> sign with a private key and verify with a public key (so many services can verify without being able to issue).</li>
  <li><strong>Stateless</strong> — the server verifies the signature and expiry without a database lookup, which scales well across services.</li>
  <li>Verify <code>alg</code> (reject <code>none</code>), <code>exp</code>, <code>iss</code> and <code>aud</code> on every request.</li>
</ul>
<table>
  <thead><tr><th>JWT (stateless token)</th><th>Server-side session</th></tr></thead>
  <tbody>
    <tr><td>no session store; easy horizontal scaling</td><td>session ID in a cookie, data in Redis/DB</td></tr>
    <tr><td>hard to revoke before expiry → keep access tokens short (5–15 min) + refresh tokens, or a deny-list</td><td>revoke instantly by deleting the session</td></tr>
    <tr><td>bigger per request</td><td>tiny cookie</td></tr>
  </tbody>
</table>
<p>Store browser tokens in <strong>HttpOnly, Secure, SameSite</strong> cookies rather than localStorage to reduce XSS token theft.</p>

<h3>3. Single Sign-On (SSO)</h3>
<p>Log in once with a central <strong>Identity Provider (IdP)</strong> and access many applications (<strong>Service Providers</strong>) without logging in again — e.g. one college login for LMS, email and library.</p>
<ol>
  <li>User opens App A → redirected to the IdP.</li>
  <li>User authenticates at the IdP, which creates an IdP session.</li>
  <li>IdP sends a signed assertion/token back to App A → user is in.</li>
  <li>User opens App B → redirected to the IdP → IdP session already exists → token issued immediately, no password prompt.</li>
</ol>
<table>
  <thead><tr><th>Protocol</th><th>Format</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td><strong>SAML 2.0</strong></td><td>XML assertions</td><td>enterprise web apps (Okta, Azure AD to Salesforce)</td></tr>
    <tr><td><strong>OpenID Connect</strong></td><td>JSON / JWT ID tokens over OAuth 2.0</td><td>modern web and mobile apps, social login</td></tr>
    <tr><td>Kerberos</td><td>tickets</td><td>Windows domain / Active Directory networks</td></tr>
  </tbody>
</table>
<p>✔ Better user experience, fewer passwords, central MFA and de-provisioning. ✘ The IdP becomes a critical dependency and a high-value target.</p>
"""
    + check("Anyone who intercepts a standard signed JWT can:",
            ["read its payload but not forge a valid signature", "neither read nor modify it", "change the payload and keep it valid", "decrypt the signature to get the password"], "a",
            "JWT payloads are only Base64URL-encoded; the signature prevents undetected tampering.")
    + check("A backend reporting service calls another company API with no user involved. Which OAuth 2.0 grant fits?",
            ["Authorisation code with PKCE", "Client credentials", "Implicit", "Device code"], "b",
            "Client credentials is the machine-to-machine grant.")
))

TOPICS.append(topic(
    "DevOps — CI/CD Pipelines, Monitoring & Logging with Prometheus and Grafana",
    "Lectures 18–22 · shipping fast and seeing what production is doing",
    r"""
<h3>1. DevOps in one paragraph</h3>
<p>DevOps is a culture and set of practices that unify development and operations: small frequent releases, automation of build/test/deploy, infrastructure as code (Terraform, Ansible), containers (Docker, Kubernetes),
and continuous feedback from production. <strong>DORA metrics</strong> measure it: deployment frequency, lead time for changes, change failure rate, time to restore service.</p>

<h3>2. Continuous Integration in practice</h3>
<pre><code class="language-yaml"># .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: "21" }
      - run: ./mvnw -B verify          # compile + unit tests + integration tests
      - run: docker build -t registry.example.com/orders:${{ github.sha }} .
      - run: docker push registry.example.com/orders:${{ github.sha }}</code></pre>
<p>CI principles: commit to main at least daily, keep the build fast (&lt; 10 min), fix a broken build immediately, run tests in production-like environments, scan dependencies and secrets.</p>

<h3>3. Deployment strategies</h3>
<table>
  <thead><tr><th>Strategy</th><th>How</th><th>Rollback</th></tr></thead>
  <tbody>
    <tr><td>Recreate</td><td>stop old, start new</td><td>slow; downtime</td></tr>
    <tr><td>Rolling</td><td>replace instances a few at a time</td><td>roll forward/back gradually</td></tr>
    <tr><td>Blue–green</td><td>full new environment; switch the load balancer</td><td>instant switch back</td></tr>
    <tr><td>Canary</td><td>send 1–5% of traffic to the new version, watch metrics, expand</td><td>shift traffic back</td></tr>
    <tr><td>Feature flags</td><td>deploy code dark; enable per user group</td><td>turn the flag off</td></tr>
  </tbody>
</table>

<h3>4. Observability — the three pillars</h3>
<table>
  <thead><tr><th>Pillar</th><th>Answers</th><th>Tools</th></tr></thead>
  <tbody>
    <tr><td><strong>Metrics</strong></td><td>how much / how fast / how many errors, over time</td><td>Prometheus, Grafana, Datadog, CloudWatch</td></tr>
    <tr><td><strong>Logs</strong></td><td>what exactly happened in this event</td><td>ELK/Elastic Stack, Loki, Splunk</td></tr>
    <tr><td><strong>Traces</strong></td><td>where time went across services for one request</td><td>OpenTelemetry, Jaeger, Zipkin</td></tr>
  </tbody>
</table>
<p>What to watch: the <strong>four golden signals</strong> (Google SRE) — <strong>latency, traffic, errors, saturation</strong>. For resources, <strong>USE</strong> (utilisation, saturation, errors); for services, <strong>RED</strong> (rate, errors, duration).
Set <strong>SLIs</strong> (measured indicator, e.g. % requests under 300 ms), <strong>SLOs</strong> (target, e.g. 99.9%), and <strong>SLAs</strong> (contractual promise with penalties); the gap is the <strong>error budget</strong>.</p>

<h3>5. Prometheus</h3>
<ul>
  <li>Open-source monitoring system and <strong>time-series database</strong> (CNCF graduated project).</li>
  <li><strong>Pull model</strong> — Prometheus <em>scrapes</em> HTTP <code>/metrics</code> endpoints on a schedule (Pushgateway exists for short-lived batch jobs).</li>
  <li>Targets found by <strong>service discovery</strong> (Kubernetes, Consul) or static config; <strong>exporters</strong> expose metrics for systems you can't instrument (node_exporter for Linux hosts, mysqld_exporter).</li>
  <li>Data model: metric name + <strong>labels</strong> (key–value dimensions) → time series.</li>
  <li><strong>PromQL</strong> query language; <strong>Alertmanager</strong> routes alerts to Slack, email, PagerDuty with grouping and silencing.</li>
</ul>
<table>
  <thead><tr><th>Metric type</th><th>Behaviour</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Counter</td><td>only goes up (resets on restart)</td><td><code>http_requests_total</code></td></tr>
    <tr><td>Gauge</td><td>goes up and down</td><td><code>memory_usage_bytes</code>, queue length</td></tr>
    <tr><td>Histogram</td><td>counts observations in buckets</td><td><code>http_request_duration_seconds_bucket</code> for percentiles</td></tr>
    <tr><td>Summary</td><td>client-side quantiles</td><td>request duration p95 computed in the app</td></tr>
  </tbody>
</table>
<pre><code class="language-promql"># Requests per second over the last 5 minutes, per service
sum by (service) (rate(http_requests_total[5m]))

# Error ratio
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))

# 95th percentile latency
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))</code></pre>
<pre><code class="language-yaml"># alert rule
- alert: HighErrorRate
  expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
  for: 10m
  labels: { severity: page }
  annotations: { summary: "More than 5% of requests failing for 10 minutes" }</code></pre>

<h3>6. Grafana</h3>
<p>Open-source <strong>visualisation and dashboarding</strong> tool. It stores no metrics itself — it queries <strong>data sources</strong> (Prometheus, Loki, Elasticsearch, MySQL, CloudWatch) and renders panels:
time-series graphs, gauges, heatmaps, tables. Supports variables (pick a service from a dropdown), annotations for deployments, alerting and shared dashboards.</p>
<div class="callout callout-key"><strong>One-line summary for exams:</strong> Prometheus <em>collects and stores</em> metrics (pull-based, PromQL, Alertmanager); Grafana <em>visualises</em> them in dashboards.</div>

<h3>7. Logging best practices</h3>
<ul>
  <li><strong>Structured logs</strong> (JSON) with timestamp, level, service, request/trace ID.</li>
  <li>Levels: DEBUG &lt; INFO &lt; WARN &lt; ERROR; don't log at DEBUG in production by default.</li>
  <li>Never log passwords, tokens, card numbers or personal data.</li>
  <li>Centralise logs (ELK: Elasticsearch + Logstash/Beats + Kibana, or Grafana Loki) with retention policies.</li>
  <li>Correlate logs, metrics and traces with a shared request ID.</li>
</ul>
"""
    + check("Prometheus collects metrics primarily by:",
            ["services pushing to it over UDP", "scraping HTTP /metrics endpoints (pull model)", "reading log files", "querying Grafana"], "b",
            "Prometheus pulls metrics from targets on a schedule; the Pushgateway is the exception for batch jobs.")
    + check("Which metric type should be used for the current number of items waiting in a queue?",
            ["Counter", "Gauge", "Histogram", "Summary"], "b",
            "Queue length rises and falls, so it is a gauge.")
))

TOPICS.append(topic(
    "Low-Level Design: OS Concepts — Types of OS, Processes, PCB, Scheduling & Race Conditions",
    "Lectures 23–27 · how the machine under your service runs work",
    r"""
<h3>1. What an operating system does</h3>
<p>Manages hardware and provides services to programs: process management, memory management, file systems, device I/O, security and a user interface (shell/GUI).
The <strong>kernel</strong> runs in privileged mode; programs request services through <strong>system calls</strong>.</p>

<h3>2. Types of operating systems</h3>
<table>
  <thead><tr><th>Type</th><th>Idea</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Batch</td><td>similar jobs grouped and run without interaction</td><td>early IBM mainframes, payroll runs</td></tr>
    <tr><td>Multiprogramming</td><td>several programs in memory; CPU switches when one waits for I/O</td><td>—</td></tr>
    <tr><td>Time-sharing / multitasking</td><td>rapid switching gives each user the illusion of a dedicated machine</td><td>Unix, Linux, Windows</td></tr>
    <tr><td>Multiprocessing</td><td>multiple CPUs/cores run processes in parallel</td><td>modern servers</td></tr>
    <tr><td>Distributed</td><td>many networked machines appear as one system</td><td>Amoeba, cluster OS concepts</td></tr>
    <tr><td>Network OS</td><td>provides sharing of files/printers over a network</td><td>Windows Server, Novell NetWare</td></tr>
    <tr><td>Real-time (RTOS)</td><td>guaranteed response deadlines — hard (missed deadline = failure) or soft</td><td>FreeRTOS, VxWorks in cars, pacemakers</td></tr>
    <tr><td>Mobile / embedded</td><td>power- and resource-constrained devices</td><td>Android, iOS</td></tr>
  </tbody>
</table>

<h3>3. Process and PCB</h3>
<p>A <strong>process</strong> is a program in execution with its own address space (code, data, heap, stack). A <strong>thread</strong> is a unit of execution inside a process that shares its memory.</p>
<p><strong>Process states:</strong> New → Ready → Running → (Waiting ↔ Ready) → Terminated. Running → Ready happens on a timer interrupt (pre-emption); Running → Waiting on an I/O request.</p>
<p>The <strong>Process Control Block (PCB)</strong> is the kernel's record for each process:</p>
<ul>
  <li>process ID (PID), parent PID, state</li>
  <li><strong>program counter</strong> and CPU register values</li>
  <li>CPU scheduling info: priority, queue pointers</li>
  <li>memory management info: page tables, base/limit registers</li>
  <li>accounting info: CPU time used</li>
  <li>I/O status: open files, allocated devices</li>
</ul>
<p>A <strong>context switch</strong> saves the running process's state into its PCB and loads the next process's PCB. It costs time and flushes caches/TLB, so excessive switching hurts throughput.</p>

<h3>4. CPU scheduling</h3>
<table>
  <thead><tr><th>Term</th><th>Formula / meaning</th></tr></thead>
  <tbody>
    <tr><td>Turnaround time (TAT)</td><td>completion time − arrival time</td></tr>
    <tr><td>Waiting time (WT)</td><td>turnaround time − burst time</td></tr>
    <tr><td>Response time</td><td>first run time − arrival time</td></tr>
    <tr><td>Throughput</td><td>processes completed per unit time</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Algorithm</th><th>Pre-emptive?</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>FCFS</td><td>no</td><td>simple; <strong>convoy effect</strong> (short jobs wait behind a long one)</td></tr>
    <tr><td>SJF</td><td>no</td><td>minimum average waiting time among non-pre-emptive; needs burst estimates; can starve long jobs</td></tr>
    <tr><td>SRTF (shortest remaining time first)</td><td>yes</td><td>pre-emptive SJF; optimal average waiting time</td></tr>
    <tr><td>Priority</td><td>either</td><td>starvation of low priority → fix with <strong>aging</strong></td></tr>
    <tr><td>Round Robin</td><td>yes</td><td>time quantum q; fair, good response time; q too large → FCFS, too small → context-switch overhead</td></tr>
    <tr><td>Multilevel (feedback) queue</td><td>yes</td><td>separate queues (interactive vs batch); processes move between queues</td></tr>
  </tbody>
</table>

<details class="solution"><summary>Worked example — FCFS vs SJF vs Round Robin (q = 2)</summary>
<p>All arrive at time 0. Bursts: P1 = 5, P2 = 3, P3 = 1.</p>
<p><strong>FCFS</strong> order P1, P2, P3 → completions 5, 8, 9. Waiting: 0, 5, 8 → average <strong>4.33</strong>.</p>
<p><strong>SJF</strong> order P3, P2, P1 → completions 1, 4, 9. Waiting: P3 0, P2 1, P1 4 → average <strong>1.67</strong>.</p>
<p><strong>Round Robin, q = 2:</strong> Gantt: P1 0–2, P2 2–4, P3 4–5 (done), P1 5–7, P2 7–8 (done), P1 8–9 (done).
Completions P1 9, P2 8, P3 5. Waiting = completion − burst: P1 4, P2 5, P3 4 → average <strong>4.33</strong>, but every process started within 4 units (better response time).</p>
</details>

<h3>5. Pre-emptive vs non-pre-emptive scheduling</h3>
<table>
  <thead><tr><th></th><th>Pre-emptive</th><th>Non-pre-emptive</th></tr></thead>
  <tbody>
    <tr><td>CPU taken away?</td><td>yes — on higher priority arrival or quantum expiry</td><td>no — process runs until it finishes or blocks</td></tr>
    <tr><td>Response time</td><td>better for interactive systems</td><td>poor if a long job runs</td></tr>
    <tr><td>Overhead</td><td>more context switches</td><td>less</td></tr>
    <tr><td>Risk</td><td>race conditions on shared data</td><td>starvation / convoy effect</td></tr>
    <tr><td>Examples</td><td>Round Robin, SRTF, pre-emptive priority</td><td>FCFS, SJF, non-pre-emptive priority</td></tr>
  </tbody>
</table>

<h3>6. Race conditions and synchronisation</h3>
<p>A <strong>race condition</strong> occurs when the result depends on the unpredictable interleaving of concurrent processes/threads accessing shared data.</p>
<pre><code class="language-java">// Two threads each run this 1,000 times; final count is often < 2,000
count = count + 1;   // really: read count -> add 1 -> write count (not atomic)</code></pre>
<p>The code that touches shared data is the <strong>critical section</strong>. A correct solution needs <strong>mutual exclusion</strong>, <strong>progress</strong> and <strong>bounded waiting</strong>.</p>
<ul>
  <li><strong>Mutex / lock</strong> — only the holder enters (<code>synchronized</code>, <code>ReentrantLock</code> in Java).</li>
  <li><strong>Semaphore</strong> — integer counter with wait()/signal(); binary semaphore ≈ mutex, counting semaphore limits access to N resources.</li>
  <li><strong>Monitors / condition variables</strong>, atomic operations (<code>AtomicInteger</code>, compare-and-swap).</li>
  <li>In distributed systems the same problem appears as lost updates — solved with DB transactions, optimistic locking (version columns) or distributed locks (Redis, ZooKeeper).</li>
</ul>
<p><strong>Deadlock</strong> needs all four Coffman conditions: mutual exclusion, hold and wait, no pre-emption, circular wait. Prevent it by breaking one (e.g. always acquire locks in a fixed order).</p>
"""
    + check("Processes arrive together with bursts 6, 2 and 4. Average waiting time under non-pre-emptive SJF is:",
            ["2.67", "3.33", "4.00", "5.33"], "a",
            "Order 2, 4, 6 → waits 0, 2, 6 → average 8 / 3 ≈ 2.67.")
    + check("Which scheduling algorithm can suffer from the convoy effect?",
            ["Round Robin", "FCFS", "SRTF", "Multilevel feedback queue"], "b",
            "In FCFS, many short processes wait behind one long CPU-bound process.")
))

TOPICS.append(topic(
    "Memory Management — Contiguous Allocation, Paging, Segmentation, Virtual Memory & Page Replacement",
    "Lectures 23–27 · how processes share physical memory",
    r"""
<h3>1. Contiguous memory allocation</h3>
<p>Each process gets one continuous block of memory. With variable partitions, free memory is a list of <strong>holes</strong>.</p>
<table>
  <thead><tr><th>Strategy</th><th>Chooses</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td><strong>First fit</strong></td><td>first hole big enough</td><td>fast; generally good</td></tr>
    <tr><td><strong>Best fit</strong></td><td>smallest hole big enough</td><td>leaves tiny unusable slivers; must search the whole list</td></tr>
    <tr><td><strong>Worst fit</strong></td><td>largest hole</td><td>leaves bigger leftovers; usually performs worst</td></tr>
  </tbody>
</table>
<details class="solution"><summary>Worked example</summary>
<p>Holes (in order): 100 K, 500 K, 200 K, 300 K, 600 K. Requests: 212 K, 417 K, 112 K, 426 K.</p>
<p><strong>First fit:</strong> 212 → 500 (leaves 288); 417 → 600 (leaves 183); 112 → 288 (leaves 176); 426 → no hole large enough → <strong>waits</strong>.</p>
<p><strong>Best fit:</strong> 212 → 300 (88 left); 417 → 500 (83 left); 112 → 200 (88 left); 426 → 600 (174 left) → <strong>all fit</strong>.</p>
<p><strong>Worst fit:</strong> 212 → 600 (388); 417 → 500 (83); 112 → 388 (276); 426 → <strong>waits</strong>.</p>
</details>
<table>
  <thead><tr><th>Fragmentation</th><th>Meaning</th><th>Fix</th></tr></thead>
  <tbody>
    <tr><td><strong>External</strong></td><td>enough total free memory, but split into non-adjacent holes</td><td>compaction, paging</td></tr>
    <tr><td><strong>Internal</strong></td><td>wasted space inside an allocated block (block larger than needed)</td><td>smaller / variable block sizes</td></tr>
  </tbody>
</table>

<h3>2. Paging</h3>
<p>Physical memory is split into fixed-size <strong>frames</strong>; each process's logical memory into <strong>pages</strong> of the same size. A <strong>page table</strong> maps page → frame.
Pages need not be contiguous → <strong>no external fragmentation</strong> (only small internal fragmentation in the last page).</p>
<div class="formula">logical address = (page number p, offset d) &nbsp;&nbsp; p = address ÷ page size, &nbsp; d = address mod page size<br>
physical address = frame(p) × page size + d</div>
<details class="solution"><summary>Worked example — address translation</summary>
<p>Page size 1 KB (1024 bytes). Page table: page 0 → frame 5, page 1 → frame 2, page 2 → frame 7.</p>
<p>Logical address 2500: p = 2500 ÷ 1024 = <strong>2</strong>, d = 2500 − 2048 = <strong>452</strong>.</p>
<p>Frame 7 → physical address = 7 × 1024 + 452 = <strong>7620</strong>.</p>
<p>Bits view: with a 16-bit logical address and 1 KB pages, the offset uses 10 bits and the page number 6 bits → 64 pages.</p>
</details>
<p>Every memory access would need two lookups (page table + data), so a hardware cache, the <strong>TLB (Translation Lookaside Buffer)</strong>, stores recent translations.</p>
<div class="formula">\[ EAT = h\,(t + m) + (1 - h)(t + 2m) \]</div>
<p>With TLB lookup t = 20 ns, memory access m = 100 ns and hit ratio h = 0.8: EAT = 0.8 × 120 + 0.2 × 220 = 96 + 44 = <strong>140 ns</strong>.
(Many textbooks ignore t; then EAT = 0.8 × 100 + 0.2 × 200 = 120 ns.)</p>
<p>Large address spaces use multi-level or inverted page tables.</p>

<h3>3. Segmentation</h3>
<p>Divides a program into variable-sized logical <strong>segments</strong> — code, data, stack, heap — matching the programmer's view. Address = (segment number, offset); a <strong>segment table</strong> stores base and limit.
If offset ≥ limit → <strong>trap (segmentation fault)</strong>.</p>
<table>
  <thead><tr><th></th><th>Paging</th><th>Segmentation</th></tr></thead>
  <tbody>
    <tr><td>Unit size</td><td>fixed pages</td><td>variable segments</td></tr>
    <tr><td>View</td><td>physical, invisible to programmer</td><td>logical, visible to programmer</td></tr>
    <tr><td>Fragmentation</td><td>internal</td><td>external</td></tr>
    <tr><td>Table</td><td>page table (frame numbers)</td><td>segment table (base + limit)</td></tr>
    <tr><td>Protection / sharing</td><td>per page</td><td>natural per logical unit (share a code segment)</td></tr>
  </tbody>
</table>
<p>Real systems often combine them (segmented paging).</p>

<h3>4. Virtual memory</h3>
<p>Lets a process use more memory than is physically present by keeping only the needed pages in RAM and the rest on disk (swap). Implemented with <strong>demand paging</strong>: pages load only when accessed.</p>
<p><strong>Page fault</strong> — the referenced page is not in memory (valid–invalid bit = invalid):</p>
<ol>
  <li>trap to the OS;</li>
  <li>check the reference is legal;</li>
  <li>find a free frame (or choose a <strong>victim</strong> with a page replacement algorithm);</li>
  <li>read the page from disk into the frame;</li>
  <li>update the page table;</li>
  <li>restart the instruction.</li>
</ol>
<p><strong>Thrashing</strong> — the system spends more time paging than executing, because processes don't have enough frames for their working sets. CPU utilisation collapses as the OS adds more processes.
Fixes: working-set model, page-fault-frequency control, reduce multiprogramming, add RAM.</p>

<h3>5. Page replacement algorithms</h3>
<p>Reference string: <strong>7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2</strong> with <strong>3 frames</strong>.</p>
<table>
  <thead><tr><th>Algorithm</th><th>Replaces</th><th>Page faults</th></tr></thead>
  <tbody>
    <tr><td><strong>FIFO</strong></td><td>the page loaded earliest</td><td><strong>10</strong></td></tr>
    <tr><td><strong>LRU</strong></td><td>the page not used for the longest time</td><td><strong>9</strong></td></tr>
    <tr><td><strong>Optimal</strong></td><td>the page not needed for the longest time in the future</td><td><strong>7</strong></td></tr>
  </tbody>
</table>
<details class="solution"><summary>Trace — Optimal (7 faults)</summary>
<p>7 F [7] · 0 F [7,0] · 1 F [7,0,1] · 2 F replace 7 (never used again) [2,0,1] · 0 hit · 3 F replace 1 (never used again) [2,0,3] · 0 hit ·
4 F replace 0 (next used farthest, at position 11) [2,4,3] · 2 hit · 3 hit · 0 F replace 4 (never used again) [2,0,3] · 3 hit · 2 hit. Total <strong>7</strong>.</p>
</details>
<ul>
  <li><strong>Optimal</strong> gives the fewest faults but needs the future → used only as a benchmark.</li>
  <li><strong>LRU</strong> approximates optimal; implemented with counters/stack, or approximated by the <strong>clock (second-chance)</strong> algorithm using reference bits.</li>
  <li><strong>Belady's anomaly</strong> — with FIFO, adding frames can <em>increase</em> page faults (reference string 1,2,3,4,1,2,5,1,2,3,4,5 gives 9 faults with 3 frames and 10 with 4). LRU and Optimal never show it (stack algorithms).</li>
</ul>
"""
    + check("Page size 4 KB. Which page number and offset does logical address 10000 have?",
            ["page 2, offset 1808", "page 2, offset 2000", "page 3, offset 1808", "page 2, offset 1600"], "a",
            "10000 ÷ 4096 = 2 remainder 10000 − 8192 = 1808.")
    + check("Which page replacement algorithm can suffer from Belady's anomaly?",
            ["LRU", "Optimal", "FIFO", "None of them"], "c",
            "FIFO is not a stack algorithm, so more frames can sometimes produce more faults.")
))
