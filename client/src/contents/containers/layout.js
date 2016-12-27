import React from 'react';
import { Container, Menu, Dropdown, Icon, Sidebar, Segment, Header } from 'semantic-ui-react'
import { connect } from "react-redux"
import { Conditional } from 'react-conditional-render';
import { authActions } from "../actions"
import { replace, push } from "react-router-redux"
import { Link } from "react-router"


class HiddenLayout extends React.Component {

	visable = false;
	toggleSidebar = function(){
		alert('Working');
		visable = !visable;
	};
	render() {
		return (
			<div>
				<Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='uncover' className="hidden-lg hidden-md" width='thin' visible={this.visable} icon='labeled' vertical inverted style={{textAlign: "left"}}>
					<Menu.Item as={Header}>
						Fire Captain
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
					          </Sidebar>
          <Sidebar.Pusher>
					<Menu attached="top" color="blue" inverted>
						<Menu.Item onClick={this.toggleSidebar}>
							<img src='/images/logoWhite.png' />
						</Menu.Item>
						<Menu.Item className="hidden-lg hidden-md">
							Fire Captain
						</Menu.Item>
						<Menu.Item as={Link} to="/" className="hidden-sm hidden-xs" className="hidden-sm hidden-xs">
							Home
						</Menu.Item>
						<Menu.Item as={Link} to="/schools" className="hidden-sm hidden-xs">
							Schools
						</Menu.Item>
						<Menu.Item as={Link} to="/district" className="hidden-sm hidden-xs">
							District
						</Menu.Item>
						<Menu.Item as={Link} to="/about" className="hidden-sm hidden-xs">
							About
						</Menu.Item>
						<Menu.Item as={Link} to="/drills" className="hidden-sm hidden-xs">
							Drills
						</Menu.Item>
						<Conditional condition={!!this.props.user.getIn(["permission", "sudo"])}>
						<Menu.Item className="hidden-sm hidden-xs">
							sudo link
						</Menu.Item>
						</Conditional>
						<Conditional condition={!!this.props.user.getIn(["permission", "district"])}>
						<Menu.Item className="hidden-sm hidden-xs">
							district link
						</Menu.Item>
						</Conditional>
						<Conditional condition={!!this.props.user.getIn(["permission", "school"])}>
						<Menu.Item className="hidden-sm hidden-xs">
							school link
						</Menu.Item>
						</Conditional>
						<Conditional condition={!!this.props.user.getIn(["permission", "drill"])}>
						<Menu.Item className="hidden-sm hidden-xs">
							drill link
						</Menu.Item>
						</Conditional>
						<Dropdown as={Menu.Item} text="Account" simple position="right" className="hidden-sm hidden-xs">
							<Dropdown.Menu>
								<Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
								<Dropdown.Item onClick={this.props.goToSettings}>Settings</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu>
					<Container style={{marginTop: "30px"}}>
						{this.props.children}
					</Container>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
