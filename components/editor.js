import React from 'react';
import {AnimatedTooltip} from "@/components/toolwarp"

const Editor = ({
    editor,
    executeCode,
    clearConsole,
    logs,
}) => {
  return (
    <div className="w-1/2 flex flex-col ">
        {/* CodeMirror Editor */}
        <div className="h-1/2 p-4" ref={editor} />

        <div className="flex-row space-x-2 p-4">
          {/* Execute Button */}
          <button
            className="mx-auto text-xl mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            onClick={executeCode}
          >
            Execute
          </button>
          {/* Execute Button */}
          <button
            className="mx-auto text-xl mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
            onClick={clearConsole}
          >
            Clear
          </button>
        </div>
        {/* Console Output */}
        <div className="flex-1 overflow-auto bg-gray-800 text-white p-4">
          <ul>
            <p className="font-bold text-xl text-white">Console Output</p>
            {logs.map((log, index) => (
              <li className="font-bold text-xl text-white" key={index}>{log}</li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Editor;
