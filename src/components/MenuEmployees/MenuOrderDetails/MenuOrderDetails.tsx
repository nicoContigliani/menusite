import React from 'react';

interface MenuItem {
  Name: string;
  Description: string;
  Price: string;
  Item_Image: string;
}

interface MenuEmploeesProps {
  groupedSectionPromotions?: MenuItem[] | null; // Acepta un array o null/undefined
}

const MenuOrderDetails: React.FC<MenuEmploeesProps> = ({ groupedSectionPromotions }) => {
  // Verifica si groupedSectionPromotions es un array
  const safeGroupedSectionPromotions = Array.isArray(groupedSectionPromotions)
    ? groupedSectionPromotions
    : [];

  return (
    <div>
      <h1>Menú de Promociones</h1>
      {safeGroupedSectionPromotions.length > 0 ? (
        <ul>
          {safeGroupedSectionPromotions.map((element, index) => (
            <li key={index}>
              <h2>{element.Name}</h2>
              <p>{element.Description}</p>
              <p>Precio: {element.Price}</p>
              <img src={element.Item_Image} alt={element.Name} width="100" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay promociones disponibles.</p>
      )}
    </div>
  );
};

export default MenuOrderDetails;