import React, { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    Button,
    Grid,
    Paper,
    Stack,
    Badge,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    DialogActions,
} from "@mui/material"


import {
    AccessTime,
    CheckCircle,
    Cancel,
    LocalShipping,
    Pending,
    PlayArrow,
    Pause,
    LocalDining,
    Person,
    ExpandMore,
    ShoppingCart,
} from "@mui/icons-material"

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


import AddTaskIcon from '@mui/icons-material/AddTask';
import FullScreenDialog from "@/components/ModalSimple/ModalSimple";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import EditOrderModal from '../EditOrderModalStaff/EditOrderModal';
import { useOrdersManagemenUpdate } from '../../../../../hooks/useOrdersManagemenUpdate';


const OrderItem = (props: any) => {
    const { order, status, onOrderAction, statusConfig } = props

    const companiesData = useSelector((state: RootState) => state.chExcelData.data as unknown as CompaniesData | undefined);
    const { hojas, companyName } = companiesData || { hojas: { Config: [], staff: [] } };
    const { Config = [], staff = [] } = hojas;
    const user = useSelector((state: RootState) => state.auth)
    // console.log("🚀 ~ OrderItem ~ hojas:", hojas.Promotion)
    //modal
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { handleOrderAction } = useOrdersManagemenUpdate({
        companyName,
        userEmail: user?.user?.email
    });


    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const config = statusConfig[status]
    const totalItems = order.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)

    const total = order.cart.reduce((sum: any, item: any) => {
        const extrasTotal = item.extras?.reduce((eSum: any, extra: any) => eSum + extra.price, 0) || 0
        return sum + item.price * item.quantity + extrasTotal
    }, 0)

    const formattedTime = new Date(order.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })


    const saveUpdateData = (dataupdate: any) => {
        // console.log("Orden actualizada:", dataupdate);
        handleOrderAction(dataupdate)

    }

    return (
        <>
            <ListItem alignItems="flex-start" sx={{ p: 1 }}>
                <Card sx={{ width: "100%" }}>
                    <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                #{order?.id}
                            </Typography>
                            <Chip
                                size="small"
                                label={order?.orderType}
                                color={config.color === "default" ? "default" : (config.color as any)}
                            />
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
                            <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
                                {order.fullname}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
                            <Typography variant="body2">{formattedTime}</Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: "0.8rem" }}>
                            Items ({totalItems})
                        </Typography>

                        <List dense disablePadding>
                            {order?.cart?.map((item: any) => (
                                <ListItem key={item?.id} disablePadding sx={{ py: 0.25 }}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                                                    <strong>{item.quantity}x</strong> {item?.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
                                                    ${item?.price?.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            item?.extras && item?.extras.length > 0 ? (
                                                <List dense disablePadding sx={{ ml: 2 }}>
                                                    {item?.extras?.map((extra: any, idx: any) => (

                                                        <ListItem key={idx} disablePadding sx={{ py: 0 }}>
                                                            <ListItemText
                                                                primary={
                                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                        <Typography variant="caption">+ {extra?.name}</Typography>
                                                                        <Typography variant="caption">${extra?.price.toFixed(2)}</Typography>
                                                                    </Box>
                                                                }
                                                            />

                                                        </ListItem>
                                                    ))}
                                                    {
                                                        (item?.comments) &&
                                                        <span>
                                                            `Nota: ${item?.comments}`
                                                        </span>

                                                    }

                                                </List>
                                            ) : null
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }} // Esto mantiene las mayúsculas y minúsculas como las escribas
                                onClick={handleClickOpen}
                            >
                                <AddTaskIcon style={{ marginRight: 4 }} />
                                Editar
                            </Button>
                        </div>
                        {/* TODO Modal */}


                        {/* <FullScreenDialog
                            open={open}
                            handleClickOpen={handleClickOpen}
                            handleClose={handleClose}
                        >
                            hola
                        </FullScreenDialog> */}



                        {/* <EditOrderModal
                            open={open}
                            handleClose={handleClose}
                            order={order}
                            onSave={(updatedOrder) => {
                                // Implementar lógica para guardar los cambios
                                saveUpdateData(updatedOrder)
                                // console.log("Orden actualizada:", updatedOrder);
                            }}
                            menuData={{
                                mainMenu: hojas?.Hoja1 || [],
                                promotions: hojas?.Promotion || []
                            }}
                        /> */}




                        <br />
                        <Divider sx={{ my: 1 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: isMobile ? "column" : "row",
                            }}
                        >
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
                                Total: ${total.toFixed(2)}
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={0.5}
                                sx={{
                                    width: isMobile ? "100%" : "auto",
                                    justifyContent: isMobile ? "space-between" : "flex-end",
                                }}
                            >
                                {config.actions.map((action: any) => (
                                    <Button
                                        key={action.action}
                                        size="small"
                                        variant="contained"
                                        color={action.color as any}
                                        startIcon={!isMobile && action.icon}
                                        onClick={() => onOrderAction(action.action, order)}
                                        sx={{
                                            minWidth: 0,
                                            px: { xs: 1, sm: 1.5 },
                                            py: 0.5,
                                            fontSize: "0.7rem",
                                        }}
                                    >
                                        {isMobile ? action.icon : action?.label}
                                    </Button>
                                ))}
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </ListItem>
            <Divider />
        </>
    )
}

// export default OrderItem
export default React.memo(OrderItem);
