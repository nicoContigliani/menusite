// // // import React, { useState } from 'react';
// // // import { Box, Typography } from '@mui/material';
// // // import { useRouter } from 'next/router';
// // // import { toast } from 'react-toastify';
// // // import DynamicForm from '@/components/MED/DynamicFormProps/DynamicFormProps';

// // // // Definimos el tipo para los datos del usuario
// // // type UserFormData = {
// // //   firstName: string;
// // //   lastName: string;
// // //   email: string;
// // //   username: string;
// // //   password: string;
// // //   role: string;
// // //   isActive: boolean;
// // // };

// // // const CreateUserPage = () => {
// // //   const router = useRouter();
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // Función para crear usuario
// // //   const createUser = async (userData: UserFormData) => {
// // //     setIsSubmitting(true);
// // //     setError(null);
    
// // //     try {
// // //       // Mock de la API
// // //       const response = await new Promise((resolve) => {
// // //         setTimeout(() => {
// // //           resolve({
// // //             id: Math.floor(Math.random() * 1000),
// // //             ...userData,
// // //             createdAt: new Date().toISOString()
// // //           });
// // //         }, 1000);
// // //       });

// // //       toast.success('Usuario creado exitosamente');
// // //       router.push('/users');
// // //     } catch (err:any) {
// // //       setError(err.message || 'Error al crear usuario');
// // //       toast.error(err.message || 'Error al crear usuario');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   // Campos del formulario
// // //   const fields:any[] = [
// // //     {
// // //       name: 'firstName',
// // //       type: 'text',
// // //       label: 'Nombre',
// // //       placeholder: 'Ej: Juan',
// // //       validation: {
// // //         required: 'El nombre es requerido',
// // //         minLength: {
// // //           value: 2,
// // //           message: 'Mínimo 2 caracteres'
// // //         }
// // //       },
// // //       gridProps: { xs: 12, sm: 6 }
// // //     },
// // //     {
// // //       name: 'lastName',
// // //       type: 'text',
// // //       label: 'Apellido',
// // //       placeholder: 'Ej: Pérez',
// // //       validation: {
// // //         required: 'El apellido es requerido',
// // //         minLength: {
// // //           value: 2,
// // //           message: 'Mínimo 2 caracteres'
// // //         }
// // //       },
// // //       gridProps: { xs: 12, sm: 6 }
// // //     },
// // //     {
// // //       name: 'email',
// // //       type: 'email',
// // //       label: 'Correo electrónico',
// // //       placeholder: 'Ej: usuario@example.com',
// // //       validation: {
// // //         required: 'El email es requerido',
// // //         pattern: {
// // //           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // //           message: 'Email inválido'
// // //         }
// // //       },
// // //       gridProps: { xs: 12 }
// // //     },
// // //     {
// // //       name: 'username',
// // //       type: 'text',
// // //       label: 'Nombre de usuario',
// // //       placeholder: 'Ej: juanperez',
// // //       validation: {
// // //         required: 'El nombre de usuario es requerido',
// // //         minLength: {
// // //           value: 3,
// // //           message: 'Mínimo 3 caracteres'
// // //         }
// // //       },
// // //       gridProps: { xs: 12, sm: 6 }
// // //     },
// // //     {
// // //       name: 'password',
// // //       type: 'password',
// // //       label: 'Contraseña',
// // //       validation: {
// // //         required: 'La contraseña es requerida',
// // //         minLength: {
// // //           value: 6,
// // //           message: 'Mínimo 6 caracteres'
// // //         }
// // //       },
// // //       gridProps: { xs: 12, sm: 6 }
// // //     },
// // //     // {
// // //     //   name: 'role',
// // //     //   type: 'select',
// // //     //   label: 'Rol',
// // //     //   options: [
// // //     //     { value: 'user', label: 'Usuario normal' },
// // //     //     { value: 'editor', label: 'Editor' },
// // //     //     { value: 'admin', label: 'Administrador' }
// // //     //   ],
// // //     //   validation: {
// // //     //     required: 'Seleccione un rol'
// // //     //   },
// // //     //   gridProps: { xs: 12, sm: 6 }
// // //     // },
// // //     // {
// // //     //   name: 'isActive',
// // //     //   type: 'checkbox',
// // //     //   label: 'Usuario activo',
// // //     //   defaultValue: true
// // //     // }
// // //   ];

