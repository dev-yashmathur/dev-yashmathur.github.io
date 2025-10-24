import styled from 'styled-components';
import { BookDefault } from './BookDesigns';

export const BookTiltedDefault = styled.div.attrs<{ $design?: string }>(() => ({}))`
  position: relative;
  width: 72px;

  .bookshelf__book-wrapper {
    transform: translateY(-22px) translateX(13px) rotate(9deg);
    transform-origin: bottom center;
    transition: transform 0.4s ease;
  }

  &:hover .bookshelf__book-wrapper {
    transform: translateY(-38px) translateX(13px) rotate(9deg);
  }

  .bookshelf__book-wrapper.bookshelf__book-wrapper--interactive {
    cursor: pointer;
  }
`;

export const BookTiltedDefaultWrapper = styled(BookDefault)`
  width: 40px !important;
`;
