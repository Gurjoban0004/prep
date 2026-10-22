"""Numerical Aptitude & Logical Reasoning-I (25UNI0110) — ST-2: Module 3 (Calculation, Pattern & Basic Finance) and Module 4 (Applied Arithmetic & Sequences)."""

from subjects.helpers import topic, check

TOPICS = []

# ── Module 3 ────────────────────────────────────────────────────────────────

TOPICS.append(topic(
    "Percentage",
    "Module 3 · the language of every finance question",
    r"""
<h3>1. Basics</h3>
<ul>
  <li>x% of y = xy/100 &nbsp;·&nbsp; x% of y = y% of x (8% of 50 = 50% of 8 = 4)</li>
  <li>A is what % of B → (A/B) × 100</li>
  <li>% change = (change ÷ original) × 100</li>
  <li>Increase by r% → multiply by (1 + r/100); decrease by r% → multiply by (1 − r/100)</li>
</ul>

<h3>2. Fraction–percentage table (memorise)</h3>
<table>
  <tbody>
    <tr><td>1/2 = 50%</td><td>1/3 = 33.33%</td><td>1/4 = 25%</td><td>1/5 = 20%</td><td>1/6 = 16.67%</td></tr>
    <tr><td>1/7 = 14.28%</td><td>1/8 = 12.5%</td><td>1/9 = 11.11%</td><td>1/10 = 10%</td><td>1/11 = 9.09%</td></tr>
    <tr><td>1/12 = 8.33%</td><td>1/15 = 6.67%</td><td>1/16 = 6.25%</td><td>1/20 = 5%</td><td>3/8 = 37.5%</td></tr>
  </tbody>
</table>

<h3>3. Key shortcuts</h3>
<table>
  <thead><tr><th>Situation</th><th>Formula</th></tr></thead>
  <tbody>
    <tr><td>Successive changes a% and b%</td><td>net = a + b + ab/100 (use − for decreases)</td></tr>
    <tr><td>Price rises r% — cut consumption to keep spending same</td><td>r/(100 + r) × 100 %</td></tr>
    <tr><td>Price falls r% — consumption can rise by</td><td>r/(100 − r) × 100 %</td></tr>
    <tr><td>A is r% more than B → B is less than A by</td><td>r/(100 + r) × 100 %</td></tr>
    <tr><td>A is r% less than B → B is more than A by</td><td>r/(100 − r) × 100 %</td></tr>
    <tr><td>Population P grows r% yearly for n years</td><td>P(1 + r/100)<sup>n</sup></td></tr>
  </tbody>
</table>

<h3>4. Solved examples</h3>
<details class="solution"><summary>Example 1 — successive change</summary>
<p><em>A price is increased by 20% and then decreased by 20%. Net change?</em></p>
<p>20 − 20 + (20 × −20)/100 = <strong>−4%</strong> (a 4% decrease).</p>
</details>
<details class="solution"><summary>Example 2 — consumption</summary>
<p><em>Petrol price rises by 25%. By how much should consumption fall to keep expenditure unchanged?</em></p>
<p>25/125 × 100 = <strong>20%</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — comparison</summary>
<p><em>A's salary is 25% more than B's. By what percent is B's salary less than A's?</em></p>
<p>25/125 × 100 = <strong>20%</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — exams</summary>
<p><em>A candidate scoring 30% fails by 30 marks; another scoring 45% gets 30 marks more than the pass mark. Find the maximum marks and pass mark.</em></p>
<p>45% − 30% = 15% corresponds to 30 + 30 = 60 marks → maximum = 400. Pass mark = 30% of 400 + 30 = <strong>150</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — population</summary>
<p><em>A town of 50,000 grows 10% in year 1 and falls 10% in year 2. Population after 2 years?</em></p>
<p>50,000 × 1.1 × 0.9 = <strong>49,500</strong>.</p>
</details>
<details class="solution"><summary>Example 6 — election</summary>
<p><em>In a two-candidate election, the winner gets 58% of valid votes and wins by 2,720 votes. Total valid votes?</em></p>
<p>Margin = 58% − 42% = 16% → 16% = 2,720 → total = <strong>17,000</strong>.</p>
</details>
"""
    + check("If 40% of a number is 96, what is 25% of that number?",
            ["60", "64", "48", "240"], "a",
            "The number is 96 / 0.4 = 240; 25% of 240 = 60.")
    + check("A number is increased by 10% and then by 20%. The total increase is:",
            ["30%", "32%", "28%", "31%"], "b",
            "10 + 20 + (10 × 20)/100 = 32%.")
))

