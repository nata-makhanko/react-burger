import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

const reactModal = document.querySelector("#modals");

const Modal = ({ header, children, onCloseModal }) => {
  useEffect(() => {
    const closeModal = (e) => {
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
    reactModal
  );
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
