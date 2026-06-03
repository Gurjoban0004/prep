const javaWrapper = require('./templates/javaWrapper');

const userCode = `public int solve(TreeNode root) {
    if (root == null) {
        return 0;
    }
    
    int leftDepth = solve(root.left);
    int rightDepth = solve(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}`;

const signature = 'public int solve(TreeNode root)';

const generated = javaWrapper.generateJavaWrapper(userCode, signature);

// Split into lines and show specific sections
const lines = generated.split('\n');

console.log('=== LINES 1-35 (imports, class start, TreeNode) ===');
lines.slice(0, 35).forEach((line, i) => console.log(`${i + 1}: ${line}`));

console.log('\n=== LINES 26-40 (TreeNode -> Solution class) ===');
lines.slice(25, 40).forEach((line, i) => console.log(`${i + 26}: ${line}`));

console.log('\n=== Total lines:', lines.length);
