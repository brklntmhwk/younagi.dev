import { contactForm } from '@/components/models/ContactForm/contact-form.css';
import { createVar, style } from '@vanilla-extract/css';

const fgColor = createVar();
const bgColor = createVar();
export const modalBgColor = createVar();

export const modal = style({
  vars: {
    [modalBgColor]: 'hsla(223, 13%, 10%, 0.6)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [modalBgColor]: 'hsla(220, 20%, 9%, 0.9)',
      },
    },
    '(min-width: 768px)': {
      paddingTop: '3.75rem',
    },
  },
  backgroundColor: modalBgColor,
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  width: '100dvw',
  height: '100dvh',
  paddingTop: '3.25rem',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

export const modalWrapper = style({
  vars: {
    [bgColor]: 'hsla(0, 0%, 96.7%, 1)',
    [fgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [bgColor]: 'hsla(248.57, 11.48%, 11.96%, 1)',
        [fgColor]: 'hsla(0, 0%, 96.7%, 1)',
      },
    },
  },
  backgroundColor: `color-mix(in srgb, ${bgColor} 90%, ${fgColor} 10%)`,
  width: '100%',
  maxWidth: '38rem',
  maxHeight: '80dvh',
  padding: '1.5rem 0.85rem',
  margin: '0 1.5rem',
  boxSizing: 'border-box',
  selectors: {
    [`&:has(${contactForm})`]: {
      overflowY: 'auto',
    },
  },
});

export const modalButton = style({
  border: 'none',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

export const modalButtonLabel = style({
  fontSize: '1.025rem',
  fontWeight: 700,
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.125rem',
    },
  },
});

export const hidden = style({
  display: 'none',
});
