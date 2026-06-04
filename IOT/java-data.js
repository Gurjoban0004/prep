// ============================================================
//  JAVA DSA PROBLEMS — Function-Only Practice Database
//  Source: prep-code-java.pdf (Category 2: Function-Only DSA)
// ============================================================

const JAVA_DSA_PROBLEMS = [

  // ════════════════════════════════════════════════════════════
  //  SECTION 1: LINKED LISTS
  // ════════════════════════════════════════════════════════════

  {
    id: "java-ll-001",
    title: "Rotate a Linked List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Pointers"],
    prompt: "Left-rotate a singly linked list by <code>k</code> positions. Move the first <code>k</code> nodes to the tail of the list. If <code>k &gt;= n</code> (length of list), leave the list unchanged. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
    constraints: [
      "0 ≤ number of nodes ≤ 1000",
      "-10⁴ ≤ Node.data ≤ 10⁴",
      "0 ≤ k ≤ 10⁵"
    ],
    examples: [
      { input: "List: [1, 2, 3, 4, 5], k = 2", output: "3 4 5 1 2" },
      { input: "List: [10, 20], k = 3", output: "10 20" }
    ],
    type: "singly_linked_list",
    methodName: "rotateList",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    // Left-rotate list by k positions
    static Node rotateList(Node head, int k) {
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

    static Node rotateList(Node head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        int len = 1;
        Node tail = head;
        while (tail.next != null) { tail = tail.next; len++; }
        if (k >= len) return head;
        Node newTail = head;
        for (int i = 1; i < k; i++) newTail = newTail.next;
        Node newHead = newTail.next;
        newTail.next = null;
        tail.next = head;
        return newHead;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 5], args: [2] }, expected: "3 4 5 1 2", visible: true },
      { input: { list: [10, 20], args: [3] }, expected: "10 20", visible: true },
      { input: { list: [1, 2, 3], args: [1] }, expected: "2 3 1", visible: true },
      { input: { list: [5], args: [0] }, expected: "5", visible: false },
      { input: { list: [1, 2, 3, 4, 5, 6], args: [5] }, expected: "6 1 2 3 4 5", visible: false }
    ]
  },

  {
    id: "java-ll-002",
    title: "Find Intersection of Two Sorted Lists",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Two Pointers"],
    prompt: "Given two sorted singly linked lists, return a <strong>new</strong> sorted linked list containing only the elements common to both lists.",
    constraints: [
      "Both lists are sorted in non-decreasing order.",
      "Duplicate values in the same list are possible.",
      "Return a new list (do not modify the originals)."
    ],
    examples: [
      { input: "List1: [1, 2, 3, 4, 6], List2: [2, 4, 6, 8]", output: "2 4 6" },
      { input: "List1: [1, 1, 2], List2: [1, 1, 3]", output: "1 1" }
    ],
    type: "two_singly_linked_lists",
    methodName: "intersection",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    // Return new sorted list of common elements
    static Node intersection(Node h1, Node h2) {
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

    static Node intersection(Node h1, Node h2) {
        Node dummy = new Node(0), curr = dummy;
        while (h1 != null && h2 != null) {
            if (h1.data == h2.data) {
                curr.next = new Node(h1.data);
                curr = curr.next;
                h1 = h1.next; h2 = h2.next;
            } else if (h1.data < h2.data) h1 = h1.next;
            else h2 = h2.next;
        }
        return dummy.next;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 6], list2: [2, 4, 6, 8], args: [] }, expected: "2 4 6", visible: true },
      { input: { list: [1, 1, 2], list2: [1, 1, 3], args: [] }, expected: "1 1", visible: true },
      { input: { list: [5, 10, 15], list2: [3, 6, 9], args: [] }, expected: "", visible: true },
      { input: { list: [1, 2, 3], list2: [1, 2, 3], args: [] }, expected: "1 2 3", visible: false },
      { input: { list: [], list2: [1, 2], args: [] }, expected: "", visible: false }
    ]
  },

  {
    id: "java-ll-003",
    title: "Find Nth Node From End",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Two Pointers"],
    prompt: "Find and return the <strong>data value</strong> of the Nth node from the end of a singly linked list. Use the two-pointer (fast/slow) technique. Return <code>-1</code> if N is greater than the length of the list.",
    constraints: [
      "1 ≤ N ≤ 10⁵",
      "The list contains at least 1 node.",
      "Return -1 if N > length of list."
    ],
    examples: [
      { input: "List: [1, 2, 3, 4, 5], N = 2", output: "4" },
      { input: "List: [7], N = 1", output: "7" }
    ],
    type: "singly_linked_list",
    methodName: "nthFromEnd",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    // Return data of Nth node from end, or -1
    static int nthFromEnd(Node head, int n) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    static int nthFromEnd(Node head, int n) {
        Node fast = head, slow = head;
        for (int i = 0; i < n; i++) {
            if (fast == null) return -1;
            fast = fast.next;
        }
        while (fast != null) { fast = fast.next; slow = slow.next; }
        return slow.data;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 5], args: [2] }, expected: "4", visible: true },
      { input: { list: [7], args: [1] }, expected: "7", visible: true },
      { input: { list: [1, 2, 3], args: [5] }, expected: "-1", visible: true },
      { input: { list: [10, 20, 30, 40], args: [4] }, expected: "10", visible: false },
      { input: { list: [5, 10], args: [1] }, expected: "10", visible: false }
    ]
  },

  {
    id: "java-ll-004",
    title: "Find Middle of Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Slow/Fast Pointer"],
    prompt: "Return the <strong>data value</strong> of the middle node. For even-length lists, return the second middle node. Return <code>-1</code> for an empty list.",
    constraints: [
      "0 ≤ number of nodes ≤ 10⁴",
      "For even length, return the second middle."
    ],
    examples: [
      { input: "List: [1, 2, 3, 4, 5]", output: "3" },
      { input: "List: [1, 2, 3, 4]", output: "3" }
    ],
    type: "singly_linked_list",
    methodName: "findMiddle",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    // Return data of middle node
    static int findMiddle(Node head) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    static int findMiddle(Node head) {
        if (head == null) return -1;
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.data;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 5], args: [] }, expected: "3", visible: true },
      { input: { list: [1, 2, 3, 4], args: [] }, expected: "3", visible: true },
      { input: { list: [42], args: [] }, expected: "42", visible: true },
      { input: { list: [1, 2], args: [] }, expected: "2", visible: false },
      { input: { list: [10, 20, 30, 40, 50, 60], args: [] }, expected: "40", visible: false }
    ]
  },

  {
    id: "java-ll-005",
    title: "Merge Two Sorted Linked Lists",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Merge"],
    prompt: "Merge two sorted singly linked lists into a single sorted list. Do this by splicing together the nodes of the first two lists. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
    constraints: [
      "Both lists are sorted in non-decreasing order.",
      "The merged list should also be sorted."
    ],
    examples: [
      { input: "List1: [1, 3, 5], List2: [2, 4, 6]", output: "1 2 3 4 5 6" },
      { input: "List1: [], List2: [1, 2]", output: "1 2" }
    ],
    type: "two_singly_linked_lists",
    methodName: "mergeSorted",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    // Merge two sorted lists into one sorted list
    static Node mergeSorted(Node h1, Node h2) {
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

    static Node mergeSorted(Node h1, Node h2) {
        Node dummy = new Node(0), curr = dummy;
        while (h1 != null && h2 != null) {
            if (h1.data <= h2.data) { curr.next = h1; h1 = h1.next; }
            else { curr.next = h2; h2 = h2.next; }
            curr = curr.next;
        }
        curr.next = (h1 != null) ? h1 : h2;
        return dummy.next;
    }
}`,
    testCases: [
      { input: { list: [1, 3, 5], list2: [2, 4, 6], args: [] }, expected: "1 2 3 4 5 6", visible: true },
      { input: { list: [], list2: [1, 2], args: [] }, expected: "1 2", visible: true },
      { input: { list: [1, 1], list2: [1, 1], args: [] }, expected: "1 1 1 1", visible: true },
      { input: { list: [5], list2: [1, 2, 3], args: [] }, expected: "1 2 3 5", visible: false },
      { input: { list: [], list2: [], args: [] }, expected: "", visible: false }
    ]
  },

  {
    id: "java-ll-006",
    title: "Reverse a Linked List",
    section: "Linked Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Iterative"],
    prompt: "Reverse a singly linked list iteratively in O(n) time and O(1) space. Return the new head. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
    constraints: [
      "0 ≤ number of nodes ≤ 5000",
      "-5000 ≤ Node.data ≤ 5000"
    ],
    examples: [
      { input: "List: [1, 2, 3, 4, 5]", output: "5 4 3 2 1" },
      { input: "List: [1]", output: "1" }
    ],
    type: "singly_linked_list",
    methodName: "reverseList",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    // Reverse the linked list iteratively
    static Node reverseList(Node head) {
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

    static Node reverseList(Node head) {
        Node prev = null, curr = head;
        while (curr != null) {
            Node next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4, 5], args: [] }, expected: "5 4 3 2 1", visible: true },
      { input: { list: [1], args: [] }, expected: "1", visible: true },
      { input: { list: [1, 2], args: [] }, expected: "2 1", visible: true },
      { input: { list: [], args: [] }, expected: "", visible: false },
      { input: { list: [10, 20, 30, 40, 50, 60, 70], args: [] }, expected: "70 60 50 40 30 20 10", visible: false }
    ]
  },

  // ════════════════════════════════════════════════════════════
  //  SECTION 2: BINARY TREES
  // ════════════════════════════════════════════════════════════

  {
    id: "java-bt-001",
    title: "Maximum Element at Each Level",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Binary Tree", "BFS", "Level Order"],
    prompt: "Given a binary tree, find and print the maximum value at each level. Output space-separated values, one per level from root to leaves. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: [
      "Tree is given as a level-order array (null for missing nodes).",
      "1 ≤ number of nodes ≤ 10⁴"
    ],
    examples: [
      { input: "Tree: [1, 5, 3, 9, 2, 8]", output: "1 5 9" },
      { input: "Tree: [10]", output: "10" }
    ],
    type: "binary_tree",
    methodName: "maxAtEachLevel",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    // Return space-separated max values per level
    static String maxAtEachLevel(Node root) {
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

    static String maxAtEachLevel(Node root) {
        if (root == null) return "";
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            int size = q.size(), max = Integer.MIN_VALUE;
            for (int i = 0; i < size; i++) {
                Node n = q.poll();
                max = Math.max(max, n.data);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            if (sb.length() > 0) sb.append(" ");
            sb.append(max);
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { tree: [1, 5, 3, 9, 2, 8], args: [] }, expected: "1 5 9", visible: true },
      { input: { tree: [10], args: [] }, expected: "10", visible: true },
      { input: { tree: [3, 9, 20, null, null, 15, 7], args: [] }, expected: "3 20 15", visible: true },
      { input: { tree: [1, 2, 3, 4, 5, 6, 7], args: [] }, expected: "1 3 7", visible: false },
      { input: { tree: [-1, -5, -3], args: [] }, expected: "-1 -3", visible: false }
    ]
  },

  // ════════════════════════════════════════════════════════════
  //  SECTION 3: STACKS & QUEUES
  // ════════════════════════════════════════════════════════════

  {
    id: "java-sq-001",
    title: "Balanced Parentheses Check",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack", "Strings"],
    prompt: "Check if a string containing <code>()</code>, <code>{}</code>, and <code>[]</code> has balanced brackets. Return <code>true</code> if balanced, <code>false</code> otherwise. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "0 ≤ string length ≤ 10⁴",
      "String contains only (){}[] characters."
    ],
    examples: [
      { input: "s = \"({[]})\"", output: "true" },
      { input: "s = \"([)]\"", output: "false" }
    ],
    type: "string_return",
    methodName: "isBalanced",
    returnType: "boolean",
    starterCode: `class Solution {
    // Return true if brackets are balanced
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
      { input: { string: "([)]", args: [] }, expected: "false", visible: true },
      { input: { string: "", args: [] }, expected: "true", visible: true },
      { input: { string: "((()))", args: [] }, expected: "true", visible: false },
      { input: { string: "}{", args: [] }, expected: "false", visible: false }
    ]
  },

  {
    id: "java-sq-002",
    title: "Evaluate Prefix Expression",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Math"],
    prompt: "Evaluate a prefix (Polish notation) expression. Each character is either a single digit (0-9) or an operator (+, -, *, /). Scan from right to left using a stack. Return the result as a <code>long</code>. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "Expression contains only single-digit operands (0-9).",
      "Operators are +, -, *, /.",
      "Division is integer division."
    ],
    examples: [
      { input: "expr = \"+9*26\"", output: "21" },
      { input: "expr = \"-*534\"", output: "11" }
    ],
    type: "string_return",
    methodName: "evalPrefix",
    returnType: "long",
    starterCode: `class Solution {
    // Evaluate a prefix expression
    static long evalPrefix(String expr) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static long evalPrefix(String expr) {
        java.util.Deque<Long> stack = new java.util.ArrayDeque<>();
        for (int i = expr.length() - 1; i >= 0; i--) {
            char c = expr.charAt(i);
            if (Character.isDigit(c)) {
                stack.push((long)(c - '0'));
            } else {
                long a = stack.pop(), b = stack.pop();
                switch (c) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }
        return stack.pop();
    }
}`,
    testCases: [
      { input: { string: "+9*26", args: [] }, expected: "21", visible: true },
      { input: { string: "-*534", args: [] }, expected: "11", visible: true },
      { input: { string: "*+3456", args: [] }, expected: "42", visible: true },
      { input: { string: "+12", args: [] }, expected: "3", visible: false },
      { input: { string: "/84", args: [] }, expected: "2", visible: false }
    ]
  },

  {
    id: "java-sq-003",
    title: "Minimum Bracket Reversals",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Greedy"],
    prompt: "Given a string of only <code>{</code> and <code>}</code>, find the minimum number of bracket reversals needed to make the expression balanced. Return <code>-1</code> if it's not possible (odd length). <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "String contains only '{' and '}'.",
      "Return -1 if the string length is odd."
    ],
    examples: [
      { input: "s = \"}{\"", output: "2" },
      { input: "s = \"{{{\"", output: "-1" }
    ],
    type: "string_return",
    methodName: "minReversals",
    returnType: "int",
    starterCode: `class Solution {
    // Return minimum reversals to balance, or -1
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
      { input: { string: "{{{", args: [] }, expected: "-1", visible: true },
      { input: { string: "{{}}", args: [] }, expected: "0", visible: true },
      { input: { string: "{{{{", args: [] }, expected: "2", visible: false },
      { input: { string: "}{}{}{", args: [] }, expected: "2", visible: false }
    ]
  },

  {
    id: "java-sq-004",
    title: "Next Greater Element (Telecom Data)",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Monotonic Stack"],
    prompt: "For each building height in an array, find the next strictly taller building to the right. Sum all such next-greater values. If no taller building exists to the right, use <code>-1</code> for that position. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "1 ≤ array length ≤ 10⁵",
      "1 ≤ height ≤ 10⁶"
    ],
    examples: [
      { input: "heights = [4, 5, 2, 10]", output: "16" },
      { input: "heights = [3, 2, 1]", output: "-3" }
    ],
    type: "array_return",
    methodName: "collectData",
    returnType: "long",
    starterCode: `class Solution {
    // Sum of next-greater elements (-1 if none)
    static long collectData(int[] height) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static long collectData(int[] height) {
        int n = height.length;
        int[] nextGreater = new int[n];
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        java.util.Arrays.fill(nextGreater, -1);
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && height[stack.peek()] < height[i]) {
                nextGreater[stack.pop()] = height[i];
            }
            stack.push(i);
        }
        long sum = 0;
        for (int x : nextGreater) sum += x;
        return sum;
    }
}`,
    testCases: [
      { input: { array: [4, 5, 2, 10], args: [] }, expected: "24", visible: true },
      { input: { array: [3, 2, 1], args: [] }, expected: "-3", visible: true },
      { input: { array: [1, 2, 3, 4], args: [] }, expected: "8", visible: true },
      { input: { array: [5], args: [] }, expected: "-1", visible: false },
      { input: { array: [1, 1, 1, 1], args: [] }, expected: "-4", visible: false }
    ]
  },

  {
    id: "java-sq-005",
    title: "Reverse String Using Stack",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack", "Strings"],
    prompt: "Reverse a given string using a stack. Push all characters onto a stack, then pop them off to build the reversed string. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "0 ≤ string length ≤ 10⁴",
      "String may contain any printable ASCII characters."
    ],
    examples: [
      { input: "s = \"hello\"", output: "olleh" },
      { input: "s = \"abcde\"", output: "edcba" }
    ],
    type: "string_return",
    methodName: "reverseString",
    returnType: "String",
    starterCode: `class Solution {
    // Reverse the string using a stack
    static String reverseString(String s) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String reverseString(String s) {
        java.util.Deque<Character> stack = new java.util.ArrayDeque<>();
        for (char c : s.toCharArray()) stack.push(c);
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) sb.append(stack.pop());
        return sb.toString();
    }
}`,
    testCases: [
      { input: { string: "hello", args: [] }, expected: "olleh", visible: true },
      { input: { string: "abcde", args: [] }, expected: "edcba", visible: true },
      { input: { string: "a", args: [] }, expected: "a", visible: true },
      { input: { string: "", args: [] }, expected: "", visible: false },
      { input: { string: "racecar", args: [] }, expected: "racecar", visible: false }
    ]
  },

  // ════════════════════════════════════════════════════════════
  //  SECTION 4: HASHING
  // ════════════════════════════════════════════════════════════

  {
    id: "java-ha-001",
    title: "Largest Subarray with Zero Sum",
    section: "Hashing",
    difficulty: "Medium",
    tags: ["HashMap", "Prefix Sum"],
    prompt: "Given an integer array, find the <strong>length</strong> of the longest contiguous subarray whose elements sum to zero. Return <code>-1</code> if no such subarray exists.",
    constraints: [
      "1 ≤ array length ≤ 10⁵",
      "-10⁴ ≤ arr[i] ≤ 10⁴"
    ],
    examples: [
      { input: "arr = [15, -2, 2, -8, 1, 7, 10, 23]", output: "5" },
      { input: "arr = [1, 2, 3]", output: "-1" }
    ],
    type: "array_return",
    methodName: "maxZeroSumSubarray",
    returnType: "int",
    starterCode: `class Solution {
    // Return length of longest zero-sum subarray, or -1
    static int maxZeroSumSubarray(int[] arr) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static int maxZeroSumSubarray(int[] arr) {
        java.util.Map<Integer,Integer> map = new java.util.HashMap<>();
        map.put(0, -1);
        int sum = 0, maxLen = -1;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            if (map.containsKey(sum))
                maxLen = Math.max(maxLen, i - map.get(sum));
            else
                map.put(sum, i);
        }
        return maxLen;
    }
}`,
    testCases: [
      { input: { array: [15, -2, 2, -8, 1, 7, 10, 23], args: [] }, expected: "5", visible: true },
      { input: { array: [1, 2, 3], args: [] }, expected: "-1", visible: true },
      { input: { array: [1, -1], args: [] }, expected: "2", visible: true },
      { input: { array: [0, 0, 0], args: [] }, expected: "3", visible: false },
      { input: { array: [3, -3, 3, -3], args: [] }, expected: "4", visible: false }
    ]
  },

  {
    id: "java-ha-002",
    title: "Longest Substring with K Distinct Characters",
    section: "Hashing",
    difficulty: "Medium",
    tags: ["HashMap", "Sliding Window"],
    prompt: "Given a string and an integer <code>k</code>, find the length of the longest substring that contains <strong>exactly</strong> <code>k</code> distinct characters. Return <code>-1</code> if no such substring exists.",
    constraints: [
      "1 ≤ string length ≤ 10⁵",
      "1 ≤ k ≤ 26",
      "String contains only lowercase English letters."
    ],
    examples: [
      { input: "s = \"aabacbebebe\", k = 3", output: "7" },
      { input: "s = \"aaa\", k = 2", output: "-1" }
    ],
    type: "string_return",
    methodName: "longestKDistinct",
    returnType: "int",
    starterCode: `class Solution {
    // Return length of longest substring with exactly k distinct chars
    static int longestKDistinct(String s, int k) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static int longestKDistinct(String s, int k) {
        java.util.Map<Character,Integer> freq = new java.util.HashMap<>();
        int left = 0, maxLen = -1;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            freq.merge(c, 1, Integer::sum);
            while (freq.size() > k) {
                char l = s.charAt(left++);
                freq.merge(l, -1, Integer::sum);
                if (freq.get(l) == 0) freq.remove(l);
            }
            if (freq.size() == k)
                maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
    testCases: [
      { input: { string: "aabacbebebe", args: [3] }, expected: "7", visible: true },
      { input: { string: "aaa", args: [2] }, expected: "-1", visible: true },
      { input: { string: "abcabc", args: [2] }, expected: "2", visible: true },
      { input: { string: "aabbcc", args: [3] }, expected: "6", visible: false },
      { input: { string: "a", args: [1] }, expected: "1", visible: false }
    ]
  },
  {
    id: "java-ha-003",
    title: "Missing Number in Array (XOR)",
    section: "Hashing",
    difficulty: "Easy",
    tags: ["Bit Manipulation", "XOR"],
    prompt: "An array contains numbers from 1 to N with exactly one number missing. Find the missing number using XOR. The array has <code>N-1</code> elements. <br/><br/><strong>Java Collections Framework:</strong> Solve this problem by utilizing Java's built-in collections such as <code>Queue</code>, <code>Stack</code>, <code>ArrayList</code>, <code>HashMap</code>, or <code>HashSet</code>. Consider the time complexity of operations like search, insertion, and deletion.",
    constraints: [
      "1 ≤ N ≤ 10⁶",
      "Array contains N-1 distinct elements from [1, N]."
    ],
    examples: [
      { input: "arr = [1, 2, 4, 5], N = 5", output: "3" },
      { input: "arr = [2, 3], N = 3", output: "1" }
    ],
    type: "array_return",
    methodName: "missingNumber",
    returnType: "int",
    starterCode: `class Solution {
    // Find the missing number from 1..N
    static int missingNumber(int[] arr) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int missingNumber(int[] arr) {
        int n = arr.length + 1;
        int xorAll = 0, xorArr = 0;
        for (int i = 1; i <= n; i++) xorAll ^= i;
        for (int x : arr) xorArr ^= x;
        return xorAll ^ xorArr;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 4, 5], args: [] }, expected: "3", visible: true },
      { input: { array: [2, 3], args: [] }, expected: "1", visible: true },
      { input: { array: [1], args: [] }, expected: "2", visible: true },
      { input: { array: [1, 2, 3, 4, 5, 6, 7, 8, 10], args: [] }, expected: "9", visible: false },
      { input: { array: [2, 3, 4, 5, 6], args: [] }, expected: "1", visible: false }
    ]
  },

  // ════════════════════════════════════════════════════════════
  //  SECTION 5: RECURSION & BIT MANIPULATION
  // ════════════════════════════════════════════════════════════

  {
    id: "java-rb-001",
    title: "Power of a Number (Fast Exponentiation)",
    section: "Recursion & Bits",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    prompt: "Calculate <code>base^exp</code> using recursive fast exponentiation. Both base and exponent are non-negative integers. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "0 ≤ base ≤ 100",
      "0 ≤ exp ≤ 30",
      "Return as a long value."
    ],
    examples: [
      { input: "base = 2, exp = 10", output: "1024" },
      { input: "base = 3, exp = 0", output: "1" }
    ],
    type: "array_return",
    methodName: "power",
    returnType: "long",
    starterCode: `class Solution {
    // Calculate base^exp using recursion
    static long power(long base, long exp) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static long power(long base, long exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = power(base, exp / 2);
            return half * half;
        }
        return base * power(base, exp - 1);
    }
}`,
    testCases: [
      { input: { array: [], args: [2, 10] }, expected: "1024", visible: true },
      { input: { array: [], args: [3, 0] }, expected: "1", visible: true },
      { input: { array: [], args: [5, 3] }, expected: "125", visible: true },
      { input: { array: [], args: [2, 20] }, expected: "1048576", visible: false },
      { input: { array: [], args: [1, 100] }, expected: "1", visible: false }
    ]
  },

  {
    id: "java-rb-002",
    title: "Count Set Bits",
    section: "Recursion & Bits",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    prompt: "Count the number of set bits (1s) in the binary representation of a given non-negative integer using Brian Kernighan's algorithm. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "0 ≤ n ≤ 2³¹ - 1"
    ],
    examples: [
      { input: "n = 13 (binary: 1101)", output: "3" },
      { input: "n = 0", output: "0" }
    ],
    type: "array_return",
    methodName: "countSetBits",
    returnType: "int",
    starterCode: `class Solution {
    // Count number of 1-bits
    static int countSetBits(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int countSetBits(int n) {
        int count = 0;
        while (n != 0) { n &= (n - 1); count++; }
        return count;
    }
}`,
    testCases: [
      { input: { array: [], args: [13] }, expected: "3", visible: true },
      { input: { array: [], args: [0] }, expected: "0", visible: true },
      { input: { array: [], args: [255] }, expected: "8", visible: true },
      { input: { array: [], args: [1024] }, expected: "1", visible: false },
      { input: { array: [], args: [2147483647] }, expected: "31", visible: false }
    ]
  },

  {
    id: "java-rb-003",
    title: "Check Kth Bit",
    section: "Recursion & Bits",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    prompt: "Check if the k-th bit (1-indexed from the right) is set in the number <code>n</code>. Return <code>1</code> if set, <code>0</code> otherwise. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "1 ≤ k ≤ 32",
      "0 ≤ n ≤ 2³¹ - 1"
    ],
    examples: [
      { input: "n = 5, k = 1", output: "1" },
      { input: "n = 5, k = 2", output: "0" }
    ],
    type: "array_return",
    methodName: "kthBit",
    returnType: "int",
    starterCode: `class Solution {
    // Return 1 if kth bit is set, else 0
    static int kthBit(long n, int k) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int kthBit(long n, int k) {
        if (k > 32) return 0;
        return (int)((n >> (k - 1)) & 1);
    }
}`,
    testCases: [
      { input: { array: [], args: [5, 1] }, expected: "1", visible: true },
      { input: { array: [], args: [5, 2] }, expected: "0", visible: true },
      { input: { array: [], args: [8, 4] }, expected: "1", visible: true },
      { input: { array: [], args: [0, 1] }, expected: "0", visible: false },
      { input: { array: [], args: [255, 8] }, expected: "1", visible: false }
    ]
  },

  {
    id: "java-rb-004",
    title: "Recurrence T(n) = T(n-1) + 2n",
    section: "Recursion & Bits",
    difficulty: "Easy",
    tags: ["Recursion", "Math"],
    prompt: "Implement the recurrence relation <code>T(n) = T(n-1) + 2*n</code> with base case <code>T(0) = 1</code>. Return the value of <code>T(n)</code>. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "0 ≤ n ≤ 10⁴"
    ],
    examples: [
      { input: "n = 3", output: "13" },
      { input: "n = 0", output: "1" }
    ],
    type: "array_return",
    methodName: "T",
    returnType: "long",
    starterCode: `class Solution {
    // T(0) = 1, T(n) = T(n-1) + 2*n
    static long T(int n) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static long T(int n) {
        if (n == 0) return 1;
        return T(n - 1) + 2L * n;
    }
}`,
    testCases: [
      { input: { array: [], args: [3] }, expected: "13", visible: true },
      { input: { array: [], args: [0] }, expected: "1", visible: true },
      { input: { array: [], args: [5] }, expected: "31", visible: true },
      { input: { array: [], args: [1] }, expected: "3", visible: false },
      { input: { array: [], args: [10] }, expected: "111", visible: false }
    ]
  },

  {
    id: "java-rb-005",
    title: "Find Special Employee (Unique Element)",
    section: "Recursion & Bits",
    difficulty: "Easy",
    tags: ["Bit Manipulation", "XOR"],
    prompt: "In an array where every element appears exactly twice except one, find the element that appears exactly once. Use XOR. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "1 ≤ array length ≤ 10⁵ (always odd)",
      "Every element appears twice except one."
    ],
    examples: [
      { input: "arr = [1, 2, 1, 3, 2]", output: "3" },
      { input: "arr = [7]", output: "7" }
    ],
    type: "array_return",
    methodName: "findSpecial",
    returnType: "int",
    starterCode: `class Solution {
    // Find the unique element using XOR
    static int findSpecial(int[] arr) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int findSpecial(int[] arr) {
        int xor = 0;
        for (int x : arr) xor ^= x;
        return xor;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 1, 3, 2], args: [] }, expected: "3", visible: true },
      { input: { array: [7], args: [] }, expected: "7", visible: true },
      { input: { array: [4, 1, 2, 1, 2], args: [] }, expected: "4", visible: true },
      { input: { array: [10, 20, 10, 30, 30, 40, 20], args: [] }, expected: "40", visible: false },
      { input: { array: [99, 1, 99], args: [] }, expected: "1", visible: false }
    ]
  },

  // ════════════════════════════════════════════════════════════
  //  SECTION 6: EXAM QUESTIONS
  // ════════════════════════════════════════════════════════════

  {
    id: "java-exam-001",
    title: "Mirror of the Queue",
    section: "Queues",
    difficulty: "Easy",
    tags: ["Queue", "List"],
    category: "exam",
    prompt: "Given a queue of integers, mirror it. That is, append all elements in reverse order to the tail of the queue. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "1 ≤ Queue size ≤ 1000",
      "0 ≤ element value ≤ 10⁵"
    ],
    examples: [
      { input: "Queue: [1, 2, 3]", output: "1 2 3 3 2 1" },
      { input: "Queue: [10]", output: "10 10" }
    ],
    type: "queue",
    methodName: "mirrorQueue",
    returnType: "Queue",
    starterCode: `class Solution {
    // Mirror the queue by appending elements in reverse order
    static java.util.Queue<Integer> mirrorQueue(java.util.Queue<Integer> q) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> mirrorQueue(java.util.Queue<Integer> q) {
        if (q == null) return null;
        java.util.List<Integer> list = new java.util.ArrayList<>(q);
        java.util.Collections.reverse(list);
        q.addAll(list);
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3], args: [] }, expected: "1 2 3 3 2 1", visible: true },
      { input: { array: [10], args: [] }, expected: "10 10", visible: true },
      { input: { array: [5, 4, 3, 2, 1], args: [] }, expected: "5 4 3 2 1 1 2 3 4 5", visible: true },
      { input: { array: [], args: [] }, expected: "", visible: false }
    ]
  },

  {
    id: "java-exam-002",
    title: "Flip Odd Elements of Queue",
    section: "Queues",
    difficulty: "Medium",
    tags: ["Queue", "Reversal"],
    category: "exam",
    prompt: "Given a queue of integers, reverse (flip) only the elements at odd positions (1-indexed, i.e., 1st, 3rd, 5th, ... elements). Even-positioned elements should remain in their original order. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "1 ≤ Queue size ≤ 1000",
      "0 ≤ element value ≤ 10⁵"
    ],
    examples: [
      { input: "Queue: [1, 2, 3, 4, 5]", output: "5 2 3 4 1" },
      { input: "Queue: [10, 20]", output: "10 20" }
    ],
    type: "queue",
    methodName: "flipOddElements",
    returnType: "Queue",
    starterCode: `class Solution {
    // Reverse only the elements at odd positions (1-indexed)
    static java.util.Queue<Integer> flipOddElements(java.util.Queue<Integer> q) {
        // Write your code here
        return q;
    }
}`,
    solutionCode: `class Solution {
    static java.util.Queue<Integer> flipOddElements(java.util.Queue<Integer> q) {
        if (q == null || q.size() <= 1) return q;
        java.util.List<Integer> list = new java.util.ArrayList<>(q);
        java.util.List<Integer> odds = new java.util.ArrayList<>();
        for (int i = 0; i < list.size(); i += 2) {
            odds.add(list.get(i));
        }
        java.util.Collections.reverse(odds);
        int oddIdx = 0;
        for (int i = 0; i < list.size(); i += 2) {
            list.set(i, odds.get(oddIdx++));
        }
        q.clear();
        q.addAll(list);
        return q;
    }
}`,
    testCases: [
      { input: { array: [1, 2, 3, 4, 5], args: [] }, expected: "5 2 3 4 1", visible: true },
      { input: { array: [10, 20], args: [] }, expected: "10 20", visible: true },
      { input: { array: [1, 2, 3, 4, 5, 6, 7, 8], args: [] }, expected: "7 2 5 4 3 6 1 8", visible: true },
      { input: { array: [42], args: [] }, expected: "42", visible: false }
    ]
  },

  {
    id: "java-exam-003",
    title: "Binary to Decimal (Void Function)",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["String", "Math"],
    category: "exam",
    prompt: "Given a binary string, convert it to its decimal representation. This is a void function, so print the result directly to <code>System.out.println</code>. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "1 ≤ binary string length ≤ 30",
      "String contains only '0' and '1' characters."
    ],
    examples: [
      { input: "binary = \"110\"", output: "6" },
      { input: "binary = \"1010\"", output: "10" }
    ],
    type: "string_return",
    methodName: "binToDec",
    returnType: "void",
    starterCode: `class Solution {
    // Print the decimal equivalent of the binary string
    static void binToDec(String binary) {
        // Write your code here
    }
}`,
    solutionCode: `class Solution {
    static void binToDec(String binary) {
        if (binary == null || binary.isEmpty()) return;
        int dec = 0;
        for (int i = 0; i < binary.length(); i++) {
            dec = dec * 2 + (binary.charAt(i) - '0');
        }
        System.out.println(dec);
    }
}`,
    testCases: [
      { input: { string: "110", args: [] }, expected: "6", visible: true },
      { input: { string: "1010", args: [] }, expected: "10", visible: true },
      { input: { string: "0", args: [] }, expected: "0", visible: true },
      { input: { string: "111111", args: [] }, expected: "63", visible: false }
    ]
  },

  {
    id: "java-exam-004",
    title: "Decimal to Binary (Long Parameter)",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Recursion", "Bits"],
    category: "exam",
    prompt: "Given a number <code>n</code> (represented as a <code>long</code>), return its binary representation as a string. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "0 ≤ n ≤ 2⁵⁰"
    ],
    examples: [
      { input: "n = 10", output: "1010" },
      { input: "n = 0", output: "0" }
    ],
    type: "array_return",
    methodName: "decToBin",
    returnType: "String",
    starterCode: `class Solution {
    // Return binary string representation of long n
    static String decToBin(long n) {
        // Write your code here
        return "";
    }
}`,
    solutionCode: `class Solution {
    static String decToBin(long n) {
        return Long.toBinaryString(n);
    }
}`,
    testCases: [
      { input: { array: [], args: [10] }, expected: "1010", visible: true },
      { input: { array: [], args: [0] }, expected: "0", visible: true },
      { input: { array: [], args: [123456789] }, expected: "111010110111100110100010101", visible: true },
      { input: { array: [], args: [1099511627776] }, expected: "10000000000000000000000000000000000000000", visible: false }
    ]
  },

  {
    id: "java-exam-005",
    title: "Greatest Common Divisor (GCD)",
    section: "Math & GCD",
    difficulty: "Easy",
    tags: ["Math", "Recursion"],
    category: "exam",
    prompt: "Given two non-negative integers <code>a</code> and <code>b</code>, find and return their Greatest Common Divisor (GCD) using the Euclidean algorithm. <br/><br/><strong>Mathematical Principles:</strong> Apply arithmetic properties, number theory algorithms (like the Euclidean algorithm for GCD), or loop constructs to calculate the result accurately.",
    constraints: [
      "0 ≤ a, b ≤ 10⁶"
    ],
    examples: [
      { input: "a = 12, b = 18", output: "6" },
      { input: "a = 5, b = 0", output: "5" }
    ],
    type: "array_return",
    methodName: "findGCD",
    returnType: "int",
    starterCode: `class Solution {
    // Return GCD of a and b
    static int findGCD(int a, int b) {
        // Write your code here
        return 1;
    }
}`,
    solutionCode: `class Solution {
    static int findGCD(int a, int b) {
        if (b == 0) return a;
        return findGCD(b, a % b);
    }
}`,
    testCases: [
      { input: { array: [], args: [12, 18] }, expected: "6", visible: true },
      { input: { array: [], args: [5, 0] }, expected: "5", visible: true },
      { input: { array: [], args: [101, 103] }, expected: "1", visible: true },
      { input: { array: [], args: [256, 128] }, expected: "128", visible: false }
    ]
  },

  {
    id: "java-exam-006",
    title: "Print Fibonacci in Reverse",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Math", "Recursion"],
    category: "exam",
    prompt: "Given an integer <code>n</code>, print the first <code>n</code> Fibonacci numbers in reverse order (space-separated). Fibonacci sequence starts with <code>0, 1, 1, 2, 3, 5, ...</code>. This is a void function. <br/><br/><strong>Recursive Strategy:</strong> A recursive function calls itself to solve smaller instances of the same problem. Always define a clear base case to terminate recursion and prevent stack overflow errors.",
    constraints: [
      "1 ≤ n ≤ 50"
    ],
    examples: [
      { input: "n = 5", output: "3 2 1 1 0" },
      { input: "n = 1", output: "0" }
    ],
    type: "array_return",
    methodName: "printFibReverse",
    returnType: "void",
    starterCode: `class Solution {
    // Print the first n Fibonacci numbers in reverse order (space-separated)
    static void printFibReverse(int n) {
        // Write your code here
    }
}`,
    solutionCode: `class Solution {
    static void printFibReverse(int n) {
        if (n <= 0) return;
        long[] fib = new long[n];
        fib[0] = 0;
        if (n > 1) fib[1] = 1;
        for (int i = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        StringBuilder sb = new StringBuilder();
        for (int i = n - 1; i >= 0; i--) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(fib[i]);
        }
        System.out.println(sb.toString());
    }
}`,
    testCases: [
      { input: { array: [], args: [5] }, expected: "3 2 1 1 0", visible: true },
      { input: { array: [], args: [1] }, expected: "0", visible: true },
      { input: { array: [], args: [8] }, expected: "13 8 5 3 2 1 1 0", visible: true },
      { input: { array: [], args: [15] }, expected: "377 233 144 89 55 34 21 13 8 5 3 2 1 1 0", visible: false }
    ]
  },

  // ════════════════════════════════════════════════════════════
  //  SECTION 7: TESTPAD QUESTIONS
  // ════════════════════════════════════════════════════════════

  {
    id: "java-tp-001",
    title: "Second Largest Element",
    section: "Arrays",
    difficulty: "Easy",
    tags: ["Array", "Searching"],
    category: "testpad",
    prompt: "Given an array of integers, find and return the second largest element in the array. Return <code>-1</code> if no second largest element exists (e.g. array size < 2, or all elements are equal). <br/><br/><strong>Array Traversal:</strong> An array is a linear data structure containing elements of the same type. Use loops, pointers, or search algorithms (like binary search) to process array elements effectively.",
    constraints: [
      "1 ≤ array size ≤ 10⁵",
      "-10⁵ ≤ arr[i] ≤ 10⁵"
    ],
    examples: [
      { input: "arr = [12, 35, 1, 10, 34, 1]", output: "34" },
      { input: "arr = [10, 5, 10]", output: "5" }
    ],
    type: "array_return",
    methodName: "secondLargest",
    returnType: "int",
    starterCode: `class Solution {
    // Return the second largest distinct element, or -1
    static int secondLargest(int[] arr) {
        // Write your code here
        return -1;
    }
}`,
    solutionCode: `class Solution {
    static int secondLargest(int[] arr) {
        if (arr == null || arr.length < 2) return -1;
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int x : arr) {
            if (x > first) {
                second = first;
                first = x;
            } else if (x > second && x != first) {
                second = x;
            }
        }
        return second == Integer.MIN_VALUE ? -1 : second;
    }
}`,
    testCases: [
      { input: { array: [12, 35, 1, 10, 34, 1], args: [] }, expected: "34", visible: true },
      { input: { array: [10, 5, 10], args: [] }, expected: "5", visible: true },
      { input: { array: [10, 10, 10], args: [] }, expected: "-1", visible: true },
      { input: { array: [5], args: [] }, expected: "-1", visible: false }
    ]
  },

  {
    id: "java-tp-002",
    title: "Palindrome String Check",
    section: "Strings",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    category: "testpad",
    prompt: "Check if a string is a palindrome. Ignore case. Return <code>true</code> if it is a palindrome, and <code>false</code> otherwise. <br/><br/><strong>String Manipulation:</strong> Java Strings are immutable. Use methods like <code>charAt()</code>, <code>substring()</code>, or the <code>StringBuilder</code> class for efficient string operations and concatenation.",
    constraints: [
      "0 ≤ string length ≤ 10⁴"
    ],
    examples: [
      { input: "s = \"radar\"", output: "true" },
      { input: "s = \"hello\"", output: "false" }
    ],
    type: "string_return",
    methodName: "isPalindrome",
    returnType: "boolean",
    starterCode: `class Solution {
    // Return true if s is a palindrome (case-insensitive)
    static boolean isPalindrome(String s) {
        // Write your code here
        return false;
    }
}`,
    solutionCode: `class Solution {
    static boolean isPalindrome(String s) {
        if (s == null) return false;
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}`,
    testCases: [
      { input: { string: "RaceCar", args: [] }, expected: "true", visible: false }
    ]
  },

  // ============================================================
  //  EXAM QUESTIONS
  // ============================================================
  {
    id: "java-exam-007",
    title: "Minimum Size Subarray Sum",
    section: "Arrays",
    difficulty: "Medium",
    tags: ["Array", "Sliding Window"],
    category: "exam",
    prompt: "Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is greater than or equal to <code>target</code>. If there is no such subarray, return <code>0</code> instead. <br/><br/><strong>Array Traversal:</strong> An array is a linear data structure containing elements of the same type. Use loops, pointers, or search algorithms (like binary search) to process array elements effectively.",
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "1 ≤ nums[i] ≤ 10⁴",
      "1 ≤ target ≤ 10⁹"
    ],
    examples: [
      { input: "nums = [2,3,1,2,4,3], target = 7", output: "2" },
      { input: "nums = [1,4,4], target = 4", output: "1" }
    ],
    type: "array_return",
    methodName: "minSubArrayLen",
    returnType: "int",
    starterCode: `class Solution {
    // Return minimal length of contiguous subarray with sum >= target
    static int minSubArrayLen(int target, int[] nums) {
        // Write your code here
        return 0;
    }
}`,
    solutionCode: `class Solution {
    static int minSubArrayLen(int target, int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int n = nums.length;
        int minLen = Integer.MAX_VALUE;
        int left = 0, sum = 0;
        for (int right = 0; right < n; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,
    testCases: [
      { input: { array: [2, 3, 1, 2, 4, 3], args: [7] }, expected: "2", visible: true },
      { input: { array: [1, 4, 4], args: [4] }, expected: "1", visible: true },
      { input: { array: [1, 1, 1, 1, 1, 1, 1, 1], args: [11] }, expected: "0", visible: true },
      { input: { array: [1, 2, 3, 4, 5], args: [15] }, expected: "5", visible: false }
    ]
  },

  {
    id: "java-exam-008",
    title: "Minimum Bracket Reversals",
    section: "Stacks & Queues",
    difficulty: "Medium",
    tags: ["Stack", "Greedy"],
    category: "exam",
    prompt: "Given a string of only <code>{</code> and <code>}</code>, find the minimum number of bracket reversals needed to make the expression balanced. Return <code>-1</code> if it's not possible (odd length). <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "String contains only '{' and '}'.",
      "Return -1 if the string length is odd."
    ],
    examples: [
      { input: "s = \"}{\"", output: "2" },
      { input: "s = \"{{{\"", output: "-1" }
    ],
    type: "string_return",
    methodName: "minReversals",
    returnType: "int",
    starterCode: `class Solution {
    // Return minimum reversals to balance, or -1
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
      { input: { string: "{{{", args: [] }, expected: "-1", visible: true },
      { input: { string: "{{}}", args: [] }, expected: "0", visible: true },
      { input: { string: "}{}{}{", args: [] }, expected: "2", visible: false }
    ]
  },

  {
    id: "java-exam-009",
    title: "Map Contains Same Range",
    section: "Hashing",
    difficulty: "Easy",
    tags: ["HashMap", "Collection"],
    category: "exam",
    prompt: "Write a function that checks if a <code>Map&lt;String, String&gt;</code> contains any two distinct keys mapping to the same value (range). Return <code>true</code> if so, <code>false</code> otherwise. <br/><br/><strong>Java Collections Framework:</strong> Solve this problem by utilizing Java's built-in collections such as <code>Queue</code>, <code>Stack</code>, <code>ArrayList</code>, <code>HashMap</code>, or <code>HashSet</code>. Consider the time complexity of operations like search, insertion, and deletion.",
    constraints: [
      "Keys and values are comma-separated strings for testing.",
      "Return true if duplicate values exist in the map."
    ],
    examples: [
      { input: "keys = \"A,B,C\", values = \"X,Y,X\"", output: "true" },
      { input: "keys = \"A,B,C\", values = \"X,Y,Z\"", output: "false" }
    ],
    type: "string_return",
    methodName: "checkMapRange",
    returnType: "boolean",
    starterCode: `import java.util.*;
class Solution {
    // Return true if any two keys map to the same value
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
      { input: { string: "A,B,C", args: ["\"X,Y,Z\""] }, expected: "false", visible: true },
      { input: { string: "apple,banana", args: ["\"fruit,fruit\""] }, expected: "true", visible: true },
      { input: { string: "one,two,three", args: ["\"1,2,3\""] }, expected: "false", visible: false }
    ]
  },
  {
    id: "java-exam-010",
    title: "Floor and Ceil of BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Binary Tree", "BST"],
    category: "exam",
    prompt: "Given a Binary Search Tree (BST) and a key, find the floor (largest node value &le; key) and ceil (smallest node value &ge; key) of the key. Return them as a space-separated string: <code>\"floor ceil\"</code>. Use <code>-1</code> if not found. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴",
      "Values in BST are non-negative."
    ],
    examples: [
      { input: "Tree: [8, 4, 12, 2, 6, 10, 14], key = 5", output: "4 6" },
      { input: "Tree: [8, 4, 12, 2, 6, 10, 14], key = 11", output: "10 12" }
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

    // Return floor and ceil space-separated: "floor ceil"
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
            if (curr.data == key) {
                floor = curr.data;
                break;
            } else if (curr.data < key) {
                floor = curr.data;
                curr = curr.right;
            } else {
                curr = curr.left;
            }
        }
        curr = root;
        while (curr != null) {
            if (curr.data == key) {
                ceil = curr.data;
                break;
            } else if (curr.data > key) {
                ceil = curr.data;
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        return floor + " " + ceil;
    }
}`,
    testCases: [
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [5] }, expected: "4 6", visible: true },
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [11] }, expected: "10 12", visible: true },
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [1] }, expected: "-1 2", visible: true },
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [15] }, expected: "14 -1", visible: false }
    ]
  },

  {
    id: "java-exam-011",
    title: "Validate BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Binary Tree", "BST", "Validation"],
    category: "exam",
    prompt: "Given a binary tree, check if it is a valid Binary Search Tree (BST). <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴"
    ],
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

    // Return true if the tree is a valid BST
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
      { input: { tree: [10, 5, 15, null, null, 6, 20], args: [] }, expected: "false", visible: true },
      { input: { tree: [2, 1, 3], args: [] }, expected: "true", visible: true },
      { input: { tree: [1, 2, 3], args: [] }, expected: "false", visible: false }
    ]
  },

  {
    id: "java-exam-012",
    title: "Count Set Bits",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Bit Manipulation", "Math"],
    category: "exam",
    prompt: "Given an integer <code>n</code>, count and return the number of set bits (1s) in its binary representation. <br/><br/><strong>Bitwise Operations:</strong> You should use bitwise operators (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) to solve this problem. These operations are extremely fast and require $O(1)$ auxiliary space.",
    constraints: [
      "0 ≤ n ≤ 10⁹"
    ],
    examples: [
      { input: "n = 6", output: "2" },
      { input: "n = 15", output: "4" }
    ],
    type: "array_return",
    methodName: "countSetBits",
    returnType: "int",
    starterCode: `class Solution {
    // Return count of set bits (1s) in binary representation of n
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
      { input: { array: [], args: [15] }, expected: "4", visible: true },
      { input: { array: [], args: [0] }, expected: "0", visible: true },
      { input: { array: [], args: [1023] }, expected: "10", visible: false }
    ]
  },

  {
    id: "java-exam-013",
    title: "Code Compiler Output (Balanced Bracket)",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    category: "exam",
    prompt: "Given a string containing parentheses <code>()</code>, <code>{}</code>, and <code>[]</code>, return <code>\"Success\"</code> if they are balanced, and <code>\"Error\"</code> otherwise. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "0 ≤ string length ≤ 10⁴"
    ],
    examples: [
      { input: "s = \"({[]})\"", output: "Success" },
      { input: "s = \"([)]\"", output: "Error" }
    ],
    type: "string_return",
    methodName: "checkCompilerOutput",
    returnType: "String",
    starterCode: `class Solution {
    // Return "Success" if balanced, else "Error"
    static String checkCompilerOutput(String s) {
        // Write your code here
        return "Error";
    }
}`,
    solutionCode: `class Solution {
    static String checkCompilerOutput(String s) {
        java.util.Deque<Character> stack = new java.util.ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else if (c == ')' || c == '}' || c == ']') {
                if (stack.isEmpty()) return "Error";
                char top = stack.pop();
                if ((c == ')' && top != '(') || (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return "Error";
            }
        }
        return stack.isEmpty() ? "Success" : "Error";
    }
}`,
    testCases: [
      { input: { string: "({[]})", args: [] }, expected: "Success", visible: true },
      { input: { string: "([)]", args: [] }, expected: "Error", visible: true },
      { input: { string: "", args: [] }, expected: "Success", visible: true },
      { input: { string: "(((", args: [] }, expected: "Error", visible: false }
    ]
  },

  {
    id: "java-exam-014",
    title: "OOPs - Family Members",
    section: "OOPs",
    difficulty: "Medium",
    tags: ["OOPs", "Inheritance"],
    category: "exam",
    prompt: "Build an inheritance hierarchy representing family members. Implement a base class <code>FamilyMember</code> with fields <code>name</code> and <code>age</code>, and a method <code>getRole()</code>. Implement subclasses <code>Father</code>, <code>Mother</code>, and <code>Child</code> (which also has a <code>school</code> field) extending <code>FamilyMember</code>. <br/><br/><strong>OOP Design Principle:</strong> Implement the class structure, methods, constructors, and instance variables exactly as defined. Utilize encapsulation, correct access modifiers, and clear object interactions.",
    constraints: [
      "Ensure Father's role is 'Father', Mother's is 'Mother', Child's is 'Child'."
    ],
    examples: [
      { input: "Father: John(45), Mother: Jane(42), Child: Billy(10, HighSchool)", output: "John(Father,45) & Jane(Mother,42) & Billy(Child,10,HighSchool)" }
    ],
    type: "string_return",
    methodName: "testFamily",
    returnType: "String",
    starterCode: `class Solution {
    static class FamilyMember {
        String name;
        int age;
        FamilyMember(String name, int age) {
            this.name = name;
            this.age = age;
        }
        String getRole() { return "Member"; }
    }

    static class Father extends FamilyMember {
        Father(String name, int age) { super(name, age); }
        // Implement getRole
    }

    static class Mother extends FamilyMember {
        Mother(String name, int age) { super(name, age); }
        // Implement getRole
    }

    static class Child extends FamilyMember {
        String school;
        Child(String name, int age, String school) {
            super(name, age);
            this.school = school;
        }
        // Implement getRole
    }

    static String testFamily(String fatherName, int fatherAge, String motherName, int motherAge, String childName, int childAge, String school) {
        // Write driver test code to instantiate and return formatted string
        return "";
    }
}`,
    solutionCode: `class Solution {
    static class FamilyMember {
        String name;
        int age;
        FamilyMember(String name, int age) {
            this.name = name;
            this.age = age;
        }
        String getRole() { return "Member"; }
    }

    static class Father extends FamilyMember {
        Father(String name, int age) { super(name, age); }
        @Override String getRole() { return "Father"; }
    }

    static class Mother extends FamilyMember {
        Mother(String name, int age) { super(name, age); }
        @Override String getRole() { return "Mother"; }
    }

    static class Child extends FamilyMember {
        String school;
        Child(String name, int age, String school) {
            super(name, age);
            this.school = school;
        }
        @Override String getRole() { return "Child"; }
    }

    static String testFamily(String fatherName, int fatherAge, String motherName, int motherAge, String childName, int childAge, String school) {
        FamilyMember f = new Father(fatherName, fatherAge);
        FamilyMember m = new Mother(motherName, motherAge);
        Child c = new Child(childName, childAge, school);
        return f.name + "(" + f.getRole() + "," + f.age + ") & " + 
               m.name + "(" + m.getRole() + "," + m.age + ") & " + 
               c.name + "(" + c.getRole() + "," + c.age + "," + c.school + ")";
    }
}`,
    testCases: [
      { input: { string: "John", args: [45, "\"Jane\"", 42, "\"Billy\"", 10, "\"HighSchool\""] }, expected: "John(Father,45) & Jane(Mother,42) & Billy(Child,10,HighSchool)", visible: true },
      { input: { string: "Bob", args: [50, "\"Alice\"", 48, "\"Charlie\"", 15, "\"MiddleSchool\""] }, expected: "Bob(Father,50) & Alice(Mother,48) & Charlie(Child,15,MiddleSchool)", visible: true }
    ]
  },

  {
    id: "java-exam-015",
    title: "OOPs - Library and Books",
    section: "OOPs",
    difficulty: "Medium",
    tags: ["OOPs", "Classes"],
    category: "exam",
    prompt: "Create a class <code>Book</code> with <code>title</code>, <code>author</code>, and <code>isbn</code>. Create a class <code>Library</code> containing a list of <code>Book</code>s. Implement methods: <code>addBook(Book book)</code>, <code>removeBook(String isbn)</code> (returns <code>boolean</code>), and <code>getBookCount()</code>. <br/><br/><strong>OOP Design Principle:</strong> Implement the class structure, methods, constructors, and instance variables exactly as defined. Utilize encapsulation, correct access modifiers, and clear object interactions.",
    constraints: [
      "Book isbn must be unique in library checks."
    ],
    examples: [
      { input: "Add Book1, Book2, remove Book1", output: "2 -> true -> 1" }
    ],
    type: "string_return",
    methodName: "testLibrary",
    returnType: "String",
    starterCode: `class Solution {
    static class Book {
        String title, author, isbn;
        Book(String t, String a, String i) {
            title = t; author = a; isbn = i;
        }
    }

    static class Library {
        // Implement Library with addBook, removeBook, and getBookCount
    }

    static String testLibrary(String b1Title, String b1Author, String b1Isbn, String b2Title, String b2Author, String b2Isbn, String removeIsbn) {
        // Driver to test your Library
        return "";
    }
}`,
    solutionCode: `class Solution {
    static class Book {
        String title, author, isbn;
        Book(String t, String a, String i) {
            title = t; author = a; isbn = i;
        }
    }

    static class Library {
        private java.util.List<Book> books = new java.util.ArrayList<>();
        void addBook(Book b) { books.add(b); }
        boolean removeBook(String isbn) {
            for (int i = 0; i < books.size(); i++) {
                if (books.get(i).isbn.equals(isbn)) {
                    books.remove(i);
                    return true;
                }
            }
            return false;
        }
        int getBookCount() { return books.size(); }
    }

    static String testLibrary(String b1Title, String b1Author, String b1Isbn, String b2Title, String b2Author, String b2Isbn, String removeIsbn) {
        Library lib = new Library();
        lib.addBook(new Book(b1Title, b1Author, b1Isbn));
        lib.addBook(new Book(b2Title, b2Author, b2Isbn));
        int countBefore = lib.getBookCount();
        boolean removed = lib.removeBook(removeIsbn);
        int countAfter = lib.getBookCount();
        return countBefore + " -> " + removed + " -> " + countAfter;
    }
}`,
    testCases: [
      { input: { string: "Book One", args: ["\"Author A\"", "\"1234\"", "\"Book Two\"", "\"Author B\"", "\"5678\"", "\"1234\""] }, expected: "2 -> true -> 1", visible: true },
      { input: { string: "Hacking", args: ["\"Mitnick\"", "\"007\"", "\"Coding\"", "\"Stroustrup\"", "\"1337\"", "\"999\""] }, expected: "2 -> false -> 2", visible: true }
    ]
  },

  {
    id: "java-exam-016",
    title: "OOPs - Security Gate Counter",
    section: "OOPs",
    difficulty: "Easy",
    tags: ["OOPs", "Class design"],
    category: "exam",
    prompt: "Create a <code>SecurityGate</code> class that keeps track of the number of people inside a building. Implement methods: <code>enter()</code> (increments counter), <code>exit()</code> (decrements counter but never below 0), and <code>getCount()</code>. <br/><br/><strong>OOP Design Principle:</strong> Implement the class structure, methods, constructors, and instance variables exactly as defined. Utilize encapsulation, correct access modifiers, and clear object interactions.",
    constraints: [
      "Counter must never become negative."
    ],
    examples: [
      { input: "enter, enter, exit", output: "1" }
    ],
    type: "string_return",
    methodName: "testGate",
    returnType: "int",
    starterCode: `class Solution {
    static class SecurityGate {
        // Implement enter, exit, and getCount
    }

    static int testGate(String ops) {
        SecurityGate gate = new SecurityGate();
        for (String op : ops.split(",")) {
            if (op.equals("enter")) gate.enter();
            else if (op.equals("exit")) gate.exit();
        }
        return gate.getCount();
    }
}`,
    solutionCode: `class Solution {
    static class SecurityGate {
        private int count = 0;
        void enter() { count++; }
        void exit() { if (count > 0) count--; }
        int getCount() { return count; }
    }

    static int testGate(String ops) {
        SecurityGate gate = new SecurityGate();
        for (String op : ops.split(",")) {
            if (op.equals("enter")) gate.enter();
            else if (op.equals("exit")) gate.exit();
        }
        return gate.getCount();
    }
}`,
    testCases: [
      { input: { string: "enter,enter,exit", args: [] }, expected: "1", visible: true },
      { input: { string: "exit,exit,enter,enter", args: [] }, expected: "2", visible: true },
      { input: { string: "enter,enter,enter,exit,exit,exit,exit", args: [] }, expected: "0", visible: false }
    ]
  },

  {
    id: "java-exam-017",
    title: "Max Element at Each Level",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Binary Tree", "BFS"],
    category: "exam",
    prompt: "Given a binary tree, find and return the maximum value at each level as space-separated values. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: [
      "1 ≤ number of nodes ≤ 10⁴"
    ],
    examples: [
      { input: "Tree: [1, 5, 3, 9, 2, 8]", output: "1 5 9" }
    ],
    type: "binary_tree",
    methodName: "maxAtEachLevel",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }

    static String maxAtEachLevel(Node root) {
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

    static String maxAtEachLevel(Node root) {
        if (root == null) return "";
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            int size = q.size(), max = Integer.MIN_VALUE;
            for (int i = 0; i < size; i++) {
                Node n = q.poll();
                max = Math.max(max, n.data);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            if (sb.length() > 0) sb.append(" ");
            sb.append(max);
        }
        return sb.toString();
    }
}`,
    testCases: [
      { input: { tree: [1, 5, 3, 9, 2, 8], args: [] }, expected: "1 5 9", visible: true },
      { input: { tree: [10], args: [] }, expected: "10", visible: true }
    ]
  },

  {
    id: "java-exam-018",
    title: "OOPs - Shape Area Interface",
    section: "OOPs",
    difficulty: "Easy",
    tags: ["OOPs", "Interface"],
    category: "exam",
    prompt: "Implement an interface <code>Shape</code> with a method <code>double area()</code>. Create a class <code>Circle</code> that implements <code>Shape</code> and has a constructor taking a radius. Let the output area be formatted to 2 decimal places. <br/><br/><strong>OOP Design Principle:</strong> Implement the class structure, methods, constructors, and instance variables exactly as defined. Utilize encapsulation, correct access modifiers, and clear object interactions.",
    constraints: [
      "Use Math.PI for accurate circle area."
    ],
    examples: [
      { input: "r = 5.0", output: "78.54" }
    ],
    type: "array_return",
    methodName: "testCircleArea",
    returnType: "String",
    starterCode: `class Solution {
    interface Shape {
        double area();
    }

    static class Circle implements Shape {
        // Implement constructor and area method
    }

    static String testCircleArea(double radius) {
        Circle c = new Circle(radius);
        return String.format(Locale.US, "%.2f", c.area());
    }
}`,
    solutionCode: `class Solution {
    interface Shape {
        double area();
    }

    static class Circle implements Shape {
        private double radius;
        Circle(double r) { radius = r; }
        public double area() { return Math.PI * radius * radius; }
    }

    static String testCircleArea(double radius) {
        Circle c = new Circle(radius);
        return String.format(java.util.Locale.US, "%.2f", c.area());
    }
}`,
    testCases: [
      { input: { array: [], args: [5.0] }, expected: "78.54", visible: true },
      { input: { array: [], args: [1.0] }, expected: "3.14", visible: true },
      { input: { array: [], args: [0.0] }, expected: "0.00", visible: false }
    ]
  },

  {
    id: "java-exam-019",
    title: "Balanced Parentheses (Boolean Return)",
    section: "Stacks & Queues",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    category: "exam",
    prompt: "Check if a string containing parentheses <code>()</code>, <code>{}</code>, and <code>[]</code> is balanced. Return <code>true</code> if balanced, and <code>false</code> otherwise. <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
    constraints: [
      "0 ≤ string length ≤ 10⁴"
    ],
    examples: [
      { input: "s = \"({[]})\"", output: "true" }
    ],
    type: "string_return",
    methodName: "isBalanced",
    returnType: "boolean",
    starterCode: `class Solution {
    // Return true if balanced, else false
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
    prompt: "Given the root of a Binary Search Tree (BST) and an integer <code>k</code>, find and return the data value of the <code>k</code>th smallest element. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Given a level-order traversal array of a Binary Search Tree, construct the BST and return the root node. The tree node wrapper prints it inorder. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Given a Binary Search Tree (BST) and two nodes <code>p</code> and <code>q</code>, find the lowest common ancestor (LCA) of p and q. Return its data. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Construct a binary tree from a level order array containing missing elements (represented as <code>null</code>). Inorder traversal of the tree is printed for verification. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Print the level order traversal (space-separated) of a binary tree. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Find and return all node values at odd levels (1-indexed, root is level 1) of a binary tree as a space-separated string. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Implement iterative inorder traversal of a binary tree using a stack. Return space-separated values. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Count and return the number of leaf and non-leaf nodes in a binary tree as a string formatted as <code>\"leaf_count non_leaf_count\"</code>. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Convert a binary tree into its mirror image (in-place swap of left and right children). <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
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
    prompt: "Given a singly linked list, check if it is circular (i.e. the next pointer of the last node points back to the head node). Return <code>true</code> if so, <code>false</code> otherwise. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
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
    prompt: "Given a queue of integers, duplicate each element (e.g. queue <code>[1, 2, 3]</code> becomes <code>[1, 1, 2, 2, 3, 3]</code>). <br/><br/><strong>Queue Properties:</strong> A Queue follows the First-In-First-Out (FIFO) principle. Use standard queue methods like enqueue (offer/add) and dequeue (poll/remove) to solve the problem.",
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
    prompt: "Determine if a number is a Happy Number. A happy number is defined by a process where you replace the number by the sum of the squares of its digits, repeating until the number equals 1, or it loops endlessly in a cycle which does not include 1. <br/><br/><strong>Java Collections Framework:</strong> Solve this problem by utilizing Java's built-in collections such as <code>Queue</code>, <code>Stack</code>, <code>ArrayList</code>, <code>HashMap</code>, or <code>HashSet</code>. Consider the time complexity of operations like search, insertion, and deletion.",
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
  },

  {
    id: "java-tp-bst-001",
    title: "Check if Binary Tree is BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["BST", "Tree"],
    category: "testpad",
    prompt: "Check if a given binary tree is a Binary Search Tree (BST). <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: ["1 ≤ number of nodes ≤ 10⁴"],
    examples: [{ input: "Tree: [2, 1, 3]", output: "true" }],
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
    static boolean isBSTUtil(Node node, long min, long max) {
        if (node == null) return true;
        if (node.data <= min || node.data >= max) return false;
        return isBSTUtil(node.left, min, node.data) && isBSTUtil(node.right, node.data, max);
    }
}`,
    testCases: [
      { input: { tree: [2, 1, 3], args: [] }, expected: "true", visible: true },
      { input: { tree: [1, 2, 3], args: [] }, expected: "false", visible: true }
    ]
  },
  {
    id: "java-tp-bst-005",
    title: "Find Floor and Ceil in BST",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["BST", "Tree"],
    category: "testpad",
    prompt: "Find the floor and ceil of a key in a Binary Search Tree (BST). Return as <code>\"floor ceil\"</code>. If not found, use -1. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: ["1 ≤ number of nodes ≤ 10⁴"],
    examples: [{ input: "Tree: [8, 4, 12], key = 5", output: "4 8" }],
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
            if (curr.data == key) { floor = ceil = curr.data; break; }
            if (curr.data > key) { ceil = curr.data; curr = curr.left; }
            else { floor = curr.data; curr = curr.right; }
        }
        return floor + " " + ceil;
    }
}`,
    testCases: [
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [5] }, expected: "4 6", visible: true },
      { input: { tree: [8, 4, 12, 2, 6, 10, 14], args: [11] }, expected: "10 12", visible: true }
    ]
  },
  {
    id: "java-tp-bt-008",
    title: "Print All Paths to Leaves",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "DFS"],
    category: "testpad",
    prompt: "Print all paths from root to leaf nodes in a binary tree. Each path should be on a new line (use space-separated values for nodes in a path). <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: ["1 ≤ number of nodes ≤ 10⁴"],
    examples: [{ input: "Tree: [1, 2, 3]", output: "1 2\n1 3" }],
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
        StringBuilder sb = new StringBuilder();
        findPaths(root, "", sb);
        return sb.toString().trim();
    }
    static void findPaths(Node node, String path, StringBuilder sb) {
        if (node == null) return;
        path += (path.isEmpty() ? "" : " ") + node.data;
        if (node.left == null && node.right == null) {
            sb.append(path).append("\n");
            return;
        }
        findPaths(node.left, path, sb);
        findPaths(node.right, path, sb);
    }
}`,
    testCases: [
      { input: { tree: [1, 2, 3, 4, 5], args: [] }, expected: "1 2 4\n1 2 5\n1 3", visible: true }
    ]
  },
  {
    id: "java-tp-bt-009",
    title: "Find Right Node of a Given Node",
    section: "Binary Trees",
    difficulty: "Medium",
    tags: ["Tree", "BFS"],
    category: "testpad",
    prompt: "Find the right sibling (node at the same level to the immediate right) of a given node in a binary tree. Return its data, or -1 if no right sibling exists. <br/><br/><strong>Tree Representation:</strong> The input tree is passed to your method as a <code>Node</code> object representing the root. In the test cases, tree structures are represented as an array in level-order traversal (e.g., <code>[1, 2, 3, null, 4]</code>, where <code>null</code> represents empty child positions). Make sure to handle the case where the root is <code>null</code>.",
    constraints: ["1 ≤ number of nodes ≤ 10⁴"],
    examples: [{ input: "Tree: [1, 2, 3], target = 2", output: "3" }],
    type: "binary_tree",
    methodName: "findRightNode",
    returnType: "int",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node left, right;
        Node(int d) { data = d; }
    }
    static int findRightNode(Node root, int target) {
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
    static int findRightNode(Node root, int target) {
        if (root == null) return -1;
        java.util.Queue<Node> q = new java.util.LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                Node curr = q.poll();
                if (curr.data == target) {
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
      { input: { tree: [1, 2, 3, 4, 5, 6, 7], args: [2] }, expected: "3", visible: true },
      { input: { tree: [1, 2, 3, 4, 5, 6, 7], args: [5] }, expected: "6", visible: true }
    ]
  },
  {
    id: "java-tp-cll-002",
    title: "Insert in Sorted Circular Linked List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Insert a node with given data into a sorted circular linked list such that the list remains sorted. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
    constraints: ["0 ≤ number of nodes ≤ 1000"],
    examples: [{ input: "List: [1, 4, 8], data = 5", output: "1 4 5 8" }],
    type: "singly_linked_list",
    methodName: "insertSorted",
    returnType: "Node",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static Node insertSorted(Node head, int data) {
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
    static Node insertSorted(Node head, int data) {
        Node newNode = new Node(data);
        if (head == null) {
            newNode.next = newNode;
            return newNode;
        }
        Node curr = head;
        while (curr.next != head && curr.next.data < data) {
            curr = curr.next;
        }
        if (curr.next == head && (data >= curr.data || data <= head.data)) {
            newNode.next = head;
            curr.next = newNode;
            return data < head.data ? newNode : head;
        }
        newNode.next = curr.next;
        curr.next = newNode;
        return head;
    }
}`,
    testCases: [
      { input: { list: [1, 4, 8], args: [5] }, expected: "1 4 5 8", visible: true }
    ]
  },
  {
    id: "java-tp-cll-003",
    title: "Split Circular Linked List",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Circular"],
    category: "testpad",
    prompt: "Split a circular linked list into two halves. If the list has an odd number of nodes, the first half should have the extra node. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
    constraints: ["2 ≤ number of nodes ≤ 1000"],
    examples: [{ input: "List: [1, 2, 3, 4]", output: "1 2, 3 4" }],
    type: "singly_linked_list",
    methodName: "splitList",
    returnType: "String",
    starterCode: `class Solution {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }
    static String splitList(Node head) {
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
    static String splitList(Node head) {
        if (head == null) return "";
        Node slow = head, fast = head;
        while (fast.next != head && fast.next.next != head) {
            slow = slow.next;
            fast = fast.next.next;
        }
        if (fast.next.next == head) fast = fast.next;
        Node head2 = slow.next;
        fast.next = head2;
        slow.next = head;
        return listToString(head) + ", " + listToString(head2);
    }
    static String listToString(Node h) {
        StringBuilder sb = new StringBuilder();
        Node curr = h;
        do {
            if (sb.length() > 0) sb.append(" ");
            sb.append(curr.data);
            curr = curr.next;
        } while (curr != h);
        return sb.toString();
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4], args: [] }, expected: "1 2, 3 4", visible: true },
      { input: { list: [1, 2, 3, 4, 5], args: [] }, expected: "1 2 3, 4 5", visible: true }
    ]
  },
  {
    id: "java-tp-dll-001",
    title: "Swap Two Nodes of DLL",
    section: "Linked Lists",
    difficulty: "Medium",
    tags: ["Linked List", "Doubly Linked List"],
    category: "testpad",
    prompt: "Swap two nodes at given positions (1-indexed) in a doubly linked list by changing links. <br/><br/><strong>List Representation:</strong> The input is represented as a sequence of linked list nodes. The custom Node structure has <code>data</code> (int) and pointer fields like <code>next</code> (and <code>prev</code> for doubly linked lists). You should modify node pointers directly to update the list structure.",
    constraints: ["2 ≤ number of nodes ≤ 1000"],
    examples: [{ input: "List: [1, 2, 3, 4], p1=2, p2=4", output: "1 4 3 2" }],
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
        if (p1 == p2) return head;
        if (p1 > p2) { int tmp = p1; p1 = p2; p2 = tmp; }
        Node node1 = head, node2 = head;
        for (int i = 1; i < p1; i++) node1 = node1.next;
        for (int i = 1; i < p2; i++) node2 = node2.next;
        
        Node prev1 = node1.prev, next1 = node1.next;
        Node prev2 = node2.prev, next2 = node2.next;

        if (node1.next == node2) {
            node1.next = next2;
            if (next2 != null) next2.prev = node1;
            node2.prev = prev1;
            if (prev1 != null) prev1.next = node2;
            node2.next = node1;
            node1.prev = node2;
        } else {
            if (prev1 != null) prev1.next = node2;
            if (next1 != null) next1.prev = node2;
            if (prev2 != null) prev2.next = node1;
            if (next2 != null) next2.prev = node1;
            node1.next = next2; node1.prev = prev2;
            node2.next = next1; node2.prev = prev1;
        }
        return (p1 == 1) ? node2 : head;
    }
}`,
    testCases: [
      { input: { list: [1, 2, 3, 4], args: [2, 4] }, expected: "1 4 3 2", visible: true }
    ]
  },
  {
    id: "java-tp-bm-001",
    title: "Count Set Bits",
    section: "Bit Manipulation",
    difficulty: "Easy",
    tags: ["Bit Manipulation"],
    category: "testpad",
    prompt: "Count the number of set bits (1s) in the binary representation of a positive integer. <br/><br/><strong>Bitwise Operations:</strong> Solve this problem using bitwise operators like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, and <code>&gt;&gt;</code>. These operators work directly on the binary representation of integers.",
    constraints: ["0 ≤ n ≤ 10^9"],
    examples: [{ input: "n = 6 (110)", output: "2" }],
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
            n &= (n - 1);
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
    id: "java-tp-rec-001",
    title: "Factorial using Recursion",
    section: "Recursion",
    difficulty: "Easy",
    tags: ["Recursion"],
    category: "testpad",
    prompt: "Calculate the factorial of a non-negative integer <code>n</code> using recursion. <br/><br/><strong>Recursion:</strong> Solve this problem by breaking it down into smaller subproblems of the same type. Ensure you define a clear base case to prevent infinite recursion and stack overflow errors.",
    constraints: ["0 ≤ n ≤ 12"],
    examples: [{ input: "n = 5", output: "120" }],
    type: "array_return",
    methodName: "factorial",
    returnType: "long",
    starterCode: `class Solution {
    static long factorial(int n) {
        // Write your code here
        return 1;
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
  }
];

// Section metadata for sidebar grouping
const JAVA_SECTIONS = [
  { id: "Linked Lists", icon: "", color: "#5F7AE0" },
  { id: "Binary Trees", icon: "", color: "#2F8F5E" },
  { id: "Stacks & Queues", icon: "", color: "#E07A5F" },
  { id: "Hashing", icon: "", color: "#8A5F9E" },
  { id: "Recursion & Bits", icon: "", color: "#B58A3D" },
  { id: "Queues", icon: "", color: "#E07A5F" },
  { id: "Math & GCD", icon: "", color: "#B58A3D" },
  { id: "Bit Manipulation", icon: "", color: "#3D405B" },
  { id: "Recursion", icon: "", color: "#8A5F9E" },
  { id: "Arrays", icon: "", color: "#5F7AE0" },
  { id: "Strings", icon: "", color: "#7A9FBF" },
  { id: "OOPs", icon: "", color: "#8A5F9E" }
];
