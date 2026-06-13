import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Edit3, Settings } from 'lucide-react';

const Home = () => {
  return (
    <div className="glass-card" style={{ textAlign: 'center' }}>
      <h1 className="title">환영합니다!</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        역할에 맞는 메뉴를 선택해 주세요.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <Link to="/checker" style={{ textDecoration: 'none' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
            <div style={{ padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
              <CheckSquare size={48} />
            </div>
            <h3 style={{ color: 'var(--text-main)' }}>점검자</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>생기부를 점검하고 수정이 필요한 내용을 등록합니다.</p>
          </div>
        </Link>

        <Link to="/corrector" style={{ textDecoration: 'none' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--success)' }}>
              <Edit3 size={48} />
            </div>
            <h3 style={{ color: 'var(--text-main)' }}>수정자</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>본인에게 할당된 수정 요청 목록을 확인하고 처리합니다.</p>
          </div>
        </Link>

        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
            <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: 'var(--warning)' }}>
              <Settings size={48} />
            </div>
            <h3 style={{ color: 'var(--text-main)' }}>관리자</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>기초 설정 관리 및 전체 점검 내역을 엑셀로 다운로드합니다.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
