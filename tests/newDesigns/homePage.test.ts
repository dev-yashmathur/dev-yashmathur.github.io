import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';
import { getByText, getByRole, getAllByRole, queryByText } from '@testing-library/dom';

describe('HomePage HTML Structure', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    const fullHtml = readFileSync(join(__dirname, '../../newDesigns/homePage.html'), 'utf-8');
    // The file contains 3 HTML documents - extract the first one (Home Page)
    const htmlDocs = fullHtml.split('<!-- Project Details:')[0];
    dom = new JSDOM(htmlDocs);
    document = dom.window.document;
  });

  describe('Document Structure', () => {
    it('should have proper DOCTYPE declaration', () => {
      const doctype = dom.window.document.doctype;
      expect(doctype).toBeTruthy();
      expect(doctype?.name).toBe('html');
    });

    it('should have lang attribute set to "en"', () => {
      const htmlElement = document.documentElement;
      expect(htmlElement.getAttribute('lang')).toBe('en');
    });

    it('should have dark class on html element', () => {
      const htmlElement = document.documentElement;
      expect(htmlElement.classList.contains('dark')).toBe(true);
    });

    it('should have proper charset meta tag', () => {
      const charsetMeta = document.querySelector('meta[charset]');
      expect(charsetMeta?.getAttribute('charset')).toBe('utf-8');
    });

    it('should have viewport meta tag for responsive design', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      expect(viewportMeta?.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });
  });

  describe('External Resources', () => {
    it('should load Manrope font from Google Fonts', () => {
      const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
      const manropeLink = fontLinks.find(link =>
        link.getAttribute('href')?.includes('Manrope')
      );
      expect(manropeLink).toBeTruthy();
    });

    it('should load Material Symbols font', () => {
      const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
      const materialSymbolsLinks = fontLinks.filter(link =>
        link.getAttribute('href')?.includes('Material+Symbols+Outlined')
      );
      expect(materialSymbolsLinks.length).toBeGreaterThan(0);
    });

    it('should load Tailwind CSS from CDN', () => {
      const tailwindScript = document.querySelector('script[src*="tailwindcss.com"]');
      expect(tailwindScript).toBeTruthy();
      expect(tailwindScript?.getAttribute('src')).toContain('plugins=forms,container-queries');
    });
  });

  describe('Tailwind Configuration', () => {
    it('should have tailwind config script', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript).toBeTruthy();
      expect(configScript?.textContent).toContain('tailwind.config');
    });

    it('should define custom primary color', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"primary": "#1e40af"');
    });

    it('should define custom background colors', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"background-light"');
      expect(configScript?.textContent).toContain('"background-dark"');
    });

    it('should use Manrope as display font family', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"display": ["Manrope"');
    });
  });

  describe('Custom CSS Styles', () => {
    it('should define liquid-glass class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.liquid-glass');
      expect(styleTag?.textContent).toContain('backdrop-filter: blur(25px)');
    });

    it('should define thick-glass class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.thick-glass');
      expect(styleTag?.textContent).toContain('backdrop-filter: blur(40px)');
    });

    it('should define engraved-text class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.engraved-text');
      expect(styleTag?.textContent).toContain('-webkit-background-clip: text');
    });

    it('should define metal-shelf class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.metal-shelf');
    });

    it('should define caustic-light class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.caustic-light');
    });
  });

  describe('Header Navigation', () => {
    it('should have a fixed header with proper z-index', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
      expect(header?.classList.contains('fixed')).toBe(true);
      expect(header?.classList.contains('z-50')).toBe(true);
    });

    it('should display YM logo/brand', () => {
      const brandText = document.querySelector('h2');
      expect(brandText?.textContent).toContain('YM');
    });

    it('should have Material Symbols icon in logo', () => {
      const logoIcon = document.querySelector('header .material-symbols-outlined');
      expect(logoIcon).toBeTruthy();
      expect(logoIcon?.textContent).toBe('deployed_code');
    });

    it('should have navigation links for Experience, Projects, and Articles', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();

      const experienceLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Experience'
      );
      expect(experienceLink?.getAttribute('href')).toBe('#experience');

      const projectsLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Projects'
      );
      expect(projectsLink?.getAttribute('href')).toBe('#projects');

      const articlesLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Articles'
      );
      expect(articlesLink?.getAttribute('href')).toBe('#articles');
    });

    it('should have a Connect button', () => {
      const connectButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent?.trim() === 'Connect'
      );
      expect(connectButton).toBeTruthy();
      expect(connectButton?.classList.contains('liquid-glass')).toBe(true);
    });
  });

  describe('Hero Section', () => {
    it('should display availability badge', () => {
      const badge = document.querySelector('.animate-ping');
      expect(badge).toBeTruthy();

      const badgeText = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('Available') || span.textContent?.includes('High-Impact')
      );
      expect(badgeText).toBeTruthy();
    });

    it('should display main heading with name', () => {
      const heading = Array.from(document.querySelectorAll('h1')).find(h1 =>
        h1.textContent?.includes('Yash Mathur')
      );
      expect(heading).toBeTruthy();
      expect(heading?.classList.contains('engraved-text')).toBe(true);
    });

    it('should have descriptive tagline', () => {
      const tagline = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent?.includes('Solving Real Problems')
      );
      expect(tagline).toBeTruthy();
      expect(tagline?.textContent).toContain('Ideation to Production');
    });

    it('should have LinkedIn call-to-action link', () => {
      const linkedInLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent?.includes('Connect on LinkedIn')
      );
      expect(linkedInLink).toBeTruthy();
      expect(linkedInLink?.getAttribute('href')).toBe('https://linkedin.com');
    });

    it('should have Schedule a Meet link', () => {
      const meetLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent?.includes('Schedule a Meet')
      );
      expect(meetLink).toBeTruthy();
    });

    it('should have hero image with proper alt text', () => {
      const heroImage = document.querySelector('[data-alt="Abstract 3D digital neural network architecture"]');
      expect(heroImage).toBeTruthy();
    });
  });

  describe('Experience Timeline Section', () => {
    it('should have experience section with proper id', () => {
      const experienceSection = document.querySelector('#experience');
      expect(experienceSection).toBeTruthy();
    });

    it('should display "The Progression" heading', () => {
      const heading = Array.from(document.querySelectorAll('h2')).find(h2 =>
        h2.textContent === 'The Progression'
      );
      expect(heading).toBeTruthy();
    });

    it('should list Lead AI Product Engineer position', () => {
      const position = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'Lead AI Product Engineer'
      );
      expect(position).toBeTruthy();
    });

    it('should list Associate AI Engineer position', () => {
      const position = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'Associate AI Engineer'
      );
      expect(position).toBeTruthy();
    });

    it('should list AI Intern position', () => {
      const position = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'AI Intern'
      );
      expect(position).toBeTruthy();
    });

    it('should display Techolution as company for all positions', () => {
      const companyMentions = Array.from(document.querySelectorAll('p')).filter(p =>
        p.textContent === 'Techolution'
      );
      expect(companyMentions.length).toBeGreaterThanOrEqual(3);
    });

    it('should have timeline visual element', () => {
      const timeline = document.querySelector('[class*="before:bg-gradient-to-b"]');
      expect(timeline).toBeTruthy();
    });
  });

  describe('Projects Section', () => {
    it('should have projects section with proper id', () => {
      const projectsSection = document.querySelector('#projects');
      expect(projectsSection).toBeTruthy();
    });

    it('should display "Selected Projects" heading', () => {
      const heading = Array.from(document.querySelectorAll('h2')).find(h2 =>
        h2.textContent === 'Selected Projects'
      );
      expect(heading).toBeTruthy();
    });

    it('should showcase Classic Games Hub project', () => {
      const project = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'Classic Games Hub'
      );
      expect(project).toBeTruthy();
    });

    it('should showcase Increzio - Habit Tracker project', () => {
      const project = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'Increzio - Habit Tracker'
      );
      expect(project).toBeTruthy();
    });

    it('should showcase Tambola Desktop App project', () => {
      const project = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'Tambola Desktop App'
      );
      expect(project).toBeTruthy();
    });

    it('should have project cards with hover effects', () => {
      const projectCards = document.querySelectorAll('.thick-glass');
      expect(projectCards.length).toBeGreaterThan(0);
    });

    it('should display tech stack for projects', () => {
      const techStack = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('Next.js')
      );
      expect(techStack).toBeTruthy();
    });
  });

  describe('Articles Section', () => {
    it('should have articles section with proper id', () => {
      const articlesSection = document.querySelector('#articles');
      expect(articlesSection).toBeTruthy();
    });

    it('should display "Insights & Articles" heading', () => {
      const heading = Array.from(document.querySelectorAll('h2')).find(h2 =>
        h2.textContent === 'Insights & Articles'
      );
      expect(heading).toBeTruthy();
    });

    it('should list article about LLM application building', () => {
      const article = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent?.includes('Getting Started') || h4.textContent?.includes('LLM')
      );
      expect(article).toBeTruthy();
    });

    it('should list article about AI distribution', () => {
      const article = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent?.includes('distribution') || h4.textContent?.includes('AI')
      );
      expect(article).toBeTruthy();
    });

    it('should list article about Open Source AI', () => {
      const article = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent?.includes('The Real Benefit of Open Source AI')
      );
      expect(article).toBeTruthy();
    });

    it('should have View More button', () => {
      const viewMoreButton = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent === 'View More'
      );
      expect(viewMoreButton).toBeTruthy();
    });

    it('should have article cards with metal-shelf design element', () => {
      const shelves = document.querySelectorAll('.metal-shelf');
      expect(shelves.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Footer', () => {
    it('should have a footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should display copyright text with Yash Mathur', () => {
      const copyright = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent?.includes('© 2026 Yash Mathur')
      );
      expect(copyright).toBeTruthy();
    });

    it('should have social media icon links', () => {
      const footer = document.querySelector('footer');
      const socialIcons = footer?.querySelectorAll('.material-symbols-outlined');
      expect(socialIcons && socialIcons.length).toBeGreaterThanOrEqual(4);
    });

    it('should display Yash Mathur name in footer', () => {
      const footer = document.querySelector('footer');
      const nameInFooter = Array.from(footer?.querySelectorAll('h2') || []).find(h2 =>
        h2.textContent === 'Yash Mathur'
      );
      expect(nameInFooter).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have main element for primary content', () => {
      const main = document.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('should have semantic header element', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
    });

    it('should have semantic footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should have semantic nav element', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
    });

    it('should have proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2Elements = document.querySelectorAll('h2');
      const h3Elements = document.querySelectorAll('h3');

      expect(h1).toBeTruthy();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('should have descriptive link text (no "click here")', () => {
      const links = Array.from(document.querySelectorAll('a'));
      const clickHereLinks = links.filter(link =>
        link.textContent?.toLowerCase().includes('click here')
      );
      expect(clickHereLinks.length).toBe(0);
    });
  });

  describe('Responsive Design', () => {
    it('should use responsive classes for hero section', () => {
      const hero = document.querySelector('h1');
      expect(hero?.className).toContain('md:text');
    });

    it('should have responsive grid for projects', () => {
      const projectsGrid = document.querySelector('#projects .grid');
      expect(projectsGrid?.className).toContain('md:grid-cols');
      expect(projectsGrid?.className).toContain('lg:grid-cols');
    });

    it('should have responsive padding', () => {
      const sections = document.querySelectorAll('section');
      const hasResponsivePadding = Array.from(sections).some(section =>
        section.className.includes('lg:py') || section.className.includes('md:py')
      );
      expect(hasResponsivePadding).toBe(true);
    });
  });

  describe('Performance Considerations', () => {
    it('should not have inline event handlers (separation of concerns)', () => {
      const elementsWithOnClick = document.querySelectorAll('[onclick]');
      expect(elementsWithOnClick.length).toBe(0);
    });

    it('should use external stylesheets for fonts', () => {
      const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
      expect(linkTags.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('should have professional and complete content', () => {
      const body = document.body.textContent || '';
      expect(body.length).toBeGreaterThan(500);
    });

    it('should not contain placeholder text', () => {
      const body = document.body.textContent || '';
      expect(body.toLowerCase()).not.toContain('lorem ipsum');
      expect(body.toLowerCase()).not.toContain('placeholder');
    });

    it('should have AI/tech focused content', () => {
      const body = document.body.textContent || '';
      expect(body).toContain('AI');
      expect(body.toLowerCase()).toContain('llm');
    });
  });
});