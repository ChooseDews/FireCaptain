import React from "react"
import { Link } from "react-router"
import { Grid, Image, Header, Button, Form, Segment, Search } from 'semantic-ui-react'

import { SocketError } from "../components"

export default class Schools extends React.Component {
	render() {
		return (
			<div>
				<SocketError />

				<h1 className="center">Chapel Hill Carrboro City Schools</h1>
					<Search aligned={"right"} placeholder={"Search Schools"}/>
				<Segment.Group>
					<Segment>
						<Grid columns='equal'>
							<Grid.Column>
								<b>
									Chapel Hill High School
								</b>
							</Grid.Column>
							<Grid.Column only={"computer"}>
								Last Drill <b>
								Saturday July 2nd
							</b>
						</Grid.Column>
						<Grid.Column only={"computer"}>
							Next Drill <b>
							Monday March 31st
						</b>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment>
				<Grid columns='equal'>
					<Grid.Column>
						<b>
							East Chapel Hill High School
						</b>
					</Grid.Column>
					<Grid.Column only={"computer"}>
						Last Drill <b>
						Saturday July 2nd
					</b>
				</Grid.Column>
				<Grid.Column only={"computer"}>
					Next Drill <b>
					Monday March 31st
				</b>
			</Grid.Column>
		</Grid>
	</Segment>
	<Segment>
		<Grid columns='equal'>
			<Grid.Column>
				<b>
					Carrboro High School
				</b>
			</Grid.Column>
			<Grid.Column only={"computer"}>
				Last Drill <b>
				Saturday July 2nd
			</b>
		</Grid.Column>
		<Grid.Column only={"computer"}>
			Next Drill <b>
			Monday March 31st
		</b>
	</Grid.Column>
</Grid>
</Segment>
		</Segment.Group>
	</div>
			)
	}
}
