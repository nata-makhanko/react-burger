import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onCloseModal }) => {
  return (
    <div className={styles.overlay} onClick={onCloseModal}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
