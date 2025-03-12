// import React, { useState } from 'react';
// import { Button, Modal, Input, Form } from 'antd';

// interface Props {
//     orderdescription: any[];
//     delivery?: boolean;
//     takeaway?: boolean;
//     Dinein?: boolean;
//     table?: any;
//     direction?: string;
//     username?: string;
//     userid?: any;
//     orderplaced?: any;
//     ordertaken?: any;
//     orderrecived?: any;
//     onChange: (value: any) => void;
//     value: any;
//     className?: string;  // Para permitir clases CSS desde el padre
//     color?: string
//     type?: any
// }

// const SelectComponent = (props: Props) => {
//     const { delivery, takeaway, Dinein, className, onChange, color, type = "default" } = props;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [orderType, setOrderType] = useState<string | null>(null);
//     const [inputValue, setInputValue] = useState<string>("");
//     const [clarification, setClarification] = useState<string>("");

//     const showModal = (type: string) => {
//         setOrderType(type);
//         setIsModalVisible(true);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const handleOk = () => {
//         if (inputValue) {
//             onChange({ inputValue, clarification });
//             setIsModalVisible(false);
//             setInputValue("");
//             setClarification("");
//         }
//     };

//     return (

//         <div className={className} style={{ display: 'flex', justifyContent: 'left' }}> {/* Usamos el className recibido del padre */}
//             {delivery && (
//                 <Button
//                     type={type}
//                     variant="outlined"
//                     block
//                     style={{ color: `${color}`, margin: "10px", backgroundColor: 'transparent' }}
//                     onClick={() => showModal("delivery")}>

//                     Delivery
//                 </Button>
//             )}
//             {takeaway && (
//                 <Button
//                     variant="outlined" type="dashed" block
//                     style={{ color: 'white', margin: "10px", backgroundColor: 'transparent' }} onClick={() => showModal("delivery")}>
//                     Takeaway
//                 </Button>
//             )}
//             {Dinein && (
//                 <Button
//                     variant="outlined" type="dashed" block
//                     style={{ color: 'white', margin: "10px", backgroundColor: 'transparent' }} onClick={() => showModal("delivery")}>
//                     Dine-in
//                 </Button>
//             )}

//             <Modal
//                 title={`Order Details - ${orderType}`}
//                 open={isModalVisible}  // <---- Aquí el cambio
//                 onCancel={handleCancel}
//                 footer={[
//                     <Button key="submit"
//                         type="primary"
//                         onClick={handleOk}>
//                         Submit
//                     </Button>,
//                     <Button key="back" onClick={handleCancel}>
//                         Cancel
//                     </Button>,
//                 ]}
//             >
//                 <Form>
//                     {orderType === "delivery" || orderType === "takeaway" ? (
//                         <Form.Item label="Enter your Location">
//                             <Input
//                                 value={inputValue}
//                                 onChange={(e) => setInputValue(e.target.value)}
//                                 placeholder="Your address"
//                             />
//                         </Form.Item>
//                     ) : orderType === "dinein" ? (
//                         <Form.Item label="Enter your Table Number">
//                             <Input
//                                 value={inputValue}
//                                 onChange={(e) => setInputValue(e.target.value)}
//                                 placeholder="Table number"
//                             />
//                         </Form.Item>
//                     ) : null}

//                     <Form.Item label="Any Clarifications?">
//                         <Input.TextArea
//                             value={clarification}
//                             onChange={(e) => setClarification(e.target.value)}
//                             placeholder="Example: No sauce"
//                             rows={4}
//                         />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default SelectComponent;



//************************************************** */



// "use client"

// import type React from "react"

// import { useState, useMemo } from "react"
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Box,
//     Typography,
//     Fade,
//     alpha,
//     useTheme,
// } from "@mui/material"
// import { LocalShipping, TakeoutDining, Restaurant } from "@mui/icons-material"
// import { FaMotorcycle,FaWallet } from "react-icons/fa"

