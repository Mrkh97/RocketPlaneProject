import Chart from "./components/Chart";
import Navbar from "./components/Navbar"
import Home from "./components/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CalculateRatio from "./components/CalculateRatio";

function App() {

  return (<Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chart" element={<Chart/>} />
      <Route path="/calculateratio" element={<CalculateRatio/>} />
    </Routes>
  </Router>
  );
}

export default App;
