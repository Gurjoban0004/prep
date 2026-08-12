  // ============================================================
  //  TESTPAD QUESTIONS
  // ============================================================
  {
    id: "java-tp-bst-002",
    title: "Kth Smallest Element in BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["BST", "Tree"],
    category: "testpad",
    prompt: "Given the root of a Binary Search Tree (BST) and an integer <code>k</code>, find and return the data value of the <code>k</code>th smallest element.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴",
      "1 ≤ k ≤ number of nodes"
    ],
    examples: [
      { input: "Tree: [3, 1, 4, null, 2], k = 1", output: "1" }
    ],
    type: "binary_tree",
    methodName: "kthSmallest",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    // Return the kth smallest element's data
    static int kthSmallest(Node root, int k) {
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

    private static int count = 0;
    private static int result = -1;

    static int kthSmallest(Node root, int k) {
        count = 0;
        result = -1;
        traverse(root, k);
        return result;
    }

    private static void traverse(Node node, int k) {
        if (node == null) return;
        traverse(node.left, k);
        count++;
        if (count == k) {
            result = node.data;
            return;
        }
        traverse(node.right, k);
    }
}`,
    testCases: [
      { input: { tree: [3, 1, 4, null, 2], args: [1] }, expected: "1", visible: true },
      { input: { tree: [5, 3, 6, 2, 4, null, null, 1], args: [3] }, expected: "3", visible: true }
    ]
  },

  {
    id: "java-tp-bst-003",
    title: "Convert Level Order to BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["BST", "BFS"],
    category: "testpad",
    prompt: "Given a level-order traversal array of a Binary Search Tree, construct the BST and return the root node. The tree node wrapper prints it inorder.",
    constraints: [
      "1 ≤ array size ≤ 1000"
    ],
    examples: [
      { input: "arr = [7, 4, 12, 3, 6, 8, 14]", output: "3 4 6 7 8 12 14" }
    ],
    type: "array_return",
    methodName: "constructBST",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    // Return root of constructed BST
    static Node constructBST(int[] arr) {
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

    static class NodeDetails {
        Node node;
        int min, max;
        NodeDetails(Node n, int mi, int ma) {
            node = n; min = mi; max = ma;
        }
    }

    static Node constructBST(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        Node root = new Node(arr[0]);
        java.util.Queue<NodeDetails> q = new java.util.LinkedList<>();
        q.add(new NodeDetails(root, Integer.MIN_VALUE, Integer.MAX_VALUE));
        int i = 1;
        while (i < arr.length && !q.isEmpty()) {
            NodeDetails curr = q.poll();
            if (i < arr.length && arr[i] > curr.min && arr[i] < curr.node.data) {
                curr.node.left = new Node(arr[i]);
                q.add(new NodeDetails(curr.node.left, curr.min, curr.node.data));
                i++;
            }
            if (i < arr.length && arr[i] > curr.node.data && arr[i] < curr.max) {
                curr.node.right = new Node(arr[i]);
                q.add(new NodeDetails(curr.node.right, curr.node.data, curr.max));
                i++;
            }
        }
        return root;
    }
}`,
    testCases: [
      { input: { array: [7, 4, 12, 3, 6, 8, 14], args: [] }, expected: "3 4 6 7 8 12 14", visible: true }
    ]
  },

  {
    id: "java-tp-bst-004",
    title: "Lowest Common Ancestor in BST",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["BST", "LCA"],
    category: "testpad",
    prompt: "Given a Binary Search Tree (BST) and two nodes <code>p</code> and <code>q</code>, find the lowest common ancestor (LCA) of p and q. Return its data.",
    constraints: [
      "2 ≤ number of nodes ≤ 10⁴"
    ],
    examples: [
      { input: "Tree: [6, 2, 8, 0, 4, 7, 9], p = 2, q = 8", output: "6" }
    ],
    type: "binary_tree",
    methodName: "lowestCommonAncestor",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    // Find LCA of p and q in BST
    static int lowestCommonAncestor(Node root, int p, int q) {
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

    static int lowestCommonAncestor(Node root, int p, int q) {
        Node curr = root;
        while (curr != null) {
            if (curr.data > p && curr.data > q) curr = curr.left;
            else if (curr.data < p && curr.data < q) curr = curr.right;
            else return curr.data;
        }
        return -1;
    }
}`,
    testCases: [
      { input: { tree: [6, 2, 8, 0, 4, 7, 9], args: [2, 8] }, expected: "6", visible: true },
      { input: { tree: [6, 2, 8, 0, 4, 7, 9], args: [2, 4] }, expected: "2", visible: true }
    ]
  },

  {
    id: "java-tp-bt-001",
    title: "Create Binary Tree from Array",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Construct a binary tree from a level order array containing missing elements (represented as <code>null</code>). Inorder traversal of the tree is printed for verification.",
    constraints: [
      "1 ≤ array size ≤ 1000"
    ],
    examples: [
      { input: "arr = [1, 2, 3, null, 4]", output: "2 4 1 3" }
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

    static Node buildTree(int[] arr) {
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

    static Node buildTree(int[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == -1) return null;
        Node root = new Node(arr[0]);
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        int i = 1;
        while (i < arr.length && !q.isEmpty()) {
            Node curr = q.poll();
            if (i < arr.length && arr[i] != -1) {
                curr.left = new Node(arr[i]);
                q.add(curr.left);
            }
            i++;
            if (i < arr.length && arr[i] != -1) {
                curr.right = new Node(arr[i]);
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3, -1, 4], args: [] }, expected: "2 4 1 3", visible: true }
    ]
  },

  {
    id: "java-tp-bt-002",
    title: "Print Binary Tree Level Order",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Print the level order traversal (space-separated) of a binary tree.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴"
    ],
    examples: [
      { input: "Tree: [1, 2, 3]", output: "1 2 3" }
    ],
    type: "binary_tree",
    methodName: "levelOrder",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    static String levelOrder(Node root) {
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

    static String levelOrder(Node root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            Node curr = q.poll();
            if (sb.length() > 0) sb.append(" ");
            sb.append(curr.data);
            if (curr.left != null) q.add(curr.left);
            if (curr.right != null) q.add(curr.right);
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, 4, 5], args: [] }, expected: "1 2 3 4 5", visible: true }
    ]
  },

  {
    id: "java-tp-bt-003",
    title: "Print Nodes at Odd Levels",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Find and return all node values at odd levels (1-indexed, root is level 1) of a binary tree as a space-separated string.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴"
    ],
    examples: [
      { input: "Tree: [1, 2, 3, 4, 5]", output: "1 4 5" }
    ],
    type: "binary_tree",
    methodName: "printOddLevels",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    static String printOddLevels(Node root) {
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

    static String printOddLevels(Node root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        int level = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                Node n = q.poll();
                if (level % 2 != 0) {
                    if (sb.length() > 0) sb.append(" ");
                    sb.append(n.data);
                }
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            level++;
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, 4, 5], args: [] }, expected: "1 4 5", visible: true }
    ]
  },

  {
    id: "java-tp-bt-004",
    title: "Iterative Inorder Traversal",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "DFS", "Iterative"],
    category: "testpad",
    prompt: "Implement iterative inorder traversal of a binary tree using a stack. Return space-separated values.",
    constraints: [
      "0 ≤ number of nodes ≤ 5000"
    ],
    examples: [
      { input: "Tree: [1, null, 2, 3]", output: "1 3 2" }
    ],
    type: "binary_tree",
    methodName: "iterativeInorder",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    static String iterativeInorder(Node root) {
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

    static String iterativeInorder(Node root) {
        StringBuilder sb = new StringBuilder();
        java.util.Deque<Node> stack = new java.util.ArrayDeque<>();
        Node curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            if (sb.length() > 0) sb.append(" ");
            sb.append(curr.data);
            curr = curr.right;
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { tree: [1, null, 2, 3], args: [] }, expected: "1 3 2", visible: true }
    ]
  },

  {
    id: "java-tp-bt-007",
    title: "Count Leaf and Non-Leaf Nodes",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Count and return the number of leaf and non-leaf nodes in a binary tree as a string formatted as <code>\"leaf_count non_leaf_count\"</code>.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴"
    ],
    examples: [
      { input: "Tree: [1, 2, 3]", output: "2 1" }
    ],
    type: "binary_tree",
    methodName: "countNodes",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    // Return leaf count and non-leaf count: "leaf_count non_leaf_count"
    static String countNodes(Node root) {
        // Write your code here
        return "0 0";
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    static String countNodes(Node root) {
        if (root == null) return "0 0";
        int leaves = countLeaves(root);
        int nonLeaves = countNonLeaves(root);
        return leaves + " " + nonLeaves;
    }

    private static int countLeaves(Node node) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) return 1;
        return countLeaves(node.left) + countLeaves(node.right);
    }

    private static int countNonLeaves(Node node) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) return 0;
        return 1 + countNonLeaves(node.left) + countNonLeaves(node.right);
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, 4], args: [] }, expected: "2 2", visible: true }
    ]
  },

  {
    id: "java-tp-bt-010",
    title: "Convert to Mirror Tree",
    section: "Binary Trees",
    difficulty: "Easy",
    tags: ["Tree", "Mirror"],
    category: "testpad",
    prompt: "Convert a binary tree into its mirror image (in-place swap of left and right children).",
    constraints: [
      "0 ≤ number of nodes ≤ 5000"
    ],
    examples: [
      { input: "Tree: [1, 2, 3]", output: "3 1 2" }
    ],
    type: "binary_tree",
    methodName: "mirrorTree",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    // Convert tree to mirror in-place and return root
    static Node mirrorTree(Node root) {
        // Write your code here
        return root;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    static Node mirrorTree(Node root) {
        if (root == null) return null;
        Node left = mirrorTree(root.left);
        Node right = mirrorTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3], args: [] }, expected: "3 1 2", visible: true }
    ]
  },

  {
    id: "java-tp-cll-001",
    title: "Check Circular Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Given a singly linked list, check if it is circular (i.e. the next pointer of the last node points back to the head node). Return <code>true</code> if so, <code>false</code> otherwise.",
    constraints: [
      "0 ≤ number of nodes ≤ 1000"
    ],
    examples: [
      { input: "Circular: [1, 2, 3]", output: "true" }
    ],
    type: "singly_linked_list",
    methodName: "isCircular",
    returnType: "boolean",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    static boolean isCircular(Node head) {
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

    static boolean isCircular(Node head) {
        if (head == null) return true;
        Node curr = head.next;
        while (curr != null && curr != head) {
            curr = curr.next;
        }
        return curr == head;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3], args: [] }, expected: "false", visible: true }
    ]
  },

  {
    id: "java-tp-gc-001",
    title: "Duplicate Queue Elements",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Queue", "Collections"],
    category: "testpad",
    prompt: "Given a queue of integers, duplicate each element (e.g. queue <code>[1, 2, 3]</code> becomes <code>[1, 1, 2, 2, 3, 3]</code>).",
    constraints: [
      "1 ≤ queue size ≤ 1000"
    ],
    examples: [
      { input: "Queue: [1, 2]", output: "1 1 2 2" }
    ],
    type: "queue",
    methodName: "duplicateQueue",
    returnType: "Queue",
    starterCode: `class Solution {
    static java.util.Queue<Integer> duplicateQueue(java.util.Queue<Integer> q) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> duplicateQueue(java.util.Queue<Integer> q) {
        if (q == null) return null;
        int size = q.size();
        for (int i = 0; i < size; i++) {
            int val = q.poll();
            q.add(val);
            q.add(val);
        }
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3], args: [] }, expected: "1 1 2 2 3 3", visible: true }
    ]
  },

  {
    id: "java-tp-gc-002",
    title: "Happy Number Check",
    section: "Hashing",
    difficulty: "Easy",
    tags: ["Math", "HashSet"],
    category: "testpad",
    prompt: "Determine if a number is a Happy Number. A happy number is defined by a process where you replace the number by the sum of the squares of its digits, repeating until the number equals 1, or it loops endlessly in a cycle which does not include 1.",
    constraints: [
      "1 ≤ n ≤ 2³¹ - 1"
    ],
    examples: [
      { input: "n = 19", output: "true" }
    ],
    type: "array_return",
    methodName: "isHappy",
    returnType: "boolean",
    starterCode: `class Solution {
    // Return true if n is a happy number
    static boolean isHappy(int n) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static boolean isHappy(int n) {
        java.util.Set<Integer> seen = new java.util.HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            int sum = 0;
            while (n > 0) {
                int d = n % 10;
                sum += d * d;
                n /= 10;
            }
            n = sum;
        }
        return n == 1;
    }
}`,
    testCases: [
      { input: { array: [], args: [19] }, expected: "true", visible: true },
      { input: { array: [], args: [2] }, expected: "false", visible: true }
    ]
  }
