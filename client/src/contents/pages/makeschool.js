import React from "react"
import { Button, Checkbox, Form, Accordion, Icon, Table, Label, Menu, Message, Grid, Segment } from 'semantic-ui-react'
import * as _ from "lodash"

//temp variable for what a schools period setup would look like
let periods = [{
	id: 1,
	name: "period 1"
},
{
	id: 2,
	name: "period 2"
},
{
	id: 3,
	name: "period 3"
},
{
	id: 4,
	name: "period 4"
},
{
	id: 5,
	name: "period 5"
},
{
	id: 6,
	name: "period 6"
},]

export default class MakeSchool extends React.Component {
	constructor() {
		super()
		this.state = {
			zonesActiveIndex: -1,
			roomsActiveIndex: -1,
			zones: [],
			activeZone: null
		}
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
		console.log(_.findKey(this.state.zones, {id: name}));
		this.setState({
			activeZone: name,
			zonesActiveIndex: _.findKey(this.state.zones, {id: name})
		});
		console.log(this.state.zones);
	}
	generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
	submit(e) {
		e.preventDefault()
		console.log(this.state.zones)
	}
	render() {
		return (
			<div>
				<Form onSubmit={this.submit.bind(this)}>
					<h2>Make School</h2>

					<h3>Main Info</h3>

				    <Form.Field>
				      <label>Name</label>
				      <input placeholder='Name' name="name" />
				    </Form.Field>
				    <Form.Field>
				      <label>More Info</label>
				      <input placeholder='more info' name="moreinfo" />
				    </Form.Field>
				    <Form.Field>
				      <Checkbox label='random form stuff' name="moreinfocheckbox" />
				    </Form.Field>


						<Grid>
	<Grid.Column width={2}>
		<Menu secondary vertical>
			<Menu.Item name='random'>
			<b>Zones</b>
			</Menu.Item>
			{this.state.zones.map((zone) => {


			return ([

				<Menu.Item name={zone.id} content={zone.name} active={this.state.activeZone === zone.id} onClick={this.handleMenuClick.bind(this)} />

			])

			})}


			<Menu.Item name='new-tab'>
	 <Icon name='add' />
	 <b>Add Zone</b>
 </Menu.Item>


		</Menu>
	</Grid.Column>

	<Grid.Column stretched width={14}>
		<Segment>
			{
				function(self){
					console.log(self);
					if(self.state.zonesActiveIndex < 0) return null;
					return ([
							<div>


								<Form.Field>
									<label>Zone Name</label>
									<input placeholder='Zone Name' value={self.state.zones[self.state.zonesActiveIndex].name} onChange={(e) => {
											console.log(e.target.value);
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
										id: self.generateUUID(),
										name: "New Room",
										periods: []
									});
											self.setState({
												zones: self.state.zones,
											})
									}} />
								</Form.Field>




								 <Accordion activeIndex={self.state.roomsActiveIndex} onTitleClick={self.handleRoomTitleClick.bind(self)}>
																    	{self.state.zones[self.state.zonesActiveIndex].rooms.map((room) => {
																    		return ([
																    			<Accordion.Title key={room.id}>
																			      <Icon name='dropdown' />
																			      {room.name}
																			      <Button size="mini" icon='remove' color="red" floated="right" style={{marginTop: "-4px", marginRight: "-6px"}} onClick={(e) => {
																			      	e.stopPropagation()
																			      	let newZones = self.state.zones
																			      	newZones.forEach((newZone) => {
																			      		if (newZone.id == self.state.zones[self.state.zonesActiveIndex].id) {
																			      			newZone.rooms = newZone.rooms.filter((newRoom) => {
																			      				return newRoom.id != room.id
																			      			})
																			      		}
																			      	})
																			      	self.setState({
																			      		zones: newZones
																			      	})
																			      }} />
																			    </Accordion.Title>,
																			    <Accordion.Content style={{paddingLeft: "1em"}}>

																			    <Form.Field>
																			      <label>Room Name</label>
																			      <input placeholder='Room Name' name={"roomname" + room.id} value={room.name} onChange={(e) => {
								 													let newZones = self.state.zones
																			      	newZones.forEach((newZone) => {
																			      		if (newZone.id == self.state.zones[self.state.zonesActiveIndex].id) {
																			      			newZone.rooms.forEach((newRoom) => {
																			      				if (newRoom.id == room.id) {
																			      					newRoom.name = e.target.value
																			      				}
																			      			})
																			      		}
																			      	})
								 													self.setState({
								 														zones: newZones
								 													})
																			      }} />
																			    </Form.Field>

																			    <Form.Field>
																			    	<label>Periods</label>
																			    </Form.Field>
																			    <Table celled>
																			      <Table.Header>
																			        <Table.Row>
																			          <Table.HeaderCell>Period</Table.HeaderCell>
																			          <Table.HeaderCell>Status</Table.HeaderCell>
																			        </Table.Row>
																			      </Table.Header>

																			      <Table.Body>
																			      {periods.map((period, periodsIncrement) => {
																			      	return (
																			      			<Table.Row key={periodsIncrement}>
																						      <Table.Cell>{period.name}</Table.Cell>
																					          <Table.Cell>
																					          	{room.periods.includes(period.id)?
																					          		<Checkbox toggle defaultChecked name={"periodtoggle" + periodsIncrement} value={periodsIncrement.toString()} onChange={(e, result) => {
																					          			let newZones = self.state.zones
																								      	newZones.forEach((newZone) => {
																								      		if (newZone.id == self.state.zones[self.state.zonesActiveIndex].id) {
																								      			newZone.rooms.forEach((newRoom) => {
																								      				if (newRoom.id == room.id) {

																								      					if (result.checked) {
																								          				if (newRoom.periods.indexOf(period.id) === -1) {
																								          					newRoom.periods.push(period.id)
																								          				}
																								          			} else {
																								          				var index = newRoom.periods.indexOf(period.id)
																								          				if (index > -1) {
																															newRoom.periods.splice(index, 1);
																														}
																								          			}

																								      				}
																								      			})
																								      		}
																								      	})
																					          			self.setState({
																					          				zones: newZones
																					          			})
																					          		}} />
																					          		:
																					          		<Checkbox toggle name={"periodtoggle" + periodsIncrement} value={periodsIncrement.toString()} onChange={(e, result) => {
																					          			let newZones = self.state.zones
																								      	newZones.forEach((newZone) => {
																								      		if (newZone.id == self.state.zones[self.state.zonesActiveIndex].id) {
																								      			newZone.rooms.forEach((newRoom) => {
																								      				if (newRoom.id == room.id) {

																								      					if (result.checked) {
																								          				if (newRoom.periods.indexOf(period.id) === -1) {
																								          					newRoom.periods.push(period.id)
																								          				}
																								          			} else {
																								          				var index = newRoom.periods.indexOf(period.id)
																								          				if (index > -1) {
																															newRoom.periods.splice(index, 1);
																														}
																								          			}

																								      				}
																								      			})
																								      		}
																								      	})
																					          			self.setState({
																					          				zones: newZones
																					          			})
																					          		}} />
																					          	}
																					          </Table.Cell>
																					        </Table.Row>
																			      		)
																			      })}

																			      </Table.Body>
																			    </Table>

																			    </Accordion.Content>
																    			])
																    	})}

																	  </Accordion></div>
					])
				}(this)
			}
		</Segment>
	</Grid.Column>
</Grid>


