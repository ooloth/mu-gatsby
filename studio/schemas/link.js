const category = {
  title: 'Category',
  description: 'What type of link is this?',
  name: 'category',
  type: 'string',
  options: {
    list: ['navigation', 'social', 'web development tool', 'opera reference'],
  },
  validation: Rule => Rule.required(),
}

const url = {
  title: 'URL',
  name: 'url',
  type: 'url',
  validation: Rule =>
    Rule.required().uri({
      allowRelative: true,
      scheme: ['http', 'https', 'mailto', 'tel'],
    }),
}

const visibleText = {
  title: 'Visible Text',
  name: 'visibleText',
  type: 'string',
}

const srText = {
  title: 'Screen Reader Text',
  name: 'srText',
  type: 'string',
}

const newWindow = {
  title: 'Force open in new window?',
  name: 'newWindow',
  type: 'boolean',
  description: 'By default, only external links will open in a new window.',
}

export default {
  name: 'link',
  title: 'Links',
  type: 'document',
  icon: () => '🔗',
  initialValue: {
    newWindow: false,
  },
  fields: [category, url, visibleText, srText, newWindow],
  preview: {
    select: { title: 'visibleText', subtitle: 'url' },
  },
}
