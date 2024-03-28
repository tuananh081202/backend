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
import DashboardUserList from './components/Dashboard/DashboardUserList';
import DashboardAccountList from './components/Dashboard/DashboardAccountList';
import Account from './components/Account/Account';
import PasswordReset from './components/PasswordReset';
import PositionAdd from './components/Position/PositionAdd';
import PositionList from './components/Position/PositionList';
import PositionUpdate from './components/Position/PositionUpdate';
import UserRead from './components/User/UserRead';
import EmployeeTypeList from './components/EmployeeType/EmployeeTypeList';
import EmployeeTypeAdd from './components/EmployeeType/EmployeeTypeAdd';
import EmployeeTypeUpdate from './components/EmployeeType/EmployeeTypeUpdate';
import DepartmentAdd from './components/Department/DepartmentAdd';
import DepartmentList from './components/Department/DepartmentList';
import DepartmentUpdate from './components/Department/DepartmentUpdate';
function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
      <Route element={<Main />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/dashboard/userlist' element={<DashboardUserList/>}/>
          <Route path='/dashboard/accountlist' element={<DashboardAccountList/>}/>

          <Route path='/api/user' element={<UserList />} />
          <Route path='/api/user/add' element={<UserAdd />} />
          <Route path='/api/user/edit/:id' element={<UserUpdate />} />
          <Route path='/api/user/:id' element={<UserRead />} />
          
          <Route path='/api/position' element ={<PositionAdd/>}/>
          <Route path='/api/position/list' element={<PositionList/>}/>
          <Route path='/api/position/edit/:id' element={<PositionUpdate/>}/>

          <Route path='/api/account' element={<AccountList/>}/>
          <Route path='/api/account/add' element={<AccountAdd/>}/>
          <Route path='/api/account/edit/:id' element={<AccountUpdate />} />
          <Route path='/api/account/update' element={<Account/>}/>
           
          <Route path='/api/employeetype' element={<EmployeeTypeList/>}/>
          <Route path='/api/employeetype/add' element={<EmployeeTypeAdd/>}/>
          <Route path='/api/employeetype/edit/:id' element={<EmployeeTypeUpdate/>}/>
         
          <Route path='/api/department' element = {<DepartmentAdd/>}/>
          <Route path='/api/department/list' element = {<DepartmentList/>}/>
          <Route path='/api/department/edit/:id' element={<DepartmentUpdate/>}/>

        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/resetpassword' element={<PasswordReset/>}/>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