				    <h3>Zones</h3>

				    <Form.Field>
				    	<Button type="button" content='Add zone' icon='plus' labelPosition='left' onClick={() => {
				    		let newZones = this.state.zones
				    		newZones.push({
								id: this.generateUUID(),
								name: "New Zone",
								rooms: []
							})
							this.setState({
								zones: newZones,
								zonesActiveIndex: -1
							})
				    	}} />
				    </Form.Field>

				    <Form.Field>
					    <Accordion styled fluid activeIndex={this.state.zonesActiveIndex} onTitleClick={this.handleZoneTitleClick.bind(this)}>
					    	{this.state.zones.map((zone) => {
					    		return ([
					    			<Accordion.Title key={zone.id}>
								      <Icon name='dropdown' />
								      {zone.name}
								      <Button size="mini" icon='remove' color="red" floated="right" style={{marginTop: "-4px", marginRight: "-6px"}} onClick={(e) => {
								      	e.stopPropagation()
								      	let newZones = this.state.zones
								      	newZones = newZones.filter((newZone) => {
								      		return newZone.id != zone.id
								      	})
								      	this.setState({
								      		zones: newZones
								      	})
								      }} />
								    </Accordion.Title>,
								    <Accordion.Content>

								    		<Form.Field>
										      <label>Zone Name</label>
										      <input placeholder='Zone Name' name={"zonename" + zone.id} value={zone.name} onChange={(e) => {
										      	let newZones = this.state.zones
										      	newZones.forEach((newZone) => {
										      		if (newZone.id == zone.id) {
										      			newZone.name = e.target.value
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
										    		let newZones = this.state.zones
											      	newZones.forEach((newZone) => {
											      		if (newZone.id == zone.id) {
											      			newZone.rooms.push({
																id: this.generateUUID(),
																name: "New Room",
																periods: []
															})
											      		}
											      	})
											      	this.setState({
											      		zones: newZones,
											      		roomsActiveIndex: -1
											      	})
										    	}} />
										    </Form.Field>

										    {zone.rooms.length == 0?
										    	<Form.Field>
												  	<Message info>
													    <Message.Header>There are currently no rooms!</Message.Header>
													    <p>Click on the "Add room" button to add a room.</p>
													</Message>
												</Form.Field>
										    	:
										    	null
										    }

										    <Accordion activeIndex={this.state.roomsActiveIndex} onTitleClick={this.handleRoomTitleClick.bind(this)}>
									    	{zone.rooms.map((room) => {
									    		return ([
									    			<Accordion.Title key={room.id}>
												      <Icon name='dropdown' />
												      {room.name}
												      <Button size="mini" icon='remove' color="red" floated="right" style={{marginTop: "-4px", marginRight: "-6px"}} onClick={(e) => {
												      	e.stopPropagation()
												      	let newZones = this.state.zones
												      	newZones.forEach((newZone) => {
												      		if (newZone.id == zone.id) {
												      			newZone.rooms = newZone.rooms.filter((newRoom) => {
												      				return newRoom.id != room.id
												      			})
												      		}
												      	})
												      	this.setState({
												      		zones: newZones
												      	})
												      }} />
												    </Accordion.Title>,
												    <Accordion.Content style={{paddingLeft: "1em"}}>

												    <Form.Field>
												      <label>Room Name</label>
												      <input placeholder='Room Name' name={"roomname" + room.id} value={room.name} onChange={(e) => {
	 													let newZones = this.state.zones
												      	newZones.forEach((newZone) => {
												      		if (newZone.id == zone.id) {
												      			newZone.rooms.forEach((newRoom) => {
												      				if (newRoom.id == room.id) {
												      					newRoom.name = e.target.value
												      				}
												      			})
												      		}
												      	})
	 													this.setState({
	 														zones: newZones
	 													})
												      }} />
												    </Form.Field>

												    <Form.Field>
												    	<label>Periods</label>
												    </Form.Field>
												    <Table celled>
												      <Table.Header>
												        <Table.Row>
												          <Table.HeaderCell>Period</Table.HeaderCell>
												          <Table.HeaderCell>Status</Table.HeaderCell>
												        </Table.Row>
												      </Table.Header>

												      <Table.Body>
												      {periods.map((period, periodsIncrement) => {
												      	return (
												      			<Table.Row key={periodsIncrement}>
															      <Table.Cell>{period.name}</Table.Cell>
														          <Table.Cell>
														          	{room.periods.includes(period.id)?
														          		<Checkbox toggle defaultChecked name={"periodtoggle" + periodsIncrement} value={periodsIncrement.toString()} onChange={(e, result) => {
														          			let newZones = this.state.zones
																	      	newZones.forEach((newZone) => {
																	      		if (newZone.id == zone.id) {
																	      			newZone.rooms.forEach((newRoom) => {
																	      				if (newRoom.id == room.id) {

																	      					if (result.checked) {
																	          				if (newRoom.periods.indexOf(period.id) === -1) {
																	          					newRoom.periods.push(period.id)
																	          				}
																	          			} else {
																	          				var index = newRoom.periods.indexOf(period.id)
																	          				if (index > -1) {
																								newRoom.periods.splice(index, 1);
																							}
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
														          		<Checkbox toggle name={"periodtoggle" + periodsIncrement} value={periodsIncrement.toString()} onChange={(e, result) => {
														          			let newZones = this.state.zones
																	      	newZones.forEach((newZone) => {
																	      		if (newZone.id == zone.id) {
																	      			newZone.rooms.forEach((newRoom) => {
																	      				if (newRoom.id == room.id) {

																	      					if (result.checked) {
																	          				if (newRoom.periods.indexOf(period.id) === -1) {
																	          					newRoom.periods.push(period.id)
																	          				}
																	          			} else {
																	          				var index = newRoom.periods.indexOf(period.id)
																	          				if (index > -1) {
																								newRoom.periods.splice(index, 1);
																							}
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
														          </Table.Cell>
														        </Table.Row>
												      		)
												      })}

												      </Table.Body>
												    </Table>

												    </Accordion.Content>
									    			])
									    	})}

										  </Accordion>

								    </Accordion.Content>
					    			])
					    	})}

						  </Accordion>
					  </Form.Field>

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

					  <Form.Field>
					  	<Button type="submit" floated="right" primary>Submit</Button>
					  </Form.Field>

				</Form>
			</div>
			)
	}
}
