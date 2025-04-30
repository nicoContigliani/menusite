import React, { ReactElement } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Box,
  Typography,
  styled,
  SxProps,
  useMediaQuery,
  StepIconProps
} from '@mui/material';
import { Check } from '@mui/icons-material';

// Tipos para las props
type StepItem = {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean | string;
  error?: boolean;
  completed?: boolean;
};

type StepsProps = {
  steps: StepItem[];
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  alternativeLabel?: boolean;
  connector?: ReactElement;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  nonLinear?: boolean;
  skipped?: number[];
  sx?: SxProps;
  onStepClick?: (stepIndex: number) => void;
};

// Conector personalizado
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 0px)',
    right: 'calc(50% + 12px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

// Icono personalizado
const CustomStepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean; error?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    ...(ownerState.completed && {
      color: theme.palette.primary.main,
    }),
    ...(ownerState.error && {
      color: theme.palette.error.main,
    }),
  }),
);

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, error, icon } = props;

  return (
    <CustomStepIconRoot ownerState={{ completed, active, error }}>
      {completed ? <Check fontSize="small" /> : icon}
    </CustomStepIconRoot>
  );
}

const ComponentResponsiveSteeps: React.FC<StepsProps> = ({
  steps,
  activeStep,
  orientation = 'vertical',
  alternativeLabel = false,
  connector,
  color = 'primary',
  nonLinear = false,
  skipped = [],
  sx,
  onStepClick,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const effectiveOrientation = isMobile ? 'vertical' : orientation;
  const defaultConnector = <CustomStepConnector />;

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      ...sx 
    }}>
      <Stepper
        activeStep={activeStep}
        orientation={effectiveOrientation}
        alternativeLabel={effectiveOrientation === 'horizontal' && alternativeLabel}
        nonLinear={nonLinear}
        connector={connector || defaultConnector}
        sx={{
          padding: effectiveOrientation === 'horizontal' ? '8px 0' : '8px 16px',
          width: '100%',
          '& .MuiStep-root': {
            padding: effectiveOrientation === 'horizontal' ? '0 1px' : '0px 0',
          },
          '& .MuiStepLabel-root': {
            padding: '0 1px',
          },
          '& .MuiStepLabel-label': {
            fontSize: '0.70rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '90px',
          },
        }}
      >
        {steps.map((step, index) => {
          // Declaración CORRECTA de stepProps que faltaba
          const stepProps: { completed?: boolean; optional?: React.ReactNode } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            StepIconComponent?: React.ComponentType<StepIconProps>;
            StepIconProps?: Partial<StepIconProps>;
          } = {};

          if (step.optional) {
            labelProps.optional = (
              <Typography variant="caption" color="text.secondary">
                {typeof step.optional === 'string' ? step.optional : 'Opcional'}
              </Typography>
            );
          }

          if (step.error) {
            labelProps.error = true;
          }

          if (skipped.includes(index)) {
            stepProps.completed = false;
          }

          if (step.icon) {
            labelProps.StepIconComponent = CustomStepIcon;
            labelProps.StepIconProps = {
              icon: step.icon,
              active: activeStep === index,
              completed: step.completed || false,
              error: step.error || false,
            };
          }

          return (
            <Step
              key={step.label}
              {...stepProps}
              onClick={() => onStepClick && onStepClick(index)}
              sx={{
                cursor: onStepClick ? 'pointer' : 'default',
                flex: '1 1 auto',
                minWidth: 0,
              }}
            >
              <StepLabel
                {...labelProps}
                color={color}
                sx={{
                  '& .MuiStepLabel-label': {
                    fontWeight: activeStep === index ? 'bold' : 'normal',
                  },
                }}
              >
                {step.label}
                {step.description && (
                  <Typography variant="caption" display="block" color="text.secondary" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100px',
                  }}>
                    {step.description}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default ComponentResponsiveSteeps;


//TODO use

// <ComponentResponsiveSteeps
//   activeStep={1}
//   steps={[
//     { label: 'Paso 1', description: 'Descripción', icon: <PersonIcon /> },
//     { label: 'Paso 2', description: 'Con error', error: true, icon: <ErrorIcon /> },
//     { label: 'Paso 3', optional: true, icon: <CheckIcon /> },
//   ]}
//   orientation="horizontal"
//   onStepClick={(step) => console.log('Paso seleccionado:', step)}
// />