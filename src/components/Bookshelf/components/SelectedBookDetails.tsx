import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import type { PageFlip } from "page-flip";
import "./SelectedBookDetails.css";
import type { BookOverview, BookPageContent } from "../data/bookDetails";

interface SelectedBookDetailsProps {
    book: BookOverview | null;
}

interface PageProps {
    children: React.ReactNode;
    number?: string;
    selectedPage?: BookPageContent;
    selectedBook?: BookOverview | null;
}

const CoverPage = React.forwardRef<HTMLDivElement, PageProps>(({ selectedBook }, ref) => {
    if (!selectedBook) {
        return <div className="cover-page" ref={ref} />;
    }

    const {
        title,
        subtitle,
        author,
        coverImage,
        coverImageAlt,
        coverTagline
    } = selectedBook;

    const titleLength = title?.replace(/\s+/g, "").length ?? 0;
    const coverClassNames = ["cover-page"];

    if (titleLength > 18) {
        coverClassNames.push("cover-page--long");
    }

    if (titleLength > 26) {
        coverClassNames.push("cover-page--xlong");
    }

    return (
        <div className={coverClassNames.join(" ")} ref={ref}>
            <div className="cover-page__frame" lang="en">
                <div
                    className="cover-page__art"
                    role="img"
                    aria-label={coverImageAlt}
                    style={{ backgroundImage: `url(${coverImage})` }}
                />
                <div className="cover-page__sheen" aria-hidden="true" />
                <div className="cover-page__content" lang="en">
                    <h1 className="cover-page__title" lang="en">{title}</h1>
                    {subtitle && <p className="cover-page__subtitle">{subtitle}</p>}
                    <span className="cover-page__divider" aria-hidden="true" />
                    {author && <p className="cover-page__author">{author}</p>}
                </div>
            </div>
        </div>
    );
});
const BlankPage = React.forwardRef<HTMLDivElement, PageProps>((_, ref) => {
    return (
        <div ref={ref}></div>
    );
});
const PageLeft = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className="my-page-left" ref={ref}>
            <div className="page-content">
                <div className="page-header">{props.selectedPage?.title}</div>
                <img src={props.selectedPage?.image} alt={props.selectedPage?.imageAlt} />
                {props.selectedPage?.body && (
                    <div
                        className="page-body"
                        dangerouslySetInnerHTML={{ __html: props.selectedPage.body }}
                    />
                )}
                <div className="page-footer">{props.number}</div>
            </div>
        </div>
    );
});
const PageRight = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className="my-page-right" ref={ref}>
            <div className="page-content">
                <div className="page-header">{props.selectedPage?.title}</div>
                <img src={props.selectedPage?.image} alt={props.selectedPage?.imageAlt} />
                {props.selectedPage?.body && (
                    <div
                        className="page-body"
                        dangerouslySetInnerHTML={{ __html: props.selectedPage.body }}
                    />
                )}
                <div className="page-footer">{props.number}</div>
            </div>
        </div>
    );
});

interface IFlipBook {
    pageFlip: () => PageFlip;
}

export const SelectedBookDetails = ({ book }: SelectedBookDetailsProps) => {
    const flipBook = useRef<IFlipBook>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [numPages, setNumPages] = useState(0);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    useEffect(() => {
        if (book?.pages) {
            const totalPages = book.pages.length;
            setNumPages(totalPages);
            setIsNextDisabled(currentPage >= totalPages);
        }
    }, [book, currentPage]);

    const onNext = () => {
        flipBook.current?.pageFlip().flipNext();
    };

    const onPrev = () => {
        flipBook.current?.pageFlip().flipPrev();
    };

    const onFlip = (e: { data: number }) => {
        const newPage = e.data;
        const displayedPage = Math.max(0, newPage - 1);
        setCurrentPage(displayedPage);
        setIsPrevDisabled(newPage <= 1);
        setIsNextDisabled(newPage >= numPages + 1);
    };

    if (!book) return null;
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
                    disableFlipByClick={false}
                    onFlip={onFlip}
                >
                    <BlankPage>Blank</BlankPage>
                    <CoverPage selectedBook={book}>Cover</CoverPage>
                    {book?.pages?.map((page, idx) =>
                        idx % 2 === 0 ? (
                            <PageLeft key={idx} number={(idx + 1).toString()} selectedPage={page}>
                                Left
                            </PageLeft>
                        ) : (
                            <PageRight key={idx} number={(idx + 1).toString()} selectedPage={page}>
                                Right
                            </PageRight>
                        )
                    )}
                </HTMLFlipBook>
            </div>

            <div className="buttons">
                <button onClick={onPrev} disabled={isPrevDisabled} aria-label="Go to Previous Page">&larr;</button>
                <p>Page: {currentPage} / {numPages}</p>
                <button onClick={onNext} disabled={isNextDisabled} aria-label="Go to Next Page">&rarr;</button>
            </div>
        </>
    );
}
