// "use client"

// import React, { useMemo, useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../store/store"
// import {
//   Box,
//   Button,
//   Chip,
//   CircularProgress,
//   Paper,
//   Typography,
//   Alert,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Avatar,
//   IconButton,
//   Card,
//   CardContent,
//   Divider,
//   Badge,
//   Tooltip,
//   AppBar,
//   Toolbar,
//   useMediaQuery,
//   useTheme,
//   Stack,
//   useScrollTrigger,
//   Fab,
//   Zoom,
//   TextField,
//   InputAdornment,
//   Pagination,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   MenuItem,
//   Select,
//   FormControl,
//   Collapse,
//   Menu,
//   ListItemIcon,
//   ButtonGroup,
//   type PaletteColor,
//   Container,
// } from "@mui/material"
// import {
//   Edit as EditIcon,
//   Refresh as RefreshIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   CheckCircle as CheckCircleIcon,
//   PauseCircle as PauseCircleIcon,
//   Cancel as CancelIcon,
//   DeliveryDining as DeliveryIcon,
//   PlayArrow,
//   Pause,
//   ViewList as ViewListIcon,
//   ViewColumn as ViewColumnIcon,
//   Logout as LogoutIcon,
//   AccessTime,
//   Person,
//   KeyboardArrowUp,
//   Search as SearchIcon,
//   Clear as ClearIcon,
//   MoreVert as MoreVertIcon,
// } from "@mui/icons-material"
// import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
// import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
// import Image from "next/image"
// import { clearLocalhostStorage } from "@/services/localstorage.services"
// import { recordAttendance } from "@/services/attendance.services"
// import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// // Status configuration
// const statusConfig = {
//   pending: {
//     color: "default",
//     icon: <PauseCircleIcon color="disabled" />,
//     label: "Pendientes",
//     actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
//   },
//   processing: {
//     color: "primary",
//     icon: <PlayArrow color="primary" />,
//     label: "En Proceso",
//     actions: [
//       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
//       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
//     ],
//   },
//   paused: {
//     color: "warning",
//     icon: <Pause color="warning" />,
//     label: "Pausadas",
//     actions: [
//       { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
//       { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
//     ],
//   },
//   finished: {
//     color: "success",
//     icon: <CheckCircleIcon color="success" />,
//     label: "Terminadas",
//     actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
//   },
//   cancelled: {
//     color: "error",
//     icon: <CancelIcon color="error" />,
//     label: "Canceladas",
//     actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
//   },
//   delivered: {
//     color: "success",
//     icon: <DeliveryIcon color="success" />,
//     label: "Entregadas",
//     actions: [],
//   },
// }

// const statusOptions = Object.keys(statusConfig)
// const pageSizeOptions = [5, 10, 20, 50]

// const OrderSpeedGeneric = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
//   const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
//   const [displayTitle, setDisplayTitle] = useState(false)
//   const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "list")
//   const [openPendingDialog, setOpenPendingDialog] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState<any>(null)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeStatus, setActiveStatus] = useState("all")
//   const [currentPages, setCurrentPages] = useState<Record<string, number>>(
//     statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
//   )
//   const [expandedRows, setExpandedRows] = useState<string[]>([])
//   const [expandedCards, setExpandedCards] = useState<string[]>([])
//   const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)
//   const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null)
//   const [actionMenuOrder, setActionMenuOrder] = useState<any>(null)

//   const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
//   const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }
//   const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

//   const {
//     allOrders,
//     ordersByStatus,
//     isConnected,
//     isLoading,
//     isUpdating,
//     error,
//     successMessage,
//     lastRefresh,
//     fetchHistoricalOrders,
//     handleOrderAction,
//     updateOrder,
//     clearMessages,
//   } = useOrdersManagementSocketApi({
//     companyName: data?.companyName || "LlakaScript",
//     userEmail: user?.user?.email || "nico.contigliani@gmail.com",
//     orderLimit: 50,
//   })

//   // Calculate totals
//   const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
//   const pendingCount = ordersByStatus.pending?.length || 0
//   const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
//   const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

//   // Filter and search orders
//   const filteredOrders = useMemo(() => {
//     let filtered = [...allOrders]

//     if (activeStatus !== "all") {
//       filtered = filtered.filter((order) => order.status === activeStatus)
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter((order) => {
//         return (
//           order.fullname?.toLowerCase().includes(query) ||
//           order.id?.toString().includes(query) ||
//           order._id?.toString().includes(query) ||
//           order.orderType?.toLowerCase().includes(query) ||
//           order.dataTypeOrder?.toLowerCase().includes(query) ||
//           order.cart.some(
//             (item: any) =>
//               item.name.toLowerCase().includes(query) ||
//               (item.Description && item.Description.toLowerCase().includes(query)) ||
//               item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
//           )
//         )
//       })
//     }

//     return filtered.sort((a, b) => {
//       const dateA = new Date(a.createdAt || a.timestamp || 0)
//       const dateB = new Date(b.createdAt || b.timestamp || 0)
//       return dateB.getTime() - dateA.getTime()
//     })
//   }, [allOrders, activeStatus, searchQuery])

//   // Paginate orders
//   const paginatedOrders = useMemo(() => {
//     const startIndex = (currentPages[activeStatus] - 1) * pageSize
//     return filteredOrders.slice(startIndex, startIndex + pageSize)
//   }, [filteredOrders, currentPages, activeStatus, pageSize])

//   // Calculate page count for current status
//   const pageCount = Math.ceil(filteredOrders.length / pageSize)

//   // Handle page change
//   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPages((prev) => ({
//       ...prev,
//       [activeStatus]: value,
//     }))
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   // Handle page size change
//   const handlePageSizeChange = (event: any) => {
//     const newSize = event.target.value
//     setPageSize(newSize)
//     const newValue = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
//     setCurrentPages((prev) => ({
//       ...prev,
//       [activeStatus]: newValue,
//     }))
//   }

//   // Toggle functions
//   const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
//   const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

//   // Action handlers
//   const handleLogout = async () => {
//     clearLocalhostStorage()
//     await recordAttendance("getOut", user?.user?.email, data?.companyName)
//     window.location.reload()
//   }

//   const handleOpenEditModal = (order: any) => {
//     setSelectedOrder(order)
//     setIsEditModalOpen(true)
//   }

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false)
//     setSelectedOrder(null)
//   }

//   const saveUpdateData = async (updatedOrder: any) => {
//     try {
//       await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
//       handleCloseEditModal()
//     } catch (error) {
//       console.error("Failed to update order:", error)
//     }
//   }

//   const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
//     setActiveStatus(newValue)
//     setCurrentPages((prev) => ({
//       ...prev,
//       [newValue]: 1,
//     }))
//   }

//   const clearSearch = () => {
//     setSearchQuery("")
//   }

//   // Action menu handlers
//   const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, order: any) => {
//     event.stopPropagation()
//     setActionMenuAnchorEl(event.currentTarget)
//     setActionMenuOrder(order)
//   }

//   const handleCloseActionMenu = () => {
//     setActionMenuAnchorEl(null)
//     setActionMenuOrder(null)
//   }

//   const handleActionMenuItemClick = (action: string) => {
//     if (actionMenuOrder) {
//       if (action === "edit") {
//         handleOpenEditModal(actionMenuOrder)
//       } else {
//         handleOrderAction(action, actionMenuOrder)
//       }
//       handleCloseActionMenu()
//     }
//   }

//   // Toggle card expansion
//   const toggleCardExpansion = (orderId: string) => {
//     setExpandedCards((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
//   }

//   // Effects
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTitle((prev) => !prev)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // Scroll to top button logic
//   const trigger = useScrollTrigger({
//     threshold: 100,
//   })

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     })
//   }

//   // Order Card Component
//   const OrderCard = React.memo(({ order }: { order: any }) => {
//     const status = order.status
//     const config = statusConfig[status as keyof typeof statusConfig]
//     const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
//     const total = order.cart.reduce((sum: any, item: any) => {
//       const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
//       return sum + item.price * item.quantity + extrasTotal
//     }, 0)

//     const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })

//     const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]
//     const orderId = order._id || order.id
//     const isExpanded = expandedCards.includes(orderId)

//     return (
//       <Card
//         sx={{
//           borderLeft: "4px solid",
//           borderColor: paletteColor?.main || "grey",
//           mb: 2,
//           position: "relative",
//           transition: "all 0.2s ease-in-out",
//           "&:hover": {
//             transform: isMobile ? "none" : "translateY(-2px)",
//             boxShadow: isMobile ? "none" : theme.shadows[4],
//           },
//           maxHeight: isExpanded ? "none" : { xs: "none", md: "calc(100vh - 270px)" },
//           overflow: "hidden",
//           mx: "auto", // Center the card
//           width: "100%", // Full width for proper centering
//         }}
//       >
//         <CardContent sx={{ p: isMobile ? 1.5 : 2.5 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, alignItems: "center" }}>
//             <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
//               #{order.id || order._id.slice(-4)}
//             </Typography>
//             <Chip
//               size={isMobile ? "small" : "medium"}
//               label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
//               color={config.color as any}
//               icon={React.cloneElement(config.icon, { fontSize: isMobile ? "small" : "medium" })}
//               sx={{ borderRadius: "16px" }} // More rounded chip
//             />
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, justifyContent: "space-between" }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Person fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
//               <Typography
//                 variant={isMobile ? "caption" : "body2"}
//                 noWrap
//                 sx={{ maxWidth: isMobile ? "120px" : "180px" }}
//               >
//                 {order.fullname}
//               </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <AccessTime fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
//               <Typography variant={isMobile ? "caption" : "body2"}>{formattedTime}</Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 1.5 }} />

//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//             <Typography variant={isMobile ? "caption" : "subtitle2"} fontWeight="medium">
//               Items ({totalItems})
//             </Typography>
//             {order.cart.length > (isMobile ? 1 : 2) && !isExpanded && (
//               <Button
//                 size="small"
//                 variant="text"
//                 onClick={() => toggleCardExpansion(orderId)}
//                 endIcon={<ExpandMoreIcon fontSize={isMobile ? "small" : "medium"} />}
//                 sx={{
//                   fontSize: isMobile ? "0.75rem" : "0.875rem",
//                   minWidth: "auto",
//                   p: "4px 8px",
//                 }}
//               >
//                 Ver todos
//               </Button>
//             )}
//             {isExpanded && (
//               <Button
//                 size="small"
//                 variant="text"
//                 onClick={() => toggleCardExpansion(orderId)}
//                 endIcon={<ExpandLessIcon fontSize={isMobile ? "small" : "medium"} />}
//                 sx={{
//                   fontSize: isMobile ? "0.75rem" : "0.875rem",
//                   minWidth: "auto",
//                   p: "4px 8px",
//                 }}
//               >
//                 Colapsar
//               </Button>
//             )}
//           </Box>

