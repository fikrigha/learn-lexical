import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListItemNode,
  insertList,
} from "@lexical/list";

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

function ToolbarPlugin() {
  return (
    <div>
      <HeadingPlugin />
      <ListPlugin />
    </div>
  );
}

function HeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  const onClick = (tag: "h1" | "h2" | "h3"): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <>
      <button onClick={() => onClick("h1")}>H1</button>
      <button onClick={() => onClick("h2")}>H2</button>
      <button onClick={() => onClick("h3")}>H3</button>
    </>
  );
}

function ListPlugin() {
  const [editor] = useLexicalComposerContext();

  const onClick = (tag: "ol" | "ul"): void => {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  return (
    <>
      <button onClick={() => onClick("ol")}>ol</button>
      <button onClick={() => onClick("ul")}>ul</button>
    </>
  );
}

function onError(error: Error) {
  console.log(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
  };

  return (
    <div className="editorWrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <div>
          <ToolbarPlugin />
        </div>
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
