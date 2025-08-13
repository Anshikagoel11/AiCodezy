
import { Routes, Route , Navigate , useLocation} from 'react-router'
import AuthPage from './auth/authPage'
import { useSelector ,useDispatch} from 'react-redux'
import {checkAuth} from './redux/authSlicer'
import { useEffect } from 'react'
import Home from './pages/Home'
import Cursor from './Ui/cursor'
import Navbar from './pages/navbar'
import AllProblems from './pages/allProblems'
import ProblemPage from './pages/problemPage'

function App() {

  //checking whether user is already authenticated or not 
  const {isAuthenticated ,loading}  = useSelector((state) => state.auth)
  const dispatch = useDispatch();
 const location = useLocation();
 const currentPath = location.pathname;

  useEffect(()=>{
  dispatch(checkAuth());
  },[])  

 if(loading){
  return(
    <div className='min-h-screen flex items-center justify-center bg-[#0f0f0f]'>
    </div>
  )
 }

  return (
    <>
    <Cursor/>
    {currentPath != '/auth' &&  <Navbar/>}
   
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth' element={isAuthenticated? <Navigate to='/'/> : <AuthPage/>}></Route>
        <Route path='/problems' element={<AllProblems/>}></Route>
         <Route path='/problem/:id' element={<ProblemPage/>}></Route>
      </Routes>
     
    </>
  )
}

export default App
