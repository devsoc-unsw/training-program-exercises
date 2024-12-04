import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { Line } from "../types";

import "highlight.js/styles/github.css";

/**
 * A component that adds syntax highlighting to code. Used in the game `scrip.ts`
 * to show new lines of code being "written" as part of the idle game.
 * @param line - a struct that contains details both the `contents` of the code
 * snippet that we want to highlight, and the `language` the code snippet is
 * written in (e.g. `js`, `css`, `py`).
 * @returns 
 */
export default function Highlight({ language, contents }: Line) {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
    }
  });

  return (
    <pre>
      <code className={`language-${language}`} ref={codeRef}>
        {contents}
      </code>
    </pre>
  );
}
