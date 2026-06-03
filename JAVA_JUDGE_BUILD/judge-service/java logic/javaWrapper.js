/**
 * Parse function signature to extract parameters
 * Example: "solve(nums, target)" => ["nums", "target"]
 */
function parseParameters(functionSignature) {
    const match = functionSignature.match(/\((.*?)\)/);
    if (!match) return [];

    const paramsStr = match[1].trim();
    if (!paramsStr) return [];

    return paramsStr.split(',').map(p => p.trim());
}

/**
 * Parse parameter types from Java method signature
 * Example: "public int solve(int[] nums, int target)" => ["int[]", "int"]
 */
function parseParameterTypes(javaMethodSignature) {
    const match = javaMethodSignature.match(/\((.*?)\)/);
    if (!match || !match[1].trim()) return [];

    const paramsStr = match[1].trim();
    const params = paramsStr.split(',').map(p => p.trim());

    // Extract just the type from each parameter (e.g., "int[] nums" => "int[]")
    return params.map(param => {
        const parts = param.trim().split(/\s+/);
        return parts.slice(0, -1).join(' '); // Everything except the last part (variable name)
    });
}

/**
 * Parse return type from Java method signature
 * Example: "public ListNode solve(ListNode head)" => "ListNode"
 */
function parseReturnType(javaMethodSignature) {
    // Match pattern: public <returnType> methodName(...)
    const match = javaMethodSignature.match(/public\s+(\S+)\s+\w+\s*\(/);
    return match ? match[1] : null;
}

/**
 * Generate method invocation code based on parameter count
 * Parses and casts parameters to correct types from method signature
 */
function generateMethodInvocation(paramCount, paramTypes, javaMethodSignature) {
    // Helper to generate robust parameter parsing code
    const generateParamCode = (index, type, sourceVar) => {
        const paramName = `param${index}`;

        // Handle ListNode
        if (type === 'ListNode') {
            return `
        ListNode ${paramName} = arrayToList((int[]) ${sourceVar});`;
        }

        // Handle TreeNode
        if (type === 'TreeNode') {
            return `
        TreeNode ${paramName} = arrayToTree((Integer[]) ${sourceVar});`;
        }

        // Handle int[] with robust parsing (fix for [1,2,3] string input)
        // Normalize type to handle "int []" vs "int[]"
        const normalizedType = type.replace(/\s+/g, '');
        if (normalizedType === 'int[]') {
            return `
        // Check if input is a String instead of int[] (common user error in CSV)
        if (${sourceVar} instanceof String) {
            try {
                // Wrap in brackets and parse again
                ${sourceVar} = parseArray("[" + ${sourceVar} + "]");
            } catch (Exception e) {
                // If we can't parse it as an array, explicitly fail here to give a better error message
                throw new RuntimeException("Failed to cast input to " + "${type}" + ". Input was: " + ${sourceVar} + ". Error: " + e.getMessage());
            }
        }
        ${type} ${paramName} = (${type}) ${sourceVar};`;
        }

        // Default cast
        return `
        ${type} ${paramName} = (${type}) ${sourceVar};`;
    };

    if (paramCount === 0) {
        return `
        Object result = solution.solve();
        return resultToString(result);
    `.trim();
    } else if (paramCount === 1) {
        const type0 = paramTypes[0] || 'Object';
        const param0Code = generateParamCode(0, type0, 'param0Raw');

        return `
        Object param0Raw = parseValue(content);
        ${param0Code.trim()}
        
        Object result = solution.solve(param0);
        return resultToStringWithType(result, "${parseReturnType(javaMethodSignature) || 'Object'}");
    `.trim();
    } else if (paramCount === 2) {
        const type0 = paramTypes[0] || 'Object';
        const type1 = paramTypes[1] || 'Object';

        // For array params in parsing, we need to handle potential type mismatches
        // The parsing logic in generateHelperMethods handles int[] vs Integer[] vs String[],
        // but robust type fixing happens here.

        // Note: parseParameters returns Object[], so we access elements

        return `
        Object[] paramsRaw = parseParameters(content, 2);
        Object param0Raw = paramsRaw[0];
        Object param1Raw = paramsRaw[1];
        
        ${generateParamCode(0, type0, 'param0Raw').trim()}
        ${generateParamCode(1, type1, 'param1Raw').trim()}
        
        Object result = solution.solve(param0, param1);
        return resultToStringWithType(result, "${parseReturnType(javaMethodSignature) || 'Object'}");
    `.trim();
    } else if (paramCount === 3) {
        const type0 = paramTypes[0] || 'Object';
        const type1 = paramTypes[1] || 'Object';
        const type2 = paramTypes[2] || 'Object';

        return `
        Object[] paramsRaw = parseParameters(content, 3);
        Object param0Raw = paramsRaw[0];
        Object param1Raw = paramsRaw[1];
        Object param2Raw = paramsRaw[2];
        
        ${generateParamCode(0, type0, 'param0Raw').trim()}
        ${generateParamCode(1, type1, 'param1Raw').trim()}
        ${generateParamCode(2, type2, 'param2Raw').trim()}
        
        Object result = solution.solve(param0, param1, param2);
        return resultToStringWithType(result, "${parseReturnType(javaMethodSignature) || 'Object'}");
    `.trim();
    } else {
        return `
        throw new UnsupportedOperationException("Methods with more than 3 parameters not yet supported");
    `.trim();
    }
}

/**
 * Generate helper methods for JSON parsing and type conversion
 */
function generateHelperMethods() {
    return `
    // Helper methods for parsing
    private static String[] extractTestCases(String json) {
        json = json.trim();
        if (json.startsWith("[")) json = json.substring(1);
        if (json.endsWith("]")) json = json.substring(0, json.length() - 1);
        
        List<String> cases = new ArrayList<>();
        int depth = 0;
        StringBuilder current = new StringBuilder();
        
        for (int i = 0; i < json.length(); i++) {
            char c = json.charAt(i);
            if (c == '{') depth++;
            else if (c == '}') depth--;
            
            if (c == ',' && depth == 0) {
                cases.add(current.toString());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        if (current.length() > 0) {
            cases.add(current.toString());
        }
        
        return cases.toArray(new String[0]);
    }
    
    private static int extractInt(String json, String key) {
        String search = "\\"" + key + "\\":";
        int start = json.indexOf(search);
        if (start == -1) return -1;
        start += search.length();
        
        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\\n')) start++;
        
        int end = start;
        while (end < json.length() && Character.isDigit(json.charAt(end))) end++;
        
        return Integer.parseInt(json.substring(start, end));
    }
    
    private static String extractString(String json, String key) {
        String search = "\\"" + key + "\\":\\"";
        int start = json.indexOf(search);
        if (start == -1) return "";
        start += search.length();
        
        // Handle escaped quotes
        int end = start;
        while (end < json.length()) {
            if (json.charAt(end) == '"' && (end == 0 || json.charAt(end - 1) != '\\\\')) {
                break;
            }
            end++;
        }
        
        return json.substring(start, end);
    }
    
    private static Object[] parseParameters(String content, int expectedCount) throws Exception {
        List<Object> params = new ArrayList<>();
        int depth = 0;
        StringBuilder current = new StringBuilder();
        
        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);
            
            if (c == '[') depth++;
            else if (c == ']') depth--;
            
            if (c == ',' && depth == 0) {
                params.add(parseValue(current.toString().trim()));
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        if (current.length() > 0) {
            params.add(parseValue(current.toString().trim()));
        }
        
        return params.toArray(new Object[0]);
    }
    
    private static Object parseValue(String value) throws Exception {
        value = value.trim();
        
        // Array
        if (value.startsWith("[") && value.endsWith("]")) {
            return parseArray(value);
        }
        
        // String (quoted)
        if (value.startsWith("\\"") && value.endsWith("\\"")) {
            return value.substring(1, value.length() - 1);
        }
        
        // Boolean
        if (value.equals("true")) return true;
        if (value.equals("false")) return false;
        
        // Integer
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            // Not an integer, return as string
            return value;
        }
    }
    
    private static Object parseArray(String arrayStr) throws Exception {
        String content = arrayStr.substring(1, arrayStr.length() - 1).trim();
        if (content.isEmpty()) return new int[0];
        
        String[] elements = splitArray(content);
        
        // Determine array type from first element
        if (elements.length == 0) return new int[0];
        
        String first = elements[0].trim();
        
        // Nested array
        if (first.startsWith("[")) {
            // Parse elements first to determine type
            Object[] parsedElements = new Object[elements.length];
            boolean hasIntegerArray = false;
            
            for (int i = 0; i < elements.length; i++) {
                parsedElements[i] = parseArray(elements[i].trim());
                if (parsedElements[i] instanceof Integer[]) {
                    hasIntegerArray = true;
                }
            }
            
            if (hasIntegerArray) {
                Integer[][] result = new Integer[elements.length][];
                for (int i = 0; i < elements.length; i++) {
                    Object elem = parsedElements[i];
                    if (elem instanceof int[]) {
                        int[] primitive = (int[]) elem;
                        Integer[] wrapped = new Integer[primitive.length];
                        for (int k = 0; k < primitive.length; k++) wrapped[k] = primitive[k];
                        result[i] = wrapped;
                    } else {
                        result[i] = (Integer[]) elem;
                    }
                }
                return result;
            } else {
                int[][] result = new int[elements.length][];
                for (int i = 0; i < elements.length; i++) {
                    result[i] = (int[]) parsedElements[i];
                }
                return result;
            }
        }
        
        // String array
        if (first.startsWith("\\"")) {
            String[] result = new String[elements.length];
            for (int i = 0; i < elements.length; i++) {
                String el = elements[i].trim();
                result[i] = el.substring(1, el.length() - 1);
            }
            return result;
        }
        
        // Check for null values - if present, use Integer[] instead of int[]
        boolean hasNull = false;
        for (String el : elements) {
            if (el.trim().equals("null")) {
                hasNull = true;
                break;
            }
        }
        
        // If has null, return Integer[] for TreeNode support
        if (hasNull) {
            Integer[] result = new Integer[elements.length];
            for (int i = 0; i < elements.length; i++) {
                String el = elements[i].trim();
                result[i] = el.equals("null") ? null : Integer.parseInt(el);
            }
            return result;
        }
        
        // Standard int array (backward compatible)
        int[] result = new int[elements.length];
        for (int i = 0; i < elements.length; i++) {
            result[i] = Integer.parseInt(elements[i].trim());
        }
        return result;
    }
    
    private static String[] splitArray(String content) {
        List<String> elements = new ArrayList<>();
        int depth = 0;
        StringBuilder current = new StringBuilder();
        
        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);
            
            if (c == '[') depth++;
            else if (c == ']') depth--;
            
            if (c == ',' && depth == 0) {
                elements.add(current.toString());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        if (current.length() > 0) {
            elements.add(current.toString());
        }
        
        return elements.toArray(new String[0]);
    }
    
    
    private static String resultToStringWithType(Object result, String returnType) {
        // Special handling for null ListNode - treat as empty list
        if (result == null && "ListNode".equals(returnType)) {
            return "[]";
        }
        
        // Special handling for null TreeNode - treat as empty tree
        if (result == null && "TreeNode".equals(returnType)) {
            return "[]";
        }
        
        return resultToString(result);
    }
    
    private static String resultToString(Object result) {
        // Handle null - but check if we're expecting a ListNode return type
        // If solve returned null and it's a ListNode method, treat as empty list
        if (result == null) return "null";
        
        // NEW: Handle ListNode return type  
        if (result instanceof ListNode) {
            return Arrays.toString(listToArray((ListNode) result));
        }
        
        // NEW: Handle TreeNode return type
        if (result instanceof TreeNode) {
            return Arrays.toString(treeToArray((TreeNode) result));
        }
        
        // Existing logic unchanged
        if (result instanceof int[]) return Arrays.toString((int[]) result);
        if (result instanceof int[][]) {
            int[][] arr = (int[][]) result;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < arr.length; i++) {
                if (i > 0) sb.append(",");
                sb.append(Arrays.toString(arr[i]));
            }
            sb.append("]");
            return sb.toString();
        }
        if (result instanceof String[]) return Arrays.toString((String[]) result);
        if (result instanceof boolean[]) return Arrays.toString((boolean[]) result);
        return result.toString();
    }
    
    // ========== NEW: ListNode Support - Conversion Helpers ==========
    
    /**
     * Convert integer array to linked list
     */
    private static ListNode arrayToList(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        for (int val : arr) {
            current.next = new ListNode(val);
            current = current.next;
        }
        
        return dummy.next;
    }
    
    /**
     * Convert linked list to integer array
     */
    private static int[] listToArray(ListNode head) {
        // Count nodes
        int count = 0;
        ListNode curr = head;
        while (curr != null) {
            count++;
            curr = curr.next;
        }
        
        // Build array
        int[] arr = new int[count];
        curr = head;
        for (int i = 0; i < count; i++) {
            arr[i] = curr.val;
            curr = curr.next;
        }
        
        return arr;
    }
    
    // ========== End ListNode Support ==========
    
    // ========== NEW: TreeNode Support - Conversion Helpers ==========
    
    /**
     * Convert Integer array to binary tree (level-order)
     */
    private static TreeNode arrayToTree(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) return null;
        
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        int i = 1;
        while (i < arr.length) {
            TreeNode current = queue.poll();
            
            // Left child
            if (i < arr.length && arr[i] != null) {
                current.left = new TreeNode(arr[i]);
                queue.offer(current.left);
            }
            i++;
            
            // Right child
            if (i < arr.length && arr[i] != null) {
                current.right = new TreeNode(arr[i]);
                queue.offer(current.right);
            }
            i++;
        }
        
        return root;
    }
    
    /**
     * Safely convert Object (int[] or Integer[]) to Integer[]
     */
    private static Integer[] toIntegerArray(Object raw) {
        if (raw == null) return null;
        if (raw instanceof Integer[]) return (Integer[]) raw;
        if (raw instanceof int[]) {
            int[] primitive = (int[]) raw;
            Integer[] wrapped = new Integer[primitive.length];
            for (int i = 0; i < primitive.length; i++) wrapped[i] = primitive[i];
            return wrapped;
        }
        return new Integer[0];
    }

    /**
     * Convert binary tree to Integer array (level-order)
     */
    private static Integer[] treeToArray(TreeNode root) {
        if (root == null) return new Integer[0];
        
        List<Integer> result = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            
            if (node != null) {
                result.add(node.val);
                queue.offer(node.left);
                queue.offer(node.right);
            } else {
                result.add(null);
            }
        }
        
        // Remove trailing nulls
        while (!result.isEmpty() && result.get(result.size() - 1) == null) {
            result.remove(result.size() - 1);
        }
        
        return result.toArray(new Integer[0]);
    }
    
    // ========== End TreeNode Support ==========
    
    private static String normalize(String s) {
        // Remove spaces for consistent comparison
        return s.replaceAll("\\\\s+", "");
    }
  `.trim();
}

/**
 * Generate Java code wrapper template
 * This wraps the user's solve method inside a Solution class within Main
 * @param {string} userCode - User's Java code
 * @param {string} javaMethodSignature - Complete method signature (e.g., "public int solve(int[] nums)")
 */
function generateJavaWrapper(userCode, javaMethodSignature) {
    // Extract parameter types from signature
    const paramTypes = parseParameterTypes(javaMethodSignature);
    const paramCount = paramTypes.length;

    // Generate method invocation code with proper type casting
    const methodInvocation = generateMethodInvocation(paramCount, paramTypes, javaMethodSignature);
    const helperMethods = generateHelperMethods();

    const template = `
import java.util.*;

public class Main {
    // ListNode class for linked list problems
    static class ListNode {
        int val;
        ListNode next;
        
        ListNode(int val) {
            this.val = val;
            this.next = null;
        }
    }
    
    // TreeNode class for binary tree problems
    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        
        TreeNode(int val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    
    static class Solution {
        ${userCode}
    }
    
    public static void main(String[] args) {
        try {
            String testCasesJson = System.getenv("TEST_CASES");
            if (testCasesJson == null || testCasesJson.isEmpty()) {
                System.err.println("ERROR: TEST_CASES environment variable not set");
                System.exit(1);
            }
            
            // Basic JSON parsing without external libraries
            Solution solution = new Solution();
            
            // Parse test cases (simplified JSON parsing)
            String[] testCaseBlocks = extractTestCases(testCasesJson);
            
            for (String testCaseBlock : testCaseBlocks) {
                if (testCaseBlock.trim().isEmpty()) continue;
                
                int testId = extractInt(testCaseBlock, "test_id");
                String inputStr = extractString(testCaseBlock, "input");
                String expectedOutput = extractString(testCaseBlock, "expected_output");
                
                try {
                    // Execute test
                    String result = executeTest(solution, inputStr);
                    
                    // Compare
                    if (normalize(result).equals(normalize(expectedOutput))) {
                        System.out.println("PASS " + testId);
                    } else {
                        System.out.println("FAIL " + testId + " EXPECTED:" + expectedOutput + " GOT:" + result);
                    }
                } catch (Exception e) {
                    System.out.println("ERROR " + testId + " " + e.getClass().getSimpleName() + ":" + e.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("FATAL: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
    
    // Execute a single test case
    private static String executeTest(Solution solution, String inputStr) throws Exception {
        // Parse the input JSON array: ["val1", "val2", ...] or [[array], val]
        inputStr = inputStr.trim();
        if (!inputStr.startsWith("[") || !inputStr.endsWith("]")) {
            throw new Exception("Invalid input format");
        }
        
        // Extract parameters from JSON array
        String content = inputStr.substring(1, inputStr.length() - 1);
        
        // Call solve method with parsed parameters
        ${methodInvocation}
    }
    
    ${helperMethods}
}
`.trim();

    return template;
}

module.exports = {
    generateJavaWrapper
};
