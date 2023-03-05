import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  children?: React.ReactNode, 
  onCloseModal: () => void,
}

const ModalOverlay = ({ children, onCloseModal }: TModalOverlayProps) => {
  return (
    <div className={styles.overlay} onClick={onCloseModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;
