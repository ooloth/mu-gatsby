// The provider, which holds the page-wide store and its actions.
// Feel free to abstract actions and state away from this file.

// See: https://github.com/fabe/gatsby-universal/blob/master/src/store/provider.js

// TODO: uncomment context boilerplate in gatsby-browser and gatsby-ssr
// TODO: use like this: https://github.com/fabe/gatsby-universal/blob/master/src/containers/modal/modal.js

class AppProvider extends Component {
  state = {
    // isIE: is.ie()
    open: false,
    showModal: () => this.setState({ open: true }),
    hideModal: () => this.setState({ open: false })
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './createContext'
// import is from 'is_js'

export default AppProvider
