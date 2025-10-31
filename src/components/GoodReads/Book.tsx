import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import BookText from './BookText';
import { appliedStyle } from './utils/BookMethods';
import './Book.css';

type BookDesign = 'no bands' | 'split bands' | 'dual top bands' | 'colored spine';
type BookOrientation = 'default' | 'tilted' | 'onDisplay';

interface SpineConfig {
  color: string;
  design: BookDesign;
  width?: number;
}

interface BookProps {
  title: string;
  subtitle?: string;
  author?: string;
  orientation: BookOrientation;
  spine: SpineConfig;
}

const designClassMap: Record<BookDesign, string | null> = {
  'no bands': null,
  'split bands': 'split',
  'dual top bands': 'dual',
  'colored spine': 'colored',
};

const Book: React.FC<BookProps> = ({ title, subtitle, author, orientation, spine }) => {
  const [textColor, setTextColor] = useState<string>('#ffffff');

  useEffect(() => {
    const rgb = hexToRgb(appliedStyle(spine.color));
    const contrast = getContrastColor(rgb[0], rgb[1], rgb[2], 1);
    setTextColor(contrast);
  }, [spine.color]);

  const designClass = designClassMap[spine.design] ? `bookshelf__book-wrapper--${designClassMap[spine.design]}` : '';
  const style: CSSProperties = {
    '--book-color': appliedStyle(spine.color),
    '--book-width': `${spine.width ?? 56}px`,
    color: textColor,
  } as CSSProperties;

  if (orientation === 'tilted') {
    return (
      <div className="bookshelf__book-tilted">
        <div className={`bookshelf__book-wrapper ${designClass}`} style={style}>
          <BookText title={title} subtitle={subtitle} />
        </div>
      </div>
    );
  }

  if (orientation === 'onDisplay') {
    return (
      <div className="bookshelf__book-wrapper bookshelf__book-onDisplay" style={style}>
        <div
          className="bookshelf__book-display-crease"
          style={{ backgroundColor: `color-mix(in srgb, ${appliedStyle(spine.color)}, black 14%)` }}
        />
        <BookText title={title} subtitle={subtitle} />
        {author && <p className="bookshelf__book-author">By: {author}</p>}
      </div>
    );
  }

  return (
    <div className={`bookshelf__book-wrapper ${designClass}`} style={style}>
      <BookText title={title} subtitle={subtitle} />
    </div>
  );
};

function hexToRgb(hexColor: string): [number, number, number] {
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  const match = hex.match(/[A-Fa-f0-9]{2}/g);
  if (!match) {
    throw new Error('Invalid Hexadecimal Color Code.');
  }
  return match.map(value => parseInt(value, 16)) as [number, number, number];
}

function getContrastColor(r: number, g: number, b: number, a: number) {
  const brightness = r * 0.299 + g * 0.587 + b * 0.114 + (1 - a) * 255;
  return brightness > 186 ? '#0f1115' : '#ffffff';
}

export type { BookDesign, BookOrientation, SpineConfig };
export default Book;
