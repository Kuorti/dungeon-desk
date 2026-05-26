import { useEffect, useRef } from "react";
import { ModalProps } from "@src/shared/ui/modal/modal-props.ts";
import styles from "./modal.module.scss";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();

    if (!rect || !closeOnOverlayClick) {
      return;
    }

    const isClickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isClickedOutside) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.wrapper}
      onClose={onClose}
      onClick={handleOverlayClick}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className={styles.content}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </dialog>
  );
};

export default Modal;
