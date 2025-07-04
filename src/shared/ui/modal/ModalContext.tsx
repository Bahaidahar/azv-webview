"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  showModal: (params: {
    children: React.ReactNode;
    onClose?: () => void;
  }) => void;
  hideModal: () => void;
  isModalOpen: boolean;
  modalConfig: {
    children: React.ReactNode;
    onClose?: () => void;
  } | null;
  handleClose: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

const ModalContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    children: React.ReactNode;
    onClose?: () => void;
  } | null>(null);

  const showModal = (params: {
    children: React.ReactNode;
    onClose?: () => void;
  }) => {
    setModalConfig(params);
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  };

  const hideModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalConfig(null);
    }, 300);
  };

  const handleClose = () => {
    hideModal();
    modalConfig?.onClose?.();
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        isModalOpen: isOpen,
        modalConfig,
        handleClose,
      }}
    >
      <ModalContentWrapper>{children}</ModalContentWrapper>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