// // //   // Botones del formulario
// // //   const buttons:any[] = [
// // //     {
// // //       type: 'button',
// // //       variant: 'outlined',
// // //       label: 'Cancelar',
// // //       color: 'secondary',
// // //       onClick: () => router.push('/users'),
// // //       position: 'left'
// // //     },
// // //     {
// // //       type: 'submit',
// // //       variant: 'contained',
// // //       label: 'Crear Usuario',
// // //       color: 'primary',
// // //       position: 'right',
// // //       disabled: isSubmitting
// // //     }
// // //   ];

// // //   const handleSubmit = (data: UserFormData) => {
// // //     createUser(data);
// // //   };

// // //   return (
// // //     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
// // //       <Typography variant="h4" component="h1" gutterBottom>
// // //         Crear Nuevo Usuario
// // //       </Typography>
// // //       <Typography variant="body1" color="text.secondary" mb={4}>
// // //         Complete el formulario para registrar un nuevo usuario en el sistema.
// // //       </Typography>
      
// // //       {error && (
// // //         <Typography color="error" mb={2}>
// // //           {error}
// // //         </Typography>
// // //       )}
      
// // //       <DynamicForm<UserFormData>
// // //         fields={fields}
// // //         buttons={buttons}
// // //         onSubmit={handleSubmit}
// // //         mode="create"
// // //         gridContainerProps={{ spacing: 2 }}
// // //       />
// // //     </Box>
// // //   );
// // // };

// // // export default CreateUserPage;


// // "use client"

// // import { useState } from "react"
// // import { Box, Typography, CircularProgress, LinearProgress } from "@mui/material"
// // import { useRouter } from "next/navigation"
// // import { toast } from "react-toastify"
// // import { useSupabaseStorage } from "../../../../hooks/MedHooks/useSupabaseStorage"
// // import DynamicForm from "@/components/MED/DynamicFormProps/DynamicFormProps"

// // // Definimos el tipo para los datos del usuario
// // type UserFormData = {
// //   firstName: string
// //   lastName: string
// //   email: string
// //   username: string
// //   password: string
// //   role: string
// //   isActive: boolean
// //   dniFrontImage: File | null
// //   dniBackImage: File | null
// //   profileImage: File | null // Nuevo campo para la imagen de perfil
// //   taxPdf: File | null // Nuevo campo para el PDF de impuesto
// //   street: string // Nuevo campo para la calle
// //   streetNumber: string // Nuevo campo para el número (lo dejamos como string para flexibilidad, ej. "123A")
// // }

// // const CreateUserPage = () => {
// //   const router = useRouter()
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [error, setError] = useState<string | null>(null)

// //   // Inicializamos el hook de Supabase Storage
// //   const {
// //     uploadFiles,
// //     uploading,
// //     error: uploadError,
// //     uploadProgress,
// //     uploadedFiles,
// //   } = useSupabaseStorage({
// //     bucketName: "llakaScriptBucket", // ¡IMPORTANTE! Reemplaza con el nombre de tu bucket de Supabase
// //     basePath: "companiesFolders", // La ruta base se manejará dinámicamente por cada archivo
// //     showToastMessages: true,
// //     onUploadProgress: (progress:any) => console.log("Progreso de subida:", progress),
// //     onUploadComplete: (files:any) => console.log("Subida completada:", files),
// //     onError: (err:any) => console.error("Error de subida:", err),
// //   })

// //   // Función para crear usuario
// //   const createUser = async (userData: UserFormData) => {
// //     setIsSubmitting(true)
// //     setError(null)

