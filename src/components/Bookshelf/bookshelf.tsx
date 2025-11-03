import { useState } from "react";
import { motion } from "framer-motion";
import { BookShelf, Book} from "./components";
import { SelectedBookDetails } from "./components/SelectedBookDetails";
import { bookDetailsById, getBookOverview, type BookOverview } from "./data/bookDetails";

export const NewBookshelf = () => {
    const [selectedBook, setSelectedBook] = useState<BookOverview | null>(null);

    const handleBookSelect = (book: { id?: string; title?: string }) => {
        const nextSelection = getBookOverview(book.id ?? book.title);
        setSelectedBook(nextSelection);
    };

    return (
        <>
            <div className="container">
                <motion.h2
                    className="section-title"
                    id="goodreads-heading"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    My Good Reads
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Books that have influenced my thinking and approach
                </motion.p>
            </div>
            <BookShelf>
                <>
                    {Object.values(bookDetailsById).map((book) => (
                        <Book
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            color={book.color}
                            design={book.design}
                            width={book.width}
                            onSelect={handleBookSelect}
                        />
                    ))}
                </>
            </BookShelf>
            <SelectedBookDetails book={selectedBook} />
        </>
    );
};

