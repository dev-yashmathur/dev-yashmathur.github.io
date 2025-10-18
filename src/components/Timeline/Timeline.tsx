import { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import './Timeline.css';

// This would typically come from a data file or API
const demoExperiences = [
  {
    title: 'Senior Software Engineer at XYZ Company',
    year: '2023',
    icon: '💻',
    paragraph: 'Led development of scalable backend services using Node.js and Golang. Improved system performance by 40% through architectural optimizations.',
    hyperlink: '#'
  },
  {
    title: 'Software Developer at ABC Tech',
    year: '2021',
    icon: '🚀',
    paragraph: 'Developed and maintained front-end components using React and TypeScript. Collaborated with UX team to implement responsive designs.',
    hyperlink: '#'
  },
  {
    title: 'Junior Developer at Tech Startup',
    year: '2020',
    icon: '🔧',
    paragraph: 'Contributed to full-stack development using MERN stack. Implemented authentication system and real-time data updates using websockets.',
    hyperlink: '#'
  },
  {
    title: 'Computer Science Degree',
    year: '2019',
    icon: '🎓',
    paragraph: 'Graduated with a Bachelor\'s degree in Computer Science. Specialized in software engineering and machine learning.',
    hyperlink: '#'
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

const Timeline: React.FC<TimelineProps> = ({ experiences = demoExperiences }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, experiences.length));
  };

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <motion.h2
          className="section-title"
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
                icon={<span role="img" aria-label="icon">{experience.icon}</span>}
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