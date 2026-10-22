"""Artificial Intelligence & Machine Learning (24CSE0316) — End Term: lectures 22-30 (30% weightage)."""

from subjects.helpers import topic, check

TOPICS = []

TOPICS.append(topic(
    "Unsupervised Learning & K-Means Clustering",
    "Lectures 22–24 · finding groups without labels",
    r"""
<h3>1. Unsupervised learning</h3>
<p>The data has <strong>no labels</strong>. The goal is to discover structure: groups (clustering), associations (rules), compact representations (dimensionality reduction) or unusual points (anomaly detection).</p>

<h3>2. Clustering concepts</h3>
<ul>
  <li>A <strong>cluster</strong> is a set of points more similar to each other than to points in other clusters.</li>
  <li>Good clustering: <strong>high intra-cluster similarity</strong> (compact) and <strong>low inter-cluster similarity</strong> (well separated).</li>
  <li>Types: <strong>partitioning</strong> (K-Means), <strong>hierarchical</strong> (agglomerative/divisive), <strong>density-based</strong> (DBSCAN), model-based (Gaussian mixtures).</li>
</ul>

<h3>3. K-Means algorithm</h3>
<ol>
  <li>Choose k.</li>
  <li>Initialise k centroids (randomly, or with <strong>k-means++</strong> which spreads them out).</li>
  <li><strong>Assign</strong> every point to its nearest centroid (Euclidean distance).</li>
  <li><strong>Update</strong> each centroid to the mean of its assigned points.</li>
  <li>Repeat 3–4 until assignments stop changing (convergence) or a maximum number of iterations.</li>
</ol>
<p>K-Means minimises the <strong>within-cluster sum of squares (WCSS / inertia)</strong>:</p>
<div class="formula">\[ WCSS = \sum_{j=1}^{k} \sum_{x \in C_j} \lVert x - \mu_j \rVert^2 \]</div>

<details class="solution"><summary>Worked example — 1-D data, k = 2</summary>
<p>Points: 2, 4, 10, 12, 3, 20, 30, 11, 25. Initial centroids c₁ = 2, c₂ = 5.</p>
<p><strong>Iteration 1:</strong> points nearer 2 → {2, 3}; nearer 5 → {4, 10, 12, 20, 30, 11, 25}. New centroids: c₁ = 2.5, c₂ = 112 / 7 = 16.</p>
<p><strong>Iteration 2:</strong> midpoint is 9.25 → C₁ = {2, 3, 4}, C₂ = {10, 11, 12, 20, 25, 30}. Centroids: c₁ = 3, c₂ = 108 / 6 = 18.</p>
<p><strong>Iteration 3:</strong> midpoint 10.5 → C₁ = {2, 3, 4, 10}, C₂ = {11, 12, 20, 25, 30}. Centroids: c₁ = 4.75, c₂ = 98 / 5 = 19.6.</p>
<p><strong>Iteration 4:</strong> midpoint 12.175 → C₁ = {2, 3, 4, 10, 11, 12}, C₂ = {20, 25, 30}. Centroids: c₁ = 7, c₂ = 25.</p>
<p><strong>Iteration 5:</strong> midpoint 16 → same assignment → <strong>converged</strong>: {2, 3, 4, 10, 11, 12} and {20, 25, 30}.</p>
</details>

<h3>4. Choosing k — the elbow method</h3>
<p>Plot WCSS against k = 1, 2, 3, … WCSS always drops as k grows (k = n gives 0), but the drop slows sharply at the "elbow" — pick that k.
The <strong>silhouette score</strong> (next topic) is a second opinion.</p>
<pre><code class="language-python">from sklearn.cluster import KMeans
wcss = []
for k in range(1, 11):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X_scaled)
    wcss.append(km.inertia_)
# plot range(1, 11) vs wcss and look for the bend
labels = KMeans(n_clusters=4, n_init=10, random_state=42).fit_predict(X_scaled)</code></pre>

<h3>5. Strengths and limitations</h3>
<table>
  <thead><tr><th>Strengths</th><th>Limitations</th></tr></thead>
  <tbody>
    <tr><td>simple, fast, scales to large data: O(n·k·iterations)</td><td>must choose k in advance</td></tr>
    <tr><td>easy to interpret centroids</td><td>assumes spherical, similar-sized clusters</td></tr>
    <tr><td>works well on well-separated blobs</td><td>sensitive to initialisation (use k-means++, n_init) and outliers</td></tr>
    <tr><td></td><td>needs scaled numeric features; can only find convex clusters</td></tr>
  </tbody>
</table>

<h3>6. Applications of clustering</h3>
<p>customer segmentation · document/topic grouping · image compression (colour quantisation) · anomaly detection · grouping genes with similar expression ·
organising search results · recommending content to similar user groups.</p>
"""
    + check("In K-Means, after assigning points to clusters, each centroid is updated to:",
            ["the point farthest from it", "the mean of the points assigned to it", "a random point", "the median of all data"], "b",
            "The mean minimises the sum of squared distances within the cluster.")
))

