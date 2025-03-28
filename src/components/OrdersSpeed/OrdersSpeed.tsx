import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { messageSocketService } from "@/services/orderSocketServices/MessageSocket.services";

import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Paper,
  Container,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  LocalOffer as PromoIcon,
} from "@mui/icons-material";
import Image from "next/image";
import GutterlessList from "../GenericList/OrdersList";


const OrdersSpeed = () => {
  const [userData, setUserData] = useState<any>();
  const [comapinesData, setCompaniesData] = useState<any>();

  const [messages, setMessages] = useState<any[]>([]); // Acumulador de mensajes

  const receivedIds = useRef(new Set()); // Almacena los IDs y persiste entre renders

  const { data } = useSelector(
    (state: RootState) => state.chExcelData as unknown as { data: any }
  );
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) setUserData(user?.user);
  }, [user]);

  useEffect(() => {
    if (data) setCompaniesData(data);
  }, [data]);

  useEffect(() => {
    const init = async () => {
      await messageSocketService.initialize(
        `${userData?.email}`,
        `${comapinesData?.companyName}`
      );
    };
    init();

    return () => {
      messageSocketService.removeMessageHandler(handler);
    };
  }, []);

  const handler = (message: any) => {
    const messageId = message.data.id;
    if (!receivedIds.current.has(messageId)) {
      receivedIds.current.add(messageId);
      // console.log("Mensaje recibido:", message, "*****", messageId);
      setMessages((prevMessages) => {
        // Verificamos si el mensaje ya está en el estado
        if (!prevMessages.some((msg) => msg.data.id === messageId)) {
          return [...prevMessages, message]; // Agregar el mensaje si no está
        }
        return prevMessages; // Si ya está, no hacemos nada
      });
    }
  };

  useEffect(() => {
    messageSocketService.addMessageHandler(handler);
    return () => {
      messageSocketService.removeMessageHandler(handler);
    };
  }, []); // Solo se ejecuta una vez al montar el componente


  console.log("🚀 ~ OrdersSpeed ~ messages:", messages)


  return (

    <div>
      <Box sx={{ pb: 7 }}>
        <AppBar position="static" color="primary">

          <Toolbar>
            <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              <Avatar sx={{ width: 50, height: 50 }}>
                <Image
                  src={"/images/flama.png"}
                  alt={"LlakaScript"}
                  width={50}
                  height={50}
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </Avatar>
              Llakascript
            </Typography>
            OrdersSpeed
          </Toolbar>
        </AppBar>

        <GutterlessList
          data={messages}
        />
      </Box>

    </div>
  );
};

export default OrdersSpeed;
