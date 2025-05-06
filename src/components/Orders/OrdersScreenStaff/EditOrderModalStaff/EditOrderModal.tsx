// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     Button,
//     Paper,
//     Typography,
//     Tabs,
//     Tab,
//     Box,
//     Avatar,
//     Chip,
//     Divider,
//     useMediaQuery,
//     useTheme,
//     Alert
// } from "@mui/material";
// import { AddCircle, Delete, Edit, Close, Check, Comment, Notes } from "@mui/icons-material";

// interface MenuExtra {
//     name: string;
//     price: number;
// }

// interface MenuItem {
//     Menu_Title?: string;
//     Item_Image?: string;
//     Section: string;
//     Item_id: string | number;
//     Name: string;
//     Description: string;
//     Price: string | number;
//     highlight?: string;
//     status?: string;
//     extra?: string;
//     extras?: MenuExtra[];
// }

// interface CartExtra {
//     id: string;
//     name: string;
//     price: number;
// }

// type OrderStatus = 'pending' | 'processing' | 'paused' | 'finished' | 'cancelled' | 'delivered';

// interface CartItem {
//     id: string;
//     itemId: string | number;
//     name: string;
//     price: number;
//     quantity: number;
//     extras: CartExtra[];
//     comments: string;
//     description?: string;
//     extrasTotal?: number;
//     isPromotion?: boolean;
//     originalPrice?: number;
// }

// interface Order {
//     _id: string;
//     id: string;
//     orderType: any;
//     dataTypeOrder: any;
//     cart: CartItem[];
//     comments: string;
//     companiesName: string;
//     companiesID: string;
//     email: string;
//     fullname: string;
//     phone: string;
//     whatsapp?: string;
//     channel: string;
//     name: string;
//     timestamp: string;
//     status: OrderStatus;
//     createdAt: string;
//     updatedAt: string;
//     version: number;
// }

// interface EditOrderModalProps {
//     open: boolean;
//     handleClose: () => void;
//     order: Order;
//     onSave: (updatedOrder: Order) => void;
//     menuData: {
//         mainMenu: MenuItem[];
//         promotions: MenuItem[];
//     };
// }

// const parsePrice = (price: string | number): number => {
//     if (typeof price === 'number') return price;
//     const numericValue = parseFloat(price.replace(/[^0-9.-]+/g, ''));
//     return isNaN(numericValue) ? 0 : numericValue;
// };

// const EditOrderModal: React.FC<EditOrderModalProps> = ({
//     open,
//     handleClose,
//     order,
//     onSave,
//     menuData
// }) => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const [editedOrder, setEditedOrder] = useState<Order>(order);
//     const [isSaving, setIsSaving] = useState(false);
//     const [saveError, setSaveError] = useState<string | null>(null);
//     const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [activeTab, setActiveTab] = useState<'menu' | 'promotions'>('menu');
//     const [searchTerm, setSearchTerm] = useState('');

//     const calculateOrderTotal = (cart: CartItem[]) => {
//         return cart.reduce((total, item) => {
//             const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
//             return total + (item.price + extrasTotal) * item.quantity;
//         }, 0);
//     };

//     const orderTotal = calculateOrderTotal(editedOrder.cart);

//     const updateItem = (itemId: string, updates: Partial<CartItem>) => {
//         setEditedOrder(prev => ({
//             ...prev,
//             cart: prev.cart.map(item => 
//                 item.id === itemId ? { ...item, ...updates } : item
//             )
//         }));
//     };

//     const addItem = (newItem: CartItem) => {
//         setEditedOrder(prev => ({
//             ...prev,
//             cart: [...prev.cart, newItem]
//         }));
//     };

//     const removeItem = (itemId: string) => {
//         setEditedOrder(prev => ({
//             ...prev,
//             cart: prev.cart.filter(item => item.id !== itemId)
//         }));
//     };

//     const increaseQuantity = (itemId: string) => {
//         updateItem(itemId, {
//             quantity: (editedOrder.cart.find(item => item.id === itemId)?.quantity || 0 + 1)
//         });
//     };