// //     try {
// //       let dniFrontImageUrl = ""
// //       let dniBackImageUrl = ""
// //       let profileImageUrl = "" // URL para la imagen de perfil
// //       let taxPdfUrl = "" // URL para el PDF de impuesto

// //       // 1. Subir imagen frontal del DNI
// //       if (userData.dniFrontImage) {
// //         const uploadedFront = await uploadFiles(
// //           [userData.dniFrontImage],
// //           {},
// //           `dni-images/${userData.username}/front`, // Carpeta específica para el usuario
// //         )
// //         if (uploadedFront && uploadedFront.length > 0) {
// //           dniFrontImageUrl = uploadedFront[0].url
// //         } else {
// //           throw new Error("Fallo al subir la imagen frontal del DNI.")
// //         }
// //       }

// //       // 2. Subir imagen trasera del DNI
// //       if (userData.dniBackImage) {
// //         const uploadedBack = await uploadFiles(
// //           [userData.dniBackImage],
// //           {},
// //           `dni-images/${userData.username}/back`, // Carpeta específica para el usuario
// //         )
// //         if (uploadedBack && uploadedBack.length > 0) {
// //           dniBackImageUrl = uploadedBack[0].url
// //         } else {
// //           throw new Error("Fallo al subir la imagen trasera del DNI.")
// //         }
// //       }

// //       // 3. Subir imagen de perfil
// //       if (userData.profileImage) {
// //         const uploadedProfile = await uploadFiles(
// //           [userData.profileImage],
// //           {},
// //           `profile-images/${userData.username}`, // Carpeta específica para la imagen de perfil
// //         )
// //         if (uploadedProfile && uploadedProfile.length > 0) {
// //           profileImageUrl = uploadedProfile[0].url
// //         } else {
// //           throw new Error("Fallo al subir la imagen de perfil.")
// //         }
// //       }

// //       // 4. Subir PDF de impuesto
// //       if (userData.taxPdf) {
// //         const uploadedTaxPdf = await uploadFiles(
// //           [userData.taxPdf],
// //           {},
// //           `tax-documents/${userData.username}`, // Carpeta específica para el PDF
// //         )
// //         if (uploadedTaxPdf && uploadedTaxPdf.length > 0) {
// //           taxPdfUrl = uploadedTaxPdf[0].url
// //         } else {
// //           throw new Error("Fallo al subir el PDF de impuesto.")
// //         }
// //       }

// //       // Preparamos los datos del usuario para enviar a la API, incluyendo las URLs de las imágenes y la dirección
// //       const apiUserData = {
// //         firstName: userData.firstName,
// //         lastName: userData.lastName,
// //         email: userData.email,
// //         username: userData.username,
// //         password: userData.password,
// //         role: userData.role,
// //         isActive: userData.isActive,
// //         dniFrontImageUrl,
// //         dniBackImageUrl,
// //         profileImageUrl, // Incluimos la URL de la imagen de perfil
// //         taxPdfUrl, // Incluimos la URL del PDF de impuesto
// //         street: userData.street, // Incluimos la calle
// //         streetNumber: userData.streetNumber, // Incluimos el número
// //       }

// //       // Mock de la API (reemplaza esto con tu llamada a la API real)
// //       const response = await new Promise((resolve) => {
// //         setTimeout(() => {
// //           resolve({
// //             id: Math.floor(Math.random() * 1000),
// //             ...apiUserData,
// //             createdAt: new Date().toISOString(),
// //           })
// //         }, 1000)
// //       })

