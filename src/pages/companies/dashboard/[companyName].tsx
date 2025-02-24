import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

export default function CompanyAnalytics() {
  const router = useRouter();
  const { companyName } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Para refrescar datos manualmente

  useEffect(() => {
    if (!companyName) return; // No ejecutar si no hay un companyName

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const url = `/api/dashboard?companyname=${companyName}`;
        console.log("🚀 ~ useEffect ~ url:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error fetching data");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error("🚀 ~ fetchData ~ err:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [companyName, refreshTrigger]); // Se ejecuta cuando companyName cambia o se presiona el botón de refresh

  return (
    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <Typography variant="h4">Analytics for {companyName}</Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {data && <Typography variant="body1">{JSON.stringify(data, null, 2)}</Typography>}

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setRefreshTrigger(prev => prev + 1)}
        sx={{ mt: 2 }}
      >
        Refresh Data
      </Button>
    </Box>
  );
}
