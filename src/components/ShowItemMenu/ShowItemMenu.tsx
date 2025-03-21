// import React from 'react';

// const ShowItemMenu = (props: any) => {
//     const { memoData, title } = props;

//     return (
//         <div>
//             <h2>ShowItemMenu</h2>
//             {memoData?.map(([sectionName, items]: [string, any[]], index: number) => (
//                 <div key={index}>
//                     <h3>{sectionName}</h3>
//                     <div>
//                         {items.map((item, itemIndex) => (
//                             <div key={itemIndex}>
//                                 <div>
//                                     {item.Name}--{item.Description}--<span>{item.Price}</span>
//                                 </div>


//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ShowItemMenu;

// import React, { useState } from 'react';
// import { Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

// // Definir un tipo para los ítems
// type Item = {
//     Name: string;
//     Description: string;
//     Price: number;
// };

// // Definir un tipo para memoData
// type Section = [string, Item[]];

// interface ShowItemMenuProps {
//     memoData: Section[];
//     title: string;
// }

// const ShowItemMenu: React.FC<ShowItemMenuProps> = (props) => {
//     console.log("🚀 ~ props:", props)
//     const { memoData, title } = props;
//     const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
//     console.log("🚀 ~ checkedItems:", checkedItems)

//     const handleToggle = (sectionIndex: number, itemIndex: number) => () => {
//         const key = `${sectionIndex}-${itemIndex}`;
//         setCheckedItems((prev) => ({
//             ...prev,
//             [key]: !prev[key],
//         }));
//     };

//     return (
//         <div>
//             <h2>{title}</h2>
//             {memoData?.map(([sectionName, items], sectionIndex) => (
//                 <div key={sectionIndex}>
//                     <h3>{sectionName}</h3>
//                     <List>
//                         {items.map((item, itemIndex) => {
//                             const key = `${sectionIndex}-${itemIndex}`;
//                             return (
//                                 <ListItem
//                                     key={itemIndex}
//                                     dense
//                                     component="button" // Usar component en lugar de button
//                                     onClick={handleToggle(sectionIndex, itemIndex)}
//                                 >
//                                     <ListItemIcon>
//                                         <Checkbox
//                                             edge="start"
//                                             checked={!!checkedItems[key]}
//                                             tabIndex={-1}
//                                             disableRipple
//                                         />
//                                     </ListItemIcon>
//                                     <ListItemText
//                                         primary={`${item.Name} -- ${item.Description}`}
//                                         secondary={`$${item.Price}`}
//                                     />
//                                 </ListItem>
//                             );
//                         })}
//                     </List>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ShowItemMenu;


// "use client"

// import type React from "react"
// import { useState } from "react"
// import {
//     AppBar,
//     Badge,
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Chip,
//     Collapse,
//     Divider,
//     Drawer,
//     Grid,
//     IconButton,
//     InputAdornment,
//     List,
//     ListItem,
//     ListItemText,
//     Paper,
//     Tab,
//     Tabs,
//     TextField,
//     Typography,
//     useTheme,
// } from "@mui/material"
// import {
//     Add as AddIcon,
//     Remove as RemoveIcon,
//     Info as InfoIcon,
//     ShoppingCart as ShoppingCartIcon,
//     Close as CloseIcon,
//     Search as SearchIcon,
// } from "@mui/icons-material"

// // Define types based on the provided data structure
// type Extra = {
//     name: string
//     price: number
// }

// type MenuItem = {
//     Menu_Title?: string
//     Item_Image: string
//     Section: string
//     Item_id: number
//     Name: string
//     Description: string
//     Price: string
//     extra?: string
//     extras: Extra[]
// }

// type MenuSection = [string, MenuItem[]]

// type OrderItem = {
//     item: MenuItem
//     quantity: number
//     selectedExtras: Extra[]
// }

// interface MenuProps {
//     title: string
//     memoData: MenuSection[]
// }

// export default function MenuRapidoMUI({ title, memoData }: MenuProps) {
//     console.log("🚀 ~ MenuRapidoMUI ~ memoData:", memoData)
//     const theme = useTheme()
//     const [activeTab, setActiveTab] = useState(0)
//     const [order, setOrder] = useState<OrderItem[]>([])
//     const [drawerOpen, setDrawerOpen] = useState(false)
//     const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({})
//     const [searchQuery, setSearchQuery] = useState("")