// // Mapa de nombres de colores a valores hexadecimales
// const colorMap: Record<string, string> = {
//     white: "#ffffff",
//     black: "#000000",
//     red: "#f44336",
//     blue: "#2196f3",
//     green: "#4caf50",
//     yellow: "#ffeb3b",
//     purple: "#9c27b0",
//     grey: "#9e9e9e",
//     orange: "#ff9800",
// }

// // Función para convertir nombres de colores a hexadecimal si es necesario
// const getColorValue = (color: string): string => {
//     return colorMap[color.toLowerCase()] || color
// }

// interface OrderOption {
//     id: string
//     label: string
//     icon: React.ReactNode
//     fieldLabel: string
//     placeholder: string
// }

// interface Props {
//     orderdescription: any[]
//     delivery?: boolean
//     takeaway?: boolean
//     Dinein?: boolean
//     table?: any
//     direction?: string
//     username?: string
//     userid?: any
//     orderplaced?: any
//     ordertaken?: any
//     orderrecived?: any
//     onChange: (value: any) => void
//     value: any
//     className?: string
//     color?: string
//     type?: "text" | "outlined" | "contained"
//     size?: "small" | "medium" | "large"
// }

// const SelectComponent = (props: Props) => {
//     console.log("🚀 ~ SelectComponent ~ props:", props)
//     const { delivery, takeaway, Dinein, className, onChange, color = "white", type = "outlined", size = "small" } = props

//     const theme = useTheme()
//     const [isDialogOpen, setIsDialogOpen] = useState(false)
//     const [orderType, setOrderType] = useState<string | null>(null)
//     const [inputValue, setInputValue] = useState<string>("")
//     const [clarification, setClarification] = useState<string>("")

//     // Definir opciones de pedido de manera centralizada
//     const orderOptions = useMemo<OrderOption[]>(
//         () => [
//             {
//                 id: "delivery",
//                 label: "Delivery",
//                 icon: <FaMotorcycle fontSize="small" />,
//                 fieldLabel: "Delivery Address",
//                 placeholder: "Enter your delivery address",
//             },
//             {
//                 id: "takeaway",
//                 label: "Takeaway",
//                 icon: <TakeoutDining fontSize="small" />,
//                 fieldLabel: "Pickup Details",
//                 placeholder: "Enter your name for pickup",
//             },
//             {
//                 id: "dinein",
//                 label: "Dine-in",
//                 icon: <Restaurant fontSize="small" />,
//                 fieldLabel: "Table Number",
//                 placeholder: "Enter your table number",
//             },
//         ],
//         [],
//     )


//     const showDialog = (type: string) => {
//         setOrderType(type)
//         setIsDialogOpen(true)
//     }

//     const handleClose = () => {
//         setIsDialogOpen(false)
//     }

//     const handleSubmit = () => {
//         if (inputValue) {
//             onChange({ inputValue, clarification, orderType })
//             setIsDialogOpen(false)
//             setInputValue("")
//             setClarification("")
//         }
//     }

//     // Obtener la opción actual seleccionada
//     const currentOption = orderOptions.find((option) => option.id === orderType)

//     return (
//         <Box className={className}
//             //  sx={{ display: "flex", gap: 1 }}
//             sx={{
//                 display: "flex",
//                 gap: 1.5,
//                 flexDirection: { xs: "column", sm: "row" }, // Apilado en móviles, en fila en pantallas grandes
//                 alignItems: { xs: "stretch", sm: "center" },
//             }}
//         >
//             {delivery && <OrderButton option={orderOptions[0]} color={color} type={type} size={size} onClick={showDialog} />}

//             {takeaway && <OrderButton option={orderOptions[1]} color={color} type={type} size={size} onClick={showDialog} />}

//             {Dinein && <OrderButton option={orderOptions[2]} color={color} type={type} size={size} onClick={showDialog} />}

//             <Dialog
//                 open={isDialogOpen}
//                 onClose={handleClose}
//                 TransitionComponent={Fade}
//                 transitionDuration={300}
//                 PaperProps={{
//                     elevation: 3,
//                     sx: {
//                         borderRadius: 2,
//                         overflow: "hidden",
//                     },
//                 }}
//                 maxWidth="xs"
//                 fullWidth
//             >
//                 <DialogTitle
//                     sx={{
//                         pb: 1,
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                     }}
//                 >
//                     {currentOption?.icon}
//                     <Typography variant="h6" component="span">
//                         {currentOption?.label} Order
//                     </Typography>
//                 </DialogTitle>

