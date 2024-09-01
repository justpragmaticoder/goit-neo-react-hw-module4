import Modal from "react-modal";

import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

function ImageModal({ image, onClose, modalIsOpen }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      overlayClassName={styles.modalOverlay}
      className={styles.modal}
    >
      {image && <img src={image.urls.regular} alt={image.alt_description} />}
      {image && (
        <div className={styles.metadataContainer}>
          <p className={styles.metadataItem}>
            Likes ❤️ <span className={styles.metadataItemValue}>{image.likes} </span>
          </p>
          <p className={styles.metadataItem}>
            Author: <span className={styles.metadataItemValue}>{image.user.name}</span>{" "}
          </p>
        </div>
      )}
    </Modal>
  );
}

export default ImageModal;
