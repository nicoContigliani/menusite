// "use client";

// import * as React from "react";
// import { extendTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Dashboard from "@/components/Dashboard/Dashboard";
// import { useRouter as useNextRouter } from "next/router";
// import styles from "@/styles/Dashboard.module.css";
// import DynamicChart from "@/components/Recharts/GraphicsReutilizable";
// import { ShoppingCartIcon, QrCode } from "lucide-react";
// import DashboardQr from "@/components/DashboardGeneral/DashboardQR/DashboardQr";


// // Theme configuration
// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// // Loading Spinner Component
// const LoadingSpinner = () => (
//   <div className={styles.loadingSpinner}>
//     <div className={styles.spinner}></div>
//   </div>
// );

// // Error Display Component
// const ErrorDisplay = ({ error }: { error: string }) => (
//   <div className={styles.errorDisplay}>
//     <h2>Error</h2>
//     <p>{error}</p>
//   </div>
// );

// // Card Component
// const CardComponent = React.memo(({ title, children, colorClass }: { title: string; children: React.ReactNode; colorClass?: string }) => (
//   <div className={`${styles.card} ${colorClass || ""}`}>
//     <h2>{title}</h2>
//     {children}
//   </div>
// ));

// // Main Component
// const IndexPage = () => {
//   const [pathname, setPathname] = React.useState("/dashboard");
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);
//   const [data, setData] = React.useState<any>(null);

//   const router = useNextRouter();
//   const { companyName } = router.query;

//   // Fetch data from API
//   React.useEffect(() => {
//     const fetchData = async () => {
//       if (!companyName) return;

//       try {
//         setLoading(true);
//         const res = await fetch(`/api/dashboard?companyname=${companyName}`);
//         if (!res.ok) throw new Error("Error fetching data");
//         const json = await res.json();
//         console.log("🚀 ~ fetchData ~ json:", json);
//         setData(json);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [companyName]);

//   // Convert data to a format suitable for charts
//   const convertData = (data: any, xKey: string, yKey: string) => {
//     if (!data) return [];

//     if (Array.isArray(data)) {
//       return data.map((item) => ({ x: item[xKey], y: item[yKey] }));
//     }

//     return Object.keys(data).map((key) => {
//       const value = data[key];
//       const yValue =
//         typeof value === "string" && value.endsWith("s")
//           ? parseFloat(value.replace("s", ""))
//           : value;
//       return { x: key, y: yValue };
//     });
//   };

//   // Calculate the total of a dataset
//   const calculateTotal = (data: Record<string, number>) => {
//     return Object.values(data).reduce((acc, value) => acc + value, 0);
//   };

//   // Navigation configuration
//   const navigation = React.useMemo(
//     () => [
//       {
//         kind: "header",
//         title: "Dashboard",
//       },
//       {
//         segment: "dashboard",
//         title: "Dashboard",
//         icon: <DashboardIcon />,
//         component: () => (
//           <div className={styles.container}>
//             {/* Header */}
//             <div className={styles.header}>
//               <h1>Dashboard de {data?.clientInfo?.companyName || "Empresa"}</h1>
//             </div>

//             {/* KPI Section */}
//             <div className={styles.kpiSection}>
//               <CardComponent title="Tiempo Promedio por Sección" colorClass={styles.cardBlue}>
//                 <p>
//                   {data?.timeAnalysis?.averageTimePerSection
//                     ? `${data.timeAnalysis.averageTimePerSection}s`
//                     : "N/A"}
//                 </p>
//               </CardComponent>
//               <CardComponent title="Interacción Total (Puntaje)" colorClass={styles.cardGreen}>
//                 <p>
//                   {data?.efficiencyMetrics?.engagementScore
//                     ? calculateTotal(data.efficiencyMetrics.engagementScore)
//                     : "N/A"}
//                 </p>
//               </CardComponent>
//               <CardComponent title="Potencial de Conversión" colorClass={styles.cardPurple}>
//                 <p>
//                   {data?.efficiencyMetrics?.conversionPotential
//                     ? `${calculateTotal(data.efficiencyMetrics.conversionPotential)}%`
//                     : "N/A"}
//                 </p>
//               </CardComponent>
//             </div>

//             {/* Chart Section */}
//             <div className={styles.chartSection}>
//               {/* Time by Category */}
//               <CardComponent title="Tiempo por Categoría (Tiempo en segundos)" colorClass={styles.cardBlue}>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data?.timeAnalysis?.totalTimeByCategory, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Categorías"
//                   yAxisLabel="Tiempo (s)"
//                   unit="s"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Time by Dish */}
//               <CardComponent title="Tiempo por Plato (Tiempo en segundos)" colorClass={styles.cardGreen}>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data?.timeAnalysis?.totalTimeByDish, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Platos"
//                   yAxisLabel="Tiempo (s)"
//                   unit="s"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Time Distribution */}
//               <CardComponent title="Distribución de Tiempo por Categoría (Tiempo en segundos)" colorClass={styles.cardPurple}>
//                 {(() => {
//                   const timeDistribution = data?.timeAnalysis?.timeDistribution;
//                   if (!timeDistribution || typeof timeDistribution !== "object") {
//                     return <p>No hay datos disponibles para la distribución de tiempo.</p>;
//                   }

