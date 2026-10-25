import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteShell from '../components/SiteShell/SiteShell';
import TagIcon from '../components/SiteShell/TagIcon';
import { getProjectBySlug } from '../data/projects';
import { usePageMeta } from '../utils/usePageMeta';
import NotFoundPage from './NotFoundPage';
import './ProjectDetailPage.css';

const ExternalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h7v2H6.5A1.5 1.5 0 0 0 5 8.5v9A1.5 1.5 0 0 0 6.5 19h9a1.5 1.5 0 0 0 1.5-1.5V12h2v5.5A3.5 3.5 0 0 1 15.5 21h-9A3.5 3.5 0 0 1 3 17.5v-9A3.5 3.5 0 0 1 6.5 5H5Z"
      fill="currentColor"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56 0-.28-.01-1.04-.02-2.04-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.72 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.55-.29-5.23-1.29-5.23-5.77 0-1.28.46-2.33 1.21-3.15-.12-.3-.53-1.52.11-3.17 0 0 .99-.32 3.25 1.21a11.3 11.3 0 0 1 2.96-.4c1 .01 2.01.14 2.96.4 2.26-1.53 3.25-1.21 3.25-1.21.64 1.65.23 2.87.11 3.17a4.5 4.5 0 0 1 1.21 3.15c0 4.5-2.69 5.47-5.25 5.76.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.27 0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3 1.4 1.42L12 17.41l-5.7-5.7 1.4-1.42 3.3 3.3V4a1 1 0 0 1 1-1ZM5 19h14v2H5v-2Z" fill="currentColor" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm0 2.18 7 3.12V11c0 4.38-2.9 8.4-7 9.74-4.1-1.34-7-5.36-7-9.74V6.3l7-3.12Z" fill="currentColor" />
  </svg>
);

const ProjectDetailPage: React.FC = () => {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  usePageMeta(project?.title ?? 'Project not found', project?.summary);

  if (!project) return <NotFoundPage />;

  const localVideos = project.videos ?? [];
  const heroVideo = project.videoUrl ? undefined : localVideos[0];
  const moreVideos = project.videoUrl ? localVideos : localVideos.slice(1);

  return (
    <SiteShell>
    <div className="project-detail-page">
      <header className="project-detail-header">
        <div className="project-detail-header__content">
          <Link to="/" className="project-detail-back-link">
            ← Back to home
          </Link>
          <span className="project-detail-year"><TagIcon />{project.timeline}</span>
        </div>
      </header>

      <main className="project-detail-main">
        <section className="project-detail-hero">
          <div className="project-detail-hero__content">
            {project.videoUrl ? (
              <div className="project-video-wrapper">
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} demo video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : heroVideo ? (
              <div className={`project-video-wrapper${heroVideo.portrait ? ' vertical' : ''}`}>
                <video
                  src={heroVideo.src}
                  poster={heroVideo.poster}
                  title={heroVideo.title}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            ) : null}
            <div className="project-overview">
              <h1>{project.title}</h1>
              <p>{project.overview}</p>

              {project.download && (
                <p className="project-detail-download-note">
                  {project.download.note}. Not yet notarized by Apple, so on first launch right-click the app and
                  choose Open.
                </p>
              )}

              <div className="project-detail-actions">
                {project.download && (
                  <a
                    href={project.download.url}
                    download
                    className="button primary project-detail-button"
                  >
                    <DownloadIcon />
                    <span>{project.download.label}</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button primary project-detail-button"
                  >
                    <ExternalIcon />
                    <span>Open live project</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button project-detail-button"
                  >
                    <GitHubIcon />
                    <span>View GitHub repo</span>
                  </a>
                )}
                {project.privacyPolicyUrl && (
                  <Link
                    to={project.privacyPolicyUrl}
                    className="button project-detail-button"
                  >
                    <ShieldIcon />
                    <span>Privacy Policy</span>
                  </Link>
                )}
              </div>


              <ul className="project-detail-tags" aria-label="Key technologies">
                {project.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="project-detail-section">
          <div className="project-detail-section__content">
            <h2 data-label="MOTIVATION">Motivation</h2>
            <div className="project-detail-text-stack">
              {project.motivation.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="project-detail-section project-detail-process">
          <div className="project-detail-section__content">
            <h2 data-label="THE PROCESS">The process</h2>
            <div className="project-detail-process__grid">
              {project.process.map((step) => (
                <article key={step.title} className="project-detail-process__card">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {moreVideos.length > 0 && (
          <section className="project-detail-section project-detail-videos">
            <div className="project-detail-section__content">
              <h2 data-label="VIDEOS">Videos</h2>
              <div className="project-detail-videos__grid">
                {moreVideos.map((video) => (
                  <figure key={video.src} className="project-detail-videos__item">
                    <div className={`project-video-wrapper${video.portrait ? ' vertical' : ''}`}>
                      <video
                        src={video.src}
                        poster={video.poster}
                        title={video.title}
                        controls
                        playsInline
                        preload="none"
                      />
                    </div>
                    <figcaption>{video.title}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="project-detail-section project-detail-gallery">
          <div className="project-detail-section__content">
            <h2 data-label="GALLERY">Gallery</h2>
            <div className="project-detail-gallery__grid">
              {project.gallery.map((item) => (
                <figure key={item.src} className="project-detail-gallery__item">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
    </SiteShell>
  );
};

export default ProjectDetailPage;
