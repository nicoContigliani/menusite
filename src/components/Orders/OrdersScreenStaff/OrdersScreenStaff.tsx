// // "use client"

// // import { useEffect } from "react"
// // import { motion, AnimatePresence, useAnimation } from "framer-motion"
// // import styles from "./OrdersScreen.module.css"

// // interface Order {
// //   _id: string
// //   id: string
// //   orderType: string
// //   dataTypeOrder: string
// //   cart: Array<{
// //     id: string
// //     itemId: number
// //     name: string
// //     price: number
// //     quantity: number
// //     extras?: Array<{
// //       name: string
// //       price: number
// //     }>
// //     extrasTotal?: number
// //     Description: string
// //   }>
// //   fullname: string
// //   timestamp: string
// //   status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
// //   [key: string]: any
// // }

// // interface OrdersByStatus {
// //   pending?: Order[]
// //   processing?: Order[]
// //   paused?: Order[]
// //   finished?: Order[]
// //   cancelled?: Order[]
// //   delivered?: Order[]
// // }

// // interface OrdersScreenStaffProps {
// //   ordersByStatus: OrdersByStatus
// //   onOrderAction: (action: any, order: any) => void
// // }

// // const OrdersScreenStaff = ({ ordersByStatus, onOrderAction }: OrdersScreenStaffProps) => {
// //   const pendingOrders = ordersByStatus?.pending || []
// //   const processingOrders = ordersByStatus?.processing || []
// //   const pausedOrders = ordersByStatus?.paused || []
// //   const finishedOrders = ordersByStatus?.finished || []
// //   const cancelledOrders = ordersByStatus?.cancelled || []
// //   const deliveredOrders = ordersByStatus?.delivered || []

// //   const titleControls = useAnimation()
// //   const columnControls = useAnimation()

// //   // Sequence animation on load
// //   useEffect(() => {
// //     const sequence = async () => {
// //       await titleControls.start({
// //         opacity: 1,
// //         y: 0,
// //         transition: { duration: 0.8 },
// //       })

// //       await columnControls.start({
// //         opacity: 1,
// //         y: 0,
// //         transition: {
// //           duration: 0.5,
// //           staggerChildren: 0.2,
// //         },
// //       })
// //     }

// //     sequence()
// //   }, [titleControls, columnControls])

// //   return (
// //     <div className={styles.container}>
// //       {/* Video background */}
// //       <video autoPlay muted loop playsInline className={styles.heroVideo}>
// //         <source src="/videos/menu.mp4" type="video/mp4" />
// //         Your browser does not support videos.
// //       </video>

// //       {/* Overlay with gradient */}
// //       <motion.div
// //         className={styles.overlay}
// //         initial={{ opacity: 0 }}
// //         animate={{
// //           opacity: 1,
// //           transition: { duration: 1.5 },
// //         }}
// //       />

// //       {/* Title with animated underline */}
// //       <motion.div className={styles.titleContainer} initial={{ opacity: 0, y: -30 }} animate={titleControls}>
// //         <motion.h1 className={styles.title}>
// //           <motion.span
// //             className={styles.titleUnderline}
// //             initial={{ width: "0%" }}
// //             animate={{
// //               width: "100%",
// //               transition: {
// //                 delay: 0.5,
// //                 duration: 1.2,
// //                 ease: [0.25, 1, 0.5, 1],
// //               },
// //             }}
// //           >
// //             Órdenes en Tiempo Real
// //           </motion.span>
// //         </motion.h1>
// //         <motion.p
// //           className={styles.subtitle}
// //           initial={{ opacity: 0 }}
// //           animate={{
// //             opacity: 0.8,
// //             transition: { delay: 1, duration: 1 },
// //           }}
// //         >
// //           Monitor de pedidos en vivo
// //         </motion.p>
// //       </motion.div>

