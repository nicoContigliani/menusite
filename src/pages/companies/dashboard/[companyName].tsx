// // // // // // "use client";

// // // // // // import * as React from "react";
// // // // // // import { extendTheme } from "@mui/material/styles";
// // // // // // import DashboardIcon from "@mui/icons-material/Dashboard";
// // // // // // import Dashboard from "@/components/Dashboard/Dashboard";
// // // // // // import { useRouter as useNextRouter } from "next/router";
// // // // // // import styles from "@/styles/Dashboard.module.css";
// // // // // // import DynamicChart from "@/components/Recharts/GraphicsReutilizable";
// // // // // // import { ShoppingCartIcon, QrCode } from "lucide-react";
// // // // // // import DashboardQr from "@/components/DashboardGeneral/DashboardQR/DashboardQr";


// // // // // // // Theme configuration
// // // // // // const demoTheme = extendTheme({
// // // // // //   colorSchemes: { light: true, dark: true },
// // // // // //   colorSchemeSelector: "class",
// // // // // //   breakpoints: {
// // // // // //     values: {
// // // // // //       xs: 0,
// // // // // //       sm: 600,
// // // // // //       md: 900,
// // // // // //       lg: 1200,
// // // // // //       xl: 1536,
// // // // // //     },
// // // // // //   },
// // // // // // });

// // // // // // // Loading Spinner Component
// // // // // // const LoadingSpinner = () => (
// // // // // //   <div className={styles.loadingSpinner}>
// // // // // //     <div className={styles.spinner}></div>
// // // // // //   </div>
// // // // // // );

// // // // // // // Error Display Component
// // // // // // const ErrorDisplay = ({ error }: { error: string }) => (
// // // // // //   <div className={styles.errorDisplay}>
// // // // // //     <h2>Error</h2>
// // // // // //     <p>{error}</p>
// // // // // //   </div>
// // // // // // );

// // // // // // // Card Component
// // // // // // const CardComponent = React.memo(({ title, children, colorClass }: { title: string; children: React.ReactNode; colorClass?: string }) => (
// // // // // //   <div className={`${styles.card} ${colorClass || ""}`}>
// // // // // //     <h2>{title}</h2>
// // // // // //     {children}
// // // // // //   </div>
// // // // // // ));

// // // // // // // Main Component
// // // // // // const IndexPage = () => {
// // // // // //   const [pathname, setPathname] = React.useState("/dashboard");
// // // // // //   const [loading, setLoading] = React.useState(true);
// // // // // //   const [error, setError] = React.useState<string | null>(null);
// // // // // //   const [data, setData] = React.useState<any>(null);

// // // // // //   const router = useNextRouter();
// // // // // //   const { companyName } = router.query;

// // // // // //   // Fetch data from API
// // // // // //   React.useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       if (!companyName) return;

// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         const res = await fetch(`/api/dashboard?companyname=${companyName}`);
// // // // // //         if (!res.ok) throw new Error("Error fetching data");
// // // // // //         const json = await res.json();
// // // // // //         console.log("🚀 ~ fetchData ~ json:", json);
// // // // // //         setData(json);
// // // // // //       } catch (err: any) {
// // // // // //         setError(err.message);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, [companyName]);

// // // // // //   // Convert data to a format suitable for charts
// // // // // //   const convertData = (data: any, xKey: string, yKey: string) => {
// // // // // //     if (!data) return [];

// // // // // //     if (Array.isArray(data)) {
// // // // // //       return data.map((item) => ({ x: item[xKey], y: item[yKey] }));
// // // // // //     }

// // // // // //     return Object.keys(data).map((key) => {
// // // // // //       const value = data[key];
// // // // // //       const yValue =
// // // // // //         typeof value === "string" && value.endsWith("s")
// // // // // //           ? parseFloat(value.replace("s", ""))
// // // // // //           : value;
// // // // // //       return { x: key, y: yValue };
// // // // // //     });
// // // // // //   };

// // // // // //   // Calculate the total of a dataset
// // // // // //   const calculateTotal = (data: Record<string, number>) => {
// // // // // //     return Object.values(data).reduce((acc, value) => acc + value, 0);
// // // // // //   };

// // // // // //   // Navigation configuration
// // // // // //   const navigation = React.useMemo(
// // // // // //     () => [
// // // // // //       {
// // // // // //         kind: "header",
// // // // // //         title: "Dashboard",
// // // // // //       },
// // // // // //       {
// // // // // //         segment: "dashboard",
// // // // // //         title: "Dashboard",
// // // // // //         icon: <DashboardIcon />,
// // // // // //         component: () => (
// // // // // //           <div className={styles.container}>
// // // // // //             {/* Header */}
// // // // // //             <div className={styles.header}>
// // // // // //               <h1>Dashboard de {data?.clientInfo?.companyName || "Empresa"}</h1>
// // // // // //             </div>

// // // // // //             {/* KPI Section */}
// // // // // //             <div className={styles.kpiSection}>
// // // // // //               <CardComponent title="Tiempo Promedio por Sección" colorClass={styles.cardBlue}>
// // // // // //                 <p>
// // // // // //                   {data?.timeAnalysis?.averageTimePerSection
// // // // // //                     ? `${data.timeAnalysis.averageTimePerSection}s`
// // // // // //                     : "N/A"}
// // // // // //                 </p>
// // // // // //               </CardComponent>
// // // // // //               <CardComponent title="Interacción Total (Puntaje)" colorClass={styles.cardGreen}>
// // // // // //                 <p>
// // // // // //                   {data?.efficiencyMetrics?.engagementScore
// // // // // //                     ? calculateTotal(data.efficiencyMetrics.engagementScore)
// // // // // //                     : "N/A"}
// // // // // //                 </p>
// // // // // //               </CardComponent>
// // // // // //               <CardComponent title="Potencial de Conversión" colorClass={styles.cardPurple}>
// // // // // //                 <p>
// // // // // //                   {data?.efficiencyMetrics?.conversionPotential
// // // // // //                     ? `${calculateTotal(data.efficiencyMetrics.conversionPotential)}%`
// // // // // //                     : "N/A"}
// // // // // //                 </p>
// // // // // //               </CardComponent>
// // // // // //             </div>

