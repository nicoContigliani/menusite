// // import React from 'react';
// // import {
// //     List,
// //     ListItem,
// //     IconButton,
// //     ButtonGroup,
// //     Button,
// //     ListItemText,
// //     Box,
// //     useTheme,
// //     Divider
// // } from '@mui/material';
// // import OrderDetails from './OrderDetails';
// // import { CheckCircle, HourglassTop, PlayArrow } from '@mui/icons-material';

// // export default function GutterlessList(props: any) {
// //     const { data } = props;
// //     const theme = useTheme();

// //     return (
// //         <List sx={{
// //             width: '100%',
// //             maxWidth: '100%', // Elimina el límite de 360px
// //             bgcolor: 'background.paper',
// //             p: 1
// //         }}>
// //             {data?.map((items: any, index: number) => (

// //                 <ListItem
// //                     key={`${items.id || index}`} // Usa un identificador único real si existe
// //                     disableGutters
// //                     sx={{
// //                         mb: 1,
// //                         p: 1,
// //                         border: `1px solid ${theme.palette.divider}`,
// //                         borderRadius: 1,
// //                         '&:hover': {
// //                             bgcolor: 'action.hover'
// //                         }
// //                     }}
// //                     secondaryAction={
// //                         <ButtonGroup
// //                             orientation="vertical"
// //                             variant="text"
// //                             size="small"
// //                             sx={{
// //                                 '& .MuiButton-root': {
// //                                     minWidth: 0,
// //                                     px: 1,
// //                                     fontSize: '0.75rem',
// //                                     // paddingRight: '0.75rem',
// //                                     paddingLeft: '1rem',
// //                                 }
// //                             }}
// //                         >

// //                             {/* <Button onClick={() => handleAction('take', items)}>
// //                                 Tomar
// //                             </Button>
// //                             <Button onClick={() => handleAction('wait', items)}>
// //                                 Espera
// //                             </Button>
// //                             <Button onClick={() => handleAction('complete', items)}>
// //                                 Listo
// //                             </Button> */}
// //                             <Button
// //                                 variant="outlined"
// //                                 size="small"
// //                                 startIcon={<PlayArrow />}
// //                                 onClick={() => handleAction('take', items)}
// //                                 sx={{ mx: 0.5 }}
// //                             >
// //                                 {/* Tomar */}
// //                             </Button>
// //                             <br />

// //                             <Button
// //                                 variant="outlined"
// //                                 size="small"
// //                                 startIcon={<HourglassTop />}
// //                                 onClick={() => handleAction('wait', items)}
// //                                 sx={{ mx: 0.5 }}
// //                             // color="warning"
// //                             >
// //                                 {/* Espera */}
// //                             </Button>

// //                             <br />

// //                             <Button
// //                                 variant="outlined"
// //                                 size="small"
// //                                 startIcon={<CheckCircle />}
// //                                 onClick={() => handleAction('complete', items)}
// //                                 sx={{ mx: 0.5 }}
// //                             // color="success"
// //                             >
// //                                 {/* Listo */}
// //                             </Button>
// //                         </ButtonGroup>
// //                     }
// //                 >
// //                     <br />
// //                     <br />
// //                     <br />
// //                     <Box sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         flex: 1,
// //                         gap: 1
// //                     }}>
// //                         <OrderDetails order={items} index={index} />
// //                     </Box>

// //                 </ListItem>
// //             ))}
// //         </List>
// //     );

// //     function handleAction(action: string, order: any) {
// //         // Implementa tu lógica aquí
// //     }
// // }










// // import React from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //     List,
// //     ListItem,
// //     IconButton,
// //     ButtonGroup,
// //     Button,
// //     ListItemText,
// //     Box,
// //     useTheme,
// //     Divider
// // } from '@mui/material';
// // import OrderDetails from './OrderDetails';
// // import { CheckCircle, HourglassTop, PlayArrow } from '@mui/icons-material';

// // export default function GutterlessList(props: any) {
// //     const { data } = props;
// //     const theme = useTheme();

// //     // Variantes de animación
// //     const listItemVariants = {
// //         hidden: { opacity: 0, y: 20 },
// //         visible: { 
// //             opacity: 1, 
// //             y: 0,
// //             transition: { duration: 0.3 }
// //         },
// //         hover: {
// //             scale: 1.01,
// //             boxShadow: theme.shadows[2],
// //             transition: { duration: 0.2 }
// //         }
// //     };

// //     const buttonVariants = {
// //         rest: { scale: 1 },
// //         hover: { scale: 1.05 },
// //         tap: { scale: 0.95 }
// //     };

