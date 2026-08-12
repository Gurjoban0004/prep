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
    prompt: "Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is greater than or equal to <code>target</code>. If there is no such subarray, return <code>0</code> instead.",
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
    prompt: "Write a function that checks if a <code>Map&lt;String, String&gt;</code> contains any two distinct keys mapping to the same value (range). Return <code>true</code> if so, <code>false</code> otherwise.",
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
    prompt: "Given a Binary Search Tree (BST) and a key, find the floor (largest node value &le; key) and ceil (smallest node value &ge; key) of the key. Return them as a space-separated string: <code>\"floor ceil\"</code>. Use <code>-1</code> if not found.",
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
    prompt: "Given a binary tree, check if it is a valid Binary Search Tree (BST).",
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
    prompt: "Given an integer <code>n</code>, count and return the number of set bits (1s) in its binary representation.",
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
    prompt: "Given a string containing parentheses <code>()</code>, <code>{}</code>, and <code>[]</code>, return <code>\"Success\"</code> if they are balanced, and <code>\"Error\"</code> otherwise.",
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
    prompt: "Build an inheritance hierarchy representing family members. Implement a base class <code>FamilyMember</code> with fields <code>name</code> and <code>age</code>, and a method <code>getRole()</code>. Implement subclasses <code>Father</code>, <code>Mother</code>, and <code>Child</code> (which also has a <code>school</code> field) extending <code>FamilyMember</code>.",
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
    prompt: "Create a class <code>Book</code> with <code>title</code>, <code>author</code>, and <code>isbn</code>. Create a class <code>Library</code> containing a list of <code>Book</code>s. Implement methods: <code>addBook(Book book)</code>, <code>removeBook(String isbn)</code> (returns <code>boolean</code>), and <code>getBookCount()</code>.",
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
    prompt: "Create a <code>SecurityGate</code> class that keeps track of the number of people inside a building. Implement methods: <code>enter()</code> (increments counter), <code>exit()</code> (decrements counter but never below 0), and <code>getCount()</code>.",
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
    prompt: "Given a binary tree, find and return the maximum value at each level as space-separated values.",
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
    prompt: "Implement an interface <code>Shape</code> with a method <code>double area()</code>. Create a class <code>Circle</code> that implements <code>Shape</code> and has a constructor taking a radius. Let the output area be formatted to 2 decimal places.",
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
    prompt: "Check if a string containing parentheses <code>()</code>, <code>{}</code>, and <code>[]</code> is balanced. Return <code>true</code> if balanced, and <code>false</code> otherwise.",
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
  }
