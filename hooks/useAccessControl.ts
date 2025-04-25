// import { useState, useEffect } from 'react';

// type AccessType = 'kichen' | 'orders' | 'sales' | 'presentation' | 'presentationStaff';

// interface AccessConfig {
//     whoDoOrder: string;
//     allowedRoles?: string[];
// }

// interface StaffMember {
//     email: string;
//     role: string;
// }

// const useAccessControl = (config: any, staff: any) => {
//     const [access, setAccess] = useState<Record<AccessType, boolean>>({
//         kichen: false,
//         orders: false,
//         sales: false,
//         presentation: false,
//         presentationStaff: false
//     });

//     const [email, setEmail] = useState<string>("");

//     const stringclean = (str: string | null | undefined): string => {
//         if (!str) return "";
//         return str.replace(/['"]/g, '');
//     };

//     // ✅ Obtener el email del localStorage solo en el cliente
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const storedEmail = localStorage.getItem('email');
//             setEmail(stringclean(storedEmail));
//         }
//     }, []);

//     useEffect(() => {
//         if (!email || !staff || !Array.isArray(config) || config.length === 0) {
//             setAccess({
//                 kichen: false,
//                 orders: false,
//                 sales: false,
//                 presentation: false,
//                 presentationStaff: false
//             });
//             return;
//         }

//         const currentStaff = staff.find((item: StaffMember) => stringclean(item.email) === email);
//         const currentRole = currentStaff?.role || '';

//         const newAccess = {
//             kichen: false,
//             orders: false,
//             sales: false,
//             presentation: false,
//             presentationStaff: false
//         };

//         config.forEach((item: AccessConfig) => {
//             switch (item.whoDoOrder) {
//                 case "all":
//                     newAccess.kichen = true;
//                     newAccess.orders = true;
//                     newAccess.sales = true;
//                     newAccess.presentation = true;
//                     newAccess.presentationStaff = true;
//                     break;

//                 case "staff":
//                     if (currentStaff) {
//                         newAccess.kichen = currentRole.startsWith('chef') || currentRole === 'owner';
//                         newAccess.orders = true;
//                         newAccess.sales = currentRole.startsWith('employees') || currentRole === 'owner';
//                         newAccess.presentation = true;
//                         newAccess.presentationStaff = true;
//                     }
//                     break;

//                 case "owner":
//                     if (currentRole === 'owner') {
//                         newAccess.kichen = true;
//                         newAccess.orders = true;
//                         newAccess.sales = true;
//                         newAccess.presentation = true;
//                         newAccess.presentationStaff = true;
//                     }
//                     break;

//                 case "employees":
//                     if (currentRole.startsWith('employees')) {
//                         newAccess.sales = true;
//                         newAccess.presentationStaff = true;
//                     }
//                     break;

//                 case "chef":
//                     if (currentRole.startsWith('chef')) {
//                         newAccess.kichen = true;
//                         newAccess.orders = true;
//                     }
//                     break;
//             }
//         });

//         setAccess(newAccess);
//     }, [config, staff, email]);

//     return {
//         access,
//         hasAccess: (type: AccessType) => access[type]
//     };
// };

// export default useAccessControl;


import { useState, useEffect, useMemo } from 'react';

type AccessType = 'kichen' | 'orders' | 'sales' | 'presentation' | 'presentationStaff';

interface AccessConfig {
    whoDoOrder: string;
    allowedRoles?: string[];
}

interface StaffMember {
    email: string;
    role: string;
}

const useAccessControl = (config: AccessConfig[], staff: StaffMember[]) => {
    const [access, setAccess] = useState<Record<AccessType, boolean>>({
        kichen: false,
        orders: false,
        sales: false,
        presentation: false,
        presentationStaff: false
    });

    const [email, setEmail] = useState<string>("");

    const stringclean = (str: string | null | undefined): string => {
        return (str || "").replace(/['"]/g, '');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = stringclean(localStorage.getItem('email'));
            if (storedEmail !== email) {
                setEmail(storedEmail);
            }
        }
    }, [email]);

    // ✅ useMemo para evitar recalcular acceso en cada render
    const computedAccess = useMemo(() => {
        if (!email || !staff || !Array.isArray(config) || config.length === 0) {
            return {
                kichen: false,
                orders: false,
                sales: false,
                presentation: false,
                presentationStaff: false
            };
        }

        const currentStaff = staff.find((item: StaffMember) => stringclean(item.email) === email);
        const currentRole = currentStaff?.role || '';

        const newAccess: Record<AccessType, boolean> = {
            kichen: false,
            orders: false,
            sales: false,
            presentation: false,
            presentationStaff: false
        };

        config.forEach((item: AccessConfig) => {
            switch (item.whoDoOrder) {
                case "all":
                    newAccess.kichen = true;
                    newAccess.orders = true;
                    newAccess.sales = true;
                    newAccess.presentation = true;
                    newAccess.presentationStaff = true;
                    break;

                case "staff":
                    if (currentStaff) {
                        newAccess.kichen = currentRole.startsWith('chef') || currentRole === 'owner';
                        newAccess.orders = true;
                        newAccess.sales = currentRole.startsWith('employees') || currentRole === 'owner';
                        newAccess.presentation = true;
                        newAccess.presentationStaff = true;
                    }
                    break;

                case "owner":
                    if (currentRole === 'owner') {
                        newAccess.kichen = true;
                        newAccess.orders = true;
                        newAccess.sales = true;
                        newAccess.presentation = true;
                        newAccess.presentationStaff = true;
                    }
                    break;

                case "employees":
                    if (currentRole.startsWith('employees')) {
                        newAccess.sales = true;
                        newAccess.presentationStaff = true;
                    }
                    break;

                case "chef":
                    if (currentRole.startsWith('chef')) {
                        newAccess.kichen = true;
                        newAccess.orders = true;
                    }
                    break;
            }
        });

        return newAccess;
    }, [config, staff, email]);

    // ✅ Solo setea el acceso si cambió
    useEffect(() => {
        setAccess(prev => {
            const prevStr = JSON.stringify(prev);
            const newStr = JSON.stringify(computedAccess);
            return prevStr !== newStr ? computedAccess : prev;
        });
    }, [computedAccess]);

    return {
        access,
        hasAccess: (type: AccessType) => access[type]
    };
};

export default useAccessControl;