TOPICS.append(topic(
    "Hierarchical Clustering, DBSCAN & Silhouette Score",
    "Lectures 22–24 · dendrograms, density and cluster quality",
    r"""
<h3>1. Hierarchical clustering</h3>
<p>Builds a tree of clusters (a <strong>dendrogram</strong>) instead of a single flat partition — no need to fix k in advance.</p>
<ul>
  <li><strong>Agglomerative (bottom-up):</strong> start with every point as its own cluster; repeatedly merge the two closest clusters until one remains. Most common.</li>
  <li><strong>Divisive (top-down):</strong> start with one cluster and split recursively.</li>
</ul>
<h4>Linkage — how "distance between clusters" is measured</h4>
<table>
  <thead><tr><th>Linkage</th><th>Distance between clusters A and B</th><th>Tendency</th></tr></thead>
  <tbody>
    <tr><td>Single</td><td>closest pair of points</td><td>long chain-like clusters</td></tr>
    <tr><td>Complete</td><td>farthest pair of points</td><td>compact clusters</td></tr>
    <tr><td>Average</td><td>average of all pairwise distances</td><td>in between</td></tr>
    <tr><td>Ward</td><td>increase in total within-cluster variance</td><td>similar-sized compact clusters (default in sklearn)</td></tr>
  </tbody>
</table>
<p><strong>Reading a dendrogram:</strong> the height of a merge is the distance at which clusters joined. Cut the tree horizontally across the tallest vertical gap —
the number of branches cut is the number of clusters.</p>
<details class="solution"><summary>Worked example — single linkage on 1-D points 1, 2, 6, 7, 15</summary>
<p>Closest pairs: (1, 2) at distance 1 and (6, 7) at distance 1 → merge both.</p>
<p>Distances now: {1,2}–{6,7} = 6 − 2 = 4; {6,7}–{15} = 8; {1,2}–{15} = 13. Merge {1,2} with {6,7} at height 4.</p>
<p>Finally merge {1,2,6,7} with {15} at height 15 − 7 = 8. Cutting between heights 4 and 8 gives two clusters: {1, 2, 6, 7} and {15}.</p>
</details>
<p>Cost: O(n²) memory and O(n²)–O(n³) time, so it suits small to medium datasets.</p>

<h3>2. DBSCAN — density-based clustering</h3>
<p>Two parameters: <strong>ε (eps)</strong>, the neighbourhood radius, and <strong>minPts</strong>, the minimum number of points to form a dense region.</p>
<table>
  <thead><tr><th>Point type</th><th>Definition</th></tr></thead>
  <tbody>
    <tr><td><strong>Core</strong></td><td>has at least minPts points (including itself) within ε</td></tr>
    <tr><td><strong>Border</strong></td><td>fewer than minPts neighbours but within ε of a core point</td></tr>
    <tr><td><strong>Noise</strong></td><td>neither — labelled −1 (outlier)</td></tr>
  </tbody>
</table>
<p>Clusters grow by connecting core points that are within ε of each other, pulling in their border points.</p>
<table>
  <thead><tr><th></th><th>K-Means</th><th>DBSCAN</th></tr></thead>
  <tbody>
    <tr><td>Number of clusters</td><td>must specify k</td><td>found automatically</td></tr>
    <tr><td>Cluster shape</td><td>spherical</td><td>arbitrary (rings, moons)</td></tr>
    <tr><td>Outliers</td><td>forced into a cluster</td><td>marked as noise</td></tr>
    <tr><td>Weakness</td><td>initialisation, k</td><td>choosing ε; clusters of very different densities</td></tr>
  </tbody>
</table>
<p>Tip: sort each point's distance to its minPts-th nearest neighbour and look for the knee of that curve to choose ε.</p>

<h3>3. Silhouette score — how good are the clusters?</h3>
<p>For each point i:</p>
<div class="formula">\[ a(i) = \text{mean distance to points in its own cluster}, \qquad b(i) = \text{mean distance to points in the nearest other cluster} \]
\[ s(i) = \frac{b(i) - a(i)}{\max(a(i),\, b(i))} \]</div>
<ul>
  <li>s ≈ +1: well inside its cluster, far from others.</li>
  <li>s ≈ 0: on the border between clusters.</li>
  <li>s &lt; 0: probably in the wrong cluster.</li>
</ul>
<p>The <strong>silhouette score</strong> of a clustering is the mean s(i) over all points; choose the k with the highest score.</p>
<details class="solution"><summary>Worked example</summary>
<p>Point P has mean distance 2 to its own cluster and 8 to the nearest other cluster: s = (8 − 2) / 8 = <strong>0.75</strong> — well clustered.</p>
<p>Point Q: a = 5, b = 4 → s = (4 − 5) / 5 = <strong>−0.2</strong> — Q is closer to the other cluster.</p>
</details>
<pre><code class="language-python">from sklearn.cluster import DBSCAN, AgglomerativeClustering
from sklearn.metrics import silhouette_score

db = DBSCAN(eps=0.5, min_samples=5).fit(X_scaled)
print(set(db.labels_))                     # -1 means noise

agg = AgglomerativeClustering(n_clusters=3, linkage="ward").fit(X_scaled)
print(silhouette_score(X_scaled, agg.labels_))</code></pre>
"""
    + check("In DBSCAN, a point with fewer than minPts neighbours that lies within ε of a core point is a:",
            ["core point", "border point", "noise point", "centroid"], "b",
            "It belongs to the cluster through its core neighbour but cannot expand the cluster itself.")
    + check("A point has a = 3 (own cluster) and b = 6 (nearest other cluster). Its silhouette value is:",
            ["0.5", "−0.5", "2", "0.33"], "a",
            "(b − a) / max(a, b) = (6 − 3) / 6 = 0.5.")
))

