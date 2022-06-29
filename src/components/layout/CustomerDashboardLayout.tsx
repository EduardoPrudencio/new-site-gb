import React from "react";

import Container from "../Container";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import Navbar from "../navbar/Navbar";
import AppLayout from "./AppLayout";
import CustomerDashboardNavigation from "./CustomerDashboardNavigation";

const CustomerDashboardLayout: React.FC = ({ children }) => (
  <AppLayout navbar={<Navbar />}>
    <Container my="2rem" width="1024px">
      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <CustomerDashboardNavigation />
        </Hidden>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default CustomerDashboardLayout;
