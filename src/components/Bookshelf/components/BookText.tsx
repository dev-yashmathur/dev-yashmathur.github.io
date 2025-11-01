interface Props{
    title?: string;
    subtitle?: string;
}

const BookText = ({title, subtitle} : Props) => {
    return(<>
        {subtitle === undefined ? <>
            <div className="bookshelf__book-content center-content">
                {title && <h2 className="bookshelf__book-title">{title}</h2>}
            </div>
        </> : <>
            <div className="bookshelf__book-content">
                {title && <h2 className="bookshelf__book-title">{title}</h2>}
                {subtitle && <h4 className="bookshelf__book-subtitle">{subtitle}</h4>}
            </div>
        </>}
    </>);
}

export default BookText;