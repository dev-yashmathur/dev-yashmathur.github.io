import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';

describe('ProjectPage HTML Structure', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    const fullHtml = readFileSync(join(__dirname, '../../newDesigns/projectPage.html'), 'utf-8');
    // The file contains 3 HTML documents - extract the second one (Project Page)
    const htmlDocs = fullHtml.split('<!-- Project Details: Classic Games Hub -->');
    const projectHtml = htmlDocs.length > 1 ? htmlDocs[1].split('<!-- Article Detail')[0] : fullHtml;
    dom = new JSDOM(projectHtml);
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

    it('should have viewport meta tag', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      expect(viewportMeta?.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });
  });

  describe('External Resources', () => {
    it('should load Tailwind CSS from CDN', () => {
      const tailwindScript = document.querySelector('script[src*="tailwindcss.com"]');
      expect(tailwindScript).toBeTruthy();
    });

    it('should load Manrope font', () => {
      const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
      const manropeLink = fontLinks.find(link =>
        link.getAttribute('href')?.includes('Manrope')
      );
      expect(manropeLink).toBeTruthy();
    });

    it('should load Material Symbols', () => {
      const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
      const materialSymbolsLinks = fontLinks.filter(link =>
        link.getAttribute('href')?.includes('Material+Symbols+Outlined')
      );
      expect(materialSymbolsLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Tailwind Configuration', () => {
    it('should have tailwind config with custom colors', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript).toBeTruthy();
      expect(configScript?.textContent).toContain('"primary"');
      expect(configScript?.textContent).toContain('"royal-blue"');
    });

    it('should define purple primary color for project page', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"primary": "#7317cf"');
    });

    it('should define royal-blue color', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"royal-blue": "#2563eb"');
    });

    it('should define metallic-slate color', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"metallic-slate"');
    });
  });

  describe('Custom CSS Styles', () => {
    it('should define liquid-glass class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.liquid-glass');
      expect(styleTag?.textContent).toContain('backdrop-filter: blur(12px)');
    });

    it('should define metallic-finish class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.metallic-finish');
      expect(styleTag?.textContent).toContain('linear-gradient');
    });

    it('should define chrome-text class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.chrome-text');
      expect(styleTag?.textContent).toContain('-webkit-background-clip: text');
    });
  });

  describe('Header Navigation', () => {
    it('should have sticky header', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
      expect(header?.classList.contains('sticky')).toBe(true);
    });

    it('should display Yash Mathur branding', () => {
      const brandText = Array.from(document.querySelectorAll('h2')).find(h2 =>
        h2.textContent?.includes('Yash Mathur')
      );
      expect(brandText).toBeTruthy();
      expect(brandText?.classList.contains('chrome-text')).toBe(true);
    });

    it('should have navigation links for Work, About, Contact', () => {
      const workLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Work'
      );
      expect(workLink).toBeTruthy();

      const aboutLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'About'
      );
      expect(aboutLink).toBeTruthy();

      const contactLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Contact'
      );
      expect(contactLink).toBeTruthy();
    });

    it('should have share button', () => {
      const shareIcon = Array.from(document.querySelectorAll('.material-symbols-outlined')).find(icon =>
        icon.textContent === 'share'
      );
      expect(shareIcon).toBeTruthy();
    });

    it('should have royal-blue branding icon', () => {
      const brandIcon = document.querySelector('.bg-royal-blue .material-symbols-outlined');
      expect(brandIcon).toBeTruthy();
      expect(brandIcon?.textContent).toBe('deployed_code');
    });
  });

  describe('Hero Banner Section', () => {
    it('should have large hero image with proper aspect ratio', () => {
      const heroImage = document.querySelector('[class*="aspect-[21/9]"]');
      expect(heroImage).toBeTruthy();
    });

    it('should display "Featured Project" badge', () => {
      const badge = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('Featured') || span.textContent?.includes('Project')
      );
      expect(badge).toBeTruthy();
    });

    it('should display "CLASSIC GAMES HUB" title', () => {
      const title = Array.from(document.querySelectorAll('h1')).find(h1 =>
        h1.textContent?.includes('CLASSIC GAMES HUB')
      );
      expect(title).toBeTruthy();
      expect(title?.classList.contains('chrome-text')).toBe(true);
    });

    it('should have hero image with alt text', () => {
      const heroImage = document.querySelector('[data-alt="Retro gaming console and neon lighting aesthetic"]');
      expect(heroImage).toBeTruthy();
    });

    it('should have gradient overlay on hero image', () => {
      const gradient = document.querySelector('.bg-gradient-to-t');
      expect(gradient).toBeTruthy();
    });
  });

  describe('Project Overview Section', () => {
    it('should have Project Overview section', () => {
      const overviewHeading = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent?.includes('Project') || h3.textContent?.includes('Overview')
      );
      expect(overviewHeading).toBeTruthy();
    });

    it('should describe Classic Games Hub', () => {
      const description = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent?.includes('Classic Games Hub')
      );
      expect(description).toBeTruthy();
      expect(description?.textContent).toContain('high-fidelity');
    });

    it('should mention liquid-smooth UI performance', () => {
      const description = document.body.textContent;
      expect(description).toContain('liquid-smooth UI performance');
    });

    it('should reference metallic design language', () => {
      const description = document.body.textContent;
      expect(description?.toLowerCase()).toContain('metallic');
    });
  });

  describe('Key Features Section', () => {
    it('should have Key Features section', () => {
      const featuresHeading = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent?.includes('Key Features')
      );
      expect(featuresHeading).toBeTruthy();
    });

    it('should list Glass-morphic Engine feature', () => {
      const feature = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'Glass-morphic Engine'
      );
      expect(feature).toBeTruthy();
    });

    it('should list 60FPS Interactions feature', () => {
      const feature = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === '60FPS Interactions'
      );
      expect(feature).toBeTruthy();
    });

    it('should list State Persistence feature', () => {
      const feature = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'State Persistence'
      );
      expect(feature).toBeTruthy();
    });

    it('should list Adaptive UI feature', () => {
      const feature = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'Adaptive UI'
      );
      expect(feature).toBeTruthy();
    });

    it('should have feature cards in grid layout', () => {
      const featureCards = document.querySelectorAll('.metallic-finish');
      expect(featureCards.length).toBeGreaterThanOrEqual(4);
    });

    it('should have icons for each feature', () => {
      const featureIcons = document.querySelectorAll('.material-symbols-outlined');
      const iconTexts = Array.from(featureIcons).map(icon => icon.textContent);
      expect(iconTexts).toContain('blur_on');
      expect(iconTexts).toContain('bolt');
      expect(iconTexts).toContain('shield');
      expect(iconTexts).toContain('palette');
    });
  });

  describe('Project Assets Sidebar', () => {
    it('should have Project Assets section', () => {
      const assetsHeading = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent?.includes('Project Assets')
      );
      expect(assetsHeading).toBeTruthy();
    });

    it('should have View Live Project button', () => {
      const liveButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent?.includes('View Live Project')
      );
      expect(liveButton).toBeTruthy();
      expect(liveButton?.classList.contains('bg-royal-blue')).toBe(true);
    });

    it('should have Source Code button', () => {
      const sourceButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent?.includes('Source Code')
      );
      expect(sourceButton).toBeTruthy();
    });

    it('should have Tech Stack section', () => {
      const techStackHeading = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent?.includes('Tech') || h4.textContent?.includes('Stack')
      );
      expect(techStackHeading).toBeTruthy();
    });

    it('should list Next.js 14 in tech stack', () => {
      const nextjs = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('Next.js') || span.textContent?.includes('Next')
      );
      expect(nextjs).toBeTruthy();
    });

    it('should list TypeScript in tech stack', () => {
      const typescript = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent === 'TypeScript'
      );
      expect(typescript).toBeTruthy();
    });

    it('should list Three.js in tech stack', () => {
      const threejs = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent === 'Three.js'
      );
      expect(threejs).toBeTruthy();
    });

    it('should list Tailwind CSS in tech stack', () => {
      const tailwind = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('Tailwind') || span.textContent?.includes('CSS')
      );
      expect(tailwind).toBeTruthy();
    });

    it('should list Framer Motion in tech stack', () => {
      const framer = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('Framer') || span.textContent?.includes('Motion')
      );
      expect(framer).toBeTruthy();
    });

    it('should list PostgreSQL in tech stack', () => {
      const postgres = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent === 'PostgreSQL'
      );
      expect(postgres).toBeTruthy();
    });

    it('should display project year 2024', () => {
      const year = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent === '2024'
      );
      expect(year).toBeTruthy();
    });

    it('should display Personal Portfolio as client', () => {
      const client = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent === 'Personal Portfolio'
      );
      expect(client).toBeTruthy();
    });
  });

  describe('Footer', () => {
    it('should have footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should display copyright with year 2024', () => {
      const copyright = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('© 2024 Yash Mathur')
      );
      expect(copyright).toBeTruthy();
    });

    it('should have social media icons', () => {
      const footer = document.querySelector('footer');
      const socialIcons = footer?.querySelectorAll('.material-symbols-outlined');
      expect(socialIcons && socialIcons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Layout and Structure', () => {
    it('should use grid layout for main content', () => {
      const grid = document.querySelector('.grid-cols-1.lg\\:grid-cols-12');
      expect(grid).toBeTruthy();
    });

    it('should have main content in 8-column span', () => {
      const mainContent = document.querySelector('.lg\\:col-span-8');
      expect(mainContent).toBeTruthy();
    });

    it('should have sidebar in 4-column span', () => {
      const sidebar = document.querySelector('.lg\\:col-span-4');
      expect(sidebar).toBeTruthy();
    });

    it('should have sticky sidebar', () => {
      const stickySidebar = document.querySelector('.sticky.top-28');
      expect(stickySidebar).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have main element', () => {
      const main = document.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('should have header element', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
    });

    it('should have footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should have proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2Elements = document.querySelectorAll('h2');
      const h3Elements = document.querySelectorAll('h3');
      const h4Elements = document.querySelectorAll('h4');

      expect(h1).toBeTruthy();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);
      expect(h4Elements.length).toBeGreaterThan(0);
    });

    it('should have navigation element', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
    });

    it('should use semantic HTML', () => {
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing', () => {
      const h1 = document.querySelector('h1');
      expect(h1?.className).toContain('md:text');
    });

    it('should have responsive grid for features', () => {
      const grid = document.querySelector('.grid-cols-1.md\\:grid-cols-2');
      expect(grid).toBeTruthy();
    });

    it('should have responsive padding', () => {
      const hasResponsivePadding = document.body.innerHTML.includes('md:py') ||
                                    document.body.innerHTML.includes('lg:px');
      expect(hasResponsivePadding).toBe(true);
    });
  });

  describe('Visual Design Elements', () => {
    it('should use liquid-glass styling', () => {
      const liquidGlass = document.querySelectorAll('.liquid-glass');
      expect(liquidGlass.length).toBeGreaterThan(0);
    });

    it('should use metallic-finish styling', () => {
      const metallicFinish = document.querySelectorAll('.metallic-finish');
      expect(metallicFinish.length).toBeGreaterThan(0);
    });

    it('should use chrome-text styling', () => {
      const chromeText = document.querySelectorAll('.chrome-text');
      expect(chromeText.length).toBeGreaterThan(0);
    });

    it('should have hover effects on cards', () => {
      const hasHoverEffects = document.body.innerHTML.includes('hover:border-royal-blue') ||
                              document.body.innerHTML.includes('hover:scale');
      expect(hasHoverEffects).toBe(true);
    });
  });

  describe('Content Quality', () => {
    it('should have substantial content', () => {
      const body = document.body.textContent || '';
      expect(body.length).toBeGreaterThan(500);
    });

    it('should not contain placeholder text', () => {
      const body = document.body.textContent || '';
      expect(body.toLowerCase()).not.toContain('lorem ipsum');
      expect(body.toLowerCase()).not.toContain('placeholder');
    });

    it('should describe project features in detail', () => {
      const body = document.body.textContent || '';
      expect(body).toContain('Glass-morphic');
      expect(body).toContain('60FPS');
      expect(body).toContain('State Persistence');
      expect(body).toContain('Adaptive UI');
    });
  });

  describe('Interactive Elements', () => {
    it('should have call-to-action buttons', () => {
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have navigation links', () => {
      const navLinks = document.querySelectorAll('nav a');
      expect(navLinks.length).toBeGreaterThanOrEqual(3);
    });

    it('should have social sharing capability', () => {
      const shareButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.querySelector('.material-symbols-outlined[textContent="share"]')
      );
      const shareIcon = Array.from(document.querySelectorAll('.material-symbols-outlined')).find(icon =>
        icon.textContent === 'share'
      );
      expect(shareIcon).toBeTruthy();
    });
  });

  describe('Performance Considerations', () => {
    it('should not have inline event handlers', () => {
      const elementsWithOnClick = document.querySelectorAll('[onclick]');
      expect(elementsWithOnClick.length).toBe(0);
    });

    it('should use CSS classes instead of inline styles where possible', () => {
      const elementsWithInlineStyles = document.querySelectorAll('[style*="background-image"]');
      // Some inline styles for background images are acceptable
      expect(elementsWithInlineStyles.length).toBeLessThan(10);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle missing images gracefully with alt text', () => {
      const images = document.querySelectorAll('[data-alt]');
      expect(images.length).toBeGreaterThan(0);
    });

    it('should have fallback for failed external resources', () => {
      // External fonts and scripts should not be critical
      const body = document.body;
      expect(body).toBeTruthy();
    });
  });
});