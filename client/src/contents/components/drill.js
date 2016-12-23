import React from "react";
import CircularProgressbar from 'react-circular-progressbar';
import { Segment, Grid } from 'semantic-ui-react'
import Moment from 'react-moment';


class Drill extends React.Component {
  render() {
    return (
			<div>
			    <Segment>
			        <Grid>
			            <Grid.Row>
			                <Grid.Column width={2}>
			                    <CircularProgressbar percentage={60} /> </Grid.Column>
			                <Grid.Column width={14}> <h2> <span className="ui grey header">DRILL ON</span> | <span className="ui black header"> <Moment format="YYYY/MM/DD"></Moment></span></h2> </Grid.Column>
			            </Grid.Row>
			        </Grid>
			    </Segment>
			</div>
    );
  }
}

export default Drill;
