"use client"
import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Dashboard from '@/components/Dashboard/Dashboard';
import DashboardBody from '@/components/Dashboard/DashboardBody/DashboardBody';
import { Box, Button, ButtonGroup, LinearProgress, Typography } from '@mui/material';
import { useFetchMultiple } from '../../../hooks/useFetchMultiple';
import DashboardCard from '@/components/Dashboard/DashboardCard/DashboardCard';
import styles from '@/styles/Dashboard.module.css';
import dataToSendHard from '../../../tools/HardDataMenu';
import useFakeInfo from '../../../hooks/useFakeInfo';
import FakeinfoDashboard from '@/components/FakeInfoDashboard/FakeinfoDahsboard';
import useHandleCreate from '../../../hooks/useFloating';

// Theme configuration
const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const IndexPage = () => {
    const [pathname, setPathname] = React.useState('/dashboard');
    const [refreshTrigger, setRefreshTrigger] = React.useState<number>(0);
    const [data, setData] = React.useState<any | undefined>({
        trakestime: [],
        companies: [],
        uniqueCompanies: [],
    });
    const [progress, setProgress] = React.useState<number>(0);
    const [statusMessage, setStatusMessage] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { results, loading, fetchMultiple } = useFetchMultiple();
    const { handleCreate } = useHandleCreate(data, setRefreshTrigger);
    // React.useEffect(() => {
    //     fetchMultiple([{ url: "/api/trackTime" }, { url: "/api/companiesdashboard" }]);
    // }, [fetchMultiple, refreshTrigger]);


    const fetchData = React.useCallback(() => {
        fetchMultiple([
            { url: "/api/trackTime" },
            { url: "/api/companiesdashboard" },
        ]);
    }, [fetchMultiple]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData, refreshTrigger]);

    React.useEffect(() => {
        const companiesData = results?.apicompaniesdashboard?.data || [];
        const trackTimeData: any = results?.apitrackTime?.data || [];
        // const uniqueCompaniesData: any | any[] = [...new Set(trackTimeData.map((item: any) => item.namecompanie))];
        const uniqueCompaniesData = [...new Set(trackTimeData.map((item: { namecompanie: string }) => item.namecompanie))];


        if (trackTimeData.length >= 2000) {
            handleCreate();
        }

        setData({
            companies: companiesData,
            trakestime: trackTimeData,
            uniqueCompanies: uniqueCompaniesData,
        });
    }, [results, refreshTrigger]);

    const handleButtonClick = React.useCallback(async (companyName: string) => {
        try {
            const res = await fetch(`/api/analytics?companyname=${companyName}`);
            if (!res.ok) throw new Error("Error fetching data");

            const response = await fetch(`/api/analytics?companyname=${companyName}`, {
                method: "DELETE",
            });
            setRefreshTrigger(prev => prev + 1);
            await res.json();
        } catch (err) {
            console.log("🚀 ~ handleButtonClick ~ err:", err);
        }
    }, []);

    const handleButtonDelete = React.useCallback(async (companyName: string) => {
        try {
            const response = await fetch(`/api/analytics?companyname=${companyName}`, {
                method: "DELETE",
            });
            setRefreshTrigger(prev => prev + 1);
            await response.json();
        } catch (err) {
            console.log("🚀 ~ handleButtonClick ~ err:", err);
        }
    }, []);

    //nico id 67adfab7df1c3e1f1a53af56
    //india id 67b07e338de3e7e8122cf29b
    const fakeData = useFakeInfo(Date.now(), { userId: "67adfab7df1c3e1f1a53af56", email: "nico.contigliani@gmail.com" });

    const router = {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string) => setPathname(path),
    };

    const NAVIGATION = React.useMemo(() => [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
            component: () => (
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <div>
                                <strong>Formater Trake : </strong>
                                <span>{data.trakestime?.length} </span>
                            </div>
                            <hr />
                            {isLoading && (
                                <Box sx={{ width: "100%", mb: 2 }}>
                                    <LinearProgress variant="determinate" value={progress} />
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {`${Math.round(progress)}%`}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" align="center">
                                        {statusMessage}
                                    </Typography>
                                </Box>
                            )}

                            <div>
                                <strong>Trake each company: </strong>
                                <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                    {data.uniqueCompanies &&
                                        data.uniqueCompanies.map((company: any, index: number) => (
                                            <Button key={index} onClick={() => handleButtonClick(company)}>{company}</Button>
                                        ))}
                                </ButtonGroup>
                            </div>
                            <hr />
                            <div>
                                <strong>Delete Trake each company: </strong>
                                <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                    {data.uniqueCompanies &&
                                        data.uniqueCompanies.map((company: any, index: number) => (
                                            <Button key={index} color="error" variant="contained" onClick={() => handleButtonDelete(company)}>Delete {company}</Button>
                                        ))}
                                </ButtonGroup>
                            </div>
                            <hr />
                            <Box sx={{ width: "100%", mb: 2 }}>

                                <div>
                                    <strong>Trake each company: </strong>
                                    <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                        <Button onClick={handleCreate}>All Companies</Button>
                                    </ButtonGroup>
                                </div>
                            </Box>
                            <Box sx={{ width: "100%", mb: 2 }}>

                                <div>


                                    <FakeinfoDashboard
                                        setIsLoading={setIsLoading}
                                        setStatusMessage={setStatusMessage}
                                        setProgress={setProgress}
                                        dataToSendHard={dataToSendHard}
                                        setRefreshTrigger={setRefreshTrigger}
                                    />


                                </div>
                            </Box>
                            <hr />
                            <ButtonGroup variant="contained" color='inherit' size="small" aria-label="Basic button group">
                                <Button onClick={() => setRefreshTrigger(prev => prev + 1)}>Reset</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            segment: 'orders',
            title: 'Orders',
            icon: <ShoppingCartIcon />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Analytics',
        },
        {
            segment: 'reports',
            title: 'Reports',
            icon: <BarChartIcon />,
            children: [
                {
                    segment: 'sales',
                    title: 'Sales',
                    icon: <DescriptionIcon />,
                },
                {
                    segment: 'traffic',
                    title: 'Traffic',
                    icon: <DescriptionIcon />,
                },
            ],
        },
        {
            segment: 'integrations',
            title: 'Integrations',
            icon: <LayersIcon />,
        },
    ], [data, handleButtonClick, handleCreate, isLoading, progress, statusMessage]);

    return (
        <Dashboard
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
        />
    );
};

export default IndexPage;