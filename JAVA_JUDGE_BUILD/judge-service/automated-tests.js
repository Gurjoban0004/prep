const { generateJavaWrapper } = require('./templates/javaWrapper');

function test(title, userCode, signature) {
    console.log("\n" + "=".repeat(80));
    console.log(`TEST: ${title}`);
    console.log(`SIGNATURE: ${signature}`);
    console.log("=".repeat(80));
    try {
        const code = generateJavaWrapper(userCode, signature);
        
        // Basic checks for expected literals/converters
        if (signature.includes('long')) {
            console.log("Check for Long converter: ", code.includes('convertToLong') ? "PASS" : "FAIL");
        }
        if (signature.includes('float')) {
            console.log("Check for Float converter: ", code.includes('convertToFloat') ? "PASS" : "FAIL");
        }
        
        // Output a snippet of the conversion part
        const start = code.lastIndexOf('private static String executeTest');
        const end = code.indexOf('}', start + 1000);
        console.log("Generated Conversion Snippet:");
        console.log(code.substring(start, end + 1).trim());
        
    } catch (e) {
        console.error(`ERROR in ${title}:`, e.message);
    }
}

// 1. Large long values
test("Large long values", 
    "public long decToBin(long n) { return n; }", 
    "public long decToBin(long n)"
);

// 2. Long arrays
test("Long arrays", 
    "public long[] solve(long[] arr) { return arr; }", 
    "public long[] solve(long[] arr)"
);

// 3. Float values
test("Float values", 
    "public float multiply(float a, float b) { return a * b; }", 
    "public float multiply(float a, float b)"
);

// 4. Mixed parameter signatures
test("Mixed signatures", 
    "public String complex(int i, long l, float f, double d)", 
    "public String complex(int i, long l, float f, double d)"
);

// 5. Mixed with arrays
test("Mixed with arrays", 
    "public boolean check(int[] nums, long threshold, float ratio)", 
    "public boolean check(int[] nums, long threshold, float ratio)"
);
