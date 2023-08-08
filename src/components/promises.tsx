"use client";
import { PointProvider } from "@/contexts/PointProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Promises({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PointProvider>{children}</PointProvider>
    </QueryClientProvider>
  );
}
