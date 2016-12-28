import React from 'react';
import { Container, Menu, Sidebar, Segment, Dropdown} from 'semantic-ui-react'
import MediaQuery from "react-responsive"
import { connect } from "react-redux"
import { authActions } from "../actions"
import { replace, push } from "react-router-redux"

import linkRenderer from "./linkrenderer"
import menuItems from "./menuitems"

class HiddenLayout extends React.Component {
	constructor() {
		super()
		this.state = {
			visible: false,
			links: menuItems
		}
	}

	toggleSidebar() {
		this.setState({
			visible: !this.state.visible
		})
	}

	render() {
		return (
			<div>

				{/*small screens*/}
				<MediaQuery maxWidth={991}>
					<Sidebar.Pushable as={Segment}>
			          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
			            {linkRenderer(this.state.links, this.props.user)}
			          </Sidebar>
			          <Sidebar.Pusher>
		            	<Menu attached="top" color="blue" inverted>
		            		<Menu.Item onClick={this.toggleSidebar.bind(this)}>
								<img src='/images/logoWhite.png' />
							</Menu.Item>
							<Menu.Item as={Dropdown} text="Account" simple position="right">
								<Dropdown.Menu>
									<Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
									<Dropdown.Item onClick={this.props.goToSettings}>Settings</Dropdown.Item>
								</Dropdown.Menu>
							</Menu.Item>
		            	</Menu>
		            	<Container style={{marginTop: "30px"}}>
							{this.props.children}
						</Container>
			          </Sidebar.Pusher>
			        </Sidebar.Pushable>
		        </MediaQuery>

		    	{/*normal screens*/}
		    	<MediaQuery minWidth={992}>
			    	<Menu attached="top" color="blue" inverted>
		            	<Menu.Item>
							<img src='/images/logoWhite.png' />
						</Menu.Item>
						{linkRenderer(this.state.links, this.props.user)}
						<Menu.Item as={Dropdown} text="Account" simple position="right">
							<Dropdown.Menu>
								<Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
								<Dropdown.Item onClick={this.props.goToSettings}>Settings</Dropdown.Item>
							</Dropdown.Menu>
						</Menu.Item>
		            </Menu>

		            <Container style={{marginTop: "30px"}}>
						{this.props.children}
					</Container>
				</MediaQuery>

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