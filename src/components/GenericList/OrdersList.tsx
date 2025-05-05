import React from 'react';
import { motion } from 'framer-motion';
import {
  List,
  ListItem,
  Box,
  useTheme,
  IconButton,
  Chip,
  Tooltip,
  Stack,
  useMediaQuery
} from '@mui/material';
import {
  CheckCircle,
  HourglassTop,
  PlayArrow,
  Pause,
  Replay,
  Cancel
} from '@mui/icons-material';
import OrderDetails from './OrderDetails';

interface OrderListProps {
  data: any[];
  loading: boolean;
  onAction: (action: string, order: any) => void;
}

const statusConfig = {
  pending: { 
    color: 'warning' as const, 
    icon: <HourglassTop fontSize="small" />,
    label: 'Pendiente'
  },
  processing: { 
    color: 'info' as const, 
    icon: <PlayArrow fontSize="small" />,
    label: 'En proceso'
  },
  paused: { 
    color: 'primary' as const, 
    icon: <Pause fontSize="small" />,
    label: 'Pausado'
  },
  finished: { 
    color: 'success' as const, 
    icon: <CheckCircle fontSize="small" />,
    label: 'Completado'
  },
  cancelled: { 
    color: 'error' as const, 
    icon: <Cancel fontSize="small" />,
    label: 'Cancelado'
  }
};

const actionButtons = {
  start: {
    icon: <PlayArrow fontSize="small" />,
    label: 'Tomar orden',
    color: 'info' as const
  },
  pause: {
    icon: <Pause fontSize="small" />,
    label: 'Pausar orden',
    color: 'warning' as const
  },
  resume: {
    icon: <PlayArrow fontSize="small" />,
    label: 'Continuar',
    color: 'info' as const
  },
  complete: {
    icon: <CheckCircle fontSize="small" />,
    label: 'Completar',
    color: 'success' as const
  },
  cancel: {
    icon: <Cancel fontSize="small" />,
    label: 'Cancelar',
    color: 'error' as const
  },
  reopen: {
    icon: <Replay fontSize="small" />,
    label: 'Reabrir',
    color: 'warning' as const
  }
};

export default function OrdersList({ data, loading, onAction }: OrderListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getActions = (order: any) => {
    const status = order.status || 'pending';
    const actions = [];

    switch (status) {
      case 'pending':
        actions.push('start');
        break;
      case 'processing':
        actions.push('pause', 'complete');
        break;
      case 'paused':
        actions.push('resume', 'complete');
        break;
      case 'finished':
      case 'cancelled':
        actions.push('reopen');
        break;
    }

    // Acciones adicionales
    if (['processing', 'paused'].includes(status)) {
      actions.push('cancel');
    }

    return actions.map(action => ({
      action,
      ...actionButtons[action as keyof typeof actionButtons]
    }));
  };

  return (
    <List sx={{
      width: '100%',
      p: 0,
      '& .MuiListItem-root': {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-2px)'
        }
      }
    }}>
      {data?.map((order, index) => {
        const status = order.status || 'pending';
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const actions = getActions(order);

        return (
          <motion.div
            key={order._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ListItem>
              {/* Contenido principal */}
              <Box sx={{
                flex: 1,
                mr: isMobile ? 0 : 2,
                mb: isMobile ? 1.5 : 0,
                width: isMobile ? '100%' : 'auto'
              }}>
                <OrderDetails order={order} index={index} />
              </Box>

              {/* Controles */}
              <Stack
                direction={isMobile ? 'row' : 'column'}
                spacing={1}
                sx={{
                  alignItems: 'center',
                  justifyContent: isMobile ? 'space-between' : 'flex-end',
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? '100%' : 150
                }}
              >
                {/* Estado */}
                <Chip
                  label={config.label}
                  icon={config.icon}
                  color={config.color}
                  size="small"
                  sx={{
                    minWidth: 100,
                    justifyContent: 'flex-start',
                    '& .MuiChip-icon': {
                      ml: 0.5,
                      color: 'inherit'
                    }
                  }}
                />

                {/* Botones de acción */}
                <Stack 
                  direction="row" 
                  spacing={0.5}
                  sx={{
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}
                >
                  {actions.map((btn) => (
                    <Tooltip key={btn.action} title={btn.label}>
                      <IconButton
                        size="small"
                        onClick={() => onAction(btn.action, order)}
                        disabled={loading}
                        sx={{
                          color: theme.palette[btn.color].main,
                          backgroundColor: `${theme.palette[btn.color].light}30`,
                          '&:hover': {
                            backgroundColor: theme.palette[btn.color].main,
                            color: theme.palette.common.white
                          },
                          transition: 'all 0.2s ease',
                          '&:disabled': {
                            opacity: 0.5
                          }
                        }}
                      >
                        {btn.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Stack>
              </Stack>
            </ListItem>
          </motion.div>
        );
      })}
    </List>
  );
}