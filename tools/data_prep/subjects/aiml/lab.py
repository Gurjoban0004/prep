"""Artificial Intelligence & Machine Learning (24CSE0316) — Lab plan (labs 1-30) in Python."""

from subjects.helpers import topic

TOPICS = []

TOPICS.append(topic(
    "Labs 1–2 — Python Basics with NumPy and Pandas",
    "Arrays, statistics, DataFrames, filtering and grouping",
    r"""
<p>Run these in Google Colab or Jupyter. Every lab below uses datasets that ship with scikit-learn, so no downloads are needed.</p>

<h3>NumPy</h3>
<pre><code class="language-python">import numpy as np

marks = np.array([78, 85, 62, 90, 71, 88])
print("Mean:", marks.mean(), "Median:", np.median(marks), "Std:", round(marks.std(), 2))
print("Above 80:", marks[marks > 80])                  # [85 90 88]
print("Normalised:", (marks - marks.min()) / (marks.max() - marks.min()))

A = np.array([[2, 1], [1, 3]])
b = np.array([5, 10])
print("Solve Ax = b:", np.linalg.solve(A, b))          # [1. 3.]
print("Inverse:\n", np.linalg.inv(A))
print("Eigenvalues:", np.linalg.eigvals(A))

grid = np.arange(1, 13).reshape(3, 4)
print(grid.sum(axis=0))                                 # column sums: [15 18 21 24]
print(grid.sum(axis=1))                                 # row sums:    [10 26 42]
print(grid + np.array([10, 20, 30, 40]))                # broadcasting adds to every row</code></pre>

<h3>Pandas</h3>
<pre><code class="language-python">import pandas as pd

df = pd.DataFrame({
    "name":   ["Aman", "Bhavya", "Chirag", "Diya", "Eshan", "Farah"],
    "branch": ["CSE", "ECE", "CSE", "ME", "CSE", "ECE"],
    "cgpa":   [8.7, 7.9, None, 9.1, 6.8, 8.2],
    "attendance": [92, 81, 75, 96, 64, 88],
})

print(df.info())
print(df.describe())
print(df.isnull().sum())                                   # cgpa has 1 missing

df["cgpa"] = df["cgpa"].fillna(df["cgpa"].median())        # 8.2
df["eligible"] = df["attendance"] >= 75
print(df[df["eligible"]].sort_values("cgpa", ascending=False))
print(df.groupby("branch")[["cgpa", "attendance"]].mean())
print(df["branch"].value_counts())
df.to_csv("students_clean.csv", index=False)</code></pre>
"""
))

TOPICS.append(topic(
    "Labs 3–4 — A* Search for Optimal Path Finding",
    "Heuristic search on a grid · f(n) = g(n) + h(n)",
    r"""
<h3>Theory you will be asked in the viva</h3>
<ul>
  <li><strong>Uninformed search</strong> (BFS, DFS, uniform-cost) knows nothing about the goal's location.</li>
  <li><strong>Informed (heuristic) search</strong> uses an estimate h(n) of the remaining cost to the goal.</li>
  <li><strong>A*</strong> expands the node with the smallest <strong>f(n) = g(n) + h(n)</strong>, where g(n) is the cost so far.</li>
  <li><strong>Admissible heuristic</strong> — never overestimates the true cost → A* returns an optimal path.</li>
  <li><strong>Consistent (monotone)</strong> — h(n) ≤ cost(n, n′) + h(n′); implies admissible and no node needs reopening.</li>
  <li>Grid heuristics: <strong>Manhattan</strong> |dx| + |dy| for 4-direction moves; Euclidean or octile for diagonal moves.</li>
  <li>If h = 0, A* becomes uniform-cost search (Dijkstra). Greedy best-first uses only h and is not optimal.</li>
</ul>

<h3>Program</h3>
<pre><code class="language-python">import heapq

def a_star(grid, start, goal):
    # grid: list of strings, '#' is a wall. Moves: up/down/left/right, cost 1 each.
    rows, cols = len(grid), len(grid[0])

    def h(cell):                                   # Manhattan distance: admissible here
        return abs(cell[0] - goal[0]) + abs(cell[1] - goal[1])

    open_heap = [(h(start), 0, start)]             # (f, g, cell)
    came_from = {start: None}
    g_cost = {start: 0}
    expanded = 0

    while open_heap:
        f, g, cell = heapq.heappop(open_heap)
        if g > g_cost[cell]:
            continue                               # stale heap entry
        expanded += 1
        if cell == goal:
            path = []
            while cell is not None:
                path.append(cell)
                cell = came_from[cell]
            return path[::-1], g, expanded
        r, c = cell
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != "#":
                new_g = g + 1
                if new_g < g_cost.get((nr, nc), float("inf")):
                    g_cost[(nr, nc)] = new_g
                    came_from[(nr, nc)] = cell
                    heapq.heappush(open_heap, (new_g + h((nr, nc)), new_g, (nr, nc)))
    return None, float("inf"), expanded


grid = [
    "S...#....",
    ".##.#.##.",
    "....#..#.",
    ".#.....#G",
    ".#.###...",
]
start, goal = (0, 0), (3, 8)
path, cost, expanded = a_star(grid, start, goal)
print("Cost:", cost, "| nodes expanded:", expanded)

canvas = [list(row) for row in grid]
for r, c in path[1:-1]:
    canvas[r][c] = "*"
print("\n".join("".join(row) for row in canvas))</code></pre>
<p>Output: the optimal cost is <strong>13</strong> moves. The printed map marks the path with <code>*</code>
(ties between equally short routes may be broken differently, but the cost is always 13).</p>

<h3>Viva questions</h3>
<ol>
  <li>Why does A* with an admissible heuristic find the shortest path? — It never discards a route whose true cost could be lower than the path it returns.</li>
  <li>What happens if h overestimates? — A* may return a sub-optimal path (but can be faster).</li>
  <li>Space complexity? — Exponential in the worst case, because it stores the frontier; IDA* reduces memory.</li>
</ol>
"""
))