// //       toast.success("Usuario creado exitosamente")
// //       router.push("/users")
// //     } catch (err: any) {
// //       setError(err.message || "Error al crear usuario")
// //       toast.error(err.message || "Error al crear usuario")
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   // Campos del formulario
// //   const fields: any[] = [
// //     {
// //       name: "firstName",
// //       type: "text",
// //       label: "Nombre",
// //       placeholder: "Ej: Juan",
// //       validation: {
// //         required: "El nombre es requerido",
// //         minLength: { value: 2, message: "Mínimo 2 caracteres" },
// //       },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "lastName",
// //       type: "text",
// //       label: "Apellido",
// //       placeholder: "Ej: Pérez",
// //       validation: {
// //         required: "El apellido es requerido",
// //         minLength: { value: 2, message: "Mínimo 2 caracteres" },
// //       },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "email",
// //       type: "email",
// //       label: "Correo electrónico",
// //       placeholder: "Ej: usuario@example.com",
// //       validation: {
// //         required: "El email es requerido",
// //         pattern: {
// //           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //           message: "Email inválido",
// //         },
// //       },
// //       gridProps: { xs: 12 },
// //     },
// //     {
// //       name: "username",
// //       type: "text",
// //       label: "Nombre de usuario",
// //       placeholder: "Ej: juanperez",
// //       validation: {
// //         required: "El nombre de usuario es requerido",
// //         minLength: { value: 3, message: "Mínimo 3 caracteres" },
// //       },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "password",
// //       type: "password",
// //       label: "Contraseña",
// //       validation: {
// //         required: "La contraseña es requerida",
// //         minLength: { value: 6, message: "Mínimo 6 caracteres" },
// //       },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "street",
// //       type: "text",
// //       label: "Calle",
// //       placeholder: "Ej: Av. Siempre Viva",
// //       validation: {
// //         required: "La calle es requerida",
// //       },
// //       gridProps: { xs: 12, sm: 8 },
// //     },
// //     {
// //       name: "streetNumber",
// //       type: "text", // Cambiado a 'text' para permitir números y letras (ej. "123A")
// //       label: "Número",
// //       placeholder: "Ej: 742",
// //       validation: {
// //         required: "El número es requerido",
// //       },
// //       gridProps: { xs: 12, sm: 4 },
// //     },
// //     {
// //       name: "profileImage",
// //       type: "file",
// //       label: "Imagen de Perfil",
// //       accept: "image/*", // Aceptar solo imágenes
// //       validation: { required: "La imagen de perfil es requerida" },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "dniFrontImage",
// //       type: "file",
// //       label: "Imagen DNI (Frente)",
// //       accept: "image/*",
// //       validation: { required: "La imagen frontal del DNI es requerida" },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "dniBackImage",
// //       type: "file",
// //       label: "Imagen DNI (Atrás)",
// //       accept: "image/*",
// //       validation: { required: "La imagen trasera del DNI es requerida" },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     {
// //       name: "taxPdf",
// //       type: "file",
// //       label: "PDF de Impuesto",
// //       accept: ".pdf", // Aceptar solo archivos PDF
// //       validation: { required: "El PDF de impuesto es requerido" },
// //       gridProps: { xs: 12, sm: 6 },
// //     },
// //     // Puedes descomentar y usar estos campos si los necesitas
// //     // {
// //     //   name: 'role',
// //     //   type: 'select',
// //     //   label: 'Rol',
// //     //   options: [
// //     //     { value: 'user', label: 'Usuario normal' },
// //     //     { value: 'editor', label: 'Editor' },
// //     //     { value: 'admin', label: 'Administrador' }
// //     //   ],
// //     //   validation: {
// //     //     required: 'Seleccione un rol'
// //     //   },
// //     //   gridProps: { xs: 12, sm: 6 }
// //     // },
// //     // {
// //     //   name: 'isActive',
// //     //   type: 'checkbox',
// //     //   label: 'Usuario activo',
// //     //   defaultValue: true
// //     // }
// //   ]

// //   // Botones del formulario
// //   const buttons: any[] = [
// //     {
// //       type: "button",
// //       variant: "outlined",
// //       label: "Cancelar",
// //       color: "secondary",
// //       onClick: () => router.push("/users"),
// //       position: "left",
// //     },
// //     {
// //       type: "submit",
// //       variant: "contained",
// //       label: "Crear Usuario",
// //       color: "primary",
// //       position: "right",
// //       disabled: isSubmitting || uploading, // Deshabilitar si se está enviando el formulario o subiendo archivos
// //     },
// //   ]

