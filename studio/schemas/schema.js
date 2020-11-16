// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import emoji from './emoji'
import gig from './gig'
import link from './link'
import review from './review'
import website from './website'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document types
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // visible in sidebar:
    website,
    gig,
    link,

    // not visible in sidebar:
    emoji,
    review,
  ]),
})
