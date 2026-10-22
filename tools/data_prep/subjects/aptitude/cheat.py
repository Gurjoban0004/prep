"""Numerical Aptitude & Logical Reasoning-I — formula sheet."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Formula Sheet — Arithmetic",
    "Numbers, averages, ratios, percentages, interest, profit, work, AP/GP",
    r"""
<h3>Numbers</h3>
<table>
  <tbody>
    <tr><td>Number of factors of a<sup>p</sup>b<sup>q</sup>c<sup>r</sup></td><td>(p+1)(q+1)(r+1)</td></tr>
    <tr><td>HCF × LCM</td><td>= product of two numbers</td></tr>
    <tr><td>Largest number leaving same remainder for x, y, z</td><td>HCF of the differences</td></tr>
    <tr><td>Least number leaving remainder r when divided by a, b, c</td><td>LCM(a, b, c) + r</td></tr>
    <tr><td>Sum 1…n, squares, cubes</td><td>n(n+1)/2 · n(n+1)(2n+1)/6 · [n(n+1)/2]²</td></tr>
    <tr><td>Unit digit cycles</td><td>2: 2486 · 3: 3971 · 7: 7931 · 8: 8426 · 4: 46 · 9: 91</td></tr>
    <tr><td>(n−1)<sup>k</sup> mod n</td><td>1 if k even, n−1 if k odd</td></tr>
    <tr><td>Fermat</td><td>a<sup>p−1</sup> ≡ 1 (mod p) for prime p</td></tr>
  </tbody>
</table>

<h3>Averages &amp; ratios</h3>
<table>
  <tbody>
    <tr><td>New member changes average by d</td><td>new value = old average + (new count × d)</td></tr>
    <tr><td>Replacement changes average by d</td><td>new = old + n × d</td></tr>
    <tr><td>Average speed, equal distances</td><td>2xy / (x + y)</td></tr>
    <tr><td>Divide T in a : b</td><td>aT/(a+b), bT/(a+b)</td></tr>
    <tr><td>Mean proportional / third proportional</td><td>√(ab) · b²/a</td></tr>
    <tr><td>Alligation</td><td>cheaper : dearer = (d − m) : (m − c)</td></tr>
    <tr><td>Replacement n times</td><td>pure left = V(1 − x/V)<sup>n</sup></td></tr>
    <tr><td>Partnership</td><td>share ∝ capital × time</td></tr>
  </tbody>
</table>

<h3>Percentage, profit, discount</h3>
<table>
  <tbody>
    <tr><td>Successive change</td><td>a + b + ab/100</td></tr>
    <tr><td>Price up r% → cut consumption</td><td>r/(100+r) × 100</td></tr>
    <tr><td>SP from profit%</td><td>CP × (100 + p)/100</td></tr>
    <tr><td>Same SP, x% gain and x% loss</td><td>loss of x²/100 %</td></tr>
    <tr><td>False weight w instead of 1000</td><td>profit (1000 − w)/w × 100</td></tr>
    <tr><td>CP of x = SP of y</td><td>profit (x − y)/y × 100</td></tr>
    <tr><td>Successive discounts</td><td>a + b − ab/100</td></tr>
    <tr><td>Markup m, discount d</td><td>profit m − d − md/100</td></tr>
    <tr><td>Buy x get y free</td><td>discount y/(x+y) × 100</td></tr>
  </tbody>
</table>

<h3>Interest</h3>
<table>
  <tbody>
    <tr><td>Simple interest</td><td>PRT/100</td></tr>
    <tr><td>SI: money becomes n times</td><td>RT = 100(n − 1)</td></tr>
    <tr><td>Compound amount</td><td>P(1 + R/100)<sup>n</sup></td></tr>
    <tr><td>Half-yearly / quarterly</td><td>R/2, 2n · R/4, 4n</td></tr>
    <tr><td>CI − SI, 2 years</td><td>P(R/100)²</td></tr>
    <tr><td>CI − SI, 3 years</td><td>P(R/100)²(3 + R/100)</td></tr>
    <tr><td>CI 2 years at 10% / 20%</td><td>21% / 44% of P</td></tr>
  </tbody>
</table>

<h3>Time &amp; work</h3>
<table>
  <tbody>
    <tr><td>Together</td><td>ab/(a + b)</td></tr>
    <tr><td>Chain rule</td><td>M₁D₁H₁/W₁ = M₂D₂H₂/W₂</td></tr>
    <tr><td>Pipes</td><td>inlet +1/x, outlet −1/y</td></tr>
    <tr><td>Wages</td><td>∝ work done</td></tr>
  </tbody>
