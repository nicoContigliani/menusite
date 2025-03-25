"use client"

import { useEffect, useState } from "react"
import ReusableModal from "../ReusableModal/ReusableModal"
import { Button, DialogActions, Grid, Typography, Box, Paper } from "@mui/material"
import Image from "next/image"
import CheckboxMaterialUI from "../CheckboxMaterialUI/CheckboxMaterialUI"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import useRules from "../../../hooks/useRules"

interface CatchOrderProps {
  title: string
  description: string
  price?: any
  extra?: any
  urlImage?: any
  itemData?: any
  onConfirm: (order: {
    Name: string
    Description: string
    Price: any
    extra: any[]
    Item_Image: any
  }) => Promise<void> // Función de callback asíncrona para retornar los datos
  labelorder?: any
  labelorderreset?: any
  colobuttonorder?: any
  colorbuttonreset?: any

}

interface CompaniesData {
  hojas: {
    Config: any[];
    staff: any[];
    Hoja1?: any;     // Opcional si existe
    Info?: any;      // Opcional si existe
    Promotion?: any; // Opcional si existe
    schedules?: any; // Opcional si existe
  };
}


const CatchOrder = (props: CatchOrderProps) => {
  const { title, description, price, extra, urlImage, onConfirm, colobuttonorder, colorbuttonreset, labelorder, labelorderreset } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({})
  const [isConfirming, setIsConfirming] = useState(false) // Estado para manejar la confirmación
  const [ruleUsed, setRuleUsed] = useState(false);
  
  // Usamos el tipo CompaniesData en el selector
  const companiesData = useSelector((state: RootState) => state.chExcelData.data as unknown as CompaniesData | undefined);
  
  // Proporcionamos valores por defecto seguros y tipados
  const { hojas } = companiesData || { hojas: { Config: [], staff: [] } };
  const { Config = [], staff = [] } = hojas;
  
  const { hasPermission } = useRules(Config, staff);
  console.log("🚀 ~ CatchOrder ~ hasPermission:", hasPermission)
  
  useEffect(() => {
    setRuleUsed(hasPermission);
  }, [hasPermission]);


  // Inicializar los extras seleccionados
  useEffect(() => {
    if (extra && isModalOpen) {
      // Solo inicializar si los extras no están ya configurados
      setSelectedExtras((prevState) => {
        // Si ya tenemos valores, mantenerlos
        if (Object.keys(prevState).length > 0) {
          return prevState
        }

        // Si no hay valores, inicializar
        const initialExtras = extra.reduce((acc: any, curr: any) => {
          acc[curr.name] = false
          return acc
        }, {})
        return initialExtras
      })
    }
  }, [extra, isModalOpen])

  // Reiniciar selecciones cuando se cierra el modal
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedExtras({})
    }
  }, [isModalOpen])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Función para manejar cambios en los checkboxes

  const handleCheckboxChange = (name: string, isChecked: boolean) => {
    console.log(`Checkbox ${name} changed to:`, isChecked)

    // Actualizar de forma más explícita para asegurar que el cambio persista
    const updatedExtras = {
      ...selectedExtras,
      [name]: isChecked,
    }
    console.log("Nuevo estado de extras:", updatedExtras)
    setSelectedExtras(updatedExtras)
  }

  // Función para obtener los extras seleccionados
  const getSelectedExtras = () => {
    return extra.filter((extras: any) => selectedExtras[extras.name])
  }

  // Función para reiniciar los checkboxes
  const handleReset = () => {
    const resetExtras = extra.reduce((acc: any, curr: any) => {
      acc[curr.name] = false
      return acc
    }, {})
    setSelectedExtras(resetExtras)
  }

  // Función para manejar la confirmación del pedido
  const handleConfirm = async () => {
    setIsConfirming(true) // Iniciar la confirmación
    const selectedExtrasData = getSelectedExtras()
    const order = {
      Name: title,
      Description: description,
      Price: price,
      extraGeneral: extra,
      extra: selectedExtrasData,
      Item_Image: urlImage,
    }

    try {
      await onConfirm(order) // Esperar a que la confirmación se complete
      handleCloseModal() // Cerrar el modal después de la confirmación
    } catch (error) {
      console.error("Error confirming order:", error)
    } finally {
      setIsConfirming(false) // Finalizar la confirmación
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "flex-end" }, // Centrado en móvil, derecha en desktop
          width: "100%", // Ocupa todo el ancho disponible
          p: 0, // Padding para dar espacio alrededor
        }}
      >
        {
          ruleUsed && (
            <Button
              variant="outlined"
              color={"inherit"}
              onClick={handleOpenModal}
              aria-label="Abrir modal de pedido"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                width: { xs: "100%", md: "auto" },
                maxWidth: { xs: "100%", md: "300px" },
              }}
            >
              Pedir
            </Button>

          )
        }

      </Box>

      <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Detalles del Pedido"
        actions={
          <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleCloseModal}
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleConfirm}
              disabled={isConfirming} // Deshabilitar el botón mientras se confirma
              sx={{ textTransform: "none", borderRadius: "8px", fontWeight: "bold" }}
            >
              {isConfirming ? "Confirmando..." : "Confirmar"}
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "200px",
                }}
              >
                <br />
                <Image
                  src={urlImage || "/placeholder.svg"}
                  alt="Logo"
                  width={200}
                  height={200}
                  style={{ width: "100%", height: "auto" }}
                />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mb: 2 }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              {description}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
              Precio: ${price}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: "12px",
                backgroundColor: "background.paper",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Selecciona tus extras
              </Typography>

              {extra?.map((extras: any) => (
                <Box key={extras.name} sx={{ mb: 1 }}>
                  <CheckboxMaterialUI
                    name={extras.name}
                    checked={Boolean(selectedExtras[extras.name])}
                    onChange={handleCheckboxChange}
                    label={`${extras.name} - $${extras.price}`}
                    color="primary"
                  />
                </Box>
              ))}

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleReset}
                  sx={{ textTransform: "none", borderRadius: "8px" }}
                >
                  Reiniciar Selección
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </ReusableModal>
    </div>
  )
}

export default CatchOrder

