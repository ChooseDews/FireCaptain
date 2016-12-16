import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Link } from "react-router"

export default class Layout extends React.Component {
	render() {
		return (
			<div>
			    <Menu>
			        <Container>
									<Link to={"/"}>
			            <Menu.Item>
			                Home
			            </Menu.Item>
									</Link>
									<Link to={"/schools"}>
			            <Menu.Item>
			                Schools
			            </Menu.Item>
									</Link>
									<Link to={"/about"}>
			            <Menu.Item>
			                District
			            </Menu.Item>
									</Link>
									<Link to={"/about"}>
									<Menu.Item>
											About
									</Menu.Item>
									</Link>
			            <Menu.Item>
			                Drills
			            </Menu.Item>
			        </Container>
			    </Menu>
			    <Container>
			        {this.props.children}
			    </Container>
			</div>
		)
	}
}
