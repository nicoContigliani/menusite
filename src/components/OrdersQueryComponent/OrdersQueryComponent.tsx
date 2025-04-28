// // import React, { useState, useMemo } from "react";
// // import {
// //   Box,
// //   TextField,
// //   Button,
// //   Grid,
// //   Typography,
// //   CircularProgress,
// //   Table,
// //   TableHead,
// //   TableBody,
// //   TableRow,
// //   TableCell,
// //   TableContainer,
// //   Paper,
// //   TableSortLabel,
// //   InputAdornment,
// //   IconButton,
// //   TablePagination,
// //   Menu,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Select,
// // } from "@mui/material";
// // import {
// //   Search,
// //   FilterList,
// //   Clear,
// // } from "@mui/icons-material";
// // import { motion, AnimatePresence } from "framer-motion";

// // // Animation variants
// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   show: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.1
// //     }
// //   }
// // };

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   show: { opacity: 1, y: 0 }
// // };

// // const tableRowVariants = {
// //   hidden: { opacity: 0, x: -10 },
// //   visible: (i: number) => ({
// //     opacity: 1,
// //     x: 0,
// //     transition: {
// //       delay: i * 0.05,
// //     }
// //   })
// // };

// // interface Order {
// //   _id: string;
// //   id: string;
// //   orderType: string;
// //   dataTypeOrder?: string;
// //   cart: Array<{
// //     id: string;
// //     itemId: number;
// //     name: string;
// //     price: number;
// //     quantity: number;
// //     extras?: Array<{
// //       name: string;
// //       price: number;
// //     }>;
// //     extrasTotal?: number;
// //     Description?: string;
// //   }>;
// //   comments?: string;
// //   companiesName: string;
// //   companiesID: string;
// //   email: string;
// //   fullname: string;
// //   phone: string;
// //   whathsapp?: string;
// //   channel?: string;
// //   name?: string;
// //   timestamp: string;
// //   status: string;
// //   createdAt: string | Date;
// //   updatedAt?: string | Date;
// //   version?: number;
// //   [key: string]: any;
// // }

// // const OrdersQueryComponent: React.FC<{ companiesName: string }> = ({
// //   companiesName,
// // }) => {
// //   const [filters, setFilters] = useState({
// //     email: "",
// //     status: "",
// //     orderType: "",
// //     phone: "",
// //     fullname: "",
// //     dateFrom: "",
// //     dateTo: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [results, setResults] = useState<Order[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [orderBy, setOrderBy] = useState<string>("createdAt");
// //   const [order, setOrder] = useState<"asc" | "desc">("desc");
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
// //   const [filterMenu, setFilterMenu] = useState<{
// //     anchorEl: null | HTMLElement;
// //     column: string | null;
// //   }>({ anchorEl: null, column: null });

// //   const columns = [
// //     { field: "id", label: "ID Pedido", width: 150, filterable: true },
// //     { field: "orderType", label: "Tipo", width: 120, filterable: true },
// //     { field: "status", label: "Estado", width: 120, filterable: true },
// //     { field: "fullname", label: "Cliente", width: 180, filterable: true },
// //     { field: "email", label: "Email", width: 200, filterable: true },
// //     { field: "phone", label: "Teléfono", width: 150, filterable: true },
// //     {
// //       field: "createdAt",
// //       label: "Fecha Creación",
// //       width: 180,
// //       filterable: false,
// //       format: (value: string | Date) => {
// //         const date = new Date(value);
// //         return date.toLocaleString();
// //       }
// //     },
// //     {
// //       field: "cart",
// //       label: "Productos",
// //       width: 250,
// //       filterable: false,
// //       format: (cart: any[]) => {
// //         return cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
// //       }
// //     },
// //     { field: "comments", label: "Comentarios", width: 200, filterable: false },
// //   ];

// //   const handleSort = (property: string) => {
// //     const isAsc = orderBy === property && order === "asc";
// //     setOrder(isAsc ? "desc" : "asc");
// //     setOrderBy(property);
// //   };

// //   const processedResults = useMemo(() => {
// //     let filtered = [...results];

// //     // Filtros generales
// //     Object.entries(filters).forEach(([key, value]) => {
// //       if (value && key !== 'dateFrom' && key !== 'dateTo') {
// //         filtered = filtered.filter((item) =>
// //           String(item[key] || "").toLowerCase().includes(value.toLowerCase())
// //         );
// //       }
// //     });

