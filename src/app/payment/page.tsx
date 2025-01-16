"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PaymentCommands from "@/modules/payment/PaymentCommands";

const Payment = () => {
  return (
    <DefaultLayout>
      <PaymentCommands />
    </DefaultLayout>
  );
};

export default Payment;
