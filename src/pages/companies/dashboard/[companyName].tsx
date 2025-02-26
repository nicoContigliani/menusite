// // import { useRouter } from 'next/router';
// // import { useEffect, useState } from 'react';
// // import { Box, Typography, Button, CircularProgress } from '@mui/material';

// // export default function CompanyAnalytics() {
// //   const router = useRouter();
// //   const { companyName } = router.query;
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [refreshTrigger, setRefreshTrigger] = useState(0); // Para refrescar datos manualmente

// //   console.log("🚀 ~ CompanyAnalytics ~ data:", data)
// //   useEffect(() => {
// //     if (!companyName) return; // No ejecutar si no hay un companyName

// //     async function fetchData() {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         const url = `/api/dashboard?companyname=${companyName}`;
// //         console.log("🚀 ~ useEffect ~ url:", url);

// //         const res = await fetch(url);
// //         if (!res.ok) throw new Error("Error fetching data");

// //         const json = await res.json();
// //         setData(json);
// //       } catch (err: any) {
// //         console.error("🚀 ~ fetchData ~ err:", err);
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchData();
// //   }, [companyName, refreshTrigger]); // Se ejecuta cuando companyName cambia o se presiona el botón de refresh

// //   return (
// //     <Box sx={{ textAlign: 'center', mt: 6 }}>
// //       <Typography variant="h4">Analytics for {companyName}</Typography>

// //       {loading && <CircularProgress />}
// //       {error && <Typography color="error">{error}</Typography>}
// //       {data && <Typography variant="body1">{JSON.stringify(data, null, 2)}</Typography>}

// //       <Button 
// //         variant="contained" 
// //         color="primary" 
// //         onClick={() => setRefreshTrigger(prev => prev + 1)}
// //         sx={{ mt: 2 }}
// //       >
// //         Refresh Data
// //       </Button>
// //     </Box>
// //   );
// // }





// import * as React from 'react';
// import { extendTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LayersIcon from '@mui/icons-material/Layers';
// import Dashboard from '@/components/Dashboard/Dashboard';
// import DashboardBody from '@/components/Dashboard/DashboardBody/DashboardBody';

// import { useRouter as useNextRouter } from 'next/router';
// import PieChartComponent from '@/components/Recharts/Example';
// import DashboardCard from '@/components/Dashboard/DashboardCard/DashboardCard';
// import styles from '@/styles/Dashboard.module.css'
// import { formaterGraphics } from '@/services/dashboardServices/formaterGraphics.services';
// import DynamicChart from '@/components/Recharts/GraphicsReutilizable';



// // Theme configuration
// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: 'class',
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// const IndexPage = () => {
//   const [pathname, setPathname] = React.useState('/dashboard');
//   const [refreshTrigger, setRefreshTrigger] = React.useState<number>(0);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);
//   const [data, setData] = React.useState<any>();

//   const [sectionAll, setSectionAll] = React.useState<any>([])

//   const [clientInfo, setClientInfo] = React.useState<any>({})
//   const [efficiencyMetrics, setEfficiencyMetrics] = React.useState<any>({})
//   const [interactionAnalysis, setInteractionAnalysis] = React.useState<any>({})
//   const [recommendations, setRecommendations] = React.useState<any>({})
//   console.log("🚀 ~ IndexPage ~ recommendations:", recommendations)
//   const [summary, setSummary] = React.useState<any>({})
//   const [temporalPatterns, setTemporalPatterns] = React.useState<any>({})
//   const [timeAnalysis, setTimeAnalysis] = React.useState<any>({})

//   const routers = useNextRouter(); // Usa un nombre diferente para evitar conflictos
//   const { companyName } = routers.query;
//   console.log("🚀 ~ IndexPage ~ companyName:", companyName)

//   React.useEffect(() => {
//     async function fetchData() {
//       if (!companyName) return; // 👈 Evita hacer la petición si companyName es vacío

//       try {
//         setLoading(true); // 👈 Se activa el estado de carga

//         const url: any = `/api/dashboard?companyname=${companyName}`;