//     // Filter menu items based on search query
//     const filteredMenuItems =
//         searchQuery.trim() !== ""
//             ? memoData.flatMap(([_, items]) =>
//                 items.filter(
//                     (item) =>
//                         item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                         item.Description.toLowerCase().includes(searchQuery.toLowerCase()),
//                 ),
//             )
//             : []

//     // Check if we're in search mode
//     const isSearching = searchQuery.trim() !== ""

//     // Handle search input change
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(event.target.value)
//     }

//     // Clear search
//     const clearSearch = () => {
//         setSearchQuery("")
//     }

//     // Calculate total items and price
//     const totalItems = order.reduce((sum, item) => sum + item.quantity, 0)

//     // Helper to convert price string to number
//     const priceToNumber = (price: string): number => {
//         return Number.parseFloat(price.replace("$", "")) || 0
//     }

//     // Calculate total price including extras
//     const calculateTotalPrice = (): number => {
//         return order.reduce((sum, orderItem) => {
//             const itemPrice = priceToNumber(orderItem.item.Price) * orderItem.quantity
//             const extrasPrice = orderItem.selectedExtras.reduce(
//                 (extrasSum, extra) => extrasSum + (extra.price / 1000) * orderItem.quantity,
//                 0,
//             )
//             return sum + itemPrice + extrasPrice
//         }, 0)
//     }

//     // Add item to order
//     const addToOrder = (item: MenuItem) => {
//         setOrder((prevOrder) => {
//             const existingItemIndex = prevOrder.findIndex((orderItem) => orderItem.item.Item_id === item.Item_id)

//             if (existingItemIndex >= 0) {
//                 const newOrder = [...prevOrder]
//                 newOrder[existingItemIndex] = {
//                     ...newOrder[existingItemIndex],
//                     quantity: newOrder[existingItemIndex].quantity + 1,
//                 }
//                 return newOrder
//             } else {
//                 return [...prevOrder, { item, quantity: 1, selectedExtras: [] }]
//             }
//         })
//     }

//     // Remove item from order
//     const removeFromOrder = (item: MenuItem) => {
//         setOrder((prevOrder) => {
//             const existingItemIndex = prevOrder.findIndex((orderItem) => orderItem.item.Item_id === item.Item_id)

//             if (existingItemIndex >= 0) {
//                 const newOrder = [...prevOrder]
//                 if (newOrder[existingItemIndex].quantity > 1) {
//                     newOrder[existingItemIndex] = {
//                         ...newOrder[existingItemIndex],
//                         quantity: newOrder[existingItemIndex].quantity - 1,
//                     }
//                     return newOrder
//                 } else {
//                     return prevOrder.filter((orderItem) => orderItem.item.Item_id !== item.Item_id)
//                 }
//             }
//             return prevOrder
//         })
//     }

//     // Set quantity directly
//     const setItemQuantity = (item: MenuItem, quantity: number) => {
//         if (quantity <= 0) {
//             setOrder((prevOrder) => prevOrder.filter((orderItem) => orderItem.item.Item_id !== item.Item_id))
//         } else {
//             setOrder((prevOrder) => {
//                 const existingItemIndex = prevOrder.findIndex((orderItem) => orderItem.item.Item_id === item.Item_id)

//                 if (existingItemIndex >= 0) {
//                     const newOrder = [...prevOrder]
//                     newOrder[existingItemIndex] = {
//                         ...newOrder[existingItemIndex],
//                         quantity,
//                     }
//                     return newOrder
//                 } else {
//                     return [...prevOrder, { item, quantity, selectedExtras: [] }]
//                 }
//             })
//         }
//     }

//     // Toggle extra for an item
//     const toggleExtra = (itemId: number, extra: Extra) => {
//         setOrder((prevOrder) => {
//             const existingItemIndex = prevOrder.findIndex((orderItem) => orderItem.item.Item_id === itemId)

//             if (existingItemIndex >= 0) {
//                 const newOrder = [...prevOrder]
//                 const orderItem = newOrder[existingItemIndex]