TOPICS.append(topic(
    "Alphabet Test",
    "Module 3 · positions, dictionary order and letter rearrangements",
    r"""
<h3>1. Positions</h3>
<table>
  <tbody>
    <tr><td>A 1</td><td>B 2</td><td>C 3</td><td>D 4</td><td><strong>E 5</strong></td><td>F 6</td><td>G 7</td><td>H 8</td><td>I 9</td><td><strong>J 10</strong></td><td>K 11</td><td>L 12</td><td>M 13</td></tr>
    <tr><td>N 14</td><td><strong>O 15</strong></td><td>P 16</td><td>Q 17</td><td>R 18</td><td>S 19</td><td><strong>T 20</strong></td><td>U 21</td><td>V 22</td><td>W 23</td><td>X 24</td><td><strong>Y 25</strong></td><td>Z 26</td></tr>
  </tbody>
</table>
<ul>
  <li><strong>EJOTY</strong> anchors: 5, 10, 15, 20, 25.</li>
  <li>Position from the end = 27 − position from the start (M is 13th from left, 14th from right).</li>
  <li>Opposite letters: A–Z, B–Y, C–X, D–W, E–V, F–U, G–T, H–S, I–R, J–Q, K–P, L–O, M–N (sum 27).</li>
  <li>The 14th letter from the left is N; the 10th letter to the right of the 8th letter from the left is position 18 = R.</li>
</ul>

<h3>2. Question types</h3>
<ul>
  <li><strong>Dictionary order</strong> — compare letter by letter.</li>
  <li><strong>Letter-position puzzles</strong> — "which letter is 7th to the left of the 16th from the right?"</li>
  <li><strong>Word formation</strong> — can a word be formed from the letters of another word (each letter used as many times as it appears)?</li>
  <li><strong>Same-distance pairs</strong> — count pairs of letters in a word that have as many letters between them in the word as in the alphabet.</li>
  <li><strong>Rearranging letters</strong> — first, third and fifth letters of a word form a meaningful word, etc.</li>
</ul>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — position from the right</summary>
<p><em>Which letter is 7th to the left of the 16th letter from the right in the English alphabet?</em></p>
<p>16th from the right = 27 − 16 = 11th from the left (K). 7 to its left → 11 − 7 = 4 → <strong>D</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — dictionary order</summary>
<p><em>Arrange in dictionary order: Pleasure, Plenty, Player, Pledge, Plaster.</em></p>
<p>Plaster, Player, Pleasure, Pledge, Plenty → third is <strong>Pleasure</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — letter pairs</summary>
<p><em>How many pairs of letters in "DEPTH" have as many letters between them in the word as in the alphabet?</em></p>
<p>D(4) E(5) P(16) T(20) H(8). Compare the gap in the word with the gap in the alphabet for every pair:</p>
<ul>
  <li>D–E: adjacent in both ✔</li>
  <li>D–H: 3 letters between in the word (E, P, T) and in the alphabet (E, F, G) ✔</li>
  <li>E–H: 2 letters between in the word (P, T) and in the alphabet (F, G) ✔</li>
  <li>every other pair fails (e.g. P–T are adjacent in the word but 3 apart in the alphabet)</li>
</ul>
<p>Answer: <strong>3 pairs</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — word formation</summary>
<p><em>Which word can't be formed from "EXAMINATION"?</em> Options: MOAN, TEAM, MINT, <strong>MOTHER</strong> (no H or R).</p>
</details>
"""
    + check("If the English alphabet is written in reverse order, which letter is 8th from the left?",
            ["S", "R", "T", "H"], "a",
            "Reversed, the 8th letter from the left is the 8th from the end of the normal order: 27 − 8 = 19 → S.")
))

