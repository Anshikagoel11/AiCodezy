import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiResponse, updateChat, resetChat, trackId } from "../redux/aiChatslicer";
import { Send } from "lucide-react";
import { useParams } from "react-router";

function AskAi() {
  const dispatch = useDispatch();
   const { problem } = useSelector((state) => state.problem);
  const { chatHistory, loading, error,problemId } = useSelector((state) => state.aiChat);
  const { id } = useParams();
  const { register , handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);


  // Auto scroll when chat updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

useEffect(() => {
  if(problemId !== id){
  dispatch(resetChat());
  dispatch(trackId(id))
  }
}, [id, dispatch]);


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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-black"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.parts[0]?.text}
            </div>
          </div>
        ))}

        {loading && (
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
        className="flex items-center p-3 border-t bg-black"
      >
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("message", { required: true, minLength: 2 })}
        />
        <button
          type="submit"
          className="ml-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || errors.message}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default AskAi;