//                 <DialogContent sx={{ pt: 3, pb: 2 }}>
//                     <TextField
//                         autoFocus
//                         fullWidth
//                         label={currentOption?.fieldLabel}
//                         placeholder={currentOption?.placeholder}
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         variant="outlined"
//                         margin="normal"
//                         size="small"
//                     />

//                     <TextField
//                         fullWidth
//                         label="Special Instructions"
//                         placeholder="Allergies, preferences, etc."
//                         multiline
//                         rows={3}
//                         value={clarification}
//                         onChange={(e) => setClarification(e.target.value)}
//                         variant="outlined"
//                         margin="normal"
//                         size="small"
//                     />






//                 </DialogContent>

//                 <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
//                     <Button onClick={handleClose} color="inherit" size="small">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSubmit} variant="contained" color="primary" size="small" disabled={!inputValue}>
//                         Place Order
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     )
// }

// // Componente para los botones de orden
// const OrderButton = ({
//     option,
//     color,
//     type,
//     size,
//     onClick,
// }: {
//     option: OrderOption
//     color: string
//     type: string
//     size: "small" | "medium" | "large"
//     onClick: (type: string) => void
// }) => {
//     // Convertir el nombre del color a un valor hexadecimal si es necesario
//     const colorValue = getColorValue(color)

//     return (
//         <Button
//             size={size}
//             variant={type as any}
//             startIcon={option.icon}
//             sx={{
//                 color: color,
//                 borderColor: alpha(colorValue, 0.5),
//                 backgroundColor: "transparent",
//                 transition: "all 0.2s ease",
//                 minWidth: 0,
//                 px: 1.5,
//                 "&:hover": {
//                     borderColor: color,
//                     backgroundColor: alpha(colorValue, 0.08),
//                 },
//             }}
//             onClick={() => onClick(option.id)}
//         >
//             {option.label}
//         </Button>
//     )
// }

// export default SelectComponent


"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Typography,
    Fade,
    alpha,
    useTheme,
} from "@mui/material"
import { LocalShipping, TakeoutDining, Restaurant } from "@mui/icons-material"
import { FaMotorcycle, FaWallet } from "react-icons/fa"

// Mapa de nombres de colores a valores hexadecimales
const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#000000",
    red: "#f44336",
    blue: "#2196f3",
    green: "#4caf50",
    yellow: "#ffeb3b",
    purple: "#9c27b0",
    grey: "#9e9e9e",
    orange: "#ff9800",
}

// Función para convertir nombres de colores a hexadecimal si es necesario
const getColorValue = (color: string): string => {
    return colorMap[color.toLowerCase()] || color
}

interface OrderOption {
    id: string
    label: string
    icon: React.ReactNode
    fieldLabel: string
    placeholder: string
}

interface Props {
    orderdescription: any[]
    delivery?: boolean
    takeaway?: boolean
    Dinein?: boolean
    table?: any
    direction?: string
    username?: string
    userid?: any
    orderplaced?: any
    ordertaken?: any
    orderrecived?: any
    onChange: (value: any) => void
    value: any
    className?: string
    color?: string
    type?: "text" | "outlined" | "contained"
    size?: "small" | "medium" | "large",
    paymentLevel?: any
}

