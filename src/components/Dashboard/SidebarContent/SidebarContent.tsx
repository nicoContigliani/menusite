import React from 'react';

interface SidebarContentProps {
    children: React.ReactNode; // Define the type for children
}

const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
    return <>{children}</>;
};

export default SidebarContent;