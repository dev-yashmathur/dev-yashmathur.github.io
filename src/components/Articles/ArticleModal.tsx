import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useId } from 'react';
import './ArticleModal.css';

interface ArticleModalProps {
  article: {
    title: string;
    image: string;
    link: string;
    preview: string;
  } | null;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="article-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="article-modal"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <button
            className="article-modal-close"
            onClick={onClose}
            aria-label="Close article preview"
            ref={closeButtonRef}
          >
            &times;
          </button>

          <div
            className="article-modal-image"
            style={{ backgroundImage: `url(${article.image})` }}
          />

          <div className="article-modal-content">
            <h2 className="article-modal-title" id={titleId}>{article.title}</h2>
            <p className="article-modal-preview" id={descriptionId}>{article.preview}</p>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary article-modal-button"
            >
              Read Full Article
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArticleModal;
