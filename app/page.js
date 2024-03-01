"use client"
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef, useState } from "react";
import MoveableCircle from '@/components/character'; // Adjust the path as needed
import { Parallax, ParallaxLayer } from '@react-spring/parallax'


// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const extensions = [javascript()];

export default function Index() {
  const editor = useRef();

  const [logs, setLogs] = useState([]);
  const [code, setCode] = useState("// Write your code here");
  // Intercept console.log
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    onChange: (value, viewUpdate) => {
      setCode(value);
    },
  });
  // A unique identifier for logs coming from your executed code
  const logIdentifier = "__myAppLog__";

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

  return (
    <div className="flex h-screen">
      {/* Instructions Panel */}
      <div className="w-1/2 p-4 overflow-auto bg-gray-100">
        <h2 className="font-bold text-lg">HackWorld</h2>
       <Parallax pages={3} style={{ top: '0', left: '0' }}>
        {/* <p>Here are your game instructions...</p> */}
        <MoveableCircle />
        </Parallax>
      </div>

      <div className="w-1/2 flex flex-col ">
        {/* CodeMirror Editor */}
        <div className="h-1/2 p-4" ref={editor} />

        <div className="flex-row space-x-2 p-4">
          {/* Execute Button */}
          <button
            className="mx-auto mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            onClick={executeCode}
          >
            Execute
          </button>
          {/* Execute Button */}
          <button
            className="mx-auto mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            onClick={clearConsole}
          >
            Clear
          </button>
        </div>
        {/* Console Output */}
        <div className="flex-1 overflow-auto bg-gray-800 text-white p-4">
          <ul>
            <p className="font-bold text-lg text-white">Console Output</p>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Game Panel */}
      {/* <div className="w-1/4 p-4 overflow-auto bg-gray-200">
      <h2 className="font-bold text-lg">Game Panel</h2>
      <p>Game visualization will go here.</p>
    </div> */}
    </div>
  );
}
