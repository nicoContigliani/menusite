

// "use client"

// import React, { useCallback, useEffect, useMemo, useState } from "react"
// import ReusableModal from "../ReusableModal/ReusableModal"
// import {
//   Button,
//   Typography,
//   Box,
//   Stack,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   type SelectChangeEvent,
// } from "@mui/material"
// import styles from "./OrderFlow.module.css"
// import CheckboxMaterialUI from "../CheckboxMaterialUI/CheckboxMaterialUI"
// import { v4 as uuidv4 } from "uuid"
// import OrderItem from "./OrdersItems/OrdersItems"

// // Define proper types instead of using 'any'
// interface OrderExtra {
//   name: string
//   price: number
// }

// // Renamed from Order to OrderItem to avoid conflict with existing Order type
// interface OrderItemType {
//   id: string
//   title: string
//   price: number
//   quantity: number
//   extra: OrderExtra[]
//   extraGeneral: OrderExtra[]
//   // Add other properties as needed
// }

// interface OrderFlowProps {
//   // Use the existing Order type from your codebase
//   orders: any[] // We'll use 'any[]' temporarily to avoid conflicts
//   deleteOrder: (id: string) => void
//   editOrder: (id: string, updates: any) => void
// }

// const Orderflow: React.FC<OrderFlowProps> = ({ orders, deleteOrder, editOrder }) => {
//   const [modal1, setModal1] = useState<boolean>(false)
//   const [editModal, setEditModal] = useState<boolean>(false)
//   const [selectedOrder, setSelectedOrder] = useState<any>(null)
//   console.log("🚀 ~ selectedOrder:", selectedOrder)
//   const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({})
//   const [comments, setComments] = useState<string>("")
//   const [orderType, setOrderType] = useState<string>("")
//   const [tableNumber, setTableNumber] = useState<string>("")
//   const [street, setStreet] = useState<string>("")
//   const [streetNumber, setStreetNumber] = useState<string>("")
//   const [fullname, setFullname] = useState<string>("")

//   // Close modal when orders are empty
//   useEffect(() => {
//     if (orders.length === 0) {
//       setModal1(false)
//     }
//   }, [orders])

//   // Memoize handlers to prevent unnecessary re-renders
//   const handleOpenModal = useCallback(() => {
//     setModal1(true)
//   }, [])

//   const handleCloseModal = useCallback(() => {
//     setModal1(false)
//   }, [])

//   const handleOpenEditModal = useCallback((order: any) => {
//     setSelectedOrder(order)

//     // Create initial extras state
//     const initialExtras = order.extraGeneral.reduce((acc:any, curr:any) => {
//       acc[curr.name] = order.extra.some((extra: any) => extra.name === curr.name)
//       return acc
//     }, {})

//     setSelectedExtras(initialExtras)
//     setEditModal(true)
//   }, [])

//   const handleCloseEditModal = useCallback(() => {
//     setEditModal(false)
//     setSelectedOrder(null)
//     setSelectedExtras({})
//   }, [])

//   const handleCheckboxChange = useCallback((name: string, isChecked: boolean) => {
//     setSelectedExtras((prev) => ({
//       ...prev,
//       [name]: isChecked,
//     }))
//   }, [])

//   const handleConfirmEdit = useCallback(() => {
//     if (selectedOrder) {
//       const updatedExtras = selectedOrder.extraGeneral.filter((extra: any) => selectedExtras[extra.name])
//       editOrder(selectedOrder.id, { extra: updatedExtras })
//       handleCloseEditModal()
//     }
//   }, [selectedOrder, selectedExtras, editOrder, handleCloseEditModal])

//   const handleOrderTypeChange = useCallback((event: SelectChangeEvent) => {
//     setOrderType(event.target.value)
//   }, [])

//   const handleConfirmOrder = useCallback(() => {
//     const orderDetails = {
//       comments,
//       orderType,
//       tableNumber: orderType === "en el lugar" ? tableNumber : null,
//       orderId: orderType === "para llevar" ? uuidv4() : null,
//       deliveryAddress: orderType === "delivery" ? `${street} ${streetNumber}` : null,
//       fullname: orderType === "para llevar" || orderType === "delivery" ? fullname : null,
//     }

