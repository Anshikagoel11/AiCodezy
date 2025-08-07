
import { Routes, Route , Navigate} from 'react-router'
import AuthPage from './auth/authPage'
import { useSelector ,useDispatch} from 'react-redux'
import {checkAuth} from './redux/authSlicer'
import { useEffect } from 'react'
import Home from './Home'
import Cursor from './Ui/cursor'
import Navbar from './navbar'
import AllProblems from './Problems'
import LoadingDots from './Ui/loadingdots'

function App() {

  //checking whether user is already authenticated or not 
  const {isAuthenticated ,loading}  = useSelector((state) => state.auth)
  const dispatch = useDispatch();

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
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/auth' element={isAuthenticated? <Navigate to='/'/> : <AuthPage/>}></Route>
        <Route path='/problems' element={<AllProblems/>}></Route>
        
      </Routes>
     
    </>
  )
}

export default App
