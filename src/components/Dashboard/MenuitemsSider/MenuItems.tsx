import { Menu } from "antd";
import React, { useCallback, useRef, useEffect } from "react";
import styles from "../dashboard.module.css";

interface MenuItemsProps {
    collapsed: boolean;
    menuItems: any[];
    setMenuItemSelection: (key: string) => void;
}

const MenuItemsContent: React.FC<MenuItemsProps> = ({ collapsed, menuItems, setMenuItemSelection }) => {
    const lastSelectedKey = useRef<string | null>(null);
    const lastClickTime = useRef<number>(0);

    const items = menuItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: !collapsed ? item.label : null,
    }));

    const handleMenuClick = useCallback(
        (e: { key: string }) => {
            const now = Date.now();
            if (lastSelectedKey.current !== e.key && now - lastClickTime.current > 300) {
                lastSelectedKey.current = e.key;
                lastClickTime.current = now;
                setMenuItemSelection(e.key);
            }
        },
        [setMenuItemSelection]
    );

    // Efecto para resetear lastSelectedKey cuando cambian los items del menú
    useEffect(() => {
        lastSelectedKey.current = null;
    }, [menuItems]);

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className={styles.menu}
            items={items}
            onClick={handleMenuClick}
        />
    );
};

export default MenuItemsContent;