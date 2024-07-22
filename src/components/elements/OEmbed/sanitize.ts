/**
 * dompurify is not supposed to be used on the server side.
 * Use isomorphic-dompurify instead.
 **/
import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  });
