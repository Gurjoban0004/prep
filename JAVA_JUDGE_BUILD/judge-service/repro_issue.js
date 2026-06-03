const axios = require('axios');

const payload = {
    questionId: "debug-1",
    userCode: "public int[] solve(int[] nums) { return nums; }",
    javaMethodSignature: "public int[] solve(int[] nums)",
    testCases: [
        {
            test_id: 1,
            input: "[1, 2, 3]", // Malformed: should be "[[1, 2, 3]]"
            expected_output: "[1, 2, 3]"
        }
    ]
};

async function run() {
    try {
        const res = await axios.post('http://localhost:5001/judge/execute', payload);
        console.log("Verdict:", res.data.verdict);
        if (res.data.error) console.log("Error:", res.data.error);
        if (res.data.stdout) console.log("Stdout:", res.data.stdout); // If available
    } catch (e) {
        console.error("Request failed:", e.message);
        if (e.response) console.log(e.response.data);
    }
}

run();
