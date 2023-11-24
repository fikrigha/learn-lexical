import { $createTextNode, $getRoot, EditorState } from "lexical";
import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import "./Editor.css";

// https://lexical.dev/docs/getting-started/theming
const theme = {
  heading: {
    h1: "editor-h1",
  },
  text: {
    bold: "editor-bold",
  },
};

function MyHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  const onClick = (e: React.MouseEvent) => {
    editor.update(() => {
      const root = $getRoot();
      root.append(
        $createHeadingNode("h1").append($createTextNode("hello world"))
      );
    });
  };

  return <button onClick={onClick}>Heading</button>;
}

function onError(error: Error) {
  console.log(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  return (
    <div className="editorWrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <MyHeadingPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="contentEditable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
}
