import { Divider, Steps } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import 'antd/dist/reset.css';

interface Step {
    title: string;
    description: string;
}

interface StepsComponentProps {
    items: Step[];
    current: number;
    setCurrent: (value: number) => void;
}

const StepsComponent: React.FC<StepsComponentProps> = memo((props) => {
    const { items, current, setCurrent } = props;

    const [isMobile, setIsMobile] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth > 768); // Ahora `isMobile` es true en PC y false en móviles
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };

    return (
        <div>
            <Divider />
            <Steps
                size="small"
                current={current}
                onChange={onChange}
                direction={isMobile ?  "vertical": "horizontal"} // Invertimos la lógica
                items={items}
            />
        </div>
    );
});

export default StepsComponent;
