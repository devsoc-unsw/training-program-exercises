import { useEffect, useState } from "react";

import { File, Line, LineState, Resource } from "./types";
import Highlight from "./components/Highlight";

const CODE_FILES: File[] = [
  {
    filename: "WarpPacket.java",
    language: "java",
  },
  {
    filename: "function.py",
    language: "python",
  }
];

const getRandomLine = async (): Promise<Line> => {
  const fileIndex = Math.floor(Math.random() * CODE_FILES.length);
  const file = CODE_FILES[fileIndex];

  const contents = await fetch(`/code/${file.filename}`);
  const rawText = await contents.text();
  const lines = rawText.split("\n").filter(line => line.length > 0);

  const lineIndex = Math.floor(Math.random() * lines.length);

  return {
    contents: lines[lineIndex].trimStart(),
    language: file.language,
  };
};

export default function App() {
  const [codeLine, setCodeLine] = useState<Line>({
    contents: "console.log('Hello, World!');",
    language: "javascript",
  });
  const [lines, setLines] = useState<LineState>({
    prev: 0,
    curr: 0,
  });
  const [resources, setResources] = useState<Resource[]>([
    {
      name: "Programmer",
      increase: 0.1,
      amount: 0,
      cost: 20,
    },
    {
      name: "Forum Answer",
      increase: 0.3,
      amount: 0,
      cost: 50,
    }
  ]);

  const addLines = (n: number) => {
    setLines(lines => {
      return {
        prev: lines.curr,
        curr: lines.curr + n,
      }
    });
  };

  const buyResource = (index: number) => {
    const resource = resources[index];

    if (lines.curr < resource.cost) {
      return;
    }

    resources[index] = {
      name: resource.name,
      increase: resource.increase,
      amount: resource.amount + 1,
      cost: Math.floor(resource.cost * 1.1),
    };

    setLines({
      prev: lines.curr,
      curr: lines.curr - resource.cost
    });
    setResources(resources);
  };

  useEffect(() => {
    async function fetchData() {
      const randomLine = await getRandomLine();
      setCodeLine(randomLine);
    }

    if (Math.floor(lines.prev) >= Math.floor(lines.curr)) {
      return;
    }

    fetchData();
  }, [lines]);

  useEffect(() => {
    const increase = resources.map(res => res.amount * res.increase).reduce((a, b) => a + b);

    const interval = setInterval(() => {
      addLines(increase);
    }, 1000);

    return () => clearInterval(interval);
  }, [resources]);

  return (
    <div>
      <div className="bg-gray-200 p-2 w-1/2 mt-5 m-auto rounded-md">
        <Highlight
          contents={codeLine.contents}
          language={codeLine.language} />
      </div>
      <div className="bg-gray-200 p-5 w-1/2 mt-10 m-auto">
        <p>Lines of code written: {Math.floor(lines.curr)}</p>
        <br />
        <button
          className="bg-gray-400 p-1 rounded-sm"
          onClick={() => addLines(1)}>
          Add line
        </button>
        {resources.map((res, index) => (
          <>
            <br />
            <button
              className="bg-gray-400 mt-1 p-1 rounded-sm"
              key={`${res.name}-${index}`}
              onClick={() => buyResource(index)}>
              Buy {res.name} ({res.cost} lines)
            </button>
          </>
        ))}
      </div>
    </div>
  );
}
