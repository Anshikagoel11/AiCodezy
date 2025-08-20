import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiResponse, updateChat, resetChat, trackId } from "../redux/aiChatslicer";
import { Send, Copy, Check } from "lucide-react";
import { useParams } from "react-router";

function AskAi() {
  const dispatch = useDispatch();
  const { problem } = useSelector((state) => state.problem);
  const { chatHistory, loading, error, problemId, isStreaming } = useSelector((state) => state.aiChat);
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  // Auto scroll when chat updates
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 100;
      
      if (isNearBottom || isStreaming) {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: "smooth",
          block: "nearest"
        });
      }
    }
  }, [chatHistory, isStreaming]);

  useEffect(() => {
    if (problemId !== id) {
      dispatch(resetChat());
      dispatch(trackId(id));
    }
  }, [id, dispatch, problemId]);

  // Check if a message is complete (safe check)
  const isMessageComplete = (msg) => {
    return msg.isComplete !== false;
  };

  // Extract code blocks from text
  const extractCodeBlocks = (text) => {
    if (!text) return { text, codeBlocks: [] };
    
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    const codeBlocks = [];
    let lastIndex = 0;
    let processedText = "";
    let match;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before the code block
      processedText += text.slice(lastIndex, match.index);
      
      // Create a unique ID for this code block
      const codeId = `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Add placeholder for the code block
      processedText += `{{CODE_BLOCK:${codeId}}}`;
      
      // Store the code block
      codeBlocks.push({
        id: codeId,
        language: match[1] || '',
        code: match[2].trim()
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    processedText += text.slice(lastIndex);
    
    return { text: processedText, codeBlocks };
  };

  // Render text with code blocks
  const renderMessageContent = (text, codeBlocks = [], isComplete = true) => {
    if (!text) return null;
    
    const parts = text.split(/({{CODE_BLOCK:[^}]+}})/);
    
    return parts.map((part, index) => {
      const codeMatch = part.match(/{{CODE_BLOCK:([^}]+)}}/);
      
      if (codeMatch) {
        const codeId = codeMatch[1];
        const codeBlock = codeBlocks.find(block => block.id === codeId);
        
        if (codeBlock) {
          return (
            <CodeBlock 
              key={codeId} 
              code={codeBlock.code} 
              language={codeBlock.language}
              isComplete={isComplete}
              codeId={codeId}
              copiedCodeId={copiedCodeId}
              setCopiedCodeId={setCopiedCodeId}
            />
          );
        }
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  const onSubmit = (data) => {
    const userMessage = { role: "user", parts: [{ text: data.message }] };

    // Add user message in redux
    dispatch(updateChat(userMessage));

    // Call AI response thunk
    dispatch(fetchAiResponse({
      chatHistory: [...chatHistory, userMessage],
      problemDetails: {
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.codeFunction
      }
    }));

    reset();
  };

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] border rounded-lg shadow-md">
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {chatHistory.map((msg, index) => {
          const { text, codeBlocks } = extractCodeBlocks(msg.parts[0]?.text || '');
          
          return (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {renderMessageContent(text, codeBlocks, isMessageComplete(msg))}
                
                {/* Show typing cursor for incomplete AI messages */}
                {msg.role === "model" && !isMessageComplete(msg) && (
                  <span className="ml-1 inline-block h-4 w-0.5 bg-gray-600 animate-pulse"></span>
                )}
              </div>
            </div>
          );
        })}

        {/* Show loading indicator only when not streaming */}
        {loading && !isStreaming && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-600 text-sm">
              Thinking...
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-red-200 text-red-900 text-sm">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center p-3 border-t bg-white"
      >
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("message", { required: true, minLength: 2 })}
          disabled={loading || isStreaming}
        />
        <button
          type="submit"
          className="ml-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || errors.message || isStreaming}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

// Code Block Component
const CodeBlock = ({ code, language, isComplete, codeId, copiedCodeId, setCopiedCodeId }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(codeId);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="my-3">
      <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
        {/* Code Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
          <span className="text-xs font-medium text-gray-300">
            {language || 'code'}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            {copiedCodeId === codeId ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        {/* Code Content */}
        <pre className="p-4 overflow-x-auto">
          <code className="block text-sm font-mono whitespace-pre">
            {code}
            {!isComplete && (
              <span className="ml-1 inline-block h-4 w-0.5 bg-gray-400 animate-pulse"></span>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AskAi;