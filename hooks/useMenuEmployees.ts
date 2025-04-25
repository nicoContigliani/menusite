// useMenuEmployees.ts
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { reduceSeccions } from '@/services/reduceSeccions.services';
import { getLocalhostStorage } from '@/services/localstorage.services';
import { RootState } from '../store/store';
import { useMenuDataAternative } from './useMenuData';

type MenuItemsProps = {
    selectedProfile?: string;
    companyNames?: string;
    hojas?: { staff?: any[] };
};

export const useMenuEmployees = (menuItems?: MenuItemsProps) => {
    const [dataGeneral, setDataGeneral] = useState<any>(undefined);
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
    const [companyNames, setCompanyNames] = useState<string>("");
    const [isLogin, setIsLogin] = useState(false);
    const [staffData, setStaffData] = useState<any[]>([]);
    const [dataMail, setDataMail] = useState<string>("");
    const [menuDatas, setMenuDatas] = useState<any[]>([]);
    const [promotionsDatas, setPromotionsDatas] = useState<any[]>([]);

    const user = useSelector((state: RootState) => state.auth);

    // Cargar datos generales y actualizar estados relacionados
    useEffect(() => {
        if (menuItems) {
            setDataGeneral(menuItems);
            setSelectedProfile(menuItems.selectedProfile || null);
            setCompanyNames(menuItems.companyNames || "");
            setStaffData(menuItems.hojas?.staff || []);
        }
    }, [menuItems]);

    // Verificar el estado de autenticación al cargar el componente
    useEffect(() => {
        const checkAuth = async () => {
            const storedData = await getLocalhostStorage();
            updateLoginState(storedData);
        };
        checkAuth();
    }, []);

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

    // Función para actualizar el estado de autenticación
    const updateLoginState = (storedData: any) => {
        setIsLogin(!!storedData?.aud);
        if (storedData?.email) setDataMail(storedData.email);
    };

    // Obtener datos del menú
    const { menuData, promotions } = useMenuDataAternative(
        dataGeneral ?? { hoja: {} }
    );

    // Validar si el correo del empleado está en la lista de staff
    const validationEmploeesMail = useMemo(() => {
        return staffData.some((item) => item.email === dataMail);
    }, [staffData, dataMail]);

    // Reducir secciones del menú y promociones
    const groupedSections = useMemo(() => reduceSeccions(menuData), [menuData]);
    const groupedSectionPromotions = useMemo(() => reduceSeccions(promotions), [promotions]);

    useEffect(() => {
        setMenuDatas(
            Object.entries(groupedSections || {}).map(([key, element]) => ({ key, element }))
        );
        setPromotionsDatas(
            Object.entries(groupedSectionPromotions || {}).map(([key, element]) => ({ key, element }))
        );
    }, [groupedSections, groupedSectionPromotions]);

    return {
        isLogin,
        validationEmploeesMail,
        menuDatas,
        promotionsDatas,
        selectedProfile,
        companyNames,
        staffData,
        dataMail
    };
};