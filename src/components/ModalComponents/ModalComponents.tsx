import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';

interface ModalComponentsProps {
  children?: React.ReactNode;
  title?: string;
  openResponsive?: boolean;
  setOpenResponsive?: (value: boolean) => void;
}

const ModalComponents: React.FC<ModalComponentsProps> = ({
  children,
  title = "Modal responsive width",
  openResponsive = false,
  setOpenResponsive = () => { },
}) => {

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* <Button type="primary" onClick={() => setOpenResponsive(true)}>
        Open Modal
      </Button> */}
      <Modal
        title={title}
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        {children || (
          <>
            <div>Loading...</div>
          </>
        )}
      </Modal>
    </Flex>
  );
};

export default ModalComponents;