//     const decreaseQuantity = (itemId: string) => {
//         const item = editedOrder.cart.find(item => item.id === itemId);
//         if (item && item.quantity > 1) {
//             updateItem(itemId, { quantity: item.quantity - 1 });
//         }
//     };

//     const updateOrderDetails = (updates: Partial<Order>) => {
//         setEditedOrder(prev => ({ ...prev, ...updates }));
//     };

//     const handleAddNewItem = (menuItem: MenuItem, isPromotion = false) => {
//         const price = parsePrice(menuItem.Price);
//         addItem({
//             id: Date.now().toString(),
//             itemId: menuItem.Item_id,
//             name: menuItem.Name,
//             price: price,
//             quantity: 1,
//             extras: [],
//             comments: '',
//             description: menuItem.Description,
//             isPromotion,
//             originalPrice: isPromotion ? price : undefined
//         });
//     };

//     const editItem = (item: CartItem) => {
//         setSelectedItem(item);
//         setIsEditing(true);
//     };

//     const saveEditedItem = () => {
//         if (!selectedItem) return;
//         updateItem(selectedItem.id, {
//             quantity: selectedItem.quantity,
//             comments: selectedItem.comments,
//             extras: selectedItem.extras
//         });
//         setIsEditing(false);
//         setSelectedItem(null);
//     };

//     const saveChanges = async () => {
//         setIsSaving(true);
//         setSaveError(null);
//         try {
//             await onSave(editedOrder);
//             handleClose();
//         } catch (error) {
//             setSaveError(error instanceof Error ? error.message : 'Error saving order');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const filteredMenuItems = (activeTab === 'menu' ? menuData.mainMenu : menuData.promotions)
//         .filter(item =>
//             item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.Description.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//     return (
//         <Dialog
//             open={open}
//             onClose={handleClose}
//             fullWidth
//             maxWidth="lg"
//             fullScreen={isMobile}
//         >
//             <DialogTitle sx={{ p: isMobile ? 1 : 2 }}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant={isMobile ? "subtitle1" : "h6"}>
//                         Editar Orden #{order.id} - {order.dataTypeOrder}
//                     </Typography>
//                     <IconButton onClick={handleClose} size={isMobile ? "small" : "medium"}>
//                         <Close />
//                     </IconButton>
//                 </Box>
//             </DialogTitle>

//             <DialogContent dividers sx={{ p: isMobile ? 0 : 2 }}>
//                 {isEditing && selectedItem ? (
//                     <Box sx={{ p: isMobile ? 1 : 2 }}>
//                         {/* Sección de edición de item */}
//                         <Box display="flex" alignItems="center" mb={2}>
//                             <Avatar
//                                 src={menuData.mainMenu.concat(menuData.promotions)
//                                     .find(m => m.Item_id === selectedItem.itemId)?.Item_Image}
//                                 sx={{ width: 60, height: 60, mr: 2 }}
//                             />
//                             <Box>
//                                 <Typography variant={isMobile ? "subtitle1" : "h6"}>
//                                     {selectedItem.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary">
//                                     {selectedItem.description}
//                                 </Typography>
//                                 <Box display="flex" alignItems="center" mt={0.5}>
//                                     <Typography variant="subtitle1">
//                                         ${selectedItem.price.toFixed(2)}
//                                     </Typography>
//                                     {selectedItem.isPromotion && selectedItem.originalPrice && (
//                                         <Typography
//                                             variant="body2"
//                                             color="textSecondary"
//                                             sx={{ textDecoration: 'line-through', ml: 1 }}
//                                         >
//                                             ${selectedItem.originalPrice.toFixed(2)}
//                                         </Typography>
//                                     )}
//                                 </Box>
//                             </Box>
//                         </Box>

//                         <Divider sx={{ my: 2 }} />

//                         <TextField
//                             label="Cantidad"
//                             type="number"
//                             value={selectedItem.quantity}
//                             onChange={(e) => setSelectedItem({
//                                 ...selectedItem,
//                                 quantity: Math.max(1, parseInt(e.target.value) || 1)
//                             })}
//                             fullWidth
//                             margin="normal"
//                             InputProps={{ inputProps: { min: 1 } }}
//                         />