TOPICS.append(topic(
    "Association Rule Learning — Support, Confidence, Lift, Apriori, FP-Growth & Market Basket Analysis",
    "Lectures 25–27 · \"people who buy X also buy Y\"",
    r"""
<h3>1. Terms</h3>
<ul>
  <li><strong>Itemset</strong> — a set of items, e.g. {bread, butter}. A k-itemset has k items.</li>
  <li><strong>Transaction</strong> — one basket.</li>
  <li><strong>Association rule</strong> X → Y — if X is bought, Y tends to be bought too (X and Y disjoint).</li>
  <li><strong>Frequent itemset</strong> — support ≥ a minimum support threshold.</li>
</ul>

<h3>2. The three measures</h3>
<div class="formula">\[ Support(X) = \frac{\text{transactions containing } X}{\text{total transactions}} \]
\[ Confidence(X \to Y) = \frac{Support(X \cup Y)}{Support(X)} \]
\[ Lift(X \to Y) = \frac{Confidence(X \to Y)}{Support(Y)} = \frac{Support(X \cup Y)}{Support(X)\,Support(Y)} \]</div>
<table>
  <thead><tr><th>Lift</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>&gt; 1</td><td>X and Y occur together more than by chance — positive association</td></tr>
    <tr><td>= 1</td><td>independent</td></tr>
    <tr><td>&lt; 1</td><td>negative association (substitutes)</td></tr>
  </tbody>
</table>

<h3>3. Worked example</h3>
<table>
  <thead><tr><th>TID</th><th>Items</th></tr></thead>
  <tbody>
    <tr><td>T1</td><td>Bread, Milk</td></tr>
    <tr><td>T2</td><td>Bread, Diaper, Beer, Eggs</td></tr>
    <tr><td>T3</td><td>Milk, Diaper, Beer, Cola</td></tr>
    <tr><td>T4</td><td>Bread, Milk, Diaper, Beer</td></tr>
    <tr><td>T5</td><td>Bread, Milk, Diaper, Cola</td></tr>
  </tbody>
</table>
<p>Rule <strong>{Diaper} → {Beer}</strong>:</p>
<ul>
  <li>Support(Diaper) = 4/5 = 0.8; Support(Beer) = 3/5 = 0.6; Support(Diaper, Beer) = 3/5 = 0.6</li>
  <li>Confidence = 0.6 / 0.8 = <strong>0.75</strong></li>
  <li>Lift = 0.75 / 0.6 = <strong>1.25</strong> → positive association</li>
</ul>
<p>Rule <strong>{Milk, Diaper} → {Beer}</strong>: Support(Milk, Diaper) = 3/5 (T3, T4, T5); Support(Milk, Diaper, Beer) = 2/5 (T3, T4) →
confidence = 0.4 / 0.6 ≈ <strong>0.67</strong>, lift = 0.67 / 0.6 ≈ <strong>1.11</strong>.</p>

<h3>4. Apriori algorithm</h3>
<p><strong>Apriori property (anti-monotonicity):</strong> every subset of a frequent itemset is frequent. Equivalently, if an itemset is infrequent, all its supersets are infrequent — so they can be pruned without counting.</p>
<ol>
  <li>Count 1-itemsets; keep those with support ≥ min_sup → L₁.</li>
  <li><strong>Join</strong> Lₖ₋₁ with itself to generate candidate k-itemsets Cₖ.</li>
  <li><strong>Prune</strong> candidates that have any infrequent (k−1)-subset.</li>
  <li>Scan the database to count Cₖ; keep frequent ones → Lₖ.</li>
  <li>Repeat until no new frequent itemsets.</li>
  <li>Generate rules from each frequent itemset and keep those with confidence ≥ min_conf.</li>
</ol>
<details class="solution"><summary>Apriori on the table above with min support count = 3</summary>
<p>L₁: Bread 4, Milk 4, Diaper 4, Beer 3 (Eggs 1 and Cola 2 are pruned).</p>
<p>C₂ counts: {Bread, Milk} 3, {Bread, Diaper} 3, {Bread, Beer} 2, {Milk, Diaper} 3, {Milk, Beer} 2, {Diaper, Beer} 3.</p>
<p>L₂: {Bread, Milk}, {Bread, Diaper}, {Milk, Diaper}, {Diaper, Beer}.</p>
<p>C₃ from joining: {Bread, Milk, Diaper} (all 2-subsets frequent) → count 2 (T4, T5) → not frequent. {Bread, Diaper, Beer} is pruned because {Bread, Beer} is infrequent.
Stop: the largest frequent itemsets have size 2.</p>
</details>
<p><strong>Weakness:</strong> many candidates and repeated database scans.</p>

<h3>5. FP-Growth</h3>
<ul>
  <li>Scans the database <strong>only twice</strong>: once to count items, once to build a compressed <strong>FP-tree</strong> (items inserted in descending frequency order so common prefixes share nodes).</li>
  <li>Mines frequent itemsets recursively from <strong>conditional pattern bases</strong> — <strong>no candidate generation</strong>.</li>
  <li>Usually much faster than Apriori on large, dense data; the tree can be memory heavy.</li>
</ul>
<table>
  <thead><tr><th></th><th>Apriori</th><th>FP-Growth</th></tr></thead>
  <tbody>
    <tr><td>Candidate generation</td><td>yes</td><td>no</td></tr>
    <tr><td>Database scans</td><td>one per itemset size</td><td>two</td></tr>
    <tr><td>Data structure</td><td>candidate lists</td><td>FP-tree</td></tr>
    <tr><td>Speed on large data</td><td>slower</td><td>faster</td></tr>
  </tbody>
</table>

<h3>6. Market basket analysis</h3>
<p>Retailers use association rules for product placement (put chips near soft drinks), cross-selling ("frequently bought together"), bundle offers,
promotions and inventory planning. The same method applies to web page navigation, medical symptom co-occurrence and fraud patterns.</p>
<pre><code class="language-python">from mlxtend.frequent_patterns import apriori, association_rules
freq = apriori(basket_df, min_support=0.6, use_colnames=True)     # basket_df: one-hot, one row per transaction
rules = association_rules(freq, metric="confidence", min_threshold=0.7)
print(rules[["antecedents", "consequents", "support", "confidence", "lift"]])</code></pre>
"""
    + check("In 10 transactions, bread appears in 6, butter in 5, and both together in 4. What is the confidence of {bread} → {butter}?",
            ["0.40", "0.67", "0.80", "1.33"], "b",
            "Confidence = support(bread, butter) / support(bread) = 0.4 / 0.6 ≈ 0.67.")
    + check("Same data. What is the lift of {bread} → {butter}?",
            ["0.67", "1.00", "1.33", "0.80"], "c",
            "Lift = confidence / support(butter) = 0.667 / 0.5 ≈ 1.33, a positive association.")
))

