import styled from "styled-components";

const DEFAULT_WIDTH: number = 40;
const DEFAULT_COLOR: string = "green";

export const BookDefault = styled.div.attrs<{$color?: string, $width?: number}>(props => ({
    $color: props.$color || DEFAULT_COLOR,
    $width: props.$width || DEFAULT_WIDTH,
}))`
    background: ${props => props.$color};
    border-left: 2px solid color-mix(in srgb, ${props => props.$color}, white 4%);
    border-right: 2px solid color-mix(in srgb, ${props => props.$color}, black 4%);

    &{
        .bookshelf__book-content{
            height: calc(${props => props.$width}px);
            width: calc(200px - 60px);
            margin: 0 ${props => props.$width}px;
        }
    }
`;

export const BookColoredSpine = styled.div.attrs<{$color?: string, $width?: number}>(props => ({
    $color: props.$color || DEFAULT_COLOR,
    $width: props.$width || DEFAULT_WIDTH,
}))`
    background: ${props => props.$color};
    border-left: 2px solid color-mix(in srgb, ${props => props.$color}, white 4%);
    border-right: 2px solid color-mix(in srgb, ${props => props.$color}, black 4%);

    &{
        &:before{
            content: " ";
            display: block;
            background: color-mix(in srgb, ${props => props.$color}, black 14%);
            height: 100%;
            width: calc(${props => props.$width}px + 4px);
            border-radius: 4px;

            position: absolute;
            top: 0px;
            left: -2px;
        }

        .bookshelf__book-content{
            height: calc(${props => props.$width}px);
            width: calc(200px - 60px);
            margin: 0 ${props => props.$width}px;
        }
    }
`;

export const BookSplitBands = styled.div.attrs<{$color?: string, $width?: number}>(props => ({
    $color: props.$color || DEFAULT_COLOR,
    $width: props.$width || DEFAULT_WIDTH,
}))`
    background: ${props => props.$color};
    border-left: 2px solid color-mix(in srgb, ${props => props.$color}, white 4%);
    border-right: 2px solid color-mix(in srgb, ${props => props.$color}, black 4%);

    &{
        &:after{
            content: "";
            display: block;
            background: color-mix(in srgb, ${props => props.$color}, black 14%);
            height: 20px;
            width: calc(100% + 4px);
    
            position: absolute;
            top: 10px;
            left: -2px;
        }
    
        &:before{
            content: "";
            display: block;
            background: color-mix(in srgb, ${props => props.$color}, black 14%);
            height: 20px;
            width: calc(100% + 4px);
    
            position: absolute;
            bottom: 10px;
            left: -2px;
            z-index: 2;
        }

        .bookshelf__book-content{
            height: calc(${props => props.$width}px);
            width: calc(200px - 60px) !important;
            margin: 30px ${props => props.$width}px;
        }
    }
`;

export const BookDualTopBands = styled.div.attrs<{$color?: string, $width?: number}>(props => ({
    $color: props.$color || DEFAULT_COLOR,
    $width: props.$width || DEFAULT_WIDTH,
}))`
    background: ${props => props.$color};
    border-left: 2px solid color-mix(in srgb, ${props => props.$color}, white 4%);
    border-right: 2px solid color-mix(in srgb, ${props => props.$color}, black 4%);

    &{
        &:after{
            content: " ";
            display: block;
            background: color-mix(in srgb, ${props => props.$color}, black 14%);
            height: 10px;
            width: calc(100% + 4px);
    
            position: absolute;
            top: 8px;
            left: -2px;
        }
    
        &:before{
            content: " ";
            display: block;
            background: color-mix(in srgb, ${props => props.$color}, black 14%);
            height: 15px;
            width: calc(100% + 4px);
    
            position: absolute;
            top: 26px;
            left: -2px;
            z-index: 2;
        }

        .bookshelf__book-content{
            height: calc(${props => props.$width}px);
            width: calc(200px - 41px) !important;
            margin: 41px ${props => props.$width}px;
        }
    }
`;

export const BookOnDisplay = styled.div.attrs<{$color?: string}>(props => ({
    $color: props.$color || "green",
}))`
    background: ${props => props.$color};
`;