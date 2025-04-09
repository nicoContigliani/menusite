
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Divider,
//   List,
//   Button,
//   Modal,
//   Paper,
//   Grid,
//   Chip,
//   useTheme
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PaymentIcon from '@mui/icons-material/Payment';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import MoneyIcon from '@mui/icons-material/Money';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
// import PaymentModal from '@/components/PaymentModal/PaymentModal';

// interface OrderPaymentItemProps {
//   order: any;
//   onOpenPaymentModal: () => void;
// }

// interface PaymentModalProps {
//   open: boolean;
//   onClose: () => void;
//   onPaymentSubmit: (paymentMethod: string) => void;
//   orderTotal: number;
// }

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   p: 4,
// };

// const OrderPaymentItem = ({ order, onOpenPaymentModal }: OrderPaymentItemProps) => {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Typography variant="body1" gutterBottom>
//         <strong>Tipo:</strong> {order.orderType}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Estado:</strong> <Chip 
//           label={order.status} 
//           color={order.status === 'finished' ? 'success' : 'warning'} 
//           size="small"
//         />
//       </Typography>
//       {order.comments && (
//         <Typography variant="body1" gutterBottom>
//           <strong>Comentarios:</strong> {order.comments}
//         </Typography>
//       )}

//       <Box sx={{ mt: 2 }}>
//         <Typography variant="h6" gutterBottom>Items:</Typography>
//         {order.cart.map((item: any) => (
//           <Box key={item.id} sx={{ mb: 2 }}>
//             <Typography variant="body1">
//               {item.quantity}x {item.name} - ${item.price.toFixed(2)}
//             </Typography>
//             {item.extras && item.extras.length > 0 && (
//               <Box sx={{ ml: 2 }}>
//                 <Typography variant="body2">Extras:</Typography>
//                 {item.extras.map((extra: any, index: number) => (
//                   <Typography key={index} variant="body2">
//                     - {extra.name}: ${extra.price.toFixed(2)}
//                   </Typography>
//                 ))}
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>

//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<PaymentIcon />}
//         onClick={onOpenPaymentModal}
//         fullWidth
//         sx={{ mt: 2 }}
//       >
//         Procesar Pago
//       </Button>
//     </Box>
//   );
// };


// const OrdersSalesScreenStaffNew = ({ orders, onPaymentSubmit }: { orders: any, onPaymentSubmit: any }) => {
//   const [ordersToDisplay, setOrdersToDisplay] = useState<any[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   console.log("🚀 ~ OrdersSalesScreenStaffNew ~ selectedOrder:", selectedOrder)
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);

//   useEffect(() => {
//     if (orders && (orders.finished || orders.processing)) {
//       const combinedOrders = [
//         ...(orders.finished || []),
//         ...(orders.processing || [])
//       ];
//       setOrdersToDisplay(combinedOrders);
//     }
//   }, [orders]);

//   const calculateOrderTotal = (order: any) => {
//     return order.cart.reduce((total: number, item: any) => {
//       return total + (item.price * item.quantity) + (item.extrasTotal || 0);
//     }, 0);
//   };

//   const handleOpenPaymentModal = (order: any) => {
//     setSelectedOrder(order);
//     setPaymentModalOpen(true);
//   };

//   // const handlePaymentSubmit = (paymentMethod: string) => {
//   //   onPaymentSubmit({
//   //     order: selectedOrder,
//   //     paymentMethod,
//   //     amount: calculateOrderTotal(selectedOrder)
//   //   });
//   //   setPaymentModalOpen(false);
//   // };


//   const handlePaymentSubmit = (paymentInfo: any) => {
//     onPaymentSubmit({
//       order: selectedOrder,
//       paymentInfo: {
//         ...paymentInfo,
//         orderId: selectedOrder._id, // Añadir ID de la orden si es necesario
//         orderIds: selectedOrder.id
//       }
//     });
//     setPaymentModalOpen(false);
//   };





//   return (
//     <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
//       {ordersToDisplay.map((order: any) => (
//         <Box key={order._id} sx={{ mb: 2 }}>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               sx={{
//                 backgroundColor: order.status === 'finished' ? 
//                   'action.selected' : 'background.paper'
//               }}
//             >
//               <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//                 <Box>
//                   <Typography variant="subtitle1">
//                     <strong>{order.fullname}</strong>
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {order.dataTypeOrder}
//                   </Typography>
//                 </Box>
//                 <Typography variant="subtitle1" color="primary">
//                   <strong>${calculateOrderTotal(order).toFixed(2)}</strong>
//                 </Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               <OrderPaymentItem 
//                 order={order} 
//                 onOpenPaymentModal={() => handleOpenPaymentModal(order)}
//               />
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       ))}

//       <PaymentModal
//         open={paymentModalOpen}
//         onClose={() => setPaymentModalOpen(false)}
//         onPaymentSubmit={handlePaymentSubmit}
//         orderTotal={selectedOrder ? calculateOrderTotal(selectedOrder) : 0}
//       />
//     </Box>
//   );
// };

