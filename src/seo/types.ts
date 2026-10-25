/** What every standalone product page exports from its content.ts, for prerendering and search metadata. */
export interface ProductMeta {
  /** Page URL, e.g. '/bench'. */
  path: string;
  /** <title>, written for search: product name plus what it does. Under ~65 characters. */
  title: string;
  /** Meta description, 140–165 characters, naming what people search for. */
  description: string;
  /** Browser UI colour, usually the page background. */
  themeColor: string;
  /** Google Fonts stylesheet URL, if the page uses web fonts. */
  fonts?: string;
  /** 1200×630 social preview in public/og/, e.g. '/og/bench.png'. */
  ogImage: string;
  imageAlt: string;
  /** schema.org objects (SoftwareApplication / MobileApplication / VideoGame, FAQPage …). */
  jsonLd: object[];
  /** Source module of the page component, e.g. 'src/pages/bench/BenchPage.tsx'. */
  module: string;
}
