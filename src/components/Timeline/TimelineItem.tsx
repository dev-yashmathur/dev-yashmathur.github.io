import { motion } from 'framer-motion';
import './TimelineItem.css';

interface TimelineItemProps {
  title: string;
  year: string;
  icon: React.ReactNode;
  paragraph: string;
  hyperlink?: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  year,
  icon,
  paragraph,
  hyperlink,
  index
}) => {
  const isOdd = index % 2 === 1;

  const variants = {
    hidden: { opacity: 0, x: isOdd ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.li
      className="timeline-item"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="timeline-content">
        <div className="timeline-icon">{icon}</div>
        <div className="timeline-details">
          <div className="timeline-header">
            <h3 className="timeline-title">{title}</h3>
            <div className="timeline-year">
              {year}
            </div>
          </div>
          <p className="timeline-paragraph">{paragraph}</p>
          {hyperlink && (
            <a
              href={hyperlink}
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-link"
              aria-label={`Learn more about ${title}`}
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default TimelineItem;
