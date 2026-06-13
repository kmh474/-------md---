import React, { useState } from 'react';
import { getStorageData, updateRecordStatus } from '../utils/storage';

const CorrectorPage = () => {
  const [searchName, setSearchName] = useState('');
  const [records, setRecords] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchName.trim()) { alert('이름을 입력해주세요.'); return; }
    const data = getStorageData();
    const myRecords = data.records.filter(r => r.teacher === searchName.trim());
    setRecords(myRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setHasSearched(true);
  };

  const handleResolve = (id) => {
    if (window.confirm('수정 완료로 표시하시겠습니까?')) {
      updateRecordStatus(id, 'resolved');
      setRecords(records.map(r => r.id === id ? { ...r, status: 'resolved', resolvedAt: new Date().toISOString() } : r));
    }
  };

  const pending = records.filter(r => r.status === 'pending');
  const resolved = records.filter(r => r.status === 'resolved');

  return (
    <div>
      <div className="section-eyebrow section-eyebrow-periwinkle">수정 사항 확인</div>

      <div className="ribbon-card">
        <div className="ribbon-card-title">수정자용 — 이름으로 검색</div>
        <div className="ribbon-card-body ribbon-card-body-periwinkle">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="form-label">담당 교사(수정자) 이름</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="예) 홍길동"
              />
            </div>
            <button type="submit" className="btn">검색 →</button>
          </form>
        </div>
      </div>

      {hasSearched && (
        <>
          {records.length === 0 ? (
            <div className="alert-red">
              <strong style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase' }}>검색 결과 없음</strong><br />
              "{searchName}" 이름으로 등록된 수정 요청이 없습니다.
            </div>
          ) : (
            <>
              {/* Pending */}
              <div style={{ marginBottom: '32px' }}>
                <div className="section-eyebrow section-eyebrow-salmon" style={{ fontSize: '20px', padding: '12px 16px', marginBottom: 0 }}>
                  수정 대기 ({pending.length}건)
                </div>
                <div className="table-container">
                  {pending.length === 0 ? (
                    <div style={{ padding: '16px', fontFamily: 'Times New Roman, serif', borderTop: '1px solid #000' }}>
                      ✅ 대기 중인 수정 사항이 없습니다.
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>대상</th>
                          <th>수정 전 (오류)</th>
                          <th>수정 요청 내용</th>
                          <th>요청일시</th>
                          <th>처리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pending.map(r => (
                          <tr key={r.id}>
                            <td style={{ whiteSpace: 'nowrap', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                              {r.grade} {r.class}<br />{r.subject}
                            </td>
                            <td style={{ color: '#c41525', fontWeight: 700 }}>{r.contentBefore}</td>
                            <td style={{ color: '#1a6b1a', fontWeight: 700 }}>{r.contentAfter}</td>
                            <td style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>{new Date(r.createdAt).toLocaleString()}</td>
                            <td>
                              <button className="btn btn-success" onClick={() => handleResolve(r.id)}>완료 처리</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Resolved */}
              {resolved.length > 0 && (
                <div>
                  <div className="section-eyebrow" style={{ fontSize: '20px', padding: '12px 16px', background: '#c0d4a7', marginBottom: 0 }}>
                    수정 완료 ({resolved.length}건)
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>대상</th>
                          <th>수정 전 (오류)</th>
                          <th>수정 요청 내용</th>
                          <th>완료일시</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resolved.map(r => (
                          <tr key={r.id}>
                            <td style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                              {r.grade} {r.class}<br />{r.subject}
                            </td>
                            <td style={{ color: '#777' }}><s>{r.contentBefore}</s></td>
                            <td>{r.contentAfter}</td>
                            <td style={{ fontSize: '12px' }}>{r.resolvedAt ? new Date(r.resolvedAt).toLocaleString() : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CorrectorPage;
