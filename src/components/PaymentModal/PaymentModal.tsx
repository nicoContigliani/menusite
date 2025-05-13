import React, { useState } from 'react';
import {
  Modal,
  Paper,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  Divider,
  Chip,
  Grid,
  useTheme,
  InputAdornment,
  Alert,
  Select,
  MenuItem
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Money as MoneyIcon,
  AccountBalanceWallet as TransferIcon,
  PhoneAndroid as MobilePaymentIcon,
  CurrencyExchange as CurrencyIcon,
  Receipt as ReceiptIcon,
  Close as CloseIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentSubmit: (paymentData: any) => void;
  orderTotal: number;
}

const PaymentModal = ({ open, onClose, onPaymentSubmit, orderTotal }: PaymentModalProps) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [paymentData, setPaymentData] = useState({
    cash: { received: 0, change: 0 },
    card: { lastDigits: '', type: 'visa', bank: '', amount: 0 },
    transfer: { bank: '', reference: '', amount: 0 },
    mobile: { phone: '', bank: '', reference: '', amount: 0 },
    currency: { type: 'USD', rate: 0, amount: 0 }
  });
  const [paidAmount, setPaidAmount] = useState(0);
  const [partialPayments, setPartialPayments] = useState<any[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePaymentInputChange = (method: string, field: string, value: any) => {
    setPaymentData(prev => ({
      ...prev,
      [method]: {
        ...prev[method as keyof typeof prev],
        [field]: value
      }
    }));

    if (method === 'cash' && field === 'received') {
      const received = parseFloat(value) || 0;
      const change = received - (orderTotal - paidAmount);
      setPaymentData(prev => ({
        ...prev,
        cash: {
          ...prev.cash,
          change: change > 0 ? change : 0
        }
      }));
    }
  };

  const handleAddPayment = () => {
    let amount = 0;
    let paymentMethod = '';
    let details = {};

    switch (activeTab) {
      case 0: // Efectivo
        amount = paymentData.cash.received;
        paymentMethod = 'cash';
        details = {
          received: paymentData.cash.received,
          change: paymentData.cash.change
        };
        break;
      case 1: // Tarjeta
        amount = paymentData.card.amount;
        paymentMethod = 'card';
        details = {
          lastDigits: paymentData.card.lastDigits,
          type: paymentData.card.type,
          bank: paymentData.card.bank
        };
        break;
      case 2: // Transferencia
        amount = paymentData.transfer.amount;
        paymentMethod = 'transfer';
        details = {
          bank: paymentData.transfer.bank,
          reference: paymentData.transfer.reference
        };
        break;
      case 3: // Pago Móvil
        amount = paymentData.mobile.amount;
        paymentMethod = 'mobile';
        details = {
          phone: paymentData.mobile.phone,
          bank: paymentData.mobile.bank,
          reference: paymentData.mobile.reference
        };
        break;
      case 4: // Divisas
        amount = paymentData.currency.amount * (paymentData.currency.rate || 1);
        paymentMethod = 'currency';
        details = {
          type: paymentData.currency.type,
          rate: paymentData.currency.rate,
          originalAmount: paymentData.currency.amount
        };
        break;
    }

    if (amount <= 0) return;

    const newPayment = {
      method: paymentMethod,
      amount,
      details,
      timestamp: new Date().toISOString()
    };

    setPartialPayments([...partialPayments, newPayment]);
    setPaidAmount(paidAmount + amount);
    setPaymentData({
      cash: { received: 0, change: 0 },
      card: { lastDigits: '', type: 'visa', bank: '', amount: 0 },
      transfer: { bank: '', reference: '', amount: 0 },
      mobile: { phone: '', bank: '', reference: '', amount: 0 },
      currency: { type: 'USD', rate: 0, amount: 0 }
    });
  };

  const handleCompletePayment = () => {
    onPaymentSubmit({
      total: orderTotal,
      paid: paidAmount,
      payments: partialPayments,
      remaining: orderTotal - paidAmount
    });
    onClose();
    setPartialPayments([]);
    setPaidAmount(0);
  };

  const remainingAmount = orderTotal - paidAmount;
  const isPaymentComplete = remainingAmount <= 0;

  // Animaciones
  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, y: 50 }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { opacity: 0, x: -30 }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              outline: 'none'
            }}
          >
            <Paper
              component={motion.div}
              layout
              sx={{
                width: { xs: '100%', sm: '80%', md: '700px' },
                maxHeight: '90vh',
                overflow: 'auto',
                p: 3,
                borderRadius: 2,
                mx: 'auto'
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                  Procesar Pago
                </Typography>
                <Button onClick={onClose} color="inherit" size="small">
                  <CloseIcon />
                </Button>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1">
                  Total a pagar: <strong>${orderTotal.toFixed(2)}</strong>
                </Typography>
                <Typography variant="subtitle1">
                  Pagado: <strong>${paidAmount.toFixed(2)}</strong>
                </Typography>
                <Typography variant="subtitle1" color={remainingAmount > 0 ? 'error.main' : 'success.main'}>
                  {remainingAmount > 0 ? (
                    `Falta: $${remainingAmount.toFixed(2)}`
                  ) : (
                    <Box display="flex" alignItems="center">
                      <CheckIcon color="success" sx={{ mr: 1 }} />
                      Pago completo (Cambio: ${Math.abs(remainingAmount).toFixed(2)})
                    </Box>
                  )}
                </Typography>
              </Box>

              {partialPayments.length > 0 && (
                <Box mb={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Pagos parciales:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {partialPayments.map((payment, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Chip
                          label={`${payment.method}: $${payment.amount.toFixed(2)}`}
                          sx={{ mr: 1, mb: 1 }}
                          onDelete={() => {
                            setPartialPayments(partialPayments.filter((_, i) => i !== index));
                            setPaidAmount(paidAmount - payment.amount);
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              )}

              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3 }}
              >
                <Tab label="Efectivo" icon={<MoneyIcon />} iconPosition="start" />
                <Tab label="Tarjeta" icon={<CreditCardIcon />} iconPosition="start" />
                <Tab label="Transferencia" icon={<TransferIcon />} iconPosition="start" />
                <Tab label="Pago Móvil" icon={<MobilePaymentIcon />} iconPosition="start" />
                <Tab label="Divisas" icon={<CurrencyIcon />} iconPosition="start" />
              </Tabs>

              <Box sx={{ minHeight: '200px', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ width: '100%' }}
                  >
                    {activeTab === 0 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Monto recibido"
                            type="number"
                            value={paymentData.cash.received || ''}
                            onChange={(e) => handlePaymentInputChange('cash', 'received', parseFloat(e.target.value))}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Cambio"
                            type="number"
                            value={paymentData.cash.change.toFixed(2)}
                            disabled
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {activeTab === 1 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Últimos 4 dígitos"
                            value={paymentData.card.lastDigits}
                            onChange={(e) => handlePaymentInputChange('card', 'lastDigits', e.target.value.slice(0, 4))}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Select
                            fullWidth
                            label="Tipo de tarjeta"
                            value={paymentData.card.type}
                            onChange={(e) => handlePaymentInputChange('card', 'type', e.target.value)}
                          >
                            <MenuItem value="visa">Visa</MenuItem>
                            <MenuItem value="mastercard">Mastercard</MenuItem>
                            <MenuItem value="amex">American Express</MenuItem>
                            <MenuItem value="other">Otra</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Banco emisor"
                            value={paymentData.card.bank}
                            onChange={(e) => handlePaymentInputChange('card', 'bank', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Monto a pagar"
                            type="number"
                            value={paymentData.card.amount || ''}
                            onChange={(e) => handlePaymentInputChange('card', 'amount', parseFloat(e.target.value))}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {activeTab === 2 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Banco de destino"
                            value={paymentData.transfer.bank}
                            onChange={(e) => handlePaymentInputChange('transfer', 'bank', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Número de referencia"
                            value={paymentData.transfer.reference}
                            onChange={(e) => handlePaymentInputChange('transfer', 'reference', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Monto transferido"
                            type="number"
                            value={paymentData.transfer.amount || ''}
                            onChange={(e) => handlePaymentInputChange('transfer', 'amount', parseFloat(e.target.value))}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {activeTab === 3 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Teléfono"
                            value={paymentData.mobile.phone}
                            onChange={(e) => handlePaymentInputChange('mobile', 'phone', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Banco origen"
                            value={paymentData.mobile.bank}
                            onChange={(e) => handlePaymentInputChange('mobile', 'bank', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Número de referencia"
                            value={paymentData.mobile.reference}
                            onChange={(e) => handlePaymentInputChange('mobile', 'reference', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Monto"
                            type="number"
                            value={paymentData.mobile.amount || ''}
                            onChange={(e) => handlePaymentInputChange('mobile', 'amount', parseFloat(e.target.value))}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {activeTab === 4 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Select
                            fullWidth
                            label="Tipo de moneda"
                            value={paymentData.currency.type}
                            onChange={(e) => handlePaymentInputChange('currency', 'type', e.target.value)}
                          >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="COP">COP</MenuItem>
                            <MenuItem value="other">Otra</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Tasa de cambio"
                            type="number"
                            value={paymentData.currency.rate || ''}
                            onChange={(e) => handlePaymentInputChange('currency', 'rate', parseFloat(e.target.value))}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Monto en divisas"
                            type="number"
                            value={paymentData.currency.amount || ''}
                            onChange={(e) => handlePaymentInputChange('currency', 'amount', parseFloat(e.target.value))}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Alert severity="info">
                            Equivalente: ${(paymentData.currency.amount * (paymentData.currency.rate || 1)).toFixed(2)}
                          </Alert>
                        </Grid>
                      </Grid>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddPayment}
                  disabled={
                    (activeTab === 0 && paymentData.cash.received <= 0) ||
                    (activeTab === 1 && paymentData.card.amount <= 0) ||
                    (activeTab === 2 && paymentData.transfer.amount <= 0) ||
                    (activeTab === 3 && paymentData.mobile.amount <= 0) ||
                    (activeTab === 4 && paymentData.currency.amount <= 0)
                  }
                >
                  Agregar Pago Parcial
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCompletePayment}
                  disabled={!isPaymentComplete}
                  startIcon={<ReceiptIcon />}
                >
                  Completar Pago
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default PaymentModal;