const javaWrapper = require('./templates/javaWrapper');
const fs = require('fs');

const userCode = `public int solve(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(solve(root.left), solve(root.right));
}`;

const signature = 'public int solve(TreeNode root)';

try {
    const generated = javaWrapper.generateJavaWrapper(userCode, signature);
    fs.writeFileSync('./debug-cast.java', generated);
    console.log('✅ Generated code written to debug-cast.java');

    // Read and print the specific lines around the method invocation
    const lines = generated.split('\n');

    console.log('\n--- METHOD INVOCATION (Lines showing solve call) ---');
    // Find lines containing "solve("
    lines.forEach((line, i) => {
        if (line.includes('solve(') || line.includes('arrayToTree')) {
            console.log(`${i + 1}: ${line}`);
        }
    });

    console.log('\n--- HELPER METHODS (Checking toIntegerArray) ---');
    // Find definition of toIntegerArray
    lines.forEach((line, i) => {
        if (line.includes('Integer[] toIntegerArray')) {
            console.log(`${i + 1}: ${line}`);
            // Print next 10 lines
            for (let j = 1; j <= 10; j++) console.log(`${i + 1 + j}: ${lines[i + j]}`);
        }
    });

} catch (e) {
    console.error('Error generating code:', e);
}
