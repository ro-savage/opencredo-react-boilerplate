/* eslint no-unused-vars: 1*/
import React from 'react'
import styles from './NavHeaderLink.scss'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'

export default class NavHeaderLink extends React.Component {
  static propTypes = {
    menuText: React.PropTypes.object,
    to: React.PropTypes.string,
  }

  render() {
    return (
      <li className={'red'}>
        <Link activeClassName="active" to={this.props.to} >
          <FormattedMessage {...this.props.menuText} />
        </Link>
      </li>
      )
  }
}
