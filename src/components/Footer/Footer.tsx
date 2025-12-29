import { config } from '../../utils/config';
import './Footer.css';

const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
            d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56 0-.28-.01-1.04-.02-2.04-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.72 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.55-.29-5.23-1.29-5.23-5.77 0-1.28.46-2.33 1.21-3.15-.12-.3-.53-1.52.11-3.17 0 0 .99-.32 3.25 1.21a11.3 11.3 0 0 1 2.96-.4c1 .01 2.01.14 2.96.4 2.26-1.53 3.25-1.21 3.25-1.21.64 1.65.23 2.87.11 3.17a4.5 4.5 0 0 1 1.21 3.15c0 4.5-2.69 5.47-5.25 5.76.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.27 0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
            fill="currentColor"
        />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            fill="currentColor"
        />
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
            fill="currentColor"
        />
    </svg>
);

const YouTubeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
            d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
            fill="currentColor"
        />
    </svg>
);

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="container site-footer__content">
                <div className="site-footer__section site-footer__brand">
                    <h2 className="site-footer__logo">{config.name}</h2>
                    <p className="site-footer__tagline">
                        Solving Real Problems, from Ideation to Production - Reliably
                    </p>
                    <p>&copy; {currentYear} {config.name}. All rights reserved.</p>
                </div>

                <div className="site-footer__section site-footer__links">
                    <h3 className="site-footer__heading">Socials</h3>
                    <ul className="site-footer__social-list">
                        <li>
                            <a href={config.social.github} target="_blank" rel="noopener noreferrer">
                                <GitHubIcon />
                                <span>GitHub</span>
                            </a>
                        </li>
                        <li>
                            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon />
                                <span>LinkedIn</span>
                            </a>
                        </li>
                        {config.social.instagram && (
                            <li>
                                <a href={config.social.instagram} target="_blank" rel="noopener noreferrer">
                                    <InstagramIcon />
                                    <span>Instagram</span>
                                </a>
                            </li>
                        )}
                        {config.social.youtube && (
                            <li>
                                <a href={config.social.youtube} target="_blank" rel="noopener noreferrer">
                                    <YouTubeIcon />
                                    <span>YouTube</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="site-footer__section site-footer__cta">
                    <h3 className="site-footer__heading">Let's Connect</h3>
                    <div className="site-footer__actions">
                        <a
                            href={config.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary footer-cta-button"
                        >
                            Connect on LinkedIn
                        </a>
                        {config.social.calendly && (
                            <a
                                href={config.social.calendly}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-secondary footer-schedule-button"
                            >
                                Schedule a Meet
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
