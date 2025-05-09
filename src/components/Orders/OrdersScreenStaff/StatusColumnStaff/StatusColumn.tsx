import React, { useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    Badge,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Search,
    Clear,
} from "@mui/icons-material";
import OrderItem from '../OrderItemStaff/OrderItem';

const StatusColumn = (props: any) => {
    const { status, orders, onOrderAction, statusConfig } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const config = statusConfig[status];

    // Estado para la paginación
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Estado para el filtro de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // // Filtrar órdenes basado en el término de búsqueda
    // const filteredOrders = orders.filter((order: any) => {
    //     const searchLower = searchTerm.toLowerCase();
    //     return (
    //         order.id.toLowerCase().includes(searchLower) ||
    //         order.dataTypeOrder?.toLowerCase().includes(searchLower) ||
    //         order.fullname?.toLowerCase().includes(searchLower) ||
    //         order.comments?.toLowerCase().includes(searchLower)
    //     );
    // });

    // // Calcular páginas con las órdenes filtradas
    // const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // // Obtener órdenes para la página actual
    // const paginatedOrders = filteredOrders.slice(
    //     (page - 1) * itemsPerPage,
    //     page * itemsPerPage
    // );

    const filteredOrders = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        return orders.filter((order: any) => (
            order.id?.toLowerCase().includes(searchLower) ||
            order.dataTypeOrder?.toLowerCase().includes(searchLower) ||
            order.fullname?.toLowerCase().includes(searchLower) ||
            order.comments?.toLowerCase().includes(searchLower)
        ));
    }, [orders, searchTerm]);

    const totalPages = useMemo(() => (
        Math.ceil(filteredOrders.length / itemsPerPage)
    ), [filteredOrders]);

    const paginatedOrders = useMemo(() => (
        filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    ), [filteredOrders, page]);


    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1); // Resetear a la primera página al buscar
    };

    const clearSearch = () => {
        setSearchTerm('');
        setPage(1);
    };

    return (
        <Paper
            elevation={2}
            sx={{
                height: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                borderTop: 5,
                borderColor: `${status === "pending"
                    ? "warning.main"
                    : status === "processing"
                        ? "info.main"
                        : status === "paused"
                            ? "text.disabled"
                            : status === "finished"
                                ? "success.main"
                                : status === "delivered"
                                    ? "secondary.main"
                                    : "error.main"
                    }`,
            }}
        >
            <Box
                sx={{
                    p: 1.5,
                    bgcolor: "background.paper",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                {config.icon}
                <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1, fontWeight: 500 }}>
                    {config.label}
                </Typography>
                <Badge
                    badgeContent={filteredOrders.length}
                    color={config.color === "default" ? "default" : (config.color as any)}
                    showZero
                />
            </Box>

            {/* Campo de búsqueda */}
            <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Buscar orden..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <IconButton
                                size="small"
                                onClick={clearSearch}
                                edge="end"
                            >
                                <Clear fontSize="small" />
                            </IconButton>
                        ),
                    }}
                />
            </Box>

            <Box
                sx={{
                    overflow: "auto",
                    flexGrow: 1,
                    maxHeight: { xs: "calc(100dvh - 230px)", md: "calc(100dvh - 270px)" },
                }}
            >
                <List disablePadding>
                    {paginatedOrders.length > 0 ? (
                        paginatedOrders.map((order: any) => (
                            <OrderItem key={order._id} order={order} status={status} onOrderAction={onOrderAction} statusConfig={statusConfig} />
                        ))
                    ) : (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                                No se encontraron órdenes
                            </Typography>
                        </Box>
                    )}
                </List>
            </Box>

            {/* Controles de paginación */}
            {filteredOrders.length > itemsPerPage && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                }}>
                    <Button
                        size="small"
                        onClick={handlePrevPage}
                        disabled={page === 1}
                    >
                        Anterior
                    </Button>
                    <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                        Página {page} de {totalPages}
                    </Typography>
                    <Button
                        size="small"
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                    >
                        Siguiente
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default StatusColumn;