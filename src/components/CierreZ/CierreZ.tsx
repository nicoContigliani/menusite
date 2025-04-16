// "use client"
// import React, { useEffect, useState } from "react"
// import {
//     Typography,
//     Box,
//     Button,
//     MenuItem,
//     TextField,
//     Paper,
//     Grid,
//     IconButton,
//     CircularProgress,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Tabs,
//     Tab,
//     Chip,
//     Divider,
//     Snackbar,
//     Alert,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Collapse,
//     List,
//     ListItem,
//     ListItemText,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
// } from "@mui/material"
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import dayjs, { type Dayjs } from "dayjs"
// import "dayjs/locale/es"

// // Icons
// import {
//     Close as CloseIcon,
//     Refresh as RefreshIcon,
//     Event as EventIcon,
//     DateRange as DateRangeIcon,
//     Update as UpdateIcon,
//     Add as AddIcon,
//     ExpandMore as ExpandMoreIcon,
//     ExpandLess as ExpandLessIcon,
//     Receipt as ReceiptIcon,
//     AttachMoney as AttachMoneyIcon,
//     CreditCard as CreditCardIcon,
//     AccountBalance as AccountBalanceIcon,
//     MoreHoriz as MoreHorizIcon,
//     Restaurant as RestaurantIcon,
//     Person as PersonIcon,
//     PointOfSale as PointOfSaleIcon,
//     ShoppingBasket as ShoppingBasketIcon,
//     MonetizationOn as MonetizationOnIcon,
//     Schedule as ScheduleIcon,
//     Notes as NotesIcon,
// } from "@mui/icons-material"

// interface PaymentMethodDetail {
//     method: string
//     amount: number
//     received: number
//     change: number
// }

// interface CartItem {
//     id: string
//     itemId: number
//     name: string
//     price: number
//     quantity: number
//     extras: Array<{
//         name: string
//         price: number
//     }>
//     extrasTotal: number
//     Description: string
// }

// interface Payment {
//     _id: { $oid: string }
//     orderId: string
//     orderGeneral: {
//         _id: string
//         id: string
//         orderType: string
//         dataTypeOrder: string
//         cart: CartItem[]
//         comments: string
//         companiesName: string
//         companiesID: string
//         email: string
//         fullname: string
//         phone: string
//         channel: string
//         name: string
//         timestamp: string
//         status: string
//         createdAt: string
//         updatedAt: string
//         version: { $numberInt: string }
//     }
//     waiter: string
//     cashier: string
//     payment: {
//         total: number
//         paid: number
//         methods: PaymentMethodDetail[]
//     }
//     status: string
//     companyName: string
//     companyId: { $oid: string }
//     createdAt: { $date: { $numberLong: string } }
//     updatedAt: { $date: { $numberLong: string } }
//     version: { $numberInt: string }
// }

// interface ClosingSale {
//     _id: { $oid: string }
//     turno_id: string
//     date_time: { $date: { $numberLong: string } }
//     closing_date: { $date: { $numberLong: string } }
//     total_sales: { $numberDouble: string } | { $numberInt: string }
//     total_cash: { $numberDouble?: string; $numberInt?: string }
//     total_card: { $numberDouble?: string; $numberInt?: string }
//     total_transfer: { $numberDouble?: string; $numberInt?: string }
//     total_other: { $numberDouble?: string; $numberInt?: string }
//     transaction_count: { $numberInt: string }
//     payment_ids: Array<{ $oid: string }>
//     companyId: { $oid: string }
//     complete_closing: boolean
//     version: { $numberInt: string }
//     fiscal_hash?: string
//     payments?: Payment[]
// }

// const parseMongoNumber = (value: any): number => {
//     if (!value) return 0
//     if (typeof value === "number") return value
//     if (value.$numberDouble) return parseFloat(value.$numberDouble)
//     if (value.$numberInt) return parseInt(value.$numberInt)
//     return 0
// }

// const parseMongoDate = (dateObj: any): string => {
//     if (!dateObj) return ""
//     if (typeof dateObj === "string") return dateObj
//     if (dateObj.$date?.$numberLong) {
//         return new Date(parseInt(dateObj.$date.$numberLong)).toISOString()
//     }
//     return ""
// }

// const formatCurrency = (amount: number | string | any): string => {
//     const numAmount = typeof amount === "number" ? amount : parseMongoNumber(amount)
//     return new Intl.NumberFormat("es-ES", {
//         style: "currency",
//         currency: "EUR",
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//     }).format(numAmount)
// }

// const getMongoId = (idObj: any): string => {
//     if (!idObj) return ""
//     if (typeof idObj === "string") return idObj
//     if (idObj.$oid) return idObj.$oid
//     return ""
// }

// const PaymentDetailsCard = ({ payment }: { payment?: Payment }) => {
//     if (!payment) return <CircularProgress size={24} />

//     return (
//         <Paper elevation={2} sx={{ p: 2, mb: 2, borderLeft: "4px solid", borderColor: "primary.main" }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Box display="flex" alignItems="center">
//                     <ReceiptIcon color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="h6" component="div">
//                         Orden #{payment.orderId}
//                         <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
//                             {payment.orderGeneral.orderType} - {payment.orderGeneral.dataTypeOrder}
//                         </Typography>
//                     </Typography>
//                 </Box>
//                 <Chip
//                     label={payment.status}
//                     color={payment.status === "completed" ? "success" : "warning"}
//                     size="small"
//                 />
//             </Box>

