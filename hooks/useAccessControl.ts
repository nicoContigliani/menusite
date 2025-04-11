import { useState, useEffect } from 'react';

type AccessType = 'kichen' | 'orders' | 'sales' | 'presentation' | 'presentationStaff';

interface AccessConfig {
    whoDoOrder: string;
    allowedRoles?: string[];
}

interface StaffMember {
    email: string;
    role: string;
}

const useAccessControl = (config: any, staff: any) => {
    const [access, setAccess] = useState<Record<AccessType, boolean>>({
        kichen: false,
        orders: false,
        sales: false,
        presentation: false,
        presentationStaff: false
    });

    const [email, setEmail] = useState<string>("");

    const stringclean = (str: string | null | undefined): string => {
        if (!str) return "";
        return str.replace(/['"]/g, '');
    };

    // ✅ Obtener el email del localStorage solo en el cliente
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('email');
            setEmail(stringclean(storedEmail));
        }
    }, []);

    useEffect(() => {
        if (!email || !staff || !Array.isArray(config) || config.length === 0) {
            setAccess({
                kichen: false,
                orders: false,
                sales: false,
                presentation: false,
                presentationStaff: false
            });
            return;
        }

        const currentStaff = staff.find((item: StaffMember) => stringclean(item.email) === email);
        const currentRole = currentStaff?.role || '';

        const newAccess = {
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

        setAccess(newAccess);
    }, [config, staff, email]);

    return {
        access,
        hasAccess: (type: AccessType) => access[type]
    };
};

export default useAccessControl;