// //     // Filtrado por rango de fechas (corregido)
// //     if (filters.dateFrom) {
// //       const filterDateFrom = new Date(filters.dateFrom);
// //       filterDateFrom.setHours(0, 0, 0, 0); // Normalizar a inicio del día

// //       filtered = filtered.filter((item) => {
// //         try {
// //           const itemDate = new Date(item.createdAt);
// //           itemDate.setHours(0, 0, 0, 0); // Normalizar a inicio del día
// //           return itemDate >= filterDateFrom;
// //         } catch (e) {
// //           console.error("Error al procesar fecha:", item.createdAt, e);
// //           return false;
// //         }
// //       });
// //     }

// //     if (filters.dateTo) {
// //       const filterDateTo = new Date(filters.dateTo);
// //       filterDateTo.setHours(23, 59, 59, 999); // Normalizar a fin del día

// //       filtered = filtered.filter((item) => {
// //         try {
// //           const itemDate = new Date(item.createdAt);
// //           itemDate.setHours(0, 0, 0, 0); // Normalizar a inicio del día
// //           return itemDate <= filterDateTo;
// //         } catch (e) {
// //           console.error("Error al procesar fecha:", item.createdAt, e);
// //           return false;
// //         }
// //       });
// //     }

// //     // Filtros por columna
// //     Object.entries(columnFilters).forEach(([column, value]) => {
// //       if (value) {
// //         filtered = filtered.filter((item) =>
// //           String(item[column] || "").toLowerCase().includes(value.toLowerCase())
// //         );
// //       }
// //     });

// //     // Ordenamiento
// //     filtered.sort((a, b) => {
// //       const aValue = a[orderBy];
// //       const bValue = b[orderBy];

// //       if (orderBy === "createdAt" || orderBy === "updatedAt") {
// //         try {
// //           const dateA = new Date(aValue).getTime();
// //           const dateB = new Date(bValue).getTime();
// //           return order === "asc" ? dateA - dateB : dateB - dateA;
// //         } catch (e) {
// //           console.error("Error al ordenar por fecha:", e);
// //           return 0;
// //         }
// //       }

// //       return order === "asc"
// //         ? String(aValue).localeCompare(String(bValue))
// //         : String(bValue).localeCompare(String(aValue));
// //     });

// //     return filtered;
// //   }, [results, filters, columnFilters, orderBy, order]);

// //   const handleChangePage = (event: unknown, newPage: number) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (
// //     event: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const openFilterMenu = (
// //     event: React.MouseEvent<HTMLButtonElement>,
// //     column: string
// //   ) => {
// //     setFilterMenu({ anchorEl: event.currentTarget, column });
// //   };

// //   const closeFilterMenu = () => {
// //     setFilterMenu({ anchorEl: null, column: null });
// //   };

// //   const applyColumnFilter = (value: string) => {
// //     if (filterMenu.column) {
// //       setColumnFilters({
// //         ...columnFilters,
// //         [filterMenu.column]: value,
// //       });
// //       closeFilterMenu();
// //     }
// //   };

// //   const clearColumnFilter = (column: string) => {
// //     const newFilters = { ...columnFilters };
// //     delete newFilters[column];
// //     setColumnFilters(newFilters);
// //   };

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const res = await fetch("/api/ordersquery", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ ...filters, companiesName }),
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setResults(data.data);
// //         setPage(0);
// //       } else {
// //         setError(data.message || "Error en la consulta.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Error al conectar con el servidor.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box p={2} component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
// //       <Typography variant="h6" gutterBottom component={motion.div} variants={itemVariants}>
// //         Consulta de Órdenes para <strong>{companiesName}</strong>
// //       </Typography>

