
// import React, { useEffect, useState } from 'react';
// import ReusableModal from '../ReusableModal/ReusableModal';
// import { Button, Typography, Grid, Divider, Box, Stack } from '@mui/material';
// import styles from './OrderFlow.module.css'; // Importar el CSS Module

// const OrderItem = ({ item }: { item: any }) => (
//   <Box sx={{ marginBottom: 2 }}>
//     <Typography variant="h6">{item.Name}</Typography>
//     <Typography variant="body1">{item.Description}</Typography>
//     <Typography variant="body2" color="textSecondary">Precio: ${item.Price}</Typography>

//     {item.extra?.length > 0 && (
//       <Box sx={{ marginTop: 1 }}>
//         <Typography variant="subtitle2">Extras:</Typography>
//         {item.extra.map((extra: any, i: number) => (
//           <Typography key={i} variant="body2">
//             {extra.name}: ${extra.price}
//           </Typography>
//         ))}
//       </Box>
//     )}

//     <Typography variant="body2" color="textSecondary">
//       Comentarios: {item.Comments || "Ninguno"}
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//       Tipo de Pedido: {item.Type}
//     </Typography>
//     <Divider sx={{ marginTop: 2 }} />
//   </Box>
// );

// const Orderflow = (props: any) => {
//   const { orders } = props;
//   const [modal1, setModal1] = useState<boolean>(false);

//   useEffect(() => { }, [orders, modal1]);

//   const handleOpenModal = () => {
//     setModal1(true);
//   };

//   const handleCloseModal = () => {
//     setModal1(false);
//   };

//   return (
//     <div>
//       {orders.length > 0 && (
//         <Button
//           onClick={handleOpenModal}
//           variant="contained"
//           color="primary"
//           className={styles.floatingButton}
//         >
//           Finalizar Orden
//         </Button>
//       )}

//       {orders.length > 0 && (
//         <ReusableModal open={modal1} onClose={handleCloseModal} title="Detalles de la Orden"
//         showButtons={false}
//         >
//           <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
//             <Stack spacing={2}>
//               {orders.map((item: any, index: number) => (
//                 <OrderItem key={index} item={item} />
//               ))}
//             </Stack>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//             <Button onClick={handleCloseModal} color="secondary" sx={{ marginRight: 1 }}>
//               Cerrar
//             </Button>
//             <Button onClick={handleCloseModal} color="primary" variant="contained">
//               Confirmar
//             </Button>
//           </Box>
//         </ReusableModal>
//       )}
//     </div>
//   );
// };

// export default Orderflow;



// import React, { useEffect, useState } from 'react';
// import ReusableModal from '../ReusableModal/ReusableModal';
// import { Button, Typography, Divider, Box, Stack, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete'; // Icono de eliminación
// import styles from './OrderFlow.module.css'; // Importar el CSS Module

// // Componente OrderItem con botón de eliminación
// const OrderItem = ({ item, onDelete }: { item: any; onDelete: () => void }) => (
//   <Box sx={{ marginBottom: 2 }}>
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <Typography variant="h6">{item.Name}</Typography>
//       <IconButton onClick={onDelete} color="error" aria-label="delete">
//         <DeleteIcon />
//       </IconButton>
//     </Box>
//     <Typography variant="body1">{item.Description}</Typography>
//     <Typography variant="body2" color="textSecondary">Precio: ${item.Price}</Typography>

//     {item.extra?.length > 0 && (
//       <Box sx={{ marginTop: 1 }}>
//         <Typography variant="subtitle2">Extras:</Typography>
//         {item.extra.map((extra: any, i: number) => (
//           <Typography key={i} variant="body2">
//             {extra.name}: ${extra.price}
//           </Typography>
//         ))}
//       </Box>
//     )}

