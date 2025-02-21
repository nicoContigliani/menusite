"use client"
import React, { useState, useEffect } from "react"
import { Layout, Avatar, Badge, Button, Drawer, Divider } from "antd"
import {
    LogoutOutlined,
} from "@ant-design/icons"
import styles from "./dashboard.module.css"
import dynamic from "next/dynamic"
import HeaderDashboard from "./HeaderDashboard/HeaderDashboard"

const Sidebars = dynamic(() => import("./SiderBar/SiderBar"), {
    loading: () => <div>Loading Sidebar...</div>,
    ssr: false,
})
import Grid from "@mui/material/Grid";
import { Grid2 } from "@mui/material"

const { Header, Sider, Content } = Layout

interface DashboardProps {
    children?: React.ReactNode;
    menuItems?: any | any[] | undefined;
    title: string;
    setMenuItemSelection: any
}

const Dashboard: React.FC<DashboardProps> = (props) => {
    const { menuItems, children, title, setMenuItemSelection } = props; // Desestructurar setMenuItemSelection

    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const toggleDrawer = () => setDrawerVisible(!drawerVisible)



    return (
        <Layout className={styles.container}>
            {/* Conditionally render Sider for larger screens */}
            {!isMobile && (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width={100}
                    collapsedWidth={70}
                    className={styles.sider}
                    trigger={null}
                >
                    <Sidebars collapsed={collapsed} menuItems={menuItems} setMenuItemSelection />
                    <Button type="text" icon={<LogoutOutlined />} className={styles.logoutButton} />
                </Sider>
            )}

            <Layout className={styles.mainLayout} style={{ marginLeft: isMobile ? 0 : collapsed ? 70 : 100 }}>

                <HeaderDashboard
                    toggleDrawer={toggleDrawer}
                >
                </HeaderDashboard>

                <div
                    className={styles.content}
                >
                        {title && <div className={styles.title}>{title}</div>}
                        {children}
                </div>
            </Layout>

            {
                isMobile && (
                    <Drawer placement="left"
                        closable={false}
                        onClose={toggleDrawer}
                        open={drawerVisible}
                        styles={{ body: { padding: 0 } }} // Change "bodyStyle" to "styles.body"
                        width={250}
                    >
                        <Sidebars collapsed={collapsed} menuItems={menuItems} setMenuItemSelection={setMenuItemSelection} />
                        <Button type="text" icon={<LogoutOutlined />} className={styles.logoutButton} />
                    </Drawer>
                )
            }
        </Layout >
    )
}

export default Dashboard
