import React, { useState } from 'react';
import { Button } from '@mui/material';
import ReusableModal from '../ReusableModal/ReusableModal';
import styles from './OrderSpeeds.module.css'
import ShowItemMenu from '../ShowItemMenu/ShowItemMenu';
interface OrderSpeedsProps {
    permission?: boolean; // Prop para controlar si el modal se muestra
    title: string; // Título del modal
    children: React.ReactNode; // Contenido del modal
    showButtons?: boolean; // Prop para controlar la visibilidad de los botones
    fullScreen?: boolean;

    searchTerm: any;
    setSearchTerm: any;

    orders: any[];
    addOrder: any;
    editOrder: any;
    deleteOrder: any;

    memoizedSectionsPromotions: any[] | any;
    memoizedSections: any[] | any;
}

const OrderSpeeds: React.FC<OrderSpeedsProps> = ({
    permission, title, children, showButtons = true,
    fullScreen, orders, addOrder, editOrder, deleteOrder,
    searchTerm, setSearchTerm,
    memoizedSectionsPromotions, memoizedSections
}) => {
    console.log("🚀 ~  memoizedSectionsPromotions, memoizedSections:", memoizedSectionsPromotions, memoizedSections)
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal






    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            {/* Botón para abrir el modal */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal} // Abre el modal al hacer clic
            >
                Pedido Rápido
            </Button>

            {/* Renderizado condicional del modal */}
            {permission && (
                <ReusableModal
                    open={isModalOpen} // Controla si el modal está abierto o cerrado
                    onClose={handleCloseModal} // Función para cerrar el modal
                    title={title} // Título del modal
                    showButtons={showButtons} // Controla la visibilidad de los botones
                    fullScreen={fullScreen}
                >
                    <br />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar en el menú..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        data-cy="Search"
                    />
                    <ShowItemMenu
                        title="todo"
                        memoData={memoizedSections}
                    />

                    {children}
                </ReusableModal>
            )}
        </div>
    );
};

export default OrderSpeeds;