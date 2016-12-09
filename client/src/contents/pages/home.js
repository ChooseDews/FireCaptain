import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router"
import { Icon, Label, Menu, Table, Button, Checkbox } from 'semantic-ui-react'
import FlipMove from 'react-flip-move';

import { teacherActions } from "../actions"

class HiddenHome extends React.Component {
	componentDidMount() {
		this.props.getTeachers()
	}
	render() {
		return (
			<div>
				<Link to={"/about"}>About</Link>
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

			      <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)" className="ui middle aligned divided list massive">
				  {this.props.teachers.map((teacher, i) => {
			      		return (
			      			<div className="item" key={i}>
							    <div className="right floated content">
							      <Checkbox toggle onChange={(e, result) => {
							      	console.log(teacher.get("id"), result.checked)
							      }} />
							    </div>
							    <div className="content">
							      {teacher.get('name')}
							    </div>
							</div>
			      			)
			      	})}
				  </FlipMove>

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