//                         <TextField
//                             label="Comentarios para este plato"
//                             value={selectedItem.comments}
//                             onChange={(e) => setSelectedItem({
//                                 ...selectedItem,
//                                 comments: e.target.value
//                             })}
//                             fullWidth
//                             margin="normal"
//                             multiline
//                             rows={2}
//                             InputProps={{
//                                 startAdornment: <Comment color="action" sx={{ mr: 1 }} />,
//                             }}
//                         />

//                         <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
//                             Extras Disponibles
//                         </Typography>

//                         <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
//                             {menuData.mainMenu.concat(menuData.promotions)
//                                 .find(m => m.Item_id === selectedItem.itemId)?.extras?.map((extra, index) => {
//                                     const isSelected = selectedItem.extras.some((ex: any) => ex.name === extra.name);
//                                     return (
//                                         <Box
//                                             key={index}
//                                             display="flex"
//                                             justifyContent="space-between"
//                                             alignItems="center"
//                                             sx={{
//                                                 p: 1,
//                                                 borderBottom: '1px solid #eee',
//                                                 bgcolor: isSelected ? 'action.selected' : 'background.paper'
//                                             }}
//                                         >
//                                             <Box>
//                                                 <Typography>{extra.name}</Typography>
//                                                 <Typography variant="body2" color="textSecondary">
//                                                     ${extra.price.toFixed(2)}
//                                                 </Typography>
//                                             </Box>
//                                             <Button
//                                                 size="small"
//                                                 variant={isSelected ? "contained" : "outlined"}
//                                                 onClick={() => {
//                                                     if (isSelected) {
//                                                         setSelectedItem({
//                                                             ...selectedItem,
//                                                             extras: selectedItem.extras.filter((ex: any) => ex.name !== extra.name)
//                                                         });
//                                                     } else {
//                                                         setSelectedItem({
//                                                             ...selectedItem,
//                                                             extras: [
//                                                                 ...selectedItem.extras,
//                                                                 { id: Date.now().toString(), name: extra.name, price: extra.price }
//                                                             ]
//                                                         });
//                                                     }
//                                                 }}
//                                             >
//                                                 {isSelected ? "Quitar" : "Agregar"}
//                                             </Button>
//                                         </Box>
//                                     );
//                                 })}
//                         </Box>

//                         <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//                             <Button
//                                 variant="outlined"
//                                 onClick={() => setIsEditing(false)}
//                                 startIcon={<Close />}
//                                 size={isMobile ? "small" : "medium"}
//                             >
//                                 Cancelar
//                             </Button>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={saveEditedItem}
//                                 startIcon={<Check />}
//                                 size={isMobile ? "small" : "medium"}
//                             >
//                                 Guardar
//                             </Button>
//                         </Box>
//                     </Box>
//                 ) : (
//                     <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
//                         {/* Panel izquierdo - Menú */}
//                         <Box flex={1} sx={{ minWidth: 300 }}>
//                             <Tabs
//                                 value={activeTab}
//                                 onChange={(_, newValue) => setActiveTab(newValue)}
//                                 variant={isMobile ? "scrollable" : "fullWidth"}
//                                 scrollButtons={isMobile ? "auto" : false}
//                             >
//                                 <Tab label="Menú Principal" value="menu" />
//                                 <Tab label="Promociones" value="promotions" />
//                             </Tabs>

//                             <Box sx={{ p: 1 }}>
//                                 <TextField
//                                     fullWidth
//                                     margin="normal"
//                                     placeholder="Buscar platos..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     size={isMobile ? "small" : "medium"}
//                                 />
//                             </Box>

