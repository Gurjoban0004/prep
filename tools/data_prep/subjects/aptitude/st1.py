"""Numerical Aptitude & Logical Reasoning-I (25UNI0110) — ST-1: Module 1 (Foundational Logic & Number Concepts) and Module 2 (Ratio, Logic & Group Concepts)."""

from subjects.helpers import topic, check

TOPICS = []

# ── Module 1 ────────────────────────────────────────────────────────────────

TOPICS.append(topic(
    "Blood Relations",
    "Module 1 · family trees without confusion",
    r"""
<h3>1. Method: draw, don't imagine</h3>
<p>Convert every statement into a small family tree. Use a consistent notation:</p>
<ul>
  <li><strong>+</strong> male, <strong>−</strong> female (or □ male, ○ female)</li>
  <li>horizontal line <strong>—</strong> for married couple, <strong>=</strong> or a dashed line for siblings</li>
  <li>vertical line <strong>|</strong> for parent → child (older generation on top)</li>
</ul>
<p>Always start from the person the question asks about, and never assume gender from a name — the question must state it (he/she, son/daughter).</p>

<h3>2. Relations you must know</h3>
<table>
  <thead><tr><th>Relation</th><th>Means</th></tr></thead>
  <tbody>
    <tr><td>Father's or mother's father</td><td>Grandfather</td></tr>
    <tr><td>Father's brother</td><td>Uncle (paternal)</td></tr>
    <tr><td>Mother's brother</td><td>Maternal uncle (mama)</td></tr>
    <tr><td>Father's sister / mother's sister</td><td>Aunt</td></tr>
    <tr><td>Uncle's or aunt's child</td><td>Cousin</td></tr>
    <tr><td>Brother's or sister's son / daughter</td><td>Nephew / niece</td></tr>
    <tr><td>Son's wife</td><td>Daughter-in-law</td></tr>
    <tr><td>Daughter's husband</td><td>Son-in-law</td></tr>
    <tr><td>Husband's or wife's brother</td><td>Brother-in-law</td></tr>
    <tr><td>Sister's husband</td><td>Brother-in-law</td></tr>
    <tr><td>Husband's or wife's sister / brother's wife</td><td>Sister-in-law</td></tr>
    <tr><td>Only son of my grandfather (on father's side)</td><td>My father</td></tr>
    <tr><td>Only daughter of my mother's mother</td><td>My mother</td></tr>
  </tbody>
</table>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — "Pointing to a photograph"</summary>
<p><em>Pointing to a man, Riya said, "His mother is the only daughter of my mother." How is Riya related to the man?</em></p>
<p>The only daughter of Riya's mother is Riya herself (Riya is female, "said" + the only daughter). So the man's mother is Riya → Riya is his <strong>mother</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — introductions</summary>
<p><em>Introducing a woman, Aman said, "She is the wife of the only nephew of my father's only brother." How is the woman related to Aman?</em></p>
<p>Father's only brother = Aman's uncle. The uncle's only nephew = the son of his sibling = Aman (assuming no other siblings). Wife of Aman → the woman is Aman's <strong>wife</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — coded family puzzle</summary>
<p><em>A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?</em></p>
<p>Tree: E (top) → D → C → B and A (siblings). D is C's father, so D is A's maternal grandfather. A is female → A is D's <strong>granddaughter</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — generation gap</summary>
<p><em>P is the brother of Q. R is the father of P. S is the sister of T. T is the son of Q. How is R related to T?</em></p>
<p>R is the father of P and Q (siblings) → R is one generation above Q. T is Q's son → two generations below R. So R is T's <strong>grandfather</strong>.</p>
</details>

<div class="callout callout-warning"><strong>Traps:</strong> "brother's wife" is sister-in-law, but "wife's brother" is brother-in-law too — read the order. If gender of the target isn't given, the answer may be "cannot be determined" (e.g. "child of", "sibling of").</div>
"""
    + check("Pointing to a woman, Rahul said, \"She is the daughter of the only child of my grandmother.\" How is the woman related to Rahul?",
            ["Cousin", "Sister", "Niece", "Aunt"], "b",
            "The only child of Rahul's grandmother is Rahul's parent, so the woman is that parent's daughter — Rahul's sister.")
))

TOPICS.append(topic(
    "Coded Relations",
    "Module 1 · symbols that stand for relationships",
    r"""
<h3>1. The type</h3>
<p>Symbols replace relations, e.g.</p>
<table>
  <tbody>
    <tr><td><strong>A + B</strong></td><td>A is the father of B</td></tr>
    <tr><td><strong>A − B</strong></td><td>A is the wife of B</td></tr>
    <tr><td><strong>A × B</strong></td><td>A is the brother of B</td></tr>
    <tr><td><strong>A ÷ B</strong></td><td>A is the daughter of B</td></tr>
  </tbody>
</table>
<p>You must decode an expression like <strong>P × Q + R − S</strong> into a tree, or pick the expression that shows a given relation.</p>

<h3>2. Method</h3>
<ol>
  <li>Split the expression into pairs: P × Q, Q + R, R − S.</li>
  <li>Translate each pair and <strong>mark genders</strong> the symbol reveals (father, brother → male; wife, daughter → female).</li>
  <li>Draw the tree step by step, then read the asked relation.</li>
  <li>For "which expression means…?", test each option — reject any that gives the wrong gender.</li>
</ol>

<h3>3. Solved examples (using the table above)</h3>
<details class="solution"><summary>Example 1 — decode P × Q + R − S</summary>
<p>P × Q: P is Q's brother (P male). Q + R: Q is R's father (Q male). R − S: R is S's wife (R female).</p>
<p>So P is the brother of R's father → P is R's (paternal) uncle, and S is R's husband. P is <strong>the uncle of S's wife</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — which expression means "M is the maternal uncle of T"?</summary>
<p>Maternal uncle = mother's brother, so we need M to be the brother of T's mother.</p>
<p><strong>M × X − Y + T</strong>: M is X's brother; X is Y's wife; Y is T's father → X is T's mother → M is T's <strong>maternal uncle</strong> ✔.</p>
<p>Compare <strong>M × Y + T</strong>: M is the brother of T's father → paternal uncle ✘.</p>
</details>
<details class="solution"><summary>Example 3 — a different code</summary>
<p><em>"A @ B" means A is the son of B, "A # B" means A is the sister of B, "A &amp; B" means A is the mother of B. What does "K &amp; L # M @ N" say about K and N?</em></p>
<p>K is L's mother; L is M's sister, so K is M's mother too; M is N's son, so N is M's other parent — the father. Therefore <strong>K is N's wife</strong>.</p>
</details>

<div class="callout callout-key"><strong>Speed tip:</strong> in "which expression shows X is the <em>mother</em> of Y" questions, first eliminate every option where X is never assigned a female role — often 2–3 options vanish instantly.</div>
"""
))

