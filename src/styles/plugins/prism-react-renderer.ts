import { PrismTheme } from 'prism-react-renderer'

export const prismTheme: PrismTheme = {
  plain: {
    backgroundColor: '#263238',
    color: '#fff',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#b2ccd6',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: '#fecb68',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#546E7A',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: '89ddff',
      },
    },
    {
      types: ['variable'],
      style: {
        color: '#eeffff',
      },
    },
    {
      types: ['number'],
      style: {
        color: '#f78661',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: '#82AAFF',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#89ddff',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: '#FFCB6B',
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(255, 203, 139)',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: '#C792EA',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: '#f78661',
      },
    },
    {
      types: ['property'],
      style: {
        color: '#b2ccd6',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
      },
    },
  ],
}
