

// 'use client';

// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import {
//     Box,
//     TextField,
//     TextareaAutosize,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     FormHelperText,
//     FormControlLabel,
//     Checkbox,
//     Radio,
//     RadioGroup,
//     Typography,
//     Slider,
//     Stack,
// } from '@mui/material';

// export type InputType =
//     | 'text'
//     | 'number'
//     | 'email'
//     | 'textarea'
//     | 'select'
//     | 'checkbox'
//     | 'radio'
//     | 'date'
//     | 'datetime-local'  // Nuevo tipo para fecha y hora
//     | 'time' 
//     | 'range';

// interface FormFieldConfig {
//     id: string;
//     label: string;
//     type: InputType;
//     options?: { value: string; label: string }[];
//     defaultValue?: any;
//     required?: boolean;
//     min?: number | string;
//     max?: number | string;
//     validationMessage?: string;
//     placeholder?: string;
//     rows?: number;
// }

// interface FormConfig {
//     fields: FormFieldConfig[];
// }

// interface FormValues {
//     [key: string]: any;
// }

// interface DynamicFormProps {
//     formConfig: FormConfig;
//     onSubmit: SubmitHandler<FormValues>;
//     onValuesChange?: (values: FormValues) => void;
//     formId?: string;
// }

// const isValidInputType = (type: string): type is InputType => {
//     return [
//         'text',
//         'number',
//         'email',
//         'textarea',
//         'select',
//         'checkbox',
//         'radio',
//         'date',
//         'datetime-local', // Nuevo
//         'time',           // Nuevo
//         'range',
//     ].includes(type);
// };

// export const DynamicForm: React.FC<DynamicFormProps> = ({
//     formConfig,
//     onSubmit,
//     onValuesChange,
//     formId = 'dynamic-form',
// }) => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         setValue,
//         formState: { errors },
//     } = useForm<FormValues>({
//         defaultValues: formConfig.fields.reduce((acc, field) => {
//             if (field.defaultValue !== undefined) {
//                 acc[field.id] = field.defaultValue;
//             }
//             return acc;
//         }, {} as FormValues),
//     });

//     const formValues = watch();
//     React.useEffect(() => {
//         onValuesChange?.(formValues);
//     }, [formValues, onValuesChange]);

//     const renderField = (field: FormFieldConfig) => {
//         const commonProps = {
//             fullWidth: true,
//             sx: { my: 1 },
//         };

//         const error = errors[field.id];
//         const helperText = error?.message as string;

//         const validationRules = {
//             required: field.required ? field.validationMessage || 'Campo requerido' : false,
//             minLength: field.min ? { value: Number(field.min), message: `Mínimo ${field.min}` } : undefined,
//             maxLength: field.max ? { value: Number(field.max), message: `Máximo ${field.max}` } : undefined,
//         };

//         if (!isValidInputType(field.type)) {
//             console.warn(`Tipo de campo desconocido: ${field.type}. Se usará 'text' por defecto.`);
//             field.type = 'text';
//         }

//         switch (field.type) {
//             case 'textarea':
//                 return (
//                     <TextField
//                         key={field.id}
//                         {...commonProps}
//                         label={field.label}
//                         multiline
//                         rows={field.rows || 4}
//                         variant="outlined"
//                         error={!!error}
//                         helperText={helperText}
//                         {...register(field.id, validationRules)}
//                     />
//                 );

//             case 'select':
//                 return (
//                     <FormControl key={field.id} {...commonProps} error={!!error}>
//                         <InputLabel>{field.label}</InputLabel>
//                         <Select
//                             label={field.label}
//                             defaultValue={field.defaultValue || ''}
//                             {...register(field.id, {
//                                 required: field.required ? field.validationMessage || 'Campo requerido' : false,
//                             })}
//                         >
//                             {field.options?.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                         {helperText && <FormHelperText>{helperText}</FormHelperText>}
//                     </FormControl>
//                 );

