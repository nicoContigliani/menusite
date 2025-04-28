
import React, { useState } from 'react';
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material';
import { ExpandMore, Edit } from '@mui/icons-material';
import EditOrderModal from '../EditOrderModalStaff/EditOrderModal';
import { RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';
import { useOrdersManagemenUpdate } from '../../../../../hooks/useOrdersManagemenUpdate';

interface CompaniesData {
    hojas: {
        Config: any[];
        staff: any[];
        Hoja1?: any;
        Info?: any;
        Promotion?: any;
        schedules?: any;
    },
    companyName?: any;
}

interface OrderListItemProps {
    order: any;
    onOrderAction: (action: string, order: any) => void;
    statusConfig: any;
}

const OrderListItem: React.FC<OrderListItemProps> = ({
    order,
    onOrderAction,
    statusConfig,
}) => {

    const [open, setOpen] = useState(false);
    const [localOrder, setLocalOrder] = useState(order);



    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const status = order.status.toLowerCase() as keyof typeof statusConfig;
    const config = statusConfig[status];

    const companiesData = useSelector((state: RootState) => state.chExcelData.data as unknown as CompaniesData | undefined);
    const { hojas, companyName } = companiesData || { hojas: { Config: [], staff: [] } };
    const user = useSelector((state: RootState) => state.auth)

    const totalItems = order.cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const total = order.cart.reduce((sum: number, item: any) => {
        const extrasTotal = item.extras?.reduce((eSum: number, extra: any) => eSum + extra.price, 0) || 0;
        return sum + (item.price * item.quantity) + extrasTotal;
    }, 0);




    const { handleOrderAction } = useOrdersManagemenUpdate({
        companyName,
        userEmail: user?.user?.email
    });

    const saveUpdateData = (dataupdate: any) => {
        // console.log("Orden actualizada:", dataupdate);
        handleOrderAction(dataupdate)

    }


    const handleEditOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (updatedOrderData: any) => {
        // Actualizar el estado local primero para una respuesta más rápida
        setLocalOrder((prev: any) => ({
            ...prev,
            ...updatedOrderData
        }));

        // Luego propagar los cambios al componente padre
        onOrderAction("update", {
            ...order,
            ...updatedOrderData
        });

        handleClose();
    };

    return (
        <>
            <Accordion
                disableGutters
                elevation={1}
                sx={{
                    mb: 1,
                    "&:before": { display: "none" },
                    borderLeft: 3,
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
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ minHeight: 56, px: 2, py: 0 }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                            {config.icon}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    #{localOrder.id}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={localOrder.orderType}
                                    color={config.color === "default" ? "default" : (config.color as any)}
                                    sx={{ height: 20, fontSize: "0.7rem" }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                <Typography variant="body2" noWrap sx={{ maxWidth: "120px", fontSize: "0.8rem" }}>
                                    {localOrder.fullname}
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                                    ${total.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 2, py: 1 }}>
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" display="block" color="text.secondary">
                            {new Date(localOrder.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                        </Typography>
                    </Box>

                    <List dense disablePadding sx={{ mb: 1 }}>
                        {localOrder.cart.map((item: any) => (
                            <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                                                <strong>{item.quantity}x</strong> {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
                                                ${item.price.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <>
                                            {item.extras && item.extras.length > 0 && (
                                                <List dense disablePadding sx={{ ml: 2 }}>
                                                    {item.extras.map((extra: any, idx: number) => (
                                                        <ListItem key={idx} disablePadding sx={{ py: 0 }}>
                                                            <ListItemText
                                                                primary={
                                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <Typography variant="caption">+ {extra.name}</Typography>
                                                                        <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
                                                                    </Box>
                                                                }
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            )}
                                            {item.comments && (
                                                <Typography variant="caption" color="text.secondary">
                                                    Nota: {item.comments}
                                                </Typography>
                                            )}
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ my: 1 }} />

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Edit />}
                            onClick={handleEditOpen}
                            sx={{ py: 0.5, fontSize: "0.7rem" }}
                        >
                            Editar Orden
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <EditOrderModal
                open={open}
                handleClose={handleClose}
                order={localOrder}
                // onSave={handleSave}
                onSave={(updatedOrder) => {
                    // Implementar lógica para guardar los cambios
                    saveUpdateData(updatedOrder)
                    // console.log("Orden actualizada:", updatedOrder);
                }}
                menuData={{
                    mainMenu: hojas.Hoja1 || [],
                    promotions: hojas.Promotion || []
                }}
            />
        </>
    );
};

export default OrderListItem;