"use client";

import type { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "destructive";
};

export function toast({ title, description, variant }: ToastOptions) {
  const desc = description != null ? String(description) : undefined;
  if (variant === "destructive") {
    sonnerToast.error(title ?? "Ошибка", { description: desc });
    return;
  }
  sonnerToast(title, { description: desc });
}
