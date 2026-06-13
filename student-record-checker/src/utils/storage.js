// Local Storage Key
const STORAGE_KEY = 'record_checker_data';

// Default mock data
const defaultData = {
  settings: [
    { id: 1, grade: '1학년', class: '1반', subject: '국어', teacher: '홍길동' },
    { id: 2, grade: '1학년', class: '1반', subject: '수학', teacher: '이몽룡' },
    { id: 3, grade: '1학년', class: '2반', subject: '국어', teacher: '성춘향' },
    { id: 4, grade: '2학년', class: '1반', subject: '영어', teacher: '임꺽정' },
  ],
  records: [
    {
      id: 1,
      grade: '1학년',
      class: '1반',
      subject: '국어',
      teacher: '홍길동',
      contentBefore: '1학기 진로활동 핵교 오타',
      contentAfter: '1학기 진로활동 학교 오타 수정',
      status: 'pending', // 'pending' | 'resolved'
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    }
  ]
};

// Initialize or get data
export const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

export const saveStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addRecord = (record) => {
  const data = getStorageData();
  data.records.push({
    ...record,
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    resolvedAt: null,
  });
  saveStorageData(data);
};

export const updateRecordStatus = (id, status) => {
  const data = getStorageData();
  const record = data.records.find(r => r.id === id);
  if (record) {
    record.status = status;
    record.resolvedAt = status === 'resolved' ? new Date().toISOString() : null;
    saveStorageData(data);
  }
};

export const deleteRecord = (id) => {
  const data = getStorageData();
  data.records = data.records.filter(r => r.id !== id);
  saveStorageData(data);
};

export const getTeacherByMapping = (grade, className, subject) => {
  const data = getStorageData();
  const mapping = data.settings.find(
    s => s.grade === grade && s.class === className && s.subject === subject
  );
  return mapping ? mapping.teacher : '';
};

export const addSetting = (setting) => {
  const data = getStorageData();
  data.settings.push({
    ...setting,
    id: Date.now()
  });
  saveStorageData(data);
};

export const deleteSetting = (id) => {
  const data = getStorageData();
  data.settings = data.settings.filter(s => s.id !== id);
  saveStorageData(data);
};
