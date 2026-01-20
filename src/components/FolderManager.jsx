import { useState } from 'react';
import styles from './FolderManager.module.css';

function FolderManager({ folders, selectedFolder, onSelectFolder, onAddFolder, onDeleteFolder }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (!newFolderName.trim()) {
      alert('폴더 이름을 입력해주세요.');
      return;
    }
    onAddFolder(newFolderName.trim());
    setNewFolderName('');
    setIsAdding(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddFolder();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewFolderName('');
    }
  };

  return (
    <div className={styles.folderManager}>
      <div className={styles.header}>
        <h3 className={styles.title}>📁 폴더</h3>
        <button
          className={styles.addBtn}
          onClick={() => setIsAdding(true)}
          title="폴더 추가"
        >
          +
        </button>
      </div>

      <div className={styles.folderList}>
        <button
          className={`${styles.folder} ${!selectedFolder ? styles.active : ''}`}
          onClick={() => onSelectFolder(null)}
        >
          <span className={styles.folderIcon}>📋</span>
          <span className={styles.folderName}>모든 폴더</span>
        </button>

        {folders.map(folder => (
          <div key={folder.id} className={styles.folderItem}>
            <button
              className={`${styles.folder} ${selectedFolder === folder.id ? styles.active : ''}`}
              onClick={() => onSelectFolder(folder.id)}
              style={{ 
                borderLeftColor: folder.color,
                background: selectedFolder === folder.id 
                  ? `${folder.color}15` 
                  : 'transparent'
              }}
            >
              <span 
                className={styles.colorDot}
                style={{ backgroundColor: folder.color }}
              />
              <span className={styles.folderName}>{folder.name}</span>
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDeleteFolder(folder.id)}
              title="폴더 삭제"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className={styles.addForm}>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="폴더 이름"
            className={styles.input}
            autoFocus
          />
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewFolderName('');
              }}
              className={styles.cancelBtn}
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleAddFolder}
              className={styles.saveBtn}
            >
              추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FolderManager;
