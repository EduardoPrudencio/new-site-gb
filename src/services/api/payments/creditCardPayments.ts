import { useQuery } from "react-query";

import { AxiosError } from "axios";

import api from "@services/api/client";

type CreditCardPayment = {
  amount: string;
  id: string;
  payment_date: string;
};

export const creditCardPayments = async () => {
  const { data } = await api.get<{
    subscription_payments: CreditCardPayment[];
  }>("v2/subscriptions/payments");

  if (!data.subscription_payments) {
    return [];
  }

  return data.subscription_payments.map(({ payment_date, ...rest }) => ({
    payment_date: new Date(payment_date).toLocaleDateString("pt-BR"),
    ...rest,
  }));
};

export function useCreditCardPayments(initialData: CreditCardPayment[] = []) {
  return useQuery<CreditCardPayment[], AxiosError>(
    "creditCardPayments",
    creditCardPayments,
    { initialData }
  );
}