const SelectComponent = (props: Props) => {
    const { delivery, takeaway, Dinein, className, onChange, color = "white", type = "outlined", size = "small", orderdescription } = props

    const theme = useTheme()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [orderType, setOrderType] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState<string>("")
    const [clarification, setClarification] = useState<string>("")

    // Definir opciones de pedido de manera centralizada
    const orderOptions = useMemo<OrderOption[]>(
        () => [
            {
                id: "delivery",
                label: "Delivery",
                icon: <FaMotorcycle fontSize="small" />,
                fieldLabel: "Delivery Address",
                placeholder: "Enter your delivery address",
            },
            {
                id: "takeaway",
                label: "Takeaway",
                icon: <TakeoutDining fontSize="small" />,
                fieldLabel: "Pickup Details",
                placeholder: "Enter your name for pickup",
            },
            {
                id: "dinein",
                label: "Dine-in",
                icon: <Restaurant fontSize="small" />,
                fieldLabel: "Table Number",
                placeholder: "Enter your table number",
            },
        ],
        [],
    )

    const showDialog = (type: string) => {
        setOrderType(type)
        setIsDialogOpen(true)
    }

    const handleClose = () => {
        setIsDialogOpen(false)
        setInputValue("")
        setClarification("")
    }

    const handleSubmit = () => {
        if (inputValue) {
            console.log("🚀 ~ handleSubmit ~ inputValue:", inputValue, orderdescription)
            onChange({ inputValue, clarification, orderType })
            setIsDialogOpen(false)
            setInputValue("")
            setClarification("")
        }
    }

    // Obtener la opción actual seleccionada
    const currentOption = orderOptions.find((option) => option.id === orderType)

    return (
        <Box
            className={className}
            sx={{
                display: "flex",
                gap: 1.5,
                flexDirection: { xs: "column", sm: "row" }, // Apilado en móviles, en fila en pantallas grandes
                alignItems: { xs: "stretch", sm: "center" },
            }}
        >
            {delivery && (
                <OrderButton
                    option={orderOptions[0]}
                    color={color}
                    type={type}
                    size={size}
                    onClick={showDialog}
                    isSelected={orderType === "delivery"} // Resaltar si está seleccionado
                />
            )}

            {takeaway && (
                <OrderButton
                    option={orderOptions[1]}
                    color={color}
                    type={type}
                    size={size}
                    onClick={showDialog}
                    isSelected={orderType === "takeaway"} // Resaltar si está seleccionado
                />
            )}

            {Dinein && (
                <OrderButton
                    option={orderOptions[2]}
                    color={color}
                    type={type}
                    size={size}
                    onClick={showDialog}
                    isSelected={orderType === "dinein"} // Resaltar si está seleccionado
                />
            )}

            <Dialog
                open={isDialogOpen}
                onClose={handleClose}
                TransitionComponent={Fade}
                transitionDuration={300}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        borderRadius: 2,
                        overflow: "hidden",
                    },
                }}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        pb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    }}
                >
                    {currentOption?.icon}
                    <Typography variant="h6" component="span">
                        {currentOption?.label} Order
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 3, pb: 2 }}>
                    <br />
                    <span>{orderdescription[0]}</span>
                    <TextField
                        autoFocus
                        fullWidth
                        label={currentOption?.fieldLabel}
                        placeholder={currentOption?.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                    />

                    <TextField
                        fullWidth
                        label="Special Instructions"
                        placeholder="Allergies, preferences, etc."
                        multiline
                        rows={3}
                        value={clarification}
                        onChange={(e) => setClarification(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        size="small"
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
                    <Button onClick={handleClose} color="inherit" size="small">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" size="small" disabled={!inputValue}>
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

// Componente para los botones de orden
const OrderButton = ({
    option,
    color,
    type,
    size,
    onClick,
    isSelected, // Nuevo prop para resaltar selección
}: {
    option: OrderOption
    color: string
    type: string
    size: "small" | "medium" | "large"
    onClick: (type: string) => void
    isSelected?: boolean
}) => {
    const colorValue = getColorValue(color)

    return (
        <Button
            size={size}
            variant={type as any}
            startIcon={option.icon}
            sx={{
                color: color,
                borderColor: isSelected ? color : alpha(colorValue, 0.5), // Resaltar si está seleccionado
                backgroundColor: isSelected ? alpha(colorValue, 0.1) : "transparent", // Resaltar si está seleccionado
                transition: "all 0.2s ease",
                minWidth: 0,
                px: 1.5,
                "&:hover": {
                    borderColor: color,
                    backgroundColor: alpha(colorValue, 0.08),
                },
            }}
            onClick={() => onClick(option.id)}
        >
            {option.label}
        </Button>
    )
}

export default SelectComponent