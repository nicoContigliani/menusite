import React, { useState } from "react";
import useDynamicStyles from "../../../../../hooks/useDynamicStyles";

interface GenericSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  profile?:any;

}

const GenericSearch: React.FC<GenericSearchProps> = ({
  value = "",
  onChange,
  placeholder = "Buscar...",
  className = "",
  profile
  
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  const styles = useDynamicStyles(profile);

  return (
    <input
      type="text"
      className={`${styles.searchInput} ${className}`}
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
      data-cy="Search"
      style={{
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.75)",
      }}
    />
  );
};

export default GenericSearch;