//                             <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
//                                 {filteredMenuItems.map((item) => (
//                                     <Paper
//                                         key={item.Item_id}
//                                         sx={{
//                                             p: 1,
//                                             m: 1,
//                                             cursor: 'pointer',
//                                             '&:hover': { bgcolor: 'action.hover' }
//                                         }}
//                                         onClick={() => handleAddNewItem(item, activeTab === 'promotions')}
//                                     >
//                                         <Box display="flex" alignItems="center" gap={1}>
//                                             <Avatar
//                                                 src={item.Item_Image}
//                                                 sx={{ width: 50, height: 50 }}
//                                             />
//                                             <Box flex={1} sx={{ overflow: 'hidden' }}>
//                                                 <Box display="flex" justifyContent="space-between">
//                                                     <Typography
//                                                         fontWeight="bold"
//                                                         noWrap
//                                                         sx={{ maxWidth: isMobile ? '120px' : '180px' }}
//                                                     >
//                                                         {item.Name}
//                                                     </Typography>
//                                                     <Typography>
//                                                         ${parsePrice(item.Price).toFixed(2)}
//                                                     </Typography>
//                                                 </Box>
//                                                 <Typography
//                                                     variant="body2"
//                                                     color="textSecondary"
//                                                     noWrap
//                                                     sx={{ maxWidth: '100%' }}
//                                                 >
//                                                     {item.Description}
//                                                 </Typography>
//                                                 {item.highlight && (
//                                                     <Chip
//                                                         label={item.highlight}
//                                                         size="small"
//                                                         sx={{ mt: 0.5 }}
//                                                         color={
//                                                             item.highlight.includes('Descuento') ? 'success' :
//                                                                 item.highlight.includes('Ahorro') ? 'info' : 'secondary'
//                                                         }
//                                                     />
//                                                 )}
//                                             </Box>
//                                         </Box>
//                                     </Paper>
//                                 ))}
//                             </Box>
//                         </Box>

//                         {/* Panel derecho - Resumen */}
//                         <Box flex={1} sx={{ minWidth: 300 }}>
//                             <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ p: 1 }}>
//                                 Resumen de la Orden
//                             </Typography>

//                             <TableContainer
//                                 component={Paper}
//                                 sx={{
//                                     maxHeight: isMobile ? 'calc(100vh - 320px)' : '400px',
//                                     overflow: 'auto'
//                                 }}
//                             >
//                                 <Table size="small" stickyHeader>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>Plato</TableCell>
//                                             {!isMobile && <TableCell align="right">Precio</TableCell>}
//                                             <TableCell align="center">Cant.</TableCell>
//                                             <TableCell align="right">Total</TableCell>
//                                             <TableCell>Acciones</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {editedOrder.cart.map((item) => (
//                                             <TableRow key={item.id} hover>
//                                                 <TableCell sx={{ maxWidth: isMobile ? 120 : 200 }}>
//                                                     <Box>
//                                                         <Typography fontWeight="bold" noWrap>
//                                                             {item.name}
//                                                         </Typography>
//                                                         {item.isPromotion && (
//                                                             <Chip
//                                                                 label="Promoción"
//                                                                 size="small"
//                                                                 color="secondary"
//                                                                 sx={{ mt: 0.5 }}
//                                                             />
//                                                         )}
//                                                         {item.extras.length > 0 && (
//                                                             <Box sx={{ mt: 0.5 }}>
//                                                                 {item.extras.map((extra) => (
//                                                                     <Typography
//                                                                         key={extra.id}
//                                                                         variant="body2"
//                                                                         color="textSecondary"
//                                                                         noWrap
//                                                                     >
//                                                                         + {extra.name} (${extra.price.toFixed(2)})
//                                                                     </Typography>
//                                                                 ))}
//                                                             </Box>
//                                                         )}
//                                                         {item.comments && (
//                                                             <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
//                                                                 <Comment fontSize="small" color="action" sx={{ mr: 0.5 }} />
//                                                                 <Typography
//                                                                     variant="caption"
//                                                                     color="textSecondary"
//                                                                     noWrap
//                                                                     sx={{ maxWidth: isMobile ? '80px' : 'none' }}
//                                                                 >
//                                                                     {item.comments}
//                                                                 </Typography>
//                                                             </Box>
//                                                         )}
//                                                     </Box>
//                                                 </TableCell>
//                                                 {!isMobile && (
//                                                     <TableCell align="right">
//                                                         ${item.price.toFixed(2)}
//                                                     </TableCell>
//                                                 )}
//                                                 <TableCell align="center">
//                                                     <Box display="flex" alignItems="center" justifyContent="center">
//                                                         <IconButton
//                                                             size="small"
//                                                             onClick={() => decreaseQuantity(item.id)}
//                                                             disabled={item.quantity <= 1}
//                                                         >
//                                                             -
//                                                         </IconButton>
//                                                         <Typography mx={1}>{item.quantity}</Typography>
//                                                         <IconButton
//                                                             size="small"
//                                                             onClick={() => increaseQuantity(item.id)}
//                                                         >
//                                                             +
//                                                         </IconButton>
//                                                     </Box>
//                                                 </TableCell>
//                                                 <TableCell align="right">
//                                                     ${((item.price + (item.extras?.reduce((sum, e) => sum + e.price, 0) || 0)) * item.quantity).toFixed(2)}
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <IconButton
//                                                         size="small"
//                                                         onClick={() => editItem(item)}
//                                                         color="primary"
//                                                     >
//                                                         <Edit fontSize="small" />
//                                                     </IconButton>
//                                                     <IconButton
//                                                         size="small"
//                                                         onClick={() => removeItem(item.id)}
//                                                         color="error"
//                                                     >
//                                                         <Delete fontSize="small" />
//                                                     </IconButton>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>

