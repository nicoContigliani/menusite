// import * as React from 'react';
// import { extendTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LayersIcon from '@mui/icons-material/Layers';
// import Dashboard from '@/components/Dashboard/Dashboard';
// import DashboardBody from '@/components/Dashboard/DashboardBody/DashboardBody';
// import { Button, ButtonGroup, Typography } from '@mui/material';
// import { useFetchMultiple } from '../../../hooks/useFetchMultiple';

// // Theme configuration
// const demoTheme = extendTheme({
//     colorSchemes: { light: true, dark: true },
//     colorSchemeSelector: 'class',
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 600,
//             md: 600,
//             lg: 1200,
//             xl: 1536,
//         },
//     },
// });



// const IndexPage = () => {
//     const [pathname, setPathname] = React.useState('/dashboard');

//     const [refreshTrigger, setRefreshTrigger] = React.useState<number>(0);
//     const [trakestime, setTrakestime] = React.useState<any | any[] | undefined>()
//     const [companies, setCompanies] = React.useState<any | any[] | undefined>()
//     const [uniqueCompanies, setUniqueCompanies] = React.useState<any | any[] | undefined>()

//     const { results, loading, fetchMultiple } = useFetchMultiple();
//     React.useEffect(() => {
//         fetchMultiple([{ url: "/api/trackTime" }, { url: "/api/companiesdashboard" }]);
//     }, [fetchMultiple, refreshTrigger]);
//     console.log("🚀 ~ IndexPage ~ results:", results)

//     React.useEffect(() => {

//         const companiesData: any = results?.apicompaniesdashboard?.data || [];
//         const trackTimeData: any | any[] | undefined = results?.apitrackTime?.data || [];
//         const uniqueCompaniesData: any | any[] | undefined = [...new Set(trackTimeData.map((item: any) => item.namecompanie))];
//         setCompanies(companiesData);
//         setTrakestime(trackTimeData);
//         setUniqueCompanies(uniqueCompaniesData);

//     }, [results])


//     const handleButtonClick = React.useCallback(async (record: any) => {
//         try {
//             const res = await fetch(`/api/analytics?companyname=${record.companyName}`);
//             if (!res.ok) throw new Error("Error fetching data");

//             const response = await fetch(`/api/analytics?companyname=${record.companyName}`, {
//                 method: "DELETE",
//             });
//             setRefreshTrigger((prev) => prev + 1);
//             const result = await res.json();
//         } catch (err) {
//             console.log("🚀 ~ handleButtonClick ~ err:", err);
//         }
//     }, []);



//     const handleCreate = React.useCallback(async () => {
//         const apicompaniesdashboard: any[] | any = results?.apicompaniesdashboard?.data || [];
//         const apitrackTime = results?.apitrackTime?.data;

//         if (!apicompaniesdashboard.length) {
//             console.log("No companies data found.");
//             return;
//         }

//         try {
//             // Desactivamos el trigger de refresco mientras hacemos las solicitudes
//             setRefreshTrigger(0);

//             // Recorremos todos los registros
//             const promises = apicompaniesdashboard.map(async (record: any) => {
//                 try {
//                     // Hacemos la solicitud GET primero
//                     const res = await fetch(`/api/analytics?companyname=${record.companyName}`);
//                     if (!res.ok) {
//                         throw new Error(`Error fetching data for ${record.companyName}`);
//                     }

//                     // Luego hacemos la solicitud DELETE
//                     const response = await fetch(`/api/analytics?companyname=${record.companyName}`, {
//                         method: "DELETE",
//                     });

//                     if (!response.ok) {
//                         throw new Error(`Error deleting data for ${record.companyName}`);
//                     }

//                     const result = await response.json();
//                     console.log("🚀 ~ handleCreate ~ result:", result);
//                 } catch (err) {
//                     console.error("Error processing record:", record.companyName, err);
//                 }
//             });

//             // Esperamos que todas las promesas se resuelvan antes de actualizar el estado
//             await Promise.all(promises);