//     console.log("Order Details:", orderDetails)
//     // Send order details to server
//     handleCloseModal()

//     // Reset form fields after submission
//     setComments("")
//     setOrderType("")
//     setTableNumber("")
//     setStreet("")
//     setStreetNumber("")
//     setFullname("")
//   }, [comments, orderType, tableNumber, street, streetNumber, fullname, handleCloseModal])

//   // Memoize the order items to prevent unnecessary re-renders
//   const orderItems = useMemo(() => {
//     return orders.map((item) => (
//       <OrderItem
//         key={item.id}
//         item={item}
//         onDelete={() => deleteOrder(item.id)}
//         onEdit={() => handleOpenEditModal(item)}
//       />
//     ))
//   }, [orders, deleteOrder, handleOpenEditModal])

//   // Memoize the extras checkboxes
//   const extrasCheckboxes = useMemo(() => {
//     return selectedOrder?.extraGeneral?.map((extra: any) => (
//       <Box key={extra.name} sx={{ mb: 1 }}>
//         <CheckboxMaterialUI
//           name={extra.name}
//           checked={Boolean(selectedExtras[extra.name])}
//           onChange={handleCheckboxChange}
//           label={`${extra.name} - $${extra.price}`}
//           color="primary"
//         />
//       </Box>
//     ))
//   }, [selectedOrder?.extraGeneral, selectedExtras, handleCheckboxChange])

//   // Only render the component when there are orders
//   if (orders.length === 0) {
//     return null
//   }

//   return (
//     <div className={styles.mainContainer}>
//       <div className={styles.floatingButton} onClick={handleOpenModal}>
//         Finalizar Orden
//       </div>

//       <ReusableModal open={modal1} onClose={handleCloseModal} title="Detalles de la Orden" showButtons={false}>
//         <Box sx={{ maxHeight: "400px", overflowY: "auto", padding: 2 }}>
//           <Stack spacing={2}>{orderItems}</Stack>
//         </Box>

//         <Box sx={{ marginTop: 2 }}>
//           <TextField
//             fullWidth
//             label="Comentarios"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//             multiline
//             rows={2}
//             sx={{ mb: 2 }}
//           />

//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="order-type-label">Tipo de Pedido</InputLabel>
//             <Select
//               labelId="order-type-label"
//               value={orderType}
//               label="Tipo de Pedido"
//               onChange={handleOrderTypeChange}
//             >
//               <MenuItem value="en el lugar">Comer en el lugar</MenuItem>
//               <MenuItem value="para llevar">Para llevar</MenuItem>
//               <MenuItem value="delivery">Delivery</MenuItem>
//             </Select>
//           </FormControl>

//           {orderType === "en el lugar" && (
//             <TextField
//               fullWidth
//               label="Número de Mesa"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//           )}

//           {orderType === "para llevar" && (
//             <TextField
//               fullWidth
//               label="Nombre de la persona que recibe"
//               value={fullname}
//               onChange={(e) => setFullname(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//           )}

//           {orderType === "delivery" && (
//             <>
//               <TextField
//                 fullWidth
//                 label="Nombre de la persona que recibe"
//                 value={fullname}
//                 onChange={(e) => setFullname(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Calle"
//                 value={street}
//                 onChange={(e) => setStreet(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Número"
//                 value={streetNumber}
//                 onChange={(e) => setStreetNumber(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//             </>
//           )}
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
//           <Button onClick={handleCloseModal} color="secondary" sx={{ marginRight: 1 }}>
//             Cerrar
//           </Button>
//           <Button onClick={handleConfirmOrder} color="primary" variant="contained">
//             Confirmar
//           </Button>
//         </Box>
//       </ReusableModal>

//       <ReusableModal open={editModal} onClose={handleCloseEditModal} title="Editar Extras" showButtons={false}>
//         <Box sx={{ maxHeight: "400px", overflowY: "auto", padding: 2 }}>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//             Selecciona tus extras
//           </Typography>
//           {extrasCheckboxes}
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
//           <Button onClick={handleCloseEditModal} color="secondary" sx={{ marginRight: 1 }}>
//             Cancelar
//           </Button>
//           <Button onClick={handleConfirmEdit} color="primary" variant="contained">
//             Confirmar
//           </Button>
//         </Box>
//       </ReusableModal>
//     </div>
//   )
// }

