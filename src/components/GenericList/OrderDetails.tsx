// import React, { useState } from 'react'


// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';


// import Restaurant from '@mui/icons-material/Restaurant';
// import TakeoutDining from '@mui/icons-material/TakeoutDining';
// import TwoWheeler from '@mui/icons-material/TwoWheeler';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import { Divider } from '@mui/material';

// const OrderDetails = (props: any) => {
//     const { items, index } = props
//     const [dataGeneral, setDataGeneral] = useState(items)

//     const [dense, setDense] = React.useState(false);
//     const [secondary, setSecondary] = React.useState(true);




//     console.log("🚀 ~ OrderDetails ~ dataGeneral:", dataGeneral?.data)
//     return (
//         <div>
//             {
//                 dataGeneral &&
//                 <div>
//                     <Box sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         flex: 1,
//                         gap: 1
//                     }}>

//                         <ListItem>

//                             <ListItemText
//                                 primary={
//                                     <div>
//                                         Orden para {dataGeneral?.data?.orderType} {dataGeneral?.data?.dataTypeOrder}
//                                         <Divider />
//                                         {
//                                             dataGeneral?.data?.cart?.map((item: any) => (
//                                                 <Box sx={{
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     flex: 1,
//                                                     gap: 1
//                                                 }}>
//                                                     <ListItem>
//                                                         <ListItemAvatar>

//                                                             <AccessTimeIcon />
//                                                         </ListItemAvatar>
//                                                         plato:  {item?.name}
//                                                         <Divider />

//                                                         <Box sx={{
//                                                             display: 'flex',
//                                                             alignItems: 'center',
//                                                             flex: 1,
//                                                             gap: 1
//                                                         }}>

//                                                             {
//                                                                 item?.extras?.map((extra: any) => (
//                                                                     <div>
//                                                                         <br />
//                                                                         <span>
//                                                                             {extra.name}
//                                                                         </span>
//                                                                     </div>
//                                                                 ))
//                                                             }
//                                                         </Box>

//                                                     </ListItem>
//                                                 </Box>


//                                             ))

//                                         }

//                                     </div>
//                                 }
//                                 secondary={secondary ?
//                                     <div>

//                                         <Box sx={{
//                                             display: 'flex',
//                                             alignItems: 'flex-end',
//                                             flex: 1,
//                                             gap: 1
//                                         }}>
//                                             <span>responsable: </span> {dataGeneral?.username}
//                                             <span>hora de ingreso pedido: </span>{dataGeneral?.timestamp}
//                                         </Box>
//                                     </div>
//                                     : null}

//                             />
//                             <hr />
//                         </ListItem>
//                         <Typography
//                             component="span"
//                             variant="body2"
//                             sx={{ color: 'text.primary', display: 'flex' }}
//                         >
//                             {` Comentario: ${dataGeneral?.data?.comments}`}
//                         </Typography>
//                     </Box>


//                 </div>
//             }



//         </div>
//     )
// }

// export default OrderDetails

import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Divider,
    Chip,
    Stack,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Restaurant,
    TakeoutDining,
    TwoWheeler,
    AccessTime,
    Comment
} from '@mui/icons-material';

interface OrderExtra {
    name: string;
    price: number;
}

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    extras?: OrderExtra[];
    extrasTotal?: number;
}

interface OrderData {
    orderType: string;
    dataTypeOrder: string;
    cart: OrderItem[];
    comments?: string;
    id: string;
}

interface OrderDetailsProps {
    order: {
        data: OrderData;
        username: string;
        timestamp: string;
    };
    index: number;
}

const OrderDetails = ({ order, index }: OrderDetailsProps) => {
    console.log("🚀 ~ OrderDetails ~ order:", order)
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    // Formatear hora
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Calcular total
    const calculateTotal = () => {
        return order.data.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity) + (item.extrasTotal || 0);
        }, 0);
    };

    // Estilo condicional para PC
    if (isDesktop) {
        return (
            <Box sx={{
                display: 'flex',
                p: 1.5,
                mb: 1.5,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.background.paper,
                borderRadius: '4px',
                boxShadow: theme.shadows[1],
                gap: 2
            }}>
                {/* Columna 1: Información básica */}
                <Stack minWidth={120}>
                    <Typography variant="subtitle2" fontWeight="bold">
                        Orden #{index + 1}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {order.data.dataTypeOrder}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="caption">
                            {formatTime(order.timestamp)}
                        </Typography>
                    </Stack>
                </Stack>

                {/* Columna 2: Items */}
                <Stack flex={1} spacing={1}>
                    {order.data.cart.map((item: any) => (
                        <Box key={item.id}>
                            <Stack direction="row" spacing={1} alignItems="baseline">
                                <Typography variant="body2" fontWeight="medium">
                                    {item.quantity}x {item.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    ${item.price.toFixed(2)}
                                </Typography>
                            </Stack>
                            <span >
                                {item?.Description}
                            </span>

                            {item.extras?.length > 0 && (
                                <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                                    {item.extras.map((extra: any, i: any) => (
                                        <Chip
                                            key={i}
                                            label={`+ ${extra.name} ($${extra.price.toFixed(2)})`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Box>
                    ))}
                </Stack>

                {/* Columna 3: Totales y comentarios */}
                <Stack minWidth={150} justifyContent="space-between">
                    <Typography variant="subtitle2" fontWeight="bold" textAlign="right">
                        Total: ${calculateTotal().toFixed(2)}
                    </Typography>

                    {order.data.comments && (
                        <Stack direction="row" spacing={0.5} alignItems="flex-start">
                            <Comment fontSize="small" color="action" />
                            <Typography variant="caption">
                                {order.data.comments}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Box>
        );
    }

    // Estilo para mobile (vertical)
    return (
        <Box sx={{
            p: 1,
            mb: 1,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '4px',
            boxShadow: theme.shadows[1]
        }}>
            {/* Header - Primera línea */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                    #{index + 1}
                </Typography>

                <Restaurant fontSize="small" color="primary" />

                <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    {order.data.dataTypeOrder}
                </Typography>

                <AccessTime fontSize="small" color="action" />
                <Typography variant="caption">
                    {formatTime(order.timestamp)}
                </Typography>
            </Stack>

            {/* Items - Segunda línea */}
            <Box sx={{ ml: 3 }}>
                {order.data.cart.map((item: any) => (
                    <Box key={item.id} sx={{ mb: 0.5 }}>
                        <Stack direction="row" spacing={0.5} alignItems="baseline">
                            <Typography variant="body2" fontWeight="medium">
                                {item.quantity}x {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                (${item.price.toFixed(2)})
                            </Typography>
                        </Stack>
                        <span >
                            {item?.Description}
                        </span>

                        {item.extras?.length > 0 && (
                            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                                {item.extras.map((extra: any, i: any) => (
                                    <Chip
                                        key={i}
                                        label={`+ ${extra.name}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: '0.6rem', height: 20 }}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Box>
                ))}
            </Box>

            {/* Footer - Tercera línea */}
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1, ml: 3 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                    {order.data.comments && (
                        <>
                            <Comment fontSize="small" color="action" />
                            <Typography variant="caption" sx={{ maxWidth: 120 }}>
                                {order.data.comments}
                            </Typography>
                        </>
                    )}
                </Stack>

                <Typography variant="subtitle2" fontWeight="bold">
                    Total: ${calculateTotal().toFixed(2)}
                </Typography>
            </Stack>
        </Box>
    );
};

export default OrderDetails;