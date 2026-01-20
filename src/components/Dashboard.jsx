import { useMemo } from 'react';
import { isToday, formatTime } from '../utils/dateUtils';
import styles from './Dashboard.module.css';

function Dashboard({ todos, folders, onEditTodo }) {
  const todayTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed && isToday(todo.dueDate))
      .sort((a, b) => {
        if (!a.dueTime && !b.dueTime) return 0;
        if (!a.dueTime) return 1;
        if (!b.dueTime) return -1;
        return a.dueTime.localeCompare(b.dueTime);
      });
  }, [todos]);

  const getFolderColor = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.color : '#e0e0e0';
  };

  const getFolderName = (folderId) => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : '없음';
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2 className={styles.title}>☀️ 오늘의 일정</h2>
        <p className={styles.date}>
          {new Date().toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}
        </p>
      </div>

      {todayTodos.length === 0 ? (
        <div className={styles.empty}>
          <p>오늘 할 일이 없습니다! 🎉</p>
        </div>
      ) : (
        <div className={styles.todoGrid}>
          {todayTodos.map(todo => (
            <div 
              key={todo.id} 
              className={styles.todoCard}
              onClick={() => onEditTodo(todo)}
              style={{ borderLeftColor: getFolderColor(todo.folderId) }}
            >
              <div className={styles.todoHeader}>
                <h3 className={styles.todoTitle}>{todo.title}</h3>
                {todo.dueTime && (
                  <span className={styles.time}>{formatTime(todo.dueTime)}</span>
                )}
              </div>
              {todo.memo && <p className={styles.memo}>{todo.memo}</p>}
              <div className={styles.todoFooter}>
                <span 
                  className={styles.folder}
                  style={{ backgroundColor: getFolderColor(todo.folderId) }}
                >
                  {getFolderName(todo.folderId)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
