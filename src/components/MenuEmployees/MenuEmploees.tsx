import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useMenuDataAternative } from '../../../hooks/useMenuData';
import useOrderManager from '../../../hooks/useOrderManager';
import useRules from '../../../hooks/useRules';
import { reduceSeccions } from '@/services/reduceSeccions.services';
import { getLocalhostStorage } from '@/services/localstorage.services';
import MenuInterface from './MenuOrderDetails/OrderSpeedMUI';
import MenuLayout from '../MenuLayout/MenuLayout';

type MenuEmploeesProps = {
    menuItems?: {
        selectedProfile?: string;
        companyNames?: string;
        hojas?: { staff?: any[] };
    };
    namecompanies: any
};

const MenuEmploees: React.FC<MenuEmploeesProps> = ({ menuItems, namecompanies }) => {
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
    const { menuData, promotions, config, staff } = useMenuDataAternative(
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

    return (
        <div>
            {isLogin && validationEmploeesMail && (
                <div>
                        <MenuInterface menuData={menuDatas} promotionsData={promotionsDatas} />
                </div>
            )}
        </div>
    );
};

export default MenuEmploees;
