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
    

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
 
    res.flushHeaders();
    
  
    const cleanedChatHistory = cleanChatHistory(chatHistory);
    
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: cleanedChatHistory,
      generationConfig: {
        maxOutputTokens: 1000, 
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
    
   
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error("AI Chat Error:", err);
    res.write(`data: ${JSON.stringify({ error: err.message || "Internal server error" })}\n\n`);
    res.end();
  }
};

module.exports = aiChatResponse;