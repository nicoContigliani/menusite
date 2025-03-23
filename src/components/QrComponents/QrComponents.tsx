import React from 'react';
import { Button, QRCode, Space, Typography, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'; // Icono de descarga

const { Text } = Typography;

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
        message.success('QR Code downloaded successfully!'); // Notificación de éxito
    } else {
        message.error('Failed to download QR Code.'); // Notificación de error
    }
};

const QrComponents: React.FC<QrComponentsProps> = ({ errorLevel = 'L', value, icon }) => {
    return (
        <Space id="myqrcode" direction="vertical" align="center" style={{ width: '100%' }}>
            {/* Título del QR */}
            <Text strong style={{ fontSize: '16px', marginBottom: '4px' }}>
                Scan this QR Code
            </Text>

            {/* Contenedor del QR */}
            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
                <QRCode
                    type="canvas"
                    errorLevel={errorLevel}
                    value={value}
                    icon={icon}
                    size={180} // Tamaño del QR (reducido para un diseño más compacto)
                    bgColor="#fff"
                />
            </div>

            {/* Botón de descarga */}
            <Button
                type="dashed"
                // icon={<DownloadOutlined />} 
                onClick={downloadCanvasQRCode}
                style={{ 
                    width: '100%', 
                    marginTop: '4px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '2px', // Espacio entre ícono y texto
                    padding: '8px 16px', // Ajuste de padding para mejor centrado
                }}
            >
                Download QR Code
            </Button>
        </Space>
    );
};

export default QrComponents;