// //   const handleSubmit = (data: UserFormData) => {
// //     createUser(data)
// //   }

// //   return (
// //     <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
// //       <Typography variant="h4" component="h1" gutterBottom>
// //         Crear Nuevo Usuario
// //       </Typography>
// //       <Typography variant="body1" color="text.secondary" mb={4}>
// //         Complete el formulario para registrar un nuevo usuario en el sistema, incluyendo las imágenes de su DNI, imagen
// //         de perfil, PDF de impuesto y datos de dirección.
// //       </Typography>
// //       {(error || uploadError) && (
// //         <Typography color="error" mb={2}>
// //           {error || uploadError}
// //         </Typography>
// //       )}
// //       <DynamicForm<UserFormData>
// //         fields={fields}
// //         buttons={buttons}
// //         onSubmit={handleSubmit}
// //         mode="create"
// //         gridContainerProps={{ spacing: 2 }}
// //       />
// //       {(isSubmitting || uploading) && (
// //         <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
// //           <CircularProgress />
// //           <Typography variant="body1">
// //             {uploading ? `Subiendo archivos: ${uploadProgress}%` : "Creando usuario..."}
// //           </Typography>
// //           {uploading && <LinearProgress variant="determinate" value={uploadProgress} sx={{ width: "100%" }} />}
// //         </Box>
// //       )}
// //     </Box>
// //   )
// // }

// // export default CreateUserPage


// "use client"

// import { useState } from "react"
// import { Box, Typography, CircularProgress, LinearProgress } from "@mui/material"
// import { useRouter } from "next/navigation"
// import { toast } from "react-toastify"
// import { useSupabaseStorage } from "../../../../hooks/MedHooks/useSupabaseStorage"
// import DynamicForm, { type FormField, type FormButton } from "@/components/MED/DynamicFormProps/DynamicFormProps"

// type UserFormData = {
//   firstName: string
//   lastName: string
//   email: string
//   username: string
//   password: string
//   dniFrontImage: File | null
//   dniBackImage: File | null
//   profileImage: File | null
//   taxPdf: File | null
//   street: string
//   streetNumber: string
// }