// // // // // //             {/* Chart Section */}
// // // // // //             <div className={styles.chartSection}>
// // // // // //               {/* Time by Category */}
// // // // // //               <CardComponent title="Tiempo por Categoría (Tiempo en segundos)" colorClass={styles.cardBlue}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={convertData(data?.timeAnalysis?.totalTimeByCategory, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Categorías"
// // // // // //                   yAxisLabel="Tiempo (s)"
// // // // // //                   unit="s"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Time by Dish */}
// // // // // //               <CardComponent title="Tiempo por Plato (Tiempo en segundos)" colorClass={styles.cardGreen}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={convertData(data?.timeAnalysis?.totalTimeByDish, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Platos"
// // // // // //                   yAxisLabel="Tiempo (s)"
// // // // // //                   unit="s"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Time Distribution */}
// // // // // //               <CardComponent title="Distribución de Tiempo por Categoría (Tiempo en segundos)" colorClass={styles.cardPurple}>
// // // // // //                 {(() => {
// // // // // //                   const timeDistribution = data?.timeAnalysis?.timeDistribution;
// // // // // //                   if (!timeDistribution || typeof timeDistribution !== "object") {
// // // // // //                     return <p>No hay datos disponibles para la distribución de tiempo.</p>;
// // // // // //                   }

// // // // // //                   const chartData = Object.entries(timeDistribution).map(([category, info]: [string, any]) => {
// // // // // //                     const total = typeof info.total === "string" ? parseFloat(info.total.replace("s", "")) : info.total;
// // // // // //                     return { x: category, y: total };
// // // // // //                   });

// // // // // //                   return (
// // // // // //                     <DynamicChart
// // // // // //                       type="pie"
// // // // // //                       data={chartData}
// // // // // //                       xKey="x"
// // // // // //                       yKey="y"
// // // // // //                       width="100%"
// // // // // //                       height={300}
// // // // // //                       colors={["#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f59e0b"]}
// // // // // //                       showLegend
// // // // // //                       showTooltip
// // // // // //                       animation
// // // // // //                     />
// // // // // //                   );
// // // // // //                 })()}
// // // // // //               </CardComponent>

// // // // // //               {/* Visits by Category */}
// // // // // //               <CardComponent title="Visitas por Categoría (Número de visitas)" colorClass={styles.cardRed}>
// // // // // //                 <DynamicChart
// // // // // //                   type="pie"
// // // // // //                   data={convertData(data?.interactionAnalysis?.categoryVisitCount, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Categorías"
// // // // // //                   yAxisLabel="Número de visitas"
// // // // // //                   unit="visitas"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Visits by Dish */}
// // // // // //               <CardComponent title="Visitas por Plato (Número de visitas)" colorClass={styles.cardYellow}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={convertData(data?.interactionAnalysis?.dishVisitCount, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Platos"
// // // // // //                   yAxisLabel="Número de visitas"
// // // // // //                   unit="visitas"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Most Visited Sections */}
// // // // // //               <CardComponent title="Secciones Más Visitadas (Número de visitas)" colorClass={styles.cardBlue}>
// // // // // //                 <DynamicChart
// // // // // //                   type="pie"
// // // // // //                   data={data?.interactionAnalysis?.mostVisitedSections?.map((section: any) => ({
// // // // // //                     x: section.section,
// // // // // //                     y: section.count,
// // // // // //                   }))}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Secciones"
// // // // // //                   yAxisLabel="Número de visitas"
// // // // // //                   unit="visitas"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Least Visited Sections */}
// // // // // //               <CardComponent title="Secciones Menos Visitadas (Número de visitas)" colorClass={styles.cardGreen}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={data?.interactionAnalysis?.leastVisitedSections?.map((section: any) => ({
// // // // // //                     x: section.section,
// // // // // //                     y: section.count,
// // // // // //                   }))}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Secciones"
// // // // // //                   yAxisLabel="Número de visitas"
// // // // // //                   unit="visitas"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Time per Interaction */}
// // // // // //               <CardComponent title="Tiempo por Interacción (Tiempo en milisegundos)" colorClass={styles.cardPurple}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={convertData(data?.efficiencyMetrics?.timePerInteraction, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Categorías"
// // // // // //                   yAxisLabel="Tiempo (ms)"
// // // // // //                   unit="ms"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Engagement Score */}
// // // // // //               <CardComponent title="Puntaje de Interacción (Puntaje por categoría)" colorClass={styles.cardRed}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={convertData(data?.efficiencyMetrics?.engagementScore, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Categorías"
// // // // // //                   yAxisLabel="Puntaje"
// // // // // //                   unit="puntos"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Conversion Potential */}
// // // // // //               <CardComponent title="Potencial de Conversión (Porcentaje por categoría)" colorClass={styles.cardYellow}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={convertData(data?.efficiencyMetrics?.conversionPotential, "x", "y")}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Categorías"
// // // // // //                   yAxisLabel="Potencial"
// // // // // //                   unit="%"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Top Dishes */}
// // // // // //               <CardComponent title="Platos Más Populares (Número de visitas)" colorClass={styles.cardBlue}>
// // // // // //                 <DynamicChart
// // // // // //                   type="bar"
// // // // // //                   data={data?.summary?.topDishes?.map((dish: any) => ({
// // // // // //                     x: dish.name,
// // // // // //                     y: dish.visits,
// // // // // //                   }))}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Platos"
// // // // // //                   yAxisLabel="Número de visitas"
// // // // // //                   unit="visitas"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>

// // // // // //               {/* Top Categories */}
// // // // // //               <CardComponent title="Categorías Más Populares (Número de visitas)" colorClass={styles.cardGreen}>
// // // // // //                 <DynamicChart
// // // // // //                   type="pie"
// // // // // //                   data={data?.summary?.topCategories?.map((category: any) => ({
// // // // // //                     x: category.name,
// // // // // //                     y: category.visits,
// // // // // //                   }))}
// // // // // //                   xKey="x"
// // // // // //                   yKey="y"
// // // // // //                   xAxisLabel="Categorías"
// // // // // //                   yAxisLabel="Número de visitas"
// // // // // //                   unit="visitas"
// // // // // //                   showLegend
// // // // // //                   showTooltip
// // // // // //                   showGrid
// // // // // //                   animation
// // // // // //                 />
// // // // // //               </CardComponent>
// // // // // //             </div>

// // // // // //             {/* Recommendations Section */}
// // // // // //             <div className={styles.recommendationsSection}>
// // // // // //               <CardComponent title="Recomendaciones">
// // // // // //                 <ul>
// // // // // //                   {data?.recommendations?.map((item: string, index: number) => (
// // // // // //                     <li key={index}>{item}</li>
// // // // // //                   ))}
// // // // // //                 </ul>
// // // // // //               </CardComponent>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ),
// // // // // //       },
// // // // // //       {
// // // // // //         segment: 'orders',
// // // // // //         title: 'Orders',
// // // // // //         icon: <ShoppingCartIcon />,
// // // // // //       },
// // // // // //       {
// // // // // //         kind: 'divider',
// // // // // //       },
// // // // // //       {
// // // // // //         segment: 'qr-code',
// // // // // //         title: 'QR Code',
// // // // // //         icon: <QrCode color="#ffffff" />,

// // // // // //         component: () => (
// // // // // //           <div

// // // // // //           >
// // // // // //             <DashboardQr companyName={companyName} />
// // // // // //           </div>
// // // // // //         )
// // // // // //       },
// // // // // //     ],
// // // // // //     [data]
// // // // // //   );

// // // // // //   if (loading) return <LoadingSpinner />;
// // // // // //   if (error) return <ErrorDisplay error={error} />;

// // // // // //   return (
// // // // // //     <Dashboard
// // // // // //       navigation={navigation}
// // // // // //       router={{
// // // // // //         pathname,
// // // // // //         searchParams: new URLSearchParams(),
// // // // // //         navigate: (path: string) => setPathname(path),
// // // // // //       }}
// // // // // //       theme={demoTheme}
// // // // // //     />
// // // // // //   );
// // // // // // };

// // // // // // export default IndexPage;






// // // // // // "use client";
// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { useRouter } from 'next/router';
// // // // // // import { useDispatch } from 'react-redux';

// // // // // // import InboxIcon from '@mui/icons-material/MoveToInbox';
// // // // // // import StarIcon from '@mui/icons-material/Star';
// // // // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // // // import ReportIcon from '@mui/icons-material/Report';
// // // // // // import { ResponsiveDrawer } from '@/components/ResponsiveDrawer/ResponsiveDrawer';
// // // // // // import { Typography } from '@mui/material';

// // // // // // import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// // // // // // import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// // // // // // import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
// // // // // // import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
// // // // // // import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
// // // // // // import Closingsales from '@/components/closingsales/Closingsales';
// // // // // // import { setChExcelData } from '../../../../store/chExcelDataSlice';

// // // // // // const CompanyDashboardPage = () => {
// // // // // //   const router = useRouter();
// // // // // //   const { companyName } = router.query;
// // // // // //   const dispatch = useDispatch();


// // // // // //   const [ClosingsalesC, setClosingsalesC] = useState<boolean>(true);
// // // // // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // // // // //   const [loading, setLoading] = useState(true);


// // // // // //   const [companiesData, setCompaniesData] = useState<any | undefined>();

// // // // // //   useEffect(() => {
// // // // // //     if (!companyName) return; // Esperamos a que esté definido

// // // // // //     const funtionsAsync = async () => {
// // // // // //       try {
// // // // // //         const response = await fetch('/api/readFile', {
// // // // // //           method: 'POST',
// // // // // //           headers: {
// // // // // //             'Content-Type': 'application/json',
// // // // // //           },
// // // // // //           body: JSON.stringify({ folder: companyName }),
// // // // // //         });

// // // // // //         const result: any = await response.json();

// // // // // //         if (!response.ok) {
// // // // // //           throw new Error(result.error || 'Error al obtener los datos');
// // // // // //         }
// // // // // //         setCompaniesData(result)
// // // // // //         dispatch(setChExcelData({
// // // // // //           ok: true,
// // // // // //           data: result.data,
// // // // // //           error: null,
// // // // // //           message: 'Datos cargados correctamente',
// // // // // //         }));



