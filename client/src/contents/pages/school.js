import React from "react"
import { Link } from "react-router"
import { Grid, Image, Header, Button, Form, Segment, Search } from 'semantic-ui-react'
import Drill from '../components/drill';


export default class School extends React.Component {
	render() {
		return (
			<div>
				<h1 className="center">Chapel Hill High School</h1>
						<h2>Recent Drills</h2>
						<Drill school='Chapel Hill High' progress={96}></Drill>
						<Drill school='Chapel Hill High' progress={100}></Drill>
						<h2>All Drills</h2>

			</div>
			)
	}
}