//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Error fetching data");

//         const json = await res.json();

//         if (json) {
//           setData(json); // 👈 Actualiza el estado con los datos recibidos
//         } else {
//           console.warn("Empty response received from API");
//         }
//       } catch (err: any) {
//         console.error("🚀 ~ fetchData ~ err:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [companyName]);


//   React.useEffect(() => {
//     if (data?.clientInfo) {
//       setClientInfo(data.clientInfo)
//       setEfficiencyMetrics(data.efficiencyMetrics)
//       setInteractionAnalysis(data.interactionAnalysis)
//       setRecommendations(data.recommendations)
//       setSummary(data.summary)
//       setTemporalPatterns(data.temporalPatterns)
//     }

//   }, [data])





//   React.useEffect(() => {
//     const asyncfuntion = async () => {


//       if (efficiencyMetrics?.engagementScore) {
//         const convertObjectToData = (obj: { [key: string]: number } | null | undefined): { x: string, y: number }[] => {
//           if (!obj) {
//             return []; // Si obj es null o undefined, retornamos un array vacío.
//           }
//           return Object.keys(obj).map(key => ({
//             x: key,
//             y: obj[key]
//           }));
//         };

//         const dataReturn = convertObjectToData(efficiencyMetrics?.engagementScore);
//         console.log("🚀 ~ asyncfuntion ~ dataReturn:", dataReturn);

//       }
//     };

//     asyncfuntion(); // Llamamos a la función asincrónica aquí sin esperar su resultado directamente

//   }, [efficiencyMetrics]); // Dependencia de 'data', asegura que se vuelva a ejecutar cuando 'data' cambie


//   const convertObjectToData = (obj: { [key: string]: number } | null | undefined): { x: string, y: number }[] => {
//     if (!obj) {
//       return []; // Si obj es null o undefined, retornamos un array vacío.
//     }
//     return Object.keys(obj)?.map(key => ({
//       x: key,
//       y: obj[key]
//     }));
//   };


//   const convertArrayData = (dataArray: { section: string; count: number }[]): { x: string; y: number }[] => {
//     return dataArray?.map((item) => ({
//       x: item.section, // Extraemos la propiedad 'section' para x
//       y: item.count    // Extraemos la propiedad 'count' para y
//     }));
//   };




//   const datas = [
//     { x: 'A', y: 30 },
//     { x: 'B', y: 80 },
//     { x: 'C', y: 45 },
//     { x: 'D', y: 45 },

//   ];




//   const router = {
//     pathname,
//     searchParams: new URLSearchParams(),
//     navigate: (path: string) => setPathname(path),
//   };

//   const NAVIGATION = React.useMemo(() => [
//     {
//       kind: 'header',
//       title: 'Main items',
//     },
//     {
//       segment: 'dashboard',
//       title: 'Dashboard',
//       icon: <DashboardIcon />,
//       component: () => (

//         <div className={styles.container}>
//           <div className={styles.grid}>
//             <div className={styles.card}>
//               <h3>Recomendaciones</h3>
//               <br />

//               {recommendations && recommendations?.map((item: string, index: number) => (
//                 <div key={index}>{item}</div>
//               ))}
//             </div>

//             {
//               efficiencyMetrics?.engagementScore && (
//                 <div className={styles.card}>
//                   <h2>Interacción</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(efficiencyMetrics?.engagementScore)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>

//               )
//             }
//             {
//               efficiencyMetrics?.timePerInteraction && (
//                 <div className={styles.card}>
//                   <h2>Interacción</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(efficiencyMetrics?.timePerInteraction)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )
//             }
//             {
//               efficiencyMetrics?.conversionPotential && (
//                 <div className={styles.card}>
//                   <h2>Conversión Potencial</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(efficiencyMetrics?.conversionPotential)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )
//             }

//             {
//               interactionAnalysis?.categoryVisitCount && (
//                 <div className={styles.card}>
//                   <h2>Conversión</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(interactionAnalysis?.categoryVisitCount)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )
//             }


