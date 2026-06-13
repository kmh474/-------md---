import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { getStorageData, addSetting, deleteSetting, deleteRecord } from '../utils/storage';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [data, setData] = useState({ settings: [], records: [] });
  const [newSetting, setNewSetting] = useState({ grade: '', class: '', subject: '', teacher: '' });

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setData(getStorageData());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleAddSetting = (e) => {
    e.preventDefault();
    if (!newSetting.grade || !newSetting.class || !newSetting.subject || !newSetting.teacher) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    addSetting(newSetting);
    setNewSetting({ grade: '', class: '', subject: '', teacher: '' });
    loadData();
  };

  const handleDeleteSetting = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteSetting(id);
      loadData();
    }
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('정말 이 기록을 삭제하시겠습니까?')) {
      deleteRecord(id);
      loadData();
    }
  };

  const handleExportExcel = () => {
    if (data.records.length === 0) {
      alert('출력할 데이터가 없습니다.');
      return;
    }

    const excelData = data.records.map(r => ({
      '상태': r.status === 'pending' ? '수정 대기' : '수정 완료',
      '학년': r.grade,
      '반': r.class,
      '과목': r.subject,
      '담당교사(수정자)': r.teacher,
      '수정 전(오류 내용)': r.contentBefore,
      '수정 요청 내용': r.contentAfter,
      '요청일시': new Date(r.createdAt).toLocaleString(),
      '완료일시': r.resolvedAt ? new Date(r.resolvedAt).toLocaleString() : '-'
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "생기부점검내역");
    XLSX.writeFile(wb, `생기부_점검내역_${new Date().getTime()}.xlsx`);
  };

  if (!isAuthenticated) {
    return (
      <div className="glass-card" style={{ maxWidth: '400px', margin: '10vh auto' }}>
        <h2 className="title">관리자 로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="비밀번호를 입력하세요 (기본: admin123)"
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>로그인</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>전체 점검 내역 관리</h2>
          <button className="btn btn-success" onClick={handleExportExcel}>
            엑셀 다운로드 (.xlsx)
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>상태</th>
                <th>대상</th>
                <th>수정 전(오류)</th>
                <th>수정 요청</th>
                <th>수정자</th>
                <th>요청일시</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {data.records.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>데이터가 없습니다.</td></tr>
              ) : (
                data.records.map(r => (
                  <tr key={r.id}>
                    <td>
                      <span className={`badge badge-${r.status}`}>
                        {r.status === 'pending' ? '수정 대기' : '수정 완료'}
                      </span>
                    </td>
                    <td>{r.grade} {r.class} {r.subject}</td>
                    <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.contentBefore}
                    </td>
                    <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--primary)' }}>
                      {r.contentAfter}
                    </td>
                    <td>{r.teacher}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleDeleteRecord(r.id)}>삭제</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card">
        <h2>기초 설정 관리 (학년/반/과목 매핑)</h2>
        <form onSubmit={handleAddSetting} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: '1rem', alignItems: 'end', marginBottom: '2rem' }}>
          <div>
            <label className="form-label">학년</label>
            <input type="text" value={newSetting.grade} onChange={e => setNewSetting({...newSetting, grade: e.target.value})} placeholder="예: 1학년" />
          </div>
          <div>
            <label className="form-label">반</label>
            <input type="text" value={newSetting.class} onChange={e => setNewSetting({...newSetting, class: e.target.value})} placeholder="예: 1반" />
          </div>
          <div>
            <label className="form-label">과목</label>
            <input type="text" value={newSetting.subject} onChange={e => setNewSetting({...newSetting, subject: e.target.value})} placeholder="예: 국어" />
          </div>
          <div>
            <label className="form-label">담당교사</label>
            <input type="text" value={newSetting.teacher} onChange={e => setNewSetting({...newSetting, teacher: e.target.value})} placeholder="예: 홍길동" />
          </div>
          <button type="submit" className="btn">추가</button>
        </form>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>학년</th>
                <th>반</th>
                <th>과목</th>
                <th>담당교사</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {data.settings.map(s => (
                <tr key={s.id}>
                  <td>{s.grade}</td>
                  <td>{s.class}</td>
                  <td>{s.subject}</td>
                  <td>{s.teacher}</td>
                  <td>
                    <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleDeleteSetting(s.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
