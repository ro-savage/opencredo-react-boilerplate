/* eslint no-unused-vars: 1*/
import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { Navbar, Nav } from 'react-bootstrap'
import UserDropdownMenu from 'components/UserDropdownMenu/UserDropdownMenu'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { loginRequest, logoutRequest } from 'redux/modules/auth/auth-actions'
import debug from 'debug'
import LanguageSelectionDropdown from '../LanguageSelectionDropdown/LanguageSelectionDropdown'
import { links } from 'shared/links'
import NavHeaderLink from '../../components/NavHeaderLink/NavHeaderLink'

if (__DEBUG__) {
  debug.enable('app:*')
}

const log = debug('app:main-header')

class MainHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
  };

  @autobind
  onLogin() {
    this.props.dispatch(loginRequest())
  }

  @autobind
  onLogout() {
    this.props.dispatch(logoutRequest())
  }

  willReceiveProps(props) {
    log('main-header will receive props', props)
  }

  render() {
    return (
      <Navbar staticTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <FormattedMessage {...links.home} />
              { /* The above is equivalent to
                <FormattedMessage id={links.home.id}
                                  description={links.home.description}
                                  defaultMessage={links.home.defaultMessage} /> */ }
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LanguageSelectionDropdown />
            <NavHeaderLink menuText={links.faq} to="/pages/faq" />
            <NavHeaderLink menuText={links.aboutUs} to="/pages/about-us" />
            <NavHeaderLink menuText={links.help} to="/pages/help" />
            {this.props.isAuthenticated && this.props.user ?
              <UserDropdownMenu user={this.props.user} logout={this.onLogout} />
              :
              <li role="presentation">
                <a onClick={this.onLogin}>
                  <FormattedMessage {...links.logIn} />
                </a>
              </li>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  language: state.language,
})

export default connect(mapStateToProps)(MainHeader)
