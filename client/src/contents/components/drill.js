import React from "react";
import CircularProgressbar from 'react-circular-progressbar';
import { Segment, Grid } from 'semantic-ui-react'
import Moment from 'react-moment';


class Drill extends React.Component {
  render() {
    return (
			<div>
			    <Segment>
			        <Grid padded>
			            <Grid.Row>
			                <Grid.Column width={2}>
			                    <CircularProgressbar percentage={this.props.progress} /> </Grid.Column>
			                <Grid.Column width={14} style={{marginTop: "20px"}}>
											 <h2 className="ui header">
											 {this.props.school} <small className="grey-text"> <Moment format="MMM Do YYYY @ h:m a"></Moment></small>
											 <div className="sub header"><b>100</b>/200 Zones</div>
											 <div className="sub header"><b>300</b>/800 Rooms</div>
											 </h2>
											 </Grid.Column>
			            </Grid.Row>
			        </Grid>
			    </Segment>
					<br/>
			</div>
    );
  }
}

export default Drill;
