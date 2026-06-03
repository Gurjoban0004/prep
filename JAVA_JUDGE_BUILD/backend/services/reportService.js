const {
    getSessionDoc,
    getSessionParticipants,
    getSessionQuestions,
    getAllSessionSubmissions,
    createSessionReport,
    getSessionReport
} = require('./firestoreService');

/**
 * Generates a comprehensive Markdown report for a completed session
 * @param {string} sessionId 
 * @returns {Promise<string>} The generated markdown content
 */
async function generateSessionReport(sessionId) {
    // 1. Fetch all data concurrently (F6: use service function instead of raw db)
    const [session, participants, questions, submissions] = await Promise.all([
        getSessionDoc(sessionId),
        getSessionParticipants(sessionId),
        getSessionQuestions(sessionId),
        getAllSessionSubmissions(sessionId)
    ]);

    if (!session) throw new Error('Session not found');

    // 2. Aggregate Stats
    const totalParticipants = participants.length;
    const scores = participants.map(p => p.score || 0).sort((a, b) => b - a);

    // Completion Rate (students who solved at least 1 problem)
    // Completion Rate (students who solved at least 1 problem)
    const activeParticipantsCount = participants.filter(p => p.solvedCount > 0).length;
    const completionRate = totalParticipants > 0
        ? ((activeParticipantsCount / totalParticipants) * 100).toFixed(1)
        : 0;

    // Avg Score
    const avgScore = scores.length > 0
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
        : 0;

    // Top Performer
    const topPerformer = participants.length > 0 ? participants[0] : null;

    // 3. Build Markdown
    let md = `# Session Report\n`;
    md += `**Date**: ${new Date(session.startedAt).toLocaleString()} - ${new Date().toLocaleString()}\n`;
    md += `**Participants**: ${totalParticipants} students\n\n`;

    md += `## Performance Summary\n`;
    md += `- **Participation Rate**: ${completionRate}% (${activeParticipantsCount}/${totalParticipants} active)\n`;
    md += `- **Average Score**: ${avgScore} pts\n`;
    if (topPerformer) {
        md += `- **Top Performer**: ${topPerformer.displayName} (${topPerformer.score} pts)\n`;
    }
    md += `\n`;

    md += `## Problem Breakdown\n`;

    for (const q of questions) {
        const qSubmissions = submissions.filter(s => s.sessionQuestionId === q.id);
        const accepted = qSubmissions.filter(s => s.verdict === 'Accepted').length;
        const wrong = qSubmissions.filter(s => s.verdict === 'Wrong Answer').length;
        const errors = qSubmissions.filter(s => ['Runtime Error', 'Compilation Error'].includes(s.verdict)).length;
        const tle = qSubmissions.filter(s => s.verdict === 'Time Limit Exceeded').length;

        // Calculate pass rate based on UNIQUE students who solved it
        const uniqueSolvers = new Set(qSubmissions.filter(s => s.verdict === 'Accepted').map(s => s.studentId)).size;
        const passRate = totalParticipants > 0 ? ((uniqueSolvers / totalParticipants) * 100).toFixed(1) : 0;

        // Calculate avg time for accepted solutions
        const acSubs = qSubmissions.filter(s => s.verdict === 'Accepted');
        let avgTimeStr = "N/A";
        if (acSubs.length > 0 && session.startedAt) {
            const totalSeconds = acSubs.reduce((acc, s) => {
                return acc + (new Date(s.submittedAt) - new Date(session.startedAt)) / 1000;
            }, 0);
            const avgSeconds = totalSeconds / acSubs.length;
            const minutes = Math.floor(avgSeconds / 60);
            const seconds = Math.floor(avgSeconds % 60);
            avgTimeStr = `${minutes}m ${seconds} s`;
        }

        md += `### Problem ${q.orderIndex + 1}: ${q.title} \n`;
        md += `- ✅ Accepted: ${accepted} (Solved by ${passRate}% of class) \n`;
        md += `- ❌ Wrong Answer: ${wrong} \n`;
        md += `- ⏱ TLE: ${tle} \n`;
        md += `- 💥 Errors: ${errors} \n`;
        md += `- ⏳ Avg Time to Solve: ${avgTimeStr} \n\n`;
    }

    md += `## Red Flags\n`;
    const inactiveStudents = participants.filter(p => !p.solvedCount || p.solvedCount === 0);
    if (inactiveStudents.length > 0) {
        md += `- 🚩 **${inactiveStudents.length} students** did not solve any problem.\n`;
        // List names if count is small
        if (inactiveStudents.length <= 10) {
            md += `  - ${inactiveStudents.map(p => p.displayName).join(', ')} \n`;
        }
    }

    const lowScorers = participants.filter(p => p.score < 50 && p.solvedCount > 0);
    if (lowScorers.length > 0) {
        md += `- 🚩 **${lowScorers.length} students** scored < 50 points despite participation.\n`;
    }

    if (inactiveStudents.length === 0 && lowScorers.length === 0) {
        md += `- No major red flags detected. Good job!\n`;
    }

    // 4. Save Logic
    await createSessionReport(sessionId, md);

    return md;
}

module.exports = {
    generateSessionReport
};
