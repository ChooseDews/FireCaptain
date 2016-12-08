import React from "react";
import { connect } from "react-redux"
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'

import { teacherActions } from "../actions"

class HiddenHome extends React.Component {
	componentDidMount() {
		this.props.getTeachers()
	}
	render() {
		return (
			<div style={{paddingTop: "10px"}}>
				<Button color='red' onClick={() => {
					this.props.removeTeachers()
				}}>
					Remove all teachers
				</Button>

				<Button onClick={() => {
			    	this.props.addTeacher({
			    		id: 5,
			    		name: "riley",
			    		email: "riley@gmail.com"
			    	})
			    }}>Add New Teacher</Button>

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
			      			  <Table.Cell>
			      			  	<Button animated='vertical' color='red' onClick={() => {
			      			  		this.props.removeTeacher(teacher.get('id'))
			      			  	}}>
							      <Button.Content hidden>Delete</Button.Content>
							      <Button.Content visible>
							        <Icon name='trash' />
							      </Button.Content>
							    </Button>
			      			  </Table.Cell>
					          <Table.Cell>{teacher.get('id')}</Table.Cell>
					          <Table.Cell>{teacher.get('name')}</Table.Cell>
					          <Table.Cell>{teacher.get('email')}</Table.Cell>
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
			getTeachers: () => {
				dispatch(teacherActions.getTeachers())
			},
			addTeacher: (teacher) => {
				dispatch(teacherActions.addTeacher(teacher))
			},
			removeTeacher: (id) => {
				dispatch(teacherActions.removeTeacher(id))
			},
			removeTeachers: () => {
				dispatch(teacherActions.removeTeachers())
			}
		}
	}
	)(HiddenHome)

export default Home