//             <div className={styles.card}>
//               <h2>Visitas por categoría</h2>
//               <DynamicChart
//                 type="bar"
//                 data={convertObjectToData(interactionAnalysis?.dishVisitCount)}
//                 xKey="x"
//                 yKey="y"
//                 width="100%"
//                 height={400}
//               />
//             </div>
//             <div className={styles.card}>
//               <h2>Más Visitados</h2>
//               <DynamicChart
//                 type="pie"
//                 data={convertArrayData(interactionAnalysis?.mostVisitedSections)}
//                 xKey="x"
//                 yKey="y"
//                 width="100%"
//                 height={400}
//               />
//             </div>

//             <div className={styles.card}>
//               <h2>Visitas cuantificadas</h2>
//               <DynamicChart
//                 type="bar"
//                 data={convertObjectToData(interactionAnalysis?.sectionVisitCount)}
//                 xKey="x"
//                 yKey="y"
//                 width="100%"
//                 height={400}
//               />
//             </div>
//             <div className={styles.card}>
//               <DynamicChart type="line" data={datas} xKey="x" yKey={["y", "y2"]} />
//             </div>

//             <div className={styles.card}>
//               <DynamicChart type="line" data={datas} xKey="x" yKey={["y", "y2"]} />
//             </div>

//             <div className={styles.card}>
//               <DynamicChart type="line" data={datas} xKey="x" yKey={["y", "y2"]} />
//             </div>
//           </div>
//         </div>





//       ),
//     },
//     // {
//     //   segment: 'orders',
//     //   title: 'Orders',
//     //   icon: <ShoppingCartIcon />,
//     // },
//     // {
//     //   kind: 'divider',
//     // },
//     // {
//     //   kind: 'header',
//     //   title: 'Analytics',
//     // },
//     // {
//     //   segment: 'reports',
//     //   title: 'Reports',
//     //   icon: <BarChartIcon />,
//     //   children: [
//     //     {
//     //       segment: 'sales',
//     //       title: 'Sales',
//     //       icon: <DescriptionIcon />,
//     //     },
//     //     {
//     //       segment: 'traffic',
//     //       title: 'Traffic',
//     //       icon: <DescriptionIcon />,
//     //     },
//     //   ],
//     // },
//     // {
//     //   segment: 'integrations',
//     //   title: 'Integrations',
//     //   icon: <LayersIcon />,
//     // },
//   ], [data]);

//   return (
//     <Dashboard
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//     />
//   );
// };

// export default IndexPage;





// "use client"

// import * as React from "react"
// import { extendTheme } from "@mui/material/styles"
// import DashboardIcon from "@mui/icons-material/Dashboard"
// import Dashboard from "@/components/Dashboard/Dashboard"

// import { useRouter as useNextRouter } from "next/router"
// import styles from "@/styles/Dashboard.module.css"
// import DynamicChart from "@/components/Recharts/GraphicsReutilizable"

// // Theme configuration
// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// })

// const IndexPage = () => {
//   const [pathname, setPathname] = React.useState("/dashboard")
//   const [refreshTrigger, setRefreshTrigger] = React.useState<number>(0)
//   const [loading, setLoading] = React.useState(true)
//   const [error, setError] = React.useState<string | null>(null)
//   const [data, setData] = React.useState<any>()

//   const [sectionAll, setSectionAll] = React.useState<any>([])

//   const [clientInfo, setClientInfo] = React.useState<any>({})
//   const [efficiencyMetrics, setEfficiencyMetrics] = React.useState<any>({})
//   const [interactionAnalysis, setInteractionAnalysis] = React.useState<any>({})
//   const [recommendations, setRecommendations] = React.useState<string[]>([]) // Initialize as empty array
//   const [summary, setSummary] = React.useState<any>({})
//   console.log("🚀 ~ IndexPage ~ summary:", summary)
//   const [temporalPatterns, setTemporalPatterns] = React.useState<any>({})
//   const [timeAnalysis, setTimeAnalysis] = React.useState<any>({})

