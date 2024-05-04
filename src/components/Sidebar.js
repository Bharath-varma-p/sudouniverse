import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar({ servers, onServerClick }) {
  const handleServerClick = (server) => {
    console.log('Clicked server in Sidebar:', server);
    if (onServerClick) {
      onServerClick(server);
    } else {
      console.log('onServerClick prop is not defined');
    }
  };

  console.log('Servers in Sidebar:', servers);

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/servers">Servers</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
      <div className={styles.serverList}>
        <h2>Server List</h2>
        <ul>
          {servers.map((server) => (
            <li
              key={server.id}
              className={styles.serverItem}
              onClick={() => handleServerClick(server)}
            >
              {server.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;