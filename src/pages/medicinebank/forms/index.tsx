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