//                 const hasExtra = orderItem.selectedExtras.some((e) => e.name === extra.name)

//                 if (hasExtra) {
//                     // Remove the extra
//                     newOrder[existingItemIndex] = {
//                         ...orderItem,
//                         selectedExtras: orderItem.selectedExtras.filter((e) => e.name !== extra.name),
//                     }
//                 } else {
//                     // Add the extra
//                     newOrder[existingItemIndex] = {
//                         ...orderItem,
//                         selectedExtras: [...orderItem.selectedExtras, extra],
//                     }
//                 }

//                 return newOrder
//             }

//             return prevOrder
//         })
//     }

//     // Check if an extra is selected for an item
//     const isExtraSelected = (itemId: number, extraName: string): boolean => {
//         const orderItem = order.find((item) => item.item.Item_id === itemId)
//         if (!orderItem) return false

//         return orderItem.selectedExtras.some((extra) => extra.name === extraName)
//     }

//     // Get quantity of an item in the order
//     const getItemQuantity = (itemId: number): number => {
//         const orderItem = order.find((item) => item.item.Item_id === itemId)
//         return orderItem ? orderItem.quantity : 0
//     }

//     // Toggle item details
//     const toggleItemDetails = (itemId: number) => {
//         setExpandedItems((prev) => ({
//             ...prev,
//             [itemId]: !prev[itemId],
//         }))
//     }

//     // Format price for display
//     const formatPrice = (price: number): string => {
//         return `$${price.toFixed(2)}`
//     }

//     // Handle tab change
//     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//         setActiveTab(newValue)
//     }

//     return (
//         <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f5f5f5" }}>
//             {/* Header with title and order button */}
//             <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
//                 <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="h6" component="h1" fontWeight="bold">
//                         {title}
//                     </Typography>
//                     <IconButton
//                         color="primary"
//                         onClick={() => setDrawerOpen(true)}
//                         size="small"
//                         sx={{ border: 1, borderColor: "primary.main", p: 1 }}
//                     >
//                         <Badge badgeContent={totalItems} color="primary">
//                             <ShoppingCartIcon />
//                         </Badge>
//                     </IconButton>
//                 </Box>

//                 {/* Search Bar */}
//                 <Box sx={{ px: 2, pb: 1 }}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         placeholder="Buscar platos..."
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon fontSize="small" />
//                                 </InputAdornment>
//                             ),
//                             endAdornment: searchQuery && (
//                                 <InputAdornment position="end">
//                                     <IconButton size="small" aria-label="clear search" onClick={clearSearch} edge="end">
//                                         <CloseIcon fontSize="small" />
//                                     </IconButton>
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{ mb: 1 }}
//                     />
//                 </Box>