// //       {/* Columns container */}
// //       <motion.div className={styles.columnsContainer} initial={{ opacity: 0, y: 30 }} animate={columnControls}>
// //         {/* Pending orders column */}
// //         {pendingOrders.length > 0 && (
// //           <motion.div
// //             className={styles.column}
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{
// //               opacity: 1,
// //               x: 0,
// //               transition: {
// //                 type: "spring",
// //                 stiffness: 100,
// //                 delay: 0.2,
// //               },
// //             }}
// //             whileHover={{
// //               y: -5,
// //               boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
// //               transition: { duration: 0.3 },
// //             }}
// //           >
// //             <motion.div className={styles.columnHeader}>
// //               <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
// //                 <motion.span
// //                   animate={{
// //                     rotate: [0, 10, -10, 0],
// //                     scale: [1, 1.1, 1.2, 1],
// //                   }}
// //                   transition={{
// //                     duration: 1.5,
// //                     repeat: Number.POSITIVE_INFINITY,
// //                     repeatType: "loop",
// //                   }}
// //                 >
// //                   ⏳
// //                 </motion.span>
// //                 Pendientes
// //                 <motion.span
// //                   className={styles.orderCount}
// //                   initial={{ scale: 0 }}
// //                   animate={{
// //                     scale: 1,
// //                     transition: {
// //                       type: "spring",
// //                       delay: 1.0,
// //                     },
// //                   }}
// //                 >
// //                   ({pendingOrders.length})
// //                 </motion.span>
// //               </motion.h2>
// //               <motion.div
// //                 className={styles.columnPulse}
// //                 animate={{
// //                   boxShadow: [
// //                     "0 0 0 rgba(255, 193, 7, 0)",
// //                     "0 0 20px rgba(255, 193, 7, 0.3)",
// //                     "0 0 0 rgba(255, 193, 7, 0)",
// //                   ],
// //                 }}
// //                 transition={{
// //                   duration: 2,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   repeatType: "loop",
// //                 }}
// //               />
// //             </motion.div>

// //             <div className={styles.scrollContainer}>
// //               <AnimatePresence>
// //                 {pendingOrders.map((order, index) => (
// //                   <OrderCard
// //                     key={order._id}
// //                     order={order}
// //                     status="pending"
// //                     delay={0.3 + index * 0.1}
// //                     onAction={onOrderAction}
// //                   />
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Processing orders column */}
// //         {(processingOrders.length > 0 || pausedOrders.length > 0) && (
// //           <motion.div
// //             className={styles.column}
// //             initial={{ opacity: 0, x: 50 }}
// //             animate={{
// //               opacity: 1,
// //               x: 0,
// //               transition: {
// //                 type: "spring",
// //                 stiffness: 100,
// //                 delay: 0.4,
// //               },
// //             }}
// //             whileHover={{
// //               y: -5,
// //               boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
// //               transition: { duration: 0.3 },
// //             }}
// //           >
// //             <motion.div className={styles.columnHeader}>
// //               <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
// //                 <motion.span
// //                   animate={{
// //                     rotate: [0, -10, 10, 0],
// //                     scale: [1, 1.1, 1.2, 1],
// //                   }}
// //                   transition={{
// //                     duration: 1.5,
// //                     repeat: Number.POSITIVE_INFINITY,
// //                     repeatType: "loop",
// //                   }}
// //                 >
// //                   🚀
// //                 </motion.span>
// //                 En Proceso
// //                 <motion.span
// //                   className={styles.orderCount}
// //                   initial={{ scale: 0 }}
// //                   animate={{
// //                     scale: 1,
// //                     transition: {
// //                       type: "spring",
// //                       delay: 1.2,
// //                     },
// //                   }}
// //                 >
// //                   ({processingOrders.length + pausedOrders.length})
// //                 </motion.span>
// //               </motion.h2>
// //               <motion.div
// //                 className={styles.columnPulse}
// //                 animate={{
// //                   boxShadow: [
// //                     "0 0 0 rgba(0, 123, 255, 0)",
// //                     "0 0 20px rgba(0, 123, 255, 0.3)",
// //                     "0 0 0 rgba(0, 123, 255, 0)",
// //                   ],
// //                 }}
// //                 transition={{
// //                   duration: 2,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   repeatType: "loop",
// //                 }}
// //               />
// //             </motion.div>

// //             <div className={styles.scrollContainer}>
// //               <AnimatePresence>
// //                 {processingOrders.map((order, index) => (
// //                   <OrderCard
// //                     key={order._id}
// //                     order={order}
// //                     status="processing"
// //                     delay={0.5 + index * 0.1}
// //                     onAction={onOrderAction}
// //                   />
// //                 ))}
// //                 {pausedOrders.map((order, index) => (
// //                   <OrderCard
// //                     key={order._id}
// //                     order={order}
// //                     status="paused"
// //                     delay={0.5 + (processingOrders.length + index) * 0.1}
// //                     onAction={onOrderAction}
// //                   />
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Finished orders column */}
// //         {finishedOrders.length > 0 && (
// //           <motion.div
// //             className={styles.column}
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{
// //               opacity: 1,
// //               x: 0,
// //               transition: {
// //                 type: "spring",
// //                 stiffness: 100,
// //                 delay: 0.6,
// //               },
// //             }}
// //             whileHover={{
// //               y: -5,
// //               boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
// //               transition: { duration: 0.3 },
// //             }}
// //           >
// //             <motion.div className={styles.columnHeader}>
// //               <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
// //                 <motion.span
// //                   animate={{
// //                     rotate: [0, 10, 0],
// //                     scale: [1, 1.2, 1],
// //                   }}
// //                   transition={{
// //                     duration: 2,
// //                     repeat: Number.POSITIVE_INFINITY,
// //                     repeatDelay: 5,
// //                   }}
// //                 >
// //                   ✅
// //                 </motion.span>
// //                 Completadas
// //                 <motion.span
// //                   className={styles.orderCount}
// //                   initial={{ scale: 0 }}
// //                   animate={{
// //                     scale: 1,
// //                     transition: {
// //                       type: "spring",
// //                       delay: 1.4,
// //                     },
// //                   }}
// //                 >
// //                   ({finishedOrders.length})
// //                 </motion.span>
// //               </motion.h2>
// //               <motion.div
// //                 className={styles.columnPulse}
// //                 animate={{
// //                   boxShadow: [
// //                     "0 0 0 rgba(40, 167, 69, 0)",
// //                     "0 0 20px rgba(40, 167, 69, 0.3)",
// //                     "0 0 0 rgba(40, 167, 69, 0)",
// //                   ],
// //                 }}
// //                 transition={{
// //                   duration: 3,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   repeatType: "loop",
// //                 }}
// //               />
// //             </motion.div>

// //             <div className={styles.scrollContainer}>
// //               <AnimatePresence>
// //                 {finishedOrders.map((order, index) => (
// //                   <OrderCard
// //                     key={order._id}
// //                     order={order}
// //                     status="finished"
// //                     delay={0.7 + index * 0.1}
// //                     onAction={onOrderAction}
// //                   />
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Delivered orders column */}
// //         {deliveredOrders.length > 0 && (
// //           <motion.div
// //             className={styles.column}
// //             initial={{ opacity: 0, x: 50 }}
// //             animate={{
// //               opacity: 1,
// //               x: 0,
// //               transition: {
// //                 type: "spring",
// //                 stiffness: 100,
// //                 delay: 0.8,
// //               },
// //             }}
// //             whileHover={{
// //               y: -5,
// //               boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
// //               transition: { duration: 0.3 },
// //             }}
// //           >
// //             <motion.div className={styles.columnHeader}>
// //               <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
// //                 <motion.span
// //                   animate={{
// //                     rotate: [0, 10, 0],
// //                     scale: [1, 1.2, 1],
// //                   }}
// //                   transition={{
// //                     duration: 2,
// //                     repeat: Number.POSITIVE_INFINITY,
// //                     repeatDelay: 5,
// //                   }}
// //                 >
// //                   🚚
// //                 </motion.span>
// //                 Entregadas
// //                 <motion.span
// //                   className={styles.orderCount}
// //                   initial={{ scale: 0 }}
// //                   animate={{
// //                     scale: 1,
// //                     transition: {
// //                       type: "spring",
// //                       delay: 1.6,
// //                     },
// //                   }}
// //                 >
// //                   ({deliveredOrders.length})
// //                 </motion.span>
// //               </motion.h2>
// //               <motion.div
// //                 className={styles.columnPulse}
// //                 animate={{
// //                   boxShadow: [
// //                     "0 0 0 rgba(111, 66, 193, 0)",
// //                     "0 0 20px rgba(111, 66, 193, 0.3)",
// //                     "0 0 0 rgba(111, 66, 193, 0)",
// //                   ],
// //                 }}
// //                 transition={{
// //                   duration: 3,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   repeatType: "loop",
// //                 }}
// //               />
// //             </motion.div>

