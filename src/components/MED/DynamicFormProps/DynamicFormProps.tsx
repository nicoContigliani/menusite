// // // // import React from 'react';
// // // // import {
// // // //     Box,
// // // //     Button,
// // // //     TextField,
// // // //     Select,
// // // //     MenuItem,
// // // //     FormControl,
// // // //     InputLabel,
// // // //     Checkbox,
// // // //     FormControlLabel,
// // // //     Radio,
// // // //     RadioGroup,
// // // //     FormHelperText,
// // // //     Typography,
// // // //     Paper,
// // // //     useTheme,
// // // //     Divider,
// // // //     Stack,
// // // //     Grid
// // // // } from '@mui/material';
// // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // import { Controller, useForm, SubmitHandler, UseFormReturn, DefaultValues } from 'react-hook-form';
// // // // import { motion } from 'framer-motion';

// // // // // Tipos para TypeScript
// // // // type FieldType =
// // // //     | 'text'
// // // //     | 'email'
// // // //     | 'password'
// // // //     | 'number'
// // // //     | 'date'
// // // //     | 'select'
// // // //     | 'checkbox'
// // // //     | 'radio'
// // // //     | 'textarea'
// // // //     | 'file';

// // // // type ValidationRules = {
// // // //     required?: boolean | string;
// // // //     minLength?: { value: number; message: string };
// // // //     maxLength?: { value: number; message: string };
// // // //     pattern?: { value: RegExp; message: string };
// // // //     validate?: (value: any) => boolean | string;
// // // //     min?: { value: number; message: string };
// // // //     max?: { value: number; message: string };
// // // // };

// // // // type FormOption = {
// // // //     value: string | number;
// // // //     label: string;
// // // // };

// // // // type FormField<T extends Record<string, any>> = {
// // // //     name: keyof T;
// // // //     type: FieldType;
// // // //     label: string;
// // // //     placeholder?: string;
// // // //     defaultValue?: any;
// // // //     options?: FormOption[];
// // // //     validation?: ValidationRules;
// // // //     disabled?: boolean | ((values: T) => boolean);
// // // //     fullWidth?: boolean;
// // // //     sx?: React.CSSProperties;
// // // //     visibility?: (values: T) => boolean;
// // // //     gridProps?: { xs?: number; sm?: number; md?: number; lg?: number };
// // // // };

// // // // type FormButton<T extends Record<string, any>> = {
// // // //     type: 'submit' | 'reset' | 'button';
// // // //     variant: 'contained' | 'outlined' | 'text';
// // // //     label: string;
// // // //     color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
// // // //     sx?: React.CSSProperties;
// // // //     onClick?: () => void;
// // // //     position?: 'left' | 'center' | 'right';
// // // //     disabled?: boolean | ((formValues: T) => boolean);
// // // //     icon?: React.ReactNode;
// // // // };

// // // // type DynamicFormProps<T extends Record<string, any>> = {
// // // //     fields: FormField<T>[];
// // // //     buttons: FormButton<T>[];
// // // //     onSubmit: SubmitHandler<T>;
// // // //     defaultValues?: DefaultValues<T>;
// // // //     formRef?: React.RefObject<UseFormReturn<T, any, T>>;
// // // //     title?: string;
// // // //     subtitle?: string;
// // // //     description?: string;
// // // //     sx?: React.CSSProperties;
// // // //     gridContainerProps?: React.ComponentProps<typeof Grid>;
// // // //     mode?: 'create' | 'edit' | 'view';
// // // // };

// // // // const DynamicForm = <T extends Record<string, any>>({
// // // //     fields,
// // // //     buttons,
// // // //     onSubmit,
// // // //     defaultValues,
// // // //     formRef,
// // // //     title,
// // // //     subtitle,
// // // //     description,
// // // //     sx,
// // // //     gridContainerProps = { spacing: 3 },
// // // //     mode = 'create'
// // // // }: DynamicFormProps<T>) => {
// // // //     const theme = useTheme();
// // // //     const formMethods = useForm<T, any, T>({ 
// // // //         defaultValues: defaultValues as DefaultValues<T> 
// // // //     });
// // // //     const { control, handleSubmit, reset, watch, formState: { errors } } = formMethods;
// // // //     const formValues = watch();

// // // //     // Expone los métodos del formulario si se pasa una ref
// // // //     React.useImperativeHandle(formRef, () => formMethods, [formMethods]);

// // // //     const isFieldDisabled = (field: FormField<T>): boolean => {
// // // //         if (mode === 'view') return true;
// // // //         if (typeof field.disabled === 'function') return field.disabled(formValues);
// // // //         return !!field.disabled;
// // // //     };

// // // //     const renderField = (field: FormField<T>) => {
// // // //         if (field.visibility && !field.visibility(formValues)) {
// // // //             return null;
// // // //         }

// // // //         const disabled = isFieldDisabled(field);
// // // //         const error = !!errors[field.name];
// // // //         const helperText = errors[field.name]?.message as string;

// // // //         const commonProps = {
// // // //             key: field.name as string,
// // // //             fullWidth: field.fullWidth ?? true,
// // // //             sx: { mb: 2, ...field.sx },
// // // //             error,
// // // //             helperText,
// // // //             disabled
// // // //         };

// // // //         switch (field.type) {
// // // //             case 'text':
// // // //             case 'email':
// // // //             case 'password':
// // // //             case 'number':
// // // //             case 'textarea':
// // // //                 return (
// // // //                     <Controller
// // // //                         name={field.name as any}
// // // //                         control={control}
// // // //                         rules={field.validation}
// // // //                         render={({ field: { onChange, value } }) => (
// // // //                             <TextField
// // // //                                 {...commonProps}
// // // //                                 label={field.label}
// // // //                                 placeholder={field.placeholder}
// // // //                                 type={field.type}
// // // //                                 value={value || ''}
// // // //                                 onChange={onChange}
// // // //                                 multiline={field.type === 'textarea'}
// // // //                                 rows={field.type === 'textarea' ? 4 : undefined}
// // // //                             />
// // // //                         )}
// // // //                     />
// // // //                 );

