import React from 'react'
import { Link } from 'react-router-dom'

const Contests = () => {
  return (
    <div className='main-container bg-slate-800 text-white min-h-[669px]'>
      No Current Contests
      <button className="bg-sky-700 text-white ml-[1300px] font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
        <Link to='/createContest'>Create Contest</Link>
      </button>
    </div>
  )
}

export default Contests
