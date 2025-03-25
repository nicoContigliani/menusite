import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useTheme, useMediaQuery } from '@mui/material';

export interface SpeedDialActionType {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

interface CustomSpeedDialProps {
  actions: SpeedDialActionType[]|any[]|any;
  mainIcon?: React.ReactNode;
  openIcon?: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  position?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  ariaLabel?: string;
  hidden?: boolean;
  className?: string;
  sx?: object;
}

const CustomSpeedDial: React.FC<CustomSpeedDialProps> = ({
  actions = [],
  mainIcon = <SpeedDialIcon />,
  openIcon,
  direction = 'up',
  position = { vertical: 'bottom', horizontal: 'right' },
  ariaLabel = 'Custom speed dial',
  hidden = false,
  className = '',
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: position.vertical === 'bottom' ? 16 : undefined,
        top: position.vertical === 'top' ? 16 : undefined,
        right: position.horizontal === 'right' ? 16 : undefined,
        left: position.horizontal === 'left' ? 16 : undefined,
        zIndex: theme.zIndex.speedDial,
        ...sx
      }}
      className={className}
    >
      <SpeedDial
        ariaLabel={ariaLabel}
        hidden={hidden}
        icon={openIcon ? <SpeedDialIcon openIcon={openIcon} /> : mainIcon}
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
        direction={direction}
        sx={{
          '& .MuiSpeedDial-actions': {
            flexDirection: direction === 'up' ? 'column-reverse' : 
                          direction === 'down' ? 'column' :
                          direction === 'left' ? 'row-reverse' : 'row'
          }
        }}
      >
        {actions.map((action:any, index:any) => (
          <SpeedDialAction
            key={`${action.name}-${index}`}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              action.onClick?.();
              handleClose();
            }}
            tooltipPlacement={
              action.tooltipPlacement || 
              (isMobile ? 'right' : 'left')
            }
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default CustomSpeedDial;
//use
// import CustomSpeedDial from './CustomSpeedDial';
// import SaveIcon from '@mui/icons-material/Save';
// import ShareIcon from '@mui/icons-material/Share';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';

// const MyComponent = () => {
//   const actions = [
//     {
//       icon: <AddIcon />,
//       name: 'Add',
//       onClick: () => console.log('Add clicked'),
//     },
//     {
//       icon: <SaveIcon />,
//       name: 'Save',
//       onClick: () => console.log('Save clicked'),
//       tooltipPlacement: 'right'
//     },
//     {
//       icon: <ShareIcon />,
//       name: 'Share',
//       onClick: () => console.log('Share clicked')
//     },
//     {
//       icon: <DeleteIcon />,
//       name: 'Delete',
//       onClick: () => console.log('Delete clicked')
//     }
//   ];

//   return (
//     <div>
//       {/* Uso básico */}
//       <CustomSpeedDial actions={actions} />
      
//       {/* Uso personalizado */}
//       <CustomSpeedDial
//         actions={actions.slice(0, 2)}
//         mainIcon={<AddIcon />}
//         openIcon={<DeleteIcon />}
//         direction="left"
//         position={{ vertical: 'top', horizontal: 'right' }}
//         ariaLabel="Quick actions menu"
//         sx={{ backgroundColor: 'transparent' }}
//       />
//     </div>
//   );
// };