// //       <Grid container spacing={2} sx={{ mb: 3 }} component={motion.div} variants={containerVariants}>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <TextField
// //             fullWidth
// //             label="Email"
// //             name="email"
// //             value={filters.email}
// //             onChange={(e) =>
// //               setFilters({ ...filters, email: e.target.value })
// //             }
// //             InputProps={{
// //               endAdornment: filters.email && (
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     size="small"
// //                     onClick={() => setFilters({ ...filters, email: "" })}
// //                   >
// //                     <Clear fontSize="small" />
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <FormControl fullWidth>
// //             <InputLabel>Estado</InputLabel>
// //             <Select
// //               label="Estado"
// //               name="status"
// //               value={filters.status}
// //               onChange={(e) =>
// //                 setFilters({ ...filters, status: e.target.value as string })
// //               }
// //             >
// //               <MenuItem value="">Todos</MenuItem>
// //               <MenuItem value="pending">Pendiente</MenuItem>
// //               <MenuItem value="completed">Completado</MenuItem>
// //               <MenuItem value="cancelled">Cancelado</MenuItem>
// //               <MenuItem value="processing">Procesando</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <FormControl fullWidth>
// //             <InputLabel>Tipo de Orden</InputLabel>
// //             <Select
// //               label="Tipo de Orden"
// //               name="orderType"
// //               value={filters.orderType}
// //               onChange={(e) =>
// //                 setFilters({ ...filters, orderType: e.target.value as string })
// //               }
// //             >
// //               <MenuItem value="">Todos</MenuItem>
// //               <MenuItem value="delivery">Delivery</MenuItem>
// //               <MenuItem value="takeaway">Takeaway</MenuItem>
// //               <MenuItem value="din-in">Mesa</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <TextField
// //             fullWidth
// //             label="Nombre Completo"
// //             name="fullname"
// //             value={filters.fullname}
// //             onChange={(e) =>
// //               setFilters({ ...filters, fullname: e.target.value })
// //             }
// //             InputProps={{
// //               endAdornment: filters.fullname && (
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     size="small"
// //                     onClick={() => setFilters({ ...filters, fullname: "" })}
// //                   >
// //                     <Clear fontSize="small" />
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <TextField
// //             fullWidth
// //             label="Teléfono"
// //             name="phone"
// //             value={filters.phone}
// //             onChange={(e) =>
// //               setFilters({ ...filters, phone: e.target.value })
// //             }
// //             InputProps={{
// //               endAdornment: filters.phone && (
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     size="small"
// //                     onClick={() => setFilters({ ...filters, phone: "" })}
// //                   >
// //                     <Clear fontSize="small" />
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <TextField
// //             fullWidth
// //             label="Fecha Desde"
// //             type="date"
// //             value={filters.dateFrom}
// //             onChange={(e) =>
// //               setFilters({ ...filters, dateFrom: e.target.value })
// //             }
// //             InputLabelProps={{
// //               shrink: true,
// //             }}
// //             inputProps={{
// //               max: new Date().toISOString().split("T")[0],
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
// //           <TextField
// //             fullWidth
// //             label="Fecha Hasta"
// //             type="date"
// //             value={filters.dateTo}
// //             onChange={(e) =>
// //               setFilters({ ...filters, dateTo: e.target.value })
// //             }
// //             InputLabelProps={{
// //               shrink: true,
// //             }}
// //             inputProps={{
// //               max: new Date().toISOString().split("T")[0],
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} component={motion.div} variants={itemVariants}>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             fullWidth
// //             onClick={handleSubmit}
// //             disabled={loading}
// //             startIcon={<Search />}
// //             component={motion.button}
// //             whileHover={{ scale: 1.01 }}
// //             whileTap={{ scale: 0.99 }}
// //           >
// //             {loading ? <CircularProgress size={24} /> : "Buscar"}
// //           </Button>
// //         </Grid>
// //       </Grid>

