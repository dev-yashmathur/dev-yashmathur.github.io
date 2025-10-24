import styled from 'styled-components';

const DEFAULT_WIDTH = 40;
const DEFAULT_COLOR = '#f3a89f';

export const BookDefault = styled.div.attrs<{
  $color?: string;
  $width?: number;
}>(props => ({
  $color: props.$color || DEFAULT_COLOR,
  $width: props.$width || DEFAULT_WIDTH,
}))`
  position: relative;
  background: ${props => props.$color};
  border-left: 2px solid color-mix(in srgb, ${props => props.$color}, white 8%);
  border-right: 2px solid color-mix(in srgb, ${props => props.$color}, black 6%);

  .bookshelf__book-content {
    height: ${props => props.$width}px;
    width: calc(200px - 60px);
    margin: 0 ${props => props.$width}px;
  }
`;

export const BookColoredSpine = styled(BookDefault)`
  &::before {
    content: '';
    display: block;
    background: color-mix(in srgb, ${props => props.$color}, black 16%);
    height: 100%;
    width: calc(${props => (props as any).$width}px + 4px);
    border-radius: 6px;
    position: absolute;
    inset: 0 auto auto -2px;
  }
`;

export const BookSplitBands = styled(BookDefault)`
  &::after,
  &::before {
    content: '';
    display: block;
    background: color-mix(in srgb, ${props => props.$color}, black 12%);
    height: 20px;
    width: calc(100% + 4px);
    position: absolute;
    left: -2px;
  }

  &::after {
    top: 12px;
  }

  &::before {
    bottom: 12px;
    z-index: 2;
  }

  .bookshelf__book-content {
    height: ${props => props.$width}px;
    width: calc(200px - 60px);
    margin: 28px ${props => props.$width}px;
  }
`;

export const BookDualTopBands = styled(BookDefault)`
  &::after,
  &::before {
    content: '';
    display: block;
    background: color-mix(in srgb, ${props => props.$color}, black 14%);
    width: calc(100% + 4px);
    position: absolute;
    left: -2px;
  }

  &::after {
    height: 12px;
    top: 8px;
  }

  &::before {
    height: 16px;
    top: 26px;
  }

  .bookshelf__book-content {
    height: ${props => props.$width}px;
    width: calc(200px - 48px);
    margin: 38px ${props => props.$width}px;
  }
`;

export const BookOnDisplay = styled.div.attrs<{ $color?: string }>(props => ({
  $color: props.$color || DEFAULT_COLOR,
}))`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${props => props.$color};
  border-radius: 12px;
  box-shadow: inset 0 0 0 4px color-mix(in srgb, ${props => props.$color}, white 35%);
`;
