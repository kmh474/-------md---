import React, { useState, useEffect, useMemo } from 'react';
import { getStorageData, addRecord, getTeacherByMapping } from '../utils/storage';

const CheckerPage = () => {
  const [settings, setSettings] = useState([]);
  const [formData, setFormData] = useState({
    grade: '',
    class: '',
    subject: '',
    teacher: '',
    contentBefore: '',
    contentAfter: ''
  });

  useEffect(() => {
    const data = getStorageData();
    setSettings(data.settings);
  }, []);

  const grades = useMemo(() => [...new Set(settings.map(s => s.grade))], [settings]);

  const classes = useMemo(() => {
    if (!formData.grade) return [];
    return [...new Set(settings.filter(s => s.grade === formData.grade).map(s => s.class))];
  }, [formData.grade, settings]);

  const subjects = useMemo(() => {
    if (!formData.grade || !formData.class) return [];
    return [...new Set(settings.filter(s => s.grade === formData.grade && s.class === formData.class).map(s => s.subject))];
  }, [formData.grade, formData.class, settings]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      if (name === 'grade') { next.class = ''; next.subject = ''; next.teacher = ''; }
      else if (name === 'class') { next.subject = ''; next.teacher = ''; }
      if (next.grade && next.class && next.subject) {
        next.teacher = getTeacherByMapping(next.grade, next.class, next.subject);
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.grade || !formData.class || !formData.subject || !formData.contentBefore || !formData.contentAfter) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    addRecord({
      grade: formData.grade,
      class: formData.class,
      subject: formData.subject,
      teacher: formData.teacher,
      contentBefore: formData.contentBefore,
      contentAfter: formData.contentAfter
    });
    alert('저장되었습니다.');
    setFormData({ grade: '', class: '', subject: '', teacher: '', contentBefore: '', contentAfter: '' });
  };

  return (
    <div>
      <div className="section-eyebrow section-eyebrow-sky">수정 요청 사항 입력</div>

      <div className="ribbon-card">
        <div className="ribbon-card-title">점검자용 — 수정 필요 내용 등록</div>
        <div className="ribbon-card-body ribbon-card-body-sky">
          <form onSubmit={handleSubmit}>
            {/* Grade / Class / Subject */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">학년</label>
                <select name="grade" value={formData.grade} onChange={handleSelectChange}>
                  <option value="">— 선택 —</option>
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">반</label>
                <select name="class" value={formData.class} onChange={handleSelectChange} disabled={!formData.grade}>
                  <option value="">— 선택 —</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">과목</label>
                <select name="subject" value={formData.subject} onChange={handleSelectChange} disabled={!formData.class}>
                  <option value="">— 선택 —</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Teacher (auto-filled) */}
            <div className="form-group">
              <label className="form-label">담당 교사 (자동 입력)</label>
              <input
                type="text"
                value={formData.teacher}
                readOnly
                disabled
                placeholder="학년, 반, 과목을 선택하면 자동 입력됩니다"
              />
            </div>

            <hr className="period-rule" />

            {/* Content Before / After side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">⚠ 수정 전 (오류 내용)</label>
                <textarea
                  rows="5"
                  value={formData.contentBefore}
                  onChange={(e) => setFormData({ ...formData, contentBefore: e.target.value })}
                  placeholder="예) 핵교"
                ></textarea>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">✔ 수정 요청 내용</label>
                <textarea
                  rows="5"
                  value={formData.contentAfter}
                  onChange={(e) => setFormData({ ...formData, contentAfter: e.target.value })}
                  placeholder="예) 학교"
                ></textarea>
              </div>
            </div>

            <div style={{ marginTop: '16px', borderTop: '1px solid #000', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn">저장하기 →</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckerPage;
