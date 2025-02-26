import React from 'react';
import { Grid, Box } from '@mui/material';

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
        flexDirection: 'row',  // Coloca los elementos en fila
        justifyContent: 'space-between', // Distribuye los elementos de manera uniforme
        overflow: 'hidden', // Evita que haya desbordamiento
        gap: 2, // Espaciado entre elementos
      }}
    >
      {React.Children.map(children, (child, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'background.paper',
            padding: 2,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 1,
            },
          }}
        >
          {child}  {/* Renderiza cada hijo dentro de su propio Box */}
        </Box>
      ))}
    </Box>
  );
};

export default DashboardBody;
