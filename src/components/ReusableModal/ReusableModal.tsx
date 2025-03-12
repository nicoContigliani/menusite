import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  Fade,
  alpha,
  useTheme,
} from '@mui/material';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  fullScreen?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
  fullScreen = false,
  maxWidth = 'sm',
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
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        }}
      >
        <Typography variant="h6" component="span">
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        {content}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        {actions || (
          <>
            <Button onClick={onClose} color="inherit" size="small">
              Cancel
            </Button>
            <Button onClick={onClose} variant="contained" color="primary" size="small">
              Submit
            </Button>
          </>
        )}
      </DialogActions>
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