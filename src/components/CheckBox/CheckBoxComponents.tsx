import React from 'react';

interface CheckBoxComponentProps {
  labelCheck: string;
  setLabelCheck: (value: string) => void;
  checked: boolean;
  setChecked: (value: boolean) => void;
}

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({ labelCheck, setLabelCheck, checked, setChecked }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    // setLabelCheck(`checked = ${isChecked}`);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {labelCheck}
    </label>
  );
};

export default CheckBoxComponent;