//             <Grid container spacing={2} sx={{ mb: 2 }}>
//                 <Grid item xs={12} md={6}>
//                     <Box display="flex" alignItems="center" mb={1}>
//                         <PersonIcon color="action" sx={{ mr: 1 }} />
//                         <Typography variant="body2">
//                             <strong>Waiter:</strong> {payment.waiter}
//                         </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" mb={1}>
//                         <PointOfSaleIcon color="action" sx={{ mr: 1 }} />
//                         <Typography variant="body2">
//                             <strong>Cashier:</strong> {payment.cashier}
//                         </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center">
//                         <ScheduleIcon color="action" sx={{ mr: 1 }} />
//                         <Typography variant="body2">
//                             <strong>Date:</strong> {dayjs(parseMongoDate(payment.createdAt)).format("DD/MM/YYYY HH:mm")}
//                         </Typography>
//                     </Box>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ p: 2, backgroundColor: "grey.50" }}>
//                         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
//                             <MonetizationOnIcon color="primary" sx={{ mr: 1, verticalAlign: "bottom" }} />
//                             Pay Resum
//                         </Typography>
//                         {payment.payment.methods.map((method, idx) => (
//                             <Box
//                                 key={idx}
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 mb={1}
//                                 sx={{ "&:last-child": { mb: 0 } }}
//                             >
//                                 <Typography variant="body2">
//                                     {method.method === "cash"
//                                         ? "Efectivo"
//                                         : method.method === "card"
//                                             ? "Tarjeta"
//                                             : "Otro método"}
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight="medium">
//                                     {formatCurrency(method.amount)}
//                                 </Typography>
//                             </Box>
//                         ))}
//                         <Divider sx={{ my: 1 }} />
//                         <Box display="flex" justifyContent="space-between">
//                             <Typography variant="body1" fontWeight="bold">
//                                 Total:
//                             </Typography>
//                             <Typography variant="body1" fontWeight="bold">
//                                 {formatCurrency(payment.payment.total)}
//                             </Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>

//             <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
//                 <ShoppingBasketIcon color="primary" sx={{ mr: 1, verticalAlign: "bottom" }} />
//                 Order Details
//             </Typography>

//             <TableContainer component={Paper} elevation={0} sx={{ mb: 2 }}>
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "grey.100" }}>
//                             <TableCell>Product</TableCell>
//                             <TableCell align="right">Price Unit.</TableCell>
//                             <TableCell align="right">amount</TableCell>
//                             <TableCell align="right">Total</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {payment.orderGeneral.cart.map((item, idx) => (
//                             <React.Fragment key={idx}>
//                                 <TableRow>
//                                     <TableCell>
//                                         <Typography fontWeight="medium">{item.name}</Typography>
//                                         <Typography variant="caption" color="text.secondary">
//                                             {item.Description}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell align="right">{formatCurrency(item.price)}</TableCell>
//                                     <TableCell align="right">{item.quantity}</TableCell>
//                                     <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
//                                 </TableRow>
//                                 {item.extras.map((extra, extraIdx) => (
//                                     <TableRow key={`extra-${extraIdx}`} sx={{ backgroundColor: "grey.50" }}>
//                                         <TableCell sx={{ pl: 4 }}>
//                                             <Typography variant="caption">+ {extra.name}</Typography>
//                                         </TableCell>
//                                         <TableCell align="right">{formatCurrency(extra.price)}</TableCell>
//                                         <TableCell align="right">1</TableCell>
//                                         <TableCell align="right">{formatCurrency(extra.price)}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </React.Fragment>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {payment.orderGeneral.comments && (
//                 <Box sx={{ mt: 1 }}>
//                     <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center" }}>
//                         <NotesIcon color="action" sx={{ mr: 1 }} />
//                         Comentarios:
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
//                         {payment.orderGeneral.comments}
//                     </Typography>
//                 </Box>
//             )}
//         </Paper>
//     )
// }

// const CierreZPage = ({ companyId }: { companyId: string }) => {
//     const [loading, setLoading] = useState(true)
//     const [closingData, setClosingData] = useState<ClosingSale[]>([])
//     const [loadingClosings, setLoadingClosings] = useState(false)
//     const [searchMode, setSearchMode] = useState<"day" | "range" | "latest">("latest")
//     const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
//     const [startDate, setStartDate] = useState<Dayjs>(dayjs())
//     const [endDate, setEndDate] = useState<Dayjs>(dayjs())
//     const [openDialog, setOpenDialog] = useState(false)
//     const [openCreateDialog, setOpenCreateDialog] = useState(false)
//     const [activeTab, setActiveTab] = useState(0)
//     const [expandedClosing, setExpandedClosing] = useState<string | null>(null)
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success" as "success" | "error" | "warning" | "info",
//     })
//     const [paymentDetails, setPaymentDetails] = useState<Record<string, Payment>>({})

//     const fetchPaymentDetails = async (paymentId: string) => {
//         try {
//             const response = await fetch(
//                 `/api/payments?id=${paymentId}&companyId=${companyId}`
//             )

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({}))
//                 throw new Error(errorData.error || "Error fetching payment details")
//             }

//             const data = await response.json()

//             if (!data) {
//                 throw new Error("No payment data received")
//             }

//             setPaymentDetails((prev) => ({
//                 ...prev,
//                 [paymentId]: data,
//             }))
//         } catch (error) {
//             console.error("Error fetching payment details:", error)
//             setSnackbar({
//                 open: true,
//                 message: error instanceof Error ? error.message : "Error al cargar detalles del pago",
//                 severity: "error",
//             })
//         }
//     }

//     const fetchClosingSales = async () => {
//         if (!companyId) return

//         setLoadingClosings(true)
//         try {
//             let url = `/api/closingsales?companyId=${companyId}&includeDetails=true`

//             if (searchMode === "day") {
//                 const dateStr = selectedDate.format("YYYY-MM-DD")
//                 url += `&fecha=${dateStr}`
//             } else if (searchMode === "range") {
//                 const startStr = startDate.format("YYYY-MM-DD")
//                 const endStr = endDate.format("YYYY-MM-DD")
//                 url += `&startDate=${startStr}&endDate=${endStr}`
//             } else if (searchMode === "latest") {
//                 url += "&latest=true"
//             }

//             const response = await fetch(url)
//             if (!response.ok) throw new Error("Error fetching closing sales")
//             const data = await response.json()

//             const closings = Array.isArray(data) ? data : [data]
//             setClosingData(closings)

//             // Precargar detalles de pagos
//             closings.forEach((closing) => {
//                 closing.payment_ids?.forEach((paymentId: any) => {
//                     const id = getMongoId(paymentId)
//                     if (!paymentDetails[id]) {
//                         fetchPaymentDetails(id)
//                     }
//                 })
//             })
//         } catch (error) {
//             console.error("Error fetching closing sales:", error)
//             setSnackbar({
//                 open: true,
//                 message: "Error al cargar los cierres Z",
//                 severity: "error",
//             })
//         } finally {
//             setLoadingClosings(false)
//             setLoading(false)
//         }
//     }

//     const createClosingSale = async (turno_id: string) => {
//         if (!companyId) return

//         setLoadingClosings(true)
//         try {
//             const response = await fetch("/api/closingsales", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     turno_id,
//                     companyId,
//                 }),
//             })

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({}))
//                 throw new Error(errorData.error || "Error al crear el cierre Z")
//             }

