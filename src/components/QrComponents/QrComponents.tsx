import React from 'react';
import { Button, QRCode, Space } from 'antd';

interface QrComponentsProps {
    errorLevel?: 'L' | 'M' | 'Q' | 'H'; // Niveles válidos de corrección de errores
    value: string;
    icon?: string;
}

function doDownload(url: string, fileName: string) {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const downloadCanvasQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
        const url = canvas.toDataURL();
        doDownload(url, 'QRCode.png');
    }
};

const QrComponents: React.FC<QrComponentsProps> = ({ errorLevel = 'L', value, icon }) => {
    return (
        <Space id="myqrcode" direction="vertical">
            <div>
                <QRCode
                    type="canvas"
                    errorLevel={errorLevel}
                    value={value}
                    icon={icon}
                    style={{ marginBottom: 16 }}
                    bgColor="#fff"
                />
                <Button type="primary"
                    block
                    onClick={downloadCanvasQRCode}>
                    Download
                </Button>
            </div>
        </Space>
    );
};

export default QrComponents;