TOPICS.append(topic(
    "Labs 5–7 — Data Pre-processing: Missing Values, Encoding & Feature Scaling",
    "SimpleImputer, OneHotEncoder, StandardScaler and ColumnTransformer",
    r"""
<pre><code class="language-python">import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, StandardScaler, MinMaxScaler
from sklearn.model_selection import train_test_split

df = pd.DataFrame({
    "age":       [25, 32, np.nan, 45, 29, 51, 38, np.nan],
    "salary":    [30000, 52000, 41000, np.nan, 36000, 99000, 64000, 47000],
    "city":      ["Delhi", "Pune", "Delhi", np.nan, "Mumbai", "Pune", "Mumbai", "Delhi"],
    "education": ["UG", "PG", "UG", "PhD", "UG", "PG", np.nan, "PG"],
    "purchased": [0, 1, 0, 1, 0, 1, 1, 0],
})

print("Missing values per column:\n", df.isnull().sum())

X = df.drop(columns="purchased")
y = df["purchased"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

numeric = ["age", "salary"]
nominal = ["city"]
ordinal = ["education"]

preprocess = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")),
                      ("scale", StandardScaler())]), numeric),
    ("nom", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                      ("onehot", OneHotEncoder(handle_unknown="ignore"))]), nominal),
    ("ord", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                      ("ordinal", OrdinalEncoder(categories=[["UG", "PG", "PhD"]]))]), ordinal),
])

X_train_ready = preprocess.fit_transform(X_train)   # learn medians, categories, mean/std from TRAIN only
X_test_ready = preprocess.transform(X_test)          # apply the same values to TEST
print(preprocess.get_feature_names_out())
print(X_train_ready.shape, X_test_ready.shape)

# Compare scalers on one column
salary = df[["salary"]].fillna(df["salary"].median())
print("Min-max:", MinMaxScaler().fit_transform(salary).ravel().round(2))
print("Z-score:", StandardScaler().fit_transform(salary).ravel().round(2))</code></pre>
<div class="callout callout-key"><strong>Record in your file:</strong> which strategy you used for each column and why (median for skewed salary, most frequent for categories, ordinal order UG &lt; PG &lt; PhD, one-hot for city because it has no order).</div>
"""
))

TOPICS.append(topic(
    "Labs 8–10 — Simple Linear Regression with MAE, MSE, RMSE & R²",
    "From-scratch least squares and the scikit-learn version",
    r"""
<h3>From scratch (matches the worked example in the notes)</h3>
<pre><code class="language-python">import numpy as np

hours = np.array([1, 2, 3, 4, 5], dtype=float)
marks = np.array([2, 4, 5, 4, 5], dtype=float)

x_bar, y_bar = hours.mean(), marks.mean()
b1 = ((hours - x_bar) * (marks - y_bar)).sum() / ((hours - x_bar) ** 2).sum()
b0 = y_bar - b1 * x_bar
pred = b0 + b1 * hours

mae = np.abs(marks - pred).mean()
mse = ((marks - pred) ** 2).mean()
rmse = np.sqrt(mse)
r2 = 1 - ((marks - pred) ** 2).sum() / ((marks - y_bar) ** 2).sum()

print(f"y = {b0:.2f} + {b1:.2f}x")                       # y = 2.20 + 0.60x
print(f"MAE={mae:.2f} MSE={mse:.2f} RMSE={rmse:.3f} R2={r2:.2f}")   # MAE=0.64 MSE=0.48 RMSE=0.693 R2=0.60</code></pre>

<h3>With scikit-learn on a real dataset</h3>
<pre><code class="language-python">import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

data = load_diabetes(as_frame=True)
X = data.frame[["bmi"]]                 # one feature -> simple linear regression
y = data.frame["target"]                # disease progression after one year

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
y_pred = model.predict(X_test)

print("Slope:", model.coef_[0], "Intercept:", model.intercept_)
print("MAE :", mean_absolute_error(y_test, y_pred))
print("MSE :", mean_squared_error(y_test, y_pred))
print("RMSE:", mean_squared_error(y_test, y_pred) ** 0.5)
print("R2  :", r2_score(y_test, y_pred))

plt.scatter(X_test, y_test, alpha=0.6, label="actual")
order = X_test["bmi"].argsort()
plt.plot(X_test["bmi"].iloc[order], y_pred[order], color="black", label="fitted line")
plt.xlabel("BMI (scaled)"); plt.ylabel("Disease progression"); plt.legend(); plt.show()</code></pre>
<p>Expect a positive slope and a modest R²: BMI alone explains only part of the variation — a good talking point for why multiple regression helps.</p>
"""
))

TOPICS.append(topic(
    "Labs 11–13 — Multiple Linear Regression",
    "Many features, coefficients and residual checks",
    r"""
<pre><code class="language-python">import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split, cross_val_score

data = load_diabetes(as_frame=True)
X, y = data.data, data.target            # 10 features: age, sex, bmi, bp, s1..s6

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
y_pred = model.predict(X_test)

coef = pd.Series(model.coef_, index=X.columns).sort_values(key=abs, ascending=False)
print("Coefficients (largest effect first):\n", coef.round(1))
print("Intercept:", round(model.intercept_, 2))

print("MAE :", round(mean_absolute_error(y_test, y_pred), 2))
print("RMSE:", round(mean_squared_error(y_test, y_pred) ** 0.5, 2))
print("R2  :", round(r2_score(y_test, y_pred), 3))
print("5-fold CV R2:", cross_val_score(LinearRegression(), X, y, cv=5, scoring="r2").mean().round(3))

# Residuals should look like random noise around 0 (no pattern, constant spread)
residuals = y_test - y_pred
plt.scatter(y_pred, residuals, alpha=0.6)
plt.axhline(0, color="black")
plt.xlabel("Predicted"); plt.ylabel("Residual"); plt.title("Residual plot"); plt.show()

# Predict for a new patient (same feature order)
new_patient = X_test.iloc[[0]]
print("Predicted progression:", model.predict(new_patient)[0].round(1))</code></pre>
<p>With all ten features the test R² is noticeably higher than with BMI alone.
In the viva, explain that each coefficient is the change in the target for a one-unit change in that feature <em>with the others held constant</em>, and mention multicollinearity (check a correlation heatmap or VIF).</p>
"""
))

TOPICS.append(topic(
    "Labs 14–15 — Logistic Regression with Confusion Matrix, Accuracy, Precision, Recall & F1",
    "Binary classification on the breast cancer dataset",
    r"""
<pre><code class="language-python">import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, precision_score, recall_score, f1_score,
                             confusion_matrix, ConfusionMatrixDisplay, classification_report, roc_auc_score)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)          # 0 = malignant, 1 = benign
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

print("Accuracy :", round(accuracy_score(y_test, y_pred), 3))
print("Precision:", round(precision_score(y_test, y_pred), 3))
print("Recall   :", round(recall_score(y_test, y_pred), 3))
print("F1-score :", round(f1_score(y_test, y_pred), 3))
print("ROC AUC  :", round(roc_auc_score(y_test, y_prob), 3))
print(classification_report(y_test, y_pred, target_names=["malignant", "benign"]))

cm = confusion_matrix(y_test, y_pred)
print(cm)                                        # [[TN FP] [FN TP]] with benign as the positive class
ConfusionMatrixDisplay(cm, display_labels=["malignant", "benign"]).plot()
plt.show()

# Effect of the decision threshold
for threshold in (0.3, 0.5, 0.7):
    pred_t = (y_prob >= threshold).astype(int)
    print(threshold, "precision", round(precision_score(y_test, pred_t), 3), "recall", round(recall_score(y_test, pred_t), 3))</code></pre>
<p>Expect accuracy around 0.95–0.99. As the threshold rises, precision for "benign" goes up and recall goes down — explain which error matters more in a cancer screen (missing a malignant tumour).</p>
<div class="callout callout-warning">sklearn's <code>confusion_matrix</code> puts <strong>actual classes in rows</strong> and <strong>predicted in columns</strong>, ordered by label value (0 then 1). With label 1 as positive the layout is [[TN, FP], [FN, TP]] — not the TP-first layout used in many textbooks.</div>
"""
))