// const CreateUserPage = () => {
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const {
//     uploadFiles,
//     uploading,
//     error: uploadError,
//     uploadProgress,
//   } = useSupabaseStorage({
//     showToastMessages: true,
//   })

//   const createUser = async (userData: UserFormData) => {
//     setIsSubmitting(true)
//     setError(null)

//     try {
//       // Validar que todos los archivos están presentes
//       if (!userData.dniFrontImage || !userData.dniBackImage || !userData.profileImage || !userData.taxPdf) {
//         throw new Error("Todos los archivos son requeridos")
//       }

//       // Subir archivos en paralelo
//       const uploadPromises = [
//         uploadFiles([userData.dniFrontImage], userData.username, "dni/front"),
//         uploadFiles([userData.dniBackImage], userData.username, "dni/back"),
//         uploadFiles([userData.profileImage], userData.username, "profile"),
//         uploadFiles([userData.taxPdf], userData.username, "tax-documents"),
//       ]

//       const [frontResult, backResult, profileResult, taxResult] = await Promise.all(uploadPromises)

//       // Verificar que todas las subidas fueron exitosas
//       if (!frontResult?.[0]?.url || !backResult?.[0]?.url || !profileResult?.[0]?.url || !taxResult?.[0]?.url) {
//         throw new Error("Error al subir uno o más archivos")
//       }

//       // Preparar datos para la API
//       const apiUserData = {
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         email: userData.email,
//         username: userData.username,
//         password: userData.password,
//         dniFrontImageUrl: frontResult[0].url,
//         dniBackImageUrl: backResult[0].url,
//         profileImageUrl: profileResult[0].url,
//         taxPdfUrl: taxResult[0].url,
//         street: userData.street,
//         streetNumber: userData.streetNumber,
//       }

//       // Llamada a la API real (ejemplo)
//       const response = await fetch("/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(apiUserData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Error al crear usuario")
//       }

//       toast.success("Usuario creado exitosamente")
//       router.push("/users")
//     } catch (err: any) {
//       setError(err.message || "Error al crear usuario")
//       toast.error(err.message || "Error al crear usuario")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const fields: FormField<UserFormData>[] = [
//     {
//       name: "firstName",
//       type: "text",
//       label: "Nombre",
//       placeholder: "Ej: Juan",
//       validation: {
//         required: "El nombre es requerido",
//         minLength: { value: 2, message: "Mínimo 2 caracteres" },
//       },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "lastName",
//       type: "text",
//       label: "Apellido",
//       placeholder: "Ej: Pérez",
//       validation: {
//         required: "El apellido es requerido",
//         minLength: { value: 2, message: "Mínimo 2 caracteres" },
//       },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "email",
//       type: "email",
//       label: "Correo electrónico",
//       placeholder: "Ej: usuario@example.com",
//       validation: {
//         required: "El email es requerido",
//         pattern: {
//           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//           message: "Email inválido",
//         },
//       },
//       gridProps: { xs: 12 },
//     },
//     {
//       name: "username",
//       type: "text",
//       label: "Nombre de usuario",
//       placeholder: "Ej: juanperez",
//       validation: {
//         required: "El nombre de usuario es requerido",
//         minLength: { value: 3, message: "Mínimo 3 caracteres" },
//         pattern: {
//           value: /^[a-z0-9_]+$/i,
//           message: "Solo letras, números y guiones bajos",
//         },
//       },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "password",
//       type: "password",
//       label: "Contraseña",
//       validation: {
//         required: "La contraseña es requerida",
//         minLength: { value: 6, message: "Mínimo 6 caracteres" },
//       },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "street",
//       type: "text",
//       label: "Calle",
//       placeholder: "Ej: Av. Siempre Viva",
//       validation: {
//         required: "La calle es requerida",
//       },
//       gridProps: { xs: 12, sm: 8 },
//     },
//     {
//       name: "streetNumber",
//       type: "text",
//       label: "Número",
//       placeholder: "Ej: 742",
//       validation: {
//         required: "El número es requerido",
//       },
//       gridProps: { xs: 12, sm: 4 },
//     },
//     {
//       name: "profileImage",
//       type: "file",
//       label: "Imagen de Perfil",
//       accept: "image/*",
//       validation: { required: "La imagen de perfil es requerida" },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "dniFrontImage",
//       type: "file",
//       label: "Imagen DNI (Frente)",
//       accept: "image/*",
//       validation: { required: "La imagen frontal del DNI es requerida" },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "dniBackImage",
//       type: "file",
//       label: "Imagen DNI (Atrás)",
//       accept: "image/*",
//       validation: { required: "La imagen trasera del DNI es requerida" },
//       gridProps: { xs: 12, sm: 6 },
//     },
//     {
//       name: "taxPdf",
//       type: "file",
//       label: "PDF de Impuesto",
//       accept: ".pdf",
//       validation: { required: "El PDF de impuesto es requerido" },
//       gridProps: { xs: 12, sm: 6 },
//     },
//   ]

//   const buttons: FormButton<UserFormData>[] = [
//     {
//       type: "button",
//       variant: "outlined",
//       label: "Cancelar",
//       color: "secondary",
//       onClick: () => router.push("/users"),
//       position: "left",
//     },
//     {
//       type: "submit",
//       variant: "contained",
//       label: isSubmitting || uploading ? "Procesando..." : "Crear Usuario",
//       color: "primary",
//       position: "right",
//       disabled: isSubmitting || uploading,
//       startIcon: (isSubmitting || uploading) ? <CircularProgress size={20} /> : null,
//     },
//   ]

//   return (
//     <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Crear Nuevo Usuario
//       </Typography>
//       <Typography variant="body1" color="text.secondary" mb={4}>
//         Complete el formulario para registrar un nuevo usuario en el sistema.
//       </Typography>

//       {(error || uploadError) && (
//         <Typography color="error" mb={2}>
//           {error || uploadError}
//         </Typography>
//       )}

//       <DynamicForm<UserFormData>
//         fields={fields}
//         buttons={buttons}
//         onSubmit={createUser}
//         mode="create"
//         gridContainerProps={{ spacing: 2 }}
//       />

//       {(isSubmitting || uploading) && (
//         <Box sx={{ mt: 3, width: "100%" }}>
//           <LinearProgress 
//             variant={uploading ? "determinate" : "indeterminate"} 
//             value={uploadProgress} 
//           />
//           <Typography variant="body2" align="center" mt={1}>
//             {uploading ? `Subiendo archivos: ${uploadProgress}%` : "Creando usuario..."}
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   )
// }