// //             <div className={styles.scrollContainer}>
// //               <AnimatePresence>
// //                 {deliveredOrders.map((order, index) => (
// //                   <OrderCard
// //                     key={order._id}
// //                     order={order}
// //                     status="delivered"
// //                     delay={0.9 + index * 0.1}
// //                     onAction={onOrderAction}
// //                   />
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Cancelled orders column */}
// //         {cancelledOrders.length > 0 && (
// //           <motion.div
// //             className={styles.column}
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{
// //               opacity: 1,
// //               x: 0,
// //               transition: {
// //                 type: "spring",
// //                 stiffness: 100,
// //                 delay: 1.0,
// //               },
// //             }}
// //             whileHover={{
// //               y: -5,
// //               boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
// //               transition: { duration: 0.3 },
// //             }}
// //           >
// //             <motion.div className={styles.columnHeader}>
// //               <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
// //                 <motion.span
// //                   animate={{
// //                     rotate: [0, 10, 0],
// //                     scale: [1, 1.2, 1],
// //                   }}
// //                   transition={{
// //                     duration: 2,
// //                     repeat: Number.POSITIVE_INFINITY,
// //                     repeatDelay: 5,
// //                   }}
// //                 >
// //                   ❌
// //                 </motion.span>
// //                 Canceladas
// //                 <motion.span
// //                   className={styles.orderCount}
// //                   initial={{ scale: 0 }}
// //                   animate={{
// //                     scale: 1,
// //                     transition: {
// //                       type: "spring",
// //                       delay: 1.8,
// //                     },
// //                   }}
// //                 >
// //                   ({cancelledOrders.length})
// //                 </motion.span>
// //               </motion.h2>
// //               <motion.div
// //                 className={styles.columnPulse}
// //                 animate={{
// //                   boxShadow: [
// //                     "0 0 0 rgba(220, 53, 69, 0)",
// //                     "0 0 20px rgba(220, 53, 69, 0.3)",
// //                     "0 0 0 rgba(220, 53, 69, 0)",
// //                   ],
// //                 }}
// //                 transition={{
// //                   duration: 3,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   repeatType: "loop",
// //                 }}
// //               />
// //             </motion.div>

// //             <div className={styles.scrollContainer}>
// //               <AnimatePresence>
// //                 {cancelledOrders.map((order, index) => (
// //                   <OrderCard
// //                     key={order._id}
// //                     order={order}
// //                     status="cancelled"
// //                     delay={1.1 + index * 0.1}
// //                     onAction={onOrderAction}
// //                   />
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //           </motion.div>
// //         )}
// //       </motion.div>
// //     </div>
// //   )
// // }

// // interface OrderCardProps {
// //   order: Order
// //   status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
// //   delay?: number
// //   onAction: (action: string, order: Order) => void
// // }

// // const OrderCard = ({ order, status, delay = 0, onAction }: OrderCardProps) => {
// //   const total = order.cart.reduce((sum, item) => {
// //     const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
// //     return sum + item.price * item.quantity + extrasTotal
// //   }, 0)

// //   // Staggered animation for items
// //   const itemVariants = {
// //     hidden: { opacity: 0, x: -10 },
// //     visible: (i: number) => ({
// //       opacity: 1,
// //       x: 0,
// //       transition: {
// //         delay: delay + i * 0.05,
// //         duration: 0.3,
// //       },
// //     }),
// //   }

// //   const getStatusColor = () => {
// //     switch (status) {
// //       case 'pending': return '#ffc107';
// //       case 'processing': return '#17a2b8';
// //       case 'paused': return '#6c757d';
// //       case 'finished': return '#28a745';
// //       case 'delivered': return '#6f42c1';
// //       case 'cancelled': return '#dc3545';
// //       default: return '#6c757d';
// //     }
// //   }

// //   const getActions = () => {
// //     const actions = [];

// //     if (status === 'pending') {
// //       actions.push({
// //         action: 'start',
// //         label: 'Tomar orden',
// //         color: '#17a2b8',
// //         icon: '▶️'
// //       });
// //     }

// //     if (status === 'processing') {
// //       actions.push({
// //         action: 'pause',
// //         label: 'Pausar orden',
// //         color: '#ffc107',
// //         icon: '⏸️'
// //       });
// //       actions.push({
// //         action: 'complete',
// //         label: 'Completar orden',
// //         color: '#28a745',
// //         icon: '✅'
// //       });
// //     }

// //     if (status === 'paused') {
// //       actions.push({
// //         action: 'resume',
// //         label: 'Continuar',
// //         color: '#17a2b8',
// //         icon: '▶️'
// //       });
// //       actions.push({
// //         action: 'complete',
// //         label: 'Completar orden',
// //         color: '#28a745',
// //         icon: '✅'
// //       });
// //     }

// //     if (status === 'finished') {
// //       actions.push({
// //         action: 'deliver',
// //         label: 'Marcar como entregado',
// //         color: '#6f42c1',
// //         icon: '🚚'
// //       });
// //     }

// //     if (['processing', 'paused'].includes(status)) {
// //       actions.push({
// //         action: 'cancel',
// //         label: 'Cancelar orden',
// //         color: '#dc3545',
// //         icon: '❌'
// //       });
// //     }

// //     return actions;
// //   };

// //   const actions = getActions();

// //   return (
// //     <motion.div
// //       className={`${styles.orderCard} ${styles[status]}`}
// //       layout
// //       initial={{ opacity: 0, y: 30, scale: 0.95 }}
// //       animate={{ opacity: 1, y: 0, scale: 1 }}
// //       exit={{
// //         opacity: 0,
// //         scale: 0.9,
// //         x: ['finished', 'delivered'].includes(status) ? -50 : 50,
// //         transition: { duration: 0.3 },
// //       }}
// //       transition={{
// //         type: "spring",
// //         stiffness: 300,
// //         damping: 25,
// //         delay: delay,
// //       }}
// //       whileHover={{
// //         y: -5,
// //         boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
// //         scale: 1.02,
// //         transition: { duration: 0.2 },
// //       }}
// //     >
// //       <motion.div className={styles.orderHeader} whileHover={{ x: 3 }}>
// //         <div className={styles.orderId}>
// //           <motion.span
// //             className={styles.idBadge}
// //             animate={{
// //               backgroundColor: [getStatusColor(), `${getStatusColor()}cc`, getStatusColor()],
// //             }}
// //             transition={{
// //               duration: 3,
// //               repeat: Number.POSITIVE_INFINITY,
// //               repeatType: "reverse",
// //             }}
// //           >
// //             #{order.id}
// //           </motion.span>
// //         </div>
// //         <motion.span className={styles.orderType} whileHover={{ scale: 1.1 }}>
// //           {order.orderType}
// //         </motion.span>
// //       </motion.div>

// //       <motion.div
// //         className={styles.orderBody}
// //         initial={{ opacity: 0 }}
// //         animate={{
// //           opacity: 1,
// //           transition: { delay: delay + 0.1 },
// //         }}
// //       >
// //         <div className={styles.customerInfo}>
// //           <motion.p className={styles.customerName} whileHover={{ x: 3 }}>
// //             <span className={styles.infoIcon}>👤</span> {order.fullname}
// //           </motion.p>
// //           <motion.p className={styles.orderTime} whileHover={{ x: 3 }}>
// //             <span className={styles.infoIcon}>⏱️</span> {new Date(order.timestamp).toLocaleTimeString()}
// //           </motion.p>
// //         </div>

// //         <motion.div
// //           className={styles.orderItems}
// //           initial={{ opacity: 0 }}
// //           animate={{
// //             opacity: 1,
// //             transition: { delay: delay + 0.2 },
// //           }}
// //         >
// //           <h4 className={styles.itemsTitle}>
// //             <motion.span
// //               animate={{
// //                 rotate: [0, 5, -5, 0],
// //                 transition: {
// //                   duration: 2,
// //                   repeat: Number.POSITIVE_INFINITY,
// //                   repeatDelay: 3,
// //                 },
// //               }}
// //             >
// //               🍽️
// //             </motion.span>
// //             Items ({order.cart.reduce((sum, item) => sum + item.quantity, 0)})
// //           </h4>
// //           <ul>
// //             {order.cart.map((item, idx) => (
// //               <motion.li key={item.id} custom={idx} variants={itemVariants} initial="hidden" animate="visible">
// //                 <div className={styles.itemRow}>
// //                   <span className={styles.itemQuantity}>{item.quantity}x</span>
// //                   <span className={styles.itemName}>{item.name}</span>
// //                   <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
// //                 </div>
// //                 {item.extras && item.extras.length > 0 && (
// //                   <ul className={styles.extrasList}>
// //                     {item.extras.map((extra, extraIdx) => (
// //                       <motion.li
// //                         key={extraIdx}
// //                         className={styles.extraItem}
// //                         custom={idx + extraIdx + 1}
// //                         variants={itemVariants}
// //                         initial="hidden"
// //                         animate="visible"
// //                       >
// //                         <span className={styles.plusIcon}>+</span> {extra.name} (${extra.price.toFixed(2)})
// //                       </motion.li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </motion.li>
// //             ))}
// //           </ul>
// //         </motion.div>
// //       </motion.div>

// //       <motion.div
// //         className={styles.orderFooter}
// //         initial={{ opacity: 0 }}
// //         animate={{
// //           opacity: 1,
// //           transition: { delay: delay + 0.3 },
// //         }}
// //       >
// //         <motion.div
// //           className={styles.totalAmount}
// //           whileHover={{
// //             scale: 1.05,
// //             transition: { duration: 0.2 },
// //           }}
// //         >
// //           <span>Total:</span> ${total.toFixed(2)}
// //         </motion.div>

// //         {actions.length > 0 && (
// //           <motion.div className={styles.actionButtons}>
// //             {actions.map((action, index) => (
// //               <motion.button
// //                 key={action.action}
// //                 className={styles.actionButton}
// //                 style={{ backgroundColor: action.color }}
// //                 whileTap={{ scale: 0.95 }}
// //                 whileHover={{
// //                   scale: 1.05,
// //                   boxShadow: `0 0 15px ${action.color}80`,
// //                 }}
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 animate={{
// //                   opacity: 1,
// //                   scale: 1,
// //                   transition: { delay: delay + 0.4 + index * 0.1 },
// //                 }}
// //                 onClick={() => onAction(action.action, order)}
// //               >
// //                 {action.icon} {action.label}
// //               </motion.button>
// //             ))}
// //           </motion.div>
// //         )}
// //       </motion.div>
// //     </motion.div>
// //   )
// // }

// // export default OrdersScreenStaff


// "use client"
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Button,
//   Grid,
//   Paper,
//   Stack,
//   Badge,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material"
// import {
//   AccessTime,
//   CheckCircle,
//   Cancel,
//   LocalShipping,
//   Pending,
//   PlayArrow,
//   Pause,
//   LocalDining,
//   Person,
// } from "@mui/icons-material"

// interface OrderItem {
//   id: string
//   itemId: number
//   name: string
//   price: number
//   quantity: number
//   extras?: Array<{
//     name: string
//     price: number
//   }>
//   extrasTotal?: number
//   Description: string
// }

// interface Order {
//   _id: string
//   id: string
//   orderType: string
//   dataTypeOrder: string
//   cart: OrderItem[]
//   fullname: string
//   timestamp: string
//   createdAt: string
//   status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
//   [key: string]: any
// }

// interface OrdersByStatus {
//   pending?: Order[]
//   processing?: Order[]
//   paused?: Order[]
//   finished?: Order[]
//   cancelled?: Order[]
//   delivered?: Order[]
// }

// interface OrdersScreenStaffProps {
//   ordersByStatus: OrdersByStatus
//   onOrderAction: (action: string, order: Order) => void | Promise<void>
// }

// const statusConfig = {
//   pending: {
//     color: "warning",
//     icon: <Pending />,
//     label: "Pendientes",
//     actions: [{ action: "start", label: "Tomar orden", color: "info", icon: <PlayArrow /> }],
//   },
//   processing: {
//     color: "info",
//     icon: <LocalDining />,
//     label: "En Proceso",
//     actions: [
//       { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
//       { action: "complete", label: "Completar", color: "success", icon: <CheckCircle /> },
//       { action: "cancel", label: "Cancelar", color: "error", icon: <Cancel /> },
//     ],
//   },
//   paused: {
//     color: "default",
//     icon: <Pause />,
//     label: "Pausadas",
//     actions: [
//       { action: "resume", label: "Continuar", color: "info", icon: <PlayArrow /> },
//       { action: "complete", label: "Completar", color: "success", icon: <CheckCircle /> },
//       { action: "cancel", label: "Cancelar", color: "error", icon: <Cancel /> },
//     ],
//   },
//   finished: {
//     color: "success",
//     icon: <CheckCircle />,
//     label: "Completadas",
//     actions: [{ action: "deliver", label: "Entregar", color: "secondary", icon: <LocalShipping /> }],
//   },
//   delivered: {
//     color: "secondary",
//     icon: <LocalShipping />,
//     label: "Entregadas",
//     actions: [],
//   },
//   cancelled: {
//     color: "error",
//     icon: <Cancel />,
//     label: "Canceladas",
//     actions: [],
//   },
// }

// const OrdersScreenStaff = ({ ordersByStatus, onOrderAction }: OrdersScreenStaffProps) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))

//   // Filter out empty status categories
//   const activeStatuses = Object.entries(ordersByStatus)
//     .filter(([_, orders]) => orders && orders.length > 0)
//     .map(([status]) => status as keyof typeof statusConfig)

//   return (
//     <Box
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//       }}
//     >
//       <Grid
//         container
//         spacing={1}
//         sx={{
//           p: { xs: 0.5, sm: 1 },
//           height: "100%",
//           overflow: "hidden",
//           flexWrap: { xs: "nowrap", md: "wrap" },
//         }}
//       >
//         {activeStatuses.length === 0 ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "100%",
//               height: "100%",
//               p: 4,
//             }}
//           >
//             <Typography variant="body1" color="text.secondary">
//               No hay órdenes para mostrar
//             </Typography>
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               width: "100%",
//               height: "100%",
//               overflow: "auto",
//               flexDirection: { xs: "row", md: "column" },
//             }}
//           >
//             <Grid
//               container
//               spacing={1}
//               sx={{
//                 flexWrap: { xs: "nowrap", md: "wrap" },
//                 overflow: "visible",
//                 width: { xs: `${activeStatuses.length * 90}%`, md: "100%" },
//                 minWidth: { xs: `${activeStatuses.length * 280}px`, md: "auto" },
//               }}
//             >
//               {activeStatuses.map((status) => (
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   lg={4}
//                   key={status}
//                   sx={{
//                     height: { xs: "100%", md: "auto" },
//                     minWidth: { xs: "280px", md: "auto" },
//                   }}
//                 >
//                   <StatusColumn status={status} orders={ordersByStatus[status] || []} onOrderAction={onOrderAction} />
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )}
//       </Grid>
//     </Box>
//   )
// }

// interface StatusColumnProps {
//   status: keyof typeof statusConfig
//   orders: Order[]
//   onOrderAction: (action: string, order: Order) => void | Promise<void>
// }

// const StatusColumn = ({ status, orders, onOrderAction }: StatusColumnProps) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const config = statusConfig[status]

//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         height: "100%",
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         borderTop: 3,
//         borderColor: `${
//           status === "pending"
//             ? "warning.main"
//             : status === "processing"
//               ? "info.main"
//               : status === "paused"
//                 ? "text.disabled"
//                 : status === "finished"
//                   ? "success.main"
//                   : status === "delivered"
//                     ? "secondary.main"
//                     : "error.main"
//         }`,
//       }}
//     >
//       <Box
//         sx={{
//           p: 1.5,
//           bgcolor: "background.paper",
//           display: "flex",
//           alignItems: "center",
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         {config.icon}
//         <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1, fontWeight: 500 }}>
//           {config.label}
//         </Typography>
//         <Badge
//           badgeContent={orders.length}
//           color={config.color === "default" ? "default" : (config.color as any)}
//           showZero
//         />
//       </Box>

//       <Box
//         sx={{
//           overflow: "auto",
//           flexGrow: 1,
//           maxHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 220px)" },
//         }}
//       >
//         <List disablePadding>
//           {orders.map((order) => (
//             <OrderItem key={order._id} order={order} status={status} onOrderAction={onOrderAction} />
//           ))}
//         </List>
//       </Box>
//     </Paper>
//   )
// }

// interface OrderItemProps {
//   order: Order
//   status: keyof typeof statusConfig
//   onOrderAction: (action: string, order: Order) => void | Promise<void>
// }

// const OrderItem = ({ order, status, onOrderAction }: OrderItemProps) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const config = statusConfig[status]
//   const totalItems = order.cart.reduce((sum, item) => sum + item.quantity, 0)

//   const total = order.cart.reduce((sum, item) => {
//     const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
//     return sum + item.price * item.quantity + extrasTotal
//   }, 0)

//   const formattedTime = new Date(order.timestamp).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   })

//   return (
//     <>
//       <ListItem alignItems="flex-start" sx={{ p: 1 }}>
//         <Card sx={{ width: "100%" }}>
//           <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//               <Typography variant="subtitle2" fontWeight="bold">
//                 #{order.id}
//               </Typography>
//               <Chip
//                 size="small"
//                 label={order.orderType}
//                 color={config.color === "default" ? "default" : (config.color as any)}
//               />
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//               <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
//               <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
//                 {order.fullname}
//               </Typography>
//               <Box sx={{ flexGrow: 1 }} />
//               <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
//               <Typography variant="body2">{formattedTime}</Typography>
//             </Box>

//             <Divider sx={{ my: 1 }} />

//             <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: "0.8rem" }}>
//               Items ({totalItems})
//             </Typography>

//             <List dense disablePadding>
//               {order.cart.map((item) => (
//                 <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
//                   <ListItemText
//                     primary={
//                       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                         <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
//                           <strong>{item.quantity}x</strong> {item.name}
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
//                           ${item.price.toFixed(2)}
//                         </Typography>
//                       </Box>
//                     }
//                     secondary={
//                       item.extras && item.extras.length > 0 ? (
//                         <List dense disablePadding sx={{ ml: 2 }}>
//                           {item.extras.map((extra, idx) => (
//                             <ListItem key={idx} disablePadding sx={{ py: 0 }}>
//                               <ListItemText
//                                 primary={
//                                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                                     <Typography variant="caption">+ {extra.name}</Typography>
//                                     <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
//                                   </Box>
//                                 }
//                               />
//                             </ListItem>
//                           ))}
//                         </List>
//                       ) : null
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>

//             <Divider sx={{ my: 1 }} />

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: isMobile ? "column" : "row",
//               }}
//             >
//               <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
//                 Total: ${total.toFixed(2)}
//               </Typography>

//               <Stack
//                 direction="row"
//                 spacing={0.5}
//                 sx={{
//                   width: isMobile ? "100%" : "auto",
//                   justifyContent: isMobile ? "space-between" : "flex-end",
//                 }}
//               >
//                 {config.actions.map((action) => (
//                   <Button
//                     key={action.action}
//                     size="small"
//                     variant="contained"
//                     color={action.color as any}
//                     startIcon={!isMobile && action.icon}
//                     onClick={() => onOrderAction(action.action, order)}
//                     sx={{
//                       minWidth: 0,
//                       px: { xs: 1, sm: 1.5 },
//                       py: 0.5,
//                       fontSize: "0.7rem",
//                     }}
//                   >
//                     {isMobile ? action.icon : action.label}
//                   </Button>
//                 ))}
//               </Stack>
//             </Box>
//           </CardContent>
//         </Card>
//       </ListItem>
//       <Divider />
//     </>
//   )
// }

// export default OrdersScreenStaff


"use client"
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Button,
  Grid,
  Paper,
  Stack,
  Badge,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import {
  AccessTime,
  CheckCircle,
  Cancel,
  LocalShipping,
  Pending,
  PlayArrow,
  Pause,
  LocalDining,
  Person,
  ExpandMore,
  ShoppingCart,
} from "@mui/icons-material"

interface OrderItem {
  id: string
  itemId: number
  name: string
  price: number
  quantity: number
  extras?: Array<{
    name: string
    price: number
  }>
  extrasTotal?: number
  Description: string
  comments?: any
}

interface Order {
  _id: string
  id: string
  orderType: string
  dataTypeOrder: string
  cart: OrderItem[]
  fullname: string
  timestamp: string
  createdAt: string
  status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
  [key: string]: any
}

interface OrdersByStatus {
  pending?: Order[]
  processing?: Order[]
  paused?: Order[]
  finished?: Order[]
  cancelled?: Order[]
  delivered?: Order[]
}

interface OrdersScreenStaffProps {
  ordersByStatus: OrdersByStatus
  onOrderAction: (action: string, order: Order) => void | Promise<void>
  viewMode?: "column" | "list"
}

const statusConfig = {
  pending: {
    color: "warning",
    icon: <Pending />,
    label: "Pendientes",
    actions: [{ action: "start", label: "Tomar orden", color: "info", icon: <PlayArrow /> }],
  },
  processing: {
    color: "info",
    icon: <LocalDining />,
    label: "En Proceso",
    actions: [
      { action: "pause", label: "Pausar", color: "warning", icon: <Pause /> },
      { action: "complete", label: "Completar", color: "success", icon: <CheckCircle /> },
      { action: "cancel", label: "Cancelar", color: "error", icon: <Cancel /> },
    ],
  },
  paused: {
    color: "default",
    icon: <Pause />,
    label: "Pausadas",
    actions: [
      { action: "resume", label: "Continuar", color: "info", icon: <PlayArrow /> },
      { action: "complete", label: "Completar", color: "success", icon: <CheckCircle /> },
      { action: "cancel", label: "Cancelar", color: "error", icon: <Cancel /> },
    ],
  },
  finished: {
    color: "success",
    icon: <CheckCircle />,
    label: "Completadas",
    actions: [{ action: "deliver", label: "Entregar", color: "secondary", icon: <LocalShipping /> }],
  },
  delivered: {
    color: "secondary",
    icon: <LocalShipping />,
    label: "Entregadas",
    actions: [],
  },
  cancelled: {
    color: "error",
    icon: <Cancel />,
    label: "Canceladas",
    actions: [],
  },
}

const OrdersScreenStaff = ({ ordersByStatus, onOrderAction, viewMode = "column" }: OrdersScreenStaffProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // Filter out empty status categories
  const activeStatuses = Object.entries(ordersByStatus)
    .filter(([_, orders]) => orders && orders.length > 0)
    .map(([status]) => status as keyof typeof statusConfig)

  // Render list view for mobile
  if (viewMode === "list") {
    return <OrdersListView ordersByStatus={ordersByStatus} onOrderAction={onOrderAction} />
  }

  // Render column view (default)
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          p: { xs: 0.5, sm: 1 },
          height: "100%",
          overflow: "hidden",
          flexWrap: { xs: "nowrap", md: "wrap" },
        }}
      >
        {activeStatuses.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              p: 4,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No hay órdenes para mostrar
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "auto",
              flexDirection: { xs: "row", md: "column" },
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                flexWrap: { xs: "nowrap", md: "wrap" },
                overflow: "visible",
                width: { xs: `${activeStatuses.length * 90}%`, md: "100%" },
                minWidth: { xs: `${activeStatuses.length * 280}px`, md: "auto" },
              }}
            >
              {activeStatuses.map((status) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={status}
                  sx={{
                    height: { xs: "100%", md: "auto" },
                    minWidth: { xs: "280px", md: "auto" },
                  }}
                >
                  <StatusColumn status={status} orders={ordersByStatus[status] || []} onOrderAction={onOrderAction} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
    </Box>
  )
}

