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

const project = {
  name: 'project',
  type: 'reference',
  to: [{ type: 'website' }],
  title: 'Project',
  description: 'What opera or website is this review describing?',
}

export default {
  name: 'review',
  title: 'Reviews',
  type: 'document',
  icon: () => '📣',
  fields: [quotation, source, url, project],
  preview: {
    select: { title: 'quotation', subtitle: 'source' },
  },
}
