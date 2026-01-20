import { useMemo } from 'react';
import TodoItem from './TodoItem';
import { isToday, isThisWeek, isPast } from '../utils/dateUtils';
import styles from './TodoList.module.css';

function TodoList({ todos, folders, activeTab, selectedFolder, onToggleTodo, onEditTodo, onDeleteTodo }) {
  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    // 폴더 필터링
    if (selectedFolder) {
      filtered = filtered.filter(todo => todo.folderId === selectedFolder);
    }

    // 탭 필터링
    if (activeTab === 'today') {
      filtered = filtered.filter(todo => isToday(todo.dueDate));
    } else if (activeTab === 'week') {
      filtered = filtered.filter(todo => isThisWeek(todo.dueDate));
    } else if (activeTab === 'later') {
      filtered = filtered.filter(todo => {
        if (!todo.dueDate) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todoDate = new Date(todo.dueDate);
        todoDate.setHours(0, 0, 0, 0);
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() + (6 - today.getDay()));
        return todoDate > weekEnd;
      });
    }

    // 정렬: 미완료 우선, 날짜 순
    filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      const dateCompare = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateCompare !== 0) return dateCompare;
      
      if (!a.dueTime && !b.dueTime) return 0;
      if (!a.dueTime) return 1;
      if (!b.dueTime) return -1;
      return a.dueTime.localeCompare(b.dueTime);
    });

    return filtered;
  }, [todos, activeTab, selectedFolder]);

  const stats = useMemo(() => {
    const total = filteredTodos.length;
    const completed = filteredTodos.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [filteredTodos]);

  return (
    <div className={styles.todoList}>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.pending}</span>
          <span className={styles.statLabel}>할 일</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.completed}</span>
          <span className={styles.statLabel}>완료</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>전체</span>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className={styles.empty}>
          <p>할 일이 없습니다.</p>
          <p className={styles.emptyHint}>새로운 할 일을 추가해보세요! ✨</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              folders={folders}
              onToggle={onToggleTodo}
              onEdit={onEditTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
