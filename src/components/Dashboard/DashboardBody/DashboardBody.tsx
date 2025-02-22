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
        minHeight: '100vh',  // Asegura que el Box ocupe al menos el 100% de la altura de la ventana
        display: 'flex',
        flexDirection: 'row',  // Coloca los elementos en columna
        justifyContent: 'space-between', // Alinea los elementos al inicio
        overflow: 'hidden', // Evita que haya desbordamiento
      }}
    >
      <Grid container spacing={4} sx={{ flexGrow: 3 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'background.paper',
              padding: 3,
              height: '100%',  // Asegura que el Box ocupe el 100% de la altura del contenedor
              marginTop: 0,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
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
