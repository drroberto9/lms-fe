import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/employees" exact element={<Employees />} />
        <Route path="/home" exact element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