// // // //             case 'date':
// // // //                 return (
// // // //                     <Controller
// // // //                         name={field.name as any}
// // // //                         control={control}
// // // //                         rules={field.validation}
// // // //                         render={({ field: { onChange, value, ref } }) => (
// // // //                             <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // //                                 <DatePicker
// // // //                                     label={field.label}
// // // //                                     value={value || null}
// // // //                                     onChange={onChange}
// // // //                                     disabled={disabled}
// // // //                                     inputRef={ref}
// // // //                                     slotProps={{
// // // //                                         textField: {
// // // //                                             ...commonProps,
// // // //                                             fullWidth: true,
// // // //                                             error: error,
// // // //                                             helperText: helperText
// // // //                                         }
// // // //                                     }}
// // // //                                 />
// // // //                             </LocalizationProvider>
// // // //                         )}
// // // //                     />
// // // //                 );
// // // //             case 'select':
// // // //                 return (
// // // //                     <Controller
// // // //                         name={field.name as any}
// // // //                         control={control}
// // // //                         rules={field.validation}
// // // //                         render={({ field: { onChange, value } }) => (
// // // //                             <FormControl
// // // //                                 fullWidth={commonProps.fullWidth}
// // // //                                 sx={commonProps.sx}
// // // //                                 error={error}
// // // //                                 disabled={disabled}
// // // //                             >
// // // //                                 <InputLabel>{field.label}</InputLabel>
// // // //                                 <Select
// // // //                                     label={field.label}
// // // //                                     value={value || ''}
// // // //                                     onChange={onChange}
// // // //                                 >
// // // //                                     {field.options?.map((option) => (
// // // //                                         <MenuItem key={option.value} value={option.value}>
// // // //                                             {option.label}
// // // //                                         </MenuItem>
// // // //                                     ))}
// // // //                                 </Select>
// // // //                                 {error && <FormHelperText>{helperText}</FormHelperText>}
// // // //                             </FormControl>
// // // //                         )}
// // // //                     />
// // // //                 );

// // // //             case 'checkbox':
// // // //                 return (
// // // //                     <Controller
// // // //                         name={field.name as any}
// // // //                         control={control}
// // // //                         rules={field.validation}
// // // //                         render={({ field: { onChange, value } }) => (
// // // //                             <FormControlLabel
// // // //                                 control={
// // // //                                     <Checkbox
// // // //                                         checked={!!value}
// // // //                                         onChange={(e) => onChange(e.target.checked)}
// // // //                                         disabled={disabled}
// // // //                                     />
// // // //                                 }
// // // //                                 label={field.label}
// // // //                                 sx={commonProps.sx}
// // // //                             />
// // // //                         )}
// // // //                     />
// // // //                 );

// // // //             case 'radio':
// // // //                 return (
// // // //                     <Controller
// // // //                         name={field.name as any}
// // // //                         control={control}
// // // //                         rules={field.validation}
// // // //                         render={({ field: { onChange, value } }) => (
// // // //                             <FormControl
// // // //                                 fullWidth={commonProps.fullWidth}
// // // //                                 sx={commonProps.sx}
// // // //                                 error={error}
// // // //                                 disabled={disabled}
// // // //                             >
// // // //                                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
// // // //                                     {field.label}
// // // //                                 </Typography>
// // // //                                 <RadioGroup
// // // //                                     value={value || ''}
// // // //                                     onChange={onChange}
// // // //                                 >
// // // //                                     {field.options?.map((option) => (
// // // //                                         <FormControlLabel
// // // //                                             key={option.value}
// // // //                                             value={option.value}
// // // //                                             control={<Radio />}
// // // //                                             label={option.label}
// // // //                                         />
// // // //                                     ))}
// // // //                                 </RadioGroup>
// // // //                                 {error && <FormHelperText>{helperText}</FormHelperText>}
// // // //                             </FormControl>
// // // //                         )}
// // // //                     />
// // // //                 );

// // // //             default:
// // // //                 return null;
// // // //         }
// // // //     };

// // // //     const renderButtonGroup = (position: 'left' | 'center' | 'right') => {
// // // //         const filteredButtons = buttons.filter(
// // // //             (button) => button.position === position || (!button.position && position === 'right')
// // // //         );

// // // //         if (filteredButtons.length === 0) return null;

// // // //         return (
// // // //             <Stack
// // // //                 direction="row"
// // // //                 spacing={2}
// // // //                 justifyContent={
// // // //                     position === 'center' ? 'center' :
// // // //                         position === 'left' ? 'flex-start' : 'flex-end'
// // // //                 }
// // // //             >
// // // //                 {filteredButtons.map((button, index) => {
// // // //                     const isDisabled = typeof button.disabled === 'function'
// // // //                         ? button.disabled(formValues)
// // // //                         : button.disabled;

// // // //                     return (
// // // //                         <motion.div
// // // //                             key={index}
// // // //                             whileHover={!isDisabled ? { scale: 1.05 } : {}}
// // // //                             whileTap={!isDisabled ? { scale: 0.95 } : {}}
// // // //                         >
// // // //                             <Button
// // // //                                 type={button.type}
// // // //                                 variant={button.variant}
// // // //                                 color={button.color || 'primary'}
// // // //                                 sx={button.sx}
// // // //                                 onClick={button.type === 'button' ? button.onClick : undefined}
// // // //                                 disabled={isDisabled}
// // // //                                 startIcon={button.icon}
// // // //                             >
// // // //                                 {button.label}
// // // //                             </Button>
// // // //                         </motion.div>
// // // //                     );
// // // //                 })}
// // // //             </Stack>
// // // //         );
// // // //     };

// // // //     return (
// // // //         <Paper
// // // //             elevation={0}
// // // //             sx={{
// // // //                 p: 4,
// // // //                 border: '1px solid',
// // // //                 borderColor: 'divider',
// // // //                 borderRadius: 1,
// // // //                 ...sx
// // // //             }}
// // // //             component={motion.div}
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.3 }}
// // // //         >
// // // //             <form onSubmit={handleSubmit(onSubmit)}>
// // // //                 {title && (
// // // //                     <Typography variant="h4" component="h1" fontWeight={400} gutterBottom>
// // // //                         {title}
// // // //                     </Typography>
// // // //                 )}

// // // //                 {subtitle && (
// // // //                     <Typography variant="h6" component="h2" fontWeight={400} color="text.secondary" gutterBottom>
// // // //                         {subtitle}
// // // //                     </Typography>
// // // //                 )}

// // // //                 {description && (
// // // //                     <Typography variant="body1" color="text.secondary" mb={4}>
// // // //                         {description}
// // // //                     </Typography>
// // // //                 )}

// // // //                 {(title || subtitle || description) && <Divider sx={{ mb: 4 }} />}

// // // //                 <Grid container {...gridContainerProps}>
// // // //                     {fields.map((field) => (
// // // //                         <Grid
// // // //                             item
// // // //                             xs={field.gridProps?.xs ?? 12}
// // // //                             sm={field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// // // //                             md={field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// // // //                             lg={field.gridProps?.lg ?? field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// // // //                             key={field.name as string}
// // // //                         >
// // // //                             {renderField(field)}
// // // //                         </Grid>
// // // //                     ))}
// // // //                 </Grid>

// // // //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
// // // //                     {renderButtonGroup('left')}
// // // //                     {renderButtonGroup('center')}
// // // //                     {renderButtonGroup('right')}
// // // //                 </Box>
// // // //             </form>
// // // //         </Paper>
// // // //     );
// // // // };

// // // // export default DynamicForm;


// // // "use client"

// // // import React from "react"
// // // import {
// // //   Box,
// // //   Button,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   FormControl,
// // //   InputLabel,
// // //   Checkbox,
// // //   FormControlLabel,
// // //   Radio,
// // //   RadioGroup,
// // //   FormHelperText,
// // //   Typography,
// // //   Paper,
// // //   useTheme,
// // //   Divider,
// // //   Stack,
// // //   Grid,
// // // } from "@mui/material"
// // // import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// // // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// // // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// // // import { Controller, useForm, type SubmitHandler, type UseFormReturn, type DefaultValues } from "react-hook-form"
// // // import { motion } from "framer-motion"
// // // import CloudUploadIcon from "@mui/icons-material/CloudUpload" // New import