// //     return (
// //         <List sx={{
// //             width: '100%',
// //             maxWidth: '100%',
// //             bgcolor: 'background.paper',
// //             p: 1
// //         }}>
// //             <AnimatePresence>
// //                 {data?.map((items: any, index: number) => (
// //                     <motion.div
// //                         key={`${items.id || index}`}
// //                         initial="hidden"
// //                         animate="visible"
// //                         exit="hidden"
// //                         variants={listItemVariants}
// //                         layout
// //                     >
// //                         <ListItem
// //                             component={motion.div}
// //                             whileHover="hover"
// //                             disableGutters
// //                             sx={{
// //                                 mb: 1,
// //                                 p: 1,
// //                                 border: `1px solid ${theme.palette.divider}`,
// //                                 borderRadius: 1,
// //                                 '&:hover': {
// //                                     bgcolor: 'action.hover'
// //                                 }
// //                             }}
// //                             secondaryAction={
// //                                 <ButtonGroup
// //                                     orientation="vertical"
// //                                     variant="text"
// //                                     size="small"
// //                                     sx={{
// //                                         '& .MuiButton-root': {
// //                                             minWidth: 0,
// //                                             px: 1,
// //                                             fontSize: '0.75rem',
// //                                             paddingLeft: '1rem',
// //                                         }
// //                                     }}
// //                                 >
// //                                     <Button
// //                                         component={motion.button}
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         variant="outlined"
// //                                         size="small"
// //                                         startIcon={<PlayArrow />}
// //                                         onClick={() => handleAction('take', items)}
// //                                         sx={{ mx: 0.5 }}
// //                                     >
// //                                         {/* Tomar */}
// //                                     </Button>
// //                                     <br />

// //                                     <Button
// //                                         component={motion.button}
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         variant="outlined"
// //                                         size="small"
// //                                         startIcon={<HourglassTop />}
// //                                         onClick={() => handleAction('wait', items)}
// //                                         sx={{ mx: 0.5 }}
// //                                     >
// //                                         {/* Espera */}
// //                                     </Button>

// //                                     <br />

// //                                     <Button
// //                                         component={motion.button}
// //                                         variants={buttonVariants}
// //                                         whileHover="hover"
// //                                         whileTap="tap"
// //                                         variant="outlined"
// //                                         size="small"
// //                                         startIcon={<CheckCircle />}
// //                                         onClick={() => handleAction('complete', items)}
// //                                         sx={{ mx: 0.5 }}
// //                                     >
// //                                     </Button>
// //                                 </ButtonGroup>
// //                             }
// //                         >
// //                             <br />
// //                             <br />
// //                             <br />
// //                             <Box sx={{
// //                                 display: 'flex',
// //                                 alignItems: 'center',
// //                                 flex: 1,
// //                                 gap: 1
// //                             }}>
// //                                 <OrderDetails order={items} index={index} />
// //                             </Box>
// //                         </ListItem>
// //                     </motion.div>
// //                 ))}
// //             </AnimatePresence>
// //         </List>
// //     );

// //     function handleAction(action: string, order: any) {
// //         // Implementa tu lógica aquí
// //     }
// // }



// import React, { ReactElement } from 'react';
// import { motion } from 'framer-motion';
// import {
//   List,
//   ListItem,
//   Box,
//   useTheme,
//   IconButton,
//   Chip,
//   Tooltip,
//   Stack,
//   useMediaQuery
// } from '@mui/material';
// import { CheckCircle, HourglassTop, PlayArrow, Pause } from '@mui/icons-material';
// import OrderDetails from './OrderDetails';

// interface OrderListProps {
//   data: any[];
//   loading: boolean;
//   onAction: (action: string, order: any) => void;
// }

// const statusConfig:any = {
//   pending: { color: 'warning', icon: <HourglassTop /> },
//   processing: { color: 'info', icon: <PlayArrow /> },
//   'in-progress': { color: 'primary', icon: <Pause /> },
//   finished: { color: 'success', icon: <CheckCircle /> },
//   cancelled: { color: 'error', icon: <CheckCircle /> }
// } as const;

// export default function OrdersList({ data, loading, onAction }: OrderListProps) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const getActions = (status: string) => {
//     const actions = {
//       pending: [{ action: 'take', icon: <PlayArrow />, label: 'Tomar', color: 'info' }],
//       processing: [
//         { action: 'wait', icon: <Pause />, label: 'Pausar', color: 'warning' },
//         { action: 'complete', icon: <CheckCircle />, label: 'Completar', color: 'success' }
//       ],
//       'in-progress': [{ action: 'complete', icon: <CheckCircle />, label: 'Completar', color: 'success' }]
//     };

//     return actions[status as keyof typeof actions] || [];
//   };

