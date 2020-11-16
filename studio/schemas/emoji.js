const icon = {
  name: 'icon',
  type: 'string',
  title: 'Icon',
}

const srText = {
  name: 'srText',
  type: 'string',
  title: 'Screen reader text',
}

export default {
  name: 'emoji',
  title: 'Emoji',
  type: 'object', // entries are not reused; so, will exist in the schema, but not in the sidebar
  fields: [icon, srText],
  preview: {
    select: { title: 'icon', subtitle: 'srText' },
  },
}