//   const routers = useNextRouter() // Usa un nombre diferente para evitar conflictos
//   const { companyName } = routers.query
//   console.log("🚀 ~ IndexPage ~ companyName:", companyName)

//   React.useEffect(() => {
//     async function fetchData() {
//       if (!companyName) return // 👈 Evita hacer la petición si companyName es vacío

//       try {
//         setLoading(true) // 👈 Se activa el estado de carga

//         const url: any = `/api/dashboard?companyname=${companyName}`

//         const res = await fetch(url)
//         if (!res.ok) throw new Error("Error fetching data")

//         const json = await res.json()
//         console.log(json,"******************")

//         if (json) {
//           setData(json) // 👈 Actualiza el estado con los datos recibidos
//         } else {
//           console.warn("Empty response received from API")
//         }
//       } catch (err: any) {
//         console.error("🚀 ~ fetchData ~ err:", err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [companyName])

//   React.useEffect(() => {
//     if (data?.clientInfo) {
//       setClientInfo(data.clientInfo)
//       setEfficiencyMetrics(data.efficiencyMetrics)
//       setInteractionAnalysis(data.interactionAnalysis)

//       // Ensure recommendations is always an array
//       if (data.recommendations) {
//         if (Array.isArray(data.recommendations)) {
//           setRecommendations(data.recommendations)
//         } else if (typeof data.recommendations === "object") {
//           // If it's an object, convert to array of strings
//           setRecommendations(Object.values(data.recommendations).map(String))
//         } else if (typeof data.recommendations === "string") {
//           // If it's a single string, wrap in array
//           setRecommendations([data.recommendations])
//         } else {
//           // Default to empty array
//           setRecommendations([])
//         }
//       } else {
//         setRecommendations([])
//       }

//       setSummary(data.summary)
//       setTemporalPatterns(data.temporalPatterns)
//     }
//   }, [data])

//   React.useEffect(() => {
//     const asyncfuntion = async () => {
//       if (efficiencyMetrics?.engagementScore) {
//         const convertObjectToData = (obj: { [key: string]: number } | null | undefined): { x: string; y: number }[] => {
//           if (!obj) {
//             return [] // Si obj es null o undefined, retornamos un array vacío.
//           }
//           return Object.keys(obj).map((key) => ({
//             x: key,
//             y: obj[key],
//           }))
//         }

//         const dataReturn = convertObjectToData(efficiencyMetrics?.engagementScore)
//       }
//     }

//     asyncfuntion() // Llamamos a la función asincrónica aquí sin esperar su resultado directamente
//   }, [efficiencyMetrics]) // Dependencia de 'data', asegura que se vuelva a ejecutar cuando 'data' cambie

//   const convertObjectToData = React.useCallback(
//     (obj: { [key: string]: number } | null | undefined): { x: string; y: number }[] => {
//       if (!obj) {
//         return [] // Si obj es null o undefined, retornamos un array vacío.
//       }
//       return Object.keys(obj)?.map((key) => ({
//         x: key,
//         y: obj[key],
//       }))
//     },
//     [],
//   )

//   const convertArrayData = React.useCallback(
//     (dataArray: { section: string; count: number }[]): { x: string; y: number }[] => {
//       if (!dataArray || !Array.isArray(dataArray)) {
//         return []
//       }
//       return dataArray.map((item) => ({
//         x: item.section, // Extraemos la propiedad 'section' para x
//         y: item.count, // Extraemos la propiedad 'count' para y
//       }))
//     },
//     [],
//   )

//   const datas = [
//     { x: "A", y: 30 },
//     { x: "B", y: 80 },
//     { x: "C", y: 45 },
//     { x: "D", y: 45 },
//   ]

//   const router = {
//     pathname,
//     searchParams: new URLSearchParams(),
//     navigate: (path: string) => setPathname(path),
//   }

//   const NAVIGATION = React.useMemo(
//     () => [
//       {
//         kind: "header",
//         title: "Main items",
//       },
//       {
//         segment: "dashboard",
//         title: "Dashboard",
//         icon: <DashboardIcon />,
//         component: () => (
//           <div className={styles.container}>
//             <div className={styles.grid}>
//               <div className={styles.card}>
//                 <h3>Recomendaciones</h3>
//                 <br />

