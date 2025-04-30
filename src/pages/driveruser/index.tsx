import React, { useEffect, useState } from 'react';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Grid
} from '@mui/material';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';

import MenuIcon from '@mui/icons-material/Menu';
import ComponentResponsiveAuth from '@/components/Responsive/ComponentResponsiveAuth/ComponentResponsiveAuth';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { clearLocalhostStorage, getLocalhostStorage } from '@/services/localstorage.services';
import { clearError, loginSuccess } from '../../../store/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import ComponentResponsiveSteeps from '@/components/Responsive/ComponentResponsiveSteeps/ComponentResponsiveSteeps';
import { CheckIcon, PersonStandingIcon } from 'lucide-react';
import ErrorIcon from '@mui/icons-material/Error';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { DynamicForm, InputType } from '@/components/Responsive/ComponentsResponsiveDynamicFormManager./ComponentsResponsiveDynamicFormManager.';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useDateTimeFormatter from '../../../hooks/useDateTimeFormatter';


const HomePage: React.FC = () => {

  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dataInserted, setDataInserted] = useState(false);

  const [startData, setStartData] = useState(true)



  const [steepsSelect, setSteepSelect] = useState<number>(0)



  const [catchDataTurnStart, setCatchDataTurnStart] = useState<object | any>({})
  const [catchDataWork, setCatchDataWork] = useState<object | any>({})
  const [catchDataTurnFinish, setCatchDataTurnFinish] = useState<object | any>({})

  // // catchDataTurnStart,catchDataWork,catchDataTurnFinish

  const {
    login,
    register,
    error,
    isLoading,
    isAuthenticated,
    isRegistering,
    toggleAuthMode,
    setIsAuthenticated,
    logout
  } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedData: any = getLocalhostStorage();
      if (storedData?.token) {
        dispatch(loginSuccess(storedData));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, [dispatch, setIsAuthenticated]);

  const handleLogout = async () => {
    logout();
    clearLocalhostStorage();
    dispatch(clearError());
    setIsAuthenticated(false);
  };

  const handleAuthModeToggle = () => {
    dispatch(clearError());
    toggleAuthMode();
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleActions = (option: string) => {
    if (option === 'Inicio') {
      setDataInserted(true);
    }
    setDrawerOpen(false);
  };

  const drawerItems = [
    {
      text: 'Day',
      icon: <HomeIcon />,
      onClick: () => handleActions('Inicio'),
    },
    {
      text: 'Month',
      icon: <HomeIcon />,
      onClick: () => handleActions('Month'),
    },
    {
      text: 'Show',
      icon: <VisibilityIcon />,
      onClick: () => handleActions('Month'),
    },

    {
      text: 'Configuración',
      icon: <SettingsIcon />,
      onClick: () => console.log('Ir a Configuración'),
    },
    {
      text: 'Contacto',
      icon: <MailIcon />,
      onClick: () => console.log('Ir a Contacto'),
    },
  ];


  //TODO steeps
  const dataSteeps = [
    { label: 'Toma de Turno', description: 'Data Inicial', icon: <AlarmOnIcon /> },
    { label: 'Paso 2', description: 'Trabajo', icon: <DriveEtaIcon /> },
    { label: 'Paso 3', description: 'Data Final', icon: <AlarmOffIcon /> },
  ]



  const formConfig = {
    fields: [
      {
        id: 'comienzoturno',
        label: 'Comienzo de Turno',
        type: 'datetime-local' as InputType,
      },
      {
        id: 'combustibleinicial',
        label: 'Combustible Inicial',
        type: 'select' as InputType,
        options: [
          { value: '0', label: '0%' },
          { value: '25', label: '25%' },
          { value: '50', label: '50%' },
          { value: '75', label: '75%' },
          { value: '100', label: '100%' },
        ],
      },
      {
        id: 'kilomstrajeinicial',
        label: 'Kilomstraje Inicial',
        type: 'number' as InputType,
        min: 1,
        max: 10000000,
      },

      // {
      //   id: 'name',
      //   label: 'Nombre',
      //   type: 'text' as InputType,
      //   required: true,
      //   placeholder: 'Escribe tu nombre',
      // },
      // {
      //   id: 'email',
      //   label: 'Correo electrónico',
      //   type: 'email' as InputType,
      //   required: true,
      // },
      // {
      //   id: 'age',
      //   label: 'Edad',
      //   type: 'number' as InputType,
      //   min: 18,
      //   max: 100,
      // },
      // {
      //   id: 'bio',
      //   label: 'Biografía',
      //   type: 'textarea' as InputType,
      //   rows: 5,
      // },
      // {
      //   id: 'gender',
      //   label: 'Género',
      //   type: 'radio' as InputType,
      //   options: [
      //     { value: 'male', label: 'Masculino' },
      //     { value: 'female', label: 'Femenino' },
      //   ],
      // },
      // {
      //   id: 'newsletter',
      //   label: 'Recibir noticias',
      //   type: 'checkbox' as InputType,
      //   defaultValue: true,
      // },
      // {
      //   id: 'birthDate',
      //   label: 'Fecha de nacimiento',
      //   type: 'date' as InputType,
      // },
      // {
      //   id: 'satisfaction',
      //   label: 'Nivel de satisfacción',
      //   type: 'range' as InputType,
      //   min: 1,
      //   max: 10,
      //   defaultValue: 5,
      // },
      // {
      //   id: 'country',
      //   label: 'País',
      //   type: 'select' as InputType,
      //   options: [
      //     { value: 'cl', label: 'Chile' },
      //     { value: 'ar', label: 'Argentina' },
      //     { value: 'mx', label: 'México' },
      //   ],
      //   required: true,
      // },
    ],
  };

  const formConfigWork: any = {
    fields: [
      {
        id: 'tipodeingreso',
        label: 'Tipo de Movimiento',
        type: 'select',
        options: [
          { value: 'cobro', label: 'Cobro' },
          { value: 'gasto', label: 'gasto' },
        ],
        required: true,
      },

      {
        id: 'monto',
        label: 'Monto a cobrar',
        type: 'number',
        min: 1,
        max: 10000000,
        showIf: (values: any) => values.tipodeingreso === 'cobro',
        required: true
      },
      {
        id: 'propina',
        label: 'Monto propina',
        type: 'number',
        min: 0,
        max: 10000000,
        showIf: (values: any) => values.tipodeingreso === 'cobro'
      },
      {
        id: 'tipodeingreso',
        label: 'Tipo de Gastp',
        type: 'select',
        options: [
          { value: 'comida', label: 'Comida' },
          { value: 'bebida', label: 'Bebida' },
          { value: 'combustible', label: 'Combustible' },
          { value: 'mecanico', label: 'Mecánico' },
          { value: 'fletero', label: 'Fletero' },
          { value: 'gomero', label: 'Gomero' },
          { value: 'celular', label: 'celular' },
        ],
        showIf: (values: any) => values.tipodeingreso !== 'cobro',
        required: true,
      },
      {
        id: 'monto_gasto',
        label: 'Monto del gasto',
        type: 'number',
        min: 1,
        max: 10000000,
        showIf: (values: any) => values.tipodeingreso !== 'cobro',
        required: true
      },
      {
        id: 'descripcion',
        label: 'Descripción',
        type: 'text',
        showIf: (values: any) => values.tipodeingreso !== 'cobro',
        placeholder: 'Detalle del gasto'
      }
    ]
  };

  const formConfigFinishTurn = {
    fields: [
      {
        id: 'finturno',
        label: 'Fin de Turno',
        type: 'datetime-local' as InputType,
      },
      {
        id: 'combustiblefinal',
        label: 'Combustible Final',
        type: 'select' as InputType,
        options: [
          { value: '0', label: '0%' },
          { value: '25', label: '25%' },
          { value: '50', label: '50%' },
          { value: '75', label: '75%' },
          { value: '100', label: '100%' },
        ],
      },
      {
        id: 'kilomstrajefinal',
        label: 'Kilomstraje Final',
        type: 'number' as InputType,
        min: 1,
        max: 10000000,
      }]
  }

  const handleFormSubmitStart = (data: any) => {
    console.log('Datos enviados:', data);
    setCatchDataTurnStart(data)
  };
  const handleFormSubmitWork = (data: any) => {
    console.log('Datos enviados:', data);
    setCatchDataWork(data)
  };

  const handleFormSubmitFinish = (data: any) => {
    console.log('Datos enviados:', data);
    setCatchDataTurnFinish(data)
  };




  const drawerContent = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Toolbar />
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            User Drive
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent()}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar />

        {isAuthenticated ? (
          <>
            {dataInserted ? (
              <div>

                <Box sx={{
                  display: 'flex',
                  width: '90%',
                  gap: 1, // Espacio entre componentes
                  p: 0,
                  pt: 2,
                  overflow: 'auto' // Para contenido que exceda el ancho
                }}>
                  {/* Primer componente */}
                  <Paper elevation={3} sx={{
                    pl: 0,
                    pr: 1,
                    minWidth: '10%', // O el ancho que necesites
                    flex: 1 // Para que ocupe espacio disponible
                  }}>
                    <ComponentResponsiveSteeps
                      activeStep={steepsSelect}
                      steps={dataSteeps}
                      orientation="vertical"
                      onStepClick={(step) => setSteepSelect(step)}
                    />
                  </Paper>

                  {/* Segundo componente */}
                  <Paper elevation={3} sx={{
                    pl: 2,
                    pt: 1,
                    minWidth: '58%', // O el ancho que necesites
                    flex: 1 // Para que ocupe espacio disponible
                  }}>
                    <CssBaseline />
                    {
                      steepsSelect === 0 &&
                      <DynamicForm
                        formConfig={formConfig}
                        onSubmit={handleFormSubmitStart}
                      />
                    }
                    {
                      steepsSelect === 1 &&
                      <DynamicForm
                        formConfig={formConfigWork}
                        onSubmit={handleFormSubmitWork}
                      />
                    }

                    {
                      steepsSelect === 2 &&
                      <DynamicForm
                        formConfig={formConfigFinishTurn}
                        onSubmit={handleFormSubmitFinish}
                      />
                    }
                  </Paper>




                </Box>
                {
                  catchDataTurnStart?.comienzoturno &&
                  catchDataTurnStart?.combustibleinicial !== undefined &&
                  catchDataTurnStart?.kilomstrajeinicial !== undefined && (
                    <div>
                      Comienzo de Turno: {useDateTimeFormatter().formatDateTime(
                        catchDataTurnStart.comienzoturno,
                        { customFormat: 'dd/MM/yyyy HH:mm' }
                      )} <br />
                      Combustible inicial: {catchDataTurnStart.combustibleinicial}% <br />
                      Kilometraje inicial: {catchDataTurnStart.kilomstrajeinicial}
                    </div>
                  )
                }

              </div>

            ) : (
              <Typography variant="h5" component="div" sx={{ textAlign: 'center', mt: 4 }}>
                Bienvenido a User Drive
              </Typography>
            )}
          </>
        ) : (
          <Box
            sx={{
              height: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000e1',
            }}
          >
            <ComponentResponsiveAuth
              login={login}
              register={register}
              error={error}
              isLoading={isLoading}
              isRegistering={isRegistering}
              toggleAuthMode={handleAuthModeToggle}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
