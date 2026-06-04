if (typeof JAVA_DSA_PROBLEMS !== 'undefined') {
  JAVA_DSA_PROBLEMS.push(
  // --- BST ---
  {
    id: "java-tp-bst-001",
    title: "Validate BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["BST", "Tree", "Validation"],
    category: "testpad",
    prompt: "Given a binary tree, check if it is a valid Binary Search Tree (BST).",
    constraints: ["1 <= number of nodes <= 10^4"],
    examples: [
      { input: "Tree: [10, 5, 15, 2, 7, 12, 20]", output: "true" },
      { input: "Tree: [10, 5, 15, null, null, 6, 20]", output: "false" }
    ],
    type: "binary_tree",
    methodName: "isBST",
    returnType: "boolean",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static boolean isBST(Node root) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static boolean isBST(Node root) {
        return isBSTUtil(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private static boolean isBSTUtil(Node node, long min, long max) {
        if (node == null) return true;
        if (node.data <= min || node.data >= max) return false;
        return isBSTUtil(node.left, min, node.data) && isBSTUtil(node.right, node.data, max);
    }
}`,
    testCases: [
      { input: { tree: [10, 5, 15, 2, 7, 12, 20], args: [] }, expected: "true", visible: true },
      { input: { tree: [10, 5, 15, null, null, 6, 20], args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-bst-005",
    title: "Floor and Ceil in BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["BST", "Tree"],
    category: "testpad",
    prompt: "Given a Binary Search Tree (BST) and a key, find the floor (largest node value <= key) and ceil (smallest node value >= key) of the key. Return them as a space-separated string: <code>\"floor ceil\"</code>. Use <code>-1</code> if not found.",
    constraints: ["1 <= number of nodes <= 10^4"],
    examples: [
      { input: "Tree: [8, 4, 12, 2, 6, 10, 14], key = 5", output: "4 6" }
    ],
    type: "binary_tree",
    methodName: "findFloorCeil",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String findFloorCeil(Node root, int key) {
        // Write your code here
        return "-1 -1";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String findFloorCeil(Node root, int key) {
        int floor = -1, ceil = -1;
        Node curr = root;
        while (curr != null) {
            if (curr.data == key) { floor = curr.data; break; }
            else if (curr.data < key) { floor = curr.data; curr = curr.right; }
            else { curr = curr.left; }
        }
        curr = root;
        while (curr != null) {
            if (curr.data == key) { ceil = curr.data; break; }
            else if (curr.data > key) { ceil = curr.data; curr = curr.left; }
            else { curr = curr.right; }
        }
        return floor + " " + ceil;
    }
}`,
    testCases: [
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [5] }, expected: "4 6", visible: true },
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [11] }, expected: "10 12", visible: true }
    ]
  },

  // --- Binary Tree ---
  {
    id: "java-tp-bt-005",
    title: "Recursive Tree Traversals",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Complete the inorder, preorder, and postorder traversal functions using recursion. Return them as a single string where each traversal is on a new line (values space-separated). Format: <code>\"inorder\\npreorder\\npostorder\"</code>.",
    constraints: ["1 <= number of nodes <= 10^3"],
    examples: [
      { input: "Tree: [1, 2, 3]", output: "2 1 3\\n1 2 3\\n2 3 1" }
    ],
    type: "binary_tree",
    methodName: "traverse",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String traverse(Node root) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String traverse(Node root) {
        StringBuilder pre = new StringBuilder();
        StringBuilder in = new StringBuilder();
        StringBuilder post = new StringBuilder();
        preorder(root, pre);
        inorder(root, in);
        postorder(root, post);
        return in.toString().trim() + "\\n" + pre.toString().trim() + "\\n" + post.toString().trim();
    }
    private static void preorder(Node node, StringBuilder sb) {
        if (node == null) return;
        if (sb.length() > 0) sb.append(" ");
        sb.append(node.data);
        preorder(node.left, sb);
        preorder(node.right, sb);
    }
    private static void inorder(Node node, StringBuilder sb) {
        if (node == null) return;
        inorder(node.left, sb);
        if (sb.length() > 0) sb.append(" ");
        sb.append(node.data);
        inorder(node.right, sb);
    }
    private static void postorder(Node node, StringBuilder sb) {
        if (node == null) return;
        postorder(node.left, sb);
        postorder(node.right, sb);
        if (sb.length() > 0) sb.append(" ");
        sb.append(node.data);
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3], args: [] }, expected: "2 1 3\n1 2 3\n2 3 1", visible: true }
    ]
  },
  {
    id: "java-tp-bt-006",
    title: "Construct Tree from Inorder and Postorder",
    section: "Binary Trees",
    difficulty: "Hard",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Construct a binary tree from given inorder and postorder traversal arrays. Inorder values are passed as the array argument, and postorder values are passed as a comma-separated string in the second argument. Return the root node (the runner will verify it inorder).",
    constraints: ["1 <= array size <= 1000"],
    examples: [
      { input: "inorder = [2, 1, 3], postorder = \"2,3,1\"", output: "2 1 3" }
    ],
    type: "array_return",
    methodName: "buildTree",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static Node buildTree(int[] inorder, String postorderStr) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    private static int postIdx;
    private static java.util.Map<Integer, Integer> map;
    static Node buildTree(int[] inorder, String postorderStr) {
        String[] parts = postorderStr.trim().split(",");
        int[] postorder = new int[parts.length];
        for (int i = 0; i < parts.length; i++) postorder[i] = Integer.parseInt(parts[i].trim());
        postIdx = postorder.length - 1;
        map = new java.util.HashMap<>();
        for (int i = 0; i < inorder.length; i++) map.put(inorder[i], i);
        return build(postorder, 0, inorder.length - 1);
    }
    private static Node build(int[] post, int inStart, int inEnd) {
        if (inStart > inEnd) return null;
        int val = post[postIdx--];
        Node node = new Node(val);
        int idx = map.get(val);
        node.right = build(post, idx + 1, inEnd);
        node.left = build(post, inStart, idx - 1);
        return node;
    }
}`,
    testCases: [
      { input: { array: [2, 1, 3], args: ["\"2,3,1\""] }, expected: "2 1 3", visible: true }
    ]
  },
  {
    id: "java-tp-bt-008",
    title: "All Root-to-Leaf Paths",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Find all root-to-leaf paths of a binary tree. Return them as a single string where each path is on a new line (values space-separated).",
    constraints: ["1 <= number of nodes <= 10^3"],
    examples: [
      { input: "Tree: [1, 2, 3]", output: "1 2\\n1 3" }
    ],
    type: "binary_tree",
    methodName: "allPaths",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String allPaths(Node root) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String allPaths(Node root) {
        java.util.List<String> paths = new java.util.ArrayList<>();
        findPaths(root, "", paths);
        return String.join("\\n", paths);
    }
    private static void findPaths(Node node, String path, java.util.List<String> paths) {
        if (node == null) return;
        String newPath = path.isEmpty() ? String.valueOf(node.data) : path + " " + node.data;
        if (node.left == null && node.right == null) {
            paths.add(newPath);
            return;
        }
        findPaths(node.left, newPath, paths);
        findPaths(node.right, newPath, paths);
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3], args: [] }, expected: "1 2\n1 3", visible: true }
    ]
  },
  {
    id: "java-tp-bt-009",
    title: "Right Sibling of a Node",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Given a binary tree and a target node value, find and return the value of the node immediately to its right at the same level. Return <code>-1</code> if no such node exists.",
    constraints: ["1 <= number of nodes <= 10^4"],
    examples: [
      { input: "Tree: [1, 2, 3, 4, 5, null, 6], target = 2", output: "3" }
    ],
    type: "binary_tree",
    methodName: "findRightNode",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int findRightNode(Node root, int val) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int findRightNode(Node root, int val) {
        if (root == null) return -1;
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                Node curr = q.poll();
                if (curr.data == val) {
                    if (i < size - 1) return q.peek().data;
                    return -1;
                }
                if (curr.left != null) q.add(curr.left);
                if (curr.right != null) q.add(curr.right);
            }
        }
        return -1;
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, 4, 5, null, 6], args: [2] }, expected: "3", visible: true },
      { input: { tree: [1, 2, 3, 4, 5, null, 6], args: [5] }, expected: "6", visible: true }
    ]
  },
  {
    id: "java-tp-bt-011",
    title: "Print Cousins of Node",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Given a binary tree and a target node value, return all its cousins (nodes at the same level but with a different parent) as a space-separated string in ascending order. Return <code>\"-1\"</code> if none exist.",
    constraints: ["1 <= number of nodes <= 10^4"],
    examples: [
      { input: "Tree: [1, 2, 3, 4, 5, null, 6], target = 5", output: "6" }
    ],
    type: "binary_tree",
    methodName: "printCousins",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String printCousins(Node root, int val) {
        // Write your code here
        return "-1";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String printCousins(Node root, int val) {
        if (root == null || root.data == val) return "-1";
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        boolean found = false;
        java.util.List<Integer> cousins = new java.util.ArrayList<>();
        while (!q.isEmpty() && !found) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                Node curr = q.poll();
                boolean leftIsVal = curr.left != null && curr.left.data == val;
                boolean rightIsVal = curr.right != null && curr.right.data == val;
                if (leftIsVal || rightIsVal) {
                    found = true;
                } else {
                    if (curr.left != null) q.add(curr.left);
                    if (curr.right != null) q.add(curr.right);
                }
            }
            if (found) {
                while (!q.isEmpty()) {
                    Node n = q.poll();
                    if (n.left != null && n.left.data != val) cousins.add(n.left.data);
                    if (n.right != null && n.right.data != val) cousins.add(n.right.data);
                }
            }
        }
        if (cousins.isEmpty()) return "-1";
        java.util.Collections.sort(cousins);
        return cousins.stream().map(String::valueOf).collect(java.util.stream.Collectors.joining(" "));
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, 4, 5, null, 6], args: [5] }, expected: "6", visible: true },
      { input: { tree: [1, 2, 3, 4, 5, null, 6], args: [2] }, expected: "-1", visible: true }
    ]
  },
  {
    id: "java-tp-bt-012",
    title: "Top View of Binary Tree",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Find and return the top view of a binary tree as space-separated node values from left to right.",
    constraints: ["1 <= number of nodes <= 10^4"],
    examples: [
      { input: "Tree: [1, 2, 3, null, 4, null, null, null, 5]", output: "2 1 3 5" }
    ],
    type: "binary_tree",
    methodName: "topView",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static String topView(Node root) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static class Pair {
        Node node; int hd;
        Pair(Node n, int h) { node = n; hd = h; }
    }
    static String topView(Node root) {
        if (root == null) return "";
        java.util.TreeMap<Integer, Integer> map = new java.util.TreeMap<>();
        java.util.Queue<Pair> q = new java.util.LinkedList<>();
        q.add(new Pair(root, 0));
        while (!q.isEmpty()) {
            Pair p = q.poll();
            if (!map.containsKey(p.hd)) {
                map.put(p.hd, p.node.data);
            }
            if (p.node.left != null) q.add(new Pair(p.node.left, p.hd - 1));
            if (p.node.right != null) q.add(new Pair(p.node.right, p.hd + 1));
        }
        return map.values().stream().map(String::valueOf).collect(java.util.stream.Collectors.joining(" "));
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, null, 4, null, null, null, 5], args: [] }, expected: "2 1 3 5", visible: true }
    ]
  },
  {
    id: "java-tp-bt-013",
    title: "Check Foldable Tree",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Determine if a binary tree is foldable. A tree is foldable if its left and right subtrees are structural mirrors of each other.",
    constraints: ["1 <= number of nodes <= 10^4"],
    examples: [
      { input: "Tree: [10, 7, 15, null, 9, 11, null]", output: "true" }
    ],
    type: "binary_tree",
    methodName: "isFoldable",
    returnType: "boolean",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static boolean isFoldable(Node root) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static boolean isFoldable(Node root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }
    private static boolean isMirror(Node n1, Node n2) {
        if (n1 == null && n2 == null) return true;
        if (n1 == null || n2 == null) return false;
        return isMirror(n1.left, n2.right) && isMirror(n1.right, n2.left);
    }
}`,
    testCases: [
      { input: { tree: [10, 7, 15, null, 9, 11, null], args: [] }, expected: "true", visible: true },
      { input: { tree: [10, 7, 15, 5, null, 11, null], args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-bt-014",
    title: "Identical Trees Check",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Given two binary trees, check if they are identical (same structure and same node values).",
    constraints: ["1 <= number of nodes <= 5000"],
    examples: [
      { input: "Tree1: [1, 2, 3], Tree2: [1, 2, 3]", output: "true" }
    ],
    type: "two_binary_trees",
    methodName: "isIdentical",
    returnType: "boolean",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static boolean isIdentical(Node r1, Node r2) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static boolean isIdentical(Node r1, Node r2) {
        if (r1 == null && r2 == null) return true;
        if (r1 == null || r2 == null) return false;
        return (r1.data == r2.data) && isIdentical(r1.left, r2.left) && isIdentical(r1.right, r2.right);
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3], tree2: [1, 2, 3], args: [] }, expected: "true", visible: true },
      { input: { tree: [1, 2], tree2: [1, null, 2], args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-bt-015",
    title: "Maximum Depth of Tree",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Given a binary tree, find and return its maximum depth (height).",
    constraints: ["0 <= number of nodes <= 5000"],
    examples: [
      { input: "Tree: [3, 9, 20, null, null, 15, 7]", output: "3" }
    ],
    type: "binary_tree",
    methodName: "maxDepth",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int maxDepth(Node root) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int maxDepth(Node root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
    testCases: [
      { input: { tree: [3, 9, 20, null, null, 15, 7], args: [] }, expected: "3", visible: true },
      { input: { tree: [1, null, 2], args: [] }, expected: "2", visible: true }
    ]
  },
  {
    id: "java-tp-bt-016",
    title: "Evaluation of Expression Tree",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "Evaluation"],
    category: "testpad",
    prompt: "Evaluate a binary expression tree. Nodes can contain operators (ASCII: + as 43, - as 45, * as 42, / as 47) or leaf nodes containing positive integer values.",
    constraints: ["1 <= number of nodes <= 1000"],
    examples: [
      { input: "Tree: [43, 42, 5, 4, 10] (representing (4*10)+5)", output: "45" }
    ],
    type: "binary_tree",
    methodName: "eval",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int eval(Node root) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int eval(Node root) {
        if (root == null) return 0;
        if (root.left == null && root.right == null) return root.data;
        int leftVal = eval(root.left);
        int rightVal = eval(root.right);
        if (root.data == 43) return leftVal + rightVal;
        if (root.data == 45) return leftVal - rightVal;
        if (root.data == 42) return leftVal * rightVal;
        if (root.data == 47) return leftVal / rightVal;
        return 0;
    }
}`,
    testCases: [
      { input: { tree: [43, 42, 5, 4, 10], args: [] }, expected: "45", visible: true }
    ]
  },

  // --- Bit Manipulation ---
  {
    id: "java-tp-bit-001",
    title: "Count Set Bits",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    category: "testpad",
    prompt: "Given an integer <code>n</code>, return the number of set bits (1s) in its binary representation.",
    constraints: ["0 <= n <= 10^9"],
    examples: [
      { input: "n = 6", output: "2" }
    ],
    type: "array_return",
    methodName: "countSetBits",
    returnType: "int",
    starterCode: `class Solution {
    static int countSetBits(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int countSetBits(int n) {
        int count = 0;
        while (n > 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`,
    testCases: [
      { input: { array: [], args: [6] }, expected: "2", visible: true },
      { input: { array: [], args: [15] }, expected: "4", visible: true }
    ]
  },
  {
    id: "java-tp-bit-002",
    title: "Toggle Bits Except Kth",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    category: "testpad",
    prompt: "Toggle all bits of a 32-bit integer except the <code>k</code>-th bit (0-indexed, from right).",
    constraints: ["0 <= k <= 30"],
    examples: [
      { input: "n = 10, k = 1", output: "-9" }
    ],
    type: "array_return",
    methodName: "toggleExceptKth",
    returnType: "int",
    starterCode: `class Solution {
    static int toggleExceptKth(int n, int k) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int toggleExceptKth(int n, int k) {
        return n ^ ~(1 << k);
    }
}`,
    testCases: [
      { input: { array: [], args: [10, 1] }, expected: "-9", visible: true },
      { input: { array: [], args: [0, 0] }, expected: "-2", visible: true }
    ]
  },
  {
    id: "java-tp-bit-003",
    title: "Odd Man Out",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    category: "testpad",
    prompt: "Given an array of integers where every element appears twice except for one, find and return that single unique element using bitwise XOR.",
    constraints: ["1 <= array size <= 10^5"],
    examples: [
      { input: "arr = [4, 1, 2, 1, 2]", output: "4" }
    ],
    type: "array_return",
    methodName: "findOddManOut",
    returnType: "int",
    starterCode: `class Solution {
    static int findOddManOut(int[] arr) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int findOddManOut(int[] arr) {
        int xor = 0;
        for (int x : arr) xor ^= x;
        return xor;
    }
}`,
    testCases: [
      { input: { array: [2, 2, 1], args: [] }, expected: "1", visible: true },
      { input: { array: [4, 1, 2, 1, 2], args: [] }, expected: "4", visible: true }
    ]
  },
  {
    id: "java-tp-bit-004",
    title: "Two Strange Elements",
    section: "Bit Manipulation",
    difficulty: "Medium",
    tags: ["Bit Manipulation"],
    category: "testpad",
    prompt: "Given an array of integers where every element appears twice except for two unique elements, find and return those two elements. Return them as a space-separated string in ascending order: <code>\"a b\"</code>.",
    constraints: ["2 <= array size <= 10^5"],
    examples: [
      { input: "arr = [2, 4, 7, 9, 2, 4]", output: "7 9" }
    ],
    type: "array_return",
    methodName: "findTwoStrange",
    returnType: "String",
    starterCode: `class Solution {
    static String findTwoStrange(int[] arr) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String findTwoStrange(int[] arr) {
        int xor = 0;
        for (int x : arr) xor ^= x;
        int setBit = xor & ~(xor - 1);
        int a = 0, b = 0;
        for (int x : arr) {
            if ((x & setBit) != 0) a ^= x;
            else b ^= x;
        }
        int min = Math.min(a, b);
        int max = Math.max(a, b);
        return min + " " + max;
    }
}`,
    testCases: [
      { input: { array: [2, 4, 7, 9, 2, 4], args: [] }, expected: "7 9", visible: true },
      { input: { array: [1, 2, 1, 3, 2, 5], args: [] }, expected: "3 5", visible: true }
    ]
  },
  {
    id: "java-tp-bit-005",
    title: "Saving Earth with Binary Fever",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    category: "testpad",
    prompt: "To save the Earth, you need to reach a distance of <code>n</code> using the minimum number of jumps. You can only make jumps of lengths that are powers of 2 (1, 2, 4, 8, ...). Find the minimum number of jumps required.",
    constraints: ["1 <= n <= 10^9"],
    examples: [
      { input: "n = 7", output: "3" }
    ],
    type: "array_return",
    methodName: "minJumps",
    returnType: "int",
    starterCode: `class Solution {
    static int minJumps(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int minJumps(int n) {
        int count = 0;
        while (n > 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`,
    testCases: [
      { input: { array: [], args: [7] }, expected: "3", visible: true },
      { input: { array: [], args: [16] }, expected: "1", visible: true }
    ]
  },

  // --- Circular Linked List ---
  {
    id: "java-tp-cll-002",
    title: "Insert in Circular Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Insert a new node with a given value at the end of a Circular Linked List (CLL). Return the head node of the modified circular list.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3], val = 4", output: "1 2 3 4" }
    ],
    type: "circular_list",
    methodName: "insertEnd",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node insertEnd(Node head, int val) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node insertEnd(Node head, int val) {
        Node temp = new Node(val);
        if (head == null) {
            temp.next = temp;
            return temp;
        }
        Node curr = head;
        while (curr.next != head) curr = curr.next;
        curr.next = temp;
        temp.next = head;
        return head;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], args: [4] }, expected: "1 2 3 4", visible: true },
      { input: { list: [], args: [5] }, expected: "5", visible: true }
    ]
  },
  {
    id: "java-tp-cll-003",
    title: "Delete in Circular Linked List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Delete a node with a given key from a Circular Linked List. Return the head node of the modified circular list.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3], key = 2", output: "1 3" }
    ],
    type: "circular_list",
    methodName: "deleteNode",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node deleteNode(Node head, int key) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node deleteNode(Node head, int key) {
        if (head == null) return null;
        Node curr = head, prev = null;
        while (curr.data != key) {
            if (curr.next == head) return head; // not found
            prev = curr;
            curr = curr.next;
        }
        if (curr.next == head && prev == null) {
            return null;
        }
        if (curr == head) {
            prev = head;
            while (prev.next != head) prev = prev.next;
            head = head.next;
            prev.next = head;
        } else {
            prev.next = curr.next;
        }
        return head;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], args: [2] }, expected: "1 3", visible: true },
      { input: { list: [1, 2, 3], args: [1] }, expected: "2 3", visible: true }
    ]
  },
  {
    id: "java-tp-cll-004",
    title: "Count Nodes in Circular Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Count and return the number of nodes in a Circular Linked List.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [10, 20, 30, 40]", output: "4" }
    ],
    type: "circular_list",
    methodName: "countNodes",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static int countNodes(Node head) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static int countNodes(Node head) {
        if (head == null) return 0;
        int count = 0;
        Node curr = head;
        do {
            count++;
            curr = curr.next;
        } while (curr != head);
        return count;
    }
}`,
    testCases: [
      { input: { list: [10, 20, 30, 40], args: [] }, expected: "4", visible: true },
      { input: { list: [], args: [] }, expected: "0", visible: true }
    ]
  },
  {
    id: "java-tp-cll-005",
    title: "Insert Sorted Circular List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Insert a new value into a sorted Circular Linked List such that the list remains sorted. Return the head node of the modified circular list.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 3, 5], val = 4", output: "1 3 4 5" }
    ],
    type: "circular_list",
    methodName: "insertSorted",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node insertSorted(Node head, int val) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node insertSorted(Node head, int val) {
        Node temp = new Node(val);
        if (head == null) {
            temp.next = temp;
            return temp;
        }
        Node curr = head;
        if (val < head.data) {
            while (curr.next != head) curr = curr.next;
            curr.next = temp;
            temp.next = head;
            return temp;
        }
        while (curr.next != head && curr.next.data < val) {
            curr = curr.next;
        }
        temp.next = curr.next;
        curr.next = temp;
        return head;
    }
}`,
    testCases: [
      { input: { list: [1, 3, 5], args: [4] }, expected: "1 3 4 5", visible: true },
      { input: { list: [2, 4, 6], args: [1] }, expected: "1 2 4 6", visible: true }
    ]
  },
  {
    id: "java-tp-cll-006",
    title: "Split Circular Linked List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Split a Circular Linked List into two halves. If the number of nodes is odd, the first list should have one more node. Return the head of the second list.",
    constraints: ["2 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3, 4]", output: "3 4" }
    ],
    type: "circular_list",
    methodName: "splitList",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node splitList(Node head) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node splitList(Node head) {
        if (head == null || head.next == head) return null;
        Node slow = head, fast = head;
        while (fast.next != head && fast.next.next != head) {
            fast = fast.next.next;
            slow = slow.next;
        }
        if (fast.next.next == head) fast = fast.next;
        Node head2 = slow.next;
        fast.next = head2;
        slow.next = head;
        return head2;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4], args: [] }, expected: "3 4", visible: true },
      { input: { list: [1, 2, 3, 4, 5], args: [] }, expected: "4 5", visible: true }
    ]
  },

  // --- Doubly Linked List ---
  {
    id: "java-tp-dll-001",
    title: "Swap Two Nodes of DLL",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Doubly Linked List"],
    category: "testpad",
    prompt: "Swap two nodes of a Doubly Linked List given their positions (1-indexed). Return the head node of the modified DLL.",
    constraints: ["2 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3, 4], p1 = 2, p2 = 4", output: "1 4 3 2" }
    ],
    type: "doubly_linked_list",
    methodName: "swapNodes",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next, prev;
        Node(int d) { data = d; }
    }
    static Node swapNodes(Node head, int p1, int p2) {
        // Write your code here
        return head;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next, prev;
        Node(int d) { data = d; }
    }
    static Node swapNodes(Node head, int p1, int p2) {
        if (p1 == p2 || head == null) return head;
        Node n1 = head, n2 = head;
        for (int i = 1; i < p1 && n1 != null; i++) n1 = n1.next;
        for (int i = 1; i < p2 && n2 != null; i++) n2 = n2.next;
        if (n1 == null || n2 == null) return head;
        int temp = n1.data;
        n1.data = n2.data;
        n2.data = temp;
        return head;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4], args: [2, 4] }, expected: "1 4 3 2", visible: true },
      { input: { list: [10, 20, 30], args: [1, 3] }, expected: "30 20 10", visible: true }
    ]
  },
  {
    id: "java-tp-dll-002",
    title: "Rotate DLL by K Elements",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Doubly Linked List"],
    category: "testpad",
    prompt: "Left-rotate a Doubly Linked List by <code>k</code> positions. Return the head of the rotated DLL.",
    constraints: ["1 <= k <= number of nodes"],
    examples: [
      { input: "list = [1, 2, 3, 4, 5], k = 2", output: "3 4 5 1 2" }
    ],
    type: "doubly_linked_list",
    methodName: "rotateDLL",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next, prev;
        Node(int d) { data = d; }
    }
    static Node rotateDLL(Node head, int k) {
        // Write your code here
        return head;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next, prev;
        Node(int d) { data = d; }
    }
    static Node rotateDLL(Node head, int k) {
        if (head == null || k == 0) return head;
        Node curr = head;
        int count = 1;
        while (count < k && curr != null) {
            curr = curr.next;
            count++;
        }
        if (curr == null || curr.next == null) return head;
        Node nthNode = curr;
        while (curr.next != null) curr = curr.next;
        curr.next = head;
        head.prev = curr;
        Node newHead = nthNode.next;
        newHead.prev = null;
        nthNode.next = null;
        return newHead;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 5], args: [2] }, expected: "3 4 5 1 2", visible: true },
      { input: { list: [10, 20, 30], args: [1] }, expected: "20 30 10", visible: true }
    ]
  },
  {
    id: "java-tp-dll-003",
    title: "Rearrange Even-Odd DLL Nodes",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Doubly Linked List"],
    category: "testpad",
    prompt: "Rearrange the nodes of a Doubly Linked List such that all nodes at odd positions are grouped together followed by nodes at even positions (1-indexed). Maintain relative order.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3, 4, 5]", output: "1 3 5 2 4" }
    ],
    type: "doubly_linked_list",
    methodName: "rearrangeEvenOdd",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next, prev;
        Node(int d) { data = d; }
    }
    static Node rearrangeEvenOdd(Node head) {
        // Write your code here
        return head;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next, prev;
        Node(int d) { data = d; }
    }
    static Node rearrangeEvenOdd(Node head) {
        if (head == null || head.next == null) return head;
        Node odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            even.next.prev = odd;
            odd = odd.next;
            even.next = odd.next;
            if (odd.next != null) odd.next.prev = even;
            even = even.next;
        }
        odd.next = evenHead;
        evenHead.prev = odd;
        return head;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 5], args: [] }, expected: "1 3 5 2 4", visible: true },
      { input: { list: [10, 20, 30, 40], args: [] }, expected: "10 30 20 40", visible: true }
    ]
  },

  // --- Generic Collections ---
  {
    id: "java-tp-gc-003",
    title: "Mirror of Queue",
    section: "Queues",
    difficulty: "Easy",
    tags: ["Queue", "Collections"],
    category: "testpad",
    prompt: "Given a queue of integers, reverse the order of its elements to get its mirror image.",
    constraints: ["0 <= queue size <= 1000"],
    examples: [
      { input: "Queue: [1, 2, 3]", output: "3 2 1" }
    ],
    type: "queue",
    methodName: "mirrorQueue",
    returnType: "Queue",
    starterCode: `class Solution {
    static java.util.Queue<Integer> mirrorQueue(java.util.Queue<Integer> q) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> mirrorQueue(java.util.Queue<Integer> q) {
        java.util.Stack<Integer> s = new java.util.Stack<>();
        while (!q.isEmpty()) s.push(q.poll());
        while (!s.isEmpty()) q.add(s.pop());
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3], args: [] }, expected: "3 2 1", visible: true }
    ]
  },
  {
    id: "java-tp-gc-004",
    title: "Balanced Parentheses Check",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    category: "testpad",
    prompt: "Check if a string containing parentheses <code>()</code>, <code>{}</code>, and <code>[]</code> is balanced. Return <code>true</code> if balanced, and <code>false</code> otherwise.",
    constraints: ["0 <= string length <= 10^4"],
    examples: [
      { input: "s = \"({[]})\"", output: "true" }
    ],
    type: "string_return",
    methodName: "isBalanced",
    returnType: "boolean",
    starterCode: `class Solution {
    static boolean isBalanced(String s) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static boolean isBalanced(String s) {
        java.util.Deque<Character> stack = new java.util.ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else if (c == ')' || c == '}' || c == ']') {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return false;
            }
        }
        return stack.isEmpty();
    }
}`,
    testCases: [
      { input: { string: "({[]})", args: [] }, expected: "true", visible: true },
      { input: { string: "([)]", args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-gc-005",
    title: "Flip Odd Elements of Queue",
    section: "Queues",
    difficulty: "Easy",
    tags: ["Queue", "Collections"],
    category: "testpad",
    prompt: "Given a queue of integers, reverse the order of elements located at odd indices (0-indexed).",
    constraints: ["1 <= queue size <= 1000"],
    examples: [
      { input: "Queue: [1, 2, 3, 4, 5]", output: "1 4 3 2 5" }
    ],
    type: "queue",
    methodName: "flipOddElements",
    returnType: "Queue",
    starterCode: `class Solution {
    static java.util.Queue<Integer> flipOddElements(java.util.Queue<Integer> q) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> flipOddElements(java.util.Queue<Integer> q) {
        java.util.List<Integer> list = new java.util.ArrayList<>(q);
        java.util.List<Integer> odds = new java.util.ArrayList<>();
        for (int i = 1; i < list.size(); i += 2) odds.add(list.get(i));
        java.util.Collections.reverse(odds);
        int oddIdx = 0;
        for (int i = 1; i < list.size(); i += 2) list.set(i, odds.get(oddIdx++));
        q.clear();
        q.addAll(list);
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3, 4, 5], args: [] }, expected: "1 4 3 2 5", visible: true }
    ]
  },
  {
    id: "java-tp-gc-006",
    title: "Remove Duplicates from Vector",
    section: "Hashing",
    difficulty: "Easy",
    tags: ["Vector", "Collections"],
    category: "testpad",
    prompt: "Remove duplicate elements from a <code>Vector&lt;Integer&gt;</code> and return the Vector containing only distinct values. Maintain relative order. Comma-separated elements are passed in a string.",
    constraints: ["0 <= vector size <= 1000"],
    examples: [
      { input: "s = \"1,2,2,3,1\"", output: "1 2 3" }
    ],
    type: "array_return",
    methodName: "removeDuplicatesVector",
    returnType: "String",
    starterCode: `import java.util.*;
class Solution {
    static Vector<Integer> removeDuplicates(Vector<Integer> vec) {
        // Write your code here
        return vec;
    }
    static String removeDuplicatesVector(String s) {
        Vector<Integer> vec = new Vector<>();
        for (String x : s.split(",")) vec.add(Integer.parseInt(x.trim()));
        Vector<Integer> res = removeDuplicates(vec);
        return res.stream().map(String::valueOf).collect(java.util.stream.Collectors.joining(" "));
    }
}`,
    solutionCode: `import java.util.*;
class Solution {
    static Vector<Integer> removeDuplicates(Vector<Integer> vec) {
        Set<Integer> set = new LinkedHashSet<>(vec);
        return new Vector<>(set);
    }
    static String removeDuplicatesVector(String s) {
        Vector<Integer> vec = new Vector<>();
        for (String x : s.split(",")) vec.add(Integer.parseInt(x.trim()));
        Vector<Integer> res = removeDuplicates(vec);
        return res.stream().map(String::valueOf).collect(java.util.stream.Collectors.joining(" "));
    }
}`,
    testCases: [
      { input: { array: [], args: ["\"1,2,2,3,1\""] }, expected: "1 2 3", visible: true }
    ]
  },
  {
    id: "java-tp-gc-007",
    title: "Map Contains Same Range",
    section: "Hashing",
    difficulty: "Easy",
    tags: ["HashMap", "Collections"],
    category: "testpad",
    prompt: "Write a function that checks if a <code>Map&lt;String, String&gt;</code> contains any two distinct keys mapping to the same value (range). Return <code>true</code> if so, <code>false</code> otherwise.",
    constraints: ["Keys and values are comma-separated strings for testing."],
    examples: [
      { input: "keys = \"A,B,C\", values = \"X,Y,X\"", output: "true" }
    ],
    type: "string_return",
    methodName: "checkMapRange",
    returnType: "boolean",
    starterCode: `import java.util.*;
class Solution {
    static boolean hasDuplicateValues(Map<String, String> map) {
        // Write your code here
        return false;
    }
    static boolean checkMapRange(String keysStr, String valuesStr) {
        Map<String, String> map = new HashMap<>();
        String[] keys = keysStr.split(",");
        String[] values = valuesStr.split(",");
        for (int i = 0; i < keys.length; i++) {
            map.put(keys[i], values[i]);
        }
        return hasDuplicateValues(map);
    }
}`,
    solutionCode: `import java.util.*;
class Solution {
    static boolean hasDuplicateValues(Map<String, String> map) {
        Set<String> set = new HashSet<>();
        for (String val : map.values()) {
            if (!set.add(val)) return true;
        }
        return false;
    }
    static boolean checkMapRange(String keysStr, String valuesStr) {
        Map<String, String> map = new HashMap<>();
        String[] keys = keysStr.split(",");
        String[] values = valuesStr.split(",");
        for (int i = 0; i < keys.length; i++) {
            map.put(keys[i], values[i]);
        }
        return hasDuplicateValues(map);
    }
}`,
    testCases: [
      { input: { string: "A,B,C", args: ["\"X,Y,X\""] }, expected: "true", visible: true },
      { input: { string: "A,B,C", args: ["\"X,Y,Z\""] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-gc-008",
    title: "Implement Own ArrayList",
    section: "OOPs",
    difficulty: "Medium",
    tags: ["OOPs", "Classes"],
    category: "testpad",
    prompt: "Implement a custom dynamic array class <code>MyArrayList</code> that has methods: <code>add(int val)</code>, <code>get(int index)</code>, and <code>size()</code>. The tester will perform operations and return a space-separated string of results.",
    constraints: ["Ensure capacity increases dynamically."],
    examples: [
      { input: "ops = \"add:10,add:20,size,get:1\"", output: "2 20" }
    ],
    type: "string_return",
    methodName: "testArrayList",
    returnType: "String",
    starterCode: `class Solution {
    static class MyArrayList {
        private int[] data = new int[2];
        private int size = 0;
        // Implement add, get, size
    }
    static String testArrayList(String ops) {
        MyArrayList list = new MyArrayList();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("add")) {
                list.add(Integer.parseInt(parts[1]));
            } else if (parts[0].equals("get")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(list.get(Integer.parseInt(parts[1])));
            } else if (parts[0].equals("size")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(list.size());
            }
        }
        return sb.toString();
    }
}`,
    solutionCode: `class Solution {
    static class MyArrayList {
        private int[] data = new int[2];
        private int size = 0;
        void add(int val) {
            if (size == data.length) {
                int[] temp = new int[data.length * 2];
                System.arraycopy(data, 0, temp, 0, size);
                data = temp;
            }
            data[size++] = val;
        }
        int get(int index) {
            return data[index];
        }
        int size() {
            return size;
        }
    }
    static String testArrayList(String ops) {
        MyArrayList list = new MyArrayList();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("add")) {
                list.add(Integer.parseInt(parts[1]));
            } else if (parts[0].equals("get")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(list.get(Integer.parseInt(parts[1])));
            } else if (parts[0].equals("size")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(list.size());
            }
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "add:10,add:20,size,get:1", args: [] }, expected: "2 20", visible: true }
    ]
  },

  // --- Linked List ---
  {
    id: "java-tp-ll-001",
    title: "Print Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List"],
    category: "testpad",
    prompt: "Given a singly linked list, return its elements as a space-separated string.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3]", output: "1 2 3" }
    ],
    type: "singly_linked_list",
    methodName: "printList",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static String printList(Node head) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static String printList(Node head) {
        StringBuilder sb = new StringBuilder();
        Node curr = head;
        while (curr != null) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(curr.data);
            curr = curr.next;
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], args: [] }, expected: "1 2 3", visible: true }
    ]
  },
  {
    id: "java-tp-ll-002",
    title: "Copy First List to Second",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List"],
    category: "testpad",
    prompt: "Copy the elements of the first singly linked list into a new second linked list and return the head of the copy.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3]", output: "1 2 3" }
    ],
    type: "singly_linked_list",
    methodName: "copyList",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node copyList(Node head) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node copyList(Node head) {
        if (head == null) return null;
        Node newHead = new Node(head.data);
        Node curr = head.next;
        Node newCurr = newHead;
        while (curr != null) {
            newCurr.next = new Node(curr.data);
            newCurr = newCurr.next;
            curr = curr.next;
        }
        return newHead;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], args: [] }, expected: "1 2 3", visible: true }
    ]
  },
  {
    id: "java-tp-ll-003",
    title: "Linked List Insertion MCQ",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "MCQ"],
    category: "testpad",
    prompt: "In a singly linked list, inserting a node at the beginning takes what time complexity?<br>A) O(1)<br>B) O(N)<br>C) O(log N)<br>D) O(N log N)<br><br>Return the correct option character ('A', 'B', 'C', or 'D').",
    constraints: ["Return char A, B, C, or D."],
    examples: [
      { input: "", output: "A" }
    ],
    type: "string_return",
    methodName: "solve",
    returnType: "char",
    starterCode: `class Solution {
    static char solve() {
        // Return correct option
        return ' ';
    }
}`,
    solutionCode: `class Solution {
    static char solve() {
        return 'A';
    }
}`,
    testCases: [
      { input: { string: "", args: [] }, expected: "A", visible: true }
    ]
  },
  {
    id: "java-tp-ll-004",
    title: "Move Smallest and Largest",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List"],
    category: "testpad",
    prompt: "Find the smallest and largest elements in a singly linked list. Move the smallest element to the head and the largest element to the tail of the list. Return the head of the modified list.",
    constraints: ["1 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [3, 1, 5, 2, 4]", output: "1 3 2 4 5" }
    ],
    type: "singly_linked_list",
    methodName: "moveMinMax",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node moveMinMax(Node head) {
        // Write your code here
        return head;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node moveMinMax(Node head) {
        if (head == null || head.next == null) return head;
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        Node curr = head;
        while (curr != null) {
            min = Math.min(min, curr.data);
            max = Math.max(max, curr.data);
            curr = curr.next;
        }
        Node dummy = new Node(0);
        dummy.next = head;
        Node prev = dummy, minNode = null, maxNode = null;
        curr = head;
        while (curr != null) {
            if (curr.data == min && minNode == null) {
                minNode = curr;
                prev.next = curr.next;
            } else if (curr.data == max && maxNode == null) {
                maxNode = curr;
                prev.next = curr.next;
            } else {
                prev = curr;
            }
            curr = curr.next;
        }
        if (minNode == null) minNode = new Node(min);
        if (maxNode == null) maxNode = new Node(max);
        minNode.next = dummy.next;
        dummy.next = minNode;
        curr = dummy;
        while (curr.next != null) curr = curr.next;
        curr.next = maxNode;
        maxNode.next = null;
        return dummy.next;
    }
}`,
    testCases: [
      { input: { list: [3, 1, 5, 2, 4], args: [] }, expected: "1 3 2 4 5", visible: true }
    ]
  },
  {
    id: "java-tp-ll-005",
    title: "Check List for Palindrome",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Two Pointers"],
    category: "testpad",
    prompt: "Check if a singly linked list is a palindrome (reads same forward and backward).",
    constraints: ["0 <= number of nodes <= 10^4"],
    examples: [
      { input: "list = [1, 2, 2, 1]", output: "true" }
    ],
    type: "singly_linked_list",
    methodName: "isPalindrome",
    returnType: "boolean",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static boolean isPalindrome(Node head) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static boolean isPalindrome(Node head) {
        if (head == null || head.next == null) return true;
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        Node prev = null, curr = slow;
        while (curr != null) {
            Node nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        Node p1 = head, p2 = prev;
        while (p2 != null) {
            if (p1.data != p2.data) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 2, 1], args: [] }, expected: "true", visible: true },
      { input: { list: [1, 2, 3], args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-ll-006",
    title: "Find Loop in Linked List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Cycle Detection"],
    category: "testpad",
    prompt: "Detect if there is a cycle (loop) in a singly linked list. Return <code>true</code> if a loop exists, and <code>false</code> otherwise.",
    constraints: ["0 <= number of nodes <= 1000"],
    examples: [
      { input: "list = [1, 2, 3] (circular)", output: "true" }
    ],
    type: "singly_linked_list",
    methodName: "hasCycle",
    returnType: "boolean",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static boolean hasCycle(Node head) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], isCircular: true, args: [] }, expected: "true", visible: true },
      { input: { list: [1, 2, 3], isCircular: false, args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-ll-007",
    title: "Reverse a Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List"],
    category: "testpad",
    prompt: "Reverse a singly linked list in-place and return the new head node.",
    constraints: ["0 <= number of nodes <= 5000"],
    examples: [
      { input: "list = [1, 2, 3]", output: "3 2 1" }
    ],
    type: "singly_linked_list",
    methodName: "reverse",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node reverse(Node head) {
        // Write your code here
        return head;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node reverse(Node head) {
        Node prev = null, curr = head;
        while (curr != null) {
            Node nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], args: [] }, expected: "3 2 1", visible: true }
    ]
  },
  {
    id: "java-tp-ll-008",
    title: "Linked List Miscellaneous 1 MCQ",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "MCQ"],
    category: "testpad",
    prompt: "Which of the following is an advantage of adjacency list representation over adjacency matrix representation of a graph?<br>A) Space complexity is O(V+E) instead of O(V²)<br>B) Finding if there is an edge between two vertices takes O(1) time<br>C) Both A and B<br>D) None of the above<br><br>Return the correct option character ('A', 'B', 'C', or 'D').",
    constraints: ["Return char A, B, C, or D."],
    examples: [
      { input: "", output: "A" }
    ],
    type: "string_return",
    methodName: "solve",
    returnType: "char",
    starterCode: `class Solution {
    static char solve() {
        // Return correct option
        return ' ';
    }
}`,
    solutionCode: `class Solution {
    static char solve() {
        return 'A';
    }
}`,
    testCases: [
      { input: { string: "", args: [] }, expected: "A", visible: true }
    ]
  },
  {
    id: "java-tp-ll-009",
    title: "Linked List Miscellaneous 2 MCQ",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "MCQ"],
    category: "testpad",
    prompt: "What is the worst-case time complexity to search an element in a singly linked list?<br>A) O(1)<br>B) O(N)<br>C) O(log N)<br>D) O(N²)<br><br>Return the correct option character ('A', 'B', 'C', or 'D').",
    constraints: ["Return char A, B, C, or D."],
    examples: [
      { input: "", output: "B" }
    ],
    type: "string_return",
    methodName: "solve",
    returnType: "char",
    starterCode: `class Solution {
    static char solve() {
        // Return correct option
        return ' ';
    }
}`,
    solutionCode: `class Solution {
    static char solve() {
        return 'B';
    }
}`,
    testCases: [
      { input: { string: "", args: [] }, expected: "B", visible: true }
    ]
  },
  {
    id: "java-tp-ll-010",
    title: "Linked List Miscellaneous 3 MCQ",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "MCQ"],
    category: "testpad",
    prompt: "What is the time complexity to insert a new node after a given node in a singly linked list?<br>A) O(1)<br>B) O(N)<br>C) O(log N)<br>D) O(N²)<br><br>Return the correct option character ('A', 'B', 'C', or 'D').",
    constraints: ["Return char A, B, C, or D."],
    examples: [
      { input: "", output: "A" }
    ],
    type: "string_return",
    methodName: "solve",
    returnType: "char",
    starterCode: `class Solution {
    static char solve() {
        // Return correct option
        return ' ';
    }
}`,
    solutionCode: `class Solution {
    static char solve() {
        return 'A';
    }
}`,
    testCases: [
      { input: { string: "", args: [] }, expected: "A", visible: true }
    ]
  },
  {
    id: "java-tp-ll-011",
    title: "Linked List Miscellaneous 4 MCQ",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "MCQ"],
    category: "testpad",
    prompt: "In a circular linked list, the last node's next pointer points to:<br>A) NULL<br>B) The middle node<br>C) The head node<br>D) Itself<br><br>Return the correct option character ('A', 'B', 'C', or 'D').",
    constraints: ["Return char A, B, C, or D."],
    examples: [
      { input: "", output: "C" }
    ],
    type: "string_return",
    methodName: "solve",
    returnType: "char",
    starterCode: `class Solution {
    static char solve() {
        // Return correct option
        return ' ';
    }
}`,
    solutionCode: `class Solution {
    static char solve() {
        return 'C';
    }
}`,
    testCases: [
      { input: { string: "", args: [] }, expected: "C", visible: true }
    ]
  },
  {
    id: "java-tp-ll-012",
    title: "Add Two Numbers of Lists",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Math"],
    category: "testpad",
    prompt: "Given two numbers represented by two singly linked lists (where each node contains a single digit, and digits are stored in reverse order), add the two numbers and return the sum as a linked list.",
    constraints: ["List lengths <= 100"],
    examples: [
      { input: "l1 = [2, 4, 3], l2 = [5, 6, 4]", output: "7 0 8" }
    ],
    type: "two_singly_linked_lists",
    methodName: "addTwoLists",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node addTwoLists(Node h1, Node h2) {
        // Write your code here
        return null;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node addTwoLists(Node h1, Node h2) {
        Node dummy = new Node(0), curr = dummy;
        int carry = 0;
        while (h1 != null || h2 != null || carry > 0) {
            int sum = carry;
            if (h1 != null) { sum += h1.data; h1 = h1.next; }
            if (h2 != null) { sum += h2.data; h2 = h2.next; }
            carry = sum / 10;
            curr.next = new Node(sum % 10);
            curr = curr.next;
        }
        return dummy.next;
    }
}`,
    testCases: [
      { input: { list: [2, 4, 3], list2: [5, 6, 4], args: [] }, expected: "7 0 8", visible: true }
    ]
  },
  {
    id: "java-tp-ll-013",
    title: "Delete Node Without Head",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List"],
    category: "testpad",
    prompt: "Delete a node from a singly linked list given access only to that node (which is guaranteed not to be the tail node).",
    constraints: ["The node to delete will not be a tail node."],
    examples: [
      { input: "list = [4, 5, 1, 9], val = 5", output: "4 1 9" }
    ],
    type: "singly_linked_list",
    methodName: "deleteNodeWithoutHead",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static void deleteNode(Node node) {
        // Write your code here
    }
    static Node deleteNodeWithoutHead(Node head, int nodeVal) {
        Node curr = head;
        while (curr != null && curr.data != nodeVal) curr = curr.next;
        if (curr != null) deleteNode(curr);
        return head;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static void deleteNode(Node node) {
        node.data = node.next.data;
        node.next = node.next.next;
    }
    static Node deleteNodeWithoutHead(Node head, int nodeVal) {
        Node curr = head;
        while (curr != null && curr.data != nodeVal) curr = curr.next;
        if (curr != null) deleteNode(curr);
        return head;
    }
}`,
    testCases: [
      { input: { list: [4, 5, 1, 9], args: [5] }, expected: "4 1 9", visible: true }
    ]
  },

  // --- Queue ---
  {
    id: "java-tp-q-001",
    title: "Implement Queue Using Array",
    section: "Queues",
    difficulty: "Medium",
    tags: ["Queue", "Array"],
    category: "testpad",
    prompt: "Implement a Queue using a static array. It should support: <code>enqueue(int val)</code>, <code>dequeue()</code> (returns value, or -1 if empty), and <code>isEmpty()</code>. Operations are passed as a comma-separated string.",
    constraints: ["Array size <= 100"],
    examples: [
      { input: "ops = \"en:10,en:20,de,en:30,de,de\"", output: "10 20 30" }
    ],
    type: "string_return",
    methodName: "testQueue",
    returnType: "String",
    starterCode: `class Solution {
    static class MyQueue {
        private int[] arr = new int[100];
        private int front = 0, rear = 0;
        // Implement enqueue, dequeue, isEmpty
    }
    static String testQueue(String ops) {
        MyQueue q = new MyQueue();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("en")) q.enqueue(Integer.parseInt(parts[1]));
            else if (parts[0].equals("de")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(q.dequeue());
            }
        }
        return sb.toString();
    }
}`,
    solutionCode: `class Solution {
    static class MyQueue {
        private int[] arr = new int[100];
        private int front = 0, rear = 0;
        void enqueue(int val) { if (rear < 100) arr[rear++] = val; }
        int dequeue() { return (front == rear) ? -1 : arr[front++]; }
        boolean isEmpty() { return front == rear; }
    }
    static String testQueue(String ops) {
        MyQueue q = new MyQueue();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("en")) q.enqueue(Integer.parseInt(parts[1]));
            else if (parts[0].equals("de")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(q.dequeue());
            }
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "en:10,en:20,de,en:30,de,de", args: [] }, expected: "10 20 30", visible: true }
    ]
  },
  {
    id: "java-tp-q-002",
    title: "Reverse Queue",
    section: "Queues",
    difficulty: "Easy",
    tags: ["Queue", "Recursion"],
    category: "testpad",
    prompt: "Reverse the elements in a Queue. Return the reversed queue.",
    constraints: ["0 <= queue size <= 1000"],
    examples: [
      { input: "Queue: [1, 2, 3]", output: "3 2 1" }
    ],
    type: "queue",
    methodName: "reverseQueue",
    returnType: "Queue",
    starterCode: `class Solution {
    static java.util.Queue<Integer> reverseQueue(java.util.Queue<Integer> q) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> reverseQueue(java.util.Queue<Integer> q) {
        java.util.Stack<Integer> s = new java.util.Stack<>();
        while (!q.isEmpty()) s.push(q.poll());
        while (!s.isEmpty()) q.add(s.pop());
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3], args: [] }, expected: "3 2 1", visible: true }
    ]
  },
  {
    id: "java-tp-q-003",
    title: "Reverse First N Queue Elements",
    section: "Queues",
    difficulty: "Medium",
    tags: ["Queue", "Stack"],
    category: "testpad",
    prompt: "Reverse only the first <code>k</code> elements of a queue. Return the modified queue.",
    constraints: ["1 <= k <= queue size"],
    examples: [
      { input: "Queue: [1, 2, 3, 4, 5], k = 3", output: "3 2 1 4 5" }
    ],
    type: "queue",
    methodName: "reverseK",
    returnType: "Queue",
    starterCode: `class Solution {
    static java.util.Queue<Integer> reverseK(java.util.Queue<Integer> q, int k) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> reverseK(java.util.Queue<Integer> q, int k) {
        if (q == null || k > q.size() || k <= 0) return q;
        java.util.Stack<Integer> s = new java.util.Stack<>();
        for (int i = 0; i < k; i++) s.push(q.poll());
        int rem = q.size();
        while (!s.isEmpty()) q.add(s.pop());
        for (int i = 0; i < rem; i++) q.add(q.poll());
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3, 4, 5], args: [3] }, expected: "3 2 1 4 5", visible: true }
    ]
  },

  // --- Recursion ---
  {
    id: "java-tp-rec-001",
    title: "Factorial using Recursion",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    category: "testpad",
    prompt: "Find the factorial of a non-negative integer using recursion.",
    constraints: ["0 <= n <= 20"],
    examples: [
      { input: "n = 5", output: "120" }
    ],
    type: "array_return",
    methodName: "factorial",
    returnType: "long",
    starterCode: `class Solution {
    static long factorial(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`,
    testCases: [
      { input: { array: [], args: [5] }, expected: "120", visible: true },
      { input: { array: [], args: [0] }, expected: "1", visible: true }
    ]
  },
  {
    id: "java-tp-rec-002",
    title: "Sum of Digits",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    category: "testpad",
    prompt: "Find the sum of all digits of a positive integer using recursion.",
    constraints: ["1 <= n <= 2^31 - 1"],
    examples: [
      { input: "n = 1234", output: "10" }
    ],
    type: "array_return",
    methodName: "sumOfDigits",
    returnType: "int",
    starterCode: `class Solution {
    static int sumOfDigits(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int sumOfDigits(int n) {
        if (n == 0) return 0;
        return (n % 10) + sumOfDigits(n / 10);
    }
}`,
    testCases: [
      { input: { array: [], args: [1234] }, expected: "10", visible: true },
      { input: { array: [], args: [9] }, expected: "9", visible: true }
    ]
  },
  {
    id: "java-tp-rec-003",
    title: "Prime Factors",
    section: "Recursion",
    difficulty: "Medium",
    tags: ["Recursion", "Math"],
    category: "testpad",
    prompt: "Find and return the prime factors of a positive integer using recursion. Return them as a space-separated string.",
    constraints: ["2 <= n <= 10^6"],
    examples: [
      { input: "n = 12", output: "2 2 3" }
    ],
    type: "array_return",
    methodName: "primeFactors",
    returnType: "String",
    starterCode: `class Solution {
    static String primeFactors(int n) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String primeFactors(int n) {
        StringBuilder sb = new StringBuilder();
        getFactors(n, 2, sb);
        return sb.toString().trim();
    }
    private static void getFactors(int n, int div, StringBuilder sb) {
        if (n < 2) return;
        if (n % div == 0) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(div);
            getFactors(n / div, div, sb);
        } else {
            getFactors(n, div + 1, sb);
        }
    }
}`,
    testCases: [
      { input: { array: [], args: [12] }, expected: "2 2 3", visible: true },
      { input: { array: [], args: [35] }, expected: "5 7", visible: true }
    ]
  },
  {
    id: "java-tp-rec-004",
    title: "Power Function",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    category: "testpad",
    prompt: "Compute <code>base</code> raised to the power <code>exp</code> using recursion.",
    constraints: ["0 <= exp <= 30"],
    examples: [
      { input: "base = 2, exp = 10", output: "1024" }
    ],
    type: "array_return",
    methodName: "power",
    returnType: "long",
    starterCode: `class Solution {
    static long power(int base, int exp) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static long power(int base, int exp) {
        if (exp == 0) return 1;
        return base * power(base, exp - 1);
    }
}`,
    testCases: [
      { input: { array: [], args: [2, 10] }, expected: "1024", visible: true },
      { input: { array: [], args: [5, 3] }, expected: "125", visible: true }
    ]
  },
  {
    id: "java-tp-rec-005",
    title: "Form a New Number",
    section: "Recursion",
    difficulty: "Medium",
    tags: ["Recursion"],
    category: "testpad",
    prompt: "Given an integer, form a new number by selecting only even digits and reversing them using recursion.",
    constraints: ["0 <= n <= 10^9"],
    examples: [
      { input: "n = 12345", output: "42" }
    ],
    type: "array_return",
    methodName: "formNumber",
    returnType: "int",
    starterCode: `class Solution {
    static int formNumber(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int formNumber(int n) {
        String res = formHelper(n);
        return res.isEmpty() ? 0 : Integer.parseInt(res);
    }
    private static String formHelper(int n) {
        if (n == 0) return "";
        int d = n % 10;
        if (d % 2 == 0) {
            return String.valueOf(d) + formHelper(n / 10);
        }
        return formHelper(n / 10);
    }
}`,
    testCases: [
      { input: { array: [], args: [12345] }, expected: "42", visible: true },
      { input: { array: [], args: [864] }, expected: "468", visible: true }
    ]
  },
  {
    id: "java-tp-rec-006",
    title: "Binary Equivalent",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    category: "testpad",
    prompt: "Return the binary representation of a non-negative decimal integer as a string using recursion.",
    constraints: ["0 <= n <= 10^9"],
    examples: [
      { input: "n = 10", output: "1010" }
    ],
    type: "array_return",
    methodName: "toBinary",
    returnType: "String",
    starterCode: `class Solution {
    static String toBinary(int n) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String toBinary(int n) {
        if (n == 0) return "0";
        if (n == 1) return "1";
        return toBinary(n / 2) + (n % 2);
    }
}`,
    testCases: [
      { input: { array: [], args: [10] }, expected: "1010", visible: true },
      { input: { array: [], args: [0] }, expected: "0", visible: true }
    ]
  },
  {
    id: "java-tp-rec-007",
    title: "Greatest Common Divisor",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    category: "testpad",
    prompt: "Find and return the Greatest Common Divisor (GCD) of two non-negative integers using recursion.",
    constraints: ["0 <= a, b <= 10^9"],
    examples: [
      { input: "a = 48, b = 18", output: "6" }
    ],
    type: "array_return",
    methodName: "gcd",
    returnType: "int",
    starterCode: `class Solution {
    static int gcd(int a, int b) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
}`,
    testCases: [
      { input: { array: [], args: [48, 18] }, expected: "6", visible: true },
      { input: { array: [], args: [7, 5] }, expected: "1", visible: true }
    ]
  },

  // --- Stack ---
  {
    id: "java-tp-stk-001",
    title: "Implement Stack Using Array",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Array"],
    category: "testpad",
    prompt: "Implement a Stack using a static array. It should support: <code>push(int val)</code>, <code>pop()</code> (returns value, or -1 if empty), and <code>isEmpty()</code>. Operations are passed as a comma-separated string.",
    constraints: ["Array size <= 100"],
    examples: [
      { input: "ops = \"pu:10,pu:20,po,pu:30,po,po\"", output: "20 30 10" }
    ],
    type: "string_return",
    methodName: "testStack",
    returnType: "String",
    starterCode: `class Solution {
    static class MyStack {
        private int[] arr = new int[100];
        private int top = -1;
        // Implement push, pop, isEmpty
    }
    static String testStack(String ops) {
        MyStack s = new MyStack();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("pu")) s.push(Integer.parseInt(parts[1]));
            else if (parts[0].equals("po")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(s.pop());
            }
        }
        return sb.toString();
    }
}`,
    solutionCode: `class Solution {
    static class MyStack {
        private int[] arr = new int[100];
        private int top = -1;
        void push(int val) { if (top < 99) arr[++top] = val; }
        int pop() { return (top == -1) ? -1 : arr[top--]; }
        boolean isEmpty() { return top == -1; }
    }
    static String testStack(String ops) {
        MyStack s = new MyStack();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("pu")) s.push(Integer.parseInt(parts[1]));
            else if (parts[0].equals("po")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(s.pop());
            }
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "pu:10,pu:20,po,pu:30,po,po", args: [] }, expected: "20 30 10", visible: true }
    ]
  },
  {
    id: "java-tp-stk-002",
    title: "Reverse String Using Stack",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    category: "testpad",
    prompt: "Reverse a string using a stack. Return the reversed string.",
    constraints: ["0 <= string length <= 10^4"],
    examples: [
      { input: "s = \"hello\"", output: "olleh" }
    ],
    type: "string_return",
    methodName: "reverseString",
    returnType: "String",
    starterCode: `class Solution {
    static String reverseString(String s) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String reverseString(String s) {
        java.util.Stack<Character> stack = new java.util.Stack<>();
        for (char c : s.toCharArray()) stack.push(c);
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) sb.append(stack.pop());
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "hello", args: [] }, expected: "olleh", visible: true }
    ]
  },
  {
    id: "java-tp-stk-003",
    title: "Implement Stack Using Linked List",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Linked List"],
    category: "testpad",
    prompt: "Implement a Stack using a singly linked list. It should support: <code>push(int val)</code>, <code>pop()</code> (returns value, or -1 if empty). Operations are passed as a comma-separated string.",
    constraints: ["Dynamic memory insertion."],
    examples: [
      { input: "ops = \"pu:10,pu:20,po,pu:30,po,po\"", output: "20 30 10" }
    ],
    type: "string_return",
    methodName: "testStackLL",
    returnType: "String",
    starterCode: `class Solution {
    static class MyStackLL {
        static class Node {
            int data; Node next;
            Node(int d) { data = d; }
        }
        private Node head = null;
        // Implement push, pop
    }
    static String testStackLL(String ops) {
        MyStackLL s = new MyStackLL();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("pu")) s.push(Integer.parseInt(parts[1]));
            else if (parts[0].equals("po")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(s.pop());
            }
        }
        return sb.toString();
    }
}`,
    solutionCode: `class Solution {
    static class MyStackLL {
        static class Node {
            int data; Node next;
            Node(int d) { data = d; }
        }
        private Node head = null;
        void push(int val) {
            Node temp = new Node(val);
            temp.next = head;
            head = temp;
        }
        int pop() {
            if (head == null) return -1;
            int val = head.data;
            head = head.next;
            return val;
        }
    }
    static String testStackLL(String ops) {
        MyStackLL s = new MyStackLL();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("pu")) s.push(Integer.parseInt(parts[1]));
            else if (parts[0].equals("po")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(s.pop());
            }
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "pu:10,pu:20,po,pu:30,po,po", args: [] }, expected: "20 30 10", visible: true }
    ]
  },
  {
    id: "java-tp-stk-004",
    title: "Min Stack Design",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Design"],
    category: "testpad",
    prompt: "Design a Stack that supports <code>push(int val)</code>, <code>pop()</code>, <code>top()</code>, and retrieving the minimum element in constant time <code>getMin()</code>.",
    constraints: ["All methods must take O(1) time complexity."],
    examples: [
      { input: "ops = \"pu:-2,pu:0,pu:-3,min,po,top,min\"", output: "-3 0 -2" }
    ],
    type: "string_return",
    methodName: "testMinStack",
    returnType: "String",
    starterCode: `class Solution {
    static class MinStack {
        // Implement push, pop, top, getMin
    }
    static String testMinStack(String ops) {
        MinStack stack = new MinStack();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("pu")) stack.push(Integer.parseInt(parts[1]));
            else if (parts[0].equals("po")) stack.pop();
            else if (parts[0].equals("top")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(stack.top());
            } else if (parts[0].equals("min")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(stack.getMin());
            }
        }
        return sb.toString();
    }
}`,
    solutionCode: `class Solution {
    static class MinStack {
        private java.util.Stack<Integer> s = new java.util.Stack<>();
        private java.util.Stack<Integer> min = new java.util.Stack<>();
        void push(int val) {
            s.push(val);
            if (min.isEmpty() || val <= min.peek()) min.push(val);
        }
        void pop() {
            if (!s.isEmpty()) {
                int val = s.pop();
                if (val == min.peek()) min.pop();
            }
        }
        int top() { return s.peek(); }
        int getMin() { return min.peek(); }
    }
    static String testMinStack(String ops) {
        MinStack stack = new MinStack();
        StringBuilder sb = new StringBuilder();
        for (String op : ops.split(",")) {
            String[] parts = op.split(":");
            if (parts[0].equals("pu")) stack.push(Integer.parseInt(parts[1]));
            else if (parts[0].equals("po")) stack.pop();
            else if (parts[0].equals("top")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(stack.top());
            } else if (parts[0].equals("min")) {
                if (sb.length() > 0) sb.append(" ");
                sb.append(stack.getMin());
            }
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "pu:-2,pu:0,pu:-3,min,po,top,min", args: [] }, expected: "-3 0 -2", visible: true }
    ]
  },
  {
    id: "java-tp-stk-005",
    title: "Next Greater Element",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack"],
    category: "testpad",
    prompt: "Given an array of integers, find the Next Greater Element (NGE) for every element. The Next Greater Element for an element <code>x</code> is the first greater element on the right side of <code>x</code>. If no greater element exists, output <code>-1</code>. Return as a space-separated string.",
    constraints: ["1 <= array size <= 10^5"],
    examples: [
      { input: "arr = [4, 5, 2, 25]", output: "5 25 25 -1" }
    ],
    type: "array_return",
    methodName: "nextGreater",
    returnType: "String",
    starterCode: `class Solution {
    static String nextGreater(int[] arr) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String nextGreater(int[] arr) {
        int[] res = new int[arr.length];
        java.util.Stack<Integer> s = new java.util.Stack<>();
        for (int i = arr.length - 1; i >= 0; i--) {
            while (!s.isEmpty() && s.peek() <= arr[i]) s.pop();
            res[i] = s.isEmpty() ? -1 : s.peek();
            s.push(arr[i]);
        }
        return java.util.Arrays.stream(res).mapToObj(String::valueOf).collect(java.util.stream.Collectors.joining(" "));
    }
}`,
    testCases: [
      { input: { array: [4, 5, 2, 25], args: [] }, expected: "5 25 25 -1", visible: true },
      { input: { array: [13, 7, 6, 12], args: [] }, expected: "-1 12 12 -1", visible: true }
    ]
  },
  {
    id: "java-tp-stk-006",
    title: "Minimum Bracket Reversals",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Greedy"],
    category: "testpad",
    prompt: "Given a string of only <code>{</code> and <code>}</code>, find the minimum number of bracket reversals needed to make the expression balanced. Return <code>-1</code> if it is not possible.",
    constraints: ["String contains only '{' and '}'."],
    examples: [
      { input: "s = \"}{\"", output: "2" }
    ],
    type: "string_return",
    methodName: "minReversals",
    returnType: "int",
    starterCode: `class Solution {
    static int minReversals(String s) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static int minReversals(String s) {
        if (s.length() % 2 != 0) return -1;
        int open = 0, close = 0;
        for (char c : s.toCharArray()) {
            if (c == '{') open++;
            else {
                if (open > 0) open--;
                else close++;
            }
        }
        return (open + 1) / 2 + (close + 1) / 2;
    }
}`,
    testCases: [
      { input: { string: "}{", args: [] }, expected: "2", visible: true },
      { input: { string: "{{{", args: [] }, expected: "-1", visible: true }
    ]
  },
  {
    id: "java-tp-stk-007",
    title: "Evaluate Postfix Expression",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack"],
    category: "testpad",
    prompt: "Evaluate a postfix expression containing digits and operators <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. Return the integer result.",
    constraints: ["Expression contains valid digits and operators."],
    examples: [
      { input: "s = \"231*+9-\"", output: "-4" }
    ],
    type: "string_return",
    methodName: "evaluatePostfix",
    returnType: "int",
    starterCode: `class Solution {
    static int evaluatePostfix(String s) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int evaluatePostfix(String s) {
        java.util.Stack<Integer> stack = new java.util.Stack<>();
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            } else {
                int val1 = stack.pop();
                int val2 = stack.pop();
                switch (c) {
                    case '+': stack.push(val2 + val1); break;
                    case '-': stack.push(val2 - val1); break;
                    case '*': stack.push(val2 * val1); break;
                    case '/': stack.push(val2 / val1); break;
                }
            }
        }
        return stack.pop();
    }
}`,
    testCases: [
      { input: { string: "231*+9-", args: [] }, expected: "-4", visible: true }
    ]
  },
  {
    id: "java-tp-stk-008",
    title: "Evaluate Prefix Expression",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack"],
    category: "testpad",
    prompt: "Evaluate a prefix expression containing digits and operators <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. Return the integer result.",
    constraints: ["Expression contains valid digits and operators."],
    examples: [
      { input: "s = \"-+8/632\"", output: "8" }
    ],
    type: "string_return",
    methodName: "evaluatePrefix",
    returnType: "int",
    starterCode: `class Solution {
    static int evaluatePrefix(String s) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int evaluatePrefix(String s) {
        java.util.Stack<Integer> stack = new java.util.Stack<>();
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            } else {
                int val1 = stack.pop();
                int val2 = stack.pop();
                switch (c) {
                    case '+': stack.push(val1 + val2); break;
                    case '-': stack.push(val1 - val2); break;
                    case '*': stack.push(val1 * val2); break;
                    case '/': stack.push(val1 / val2); break;
                }
            }
        }
        return stack.pop();
    }
}`,
    testCases: [
      { input: { string: "-+8/632", args: [] }, expected: "8", visible: true }
    ]
  }
  );
}
