import React from "react"
import { Button, Checkbox, Form, Accordion, Icon, Table, Label, Menu, Message, Grid, Segment, Dropdown } from 'semantic-ui-react'
import * as _ from "lodash"
import { connect } from "react-redux"
import * as FireAnalytics from "FireAnalytics"

import { teacherActions, mapActions } from "../actions"

import { http } from "../util"



//temp variable for what a schools period setup would look like

const options = [{
	value: "ac357dee-6f09-4465-8c5f-5c8ecd214c84",
	key: "ac357dee-6f09-4465-8c5f-5c8ecd214c84",
	text: "period 1"
},
{
	value: "37d07ef8-b352-4cf5-8895-02e76f466420",
	key: "37d07ef8-b352-4cf5-8895-02e76f466420",
	text: "period 2"
},
{
	value: "aa1a0136-d2c0-44b3-aa17-a182e2bc3853",
	key: "aa1a0136-d2c0-44b3-aa17-a182e2bc3853",
	text: "period 3"
},
{
	value: "47dbb06f-c624-4a5a-bc71-37900c8d611b",
	key: "47dbb06f-c624-4a5a-bc71-37900c8d611b",
	text: "period 4"
},
{
	value: "8fd0578c-86d8-45c6-a38c-3a2b3fe125fa",
	key: "8fd0578c-86d8-45c6-a38c-3a2b3fe125fa",
	text: "period 5"
},
{
	value: "db760346-801b-4cdc-adb4-4270db020e64",
	key: "db760346-801b-4cdc-adb4-4270db020e64",
	text: "period 6"
}]


