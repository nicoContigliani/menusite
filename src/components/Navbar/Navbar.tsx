import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Profiles - Free',
        key: 'profiles', // Clave principal única
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Group 1', // Labels más descriptivas
                children: [
                    { label: 'Option 1', key: 'profiles:group1:1' }, // Claves únicas usando un patrón
                    { label: 'Option 2', key: 'profiles:group1:2' },
                    { label: 'Option 3', key: 'profiles:group1:3' },
                    { label: 'Option 4', key: 'profiles:group1:4' },
                    { label: 'Option 5', key: 'profiles:group1:5' },
                    { label: 'Option 6', key: 'profiles:group1:6' },
                    { label: 'Option 7', key: 'profiles:group1:7' },
                    { label: 'Option 8', key: 'profiles:group1:8' },

                ],
            },
            {
                type: 'group',
                label: 'Group 2', // Labels más descriptivas
                children: [
                    { label: 'Option 9', key: 'profiles:group1:9' },
                    { label: 'Option 10', key: 'profiles:group1:10' },
                    { label: 'Option 11', key: 'profiles:group1:11' },
                    { label: 'Option 12', key: 'profiles:group1:12' },
                    { label: 'Option 13', key: 'profiles:group1:13' },
                    { label: 'Option 14', key: 'profiles:group1:14' },
                ],
            },
        ],
    },
    {
        label: 'Navigation One',
        key: 'navigation', // Clave principal única
        icon: <MailOutlined />,
    },
];

const Navbar: React.FC = () => {
    const [current, setCurrent] = useState('navigation'); // Valor inicial corregido

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items} />;
};

export default Navbar;