//                   const chartData = Object.entries(timeDistribution).map(([category, info]: [string, any]) => {
//                     const total = typeof info.total === "string" ? parseFloat(info.total.replace("s", "")) : info.total;
//                     return { x: category, y: total };
//                   });

//                   return (
//                     <DynamicChart
//                       type="pie"
//                       data={chartData}
//                       xKey="x"
//                       yKey="y"
//                       width="100%"
//                       height={300}
//                       colors={["#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f59e0b"]}
//                       showLegend
//                       showTooltip
//                       animation
//                     />
//                   );
//                 })()}
//               </CardComponent>

//               {/* Visits by Category */}
//               <CardComponent title="Visitas por Categoría (Número de visitas)" colorClass={styles.cardRed}>
//                 <DynamicChart
//                   type="pie"
//                   data={convertData(data?.interactionAnalysis?.categoryVisitCount, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Categorías"
//                   yAxisLabel="Número de visitas"
//                   unit="visitas"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Visits by Dish */}
//               <CardComponent title="Visitas por Plato (Número de visitas)" colorClass={styles.cardYellow}>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data?.interactionAnalysis?.dishVisitCount, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Platos"
//                   yAxisLabel="Número de visitas"
//                   unit="visitas"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Most Visited Sections */}
//               <CardComponent title="Secciones Más Visitadas (Número de visitas)" colorClass={styles.cardBlue}>
//                 <DynamicChart
//                   type="pie"
//                   data={data?.interactionAnalysis?.mostVisitedSections?.map((section: any) => ({
//                     x: section.section,
//                     y: section.count,
//                   }))}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Secciones"
//                   yAxisLabel="Número de visitas"
//                   unit="visitas"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Least Visited Sections */}
//               <CardComponent title="Secciones Menos Visitadas (Número de visitas)" colorClass={styles.cardGreen}>
//                 <DynamicChart
//                   type="bar"
//                   data={data?.interactionAnalysis?.leastVisitedSections?.map((section: any) => ({
//                     x: section.section,
//                     y: section.count,
//                   }))}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Secciones"
//                   yAxisLabel="Número de visitas"
//                   unit="visitas"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Time per Interaction */}
//               <CardComponent title="Tiempo por Interacción (Tiempo en milisegundos)" colorClass={styles.cardPurple}>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data?.efficiencyMetrics?.timePerInteraction, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Categorías"
//                   yAxisLabel="Tiempo (ms)"
//                   unit="ms"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Engagement Score */}
//               <CardComponent title="Puntaje de Interacción (Puntaje por categoría)" colorClass={styles.cardRed}>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data?.efficiencyMetrics?.engagementScore, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Categorías"
//                   yAxisLabel="Puntaje"
//                   unit="puntos"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Conversion Potential */}
//               <CardComponent title="Potencial de Conversión (Porcentaje por categoría)" colorClass={styles.cardYellow}>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data?.efficiencyMetrics?.conversionPotential, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Categorías"
//                   yAxisLabel="Potencial"
//                   unit="%"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Top Dishes */}
//               <CardComponent title="Platos Más Populares (Número de visitas)" colorClass={styles.cardBlue}>
//                 <DynamicChart
//                   type="bar"
//                   data={data?.summary?.topDishes?.map((dish: any) => ({
//                     x: dish.name,
//                     y: dish.visits,
//                   }))}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Platos"
//                   yAxisLabel="Número de visitas"
//                   unit="visitas"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>

//               {/* Top Categories */}
//               <CardComponent title="Categorías Más Populares (Número de visitas)" colorClass={styles.cardGreen}>
//                 <DynamicChart
//                   type="pie"
//                   data={data?.summary?.topCategories?.map((category: any) => ({
//                     x: category.name,
//                     y: category.visits,
//                   }))}
//                   xKey="x"
//                   yKey="y"
//                   xAxisLabel="Categorías"
//                   yAxisLabel="Número de visitas"
//                   unit="visitas"
//                   showLegend
//                   showTooltip
//                   showGrid
//                   animation
//                 />
//               </CardComponent>
//             </div>

//             {/* Recommendations Section */}
//             <div className={styles.recommendationsSection}>
//               <CardComponent title="Recomendaciones">
//                 <ul>
//                   {data?.recommendations?.map((item: string, index: number) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </CardComponent>
//             </div>
//           </div>
//         ),
//       },
//       {
//         segment: 'orders',
//         title: 'Orders',
//         icon: <ShoppingCartIcon />,
//       },
//       {
//         kind: 'divider',
//       },
//       {
//         segment: 'qr-code',
//         title: 'QR Code',
//         icon: <QrCode color="#ffffff" />,

//         component: () => (
//           <div
     
//           >
//             <DashboardQr companyName={companyName} />
//           </div>
//         )
//       },
//     ],
//     [data]
//   );

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorDisplay error={error} />;

//   return (
//     <Dashboard
//       navigation={navigation}
//       router={{
//         pathname,
//         searchParams: new URLSearchParams(),
//         navigate: (path: string) => setPathname(path),
//       }}
//       theme={demoTheme}
//     />
//   );
// };

// export default IndexPage;
import React from 'react'

const Hola = () => {
  return (
    <div>[companyName]</div>
  )
}

export default Hola