import { Children, isValidElement } from 'react';
import type { ReactElement } from 'react';
import './Book.css';

interface BookStackProps {
  children: ReactElement | ReactElement[];
}

const BookStack: React.FC<BookStackProps> = ({ children }) => {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  return (
    <ul className="bookshelf__bookStack-wrapper">
      {items.map((child, index) => (
        <li key={index} className="bookshelf__bookstack-elem">
          {child}
        </li>
      ))}
    </ul>
  );
};

export default BookStack;