TOPICS.append(topic(
    "Recommendation Systems — Content-Based, Collaborative Filtering & Hybrid",
    "Lectures 25–27 · suggesting what a user will like",
    r"""
<h3>1. Why recommenders?</h3>
<p>Catalogues are too large to browse. Recommenders drive a large share of engagement on platforms like Netflix, YouTube, Amazon and Spotify by predicting a user's rating or preference for items they have not seen.</p>

<h3>2. Content-based filtering</h3>
<p>Recommend items <strong>similar to what the user liked</strong>, using item features (genre, director, keywords, TF-IDF of descriptions).
Build a user profile from liked items, then rank other items by similarity.</p>
<ul>
  <li>✔ Works for a single user; can recommend new or niche items that have features.</li>
  <li>✘ Over-specialisation ("filter bubble"); needs good item features; new users have no profile.</li>
</ul>

<h3>3. Collaborative filtering</h3>
<p>Uses the <strong>user–item interaction matrix</strong> only, no item features. "Users who agreed in the past will agree in the future."</p>
<table>
  <thead><tr><th>Approach</th><th>Idea</th></tr></thead>
  <tbody>
    <tr><td><strong>User-based</strong></td><td>find users similar to you; recommend what they liked</td></tr>
    <tr><td><strong>Item-based</strong></td><td>find items similar to ones you liked, based on who rated them (Amazon's classic approach; more stable than user-based)</td></tr>
    <tr><td><strong>Model-based / matrix factorisation</strong></td><td>decompose the rating matrix into user and item latent factors (SVD, ALS) — Netflix Prize winner family</td></tr>
  </tbody>
</table>

<h4>Cosine similarity</h4>
<div class="formula">\[ \cos(A, B) = \frac{A \cdot B}{\lVert A \rVert \, \lVert B \rVert} \]</div>
<details class="solution"><summary>Worked example — user-based similarity</summary>
<p>Ratings on movies (M1, M2, M3): Asha = (5, 3, 4), Ravi = (4, 2, 5), Neha = (1, 5, 2).</p>
<p>cos(Asha, Ravi) = (20 + 6 + 20) / (√50 × √45) = 46 / 47.43 ≈ <strong>0.970</strong></p>
<p>cos(Asha, Neha) = (5 + 15 + 8) / (√50 × √30) = 28 / 38.73 ≈ <strong>0.723</strong></p>
<p>Ravi is Asha's closest neighbour, so movies Ravi rated highly that Asha has not seen are recommended to her.</p>
</details>
<p>Pearson correlation is often preferred because it corrects for users who rate everything high or low.</p>

<h3>4. Challenges</h3>
<ul>
  <li><strong>Cold start</strong> — new users or new items have no interactions.</li>
  <li><strong>Sparsity</strong> — most users rate a tiny fraction of items.</li>
  <li><strong>Scalability</strong> — millions of users × items.</li>
  <li><strong>Popularity bias</strong> and lack of diversity; <strong>shilling</strong> (fake ratings).</li>
</ul>

<h3>5. Hybrid systems</h3>
<p>Combine content-based and collaborative signals (weighted blend, switching, or features fed into one model) — for example, using content features to handle cold start and collaborative signals once interactions exist. Most production recommenders are hybrids, often with deep learning.</p>

<h3>6. Evaluating recommenders</h3>
<p>RMSE/MAE for predicted ratings; <strong>precision@k</strong>, <strong>recall@k</strong>, NDCG for ranked lists; coverage and diversity; online A/B tests for click-through and watch time.</p>
"""
    + check("A new movie with no ratings yet cannot be recommended by pure collaborative filtering. This is the:",
            ["sparsity problem", "cold start problem", "overfitting problem", "curse of dimensionality"], "b",
            "Collaborative filtering needs interactions; items or users without them suffer from cold start.")
))

