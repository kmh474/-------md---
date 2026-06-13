import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CheckerPage from './pages/CheckerPage';
import CorrectorPage from './pages/CorrectorPage';
import AdminPage from './pages/AdminPage';

function NavLinks() {
  const location = useLocation();
  return (
    <div className="nav-links">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        <span className="material-symbols-rounded">home</span> 홈
      </Link>
      <Link to="/checker" className={`nav-link ${location.pathname === '/checker' ? 'active' : ''}`}>
        <span className="material-symbols-rounded">edit_document</span> 점검자
      </Link>
      <Link to="/corrector" className={`nav-link ${location.pathname === '/corrector' ? 'active' : ''}`}>
        <span className="material-symbols-rounded">fact_check</span> 수정자
      </Link>
      <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
        <span className="material-symbols-rounded">settings</span> 관리자
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="page-inner">
        {/* Top Banner */}
        <div className="top-banner">
          <div className="top-banner-title">
            <span className="material-symbols-rounded">school</span>
            생기부 점검 프로그램
          </div>
          <div className="top-banner-subtitle">중학교 생활기록부 점검 및 수정 관리 시스템</div>
        </div>

        {/* Nav */}
        <NavLinks />

        {/* Main Content */}
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checker" element={<CheckerPage />} />
            <Route path="/corrector" element={<CorrectorPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <div className="footer-band">
          <div className="footer-nav">
            <Link to="/">홈</Link>
            <Link to="/checker">점검자 메뉴</Link>
            <Link to="/corrector">수정자 메뉴</Link>
            <Link to="/admin">관리자 메뉴</Link>
          </div>
          <div className="footer-copyright">
            본 프로그램은 교사 업무 지원용입니다.
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
