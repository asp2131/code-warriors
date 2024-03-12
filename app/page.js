"use client";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef, useState } from "react";
import { GameProvider } from "@/context/gameContext";

import { useSpring, useSpringRef } from "@react-spring/web";
import Editor from "@/components/editor";
import World from "@/components/world";

// Little helpers ...
const url = (name, wrap) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const extensions = [javascript()];

export default function Index() {
  const editor = useRef();
  const enemy = useSpringRef();
  const [position, setPosition] = useState({ x: 100, y: 400 });
  const [logs, setLogs] = useState([]);
  const [code, setCode] = useState("// Write your code here");
  const [isPlaying, setIsPlaying] = useState(true);
  // Intercept console.log
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    onChange: (value, viewUpdate) => {
      setCode(value);
    },
  });

  const enemySprings = useSpring({
    // ref: enemy,
    from: { background: "#ff6d6d", y: 750, x: 100 },
    to: [{ x: 180 }, { y: 700 }, { x: 100 }, { y: 750 }],
    config: {
      mass: 5,
      friction: 120,
      tension: 120,
    },
    loop: true,
  });

  const toggleAnimation = () => {
    // if(enemy.current[0].idle){
    // enemy.start();
    // } else {
    //   enemy.stop();
    // }
  };

  // Override console.log
  const originalConsoleLog = console.log;

  useEffect(() => {
    console.log = (...args) => {
      setLogs((currentLogs) => [
        ...currentLogs,
        ...args.map((arg) => JSON.stringify(arg)),
      ]);
      originalConsoleLog(...args);
    };

    // Revert override when component unmounts
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  // Mock function to simulate executing code from the editor

  // Custom function to execute the editor's code
  const executeCode = () => {
    // Capture console.log outputs
    const originalConsoleLog = console.log;
    const logOutputs = [];
    console.log = (...args) => {
      logOutputs.push(args.join(" "));
      originalConsoleLog(...args);
    };

    try {
      // Assuming your CodeMirror instance's current value is in a state or can be accessed
      // You might need to adapt this part to fit how you're storing/accessing the editor's content
      new Function(code)();
    } catch (err) {
      logOutputs.push(err.toString());
    }

    // Restore the original console.log
    console.log = originalConsoleLog;

    // Update state with captured outputs
    setLogs(logOutputs);
  };

  const clearConsole = () => {
    setLogs([]);
  };

  const handleClick = (event) => {
    event.preventDefault();
    // Get the bounding rectangle of the target container
    const rect = event.currentTarget.getBoundingClientRect();

    // Calculate the new position based on the click position
    // Subtract the circle size to center the circle on the cursor
    const x = event.clientX - rect.left - 25; // Assuming the circle has a diameter of 50px
    const y = event.clientY - rect.top - 25; // Adjust the offset as per your circle's size

    setPosition({ x, y });
  };

  return (
    <GameProvider>
      <div className="flex h-screen">
        <World
          toggleAnimation={toggleAnimation}
          handleClick={handleClick}
          position={position}
          springs={enemySprings}
        />
        <Editor
          editor={editor}
          executeCode={executeCode}
          clearConsole={clearConsole}
          logs={logs}
        />
      </div>
    </GameProvider>
  );
}
