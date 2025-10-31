import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './ProjectCarousel.css';
import { projects as projectDetails } from '../../data/projects';

interface ProjectCarouselProps {
  projects?: Array<{
    title: string;
    skills: string[];
    description: string;
    link?: string;
    learnMoreLink: string;
    image: string;
    timeline: string;
  }>;
}

const defaultProjects = projectDetails.map((project) => ({
  title: project.title,
  skills: project.skills,
  description: project.summary,
  link: project.liveUrl,
  learnMoreLink: project.learnMoreLink,
  image: project.image,
  timeline: project.timeline,
}));

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects = defaultProjects }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const projectsCount = projects.length;

  if (projectsCount === 0) {
    return null;
  }

  const handleNext = () => {
    setFocusedIndex((prev) => (prev + 1) % projectsCount);
  };

  const handlePrev = () => {
    setFocusedIndex((prev) => (prev - 1 + projectsCount) % projectsCount);
  };

  const getPositionClass = (index: number) => {
    const prevIndex = (focusedIndex - 1 + projectsCount) % projectsCount;
    const nextIndex = (focusedIndex + 1) % projectsCount;

    if (index === focusedIndex) return 'position-center';
    if (index === prevIndex) return 'position-left';
    if (index === nextIndex) return 'position-right';
    return 'position-hidden';
  };

  return (
    <section
      id="projects"
      className="projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <motion.h2
          className="section-title"
          id="projects-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <div className="carousel-container">
          <button
            className="carousel-arrow carousel-prev"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            ←
          </button>

          <div className="carousel-track-container" role="group" aria-roledescription="carousel">
            <ul className="carousel-track" role="list" aria-live="polite">
              {projects.map((project, index) => {
                const positionClass = getPositionClass(index);
                const isActive = index === focusedIndex;

                return (
                  <li
                    key={index}
                    className={`carousel-slide ${positionClass}`}
                    aria-hidden={!isActive}
                    tabIndex={isActive ? 0 : -1}
                    role="presentation"
                  >
                    <ProjectCard
                      {...project}
                      isFocused={isActive}
                      onClick={() => setFocusedIndex(index)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            className="carousel-arrow carousel-next"
            onClick={handleNext}
            aria-label="Next project"
          >
            →
          </button>
        </div>
        < br />
        <div className="carousel-dots" role="tablist" aria-label="Project selection">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === focusedIndex ? 'active' : ''}`}
              onClick={() => setFocusedIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              aria-selected={index === focusedIndex}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
