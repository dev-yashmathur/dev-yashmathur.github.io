import { useEffect } from 'react';

const SITE = 'Yash Mathur';

/** Sets the document title and meta description for the current page. `exact` uses the title as given, without the site name. */
export const usePageMeta = (title?: string, description?: string, exact = false) => {
  useEffect(() => {
    document.title = title ? (exact ? title : `${title} · ${SITE}`) : `${SITE} — Product Engineer, AI & Systems`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description, exact]);
};
