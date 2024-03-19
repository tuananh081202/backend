import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Main from "./layouts/Main";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<Dashboard />} />

      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
