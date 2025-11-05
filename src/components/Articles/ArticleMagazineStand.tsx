import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleModal from './ArticleModal';
import './ArticleMagazineStand.css';

// This would typically come from a data file or API
const demoArticles = [
  {
    title: 'Getting Started with application building using LLMs| Rapid Prototyping for GenAI Applications',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*3fzbDFqywsYg6Kk1gAReyw.png',
    link: 'https://medium.com/@dev.yashmathur/getting-started-with-application-building-using-llms-for-free-ed22a2ac422a',
    preview: 'LLMs have forever changed our approach to various aspects of life. Showcasing an unprecedented level of understanding, they are now able to perform tasks, that were earlier thought to be impossible for machines, at a capability level, often surpassing that of the average human in that field. It’s no wonder tech giants are pouring billions of dollars betting their future on this technology.'
  },
  {
    title: 'Top 5 Google AI Products you should be using to 10x your productivity.',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*CZgyEcBEAVbFSymp03sitg.png',
    link: 'https://medium.com/@dev.yashmathur/the-ai-race-of-2025-is-a-completely-different-ballgame-and-i-predict-there-is-already-a-clear-9d50ceab4626',
    preview: 'In 2025, the AI Race seems to be shifting from developing frontier models, to being all about Agents: Actually useful AI that can integrate within your workflows making life simpler.'
  },
  {
    title: 'Want to gain the benefits of OpenSource LLMs without having the local compute?',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*OVtL4uWnnL-5XrM3cQohQQ.png',
    link: 'https://medium.com/@dev.yashmathur/unleashing-the-power-of-open-source-llms-in-your-applications-practical-tips-c3a807249128',
    preview: 'We’re living in an exciting time of rapid progress in generative AI. What’s even more amazing is the incredible community of bright minds sharing their Large Language Models (LLMs) as open source, making them accessible to everyone. However, despite this openness, paid models like those from Google, OpenAI, and Antropic still hold the spotlight. One big reason for this is that even though open-source models are available, they often require hefty hardware and can be pretty slow on basic setups. So, where does that leave us developers? Is it game over for us when it comes to enjoying the perks of open-source models?'
  },
  {
    title: 'A comparative look at LLMs for developers| ft. OpenAI o1-preview',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*GxYnktzS6EY-SHbPL6AbKA.jpeg',
    link: 'https://medium.com/@dev.yashmathur/a-comparative-look-at-llms-for-developers-ft-openai-o1-preview-6831dd0baa41',
    preview: 'The past few weeks have been incredibly exciting for AI enthusiasts. With new state-of-the-art models rolling out each week, we’re seeing a whole new level of potential for what generative AI can achieve in terms of accuracy.'
  },
  {
    title: 'OpenAI’s o1-preview: Revolution or Hype? Comparing with traditional Chain of Thought in GPT-4o',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*e4UJVq61YHN-f1Iza_bQdQ.jpeg',
    link: 'https://medium.com/@dev.yashmathur/openais-o1-preview-revolution-or-hype-comparing-with-traditional-chain-of-thought-in-gpt-4o-ce8f30fdcbce',
    preview: 'With the launch of OpenAI’s o1 line of models, the AI giant, claims to have added “thinking” capabilities to their models. However, in their typical fashion, they have not been very ‘open’ on the techniques used to achieve this. And as icing on the cake, there are multiple users, who have received warnings of being banned, for simply trying to ask the model to explain how it works….. now that seems very excessive…'
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
              className="section-title"
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
