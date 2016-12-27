import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Dropdown } from 'semantic-ui-react'
import { Link } from "react-router"
import { Conditional } from 'react-conditional-render';

class MenuItems extends Component {
  render() {
    return (
      <div>
			<Menu attached="top" color="blue" inverted>
				<Menu.Item>
					<img src='/images/logoWhite.png' />
				</Menu.Item>
				<Menu.Item as={Link} to="/">
					Home
				</Menu.Item>
				<Menu.Item as={Link} to="/schools">
					Schools
				</Menu.Item>
				<Menu.Item as={Link} to="/district">
					District
				</Menu.Item>
				<Menu.Item as={Link} to="/about">
					About
				</Menu.Item>
				<Menu.Item as={Link} to="/drills">
					Drills
				</Menu.Item>
				<Conditional condition={!!this.props.user.getIn(["permission", "sudo"])}>
				<Menu.Item>
					sudo link
				</Menu.Item>
				</Conditional>
				<Conditional condition={!!this.props.user.getIn(["permission", "district"])}>
				<Menu.Item>
					district link
				</Menu.Item>
				</Conditional>
				<Conditional condition={!!this.props.user.getIn(["permission", "school"])}>
				<Menu.Item>
					school link
				</Menu.Item>
				</Conditional>
				<Conditional condition={!!this.props.user.getIn(["permission", "drill"])}>
				<Menu.Item>
					drill link
				</Menu.Item>
				</Conditional>
				<Dropdown as={Menu.Item} text="Account" simple position="right">
					<Dropdown.Menu>
						<Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
						<Dropdown.Item onClick={this.props.goToSettings}>Settings</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Menu>
      </div>
    )
  }
}

export default MenuItems
