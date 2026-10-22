"""Artificial Intelligence & Machine Learning — formula and decision sheets."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Formula Sheet — Every Equation You Need for the MCQ Paper",
    "Scaling, regression, classification, clustering, rules, RL",
    r"""
<h3>Pre-processing</h3>
<table>
  <thead><tr><th>Name</th><th>Formula</th></tr></thead>
  <tbody>
    <tr><td>Min–max normalisation</td><td>\( x' = \dfrac{x - x_{min}}{x_{max} - x_{min}} \)</td></tr>
    <tr><td>Standardisation</td><td>\( z = \dfrac{x - \mu}{\sigma} \)</td></tr>
    <tr><td>IQR outlier fences</td><td>\( Q_1 - 1.5\,IQR, \ \ Q_3 + 1.5\,IQR \)</td></tr>
  </tbody>
</table>

<h3>Regression</h3>
<table>
  <tbody>
    <tr><td>Simple linear regression</td><td>\( \hat{y} = \beta_0 + \beta_1 x,\ \ \beta_1 = \dfrac{\sum (x-\bar{x})(y-\bar{y})}{\sum (x-\bar{x})^2},\ \ \beta_0 = \bar{y} - \beta_1 \bar{x} \)</td></tr>
    <tr><td>MAE</td><td>\( \frac{1}{n}\sum |y - \hat{y}| \)</td></tr>
    <tr><td>MSE / RMSE</td><td>\( \frac{1}{n}\sum (y - \hat{y})^2, \ \ \sqrt{MSE} \)</td></tr>
    <tr><td>R²</td><td>\( 1 - \dfrac{SS_{res}}{SS_{tot}} = 1 - \dfrac{\sum (y-\hat{y})^2}{\sum (y-\bar{y})^2} \)</td></tr>
    <tr><td>Gradient descent step</td><td>\( \theta := \theta - \alpha \nabla J(\theta) \)</td></tr>
  </tbody>
</table>

<h3>Classification</h3>
<table>
  <tbody>
    <tr><td>Sigmoid</td><td>\( \sigma(z) = \dfrac{1}{1 + e^{-z}} \)</td></tr>
    <tr><td>Log loss</td><td>\( -\frac{1}{n}\sum [\,y \log p + (1-y)\log(1-p)\,] \)</td></tr>
    <tr><td>Euclidean / Manhattan</td><td>\( \sqrt{\sum (a_i - b_i)^2}, \ \ \sum |a_i - b_i| \)</td></tr>
    <tr><td>Entropy</td><td>\( -\sum p_i \log_2 p_i \)</td></tr>
    <tr><td>Gini</td><td>\( 1 - \sum p_i^2 \)</td></tr>
    <tr><td>Information gain</td><td>\( H(parent) - \sum \frac{|S_v|}{|S|} H(S_v) \)</td></tr>
    <tr><td>Bayes' theorem</td><td>\( P(C \mid X) = \dfrac{P(X \mid C)P(C)}{P(X)} \)</td></tr>
    <tr><td>SVM margin</td><td>\( 2 / \lVert w \rVert \)</td></tr>
  </tbody>
</table>

<h3>Evaluation</h3>
<table>
  <tbody>
    <tr><td>Accuracy</td><td>\( \dfrac{TP + TN}{TP + TN + FP + FN} \)</td></tr>
    <tr><td>Precision</td><td>\( \dfrac{TP}{TP + FP} \)</td></tr>
    <tr><td>Recall / sensitivity / TPR</td><td>\( \dfrac{TP}{TP + FN} \)</td></tr>
    <tr><td>Specificity / TNR</td><td>\( \dfrac{TN}{TN + FP} \)</td></tr>
    <tr><td>False positive rate</td><td>\( \dfrac{FP}{FP + TN} = 1 - specificity \)</td></tr>
    <tr><td>F1</td><td>\( 2 \cdot \dfrac{P \cdot R}{P + R} \)</td></tr>
    <tr><td>Error decomposition</td><td>\( Bias^2 + Variance + Noise \)</td></tr>
  </tbody>
</table>

<h3>Unsupervised</h3>
<table>
  <tbody>
    <tr><td>WCSS (K-Means objective)</td><td>\( \sum_{j} \sum_{x \in C_j} \lVert x - \mu_j \rVert^2 \)</td></tr>
    <tr><td>Silhouette</td><td>\( s = \dfrac{b - a}{\max(a, b)} \in [-1, 1] \)</td></tr>
    <tr><td>Cosine similarity</td><td>\( \dfrac{A \cdot B}{\lVert A \rVert \lVert B \rVert} \)</td></tr>
    <tr><td>Support</td><td>\( \dfrac{count(X)}{N} \)</td></tr>
    <tr><td>Confidence</td><td>\( \dfrac{supp(X \cup Y)}{supp(X)} \)</td></tr>
    <tr><td>Lift</td><td>\( \dfrac{conf(X \to Y)}{supp(Y)} \)</td></tr>
    <tr><td>PCA explained variance</td><td>\( \lambda_i / \sum_j \lambda_j \)</td></tr>
  </tbody>
</table>

<h3>Reinforcement learning</h3>
<table>
  <tbody>
    <tr><td>Discounted return</td><td>\( G_t = \sum_{k=0}^{\infty} \gamma^k r_{t+k+1} \)</td></tr>
    <tr><td>Q-learning update</td><td>\( Q(s,a) \leftarrow Q(s,a) + \alpha[r + \gamma \max_{a'} Q(s',a') - Q(s,a)] \)</td></tr>
    <tr><td>A* evaluation</td><td>\( f(n) = g(n) + h(n) \)</td></tr>
  </tbody>
</table>
"""
))

TOPICS.append(topic(
    "Decision Sheet — Which Algorithm, Metric or Fix?",
    "Quick lookup tables for scenario questions",
    r"""
<h3>Which algorithm?</h3>
<table>
  <thead><tr><th>Situation</th><th>Reach for</th></tr></thead>
  <tbody>
    <tr><td>Predict a continuous value, need interpretability</td><td>Linear / multiple regression</td></tr>
    <tr><td>Curved relationship with one feature</td><td>Polynomial regression</td></tr>
    <tr><td>Binary outcome with probabilities</td><td>Logistic regression</td></tr>
    <tr><td>Text classification, very fast baseline</td><td>Naive Bayes</td></tr>
    <tr><td>Small data, non-linear boundary, few features</td><td>KNN or SVM with RBF kernel</td></tr>
    <tr><td>Rules a manager can read</td><td>Decision tree (limited depth)</td></tr>
    <tr><td>Best accuracy on tabular data without much tuning</td><td>Random forest</td></tr>
    <tr><td>High-dimensional data (many features)</td><td>SVM, logistic regression with regularisation</td></tr>
    <tr><td>Group customers, k known roughly</td><td>K-Means</td></tr>
    <tr><td>Arbitrary cluster shapes, outliers present</td><td>DBSCAN</td></tr>
    <tr><td>Want a dendrogram / small dataset</td><td>Hierarchical clustering</td></tr>
    <tr><td>"Frequently bought together"</td><td>Apriori / FP-Growth</td></tr>
    <tr><td>Reduce 50 correlated features for speed or plotting</td><td>PCA</td></tr>
    <tr><td>Sequential decisions with rewards</td><td>Reinforcement learning (Q-learning)</td></tr>
  </tbody>
</table>

<h3>Which metric?</h3>
<table>
  <thead><tr><th>Scenario</th><th>Metric</th></tr></thead>
  <tbody>
    <tr><td>Missing a positive is dangerous (disease, fraud)</td><td>Recall</td></tr>
    <tr><td>False alarms are expensive (spam, arrests)</td><td>Precision</td></tr>
    <tr><td>Imbalanced classes, balance both</td><td>F1-score</td></tr>
    <tr><td>Compare classifiers across thresholds</td><td>ROC AUC</td></tr>
    <tr><td>Regression, errors in the target's units</td><td>MAE or RMSE</td></tr>
    <tr><td>Regression, big errors must be punished</td><td>RMSE / MSE</td></tr>
    <tr><td>How much variance the model explains</td><td>R² (adjusted R² when adding features)</td></tr>
    <tr><td>Cluster quality without labels</td><td>Silhouette score, WCSS (elbow)</td></tr>
  </tbody>
</table>

<h3>Symptom → fix</h3>
<table>
  <thead><tr><th>Symptom</th><th>Diagnosis</th><th>Fix</th></tr></thead>
  <tbody>
    <tr><td>Train high, test low</td><td>Overfitting (high variance)</td><td>more data, simpler model, regularisation, pruning, cross-validation</td></tr>
    <tr><td>Train low, test low</td><td>Underfitting (high bias)</td><td>more features, more complex model, less regularisation</td></tr>
    <tr><td>Great test score, fails in production</td><td>Data leakage or data drift</td><td>fit transformers on train only; monitor and retrain</td></tr>
    <tr><td>KNN/SVM dominated by one feature</td><td>Unscaled features</td><td>StandardScaler / MinMaxScaler</td></tr>
    <tr><td>99% accuracy but no positives caught</td><td>Class imbalance</td><td>recall/F1, class weights, resampling (SMOTE)</td></tr>
    <tr><td>K-Means gives different results each run</td><td>Random initialisation</td><td>k-means++, n_init, fixed random_state</td></tr>
    <tr><td>Linear regression coefficients unstable</td><td>Multicollinearity</td><td>drop correlated features, PCA, ridge regression</td></tr>
  </tbody>
</table>

<h3>Key people, dates and names</h3>
<table>
  <tbody>
    <tr><td>Alan Turing</td><td>Turing Test, 1950</td></tr>
    <tr><td>John McCarthy</td><td>coined "AI", Dartmouth 1956; LISP</td></tr>
    <tr><td>Arthur Samuel</td><td>"machine learning", checkers program, 1959</td></tr>
    <tr><td>Tom Mitchell</td><td>E, T, P definition of learning, 1997</td></tr>
    <tr><td>Frank Rosenblatt</td><td>Perceptron, 1958</td></tr>
    <tr><td>Deep Blue / AlphaGo</td><td>chess 1997 / Go 2016</td></tr>
    <tr><td>Transformer</td><td>"Attention Is All You Need", 2017</td></tr>
  </tbody>
</table>
"""
))