TOPICS.append(topic(
    "Analogy",
    "Module 1 · \"A is to B as C is to ?\"",
    r"""
<h3>1. Types of analogy</h3>
<table>
  <thead><tr><th>Type</th><th>Relationship</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Word — synonym / antonym</td><td>same or opposite meaning</td><td>Brave : Courageous :: Happy : Joyful</td></tr>
    <tr><td>Worker : tool</td><td>who uses what</td><td>Carpenter : Saw :: Surgeon : Scalpel</td></tr>
    <tr><td>Worker : product</td><td>who makes what</td><td>Poet : Poem :: Architect : Blueprint</td></tr>
    <tr><td>Part : whole</td><td>component</td><td>Petal : Flower :: Page : Book</td></tr>
    <tr><td>Cause : effect</td><td>result</td><td>Virus : Disease :: Fire : Smoke</td></tr>
    <tr><td>Animal : young / sound / home</td><td>classification facts</td><td>Cow : Calf :: Horse : Foal; Lion : Den :: Bee : Hive</td></tr>
    <tr><td>Instrument : measure</td><td>what it measures</td><td>Thermometer : Temperature :: Barometer : Pressure</td></tr>
    <tr><td>Country : capital / currency</td><td>GK pairs</td><td>Japan : Yen :: India : Rupee</td></tr>
    <tr><td>Number analogy</td><td>arithmetic rule</td><td>3 : 27 :: 4 : 64 (cube)</td></tr>
    <tr><td>Letter analogy</td><td>alphabet positions / shifts</td><td>ACE : BDF :: GIK : HJL (+1 each)</td></tr>
  </tbody>
</table>

<h3>2. Method</h3>
<ol>
  <li>Form a precise sentence linking the first pair: "A <em>saw</em> is the tool a carpenter uses to cut."</li>
  <li>Apply the same sentence to the second pair.</li>
  <li>If several options fit, make the sentence more specific.</li>
</ol>

<h3>3. Number analogy patterns</h3>
<table>
  <thead><tr><th>Pair</th><th>Rule</th></tr></thead>
  <tbody>
    <tr><td>5 : 26</td><td>n² + 1</td></tr>
    <tr><td>6 : 35</td><td>n² − 1</td></tr>
    <tr><td>4 : 60</td><td>n³ − n (64 − 4)</td></tr>
    <tr><td>7 : 56</td><td>n(n + 1)</td></tr>
    <tr><td>12 : 3</td><td>sum of digits (1 + 2)</td></tr>
    <tr><td>11 : 121</td><td>square</td></tr>
  </tbody>
</table>

<h3>4. Letter positions — memorise EJOTY</h3>
<p>A=1 … Z=26. Anchor letters: <strong>E = 5, J = 10, O = 15, T = 20, Y = 25</strong>. Opposite letter pairs sum to 27: A↔Z, B↔Y, C↔X, M↔N.</p>

<details class="solution"><summary>Solved examples</summary>
<p><strong>1.</strong> Doctor : Hospital :: Teacher : ? → <strong>School</strong> (workplace).</p>
<p><strong>2.</strong> 8 : 64 :: 11 : ? → square → <strong>121</strong>.</p>
<p><strong>3.</strong> 9 : 80 :: 7 : ? → n² − 1 → <strong>48</strong>.</p>
<p><strong>4.</strong> CAT : DBU :: DOG : ? → each letter +1 → <strong>EPH</strong>.</p>
<p><strong>5.</strong> AZ : BY :: CX : ? → first letter +1, second −1 (opposite pairs) → <strong>DW</strong>.</p>
</details>
"""
    + check("Odometer : Distance :: Anemometer : ?",
            ["Rain", "Wind speed", "Humidity", "Earthquakes"], "b",
            "An odometer measures distance; an anemometer measures wind speed.")
    + check("6 : 222 :: 5 : ?",
            ["125", "130", "150", "120"], "b",
            "6³ + 6 = 222, so 5³ + 5 = 130.")
))

