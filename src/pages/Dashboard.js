import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './Dashboard.module.css';
import { getServers } from '../services/serverService';

function Dashboard() {
  const [selectedServer, setSelectedServer] = useState(null);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const data = await getServers();
      console.log('Fetched servers:', data);
      setServers(data);
    };

    fetchServers();
  }, []);

  const handleServerClick = (server) => {
    console.log('Clicked server:', server);
    setSelectedServer(server);
  };

  console.log('Selected server:', selectedServer);
  console.log('Servers:', servers);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar servers={servers} onServerClick={handleServerClick} />
      </div>
      <main className={styles.main}>
        <h1>Server Dashboard</h1>
        {selectedServer && (
          <div className={styles.serverInfo}>
            <h2>{selectedServer.name}</h2>
            <p>IP Address: {selectedServer.ip}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;