import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface DashboardCardProps {
  children: React.ReactNode;  // Permite pasar cualquier contenido como hijos
  title?: string;              // Título de la tarjeta
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children, title }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', width: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}  {/* Mostramos el título de la tarjeta */}
        </Typography>
        <div>
          {children}  {/* Aquí se renderiza el contenido hijo */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
