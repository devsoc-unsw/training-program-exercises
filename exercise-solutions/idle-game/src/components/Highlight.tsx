import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { Line } from "../types";

import "highlight.js/styles/github.css";

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
