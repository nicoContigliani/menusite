import React, { useState } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cierre
import ReusableModal from '../ReusableModal/ReusableModal';

// Definir la interfaz para las props
interface MoreInfoProps {
  titleModal?: string; // Prop opcional para el título del modal
  modalcontent?: string; // Prop opcional para el contenido del modal
}

const MoreInfo: React.FC<MoreInfoProps> = ({ titleModal, modalcontent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        onClick={handleOpenModal}
        sx={{
          textTransform: 'none', // Desactiva la transformación a mayúsculas
          padding: 0, // Elimina el padding interno
          minWidth: 'auto', // Elimina el ancho mínimo del botón
          margin: 0, // Elimina los márgenes externos
        }}
      >
        More Info
      </Button>

      <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={titleModal || "Título del Modal"} // Usa el título proporcionado o uno por defecto
        content={
          <>
            {/* Botón de cierre en la esquina superior derecha */}
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute', // Posición absoluta
                top: 8, // Distancia desde la parte superior
                right: 8, // Distancia desde la derecha
                color: 'text.secondary', // Color del ícono
                '&:hover': {
                  color: 'text.primary', // Cambia el color al pasar el mouse
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography>
              {modalcontent || "Contenido del Modal"} {/* Usa el contenido proporcionado o uno por defecto */}
            </Typography>
          </>
        }
        actions={
          <>
            {/* <Button onClick={handleCloseModal} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCloseModal} color="primary">
              Aceptar
            </Button> */}
          </>
        }
      />
    </div>
  );
};

export default MoreInfo;