//             // Una vez completado, activamos nuevamente el trigger para refrescar
//             setRefreshTrigger((prev) => prev + 1);
//             console.log("Successfully processed all companies.");
//         } catch (err) {
//             console.error("🚀 ~ handleCreate ~ global error:", err);
//         }
//     }, [results, refreshTrigger]);









//     const router = {
//         pathname,
//         searchParams: new URLSearchParams(),
//         navigate: (path: string) => setPathname(path),
//     };


//     // Navigation configuration
//     const NAVIGATION = [
//         {
//             kind: 'header',
//             title: 'Main items',
//         },
//         {
//             segment: 'dashboard',
//             title: 'Dashboard',
//             icon: <DashboardIcon />,
//             component: () => <div>
//                 <DashboardBody>
//                     <Typography variant="h6" sx={{ marginBottom: 3, color: 'text.primary' }}>
//                         trake
//                     </Typography>

//                     <div>
//                         <strong>Formater Trake : </strong>
//                         <span>{trakestime?.length} </span>
//                     </div>
//                     <hr />

//                     <div>
//                         <strong>Trake each company: </strong>
//                         <ButtonGroup variant="contained" aria-label="Basic button group">
//                             {
//                                 uniqueCompanies &&

//                                 uniqueCompanies?.map((company: any, index: number) => (
//                                     <Button key={index} onClick={() => handleButtonClick(company)}>{company}</Button>
//                                 ))
//                             }
//                         </ButtonGroup>
//                     </div>
//                     <hr />
//                     <div>
//                         <strong>Trake each company: </strong>
//                         <ButtonGroup variant="contained" aria-label="Basic button group">
//                             {
//                                 uniqueCompanies &&

//                                 <Button onClick={() => handleCreate()}>All Companies</Button>

//                             }
//                         </ButtonGroup>
//                     </div>


//                 </DashboardBody>
//             </div>,
//         },
//         {
//             segment: 'orders',
//             title: 'Orders',
//             icon: <ShoppingCartIcon />,
//         },
//         {
//             kind: 'divider',
//         },
//         {
//             kind: 'header',
//             title: 'Analytics',
//         },
//         {
//             segment: 'reports',
//             title: 'Reports',
//             icon: <BarChartIcon />,
//             children: [
//                 {
//                     segment: 'sales',
//                     title: 'Sales',
//                     icon: <DescriptionIcon />,
//                 },
//                 {
//                     segment: 'traffic',
//                     title: 'Traffic',
//                     icon: <DescriptionIcon />,
//                 },
//             ],
//         },
//         {
//             segment: 'integrations',
//             title: 'Integrations',
//             icon: <LayersIcon />,
//         },
//     ];


//     return (
//         <Dashboard
//             navigation={NAVIGATION}
//             router={router}
//             theme={demoTheme}
//         />
//     );
// };