</table>

<h3>Progressions</h3>
<table>
  <tbody>
    <tr><td>AP nth term / sum</td><td>a + (n−1)d · n/2[2a + (n−1)d]</td></tr>
    <tr><td>Number of terms</td><td>(last − first)/d + 1</td></tr>
    <tr><td>GP nth term / sum</td><td>ar<sup>n−1</sup> · a(r<sup>n</sup> − 1)/(r − 1)</td></tr>
    <tr><td>Infinite GP (|r| &lt; 1)</td><td>a/(1 − r)</td></tr>
  </tbody>
</table>
"""
))

TOPICS.append(topic(
    "Formula Sheet — Reasoning & Verbal",
    "Directions, calendar, clock, cubes, ranking, syllogism and grammar rules",
    r"""
<h3>Directions</h3>
<ul>
  <li>Right turn = clockwise 90°; left turn = anticlockwise 90°.</li>
  <li>Shortest distance = √(x² + y²).</li>
  <li>Morning shadow → West; evening shadow → East.</li>
</ul>

<h3>Calendar</h3>
<table>
  <tbody>
    <tr><td>Odd days</td><td>ordinary year 1 · leap year 2 · 100 yrs 5 · 200 yrs 3 · 300 yrs 1 · 400 yrs 0</td></tr>
    <tr><td>Day codes</td><td>0 Sun · 1 Mon · 2 Tue · 3 Wed · 4 Thu · 5 Fri · 6 Sat</td></tr>
    <tr><td>Month odd days</td><td>Jan 3 · Feb 0/1 · Mar 3 · Apr 2 · May 3 · Jun 2 · Jul 3 · Aug 3 · Sep 2 · Oct 3 · Nov 2 · Dec 3</td></tr>
    <tr><td>Leap year</td><td>divisible by 4; centuries only if divisible by 400</td></tr>
  </tbody>
</table>

<h3>Clock</h3>
<table>
  <tbody>
    <tr><td>Angle at H:M</td><td>|30H − 5.5M| (use 360 − x if above 180)</td></tr>
    <tr><td>Hands coincide between H and H+1</td><td>(60/11) × H minutes past H</td></tr>
    <tr><td>Coincide / opposite / right angle in 12 h</td><td>11 / 11 / 22 times</td></tr>
    <tr><td>Mirror image</td><td>11:60 − time</td></tr>
  </tbody>
</table>

<h3>Cubes (n × n × n, all faces painted)</h3>
<table>
  <tbody>
    <tr><td>3 faces</td><td>8</td></tr>
    <tr><td>2 faces</td><td>12(n − 2)</td></tr>
    <tr><td>1 face</td><td>6(n − 2)²</td></tr>
    <tr><td>0 faces</td><td>(n − 2)³</td></tr>
    <tr><td>Minimum cuts for n³ pieces</td><td>3(n − 1)</td></tr>
    <tr><td>Die opposite faces</td><td>sum to 7</td></tr>
  </tbody>
</table>

<h3>Ranking</h3>
<ul>
  <li>Total = rank from top + rank from bottom − 1</li>
  <li>Rank from other end = total − rank + 1</li>
</ul>

<h3>Letters</h3>
<ul>
  <li>EJOTY = 5, 10, 15, 20, 25 · opposite letter = 27 − position · position from the right = 27 − position from the left</li>
</ul>

<h3>Syllogism</h3>
<table>
  <tbody>
    <tr><td>All + All</td><td>All</td></tr>
    <tr><td>All + No</td><td>No</td></tr>
    <tr><td>Some + All</td><td>Some</td></tr>
    <tr><td>Some + No</td><td>Some not</td></tr>
    <tr><td>All + Some, Some + Some, No + No</td><td>no definite conclusion</td></tr>
    <tr><td>Complementary pairs</td><td>Some / No and All / Some not → "either–or"</td></tr>
  </tbody>
</table>

<h3>Grammar quick rules</h3>
<ul>
  <li>Each / every / either / neither → singular verb.</li>
  <li>"Along with / as well as" → verb agrees with the first subject.</li>
  <li>Neither…nor / either…or → verb agrees with the nearer subject.</li>
  <li>A number of → plural; the number of → singular.</li>
  <li>Information, advice, furniture, luggage, news → uncountable, singular.</li>
  <li>a/an depends on the <em>sound</em>: a university, an hour.</li>
  <li>Since + point in time; for + duration.</li>
  <li>No sooner … than; hardly / scarcely … when.</li>
</ul>
"""
))
