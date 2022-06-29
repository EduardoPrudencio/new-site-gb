/* eslint-disable react/prop-types */
import Box from "@component/Box";
import Spinner from "@component/Spinner";
import TableRowSimple from "@component/TableRowSimple";
import Typography from "@component/Typography";
import { theme } from "@utils/theme";
import moment from "moment";
import styled from "styled-components";

import { LabelStatusGray, LabelStatusGreen } from "./LabelStatus";

const Label = styled.label`
  color: ${theme.colors.gray[600]};
  font-weight: bold;
`;

const Message = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: 22px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 35px;
`;

const SpinnerBox = styled.div`
  color: ${theme.colors.gray[600]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const GetStatus = function BuildStatus(date: string, daysToAdd: number) {
  const voucherLimit = moment(date).add(daysToAdd, "days").format("ll");
  return moment().isBefore(voucherLimit) ? (
    <LabelStatusGray title="in progress" />
  ) : (
    <LabelStatusGreen title="Delivered" />
  );
};

export const ProfileContentTable = function BuildProfileContentTable({
  HeadItems,
  VoucherList,
  PaymentList,
}) {
  const DateFormat = function BuildDate(date: string) {
    return moment(date).format("ll");
  };

  const GetMarginLeft = (code: string) => {
    const lenthDefault = 16;
    const spaceToFill = lenthDefault - code.length;
    return spaceToFill / 2;
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="400px"
        ml="2.5rem"
      >
        {HeadItems.map((item) => (
          <Label>{item}</Label>
        ))}
      </Box>

      {typeof VoucherList !== "undefined" &&
        VoucherList !== null &&
        VoucherList.length === 0 && (
          <b>
            <Message>Você não possui vouchers cadastrados.</Message>
          </b>
        )}
      {VoucherList &&
        VoucherList.map((item) => (
          <TableRowSimple my="1rem" padding="16px 0 16px 25px">
            <Typography ml={1}>
              <b>{item.code}</b>
            </Typography>
            <Typography
              m="6px"
              textAlign="left"
              ml={`${GetMarginLeft(item.code)}rem`}
            >
              {GetStatus(item.activated_at, item.expiration_days)}
            </Typography>
            <Typography className="pre" m="6px" textAlign="left" ml="60px">
              {DateFormat(item.activated_at)}
            </Typography>
          </TableRowSimple>
        ))}

      {PaymentList !== null &&
        typeof PaymentList !== "undefined" &&
        PaymentList.length === 0 && (
          <b>
            <Message>Você não possui pagamentos cadastrados.</Message>
          </b>
        )}

      {PaymentList &&
        PaymentList.map((item) => (
          <TableRowSimple my="1rem" padding="16px 0 16px 25px">
            <Typography ml={4}>
              <b>{item.id}</b>
            </Typography>
            <Typography m="6px" textAlign="left" ml="125px">
              {item.payment_date}
            </Typography>
            <Typography className="pre" m="6px" textAlign="left" ml="90px">
              {item.amount}
            </Typography>
          </TableRowSimple>
        ))}

      {typeof PaymentList === "undefined" &&
        (typeof VoucherList === "undefined" || VoucherList === null) && (
          <SpinnerBox>
            <Spinner />
          </SpinnerBox>
        )}
    </>
  );
};
