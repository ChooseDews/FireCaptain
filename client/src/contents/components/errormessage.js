import React from "react"
import { Message, List } from "semantic-ui-react"

class ErrorMessage extends React.Component {
	render() {
		let shown = this.props.shown || true
		let errors = this.props.errors || []

		//if there are no errors
		if (errors.length <= 0 || !shown) {
			return null
		}

		return (
			<Message negative>
				<Message.Header>Errors</Message.Header>
				<List bulleted>
					{errors.map((error, i) => {
						return (
								<List.Item key={i}>{error}</List.Item>
							)
					})}
				</List>
			</Message>
		)
	}
}

export default ErrorMessage