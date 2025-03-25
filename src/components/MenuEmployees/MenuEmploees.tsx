
import React, { useEffect, useMemo, useState } from 'react';
import { MenuItem, useMenuDataAternative } from '../../../hooks/useMenuData';
import { reduceSeccions } from '@/services/reduceSeccions.services';
import { getLocalhostStorage } from '@/services/localstorage.services';
import useOrderManager from '../../../hooks/useOrderManager';
import useRules from '../../../hooks/useRules';
import Todo from './MenuOrderDetails/OrderSpeedMUI';
import Header from '../layout/header/Header';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { Chat } from '../Chat/Chat';


const MenuEmploees = (props: any) => {
    const [dataGeneral, setDataGeneral] = useState<any | undefined>(undefined);
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
    const [companyNames, setCompanyNames] = useState<string>("");
    const [openResponsive, setOpenResponsive] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [staffData, setStaffData] = useState<any[]>([]);
    const [dataMail, setDataMail] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [menuDatas, setMenuDatas] = useState<any[] | any | undefined>()
    const [promotionsDatas, setPromotionsDatas] = useState<any[]>([]);

    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedData = getLocalhostStorage();
            if (storedData.aud != null) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        };

        // Escuchar cambios en el localStorage
        window.addEventListener("storage", handleStorageChange);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);




    // Cargar datos generales y actualizar estados relacionados
    useEffect(() => {
        if (props?.menuItems) {
            setDataGeneral(props.menuItems);
            setSelectedProfile(props.menuItems.selectedProfile || null);
            setCompanyNames(props.menuItems.companyNames || "");
            setStaffData(props.menuItems?.hojas?.staff || []);
        }
    }, [props?.menuItems]);

    // Manejar cambios en el almacenamiento local
    useEffect(() => {
        const handleStorageChange = async (event: StorageEvent) => {
            if (event.key === 'your-storage-key') {
                const storedData = await getLocalhostStorage();
                updateLoginState(storedData);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Verificar el estado de autenticación al cargar el componente
    useEffect(() => {
        const checkAuth = async () => {
            const storedData = await getLocalhostStorage();
            updateLoginState(storedData);
        };
        checkAuth();
    }, []);

    // Función para actualizar el estado de autenticación
    const updateLoginState = (storedData: any) => {
        if (storedData?.aud == null) {
            setOpenResponsive(true);
        } else {
            setIsLogin(true);
            setDataMail(storedData.email || "");


        }
    };



    // Obtener datos del menú
    const { menuData, backgroundImageSet, promotions, info, schedules, config, isReady, staff } = useMenuDataAternative(
        dataGeneral ?? { hoja: {} },
    );

    // Validar si el correo del empleado está en la lista de staff
    const validationEmploeesMail = () => {
        return staffData.some((item: any) => item.email === dataMail);
    };

    // Reducir secciones del menú y promociones
    const groupedSections: any = useMemo(() => reduceSeccions(menuData), [menuData]);
    const groupedSectionPromotions: any = useMemo(() => reduceSeccions(promotions), [promotions]);

    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager();
    const { hasPermission } = useRules(config, staff);



    useEffect(() => {
        // Transformar groupedSections y guardar en menuDatas
        if (groupedSections && typeof groupedSections === 'object' && !Array.isArray(groupedSections)) {
            const accumulatedItems = Object.entries(groupedSections).map(([key, element]) => ({
                key,
                element,
            }));
            setMenuDatas(accumulatedItems);
        }

        // Transformar groupedSectionPromotions y guardar en promotionsDatas
        if (groupedSectionPromotions && typeof groupedSectionPromotions === 'object' && !Array.isArray(groupedSectionPromotions)) {
            const accumulatedItemsPromotions = Object.entries(groupedSectionPromotions).map(([key, element]) => ({
                key,
                element,
            }));
            setPromotionsDatas(accumulatedItemsPromotions);
        }


    }, [groupedSections, groupedSectionPromotions]);

    const dataMap = menuDatas?.map((item: any) => item.key)
    const todo = [...new Set(dataMap)]



    return (
        <div>
            <Chat />
            {((isLogin) && validationEmploeesMail()) && (
                <div>
                    <Todo
                        menuData={menuDatas}
                        promotionsData={promotionsDatas}
                    />
                </div>
            )}
        </div>
    );
};

export default MenuEmploees;