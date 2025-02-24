// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { Box, Typography, Button, CircularProgress } from '@mui/material';

// export default function CompanyAnalytics() {
//   const router = useRouter();
//   const { companyName } = router.query;
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0); // Para refrescar datos manualmente

//   console.log("🚀 ~ CompanyAnalytics ~ data:", data)
//   useEffect(() => {
//     if (!companyName) return; // No ejecutar si no hay un companyName

//     async function fetchData() {
//       setLoading(true);
//       setError(null);

//       try {
//         const url = `/api/dashboard?companyname=${companyName}`;
//         console.log("🚀 ~ useEffect ~ url:", url);

//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Error fetching data");

//         const json = await res.json();
//         setData(json);
//       } catch (err: any) {
//         console.error("🚀 ~ fetchData ~ err:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [companyName, refreshTrigger]); // Se ejecuta cuando companyName cambia o se presiona el botón de refresh

//   return (
//     <Box sx={{ textAlign: 'center', mt: 6 }}>
//       <Typography variant="h4">Analytics for {companyName}</Typography>

//       {loading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}
//       {data && <Typography variant="body1">{JSON.stringify(data, null, 2)}</Typography>}

//       <Button 
//         variant="contained" 
//         color="primary" 
//         onClick={() => setRefreshTrigger(prev => prev + 1)}
//         sx={{ mt: 2 }}
//       >
//         Refresh Data
//       </Button>
//     </Box>
//   );
// }





import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Dashboard from '@/components/Dashboard/Dashboard';
import DashboardBody from '@/components/Dashboard/DashboardBody/DashboardBody';

import { useRouter as useNextRouter } from 'next/router';

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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any>({
    trakestime: [],
    companies: [],
    uniqueCompanies: [],
  });

  const routers = useNextRouter(); // Usa un nombre diferente para evitar conflictos
  const { companyName } = routers.query;
  console.log("🚀 ~ IndexPage ~ companyName:", companyName)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const url = `/api/dashboard?companyname=${companyName}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error fetching data");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error("🚀 ~ fetchData ~ err:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log("🚀 ~ IndexPage ~ data:", data)




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
        <DashboardBody>

          si


        </DashboardBody>


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
  ], [data]);

  return (
    <Dashboard
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    />
  );
};

export default IndexPage;
