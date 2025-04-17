import React, { useState, useMemo } from "react";
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
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";

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
  status: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  version?: number;
  [key: string]: any;
}

const OrdersQueryComponent: React.FC<{ companiesName: string }> = ({
  companiesName,
}) => {
  const [filters, setFilters] = useState({
    email: "",
    status: "",
    orderType: "",
    phone: "",
    fullname: "",
    dateFrom: "",
    dateTo: "",
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [filterMenu, setFilterMenu] = useState<{
    anchorEl: null | HTMLElement;
    column: string | null;
  }>({ anchorEl: null, column: null });

  const columns = [
    { field: "id", label: "ID Pedido", width: 150, filterable: true },
    { field: "orderType", label: "Tipo", width: 120, filterable: true },
    { field: "status", label: "Estado", width: 120, filterable: true },
    { field: "fullname", label: "Cliente", width: 180, filterable: true },
    { field: "email", label: "Email", width: 200, filterable: true },
    { field: "phone", label: "Teléfono", width: 150, filterable: true },
    {
      field: "createdAt",
      label: "Fecha Creación",
      width: 180,
      filterable: false,
      format: (value: string | Date) => {
        const date = new Date(value);
        return date.toLocaleString();
      }
    },
    {
      field: "cart",
      label: "Productos",
      width: 250,
      filterable: false,
      format: (cart: any[]) => {
        return cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
      }
    },
    { field: "comments", label: "Comentarios", width: 200, filterable: false },
  ];

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const processedResults = useMemo(() => {
    let filtered = [...results];

    // Filtros generales
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'dateFrom' && key !== 'dateTo') {
        filtered = filtered.filter((item) =>
          String(item[key] || "").toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Filtrado por rango de fechas (corregido)
    if (filters.dateFrom) {
      const filterDateFrom = new Date(filters.dateFrom);
      filterDateFrom.setHours(0, 0, 0, 0); // Normalizar a inicio del día
      
      filtered = filtered.filter((item) => {
        try {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0); // Normalizar a inicio del día
          return itemDate >= filterDateFrom;
        } catch (e) {
          console.error("Error al procesar fecha:", item.createdAt, e);
          return false;
        }
      });
    }

    if (filters.dateTo) {
      const filterDateTo = new Date(filters.dateTo);
      filterDateTo.setHours(23, 59, 59, 999); // Normalizar a fin del día
      
      filtered = filtered.filter((item) => {
        try {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0); // Normalizar a inicio del día
          return itemDate <= filterDateTo;
        } catch (e) {
          console.error("Error al procesar fecha:", item.createdAt, e);
          return false;
        }
      });
    }

    // Filtros por columna
    Object.entries(columnFilters).forEach(([column, value]) => {
      if (value) {
        filtered = filtered.filter((item) =>
          String(item[column] || "").toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (orderBy === "createdAt" || orderBy === "updatedAt") {
        try {
          const dateA = new Date(aValue).getTime();
          const dateB = new Date(bValue).getTime();
          return order === "asc" ? dateA - dateB : dateB - dateA;
        } catch (e) {
          console.error("Error al ordenar por fecha:", e);
          return 0;
        }
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return filtered;
  }, [results, filters, columnFilters, orderBy, order]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openFilterMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    column: string
  ) => {
    setFilterMenu({ anchorEl: event.currentTarget, column });
  };

  const closeFilterMenu = () => {
    setFilterMenu({ anchorEl: null, column: null });
  };

  const applyColumnFilter = (value: string) => {
    if (filterMenu.column) {
      setColumnFilters({
        ...columnFilters,
        [filterMenu.column]: value,
      });
      closeFilterMenu();
    }
  };

  const clearColumnFilter = (column: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[column];
    setColumnFilters(newFilters);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ordersquery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filters, companiesName }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
        setPage(0);
      } else {
        setError(data.message || "Error en la consulta.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Consulta de Órdenes para <strong>{companiesName}</strong>
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={filters.email}
            onChange={(e) =>
              setFilters({ ...filters, email: e.target.value })
            }
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
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              name="status"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value as string })
              }
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="pending">Pendiente</MenuItem>
              <MenuItem value="completed">Completado</MenuItem>
              <MenuItem value="cancelled">Cancelado</MenuItem>
              <MenuItem value="processing">Procesando</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Orden</InputLabel>
            <Select
              label="Tipo de Orden"
              name="orderType"
              value={filters.orderType}
              onChange={(e) =>
                setFilters({ ...filters, orderType: e.target.value as string })
              }
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="takeaway">Takeaway</MenuItem>
              <MenuItem value="mesa">Mesa</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nombre Completo"
            name="fullname"
            value={filters.fullname}
            onChange={(e) =>
              setFilters({ ...filters, fullname: e.target.value })
            }
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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={filters.phone}
            onChange={(e) =>
              setFilters({ ...filters, phone: e.target.value })
            }
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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Fecha Desde"
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Fecha Hasta"
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters({ ...filters, dateTo: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            startIcon={<Search />}
          >
            {loading ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {results.length > 0 && (
        <>
          {processedResults.length === 0 ? (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              No se encontraron resultados con los filtros aplicados.
            </Typography>
          ) : (
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((col) => (
                        <TableCell key={col.field} style={{ width: col.width }}>
                          <Box display="flex" alignItems="center">
                            <TableSortLabel
                              active={orderBy === col.field}
                              direction={orderBy === col.field ? order : 'asc'}
                              onClick={() => handleSort(col.field)}
                            >
                              {col.label}
                            </TableSortLabel>
                            {col.filterable && (
                              <IconButton
                                size="small"
                                onClick={(e) => openFilterMenu(e, col.field)}
                              >
                                <FilterList fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                          {columnFilters[col.field] && (
                            <Box display="flex" alignItems="center" mt={1}>
                              <Typography variant="caption" color="textSecondary">
                                Filtro: {columnFilters[col.field]}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => clearColumnFilter(col.field)}
                              >
                                <Clear fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {processedResults
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, idx) => (
                        <TableRow key={idx}>
                          {columns.map((col) => (
                            <TableCell key={col.field}>
                              {col.format
                                ? col.format(row[col.field])
                                : row[col.field] || '-'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
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
              />
            </Paper>
          )}
        </>
      )}

      <Menu
        anchorEl={filterMenu.anchorEl}
        open={Boolean(filterMenu.anchorEl)}
        onClose={closeFilterMenu}
      >
        <MenuItem>
          <TextField
            autoFocus
            fullWidth
            variant="standard"
            placeholder={`Filtrar por ${filterMenu.column}`}
            onChange={(e) => applyColumnFilter(e.target.value)}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OrdersQueryComponent;