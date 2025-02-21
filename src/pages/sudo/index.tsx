// pages/index.tsx

import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Dashboard from '@/components/Dashboard/Dashboard';
import DashboardBody from '@/components/Dashboard/DashboardBody/DashboardBody';
import { Typography } from '@mui/material';

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

// Navigation configuration
const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        component: () => <div>
            <DashboardBody>
            <Typography variant="h6" sx={{ marginBottom: 3, color: 'text.primary' }}>
              Dashboard Content
            </Typography>
                hola
            </DashboardBody>
        </div>,
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
];

const IndexPage = () => {
    const [pathname, setPathname] = React.useState('/dashboard');

    const router = {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string) => setPathname(path),
    };

    return (
        <Dashboard
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
        />
    );
};

export default IndexPage;