// // // // Tipos para TypeScript
// // // type FieldType =
// // //   | "text"
// // //   | "email"
// // //   | "password"
// // //   | "number"
// // //   | "date"
// // //   | "select"
// // //   | "checkbox"
// // //   | "radio"
// // //   | "textarea"
// // //   | "file" // Added file type

// // // type ValidationRules = {
// // //   required?: boolean | string
// // //   minLength?: { value: number; message: string }
// // //   maxLength?: { value: number; message: string }
// // //   pattern?: { value: RegExp; message: string }
// // //   validate?: (value: any) => boolean | string
// // //   min?: { value: number; message: string }
// // //   max?: { value: number; message: string }
// // // }

// // // type FormOption = {
// // //   value: string | number
// // //   label: string
// // // }

// // // type FormField<T extends Record<string, any>> = {
// // //   name: keyof T
// // //   type: FieldType
// // //   label: string
// // //   placeholder?: string
// // //   defaultValue?: any
// // //   options?: FormOption[]
// // //   validation?: ValidationRules
// // //   disabled?: boolean | ((values: T) => boolean)
// // //   fullWidth?: boolean
// // //   sx?: React.CSSProperties
// // //   visibility?: (values: T) => boolean
// // //   gridProps?: { xs?: number; sm?: number; md?: number; lg?: number }
// // //   multiple?: boolean // Added for file input
// // //   accept?: string // Added for file input (e.g., "image/*", ".pdf")
// // // }

// // // type FormButton<T extends Record<string, any>> = {
// // //   type: "submit" | "reset" | "button"
// // //   variant: "contained" | "outlined" | "text"
// // //   label: string
// // //   color?: "primary" | "secondary" | "error" | "info" | "success" | "warning"
// // //   sx?: React.CSSProperties
// // //   onClick?: () => void
// // //   position?: "left" | "center" | "right"
// // //   disabled?: boolean | ((formValues: T) => boolean)
// // //   icon?: React.ReactNode
// // // }

// // // type DynamicFormProps<T extends Record<string, any>> = {
// // //   fields: FormField<T>[]
// // //   buttons: FormButton<T>[]
// // //   onSubmit: SubmitHandler<T>
// // //   defaultValues?: DefaultValues<T>
// // //   formRef?: React.RefObject<UseFormReturn<T, any, T>>
// // //   title?: string
// // //   subtitle?: string
// // //   description?: string
// // //   sx?: React.CSSProperties
// // //   gridContainerProps?: React.ComponentProps<typeof Grid>
// // //   mode?: "create" | "edit" | "view"
// // // }

// // // const DynamicForm = <T extends Record<string, any>>({
// // //   fields,
// // //   buttons,
// // //   onSubmit,
// // //   defaultValues,
// // //   formRef,
// // //   title,
// // //   subtitle,
// // //   description,
// // //   sx,
// // //   gridContainerProps = { spacing: 3 },
// // //   mode = "create",
// // // }: DynamicFormProps<T>) => {
// // //   const theme = useTheme()
// // //   const formMethods = useForm<T, any, T>({
// // //     defaultValues: defaultValues as DefaultValues<T>,
// // //   })
// // //   const {
// // //     control,
// // //     handleSubmit,
// // //     reset,
// // //     watch,
// // //     formState: { errors },
// // //   } = formMethods
// // //   const formValues = watch()

// // //   // Expone los métodos del formulario si se pasa una ref
// // //   React.useImperativeHandle(formRef, () => formMethods, [formMethods])

// // //   const isFieldDisabled = (field: FormField<T>): boolean => {
// // //     if (mode === "view") return true
// // //     if (typeof field.disabled === "function") return field.disabled(formValues)
// // //     return !!field.disabled
// // //   }

// // //   const renderField = (field: FormField<T>) => {
// // //     if (field.visibility && !field.visibility(formValues)) {
// // //       return null
// // //     }

// // //     const disabled = isFieldDisabled(field)
// // //     const error = !!errors[field.name]
// // //     const helperText = errors[field.name]?.message as string
// // //     const commonProps = {
// // //       key: field.name as string,
// // //       fullWidth: field.fullWidth ?? true,
// // //       sx: { mb: 2, ...field.sx },
// // //       error,
// // //       helperText,
// // //       disabled,
// // //     }

// // //     switch (field.type) {
// // //       case "text":
// // //       case "email":
// // //       case "password":
// // //       case "number":
// // //       case "textarea":
// // //         return (
// // //           <Controller
// // //             name={field.name as any}
// // //             control={control}
// // //             rules={field.validation}
// // //             render={({ field: { onChange, value } }) => (
// // //               <TextField
// // //                 {...commonProps}
// // //                 label={field.label}
// // //                 placeholder={field.placeholder}
// // //                 type={field.type}
// // //                 value={value || ""}
// // //                 onChange={onChange}
// // //                 multiline={field.type === "textarea"}
// // //                 rows={field.type === "textarea" ? 4 : undefined}
// // //               />
// // //             )}
// // //           />
// // //         )
// // //       case "date":
// // //         return (
// // //           <Controller
// // //             name={field.name as any}
// // //             control={control}
// // //             rules={field.validation}
// // //             render={({ field: { onChange, value, ref } }) => (
// // //               <LocalizationProvider dateAdapter={AdapterDateFns}>
// // //                 <DatePicker
// // //                   label={field.label}
// // //                   value={value || null}
// // //                   onChange={onChange}
// // //                   disabled={disabled}
// // //                   inputRef={ref}
// // //                   slotProps={{
// // //                     textField: {
// // //                       ...commonProps,
// // //                       fullWidth: true,
// // //                       error: error,
// // //                       helperText: helperText,
// // //                     },
// // //                   }}
// // //                 />
// // //               </LocalizationProvider>
// // //             )}
// // //           />
// // //         )
// // //       case "select":
// // //         return (
// // //           <Controller
// // //             name={field.name as any}
// // //             control={control}
// // //             rules={field.validation}
// // //             render={({ field: { onChange, value } }) => (
// // //               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
// // //                 <InputLabel>{field.label}</InputLabel>
// // //                 <Select label={field.label} value={value || ""} onChange={onChange}>
// // //                   {field.options?.map((option) => (
// // //                     <MenuItem key={option.value} value={option.value}>
// // //                       {option.label}
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //                 {error && <FormHelperText>{helperText}</FormHelperText>}
// // //               </FormControl>
// // //             )}
// // //           />
// // //         )
// // //       case "checkbox":
// // //         return (
// // //           <Controller
// // //             name={field.name as any}
// // //             control={control}
// // //             rules={field.validation}
// // //             render={({ field: { onChange, value } }) => (
// // //               <FormControlLabel
// // //                 control={
// // //                   <Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} disabled={disabled} />
// // //                 }
// // //                 label={field.label}
// // //                 sx={commonProps.sx}
// // //               />
// // //             )}
// // //           />
// // //         )
// // //       case "radio":
// // //         return (
// // //           <Controller
// // //             name={field.name as any}
// // //             control={control}
// // //             rules={field.validation}
// // //             render={({ field: { onChange, value } }) => (
// // //               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
// // //                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
// // //                   {field.label}
// // //                 </Typography>
// // //                 <RadioGroup value={value || ""} onChange={onChange}>
// // //                   {field.options?.map((option) => (
// // //                     <FormControlLabel
// // //                       key={option.value}
// // //                       value={option.value}
// // //                       control={<Radio />}
// // //                       label={option.label}
// // //                     />
// // //                   ))}
// // //                 </RadioGroup>
// // //                 {error && <FormHelperText>{helperText}</FormHelperText>}
// // //               </FormControl>
// // //             )}
// // //           />
// // //         )
// // //       case "file": // New file input type
// // //         return (
// // //           <Controller
// // //             name={field.name as any}
// // //             control={control}
// // //             rules={field.validation}
// // //             render={({ field: { onChange, value } }) => (
// // //               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
// // //                 <input
// // //                   accept={field.accept || "*/*"} // Allow specifying accepted file types
// // //                   style={{ display: "none" }}
// // //                   id={`file-upload-${field.name as string}`}
// // //                   multiple={field.multiple}
// // //                   type="file"
// // //                   onChange={(e) => {
// // //                     const files = Array.from(e.target.files || [])
// // //                     onChange(field.multiple ? files : files[0] || null)
// // //                   }}
// // //                   disabled={disabled}
// // //                 />
// // //                 <label htmlFor={`file-upload-${field.name as string}`}>
// // //                   <Button variant="outlined" component="span" disabled={disabled} startIcon={<CloudUploadIcon />}>
// // //                     {field.label}
// // //                   </Button>
// // //                 </label>
// // //                 {value && (
// // //                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
// // //                     {field.multiple ? (value as File[]).map((f) => f.name).join(", ") : (value as File).name}
// // //                   </Typography>
// // //                 )}
// // //                 {error && <FormHelperText>{helperText}</FormHelperText>}
// // //               </FormControl>
// // //             )}
// // //           />
// // //         )
// // //       default:
// // //         return null
// // //     }
// // //   }

