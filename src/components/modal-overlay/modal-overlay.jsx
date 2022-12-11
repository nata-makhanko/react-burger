import PropTypes from "prop-types";

import stylesModalOverlay from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onCloseModal }) => {
  return (
    <div className={stylesModalOverlay.overlay} onClick={onCloseModal}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