TOPICS.append(topic(
    "Labs 16–18 — Support Vector Machine & Decision Boundary Analysis",
    "Linear vs RBF kernels, C and gamma",
    r"""
<pre><code class="language-python">import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

X, y = make_moons(n_samples=300, noise=0.25, random_state=42)   # two interleaving half circles
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

models = {
    "linear, C=1":          SVC(kernel="linear", C=1),
    "rbf, C=1, gamma=1":    SVC(kernel="rbf", C=1, gamma=1),
    "rbf, C=100, gamma=10": SVC(kernel="rbf", C=100, gamma=10),
}

xx, yy = np.meshgrid(np.linspace(X[:, 0].min() - 0.5, X[:, 0].max() + 0.5, 300),
                     np.linspace(X[:, 1].min() - 0.5, X[:, 1].max() + 0.5, 300))

fig, axes = plt.subplots(1, 3, figsize=(15, 4))
for ax, (name, svc) in zip(axes, models.items()):
    clf = make_pipeline(StandardScaler(), svc).fit(X_train, y_train)
    train_acc = accuracy_score(y_train, clf.predict(X_train))
    test_acc = accuracy_score(y_test, clf.predict(X_test))
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
    ax.contourf(xx, yy, Z, alpha=0.25)
    ax.scatter(X[:, 0], X[:, 1], c=y, s=12, edgecolors="k")
    ax.set_title(f"{name}\ntrain {train_acc:.2f} / test {test_acc:.2f}")
    print(name, "support vectors per class:", clf[-1].n_support_)
plt.show()</code></pre>
<h3>What to write in the observation</h3>
<ul>
  <li><strong>Linear kernel</strong> draws a straight boundary and misclassifies the curved regions (underfits the moons).</li>
  <li><strong>RBF, C = 1, γ = 1</strong> follows the curves smoothly — usually the best test accuracy.</li>
  <li><strong>RBF, C = 100, γ = 10</strong> wraps tightly around individual points: training accuracy rises, test accuracy drops — overfitting.</li>
  <li>Fewer support vectors generally means a simpler, wider-margin model.</li>
</ul>
"""
))

TOPICS.append(topic(
    "Labs 19–20 — K-Nearest Neighbours Classification",
    "Choosing k with cross-validation",
    r"""
<pre><code class="language-python">import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

ks = range(1, 26, 2)                           # odd k values
cv_scores = []
for k in ks:
    pipe = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))
    cv_scores.append(cross_val_score(pipe, X_train, y_train, cv=5).mean())

best_k = ks[cv_scores.index(max(cv_scores))]
print("Best k:", best_k)

plt.plot(list(ks), cv_scores, marker="o")
plt.xlabel("k"); plt.ylabel("5-fold CV accuracy"); plt.title("Choosing k"); plt.show()

final = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=best_k)).fit(X_train, y_train)
y_pred = final.predict(X_test)
print("Test accuracy:", round(accuracy_score(y_test, y_pred), 3))
print(confusion_matrix(y_test, y_pred))

# Classify a new flower: sepal length, sepal width, petal length, petal width (cm)
print("Prediction:", load_iris().target_names[final.predict([[5.1, 3.5, 1.4, 0.2]])[0]])   # setosa</code></pre>
<p>Iris test accuracy is typically 0.93–1.00. Very small k gives a noisy CV curve (high variance); very large k starts to blur classes together (high bias).</p>
"""
))

