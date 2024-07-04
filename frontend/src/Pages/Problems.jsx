import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Problems = () => {
  const [problemsByCategory, setProblemsByCategory] = useState({});

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/problem');
        const problems = response.data;

        const categorizedProblems = problems.reduce((acc, problem) => {
          if (!acc[problem.category]) {
            acc[problem.category] = [];
          }
          acc[problem.category].push(problem);
          return acc;
        }, {});

        setProblemsByCategory(categorizedProblems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className='main-container min-h-[670px] h-[auto] bg-slate-800'>
      <button className="bg-sky-700 text-white ml-[1300px] mt-2 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
        <Link to='/createProb'>Create Problem</Link>
      </button>
      {Object.keys(problemsByCategory).map((category) => (
        <div key={category} className="category-section mx-12 my-8">
          <h1 className="text-3xl text-white pt-3 mb-4">{category}</h1>
          <div className="problems-row flex flex-wrap gap-10">
            {problemsByCategory[category].map((problem) => (
              <div key={problem._id} className="ar-p w-60 h-80 bg-gray-700 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                <div className="w-52 h-40 bg-sky-300 rounded-2xl"></div>
                <div>
                  <p className="font-extrabold">{problem.title}</p>
                  <p className="">Level: {problem.level}</p>
                </div>
                <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
                  <Link to={`/editor/${problem._id}`}>Solve</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Problems;
