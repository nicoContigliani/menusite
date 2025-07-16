// "use client"

// import { useState } from "react"
// import {
//   Modal,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   CircularProgress,
//   Alert,
//   useTheme,
//   useMediaQuery,
//   Divider,
// } from "@mui/material"
// import { motion, AnimatePresence } from "framer-motion"
// import { WhatsApp, Email, Close, Receipt } from "@mui/icons-material"
// import { sendWhatsAppMessageEmployees } from "@/services/whatsapp.services"

// interface ReceiptDeliveryModalProps {
//   open: boolean
//   onClose: () => void
//   order: any
// }

// const ReceiptDeliveryModal = ({ open, onClose, order }: ReceiptDeliveryModalProps) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const [phoneNumber, setPhoneNumber] = useState(order?.phone || "")
//   const [email, setEmail] = useState(order?.email || "")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [activeOption, setActiveOption] = useState<"whatsapp" | "email" | null>(null)

//   const handleSendWhatsApp = async () => {
//     if (!phoneNumber) {
//       setError("Por favor ingrese un número de teléfono válido")
//       return
//     }

//     setIsLoading(true)
//     setError(null)

//     try {
//       // Format phone number if needed (remove spaces, ensure it has country code)
//       const formattedPhone = phoneNumber.startsWith("+")
//         ? phoneNumber.replace(/\s+/g, "")
//         : `+${phoneNumber.replace(/\s+/g, "")}`

//       const result = sendWhatsAppMessageEmployees(order, formattedPhone)

//       if (result) {
//         setSuccess("Mensaje de WhatsApp enviado correctamente")
//         setTimeout(() => {
//           onClose()
//         }, 2000)
//       } else {
//         setError("Error al enviar el mensaje de WhatsApp")
//       }
//     } catch (err) {
//       console.error("Error sending WhatsApp:", err)
//       setError("Error al enviar el mensaje de WhatsApp")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSendEmail = async () => {
//     if (!email) {
//       setError("Por favor ingrese un correo electrónico válido")
//       return
//     }

//     setIsLoading(true)
//     setError(null)

//     try {
//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: order.fullname || "Cliente",
//           email: email,
//           message: `Recibo de orden #${order.id}:\n\n${JSON.stringify(order, null, 2)}`,
//         }),
//       })

//       if (response.ok) {
//         setSuccess("Correo electrónico enviado correctamente")
//         setTimeout(() => {
//           onClose()
//         }, 2000)
//       } else {
//         setError("Error al enviar el correo electrónico")
//       }
//     } catch (err) {
//       console.error("Error sending email:", err)
//       setError("Error al enviar el correo electrónico")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Calculate order total
//   const calculateOrderTotal = () => {
//     return (
//       order?.cart?.reduce((total: number, item: any) => {
//         const extrasTotal = item.extras?.reduce((sum: number, extra: any) => sum + extra.price, 0) || 0
//         return total + item.price * item.quantity + extrasTotal
//       }, 0) || 0
//     )
//   }

//   return (
//     <Modal open={open} onClose={isLoading ? undefined : onClose} closeAfterTransition>
//       <AnimatePresence>
//         {open && (
//           <Box
//             component={motion.div}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.2 }}
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               p: 2,
//               outline: "none",
//             }}
//           >
//             <Paper
//               component={motion.div}
//               layout
//               sx={{
//                 width: { xs: "100%", sm: "80%", md: "500px" },
//                 maxHeight: "90vh",
//                 overflow: "auto",
//                 p: 3,
//                 borderRadius: 2,
//                 mx: "auto",
//               }}
//             >
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
//                   <Receipt sx={{ mr: 1 }} />
//                   Enviar Recibo
//                 </Typography>
//                 <Button onClick={onClose} color="inherit" size="small" disabled={isLoading}>
//                   <Close />
//                 </Button>
//               </Box>

//               <Box mb={3}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Orden #{order?.id}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Cliente: {order?.fullname}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Total: ${calculateOrderTotal().toFixed(2)}
//                 </Typography>
//               </Box>

//               <Typography variant="body1" gutterBottom>
//                 ¿Cómo desea recibir su recibo?
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: isMobile ? "column" : "row",
//                   gap: 2,
//                   my: 3,
//                 }}
//               >
//                 <Button
//                   variant={activeOption === "whatsapp" ? "contained" : "outlined"}
//                   color="success"
//                   startIcon={<WhatsApp />}
//                   fullWidth
//                   onClick={() => setActiveOption("whatsapp")}
//                   disabled={isLoading}
//                 >
//                   WhatsApp
//                 </Button>

//                 <Button
//                   variant={activeOption === "email" ? "contained" : "outlined"}
//                   color="primary"
//                   startIcon={<Email />}
//                   fullWidth
//                   onClick={() => setActiveOption("email")}
//                   disabled={isLoading}
//                 >
//                   Correo
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   color="inherit"
//                   startIcon={<Close />}
//                   fullWidth
//                   onClick={onClose}
//                   disabled={isLoading}
//                 >
//                   Ninguno
//                 </Button>
//               </Box>