// export default IndexPage;
import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Dashboard from '@/components/Dashboard/Dashboard';
import DashboardBody from '@/components/Dashboard/DashboardBody/DashboardBody';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { useFetchMultiple } from '../../../hooks/useFetchMultiple';
import DashboardCard from '@/components/Dashboard/DashboardCard/DashboardCard';

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
    const [data, setData] = React.useState<any>({
        trakestime: [],
        companies: [],
        uniqueCompanies: [],
    });

    const { results, loading, fetchMultiple } = useFetchMultiple();

    React.useEffect(() => {
        fetchMultiple([{ url: "/api/trackTime" }, { url: "/api/companiesdashboard" }]);
    }, [fetchMultiple, refreshTrigger]);

    React.useEffect(() => {
        const companiesData = results?.apicompaniesdashboard?.data || [];
        const trackTimeData: any = results?.apitrackTime?.data || [];
        const uniqueCompaniesData: any | any[] = [...new Set(trackTimeData.map((item: any) => item.namecompanie))];
        setData({
            companies: companiesData,
            trakestime: trackTimeData,
            uniqueCompanies: uniqueCompaniesData,
        });
    }, [results,refreshTrigger]);

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

    const handleCreate = React.useCallback(async () => {
        const { companies } = data;
        if (!companies.length) {
            console.log("No companies data found.");
            return;
        }

        try {
            setRefreshTrigger(0);
            const promises = companies.map(async (record: any) => {
                try {
                    const res = await fetch(`/api/analytics?companyname=${record.companyName}`);
                    if (!res.ok) throw new Error(`Error fetching data for ${record.companyName}`);

                    const response = await fetch(`/api/analytics?companyname=${record.companyName}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error(`Error deleting data for ${record.companyName}`);

                    return await response.json();
                } catch (err) {
                    console.error("Error processing record:", record.companyName, err);
                }
            });

            await Promise.all(promises);
            setRefreshTrigger(prev => prev + 1);
            console.log("Successfully processed all companies.");
        } catch (err) {
            console.error("🚀 ~ handleCreate ~ global error:", err);
        }
    }, [data]);

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
                    <DashboardCard title="trake">

                        <div>

                            <div>
                                <strong>Formater Trake : </strong>
                                <span>{data.trakestime?.length} </span>
                            </div>
                            <hr />
                            <div>
                            <strong>Trake each company: </strong>

                                <ButtonGroup variant="outlined" size="small" aria-label="Basic button group">
                                    {
                                        data.uniqueCompanies &&
                                        data.uniqueCompanies.map((company: any, index: number) => (
                                            <Button key={index} onClick={() => handleButtonClick(company)}>{company}</Button>
                                        ))
                                    }
                                </ButtonGroup>

                            </div>
                            <hr />
                            <div>
                                <strong>Delete Trake each company: </strong>

                                <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                    {
                                        data.uniqueCompanies &&
                                        data.uniqueCompanies.map((company: any, index: number) => (
                                            <Button key={index} onClick={() => handleButtonDelete(company)}>Delete {company}</Button>
                                        ))
                                    }
                                </ButtonGroup>
                            </div>
                            <hr />
                            <div>
                                <strong>Trake each company: </strong>
                                <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                    <Button onClick={handleCreate}>All Companies</Button>
                                </ButtonGroup>
                            </div>
                        </div>

                    </DashboardCard>
                    <DashboardCard title="trake">

                        <div>

                            <div>
                                <strong>Formater Trake : </strong>
                                <span>{data.trakestime?.length} </span>
                            </div>
                            <hr />
                            <div>
                                <strong>Trake each company: </strong>
                                <ButtonGroup variant="outlined" size="small" aria-label="Basic button group">
                                    {
                                        data.uniqueCompanies &&
                                        data.uniqueCompanies.map((company: any, index: number) => (
                                            <Button key={index} onClick={() => handleButtonClick(company)}>{company}</Button>
                                        ))
                                    }
                                </ButtonGroup>
                            </div>
                            <hr />
                            <div>
                                <strong>Trake each company: </strong>
                                <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                    <Button onClick={handleCreate}>All Companies</Button>
                                </ButtonGroup>
                            </div>
                        </div>

                    </DashboardCard>
                    <DashboardCard title="trake">

                        <div>

                            <div>
                                <strong>Formater Trake : </strong>
                                <span>{data.trakestime?.length} </span>
                            </div>
                            <hr />
                            <div>
                                <strong>Trake each company: </strong>
                                <ButtonGroup variant="outlined" size="small" aria-label="Basic button group">
                                    {
                                        data.uniqueCompanies &&
                                        data.uniqueCompanies.map((company: any, index: number) => (
                                            <Button key={index} onClick={() => handleButtonClick(company)}>{company}</Button>
                                        ))
                                    }
                                </ButtonGroup>
                            </div>
                            <hr />
                            <div>
                                <strong>Trake each company: </strong>
                                <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
                                    <Button onClick={handleCreate}>All Companies</Button>
                                </ButtonGroup>
                            </div>
                        </div>

                    </DashboardCard>


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
    ], [data, handleButtonClick, handleCreate]);

    return (
        <Dashboard
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
        />
    );
};

export default IndexPage;
