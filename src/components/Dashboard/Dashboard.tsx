// components/Dashboard.tsx

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';

interface DashboardProps {
  window?: any;
  navigation: any;
  router: any;
  theme: any;
}

const Dashboard = ({ navigation, router, theme }: DashboardProps) => {
  // Get the selected navigation segment
  const selectedSegment = router.pathname.replace('/', '') || 'dashboard'; // Default to 'dashboard'

  // Find the navigation item based on the segment
  const selectedNavItem = navigation.find((item: any) => item.segment === selectedSegment);
  const Content = selectedNavItem ? selectedNavItem.component : null;

  return (
    <AppProvider navigation={navigation} router={router} theme={theme}>
      <DashboardLayout>
        <PageContainer>
          {Content ? (
            <Content />
          ) : (
            <Grid container spacing={1}>
              {/* Default Skeleton loading UI */}
              <Grid item xs={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={100} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={150} />
              </Grid>
            </Grid>
          )}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
