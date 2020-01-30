export const prismTheme = {
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
        // color: 'rgba(239, 83, 80, 0.56)',
        color: '#b2ccd6',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        // color: 'rgb(173, 219, 103)',
        color: '#fecb68',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        // color: 'rgb(99, 119, 119)',
        color: '#546E7A',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        // color: 'rgb(173, 219, 103)'
        color: '89ddff',
      },
    },
    {
      types: ['variable'],
      style: {
        // color: 'rgb(214, 222, 235)'
        color: '#eeffff',
      },
    },
    {
      types: ['number'],
      style: {
        // color: 'rgb(247, 140, 108)'
        color: '#f78661',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        // color: 'rgb(130, 170, 255)'
        // color: '#b2ccd6'
        // color: '#c3e88d'
        color: '#82AAFF',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        // color: 'rgb(199, 146, 234)'
        color: '#89ddff',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        // color: 'rgb(199, 146, 234)',
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
        // color: 'rgb(127, 219, 202)'
        color: '#C792EA',
      },
    },
    {
      types: ['boolean'],
      style: {
        // color: 'rgb(255, 88, 116)'
        color: '#f78661',
      },
    },
    {
      types: ['property'],
      style: {
        // color: 'rgb(128, 203, 196)'
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