//                             <Box sx={{ p: 1, borderTop: '1px solid #eee' }}>
//                                 <Box display="flex" justifyContent="space-between" mb={1}>
//                                     <Typography variant="subtitle1">Total:</Typography>
//                                     <Typography variant="subtitle1">
//                                         ${orderTotal.toFixed(2)}
//                                     </Typography>
//                                 </Box>

//                                 <TextField
//                                     fullWidth
//                                     margin="normal"
//                                     label="Comentarios generales de la orden"
//                                     value={editedOrder.comments || ''}
//                                     onChange={(e) => updateOrderDetails({ comments: e.target.value })}
//                                     multiline
//                                     rows={2}
//                                     InputProps={{
//                                         startAdornment: <Notes color="action" sx={{ mr: 1 }} />,
//                                     }}
//                                 />
//                                 {saveError && (
//                                     <Alert severity="error">
//                                         {saveError}
//                                     </Alert>
//                                 )}
//                             </Box>
//                         </Box>
//                     </Box>
//                 )}
//             </DialogContent>

//             <DialogActions sx={{ p: isMobile ? 1 : 2 }}>
//                 <Button
//                     onClick={handleClose}
//                     variant="outlined"
//                     size={isMobile ? "small" : "medium"}
//                     disabled={isSaving}
//                 >
//                     Cancelar
//                 </Button>
//                 <Button
//                     onClick={saveChanges}
//                     variant="contained"
//                     color="primary"
//                     disabled={editedOrder.cart.length === 0 || isSaving}
//                     size={isMobile ? "small" : "medium"}
//                 >
//                     {isSaving ? 'Guardando...' : 'Guardar Cambios'}
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default EditOrderModal;



import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Paper,
    Typography,
    Tabs,
    Tab,
    Box,
    Avatar,
    Chip,
    Divider,
    useMediaQuery,
    useTheme,
    Alert
} from "@mui/material";
import { AddCircle, Delete, Edit, Close, Check, Comment, Notes } from "@mui/icons-material";

interface MenuExtra {
    name: string;
    price: number;
}

interface MenuItem {
    Menu_Title?: string;
    Item_Image?: string;
    Section: string;
    Item_id: string | number;
    Name: string;
    Description: string;
    Price: string | number;
    highlight?: string;
    status?: string;
    extra?: string;
    extras?: MenuExtra[];
}

interface CartExtra {
    id: string;
    name: string;
    price: number;
}

type OrderStatus = 'pending' | 'processing' | 'paused' | 'finished' | 'cancelled' | 'delivered';

interface CartItem {
    id: string;
    itemId: string | number;
    name: string;
    price: number;
    quantity: number;
    extras: CartExtra[];
    comments: string;
    description?: string;
    extrasTotal?: number;
    isPromotion?: boolean;
    originalPrice?: number;
}

interface Order {
    _id: string;
    id?: any;
    orderType: any;
    dataTypeOrder: any;
    cart: CartItem[];
    comments: string;
    companiesName: string;
    companiesID: string;
    email: string;
    fullname: string;
    phone: string;
    whatsapp?: string;
    channel: string;
    name: string;
    timestamp: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    version: number;
}

