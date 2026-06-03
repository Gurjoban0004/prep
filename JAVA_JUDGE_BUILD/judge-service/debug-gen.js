const javaWrapper = require('./templates/javaWrapper');
const fs = require('fs');

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

// Write to file for inspection
fs.writeFileSync('./debug-output.java', generated);
console.log('✅ Generated code written to debug-output.java');
console.log('📏 Total lines:', generated.split('\n').length);
