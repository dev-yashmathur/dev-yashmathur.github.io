import styled from "styled-components";

export const BookshelfDefault = styled.div.attrs<{$shelf?: string}>(props => ({
    $shelf: props.$shelf || "#A87328",
}))`
    background-image: linear-gradient(
        color-mix(in srgb, ${props => props.$shelf}, black 32%),
        color-mix(in srgb, ${props => props.$shelf}, black 30%) 220px,
        color-mix(in srgb, ${props => props.$shelf}, white 4%) 220px,
        color-mix(in srgb, ${props => props.$shelf}, white 4%) 222px,
        ${props => props.$shelf} 222px, ${props => props.$shelf} 228px,
        color-mix(in srgb, ${props => props.$shelf}, black 4%) 228px,
        color-mix(in srgb, ${props => props.$shelf}, black 4%) 230px);
    border: 10px ${props => props.$shelf} solid;
`;