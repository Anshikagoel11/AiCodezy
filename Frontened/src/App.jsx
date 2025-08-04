
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import AuthPage from './auth/authPage'

function App() {

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
