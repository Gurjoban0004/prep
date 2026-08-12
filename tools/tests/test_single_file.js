const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const code = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello single file!");
    }
}
`;

fs.writeFileSync('Main.java', code);

console.log('--- Method 1: javac + java ---');
const t0 = Date.now();
const compile = spawnSync('javac', ['Main.java']);
const run1 = spawnSync('java', ['Main']);
const t1 = Date.now();
console.log('Compile code:', compile.status);
console.log('Run stdout:', run1.stdout.toString().trim());
console.log('Method 1 took:', t1 - t0, 'ms');

console.log('\n--- Method 2: java Main.java ---');
const t2 = Date.now();
const run2 = spawnSync('java', ['Main.java']);
const t3 = Date.now();
console.log('Run stdout:', run2.stdout.toString().trim());
console.log('Method 2 took:', t3 - t2, 'ms');

// Cleanup
fs.unlinkSync('Main.java');
if (fs.existsSync('Main.class')) fs.unlinkSync('Main.class');