// // //   const renderButtonGroup = (position: "left" | "center" | "right") => {
// // //     const filteredButtons = buttons.filter(
// // //       (button) => button.position === position || (!button.position && position === "right"),
// // //     )
// // //     if (filteredButtons.length === 0) return null
// // //     return (
// // //       <Stack
// // //         direction="row"
// // //         spacing={2}
// // //         justifyContent={position === "center" ? "center" : position === "left" ? "flex-start" : "flex-end"}
// // //       >
// // //         {filteredButtons.map((button, index) => {
// // //           const isDisabled = typeof button.disabled === "function" ? button.disabled(formValues) : button.disabled
// // //           return (
// // //             <motion.div
// // //               key={index}
// // //               whileHover={!isDisabled ? { scale: 1.05 } : {}}
// // //               whileTap={!isDisabled ? { scale: 0.95 } : {}}
// // //             >
// // //               <Button
// // //                 type={button.type}
// // //                 variant={button.variant}
// // //                 color={button.color || "primary"}
// // //                 sx={button.sx}
// // //                 onClick={button.type === "button" ? button.onClick : undefined}
// // //                 disabled={isDisabled}
// // //                 startIcon={button.icon}
// // //               >
// // //                 {button.label}
// // //               </Button>
// // //             </motion.div>
// // //           )
// // //         })}
// // //       </Stack>
// // //     )
// // //   }

// // //   return (
// // //     <Paper
// // //       elevation={0}
// // //       sx={{
// // //         p: 4,
// // //         border: "1px solid",
// // //         borderColor: "divider",
// // //         borderRadius: 1,
// // //         ...sx,
// // //       }}
// // //       component={motion.div}
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.3 }}
// // //     >
// // //       <form onSubmit={handleSubmit(onSubmit)}>
// // //         {title && (
// // //           <Typography variant="h4" component="h1" fontWeight={400} gutterBottom>
// // //             {title}
// // //           </Typography>
// // //         )}
// // //         {subtitle && (
// // //           <Typography variant="h6" component="h2" fontWeight={400} color="text.secondary" gutterBottom>
// // //             {subtitle}
// // //           </Typography>
// // //         )}
// // //         {description && (
// // //           <Typography variant="body1" color="text.secondary" mb={4}>
// // //             {description}
// // //           </Typography>
// // //         )}
// // //         {(title || subtitle || description) && <Divider sx={{ mb: 4 }} />}
// // //         <Grid container {...gridContainerProps}>
// // //           {fields.map((field) => (
// // //             <Grid
// // //               item
// // //               xs={field.gridProps?.xs ?? 12}
// // //               sm={field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// // //               md={field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// // //               lg={field.gridProps?.lg ?? field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// // //               key={field.name as string}
// // //             >
// // //               {renderField(field)}
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
// // //           {renderButtonGroup("left")}
// // //           {renderButtonGroup("center")}
// // //           {renderButtonGroup("right")}
// // //         </Box>
// // //       </form>
// // //     </Paper>
// // //   )
// // // }

// // // export default DynamicForm



// // "use client"

// // import React from "react";
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Checkbox,
// //   FormControlLabel,
// //   Radio,
// //   RadioGroup,
// //   FormHelperText,
// //   Typography,
// //   Paper,
// //   useTheme,
// //   Divider,
// //   Stack,
// //   Grid,
// //   CircularProgress,
// // } from "@mui/material";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import { Controller, useForm, type SubmitHandler, type UseFormReturn, type DefaultValues } from "react-hook-form";
// // import { motion } from "framer-motion";
// // import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// // export type FieldType =
// //   | "text"
// //   | "email"
// //   | "password"
// //   | "number"
// //   | "date"
// //   | "select"
// //   | "checkbox"
// //   | "radio"
// //   | "textarea"
// //   | "file";

// // export type ValidationRules = {
// //   required?: boolean | string;
// //   minLength?: { value: number; message: string };
// //   maxLength?: { value: number; message: string };
// //   pattern?: { value: RegExp; message: string };
// //   validate?: (value: any) => boolean | string;
// //   min?: { value: number; message: string };
// //   max?: { value: number; message: string };
// // };

// // export type FormOption = {
// //   value: string | number;
// //   label: string;
// // };

// // export type FormField<T extends Record<string, any>> = {
// //   name: keyof T;
// //   type: FieldType;
// //   label: string;
// //   placeholder?: string;
// //   defaultValue?: any;
// //   options?: FormOption[];
// //   validation?: ValidationRules;
// //   disabled?: boolean | ((values: T) => boolean);
// //   fullWidth?: boolean;
// //   sx?: React.CSSProperties;
// //   visibility?: (values: T) => boolean;
// //   gridProps?: { xs?: number; sm?: number; md?: number; lg?: number };
// //   multiple?: boolean;
// //   accept?: string;
// // };

