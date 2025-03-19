import { useEffect, useState } from "react";

/**
 * Custom hook para cargar dinámicamente estilos CSS basados en un perfil.
 * @param profile - El perfil que determina qué estilos cargar.
 * @returns Un objeto con los estilos cargados.
 */
const useDynamicStyles = (profile: string | undefined) => {
    const [styles, setStyles] = useState<any>({});

    // Función para cargar los estilos según el perfil
    const getStyles = async (profile: string | undefined): Promise<any> => {
        switch (profile) {
            case "ProfileGeneric":
                return (await import("../src/components/Profile/ProfileGeneric/ProfileGenericStyles/Generic.module.css")).default;
            case "ProfileGeneric1":
                return (await import("../src/components/Profile/ProfileGeneric/ProfileGenericStyles/Generic1.module.css")).default;
            case "ProfileGeneric2":
                return (await import("../src/components/Profile/ProfileGeneric/ProfileGenericStyles/Generic2.module.css")).default;
            case "ProfileGeneric3":
                return (await import("../src/components/Profile/ProfileGeneric/ProfileGenericStyles/Generic3.module.css")).default;
            case "ProfileGeneric4":
                return (await import("../src/components/Profile/ProfileGeneric/ProfileGenericStyles/Generic3.module.css")).default;
            default:
                return (await import("../src/components/Profile/Profile3/MenuNew.module.css")).default; // Estilo predeterminado
        }
    };

    // Cargar los estilos dinámicamente cuando cambie el perfil
    useEffect(() => {
        const loadStyles = async () => {
            const selectedStyles = await getStyles(profile);
            setStyles(selectedStyles);
        };
        loadStyles();
    }, [profile]);

    return styles; // Retorna los estilos cargados
};

export default useDynamicStyles;