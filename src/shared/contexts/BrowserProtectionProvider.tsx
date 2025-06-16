"use client";

import React, { ReactNode } from "react";

interface BrowserProtectionProviderProps {
  children: ReactNode;
}

/**
 * 🔒 Провайдер браузерной защиты для Next.js
 * Автоматически инициализирует защиту для всего приложения
 */
export const BrowserProtectionProvider: React.FC<
  BrowserProtectionProviderProps
> = ({ children }) => {
  // Инициализируем защиту браузера
  // ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ РАЗРАБОТКИ
  // useBrowserProtection();

  return <>{children}</>;
};