//     <Typography variant="body2" color="textSecondary">
//       Comentarios: {item.Comments || "Ninguno"}
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//       Tipo de Pedido: {item.Type}
//     </Typography>
//     <Divider sx={{ marginTop: 2 }} />
//   </Box>
// );

// // Componente Orderflow
// const Orderflow = (props: any) => {
//   const { orders, deleteOrder } = props; // Recibir orders y deleteOrder desde props
//   const [modal1, setModal1] = useState<boolean>(false);

//   useEffect(() => { 
//     orders.length==0 && setModal1(false);
//     // orders.length>0 && setModal1(true);
//   }, [orders, modal1]);

//   const handleOpenModal = () => {
//     setModal1(true);
//   };

//   const handleCloseModal = () => {
//     setModal1(false);
//   };

//   return (
//     <div>
//       {orders.length > 0 && (
//         <Button
//           onClick={handleOpenModal}
//           variant="contained"
//           color="primary"
//           className={styles.floatingButton}
//         >
//           Finalizar Orden
//         </Button>
//       )}

//       {orders.length > 0 && (
//         <ReusableModal open={modal1} onClose={handleCloseModal} title="Detalles de la Orden" showButtons={false}>
//           <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
//             <Stack spacing={2}>
//               {orders.map((item: any, index: number) => (
//                 <OrderItem
//                   key={item.id} // Usar el id de la orden como clave
//                   item={item}
//                   onDelete={() => deleteOrder(item.id)} // Pasar la función de eliminación
//                 />
//               ))}
//             </Stack>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//             <Button onClick={handleCloseModal} color="secondary" sx={{ marginRight: 1 }}>
//               Cerrar
//             </Button>
//             <Button onClick={handleCloseModal} color="primary" variant="contained">
//               Confirmar
//             </Button>
//           </Box>
//         </ReusableModal>
//       )}
//     </div>
//   );
// };

// export default Orderflow;



// import React, { useEffect, useState } from 'react';
// import ReusableModal from '../ReusableModal/ReusableModal';
// import { Button, Typography, Divider, Box, Stack, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit'; // Icono de edición
// import styles from './OrderFlow.module.css';
// import CheckboxMaterialUI from '../CheckboxMaterialUI/CheckboxMaterialUI';

// // Componente OrderItem con botón de eliminación y edición
// const OrderItem = ({ item, onDelete, onEdit }: { item: any; onDelete: () => void; onEdit: () => void }) => (
//   <Box sx={{ marginBottom: 2 }}>
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <Typography variant="h6">{item.Name}</Typography>
//       <Box>
//         <IconButton onClick={onEdit} color="primary" aria-label="edit">
//           <EditIcon />
//         </IconButton>
//         <IconButton onClick={onDelete} color="error" aria-label="delete">
//           <DeleteIcon />
//         </IconButton>
//       </Box>
//     </Box>
//     <Typography variant="body1">{item.Description}</Typography>
//     <Typography variant="body2" color="textSecondary">Precio: ${item.Price}</Typography>

//     {item.extra?.length > 0 && (
//       <Box sx={{ marginTop: 1 }}>
//         <Typography variant="subtitle2">Extras:</Typography>
//         {item.extra.map((extra: any, i: number) => (
//           <Typography key={i} variant="body2">
//             {extra.name}: ${extra.price}
//           </Typography>
//         ))}
//       </Box>
//     )}

//     <Typography variant="body2" color="textSecondary">
//       Comentarios: {item.Comments || "Ninguno"}
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//       Tipo de Pedido: {item.Type}
//     </Typography>
//     <Divider sx={{ marginTop: 2 }} />
//   </Box>
// );

// // Componente Orderflow
// const Orderflow = (props: any) => {
//   const { orders, deleteOrder, extraGeneral } = props; // Recibir orders, deleteOrder y extraGeneral desde props
//   const [modal1, setModal1] = useState<boolean>(false);
//   const [editModal, setEditModal] = useState<boolean>(false);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => { 
//     orders.length === 0 && setModal1(false);
//   }, [orders, modal1]);

