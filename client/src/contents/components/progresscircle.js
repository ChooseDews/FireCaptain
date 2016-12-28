import React from "react";
import CircularProgressbar from 'react-circular-progressbar';

export default class ProgressCircle extends React.Component {
  chooseClass() {
  	let { percentage } = this.props
  	if (percentage <= 25) {
  		return "oneQuarter"
  	} else if ( percentage <= 50) {
  		return "twoQuarter"
  	} else if (percentage <= 75) {
  		return "threeQuarter"
  	} else {
  		return "fourQuarter"
  	}
  }
  render() {
    return (
		<div>
			<CircularProgressbar percentage={this.props.percentage} initialAnimation={true} classForPercentage={this.chooseClass.bind(this)} />
		</div>
    );
  }
}
