import React from "react";
import { connect } from "react-redux"
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import { getTeachers } from "../actions"

class HiddenHome extends React.Component {
	componentDidMount() {
		this.props.updateTeachers()
	}
	render() {
		return (
			<div>
				<Table celled>
			      <Table.Header>
			        <Table.Row>
			          <Table.HeaderCell>ID</Table.HeaderCell>
			          <Table.HeaderCell>Name</Table.HeaderCell>
			          <Table.HeaderCell>Email</Table.HeaderCell>
			        </Table.Row>
			      </Table.Header>

			      <Table.Body>
			      	{this.props.teachers.map((teacher) => {
			      		return (
			      			<Table.Row>
					          <Table.Cell>{teacher.id}</Table.Cell>
					          <Table.Cell>{teacher.name}</Table.Cell>
					          <Table.Cell>{teacher.email}</Table.Cell>
					        </Table.Row>
			      			)
			      	})}
			      </Table.Body>
			    </Table>
			</div>
			)
	}
}

const Home = connect(
	(state) => {
		return {
			teachers: state.teachers
		}
	},
	(dispatch) => {
		return {
			updateTeachers: () => {
				dispatch(getTeachers())
			}
		}
	}
	)(HiddenHome)

export default Home