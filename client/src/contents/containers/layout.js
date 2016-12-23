import React from 'react';
import { Container, Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from "react-router"
import { connect } from "react-redux"
import { Conditional } from 'react-conditional-render';
import { authActions } from "../actions"
import { replace, push } from "react-router-redux"

class HiddenLayout extends React.Component {
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
				<Container style={{marginTop: "30px"}}>
					{this.props.children}
				</Container>
			</div>
		)
	}
}
const Layout = connect(
	(state) => {
		return {
			user: state.user
		}
	},
	(dispatch) => {
		return {
			logout: () => {
				dispatch(authActions.logout())
				dispatch(replace("/login")) //redirect to login screen
			},
			goToSettings: () => {
				dispatch(push("/settings"))
			}
		}
	})(HiddenLayout)

export default Layout
