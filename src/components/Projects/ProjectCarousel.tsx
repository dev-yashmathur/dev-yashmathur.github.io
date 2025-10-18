import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './ProjectCarousel.css';

// This would typically come from a data file or API
const demoProjects = [
  {
    title: 'E-Commerce Platform',
    skills: ['React', 'Node.js', 'MongoDB'],
    description: 'A fully responsive e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1470',
    timeline: '2023'
  },
  {
    title: 'Task Management App',
    skills: ['React', 'Redux', 'Firebase'],
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1472',
    timeline: '2022'
  },
  {
    title: 'Healthcare Dashboard',
    skills: ['Vue.js', 'D3.js', 'Express'],
    description: 'An interactive healthcare analytics dashboard for medical professionals to track patient metrics, treatment outcomes, and resource utilization.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1632',
    timeline: '2021'
  },
  {
    title: 'Smart Home IoT System',
    skills: ['React Native', 'MQTT', 'Python'],
    description: 'A mobile app for controlling smart home devices with real-time monitoring, automation capabilities, and energy optimization.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1470',
    timeline: '2020'
  },
  {
    title: 'Social Media Analytics Tool',
    skills: ['Angular', 'Django', 'PostgreSQL'],
    description: 'A comprehensive analytics platform for social media marketers with sentiment analysis, engagement metrics, and campaign performance tracking.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1374',
    timeline: '2019'
  },
];

interface ProjectCarouselProps {
  projects?: Array<{
    title: string;
    skills: string[];
    description: string;
    link: string;
    image: string;
    timeline: string;
  }>;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects = demoProjects }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate which projects should be visible (for infinite scroll)
  useEffect(() => {
    const projectsCount = projects.length;
    const newVisibleProjects = [];

    // Always include the focused project
    newVisibleProjects.push(focusedIndex);

    // Add one project before (with wrap around)
    const prevIndex = (focusedIndex - 1 + projectsCount) % projectsCount;
    newVisibleProjects.push(prevIndex);

    // Add one project after (with wrap around)
    const nextIndex = (focusedIndex + 1) % projectsCount;
    newVisibleProjects.push(nextIndex);

    setVisibleProjects(newVisibleProjects);
  }, [focusedIndex, projects.length]);

  const handleNext = () => {
    setFocusedIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setFocusedIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2
          className="section-title"
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

          <div className="carousel-track-container" ref={carouselRef}>
            <div
              className="carousel-track"
              style={{
                transform: `translateX(${-focusedIndex * 380 + (window.innerWidth / 2 - 190)}px)`,
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${
                    visibleProjects.includes(index) ? 'visible' : 'hidden'
                  }`}
                >
                  <ProjectCard
                    {...project}
                    isFocused={index === focusedIndex}
                    onClick={() => setFocusedIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="carousel-arrow carousel-next"
            onClick={handleNext}
            aria-label="Next project"
          >
            →
          </button>
        </div>

        <div className="carousel-dots">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === focusedIndex ? 'active' : ''}`}
              onClick={() => setFocusedIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;