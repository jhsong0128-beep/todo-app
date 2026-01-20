import { useState, useEffect } from 'react';
import { formatDate } from '../utils/dateUtils';
import styles from './TodoForm.module.css';

function TodoForm({ todo, folders, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    dueDate: '',
    dueTime: '',
    folderId: ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        memo: todo.memo || '',
        dueDate: todo.dueDate ? formatDate(todo.dueDate) : '',
        dueTime: todo.dueTime || '',
        folderId: todo.folderId || ''
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    const todoData = {
      ...formData,
      title: formData.title.trim(),
      memo: formData.memo.trim(),
      dueDate: formData.dueDate || null,
      dueTime: formData.dueTime || null,
      folderId: formData.folderId || null
    };

    onSave(todoData);
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {todo ? '할 일 수정' : '새 할 일'}
          </h2>
          <button className={styles.closeBtn} onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              제목 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="할 일을 입력하세요"
              className={styles.input}
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>메모</label>
            <textarea
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              placeholder="메모를 입력하세요"
              className={styles.textarea}
              rows="3"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>날짜</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>시간</label>
              <input
                type="time"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>폴더</label>
            <select
              name="folderId"
              value={formData.folderId}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">폴더 선택 안함</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelBtn}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
            >
              {todo ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
