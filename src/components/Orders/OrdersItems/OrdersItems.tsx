// import { EditNotifications } from '@mui/icons-material';
// import { Box, Divider, IconButton, Typography } from '@mui/material';
// import { DeleteIcon } from 'lucide-react';
// import React from 'react'

// const OrderItem = ({ item, onDelete, onEdit }: { item: any; onDelete: () => void; onEdit: () => void }) => (
//     <Box sx={{ marginBottom: 2 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6">{item.Name}</Typography>
//         <Box>
//           <IconButton onClick={onEdit} color="primary" aria-label="edit">
//             <EditNotifications />
//           </IconButton>
//           <IconButton onClick={onDelete} color="error" aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       </Box>
//       <Typography variant="body1">{item.Description}</Typography>
//       <Typography variant="body2" color="textSecondary">Precio: ${item.Price}</Typography>
  
//       {item.extra?.length > 0 && (
//         <Box sx={{ marginTop: 1 }}>
//           <Typography variant="subtitle2">Extras:</Typography>
//           {item.extra.map((extra: any, i: number) => (
//             <Typography key={i} variant="body2">
//               {extra.name}: ${extra.price}
//             </Typography>
//           ))}
//         </Box>
//       )}
  
//       <Divider sx={{ marginTop: 2 }} />
//     </Box>
//   );
// export default OrderItem



import { EditNotifications } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { DeleteIcon } from 'lucide-react';
import React from 'react';

const OrderItem = ({ item, onDelete, onEdit }: { item: any; onDelete: () => void; onEdit: () => void }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginBottom: 2,
        padding: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      {/* Encabezado del ítem */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          {item.Name}
        </Typography>
        <Box>
          {/* Botón de editar */}
          <IconButton
            onClick={onEdit}
            color="primary"
            aria-label="edit"
            sx={{ '&:hover': { backgroundColor: theme.palette.primary.light } }}
          >
            <EditNotifications />
          </IconButton>
          {/* Botón de eliminar */}
          <IconButton
            onClick={onDelete}
            color="error"
            aria-label="delete"
            sx={{ '&:hover': { backgroundColor: theme.palette.error.light } }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Descripción del ítem */}
      <Typography variant="body1" sx={{ marginTop: 1, color: theme.palette.text.secondary }}>
        {item.Description}
      </Typography>

      {/* Precio del ítem */}
      <Typography variant="body2" sx={{ marginTop: 1, color: theme.palette.text.secondary }}>
        Precio: <strong>${item.Price}</strong>
      </Typography>

      {/* Lista de extras */}
      {item.extra?.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Extras:
          </Typography>
          {item.extra.map((extra: any, i: number) => (
            <Typography key={i} variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {extra.name}: <strong>${extra.price}</strong>
            </Typography>
          ))}
        </Box>
      )}

      {/* Divisor */}
      <Divider sx={{ marginTop: 2, backgroundColor: theme.palette.divider }} />
    </Box>
  );
};

export default OrderItem;