TOPICS.append(topic(
    "Labs 21–22 — Decision Tree Classifier & Visualising the Tree",
    "Gini vs entropy, depth control and feature importance",
    r"""
<pre><code class="language-python">import matplotlib.pyplot as plt
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3,
                                                    random_state=42, stratify=iris.target)

for depth in (1, 2, 3, None):
    tree = DecisionTreeClassifier(criterion="gini", max_depth=depth, random_state=42).fit(X_train, y_train)
    print(f"max_depth={depth}: train {tree.score(X_train, y_train):.2f}, test {tree.score(X_test, y_test):.2f}")

tree = DecisionTreeClassifier(criterion="entropy", max_depth=3, random_state=42).fit(X_train, y_train)
print("Test accuracy:", round(accuracy_score(y_test, tree.predict(X_test)), 3))

print(export_text(tree, feature_names=list(iris.feature_names)))     # the rules as text

plt.figure(figsize=(14, 7))
plot_tree(tree, feature_names=iris.feature_names, class_names=iris.target_names,
          filled=True, rounded=True, fontsize=9)
plt.show()

print(pd.Series(tree.feature_importances_, index=iris.feature_names).sort_values(ascending=False))</code></pre>
<h3>Observations to note</h3>
<ul>
  <li>The root split is on a <strong>petal</strong> measurement — it separates setosa perfectly (that child node has entropy 0).</li>
  <li>An unlimited-depth tree reaches 100% training accuracy but does not improve test accuracy — overfitting; <code>max_depth=3</code> is enough.</li>
  <li>Petal length and petal width carry almost all of the feature importance.</li>
</ul>
"""
))

TOPICS.append(topic(
    "Labs 23–24 — K-Means Clustering, Elbow Method & Silhouette",
    "Grouping unlabelled data",
    r"""
<pre><code class="language-python">import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

# Synthetic "customers": annual spend and visits per month, with 4 hidden groups
X, _ = make_blobs(n_samples=400, centers=4, cluster_std=1.1, random_state=7)
X = StandardScaler().fit_transform(X)

wcss, sil = [], []
ks = range(2, 11)
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(X)
    wcss.append(km.inertia_)
    sil.append(silhouette_score(X, km.labels_))

fig, (a, b) = plt.subplots(1, 2, figsize=(11, 4))
a.plot(list(ks), wcss, marker="o"); a.set_title("Elbow method"); a.set_xlabel("k"); a.set_ylabel("WCSS")
b.plot(list(ks), sil, marker="o"); b.set_title("Silhouette score"); b.set_xlabel("k")
plt.show()

best_k = ks[sil.index(max(sil))]
print("Best k by silhouette:", best_k)                   # expect 4 (the number of generated groups)

km = KMeans(n_clusters=best_k, n_init=10, random_state=42).fit(X)
plt.scatter(X[:, 0], X[:, 1], c=km.labels_, s=15)
plt.scatter(*km.cluster_centers_.T, marker="X", s=200, c="black")
plt.title(f"K-Means with k={best_k}"); plt.show()</code></pre>
<p>The elbow should bend and the silhouette peak at or near k = 4, matching the four generated groups (if two blobs overlap, k = 3 can score close). For a real "customer segmentation" record, describe each cluster from its centroid (e.g. high spend / low visits).</p>
"""
))

TOPICS.append(topic(
    "Labs 25–26 — Principal Component Analysis for Dimensionality Reduction",
    "Explained variance and a 2-D projection",
    r"""
<pre><code class="language-python">import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_wine
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline

wine = load_wine()
X, y = wine.data, wine.target                    # 13 chemical features, 3 cultivars
X_std = StandardScaler().fit_transform(X)

pca = PCA().fit(X_std)
cumulative = np.cumsum(pca.explained_variance_ratio_)
print("Explained variance ratio:", pca.explained_variance_ratio_.round(3))
print("Components for 95% variance:", np.argmax(cumulative >= 0.95) + 1)

plt.plot(range(1, 14), cumulative, marker="o")
plt.axhline(0.95, linestyle="--", color="gray")
plt.xlabel("Number of components"); plt.ylabel("Cumulative explained variance"); plt.show()

X_2d = PCA(n_components=2).fit_transform(X_std)
plt.scatter(X_2d[:, 0], X_2d[:, 1], c=y, s=18)
plt.xlabel("PC1"); plt.ylabel("PC2"); plt.title("Wine data projected to 2 components"); plt.show()

full = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
reduced = make_pipeline(StandardScaler(), PCA(n_components=2), LogisticRegression(max_iter=1000))
print("CV accuracy, 13 features:", cross_val_score(full, X, y, cv=5).mean().round(3))
print("CV accuracy, 2 components:", cross_val_score(reduced, X, y, cv=5).mean().round(3))</code></pre>
<p>PC1 and PC2 together explain a little over half the variance (about 36% + 19%), yet the three wine classes already separate clearly in 2-D, and accuracy with just 2 components stays close to the full model.</p>
"""
))

