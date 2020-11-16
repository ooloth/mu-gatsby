const title = {
  title: 'Title',
  name: 'title',
  type: 'object',
  fields: [
    { title: 'Text', name: 'text', type: 'string' },
    {
      title: 'Language',
      name: 'lang',
      type: 'string',
      options: {
        list: [
          { title: 'en', value: 'en' },
          { title: 'it', value: 'it' },
          { title: 'de', value: 'de' },
          { title: 'fr', value: 'fr' },
        ],
      },
    },
  ],
}

const description = {
  title: 'Description',
  description: 'A brief summary of the project',
  name: 'description',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: { decorators: [{ title: 'Strong', value: 'strong' }] },
    },
  ],
}

const url = {
  title: 'URL',
  name: 'url',
  type: 'url',
}

const date = {
  title: 'Opening Date',
  name: 'date',
  type: 'date',
}

const tags = {
  title: 'Tags',
  name: 'tags',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'link' }],
      options: {
        filter: 'category == $category',
        filterParams: { category: 'opera reference' },
      },
      title: 'Tags',
    },
  ],
}

const reviews = {
  title: 'Reviews',
  name: 'reviews',
  type: 'array',
  of: [{ type: 'review', title: 'Choose a review' }],
}

export default {
  name: 'gig',
  title: 'Gigs',
  type: 'document',
  icon: () => '🎭',
  fields: [title, description, url, date, tags, reviews],
  preview: {
    select: { title: 'title.text', subtitle: 'url' },
  },
}