//           <List dense disablePadding sx={{ mb: 1.5 }}>
//             {order.cart.slice(0, isExpanded ? undefined : isMobile ? 1 : 3).map((item: any) => (
//               <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.5 }}>
//                 <ListItemText
//                   primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                   secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                   primary={
//                     <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                       <Box sx={{ flex: 1, mr: 1 }}>
//                         <Typography component="span" variant="inherit">
//                           <strong>{item.quantity}x</strong> {item.name}
//                         </Typography>
//                         {item.Description && (
//                           <Typography
//                             variant="inherit"
//                             display="block"
//                             sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.85em" }}
//                           >
//                             {item.Description}
//                           </Typography>
//                         )}
//                       </Box>
//                       <Typography component="span" variant="inherit" sx={{ whiteSpace: "nowrap" }}>
//                         ${item.price.toFixed(2)}
//                       </Typography>
//                     </Box>
//                   }
//                   secondary={
//                     item.extras?.length > 0 && (
//                       <List dense disablePadding sx={{ ml: isMobile ? 1 : 2, mt: 0.5 }}>
//                         {item.extras.map((extra: any, idx: number) => (
//                           <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0.25 }}>
//                             <ListItemText
//                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2", fontSize: "0.85em" }}
//                               primary={
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                   <Typography variant="inherit">+ {extra.name}</Typography>
//                                   <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
//                                 </Box>
//                               }
//                             />
//                           </ListItem>
//                         ))}
//                         {item?.comments && (
//                           <ListItemText
//                             primaryTypographyProps={{ variant: isMobile ? "caption" : "body2", fontSize: "0.85em" }}
//                             primary={
//                               <Box sx={{ mt: 0.5 }}>
//                                 <Typography variant="inherit">
//                                   <strong>Comentario: </strong>
//                                   {item?.comments}
//                                 </Typography>
//                               </Box>
//                             }
//                           />
//                         )}
//                       </List>
//                     )
//                   }
//                 />
//               </ListItem>
//             ))}
//             {!isExpanded && order.cart.length > (isMobile ? 1 : 3) && (
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{
//                   display: "block",
//                   mt: 1,
//                   cursor: "pointer",
//                   fontSize: isMobile ? "0.7rem" : "0.8rem",
//                   textAlign: "center",
//                 }}
//                 onClick={() => toggleCardExpansion(orderId)}
//               >
//                 +{order.cart.length - (isMobile ? 1 : 3)} más...
//               </Typography>
//             )}
//           </List>

//           {order?.comments && (
//             <>
//               <Divider sx={{ my: 1.5 }} />
//               <Box sx={{ mb: 1.5 }}>
//                 <Typography
//                   variant={isMobile ? "caption" : "body2"}
//                   sx={{
//                     display: "block",
//                     backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
//                     p: 1,
//                     borderRadius: 1,
//                   }}
//                 >
//                   <strong>Comentario General: </strong> {order?.comments}
//                 </Typography>
//               </Box>
//             </>
//           )}

//           <Divider sx={{ my: 1.5 }} />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: isMobile ? "column" : "row",
//               gap: isMobile ? 1.5 : 0,
//             }}
//           >
//             <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
//               Total: ${total.toFixed(2)}
//             </Typography>

//             {isMobile ? (
//               <Box sx={{ width: "100%" }}>
//                 {config.actions.length > 0 ? (
//                   <ButtonGroup
//                     fullWidth
//                     variant="contained"
//                     size="small"
//                     sx={{ borderRadius: "8px", overflow: "hidden" }}
//                   >
//                     {config.actions.slice(0, 1).map((action: any, idx: number) => (
//                       <Button
//                         key={`${action.action}-${idx}`}
//                         color={action.color as any}
//                         startIcon={React.cloneElement(action.icon, { fontSize: "small" })}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOrderAction(action.action, order)
//                         }}
//                         disabled={isUpdating}
//                         sx={{
//                           flex: 1,
//                           fontSize: "0.75rem",
//                           py: 0.75,
//                         }}
//                       >
//                         {action.label}
//                       </Button>
//                     ))}
//                     <Button
//                       color="primary"
//                       variant="outlined"
//                       onClick={(e) => handleOpenActionMenu(e, order)}
//                       disabled={isUpdating}
//                       sx={{ maxWidth: "40px", minWidth: "40px" }}
//                     >
//                       <MoreVertIcon fontSize="small" />
//                     </Button>
//                   </ButtonGroup>
//                 ) : (
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     color="primary"
//                     startIcon={<EditIcon fontSize="small" />}
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleOpenEditModal(order)
//                     }}
//                     disabled={isUpdating}
//                     fullWidth
//                     sx={{
//                       fontSize: "0.75rem",
//                       borderRadius: "8px",
//                       py: 0.75,
//                     }}
//                   >
//                     Editar
//                   </Button>
//                 )}
//               </Box>
//             ) : (
//               <Stack direction="row" spacing={1} width="auto">
//                 {config.actions.map((action: any, idx: number) => (
//                   <Button
//                     key={`${action.action}-${idx}`}
//                     size="small"
//                     variant="contained"
//                     color={action.color as any}
//                     startIcon={action.icon}
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleOrderAction(action.action, order)
//                     }}
//                     disabled={isUpdating}
//                     sx={{
//                       fontSize: "0.75rem",
//                       borderRadius: "8px",
//                       px: 1.5,
//                     }}
//                   >
//                     {action.label}
//                   </Button>
//                 ))}

//                 <Button
//                   size="small"
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<EditIcon fontSize="small" />}
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleOpenEditModal(order)
//                   }}
//                   disabled={isUpdating}
//                   sx={{
//                     fontSize: "0.75rem",
//                     borderRadius: "8px",
//                     px: 1.5,
//                   }}
//                 >
//                   Editar
//                 </Button>
//               </Stack>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   })

//   const handleToggleExpand = (orderId: string) => {
//     setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
//   }

//   const OrderRow = React.memo(
//     ({
//       order,
//       expandedRows,
//       onToggleExpand,
//     }: {
//       order: any
//       expandedRows: string[]
//       onToggleExpand: (id: string) => void
//     }) => {
//       const status = order.status
//       const config = statusConfig[status as keyof typeof statusConfig]
//       const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
//       const total = order.cart.reduce((sum: any, item: any) => {
//         const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
//         return sum + item.price * item.quantity + extrasTotal
//       }, 0)

//       const commentsOrderGeneral = order?.comments
//       const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })

//       const orderId = order._id || order.id
//       const isExpanded = expandedRows.includes(orderId)

//       const toggleExpand = (e: React.MouseEvent) => {
//         e.stopPropagation()
//         onToggleExpand(orderId)
//       }

//       return (
//         <>
//           <TableRow
//             sx={{
//               "&:last-child td, &:last-child th": { border: 0 },
//               cursor: "pointer",
//               transition: "background-color 0.2s",
//               "&:hover": {
//                 backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
//               },
//             }}
//             onClick={toggleExpand}
//           >
//             <TableCell>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <IconButton size="small" onClick={toggleExpand}>
//                   {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
//                 </IconButton>
//                 <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                   #{order.id || order._id.slice(-4)}
//                 </Typography>
//               </Box>
//             </TableCell>
//             <TableCell>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
//                 <Typography
//                   variant="body2"
//                   noWrap
//                   sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
//                 >
//                   {order.fullname}
//                 </Typography>
//               </Box>
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
//               <Chip
//                 size="small"
//                 label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
//                 color={config.color as any}
//                 icon={React.cloneElement(config.icon, { fontSize: "small" })}
//                 sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem", borderRadius: "16px" }}
//               />
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
//               <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 {totalItems} items
//               </Typography>
//             </TableCell>
//             <TableCell>
//               <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 ${total.toFixed(2)}
//               </Typography>
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
//               <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 {formattedTime}
//               </Typography>
//             </TableCell>
//             <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
//               <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
//                 <Typography
//                   variant="body2"
//                   noWrap
//                   sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
//                 >
//                   {commentsOrderGeneral || "-"}
//                 </Typography>
//               </Tooltip>
//             </TableCell>
//             <TableCell>
//               {isMobile ? (
//                 <IconButton size="small" color="primary" onClick={(e) => handleOpenActionMenu(e, order)}>
//                   <MoreVertIcon fontSize="small" />
//                 </IconButton>
//               ) : (
//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   sx={{
//                     minWidth: "120px",
//                     "& .MuiIconButton-root": {
//                       mx: 0,
//                     },
//                     justifyContent: "center", // Center the action buttons
//                   }}
//                 >
//                   {config.actions.map((action: any, idx: number) => (
//                     <Tooltip key={`${action.action}-${idx}`} title={action.label}>
//                       <IconButton
//                         size="small"
//                         color={action.color as any}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOrderAction(action.action, order)
//                         }}
//                         disabled={isUpdating}
//                       >
//                         {React.cloneElement(action.icon, { fontSize: "small" })}
//                       </IconButton>
//                     </Tooltip>
//                   ))}
//                   <Tooltip title="Editar">
//                     <IconButton
//                       size="small"
//                       color="primary"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         handleOpenEditModal(order)
//                       }}
//                       disabled={isUpdating}
//                     >
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Stack>
//               )}
//             </TableCell>
//           </TableRow>

//           {/* Expanded details row */}
//           <TableRow>
//             <TableCell style={{ padding: 0 }} colSpan={8}>
//               <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//                 <Box
//                   sx={{
//                     p: { xs: 1.5, sm: 3 },
//                     backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//                     borderBottom: `1px solid ${theme.palette.divider}`,
//                   }}
//                 >
//                   <Typography
//                     variant="subtitle1"
//                     gutterBottom
//                     sx={{ fontWeight: 600, fontSize: isMobile ? "0.875rem" : "1rem" }}
//                   >
//                     Detalles de la Orden
//                   </Typography>

