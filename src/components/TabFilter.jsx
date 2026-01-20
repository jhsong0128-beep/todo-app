import styles from './TabFilter.module.css';

const TABS = [
  { id: 'today', label: '오늘', icon: '📅' },
  { id: 'week', label: '이번주', icon: '📆' },
  { id: 'later', label: '나중에', icon: '🗓️' },
  { id: 'all', label: '전체', icon: '📋' }
];

function TabFilter({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabFilter}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default TabFilter;
