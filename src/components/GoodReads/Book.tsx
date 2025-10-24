import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import BookText from './BookText';
import {
  BookColoredSpine,
  BookDefault,
  BookDualTopBands,
  BookOnDisplay,
  BookSplitBands,
} from './BookDesigns';
import { BookTiltedDefault, BookTiltedDefaultWrapper } from './BookTiltedDesigns';
import { asHexColor, ensureWidth } from './bookUtils';
import './Book.css';

type Orientation = 'default' | 'tilted' | 'onDisplay';
type DesignVariant = 'no bands' | 'split bands' | 'dual top bands' | 'colored spine';

interface BookProps {
  name: string;
  author: string;
  subtitle?: string;
  image: string;
  takeaways: string[];
  isSelected: boolean;
  onClick: () => void;
  index: number;
  orientation?: Orientation;
  design?: DesignVariant;
  color?: string;
  width?: number;
}

const DEFAULT_DESIGN: DesignVariant = 'no bands';

const Book: React.FC<BookProps> = ({
  name,
  author,
  subtitle,
  isSelected,
  onClick,
  index,
  orientation = 'default',
  design = DEFAULT_DESIGN,
  color,
  width,
}) => {
  const [spineWidth, setSpineWidth] = useState<number>(ensureWidth(width));
  const [textColor, setTextColor] = useState<string>('#ffffff');

  useEffect(() => {
    setSpineWidth(ensureWidth(width));
  }, [width]);

  useEffect(() => {
    const resolved = asHexColor(color);
    const rgb = hexToRgb(resolved);
    const contrast = getContrastColor(rgb[0], rgb[1], rgb[2], 1);
    setTextColor(contrast);
  }, [color]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  const interactiveProps = {
    role: 'button' as const,
    tabIndex: 0,
    onClick,
    onKeyDown: handleKeyDown,
    'aria-label': `${name} by ${author}`,
    'aria-pressed': isSelected,
    'data-selected': isSelected ? 'true' : undefined,
    'data-orientation': orientation,
  };

  const sharedStyle = {
    width: `${spineWidth}px`,
    color: textColor,
  };
  const resolvedColor = asHexColor(color);

  const bookContent = (() => {
    const text = <BookText title={name} subtitle={subtitle} />;
    switch (design) {
      case 'split bands':
        return (
          <BookSplitBands
            style={sharedStyle}
            className="bookshelf__book-wrapper"
            $color={resolvedColor}
            $width={spineWidth}
          >
            {text}
          </BookSplitBands>
        );
      case 'dual top bands':
        return (
          <BookDualTopBands
            style={sharedStyle}
            className="bookshelf__book-wrapper"
            $color={resolvedColor}
            $width={spineWidth}
          >
            {text}
          </BookDualTopBands>
        );
      case 'colored spine':
        return (
          <BookColoredSpine
            style={sharedStyle}
            className="bookshelf__book-wrapper"
            $color={resolvedColor}
            $width={spineWidth}
          >
            {text}
          </BookColoredSpine>
        );
      default:
        return (
          <BookDefault
            style={sharedStyle}
            className="bookshelf__book-wrapper"
            $color={resolvedColor}
            $width={spineWidth}
          >
            {text}
          </BookDefault>
        );
    }
  })();

  const creaseStyle = {
    backgroundColor: `color-mix(in srgb, ${resolvedColor}, black 14%)`,
  };

  const orientationContent = (() => {
    switch (orientation) {
      case 'tilted':
        return (
          <BookTiltedDefault className="bookshelf__book-tilted">
            <BookTiltedDefaultWrapper
              style={sharedStyle}
              className="bookshelf__book-wrapper bookshelf__book-wrapper--tilted"
              $color={resolvedColor}
              $width={spineWidth}
            >
              <BookText title={name} subtitle={subtitle} />
            </BookTiltedDefaultWrapper>
          </BookTiltedDefault>
        );
      case 'onDisplay':
        return (
          <BookOnDisplay
            className="bookshelf__book-wrapper bookshelf__book-wrapper--display"
            $color={resolvedColor}
          >
            <div className="bookshelf__book-display-crease" style={creaseStyle} />
            <BookText title={name} subtitle={subtitle} />
            <p className="bookshelf__book-author">By {author}</p>
          </BookOnDisplay>
        );
      default:
        return bookContent;
    }
  })();

  return (
    <div
      {...interactiveProps}
      className={`bookshelf__book-container ${isSelected ? 'bookshelf__book-container--selected' : ''}`}
      data-testid={`book-${index}`}
    >
      {orientationContent}
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
    return [243, 168, 159];
  }
  return match.map(value => parseInt(value, 16)) as [number, number, number];
}

function getContrastColor(r: number, g: number, b: number, a: number) {
  const brightness = r * 0.299 + g * 0.587 + b * 0.114 + (1 - a) * 255;
  return brightness > 186 ? '#0f1115' : '#ffffff';
}

export default Book;
