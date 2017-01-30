import React from "react"
import { Button, Checkbox, Loader, Form, Accordion, Icon, Table, Label, Menu, Message, Grid, Segment, Dropdown, Input, List, Modal} from 'semantic-ui-react'
import * as _ from "lodash"
import { connect } from "react-redux"
import * as FireAnalytics from "FireAnalytics"
import Select from 'react-select';
import DebounceInput from 'react-debounce-input';

import { teacherActions, mapActions } from "../actions"

import { http } from "../util"

//temp variable for what a schools period setup would look like

const options = [
	{
		value: "ac357dee-6f09-4465-8c5f-5c8ecd214c84",
		label: "period 1"
	},
	{
		value: "37d07ef8-b352-4cf5-8895-02e76f466420",
		label: "period 2"
	},
	{
		value: "aa1a0136-d2c0-44b3-aa17-a182e2bc3853",
		label: "period 3"
	},
	{
		value: "47dbb06f-c624-4a5a-bc71-37900c8d611b",
		label: "period 4"
	},
	{
		value: "8fd0578c-86d8-45c6-a38c-3a2b3fe125fa",
		label: "period 5"
	},
	{
		value: "db760346-801b-4cdc-adb4-4270db020e64",
		label: "period 6"
	}
]

class HiddenMakeSchool extends React.Component {
	constructor() {
		super()
		this.state = {
			zones: [],
			activeZone: "",
			activeZoneIndex: 0,
			loading: true,
			zonesRoomName: []
		}
	}
	componentDidMount() {
		http.get("/api/school/map").then((data) => {
			this.setState({
				zones: data.data.zones,
				activeZone: data.data.zones[0]._id,
				loading: false
			});
		})
	}

	generateUUID() {
		let a = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
		s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
		return a()
	}

	submit(e) {
		e.preventDefault()
		http.post("/api/school/map", {
			map: this.state.zones
		}).then(function(i){
			console.log(i);
			alert("The school was updated.")
		})

		e.preventDefault();
	}

	render() {

		if (this.state.loading) { //if loading inital zone data
			return (
					<div>
						<Form>
						<h2>School Map</h2>
						<br />
						<Loader active inline='centered' size='massive' />
						</Form>
					</div>
				)
		}

		//gets currently selected zone
		let currentZone = undefined;
		let index = 0;
		if (this.state.zones.length > 0) {

			index = this.state.activeZoneIndex

			currentZone = this.state.zones[index] || this.state.zones[0]
		}

		return (
			<div>
				<Form onSubmit={this.submit.bind(this)}>
					<h2>School Map</h2>
					<h3>Total Rooms: {FireAnalytics.zone.countRooms(this.state.zones)}</h3>
					{FireAnalytics.zone.mapIssues(this.state.zones).length > 0?
					<div>
						<h3>Errors:</h3>
						<List bulleted>
							{FireAnalytics.zone.mapIssues(this.state.zones).map((issue, i) => {
								return (
									<List.Item key={i}>
										{issue}
									</List.Item>
								)
							})}
						</List>
					</div>
					:null}
					<br/>

					<Menu attached='top' tabular>
					{this.state.zones.length > 0? this.state.zones.map((zone, i) => {
						return (
								<Menu.Item key={zone._id} active={zone._id == currentZone._id} onClick={() => {
									this.setState({
										activeZone: zone._id,
										activeZoneIndex: i
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
					}):
					null
					}

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

					{this.state.zones.length > 0?
					<Segment attached='bottom'>
						<div>
							<Form.Field>
								<label>Zone Name</label>
								<DebounceInput
									minLength={2}
									debounceTimeout={10}
									placeholder='Zone Name'
									name={currentZone._id}
									value={currentZone.name}
									onChange={(e) => {
										let newZones = this.state.zones;
										newZones[index].name = e.target.value
										this.setState({
											zones: newZones
										})
									}} />
							</Form.Field>

							<h3>Add Room</h3>

							<div className="field">
							    <div className="two fields">
							      <div className="field">
							      	<label>Name</label>
							        <Form.Input name='roomName' placeholder='Name' />
							      </div>
							      <div className="field">
							      	<label>Periods</label>
							        <Select
							        	id="roomPeriods"
										simpleValue={true}
										value={[]}
										inputProps={ { type: 'react-type' } }
										options={options}
										multi={true}
									/>
							      </div>
							    </div>
							  </div>

							<Form.Field>
								<Button type="button" color="blue" content='Add room' icon='plus' labelPosition='left' floated="right" onClick={() => {
									let newZones = this.state.zones;
									newZones[index].rooms.push({
										_id: this.generateUUID(),
										name: "New Room",
										periods: []
									});
									this.setState({
										zones: newZones
									})
								}} />
							</Form.Field>

							<Form.Field>
								<label>Rooms</label>
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
									{currentZone.rooms.map((room, i) => {
										return (
											<Table.Row key={room._id}>
												<Table.Cell>
													<DebounceInput
														minLength={2}
														debounceTimeout={300}
														data-key={i}
														placeholder='Room Name'
														name={"roomname" + room._id}
														value={room.name}
														onChange={(e) => {
															let newZones = this.state.zones;
															let roomIndex = e.target.getAttribute("data-key");
															newZones[index].rooms[roomIndex].name = e.target.value
															this.setState({
																zones: newZones
															})
														}} />
												</Table.Cell>
												<Table.Cell>
													<Select
														simpleValue={true}
														value={room.periods}
														inputProps={ { type: 'react-type' } }
														options={options}
														multi={true}
														onChange={(e) => {
															let newZones = this.state.zones
															newZones[index].rooms[i].periods = e.split(",")
															this.setState({
																zone: newZones
															})
														 }}
													 />
												</Table.Cell>
												<Table.Cell>
													<Button type="button" size="mini" icon='remove' color="red" onClick={(e) => {
							 							let newZones = this.state.zones
							 							newZones[index].rooms = newZones[index].rooms.filter((newRoom) => {
									 						return newRoom._id != room._id
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

					<Button primary type="submit" floated="right" style={{marginBottom: "20px !important"}} onClick={this.submit.bind(this)}>Submit</Button>
				</Form>
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
