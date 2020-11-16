const title = {
  title: 'Title',
  name: 'title',
  type: 'string',
}

const description = {
  title: 'Description',
  description: 'A brief summary of the project',
  name: 'description',
  type: 'array',
  of: [{ type: 'block', styles: [], lists: [], marks: { decorators: [] } }],
}

const url = {
  title: 'URL',
  name: 'url',
  type: 'url',
}

const date = {
  title: 'Launch Date',
  name: 'date',
  type: 'date',
}

const repo = {
  title: 'Repository URL',
  name: 'repo',
  type: 'url',
}

const tools = {
  title: 'Tools',
  name: 'tools',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'link' }],
      options: {
        filter: 'category == $category',
        filterParams: { category: 'web development tool' },
      },
      title: 'Tools',
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
  name: 'website',
  title: 'Websites',
  type: 'document',
  icon: () => '🖥',
  fields: [title, description, url, date, repo, tools, reviews],
  preview: {
    select: { title: 'title', subtitle: 'url' },
  },
}
