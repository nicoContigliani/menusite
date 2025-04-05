// import { Box, Button, Divider, FormControl, IconButton, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';

// import {
//     Search as SearchIcon,
//     ShoppingCart as ShoppingCartIcon,
//     Info as InfoIcon,
//     Add as AddIcon,
//     Remove as RemoveIcon,
//     Delete as DeleteIcon,
//     FilterList as FilterIcon,
//     LocalOffer as PromoIcon,
//     Check,
// } from "@mui/icons-material";

// import React from 'react'

// const OrderAsk = (props: any) => {
//     const {
//         cart,
//         removeFromCart,
//         addToCart,
//         openDetails,
//         incrementQuantity,
//         decrementQuantity,
//         calculateTotal,
//         comments,
//         setComments,
//         orderType,
//         handleOrderTypeChange,
//         tableNumber,
//         setTableNumber,
//         orderNumber,
//         setOrderNumber,
//         deliveryAddress,
//         setDeliveryAddress,
//         handleConfirmOrder
//     } = props;
//         console.log("🚀 ~ OrderAsk ~ cart:", cart)


//     return (
//         <Box sx={{ width: 320, p: 2 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//                 Pedido Actual
//             </Typography>
//             <Divider sx={{ mb: 2 }} />

//             {cart.length === 0 ? (
//                 <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
//                     El pedido está vacío
//                 </Typography>
//             ) : (
//                 <>
//                     <List sx={{ mb: 2 }}>
//                         {cart.map((item: any) => (
//                             <ListItem
//                                 key={item.id}
//                                 sx={{
//                                     flexDirection: "column",
//                                     alignItems: "flex-start",
//                                     borderBottom: "1px solid #eee",
//                                     py: 1,
//                                 }}
//                             >
//                                 <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
//                                     <Typography variant="body1">{item.name}</Typography>
//                                     <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)}>
//                                         <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                 </Box>

//                                 {item.extras.length > 0 && (
//                                     <Box sx={{ ml: 2, mb: 1 }}>
//                                         {item.extras.map((extra: any) => (
//                                             <Typography key={extra.name} variant="body2" color="text.secondary">
//                                                 + {extra.name.replace("_", " ")} (${extra.price})
//                                             </Typography>
//                                         ))}
//                                     </Box>
//                                 )}

//                                 <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
//                                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                                         <IconButton size="small" onClick={() => decrementQuantity(item.id)}>
//                                             <RemoveIcon fontSize="small" />
//                                         </IconButton>
//                                         <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
//                                         <IconButton size="small" onClick={() => incrementQuantity(item.id)}>
//                                             <AddIcon fontSize="small" />
//                                         </IconButton>
//                                     </Box>
//                                     <Typography variant="body2" fontWeight="bold">
//                                         ${((item.price + item.extrasTotal) * item.quantity).toFixed(2)}
//                                     </Typography>
//                                 </Box>
//                             </ListItem>
//                         ))}
//                     </List>

//                     <Divider sx={{ my: 2 }} />

//                     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//                         <Typography variant="h6">Total:</Typography>
//                         <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
//                     </Box>

//                     {/* Order Details Form */}
//                     <Box sx={{ maxWidth: 300, margin: "auto", mt: 2 }}>
//                         <Typography variant="h6" gutterBottom>
//                             Comentarios
//                         </Typography>
//                         <TextField
//                             fullWidth
//                             label="Comentarios"
//                             value={comments}
//                             onChange={(e) => setComments(e.target.value)}
//                             sx={{ mb: 1 }}
//                             size="small"
//                         />

//                         <Typography variant="h6" gutterBottom>
//                             Tipo de pedido
//                         </Typography>
//                         <FormControl fullWidth sx={{ mb: 1 }} size="small">
//                             <InputLabel>Tipo de Pedido</InputLabel>
//                             <Select value={orderType} onChange={handleOrderTypeChange} label="Tipo de Pedido">
//                                 <MenuItem value="mesa">Mesa</MenuItem>
//                                 <MenuItem value="para llevar">Para Llevar</MenuItem>
//                                 <MenuItem value="delivery">Delivery</MenuItem>
//                             </Select>
//                         </FormControl>

//                         {orderType === "mesa" && (
//                             <TextField
//                                 fullWidth
//                                 label="Número de Mesa"
//                                 value={tableNumber}
//                                 onChange={(e) => setTableNumber(e.target.value)}
//                                 sx={{ mb: 1 }}
//                                 size="small"
//                             />
//                         )}

//                         {orderType === "para llevar" && (
//                             <TextField
//                                 fullWidth
//                                 label="Número de Orden"
//                                 value={orderNumber}
//                                 onChange={(e) => setOrderNumber(e.target.value)}
//                                 sx={{ mb: 1 }}
//                                 size="small"
//                             />
//                         )}

//                         {orderType === "delivery" && (
//                             <TextField
//                                 fullWidth
//                                 label="Dirección de Entrega"
//                                 value={deliveryAddress}
//                                 onChange={(e) => setDeliveryAddress(e.target.value)}
//                                 sx={{ mb: 1 }}
//                                 size="small"
//                             />
//                         )}
//                     </Box>

