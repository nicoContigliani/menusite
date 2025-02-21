import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

interface DashboardBodyProps {
  children: React.ReactNode;  // Permitimos que se pase cualquier contenido como hijo
}

const DashboardBody: React.FC<DashboardBodyProps> = ({ children }) => {
  return (
    <Box
      sx={{
        padding: { xs: 3, sm: 4, md: 5 },
        backgroundColor: 'background.default',
        minHeight: '100vh', // Asegura que el Box ocupe toda la altura de la ventana
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'background.paper',
              padding: 3,
              height: 'auto',
              marginTop: 0,  // Mantiene el Box cerca de la parte superior
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)', // Añade un pequeño efecto al pasar el ratón
                boxShadow: 6, // Aumenta la sombra en el hover
              },
            }}
          >
         
            {children}  {/* Aquí se renderiza el contenido hijo */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardBody;
