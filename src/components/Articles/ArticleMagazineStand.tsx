import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleModal from './ArticleModal';
import './ArticleMagazineStand.css';

// This would typically come from a data file or API
const demoArticles = [
  {
    title: 'The Future of Web Development in 2023',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1472',
    link: '#',
    preview: 'Explore emerging trends in web development including serverless architectures, edge computing, WebAssembly, and the continuing rise of JAMstack. This article examines how these technologies are reshaping the way we build and deploy web applications.'
  },
  {
    title: 'Understanding Microservices Architecture',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1470',
    link: '#',
    preview: 'A comprehensive guide to microservices architecture, discussing its benefits, challenges, and implementation strategies. Learn how breaking down monolithic applications into smaller, independently deployable services can enhance scalability and development velocity.'
  },
  {
    title: 'Building Accessible UI Components',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1470',
    link: '#',
    preview: 'An in-depth look at designing and developing accessible UI components for the web. This article covers ARIA attributes, keyboard navigation, focus management, and testing strategies to ensure your interfaces are usable by everyone.'
  },
  {
    title: 'Optimizing React Application Performance',
    image: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?auto=format&fit=crop&q=80&w=1374',
    link: '#',
    preview: 'Practical techniques for improving React application performance, including component memoization, code splitting, virtualized lists, and effective state management strategies. Learn how to identify and resolve common performance bottlenecks.'
  },
  {
    title: 'Introduction to TypeScript for JavaScript Developers',
    image: 'https://images.unsplash.com/photo-1629654291663-b91ad427698f?auto=format&fit=crop&q=80&w=1374',
    link: '#',
    preview: 'A beginner-friendly guide to TypeScript for developers familiar with JavaScript. Explore static typing, interfaces, generics, and how TypeScript can help catch errors at compile time rather than runtime, improving code quality and developer experience.'
  }
];

interface ArticleMagazineStandProps {
  articles?: Array<{
    title: string;
    image: string;
    link: string;
    preview: string;
  }>;
}

const ArticleMagazineStand: React.FC<ArticleMagazineStandProps> = ({ articles = demoArticles }) => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const standRef = useRef<HTMLDivElement>(null);

  const handleArticleClick = (article: typeof articles[0]) => {
    setSelectedArticle(article);
  };

  const handleArticleKeyDown = (event: KeyboardEvent<HTMLDivElement>, article: typeof articles[0]) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleArticleClick(article);
    }
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <section
      id="articles"
      className="articles-section"
      aria-labelledby="articles-heading"
    >
      <div className="container">
        <div className="articles-content">
          <div className="articles-text">
            <motion.h2
              className="section-title articles-heading"
              id="articles-heading"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Articles
            </motion.h2>
            <motion.p
              className="articles-description"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore my thoughts and insights on software development, technology trends, and best practices.
              Click on any magazine to read the article preview.
            </motion.p>
          </div>

          <div className="magazine-stand-container">
            <div className="magazine-stand" ref={standRef}>
              {/* Split articles into rows (5 shelves, ~1-2 magazines per shelf) */}
              {Array.from({ length: Math.min(5, Math.ceil(articles.length / 2)) }).map((_, rowIndex) => {
                const startIdx = rowIndex * 2;
                const rowArticles = articles.slice(startIdx, startIdx + 2);

                return (
                  <div key={rowIndex} className="magazine-row-container">
                    <div className="magazine-row">
                      {rowArticles.map((article, idx) => (
                        <motion.div
                          key={startIdx + idx}
                          className="magazine"
                          whileHover={{
                            y: -22,
                            scale: 1.08,
                            rotateX: 6,
                            zIndex: 24,
                            transition: { duration: 0.28, ease: 'easeOut' }
                          }}
                          onClick={() => handleArticleClick(article)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Open preview for ${article.title}`}
                          onKeyDown={(event) => handleArticleKeyDown(event, article)}
                        >
                          <div
                            className="magazine-cover"
                            style={{
                              backgroundImage: `url(${article.image})`
                            }}
                          />
                          <div className="magazine-title-overlay">
                            <h3>{article.title}</h3>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="magazine-stand-shelf"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedArticle && (
            <ArticleModal article={selectedArticle} onClose={closeModal} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ArticleMagazineStand;