//                 {Array.isArray(recommendations) &&
//                   recommendations.map((item: string, index: number) => <div key={index}>{item}</div>)}
//               </div>

//               {efficiencyMetrics?.engagementScore && (
//                 <div className={styles.card}>
//                   <h2>Interacción</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(efficiencyMetrics?.engagementScore)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}
//               {efficiencyMetrics?.timePerInteraction && (
//                 <div className={styles.card}>
//                   <h2>Interacción</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(efficiencyMetrics?.timePerInteraction)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}
//               {efficiencyMetrics?.conversionPotential && (
//                 <div className={styles.card}>
//                   <h2>Conversión Potencial</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(efficiencyMetrics?.conversionPotential)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}

//               {interactionAnalysis?.categoryVisitCount && (
//                 <div className={styles.card}>
//                   <h2>Conversión</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(interactionAnalysis?.categoryVisitCount)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}

//               {interactionAnalysis?.dishVisitCount && (
//                 <div className={styles.card}>
//                   <h2>Visitas por categoría</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(interactionAnalysis?.dishVisitCount)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}

//               {interactionAnalysis?.mostVisitedSections && (
//                 <div className={styles.card}>
//                   <h2>Más Visitados</h2>
//                   <DynamicChart
//                     type="pie"
//                     data={convertArrayData(interactionAnalysis?.mostVisitedSections)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}

//               {interactionAnalysis?.sectionVisitCount && (
//                 <div className={styles.card}>
//                   <h2>Visitas cuantificadas</h2>
//                   <DynamicChart
//                     type="bar"
//                     data={convertObjectToData(interactionAnalysis?.sectionVisitCount)}
//                     xKey="x"
//                     yKey="y"
//                     width="100%"
//                     height={400}
//                   />
//                 </div>
//               )}

//               {/* {summary?.effectivenessRatio && (
//                 <div className={styles.card}>
//                   <DynamicChart
//                     type="twoSimplePie"
//                     data={[convertArrayData(summary?.topDishes), convertArrayData(summary?.topCategories)]} // where pieData1 and pieData2 are arrays for each pie chart
//                     xKey="name"
//                     yKey="value"
//                     width="100%" // parent width
//                     height="400px" // parent height
//                   />
//                 </div>

//               )} */}












//               <div className={styles.card}>
//                 <DynamicChart type="line" data={datas} xKey="x" yKey={["y", "y2"]} />
//               </div>

//               <div className={styles.card}>
//                 <DynamicChart type="line" data={datas} xKey="x" yKey={["y", "y2"]} />
//               </div>
//             </div>
//           </div>
//         ),
//       },
//     ],
//     [recommendations, efficiencyMetrics, interactionAnalysis, convertArrayData, convertObjectToData],
//   )

//   return <Dashboard navigation={NAVIGATION} router={router} theme={demoTheme} />
// }

// export default IndexPage




// "use client"

// import * as React from "react"
// import { extendTheme } from "@mui/material/styles"
// import DashboardIcon from "@mui/icons-material/Dashboard"
// import Dashboard from "@/components/Dashboard/Dashboard"
// import { useRouter as useNextRouter } from "next/router"
// import styles from "@/styles/Dashboard.module.css"
// import DynamicChart from "@/components/Recharts/GraphicsReutilizable"

// // Theme configuration
// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: "class",
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// })

// const IndexPage = () => {
//   const [pathname, setPathname] = React.useState("/dashboard")
//   const [loading, setLoading] = React.useState(true)
//   const [error, setError] = React.useState<string | null>(null)
//   const [data, setData] = React.useState<any>(null)

//   const routers = useNextRouter()
//   const { companyName } = routers.query

//   React.useEffect(() => {
//     const fetchData = async () => {
//       if (!companyName) return

