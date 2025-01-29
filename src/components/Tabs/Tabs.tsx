import React from 'react';
import { Tabs, TabsProps } from 'antd';
import styles from './tabs.module.css'; // Importar el módulo de CSS

interface TabsComponentProps {
    itemsTabs: TabsProps['items'];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ itemsTabs }) => {
    return (
        <div className={styles.tabsContainer}>
            <Tabs
                className={styles.tabs}
                items={itemsTabs}
                type="card"

            />
        </div>
    );
};

export default TabsComponent;
