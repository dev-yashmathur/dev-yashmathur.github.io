interface Props {
  title: string;
  subtitle?: string;
}

const BookText: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className={`bookshelf__book-content${subtitle ? '' : ' center-content'}`}>
      <h2 className="bookshelf__book-title">{title}</h2>
      {subtitle && <h4 className="bookshelf__book-subtitle">{subtitle}</h4>}
    </div>
  );
};

export default BookText;