TOPICS.append(topic(
    "Dimensionality Reduction & Principal Component Analysis (PCA)",
    "Lectures 25–27 · keep the information, drop the dimensions",
    r"""
<h3>1. The curse of dimensionality</h3>
<ul>
  <li>As features grow, data becomes sparse — the volume of the space grows exponentially.</li>
  <li>Distances between points become nearly equal, hurting KNN and clustering.</li>
  <li>More features need far more data, increase overfitting and computation.</li>
</ul>
<p>Dimensionality reduction helps with visualisation (to 2-D/3-D), speed, noise removal and multicollinearity.</p>

<h3>2. Two families</h3>
<table>
  <thead><tr><th>Feature selection</th><th>Feature extraction</th></tr></thead>
  <tbody>
    <tr><td>keeps a subset of the original features</td><td>creates new features from combinations</td></tr>
    <tr><td>filter, wrapper, embedded methods</td><td>PCA, LDA, t-SNE, autoencoders</td></tr>
    <tr><td>interpretable</td><td>less interpretable, often more compact</td></tr>
  </tbody>
</table>

<h3>3. PCA — the idea</h3>
<p>PCA finds new orthogonal axes, the <strong>principal components</strong>, ordered by how much of the data's <strong>variance</strong> they capture.
PC1 points along the direction of greatest spread, PC2 is perpendicular to PC1 and captures the next most variance, and so on. Keeping the first few components preserves most information in fewer dimensions.</p>

<h3>4. PCA steps</h3>
<ol>
  <li><strong>Standardise</strong> each feature (mean 0, variance 1) — otherwise large-scale features dominate.</li>
  <li>Compute the <strong>covariance matrix</strong> (d × d).</li>
  <li>Compute its <strong>eigenvectors</strong> (directions) and <strong>eigenvalues</strong> (variance along each).</li>
  <li><strong>Sort</strong> by eigenvalue, largest first.</li>
  <li>Choose the top k eigenvectors (by explained variance, e.g. 95%).</li>
  <li><strong>Project</strong> the data onto them: X_reduced = X · W<sub>k</sub>.</li>
</ol>
<div class="formula">\[ \text{Explained variance ratio of } PC_i = \frac{\lambda_i}{\sum_j \lambda_j} \]</div>
<details class="solution"><summary>Worked example — explained variance</summary>
<p>Eigenvalues of a 4-feature covariance matrix: 2.9, 0.9, 0.15, 0.05 (total 4.0).</p>
<p>PC1 explains 2.9 / 4 = 72.5%; PC1 + PC2 explain 3.8 / 4 = <strong>95%</strong>. Keep 2 components: 4 features → 2 with 95% of the variance retained.</p>
</details>

<h3>5. In scikit-learn</h3>
<pre><code class="language-python">from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

X_std = StandardScaler().fit_transform(X)
pca = PCA(n_components=0.95)             # keep enough components for 95% variance
X_pca = pca.fit_transform(X_std)
print(pca.n_components_, pca.explained_variance_ratio_)</code></pre>

<h3>6. Limitations</h3>
<ul>
  <li>Linear only — curved structure needs kernel PCA, t-SNE or UMAP.</li>
  <li>Components are combinations of features, so they are hard to interpret.</li>
  <li>Sensitive to scaling and outliers.</li>
  <li>Unsupervised: maximum variance is not always what best separates classes (LDA uses labels for that).</li>
</ul>
"""
    + check("Why must data be standardised before PCA?",
            ["PCA only accepts integers", "Features with larger scales would dominate the variance and the components",
             "It makes eigenvalues negative", "It removes outliers"], "b",
            "PCA maximises variance, and unscaled large-range features have larger variance simply because of their units.")
))