//                   <Grid container spacing={3}>
//                     <Grid item xs={12} md={6}>
//                       <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
//                         Productos:
//                       </Typography>
//                       <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
//                         <List dense disablePadding>
//                           {order.cart.map((item: any, index: number) => (
//                             <React.Fragment key={`${item.id}-${index}`}>
//                               <ListItem disablePadding sx={{ py: 0.75 }}>
//                                 <ListItemText
//                                   primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                   secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                   primary={
//                                     <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                                       <Box sx={{ flex: 1, mr: 1 }}>
//                                         <Typography component="span" variant="inherit">
//                                           <strong>{item.quantity}x</strong> {item.name}
//                                         </Typography>
//                                         {item.Description && (
//                                           <Typography
//                                             variant="inherit"
//                                             display="block"
//                                             sx={{ mt: 0.5, color: "text.secondary" }}
//                                           >
//                                             {item.Description}
//                                           </Typography>
//                                         )}
//                                       </Box>
//                                       <Typography component="span" variant="inherit">
//                                         ${(item.price * item.quantity).toFixed(2)}
//                                       </Typography>
//                                     </Box>
//                                   }
//                                   secondary={
//                                     <div>
//                                       {item.extras?.length > 0 && (
//                                         <List dense disablePadding sx={{ ml: isMobile ? 1 : 2, mt: 0.5 }}>
//                                           {item?.extras?.map((extra: any, idx: number) => (
//                                             <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0.25 }}>
//                                               <ListItemText
//                                                 primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                                 primary={
//                                                   <Box
//                                                     sx={{
//                                                       display: "flex",
//                                                       justifyContent: "space-between",
//                                                       alignItems: "center",
//                                                     }}
//                                                   >
//                                                     <Typography variant="inherit">+ {extra.name}</Typography>
//                                                     <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
//                                                   </Box>
//                                                 }
//                                               />
//                                             </ListItem>
//                                           ))}
//                                         </List>
//                                       )}
//                                       {item?.comments && (
//                                         <Box sx={{ mt: 1 }}>
//                                           <Typography variant="inherit">
//                                             <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
//                                           </Typography>
//                                         </Box>
//                                       )}
//                                     </div>
//                                   }
//                                 />
//                               </ListItem>
//                               {index < order.cart.length - 1 && <Divider sx={{ my: 0.5 }} />}
//                             </React.Fragment>
//                           ))}
//                         </List>
//                       </Paper>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                       <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
//                         Información Adicional:
//                       </Typography>
//                       <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
//                         <List dense disablePadding>
//                           <ListItem disablePadding sx={{ py: 0.75 }}>
//                             <ListItemText
//                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                               primary={
//                                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                   <Typography variant="inherit">
//                                     <strong>Estado:</strong>
//                                   </Typography>
//                                   <Chip
//                                     size="small"
//                                     label={config.label}
//                                     color={config.color as any}
//                                     icon={React.cloneElement(config.icon, { fontSize: "small" })}
//                                     sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem", borderRadius: "16px" }}
//                                   />
//                                 </Box>
//                               }
//                             />
//                           </ListItem>
//                           <Divider sx={{ my: 0.5 }} />

//                           <ListItem disablePadding sx={{ py: 0.75 }}>
//                             <ListItemText
//                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                               primary={
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                   <Typography variant="inherit">
//                                     <strong>Total:</strong>
//                                   </Typography>
//                                   <Typography variant="inherit" fontWeight="bold">
//                                     ${total.toFixed(2)}
//                                   </Typography>
//                                 </Box>
//                               }
//                             />
//                           </ListItem>
//                           <Divider sx={{ my: 0.5 }} />

//                           {commentsOrderGeneral && (
//                             <>
//                               <ListItem disablePadding sx={{ py: 0.75 }}>
//                                 <ListItemText
//                                   primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                                   primary={
//                                     <Box>
//                                       <Typography variant="inherit">
//                                         <strong>Comentarios:</strong>
//                                       </Typography>
//                                       <Typography
//                                         variant="inherit"
//                                         sx={{
//                                           mt: 0.5,
//                                           p: 1,
//                                           borderRadius: 1,
//                                           backgroundColor:
//                                             theme.palette.mode === "dark"
//                                               ? "rgba(255,255,255,0.05)"
//                                               : "rgba(0,0,0,0.03)",
//                                         }}
//                                       >
//                                         {commentsOrderGeneral}
//                                       </Typography>
//                                     </Box>
//                                   }
//                                 />
//                               </ListItem>
//                               <Divider sx={{ my: 0.5 }} />
//                             </>
//                           )}

//                           <ListItem disablePadding sx={{ py: 0.75 }}>
//                             <ListItemText
//                               primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
//                               primary={
//                                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                   <Typography variant="inherit">
//                                     <strong>Hora:</strong>
//                                   </Typography>
//                                   <Typography variant="inherit">{formattedTime}</Typography>
//                                 </Box>
//                               }
//                             />
//                           </ListItem>
//                         </List>
//                       </Paper>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Collapse>
//             </TableCell>
//           </TableRow>
//         </>
//       )
//     },
//   )

//   // Custom Pagination Controls
//   const PaginationControls = () => (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mt: 3,
//         pb: 2,
//         flexDirection: isMobile ? "column" : "row",
//         gap: isMobile ? 2 : 0,
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//           Órdenes por página:
//         </Typography>
//         <FormControl size="small" variant="outlined">
//           <Select
//             value={pageSize}
//             onChange={handlePageSizeChange}
//             sx={{
//               height: "36px",
//               fontSize: isMobile ? "0.75rem" : "0.875rem",
//               borderRadius: "8px",
//               minWidth: "70px",
//             }}
//           >
//             {pageSizeOptions.map((size) => (
//               <MenuItem key={size} value={size} sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//                 {size}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Pagination
//         count={pageCount}
//         page={currentPages[activeStatus]}
//         onChange={handlePageChange}
//         color="primary"
//         size={isMobile ? "small" : "medium"}
//         showFirstButton={!isMobile}
//         showLastButton={!isMobile}
//         siblingCount={isMobile ? 0 : 1}
//         boundaryCount={isMobile ? 1 : 2}
//         sx={{
//           "& .MuiPaginationItem-root": {
//             borderRadius: "8px",
//           },
//         }}
//       />

//       <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
//         Mostrando {filteredOrders.length > 0 ? (currentPages[activeStatus] - 1) * pageSize + 1 : 0}-
//         {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
//       </Typography>
//     </Box>
//   )

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         overflow: "hidden",
//         bgcolor: theme.palette.background.default,
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Custom AppBar */}
//       <AppBar
//         position="sticky"
//         elevation={3}
//         sx={{
//           bgcolor: "background.paper",
//           color: "text.primary",
//           borderBottom: 1,
//           borderColor: "divider",

//         }}
//       >
//         <Toolbar
//           variant="dense"
//           sx={{
//             minHeight: isMobile ? 48 : 56,
//             flexDirection: isMobile ? "column" : "row",
//             py: isMobile ? 1 : 0,
//             px: isMobile ? 1 : 2,
//             justifyContent: "space-between", // Better spacing
//           }}
//         >
//           {/* Logo and Title */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               flexGrow: 1,
//               height: "40px",
//               position: "relative",
//               overflow: "hidden",
//               width: isMobile ? "100%" : "auto",
//               justifyContent: isMobile ? "center" : "flex-start", // Center on mobile
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 32,
//                 height: 32,
//                 flexShrink: 0,
//                 ml: 0.5,
//                 bgcolor: theme.palette.primary.main,
//               }}
//             >
//               <Image
//                 src={"/images/flama.png"}
//                 alt={"LlakaScript"}
//                 width={32}
//                 height={32}
//                 priority
//                 style={{
//                   objectFit: "contain",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </Avatar>

//             <Box
//               sx={{
//                 position: "relative",
//                 width: "auto",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 flexGrow: 1,
//               }}
//             >
//               <Typography
//                 variant={isMobile ? "subtitle1" : "h6"}
//                 sx={{
//                   fontWeight: 600,
//                   lineHeight: 1.1,
//                   fontSize: isMobile ? "1rem" : undefined,
//                   textAlign: isMobile ? "center" : "left",
//                   color: theme.palette.primary.main,
//                 }}
//               >
//                 {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Right side controls */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               width: isMobile ? "100%" : "auto",
//               justifyContent: isMobile ? "center" : "flex-end", // Center on mobile
//               mt: isMobile ? 1 : 0,
//             }}
//           >
//             {/* View mode toggle */}
//             <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
//               <IconButton
//                 size="small"
//                 onClick={toggleViewMode}
//                 color="default"
//                 sx={{
//                   borderRadius: "8px",
//                 }}
//               >
//                 {viewMode === "card" ? (
//                   <ViewListIcon fontSize={isMobile ? "small" : "medium"} />
//                 ) : (
//                   <ViewColumnIcon fontSize={isMobile ? "small" : "medium"} />
//                 )}
//               </IconButton>
//             </Tooltip>

//             {/* Connection status indicator */}
//             <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
//               <Box
//                 sx={{
//                   width: 10,
//                   height: 10,
//                   borderRadius: "50%",
//                   bgcolor: isConnected ? "success.main" : "error.main",
//                   mr: 1,
//                 }}
//               />
//             </Tooltip>

//             {/* Order count badge */}
//             {isMobile && totalOrders > 0 && (
//               <Badge
//                 badgeContent={totalOrders}
//                 color="primary"
//                 sx={{
//                   mr: 0.5,
//                   "& .MuiBadge-badge": {
//                     fontSize: "0.7rem",
//                     height: "18px",
//                     minWidth: "18px",
//                   },
//                 }}
//               >
//                 <Box sx={{ width: 4, height: 4 }} />
//               </Badge>
//             )}