TOPICS.append(topic(
    "Direction Sense",
    "Module 1 · turns, distances and shadows",
    r"""
<h3>1. The compass</h3>
<p>North up, East right, South down, West left. Intermediate: NE, SE, SW, NW (45° between).</p>
<table>
  <thead><tr><th>Facing</th><th>After a right turn (90° clockwise)</th><th>After a left turn (90° anticlockwise)</th></tr></thead>
  <tbody>
    <tr><td>North</td><td>East</td><td>West</td></tr>
    <tr><td>East</td><td>South</td><td>North</td></tr>
    <tr><td>South</td><td>West</td><td>East</td></tr>
    <tr><td>West</td><td>North</td><td>South</td></tr>
  </tbody>
</table>
<p>Clockwise order: N → E → S → W → N. A 135° clockwise turn from North faces South-East.</p>

<h3>2. Shortest distance — Pythagoras</h3>
<p>Net east–west displacement x and net north–south displacement y → shortest distance <strong>√(x² + y²)</strong>. Common triples: 3-4-5, 5-12-13, 6-8-10, 8-15-17, 7-24-25.</p>

<h3>3. Shadow rules</h3>
<ul>
  <li><strong>Morning</strong> (sunrise in the East) → shadows fall to the <strong>West</strong>.</li>
  <li><strong>Evening</strong> (sun in the West) → shadows fall to the <strong>East</strong>.</li>
  <li><strong>Noon</strong> → almost no shadow (in India, slightly towards the North).</li>
  <li>If your shadow falls to your right in the morning, your right side is West → you are facing <strong>South</strong>.</li>
</ul>

<h3>4. Solved examples</h3>
<details class="solution"><summary>Example 1 — net displacement</summary>
<p><em>Ravi walks 10 m North, turns right and walks 6 m, turns right and walks 4 m, then turns left and walks 2 m. How far and in which direction is he from the start?</em></p>
<p>North 10 → East 6 → (right) South 4 → (left from facing South = East) East 2.</p>
<p>North–south: 10 − 4 = 6 m North. East–west: 6 + 2 = 8 m East. Distance = √(36 + 64) = <strong>10 m North-East</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — final direction</summary>
<p><em>A man faces West, turns 45° clockwise, then 180° clockwise, then 270° anticlockwise. Which direction does he face?</em></p>
<p>Net clockwise = 45 + 180 − 270 = −45° → 45° anticlockwise from West = <strong>South-West</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — shadow</summary>
<p><em>One evening Meera and Karan talk face to face. Karan's shadow falls exactly to his left. Which direction is Karan facing?</em></p>
<p>Evening shadow points East, so Karan's left is East → he faces <strong>South</strong>.</p>
</details>

<div class="callout callout-warning"><strong>Trap:</strong> "turns left" is relative to the direction the person is <em>currently facing</em>, not to the page. Draw arrows after every turn.</div>
"""
    + check("Starting at a point, Anu walks 5 km East, 3 km North, 1 km West and 6 km South. How far is she from the start?",
            ["5 km", "7 km", "3 km", "13 km"], "a",
            "East–west: 5 − 1 = 4 km East. North–south: 3 − 6 = 3 km South. √(16 + 9) = 5 km.")
))

TOPICS.append(topic(
    "Number System — Classification, Divisibility, Unit Digit & Factors",
    "Module 1 · the base for every arithmetic chapter",
    r"""
<h3>1. Classification</h3>
<ul>
  <li><strong>Natural</strong> 1, 2, 3 … &nbsp; <strong>Whole</strong> 0, 1, 2 … &nbsp; <strong>Integers</strong> … −2, −1, 0, 1 …</li>
  <li><strong>Rational</strong> p/q (q ≠ 0): terminating or repeating decimals. <strong>Irrational</strong>: √2, π.</li>
  <li><strong>Prime</strong>: exactly two factors (2 is the only even prime). 1 is neither prime nor composite.</li>
  <li><strong>Co-prime</strong>: HCF = 1 (8 and 15).</li>
  <li>Primes below 100: 25 of them (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97).</li>
</ul>

<h3>2. Divisibility rules</h3>
<table>
  <thead><tr><th>By</th><th>Rule</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>2</td><td>last digit even</td><td>7,346</td></tr>
    <tr><td>3</td><td>digit sum divisible by 3</td><td>7+3+5 = 15 → 735 ✓</td></tr>
    <tr><td>4</td><td>last two digits divisible by 4</td><td>9,316 (16)</td></tr>
    <tr><td>5</td><td>ends in 0 or 5</td><td>—</td></tr>
    <tr><td>6</td><td>divisible by 2 and 3</td><td>1,254</td></tr>
    <tr><td>8</td><td>last three digits divisible by 8</td><td>56,<strong>104</strong></td></tr>
    <tr><td>9</td><td>digit sum divisible by 9</td><td>4,527 (18)</td></tr>
    <tr><td>11</td><td>(sum of odd-place digits) − (sum of even-place digits) is 0 or a multiple of 11</td><td>918,082 → (9 + 8 + 8) − (1 + 0 + 2) = 22 ✓</td></tr>
    <tr><td>12</td><td>divisible by 3 and 4</td><td>—</td></tr>
  </tbody>
</table>

<h3>3. Unit digit (cyclicity)</h3>
<table>
  <thead><tr><th>Base ends in</th><th>Powers cycle</th><th>Cycle length</th></tr></thead>
  <tbody>
    <tr><td>0, 1, 5, 6</td><td>always same digit</td><td>1</td></tr>
    <tr><td>2</td><td>2, 4, 8, 6</td><td>4</td></tr>
    <tr><td>3</td><td>3, 9, 7, 1</td><td>4</td></tr>
    <tr><td>4</td><td>4, 6</td><td>2</td></tr>
    <tr><td>7</td><td>7, 9, 3, 1</td><td>4</td></tr>
    <tr><td>8</td><td>8, 4, 2, 6</td><td>4</td></tr>
    <tr><td>9</td><td>9, 1</td><td>2</td></tr>
  </tbody>
</table>
<p>Method: divide the power by the cycle length (4 works for all); remainder r → r-th term of the cycle; remainder 0 → last term.</p>

<h3>4. Number of factors, sum of factors</h3>
<p>If N = a<sup>p</sup> · b<sup>q</sup> · c<sup>r</sup> (prime factorisation):</p>
<ul>
  <li><strong>Number of factors</strong> = (p + 1)(q + 1)(r + 1)</li>
  <li><strong>Sum of factors</strong> = [(a<sup>p+1</sup> − 1)/(a − 1)] × [(b<sup>q+1</sup> − 1)/(b − 1)] × …</li>
</ul>

<h3>5. Useful sums</h3>
<ul>
  <li>1 + 2 + … + n = n(n + 1)/2</li>
  <li>1² + 2² + … + n² = n(n + 1)(2n + 1)/6</li>
  <li>1³ + 2³ + … + n³ = [n(n + 1)/2]²</li>
  <li>Sum of first n odd numbers = n²; first n even numbers = n(n + 1)</li>
</ul>

<h3>6. Solved examples</h3>
<details class="solution"><summary>Example 1 — unit digit of 7<sup>95</sup> × 3<sup>58</sup></summary>
<p>95 ÷ 4 remainder 3 → 7³ ends in 3. &nbsp; 58 ÷ 4 remainder 2 → 3² ends in 9. &nbsp; 3 × 9 = 27 → unit digit <strong>7</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — number of factors of 360</summary>
<p>360 = 2³ × 3² × 5¹ → (3 + 1)(2 + 1)(1 + 1) = <strong>24 factors</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — find the missing digit</summary>
<p><em>For which digit * is 5*2 divisible by 9?</em> Digit sum 5 + * + 2 = 7 + * must be 9 → <strong>* = 2</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — sum of 1 to 50</summary>
<p>50 × 51 / 2 = <strong>1275</strong>.</p>
</details>
"""
    + check("What is the unit digit of 2<sup>43</sup>?",
            ["2", "4", "6", "8"], "d",
            "Cycle 2, 4, 8, 6. 43 ÷ 4 leaves remainder 3 → third term, 8.")
    + check("How many factors does 72 have?",
            ["10", "12", "8", "6"], "b",
            "72 = 2³ × 3² → (3 + 1)(2 + 1) = 12.")
))