//               <AnimatePresence mode="wait">
//                 {activeOption === "whatsapp" && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Box sx={{ my: 2 }}>
//                       <TextField
//                         fullWidth
//                         label="Número de WhatsApp"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder="+1234567890"
//                         disabled={isLoading}
//                         helperText="Incluya el código de país (ej: +54)"
//                       />

//                       <Button
//                         variant="contained"
//                         color="success"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         onClick={handleSendWhatsApp}
//                         disabled={isLoading}
//                         startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <WhatsApp />}
//                       >
//                         Enviar por WhatsApp
//                       </Button>
//                     </Box>
//                   </motion.div>
//                 )}

//                 {activeOption === "email" && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Box sx={{ my: 2 }}>
//                       <TextField
//                         fullWidth
//                         label="Correo Electrónico"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="ejemplo@correo.com"
//                         disabled={isLoading}
//                       />

//                       <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         onClick={handleSendEmail}
//                         disabled={isLoading}
//                         startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Email />}
//                       >
//                         Enviar por Correo
//                       </Button>
//                     </Box>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {error && (
//                 <Alert severity="error" sx={{ mt: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               {success && (
//                 <Alert severity="success" sx={{ mt: 2 }}>
//                   {success}
//                 </Alert>
//               )}

//               <Divider sx={{ my: 2 }} />

//               <Typography variant="body2" color="text.secondary" align="center">
//                 Puede cerrar esta ventana si no desea enviar el recibo
//               </Typography>
//             </Paper>
//           </Box>
//         )}
//       </AnimatePresence>
//     </Modal>
//   )
// }

// export default ReceiptDeliveryModal



"use client"