// // export type FormButton<T extends Record<string, any>> = {
// //   type: "submit" | "reset" | "button";
// //   variant: "contained" | "outlined" | "text";
// //   label: string;
// //   color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
// //   sx?: React.CSSProperties;
// //   onClick?: (event: React.MouseEvent, formValues: T) => void;
// //   position?: "left" | "center" | "right";
// //   disabled?: boolean | ((formValues: T) => boolean);
// //   icon?: React.ReactNode;
// // };

// // export type DynamicFormProps<T extends Record<string, any>> = {
// //   fields: FormField<T>[];
// //   buttons: FormButton<T>[];
// //   onSubmit: SubmitHandler<T>;
// //   defaultValues?: DefaultValues<T>;
// //   formRef?: React.RefObject<UseFormReturn<T>>;
// //   title?: string;
// //   subtitle?: string;
// //   description?: string;
// //   sx?: React.CSSProperties;
// //   gridContainerProps?: React.ComponentProps<typeof Grid>;
// //   mode?: "create" | "edit" | "view";
// // };

// // export const DynamicForm = <T extends Record<string, any>>({
// //   fields,
// //   buttons,
// //   onSubmit,
// //   defaultValues,
// //   formRef,
// //   title,
// //   subtitle,
// //   description,
// //   sx,
// //   gridContainerProps = { spacing: 3 },
// //   mode = "create",
// // }: DynamicFormProps<T>) => {
// //   const theme = useTheme();
// //   const formMethods = useForm<T>({
// //     defaultValues: defaultValues as DefaultValues<T>,
// //   });
  
// //   const {
// //     control,
// //     handleSubmit,
// //     reset,
// //     watch,
// //     formState: { errors },
// //     setValue,
// //   } = formMethods;
  
// //   const formValues = watch();

// //   React.useImperativeHandle(formRef, () => formMethods, [formMethods]);

// //   const isFieldDisabled = (field: FormField<T>): boolean => {
// //     if (mode === "view") return true;
// //     if (typeof field.disabled === "function") return field.disabled(formValues);
// //     return !!field.disabled;
// //   };

// //   const getButtonDisabledState = (button: FormButton<T>): boolean => {
// //     if (typeof button.disabled === "function") return button.disabled(formValues);
// //     return !!button.disabled;
// //   };

// //   const renderField = (field: FormField<T>) => {
// //     if (field.visibility && !field.visibility(formValues)) {
// //       return null;
// //     }

// //     const disabled = isFieldDisabled(field);
// //     const error = !!errors[field.name];
// //     const helperText = errors[field.name]?.message as string;

// //     const commonProps = {
// //       key: field.name as string,
// //       fullWidth: field.fullWidth ?? true,
// //       sx: { mb: 2, ...field.sx },
// //       error,
// //       helperText,
// //       disabled,
// //     };

// //     switch (field.type) {
// //       case "text":
// //       case "email":
// //       case "password":
// //       case "number":
// //       case "textarea":
// //         return (
// //           <Controller
// //             name={field.name as any}
// //             control={control}
// //             rules={field.validation}
// //             render={({ field: { onChange, value } }) => (
// //               <TextField
// //                 {...commonProps}
// //                 label={field.label}
// //                 placeholder={field.placeholder}
// //                 type={field.type}
// //                 value={value || ""}
// //                 onChange={onChange}
// //                 multiline={field.type === "textarea"}
// //                 rows={field.type === "textarea" ? 4 : undefined}
// //               />
// //             )}
// //           />
// //         );

// //       case "date":
// //         return (
// //           <Controller
// //             name={field.name as any}
// //             control={control}
// //             rules={field.validation}
// //             render={({ field: { onChange, value, ref } }) => (
// //               <LocalizationProvider dateAdapter={AdapterDateFns}>
// //                 <DatePicker
// //                   label={field.label}
// //                   value={value || null}
// //                   onChange={onChange}
// //                   disabled={disabled}
// //                   inputRef={ref}
// //                   slotProps={{
// //                     textField: {
// //                       ...commonProps,
// //                       fullWidth: true,
// //                       error: error,
// //                       helperText: helperText,
// //                     },
// //                   }}
// //                 />
// //               </LocalizationProvider>
// //             )}
// //           />
// //         );

// //       case "select":
// //         return (
// //           <Controller
// //             name={field.name as any}
// //             control={control}
// //             rules={field.validation}
// //             render={({ field: { onChange, value } }) => (
// //               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
// //                 <InputLabel>{field.label}</InputLabel>
// //                 <Select label={field.label} value={value || ""} onChange={onChange}>
// //                   {field.options?.map((option) => (
// //                     <MenuItem key={option.value} value={option.value}>
// //                       {option.label}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //                 {error && <FormHelperText>{helperText}</FormHelperText>}
// //               </FormControl>
// //             )}
// //           />
// //         );

// //       case "checkbox":
// //         return (
// //           <Controller
// //             name={field.name as any}
// //             control={control}
// //             rules={field.validation}
// //             render={({ field: { onChange, value } }) => (
// //               <FormControlLabel
// //                 control={
// //                   <Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} disabled={disabled} />
// //                 }
// //                 label={field.label}
// //                 sx={commonProps.sx}
// //               />
// //             )}
// //           />
// //         );

// //       case "radio":
// //         return (
// //           <Controller
// //             name={field.name as any}
// //             control={control}
// //             rules={field.validation}
// //             render={({ field: { onChange, value } }) => (
// //               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
// //                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
// //                   {field.label}
// //                 </Typography>
// //                 <RadioGroup value={value || ""} onChange={onChange}>
// //                   {field.options?.map((option) => (
// //                     <FormControlLabel
// //                       key={option.value}
// //                       value={option.value}
// //                       control={<Radio />}
// //                       label={option.label}
// //                     />
// //                   ))}
// //                 </RadioGroup>
// //                 {error && <FormHelperText>{helperText}</FormHelperText>}
// //               </FormControl>
// //             )}
// //           />
// //         );

// //       case "file":
// //         return (
// //           <Controller
// //             name={field.name as any}
// //             control={control}
// //             rules={field.validation}
// //             render={({ field: { onChange, value } }) => {
// //               const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //                 const files = event.target.files;
// //                 if (files) {
// //                   const fileList = Array.from(files);
// //                   onChange(field.multiple ? fileList : fileList[0] || null);
// //                 }
// //               };

// //               return (
// //                 <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
// //                   <input
// //                     accept={field.accept || "*/*"}
// //                     style={{ display: "none" }}
// //                     id={`file-upload-${String(field.name)}`}
// //                     multiple={field.multiple}
// //                     type="file"
// //                     onChange={handleFileChange}
// //                     disabled={disabled}
// //                   />
// //                   <label htmlFor={`file-upload-${String(field.name)}`}>
// //                     <Button variant="outlined" component="span" disabled={disabled} startIcon={<CloudUploadIcon />}>
// //                       {field.label}
// //                     </Button>
// //                   </label>
// //                   {value && (
// //                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
// //                       {field.multiple 
// //                         ? (value as File[]).map((f) => f.name).join(", ") 
// //                         : (value as File).name}
// //                     </Typography>
// //                   )}
// //                   {error && <FormHelperText>{helperText}</FormHelperText>}
// //                 </FormControl>
// //               );
// //             }}
// //           />
// //         );

