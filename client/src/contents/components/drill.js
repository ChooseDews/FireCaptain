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
                      <Grid.Column mobile={4} only={'mobile'}></Grid.Column>
			                <Grid.Column mobile={8} tablet={4} computer={2}>
			                    <CircularProgressbar percentage={this.props.progress} /> </Grid.Column>
			                <Grid.Column mobile={16} tablet={12} computer={10} verticalAlign={"middle"}>
											 <h2 className="ui header">
											 {this.props.school} <small className="grey-text"> <Moment format="MMM Do YYYY @ h:m a"></Moment></small>
											 <div className="sub header"><b>100</b>/200 Zones</div>
											 <div className="sub header"><b>300</b>/800 Rooms</div>
											 </h2>
											 </Grid.Column>
                       <Grid.Column mobile={16} tablet={2} computer={4} only={"computer"} verticalAlign={"middle"}>
                         <h3 className="red-text">5.21 Minutes</h3>
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
