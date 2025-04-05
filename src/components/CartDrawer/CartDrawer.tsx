import { Drawer, DrawerProps } from '@mui/material';
import React from 'react';

interface GenericDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  drawerProps?: Omit<DrawerProps, 'open' | 'onClose' | 'anchor'>;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GenericDrawer: React.FC<GenericDrawerProps> = ({
  isOpen,
  onClose,
  children,
  anchor = 'right',
  width = 350,
  drawerProps = {},
  setCartOpen
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={isOpen}
      onClose={() => setCartOpen(false)}
      PaperProps={{
        sx: {
          width: width,
          padding: 2,
          ...drawerProps.PaperProps?.sx,
        },
        ...drawerProps.PaperProps,
      }}
      {...drawerProps}
    >
      {children}
    </Drawer>
  );
};