import { EditNotifications } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { DeleteIcon } from 'lucide-react';
import React from 'react'

const OrderItem = ({ item, onDelete, onEdit }: { item: any; onDelete: () => void; onEdit: () => void }) => (
    <Box sx={{ marginBottom: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{item.Name}</Typography>
        <Box>
          <IconButton onClick={onEdit} color="primary" aria-label="edit">
            <EditNotifications />
          </IconButton>
          <IconButton onClick={onDelete} color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body1">{item.Description}</Typography>
      <Typography variant="body2" color="textSecondary">Precio: ${item.Price}</Typography>
  
      {item.extra?.length > 0 && (
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="subtitle2">Extras:</Typography>
          {item.extra.map((extra: any, i: number) => (
            <Typography key={i} variant="body2">
              {extra.name}: ${extra.price}
            </Typography>
          ))}
        </Box>
      )}
  
      <Divider sx={{ marginTop: 2 }} />
    </Box>
  );
export default OrderItem