//             {/* Last refresh time - hidden on mobile */}
//             {lastRefresh && !isMobile && (
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{
//                   whiteSpace: "nowrap",
//                   fontSize: "0.75rem",
//                   bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
//                   px: 1,
//                   py: 0.5,
//                   borderRadius: "4px",
//                 }}
//               >
//                 Actualizado: {lastRefresh.toLocaleTimeString()}
//               </Typography>
//             )}

//             {/* Refresh button */}
//             <Tooltip title="Actualizar">
//               <IconButton
//                 color="primary"
//                 size="small"
//                 onClick={fetchHistoricalOrders}
//                 disabled={isLoading || isUpdating}
//                 sx={{
//                   borderRadius: "8px",
//                 }}
//               >
//                 <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
//               </IconButton>
//             </Tooltip>

//             {/* Header collapse toggle (mobile only) */}
//             {isMobile && (
//               <IconButton
//                 size="small"
//                 onClick={toggleHeader}
//                 sx={{
//                   borderRadius: "8px",
//                 }}
//               >
//                 {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
//               </IconButton>
//             )}

//             <Tooltip title="Salir">
//               <IconButton
//                 size="small"
//                 onClick={handleLogout}
//                 color="default"
//                 sx={{
//                   borderRadius: "8px",
//                 }}
//               >
//                 <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flex: 1,
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Container maxWidth="xl" sx={{ height: "100%", py: { xs: 1, sm: 2 } }}>
//           <Paper
//             elevation={isMobile ? 1 : 3}
//             sx={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//               borderRadius: { xs: 2, sm: 3 },
//               mx: "auto", // Center the paper
//               width: "100%",
//               position: "relative",
//               "&:before": {
//                 content: '""',
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: "4px",
//                 backgroundColor: theme.palette.primary.main,
//                 zIndex: 1,
//                 borderTopLeftRadius: { xs: "8px", sm: "12px" },
//                 borderTopRightRadius: { xs: "8px", sm: "12px" },
//               },
//             }}
//           >
//             {/* Status header - collapsible on mobile */}
//             <Collapse in={!headerCollapsed} timeout="auto">
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   borderBottom: "1px solid",
//                   borderColor: theme.palette.divider,
//                   overflow: "hidden",
//                   p: { xs: 1.5, sm: 2 },
//                   pt: { xs: 2, sm: 3 },
//                 }}
//               >
//                 {/* Search bar */}
//                 <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto", mb: 2 }}>
//                   <TextField
//                     fullWidth
//                     size={isMobile ? "small" : "medium"}
//                     variant="outlined"
//                     placeholder="Buscar órdenes..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon fontSize={isMobile ? "small" : "medium"} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: searchQuery && (
//                         <InputAdornment position="end">
//                           <IconButton onClick={clearSearch} size="small">
//                             <ClearIcon fontSize={isMobile ? "small" : "medium"} />
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                       sx: {
//                         borderRadius: "12px",
//                       },
//                     }}
//                   />
//                 </Box>

//                 {/* Status tabs */}
//                 <Box sx={{ width: "100%", overflow: "auto", display: "flex", justifyContent: "center" }}>
//                   <Tabs
//                     value={activeStatus}
//                     onChange={handleStatusChange}
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     allowScrollButtonsMobile
//                     sx={{
//                       minHeight: isMobile ? 40 : 48,
//                       "& .MuiTab-root": {
//                         minHeight: isMobile ? 40 : 48,
//                         py: 0,
//                         fontSize: isMobile ? "0.7rem" : "0.8rem",
//                         px: isMobile ? 0.5 : 1.5,
//                         borderRadius: "20px",
//                         mx: 0.5,
//                         "&.Mui-selected": {
//                           backgroundColor:
//                             theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
//                         },
//                       },
//                       "& .MuiTabs-indicator": {
//                         height: 3,
//                         borderRadius: "3px 3px 0 0",
//                       },
//                     }}
//                   >
//                     <Tab label="Todas" value="all" />
//                     {statusOptions.map((status) => (
//                       <Tab
//                         key={status}
//                         label={statusConfig[status as keyof typeof statusConfig].label}
//                         value={status}
//                         icon={React.cloneElement(statusConfig[status as keyof typeof statusConfig].icon, {
//                           fontSize: isMobile ? "small" : "medium",
//                         })}
//                         iconPosition="start"
//                       />
//                     ))}
//                   </Tabs>
//                 </Box>

//                 {/* Status indicators */}
//                 {(isLoading || isUpdating) && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       p: 1.5,
//                       mt: 2,
//                       mx: "auto",
//                       maxWidth: "400px",
//                       backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
//                       borderRadius: 2,
//                       justifyContent: "center",
//                     }}
//                   >
//                     <CircularProgress size={16} color="primary" />
//                     <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
//                       {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             </Collapse>

//             {/* Error messages */}
//             <Box
//               sx={{
//                 px: { xs: 1.5, sm: 2 },
//                 pt: { xs: 1.5, sm: 2 },
//                 overflow: "auto",
//                 flexShrink: 0,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center", // Center alerts
//               }}
//             >
//               {error && (
//                 <Alert
//                   severity="error"
//                   onClose={() => clearMessages()}
//                   sx={{
//                     mb: 1.5,
//                     maxWidth: "600px",
//                     width: "100%",
//                     borderRadius: 2,
//                   }}
//                 >
//                   {error}
//                 </Alert>
//               )}

//               {successMessage && (
//                 <Alert
//                   severity="success"
//                   onClose={() => clearMessages()}
//                   sx={{
//                     mb: 1.5,
//                     maxWidth: "600px",
//                     width: "100%",
//                     borderRadius: 2,
//                   }}
//                 >
//                   {successMessage}
//                 </Alert>
//               )}
//             </Box>

//             {/* Main content - takes all available space */}
//             <Box
//               sx={{
//                 flex: 1,
//                 overflow: "auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 p: { xs: 1.5, sm: 2 },
//               }}
//             >
//               <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

//               {/* Orders list */}
//               <Box sx={{ flex: 1, maxWidth: viewMode === "list" ? "100%" : "1200px", mx: "auto", width: "100%" }}>
//                 {filteredOrders.length === 0 ? (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: "200px",
//                       flexDirection: "column",
//                       gap: 2,
//                       my: 4,
//                       p: 3,
//                       borderRadius: 3,
//                       backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//                     }}
//                   >
//                     <Typography variant="h6" color="text.secondary" sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
//                       No se encontraron órdenes
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size={isMobile ? "small" : "medium"}
//                       onClick={() => {
//                         setSearchQuery("")
//                         setActiveStatus("all")
//                       }}
//                       sx={{
//                         borderRadius: "8px",
//                         px: 3,
//                       }}
//                     >
//                       Limpiar filtros
//                     </Button>
//                   </Box>
//                 ) : viewMode === "card" ? (
//                   <>
//                     <Grid container spacing={isMobile ? 1.5 : 2.5} justifyContent="center">
//                       {paginatedOrders.map((order: any) => (
//                         <Grid item xs={12} sm={isTablet ? 12 : 6} lg={4} key={order._id || order.id}>
//                           <OrderCard order={order} />
//                         </Grid>
//                       ))}
//                     </Grid>
//                     <PaginationControls />
//                   </>
//                 ) : (
//                   <>
//                     <TableContainer
//                       component={Paper}
//                       elevation={2}
//                       sx={{
//                         position: "relative",
//                         overflow: "auto",
//                         maxWidth: "100%",
//                         borderRadius: 3,
//                         "&:before": {
//                           content: '""',
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           height: "4px",
//                           backgroundColor: theme.palette.primary.main,
//                           zIndex: 1,
//                           borderTopLeftRadius: "12px",
//                           borderTopRightRadius: "12px",
//                         },
//                       }}
//                     >
//                       <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
//                         <TableHead>
//                           <TableRow
//                             sx={{
//                               backgroundColor:
//                                 theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
//                             }}
//                           >
//                             <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
//                               ID
//                             </TableCell>
//                             <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
//                               Cliente
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 display: { xs: "none", sm: "table-cell" },
//                                 fontSize: isMobile ? "0.75rem" : "0.875rem",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               Estado
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 display: { xs: "none", md: "table-cell" },
//                                 fontSize: isMobile ? "0.75rem" : "0.875rem",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               Items
//                             </TableCell>
//                             <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
//                               Total
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 display: { xs: "none", md: "table-cell" },
//                                 fontSize: isMobile ? "0.75rem" : "0.875rem",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               Hora
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 display: { xs: "none", lg: "table-cell" },
//                                 fontSize: isMobile ? "0.75rem" : "0.875rem",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               Comentario General
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 fontSize: isMobile ? "0.75rem" : "0.875rem",
//                                 fontWeight: "bold",
//                                 textAlign: "center",
//                               }}
//                             >
//                               Acciones
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {paginatedOrders.map((order: any) => (
//                             <OrderRow
//                               key={order._id || order.id}
//                               order={order}
//                               expandedRows={expandedRows}
//                               onToggleExpand={handleToggleExpand}
//                             />
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                     <PaginationControls />
//                   </>
//                 )}
//               </Box>
//             </Box>
//           </Paper>
//         </Container>

//         {/* Scroll to top button */}
//         <Zoom in={trigger}>
//           <Box
//             onClick={scrollToTop}
//             role="presentation"
//             sx={{
//               position: "fixed",
//               bottom: 16,
//               right: 16,
//               zIndex: 1000,
//             }}
//           >
//             <Fab
//               color="primary"
//               size="small"
//               aria-label="scroll back to top"
//               sx={{
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//               }}
//             >
//               <KeyboardArrowUp />
//             </Fab>
//           </Box>
//         </Zoom>
//       </Box>

//       {/* Action Menu */}
//       <Menu
//         anchorEl={actionMenuAnchorEl}
//         open={Boolean(actionMenuAnchorEl)}
//         onClose={handleCloseActionMenu}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         PaperProps={{
//           sx: {
//             minWidth: 180,
//             borderRadius: "12px",
//             overflow: "hidden",
//           },
//         }}
//       >
//         {actionMenuOrder &&
//           statusConfig[actionMenuOrder.status as keyof typeof statusConfig].actions.map((action: any) => (
//             <MenuItem
//               key={action.action}
//               onClick={() => handleActionMenuItemClick(action.action)}
//               sx={{
//                 color:
//                   (theme.palette[action.color as keyof typeof theme.palette] as PaletteColor)?.main ??
//                   theme.palette.text.primary,
//                 fontSize: "0.875rem",
//                 py: 1.5,
//               }}
//             >
//               <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
//                 {React.cloneElement(action.icon, { fontSize: "small" })}
//               </ListItemIcon>
//               {action.label}
//             </MenuItem>
//           ))}
//         <MenuItem
//           onClick={() => handleActionMenuItemClick("edit")}
//           sx={{
//             fontSize: "0.875rem",
//             py: 1.5,
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: "36px" }}>
//             <EditIcon fontSize="small" />
//           </ListItemIcon>
//           Editar
//         </MenuItem>
//       </Menu>

//       {/* Edit Order Modal */}
//       {isEditModalOpen && selectedOrder && (
//         <EditOrderModal
//           open={isEditModalOpen}
//           order={selectedOrder}
//           onSave={saveUpdateData}
//           menuData={{
//             mainMenu: hojas?.Hoja1 || [],
//             promotions: hojas?.Promotion || [],
//           }}
//           onClose={handleCloseEditModal}
//         />
//       )}
//     </Box>
//   )
// }

// export default OrderSpeedGeneric



"use client"

import React, { useMemo, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Typography,
    Alert,
    Grid,
    List,
    ListItem,
    ListItemText,
    Avatar,
    IconButton,
    Card,
    CardContent,
    Divider,
    Badge,
    Tooltip,
    AppBar,
    Toolbar,
    useMediaQuery,
    useTheme,
    Stack,
    useScrollTrigger,
    Fab,
    Zoom,
    TextField,
    InputAdornment,
    Pagination,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    Select,
    FormControl,
    Collapse,
    Menu,
    ListItemIcon,
    ButtonGroup,
    type PaletteColor,
    Container,
} from "@mui/material"
import {
    Edit as EditIcon,
    Refresh as RefreshIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    CheckCircle as CheckCircleIcon,
    PauseCircle as PauseCircleIcon,
    Cancel as CancelIcon,
    DeliveryDining as DeliveryIcon,
    PlayArrow,
    Pause,
    ViewList as ViewListIcon,
    ViewColumn as ViewColumnIcon,
    Logout as LogoutIcon,
    AccessTime,
    Person,
    KeyboardArrowUp,
    Search as SearchIcon,
    Clear as ClearIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { useOrdersManagementSocketApi } from "../../../hooks/useOrdersManagementSocketApi"
import EditOrderModal from "../Orders/OrdersScreenStaff/EditOrderModalStaff/EditOrderModal"
import Image from "next/image"
import { clearLocalhostStorage } from "@/services/localstorage.services"
import { recordAttendance } from "@/services/attendance.services"
import PendingOrdersDialog from "../PendingOrdersDialog/PendingOrdersDialog"

// Status configuration
const statusConfig = {
    pending: {
        color: "default",
        icon: <PauseCircleIcon color="disabled" />,
        label: "Pendientes",
        actions: [{ action: "start", label: "Iniciar", color: "primary", icon: <PlayArrow /> }],
    },
    processing: {
        color: "primary",
        icon: <PlayArrow color="primary" />,
        label: "En Proceso",
        actions: [
            { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
            { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
        ],
    },
    paused: {
        color: "warning",
        icon: <Pause color="warning" />,
        label: "Pausadas",
        actions: [
            { action: "resume", label: "Reanudar", color: "primary", icon: <PlayArrow /> },
            { action: "complete", label: "Completar", color: "success", icon: <CheckCircleIcon /> },
        ],
    },
    finished: {
        color: "success",
        icon: <CheckCircleIcon color="success" />,
        label: "Terminadas",
        actions: [{ action: "deliver", label: "Entregar", color: "success", icon: <DeliveryIcon /> }],
    },
    cancelled: {
        color: "error",
        icon: <CancelIcon color="error" />,
        label: "Canceladas",
        actions: [{ action: "reopen", label: "Reabrir", color: "primary", icon: <PlayArrow /> }],
    },
    delivered: {
        color: "success",
        icon: <DeliveryIcon color="success" />,
        label: "Entregadas",
        actions: [],
    },
}

const statusOptions = Object.keys(statusConfig)
const pageSizeOptions = [5, 10, 20, 50]

const OrderSpeedGeneric = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isTablet = useMediaQuery(theme.breakpoints.down("md"))
    const [headerCollapsed, setHeaderCollapsed] = useState(isMobile)
    const [displayTitle, setDisplayTitle] = useState(false)
    const [viewMode, setViewMode] = useState<"card" | "list">(isMobile ? "card" : "list")
    const [openPendingDialog, setOpenPendingDialog] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeStatus, setActiveStatus] = useState("all")
    const [currentPages, setCurrentPages] = useState<Record<string, number>>(
        statusOptions.reduce((acc, status) => ({ ...acc, [status]: 1 }), { all: 1 }),
    )
    const [expandedRows, setExpandedRows] = useState<string[]>([])
    const [expandedCards, setExpandedCards] = useState<string[]>([])
    const [pageSize, setPageSize] = useState(isMobile ? 5 : 10)
    const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [actionMenuOrder, setActionMenuOrder] = useState<any>(null)

    const { data } = useSelector((state: RootState) => state.chExcelData as unknown as { data: any })
    const { hojas, companyName } = data || { hojas: { Config: [], staff: [] } }
    const user = useSelector((state: RootState) => state.auth) || localStorage.getItem("email")

    const {
        allOrders,
        ordersByStatus,
        isConnected,
        isLoading,
        isUpdating,
        error,
        successMessage,
        lastRefresh,
        fetchHistoricalOrders,
        handleOrderAction,
        updateOrder,
        clearMessages,
    } = useOrdersManagementSocketApi({
        companyName: data?.companyName,
        userEmail: user?.user?.email,
        orderLimit: 50,
    })

    // Calculate totals
    const totalOrders = Object.values(ordersByStatus).reduce((sum, orders) => sum + (orders?.length || 0), 0)
    const pendingCount = ordersByStatus.pending?.length || 0
    const processingCount = (ordersByStatus.processing?.length || 0) + (ordersByStatus.paused?.length || 0)
    const completedCount = (ordersByStatus.finished?.length || 0) + (ordersByStatus.delivered?.length || 0)

    // Filter and search orders
    const filteredOrders = useMemo(() => {
        let filtered = [...allOrders]

        if (activeStatus !== "all") {
            filtered = filtered.filter((order) => order.status === activeStatus)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter((order) => {
                return (
                    order.fullname?.toLowerCase().includes(query) ||
                    order.id?.toString().includes(query) ||
                    order._id?.toString().includes(query) ||
                    order.orderType?.toLowerCase().includes(query) ||
                    order.dataTypeOrder?.toLowerCase().includes(query) ||
                    order.cart.some(
                        (item: any) =>
                            item.name.toLowerCase().includes(query) ||
                            (item.Description && item.Description.toLowerCase().includes(query)) ||
                            item.extras?.some((extra: any) => extra.name.toLowerCase().includes(query)),
                    )
                )
            })
        }

        return filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.timestamp || 0)
            const dateB = new Date(b.createdAt || b.timestamp || 0)
            return dateB.getTime() - dateA.getTime()
        })
    }, [allOrders, activeStatus, searchQuery])

    // Paginate orders
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPages[activeStatus] - 1) * pageSize
        return filteredOrders.slice(startIndex, startIndex + pageSize)
    }, [filteredOrders, currentPages, activeStatus, pageSize])

    // Calculate page count for current status
    const pageCount = Math.ceil(filteredOrders.length / pageSize)

    // Handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPages((prev) => ({
            ...prev,
            [activeStatus]: value,
        }))
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Handle page size change
    const handlePageSizeChange = (event: any) => {
        const newSize = event.target.value
        setPageSize(newSize)
        const newValue = Math.floor(((currentPages[activeStatus] - 1) * pageSize) / newSize) + 1
        setCurrentPages((prev) => ({
            ...prev,
            [activeStatus]: newValue,
        }))
    }

    // Toggle functions
    const toggleHeader = () => setHeaderCollapsed(!headerCollapsed)
    const toggleViewMode = () => setViewMode(viewMode === "card" ? "list" : "card")

    // Action handlers
    const handleLogout = async () => {
        clearLocalhostStorage()
        await recordAttendance("getOut", user?.user?.email, data?.companyName)
        window.location.reload()
    }

    const handleOpenEditModal = (order: any) => {
        setSelectedOrder(order)
        setIsEditModalOpen(true)
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false)
        setSelectedOrder(null)
    }

    const saveUpdateData = async (updatedOrder: any) => {
        try {
            await updateOrder(updatedOrder._id || updatedOrder.id, updatedOrder)
            handleCloseEditModal()
        } catch (error) {
            console.error("Failed to update order:", error)
        }
    }

    const handleStatusChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveStatus(newValue)
        setCurrentPages((prev) => ({
            ...prev,
            [newValue]: 1,
        }))
    }

    const clearSearch = () => {
        setSearchQuery("")
    }

    // Action menu handlers
    const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, order: any) => {
        event.stopPropagation()
        event.preventDefault() // Add this to prevent any default behavior
        setActionMenuAnchorEl(event.currentTarget)
        setActionMenuOrder(order)
    }

    const handleCloseActionMenu = () => {
        setActionMenuAnchorEl(null)
        setActionMenuOrder(null)
    }

    const handleActionMenuItemClick = (action: string) => {
        if (actionMenuOrder) {
            if (action === "edit") {
                handleOpenEditModal(actionMenuOrder)
            } else {
                handleOrderAction(action, actionMenuOrder)
            }
            handleCloseActionMenu()
        }
    }

    // Toggle card expansion
    const toggleCardExpansion = (orderId: string) => {
        setExpandedCards((prev) => {
            const newExpandedCards = prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]

            // Smooth scroll if expanding on mobile
            if (!prev.includes(orderId) && isMobile) {
                setTimeout(() => {
                    const element = document.getElementById(`card-${orderId}`)
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                }, 100)
            }

            return newExpandedCards
        })
    }

    // Effects
    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayTitle((prev) => !prev)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // Scroll to top button logic
    const trigger = useScrollTrigger({
        threshold: 100,
    })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    // Order Card Component
    const OrderCard = React.memo(({ order }: { order: any }) => {
        const status = order.status
        const config = statusConfig[status as keyof typeof statusConfig]
        const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
        const total = order.cart.reduce((sum: any, item: any) => {
            const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
            return sum + item.price * item.quantity + extrasTotal
        }, 0)

        const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })

        const paletteColor: any = theme.palette[config.color as keyof typeof theme.palette]
        const orderId = order._id || order.id
        const isExpanded = expandedCards.includes(orderId)

        return (
            <Card
                id={`card-${orderId}`}
                sx={{
                    borderLeft: "4px solid",
                    borderColor: paletteColor?.main || "grey",
                    mb: 2,
                    position: "relative",
                    transition: "all 0.3s ease-in-out", // Smoother transition
                    "&:hover": {
                        transform: isMobile ? "none" : "translateY(-2px)",
                        boxShadow: isMobile ? "none" : theme.shadows[4],
                    },
                    maxHeight: isExpanded ? "none" : { xs: "none", md: "calc(100vh - 270px)" },
                    overflow: "hidden",
                    mx: "auto", // Center the card
                    width: "100%", // Full width for proper centering
                }}
            >
                <CardContent sx={{ p: isMobile ? 1.5 : 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, alignItems: "center" }}>
                        <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
                            #{order.id || order._id.slice(-4)}
                        </Typography>
                        <Chip
                            size={isMobile ? "small" : "medium"}
                            label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
                            color={config.color as any}
                            icon={React.cloneElement(config.icon, { fontSize: isMobile ? "small" : "medium" })}
                            sx={{ borderRadius: "16px" }} // More rounded chip
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Person fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
                            <Typography
                                variant={isMobile ? "caption" : "body2"}
                                noWrap
                                sx={{ maxWidth: isMobile ? "120px" : "180px" }}
                            >
                                {order.fullname}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AccessTime fontSize={isMobile ? "small" : "medium"} sx={{ mr: 0.5, opacity: 0.7 }} />
                            <Typography variant={isMobile ? "caption" : "body2"}>{formattedTime}</Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                        <Typography variant={isMobile ? "caption" : "subtitle2"} fontWeight="medium">
                            Items ({totalItems})
                        </Typography>
                        {order.cart.length > (isMobile ? 1 : 2) && !isExpanded && (
                            <Button
                                size="small"
                                variant="text"
                                onClick={() => toggleCardExpansion(orderId)}
                                endIcon={<ExpandMoreIcon fontSize={isMobile ? "small" : "medium"} />}
                                sx={{
                                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                                    minWidth: "auto",
                                    p: "4px 8px",
                                }}
                            >
                                Ver todos
                            </Button>
                        )}
                        {isExpanded && (
                            <Button
                                size="small"
                                variant="text"
                                onClick={() => toggleCardExpansion(orderId)}
                                endIcon={<ExpandLessIcon fontSize={isMobile ? "small" : "medium"} />}
                                sx={{
                                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                                    minWidth: "auto",
                                    p: "4px 8px",
                                }}
                            >
                                Colapsar
                            </Button>
                        )}
                    </Box>

                    <List dense disablePadding sx={{ mb: 1.5 }}>
                        {order?.cart?.slice(0, isExpanded ? undefined : isMobile ? 1 : 3).map((item: any) => (
                            <ListItem key={`${item.id}-${item.name}`} disablePadding sx={{ py: 0.5 }}>
                                <ListItemText
                                    primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                    secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                    primary={
                                        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                            <Box sx={{ flex: 1, mr: 1 }}>
                                                <Typography component="span" variant="inherit">
                                                    <strong>{item.quantity}x</strong> {item.name}
                                                </Typography>
                                                {item.Description && (
                                                    <Typography
                                                        variant="inherit"
                                                        display="block"
                                                        sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.85em" }}
                                                    >
                                                        {item.Description}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Typography component="span" variant="inherit" sx={{ whiteSpace: "nowrap" }}>
                                                ${item.price.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        item.extras?.length > 0 && (
                                            <List dense disablePadding sx={{ ml: isMobile ? 1 : 2, mt: 0.5 }}>
                                                {item.extras.map((extra: any, idx: number) => (
                                                    <ListItem key={`${item.id}-extra-${extra.id || idx}`} disablePadding sx={{ py: 0.25 }}>
                                                        <ListItemText
                                                            primaryTypographyProps={{ variant: isMobile ? "caption" : "body2", fontSize: "0.85em" }}
                                                            primary={
                                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <Typography variant="inherit">+ {extra.name}</Typography>
                                                                    <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                                {item?.comments && (
                                                    <ListItemText
                                                        primaryTypographyProps={{ variant: isMobile ? "caption" : "body2", fontSize: "0.85em" }}
                                                        primary={
                                                            <Box sx={{ mt: 0.5 }}>
                                                                <Typography variant="inherit">
                                                                    <strong>Comentario: </strong>
                                                                    {item?.comments}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                )}
                                            </List>
                                        )
                                    }
                                />
                            </ListItem>
                        ))}
                        {!isExpanded && order.cart.length > (isMobile ? 1 : 3) && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: "block",
                                    mt: 1,
                                    cursor: "pointer",
                                    fontSize: isMobile ? "0.7rem" : "0.8rem",
                                    textAlign: "center",
                                }}
                                onClick={() => toggleCardExpansion(orderId)}
                            >
                                +{order.cart.length - (isMobile ? 1 : 3)} más...
                            </Typography>
                        )}
                    </List>

                    {order?.comments && (
                        <>
                            <Divider sx={{ my: 1.5 }} />
                            <Box sx={{ mb: 1.5 }}>
                                <Typography
                                    variant={isMobile ? "caption" : "body2"}
                                    sx={{
                                        display: "block",
                                        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                        p: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    <strong>Comentario General: </strong> {order?.comments}
                                </Typography>
                            </Box>
                        </>
                    )}

                    <Divider sx={{ my: 1.5 }} />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: isMobile ? "column" : "row",
                            gap: isMobile ? 1.5 : 0,
                        }}
                    >
                        <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
                            Total: ${total.toFixed(2)}
                        </Typography>

                        {isMobile ? (
                            <Box sx={{ width: "100%" }}>
                                {config.actions.length > 0 ? (
                                    <ButtonGroup
                                        fullWidth
                                        variant="contained"
                                        size="small"
                                        sx={{ borderRadius: "8px", overflow: "hidden" }}
                                    >

                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={(e) => handleOpenActionMenu(e, order)}
                                            disabled={isUpdating}
                                            sx={{
                                                maxWidth: "40px",
                                                minWidth: "40px",
                                                transition: "all 0.2s ease-in-out",
                                                "&:active": {
                                                    transform: "scale(0.98)",
                                                },
                                            }}
                                        >
                                            <MoreVertIcon fontSize="small" />
                                        </Button>
                                        {config.actions.slice(0, 1).map((action: any, idx: number) => (
                                            <Button
                                                key={`${action.action}-${idx}`}
                                                color={action.color as any}
                                                startIcon={React.cloneElement(action.icon, { fontSize: "small" })}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    handleOrderAction(action.action, order)
                                                }}
                                                disabled={isUpdating}
                                                sx={{
                                                    flex: 1,
                                                    fontSize: "0.75rem",
                                                    py: 0.75,
                                                    p: 1,
                                                    height: "48px",
                                                    // maxWidth: "270px",
                                                    transition: "all 0.2s ease-in-out",
                                                    "&:active": {
                                                        transform: "scale(0.98)",
                                                    },
                                                    overflow: "hidden"
                                                }}
                                            >
                                                {action.label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                ) : (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<EditIcon fontSize="small" />}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            handleOpenEditModal(order)
                                        }}
                                        disabled={isUpdating}
                                        fullWidth
                                        sx={{
                                            fontSize: "0.75rem",
                                            borderRadius: "8px",
                                            py: 0.75,
                                            transition: "all 0.2s ease-in-out",
                                            "&:active": {
                                                transform: "scale(0.98)",
                                            },
                                        }}
                                    >
                                        Editar
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <Stack direction="row" spacing={1} width="auto">
                                {config.actions.map((action: any, idx: number) => (
                                    <Button
                                        key={`${action.action}-${idx}`}
                                        size="small"
                                        variant="contained"
                                        color={action.color as any}
                                        startIcon={action.icon}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleOrderAction(action.action, order)
                                        }}
                                        disabled={isUpdating}
                                        sx={{
                                            fontSize: "0.75rem",
                                            borderRadius: "8px",
                                            px: 1.5,
                                        }}
                                    >
                                        {action.label}
                                    </Button>
                                ))}

                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<EditIcon fontSize="small" />}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleOpenEditModal(order)
                                    }}
                                    disabled={isUpdating}
                                    sx={{
                                        fontSize: "0.75rem",
                                        borderRadius: "8px",
                                        px: 1.5,
                                    }}
                                >
                                    Editar
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </CardContent>
            </Card>
        )
    })

    const handleToggleExpand = (orderId: string) => {
        setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
    }

    const OrderRow = React.memo(
        ({
            order,
            expandedRows,
            onToggleExpand,
        }: {
            order: any
            expandedRows: string[]
            onToggleExpand: (id: string) => void
        }) => {
            const status = order.status
            const config = statusConfig[status as keyof typeof statusConfig]
            const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
            const total = order.cart.reduce((sum: any, item: any) => {
                const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
                return sum + item.price * item.quantity + extrasTotal
            }, 0)

            const commentsOrderGeneral = order?.comments
            const formattedTime = new Date(order.createdAt || order.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })

            const orderId = order._id || order.id
            const isExpanded = expandedRows.includes(orderId)

            const toggleExpand = (e: React.MouseEvent) => {
                e.stopPropagation()
                onToggleExpand(orderId)
            }

            return (
                <>
                    <TableRow
                        sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                            },
                        }}
                        onClick={toggleExpand}
                    >
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton size="small" onClick={toggleExpand}>
                                    {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                </IconButton>
                                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                                    #{order.id || order._id.slice(-4)}
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                                >
                                    {order.fullname}
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                            <Chip
                                size="small"
                                label={`${order.orderType}${order.dataTypeOrder ? ` / ${order.dataTypeOrder}` : ""}`}
                                color={config.color as any}
                                icon={React.cloneElement(config.icon, { fontSize: "small" })}
                                sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem", borderRadius: "16px" }}
                            />
                        </TableCell>
                        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                            <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                                {totalItems} items
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                                ${total.toFixed(2)}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                            <Typography variant="body2" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                                {formattedTime}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                            <Tooltip title={commentsOrderGeneral || "Sin comentarios"} arrow>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ maxWidth: "150px", fontSize: isMobile ? "0.75rem" : "0.875rem" }}
                                >
                                    {commentsOrderGeneral || "-"}
                                </Typography>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            {isMobile ? (
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleOpenActionMenu(e, order)
                                    }}
                                    sx={{
                                        transition: "all 0.2s ease-in-out",
                                        "&:active": {
                                            transform: "scale(0.95)",
                                        },
                                    }}
                                >
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        minWidth: "120px",
                                        "& .MuiIconButton-root": {
                                            mx: 0,
                                        },
                                        justifyContent: "center", // Center the action buttons
                                    }}
                                >
                                    {config.actions.map((action: any, idx: number) => (
                                        <Tooltip key={`${action.action}-${idx}`} title={action.label}>
                                            <IconButton
                                                size="small"
                                                color={action.color as any}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleOrderAction(action.action, order)
                                                }}
                                                disabled={isUpdating}
                                            >
                                                {React.cloneElement(action.icon, { fontSize: "small" })}
                                            </IconButton>
                                        </Tooltip>
                                    ))}
                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleOpenEditModal(order)
                                            }}
                                            disabled={isUpdating}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            )}
                        </TableCell>
                    </TableRow>

                    {/* Expanded details row */}
                    <TableRow>
                        <TableCell style={{ padding: 0 }} colSpan={8}>
                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                <Box
                                    sx={{
                                        p: { xs: 1.5, sm: 3 },
                                        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{ fontWeight: 600, fontSize: isMobile ? "0.875rem" : "1rem" }}
                                    >
                                        Detalles de la Orden
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
                                                Productos:
                                            </Typography>
                                            <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
                                                <List dense disablePadding>
                                                    {order.cart.map((item: any, index: number) => (
                                                        <React.Fragment key={`${item.id}-${index}`}>
                                                            <ListItem disablePadding sx={{ py: 0.75 }}>
                                                                <ListItemText
                                                                    primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                                    secondaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                                    primary={
                                                                        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                                                            <Box sx={{ flex: 1, mr: 1 }}>
                                                                                <Typography component="span" variant="inherit">
                                                                                    <strong>{item.quantity}x</strong> {item.name}
                                                                                </Typography>
                                                                                {item.Description && (
                                                                                    <Typography
                                                                                        variant="inherit"
                                                                                        display="block"
                                                                                        sx={{ mt: 0.5, color: "text.secondary" }}
                                                                                    >
                                                                                        {item.Description}
                                                                                    </Typography>
                                                                                )}
                                                                            </Box>
                                                                            <Typography component="span" variant="inherit">
                                                                                ${(item.price * item.quantity).toFixed(2)}
                                                                            </Typography>
                                                                        </Box>
                                                                    }
                                                                    secondary={
                                                                        <div>
                                                                            {item.extras?.length > 0 && (
                                                                                <List dense disablePadding sx={{ ml: isMobile ? 1 : 2, mt: 0.5 }}>
                                                                                    {item?.extras?.map((extra: any, idx: number) => (
                                                                                        <ListItem key={`${item.id}-extra-${idx}`} disablePadding sx={{ py: 0.25 }}>
                                                                                            <ListItemText
                                                                                                primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                                                                primary={
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            display: "flex",
                                                                                                            justifyContent: "space-between",
                                                                                                            alignItems: "center",
                                                                                                        }}
                                                                                                    >
                                                                                                        <Typography variant="inherit">+ {extra.name}</Typography>
                                                                                                        <Typography variant="inherit">${extra.price.toFixed(2)}</Typography>
                                                                                                    </Box>
                                                                                                }
                                                                                            />
                                                                                        </ListItem>
                                                                                    ))}
                                                                                </List>
                                                                            )}
                                                                            {item?.comments && (
                                                                                <Box sx={{ mt: 1 }}>
                                                                                    <Typography variant="inherit">
                                                                                        <strong>Comentarios:</strong> {item?.comments || "Sin comentarios"}
                                                                                    </Typography>
                                                                                </Box>
                                                                            )}
                                                                        </div>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            {index < order.cart.length - 1 && <Divider sx={{ my: 0.5 }} />}
                                                        </React.Fragment>
                                                    ))}
                                                </List>
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
                                                Información Adicional:
                                            </Typography>
                                            <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper" }}>
                                                <List dense disablePadding>
                                                    <ListItem disablePadding sx={{ py: 0.75 }}>
                                                        <ListItemText
                                                            primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                            primary={
                                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                    <Typography variant="inherit">
                                                                        <strong>Estado:</strong>
                                                                    </Typography>
                                                                    <Chip
                                                                        size="small"
                                                                        label={config.label}
                                                                        color={config.color as any}
                                                                        icon={React.cloneElement(config.icon, { fontSize: "small" })}
                                                                        sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem", borderRadius: "16px" }}
                                                                    />
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider sx={{ my: 0.5 }} />

                                                    <ListItem disablePadding sx={{ py: 0.75 }}>
                                                        <ListItemText
                                                            primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                            primary={
                                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <Typography variant="inherit">
                                                                        <strong>Total:</strong>
                                                                    </Typography>
                                                                    <Typography variant="inherit" fontWeight="bold">
                                                                        ${total.toFixed(2)}
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider sx={{ my: 0.5 }} />

                                                    {commentsOrderGeneral && (
                                                        <>
                                                            <ListItem disablePadding sx={{ py: 0.75 }}>
                                                                <ListItemText
                                                                    primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                                    primary={
                                                                        <Box>
                                                                            <Typography variant="inherit">
                                                                                <strong>Comentarios:</strong>
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="inherit"
                                                                                sx={{
                                                                                    mt: 0.5,
                                                                                    p: 1,
                                                                                    borderRadius: 1,
                                                                                    backgroundColor:
                                                                                        theme.palette.mode === "dark"
                                                                                            ? "rgba(255,255,255,0.05)"
                                                                                            : "rgba(0,0,0,0.03)",
                                                                                }}
                                                                            >
                                                                                {commentsOrderGeneral}
                                                                            </Typography>
                                                                        </Box>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            <Divider sx={{ my: 0.5 }} />
                                                        </>
                                                    )}

                                                    <ListItem disablePadding sx={{ py: 0.75 }}>
                                                        <ListItemText
                                                            primaryTypographyProps={{ variant: isMobile ? "caption" : "body2" }}
                                                            primary={
                                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <Typography variant="inherit">
                                                                        <strong>Hora:</strong>
                                                                    </Typography>
                                                                    <Typography variant="inherit">{formattedTime}</Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </ListItem>
                                                </List>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            )
        },
    )

    // Custom Pagination Controls
    const PaginationControls = () => (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
                pb: 2,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : 0,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                    Órdenes por página:
                </Typography>
                <FormControl size="small" variant="outlined">
                    <Select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        sx={{
                            height: "36px",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                            borderRadius: "8px",
                            minWidth: "70px",
                        }}
                    >
                        {pageSizeOptions.map((size) => (
                            <MenuItem key={size} value={size} sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Pagination
                count={pageCount}
                page={currentPages[activeStatus]}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? "small" : "medium"}
                showFirstButton={!isMobile}
                showLastButton={!isMobile}
                siblingCount={isMobile ? 0 : 1}
                boundaryCount={isMobile ? 1 : 2}
                sx={{
                    "& .MuiPaginationItem-root": {
                        borderRadius: "8px",
                    },
                }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                Mostrando {filteredOrders.length > 0 ? (currentPages[activeStatus] - 1) * pageSize + 1 : 0}-
                {Math.min(currentPages[activeStatus] * pageSize, filteredOrders.length)} de {filteredOrders.length} órdenes
            </Typography>
        </Box>
    )

    return (
        <Box
            sx={{
                height: "100vh",
                overflow: "hidden",
                bgcolor: theme.palette.background.default,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Custom AppBar */}
            <AppBar
                position="sticky"
                elevation={3}
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Toolbar
                    variant="dense"
                    sx={{
                        minHeight: isMobile ? 48 : 56,
                        flexDirection: isMobile ? "column" : "row",
                        py: isMobile ? 1 : 0,
                        px: isMobile ? 1 : 2,
                        justifyContent: "space-between", // Better spacing
                    }}
                >
                    {/* Logo and Title */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            flexGrow: 1,
                            height: "40px",
                            position: "relative",
                            overflow: "hidden",
                            width: isMobile ? "100%" : "auto",
                            justifyContent: isMobile ? "center" : "flex-start", // Center on mobile
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                flexShrink: 0,
                                ml: 0.5,
                                bgcolor: theme.palette.primary.main,
                            }}
                        >
                            <Image
                                src={"/images/flama.png"}
                                alt={"LlakaScript"}
                                width={32}
                                height={32}
                                priority
                                style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Avatar>

                        <Box
                            sx={{
                                position: "relative",
                                width: "auto",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                variant={isMobile ? "subtitle1" : "h6"}
                                sx={{
                                    fontWeight: 600,
                                    lineHeight: 1.1,
                                    fontSize: isMobile ? "1rem" : undefined,
                                    textAlign: isMobile ? "center" : "left",
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {displayTitle ? "LlakaScript" : "Panel de Órdenes"}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right side controls */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            width: isMobile ? "100%" : "auto",
                            justifyContent: isMobile ? "center" : "flex-end", // Center on mobile
                            mt: isMobile ? 1 : 0,
                        }}
                    >
                        {/* View mode toggle */}
                        <Tooltip title={viewMode === "card" ? "Vista lista" : "Vista tarjetas"}>
                            <IconButton
                                size="small"
                                onClick={toggleViewMode}
                                color="default"
                                sx={{
                                    borderRadius: "8px",
                                    transition: "all 0.2s ease-in-out",
                                    "&:active": {
                                        transform: "scale(0.95)",
                                    },
                                }}
                            >
                                {viewMode === "card" ? (
                                    <ViewListIcon fontSize={isMobile ? "small" : "medium"} />
                                ) : (
                                    <ViewColumnIcon fontSize={isMobile ? "small" : "medium"} />
                                )}
                            </IconButton>
                        </Tooltip>

                        {/* Connection status indicator */}
                        <Tooltip title={isConnected ? "Conectado al servidor" : "Desconectado"}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    bgcolor: isConnected ? "success.main" : "error.main",
                                    mr: 1,
                                }}
                            />
                        </Tooltip>

                        {/* Order count badge */}
                        {isMobile && totalOrders > 0 && (
                            <Badge
                                badgeContent={totalOrders}
                                color="primary"
                                sx={{
                                    mr: 0.5,
                                    "& .MuiBadge-badge": {
                                        fontSize: "0.7rem",
                                        height: "18px",
                                        minWidth: "18px",
                                    },
                                }}
                            >
                                <Box sx={{ width: 4, height: 4 }} />
                            </Badge>
                        )}

                        {/* Last refresh time - hidden on mobile */}
                        {lastRefresh && !isMobile && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "0.75rem",
                                    bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: "4px",
                                }}
                            >
                                Actualizado: {lastRefresh.toLocaleTimeString()}
                            </Typography>
                        )}

                        {/* Refresh button */}
                        <Tooltip title="Actualizar">
                            <IconButton
                                color="primary"
                                size="small"
                                onClick={fetchHistoricalOrders}
                                disabled={isLoading || isUpdating}
                                sx={{
                                    borderRadius: "8px",
                                }}
                            >
                                <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                        </Tooltip>

                        {/* Header collapse toggle (mobile only) */}
                        {isMobile && (
                            <IconButton
                                size="small"
                                onClick={toggleHeader}
                                sx={{
                                    borderRadius: "8px",
                                }}
                            >
                                {headerCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
                            </IconButton>
                        )}

                        <Tooltip title="Salir">
                            <IconButton
                                size="small"
                                onClick={handleLogout}
                                color="default"
                                sx={{
                                    borderRadius: "8px",
                                }}
                            >
                                <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flex: 1,
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Container maxWidth="xl" sx={{ height: "100%", py: { xs: 1, sm: 2 } }}>
                    <Paper
                        elevation={isMobile ? 1 : 3}
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            borderRadius: { xs: 2, sm: 3 },
                            mx: "auto", // Center the paper
                            width: "100%",
                            position: "relative",
                            "&:before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "4px",
                                backgroundColor: theme.palette.primary.main,
                                zIndex: 1,
                                borderTopLeftRadius: { xs: "8px", sm: "12px" },
                                borderTopRightRadius: { xs: "8px", sm: "12px" },
                            },
                        }}
                    >
                        {/* Status header - collapsible on mobile */}
                        <Collapse in={!headerCollapsed} timeout="auto">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderBottom: "1px solid",
                                    borderColor: theme.palette.divider,
                                    overflow: "hidden",
                                    p: { xs: 1.5, sm: 2 },
                                    pt: { xs: 2, sm: 3 },
                                }}
                            >
                                {/* Search bar */}
                                <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto", mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        size={isMobile ? "small" : "medium"}
                                        variant="outlined"
                                        placeholder="Buscar órdenes..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize={isMobile ? "small" : "medium"} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: searchQuery && (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={clearSearch} size="small">
                                                        <ClearIcon fontSize={isMobile ? "small" : "medium"} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                borderRadius: "12px",
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Status tabs */}
                                <Box sx={{ width: "100%", overflow: "auto", display: "flex", justifyContent: "center" }}>
                                    <Tabs
                                        value={activeStatus}
                                        onChange={handleStatusChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        allowScrollButtonsMobile
                                        sx={{
                                            minHeight: isMobile ? 40 : 48,
                                            "& .MuiTab-root": {
                                                minHeight: isMobile ? 40 : 48,
                                                py: 0,
                                                fontSize: isMobile ? "0.7rem" : "0.8rem",
                                                px: isMobile ? 0.5 : 1.5,
                                                borderRadius: "20px",
                                                mx: 0.5,
                                                "&.Mui-selected": {
                                                    backgroundColor:
                                                        theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                                },
                                            },
                                            "& .MuiTabs-indicator": {
                                                height: 3,
                                                borderRadius: "3px 3px 0 0",
                                            },
                                        }}
                                    >
                                        <Tab label="Todas" value="all" />
                                        {statusOptions.map((status) => (
                                            <Tab
                                                key={status}
                                                label={statusConfig[status as keyof typeof statusConfig].label}
                                                value={status}
                                                icon={React.cloneElement(statusConfig[status as keyof typeof statusConfig].icon, {
                                                    fontSize: isMobile ? "small" : "medium",
                                                })}
                                                iconPosition="start"
                                            />
                                        ))}
                                    </Tabs>
                                </Box>

                                {/* Status indicators */}
                                {(isLoading || isUpdating) && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            p: 1.5,
                                            mt: 2,
                                            mx: "auto",
                                            maxWidth: "400px",
                                            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                            borderRadius: 2,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CircularProgress size={16} color="primary" />
                                        <Typography variant="body2" fontSize={{ xs: "0.75rem", sm: "0.875rem" }}>
                                            {isUpdating ? "Actualizando orden..." : "Cargando órdenes..."}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Collapse>

                        {/* Error messages */}
                        <Box
                            sx={{
                                px: { xs: 1.5, sm: 2 },
                                pt: { xs: 1.5, sm: 2 },
                                overflow: "auto",
                                flexShrink: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center", // Center alerts
                            }}
                        >
                            {error && (
                                <Alert
                                    severity="error"
                                    onClose={() => clearMessages()}
                                    sx={{
                                        mb: 1.5,
                                        maxWidth: "600px",
                                        width: "100%",
                                        borderRadius: 2,
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            {successMessage && (
                                <Alert
                                    severity="success"
                                    onClose={() => clearMessages()}
                                    sx={{
                                        mb: 1.5,
                                        maxWidth: "600px",
                                        width: "100%",
                                        borderRadius: 2,
                                    }}
                                >
                                    {successMessage}
                                </Alert>
                            )}
                        </Box>

                        {/* Main content - takes all available space */}
                        <Box
                            sx={{
                                flex: 1,
                                overflow: "auto",
                                display: "flex",
                                flexDirection: "column",
                                p: { xs: 1.5, sm: 2 },
                            }}
                        >
                            <PendingOrdersDialog open={openPendingDialog} onClose={() => setOpenPendingDialog(false)} />

                            {/* Orders list */}
                            <Box sx={{ flex: 1, maxWidth: viewMode === "list" ? "100%" : "1200px", mx: "auto", width: "100%" }}>
                                {filteredOrders.length === 0 ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "200px",
                                            flexDirection: "column",
                                            gap: 2,
                                            my: 4,
                                            p: 3,
                                            borderRadius: 3,
                                            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                        }}
                                    >
                                        <Typography variant="h6" color="text.secondary" sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
                                            No se encontraron órdenes
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size={isMobile ? "small" : "medium"}
                                            onClick={() => {
                                                setSearchQuery("")
                                                setActiveStatus("all")
                                            }}
                                            sx={{
                                                borderRadius: "8px",
                                                px: 3,
                                            }}
                                        >
                                            Limpiar filtros
                                        </Button>
                                    </Box>
                                ) : viewMode === "card" ? (
                                    <>
                                        <Grid container spacing={isMobile ? 1.5 : 2.5} justifyContent="center">
                                            {paginatedOrders?.map((order: any) => (
                                                <Grid item xs={12} sm={isTablet ? 12 : 6} lg={4} key={order._id || order.id}>
                                                    <OrderCard order={order} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <PaginationControls />
                                    </>
                                ) : (
                                    <>
                                        <TableContainer
                                            component={Paper}
                                            elevation={2}
                                            sx={{
                                                position: "relative",
                                                overflow: "auto",
                                                maxWidth: "100%",
                                                borderRadius: 3,
                                                "&:before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: "4px",
                                                    backgroundColor: theme.palette.primary.main,
                                                    zIndex: 1,
                                                    borderTopLeftRadius: "12px",
                                                    borderTopRightRadius: "12px",
                                                },
                                            }}
                                        >
                                            <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 450 : 650 }}>
                                                <TableHead>
                                                    <TableRow
                                                        sx={{
                                                            backgroundColor:
                                                                theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                                        }}
                                                    >
                                                        <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
                                                            ID
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
                                                            Cliente
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                display: { xs: "none", sm: "table-cell" },
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Estado
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                display: { xs: "none", md: "table-cell" },
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Items
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: isMobile ? "0.75rem" : "0.875rem", fontWeight: "bold" }}>
                                                            Total
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                display: { xs: "none", md: "table-cell" },
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Hora
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                display: { xs: "none", lg: "table-cell" },
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Comentario General
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                                fontWeight: "bold",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            Acciones
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {paginatedOrders.map((order: any) => (
                                                        <OrderRow
                                                            key={order._id || order.id}
                                                            order={order}
                                                            expandedRows={expandedRows}
                                                            onToggleExpand={handleToggleExpand}
                                                        />
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <PaginationControls />
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Container>

                {/* Scroll to top button */}
                <Zoom in={trigger}>
                    <Box
                        onClick={scrollToTop}
                        role="presentation"
                        sx={{
                            position: "fixed",
                            bottom: 16,
                            right: 16,
                            zIndex: 1000,
                        }}
                    >
                        <Fab
                            color="primary"
                            size="small"
                            aria-label="scroll back to top"
                            sx={{
                                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            }}
                        >
                            <KeyboardArrowUp />
                        </Fab>
                    </Box>
                </Zoom>
            </Box>

            {/* Action Menu */}
            <Menu
                anchorEl={actionMenuAnchorEl}
                open={Boolean(actionMenuAnchorEl)}
                onClose={handleCloseActionMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        minWidth: 180,
                        borderRadius: "12px",
                        overflow: "hidden",
                        maxHeight: "80vh", // Limit height on mobile
                        overflowY: "auto", // Make scrollable if needed
                        mt: 1, // Add margin to prevent overlap with button
                    },
                }}
                // Ensure menu is properly positioned on mobile
                slotProps={{
                    root: {
                        sx: {
                            zIndex: 1500, // Higher z-index to ensure visibility
                        },
                    },
                }}
            >
                {actionMenuOrder &&
                    statusConfig[actionMenuOrder.status as keyof typeof statusConfig].actions.map((action: any) => (
                        <MenuItem
                            key={action.action}
                            onClick={() => handleActionMenuItemClick(action.action)}
                            sx={{
                                color:
                                    (theme.palette[action.color as keyof typeof theme.palette] as PaletteColor)?.main ??
                                    theme.palette.text.primary,
                                fontSize: "0.875rem",
                                py: 1.5,
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
                                {React.cloneElement(action.icon, { fontSize: "small" })}
                            </ListItemIcon>
                            {action.label}
                        </MenuItem>
                    ))}
                <MenuItem
                    onClick={() => handleActionMenuItemClick("edit")}
                    sx={{
                        fontSize: "0.875rem",
                        py: 1.5,
                    }}
                >
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Editar
                </MenuItem>
            </Menu>

            {/* Edit Order Modal */}
            {isEditModalOpen && selectedOrder && (
                <EditOrderModal
                    open={isEditModalOpen}
                    order={selectedOrder}
                    onSave={saveUpdateData}
                    menuData={{
                        mainMenu: hojas?.Hoja1 || [],
                        promotions: hojas?.Promotion || [],
                    }}
                    onClose={handleCloseEditModal}
                //   fullScreen={isMobile} 
                //   maxWidth="md" /
                />
            )}
        </Box>
    )
}

export default OrderSpeedGeneric
