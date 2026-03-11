import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';

describe('ArticlePage HTML Structure', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    const fullHtml = readFileSync(join(__dirname, '../../newDesigns/articlePage.html'), 'utf-8');
    // The file contains 3 HTML documents - extract the third one (Article Page)
    const htmlDocs = fullHtml.split('<!-- Article Detail: Building with LLMs -->');
    const articleHtml = htmlDocs.length > 1 ? htmlDocs[1] : fullHtml;
    dom = new JSDOM(articleHtml);
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
    it('should have tailwind config', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript).toBeTruthy();
    });

    it('should define blue primary color (#0052FF)', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"primary": "#0052FF"');
    });

    it('should define custom background colors', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"background-light"');
      expect(configScript?.textContent).toContain('"background-dark"');
    });

    it('should use Manrope as display font', () => {
      const configScript = document.querySelector('script#tailwind-config');
      expect(configScript?.textContent).toContain('"display": ["Manrope"');
    });
  });

  describe('Custom CSS Styles', () => {
    it('should define glass-slab class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.glass-slab');
      expect(styleTag?.textContent).toContain('backdrop-filter: blur(12px)');
    });

    it('should define metallic-border class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.metallic-border');
    });

    it('should define liquid-bg class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.liquid-bg');
    });

    it('should define glossy-button class', () => {
      const styleTag = document.querySelector('style');
      expect(styleTag?.textContent).toContain('.glossy-button');
    });
  });

  describe('Header Navigation', () => {
    it('should have sticky header', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
      expect(header?.classList.contains('sticky')).toBe(true);
    });

    it('should display YASH MATHUR branding', () => {
      const brandText = Array.from(document.querySelectorAll('h2')).find(h2 =>
        h2.textContent?.includes('YASH MATHUR')
      );
      expect(brandText).toBeTruthy();
    });

    it('should have logo icon', () => {
      const logoIcon = document.querySelector('header .material-symbols-outlined');
      expect(logoIcon).toBeTruthy();
      expect(logoIcon?.textContent).toBe('deployed_code');
    });

    it('should have navigation links', () => {
      const portfolioLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Portfolio'
      );
      expect(portfolioLink).toBeTruthy();

      const articlesLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Articles' && a.classList.contains('text-primary')
      );
      expect(articlesLink).toBeTruthy();

      const contactLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Contact'
      );
      expect(contactLink).toBeTruthy();
    });

    it('should highlight Articles nav item as active', () => {
      const articlesLink = Array.from(document.querySelectorAll('nav a')).find(a =>
        a.textContent === 'Articles'
      );
      expect(articlesLink?.classList.contains('text-primary')).toBe(true);
    });

    it('should have share button', () => {
      const shareIcon = Array.from(document.querySelectorAll('.material-symbols-outlined')).find(icon =>
        icon.textContent === 'share'
      );
      expect(shareIcon).toBeTruthy();
    });
  });

  describe('Breadcrumb Navigation', () => {
    it('should have breadcrumb navigation', () => {
      const breadcrumb = document.querySelector('.flex.items-center.gap-2.mb-8');
      expect(breadcrumb).toBeTruthy();
    });

    it('should have Insights link in breadcrumb', () => {
      const insightsLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent === 'Insights'
      );
      expect(insightsLink).toBeTruthy();
    });

    it('should show LLM Development as current page', () => {
      const currentPage = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent === 'LLM Development' && span.classList.contains('text-primary')
      );
      expect(currentPage).toBeTruthy();
    });

    it('should use chevron separator', () => {
      const chevron = Array.from(document.querySelectorAll('.material-symbols-outlined')).find(icon =>
        icon.textContent === 'chevron_right'
      );
      expect(chevron).toBeTruthy();
    });
  });

  describe('Hero Section', () => {
    it('should have hero section with gradient background', () => {
      const hero = document.querySelector('.bg-gradient-to-r.from-primary\\/20');
      expect(hero).toBeTruthy();
    });

    it('should display article category badge', () => {
      const badge = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.trim().includes('AI')
      );
      expect(badge).toBeTruthy();
    });

    it('should display reading time and date', () => {
      const metadata = Array.from(document.querySelectorAll('span')).find(span =>
        span.textContent?.includes('12 Min Read')
      );
      expect(metadata).toBeTruthy();
      expect(metadata?.textContent).toContain('Oct 24, 2023');
    });

    it('should have main article title', () => {
      const title = Array.from(document.querySelectorAll('h1')).find(h1 =>
        h1.textContent?.includes('Building the Future with')
      );
      expect(title).toBeTruthy();
      expect(title?.textContent?.replace(/\s+/g, ' ')).toContain('Large Language Models');
    });

    it('should have hero image with proper alt text', () => {
      const heroImage = document.querySelector('[data-alt="Abstract neural network visualization in dark blue"]');
      expect(heroImage).toBeTruthy();
    });

    it('should have gradient overlay on hero image', () => {
      const gradient = document.body.innerHTML.includes('linear-gradient(to top');
      expect(gradient).toBe(true);
    });
  });

  describe('Article Content', () => {
    it('should have article element', () => {
      const article = document.querySelector('article');
      expect(article).toBeTruthy();
    });

    it('should have blockquote with key message', () => {
      const quote = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent?.includes('The transition from deterministic code')
      );
      expect(quote).toBeTruthy();
      expect(quote?.classList.contains('italic')).toBe(true);
    });

    it('should have main content about LLMs', () => {
      const content = document.body.textContent;
      expect(content).toContain('Large Language Models');
      expect(content).toContain('LLMs');
    });

    it('should have section heading "The Orchestration Layer"', () => {
      const heading = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent === 'The Orchestration Layer'
      );
      expect(heading).toBeTruthy();
    });

    it('should discuss vector databases', () => {
      const content = document.body.textContent;
      expect(content).toContain('vector databases');
    });

    it('should discuss RAG (Retrieval-Augmented Generation)', () => {
      const content = document.body.textContent;
      expect(content).toContain('retrieval-augmented generation');
      expect(content).toContain('RAG');
    });

    it('should mention Liquid Glass architecture', () => {
      const content = document.body.textContent;
      expect(content).toContain('Liquid Glass');
    });
  });

  describe('Feature Cards', () => {
    it('should have Vector Embeddings feature card', () => {
      const heading = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'Vector Embeddings'
      );
      expect(heading).toBeTruthy();
    });

    it('should have Prompt Engineering feature card', () => {
      const heading = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'Prompt Engineering'
      );
      expect(heading).toBeTruthy();
    });

    it('should have icons for feature cards', () => {
      const icons = Array.from(document.querySelectorAll('.material-symbols-outlined'));
      const iconTexts = icons.map(icon => icon.textContent);
      expect(iconTexts).toContain('memory');
      expect(iconTexts).toContain('auto_awesome');
    });
  });

  describe('Call-to-Action Section', () => {
    it('should have CTA section', () => {
      const ctaHeading = Array.from(document.querySelectorAll('h3')).find(h3 =>
        h3.textContent?.includes('Dive deeper into the implementation')
      );
      expect(ctaHeading).toBeTruthy();
    });

    it('should have link to Medium article', () => {
      const mediumLink = Array.from(document.querySelectorAll('a')).find(a =>
        a.textContent?.includes('Read Full Article on Medium')
      );
      expect(mediumLink).toBeTruthy();
      expect(mediumLink?.classList.contains('glossy-button')).toBe(true);
    });

    it('should have arrow icon in CTA button', () => {
      const arrowIcon = Array.from(document.querySelectorAll('.material-symbols-outlined')).find(icon =>
        icon.textContent === 'north_east'
      );
      expect(arrowIcon).toBeTruthy();
    });
  });

  describe('Sidebar - Author Section', () => {
    it('should have Author section in sidebar', () => {
      const authorHeading = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent?.includes('Author')
      );
      expect(authorHeading).toBeTruthy();
    });

    it('should display author name Yash Mathur', () => {
      const authorName = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent === 'Yash Mathur' && p.classList.contains('font-bold')
      );
      expect(authorName).toBeTruthy();
    });

    it('should display author title', () => {
      const authorTitle = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent === 'AI Solutions Architect'
      );
      expect(authorTitle).toBeTruthy();
    });

    it('should have author profile image', () => {
      const img = document.querySelector('img[alt="Yash Mathur Professional Headshot"]');
      expect(img).toBeTruthy();
    });

    it('should have Follow button', () => {
      const followButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent?.includes('Follow Yash')
      );
      expect(followButton).toBeTruthy();
    });
  });

  describe('Sidebar - Trending Section', () => {
    it('should have Trending in Tech section', () => {
      const trendingHeading = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'Trending in Tech'
      );
      expect(trendingHeading).toBeTruthy();
    });

    it('should list trending article 1', () => {
      const article = Array.from(document.querySelectorAll('h5')).find(h5 =>
        h5.textContent?.includes('ethics of Generative AI')
      );
      expect(article).toBeTruthy();
    });

    it('should list trending article 2', () => {
      const article = Array.from(document.querySelectorAll('h5')).find(h5 =>
        h5.textContent?.includes('Apache Kafka')
      );
      expect(article).toBeTruthy();
    });

    it('should list trending article 3', () => {
      const article = Array.from(document.querySelectorAll('h5')).find(h5 =>
        h5.textContent?.includes('Rust') || h5.textContent?.includes('Python') ||
        h5.textContent?.includes('Machine Learning')
      );
      expect(article).toBeTruthy();
    });

    it('should number trending articles', () => {
      const numbers = Array.from(document.querySelectorAll('p')).filter(p =>
        ['01', '02', '03'].includes(p.textContent || '')
      );
      expect(numbers.length).toBe(3);
    });
  });

  describe('Sidebar - Newsletter Section', () => {
    it('should have Newsletter section', () => {
      const heading = Array.from(document.querySelectorAll('h4')).find(h4 =>
        h4.textContent === 'Join the Newsletter'
      );
      expect(heading).toBeTruthy();
    });

    it('should have email input field', () => {
      const emailInput = document.querySelector('input[type="email"]');
      expect(emailInput).toBeTruthy();
      expect(emailInput?.getAttribute('placeholder')).toBe('email@address.com');
    });

    it('should have Subscribe button', () => {
      const subscribeButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent?.includes('Subscribe')
      );
      expect(subscribeButton).toBeTruthy();
    });

    it('should describe newsletter benefits', () => {
      const description = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent?.includes('latest insights on LLMs')
      );
      expect(description).toBeTruthy();
    });
  });

  describe('Footer', () => {
    it('should have footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should display copyright with year', () => {
      const copyright = Array.from(document.querySelectorAll('p')).find(p =>
        p.textContent?.includes('© 2024 Yash Mathur')
      );
      expect(copyright).toBeTruthy();
    });

    it('should have social media links', () => {
      const footer = document.querySelector('footer');
      const twitterLink = Array.from(footer?.querySelectorAll('a') || []).find(a =>
        a.textContent === 'Twitter'
      );
      const linkedinLink = Array.from(footer?.querySelectorAll('a') || []).find(a =>
        a.textContent === 'LinkedIn'
      );
      const mediumLink = Array.from(footer?.querySelectorAll('a') || []).find(a =>
        a.textContent === 'Medium'
      );

      expect(twitterLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();
      expect(mediumLink).toBeTruthy();
    });

    it('should have verified icon', () => {
      const verifiedIcon = Array.from(document.querySelectorAll('.material-symbols-outlined')).find(icon =>
        icon.textContent === 'verified_user'
      );
      expect(verifiedIcon).toBeTruthy();
    });
  });

  describe('Layout Structure', () => {
    it('should use 12-column grid layout', () => {
      const grid = document.querySelector('.grid-cols-1.lg\\:grid-cols-12');
      expect(grid).toBeTruthy();
    });

    it('should have main article in 8-column span', () => {
      const mainContent = document.querySelector('.lg\\:col-span-8');
      expect(mainContent).toBeTruthy();
    });

    it('should have sidebar in 4-column span', () => {
      const sidebar = document.querySelector('.lg\\:col-span-4');
      expect(sidebar).toBeTruthy();
    });

    it('should have liquid-bg background', () => {
      const liquidBg = document.querySelector('.liquid-bg');
      expect(liquidBg).toBeTruthy();
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

    it('should have nav element', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
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

    it('should have article element for main content', () => {
      const article = document.querySelector('article');
      expect(article).toBeTruthy();
    });

    it('should have aside element for sidebar', () => {
      const aside = document.querySelector('aside');
      expect(aside).toBeTruthy();
    });

    it('should have section elements', () => {
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing', () => {
      const h1 = document.querySelector('h1');
      expect(h1?.className).toContain('lg:text');
    });

    it('should have responsive padding', () => {
      const hasResponsivePadding = document.body.innerHTML.includes('lg:p') ||
                                    document.body.innerHTML.includes('md:p');
      expect(hasResponsivePadding).toBe(true);
    });

    it('should have responsive grid columns', () => {
      const grid = document.body.innerHTML.includes('lg:grid-cols');
      expect(grid).toBe(true);
    });
  });

  describe('Visual Design', () => {
    it('should use glass-slab styling', () => {
      const glassSlab = document.querySelectorAll('.glass-slab');
      expect(glassSlab.length).toBeGreaterThan(0);
    });

    it('should use metallic-border styling', () => {
      const metallicBorder = document.querySelectorAll('.metallic-border');
      expect(metallicBorder.length).toBeGreaterThan(0);
    });

    it('should use glossy-button styling', () => {
      const glossyButton = document.querySelectorAll('.glossy-button');
      expect(glossyButton.length).toBeGreaterThan(0);
    });

    it('should have gradient text effects', () => {
      const gradientText = document.body.innerHTML.includes('bg-gradient-to-r from-primary');
      expect(gradientText).toBe(true);
    });
  });

  describe('Content Quality', () => {
    it('should have substantial content', () => {
      const body = document.body.textContent || '';
      expect(body.length).toBeGreaterThan(1000);
    });

    it('should not contain placeholder text', () => {
      const body = document.body.textContent || '';
      expect(body.toLowerCase()).not.toContain('lorem ipsum');
      expect(body.toLowerCase()).not.toContain('placeholder');
    });

    it('should focus on AI and LLM topics', () => {
      const body = document.body.textContent || '';
      expect(body).toContain('LLM');
      expect(body).toContain('AI');
      expect(body).toContain('architecture');
    });

    it('should provide technical depth', () => {
      const body = document.body.textContent || '';
      expect(body.toLowerCase()).toContain('vector');
      expect(body.toLowerCase()).toContain('embed');
      expect(body.toLowerCase()).toContain('prompt');
    });
  });

  describe('Interactive Elements', () => {
    it('should have multiple interactive buttons', () => {
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('should have navigation links', () => {
      const navLinks = document.querySelectorAll('nav a');
      expect(navLinks.length).toBeGreaterThanOrEqual(3);
    });

    it('should have form elements for newsletter', () => {
      const form = document.querySelector('input[type="email"]');
      expect(form).toBeTruthy();
    });
  });

  describe('Performance Considerations', () => {
    it('should not have inline event handlers', () => {
      const elementsWithOnClick = document.querySelectorAll('[onclick]');
      expect(elementsWithOnClick.length).toBe(0);
    });

    it('should use external stylesheets', () => {
      const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
      expect(linkTags.length).toBeGreaterThan(0);
    });
  });

  describe('SEO and Metadata', () => {
    it('should have descriptive title in heading', () => {
      const h1 = document.querySelector('h1');
      expect(h1?.textContent).toContain('Building the Future');
    });

    it('should have metadata about read time', () => {
      const readTime = document.body.textContent?.includes('12 Min Read');
      expect(readTime).toBe(true);
    });

    it('should have publication date', () => {
      const date = document.body.textContent?.includes('Oct 24, 2023');
      expect(date).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle long content gracefully', () => {
      const article = document.querySelector('article');
      expect(article).toBeTruthy();
    });

    it('should have proper spacing between sections', () => {
      const hasSectionSpacing = document.body.innerHTML.includes('space-y') ||
                                 document.body.innerHTML.includes('gap-');
      expect(hasSectionSpacing).toBe(true);
    });
  });
});