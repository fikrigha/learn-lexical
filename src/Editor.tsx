import { EditorState } from "lexical";
import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import "./Editor.css";

const theme = {};

function onError(error: Error) {
  console.log(error);
}

function MyOnChangePlugin(props: {
  onChange: (editorState: EditorState) => void;
}) {
  console.log("MyOnChangePlugin");

  // Access the editor instance
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      props.onChange(editorState);
    });
  }, [props.onChange, editor]);

  return null;
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <div className="editorWrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="contentEditable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyOnChangePlugin
          onChange={(editorState) => {
            console.log("<MyOnChangePlugin/>", editorState);
          }}
        />
      </LexicalComposer>
    </div>
  );
}
