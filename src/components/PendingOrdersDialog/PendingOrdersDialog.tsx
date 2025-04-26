// import * as React from 'react';
// import {
//     Button, Dialog, List, Divider, AppBar, Toolbar, IconButton,
//     Typography, Box, CircularProgress, Alert, Paper, Chip,
//     Avatar, ListItem, ListItemAvatar, ListItemText, Stack,
//     ListItemButton
// } from '@mui/material';
// import {
//     Close as CloseIcon, Restaurant as RestaurantIcon,
//     AccessTime as AccessTimeIcon, TableRestaurant as TableIcon,
//     Check as CheckIcon
// } from '@mui/icons-material';
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement;
//     },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

// interface OrderItem {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     extras?: Array<{
//         name: string;
//         price: number;
//     }>;
//     Description: string;
//     comments: string;
// }

// interface Order {
//     _id: string;
//     id: string;
//     orderType: string;
//     dataTypeOrder: string;
//     cart: OrderItem[];
//     comments: string;
//     companiesName: string;
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//     hoursPending: number;
//     name: string;
//     phone: string;
// }

// export default function PendingOrdersDialog(props: {
//     open: boolean;
//     onClose: () => void;
// }) {
//     const [orders, setOrders] = React.useState<Order[]>([]);
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = React.useState<string | null>(null);
//     const [success, setSuccess] = React.useState<string | null>(null);
//     const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);



//     const fetchPendingOrders = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch('/api/expireNonDelivery?hours=8');

//             // Verificar si la respuesta es válida y contiene datos JSON
//             if (!response.ok) {
//                 throw new Error('Error al cargar órdenes');
//             }

//             const contentType = response.headers.get('Content-Type');
//             if (contentType && contentType.includes('application/json')) {
//                 const data = await response.json();
//                 setOrders(data);
//             } else {
//                 throw new Error('La respuesta no contiene JSON válido');
//             }
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Error desconocido');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCloseAll = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch('/api/expireNonDelivery', {
//                 method: 'POST',
//             });

//             if (!response.ok) throw new Error('Error al cerrar órdenes');

//             const contentType = response.headers.get('Content-Type');
//             if (contentType && contentType.includes('application/json')) {
//                 const result = await response.json();
//                 setSuccess(`Se cerraron ${result.expiredCount} órdenes`);
//                 await fetchPendingOrders();
//             } else {
//                 throw new Error('La respuesta no contiene JSON válido');
//             }
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Error desconocido');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCloseSingle = async (orderId: string) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`/api/expireNonDelivery?id=${orderId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     status: 'expired',
//                     closureReason: 'Cerrada manualmente',
//                 }),
//             });

//             if (!response.ok) throw new Error('Error al cerrar la orden');

//             const contentType = response.headers.get('Content-Type');
//             if (contentType && contentType.includes('application/json')) {
//                 const result = await response.json();
//                 setSuccess('Orden cerrada exitosamente');
//                 await fetchPendingOrders();
//             } else {
//                 throw new Error('La respuesta no contiene JSON válido');
//             }
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Error desconocido');
//         } finally {
//             setLoading(false);
//         }
//     };




//     const toggleExpandOrder = (orderId: string) => {
//         setExpandedOrder(expandedOrder === orderId ? null : orderId);
//     };

//     const calculateTotal = (cart: OrderItem[]) => {
//         return cart.reduce((total, item) => {
//             const extrasTotal = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
//             return total + (item.price + extrasTotal) * item.quantity;
//         }, 0);
//     };

//     React.useEffect(() => {
//         if (props.open) {
//             fetchPendingOrders();
//             setSuccess(null);
//             setError(null);
//         }
//     }, [props.open]);

