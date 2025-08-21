import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiResponse, updateChat, resetChat, trackId } from "../redux/aiChatslicer";
import { Send, Copy, Check, Plus, User, Bot, LogIn } from "lucide-react";
import { useParams, Link } from "react-router-dom";

function AskAi() {
  const dispatch = useDispatch();
  const { problem } = useSelector((state) => state.problem);
  const { chatHistory, loading, error, problemId, isStreaming } = useSelector((state) => state.aiChat);
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Color scheme matching the Description component
  const bgColor = "bg-[#1a1a1a]";
  const borderColor = "border-[#2d3748]";
  const textColor = "text-gray-200";
  const aiMessageBg = "bg-[#2d3748]";
  const userMessageBg = "bg-amber-500/20";

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
    if (!isAuthenticated) return;
    
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

  // If user is not authenticated, show sign-in prompt
  if (!isAuthenticated) {
    return (
      <div className={`flex flex-col h-screen max-h-[80vh] min-h-[500px] border ${borderColor} rounded-lg ${bgColor} ${textColor}`}>
        {/* Chat Header */}
        <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <h2 className="text-lg font-semibold">AskAI Assistant</h2>
          </div>
        </div>

        {/* Authentication Prompt */}
        <div className="flex-1 flex flex-col items-center justify-center p-3 text-center">
          <div className="bg-amber-400/10 p-4 rounded-xl border border-amber-400/30 max-w-md">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-400/20 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-amber-300 mb-2">Sign In Required</h3>
            <p className="text-gray-300 mb-6">
              Please sign in to access the AI coding assistant and get help with this problem.
            </p>
           
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen max-h-[80vh] min-h-[500px] border ${borderColor} rounded-lg ${bgColor} ${textColor}`}>
      {/* Chat Header with New Chat Button */}
      <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          <h2 className="text-lg font-semibold">AskAI Assistant</h2>
        </div>
        <button
          onClick={() => dispatch(resetChat())}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 transition-colors"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${bgColor}`}
      >
        {chatHistory.map((msg, index) => {
          const { text, codeBlocks } = extractCodeBlocks(msg.parts[0]?.text || '');
          
          return (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-[85%] text-sm flex items-start gap-3 ${
                  msg.role === "user"
                    ? `${userMessageBg} text-amber-100 rounded-tr-none`
                    : `${aiMessageBg} text-gray-200 rounded-tl-none`
                }`}
              >
                {msg.role === "user" ? (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-400/20 flex items-center justify-center">
                    <User size={14} className="text-amber-400" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <Bot size={14} className="text-amber-400" />
                  </div>
                )}
                
                <div className="flex-1">
                  {renderMessageContent(text, codeBlocks, isMessageComplete(msg))}
                  
                  {/* Show typing cursor for incomplete AI messages */}
                  {msg.role === "model" && !isMessageComplete(msg) && (
                    <span className="ml-1 inline-block h-4 w-0.5 bg-amber-400 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Show loading indicator only when not streaming */}
        {loading && !isStreaming && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-lg ${aiMessageBg} text-gray-400 text-sm flex items-center gap-3 rounded-tl-none`}>
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-400/10 flex items-center justify-center">
                <Bot size={14} className="text-amber-400" />
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className={`px-4 py-3 rounded-lg bg-rose-900/30 border border-rose-700/50 text-rose-400 text-sm flex items-center gap-3 rounded-tl-none`}>
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-400/10 flex items-center justify-center">
                <span className="text-xs">⚠️</span>
              </div>
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex items-center p-4 border-t ${borderColor} ${bgColor}`}
      >
        <input
          type="text"
          placeholder="Ask about the problem..."
          className={`flex-1 px-4 py-3 ${bgColor} border ${borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50`}
          {...register("message", { required: true, minLength: 2 })}
          disabled={loading || isStreaming}
        />
        <button
          type="submit"
          className={`ml-3 p-3 bg-amber-400/20 text-amber-400 rounded-lg hover:bg-amber-400/30 disabled:opacity-50 transition-colors`}
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
      <div className="bg-gray-800 text-gray-100 rounded-lg overflow-hidden border border-gray-700">
        {/* Code Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
          <span className="text-xs font-medium text-gray-300">
            {language || 'code'}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-400 transition-colors"
          >
            {copiedCodeId === codeId ? (
              <>
                <Check size={14} className="text-amber-400" />
                <span className="text-amber-400">Copied!</span>
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
        <pre className="p-4 overflow-x-auto bg-gray-900">
          <code className="block text-sm font-mono whitespace-pre text-gray-200">
            {code}
            {!isComplete && (
              <span className="ml-1 inline-block h-4 w-0.5 bg-amber-400 animate-pulse"></span>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AskAi;