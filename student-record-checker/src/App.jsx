import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Home from './pages/Home';
import CheckerPage from './pages/CheckerPage';
import CorrectorPage from './pages/CorrectorPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/" className="nav-brand">
          <BookOpen size={24} />
          생기부 점검
        </Link>
        <div className="nav-links">
          <Link to="/checker" className="nav-link">점검자</Link>
          <Link to="/corrector" className="nav-link">수정자</Link>
          <Link to="/admin" className="nav-link">관리자</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checker" element={<CheckerPage />} />
          <Route path="/corrector" element={<CorrectorPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
