// 날짜 유틸리티 함수들

export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const compareDate = new Date(date);
  return (
    compareDate.getDate() === today.getDate() &&
    compareDate.getMonth() === today.getMonth() &&
    compareDate.getFullYear() === today.getFullYear()
  );
};

export const isThisWeek = (date) => {
  if (!date) return false;
  const today = new Date();
  const compareDate = new Date(date);
  
  // 이번 주의 시작 (일요일)
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);
  
  // 이번 주의 끝 (토요일)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  
  return compareDate >= weekStart && compareDate <= weekEnd;
};

export const isPast = (date) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

export const formatDateTime = (date, time) => {
  if (!date) return '';
  const dateStr = formatDate(date);
  if (!time) return dateStr;
  return `${dateStr} ${time}`;
};
