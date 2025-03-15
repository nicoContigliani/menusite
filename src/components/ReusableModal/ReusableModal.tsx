import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Fade,
  alpha,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cierre

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions?: React.ReactNode;
  fullScreen?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  children: React.ReactNode;
  showButtons?: boolean; // Nueva prop para controlar la visibilidad de los botones
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  actions,
  fullScreen = false,
  maxWidth = 'sm',
  children,
  showButtons = true, // Valor por defecto true
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Alinea el título y la "X"
          gap: 1,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        }}
      >
        <Typography variant="h6" component="span">
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" /> {/* Ícono de cierre */}
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {children} {/* Aquí se renderiza el contenido pasado como `children` */}
      </DialogContent>

      {showButtons && ( // Condicional para mostrar los botones
        <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
          {actions || (
            <>
              <Button onClick={onClose} color="inherit" size="small">
                Cancelar
              </Button>
              <Button onClick={onClose} variant="contained" color="primary" size="small">
                Aceptar
              </Button>
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ReusableModal;

///////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import ReusableModal from './ReusableModal';
// import { Button, Typography } from '@mui/material';

// const ParentComponent: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleOpenModal}>
//         Abrir Modal
//       </Button>

//       <ReusableModal
//         open={isModalOpen}
//         onClose={handleCloseModal}
//         title="Título del Modal"
//         content={
//           <Typography>
//             Este es el contenido del modal. Puedes agregar cualquier cosa aquí.
//           </Typography>
//         }
//         actions={
//           <>
//             <Button onClick={handleCloseModal} color="secondary">
//               Cancelar
//             </Button>
//             <Button onClick={handleCloseModal} color="primary">
//               Aceptar
//             </Button>
//           </>
//         }
//       />
//     </div>
//   );
// };

// export default ParentComponent;