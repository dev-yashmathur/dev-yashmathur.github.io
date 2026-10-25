import type { ProductMeta } from '../../seo/types';
import compareShot from '../../assets/images/Benchtest/compare.webp';
import batchShot from '../../assets/images/Benchtest/batch.webp';
import datasetShot from '../../assets/images/Benchtest/dataset.webp';
import historyShot from '../../assets/images/Benchtest/history.webp';

/** Copy and facts for the Bench product page, shared with its SEO metadata. */
export const BENCH = {
  name: 'Bench',
  path: '/bench',
  version: '1.0',
  download: '/downloads/Bench-1.0.dmg',
  fileSize: '2.8 MB',
  requirements: 'macOS 14+ · Apple Silicon & Intel',
  film: { src: '/videos/bench-how-it-works.mp4', poster: '/videos/bench-how-it-works.jpg' },
  title: 'Bench — LLM & Decision Model Evaluation App for Mac',
  description:
    'Compare LLM and decision model answers side by side on your Mac. Run batches, mark the right answers and build a fine-tuning dataset with Bench. Free for macOS.',
};

const SITE = 'https://yashmathur.com';
const abs = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`);

/** The support-ticket example from the app's own screenshots and explainer. */
export const DEMO = {
  question: 'Which team should handle this support ticket?',
  context: 'Customer email: My card was declined and now I can’t open the dashboard at all.',
  answers: [
    { model: 'Jev', choice: 'Billing', probs: [['Billing', 53], ['Account access', 37], ['Technical', 10]] },
    { model: 'Laya', choice: 'Billing', probs: [['Billing', 42], ['Technical', 35], ['Sales', 9]] },
    { model: 'Clef', choice: 'Technical', probs: [['Technical', 67], ['Account access', 21], ['Billing', 10]] },
    { model: 'Clef Flash', choice: 'Account access', probs: [['Account access', 67], ['Technical', 25], ['Billing', 4]] },
  ] as { model: string; choice: string; probs: [string, number][] }[],
};

export const benchFaq: { q: string; a: string }[] = [
  {
    q: 'What is Bench?',
    a: 'Bench is a native macOS app for evaluating LLMs and decision models. You put one question to several models, compare their answers side by side, mark which ones are right, and turn the approved answers into a dataset for fine-tuning.',
  },
  {
    q: 'Is Bench free?',
    a: 'Yes. Bench is a free download for macOS. You bring your own model access, so any usage of a hosted model is between you and its provider.',
  },
  {
    q: 'Which models can I compare?',
    a: 'Version 1.0 is optimized for decision models: Jev, Laya, Clef and OpenAI Decisions, plus your own custom endpoint. For generation models it supports direct providers, OpenAI-compatible servers and local CLIs, with further improvements coming soon.',
  },
  {
    q: 'How do I compare Jev and Laya on the same question?',
    a: 'Write the question, add the context, list your choices and pick both models, then press Compare. Each answer shows the choice it made, and opening it shows the probability it gave every choice, so you can see where the models agree and how sure each one was.',
  },
  {
    q: 'What kinds of questions can I evaluate?',
    a: 'Decision questions come in three types: Choice (pick one of your options), Score (1 to 10) and Yes / No. You can describe each choice so every model knows what it covers, and run many questions at once against shared context.',
  },
  {
    q: 'How do I build a fine-tuning dataset with Bench?',
    a: 'Review the answers, approve the right ones and save them. They collect in the Dataset view, which exports as JSONL. Laya, for example, only needs roughly 200 to 1,000 samples to fine-tune properly.',
  },
  {
    q: 'Can I run evaluations from a script?',
    a: 'Yes. Bench runs a local REST API on your Mac. Scripts can post batches, fetch results, mark answers and save them to the dataset, authenticated with the token shown on the Batches screen.',
  },
  {
    q: 'Why does macOS warn me the first time I open it?',
    a: 'Bench is not notarized by Apple yet. On first launch, right-click the app and choose Open; after that it opens normally.',
  },
];

export const META: ProductMeta = {
  path: BENCH.path,
  title: BENCH.title,
  description: BENCH.description,
  themeColor: '#F2EFE7',
  ogImage: '/og/bench.png',
  imageAlt: 'Bench: put one question to four models and keep the answer you trust',
  module: 'src/pages/bench/BenchPage.tsx',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: BENCH.name,
      alternateName: 'Bench LLM evaluation',
      description: BENCH.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS 14 or later',
      softwareVersion: BENCH.version,
      fileSize: BENCH.fileSize,
      downloadUrl: abs(BENCH.download),
      url: abs(BENCH.path),
      image: abs('/og/bench.png'),
      screenshot: [compareShot, batchShot, historyShot, datasetShot].map(abs),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Yash Mathur', url: `${SITE}/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: benchFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
