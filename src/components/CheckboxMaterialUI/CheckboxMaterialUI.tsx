import React from 'react';
import { Checkbox, FormControlLabel, Typography, SxProps, Theme } from '@mui/material';

interface CheckboxMaterialUIProps {
  name: string; // Nombre único del checkbox
  checked: boolean; // Estado del checkbox
  onChange: (name: string, isChecked: boolean) => void; // Función para manejar cambios
  label?: string; // Texto del label
  color?: 'primary' | 'secondary' | 'default'; // Color del checkbox
  size?: 'small' | 'medium'; // Tamaño del checkbox
  disabled?: boolean; // Deshabilitar el checkbox
  sx?: SxProps<Theme>; // Estilos personalizados
  ariaLabel?: string; // Accesibilidad: aria-label
}

const CheckboxMaterialUI: React.FC<CheckboxMaterialUIProps> = ({
  name,
  checked,
  onChange,
  label,
  color = 'primary',
  size = 'small',
  disabled = false,
  sx,
  ariaLabel,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChange(name, isChecked); // Llama a la función onChange con el nombre y el estado
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={handleChange}
          color={color}
          size={size}
          disabled={disabled}
          inputProps={{ 'aria-label': ariaLabel }} // Accesibilidad
        />
      }
      label={<Typography sx={sx}>{label}</Typography>} // Label con estilos personalizados
      sx={{ margin: 0 }} // Estilos para el FormControlLabel
    />
  );
};

export default CheckboxMaterialUI;