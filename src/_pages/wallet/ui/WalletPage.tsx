"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { PlusIcon } from "@/shared/icons";
import { useTranslations } from "next-intl";
import { userApi } from "@/shared/api/routes/user";
import { rentApi } from "@/shared/api/routes/rent";
import { ResponseBottomModalContent } from "@/shared/ui/modal/ResponseBottomModal";
import { CustomPushScreen } from "@/components/ui/custom-push-screen";

const PromoCodeModal = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (code: string) => void;
  isLoading: boolean;
}) => {
  const [code, setCode] = useState("");
  const t = useTranslations("wallet");

  return (
    <div className="rounded-2xl rounded-b-none overflow-hidden">
      <div className="bg-white p-6 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-2xl">🎁</div>
          <h2 className="text-xl font-bold text-gray-900">{t("promocodes")}</h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Введите промокод"
              className="w-full text-base bg-gray-50 text-gray-900 outline-none border-2 border-transparent
                     focus:border-gray-800 focus:bg-white placeholder:text-gray-400 p-4 rounded-2xl
                     transition-all duration-300 shadow-inner focus:shadow-lg"
              disabled={isLoading}
            />
            {code && (
              <button
                onClick={() => setCode("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                ✕
              </button>
            )}
          </div>

          <Button
            variant="secondary"
            className={`font-semibold text-lg text-white w-full
                    ${
                      code ? "" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]`}
            onClick={() => code.trim() && onSubmit(code)}
            disabled={!code.trim() || isLoading}
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{isLoading ? "Активируем..." : t("activate")}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

const WalletPage = () => {
  const t = useTranslations("wallet");

  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTopUpLoading, setIsTopUpLoading] = useState(false);
  const [isPromoCodeModalOpen, setIsPromoCodeModalOpen] = useState(false);
  const [responseModal, setResponseModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    description: string;
    buttonText: string;
  } | null>(null);

  const handleTopUp = async () => {
    setIsTopUpLoading(true);
    try {
      const response = await userApi.addMoney(100000);
      if (response.status === 200) {
        await getBalance();
        const responseData = response.data;
        const promoApplied = responseData.promo_applied;
        const bonus = responseData.bonus || 0;

        setResponseModal({
          isOpen: true,
          title: "Баланс пополнен",
          type: "success",
          description: promoApplied
            ? `Пополнено: 100 000 ₸\nБонус: ${bonus} ₸\nИтого: ${
                100000 + bonus
              } ₸`
            : "Баланс пополнен на 100 000 ₸",
          buttonText: "Отлично",
        });
      }
    } catch (error) {
      console.log(error);
      setResponseModal({
        isOpen: true,
        title: "Ошибка",
        type: "error",
        description: "Не удалось пополнить баланс. Попробуйте еще раз.",
        buttonText: "Понятно",
      });
    } finally {
      setIsTopUpLoading(false);
    }
  };

  const handleApplyPromoCode = async (promoCode: string) => {
    if (!promoCode.trim()) return;
    setIsLoading(true);
    try {
      const response = await rentApi.applyPromoCode(promoCode);

      // Закрываем промокод модал перед открытием response модала
      setIsPromoCodeModalOpen(false);

      setResponseModal({
        isOpen: true,
        type: "success",
        title: "Промокод активирован",
        description: `Промокод "${promoCode}" успешно применен!\nСкидка: ${response.data.discount_percent}%`,
        buttonText: "Отлично",
      });
    } catch (error: unknown) {
      console.error("Error applying promo code:", error);

      // Закрываем промокод модал перед открытием response модала
      setIsPromoCodeModalOpen(false);

      const errorMessage =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "detail" in error.response.data &&
        typeof error.response.data.detail === "string"
          ? error.response.data.detail
          : "Не удалось активировать промокод";

      setResponseModal({
        isOpen: true,
        type: "error",
        title: "Ошибка",
        description: errorMessage,
        buttonText: "Понятно",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async () => {
    try {
      const response = await userApi.getUser();
      setBalance(response.data.wallet_balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("ru-RU").format(amount);
  };

  const openPromoCodeModal = () => {
    setIsPromoCodeModalOpen(true);
  };

  return (
    <article className="space-y-4">
      <section>
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[40px] p-8 text-white shadow-2xl shadow-gray-900/25">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/30 rounded-full transform -translate-x-8 translate-y-8"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-white/60 font-medium uppercase tracking-wider">
                {t("currentBalance")}
              </p>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {formatBalance(balance)} ₸
            </h1>
            <p className="text-xs text-white/50">Доступно для использования</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Button
          variant="secondary"
          onClick={handleTopUp}
          disabled={isTopUpLoading}
        >
          <div className="flex items-center justify-center gap-3">
            <div
              className={`transition-transform duration-300 ${
                isTopUpLoading ? "animate-spin" : "group-hover:rotate-12"
              }`}
            >
              {isTopUpLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <PlusIcon color="white" />
              )}
            </div>
            <span className="font-semibold text-lg text-white">
              {isTopUpLoading ? "Пополняем..." : t("topUp")}
            </span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={openPromoCodeModal}
          className="w-full"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-semibold">{t("promocodes")}</span>
          </div>
        </Button>
      </section>

      <CustomPushScreen
        isOpen={isPromoCodeModalOpen}
        onClose={() => setIsPromoCodeModalOpen(false)}
        fullScreen={false}
        direction="bottom"
        withCloseButton={false}
        isCloseable={true}
        height="auto"
      >
        <PromoCodeModal onSubmit={handleApplyPromoCode} isLoading={isLoading} />
      </CustomPushScreen>

      <CustomPushScreen
        isOpen={!!responseModal}
        onClose={() => setResponseModal(null)}
        withHeader={false}
        fullScreen={false}
        direction="bottom"
        isCloseable={true}
        height="auto"
      >
        <ResponseBottomModalContent
          type={responseModal?.type || "success"}
          title={responseModal?.title || ""}
          description={responseModal?.description || ""}
          buttonText={responseModal?.buttonText || ""}
          onButtonClick={() => setResponseModal(null)}
        />
      </CustomPushScreen>
    </article>
  );
};

export default WalletPage;
