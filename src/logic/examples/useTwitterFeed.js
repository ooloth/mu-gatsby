// TODO: learn how to target a hashtag instead of a profile name

function useTwitterFeed(user, count = 3) {
  const [feed, setFeed] = useState(null)

  useEffect(() => {
    twitterFetcher.fetch({
      profile: { screenName: user },
      maxTweets: count,
      dataOnly: true,
      enableLinks: true,
      showRetweet: false,
      // lang: `en`,
      customCallback: tweets => setFeed(tweets),
    })

    // Cancel on unmount:
    return () => twitterFetcher.callback(() => null)
  }, [count, user])

  return feed
}

///////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from 'react'
import twitterFetcher from 'twitter-fetcher'

// import '../styles/plugins/twitter-fetcher.css'

export default useTwitterFeed

/*

INSTRUCTIONS:

Note: Update styling in styles/components/_twitter-fetcher.css

- Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
- API: http://jasonmayes.com/projects/twitterApi/
- Usage: https://github.com/jasonmayes/Twitter-Post-Fetcher/blob/master/js/exampleUsage.js
- Usage: https://codepen.io/jasonmayes/pen/Ioype

function ContactTwitter({ twitterHeading }) {
  const tweets = useTwitterFeed(`AshleyThouret`)

  return (
    <>
      {tweets && (
        <FadingCarousel slides={tweets} speed={6000}>
          {(slides, slideIndex) => (
            <CarouselSlides slides={slides} slideIndex={slideIndex} />
          )}
        </FadingCarousel>
      )}
    </>
  )
}

*/
