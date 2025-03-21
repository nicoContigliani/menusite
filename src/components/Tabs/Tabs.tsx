import React, { useState } from 'react';
import {
  Tab,
  Tabs as MuiTabs,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  defaultTab?: number;
  centered?: boolean;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  orientation?: 'horizontal' | 'vertical';
  scrollButtons?: boolean | 'auto';
  allowScrollButtonsMobile?: boolean;
  textColor?: 'primary' | 'secondary' | 'inherit';
  indicatorColor?: 'primary' | 'secondary';
  sx?: SxProps<Theme>;
  tabSx?: SxProps<Theme>;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab = 0,
  centered = false,
  variant = 'scrollable',
  orientation = 'horizontal',
  scrollButtons = 'auto',
  allowScrollButtonsMobile = true,
  textColor = 'primary',
  indicatorColor = 'primary',
  sx,
  tabSx,
  onChange,
}) => {
  const [value, setValue] = useState(defaultTab);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onChange) {
      onChange(event, newValue);
    }
  };

  // Estilos condicionales para las pestañas
  const tabStyles: SxProps<Theme> = {
    fontSize: isMobile ? '0.875rem' : '1rem',
    minWidth: isMobile ? 'auto' : 100,
    ...(Array.isArray(tabSx) ? Object.assign({}, ...tabSx) : tabSx), // Asegura que no sea un array
  };

  // Estilos para MuiTabs
  const tabsStyles: SxProps<Theme> = {
    maxWidth: '100%',
    '& .MuiTab-root': (theme) => ({
      ...tabStyles, // Aplica estilos de las pestañas
    }),
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          centered={centered && !isMobile}
          variant={isMobile ? 'scrollable' : variant}
          orientation={orientation}
          scrollButtons={isMobile ? true : scrollButtons}
          allowScrollButtonsMobile={allowScrollButtonsMobile}
          textColor={textColor}
          indicatorColor={indicatorColor}
          sx={tabsStyles} // Aplicar estilos corregidos
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};