// export default OrdersSalesScreenStaffNew;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentModal from '@/components/PaymentModal/PaymentModal';
import { motion, AnimatePresence } from 'framer-motion';

// Definición de tipos
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  extras?: Array<{
    name: string;
    price: number;
  }>;
  extrasTotal?: number;
}

interface Order {
  _id: string;
  id: string;
  fullname: string;
  status: 'finished' | 'processing';
  orderType: string;
  dataTypeOrder: string;
  comments?: string;
  cart: OrderItem[];
}

interface OrdersSalesScreenStaffNewProps {
  orders: {
    finished?: Order[];
    processing?: Order[];
  };
  onPaymentSubmit: (paymentData: {
    order: Order;
    paymentInfo: any;
  }) => Promise<void>;
  viewMode?: 'column' | 'list';
}

// Componente para mostrar un ítem de la orden
const OrderPaymentItem = ({
  order,
  onOpenPaymentModal
}: {
  order: Order;
  onOpenPaymentModal: () => void
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2,
        mb: 2
      }}>
        <Typography variant="body1">
          <strong>Tipo:</strong> {order.orderType}
        </Typography>
        <Typography variant="body1" component="span">
          <strong>Estado:</strong>{' '}
          <Chip
            label={order.status}
            color={order.status === 'finished' ? 'success' : 'warning'}
            size="small"
          />
        </Typography>
      </Box>

      {order.comments && (
        <Typography variant="body1" gutterBottom>
          <strong>Comentarios:</strong> {order.comments}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Items:</Typography>
        {order.cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={{ mb: 2, p: 1, backgroundColor: theme.palette.action.hover, borderRadius: 1 }}>
              <Typography variant="body1">
                {item.quantity}x {item.name} - ${item.price.toFixed(2)}
              </Typography>
              {item.extras && item.extras.length > 0 && (
                <Box sx={{ ml: 2, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Extras:</Typography>
                  {item.extras.map((extra, index) => (
                    <Typography key={index} variant="body2">
                      - {extra.name}: ${extra.price.toFixed(2)}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        ))}
      </Box>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PaymentIcon />}
          onClick={onOpenPaymentModal}
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 2,
            py: 1.5
          }}
        >
          Procesar Pago
        </Button>
      </motion.div>
    </Box>
  );
};

// Componente principal mejorado
const OrdersSalesScreenStaffNew = ({
  orders,
  onPaymentSubmit,
  viewMode = 'column'
}: OrdersSalesScreenStaffNewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [ordersToDisplay, setOrdersToDisplay] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (orders) {
      const combinedOrders = [
        ...(orders.finished || []),
        ...(orders.processing || [])
      ];
      setOrdersToDisplay(combinedOrders);
    }
  }, [orders]);

  const calculateOrderTotal = (order: Order) => {
    return order.cart.reduce((total, item) => {
      const extrasTotal = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
      return total + (item.price * item.quantity) + extrasTotal;
    }, 0);
  };

  const handleOpenPaymentModal = (order: Order) => {
    setSelectedOrder(order);
    setPaymentModalOpen(true);
  };

  const handlePaymentSubmit = (paymentInfo: any) => {
    if (!selectedOrder) return;

    onPaymentSubmit({
      order: selectedOrder,
      paymentInfo: {
        ...paymentInfo,
        orderId: selectedOrder._id,
        orderIds: selectedOrder.id
      }
    });
    setPaymentModalOpen(false);
  };

  // Estilo responsivo basado en viewMode
  const containerStyle = {
    width: '100%',
    maxWidth: 1200,
    mx: 'auto',
    p: { xs: 1, sm: 2 },
    display: viewMode === 'column' ? 'block' : 'grid',
    gridTemplateColumns: viewMode === 'list' ? (isMobile ? '1fr' : 'repeat(2, 1fr)') : undefined,
    gap: viewMode === 'list' ? 2 : undefined
  };

  return (
    <Box sx={containerStyle}>
      <AnimatePresence>
        {ordersToDisplay.map((order) => (
          <motion.div
            key={order._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{
              mb: 2,
              height: viewMode === 'list' ? '100%' : undefined
            }}>
              <Accordion
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[1],
                  '&:hover': {
                    boxShadow: theme.shadows[3]
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: order.status === 'finished' ?
                      'action.selected' : 'background.paper',
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center'
                    }
                  }}
                >
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {order.fullname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.dataTypeOrder}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      ${calculateOrderTotal(order).toFixed(2)}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <OrderPaymentItem
                    order={order}
                    onOpenPaymentModal={() => handleOpenPaymentModal(order)}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>

      {selectedOrder && (
        <PaymentModal
          open={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          onPaymentSubmit={handlePaymentSubmit}
          orderTotal={calculateOrderTotal(selectedOrder)}
        />
      )}
    </Box>
  );
};

export default OrdersSalesScreenStaffNew;