//     return (
//         <Dialog
//             fullScreen
//             open={props.open}
//             onClose={props.onClose}
//             TransitionComponent={Transition}
//             PaperProps={{
//                 sx: {
//                     backgroundColor: '#f5f5f5'
//                 }
//             }}
//         >
//             <AppBar
//                 position="sticky"
//                 elevation={0}
//                 sx={{
//                     backgroundColor: 'white',
//                     color: 'text.primary',
//                     borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
//                 }}
//             >
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         onClick={props.onClose}
//                         aria-label="close"
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                     <Typography
//                         sx={{ ml: 2, flex: 1 }}
//                         variant="h6"
//                         component="div"
//                         fontWeight="medium"
//                     >
//                         Órdenes Pendientes
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         startIcon={<CheckIcon />}
//                         onClick={handleCloseAll}
//                         disabled={loading || orders.length === 0}
//                         sx={{
//                             textTransform: 'none',
//                             borderRadius: 2,
//                             px: 2
//                         }}
//                     >
//                         Cerrar Todas
//                     </Button>
//                 </Toolbar>
//             </AppBar>

//             <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto', width: '100%' }}>
//                 {error && (
//                     <Alert severity="error" sx={{ mb: 3 }}>
//                         {error}
//                     </Alert>
//                 )}
//                 {success && (
//                     <Alert severity="success" sx={{ mb: 3 }}>
//                         {success}
//                     </Alert>
//                 )}

//                 {loading && orders.length === 0 ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : orders.length === 0 ? (
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 4,
//                             textAlign: 'center',
//                             borderRadius: 2,
//                             backgroundColor: 'background.paper'
//                         }}
//                     >
//                         <Typography variant="h6" color="text.secondary">
//                             No hay órdenes pendientes
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                             Todas las órdenes están al día
//                         </Typography>
//                     </Paper>
//                 ) : (
//                     <Stack spacing={2}>
//                         {orders.map((order) => (
//                             <Paper
//                                 key={order._id}
//                                 elevation={0}
//                                 sx={{
//                                     borderRadius: 2,
//                                     overflow: 'hidden',
//                                     border: '1px solid rgba(0, 0, 0, 0.12)'
//                                 }}
//                             >
//                                 <ListItemButton onClick={() => toggleExpandOrder(order._id)}>
//                                     <ListItemAvatar>
//                                         <Avatar sx={{ bgcolor: order.orderType === 'mesa' ? 'primary.main' : 'secondary.main' }}>
//                                             {order.orderType === 'mesa' ? <TableIcon /> : <RestaurantIcon />}
//                                         </Avatar>
//                                     </ListItemAvatar>
//                                     <ListItemText
//                                         primary={
//                                             <Typography fontWeight="medium">
//                                                 {order.dataTypeOrder}{order.id}
//                                             </Typography>
//                                         }
//                                         secondary={
//                                             <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
//                                                 <Chip
//                                                     icon={<AccessTimeIcon />}
//                                                     label={`${order.hoursPending}h pendiente`}
//                                                     size="small"
//                                                     color={order.hoursPending > 8 ? 'error' : 'warning'}
//                                                     variant="outlined"
//                                                 />
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {order.name} • {order.phone}
//                                                 </Typography>
//                                             </Stack>
//                                         }
//                                     />
//                                     <Button
//                                         variant="outlined"
//                                         color="error"
//                                         size="small"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleCloseSingle(order._id);
//                                         }}
//                                         disabled={loading}
//                                         sx={{
//                                             textTransform: 'none',
//                                             borderRadius: 2
//                                         }}
//                                     >
//                                         Cerrar
//                                     </Button>
//                                 </ListItemButton>