//   const handleOpenModal = () => {
//     setModal1(true);
//   };

//   const handleCloseModal = () => {
//     setModal1(false);
//   };

//   const handleOpenEditModal = (order: any) => {
//     setSelectedOrder(order);
//     const initialExtras = extraGeneral.reduce((acc: any, curr: any) => {
//       acc[curr.name] = order.extra.some((extra: any) => extra.name === curr.name);
//       return acc;
//     }, {});
//     setSelectedExtras(initialExtras);
//     setEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setEditModal(false);
//     setSelectedOrder(null);
//     setSelectedExtras({});
//   };

//   const handleCheckboxChange = (name: string, isChecked: boolean) => {
//     setSelectedExtras({
//       ...selectedExtras,
//       [name]: isChecked,
//     });
//   };

//   const handleConfirmEdit = () => {
//     const updatedExtras = extraGeneral.filter((extra: any) => selectedExtras[extra.name]);
//     const updatedOrder = {
//       ...selectedOrder,
//       extra: updatedExtras,
//     };
//     props.updateOrder(updatedOrder); // Función para actualizar la orden en el estado principal
//     handleCloseEditModal();
//   };

//   return (
//     <div>
//       {orders.length > 0 && (
//         <Button
//           onClick={handleOpenModal}
//           variant="contained"
//           color="primary"
//           className={styles.floatingButton}
//         >
//           Finalizar Orden
//         </Button>
//       )}

//       {orders.length > 0 && (
//         <ReusableModal open={modal1} onClose={handleCloseModal} title="Detalles de la Orden" showButtons={false}>
//           <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
//             <Stack spacing={2}>
//               {orders.map((item: any, index: number) => (
//                 <OrderItem
//                   key={item.id}
//                   item={item}
//                   onDelete={() => deleteOrder(item.id)}
//                   onEdit={() => handleOpenEditModal(item)}
//                 />
//               ))}
//             </Stack>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//             <Button onClick={handleCloseModal} color="secondary" sx={{ marginRight: 1 }}>
//               Cerrar
//             </Button>
//             <Button onClick={handleCloseModal} color="primary" variant="contained">
//               Confirmar
//             </Button>
//           </Box>
//         </ReusableModal>
//       )}

//       <ReusableModal open={editModal} onClose={handleCloseEditModal} title="Editar Extras" showButtons={false}>
//         <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
//             Selecciona tus extras
//           </Typography>
//           {extraGeneral?.map((extra: any) => (
//             <Box key={extra.name} sx={{ mb: 1 }}>
//               <CheckboxMaterialUI
//                 name={extra.name}
//                 checked={Boolean(selectedExtras[extra.name])}
//                 onChange={handleCheckboxChange}
//                 label={`${extra.name} - $${extra.price}`}
//                 color="primary"
//               />
//             </Box>
//           ))}
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//           <Button onClick={handleCloseEditModal} color="secondary" sx={{ marginRight: 1 }}>
//             Cancelar
//           </Button>
//           <Button onClick={handleConfirmEdit} color="primary" variant="contained">
//             Confirmar
//           </Button>
//         </Box>
//       </ReusableModal>
//     </div>
//   );
// };

// export default Orderflow;



