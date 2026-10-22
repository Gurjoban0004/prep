"""Numerical Aptitude & Logical Reasoning-I (25UNI0110) — End Term: Module 5 (Time, Work & Spatial Logic) and Module 6 (Verbal Aptitude)."""

from subjects.helpers import topic, check

TOPICS = []

# ── Module 5 ────────────────────────────────────────────────────────────────

TOPICS.append(topic(
    "Time & Work",
    "Module 5 · work rates add up",
    r"""
<h3>1. Core idea</h3>
<ul>
  <li>If A finishes a job in <strong>a</strong> days, A's one-day work = <strong>1/a</strong>.</li>
  <li>Working together, rates add: (1/a + 1/b) per day → time = <strong>ab/(a + b)</strong>.</li>
  <li>Efficiency is inversely proportional to time: if A is twice as efficient as B, A takes half the time.</li>
  <li><strong>M₁ D₁ H₁ / W₁ = M₂ D₂ H₂ / W₂</strong> (men × days × hours per unit of work).</li>
</ul>

<h3>2. LCM (total work) method — the fastest</h3>
<p>Take total work = LCM of the individual times, find each person's units per day, then divide.</p>
<details class="solution"><summary>Example 1 — two workers</summary>
<p><em>A can do a job in 12 days and B in 18 days. How long together?</em></p>
<p>Total work = LCM(12, 18) = 36 units. A = 3 units/day, B = 2 units/day → together 5 units/day → 36/5 = <strong>7.2 days</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — one leaves</summary>
<p><em>A and B can finish a work in 20 and 30 days. They work together for 6 days, then A leaves. In how many more days will B finish?</em></p>
<p>Total 60 units; A = 3, B = 2 per day. 6 days together = 30 units. Remaining 30 units ÷ 2 = <strong>15 days</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — finding one person's time</summary>
<p><em>A and B together take 8 days; A alone takes 12 days. How long does B take alone?</em></p>
<p>1/B = 1/8 − 1/12 = 1/24 → <strong>24 days</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — men and days</summary>
<p><em>12 men can build a wall in 20 days working 8 hours a day. How many days will 16 men take working 6 hours a day?</em></p>
<p>12 × 20 × 8 = 16 × D × 6 → D = 1920 / 96 = <strong>20 days</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — efficiency</summary>
<p><em>A is 50% more efficient than B. B alone takes 30 days. How long do they take together?</em></p>
<p>B = 1 unit/day, A = 1.5 units/day, total work 30 units → 30/2.5 = <strong>12 days</strong>.</p>
</details>
<details class="solution"><summary>Example 6 — alternate days</summary>
<p><em>A takes 10 days and B 15 days. They work on alternate days starting with A. When is the work done?</em></p>
<p>Total 30 units; A = 3, B = 2 → every 2 days = 5 units. 5 cycles (10 days) = 25 units; day 11 (A) adds 3 → 28; day 12 (B) adds 2 → 30. Done in <strong>12 days</strong>.</p>
</details>
"""
    + check("A can finish a work in 15 days and B in 10 days. Working together, they finish in:",
            ["5 days", "6 days", "12.5 days", "25 days"], "b",
            "Total 30 units; A = 2/day, B = 3/day → 30/5 = 6 days.")
))

TOPICS.append(topic(
    "Pipes & Cisterns",
    "Module 5 · time and work with filling and emptying",
    r"""
<h3>1. Conventions</h3>
<ul>
  <li>An <strong>inlet</strong> filling a tank in x hours adds <strong>+1/x</strong> per hour.</li>
  <li>An <strong>outlet</strong> (leak) emptying it in y hours adds <strong>−1/y</strong> per hour.</li>
  <li>Net rate = sum of all open pipes. Time = 1 ÷ net rate (or use the LCM method).</li>
</ul>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — two inlets</summary>
<p><em>Pipes A and B fill a tank in 20 and 30 minutes. Both are opened. Time to fill?</em></p>
<p>LCM 60 units: A = 3, B = 2 → 5 units/min → <strong>12 minutes</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — with a leak</summary>
<p><em>A pipe fills a tank in 6 hours, but because of a leak it takes 8 hours. How long does the leak alone take to empty a full tank?</em></p>
<p>Leak rate = 1/6 − 1/8 = 1/24 → <strong>24 hours</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — inlet and outlet</summary>
<p><em>A fills in 12 h, B fills in 15 h, C empties in 20 h. All open together. Time to fill?</em></p>
<p>LCM 60: A = +5, B = +4, C = −3 → net 6 units/h → <strong>10 hours</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — closing a pipe midway</summary>
<p><em>A and B fill a tank in 10 and 15 minutes. Both are opened; after 3 minutes B is closed. Total time to fill?</em></p>
<p>LCM 30: A = 3, B = 2. First 3 min: 15 units. Remaining 15 units by A alone: 5 min → total <strong>8 minutes</strong>.</p>
</details>
"""
    + check("A tap fills a tank in 4 hours and a drain empties it in 6 hours. If both are open, the tank fills in:",
            ["10 hours", "12 hours", "2.4 hours", "8 hours"], "b",
            "Net rate = 1/4 − 1/6 = 1/12 → 12 hours.")
))

TOPICS.append(topic(
    "Mixed Proportion & Mixtures",
    "Module 5 · ratios inside mixtures, adding and replacing",
    r"""
<h3>1. Key ideas</h3>
<ul>
  <li>In a mixture with ratio a : b, the fraction of the first part = a/(a + b).</li>
  <li><strong>Adding</strong> only one component changes its quantity; the other stays constant — track the unchanged one.</li>
  <li><strong>Mixing two mixtures</strong>: convert each to actual quantities (or fractions) and add component-wise.</li>
  <li><strong>Replacement</strong> (remove x litres, refill with the other liquid, n times): remaining pure = V(1 − x/V)<sup>n</sup>.</li>
  <li>For price or concentration averages, use alligation (see Module 2).</li>
</ul>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — adding water</summary>
<p><em>60 litres of milk and water are in the ratio 2 : 1. How much water must be added to make the ratio 1 : 2?</em></p>
<p>Milk 40, water 20. Milk stays 40 → for 1 : 2, water must be 80 → add <strong>60 litres</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — combining two containers</summary>
<p><em>Container A has milk : water = 3 : 1; container B has 5 : 3. Equal quantities are mixed. Resulting ratio?</em></p>
<p>Take 8 litres of each: A → 6 milk, 2 water; B → 5 milk, 3 water. Total milk 11, water 5 → <strong>11 : 5</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — mixing in a ratio to hit a target</summary>
<p><em>Alloy A has gold : copper = 7 : 2; alloy B has 7 : 11. In what ratio should A and B be mixed to get gold : copper = 1 : 1?</em></p>
<p>Gold fractions: A = 7/9, B = 7/18, target = 1/2. Alligation: (1/2 − 7/18) : (7/9 − 1/2) = (2/18) : (5/18) = <strong>2 : 5</strong> (A : B).</p>
</details>
<details class="solution"><summary>Example 4 — replacement</summary>
<p><em>A 20-litre vessel of pure wine has 5 litres removed and replaced with water twice. Wine : water at the end?</em></p>
<p>Wine = 20 × (3/4)² = 11.25 L; water = 8.75 L → 11.25 : 8.75 = <strong>9 : 7</strong>.</p>
</details>
"""
    + check("In 45 litres of a mixture, the ratio of alcohol to water is 4 : 1. How much water must be added to make the ratio 3 : 2?",
            ["9 L", "15 L", "12 L", "18 L"], "b",
            "Alcohol 36, water 9. For 3 : 2, water = 36 × 2/3 = 24 → add 15 L.")
))

TOPICS.append(topic(
    "Work & Wages",
    "Module 5 · pay in proportion to work done",
    r"""
<h3>1. Rule</h3>
<p>Wages are shared in the ratio of <strong>work done</strong>. When people work for the same number of days, that is the ratio of their <strong>efficiencies</strong> (one-day work) — i.e. the inverse ratio of the time each would take alone.</p>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — two workers</summary>
<p><em>A can do a job in 10 days and B in 15 days. Together they finish and receive ₹3,000. Shares?</em></p>
<p>Efficiency ratio = 1/10 : 1/15 = 3 : 2 → A <strong>₹1,800</strong>, B <strong>₹1,200</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — a helper joins</summary>
<p><em>A and B can do a work in 12 and 16 days. With the help of C they finish it in 6 days. Total wage ₹4,800. C's share?</em></p>
<p>In 6 days A does 6/12 = 1/2, B does 6/16 = 3/8, so C does 1 − 1/2 − 3/8 = 1/8 → C gets 4,800/8 = <strong>₹600</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — different days worked</summary>
<p><em>A (daily output 4 units) works 5 days and B (daily output 3 units) works 8 days to finish a job paid ₹8,800. Shares?</em></p>
<p>Work done A 20, B 24 → 5 : 6 → A <strong>₹4,000</strong>, B <strong>₹4,800</strong>.</p>
</details>
"""
    + check("A, B and C can do a job in 6, 8 and 12 days. Working together they earn ₹2,700. What is B's share?",
            ["₹600", "₹900", "₹1,200", "₹800"], "b",
            "Efficiencies 1/6 : 1/8 : 1/12 = 4 : 3 : 2 → B = 3/9 × 2,700 = ₹900.")
))

TOPICS.append(topic(
    "Ranking & Order",
    "Module 5 · positions from the top, bottom, left and right",
    r"""
<h3>1. Formulas</h3>
<div class="formula">Total = rank from top + rank from bottom − 1 &nbsp;&nbsp;&nbsp; (same for left + right)</div>
<ul>
  <li>Rank from bottom = total − rank from top + 1.</li>
  <li>People <strong>between</strong> positions p and q (same end): |p − q| − 1.</li>
  <li>If two people's positions from opposite ends <strong>overlap</strong>, total = sum of positions − people between − 2.</li>
  <li>Minimum people in a queue with given overlapping positions — draw it.</li>
</ul>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — total in a row</summary>
<p><em>Riya is 14th from the left and 9th from the right in a row. How many people are in the row?</em> 14 + 9 − 1 = <strong>22</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — rank from the other end</summary>
<p><em>In a class of 45, Aman is 12th from the top. What is his rank from the bottom?</em> 45 − 12 + 1 = <strong>34</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — people between (non-overlapping)</summary>
<p><em>In a row of 40 students, A is 12th from the left and B is 15th from the right. How many students are between them?</em></p>
<p>B from the left = 40 − 15 + 1 = 26 → between = 26 − 12 − 1 = <strong>13</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — swapping positions</summary>
<p><em>A and B are 8th and 14th from the left. They swap places and A is now 20th from the right. How many people are in the row?</em></p>
<p>After swapping, A is 14th from the left and 20th from the right → 14 + 20 − 1 = <strong>33</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — comparisons</summary>
<p><em>P is taller than Q but shorter than R. S is shorter than Q. T is taller than R. Who is the tallest and the third tallest?</em></p>
<p>Order: T &gt; R &gt; P &gt; Q &gt; S → tallest <strong>T</strong>, third <strong>P</strong>.</p>
</details>
"""
    + check("In a queue, Neha is 10th from the front and 25th from the back. How many people are in the queue?",
            ["35", "34", "36", "33"], "b",
            "10 + 25 − 1 = 34.")
))

TOPICS.append(topic(
    "Cube & Cuboid",
    "Module 5 · painted cubes, cutting and nets",
    r"""
<h3>1. Painted cube cut into n × n × n smaller cubes</h3>
<p>A large cube painted on all six faces is cut into n³ equal small cubes (n ≥ 2):</p>
<table>
  <thead><tr><th>Painted faces</th><th>Where</th><th>Count</th><th>n = 3</th><th>n = 4</th></tr></thead>
  <tbody>
    <tr><td>3 faces</td><td>corners</td><td>8</td><td>8</td><td>8</td></tr>
    <tr><td>2 faces</td><td>edges (not corners)</td><td>12(n − 2)</td><td>12</td><td>24</td></tr>
    <tr><td>1 face</td><td>face centres</td><td>6(n − 2)²</td><td>6</td><td>24</td></tr>
    <tr><td>0 faces</td><td>inside</td><td>(n − 2)³</td><td>1</td><td>8</td></tr>
  </tbody>
</table>
<p>Check: 8 + 12(n − 2) + 6(n − 2)² + (n − 2)³ = n³.</p>

<h3>2. Cuts</h3>
<ul>
  <li>Minimum cuts to make n³ identical pieces from a cube: <strong>3(n − 1)</strong> (n − 1 cuts along each axis).</li>
  <li>Maximum pieces with k straight cuts across a cube (pieces can't be rearranged): make cuts as evenly as possible along three axes: pieces = (x + 1)(y + 1)(z + 1) with x + y + z = k.</li>
</ul>

<h3>3. Cuboid a × b × c (units) painted on all faces</h3>
<ul>
  <li>3 faces painted: 8 (corners)</li>
  <li>2 faces: 4[(a − 2) + (b − 2) + (c − 2)]</li>
  <li>1 face: 2[(a − 2)(b − 2) + (b − 2)(c − 2) + (a − 2)(c − 2)]</li>
  <li>0 faces: (a − 2)(b − 2)(c − 2)</li>
</ul>

<h3>4. Dice and nets</h3>
<ul>
  <li>On a standard die, <strong>opposite faces sum to 7</strong> (1–6, 2–5, 3–4).</li>
  <li>In an unfolded net, faces separated by exactly one face in a straight line are opposite; adjacent faces can never be opposite.</li>
  <li>When two views of a die share a face, rotate one mentally so the common face aligns, then read opposites.</li>
</ul>

<h3>5. Solved examples</h3>
<details class="solution"><summary>Example 1</summary>
<p><em>A cube painted red on all faces is cut into 125 small cubes. How many have exactly two faces painted? No faces painted?</em></p>
<p>n = 5 → two faces 12 × 3 = <strong>36</strong>; none 3³ = <strong>27</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — cuboid</summary>
<p><em>A 4 × 3 × 2 cuboid, painted on all faces, is cut into 1 × 1 × 1 cubes. How many have no painted face?</em></p>
<p>(4 − 2)(3 − 2)(2 − 2) = 2 × 1 × 0 = <strong>0</strong> — every small cube touches the surface.</p>
</details>
<details class="solution"><summary>Example 3 — cuts</summary>
<p><em>Minimum number of cuts to divide a cube into 64 identical pieces?</em> n = 4 → 3 × 3 = <strong>9 cuts</strong>.</p>
</details>
"""
    + check("A painted cube is cut into 64 equal smaller cubes. How many small cubes have exactly one face painted?",
            ["8", "16", "24", "32"], "c",
            "n = 4 → 6(n − 2)² = 6 × 4 = 24.")
))

TOPICS.append(topic(
    "Calendar",
    "Module 5 · odd days and day-of-the-week questions",
    r"""
<h3>1. Odd days</h3>
<p>Odd days are the days left over after complete weeks.</p>
<table>
  <thead><tr><th>Period</th><th>Odd days</th></tr></thead>
  <tbody>
    <tr><td>Ordinary year (365 days)</td><td>1</td></tr>
    <tr><td>Leap year (366 days)</td><td>2</td></tr>
    <tr><td>100 years</td><td>5</td></tr>
    <tr><td>200 years</td><td>3</td></tr>
    <tr><td>300 years</td><td>1</td></tr>
    <tr><td>400 years</td><td>0</td></tr>
  </tbody>
</table>
<p>Odd-day code: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday.</p>

<h3>2. Leap years</h3>
<ul>
  <li>Divisible by 4 → leap year, <strong>except</strong> century years, which must be divisible by <strong>400</strong>.</li>
  <li>2000 and 2400 are leap years; 1900 and 2100 are not.</li>
</ul>

<h3>3. Month codes (odd days per month)</h3>
<table>
  <tbody>
    <tr><td>Jan 3</td><td>Feb 0 (1 in leap year)</td><td>Mar 3</td><td>Apr 2</td><td>May 3</td><td>Jun 2</td></tr>
    <tr><td>Jul 3</td><td>Aug 3</td><td>Sep 2</td><td>Oct 3</td><td>Nov 2</td><td>Dec 3</td></tr>
  </tbody>
</table>

<h3>4. Useful facts</h3>
<ul>
  <li>A calendar repeats after 28 years in most cases (when no century non-leap year intervenes).</li>
  <li>An ordinary year's calendar repeats after 6 or 11 years; a leap year's after 28.</li>
  <li>The last day of a century can't be Tuesday, Thursday or Saturday.</li>
  <li>An ordinary year starts and ends on the same day; a leap year ends one day later than it starts.</li>
</ul>

<h3>5. Solved examples</h3>
<details class="solution"><summary>Example 1 — day on a known date</summary>
<p><em>15 August 1947 — which day was it?</em></p>
<p>1600 years → 0 odd days. 300 years → 1. Years 1901–1946: 46 years with 11 leap years → 46 + 11 = 57 → 57 mod 7 = 1.</p>
<p>1947 up to 15 August: Jan 3 + Feb 0 + Mar 3 + Apr 2 + May 3 + Jun 2 + Jul 3 + 15 days (1) = 17 → 3.</p>
<p>Total 0 + 1 + 1 + 3 = 5 → <strong>Friday</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — shift from a known day</summary>
<p><em>If 1 January 2026 is a Thursday, what day is 1 January 2027?</em></p>
<p>2026 is an ordinary year → 1 odd day → <strong>Friday</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — within a year</summary>
<p><em>If 3 March of a year is a Monday, what day is 3 July of the same year?</em></p>
<p>Days after 3 March: 28 (rest of March) + 30 + 31 + 30 + 3 = 122 → 122 mod 7 = 3 → Monday + 3 = <strong>Thursday</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — repeating calendar</summary>
<p><em>Which year will have the same calendar as 2026?</em></p>
<p>We need a year that starts on the same weekday <strong>and</strong> is also an ordinary year. Add odd days year by year from 2026:</p>
<p>2026 (1), 2027 (1), 2028 leap (2), 2029 (1), 2030 (1), 2031 (1) → total 7 ≡ 0, so 2032 starts on the same weekday — but 2032 is a leap year, so it doesn't match.</p>
<p>Continue: 2032 (2), 2033 (1), 2034 (1), 2035 (1), 2036 leap (2) → another 7 ≡ 0, so 2037 starts on the same weekday and is an ordinary year → <strong>2037</strong>.</p>
</details>
"""
    + check("How many odd days are there in 500 years?",
            ["5", "4", "1", "2"], "a",
            "400 years give 0 odd days and 100 years give 5, so 500 years give 5.")
    + check("Which of these is NOT a leap year?",
            ["2000", "2024", "1900", "2400"], "c",
            "Century years must be divisible by 400; 1900 is not.")
))

TOPICS.append(topic(
    "Clock",
    "Module 5 · angles between hands and when they coincide",
    r"""
<h3>1. Hand speeds</h3>
<ul>
  <li>Minute hand: 360° in 60 min → <strong>6° per minute</strong>.</li>
  <li>Hour hand: 30° per hour → <strong>0.5° per minute</strong>.</li>
  <li>Relative speed: <strong>5.5° per minute</strong> (the minute hand gains 55 minute-spaces per hour).</li>
</ul>

<h3>2. Angle formula</h3>
<div class="formula">Angle at H hours M minutes = |30H − 5.5M| &nbsp; (if above 180°, take 360° minus it)</div>

<h3>3. Coinciding, opposite and right angles</h3>
<ul>
  <li>Hands coincide <strong>11 times</strong> in 12 hours (22 times in a day) — every 65 5/11 minutes.</li>
  <li>Between H and H+1 o'clock, they coincide at <strong>(60/11) × H</strong> minutes past H.</li>
  <li>Opposite (180°) 11 times in 12 hours; at right angles (90°) 22 times in 12 hours (44 in a day).</li>
  <li>In a day the hands are in a straight line (0° or 180°) 44 times.</li>
</ul>

<h3>4. Faulty clocks and mirror images</h3>
<ul>
  <li>If hands coincide every m minutes of true time instead of 65 5/11, the clock gains (if m &lt; 65 5/11) or loses.</li>
  <li><strong>Mirror image</strong> time = 11:60 − given time (for times between 1:00 and 11:00); between 11:00 and 12:59 use 23:60 − time.</li>
</ul>

<h3>5. Solved examples</h3>
<details class="solution"><summary>Example 1 — angle</summary>
<p><em>Angle between the hands at 3:40.</em> |30 × 3 − 5.5 × 40| = |90 − 220| = <strong>130°</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — reflex check</summary>
<p><em>Angle at 8:10.</em> |240 − 55| = 185° → 360 − 185 = <strong>175°</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — coinciding</summary>
<p><em>At what time between 4 and 5 o'clock do the hands coincide?</em></p>
<p>(60/11) × 4 = 240/11 = <strong>21 9/11 minutes past 4</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — mirror</summary>
<p><em>A clock shows 4:25. What does its mirror image show?</em> 11:60 − 4:25 = <strong>7:35</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — right angle</summary>
<p><em>When between 2 and 3 o'clock are the hands first at right angles?</em></p>
<p>|60 − 5.5M| = 90 → 5.5M = 150 → M = 300/11 = <strong>27 3/11 minutes past 2</strong> (the other solution, 5.5M = −30, is invalid).</p>
</details>
"""
    + check("What is the angle between the hour and minute hands at 7:20?",
            ["100°", "110°", "90°", "120°"], "a",
            "|30 × 7 − 5.5 × 20| = |210 − 110| = 100°.")
))

TOPICS.append(topic(
    "Time Sequence",
    "Module 5 · schedules, arrivals and elapsed time",
    r"""
<h3>1. What these questions test</h3>
<ul>
  <li>Adding and subtracting clock times across hours, AM/PM and midnight.</li>
  <li>Combining statements from different people to find an actual time ("A arrived 20 minutes before B, who was 15 minutes late for a 10:30 meeting").</li>
  <li>Finding the <em>earliest / latest</em> possible time consistent with several clues.</li>
  <li>24-hour conversion: 1:45 PM = 13:45; 12:10 AM = 00:10.</li>
</ul>

<h3>2. Method</h3>
<ol>
  <li>Convert every time to minutes after midnight (or use a timeline).</li>
  <li>Translate each statement into an equation or an interval.</li>
  <li>Intersect the intervals if the clues give ranges.</li>
</ol>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — late arrival</summary>
<p><em>A train was scheduled at 9:40 AM. It arrived 25 minutes late, and Karan reached the station 15 minutes before the train's arrival. When did Karan reach?</em></p>
<p>Train arrived 10:05 → Karan reached <strong>9:50 AM</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — combining statements</summary>
<p><em>Riya remembers the lecture was after 11:00 but before 11:45. Aman remembers it was after 11:30 but before noon. If both are right, when did it start?</em></p>
<p>Intersection: after 11:30 and before 11:45 → <strong>between 11:30 and 11:45</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — crossing midnight</summary>
<p><em>A bus leaves at 10:50 PM and the journey takes 7 hours 25 minutes. Arrival time?</em></p>
<p>10:50 PM + 7:25 = 6:15 AM the next day → <strong>06:15</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — clock that gains</summary>
<p><em>A watch gains 3 minutes every hour. It is set correctly at 8 AM. What is the true time when it shows 2 PM?</em></p>
<p>In each true hour the watch moves 63 minutes. It shows 6 hours = 360 minutes → true time = 360 × 60/63 ≈ 342.86 min = 5 h 42 min 51 s → <strong>about 1:42:51 PM</strong>.</p>
</details>
"""
    + check("A meeting starts at 2:45 PM and runs for 1 hour 50 minutes. When does it end?",
            ["4:25 PM", "4:35 PM", "4:45 PM", "3:35 PM"], "b",
            "2:45 + 1:50 = 4:35 PM.")
))

# ── Module 6 ────────────────────────────────────────────────────────────────

TOPICS.append(topic(
    "Reading Comprehension",
    "Module 6 · read for structure, answer from the passage",
    r"""
<h3>1. Question types</h3>
<table>
  <thead><tr><th>Type</th><th>Asks</th><th>How to answer</th></tr></thead>
  <tbody>
    <tr><td>Main idea / title</td><td>what the whole passage is about</td><td>the option that covers every paragraph — not just one example</td></tr>
    <tr><td>Specific detail</td><td>a fact stated in the text</td><td>locate the line; match meaning, not just words</td></tr>
    <tr><td>Inference</td><td>what must be true though not stated</td><td>choose the option supported by the text with no outside assumptions</td></tr>
    <tr><td>Author's tone / attitude</td><td>critical, optimistic, neutral, sarcastic…</td><td>look at adjectives and qualifiers</td></tr>
    <tr><td>Vocabulary in context</td><td>meaning of a word as used here</td><td>replace the word in the sentence with each option</td></tr>
    <tr><td>Purpose / structure</td><td>why a paragraph or example exists</td><td>its role: evidence, contrast, conclusion</td></tr>
  </tbody>
</table>

<h3>2. Strategy</h3>
<ol>
  <li>Skim the passage once for structure: topic, the author's view, how each paragraph contributes.</li>
  <li>Read the questions, then return to the relevant lines.</li>
  <li>Eliminate options that are <strong>too extreme</strong> ("always", "never", "completely"), <strong>out of scope</strong>, or <strong>true but not answering</strong> the question.</li>
  <li>Never use outside knowledge unless it is a vocabulary question.</li>
</ol>

<h3>3. Practice passage</h3>
<blockquote>
<p>Cities once treated trees as decoration, planting them where space happened to be left over. That view is changing. Studies of urban heat show that streets with continuous tree canopy can be several degrees cooler in summer than bare streets nearby, reducing both heat-related illness and electricity demand for air conditioning. Trees also slow storm-water runoff, easing pressure on drains during heavy rain.</p>
<p>Yet planting alone is not a solution. Saplings placed in narrow pits without enough soil often die within a few years, and the benefits of shade take a decade or more to appear. Planners who count trees planted, rather than trees that survive to maturity, can report impressive numbers while achieving little. The cities making real progress budget for watering, soil and protection long after the planting ceremony ends.</p>
</blockquote>
<details class="solution"><summary>Questions and answers</summary>
<p><strong>1. The main idea is that</strong> (a) trees are only decorative (b) urban trees provide real benefits, but only if they are maintained until maturity (c) cities should stop planting trees (d) air conditioning is expensive.<br>→ <strong>(b)</strong> — it covers both paragraphs.</p>
<p><strong>2. Which is NOT mentioned as a benefit of trees?</strong> (a) cooler streets (b) lower electricity demand (c) reduced storm-water runoff (d) higher property prices.<br>→ <strong>(d)</strong>.</p>
<p><strong>3. It can be inferred that counting trees planted is</strong> (a) the best measure of success (b) a potentially misleading measure (c) required by law (d) impossible.<br>→ <strong>(b)</strong> — "impressive numbers while achieving little".</p>
<p><strong>4. The author's tone is best described as</strong> (a) dismissive (b) cautiously supportive (c) sarcastic (d) indifferent.<br>→ <strong>(b)</strong>.</p>
</details>
"""
))

TOPICS.append(topic(
    "Rearrangement of Jumbled Sentences (Para Jumbles)",
    "Module 6 · find the opener, then follow the links",
    r"""
<h3>1. Clues that fix the order</h3>
<ul>
  <li><strong>Opening sentence</strong> introduces the topic or a person by full name; it does not start with "However", "This", "He", "Therefore".</li>
  <li><strong>Pronouns</strong> (he, she, it, they, this, these) refer back to a noun already introduced.</li>
  <li><strong>Articles</strong>: "a machine" (first mention) comes before "the machine".</li>
  <li><strong>Connectors</strong>: however / but (contrast), therefore / thus (result), moreover / also (addition), for example (illustration), finally (conclusion).</li>
  <li><strong>Chronology</strong>: dates, "first", "then", "later".</li>
  <li><strong>Mandatory pairs</strong>: an idea and its example or explanation usually sit together.</li>
</ul>

<h3>2. Method</h3>
<ol>
  <li>Identify the opener (or eliminate impossible openers).</li>
  <li>Find at least one fixed pair (pronoun → noun, question → answer).</li>
  <li>Check the options containing that pair; only then read the full order once to confirm it flows.</li>
</ol>

<h3>3. Solved example</h3>
<p><strong>P.</strong> This made it the first machine that could be programmed for different tasks.<br>
<strong>Q.</strong> Charles Babbage designed the Analytical Engine in the 1830s.<br>
<strong>R.</strong> Unlike earlier calculators, it was designed to read instructions from punched cards.<br>
<strong>S.</strong> However, it was never fully built during his lifetime.</p>
<details class="solution"><summary>Answer</summary>
<p>Q introduces the person and the machine → opener. R's "it" refers to the Analytical Engine and explains a feature. P's "This" refers to reading instructions from cards → R-P. S contrasts with the achievements ("However") → last.</p>
<p>Order: <strong>Q R P S</strong>.</p>
</details>
"""
    + check("Arrange: P. As a result, many farmers switched to drip irrigation. Q. Groundwater levels in the region fell sharply during the drought. R. The method delivers water directly to the roots and wastes very little. S. Flood irrigation became too expensive to sustain.",
            ["QSPR", "QPSR", "SQPR", "RQSP"], "a",
            "Q sets the problem, S states its consequence, P gives the response (\"As a result\"), and R explains the chosen method.")
))

TOPICS.append(topic(
    "Cloze Test",
    "Module 6 · fill the blanks so the passage reads correctly",
    r"""
<h3>1. What decides the right word</h3>
<ul>
  <li><strong>Grammar</strong>: part of speech (noun/verb/adjective), tense, singular/plural, preposition after the blank.</li>
  <li><strong>Collocation</strong>: words that naturally go together — <em>make</em> a decision, <em>do</em> homework, <em>heavy</em> rain, <em>strong</em> tea, <em>pay</em> attention.</li>
  <li><strong>Logic and tone</strong>: contrast words (but, although) flip the meaning; the blank must fit the passage's overall idea.</li>
  <li><strong>Prepositions</strong>: interested <em>in</em>, capable <em>of</em>, responsible <em>for</em>, aware <em>of</em>, similar <em>to</em>, different <em>from</em>.</li>
</ul>

<h3>2. Method</h3>
<ol>
  <li>Read the whole passage once, ignoring blanks, to get the theme.</li>
  <li>For each blank, predict the type of word before looking at options.</li>
  <li>Eliminate grammatically impossible options first, then choose by meaning.</li>
  <li>Re-read the completed passage.</li>
</ol>

<h3>3. Practice</h3>
<blockquote><p>Regular exercise has a positive (1) ____ on mental health. People who walk for thirty minutes a day (2) ____ lower levels of stress, and they are (3) ____ likely to report problems with sleep. (4) ____ the benefits are well known, many people struggle to make exercise a (5) ____ habit.</p></blockquote>
<table>
  <thead><tr><th>Blank</th><th>Options</th><th>Answer</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>affect / effect / result / cause</td><td><strong>effect</strong></td><td>noun needed; "have an effect on" (affect is usually a verb)</td></tr>
    <tr><td>2</td><td>reports / report / reporting / reported</td><td><strong>report</strong></td><td>plural subject "People", present tense</td></tr>
    <tr><td>3</td><td>more / less / most / least</td><td><strong>less</strong></td><td>positive passage: fewer sleep problems</td></tr>
    <tr><td>4</td><td>Because / Although / Since / Unless</td><td><strong>Although</strong></td><td>contrast between known benefits and struggling</td></tr>
    <tr><td>5</td><td>regular / rare / random / reluctant</td><td><strong>regular</strong></td><td>collocation "regular habit"</td></tr>
  </tbody>
</table>
"""
    + check("Choose the correct word: She is quite capable ____ handling the project on her own.",
            ["to", "for", "of", "in"], "c",
            "The fixed preposition is \"capable of\".")
))