// export default React.memo(Orderflow)



"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import ReusableModal from "../ReusableModal/ReusableModal"
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  type SelectChangeEvent,
} from "@mui/material"
import styles from "./OrderFlow.module.css"
import CheckboxMaterialUI from "../CheckboxMaterialUI/CheckboxMaterialUI"
import { v4 as uuidv4 } from "uuid"
import OrderItem from "./OrdersItems/OrdersItems"
import { sendWhatsAppMessage } from "@/services/OrderWathSappServices/ordersWithWhattSapp.services"

// Define proper types instead of using 'any'
interface OrderExtra {
  name: string
  price: number
}

// Renamed from Order to OrderItem to avoid conflict with existing Order type
interface OrderItemType {
  id: string
  title: string
  price: number
  quantity: number
  extra: OrderExtra[]
  extraGeneral: OrderExtra[]
  // Add other properties as needed
}

interface OrderFlowProps {
  // Use the existing Order type from your codebase
  orders: any[] // We'll use 'any[]' temporarily to avoid conflicts
  deleteOrder: (id: string) => void
  editOrder: (id: string, updates: any) => void
  info: any;
}

const Orderflow: React.FC<OrderFlowProps> = ({ orders, deleteOrder, editOrder,info }) => {
  const [modal1, setModal1] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<boolean>(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({})
  const [comments, setComments] = useState<string>("")
  const [orderType, setOrderType] = useState<string>("")
  const [tableNumber, setTableNumber] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [streetNumber, setStreetNumber] = useState<string>("")
  const [fullname, setFullname] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  // Close modal when orders are empty
  useEffect(() => {
    if (orders.length === 0) {
      setModal1(false)
    }
  }, [orders])

  // Memoize handlers to prevent unnecessary re-renders
  const handleOpenModal = useCallback(() => {
    setModal1(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModal1(false)
    setError(null)
  }, [])

  const handleOpenEditModal = useCallback((order: any) => {
    setSelectedOrder(order)

    // Create initial extras state
    const initialExtras = order.extraGeneral.reduce((acc: any, curr: any) => {
      acc[curr.name] = order.extra.some((extra: any) => extra.name === curr.name)
      return acc
    }, {})

    setSelectedExtras(initialExtras)
    setEditModal(true)
  }, [])

  const handleCloseEditModal = useCallback(() => {
    setEditModal(false)
    setSelectedOrder(null)
    setSelectedExtras({})
  }, [])

  const handleCheckboxChange = useCallback((name: string, isChecked: boolean) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [name]: isChecked,
    }))
  }, [])

  const handleConfirmEdit = useCallback(() => {
    if (selectedOrder) {
      const updatedExtras = selectedOrder.extraGeneral.filter((extra: any) => selectedExtras[extra.name])
      editOrder(selectedOrder.id, { extra: updatedExtras })
      handleCloseEditModal()
    }
  }, [selectedOrder, selectedExtras, editOrder, handleCloseEditModal])

  const handleOrderTypeChange = useCallback((event: SelectChangeEvent) => {
    setOrderType(event.target.value)
  }, [])
  console.log("🚀 ~ handleConfirmOrder ~ info?.phone:", info[0])

  const handleConfirmOrder = useCallback(() => {
    // Validaciones
    if (!orderType) {
      setError("Por favor, selecciona un tipo de pedido.");
      return;
    }
  
    if (orderType === "en el lugar" && !tableNumber) {
      setError("Por favor, ingresa el número de mesa.");
      return;
    }
  
    if (orderType === "delivery" && (!street || !streetNumber || !fullname)) {
      setError("Por favor, completa todos los campos de dirección.");
      return;
    }
  
    if (orderType === "para llevar" && !fullname) {
      setError("Por favor, ingresa el nombre de la persona que recibe.");
      return;
    }
  
    // Crear el objeto de detalles de la orden
    const orderDetails = {
      comments,
      orderType,
      tableNumber: orderType === "en el lugar" ? tableNumber : null,
      orderId: orderType === "para llevar" ? uuidv4() : null,
      deliveryAddress: orderType === "delivery" ? `${street} ${streetNumber}` : null,
      fullname: orderType === "para llevar" || orderType === "delivery" ? fullname : null,
      items: orders, // Incluir los ítems de la orden
    };
    console.log("🚀 ~ handleConfirmOrder ~ orderDetails:", orderDetails)
    // Validar y formatear el número de teléfono
    const phoneNumber = info[0]?.phone?.replace(/\D/g, ""); // Elimina caracteres no numéricos
    if (!phoneNumber) {
      setError("Número de teléfono no válido.");
      return;
    }
    
    
    // Enviar el mensaje por WhatsApp
    sendWhatsAppMessage(orderDetails, phoneNumber);



    
  
    // Cerrar el modal y resetear los campos
    handleCloseModal();
    setComments("");
    setOrderType("");
    setTableNumber("");
    setStreet("");
    setStreetNumber("");
    setFullname("");
  }, [comments, orderType, tableNumber, street, streetNumber, fullname, handleCloseModal, orders, info?.phone]);
  // Memoize the order items to prevent unnecessary re-renders
  const orderItems = useMemo(() => {
    return orders.map((item) => (
      <OrderItem
        key={item.id}
        item={item}
        onDelete={() => deleteOrder(item.id)}
        onEdit={() => handleOpenEditModal(item)}
      />
    ))
  }, [orders, deleteOrder, handleOpenEditModal])

  // Memoize the extras checkboxes
  const extrasCheckboxes = useMemo(() => {
    return selectedOrder?.extraGeneral?.map((extra: any) => (
      <Box key={extra.name} sx={{ mb: 1 }}>
        <CheckboxMaterialUI
          name={extra.name}
          checked={Boolean(selectedExtras[extra.name])}
          onChange={handleCheckboxChange}
          label={`${extra.name} - $${extra.price}`}
          color="primary"
        />
      </Box>
    ))
  }, [selectedOrder?.extraGeneral, selectedExtras, handleCheckboxChange])

  // Only render the component when there are orders
  if (orders.length === 0) {
    return null
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.floatingButton} onClick={handleOpenModal}>
        Finalizar Orden
      </div>

      <ReusableModal open={modal1} onClose={handleCloseModal} title="Detalles de la Orden" showButtons={false}>
        <Box sx={{ maxHeight: "400px", overflowY: "auto", padding: 2 }}>
          <Stack spacing={2}>{orderItems}</Stack>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Comentarios"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="order-type-label">Tipo de Pedido</InputLabel>
            <Select
              labelId="order-type-label"
              value={orderType}
              label="Tipo de Pedido"
              onChange={handleOrderTypeChange}
            >
              <MenuItem value="en el lugar">Comer en el lugar</MenuItem>
              <MenuItem value="para llevar">Para llevar</MenuItem>
              <MenuItem value="delivery">Delivery</MenuItem>
            </Select>
          </FormControl>

          {orderType === "en el lugar" && (
            <TextField
              fullWidth
              label="Número de Mesa"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          {orderType === "para llevar" && (
            <TextField
              fullWidth
              label="Nombre de la persona que recibe"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          {orderType === "delivery" && (
            <>
              <TextField
                fullWidth
                label="Nombre de la persona que recibe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Calle"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Número"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={handleCloseModal} color="secondary" sx={{ marginRight: 1 }}>
            Cerrar
          </Button>
          <Button onClick={handleConfirmOrder} color="primary" variant="contained">
            Confirmar
          </Button>
        </Box>
      </ReusableModal>

      <ReusableModal open={editModal} onClose={handleCloseEditModal} title="Editar Extras" showButtons={false}>
        <Box sx={{ maxHeight: "400px", overflowY: "auto", padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Selecciona tus extras
          </Typography>
          {extrasCheckboxes}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={handleCloseEditModal} color="secondary" sx={{ marginRight: 1 }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmEdit} color="primary" variant="contained">
            Confirmar
          </Button>
        </Box>
      </ReusableModal>
    </div>
  )
}

export default React.memo(Orderflow)