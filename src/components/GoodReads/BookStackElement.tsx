import type { CSSProperties } from 'react';
import type { BookDesign, SpineConfig } from './Book';
import BookText from './BookText';
import { appliedStyle } from './utils/BookMethods';
import './Book.css';

interface BookStackElementProps {
  title: string;
  subtitle?: string;
  spine: SpineConfig;
}

const designClassMap: Record<BookDesign, string | null> = {
  'no bands': null,
  'split bands': 'split',
  'dual top bands': 'dual',
  'colored spine': 'colored',
};

const BookStackElement: React.FC<BookStackElementProps> = ({ title, subtitle, spine }) => {
  const designClass = designClassMap[spine.design] ? `bookshelf__book-wrapper--${designClassMap[spine.design]}` : '';
  const style: CSSProperties = {
    '--book-color': appliedStyle(spine.color),
    '--book-width': `${spine.width ?? 56}px`,
  } as CSSProperties;

  return (
    <div className={`bookshelf__book-wrapper bookshelf__book-wrapper--stack ${designClass}`} style={style}>
      <BookText title={title} subtitle={subtitle} />
    </div>
  );
};

export default BookStackElement;
