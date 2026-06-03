const { generateJavaWrapper } = require('./templates/javaWrapper');

// Test user code
const userCode = `public ListNode solve(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`;

const javaMethodSignature = 'public ListNode solve(ListNode head)';

const generatedCode = generateJavaWrapper(userCode, javaMethodSignature);

console.log('=== GENERATED JAVA CODE ===');
console.log(generatedCode);
console.log('\n=== LINE 15-25 ===');
const lines = generatedCode.split('\n');
for (let i = 14; i < 25 && i < lines.length; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
}
