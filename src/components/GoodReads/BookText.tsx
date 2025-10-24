interface BookTextProps {
  title?: string;
  subtitle?: string;
}

const BookText: React.FC<BookTextProps> = ({ title, subtitle }) => {
  return subtitle ? (
    <div className="bookshelf__book-content">
      {title && <h2 className="bookshelf__book-title">{title}</h2>}
      {subtitle && <h4 className="bookshelf__book-subtitle">{subtitle}</h4>}
    </div>
  ) : (
    <div className="bookshelf__book-content bookshelf__book-content--center">
      {title && <h2 className="bookshelf__book-title">{title}</h2>}
    </div>
  );
};

export default BookText;
