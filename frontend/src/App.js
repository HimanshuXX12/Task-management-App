
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import Home from './Pages/Home/Home';
import './tailwind.css'
function App() {
  return (
    <div className="App">
         <BrowserRouter>
           <Routes>
             <Route path='*' element={localStorage.getItem("token")?<Home/>:<LoginSignUp/>}/>
             <Route path='/login' element={localStorage.getItem("token")?<Home/>:<LoginSignUp/>}/>
           </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
