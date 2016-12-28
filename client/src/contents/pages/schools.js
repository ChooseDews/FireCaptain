import React from "react"
import { Link } from "react-router"
import { Grid, Image, Header, Button, Form, Segment, Search } from 'semantic-ui-react'


export default class Schools extends React.Component {
	render() {
		return (
			<div>
				<h1 className="center">Chapel Hill Carrboro City Schools</h1>
					<Search aligned={"right"} placeholder={"Search Schools"}/>
				<Segment.Group>
					<Segment>
						<Grid columns={12}>
							<Grid.Column computer={4} mobile={6}>
								<b>
									Chapel Hill High School
								</b>
							</Grid.Column>
							<Grid.Column computer={4} mobile={6}>
								Last Drill <b>
								Saturday July 2nd
							</b>
						</Grid.Column>
						<Grid.Column computer={4} only={"computer"}>
							Next Drill <b>
							Monday March 31st
						</b>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment>
				<Grid columns={3}>
					<Grid.Column>
						<b>
							East Chapel Hill High School
						</b>
					</Grid.Column>
					<Grid.Column>
						Last Drill <b>
						Saturday July 2nd
					</b>
				</Grid.Column>
				<Grid.Column>
					Next Drill <b>
					Monday March 31st
				</b>
			</Grid.Column>
		</Grid>
	</Segment>
	<Segment>
		<Grid columns={3}>
			<Grid.Column>
				<b>
					Carrboro High School
				</b>
			</Grid.Column>
			<Grid.Column>
				Last Drill <b>
				Saturday July 2nd
			</b>
		</Grid.Column>
		<Grid.Column>
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
