import React from "react"
import { Link } from "react-router"
import { Button } from 'semantic-ui-react'


export default class Unauthorized extends React.Component {
	render() {
		return (
			<panel className="error">
				<img src="/images/logo.png" />
				<h1>You are not authorized to visit this page.</h1>
					<Button secondary as={Link} to="/">Return Home</Button>
			</panel>
			)
	}
}