import { useState, useEffect, useRef } from "react"
import {
  Modal,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { WhatsApp, Email, Close, Receipt, Download } from "@mui/icons-material"
import { sendWhatsAppMessageEmployees } from "@/services/whatsapp.services"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface ReceiptDeliveryModalProps {
  open: boolean
  onClose: () => void
  order: any
}

const ReceiptDeliveryModal = ({ open, onClose, order }: ReceiptDeliveryModalProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [phoneNumber, setPhoneNumber] = useState(order?.phone || "")
  const [email, setEmail] = useState(order?.email || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeOption, setActiveOption] = useState<"whatsapp" | "email" | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfRef = useRef<jsPDF | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

  // Generar PDF al cargar el componente
  useEffect(() => {
    if (order) {
      generatePDF()
    }
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl)
    }
  }, [order])

  const generatePDF = () => {
    const doc = new jsPDF()
    const { id, companiesName, fullname, phone, orderType, dataTypeOrder, status, timestamp, cart, comments, payment } = order

    // Header
    doc.setFontSize(20)
    doc.text("🍽️ " + (companiesName || "LlakaScript"), 105, 15, { align: "center" })
    doc.setFontSize(12)
    doc.text(`Orden #: ${id}`, 14, 25)
    doc.text(`Fecha: ${new Date(timestamp).toLocaleString()}`, 14, 32)
    doc.text(`Cliente: ${fullname}`, 14, 39)
    doc.text(`Teléfono: ${phone || "No disponible"}`, 14, 46)
    doc.text(`Tipo de orden: ${orderType} - ${dataTypeOrder}`, 14, 53)

    // Table Data
    const tableData = cart.map((item: any, idx: number) => {
      const extras = item.extras?.map((extra: any) => `${extra.name} ($${extra.price})`).join(", ") || "Ninguno"
      return [idx + 1, item.name, item.quantity, `$${item.price.toFixed(2)}`, extras, item.comments || "-"]
    })

    autoTable(doc, {
      startY: 70,
      head: [["#", "Producto", "Cantidad", "Precio", "Extras"]],
      body: tableData,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [63, 81, 181], halign: "center", textColor: 255 },
      theme: "grid",
    })

    let finalY = (doc as any).lastAutoTable.finalY + 10

    // Información de pago
    if (payment) {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text("Información de Pago:", 14, finalY)
      finalY += 7

      doc.setFontSize(10)
      doc.text(`Total: $${payment.total.toFixed(2)}`, 14, finalY)
      finalY += 5
      doc.text(`Pagado: $${payment.paid.toFixed(2)}`, 14, finalY)
      finalY += 10

      if (payment.methods && payment.methods.length > 0) {
        doc.setFontSize(12)
        doc.text("Métodos de Pago:", 14, finalY)
        finalY += 7

        doc.setFontSize(10)
        payment.methods.forEach((method: any) => {
          doc.text(`- ${method.method}: $${method.amount.toFixed(2)}`, 14, finalY)
          finalY += 5
        })
      }
    } else {
      // Total final si no hay información de pago
      const total = cart.reduce((sum: number, item: any) => {
        const extrasTotal = item.extras?.reduce((eSum: number, e: any) => eSum + e.price, 0) || 0
        return sum + item.price * item.quantity + extrasTotal
      }, 0)

      doc.setFontSize(13)
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "bold")
      doc.text(`Total: $${total.toFixed(2)}`, 14, finalY)
      doc.setFont("helvetica", "normal")
    }

    // Footer
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("Gracias por su pedido", 105, 285, { align: "center" })
    doc.text("LlakaScript - soporte@llakascript.com", 105, 290, { align: "center" })

    const blob = doc.output("blob")
    setPdfBlob(blob)
    const url = URL.createObjectURL(blob)
    pdfRef.current = doc
    setPdfUrl(url)
  }

  const handleSendWhatsApp = async () => {
    if (!phoneNumber) {
      setError("Por favor ingrese un número de teléfono válido")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Format phone number if needed (remove spaces, ensure it has country code)
      const formattedPhone = phoneNumber.startsWith("+")
        ? phoneNumber.replace(/\s+/g, "")
        : `+${phoneNumber.replace(/\s+/g, "")}`

      // Crear un enlace temporal para el PDF
      const pdfFileName = `orden-${order.id}.pdf`
      
      // Enviar mensaje con el PDF generado
      const result = sendWhatsAppMessageEmployees(order, formattedPhone, pdfUrl, pdfFileName)

      if (result) {
        setSuccess("Mensaje de WhatsApp enviado correctamente")
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError("Error al enviar el mensaje de WhatsApp")
      }
    } catch (err) {
      console.error("Error sending WhatsApp:", err)
      setError("Error al enviar el mensaje de WhatsApp")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!email) {
      setError("Por favor ingrese un correo electrónico válido")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Convertir el PDF a base64 para enviarlo por correo
      const reader = new FileReader()
      
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(",")[1] || ""
        
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: order.fullname || "Cliente",
            email: email,
            message: `Recibo de orden #${order.id}`,
            pdfBase64: base64data,
            pdfFileName: `orden-${order.id}.pdf`,
            orderDetails: JSON.stringify(order, null, 2)
          }),
        })

        if (response.ok) {
          setSuccess("Correo electrónico enviado correctamente")
          setTimeout(() => {
            onClose()
          }, 2000)
        } else {
          setError("Error al enviar el correo electrónico")
        }
        setIsLoading(false)
      }

      if (pdfBlob) {
        reader.readAsDataURL(pdfBlob)
      } else {
        setError("Error al generar el PDF")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Error sending email:", err)
      setError("Error al enviar el correo electrónico")
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      pdfRef.current.save(`orden-${order.id}.pdf`)
    }
  }

  return (
    <Modal open={open} onClose={isLoading ? undefined : onClose} closeAfterTransition>
      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              outline: "none",
            }}
          >
            <Paper
              component={motion.div}
              layout
              sx={{
                width: { xs: "100%", sm: "80%", md: "700px" },
                maxHeight: "90vh",
                overflow: "auto",
                p: 3,
                borderRadius: 2,
                mx: "auto",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
                  <Receipt sx={{ mr: 1 }} />
                  Enviar Recibo
                </Typography>
                <Button onClick={onClose} color="inherit" size="small" disabled={isLoading}>
                  <Close />
                </Button>
              </Box>

              {/* Vista previa del PDF */}
              <Box sx={{ border: "1px solid #ddd", height: "300px", mb: 3, borderRadius: 1, overflow: "hidden" }}>
                {pdfUrl ? (
                  <iframe src={pdfUrl} width="100%" height="100%" title="Vista previa PDF" />
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <CircularProgress size={40} />
                  </Box>
                )}
              </Box>

              <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Download />}
                  onClick={handleDownloadPDF}
                  disabled={!pdfUrl}
                >
                  Descargar PDF
                </Button>
              </Box>

              <Typography variant="body1" gutterBottom>
                ¿Cómo desea recibir su recibo?
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: 2,
                  my: 3,
                }}
              >
                <Button
                  variant={activeOption === "whatsapp" ? "contained" : "outlined"}
                  color="success"
                  startIcon={<WhatsApp />}
                  fullWidth
                  onClick={() => setActiveOption("whatsapp")}
                  disabled={isLoading}
                >
                  WhatsApp
                </Button>

                <Button
                  variant={activeOption === "email" ? "contained" : "outlined"}
                  color="primary"
                  startIcon={<Email />}
                  fullWidth
                  onClick={() => setActiveOption("email")}
                  disabled={isLoading}
                >
                  Correo
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<Close />}
                  fullWidth
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Ninguno
                </Button>
              </Box>

              <AnimatePresence mode="wait">
                {activeOption === "whatsapp" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box sx={{ my: 2 }}>
                      <TextField
                        fullWidth
                        label="Número de WhatsApp"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                        disabled={isLoading}
                        helperText="Incluya el código de país (ej: +54)"
                      />

                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSendWhatsApp}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <WhatsApp />}
                      >
                        Enviar por WhatsApp
                      </Button>
                    </Box>
                  </motion.div>
                )}

                {activeOption === "email" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box sx={{ my: 2 }}>
                      <TextField
                        fullWidth
                        label="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        disabled={isLoading}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSendEmail}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Email />}
                      >
                        Enviar por Correo
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {success}
                </Alert>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" align="center">
                Puede cerrar esta ventana si no desea enviar el recibo
              </Typography>
            </Paper>
          </Box>
        )}
      </AnimatePresence>
    </Modal>
  )
}

export default ReceiptDeliveryModal