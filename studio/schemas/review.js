const quotation = {
  name: 'quotation',
  type: 'text',
  title: 'Quotation',
}

const source = {
  name: 'source',
  type: 'string',
  title: 'Source Name',
}

const url = {
  name: 'url',
  type: 'url',
  title: 'Source URL',
}

export default {
  name: 'review',
  title: 'Review',
  type: 'object', // entries are not reused; so, will exist in the schema, but not in the sidebar
  fields: [quotation, source, url],
  preview: {
    select: { title: 'quotation', subtitle: 'source' },
  },
}
