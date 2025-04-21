// import React, { ReactElement } from 'react';
// import { motion } from 'framer-motion';
// import {
//     List,
//     ListItem,
//     Box,
//     useTheme,
//     IconButton,
//     Chip,
//     Tooltip,
//     Stack,
//     useMediaQuery
// } from '@mui/material';
// import { CheckCircle, HourglassTop, PlayArrow, Pause, Replay } from '@mui/icons-material';
// import OrderDetails from './OrderDetails';

// interface OrderListProps {
//     data: any[];
//     loading: boolean;
//     onAction: (action: string, order: any) => void;
// }

// const statusConfig: any = {
//     pending: { color: 'warning', icon: <HourglassTop /> },
//     processing: { color: 'info', icon: <PlayArrow /> },
//     'in-progress': { color: 'primary', icon: <Pause /> },
//     finished: { color: 'success', icon: <CheckCircle /> },
//     cancelled: { color: 'error', icon: <CheckCircle /> }
// } as const;

// export default function OrdersList({ data, loading, onAction }: OrderListProps) {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const getActions = (order: any) => {
//         // Acciones base según estado
//         const baseActions = {
//             pending: [{ action: 'take', icon: <PlayArrow />, label: 'Tomar orden', color: 'info' }],
//             processing: [
//                 { action: 'pause', icon: <Pause />, label: 'Pausar orden', color: 'warning' },
//                 { action: 'complete', icon: <CheckCircle />, label: 'Completar orden', color: 'success' }
//             ],
//             'in-progress': [
//                 { action: 'resume', icon: <PlayArrow />, label: 'Continuar procesando', color: 'info' },
//                 { action: 'complete', icon: <CheckCircle />, label: 'Completar orden', color: 'success' }
//             ],
//             finished: [
//                 { action: 'reopen', icon: <Replay />, label: 'Reabrir orden', color: 'warning' }
//             ],
//             cancelled: [
//                 { action: 'reopen', icon: <Replay />, label: 'Reabrir orden', color: 'warning' }
//             ]
//         };

//         // Obtener acciones según estado actual
//         const statusActions = baseActions[order.status as keyof typeof baseActions] || [];

//         // Acciones adicionales que pueden estar disponibles en cualquier estado
//         const commonActions = [];

//         // Si está pausado o en progreso, permitir cancelar
//         if (['in-progress', 'processing'].includes(order.status)) {
//             commonActions.push({
//                 action: 'cancel',
//                 icon: <CheckCircle />,
//                 label: 'Cancelar orden',
//                 color: 'error'
//             });
//         }

//         // Si está completado o cancelado, permitir eliminar
//         if (['finished', 'cancelled'].includes(order.status)) {
//             commonActions.push({
//                 action: 'delete',
//                 icon: <CheckCircle />,
//                 label: 'Eliminar orden',
//                 color: 'error'
//             });
//         }

//         return [...statusActions, ...commonActions];
//     };

//     return (
//         <List sx={{
//             width: '100%',
//             p: 0,
//             '& .MuiListItem-root': {
//                 display: 'flex',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 alignItems: isMobile ? 'flex-start' : 'center',
//                 p: 2,
//                 mb: 2,
//                 borderRadius: 2,
//                 border: `1px solid ${theme.palette.divider}`,
//                 backgroundColor: theme.palette.background.paper,
//                 boxShadow: theme.shadows[1],
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                     boxShadow: theme.shadows[4],
//                     transform: 'translateY(-2px)'
//                 }
//             }
//         }}>
//             {data?.map((order, index) => (
//                 <motion.div
//                     key={order._id || index}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <ListItem>
//                         {/* Contenido principal */}
//                         <Box sx={{
//                             flex: 1,
//                             mr: isMobile ? 0 : 2,
//                             mb: isMobile ? 1.5 : 0,
//                             width: isMobile ? '100%' : 'auto'
//                         }}>
//                             <OrderDetails order={order} index={index} />
//                         </Box>

//                         {/* Controles */}
//                         <Stack
//                             direction={isMobile ? 'row' : 'column'}
//                             spacing={1}
//                             sx={{
//                                 alignItems: 'center',
//                                 justifyContent: isMobile ? 'space-between' : 'flex-end',
//                                 width: isMobile ? '100%' : 'auto'
//                             }}
//                         >
//                             {/* Estado */}
//                             <Chip
//                                 label={order.status}
//                                 icon={statusConfig[order.status]?.icon}
//                                 color={statusConfig[order.status]?.color || 'default'}
//                                 size="small"
//                                 sx={{
//                                     minWidth: 100,
//                                     justifyContent: 'flex-start',
//                                     '& .MuiChip-icon': { ml: 0.5 }
//                                 }}
//                             />

//                             {/* Botones de acción */}
//                             <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
//                                 {getActions(order).map((btn) => (
//                                     <Tooltip key={btn.action} title={btn.label} arrow>
//                                         <IconButton
//                                             size="medium"
//                                             onClick={() => onAction(btn.action, order)}
//                                             disabled={loading}
//                                             sx={{
//                                                 color: `${btn.color}.main`,
//                                                 backgroundColor: `${btn.color}.light`,
//                                                 '&:hover': {
//                                                     backgroundColor: `${btn.color}.main`,
//                                                     color: `${btn.color}.contrastText`
//                                                 },
//                                                 transition: 'all 0.2s ease',
//                                                 '&:disabled': {
//                                                     opacity: 0.5
//                                                 }
//                                             }}
//                                         >
//                                             {btn.icon}
//                                         </IconButton>
//                                     </Tooltip>
//                                 ))}
//                             </Stack>
//                         </Stack>
//                     </ListItem>
//                 </motion.div>
//             ))}
//         </List>
//     );
// }


