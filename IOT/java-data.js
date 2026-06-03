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
    prompt: "Left-rotate a singly linked list by <code>k</code> positions. Move the first <code>k</code> nodes to the tail of the list. If <code>k &gt;= n</code> (length of list), leave the list unchanged.",
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
    prompt: "Merge two sorted singly linked lists into a single sorted list. Do this by splicing together the nodes of the first two lists.",
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
    prompt: "Reverse a singly linked list iteratively in O(n) time and O(1) space. Return the new head.",
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
    prompt: "Given a binary tree, find and print the maximum value at each level. Output space-separated values, one per level from root to leaves.",
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
    prompt: "Check if a string containing <code>()</code>, <code>{}</code>, and <code>[]</code> has balanced brackets. Return <code>true</code> if balanced, <code>false</code> otherwise.",
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
    prompt: "Evaluate a prefix (Polish notation) expression. Each character is either a single digit (0-9) or an operator (+, -, *, /). Scan from right to left using a stack. Return the result as a <code>long</code>.",
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
    prompt: "Given a string of only <code>{</code> and <code>}</code>, find the minimum number of bracket reversals needed to make the expression balanced. Return <code>-1</code> if it's not possible (odd length).",
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
    prompt: "For each building height in an array, find the next strictly taller building to the right. Sum all such next-greater values. If no taller building exists to the right, use <code>-1</code> for that position.",
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
    prompt: "Reverse a given string using a stack. Push all characters onto a stack, then pop them off to build the reversed string.",
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
    prompt: "An array contains numbers from 1 to N with exactly one number missing. Find the missing number using XOR. The array has <code>N-1</code> elements.",
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
    prompt: "Calculate <code>base^exp</code> using recursive fast exponentiation. Both base and exponent are non-negative integers.",
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
    prompt: "Count the number of set bits (1s) in the binary representation of a given non-negative integer using Brian Kernighan's algorithm.",
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
    prompt: "Check if the k-th bit (1-indexed from the right) is set in the number <code>n</code>. Return <code>1</code> if set, <code>0</code> otherwise.",
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
    prompt: "Implement the recurrence relation <code>T(n) = T(n-1) + 2*n</code> with base case <code>T(0) = 1</code>. Return the value of <code>T(n)</code>.",
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
    prompt: "In an array where every element appears exactly twice except one, find the element that appears exactly once. Use XOR.",
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
  }

];

// Section metadata for sidebar grouping
const JAVA_SECTIONS = [
  { id: "Linked Lists", icon: "🔗", color: "#5F7AE0" },
  { id: "Binary Trees", icon: "🌳", color: "#2F8F5E" },
  { id: "Stacks & Queues", icon: "📚", color: "#E07A5F" },
  { id: "Hashing", icon: "#️⃣", color: "#8A5F9E" },
  { id: "Recursion & Bits", icon: "🔁", color: "#B58A3D" }
];