//                 {/* Tabs */}
//                 <Tabs
//                     value={activeTab}
//                     onChange={handleTabChange}
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     sx={{
//                         minHeight: 40,
//                         "& .MuiTab-root": {
//                             minHeight: 40,
//                             py: 0.5,
//                             fontSize: "0.8rem",
//                             textTransform: "none",
//                         },
//                     }}
//                 >
//                     {memoData.map(([sectionName], index) => (
//                         <Tab key={sectionName} label={sectionName} id={`tab-${index}`} />
//                     ))}
//                 </Tabs>
//             </AppBar>

//             {/* Menu content */}
//             <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
//                 {/* Menu items */}
//                 <Box sx={{ height: "100%", overflow: "auto", p: 1 }}>
//                     {/* Search Results */}
//                     {isSearching ? (
//                         <Box sx={{ p: 1 }}>
//                             <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                                 Resultados de búsqueda ({filteredMenuItems.length})
//                             </Typography>

//                             {filteredMenuItems.length === 0 ? (
//                                 <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
//                                     <Typography>No se encontraron resultados</Typography>
//                                     <Typography variant="body2">Intenta con otra búsqueda</Typography>
//                                 </Box>
//                             ) : (
//                                 filteredMenuItems.map((item) => {
//                                     const quantity = getItemQuantity(item.Item_id)
//                                     const isExpanded = expandedItems[item.Item_id] || false

//                                     return (
//                                         <Card key={item.Item_id} sx={{ mb: 1, overflow: "hidden" }} elevation={1}>
//                                             <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
//                                                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                                                     <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                                             <Typography variant="subtitle2" noWrap sx={{ fontWeight: "medium" }}>
//                                                                 {item.Name}
//                                                             </Typography>
//                                                             <Chip
//                                                                 label={item.Section}
//                                                                 size="small"
//                                                                 variant="outlined"
//                                                                 sx={{ height: 20, fontSize: "0.6rem" }}
//                                                             />
//                                                             <IconButton size="small" onClick={() => toggleItemDetails(item.Item_id)} sx={{ p: 0.5 }}>
//                                                                 <InfoIcon fontSize="small" />
//                                                             </IconButton>
//                                                         </Box>
//                                                         <Typography variant="body2" color="text.secondary" fontWeight="medium">
//                                                             {item.Price}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
//                                                         {quantity > 0 ? (
//                                                             <>
//                                                                 <IconButton
//                                                                     size="small"
//                                                                     onClick={() => removeFromOrder(item)}
//                                                                     sx={{ border: 1, borderColor: "divider", p: 0.5 }}
//                                                                 >
//                                                                     <RemoveIcon fontSize="small" />
//                                                                 </IconButton>
//                                                                 <Typography variant="body2" fontWeight="bold" sx={{ width: 24, textAlign: "center" }}>
//                                                                     {quantity}
//                                                                 </Typography>
//                                                                 <IconButton
//                                                                     size="small"
//                                                                     onClick={() => addToOrder(item)}
//                                                                     sx={{ border: 1, borderColor: "divider", p: 0.5 }}
//                                                                 >
//                                                                     <AddIcon fontSize="small" />
//                                                                 </IconButton>
//                                                             </>
//                                                         ) : (
//                                                             <Button
//                                                                 variant="contained"
//                                                                 size="small"
//                                                                 onClick={() => addToOrder(item)}
//                                                                 sx={{ minWidth: "auto", px: 1, py: 0.5, fontSize: "0.75rem" }}
//                                                             >
//                                                                 Agregar
//                                                             </Button>
//                                                         )}
//                                                     </Box>
//                                                 </Box>

//                                                 <Collapse in={isExpanded}>
//                                                     <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider" }}>
//                                                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                                             {item.Description}
//                                                         </Typography>

//                                                         {quantity > 0 && (
//                                                             <>
//                                                                 {item.extras && item.extras.length > 0 && (
//                                                                     <Box sx={{ mb: 1.5 }}>
//                                                                         <Typography
//                                                                             variant="caption"
//                                                                             fontWeight="medium"
//                                                                             sx={{ mb: 0.5, display: "block" }}
//                                                                         >
//                                                                             Extras:
//                                                                         </Typography>
//                                                                         <Grid container spacing={0.5}>
//                                                                             {item.extras.map((extra) => (
//                                                                                 <Grid item xs={6} key={extra.name}>
//                                                                                     <Chip
//                                                                                         label={`${extra.name.replace(/_/g, " ")} $${(extra.price / 1000).toFixed(2)}`}
//                                                                                         size="small"
//                                                                                         variant={isExtraSelected(item.Item_id, extra.name) ? "filled" : "outlined"}
//                                                                                         color={isExtraSelected(item.Item_id, extra.name) ? "primary" : "default"}
//                                                                                         onClick={() => toggleExtra(item.Item_id, extra)}
//                                                                                         sx={{
//                                                                                             width: "100%",
//                                                                                             justifyContent: "space-between",
//                                                                                             height: "auto",
//                                                                                             py: 0.5,
//                                                                                         }}
//                                                                                     />
//                                                                                 </Grid>
//                                                                             ))}
//                                                                         </Grid>
//                                                                     </Box>
//                                                                 )}

//                                                                 <Grid container spacing={0.5}>
//                                                                     {[1, 2, 3, 4, 5].map((num) => (
//                                                                         <Grid item xs={2.4} key={num}>
//                                                                             <Button
//                                                                                 variant={quantity === num ? "contained" : "outlined"}
//                                                                                 size="small"
//                                                                                 fullWidth
//                                                                                 onClick={() => setItemQuantity(item, num)}
//                                                                                 sx={{ minWidth: "auto", py: 0.5 }}
//                                                                             >
//                                                                                 {num}
//                                                                             </Button>
//                                                                         </Grid>
//                                                                     ))}
//                                                                 </Grid>
//                                                             </>
//                                                         )}
//                                                     </Box>
//                                                 </Collapse>
//                                             </CardContent>
//                                         </Card>
//                                     )
//                                 })
//                             )}
//                         </Box>
//                     ) : (
//                         // Regular tab content - keep the existing code
//                         memoData.map(([sectionName, items], sectionIndex) => (
//                             <Box
//                                 key={sectionName}
//                                 role="tabpanel"
//                                 hidden={activeTab !== sectionIndex}
//                                 id={`tabpanel-${sectionIndex}`}
//                                 sx={{ p: 1, display: activeTab === sectionIndex ? "block" : "none" }}
//                             >
//                                 {items.map((item) => {
//                                     const quantity = getItemQuantity(item.Item_id)
//                                     const isExpanded = expandedItems[item.Item_id] || false

//                                     return (
//                                         <Card key={item.Item_id} sx={{ mb: 1, overflow: "hidden" }} elevation={1}>
//                                             <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
//                                                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                                                     <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                                             <Typography variant="subtitle2" noWrap sx={{ fontWeight: "medium" }}>
//                                                                 {item.Name}
//                                                             </Typography>
//                                                             <IconButton size="small" onClick={() => toggleItemDetails(item.Item_id)} sx={{ p: 0.5 }}>
//                                                                 <InfoIcon fontSize="small" />
//                                                             </IconButton>
//                                                         </Box>
//                                                         <Typography variant="body2" color="text.secondary" fontWeight="medium">
//                                                             {item.Price}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
//                                                         {quantity > 0 ? (
//                                                             <>
//                                                                 <IconButton
//                                                                     size="small"
//                                                                     onClick={() => removeFromOrder(item)}
//                                                                     sx={{ border: 1, borderColor: "divider", p: 0.5 }}
//                                                                 >
//                                                                     <RemoveIcon fontSize="small" />
//                                                                 </IconButton>
//                                                                 <Typography variant="body2" fontWeight="bold" sx={{ width: 24, textAlign: "center" }}>
//                                                                     {quantity}
//                                                                 </Typography>
//                                                                 <IconButton
//                                                                     size="small"
//                                                                     onClick={() => addToOrder(item)}
//                                                                     sx={{ border: 1, borderColor: "divider", p: 0.5 }}
//                                                                 >
//                                                                     <AddIcon fontSize="small" />
//                                                                 </IconButton>
//                                                             </>
//                                                         ) : (
//                                                             <Button
//                                                                 variant="contained"
//                                                                 size="small"
//                                                                 onClick={() => addToOrder(item)}
//                                                                 sx={{ minWidth: "auto", px: 1, py: 0.5, fontSize: "0.75rem" }}
//                                                             >
//                                                                 Agregar
//                                                             </Button>
//                                                         )}
//                                                     </Box>
//                                                 </Box>

//                                                 <Collapse in={isExpanded}>
//                                                     <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider" }}>
//                                                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                                             {item.Description}
//                                                         </Typography>

//                                                         {quantity > 0 && (
//                                                             <>
//                                                                 {item.extras && item.extras.length > 0 && (
//                                                                     <Box sx={{ mb: 1.5 }}>
//                                                                         <Typography
//                                                                             variant="caption"
//                                                                             fontWeight="medium"
//                                                                             sx={{ mb: 0.5, display: "block" }}
//                                                                         >
//                                                                             Extras:
//                                                                         </Typography>
//                                                                         <Grid container spacing={0.5}>
//                                                                             {item.extras.map((extra) => (
//                                                                                 <Grid item xs={6} key={extra.name}>
//                                                                                     <Chip
//                                                                                         label={`${extra.name.replace(/_/g, " ")} $${(extra.price / 1000).toFixed(2)}`}
//                                                                                         size="small"
//                                                                                         variant={isExtraSelected(item.Item_id, extra.name) ? "filled" : "outlined"}
//                                                                                         color={isExtraSelected(item.Item_id, extra.name) ? "primary" : "default"}
//                                                                                         onClick={() => toggleExtra(item.Item_id, extra)}
//                                                                                         sx={{
//                                                                                             width: "100%",
//                                                                                             justifyContent: "space-between",
//                                                                                             height: "auto",
//                                                                                             py: 0.5,
//                                                                                         }}
//                                                                                     />
//                                                                                 </Grid>
//                                                                             ))}
//                                                                         </Grid>
//                                                                     </Box>
//                                                                 )}

//                                                                 <Grid container spacing={0.5}>
//                                                                     {[1, 2, 3, 4, 5].map((num) => (
//                                                                         <Grid item xs={2.4} key={num}>
//                                                                             <Button
//                                                                                 variant={quantity === num ? "contained" : "outlined"}
//                                                                                 size="small"
//                                                                                 fullWidth
//                                                                                 onClick={() => setItemQuantity(item, num)}
//                                                                                 sx={{ minWidth: "auto", py: 0.5 }}
//                                                                             >
//                                                                                 {num}
//                                                                             </Button>
//                                                                         </Grid>
//                                                                     ))}
//                                                                 </Grid>
//                                                             </>
//                                                         )}
//                                                     </Box>
//                                                 </Collapse>
//                                             </CardContent>
//                                         </Card>
//                                     )
//                                 })}
//                             </Box>
//                         ))
//                     )}
//                 </Box>

//                 {/* Order drawer */}
//                 <Drawer
//                     anchor="right"
//                     open={drawerOpen}
//                     onClose={() => setDrawerOpen(false)}
//                     PaperProps={{
//                         sx: {
//                             width: { xs: "100%", sm: 400 },
//                             zIndex: 2147483647, // Valor máximo
//                           },
//                     }}
//                 >
//                     <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//                         {/* Encabezado del Drawer */}
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 borderBottom: 1,
//                                 borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Box>
//                                 <Typography variant="h6" component="h2" fontWeight="bold">
//                                     Orden Actual
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Total: {formatPrice(calculateTotalPrice())}
//                                 </Typography>
//                             </Box>
//                             <IconButton onClick={() => setDrawerOpen(false)}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </Box>

//                         {/* Lista de items en la orden */}
//                         <Box sx={{ flex: 1, overflow: "auto" }}>
//                             {order.length === 0 ? (
//                                 <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
//                                     <ShoppingCartIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
//                                     <Typography>No hay items en la orden</Typography>
//                                     <Typography variant="body2" sx={{ mt: 1 }}>
//                                         Agrega platos desde el menú
//                                     </Typography>
//                                 </Box>
//                             ) : (
//                                 <List sx={{ p: 2 }}>
//                                     {order.map((orderItem) => {
//                                         const itemTotal = priceToNumber(orderItem.item.Price) * orderItem.quantity;
//                                         const extrasTotal = orderItem.selectedExtras.reduce(
//                                             (sum, extra) => sum + (extra.price / 1000) * orderItem.quantity,
//                                             0,
//                                         );

//                                         return (
//                                             <Paper key={orderItem.item.Item_id} sx={{ mb: 2, overflow: "hidden" }} elevation={1}>
//                                                 <ListItem
//                                                     secondaryAction={
//                                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                                             <IconButton
//                                                                 edge="end"
//                                                                 size="small"
//                                                                 onClick={() => removeFromOrder(orderItem.item)}
//                                                                 sx={{ border: 1, borderColor: "divider" }}
//                                                             >
//                                                                 <RemoveIcon fontSize="small" />
//                                                             </IconButton>
//                                                             <Typography variant="body2" fontWeight="bold" sx={{ width: 24, textAlign: "center" }}>
//                                                                 {orderItem.quantity}
//                                                             </Typography>
//                                                             <IconButton
//                                                                 edge="end"
//                                                                 size="small"
//                                                                 onClick={() => addToOrder(orderItem.item)}
//                                                                 sx={{ border: 1, borderColor: "divider" }}
//                                                             >
//                                                                 <AddIcon fontSize="small" />
//                                                             </IconButton>
//                                                         </Box>
//                                                     }
//                                                     sx={{ pr: 12 }}
//                                                 >
//                                                     <ListItemText
//                                                         primary={orderItem.item.Name}
//                                                         secondary={`${orderItem.item.Price} c/u`}
//                                                         primaryTypographyProps={{ fontWeight: "medium" }}
//                                                     />
//                                                 </ListItem>

//                                                 {orderItem.selectedExtras.length > 0 && (
//                                                     <Box sx={{ px: 2, pb: 1 }}>
//                                                         {orderItem.selectedExtras.map((extra) => (
//                                                             <Box key={extra.name} sx={{ display: "flex", justifyContent: "space-between" }}>
//                                                                 <Typography variant="caption" color="text.secondary">
//                                                                     + {extra.name.replace(/_/g, " ")}
//                                                                 </Typography>
//                                                                 <Typography variant="caption" color="text.secondary">
//                                                                     ${(extra.price / 1000).toFixed(2)} c/u
//                                                                 </Typography>
//                                                             </Box>
//                                                         ))}
//                                                     </Box>
//                                                 )}

//                                                 <Divider />
//                                                 <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end" }}>
//                                                     <Typography variant="body2" fontWeight="medium">
//                                                         {formatPrice(itemTotal + extrasTotal)}
//                                                     </Typography>
//                                                 </Box>
//                                             </Paper>
//                                         );
//                                     })}
//                                 </List>
//                             )}
//                         </Box>

//                         {/* Pie del Drawer con el total y el botón de confirmar */}
//                         <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
//                             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                                 <Typography variant="subtitle1" fontWeight="bold">
//                                     Total
//                                 </Typography>
//                                 <Typography variant="subtitle1" fontWeight="bold">
//                                     {formatPrice(calculateTotalPrice())}
//                                 </Typography>
//                             </Box>
//                             <Button variant="contained" fullWidth size="large" disabled={order.length === 0}>
//                                 Confirmar Orden
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Drawer>
//                 {/* ///// */}
//             </Box>
//         </Box>
//     )
// }



"use client"

import React, { useState } from "react";
import {
  AppBar, Badge, Box, Button, Card, CardContent, Chip, Collapse, Divider, Drawer, Grid, IconButton,
  InputAdornment, List, ListItem, ListItemText, Paper, Tabs, Tab, TextField, Typography
} from "@mui/material";
import { Add, Remove, Info, ShoppingCart, Close, Search } from "@mui/icons-material";

type Extra = { name: string; price: number };
type MenuItem = { Item_id: number; Name: string; Description: string; Price: string; extras: Extra[] };
type MenuSection = [string, MenuItem[]];
type OrderItem = { item: MenuItem; quantity: number; selectedExtras: Extra[] };

interface MenuProps {
  title: string;
  memoData: MenuSection[];
}

export default function MenuRapidoMUI({ title, memoData }: MenuProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra los elementos del menú basados en la búsqueda
  const filteredMenuItems = searchQuery.trim()
    ? memoData.flatMap(([_, items]) =>
        items.filter(item =>
          item.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  // Calcula el total de items y el precio total
  const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = order.reduce((sum, orderItem) => {
    const itemPrice = parseFloat(orderItem.item.Price.replace("$", "")) * orderItem.quantity;
    const extrasPrice = orderItem.selectedExtras.reduce((sum, extra) => sum + (extra.price / 1000) * orderItem.quantity, 0);
    return sum + itemPrice + extrasPrice;
  }, 0);

  // Maneja la adición o eliminación de extras
  const toggleExtra = (itemId: number, extra: Extra) => {
    setOrder(prevOrder =>
      prevOrder.map(orderItem =>
        orderItem.item.Item_id === itemId
          ? {
              ...orderItem,
              selectedExtras: orderItem.selectedExtras.some(e => e.name === extra.name)
                ? orderItem.selectedExtras.filter(e => e.name !== extra.name)
                : [...orderItem.selectedExtras, extra],
            }
          : orderItem
      )
    );
  };

  // Verifica si un extra está seleccionado
  const isExtraSelected = (itemId: number, extraName: string): boolean =>
    order.find(item => item.item.Item_id === itemId)?.selectedExtras.some(extra => extra.name === extraName) || false;

  // Obtiene la cantidad de un item en la orden
  const getItemQuantity = (itemId: number): number =>
    order.find(item => item.item.Item_id === itemId)?.quantity || 0;

  // Formatea el precio para mostrarlo
  const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f5f5f5" }}>
      {/* Barra superior con título y botón de carrito */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="h1" fontWeight="bold">
            {title}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ border: 1, borderColor: "primary.main", p: 1 }}>
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>

        {/* Barra de búsqueda */}
        <Box sx={{ px: 2, pb: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar platos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery("")} edge="end">
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Pestañas del menú */}
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} variant="scrollable" scrollButtons="auto">
          {memoData.map(([sectionName], index) => (
            <Tab key={sectionName} label={sectionName} />
          ))}
        </Tabs>
      </AppBar>

      {/* Contenido del menú */}
      <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
        {(searchQuery ? filteredMenuItems : memoData[activeTab][1]).map((item) => {
          const quantity = getItemQuantity(item.Item_id);
          const isExpanded = expandedItems[item.Item_id] || false;

          return (
            <Card key={item.Item_id} sx={{ mb: 1 }} elevation={1}>
              <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: "medium" }}>
                      {item.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.Price}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {quantity > 0 ? (
                      <>
                        <IconButton size="small" onClick={() => setOrder(prev => prev.filter(o => o.item.Item_id !== item.Item_id || o.quantity > 1 ? { ...o, quantity: o.quantity - 1 } : o))}>
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" fontWeight="bold">
                          {quantity}
                        </Typography>
                        <IconButton size="small" onClick={() => setOrder(prev => prev.map(o => o.item.Item_id === item.Item_id ? { ...o, quantity: o.quantity + 1 } : o))}>
                          <Add fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <Button variant="contained" size="small" onClick={() => setOrder([...order, { item, quantity: 1, selectedExtras: [] }])}>
                        Agregar
                      </Button>
                    )}
                  </Box>
                </Box>
                <Collapse in={isExpanded}>
                  <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider" }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.Description}
                    </Typography>
                    {item.extras?.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" fontWeight="medium">
                          Extras:
                        </Typography>
                        <Grid container spacing={0.5}>
                          {item.extras.map((extra) => (
                            <Grid item xs={6} key={extra.name}>
                              <Chip
                                label={`${extra.name} $${(extra.price / 1000).toFixed(2)}`}
                                size="small"
                                variant={isExtraSelected(item.Item_id, extra.name) ? "filled" : "outlined"}
                                onClick={() => toggleExtra(item.Item_id, extra)}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Drawer de la orden */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 400, height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Orden Actual
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            {order.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
                <ShoppingCart sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                <Typography>No hay items en la orden</Typography>
              </Box>
            ) : (
              <List>
                {order.map((orderItem) => (
                  <Paper key={orderItem.item.Item_id} sx={{ mb: 2 }} elevation={1}>
                    <ListItem
                      secondaryAction={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <IconButton size="small" onClick={() => setOrder(prev => prev.filter(o => o.item.Item_id !== orderItem.item.Item_id || o.quantity > 1 ? { ...o, quantity: o.quantity - 1 } : o))}>
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" fontWeight="bold">
                            {orderItem.quantity}
                          </Typography>
                          <IconButton size="small" onClick={() => setOrder(prev => prev.map(o => o.item.Item_id === orderItem.item.Item_id ? { ...o, quantity: o.quantity + 1 } : o))}>
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText primary={orderItem.item.Name} secondary={`${orderItem.item.Price} c/u`} />
                    </ListItem>
                    {orderItem.selectedExtras.length > 0 && (
                      <Box sx={{ px: 2, pb: 1 }}>
                        {orderItem.selectedExtras.map((extra) => (
                          <Box key={extra.name} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="caption" color="text.secondary">
                              + {extra.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ${(extra.price / 1000).toFixed(2)} c/u
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                    <Divider />
                    <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end" }}>
                      <Typography variant="body2" fontWeight="medium">
                        {formatPrice(
                          parseFloat(orderItem.item.Price.replace("$", "")) * orderItem.quantity +
                            orderItem.selectedExtras.reduce((sum, extra) => sum + (extra.price / 1000) * orderItem.quantity, 0)
                        )}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {formatPrice(totalPrice)}
              </Typography>
            </Box>
            <Button variant="contained" fullWidth size="large" disabled={order.length === 0}>
              Confirmar Orden
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}