TOPICS.append(topic(
    "Mathematical Operations (Symbol Substitution & BODMAS)",
    "Module 3 · swap symbols, then compute correctly",
    r"""
<h3>1. BODMAS / order of operations</h3>
<p><strong>B</strong>rackets → <strong>O</strong>rders (powers, roots, "of") → <strong>D</strong>ivision and <strong>M</strong>ultiplication (left to right) → <strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right).</p>
<p>Example: 18 ÷ 3 × 2 + 4 − 1 = 6 × 2 + 4 − 1 = 12 + 3 = <strong>15</strong>.</p>

<h3>2. Question types</h3>
<ul>
  <li><strong>Symbol substitution:</strong> "+ means ×, − means ÷, × means −, ÷ means +". Rewrite the expression fully, then apply BODMAS.</li>
  <li><strong>Interchange of signs / numbers:</strong> "if + and × are interchanged and 4 and 6 are interchanged, which equation is correct?"</li>
  <li><strong>Balancing:</strong> choose the pair of signs that makes an equation true.</li>
  <li><strong>Deriving the operation:</strong> 5 ⊕ 3 = 34, 6 ⊕ 2 = 40 → a² + b².</li>
</ul>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — substitution</summary>
<p><em>If + means ×, − means ÷, × means −, and ÷ means +, find 16 − 4 + 5 ÷ 20 × 8.</em></p>
<p>Rewrite: 16 ÷ 4 × 5 + 20 − 8 = 4 × 5 + 20 − 8 = 20 + 20 − 8 = <strong>32</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — interchange</summary>
<p><em>If ÷ and − are interchanged, which is correct?</em> (a) 8 ÷ 2 − 4 = 10 &nbsp; (b) 12 − 3 ÷ 2 = 2</p>
<p>(a) becomes 8 − 2 ÷ 4 = 8 − 0.5 = 7.5 ✘. (b) becomes 12 ÷ 3 − 2 = 4 − 2 = 2 ✔ → <strong>(b)</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — hidden operation</summary>
<p><em>If 3 ∗ 4 = 25, 5 ∗ 12 = 169, then 6 ∗ 8 = ?</em></p>
<p>a² + b²: 9 + 16 = 25, 25 + 144 = 169 → 36 + 64 = <strong>100</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — balancing signs</summary>
<p><em>Which signs replace ∗ in 9 ∗ 3 ∗ 4 ∗ 12 = 0?</em></p>
<p>Try ×, −, ... : 9 × 3 − 4 × 12 = 27 − 48 ✘. Try ÷, ×, −: 9 ÷ 3 × 4 − 12 = 3 × 4 − 12 = <strong>0 ✔</strong>.</p>
</details>
"""
    + check("If × means +, + means ÷, − means × and ÷ means −, then 8 × 7 − 8 + 40 ÷ 2 = ?",
            ["44", "7.4", "10.4", "15.4"], "b",
            "Rewrite as 8 + 7 × 8 ÷ 40 − 2. BODMAS: 7 × 8 = 56, 56 ÷ 40 = 1.4, then 8 + 1.4 − 2 = 7.4.")
))

TOPICS.append(topic(
    "Coding–Decoding",
    "Module 3 · crack the rule, apply it to the new word",
    r"""
<h3>1. Common coding patterns</h3>
<table>
  <thead><tr><th>Pattern</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Letter shift (+n / −n)</td><td>CAT → DBU (+1)</td></tr>
    <tr><td>Alternating shifts</td><td>MIND → NHOC (+1, −1, +1, −1)</td></tr>
    <tr><td>Reverse the word</td><td>SMART → TRAMS</td></tr>
    <tr><td>Reverse then shift</td><td>PEN → NEP → OFQ</td></tr>
    <tr><td>Opposite letters (sum 27)</td><td>ABC → ZYX</td></tr>
    <tr><td>Letters → positions</td><td>BAD → 2 1 4</td></tr>
    <tr><td>Position sum / product</td><td>CAB → 3 + 1 + 2 = 6</td></tr>
    <tr><td>Square of positions</td><td>BE → 4 25</td></tr>
    <tr><td>Swapping halves / pairs</td><td>DOCTOR → CODROT (each 3-letter half reversed)</td></tr>
    <tr><td>Word substitution</td><td>"sky" is called "sea", "sea" is called "grass"… → answer in the code name</td></tr>
    <tr><td>Sentence coding</td><td>common words across sentences share common codes</td></tr>
  </tbody>
</table>

<h3>2. Method</h3>
<ol>
  <li>Write positions of the original and coded letters under each other.</li>
  <li>Find the difference letter by letter; check for reversal first if differences look random.</li>
  <li>Verify the rule on every letter before applying it.</li>
</ol>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — shift</summary>
<p><em>If TIGER is coded as VKIGT, how is HORSE coded?</em></p>
<p>T→V (+2), I→K (+2), G→I (+2), E→G (+2), R→T (+2) → each +2 → HORSE → <strong>JQTUG</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — reverse and shift</summary>
<p><em>If MONKEY is coded as XDJMNL, how is TIGER coded?</em></p>
<p>Reverse MONKEY → YEKNOM; each letter −1 → XDJMNL ✔. TIGER reversed → REGIT; −1 → <strong>QDFHS</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — numbers</summary>
<p><em>If CAB = 6 and FED = 15, then HIDE = ?</em></p>
<p>Sum of positions: 3+1+2 = 6, 6+5+4 = 15 → 8 + 9 + 4 + 5 = <strong>26</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — sentence coding</summary>
<p><em>"pit na sa" = "you are good", "na ho ka" = "good and bad", "ka da ro" = "bad is ugly". What is the code for "and"?</em></p>
<p>"good" is the only word common to sentences 1 and 2, and "na" is their only common code → good = na.
"bad" is common to sentences 2 and 3, and "ka" is their only common code → bad = ka.
Sentence 2 is good (na) + and + bad (ka), so and = <strong>ho</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — word substitution</summary>
<p><em>If "water" is called "air", "air" is called "fire", "fire" is called "sky", what do we breathe?</em></p>
<p>We breathe air, and air is called <strong>"fire"</strong>.</p>
</details>
"""
    + check("If GARDEN is coded as FZQCDM, how is FLOWER coded?",
            ["EKNVDQ", "GMPXFS", "EKNVDS", "EMNVDQ"], "a",
            "Each letter moves back by 1: F→E, L→K, O→N, W→V, E→D, R→Q.")
))

TOPICS.append(topic(
    "Simple Interest",
    "Module 3 · interest only on the original principal",
    r"""
<h3>1. Formulas</h3>
<div class="formula">SI = P × R × T / 100 &nbsp;&nbsp;&nbsp; Amount A = P + SI = P(1 + RT/100)</div>
<ul>
  <li>P = 100 × SI / (R × T), &nbsp; R = 100 × SI / (P × T), &nbsp; T = 100 × SI / (P × R)</li>
  <li>T must match R's period: 6 months at 12% p.a. → T = 1/2 year.</li>
  <li>Money becomes <strong>n times</strong> in T years at SI → R × T = 100(n − 1).</li>
  <li>SI is the same every year: amount grows in an arithmetic progression.</li>
</ul>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — basic</summary>
<p><em>SI on ₹12,500 at 8% p.a. for 3 years.</em> 12,500 × 8 × 3 / 100 = <strong>₹3,000</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — find rate from two amounts</summary>
<p><em>A sum amounts to ₹9,800 in 5 years and ₹12,005 in 8 years at SI. Find the rate and principal.</em></p>
<p>SI for 3 years = 2,205 → per year 735 → SI for 5 years = 3,675 → P = 9,800 − 3,675 = ₹6,125. Rate = 735/6,125 × 100 = <strong>12%</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — doubling</summary>
<p><em>A sum doubles in 8 years at SI. In how many years will it become 4 times?</em></p>
<p>R × 8 = 100 → R = 12.5%. For 4 times: 12.5 × T = 300 → <strong>T = 24 years</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — split investment</summary>
<p><em>₹10,000 is split into two parts at 6% and 9% SI. Total yearly interest is ₹780. Amount at 9%?</em></p>
<p>Alligation on rates: average rate = 7.8% → (9 − 7.8) : (7.8 − 6) = 1.2 : 1.8 = 2 : 3 (6% : 9%) → 9% part = 3/5 × 10,000 = <strong>₹6,000</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — months</summary>
<p><em>SI on ₹7,300 at 5% p.a. from 11 March to 4 August of the same year (not counting the first day).</em></p>
<p>Days: March 20 + April 30 + May 31 + June 30 + July 31 + August 4 = 146 days = 146/365 = 0.4 year → SI = 7,300 × 5 × 0.4 / 100 = <strong>₹146</strong>.</p>
</details>
"""
    + check("At what rate of simple interest will ₹2,500 amount to ₹3,250 in 5 years?",
            ["5%", "6%", "7.5%", "8%"], "b",
            "SI = 750 = 2500 × R × 5 / 100 → R = 6%.")
))

# ── Module 4 ────────────────────────────────────────────────────────────────

TOPICS.append(topic(
    "Compound Interest",
    "Module 4 · interest on interest",
    r"""
<h3>1. Formulas</h3>
<div class="formula">A = P (1 + R/100)<sup>n</sup> &nbsp;&nbsp;&nbsp; CI = A − P</div>
<table>
  <thead><tr><th>Compounding</th><th>Rate per period</th><th>Periods</th></tr></thead>
  <tbody>
    <tr><td>Annually</td><td>R</td><td>n</td></tr>
    <tr><td>Half-yearly</td><td>R/2</td><td>2n</td></tr>
    <tr><td>Quarterly</td><td>R/4</td><td>4n</td></tr>
  </tbody>
</table>
<ul>
  <li>Different rates each year: A = P(1 + R₁/100)(1 + R₂/100)(1 + R₃/100).</li>
  <li>Fractional years (2¾ years at R%): A = P(1 + R/100)² × (1 + (3/4)R/100).</li>
  <li>Money becomes x times in n years → it becomes x<sup>k</sup> times in kn years.</li>
</ul>

<h3>2. CI − SI shortcuts</h3>
<div class="formula">2 years: CI − SI = P (R/100)² &nbsp;&nbsp;&nbsp; 3 years: CI − SI = P (R/100)² (3 + R/100)</div>

<h3>3. Year-by-year percentage method (fast for 2–3 years)</h3>
<p>At 10%: year 1 interest = 10% of P; year 2 = 10% of P + 10% of the year-1 interest → 2 years total = 21% of P; 3 years = 33.1% of P.</p>
<table>
  <thead><tr><th>Rate</th><th>2-year CI (% of P)</th><th>3-year CI (% of P)</th></tr></thead>
  <tbody>
    <tr><td>5%</td><td>10.25%</td><td>15.7625%</td></tr>
    <tr><td>10%</td><td>21%</td><td>33.1%</td></tr>
    <tr><td>20%</td><td>44%</td><td>72.8%</td></tr>
  </tbody>
</table>

<h3>4. Solved examples</h3>
<details class="solution"><summary>Example 1 — basic</summary>
<p><em>CI on ₹10,000 at 10% p.a. for 2 years.</em> 10,000 × 1.21 = 12,100 → CI = <strong>₹2,100</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — half-yearly</summary>
<p><em>CI on ₹8,000 at 10% p.a. for 1 year, compounded half-yearly.</em></p>
<p>Rate 5% for 2 periods → 8,000 × 1.05² = 8,000 × 1.1025 = 8,820 → CI = <strong>₹820</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — difference</summary>
<p><em>The difference between CI and SI on a sum for 2 years at 5% is ₹25. Find the sum.</em></p>
<p>P × (0.05)² = 25 → P × 0.0025 = 25 → <strong>P = ₹10,000</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — find the rate</summary>
<p><em>₹6,250 amounts to ₹7,290 in 2 years at CI. Rate?</em></p>
<p>7,290 / 6,250 = 1.1664 = 1.08² → <strong>8%</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — times growth</summary>
<p><em>A sum becomes 3 times in 4 years at CI. In how many years will it become 27 times?</em></p>
<p>27 = 3³ → 3 × 4 = <strong>12 years</strong>.</p>
</details>
<details class="solution"><summary>Example 6 — depreciation</summary>
<p><em>A machine worth ₹50,000 depreciates 20% per year. Value after 2 years?</em> 50,000 × 0.8² = <strong>₹32,000</strong>.</p>
</details>
"""
    + check("What is the compound interest on ₹5,000 at 20% p.a. for 2 years?",
            ["₹2,000", "₹2,200", "₹2,400", "₹2,100"], "b",
            "5,000 × 1.44 = 7,200 → CI = ₹2,200 (44% of the principal).")
))

TOPICS.append(topic(
    "Profit & Loss",
    "Module 4 · cost price, selling price and percentages on CP",
    r"""
<h3>1. Definitions</h3>
<ul>
  <li><strong>CP</strong> cost price, <strong>SP</strong> selling price.</li>
  <li>Profit = SP − CP; Loss = CP − SP.</li>
  <li><strong>Profit% and loss% are always on CP</strong> (unless stated otherwise).</li>
  <li>SP = CP × (100 + profit%)/100 &nbsp; · &nbsp; SP = CP × (100 − loss%)/100</li>
  <li>CP = SP × 100/(100 + profit%)</li>
</ul>

<h3>2. Shortcuts</h3>
<table>
  <thead><tr><th>Situation</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td>Two items sold at the same SP, one at x% profit and one at x% loss</td><td>always a <strong>loss of x²/100 %</strong></td></tr>
    <tr><td>Dishonest dealer uses a false weight of w g instead of 1000 g (selling at CP)</td><td>profit% = (1000 − w)/w × 100</td></tr>
    <tr><td>Cost of x articles = selling price of y articles</td><td>profit% = (x − y)/y × 100</td></tr>
    <tr><td>Successive profits / markups</td><td>use a + b + ab/100</td></tr>
  </tbody>
</table>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — basic</summary>
<p><em>A bicycle bought for ₹4,500 is sold at a 12% profit. SP?</em> 4,500 × 1.12 = <strong>₹5,040</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — same SP, x% gain and loss</summary>
<p><em>Two phones are each sold for ₹9,900, one at 10% profit and the other at 10% loss. Overall result?</em></p>
<p>Loss of 10²/100 = <strong>1%</strong>. (CPs 9,000 and 11,000; total CP 20,000, SP 19,800 → loss ₹200 = 1%.)</p>
</details>
<details class="solution"><summary>Example 3 — false weight</summary>
<p><em>A shopkeeper claims to sell at cost price but uses a 900 g weight for 1 kg. Profit%?</em></p>
<p>(1000 − 900)/900 × 100 = <strong>11.11%</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — articles</summary>
<p><em>The cost price of 20 articles equals the selling price of 16 articles. Profit%?</em></p>
<p>(20 − 16)/16 × 100 = <strong>25%</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — find CP</summary>
<p><em>By selling a watch for ₹1,440, a man loses 10%. At what price should he sell to gain 10%?</em></p>
<p>CP = 1,440/0.9 = 1,600 → SP for 10% gain = <strong>₹1,760</strong>.</p>
</details>
<details class="solution"><summary>Example 6 — profit from two sale prices</summary>
<p><em>Selling at ₹840 gives a loss equal to the profit when selling at ₹960. CP?</em></p>
<p>CP is midway: (840 + 960)/2 = <strong>₹900</strong>.</p>
</details>
"""
    + check("An article is sold for ₹450 at a profit of 25%. What was its cost price?",
            ["₹337.50", "₹360", "₹350", "₹375"], "b",
            "CP = 450 × 100/125 = ₹360.")
))

TOPICS.append(topic(
    "Discount",
    "Module 4 · marked price, successive discounts and markup",
    r"""
<h3>1. Terms</h3>
<ul>
  <li><strong>Marked price (MP / list price)</strong> — printed price.</li>
  <li><strong>Discount</strong> is always calculated on the <strong>MP</strong>. SP = MP − discount = MP × (100 − d)/100.</li>
  <li><strong>Markup</strong> is on CP: MP = CP × (100 + m)/100.</li>
</ul>

<h3>2. Key relations</h3>
<table>
  <tbody>
    <tr><td>Successive discounts a% and b%</td><td>single equivalent = a + b − ab/100</td></tr>
    <tr><td>Markup m%, discount d%</td><td>profit% = m − d − md/100</td></tr>
    <tr><td>MP / CP ratio for desired profit p% after discount d%</td><td>MP/CP = (100 + p)/(100 − d)</td></tr>
    <tr><td>"Buy x get y free"</td><td>discount% = y/(x + y) × 100</td></tr>
  </tbody>
</table>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — successive discounts</summary>
<p><em>Successive discounts of 20% and 10% equal what single discount?</em> 20 + 10 − 2 = <strong>28%</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — SP after discounts</summary>
<p><em>MP ₹2,000 with discounts of 10% and 5%. SP?</em> 2,000 × 0.9 × 0.95 = <strong>₹1,710</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — markup and discount</summary>
<p><em>A trader marks goods 40% above CP and gives a 25% discount. Profit%?</em> 40 − 25 − 10 = <strong>5%</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — how much to mark</summary>
<p><em>CP ₹800. The shopkeeper wants 20% profit after a 20% discount. Marked price?</em></p>
<p>MP = 800 × 120/80 = <strong>₹1,200</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — offer</summary>
<p><em>"Buy 3, get 1 free" is equivalent to a discount of?</em> 1/4 × 100 = <strong>25%</strong>.</p>
</details>
"""
    + check("A jacket marked ₹2,500 is sold for ₹2,125. The discount percentage is:",
            ["12%", "15%", "17.6%", "18%"], "b",
            "Discount = 375; 375/2,500 × 100 = 15%.")
))

