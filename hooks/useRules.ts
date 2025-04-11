import { useState, useEffect } from 'react';
import { stringclean } from '../tools/stringclean';

const useRules = (config: any, staff: any) => {
    const [hasPermission, setHasPermission] = useState(false);

    // Obtener y limpiar el email del usuario desde localStorage
    const email = stringclean(localStorage.getItem('email'));

    useEffect(() => {


        if (!email) {
            setHasPermission(false);
            return;
        }

        if (!staff) {
            setHasPermission(false);
            return;
        }
        // if (staff.length != 0 && email == null) {
        //     const dataValidations = staff.map((item: any) => {
        //         return item.email === email
        //     })
        // }


        // Check if config is an array and has at least one element
        if (Array.isArray(config) && config.length > 0 && config[0]?.whoDoOrder) {

            switch (config[0].whoDoOrder) {
                case "all":
                    setHasPermission(true);
                    break;

                case "staff":
                    // Verificar si el usuario está en la lista de staff
                    const isStaff = staff?.some((item: any) => stringclean(item.email) === stringclean(email));
                    setHasPermission(isStaff);
                    break;

                case "owner":
                    // Verificar si el usuario es el owner
                    const isOwner = staff?.some((item: any) => stringclean(item.email) === email && item.role === 'owner');
                    setHasPermission(isOwner);
                    break;

                case "employees":
                    // Verificar si el usuario es un empleado
                    const isEmployee = staff?.some((item: any) => stringclean(item.email) === email && (item.role).startsWith('employees'));
                    setHasPermission(isEmployee);
                    break;

                case "chef":
                    // Verificar si el usuario es un empleado
                    const isChef = staff?.some((item: any) => stringclean(item.email) === email && (item.role).startsWith('chef'));
                    setHasPermission(isChef);
                    break;






                default:
                    setHasPermission(false);
                    break;
            }
        } else {
            setHasPermission(false);
        }
    }, [config, staff, email]); // Dependencias del efecto

    return {
        hasPermission,
    };
};

export default useRules;