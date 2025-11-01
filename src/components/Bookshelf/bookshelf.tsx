import { useState } from "react";
import { motion } from "framer-motion";
import { BookShelf, Book} from "./components";
import { SelectedBookDetails } from "./components/SelectedBookDetails";
import { getBookOverview, type BookOverview } from "./data/bookDetails";

export const NewBookshelf = () => {
    const [selectedBook, setSelectedBook] = useState<BookOverview | null>(null);

    const handleBookSelect = (book: { id?: string; title?: string }) => {
        const nextSelection = getBookOverview(book.id ?? book.title);
        setSelectedBook(nextSelection);
        console.log("Selected Book:", nextSelection);
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
                <Book id="atomic-habits" title={"Atomic Habits"} author={"James Clear"} color={"#F6C28B"} design={"split bands"} onSelect={handleBookSelect} />
                <Book id="ikigai" title={"Ikigai"} author={"Hector Garcia & Francesc Miralles"} color={"#F7B7A3"} design={"split bands"} onSelect={handleBookSelect} />
                <Book id="how-to-win-friends" title={"How to Win Friends and Influence People"} author={"Dale Carnegie"} width={800} color={"#F8E1A5"} design={"split bands"} onSelect={handleBookSelect} />
                <Book id="million-dollar-weekend" title={"Million Dollar Weekend"} author={"Noah Kagan"} color={"#F3D1DC"} design={"split bands"} onSelect={handleBookSelect} />
                <Book id="power-of-your-subconscious-mind" title={"The Power of Your Subconscious Mind"} author={"Joseph Murphy"} color={"#F2D6B3"} design={"split bands"} onSelect={handleBookSelect} />
            </BookShelf>
            <SelectedBookDetails book={selectedBook} />
        </>
    );
};

