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
  Alert,
  Chip
} from '@mui/material';
import {
  LocalPharmacy as PharmacyIcon,
  VolunteerActivism as DonationIcon,
  MedicalServices as MedicalIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ArrowBack as BackIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

// Animaciones
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

const Donate: NextPage = () => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Donar Medicamentos | BancoMed</title>
        <meta name="description" content="Contribuye donando medicamentos para quienes más los necesitan" />
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

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <DonationIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          </motion.div>
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
              <Box component="span" color="primary.main">Dona medicamentos</Box>, salva vidas
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto" mb={4}>
              Tu contribución puede marcar la diferencia para personas que no pueden acceder a sus tratamientos
            </Typography>
          </motion.div>
        </motion.div>
      </Container>

      {/* Donation Form Section */}
      <Container maxWidth="md" sx={{ py: 2 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={scaleIn}>
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 4 }, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 6
            }}>
              <motion.div variants={staggerContainer}>
                <Grid container spacing={3}>
                  {/* Donor Information */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Typography variant="h6" gutterBottom>
                        Información del donante
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
                        label="Tipo de donante"
                        variant="outlined"
                        select
                        defaultValue="particular"
                        required
                      >
                        <MenuItem value="particular">Particular</MenuItem>
                        <MenuItem value="farmacia">Farmacia</MenuItem>
                        <MenuItem value="laboratorio">Laboratorio</MenuItem>
                        <MenuItem value="institucion">Institución</MenuItem>
                      </TextField>
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

                  {/* Medication Information */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Typography variant="h6" gutterBottom>
                        Medicamentos a donar
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          Por favor, revisa nuestros <Link href="#" color="inherit" fontWeight="500">requisitos de donación</Link> antes de continuar.
                        </Typography>
                      </Alert>
                    </motion.div>
                  </Grid>

                  {[1, 2, 3].map((item) => (
                    <Fragment key={item}>
                      <Grid item xs={12} md={5}>
                        <motion.div variants={fadeInUp}>
                          <TextField
                            fullWidth
                            label={`Nombre del medicamento ${item}`}
                            variant="outlined"
                            placeholder="Ej: Paracetamol 500mg"
                          />
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <motion.div variants={fadeInUp}>
                          <TextField
                            fullWidth
                            label={`Cantidad ${item}`}
                            variant="outlined"
                            placeholder="Ej: 20 comprimidos"
                          />
                        </motion.div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <motion.div variants={fadeInUp}>
                          <TextField
                            fullWidth
                            label={`Fecha de vencimiento ${item}`}
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <CalendarIcon color="action" sx={{ mr: 1 }} />
                              ),
                            }}
                            placeholder="MM/AAAA"
                          />
                        </motion.div>
                      </Grid>
                    </Fragment>
                  ))}

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <FormControlLabel
                        control={<Checkbox required />}
                        label="Certifico que los medicamentos están en su envase original, sin abrir y con al menos 6 meses de validez"
                      />
                    </motion.div>
                  </Grid>

                  {/* Donation Options */}
                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <Typography variant="h6" gutterBottom>
                        Opciones de donación
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <FormControl fullWidth>
                        <InputLabel>Forma de entrega</InputLabel>
                        <Select label="Forma de entrega" defaultValue="retiro">
                          <MenuItem value="retiro">Retiro en domicilio</MenuItem>
                          <MenuItem value="entrega">Entrega en punto de recolección</MenuItem>
                        </Select>
                      </FormControl>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Ubicación"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <LocationIcon color="action" sx={{ mr: 1 }} />
                          ),
                        }}
                        placeholder="Ciudad, provincia"
                      />
                    </motion.div>
                  </Grid>

                  <Grid item xs={12}>
                    <motion.div variants={fadeInUp}>
                      <TextField
                        fullWidth
                        label="Comentarios adicionales"
                        variant="outlined"
                        multiline
                        rows={3}
                        placeholder="Indica cualquier información relevante sobre la donación"
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
                          Enviar donación
                        </Button>
                      </Stack>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Paper>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={staggerContainer}>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    height: '100%'
                  }}>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <HospitalIcon color="primary" fontSize="large" />
                      <Typography variant="h6">Puntos de recepción</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Contamos con centros de recepción en las principales ciudades del país.
                    </Typography>
                    <Button 
                      variant="text" 
                      color="primary"
                      size="small"
                      component={motion.a}
                      whileHover={{ x: 5 }}
                    >
                      Ver ubicaciones disponibles
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div variants={fadeInUp}>
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    height: '100%'
                  }}>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <MedicalIcon color="primary" fontSize="large" />
                      <Typography variant="h6">Medicamentos aceptados</Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                      <Chip label="Analgésicos" size="small" />
                      <Chip label="Antibióticos" size="small" />
                      <Chip label="Antihipertensivos" size="small" />
                      <Chip label="Antidiabéticos" size="small" />
                      <Chip label="Antiinflamatorios" size="small" />
                    </Stack>
                    <Button 
                      variant="text" 
                      color="primary"
                      size="small"
                      component={motion.a}
                      whileHover={{ x: 5 }}
                    >
                      Ver lista completa
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider', mt: 8 }}>
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

export default Donate;