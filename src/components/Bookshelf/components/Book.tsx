import {useState, useEffect, type KeyboardEvent} from "react";
import BookText from "./BookText";
import { BookOnDisplay, BookSplitBands, BookDualTopBands, 
    BookColoredSpine, BookDefault } from "../utils/Designs/BookDesigns";
import { appliedStyle } from "../utils/BookMethods";
import { BookTiltedDefault } from "../utils/Designs/BookTiltedDesigns";

interface BookProps{
    id?: string;
    title?: string;
    subtitle?: string;
    author?: string;
    color?: string | undefined;
    design?: string | undefined;
    orientation?: string;
    height?: number;
    width?: number;
    textColorProp?: string;
    onSelect?: (book: { id?: string; title?: string; subtitle?: string; author?: string }) => void;
}

const BOOK_SIZE_DEFAULT: number = 40;
const BOOK_SIZE_MIN: number = 15;

const Book = ({id, title, subtitle, author, color, orientation, design, width, textColorProp, onSelect}: BookProps) => {
    const [verifiedWidth, setVerifiedWidth] = useState<number>(widthCheck(width));
    const [textColor, setTextColor] = useState<string>("white");

    useEffect(() => {
        if(textColorProp) {
            setTextColor(textColorProp);
        }
    })
    

    useEffect(() => {
        setVerifiedWidth(widthCheck(width));
    }, [width]);

    useEffect(() => {
        if(!textColorProp) {
            let hexToRGB: any = hexToRgb(appliedStyle(color));
            let rgb: Array<string> = hexToRGB.split(",");
            let textColor: string = getContrastColor(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]), 1);
            setTextColor(textColor);
        }
    }, [color]);

    const handleSelect = () => {
        if(onSelect){
            onSelect({ id, title, subtitle, author });
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if(!onSelect){
            return;
        }

        if(event.key === "Enter" || event.key === " "){
            event.preventDefault();
            handleSelect();
        }
    };

    const interactiveProps = onSelect ? {
        onClick: handleSelect,
        onKeyDown: handleKeyDown,
        role: "button" as const,
        tabIndex: 0
    } : {};

    const pointerStyle = onSelect ? { cursor: "pointer" } : {};

    const BookDisplayCrease: any = {
        backgroundColor: `color-mix(in srgb, ${appliedStyle(color)}, black 14%)`,
        width: "5px",
        height: "100%",
        position: "absolute",
        top: "0",             
        left: "8px",
    }

    function appliedOrientation(orientation: string | undefined){
        switch(orientation){
            case "tilted":
                return(
                    <BookTiltedDefault className="bookshelf__book-wrapper bookshelf__book-tilted"
                        $design={design}>
                        {appliedDesign(design)}
                    </BookTiltedDefault>
                );
            case "onDisplay":
                return(
                    <BookOnDisplay
                    className={`bookshelf__book-wrapper bookshelf__book-onDisplay${onSelect ? " bookshelf__book-wrapper--clickable" : ""}`} 
                    $color={appliedStyle(color)}
                    {...interactiveProps}
                    style={{ color: `${textColor}`, ...pointerStyle }}>
                        <div style={BookDisplayCrease}></div>
                        {title ? <>
                            <BookText title={title} subtitle={subtitle}/>
                            <p className="bookshelf__book-author">By: {author}</p>
                        </> : <></>}
                    </BookOnDisplay>
                );
            default:
                return(appliedDesign(design));
        }
    }

    function widthCheck(input: number | undefined){
        if(input){
            if(input <= 150){
                return BOOK_SIZE_MIN;
            }
            return input / 10;
        }
        return BOOK_SIZE_DEFAULT;
    }

    function getContrastColor(R: number, G: number, B: number, A: number) {
        const brightness = R * 0.299 + G * 0.587 + B * 0.114 + (1 - A) * 255;
        return brightness > 186 ? "#000000" : "#FFFFFF";
    }

    const hexToRgb = (hex: any) => {
        hex = hex.replace("#", "");
    
        if (hex.length === 3) {
            hex = hex.replace(/(.)/g, "$1$1");
        }
    
        const validHexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    
        if (!validHexRegex.test(hex)) {
            throw new Error("Invalid Hexadecimal Color Code.");
        }
    
        const [r, g, b] = hex.match(/[A-Fa-f0-9]{2}/g).map((value: any) => parseInt(value, 16));
    
        return `${r}, ${g}, ${b}`;
    };

    function appliedDesign(input: string | undefined){
        switch(input){
            case "split bands":
                return (
                <BookSplitBands style={{width: `${verifiedWidth}px`, color: `${textColor}`, ...pointerStyle}} 
                className={`bookshelf__book-wrapper${onSelect ? " bookshelf__book-wrapper--clickable" : ""}`} 
                $color={appliedStyle(color)}
                $width={verifiedWidth}
                {...interactiveProps}>
                    <BookText title={title} subtitle={subtitle}/>
                </BookSplitBands>);
            case "dual top bands":
                return (
                <BookDualTopBands style={{width: `${verifiedWidth}px`, color: `${textColor}`, ...pointerStyle}} 
                className={`bookshelf__book-wrapper${onSelect ? " bookshelf__book-wrapper--clickable" : ""}`} 
                $color={appliedStyle(color)}
                $width={verifiedWidth}
                {...interactiveProps}>
                    <BookText title={title} subtitle={subtitle}/>
                </BookDualTopBands>);
            case "colored spine":
                return (
                <BookColoredSpine style={{width: `${verifiedWidth}px`, color: `${textColor}`, ...pointerStyle}} 
                className={`bookshelf__book-wrapper${onSelect ? " bookshelf__book-wrapper--clickable" : ""}`} 
                $color={appliedStyle(color)}
                $width={verifiedWidth}
                {...interactiveProps}>
                    <BookText title={title} subtitle={subtitle}/>
                </BookColoredSpine>);
            default:
                return(
                <BookDefault style={{width: `${verifiedWidth}px`, color: `${textColor}`, ...pointerStyle}}
                className={`bookshelf__book-wrapper${onSelect ? " bookshelf__book-wrapper--clickable" : ""}`} 
                $color={appliedStyle(color)}
                $width={verifiedWidth}
                {...interactiveProps}>
                    <BookText title={title} subtitle={subtitle}/>
                </BookDefault>);
        }
    }

    return(<>
        {orientation ? appliedOrientation(orientation) : appliedDesign(design)}
    </>);
}

export default Book;
