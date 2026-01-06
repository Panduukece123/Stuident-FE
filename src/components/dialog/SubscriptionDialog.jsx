import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { subscriptionService } from "@/services/SubscriptionService";
import { StepConfirmPayment, StepUploadProof, StepSuccess } from "./subscription-steps";

// Plan configurations
const PLAN_CONFIG = {
  free: {
    name: "Free",
    price: 0,
    displayPrice: "Rp 0",
    duration: 0,
    duration_unit: "months",
    package_type: "basic",
    color: "amber",
  },
  premium: {
    name: "Premium",
    price: 1999000,
    displayPrice: "Rp 1.999.000",
    duration: 12,
    duration_unit: "months",
    package_type: "all_in_one",
    color: "purple",
  },
  regular: {
    name: "Regular",
    price: 999000,
    displayPrice: "Rp 999.000",
    duration: 12,
    duration_unit: "months",
    package_type: "single_course",
    courses_ids: [1, 2, 3],
    color: "yellow",
  },
};

export const SubscriptionDialog = ({
  open,
  onOpenChange,
  planName,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState(null);

  const planConfig = PLAN_CONFIG[planName] || PLAN_CONFIG.free;

  const resetDialog = () => {
    setStep(1);
    setPaymentMethod("manual");
    setIsLoading(false);
    setError("");
    setTransactionId(null);
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  // Step 1: Create subscription
  const handleCreateSubscription = async () => {
    setError("");
    setIsLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];

      const payload = {
        plan: planName,
        package_type: planConfig.package_type,
        courses_ids: planConfig.courses_ids,
        duration: planConfig.duration,
        duration_unit: planConfig.duration_unit,
        price: planConfig.price,
        auto_renew: false,
        start_date: today,
        payment_method: paymentMethod,
      };

      const response = await subscriptionService.createSubscription(payload);

      if (response.sukses && response.data?.transaction?.id) {
        setTransactionId(response.data.transaction.id);
        setStep(2);
      } else {
        throw new Error(response.pesan || "Gagal membuat subscription");
      }
    } catch (err) {
      setError(err.response?.data?.pesan || err.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Upload payment proof
  const handleUploadProof = async (file) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await subscriptionService.uploadPaymentProof(transactionId, file);

      if (response.sukses) {
        setStep(3);
      } else {
        throw new Error(response.pesan || "Gagal upload bukti pembayaran");
      }
    } catch (err) {
      setError(err.response?.data?.pesan || err.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Finish
  const handleFinish = () => {
    handleClose();
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {step === 1 && (
          <StepConfirmPayment
            planConfig={planConfig}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isLoading={isLoading}
            error={error}
            onSubmit={handleCreateSubscription}
            onClose={handleClose}
          />
        )}

        {step === 2 && (
          <StepUploadProof
            planConfig={planConfig}
            isLoading={isLoading}
            error={error}
            onSubmit={handleUploadProof}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepSuccess onFinish={handleFinish} />
        )}
      </DialogContent>
    </Dialog>
  );
};
