import React from "react"
import { Form, Button, Select } from "semantic-ui-react"
import { connect } from "react-redux"
import Flatpickr from 'react-flatpickr'

const options = [
	{
		value: "ac357dee-6f09-4465-8c5f-5c8ecd214c84",
		text: "period 1"
	},
	{
		value: "37d07ef8-b352-4cf5-8895-02e76f466420",
		text: "period 2"
	},
	{
		value: "aa1a0136-d2c0-44b3-aa17-a182e2bc3853",
		text: "period 3"
	},
	{
		value: "47dbb06f-c624-4a5a-bc71-37900c8d611b",
		text: "period 4"
	},
	{
		value: "8fd0578c-86d8-45c6-a38c-3a2b3fe125fa",
		text: "period 5"
	},
	{
		value: "db760346-801b-4cdc-adb4-4270db020e64",
		text: "period 6"
	}
]

class HiddenScheduleDrill extends React.Component {

	constructor() {
		super()
		this.state = {
			date: undefined,
			period: "",
			details: ""
		}
	}

	submit(e) {
		console.log(this.state)
		e.preventDefault()
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.submit.bind(this)}>
					<h2>Schedule Drill</h2>
					<Form.Field>
						<label>Start Time</label>
						<Flatpickr data-enable-
							placeholder="Start Time"
							onChange={(v) => {
								this.setState({
									date: new Date(v)
								})
							}}
							options={{
								enableTime: true,
								dateFormat: "m/d/Y h:i K",
								enable: [
											{
												from: "today",
												to: new Date().fp_incr(365)
											}
										]
							}}
							name="date"
						/>
					</Form.Field>
					<Form.Field>
						<label>Select Period</label>
						<Select placeholder='Select period' options={options} name="period" value={this.state.period} onChange={(e, result) => {
							this.setState({
								period: result.value
							})
						}} />
					</Form.Field>
					<Form.TextArea name='details' label='Details' placeholder='Details' rows='3' value={this.state.details} onChange={(e, result) => {
						this.setState({
							details: result.value
						})
					}} />
					<Button type='submit'>Submit</Button>
				</Form>
			</div>
		)
	}
}


const ScheduleDrill = connect(
	(state) => {
		return {}
	},
	(dispatch) => {
		return {}
	}
	)(HiddenScheduleDrill)

export default ScheduleDrill
