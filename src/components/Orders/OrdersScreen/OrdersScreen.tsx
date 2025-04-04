
// "use client"

// import { useEffect } from "react"
// import { motion, AnimatePresence, useAnimation } from "framer-motion"
// import styles from "./OrdersScreen.module.css"

// interface Order {
//   _id: string
//   id: string
//   orderType: string
//   dataTypeOrder: string
//   cart: Array<{
//     id: string
//     itemId: number
//     name: string
//     price: number
//     quantity: number
//     extras?: Array<{
//       name: string
//       price: number
//     }>
//     extrasTotal?: number
//     Description: string
//   }>
//   fullname: string
//   timestamp: string
//   status: "finished" | "processing" | "cancelled"
//   [key: string]: any
// }

// interface OrdersByStatus {
//   finished?: Order[]
//   processing?: Order[]
//   cancelled?: Order[]
// }

// const OrdersScreen = ({ ordersByStatus }: { ordersByStatus: OrdersByStatus }) => {
//   const finishedOrders = ordersByStatus?.finished || []
//   const processingOrders = ordersByStatus?.processing || []

//   const titleControls = useAnimation()
//   const columnControls = useAnimation()

//   // Sequence animation on load
//   useEffect(() => {
//     const sequence = async () => {
//       await titleControls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.8 },
//       })

//       await columnControls.start({
//         opacity: 1,
//         y: 0,
//         transition: {
//           duration: 0.5,
//           staggerChildren: 0.2,
//         },
//       })
//     }

//     sequence()
//   }, [titleControls, columnControls])

//   return (
//     <div className={styles.container}>
//       {/* Video background - direct implementation that works */}
//       <video autoPlay muted loop playsInline className={styles.heroVideo}>
//         <source src="/videos/menu.mp4" type="video/mp4" />
//         Your browser does not support videos.
//       </video>

//       {/* Overlay with gradient */}
//       <motion.div
//         className={styles.overlay}
//         initial={{ opacity: 0 }}
//         animate={{
//           opacity: 1,
//           transition: { duration: 1.5 },
//         }}
//       />

//       {/* Title with animated underline */}
//       <motion.div className={styles.titleContainer} initial={{ opacity: 0, y: -30 }} animate={titleControls}>
//         <motion.h1 className={styles.title}>
//           <motion.span
//             className={styles.titleUnderline}
//             initial={{ width: "0%" }}
//             animate={{
//               width: "100%",
//               transition: {
//                 delay: 0.5,
//                 duration: 1.2,
//                 ease: [0.25, 1, 0.5, 1],
//               },
//             }}
//           >
//             Órdenes en Tiempo Real
//           </motion.span>
//         </motion.h1>
//         <motion.p
//           className={styles.subtitle}
//           initial={{ opacity: 0 }}
//           animate={{
//             opacity: 0.8,
//             transition: { delay: 1, duration: 1 },
//           }}
//         >
//           Monitor de pedidos en vivo
//         </motion.p>
//       </motion.div>

//       {/* Columns container */}
//       <motion.div className={styles.columnsContainer} initial={{ opacity: 0, y: 30 }} animate={columnControls}>
//         {/* Finished orders column */}
//         <motion.div
//           className={styles.column}
//           initial={{ opacity: 0, x: -50 }}
//           animate={{
//             opacity: 1,
//             x: 0,
//             transition: {
//               type: "spring",
//               stiffness: 100,
//               delay: 0.3,
//             },
//           }}
//           whileHover={{
//             y: -5,
//             boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
//             transition: { duration: 0.3 },
//           }}
//         >
//           <motion.div className={styles.columnHeader}>
//             <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
//               <motion.span
//                 animate={{
//                   rotate: [0, 10, 0],
//                   scale: [1, 1.2, 1],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   repeatDelay: 5,
//                 }}
//               >
//                 ✅
//               </motion.span>
//               Completadas
//               <motion.span
//                 className={styles.orderCount}
//                 initial={{ scale: 0 }}
//                 animate={{
//                   scale: 1,
//                   transition: {
//                     type: "spring",
//                     delay: 1.2,
//                   },
//                 }}
//               >
//                 ({finishedOrders.length})
//               </motion.span>
//             </motion.h2>
//             <motion.div
//               className={styles.columnPulse}
//               animate={{
//                 boxShadow: [
//                   "0 0 0 rgba(76, 175, 80, 0)",
//                   "0 0 20px rgba(76, 175, 80, 0.3)",
//                   "0 0 0 rgba(76, 175, 80, 0)",
//                 ],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 repeatType: "loop",
//               }}
//             />
//           </motion.div>

