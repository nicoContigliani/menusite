
import { GeolocationService } from './locationUser.services';

interface MenuItem {
    Menu_Title: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
    extra: string | null;
}

interface ExtraItem {
    name: string;
    price: number;
}

interface TransformedMenuItem extends Omit<MenuItem, 'extra'> {
    extras: ExtraItem[];
}

interface LocationData {
    latitude: number;
    longitude: number;
    fullAddress?: string;
}

interface InfoItem {
    phone: number;
    mail: string;
    x: string;
    instagram: string;
    facebook: string;
    web: string;
    whatsapp: number;
    ubication: string;
    delivery: string;
    takeaway: string;
    Dinein: string;
    reservation: string;
    pay: string;
    chatboot: string;
    coordinates?: LocationData;
}

interface FullData {
    Hoja1: MenuItem[];
    Promotion: MenuItem[];
    Config: any[];
    Info: InfoItem[];
    schedules: any[];
    staff: any[];
}

interface TransformedFullData extends Omit<FullData, 'Hoja1' | 'Promotion'> {
    Hoja1: TransformedMenuItem[];
    Promotion: TransformedMenuItem[];
}

export async function transformExtras(data: FullData): Promise<TransformedFullData> {
    // 1. Transformar los ítems del menú
    const transformItem = (item: MenuItem): TransformedMenuItem => {
        const extras: ExtraItem[] = [];

        if (item.extra) {
            item.extra.split(',').forEach(pair => {
                const [name, price] = pair.split(':');
                if (name && price) {
                    extras.push({
                        name: name.trim(),
                        price: parseInt(price.trim(), 10)
                    });
                }
            });
        }

        return {
            ...item,
            extras
        };
    };

    // 2. Obtener ubicación precisa del usuario
    const enhancedInfo = [...data.Info];
    if (enhancedInfo.length > 0) {
        try {
            const userUbications = await GeolocationService.getPreciseLocation();
            console.log("🚀 ~ Ubicación obtenida:", userUbications);

            if (userUbications) {
                enhancedInfo[0] = {
                    ...enhancedInfo[0],
                    coordinates: userUbications
                };
            }
        } catch (error) {
            console.error("Error al obtener la ubicación precisa:", error);
        }
    }

    // 3. Transformar los menús en paralelo
    const [transformedHoja1, transformedPromotion] = await Promise.all([
        Promise.all(data.Hoja1.map(transformItem)),
        Promise.all(data.Promotion.map(transformItem))
    ]);

    return {
        ...data,
        Hoja1: transformedHoja1,
        Promotion: transformedPromotion,
        Info: enhancedInfo
    };
}








// // Ejemplo de uso
// const fullData = {
//     Hoja1: [
//         {
//             Menu_Title: "Pizza",
//             Item_Image: "lasagna.jpg",
//             Section: "Pastas",
//             Item_id: 1,
//             Name: "Lasagna Clásica",
//             Description: "Lasaña clásica con carne y salsa bechamel",
//             Price: "$17.50",
//             extra: "Queso_parmesano:2000,Salsa_extra:1500,Jalapeños:1000"
//         },
//         // ... otros elementos de Hoja1
//     ],
//     Promotion: [
//         {
//             Menu_Title: "Pizza",
//             Item_Image: "lasagna.jpg",
//             Section: "Pastas",
//             Item_id: 1,
//             Name: "Lasagna Clásica",
//             Description: "Lasaña clásica con carne y salsa bechamel",
//             Price: "$17.50",
//             extra: "Queso_parmesano:2000,Salsa_extra:1500,Jalapeños:1000"
//         },
//         // ... otros elementos de Promotion
//     ],
//     Config: [
//         {
//             Background_Image: "italia.jpg",
//             IconBrand: "icono.png"
//         }
//     ],
//     Info: [
//         {
//             phone: 54900000,
//             mail: "todo@gmail,com",
//             x: "http:algo.com",
//             instagram: "http:algo.com",
//             facebook: "http:algo.com",
//             web: "http:algo.com",
//             whatsapp: 5492222222,
//             ubication: "calle libertad 17",
//             delivery: "consultar",
//             takeaway: "true",
//             Dinein: "true",
//             reservation: "reservas",
//             pay: " efectivo y transferencia",
//             chatboot: "false"
//         }
//     ],
//     schedules: [
//         {
//             day: "lunes",
//             servicehours: "8:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//         },
//         // ... otros horarios
//     ],
//     staff: [
//         {
//             role: "owner",
//             email: "nico.contigliani@gmail.com"
//         },
//         // ... otros miembros del staff
//     ]
// };

// const transformedData = transformExtras(fullData);
// console.log(transformedData);