TOPICS.append(topic(
    "Reinforcement Learning — Agent, Environment, Reward, Policy, Value & Q-Learning",
    "Lectures 28–30 · learning by trial and error",
    r"""
<h3>1. The RL setup</h3>
<p>An <strong>agent</strong> interacts with an <strong>environment</strong> in discrete steps. At each step it observes a <strong>state</strong> s, takes an <strong>action</strong> a,
receives a <strong>reward</strong> r and moves to a new state s′. The goal is to maximise <strong>cumulative (discounted) reward</strong> over time.</p>
<table>
  <thead><tr><th>Term</th><th>Meaning</th><th>Game example</th></tr></thead>
  <tbody>
    <tr><td>Agent</td><td>learner / decision maker</td><td>the player AI</td></tr>
    <tr><td>Environment</td><td>everything it interacts with</td><td>the game</td></tr>
    <tr><td>State (s)</td><td>current situation</td><td>board position</td></tr>
    <tr><td>Action (a)</td><td>choice available</td><td>move a piece</td></tr>
    <tr><td>Reward (r)</td><td>immediate feedback signal</td><td>+1 win, −1 loss, 0 otherwise</td></tr>
    <tr><td>Policy (π)</td><td>strategy: state → action (or action probabilities)</td><td>"in this position, play this move"</td></tr>
    <tr><td>Value function V(s)</td><td>expected long-term return from state s under π</td><td>how good a position is</td></tr>
    <tr><td>Q-function Q(s, a)</td><td>expected return taking a in s, then following π</td><td>how good a move is here</td></tr>
    <tr><td>Episode</td><td>one run from start to terminal state</td><td>one game</td></tr>
  </tbody>
</table>

<h3>2. Return and discounting</h3>
<div class="formula">\[ G_t = r_{t+1} + \gamma r_{t+2} + \gamma^2 r_{t+3} + \dots \qquad 0 \le \gamma \le 1 \]</div>
<p>γ close to 0 → short-sighted; close to 1 → values future rewards almost as much as immediate ones.
Example: rewards 1, 1, 1 with γ = 0.9 give G = 1 + 0.9 + 0.81 = 2.71.</p>

<h3>3. The RL process (Markov Decision Process)</h3>
<ol>
  <li>Observe state sₜ.</li>
  <li>Choose action aₜ using the policy (with some exploration).</li>
  <li>Environment returns reward rₜ₊₁ and next state sₜ₊₁.</li>
  <li>Update the policy/value estimates.</li>
  <li>Repeat until the episode ends; run many episodes.</li>
</ol>
<p>An MDP is defined by (S, A, P, R, γ). The <strong>Markov property</strong>: the next state depends only on the current state and action, not on the full history.</p>

<h3>4. Exploration vs exploitation</h3>
<p><strong>Exploit</strong> the best-known action to collect reward, or <strong>explore</strong> other actions to find something better?
<strong>ε-greedy</strong>: with probability ε pick a random action, otherwise the best one; often ε decays over training.</p>

<h3>5. Q-learning (model-free, off-policy)</h3>
<div class="formula">\[ Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma \max_{a'} Q(s', a') - Q(s,a) \right] \]</div>
<details class="solution"><summary>Worked example — one update</summary>
<p>Q(s, right) = 2, α = 0.5, γ = 0.9. Taking "right" gives r = 1 and lands in s′ where the best Q value is 4.</p>
<p>Target = 1 + 0.9 × 4 = 4.6. &nbsp; New Q = 2 + 0.5 × (4.6 − 2) = 2 + 1.3 = <strong>3.3</strong>.</p>
</details>
<p>Deep Q-Networks (DQN) replace the Q-table with a neural network for huge state spaces (Atari games from pixels). Other methods: SARSA (on-policy), policy gradients, actor-critic, PPO.</p>

<h3>6. Supervised vs unsupervised vs reinforcement learning</h3>
<table>
  <thead><tr><th></th><th>Supervised</th><th>Unsupervised</th><th>Reinforcement</th></tr></thead>
  <tbody>
    <tr><td>Data</td><td>labelled input–output pairs</td><td>unlabelled inputs</td><td>no fixed dataset; experience from interaction</td></tr>
    <tr><td>Feedback</td><td>correct answer for every example</td><td>none</td><td>delayed scalar reward</td></tr>
    <tr><td>Goal</td><td>predict labels</td><td>find hidden structure</td><td>learn a policy maximising cumulative reward</td></tr>
    <tr><td>Decisions</td><td>independent predictions</td><td>—</td><td>sequential; actions affect future states</td></tr>
    <tr><td>Examples</td><td>spam detection, price prediction</td><td>segmentation, PCA</td><td>game AI, robot control</td></tr>
  </tbody>
</table>

<h3>7. Applications</h3>
<ul>
  <li><strong>Robotics</strong> — learning to walk, grasp and manipulate objects; sim-to-real training.</li>
  <li><strong>Gaming</strong> — AlphaGo / AlphaZero (Go, chess, shogi), Atari DQN, OpenAI Five (Dota 2).</li>
  <li><strong>Autonomous vehicles</strong> — lane changing, merging, parking policies, trained largely in simulation.</li>
  <li>Also: recommendation sequences, data-centre cooling, finance trading, <strong>RLHF</strong> for aligning language models.</li>
</ul>
"""
    + check("In reinforcement learning, the policy is:",
            ["the reward received", "a mapping from states to actions", "the environment's rules", "the dataset of labels"], "b",
            "The policy is the agent's strategy for choosing actions in each state.")
    + check("With ε-greedy and ε = 0.1, the agent:",
            ["always explores", "explores 10% of the time and exploits 90%", "exploits 10% of the time", "never explores"], "b",
            "With probability ε it acts randomly; otherwise it takes the best-known action.")
))

