
import React, { useState, useEffect } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  List,
  Button,
  Modal,
  Paper,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/Money';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PaymentModal from '@/components/PaymentModal/PaymentModal';

interface OrderPaymentItemProps {
  order: any;
  onOpenPaymentModal: () => void;
}

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentSubmit: (paymentMethod: string) => void;
  orderTotal: number;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

const OrderPaymentItem = ({ order, onOpenPaymentModal }: OrderPaymentItemProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1" gutterBottom>
        <strong>Tipo:</strong> {order.orderType}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Estado:</strong> <Chip 
          label={order.status} 
          color={order.status === 'finished' ? 'success' : 'warning'} 
          size="small"
        />
      </Typography>
      {order.comments && (
        <Typography variant="body1" gutterBottom>
          <strong>Comentarios:</strong> {order.comments}
        </Typography>
      )}
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>Items:</Typography>
        {order.cart.map((item: any) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography variant="body1">
              {item.quantity}x {item.name} - ${item.price.toFixed(2)}
            </Typography>
            {item.extras && item.extras.length > 0 && (
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2">Extras:</Typography>
                {item.extras.map((extra: any, index: number) => (
                  <Typography key={index} variant="body2">
                    - {extra.name}: ${extra.price.toFixed(2)}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<PaymentIcon />}
        onClick={onOpenPaymentModal}
        fullWidth
        sx={{ mt: 2 }}
      >
        Procesar Pago
      </Button>
    </Box>
  );
};


const OrdersSalesScreenStaffNew = ({ orders, onPaymentSubmit }: { orders: any, onPaymentSubmit: any }) => {
  const [ordersToDisplay, setOrdersToDisplay] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  console.log("🚀 ~ OrdersSalesScreenStaffNew ~ selectedOrder:", selectedOrder)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (orders && (orders.finished || orders.processing)) {
      const combinedOrders = [
        ...(orders.finished || []),
        ...(orders.processing || [])
      ];
      setOrdersToDisplay(combinedOrders);
    }
  }, [orders]);

  const calculateOrderTotal = (order: any) => {
    return order.cart.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity) + (item.extrasTotal || 0);
    }, 0);
  };

  const handleOpenPaymentModal = (order: any) => {
    setSelectedOrder(order);
    setPaymentModalOpen(true);
  };

  // const handlePaymentSubmit = (paymentMethod: string) => {
  //   onPaymentSubmit({
  //     order: selectedOrder,
  //     paymentMethod,
  //     amount: calculateOrderTotal(selectedOrder)
  //   });
  //   setPaymentModalOpen(false);
  // };


  const handlePaymentSubmit = (paymentInfo: any) => {
    onPaymentSubmit({
      order: selectedOrder,
      paymentInfo: {
        ...paymentInfo,
        orderId: selectedOrder._id, // Añadir ID de la orden si es necesario
        orderIds: selectedOrder.id
      }
    });
    setPaymentModalOpen(false);
  };





  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
      {ordersToDisplay.map((order: any) => (
        <Box key={order._id} sx={{ mb: 2 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: order.status === 'finished' ? 
                  'action.selected' : 'background.paper'
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle1">
                    <strong>{order.fullname}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.dataTypeOrder}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="primary">
                  <strong>${calculateOrderTotal(order).toFixed(2)}</strong>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <OrderPaymentItem 
                order={order} 
                onOpenPaymentModal={() => handleOpenPaymentModal(order)}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
      
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentSubmit={handlePaymentSubmit}
        orderTotal={selectedOrder ? calculateOrderTotal(selectedOrder) : 0}
      />
    </Box>
  );
};

export default OrdersSalesScreenStaffNew;