// // // // // //         console.log('Datos de la empresa:', result.data);
// // // // // //         // Aquí podrías guardar los datos en un estado
// // // // // //         setLoading(false);
// // // // // //       } catch (error) {
// // // // // //         console.error('Error al hacer fetch:', error);
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     }

// // // // // //     funtionsAsync();
// // // // // //   }, [companyName]);

// // // // // //   if (!companyName || loading) return <strong>Loading...</strong>;

// // // // // //   const sections: any[] = [
// // // // // //     {
// // // // // //       items: [
// // // // // //         { text: 'Inbox', icon: <InboxIcon />, onClick: () => console.log('Inbox') },
// // // // // //         { text: 'Starred', icon: <StarIcon />, onClick: () => console.log('Starred') },
// // // // // //       ],
// // // // // //       divider: true,
// // // // // //     },
// // // // // //     {
// // // // // //       items: [
// // // // // //         { text: 'Orders', icon: <ShoppingCartOutlinedIcon />, onClick: () => console.log('Spam') },
// // // // // //         { text: 'Employees', icon: <BadgeOutlinedIcon />, onClick: () => console.log('Spam') },
// // // // // //         { text: 'Cheks', icon: <QueryBuilderOutlinedIcon />, onClick: () => console.log('Spam') },
// // // // // //         { text: 'Analithic Menu', icon: <AnalyticsOutlinedIcon />, onClick: () => console.log('Spam') },
// // // // // //       ],
// // // // // //       divider: true,
// // // // // //     },
// // // // // //     {
// // // // // //       items: [
// // // // // //         { text: 'Closing the sale - Z', icon: <DonutSmallOutlinedIcon />, onClick: () => console.log('Spam') },
// // // // // //       ],
// // // // // //       divider: true,
// // // // // //     },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h1>Dashboard for {companyName}</h1>
// // // // // //       <ResponsiveDrawer
// // // // // //         title={`Comp ${companyName}`}
// // // // // //         sections={sections}
// // // // // //         drawerWidth={280}
// // // // // //         open={drawerOpen}
// // // // // //         onOpenChange={setDrawerOpen}
// // // // // //       >
// // // // // //         <Typography>
// // // // // //           ¡Contenido principal aquí! El Drawer es totalmente personalizable.
// // // // // //         </Typography>

// // // // // //         {(ClosingsalesC && companiesData) && <Closingsales turno_id="mañana" companyId={companiesData.data._id} fecha={""}   />}

// // // // // //       </ResponsiveDrawer>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CompanyDashboardPage;

// // // // // "use client";
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useRouter } from 'next/router';
// // // // // import { useDispatch } from 'react-redux';
// // // // // import {
// // // // //   Typography,
// // // // //   Box,
// // // // //   Button,
// // // // //   MenuItem,
// // // // //   TextField,
// // // // //   Paper,
// // // // //   Grid,
// // // // //   IconButton,
// // // // //   CircularProgress,
// // // // //   Dialog,
// // // // //   DialogTitle,
// // // // //   DialogContent,
// // // // //   DialogActions,
// // // // //   Tabs,
// // // // //   Tab,
// // // // //   Chip,
// // // // //   Divider
// // // // // } from '@mui/material';
// // // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // // import dayjs, { Dayjs } from 'dayjs';
// // // // // import 'dayjs/locale/es'; // Importa el locale español

// // // // // // Icons
// // // // // import CloseIcon from '@mui/icons-material/Close';
// // // // // import RefreshIcon from '@mui/icons-material/Refresh';
// // // // // import EventIcon from '@mui/icons-material/Event';
// // // // // import DateRangeIcon from '@mui/icons-material/DateRange';
// // // // // import UpdateIcon from '@mui/icons-material/Update';
// // // // // import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// // // // // import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// // // // // import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
// // // // // import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
// // // // // import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';

// // // // // // Components
// // // // // import { ResponsiveDrawer } from '@/components/ResponsiveDrawer/ResponsiveDrawer';
// // // // // import { setChExcelData } from '../../../../store/chExcelDataSlice';

// // // // // // Configura DayJS en español
// // // // // dayjs.locale('es');

// // // // // interface ClosingSale {
// // // // //   _id: string;
// // // // //   turno_id: string;
// // // // //   closing_date: string;
// // // // //   total_sales: number;
// // // // //   total_cash: number;
// // // // //   total_card: number;
// // // // //   total_transfer: number;
// // // // //   total_other: number;
// // // // //   transaction_count: number;
// // // // //   complete_closing: boolean;
// // // // // }

// // // // // const CompanyDashboardPage = () => {
// // // // //   const router = useRouter();
// // // // //   const { companyName } = router.query;
// // // // //   const dispatch = useDispatch();

// // // // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [companiesData, setCompaniesData] = useState<any | undefined>();
// // // // //   const [closingData, setClosingData] = useState<ClosingSale[]>([]);
// // // // //   const [loadingClosings, setLoadingClosings] = useState(false);
// // // // //   const [searchMode, setSearchMode] = useState<'day' | 'range' | 'latest'>('latest');
// // // // //   const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
// // // // //   const [startDate, setStartDate] = useState<Dayjs>(dayjs());
// // // // //   const [endDate, setEndDate] = useState<Dayjs>(dayjs());
// // // // //   const [openDialog, setOpenDialog] = useState(false);
// // // // //   const [activeTab, setActiveTab] = useState(0);

// // // // //   useEffect(() => {
// // // // //     if (!companyName) return;

// // // // //     const fetchCompanyData = async () => {
// // // // //       try {
// // // // //         const response = await fetch('/api/readFile', {
// // // // //           method: 'POST',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify({ folder: companyName }),
// // // // //         });