//       try {
//         setLoading(true)
//         const res = await fetch(`/api/dashboard?companyname=${companyName}`)
//         if (!res.ok) throw new Error("Error fetching data")
//         const json = await res.json()
//         setData(json)
//       } catch (err: any) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [companyName])

//   const convertData = React.useCallback((data: any, xKey: string, yKey: string) => {
//     if (!data) return []
//     if (Array.isArray(data)) {
//       return data.map(item => ({ x: item[xKey], y: item[yKey] }))
//     }
//     return Object.keys(data).map(key => ({ x: key, y: data[key] }))
//   }, [])

//   const router = {
//     pathname,
//     searchParams: new URLSearchParams(),
//     navigate: (path: string) => setPathname(path),
//   }

//   const NAVIGATION = React.useMemo(() => [
//     {
//       kind: "header",
//       title: "Main items",
//     },
//     {
//       segment: "dashboard",
//       title: "Dashboard",
//       icon: <DashboardIcon />,
//       component: () => (
//         <div className={styles.container}>
//           <div className={styles.grid}>
//             <div className={styles.card}>
//               <h3>Recomendaciones</h3>
//               <br />
//               {data?.recommendations?.map((item: string, index: number) => (
//                 <div key={index}>{item}</div>
//               ))}
//             </div>

//             {data?.efficiencyMetrics?.engagementScore && (
//               <div className={styles.card}>
//                 <h2>Interacción</h2>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data.efficiencyMetrics.engagementScore, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}

//             {data?.efficiencyMetrics?.timePerInteraction && (
//               <div className={styles.card}>
//                 <h2>Interacción</h2>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data.efficiencyMetrics.timePerInteraction, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}

//             {data?.efficiencyMetrics?.conversionPotential && (
//               <div className={styles.card}>
//                 <h2>Conversión Potencial</h2>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data.efficiencyMetrics.conversionPotential, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}

//             {data?.interactionAnalysis?.categoryVisitCount && (
//               <div className={styles.card}>
//                 <h2>Conversión</h2>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data.interactionAnalysis.categoryVisitCount, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}

//             {data?.interactionAnalysis?.dishVisitCount && (
//               <div className={styles.card}>
//                 <h2>Visitas por categoría</h2>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data.interactionAnalysis.dishVisitCount, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}

//             {data?.interactionAnalysis?.mostVisitedSections && (
//               <div className={styles.card}>
//                 <h2>Más Visitados</h2>
//                 <DynamicChart
//                   type="pie"
//                   data={convertData(data.interactionAnalysis.mostVisitedSections, "section", "count")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}

//             {data?.interactionAnalysis?.sectionVisitCount && (
//               <div className={styles.card}>
//                 <h2>Visitas cuantificadas</h2>
//                 <DynamicChart
//                   type="bar"
//                   data={convertData(data.interactionAnalysis.sectionVisitCount, "x", "y")}
//                   xKey="x"
//                   yKey="y"
//                   width="100%"
//                   height={400}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       ),
//     },
//   ], [data, convertData])

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>

//   return <Dashboard navigation={NAVIGATION} router={router} theme={demoTheme} />
// }

// export default IndexPage

"use client";

import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "@/components/Dashboard/Dashboard";
import { useRouter as useNextRouter } from "next/router";
import styles from "@/styles/Dashboard.module.css";
import DynamicChart from "@/components/Recharts/GraphicsReutilizable";

// Theme configuration
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className={styles.loadingSpinner}>
    <div className={styles.spinner}></div>
  </div>
);

// Error Display Component
const ErrorDisplay = ({ error }: { error: string }) => (
  <div className={styles.errorDisplay}>
    <h2>Error</h2>
    <p>{error}</p>
  </div>
);

// Card Component
const CardComponent = React.memo(({ title, children, colorClass }: { title: string; children: React.ReactNode; colorClass?: string }) => (
  <div className={`${styles.card} ${colorClass || ""}`}>
    <h2>{title}</h2>
    {children}
  </div>
));

