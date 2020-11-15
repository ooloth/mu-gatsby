---
title: string
slug: url pathname
description: string
featuredImage: relative path
topics:
  - string
devLink: absolute url
linkSharedOnTwitter: absolute url
published: false
datePublished: 2020-12-31
dateUpdated: 2020-12-31
---

```jsx
const ItemsWithViewMore = ({ items, initialLimit, increment }) => {
  const [limit, setLimit] = useState(initialLimit)
  const visibleItems = items.slice(0, limit)

  const handleViewMoreClick = () => setLimit(limit + increment)

  return (
    <section>
      <h2>Items</h2>

      <ul>
        {visibleItems.map(item => (
          <Item {...item} />
        ))}
      </ul>

      {visibleItems.length < items.length && (
        <button onClick={handleViewMoreClick}>View more</button>
      )}
    </section>
  )
}
```

## Links
