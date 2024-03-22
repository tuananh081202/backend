import './App.css'
import './css/styles.css'
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Main from "./layouts/Main";
import Login from "./components/Login";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import Layout from "./layouts/Layout";
import UserList from "./components/User/UserList"; 
import UserAdd from "./components/User/UserAdd";
import AccountList from "./components/Account/AccountList";
import UserUpdate from './components/User/UserUpdate';
import AccountAdd from './components/Account/AccountAdd';
import AccountUpdate from './components/Account/AccountUpdate';
function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
      <Route element={<Main />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />

          <Route path='/api/user' element={<UserList />} />
          <Route path='/api/user/add' element={<UserAdd />} />
          <Route path='/api/user/edit/:id' element={<UserUpdate />} />
          
          <Route path='/api/account' element={<AccountList/>}/>
          <Route path='/api/account/add' element={<AccountAdd/>}/>
          <Route path='/api/account/edit/:id' element={<AccountUpdate />} />

        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
