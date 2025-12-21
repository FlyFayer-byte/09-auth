'use client';
import type { ReactNode } from 'react';
// -- Інсталяція React Query -- //
// Щоб почати використовувати React Query, спершу потрібно додати її в залежності.
// Для цього виконуємо наступну команду в терміналі:
// npm install @tanstack/react-query

// -- Налаштування QueryClient --
// Перед тим як використовувати React Query, потрібно налаштувати QueryClient. 
// Це об’єкт, який містить конфігурацію й управління запитами та кешуванням даних. 
// Імпортуємо його з бібліотеки та створюємо новий QueryClient у файлі
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react';

interface TanStackProviderProps {
  children: React.ReactNode; 
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  // -- Створюємо новий QueryClient
  const [queryClient] = useState(() => new QueryClient());

  // Обгортаємо додаток в QueryClientProvider, передавши в нього створений клієнт.
  // Це дасть змогу використовувати React Query в усіх компонентах додатка.
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// QueryClientProvider надає всі можливості React Query для компонентів всередині нього, 
// дозволяючи працювати з асинхронними запитами, кешем і відслідковувати їхній стан.