TOPICS.append(topic(
    "H.C.F. & L.C.M.",
    "Module 1 · highest common factor and lowest common multiple",
    r"""
<h3>1. Definitions and methods</h3>
<ul>
  <li><strong>HCF</strong> (GCD): largest number dividing all given numbers. Take the <strong>lowest</strong> power of each <em>common</em> prime.</li>
  <li><strong>LCM</strong>: smallest number divisible by all. Take the <strong>highest</strong> power of <em>every</em> prime present.</li>
  <li>Division method for HCF: divide larger by smaller, then divisor by remainder, until remainder 0 (Euclid).</li>
</ul>
<details class="solution"><summary>Worked factorisation</summary>
<p>24 = 2³ × 3 &nbsp;&nbsp; 36 = 2² × 3² &nbsp;&nbsp; 60 = 2² × 3 × 5</p>
<p>HCF = 2² × 3 = <strong>12</strong>. &nbsp; LCM = 2³ × 3² × 5 = <strong>360</strong>.</p>
</details>

<h3>2. Key formulas</h3>
<table>
  <tbody>
    <tr><td>Two numbers</td><td><strong>HCF × LCM = product of the numbers</strong></td></tr>
    <tr><td>Fractions</td><td>HCF = HCF of numerators / LCM of denominators; &nbsp; LCM = LCM of numerators / HCF of denominators</td></tr>
    <tr><td>Numbers of form a·h, b·h</td><td>if HCF is h, the numbers are hx and hy with x, y co-prime</td></tr>
  </tbody>
</table>

<h3>3. Standard word-problem templates</h3>
<table>
  <thead><tr><th>Question says</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>largest size of tile / bag / container that exactly measures</td><td>HCF</td></tr>
    <tr><td>largest number dividing x, y, z leaving the same remainder</td><td>HCF of the differences (y − x), (z − y), (z − x)</td></tr>
    <tr><td>largest number dividing leaving remainders r₁, r₂</td><td>HCF of (x − r₁), (y − r₂)</td></tr>
    <tr><td>bells ring together again / lights blink together / runners meet at start</td><td>LCM of intervals</td></tr>
    <tr><td>smallest number which when divided by a, b, c leaves remainder r in each case</td><td>LCM(a, b, c) + r</td></tr>
    <tr><td>divided by a, b, c leaves remainders that are each k less than the divisors</td><td>LCM(a, b, c) − k</td></tr>
  </tbody>
</table>

<h3>4. Solved examples</h3>
<details class="solution"><summary>Example 1 — bells</summary>
<p><em>Four bells ring at intervals of 6, 8, 12 and 18 seconds. They ring together at 9:00:00. When do they next ring together?</em></p>
<p>LCM(6, 8, 12, 18) = 72 s → <strong>9:01:12</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — same remainder</summary>
<p><em>Find the greatest number that divides 43, 91 and 183 leaving the same remainder.</em></p>
<p>Differences: 91 − 43 = 48, 183 − 91 = 92, 183 − 43 = 140. HCF(48, 92, 140) = <strong>4</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — product rule</summary>
<p><em>The HCF of two numbers is 11 and their LCM is 693. One number is 77. Find the other.</em></p>
<p>Other = 11 × 693 / 77 = 7623 / 77 = <strong>99</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — least number with remainder</summary>
<p><em>Least number which leaves remainder 5 when divided by 6, 9, 15 and 18.</em></p>
<p>LCM(6, 9, 15, 18) = 90 → 90 + 5 = <strong>95</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — ratio with HCF</summary>
<p><em>Two numbers are in the ratio 3 : 4 and their HCF is 5. Find their LCM.</em></p>
<p>Numbers 15 and 20 → LCM = 3 × 4 × 5 = <strong>60</strong>.</p>
</details>
"""
    + check("What is the LCM of 12, 15 and 20?",
            ["60", "120", "180", "30"], "a",
            "12 = 2²·3, 15 = 3·5, 20 = 2²·5 → LCM = 2²·3·5 = 60.")
    + check("The HCF and LCM of two numbers are 6 and 180. If one number is 36, the other is:",
            ["30", "45", "60", "18"], "a",
            "6 × 180 / 36 = 30.")
))