//             case 'checkbox':
//                 return (
//                     <FormControlLabel
//                         key={field.id}
//                         control={<Checkbox defaultChecked={!!field.defaultValue} {...register(field.id)} />}
//                         label={field.label}
//                     />
//                 );

//             case 'radio':
//                 return (
//                     <FormControl key={field.id} {...commonProps} error={!!error}>
//                         <Typography variant="subtitle2">{field.label}</Typography>
//                         <RadioGroup
//                             defaultValue={field.defaultValue}
//                             {...register(field.id, {
//                                 required: field.required ? field.validationMessage || 'Campo requerido' : false,
//                             })}
//                         >
//                             {field.options?.map((option) => (
//                                 <FormControlLabel
//                                     key={option.value}
//                                     value={option.value}
//                                     control={<Radio />}
//                                     label={option.label}
//                                 />
//                             ))}
//                         </RadioGroup>
//                         {helperText && <FormHelperText>{helperText}</FormHelperText>}
//                     </FormControl>
//                 );

//             case 'date':
//                 return (
//                     <TextField
//                         key={field.id}
//                         {...commonProps}
//                         label={field.label}
//                         type="date"
//                         variant="outlined"
//                         InputLabelProps={{ shrink: true }}
//                         error={!!error}
//                         helperText={helperText}
//                         {...register(field.id, {
//                             required: field.required ? field.validationMessage || 'Campo requerido' : false,
//                         })}
//                     />
//                 );
//                 case 'datetime-local':
//                     return (
//                         <TextField
//                             key={field.id}
//                             {...commonProps}
//                             label={field.label}
//                             type="datetime-local"
//                             variant="outlined"
//                             InputLabelProps={{ shrink: true }}
//                             error={!!error}
//                             helperText={helperText}
//                             {...register(field.id, {
//                                 required: field.required ? field.validationMessage || 'Campo requerido' : false,
//                             })}
//                         />
//                     );

//                 case 'time':
//                     return (
//                         <TextField
//                             key={field.id}
//                             {...commonProps}
//                             label={field.label}
//                             type="time"
//                             variant="outlined"
//                             InputLabelProps={{ shrink: true }}
//                             error={!!error}
//                             helperText={helperText}
//                             {...register(field.id, {
//                                 required: field.required ? field.validationMessage || 'Campo requerido' : false,
//                             })}
//                         />
//                     );

//             case 'range':
//                 return (
//                     <Box key={field.id} {...commonProps}>
//                         <Typography gutterBottom>{field.label}</Typography>
//                         <Slider
//                             defaultValue={Number(field.defaultValue) || 0}
//                             min={Number(field.min) || 0}
//                             max={Number(field.max) || 100}
//                             onChangeCommitted={(_, value) => setValue(field.id, value)}
//                         />
//                     </Box>
//                 );

//             default:
//                 return (
//                     <TextField
//                         key={field.id}
//                         {...commonProps}
//                         label={field.label}
//                         type={field.type}
//                         error={!!error}
//                         helperText={helperText}
//                         placeholder={field.placeholder}
//                         {...register(field.id, validationRules)}
//                     />
//                 );
//         }
//     };

//     return (
//         <form id={formId} onSubmit={handleSubmit(onSubmit)}>
//             <Stack>
//                 {formConfig.fields.map(renderField)}
//                 <button type="submit">Enviar</button>
//             </Stack>
//         </form>
//     );
// };



'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Typography,
    Slider,
    Stack,
    Button,
} from '@mui/material';

export type InputType =
    'text' |
    'number' |
    'email' |
    'textarea' |
    'select' |
    'checkbox' |
    'radio' |
    'date' |
    'datetime-local' |
    'time' |
    'range';

interface FormFieldConfig {
    id: string;
    label: string;
    type: InputType;
    options?: Array<{ value: string; label: string }>;
    defaultValue?: string | number | boolean;
    required?: boolean;
    min?: number;
    max?: number;
    validationMessage?: string;
    placeholder?: string;
    rows?: number;
    showIf?: (values: Record<string, any>) => boolean;
}

interface FormConfig {
    fields: FormFieldConfig[];
}

