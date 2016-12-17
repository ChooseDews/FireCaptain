import React from "react"
import { Grid, Image, Header, Button, Form, Message } from 'semantic-ui-react'
import { connect } from "react-redux"
import { authActions } from "../actions"
import { replace } from "react-router-redux"

class HiddenLogin extends React.Component {
	constructor() {
		super()
		this.state = {
			email: "",
			password: "",
			error: undefined
		}
	}
	submit(e) {
		e.preventDefault()
		let email = this.state.email
		let password = this.state.password
		this.props.login(email, password, this.successHandler.bind(this))
	}
	successHandler(data) {
		if (data.success) {
			let redirectPath = this.props.location.query.redirect //where the user was redirected from
			if (redirectPath) {
				this.props.redirect(redirectPath)
			} else {
				this.props.redirect("/")
			}
		} else {
			this.setState({
				error: data.error
			})
		}
	}
	render() {
		return (
			<div style={{height: "400px", width: "100%", position: "absolute", top: "50%", marginTop: "-200px"}}>
				<Grid centered columns={3}>
				    <Grid.Column style={{backgroundColor: "#DADADA", borderRadius: "5px"}}>
						<Image src='/images/CaptainLogo.png' />
				    	<Form onSubmit={this.submit.bind(this)}>
						    <Form.Field>
						      <label>Email</label>
						      <input placeholder='Email' name="email" value={this.state.email} onChange={(e) => {
						      	this.setState({
						      		email: e.target.value
						      	})
						      }} />
						    </Form.Field>
						    <Form.Field>
						      <label>Password</label>
						      <input type="password" placeholder='Password' name="password" value={this.state.password} onChange={(e) => {
						      	this.setState({
						      		password: e.target.value
						      	})
						      }} />
						    </Form.Field>
						    <Button type='submit' fluid color="teal">Login</Button>
						    <Message color='red' style={{display: this.state.error? "block":"none"}}>{this.state.error}</Message>
						</Form>
				    </Grid.Column>
				  </Grid>
			</div>
			)
	}
}

const Login = connect(
	(state) => {
		return {}
	},
	(dispatch) => {
		return {
			login: (email, password, successHandler) => {
				dispatch(authActions.login(email, password)).then(successHandler)
			},
			redirect: (location) => {
				dispatch(replace(location))
			}
		}
	})(HiddenLogin)

export default Login