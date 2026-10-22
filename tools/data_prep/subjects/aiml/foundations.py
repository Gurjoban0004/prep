# -*- coding: utf-8 -*-
"""Foundations (Easy Reading / Gentle Start) notes for AIML ST-1 topics."""

ST1_FOUNDATIONS = {
0: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">No heavy math, no confusing jargon. Let\'s understand what Artificial Intelligence really is in 3 minutes.</p>
</div>

<h3>1. What is Artificial Intelligence in Simple Words?</h3>
<p>Imagine teaching a computer to do tasks that usually require human intelligence — recognizing a face in a photo, recommending your next favorite song on Spotify, or translating English to Hindi. That is <strong>Artificial Intelligence (AI)</strong>.</p>
<p>Think of it this way:</p>
<ul>
  <li><strong>Traditional software</strong> is like a strict recipe book: if step A happens, do step B. If something unexpected happens, it crashes.</li>
  <li><strong>AI software</strong> is like an experienced chef who tastes the soup and adjusts the spices based on patterns and past experience.</li>
</ul>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Everyday Analogy: Learning to Drive</div>
  <p>A traditional program would need millions of hand-written rules: <em>"If a red car is 4.2 meters ahead moving at 30 km/h, brake by 12 degrees."</em> A human driver doesn\'t calculate math while driving — they learn from experience. AI uses that same philosophy: <strong>learn from examples instead of hand-written rules</strong>.</p>
</div>

<h3>2. The Four Ways to Think About AI</h3>
<p>Russell &amp; Norvig (the course\'s primary textbook) organize AI definitions along two simple questions:</p>
<table>
  <thead><tr><th></th><th>Human-Like (How people act)</th><th>Rational (Ideal mathematical logic)</th></tr></thead>
  <tbody>
    <tr><td><strong>Thinking</strong></td><td><strong>Thinking humanly:</strong> Studying human psychology and brain scans to model thoughts.</td><td><strong>Thinking rationally:</strong> Using strict formal logic ("All humans are mortal; Socrates is human; therefore Socrates is mortal").</td></tr>
    <tr><td><strong>Acting</strong></td><td><strong>Acting humanly (The Turing Test):</strong> Behaving so naturally that a human cannot tell machine from person.</td><td><strong>Acting rationally (Modern AI):</strong> Choosing the best possible action to achieve a goal.</td></tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <strong>The 1950 Turing Test in 10 Seconds:</strong> Alan Turing asked: <em>"Can a computer fool a human judge in a text chat?"</em> If a person chatting with a computer thinks they are talking to another human, the machine passes!
</div>

<h3>3. The Three Big Milestones to Remember for Exams</h3>
<table>
  <thead><tr><th>Year</th><th>Milestone</th><th>Why It Matters</th></tr></thead>
  <tbody>
    <tr><td><strong>1956</strong></td><td>Dartmouth Workshop</td><td>John McCarthy coined the name "Artificial Intelligence". The field was officially born!</td></tr>
    <tr><td><strong>1997</strong></td><td>IBM Deep Blue</td><td>A computer defeated world chess champion Garry Kasparov for the first time.</td></tr>
    <tr><td><strong>2012–Now</strong></td><td>Deep Learning &amp; Transformers</td><td>AlexNet won ImageNet in 2012, and in 2017 the Transformer architecture launched modern ChatGPT and Generative AI.</td></tr>
  </tbody>
</table>

<h3>4. AI vs Human Intelligence — Quick Comparison</h3>
<ul>
  <li><strong>Where AI wins:</strong> Speed and volume. An AI can scan 100,000 chest X-rays in 2 minutes without getting tired or distracted.</li>
  <li><strong>Where Humans win:</strong> Common sense and adaptability. A 4-year-old child sees one cat and knows what all cats look like. An AI needs thousands of photos!</li>
  <li><strong>Energy:</strong> A human brain runs on about <strong>20 Watts</strong> (less power than a dim lightbulb). Training modern AI models requires megawatts of electricity!</li>
</ul>

<div class="callout callout-key">
  <strong>Key Takeaway:</strong> AI is not magic or consciousness. It is powerful software learning patterns from historical data to make smart predictions.
</div>
""",

1: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Let\'s classify AI by what it can do, how its memory works, and the ethical rules that keep it safe.</p>
</div>

<h3>1. AI by Capability (How Smart is It?)</h3>
<table>
  <thead><tr><th>Stage</th><th>What It Can Do</th><th>Real-World Reality</th></tr></thead>
  <tbody>
    <tr><td><strong>Narrow AI (Weak AI)</strong></td><td>Excels at <em>one specific task</em> (e.g. playing chess, filtering spam, face unlock).</td><td><strong>100% of AI today</strong>: Siri, Google Maps, ChatGPT, Tesla Autopilot are all Narrow AI.</td></tr>
    <tr><td><strong>General AI (Strong AI / AGI)</strong></td><td>Human-level intellect across <em>any</em> topic. Can learn guitar, write code, and do taxes like a person.</td><td><strong>Not yet achieved</strong>. Active global research goal.</td></tr>
    <tr><td><strong>Super AI (ASI)</strong></td><td>Far surpasses human intelligence across all fields (science, creativity, wisdom).</td><td><strong>Hypothetical / Sci-Fi</strong>.</td></tr>
  </tbody>
</table>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 Analogy: The Calculator vs The Scientist</div>
  <p>A calculator can multiply two 12-digit numbers 1,000x faster than Albert Einstein. But ask it to tell you a joke or make coffee, and it cannot do it. That is <strong>Narrow AI</strong>: superhuman at one thing, helpless at everything else.</p>
</div>

<h3>2. AI by Functionality (How Does It Decide?)</h3>
<ul>
  <li><strong>Reactive Machines:</strong> Have <em>zero memory</em>. They only look at what is happening right this second. (Example: IBM Deep Blue chess computer).</li>
  <li><strong>Limited Memory:</strong> Remembers the recent past for a few seconds or uses training history to guide current decisions. (Example: self-driving car tracking the velocity of nearby cars over the last 5 seconds; modern ML models).</li>
  <li><strong>Theory of Mind:</strong> Would understand human emotions, beliefs, and motives. (Research stage).</li>
  <li><strong>Self-Aware AI:</strong> Would possess its own consciousness and feelings. (Purely hypothetical).</li>
</ul>

<div class="callout callout-tip">
  <strong>Exam Tip:</strong> <em>"What type of AI is IBM Deep Blue?"</em> It is both <strong>Narrow AI</strong> (by capability) and a <strong>Reactive Machine</strong> (by functionality)!
</div>

<h3>3. Ethical Pitfalls You Need to Know</h3>
<ul>
  <li><strong>Algorithmic Bias:</strong> If an AI resume screener is trained on 10 years of hiring mostly men, it learns that men are preferred and unfairly downgrades women\'s resumes.</li>
  <li><strong>Privacy &amp; Data:</strong> Collecting personal faces, health data, or emails without consent violates privacy laws (like India\'s DPDP Act 2023 and Europe\'s GDPR).</li>
  <li><strong>Explainability (Black-Box Problem):</strong> If a bank AI rejects your loan, you deserve to know why! Explainable AI (XAI) tools like SHAP and LIME help explain model decisions.</li>
</ul>
""",

2: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Understand what an Intelligent Agent is using the PEAS framework and everyday examples.</p>
</div>

<h3>1. What is an Agent?</h3>
<p>An <strong>agent</strong> is anything that observes its surroundings through <strong>sensors</strong> and takes actions using <strong>actuators</strong>.</p>
<div class="formula">World → Sensors (Eyes/Cameras/Input) → Agent Brain → Actuators (Hands/Wheels/Screen) → World</div>
<p>A <strong>rational agent</strong> simply chooses the action that gives the best outcome based on what it can see.</p>

<h3>2. The Famous PEAS Framework Made Easy</h3>
<p>Whenever you describe an AI system, break it into 4 letters: <strong>PEAS</strong>:</p>
<table>
  <thead><tr><th>Letter</th><th>Meaning</th><th>Example: Robot Vacuum Cleaner</th><th>Example: Self-Driving Car</th></tr></thead>
  <tbody>
    <tr><td><strong>P</strong></td><td><strong>Performance Measure</strong> (How do we score it?)</td><td>Cleanliness of floors, low battery usage.</td><td>Safety, speed, passenger comfort, following traffic laws.</td></tr>
    <tr><td><strong>E</strong></td><td><strong>Environment</strong> (Where does it live?)</td><td>Rooms, tiles, carpet, furniture, pets.</td><td>Roads, pedestrians, highway traffic, rainy weather.</td></tr>
    <tr><td><strong>A</strong></td><td><strong>Actuators</strong> (How does it act?)</td><td>Wheels, suction motor, spinning brush.</td><td>Steering wheel, accelerator, brake pedal, headlights.</td></tr>
    <tr><td><strong>S</strong></td><td><strong>Sensors</strong> (How does it see/feel?)</td><td>Dirt sensor, bump sensor, infrared cliff detector.</td><td>Cameras, LiDAR, radar, GPS, speedometer.</td></tr>
  </tbody>
</table>

<h3>3. The 5 Types of Agents from Simple to Smart</h3>
<ol>
  <li><strong>Simple Reflex Agent:</strong> Follows strict "if-then" rules. <em>If dirty → suck up dirt.</em> No memory.</li>
  <li><strong>Model-Based Reflex Agent:</strong> Keeps a mental map of the world so it remembers things it can\'t see right now (e.g. car remembers there is a truck in its blind spot).</li>
  <li><strong>Goal-Based Agent:</strong> Knows a target goal and plans steps to reach it (e.g. Google Maps finding a route to campus).</li>
  <li><strong>Utility-Based Agent:</strong> Not only reaches the goal, but chooses the <em>best, happiest way</em> (e.g. fastest route with fewest tolls and prettiest scenery).</li>
  <li><strong>Learning Agent:</strong> Gets better with every attempt by observing its own mistakes via a <strong>critic</strong> and improving via a <strong>learning element</strong>.</li>
</ol>
""",

3: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Clear up the confusion between Generative AI, AI Agents, and Agentic AI once and for all.</p>
</div>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Dinner Party Analogy</div>
  <ul>
    <li><strong>Generative AI:</strong> You ask ChatGPT for a delicious lasagna recipe, and it writes one out beautifully. It creates content.</li>
    <li><strong>AI Agent:</strong> You give the bot your grocery store app login and say: <em>"Add these lasagna ingredients to my cart."</em> It follows the steps and uses an app tool.</li>
    <li><strong>Agentic AI:</strong> You say: <em>"Host an Italian dinner party for 8 friends on Friday."</em> The system checks everyone\'s food allergies, budgets costs, orders groceries, sends calendar invites, and books a cleaner. It plans, adapts, and executes autonomously!</li>
  </ul>
</div>

<h3>1. Quick Side-by-Side Comparison</h3>
<table>
  <thead><tr><th>Trait</th><th>Generative AI</th><th>AI Agent</th><th>Agentic AI</th></tr></thead>
  <tbody>
    <tr><td><strong>Primary Job</strong></td><td>Generate text, images, code, or audio.</td><td>Complete a specific workflow task.</td><td>Solve broad goals with independent planning.</td></tr>
    <tr><td><strong>Autonomy</strong></td><td>Low (only responds to prompts).</td><td>Medium (runs a single tool sequence).</td><td>High (multi-step planning, self-correction, tool orchestration).</td></tr>
    <tr><td><strong>Key Technologies</strong></td><td>Transformers, LLMs, Diffusion models.</td><td>Function calling, API integration.</td><td>Memory, reflection, multi-agent collaboration, RAG.</td></tr>
  </tbody>
</table>

<div class="callout callout-key">
  <strong>Key Takeaway:</strong> Generative AI is the <em>creative brain</em>; AI Agents provide the <em>hands and tools</em>; Agentic AI provides the <em>executive planning and willpower</em>.
</div>
""",

4: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Machine Learning explained: How computers learn from experience without being explicitly programmed.</p>
</div>

<h3>1. Traditional Coding vs Machine Learning</h3>
<ul>
  <li><strong>Traditional Programming:</strong> Data + Hand-Written Rules → Output. (You write every single rule by hand).</li>
  <li><strong>Machine Learning:</strong> Data + Known Answers → Learning → Rules. (The computer figures out the rules from patterns!).</li>
</ul>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 Analogy: Learning Basketball</div>
  <p>No one learns to shoot a basketball by reading physics equations about projectile trajectory. You shoot 500 times, watch whether the ball goes in, and your brain adjusts muscle memory. That is <strong>Machine Learning</strong>: adjusting internal weights based on trial and error!</p>
</div>

<h3>2. Tom Mitchell\'s Formal Definition Made Simple: T, P, E</h3>
<p>In 1997, Tom Mitchell wrote the classic definition: A program learns from <strong>Experience E</strong> with respect to <strong>Task T</strong> if its <strong>Performance P</strong> improves with experience.</p>
<table>
  <thead><tr><th>Application</th><th>Task T</th><th>Performance P</th><th>Experience E</th></tr></thead>
  <tbody>
    <tr><td><strong>Email Spam Filter</strong></td><td>Flagging emails as spam or inbox.</td><td>Percentage of emails classified correctly.</td><td>Database of past emails labeled by users.</td></tr>
    <tr><td><strong>Checkers Game</strong></td><td>Playing checkers.</td><td>Percentage of games won.</td><td>Playing games against itself.</td></tr>
    <tr><td><strong>House Price Predictor</strong></td><td>Predicting selling price in Lakhs.</td><td>Mean error in price predictions.</td><td>Past house sales with square footage and prices.</td></tr>
  </tbody>
</table>
""",

5: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">The four main flavors of machine learning and the standard 10-step project lifecycle.</p>
</div>

<h3>1. The 4 Types of Learning</h3>
<table>
  <thead><tr><th>Type</th><th>Does It Have Labels?</th><th>What It Does</th><th>Everyday Example</th></tr></thead>
  <tbody>
    <tr><td><strong>Supervised Learning</strong></td><td><strong>Yes</strong> (input + known answer)</td><td>Learns to predict answers for new inputs.</td><td>Teacher grading flashcards; spam detection; house price prediction.</td></tr>
    <tr><td><strong>Unsupervised Learning</strong></td><td><strong>No</strong> (raw unlabelled data)</td><td>Finds hidden clusters and patterns on its own.</td><td>Grouping supermarket customers by shopping habits; Netflix movie clusters.</td></tr>
    <tr><td><strong>Semi-Supervised</strong></td><td>A few labels + lots of unlabelled data</td><td>Uses a few expert examples to understand a giant ocean of data.</td><td>Medical scans where only 50 images have doctor annotations, but 10,000 scans are available.</td></tr>
    <tr><td><strong>Reinforcement Learning</strong></td><td>No answers; receives <strong>rewards &amp; penalties</strong></td><td>Learns by trial and error in an environment.</td><td>Training a dog with treats; teaching AI to beat Super Mario or master chess.</td></tr>
  </tbody>
</table>

<h3>2. Supervised Learning: Regression vs Classification</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The One-Sentence Difference</div>
  <p><strong>Regression</strong> predicts a <em>number</em> ("How much? How many?"), while <strong>Classification</strong> predicts a <em>category</em> ("Which group? Yes or No?").</p>
</div>
<ul>
  <li><strong>Regression Examples:</strong> Tomorrow\'s temperature (32.4°C), stock price, student GPA.</li>
  <li><strong>Classification Examples:</strong> Spam or Not Spam, Cat or Dog, Loan Approved or Rejected.</li>
</ul>
""",

6: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Meet the Python libraries that power 99% of machine learning projects.</p>
</div>

<h3>1. The Essential Python ML Toolkit</h3>
<ul>
  <li><strong>NumPy:</strong> Ultra-fast math on arrays and matrices. Written in C under the hood, so operations run 50x faster than standard Python loops.</li>
  <li><strong>Pandas:</strong> Excel spreadsheets on steroids! Loads CSV files, filters rows, handles missing numbers, and merges datasets in one line of code.</li>
  <li><strong>Matplotlib:</strong> The chart painter. Plots scatter charts, histograms, and bar graphs to inspect data visually.</li>
  <li><strong>Scikit-Learn:</strong> The Swiss Army Knife of ML. Every algorithm uses the exact same 3 steps:
    <ol>
      <li><code>model = LogisticRegression()</code> (Choose algorithm)</li>
      <li><code>model.fit(X_train, y_train)</code> (Train model)</li>
      <li><code>model.predict(X_test)</code> (Make predictions)</li>
    </ol>
  </li>
</ul>

<div class="callout callout-tip">
  <strong>Colab vs Jupyter:</strong> Jupyter runs locally on your laptop. Google Colab runs in your browser on Google servers and gives you free access to GPUs!
</div>
""",

7: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Why 80% of data science is data cleaning, and how to fix messy real-world datasets.</p>
</div>

<h3>1. Real Data is Messy!</h3>
<p>If you feed garbage data into an AI model, you get garbage predictions (<strong>GIGO — Garbage In, Garbage Out</strong>).</p>

<h3>2. How to Handle Missing Values</h3>
<table>
  <thead><tr><th>Situation</th><th>Best Action</th><th>Code Example</th></tr></thead>
  <tbody>
    <tr><td>Only 2 rows out of 10,000 are missing</td><td><strong>Drop the rows</strong></td><td><code>df.dropna()</code></td></tr>
    <tr><td>Numeric column, numbers look normal</td><td><strong>Fill with Mean (Average)</strong></td><td><code>df["age"].fillna(df["age"].mean())</code></td></tr>
    <tr><td>Numeric column with extreme outliers (e.g. Salaries)</td><td><strong>Fill with Median (Middle number)</strong></td><td><code>df["salary"].fillna(df["salary"].median())</code></td></tr>
    <tr><td>Text / Category column (e.g. City)</td><td><strong>Fill with Mode (Most common)</strong></td><td><code>df["city"].fillna(df["city"].mode()[0])</code></td></tr>
  </tbody>
</table>

<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 Why Median Beats Mean for Salary</div>
  <p>If 9 people in a cafe earn ₹50,000/month and billionaire Mukesh Ambani walks in, the <strong>mean</strong> salary jumps to ₹5 Crore! But the <strong>median</strong> stays at ₹50,000. That\'s why median is immune to extreme outliers.</p>
</div>

<h3>3. Converting Words to Numbers (Encoding)</h3>
<p>Computers only understand numbers, so we must encode text categories:</p>
<ul>
  <li><strong>One-Hot Encoding:</strong> Creates a separate 0/1 column for each category (e.g. <code>is_red</code>, <code>is_blue</code>). Use this for categories without natural order (like colors or cities).</li>
  <li><strong>Ordinal Encoding:</strong> Uses numbers with order: Small = 0, Medium = 1, Large = 2.</li>
</ul>
""",

8: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Why feature scaling prevents one big number from ruining your machine learning model.</p>
</div>

<h3>1. Why Do We Scale Features?</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Giant vs The Ant</div>
  <p>Imagine predicting loan default using two features: <strong>Age (20 to 60)</strong> and <strong>Annual Income (₹3,00,000 to ₹50,00,000)</strong>. Distance-based algorithms calculate differences: income difference is ₹5,00,000, while age difference is only 5 years! Income will completely drown out age, even if age is crucial. Scaling puts both features on a level playing field.</p>
</div>

<h3>2. The Two Primary Scaling Techniques</h3>
<table>
  <thead><tr><th>Technique</th><th>Formula Goal</th><th>Resulting Range</th><th>When to Use</th></tr></thead>
  <tbody>
    <tr><td><strong>Min-Max Normalization</strong></td><td>Squishes numbers between 0 and 1.</td><td><strong>[0, 1]</strong></td><td>When you know min/max bounds and data has no crazy outliers.</td></tr>
    <tr><td><strong>Standardization (Z-Score)</strong></td><td>Centers data around average 0 with spread 1.</td><td><strong>Mean = 0, Std = 1</strong></td><td>Default standard choice for gradient descent, SVM, and PCA.</td></tr>
  </tbody>
</table>

<div class="callout callout-warning">
  <strong>The Golden Exam Rule (Data Leakage):</strong> Always fit your scaler on the <strong>training set only</strong>! Then reuse that trained scaler on the test set. Fitting on the test set is considered "cheating" because it leaks future information into the model.
</div>
""",

9: r"""
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Supervised regression: Finding the best-fitting line to predict continuous values.</p>
</div>

<h3>1. What is Linear Regression?</h3>
<p>Linear Regression draws a straight line through scatter points to predict a number:</p>
<div class="formula">\[ y = wx + b \quad (\text{Predicted Price} = \text{Weight} \times \text{House Size} + \text{Base Price}) \]</div>
<p>The goal is to find the slope <code>w</code> and intercept <code>b</code> that minimizes the distance between the line and the actual data points.</p>

<h3>2. How Do We Score Regression Models?</h3>
<ul>
  <li><strong>MAE (Mean Absolute Error):</strong> The average dollar error. If MAE is ₹5,000, your predictions are off by ₹5,000 on average. Simple and easy to explain.</li>
  <li><strong>MSE (Mean Squared Error):</strong> Squares every error before averaging. Punishes large mistakes heavily!</li>
  <li><strong>RMSE (Root Mean Squared Error):</strong> Square root of MSE. Puts the error back into original units (Rupees/Dollars). Very popular!</li>
  <li><strong>R² Score (Coefficient of Determination):</strong> Scores from 0 to 1 (or 0% to 100%). Tells you what percentage of variation your line explains. An R² of 0.88 means your line explains 88% of price variance!</li>
</ul>
""",

10: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Classification part 1: Logistic regression for probabilities and KNN for voting by neighbors.</p>
</div>

<h3>1. Logistic Regression: Predicting Yes/No Probabilities</h3>
<p>Despite having "Regression" in its name, <strong>Logistic Regression is a Classification algorithm!</strong></p>
<p>Instead of drawing an infinite straight line, it bends the line into an S-curve using the <strong>Sigmoid function</strong>. The output is always a probability between <strong>0 and 1 (0% to 100%)</strong>.</p>
<div class="formula">If probability &gt;= 0.5 (50%) → Class 1 (Spam). If probability &lt; 0.5 → Class 0 (Not Spam).</div>

<h3>2. K-Nearest Neighbours (KNN): Asking Your Neighbors</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 Birds of a Feather Flock Together</div>
  <p>To classify a mystery point, KNN looks at its <strong>K closest neighbors</strong> and takes a majority vote! If K=5, and 4 neighbors are cats while 1 is a dog, the mystery point is declared a cat.</p>
</div>
<ul>
  <li><strong>Choose an odd K:</strong> (e.g. K=3, 5, 7) to avoid tie votes in two-class problems.</li>
  <li><strong>Lazy Learner:</strong> KNN does zero training math upfront. It literally just memorizes all the training points and does all calculations at query time!</li>
</ul>
""",

11: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Classification part 2: Decision Trees, Random Forests, Naive Bayes, and Support Vector Machines.</p>
</div>

<h3>1. Decision Trees: The 20 Questions Game</h3>
<p>A Decision Tree splits data using simple questions: <em>"Is salary &gt; ₹50,000? If Yes, has credit card? If No, reject."</em></p>
<ul>
  <li><strong>Entropy:</strong> A measure of disorder/chaos. A bowl of pure red balls has Entropy = 0. A 50/50 mix of red and blue has maximum Entropy = 1.</li>
  <li><strong>Information Gain:</strong> How much a question reduces the chaos. The tree picks the question with the highest Information Gain at each step!</li>
</ul>

<h3>2. Random Forest: Wisdom of the Crowd</h3>
<p>A single decision tree is prone to memorizing quirks (overfitting). A <strong>Random Forest</strong> builds 100 different trees on random subsets of data and takes a majority vote. The crowd is much smarter and more robust than any single tree!</p>

<h3>3. Naive Bayes: The Fast Probability Champion</h3>
<p>Uses Bayes\' Theorem to calculate probabilities. It is called <em>"Naive"</em> because it makes a bold assumption: all features are completely independent of each other (e.g. word "free" and word "lottery" don\'t depend on each other). Despite being naive, it is lightning-fast and outstanding for email spam detection!</p>

<h3>4. Support Vector Machine (SVM): Finding the Widest Street</h3>
<p>SVM separates two classes with a decision line (hyperplane). It doesn\'t just draw any line — it finds the line that gives the <strong>widest possible safety margin</strong> between the classes. The points closest to the line are called <strong>Support Vectors</strong>.</p>
""",

12: """
<div class="foundations-banner">
  <div class="foundations-badge">🌱 Foundations · Gentle Start</div>
  <p class="foundations-intro">Model evaluation: How to know if your AI model really works or if it\'s just cheating.</p>
</div>

<h3>1. Overfitting vs Underfitting</h3>
<div class="foundations-analogy">
  <div class="foundations-analogy-title">💡 The Student Exam Analogy</div>
  <ul>
    <li><strong>Underfitting (High Bias):</strong> The student didn\'t study at all. They score 40% on practice homework and 40% on the final exam. The model is too simple.</li>
    <li><strong>Overfitting (High Variance):</strong> The student memorized the exact answers to the homework word-for-word. They get 100% on homework, but when the real exam has new questions, they fail with 50%! The model memorized noise instead of learning concepts.</li>
    <li><strong>Good Fit:</strong> Understands principles and scores 92% on both practice and the real exam!</li>
  </ul>
</div>

<h3>2. The Confusion Matrix Simplified</h3>
<table>
  <thead><tr><th></th><th>Actually Positive (Has Disease)</th><th>Actually Negative (Healthy)</th></tr></thead>
  <tbody>
    <tr><td><strong>AI Said YES</strong></td><td><strong>True Positive (TP):</strong> Correctly identified! 🎉</td><td><strong>False Positive (FP):</strong> False alarm! (Crying wolf).</td></tr>
    <tr><td><strong>AI Said NO</strong></td><td><strong>False Negative (FN):</strong> Missed it! (Dangerous!).</td><td><strong>True Negative (TN):</strong> Correctly passed! 🎉</td></tr>
  </tbody>
</table>

<h3>3. Precision vs Recall in Plain English</h3>
<ul>
  <li><strong>Precision:</strong> <em>"When the AI shouts YES, is it right?"</em> Formula: <code>TP / (TP + FP)</code>. Essential in spam filters (you never want an important job offer sent to spam).</li>
  <li><strong>Recall:</strong> <em>"Did the AI catch ALL the positive cases?"</em> Formula: <code>TP / (TP + FN)</code>. Essential in medical diagnosis (you cannot afford to miss a sick patient).</li>
  <li><strong>F1-Score:</strong> The harmonic balance between Precision and Recall. Great single number when classes are imbalanced!</li>
</ul>
"""
}
