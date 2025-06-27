import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentPage from "./pages/RentPage";
import AdminPage from "./pages/AdminPage";
import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rent" element={<RentPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
