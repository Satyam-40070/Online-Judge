import './App.css'
import Navbar from './Components/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Problems from './Pages/Problems.jsx';
import Prob_editor from './Pages/Prob_editor.jsx';
import CreateProb from './Pages/CreateProb.jsx';
import Contests from './Pages/Contests.jsx';
import CreateContest from './Pages/CreateContest.jsx';
import ForgotPassword from './Components/Forgotpasssword.jsx';
import ResetPassword from './Components/ResetPassword.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/logout' element={<Home/>}/>
          <Route path='/verify-email' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/problems' element={<Problems/>}/>
          <Route path='/editor/:id' element={<Prob_editor/>}/>
          <Route path='/createProb' element={<CreateProb/>}/>
          <Route path='/contest' element={<Contests/>}/>
          <Route path='/CreateContest' element={<CreateContest/>}/>
          <Route path='/forgot-pass' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
