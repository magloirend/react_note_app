import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header.js";
import NotesListPages from "./pages/NotesListPage.js";
import NotesPage from "./pages/NotesPage.js";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" exact element={<NotesListPages />} />
            <Route path="/note/:id" element={<NotesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