// //       <AnimatePresence>
// //         {error && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <Typography color="error" variant="body2" sx={{ mb: 2 }}>
// //               {error}
// //             </Typography>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {results.length > 0 && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 0.2 }}
// //         >
// //           {processedResults.length === 0 ? (
// //             <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
// //               No se encontraron resultados con los filtros aplicados.
// //             </Typography>
// //           ) : (
// //             <Paper component={motion.div} layout>
// //               <TableContainer>
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow>
// //                       {columns.map((col) => (
// //                         <TableCell key={col.field} style={{ width: col.width }}>
// //                           <Box display="flex" alignItems="center">
// //                             <TableSortLabel
// //                               active={orderBy === col.field}
// //                               direction={orderBy === col.field ? order : 'asc'}
// //                               onClick={() => handleSort(col.field)}
// //                               component={motion.div}
// //                               whileHover={{ scale: 1.05 }}
// //                             >
// //                               {col.label}
// //                             </TableSortLabel>
// //                             {col.filterable && (
// //                               <IconButton
// //                                 size="small"
// //                                 onClick={(e) => openFilterMenu(e, col.field)}
// //                                 component={motion.button}
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                               >
// //                                 <FilterList fontSize="small" />
// //                               </IconButton>
// //                             )}
// //                           </Box>
// //                           {columnFilters[col.field] && (
// //                             <Box display="flex" alignItems="center" mt={1}>
// //                               <Typography variant="caption" color="textSecondary">
// //                                 Filtro: {columnFilters[col.field]}
// //                               </Typography>
// //                               <IconButton
// //                                 size="small"
// //                                 onClick={() => clearColumnFilter(col.field)}
// //                                 component={motion.button}
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                               >
// //                                 <Clear fontSize="small" />
// //                               </IconButton>
// //                             </Box>
// //                           )}
// //                         </TableCell>
// //                       ))}
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     <AnimatePresence>
// //                       {processedResults
// //                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                         .map((row, idx) => (
// //                           <TableRow
// //                             key={idx}
// //                             component={motion.tr}
// //                             custom={idx}
// //                             initial="hidden"
// //                             animate="visible"
// //                             variants={tableRowVariants}
// //                             exit={{ opacity: 0 }}
// //                             whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
// //                           >
// //                             {columns.map((col) => (
// //                               <TableCell key={col.field}>
// //                                 {col.format
// //                                   ? col.format(row[col.field])
// //                                   : row[col.field] || '-'}
// //                               </TableCell>
// //                             ))}
// //                           </TableRow>
// //                         ))}
// //                     </AnimatePresence>
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //               <TablePagination
// //                 component="div"
// //                 count={processedResults.length}
// //                 page={page}
// //                 onPageChange={handleChangePage}
// //                 rowsPerPage={rowsPerPage}
// //                 onRowsPerPageChange={handleChangeRowsPerPage}
// //                 rowsPerPageOptions={[5, 10, 25]}
// //               />
// //             </Paper>
// //           )}
// //         </motion.div>
// //       )}

// //       <Menu
// //         anchorEl={filterMenu.anchorEl}
// //         open={Boolean(filterMenu.anchorEl)}
// //         onClose={closeFilterMenu}
// //       >
// //         <motion.div
// //           initial={{ opacity: 0, y: -10 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           exit={{ opacity: 0 }}
// //         >
// //           <MenuItem>
// //             <TextField
// //               autoFocus
// //               fullWidth
// //               variant="standard"
// //               placeholder={`Filtrar por ${filterMenu.column}`}
// //               onChange={(e) => applyColumnFilter(e.target.value)}
// //             />
// //           </MenuItem>
// //         </motion.div>
// //       </Menu>
// //     </Box>
// //   );
// // };

// // export default OrdersQueryComponent;




// ////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   CircularProgress,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Paper,
//   TableSortLabel,
//   InputAdornment,
//   IconButton,
//   TablePagination,
//   Menu,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import {
//   Search,
//   FilterList,
//   Clear,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import useOrdersQuery from "../../../hooks/useOrdersQuery";

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0 }
// };

// const tableRowVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: (i: number) => ({
//     opacity: 1,
//     x: 0,
//     transition: {
//       delay: i * 0.05,
//     }
//   })
// };

// interface Order {
//   _id: string;
//   id: string;
//   orderType: string;
//   dataTypeOrder?: string;
//   cart: Array<{
//     id: string;
//     itemId: number;
//     name: string;
//     price: number;
//     quantity: number;
//     extras?: Array<{
//       name: string;
//       price: number;
//     }>;
//     extrasTotal?: number;
//     Description?: string;
//   }>;
//   comments?: string;
//   companiesName: string;
//   companiesID: string;
//   email: string;
//   fullname: string;
//   phone: string;
//   whathsapp?: string;
//   channel?: string;
//   name?: string;
//   timestamp: string;
//   status: string;
//   createdAt: string | Date;
//   updatedAt?: string | Date;
//   version?: number;
//   [key: string]: any;
// }

// const OrdersQueryComponent: React.FC<{ companiesName: string }> = ({
//   companiesName,
// }) => {

//   const {
//     // State
//     filters,
//     loading,
//     results,
//     error,
//     orderBy,
//     order,
//     page,
//     rowsPerPage,
//     columnFilters,
//     filterMenu,
//     columns,
//     processedResults,

