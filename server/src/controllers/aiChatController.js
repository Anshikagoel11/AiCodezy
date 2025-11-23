const { GoogleGenerativeAI } = require("@google/generative-ai");

function cleanChatHistory(chatHistory) {
  return chatHistory.map((message) => {
    const cleanMessage = {
      role: message.role,
      parts: [],
    };

    if (Array.isArray(message.parts)) {
      cleanMessage.parts = message.parts
        .map((part) => {
          if (typeof part.text === "string") {
            return { text: part.text };
          }
          return null;
        })
        .filter(Boolean);
    }

    return cleanMessage;
  });
}

const aiChatResponse = async (req, res) => {
  try {
    const { chatHistory, problemDetails } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.flushHeaders();

    const cleanedHistory = cleanChatHistory(chatHistory);

    
    // Initialize Gemini
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Correct model + version usage
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const stream = await model.generateContentStream({
      contents: cleanedHistory,
      systemInstruction: `
You are an expert DSA tutor specializing in coding problems.

## Problem Context:
- Title: ${problemDetails.title}
- Description: ${problemDetails.description}
- Examples: ${JSON.stringify(problemDetails.testCases)}
- Starter Code: ${problemDetails.startCode}

## Guidelines:
- Give hints, debugging help, optimal solutions.
- Respond only about this problem.
- Keep answers short.
`,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Streaming response
    for await (const chunk of stream.stream()) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("AI Chat Error:", err);
    res.write(
      `data: ${JSON.stringify({
        error: err.message || "Internal server error",
      })}\n\n`
    );
    res.end();
  }
};

module.exports = aiChatResponse;