import React, { useEffect, useState } from 'react';
import ReusableModal from '../ReusableModal/ReusableModal';
import { Button, Typography, Divider, Box, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Icono de edición
import styles from './OrderFlow.module.css';
import CheckboxMaterialUI from '../CheckboxMaterialUI/CheckboxMaterialUI';

// Componente OrderItem con botón de eliminación y edición
const OrderItem = ({ item, onDelete, onEdit }: { item: any; onDelete: () => void; onEdit: () => void }) => (
  <Box sx={{ marginBottom: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6">{item.Name}</Typography>
      <Box>
        <IconButton onClick={onEdit} color="primary" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
    <Typography variant="body1">{item.Description}</Typography>
    <Typography variant="body2" color="textSecondary">Precio: ${item.Price}</Typography>

    {item.extra?.length > 0 && (
      <Box sx={{ marginTop: 1 }}>
        <Typography variant="subtitle2">Extras:</Typography>
        {item.extra.map((extra: any, i: number) => (
          <Typography key={i} variant="body2">
            {extra.name}: ${extra.price}
          </Typography>
        ))}
      </Box>
    )}

    <Typography variant="body2" color="textSecondary">
      Comentarios: {item.Comments || "Ninguno"}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Tipo de Pedido: {item.Type}
    </Typography>
    <Divider sx={{ marginTop: 2 }} />
  </Box>
);

// Componente Orderflow
const Orderflow = (props: any) => {
  const { orders, deleteOrder, editOrder } = props; // Recibir orders, deleteOrder y editOrder desde props
  const [modal1, setModal1] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    orders.length === 0 && setModal1(false);
  }, [orders, modal1]);

  const handleOpenModal = () => {
    setModal1(true);
  };

  const handleCloseModal = () => {
    setModal1(false);
  };

  // Abrir el modal de edición y cargar los extras seleccionados
  const handleOpenEditModal = (order: any) => {
    setSelectedOrder(order);
    const initialExtras = order.extraGeneral.reduce((acc: any, curr: any) => {
      acc[curr.name] = order.extra.some((extra: any) => extra.name === curr.name);
      return acc;
    }, {});
    setSelectedExtras(initialExtras);
    setEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setSelectedOrder(null);
    setSelectedExtras({});
  };

  // Manejar cambios en los checkboxes de extras
  const handleCheckboxChange = (name: string, isChecked: boolean) => {
    setSelectedExtras({
      ...selectedExtras,
      [name]: isChecked,
    });
  };

  // Confirmar la edición de extras
  const handleConfirmEdit = () => {
    if (selectedOrder) {
      const updatedExtras = selectedOrder.extraGeneral.filter((extra: any) => selectedExtras[extra.name]);
      const updatedOrder = {
        ...selectedOrder,
        extra: updatedExtras,
      };
      editOrder(updatedOrder); // Actualizar la orden en el estado principal
      handleCloseEditModal();
    }
  };

  return (
    <div className={styles.mainContainer}>
      {orders.length > 0 && (
        <div className={styles.floatingButton}>
          <div
            className={styles.floatingButton}
            onClick={handleOpenModal}
     
          >
            Finalizar Orden
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <ReusableModal open={modal1} onClose={handleCloseModal} title="Detalles de la Orden" showButtons={false}>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
            <Stack spacing={2}>
              {orders.map((item: any, index: number) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  onDelete={() => deleteOrder(item.id)}
                  onEdit={() => handleOpenEditModal(item)}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleCloseModal} color="secondary" sx={{ marginRight: 1 }}>
              Cerrar
            </Button>
            <Button onClick={handleCloseModal} color="primary" variant="contained">
              Confirmar
            </Button>
          </Box>
        </ReusableModal>
      )}

      {/* Modal de edición de extras */}
      <ReusableModal open={editModal} onClose={handleCloseEditModal} title="Editar Extras" showButtons={false}>
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Selecciona tus extras
          </Typography>
          {selectedOrder?.extraGeneral?.map((extra: any) => (
            <Box key={extra.name} sx={{ mb: 1 }}>
              <CheckboxMaterialUI
                name={extra.name}
                checked={Boolean(selectedExtras[extra.name])}
                onChange={handleCheckboxChange}
                label={`${extra.name} - $${extra.price}`}
                color="primary"
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={handleCloseEditModal} color="secondary" sx={{ marginRight: 1 }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmEdit} color="primary" variant="contained">
            Confirmar
          </Button>
        </Box>
      </ReusableModal>
    </div>
  );
};

export default Orderflow;