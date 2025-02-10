import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';

interface Props {
    orderdescription: any[];
    delivery?: boolean;
    takeaway?: boolean;
    Dinein?: boolean;
    table?: any;
    direction?: string;
    username?: string;
    userid?: any;
    orderplaced?: any;
    ordertaken?: any;
    orderrecived?: any;
    onChange: (value: any) => void;
    value: any;
    className?: string;  // Para permitir clases CSS desde el padre
    color?: string
    type?: any
}

const SelectComponent = (props: Props) => {
    const { delivery, takeaway, Dinein, className, onChange, color, type = "default" } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderType, setOrderType] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [clarification, setClarification] = useState<string>("");

    const showModal = (type: string) => {
        setOrderType(type);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        if (inputValue) {
            onChange({ inputValue, clarification });
            setIsModalVisible(false);
            setInputValue("");
            setClarification("");
        }
    };

    return (

        <div className={className} style={{ display: 'flex', justifyContent: 'left' }}> {/* Usamos el className recibido del padre */}
            {delivery && (
                <Button
                    type={type}
                    variant="outlined"
                    block
                    style={{ color: `${color}`, margin: "10px", backgroundColor: 'transparent' }}
                    onClick={() => showModal("delivery")}>
                    Delivery
                </Button>
            )}
            {takeaway && (
                <Button
                    variant="outlined" type="dashed" block
                    style={{ color: 'white', margin: "10px", backgroundColor: 'transparent' }} onClick={() => showModal("delivery")}>
                    Takeaway
                </Button>
            )}
            {Dinein && (
                <Button
                    variant="outlined" type="dashed" block
                    style={{ color: 'white', margin: "10px", backgroundColor: 'transparent' }} onClick={() => showModal("delivery")}>
                    Dine-in
                </Button>
            )}

            <Modal
                title={`Order Details - ${orderType}`}
                open={isModalVisible}  // <---- Aquí el cambio
                onCancel={handleCancel}
                footer={[
                    <Button key="submit"
                        type="primary"
                        onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form>
                    {orderType === "delivery" || orderType === "takeaway" ? (
                        <Form.Item label="Enter your Location">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Your address"
                            />
                        </Form.Item>
                    ) : orderType === "dinein" ? (
                        <Form.Item label="Enter your Table Number">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Table number"
                            />
                        </Form.Item>
                    ) : null}

                    <Form.Item label="Any Clarifications?">
                        <Input.TextArea
                            value={clarification}
                            onChange={(e) => setClarification(e.target.value)}
                            placeholder="Example: No sauce"
                            rows={4}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SelectComponent;
