import React, {useState, useEffect} from 'react'
import {Editor} from '@monaco-editor/react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Lang_selector from '../Components/Lang_selector.jsx';

const Prob_editor = () => {
  const {id} = useParams();
  const [code, setCode] = useState(` #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);

  const [language, setLanguage] = useState('cpp')
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('')
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the problem details from the backend
    const fetchProblem = async () => {
      try {
        if (!id) {
          throw new Error('Problem ID is undefined');
        }
        const response = await axios.get(`http://localhost:8000/problem/${id}`);
        const problemData = response.data;
        console.log('Problem data fetched:', problemData); 
        setProblem(problemData);
        //setCode(problemData.initialCode || ''); // Set the initial code
        //setLanguage(problemData.language || 'cpp'); // Set the language
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProblem();
    } else {
      setError('Problem ID is undefined');
      setLoading(false);
    }
  }, [id]);


  const onSelect = (language)=>{
    setLanguage(language);
  }

  const handleSubmit = async ()=>{
    console.log('handleSubmit called');
    const payload = {
      language,
      code,
      input
    };

    try {
      console.log(payload);
      const { data } = await axios.post(`http://localhost:5000/run`, payload);
      console.log(data);
      setOutput(data.output1);
    } catch (error) {
      console.log(error.response);
    }
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!problem) return <div>No problem data available.</div>;

  return (
    <div className='m-5 p-3 h-[auto] border border-b-2 flex '>
      <div className="content mr-6 w-2/5 h-[auto] border border-b-3">
      <h1 className="text-3xl">{problem.title}</h1>
        <p>Level: {problem.level}</p>
        <p>Description: {problem.description}</p>
        <p>Input Format: {problem.inputFormat}</p>
        <p>Output Format: {problem.outputFormat}</p>
      </div>
      
      <div className="editor h-[auto] w-3/5">
      
      <Lang_selector language={language} onSelect={onSelect}/>
      <Editor height="70vh" width='100%' theme='vs-dark' language={language} onChange={(value) => setCode(value)} value={code} />
      <div className='flex w-full'>
      <div  className="in w-1/2 mt-4 p-3 min-h-44 border border-gray-300 rounded-lg flex flex-col space-y-2">
      <h2 className="text-lg font-semibold mb-2">Input</h2>
      <textarea rows='5'
            cols='10'
            value={input}
            placeholder='Input'
            onChange={(e) => setInput(e.target.value)}></textarea>
      </div>
      <div className="in-out ml-5 w-1/2 mt-4 p-3 min-h-44 border border-gray-300 rounded-lg flex flex-col space-y-2">
      <h2 className="text-lg font-semibold mb-2">Output</h2>
        <p>{output}</p>
      </div>
      </div>
      <div className="buttons flex mt-6 justify-center space-x-8">
        <button onClick={handleSubmit} className='run-button  w-[150px] bg-green-800 h-[50px] mt-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>Run</button>
        <button className='submit-button w-[150px] bg-red-600 h-[50px] mt-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#a42f09] before:to-[rgb(238,76,58)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>Submit</button>
      </div>
      </div>
      
    </div>
  )
}

export default Prob_editor