//                                 {expandedOrder === order._id && (
//                                     <Box sx={{ p: 2, pt: 0, backgroundColor: 'background.paper' }}>
//                                         <Divider sx={{ my: 1 }} />
//                                         <Typography variant="subtitle2" gutterBottom>
//                                             Detalles del Pedido:
//                                         </Typography>
//                                         <List dense disablePadding>
//                                             {order.cart.map((item) => (
//                                                 <ListItem key={item.id} disablePadding>
//                                                     <ListItemText
//                                                         primary={`${item.quantity}x ${item.name}`}
//                                                         secondary={
//                                                             <>
//                                                                 {item.Description && (
//                                                                     <Typography variant="body2" color="text.secondary">
//                                                                         {item.Description}
//                                                                     </Typography>
//                                                                 )}
//                                                                 {item.extras && item.extras.length > 0 && (
//                                                                     <Box sx={{ mt: 0.5 }}>
//                                                                         <Typography variant="caption" color="text.secondary">
//                                                                             Extras:
//                                                                         </Typography>
//                                                                         {item.extras.map((extra, idx) => (
//                                                                             <Chip
//                                                                                 key={idx}
//                                                                                 label={`${extra.name} (+$${extra.price})`}
//                                                                                 size="small"
//                                                                                 sx={{ ml: 0.5, mb: 0.5 }}
//                                                                             />
//                                                                         ))}
//                                                                     </Box>
//                                                                 )}
//                                                                 {item.comments && (
//                                                                     <Typography variant="caption" color="text.secondary" display="block">
//                                                                         Notas: {item.comments}
//                                                                     </Typography>
//                                                                 )}
//                                                             </>
//                                                         }
//                                                         sx={{ my: 0 }}
//                                                     />
//                                                     <Typography variant="body2">
//                                                         ${(item.price * item.quantity).toFixed(2)}
//                                                     </Typography>
//                                                 </ListItem>
//                                             ))}
//                                         </List>
//                                         {order.comments && (
//                                             <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
//                                                 <strong>Notas generales:</strong> {order.comments}
//                                             </Typography>
//                                         )}
//                                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                                             <Typography variant="subtitle1">
//                                                 Total:
//                                             </Typography>
//                                             <Typography variant="subtitle1" fontWeight="medium">
//                                                 ${calculateTotal(order.cart).toFixed(2)}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 )}
//                             </Paper>
//                         ))}
//                     </Stack>
//                 )}
//             </Box>
//         </Dialog>
//     );
// }


import * as React from 'react';
import {
    Button, Dialog, List, Divider, AppBar, Toolbar, IconButton,
    Typography, Box, CircularProgress, Alert, Paper, Chip,
    Avatar, ListItem, ListItemAvatar, ListItemText, Stack,
    ListItemButton
} from '@mui/material';
import {
    Close as CloseIcon, Restaurant as RestaurantIcon,
    AccessTime as AccessTimeIcon, TableRestaurant as TableIcon,
    Check as CheckIcon
} from '@mui/icons-material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    extras?: Array<{
        name: string;
        price: number;
    }>;
    Description: string;
    comments: string;
}

interface Order {
    _id: string;
    id: string;
    orderType: string;
    dataTypeOrder: string;
    cart: OrderItem[];
    comments: string;
    companiesName: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    hoursPending: number;
    name: string;
    phone: string;
}

