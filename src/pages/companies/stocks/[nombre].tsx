import React, { useState } from 'react';
import { Button, Typography, Box, Paper, AppBar, Toolbar, Avatar, IconButton, Badge } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Icono de notificaciones
import { QRCode, message } from 'antd';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface QRPageProps {
    nombre: string;
    baseUrl: string;
}

export const getServerSideProps: GetServerSideProps<QRPageProps> = async (context) => {
    const { nombre } = context.params as { nombre: string };
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    if (!nombre) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            nombre,
            baseUrl,
        },
    };
};

const QRPage = ({ nombre, baseUrl }: QRPageProps) => {
    const router = useRouter();
    const [showPromotions, setShowPromotions] = useState(false);
    const [promotionsData, setPromotionsData] = useState([]);

    const dataUrl = [
        { 
            title: "Employees", 
            url: `${baseUrl}/employees/${nombre}`,
            icon: <DownloadIcon color="primary" />
        },
        { 
            title: "Company", 
            url: `${baseUrl}/company/${nombre}`,
            icon: <DownloadIcon color="secondary" />
        },
        { 
            title: "Dashboard", 
            url: `${baseUrl}/company/dashboard/${nombre}`,
            icon: <DownloadIcon color="success" />
        }
    ];

    const togglePromotions = () => {
        setShowPromotions(!showPromotions);
    };

    const downloadCanvasQRCode = (url: string, title: string) => {
        const canvas = document.getElementById(`myqrcode-${title}`)?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const dataUrl = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = `${nombre}-${title.toLowerCase()}-qr-code.png`;
            a.href = dataUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            message.success(`${title} QR Code downloaded successfully!`);
        } else {
            message.error('Failed to download QR Code.');
        }
    };

    const redirectToUrl = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            padding: 3,
            textAlign: 'center'
        }}>
            <AppBar position="static" color="primary" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                        <Avatar sx={{ width: 50, height: 50 }}>
                            <Image
                                src="/images/flama.png"
                                alt="LlakaScript"
                                width={50}
                                height={50}
                                priority
                                style={{ objectFit: 'contain' }}
                            />
                        </Avatar>
                        Llakascript
                    </Typography>
                    <IconButton color="inherit" onClick={togglePromotions}>
                        <Badge badgeContent={showPromotions ? null : promotionsData?.length} color="secondary">
                            <NotificationsIcon /> {/* Icono de notificaciones */}
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                QR Code for: {nombre}
            </Typography>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3,
                width: '100%',
                maxWidth: 'md'
            }}>
                {dataUrl.map((item) => (
                    <Paper
                        key={item.title}
                        id={`myqrcode-${item.title}`}
                        elevation={3}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Typography variant="h6" component="h2" gutterBottom>
                            {item.title} Access
                        </Typography>

                        <Box sx={{
                            background: '#fff',
                            p: 2,
                            borderRadius: 1,
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                            mb: 2,
                            cursor: 'pointer'
                        }} onClick={() => redirectToUrl(item.url)}>
                            <QRCode
                                type="canvas"
                                errorLevel="L"
                                value={item.url}
                                size={180}
                                bgColor="#ffffff"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => redirectToUrl(item.url)}
                                sx={{ py: 1 }}
                            >
                                Open {item.title}
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={item.icon}
                                onClick={() => downloadCanvasQRCode(item.url, item.title)}
                                sx={{ py: 1 }}
                            >
                                Download
                            </Button>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default QRPage;