//           <div className={styles.scrollContainer}>
//             <AnimatePresence>
//               {finishedOrders.map((order, index) => (
//                 <OrderCard key={order._id} order={order} status="finished" delay={0.5 + index * 0.1} />
//               ))}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         {/* Processing orders column */}
//         <motion.div
//           className={styles.column}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{
//             opacity: 1,
//             x: 0,
//             transition: {
//               type: "spring",
//               stiffness: 100,
//               delay: 0.5,
//             },
//           }}
//           whileHover={{
//             y: -5,
//             boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
//             transition: { duration: 0.3 },
//           }}
//         >
//           <motion.div className={styles.columnHeader}>
//             <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
//               <motion.span
//                 animate={{
//                   rotate: [0, -10, 10, 0],
//                   scale: [1, 1.1, 1.2, 1],
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Number.POSITIVE_INFINITY,
//                   repeatType: "loop",
//                 }}
//               >
//                 🚀
//               </motion.span>
//               En Proceso
//               <motion.span
//                 className={styles.orderCount}
//                 initial={{ scale: 0 }}
//                 animate={{
//                   scale: 1,
//                   transition: {
//                     type: "spring",
//                     delay: 1.4,
//                   },
//                 }}
//               >
//                 ({processingOrders.length})
//               </motion.span>
//             </motion.h2>
//             <motion.div
//               className={styles.columnPulse}
//               animate={{
//                 boxShadow: [
//                   "0 0 0 rgba(255, 193, 7, 0)",
//                   "0 0 20px rgba(255, 193, 7, 0.3)",
//                   "0 0 0 rgba(255, 193, 7, 0)",
//                 ],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Number.POSITIVE_INFINITY,
//                 repeatType: "loop",
//               }}
//             />
//           </motion.div>

//           <div className={styles.scrollContainer}>
//             <AnimatePresence>
//               {processingOrders.map((order, index) => (
//                 <OrderCard key={order._id} order={order} status="processing" delay={0.7 + index * 0.1} />
//               ))}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// const OrderCard = ({
//   order,
//   status,
//   delay = 0,
// }: { order: Order; status: "finished" | "processing" | "cancelled"; delay?: number }) => {
//   const total = order.cart.reduce((sum, item) => {
//     const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
//     return sum + item.price * item.quantity + extrasTotal
//   }, 0)

//   // Staggered animation for items
//   const itemVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: (i: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: delay + i * 0.05,
//         duration: 0.3,
//       },
//     }),
//   }

