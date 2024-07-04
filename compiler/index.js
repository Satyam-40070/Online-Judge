const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { generateFile } = require('./generateFile.js');
const { generateInputFile } = require('./generateInput.js');
const { executeCpp } = require('./executeCpp.js');
const { executeJava } = require('./executeJava.js');
const { executePy } = require('./executePy.js');
const { executeJs } = require('./executeJs.js');

const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const executeCode = async (language, filepath, inputPath) => {
    switch (language) {
        case 'cpp':
            console.log("going for cpp execution");
            return executeCpp(filepath, inputPath);
        case 'java':
          console.log("going for java execution");
            return executeJava(filepath, inputPath);
        case 'py':
          console.log("going for py execution");
            return executePy(filepath, inputPath);
        case 'js':
          console.log("going for js execution");
            return executeJs(filepath, inputPath);
        default:
            throw new Error('Unsupported language');
    }
};

app.post('/run', async (req, res) => {
  const { language, code, input } = req.body;
  console.log(req.body);

  if (code === undefined) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  try {
    const filePath = generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output1 = await executeCode(language,filePath, inputPath);
    console.log(output1);
    res.status(200).json({ filePath, inputPath, output1 });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
});

app.post('/submit/:id', async (req, res) => { // Modified to get the 'id' parameter from the URL
  const { language, code } = req.body;
  const { id } = req.params; // Get the 'id' parameter from the request URL

  if (code === undefined) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  try {
    const { data } = await axios.get(`http://localhost:8000/problem/${id}`);
    const filePath = await generateFile(language, code);
    let allPassed = true;
    let results = [];

    for (const [index, testCase] of data.TestCases.entries()) { // Iterate with index
      const testCaseInputPath = await generateInputFile(testCase.input);
      const testCaseOutput = await executeCode(language, filePath, testCaseInputPath);
      const passed = testCaseOutput.trim() === testCase.expectedOutput.trim();
      
      results.push({ testCase: `TestCase ${index + 1}`, passed, output: testCaseOutput.trim() });

      if (!passed) {
        allPassed = false;
        break;
      }
    }

    const verdict = allPassed ? 'Accepted' : 'Wrong Answer';
    res.status(200).json({ success: true, verdict, results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
