import { create } from "zustand";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastItem["type"]) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (message, type = "info") => {
    const id = crypto.randomUUID();
    const newToast: ToastItem = { id, message, type };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      console.log("removeToast by timeout");
      get().removeToast(id);
    }, 30000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