//     // Handlers
//     setFilters,
//     handleSort,
//     handleChangePage,
//     handleChangeRowsPerPage,
//     openFilterMenu,
//     closeFilterMenu,
//     applyColumnFilter,
//     clearColumnFilter,
//     handleSubmit,
//   } = useOrdersQuery(companiesName);




//   return (
//     <Box p={2} component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
//       <Typography variant="h6" gutterBottom component={motion.div} variants={itemVariants}>
//         Consulta de Órdenes para <strong>{companiesName}</strong>
//       </Typography>

//       <Grid container spacing={2} sx={{ mb: 3 }} component={motion.div} variants={containerVariants}>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             value={filters.email}
//             onChange={(e) =>
//               setFilters({ ...filters, email: e.target.value })
//             }
//             InputProps={{
//               endAdornment: filters.email && (
//                 <InputAdornment position="end">
//                   <IconButton
//                     size="small"
//                     onClick={() => setFilters({ ...filters, email: "" })}
//                   >
//                     <Clear fontSize="small" />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <FormControl fullWidth>
//             <InputLabel>Estado</InputLabel>
//             <Select
//               label="Estado"
//               name="status"
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters({ ...filters, status: e.target.value as string })
//               }
//             >
//               <MenuItem value="">Todos</MenuItem>
//               <MenuItem value="pending">Pendiente</MenuItem>
//               <MenuItem value="completed">Completado</MenuItem>
//               <MenuItem value="cancelled">Cancelado</MenuItem>
//               <MenuItem value="processing">Procesando</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <FormControl fullWidth>
//             <InputLabel>Tipo de Orden</InputLabel>
//             <Select
//               label="Tipo de Orden"
//               name="orderType"
//               value={filters.orderType}
//               onChange={(e) =>
//                 setFilters({ ...filters, orderType: e.target.value as string })
//               }
//             >
//               <MenuItem value="">Todos</MenuItem>
//               <MenuItem value="delivery">Delivery</MenuItem>
//               <MenuItem value="takeaway">Takeaway</MenuItem>
//               <MenuItem value="dine-in">Mesa</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <TextField
//             fullWidth
//             label="Nombre Completo"
//             name="fullname"
//             value={filters.fullname}
//             onChange={(e) =>
//               setFilters({ ...filters, fullname: e.target.value })
//             }
//             InputProps={{
//               endAdornment: filters.fullname && (
//                 <InputAdornment position="end">
//                   <IconButton
//                     size="small"
//                     onClick={() => setFilters({ ...filters, fullname: "" })}
//                   >
//                     <Clear fontSize="small" />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <TextField
//             fullWidth
//             label="Teléfono"
//             name="phone"
//             value={filters.phone}
//             onChange={(e) =>
//               setFilters({ ...filters, phone: e.target.value })
//             }
//             InputProps={{
//               endAdornment: filters.phone && (
//                 <InputAdornment position="end">
//                   <IconButton
//                     size="small"
//                     onClick={() => setFilters({ ...filters, phone: "" })}
//                   >
//                     <Clear fontSize="small" />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <TextField
//             fullWidth
//             label="Fecha Desde"
//             type="date"
//             value={filters.dateFrom}
//             onChange={(e) =>
//               setFilters({ ...filters, dateFrom: e.target.value })
//             }
//             InputLabelProps={{
//               shrink: true,
//             }}
//             inputProps={{
//               max: new Date().toISOString().split("T")[0],
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
//           <TextField
//             fullWidth
//             label="Fecha Hasta"
//             type="date"
//             value={filters.dateTo}
//             onChange={(e) =>
//               setFilters({ ...filters, dateTo: e.target.value })
//             }
//             InputLabelProps={{
//               shrink: true,
//             }}
//             inputProps={{
//               max: new Date().toISOString().split("T")[0],
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} component={motion.div} variants={itemVariants}>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleSubmit}
//             disabled={loading}
//             startIcon={<Search />}
//             component={motion.button}
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.99 }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Buscar"}
//           </Button>
//         </Grid>
//       </Grid>

