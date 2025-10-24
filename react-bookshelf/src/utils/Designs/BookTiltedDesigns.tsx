import styled from "styled-components";

const DEFAULT_WIDTH: number = 40;
const DEFAULT_COLOR: string = "green";

function getTopMargin(design: any){
    switch(design){
        case "split bands":
            return 30;
        case "dual top bands":
            return 41;
    }
    return 0;
}

export const BookTiltedDefault = styled.div.attrs<{$color?: string, $width?: number, $design?: string, $topMargin?: number}>(props => ({
    $color: props.$color || DEFAULT_COLOR,
    $width: props.$width || DEFAULT_WIDTH,
    $design: props.$design || "",
    $topMargin: props.$topMargin || getTopMargin(props.$design),
}))`
    &{
        .bookshelf__book-content{
            height: calc(${props => props.$width}px);
            width: calc(200px - 60px);
            margin: ${props => props.$topMargin}px ${props => props.$width}px;
        }
    }
`;