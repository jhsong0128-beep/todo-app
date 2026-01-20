import { useState, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import TabFilter from './components/TabFilter';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FolderManager from './components/FolderManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import styles from './App.module.css';

// 기본 폴더 색상 팔레트 (파스텔 톤)
const FOLDER_COLORS = [
  '#FFB5E8', '#FF9CEE', '#FFCCF9', '#FCC2FF', '#F6A6FF',
  '#B28DFF', '#C5A3FF', '#D5AAFF', '#ECD4FF', '#FBE4FF',
  '#DCD3FF', '#A79AFF', '#B5B9FF', '#97A2FF', '#AFCBFF',
  '#AFF8DB', '#C4FAF8', '#85E3FF', '#ACE7FF', '#6EB5FF',
  '#BFFCC6', '#DBFFD6', '#F3FFE3', '#FFF5BA', '#FFFFD1',
];

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [folders, setFolders] = useLocalStorage('folders', [
    { id: 'work', name: '업무', color: '#FFB5E8' },
    { id: 'personal', name: '개인', color: '#AFF8DB' },
    { id: 'study', name: '공부', color: '#B5B9FF' }
  ]);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // 할 일 추가
  const handleAddTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
  };

  // 할 일 수정
  const handleUpdateTodo = (todoData) => {
    setTodos(todos.map(todo => 
      todo.id === editingTodo.id 
        ? { ...todo, ...todoData }
        : todo
    ));
    setEditingTodo(null);
    setIsFormOpen(false);
  };

  // 할 일 삭제
  const handleDeleteTodo = (id) => {
    if (window.confirm('이 할 일을 삭제하시겠습니까?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // 할 일 완료 토글
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // 할 일 수정 모드
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // 폼 저장
  const handleSaveTodo = (todoData) => {
    if (editingTodo) {
      handleUpdateTodo(todoData);
    } else {
      handleAddTodo(todoData);
    }
  };

  // 폼 닫기
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  // 폴더 추가
  const handleAddFolder = (name) => {
    const usedColors = folders.map(f => f.color);
    const availableColors = FOLDER_COLORS.filter(c => !usedColors.includes(c));
    const color = availableColors.length > 0 
      ? availableColors[0] 
      : FOLDER_COLORS[folders.length % FOLDER_COLORS.length];

    const newFolder = {
      id: Date.now().toString(),
      name,
      color
    };
    setFolders([...folders, newFolder]);
  };

  // 폴더 삭제
  const handleDeleteFolder = (id) => {
    const todosInFolder = todos.filter(todo => todo.folderId === id);
    if (todosInFolder.length > 0) {
      if (!window.confirm('이 폴더에 할 일이 있습니다. 폴더를 삭제하시겠습니까? (할 일은 유지됩니다)')) {
        return;
      }
    }
    setFolders(folders.filter(folder => folder.id !== id));
    if (selectedFolder === id) {
      setSelectedFolder(null);
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>✨ To-Do Manager</h1>
          <p className={styles.subtitle}>할 일을 체계적으로 관리하세요</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Dashboard 
            todos={todos}
            folders={folders}
            onEditTodo={handleEditTodo}
          />

          <div className={styles.content}>
            <aside className={styles.sidebar}>
              <FolderManager
                folders={folders}
                selectedFolder={selectedFolder}
                onSelectFolder={setSelectedFolder}
                onAddFolder={handleAddFolder}
                onDeleteFolder={handleDeleteFolder}
              />
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.controls}>
                <TabFilter
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <button
                  className={styles.addButton}
                  onClick={() => setIsFormOpen(true)}
                >
                  + 할 일 추가
                </button>
              </div>

              <TodoList
                todos={todos}
                folders={folders}
                activeTab={activeTab}
                selectedFolder={selectedFolder}
                onToggleTodo={handleToggleTodo}
                onEditTodo={handleEditTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </div>
          </div>
        </div>
      </main>

      {isFormOpen && (
        <TodoForm
          todo={editingTodo}
          folders={folders}
          onSave={handleSaveTodo}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