// // // // //         const result = await response.json();

// // // // //         if (!response.ok) {
// // // // //           throw new Error(result.error || 'Error al obtener los datos');
// // // // //         }

// // // // //         setCompaniesData(result);
// // // // //         dispatch(setChExcelData({
// // // // //           ok: true,
// // // // //           data: result.data,
// // // // //           error: null,
// // // // //           message: 'Datos cargados correctamente',
// // // // //         }));

// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error('Error al hacer fetch:', error);
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchCompanyData();
// // // // //   }, [companyName, dispatch]);

// // // // //   const fetchClosingSales = async () => {
// // // // //     if (!companiesData?.data?._id) return;

// // // // //     setLoadingClosings(true);
// // // // //     try {
// // // // //       let url = `/api/closingsales?companyId=${companiesData.data._id}`;

// // // // //       if (searchMode === 'day') {
// // // // //         const dateStr = selectedDate.format('YYYY-MM-DD');
// // // // //         url += `&fecha=${dateStr}`;
// // // // //       } else if (searchMode === 'range') {
// // // // //         const startStr = startDate.format('YYYY-MM-DD');
// // // // //         const endStr = endDate.format('YYYY-MM-DD');
// // // // //         url += `&startDate=${startStr}&endDate=${endStr}`;
// // // // //       } else if (searchMode === 'latest') {
// // // // //         url += '&latest=true';
// // // // //       }

// // // // //       const response = await fetch(url);
// // // // //       const data = await response.json();

// // // // //       if (response.ok) {
// // // // //         setClosingData(Array.isArray(data) ? data : [data]);
// // // // //         setOpenDialog(false);
// // // // //       } else {
// // // // //         console.error('Error fetching closing sales:', data.error);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching closing sales:', error);
// // // // //     } finally {
// // // // //       setLoadingClosings(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (searchMode === 'latest' && companiesData?.data?._id) {
// // // // //       fetchClosingSales();
// // // // //     }
// // // // //   }, [searchMode, companiesData]);

// // // // //   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
// // // // //     setActiveTab(newValue);
// // // // //   };

