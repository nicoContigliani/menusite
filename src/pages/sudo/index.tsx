import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FolderOutlined,
  CloudOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import dynamic from "next/dynamic";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import styles from "@/components/Dashboard/dashboard.module.css";
import { Button, Skeleton } from "antd";
import { Card } from "antd";
import CardDahsboard from "@/components/Dashboard/CardDahsboard/CardDahsboard";
import { useFetchMultiple } from "../../../hooks/useFetchMultiple";
import type { ColumnType } from "antd/es/table";
import MultiFunctionalTable from "@/components/MultiFunctionalTable/MultiFunctionalTable";

const Dashboard = dynamic(() => import("@/components/Dashboard/Dashboard"), {
  loading: () => <SkeletonLoader />,
  ssr: false,
});

interface DataType {
  id: number;
  companyName: string;
  mail?: string;
  phone?: string;
  ubication?: string;
  selectedProfile: string;
  visits: number;
  createAt: string;
  updateAt: string;
  status_Companies: string;
}

const menuItems = [
  { key: "1", icon: <AppstoreOutlined />, label: "Finder" },
  { key: "2", icon: <FolderOutlined />, label: "Documents" },
  { key: "3", icon: <CloudOutlined />, label: "iCloud" },
  { key: "4", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "5", icon: <UserOutlined />, label: "Users" },
  { key: "6", icon: <SettingOutlined />, label: "Settings" },
];

const Index = () => {
  const [menuItemSelection, setMenuItemSelection] = useState("1");
  const { results, loading, fetchMultiple } = useFetchMultiple();
  console.log("🚀 ~ Index ~ results:", results)
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);


  useEffect(() => {
    fetchMultiple([{ url: "/api/trackTime" }, { url: "/api/companiesdashboard" }]);
  }, [fetchMultiple, refreshTrigger]);

  // Memoiza y formatea los datos para evitar cálculos innecesarios
  const { companies, trackTime } = useMemo(() => {
    const companiesData: any = results?.apicompaniesdashboard?.data || [];
    const trackTimeData: any | any[] | undefined = results?.apitrackTime?.data || [];

    const uniqueCompanies = new Set(trackTimeData.map((item: any) => item.namecompanie));

    const formattedCompanies: any | any[] | undefined = companiesData?.map((item: any, index: number) => ({
      id: index + 1,
      companyName: item.companyName,
      mail: item.hojas?.Info?.[0]?.mail,
      phone: item.hojas?.Info?.[0]?.phone,
      ubication: item.hojas?.Info?.[0]?.ubication,
      selectedProfile: item.selectedProfile,
      visits: item.visits,
      createAt: item.createAt,
      updateAt: item.updateAt,
      status_Companies: item.status_Companies,
    }));


    const columns: ColumnType<DataType>[] = Object.keys(formattedCompanies[0] || {}).map((key) => ({
      key,
      dataIndex: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      render: (value) =>
        key === "status_Companies" ? (
          <span>
            {value ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )}{" "}
            {value ? "Activo" : "Inactivo"}
          </span>
        ) : (
          value
        ),
    }));

    columns.push({
      title: "Acción",
      key: "action",
      render: (_, record) =>
        uniqueCompanies.has(record.companyName) ? (
          <Button type="primary" onClick={() => handleButtonClick(record)}>Foramt</Button>
        ) : null,
    });

    return { companies: { data: formattedCompanies, columns }, trackTime: trackTimeData };
  }, [results]);


  const handleButtonClick = useCallback(async (record: DataType) => {
    try {
      const res = await fetch(`/api/analytics?companyname=${record.companyName}`);
      if (!res.ok) throw new Error("Error fetching data");

      const response = await fetch(`/api/analytics?companyname=${record.companyName}`, {
        method: "DELETE",
      });
      setRefreshTrigger(refreshTrigger + 1);
      const result = await res.json();
    } catch (err) {
      console.log("🚀 ~ handleButtonClick ~ err:", err);
    }
  }, []);



  const handleCreate = useCallback(async () => {
    const apicompaniesdashboard: any[] | any = results?.apicompaniesdashboard?.data || [];
    const apitrackTime = results?.apitrackTime?.data;

    if (!apicompaniesdashboard.length) {
      console.log("No companies data found.");
      return;
    }

    try {
      // Desactivamos el trigger de refresco mientras hacemos las solicitudes
      setRefreshTrigger(0);

      // Recorremos todos los registros
      const promises = apicompaniesdashboard.map(async (record: any) => {
        try {
          // Hacemos la solicitud GET primero
          const res = await fetch(`/api/analytics?companyname=${record.companyName}`);
          if (!res.ok) {
            throw new Error(`Error fetching data for ${record.companyName}`);
          }

          // Luego hacemos la solicitud DELETE
          const response = await fetch(`/api/analytics?companyname=${record.companyName}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error(`Error deleting data for ${record.companyName}`);
          }

          const result = await response.json();
          console.log("🚀 ~ handleCreate ~ result:", result);
        } catch (err) {
          console.error("Error processing record:", record.companyName, err);
        }
      });

      // Esperamos que todas las promesas se resuelvan antes de actualizar el estado
      await Promise.all(promises);

      // Una vez completado, activamos nuevamente el trigger para refrescar
      setRefreshTrigger((prev) => prev + 1);
      console.log("Successfully processed all companies.");
    } catch (err) {
      console.error("🚀 ~ handleCreate ~ global error:", err);
    }
  }, [results, refreshTrigger]);




  return (
    <div>
      {results ? (
        <Dashboard menuItems={menuItems} title="" setMenuItemSelection={setMenuItemSelection}>
          {companies.data?.length ? (
            <div style={{ padding: "1px" }}>
              <MultiFunctionalTable<DataType>
                data={companies.data}
                columns={companies.columns}
                sortable
                paginationConfig={{ pageSize: 5 }}
              />
            </div>
          ) : (
            <SkeletonLoader />
          )}

          {trackTime.length > 0 && (
            <CardDahsboard>
              <ClockCircleOutlined className={styles.icon} />
              <div>
                <div>{trackTime.length}</div>
                <div>
                  <Button type="primary" onClick={handleCreate}>
                    Ordenar
                  </Button>
                </div>
              </div>
            </CardDahsboard>
          )}

          {companies.data?.length > 0 && (
            <CardDahsboard>
              <ClockCircleOutlined className={styles.icon} />
              <div>
                <h2>Empresas Activas</h2>
                <strong>{companies.data.length}</strong>
                <div>
                  <Button type="primary" onClick={handleCreate}>
                    Ordenar
                  </Button>
                </div>
              </div>
            </CardDahsboard>
          )}
        </Dashboard>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default Index;
