import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router"
import { Icon, Label, Menu, Table, Button, Checkbox, Image, Divider } from 'semantic-ui-react'
import FlipMove from 'react-flip-move';
import { List } from "immutable"
import _ from "mudash"


import { teacherActions, authActions } from "../actions"

class HiddenHome extends React.Component {
	constructor() {
		super()
		this.state = {
			teachers: List([])
		}
	}
	componentDidMount() {
		this.props.getTeachers()
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			teachers: nextProps.teachers
		})
	}
	sort() {
		let sortedTeachers = _.sortBy(this.state.teachers, "name")
		this.setState({
			teachers: sortedTeachers
		})
	}
	render() {
		return (
			<div>
				<Image src='/images/CaptainLogo.png' size='large' centered={true} />
				<br/>
				Text should show up here
				<Divider />
				<br/>
				<Button color='red' onClick={() => {
					this.props.removeTeachers()
				}}>
				Remove all teachers
				</Button>
				<Button onClick={() => {
					this.props.addTeacher({
						id: 5,
						name: "John's Dick",
						email: "riley@gmail.com"
					})
				}}>Add New Teacher</Button>
				<Button onClick={this.sort.bind(this)}>Sort</Button>
				<FlipMove
					enterAnimation={false}
					leaveAnimation={false}
					easing="cubic-bezier(0, 0.7, 0.8, 0.1)"
					className="ui middle aligned divided list massive"
				>
					{this.state.teachers.map((teacher, i) => {
					return (
					<div className="item" key={teacher.get("id")} style={{backgroundColor: "white"}}>
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
				<Button onClick={() => {
					this.props.login()
				}}>login</Button>
				<Button onClick={() => {
					this.props.logout()
				}}>logout</Button>
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
			},
			login: () => {
				dispatch(authActions.login("john@example.com", "password"))
			},
			logout: () => {
				dispatch(authActions.logout())
			}
		}
	}
	)(HiddenHome)

export default Home
