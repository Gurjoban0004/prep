const { executeCode } = require('../../JAVA_JUDGE_BUILD/judge-service/executor');

async function test() {
  const result = await executeCode({
    questionId: "test-rotate-list",
    userCode: `
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    static Node rotateList(Node head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        int len = 1;
        Node tail = head;
        while (tail.next != null) { tail = tail.next; len++; }
        if (k >= len) return head;
        Node newTail = head;
        for (int i = 1; i < k; i++) newTail = newTail.next;
        Node newHead = newTail.next;
        newTail.next = null;
        tail.next = head;
        return newHead;
    }
    `,
    javaMethodSignature: "public static Node rotateList(Node head, int k)",
    testCases: [
      {
        test_id: 1,
        input: "[[1,2,3,4,5], 2]",
        expected_output: "[3,4,5,1,2]"
      },
      {
        test_id: 2,
        input: "[[10,20], 3]",
        expected_output: "[10,20]"
      }
    ],
    timeLimitMs: 2000,
    memoryLimitMb: 256
  });

  console.log("RESULT VERDICT:", result.verdict);
  console.log("RESULT ERROR:", result.error);
  console.log("RESULT DETAILS:", JSON.stringify(result, null, 2));
}

test().catch(console.error);