TOPICS.append(topic(
    "Ethics, Generative AI & Future Trends in AI and ML",
    "Lecture 30 · responsible AI and where the field is heading",
    r"""
<h3>1. Principles of responsible AI</h3>
<table>
  <thead><tr><th>Principle</th><th>What it asks</th></tr></thead>
  <tbody>
    <tr><td>Fairness</td><td>no unjust discrimination across gender, caste, religion, region…</td></tr>
    <tr><td>Transparency &amp; explainability</td><td>people can understand how and why a decision was made</td></tr>
    <tr><td>Privacy</td><td>personal data collected lawfully, minimised and protected</td></tr>
    <tr><td>Accountability</td><td>a human or organisation is answerable for outcomes</td></tr>
    <tr><td>Safety &amp; robustness</td><td>behaves reliably, resists attacks and misuse</td></tr>
    <tr><td>Human oversight</td><td>humans can intervene in high-stakes decisions</td></tr>
    <tr><td>Sustainability</td><td>considers energy and environmental cost of training</td></tr>
  </tbody>
</table>

<h3>2. Where bias comes from</h3>
<ul>
  <li><strong>Historical bias</strong> — past decisions were unfair, and the model learns them.</li>
  <li><strong>Sampling / representation bias</strong> — some groups under-represented (face datasets skewed to lighter skin).</li>
  <li><strong>Measurement bias</strong> — proxies that correlate with protected attributes (pin code as a proxy for community).</li>
  <li><strong>Feedback loops</strong> — predictive policing sends more patrols, finds more incidents, reinforcing itself.</li>
</ul>

<h3>3. Explainable AI (XAI) — content beyond the syllabus</h3>
<ul>
  <li><strong>Interpretable models</strong>: linear models, small decision trees.</li>
  <li><strong>Post-hoc explanations</strong>: feature importance, <strong>SHAP</strong> values (contribution of each feature to a prediction), <strong>LIME</strong> (local surrogate models), saliency maps for images.</li>
</ul>

<h3>4. Regulation and governance</h3>
<ul>
  <li><strong>EU AI Act</strong> — risk-based rules (unacceptable, high, limited, minimal risk).</li>
  <li><strong>GDPR</strong> (EU) and India's <strong>Digital Personal Data Protection Act, 2023</strong> — consent and data rights.</li>
  <li>Model cards, datasheets for datasets, audits and impact assessments.</li>
</ul>

<h3>5. Future trends</h3>
<ul>
  <li><strong>Generative AI and foundation models</strong> — large pre-trained models adapted to many tasks; multimodal models handling text, image, audio and video together.</li>
  <li><strong>Agentic AI</strong> — systems that plan and use tools to complete multi-step work.</li>
  <li><strong>Edge AI / TinyML</strong> — models running on phones and microcontrollers for privacy and low latency.</li>
  <li><strong>Federated learning</strong> — training across devices without centralising raw data.</li>
  <li><strong>AutoML</strong> — automated model and hyperparameter search.</li>
  <li><strong>AI for science and health</strong> — protein structure (AlphaFold), drug discovery, climate modelling.</li>
  <li><strong>Efficient and green AI</strong> — smaller models, distillation, quantisation.</li>
  <li><strong>Quantum machine learning</strong> — early research.</li>
</ul>
"""
    + check("A loan model gives lower approval rates to applicants from certain pin codes that correlate with a community. This is mainly an example of:",
            ["overfitting", "bias through proxy variables", "the cold start problem", "underfitting"], "b",
            "Pin code acts as a proxy for a protected attribute, carrying historical bias into the model.")
))
