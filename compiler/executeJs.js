const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJs = (filepath, inputPath) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing JavaScript file: ${filepath}`);

    // Function to handle process execution
    const handleProcess = (process) => {
      let stdout = "";
      let stderr = "";

      process.stdout.on("data", (data) => {
        stdout += data;
      });

      process.stderr.on("data", (data) => {
        stderr += data;
      });

      process.on("close", (code) => {
        console.log(`Process exited with code: ${code}`);
        if (code !== 0) {
          console.error(`Error: ${stderr}`);
          return reject({
            error: new Error(`Process exited with code ${code}`),
            stderr,
          });
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return reject(new Error(`Runtime error: ${stderr}`));
        }
        resolve(stdout);
      });
    };

    if (inputPath) {
      console.log(`Reading input from: ${inputPath}`);
      fs.readFile(inputPath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading input file: ${err}`);
          return reject({ error: err });
        }

        // Spawn the node process and write the input data to stdin
        const process = spawn("node", [filepath]);
        handleProcess(process);

        // Write input data to the process's stdin
        process.stdin.write(data);
        process.stdin.end();
      });
    } else {
      // If no inputPath is provided, simply run the Node.js process
      const process = spawn("node", [filepath]);
      handleProcess(process);
    }
  });
};

module.exports = {
  executeJs,
};
