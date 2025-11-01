import React from "react";
import HTMLFlipBook from "react-pageflip";
import "./SelectedBookDetails.css";
import type { BookOverview } from "../data/bookDetails";

interface SelectedBookDetailsProps {
    book: BookOverview | null;
}

interface PageProps {
    children: React.ReactNode;
    number: string;
}

const CoverPage = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div ref={ref}></div>
    );
});
const PageLeft = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className="my-page-left" ref={ref}>
            <div className="page-content">
                <div className="page-header">PAGE HEADER - {props.number}</div>
                <img src={`https://dummyimage.com/300x200/000/fff&text=Image+${props.number}`} alt={`Image ${props.number}`} />
                <p>Lorem </p>
                <div className="page-footer">{props.number}</div>
            </div>
        </div>
    );
});
const PageRight = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className="my-page-right" ref={ref}>
            <div className="page-content">
                <div className="page-header">PAGE HEADER - {props.number}</div>
                <img src={`https://dummyimage.com/300x200/000/fff&text=Image+${props.number}`} alt={`Image ${props.number}`} />
                <p>Lorem ipsum </p>
                <div className="page-footer">{props.number}</div>
            </div>
        </div>
    );
});

export const SelectedBookDetails = ({ book }: SelectedBookDetailsProps) => {
    console.log("Rendering SelectedBookDetails with book:", book);
    const flipBook = React.useRef<any>(null);

    const onNext = () => {
        flipBook.current.pageFlip().flipNext();
    };

    const onPrev = () => {
        flipBook.current.pageFlip().flipPrev();
    };

    return (
        <>
            <div className="selected-book-reader">
                <HTMLFlipBook
                    ref={flipBook}
                    width={300}
                    height={450}
                    className="demo-book"
                    style={{}}
                    startPage={0}
                    size="fixed"
                    minWidth={0}
                    maxWidth={0}
                    minHeight={0}
                    maxHeight={0}
                    drawShadow={true}
                    flippingTime={600}
                    usePortrait={true}
                    startZIndex={0}
                    autoSize={true}
                    maxShadowOpacity={1}
                    showCover={false}
                    mobileScrollSupport={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={10}
                    showPageCorners={true}
                    disableFlipByClick={false}>
                    <CoverPage number="2">Blank</CoverPage>
                    <PageRight number="0">Page text</PageRight>
                    <PageLeft number="1">Page text</PageLeft>
                    <PageRight number="2">Page text</PageRight>
                    <PageLeft number="3">Page text</PageLeft>
                    <PageRight number="4">Page text</PageRight>
                </HTMLFlipBook>
            </div>

            <div className="buttons">
                <button onClick={onPrev} aria-label="Go to Previous Page">&larr;</button>
                <button onClick={onNext} aria-label="Go to Next Page">&rarr;</button>
            </div>
        </>
    );
}