// //       default:
// //         return null;
// //     }
// //   };

// //   const renderButtonGroup = (position: "left" | "center" | "right") => {
// //     const filteredButtons = buttons.filter(
// //       (button) => button.position === position || (!button.position && position === "right")
// //     );

// //     if (filteredButtons.length === 0) return null;

// //     return (
// //       <Stack
// //         direction="row"
// //         spacing={2}
// //         justifyContent={
// //           position === "center" ? "center" :
// //             position === "left" ? "flex-start" : "flex-end"
// //         }
// //       >
// //         {filteredButtons.map((button, index) => {
// //           const isDisabled = getButtonDisabledState(button);

// //           const handleClick = (event: React.MouseEvent) => {
// //             if (button.onClick) {
// //               button.onClick(event, formValues);
// //             }
// //           };

// //           return (
// //             <motion.div
// //               key={index}
// //               whileHover={!isDisabled ? { scale: 1.05 } : {}}
// //               whileTap={!isDisabled ? { scale: 0.95 } : {}}
// //             >
// //               <Button
// //                 type={button.type}
// //                 variant={button.variant}
// //                 color={button.color || "primary"}
// //                 sx={button.sx}
// //                 onClick={button.type === "button" ? handleClick : undefined}
// //                 disabled={isDisabled}
// //                 startIcon={button.icon}
// //               >
// //                 {button.label}
// //               </Button>
// //             </motion.div>
// //           );
// //         })}
// //       </Stack>
// //     );
// //   };

// //   return (
// //     <Paper
// //       elevation={0}
// //       sx={{
// //         p: 4,
// //         border: "1px solid",
// //         borderColor: "divider",
// //         borderRadius: 1,
// //         ...sx,
// //       }}
// //       component={motion.div}
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //     >
// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         {title && (
// //           <Typography variant="h4" component="h1" fontWeight={400} gutterBottom>
// //             {title}
// //           </Typography>
// //         )}

// //         {subtitle && (
// //           <Typography variant="h6" component="h2" fontWeight={400} color="text.secondary" gutterBottom>
// //             {subtitle}
// //           </Typography>
// //         )}

// //         {description && (
// //           <Typography variant="body1" color="text.secondary" mb={4}>
// //             {description}
// //           </Typography>
// //         )}

// //         {(title || subtitle || description) && <Divider sx={{ mb: 4 }} />}

// //         <Grid container {...gridContainerProps}>
// //           {fields.map((field) => (
// //             <Grid
// //               item
// //               xs={field.gridProps?.xs ?? 12}
// //               sm={field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// //               md={field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// //               lg={field.gridProps?.lg ?? field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
// //               key={String(field.name)}
// //             >
// //               {renderField(field)}
// //             </Grid>
// //           ))}
// //         </Grid>

// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
// //           {renderButtonGroup("left")}
// //           {renderButtonGroup("center")}
// //           {renderButtonGroup("right")}
// //         </Box>
// //       </form>
// //     </Paper>
// //   );
// // };

// // export default DynamicForm;


// "use client"

// import React from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   FormHelperText,
//   Typography,
//   Paper,
//   useTheme,
//   Divider,
//   Stack,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { Controller, useForm, type SubmitHandler, type UseFormReturn, type DefaultValues } from "react-hook-form";
// import { motion } from "framer-motion";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// export type FieldType =
//   | "text"
//   | "email"
//   | "password"
//   | "number"
//   | "date"
//   | "select"
//   | "checkbox"
//   | "radio"
//   | "textarea"
//   | "file";

// export type ValidationRules = {
//   required?: boolean | string;
//   minLength?: { value: number; message: string };
//   maxLength?: { value: number; message: string };
//   pattern?: { value: RegExp; message: string };
//   validate?: (value: any) => boolean | string;
//   min?: { value: number; message: string };
//   max?: { value: number; message: string };
// };

// export type FormOption = {
//   value: string | number;
//   label: string;
// };

// export type FormField<T extends Record<string, any>> = {
//   name: keyof T;
//   type: FieldType;
//   label: string;
//   placeholder?: string;
//   defaultValue?: any;
//   options?: FormOption[];
//   validation?: ValidationRules;
//   disabled?: boolean | ((values: T) => boolean);
//   fullWidth?: boolean;
//   sx?: React.CSSProperties;
//   visibility?: (values: T) => boolean;
//   gridProps?: { xs?: number; sm?: number; md?: number; lg?: number };
//   multiple?: boolean;
//   accept?: string;
// };

// export type FormButton<T extends Record<string, any>> = {
//   type: "submit" | "reset" | "button";
//   variant: "contained" | "outlined" | "text";
//   label: string;
//   color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
//   sx?: React.CSSProperties;
//   onClick?: (event: React.MouseEvent, formValues: T) => void;
//   position?: "left" | "center" | "right";
//   disabled?: boolean | ((formValues: T) => boolean);
//   icon?: React.ReactNode;
//   startIcon?: React.ReactNode; // Added this line
// };

// export type DynamicFormProps<T extends Record<string, any>> = {
//   fields: FormField<T>[];
//   buttons: FormButton<T>[];
//   onSubmit: SubmitHandler<T>;
//   defaultValues?: DefaultValues<T>;
//   formRef?: React.RefObject<UseFormReturn<T>>;
//   title?: string;
//   subtitle?: string;
//   description?: string;
//   sx?: React.CSSProperties;
//   gridContainerProps?: React.ComponentProps<typeof Grid>;
//   mode?: "create" | "edit" | "view";
// };

// export const DynamicForm = <T extends Record<string, any>>({
//   fields,
//   buttons,
//   onSubmit,
//   defaultValues,
//   formRef,
//   title,
//   subtitle,
//   description,
//   sx,
//   gridContainerProps = { spacing: 3 },
//   mode = "create",
// }: DynamicFormProps<T>) => {
//   const theme = useTheme();
//   const formMethods = useForm<T>({
//     defaultValues: defaultValues as DefaultValues<T>,
//   });
  
//   const {
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//     setValue,
//   } = formMethods;
  
//   const formValues = watch();

//   React.useImperativeHandle(formRef, () => formMethods, [formMethods]);

//   const isFieldDisabled = (field: FormField<T>): boolean => {
//     if (mode === "view") return true;
//     if (typeof field.disabled === "function") return field.disabled(formValues);
//     return !!field.disabled;
//   };

//   const getButtonDisabledState = (button: FormButton<T>): boolean => {
//     if (typeof button.disabled === "function") return button.disabled(formValues);
//     return !!button.disabled;
//   };

//   const renderField = (field: FormField<T>) => {
//     if (field.visibility && !field.visibility(formValues)) {
//       return null;
//     }

//     const disabled = isFieldDisabled(field);
//     const error = !!errors[field.name];
//     const helperText = errors[field.name]?.message as string;

