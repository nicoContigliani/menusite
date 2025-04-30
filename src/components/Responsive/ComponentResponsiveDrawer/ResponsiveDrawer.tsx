// components/Drawer.tsx
import React from 'react';
import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  styled,
  useTheme,
  CSSObject,
  Theme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Tipos para los items del Drawer
export type DrawerItem = {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
};

// Props del componente
interface DrawerProps extends MuiDrawerProps {
  items: DrawerItem[];
  header?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  width?: number;
}

// Estilos para el Drawer abierto
const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Estilos para el Drawer cerrado
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Componente estilizado
const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'width',
})<{ open: boolean; width: number }>(({ theme, open, width }) => ({
  width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, width),
    '& .MuiDrawer-paper': openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Drawer: React.FC<DrawerProps> = ({
  items,
  header,
  open,
  onClose,
  width = 240,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      width={width}
      onClose={onClose}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), ...theme.mixins.toolbar, justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      
      {header && (
        <>
          {header}
          <Divider />
        </>
      )}
      
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={item.onClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Drawer;





// // pages/index.tsx
// import React, { useState } from 'react';
// import Drawer from '../components/Drawer';
// import {
//   Home as HomeIcon,
//   Settings as SettingsIcon,
//   Mail as MailIcon,
// } from '@mui/icons-material';
// import { AppBar, Toolbar, Typography, Button, CssBaseline, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const HomePage: React.FC = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const drawerItems = [
//     {
//       text: 'Inicio',
//       icon: <HomeIcon />,
//       onClick: () => console.log('Ir a Inicio'),
//     },
//     {
//       text: 'Configuración',
//       icon: <SettingsIcon />,
//       onClick: () => console.log('Ir a Configuración'),
//     },
//     {
//       text: 'Contacto',
//       icon: <MailIcon />,
//       onClick: () => console.log('Ir a Contacto'),
//     },
//   ];

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={toggleDrawer}
//             edge="start"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Mi Aplicación
//           </Typography>
//         </Toolbar>
//       </AppBar>
      
//       <Drawer
//         items={drawerItems}
//         open={drawerOpen}
//         onClose={toggleDrawer}
//       />
      
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar /> {/* Espacio para el AppBar */}
//         <Typography paragraph>
//           Contenido principal de la aplicación...
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;