// List view for mobile
const OrdersListView = ({ ordersByStatus, onOrderAction }: OrdersScreenStaffProps) => {
  const theme = useTheme()

  // Combine all orders and sort by status priority
  const statusPriority = {
    pending: 1,
    processing: 2,
    paused: 3,
    finished: 4,
    delivered: 5,
    cancelled: 6,
  }

  const allOrders = Object.entries(ordersByStatus)
    .flatMap(([status, orders]) =>
      (orders || []).map((order: any) => ({
        ...order,
        statusPriority: statusPriority[status as keyof typeof statusPriority] || 99,
      })),
    )
    .sort(
      (a, b) =>
        a.statusPriority - b.statusPriority || new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

  if (allOrders.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          p: 4,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No hay órdenes para mostrar
        </Typography>
      </Box>
    )
  }

  return (
    <List sx={{ width: "100%", p: 0, overflow: "auto" }}>
      {allOrders.map((order) => (
        <OrderListItem key={order._id} order={order} onOrderAction={onOrderAction} />
      ))}
    </List>
  )
}

// List item for mobile view
const OrderListItem = ({
  order,
  onOrderAction,
}: { order: Order & { statusPriority?: number }; onOrderAction: OrdersScreenStaffProps["onOrderAction"] }) => {
  const theme = useTheme()
  const status = order.status.toLowerCase() as keyof typeof statusConfig
  const config = statusConfig[status]

  const totalItems = order.cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = order.cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
    return sum + item.price * item.quantity + extrasTotal
  }, 0)

  const formattedTime = new Date(order.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Accordion
      disableGutters
      elevation={1}
      sx={{
        mb: 1,
        "&:before": { display: "none" },
        borderLeft: 3,
        borderColor: `${status === "pending"
          ? "warning.main"
          : status === "processing"
            ? "info.main"
            : status === "paused"
              ? "text.disabled"
              : status === "finished"
                ? "success.main"
                : status === "delivered"
                  ? "secondary.main"
                  : "error.main"
          }`,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          minHeight: 56,
          px: 2,
          py: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{config.icon}</Box>

          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" fontWeight="bold">
                #{order.id}
              </Typography>
              <Chip
                size="small"
                label={order.orderType}
                color={config.color === "default" ? "default" : (config.color as any)}
                sx={{ height: 20, fontSize: "0.7rem" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "0.9rem" }} />
              <Typography variant="body2" noWrap sx={{ maxWidth: "120px", fontSize: "0.8rem" }}>
                {order.fullname}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, py: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="caption" display="block" color="text.secondary">
            <AccessTime fontSize="inherit" sx={{ mr: 0.5, verticalAlign: "text-bottom" }} />
            {formattedTime}
          </Typography>

          <Typography variant="caption" display="block" color="text.secondary">
            <ShoppingCart fontSize="inherit" sx={{ mr: 0.5, verticalAlign: "text-bottom" }} />
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Typography>
        </Box>

        <List dense disablePadding sx={{ mb: 1 }}>
          {order.cart.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      <strong>{item.quantity}x</strong> {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                }
                secondary={
                  item.extras && item.extras.length > 0 ? (
                    <List dense disablePadding sx={{ ml: 2 }}>
                      {item.extras.map((extra, idx) => (
                        <ListItem key={idx} disablePadding sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">+ {extra.name}</Typography>
                                <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : null
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          {config.actions.map((action) => (
            <Button
              key={action.action}
              size="small"
              variant="contained"
              color={action.color as any}
              startIcon={action.icon}
              onClick={() => onOrderAction(action.action, order)}
              sx={{
                py: 0.5,
                fontSize: "0.7rem",
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

interface StatusColumnProps {
  status: keyof typeof statusConfig
  orders: Order[]
  onOrderAction: (action: string, order: Order) => void | Promise<void>
}

const StatusColumn = ({ status, orders, onOrderAction }: StatusColumnProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const config = statusConfig[status]

  return (
    <Paper
      elevation={2}
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderTop: 3,
        borderColor: `${status === "pending"
          ? "warning.main"
          : status === "processing"
            ? "info.main"
            : status === "paused"
              ? "text.disabled"
              : status === "finished"
                ? "success.main"
                : status === "delivered"
                  ? "secondary.main"
                  : "error.main"
          }`,
      }}
    >
      <Box
        sx={{
          p: 1.5,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {config.icon}
        <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1, fontWeight: 500 }}>
          {config.label}
        </Typography>
        <Badge
          badgeContent={orders.length}
          color={config.color === "default" ? "default" : (config.color as any)}
          showZero
        />
      </Box>

      <Box
        sx={{
          overflow: "auto",
          flexGrow: 1,
          maxHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 220px)" },
        }}
      >
        <List disablePadding>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} status={status} onOrderAction={onOrderAction} />
          ))}
        </List>
      </Box>
    </Paper>
  )
}

interface OrderItemProps {
  order: Order
  status: keyof typeof statusConfig
  onOrderAction: (action: string, order: Order) => void | Promise<void>
}

const OrderItem = ({ order, status, onOrderAction }: OrderItemProps) => {
  console.log("🚀 ~ OrderItem ~ order:", order)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const config = statusConfig[status]
  const totalItems = order.cart.reduce((sum, item) => sum + item.quantity, 0)

  const total = order.cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
    return sum + item.price * item.quantity + extrasTotal
  }, 0)

  const formattedTime = new Date(order.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ p: 1 }}>
        <Card sx={{ width: "100%" }}>
          <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                #{order.id}
              </Typography>
              <Chip
                size="small"
                label={order.orderType}
                color={config.color === "default" ? "default" : (config.color as any)}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Person fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
              <Typography variant="body2" noWrap sx={{ maxWidth: "150px" }}>
                {order.fullname}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <AccessTime fontSize="small" sx={{ mr: 0.5, opacity: 0.7, fontSize: "1rem" }} />
              <Typography variant="body2">{formattedTime}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: "0.8rem" }}>
              Items ({totalItems})
            </Typography>

            <List dense disablePadding>
              {order.cart.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ py: 0.25 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                          <strong>{item.quantity}x</strong> {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.8rem", ml: 1, flexShrink: 0 }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      item.extras && item.extras.length > 0 ? (
                        <List dense disablePadding sx={{ ml: 2 }}>
                          {item.extras.map((extra, idx) => (

                            <ListItem key={idx} disablePadding sx={{ py: 0 }}>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="caption">+ {extra.name}</Typography>
                                    <Typography variant="caption">${extra.price.toFixed(2)}</Typography>
                                  </Box>
                                }
                              />

                            </ListItem>
                          ))}
                          {
                            (item?.comments) &&
                            <span>
                              `Nota: ${item?.comments}`
                            </span>

                          }
                        </List>
                      ) : null
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: isMobile ? 1 : 0 }}>
                Total: ${total.toFixed(2)}
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "space-between" : "flex-end",
                }}
              >
                {config.actions.map((action) => (
                  <Button
                    key={action.action}
                    size="small"
                    variant="contained"
                    color={action.color as any}
                    startIcon={!isMobile && action.icon}
                    onClick={() => onOrderAction(action.action, order)}
                    sx={{
                      minWidth: 0,
                      px: { xs: 1, sm: 1.5 },
                      py: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    {isMobile ? action.icon : action.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </ListItem>
      <Divider />
    </>
  )
}

export default OrdersScreenStaff