//     const commonProps = {
//       key: field.name as string,
//       fullWidth: field.fullWidth ?? true,
//       sx: { mb: 2, ...field.sx },
//       error,
//       helperText,
//       disabled,
//     };

//     switch (field.type) {
//       case "text":
//       case "email":
//       case "password":
//       case "number":
//       case "textarea":
//         return (
//           <Controller
//             name={field.name as any}
//             control={control}
//             rules={field.validation}
//             render={({ field: { onChange, value } }) => (
//               <TextField
//                 {...commonProps}
//                 label={field.label}
//                 placeholder={field.placeholder}
//                 type={field.type}
//                 value={value || ""}
//                 onChange={onChange}
//                 multiline={field.type === "textarea"}
//                 rows={field.type === "textarea" ? 4 : undefined}
//               />
//             )}
//           />
//         );

//       case "date":
//         return (
//           <Controller
//             name={field.name as any}
//             control={control}
//             rules={field.validation}
//             render={({ field: { onChange, value, ref } }) => (
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DatePicker
//                   label={field.label}
//                   value={value || null}
//                   onChange={onChange}
//                   disabled={disabled}
//                   inputRef={ref}
//                   slotProps={{
//                     textField: {
//                       ...commonProps,
//                       fullWidth: true,
//                       error: error,
//                       helperText: helperText,
//                     },
//                   }}
//                 />
//               </LocalizationProvider>
//             )}
//           />
//         );

//       case "select":
//         return (
//           <Controller
//             name={field.name as any}
//             control={control}
//             rules={field.validation}
//             render={({ field: { onChange, value } }) => (
//               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
//                 <InputLabel>{field.label}</InputLabel>
//                 <Select label={field.label} value={value || ""} onChange={onChange}>
//                   {field.options?.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {error && <FormHelperText>{helperText}</FormHelperText>}
//               </FormControl>
//             )}
//           />
//         );

//       case "checkbox":
//         return (
//           <Controller
//             name={field.name as any}
//             control={control}
//             rules={field.validation}
//             render={({ field: { onChange, value } }) => (
//               <FormControlLabel
//                 control={
//                   <Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} disabled={disabled} />
//                 }
//                 label={field.label}
//                 sx={commonProps.sx}
//               />
//             )}
//           />
//         );

//       case "radio":
//         return (
//           <Controller
//             name={field.name as any}
//             control={control}
//             rules={field.validation}
//             render={({ field: { onChange, value } }) => (
//               <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                   {field.label}
//                 </Typography>
//                 <RadioGroup value={value || ""} onChange={onChange}>
//                   {field.options?.map((option) => (
//                     <FormControlLabel
//                       key={option.value}
//                       value={option.value}
//                       control={<Radio />}
//                       label={option.label}
//                     />
//                   ))}
//                 </RadioGroup>
//                 {error && <FormHelperText>{helperText}</FormHelperText>}
//               </FormControl>
//             )}
//           />
//         );

//       case "file":
//         return (
//           <Controller
//             name={field.name as any}
//             control={control}
//             rules={field.validation}
//             render={({ field: { onChange, value } }) => {
//               const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 const files = event.target.files;
//                 if (files) {
//                   const fileList = Array.from(files);
//                   onChange(field.multiple ? fileList : fileList[0] || null);
//                 }
//               };

//               return (
//                 <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
//                   <input
//                     accept={field.accept || "*/*"}
//                     style={{ display: "none" }}
//                     id={`file-upload-${String(field.name)}`}
//                     multiple={field.multiple}
//                     type="file"
//                     onChange={handleFileChange}
//                     disabled={disabled}
//                   />
//                   <label htmlFor={`file-upload-${String(field.name)}`}>
//                     <Button variant="outlined" component="span" disabled={disabled} startIcon={<CloudUploadIcon />}>
//                       {field.label}
//                     </Button>
//                   </label>
//                   {value && (
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       {field.multiple 
//                         ? (value as File[]).map((f) => f.name).join(", ") 
//                         : (value as File).name}
//                     </Typography>
//                   )}
//                   {error && <FormHelperText>{helperText}</FormHelperText>}
//                 </FormControl>
//               );
//             }}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   const renderButtonGroup = (position: "left" | "center" | "right") => {
//     const filteredButtons = buttons.filter(
//       (button) => button.position === position || (!button.position && position === "right")
//     );

//     if (filteredButtons.length === 0) return null;

//     return (
//       <Stack
//         direction="row"
//         spacing={2}
//         justifyContent={
//           position === "center" ? "center" :
//             position === "left" ? "flex-start" : "flex-end"
//         }
//       >
//         {filteredButtons.map((button, index) => {
//           const isDisabled = getButtonDisabledState(button);

//           const handleClick = (event: React.MouseEvent) => {
//             if (button.onClick) {
//               button.onClick(event, formValues);
//             }
//           };

//           return (
//             <motion.div
//               key={index}
//               whileHover={!isDisabled ? { scale: 1.05 } : {}}
//               whileTap={!isDisabled ? { scale: 0.95 } : {}}
//             >
//               <Button
//                 type={button.type}
//                 variant={button.variant}
//                 color={button.color || "primary"}
//                 sx={button.sx}
//                 onClick={button.type === "button" ? handleClick : undefined}
//                 disabled={isDisabled}
//                 startIcon={button.startIcon || button.icon}
//               >
//                 {button.label}
//               </Button>
//             </motion.div>
//           );
//         })}
//       </Stack>
//     );
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 4,
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 1,
//         ...sx,
//       }}
//       component={motion.div}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {title && (
//           <Typography variant="h4" component="h1" fontWeight={400} gutterBottom>
//             {title}
//           </Typography>
//         )}

//         {subtitle && (
//           <Typography variant="h6" component="h2" fontWeight={400} color="text.secondary" gutterBottom>
//             {subtitle}
//           </Typography>
//         )}

//         {description && (
//           <Typography variant="body1" color="text.secondary" mb={4}>
//             {description}
//           </Typography>
//         )}

//         {(title || subtitle || description) && <Divider sx={{ mb: 4 }} />}

//         <Grid container {...gridContainerProps}>
//           {fields.map((field) => (
//             <Grid
//               item
//               xs={field.gridProps?.xs ?? 12}
//               sm={field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
//               md={field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
//               lg={field.gridProps?.lg ?? field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
//               key={String(field.name)}
//             >
//               {renderField(field)}
//             </Grid>
//           ))}
//         </Grid>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//           {renderButtonGroup("left")}
//           {renderButtonGroup("center")}
//           {renderButtonGroup("right")}
//         </Box>
//       </form>
//     </Paper>
//   );
// };

// export default DynamicForm;




"use client"

import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Typography,
  Paper,
  useTheme,
  Divider,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller, useForm, type SubmitHandler, type UseFormReturn, type DefaultValues } from "react-hook-form";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea"
  | "file";

export type ValidationRules = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any) => boolean | string;
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

export type FormOption = {
  value: string | number;
  label: string;
};

