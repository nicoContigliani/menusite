"use client"

import type React from "react"
import { Button, Card, Typography, Row, Col } from "antd"
import QrComponents from "@/components/QrComponents/QrComponents"
import styles from "./Dashboard.module.css"

const { Title } = Typography

interface DashboardQrProps {
    companyName?: any
}

const DashboardQr: React.FC<DashboardQrProps> = ({ companyName = "LlakaScript" }) => {
    const handleButtonClick = () => {
        window.location.href = `https://menusi.netlify.app/companies/${companyName}`
    }

    const handleButtonClickEmployes = () => {
        window.location.href = `https://menusi.netlify.app/employees/${companyName}`
    }
    const handleButtonClickEmployesDashboard = () => {
        window.location.href = `https://menusi.netlify.app/companies/dashboard/${companyName}`
    }


    return (
        <div className={styles.dashboardQrContainer}>
            <Row gutter={[24, 24]} className={styles.qrRow}>
                <Col xs={24} sm={12}>
                    <Card
                        className={styles.qrCard}
                        title={
                            <Title level={4} className={styles.cardTitle}>
                                Users
                            </Title>
                        }
                        bordered={false}
                    >
                        <div className={styles.qrWrapper}>
                            <QrComponents
                                errorLevel="H"
                                value={`https://menusi.netlify.app/companies/${companyName}`}
                                icon={"/images/flama.png"}
                            />
                        </div>
                        <Button type="primary" onClick={handleButtonClick} size="middle" block className={styles.actionButton}>
                            User {companyName}
                        </Button>
                    </Card>
                </Col>

                <Col xs={24} sm={12}>
                    <Card
                        className={styles.qrCard}
                        title={
                            <Title level={4} className={styles.cardTitle}>
                                Employees
                            </Title>
                        }
                        bordered={false}
                    >
                        <div className={styles.qrWrapper}>
                            <QrComponents
                                errorLevel="H"
                                value={`https://menusi.netlify.app/employees/${companyName}`}
                                icon={"/images/flama.png"}
                            />
                        </div>
                        <Button
                            type="primary"
                            onClick={handleButtonClickEmployes}
                            size="middle"
                            block
                            className={styles.actionButton}
                        >
                            Employees {companyName}
                        </Button>
                    </Card>
                </Col>
                <Col xs={24} sm={12}>
                    <Card
                        className={styles.qrCard}
                        title={
                            <Title level={4} className={styles.cardTitle}>
                                Employees Dashboard
                            </Title>
                        }
                        bordered={false}
                    >
                        <div className={styles.qrWrapper}>
                            <QrComponents
                                errorLevel="H"
                                value={`https://menusi.netlify.app/companies/dashboard/${companyName}`}
                                icon={"/images/flama.png"}
                            />
                        </div>
                        <Button
                            type="primary"
                            onClick={handleButtonClickEmployesDashboard}
                            size="middle"
                            block
                            className={styles.actionButton}
                        >
                            Employees {companyName}
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardQr

