// // // import { NextPage } from 'next';
// // // import Head from 'next/head';
// // // import { 
// // //   Box,
// // //   Button,
// // //   Container,
// // //   Grid,
// // //   Typography,
// // //   Stack,
// // //   Divider,
// // //   Paper,
// // //   useTheme,
// // //   Link
// // // } from '@mui/material';
// // // import {
// // //   LocalPharmacy as PharmacyIcon,
// // //   VolunteerActivism as DonationIcon,
// // //   MedicalServices as MedicalIcon,
// // //   Groups as GroupsIcon,
// // //   Email as EmailIcon,
// // //   Phone as PhoneIcon,
// // //   LocationOn as LocationIcon
// // // } from '@mui/icons-material';

// // // const Home: NextPage = () => {
// // //   const theme = useTheme();

// // //   return (
// // //     <>
// // //       <Head>
// // //         <title>BancoMed | Donación Solidaria de Medicamentos</title>
// // //         <meta name="description" content="Conectamos donantes con personas que necesitan medicamentos" />
// // //       </Head>

// // //       {/* Minimal Header */}
// // //       <Container maxWidth="lg" sx={{ py: 3 }}>
// // //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// // //           <Stack direction="row" alignItems="center" spacing={1}>
// // //             <PharmacyIcon color="primary" />
// // //             <Typography variant="h6" fontWeight="500">BancoMed</Typography>
// // //           </Stack>
// // //           <Stack direction="row" spacing={3} display={{ xs: 'none', md: 'flex' }}>
// // //             <Link href="#mision" color="text.primary" underline="none">Misión</Link>
// // //             <Link href="#como-ayudar" color="text.primary" underline="none">Contribuir</Link>
// // //             <Link href="#contacto" color="text.primary" underline="none">Contacto</Link>
// // //           </Stack>
// // //         </Stack>
// // //       </Container>

// // //       {/* Hero Section */}
// // //       <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
// // //         <Typography 
// // //           variant="h3" 
// // //           component="h1" 
// // //           fontWeight="400" 
// // //           gutterBottom
// // //           sx={{ 
// // //             letterSpacing: '-0.5px',
// // //             lineHeight: 1.2
// // //           }}
// // //         >
// // //           Medicamentos para <Box component="span" color="primary.main">quienes más necesitan</Box>
// // //         </Typography>

// // //         <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto" mb={4}>
// // //           Facilitamos la donación responsable de medicamentos a comunidades vulnerables
// // //         </Typography>

// // //         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
// // //           <Button 
// // //             variant="contained" 
// // //             size="large"
// // //             href="#como-ayudar"
// // //             sx={{ px: 4 }}
// // //           >
// // //             Donar ahora
// // //           </Button>
// // //           <Button 
// // //             variant="outlined" 
// // //             size="large"
// // //             href="#contacto"
// // //             sx={{ px: 4 }}
// // //           >
// // //             Solicitar ayuda
// // //           </Button>
// // //         </Stack>
// // //       </Container>

// // //       {/* Impact Section */}
// // //       <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
// // //         <Container maxWidth="lg">
// // //           <Divider sx={{ mb: 8 }} />
// // //           <Grid container spacing={4}>
// // //             <Grid item xs={12} md={4}>
// // //               <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
// // //                 Nuestro impacto
// // //               </Typography>
// // //               <Typography variant="body1" color="text.secondary">
// // //                 Desde 2023, hemos facilitado la distribución de medicamentos esenciales
// // //               </Typography>
// // //             </Grid>
// // //             <Grid item xs={12} md={8}>
// // //               <Grid container spacing={4}>
// // //                 <StatItem value="1,200+" label="Personas beneficiadas" />
// // //                 <StatItem value="5,000+" label="Medicamentos entregados" />
// // //                 <StatItem value="100%" label="Sin costo alguno" />
// // //                 <StatItem value="50+" label="Donantes activos" />
// // //               </Grid>
// // //             </Grid>
// // //           </Grid>
// // //           <Divider sx={{ mt: 8 }} />
// // //         </Container>
// // //       </Box>

// // //       {/* Mission Section */}
// // //       <Box id="mision" sx={{ py: 10 }}>
// // //         <Container maxWidth="md">
// // //           <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
// // //             Nuestra misión
// // //           </Typography>
// // //           <Typography variant="body1" textAlign="center" color="text.secondary" maxWidth="md" mx="auto" mb={6}>
// // //             Creemos en el acceso universal a medicamentos esenciales como derecho fundamental
// // //           </Typography>

// // //           <Paper elevation={0} sx={{ 
// // //             p: 4, 
// // //             border: '1px solid',
// // //             borderColor: 'divider',
// // //             borderRadius: 1
// // //           }}>
// // //             <Typography paragraph>
// // //               BancoMed es una iniciativa sin fines de lucro que conecta donaciones de medicamentos en buen estado con personas que no pueden acceder a sus tratamientos.
// // //             </Typography>
// // //             <Typography paragraph>
// // //               Trabajamos con profesionales de la salud para garantizar que todas las donaciones cumplan con los estándares requeridos.
// // //             </Typography>
// // //           </Paper>
// // //         </Container>
// // //       </Box>

// // //       {/* How to Help */}
// // //       <Box id="como-ayudar" sx={{ py: 10, bgcolor: 'background.paper' }}>
// // //         <Container maxWidth="lg">
// // //           <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
// // //             Cómo contribuir
// // //           </Typography>

// // //           <Grid container spacing={4} mt={6}>
// // //             <ContributionMethod 
// // //               icon={<DonationIcon fontSize="large" color="primary" />}
// // //               title="Donar medicamentos"
// // //               description="Aceptamos medicamentos no vencidos, en su empaque original"
// // //             />
// // //             <ContributionMethod 
// // //               icon={<MedicalIcon fontSize="large" color="primary" />}
// // //               title="Donar insumos"
// // //               description="Jeringas, tiras reactivas y otros suministros médicos"
// // //             />
// // //             <ContributionMethod 
// // //               icon={<GroupsIcon fontSize="large" color="primary" />}
// // //               title="Difundir"
// // //               description="Comparte nuestra iniciativa con posibles donantes"
// // //             />
// // //           </Grid>
// // //         </Container>
// // //       </Box>

// // //       {/* CTA Section */}
// // //       <Box sx={{ py: 10 }}>
// // //         <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
// // //           <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
// // //             Cada medicamento cuenta
// // //           </Typography>
// // //           <Typography variant="body1" color="text.secondary" mb={4}>
// // //             Tu contribución puede hacer la diferencia en la vida de alguien
// // //           </Typography>
// // //           <Button 
// // //             variant="contained" 
// // //             size="large"
// // //             href="#contacto"
// // //             sx={{ px: 6 }}
// // //           >
// // //             Contactar para donar
// // //           </Button>
// // //         </Container>
// // //       </Box>

// // //       {/* Footer */}
// // //       <Box id="contacto" sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
// // //         <Container maxWidth="lg">
// // //           <Grid container spacing={4}>
// // //             <Grid item xs={12} md={4}>
// // //               <Stack direction="row" alignItems="center" spacing={1}>
// // //                 <PharmacyIcon color="primary" />
// // //                 <Typography variant="h6">BancoMed</Typography>
// // //               </Stack>
// // //               <Typography variant="body2" color="text.secondary" mt={1}>
// // //                 Iniciativa sin fines de lucro
// // //               </Typography>
// // //             </Grid>

// // //             <Grid item xs={12} md={4}>
// // //               <Typography variant="subtitle1" gutterBottom>Contacto</Typography>
// // //               <Stack spacing={1}>
// // //                 <Stack direction="row" alignItems="center" spacing={1}>
// // //                   <EmailIcon fontSize="small" color="action" />
// // //                   <Typography variant="body2">contacto@bancomed.org</Typography>
// // //                 </Stack>
// // //                 <Stack direction="row" alignItems="center" spacing={1}>
// // //                   <PhoneIcon fontSize="small" color="action" />
// // //                   <Typography variant="body2">+54 11 2345-6789</Typography>
// // //                 </Stack>
// // //                 <Stack direction="row" alignItems="center" spacing={1}>
// // //                   <LocationIcon fontSize="small" color="action" />
// // //                   <Typography variant="body2">Buenos Aires, Argentina</Typography>
// // //                 </Stack>
// // //               </Stack>
// // //             </Grid>

// // //             <Grid item xs={12} md={4}>
// // //               <Typography variant="subtitle1" gutterBottom>Legal</Typography>
// // //               <Typography variant="body2" color="text.secondary">
// // //                 Registro ONG N° 123456
// // //               </Typography>
// // //               <Typography variant="body2" color="text.secondary" mt={2}>
// // //                 © {new Date().getFullYear()} BancoMed
// // //               </Typography>
// // //             </Grid>
// // //           </Grid>
// // //         </Container>
// // //       </Box>
// // //     </>
// // //   );
// // // };

// // // // Componentes auxiliares
// // // const StatItem = ({ value, label }: { value: string, label: string }) => (
// // //   <Grid item xs={12} sm={6}>
// // //     <Box>
// // //       <Typography variant="h4" component="div" fontWeight="400" gutterBottom>
// // //         {value}
// // //       </Typography>
// // //       <Typography variant="body2" color="text.secondary">
// // //         {label}
// // //       </Typography>
// // //     </Box>
// // //   </Grid>
// // // );

// // // const ContributionMethod = ({ icon, title, description }: { 
// // //   icon: React.ReactNode, 
// // //   title: string, 
// // //   description: string 
// // // }) => (
// // //   <Grid item xs={12} md={4}>
// // //     <Box sx={{ textAlign: 'center', height: '100%' }}>
// // //       <Box sx={{ mb: 2 }}>{icon}</Box>
// // //       <Typography variant="h6" component="h3" gutterBottom fontWeight="400">
// // //         {title}
// // //       </Typography>
// // //       <Typography variant="body2" color="text.secondary">
// // //         {description}
// // //       </Typography>
// // //     </Box>
// // //   </Grid>
// // // );

// // // export default Home;


// // import { NextPage } from 'next';
// // import Head from 'next/head';
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Grid,
// //   Typography,
// //   Stack,
// //   Divider,
// //   Paper,
// //   useTheme,
// //   Link
// // } from '@mui/material';
// // import {
// //   LocalPharmacy as PharmacyIcon,
// //   VolunteerActivism as DonationIcon,
// //   MedicalServices as MedicalIcon,
// //   Groups as GroupsIcon,
// //   Email as EmailIcon,
// //   Phone as PhoneIcon,
// //   LocationOn as LocationIcon
// // } from '@mui/icons-material';
// // import { motion, AnimatePresence } from 'framer-motion';

// // // Animaciones
// // const fadeInUp = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0 }
// // };

// // const staggerContainer = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.1
// //     }
// //   }
// // };

// // const scaleIn = {
// //   hidden: { opacity: 0, scale: 0.9 },
// //   visible: { opacity: 1, scale: 1 }
// // };

// // const Home: NextPage = () => {
// //   const theme = useTheme();

// //   return (
// //     <>
// //       <Head>
// //         <title>BancoMed | Donación Solidaria de Medicamentos</title>
// //         <meta name="description" content="Conectamos donantes con personas que necesitan medicamentos" />
// //       </Head>

// //       {/* Minimal Header */}
// //       <Container maxWidth="lg" sx={{ py: 3 }}>
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <Stack direction="row" justifyContent="space-between" alignItems="center">
// //             <Stack direction="row" alignItems="center" spacing={1}>
// //               <PharmacyIcon color="primary" />
// //               <Typography variant="h6" fontWeight="500">BancoMed</Typography>
// //             </Stack>
// //             <Stack direction="row" spacing={3} display={{ xs: 'none', md: 'flex' }}>
// //               <Link href="#mision" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
// //                 Misión
// //               </Link>
// //               <Link href="#como-ayudar" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
// //                 Contribuir
// //               </Link>
// //               <Link href="#contacto" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
// //                 Contacto
// //               </Link>
// //               <button> hola </button>

// //             </Stack>
// //           </Stack>
// //         </motion.div>
// //       </Container>

// //       {/* Hero Section */}
// //       <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
// //         <motion.div
// //           initial="hidden"
// //           animate="visible"
// //           variants={staggerContainer}
// //         >
// //           <motion.div variants={fadeInUp}>
// //             <Typography
// //               variant="h3"
// //               component="h1"
// //               fontWeight="400"
// //               gutterBottom
// //               sx={{
// //                 letterSpacing: '-0.5px',
// //                 lineHeight: 1.2
// //               }}
// //             >
// //               Medicamentos para <Box component="span" color="primary.main">quienes más necesitan</Box>
// //             </Typography>
// //           </motion.div>

// //           <motion.div variants={fadeInUp}>
// //             <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto" mb={4}>
// //               Facilitamos la donación responsable de medicamentos a comunidades vulnerables
// //             </Typography>
// //           </motion.div>

   
// //           <motion.div variants={fadeInUp}>
// //             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
// //               <Button
// //                 variant="contained"
// //                 size="large"
// //                 // href="#como-ayudar"
// //                 href="/medicinebank/donate"
// //                 sx={{ px: 4 }}
// //                 component={motion.a}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 Donar ahora
// //               </Button>
// //               <Button
// //                 variant="outlined"
// //                 size="large"
// //                 href="/medicinebank/askforhelp"
// //                 sx={{ px: 4 }}
// //                 component={motion.a}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 Solicitar ayuda
// //               </Button>
// //             </Stack>
// //           </motion.div>
// //         </motion.div>
// //       </Container>

// //       {/* Impact Section */}
// //       <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
// //         <Container maxWidth="lg">
// //           <Divider sx={{ mb: 8 }} />
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={staggerContainer}
// //           >
// //             <Grid container spacing={4}>
// //               <Grid item xs={12} md={4}>
// //                 <motion.div variants={fadeInUp}>
// //                   <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
// //                     Nuestro impacto
// //                   </Typography>
// //                   <Typography variant="body1" color="text.secondary">
// //                     Desde 2023, hemos facilitado la distribución de medicamentos esenciales
// //                   </Typography>
// //                 </motion.div>
// //               </Grid>
// //               <Grid item xs={12} md={8}>
// //                 <motion.div variants={staggerContainer}>
// //                   <Grid container spacing={4}>
// //                     <StatItem value="1,200+" label="Personas beneficiadas" />
// //                     <StatItem value="5,000+" label="Medicamentos entregados" />
// //                     <StatItem value="100%" label="Sin costo alguno" />
// //                     <StatItem value="50+" label="Donantes activos" />
// //                   </Grid>
// //                 </motion.div>
// //               </Grid>
// //             </Grid>
// //           </motion.div>
// //           <Divider sx={{ mt: 8 }} />
// //         </Container>
// //       </Box>

// //       {/* Mission Section */}
// //       <Box id="mision" sx={{ py: 10 }}>
// //         <Container maxWidth="md">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={staggerContainer}
// //           >
// //             <motion.div variants={fadeInUp}>
// //               <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
// //                 Nuestra misión
// //               </Typography>
// //             </motion.div>
// //             <motion.div variants={fadeInUp}>
// //               <Typography variant="body1" textAlign="center" color="text.secondary" maxWidth="md" mx="auto" mb={6}>
// //                 Creemos en el acceso universal a medicamentos esenciales como derecho fundamental
// //               </Typography>
// //             </motion.div>

// //             <motion.div variants={scaleIn} whileHover={{ scale: 1.01 }}>
// //               <Paper elevation={0} sx={{
// //                 p: 4,
// //                 border: '1px solid',
// //                 borderColor: 'divider',
// //                 borderRadius: 1
// //               }}>
// //                 <Typography paragraph>
// //                   BancoMed es una iniciativa sin fines de lucro que conecta donaciones de medicamentos en buen estado con personas que no pueden acceder a sus tratamientos.
// //                 </Typography>
// //                 <Typography paragraph>
// //                   Trabajamos con profesionales de la salud para garantizar que todas las donaciones cumplan con los estándares requeridos.
// //                 </Typography>
// //               </Paper>
// //             </motion.div>
// //           </motion.div>
// //         </Container>
// //       </Box>

// //       {/* How to Help */}
// //       <Box id="como-ayudar" sx={{ py: 10, bgcolor: 'background.paper' }}>
// //         <Container maxWidth="lg">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={staggerContainer}
// //           >
// //             <motion.div variants={fadeInUp}>
// //               <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
// //                 Cómo contribuir
// //               </Typography>
// //             </motion.div>

// //             <motion.div variants={staggerContainer}>
// //               <Grid container spacing={4} mt={6}>
// //                 <ContributionMethod
// //                   icon={<DonationIcon fontSize="large" color="primary" />}
// //                   title="Donar medicamentos"
// //                   description="Aceptamos medicamentos no vencidos, en su empaque original"
// //                 />
// //                 <ContributionMethod
// //                   icon={<MedicalIcon fontSize="large" color="primary" />}
// //                   title="Donar insumos"
// //                   description="Jeringas, tiras reactivas y otros suministros médicos"
// //                 />
// //                 <ContributionMethod
// //                   icon={<GroupsIcon fontSize="large" color="primary" />}
// //                   title="Difundir"
// //                   description="Comparte nuestra iniciativa con posibles donantes"
// //                 />
// //               </Grid>
// //             </motion.div>
// //           </motion.div>
// //         </Container>
// //       </Box>

// //       {/* CTA Section */}
// //       <Box sx={{ py: 10 }}>
// //         <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={staggerContainer}
// //           >
// //             <motion.div variants={fadeInUp}>
// //               <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
// //                 Cada medicamento cuenta
// //               </Typography>
// //             </motion.div>
// //             <motion.div variants={fadeInUp}>
// //               <Typography variant="body1" color="text.secondary" mb={4}>
// //                 Tu contribución puede hacer la diferencia en la vida de alguien
// //               </Typography>
// //             </motion.div>
// //             <motion.div variants={fadeInUp}>
// //               <Button
// //                 variant="contained"
// //                 size="large"
// //                 href="#contacto"
// //                 sx={{ px: 6 }}
// //                 component={motion.a}
// //                 whileHover={{ scale: 1.05, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
// //                 whileTap={{ scale: 0.98 }}
// //               >
// //                 Contactar para donar
// //               </Button>
// //             </motion.div>
// //           </motion.div>
// //         </Container>
// //       </Box>

// //       {/* Footer */}
// //       <Box id="contacto" sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
// //         <Container maxWidth="lg">
// //           <motion.div
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true }}
// //             variants={staggerContainer}
// //           >
// //             <Grid container spacing={4}>
// //               <Grid item xs={12} md={4}>
// //                 <motion.div variants={fadeInUp}>
// //                   <Stack direction="row" alignItems="center" spacing={1}>
// //                     <PharmacyIcon color="primary" />
// //                     <Typography variant="h6">BancoMed</Typography>
// //                   </Stack>
// //                   <Typography variant="body2" color="text.secondary" mt={1}>
// //                     Iniciativa sin fines de lucro
// //                   </Typography>
// //                 </motion.div>
// //               </Grid>

// //               <Grid item xs={12} md={4}>
// //                 <motion.div variants={fadeInUp}>
// //                   <Typography variant="subtitle1" gutterBottom>Contacto</Typography>
// //                   <Stack spacing={1}>
// //                     <Stack direction="row" alignItems="center" spacing={1}>
// //                       <EmailIcon fontSize="small" color="action" />
// //                       <Typography variant="body2">contacto@bancomed.org</Typography>
// //                     </Stack>
// //                     <Stack direction="row" alignItems="center" spacing={1}>
// //                       <PhoneIcon fontSize="small" color="action" />
// //                       <Typography variant="body2">+54 11 2345-6789</Typography>
// //                     </Stack>
// //                     <Stack direction="row" alignItems="center" spacing={1}>
// //                       <LocationIcon fontSize="small" color="action" />
// //                       <Typography variant="body2">Buenos Aires, Argentina</Typography>
// //                     </Stack>
// //                   </Stack>
// //                 </motion.div>
// //               </Grid>

// //               <Grid item xs={12} md={4}>
// //                 <motion.div variants={fadeInUp}>
// //                   <Typography variant="subtitle1" gutterBottom>Legal</Typography>
// //                   <Typography variant="body2" color="text.secondary">
// //                     Registro ONG N° 123456
// //                   </Typography>
// //                   <Typography variant="body2" color="text.secondary" mt={2}>
// //                     © {new Date().getFullYear()} BancoMed
// //                   </Typography>
// //                 </motion.div>
// //               </Grid>
// //             </Grid>
// //           </motion.div>
// //         </Container>
// //       </Box>
// //     </>
// //   );
// // };

// // // Componentes auxiliares con animaciones
// // const StatItem = ({ value, label }: { value: string, label: string }) => (
// //   <Grid item xs={12} sm={6}>
// //     <motion.div
// //       variants={fadeInUp}
// //       whileHover={{ y: -5 }}
// //     >
// //       <Box>
// //         <Typography variant="h4" component="div" fontWeight="400" gutterBottom>
// //           {value}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           {label}
// //         </Typography>
// //       </Box>
// //     </motion.div>
// //   </Grid>
// // );

// // const ContributionMethod = ({ icon, title, description }: {
// //   icon: React.ReactNode,
// //   title: string,
// //   description: string
// // }) => (
// //   <Grid item xs={12} md={4}>
// //     <motion.div
// //       variants={scaleIn}
// //       whileHover={{ y: -5 }}
// //       style={{ height: '100%' }}
// //     >
// //       <Box sx={{ textAlign: 'center', height: '100%', p: 3 }}>
// //         <motion.div
// //           whileHover={{ scale: 1.1 }}
// //           style={{ display: 'inline-block', marginBottom: '16px' }}
// //         >
// //           {icon}
// //         </motion.div>
// //         <Typography variant="h6" component="h3" gutterBottom fontWeight="400">
// //           {title}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           {description}
// //         </Typography>
// //       </Box>
// //     </motion.div>
// //   </Grid>
// // );

// // export default Home;




// import { NextPage } from 'next';
// import Head from 'next/head';
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Typography,
//   Stack,
//   Divider,
//   Paper,
//   useTheme,
//   Link,
//   Modal,
//   TextField,
//   IconButton,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions
// } from '@mui/material';
// import {
//   LocalPharmacy as PharmacyIcon,
//   VolunteerActivism as DonationIcon,
//   MedicalServices as MedicalIcon,
//   Groups as GroupsIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationIcon,
//   Close as CloseIcon,
//   Person as PersonIcon,
//   VpnKey as KeyIcon,
//   CheckCircle as CheckCircleIcon
// } from '@mui/icons-material';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';

// // Animaciones
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1 }
// };

// const Home: NextPage = () => {
//   const theme = useTheme();
//   const [authModalOpen, setAuthModalOpen] = useState(false);
//   const [isLoginView, setIsLoginView] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verificationModalOpen, setVerificationModalOpen] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleAuthModalOpen = () => {
//     setAuthModalOpen(true);
//     setError('');
//   };

//   const handleAuthModalClose = () => {
//     setAuthModalOpen(false);
//     setEmail('');
//     setPassword('');
//     setName('');
//     setError('');
//   };

//   const handleVerificationModalClose = () => {
//     setVerificationModalOpen(false);
//     setVerificationCode('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (isLoginView) {
//         // Login logic
//         console.log('Logging in with:', email, password);
//         // On successful login:
//         setAuthModalOpen(false);
//       } else {
//         // Register logic
//         console.log('Registering:', name, email, password);
//         // Simulate sending verification code
//         setVerificationModalOpen(true);
//       }
//     } catch (err) {
//       setError(isLoginView ? 'Error al iniciar sesión' : 'Error al registrarse');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     setIsVerifying(true);
//     try {
//       // Simulate verification
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       if (verificationCode === '123456') { // Demo code
//         setIsVerified(true);
//         setTimeout(() => {
//           setVerificationModalOpen(false);
//           setAuthModalOpen(false);
//           setIsVerified(false);
//         }, 2000);
//       } else {
//         setError('Código incorrecto. Intente nuevamente.');
//       }
//     } catch (err) {
//       setError('Error al verificar el código');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleActionButtonClick = (path: string) => {
//     if (isVerified) {
//       window.location.href = path;
//     } else {
//       handleAuthModalOpen();
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>BancoMed | Donación Solidaria de Medicamentos</title>
//         <meta name="description" content="Conectamos donantes con personas que necesitan medicamentos" />
//       </Head>

//       {/* Minimal Header */}
//       <Container maxWidth="lg" sx={{ py: 3 }}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <PharmacyIcon color="primary" />
//               <Typography variant="h6" fontWeight="500">BancoMed</Typography>
//             </Stack>
//             <Stack direction="row" spacing={3} display={{ xs: 'none', md: 'flex' }}>
//               <Link href="#mision" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
//                 Misión
//               </Link>
//               <Link href="#como-ayudar" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
//                 Contribuir
//               </Link>
//               <Link href="#contacto" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
//                 Contacto
//               </Link>
//             </Stack>
//           </Stack>
//         </motion.div>
//       </Container>

//       {/* Hero Section */}
//       <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={staggerContainer}
//         >
//           <motion.div variants={fadeInUp}>
//             <Typography
//               variant="h3"
//               component="h1"
//               fontWeight="400"
//               gutterBottom
//               sx={{
//                 letterSpacing: '-0.5px',
//                 lineHeight: 1.2
//               }}
//             >
//               Medicamentos para <Box component="span" color="primary.main">quienes más necesitan</Box>
//             </Typography>
//           </motion.div>

//           <motion.div variants={fadeInUp}>
//             <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto" mb={4}>
//               Facilitamos la donación responsable de medicamentos a comunidades vulnerables
//             </Typography>
//           </motion.div>

//           <motion.div variants={fadeInUp}>
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
//               <Button
//                 variant="contained"
//                 size="large"
//                 sx={{ px: 4 }}
//                 component={motion.a}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleActionButtonClick("/medicinebank/donate")}
//               >
//                 Donar ahora
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="large"
//                 sx={{ px: 4 }}
//                 component={motion.a}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleActionButtonClick("/medicinebank/askforhelp")}
//               >
//                 Solicitar ayuda
//               </Button>
//             </Stack>
//           </motion.div>
//         </motion.div>
//       </Container>

//       {/* Auth Modal */}
//       <Modal
//         open={authModalOpen}
//         onClose={handleAuthModalClose}
//         aria-labelledby="auth-modal-title"
//         aria-describedby="auth-modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '100%',
//             maxWidth: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 1,
//             outline: 'none'
//           }}
//           component={motion.div}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <IconButton
//             aria-label="close"
//             onClick={handleAuthModalClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
          
//           <Typography id="auth-modal-title" variant="h6" component="h2" mb={2}>
//             {isLoginView ? 'Iniciar sesión' : 'Registrarse'}
//           </Typography>
          
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}
          