interface FormValues {
    [key: string]: any;
}

interface DynamicFormProps {
    formConfig: FormConfig;
    onSubmit: (data: FormValues) => void;
    onValuesChange?: (values: FormValues) => void;
    formId?: string;
}

const isValidInputType = (type: string): type is InputType => {
    return [
        'text',
        'number',
        'email',
        'textarea',
        'select',
        'checkbox',
        'radio',
        'date',
        'datetime-local',
        'time',
        'range',
    ].includes(type);
};

export const DynamicForm: React.FC<DynamicFormProps> = ({
    formConfig,
    onSubmit,
    onValuesChange,
    formId = 'dynamic-form',
}) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const formValues = watch();
    const [, forceUpdate] = React.useState({});

    // Forzar actualización cuando cambien los valores
    React.useEffect(() => {
        const subscription = watch(() => forceUpdate({}));
        return () => subscription.unsubscribe();
    }, [watch]);

    // Filtrar campos visibles
    const visibleFields = React.useMemo(() => {
        return formConfig.fields.filter(field => {
            if (!field.showIf) return true;
            return field.showIf(formValues);
        });
    }, [formConfig.fields, formValues]);

    // Notificar cambios en los valores
    React.useEffect(() => {
        onValuesChange?.(formValues);
    }, [formValues, onValuesChange]);

    // Renderizar cada campo
    const renderField = (field: FormFieldConfig) => {
        const commonProps = {
            fullWidth: true,
            sx: { my: 1 },
        };

        const error = errors[field.id];
        const helperText = error?.message as string;

        const validationRules = {
            required: field.required ? field.validationMessage || 'Campo requerido' : false,
            min: field.min ? { value: Number(field.min), message: `Mínimo ${field.min}` } : undefined,
            max: field.max ? { value: Number(field.max), message: `Máximo ${field.max}` } : undefined,
        };

        if (!isValidInputType(field.type)) {
            console.warn(`Tipo de campo desconocido: ${field.type}. Se usará 'text' por defecto.`);
            field.type = 'text';
        }

        switch (field.type) {
            case 'textarea':
                return (
                    <TextField
                        key={field.id}
                        {...commonProps}
                        label={field.label}
                        multiline
                        rows={field.rows || 4}
                        variant="outlined"
                        error={!!error}
                        helperText={helperText}
                        {...register(field.id, validationRules)}
                    />
                );

            case 'select':
                return (
                    <FormControl key={field.id} {...commonProps} error={!!error}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            label={field.label}
                            value={formValues[field.id] || ''}
                            {...register(field.id, {
                                required: field.required ? field.validationMessage || 'Campo requerido' : false,
                            })}
                            onChange={(e) => {
                                setValue(field.id, e.target.value);
                                forceUpdate({});
                            }}
                        >
                            {field.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {helperText && <FormHelperText>{helperText}</FormHelperText>}
                    </FormControl>
                );

            case 'checkbox':
                return (
                    <FormControlLabel
                        key={field.id}
                        control={
                            <Checkbox
                                checked={!!formValues[field.id]}
                                {...register(field.id)}
                                onChange={(e) => {
                                    setValue(field.id, e.target.checked);
                                    forceUpdate({});
                                }}
                            />
                        }
                        label={field.label}
                    />
                );

            case 'radio':
                return (
                    <FormControl key={field.id} {...commonProps} error={!!error}>
                        <Typography variant="subtitle2">{field.label}</Typography>
                        <RadioGroup
                            value={formValues[field.id] || ''}
                            {...register(field.id, {
                                required: field.required ? field.validationMessage || 'Campo requerido' : false,
                            })}
                            onChange={(e) => {
                                setValue(field.id, e.target.value);
                                forceUpdate({});
                            }}
                        >
                            {field.options?.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                        {helperText && <FormHelperText>{helperText}</FormHelperText>}
                    </FormControl>
                );

            case 'date':
                return (
                    <TextField
                        key={field.id}
                        {...commonProps}
                        label={field.label}
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={!!error}
                        helperText={helperText}
                        {...register(field.id, {
                            required: field.required ? field.validationMessage || 'Campo requerido' : false,
                        })}
                    />
                );

            case 'datetime-local':
                return (
                    <TextField
                        key={field.id}
                        {...commonProps}
                        label={field.label}
                        type="datetime-local"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={!!error}
                        helperText={helperText}
                        {...register(field.id, {
                            required: field.required ? field.validationMessage || 'Campo requerido' : false,
                        })}
                    />
                );

            case 'time':
                return (
                    <TextField
                        key={field.id}
                        {...commonProps}
                        label={field.label}
                        type="time"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={!!error}
                        helperText={helperText}
                        {...register(field.id, {
                            required: field.required ? field.validationMessage || 'Campo requerido' : false,
                        })}
                    />
                );

            case 'range':
                return (
                    <Box key={field.id} {...commonProps}>
                        <Typography gutterBottom>{field.label}</Typography>
                        <Slider
                            value={Number(formValues[field.id]) || 0}
                            min={Number(field.min) || 0}
                            max={Number(field.max) || 100}
                            onChange={(_, value) => {
                                setValue(field.id, value);
                                forceUpdate({});
                            }}
                        />
                    </Box>
                );

            default:
                return (
                    <TextField
                        key={field.id}
                        {...commonProps}
                        label={field.label}
                        type={field.type}
                        value={formValues[field.id] || ''}
                        error={!!error}
                        helperText={helperText}
                        placeholder={field.placeholder}
                        {...register(field.id, validationRules)}
                        onChange={(e) => {
                            setValue(field.id, e.target.value);
                            forceUpdate({});
                        }}
                    />
                );
        }
    };

    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        // Limpiar valores undefined y null
        const cleanedData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined && value !== null)
        );

        // Ejecutar callback con los datos limpios
        onSubmit(cleanedData);

        // Resetear el formulario si es necesario
        // reset();
    };

    return (
        <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack spacing={2}>
                {visibleFields.map(renderField)}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Enviar
                </Button>
            </Stack>
        </form>
    );
};


















