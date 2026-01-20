import { formatDate, formatTime, isPast } from '../utils/dateUtils';
import styles from './TodoItem.module.css';

function TodoItem({ todo, folders, onToggle, onEdit, onDelete }) {
  const folder = folders.find(f => f.id === todo.folderId);
  const folderColor = folder ? folder.color : '#e0e0e0';
  const folderName = folder ? folder.name : '없음';
  const isOverdue = isPast(todo.dueDate) && !todo.completed;

  return (
    <div 
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ''} ${isOverdue ? styles.overdue : ''}`}
      style={{ borderLeftColor: folderColor }}
    >
      <div className={styles.content}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className={styles.checkbox}
          />
        </div>
        
        <div className={styles.details} onClick={() => onEdit(todo)}>
          <h3 className={styles.title}>{todo.title}</h3>
          {todo.memo && <p className={styles.memo}>{todo.memo}</p>}
          
          <div className={styles.meta}>
            {todo.dueDate && (
              <span className={styles.date}>
                📅 {formatDate(todo.dueDate)}
                {todo.dueTime && ` ${formatTime(todo.dueTime)}`}
              </span>
            )}
            <span 
              className={styles.folder}
              style={{ backgroundColor: folderColor }}
            >
              {folderName}
            </span>
          </div>
        </div>
        
        <button 
          className={styles.deleteBtn}
          onClick={() => onDelete(todo.id)}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
