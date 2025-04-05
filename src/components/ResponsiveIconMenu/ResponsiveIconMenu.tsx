import React, { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  Badge,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  MenuProps as MuiMenuProps,
  styled,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

export interface ActionIcon {
  icon: React.ReactNode;
  onClick: () => void;
  badgeContent?: any | null;
  dividerBefore?: boolean;
  label: string;
  disabled?: boolean;
  iconButtonSx?: React.ComponentProps<typeof IconButton>['sx'];
}

interface ResponsiveIconMenuProps {
  icons: ActionIcon[];
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  menuProps?: Omit<MuiMenuProps, 'open' | 'anchorEl' | 'onClose'>;
  toolbarSx?: React.ComponentProps<typeof Toolbar>['sx'];
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    boxShadow: theme.shadows[3],
    minWidth: '200px',
    '& .MuiMenuItem-root': {
      padding: theme.spacing(1.5, 2),
      gap: theme.spacing(1.5),
      '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
        color: theme.palette.text.secondary,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

export const ResponsiveIconMenu: React.FC<ResponsiveIconMenuProps> = ({
  icons,
  breakpoint = 'md',
  menuProps = {},
  toolbarSx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (toolbarRef.current) {
        // Añadimos margen de seguridad para evitar flickering
        setOverflow(toolbarRef.current.scrollWidth > toolbarRef.current.clientWidth + 10);
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (toolbarRef.current) {
      observer.observe(toolbarRef.current);
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
      observer.disconnect();
    };
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const shouldCollapse = isMobile || overflow;
  const totalBadgeContent = icons.reduce((acc, icon) => acc + (icon.badgeContent || 0), 0);

  return (
    <Box sx={{ display: 'inline-block', position: 'relative' }}>
      <Toolbar 
        ref={toolbarRef} 
        sx={{ 
          padding: '0 !important', 
          minHeight: 'auto !important',
          display: 'inline-flex',
          ...toolbarSx 
        }}
      >
        {shouldCollapse ? (
          <IconButton 
            color="inherit" 
            onClick={handleMenuOpen} 
            aria-label="Menú de acciones"
            sx={{ position: 'relative' }}
          >
            <Badge 
              badgeContent={totalBadgeContent > 0 ? totalBadgeContent : undefined} 
              color="secondary"
              overlap="circular"
            >
              <MoreVertIcon />
            </Badge>
          </IconButton>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            {icons.map((action, index) => (
              <React.Fragment key={index}>
                {action.dividerBefore && (
                  <Divider 
                    orientation="vertical" 
                    flexItem 
                    sx={{ 
                      mx: 0.5,
                      height: '24px',
                      alignSelf: 'center'
                    }} 
                  />
                )}
                <IconButton 
                  color="inherit" 
                  onClick={action.onClick} 
                  aria-label={action.label}
                  disabled={action.disabled}
                  sx={action.iconButtonSx}
                >
                  <Badge 
                    badgeContent={action.badgeContent || undefined} 
                    color="secondary"
                    overlap="circular"
                  >
                    {action.icon}
                  </Badge>
                </IconButton>
              </React.Fragment>
            ))}
          </Box>
        )}
      </Toolbar>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            maxHeight: 'calc(100vh - 100px)',
            width: '240px',
            ...menuProps.PaperProps?.style,
          },
        }}
        {...menuProps}
        sx={{
          // Previene el cambio de layout del padre
          '&.MuiModal-root': {
            position: 'absolute !important',
          },
          ...menuProps.sx,
        }}
      >
        {icons.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick();
              handleMenuClose();
            }}
            disabled={action.disabled}
            sx={{
              minHeight: 'auto',
              '& .MuiListItemIcon-root': {
                minWidth: 'auto',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {action.icon}
            </Box>
            <Box ml={2} sx={{ flexGrow: 1 }}>{action.label}</Box>
            {action.badgeContent !== undefined && action.badgeContent > 0 && (
              <Box 
                ml={2}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  borderRadius: '12px',
                  minWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  padding: theme.spacing(0, 0.5),
                }}
              >
                {action.badgeContent}
              </Box>
            )}
          </MenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
};