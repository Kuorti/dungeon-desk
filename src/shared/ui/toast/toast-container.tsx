import { createPortal } from "react-dom";
import styles from "./toast.module.scss";
import { useToastStore } from "@src/shared/ui/toast/use-toast-store.ts";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && typeof containerRef.current.showPopover === "function") {
      try {
        containerRef.current.showPopover();
      } catch (e) {

      }
    }
  }, []);

  return createPortal(
    <div
      ref={containerRef}
      id="global-toast-popover"
      popover="manual"
      className={styles.toastContainer}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(styles.toast, styles[toast.type])}
          onClick={() => removeToast(toast.id)}
        >
          <span className={styles.icon}>
            {toast.type === "error" && "⚠️"}
            {toast.type === "warning" && "⚠️"}
            {toast.type === "success" && "✅"}
            {toast.type === "info" && "ℹ️"}
          </span>
          <p className={styles.message}>{toast.message}</p>
        </div>
      ))}
    </div>,
    document.body,
  );
};
