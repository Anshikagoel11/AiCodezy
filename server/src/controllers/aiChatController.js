const { GoogleGenerativeAI } = require('@google/generative-ai');

function cleanChatHistory(chatHistory) {
  return chatHistory.map(message => {
    const cleanMessage = {
      role: message.role,
      parts: []
    };

    if (Array.isArray(message.parts)) {
      cleanMessage.parts = message.parts.map(part => {
        const cleanPart = {};
        if (typeof part.text === 'string') {
          cleanPart.text = part.text;
        }
        return cleanPart;
      }).filter(part => part.text);
    }

    return cleanMessage;
  });
}

const aiChatResponse = async (req, res) => {
  try {
    const { chatHistory, problemDetails } = req.body;

    // Validate required fields
    if (!chatHistory || !problemDetails) {
      return res.status(400).json({ error: 'Missing chatHistory or problemDetails' });
    }

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error: Missing API key' });
    }
  
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering if applicable

    const cleanedChatHistory = cleanChatHistory(chatHistory);

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: cleanedChatHistory,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
   systemInstruction: `
You are an expert Data Structures and Algorithms (DSA) tutor.

## Step 0: Detect User Intent (VERY IMPORTANT)
Before answering, classify the user input:

1. If the user message is:
   - Greeting (hi, hello, hey, etc.)
   - Small talk
   - Asking how you work
→ Respond normally like a friendly assistant (DO NOT mention problem context yet).

2. If the user message is:
   - Related to the problem
   - Asking for hint / solution / debugging
   - Sharing code
→ Then switch to full DSA tutor mode using the problem context below.

---

## Problem Context (USE ONLY WHEN RELEVANT):
- Title: \${problemDetails.title}
- Description: \${problemDetails.description}
- Examples: \${JSON.stringify(problemDetails.testCases)}
- Starter Code: \${problemDetails.startCode}

---

## Guidelines (Apply ONLY in problem mode):
- Stay strictly within this problem.
- Provide hints, debugging, explanations, optimal solutions.
- Keep answers concise and clear.
- Use simple language.
- Give clean code if asked.

---

## Grading Mode:
If user asks for evaluation:
1. Start with: ✅ Correct / ❌ Incorrect / ⚠️ Partial
2. Explain why
3. Point mistakes
4. Suggest improvements

---

## UX Rules:
- If user is stuck → give hints first
- If code is shared → debug first
- After solving → ask 1–2 follow-up interview questions

---

## Restrictions:
- Do NOT force problem discussion for unrelated inputs
- Do NOT go outside DSA when in problem mode
- Keep response under 1000 tokens
`
    });

    const text = result.response.text();

    // Send initial header flush
    res.flushHeaders();

    // Send response character by character with a small delay
    for (let i = 0; i < text.length; i++) {
      // Format as Server-Sent Event
      res.write(`data: ${JSON.stringify({ text: text[i] })}\n\n`);

      // Add a small delay between characters for typing effect
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error("AI Chat Error:", err);
    // Check if headers have already been sent
    if (!res.headersSent) {
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
    res.write(`data: ${JSON.stringify({ error: err.message || "Internal server error" })}\n\n`);
    res.end();
  }
};

module.exports = aiChatResponse;