//       <AnimatePresence>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//           >
//             <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {results.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {processedResults.length === 0 ? (
//             <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
//               No se encontraron resultados con los filtros aplicados.
//             </Typography>
//           ) : (
//             <Paper component={motion.div} layout>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       {columns.map((col) => (
//                         <TableCell key={col.field} style={{ width: col.width }}>
//                           <Box display="flex" alignItems="center">
//                             <TableSortLabel
//                               active={orderBy === col.field}
//                               direction={orderBy === col.field ? order : 'asc'}
//                               onClick={() => handleSort(col.field)}
//                               component={motion.div}
//                               whileHover={{ scale: 1.05 }}
//                             >
//                               {col.label}
//                             </TableSortLabel>
//                             {col.filterable && (
//                               <IconButton
//                                 size="small"
//                                 onClick={(e) => openFilterMenu(e, col.field)}
//                                 component={motion.button}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                               >
//                                 <FilterList fontSize="small" />
//                               </IconButton>
//                             )}
//                           </Box>
//                           {columnFilters[col.field] && (
//                             <Box display="flex" alignItems="center" mt={1}>
//                               <Typography variant="caption" color="textSecondary">
//                                 Filtro: {columnFilters[col.field]}
//                               </Typography>
//                               <IconButton
//                                 size="small"
//                                 onClick={() => clearColumnFilter(col.field)}
//                                 component={motion.button}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                               >
//                                 <Clear fontSize="small" />
//                               </IconButton>
//                             </Box>
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <AnimatePresence>
//                       {processedResults
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((row, idx) => (
//                           <TableRow
//                             key={idx}
//                             component={motion.tr}
//                             custom={idx}
//                             initial="hidden"
//                             animate="visible"
//                             variants={tableRowVariants}
//                             exit={{ opacity: 0 }}
//                             whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
//                           >
//                             {columns.map((col) => (
//                               <TableCell key={col.field}>
//                                 {col.format
//                                   ? col.format(row[col.field])
//                                   : row[col.field] || '-'}
//                               </TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                     </AnimatePresence>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <TablePagination
//                 component="div"
//                 count={processedResults.length}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[5, 10, 25]}
//               />
//             </Paper>
//           )}
//         </motion.div>
//       )}

//       <Menu
//         anchorEl={filterMenu.anchorEl}
//         open={Boolean(filterMenu.anchorEl)}
//         onClose={closeFilterMenu}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//         >
//           <MenuItem>
//             <TextField
//               autoFocus
//               fullWidth
//               variant="standard"
//               placeholder={`Filtrar por ${filterMenu.column}`}
//               onChange={(e) => applyColumnFilter(e.target.value)}
//             />
//           </MenuItem>
//         </motion.div>
//       </Menu>
//     </Box>
//   );
// };

// export default OrdersQueryComponent;



import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
  InputAdornment,
  IconButton,
  TablePagination,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import useOrdersQuery from "../../../hooks/useOrdersQuery";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
    }
  })
};