// export default CreateUserPage




"use client"

import { useState } from "react"
import { Box, Typography, CircularProgress, LinearProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useSupabaseStorage } from "../../../../hooks/MedHooks/useSupabaseStorage"
import DynamicForm, { type FormField, type FormButton } from "@/components/MED/DynamicFormProps/DynamicFormProps"

type UserFormData = {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  dniFrontImage: File | null
  dniBackImage: File | null
  profileImage: File | null
  taxPdf: File | null
  street: string
  streetNumber: string
}

const CreateUserPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    uploadFiles,
    uploading,
    error: uploadError,
    uploadProgress,
  } = useSupabaseStorage({
    showToastMessages: true,
  })

  const createUser = async (userData: UserFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Validar que todos los archivos están presentes
      if (!userData.dniFrontImage || !userData.dniBackImage || !userData.profileImage || !userData.taxPdf) {
        throw new Error("Todos los archivos son requeridos")
      }

      // Subir archivos en paralelo
      const uploadPromises = [
        uploadFiles([userData.dniFrontImage], userData.username, "dni/front"),
        uploadFiles([userData.dniBackImage], userData.username, "dni/back"),
        uploadFiles([userData.profileImage], userData.username, "profile"),
        uploadFiles([userData.taxPdf], userData.username, "tax-documents"),
      ]

      const [frontResult, backResult, profileResult, taxResult] = await Promise.all(uploadPromises)

      // Verificar que todas las subidas fueron exitosas
      if (!frontResult?.[0]?.url || !backResult?.[0]?.url || !profileResult?.[0]?.url || !taxResult?.[0]?.url) {
        throw new Error("Error al subir uno o más archivos")
      }

      // Mostrar resultados en consola para verificar
      console.log("Archivos subidos exitosamente:", {
        dniFront: frontResult[0].url,
        dniBack: backResult[0].url,
        profile: profileResult[0].url,
        tax: taxResult[0].url
      })

      toast.success("Archivos subidos correctamente al bucket de Supabase", {
        autoClose: 5000
      })

      // Simular creación de usuario (sin llamada real a la API)
      console.log("Simulando creación de usuario con datos:", {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        street: userData.street,
        streetNumber: userData.streetNumber,
        fileUrls: {
          dniFront: frontResult[0].url,
          dniBack: backResult[0].url,
          profile: profileResult[0].url,
          tax: taxResult[0].url
        }
      })

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/users")
      }, 2000)

    } catch (err: any) {
      setError(err.message || "Error al crear usuario")
      toast.error(err.message || "Error al crear usuario")
      console.error("Error en el proceso:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fields: FormField<UserFormData>[] = [
    {
      name: "firstName",
      type: "text",
      label: "Nombre",
      placeholder: "Ej: Juan",
      validation: {
        required: "El nombre es requerido",
        minLength: { value: 2, message: "Mínimo 2 caracteres" },
      },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "lastName",
      type: "text",
      label: "Apellido",
      placeholder: "Ej: Pérez",
      validation: {
        required: "El apellido es requerido",
        minLength: { value: 2, message: "Mínimo 2 caracteres" },
      },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "email",
      type: "email",
      label: "Correo electrónico",
      placeholder: "Ej: usuario@example.com",
      validation: {
        required: "El email es requerido",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Email inválido",
        },
      },
      gridProps: { xs: 12 },
    },
    {
      name: "username",
      type: "text",
      label: "Nombre de usuario",
      placeholder: "Ej: juanperez",
      validation: {
        required: "El nombre de usuario es requerido",
        minLength: { value: 3, message: "Mínimo 3 caracteres" },
        pattern: {
          value: /^[a-z0-9_]+$/i,
          message: "Solo letras, números y guiones bajos",
        },
      },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "password",
      type: "password",
      label: "Contraseña",
      validation: {
        required: "La contraseña es requerida",
        minLength: { value: 6, message: "Mínimo 6 caracteres" },
      },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "street",
      type: "text",
      label: "Calle",
      placeholder: "Ej: Av. Siempre Viva",
      validation: {
        required: "La calle es requerida",
      },
      gridProps: { xs: 12, sm: 8 },
    },
    {
      name: "streetNumber",
      type: "text",
      label: "Número",
      placeholder: "Ej: 742",
      validation: {
        required: "El número es requerido",
      },
      gridProps: { xs: 12, sm: 4 },
    },
    {
      name: "profileImage",
      type: "file",
      label: "Imagen de Perfil",
      accept: "image/*",
      validation: { required: "La imagen de perfil es requerida" },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "dniFrontImage",
      type: "file",
      label: "Imagen DNI (Frente)",
      accept: "image/*",
      validation: { required: "La imagen frontal del DNI es requerida" },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "dniBackImage",
      type: "file",
      label: "Imagen DNI (Atrás)",
      accept: "image/*",
      validation: { required: "La imagen trasera del DNI es requerida" },
      gridProps: { xs: 12, sm: 6 },
    },
    {
      name: "taxPdf",
      type: "file",
      label: "PDF de Impuesto",
      accept: ".pdf",
      validation: { required: "El PDF de impuesto es requerido" },
      gridProps: { xs: 12, sm: 6 },
    },
  ]

  const buttons: FormButton<UserFormData>[] = [
    {
      type: "button",
      variant: "outlined",
      label: "Cancelar",
      color: "secondary",
      onClick: () => router.push("/users"),
      position: "left",
    },
    {
      type: "submit",
      variant: "contained",
      label: isSubmitting || uploading ? "Procesando..." : "Crear Usuario",
      color: "primary",
      position: "right",
      disabled: isSubmitting || uploading,
      startIcon: (isSubmitting || uploading) ? <CircularProgress size={20} /> : null,
    },
  ]

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Nuevo Usuario (Modo Demo)
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Complete el formulario para probar la subida de archivos al bucket de Supabase.
        <br />
        <strong>Nota:</strong> Esta versión no crea usuarios reales, solo sube archivos y muestra los resultados en consola.
      </Typography>

      {(error || uploadError) && (
        <Typography color="error" mb={2}>
          {error || uploadError}
        </Typography>
      )}

      <DynamicForm<UserFormData>
        fields={fields}
        buttons={buttons}
        onSubmit={createUser}
        mode="create"
        gridContainerProps={{ spacing: 2 }}
      />

      {(isSubmitting || uploading) && (
        <Box sx={{ mt: 3, width: "100%" }}>
          <LinearProgress 
            variant={uploading ? "determinate" : "indeterminate"} 
            value={uploadProgress} 
          />
          <Typography variant="body2" align="center" mt={1}>
            {uploading ? `Subiendo archivos: ${uploadProgress}%` : "Procesando formulario..."}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CreateUserPage


