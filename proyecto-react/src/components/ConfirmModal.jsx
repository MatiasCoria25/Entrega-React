import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{title || '¿Estás seguro?'}</h3>
        </div>
        
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button 
            className={styles.btnCancel} 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            className={styles.btnConfirm} 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;