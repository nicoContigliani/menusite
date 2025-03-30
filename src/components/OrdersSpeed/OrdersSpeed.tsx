import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";



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
import Chat from "../Chat/ Chat";





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


        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Chat con Salas</h2>
   
            <Chat/>
        </div>



        {/* <GutterlessList
          data={messages}
        /> */}
      </Box>

    </div>
  );
};

export default OrdersSpeed;
