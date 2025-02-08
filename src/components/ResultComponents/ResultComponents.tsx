import React from 'react';
import { Button, Result } from 'antd';

interface ResultComponentsProps {
    operationStatus?: "success" | "error" | "info" | "warning" | "404" | "403" | "500"; 
    title?: string;
    subTitle?: string;
    children?: React.ReactNode;
}

const ResultComponents: React.FC<ResultComponentsProps> = ({
    operationStatus = "success",
    title = "Successfully Purchased Cloud Server ECS!",
    subTitle = "Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.",
    children
}) => {
    return (
        <Result
            status={operationStatus}
            title={title}
            subTitle={subTitle}
            extra={
                children ?? (
                    <>
                        <Button type="primary" key="console">
                            Go Console
                        </Button>
                        <Button key="buy">Buy Again</Button>
                    </>
                )
            }
        />
    );
};

export default ResultComponents;