interface EditOrderModalProps {
    open: boolean;
    onClose: () => void;
    order?: Order|any;
    onSave: (updatedOrder: Order) => void;
    menuData: {
        mainMenu: MenuItem[];
        promotions: MenuItem[];
    };
    // handleClose: () => void; // Add this line

}

const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    const numericValue = parseFloat(price.replace(/[^0-9.-]+/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
};

const EditOrderModal: React.FC<EditOrderModalProps> = ({
    open,
    onClose,
    order,
    onSave,
    menuData,

}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [editedOrder, setEditedOrder] = useState<any>(order);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'menu' | 'promotions'>('menu');
    const [searchTerm, setSearchTerm] = useState('');

    // const calculateOrderTotal = (cart: CartItem[]) => {
    //     return cart.reduce((total, item) => {
    //         const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
    //         return total + (item.price + extrasTotal) * item.quantity;
    //     }, 0);
    // };
    const calculateOrderTotal = (cart: CartItem[]) => {
        return cart.reduce((total, item) => {
            const extrasTotal = Array.isArray(item.extras)
                ? item.extras.reduce((sum, extra) => sum + extra.price, 0)
                : 0;
            return total + (item.price + extrasTotal) * item.quantity;
        }, 0);
    };

    const orderTotal = calculateOrderTotal(editedOrder.cart);

    const updateItem = (itemId: string, updates: Partial<CartItem>) => {
        setEditedOrder((prev: any) => ({
            ...prev,
            cart: prev.cart.map((item: any) =>
                item.id === itemId ? { ...item, ...updates } : item
            )
        }));
    };

    const addItem = (newItem: CartItem) => {
        setEditedOrder((prev: any) => ({
            ...prev,
            cart: [...prev.cart, newItem]
        }));
    };

    const removeItem = (itemId: string) => {
        setEditedOrder((prev: any) => ({
            ...prev,
            cart: prev.cart.filter((item: any) => item.id !== itemId)
        }));
    };

    const increaseQuantity = (itemId: string) => {
        const item = editedOrder.cart.find((item: any) => item.id === itemId);
        if (item) {
            updateItem(itemId, { quantity: item.quantity + 1 });
        }
    };

    const decreaseQuantity = (itemId: string) => {
        const item = editedOrder.cart.find((item: any) => item.id === itemId);
        if (item && item.quantity > 1) {
            updateItem(itemId, { quantity: item.quantity - 1 });
        }
    };

    const updateOrderDetails = (updates: Partial<Order>) => {
        setEditedOrder((prev: any) => ({ ...prev, ...updates }));
    };

    const handleAddNewItem = (menuItem: MenuItem, isPromotion = false) => {
        const price = parsePrice(menuItem.Price);
        addItem({
            id: Date.now().toString(),
            itemId: menuItem.Item_id,
            name: menuItem.Name,
            price: price,
            quantity: 1,
            extras: [],
            comments: '',
            description: menuItem.Description,
            isPromotion,
            originalPrice: isPromotion ? price : undefined
        });
    };

    const editItem = (item: CartItem) => {
        setSelectedItem(item);
        setIsEditing(true);
    };

    const saveEditedItem = () => {
        if (!selectedItem) return;
        updateItem(selectedItem.id, {
            quantity: selectedItem.quantity,
            comments: selectedItem.comments,
            extras: selectedItem.extras
        });
        setIsEditing(false);
        setSelectedItem(null);
    };

    const saveChanges = async () => {
        setIsSaving(true);
        setSaveError(null);
        try {
            await onSave(editedOrder);
            onClose();
        } catch (error) {
            setSaveError(error instanceof Error ? error.message : 'Error saving order');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredMenuItems = (activeTab === 'menu' ? menuData.mainMenu : menuData.promotions)
        .filter(item =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Description.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            fullScreen={isMobile}
        >
            <DialogTitle sx={{ p: isMobile ? 1 : 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant={isMobile ? "subtitle1" : "h6"}>
                        Editar Orden #{order?.id} - {order?.dataTypeOrder}
                    </Typography>
                    <IconButton onClick={onClose} size={isMobile ? "small" : "medium"}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: isMobile ? 0 : 2 }}>
                {isEditing && selectedItem ? (
                    <Box sx={{ p: isMobile ? 1 : 2 }}>
                        {/* Sección de edición de item */}
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                                src={menuData.mainMenu.concat(menuData.promotions)
                                    .find(m => m.Item_id === selectedItem.itemId)?.Item_Image}
                                sx={{ width: 60, height: 60, mr: 2 }}
                            />
                            <Box>
                                <Typography variant={isMobile ? "subtitle1" : "h6"}>
                                    {selectedItem.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {selectedItem.description}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={0.5}>
                                    <Typography variant="subtitle1">
                                        ${selectedItem.price.toFixed(2)}
                                    </Typography>
                                    {selectedItem.isPromotion && selectedItem.originalPrice && (
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ textDecoration: 'line-through', ml: 1 }}
                                        >
                                            ${selectedItem.originalPrice.toFixed(2)}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <TextField
                            label="Cantidad"
                            type="number"
                            value={selectedItem.quantity}
                            onChange={(e) => setSelectedItem({
                                ...selectedItem,
                                quantity: Math.max(1, parseInt(e.target.value) || 1)
                            })}
                            fullWidth
                            margin="normal"
                            InputProps={{ inputProps: { min: 1 } }}
                        />

                        <TextField
                            label="Comentarios para este plato"
                            value={selectedItem.comments}
                            onChange={(e) => setSelectedItem({
                                ...selectedItem,
                                comments: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                            InputProps={{
                                startAdornment: <Comment color="action" sx={{ mr: 1 }} />,
                            }}
                        />

                        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                            Extras Disponibles
                        </Typography>

                        <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                            {menuData.mainMenu.concat(menuData.promotions)
                                .find(m => m.Item_id === selectedItem.itemId)?.extras?.map((extra, index) => {
                                    const isSelected = selectedItem.extras.some((ex: any) => ex.name === extra.name);
                                    return (
                                        <Box
                                            key={index}
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{
                                                p: 1,
                                                borderBottom: '1px solid #eee',
                                                bgcolor: isSelected ? 'action.selected' : 'background.paper'
                                            }}
                                        >
                                            <Box>
                                                <Typography>{extra.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    ${extra.price.toFixed(2)}
                                                </Typography>
                                            </Box>
                                            <Button
                                                size="small"
                                                variant={isSelected ? "contained" : "outlined"}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedItem({
                                                            ...selectedItem,
                                                            extras: selectedItem.extras.filter((ex: any) => ex.name !== extra.name)
                                                        });
                                                    } else {
                                                        setSelectedItem({
                                                            ...selectedItem,
                                                            extras: [
                                                                ...selectedItem.extras,
                                                                { id: Date.now().toString(), name: extra.name, price: extra.price }
                                                            ]
                                                        });
                                                    }
                                                }}
                                            >
                                                {isSelected ? "Quitar" : "Agregar"}
                                            </Button>
                                        </Box>
                                    );
                                })}
                        </Box>

                        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                startIcon={<Close />}
                                size={isMobile ? "small" : "medium"}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={saveEditedItem}
                                startIcon={<Check />}
                                size={isMobile ? "small" : "medium"}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                        {/* Panel izquierdo - Menú */}
                        <Box flex={1} sx={{ minWidth: 300 }}>
                            <Tabs
                                value={activeTab}
                                onChange={(_, newValue) => setActiveTab(newValue)}
                                variant={isMobile ? "scrollable" : "fullWidth"}
                                scrollButtons={isMobile ? "auto" : false}
                            >
                                <Tab label="Menú Principal" value="menu" />
                                <Tab label="Promociones" value="promotions" />
                            </Tabs>

                            <Box sx={{ p: 1 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    placeholder="Buscar platos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    size={isMobile ? "small" : "medium"}
                                />
                            </Box>

                            <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
                                {filteredMenuItems.map((item) => (
                                    <Paper
                                        key={item.Item_id}
                                        sx={{
                                            p: 1,
                                            m: 1,
                                            cursor: 'pointer',
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                        onClick={() => handleAddNewItem(item, activeTab === 'promotions')}
                                    >
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Avatar
                                                src={item.Item_Image}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                            <Box flex={1} sx={{ overflow: 'hidden' }}>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography
                                                        fontWeight="bold"
                                                        noWrap
                                                        sx={{ maxWidth: isMobile ? '120px' : '180px' }}
                                                    >
                                                        {item.Name}
                                                    </Typography>
                                                    <Typography>
                                                        ${parsePrice(item.Price).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    noWrap
                                                    sx={{ maxWidth: '100%' }}
                                                >
                                                    {item.Description}
                                                </Typography>
                                                {item.highlight && (
                                                    <Chip
                                                        label={item.highlight}
                                                        size="small"
                                                        sx={{ mt: 0.5 }}
                                                        color={
                                                            item.highlight.includes('Descuento') ? 'success' :
                                                                item.highlight.includes('Ahorro') ? 'info' : 'secondary'
                                                        }
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </Box>

                        {/* Panel derecho - Resumen */}
                        <Box flex={1} sx={{ minWidth: 300 }}>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ p: 1 }}>
                                Resumen de la Orden
                            </Typography>

                            <TableContainer
                                component={Paper}
                                sx={{
                                    maxHeight: isMobile ? 'calc(100vh - 320px)' : '400px',
                                    overflow: 'auto'
                                }}
                            >
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Plato</TableCell>
                                            {!isMobile && <TableCell align="right">Precio</TableCell>}
                                            <TableCell align="center">Cant.</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {editedOrder.cart.map((item: any) => (
                                            <TableRow key={item.id} hover>
                                                <TableCell sx={{ maxWidth: isMobile ? 120 : 200 }}>
                                                    <Box>
                                                        <Typography fontWeight="bold" noWrap>
                                                            {item.name}
                                                        </Typography>
                                                        {item.isPromotion && (
                                                            <Chip
                                                                label="Promoción"
                                                                size="small"
                                                                color="secondary"
                                                                sx={{ mt: 0.5 }}
                                                            />
                                                        )}
                                                        {item?.extras?.length > 0 && (
                                                            <Box sx={{ mt: 0.5 }}>
                                                                {item.extras.map((extra: any) => (
                                                                    <Typography
                                                                        key={extra.id}
                                                                        variant="body2"
                                                                        color="textSecondary"
                                                                        noWrap
                                                                    >
                                                                        + {extra.name} (${extra.price.toFixed(2)})
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        )}
                                                        {item.comments && (
                                                            <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                                                                <Comment fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                                                <Typography
                                                                    variant="caption"
                                                                    color="textSecondary"
                                                                    noWrap
                                                                    sx={{ maxWidth: isMobile ? '80px' : 'none' }}
                                                                >
                                                                    {item.comments}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                {!isMobile && (
                                                    <TableCell align="right">
                                                        ${item.price.toFixed(2)}
                                                    </TableCell>
                                                )}
                                                <TableCell align="center">
                                                    <Box display="flex" alignItems="center" justifyContent="center">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => decreaseQuantity(item.id)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </IconButton>
                                                        <Typography mx={1}>{item.quantity}</Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => increaseQuantity(item.id)}
                                                        >
                                                            +
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    ${((item.price + (item.extras?.reduce((sum: any, e: any) => sum + e.price, 0) || 0)) * item.quantity).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => editItem(item)}
                                                        color="primary"
                                                    >
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => removeItem(item.id)}
                                                        color="error"
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ p: 1, borderTop: '1px solid #eee' }}>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="subtitle1">Total:</Typography>
                                    <Typography variant="subtitle1">
                                        ${orderTotal.toFixed(2)}
                                    </Typography>
                                </Box>

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Comentarios generales de la orden"
                                    value={editedOrder.comments || ''}
                                    onChange={(e) => updateOrderDetails({ comments: e.target.value })}
                                    multiline
                                    rows={2}
                                    InputProps={{
                                        startAdornment: <Notes color="action" sx={{ mr: 1 }} />,
                                    }}
                                />
                                {saveError && (
                                    <Alert severity="error">
                                        {saveError}
                                    </Alert>
                                )}
                            </Box>
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: isMobile ? 1 : 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    disabled={isSaving}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={saveChanges}
                    variant="contained"
                    color="primary"
                    disabled={editedOrder.cart.length === 0 || isSaving}
                    size={isMobile ? "small" : "medium"}
                >
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOrderModal;