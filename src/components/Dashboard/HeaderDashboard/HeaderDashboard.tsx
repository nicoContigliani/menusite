import { BellOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';

interface HeaderDashboardProps {
  toggleDrawer: () => void;
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({ toggleDrawer }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Header className={styles.header}>
      {/* Mostrar el botón del menú solo en móviles */}
      {isMobile && (
        <Button
          type="text"
          icon={<MenuUnfoldOutlined />}
          onClick={toggleDrawer}
          className={styles.menuButton}
        />
      )}
      <div className={styles.headerTitle}>LlakaScript</div>
      <div className={styles.headerRight}>
        <Badge count={2}>
          <BellOutlined className={styles.notificationIcon} />
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderDashboard;
