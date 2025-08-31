import React, {
  useRef,
  useImperativeHandle,
  useMemo,
  useState,
  useEffect
} from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";

const CodeEditor = React.forwardRef(({ language }, ref) => {
  const editorRef = useRef(null);
  const { problem } = useSelector((state) => state.problem);
  const [code, setCode] = useState("// start code here");

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue()
  }));

  const initialCode = useMemo(() => {

    if (!problem?.codeFunction) return "// start code here";
    
    
    const found = problem.codeFunction.find(
      (item) =>  item.language.toLowerCase() === language.toLowerCase()
   
    );

    return found?.initialCode || "// start code here";
  }, [problem, language]);

  useEffect(() => {
    if (code !== initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={(value) => {
          if (value !== code) setCode(value);
        }}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 15,
          fontFamily: "Fira Code, monospace",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          renderWhitespace: "selection",
          lineNumbers: "on",
          roundedSelection: false,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            handleMouseWheel: true
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 10,
          wordWrap: "on"
        }}
      />
    </div>
  );
});

export default CodeEditor;
