import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
  InputAdornment,
  IconButton,
  TablePagination,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import useOrdersQuery from "../../../hooks/useOrdersQuery";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
    }
  })
};

interface Order {
  _id: string;
  id: string;
  orderType: string;
  dataTypeOrder?: string;
  cart: Array<{
    id: string;
    itemId: number;
    name: string;
    price: number;
    quantity: number;
    extras?: Array<{
      name: string;
      price: number;
    }>;
    extrasTotal?: number;
    Description?: string;
    comments?: string;
  }>;
  comments?: string;
  companiesName: string;
  companiesID: string;
  email: string;
  fullname: string;
  phone: string;
  whathsapp?: string;
  channel?: string;
  name?: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'paused' | 'finished' | 'cancelled' | 'delivered';
  createdAt: string | Date;
  updatedAt?: string | Date;
  version?: number;
  [key: string]: any;
}

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isClosing, setIsClosing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open && order) {
      setCurrentOrder(order);
      setIsVisible(true);
    }
  }, [open, order]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setCurrentOrder(null);
    }, 300);
  };

  if (!order) return null;

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "No disponible";

    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return isMobile ? 
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}` : 
        date.toLocaleString();
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return "Fecha inválida";
    }
  };

  const calculateTotal: any = () => {
    try {
      return order.cart.reduce((total: number, item: any) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        const extrasTotal = item.extras?.reduce((sum: number, extra: any) => sum + (extra.price || 0), 0) || 0;
        return total + itemTotal + extrasTotal;
      }, 0);
    } catch (error) {
      console.error("Error calculando total:", error);
      return "Error calculando total";
    }
  };

  const getStatusLabel = () => {
    switch (order.status) {
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'paused': return 'Pausado';
      case 'finished': return 'Finalizado';
      case 'cancelled': return 'Cancelado';
      case 'delivered': return 'Entregado';
      default: return order.status || 'Desconocido';
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'paused': return 'secondary';
      case 'finished': return 'success';
      case 'cancelled': return 'error';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
          TransitionProps={{ timeout: 300 }}
        >
          <motion.div
            initial={!isClosing ? { opacity: 0, scale: 0.9 } : false}
            animate={!isClosing ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle sx={{ p: isMobile ? 1 : 2, bgcolor: 'background.paper' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant={isMobile ? "h6" : "h6"} sx={{ fontWeight: 600 }}>
                  Orden #{order.id}
                </Typography>
                <Chip
                  label={getStatusLabel()}
                  color={getStatusColor()}
                  size={isMobile ? "medium" : "medium"}
                  sx={{ fontWeight: 500 }}
                />
              </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: isMobile ? 1 : 3 }}>
              {!order.cart && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Esta orden no tiene información del carrito o está mal formada.
                </Alert>
              )}

              <Grid container spacing={isMobile ? 1 : 3}>
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: isMobile ? 1 : 2, 
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: 'background.default'
                  }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                      Información del Cliente
                    </Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Nombre:</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {order.fullname || order.name || "No disponible"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Email:</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {order.email || "No disponible"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Teléfono:</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {order.phone || "No disponible"}
                        </Typography>
                      </Grid>
                      {order.whathsapp && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>WhatsApp:</Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {order.whathsapp}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ 
                    p: isMobile ? 1 : 2, 
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: 'background.default'
                  }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                      Detalles de la Orden
                    </Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Tipo:</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {order.orderType === 'mesa' ? 'Mesa' :
                            order.orderType === 'delivery' ? 'Delivery' :
                              order.orderType === 'takeaway' ? 'Takeaway' :
                                order.orderType || 'No disponible'}
                        </Typography>
                      </Grid>
                      {order.dataTypeOrder && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {order.orderType === 'mesa' ? 'Mesa' : 'Detalle'}:
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {order.dataTypeOrder}
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Fecha:</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {formatDate(order.createdAt)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ 
                    p: isMobile ? 1 : 2, 
                    borderRadius: 1,
                    bgcolor: 'background.default'
                  }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                      Items del Pedido
                    </Typography>

                    {order.cart?.length ? (
                      <Box>
                        {order.cart.map((item: any, index: number) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {item.quantity || 1}x {item.name || "Producto sin nombre"}
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                ${((item.price || 0) * (item.quantity || 1))?.toFixed(2)}
                              </Typography>
                            </Box>
                            
                            {item.Description && (
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {item.Description}
                              </Typography>
                            )}
                            
                            {item.comments && (
                              <Box mt={0.5}>
                                <Chip
                                  label={`Nota: ${item.comments}`}
                                  size="small"
                                  color="info"
                                  variant="outlined"
                                />
                              </Box>
                            )}

                            {item.extras?.length > 0 && (
                              <Box sx={{ pl: 2, mt: 1 }}>
                                {item.extras.map((extra: any, extraIndex: number) => (
                                  <Box key={extraIndex} display="flex" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                      + {extra.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                      ${extra.price?.toFixed(2) || "0.00"}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                            
                            {index < order.cart.length - 1 && <Divider sx={{ my: 1 }} />}
                          </Box>
                        ))}

                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          mt: 2,
                          pt: 1,
                          borderTop: '1px solid',
                          borderColor: 'divider'
                        }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            Total
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            ${typeof calculateTotal() === 'number' ? calculateTotal().toFixed(2) : calculateTotal()}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Alert severity="warning" sx={{ py: 0 }}>No hay items en esta orden</Alert>
                    )}
                  </Box>
                </Grid>

                {order.comments && (
                  <Grid item xs={12}>
                    <Box sx={{ 
                      p: isMobile ? 1 : 2, 
                      borderRadius: 1,
                      bgcolor: 'background.default'
                    }}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                        Comentarios
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {order.comments}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: isMobile ? 1 : 2 }}>
              <Button 
                onClick={handleClose} 
                color="primary" 
                variant="contained"
                fullWidth
                size={isMobile ? "medium" : "medium"}
              >
                Cerrar
              </Button>
            </DialogActions>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const OrdersQueryComponent: React.FC<{ companiesName: string }> = ({
  companiesName,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    // State
    filters,
    loading,
    results,
    error,
    orderBy,
    order,
    page,
    rowsPerPage,
    columnFilters,
    filterMenu,
    columns,
    processedResults,

    // Handlers
    setFilters,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    openFilterMenu,
    closeFilterMenu,
    applyColumnFilter,
    clearColumnFilter,
    handleSubmit,
  } = useOrdersQuery(companiesName);

  // Columnas optimizadas para mobile
  const mobileColumns = [
    { 
      field: 'id', 
      label: 'ID', 
      width: '80px',
      format: (value: string) => `#${value.slice(0, 4)}`
    },
    { 
      field: 'fullname', 
      label: 'Cliente', 
      width: '120px',
      format: (value: string) => (
        <Typography noWrap sx={{ maxWidth: '120px' }}>
          {value || 'Sin nombre'}
        </Typography>
      )
    },
    { 
      field: 'status', 
      label: 'Estado', 
      width: '80px',
      format: (value: string) => (
        <Chip 
          label={
            value === 'pending' ? 'Pend' : 
            value === 'processing' ? 'Proc' : 
            value === 'paused' ? 'Paus' : 
            value === 'finished' ? 'Fin' : 
            value === 'cancelled' ? 'Canc' : 
            value === 'delivered' ? 'Ent' : value
          }
          color={
            value === 'finished' || value === 'delivered' ? 'success' :
              value === 'cancelled' ? 'error' :
                value === 'processing' ? 'info' :
                  value === 'paused' ? 'secondary' : 'warning'
          }
          size="small"
          sx={{ 
            fontSize: '0.7rem',
            height: '24px',
            '& .MuiChip-label': { px: 0.5 }
          }}
        />
      )
    },
    { 
      field: 'createdAt', 
      label: 'Fecha', 
      width: '80px',
      format: (value: string) => {
        try {
          const date = new Date(value);
          return (
            <Typography variant="caption">
              {`${date.getDate()}/${date.getMonth() + 1}`}
            </Typography>
          );
        } catch {
          return <Typography variant="caption">-</Typography>;
        }
      }
    }
  ];

  const displayColumns = isMobile ? mobileColumns : columns;

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 2,
      '& .MuiTableCell-root': {
        py: isMobile ? '8px' : '16px',
        px: isMobile ? '8px' : '16px'
      }
    }} component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        gutterBottom 
        component={motion.div} 
        variants={itemVariants}
        sx={{ 
          fontWeight: 600,
          mb: isMobile ? 2 : 3
        }}
      >
        Órdenes de {companiesName}
      </Typography>

      <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: 2 }} component={motion.div} variants={containerVariants}>
        <Grid item xs={12} sm={6} md={4} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Email"
            size="small"
            name="email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            InputProps={{
              endAdornment: filters.email && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters({ ...filters, email: "" })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} component={motion.div} variants={itemVariants}>
          <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              name="status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as string })}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="pending">Pendiente</MenuItem>
              <MenuItem value="processing">Procesando</MenuItem>
              <MenuItem value="paused">Pausado</MenuItem>
              <MenuItem value="finished">Finalizado</MenuItem>
              <MenuItem value="delivered">Entregado</MenuItem>
              <MenuItem value="cancelled">Cancelado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} component={motion.div} variants={itemVariants}>
          <FormControl fullWidth size="small">
            <InputLabel>Tipo de Orden</InputLabel>
            <Select
              label="Tipo de Orden"
              name="orderType"
              value={filters.orderType}
              onChange={(e) => setFilters({ ...filters, orderType: e.target.value as string })}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="takeaway">Takeaway</MenuItem>
              <MenuItem value="dine-in">Mesa</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Nombre"
            size="small"
            name="fullname"
            value={filters.fullname}
            onChange={(e) => setFilters({ ...filters, fullname: e.target.value })}
            InputProps={{
              endAdornment: filters.fullname && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters({ ...filters, fullname: "" })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Teléfono"
            size="small"
            name="phone"
            value={filters.phone}
            onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
            InputProps={{
              endAdornment: filters.phone && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters({ ...filters, phone: "" })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Fecha Desde"
            type="date"
            size="small"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
          <TextField
            fullWidth
            label="Fecha Hasta"
            type="date"
            size="small"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        
        <Grid item xs={12} component={motion.div} variants={itemVariants}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            startIcon={!loading && <Search />}
            size="medium"
            sx={{ py: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </Grid>
      </Grid>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {processedResults.length === 0 ? (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
              No se encontraron resultados con los filtros aplicados.
            </Typography>
          ) : (
            <Paper component={motion.div} layout sx={{ 
              overflowX: 'auto',
              '& .MuiTableCell-root': {
                py: '8px',
                px: '8px'
              }
            }}>
              <TableContainer>
                <Table size="small" sx={{ minWidth: isMobile ? '100%' : 'auto' }}>
                  <TableHead>
                    <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 600 } }}>
                      {displayColumns.map((col:any) => (
                        <TableCell 
                          key={col.field} 
                          style={{ width: col.width }}
                        >
                          <Box display="flex" alignItems="center">
                            <TableSortLabel
                              active={orderBy === col.field}
                              direction={orderBy === col.field ? order : 'asc'}
                              onClick={() => handleSort(col.field)}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {col.label}
                              </Typography>
                            </TableSortLabel>
                            {col.filterable && (
                              <IconButton
                                size="small"
                                onClick={(e) => openFilterMenu(e, col.field)}
                                sx={{ ml: 0.5, p: 0.5 }}
                              >
                                <FilterList fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence>
                      {processedResults
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row:any, idx) => (
                          <TableRow
                            key={idx}
                            component={motion.tr}
                            custom={idx}
                            initial="hidden"
                            animate="visible"
                            variants={tableRowVariants}
                            exit={{ opacity: 0 }}
                            hover
                            onClick={() => {
                              setSelectedOrder(row);
                              setModalOpen(true);
                            }}
                            sx={{ 
                              cursor: 'pointer',
                              '&:hover': { 
                                backgroundColor: 'action.hover',
                                '& td': { fontWeight: 500 }
                              }
                            }}
                          >
                            {displayColumns.map((col) => (
                              <TableCell 
                                key={col.field} 
                                sx={{ 
                                  maxWidth: col.width,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {col.format
                                  ? col.format(row[col.field])
                                  : row[col.field] || '-'}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={processedResults.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage={isMobile ? "Filas:" : "Filas por página:"}
                labelDisplayedRows={({ from, to, count }) => 
                  isMobile ? `${from}-${to} de ${count}` : `Mostrando ${from}-${to} de ${count}`
                }
                sx={{
                  '& .MuiTablePagination-toolbar': {
                    minHeight: '52px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }
                }}
              />
            </Paper>
          )}
        </motion.div>
      )}

      <Menu
        anchorEl={filterMenu.anchorEl}
        open={Boolean(filterMenu.anchorEl)}
        onClose={closeFilterMenu}
        PaperProps={{
          sx: {
            minWidth: '200px'
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <MenuItem>
            <TextField
              autoFocus
              fullWidth
              variant="standard"
              placeholder={`Filtrar por ${filterMenu.column}`}
              onChange={(e) => applyColumnFilter(e.target.value)}
              size="small"
            />
          </MenuItem>
        </motion.div>
      </Menu>

      <OrderDetailsModal
        order={selectedOrder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default OrdersQueryComponent;