TOPICS.append(topic(
    "Vocabulary — Synonyms & Antonyms, Idioms & Phrases, One-Word Substitution",
    "Module 6 · high-frequency words for placement tests",
    r"""
<h3>1. Synonyms and antonyms</h3>
<table>
  <thead><tr><th>Word</th><th>Meaning</th><th>Synonym</th><th>Antonym</th></tr></thead>
  <tbody>
    <tr><td>Abundant</td><td>plentiful</td><td>ample</td><td>scarce</td></tr>
    <tr><td>Benevolent</td><td>kind, generous</td><td>charitable</td><td>malevolent</td></tr>
    <tr><td>Candid</td><td>honest, frank</td><td>forthright</td><td>evasive</td></tr>
    <tr><td>Diligent</td><td>hard-working</td><td>industrious</td><td>lazy</td></tr>
    <tr><td>Ephemeral</td><td>short-lived</td><td>transient</td><td>permanent</td></tr>
    <tr><td>Frugal</td><td>economical</td><td>thrifty</td><td>extravagant</td></tr>
    <tr><td>Gregarious</td><td>sociable</td><td>outgoing</td><td>reclusive</td></tr>
    <tr><td>Hostile</td><td>unfriendly</td><td>antagonistic</td><td>amicable</td></tr>
    <tr><td>Impeccable</td><td>flawless</td><td>perfect</td><td>faulty</td></tr>
    <tr><td>Lucid</td><td>clear</td><td>intelligible</td><td>obscure</td></tr>
    <tr><td>Meticulous</td><td>very careful</td><td>thorough</td><td>careless</td></tr>
    <tr><td>Obstinate</td><td>stubborn</td><td>adamant</td><td>flexible</td></tr>
    <tr><td>Pragmatic</td><td>practical</td><td>realistic</td><td>idealistic</td></tr>
    <tr><td>Reluctant</td><td>unwilling</td><td>hesitant</td><td>eager</td></tr>
    <tr><td>Scrutinise</td><td>examine closely</td><td>inspect</td><td>overlook</td></tr>
    <tr><td>Tenacious</td><td>persistent</td><td>determined</td><td>irresolute</td></tr>
    <tr><td>Verbose</td><td>using too many words</td><td>wordy</td><td>concise</td></tr>
    <tr><td>Zealous</td><td>enthusiastic</td><td>fervent</td><td>apathetic</td></tr>
  </tbody>
</table>

<h3>2. Idioms and phrases</h3>
<table>
  <thead><tr><th>Idiom</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>A blessing in disguise</td><td>something that seems bad but turns out good</td></tr>
    <tr><td>Beat around the bush</td><td>avoid the main point</td></tr>
    <tr><td>Bite the bullet</td><td>face a difficult situation bravely</td></tr>
    <tr><td>Break the ice</td><td>start a conversation in an awkward situation</td></tr>
    <tr><td>Burn the midnight oil</td><td>work late into the night</td></tr>
    <tr><td>Call it a day</td><td>stop working</td></tr>
    <tr><td>Cost an arm and a leg</td><td>be very expensive</td></tr>
    <tr><td>Cry over spilt milk</td><td>regret something that can't be changed</td></tr>
    <tr><td>Hit the nail on the head</td><td>describe exactly what is right</td></tr>
    <tr><td>In the same boat</td><td>in the same difficult situation</td></tr>
    <tr><td>Once in a blue moon</td><td>very rarely</td></tr>
    <tr><td>Piece of cake</td><td>very easy</td></tr>
    <tr><td>Spill the beans</td><td>reveal a secret</td></tr>
    <tr><td>The ball is in your court</td><td>it is your decision now</td></tr>
    <tr><td>Under the weather</td><td>feeling unwell</td></tr>
    <tr><td>At the eleventh hour</td><td>at the last moment</td></tr>
    <tr><td>Hold one's horses</td><td>wait, be patient</td></tr>
    <tr><td>Turn a deaf ear</td><td>ignore a request</td></tr>
  </tbody>
</table>

<h3>3. One-word substitution</h3>
<table>
  <thead><tr><th>Description</th><th>One word</th></tr></thead>
  <tbody>
    <tr><td>One who knows everything</td><td>Omniscient</td></tr>
    <tr><td>One who is present everywhere</td><td>Omnipresent</td></tr>
    <tr><td>A person who does not believe in God</td><td>Atheist</td></tr>
    <tr><td>One who is not sure whether God exists</td><td>Agnostic</td></tr>
    <tr><td>A speech made without preparation</td><td>Extempore</td></tr>
    <tr><td>Something that cannot be read</td><td>Illegible</td></tr>
    <tr><td>Something that cannot be corrected</td><td>Incorrigible</td></tr>
    <tr><td>A person who loves mankind</td><td>Philanthropist</td></tr>
    <tr><td>A person who hates mankind</td><td>Misanthrope</td></tr>
    <tr><td>Fear of heights</td><td>Acrophobia</td></tr>
    <tr><td>A government by the people</td><td>Democracy</td></tr>
    <tr><td>Rule by a single absolute ruler</td><td>Autocracy</td></tr>
    <tr><td>A handwritten book or document</td><td>Manuscript</td></tr>
    <tr><td>A life history written by oneself</td><td>Autobiography</td></tr>
    <tr><td>One who eats only plants</td><td>Herbivore</td></tr>
    <tr><td>A place where bees are kept</td><td>Apiary</td></tr>
    <tr><td>Study of ancient remains</td><td>Archaeology</td></tr>
    <tr><td>That which cannot be avoided</td><td>Inevitable</td></tr>
    <tr><td>A person who speaks many languages</td><td>Polyglot</td></tr>
    <tr><td>Killing of one's own brother</td><td>Fratricide</td></tr>
  </tbody>
</table>

<div class="callout callout-key"><strong>Learning tip:</strong> learn roots — <em>omni</em> (all), <em>phil</em> (love), <em>mis</em> (hate), <em>poly</em> (many), <em>cide</em> (killing), <em>phobia</em> (fear), <em>cracy</em> (rule), <em>graph</em> (write), <em>logy</em> (study). One root unlocks dozens of words.</div>
"""
    + check("Choose the antonym of FRUGAL.",
            ["Thrifty", "Extravagant", "Careful", "Simple"], "b",
            "Frugal means economical; its opposite is extravagant.")
    + check("\"To burn the midnight oil\" means:",
            ["to waste resources", "to work late into the night", "to start a fire", "to celebrate"], "b",
            "It describes studying or working late at night.")
))

