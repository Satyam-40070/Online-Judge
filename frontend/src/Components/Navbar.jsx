import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Navbar = () => {

  const {isAuthenticated, logout} = useAuth();


  return (
    <div>
      <nav className='flex  bg-slate-900'>
        <ul className='flex space-x-7 px-10 text-white h-12'>
        <li className='pt-4 cursor-pointer'><h2 className='text-purple-500'><Link to='/'>CodeVerse</Link></h2></li>
          <li className='pt-4 hover:first-line:underline'><Link to='/problems'>Problems</Link></li>
          <li className='pt-4 hover:first-line:underline'><Link to='/contest'>Contests</Link></li>
          <li className='pt-4 hover:first-line:underline'><Link to='/learn'>Learn</Link></li>
          
        </ul>
        {isAuthenticated ? (
          <button className='button-login ms-auto mx-8 mt-2 mb-2' onClick={logout}>Logout</button>
        ) : (
          <button className='button-login ms-auto mx-8 mt-2 mb-2'><Link to='/login'>Login</Link></button>
        )}
      </nav>
    </div>
  )
}

export default Navbar