TOPICS.append(topic(
    "Number Sequences — Find the Missing or Wrong Term",
    "Module 4 · the difference table and other patterns",
    r"""
<h3>1. Check patterns in this order</h3>
<ol>
  <li><strong>Differences</strong> (first, then second differences)</li>
  <li><strong>Ratios</strong> (×2, ×3, ×1.5, alternating × and +)</li>
  <li><strong>Squares / cubes</strong> ± something (n², n² + 1, n³ − 1)</li>
  <li><strong>Primes</strong> and their products</li>
  <li><strong>Mixed operations</strong>: ×2 + 1, ×3 − 2, ×1 + 1, ×2 + 2, ×3 + 3…</li>
  <li><strong>Two interleaved series</strong> (odd and even positions)</li>
  <li><strong>Sum of previous terms</strong> (Fibonacci-like)</li>
</ol>

<h3>2. Solved examples</h3>
<details class="solution"><summary>Example 1 — second difference</summary>
<p><strong>2, 5, 10, 17, 26, ?</strong> — differences 3, 5, 7, 9 → next 11 → <strong>37</strong> (also n² + 1).</p>
</details>
<details class="solution"><summary>Example 2 — mixed operation</summary>
<p><strong>3, 7, 15, 31, 63, ?</strong> — ×2 + 1 → <strong>127</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — growing multiplier</summary>
<p><strong>5, 6, 14, 45, 184, ?</strong> — ×1 + 1, ×2 + 2, ×3 + 3, ×4 + 4 → 184 × 5 + 5 = <strong>925</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — interleaved</summary>
<p><strong>1, 4, 3, 8, 5, 12, 7, ?</strong> — odd positions 1, 3, 5, 7; even positions 4, 8, 12 → <strong>16</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — cubes</summary>
<p><strong>0, 7, 26, 63, 124, ?</strong> — n³ − 1 for n = 1…5 → 6³ − 1 = <strong>215</strong>.</p>
</details>
<details class="solution"><summary>Example 6 — wrong term</summary>
<p><strong>10, 14, 28, 32, 64, 68, 132</strong> — pattern +4, ×2, +4, ×2, +4, ×2 → after 68 should come 136 → <strong>132 is wrong</strong>.</p>
</details>
"""
    + check("Find the next term: 1, 2, 6, 24, 120, ?",
            ["600", "720", "240", "840"], "b",
            "×2, ×3, ×4, ×5, so ×6 gives 720 (factorials).")
    + check("Find the next term: 2, 3, 5, 8, 13, 21, ?",
            ["29", "34", "32", "35"], "b",
            "Each term is the sum of the previous two: 13 + 21 = 34.")
))

TOPICS.append(topic(
    "Series — Letter, Alphanumeric & Continuous Pattern Series",
    "Module 4 · the same ideas with letters",
    r"""
<h3>1. Letter series</h3>
<p>Convert letters to positions, then treat it like a number series.</p>
<details class="solution"><summary>Examples</summary>
<p><strong>1.</strong> B, E, H, K, ? → 2, 5, 8, 11 (+3) → 14 = <strong>N</strong>.</p>
<p><strong>2.</strong> Z, X, U, Q, ? → 26, 24, 21, 17 (−2, −3, −4) → 17 − 5 = 12 = <strong>L</strong>.</p>
<p><strong>3.</strong> AZ, BY, CX, ? → first letter +1, second −1 → <strong>DW</strong>.</p>
<p><strong>4.</strong> DKM, FJP, HIS, ? → first +2 (D F H J), second −1 (K J I H), third +3 (M P S V) → <strong>JHV</strong>.</p>
</details>

<h3>2. Alphanumeric series</h3>
<details class="solution"><summary>Examples</summary>
<p><strong>5.</strong> A2, C4, E6, G8, ? → letters +2, numbers +2 → <strong>I10</strong>.</p>
<p><strong>6.</strong> 2B, 4D, 8H, 16P, ? → numbers double; letter = the letter at that position (2 = B, 4 = D, 8 = H, 16 = P) → 32 exceeds 26; wrap around: 32 − 26 = 6 = F → <strong>32F</strong>.</p>
</details>

<h3>3. Continuous pattern (fill in the blanks)</h3>
<p>Blanks in a repeating block: <strong>a _ b b _ a a b _ _ a b</strong>. Try block length 3, 4, 5… until it repeats cleanly.</p>
<details class="solution"><summary>Worked example</summary>
<p><strong>a b _ a _ c a b c _ b c</strong> — number the positions 1–12. The given letters fit the block "abc" repeated four times: a b c | a b c | a b c | a b c.</p>
<p>Blanks are positions 3, 5 and 10 → c, b, a → the answer is <strong>cba</strong>.</p>
</details>

<h3>4. Tips</h3>
<ul>
  <li>Write positions above letters once; don't recompute A = 1 each time.</li>
  <li>Large gaps suggest squares (+1, +4, +9) or alternating operations.</li>
  <li>Letters beyond Z usually wrap around (Z + 1 = A).</li>
</ul>
"""
    + check("Next in the series: C, F, I, L, ?",
            ["M", "N", "O", "P"], "c",
            "Positions 3, 6, 9, 12 increase by 3 → 15 = O.")
))

