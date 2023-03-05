import { createPortal } from "react-dom";
import React, { useEffect } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

const reactModal = document.querySelector("#modals");

type TModalProps = {
  header: string, 
  children?: React.ReactNode, 
  onCloseModal: () => void,
}

const Modal = ({ header, children, onCloseModal }: TModalProps) => {
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    };
    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, []);
  return createPortal(
    <ModalOverlay onCloseModal={onCloseModal}>
      <div
        className={`${styles.modal} pt-10 pr-10 pl-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <p className="text text_type_main-large">{header}</p>
          <div className={styles.close} onClick={onCloseModal}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </ModalOverlay>,
    reactModal as HTMLElement
  );
};

export default Modal;
