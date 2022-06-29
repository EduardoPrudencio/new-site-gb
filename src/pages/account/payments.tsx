import React from "react";

import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { ProfileContentTable } from "@component/profile/ProfileContentTable";
import { onlyAuth } from "@utils/onlyAuth";
import { withAuthRequest } from "@utils/withAuthRequest";
import { GetServerSideProps } from "next";

import {
  creditCardPayments,
  useCreditCardPayments,
} from "@services/api/payments/creditCardPayments";

function Payments({ initialPayments }) {
  const { data: payments } = useCreditCardPayments(initialPayments);

  return (
    <div>
      <DashboardPageHeader
        title="Meus Pagamentos"
        iconName="credit-card_filled"
      />
      <ProfileContentTable
        HeadItems={["Order#", "Data", "Total"]}
        VoucherList={null}
        PaymentList={payments}
      />
    </div>
  );
}

Payments.layout = CustomerDashboardLayout;

export const getServerSideProps: GetServerSideProps = withAuthRequest(
  onlyAuth(async () => {
    const initialPayments = await creditCardPayments();
    return {
      props: {
        initialPayments,
      },
    };
  })
);

export default Payments;