TOPICS.append(topic(
    "Average",
    "Module 1 · balancing deviations instead of long sums",
    r"""
<h3>1. Core formula</h3>
<div class="formula">Average = Sum of observations ÷ Number of observations &nbsp;&nbsp;&nbsp; Sum = Average × Number</div>

<h3>2. Shortcuts</h3>
<ul>
  <li><strong>Deviation method:</strong> assume a base value; average = base + (sum of deviations ÷ n). For 47, 52, 49, 56: base 50 → deviations −3, +2, −1, +6 = +4 → average 50 + 1 = 51.</li>
  <li><strong>Consecutive numbers / any arithmetic progression:</strong> average = (first + last) / 2.</li>
  <li>Average of first n natural numbers = (n + 1)/2; of first n odd numbers = n; of first n even numbers = n + 1.</li>
  <li><strong>New member joins</strong> and average changes by d: new person's value = old average + (new count × d).</li>
  <li><strong>Replacing</strong> one member changes the average by d: new value = old value + (n × d).</li>
  <li><strong>Combined average</strong> of two groups = (n₁a₁ + n₂a₂) / (n₁ + n₂).</li>
</ul>

<h3>3. Average speed</h3>
<p>For equal distances at speeds x and y: average speed = <strong>2xy / (x + y)</strong> (harmonic mean) — <em>not</em> (x + y)/2.</p>

<h3>4. Solved examples</h3>
<details class="solution"><summary>Example 1 — new member</summary>
<p><em>The average age of 30 students is 15 years. When the teacher's age is included, the average increases by 1. Find the teacher's age.</em></p>
<p>Teacher = 15 + 31 × 1 = <strong>46 years</strong>. (Check: 31 × 16 − 30 × 15 = 496 − 450 = 46.)</p>
</details>
<details class="solution"><summary>Example 2 — replacement</summary>
<p><em>The average weight of 8 people increases by 2.5 kg when a person weighing 65 kg is replaced. Weight of the new person?</em></p>
<p>65 + 8 × 2.5 = <strong>85 kg</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — cricket average</summary>
<p><em>A batsman's average after 16 innings is 36. How many runs must he score in the 17th innings to raise the average to 38?</em></p>
<p>Required = 17 × 38 − 16 × 36 = 646 − 576 = <strong>70</strong> (or 38 + 16 × 2 = 70).</p>
</details>
<details class="solution"><summary>Example 4 — combined average</summary>
<p><em>Section A: 40 students, average 60. Section B: 60 students, average 75. Overall average?</em></p>
<p>(2400 + 4500) / 100 = <strong>69</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — average speed</summary>
<p><em>A car goes to a city at 40 km/h and returns at 60 km/h. Average speed?</em></p>
<p>2 × 40 × 60 / 100 = <strong>48 km/h</strong>.</p>
</details>
"""
    + check("The average of 5 consecutive odd numbers is 27. What is the largest?",
            ["29", "31", "33", "35"], "b",
            "Middle number is 27 → numbers 23, 25, 27, 29, 31.")
    + check("The average of 11 results is 50. The first six average 49 and the last six average 52. What is the sixth result?",
            ["56", "50", "52", "54"], "a",
            "6 × 49 + 6 × 52 − 11 × 50 = 294 + 312 − 550 = 56.")
))

TOPICS.append(topic(
    "Remainder Theorem",
    "Module 1 · remainders of huge expressions without computing them",
    r"""
<h3>1. Rules of remainders</h3>
<p>Write R[x ÷ n] for the remainder. Then</p>
<ul>
  <li>R[(a + b) ÷ n] = R[(R[a] + R[b]) ÷ n]</li>
  <li>R[(a × b) ÷ n] = R[(R[a] × R[b]) ÷ n]</li>
  <li><strong>Negative remainders</strong> are allowed while working: 29 ÷ 30 → −1. Convert back at the end (−1 → n − 1).</li>
</ul>

<h3>2. Powers</h3>
<ul>
  <li>(n + 1)<sup>k</sup> ÷ n → remainder <strong>1</strong>.</li>
  <li>(n − 1)<sup>k</sup> ÷ n → remainder <strong>1</strong> if k is even, <strong>n − 1</strong> if k is odd.</li>
  <li>(a<sup>n</sup> + b<sup>n</sup>) is divisible by (a + b) when n is odd; (a<sup>n</sup> − b<sup>n</sup>) is divisible by (a − b) always and by (a + b) when n is even.</li>
  <li>Find a small power with remainder 1 (or −1), then use it to reduce: 2<sup>3</sup> = 8 ≡ 1 (mod 7).</li>
</ul>

<h3>3. Fermat's little theorem</h3>
<p>If p is prime and a is not a multiple of p: <strong>a<sup>p−1</sup> ÷ p leaves remainder 1</strong>. E.g. 3<sup>6</sup> ÷ 7 → 1.</p>

<h3>4. Polynomial remainder theorem</h3>
<p>The remainder when f(x) is divided by (x − a) is <strong>f(a)</strong>. If f(a) = 0, then (x − a) is a factor.</p>

<h3>5. Divisor–remainder relation</h3>
<p><strong>Dividend = Divisor × Quotient + Remainder</strong>, 0 ≤ remainder &lt; divisor.</p>

<h3>6. Solved examples</h3>
<details class="solution"><summary>Example 1 — product</summary>
<p><em>Remainder when 1123 × 1125 × 1127 is divided by 12.</em></p>
<p>Remainders: 1123 → 7, 1125 → 9, 1127 → 11 (≡ −1). 7 × 9 × (−1) = −63 → −63 mod 12 = −3 → 12 − 3 = <strong>9</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — large power</summary>
<p><em>Remainder when 2<sup>100</sup> is divided by 7.</em></p>
<p>2³ = 8 ≡ 1. 100 = 3 × 33 + 1 → 2<sup>100</sup> = (2³)<sup>33</sup> × 2 ≡ 1 × 2 = <strong>2</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — (n − 1) rule</summary>
<p><em>Remainder when 17<sup>23</sup> is divided by 18.</em> 17 ≡ −1 and 23 is odd → −1 → <strong>17</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — polynomial</summary>
<p><em>Remainder when x³ − 2x² + 4x + 5 is divided by (x − 2).</em> f(2) = 8 − 8 + 8 + 5 = <strong>13</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — successive division</summary>
<p><em>A number divided by 56 leaves remainder 29. What is the remainder when it is divided by 8?</em></p>
<p>56 is a multiple of 8, so remainder = 29 mod 8 = <strong>5</strong>.</p>
</details>
"""
    + check("What is the remainder when 5<sup>41</sup> is divided by 6?",
            ["1", "5", "3", "0"], "b",
            "5 ≡ −1 (mod 6) and 41 is odd, so the remainder is −1 ≡ 5.")
    + check("Remainder when 7<sup>16</sup> is divided by 17 (17 is prime)?",
            ["0", "1", "7", "16"], "b",
            "By Fermat's little theorem, a^(p−1) ≡ 1 (mod p): 7¹⁶ ≡ 1 (mod 17).")
))

# ── Module 2 ────────────────────────────────────────────────────────────────

