import React from "react"
import { Link } from "react-router"
import { Button } from 'semantic-ui-react'


export default class ErrorPage extends React.Component {
	render() {
		return (
			<panel className="error">
				<img src="/images/logo.png" />
				<h1>There was an interal error.</h1>
					<Button secondary as={Link} to="/">Return Home</Button>
			</panel>
			)
	}
}
