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
import DepartmentDetail from './components/Department/DepartmentDetail';
import SalaryList from './components/Salary/SalaryList';
import SalaryAdd from './components/Salary/SalaryAdd';
import SalaryUpdate from './components/Salary/SalaryUpdate';
import SalaryDetail from './components/Salary/SalaryDetail';
import TripList from './components/Trip/TripList';
import TripAdd from './components/Trip/TripAdd';
import TripUpdate from './components/Trip/TripUpdate';
import GroupUserList from './components/GroupUser/GroupUserList';
import GroupUserCreate from './components/GroupUser/GroupUserCreate';
import GroupUserUpdate from './components/GroupUser/GroupUserUpdate';
import GroupAdd from './components/GroupUser/GroupAdd';
import RewardList from './components/Reward/RewardList';
import RewardUpdate from './components/Reward/RewardUpdate';

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
          <Route path='/api/department/:id' element={<DepartmentDetail/>}/>
          
          <Route path='/api/salary' element = {<SalaryList/>}/>
          <Route path='/api/salary/add' element = {<SalaryAdd/>}/>
          <Route path='/api/salary/edit/:id' element = {<SalaryUpdate/>}/>
          <Route path='/api/salary/detail' element = {<SalaryDetail/>}/>

          <Route path='/api/trip' element = {<TripList/>}/>
          <Route path='/api/trip/add' element = {<TripAdd/>}/>
          <Route path='/api/trip/edit/:id' element = {<TripUpdate/>}/>

          <Route path='/api/groupuser' element = {<GroupUserList/>}/>
          <Route path='/api/groupuser/create' element = {<GroupUserCreate/>}/>
          <Route path='/api/groupuser/add' element = {<GroupAdd/>}/>
          <Route path='/api/groupuser/edit/:id' element = {<GroupUserUpdate/>}/>

          <Route path='/api/reward' element = {<RewardList/>}/>
          <Route path='/api/reward/edit/:id' element = {<RewardUpdate/>}/>
          

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
