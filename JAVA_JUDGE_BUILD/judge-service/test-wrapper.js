// Test script to see generated Java code
const { generateJavaWrapper } = require('./templates/javaWrapper');

// Test case: Simple int[] parameter
const userCode = `
public int[] solve(int[] nums, int target) {
    // Test code
    return new int[]{0, 1};
}
`.trim();

const javaMethodSignature = "public int[] solve(int[] nums, int target)";

console.log("=".repeat(80));
console.log("GENERATED JAVA WRAPPER CODE:");
console.log("=".repeat(80));

const generatedCode = generateJavaWrapper(userCode, javaMethodSignature);
console.log(generatedCode);

console.log("\n" + "=".repeat(80));
console.log("END OF GENERATED CODE");
console.log("=".repeat(80));