export type FormField<T extends Record<string, any>> = {
  name: keyof T;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  options?: FormOption[];
  validation?: ValidationRules;
  disabled?: boolean | ((values: T) => boolean);
  fullWidth?: boolean;
  sx?: React.CSSProperties;
  visibility?: (values: T) => boolean;
  gridProps?: { xs?: number; sm?: number; md?: number; lg?: number };
  multiple?: boolean;
  accept?: string;
};

export type FormButton<T extends Record<string, any>> = {
  type: "submit" | "reset" | "button";
  variant: "contained" | "outlined" | "text";
  label: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  sx?: React.CSSProperties;
  onClick?: (event: React.MouseEvent, formValues: T) => void;
  position?: "left" | "center" | "right";
  disabled?: boolean | ((formValues: T) => boolean);
  icon?: React.ReactNode;
  startIcon?: React.ReactNode;
};

export type DynamicFormProps<T extends Record<string, any>> = {
  fields: FormField<T>[];
  buttons: FormButton<T>[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  formRef?: React.RefObject<UseFormReturn<T>>;
  title?: string;
  subtitle?: string;
  description?: string;
  sx?: React.CSSProperties;
  gridContainerProps?: React.ComponentProps<typeof Grid>;
  mode?: "create" | "edit" | "view";
};

export const DynamicForm = <T extends Record<string, any>>({
  fields,
  buttons,
  onSubmit,
  defaultValues,
  formRef,
  title,
  subtitle,
  description,
  sx,
  gridContainerProps = { spacing: 3 },
  mode = "create",
}: DynamicFormProps<T>) => {
  const theme = useTheme();
  const formMethods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });
  
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = formMethods;
  
  const formValues = watch();

  React.useImperativeHandle(formRef, () => formMethods, [formMethods]);

  const isFieldDisabled = (field: FormField<T>): boolean => {
    if (mode === "view") return true;
    if (typeof field.disabled === "function") return field.disabled(formValues);
    return !!field.disabled;
  };

  const getButtonDisabledState = (button: FormButton<T>): boolean => {
    if (typeof button.disabled === "function") return button.disabled(formValues);
    return !!button.disabled;
  };

  const renderField = (field: FormField<T>) => {
    if (field.visibility && !field.visibility(formValues)) {
      return null;
    }

    const disabled = isFieldDisabled(field);
    const error = !!errors[field.name];
    const helperText = errors[field.name]?.message as string;

    const commonProps = {
      key: field.name as string,
      fullWidth: field.fullWidth ?? true,
      sx: { mb: 2, ...field.sx },
      error,
      helperText,
      disabled,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "textarea":
        return (
          <Controller
            name={field.name as any}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <TextField
                {...commonProps}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={value || ""}
                onChange={onChange}
                multiline={field.type === "textarea"}
                rows={field.type === "textarea" ? 4 : undefined}
              />
            )}
          />
        );

      case "date":
        return (
          <Controller
            name={field.name as any}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value, ref } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={field.label}
                  value={value || null}
                  onChange={onChange}
                  disabled={disabled}
                  inputRef={ref}
                  slotProps={{
                    textField: {
                      ...commonProps,
                      fullWidth: true,
                      error: error,
                      helperText: helperText,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={field.name as any}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
                <InputLabel>{field.label}</InputLabel>
                <Select 
                  label={field.label} 
                  value={value || ""} 
                  onChange={onChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{helperText}</FormHelperText>}
              </FormControl>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.name as any}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={!!value} 
                    onChange={(e) => onChange(e.target.checked)} 
                    disabled={disabled} 
                  />
                }
                label={field.label}
                sx={commonProps.sx}
              />
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={field.name as any}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {field.label}
                </Typography>
                <RadioGroup value={value || ""} onChange={onChange}>
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
                {error && <FormHelperText>{helperText}</FormHelperText>}
              </FormControl>
            )}
          />
        );

      case "file":
        return (
          <Controller
            name={field.name as any}
            control={control}
            rules={field.validation}
            render={({ field: { onChange } }) => {
              const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;
                if (files) {
                  const fileList = Array.from(files);
                  onChange(field.multiple ? fileList : fileList[0] || null);
                }
              };

              return (
                <FormControl fullWidth={commonProps.fullWidth} sx={commonProps.sx} error={error} disabled={disabled}>
                  <input
                    accept={field.accept || "*/*"}
                    style={{ display: "none" }}
                    id={`file-upload-${String(field.name)}`}
                    multiple={field.multiple}
                    type="file"
                    onChange={handleFileChange}
                    disabled={disabled}
                  />
                  <label htmlFor={`file-upload-${String(field.name)}`}>
                    <Button 
                      variant="outlined" 
                      component="span" 
                      disabled={disabled} 
                      startIcon={<CloudUploadIcon />}
                    >
                      {field.label}
                    </Button>
                  </label>
                  {formValues[field.name] && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {field.multiple 
                        ? (formValues[field.name] as File[]).map((f: File) => f.name).join(", ") 
                        : (formValues[field.name] as File).name}
                    </Typography>
                  )}
                  {error && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
              );
            }}
          />
        );

      default:
        return null;
    }
  };

  const renderButtonGroup = (position: "left" | "center" | "right") => {
    const filteredButtons = buttons.filter(
      (button) => button.position === position || (!button.position && position === "right")
    );

    if (filteredButtons.length === 0) return null;

    return (
      <Stack
        direction="row"
        spacing={2}
        justifyContent={
          position === "center" ? "center" :
            position === "left" ? "flex-start" : "flex-end"
        }
      >
        {filteredButtons.map((button, index) => {
          const isDisabled = getButtonDisabledState(button);

          const handleClick = (event: React.MouseEvent) => {
            if (button.onClick) {
              button.onClick(event, formValues);
            }
          };

          return (
            <motion.div
              key={index}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
            >
              <Button
                type={button.type}
                variant={button.variant}
                color={button.color || "primary"}
                sx={button.sx}
                onClick={button.type === "button" ? handleClick : undefined}
                disabled={isDisabled}
                startIcon={button.startIcon ?? button.icon}
              >
                {button.label}
              </Button>
            </motion.div>
          );
        })}
      </Stack>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        ...sx,
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {title && (
          <Typography variant="h4" component="h1" fontWeight={400} gutterBottom>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography variant="h6" component="h2" fontWeight={400} color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography variant="body1" color="text.secondary" mb={4}>
            {description}
          </Typography>
        )}

        {(title || subtitle || description) && <Divider sx={{ mb: 4 }} />}

        <Grid container {...gridContainerProps}>
          {fields.map((field) => (
            <Grid
              item
              xs={field.gridProps?.xs ?? 12}
              sm={field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
              md={field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
              lg={field.gridProps?.lg ?? field.gridProps?.md ?? field.gridProps?.sm ?? field.gridProps?.xs ?? 12}
              key={String(field.name)}
            >
              {renderField(field)}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          {renderButtonGroup("left")}
          {renderButtonGroup("center")}
          {renderButtonGroup("right")}
        </Box>
      </form>
    </Paper>
  );
};

export default DynamicForm;