TOPICS.append(topic(
    "Error Detection & Sentence Improvement — Nouns, Articles, Verbs & Subject–Verb Agreement",
    "Module 6 · the grammar rules that appear most often",
    r"""
<h3>1. Subject–verb agreement</h3>
<table>
  <thead><tr><th>Rule</th><th>Correct example</th></tr></thead>
  <tbody>
    <tr><td>Singular subject → singular verb</td><td>The <strong>list</strong> of items <strong>is</strong> on the table.</td></tr>
    <tr><td>Words between subject and verb don't change it</td><td>The <strong>quality</strong> of the apples <strong>was</strong> poor.</td></tr>
    <tr><td>Each, every, either, neither, everyone → singular</td><td><strong>Each</strong> of the students <strong>has</strong> a laptop.</td></tr>
    <tr><td>"Along with / as well as / together with" → verb follows the first subject</td><td>The <strong>captain</strong>, along with his players, <strong>was</strong> honoured.</td></tr>
    <tr><td>Either…or / neither…nor → verb agrees with the nearer subject</td><td>Neither the teacher nor the <strong>students were</strong> present.</td></tr>
    <tr><td>"A number of" → plural; "the number of" → singular</td><td>A number of books <strong>are</strong> missing. The number of books <strong>is</strong> small.</td></tr>
    <tr><td>Collective noun acting as one unit → singular</td><td>The <strong>committee has</strong> made its decision.</td></tr>
    <tr><td>Amount / distance / time as a unit → singular</td><td><strong>Ten kilometres is</strong> a long walk.</td></tr>
    <tr><td>"One of the + plural noun + who/that" → plural verb in the clause</td><td>She is one of the students who <strong>have</strong> won.</td></tr>
  </tbody>
</table>

<h3>2. Nouns</h3>
<ul>
  <li><strong>Uncountable nouns</strong> have no plural and take singular verbs: information, advice, furniture, luggage, equipment, news, scenery, machinery. ✘ "informations", ✔ "pieces of advice".</li>
  <li>Always plural: scissors, trousers, spectacles, cattle, police, people.</li>
  <li>Same form in singular and plural: sheep, deer, series, species.</li>
  <li>Words like "mathematics", "physics", "news" look plural but take singular verbs.</li>
  <li>After a number + hyphen, the noun stays singular: a <strong>five-year</strong> plan, a <strong>ten-rupee</strong> note.</li>
</ul>

<h3>3. Articles</h3>
<ul>
  <li><strong>a</strong> before consonant <em>sounds</em>, <strong>an</strong> before vowel <em>sounds</em>: a university, a one-way street, an hour, an MBA, an honest man.</li>
  <li><strong>the</strong> for something specific or unique: the sun, the Ganga, the Himalayas, the Indian Ocean, the best student, the first day.</li>
  <li>No article with most names of people, cities, countries, languages, subjects, meals, and general plural or uncountable nouns: "Water is essential", "She speaks Hindi".</li>
  <li>"The" with country names that include a common noun or are plural: the USA, the UK, the Netherlands.</li>
</ul>

<h3>4. Verbs and tenses</h3>
<ul>
  <li>Don't use continuous forms with stative verbs: ✘ "I am knowing him" → ✔ "I know him" (know, believe, own, seem, belong, understand).</li>
  <li><strong>Since</strong> + point in time, <strong>for</strong> + period, with perfect tense: "I have lived here since 2020 / for six years."</li>
  <li>Past time marker (yesterday, last year, ago) → simple past, not present perfect: ✘ "I have seen him yesterday."</li>
  <li>After "if" in the first conditional use present: "If it <strong>rains</strong>, we will stay home" (not "will rain").</li>
  <li>Sequence of tenses: a past reporting verb usually takes past in the reported clause: "He said that he <strong>was</strong> tired."</li>
  <li>"Hardly / scarcely … when", "No sooner … than": "No sooner had he arrived <strong>than</strong> it began to rain."</li>
</ul>

<h3>5. Practice — find the error</h3>
<details class="solution"><summary>1. Each of the players (A) / have been given (B) / a new kit (C) / no error (D)</summary>
<p><strong>(B)</strong> → "has been given" — "Each" is singular.</p>
</details>
<details class="solution"><summary>2. He gave me (A) / many useful informations (B) / about the course (C) / no error (D)</summary>
<p><strong>(B)</strong> → "much useful information" — uncountable noun.</p>
</details>
<details class="solution"><summary>3. She has been working (A) / in this company (B) / since five years (C) / no error (D)</summary>
<p><strong>(C)</strong> → "for five years" — a period of time.</p>
</details>
<details class="solution"><summary>4. He is (A) / an university professor (B) / in Chandigarh (C) / no error (D)</summary>
<p><strong>(B)</strong> → "a university" — "university" begins with a consonant "yu" sound.</p>
</details>
<details class="solution"><summary>5. The teacher, along with the students, (A) / were (B) / present at the event (C) / no error (D)</summary>
<p><strong>(B)</strong> → "was" — the verb agrees with "The teacher".</p>
</details>

<h3>6. Sentence improvement</h3>
<details class="solution"><summary>"No sooner did he reach the station <u>when the train left</u>."</summary>
<p>→ "<strong>than the train left</strong>" — "no sooner" pairs with "than".</p>
</details>
<details class="solution"><summary>"If he <u>will work</u> hard, he will pass."</summary>
<p>→ "<strong>works</strong>" — present tense in the if-clause.</p>
</details>
"""
    + check("Find the correct sentence.",
            ["The news are very encouraging.", "The news is very encouraging.", "The newses are very encouraging.", "A news is very encouraging."], "b",
            "\"News\" is an uncountable noun that takes a singular verb.")
    + check("Choose the correct article: She waited for ____ hour at the station.",
            ["a", "an", "the", "no article"], "b",
            "\"Hour\" begins with a vowel sound (silent h), so it takes \"an\".")
))
