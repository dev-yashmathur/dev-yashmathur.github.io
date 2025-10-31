import { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import './Timeline.css';

// This would typically come from a data file or API
const Experiences = [
  {
    title: 'Lead AI Product Engineer - Techolution',
    year: '2025',
    icon: '💻',
    paragraph: 'Led multiple teams to develop and deliver AI Centric solutions, solving real customer problems and driving business value in short timeframes. Worked closely with sales team, to understand customer requirements and translate them into technical solutions. Worked on all aspects of developing a product, from the AI Pipelines, to the interface and deployment.',
    hyperlink: undefined
  },
  {
    title: 'Associate AI Engineer - Techolution',
    year: '2024',
    icon: '🚀',
    paragraph: 'Worked with highly agile teams, working closely with customers to devliver GenAI powered solution, enhancing quality and improving efficiency. Also worked on lesser known technologies such as Google AppScript.',
    hyperlink: undefined
  },
  {
    title: 'AI Intern - Techolution',
    year: '2024',
    icon: '🔧',
    paragraph: 'Worked on developing GenAI powered applications, including a strong focus on Finetuning, RAG Pipelines and Prompt Engineering.',
    hyperlink: undefined
  },
  {
    title: 'BTech in Artificial Intelligence - Mahindra University',
    year: '2024',
    icon: '🎓',
    paragraph: 'Graduated with a Bachelor\'s degree in Computer Science. Specialized in software engineering and machine learning.',
    hyperlink: undefined
  },
  {
    title: 'Intern - ADP',
    year: '2023',
    icon: '🎓',
    paragraph: 'Graduated with a Bachelor\'s degree in Computer Science. Specialized in software engineering and machine learning.',
    hyperlink: undefined
  },

];

interface TimelineProps {
  experiences?: Array<{
    title: string;
    year: string;
    icon: string;
    paragraph: string;
    hyperlink?: string;
  }>;
}

const Timeline: React.FC<TimelineProps> = ({ experiences = Experiences }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, experiences.length));
  };

  return (
    <section
      id="timeline"
      className="timeline-section"
      aria-labelledby="timeline-heading"
    >
      <div className="container">
        <motion.h2
          className="section-title"
          id="timeline-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-items">
            {experiences.slice(0, visibleCount).map((experience, index) => (
              <TimelineItem
                key={index}
                title={experience.title}
                year={experience.year}
                icon={<span role="img" aria-hidden="true">{experience.icon}</span>}
                paragraph={experience.paragraph}
                hyperlink={experience.hyperlink}
                index={index}
              />
            ))}
          </div>

          {visibleCount < experiences.length && (
            <motion.div
              className="timeline-load-more"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                className="button-secondary"
                onClick={loadMore}
              >
                Show More
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
