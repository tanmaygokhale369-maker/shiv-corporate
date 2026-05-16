"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--toast-bg, #1a1a2e)",
            color: "var(--toast-color, #fff)",
            border: "1px solid rgba(51, 102, 255, 0.2)",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#3366ff",
              secondary: "#fff",
            },
          },
        }}
      />
    </NextThemesProvider>
  );
}
