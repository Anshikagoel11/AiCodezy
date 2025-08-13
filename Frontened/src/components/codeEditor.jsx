import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const handleEditorChange = (value) => {
    console.log('Editor content:', value);
  };

  return (
    <Editor
      height="500px"
      defaultLanguage="javascript"
      defaultValue="// Start coding here..."
    //   theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;