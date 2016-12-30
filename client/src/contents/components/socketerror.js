import React from "react";
import { Dimmer, Header, Icon, Loader } from 'semantic-ui-react'
import { connect } from "react-redux"

class HiddenSocketError extends React.Component {
  constructor() {
  	super()
  	this.visible = false
  	this.state = {
  		loading: true,
  		initialSecond: false
  	}
  }
  reload() {
  	location.reload()
  }
  turnOnInitialSecond() {
  	if (this.refs.initialComponent) {
  		this.setState({
	  		initialSecond: true
	  	})
  	}
  }
  turnOffLoading() {
  	if (this.refs.mainComponent) { //if component is still mounted
  		this.setState({
	  		loading: false
	  	})
  	}
  }
  render() {
  	//delays showing reconnect page for one second
  	this.initialTimeout = setTimeout(() => {
  		this.turnOnInitialSecond()
  	}, 1000)

  	this.loading = true
  	if (!this.props.socketStatus) { //if the connection is down
  		this.visible = true
  		if (this.timer) {
			clearTimeout(this.timer)
		}
  		this.timer = setTimeout(() => {
  			this.turnOffLoading()
  		}, 15000)
  	}

  	if (this.props.socketStatus && typeof(this.props.socketStatus) == "boolean") { //if the connection is up
  		if (this.state.loading) {
  			this.visible = false
  		}
  	}


  	if (this.visible && this.state.initialSecond) {
  		return (
			<div ref="mainComponent">
				<Dimmer
			     active={true}
			      page
			    >
			    	{this.state.loading?
			    		<Loader>Attempting to reconnect to server</Loader>
			    	:
			    		<Header as='h2' icon inverted>
						    <Icon name="wifi" />
						    You have lost connection to the server
						    <Header.Subheader>
						    	Please <span style={{color: "#5e5cf2", cursor: "pointer"}} onClick={this.reload}>reload</span> to continue
						    </Header.Subheader>
						</Header>
			    	}
			    </Dimmer>

			</div>
	    );
  	} else {
  		return (
  			<div ref="initialComponent"></div>
  		)
  	}
    
  }
}

const SocketError = connect(
	(state) => {
		return {
			socketStatus: state.socketStatus
		}
	}, null)(HiddenSocketError)

export default SocketError;
