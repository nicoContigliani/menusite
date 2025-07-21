"use client"
import react, { Fragment } from 'react'
import { NextPage } from 'next';
import Head from 'next/head';
import { 
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Paper,
  useTheme,
  Link,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert
} from '@mui/material';
import {
  LocalPharmacy as PharmacyIcon,
  MedicalServices as MedicalIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Animaciones (reutilizadas del archivo principal)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const AskForHelp: NextPage = () => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Solicitar Ayuda | BancoMed</title>
        <meta name="description" content="Solicita medicamentos que necesites" />
      </Head>

      {/* Minimal Header */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link href="/" underline="none" color="inherit">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PharmacyIcon color="primary" />
                  <Typography variant="h6" fontWeight="500">BancoMed</Typography>
                </Stack>
              </Link>
            </Stack>
            <Link 
              href="/" 
              color="text.primary" 
              underline="none" 
              component={motion.a} 
              whileHover={{ color: theme.palette.primary.main }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <BackIcon fontSize="small" sx={{ mr: 0.5 }} />
              Volver al inicio
            </Link>
          </Stack>
        </motion.div>
      </Container>

      {/* Main Form Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight="400" 
              gutterBottom
              sx={{ 
                letterSpacing: '-0.5px',
                lineHeight: 1.2
              }}
            >
              Solicitar <Box component="span" color="primary.main">medicamentos</Box>
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Completa el formulario para solicitar los medicamentos que necesites. 
              Nos pondremos en contacto contigo para verificar la información.
            </Typography>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 4 }, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}>
              <motion.div variants={staggerContainer}>
                <Grid container spacing={3}>
                  {/* Personal Information */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Typography variant="h6" gutterBottom>
                        Información personal
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Nombre completo"
                        variant="outlined"
                        required
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="DNI"
                        variant="outlined"
                        required
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        variant="outlined"
                        required
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Dirección"
                        variant="outlined"
                        required
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Ciudad"
                        variant="outlined"
                        required
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Provincia"
                        variant="outlined"
                        required
                      />
                    </motion.div>
                  </Grid>

                  {/* Medication Information */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Typography variant="h6" gutterBottom>
                        Medicamentos necesarios
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Por favor, indica el nombre comercial o principio activo, dosis y cantidad requerida.
                      </Alert>
                    </motion.div>
                  </Grid>

                  {[1, 2, 3].map((item) => (
                    <Fragment key={item}>
                      <Grid item xs={12} md={6}>
                        <motion.div variants={fadeInUp}>
                          <TextField
                            fullWidth
                            label={`Medicamento ${item}`}
                            variant="outlined"
                            placeholder="Ej: Paracetamol 500mg"
                          />
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <motion.div variants={fadeInUp}>
                          <TextField
                            fullWidth
                            label={`Cantidad ${item}`}
                            variant="outlined"
                            placeholder="Ej: 20 comprimidos"
                          />
                        </motion.div>
                      </Grid>
                    </Fragment>
                  ))}

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Información adicional"
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Indica cualquier información relevante sobre tu condición médica o necesidades especiales"
                      />
                    </motion.div>
                  </Grid>

                  {/* Health Information */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Typography variant="h6" gutterBottom>
                        Información de salud
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <FormControl fullWidth>
                        <InputLabel>¿Tienes cobertura médica?</InputLabel>
                        <Select label="¿Tienes cobertura médica?">
                          <MenuItem value="si">Sí</MenuItem>
                          <MenuItem value="no">No</MenuItem>
                          <MenuItem value="parcial">Parcial</MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Nombre de la obra social (si aplica)"
                        variant="outlined"
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Acepto compartir mi información médica relevante con profesionales de BancoMed para evaluar mi solicitud"
                      />
                    </motion.div>
                  </Grid>

                  {/* Submit Section */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Divider sx={{ my: 3 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button 
                          variant="outlined" 
                          size="large"
                          sx={{ px: 4 }}
                          component={motion.button}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Limpiar
                        </Button>
                        <Button 
                          variant="contained" 
                          size="large"
                          sx={{ px: 4 }}
                          component={motion.button}
                          whileHover={{ scale: 1.02, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Enviar solicitud
                        </Button>
                      </Stack>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider', mt: 6 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInUp}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PharmacyIcon color="primary" />
                    <Typography variant="h6">BancoMed</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Iniciativa sin fines de lucro
                  </Typography>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInUp}>
                  <Typography variant="subtitle1" gutterBottom>Contacto</Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body2">contacto@bancomed.org</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">+54 11 2345-6789</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationIcon fontSize="small" color="action" />
                      <Typography variant="body2">Buenos Aires, Argentina</Typography>
                    </Stack>
                  </Stack>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInUp}>
                  <Typography variant="subtitle1" gutterBottom>Legal</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registro ONG N° 123456
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    © {new Date().getFullYear()} BancoMed
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default AskForHelp;