// //TODO use with react-hook-form

//   const formConfig = {
//     fields: [
//       {
//         id: 'name',
//         label: 'Nombre',
//         type: 'text' as InputType,
//         required: true,
//         placeholder: 'Escribe tu nombre',
//       },
//       {
//         id: 'email',
//         label: 'Correo electrónico',
//         type: 'email' as InputType,
//         required: true,
//       },
//       {
//         id: 'age',
//         label: 'Edad',
//         type: 'number' as InputType,
//         min: 18,
//         max: 100,
//       },
//       {
//         id: 'bio',
//         label: 'Biografía',
//         type: 'textarea' as InputType,
//         rows: 5,
//       },
//       {
//         id: 'gender',
//         label: 'Género',
//         type: 'radio' as InputType,
//         options: [
//           { value: 'male', label: 'Masculino' },
//           { value: 'female', label: 'Femenino' },
//         ],
//       },
//       {
//         id: 'newsletter',
//         label: 'Recibir noticias',
//         type: 'checkbox' as InputType,
//         defaultValue: true,
//       },
//       {
//         id: 'birthDate',
//         label: 'Fecha de nacimiento',
//         type: 'date' as InputType,
//       },
//       {
//         id: 'satisfaction',
//         label: 'Nivel de satisfacción',
//         type: 'range' as InputType,
//         min: 1,
//         max: 10,
//         defaultValue: 5,
//       },
//       {
//         id: 'country',
//         label: 'País',
//         type: 'select' as InputType,
//         options: [
//           { value: 'cl', label: 'Chile' },
//           { value: 'ar', label: 'Argentina' },
//           { value: 'mx', label: 'México' },
//         ],
//         required: true,
//       },
//     ],
//   };

//   const handleFormSubmit = (data: any) => {
//     console.log('Datos enviados:', data);
//   };
//   <DynamicForm formConfig={formConfig} onSubmit={handleFormSubmit} />