//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         size="large"
//                         onClick={handleConfirmOrder}
//                         sx={{ mt: 2 }}
//                     >
//                         Confirmar Pedido
//                     </Button>
//                 </>
//             )}
//         </Box>
//     )
// }

// export default OrderAsk

import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';

import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    Info as InfoIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    FilterList as FilterIcon,
    LocalOffer as PromoIcon,
    Check
} from "@mui/icons-material";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
        },
    }),
};

const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
};

const OrderAsk = (props: any) => {
    const {
        cart,
        removeFromCart,
        addToCart,
        openDetails,
        incrementQuantity,
        decrementQuantity,
        calculateTotal,
        comments,
        setComments,
        orderType,
        handleOrderTypeChange,
        tableNumber,
        setTableNumber,
        orderNumber,
        setOrderNumber,
        deliveryAddress,
        setDeliveryAddress,
        handleConfirmOrder
    } = props;
    const [displayTitle, setDisplayTitle] = useState(true);
    const [showPromotions, setShowPromotions] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayTitle((prev: any) => !prev);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <Box sx={{ width: 320, p: 2 }}>
                <AppBar position="static"
                    component={motion.div}
                    initial={false}

                    transition={{ duration: 0.7 }}
                >
                    <Toolbar>
                        {/* Logo and Title */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexGrow: 1,
                            height: '40px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Avatar sx={{
                                    width: 28,
                                    height: 28,
                                    flexShrink: 0,
                                    ml: 0.5
                                }}>
                                    <Image
                                        src={"/images/flama.png"}
                                        alt={"LlakaScript"}
                                        width={28}
                                        height={28}
                                        priority
                                        style={{
                                            objectFit: 'contain',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </Avatar>
                            </motion.div>

                            <Box sx={{
                                position: 'relative',
                                width: 'auto',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexGrow: 1
                            }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={displayTitle ? 'llakascript' : 'menu-title'}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
                                            {displayTitle ? 'Pedido Actual' : 'Llakascript'}
                                        </Typography>
                                    </motion.div>
                                </AnimatePresence>
                            </Box>
                        </Box>



                    </Toolbar>
                </AppBar>

                <Divider sx={{ mb: 2 }} />

                {cart.length === 0 ? (
                    <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
                        El pedido está vacío
                    </Typography>
                ) : (
                    <>
                        <List sx={{ mb: 2 }}>
                            {cart.map((item: any, index: number) => (
                                <motion.div
                                    key={item.id}
                                    custom={index}
                                    variants={listVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <ListItem
                                        sx={{
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            borderBottom: "1px solid #eee",
                                            py: 1,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                            <Typography variant="body1">{item.name}</Typography>
                                            <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        {item.extras.length > 0 && (
                                            <Box sx={{ ml: 2, mb: 1 }}>
                                                {item.extras.map((extra: any) => (
                                                    <Typography key={extra.name} variant="body2" color="text.secondary">
                                                        + {extra.name.replace("_", " ")} (${extra.price})
                                                    </Typography>
                                                ))}
                                            </Box>
                                        )}

                                        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <IconButton size="small" onClick={() => decrementQuantity(item.id)}>
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                                                <IconButton size="small" onClick={() => incrementQuantity(item.id)}>
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="body2" fontWeight="bold">
                                                ${((item.price + item.extrasTotal) * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                </motion.div>
                            ))}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                            <Typography variant="h6">Total:</Typography>
                            <Typography variant="h6">${calculateTotal().toFixed(2)}</Typography>
                        </Box>

                        {/* Order Details Form */}
                        <Box sx={{ maxWidth: 300, margin: "auto", mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Comentarios
                            </Typography>
                            <TextField
                                fullWidth
                                label="Comentarios"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                sx={{ mb: 1 }}
                                size="small"
                            />

                            <Typography variant="h6" gutterBottom>
                                Tipo de pedido
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 1 }} size="small">
                                <InputLabel>Tipo de Pedido</InputLabel>
                                <Select value={orderType} onChange={handleOrderTypeChange} label="Tipo de Pedido">
                                    <MenuItem value="mesa">Mesa</MenuItem>
                                    <MenuItem value="para llevar">Para Llevar</MenuItem>
                                    <MenuItem value="delivery">Delivery</MenuItem>
                                </Select>
                            </FormControl>

                            {orderType === "mesa" && (
                                <TextField
                                    fullWidth
                                    label="Número de Mesa"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    sx={{ mb: 1 }}
                                    size="small"
                                />
                            )}

                            {orderType === "para llevar" && (
                                <TextField
                                    fullWidth
                                    label="Número de Orden"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    sx={{ mb: 1 }}
                                    size="small"
                                />
                            )}

                            {orderType === "delivery" && (
                                <TextField
                                    fullWidth
                                    label="Dirección de Entrega"
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    sx={{ mb: 1 }}
                                    size="small"
                                />
                            )}
                        </Box>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={handleConfirmOrder}
                                sx={{ mt: 2 }}
                            >
                                Confirmar Pedido
                            </Button>
                        </motion.div>
                    </>
                )}
            </Box>

        </motion.div>
    );
};

export default OrderAsk;