TOPICS.append(topic(
    "Arithmetic Progression (AP) & Geometric Progression (GP)",
    "Module 4 · formulas for nth terms and sums",
    r"""
<h3>1. Arithmetic progression</h3>
<p>Constant difference d: a, a + d, a + 2d, …</p>
<div class="formula">nth term: T<sub>n</sub> = a + (n − 1)d &nbsp;&nbsp;&nbsp; Sum: S<sub>n</sub> = n/2 [2a + (n − 1)d] = n/2 (first + last)</div>
<ul>
  <li>Number of terms: n = (last − first)/d + 1</li>
  <li>Arithmetic mean of a and b: (a + b)/2</li>
  <li>Three terms in AP: take a − d, a, a + d</li>
</ul>

<h3>2. Geometric progression</h3>
<p>Constant ratio r: a, ar, ar², …</p>
<div class="formula">nth term: T<sub>n</sub> = a·r<sup>n−1</sup> &nbsp;&nbsp;&nbsp; Sum: S<sub>n</sub> = a(r<sup>n</sup> − 1)/(r − 1) for r ≠ 1 &nbsp;&nbsp;&nbsp; Infinite sum (|r| &lt; 1): S<sub>∞</sub> = a/(1 − r)</div>
<ul>
  <li>Geometric mean of a and b: √(ab)</li>
  <li>For positive numbers: AM ≥ GM ≥ HM, and GM² = AM × HM (two numbers)</li>
</ul>

<h3>3. Solved examples</h3>
<details class="solution"><summary>Example 1 — nth term of an AP</summary>
<p><em>Find the 25th term of 7, 11, 15, …</em> a = 7, d = 4 → 7 + 24 × 4 = <strong>103</strong>.</p>
</details>
<details class="solution"><summary>Example 2 — count terms</summary>
<p><em>How many two-digit numbers are divisible by 7?</em> 14, 21, …, 98 → (98 − 14)/7 + 1 = <strong>13</strong>.</p>
</details>
<details class="solution"><summary>Example 3 — sum of an AP</summary>
<p><em>Sum of all odd numbers from 1 to 99.</em> 50 terms → 50/2 × (1 + 99) = <strong>2,500</strong>.</p>
</details>
<details class="solution"><summary>Example 4 — GP term</summary>
<p><em>Find the 8th term of 3, 6, 12, …</em> 3 × 2⁷ = <strong>384</strong>.</p>
</details>
<details class="solution"><summary>Example 5 — GP sum</summary>
<p><em>Sum of 2 + 6 + 18 + … to 6 terms.</em> 2(3⁶ − 1)/(3 − 1) = 3⁶ − 1 = <strong>728</strong>.</p>
</details>
<details class="solution"><summary>Example 6 — infinite GP</summary>
<p><em>8 + 4 + 2 + 1 + …</em> 8/(1 − 1/2) = <strong>16</strong>.</p>
</details>
<details class="solution"><summary>Example 7 — savings (AP application)</summary>
<p><em>A student saves ₹50 in the first week and ₹10 more each week. Total savings in 20 weeks?</em></p>
<p>S = 20/2 [2 × 50 + 19 × 10] = 10 × 290 = <strong>₹2,900</strong>.</p>
</details>
"""
    + check("The 10th term of an AP is 47 and the first term is 2. What is the common difference?",
            ["4", "5", "4.5", "6"], "b",
            "47 = 2 + 9d → d = 5.")
    + check("Sum to infinity of 27 + 9 + 3 + 1 + … is:",
            ["36", "40.5", "40", "54"], "b",
            "a = 27, r = 1/3 → 27 / (2/3) = 40.5.")
))
