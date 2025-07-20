
import { createRoot } from 'react-dom/client';
import './index.css'

function App(){
    return(
    <div className='bg-red-600'>RAM</div>
    )
}


const rootElement  = document.getElementById('root')
const root = createRoot(rootElement);
root.render(<App/>)