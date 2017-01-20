import React from "react"
import { Button, Checkbox, Form, Accordion, Icon, Table, Label, Menu, Message, Grid, Segment, Dropdown } from 'semantic-ui-react'
import * as _ from "lodash"
import { connect } from "react-redux"

import { teacherActions, mapActions } from "../actions"


//temp variable for what a schools period setup would look like

const options = [{
	value: 1,
	text: "period 1"
},
{
	value: 2,
	text: "period 2"
},
{
	value: 3,
	text: "period 3"
},
{
	value: 4,
	text: "period 4"
},
{
	value: 5,
	text: "period 5"
},
{
	value: 6,
	text: "period 6"
}]


class HiddenMakeSchool extends React.Component {
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
		this.setState({
			activeZone: name,
			zonesActiveIndex: _.findKey(this.state.zones, {id: name})
		});
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
		mapActions.updateMap(this.state.zones)
		console.log(mapActions.updateMap);
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


						<br />
						<br />


		<Menu attached='top' tabular>
			{this.state.zones.map((zone) => {


			return ([

				<Menu.Item name={zone.id} active={this.state.activeZone == zone.id} onClick={this.handleMenuClick.bind(this)}>
					{zone.name}
					<Button size="mini" className="closeButton" icon='remove' color="red" floated="right" onClick={() => {
						let newZones = this.state.zones
						if(newZones.length == 1) return false;
									      	newZones = newZones.filter((newZone) => {
									      		return newZone.id != zone.id
									      	})
									      	this.setState({
									      		zones: newZones,
														zonesActiveIndex: 0,
														activeZone: newZones[0].id
									      	})
				}}/>
				</Menu.Item>

			])

			})}


			<Menu.Menu position='right'>
            <Menu.Item name='new-tab' onClick={() => {
							let newZones = this.state.zones
							newZones.push({
							id: this.generateUUID(),
							name: "New Zone",
							rooms: []
						})
						this.setState({
							zones: newZones,
							zonesActiveIndex: newZones.length-1,
							activeZone: newZones[newZones.length-1].id
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
									<input placeholder='Zone Name' name={self.state.zones[self.state.zonesActiveIndex].id} value={self.state.zones[self.state.zonesActiveIndex].name} onChange={(e) => {
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



				 <Table.Row>
				           <Table.Cell width={7}> <Form.Field>
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

										</Form.Field></Table.Cell>
									<Table.Cell width={8}>	<Form.Field>

												 <Dropdown name={room.id+'-periods'} placeholder='Periods' fluid multiple search selection options={options} value={room.periods} onChange={(e, i) => {
											 let newZones = self.state.zones
													 newZones.forEach((newZone) => {
														 if (newZone.id == self.state.zones[self.state.zonesActiveIndex].id) {
															 newZone.rooms.forEach((newRoom) => {
																 if (newRoom.id == room.id) {
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


					  <Form.Field>
					  	<Button type="submit" floated="right" primary>Submit</Button>
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
				console.log(this.state.zones);
				dispatch(mapActions.updateMap(this.state.zones))
			}
		}
	}
	)(HiddenMakeSchool)

export default MakeSchool