interface Order {
  _id: string;
  id: string;
  orderType: string;
  dataTypeOrder?: string;
  cart: Array<{
    id: string;
    itemId: number;
    name: string;
    price: number;
    quantity: number;
    extras?: Array<{
      name: string;
      price: number;
    }>;
    extrasTotal?: number;
    Description?: string;
    comments?: string;
  }>;
  comments?: string;
  companiesName: string;
  companiesID: string;
  email: string;
  fullname: string;
  phone: string;
  whathsapp?: string;
  channel?: string;
  name?: string;
  timestamp: string;
  status: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  version?: number;
  [key: string]: any;
}

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, open, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Sincronizar el orden actual cuando cambian las props
  useEffect(() => {
    if (open && order) {
      setCurrentOrder(order);
      setIsVisible(true);
    }
  }, [open, order]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setCurrentOrder(null);
    }, 300); // Tiempo para que termine la animación
  };

  if (!order) return null;

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "No disponible";

    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return date.toLocaleString();
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return "Fecha inválida";
    }
  };

  const calculateTotal: any = () => {
    try {
      return order.cart.reduce((total: number, item: any) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        const extrasTotal = item.extras?.reduce((sum: number, extra: any) => sum + (extra.price || 0), 0) || 0;
        return total + itemTotal + extrasTotal;
      }, 0);
    } catch (error) {
      console.error("Error calculando total:", error);
      return "Error calculando total";
    }
  };

  const getStatusLabel = () => {
    switch (order.status) {
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      case 'processing': return 'Procesando';
      case 'delivered': return 'Entregado';
      default: return order.status || 'Desconocido';
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          <motion.div
            initial={!isClosing ? { opacity: 0, scale: 0.9 } : false}
            animate={!isClosing ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Detalles de la Orden #{order.id}</Typography>
                <Chip
                  label={getStatusLabel()}
                  color={
                    order.status === 'completed' || order.status === 'delivered' ? 'success' :
                      order.status === 'cancelled' ? 'error' :
                        order.status === 'processing' ? 'warning' : 'info'
                  }
                />
              </Box>
            </DialogTitle>

            <DialogContent dividers>
              {!order.cart && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Esta orden no tiene información del carrito o está mal formada.
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Información del Responsable de Hacer el Pedido
                    </Typography>

                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Nombre"
                          secondary={order.fullname || order.name || "No disponible"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Email"
                          secondary={order.email || "No disponible"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Teléfono"
                          secondary={order.phone || "No disponible"}
                        />
                      </ListItem>
                      {order.whathsapp && (
                        <ListItem>
                          <ListItemText
                            primary="WhatsApp"
                            secondary={order.whathsapp}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Detalles de la Orden
                    </Typography>

                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Tipo de orden"
                          secondary={
                            order.orderType === 'mesa' ? 'Mesa' :
                              order.orderType === 'delivery' ? 'Delivery' :
                                order.orderType === 'takeaway' ? 'Takeaway' :
                                  order.orderType || 'No disponible'
                          }
                        />
                      </ListItem>
                      {order.dataTypeOrder && (
                        <ListItem>
                          <ListItemText
                            primary={order.orderType === 'mesa' ? 'Mesa' : 'Detalle'}
                            secondary={order.dataTypeOrder}
                          />
                        </ListItem>
                      )}
                      <ListItem>
                        <ListItemText
                          primary="Canal"
                          secondary={order.channel || "No disponible"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Fecha creación"
                          secondary={formatDate(order.createdAt)}
                        />
                      </ListItem>
                      {order.updatedAt && (
                        <ListItem>
                          <ListItemText
                            primary="Última actualización"
                            secondary={formatDate(order.updatedAt)}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Items del Pedido
                    </Typography>

                    {order.cart?.length ? (
                      <List>
                        {order.cart.map((item: any, index: number) => (
                          <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                              <ListItemText
                                primary={`${item.quantity || 1}x ${item.name || "Producto sin nombre"}`}
                                secondary={
                                  <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                      ${item.price?.toFixed(2) || "0.00"} c/u
                                    </Typography>
                                    {item.Description && ` — ${item.Description}`}
                                    {item.comments && (
                                      <Box mt={1}>
                                        <Chip
                                          label={`Nota: ${item.comments}`}
                                          size="small"
                                          color="info"
                                          variant="outlined"
                                        />
                                      </Box>
                                    )}
                                  </>
                                }
                              />
                              <Typography variant="body2" align="right">
                                ${((item.price || 0) * (item.quantity || 1))?.toFixed(2)}
                              </Typography>
                            </ListItem>

                            {item.extras?.length > 0 && (
                              <List dense disablePadding sx={{ pl: 4 }}>
                                {item.extras.map((extra: any, extraIndex: number) => (
                                  <ListItem key={extraIndex} sx={{ py: 0 }}>
                                    <ListItemText
                                      primary={`+ ${extra.name}`}
                                      secondary={`$${extra.price?.toFixed(2) || "0.00"}`}
                                    />
                                  </ListItem>
                                ))}
                                {item.extrasTotal && (
                                  <ListItem sx={{ py: 0, fontWeight: 'bold' }}>
                                    <ListItemText primary="Total extras" />
                                    <Typography variant="body2">
                                      ${item.extrasTotal.toFixed(2)}
                                    </Typography>
                                  </ListItem>
                                )}
                              </List>
                            )}

                            {index < order.cart.length - 1 && <Divider variant="inset" component="li" />}
                          </React.Fragment>
                        ))}

                        <ListItem sx={{ pt: 2, fontWeight: 'bold' }}>
                          <ListItemText primary="Total de la orden" />
                          <Typography variant="subtitle1">
                            ${typeof calculateTotal() === 'number' ? calculateTotal().toFixed(2) : calculateTotal()}
                          </Typography>
                        </ListItem>
                      </List>
                    ) : (
                      <Alert severity="warning">No hay items en esta orden</Alert>
                    )}
                  </Paper>
                </Grid>

                {order.comments && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Comentarios Generales
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {order.comments}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const OrdersQueryComponent: React.FC<{ companiesName: string }> = ({
  companiesName,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    // State
    filters,
    loading,
    results,
    error,
    orderBy,
    order,
    page,
    rowsPerPage,
    columnFilters,
    filterMenu,
    columns,
    processedResults,

    // Handlers
    setFilters,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    openFilterMenu,
    closeFilterMenu,
    applyColumnFilter,
    clearColumnFilter,
    handleSubmit,
  } = useOrdersQuery(companiesName);

  return (
    <Box p={2} component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
      <Typography variant="h6" gutterBottom component={motion.div} variants={itemVariants}>
        Consulta de Órdenes para <strong>{companiesName}</strong>
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }} component={motion.div} variants={containerVariants}>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={filters.email}
            onChange={(e) =>
              setFilters({ ...filters, email: e.target.value })
            }
            InputProps={{
              endAdornment: filters.email && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters({ ...filters, email: "" })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              name="status"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value as string })
              }
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="pending">Pendiente</MenuItem>
              <MenuItem value="completed">Completado</MenuItem>
              <MenuItem value="cancelled">Cancelado</MenuItem>
              <MenuItem value="processing">Procesando</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Orden</InputLabel>
            <Select
              label="Tipo de Orden"
              name="orderType"
              value={filters.orderType}
              onChange={(e) =>
                setFilters({ ...filters, orderType: e.target.value as string })
              }
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="takeaway">Takeaway</MenuItem>
              <MenuItem value="dine-in">Mesa</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Nombre Completo"
            name="fullname"
            value={filters.fullname}
            onChange={(e) =>
              setFilters({ ...filters, fullname: e.target.value })
            }
            InputProps={{
              endAdornment: filters.fullname && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters({ ...filters, fullname: "" })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={filters.phone}
            onChange={(e) =>
              setFilters({ ...filters, phone: e.target.value })
            }
            InputProps={{
              endAdornment: filters.phone && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters({ ...filters, phone: "" })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Fecha Desde"
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Fecha Hasta"
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters({ ...filters, dateTo: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        <Grid item xs={12} component={motion.div} variants={itemVariants}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            startIcon={<Search />}
            component={motion.button}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </Grid>
      </Grid>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {processedResults.length === 0 ? (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              No se encontraron resultados con los filtros aplicados.
            </Typography>
          ) : (
            <Paper component={motion.div} layout>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((col) => (
                        <TableCell key={col.field} style={{ width: col.width }}>
                          <Box display="flex" alignItems="center">
                            <TableSortLabel
                              active={orderBy === col.field}
                              direction={orderBy === col.field ? order : 'asc'}
                              onClick={() => handleSort(col.field)}
                              component={motion.div}
                              whileHover={{ scale: 1.05 }}
                            >
                              {col.label}
                            </TableSortLabel>
                            {col.filterable && (
                              <IconButton
                                size="small"
                                onClick={(e) => openFilterMenu(e, col.field)}
                                component={motion.button}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FilterList fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                          {columnFilters[col.field] && (
                            <Box display="flex" alignItems="center" mt={1}>
                              <Typography variant="caption" color="textSecondary">
                                Filtro: {columnFilters[col.field]}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => clearColumnFilter(col.field)}
                                component={motion.button}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Clear fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence>
                      {processedResults
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, idx) => (
                          <TableRow
                            key={idx}
                            component={motion.tr}
                            custom={idx}
                            initial="hidden"
                            animate="visible"
                            variants={tableRowVariants}
                            exit={{ opacity: 0 }}
                            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                            onClick={() => {
                              setSelectedOrder(row);
                              setModalOpen(true);
                            }}
                            sx={{ cursor: 'pointer' }}
                          >
                            {columns.map((col) => (
                              <TableCell key={col.field}>
                                {col.format
                                  ? col.format(row[col.field])
                                  : row[col.field] || '-'}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={processedResults.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Paper>
          )}
        </motion.div>
      )}

      <Menu
        anchorEl={filterMenu.anchorEl}
        open={Boolean(filterMenu.anchorEl)}
        onClose={closeFilterMenu}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <MenuItem>
            <TextField
              autoFocus
              fullWidth
              variant="standard"
              placeholder={`Filtrar por ${filterMenu.column}`}
              onChange={(e) => applyColumnFilter(e.target.value)}
            />
          </MenuItem>
        </motion.div>
      </Menu>

      <OrderDetailsModal
        order={selectedOrder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default OrdersQueryComponent;