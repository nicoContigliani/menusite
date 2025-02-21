import { Row, Col, Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import styles from '../dashboard.module.css'; // Ajusta según tu ruta de estilo

interface propsInteface {
  children: React.ReactNode
}

const { Title, Text } = Typography;

const CardDahsboard: React.FC<propsInteface> = (props) => {
  const { children } = props
  return (
    <Row gutter={[24, 24]} justify="center" style={{ padding: '5px' }}>
      <Card className={styles.card} hoverable>
        {/* <ClockCircleOutlined className={styles.icon} />
        <Title level={4}>Tiempo de espera</Title>
        <Text strong>2:30</Text> */}
        <br />
        {children}
      </Card>
    </Row>
  );
}

export default CardDahsboard;
