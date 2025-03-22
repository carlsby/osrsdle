import { BrowserRouter as Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classic from "./pages/Classic";
import Bosses from "./pages/Bosses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classic" element={<Classic />} />
      <Route path="/bosses" element={<Bosses />} />
    </Routes>
  );
}

export default App;
