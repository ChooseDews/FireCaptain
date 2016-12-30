import React from "react";
import { Dimmer, Header, Icon, Loader } from 'semantic-ui-react'
import { connect } from "react-redux"

class HiddenSocketError extends React.Component {
  constructor() {
  	super()
  	this.state = {
  		loading: true
  	}
  }
  reload() {
  	location.reload()
  }
  render() {
  	if (!this.props.socketStatus && this.state.loading) {
  		if (this.loadingHandler) { //reset timeout
  			clearTimeout(this.loadingHandler)
  		}
  		this.loadingHandler = setTimeout(() => { //allow loading for 5 seconds before error page
  			if (this.refs.componentRef) {
  				this.setState({
	  				loading: false
	  			})
  			}
  		}, 15000)
  	}
    return (
		<div ref="componentRef">
			{!this.props.socketStatus || !this.state.loading ?
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
		    : null}
		</div>
    );
  }
}

const SocketError = connect(
	(state) => {
		return {
			socketStatus: state.socketStatus
		}
	}, null)(HiddenSocketError)

export default SocketError;
