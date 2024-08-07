import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.content}>{children}</div>
				<button className={styles.closeButton} onClick={onClose}>
					Ок
				</button>
			</div>
		</div>
	);
};

export default Modal;
