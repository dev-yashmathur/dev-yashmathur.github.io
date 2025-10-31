import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useId } from 'react';
import type { KeyboardEvent } from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  skills: string[];
  description: string;
  link?: string;
  learnMoreLink: string;
  image: string;
  timeline: string;
  isFocused: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  skills,
  description,
  link,
  learnMoreLink,
  image,
  timeline,
  isFocused,
  onClick
}) => {
  const descriptionId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  const cardVariants = {
    focused: {
      scale: 1,
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    },
    unfocused: {
      scale: 0.9,
      y: 30,
      opacity: 0.7,
      rotateY: 15,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.article
      className={`project-card ${isFocused ? 'focused' : ''}`}
      onClick={onClick}
      variants={cardVariants}
      animate={isFocused ? 'focused' : 'unfocused'}
      initial="unfocused"
      whileHover={{ scale: isFocused ? 1.02 : 0.95 }}
      role="group"
      aria-label={`${title} project`}
      aria-describedby={descriptionId}
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div
        className="project-card-image"
        style={{
          backgroundImage: `url(${image})`
        }}
      >
        <div className="project-card-timeline">{timeline}</div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <div className="project-card-skills">
          {skills.map((skill, index) => (
            <span key={index} className="project-card-skill">{skill}</span>
          ))}
        </div>
        <p className="project-card-description" id={descriptionId}>{description}</p>

        {isFocused && (
          <motion.div
            className="project-card-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary project-card-link"
                onClick={(event) => event.stopPropagation()}
              >
                View Live!
              </a>
            )}
            <Link
              to={learnMoreLink}
              className="project-card-learn-more"
              onClick={(event) => event.stopPropagation()}
            >
              Learn more
            </Link>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
