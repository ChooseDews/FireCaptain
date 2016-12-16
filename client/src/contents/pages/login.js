import React from "react"
import { Grid, Image, Header, Button, Form } from 'semantic-ui-react'

export default class Login extends React.Component {
	render() {
		return (
			<div>
				<Grid centered columns={3}>
				    <Grid.Column>
						<Image src='/images/CaptainLogo.png' />
				    	<Form>
						    <Form.Field>
						      <label>Email</label>
						      <input placeholder='Email' />
						    </Form.Field>
						    <Form.Field>
						      <label>Password</label>
						      <input type="password" placeholder='Password' />
						    </Form.Field>
						    <Button type='submit' fluid color="teal">Login</Button>
						</Form>
				    </Grid.Column>
				  </Grid>
			</div>
			)
	}
}
