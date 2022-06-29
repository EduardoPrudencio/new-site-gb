import React, { useEffect, useState } from "react";
import NewVoucherFormModal from "react-modal";

import Button from "@component/buttons/Button";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { NewVoucherForm } from "@component/profile/forms/voucher/NewVoucherForm";
import { ProfileContentTable } from "@component/profile/ProfileContentTable";
import { authCookieKeys } from "@utils/constants";
import { onlyAuth } from "@utils/onlyAuth";
import { theme } from "@utils/theme";
import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { Voucher as VoucherType } from "types";

import { GetAll } from "@services/api/vouchers";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8px",
    marginRigth: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Voucher() {
  const [vouchers, setVouchers] = useState<VoucherType[]>();
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  const GelAllVouchers = async () => {
    const { [authCookieKeys.token]: token } = getCookies();
    const { status, data } = await GetAll(token);

    if (status === 200) {
      setVouchers(data);
    }
  };

  useEffect(() => {
    GelAllVouchers();
  });

  const ReloadPage = () => {
    setIsVoucherModalOpen(false);
    setVouchers(null);
    GelAllVouchers();
  };

  return (
    <div>
      <DashboardPageHeader
        title="Meus Vouchers"
        iconName="bag_filled"
        button={
          <Button
            color="primary"
            borderStyle="solid"
            borderWidth="1px"
            borderColor={theme.colors[500]}
            px="2rem"
            onClick={() => setIsVoucherModalOpen(true)}
          >
            Novo Voucher
          </Button>
        }
      />

      <NewVoucherFormModal
        isOpen={isVoucherModalOpen}
        onRequestClose={() => ReloadPage()}
        style={modalStyle}
      >
        <NewVoucherForm />
      </NewVoucherFormModal>

      <ProfileContentTable
        HeadItems={["Voucher", "Status", "Data de Ativação"]}
        VoucherList={vouchers}
        PaymentList={null}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Voucher.layout = DashboardLayout;

export default Voucher;
