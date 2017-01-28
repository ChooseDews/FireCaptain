import React from "react"
import { Button, Checkbox, Form, Accordion, Icon, Table, Label, Menu, Message, Grid, Segment, Dropdown, Input, List, Modal} from 'semantic-ui-react'
import * as _ from "lodash"
import { connect } from "react-redux"
import * as FireAnalytics from "FireAnalytics"

import { teacherActions, mapActions } from "../actions"

import { http } from "../util"



//temp variable for what a schools period setup would look like

const options = {
	"ac357dee-6f09-4465-8c5f-5c8ecd214c84": {
		value: "ac357dee-6f09-4465-8c5f-5c8ecd214c84",
		key: "ac357dee-6f09-4465-8c5f-5c8ecd214c84",
		text: "period 1"
	},
	"37d07ef8-b352-4cf5-8895-02e76f466420": {
		value: "37d07ef8-b352-4cf5-8895-02e76f466420",
		key: "37d07ef8-b352-4cf5-8895-02e76f466420",
		text: "period 2"
	},
	"aa1a0136-d2c0-44b3-aa17-a182e2bc3853": {
		value: "aa1a0136-d2c0-44b3-aa17-a182e2bc3853",
		key: "aa1a0136-d2c0-44b3-aa17-a182e2bc3853",
		text: "period 3"
	},
	"47dbb06f-c624-4a5a-bc71-37900c8d611b": {
		value: "47dbb06f-c624-4a5a-bc71-37900c8d611b",
		key: "47dbb06f-c624-4a5a-bc71-37900c8d611b",
		text: "period 4"
	},
	"8fd0578c-86d8-45c6-a38c-3a2b3fe125fa": {
		value: "8fd0578c-86d8-45c6-a38c-3a2b3fe125fa",
		key: "8fd0578c-86d8-45c6-a38c-3a2b3fe125fa",
		text: "period 5"
	},
	"db760346-801b-4cdc-adb4-4270db020e64": {
		value: "db760346-801b-4cdc-adb4-4270db020e64",
		key: "db760346-801b-4cdc-adb4-4270db020e64",
		text: "period 6"
	}
}

var initialZones = [
	{
		_id: "1",
		name: "Zone a",
		rooms: [
			{
				_id: "1",
				name: "room 1",
				periods: ["8fd0578c-86d8-45c6-a38c-3a2b3fe125fa", "db760346-801b-4cdc-adb4-4270db020e64"]
			},
			{
				_id: "2",
				name: "room 2",
				periods: ["8fd0578c-86d8-45c6-a38c-3a2b3fe125fa", "db760346-801b-4cdc-adb4-4270db020e64"]
			},
			{
				_id: "3",
				name: "room 3",
				periods: ["8fd0578c-86d8-45c6-a38c-3a2b3fe125fa", "db760346-801b-4cdc-adb4-4270db020e64"]
			},
		]
	},
	{
		_id: "2",
		name: "Zone b",
		rooms: [
			{
				_id: "1",
				name: "room 1",
				periods: ["8fd0578c-86d8-45c6-a38c-3a2b3fe125fa", "db760346-801b-4cdc-adb4-4270db020e64"]
			},
			{
				_id: "2",
				name: "room 2",
				periods: ["8fd0578c-86d8-45c6-a38c-3a2b3fe125fa", "db760346-801b-4cdc-adb4-4270db020e64"]
			}
		]
	},
	{
		_id: "3",
		name: "Zone c",
		rooms: []
	}
]


class HiddenMakeSchool extends React.Component {
	constructor() {
		super()
		this.state = {
			zones: initialZones,
			activeZone: "1",
			modalOpen: false,
			currentRoom: {}
		}
	}

	generateUUID() {
		let a = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
		s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
		return a()
	}

	submit(e) {
		console.log(this.state.zones)
		e.preventDefault();
	}

	modalClose() {
		this.setState({
			modalOpen: false
		})
	}

