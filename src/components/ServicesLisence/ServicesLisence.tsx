import React from "react";
import { Card, Collapse } from "antd";
import styles from "./ServicesLisence.module.css";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

interface Caracteristicas {
  diseno_menu: string;
  gestion_productos: string;
  codigo_qr: string;
  idiomas: string;
  pedidos_online: string;
  reservas: string;
  pagos_online: string;
  analitica: string;
  fidelizacion: string;
  redes_sociales: string;
  soporte_tecnico: string;
  almacenamiento: string;
  usuarios_concurrentes: number;
  capacitacion: string;
  actualizaciones: string;
}

interface Plan {
  nombre: string;
  duracion_prueba: number;
  precio_mensual: number;
  caracteristicas: Caracteristicas;
}

interface Props {
  planes: any;
}

const formatKey = (key: string): string => {
  return key
    .replace(/_/g, " ") // Reemplaza guiones bajos por espacios
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra
};

const ServicesLicense: React.FC<Props> = ({ planes }) => {
  return (
    <div className={styles.container}>
      {planes?.planes.map((plan:any, index:any) => (
        <Card key={index} className={styles.card} title={plan.nombre} bordered={false}>
          <p className={styles.price}>💰 {plan.precio_mensual.toLocaleString()} / mes</p>
          <p className={styles.trial}>🆓 {plan.duracion_prueba} días de prueba</p>

          <Collapse ghost>
            <Panel header="Ver características" key="1">
              <ul className={styles.featuresList}>
                {Object.entries(plan.caracteristicas).map(([key, value]:any) => (
                  <li key={key} className={styles.featureItem}>
                    {typeof value === "string" && value.toLowerCase().includes("no incluido") ? (
                      <CloseCircleOutlined className={styles.iconNegative} />
                    ) : (
                      <CheckCircleOutlined className={styles.iconPositive} />
                    )}
                    <strong>{formatKey(key)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </Panel>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default ServicesLicense;
