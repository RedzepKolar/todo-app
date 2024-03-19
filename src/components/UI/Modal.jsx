import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
      modal.focus();
    }

    return () => modal.close();
  }, [open]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      tabIndex="-1"
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
