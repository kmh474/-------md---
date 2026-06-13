import React, { useState } from 'react';
import { getStorageData, updateRecordStatus } from '../utils/storage';

const CorrectorPage = () => {
  const [searchName, setSearchName] = useState('');
  const [records, setRecords] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchName.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    
    const data = getStorageData();
    const myRecords = data.records.filter(r => r.teacher === searchName.trim());
    setRecords(myRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setHasSearched(true);
  };

  const handleResolve = (id) => {
    if (window.confirm('수정 완료로 표시하시겠습니까?')) {
      updateRecordStatus(id, 'resolved');
      
      // Update local state
      setRecords(records.map(r => r.id === id ? { ...r, status: 'resolved', resolvedAt: new Date().toISOString() } : r));
    }
  };

  return (
    <div className="glass-card">
      <h2 className="title">수정 사항 확인 (수정자용)</h2>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
        <input 
          type="text" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
          placeholder="본인(수정자) 이름을 입력하세요"
        />
        <button type="submit" className="btn">검색</button>
      </form>

      {hasSearched && (
        <div className="table-container">
          {records.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              수정해야 할 내역이 없습니다. 🎉
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>상태</th>
                  <th>대상</th>
                  <th>수정 전 (오류)</th>
                  <th>수정 요청 내용</th>
                  <th>요청일시</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r.id}>
                    <td>
                      <span className={`badge badge-${r.status}`}>
                        {r.status === 'pending' ? '수정 대기' : '수정 완료'}
                      </span>
                    </td>
                    <td>{r.grade} {r.class} {r.subject}</td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{r.contentBefore}</td>
                    <td style={{ whiteSpace: 'pre-wrap', color: 'var(--primary)', fontWeight: '500' }}>{r.contentAfter}</td>
                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                    <td>
                      {r.status === 'pending' && (
                        <button 
                          className="btn btn-success" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                          onClick={() => handleResolve(r.id)}
                        >
                          완료 처리
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CorrectorPage;
