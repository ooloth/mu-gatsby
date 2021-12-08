import createSchema from 'part:@sanity/base/schema-creator'

// Schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import emoji from './emoji'
import gig from './gig'
import link from './link'
import review from './review'
import website from './website'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // documents (visible in sidebar):
    website,
    gig,
    link,

    // objects (not visible in sidebar):
    emoji,
    review,
  ]),
})
