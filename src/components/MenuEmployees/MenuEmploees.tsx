// MenuEmploees.tsx
import React from 'react';
import MenuInterface from './MenuOrderDetails/OrderSpeedMUI';
import { useMenuEmployees } from '../../../hooks/useMenuEmployees';

type MenuEmploeesProps = {
  menuItems?: {
    selectedProfile?: string;
    companyNames?: string;
    hojas?: { staff?: any[] };
  };
  namecompanies: any;
};

const MenuEmploees: React.FC<MenuEmploeesProps> = ({ menuItems, namecompanies }) => {
  const {
    isLogin,
    validationEmploeesMail,
    menuDatas,
    promotionsDatas
  } = useMenuEmployees(menuItems);

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