//   return (
//     <List sx={{ 
//       width: '100%',
//       p: 0,
//       '& .MuiListItem-root': {
//         display: 'flex',
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: isMobile ? 'flex-start' : 'center',
//         p: 2,
//         mb: 2,
//         borderRadius: 2,
//         border: `1px solid ${theme.palette.divider}`,
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: theme.shadows[1],
//         transition: 'all 0.2s ease',
//         '&:hover': {
//           boxShadow: theme.shadows[4],
//           transform: 'translateY(-2px)'
//         }
//       }
//     }}>
//       {data?.map((order, index) => (
//         <motion.div
//           key={order._id || index}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <ListItem>
//             {/* Contenido principal */}
//             <Box sx={{ 
//               flex: 1,
//               mr: isMobile ? 0 : 2,
//               mb: isMobile ? 1.5 : 0,
//               width: isMobile ? '100%' : 'auto'
//             }}>
//               <OrderDetails order={order} index={index} />
//             </Box>

//             {/* Controles */}
//             <Stack 
//               direction={isMobile ? 'row' : 'column'} 
//               spacing={1}
//               sx={{
//                 alignItems: 'center',
//                 justifyContent: isMobile ? 'space-between' : 'flex-end',
//                 width: isMobile ? '100%' : 'auto'
//               }}
//             >
//               {/* Estado */}
//               <Chip
//                 label={order.status}
//                 icon={statusConfig[order.status]?.icon}
//                 color={statusConfig[order.status]?.color || 'default'}
//                 size="small"
//                 sx={{ 
//                   minWidth: 100,
//                   justifyContent: 'flex-start',
//                   '& .MuiChip-icon': { ml: 0.5 }
//                 }}
//               />

//               {/* Botones de acción */}
//               <Stack direction="row" spacing={0.5}>
//                 {getActions(order.status).map((btn) => (
//                   <Tooltip key={btn.action} title={btn.label} arrow>
//                     <IconButton
//                       size="medium"
//                       onClick={() => onAction(btn.action, order)}
//                       disabled={loading}
//                       sx={{
//                         color: `${btn.color}.main`,
//                         backgroundColor: `${btn.color}.light`,
//                         '&:hover': {
//                           backgroundColor: `${btn.color}.main`,
//                           color: `${btn.color}.contrastText`
//                         }
//                       }}
//                     >
//                       {btn.icon}
//                     </IconButton>
//                   </Tooltip>
//                 ))}
//               </Stack>
//             </Stack>
//           </ListItem>
//         </motion.div>
//       ))}
//     </List>
//   );
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

const statusConfig: any = {
    pending: { color: 'warning', icon: <HourglassTop /> },
    processing: { color: 'info', icon: <PlayArrow /> },
    'in-progress': { color: 'primary', icon: <Pause /> },
    finished: { color: 'success', icon: <CheckCircle /> },
    cancelled: { color: 'error', icon: <CheckCircle /> }
} as const;

export default function OrdersList({ data, loading, onAction }: OrderListProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getActions = (order: any) => {
        // Acciones base según estado
        const baseActions = {
            pending: [{ action: 'take', icon: <PlayArrow />, label: 'Tomar orden', color: 'info' }],
            processing: [
                { action: 'pause', icon: <Pause />, label: 'Pausar orden', color: 'warning' },
                { action: 'complete', icon: <CheckCircle />, label: 'Completar orden', color: 'success' }
            ],
            'in-progress': [
                { action: 'resume', icon: <PlayArrow />, label: 'Continuar procesando', color: 'info' },
                { action: 'complete', icon: <CheckCircle />, label: 'Completar orden', color: 'success' }
            ],
            finished: [
                { action: 'reopen', icon: <Replay />, label: 'Reabrir orden', color: 'warning' }
            ],
            cancelled: [
                { action: 'reopen', icon: <Replay />, label: 'Reabrir orden', color: 'warning' }
            ]
        };

        // Obtener acciones según estado actual
        const statusActions = baseActions[order.status as keyof typeof baseActions] || [];

        // Acciones adicionales que pueden estar disponibles en cualquier estado
        const commonActions = [];

        // Si está pausado o en progreso, permitir cancelar
        if (['in-progress', 'processing'].includes(order.status)) {
            commonActions.push({
                action: 'cancel',
                icon: <CheckCircle />,
                label: 'Cancelar orden',
                color: 'error'
            });
        }

        // Si está completado o cancelado, permitir eliminar
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
                                                color: `${btn.color}.main`,
                                                backgroundColor: `${btn.color}.light`,
                                                '&:hover': {
                                                    backgroundColor: `${btn.color}.main`,
                                                    color: `${btn.color}.contrastText`
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