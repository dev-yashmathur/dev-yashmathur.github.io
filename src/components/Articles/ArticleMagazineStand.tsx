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
  },
  {
    title: 'Why distribution matters more than models in AI',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*CZgyEcBEAVbFSymp03sitg.png',
    link: 'https://medium.com/@dev.yashmathur/the-ai-race-of-2025-is-a-completely-different-ballgame-and-i-predict-there-is-already-a-clear-9d50ceab4626',
    preview: 'In 2025, the AI Race seems to be shifting from developing frontier models, to being all about Agents: Actually useful AI that can integrate within your workflows making life simpler.'
  },
  {
    title: 'The best way to use Nano-banana, completely for free',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*NZ0gzNfTUlDv6qCJvBtQLA.png',
    link: 'https://medium.com/@dev.yashmathur/you-are-using-nano-banana-wrong-and-how-to-actually-use-it-57f638bbac2e',
    preview: 'Ever since it’s launch in August 2025, nano-banana has been google’s most successful AI model in a long time, and they know it. Since then, google has been looking to integrate it into everything — NotebookLM, Google Lens, and even Google photos, and more undoubtedly on the way. Enter “Mixboard” — Google’s experimental AI powered concepting tool, that allows you to explore, expand and refine your ideas. In simpler terms — A whiteboard canvas to use Nano banana, as a storyboard for your image generating process.'
  },
  {
    title: 'AI is not going to take your job anytime soon',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*E5cy6lk_zsxeZc9BXUFSRQ.png',
    link: 'https://medium.com/@dev.yashmathur/is-agi-really-coming-the-ai-paradox-68e92997f11a',
    preview: 'Ever since the launch of ChatGPT in 2022, people have been speculating that AI will soon take all jobs, and at first it seemed that way. With each new model being released, both proprietary SOTA models like ChatGPT 4o, Gemini 2.5 Pro, Claude Sonnet 3 as well as open source models like Deepseek R1, Qwen-3-coder and many others the improvements were immediately noticable, and astounding! But then, was the launch of GPT 4.1 (yes, that does exist!) and GPT-5; a model that had everyone hyped up and excited — only to be a catastrophically bad response. Many people even felt that it was worse that Gpt 4o! Following this, were also many more model releases, including Claude sonnet 4.5, Cursor’s own model, and many from the open source community, however, none of them made the same waves as they once did.'
  },
  {
    title: 'Using AI to build an app for over 1 Million users in less than 1 month',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*4i4ltECFJUXIeVPAaTvXiQ.png',
    link: 'https://medium.com/@dev.yashmathur/25-000-for-an-app-with-1m-downloads-all-in-less-than-1-month-db936b936a9e',
    preview: 'They launched an app, hit over 1M downloads and over 1 Million generated videos in the first 24 hours and still had a 99.9 percent uptime. That is an engineering feat of scale that very few companies are able to match. And to top it off, this entire app was (supposedly) built in just 28 days (Including 10 days of testing!!)'
  },
  {
    title: 'I Used Perplexity Comet as My Default Mobile Browser for 1 Month, So You Don’t Have To',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*vd9cfxCWFS5fFSGNA2y6-A.png',
    link: 'https://medium.com/@dev.yashmathur/i-used-perplexity-comet-as-my-default-mobile-browser-for-1-month-so-you-dont-have-to-71c196b6fe50',
    preview: 'I used Perplexity Comet as my default mobile browser for a full month on my Google Pixel 6, testing its AI-powered features like page summaries, tab comparisons, and autonomous actions such as form-filling or product ordering. The pros stood out with subtle AI integration that doesn\'t disrupt browsing, a robust built-in ad blocker, quick fact - checking to spot fake news, and solid basics like multi - tab support, history, and incognito mode.However, it lags behind Chrome in speed, the bottom - placed URL bar feels awkward, mobile AI actions aren\'t as practical as on desktop, it lacks tab gestures and auto-closing, and occasional hallucinations undermine reliability. Overall, Comet feels like a natural extension of the Perplexity app—great for casual, ad-free sessions with instant AI help—but I stick with both it and Chrome for the best of both worlds, eagerly awaiting how giants like Google respond to this AI browser wave.'
  },
  {
    title: 'The Real Benefit of Open Source Models',
    link: 'https://medium.com/@dev.yashmathur/the-real-benefit-of-open-source-models-d7e32df785f6',
    image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*BTecEKRtVR7Ggo7dnCCf3g.png',
    preview: 'TL;DR These models, while not going to replace your chatgpt and claude subscriptions, they allow you the freedom to experiment, and automate without thinking about the cost implications of it all.'
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
              {Array.from({ length: Math.min(5, Math.ceil(articles.length / 4)) }).map((_, rowIndex) => {
                const startIdx = rowIndex * 4;
                const rowArticles = articles.slice(startIdx, startIdx + 4);

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
