import { motion } from 'framer-motion';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  skills: string[];
  description: string;
  link: string;
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
  image,
  timeline,
  isFocused,
  onClick
}) => {
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
    <motion.div
      className={`project-card ${isFocused ? 'focused' : ''}`}
      onClick={onClick}
      variants={cardVariants}
      animate={isFocused ? 'focused' : 'unfocused'}
      initial="unfocused"
      whileHover={{ scale: isFocused ? 1.02 : 0.95 }}
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
        <p className="project-card-description">{description}</p>

        {isFocused && (
          <motion.div
            className="project-card-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary project-card-link"
            >
              View Project
            </a>
            <a
              href={`/projects/${title.toLowerCase().replace(/\s+/g, '-')}`}
              className="project-card-learn-more"
            >
              Learn more
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;