	render() {

		//gets currently selected zone
		let currentZone = undefined;
		if (this.state.zones.length > 0) {
			currentZone = _.find(this.state.zones, (zone) => {
				return zone._id == this.state.activeZone
			}) || this.state.zones[0]
		}

		return (
			<div>
				<Form onSubmit={this.submit.bind(this)}>
					<h2>School Map</h2>
					<br/>

					{this.state.zones.length > 0?
					<Menu attached='top' tabular>
					{this.state.zones.map((zone) => {
						return (
								<Menu.Item key={zone._id} active={zone._id == currentZone._id} onClick={() => {
									this.setState({
										activeZone: zone._id
									})
								}}>
									{zone.name}
									<Button type="button" size="mini" className="closeButton" icon='remove' color="red" floated="right" onClick={() => {
										let newZones = _.reject(this.state.zones, function(d){ return d._id === zone._id; });
										if (newZones[0]) { //if this is not the last zone
											this.setState({
												activeZone: newZones[0]._id,
												zones: newZones
											})
										} else { //if last zone
											this.setState({
												activeZone: -1,
												zones: newZones
											})
										}
									}} />
								</Menu.Item>
							)
					})}

						<Menu.Menu position='right'>
							<Menu.Item name='new-tab' onClick={() => {
								let newZones = this.state.zones
								let id = this.generateUUID();
								newZones.push({
									_id: id,
									name: "New Zone",
									rooms: []
								})
								this.setState({
									zones: newZones
								})
							}}>
								<Icon name='add' />
								Add Zone
							</Menu.Item>
						</Menu.Menu>

					</Menu>
					:null}

					{this.state.zones.length > 0?
					<Segment attached='bottom'>
						<div>
							<Form.Field>
								<label>Zone Name</label>
								<input placeholder='Zone Name' name={currentZone._id} value={currentZone.name} onChange={(e) => {
									let newZones = this.state.zones;
									newZones.forEach((zone, i) => {
										if (zone._id == currentZone._id) {
											newZones[i].name = e.target.value
										}
									})
									this.setState({
										zones: newZones
									})
								}} />
							</Form.Field>

							<Form.Field>
								<label>Rooms</label>
							</Form.Field>

							<Form.Field>
								<Button type="button" content='Add room' icon='plus' labelPosition='left' onClick={() => {
									let newZones = this.state.zones;
									newZones.forEach((zone, i) => {
										if (zone._id == currentZone._id) {
											newZones[i].rooms.push({
												_id: this.generateUUID(),
												name: "New Room",
												periods: []
											});
											this.setState({
												zones: newZones
											})
										}
									})
								}} />
							</Form.Field>

							{currentZone.rooms.length > 0?
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Name</Table.HeaderCell>
										<Table.HeaderCell>Periods</Table.HeaderCell>
										<Table.HeaderCell>Remove</Table.HeaderCell>
									 </Table.Row>
								</Table.Header>
								
								<Table.Body>
									{currentZone.rooms.map((room) => {
										return (
											<Table.Row key={room._id}>
												<Table.Cell>
													<input placeholder='Room Name' name={"roomname" + room._id} value={room.name} onChange={(e) => {
														let newZones = this.state.zones;
														newZones.forEach((zone, i) => {
															if (zone._id == currentZone._id) {
																zone.rooms.forEach((newRoom) => {
																	if (newRoom._id == room._id) {
																		newRoom.name = e.target.value
																	}
																})

															}
														})
														this.setState({
															zones: newZones
														})
													}} />
												</Table.Cell>
												<Table.Cell>
													{room.periods.length > 0? room.periods.map((period) => {
														return (
															<Label key={options[period].key}>
														        {options[period].text}
														    </Label>
															)
													})

													:
														<span>There are no periods selected.</span>
													}
													<Button type="button" size="mini" className="addButton" icon='write' color="blue" floated="right" onClick={() => {
														this.setState({
															currentRoom: room,
															modalOpen: true
														})
													}} />
												</Table.Cell>
												<Table.Cell>
													<Button type="button" size="mini" icon='remove' color="red" onClick={(e) => {
							 							let newZones = this.state.zones
							 							newZones.forEach((newZone) => {
								 							if (newZone._id == currentZone._id) {
									 							newZone.rooms = newZone.rooms.filter((newRoom) => {
									 								return newRoom._id != room._id
									 							})
									 						}
								 						})
							 							this.setState({
							 								zones: newZones
							 							})
									 				}} />
												</Table.Cell>
											</Table.Row>
											)
									})}
								</Table.Body>
							</Table>
							:
							<Form.Field>
								<Message info>
									<Message.Header>There are currently no rooms!</Message.Header>
									<p>Click on the "Add room" button to add a room.</p>
								</Message>
							</Form.Field>
							}
						</div>
					</Segment>

					:

					<Form.Field>
						<Message info>
							<Message.Header>There are currently no zones!</Message.Header>
							<p>Click on the "Add zone" button to add a zone.</p>
						</Message>
					</Form.Field>
					}

					<Button primary type="submit" floated="right" onClick={this.submit.bind(this)}>Submit</Button>
				</Form>

				<Modal size="small" open={this.state.modalOpen} onClose={this.modalClose.bind(this)}>
		          <Modal.Header>
		            Update periods
		          </Modal.Header>
		          <Modal.Content>
		            <List divided verticalAlign='middle'>

		            	{Object.keys(options).map((key) => {
		            		return (
		            				<List.Item key={options[key].key}>
								      <List.Content floated='right'>
								      	{_.includes(this.state.currentRoom.periods, options[key].key)?
								      		<Checkbox defaultChecked onChange={(e, result) => {
								      			let newZones = this.state.zones;
												newZones.forEach((zone, i) => {
													if (zone._id == currentZone._id) {
														zone.rooms.forEach((newRoom) => {
															if (newRoom._id == this.state.currentRoom._id) {
																if (result.checked) {
																	if (!_.includes(newRoom.periods, options[key].key)) {
																		newRoom.periods.push(options[key].key)
																	}
																} else {
																	newRoom.periods = _.pull(newRoom.periods, options[key].key)
																}
															}
														})
													}
												})
												this.setState({
													zones: newZones
												})
								      		}} />
								      		:
								      		<Checkbox onChange={(e, result) => {
								      			let newZones = this.state.zones;
												newZones.forEach((zone, i) => {
													if (zone._id == currentZone._id) {
														zone.rooms.forEach((newRoom) => {
															if (newRoom._id == this.state.currentRoom._id) {
																if (result.checked) {
																	if (!_.includes(newRoom.periods, options[key].key)) {
																		newRoom.periods.push(options[key].key)
																	}
																} else {
																	newRoom.periods = _.pull(newRoom.periods, options[key].key)
																}
															}
														})
													}
												})
												this.setState({
													zones: newZones
												})
								      		}} />
								      	}
								      </List.Content>
								      <List.Content>
								        {options[key].text}
								      </List.Content>
								    </List.Item>
		            			)
		            	})}
					  </List>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button color="blue" icon='checkmark' labelPosition='right' content='Close' onClick={this.modalClose.bind(this)} />
		          </Modal.Actions>
		        </Modal>

			</div>
			)
	}
}


const MakeSchool = connect(
	(state) => {
		return {}
	},
	(dispatch) => {
		return {}
	}
	)(HiddenMakeSchool)

export default MakeSchool