TOPICS.append(topic(
    "Ratio & Proportion",
    "Module 2 · comparing quantities",
    r"""
<h3>1. Ratio basics</h3>
<ul>
  <li>a : b = a/b (b ≠ 0). Ratios are unchanged when both terms are multiplied or divided by the same number.</li>
  <li>To divide a quantity T in ratio a : b → parts <strong>aT/(a+b)</strong> and <strong>bT/(a+b)</strong>.</li>
  <li><strong>Compounding</strong> a:b and c:d → ac : bd. Duplicate ratio a² : b²; sub-duplicate √a : √b; triplicate a³ : b³.</li>
  <li><strong>Combining</strong> A:B = 2:3 and B:C = 4:5 → make B equal: 8:12 and 12:15 → <strong>A:B:C = 8:12:15</strong>.</li>
  <li>If A/2 = B/3 = C/5, then A:B:C = 2:3:5. If 2A = 3B = 4C, then A:B:C = 1/2 : 1/3 : 1/4 = <strong>6 : 4 : 3</strong>.</li>
</ul>

<h3>2. Proportion</h3>
<ul>
  <li>a : b :: c : d means a/b = c/d → <strong>ad = bc</strong> (product of extremes = product of means).</li>
  <li><strong>Fourth proportional</strong> to a, b, c is d = bc/a.</li>
  <li><strong>Third proportional</strong> to a, b is c = b²/a.</li>
  <li><strong>Mean proportional</strong> between a and b is √(ab).</li>
  <li>Direct proportion: y = kx. Inverse proportion: xy = k.</li>
</ul>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — dividing money</summary>
<p><em>Divide ₹1,560 among A, B and C in the ratio 2 : 3 : 7.</em> Total parts 12 → one part ₹130 → A ₹260, B ₹390, C <strong>₹910</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — adding to change a ratio</summary>
<p><em>What number must be added to each of 7 and 11 so that the ratio becomes 3 : 4?</em></p>
<p>(7 + x)/(11 + x) = 3/4 → 28 + 4x = 33 + 3x → <strong>x = 5</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — coins</summary>
<p><em>A bag has ₹1, 50 p and 25 p coins in the ratio 5 : 6 : 8, totalling ₹210. How many 25 p coins?</em></p>
<p>Value ratio = 5×1 : 6×0.5 : 8×0.25 = 5 : 3 : 2 → 25 p coins are worth 2/10 × 210 = ₹42 → <strong>168 coins</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — mean proportional</summary>
<p><em>Mean proportional between 9 and 16.</em> √144 = <strong>12</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — salaries</summary>
<p><em>Salaries of A and B are in ratio 3 : 5. After a ₹4,000 increment each, the ratio becomes 5 : 7. Find A's original salary.</em></p>
<p>(3k + 4000)/(5k + 4000) = 5/7 → 21k + 28000 = 25k + 20000 → k = 2000 → A = <strong>₹6,000</strong>.</p>
</details>
"""
    + check("If A : B = 3 : 4 and B : C = 6 : 7, then A : B : C is:",
            ["3 : 4 : 7", "9 : 12 : 14", "12 : 16 : 21", "6 : 8 : 7"], "b",
            "Make B equal: 9 : 12 and 12 : 14 → 9 : 12 : 14.")
))

TOPICS.append(topic(
    "Problems on Ages",
    "Module 2 · the age gap never changes",
    r"""
<h3>1. Principles</h3>
<ul>
  <li>The <strong>difference</strong> between two people's ages is constant forever.</li>
  <li>After n years, <em>each</em> person is n years older; the <em>sum</em> of k people's ages rises by kn.</li>
  <li>Ratios of ages change over time — set up the ratio with a multiplier (3x, 5x).</li>
  <li>"x years ago" → subtract; "after x years" → add — to <em>both</em> people.</li>
</ul>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — ratio now and later</summary>
<p><em>The ratio of the ages of A and B is 4 : 5. After 6 years it will be 6 : 7. Find A's present age.</em></p>
<p>(4x + 6)/(5x + 6) = 6/7 → 28x + 42 = 30x + 36 → x = 3 → A = <strong>12 years</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — father and son</summary>
<p><em>A father is 3 times as old as his son. After 12 years he will be twice as old as his son. Present ages?</em></p>
<p>F = 3S; 3S + 12 = 2(S + 12) → S = 12, F = <strong>36</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — sum of ages</summary>
<p><em>The sum of the ages of 5 children born at intervals of 3 years is 50. Age of the youngest?</em></p>
<p>x + (x+3) + (x+6) + (x+9) + (x+12) = 5x + 30 = 50 → <strong>x = 4</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — "when I was your age"</summary>
<p><em>A says to B: "When I was your present age, you were 10. When you reach my present age, I will be 40." Find their ages.</em></p>
<p>Let gap = d. A − d = B and B − d = 10 → B = 10 + d, A = 10 + 2d. When B reaches A's age (after d years), A = A + d = 10 + 3d = 40 → d = 10 → A = <strong>30</strong>, B = <strong>20</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — average age with a newcomer</summary>
<p><em>Three years ago the average age of a family of 4 was 25 years. A baby has been born since, and today the average age of the 5 members is 22.6 years. How old is the baby?</em></p>
<p>Present total of the original 4 = 4 × 25 + 4 × 3 = 112. Present total of 5 = 5 × 22.6 = 113. Baby = 113 − 112 = <strong>1 year</strong>.</p>
</details>
"""
    + check("Ten years ago, A was half of B's age. The ratio of their present ages is 3 : 4. What is the sum of their present ages?",
            ["35", "45", "42", "40"], "a",
            "Present 3x and 4x: 3x − 10 = (4x − 10)/2 → 6x − 20 = 4x − 10 → x = 5 → 15 + 20 = 35.")
))