//             await fetchClosingSales()
//             setSnackbar({
//                 open: true,
//                 message: `Cierre Z para turno ${turno_id} creado exitosamente`,
//                 severity: "success",
//             })
//             setOpenCreateDialog(false)
//         } catch (error) {
//             console.error("Error creando el cierre Z:", error)
//             setSnackbar({
//                 open: true,
//                 message: error instanceof Error ? error.message : "Error desconocido al crear el cierre Z",
//                 severity: "error",
//             })
//         } finally {
//             setLoadingClosings(false)
//         }
//     }

//     useEffect(() => {
//         if (searchMode === "latest" && companyId) {
//             fetchClosingSales()
//         }
//     }, [searchMode, companyId])

//     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//         setActiveTab(newValue)
//     }

//     const toggleExpandClosing = (id: string) => {
//         setExpandedClosing(expandedClosing === id ? null : id)
//     }

//     const renderClosingSummary = (closing: ClosingSale) => (
//         <Paper
//             elevation={3}
//             sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 borderLeft: "4px solid",
//                 borderColor: closing.turno_id === "mañana" ? "primary.main" : "secondary.main",
//             }}
//         >
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6" fontWeight="medium">
//                     {dayjs(parseMongoDate(closing.closing_date)).format("dddd, D [de] MMMM [de] YYYY")}
//                 </Typography>
//                 <Chip
//                     label={closing.turno_id}
//                     color={closing.turno_id === "mañana" ? "primary" : "secondary"}
//                     size="small"
//                 />
//             </Box>

//             <Box sx={{ mb: 2, flexGrow: 1 }}>
//                 <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//                     Resums sales
//                 </Typography>

//                 <Box
//                     sx={{
//                         backgroundColor: "primary.light",
//                         p: 2,
//                         borderRadius: 1,
//                         mb: 2,
//                     }}
//                 >
//                     <Typography variant="body2" color="primary.contrastText">
//                         All Sales
//                     </Typography>
//                     <Typography variant="h4" fontWeight="bold" color="primary.contrastText">
//                         {formatCurrency(closing.total_sales)}
//                     </Typography>
//                 </Box>

//                 <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                         <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <AttachMoneyIcon color="primary" fontSize="small" />
//                                 <Typography variant="body2" color="text.secondary">
//                                     Cash
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body1" fontWeight="medium">
//                                 {formatCurrency(closing.total_cash)}
//                             </Typography>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <CreditCardIcon color="primary" fontSize="small" />
//                                 <Typography variant="body2" color="text.secondary">
//                                     Card
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body1" fontWeight="medium">
//                                 {formatCurrency(closing.total_card)}
//                             </Typography>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <AccountBalanceIcon color="primary" fontSize="small" />
//                                 <Typography variant="body2" color="text.secondary">
//                                     Transfer
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body1" fontWeight="medium">
//                                 {formatCurrency(closing.total_transfer)}
//                             </Typography>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <MoreHorizIcon color="primary" fontSize="small" />
//                                 <Typography variant="body2" color="text.secondary">
//                                     Others
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body1" fontWeight="medium">
//                                 {formatCurrency(closing.total_other)}
//                             </Typography>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Box>

//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mt: "auto",
//                 }}
//             >
//                 <Typography variant="caption" color="text.secondary">
//                     {parseMongoNumber(closing.transaction_count)} transactions
//                 </Typography>
//                 <Chip
//                     label={closing.complete_closing ? "Completo" : "Pendiente"}
//                     size="small"
//                     variant="outlined"
//                     color={closing.complete_closing ? "success" : "warning"}
//                 />
//             </Box>
//         </Paper>
//     )

//     const renderClosingDetails = (closing: ClosingSale) => (
//         <Box p={3}>
//             <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
//                 Summary by Payment Method
//             </Typography>
//             <Grid container spacing={2} sx={{ mb: 4 }}>
//                 {[
//                     { method: "cash", total: closing.total_cash, icon: <AttachMoneyIcon /> },
//                     { method: "card", total: closing.total_card, icon: <CreditCardIcon /> },
//                     { method: "transfer", total: closing.total_transfer, icon: <AccountBalanceIcon /> },
//                     { method: "other", total: closing.total_other, icon: <MoreHorizIcon /> },
//                 ].map((payment, idx) => {
//                     const total = parseMongoNumber(payment.total)
//                     const salesTotal = parseMongoNumber(closing.total_sales)
//                     const percentage = salesTotal > 0 ? Math.round((total / salesTotal) * 100) : 0

//                     return (
//                         <Grid item xs={12} sm={6} md={3} key={idx}>
//                             <Paper elevation={2} sx={{ p: 2 }}>
//                                 <Box display="flex" alignItems="center" gap={1} mb={1}>
//                                     {payment.icon}
//                                     <Typography variant="subtitle2" textTransform="capitalize">
//                                         {payment.method === "cash"
//                                             ? "Cash"
//                                             : payment.method === "card"
//                                                 ? "Card"
//                                                 : payment.method === "transfer"
//                                                     ? "transfer"
//                                                     : "Others"}
//                                     </Typography>
//                                 </Box>
//                                 <Typography variant="h6" fontWeight="bold">
//                                     {formatCurrency(payment.total)}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary">
//                                     {percentage}% of the total
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     )
//                 })}
//             </Grid>

//             <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
//                 Transaction details ({parseMongoNumber(closing.transaction_count)})
//             </Typography>

//             {closing.payment_ids?.length ? (
//                 closing.payment_ids.map((paymentId) => {
//                     const paymentIdStr = getMongoId(paymentId)
//                     const payment = paymentDetails[paymentIdStr]
//                     return (
//                         <Accordion key={paymentIdStr} elevation={2} sx={{ mb: 2 }}>
//                             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                                 <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" pr={2}>
//                                     <Box display="flex" alignItems="center">
//                                         <ReceiptIcon color="primary" sx={{ mr: 1 }} />
//                                         <Typography>
//                                             Order #{payment?.orderId || paymentIdStr.slice(-6)}
//                                         </Typography>
//                                     </Box>
//                                     <Typography fontWeight="medium">
//                                         {payment ? formatCurrency(payment.payment.total) : "Cargando..."}
//                                     </Typography>
//                                 </Box>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 {payment ? (
//                                     <PaymentDetailsCard payment={payment} />
//                                 ) : (
//                                     <Box display="flex" justifyContent="center" py={4}>
//                                         <CircularProgress />
//                                     </Box>
//                                 )}
//                             </AccordionDetails>
//                         </Accordion>
//                     )
//                 })
//             ) : (
//                 <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
//                     <Typography variant="body1" color="text.secondary">
//                         There are no transactions available for this closing.
//                     </Typography>
//                 </Paper>
//             )}
//         </Box>
//     )

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
//             <Box p={3}>
//                 <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
//                     Clousing Sales
//                 </Typography>

