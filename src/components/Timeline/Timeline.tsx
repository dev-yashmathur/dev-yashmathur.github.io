import { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import './Timeline.css';

// This would typically come from a data file or API
const Experiences = [
  {
    title: 'Lead AI Product Engineer - Techolution',
    year: 'Apr 25 - Oct 25',
    icon: '💻',
    paragraph: 'Led multiple teams to develop and deliver AI Centric solutions, solving real customer problems and driving business value in short timeframes. Worked closely with sales team, to understand customer requirements and translate them into technical solutions. Contributed to all aspects of developing a product, from the Architecture, to the interface and deployment.',
    hyperlink: undefined
  },
  {
    title: 'Associate AI Engineer - Techolution',
    year: 'July 24 - Apr 25',
    icon: '🚀',
    paragraph: 'Worked with highly agile teams, working closely with customers to devliver GenAI powered solution, enhancing quality and improving efficiency. Also worked on lesser known technologies such as Google AppScript.',
    hyperlink: undefined
  },
  {
    title: 'AI Intern - Techolution',
    year: 'Jan 24 - Jul 24',
    icon: '🔧',
    paragraph: 'Worked on developing GenAI powered applications, including a strong focus on Finetuning, RAG Pipelines and Prompt Engineering.',
    hyperlink: undefined
  },
  {
    title: 'Intern - ADP',
    year: 'July 23 - Oct 23',
    icon: '🎓',
    paragraph: 'This was my first corporate expereince, where besides the tasks alloted to me, I also participated in software engineering practices such as Daily Scrums and Jira. I worked with highly skilled teams, contributing to significant initiatives for integrating AI features into existing products, building the visual frontend component (Angular, StencilJS) for it, as well as working on the backend APIs (Java SpringBoot) and assisting in the AI pipeline and Testing processes.',
    hyperlink: undefined
  },
  {
    title: 'BTech in Artificial Intelligence - Mahindra University',
    year: '2020 - 2024',
    icon: '🎓',
    paragraph: 'Completed my Graduation in Artifical Intellegence, which included key couses such as NLP, Deep Learning, High Performance Computing, Big Data and Quantum Computing. Graduated amoungst the top of the batch, having received 2 scholarships.',
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
  const [visibleCount, setVisibleCount] = useState(7);

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