TOPICS.append(topic(
    "Partnership",
    "Module 2 · sharing profit by capital × time",
    r"""
<h3>1. Rules</h3>
<ul>
  <li><strong>Simple partnership</strong> (same period): profit shared in the ratio of <strong>capitals</strong>.</li>
  <li><strong>Compound partnership</strong> (different periods): profit shared in the ratio of <strong>capital × time</strong> (money-months).</li>
  <li><strong>Working partner</strong>: first deduct salary/commission from profit, then share the rest.</li>
  <li>If capital changes midway, add money-months for each period: A invests 10,000 for 4 months then 15,000 for 8 months → 40,000 + 1,20,000 = 1,60,000.</li>
</ul>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — different times</summary>
<p><em>A starts a business with ₹45,000. After 3 months B joins with ₹60,000. Annual profit ₹28,000. Find B's share.</em></p>
<p>A : B = 45,000 × 12 : 60,000 × 9 = 5,40,000 : 5,40,000 = 1 : 1 → B = <strong>₹14,000</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — capital changes</summary>
<p><em>A and B invest ₹20,000 and ₹30,000. After 6 months A adds ₹10,000 and B withdraws ₹10,000. Profit ₹66,000 at year-end. Shares?</em></p>
<p>A = 20,000×6 + 30,000×6 = 3,00,000; B = 30,000×6 + 20,000×6 = 3,00,000 → equal → <strong>₹33,000 each</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — working partner</summary>
<p><em>A invests ₹50,000 and B ₹30,000. B manages the business and gets 10% of profit as salary. Profit ₹40,000. B's total?</em></p>
<p>Salary 4,000. Remaining 36,000 in 5 : 3 → B gets 13,500 → total <strong>₹17,500</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — finding time</summary>
<p><em>A and B invest in ratio 3 : 2, and profits are shared 9 : 4. If A invested for 12 months, for how long did B invest?</em></p>
<p>3 × 12 : 2 × t = 9 : 4 → 36/2t = 9/4 → 18t = 144 → t = <strong>8 months</strong>.</p>
</details>
"""
    + check("A, B and C invest ₹1,20,000, ₹1,35,000 and ₹1,50,000 for 12 months. From a profit of ₹56,700, what is B's share?",
            ["₹16,800", "₹18,900", "₹21,000", "₹17,500"], "b",
            "Ratio 120 : 135 : 150 = 8 : 9 : 10 → B = 9/27 × 56,700 = ₹18,900.")
))

TOPICS.append(topic(
    "Alligation & Mixtures",
    "Module 2 · the cross method for mixing prices or strengths",
    r"""
<h3>1. Rule of alligation</h3>
<p>Mixing a cheaper item (price c) with a dearer item (price d) to get a mean price m:</p>
<div class="formula">Quantity of cheaper : Quantity of dearer = (d − m) : (m − c)</div>
<pre><code class="language-text">  cheaper c            dearer d
          \           /
            mean m
          /           \
     (d − m)         (m − c)
   = cheaper part  = dearer part</code></pre>
<p>Works for prices, concentrations (% milk, % alcohol), speeds, marks, profit percentages — any <em>weighted average</em>.</p>

<h3>2. Repeated replacement</h3>
<p>A container holds x litres of pure liquid. Each time, y litres are removed and replaced with water. After n operations:</p>
<div class="formula">Pure liquid left = x (1 − y/x)<sup>n</sup></div>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — rice prices</summary>
<p><em>In what ratio should rice at ₹42/kg be mixed with rice at ₹54/kg to get a mixture worth ₹46/kg?</em></p>
<p>(54 − 46) : (46 − 42) = 8 : 4 = <strong>2 : 1</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — milk and water</summary>
<p><em>How much water must be added to 60 litres of milk at ₹25/litre so that the mixture is worth ₹20/litre?</em></p>
<p>Water costs 0. Milk : water = (20 − 0) : (25 − 20) = 20 : 5 = 4 : 1 → water = 60/4 = <strong>15 litres</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — weighted average of groups</summary>
<p><em>A class average is 60. Boys average 55 and girls 70. Ratio of boys to girls?</em></p>
<p>(70 − 60) : (60 − 55) = <strong>2 : 1</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — replacement</summary>
<p><em>A 40-litre can is full of milk. 4 litres are taken out and replaced with water, three times. Milk left?</em></p>
<p>40 × (1 − 4/40)³ = 40 × 0.9³ = 40 × 0.729 = <strong>29.16 litres</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — profit percentages</summary>
<p><em>A trader sells part of 50 kg sugar at 8% profit and the rest at 18% profit, earning 14% overall. How much was sold at 18%?</em></p>
<p>(18 − 14) : (14 − 8) = 4 : 6 = 2 : 3 (8% part : 18% part) → 18% part = 3/5 × 50 = <strong>30 kg</strong>.</p>
</details>
"""
    + check("Tea at ₹126/kg and ₹135/kg are mixed with a third variety in the ratio 1 : 1 : 2. The mixture is worth ₹153/kg. The third variety costs:",
            ["₹169.50", "₹170.00", "₹175.50", "₹180.00"], "c",
            "The first two average ₹130.50. Mixing ₹130.50 and x equally (2 : 2) gives 153 → x = 2 × 153 − 130.50 = ₹175.50.")
))

TOPICS.append(topic(
    "Odd Man Out (Classification)",
    "Module 2 · find the item that breaks the group's rule",
    r"""
<h3>1. What to check, in order</h3>
<table>
  <thead><tr><th>Item type</th><th>Check</th></tr></thead>
  <tbody>
    <tr><td>Numbers</td><td>prime / composite, odd / even, perfect squares or cubes, divisibility, digit sums, n² ± 1, n³ ± 1, multiples, differences</td></tr>
    <tr><td>Letter groups</td><td>vowels vs consonants, gaps between letters (+2, +3), reverse order, positions (sum), symmetric letters</td></tr>
    <tr><td>Words</td><td>category (fruits vs vegetables), function (tool vs instrument), part of speech, number of letters, grammatical gender, synonyms</td></tr>
    <tr><td>GK</td><td>capitals, rivers, planets, currencies, states vs union territories</td></tr>
  </tbody>
</table>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Numbers</summary>
<p><strong>1.</strong> 3, 5, 7, 9, 11 → <strong>9</strong> (not prime).</p>
<p><strong>2.</strong> 16, 25, 36, 48, 64 → <strong>48</strong> (not a perfect square).</p>
<p><strong>3.</strong> 10, 26, 50, 65, 82 → n² + 1: 10 = 3² + 1, 26 = 5² + 1, 50 = 7² + 1, 82 = 9² + 1; 65 = 8² + 1 uses an even base → <strong>65</strong> (the others use odd n).</p>
<p><strong>4.</strong> 121, 143, 165, 186, 198 → multiples of 11 except <strong>186</strong>.</p>
</details>
<details class="solution"><summary>Letters</summary>
<p><strong>5.</strong> ACE, GIK, MOQ, SUX → gaps of +2 in the first three; S→U (+2), U→X (+3) → <strong>SUX</strong>.</p>
<p><strong>6.</strong> BD, FH, JL, NQ → +2 gap except N→Q (+3) → <strong>NQ</strong>.</p>
</details>
<details class="solution"><summary>Words and GK</summary>
<p><strong>7.</strong> Violin, Sitar, Guitar, Flute → <strong>Flute</strong> (wind; the rest are string instruments).</p>
<p><strong>8.</strong> Mercury, Venus, Moon, Mars → <strong>Moon</strong> (a satellite, not a planet).</p>
<p><strong>9.</strong> Kilogram, Metre, Litre, Kelvin, Rupee → <strong>Rupee</strong> (currency, not a unit of measurement).</p>
</details>

<div class="callout callout-key"><strong>Tip:</strong> if two different rules each single out a different option, the intended rule is usually the one that makes <em>all four others</em> follow it cleanly — test every option against your rule.</div>
"""
    + check("Find the odd one out: 27, 64, 125, 144, 216",
            ["27", "64", "144", "216"], "c",
            "All the others are perfect cubes (3³, 4³, 5³, 6³); 144 is a square but not a cube.")
))