//                 <Tabs
//                     value={activeTab}
//                     onChange={(_, newValue) => setActiveTab(newValue)}
//                     sx={{ mb: 3 }}
//                     indicatorColor="primary"
//                     textColor="primary"
//                 >
//                     <Tab label="Resum" />
//                     <Tab label="Detalles" />
//                 </Tabs>

//                 <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
//                     <Button
//                         variant="outlined"
//                         startIcon={<RefreshIcon />}
//                         onClick={() => fetchClosingSales()}
//                         sx={{ textTransform: "none" }}
//                     >
//                         Data Update
//                     </Button>
//                     <Button
//                         variant="contained"
//                         startIcon={<EventIcon />}
//                         onClick={() => setOpenDialog(true)}
//                         sx={{ textTransform: "none" }}
//                     >
//                         Find Clousing Sales
//                     </Button>
//                     <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<AddIcon />}
//                         onClick={() => setOpenCreateDialog(true)}
//                         sx={{ textTransform: "none", ml: "auto" }}
//                     >
//                         Create Clousing Sales
//                     </Button>
//                 </Box>

//                 <Divider sx={{ my: 3 }} />

//                 {loading ? (
//                     <Box display="flex" justifyContent="center" py={4}>
//                         <CircularProgress size={60} />
//                     </Box>
//                 ) : activeTab === 0 ? (
//                     closingData.length > 0 ? (
//                         <Grid container spacing={3}>
//                             {closingData.map((closing, index) => (
//                                 <Grid item xs={12} md={6} lg={4} key={index}>
//                                     {renderClosingSummary(closing)}
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     ) : (
//                         <Paper
//                             elevation={3}
//                             sx={{
//                                 p: 4,
//                                 textAlign: "center",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 gap: 2,
//                             }}
//                         >
//                             <Typography variant="h6" color="text.secondary">
//                                 No se encontraron cierres Z
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                                 {searchMode === "latest"
//                                     ? "No hay cierres recientes disponibles"
//                                     : "No hay cierres para el período seleccionado"}
//                             </Typography>
//                             <Button
//                                 variant="outlined"
//                                 startIcon={<RefreshIcon />}
//                                 onClick={() => fetchClosingSales()}
//                                 sx={{ textTransform: "none" }}
//                             >
//                                 Intentar nuevamente
//                             </Button>
//                         </Paper>
//                     )
//                 ) : closingData.length > 0 ? (
//                     <Box>
//                         {closingData.map((closing, index) => (
//                             <Paper key={index} elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
//                                 <Box
//                                     sx={{
//                                         p: 2,
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         alignItems: "center",
//                                         cursor: "pointer",
//                                         backgroundColor: "primary.light",
//                                         color: "primary.contrastText",
//                                         borderTopLeftRadius: 8,
//                                         borderTopRightRadius: 8,
//                                     }}
//                                     onClick={() => toggleExpandClosing(getMongoId(closing._id))}
//                                 >
//                                     <Box>
//                                         <Typography variant="h6" fontWeight="medium">
//                                             {dayjs(parseMongoDate(closing.closing_date)).format("dddd, D [de] MMMM [de] YYYY")}
//                                         </Typography>
//                                         <Typography variant="subtitle2">
//                                             Turno: {closing.turno_id} | {parseMongoNumber(closing.transaction_count)}{" "}
//                                             transacciones | Total: {formatCurrency(closing.total_sales)}
//                                         </Typography>
//                                     </Box>
//                                     <Box display="flex" alignItems="center" gap={1}>
//                                         {expandedClosing === getMongoId(closing._id) ? (
//                                             <ExpandLessIcon />
//                                         ) : (
//                                             <ExpandMoreIcon />
//                                         )}
//                                     </Box>
//                                 </Box>

//                                 <Collapse in={expandedClosing === getMongoId(closing._id)}>
//                                     {renderClosingDetails(closing)}
//                                 </Collapse>
//                             </Paper>
//                         ))}
//                     </Box>
//                 ) : (
//                     <Paper
//                         elevation={3}
//                         sx={{
//                             p: 4,
//                             textAlign: "center",
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             gap: 2,
//                         }}
//                     >
//                         <Typography variant="h6" color="text.secondary">
//                             No se encontraron cierres Z
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                             {searchMode === "latest"
//                                 ? "No hay cierres recientes disponibles"
//                                 : "No hay cierres para el período seleccionado"}
//                         </Typography>
//                         <Button
//                             variant="outlined"
//                             startIcon={<RefreshIcon />}
//                             onClick={() => fetchClosingSales()}
//                             sx={{ textTransform: "none" }}
//                         >
//                             Intentar nuevamente
//                         </Button>
//                     </Paper>
//                 )}
//             </Box>

//             {/* Search Dialog */}
//             <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle
//                     sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         backgroundColor: "primary.main",
//                         color: "primary.contrastText",
//                     }}
//                 >
//                     <Box component="span">Buscar Cierres Z</Box>
//                     <IconButton onClick={() => setOpenDialog(false)} sx={{ color: "primary.contrastText" }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>

//                 <DialogContent sx={{ pt: 3 }}>
//                     <Box mb={3}>
//                         <TextField
//                             select
//                             fullWidth
//                             label="Modo de búsqueda"
//                             value={searchMode}
//                             onChange={(e) => setSearchMode(e.target.value as "day" | "range" | "latest")}
//                             variant="outlined"
//                             size="small"
//                         >
//                             <MenuItem value="latest">
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <UpdateIcon fontSize="small" /> Clousing sales Last
//                                 </Box>
//                             </MenuItem>
//                             <MenuItem value="day">
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <EventIcon fontSize="small" /> By specific day
//                                 </Box>
//                             </MenuItem>
//                             <MenuItem value="range">
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <DateRangeIcon fontSize="small" /> By date range
//                                 </Box>
//                             </MenuItem>
//                         </TextField>
//                     </Box>

//                     {searchMode === "day" && (
//                         <DatePicker
//                             label="Seleccionar día"
//                             value={selectedDate}
//                             onChange={(newValue) => setSelectedDate(newValue || dayjs())}
//                             slotProps={{
//                                 textField: {
//                                     fullWidth: true,
//                                     size: "small",
//                                 },
//                             }}
//                         />
//                     )}

//                     {searchMode === "range" && (
//                         <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                                 <DatePicker
//                                     label="Start Date"
//                                     value={startDate}
//                                     onChange={(newValue) => setStartDate(newValue || dayjs())}
//                                     slotProps={{
//                                         textField: {
//                                             fullWidth: true,
//                                             size: "small",
//                                         },
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <DatePicker
//                                     label="Finish Date"
//                                     value={endDate}
//                                     onChange={(newValue) => setEndDate(newValue || dayjs())}
//                                     slotProps={{
//                                         textField: {
//                                             fullWidth: true,
//                                             size: "small",
//                                         },
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>
//                     )}
//                 </DialogContent>

//                 <DialogActions sx={{ p: 2 }}>
//                     <Button onClick={() => setOpenDialog(false)} color="secondary" sx={{ textTransform: "none" }}>
//                         Cancelar
//                     </Button>
//                     <Button
//                         onClick={fetchClosingSales}
//                         variant="contained"
//                         color="primary"
//                         startIcon={<RefreshIcon />}
//                         disabled={loadingClosings}
//                         sx={{ textTransform: "none" }}
//                     >
//                         {loadingClosings ? (
//                             <>
//                                 <CircularProgress size={20} sx={{ mr: 1 }} />
//                                 Buscando...
//                             </>
//                         ) : (
//                             "Buscar Cierres"
//                         )}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Create Closing Dialog */}
//             <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="xs" fullWidth>
//                 <DialogTitle
//                     sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         backgroundColor: "primary.main",
//                         color: "primary.contrastText",
//                     }}
//                 >
//                     <Box component="span">Crear Nuevo Cierre Z</Box>
//                     <IconButton onClick={() => setOpenCreateDialog(false)} sx={{ color: "primary.contrastText" }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>

//                 <DialogContent sx={{ pt: 3 }}>
//                     <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
//                         Select the shift for which you want to generate the Z closing:
//                     </Typography>

//                     <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => createClosingSale("mañana")}
//                             disabled={loadingClosings}
//                             sx={{ textTransform: "none", flex: 1 }}
//                         >
//                             Morning
//                         </Button>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             onClick={() => createClosingSale("tarde")}
//                             disabled={loadingClosings}
//                             sx={{ textTransform: "none", flex: 1 }}
//                         >
//                             Afternoon Shift
//                         </Button>
//                     </Box>

//                     <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
//                         Note: The system will include all transactions since the last closing.
//                     </Typography>
//                 </DialogContent>

//                 <DialogActions sx={{ p: 2 }}>
//                     <Button onClick={() => setOpenCreateDialog(false)} color="secondary" sx={{ textTransform: "none" }}>
//                         Cancel
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
//             >
//                 <Alert
//                     onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
//                     severity={snackbar.severity}
//                     sx={{ width: "100%" }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </LocalizationProvider>
//     )
// }

// export default CierreZPage


"use client"
import React, { useEffect, useState } from "react"
import {
    Typography,
    Box,
    Button,
    MenuItem,
    TextField,
    Paper,
    Grid,
    IconButton,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
    Chip,
    Divider,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { type Dayjs } from "dayjs"
import "dayjs/locale/es"
import { motion, AnimatePresence } from "framer-motion"

// Icons
import {
    Close as CloseIcon,
    Refresh as RefreshIcon,
    Event as EventIcon,
    DateRange as DateRangeIcon,
    Update as UpdateIcon,
    Add as AddIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Receipt as ReceiptIcon,
    AttachMoney as AttachMoneyIcon,
    CreditCard as CreditCardIcon,
    AccountBalance as AccountBalanceIcon,
    MoreHoriz as MoreHorizIcon,
    Restaurant as RestaurantIcon,
    Person as PersonIcon,
    PointOfSale as PointOfSaleIcon,
    ShoppingBasket as ShoppingBasketIcon,
    MonetizationOn as MonetizationOnIcon,
    Schedule as ScheduleIcon,
    Notes as NotesIcon,
} from "@mui/icons-material"

interface PaymentMethodDetail {
    method: string
    amount: number
    received: number
    change: number
}

interface CartItem {
    id: string
    itemId: number
    name: string
    price: number
    quantity: number
    extras: Array<{
        name: string
        price: number
    }>
    extrasTotal: number
    Description: string
}

interface Payment {
    _id: { $oid: string }
    orderId: string
    orderGeneral: {
        _id: string
        id: string
        orderType: string
        dataTypeOrder: string
        cart: CartItem[]
        comments: string
        companiesName: string
        companiesID: string
        email: string
        fullname: string
        phone: string
        channel: string
        name: string
        timestamp: string
        status: string
        createdAt: string
        updatedAt: string
        version: { $numberInt: string }
    }
    waiter: string
    cashier: string
    payment: {
        total: number
        paid: number
        methods: PaymentMethodDetail[]
    }
    status: string
    companyName: string
    companyId: { $oid: string }
    createdAt: { $date: { $numberLong: string } }
    updatedAt: { $date: { $numberLong: string } }
    version: { $numberInt: string }
}

interface ClosingSale {
    _id: { $oid: string }
    turno_id: string
    date_time: { $date: { $numberLong: string } }
    closing_date: { $date: { $numberLong: string } }
    total_sales: { $numberDouble: string } | { $numberInt: string }
    total_cash: { $numberDouble?: string; $numberInt?: string }
    total_card: { $numberDouble?: string; $numberInt?: string }
    total_transfer: { $numberDouble?: string; $numberInt?: string }
    total_other: { $numberDouble?: string; $numberInt?: string }
    transaction_count: { $numberInt: string }
    payment_ids: Array<{ $oid: string }>
    companyId: { $oid: string }
    complete_closing: boolean
    version: { $numberInt: string }
    fiscal_hash?: string
    payments?: Payment[]
}

const parseMongoNumber = (value: any): number => {
    if (!value) return 0
    if (typeof value === "number") return value
    if (value.$numberDouble) return parseFloat(value.$numberDouble)
    if (value.$numberInt) return parseInt(value.$numberInt)
    return 0
}

const parseMongoDate = (dateObj: any): string => {
    if (!dateObj) return ""
    if (typeof dateObj === "string") return dateObj
    if (dateObj.$date?.$numberLong) {
        return new Date(parseInt(dateObj.$date.$numberLong)).toISOString()
    }
    return ""
}

const formatCurrency = (amount: number | string | any): string => {
    const numAmount = typeof amount === "number" ? amount : parseMongoNumber(amount)
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numAmount)
}

const getMongoId = (idObj: any): string => {
    if (!idObj) return ""
    if (typeof idObj === "string") return idObj
    if (idObj.$oid) return idObj.$oid
    return ""
}

const PaymentDetailsCard = ({ payment }: { payment?: Payment }) => {
    if (!payment) return <CircularProgress size={24} />

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper elevation={2} sx={{ p: 2, mb: 2, borderLeft: "4px solid", borderColor: "primary.main" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center">
                        <ReceiptIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="div">
                            Order #{payment.orderId}
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                {payment.orderGeneral.orderType} - {payment.orderGeneral.dataTypeOrder}
                            </Typography>
                        </Typography>
                    </Box>
                    <Chip
                        label={payment.status}
                        color={payment.status === "completed" ? "success" : "warning"}
                        size="small"
                    />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <PersonIcon color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                <strong>Waiter:</strong> {payment.waiter}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <PointOfSaleIcon color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                <strong>Cashier:</strong> {payment.cashier}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <ScheduleIcon color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                <strong>Date:</strong> {dayjs(parseMongoDate(payment.createdAt)).format("DD/MM/YYYY HH:mm")}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: "grey.50" }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                                <MonetizationOnIcon color="primary" sx={{ mr: 1, verticalAlign: "bottom" }} />
                                Payment Summary
                            </Typography>
                            {payment.payment.methods.map((method, idx) => (
                                <Box
                                    key={idx}
                                    display="flex"
                                    justifyContent="space-between"
                                    mb={1}
                                    sx={{ "&:last-child": { mb: 0 } }}
                                >
                                    <Typography variant="body2">
                                        {method.method === "cash"
                                            ? "Cash"
                                            : method.method === "card"
                                                ? "Card"
                                                : "Other method"}
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {formatCurrency(method.amount)}
                                    </Typography>
                                </Box>
                            ))}
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body1" fontWeight="bold">
                                    Total:
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {formatCurrency(payment.payment.total)}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>
                    <ShoppingBasketIcon color="primary" sx={{ mr: 1, verticalAlign: "bottom" }} />
                    Order Details
                </Typography>

                <TableContainer component={Paper} elevation={0} sx={{ mb: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "grey.100" }}>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Unit Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payment.orderGeneral.cart.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="medium">{item.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {item.Description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                    {item.extras.map((extra, extraIdx) => (
                                        <TableRow key={`extra-${extraIdx}`} sx={{ backgroundColor: "grey.50" }}>
                                            <TableCell sx={{ pl: 4 }}>
                                                <Typography variant="caption">+ {extra.name}</Typography>
                                            </TableCell>
                                            <TableCell align="right">{formatCurrency(extra.price)}</TableCell>
                                            <TableCell align="right">1</TableCell>
                                            <TableCell align="right">{formatCurrency(extra.price)}</TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {payment.orderGeneral.comments && (
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center" }}>
                            <NotesIcon color="action" sx={{ mr: 1 }} />
                            Comments:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                            {payment.orderGeneral.comments}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </motion.div>
    )
}

const CierreZPage = ({ companyId }: { companyId: string }) => {
    const [loading, setLoading] = useState(true)
    const [closingData, setClosingData] = useState<ClosingSale[]>([])
    const [loadingClosings, setLoadingClosings] = useState(false)
    const [searchMode, setSearchMode] = useState<"day" | "range" | "latest">("latest")
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
    const [startDate, setStartDate] = useState<Dayjs>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs>(dayjs())
    const [openDialog, setOpenDialog] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [expandedClosing, setExpandedClosing] = useState<string | null>(null)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "warning" | "info",
    })
    const [paymentDetails, setPaymentDetails] = useState<Record<string, Payment>>({})

    const fetchPaymentDetails = async (paymentId: string) => {
        try {
            const response = await fetch(
                `/api/payments?id=${paymentId}&companyId=${companyId}`
            )

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || "Error fetching payment details")
            }

            const data = await response.json()

            if (!data) {
                throw new Error("No payment data received")
            }

            setPaymentDetails((prev) => ({
                ...prev,
                [paymentId]: data,
            }))
        } catch (error) {
            console.error("Error fetching payment details:", error)
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : "Error loading payment details",
                severity: "error",
            })
        }
    }

    const fetchClosingSales = async () => {
        if (!companyId) return

        setLoadingClosings(true)
        try {
            let url = `/api/closingsales?companyId=${companyId}&includeDetails=true`

            if (searchMode === "day") {
                const dateStr = selectedDate.format("YYYY-MM-DD")
                url += `&fecha=${dateStr}`
            } else if (searchMode === "range") {
                const startStr = startDate.format("YYYY-MM-DD")
                const endStr = endDate.format("YYYY-MM-DD")
                url += `&startDate=${startStr}&endDate=${endStr}`
            } else if (searchMode === "latest") {
                url += "&latest=true"
            }

            const response = await fetch(url)
            if (!response.ok) throw new Error("Error fetching closing sales")
            const data = await response.json()

            const closings = Array.isArray(data) ? data : [data]
            setClosingData(closings)

            // Preload payment details
            closings.forEach((closing) => {
                closing.payment_ids?.forEach((paymentId: any) => {
                    const id = getMongoId(paymentId)
                    if (!paymentDetails[id]) {
                        fetchPaymentDetails(id)
                    }
                })
            })
        } catch (error) {
            console.error("Error fetching closing sales:", error)
            setSnackbar({
                open: true,
                message: "Error loading Z closings",
                severity: "error",
            })
        } finally {
            setLoadingClosings(false)
            setLoading(false)
        }
    }

    const createClosingSale = async (turno_id: string) => {
        if (!companyId) return

        setLoadingClosings(true)
        try {
            const response = await fetch("/api/closingsales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    turno_id,
                    companyId,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || "Error creating Z closing")
            }

            await fetchClosingSales()
            setSnackbar({
                open: true,
                message: `Z closing for ${turno_id} shift created successfully`,
                severity: "success",
            })
            setOpenCreateDialog(false)
        } catch (error) {
            console.error("Error creating Z closing:", error)
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : "Unknown error creating Z closing",
                severity: "error",
            })
        } finally {
            setLoadingClosings(false)
        }
    }

    useEffect(() => {
        if (searchMode === "latest" && companyId) {
            fetchClosingSales()
        }
    }, [searchMode, companyId])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    const toggleExpandClosing = (id: string) => {
        setExpandedClosing(expandedClosing === id ? null : id)
    }

    const renderClosingSummary = (closing: ClosingSale) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: "4px solid",
                    borderColor: closing.turno_id === "mañana" ? "primary.main" : "secondary.main",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="medium">
                        {dayjs(parseMongoDate(closing.closing_date)).format("dddd, D [of] MMMM [of] YYYY")}
                    </Typography>
                    <Chip
                        label={closing.turno_id === "mañana" ? "Morning" : "Afternoon"}
                        color={closing.turno_id === "mañana" ? "primary" : "secondary"}
                        size="small"
                    />
                </Box>

                <Box sx={{ mb: 2, flexGrow: 1 }}>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Sales Summary
                    </Typography>

                    <Box
                        sx={{
                            backgroundColor: "primary.light",
                            p: 2,
                            borderRadius: 1,
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2" color="primary.contrastText">
                            Total Sales
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="primary.contrastText">
                            {formatCurrency(closing.total_sales)}
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <AttachMoneyIcon color="primary" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        Cash
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight="medium">
                                    {formatCurrency(closing.total_cash)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <CreditCardIcon color="primary" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        Card
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight="medium">
                                    {formatCurrency(closing.total_card)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <AccountBalanceIcon color="primary" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        Transfer
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight="medium">
                                    {formatCurrency(closing.total_transfer)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "grey.100" }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <MoreHorizIcon color="primary" fontSize="small" />
                                    <Typography variant="body2" color="text.secondary">
                                        Others
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight="medium">
                                    {formatCurrency(closing.total_other)}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        {parseMongoNumber(closing.transaction_count)} transactions
                    </Typography>
                    <Chip
                        label={closing.complete_closing ? "Complete" : "Pending"}
                        size="small"
                        variant="outlined"
                        color={closing.complete_closing ? "success" : "warning"}
                    />
                </Box>
            </Paper>
        </motion.div>
    )

    const renderClosingDetails = (closing: ClosingSale) => (
        <Box p={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
                Summary by Payment Method
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {[
                    { method: "cash", total: closing.total_cash, icon: <AttachMoneyIcon /> },
                    { method: "card", total: closing.total_card, icon: <CreditCardIcon /> },
                    { method: "transfer", total: closing.total_transfer, icon: <AccountBalanceIcon /> },
                    { method: "other", total: closing.total_other, icon: <MoreHorizIcon /> },
                ].map((payment, idx) => {
                    const total = parseMongoNumber(payment.total)
                    const salesTotal = parseMongoNumber(closing.total_sales)
                    const percentage = salesTotal > 0 ? Math.round((total / salesTotal) * 100) : 0

                    return (
                        <Grid item xs={12} sm={6} md={3} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <Paper elevation={2} sx={{ p: 2 }}>
                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                        {payment.icon}
                                        <Typography variant="subtitle2" textTransform="capitalize">
                                            {payment.method === "cash"
                                                ? "Cash"
                                                : payment.method === "card"
                                                    ? "Card"
                                                    : payment.method === "transfer"
                                                        ? "Transfer"
                                                        : "Others"}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {formatCurrency(payment.total)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {percentage}% of total
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    )
                })}
            </Grid>

            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
                Transaction details ({parseMongoNumber(closing.transaction_count)})
            </Typography>

            {closing.payment_ids?.length ? (
                <AnimatePresence>
                    {closing.payment_ids.map((paymentId) => {
                        const paymentIdStr = getMongoId(paymentId)
                        const payment = paymentDetails[paymentIdStr]
                        return (
                            <motion.div
                                key={paymentIdStr}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Accordion elevation={2} sx={{ mb: 2 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" pr={2}>
                                            <Box display="flex" alignItems="center">
                                                <ReceiptIcon color="primary" sx={{ mr: 1 }} />
                                                <Typography>
                                                    Order #{payment?.orderId || paymentIdStr.slice(-6)}
                                                </Typography>
                                            </Box>
                                            <Typography fontWeight="medium">
                                                {payment ? formatCurrency(payment.payment.total) : "Loading..."}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {payment ? (
                                            <PaymentDetailsCard payment={payment} />
                                        ) : (
                                            <Box display="flex" justifyContent="center" py={4}>
                                                <CircularProgress />
                                            </Box>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            ) : (
                <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary">
                        No transactions available for this closing.
                    </Typography>
                </Paper>
            )}
        </Box>
    )

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Box p={3}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
                    Z Closings
                </Typography>

                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    sx={{ mb: 3 }}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Summary" />
                    <Tab label="Details" />
                </Tabs>

                <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => fetchClosingSales()}
                        sx={{ textTransform: "none" }}
                    >
                        Refresh Data
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EventIcon />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ textTransform: "none" }}
                    >
                        Find Closings
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenCreateDialog(true)}
                        sx={{ textTransform: "none", ml: "auto" }}
                    >
                        Create Closing
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                {loading ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress size={60} />
                    </Box>
                ) : activeTab === 0 ? (
                    closingData.length > 0 ? (
                        <Grid container spacing={3}>
                            {closingData.map((closing, index) => (
                                <Grid item xs={12} md={6} lg={4} key={index}>
                                    {renderClosingSummary(closing)}
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Typography variant="h6" color="text.secondary">
                                No Z closings found
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {searchMode === "latest"
                                    ? "No recent closings available"
                                    : "No closings for the selected period"}
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={() => fetchClosingSales()}
                                sx={{ textTransform: "none" }}
                            >
                                Try again
                            </Button>
                        </Paper>
                    )
                ) : closingData.length > 0 ? (
                    <Box>
                        {closingData.map((closing, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Paper elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            backgroundColor: "primary.light",
                                            color: "primary.contrastText",
                                            borderTopLeftRadius: 8,
                                            borderTopRightRadius: 8,
                                        }}
                                        onClick={() => toggleExpandClosing(getMongoId(closing._id))}
                                    >
                                        <Box>
                                            <Typography variant="h6" fontWeight="medium">
                                                {dayjs(parseMongoDate(closing.closing_date)).format("dddd, D [of] MMMM [of] YYYY")}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Shift: {closing.turno_id === "mañana" ? "Morning" : "Afternoon"} | {parseMongoNumber(closing.transaction_count)}{" "}
                                                transactions | Total: {formatCurrency(closing.total_sales)}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {expandedClosing === getMongoId(closing._id) ? (
                                                <ExpandLessIcon />
                                            ) : (
                                                <ExpandMoreIcon />
                                            )}
                                        </Box>
                                    </Box>

                                    <Collapse in={expandedClosing === getMongoId(closing._id)}>
                                        {renderClosingDetails(closing)}
                                    </Collapse>
                                </Paper>
                            </motion.div>
                        ))}
                    </Box>
                ) : (
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            No Z closings found
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {searchMode === "latest"
                                ? "No recent closings available"
                                : "No closings for the selected period"}
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={() => fetchClosingSales()}
                            sx={{ textTransform: "none" }}
                        >
                            Try again
                        </Button>
                    </Paper>
                )}
            </Box>

            {/* Search Dialog */}
            {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                    }}
                >
                    <Box component="span">Search Z Closings</Box>
                    <IconButton onClick={() => setOpenDialog(false)} sx={{ color: "primary.contrastText" }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pt: 3 }}>
                    <Box mb={3}>
                        <TextField
                            select
                            fullWidth
                            label="Search Mode"
                            value={searchMode}
                            onChange={(e) => setSearchMode(e.target.value as "day" | "range" | "latest")}
                            variant="outlined"
                            size="small"
                        >
                            <MenuItem value="latest">
                                <Box display="flex" alignItems="center" gap={1}>
                                    <UpdateIcon fontSize="small" /> Latest Closings
                                </Box>
                            </MenuItem>
                            <MenuItem value="day">
                                <Box display="flex" alignItems="center" gap={1}>
                                    <EventIcon fontSize="small" /> By Specific Day
                                </Box>
                            </MenuItem>
                            <MenuItem value="range">
                                <Box display="flex" alignItems="center" gap={1}>
                                    <DateRangeIcon fontSize="small" /> By Date Range
                                </Box>
                            </MenuItem>
                        </TextField>
                    </Box>

                    {searchMode === "day" && (
                        <DatePicker
                            label="Select Day"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue || dayjs())}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: "small",
                                },
                            }}
                        />
                    )}

                    {searchMode === "range" && (
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue || dayjs())}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue || dayjs())}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small",
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)} color="secondary" sx={{ textTransform: "none" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={fetchClosingSales}
                        variant="contained"
                        color="primary"
                        startIcon={<RefreshIcon />}
                        disabled={loadingClosings}
                        sx={{ textTransform: "none" }}
                    >
                        {loadingClosings ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Searching...
                            </>
                        ) : (
                            "Search Closings"
                        )}
                    </Button>
                </DialogActions>
            </Dialog> */}


            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        overflow: 'visible' // Fixes potential clipping of dropdowns
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <DialogTitle
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            position: 'relative',
                            zIndex: 1,
                            boxShadow: 2,
                            padding: '16px 24px'
                        }}
                    >
                        <Typography variant="h6" component="div">
                            Search Z Closings
                        </Typography>
                        <IconButton
                            onClick={() => setOpenDialog(false)}
                            sx={{
                                color: "primary.contrastText",
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{
                        pt: 3,
                        '&.MuiDialogContent-root': {
                            paddingTop: '24px !important' // Ensures consistent spacing
                        }
                    }}>
                        <Box mb={3}>
                            <TextField
                                select
                                fullWidth
                                label="Search Mode"
                                value={searchMode}
                                onChange={(e) => setSearchMode(e.target.value as "day" | "range" | "latest")}
                                variant="outlined"
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        backgroundColor: 'background.paper'
                                    }
                                }}
                            >
                                <MenuItem value="latest">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <UpdateIcon fontSize="small" /> Latest Closings
                                    </Box>
                                </MenuItem>
                                <MenuItem value="day">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <EventIcon fontSize="small" /> By Specific Day
                                    </Box>
                                </MenuItem>
                                <MenuItem value="range">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <DateRangeIcon fontSize="small" /> By Date Range
                                    </Box>
                                </MenuItem>
                            </TextField>
                        </Box>

                        {searchMode === "day" && (
                            <DatePicker
                                label="Select Day"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue || dayjs())}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                        sx: {
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                                backgroundColor: 'background.paper'
                                            }
                                        }
                                    },
                                }}
                            />
                        )}

                        {searchMode === "range" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue || dayjs())}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 1,
                                                        backgroundColor: 'background.paper'
                                                    }
                                                }
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue || dayjs())}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: 1,
                                                        backgroundColor: 'background.paper'
                                                    }
                                                }
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>

                    <DialogActions sx={{
                        p: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        justifyContent: 'space-between'
                    }}>
                        <Button
                            onClick={() => setOpenDialog(false)}
                            color="secondary"
                            sx={{
                                textTransform: "none",
                                px: 3,
                                borderRadius: 1
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={fetchClosingSales}
                            variant="contained"
                            color="primary"
                            startIcon={loadingClosings ? null : <RefreshIcon />}
                            disabled={loadingClosings}
                            sx={{
                                textTransform: "none",
                                px: 3,
                                borderRadius: 1,
                                minWidth: 120
                            }}
                        >
                            {loadingClosings ? (
                                <Box display="flex" alignItems="center">
                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                    Searching...
                                </Box>
                            ) : (
                                "Search Closings"
                            )}
                        </Button>
                    </DialogActions>
                </motion.div>
            </Dialog>

            {/* Create Closing Dialog */}
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                    }}
                >
                    <Box component="span">Create New Z Closing</Box>
                    <IconButton onClick={() => setOpenCreateDialog(false)} sx={{ color: "primary.contrastText" }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ pt: 3 }}>
                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                        Select the shift for which you want to generate the Z closing:
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => createClosingSale("mañana")}
                            disabled={loadingClosings}
                            sx={{ textTransform: "none", flex: 1 }}
                        >
                            Morning
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => createClosingSale("tarde")}
                            disabled={loadingClosings}
                            sx={{ textTransform: "none", flex: 1 }}
                        >
                            Afternoon
                        </Button>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
                        Note: The system will include all transactions since the last closing.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenCreateDialog(false)} color="secondary" sx={{ textTransform: "none" }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </LocalizationProvider>
    )
}

export default CierreZPage