const { GoogleGenerativeAI } = require('@google/generative-ai');

// Function to clean chat history for Gemini API
function cleanChatHistory(chatHistory) {
  return chatHistory.map(message => {
    // Only keep the properties that Gemini API expects
    const cleanMessage = {
      role: message.role,
      parts: []
    };
    
    // Ensure parts is an array and clean each part
    if (Array.isArray(message.parts)) {
      cleanMessage.parts = message.parts.map(part => {
        // Only include text property from parts
        const cleanPart = {};
        if (typeof part.text === 'string') {
          cleanPart.text = part.text;
        }
        return cleanPart;
      }).filter(part => part.text); // Remove empty parts
    }
    
    return cleanMessage;
  });
}

// Function to estimate token count (approximate)
function estimateTokenCount(text) {
  // Simple approximation: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
}

// Function to truncate chat history to stay within token limits
function truncateChatHistory(chatHistory, maxTokens = 3000) {
  let totalTokens = 0;
  const truncatedHistory = [];
  
  // Process messages in reverse order (most recent first)
  for (let i = chatHistory.length - 1; i >= 0; i--) {
    const message = chatHistory[i];
    let messageTokens = 0;
    
    // Calculate tokens for this message
    if (Array.isArray(message.parts)) {
      for (const part of message.parts) {
        if (part.text) {
          messageTokens += estimateTokenCount(part.text);
        }
      }
    }
    
    // If adding this message would exceed the limit, stop
    if (totalTokens + messageTokens > maxTokens) {
      break;
    }
    
    // Add message to beginning of truncated history
    truncatedHistory.unshift(message);
    totalTokens += messageTokens;
  }
  
  return truncatedHistory;
}

const aiChatResponse = async (req, res) => {
  try {
    const { chatHistory, problemDetails } = req.body;
    
    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Flush the headers to establish the SSE connection
    res.flushHeaders();
    
    // Truncate chat history to stay within token limits (max 3000 tokens)
    const truncatedHistory = truncateChatHistory(chatHistory, 3000);
    
    // Clean the chat history - remove any non-standard fields
    const cleanedChatHistory = cleanChatHistory(truncatedHistory);
    
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: cleanedChatHistory,
      generationConfig: {
        maxOutputTokens: 1000, // Limit response tokens
        temperature: 0.7,
      },
      systemInstruction: `
You are an expert Data Structures and Algorithms (DSA) tutor specializing in coding problems.
You can only help with the current problem.

## Problem Context:
- Title: ${problemDetails.title}
- Description: ${problemDetails.description}
- Examples: ${JSON.stringify(problemDetails.testCases)}
- Starter Code: ${problemDetails.startCode}

## Guidelines:
- Provide hints, debugging help, explanations, optimal solutions, or alternative approaches.
- Always focus only on the current problem.
- Respond in the language user is comfortable with.
- Do not go outside DSA context.
- If user want code in any specific language then give them clean and good code
- Keep responses concise and focused - maximum 1000 tokens
`,
    });

    const text = result.response.text();
    
    // Send response character by character with a small delay
    for (let i = 0; i < text.length; i++) {
      // Format as Server-Sent Event
      res.write(`data: ${JSON.stringify({ text: text[i] })}\n\n`);
      
      // Add a small delay between characters for typing effect
      await new Promise(resolve => setTimeout(resolve, 5));
    }
    
    // Send completion event
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error("AI Chat Error:", err);
    // Send error as SSE
    res.write(`data: ${JSON.stringify({ error: err.message || "Internal server error" })}\n\n`);
    res.end();
  }
};

module.exports = aiChatResponse;