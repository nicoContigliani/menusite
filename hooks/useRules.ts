import { useState, useEffect } from 'react';
import { stringclean } from '../tools/stringclean';

const useRules = (config: any, staff: any) => {
    const [hasPermission, setHasPermission] = useState(false);

    // Obtener y limpiar el email del usuario desde localStorage
    const email = stringclean(localStorage.getItem('email'));
    console.log("🚀 ~ useRules ~ email:", email);

    useEffect(() => {
        if (config[0]?.whoDoOrder) {
            switch (config[0].whoDoOrder) {
                case "all":
                    setHasPermission(true);
                    break;

                case "staff":
                    // Verificar si el usuario está en la lista de staff
                    const isStaff = staff?.some((item: any) => stringclean(item.email) === stringclean(email));
                    // const mapDAta = staff.map((item:any)=>{
             
                    // })
                    setHasPermission(isStaff);
                    break;

                case "owner":
                    // Verificar si el usuario es el owner
                    const isOwner = staff?.some((item: any) => stringclean(item.email) === email && item.role === 'owner');
                    setHasPermission(isOwner);
                    break;

                case "employees":
                    // Verificar si el usuario es un empleado
                    const isEmployee = staff?.some((item: any) => stringclean(item.email) === email && item.role === 'employee');
                    setHasPermission(isEmployee);
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