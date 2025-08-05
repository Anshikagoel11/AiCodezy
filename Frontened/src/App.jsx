
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import AuthPage from './auth/authPage'
import { useSelector ,useDispatch} from 'react-redux'
import {checkAuth} from './redux/authSlicer'
import { useEffect } from 'react'

function App() {

  //checking whether user is already authenticated or not 
  const {isAuthenticated}  = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(checkAuth());
  },[])

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
