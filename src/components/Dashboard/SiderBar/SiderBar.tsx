import React from 'react';
import { Tooltip } from 'antd';
import { AppstoreOutlined} from '@ant-design/icons';
import styles from '../dashboard.module.css'
import dynamic from 'next/dynamic';

const MenuItemsContent = dynamic(() => import('../MenuitemsSider/MenuItems'));


interface Props {
    // Define the properties you expect in props here (e.g., title: string)
    children?: React.ReactNode;
    menuItems: any | any[] | undefined;
    collapsed: boolean;
    setMenuItemSelection:any
}

const Sidebars: React.FC<Props> = (props) => {
    const { collapsed, menuItems, children,setMenuItemSelection } = props
    return (
        <div className={styles.sidebarContent}>
            <div className={styles.logo}>
                <AppstoreOutlined />
            </div>
            <MenuItemsContent collapsed={collapsed} menuItems={menuItems} setMenuItemSelection={setMenuItemSelection} />
            <div className={styles.logoutContainer}>
                <Tooltip title="Logout" placement="right">
                    {children && children}
                </Tooltip>
            </div>
        </div>
    );
}

export default Sidebars;