//   return (
//     <motion.div
//       className={`${styles.orderCard} ${styles[status]}`}
//       layout
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{
//         opacity: 0,
//         scale: 0.9,
//         x: status === "finished" ? -50 : 50,
//         transition: { duration: 0.3 },
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//         delay: delay,
//       }}
//       whileHover={{
//         y: -5,
//         boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//         scale: 1.02,
//         transition: { duration: 0.2 },
//       }}
//     >
//       <motion.div className={styles.orderHeader} whileHover={{ x: 3 }}>
//         <div className={styles.orderId}>
//           <motion.span
//             className={styles.idBadge}
//             animate={{
//               backgroundColor:
//                 status === "processing" ? ["#ffc107", "#ff9800", "#ffc107"] : ["#4caf50", "#2e7d32", "#4caf50"],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Number.POSITIVE_INFINITY,
//               repeatType: "reverse",
//             }}
//           >
//             #{order.id}
//           </motion.span>
//         </div>
//         <motion.span className={styles.orderType} whileHover={{ scale: 1.1 }}>
//           {order.orderType}
//         </motion.span>
//       </motion.div>

//       <motion.div
//         className={styles.orderBody}
//         initial={{ opacity: 0 }}
//         animate={{
//           opacity: 1,
//           transition: { delay: delay + 0.1 },
//         }}
//       >
//         <div className={styles.customerInfo}>
//           <motion.p className={styles.customerName} whileHover={{ x: 3 }}>
//             <span className={styles.infoIcon}>👤</span> {order.fullname}
//           </motion.p>
//           <motion.p className={styles.orderTime} whileHover={{ x: 3 }}>
//             <span className={styles.infoIcon}>⏱️</span> {new Date(order.timestamp).toLocaleTimeString()}
//           </motion.p>
//         </div>

//         <motion.div
//           className={styles.orderItems}
//           initial={{ opacity: 0 }}
//           animate={{
//             opacity: 1,
//             transition: { delay: delay + 0.2 },
//           }}
//         >
//           <h4 className={styles.itemsTitle}>
//             <motion.span
//               animate={{
//                 rotate: [0, 5, -5, 0],
//                 transition: {
//                   duration: 2,
//                   repeat: Number.POSITIVE_INFINITY,
//                   repeatDelay: 3,
//                 },
//               }}
//             >
//               🍽️
//             </motion.span>
//             Items ({order.cart.reduce((sum, item) => sum + item.quantity, 0)})
//           </h4>
//           <ul>
//             {order.cart.map((item, idx) => (
//               <motion.li key={item.id} custom={idx} variants={itemVariants} initial="hidden" animate="visible">
//                 <div className={styles.itemRow}>
//                   <span className={styles.itemQuantity}>{item.quantity}x</span>
//                   <span className={styles.itemName}>{item.name}</span>
//                   <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
//                 </div>
//                 {item.extras && item.extras.length > 0 && (
//                   <ul className={styles.extrasList}>
//                     {item.extras.map((extra, extraIdx) => (
//                       <motion.li
//                         key={extraIdx}
//                         className={styles.extraItem}
//                         custom={idx + extraIdx + 1}
//                         variants={itemVariants}
//                         initial="hidden"
//                         animate="visible"
//                       >
//                         <span className={styles.plusIcon}>+</span> {extra.name} (${extra.price.toFixed(2)})
//                       </motion.li>
//                     ))}
//                   </ul>
//                 )}
//               </motion.li>
//             ))}
//           </ul>
//         </motion.div>
//       </motion.div>

//       <motion.div
//         className={styles.orderFooter}
//         initial={{ opacity: 0 }}
//         animate={{
//           opacity: 1,
//           transition: { delay: delay + 0.3 },
//         }}
//       >
//         <motion.div
//           className={styles.totalAmount}
//           whileHover={{
//             scale: 1.05,
//             transition: { duration: 0.2 },
//           }}
//         >
//           <span>Total:</span> ${total.toFixed(2)}
//         </motion.div>

//         {status === "processing" && (
//           <motion.div className={styles.actionButtons}>
//             <motion.button
//               className={styles.readyButton}
//               whileTap={{ scale: 0.95 }}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
//               }}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 transition: { delay: delay + 0.4 },
//               }}
//             >
//               ✅ Listo
//             </motion.button>
//             <motion.button
//               className={styles.cancelButton}
//               whileTap={{ scale: 0.95 }}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
//               }}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 transition: { delay: delay + 0.5 },
//               }}
//             >
//               ❌ Cancelar
//             </motion.button>
//           </motion.div>
//         )}
//       </motion.div>
//     </motion.div>
//   )
// }

// export default OrdersScreen



"use client"

import { useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import styles from "./OrdersScreen.module.css"

interface Order {
  _id: string
  id: string
  orderType: string
  dataTypeOrder: string
  cart: Array<{
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
  }>
  fullname: string
  timestamp: string
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

interface OrdersScreenProps {
  ordersByStatus: OrdersByStatus
  onOrderAction: (action: any, order: any) => void
}

const OrdersScreen = ({ ordersByStatus, onOrderAction }: OrdersScreenProps) => {
  const pendingOrders = ordersByStatus?.pending || []
  const processingOrders = ordersByStatus?.processing || []
  const pausedOrders = ordersByStatus?.paused || []
  const finishedOrders = ordersByStatus?.finished || []
  const cancelledOrders = ordersByStatus?.cancelled || []
  const deliveredOrders = ordersByStatus?.delivered || []

  const titleControls = useAnimation()
  const columnControls = useAnimation()

  // Sequence animation on load
  useEffect(() => {
    const sequence = async () => {
      await titleControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      })

      await columnControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          staggerChildren: 0.2,
        },
      })
    }

    sequence()
  }, [titleControls, columnControls])

  return (
    <div className={styles.container}>
      {/* Video background */}
      <video autoPlay muted loop playsInline className={styles.heroVideo}>
        <source src="/videos/menu.mp4" type="video/mp4" />
        Your browser does not support videos.
      </video>

      {/* Overlay with gradient */}
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1.5 },
        }}
      />

      {/* Title with animated underline */}
      <motion.div className={styles.titleContainer} initial={{ opacity: 0, y: -30 }} animate={titleControls}>
        <motion.h1 className={styles.title}>
          <motion.span
            className={styles.titleUnderline}
            initial={{ width: "0%" }}
            animate={{
              width: "100%",
              transition: {
                delay: 0.5,
                duration: 1.2,
                ease: [0.25, 1, 0.5, 1],
              },
            }}
          >
            Órdenes en Tiempo Real
          </motion.span>
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.8,
            transition: { delay: 1, duration: 1 },
          }}
        >
          Monitor de pedidos en vivo
        </motion.p>
      </motion.div>

      {/* Columns container */}
      <motion.div className={styles.columnsContainer} initial={{ opacity: 0, y: 30 }} animate={columnControls}>
        {/* Pending orders column */}
        {pendingOrders.length > 0 && (
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              },
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div className={styles.columnHeader}>
              <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  ⏳
                </motion.span>
                Pendientes
                <motion.span
                  className={styles.orderCount}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      delay: 1.0,
                    },
                  }}
                >
                  ({pendingOrders.length})
                </motion.span>
              </motion.h2>
              <motion.div
                className={styles.columnPulse}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(255, 193, 7, 0)",
                    "0 0 20px rgba(255, 193, 7, 0.3)",
                    "0 0 0 rgba(255, 193, 7, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            <div className={styles.scrollContainer}>
              <AnimatePresence>
                {pendingOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    status="pending"
                    delay={0.3 + index * 0.1}
                    onAction={onOrderAction}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Processing orders column */}
        {(processingOrders.length > 0 || pausedOrders.length > 0) && (
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.4,
              },
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div className={styles.columnHeader}>
              <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
                <motion.span
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  🚀
                </motion.span>
                En Proceso
                <motion.span
                  className={styles.orderCount}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      delay: 1.2,
                    },
                  }}
                >
                  ({processingOrders.length + pausedOrders.length})
                </motion.span>
              </motion.h2>
              <motion.div
                className={styles.columnPulse}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(0, 123, 255, 0)",
                    "0 0 20px rgba(0, 123, 255, 0.3)",
                    "0 0 0 rgba(0, 123, 255, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            <div className={styles.scrollContainer}>
              <AnimatePresence>
                {processingOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    status="processing"
                    delay={0.5 + index * 0.1}
                    onAction={onOrderAction}
                  />
                ))}
                {pausedOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    status="paused"
                    delay={0.5 + (processingOrders.length + index) * 0.1}
                    onAction={onOrderAction}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Finished orders column */}
        {finishedOrders.length > 0 && (
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.6,
              },
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div className={styles.columnHeader}>
              <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
                <motion.span
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 5,
                  }}
                >
                  ✅
                </motion.span>
                Completadas
                <motion.span
                  className={styles.orderCount}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      delay: 1.4,
                    },
                  }}
                >
                  ({finishedOrders.length})
                </motion.span>
              </motion.h2>
              <motion.div
                className={styles.columnPulse}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(40, 167, 69, 0)",
                    "0 0 20px rgba(40, 167, 69, 0.3)",
                    "0 0 0 rgba(40, 167, 69, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            <div className={styles.scrollContainer}>
              <AnimatePresence>
                {finishedOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    status="finished"
                    delay={0.7 + index * 0.1}
                    onAction={onOrderAction}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Delivered orders column */}
        {deliveredOrders.length > 0 && (
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.8,
              },
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div className={styles.columnHeader}>
              <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
                <motion.span
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 5,
                  }}
                >
                  🚚
                </motion.span>
                Entregadas
                <motion.span
                  className={styles.orderCount}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      delay: 1.6,
                    },
                  }}
                >
                  ({deliveredOrders.length})
                </motion.span>
              </motion.h2>
              <motion.div
                className={styles.columnPulse}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(111, 66, 193, 0)",
                    "0 0 20px rgba(111, 66, 193, 0.3)",
                    "0 0 0 rgba(111, 66, 193, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            <div className={styles.scrollContainer}>
              <AnimatePresence>
                {deliveredOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    status="delivered"
                    delay={0.9 + index * 0.1}
                    onAction={onOrderAction}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Cancelled orders column */}
        {cancelledOrders.length > 0 && (
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: 1.0,
              },
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div className={styles.columnHeader}>
              <motion.h2 className={styles.columnTitle} whileHover={{ scale: 1.03 }}>
                <motion.span
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 5,
                  }}
                >
                  ❌
                </motion.span>
                Canceladas
                <motion.span
                  className={styles.orderCount}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      delay: 1.8,
                    },
                  }}
                >
                  ({cancelledOrders.length})
                </motion.span>
              </motion.h2>
              <motion.div
                className={styles.columnPulse}
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(220, 53, 69, 0)",
                    "0 0 20px rgba(220, 53, 69, 0.3)",
                    "0 0 0 rgba(220, 53, 69, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </motion.div>

            <div className={styles.scrollContainer}>
              <AnimatePresence>
                {cancelledOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    status="cancelled"
                    delay={1.1 + index * 0.1}
                    onAction={onOrderAction}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

interface OrderCardProps {
  order: Order
  status: "pending" | "processing" | "paused" | "finished" | "cancelled" | "delivered"
  delay?: number
  onAction: (action: string, order: Order) => void
}

const OrderCard = ({ order, status, delay = 0, onAction }: OrderCardProps) => {
  const total = order.cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((eSum, extra) => eSum + extra.price, 0) || 0
    return sum + item.price * item.quantity + extrasTotal
  }, 0)

  // Staggered animation for items
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: delay + i * 0.05,
        duration: 0.3,
      },
    }),
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'paused': return '#6c757d';
      case 'finished': return '#28a745';
      case 'delivered': return '#6f42c1';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  }

  const getActions = () => {
    const actions = [];

    if (status === 'pending') {
      actions.push({
        action: 'start',
        label: 'Tomar orden',
        color: '#17a2b8',
        icon: '▶️'
      });
    }

    if (status === 'processing') {
      actions.push({
        action: 'pause',
        label: 'Pausar orden',
        color: '#ffc107',
        icon: '⏸️'
      });
      actions.push({
        action: 'complete',
        label: 'Completar orden',
        color: '#28a745',
        icon: '✅'
      });
    }

    if (status === 'paused') {
      actions.push({
        action: 'resume',
        label: 'Continuar',
        color: '#17a2b8',
        icon: '▶️'
      });
      actions.push({
        action: 'complete',
        label: 'Completar orden',
        color: '#28a745',
        icon: '✅'
      });
    }

    if (status === 'finished') {
      actions.push({
        action: 'deliver',
        label: 'Marcar como entregado',
        color: '#6f42c1',
        icon: '🚚'
      });
    }

    if (['processing', 'paused'].includes(status)) {
      actions.push({
        action: 'cancel',
        label: 'Cancelar orden',
        color: '#dc3545',
        icon: '❌'
      });
    }

    return actions;
  };

  const actions = getActions();

  return (
    <motion.div
      className={`${styles.orderCard} ${styles[status]}`}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        x: ['finished', 'delivered'].includes(status) ? -50 : 50,
        transition: { duration: 0.3 },
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: delay,
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div className={styles.orderHeader} whileHover={{ x: 3 }}>
        <div className={styles.orderId}>
          <motion.span
            className={styles.idBadge}
            animate={{
              backgroundColor: [getStatusColor(), `${getStatusColor()}cc`, getStatusColor()],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            #{order.id}
          </motion.span>
        </div>
        <motion.span className={styles.orderType} whileHover={{ scale: 1.1 }}>
          {order.orderType}
        </motion.span>
      </motion.div>

      <motion.div
        className={styles.orderBody}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: delay + 0.1 },
        }}
      >
        <div className={styles.customerInfo}>
          <motion.p className={styles.customerName} whileHover={{ x: 3 }}>
            <span className={styles.infoIcon}>👤</span> {order.fullname}
          </motion.p>
          <motion.p className={styles.orderTime} whileHover={{ x: 3 }}>
            <span className={styles.infoIcon}>⏱️</span> {new Date(order.timestamp).toLocaleTimeString()}
          </motion.p>
        </div>

        <motion.div
          className={styles.orderItems}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: delay + 0.2 },
          }}
        >
          <h4 className={styles.itemsTitle}>
            <motion.span
              animate={{
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                },
              }}
            >
              🍽️
            </motion.span>
            Items ({order.cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h4>
          <ul>
            {order.cart.map((item, idx) => (
              <motion.li key={item.id} custom={idx} variants={itemVariants} initial="hidden" animate="visible">
                <div className={styles.itemRow}>
                  <span className={styles.itemQuantity}>{item.quantity}x</span>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                </div>
                {item.extras && item.extras.length > 0 && (
                  <ul className={styles.extrasList}>
                    {item.extras.map((extra, extraIdx) => (
                      <motion.li
                        key={extraIdx}
                        className={styles.extraItem}
                        custom={idx + extraIdx + 1}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <span className={styles.plusIcon}>+</span> {extra.name} (${extra.price.toFixed(2)})
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.orderFooter}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: delay + 0.3 },
        }}
      >
        <motion.div
          className={styles.totalAmount}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
        >
          <span>Total:</span> ${total.toFixed(2)}
        </motion.div>

        {actions.length > 0 && (
          <motion.div className={styles.actionButtons}>
            {actions.map((action, index) => (
              <motion.button
                key={action.action}
                className={styles.actionButton}
                style={{ backgroundColor: action.color }}
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 15px ${action.color}80`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: delay + 0.4 + index * 0.1 },
                }}
                onClick={() => onAction(action.action, order)}
              >
                {action.icon} {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default OrdersScreen