TOPICS.append(topic(
    "Labs 27–30 — Mini AI/ML Project: Structure, Template & Problem Ideas",
    "Preprocessing + model building + evaluation, end to end",
    r"""
<h3>1. Project structure (groups of 3–4)</h3>
<ol>
  <li><strong>Problem statement</strong> — who benefits, what is predicted, which metric defines success.</li>
  <li><strong>Dataset</strong> — source, size, features, target, licence.</li>
  <li><strong>EDA</strong> — distributions, missing values, correlations, class balance, 4–6 meaningful plots.</li>
  <li><strong>Pre-processing &amp; feature engineering</strong> — every decision justified.</li>
  <li><strong>Models</strong> — a simple baseline plus at least two stronger models.</li>
  <li><strong>Evaluation</strong> — cross-validation, test-set metrics, confusion matrix or residual plot, comparison table.</li>
  <li><strong>Tuning</strong> — GridSearchCV / RandomizedSearchCV.</li>
  <li><strong>Conclusion</strong> — best model, limitations, ethical considerations, future work.</li>
  <li><strong>Demo</strong> (bonus) — a small Streamlit or Gradio app.</li>
</ol>

<h3>2. Reusable template</h3>
<pre><code class="language-python">import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

df = pd.read_csv("your_dataset.csv")
target = "churn"
X, y = df.drop(columns=target), df[target]
numeric = X.select_dtypes("number").columns
categorical = X.select_dtypes(exclude="number").columns

prep = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), numeric),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                      ("oh", OneHotEncoder(handle_unknown="ignore"))]), categorical),
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

candidates = {
    "logistic": (LogisticRegression(max_iter=2000), {"model__C": [0.1, 1, 10]}),
    "forest":   (RandomForestClassifier(random_state=42), {"model__n_estimators": [200, 400],
                                                            "model__max_depth": [None, 10, 20]}),
}
for name, (estimator, grid) in candidates.items():
    search = GridSearchCV(Pipeline([("prep", prep), ("model", estimator)]), grid, cv=5, scoring="f1_macro")
    search.fit(X_train, y_train)
    print(name, search.best_params_, round(search.best_score_, 3))
    print(classification_report(y_test, search.predict(X_test)))</code></pre>

<h3>3. Suggested problems from the course handout</h3>
<table>
  <thead><tr><th>Type</th><th>Project</th><th>Suggested models</th><th>Key metric</th></tr></thead>
  <tbody>
    <tr><td>Regression</td><td>House price, employee salary, sales forecasting, crop yield, air quality</td><td>linear / polynomial regression, random forest</td><td>RMSE, R²</td></tr>
    <tr><td>Classification</td><td>Student performance, customer churn, loan approval, heart disease, diabetes, spam email, fake news, attendance</td><td>logistic regression, decision tree, random forest, SVM, Naive Bayes (text)</td><td>F1, recall, ROC AUC</td></tr>
    <tr><td>Imbalanced classification</td><td>Credit card fraud</td><td>logistic regression / random forest with class weights or SMOTE</td><td>recall, precision–recall AUC</td></tr>
    <tr><td>Clustering</td><td>Customer segmentation</td><td>K-Means, hierarchical, DBSCAN</td><td>silhouette score</td></tr>
    <tr><td>Recommendation</td><td>Movie recommendation</td><td>content-based (TF-IDF + cosine), item-based collaborative filtering</td><td>precision@k</td></tr>
    <tr><td>Time series</td><td>Weather prediction, predictive maintenance from sensor data</td><td>lag features + regression / random forest</td><td>MAE</td></tr>
    <tr><td>Text</td><td>Sentiment analysis of reviews</td><td>TF-IDF + logistic regression / Naive Bayes</td><td>F1</td></tr>
    <tr><td>Search / optimisation</td><td>Traffic route optimisation</td><td>A*, Dijkstra on a road graph</td><td>path cost, time</td></tr>
  </tbody>
</table>

<div class="callout callout-warning"><strong>Common reasons projects lose marks:</strong> scaling before splitting (leakage), reporting only accuracy on imbalanced data, no baseline, no explanation of results, and notebooks that fail on "Restart &amp; Run All".</div>
"""
))
