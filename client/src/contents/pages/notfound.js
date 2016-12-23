import React from "react"
import { Link } from "react-router"
import { Button } from 'semantic-ui-react'


export default class NotFound extends React.Component {
	render() {
		return (
			<panel className="error">
				<img src="/images/logo.png" />
				<h1>We Have Encountered An Error.</h1>
				<b>Don't worry we will send a team of highly trained monkeys</b><br/><br/>
					<Button secondary as={Link} to="/">Return Home</Button>
			</panel>
			)
	}
}