class HiddenMakeSchool extends React.Component {
	constructor() {
		super()
		this.state = {
			zonesActiveIndex: -1,
			roomsActiveIndex: -1,
			zones: [],
			activeZone: null,
			rooms: 0
		}
	}
	componentDidMount() {
		http.get("/api/school/map").then((data) => {


			this.setState({
				zones: data.data.zones,
				activeZone: data.data.zones[0]._id,
				zonesActiveIndex: 0
			});
		})
	}
	handleZoneTitleClick(e, i) {
		this.setState({
			zonesActiveIndex: this.state.zonesActiveIndex === i ? -1 : i,
		})
	}
	handleRoomTitleClick(e, i) {
		this.setState({
			roomsActiveIndex: this.state.roomsActiveIndex === i ? -1 : i,
		})
	}
	handleMenuClick(e, {name}){
		this.setState({
			activeZone: name,
			zonesActiveIndex: _.findKey(this.state.zones, {_id: name})
		});
	}
	generateUUID() {
		return (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
}
	submit(e) {
		e.preventDefault()
		http.post("/api/school/map", {
			map: this.state.zones
		}).then(function(i){
			console.log(i);
		})
		console.log(this.state.zones)
	}


	render() {
		return (
			<div>
				<Form onSubmit={this.submit.bind(this)}>
					<h2>School Map</h2>
					<br/><br/>


		<Menu attached='top' tabular>
			{this.state.zones.map((zone) => {
			return ([

				<Menu.Item key={zone._id} name={zone._id} active={this.state.activeZone == zone._id} onClick={this.handleMenuClick.bind(this)}>
					{zone.name}
					<Button size="mini" className="closeButton" icon='remove' color="red" floated="right" onClick={() => {
						let newZones = this.state.zones
						if(newZones.length == 1) return false;
									      	newZones = newZones.filter((newZone) => {
									      		return newZone._id != zone._id
									      	})
									      	this.setState({
									      		zones: newZones,
														zonesActiveIndex: 0,
														activeZone: newZones[0]._id
									      	})
				}}/>
				</Menu.Item>

			])

			})}


			<Menu.Menu position='right'>
            <Menu.Item name='new-tab' onClick={() => {
							let newZones = this.state.zones
							newZones.push({
							_id: this.generateUUID(),
							name: "New Zone",
							rooms: []
						})
						this.setState({
							zones: newZones,
							zonesActiveIndex: newZones.length-1,
							activeZone: newZones[newZones.length-1]._id
						})
						}}>
              <Icon name='add' />
              Add Zone
            </Menu.Item>
          </Menu.Menu>


		</Menu>

		<Segment attached='bottom' padded>

			{this.state.zones.length == 0?
				<Form.Field>
					<Message info>
						<Message.Header>There are currently no zones!</Message.Header>
						<p>Click on the "Add zone" button to add a zone.</p>
				</Message>
			</Form.Field>
				:
				null
			}


			{
				function(self){
					if(self.state.zonesActiveIndex < 0 || !self.state.zones[self.state.zonesActiveIndex]) return null;
					return ([
							<div>


								<Form.Field>
									<label>Zone Name</label>
									<input placeholder='Zone Name' name={self.state.zones[self.state.zonesActiveIndex]._id} value={self.state.zones[self.state.zonesActiveIndex].name} onChange={(e) => {
										self.state.zones[self.state.zonesActiveIndex].name = e.target.value;
										self.setState({
											zones: self.state.zones
										})
									}} />
								</Form.Field>


								<Form.Field>
									<label>Rooms</label>
								</Form.Field>

								<Form.Field>
									<Button type="button" content='Add room' icon='plus' labelPosition='left' onClick={() => {
									self.state.zones[self.state.zonesActiveIndex].rooms.push({
										_id: self.generateUUID(),
										name: "New Room",
										periods: []
									});
											self.setState({
												zones: self.state.zones
											})
									}} />

								</Form.Field>


								<div>

									{self.state.zones[self.state.zonesActiveIndex].rooms.length == 0?
				<Form.Field>
					<Message info>
						<Message.Header>There are currently no rooms!</Message.Header>
						<p>Click on the "Add Room" button to add a room.</p>
				</Message>
			</Form.Field>
				:
				null
			}

			{self.state.zones[self.state.zonesActiveIndex].rooms.length > 0?




									<Table celled>
										 <Table.Header>
											 <Table.Row>
												 <Table.HeaderCell>Name</Table.HeaderCell>
												 <Table.HeaderCell>Periods</Table.HeaderCell>
													 <Table.HeaderCell>Remove</Table.HeaderCell>

											 </Table.Row>
										 </Table.Header>
											 <Table.Body>

																    	{self.state.zones[self.state.zonesActiveIndex].rooms.map((room) => {
																    		return ([



				 <Table.Row key={room._id}>
				           <Table.Cell width={7}> <Form.Field>
											<input placeholder='Room Name' name={"roomname" + room._id} value={room.name} onChange={(e) => {
										let newZones = self.state.zones
												newZones.forEach((newZone) => {
													if (newZone._id == self.state.zones[self.state.zonesActiveIndex]._id) {
														newZone.rooms.forEach((newRoom) => {
															if (newRoom._id == room._id) {
																newRoom.name = e.target.value
															}
														})
													}
												})
										self.setState({
											zones: newZones
										})
											}} />

										</Form.Field></Table.Cell>
									<Table.Cell width={8}>	<Form.Field>

												 <Dropdown key={room._id+'-periods'} name={room._id+'-periods'} placeholder='Periods' fluid multiple search selection options={options} value={room.periods} onChange={(e, i) => {
											 let newZones = self.state.zones
													 newZones.forEach((newZone) => {
														 if (newZone._id == self.state.zones[self.state.zonesActiveIndex]._id) {
															 newZone.rooms.forEach((newRoom) => {
																 if (newRoom._id == room._id) {
																	 newRoom.periods = i.value
																 }
															 })
														 }
													 })
											 self.setState({
												 zones: newZones
											 })
												 }} />
										 </Form.Field></Table.Cell>
									 <Table.Cell width={1} textAlign={'center'}>

										 <Button size="mini" icon='remove' color="red" onClick={(e) => {
									 																			      	e.stopPropagation()
									 																			      	let newZones = self.state.zones
									 																			      	newZones.forEach((newZone) => {
									 																			      		if (newZone._id == self.state.zones[self.state.zonesActiveIndex]._id) {
									 																			      			newZone.rooms = newZone.rooms.filter((newRoom) => {
									 																			      				return newRoom._id != room._id
									 																			      			})
									 																			      		}
									 																			      	})
									 																			      	self.setState({
									 																			      		zones: newZones
									 																			      	})
									 																			      }} />



									 </Table.Cell>
				         </Table.Row>




																    			])
																    	})}

																		</Table.Body>
														 </Table>

														 :
														 null
														 }








														 </div>




																	 </div>
					])
				}(this)
			}
		</Segment>


		<br/><br/>

	<h4>Map Issues</h4>






		<h4>Rooms {FireAnalytics.zone.countRooms(this.state.zones)}</h4>

<br></br>


					  <Form.Field>
					  	<Button type="submit" floated="right" primary>Save</Button>
					  </Form.Field>

				</Form>
			</div>
			)
	}
}


const MakeSchool = connect(
	(state) => {
		return {
			teachers: state.teachers
		}
	},
	(dispatch) => {
		return {
			updateMap: (map) => {
				dispatch(mapActions.updateMap(this.state.zones))
			}
		}
	}
	)(HiddenMakeSchool)

export default MakeSchool