export default function PendingOrdersDialog(props: {
    open: boolean;
    onClose: () => void;
}) {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);
    const [closingIds, setClosingIds] = React.useState<string[]>([]);

    const fetchPendingOrders = async () => {
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch('/api/expireNonDelivery?hours=8', {
                signal: controller.signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al cargar órdenes');
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error('Formato de respuesta inválido');
                }
                setOrders(data);
            } else {
                throw new Error('La respuesta no contiene JSON válido');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    const handleCloseAll = async () => {
        setLoading(true);
        setError(null);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch('/api/expireNonDelivery', {
                method: 'POST',
                signal: controller.signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al cerrar órdenes');
            }

            const text = await response.text();
            let result;
            if (text) {
                try {
                    result = JSON.parse(text);
                } catch (e) {
                    console.warn('Response not JSON:', text);
                }
            }

            setSuccess(`Se cerraron ${result?.expiredCount || 'todas'} las órdenes`);
            setOrders([]); // Optimistic update
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    const handleCloseSingle = async (orderId: string) => {
        setClosingIds(prev => [...prev, orderId]);
        setError(null);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch(`/api/expireNonDelivery?id=${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'expired',
                    closureReason: 'Cerrada manualmente',
                }),
                signal: controller.signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al cerrar la orden');
            }

            const text = await response.text();
            if (text) {
                try {
                    JSON.parse(text);
                } catch (e) {
                    console.warn('Response not JSON:', text);
                }
            }

            setSuccess('Orden cerrada exitosamente');
            // Optimistic update
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            setExpandedOrder(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            clearTimeout(timeoutId);
            setClosingIds(prev => prev.filter(id => id !== orderId));
            setLoading(false);
        }
    };

    const toggleExpandOrder = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const calculateTotal = (cart: OrderItem[]) => {
        return cart.reduce((total, item) => {
            const extrasTotal = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
            return total + (item.price + extrasTotal) * item.quantity;
        }, 0);
    };

    React.useEffect(() => {
        if (props.open) {
            fetchPendingOrders();
            setSuccess(null);
            setError(null);
        }
    }, [props.open]);

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.onClose}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    backgroundColor: '#f5f5f5'
                }
            }}
        >
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'white',
                    color: 'text.primary',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                        fontWeight="medium"
                    >
                        Órdenes Pendientes
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={handleCloseAll}
                        disabled={loading || orders.length === 0}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2
                        }}
                    >
                        Cerrar Todas
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto', width: '100%' }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
                        {success}
                    </Alert>
                )}

                {loading && orders.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : orders.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 2,
                            backgroundColor: 'background.paper'
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            No hay órdenes pendientes
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Todas las órdenes están al día
                        </Typography>
                    </Paper>
                ) : (
                    <Stack spacing={2}>
                        {orders.map((order) => (
                            <Paper
                                key={order._id}
                                elevation={0}
                                sx={{
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0, 0, 0, 0.12)'
                                }}
                            >
                                <ListItemButton 
                                    onClick={() => toggleExpandOrder(order._id)}
                                    disabled={closingIds.includes(order._id)}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: order.orderType === 'mesa' ? 'primary.main' : 'secondary.main' }}>
                                            {order.orderType === 'mesa' ? <TableIcon /> : <RestaurantIcon />}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight="medium">
                                                {order.dataTypeOrder}{order.id}
                                            </Typography>
                                        }
                                        secondary={
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                                                <Chip
                                                    icon={<AccessTimeIcon />}
                                                    label={`${order.hoursPending}h pendiente`}
                                                    size="small"
                                                    color={order.hoursPending > 8 ? 'error' : 'warning'}
                                                    variant="outlined"
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    {order.name} • {order.phone}
                                                </Typography>
                                            </Stack>
                                        }
                                    />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCloseSingle(order._id);
                                        }}
                                        disabled={loading || closingIds.includes(order._id)}
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: 2
                                        }}
                                    >
                                        {closingIds.includes(order._id) ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            'Cerrar'
                                        )}
                                    </Button>
                                </ListItemButton>

                                {expandedOrder === order._id && (
                                    <Box sx={{ p: 2, pt: 0, backgroundColor: 'background.paper' }}>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="subtitle2" gutterBottom>
                                            Detalles del Pedido:
                                        </Typography>
                                        <List dense disablePadding>
                                            {order.cart.map((item) => (
                                                <ListItem key={item.id} disablePadding>
                                                    <ListItemText
                                                        primary={`${item.quantity}x ${item.name}`}
                                                        secondary={
                                                            <>
                                                                {item.Description && (
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {item.Description}
                                                                    </Typography>
                                                                )}
                                                                {item.extras && item.extras.length > 0 && (
                                                                    <Box sx={{ mt: 0.5 }}>
                                                                        <Typography variant="caption" color="text.secondary">
                                                                            Extras:
                                                                        </Typography>
                                                                        {item.extras.map((extra, idx) => (
                                                                            <Chip
                                                                                key={idx}
                                                                                label={`${extra.name} (+$${extra.price})`}
                                                                                size="small"
                                                                                sx={{ ml: 0.5, mb: 0.5 }}
                                                                            />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                                {item.comments && (
                                                                    <Typography variant="caption" color="text.secondary" display="block">
                                                                        Notas: {item.comments}
                                                                    </Typography>
                                                                )}
                                                            </>
                                                        }
                                                        sx={{ my: 0 }}
                                                    />
                                                    <Typography variant="body2">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </Typography>
                                                </ListItem>
                                            ))}
                                        </List>
                                        {order.comments && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                                                <strong>Notas generales:</strong> {order.comments}
                                            </Typography>
                                        )}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                            <Typography variant="subtitle1">
                                                Total:
                                            </Typography>
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                ${calculateTotal(order.cart).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Paper>
                        ))}
                    </Stack>
                )}
            </Box>
        </Dialog>
    );
}