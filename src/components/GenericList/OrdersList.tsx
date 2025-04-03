// import React from 'react';
// import {
//     List,
//     ListItem,
//     IconButton,
//     ButtonGroup,
//     Button,
//     ListItemText,
//     Box,
//     useTheme,
//     Divider
// } from '@mui/material';
// import OrderDetails from './OrderDetails';
// import { CheckCircle, HourglassTop, PlayArrow } from '@mui/icons-material';

// export default function GutterlessList(props: any) {
//     const { data } = props;
//     const theme = useTheme();

//     return (
//         <List sx={{
//             width: '100%',
//             maxWidth: '100%', // Elimina el límite de 360px
//             bgcolor: 'background.paper',
//             p: 1
//         }}>
//             {data?.map((items: any, index: number) => (

//                 <ListItem
//                     key={`${items.id || index}`} // Usa un identificador único real si existe
//                     disableGutters
//                     sx={{
//                         mb: 1,
//                         p: 1,
//                         border: `1px solid ${theme.palette.divider}`,
//                         borderRadius: 1,
//                         '&:hover': {
//                             bgcolor: 'action.hover'
//                         }
//                     }}
//                     secondaryAction={
//                         <ButtonGroup
//                             orientation="vertical"
//                             variant="text"
//                             size="small"
//                             sx={{
//                                 '& .MuiButton-root': {
//                                     minWidth: 0,
//                                     px: 1,
//                                     fontSize: '0.75rem',
//                                     // paddingRight: '0.75rem',
//                                     paddingLeft: '1rem',
//                                 }
//                             }}
//                         >

//                             {/* <Button onClick={() => handleAction('take', items)}>
//                                 Tomar
//                             </Button>
//                             <Button onClick={() => handleAction('wait', items)}>
//                                 Espera
//                             </Button>
//                             <Button onClick={() => handleAction('complete', items)}>
//                                 Listo
//                             </Button> */}
//                             <Button
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<PlayArrow />}
//                                 onClick={() => handleAction('take', items)}
//                                 sx={{ mx: 0.5 }}
//                             >
//                                 {/* Tomar */}
//                             </Button>
//                             <br />

//                             <Button
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<HourglassTop />}
//                                 onClick={() => handleAction('wait', items)}
//                                 sx={{ mx: 0.5 }}
//                             // color="warning"
//                             >
//                                 {/* Espera */}
//                             </Button>

//                             <br />

//                             <Button
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<CheckCircle />}
//                                 onClick={() => handleAction('complete', items)}
//                                 sx={{ mx: 0.5 }}
//                             // color="success"
//                             >
//                                 {/* Listo */}
//                             </Button>
//                         </ButtonGroup>
//                     }
//                 >
//                     <br />
//                     <br />
//                     <br />
//                     <Box sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         flex: 1,
//                         gap: 1
//                     }}>
//                         <OrderDetails order={items} index={index} />
//                     </Box>

//                 </ListItem>
//             ))}
//         </List>
//     );

//     function handleAction(action: string, order: any) {
//         // Implementa tu lógica aquí
//     }
// }



import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    List,
    ListItem,
    IconButton,
    ButtonGroup,
    Button,
    ListItemText,
    Box,
    useTheme,
    Divider
} from '@mui/material';
import OrderDetails from './OrderDetails';
import { CheckCircle, HourglassTop, PlayArrow } from '@mui/icons-material';

export default function GutterlessList(props: any) {
    const { data } = props;
    const theme = useTheme();

    // Variantes de animación
    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 }
        },
        hover: {
            scale: 1.01,
            boxShadow: theme.shadows[2],
            transition: { duration: 0.2 }
        }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <List sx={{
            width: '100%',
            maxWidth: '100%',
            bgcolor: 'background.paper',
            p: 1
        }}>
            <AnimatePresence>
                {data?.map((items: any, index: number) => (
                    <motion.div
                        key={`${items.id || index}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={listItemVariants}
                        layout
                    >
                        <ListItem
                            component={motion.div}
                            whileHover="hover"
                            disableGutters
                            sx={{
                                mb: 1,
                                p: 1,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                            secondaryAction={
                                <ButtonGroup
                                    orientation="vertical"
                                    variant="text"
                                    size="small"
                                    sx={{
                                        '& .MuiButton-root': {
                                            minWidth: 0,
                                            px: 1,
                                            fontSize: '0.75rem',
                                            paddingLeft: '1rem',
                                        }
                                    }}
                                >
                                    <Button
                                        component={motion.button}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        variant="outlined"
                                        size="small"
                                        startIcon={<PlayArrow />}
                                        onClick={() => handleAction('take', items)}
                                        sx={{ mx: 0.5 }}
                                    >
                                        {/* Tomar */}
                                    </Button>
                                    <br />

                                    <Button
                                        component={motion.button}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        variant="outlined"
                                        size="small"
                                        startIcon={<HourglassTop />}
                                        onClick={() => handleAction('wait', items)}
                                        sx={{ mx: 0.5 }}
                                    >
                                        {/* Espera */}
                                    </Button>

                                    <br />

                                    <Button
                                        component={motion.button}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        variant="outlined"
                                        size="small"
                                        startIcon={<CheckCircle />}
                                        onClick={() => handleAction('complete', items)}
                                        sx={{ mx: 0.5 }}
                                    >
                                    </Button>
                                </ButtonGroup>
                            }
                        >
                            <br />
                            <br />
                            <br />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: 1,
                                gap: 1
                            }}>
                                <OrderDetails order={items} index={index} />
                            </Box>
                        </ListItem>
                    </motion.div>
                ))}
            </AnimatePresence>
        </List>
    );

    function handleAction(action: string, order: any) {
        // Implementa tu lógica aquí
    }
}