//           <form onSubmit={handleSubmit}>
//             <Stack spacing={3}>
//               {!isLoginView && (
//                 <TextField
//                   label="Nombre completo"
//                   variant="outlined"
//                   fullWidth
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   InputProps={{
//                     startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />
//                   }}
//                 />
//               )}
              
//               <TextField
//                 label="Correo electrónico"
//                 type="email"
//                 variant="outlined"
//                 fullWidth
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 InputProps={{
//                   startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Contraseña"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 InputProps={{
//                   startAdornment: <KeyIcon color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 disabled={isLoading}
//                 sx={{ mt: 2 }}
//               >
//                 {isLoading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   isLoginView ? 'Iniciar sesión' : 'Registrarse'
//                 )}
//               </Button>
              
//               <Typography variant="body2" textAlign="center">
//                 {isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
//                 <Link
//                   component="button"
//                   type="button"
//                   onClick={() => {
//                     setIsLoginView(!isLoginView);
//                     setError('');
//                   }}
//                   color="primary"
//                 >
//                   {isLoginView ? 'Regístrate aquí' : 'Inicia sesión aquí'}
//                 </Link>
//               </Typography>
//             </Stack>
//           </form>
//         </Box>
//       </Modal>

//       {/* Verification Modal */}
//       <Dialog
//         open={verificationModalOpen}
//         onClose={handleVerificationModalClose}
//         aria-labelledby="verification-dialog-title"
//       >
//         <DialogTitle id="verification-dialog-title">
//           Verificación de correo electrónico
//         </DialogTitle>
//         <DialogContent>
//           {isVerified ? (
//             <Box textAlign="center" py={4}>
//               <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
//               <Typography variant="h6" gutterBottom>
//                 ¡Verificación exitosa!
//               </Typography>
//               <Typography color="text.secondary">
//                 Tu cuenta ha sido verificada correctamente.
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               <DialogContentText mb={3}>
//                 Hemos enviado un código de verificación a {email}. Por favor ingrésalo a continuación:
//               </DialogContentText>
              
//               {error && (
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                   {error}
//                 </Alert>
//               )}
              
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 label="Código de verificación"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={verificationCode}
//                 onChange={(e) => setVerificationCode(e.target.value)}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           {!isVerified && (
//             <>
//               <Button onClick={handleVerificationModalClose}>Cancelar</Button>
//               <Button
//                 onClick={handleVerifyCode}
//                 variant="contained"
//                 disabled={isVerifying || !verificationCode}
//               >
//                 {isVerifying ? <CircularProgress size={24} /> : 'Verificar'}
//               </Button>
//             </>
//           )}
//         </DialogActions>
//       </Dialog>

//       {/* Rest of the page content remains the same */}
//       {/* Impact Section */}
//       <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
//         <Container maxWidth="lg">
//           <Divider sx={{ mb: 8 }} />
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={4}>
//                 <motion.div variants={fadeInUp}>
//                   <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
//                     Nuestro impacto
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     Desde 2023, hemos facilitado la distribución de medicamentos esenciales
//                   </Typography>
//                 </motion.div>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <motion.div variants={staggerContainer}>
//                   <Grid container spacing={4}>
//                     <StatItem value="1,200+" label="Personas beneficiadas" />
//                     <StatItem value="5,000+" label="Medicamentos entregados" />
//                     <StatItem value="100%" label="Sin costo alguno" />
//                     <StatItem value="50+" label="Donantes activos" />
//                   </Grid>
//                 </motion.div>
//               </Grid>
//             </Grid>
//           </motion.div>
//           <Divider sx={{ mt: 8 }} />
//         </Container>
//       </Box>

//       {/* Mission Section */}
//       <Box id="mision" sx={{ py: 10 }}>
//         <Container maxWidth="md">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <motion.div variants={fadeInUp}>
//               <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
//                 Nuestra misión
//               </Typography>
//             </motion.div>
//             <motion.div variants={fadeInUp}>
//               <Typography variant="body1" textAlign="center" color="text.secondary" maxWidth="md" mx="auto" mb={6}>
//                 Creemos en el acceso universal a medicamentos esenciales como derecho fundamental
//               </Typography>
//             </motion.div>

//             <motion.div variants={scaleIn} whileHover={{ scale: 1.01 }}>
//               <Paper elevation={0} sx={{
//                 p: 4,
//                 border: '1px solid',
//                 borderColor: 'divider',
//                 borderRadius: 1
//               }}>
//                 <Typography paragraph>
//                   BancoMed es una iniciativa sin fines de lucro que conecta donaciones de medicamentos en buen estado con personas que no pueden acceder a sus tratamientos.
//                 </Typography>
//                 <Typography paragraph>
//                   Trabajamos con profesionales de la salud para garantizar que todas las donaciones cumplan con los estándares requeridos.
//                 </Typography>
//               </Paper>
//             </motion.div>
//           </motion.div>
//         </Container>
//       </Box>

//       {/* How to Help */}
//       <Box id="como-ayudar" sx={{ py: 10, bgcolor: 'background.paper' }}>
//         <Container maxWidth="lg">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <motion.div variants={fadeInUp}>
//               <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
//                 Cómo contribuir
//               </Typography>
//             </motion.div>

//             <motion.div variants={staggerContainer}>
//               <Grid container spacing={4} mt={6}>
//                 <ContributionMethod
//                   icon={<DonationIcon fontSize="large" color="primary" />}
//                   title="Donar medicamentos"
//                   description="Aceptamos medicamentos no vencidos, en su empaque original"
//                 />
//                 <ContributionMethod
//                   icon={<MedicalIcon fontSize="large" color="primary" />}
//                   title="Donar insumos"
//                   description="Jeringas, tiras reactivas y otros suministros médicos"
//                 />
//                 <ContributionMethod
//                   icon={<GroupsIcon fontSize="large" color="primary" />}
//                   title="Difundir"
//                   description="Comparte nuestra iniciativa con posibles donantes"
//                 />
//               </Grid>
//             </motion.div>
//           </motion.div>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box sx={{ py: 10 }}>
//         <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <motion.div variants={fadeInUp}>
//               <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
//                 Cada medicamento cuenta
//               </Typography>
//             </motion.div>
//             <motion.div variants={fadeInUp}>
//               <Typography variant="body1" color="text.secondary" mb={4}>
//                 Tu contribución puede hacer la diferencia en la vida de alguien
//               </Typography>
//             </motion.div>
//             <motion.div variants={fadeInUp}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={() => handleActionButtonClick("#contacto")}
//                 sx={{ px: 6 }}
//                 component={motion.a}
//                 whileHover={{ scale: 1.05, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Contactar para donar
//               </Button>
//             </motion.div>
//           </motion.div>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box id="contacto" sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
//         <Container maxWidth="lg">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             <Grid container spacing={4}>
//               <Grid item xs={12} md={4}>
//                 <motion.div variants={fadeInUp}>
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <PharmacyIcon color="primary" />
//                     <Typography variant="h6">BancoMed</Typography>
//                   </Stack>
//                   <Typography variant="body2" color="text.secondary" mt={1}>
//                     Iniciativa sin fines de lucro
//                   </Typography>
//                 </motion.div>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <motion.div variants={fadeInUp}>
//                   <Typography variant="subtitle1" gutterBottom>Contacto</Typography>
//                   <Stack spacing={1}>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <EmailIcon fontSize="small" color="action" />
//                       <Typography variant="body2">contacto@bancomed.org</Typography>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <PhoneIcon fontSize="small" color="action" />
//                       <Typography variant="body2">+54 11 2345-6789</Typography>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <LocationIcon fontSize="small" color="action" />
//                       <Typography variant="body2">Buenos Aires, Argentina</Typography>
//                     </Stack>
//                   </Stack>
//                 </motion.div>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <motion.div variants={fadeInUp}>
//                   <Typography variant="subtitle1" gutterBottom>Legal</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Registro ONG N° 123456
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" mt={2}>
//                     © {new Date().getFullYear()} BancoMed
//                   </Typography>
//                 </motion.div>
//               </Grid>
//             </Grid>
//           </motion.div>
//         </Container>
//       </Box>
//     </>
//   );
// };

// // Componentes auxiliares con animaciones
// const StatItem = ({ value, label }: { value: string, label: string }) => (
//   <Grid item xs={12} sm={6}>
//     <motion.div
//       variants={fadeInUp}
//       whileHover={{ y: -5 }}
//     >
//       <Box>
//         <Typography variant="h4" component="div" fontWeight="400" gutterBottom>
//           {value}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {label}
//         </Typography>
//       </Box>
//     </motion.div>
//   </Grid>
// );

// const ContributionMethod = ({ icon, title, description }: {
//   icon: React.ReactNode,
//   title: string,
//   description: string
// }) => (
//   <Grid item xs={12} md={4}>
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -5 }}
//       style={{ height: '100%' }}
//     >
//       <Box sx={{ textAlign: 'center', height: '100%', p: 3 }}>
//         <motion.div
//           whileHover={{ scale: 1.1 }}
//           style={{ display: 'inline-block', marginBottom: '16px' }}
//         >
//           {icon}
//         </motion.div>
//         <Typography variant="h6" component="h3" gutterBottom fontWeight="400">
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {description}
//         </Typography>
//       </Box>
//     </motion.div>
//   </Grid>
// );

// export default Home;



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
  Modal,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  LocalPharmacy as PharmacyIcon,
  VolunteerActivism as DonationIcon,
  MedicalServices as MedicalIcon,
  Groups as GroupsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  VpnKey as KeyIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';

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

const Home: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [targetPath, setTargetPath] = useState('');

  const handleAuthModalOpen = (path: string) => {
    setTargetPath(path);
    setAuthModalOpen(true);
    setError('');
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  const handleVerificationModalClose = () => {
    setVerificationModalOpen(false);
    setVerificationCode('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLoginView) {
        // Login logic
        console.log('Logging in with:', email, password);
        // On successful login:
        setAuthModalOpen(false);
        setIsVerified(true);
        router.push(targetPath); // Redirige a la ruta objetivo
      } else {
        // Register logic
        console.log('Registering:', name, email, password);
        // Simulate sending verification code
        setVerificationModalOpen(true);
      }
    } catch (err) {
      setError(isLoginView ? 'Error al iniciar sesión' : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (verificationCode === '123456') { // Demo code
        setIsVerified(true);
        setTimeout(() => {
          setVerificationModalOpen(false);
          setAuthModalOpen(false);
          router.push(targetPath); // Redirige a la ruta objetivo
        }, 2000);
      } else {
        setError('Código incorrecto. Intente nuevamente.');
      }
    } catch (err) {
      setError('Error al verificar el código');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Head>
        <title>BancoMed | Donación Solidaria de Medicamentos</title>
        <meta name="description" content="Conectamos donantes con personas que necesitan medicamentos" />
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
              <PharmacyIcon color="primary" />
              <Typography variant="h6" fontWeight="500">BancoMed</Typography>
            </Stack>
            <Stack direction="row" spacing={3} display={{ xs: 'none', md: 'flex' }}>
              <Link href="#mision" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
                Misión
              </Link>
              <Link href="#como-ayudar" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
                Contribuir
              </Link>
              <Link href="#contacto" color="text.primary" underline="none" component={motion.a} whileHover={{ color: theme.palette.primary.main }}>
                Contacto
              </Link>
            </Stack>
          </Stack>
        </motion.div>
      </Container>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
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
              Medicamentos para <Box component="span" color="primary.main">quienes más necesitan</Box>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto" mb={4}>
              Facilitamos la donación responsable de medicamentos a comunidades vulnerables
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{ px: 4 }}
                component={motion.a}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAuthModalOpen("/medicinebank/donate")}
              >
                Donar ahora
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ px: 4 }}
                component={motion.a}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAuthModalOpen("/medicinebank/askforhelp")}
              >
                Solicitar ayuda
              </Button>
            </Stack>
          </motion.div>
        </motion.div>
      </Container>

      {/* Auth Modal */}
      <Modal
        open={authModalOpen}
        onClose={handleAuthModalClose}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            outline: 'none'
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <IconButton
            aria-label="close"
            onClick={handleAuthModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography id="auth-modal-title" variant="h6" component="h2" mb={2}>
            {isLoginView ? 'Iniciar sesión' : 'Registrarse'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {!isLoginView && (
                <TextField
                  label="Nombre completo"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />
                  }}
                />
              )}
              
              <TextField
                label="Correo electrónico"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: <KeyIcon color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isLoginView ? 'Iniciar sesión' : 'Registrarse'
                )}
              </Button>
              
              <Typography variant="body2" textAlign="center">
                {isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setError('');
                  }}
                  color="primary"
                >
                  {isLoginView ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                </Link>
              </Typography>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* Verification Modal */}
      <Dialog
        open={verificationModalOpen}
        onClose={handleVerificationModalClose}
        aria-labelledby="verification-dialog-title"
      >
        <DialogTitle id="verification-dialog-title">
          Verificación de correo electrónico
        </DialogTitle>
        <DialogContent>
          {isVerified ? (
            <Box textAlign="center" py={4}>
              <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                ¡Verificación exitosa!
              </Typography>
              <Typography color="text.secondary">
                Redirigiendo a la página solicitada...
              </Typography>
            </Box>
          ) : (
            <>
              <DialogContentText mb={3}>
                Hemos enviado un código de verificación a {email}. Por favor ingrésalo a continuación:
              </DialogContentText>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <TextField
                autoFocus
                margin="dense"
                label="Código de verificación"
                type="text"
                fullWidth
                variant="outlined"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!isVerified && (
            <>
              <Button onClick={handleVerificationModalClose}>Cancelar</Button>
              <Button
                onClick={handleVerifyCode}
                variant="contained"
                disabled={isVerifying || !verificationCode}
              >
                {isVerifying ? <CircularProgress size={24} /> : 'Verificar'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Rest of the page content */}
      {/* Impact Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Divider sx={{ mb: 8 }} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div variants={fadeInUp}>
                  <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
                    Nuestro impacto
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Desde 2023, hemos facilitado la distribución de medicamentos esenciales
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={8}>
                <motion.div variants={staggerContainer}>
                  <Grid container spacing={4}>
                    <StatItem value="1,200+" label="Personas beneficiadas" />
                    <StatItem value="5,000+" label="Medicamentos entregados" />
                    <StatItem value="100%" label="Sin costo alguno" />
                    <StatItem value="50+" label="Donantes activos" />
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
          <Divider sx={{ mt: 8 }} />
        </Container>
      </Box>

      {/* Mission Section */}
      <Box id="mision" sx={{ py: 10 }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
                Nuestra misión
              </Typography>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Typography variant="body1" textAlign="center" color="text.secondary" maxWidth="md" mx="auto" mb={6}>
                Creemos en el acceso universal a medicamentos esenciales como derecho fundamental
              </Typography>
            </motion.div>

            <motion.div variants={scaleIn} whileHover={{ scale: 1.01 }}>
              <Paper elevation={0} sx={{
                p: 4,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1
              }}>
                <Typography paragraph>
                  BancoMed es una iniciativa sin fines de lucro que conecta donaciones de medicamentos en buen estado con personas que no pueden acceder a sus tratamientos.
                </Typography>
                <Typography paragraph>
                  Trabajamos con profesionales de la salud para garantizar que todas las donaciones cumplan con los estándares requeridos.
                </Typography>
              </Paper>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* How to Help */}
      <Box id="como-ayudar" sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h4" component="h2" textAlign="center" fontWeight="400" gutterBottom>
                Cómo contribuir
              </Typography>
            </motion.div>

            <motion.div variants={staggerContainer}>
              <Grid container spacing={4} mt={6}>
                <ContributionMethod
                  icon={<DonationIcon fontSize="large" color="primary" />}
                  title="Donar medicamentos"
                  description="Aceptamos medicamentos no vencidos, en su empaque original"
                />
                <ContributionMethod
                  icon={<MedicalIcon fontSize="large" color="primary" />}
                  title="Donar insumos"
                  description="Jeringas, tiras reactivas y otros suministros médicos"
                />
                <ContributionMethod
                  icon={<GroupsIcon fontSize="large" color="primary" />}
                  title="Difundir"
                  description="Comparte nuestra iniciativa con posibles donantes"
                />
              </Grid>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Typography variant="h4" component="h2" fontWeight="400" gutterBottom>
                Cada medicamento cuenta
              </Typography>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Typography variant="body1" color="text.secondary" mb={4}>
                Tu contribución puede hacer la diferencia en la vida de alguien
              </Typography>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleAuthModalOpen("#contacto")}
                sx={{ px: 6 }}
                component={motion.a}
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                Contactar para donar
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box id="contacto" sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
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

// Componentes auxiliares con animaciones
const StatItem = ({ value, label }: { value: string, label: string }) => (
  <Grid item xs={12} sm={6}>
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
    >
      <Box>
        <Typography variant="h4" component="div" fontWeight="400" gutterBottom>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </motion.div>
  </Grid>
);

const ContributionMethod = ({ icon, title, description }: {
  icon: React.ReactNode,
  title: string,
  description: string
}) => (
  <Grid item xs={12} md={4}>
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -5 }}
      style={{ height: '100%' }}
    >
      <Box sx={{ textAlign: 'center', height: '100%', p: 3 }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{ display: 'inline-block', marginBottom: '16px' }}
        >
          {icon}
        </motion.div>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="400">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </motion.div>
  </Grid>
);

export default Home;