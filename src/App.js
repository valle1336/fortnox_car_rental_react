
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentPage from "./pages/RentPage";
// Importera ev. fler sidor här

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rent" element={<RentPage />} />
        {/* Lägg till fler routes här */}
      </Routes>
    </Router>
  );
}

export default App;
