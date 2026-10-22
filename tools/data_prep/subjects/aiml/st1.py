"""Artificial Intelligence & Machine Learning (24CSE0316) — ST-1: lectures 1-21 (70% weightage)."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Introduction to AI — Scope, History, Foundations & AI vs Human Intelligence",
    "Lectures 1–3 · what AI is and how we got here",
    r"""
<h3>1. What is Artificial Intelligence?</h3>
<p><strong>Artificial Intelligence</strong> is the field of building computer systems that perform tasks which normally need human intelligence:
perceiving, reasoning, learning, planning, understanding language and acting towards goals.</p>
<p>Russell &amp; Norvig (the course's main textbook) organise definitions along two axes — <em>thinking vs acting</em> and <em>human-like vs rational</em>:</p>
<table>
  <thead><tr><th></th><th>Human-like</th><th>Rational (ideal performance)</th></tr></thead>
  <tbody>
    <tr><td><strong>Thinking</strong></td><td>Thinking humanly — cognitive modelling</td><td>Thinking rationally — laws of thought, logic</td></tr>
    <tr><td><strong>Acting</strong></td><td>Acting humanly — the <strong>Turing Test</strong></td><td>Acting rationally — the <strong>rational agent</strong> approach (modern AI)</td></tr>
  </tbody>
</table>
<div class="callout callout-key"><strong>Turing Test (1950):</strong> a machine passes if a human judge, chatting by text, cannot reliably tell it from a human.
Passing needs natural language processing, knowledge representation, automated reasoning and machine learning.</div>

<h3>2. Scope of AI — the main sub-fields</h3>
<ul>
  <li><strong>Machine Learning</strong> — learning patterns from data</li>
  <li><strong>Natural Language Processing</strong> — chatbots, translation, summarisation</li>
  <li><strong>Computer Vision</strong> — face recognition, medical imaging, self-driving perception</li>
  <li><strong>Robotics</strong> — perception + planning + control in the physical world</li>
  <li><strong>Expert systems &amp; knowledge representation</strong> — rules and facts for diagnosis or advice</li>
  <li><strong>Search, planning &amp; optimisation</strong> — route finding, scheduling, game playing</li>
</ul>

<h3>3. Foundations — disciplines AI borrows from</h3>
<table>
  <thead><tr><th>Discipline</th><th>Contribution</th></tr></thead>
  <tbody>
    <tr><td>Philosophy</td><td>logic, reasoning, mind and ethics</td></tr>
    <tr><td>Mathematics</td><td>logic, probability, statistics, linear algebra, optimisation</td></tr>
    <tr><td>Economics</td><td>decision theory, utility, game theory</td></tr>
    <tr><td>Neuroscience</td><td>how brains process information → neural networks</td></tr>
    <tr><td>Psychology</td><td>how humans think, learn and perceive</td></tr>
    <tr><td>Computer engineering</td><td>hardware (GPUs) that makes AI practical</td></tr>
    <tr><td>Control theory</td><td>systems that act on feedback</td></tr>
    <tr><td>Linguistics</td><td>structure of language → NLP</td></tr>
  </tbody>
</table>

<h3>4. History and milestones</h3>
<table>
  <thead><tr><th>Year</th><th>Milestone</th></tr></thead>
  <tbody>
    <tr><td>1943</td><td>McCulloch &amp; Pitts model of an artificial neuron</td></tr>
    <tr><td>1950</td><td>Alan Turing, "Computing Machinery and Intelligence" — the Turing Test</td></tr>
    <tr><td>1956</td><td><strong>Dartmouth Conference</strong> — John McCarthy coins "Artificial Intelligence"; birth of the field</td></tr>
    <tr><td>1958</td><td>Rosenblatt's Perceptron; McCarthy creates LISP</td></tr>
    <tr><td>1966</td><td>ELIZA, an early chatbot (Weizenbaum)</td></tr>
    <tr><td>1970s &amp; late 1980s</td><td><strong>AI winters</strong> — funding collapses after over-promising</td></tr>
    <tr><td>1980s</td><td>Expert systems boom (MYCIN, XCON); backpropagation popularised (1986)</td></tr>
    <tr><td>1997</td><td>IBM <strong>Deep Blue</strong> beats chess champion Garry Kasparov</td></tr>
    <tr><td>2011</td><td>IBM Watson wins Jeopardy!; Apple Siri launches</td></tr>
    <tr><td>2012</td><td>AlexNet wins ImageNet — the deep learning era begins</td></tr>
    <tr><td>2016</td><td>DeepMind <strong>AlphaGo</strong> beats Lee Sedol at Go</td></tr>
    <tr><td>2017</td><td>"Attention Is All You Need" introduces the <strong>Transformer</strong></td></tr>
    <tr><td>2020–2023</td><td>GPT-3, ChatGPT (Nov 2022) and large language models go mainstream</td></tr>
  </tbody>
</table>

<h3>5. Applications</h3>
<p>Healthcare (diagnosis from scans, drug discovery) · Finance (fraud detection, credit scoring, algorithmic trading) ·
Transport (autonomous vehicles, route optimisation) · Retail (recommendations, demand forecasting) · Agriculture (crop yield, disease detection) ·
Education (adaptive tutoring) · Security (face recognition, intrusion detection) · Everyday assistants (Siri, Alexa, spam filters).</p>

<h3>6. AI vs human intelligence</h3>
<table>
  <thead><tr><th>Aspect</th><th>Artificial intelligence</th><th>Human intelligence</th></tr></thead>
  <tbody>
    <tr><td>Speed &amp; scale</td><td>processes huge data fast, never tires</td><td>slower, fatigues</td></tr>
    <tr><td>Learning</td><td>needs lots of data; narrow transfer</td><td>learns from few examples, transfers across domains</td></tr>
    <tr><td>Creativity &amp; common sense</td><td>limited; recombines patterns</td><td>genuine creativity, rich common sense</td></tr>
    <tr><td>Emotions &amp; consciousness</td><td>none (can simulate)</td><td>yes</td></tr>
    <tr><td>Consistency</td><td>same input → same output</td><td>affected by mood, bias, fatigue</td></tr>
    <tr><td>Energy</td><td>data centres use megawatts</td><td>brain runs on about 20 watts</td></tr>
  </tbody>
</table>
"""
    + check("The term \"Artificial Intelligence\" was coined at which event?",
            ["The 1950 Turing paper", "The 1956 Dartmouth Conference", "The 1997 Deep Blue match", "The 2012 ImageNet contest"], "b",
            "John McCarthy proposed the name for the 1956 Dartmouth summer workshop, considered the birth of AI as a field.")
))

TOPICS.append(topic(
    "Types of AI — Narrow, General, Super, Reactive Machines, Limitations & Ethics",
    "Lectures 4–6 · classifying AI by capability and by functionality",
    r"""
<h3>1. By capability</h3>
<table>
  <thead><tr><th>Type</th><th>Also called</th><th>Description</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td><strong>Narrow AI</strong></td><td>Weak AI, ANI</td><td>does one specific task very well</td><td>everything that exists today: Siri, spam filters, AlphaGo, ChatGPT</td></tr>
    <tr><td><strong>General AI</strong></td><td>Strong AI, AGI</td><td>human-level ability across any intellectual task, transfers learning</td><td>not achieved; active research goal</td></tr>
    <tr><td><strong>Super AI</strong></td><td>ASI</td><td>surpasses humans in every domain</td><td>hypothetical</td></tr>
  </tbody>
</table>

<h3>2. By functionality</h3>
<table>
  <thead><tr><th>Type</th><th>Memory?</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><strong>Reactive machines</strong></td><td>no memory; responds only to the current input</td><td>IBM Deep Blue, simple game AIs</td></tr>
    <tr><td><strong>Limited memory</strong></td><td>uses recent past data to decide</td><td>self-driving cars tracking nearby vehicles, most ML models</td></tr>
    <tr><td><strong>Theory of mind</strong></td><td>would understand emotions, beliefs, intentions</td><td>research stage</td></tr>
    <tr><td><strong>Self-aware</strong></td><td>would have consciousness</td><td>hypothetical</td></tr>
  </tbody>
</table>
<div class="callout callout-tip"><strong>Exam pattern:</strong> "Deep Blue is an example of…" → <em>reactive machine</em> and <em>narrow AI</em>. Both classifications can apply at once.</div>

<h3>3. Limitations of AI</h3>
<ul>
  <li><strong>Data dependence</strong> — needs large, clean, representative data; garbage in, garbage out.</li>
  <li><strong>No common sense or true understanding</strong> — pattern matching can fail on slightly unusual inputs.</li>
  <li><strong>Poor generalisation</strong> outside the training distribution; brittle to adversarial examples.</li>
  <li><strong>Black-box models</strong> — deep networks are hard to explain.</li>
  <li><strong>Hallucination</strong> in generative models — confident but false output.</li>
  <li><strong>Cost</strong> — compute, energy and expertise.</li>
</ul>

<h3>4. Ethical issues</h3>
<table>
  <thead><tr><th>Issue</th><th>Example</th><th>Mitigation</th></tr></thead>
  <tbody>
    <tr><td>Bias &amp; fairness</td><td>hiring model trained on biased history rejects women</td><td>balanced data, fairness audits</td></tr>
    <tr><td>Privacy</td><td>face recognition, data collection without consent</td><td>data minimisation, anonymisation, consent (GDPR, India's DPDP Act 2023)</td></tr>
    <tr><td>Transparency / explainability</td><td>loan rejected with no reason</td><td>Explainable AI (XAI): SHAP, LIME</td></tr>
    <tr><td>Accountability</td><td>who is liable when a self-driving car crashes?</td><td>clear legal responsibility, human oversight</td></tr>
    <tr><td>Job displacement</td><td>automation of routine work</td><td>reskilling, human-AI collaboration</td></tr>
    <tr><td>Misuse</td><td>deepfakes, misinformation, autonomous weapons</td><td>watermarking, regulation</td></tr>
    <tr><td>Safety</td><td>unpredictable behaviour in critical systems</td><td>testing, red-teaming, fail-safes</td></tr>
  </tbody>
</table>
"""
    + check("A self-driving car that uses the last few seconds of sensor data about nearby vehicles is an example of:",
            ["Reactive machine", "Limited memory AI", "Theory of mind AI", "Self-aware AI"], "b",
            "It stores and uses recent observations to decide, which defines limited memory AI.")
))

TOPICS.append(topic(
    "Intelligent Agents — Agent & Environment, PEAS, Environment Types & Agent Types",
    "Lectures 4–6 · the rational agent view of AI",
    r"""
<h3>1. Agent and environment</h3>
<p>An <strong>agent</strong> perceives its environment through <strong>sensors</strong> and acts on it through <strong>actuators</strong>.
The <strong>agent function</strong> maps the percept sequence to an action; the <strong>agent program</strong> implements it.</p>
<div class="formula">Environment → percepts (sensors) → Agent → actions (actuators) → Environment</div>
<p>A <strong>rational agent</strong> chooses the action expected to maximise its performance measure, given its percepts and built-in knowledge.
Rational ≠ omniscient: it does the best with what it knows.</p>

<h3>2. PEAS — specifying a task environment</h3>
<table>
  <thead><tr><th>Agent</th><th>Performance measure</th><th>Environment</th><th>Actuators</th><th>Sensors</th></tr></thead>
  <tbody>
    <tr><td>Self-driving taxi</td><td>safety, speed, legality, comfort, profit</td><td>roads, traffic, pedestrians, weather</td><td>steering, accelerator, brake, horn, indicators</td><td>cameras, LiDAR, radar, GPS, speedometer</td></tr>
    <tr><td>Medical diagnosis system</td><td>correct diagnosis, patient health, cost</td><td>patient, hospital, staff</td><td>display of diagnoses, tests, treatments</td><td>symptoms entry, test results, scans</td></tr>
    <tr><td>Vacuum cleaner robot</td><td>cleanliness, battery use, time</td><td>rooms, dirt, furniture</td><td>wheels, brushes, suction</td><td>dirt sensor, bump sensor, camera</td></tr>
    <tr><td>Online tutor</td><td>student scores, engagement</td><td>students, question bank</td><td>display questions, hints, feedback</td><td>keyboard answers, clicks</td></tr>
    <tr><td>Spam filter</td><td>spam caught, good mail not blocked</td><td>email stream, users</td><td>move to spam / inbox</td><td>email text, headers, sender</td></tr>
  </tbody>
</table>

<h3>3. Properties of environments</h3>
<table>
  <thead><tr><th>Property</th><th>vs</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Fully observable</td><td>Partially observable</td><td>chess (full) vs poker, driving (partial)</td></tr>
    <tr><td>Deterministic</td><td>Stochastic</td><td>8-puzzle vs dice games, traffic</td></tr>
    <tr><td>Episodic</td><td>Sequential</td><td>image classification (each independent) vs chess</td></tr>
    <tr><td>Static</td><td>Dynamic</td><td>crossword vs driving</td></tr>
    <tr><td>Discrete</td><td>Continuous</td><td>chess moves vs steering angle</td></tr>
    <tr><td>Single-agent</td><td>Multi-agent</td><td>solving a maze vs football</td></tr>
    <tr><td>Known</td><td>Unknown</td><td>rules given vs rules must be learned</td></tr>
  </tbody>
</table>
<p>The hardest case — partially observable, stochastic, sequential, dynamic, continuous, multi-agent — is the real world (taxi driving).</p>

<h3>4. Types of intelligent agents</h3>
<table>
  <thead><tr><th>Agent</th><th>Decides using</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><strong>Simple reflex</strong></td><td>current percept only, condition–action rules ("if dirty then suck")</td><td>thermostat, basic vacuum robot</td></tr>
    <tr><td><strong>Model-based reflex</strong></td><td>an internal model of the world to handle partial observability</td><td>car tracking vehicles out of camera view</td></tr>
    <tr><td><strong>Goal-based</strong></td><td>goals + search/planning over future states</td><td>GPS navigation to a destination</td></tr>
    <tr><td><strong>Utility-based</strong></td><td>a utility function to choose the <em>best</em> way among goal-reaching options</td><td>route that balances time, tolls and fuel</td></tr>
    <tr><td><strong>Learning agent</strong></td><td>improves from experience</td><td>recommendation systems, AlphaGo</td></tr>
  </tbody>
</table>
<p>A learning agent has four parts: <strong>performance element</strong> (chooses actions), <strong>critic</strong> (gives feedback on performance),
<strong>learning element</strong> (makes improvements) and <strong>problem generator</strong> (suggests exploratory actions).</p>
"""
    + check("In PEAS for an automated taxi, a LiDAR scanner belongs to:",
            ["Performance measure", "Environment", "Actuators", "Sensors"], "d",
            "LiDAR perceives the surroundings, so it is a sensor.")
    + check("Which agent type chooses between several routes that all reach the goal by comparing how desirable each is?",
            ["Simple reflex agent", "Model-based reflex agent", "Goal-based agent", "Utility-based agent"], "d",
            "Goal-based agents only know goal vs not-goal; utility-based agents rank outcomes by a utility function.")
))

TOPICS.append(topic(
    "Generative AI, AI Agents & Agentic AI — What's the Difference?",
    "Lectures 4–6 · the modern landscape",
    r"""
<h3>1. Generative AI</h3>
<p><strong>Generative AI</strong> creates new content — text, images, audio, code, video — by learning the patterns of its training data.</p>
<ul>
  <li><strong>Large Language Models (LLMs)</strong> like GPT and Claude, built on the <strong>Transformer</strong> architecture, predict the next token.</li>
  <li><strong>Diffusion models</strong> (Stable Diffusion, DALL·E, Midjourney) generate images by learning to remove noise step by step.</li>
  <li><strong>GANs</strong> — a generator and a discriminator trained against each other.</li>
  <li>Key ideas: pre-training on huge data, fine-tuning, prompting, <strong>RAG</strong> (retrieval-augmented generation grounds answers in documents).</li>
</ul>

<h3>2. AI agents</h3>
<p>An <strong>AI agent</strong> is software that perceives inputs and takes actions to complete a specific task, often by calling tools (APIs, search, calculators).
A customer-support bot that looks up your order status and issues a refund is an AI agent. It typically follows a defined workflow.</p>

<h3>3. Agentic AI</h3>
<p><strong>Agentic AI</strong> describes systems with a high degree of autonomy: given a broad goal, they <strong>plan</strong> multi-step strategies, use tools, remember context,
check their own results and adapt — often coordinating several agents. Example: "research these five laptops, compare prices, and book the best deal" handled end to end.</p>

<h3>4. Comparison</h3>
<table>
  <thead><tr><th>Aspect</th><th>Generative AI</th><th>AI agent</th><th>Agentic AI</th></tr></thead>
  <tbody>
    <tr><td>Core job</td><td>create content</td><td>complete a specific task</td><td>pursue a broad goal autonomously</td></tr>
    <tr><td>Behaviour</td><td>reactive: responds to a prompt</td><td>acts within a defined scope and workflow</td><td>proactive: plans, decides, adapts</td></tr>
    <tr><td>Autonomy</td><td>low</td><td>medium</td><td>high</td></tr>
    <tr><td>Tools &amp; memory</td><td>usually none</td><td>some tools</td><td>many tools, long-term memory, multi-agent</td></tr>
    <tr><td>Example</td><td>ChatGPT writing an essay</td><td>chatbot that tracks an order</td><td>assistant that plans and books a trip</td></tr>
  </tbody>
</table>
<div class="callout callout-key"><strong>Relationship:</strong> generative models are usually the "brain" inside agents; agentic AI adds planning, tool use, memory and self-correction around them.</div>

<h3>5. Risks specific to these systems</h3>
<ul>
  <li>Hallucinations and confidently wrong answers</li>
  <li>Copyright and data provenance questions</li>
  <li>Prompt injection — malicious text steering an agent's actions</li>
  <li>Autonomous actions with real-world side effects need human approval and guardrails</li>
</ul>
"""
    + check("A system is given the goal \"organise a team offsite\" and on its own compares venues, emails options and books the chosen one. This is best described as:",
            ["Generative AI", "A reactive machine", "Agentic AI", "A simple reflex agent"], "c",
            "It plans multi-step work, uses tools and acts autonomously toward a broad goal.")
))

TOPICS.append(topic(
    "Introduction to Machine Learning — Definition, Need, Well-Posed Problems & Learning Systems",
    "Lectures 4–6 · learning from data instead of hand-written rules",
    r"""
<h3>1. Definitions</h3>
<p><strong>Arthur Samuel (1959):</strong> "the field of study that gives computers the ability to learn without being explicitly programmed."</p>
<p><strong>Tom Mitchell (1997):</strong> "A computer program is said to learn from <strong>experience E</strong> with respect to some class of <strong>tasks T</strong> and
<strong>performance measure P</strong>, if its performance at tasks in T, as measured by P, improves with experience E."</p>

<h3>2. Traditional programming vs machine learning</h3>
<div class="formula">Traditional: &nbsp; Data + Rules → Program → Output<br>Machine learning: &nbsp; Data + Output (examples) → Learning → Rules (model)</div>

<h3>3. Well-posed learning problems (identify T, P, E)</h3>
<table>
  <thead><tr><th>Problem</th><th>Task T</th><th>Performance P</th><th>Experience E</th></tr></thead>
  <tbody>
    <tr><td>Checkers</td><td>playing checkers</td><td>% of games won</td><td>games played against itself</td></tr>
    <tr><td>Spam filter</td><td>classifying emails as spam / not spam</td><td>% correctly classified</td><td>emails labelled by users</td></tr>
    <tr><td>Handwriting recognition</td><td>recognising handwritten words in images</td><td>% words correctly recognised</td><td>database of labelled handwriting</td></tr>
    <tr><td>Self-driving</td><td>driving on public roads using sensors</td><td>average distance before an error</td><td>recorded drives with human steering</td></tr>
    <tr><td>House price prediction</td><td>predicting sale price</td><td>mean absolute error</td><td>past sales with features and prices</td></tr>
  </tbody>
</table>

<h3>4. Why do we need ML?</h3>
<ul>
  <li>Rules are too complex to write by hand (recognising a face, understanding speech).</li>
  <li>Rules change over time (fraud patterns, user preferences) — models can be retrained.</li>
  <li>Huge data volumes hide patterns humans cannot see.</li>
  <li>Personalisation at scale (recommendations for millions of users).</li>
</ul>

<h3>5. Applications</h3>
<p>Email spam filtering, product recommendations, fraud detection, medical diagnosis, speech assistants, machine translation, credit scoring,
predictive maintenance, stock forecasting, face unlock, crop yield prediction.</p>

<h3>6. Characteristics of a learning system (designing one)</h3>
<ol>
  <li><strong>Choose the training experience</strong> — direct or indirect feedback? Does the learner control examples? Does training data represent real use?</li>
  <li><strong>Choose the target function</strong> — exactly what should be learned (e.g. a board-evaluation function V(b)).</li>
  <li><strong>Choose a representation</strong> — linear function of features, decision tree, neural network…</li>
  <li><strong>Choose a learning algorithm</strong> — how to adjust the model from data (e.g. least mean squares weight updates).</li>
  <li><strong>Final design</strong> — performance system, critic, generaliser and experiment generator working in a loop.</li>
</ol>
<p>Good learning systems also <strong>generalise</strong> to unseen data, handle noise, improve with more data, and are efficient.</p>

<h3>7. Challenges</h3>
<p>insufficient or poor-quality data · non-representative data (sampling bias) · irrelevant features · overfitting · underfitting · compute cost · explainability.</p>
"""
    + check("For a spam filter, which is the experience E in Mitchell's definition?",
            ["Classifying emails", "Percentage of emails correctly classified", "Emails already labelled as spam or not spam", "The Naive Bayes algorithm"], "c",
            "E is the data the program learns from; T is classification and P is the accuracy.")
))

TOPICS.append(topic(
    "ML Workflow & Types of Learning — Supervised, Unsupervised, Semi-supervised, Reinforcement",
    "Lectures 7–9 · how an ML project actually runs",
    r"""
<h3>1. The ML development workflow</h3>
<ol>
  <li><strong>Define the problem</strong> — business goal, prediction target, success metric.</li>
  <li><strong>Collect data</strong> — databases, APIs, sensors, web scraping, public datasets (Kaggle, UCI).</li>
  <li><strong>Explore the data (EDA)</strong> — distributions, correlations, missing values, outliers, visualisation.</li>
  <li><strong>Pre-process</strong> — clean, impute, encode, scale.</li>
  <li><strong>Feature engineering</strong> — create, select, extract features.</li>
  <li><strong>Split the data</strong> — train / validation / test.</li>
  <li><strong>Choose and train models</strong>.</li>
  <li><strong>Evaluate and tune</strong> — cross-validation, hyperparameter search.</li>
  <li><strong>Deploy</strong> — API, app, batch job.</li>
  <li><strong>Monitor and maintain</strong> — watch for data drift, retrain.</li>
</ol>

<h3>2. Types of machine learning</h3>
<table>
  <thead><tr><th>Type</th><th>Data</th><th>Goal</th><th>Algorithms</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td><strong>Supervised</strong></td><td>labelled (input → known output)</td><td>predict labels for new inputs</td><td>linear/logistic regression, KNN, decision tree, SVM, Naive Bayes</td><td>spam detection, price prediction</td></tr>
    <tr><td><strong>Unsupervised</strong></td><td>unlabelled</td><td>find structure</td><td>K-Means, hierarchical, DBSCAN, PCA, Apriori</td><td>customer segmentation, anomaly detection</td></tr>
    <tr><td><strong>Semi-supervised</strong></td><td>few labels + many unlabelled</td><td>use unlabelled data to boost learning</td><td>self-training, label propagation</td><td>photo tagging, medical images with few expert labels</td></tr>
    <tr><td><strong>Reinforcement</strong></td><td>no dataset; rewards from interaction</td><td>learn a policy that maximises reward</td><td>Q-learning, SARSA, deep RL</td><td>game playing, robotics</td></tr>
  </tbody>
</table>

<h3>3. Supervised: regression vs classification</h3>
<table>
  <thead><tr><th></th><th>Regression</th><th>Classification</th></tr></thead>
  <tbody>
    <tr><td>Output</td><td>continuous number</td><td>discrete class</td></tr>
    <tr><td>Question</td><td>"how much / how many?"</td><td>"which category?"</td></tr>
    <tr><td>Example</td><td>house price, temperature</td><td>spam or not, disease yes/no, digit 0–9</td></tr>
    <tr><td>Metrics</td><td>MAE, MSE, RMSE, R²</td><td>accuracy, precision, recall, F1</td></tr>
  </tbody>
</table>

<h3>4. Other terms worth knowing</h3>
<ul>
  <li><strong>Batch vs online learning</strong> — train once on all data vs update continuously as data arrives.</li>
  <li><strong>Instance-based vs model-based</strong> — KNN memorises examples; linear regression learns parameters.</li>
  <li><strong>Features</strong> (inputs, X) and <strong>label/target</strong> (output, y).</li>
  <li><strong>Parameters</strong> are learned (weights); <strong>hyperparameters</strong> are set before training (k in KNN, tree depth).</li>
</ul>
"""
    + check("Grouping customers by purchasing behaviour without any predefined groups is:",
            ["Supervised regression", "Supervised classification", "Unsupervised learning (clustering)", "Reinforcement learning"], "c",
            "There are no labels; the algorithm discovers groups on its own.")
    + check("Predicting tomorrow's temperature in °C is a:",
            ["classification problem", "regression problem", "clustering problem", "association problem"], "b",
            "The target is a continuous numeric value.")
))

TOPICS.append(topic(
    "Python for ML — Jupyter, Colab, NumPy, Pandas, Matplotlib & Scikit-Learn",
    "Lectures 7–9 · the toolkit you will use in every lab",
    r"""
<h3>1. Jupyter Notebook and Google Colab</h3>
<table>
  <thead><tr><th></th><th>Jupyter Notebook</th><th>Google Colab</th></tr></thead>
  <tbody>
    <tr><td>Runs</td><td>locally (<code>pip install notebook</code>, then <code>jupyter notebook</code>)</td><td>in the browser on Google's servers</td></tr>
    <tr><td>Setup</td><td>install Python and libraries</td><td>none; common libraries pre-installed</td></tr>
    <tr><td>Hardware</td><td>your machine</td><td>free GPU/TPU (limited sessions)</td></tr>
    <tr><td>Files</td><td>local disk</td><td>Google Drive, uploads</td></tr>
  </tbody>
</table>
<p>Both use <strong>cells</strong>: code cells run with Shift + Enter; markdown cells hold notes. Variables persist between cells — restart and "Run all" before submitting.</p>

<h3>2. NumPy — fast numerical arrays</h3>
<pre><code class="language-python">import numpy as np

a = np.array([1, 2, 3, 4])
m = np.array([[1, 2], [3, 4]])

print(a.shape, m.shape)          # (4,) (2, 2)
print(a * 2, a + 10)             # vectorised: [2 4 6 8] [11 12 13 14]
print(m @ m)                     # matrix multiply: [[ 7 10] [15 22]]
print(m.T)                       # transpose
print(a.mean(), a.std(), a.sum())
print(np.zeros((2, 3)), np.ones(3), np.arange(0, 10, 2), np.linspace(0, 1, 5))
print(a[a > 2])                  # boolean indexing: [3 4]
print(np.random.default_rng(42).normal(0, 1, size=3))   # reproducible random numbers
b = np.arange(12).reshape(3, 4)  # 3 rows, 4 columns
print(b[:, 1])                   # second column: [1 5 9]</code></pre>
<div class="callout callout-key"><strong>Why NumPy:</strong> operations run in compiled C over contiguous memory, so vectorised code is often 10–100× faster than Python loops. <strong>Broadcasting</strong> lets arrays of different shapes combine (e.g. adding a row vector to every row of a matrix).</div>

<h3>3. Pandas — tabular data</h3>
<pre><code class="language-python">import pandas as pd

df = pd.read_csv("students.csv")
df.head()          # first 5 rows
df.info()          # column types and non-null counts
df.describe()      # count, mean, std, min, quartiles, max
df.isnull().sum()  # missing values per column

df["percent"] = df["marks"] / 100 * 100            # new column
toppers = df[df["marks"] >= 90]                     # filter rows
df.loc[df["city"] == "Chandigarh", ["name", "marks"]]
df.groupby("branch")["marks"].mean()               # average per group
df.sort_values("marks", ascending=False)
df["city"].value_counts()
df.drop(columns=["roll_no"])
pd.merge(df, fees, on="student_id", how="left")    # SQL-style join</code></pre>
<p><strong>Series</strong> = one column (1-D); <strong>DataFrame</strong> = table of Series. <code>loc</code> selects by label, <code>iloc</code> by integer position.</p>

<h3>4. Matplotlib — visualisation</h3>
<pre><code class="language-python">import matplotlib.pyplot as plt

plt.plot(x, y, label="train loss")    # line
plt.scatter(df["area"], df["price"])   # relationship between two variables
plt.hist(df["marks"], bins=10)         # distribution
plt.bar(categories, counts)            # compare categories
plt.boxplot(df["salary"])              # spread and outliers
plt.xlabel("Area (sq ft)"); plt.ylabel("Price"); plt.title("Price vs Area"); plt.legend()
plt.show()</code></pre>

<h3>5. Scikit-learn — one consistent API</h3>
<pre><code class="language-python">from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # learn mean/std from TRAINING data only
X_test = scaler.transform(X_test)         # reuse them on test data

model = LogisticRegression()
model.fit(X_train, y_train)               # learn parameters
pred = model.predict(X_test)              # use them
print(accuracy_score(y_test, pred))</code></pre>
<table>
  <thead><tr><th>Object</th><th>Methods</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Estimator (model)</td><td><code>fit(X, y)</code>, <code>predict(X)</code>, <code>score(X, y)</code></td><td>LinearRegression, KNeighborsClassifier, DecisionTreeClassifier</td></tr>
    <tr><td>Transformer</td><td><code>fit</code>, <code>transform</code>, <code>fit_transform</code></td><td>StandardScaler, OneHotEncoder, SimpleImputer, PCA</td></tr>
    <tr><td>Pipeline</td><td>chains transformers + a model</td><td><code>make_pipeline(StandardScaler(), SVC())</code></td></tr>
  </tbody>
</table>
"""
    + check("Which scikit-learn call should be used on the TEST set after fitting a StandardScaler on the training set?",
            ["fit_transform(X_test)", "transform(X_test)", "fit(X_test)", "predict(X_test)"], "b",
            "Fitting on test data leaks information; reuse the training mean and standard deviation with transform().")
))

TOPICS.append(topic(
    "Data Pre-processing — Collection, Cleaning, Missing Values, Integration, Transformation & Reduction",
    "Lectures 10–12 · most of the real work in ML",
    r"""
<p>Real data is incomplete, noisy and inconsistent. Pre-processing typically takes the <strong>largest share of an ML project's time</strong> and has more effect on results than the choice of algorithm.</p>

<h3>1. Data collection</h3>
<p>Sources: company databases, surveys, sensors/IoT, web scraping, APIs, public datasets (Kaggle, UCI, government portals).
Check that data is <strong>relevant, representative, sufficient and legally usable</strong>.</p>

<h3>2. Data cleaning</h3>
<ul>
  <li>Remove <strong>duplicates</strong>: <code>df.drop_duplicates()</code></li>
  <li>Fix <strong>inconsistent formats</strong>: "Male", "M", "male" → one value; dates to one format</li>
  <li>Correct <strong>data types</strong>: numbers stored as text</li>
  <li>Handle <strong>outliers</strong> (below)</li>
  <li>Handle <strong>missing values</strong> (below)</li>
</ul>

<h3>3. Handling missing values</h3>
<table>
  <thead><tr><th>Strategy</th><th>When</th><th>Code</th></tr></thead>
  <tbody>
    <tr><td>Delete rows</td><td>few rows missing, lots of data</td><td><code>df.dropna()</code></td></tr>
    <tr><td>Delete column</td><td>column mostly empty (e.g. &gt; 60% missing)</td><td><code>df.drop(columns=["col"])</code></td></tr>
    <tr><td>Mean imputation</td><td>numeric, roughly symmetric</td><td><code>df["age"].fillna(df["age"].mean())</code></td></tr>
    <tr><td>Median imputation</td><td>numeric with outliers / skew</td><td><code>df["income"].fillna(df["income"].median())</code></td></tr>
    <tr><td>Mode imputation</td><td>categorical</td><td><code>df["city"].fillna(df["city"].mode()[0])</code></td></tr>
    <tr><td>Forward / backward fill</td><td>time series</td><td><code>df.ffill()</code></td></tr>
    <tr><td>Model-based (KNN imputer)</td><td>values predictable from other columns</td><td><code>KNNImputer(n_neighbors=5)</code></td></tr>
  </tbody>
</table>

<h3>4. Outliers — the IQR rule</h3>
<div class="formula">\[ IQR = Q_3 - Q_1, \qquad \text{outlier if } x < Q_1 - 1.5\,IQR \ \text{ or } \ x > Q_3 + 1.5\,IQR \]</div>
<details class="solution"><summary>Worked example</summary>
<p>Marks: 45, 50, 52, 55, 58, 60, 62, 98. Using the median-of-halves method, Q₁ = (50 + 52) / 2 = 51, Q₃ = (60 + 62) / 2 = 61, IQR = 10.</p>
<p>Fences: 51 − 15 = 36 and 61 + 15 = 76. The value <strong>98 is an outlier</strong>.</p>
</details>
<p>Z-score alternative: flag |z| &gt; 3 where z = (x − μ) / σ. Treat outliers by removal, capping (winsorising), or log transform — but check they are errors first.</p>

<h3>5. Data integration</h3>
<p>Combining multiple sources into one dataset. Problems: <strong>entity resolution</strong> (same customer, different IDs), schema conflicts
("cust_id" vs "customer_id"), unit conflicts (kg vs lb), and <strong>redundancy</strong> (correlated duplicate attributes). Tools: <code>pd.merge</code>, <code>pd.concat</code>.</p>

<h3>6. Data transformation — encoding categorical data</h3>
<table>
  <thead><tr><th>Encoding</th><th>Result for colour ∈ {red, green, blue}</th><th>Use for</th></tr></thead>
  <tbody>
    <tr><td>Label encoding</td><td>blue=0, green=1, red=2</td><td>target labels; tree models</td></tr>
    <tr><td>Ordinal encoding</td><td>low=0 &lt; medium=1 &lt; high=2 (order you define)</td><td>truly ordered categories</td></tr>
    <tr><td>One-hot encoding</td><td>three 0/1 columns: is_red, is_green, is_blue</td><td>nominal categories with linear models, KNN, SVM</td></tr>
  </tbody>
</table>
<div class="callout callout-warning"><strong>Why not label-encode "city" for linear regression?</strong> It invents a false order (Delhi=0 &lt; Mumbai=1 &lt; Pune=2) that the model will treat as meaningful. Use one-hot encoding.</div>
<pre><code class="language-python">pd.get_dummies(df, columns=["city"], drop_first=True)   # drop_first avoids the dummy-variable trap
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
OneHotEncoder(handle_unknown="ignore").fit_transform(df[["city"]])</code></pre>
<p>Other transformations: log transform for skewed data, binning (age → age groups), extracting parts of dates, normalisation/standardisation (next topic).</p>

<h3>7. Data reduction</h3>
<ul>
  <li><strong>Dimensionality reduction</strong> — fewer features (feature selection, PCA).</li>
  <li><strong>Numerosity reduction</strong> — fewer rows (sampling, aggregation, clustering representatives).</li>
  <li><strong>Data compression</strong> — encode more compactly.</li>
</ul>
"""
    + check("A numeric salary column has a few extreme values and 5% missing entries. The most robust simple imputation is:",
            ["mean", "median", "mode", "replace with 0"], "b",
            "The median is not pulled by extreme values, unlike the mean.")
))

TOPICS.append(topic(
    "Feature Scaling, Feature Engineering & Train/Test Preparation",
    "Lectures 10–12 · normalisation, standardisation, selection, extraction, splitting",
    r"""
<h3>1. Why scale features?</h3>
<p>If "salary" ranges 10,000–10,00,000 and "age" ranges 18–60, distance-based and gradient-based algorithms are dominated by salary.
<strong>Scale-sensitive:</strong> KNN, K-Means, SVM, PCA, logistic/linear regression with gradient descent, neural networks.
<strong>Not sensitive:</strong> decision trees, random forests, Naive Bayes.</p>

<h3>2. Normalisation (min–max scaling) → range [0, 1]</h3>
<div class="formula">\[ x' = \frac{x - x_{min}}{x_{max} - x_{min}} \]</div>

<h3>3. Standardisation (z-score) → mean 0, standard deviation 1</h3>
<div class="formula">\[ z = \frac{x - \mu}{\sigma} \]</div>

<details class="solution"><summary>Worked example — both scalings on ages 20, 30, 40, 50, 60</summary>
<p>Min–max: x_min = 20, x_max = 60, range 40 → 0, 0.25, 0.5, 0.75, 1.</p>
<p>Standardisation: μ = 40. Squared deviations 400, 100, 0, 100, 400 → mean 200 → σ = √200 ≈ 14.14 (population).
z = −1.41, −0.71, 0, 0.71, 1.41.</p>
</details>

<table>
  <thead><tr><th></th><th>Normalisation</th><th>Standardisation</th></tr></thead>
  <tbody>
    <tr><td>Range</td><td>fixed [0, 1]</td><td>unbounded, centred at 0</td></tr>
    <tr><td>Outliers</td><td>very sensitive (one outlier squashes the rest)</td><td>less sensitive</td></tr>
    <tr><td>Use when</td><td>need bounded inputs (images, neural nets), no strong outliers</td><td>algorithm assumes centred data (SVM, PCA, logistic regression); default choice</td></tr>
    <tr><td>sklearn</td><td><code>MinMaxScaler</code></td><td><code>StandardScaler</code></td></tr>
  </tbody>
</table>
<p><code>RobustScaler</code> uses median and IQR — best when outliers are present.</p>

<h3>4. Feature engineering</h3>
<p>Creating better input variables using domain knowledge — often the biggest accuracy win.</p>
<ul>
  <li>From dates: day of week, month, is_weekend, days since signup</li>
  <li>Ratios and combinations: price per square foot, BMI = weight / height²</li>
  <li>Binning: age → child / adult / senior</li>
  <li>Text: word counts, TF-IDF</li>
  <li>Interaction and polynomial features: x₁·x₂, x²</li>
</ul>

<h3>5. Feature selection — keep the useful columns</h3>
<table>
  <thead><tr><th>Method</th><th>How</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td><strong>Filter</strong></td><td>score each feature independently of any model</td><td>correlation, chi-square, mutual information, variance threshold</td></tr>
    <tr><td><strong>Wrapper</strong></td><td>train models on feature subsets and compare</td><td>forward selection, backward elimination, RFE</td></tr>
    <tr><td><strong>Embedded</strong></td><td>selection happens during training</td><td>Lasso (L1) shrinks weights to 0, tree feature importances</td></tr>
  </tbody>
</table>

<h3>6. Feature extraction — build new, fewer features</h3>
<p>Transform the original features into a smaller set that keeps most information: <strong>PCA</strong> (End Term topic), LDA, autoencoders.
Selection keeps original columns; extraction creates new combined ones.</p>

<h3>7. Preparing training and testing datasets</h3>
<ul>
  <li><strong>Train set</strong> (≈ 70–80%) — fit the model.</li>
  <li><strong>Validation set</strong> — tune hyperparameters (or use cross-validation).</li>
  <li><strong>Test set</strong> (≈ 20–30%) — touched <strong>once</strong>, for the final unbiased estimate.</li>
  <li><code>stratify=y</code> keeps class proportions equal in both splits (important for imbalanced classes).</li>
  <li><code>random_state</code> makes the split reproducible.</li>
</ul>
<div class="callout callout-warning"><strong>Data leakage:</strong> computing scaling statistics, imputation values or feature selection on the whole dataset before splitting lets test information into training and inflates scores. Fit every transformer on the training split only — a <code>Pipeline</code> enforces this.</div>
"""
    + check("Heights 150, 160, 170, 180 cm are min–max normalised. What does 170 become?",
            ["0.5", "0.67", "0.75", "0.33"], "b",
            "(170 − 150) / (180 − 150) = 20 / 30 ≈ 0.67.")
    + check("Which algorithm is NOT affected by feature scaling?",
            ["KNN", "SVM", "Decision tree", "K-Means"], "c",
            "Trees split on thresholds of one feature at a time, so rescaling does not change the splits.")
))

TOPICS.append(topic(
    "Supervised Learning: Regression — Linear, Multiple, Polynomial & Metrics (MAE, MSE, RMSE, R²)",
    "Lectures 13–15 · predicting a number",
    r"""
<h3>1. Simple linear regression</h3>
<div class="formula">\[ \hat{y} = \beta_0 + \beta_1 x \]</div>
<p>β₁ is the slope (change in y per unit x) and β₀ the intercept. <strong>Ordinary least squares</strong> picks them to minimise the sum of squared errors Σ(y − ŷ)².</p>
<div class="formula">\[ \beta_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}, \qquad \beta_0 = \bar{y} - \beta_1 \bar{x} \]</div>

<details class="solution"><summary>Worked example — study hours vs marks</summary>
<table>
  <thead><tr><th>x (hours)</th><th>y (marks)</th><th>x − x̄</th><th>y − ȳ</th><th>(x − x̄)(y − ȳ)</th><th>(x − x̄)²</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>2</td><td>−2</td><td>−2</td><td>4</td><td>4</td></tr>
    <tr><td>2</td><td>4</td><td>−1</td><td>0</td><td>0</td><td>1</td></tr>
    <tr><td>3</td><td>5</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
    <tr><td>4</td><td>4</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
    <tr><td>5</td><td>5</td><td>2</td><td>1</td><td>2</td><td>4</td></tr>
    <tr><td colspan="4">x̄ = 3, ȳ = 4</td><td><strong>6</strong></td><td><strong>10</strong></td></tr>
  </tbody>
</table>
<p>β₁ = 6 / 10 = 0.6 and β₀ = 4 − 0.6 × 3 = 2.2, so <strong>ŷ = 2.2 + 0.6x</strong>. For 6 hours: ŷ = 5.8.</p>
</details>

<h3>2. Assumptions of linear regression</h3>
<ul>
  <li><strong>Linearity</strong> between features and target</li>
  <li><strong>Independence</strong> of errors</li>
  <li><strong>Homoscedasticity</strong> — constant error variance</li>
  <li><strong>Normality</strong> of residuals (for inference)</li>
  <li>No strong <strong>multicollinearity</strong> among features (multiple regression)</li>
</ul>

<h3>3. Multiple linear regression</h3>
<div class="formula">\[ \hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_n x_n \]</div>
<p>Example: price = β₀ + β₁·area + β₂·bedrooms + β₃·age. Each βᵢ is the effect of xᵢ <em>holding the others constant</em>.
In matrix form the least-squares solution is β = (XᵀX)⁻¹Xᵀy; for large data, gradient descent is used instead.</p>

<h3>4. Polynomial regression</h3>
<div class="formula">\[ \hat{y} = \beta_0 + \beta_1 x + \beta_2 x^2 + \dots + \beta_d x^d \]</div>
<p>Still <em>linear in the parameters</em> — we just add powers of x as features. Low degree underfits curved data; very high degree overfits (wiggles through every point).</p>
<pre><code class="language-python">from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression

model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
model.fit(X_train, y_train)</code></pre>

<h3>5. Gradient descent in one line</h3>
<div class="formula">\[ \beta_j := \beta_j - \alpha \frac{\partial J}{\partial \beta_j}, \qquad J = \frac{1}{n}\sum (y_i - \hat{y}_i)^2 \]</div>
<p>α is the learning rate: too small → slow; too large → overshoots and diverges.</p>

<h3>6. Regression metrics</h3>
<table>
  <thead><tr><th>Metric</th><th>Formula</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td><strong>MAE</strong></td><td>\( \frac{1}{n}\sum |y - \hat{y}| \)</td><td>same units as y; robust to outliers</td></tr>
    <tr><td><strong>MSE</strong></td><td>\( \frac{1}{n}\sum (y - \hat{y})^2 \)</td><td>squared units; punishes large errors</td></tr>
    <tr><td><strong>RMSE</strong></td><td>\( \sqrt{MSE} \)</td><td>back to y's units; still penalises big errors</td></tr>
    <tr><td><strong>R²</strong></td><td>\( 1 - \frac{\sum (y - \hat{y})^2}{\sum (y - \bar{y})^2} \)</td><td>share of variance explained; 1 is perfect, 0 = predicting the mean, can be negative</td></tr>
  </tbody>
</table>

<details class="solution"><summary>Worked example — metrics for the model above</summary>
<p>Predictions ŷ = 2.8, 3.4, 4.0, 4.6, 5.2 for actual y = 2, 4, 5, 4, 5.</p>
<p>Errors: −0.8, 0.6, 1.0, −0.6, −0.2. &nbsp; |errors| sum = 3.2 → <strong>MAE = 0.64</strong>.</p>
<p>Squared errors: 0.64, 0.36, 1.00, 0.36, 0.04 → sum SSE = 2.4 → <strong>MSE = 0.48</strong>, <strong>RMSE ≈ 0.693</strong>.</p>
<p>Total sum of squares Σ(y − ȳ)² = 4 + 0 + 1 + 0 + 1 = 6 → <strong>R² = 1 − 2.4 / 6 = 0.6</strong>.</p>
</details>
<p><strong>Adjusted R²</strong> penalises adding useless features: \( 1 - (1 - R^2)\frac{n-1}{n-p-1} \).</p>
"""
    + check("A model predicts 10, 20, 30 for true values 12, 18, 33. What is the MAE?",
            ["2.33", "7", "5.67", "3"], "a",
            "Absolute errors are 2, 2 and 3; their mean is 7 / 3 ≈ 2.33.")
    + check("R² = 0 means the model:",
            ["is perfect", "does no better than always predicting the mean", "has zero MAE", "is overfitting"], "b",
            "The model's squared error equals that of the constant mean prediction.")
))

TOPICS.append(topic(
    "Classification I — Logistic Regression & K-Nearest Neighbours",
    "Lectures 16–18 · probabilities and neighbours",
    r"""
<h3>1. Logistic regression</h3>
<p>Despite the name, it is a <strong>classification</strong> algorithm. It computes a linear score and squashes it into a probability with the <strong>sigmoid</strong>:</p>
<div class="formula">\[ z = \beta_0 + \beta_1 x_1 + \dots + \beta_n x_n, \qquad \sigma(z) = \frac{1}{1 + e^{-z}}, \qquad P(y = 1 \mid x) = \sigma(z) \]</div>
<ul>
  <li>σ(0) = 0.5, σ(large positive) → 1, σ(large negative) → 0.</li>
  <li>Predict class 1 if probability ≥ threshold (default 0.5). Lowering the threshold raises recall and lowers precision.</li>
  <li>The decision boundary (z = 0) is <strong>linear</strong> in the features.</li>
  <li>Trained by minimising <strong>log loss</strong> (binary cross-entropy), not squared error:
  \( -\frac{1}{n}\sum [y\log p + (1-y)\log(1-p)] \)</li>
  <li>Coefficients are interpretable: e^β is the <strong>odds ratio</strong> for a one-unit increase in that feature.</li>
  <li>Multi-class: one-vs-rest, or softmax (multinomial) regression.</li>
</ul>
<details class="solution"><summary>Worked example</summary>
<p>Pass/fail model: z = −4 + 0.8 × hours. For 6 hours, z = 0.8 and σ(0.8) = 1 / (1 + e^−0.8) ≈ 1 / (1 + 0.449) ≈ <strong>0.69</strong> → predict pass.
For 4 hours, z = −0.8 → σ ≈ 0.31 → predict fail. The boundary is at 5 hours (z = 0).</p>
</details>
<pre><code class="language-python">from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
proba = clf.predict_proba(X_test)[:, 1]     # probability of class 1
pred = (proba >= 0.5).astype(int)</code></pre>

<h3>2. K-Nearest Neighbours (KNN)</h3>
<p>A <strong>lazy, instance-based, non-parametric</strong> learner: no training phase beyond storing the data.
To classify a point, find the k closest training points and take a <strong>majority vote</strong> (average for KNN regression).</p>
<div class="formula">\[ d_{Euclidean} = \sqrt{\sum (x_i - y_i)^2}, \qquad d_{Manhattan} = \sum |x_i - y_i| \]</div>

<details class="solution"><summary>Worked example — k = 3</summary>
<table>
  <thead><tr><th>Point</th><th>(x₁, x₂)</th><th>Class</th><th>Distance to (3, 4)</th></tr></thead>
  <tbody>
    <tr><td>A</td><td>(1, 2)</td><td>Red</td><td>√(4 + 4) = 2.83</td></tr>
    <tr><td>B</td><td>(2, 3)</td><td>Red</td><td>√(1 + 1) = 1.41</td></tr>
    <tr><td>C</td><td>(4, 4)</td><td>Blue</td><td>√(1 + 0) = 1.00</td></tr>
    <tr><td>D</td><td>(5, 6)</td><td>Blue</td><td>√(4 + 4) = 2.83</td></tr>
    <tr><td>E</td><td>(3, 6)</td><td>Blue</td><td>√(0 + 4) = 2.00</td></tr>
  </tbody>
</table>
<p>Nearest three: C (Blue, 1.00), B (Red, 1.41), E (Blue, 2.00) → 2 Blue vs 1 Red → <strong>Blue</strong>.</p>
</details>

<h3>3. Choosing k</h3>
<ul>
  <li><strong>Small k</strong> (e.g. 1): very flexible, sensitive to noise → overfitting (high variance).</li>
  <li><strong>Large k</strong>: smoother boundary → underfitting (high bias).</li>
  <li>Use an <strong>odd k</strong> for binary problems to avoid ties; tune with cross-validation. A common starting point is k ≈ √n.</li>
</ul>

<h3>4. KNN pros and cons</h3>
<table>
  <thead><tr><th>Pros</th><th>Cons</th></tr></thead>
  <tbody>
    <tr><td>simple, no training time, naturally multi-class, non-linear boundaries</td><td>slow prediction (distance to every point), needs feature scaling, suffers from the curse of dimensionality, memory heavy</td></tr>
  </tbody>
</table>
"""
    + check("In logistic regression, σ(0) equals:",
            ["0", "0.5", "1", "e"], "b",
            "1 / (1 + e⁰) = 1 / 2.")
    + check("Setting k = 1 in KNN tends to cause:",
            ["underfitting", "overfitting", "no effect", "faster training"], "b",
            "The prediction follows single noisy neighbours, giving a jagged, high-variance boundary.")
))

TOPICS.append(topic(
    "Classification II — Decision Trees, Random Forest, Naive Bayes & SVM",
    "Lectures 16–18 · trees, ensembles, probability and margins",
    r"""
<h3>1. Decision trees</h3>
<p>A flowchart of feature tests. Internal nodes test a feature, branches are outcomes, leaves give a class. The tree is built top-down by choosing, at each node,
the split that makes the children <strong>purest</strong>.</p>
<div class="formula">\[ Entropy(S) = -\sum_i p_i \log_2 p_i \qquad Gini(S) = 1 - \sum_i p_i^2 \]</div>
<div class="formula">\[ Information\ Gain = Entropy(parent) - \sum_{child} \frac{|S_{child}|}{|S|} \, Entropy(child) \]</div>
<p>ID3 uses information gain, C4.5 uses gain ratio, CART (scikit-learn) uses Gini by default.</p>

<details class="solution"><summary>Worked example — entropy and information gain</summary>
<p>14 days: 9 "Play = Yes", 5 "No". Entropy = −(9/14)log₂(9/14) − (5/14)log₂(5/14) ≈ 0.410 + 0.530 = <strong>0.940</strong>.</p>
<p>Split on <em>Wind</em>: Weak has 8 days (6 Yes, 2 No) → entropy 0.811; Strong has 6 days (3 Yes, 3 No) → entropy 1.0.</p>
<p>Weighted child entropy = (8/14)(0.811) + (6/14)(1.0) = 0.463 + 0.429 = 0.892. &nbsp; <strong>Gain(Wind) = 0.940 − 0.892 = 0.048</strong>.</p>
<p>Gini of the parent = 1 − (9/14)² − (5/14)² = 1 − 0.413 − 0.128 ≈ <strong>0.459</strong>.</p>
</details>
<p>Pure node: entropy 0, Gini 0. A 50/50 binary node: entropy 1, Gini 0.5.</p>
<p><strong>Overfitting control (pruning):</strong> <code>max_depth</code>, <code>min_samples_split</code>, <code>min_samples_leaf</code>, or cost-complexity post-pruning (<code>ccp_alpha</code>).</p>

<h3>2. Random forest</h3>
<p>An <strong>ensemble</strong> of many decision trees, each trained on a <strong>bootstrap sample</strong> (random rows with replacement — <em>bagging</em>)
and considering only a <strong>random subset of features</strong> at each split. Predictions are combined by majority vote (classification) or averaging (regression).</p>
<ul>
  <li>Reduces variance and overfitting compared with one deep tree.</li>
  <li><strong>Out-of-bag (OOB)</strong> rows (about 37% per tree) give a free validation estimate.</li>
  <li>Provides <strong>feature importances</strong>.</li>
  <li>Less interpretable and slower than a single tree.</li>
</ul>

<h3>3. Naive Bayes</h3>
<div class="formula">\[ P(C \mid X) = \frac{P(X \mid C)\,P(C)}{P(X)} \]</div>
<p>"Naive" because it assumes features are <strong>conditionally independent</strong> given the class, so P(X | C) = Π P(xᵢ | C). Pick the class with the highest posterior.</p>
<details class="solution"><summary>Worked example — spam filter</summary>
<p>P(spam) = 0.4, P(ham) = 0.6. P("offer" | spam) = 0.5, P("offer" | ham) = 0.1. P("free" | spam) = 0.6, P("free" | ham) = 0.2.</p>
<p>Email contains both words:</p>
<p>spam score = 0.4 × 0.5 × 0.6 = 0.12 &nbsp;&nbsp; ham score = 0.6 × 0.1 × 0.2 = 0.012</p>
<p>P(spam | email) = 0.12 / (0.12 + 0.012) ≈ <strong>0.91</strong> → spam.</p>
</details>
<table>
  <thead><tr><th>Variant</th><th>Features</th></tr></thead>
  <tbody>
    <tr><td>Gaussian NB</td><td>continuous, assumed normal</td></tr>
    <tr><td>Multinomial NB</td><td>counts (word frequencies in text)</td></tr>
    <tr><td>Bernoulli NB</td><td>binary presence/absence</td></tr>
  </tbody>
</table>
<p><strong>Laplace smoothing</strong> adds 1 to counts so an unseen word does not make a probability zero. Naive Bayes is very fast and strong for text classification.</p>

<h3>4. Support Vector Machine (SVM)</h3>
<p>Finds the <strong>hyperplane</strong> that separates classes with the <strong>maximum margin</strong>. The training points closest to the boundary are the
<strong>support vectors</strong>; only they determine the boundary.</p>
<div class="formula">\[ w \cdot x + b = 0, \qquad margin = \frac{2}{\lVert w \rVert} \]</div>
<ul>
  <li><strong>Hard margin</strong> — no misclassification allowed (only for separable data).</li>
  <li><strong>Soft margin</strong> — hyperparameter <strong>C</strong>: large C = narrow margin, fewer training errors (risk overfitting); small C = wider margin, more tolerance.</li>
  <li><strong>Kernel trick</strong> — implicitly maps data into higher dimensions where it becomes separable: linear, polynomial, <strong>RBF (Gaussian)</strong>, sigmoid.
  RBF's <strong>γ</strong> controls reach: large γ → very local, wiggly boundary.</li>
  <li>Needs feature scaling; slow on very large datasets; excellent in high dimensions (text).</li>
</ul>

<h3>5. Choosing among classifiers</h3>
<table>
  <thead><tr><th>Algorithm</th><th>Strength</th><th>Weakness</th></tr></thead>
  <tbody>
    <tr><td>Logistic regression</td><td>fast, interpretable, probabilities</td><td>linear boundary</td></tr>
    <tr><td>KNN</td><td>simple, non-linear</td><td>slow prediction, needs scaling</td></tr>
    <tr><td>Decision tree</td><td>interpretable, no scaling, handles mixed data</td><td>overfits, unstable</td></tr>
    <tr><td>Random forest</td><td>accurate, robust, feature importance</td><td>less interpretable, heavier</td></tr>
    <tr><td>Naive Bayes</td><td>very fast, great for text, small data</td><td>independence assumption</td></tr>
    <tr><td>SVM</td><td>effective in high dimensions, kernels for non-linear</td><td>slow on big data, tuning C/γ</td></tr>
  </tbody>
</table>
"""
    + check("A node contains 4 positive and 4 negative samples. Its Gini impurity is:",
            ["0", "0.25", "0.5", "1"], "c",
            "1 − (0.5² + 0.5²) = 1 − 0.5 = 0.5.")
    + check("In an SVM, the training points that lie closest to the decision boundary are called:",
            ["centroids", "support vectors", "kernels", "outliers"], "b",
            "Support vectors define the margin; removing other points does not change the boundary.")
    + check("Random forest reduces overfitting mainly by:",
            ["using one very deep tree", "averaging many trees trained on bootstrap samples with random feature subsets",
             "removing all features", "scaling the data"], "b",
            "Bagging plus feature randomness decorrelates the trees, so averaging them lowers variance.")
))

TOPICS.append(topic(
    "Model Evaluation & Validation — Splits, Cross-Validation, Bias–Variance, Confusion Matrix & Metrics",
    "Lectures 19–21 · measuring whether a model is actually good",
    r"""
<h3>1. Train–test split and cross-validation</h3>
<ul>
  <li><strong>Hold-out:</strong> one split (e.g. 80/20). Fast but the score depends on which rows landed in the test set.</li>
  <li><strong>k-fold cross-validation:</strong> split into k folds; train on k − 1, test on the remaining one; repeat k times and average. Common k = 5 or 10.</li>
  <li><strong>Stratified k-fold:</strong> each fold keeps the class ratio — use for classification, especially imbalanced data.</li>
  <li><strong>Leave-one-out (LOOCV):</strong> k = n. Nearly unbiased but expensive.</li>
  <li><strong>Time-series split:</strong> always train on the past and test on the future — never shuffle time.</li>
</ul>
<pre><code class="language-python">from sklearn.model_selection import cross_val_score, StratifiedKFold, GridSearchCV
scores = cross_val_score(model, X, y, cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=42))
print(scores.mean(), scores.std())

grid = GridSearchCV(KNeighborsClassifier(), {"n_neighbors": [3, 5, 7, 9]}, cv=5)
grid.fit(X_train, y_train)
print(grid.best_params_)</code></pre>

<h3>2. Overfitting, underfitting and the bias–variance trade-off</h3>
<table>
  <thead><tr><th></th><th>Underfitting</th><th>Good fit</th><th>Overfitting</th></tr></thead>
  <tbody>
    <tr><td>Training error</td><td>high</td><td>low</td><td>very low</td></tr>
    <tr><td>Test error</td><td>high</td><td>low</td><td>high</td></tr>
    <tr><td>Bias / variance</td><td>high bias</td><td>balanced</td><td>high variance</td></tr>
    <tr><td>Cause</td><td>model too simple, too few features</td><td>—</td><td>model too complex, too little data, noise memorised</td></tr>
    <tr><td>Fix</td><td>more features, more complex model, less regularisation</td><td>—</td><td>more data, simpler model, regularisation (L1/L2), pruning, dropout, cross-validation, early stopping</td></tr>
  </tbody>
</table>
<div class="formula">\[ Expected\ error = Bias^2 + Variance + Irreducible\ noise \]</div>
<p><strong>Bias</strong> is error from wrong assumptions (a straight line for curved data). <strong>Variance</strong> is sensitivity to the particular training sample.
Increasing complexity lowers bias and raises variance; the best model minimises their sum.</p>

<h3>3. Confusion matrix</h3>
<table>
  <thead><tr><th></th><th>Predicted Positive</th><th>Predicted Negative</th></tr></thead>
  <tbody>
    <tr><td><strong>Actual Positive</strong></td><td>TP (true positive)</td><td>FN (false negative) — Type II error</td></tr>
    <tr><td><strong>Actual Negative</strong></td><td>FP (false positive) — Type I error</td><td>TN (true negative)</td></tr>
  </tbody>
</table>

<h3>4. Metrics</h3>
<div class="formula">\[ Accuracy = \frac{TP + TN}{TP + TN + FP + FN} \qquad Precision = \frac{TP}{TP + FP} \]
\[ Recall\ (Sensitivity) = \frac{TP}{TP + FN} \qquad F1 = 2 \cdot \frac{Precision \cdot Recall}{Precision + Recall} \]
\[ Specificity = \frac{TN}{TN + FP} \]</div>

<details class="solution"><summary>Worked example — disease test on 100 patients</summary>
<p>TP = 40, FN = 10, FP = 5, TN = 45.</p>
<p>Accuracy = (40 + 45) / 100 = <strong>0.85</strong></p>
<p>Precision = 40 / (40 + 5) = <strong>0.889</strong></p>
<p>Recall = 40 / (40 + 10) = <strong>0.80</strong></p>
<p>F1 = 2 × 0.889 × 0.80 / (0.889 + 0.80) = 1.422 / 1.689 ≈ <strong>0.842</strong></p>
<p>Specificity = 45 / (45 + 5) = <strong>0.90</strong></p>
</details>

<h3>5. Which metric when?</h3>
<table>
  <thead><tr><th>Situation</th><th>Prioritise</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Cancer screening, fraud detection</td><td><strong>Recall</strong></td><td>missing a positive (FN) is very costly</td></tr>
    <tr><td>Spam filter, recommending a risky loan approval</td><td><strong>Precision</strong></td><td>a false alarm (FP) is costly — good mail lost</td></tr>
    <tr><td>Imbalanced classes, need a balance</td><td><strong>F1</strong></td><td>harmonic mean punishes a low value in either</td></tr>
    <tr><td>Balanced classes, equal error costs</td><td><strong>Accuracy</strong></td><td>simple and meaningful</td></tr>
  </tbody>
</table>
<div class="callout callout-warning"><strong>Accuracy paradox:</strong> if 99% of transactions are genuine, a model that always predicts "genuine" scores 99% accuracy while catching zero fraud. Check recall, precision and the confusion matrix.</div>
<p><strong>ROC curve</strong> plots recall (TPR) against FPR across thresholds; <strong>AUC</strong> = 1 is perfect, 0.5 is random guessing.</p>
"""
    + check("TP = 30, FP = 10, FN = 20, TN = 40. What is the precision?",
            ["0.60", "0.75", "0.70", "0.67"], "b",
            "Precision = TP / (TP + FP) = 30 / 40 = 0.75.")
    + check("Same matrix (TP = 30, FP = 10, FN = 20, TN = 40). What is the recall?",
            ["0.60", "0.75", "0.70", "0.80"], "a",
            "Recall = TP / (TP + FN) = 30 / 50 = 0.60.")
    + check("Training accuracy 99%, test accuracy 62%. The model is most likely:",
            ["underfitting", "overfitting", "well generalised", "suffering from data leakage in the test set only"], "b",
            "A large gap between training and test performance is the signature of high variance.")
))

try:
    from subjects.helpers import _escape_code
    from subjects.aiml.foundations import ST1_FOUNDATIONS
    for idx, f_html in ST1_FOUNDATIONS.items():
        if idx < len(TOPICS):
            TOPICS[idx]["foundationsHtml"] = _escape_code(f_html.strip())
except ImportError:
    pass

