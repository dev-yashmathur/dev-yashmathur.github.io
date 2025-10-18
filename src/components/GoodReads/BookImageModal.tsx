import { motion, AnimatePresence } from 'framer-motion';
import './BookImageModal.css';

interface BookImageModalProps {
  image: string;
  onClose: () => void;
}

const BookImageModal: React.FC<BookImageModalProps> = ({ image, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="book-image-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="book-image-modal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="book-image-modal-close" onClick={onClose}>
            &times;
          </button>
          <div className="book-image-container">
            <img src={image} alt="Book cover" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookImageModal;