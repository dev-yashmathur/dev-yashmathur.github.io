import { useEffect } from 'react';

const SITE = 'Yash Mathur';

/** Sets the document title and meta description for the current page. */
export const usePageMeta = (title?: string, description?: string) => {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} — Product Engineer, AI & Systems`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
};