import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import {
    List,
    ListItem,
    Box,
    useTheme,
    IconButton,
    Chip,
    Tooltip,
    Stack,
    useMediaQuery
} from '@mui/material';
import { CheckCircle, HourglassTop, PlayArrow, Pause, Replay } from '@mui/icons-material';
import OrderDetails from './OrderDetails';

interface OrderListProps {
    data: any[];
    loading: boolean;
    onAction: (action: string, order: any) => void;
}

// const statusConfig: any = {
//     pending: { color: 'warning', icon: <HourglassTop /> },
//     processing: { color: 'info', icon: <PlayArrow /> },
//     'in-progress': { color: 'primary', icon: <Pause /> },
//     finished: { color: 'success', icon: <CheckCircle /> },
//     cancelled: { color: 'error', icon: <CheckCircle /> }
// } as const;

const statusConfig: any = {
    pending: { color: 'warning', icon: <HourglassTop /> },
    processing: { color: 'info', icon: <PlayArrow /> },
    paused: { color: 'primary', icon: <Pause /> }, // Cambiado de 'in-progress' a 'paused'
    finished: { color: 'success', icon: <CheckCircle /> },
    cancelled: { color: 'error', icon: <CheckCircle /> }
} as const;


export default function OrdersList({ data, loading, onAction }: OrderListProps) {
    const theme: any = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getActions = (order: any) => {
        const baseActions = {
            pending: [{
                action: 'start', // Cambiado de 'process' a 'start' para más claridad
                icon: <PlayArrow />,
                label: 'Tomar orden',
                color: 'info'
            }],
            processing: [
                {
                    action: 'pause',
                    icon: <Pause />,
                    label: 'Pausar orden',
                    color: 'warning'
                },
                {
                    action: 'complete',
                    icon: <CheckCircle />,
                    label: 'Completar orden',
                    color: 'success'
                }
            ],
            paused: [ // Cambiado de 'in-progress' a 'paused'
                {
                    action: 'resume',
                    icon: <PlayArrow />,
                    label: 'Continuar procesando',
                    color: 'info'
                },
                {
                    action: 'complete',
                    icon: <CheckCircle />,
                    label: 'Completar orden',
                    color: 'success'
                }
            ],
            finished: [
                {
                    action: 'reopen',
                    icon: <Replay />,
                    label: 'Reabrir orden',
                    color: 'warning'
                }
            ],
            cancelled: [
                {
                    action: 'reopen',
                    icon: <Replay />,
                    label: 'Reabrir orden',
                    color: 'warning'
                }
            ]
        };


        const statusActions = baseActions[order.status as keyof typeof baseActions] || [];
        const commonActions = [];

        if (['processing', 'paused'].includes(order.status)) {
            commonActions.push({
                action: 'cancel',
                icon: <CheckCircle />,
                label: 'Cancelar orden',
                color: 'error'
            });
        }

        if (['finished', 'cancelled'].includes(order.status)) {
            commonActions.push({
                action: 'delete',
                icon: <CheckCircle />,
                label: 'Eliminar orden',
                color: 'error'
            });
        }

        return [...statusActions, ...commonActions];
    };
    return (
        <List sx={{
            width: '100%',
            p: 0,
            '& .MuiListItem-root': {
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                transition: 'all 0.2s ease',
                '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-2px)'
                }
            }
        }}>
            {data?.map((order, index) => (
                <motion.div
                    key={order._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ListItem>
                        {/* Contenido principal */}
                        <Box sx={{
                            flex: 1,
                            mr: isMobile ? 0 : 2,
                            mb: isMobile ? 1.5 : 0,
                            width: isMobile ? '100%' : 'auto'
                        }}>
                            <OrderDetails order={order} index={index} />
                        </Box>

                        {/* Controles */}
                        <Stack
                            direction={isMobile ? 'row' : 'column'}
                            spacing={1}
                            sx={{
                                alignItems: 'center',
                                justifyContent: isMobile ? 'space-between' : 'flex-end',
                                width: isMobile ? '100%' : 'auto'
                            }}
                        >
                            {/* Estado */}
                            <Chip
                                label={order.status}
                                icon={statusConfig[order.status]?.icon}
                                color={statusConfig[order.status]?.color || 'default'}
                                size="small"
                                sx={{
                                    minWidth: 100,
                                    justifyContent: 'flex-start',
                                    '& .MuiChip-icon': { ml: 0.5 }
                                }}
                            />

                            {/* Botones de acción */}
                            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                                {getActions(order).map((btn) => (
                                    <Tooltip key={btn.action} title={btn.label} arrow>
                                        <IconButton
                                            size="medium"
                                            onClick={() => onAction(btn.action, order)}
                                            disabled={loading}
                                            sx={{
                                                color: theme.palette[btn.color].main,
                                                backgroundColor: theme.palette[btn.color].light,
                                                '&:hover': {
                                                    backgroundColor: theme.palette[btn.color].main,
                                                    color: theme.palette[btn.color].contrastText
                                                },
                                                transition: 'all 0.2s ease',
                                                '&:disabled': {
                                                    opacity: 0.5
                                                }
                                            }}
                                        >
                                            {btn.icon}
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </Stack>
                        </Stack>
                    </ListItem>
                </motion.div>
            ))}
        </List>
    );
}