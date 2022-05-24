import Navbar from "./components/Navbar"
import Home from "./components/Home";
import CalculateRatio from "./components/CalculateRatio";
import ConstSpeed from "./components/ConstSpeed";
import VariableSpeed from "./components/VariableSpeed"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HttpChart from "./components/HttpChart";



function App() {
  return (<Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/constspeed" element={<ConstSpeed/>} />
      <Route path="/variablespeed" element={<VariableSpeed/>} />
      <Route path="/calculateratio" element={<CalculateRatio/>} />
      <Route path="/httpchart" element={<HttpChart/>} />
    </Routes>
  </Router>
  );
}

export default App;
