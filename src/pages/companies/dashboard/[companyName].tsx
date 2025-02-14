// pages/[companyName].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CompanyAnalytics() {
  const router = useRouter();
  const { companyName } = router.query;

  const [data, setData] = useState<{ companyName: string; visitors: number; revenue: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyName) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/analytics?companyname=${companyName}`);
        if (!res.ok) throw new Error('Error fetching data');
        const result = await res.json();
        console.log("🚀 ~ fetchData ~ result:", result)
        setData(result);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>Analytics for {data.companyName}</h1>
      {/* <p>Visitors: {data.visitors}</p>
      <p>Revenue: ${data.revenue.toFixed(2)}</p> */}
    </div>
  );
}