// Main Component
const IndexPage = () => {
  const [pathname, setPathname] = React.useState("/dashboard");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any>(null);

  const router = useNextRouter();
  const { companyName } = router.query;

  // Fetch data from API
  React.useEffect(() => {
    const fetchData = async () => {
      if (!companyName) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/dashboard?companyname=${companyName}`);
        if (!res.ok) throw new Error("Error fetching data");
        const json = await res.json();
        console.log("🚀 ~ fetchData ~ json:", json);
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyName]);

  // Convert data to a format suitable for charts
  const convertData = (data: any, xKey: string, yKey: string) => {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data.map((item) => ({ x: item[xKey], y: item[yKey] }));
    }

    return Object.keys(data).map((key) => {
      const value = data[key];
      const yValue =
        typeof value === "string" && value.endsWith("s")
          ? parseFloat(value.replace("s", ""))
          : value;
      return { x: key, y: yValue };
    });
  };

  // Calculate the total of a dataset
  const calculateTotal = (data: Record<string, number>) => {
    return Object.values(data).reduce((acc, value) => acc + value, 0);
  };

  // Navigation configuration
  const navigation = React.useMemo(
    () => [
      {
        kind: "header",
        title: "Dashboard",
      },
      {
        segment: "dashboard",
        title: "Dashboard",
        icon: <DashboardIcon />,
        component: () => (
          <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
              <h1>Dashboard de {data?.clientInfo?.companyName || "Empresa"}</h1>
            </div>

            {/* KPI Section */}
            <div className={styles.kpiSection}>
              <CardComponent title="Tiempo Promedio por Sección" colorClass={styles.cardBlue}>
                <p>
                  {data?.timeAnalysis?.averageTimePerSection
                    ? `${data.timeAnalysis.averageTimePerSection}s`
                    : "N/A"}
                </p>
              </CardComponent>
              <CardComponent title="Interacción Total (Puntaje)" colorClass={styles.cardGreen}>
                <p>
                  {data?.efficiencyMetrics?.engagementScore
                    ? calculateTotal(data.efficiencyMetrics.engagementScore)
                    : "N/A"}
                </p>
              </CardComponent>
              <CardComponent title="Potencial de Conversión" colorClass={styles.cardPurple}>
                <p>
                  {data?.efficiencyMetrics?.conversionPotential
                    ? `${calculateTotal(data.efficiencyMetrics.conversionPotential)}%`
                    : "N/A"}
                </p>
              </CardComponent>
            </div>

            {/* Chart Section */}
            <div className={styles.chartSection}>
              {/* Time by Category */}
              <CardComponent title="Tiempo por Categoría (Tiempo en segundos)" colorClass={styles.cardBlue}>
                <DynamicChart
                  type="bar"
                  data={convertData(data?.timeAnalysis?.totalTimeByCategory, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Categorías"
                  yAxisLabel="Tiempo (s)"
                  unit="s"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Time by Dish */}
              <CardComponent title="Tiempo por Plato (Tiempo en segundos)" colorClass={styles.cardGreen}>
                <DynamicChart
                  type="bar"
                  data={convertData(data?.timeAnalysis?.totalTimeByDish, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Platos"
                  yAxisLabel="Tiempo (s)"
                  unit="s"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Time Distribution */}
              <CardComponent title="Distribución de Tiempo por Categoría (Tiempo en segundos)" colorClass={styles.cardPurple}>
                {(() => {
                  const timeDistribution = data?.timeAnalysis?.timeDistribution;
                  if (!timeDistribution || typeof timeDistribution !== "object") {
                    return <p>No hay datos disponibles para la distribución de tiempo.</p>;
                  }

                  const chartData = Object.entries(timeDistribution).map(([category, info]: [string, any]) => {
                    const total = typeof info.total === "string" ? parseFloat(info.total.replace("s", "")) : info.total;
                    return { x: category, y: total };
                  });

                  return (
                    <DynamicChart
                      type="pie"
                      data={chartData}
                      xKey="x"
                      yKey="y"
                      width="100%"
                      height={300}
                      colors={["#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f59e0b"]}
                      showLegend
                      showTooltip
                      animation
                    />
                  );
                })()}
              </CardComponent>

              {/* Visits by Category */}
              <CardComponent title="Visitas por Categoría (Número de visitas)" colorClass={styles.cardRed}>
                <DynamicChart
                  type="pie"
                  data={convertData(data?.interactionAnalysis?.categoryVisitCount, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Categorías"
                  yAxisLabel="Número de visitas"
                  unit="visitas"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Visits by Dish */}
              <CardComponent title="Visitas por Plato (Número de visitas)" colorClass={styles.cardYellow}>
                <DynamicChart
                  type="bar"
                  data={convertData(data?.interactionAnalysis?.dishVisitCount, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Platos"
                  yAxisLabel="Número de visitas"
                  unit="visitas"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Most Visited Sections */}
              <CardComponent title="Secciones Más Visitadas (Número de visitas)" colorClass={styles.cardBlue}>
                <DynamicChart
                  type="pie"
                  data={data?.interactionAnalysis?.mostVisitedSections?.map((section: any) => ({
                    x: section.section,
                    y: section.count,
                  }))}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Secciones"
                  yAxisLabel="Número de visitas"
                  unit="visitas"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Least Visited Sections */}
              <CardComponent title="Secciones Menos Visitadas (Número de visitas)" colorClass={styles.cardGreen}>
                <DynamicChart
                  type="bar"
                  data={data?.interactionAnalysis?.leastVisitedSections?.map((section: any) => ({
                    x: section.section,
                    y: section.count,
                  }))}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Secciones"
                  yAxisLabel="Número de visitas"
                  unit="visitas"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Time per Interaction */}
              <CardComponent title="Tiempo por Interacción (Tiempo en milisegundos)" colorClass={styles.cardPurple}>
                <DynamicChart
                  type="bar"
                  data={convertData(data?.efficiencyMetrics?.timePerInteraction, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Categorías"
                  yAxisLabel="Tiempo (ms)"
                  unit="ms"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Engagement Score */}
              <CardComponent title="Puntaje de Interacción (Puntaje por categoría)" colorClass={styles.cardRed}>
                <DynamicChart
                  type="bar"
                  data={convertData(data?.efficiencyMetrics?.engagementScore, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Categorías"
                  yAxisLabel="Puntaje"
                  unit="puntos"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Conversion Potential */}
              <CardComponent title="Potencial de Conversión (Porcentaje por categoría)" colorClass={styles.cardYellow}>
                <DynamicChart
                  type="bar"
                  data={convertData(data?.efficiencyMetrics?.conversionPotential, "x", "y")}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Categorías"
                  yAxisLabel="Potencial"
                  unit="%"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Top Dishes */}
              <CardComponent title="Platos Más Populares (Número de visitas)" colorClass={styles.cardBlue}>
                <DynamicChart
                  type="bar"
                  data={data?.summary?.topDishes?.map((dish: any) => ({
                    x: dish.name,
                    y: dish.visits,
                  }))}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Platos"
                  yAxisLabel="Número de visitas"
                  unit="visitas"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>

              {/* Top Categories */}
              <CardComponent title="Categorías Más Populares (Número de visitas)" colorClass={styles.cardGreen}>
                <DynamicChart
                  type="pie"
                  data={data?.summary?.topCategories?.map((category: any) => ({
                    x: category.name,
                    y: category.visits,
                  }))}
                  xKey="x"
                  yKey="y"
                  xAxisLabel="Categorías"
                  yAxisLabel="Número de visitas"
                  unit="visitas"
                  showLegend
                  showTooltip
                  showGrid
                  animation
                />
              </CardComponent>
            </div>

            {/* Recommendations Section */}
            <div className={styles.recommendationsSection}>
              <CardComponent title="Recomendaciones">
                <ul>
                  {data?.recommendations?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardComponent>
            </div>
          </div>
        ),
      },
    ],
    [data]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <Dashboard
      navigation={navigation}
      router={{
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string) => setPathname(path),
      }}
      theme={demoTheme}
    />
  );
};

export default IndexPage;