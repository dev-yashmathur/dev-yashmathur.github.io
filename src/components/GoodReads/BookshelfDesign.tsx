import styled from 'styled-components';

export const StyledShelf = styled.div.attrs<{ $shelf?: string }>(props => ({
  $shelf: props.$shelf || '#e9d9cb',
}))`
  width: 100%;
  border-radius: 28px;
  border: 10px solid ${props => props.$shelf};
  background-image: linear-gradient(
    color-mix(in srgb, ${props => props.$shelf}, black 26%),
    color-mix(in srgb, ${props => props.$shelf}, black 22%) 220px,
    color-mix(in srgb, ${props => props.$shelf}, white 6%) 220px,
    color-mix(in srgb, ${props => props.$shelf}, white 6%) 224px,
    ${props => props.$shelf} 224px,
    ${props => props.$shelf} 230px,
    color-mix(in srgb, ${props => props.$shelf}, black 6%) 230px,
    color-mix(in srgb, ${props => props.$shelf}, black 6%) 232px
  );
  background-size: 12px 240px;
  box-shadow: 0 30px 60px rgba(63, 49, 44, 0.18);
  padding: 36px 36px 72px;
  position: relative;
`;
