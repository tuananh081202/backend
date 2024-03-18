import { Route,Routes } from 'react-router-dom';
import './App.css';
import './css/sb-admin-2.css'
import Dashboard from './components/Dashboard';
import Main from './layouts/Main';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  return (
    <Routes>
      <Route element={<Main/>}>
        <Route path='/' element={<Dashboard/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
    
  );
}

export default App;