// // // // //   if (!companyName || loading) {
// // // // //     return (
// // // // //       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
// // // // //         <CircularProgress />
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   const sections = [
// // // // //     {
// // // // //       items: [
// // // // //         { text: 'Pedidos', icon: <ShoppingCartOutlinedIcon />, onClick: () => {} },
// // // // //         { text: 'Empleados', icon: <BadgeOutlinedIcon />, onClick: () => {} },
// // // // //         { text: 'Cheques', icon: <QueryBuilderOutlinedIcon />, onClick: () => {} },
// // // // //         { text: 'Analíticas', icon: <AnalyticsOutlinedIcon />, onClick: () => {} },
// // // // //       ],
// // // // //       divider: true,
// // // // //     },
// // // // //     {
// // // // //       items: [
// // // // //         { 
// // // // //           text: 'Cierre Z', 
// // // // //           icon: <DonutSmallOutlinedIcon />, 
// // // // //           onClick: () => setOpenDialog(true) 
// // // // //         },
// // // // //       ],
// // // // //       divider: true,
// // // // //     },
// // // // //   ];

// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
// // // // //       <div>
// // // // //         <ResponsiveDrawer
// // // // //           title={`${companyName}`}
// // // // //           sections={sections}
// // // // //           drawerWidth={280}
// // // // //           open={drawerOpen}
// // // // //           onOpenChange={setDrawerOpen}
// // // // //         >
// // // // //           <Box p={3}>
// // // // //             <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
// // // // //               Reporte de Cierres Z
// // // // //             </Typography>

// // // // //             <Tabs 
// // // // //               value={activeTab} 
// // // // //               onChange={handleTabChange} 
// // // // //               sx={{ mb: 3 }}
// // // // //               indicatorColor="primary"
// // // // //               textColor="primary"
// // // // //             >
// // // // //               <Tab label="Resumen" />
// // // // //               <Tab label="Detalles" />
// // // // //             </Tabs>

// // // // //             <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // //               <Button 
// // // // //                 variant="outlined" 
// // // // //                 startIcon={<RefreshIcon />}
// // // // //                 onClick={() => fetchClosingSales()}
// // // // //                 sx={{ textTransform: 'none' }}
// // // // //               >
// // // // //                 Actualizar Datos
// // // // //               </Button>
// // // // //               <Button 
// // // // //                 variant="contained" 
// // // // //                 startIcon={<EventIcon />}
// // // // //                 onClick={() => setOpenDialog(true)}
// // // // //                 sx={{ textTransform: 'none' }}
// // // // //               >
// // // // //                 Buscar Cierres
// // // // //               </Button>
// // // // //             </Box>

// // // // //             <Divider sx={{ my: 3 }} />

// // // // //             {closingData.length > 0 ? (
// // // // //               <Grid container spacing={3}>
// // // // //                 {closingData.map((closing, index) => (
// // // // //                   <Grid item xs={12} md={6} lg={4} key={index}>
// // // // //                     <Paper elevation={3} sx={{ 
// // // // //                       p: 3, 
// // // // //                       borderRadius: 2,
// // // // //                       height: '100%',
// // // // //                       display: 'flex',
// // // // //                       flexDirection: 'column',
// // // // //                       borderLeft: '4px solid',
// // // // //                       borderColor: closing.turno_id === 'mañana' ? 'primary.main' : 'secondary.main'
// // // // //                     }}>
// // // // //                       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // // //                         <Typography variant="h6" fontWeight="medium">
// // // // //                           {dayjs(closing.closing_date).format('dddd, D [de] MMMM [de] YYYY')}
// // // // //                         </Typography>
// // // // //                         <Chip 
// // // // //                           label={closing.turno_id} 
// // // // //                           color={closing.turno_id === 'mañana' ? 'primary' : 'secondary'} 
// // // // //                           size="small"
// // // // //                         />
// // // // //                       </Box>

// // // // //                       <Box sx={{ mb: 2, flexGrow: 1 }}>
// // // // //                         <Typography variant="subtitle1" color="text.secondary" gutterBottom>
// // // // //                           Resumen de Ventas
// // // // //                         </Typography>

// // // // //                         <Box sx={{ 
// // // // //                           backgroundColor: 'primary.light', 
// // // // //                           p: 2, 
// // // // //                           borderRadius: 1,
// // // // //                           mb: 2
// // // // //                         }}>
// // // // //                           <Typography variant="body2" color="primary.contrastText">
// // // // //                             Ventas Totales
// // // // //                           </Typography>
// // // // //                           <Typography variant="h4" fontWeight="bold" color="primary.contrastText">
// // // // //                             ${closing.total_sales.toFixed(2)}
// // // // //                           </Typography>
// // // // //                         </Box>

// // // // //                         <Grid container spacing={2}>
// // // // //                           <Grid item xs={6}>
// // // // //                             <Paper elevation={0} sx={{ p: 1.5, backgroundColor: 'grey.100' }}>
// // // // //                               <Typography variant="body2" color="text.secondary">
// // // // //                                 Efectivo
// // // // //                               </Typography>
// // // // //                               <Typography variant="body1" fontWeight="medium">
// // // // //                                 ${closing.total_cash.toFixed(2)}
// // // // //                               </Typography>
// // // // //                             </Paper>
// // // // //                           </Grid>
// // // // //                           <Grid item xs={6}>
// // // // //                             <Paper elevation={0} sx={{ p: 1.5, backgroundColor: 'grey.100' }}>
// // // // //                               <Typography variant="body2" color="text.secondary">
// // // // //                                 Tarjeta
// // // // //                               </Typography>
// // // // //                               <Typography variant="body1" fontWeight="medium">
// // // // //                                 ${closing.total_card.toFixed(2)}
// // // // //                               </Typography>
// // // // //                             </Paper>
// // // // //                           </Grid>
// // // // //                           <Grid item xs={6}>
// // // // //                             <Paper elevation={0} sx={{ p: 1.5, backgroundColor: 'grey.100' }}>
// // // // //                               <Typography variant="body2" color="text.secondary">
// // // // //                                 Transferencia
// // // // //                               </Typography>
// // // // //                               <Typography variant="body1" fontWeight="medium">
// // // // //                                 ${closing.total_transfer.toFixed(2)}
// // // // //                               </Typography>
// // // // //                             </Paper>
// // // // //                           </Grid>
// // // // //                           <Grid item xs={6}>
// // // // //                             <Paper elevation={0} sx={{ p: 1.5, backgroundColor: 'grey.100' }}>
// // // // //                               <Typography variant="body2" color="text.secondary">
// // // // //                                 Otras
// // // // //                               </Typography>
// // // // //                               <Typography variant="body1" fontWeight="medium">
// // // // //                                 ${closing.total_other.toFixed(2)}
// // // // //                               </Typography>
// // // // //                             </Paper>
// // // // //                           </Grid>
// // // // //                         </Grid>
// // // // //                       </Box>

// // // // //                       <Box sx={{ 
// // // // //                         display: 'flex', 
// // // // //                         justifyContent: 'space-between',
// // // // //                         alignItems: 'center',
// // // // //                         mt: 'auto'
// // // // //                       }}>
// // // // //                         <Typography variant="caption" color="text.secondary">
// // // // //                           {closing.transaction_count} transacciones
// // // // //                         </Typography>
// // // // //                         <Chip 
// // // // //                           label={closing.complete_closing ? 'Completo' : 'Pendiente'} 
// // // // //                           size="small"
// // // // //                           variant="outlined"
// // // // //                           color={closing.complete_closing ? 'success' : 'warning'}
// // // // //                         />
// // // // //                       </Box>
// // // // //                     </Paper>
// // // // //                   </Grid>
// // // // //                 ))}
// // // // //               </Grid>
// // // // //             ) : (
// // // // //               <Paper elevation={3} sx={{ 
// // // // //                 p: 4, 
// // // // //                 textAlign: 'center',
// // // // //                 display: 'flex',
// // // // //                 flexDirection: 'column',
// // // // //                 alignItems: 'center',
// // // // //                 gap: 2
// // // // //               }}>
// // // // //                 <Typography variant="h6" color="text.secondary">
// // // // //                   No se encontraron cierres Z
// // // // //                 </Typography>
// // // // //                 <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
// // // // //                   {searchMode === 'latest' 
// // // // //                     ? 'No hay cierres recientes disponibles' 
// // // // //                     : 'No hay cierres para el período seleccionado'}
// // // // //                 </Typography>
// // // // //                 <Button 
// // // // //                   variant="outlined" 
// // // // //                   startIcon={<RefreshIcon />}
// // // // //                   onClick={() => fetchClosingSales()}
// // // // //                   sx={{ textTransform: 'none' }}
// // // // //                 >
// // // // //                   Intentar nuevamente
// // // // //                 </Button>
// // // // //               </Paper>
// // // // //             )}
// // // // //           </Box>
// // // // //         </ResponsiveDrawer>

// // // // //         {/* Diálogo de búsqueda */}
// // // // //         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
// // // // //           <DialogTitle sx={{ 
// // // // //             display: 'flex', 
// // // // //             justifyContent: 'space-between', 
// // // // //             alignItems: 'center',
// // // // //             backgroundColor: 'primary.main',
// // // // //             color: 'primary.contrastText'
// // // // //           }}>
// // // // //             <Typography variant="h6">Buscar Cierres Z</Typography>
// // // // //             <IconButton onClick={() => setOpenDialog(false)} sx={{ color: 'primary.contrastText' }}>
// // // // //               <CloseIcon />
// // // // //             </IconButton>
// // // // //           </DialogTitle>

// // // // //           <DialogContent sx={{ pt: 3 }}>
// // // // //             <Box mb={3}>
// // // // //               <TextField
// // // // //                 select
// // // // //                 fullWidth
// // // // //                 label="Modo de búsqueda"
// // // // //                 value={searchMode}
// // // // //                 onChange={(e) => setSearchMode(e.target.value as 'day' | 'range' | 'latest')}
// // // // //                 variant="outlined"
// // // // //                 size="small"
// // // // //               >
// // // // //                 <MenuItem value="latest">
// // // // //                   <Box display="flex" alignItems="center" gap={1}>
// // // // //                     <UpdateIcon fontSize="small" /> Último cierre
// // // // //                   </Box>
// // // // //                 </MenuItem>
// // // // //                 <MenuItem value="day">
// // // // //                   <Box display="flex" alignItems="center" gap={1}>
// // // // //                     <EventIcon fontSize="small" /> Por día específico
// // // // //                   </Box>
// // // // //                 </MenuItem>
// // // // //                 <MenuItem value="range">
// // // // //                   <Box display="flex" alignItems="center" gap={1}>
// // // // //                     <DateRangeIcon fontSize="small" /> Por rango de fechas
// // // // //                   </Box>
// // // // //                 </MenuItem>
// // // // //               </TextField>
// // // // //             </Box>

// // // // //             {searchMode === 'day' && (
// // // // //               <DatePicker
// // // // //                 label="Seleccionar día"
// // // // //                 value={selectedDate}
// // // // //                 onChange={(newValue) => setSelectedDate(newValue || dayjs())}
// // // // //                 slotProps={{
// // // // //                   textField: {
// // // // //                     fullWidth: true,
// // // // //                     size: 'small'
// // // // //                   }
// // // // //                 }}
// // // // //               />
// // // // //             )}

// // // // //             {searchMode === 'range' && (
// // // // //               <Grid container spacing={2}>
// // // // //                 <Grid item xs={6}>
// // // // //                   <DatePicker
// // // // //                     label="Fecha inicial"
// // // // //                     value={startDate}
// // // // //                     onChange={(newValue) => setStartDate(newValue || dayjs())}
// // // // //                     slotProps={{
// // // // //                       textField: {
// // // // //                         fullWidth: true,
// // // // //                         size: 'small'
// // // // //                       }
// // // // //                     }}
// // // // //                   />
// // // // //                 </Grid>
// // // // //                 <Grid item xs={6}>
// // // // //                   <DatePicker
// // // // //                     label="Fecha final"
// // // // //                     value={endDate}
// // // // //                     onChange={(newValue) => setEndDate(newValue || dayjs())}
// // // // //                     slotProps={{
// // // // //                       textField: {
// // // // //                         fullWidth: true,
// // // // //                         size: 'small'
// // // // //                       }
// // // // //                     }}
// // // // //                   />
// // // // //                 </Grid>
// // // // //               </Grid>
// // // // //             )}
// // // // //           </DialogContent>

// // // // //           <DialogActions sx={{ p: 2 }}>
// // // // //             <Button 
// // // // //               onClick={() => setOpenDialog(false)}
// // // // //               color="secondary"
// // // // //               sx={{ textTransform: 'none' }}
// // // // //             >
// // // // //               Cancelar
// // // // //             </Button>
// // // // //             <Button 
// // // // //               onClick={fetchClosingSales} 
// // // // //               variant="contained" 
// // // // //               color="primary"
// // // // //               startIcon={<RefreshIcon />}
// // // // //               disabled={loadingClosings}
// // // // //               sx={{ textTransform: 'none' }}
// // // // //             >
// // // // //               {loadingClosings ? (
// // // // //                 <>
// // // // //                   <CircularProgress size={20} sx={{ mr: 1 }} />
// // // // //                   Buscando...
// // // // //                 </>
// // // // //               ) : 'Buscar Cierres'}
// // // // //             </Button>
// // // // //           </DialogActions>
// // // // //         </Dialog>
// // // // //       </div>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // };

// // // // // export default CompanyDashboardPage;


// "use client"
// import React, { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import { useDispatch } from "react-redux"
// import { Box, CircularProgress, Typography } from "@mui/material"
// import { setChExcelData } from "../../../../store/chExcelDataSlice"
// import { ResponsiveDrawer } from "@/components/ResponsiveDrawer/ResponsiveDrawer"

// // Icons
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
// import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"
// import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined"
// import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined"
// import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined"
// import CierreZPage from "@/components/CierreZ/CierreZ"

// const CompanyDashboardPage = () => {
//   const router = useRouter()
//   const { companyName } = router.query
//   const dispatch = useDispatch()

//   const [drawerOpen, setDrawerOpen] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [companiesData, setCompaniesData] = useState<any | undefined>()
//   const [activeSection, setActiveSection] = useState("cierre-z")

//   useEffect(() => {
//     if (!companyName) return

//     const fetchCompanyData = async () => {
//       try {
//         const response = await fetch("/api/readFile", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ folder: companyName }),
//         })

//         const result = await response.json()

//         if (!response.ok) {
//           throw new Error(result.error || "Error al obtener los datos")
//         }

//         setCompaniesData(result)
//         dispatch(
//           setChExcelData({
//             ok: true,
//             data: result.data,
//             error: null,
//             message: "Datos cargados correctamente",
//           }),
//         )

//         setLoading(false)
//       } catch (error) {
//         console.error("Error al hacer fetch:", error)
//         setLoading(false)
//       }
//     }

//     fetchCompanyData()
//   }, [companyName, dispatch])

//   if (!companyName || loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     )
//   }

//   const sections = [
//     {
//       items: [
//         {
//           text: "Pedidos",
//           icon: <ShoppingCartOutlinedIcon />,
//           onClick: () => setActiveSection("pedidos")
//         },
//         {
//           text: "Empleados",
//           icon: <BadgeOutlinedIcon />,
//           onClick: () => setActiveSection("empleados")
//         },
//         {
//           text: "Cheques",
//           icon: <QueryBuilderOutlinedIcon />,
//           onClick: () => setActiveSection("cheques")
//         },
//         {
//           text: "Analíticas",
//           icon: <AnalyticsOutlinedIcon />,
//           onClick: () => setActiveSection("analiticas")
//         },
//       ],
//       divider: true,
//     },
//     {
//       items: [
//         {
//           text: "Cierre Z",
//           icon: <DonutSmallOutlinedIcon />,
//           onClick: () => setActiveSection("cierre-z"),
//         },
//       ],
//       divider: true,
//     },
//   ]

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case "cierre-z":
//         return <CierreZPage companyId={companiesData?.data?._id} />
//       case "pedidos":
//         return <Typography variant="h4">Pedidos</Typography>
//       case "empleados":
//         return <Typography variant="h4">Empleados</Typography>
//       case "cheques":
//         return <Typography variant="h4">Cheques</Typography>
//       case "analiticas":
//         return <Typography variant="h4">Analíticas</Typography>
//       default:
//         return <CierreZPage companyId={companiesData?.data?._id} />
//     }
//   }

//   return (
//     <ResponsiveDrawer
//       title={`${companyName}`}
//       sections={sections}
//       drawerWidth={280}
//       open={drawerOpen}
//       onOpenChange={setDrawerOpen}
//     >
//       {renderActiveSection()}
//     </ResponsiveDrawer>
//   )
// }

// export default CompanyDashboardPage


"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { Box, CircularProgress, Typography } from "@mui/material"
import { setChExcelData } from "../../../../store/chExcelDataSlice"
import { ResponsiveDrawer } from "@/components/ResponsiveDrawer/ResponsiveDrawer"
import { motion, AnimatePresence } from "framer-motion"

// Icons
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined"
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined"
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined"
import CierreZPage from "@/components/CierreZ/CierreZ"

const CompanyDashboardPage = () => {
  const router = useRouter()
  const { companyName } = router.query
  const dispatch = useDispatch()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [companiesData, setCompaniesData] = useState<any | undefined>()
  const [activeSection, setActiveSection] = useState("z-closing")

  useEffect(() => {
    if (!companyName) return

    const fetchCompanyData = async () => {
      try {
        const response = await fetch("/api/readFile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ folder: companyName }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || "Error fetching data")
        }

        setCompaniesData(result)
        dispatch(
          setChExcelData({
            ok: true,
            data: result.data,
            error: null,
            message: "Data loaded successfully",
          }),
        )

        setLoading(false)
      } catch (error) {
        console.error("Fetch error:", error)
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [companyName, dispatch])

  if (!companyName || loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const sections = [
    {
      items: [
        {
          text: "Orders",
          icon: <ShoppingCartOutlinedIcon />,
          onClick: () => setActiveSection("orders")
        },
        {
          text: "Employees",
          icon: <BadgeOutlinedIcon />,
          onClick: () => setActiveSection("employees")
        },
        {
          text: "Checks",
          icon: <QueryBuilderOutlinedIcon />,
          onClick: () => setActiveSection("checks")
        },
        {
          text: "Analytics",
          icon: <AnalyticsOutlinedIcon />,
          onClick: () => setActiveSection("analytics")
        },
      ],
      divider: true,
    },
    {
      items: [
        {
          text: "Z Closing",
          icon: <DonutSmallOutlinedIcon />,
          onClick: () => setActiveSection("z-closing"),
        },
      ],
      divider: true,
    },
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case "z-closing":
        return (
          <motion.div
            key="z-closing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CierreZPage companyId={companiesData?.data?._id} />
          </motion.div>
        )
      case "orders":
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h4">Orders</Typography>
          </motion.div>
        )
      case "employees":
        return (
          <motion.div
            key="employees"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h4">Employees</Typography>
          </motion.div>
        )
      case "checks":
        return (
          <motion.div
            key="checks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h4">Checks</Typography>
          </motion.div>
        )
      case "analytics":
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h4">Analytics</Typography>
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CierreZPage companyId={companiesData?.data?._id} />
          </motion.div>
        )
    }
  }

  return (
    <ResponsiveDrawer
      title={`${companyName}`}
      sections={sections}
      drawerWidth={280}
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
    >
      <AnimatePresence mode="wait">
        {renderActiveSection()}
      </AnimatePresence>
    </ResponsiveDrawer>
  )
}

export default CompanyDashboardPage