TOPICS.append(topic(
    "Syllogism",
    "Module 2 · Venn diagrams for \"All, Some, No\" statements",
    r"""
<h3>1. Four statement types</h3>
<table>
  <thead><tr><th>Statement</th><th>Venn meaning</th><th>Immediate conversion</th></tr></thead>
  <tbody>
    <tr><td><strong>All A are B</strong></td><td>circle A completely inside B</td><td>Some B are A ✔ (All B are A ✘)</td></tr>
    <tr><td><strong>Some A are B</strong></td><td>circles overlap</td><td>Some B are A ✔</td></tr>
    <tr><td><strong>No A is B</strong></td><td>circles separate</td><td>No B is A ✔</td></tr>
    <tr><td><strong>Some A are not B</strong></td><td>part of A outside B</td><td>no valid conversion</td></tr>
  </tbody>
</table>

<h3>2. Method</h3>
<ol>
  <li>Draw the <strong>minimum</strong> diagram satisfying all statements (don't add overlaps that aren't stated).</li>
  <li>A conclusion is <strong>true</strong> only if it holds in <em>every</em> possible diagram.</li>
  <li>Try to draw a diagram where the conclusion fails; if you can, it does not follow.</li>
</ol>

<h3>3. Quick combination rules (two statements sharing a middle term B)</h3>
<table>
  <thead><tr><th>Statement 1</th><th>Statement 2</th><th>Definite conclusion A–C</th></tr></thead>
  <tbody>
    <tr><td>All A are B</td><td>All B are C</td><td>All A are C</td></tr>
    <tr><td>All A are B</td><td>No B is C</td><td>No A is C</td></tr>
    <tr><td>Some A are B</td><td>All B are C</td><td>Some A are C</td></tr>
    <tr><td>Some A are B</td><td>No B is C</td><td>Some A are not C</td></tr>
    <tr><td>All A are B</td><td>Some B are C</td><td>no definite conclusion</td></tr>
    <tr><td>Some A are B</td><td>Some B are C</td><td>no definite conclusion</td></tr>
    <tr><td>No A is B</td><td>No B is C</td><td>no definite conclusion</td></tr>
  </tbody>
</table>

<h3>4. "Either–or" (complementary pair)</h3>
<p>If neither "Some A are C" nor "No A is C" is definitely true, but the pair covers every possibility for the same two terms, the answer is <strong>either I or II follows</strong>. Pairs: <em>Some + No</em>, <em>All + Some not</em>.</p>

<h3>5. Possibility conclusions</h3>
<p>"All A <em>can be</em> C" / "Some A being C is a possibility" is <strong>true</strong> if at least one valid diagram shows it and no statement forbids it. It is false only when a given statement makes it impossible (e.g. "No A is C" is given).</p>

<h3>6. Solved examples</h3>
<details class="solution"><summary>Example 1</summary>
<p><strong>Statements:</strong> All pens are books. Some books are tables.<br>
<strong>Conclusions:</strong> I. Some pens are tables. II. Some tables are books.</p>
<p>I does not follow (pens may sit outside the table overlap). II is the conversion of "Some books are tables" → follows. <strong>Only II follows.</strong></p>
</details>
<details class="solution"><summary>Example 2</summary>
<p><strong>Statements:</strong> Some cats are dogs. No dog is a rat.<br>
<strong>Conclusions:</strong> I. Some cats are not rats. II. No cat is a rat.</p>
<p>The cats that are dogs cannot be rats → I follows. Other cats might be rats → II doesn't. <strong>Only I follows.</strong></p>
</details>
<details class="solution"><summary>Example 3 — either–or</summary>
<p><strong>Statements:</strong> All roses are flowers. Some flowers are red.<br>
<strong>Conclusions:</strong> I. Some roses are red. II. No rose is red.</p>
<p>Neither is certain, but they are complementary (Some / No for roses–red) → <strong>Either I or II follows.</strong></p>
</details>
<details class="solution"><summary>Example 4 — possibility</summary>
<p><strong>Statements:</strong> All teachers are graduates. No graduate is illiterate.<br>
<strong>Conclusions:</strong> I. No teacher is illiterate. II. Some graduates being teachers is a possibility.</p>
<p>I: teachers are inside graduates, which are separate from illiterate → follows. II: "Some graduates are teachers" is actually definitely true (conversion), so the possibility also holds → <strong>Both follow.</strong></p>
</details>
"""
    + check("Statements: All apples are fruits. No fruit is a vegetable. Conclusions: I. No apple is a vegetable. II. Some fruits are apples.",
            ["Only I follows", "Only II follows", "Both follow", "Neither follows"], "c",
            "Apples lie inside fruits, which are separate from vegetables (I). II is the conversion of All apples are fruits.")
))
