import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-layout">
      {/* 상단 제목 영역 */}
      <div className="home-hero">
        <span className="material-symbols-rounded home-hero-icon">manage_accounts</span>
        <h1 className="home-hero-title">역할을 선택하세요</h1>
        <p className="home-hero-desc">담당 역할에 맞는 메뉴로 이동하세요</p>
      </div>

      {/* 메인 카드 영역: 점검자(왼쪽) + 수정자(오른쪽) */}
      <div className="home-main-cards">
        {/* 점검자 카드 */}
        <Link to="/checker" className="home-role-card home-role-card--checker">
          <div className="home-role-card-icon-wrap">
            <span className="material-symbols-rounded home-role-icon">edit_document</span>
          </div>
          <div className="home-role-card-content">
            <h2 className="home-role-title">점검자</h2>
            <p className="home-role-desc">
              학년·반·과목을 선택하고 오류 내용과 수정 요청 내용을 등록합니다.
            </p>
          </div>
          <div className="home-role-card-arrow">
            <span className="material-symbols-rounded">arrow_forward</span>
          </div>
        </Link>

        {/* 수정자 카드 */}
        <Link to="/corrector" className="home-role-card home-role-card--corrector">
          <div className="home-role-card-icon-wrap">
            <span className="material-symbols-rounded home-role-icon">fact_check</span>
          </div>
          <div className="home-role-card-content">
            <h2 className="home-role-title">수정자</h2>
            <p className="home-role-desc">
              이름을 검색하면 본인에게 할당된 수정 사항이 모두 표시됩니다.
            </p>
          </div>
          <div className="home-role-card-arrow">
            <span className="material-symbols-rounded">arrow_forward</span>
          </div>
        </Link>
      </div>

      {/* 관리자 버튼 (하단 중앙, 톱니바퀴) */}
      <div className="home-admin-row">
        <Link to="/admin" className="home-admin-btn">
          <span className="material-symbols-rounded">settings</span>
          관리자
        </Link>
      </div>
    </div>
  );
};

export default Home;
